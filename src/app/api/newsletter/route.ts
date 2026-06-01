import { NextRequest, NextResponse } from "next/server";
import { rateLimit } from "@/lib/rate-limit";

const limiter = rateLimit(5); // 5 submissions per minute

// Storage: Try file-based (dev), fall back to in-memory (Vercel serverless)
let memorySubscribers: string[] = [];

async function saveSubscription(email: string): Promise<{ success: boolean; reason?: string }> {
  // Try file-based storage first (works in dev/local)
  try {
    const fs = await import("fs");
    const path = await import("path");
    const filePath = path.join(process.cwd(), "src/data/newsletter-subscribers.json");

    let subscribers: string[] = [];
    try {
      const data = fs.readFileSync(filePath, "utf-8");
      subscribers = JSON.parse(data);
    } catch {
      // File doesn't exist yet
    }

    // Check for duplicate
    if (subscribers.includes(email)) {
      return { success: false, reason: "already_subscribed" };
    }

    subscribers.push(email);
    fs.writeFileSync(filePath, JSON.stringify(subscribers, null, 2));

    return { success: true };
  } catch {
    // File system not available (Vercel serverless) — use in-memory
  }

  // Fallback: in-memory storage (ephemeral on serverless)
  if (memorySubscribers.includes(email)) {
    return { success: false, reason: "already_subscribed" };
  }

  memorySubscribers.push(email);
  return { success: true };
}

export async function POST(req: NextRequest) {
  try {
    // Rate limit
    const rateLimitResult = limiter(req);
    if (rateLimitResult) return rateLimitResult;

    const body = await req.json();
    const { email } = body;

    // Validate email
    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Email wajib diisi" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Format email tidak valid" },
        { status: 400 }
      );
    }

    if (email.length > 254) {
      return NextResponse.json(
        { error: "Email terlalu panjang" },
        { status: 400 }
      );
    }

    // Save subscription
    const result = await saveSubscription(email.toLowerCase().trim());

    if (!result.success && result.reason === "already_subscribed") {
      return NextResponse.json(
        { message: "Email sudah terdaftar. Terima kasih!", alreadySubscribed: true },
        { status: 200 }
      );
    }

    // Try webhook notification (non-blocking)
    try {
      const webhookUrl = process.env.NEWSLETTER_WEBHOOK_URL;
      if (webhookUrl) {
        fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            text: `📧 Newsletter subscription baru: ${email}`,
            email,
            timestamp: new Date().toISOString(),
            source: "getmova.my.id",
          }),
        }).catch(() => {});
      }
    } catch {
      // Webhook failure should not block the response
    }

    return NextResponse.json(
      {
        message: "Berhasil berlangganan! Kami akan mengirim update terbaru ke email kamu.",
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Newsletter API error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan. Coba lagi nanti." },
      { status: 500 }
    );
  }
}

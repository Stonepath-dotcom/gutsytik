import { NextRequest, NextResponse } from "next/server";
import { rateLimit } from "@/lib/rate-limit";

// Storage: Try file-based (dev), fall back to in-memory (Vercel serverless)
let memoryStore: object[] = [];

async function saveContactSubmission(data: { name: string; email: string; subject?: string; message: string; ip: string }) {
  const entry = { ...data, timestamp: new Date().toISOString() };

  // Try file-based storage first (works in dev/local)
  try {
    const fs = await import("fs");
    const path = await import("path");
    const filePath = path.join(process.cwd(), "src/data/contact-submissions.json");

    let submissions: object[] = [];
    try {
      const fileData = fs.readFileSync(filePath, "utf-8");
      submissions = JSON.parse(fileData);
    } catch {
      // File doesn't exist yet
    }

    submissions.push(entry);
    if (submissions.length > 100) {
      submissions = submissions.slice(-100);
    }

    fs.writeFileSync(filePath, JSON.stringify(submissions, null, 2));
    return;
  } catch {
    // File system not available (Vercel serverless) — use in-memory
  }

  // Fallback: in-memory storage (ephemeral on serverless)
  memoryStore.push(entry);
  if (memoryStore.length > 100) {
    memoryStore = memoryStore.slice(-100);
  }
}

export async function GET() {
  return NextResponse.json(
    { message: "Mova Contact API. Send a POST request with { name, email, subject, message }.", docs: "https://getmova.my.id/contact" },
    { status: 200, headers: { "X-Robots-Tag": "noindex, nofollow" } }
  );
}

export async function POST(req: NextRequest) {
  try {
    // Rate limit
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";
    const rateLimitResult = rateLimit(ip, 3);
    if (!rateLimitResult.success) return NextResponse.json({ error: "Terlalu banyak permintaan. Coba lagi nanti." }, { status: 429 });

    const body = await req.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Nama, email, dan pesan wajib diisi." },
        { status: 400 }
      );
    }

    // Validate name length
    if (name.length > 100) {
      return NextResponse.json(
        { error: "Nama terlalu panjang (maks 100 karakter)." },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Format email tidak valid." },
        { status: 400 }
      );
    }

    if (email.length > 254) {
      return NextResponse.json(
        { error: "Email terlalu panjang." },
        { status: 400 }
      );
    }

    // Validate message length
    if (message.length > 5000) {
      return NextResponse.json(
        { error: "Pesan terlalu panjang (maks 5000 karakter)." },
        { status: 400 }
      );
    }

    if (message.length < 10) {
      return NextResponse.json(
        { error: "Pesan terlalu pendek (minimal 10 karakter)." },
        { status: 400 }
      );
    }

    const forwarded = req.headers.get("x-forwarded-for");
    const clientIp = forwarded ? forwarded.split(",")[0] : "unknown";

    // Save to file
    await saveContactSubmission({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      subject: subject?.trim() || undefined,
      message: message.trim(),
      ip: clientIp,
    });

    // Webhook notification (non-blocking)
    try {
      const webhookUrl = process.env.CONTACT_WEBHOOK_URL;
      if (webhookUrl) {
        fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            text: `📩 Pesan kontak baru dari ${name} (${email})\nSubjek: ${subject || "-"}\nPesan: ${message.substring(0, 200)}${message.length > 200 ? "..." : ""}`,
            data: { name, email, subject, message: message.substring(0, 500), timestamp: new Date().toISOString() },
          }),
        }).catch(() => {});
      }
    } catch {
      // Webhook failure should not block the response
    }

    return NextResponse.json({
      success: true,
      message: "Pesan berhasil dikirim. Kami akan merespons dalam 2x24 jam kerja.",
    });
  } catch {
    return NextResponse.json(
      { error: "Terjadi kesalahan server. Silakan coba lagi." },
      { status: 500 }
    );
  }
}

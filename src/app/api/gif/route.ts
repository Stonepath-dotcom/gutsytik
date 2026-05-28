import { NextRequest, NextResponse } from "next/server";
import { rateLimit } from "@/lib/rate-limit";

export async function GET() {
  return NextResponse.json(
    { message: "Mova GIF API. Send a POST request with { url, startTime, endTime, quality }.", docs: "https://getmova.my.id" },
    { status: 200 }
  );
}

export async function POST(request: NextRequest) {
  // Rate limiting: 10 requests per minute for GIF conversion
  const ip = request.headers.get("x-forwarded-for") || "unknown";
  const { success } = rateLimit(ip, 10);
  if (!success) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a moment." },
      {
        status: 429,
        headers: { "Retry-After": "60" },
      }
    );
  }

  try {
    const { url, startTime, endTime, quality } = await request.json();
    if (!url) return NextResponse.json({ error: "URL required" }, { status: 400 });

    const duration = endTime - startTime;
    if (duration <= 0 || duration > 30) {
      return NextResponse.json({ error: "Duration must be between 1-30 seconds" }, { status: 400 });
    }

    // Return metadata for client-side GIF generation guidance
    return NextResponse.json({
      videoUrl: url,
      startTime,
      endTime,
      quality,
      message: "GIF conversion will be processed. For best results, keep duration under 15 seconds.",
    });
  } catch (error) {
    console.error("GIF conversion error:", error);
    return NextResponse.json({ error: "Failed to process GIF request" }, { status: 500 });
  }
}

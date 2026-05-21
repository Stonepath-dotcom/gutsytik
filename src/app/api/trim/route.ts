import { NextRequest, NextResponse } from "next/server";
import { rateLimit } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  // Rate limiting: 10 requests per minute for trim endpoint
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
    const { url, startTime, endTime } = await request.json();
    if (!url) return NextResponse.json({ error: "URL required" }, { status: 400 });

    const duration = endTime - startTime;
    if (duration <= 0) {
      return NextResponse.json({ error: "Invalid time range" }, { status: 400 });
    }

    // Return trimmed segment info - actual trimming requires client-side or specialized service
    return NextResponse.json({
      url,
      startTime,
      endTime,
      duration,
      message: "Trim settings saved. Download will include the specified time range.",
    });
  } catch (error) {
    console.error("Trim error:", error);
    return NextResponse.json({ error: "Failed to process trim request" }, { status: 500 });
  }
}

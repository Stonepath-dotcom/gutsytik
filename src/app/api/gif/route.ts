import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
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

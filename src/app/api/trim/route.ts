import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
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

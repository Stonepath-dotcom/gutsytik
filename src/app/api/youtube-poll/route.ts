import { NextRequest, NextResponse } from "next/server";

/**
 * Poll Loader.to progress URL to get the actual download link.
 * This endpoint is called by the frontend when the download URL isn't ready yet.
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const progressUrl = searchParams.get("progressUrl");
    const videoId = searchParams.get("videoId") || "unknown";
    const format = searchParams.get("format") || "360";

    if (!progressUrl) {
      return NextResponse.json({ error: "Progress URL diperlukan." }, { status: 400 });
    }

    const res = await fetch(progressUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        "Accept": "application/json",
      },
      signal: AbortSignal.timeout(5000),
    });

    if (!res.ok) {
      return NextResponse.json({ ready: false, progress: 0 });
    }

    const data = await res.json();

    if (data.success === 1 && data.download_url) {
      const isAudio = format === "mp3";
      const extension = isAudio ? "mp3" : "mp4";
      const quality = isAudio ? "Audio" : format + "p";

      return NextResponse.json({
        ready: true,
        downloadUrl: `/api/proxy?url=${encodeURIComponent(data.download_url)}&filename=mova_youtube_${videoId}&quality=${quality}`,
        originalUrl: data.download_url,
        filename: `mova_youtube_${videoId}_${quality}.${extension}`,
      });
    }

    return NextResponse.json({
      ready: false,
      progress: data.progress || 0,
    });
  } catch (error) {
    console.error("YouTube poll error:", error);
    return NextResponse.json({ ready: false, progress: 0, error: "Polling gagal" });
  }
}

import { NextRequest, NextResponse } from "next/server";
import { rateLimit } from "@/lib/rate-limit";

/**
 * Proxy endpoint to download video files.
 * Handles CORS issues and provides proper download headers.
 *
 * Query params:
 *   - url: The direct video URL to download (required)
 *   - filename: The filename for the download (optional)
 *   - quality: Quality label for the filename (optional)
 */
export async function GET(request: NextRequest) {
  // Rate limiting: 10 requests per minute for download endpoint
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
    const { searchParams } = new URL(request.url);
    const videoUrl = searchParams.get("url");
    const filename = searchParams.get("filename") || "gutsytik_video";
    const quality = searchParams.get("quality") || "video";

    if (!videoUrl) {
      return NextResponse.json(
        { error: "URL video diperlukan." },
        { status: 400 }
      );
    }

    // Validate URL
    try {
      const parsed = new URL(videoUrl);
      if (!["http:", "https:"].includes(parsed.protocol)) {
        throw new Error("Invalid protocol");
      }
    } catch {
      return NextResponse.json(
        { error: "URL tidak valid." },
        { status: 400 }
      );
    }

    // Fetch the video file
    const response = await fetch(videoUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept": "*/*",
        "Accept-Encoding": "identity",
        "Referer": videoUrl,
      },
      redirect: "follow",
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Gagal mengambil file video (HTTP ${response.status}). Coba download ulang.` },
        { status: response.status }
      );
    }

    // Determine content type and file extension
    const contentType = response.headers.get("content-type") || "video/mp4";
    const isAudio = contentType.includes("audio") || quality === "Audio" || quality === "MP3";
    const extension = isAudio ? "mp3" : "mp4";
    const downloadFilename = `${filename}_${quality}.${extension}`;

    return new NextResponse(response.body, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `attachment; filename="${downloadFilename}"`,
        "Cache-Control": "no-cache",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (error) {
    console.error("Proxy download error:", error);
    return NextResponse.json(
      { error: "Gagal mengunduh file. Silakan coba lagi." },
      { status: 500 }
    );
  }
}

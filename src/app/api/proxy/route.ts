import { NextRequest, NextResponse } from "next/server";
import { rateLimit } from "@/lib/rate-limit";

/**
 * Proxy endpoint to download video/audio files.
 * Handles CORS issues and provides proper download headers.
 * Supports Invidious, Piped, Googlevideo, TikTok CDN, and more.
 */
export async function GET(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for") || "unknown";
  const { success } = rateLimit(ip, 10);
  if (!success) {
    return NextResponse.json({ error: "Terlalu banyak request." }, { status: 429, headers: { "Retry-After": "60" } });
  }

  try {
    const { searchParams } = new URL(request.url);
    const videoUrl = searchParams.get("url");
    const filename = searchParams.get("filename") || "mova_video";
    const quality = searchParams.get("quality") || "video";

    if (!videoUrl) {
      return NextResponse.json({ error: "URL video diperlukan." }, { status: 400 });
    }

    // Validate URL
    try {
      const parsed = new URL(videoUrl);
      if (!["http:", "https:"].includes(parsed.protocol)) throw new Error("Invalid protocol");
    } catch {
      return NextResponse.json({ error: "URL tidak valid." }, { status: 400 });
    }

    // Determine appropriate headers based on the target host
    const targetHost = (() => {
      try { return new URL(videoUrl).hostname.toLowerCase(); } catch { return ""; }
    })();

    const headers: Record<string, string> = {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      "Accept": "*/*",
      "Accept-Encoding": "identity",
    };

    // Add Referer for specific hosts to avoid 403 errors
    if (targetHost.includes("tiktokcdn") || targetHost.includes("tiktok")) {
      headers["Referer"] = "https://www.tiktok.com/";
    } else if (targetHost.includes("googlevideo") || targetHost.includes("youtube")) {
      headers["Referer"] = "https://www.youtube.com/";
    } else if (targetHost.includes("piped.video") || targetHost.includes("pipedapi")) {
      headers["Referer"] = "https://piped.video/";
    } else if (targetHost.includes("invidious") || targetHost.includes("inv.") || targetHost.includes("yewtu.be") || targetHost.includes("nerdvpn") || targetHost.includes("ggtyler") || targetHost.includes("nadeko") || targetHost.includes("privacyredirect")) {
      headers["Referer"] = "https://www.youtube.com/";
    } else if (targetHost.includes("reddit") || targetHost.includes("redd.it")) {
      headers["Referer"] = "https://www.reddit.com/";
    } else if (targetHost.includes("fxtwitter") || targetHost.includes("vxtwitter")) {
      headers["Referer"] = "https://twitter.com/";
    } else {
      headers["Referer"] = videoUrl;
    }

    // Fetch the file
    const response = await fetch(videoUrl, {
      headers,
      redirect: "follow",
      signal: AbortSignal.timeout(60000), // 60 second timeout for large files
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Gagal mengambil file (HTTP ${response.status}). Coba lagi.` },
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
    return NextResponse.json({ error: "Gagal mengunduh file. Silakan coba lagi." }, { status: 500 });
  }
}

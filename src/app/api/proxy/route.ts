import { NextRequest, NextResponse } from "next/server";
import { rateLimit } from "@/lib/rate-limit";

export const maxDuration = 60;

/**
 * Proxy endpoint to download video/audio files.
 * Handles CORS issues and provides proper download headers.
 *
 * Strategy:
 * - For audio files (MP3/M4A): Always stream through proxy
 * - For video files < 4MB: Stream through proxy
 * - For video files >= 4MB: Redirect to source URL
 * - Validates that audio files are actually audio before serving
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
    const sourceUrl = searchParams.get("sourceUrl") || "";
    const direct = searchParams.get("direct");

    if (!videoUrl) {
      return NextResponse.json({ error: "URL video diperlukan." }, { status: 400 });
    }

    // Validate URL
    let targetHost = "";
    try {
      const parsed = new URL(videoUrl);
      if (!["http:", "https:"].includes(parsed.protocol)) throw new Error("Invalid protocol");
      targetHost = parsed.hostname.toLowerCase();
    } catch {
      return NextResponse.json({ error: "URL tidak valid." }, { status: 400 });
    }

    // If direct mode, redirect to the source URL
    if (direct === "1") {
      return NextResponse.redirect(videoUrl);
    }

    // Determine appropriate headers based on the target host
    const headers: Record<string, string> = {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
      "Accept": "*/*",
      "Accept-Encoding": "identity",
    };

    // Add Referer for specific hosts to avoid 403 errors
    if (targetHost.includes("googlevideo") || targetHost.includes("youtube")) {
      headers["Referer"] = "https://www.youtube.com/";
      headers["Origin"] = "https://www.youtube.com";
    } else if (targetHost.includes("savenow.to") || targetHost.includes("nip.io") || targetHost.includes("sslip.io")) {
      headers["Referer"] = "https://loader.to/";
      headers["Origin"] = "https://loader.to";
    } else if (targetHost.includes("tiktokcdn") || targetHost.includes("tiktok") || targetHost.includes("tikwm")) {
      headers["Referer"] = "https://www.tiktok.com/";
    } else if (targetHost.includes("reddit") || targetHost.includes("redd.it")) {
      headers["Referer"] = "https://www.reddit.com/";
    } else if (targetHost.includes("fxtwitter") || targetHost.includes("vxtwitter")) {
      headers["Referer"] = "https://twitter.com/";
    } else if (sourceUrl) {
      try {
        const sourceParsed = new URL(sourceUrl);
        headers["Referer"] = `${sourceParsed.protocol}//${sourceParsed.host}/`;
      } catch {
        headers["Referer"] = videoUrl;
      }
    }

    // Determine if this is an audio download
    const isAudioRequest = quality === "Audio" || quality === "MP3";

    // For audio files from YouTube/Googlevideo: redirect directly
    // This is faster than proxying and avoids Vercel's response limits
    if (isAudioRequest && (targetHost.includes("googlevideo") || targetHost.includes("youtube"))) {
      // Redirect to the original URL - the browser can handle this directly
      // Googlevideo URLs work in the browser without CORS issues for direct downloads
      return NextResponse.redirect(videoUrl);
    }

    // For video files, check size first with HEAD request
    if (!isAudioRequest) {
      try {
        const headRes = await fetch(videoUrl, { method: "HEAD", headers, redirect: "follow", signal: AbortSignal.timeout(5000) });
        const contentLength = parseInt(headRes.headers.get("content-length") || "0");

        // Vercel has ~4.5MB response limit on hobby plan
        if (contentLength > 4 * 1024 * 1024) {
          return NextResponse.redirect(videoUrl);
        }
      } catch {
        // HEAD request failed, continue with GET
      }
    }

    // Fetch the file
    const response = await fetch(videoUrl, {
      headers,
      redirect: "follow",
      signal: AbortSignal.timeout(120000),
    });

    if (!response.ok) {
      console.error(`Proxy download failed: ${response.status} for ${videoUrl.substring(0, 100)}`);
      // If proxy fails, redirect directly to the source URL
      return NextResponse.redirect(videoUrl);
    }

    // Check content length from the actual response (only for video)
    if (!isAudioRequest) {
      const contentLength = parseInt(response.headers.get("content-length") || "0");
      if (contentLength > 4 * 1024 * 1024) {
        return NextResponse.redirect(videoUrl);
      }
    }

    // Determine content type and file extension
    const sourceContentType = response.headers.get("content-type") || "";
    const isAudio = sourceContentType.includes("audio") || isAudioRequest;
    const extension = isAudio ? "mp3" : "mp4";
    const downloadFilename = `${filename}_${quality}.${extension}`;

    // For audio: validate that the response is actually audio
    if (isAudioRequest && response.body) {
      const contentLength = parseInt(response.headers.get("content-length") || "0");
      // If the file is suspiciously small (< 10KB), it's likely not real audio
      if (contentLength > 0 && contentLength < 10000) {
        console.error(`Proxy: Audio file too small (${contentLength} bytes), likely fake`);
        return NextResponse.json({ error: "File audio tidak valid. Coba lagi nanti." }, { status: 500 });
      }
    }

    return new NextResponse(response.body, {
      status: 200,
      headers: {
        // Use audio/mpeg for all audio files (m4a/mp3) for maximum compatibility
        "Content-Type": isAudio ? "audio/mpeg" : (sourceContentType || "video/mp4"),
        "Content-Disposition": `attachment; filename="${downloadFilename}"`,
        "Cache-Control": "no-cache",
        "Access-Control-Allow-Origin": "*",
        // Add content-length if available for progress display
        ...(response.headers.get("content-length") ? {
          "Content-Length": response.headers.get("content-length")!,
        } : {}),
      },
    });
  } catch (error) {
    console.error("Proxy download error:", error);
    return NextResponse.json({ error: "Gagal mengunduh file. Silakan coba lagi." }, { status: 500 });
  }
}

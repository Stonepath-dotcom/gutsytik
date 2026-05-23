import { NextRequest, NextResponse } from "next/server";
import { rateLimit } from "@/lib/rate-limit";

/**
 * Proxy endpoint to download video/audio files.
 * Handles CORS issues and provides proper download headers.
 * Supports Invidious, Piped, Googlevideo, TikTok CDN, and more.
 *
 * For small files: streams through the proxy
 * For large files or when streaming fails: redirects to the original URL
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
    const redirect = searchParams.get("redirect"); // If "1", just redirect

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

    // If redirect mode, just redirect to the URL
    if (redirect === "1") {
      return NextResponse.redirect(videoUrl);
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

    // Check Content-Length before downloading to avoid Vercel's response size limit
    try {
      const headRes = await fetch(videoUrl, { method: "HEAD", headers, redirect: "follow", signal: AbortSignal.timeout(5000) });
      const contentLength = parseInt(headRes.headers.get("content-length") || "0");

      // Vercel has a ~4.5MB response limit on hobby plan
      // For files larger than 4MB, redirect directly to the source URL
      if (contentLength > 4 * 1024 * 1024) {
        return NextResponse.redirect(videoUrl);
      }
    } catch {
      // HEAD request failed, continue with GET
    }

    // Fetch the file
    const response = await fetch(videoUrl, {
      headers,
      redirect: "follow",
      signal: AbortSignal.timeout(60000),
    });

    if (!response.ok) {
      // If proxy fails, try redirecting directly
      return NextResponse.redirect(videoUrl);
    }

    // Check content length from the actual response
    const contentLength = parseInt(response.headers.get("content-length") || "0");
    if (contentLength > 4 * 1024 * 1024) {
      return NextResponse.redirect(videoUrl);
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

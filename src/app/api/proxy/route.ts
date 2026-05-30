import { NextRequest, NextResponse } from "next/server";
import { rateLimit } from "@/lib/rate-limit";

export const maxDuration = 60;

/**
 * Proxy endpoint to download video/audio files.
 * Handles CORS issues and provides proper download headers.
 *
 * Strategy:
 * - For googlevideo URLs: Always try streaming (no size limit check), fallback to redirect
 * - For audio files (MP3/M4A): Always stream through proxy
 * - For video files from other CDNs: Stream if < 4.5MB, redirect if larger
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
    } else if (targetHost.includes("tiktokcdn") || targetHost.includes("tiktok") || targetHost.includes("tikwm")) {
      headers["Referer"] = "https://www.tiktok.com/";
    } else if (targetHost.includes("reddit") || targetHost.includes("redd.it")) {
      headers["Referer"] = "https://www.reddit.com/";
    } else if (targetHost.includes("fxtwitter") || targetHost.includes("vxtwitter")) {
      headers["Referer"] = "https://twitter.com/";
    } else if (targetHost.includes("piped")) {
      headers["Referer"] = "https://piped.video/";
    } else if (targetHost.includes("instagram") || targetHost.includes("cdninstagram") || targetHost.includes("fbcdn")) {
      headers["Referer"] = "https://www.instagram.com/";
    } else if (targetHost.includes("facebook") || targetHost.includes("fbcdn")) {
      headers["Referer"] = "https://www.facebook.com/";
    } else if (sourceUrl) {
      try {
        const sourceParsed = new URL(sourceUrl);
        headers["Referer"] = `${sourceParsed.protocol}//${sourceParsed.host}/`;
      } catch {
        headers["Referer"] = videoUrl;
      }
    }

    // Determine if this is an audio or photo download
    const isAudioRequest = quality === "Audio" || quality === "MP3" || quality === "Audio (Low)";
    const isPhotoRequest = quality === "photo";
    const isGooglevideo = targetHost.includes("googlevideo") || targetHost.includes("youtube");

    // ===== GOOGLEVIDEO: Try streaming, fallback to redirect =====
    // googlevideo URLs are signed and may need proper referer headers
    // Vercel has a ~4.5MB response limit on hobby plan, but streaming often works for larger files
    if (isGooglevideo) {
      try {
        const upstreamHeaders: Record<string, string> = { ...headers };

        // Support Range requests for video seeking
        const rangeHeader = request.headers.get("range");
        if (rangeHeader) {
          upstreamHeaders["Range"] = rangeHeader;
        }

        const upstreamRes = await fetch(videoUrl, {
          headers: upstreamHeaders,
          redirect: "follow",
          signal: AbortSignal.timeout(120000),
        });

        if (!upstreamRes.ok && upstreamRes.status !== 206) {
          console.log(`[proxy] googlevideo returned ${upstreamRes.status}, redirecting`);
          return NextResponse.redirect(videoUrl);
        }

        const contentType = upstreamRes.headers.get("content-type") || "";
        const contentLength = upstreamRes.headers.get("content-length");
        const contentRange = upstreamRes.headers.get("content-range");
        const isAudioContent = contentType.includes("audio") || isAudioRequest;
        const extension = isAudioContent ? "mp3" : "mp4";
        const downloadName = `${filename}_${quality.replace(/[^a-zA-Z0-9]/g, "_")}.${extension}`;

        const responseHeaders: Record<string, string> = {
          "Content-Type": isAudioContent ? "audio/mpeg" : (contentType || "video/mp4"),
          "Content-Disposition": `attachment; filename="${downloadName}"`,
          "Cache-Control": "public, max-age=3600",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Expose-Headers": "Content-Disposition, Content-Length, Content-Range, Accept-Ranges",
          "Accept-Ranges": "bytes",
        };

        if (contentLength) responseHeaders["Content-Length"] = contentLength;
        if (contentRange) {
          responseHeaders["Content-Range"] = contentRange;
        }

        // Stream the response - Vercel may enforce 4.5MB limit on hobby plan
        // If it fails, the frontend will catch the error and fall back to redirect
        return new NextResponse(upstreamRes.body, {
          status: contentRange ? 206 : 200,
          headers: responseHeaders,
        });
      } catch (error) {
        console.log(`[proxy] googlevideo stream failed: ${error instanceof Error ? error.message : "unknown"}, redirecting`);
        return NextResponse.redirect(videoUrl);
      }
    }

    // ===== NON-GOOGLEVIDEO AUDIO: Always stream through proxy =====
    if (isAudioRequest) {
      try {
        const audioRes = await fetch(videoUrl, {
          headers,
          redirect: "follow",
          signal: AbortSignal.timeout(60000),
        });

        if (audioRes.ok) {
          const contentType = audioRes.headers.get("content-type") || "";
          const contentLength = parseInt(audioRes.headers.get("content-length") || "0");

          // Validate this is actually audio content
          const isAudioContent = contentType.includes("audio") || contentType.includes("video") || contentType.includes("octet-stream");

          if (isAudioContent && (contentLength === 0 || contentLength > 10000)) {
            const extension = "mp3";
            const downloadFilename = `${filename}_${quality}.${extension}`;

            return new NextResponse(audioRes.body, {
              status: 200,
              headers: {
                "Content-Type": "audio/mpeg",
                "Content-Disposition": `attachment; filename="${downloadFilename}"`,
                "Cache-Control": "no-cache",
                "Access-Control-Allow-Origin": "*",
                ...(contentLength > 0 ? { "Content-Length": contentLength.toString() } : {}),
              },
            });
          } else {
            console.log(`Proxy: Audio validation failed - type: ${contentType}, size: ${contentLength}`);
          }
        }
      } catch (e) {
        console.log(`Proxy: Audio stream failed: ${e instanceof Error ? e.message : "unknown"}`);
      }

      // If streaming failed, try redirect as fallback
      return NextResponse.redirect(videoUrl);
    }

    // ===== PHOTO: Stream with inline Content-Disposition for display =====
    if (isPhotoRequest) {
      try {
        const photoRes = await fetch(videoUrl, {
          headers,
          redirect: "follow",
          signal: AbortSignal.timeout(30000),
        });

        if (!photoRes.ok) {
          console.error(`Proxy photo failed: ${photoRes.status} for ${videoUrl.substring(0, 100)}`);
          return NextResponse.redirect(videoUrl);
        }

        const sourceContentType = photoRes.headers.get("content-type") || "";
        const isImage = sourceContentType.includes("image") || sourceContentType.includes("octet-stream");
        const contentType = isImage ? sourceContentType : "image/jpeg";
        const photoFilename = `${filename}_photo.jpg`;

        return new NextResponse(photoRes.body, {
          status: 200,
          headers: {
            "Content-Type": contentType,
            "Content-Disposition": `inline; filename="${photoFilename}"`,
            "Cache-Control": "public, max-age=86400",
            "Access-Control-Allow-Origin": "*",
            ...(photoRes.headers.get("content-length") ? {
              "Content-Length": photoRes.headers.get("content-length")!,
            } : {}),
          },
        });
      } catch (error) {
        console.error(`Proxy photo error: ${error instanceof Error ? error.message : "unknown"}`);
        return NextResponse.redirect(videoUrl);
      }
    }

    // ===== NON-GOOGLEVIDEO VIDEO: Check size first =====
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
        "Content-Type": isAudio ? "audio/mpeg" : (sourceContentType || "video/mp4"),
        "Content-Disposition": `attachment; filename="${downloadFilename}"`,
        "Cache-Control": "no-cache",
        "Access-Control-Allow-Origin": "*",
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

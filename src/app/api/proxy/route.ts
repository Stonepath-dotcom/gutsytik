import { NextRequest, NextResponse } from "next/server";
import { execFile } from "child_process";
import { promisify } from "util";

const execFileAsync = promisify(execFile);
const YT_DLP_PATH = "/home/z/.local/bin/yt-dlp";

/**
 * Proxy endpoint to download video files.
 * Handles CORS issues and provides proper download headers.
 *
 * Query params:
 *   - url: The direct video URL to download (required, or use "sourceUrl" for yt-dlp)
 *   - sourceUrl: Original platform URL to re-resolve via yt-dlp (optional)
 *   - filename: The filename for the download (optional)
 *   - quality: Quality label for the filename (optional)
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    let videoUrl = searchParams.get("url");
    const sourceUrl = searchParams.get("sourceUrl");
    const filename = searchParams.get("filename") || "gutsytik_video";
    const quality = searchParams.get("quality") || "video";

    if (!videoUrl && !sourceUrl) {
      return NextResponse.json(
        { error: "URL video diperlukan." },
        { status: 400 }
      );
    }

    // If we have a sourceUrl (platform URL), resolve fresh download URL via yt-dlp
    if (sourceUrl && !videoUrl) {
      try {
        const formatSelector = quality === "Audio" || quality === "MP3"
          ? "bestaudio/best"
          : "best[ext=mp4]/best";

        const { stdout } = await execFileAsync(YT_DLP_PATH, [
          "-g",
          "-f", formatSelector,
          "--no-warnings",
          "--no-check-certificates",
          sourceUrl,
        ], { timeout: 30000 });

        const urls = stdout.trim().split("\n").filter(Boolean);
        if (urls.length > 0) {
          videoUrl = urls[0];
        }
      } catch {
        return NextResponse.json(
          { error: "Gagal mendapatkan link download. Video mungkin tidak lagi tersedia." },
          { status: 422 }
        );
      }
    }

    if (!videoUrl) {
      return NextResponse.json(
        { error: "URL video tidak ditemukan." },
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
      // If direct fetch fails, try using yt-dlp to get a fresh URL
      if (sourceUrl) {
        try {
          const formatSelector = quality === "Audio" || quality === "MP3"
            ? "bestaudio/best"
            : "best[ext=mp4]/best";

          const { stdout } = await execFileAsync(YT_DLP_PATH, [
            "-g",
            "-f", formatSelector,
            "--no-warnings",
            "--no-check-certificates",
            sourceUrl,
          ], { timeout: 30000 });

          const freshUrls = stdout.trim().split("\n").filter(Boolean);
          if (freshUrls.length > 0) {
            const freshResponse = await fetch(freshUrls[0], {
              headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
                "Accept": "*/*",
              },
              redirect: "follow",
            });

            if (freshResponse.ok) {
              const contentType = freshResponse.headers.get("content-type") || "video/mp4";
              const isAudio = contentType.includes("audio") || quality === "Audio" || quality === "MP3";
              const extension = isAudio ? "mp3" : "mp4";
              const downloadFilename = `${filename}_${quality}.${extension}`;

              return new NextResponse(freshResponse.body, {
                status: 200,
                headers: {
                  "Content-Type": contentType,
                  "Content-Disposition": `attachment; filename="${downloadFilename}"`,
                  "Cache-Control": "no-cache",
                  "Access-Control-Allow-Origin": "*",
                },
              });
            }
          }
        } catch {
          // Fallback failed too
        }
      }

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

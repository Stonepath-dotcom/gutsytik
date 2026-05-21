import { NextRequest, NextResponse } from "next/server";
import { execFile } from "child_process";
import { promisify } from "util";

const execFileAsync = promisify(execFile);
const YT_DLP_PATH = "/home/z/.local/bin/yt-dlp";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { url } = body;

    if (!url || typeof url !== "string") {
      return NextResponse.json(
        { error: "URL playlist tidak boleh kosong." },
        { status: 400 }
      );
    }

    const trimmedUrl = url.trim();

    try {
      new URL(trimmedUrl);
    } catch {
      return NextResponse.json(
        { error: "Format URL tidak valid." },
        { status: 400 }
      );
    }

    // Use yt-dlp with --flat-playlist and --dump-json to get playlist info
    try {
      const { stdout } = await execFileAsync(YT_DLP_PATH, [
        "--flat-playlist",
        "--dump-json",
        "--no-warnings",
        "--no-check-certificates",
        "--user-agent",
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        trimmedUrl,
      ], { timeout: 60000, maxBuffer: 50 * 1024 * 1024 });

      const lines = stdout.trim().split("\n").filter(Boolean);
      const videos: { id: string; title: string; thumbnail: string; duration: string; url: string }[] = [];

      for (const line of lines) {
        try {
          const entry = JSON.parse(line);
          const duration = entry.duration || 0;
          const minutes = Math.floor(duration / 60);
          const seconds = Math.round(duration % 60);
          const durationStr = duration > 0
            ? `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
            : "--:--";

          videos.push({
            id: entry.id || entry.url || String(videos.length),
            title: entry.title || `Video ${videos.length + 1}`,
            thumbnail: entry.thumbnails?.[0]?.url || entry.thumbnail || "",
            duration: durationStr,
            url: entry.url
              ? (entry.url.startsWith("http") ? entry.url : `https://www.youtube.com/watch?v=${entry.id || entry.url}`)
              : `https://www.youtube.com/watch?v=${entry.id}`,
          });
        } catch {
          // Skip malformed entries
        }
      }

      if (videos.length === 0) {
        return NextResponse.json(
          { error: "Tidak ada video ditemukan di playlist. Pastikan URL playlist valid." },
          { status: 404 }
        );
      }

      return NextResponse.json(
        { videos, total: videos.length },
        { status: 200 }
      );
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";

      if (errorMessage.includes("not a playlist") || errorMessage.includes("not a channel")) {
        return NextResponse.json(
          { error: "URL ini bukan playlist. Masukkan URL playlist YouTube yang valid." },
          { status: 400 }
        );
      }

      return NextResponse.json(
        { error: `Gagal mengambil data playlist: ${errorMessage.substring(0, 100)}` },
        { status: 422 }
      );
    }
  } catch (error) {
    console.error("Playlist API error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan internal." },
      { status: 500 }
    );
  }
}

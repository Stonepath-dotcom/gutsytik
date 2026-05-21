import { NextRequest, NextResponse } from "next/server";
import { execFile } from "child_process";
import { promisify } from "util";

const execFileAsync = promisify(execFile);

const YT_DLP_PATH = "/home/z/.local/bin/yt-dlp";

/* ──────────────── Platform Detection ──────────────── */
function detectPlatform(url: string): string {
  const hostname = (() => {
    try {
      return new URL(url).hostname.toLowerCase();
    } catch {
      return "";
    }
  })();

  if (hostname.includes("tiktok")) return "TikTok";
  if (hostname.includes("instagram")) return "Instagram";
  if (hostname.includes("youtube") || hostname.includes("youtu.be"))
    return "YouTube";
  if (hostname.includes("facebook") || hostname.includes("fb.watch") || hostname.includes("fb.com"))
    return "Facebook";
  if (hostname.includes("twitter") || hostname.includes("x.com"))
    return "Twitter/X";
  if (hostname.includes("pinterest")) return "Pinterest";
  if (hostname.includes("likee")) return "Likee";
  if (hostname.includes("snackvideo") || hostname.includes("snack")) return "Snack Video";
  if (hostname.includes("reddit")) return "Reddit";
  if (hostname.includes("vimeo")) return "Vimeo";
  if (hostname.includes("tumblr")) return "Tumblr";
  if (hostname.includes("dailymotion")) return "Dailymotion";
  if (hostname.includes("twitch")) return "Twitch";
  return "Unknown";
}

/* ──────────────── TikTok Downloader (tikwm.com API) ──────────────── */
async function downloadTikTok(url: string) {
  const apiUrl = `https://www.tikwm.com/api/?url=${encodeURIComponent(url)}&hd=1`;

  const res = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  if (!res.ok) {
    throw new Error("Gagal mengambil data dari TikTok. Coba lagi nanti.");
  }

  const json = await res.json();

  if (json.code !== 0 || !json.data) {
    throw new Error(json.msg || "Video TikTok tidak ditemukan. Pastikan video bersifat publik.");
  }

  const data = json.data;
  const duration = data.duration || 0;
  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;
  const durationStr = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  const qualityOptions: { label: string; resolution: string; url: string }[] = [];

  if (data.hdplay) {
    qualityOptions.push({ label: "HD", resolution: "1080p", url: data.hdplay });
  }
  if (data.play) {
    qualityOptions.push({ label: "SD", resolution: "720p", url: data.play });
  }
  if (data.music) {
    qualityOptions.push({ label: "Audio", resolution: "MP3", url: data.music });
  }

  return {
    title: data.title || "Video TikTok",
    thumbnail: data.cover || data.origin_cover || "",
    duration: durationStr,
    author: data.author?.nickname || data.author?.unique_id || "@unknown",
    platform: "TikTok",
    downloadUrl: data.hdplay || data.play || "",
    qualityOptions,
    filename: `gutsytik_tiktok_${data.id || Date.now()}`,
  };
}

/* ──────────────── yt-dlp Downloader (YouTube & more) ──────────────── */
async function downloadWithYtDlp(url: string, platform: string) {
  try {
    // Get video info as JSON
    const { stdout } = await execFileAsync(YT_DLP_PATH, [
      "-j",
      "--no-warnings",
      "--no-check-certificates",
      "--user-agent",
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      url,
    ], { timeout: 30000, maxBuffer: 10 * 1024 * 1024 });

    const info = JSON.parse(stdout);

    const duration = info.duration || 0;
    const minutes = Math.floor(duration / 60);
    const seconds = Math.round(duration % 60);
    const durationStr = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

    // Extract available formats with both video and audio
    const formats = info.formats || [];
    const combinedFormats = formats.filter(
      (f: { vcodec?: string; acodec?: string; height?: number; url?: string; ext?: string }) =>
        f.vcodec && f.vcodec !== "none" &&
        f.acodec && f.acodec !== "none" &&
        f.height && f.url
    );

    // Group by resolution, pick best for each
    const seen = new Map<number, (typeof combinedFormats)[0]>();
    for (const f of combinedFormats) {
      const h = f.height as number;
      if (!seen.has(h) || (f.tbr || 0) > (seen.get(h)?.tbr || 0)) {
        seen.set(h, f);
      }
    }

    const qualityOptions: { label: string; resolution: string; url: string }[] = [];
    const sorted = [...seen.entries()].sort((a, b) => b[0] - a[0]);

    for (const [height, fmt] of sorted) {
      let label = "SD";
      if (height >= 2160) label = "4K";
      else if (height >= 1080) label = "HD";
      else if (height >= 720) label = "HD";
      else label = "SD";

      qualityOptions.push({
        label,
        resolution: `${height}p`,
        url: fmt.url,
      });

      if (qualityOptions.length >= 4) break;
    }

    // Also try to get audio-only
    const audioFormats = formats.filter(
      (f: { vcodec?: string; acodec?: string; url?: string }) =>
        f.vcodec === "none" && f.acodec && f.acodec !== "none" && f.url
    );
    if (audioFormats.length > 0) {
      const bestAudio = audioFormats.sort(
        (a: { tbr?: number }, b: { tbr?: number }) => (b.tbr || 0) - (a.tbr || 0)
      )[0];
      qualityOptions.push({
        label: "Audio",
        resolution: "MP3",
        url: bestAudio.url,
      });
    }

    // If no combined formats found, try to get best single-stream URL
    if (qualityOptions.length === 0) {
      // Fallback: get the best format with a direct URL
      const directFormats = formats.filter(
        (f: { url?: string; vcodec?: string }) => f.url && f.vcodec && f.vcodec !== "none"
      );
      if (directFormats.length > 0) {
        const best = directFormats.sort(
          (a: { height?: number }, b: { height?: number }) => (b.height || 0) - (a.height || 0)
        )[0];
        qualityOptions.push({
          label: best.height >= 1080 ? "HD" : "SD",
          resolution: `${best.height || "?"}p`,
          url: best.url,
        });
      }
    }

    // If still no formats, use yt-dlp to get a direct download URL
    if (qualityOptions.length === 0) {
      try {
        const { stdout: directUrl } = await execFileAsync(YT_DLP_PATH, [
          "-g",
          "-f",
          "best[ext=mp4]/best",
          "--no-warnings",
          "--no-check-certificates",
          url,
        ], { timeout: 30000 });

        const urls = directUrl.trim().split("\n").filter(Boolean);
        if (urls.length > 0) {
          qualityOptions.push({
            label: "Best",
            resolution: "Auto",
            url: urls[0],
          });
        }
      } catch {
        // Ignore fallback errors
      }
    }

    if (qualityOptions.length === 0) {
      throw new Error(`Tidak bisa mendapatkan link download dari ${platform}. Video mungkin private atau dilindungi.`);
    }

    const videoId = info.id || Date.now();

    return {
      title: info.title || `Video ${platform}`,
      thumbnail: info.thumbnail || "",
      duration: durationStr,
      author: info.uploader || info.channel || "@unknown",
      platform,
      downloadUrl: qualityOptions[0].url,
      qualityOptions,
      filename: `gutsytik_${platform.toLowerCase()}_${videoId}`,
    };
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";

    if (errorMessage.includes("Sign in") || errorMessage.includes("authentication") || errorMessage.includes("cookies")) {
      throw new Error(`Video ${platform} memerlukan login/cookies. Coba gunakan video yang bersifat publik.`);
    }
    if (errorMessage.includes("private") || errorMessage.includes("removed") || errorMessage.includes("not available")) {
      throw new Error(`Video ${platform} tidak tersedia. Mungkin video bersifat private atau sudah dihapus.`);
    }
    if (errorMessage.includes("JSON")) {
      throw new Error(`Gagal memproses video dari ${platform}. Coba lagi nanti.`);
    }

    throw new Error(`Gagal mengambil data dari ${platform}: ${errorMessage.substring(0, 100)}`);
  }
}

/* ──────────────── Main Handler ──────────────── */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { url } = body;

    if (!url || typeof url !== "string") {
      return NextResponse.json(
        { error: "URL tidak boleh kosong." },
        { status: 400 }
      );
    }

    const trimmedUrl = url.trim();

    let parsedUrl: URL;
    try {
      parsedUrl = new URL(trimmedUrl);
    } catch {
      return NextResponse.json(
        { error: "Format URL tidak valid. Pastikan link yang dimasukkan benar (contoh: https://www.tiktok.com/... atau https://youtube.com/...)" },
        { status: 400 }
      );
    }

    if (!["http:", "https:"].includes(parsedUrl.protocol)) {
      return NextResponse.json(
        { error: "Hanya URL dengan protokol HTTP/HTTPS yang didukung." },
        { status: 400 }
      );
    }

    const platform = detectPlatform(trimmedUrl);
    let result;

    try {
      if (platform === "TikTok") {
        // Use tikwm API for TikTok (best results)
        result = await downloadTikTok(trimmedUrl);
      } else {
        // Use yt-dlp for everything else (YouTube, Facebook, Twitter, etc.)
        result = await downloadWithYtDlp(trimmedUrl, platform);
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Gagal memproses video.";
      return NextResponse.json(
        { error: errorMessage },
        { status: 422 }
      );
    }

    if (!result) {
      return NextResponse.json(
        { error: "Gagal memproses video. Silakan coba lagi." },
        { status: 500 }
      );
    }

    // Convert download URLs to proxy URLs to avoid CORS issues in browser
    // Include sourceUrl as fallback so proxy can re-resolve via yt-dlp if needed
    const encodedSourceUrl = encodeURIComponent(trimmedUrl);
    const proxiedQualityOptions = result.qualityOptions.map((q) => ({
      ...q,
      url: `/api/proxy?url=${encodeURIComponent(q.url)}&sourceUrl=${encodedSourceUrl}&filename=${encodeURIComponent(result.filename)}&quality=${encodeURIComponent(q.label)}`,
    }));

    return NextResponse.json(
      {
        ...result,
        downloadUrl: `/api/proxy?url=${encodeURIComponent(result.downloadUrl)}&sourceUrl=${encodedSourceUrl}&filename=${encodeURIComponent(result.filename)}&quality=best`,
        qualityOptions: proxiedQualityOptions,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Download API error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan internal. Silakan coba lagi nanti." },
      { status: 500 }
    );
  }
}

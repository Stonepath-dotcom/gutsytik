import { NextRequest, NextResponse } from "next/server";

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

/* ──────────────── Cobalt API Downloader (YouTube & other platforms) ──────────────── */
async function downloadWithCobalt(url: string, platform: string, audioOnly = false) {
  try {
    const cobaltUrl = "https://api.cobalt.tools/";
    const response = await fetch(cobaltUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        url,
        downloadMode: audioOnly ? "audio" : "auto",
      }),
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => "");
      throw new Error(`Cobalt API error (${response.status}): ${errorText.substring(0, 100)}`);
    }

    const data = await response.json();

    // Cobalt can return: { url, filename } for success or { error } for failure
    if (data.error) {
      throw new Error(data.error.code || data.error || `Gagal mengambil video dari ${platform}.`);
    }

    if (!data.url) {
      throw new Error(`Tidak bisa mendapatkan link download dari ${platform}. Video mungkin private atau dilindungi.`);
    }

    // Try to get more info via Invidious for YouTube videos
    let title = `Video ${platform}`;
    let thumbnail = "";
    let duration = "";
    let author = "@unknown";

    if (platform === "YouTube") {
      const videoId = extractYouTubeVideoId(url);
      if (videoId) {
        try {
          const infoRes = await fetch(`https://inv.nadeko.net/api/v1/videos/${videoId}`);
          if (infoRes.ok) {
            const info = await infoRes.json();
            title = info.title || title;
            thumbnail = info.videoThumbnails?.[0]?.url || info.videoThumbnails?.[3]?.url || "";
            const dur = info.lengthSeconds || 0;
            const mins = Math.floor(dur / 60);
            const secs = dur % 60;
            duration = `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
            author = info.author || author;
          }
        } catch {
          // Info fetch is optional, continue with defaults
        }
      }
    }

    // Build quality options from cobalt response
    const qualityOptions: { label: string; resolution: string; url: string }[] = [];
    const suggestedFilename = data.filename || `gutsytik_${platform.toLowerCase()}_${Date.now()}`;
    const isAudioFile = suggestedFilename.endsWith(".mp3") || suggestedFilename.endsWith(".ogg") || audioOnly;

    if (isAudioFile) {
      qualityOptions.push({
        label: "Audio",
        resolution: "MP3",
        url: data.url,
      });
    } else {
      qualityOptions.push({
        label: "Best",
        resolution: "Auto",
        url: data.url,
      });
    }

    // If we got a video, also try to get audio-only version
    if (!isAudioFile && !audioOnly) {
      try {
        const audioRes = await fetch(cobaltUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
          body: JSON.stringify({
            url,
            downloadMode: "audio",
          }),
        });
        if (audioRes.ok) {
          const audioData = await audioRes.json();
          if (audioData.url) {
            qualityOptions.push({
              label: "Audio",
              resolution: "MP3",
              url: audioData.url,
            });
          }
        }
      } catch {
        // Audio-only fetch is optional
      }
    }

    const videoId = platform === "YouTube" ? extractYouTubeVideoId(url) : Date.now();

    return {
      title,
      thumbnail,
      duration,
      author,
      platform,
      downloadUrl: data.url,
      qualityOptions,
      filename: `gutsytik_${platform.toLowerCase()}_${videoId || Date.now()}`,
    };
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";

    if (errorMessage.includes("private") || errorMessage.includes("removed") || errorMessage.includes("not available")) {
      throw new Error(`Video ${platform} tidak tersedia. Mungkin video bersifat private atau sudah dihapus.`);
    }

    throw new Error(`Gagal mengambil data dari ${platform}: ${errorMessage.substring(0, 150)}`);
  }
}

/* ──────────────── YouTube Video ID Extraction ──────────────── */
function extractYouTubeVideoId(url: string): string | null {
  try {
    const parsed = new URL(url);
    // Standard youtube.com/watch?v=...
    if (parsed.hostname.includes("youtube.com") && parsed.searchParams.get("v")) {
      return parsed.searchParams.get("v");
    }
    // Short youtu.be/...
    if (parsed.hostname === "youtu.be") {
      return parsed.pathname.slice(1).split("/")[0] || null;
    }
    // Embedded youtube.com/embed/...
    if (parsed.pathname.startsWith("/embed/")) {
      return parsed.pathname.split("/")[2] || null;
    }
  } catch {
    // Invalid URL
  }
  return null;
}

/* ──────────────── Main Handler ──────────────── */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { url, audioMode } = body;

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
        // Use cobalt API for everything else (YouTube, Facebook, Twitter, etc.)
        result = await downloadWithCobalt(trimmedUrl, platform, audioMode === true);
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

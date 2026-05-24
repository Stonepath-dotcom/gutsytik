import { NextRequest, NextResponse } from "next/server";
import { rateLimit } from "@/lib/rate-limit";

export const maxDuration = 60;

/* ──────────────── Configuration ──────────────── */
// Local yt-dlp API server (runs on our server alongside Next.js)
const YT_DLP_API = process.env.YTDLP_API_URL || "http://127.0.0.1:8888";

/* ──────────────── Platform Detection ──────────────── */
function detectPlatform(url: string): string {
  const hostname = (() => {
    try { return new URL(url).hostname.toLowerCase(); } catch { return ""; }
  })();
  if (hostname.includes("tiktok") || hostname.includes("vm.tiktok") || hostname.includes("vt.tiktok")) return "TikTok";
  if (hostname.includes("youtube") || hostname.includes("youtu.be")) return "YouTube";
  if (hostname.includes("instagram")) return "Instagram";
  if (hostname.includes("facebook") || hostname.includes("fb.watch") || hostname.includes("fb.com")) return "Facebook";
  if (hostname.includes("twitter") || hostname.includes("x.com")) return "Twitter/X";
  if (hostname.includes("pinterest")) return "Pinterest";
  if (hostname.includes("reddit")) return "Reddit";
  if (hostname.includes("likee")) return "Likee";
  if (hostname.includes("snackvideo") || hostname.includes("snack")) return "Snack Video";
  return "Unknown";
}

/* ──────────────── YouTube Video ID Extraction ──────────────── */
function extractYouTubeVideoId(url: string): string | null {
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes("youtube.com") && parsed.searchParams.get("v")) return parsed.searchParams.get("v");
    if (parsed.hostname === "youtu.be") return parsed.pathname.slice(1).split("/")[0] || null;
    if (parsed.pathname.startsWith("/embed/")) return parsed.pathname.split("/")[2] || null;
    if (parsed.pathname.startsWith("/shorts/")) return parsed.pathname.split("/")[2] || null;
  } catch {}
  return null;
}

/* ──────────────── Strategy 1: Local yt-dlp API (BEST - real files, all platforms) ─── */
async function downloadWithYtdlp(
  url: string,
  audioOnly = false
): Promise<{
  title: string; thumbnail: string; duration: string; author: string;
  platform: string; downloadUrl: string;
  qualityOptions: { label: string; resolution: string; url: string }[];
  filename: string;
} | null> {
  try {
    const apiUrl = `${YT_DLP_API}/info?url=${encodeURIComponent(url)}&audio=${audioOnly ? "1" : "0"}`;
    const res = await fetch(apiUrl, {
      signal: AbortSignal.timeout(35000),
      headers: { "Accept": "application/json" },
    });

    if (!res.ok) {
      console.log(`yt-dlp API returned ${res.status}`);
      return null;
    }

    const data = await res.json();

    if (data.error || !data.qualityOptions || data.qualityOptions.length === 0) {
      console.log(`yt-dlp API error: ${data.error || "no formats"}`);
      return null;
    }

    // Map the quality options to our standard format
    const qualityOptions = data.qualityOptions.map((q: { label: string; resolution: string; url: string; format?: string; bitrate?: number }) => ({
      label: q.label,
      resolution: q.resolution,
      url: q.url,
    }));

    return {
      title: data.title || "Video",
      thumbnail: data.thumbnail || "",
      duration: data.duration || "--:--",
      author: data.author || "@unknown",
      platform: data.platform || detectPlatform(url),
      downloadUrl: data.downloadUrl || qualityOptions[0].url,
      qualityOptions,
      filename: data.filename || `mova_${Date.now()}`,
    };
  } catch (error) {
    console.log(`yt-dlp API failed: ${error instanceof Error ? error.message : "timeout"}`);
    return null;
  }
}

/* ──────────────── Strategy 2: TikTok via tikwm.com ─── */
async function downloadTikTok(url: string) {
  const apiUrl = `https://www.tikwm.com/api/?url=${encodeURIComponent(url)}&hd=1`;
  const res = await fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    signal: AbortSignal.timeout(10000),
  });
  if (!res.ok) throw new Error("Gagal mengambil data dari TikTok.");
  const json = await res.json();
  if (json.code !== 0 || !json.data) throw new Error(json.msg || "Video TikTok tidak ditemukan.");

  const data = json.data;
  const duration = data.duration || 0;
  const durationStr = `${String(Math.floor(duration / 60)).padStart(2, "0")}:${String(duration % 60).padStart(2, "0")}`;

  const qualityOptions: { label: string; resolution: string; url: string }[] = [];
  if (data.hdplay) qualityOptions.push({ label: "HD", resolution: "1080p", url: data.hdplay });
  if (data.play) qualityOptions.push({ label: "SD", resolution: "720p", url: data.play });
  if (data.music) qualityOptions.push({ label: "Audio", resolution: "MP3", url: data.music });

  return {
    title: data.title || "Video TikTok",
    thumbnail: data.cover || data.origin_cover || "",
    duration: durationStr,
    author: data.author?.nickname || data.author?.unique_id || "@unknown",
    platform: "TikTok",
    downloadUrl: data.hdplay || data.play || "",
    qualityOptions,
    filename: `mova_tiktok_${data.id || Date.now()}`,
  };
}

/* ──────────────── Strategy 3: YouTube InnerTube (fallback for Vercel) ─── */
async function youTubeInnerTube(videoId: string, audioOnly: boolean) {
  const clients: { clientName: string; clientVersion: string; extra?: Record<string, unknown>; thirdParty?: string }[] = [
    {
      clientName: "TVHTML5_SIMPLY_EMBEDDED_PLAYER",
      clientVersion: "2.0",
      thirdParty: { embedUrl: "https://www.google.com" },
    },
    {
      clientName: "ANDROID_VR",
      clientVersion: "1.60.2",
      extra: { androidSdkVersion: 34, osName: "Android", osVersion: "14", hl: "en", gl: "US" },
    },
    {
      clientName: "IOS",
      clientVersion: "19.45.4",
      extra: { deviceModel: "iPhone16,2", hl: "en", gl: "US" },
    },
    {
      clientName: "WEB_EMBEDDED_PLAYER",
      clientVersion: "1.20241217.01.00",
      thirdParty: { embedUrl: "https://www.google.com" },
    },
  ];

  const apiKeys = [
    "AIzaSyAO_FJ2SlqU8Q4STEHLGCilw_Y9_11qcW8",
    "AIzaSyDZNkyC-AtROwMBpLfevIvqYk-Gfi8ZOeo",
  ];

  for (const key of apiKeys) {
    for (const client of clients) {
      try {
        const context: Record<string, unknown> = {
          client: {
            clientName: client.clientName,
            clientVersion: client.clientVersion,
            hl: "en",
            gl: "US",
            ...client.extra,
          },
        };
        if (client.thirdParty) context.thirdParty = client.thirdParty;

        const response = await fetch(
          `https://www.youtube.com/youtubei/v1/player?prettyPrint=false&key=${key}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Origin": "https://www.youtube.com",
              "Referer": "https://www.youtube.com/",
              "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
            },
            body: JSON.stringify({ videoId, context }),
            signal: AbortSignal.timeout(6000),
          }
        );

        if (!response.ok) continue;
        const data = await response.json();
        const result = parseYouTubeInnerTubeResponse(data, videoId, audioOnly);
        if (result) return result;
      } catch { continue; }
    }
  }

  return null;
}

function parseYouTubeInnerTubeResponse(
  data: Record<string, unknown>,
  videoId: string,
  audioOnly: boolean
) {
  const videoDetails = (data.videoDetails || {}) as Record<string, unknown>;
  const streamingData = (data.streamingData || {}) as Record<string, unknown>;
  const playability = (data.playabilityStatus || {}) as Record<string, unknown>;

  if (playability.status !== "OK") return null;

  const title = (videoDetails.title as string) || "Video YouTube";
  const author = (videoDetails.author as string) || "@unknown";
  const lengthSeconds = parseInt((videoDetails.lengthSeconds as string) || "0") || 0;
  const duration = `${String(Math.floor(lengthSeconds / 60)).padStart(2, "0")}:${String(lengthSeconds % 60).padStart(2, "0")}`;
  const thumbnail = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

  const formats = (streamingData.formats || []) as Record<string, unknown>[];
  const adaptiveFormats = (streamingData.adaptiveFormats || []) as Record<string, unknown>[];

  const qualityOptions: { label: string; resolution: string; url: string }[] = [];

  const audioFormats = adaptiveFormats.filter(
    (f) => typeof f.mimeType === "string" && f.mimeType.includes("audio") && f.url
  );

  if (audioOnly) {
    const mp4Audio = audioFormats.find((f) => f.itag === 140) ||
                     audioFormats.find((f) => typeof f.mimeType === "string" && f.mimeType.includes("mp4")) ||
                     audioFormats[0];
    if (mp4Audio?.url) {
      qualityOptions.push({ label: "Audio", resolution: "MP3", url: mp4Audio.url as string });
    }
  } else {
    for (const f of formats) {
      if (f.url) {
        const quality = (f.qualityLabel as string) || (f.quality as string) || "360p";
        qualityOptions.push({ label: quality, resolution: quality, url: f.url as string });
      }
    }
    const mp4Audio = audioFormats.find((f) => f.itag === 140) ||
                     audioFormats.find((f) => typeof f.mimeType === "string" && f.mimeType.includes("mp4")) ||
                     audioFormats[0];
    if (mp4Audio?.url) {
      qualityOptions.push({ label: "Audio", resolution: "MP3", url: mp4Audio.url as string });
    }
  }

  if (qualityOptions.length === 0) return null;

  return {
    title, thumbnail, duration, author,
    platform: "YouTube",
    downloadUrl: qualityOptions[0].url,
    qualityOptions,
    filename: `mova_youtube_${videoId}`,
  };
}

/* ──────────────── Strategy 4: Reddit Downloader ─── */
async function downloadReddit(url: string) {
  let jsonUrl = url;
  if (url.includes("reddit.com")) {
    jsonUrl = url.replace(/\/$/, "") + ".json";
  }

  const res = await fetch(jsonUrl, {
    headers: { "User-Agent": "Mova/1.0 (by /u/movaproject)" },
    signal: AbortSignal.timeout(8000),
  });

  if (!res.ok) throw new Error("Reddit API gagal");

  const data = await res.json();
  const post = data?.[0]?.data?.children?.[0]?.data;
  if (!post) throw new Error("Post Reddit tidak ditemukan");

  const media = post.secure_media?.reddit_video || post.media?.reddit_video;
  if (!media?.fallback_url) throw new Error("Video Reddit tidak ditemukan");

  const qualityOptions: { label: string; resolution: string; url: string }[] = [];
  qualityOptions.push({ label: "HD", resolution: "720p", url: media.fallback_url });

  const audioUrl = media.fallback_url.replace("/DASH_720.mp4", "/DASH_audio.mp4").replace("/DASH_480.mp4", "/DASH_audio.mp4");
  if (audioUrl !== media.fallback_url) {
    qualityOptions.push({ label: "Audio", resolution: "MP3", url: audioUrl });
  }

  return {
    title: post.title || "Reddit Video",
    thumbnail: post.thumbnail || "",
    duration: "--:--",
    author: post.author || "@unknown",
    platform: "Reddit",
    downloadUrl: media.fallback_url,
    qualityOptions,
    filename: `mova_reddit_${Date.now()}`,
  };
}

/* ──────────────── Strategy 5: Twitter/X Downloader ─── */
async function downloadTwitter(url: string) {
  const fxTwitterUrl = url.replace("twitter.com", "fxtwitter.com").replace("x.com", "fxtwitter.com");

  const res = await fetch(fxTwitterUrl, {
    headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" },
    signal: AbortSignal.timeout(8000),
  });

  if (!res.ok) throw new Error("FxTwitter gagal");

  const html = await res.text();
  const videoMatch = html.match(/content="([^"]+)"\s+property="og:video(:secure_url)?"/);
  const videoUrl = videoMatch?.[1];

  if (!videoUrl) throw new Error("Video Twitter/X tidak ditemukan");

  const qualityOptions: { label: string; resolution: string; url: string }[] = [];
  qualityOptions.push({ label: "Best", resolution: "Auto", url: videoUrl });

  return {
    title: "Twitter/X Video",
    thumbnail: "",
    duration: "--:--",
    author: "@unknown",
    platform: "Twitter/X",
    downloadUrl: videoUrl,
    qualityOptions,
    filename: `mova_twitter_${Date.now()}`,
  };
}

/* ──────────────── Main Handler ──────────────── */
export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for") || "unknown";
  const { success } = rateLimit(ip, 10);
  if (!success) {
    return NextResponse.json({ error: "Terlalu banyak request. Tunggu sebentar ya." }, { status: 429, headers: { "Retry-After": "60" } });
  }

  try {
    const body = await request.json();
    const { url, audioMode } = body;

    if (!url || typeof url !== "string") {
      return NextResponse.json({ error: "URL tidak boleh kosong." }, { status: 400 });
    }

    const trimmedUrl = url.trim();

    let parsedUrl: URL;
    try {
      parsedUrl = new URL(trimmedUrl);
    } catch {
      return NextResponse.json({ error: "Format URL tidak valid. Pastikan link yang dimasukkan benar." }, { status: 400 });
    }

    if (!["http:", "https:"].includes(parsedUrl.protocol)) {
      return NextResponse.json({ error: "Hanya URL dengan protokol HTTP/HTTPS yang didukung." }, { status: 400 });
    }

    const platform = detectPlatform(trimmedUrl);
    let result;

    try {
      switch (platform) {
        case "TikTok": {
          // TikTok: try tikwm first (fast), then yt-dlp
          try {
            result = await downloadTikTok(trimmedUrl);
          } catch {
            result = await downloadWithYtdlp(trimmedUrl, audioMode === true);
          }
          break;
        }

        case "YouTube": {
          // YouTube: try yt-dlp API first (reliable, real files), then InnerTube
          result = await downloadWithYtdlp(trimmedUrl, audioMode === true);
          if (!result) {
            console.log("yt-dlp API failed for YouTube, trying InnerTube...");
            const videoId = extractYouTubeVideoId(trimmedUrl);
            if (videoId) {
              result = await youTubeInnerTube(videoId, audioMode === true);
            }
          }
          break;
        }

        case "Reddit": {
          try { result = await downloadReddit(trimmedUrl); } catch {
            result = await downloadWithYtdlp(trimmedUrl, audioMode === true);
          }
          break;
        }

        case "Twitter/X": {
          try { result = await downloadTwitter(trimmedUrl); } catch {
            result = await downloadWithYtdlp(trimmedUrl, audioMode === true);
          }
          break;
        }

        default: {
          // For all other platforms, try yt-dlp API first
          result = await downloadWithYtdlp(trimmedUrl, audioMode === true);
          break;
        }
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Gagal memproses video.";
      return NextResponse.json({ error: errorMessage }, { status: 422 });
    }

    if (!result) {
      return NextResponse.json({
        error: audioMode
          ? "Gagal mengekstrak audio. Video mungkin dibatasi atau privat. Coba video lain."
          : "Gagal mengunduh video. Video mungkin dibatasi atau privat. Coba video lain."
      }, { status: 500 });
    }

    // Convert download URLs to proxy URLs to avoid CORS issues
    const encodedSourceUrl = encodeURIComponent(trimmedUrl);
    const proxiedQualityOptions = result.qualityOptions.map((q) => ({
      ...q,
      originalUrl: q.url,
      url: `/api/proxy?url=${encodeURIComponent(q.url)}&sourceUrl=${encodedSourceUrl}&filename=${encodeURIComponent(result.filename)}&quality=${encodeURIComponent(q.label)}`,
    }));

    return NextResponse.json(
      {
        ...result,
        originalDownloadUrl: result.downloadUrl,
        downloadUrl: `/api/proxy?url=${encodeURIComponent(result.downloadUrl)}&sourceUrl=${encodedSourceUrl}&filename=${encodeURIComponent(result.filename)}&quality=best`,
        qualityOptions: proxiedQualityOptions,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Download API error:", error);
    return NextResponse.json({ error: "Terjadi kesalahan internal. Silakan coba lagi nanti." }, { status: 500 });
  }
}

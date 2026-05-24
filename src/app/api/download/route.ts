import { NextRequest, NextResponse } from "next/server";
import { rateLimit } from "@/lib/rate-limit";

export const maxDuration = 60;

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

/* ──────────────── TikTok Downloader (tikwm.com) ──────────────── */
async function downloadTikTok(url: string) {
  const apiUrl = `https://www.tikwm.com/api/?url=${encodeURIComponent(url)}&hd=1`;
  const res = await fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    signal: AbortSignal.timeout(10000),
  });
  if (!res.ok) throw new Error("Gagal mengambil data dari TikTok. Coba lagi nanti.");
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

/* ──────────────── Loader.to API — Fast polling with progressive intervals ─── */
async function downloadWithLoader(
  url: string,
  platform: string,
  audioOnly = false
): Promise<{
  title: string; thumbnail: string; duration: string; author: string;
  platform: string; downloadUrl: string;
  qualityOptions: { label: string; resolution: string; url: string }[];
  filename: string;
}> {
  const format = audioOnly ? "mp3" : "720";

  // Step 1: Initiate download request (fast, 10s timeout)
  const initUrl = `https://loader.to/ajax/download.php?format=${format}&url=${encodeURIComponent(url)}`;
  const initRes = await fetch(initUrl, {
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      "Accept": "application/json",
      "Referer": "https://loader.to/",
    },
    signal: AbortSignal.timeout(10000),
  });

  if (!initRes.ok) throw new Error(`Gagal menghubungi server download (${initRes.status}).`);

  const initData = await initRes.json();
  if (!initData.success || !initData.id) {
    throw new Error(initData.msg || `Gagal memproses video dari ${platform}. Pastikan link valid dan video bersifat publik.`);
  }

  const taskId = initData.id;
  const progressUrl = initData.progress_url || `https://p.savenow.to/api/progress?id=${taskId}`;
  let title = initData.title || `Video ${platform}`;
  const info = initData.info as Record<string, string> | undefined;

  // Step 2: Poll with progressive backoff (1s → 1.5s → 2s), max 25s total
  let downloadUrl = "";
  const pollSchedule = [1000, 1000, 1000, 1500, 1500, 1500, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000]; // ~25s total

  for (let i = 0; i < pollSchedule.length; i++) {
    await new Promise((resolve) => setTimeout(resolve, pollSchedule[i]));

    try {
      const progressRes = await fetch(progressUrl, {
        headers: { "User-Agent": "Mozilla/5.0", "Accept": "application/json" },
        signal: AbortSignal.timeout(5000),
      });

      if (!progressRes.ok) continue;
      const progressData = await progressRes.json();

      if (progressData.success === 1 && progressData.download_url) {
        downloadUrl = progressData.download_url;
        break;
      }
    } catch { continue; }
  }

  if (!downloadUrl) {
    throw new Error(`Timeout saat memproses video dari ${platform}. Server mungkin sedang sibuk, coba lagi nanti.`);
  }

  // Step 3: Get video info (in parallel with other fetches if needed)
  let thumbnail = "";
  let duration = "";
  let author = "@unknown";

  if (platform === "YouTube") {
    const videoId = extractYouTubeVideoId(url);
    if (videoId) {
      thumbnail = info?.image || `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
      author = info?.channel || "@unknown";
      // Fast oEmbed for title/author (5s max)
      try {
        const oembedRes = await fetch(
          `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`,
          { signal: AbortSignal.timeout(3000) }
        );
        if (oembedRes.ok) {
          const oembed = await oembedRes.json();
          title = oembed.title || title;
          author = oembed.author_name || author;
        }
      } catch {}
    }
  } else if (info) {
    thumbnail = info.image || info.thumbnail || "";
    author = info.channel || info.author || "@unknown";
  }

  // Build quality options — NO secondary polling for MP3 (saves 40s!)
  const qualityOptions: { label: string; resolution: string; url: string }[] = [];
  const isAudio = format === "mp3";

  if (isAudio) {
    qualityOptions.push({ label: "Audio", resolution: "MP3", url: downloadUrl });
  } else {
    qualityOptions.push({ label: "Best", resolution: "720p", url: downloadUrl });
  }

  const videoId = platform === "YouTube" ? extractYouTubeVideoId(url) : Date.now();

  return {
    title, thumbnail, duration, author, platform, downloadUrl, qualityOptions,
    filename: `mova_${platform.toLowerCase()}_${videoId || Date.now()}`,
  };
}

/* ──────────────── YouTube InnerTube — multiple client strategies ─── */
async function youTubeInnerTube(videoId: string, audioOnly: boolean) {
  // Try multiple clients in order — fast ones first
  const clients = [
    { name: "WEB_CREATOR", clientName: "WEB_CREATOR", clientVersion: "1.20241217.01.00", hl: "en", gl: "US" },
    { name: "ANDROID_VR", clientName: "ANDROID_VR", clientVersion: "1.50.14", hl: "en", gl: "US", androidSdkVersion: 32, osName: "Android", osVersion: "12" },
    { name: "IOS", clientName: "IOS", clientVersion: "19.45.4", hl: "en", gl: "US", deviceModel: "iPhone16,2" },
  ];

  for (const client of clients) {
    try {
      const context: Record<string, unknown> = {
        client: {
          clientName: client.clientName,
          clientVersion: client.clientVersion,
          hl: client.hl,
          gl: client.gl,
          ...(client.androidSdkVersion ? { androidSdkVersion: client.androidSdkVersion, osName: client.osName, osVersion: client.osVersion } : {}),
          ...(client.deviceModel ? { deviceModel: client.deviceModel } : {}),
        },
      };

      const response = await fetch(
        "https://www.youtube.com/youtubei/v1/player?prettyPrint=false&key=AIzaSyA8eiZmM1FaDVjRy-df2KTyQ_vz_yYM39w",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
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

  return null;
}

/* ─── Parse InnerTube Response ─── */
function parseYouTubeInnerTubeResponse(
  data: Record<string, unknown>,
  videoId: string,
  audioOnly: boolean
) {
  const videoDetails = (data.videoDetails || {}) as Record<string, unknown>;
  const streamingData = (data.streamingData || {}) as Record<string, unknown>;
  const playability = (data.playabilityStatus || {}) as Record<string, unknown>;

  if (playability.status !== "OK") {
    const reason = (playability.reason as string) || "Video tidak tersedia untuk download.";
    throw new Error(reason);
  }

  const title = (videoDetails.title as string) || "Video YouTube";
  const author = (videoDetails.author as string) || "@unknown";
  const lengthSeconds = parseInt((videoDetails.lengthSeconds as string) || "0") || 0;
  const duration = `${String(Math.floor(lengthSeconds / 60)).padStart(2, "0")}:${String(lengthSeconds % 60).padStart(2, "0")}`;
  const thumbnail = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

  const formats = (streamingData.formats || []) as Record<string, unknown>[];
  const adaptiveFormats = (streamingData.adaptiveFormats || []) as Record<string, unknown>[];

  const qualityOptions: { label: string; resolution: string; url: string }[] = [];

  if (audioOnly) {
    const audioFormats = adaptiveFormats.filter(
      (f) => typeof f.mimeType === "string" && f.mimeType.includes("audio") && f.url
    );
    const mp4Audio = audioFormats.find((f) => f.itag === 140) ||
                     audioFormats.find((f) => typeof f.mimeType === "string" && f.mimeType.includes("mp4"));
    const bestAudio = mp4Audio || audioFormats[0];
    if (bestAudio?.url) {
      qualityOptions.push({ label: "Audio", resolution: "MP3", url: bestAudio.url as string });
    }
  } else {
    for (const f of formats) {
      if (f.url) {
        const quality = (f.qualityLabel as string) || (f.quality as string) || "360p";
        qualityOptions.push({ label: quality, resolution: quality, url: f.url as string });
      }
    }
    // Add audio-only option from adaptive formats
    const audioFormats = adaptiveFormats.filter(
      (f) => typeof f.mimeType === "string" && f.mimeType.includes("audio") && f.url
    );
    const mp4Audio = audioFormats.find((f) => f.itag === 140) ||
                     audioFormats.find((f) => typeof f.mimeType === "string" && f.mimeType.includes("mp4"));
    const bestAudio = mp4Audio || audioFormats[0];
    if (bestAudio?.url) {
      qualityOptions.push({ label: "Audio", resolution: "MP3", url: bestAudio.url as string });
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

/* ──────────────── YouTube Downloader — Fast: InnerTube first, then Loader.to ─── */
async function downloadYouTube(url: string, audioOnly = false) {
  const videoId = extractYouTubeVideoId(url);
  if (!videoId) throw new Error("URL YouTube tidak valid. Pastikan link benar.");

  // Strategy 1: Try InnerTube (instant when it works, no polling)
  try {
    const result = await youTubeInnerTube(videoId, audioOnly);
    if (result) return result;
  } catch {}

  // Strategy 2: Loader.to with fast polling
  return await downloadWithLoader(url, "YouTube", audioOnly);
}

/* ──────────────── Reddit Downloader ──────────────── */
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

/* ──────────────── Twitter/X Downloader ──────────────── */
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
        case "TikTok":
          result = await downloadTikTok(trimmedUrl);
          break;
        case "YouTube":
          result = await downloadYouTube(trimmedUrl, audioMode === true);
          break;
        case "Reddit":
          try { result = await downloadReddit(trimmedUrl); } catch {
            result = await downloadWithLoader(trimmedUrl, platform, audioMode === true);
          }
          break;
        case "Twitter/X":
          try { result = await downloadTwitter(trimmedUrl); } catch {
            result = await downloadWithLoader(trimmedUrl, platform, audioMode === true);
          }
          break;
        default:
          result = await downloadWithLoader(trimmedUrl, platform, audioMode === true);
          break;
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Gagal memproses video.";
      return NextResponse.json({ error: errorMessage }, { status: 422 });
    }

    if (!result) {
      return NextResponse.json({ error: "Gagal memproses video. Silakan coba lagi." }, { status: 500 });
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

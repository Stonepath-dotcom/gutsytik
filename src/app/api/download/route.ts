import { NextRequest, NextResponse } from "next/server";
import { rateLimit } from "@/lib/rate-limit";

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

/* ──────────────── TikTok Downloader (tikwm.com) ──────────────── */
async function downloadTikTok(url: string) {
  const apiUrl = `https://www.tikwm.com/api/?url=${encodeURIComponent(url)}&hd=1`;
  const res = await fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
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

/* ──────────────── YouTube Downloader (InnerTube API) ──────────────── */
async function downloadYouTube(url: string, audioOnly = false) {
  const videoId = extractYouTubeVideoId(url);
  if (!videoId) throw new Error("URL YouTube tidak valid. Pastikan link benar.");

  // Use ANDROID_VR client — returns direct streaming URLs without signature/cipher
  const response = await fetch(
    "https://www.youtube.com/youtubei/v1/player?prettyPrint=false&key=AIzaSyA8eiZmM1FaDVjRy-df2KTyQ_vz_yYM39w",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        videoId,
        context: {
          client: {
            clientName: "ANDROID_VR",
            clientVersion: "1.50.14",
            hl: "en",
            gl: "US",
            androidSdkVersion: 32,
            osName: "Android",
            osVersion: "12",
          },
        },
      }),
    }
  );

  if (!response.ok) throw new Error("Gagal mengambil data dari YouTube. Coba lagi nanti.");

  const data = await response.json();
  const videoDetails = data.videoDetails || {};
  const streamingData = data.streamingData || {};
  const playability = data.playabilityStatus || {};

  if (playability.status !== "OK") {
    const reason = playability.reason || "Video tidak tersedia untuk download.";
    throw new Error(reason);
  }

  const title = videoDetails.title || "Video YouTube";
  const author = videoDetails.author || "@unknown";
  const lengthSeconds = parseInt(videoDetails.lengthSeconds || "0") || 0;
  const duration = `${String(Math.floor(lengthSeconds / 60)).padStart(2, "0")}:${String(lengthSeconds % 60).padStart(2, "0")}`;

  // Thumbnail: use YouTube's direct thumbnail URL
  const thumbnail = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

  const qualityOptions: { label: string; resolution: string; url: string }[] = [];

  // Combined formats (video + audio in one file, usually only 360p)
  const formats = streamingData.formats || [];
  const adaptiveFormats = streamingData.adaptiveFormats || [];

  if (audioOnly) {
    // Audio only: pick the best audio format
    const audioFormats = adaptiveFormats.filter(
      (f: Record<string, unknown>) => typeof f.mimeType === "string" && f.mimeType.includes("audio") && f.url
    );
    // Prefer mp4 audio (itag 140 = medium quality m4a)
    const mp4Audio = audioFormats.find((f: Record<string, unknown>) => f.itag === 140) ||
                     audioFormats.find((f: Record<string, unknown>) => typeof f.mimeType === "string" && f.mimeType.includes("mp4"));
    const bestAudio = mp4Audio || audioFormats[0];
    if (bestAudio) {
      qualityOptions.push({ label: "Audio", resolution: "MP3", url: bestAudio.url as string });
    }
  } else {
    // Video: prioritize combined formats (video+audio), then adaptive video-only
    // Combined format (itag 18 = 360p with audio)
    for (const f of formats) {
      if (f.url) {
        const quality = f.qualityLabel || f.quality || "360p";
        qualityOptions.push({ label: quality, resolution: quality, url: f.url });
      }
    }

    // Adaptive video-only formats (higher quality but no audio)
    const videoFormats = adaptiveFormats.filter(
      (f: Record<string, unknown>) => typeof f.mimeType === "string" && f.mimeType.includes("video") && f.url
    );

    // Deduplicate by quality — prefer mp4 over webm
    const seen = new Set<string>();
    for (const f of videoFormats) {
      const q = (f.qualityLabel as string) || (f.quality as string) || "?";
      if (seen.has(q)) continue;
      seen.add(q);
      // Skip 360p since we already have it from combined format
      if (q === "360p" && qualityOptions.some(o => o.resolution === "360p")) continue;
      qualityOptions.push({ label: q, resolution: q, url: f.url as string });
    }

    // Also add audio-only option
    const audioFormats = adaptiveFormats.filter(
      (f: Record<string, unknown>) => typeof f.mimeType === "string" && f.mimeType.includes("audio") && f.url
    );
    const mp4Audio = audioFormats.find((f: Record<string, unknown>) => f.itag === 140) ||
                     audioFormats.find((f: Record<string, unknown>) => typeof f.mimeType === "string" && f.mimeType.includes("mp4"));
    const bestAudio = mp4Audio || audioFormats[0];
    if (bestAudio) {
      qualityOptions.push({ label: "Audio", resolution: "MP3", url: bestAudio.url as string });
    }
  }

  if (qualityOptions.length === 0) {
    throw new Error("Tidak ada format video yang tersedia untuk download. Coba video lain.");
  }

  return {
    title,
    thumbnail,
    duration,
    author,
    platform: "YouTube",
    downloadUrl: qualityOptions[0].url,
    qualityOptions,
    filename: `mova_youtube_${videoId}`,
  };
}

/* ──────────────── Instagram Downloader ──────────────── */
async function downloadInstagram(url: string) {
  // Try using a public Instagram download API
  try {
    const apiUrl = `https://api.saveig.app/api/v1/download?url=${encodeURIComponent(url)}`;
    const res = await fetch(apiUrl, {
      headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" },
    });
    if (res.ok) {
      const data = await res.json();
      if (data.url || data.downloadUrl) {
        const qualityOptions: { label: string; resolution: string; url: string }[] = [];
        const downloadUrl = data.url || data.downloadUrl;
        qualityOptions.push({ label: "Best", resolution: "Auto", url: downloadUrl });
        return {
          title: data.title || data.caption || "Instagram Video",
          thumbnail: data.thumbnail || data.thumb || "",
          duration: data.duration || "--:--",
          author: data.author || data.username || "@unknown",
          platform: "Instagram",
          downloadUrl,
          qualityOptions,
          filename: `mova_instagram_${Date.now()}`,
        };
      }
    }
  } catch {}

  // Fallback: Try another approach
  throw new Error("Download Instagram saat ini sedang tidak tersedia. Coba lagi nanti atau gunakan link TikTok/YouTube.");
}

/* ──────────────── Generic Downloader (Cobalt fallback) ──────────────── */
async function downloadGeneric(url: string, platform: string, audioOnly = false) {
  // Try Cobalt API (v7 requires auth, but some community instances may work)
  const cobaltInstances = [
    "https://api.cobalt.tools/",
  ];

  for (const cobaltUrl of cobaltInstances) {
    try {
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

      if (!response.ok) continue;

      const data = await response.json();
      if (data.error || !data.url) continue;

      const suggestedFilename = data.filename || `mova_${platform.toLowerCase()}_${Date.now()}`;
      const isAudioFile = suggestedFilename.endsWith(".mp3") || suggestedFilename.endsWith(".ogg") || audioOnly;

      const qualityOptions: { label: string; resolution: string; url: string }[] = [];
      if (isAudioFile) {
        qualityOptions.push({ label: "Audio", resolution: "MP3", url: data.url });
      } else {
        qualityOptions.push({ label: "Best", resolution: "Auto", url: data.url });
        // Try to get audio-only version
        try {
          const audioRes = await fetch(cobaltUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json", "Accept": "application/json" },
            body: JSON.stringify({ url, downloadMode: "audio" }),
          });
          if (audioRes.ok) {
            const audioData = await audioRes.json();
            if (audioData.url) qualityOptions.push({ label: "Audio", resolution: "MP3", url: audioData.url });
          }
        } catch {}
      }

      return {
        title: `Video ${platform}`,
        thumbnail: "",
        duration: "--:--",
        author: "@unknown",
        platform,
        downloadUrl: data.url,
        qualityOptions,
        filename: `mova_${platform.toLowerCase()}_${Date.now()}`,
      };
    } catch {
      continue;
    }
  }

  throw new Error(`Download dari ${platform} saat ini sedang tidak tersedia. Coba gunakan link TikTok atau YouTube.`);
}

/* ──────────────── Main Handler ──────────────── */
export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for") || "unknown";
  const { success } = rateLimit(ip, 10);
  if (!success) {
    return NextResponse.json({ error: "Too many requests. Please wait a moment." }, { status: 429, headers: { "Retry-After": "60" } });
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
        case "Instagram":
          result = await downloadInstagram(trimmedUrl);
          break;
        default:
          result = await downloadGeneric(trimmedUrl, platform, audioMode === true);
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
    return NextResponse.json({ error: "Terjadi kesalahan internal. Silakan coba lagi nanti." }, { status: 500 });
  }
}

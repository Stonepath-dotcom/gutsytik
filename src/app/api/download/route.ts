import { NextRequest, NextResponse } from "next/server";
import { rateLimit } from "@/lib/rate-limit";

export const maxDuration = 60;

/* ──────── Types ──────── */
interface QualityOption {
  label: string;
  resolution: string;
  url: string;
  originalUrl?: string;
}

interface DownloadResult {
  title: string;
  thumbnail: string;
  duration: string;
  author: string;
  platform: string;
  downloadUrl: string;
  originalDownloadUrl?: string;
  qualityOptions: QualityOption[];
  filename: string;
}

/* ──────── Backend API Configuration ──────── */
// The external backend API running on Render/Railway with yt-dlp + ffmpeg
const MOVA_API_URL = process.env.MOVA_API_URL || "";
const YT_DLP_API = process.env.YTDLP_API_URL || MOVA_API_URL || "http://127.0.0.1:8888";

// Check if external backend is available
const hasExternalBackend = MOVA_API_URL.length > 0;

/* ──────── Platform Detection ──────── */
type Platform = "youtube" | "tiktok" | "instagram" | "twitter" | "facebook" | "pinterest" | "reddit" | "unknown";

function detectPlatform(urlStr: string): Platform {
  try {
    const h = new URL(urlStr.startsWith("www.") ? "https://" + urlStr : urlStr).hostname.toLowerCase();
    if (h.includes("youtube.com") || h.includes("youtu.be")) return "youtube";
    if (h.includes("tiktok.com") || h.includes("vm.tiktok")) return "tiktok";
    if (h.includes("instagram.com")) return "instagram";
    if (h.includes("twitter.com") || h.includes("x.com")) return "twitter";
    if (h.includes("facebook.com") || h.includes("fb.watch") || h.includes("fb.com")) return "facebook";
    if (h.includes("pinterest.com") || h.includes("pin.it")) return "pinterest";
    if (h.includes("reddit.com") || h.includes("redd.it")) return "reddit";
  } catch {}
  return "unknown";
}

function extractYouTubeVideoId(url: string): string | null {
  try {
    const u = new URL(url.startsWith("www.") ? "https://" + url : url);
    const v = u.searchParams.get("v");
    if (v) return v;
    if (u.hostname.includes("youtu.be")) return u.pathname.slice(1).split("/")[0] || null;
    if (u.pathname.startsWith("/embed/")) return u.pathname.split("/")[2] || null;
    if (u.pathname.startsWith("/shorts/")) return u.pathname.split("/")[2] || null;
  } catch {}
  return null;
}

/* ──────── YouTube Handler (uses external backend API) ──────── */
async function handleYouTube(url: string, audioMode: boolean): Promise<DownloadResult> {
  const videoId = extractYouTubeVideoId(url);
  if (!videoId) throw new Error("Link YouTube tidak valid. Pastikan link mengandung ID video.");

  // Strategy 1: Use external backend API (Render/Railway with yt-dlp)
  if (hasExternalBackend) {
    try {
      return await handleYouTubeViaBackend(url, audioMode, videoId);
    } catch (backendError) {
      console.error(`[download] External backend failed for YouTube, falling back: ${backendError instanceof Error ? backendError.message : "unknown"}`);
      // Fall through to fallback
    }
  }

  // Strategy 2: Fallback to yt-edge (InnerTube API) if external backend unavailable
  try {
    return await handleYouTubeViaEdge(url, audioMode, videoId);
  } catch (edgeError) {
    console.error(`[download] yt-edge also failed: ${edgeError instanceof Error ? edgeError.message : "unknown"}`);
  }

  // Strategy 3: Try old yt-dlp proxy
  try {
    return await handleYtdlpProxy(url, audioMode, "YouTube");
  } catch (ytdlpError) {
    console.error(`[download] yt-dlp proxy also failed: ${ytdlpError instanceof Error ? ytdlpError.message : "unknown"}`);
  }

  throw new Error("Gagal mengambil info video YouTube. Semua metode gagal. Coba lagi nanti.");
}

/* ──────── YouTube via External Backend API ──────── */
async function handleYouTubeViaBackend(url: string, audioMode: boolean, videoId: string): Promise<DownloadResult> {
  const apiUrl = `${MOVA_API_URL}/info?url=${encodeURIComponent(url)}&audio=${audioMode ? "1" : "0"}`;
  console.log(`[download] YouTube via backend: ${apiUrl.substring(0, 120)}...`);

  const res = await fetch(apiUrl, {
    signal: AbortSignal.timeout(60000), // Longer timeout for external backend
    headers: { "Accept": "application/json" },
  });

  const data = await res.json();
  if (!res.ok || data.error) {
    throw new Error(data.error || "External backend returned an error.");
  }

  // Map quality options - use backend's /stream endpoint for proxying
  const qualityOptions: QualityOption[] = (data.qualityOptions || []).map((q: Record<string, unknown>) => {
    const isAudio = q.resolution === "MP3" || (q.label as string || "").includes("Audio");

    // For audio: use /convert endpoint on backend (converts to proper MP3)
    // For video: use /stream endpoint on backend (streams with proper headers)
    let proxyUrl: string;
    if (isAudio) {
      proxyUrl = `${MOVA_API_URL}/convert?url=${encodeURIComponent(q.url as string)}&format=mp3&bitrate=192k&filename=mova_youtube_${videoId}_${q.label}`;
    } else if ((q.needsMuxing as boolean) && q.audioUrl) {
      // Video needs muxing - use /download endpoint which does yt-dlp merge
      proxyUrl = `${MOVA_API_URL}/download?url=${encodeURIComponent(url)}&quality=${encodeURIComponent(q.label as string)}&audio=0`;
    } else {
      proxyUrl = `${MOVA_API_URL}/stream?url=${encodeURIComponent(q.url as string)}&quality=${encodeURIComponent(q.label as string)}&filename=mova_youtube_${videoId}`;
    }

    return {
      label: q.label as string,
      resolution: q.resolution as string,
      url: proxyUrl,
      originalUrl: q.url as string,
    };
  });

  if (qualityOptions.length === 0) {
    throw new Error("No formats found from backend API.");
  }

  return {
    title: data.title || "Video YouTube",
    thumbnail: data.thumbnail || `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
    duration: data.duration || "--:--",
    author: data.author || "@unknown",
    platform: "YouTube",
    downloadUrl: qualityOptions[0].url,
    originalDownloadUrl: qualityOptions[0].originalUrl,
    qualityOptions,
    filename: data.filename || `mova_youtube_${videoId}`,
  };
}

/* ──────── YouTube via Edge (InnerTube API) - Fallback ──────── */
async function handleYouTubeViaEdge(url: string, audioMode: boolean, videoId: string): Promise<DownloadResult> {
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const res = await fetch(`${baseUrl}/api/yt-edge`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ videoId, audioOnly: audioMode }),
    signal: AbortSignal.timeout(30000),
  });

  const data = await res.json();
  if (!res.ok || data.error) {
    throw new Error(data.error || "yt-edge API error.");
  }

  const qualityOptions: QualityOption[] = (data.qualityOptions || []).map((q: QualityOption) => ({
    label: q.label,
    resolution: q.resolution,
    url: q.url,
    originalUrl: q.originalUrl || q.url,
  }));

  // Proxy through Vercel's /api/proxy for better compatibility
  const proxiedQualityOptions = qualityOptions.map((q) => {
    const isAudio = q.resolution === "MP3" || q.label.includes("Audio");
    let proxyUrl: string;

    if (hasExternalBackend && isAudio) {
      // Use external backend for audio conversion
      proxyUrl = `${MOVA_API_URL}/convert?url=${encodeURIComponent(q.originalUrl || q.url)}&format=mp3&bitrate=192k&filename=mova_youtube_${videoId}_${q.label}`;
    } else {
      proxyUrl = `/api/proxy?url=${encodeURIComponent(q.url)}&quality=${encodeURIComponent(q.label)}&filename=mova_youtube_${videoId}&sourceUrl=${encodeURIComponent(url)}`;
    }

    return {
      ...q,
      originalUrl: q.url,
      url: proxyUrl,
    };
  });

  return {
    title: data.title || "Video YouTube",
    thumbnail: data.thumbnail || `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
    duration: data.duration || "--:--",
    author: data.author || "@unknown",
    platform: "YouTube",
    downloadUrl: proxiedQualityOptions[0]?.url || "",
    originalDownloadUrl: qualityOptions[0]?.url || "",
    qualityOptions: proxiedQualityOptions,
    filename: data.filename || `mova_youtube_${videoId}`,
  };
}

/* ──────── TikTok Handler ──────── */
async function handleTikTok(url: string, audioMode: boolean): Promise<DownloadResult> {
  const apiUrl = `https://www.tikwm.com/api/?url=${encodeURIComponent(url)}&hd=1`;

  const res = await fetch(apiUrl, {
    signal: AbortSignal.timeout(20000),
    headers: { "Accept": "application/json" },
  });

  const data = await res.json();
  if (data.code !== 0 || !data.data) {
    throw new Error("Gagal mengambil info video TikTok. Pastikan link benar dan video tidak private.");
  }

  const info = data.data;
  const qualityOptions: QualityOption[] = [];

  if (audioMode) {
    qualityOptions.push({
      label: "Audio",
      resolution: "MP3",
      url: `/api/proxy?url=${encodeURIComponent(info.music)}&quality=Audio&filename=mova_tiktok_music&sourceUrl=${encodeURIComponent(url)}`,
      originalUrl: info.music,
    });
  } else {
    if (info.hdplay) {
      qualityOptions.push({
        label: "HD 1080p",
        resolution: "1080p",
        url: `/api/proxy?url=${encodeURIComponent(info.hdplay)}&quality=HD+1080p&filename=mova_tiktok_hd&sourceUrl=${encodeURIComponent(url)}`,
        originalUrl: info.hdplay,
      });
    }
    if (info.play) {
      qualityOptions.push({
        label: info.hdplay ? "SD 720p" : "HD 720p",
        resolution: info.hdplay ? "720p" : "720p",
        url: `/api/proxy?url=${encodeURIComponent(info.play)}&quality=SD+720p&filename=mova_tiktok&sourceUrl=${encodeURIComponent(url)}`,
        originalUrl: info.play,
      });
    }
    if (info.music) {
      qualityOptions.push({
        label: "Audio",
        resolution: "MP3",
        url: `/api/proxy?url=${encodeURIComponent(info.music)}&quality=Audio&filename=mova_tiktok_music&sourceUrl=${encodeURIComponent(url)}`,
        originalUrl: info.music,
      });
    }
  }

  if (qualityOptions.length === 0) {
    throw new Error("Tidak ada format download yang tersedia untuk video TikTok ini.");
  }

  return {
    title: info.title || "Video TikTok",
    thumbnail: info.origincover || info.cover || "",
    duration: info.duration ? `${Math.floor(info.duration / 60).toString().padStart(2, "0")}:${(info.duration % 60).toString().padStart(2, "0")}` : "--:--",
    author: info.author?.nickname || info.author?.unique_id || "@unknown",
    platform: "TikTok",
    downloadUrl: qualityOptions[0].url,
    originalDownloadUrl: qualityOptions[0].originalUrl,
    qualityOptions,
    filename: `mova_tiktok_${Date.now()}`,
  };
}

/* ──────── Instagram Handler ──────── */
async function handleInstagram(url: string, audioMode: boolean): Promise<DownloadResult> {
  const apiUrl = `https://api.saveig.app/api/v1/media?url=${encodeURIComponent(url)}`;

  try {
    const res = await fetch(apiUrl, {
      signal: AbortSignal.timeout(15000),
      headers: { "Accept": "application/json" },
    });

    if (res.ok) {
      const data = await res.json();
      if (data.result && data.result.length > 0) {
        const qualityOptions: QualityOption[] = [];
        for (const item of data.result) {
          if (audioMode && item.type === "audio") {
            qualityOptions.push({
              label: "Audio",
              resolution: "MP3",
              url: `/api/proxy?url=${encodeURIComponent(item.url)}&quality=Audio&filename=mova_instagram&sourceUrl=${encodeURIComponent(url)}`,
              originalUrl: item.url,
            });
          } else if (!audioMode && (item.type === "video" || item.type === "image")) {
            const res_label = item.quality || (item.type === "video" ? "720p" : "HD");
            qualityOptions.push({
              label: item.type === "video" ? res_label : "Foto",
              resolution: res_label,
              url: `/api/proxy?url=${encodeURIComponent(item.url)}&quality=${encodeURIComponent(res_label)}&filename=mova_instagram&sourceUrl=${encodeURIComponent(url)}`,
              originalUrl: item.url,
            });
          }
        }

        if (qualityOptions.length > 0) {
          return {
            title: data.result[0].title || "Media Instagram",
            thumbnail: data.result[0].thumbnail || "",
            duration: "--:--",
            author: data.result[0].author || "@unknown",
            platform: "Instagram",
            downloadUrl: qualityOptions[0].url,
            originalDownloadUrl: qualityOptions[0].originalUrl,
            qualityOptions,
            filename: `mova_instagram_${Date.now()}`,
          };
        }
      }
    }
  } catch {
    // Primary API failed, try alternative
  }

  // Fallback: try using backend API
  return await handleYtdlpProxy(url, audioMode, "Instagram");
}

/* ──────── Twitter/X Handler ──────── */
async function handleTwitter(url: string, audioMode: boolean): Promise<DownloadResult> {
  try {
    const fxtwitterUrl = url
      .replace("twitter.com", "api.fxtwitter.com")
      .replace("x.com", "api.fxtwitter.com");

    const res = await fetch(fxtwitterUrl, {
      signal: AbortSignal.timeout(15000),
      headers: { "Accept": "application/json" },
    });

    if (res.ok) {
      const data = await res.json();
      const tweet = data.tweet;
      if (tweet && tweet.media && tweet.media.videos && tweet.media.videos.length > 0) {
        const video = tweet.media.videos[0];
        const qualityOptions: QualityOption[] = [];

        if (audioMode) {
          qualityOptions.push({
            label: "Audio",
            resolution: "MP3",
            url: `/api/proxy?url=${encodeURIComponent(video.url)}&quality=Audio&filename=mova_twitter&sourceUrl=${encodeURIComponent(url)}`,
            originalUrl: video.url,
          });
        } else {
          const variants = (video.variants || [])
            .filter((v: { content_type: string; url: string }) => v.content_type?.includes("video") && v.url)
            .sort((a: { bitrate: number }, b: { bitrate: number }) => (b.bitrate || 0) - (a.bitrate || 0));

          for (const v of variants.slice(0, 5)) {
            const quality = v.bitrate ? `${Math.round(v.bitrate / 1000)}kbps` : "Auto";
            qualityOptions.push({
              label: quality,
              resolution: quality,
              url: `/api/proxy?url=${encodeURIComponent(v.url)}&quality=${encodeURIComponent(quality)}&filename=mova_twitter&sourceUrl=${encodeURIComponent(url)}`,
              originalUrl: v.url,
            });
          }

          if (video.url && !qualityOptions.some(q => q.originalUrl === video.url)) {
            qualityOptions.unshift({
              label: "HD",
              resolution: "HD",
              url: `/api/proxy?url=${encodeURIComponent(video.url)}&quality=HD&filename=mova_twitter&sourceUrl=${encodeURIComponent(url)}`,
              originalUrl: video.url,
            });
          }
        }

        if (qualityOptions.length > 0) {
          return {
            title: tweet.text?.slice(0, 100) || "Video Twitter/X",
            thumbnail: tweet.media?.photos?.[0]?.url || video.thumbnail_url || "",
            duration: video.duration ? `${Math.floor(video.duration / 60).toString().padStart(2, "0")}:${Math.floor(video.duration % 60).toString().padStart(2, "0")}` : "--:--",
            author: tweet.author?.name || "@unknown",
            platform: "Twitter/X",
            downloadUrl: qualityOptions[0].url,
            originalDownloadUrl: qualityOptions[0].originalUrl,
            qualityOptions,
            filename: `mova_twitter_${Date.now()}`,
          };
        }
      }
    }
  } catch {
    // fxtwitter failed
  }

  // Fallback to backend API
  return await handleYtdlpProxy(url, audioMode, "Twitter/X");
}

/* ──────── Facebook Handler ──────── */
async function handleFacebook(url: string, audioMode: boolean): Promise<DownloadResult> {
  return await handleYtdlpProxy(url, audioMode, "Facebook");
}

/* ──────── Pinterest Handler ──────── */
async function handlePinterest(url: string, audioMode: boolean): Promise<DownloadResult> {
  return await handleYtdlpProxy(url, audioMode, "Pinterest");
}

/* ──────── Reddit Handler ──────── */
async function handleReddit(url: string, audioMode: boolean): Promise<DownloadResult> {
  try {
    const jsonUrl = url.replace(/\/$/, "") + ".json";
    const res = await fetch(jsonUrl, {
      signal: AbortSignal.timeout(15000),
      headers: {
        "User-Agent": "Mova/1.0 (by /u/mova_bot)",
        "Accept": "application/json",
      },
    });

    if (res.ok) {
      const data = await res.json();
      const post = data?.[0]?.data?.children?.[0]?.data;
      if (post) {
        const videoUrl = post.secure_media?.reddit_video?.fallback_url;

        if (videoUrl) {
          const qualityOptions: QualityOption[] = [];

          if (audioMode) {
            qualityOptions.push({
              label: "Audio",
              resolution: "MP3",
              url: `/api/proxy?url=${encodeURIComponent(videoUrl.replace(/DASH_[^.]+/, "DASH_audio"))}&quality=Audio&filename=mova_reddit&sourceUrl=${encodeURIComponent(url)}`,
              originalUrl: videoUrl.replace(/DASH_[^.]+/, "DASH_audio"),
            });
          } else {
            qualityOptions.push({
              label: "HD",
              resolution: "HD",
              url: `/api/proxy?url=${encodeURIComponent(videoUrl)}&quality=HD&filename=mova_reddit&sourceUrl=${encodeURIComponent(url)}`,
              originalUrl: videoUrl,
            });

            const sdUrl = videoUrl.replace(/DASH_[^.]+/, "DASH_480");
            qualityOptions.push({
              label: "SD 480p",
              resolution: "480p",
              url: `/api/proxy?url=${encodeURIComponent(sdUrl)}&quality=SD+480p&filename=mova_reddit&sourceUrl=${encodeURIComponent(url)}`,
              originalUrl: sdUrl,
            });

            qualityOptions.push({
              label: "Audio",
              resolution: "MP3",
              url: `/api/proxy?url=${encodeURIComponent(videoUrl.replace(/DASH_[^.]+/, "DASH_audio"))}&quality=Audio&filename=mova_reddit&sourceUrl=${encodeURIComponent(url)}`,
              originalUrl: videoUrl.replace(/DASH_[^.]+/, "DASH_audio"),
            });
          }

          if (qualityOptions.length > 0) {
            return {
              title: post.title || "Video Reddit",
              thumbnail: post.thumbnail?.startsWith("http") ? post.thumbnail : "",
              duration: "--:--",
              author: post.author || "u/unknown",
              platform: "Reddit",
              downloadUrl: qualityOptions[0].url,
              originalDownloadUrl: qualityOptions[0].originalUrl,
              qualityOptions,
              filename: `mova_reddit_${Date.now()}`,
            };
          }
        }
      }
    }
  } catch {
    // Reddit JSON API failed
  }

  return await handleYtdlpProxy(url, audioMode, "Reddit");
}

/* ──────── Backend API Proxy (uses external Render/Railway service) ──────── */
async function handleYtdlpProxy(url: string, audioMode: boolean, platformName: string): Promise<DownloadResult> {
  // Use external backend if available, otherwise fall back to local
  const apiBase = hasExternalBackend ? MOVA_API_URL : YT_DLP_API;
  const apiUrl = `${apiBase}/info?url=${encodeURIComponent(url)}&audio=${audioMode ? "1" : "0"}`;

  try {
    const res = await fetch(apiUrl, {
      signal: AbortSignal.timeout(hasExternalBackend ? 60000 : 35000),
      headers: { "Accept": "application/json" },
    });

    if (res.ok) {
      const data = await res.json();
      if (data.qualityOptions && data.qualityOptions.length > 0) {
        const qualityOptions: QualityOption[] = data.qualityOptions.map((q: Record<string, unknown>) => {
          // If external backend available, use its /stream endpoint
          // Otherwise, use Vercel's /api/proxy
          let downloadUrl: string;
          const isAudio = q.resolution === "MP3" || (q.label as string || "").includes("Audio");

          if (hasExternalBackend && isAudio) {
            downloadUrl = `${MOVA_API_URL}/convert?url=${encodeURIComponent(q.url as string)}&format=mp3&bitrate=192k&filename=mova_${platformName.toLowerCase().replace(/[^a-z]/g, "")}`;
          } else if (hasExternalBackend) {
            downloadUrl = `${MOVA_API_URL}/stream?url=${encodeURIComponent(q.url as string)}&quality=${encodeURIComponent(q.label as string)}&filename=mova_${platformName.toLowerCase().replace(/[^a-z]/g, "")}`;
          } else {
            downloadUrl = `/api/proxy?url=${encodeURIComponent(q.url as string)}&quality=${encodeURIComponent(q.label as string)}&filename=mova_${platformName.toLowerCase().replace(/[^a-z]/g, "")}&sourceUrl=${encodeURIComponent(url)}`;
          }

          return {
            label: q.label as string,
            resolution: q.resolution as string,
            url: downloadUrl,
            originalUrl: q.url as string,
          };
        });

        return {
          title: data.title || `Video ${platformName}`,
          thumbnail: data.thumbnail || "",
          duration: data.duration || "--:--",
          author: data.author || "@unknown",
          platform: platformName,
          downloadUrl: qualityOptions[0].url,
          originalDownloadUrl: qualityOptions[0].originalUrl,
          qualityOptions,
          filename: data.filename || `mova_${platformName.toLowerCase().replace(/[^a-z]/g, "")}_${Date.now()}`,
        };
      }

      if (data.downloadUrl || data.url) {
        const rawUrl = data.downloadUrl || data.url;
        const downloadUrl = hasExternalBackend
          ? `${MOVA_API_URL}/stream?url=${encodeURIComponent(rawUrl)}&quality=video&filename=mova_${platformName.toLowerCase().replace(/[^a-z]/g, "")}`
          : `/api/proxy?url=${encodeURIComponent(rawUrl)}&quality=video&filename=mova_${platformName.toLowerCase().replace(/[^a-z]/g, "")}&sourceUrl=${encodeURIComponent(url)}`;

        return {
          title: data.title || `Video ${platformName}`,
          thumbnail: data.thumbnail || "",
          duration: data.duration || "--:--",
          author: data.author || "@unknown",
          platform: platformName,
          downloadUrl,
          originalDownloadUrl: rawUrl,
          qualityOptions: [{
            label: "Video",
            resolution: "Auto",
            url: downloadUrl,
            originalUrl: rawUrl,
          }],
          filename: data.filename || `mova_${platformName.toLowerCase().replace(/[^a-z]/g, "")}_${Date.now()}`,
        };
      }
    }
  } catch (e) {
    console.error(`[download] Backend API failed for ${platformName}:`, e instanceof Error ? e.message : "unknown");
  }

  throw new Error(`Gagal mengambil info video ${platformName}. Server sedang sibuk, coba lagi dalam beberapa detik.`);
}

/* ──────── POST Handler ──────── */
export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for") || "unknown";
  const { success } = rateLimit(ip, 15, 60_000);
  if (!success) {
    return NextResponse.json(
      { error: "Terlalu banyak request. Tunggu sebentar lalu coba lagi." },
      { status: 429 }
    );
  }

  try {
    const body = await request.json();
    const { url, audioMode } = body as { url: string; audioMode?: boolean };

    if (!url || typeof url !== "string") {
      return NextResponse.json(
        { error: "URL video diperlukan." },
        { status: 400 }
      );
    }

    const trimmedUrl = url.trim();
    try {
      const parsed = new URL(trimmedUrl.startsWith("www.") ? "https://" + trimmedUrl : trimmedUrl);
      if (!["http:", "https:"].includes(parsed.protocol)) {
        throw new Error("Invalid protocol");
      }
    } catch {
      return NextResponse.json(
        { error: "URL tidak valid. Pastikan link yang dimasukkan benar." },
        { status: 400 }
      );
    }

    const isAudio = audioMode === true;
    const platform = detectPlatform(trimmedUrl);

    console.log(`[download] Platform: ${platform}, Audio: ${isAudio}, URL: ${trimmedUrl.substring(0, 80)}..., Backend: ${hasExternalBackend ? MOVA_API_URL : "none"}`);

    let result: DownloadResult;

    switch (platform) {
      case "youtube":
        result = await handleYouTube(trimmedUrl, isAudio);
        break;
      case "tiktok":
        result = await handleTikTok(trimmedUrl, isAudio);
        break;
      case "instagram":
        result = await handleInstagram(trimmedUrl, isAudio);
        break;
      case "twitter":
        result = await handleTwitter(trimmedUrl, isAudio);
        break;
      case "facebook":
        result = await handleFacebook(trimmedUrl, isAudio);
        break;
      case "pinterest":
        result = await handlePinterest(trimmedUrl, isAudio);
        break;
      case "reddit":
        result = await handleReddit(trimmedUrl, isAudio);
        break;
      default:
        result = await handleYtdlpProxy(trimmedUrl, isAudio, "Unknown");
        break;
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("[download] Error:", error);
    const message = error instanceof Error ? error.message : "Gagal memproses video. Coba lagi nanti.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

/* ──────── GET Handler ──────── */
export async function GET() {
  return NextResponse.json({
    message: "Mova Download API",
    version: "2.0",
    supported: ["youtube", "tiktok", "instagram", "twitter", "facebook", "pinterest", "reddit"],
    backend: hasExternalBackend ? MOVA_API_URL : "not configured",
  });
}

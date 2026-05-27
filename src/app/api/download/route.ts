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
    // youtube.com/watch?v=...
    const v = u.searchParams.get("v");
    if (v) return v;
    // youtu.be/...
    if (u.hostname.includes("youtu.be")) return u.pathname.slice(1).split("/")[0] || null;
    // youtube.com/embed/...
    if (u.pathname.startsWith("/embed/")) return u.pathname.split("/")[2] || null;
    // youtube.com/shorts/...
    if (u.pathname.startsWith("/shorts/")) return u.pathname.split("/")[2] || null;
  } catch {}
  return null;
}

/* ──────── YouTube Handler (uses yt-edge API) ──────── */
async function handleYouTube(url: string, audioMode: boolean): Promise<DownloadResult> {
  const videoId = extractYouTubeVideoId(url);
  if (!videoId) throw new Error("Link YouTube tidak valid. Pastikan link mengandung ID video.");

  // Build the internal URL for yt-edge API
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
    throw new Error(data.error || "Gagal mengambil info video YouTube. Coba lagi nanti.");
  }

  // yt-edge returns qualityOptions already in our format
  const qualityOptions: QualityOption[] = (data.qualityOptions || []).map((q: QualityOption) => ({
    label: q.label,
    resolution: q.resolution,
    url: q.url,
    originalUrl: q.originalUrl || q.url,
  }));

  // For YouTube URLs, proxy through our /api/proxy for better compatibility
  const proxiedQualityOptions = qualityOptions.map(q => {
    const isAudio = q.resolution === "MP3" || q.label.includes("Audio");
    const proxyUrl = `/api/proxy?url=${encodeURIComponent(q.url)}&quality=${encodeURIComponent(q.label)}&filename=mova_youtube_${videoId}&sourceUrl=${encodeURIComponent(url)}`;
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
    // HD version first if available
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
  // Use a public API approach for Instagram
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

  // Fallback: try using ytdlp proxy
  return await handleYtdlpProxy(url, audioMode, "Instagram");
}

/* ──────── Twitter/X Handler ──────── */
async function handleTwitter(url: string, audioMode: boolean): Promise<DownloadResult> {
  // Use fxtwitter API for Twitter/X
  try {
    // Convert URL to fxtwitter API format
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
          // Sort variants by bitrate (highest first)
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

  // Fallback to ytdlp proxy
  return await handleYtdlpProxy(url, audioMode, "Twitter/X");
}

/* ──────── Facebook Handler ──────── */
async function handleFacebook(url: string, audioMode: boolean): Promise<DownloadResult> {
  // Try ytdlp proxy first for Facebook (most reliable)
  return await handleYtdlpProxy(url, audioMode, "Facebook");
}

/* ──────── Pinterest Handler ──────── */
async function handlePinterest(url: string, audioMode: boolean): Promise<DownloadResult> {
  return await handleYtdlpProxy(url, audioMode, "Pinterest");
}

/* ──────── Reddit Handler ──────── */
async function handleReddit(url: string, audioMode: boolean): Promise<DownloadResult> {
  // Reddit can sometimes be handled directly
  try {
    // Try getting JSON from Reddit
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
        const audioUrl = post.secure_media?.reddit_video?.hls_url;

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

            // Try SD version
            const sdUrl = videoUrl.replace(/DASH_[^.]+/, "DASH_480");
            qualityOptions.push({
              label: "SD 480p",
              resolution: "480p",
              url: `/api/proxy?url=${encodeURIComponent(sdUrl)}&quality=SD+480p&filename=mova_reddit&sourceUrl=${encodeURIComponent(url)}`,
              originalUrl: sdUrl,
            });

            // Audio option
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

  // Fallback to ytdlp proxy
  return await handleYtdlpProxy(url, audioMode, "Reddit");
}

/* ──────── Ytdlp Proxy Fallback ──────── */
async function handleYtdlpProxy(url: string, audioMode: boolean, platformName: string): Promise<DownloadResult> {
  const YT_DLP_API = process.env.YTDLP_API_URL || "http://127.0.0.1:8888";
  const apiUrl = `${YT_DLP_API}/info?url=${encodeURIComponent(url)}&audio=${audioMode ? "1" : "0"}`;

  try {
    const res = await fetch(apiUrl, {
      signal: AbortSignal.timeout(35000),
      headers: { "Accept": "application/json" },
    });

    if (res.ok) {
      const data = await res.json();
      if (data.qualityOptions && data.qualityOptions.length > 0) {
        // Proxy all quality option URLs
        const qualityOptions: QualityOption[] = data.qualityOptions.map((q: QualityOption) => ({
          label: q.label,
          resolution: q.resolution,
          url: `/api/proxy?url=${encodeURIComponent(q.url)}&quality=${encodeURIComponent(q.label)}&filename=mova_${platformName.toLowerCase().replace(/[^a-z]/g, "")}&sourceUrl=${encodeURIComponent(url)}`,
          originalUrl: q.url,
        }));

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
        const downloadUrl = data.downloadUrl || data.url;
        return {
          title: data.title || `Video ${platformName}`,
          thumbnail: data.thumbnail || "",
          duration: data.duration || "--:--",
          author: data.author || "@unknown",
          platform: platformName,
          downloadUrl: `/api/proxy?url=${encodeURIComponent(downloadUrl)}&quality=video&filename=mova_${platformName.toLowerCase().replace(/[^a-z]/g, "")}&sourceUrl=${encodeURIComponent(url)}`,
          originalDownloadUrl: downloadUrl,
          qualityOptions: [{
            label: "Video",
            resolution: "Auto",
            url: `/api/proxy?url=${encodeURIComponent(downloadUrl)}&quality=video&filename=mova_${platformName.toLowerCase().replace(/[^a-z]/g, "")}&sourceUrl=${encodeURIComponent(url)}`,
            originalUrl: downloadUrl,
          }],
          filename: data.filename || `mova_${platformName.toLowerCase().replace(/[^a-z]/g, "")}_${Date.now()}`,
        };
      }
    }
  } catch (e) {
    console.error(`[download] yt-dlp proxy failed for ${platformName}:`, e instanceof Error ? e.message : "unknown");
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

    // Validate URL format
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

    console.log(`[download] Platform: ${platform}, Audio: ${isAudio}, URL: ${trimmedUrl.substring(0, 80)}...`);

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
        // Try ytdlp as a catch-all
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

/* ──────── GET Handler (for health check) ──────── */
export async function GET() {
  return NextResponse.json({
    message: "Mova Download API",
    version: "1.0",
    supported: ["youtube", "tiktok", "instagram", "twitter", "facebook", "pinterest", "reddit"],
  });
}

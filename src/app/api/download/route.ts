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

/* ──────────────── Strategy 1: TikTok via tikwm.com ─── */
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

/* ──────────────── YouTube Strategy A: InnerTube API (multiple clients) ─── */
async function youTubeInnerTube(videoId: string, audioOnly: boolean) {
  const clients: { clientName: string; clientVersion: string; extra?: Record<string, unknown>; thirdParty?: string }[] = [
    // ANDROID client - most reliable for audio
    {
      clientName: "ANDROID",
      clientVersion: "19.29.37",
      extra: { androidSdkVersion: 30, osName: "Android", osVersion: "11", hl: "en", gl: "US" },
    },
    // TVHTML5_SIMPLY_EMBEDDED_PLAYER - bypasses some restrictions
    {
      clientName: "TVHTML5_SIMPLY_EMBEDDED_PLAYER",
      clientVersion: "2.0",
      thirdParty: { embedUrl: "https://www.google.com" },
    },
    // ANDROID_VR
    {
      clientName: "ANDROID_VR",
      clientVersion: "1.60.2",
      extra: { androidSdkVersion: 34, osName: "Android", osVersion: "14", hl: "en", gl: "US" },
    },
    // IOS
    {
      clientName: "IOS",
      clientVersion: "19.45.4",
      extra: { deviceModel: "iPhone16,2", hl: "en", gl: "US" },
    },
    // WEB_EMBEDDED_PLAYER
    {
      clientName: "WEB_EMBEDDED_PLAYER",
      clientVersion: "1.20241217.01.00",
      thirdParty: { embedUrl: "https://www.google.com" },
    },
    // WEB_CREATOR - sometimes has better format access
    {
      clientName: "WEB_CREATOR",
      clientVersion: "1.20241217.01.00",
      extra: { hl: "en", gl: "US" },
    },
  ];

  const apiKeys = [
    "AIzaSyAO_FJ2SlqU8Q4STEHLGCilw_Y9_11qcW8",
    "AIzaSyDZNkyC-AtROwMBpLfevIvqYk-Gfi8ZOeo",
    "AIzaSyA8eiZmM1FaDVjRy-df2KTyQ_vz_yYM39w",
    "AIzaSyB-63vPrdThhKuerbB2N_l7Kwwcxj6yUAc",
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
            signal: AbortSignal.timeout(8000),
          }
        );

        if (!response.ok) continue;
        const data = await response.json();
        const result = parseYouTubeInnerTubeResponse(data, videoId, audioOnly);
        if (result) {
          console.log(`InnerTube success with client: ${client.clientName}`);
          return result;
        }
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

  if (playability.status !== "OK") {
    console.log(`InnerTube playability: ${playability.status}, reason: ${playability.reason || "unknown"}`);
    return null;
  }

  const title = (videoDetails.title as string) || "Video YouTube";
  const author = (videoDetails.author as string) || "@unknown";
  const lengthSeconds = parseInt((videoDetails.lengthSeconds as string) || "0") || 0;
  const duration = `${String(Math.floor(lengthSeconds / 60)).padStart(2, "0")}:${String(lengthSeconds % 60).padStart(2, "0")}`;
  const thumbnail = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

  const formats = (streamingData.formats || []) as Record<string, unknown>[];
  const adaptiveFormats = (streamingData.adaptiveFormats || []) as Record<string, unknown>[];

  const qualityOptions: { label: string; resolution: string; url: string }[] = [];

  // Get all audio formats sorted by bitrate (highest first)
  const audioFormats = adaptiveFormats
    .filter((f) => typeof f.mimeType === "string" && f.mimeType.includes("audio") && f.url)
    .sort((a, b) => ((b.bitrate as number) || 0) - ((a.bitrate as number) || 0));

  if (audioOnly) {
    // For audio mode: provide multiple audio quality options
    if (audioFormats.length > 0) {
      // Best quality audio
      const best = audioFormats[0];
      const bitrate = best.bitrate ? Math.round((best.bitrate as number) / 1000) : 128;
      qualityOptions.push({
        label: "Audio",
        resolution: "MP3",
        url: best.url as string,
      });

      // If there's a lower quality option, add it too
      if (audioFormats.length > 1) {
        const lowQuality = audioFormats[audioFormats.length - 1];
        qualityOptions.push({
          label: "Audio (Low)",
          resolution: "MP3",
          url: lowQuality.url as string,
        });
      }
    }
  } else {
    // For video mode: add video formats first, then audio
    for (const f of formats) {
      if (f.url) {
        const quality = (f.qualityLabel as string) || (f.quality as string) || "360p";
        qualityOptions.push({ label: quality, resolution: quality, url: f.url as string });
      }
    }

    // Also try adaptive video formats (higher quality, video-only)
    const videoFormats = adaptiveFormats
      .filter((f) => typeof f.mimeType === "string" && f.mimeType.includes("video") && f.url)
      .sort((a, b) => ((b.width as number) || 0) - ((a.width as number) || 0));

    // Deduplicate quality labels
    const existingLabels = new Set(qualityOptions.map(q => q.label));

    for (const f of videoFormats) {
      const quality = (f.qualityLabel as string) || (f.quality as string) || "";
      if (quality && !existingLabels.has(quality) && qualityOptions.length < 6) {
        qualityOptions.push({ label: quality, resolution: quality, url: f.url as string });
        existingLabels.add(quality);
      }
    }

    // Add audio option at the end
    if (audioFormats.length > 0) {
      qualityOptions.push({ label: "Audio", resolution: "MP3", url: audioFormats[0].url as string });
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

/* ──────────────── YouTube Strategy B: Piped API ─── */
async function youTubePiped(videoId: string, audioOnly: boolean) {
  const pipedInstances = [
    "https://api.piped.private.coffee",
    "https://pipedapi.kavin.rocks",
    "https://pipedapi.adminforge.de",
    "https://api.piped.projectsegfau.lt",
  ];

  for (const instance of pipedInstances) {
    try {
      const res = await fetch(`${instance}/streams/${videoId}`, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
          "Accept": "application/json",
        },
        signal: AbortSignal.timeout(8000),
      });

      if (!res.ok) continue;
      const data = await res.json();

      if (data.error || !data.audioStreams) continue;

      const title = data.title || "Video YouTube";
      const author = data.uploader || "@unknown";
      const durationNum = data.duration || 0;
      const duration = `${String(Math.floor(durationNum / 60)).padStart(2, "0")}:${String(durationNum % 60).padStart(2, "0")}`;
      const thumbnail = data.thumbnailUrl || `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

      const qualityOptions: { label: string; resolution: string; url: string }[] = [];

      // Sort audio streams by bitrate (highest first)
      const audioStreams = (data.audioStreams as Array<Record<string, unknown>>)
        .filter((s) => s.url)
        .sort((a, b) => ((b.bitrate as number) || 0) - ((a.bitrate as number) || 0));

      if (audioOnly) {
        if (audioStreams.length > 0) {
          const best = audioStreams[0];
          let audioUrl = best.url as string;

          // Convert proxied URL to direct URL if possible
          audioUrl = convertPipedUrl(audioUrl);

          qualityOptions.push({
            label: "Audio",
            resolution: "MP3",
            url: audioUrl,
          });

          if (audioStreams.length > 1) {
            const low = audioStreams[audioStreams.length - 1];
            qualityOptions.push({
              label: "Audio (Low)",
              resolution: "MP3",
              url: convertPipedUrl(low.url as string),
            });
          }
        }
      } else {
        // Add video streams
        const videoStreams = (data.videoStreams as Array<Record<string, unknown>>)
          .filter((s) => s.url)
          .sort((a, b) => ((b.width as number) || 0) - ((a.width as number) || 0));

        const seen = new Set<string>();
        for (const v of videoStreams) {
          const q = (v.quality as string) || "";
          if (q && !seen.has(q) && qualityOptions.length < 6) {
            qualityOptions.push({
              label: q,
              resolution: q,
              url: convertPipedUrl(v.url as string),
            });
            seen.add(q);
          }
        }

        // Add audio option
        if (audioStreams.length > 0) {
          qualityOptions.push({
            label: "Audio",
            resolution: "MP3",
            url: convertPipedUrl(audioStreams[0].url as string),
          });
        }
      }

      if (qualityOptions.length === 0) continue;

      console.log(`Piped API success with instance: ${instance}`);
      return {
        title, thumbnail, duration, author,
        platform: "YouTube",
        downloadUrl: qualityOptions[0].url,
        qualityOptions,
        filename: `mova_youtube_${videoId}`,
      };
    } catch { continue; }
  }

  return null;
}

/**
 * Convert Piped proxy URL to direct Google Video URL
 * Piped proxies through their server, but we want direct URLs when possible
 */
function convertPipedUrl(url: string): string {
  try {
    const parsed = new URL(url);
    // If it's a Piped proxy URL, try to extract the direct URL
    if (parsed.pathname.startsWith("/videoplayback")) {
      // Check if there's a direct host parameter
      const host = parsed.searchParams.get("host");
      if (host) {
        // Reconstruct direct URL
        parsed.hostname = host;
        parsed.pathname = "/videoplayback" + parsed.pathname.replace("/videoplayback", "");
        return parsed.toString();
      }
    }
  } catch {}
  return url;
}

/* ──────────────── YouTube Strategy C: Page Scraping ─── */
async function youTubePageScrape(videoId: string, audioOnly: boolean) {
  try {
    const res = await fetch(`https://www.youtube.com/watch?v=${videoId}`, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
        "Accept-Language": "en-US,en;q=0.9",
        "Accept": "text/html,application/xhtml+xml",
      },
      signal: AbortSignal.timeout(10000),
    });

    if (!res.ok) return null;

    const html = await res.text();

    // Try to extract ytInitialPlayerResponse
    const match = html.match(/ytInitialPlayerResponse\s*=\s*(\{.+?\});/s);
    if (!match) return null;

    const data = JSON.parse(match[1]);
    return parseYouTubeInnerTubeResponse(data, videoId, audioOnly);
  } catch (error) {
    console.log(`Page scraping failed: ${error instanceof Error ? error.message : "unknown"}`);
    return null;
  }
}

/* ──────────────── YouTube Strategy D: Edge Runtime Proxy ─── */
async function youTubeEdgeProxy(videoId: string, audioOnly: boolean) {
  try {
    // Call our own Edge Runtime route which runs on Cloudflare's edge network
    // Edge Runtime has different IPs with better reputation for YouTube API
    const baseUrl = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : process.env.NEXT_PUBLIC_SITE_URL || "https://getmova.vercel.app";

    const res = await fetch(`${baseUrl}/api/yt-edge`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ videoId, audioOnly }),
      signal: AbortSignal.timeout(30000),
    });

    if (!res.ok) return null;

    const data = await res.json();
    if (!data.success) return null;

    console.log(`Edge proxy success for video: ${videoId}`);
    return data as {
      title: string; thumbnail: string; duration: string; author: string;
      platform: string; downloadUrl: string;
      qualityOptions: { label: string; resolution: string; url: string }[];
      filename: string;
    };
  } catch (error) {
    console.log(`Edge proxy failed: ${error instanceof Error ? error.message : "unknown"}`);
    return null;
  }
}

/* ──────────────── YouTube Combined (tries all strategies) ─── */
async function downloadYouTube(url: string, audioOnly: boolean) {
  const videoId = extractYouTubeVideoId(url);
  if (!videoId) return null;

  // Strategy A: InnerTube API (fast, no external dependency)
  console.log(`YouTube: Trying InnerTube API (audioOnly=${audioOnly})...`);
  const innerTubeResult = await youTubeInnerTube(videoId, audioOnly);
  if (innerTubeResult) return innerTubeResult;

  // Strategy B: Edge Runtime Proxy (runs on Cloudflare's edge with better IPs)
  console.log(`YouTube: InnerTube failed, trying Edge Runtime proxy...`);
  const edgeResult = await youTubeEdgeProxy(videoId, audioOnly);
  if (edgeResult) return edgeResult;

  // Strategy C: Piped API (external, may work when InnerTube doesn't)
  console.log(`YouTube: Edge proxy failed, trying Piped API...`);
  const pipedResult = await youTubePiped(videoId, audioOnly);
  if (pipedResult) return pipedResult;

  // Strategy D: Page scraping (last resort)
  console.log(`YouTube: Piped failed, trying page scraping...`);
  const scrapeResult = await youTubePageScrape(videoId, audioOnly);
  if (scrapeResult) return scrapeResult;

  return null;
}

/* ──────────────── Strategy: Reddit Downloader ─── */
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

/* ──────────────── Strategy: Twitter/X Downloader ─── */
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

/* ──────────────── Strategy: Pinterest Downloader ─── */
async function downloadPinterest(url: string) {
  // Try fetching the page and extracting video URL from meta tags
  const res = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
      "Accept": "text/html",
    },
    signal: AbortSignal.timeout(8000),
    redirect: "follow",
  });

  if (!res.ok) throw new Error("Pinterest gagal diakses");

  const html = await res.text();

  // Try to find video URL from og:video meta tag
  const ogVideoMatch = html.match(/content="([^"]+)"\s+property="og:video(:secure_url)?"/);
  const videoUrl = ogVideoMatch?.[1];

  // Also try to find from Pinterest's JSON data
  let pinterestVideoUrl = videoUrl;
  if (!pinterestVideoUrl) {
    const jsonMatch = html.match(/"video_url":"([^"]+)"/);
    if (jsonMatch) {
      pinterestVideoUrl = jsonMatch[1].replace(/\\u002F/g, "/");
    }
  }

  if (!pinterestVideoUrl) throw new Error("Video Pinterest tidak ditemukan");

  const qualityOptions: { label: string; resolution: string; url: string }[] = [];
  qualityOptions.push({ label: "Best", resolution: "Auto", url: pinterestVideoUrl });

  // Try to get title
  const titleMatch = html.match(/content="([^"]+)"\s+property="og:title"/);
  const title = titleMatch?.[1] || "Pinterest Video";

  return {
    title,
    thumbnail: "",
    duration: "--:--",
    author: "@unknown",
    platform: "Pinterest",
    downloadUrl: pinterestVideoUrl,
    qualityOptions,
    filename: `mova_pinterest_${Date.now()}`,
  };
}

/* ──────────────── Strategy: Facebook Downloader ─── */
async function downloadFacebook(url: string) {
  // Try using fxtwitter-style approach for Facebook
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
        "Accept": "text/html",
      },
      signal: AbortSignal.timeout(10000),
      redirect: "follow",
    });

    if (!res.ok) throw new Error("Facebook gagal diakses");

    const html = await res.text();

    // Try to find video URL from meta tags or page source
    const ogVideoMatch = html.match(/content="([^"]+)"\s+property="og:video(:secure_url)?"/);
    let videoUrl = ogVideoMatch?.[1];

    // Also try to find from Facebook's data
    if (!videoUrl) {
      const sdMatch = html.match(/"sd_src_no_ratelimit":"([^"]+)"/);
      const hdMatch = html.match(/"hd_src_no_ratelimit":"([^"]+)"/);
      videoUrl = hdMatch?.[1]?.replace(/\\u002F/g, "/") || sdMatch?.[1]?.replace(/\\u002F/g, "/");

      if (videoUrl) {
        const qualityOptions: { label: string; resolution: string; url: string }[] = [];
        if (hdMatch?.[1]) {
          qualityOptions.push({ label: "HD", resolution: "720p", url: hdMatch[1].replace(/\\u002F/g, "/") });
        }
        if (sdMatch?.[1]) {
          qualityOptions.push({ label: "SD", resolution: "360p", url: sdMatch[1].replace(/\\u002F/g, "/") });
        }

        if (qualityOptions.length > 0) {
          return {
            title: "Facebook Video",
            thumbnail: "",
            duration: "--:--",
            author: "@unknown",
            platform: "Facebook",
            downloadUrl: qualityOptions[0].url,
            qualityOptions,
            filename: `mova_facebook_${Date.now()}`,
          };
        }
      }
    }

    if (!videoUrl) throw new Error("Video Facebook tidak ditemukan");

    const qualityOptions: { label: string; resolution: string; url: string }[] = [];
    qualityOptions.push({ label: "Best", resolution: "Auto", url: videoUrl });

    return {
      title: "Facebook Video",
      thumbnail: "",
      duration: "--:--",
      author: "@unknown",
      platform: "Facebook",
      downloadUrl: videoUrl,
      qualityOptions,
      filename: `mova_facebook_${Date.now()}`,
    };
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Video Facebook tidak ditemukan");
  }
}

/* ──────────────── Strategy: Instagram Downloader ─── */
async function downloadInstagram(url: string) {
  // Try fetching the Instagram page and extracting media
  const res = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
      "Accept": "text/html,application/xhtml+xml",
      "Accept-Language": "en-US,en;q=0.9",
    },
    signal: AbortSignal.timeout(10000),
    redirect: "follow",
  });

  if (!res.ok) throw new Error("Instagram gagal diakses");

  const html = await res.text();

  // Try to find video URL from Instagram's embedded data
  let videoUrl: string | null = null;
  let thumbnail: string | null = null;
  let title: string = "Instagram Video";

  // Method 1: og:video meta tag
  const ogVideoMatch = html.match(/content="([^"]+)"\s+property="og:video(:secure_url)?"/);
  if (ogVideoMatch) videoUrl = ogVideoMatch[1];

  // Method 2: Extract from Instagram's JSON data
  if (!videoUrl) {
    const jsonMatch = html.match(/"video_url":"([^"]+)"/);
    if (jsonMatch) videoUrl = jsonMatch[1].replace(/\\u002F/g, "/");
  }

  // Get thumbnail
  const ogImageMatch = html.match(/content="([^"]+)"\s+property="og:image"/);
  if (ogImageMatch) thumbnail = ogImageMatch[1];

  // Get title
  const ogTitleMatch = html.match(/content="([^"]+)"\s+property="og:title"/);
  if (ogTitleMatch) title = ogTitleMatch[1];

  if (!videoUrl) throw new Error("Video Instagram tidak ditemukan. Pastikan link adalah video publik.");

  const qualityOptions: { label: string; resolution: string; url: string }[] = [];
  qualityOptions.push({ label: "Best", resolution: "Auto", url: videoUrl });

  return {
    title,
    thumbnail: thumbnail || "",
    duration: "--:--",
    author: "@unknown",
    platform: "Instagram",
    downloadUrl: videoUrl,
    qualityOptions,
    filename: `mova_instagram_${Date.now()}`,
  };
}

/* ──────────────── Validate Audio URL ─── */
async function validateAudioUrl(url: string): Promise<boolean> {
  try {
    const res = await fetch(url, {
      method: "HEAD",
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        "Referer": "https://www.youtube.com/",
      },
      signal: AbortSignal.timeout(5000),
      redirect: "follow",
    });

    if (!res.ok) return false;

    const contentType = res.headers.get("content-type") || "";
    const contentLength = parseInt(res.headers.get("content-length") || "0");

    // Must be audio or video content type, and must be > 10KB (real audio)
    const isAudioContent = contentType.includes("audio") || contentType.includes("video") || contentType.includes("octet-stream");
    const isReasonableSize = contentLength === 0 || contentLength > 10000;

    return isAudioContent && isReasonableSize;
  } catch {
    // Can't validate, assume it's OK
    return true;
  }
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
      parsedUrl = new URL(trimmedUrl.startsWith("www.") ? "https://" + trimmedUrl : trimmedUrl);
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
          result = await downloadTikTok(trimmedUrl);
          break;
        }

        case "YouTube": {
          result = await downloadYouTube(trimmedUrl, audioMode === true);
          break;
        }

        case "Reddit": {
          try { result = await downloadReddit(trimmedUrl); } catch {
            result = null;
          }
          break;
        }

        case "Twitter/X": {
          try { result = await downloadTwitter(trimmedUrl); } catch {
            result = null;
          }
          break;
        }

        case "Pinterest": {
          try { result = await downloadPinterest(trimmedUrl); } catch {
            result = null;
          }
          break;
        }

        case "Facebook": {
          try { result = await downloadFacebook(trimmedUrl); } catch {
            result = null;
          }
          break;
        }

        case "Instagram": {
          try { result = await downloadInstagram(trimmedUrl); } catch {
            result = null;
          }
          break;
        }

        default: {
          return NextResponse.json({
            error: "Platform tidak didukung. Mova mendukung TikTok, YouTube, Instagram, Facebook, Twitter/X, Pinterest, dan Reddit."
          }, { status: 400 });
        }
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Gagal memproses video.";
      return NextResponse.json({ error: errorMessage }, { status: 422 });
    }

    if (!result) {
      if (platform === "YouTube") {
        return NextResponse.json({
          error: audioMode
            ? "YouTube membatasi download audio dari server. Coba video lain atau gunakan video yang lebih umum."
            : "YouTube membatasi download video dari server. Coba video lain atau gunakan video yang lebih umum.",
          suggestion: "Coba link YouTube yang berbeda. Video dengan viewers lebih rendah biasanya bisa di-download.",
        }, { status: 500 });
      }
      return NextResponse.json({
        error: audioMode
          ? "Gagal mengekstrak audio. Video mungkin dibatasi atau privat. Coba video lain."
          : "Gagal mengunduh video. Video mungkin dibatasi atau privat. Coba video lain."
      }, { status: 500 });
    }

    // Validate audio URLs if in audio mode
    if (audioMode && result.qualityOptions.length > 0) {
      const audioOption = result.qualityOptions.find(q => q.resolution === "MP3" || q.label === "Audio");
      if (audioOption) {
        const isValid = await validateAudioUrl(audioOption.url);
        if (!isValid) {
          console.log("Audio URL validation failed, result may be unreliable");
        }
      }
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

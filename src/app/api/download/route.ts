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

/* ──────────────── URL Resolution (follow redirects) ─── */
async function resolveShortUrl(url: string): Promise<string> {
  try {
    const res = await fetch(url, {
      method: "HEAD",
      redirect: "follow",
      headers: {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
      },
      signal: AbortSignal.timeout(5000),
    });
    const resolved = res.url || url;
    if (resolved && resolved.startsWith("http")) return resolved;
  } catch {}
  return url;
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

/* ──────────────── Extract Twitter/X tweet ID and username from URL ─── */
function extractTwitterInfo(url: string): { username: string; tweetId: string } | null {
  try {
    const parsed = new URL(url);
    const pathParts = parsed.pathname.split("/").filter(Boolean);
    // URL format: /username/status/tweetId or /username/status/tweetId/video/1
    const statusIdx = pathParts.findIndex(p => p === "status");
    if (statusIdx >= 1 && statusIdx + 1 < pathParts.length) {
      return {
        username: pathParts[statusIdx - 1],
        tweetId: pathParts[statusIdx + 1],
      };
    }
  } catch {}
  return null;
}

/* ──────────────── TikTok via tikwm.com ─── */
async function downloadTikTok(url: string) {
  // First, resolve short URLs (vm.tiktok.com / vt.tiktok.com)
  let resolvedUrl = url;
  const hostname = (() => {
    try { return new URL(url).hostname.toLowerCase(); } catch { return ""; }
  })();

  if (hostname.includes("vm.tiktok") || hostname.includes("vt.tiktok") || hostname.includes("tiktok.com/t/")) {
    console.log(`TikTok: Resolving short URL: ${url}`);
    resolvedUrl = await resolveShortUrl(url);
    console.log(`TikTok: Resolved to: ${resolvedUrl}`);
  }

  // Strategy 1: tikwm API with POST (body in form data)
  try {
    const res = await fetch("https://www.tikwm.com/api/", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
      body: `url=${encodeURIComponent(resolvedUrl)}&hd=1`,
      signal: AbortSignal.timeout(15000),
    });
    if (!res.ok) throw new Error(`tikwm returned ${res.status}`);
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
  } catch (e) {
    console.log(`TikTok tikwm POST failed: ${e instanceof Error ? e.message : "unknown"}`);
  }

  // Strategy 2: tikwm API with GET
  try {
    const apiUrl = `https://www.tikwm.com/api/?url=${encodeURIComponent(resolvedUrl)}&hd=1`;
    const res = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        "Accept": "application/json",
      },
      signal: AbortSignal.timeout(15000),
    });
    if (!res.ok) throw new Error(`tikwm GET returned ${res.status}`);
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
  } catch (e) {
    console.log(`TikTok tikwm GET failed: ${e instanceof Error ? e.message : "unknown"}`);
  }

  return null;
}

/* ──────────────── YouTube Strategy A: InnerTube API ─── */
async function youTubeInnerTube(videoId: string, audioOnly: boolean) {
  const clients: { clientName: string; clientVersion: string; extra?: Record<string, unknown>; thirdParty?: string }[] = [
    { clientName: "ANDROID", clientVersion: "19.29.37", extra: { androidSdkVersion: 30, osName: "Android", osVersion: "11", hl: "en", gl: "US" } },
    { clientName: "TVHTML5_SIMPLY_EMBEDDED_PLAYER", clientVersion: "2.0", thirdParty: "https://www.google.com" },
    { clientName: "ANDROID_VR", clientVersion: "1.60.2", extra: { androidSdkVersion: 34, osName: "Android", osVersion: "14", hl: "en", gl: "US" } },
    { clientName: "IOS", clientVersion: "19.45.4", extra: { deviceModel: "iPhone16,2", hl: "en", gl: "US" } },
    { clientName: "WEB_EMBEDDED_PLAYER", clientVersion: "1.20241217.01.00", thirdParty: "https://www.google.com" },
    { clientName: "WEB_CREATOR", clientVersion: "1.20241217.01.00", extra: { hl: "en", gl: "US" } },
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
          client: { clientName: client.clientName, clientVersion: client.clientVersion, hl: "en", gl: "US", ...client.extra },
        };
        if (client.thirdParty) context.thirdParty = { embedUrl: client.thirdParty };

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

function parseYouTubeInnerTubeResponse(data: Record<string, unknown>, videoId: string, audioOnly: boolean) {
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
  const audioFormats = adaptiveFormats
    .filter((f) => typeof f.mimeType === "string" && f.mimeType.includes("audio") && f.url)
    .sort((a, b) => ((b.bitrate as number) || 0) - ((a.bitrate as number) || 0));

  if (audioOnly) {
    if (audioFormats.length > 0) {
      qualityOptions.push({ label: "Audio", resolution: "MP3", url: audioFormats[0].url as string });
      if (audioFormats.length > 1) {
        qualityOptions.push({ label: "Audio (Low)", resolution: "MP3", url: audioFormats[audioFormats.length - 1].url as string });
      }
    }
  } else {
    for (const f of formats) {
      if (f.url) {
        const quality = (f.qualityLabel as string) || (f.quality as string) || "360p";
        qualityOptions.push({ label: quality, resolution: quality, url: f.url as string });
      }
    }
    const videoFormats = adaptiveFormats
      .filter((f) => typeof f.mimeType === "string" && f.mimeType.includes("video") && f.url)
      .sort((a, b) => ((b.width as number) || 0) - ((a.width as number) || 0));
    const existingLabels = new Set(qualityOptions.map(q => q.label));
    for (const f of videoFormats) {
      const quality = (f.qualityLabel as string) || (f.quality as string) || "";
      if (quality && !existingLabels.has(quality) && qualityOptions.length < 6) {
        qualityOptions.push({ label: quality, resolution: quality, url: f.url as string });
        existingLabels.add(quality);
      }
    }
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
        headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36", "Accept": "application/json" },
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
      const audioStreams = (data.audioStreams as Array<Record<string, unknown>>)
        .filter((s) => s.url)
        .sort((a, b) => ((b.bitrate as number) || 0) - ((a.bitrate as number) || 0));

      if (audioOnly) {
        if (audioStreams.length > 0) {
          qualityOptions.push({ label: "Audio", resolution: "MP3", url: convertPipedUrl(audioStreams[0].url as string) });
          if (audioStreams.length > 1) {
            qualityOptions.push({ label: "Audio (Low)", resolution: "MP3", url: convertPipedUrl(audioStreams[audioStreams.length - 1].url as string) });
          }
        }
      } else {
        const videoStreams = (data.videoStreams as Array<Record<string, unknown>>)
          .filter((s) => s.url)
          .sort((a, b) => ((b.width as number) || 0) - ((a.width as number) || 0));
        const seen = new Set<string>();
        for (const v of videoStreams) {
          const q = (v.quality as string) || "";
          if (q && !seen.has(q) && qualityOptions.length < 6) {
            qualityOptions.push({ label: q, resolution: q, url: convertPipedUrl(v.url as string) });
            seen.add(q);
          }
        }
        if (audioStreams.length > 0) {
          qualityOptions.push({ label: "Audio", resolution: "MP3", url: convertPipedUrl(audioStreams[0].url as string) });
        }
      }

      if (qualityOptions.length === 0) continue;

      console.log(`Piped API success with instance: ${instance}`);
      return { title, thumbnail, duration, author, platform: "YouTube", downloadUrl: qualityOptions[0].url, qualityOptions, filename: `mova_youtube_${videoId}` };
    } catch { continue; }
  }
  return null;
}

function convertPipedUrl(url: string): string {
  try {
    const parsed = new URL(url);
    if (parsed.pathname.startsWith("/videoplayback")) {
      const host = parsed.searchParams.get("host");
      if (host) {
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

/* ──────────────── YouTube Combined ─── */
async function downloadYouTube(url: string, audioOnly: boolean) {
  const videoId = extractYouTubeVideoId(url);
  if (!videoId) return null;

  console.log(`YouTube: Trying InnerTube API (audioOnly=${audioOnly})...`);
  const innerTubeResult = await youTubeInnerTube(videoId, audioOnly);
  if (innerTubeResult) return innerTubeResult;

  console.log(`YouTube: InnerTube failed, trying Edge Runtime proxy...`);
  const edgeResult = await youTubeEdgeProxy(videoId, audioOnly);
  if (edgeResult) return edgeResult;

  console.log(`YouTube: Edge proxy failed, trying Piped API...`);
  const pipedResult = await youTubePiped(videoId, audioOnly);
  if (pipedResult) return pipedResult;

  console.log(`YouTube: Piped failed, trying page scraping...`);
  const scrapeResult = await youTubePageScrape(videoId, audioOnly);
  if (scrapeResult) return scrapeResult;

  return null;
}

/* ──────────────── Instagram Downloader ─── */
async function downloadInstagram(url: string) {
  // Extract shortcode from Instagram URL
  let shortcode = "";
  let contentType: "p" | "reel" | "tv" = "p";
  try {
    const parsed = new URL(url);
    const pathParts = parsed.pathname.split("/").filter(Boolean);
    const contentIdx = pathParts.findIndex(p => ["p", "reel", "reels", "tv"].includes(p));
    if (contentIdx >= 0 && pathParts[contentIdx + 1]) {
      contentType = pathParts[contentIdx] as "p" | "reel" | "tv";
      shortcode = pathParts[contentIdx + 1];
    }
  } catch {}

  // Strategy 1: Try Instagram page scraping with Googlebot UA (gets server-rendered content)
  console.log("Instagram: Trying page scrape with bot UA...");
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
        "Accept": "text/html",
        "Accept-Language": "en-US,en;q=0.9",
      },
      signal: AbortSignal.timeout(10000),
      redirect: "follow",
    });

    if (res.ok) {
      const html = await res.text();
      const result = extractInstagramVideo(html, shortcode);
      if (result) return result;
    }
  } catch (e) {
    console.log(`Instagram bot scrape failed: ${e instanceof Error ? e.message : "unknown"}`);
  }

  // Strategy 2: Try with mobile user agent
  console.log("Instagram: Trying mobile UA scrape...");
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
        "Accept": "text/html,application/xhtml+xml",
        "Accept-Language": "en-US,en;q=0.9",
      },
      signal: AbortSignal.timeout(10000),
      redirect: "follow",
    });

    if (res.ok) {
      const html = await res.text();
      const result = extractInstagramVideo(html, shortcode);
      if (result) return result;
    }
  } catch (e) {
    console.log(`Instagram mobile scrape failed: ${e instanceof Error ? e.message : "unknown"}`);
  }

  // Strategy 3: Try Instagram embed endpoint
  if (shortcode) {
    console.log(`Instagram: Trying embed endpoint for shortcode: ${shortcode}`);
    try {
      // For reels, embed uses /p/ path
      const embedPath = contentType === "reel" || contentType === "reels" ? `/p/${shortcode}/embed/` : `/${contentType}/${shortcode}/embed/`;
      const embedUrl = `https://www.instagram.com${embedPath}`;

      const res = await fetch(embedUrl, {
        headers: {
          "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
          "Accept": "text/html",
        },
        signal: AbortSignal.timeout(10000),
        redirect: "follow",
      });

      if (res.ok) {
        const html = await res.text();
        const result = extractInstagramVideo(html, shortcode);
        if (result) return result;
      }
    } catch (e) {
      console.log(`Instagram embed failed: ${e instanceof Error ? e.message : "unknown"}`);
    }
  }

  // Strategy 4: Try desktop user agent
  console.log("Instagram: Trying desktop UA scrape...");
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml",
        "Accept-Language": "en-US,en;q=0.9",
        "Sec-Fetch-Dest": "document",
        "Sec-Fetch-Mode": "navigate",
      },
      signal: AbortSignal.timeout(10000),
      redirect: "follow",
    });

    if (res.ok) {
      const html = await res.text();
      const result = extractInstagramVideo(html, shortcode);
      if (result) return result;
    }
  } catch (e) {
    console.log(`Instagram desktop scrape failed: ${e instanceof Error ? e.message : "unknown"}`);
  }

  return null;
}

function extractInstagramVideo(html: string, shortcode: string) {
  let videoUrl: string | null = null;
  let thumbnail: string | null = null;
  let title: string = "Instagram Video";
  let author: string = "@unknown";

  // Try multiple patterns to find video URL
  const videoPatterns = [
    /"video_url":"([^"]+)"/,
    /content="([^"]+)"\s+property="og:video(:secure_url)?"/,
    /"playable_url":"([^"]+)"/,
    /video_url&quot;:&quot;([^&]+)&quot;/,
    /"dash_playable_url":"([^"]+)"/,
    /src="([^"]+)"\s+type="video\/mp4"/,
  ];

  for (const pattern of videoPatterns) {
    const match = html.match(pattern);
    if (match?.[1]) {
      videoUrl = match[1].replace(/\\u002F/g, "/").replace(/&amp;/g, "&");
      break;
    }
  }

  // Get thumbnail
  const thumbMatch = html.match(/content="([^"]+)"\s+property="og:image"/);
  if (thumbMatch) thumbnail = thumbMatch[1].replace(/&amp;/g, "&");

  // Get title
  const titleMatch = html.match(/content="([^"]+)"\s+property="og:title"/);
  if (titleMatch) title = titleMatch[1];

  // Get author
  const authorMatch = html.match(/content="([^"]+)"\s+name="twitter:creator"/) ||
                      html.match(/"username":"([^"]+)"/);
  if (authorMatch) author = authorMatch[1];

  if (!videoUrl) return null;

  const qualityOptions: { label: string; resolution: string; url: string }[] = [];
  qualityOptions.push({ label: "Best", resolution: "Auto", url: videoUrl });

  return {
    title,
    thumbnail: thumbnail || "",
    duration: "--:--",
    author,
    platform: "Instagram",
    downloadUrl: videoUrl,
    qualityOptions,
    filename: `mova_instagram_${shortcode || Date.now()}`,
  };
}

/* ──────────────── Reddit Downloader ─── */
async function downloadReddit(url: string) {
  try {
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
  } catch (e) {
    console.log(`Reddit JSON API failed: ${e instanceof Error ? e.message : "unknown"}`);
  }

  return null;
}

/* ──────────────── Twitter/X Downloader ─── */
async function downloadTwitter(url: string) {
  const info = extractTwitterInfo(url);
  const tweetId = info?.tweetId || "";
  const username = info?.username || "";

  // Strategy 1: fxtwitter API (JSON endpoint)
  if (username && tweetId) {
    console.log(`Twitter: Trying fxtwitter API for @${username}/${tweetId}`);
    try {
      const res = await fetch(`https://api.fxtwitter.com/${username}/status/${tweetId}`, {
        headers: {
          "User-Agent": "Mozilla/5.0 (compatible; MovaBot/1.0)",
          "Accept": "application/json",
        },
        signal: AbortSignal.timeout(10000),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.code === 200 && data.tweet) {
          const tweet = data.tweet;
          const media = tweet.media || {};
          const videos = media.videos || [];
          const allMedia = media.all || [];

          // Get the best video URL
          let videoUrl: string | null = null;
          let videoFormat: string = "mp4";

          if (videos.length > 0) {
            // Get highest quality video
            const bestVideo = videos[0];
            videoUrl = bestVideo.url || null;
            videoFormat = bestVideo.format || "mp4";

            // Some fxtwitter responses have variants with different qualities
            if (bestVideo.variants && Array.isArray(bestVideo.variants)) {
              // Sort by bitrate (highest first) and pick MP4
              const mp4Variants = bestVideo.variants
                .filter((v: { content_type?: string; bitrate?: number }) => v.content_type === "video/mp4" && v.url)
                .sort((a: { bitrate?: number }, b: { bitrate?: number }) => (b.bitrate || 0) - (a.bitrate || 0));

              if (mp4Variants.length > 0) {
                videoUrl = mp4Variants[0].url;
              }
            }
          }

          if (videoUrl) {
            const qualityOptions: { label: string; resolution: string; url: string }[] = [];
            qualityOptions.push({ label: "Best", resolution: "Auto", url: videoUrl });

            // If there are multiple videos (e.g., GIF alternatives)
            if (videos.length > 1) {
              for (let i = 1; i < Math.min(videos.length, 4); i++) {
                if (videos[i]?.url) {
                  qualityOptions.push({ label: `Video ${i + 1}`, resolution: "Auto", url: videos[i].url });
                }
              }
            }

            return {
              title: tweet.text || "Twitter/X Video",
              thumbnail: allMedia.find((m: { type: string }) => m.type === "photo")?.url || "",
              duration: "--:--",
              author: tweet.author?.screen_name || username || "@unknown",
              platform: "Twitter/X",
              downloadUrl: videoUrl,
              qualityOptions,
              filename: `mova_twitter_${tweetId}`,
            };
          }
        }
      }
    } catch (e) {
      console.log(`fxtwitter API failed: ${e instanceof Error ? e.message : "unknown"}`);
    }
  }

  // Strategy 2: fxtwitter HTML with bot User-Agent (gets server-rendered og:video tags)
  try {
    const fxTwitterUrl = url.replace("twitter.com", "fxtwitter.com").replace("x.com", "fxtwitter.com");
    console.log(`Twitter: Trying fxtwitter HTML: ${fxTwitterUrl}`);

    const res = await fetch(fxTwitterUrl, {
      headers: {
        // Bot user agents get server-rendered pages with og:video meta tags
        "User-Agent": "Mozilla/5.0 (compatible; Discordbot/2.0; +https://discordapp.com)",
        "Accept": "text/html",
      },
      signal: AbortSignal.timeout(10000),
    });

    if (res.ok) {
      const html = await res.text();

      // Try multiple patterns for og:video
      const videoPatterns = [
        /content="([^"]+)"\s+property="og:video:secure_url"/,
        /content="([^"]+)"\s+property="og:video"/,
        /property="og:video:secure_url"\s+content="([^"]+)"/,
        /property="og:video"\s+content="([^"]+)"/,
      ];

      let videoUrl: string | null = null;
      for (const pattern of videoPatterns) {
        const match = html.match(pattern);
        if (match?.[1]) {
          videoUrl = match[1];
          break;
        }
      }

      if (videoUrl) {
        // Get title and author
        const titleMatch = html.match(/content="([^"]+)"\s+property="og:description"/) ||
                          html.match(/content="([^"]+)"\s+property="og:title"/);
        const thumbMatch = html.match(/content="([^"]+)"\s+property="og:image"/);

        const qualityOptions: { label: string; resolution: string; url: string }[] = [];
        qualityOptions.push({ label: "Best", resolution: "Auto", url: videoUrl });

        return {
          title: titleMatch?.[1] || "Twitter/X Video",
          thumbnail: thumbMatch?.[1] || "",
          duration: "--:--",
          author: username ? `@${username}` : "@unknown",
          platform: "Twitter/X",
          downloadUrl: videoUrl,
          qualityOptions,
          filename: `mova_twitter_${tweetId || Date.now()}`,
        };
      }
    }
  } catch (e) {
    console.log(`fxtwitter HTML failed: ${e instanceof Error ? e.message : "unknown"}`);
  }

  // Strategy 3: vxtwitter HTML with bot User-Agent
  try {
    const vxUrl = url.replace("twitter.com", "vxtwitter.com").replace("x.com", "vxtwitter.com");
    console.log(`Twitter: Trying vxtwitter HTML: ${vxUrl}`);

    const res = await fetch(vxUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; Discordbot/2.0; +https://discordapp.com)",
        "Accept": "text/html",
      },
      signal: AbortSignal.timeout(10000),
    });

    if (res.ok) {
      const html = await res.text();
      const videoPatterns = [
        /content="([^"]+)"\s+property="og:video:secure_url"/,
        /content="([^"]+)"\s+property="og:video"/,
        /property="og:video:secure_url"\s+content="([^"]+)"/,
        /property="og:video"\s+content="([^"]+)"/,
      ];

      let videoUrl: string | null = null;
      for (const pattern of videoPatterns) {
        const match = html.match(pattern);
        if (match?.[1]) {
          videoUrl = match[1];
          break;
        }
      }

      if (videoUrl) {
        const qualityOptions: { label: string; resolution: string; url: string }[] = [];
        qualityOptions.push({ label: "Best", resolution: "Auto", url: videoUrl });

        return {
          title: "Twitter/X Video",
          thumbnail: "",
          duration: "--:--",
          author: username ? `@${username}` : "@unknown",
          platform: "Twitter/X",
          downloadUrl: videoUrl,
          qualityOptions,
          filename: `mova_twitter_${tweetId || Date.now()}`,
        };
      }
    }
  } catch (e) {
    console.log(`vxtwitter failed: ${e instanceof Error ? e.message : "unknown"}`);
  }

  // Strategy 4: Try with TelegramBot user agent (gets different response from fxtwitter)
  try {
    const fxTwitterUrl = url.replace("twitter.com", "fxtwitter.com").replace("x.com", "fxtwitter.com");
    const res = await fetch(fxTwitterUrl, {
      headers: {
        "User-Agent": "TelegramBot (like TwitterBot)",
        "Accept": "text/html",
      },
      signal: AbortSignal.timeout(10000),
    });

    if (res.ok) {
      const html = await res.text();
      const videoPatterns = [
        /content="([^"]+)"\s+property="og:video:secure_url"/,
        /content="([^"]+)"\s+property="og:video"/,
        /property="og:video:secure_url"\s+content="([^"]+)"/,
        /property="og:video"\s+content="([^"]+)"/,
      ];

      let videoUrl: string | null = null;
      for (const pattern of videoPatterns) {
        const match = html.match(pattern);
        if (match?.[1]) {
          videoUrl = match[1];
          break;
        }
      }

      if (videoUrl) {
        const qualityOptions: { label: string; resolution: string; url: string }[] = [];
        qualityOptions.push({ label: "Best", resolution: "Auto", url: videoUrl });

        return {
          title: "Twitter/X Video",
          thumbnail: "",
          duration: "--:--",
          author: username ? `@${username}` : "@unknown",
          platform: "Twitter/X",
          downloadUrl: videoUrl,
          qualityOptions,
          filename: `mova_twitter_${tweetId || Date.now()}`,
        };
      }
    }
  } catch (e) {
    console.log(`fxtwitter TelegramBot UA failed: ${e instanceof Error ? e.message : "unknown"}`);
  }

  return null;
}

/* ──────────────── Pinterest Downloader ─── */
async function downloadPinterest(url: string) {
  try {
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

    let videoUrl: string | null = null;
    const ogVideoMatch = html.match(/content="([^"]+)"\s+property="og:video(:secure_url)?"/);
    if (ogVideoMatch) videoUrl = ogVideoMatch[1];

    if (!videoUrl) {
      const jsonMatch = html.match(/"video_url":"([^"]+)"/);
      if (jsonMatch) videoUrl = jsonMatch[1].replace(/\\u002F/g, "/");
    }

    if (videoUrl) {
      const titleMatch = html.match(/content="([^"]+)"\s+property="og:title"/);
      const title = titleMatch?.[1] || "Pinterest Video";
      const qualityOptions: { label: string; resolution: string; url: string }[] = [];
      qualityOptions.push({ label: "Best", resolution: "Auto", url: videoUrl });

      return {
        title,
        thumbnail: "",
        duration: "--:--",
        author: "@unknown",
        platform: "Pinterest",
        downloadUrl: videoUrl,
        qualityOptions,
        filename: `mova_pinterest_${Date.now()}`,
      };
    }
  } catch (e) {
    console.log(`Pinterest scrape failed: ${e instanceof Error ? e.message : "unknown"}`);
  }

  return null;
}

/* ──────────────── Facebook Downloader ─── */
async function downloadFacebook(url: string) {
  // Strategy 1: Page scraping with bot UA
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
        "Accept": "text/html",
      },
      signal: AbortSignal.timeout(10000),
      redirect: "follow",
    });

    if (res.ok) {
      const html = await res.text();
      const result = extractFacebookVideo(html);
      if (result) return result;
    }
  } catch (e) {
    console.log(`Facebook bot scrape failed: ${e instanceof Error ? e.message : "unknown"}`);
  }

  // Strategy 2: Page scraping with regular UA
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
        "Accept": "text/html",
      },
      signal: AbortSignal.timeout(10000),
      redirect: "follow",
    });

    if (res.ok) {
      const html = await res.text();
      const result = extractFacebookVideo(html);
      if (result) return result;
    }
  } catch (e) {
    console.log(`Facebook scrape failed: ${e instanceof Error ? e.message : "unknown"}`);
  }

  return null;
}

function extractFacebookVideo(html: string) {
  const ogVideoMatch = html.match(/content="([^"]+)"\s+property="og:video(:secure_url)?"/);
  let videoUrl = ogVideoMatch?.[1];

  if (!videoUrl) {
    const sdMatch = html.match(/"sd_src_no_ratelimit":"([^"]+)"/);
    const hdMatch = html.match(/"hd_src_no_ratelimit":"([^"]+)"/);
    videoUrl = hdMatch?.[1]?.replace(/\\u002F/g, "/") || sdMatch?.[1]?.replace(/\\u002F/g, "/");
  }

  // Also try looking for video in the page data
  if (!videoUrl) {
    const dataMatch = html.match(/"playable_url_quality_hd":"([^"]+)"/);
    if (dataMatch) videoUrl = dataMatch[1].replace(/\\u002F/g, "/");
  }

  if (!videoUrl) {
    const dataMatch = html.match(/"playable_url":"([^"]+)"/);
    if (dataMatch) videoUrl = dataMatch[1].replace(/\\u002F/g, "/");
  }

  if (videoUrl) {
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
  }

  return null;
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
          result = await downloadReddit(trimmedUrl);
          break;
        }
        case "Twitter/X": {
          result = await downloadTwitter(trimmedUrl);
          break;
        }
        case "Pinterest": {
          result = await downloadPinterest(trimmedUrl);
          break;
        }
        case "Facebook": {
          result = await downloadFacebook(trimmedUrl);
          break;
        }
        case "Instagram": {
          result = await downloadInstagram(trimmedUrl);
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
      const platformErrors: Record<string, string> = {
        "Instagram": "Gagal mengunduh video Instagram. Instagram membatasi akses dari server. Pastikan video bersifat publik dan coba lagi.",
        "Facebook": "Gagal mengunduh video Facebook. Facebook membatasi akses dari server. Pastikan video bersifat publik dan coba lagi.",
        "Twitter/X": "Gagal mengunduh video Twitter/X. Pastikan tweet berisi video dan bersifat publik.",
        "YouTube": audioMode
          ? "Gagal mengekstrak audio YouTube. YouTube membatasi download dari server. Coba video lain."
          : "Gagal mengunduh video YouTube. YouTube membatasi download dari server. Coba video lain.",
      };

      return NextResponse.json({
        error: platformErrors[platform] || "Gagal mengunduh video. Video mungkin dibatasi atau privat. Pastikan link video publik dan coba lagi.",
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

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
    // Only return resolved URL if it looks like a valid URL
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

/* ──────────────── Cobalt API (Universal Fallback) ─── */
async function cobaltDownload(url: string, audioOnly: boolean) {
  const cobaltInstances = [
    "https://api.cobalt.tools",
  ];

  for (const instance of cobaltInstances) {
    try {
      const res = await fetch(instance, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        },
        body: JSON.stringify({
          url,
          videoQuality: "1080",
          audioFormat: "mp3",
          downloadMode: audioOnly ? "audio" : "auto",
          filenameStyle: "basic",
        }),
        signal: AbortSignal.timeout(15000),
      });

      if (!res.ok) continue;
      const data = await res.json();

      if (data.status === "redirect" || data.status === "tunnel") {
        const qualityOptions: { label: string; resolution: string; url: string }[] = [];
        const dlUrl = data.url as string;

        if (audioOnly) {
          qualityOptions.push({ label: "Audio", resolution: "MP3", url: dlUrl });
        } else {
          qualityOptions.push({ label: "HD", resolution: "1080p", url: dlUrl });
        }

        return {
          title: "Video",
          thumbnail: "",
          duration: "--:--",
          author: "@unknown",
          platform: detectPlatform(url),
          downloadUrl: dlUrl,
          qualityOptions,
          filename: `mova_${detectPlatform(url).toLowerCase()}_${Date.now()}`,
        };
      }

      if (data.status === "picker" && data.picker && data.picker.length > 0) {
        const picker = data.picker as Array<{ url: string; type: string }>;
        const qualityOptions: { label: string; resolution: string; url: string }[] = [];

        for (const item of picker) {
          if (item.type === "photo" || item.url) {
            qualityOptions.push({
              label: qualityOptions.length === 0 ? "Best" : `Option ${qualityOptions.length + 1}`,
              resolution: "Auto",
              url: item.url,
            });
          }
        }

        if (qualityOptions.length > 0) {
          return {
            title: "Video",
            thumbnail: "",
            duration: "--:--",
            author: "@unknown",
            platform: detectPlatform(url),
            downloadUrl: qualityOptions[0].url,
            qualityOptions,
            filename: `mova_${detectPlatform(url).toLowerCase()}_${Date.now()}`,
          };
        }
      }
    } catch (e) {
      console.log(`Cobalt failed (${instance}): ${e instanceof Error ? e.message : "unknown"}`);
    }
  }

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

  // Strategy 3: Cobalt API
  console.log("TikTok: Trying Cobalt API fallback...");
  const cobaltResult = await cobaltDownload(resolvedUrl, false);
  if (cobaltResult) {
    cobaltResult.platform = "TikTok";
    return cobaltResult;
  }

  return null;
}

/* ──────────────── YouTube Strategy A: InnerTube API (multiple clients) ─── */
async function youTubeInnerTube(videoId: string, audioOnly: boolean) {
  const clients: { clientName: string; clientVersion: string; extra?: Record<string, unknown>; thirdParty?: string }[] = [
    {
      clientName: "ANDROID",
      clientVersion: "19.29.37",
      extra: { androidSdkVersion: 30, osName: "Android", osVersion: "11", hl: "en", gl: "US" },
    },
    {
      clientName: "TVHTML5_SIMPLY_EMBEDDED_PLAYER",
      clientVersion: "2.0",
      thirdParty: "https://www.google.com",
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
      thirdParty: "https://www.google.com",
    },
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

  const audioFormats = adaptiveFormats
    .filter((f) => typeof f.mimeType === "string" && f.mimeType.includes("audio") && f.url)
    .sort((a, b) => ((b.bitrate as number) || 0) - ((a.bitrate as number) || 0));

  if (audioOnly) {
    if (audioFormats.length > 0) {
      const best = audioFormats[0];
      const bitrate = best.bitrate ? Math.round((best.bitrate as number) / 1000) : 128;
      qualityOptions.push({
        label: "Audio",
        resolution: "MP3",
        url: best.url as string,
      });
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

  // Final fallback: Cobalt
  console.log(`YouTube: All strategies failed, trying Cobalt...`);
  const cobaltResult = await cobaltDownload(url, audioOnly);
  if (cobaltResult) {
    cobaltResult.platform = "YouTube";
    return cobaltResult;
  }

  return null;
}

/* ──────────────── Instagram Downloader ─── */
async function downloadInstagram(url: string) {
  // Extract shortcode from Instagram URL
  let shortcode = "";
  try {
    const parsed = new URL(url);
    const pathParts = parsed.pathname.split("/").filter(Boolean);
    // URL patterns: /p/SHORTCODE/, /reel/SHORTCODE/, /reels/SHORTCODE/, /tv/SHORTCODE/
    const contentIdx = pathParts.findIndex(p => ["p", "reel", "reels", "tv"].includes(p));
    if (contentIdx >= 0 && pathParts[contentIdx + 1]) {
      shortcode = pathParts[contentIdx + 1];
    }
  } catch {}

  // Strategy 1: Try Cobalt API (most reliable for Instagram)
  console.log("Instagram: Trying Cobalt API...");
  const cobaltResult = await cobaltDownload(url, false);
  if (cobaltResult) {
    cobaltResult.platform = "Instagram";
    // Try to get a better title/thumbnail
    if (!cobaltResult.thumbnail || cobaltResult.title === "Video") {
      try {
        const oembedRes = await fetch(`https://www.instagram.com/p/${shortcode}/?__a=1&__d=dis`, {
          headers: {
            "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15",
            "Accept": "text/html",
          },
          signal: AbortSignal.timeout(5000),
          redirect: "follow",
        });
        if (oembedRes.ok) {
          const html = await oembedRes.text();
          const titleMatch = html.match(/content="([^"]+)"\s+property="og:title"/);
          if (titleMatch) cobaltResult.title = titleMatch[1];
          const imageMatch = html.match(/content="([^"]+)"\s+property="og:image"/);
          if (imageMatch) cobaltResult.thumbnail = imageMatch[1];
        }
      } catch {}
    }
    return cobaltResult;
  }

  // Strategy 2: Try Instagram embed endpoint
  if (shortcode) {
    console.log(`Instagram: Trying embed endpoint for shortcode: ${shortcode}`);
    try {
      const embedUrl = `https://www.instagram.com/p/${shortcode}/embed/`;
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

        // Try to find video URL in embed page
        const videoMatches = [
          html.match(/video_url&quot;:&quot;([^&]+)&quot;/),
          html.match(/"video_url":"([^"]+)"/),
          html.match(/og:video:secure_url"\s+content="([^"]+)"/),
          html.match(/og:video"\s+content="([^"]+)"/),
          html.match(/src="([^"]+)"\s+type="video\/mp4"/),
        ];

        let videoUrl: string | null = null;
        for (const match of videoMatches) {
          if (match?.[1]) {
            videoUrl = match[1].replace(/\\u002F/g, "/").replace(/&amp;/g, "&");
            break;
          }
        }

        if (videoUrl) {
          // Get thumbnail
          const thumbMatch = html.match(/og:image"\s+content="([^"]+)"/);
          const thumbnail = thumbMatch?.[1]?.replace(/&amp;/g, "&") || "";

          const qualityOptions: { label: string; resolution: string; url: string }[] = [];
          qualityOptions.push({ label: "Best", resolution: "Auto", url: videoUrl });

          return {
            title: "Instagram Video",
            thumbnail,
            duration: "--:--",
            author: "@unknown",
            platform: "Instagram",
            downloadUrl: videoUrl,
            qualityOptions,
            filename: `mova_instagram_${shortcode}_${Date.now()}`,
          };
        }
      }
    } catch (e) {
      console.log(`Instagram embed failed: ${e instanceof Error ? e.message : "unknown"}`);
    }
  }

  // Strategy 3: Try scraping the page directly with desktop user agent
  console.log("Instagram: Trying direct page scrape...");
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

      let videoUrl: string | null = null;
      let thumbnail: string | null = null;
      let title: string = "Instagram Video";

      // Try multiple patterns
      const patterns = [
        html.match(/"video_url":"([^"]+)"/),
        html.match(/content="([^"]+)"\s+property="og:video(:secure_url)?"/),
        html.match(/"playable_url":"([^"]+)"/),
        html.match(/"dash_manifest":"[^"]*","dash_playable_url":"([^"]+)"/),
      ];

      for (const match of patterns) {
        if (match?.[1]) {
          videoUrl = match[1].replace(/\\u002F/g, "/").replace(/&amp;/g, "&");
          break;
        }
      }

      const ogImageMatch = html.match(/content="([^"]+)"\s+property="og:image"/);
      if (ogImageMatch) thumbnail = ogImageMatch[1].replace(/&amp;/g, "&");

      const ogTitleMatch = html.match(/content="([^"]+)"\s+property="og:title"/);
      if (ogTitleMatch) title = ogTitleMatch[1];

      if (videoUrl) {
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
    }
  } catch (e) {
    console.log(`Instagram direct scrape failed: ${e instanceof Error ? e.message : "unknown"}`);
  }

  return null;
}

/* ──────────────── Reddit Downloader ─── */
async function downloadReddit(url: string) {
  // Strategy 1: Reddit JSON API
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

  // Strategy 2: Cobalt fallback
  const cobaltResult = await cobaltDownload(url, false);
  if (cobaltResult) {
    cobaltResult.platform = "Reddit";
    return cobaltResult;
  }

  return null;
}

/* ──────────────── Twitter/X Downloader ─── */
async function downloadTwitter(url: string) {
  // Strategy 1: fxtwitter
  try {
    const fxTwitterUrl = url.replace("twitter.com", "fxtwitter.com").replace("x.com", "fxtwitter.com");

    const res = await fetch(fxTwitterUrl, {
      headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" },
      signal: AbortSignal.timeout(8000),
    });

    if (!res.ok) throw new Error("FxTwitter gagal");

    const html = await res.text();
    const videoMatch = html.match(/content="([^"]+)"\s+property="og:video(:secure_url)?"/);
    const videoUrl = videoMatch?.[1];

    if (videoUrl) {
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
  } catch (e) {
    console.log(`fxtwitter failed: ${e instanceof Error ? e.message : "unknown"}`);
  }

  // Strategy 2: vxtwitter
  try {
    const vxUrl = url.replace("twitter.com", "vxtwitter.com").replace("x.com", "vxtwitter.com");
    const res = await fetch(vxUrl, {
      headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" },
      signal: AbortSignal.timeout(8000),
    });

    if (res.ok) {
      const html = await res.text();
      const videoMatch = html.match(/content="([^"]+)"\s+property="og:video(:secure_url)?"/);
      const videoUrl = videoMatch?.[1];

      if (videoUrl) {
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
    }
  } catch (e) {
    console.log(`vxtwitter failed: ${e instanceof Error ? e.message : "unknown"}`);
  }

  // Strategy 3: Cobalt fallback
  const cobaltResult = await cobaltDownload(url, false);
  if (cobaltResult) {
    cobaltResult.platform = "Twitter/X";
    return cobaltResult;
  }

  return null;
}

/* ──────────────── Pinterest Downloader ─── */
async function downloadPinterest(url: string) {
  // Strategy 1: Page scraping
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

  // Strategy 2: Cobalt fallback
  const cobaltResult = await cobaltDownload(url, false);
  if (cobaltResult) {
    cobaltResult.platform = "Pinterest";
    return cobaltResult;
  }

  return null;
}

/* ──────────────── Facebook Downloader ─── */
async function downloadFacebook(url: string) {
  // Strategy 1: Cobalt API (most reliable for Facebook)
  console.log("Facebook: Trying Cobalt API...");
  const cobaltResult = await cobaltDownload(url, false);
  if (cobaltResult) {
    cobaltResult.platform = "Facebook";
    return cobaltResult;
  }

  // Strategy 2: Page scraping
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

    const ogVideoMatch = html.match(/content="([^"]+)"\s+property="og:video(:secure_url)?"/);
    let videoUrl = ogVideoMatch?.[1];

    if (!videoUrl) {
      const sdMatch = html.match(/"sd_src_no_ratelimit":"([^"]+)"/);
      const hdMatch = html.match(/"hd_src_no_ratelimit":"([^"]+)"/);
      videoUrl = hdMatch?.[1]?.replace(/\\u002F/g, "/") || sdMatch?.[1]?.replace(/\\u002F/g, "/");
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
  } catch (e) {
    console.log(`Facebook scrape failed: ${e instanceof Error ? e.message : "unknown"}`);
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
      return NextResponse.json({
        error: audioMode
          ? "Gagal mengekstrak audio. Video mungkin dibatasi atau privat. Coba video lain."
          : "Gagal mengunduh video. Video mungkin dibatasi atau privat. Pastikan link video publik dan coba lagi.",
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

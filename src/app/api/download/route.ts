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

/* ──────────────── YouTube Downloader ─── */
// Strategy 1: Backend (yt-dlp + ffmpeg on Fly.io/Render/etc) — best quality, can bypass blocks
// Strategy 2: Cloudflare Worker (InnerTube API) — fallback if backend down
const BACKEND_API_URL = process.env.BACKEND_API_URL || process.env.KOYEB_API_URL || "";
const CF_WORKER_URL = process.env.CF_WORKER_URL || "https://mova-yt-proxy.ardiidonovan.workers.dev";

async function downloadYouTube(url: string, audioOnly: boolean) {
  const videoId = extractYouTubeVideoId(url);
  if (!videoId) return null;

  // ── Strategy 1: Backend (yt-dlp on Fly.io/Render) ──
  if (BACKEND_API_URL) {
    try {
      console.log(`[YouTube] Trying Backend (yt-dlp) for: ${videoId}`);
      const apiUrl = `${BACKEND_API_URL}/info?url=${encodeURIComponent(url)}&audio=${audioOnly ? "1" : "0"}`;
      const res = await fetch(apiUrl, {
        method: "GET",
        headers: { "Accept": "application/json" },
        signal: AbortSignal.timeout(35000),
      });

      if (res.ok) {
        const data = await res.json() as Record<string, unknown>;
        if (data.success && data.qualityOptions && (data.qualityOptions as unknown[]).length > 0) {
          console.log(`[YouTube] Backend success! ${(data.qualityOptions as unknown[]).length} qualities`);
          // Convert yt-dlp format to our format
          const qualityOptions = (data.qualityOptions as Array<Record<string, unknown>>).map((q) => {
            const label = (q.label as string) || (q.resolution as string) || "Auto";
            const resolution = (q.resolution as string) || label;
            const rawUrl = (q.url as string) || "";
            const needsConversion = q.needsConversion === true || q.needsMuxing === true;

            // Route download through backend /stream endpoint for URLs that need conversion
            // or for googlevideo URLs to avoid CORS issues
            let finalUrl = rawUrl;
            if (rawUrl.includes("googlevideo.com") || needsConversion) {
              finalUrl = `${BACKEND_API_URL}/stream?url=${encodeURIComponent(rawUrl)}&filename=${encodeURIComponent(data.filename || `mova_youtube_${videoId}`)}&quality=${encodeURIComponent(label)}`;
            }

            return {
              label,
              resolution,
              url: finalUrl,
              originalUrl: rawUrl,
              needsConversion,
            };
          });

          return {
            title: (data.title as string) || "Video YouTube",
            thumbnail: (data.thumbnail as string) || `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
            duration: (data.duration as string) || "--:--",
            author: (data.author as string) || "@unknown",
            platform: "YouTube",
            downloadUrl: qualityOptions[0]?.url || "",
            qualityOptions,
            filename: (data.filename as string) || `mova_youtube_${videoId}`,
          };
        }
      }
      console.log(`[YouTube] Backend returned ${res.status}`);
    } catch (error) {
      console.log(`[YouTube] Backend failed: ${error instanceof Error ? error.message : "unknown"}`);
    }
  }

  // ── Strategy 2: Cloudflare Worker (InnerTube API) ──
  try {
    console.log(`[YouTube] Trying CF Worker for: ${videoId}`);
    const res = await fetch(CF_WORKER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ videoId, audioOnly }),
      signal: AbortSignal.timeout(25000),
    });

    if (!res.ok) {
      console.log(`[YouTube] CF Worker returned ${res.status}`);
      return null;
    }

    const data = await res.json() as Record<string, unknown>;
    if (!data.success || !data.qualityOptions || (data.qualityOptions as unknown[]).length === 0) {
      console.log(`[YouTube] CF Worker no quality options`);
      return null;
    }

    console.log(`[YouTube] CF Worker success! ${(data.qualityOptions as unknown[]).length} qualities`);
    return data as {
      title: string; thumbnail: string; duration: string; author: string;
      platform: string; downloadUrl: string;
      qualityOptions: { label: string; resolution: string; url: string }[];
      filename: string;
    };
  } catch (error) {
    console.log(`[YouTube] CF Worker failed: ${error instanceof Error ? error.message : "unknown"}`);
    return null;
  }
}

/* ──────────────── TikTok via tikwm.com ─── */
function buildTikTokResult(data: Record<string, unknown>) {
  const duration = (data.duration as number) || 0;
  const durationStr = `${String(Math.floor(duration / 60)).padStart(2, "0")}:${String(duration % 60).padStart(2, "0")}`;
  const id = (data.id as string) || Date.now().toString();

  // Detect photo slide: tikwm returns `images` array for slideshows
  const images = data.images as string[] | undefined;
  if (images && Array.isArray(images) && images.length > 0) {
    // Photo slide / carousel detected
    const qualityOptions: { label: string; resolution: string; url: string }[] = [];
    if (data.music) qualityOptions.push({ label: "Audio", resolution: "MP3", url: data.music as string });

    return {
      title: (data.title as string) || "Slide Foto TikTok",
      thumbnail: (data.cover as string) || (data.origin_cover as string) || images[0] || "",
      duration: durationStr,
      author: (data.author as Record<string, string>)?.nickname || (data.author as Record<string, string>)?.unique_id || "@unknown",
      platform: "TikTok",
      downloadUrl: images[0] || "",
      qualityOptions,
      filename: `mova_tiktok_${id}`,
      isPhotoSlide: true as const,
      images: images as string[],
      imageCount: images.length,
    };
  }

  // Regular video
  const qualityOptions: { label: string; resolution: string; url: string }[] = [];
  if (data.hdplay) qualityOptions.push({ label: "HD", resolution: "1080p", url: data.hdplay as string });
  if (data.play) qualityOptions.push({ label: "SD", resolution: "720p", url: data.play as string });
  if (data.music) qualityOptions.push({ label: "Audio", resolution: "MP3", url: data.music as string });

  return {
    title: (data.title as string) || "Video TikTok",
    thumbnail: (data.cover as string) || (data.origin_cover as string) || "",
    duration: durationStr,
    author: (data.author as Record<string, string>)?.nickname || (data.author as Record<string, string>)?.unique_id || "@unknown",
    platform: "TikTok",
    downloadUrl: (data.hdplay as string) || (data.play as string) || "",
    qualityOptions,
    filename: `mova_tiktok_${id}`,
  };
}

/* ──────────────── TikTok Direct Mobile API (Fallback) ─── */
function extractTikTokVideoId(url: string): string | null {
  try {
    const parsed = new URL(url);
    const pathParts = parsed.pathname.split("/").filter(Boolean);
    const videoIdx = pathParts.findIndex(p => p === "video" || p === "photo");
    if (videoIdx >= 0 && pathParts[videoIdx + 1]) {
      return pathParts[videoIdx + 1].split("?")[0];
    }
  } catch {}
  return null;
}

async function downloadTikTokDirectAPI(url: string) {
  const videoId = extractTikTokVideoId(url);
  if (!videoId) return null;

  console.log(`[TikTok Direct API] Trying aweme_id: ${videoId}`);

  // Strategy: Use TikTok's aweme detail API
  try {
    const apiUrl = `https://api22-normal-c-useast2a.tiktokv.com/aweme/v1/feed/?aweme_id=${videoId}&feed_type=1&device_id=7209351825995827205&iid=7209351825995827205&channel=googleplay&aid=1180&version_code=310010&version_name=31.0.10&device_platform=android&os=android&ssmix=a&device_type=Pixel+6&device_brand=google&language=en&region=US&sys_region=US&app_name=trill&timezone_offset=28800&host_abi=arm64-v8a`;

    const res = await fetch(apiUrl, {
      headers: {
        "User-Agent": "com.ss.android.ugc.trill/310010 (Linux; U; Android 12; en_US; Pixel 6; Build/SD1A.210817.036; Cronet/58.0.2991.0)",
        "Accept": "application/json",
      },
      signal: AbortSignal.timeout(15000),
    });

    if (!res.ok) throw new Error(`Direct API returned ${res.status}`);
    const json = await res.json();
    const aweme = json?.aweme_list?.[0];
    if (!aweme) throw new Error("No aweme data");

    // Check for photo slide
    const imagePostInfo = aweme.image_post_info;
    if (imagePostInfo?.images && Array.isArray(imagePostInfo.images) && imagePostInfo.images.length > 0) {
      const images = imagePostInfo.images
        .map((img: Record<string, unknown>) => {
          const displayImage = img.display_image as Record<string, unknown> | undefined;
          const urlList = displayImage?.url_list as string[] | undefined;
          return urlList?.[0] || "";
        })
        .filter((u: string) => u.length > 0);

      if (images.length > 0) {
        const id = aweme.aweme_id || videoId;
        const author = aweme.author as Record<string, string> | undefined;
        const qualityOptions: { label: string; resolution: string; url: string }[] = [];
        if (aweme.music?.play_url?.uri) {
          qualityOptions.push({ label: "Audio", resolution: "MP3", url: aweme.music.play_url.uri as string });
        }

        console.log(`[TikTok Direct API] Photo slide with ${images.length} images`);
        return {
          title: (aweme.desc as string) || "Slide Foto TikTok",
          thumbnail: images[0] || "",
          duration: "00:00",
          author: author?.nickname || author?.unique_id || "@unknown",
          platform: "TikTok",
          downloadUrl: images[0] || "",
          qualityOptions,
          filename: `mova_tiktok_${id}`,
          isPhotoSlide: true as const,
          images,
          imageCount: images.length,
          _source: "direct_api",
        };
      }
    }

    // Regular video
    const video = aweme.video as Record<string, unknown> | undefined;
    const playAddr = video?.play_addr as Record<string, unknown> | undefined;
    const playUrlList = playAddr?.url_list as string[] | undefined;
    const playUrl = playUrlList?.[0] || "";
    const id = aweme.aweme_id || videoId;
    const author = aweme.author as Record<string, string> | undefined;
    const duration = (aweme.duration as number) || 0;
    const durationStr = `${String(Math.floor(duration / 60)).padStart(2, "0")}:${String(duration % 60).padStart(2, "0")}`;

    if (!playUrl) throw new Error("No video URL found");

    const qualityOptions: { label: string; resolution: string; url: string }[] = [];
    qualityOptions.push({ label: "SD", resolution: "720p", url: playUrl });
    if (aweme.music?.play_url?.uri) {
      qualityOptions.push({ label: "Audio", resolution: "MP3", url: aweme.music.play_url.uri as string });
    }

    const cover = video?.cover as Record<string, unknown> | undefined;
    const coverUrlList = cover?.url_list as string[] | undefined;

    console.log(`[TikTok Direct API] Video found`);
    return {
      title: (aweme.desc as string) || "Video TikTok",
      thumbnail: coverUrlList?.[0] || "",
      duration: durationStr,
      author: author?.nickname || author?.unique_id || "@unknown",
      platform: "TikTok",
      downloadUrl: playUrl,
      qualityOptions,
      filename: `mova_tiktok_${id}`,
      _source: "direct_api",
    };
  } catch (e) {
    console.log(`[TikTok Direct API] Failed: ${e instanceof Error ? e.message : "unknown"}`);
  }

  return null;
}

/* ──────────────── SSSTik Scraping (Fallback) ─── */
async function downloadTikTokSSSTik(url: string) {
  console.log(`[SSSTik] Trying: ${url}`);

  try {
    const res = await fetch("https://ssstik.io/abc?url=dl", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
        "Origin": "https://ssstik.io",
        "Referer": "https://ssstik.io/",
      },
      body: `id=${encodeURIComponent(url)}&locale=en&tt=abc`,
      signal: AbortSignal.timeout(15000),
    });

    if (!res.ok) throw new Error(`SSSTik returned ${res.status}`);
    const html = await res.text();

    // Check for error
    if (html.includes("serious problem") || html.includes("Error code")) {
      throw new Error("SSSTik: Video unavailable");
    }

    // Parse photo slides — look for splide__list or image links
    const imageUrls: string[] = [];
    // SSSTik returns images in <a> tags with href or <img> tags with src inside splide list
    const imgPattern = /<img[^>]+src="(https?:\/\/[^"]+)"/g;
    let match;
    while ((match = imgPattern.exec(html)) !== null) {
      const imgUrl = match[1];
      // Filter out icons/logos
      if (!imgUrl.includes("ssstik.io") && !imgUrl.includes("favicon") && !imgUrl.includes("logo")) {
        imageUrls.push(imgUrl);
      }
    }

    // If images found, it's a photo slide
    if (imageUrls.length > 1) {
      console.log(`[SSSTik] Photo slide with ${imageUrls.length} images`);
      const qualityOptions: { label: string; resolution: string; url: string }[] = [];
      return {
        title: "Slide Foto TikTok",
        thumbnail: imageUrls[0] || "",
        duration: "00:00",
        author: "@unknown",
        platform: "TikTok",
        downloadUrl: imageUrls[0] || "",
        qualityOptions,
        filename: `mova_tiktok_${Date.now()}`,
        isPhotoSlide: true as const,
        images: imageUrls,
        imageCount: imageUrls.length,
        _source: "ssstik",
      };
    }

    // Parse video URL — look for download link
    const hrefPattern = /<a[^>]+href="(https?:\/\/[^"]+)"[^>]*>(?:\s*Download|\s*Without)/i;
    const hrefMatch = html.match(hrefPattern);
    if (hrefMatch?.[1]) {
      const videoUrl = hrefMatch[1].replace(/&amp;/g, "&");
      console.log(`[SSSTik] Video found`);
      const qualityOptions: { label: string; resolution: string; url: string }[] = [];
      qualityOptions.push({ label: "HD", resolution: "720p", url: videoUrl });

      return {
        title: "Video TikTok",
        thumbnail: "",
        duration: "--:--",
        author: "@unknown",
        platform: "TikTok",
        downloadUrl: videoUrl,
        qualityOptions,
        filename: `mova_tiktok_${Date.now()}`,
        _source: "ssstik",
      };
    }
  } catch (e) {
    console.log(`[SSSTik] Failed: ${e instanceof Error ? e.message : "unknown"}`);
  }

  return null;
}

async function downloadTikTok(url: string) {
  let resolvedUrl = url;
  const hostname = (() => {
    try { return new URL(url).hostname.toLowerCase(); } catch { return ""; }
  })();

  if (hostname.includes("vm.tiktok") || hostname.includes("vt.tiktok") || hostname.includes("tiktok.com/t/")) {
    console.log(`TikTok: Resolving short URL: ${url}`);
    resolvedUrl = await resolveShortUrl(url);
    console.log(`TikTok: Resolved to: ${resolvedUrl}`);
  }

  // Strategy 1: tikwm API with POST
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

    const result = buildTikTokResult(json.data as Record<string, unknown>);
    if (result) return { ...result, _source: "tikwm" };
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

    const result = buildTikTokResult(json.data as Record<string, unknown>);
    if (result) return { ...result, _source: "tikwm" };
  } catch (e) {
    console.log(`TikTok tikwm GET failed: ${e instanceof Error ? e.message : "unknown"}`);
  }

  // Strategy 3: TikTok Direct Mobile API (most reliable, no third-party dependency)
  try {
    const result = await downloadTikTokDirectAPI(resolvedUrl);
    if (result) return result;
  } catch (e) {
    console.log(`TikTok Direct API failed: ${e instanceof Error ? e.message : "unknown"}`);
  }

  // Strategy 4: SSSTik.io scraping
  try {
    const result = await downloadTikTokSSSTik(resolvedUrl);
    if (result) return result;
  } catch (e) {
    console.log(`TikTok SSSTik failed: ${e instanceof Error ? e.message : "unknown"}`);
  }

  return null;
}

/* ──────────────── Instagram Downloader ─── */
async function downloadInstagram(url: string) {
  let shortcode = "";
  let contentType: "p" | "reel" | "reels" | "tv" = "p";
  try {
    const parsed = new URL(url);
    const pathParts = parsed.pathname.split("/").filter(Boolean);
    const contentIdx = pathParts.findIndex(p => ["p", "reel", "reels", "tv"].includes(p));
    if (contentIdx >= 0 && pathParts[contentIdx + 1]) {
      contentType = pathParts[contentIdx] as "p" | "reel" | "reels" | "tv";
      shortcode = pathParts[contentIdx + 1];
    }
  } catch {}

  // Strategy 1: Googlebot UA
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

  // Strategy 2: Mobile UA
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

  // Strategy 3: Embed endpoint
  if (shortcode) {
    try {
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

  // Strategy 4: Desktop UA
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
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
    console.log(`Instagram desktop scrape failed: ${e instanceof Error ? e.message : "unknown"}`);
  }

  return null;
}

function extractInstagramVideo(html: string, shortcode: string) {
  let videoUrl: string | null = null;
  let thumbnail: string | null = null;
  let title: string = "Instagram Video";
  let author: string = "@unknown";

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

  const thumbMatch = html.match(/content="([^"]+)"\s+property="og:image"/);
  if (thumbMatch) thumbnail = thumbMatch[1].replace(/&amp;/g, "&");

  const titleMatch = html.match(/content="([^"]+)"\s+property="og:title"/);
  if (titleMatch) title = titleMatch[1];

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

          let videoUrl: string | null = null;

          if (videos.length > 0) {
            const bestVideo = videos[0];
            videoUrl = bestVideo.url || null;

            if (bestVideo.variants && Array.isArray(bestVideo.variants)) {
              const mp4Variants = bestVideo.variants
                .filter((v: { content_type?: string; bitrate?: number; url?: string }) => v.content_type === "video/mp4" && v.url)
                .sort((a: { bitrate?: number }, b: { bitrate?: number }) => (b.bitrate || 0) - (a.bitrate || 0));

              if (mp4Variants.length > 0) {
                videoUrl = mp4Variants[0].url;
              }
            }
          }

          if (videoUrl) {
            const qualityOptions: { label: string; resolution: string; url: string }[] = [];
            qualityOptions.push({ label: "Best", resolution: "Auto", url: videoUrl });

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

  // Strategy 2: fxtwitter HTML with Discordbot UA
  try {
    const fxTwitterUrl = url.replace("twitter.com", "fxtwitter.com").replace("x.com", "fxtwitter.com");
    const res = await fetch(fxTwitterUrl, {
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

  // Strategy 3: vxtwitter HTML
  try {
    const vxUrl = url.replace("twitter.com", "vxtwitter.com").replace("x.com", "vxtwitter.com");
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
  // Strategy 1: Googlebot UA
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

  // Strategy 2: Regular UA
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
          ? "Gagal mengekstrak audio YouTube. Coba video lain atau coba lagi nanti."
          : "Gagal mengunduh video YouTube. Coba video lain atau coba lagi nanti.",
      };

      return NextResponse.json({
        error: platformErrors[platform] || "Gagal mengunduh video. Video mungkin dibatasi atau privat. Pastikan link video publik dan coba lagi.",
      }, { status: 500 });
    }

    // Route download URLs through appropriate proxy
    // For YouTube with Backend (Fly.io/Render): URLs already point to backend /stream
    // For YouTube with googlevideo: route through CF Worker /download (same IP = no begal!)
    // For other platforms: route through Vercel proxy
    const encodedSourceUrl = encodeURIComponent(trimmedUrl);
    const isYouTubeGooglevideo = platform === "YouTube" && result.qualityOptions.some(q => q.url.includes("googlevideo.com") || q.originalUrl?.includes("googlevideo.com"));
    const isYouTubeBackend = platform === "YouTube" && BACKEND_API_URL && result.qualityOptions.some(q => q.url.includes(BACKEND_API_URL));

    let proxiedQualityOptions;
    let downloadUrl;

    if (isYouTubeBackend) {
      // Backend /stream URLs already set — just add originalUrl for fallback
      proxiedQualityOptions = result.qualityOptions.map((q) => ({
        ...q,
        originalUrl: q.originalUrl || q.url,
      }));
      downloadUrl = result.downloadUrl;
    } else if (isYouTubeGooglevideo) {
      // Route through /api/yt-download → redirects to CF Worker /download
      // Using redirect avoids popup blocker and cross-origin issues
      const ytDownloadBase = "/api/yt-download";
      proxiedQualityOptions = result.qualityOptions.map((q) => ({
        ...q,
        originalUrl: q.originalUrl || q.url,
        url: `${ytDownloadBase}?url=${encodeURIComponent(q.url)}&filename=${encodeURIComponent(result.filename)}&quality=${encodeURIComponent(q.label)}`,
      }));
      downloadUrl = `${ytDownloadBase}?url=${encodeURIComponent(result.downloadUrl)}&filename=${encodeURIComponent(result.filename)}&quality=best`;
    } else {
      // Route through Vercel proxy (for TikTok, Instagram, etc.)
      proxiedQualityOptions = result.qualityOptions.map((q) => ({
        ...q,
        originalUrl: q.originalUrl || q.url,
        url: `/api/proxy?url=${encodeURIComponent(q.url)}&sourceUrl=${encodedSourceUrl}&filename=${encodeURIComponent(result.filename)}&quality=${encodeURIComponent(q.label)}`,
      }));
      downloadUrl = `/api/proxy?url=${encodeURIComponent(result.downloadUrl)}&sourceUrl=${encodedSourceUrl}&filename=${encodeURIComponent(result.filename)}&quality=best`;
    }

    // For photo slides: images = original CDN URLs (for display in <img>),
    // originalImages = proxy URLs (for download via /api/proxy)
    const rawImages = (result as Record<string, unknown>).images as string[] | undefined;
    const proxiedDownloadImages = rawImages
      ? rawImages.map((imgUrl: string) =>
          `/api/proxy?url=${encodeURIComponent(imgUrl)}&sourceUrl=${encodedSourceUrl}&filename=${encodeURIComponent(result.filename)}&quality=photo`
        )
      : undefined;

    return NextResponse.json(
      {
        ...result,
        originalDownloadUrl: result.downloadUrl,
        downloadUrl,
        qualityOptions: proxiedQualityOptions,
        // images = raw CDN URLs for direct <img> display (fast, no proxy overhead)
        // originalImages = proxy URLs for reliable downloading
        ...(rawImages ? { images: rawImages, originalImages: proxiedDownloadImages } : {}),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Download API error:", error);
    return NextResponse.json({ error: "Terjadi kesalahan internal. Silakan coba lagi nanti." }, { status: 500 });
  }
}

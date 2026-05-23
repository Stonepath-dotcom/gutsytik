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

/* ──────────────── YouTube Downloader — Multiple Strategies ──────────────── */
async function downloadYouTube(url: string, audioOnly = false) {
  const videoId = extractYouTubeVideoId(url);
  if (!videoId) throw new Error("URL YouTube tidak valid. Pastikan link benar.");

  const errors: string[] = [];

  // Strategy 1: InnerTube API with ANDROID_VR client (proven to work with API key)
  try {
    const result = await youTubeInnerTubeANDROIDVR(videoId, audioOnly);
    if (result) return result;
  } catch (e: unknown) {
    errors.push(e instanceof Error ? e.message : "InnerTube ANDROID_VR gagal");
  }

  // Strategy 2: InnerTube API with TVHTML5_SIMPLY_EMBEDDED_PLAYER client
  try {
    const result = await youTubeInnerTubeTV(videoId, audioOnly);
    if (result) return result;
  } catch (e: unknown) {
    errors.push(e instanceof Error ? e.message : "InnerTube TV gagal");
  }

  // Strategy 3: InnerTube API with IOS client (returns direct URLs without ciphers)
  try {
    const result = await youTubeInnerTubeIOS(videoId, audioOnly);
    if (result) return result;
  } catch (e: unknown) {
    errors.push(e instanceof Error ? e.message : "InnerTube IOS gagal");
  }

  // Strategy 4: Invidious API instances
  try {
    const result = await youTubeInvidious(videoId, audioOnly);
    if (result) return result;
  } catch (e: unknown) {
    errors.push(e instanceof Error ? e.message : "Invidious gagal");
  }

  // Strategy 5: Try Piped API instances
  try {
    const result = await youTubePiped(videoId, audioOnly);
    if (result) return result;
  } catch (e: unknown) {
    errors.push(e instanceof Error ? e.message : "Piped gagal");
  }

  throw new Error("Gagal download dari YouTube. Server sedang memblokir request. Coba lagi nanti atau gunakan link TikTok.");
}

/* ─── YouTube InnerTube — ANDROID_VR Client (works with API key) ─── */
async function youTubeInnerTubeANDROIDVR(videoId: string, audioOnly: boolean) {
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

  if (!response.ok) throw new Error("InnerTube ANDROID_VR response not OK");
  const data = await response.json();
  return parseYouTubeInnerTubeResponse(data, videoId, audioOnly);
}

/* ─── YouTube InnerTube — TVHTML5_SIMPLY_EMBEDDED_PLAYER ─── */
async function youTubeInnerTubeTV(videoId: string, audioOnly: boolean) {
  const response = await fetch(
    "https://www.youtube.com/youtubei/v1/player?prettyPrint=false&key=AIzaSyA8eiZmM1FaDVjRy-df2KTyQ_vz_yYM39w",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        videoId,
        context: {
          client: {
            clientName: "TVHTML5_SIMPLY_EMBEDDED_PLAYER",
            clientVersion: "2.0",
            hl: "en",
            gl: "US",
          },
          thirdParty: {
            embedUrl: "https://www.google.com",
          },
        },
      }),
    }
  );

  if (!response.ok) throw new Error("InnerTube TV response not OK");
  const data = await response.json();
  return parseYouTubeInnerTubeResponse(data, videoId, audioOnly);
}

/* ─── YouTube InnerTube — IOS Client ─── */
async function youTubeInnerTubeIOS(videoId: string, audioOnly: boolean) {
  const response = await fetch(
    "https://www.youtube.com/youtubei/v1/player?prettyPrint=false&key=AIzaSyA8eiZmM1FaDVjRy-df2KTyQ_vz_yYM39w",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "com.google.ios.youtube/19.29.1 (iPhone14,3; U; CPU iOS 17_5_1 like Mac OS X;)",
      },
      body: JSON.stringify({
        videoId,
        context: {
          client: {
            clientName: "IOS",
            clientVersion: "19.29.1",
            deviceModel: "iPhone14,3",
            hl: "en",
            gl: "US",
            osName: "iOS",
            osVersion: "17.5.1",
          },
        },
      }),
    }
  );

  if (!response.ok) throw new Error("InnerTube IOS response not OK");
  const data = await response.json();
  return parseYouTubeInnerTubeResponse(data, videoId, audioOnly);
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
    // Audio only: pick best audio format
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
    // Video: combined formats first (video+audio)
    for (const f of formats) {
      if (f.url) {
        const quality = (f.qualityLabel as string) || (f.quality as string) || "360p";
        qualityOptions.push({ label: quality, resolution: quality, url: f.url as string });
      }
    }

    // Adaptive video-only formats (higher quality but no audio)
    const videoFormats = adaptiveFormats.filter(
      (f) => typeof f.mimeType === "string" && f.mimeType.includes("video") && f.url
    );
    const seen = new Set<string>();
    for (const f of videoFormats) {
      const q = (f.qualityLabel as string) || (f.quality as string) || "?";
      if (seen.has(q)) continue;
      seen.add(q);
      if (q === "360p" && qualityOptions.some(o => o.resolution === "360p")) continue;
      qualityOptions.push({ label: q, resolution: q, url: f.url as string });
    }

    // Add audio-only option
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

/* ─── YouTube via Invidious API ─── */
async function youTubeInvidious(videoId: string, audioOnly: boolean) {
  const instances = [
    "https://inv.nadeko.net",
    "https://invidious.nerdvpn.de",
    "https://iv.ggtyler.dev",
    "https://invidious.privacyredirect.com",
    "https://yewtu.be",
  ];

  for (const instance of instances) {
    try {
      const res = await fetch(`${instance}/api/v1/videos/${videoId}`, {
        headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" },
        signal: AbortSignal.timeout(8000),
      });
      if (!res.ok) continue;

      const data = await res.json();
      if (!data.title) continue;

      const qualityOptions: { label: string; resolution: string; url: string }[] = [];

      if (audioOnly) {
        // Get audio streams
        const audioStreams = (data.adaptiveFormats || data.formatStreams || [])
          .filter((f: Record<string, unknown>) => typeof f.type === "string" && f.type.includes("audio"))
          .sort((a: Record<string, unknown>, b: Record<string, unknown>) => (b.bitrate as number || 0) - (a.bitrate as number || 0));

        if (audioStreams.length > 0) {
          // Use Invidious proxy URL
          const bestAudio = audioStreams[0];
          const audioUrl = bestAudio.url as string;
          qualityOptions.push({ label: "Audio", resolution: "MP3", url: audioUrl });
        }
      } else {
        // Video streams
        const formatStreams = data.formatStreams || [];
        for (const f of formatStreams) {
          if (f.url) {
            const quality = f.qualityLabel || f.quality || "360p";
            qualityOptions.push({ label: quality, resolution: quality, url: f.url });
          }
        }

        // Also add audio-only option
        const audioStreams = (data.adaptiveFormats || [])
          .filter((f: Record<string, unknown>) => typeof f.type === "string" && f.type.includes("audio"))
          .sort((a: Record<string, unknown>, b: Record<string, unknown>) => (b.bitrate as number || 0) - (a.bitrate as number || 0));

        if (audioStreams.length > 0) {
          qualityOptions.push({ label: "Audio", resolution: "MP3", url: audioStreams[0].url });
        }
      }

      if (qualityOptions.length === 0) continue;

      const lengthSeconds = data.lengthSeconds || 0;
      const duration = `${String(Math.floor(lengthSeconds / 60)).padStart(2, "0")}:${String(lengthSeconds % 60).padStart(2, "0")}`;

      return {
        title: data.title || "Video YouTube",
        thumbnail: data.videoThumbnails?.[0]?.url || `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
        duration,
        author: data.author || "@unknown",
        platform: "YouTube",
        downloadUrl: qualityOptions[0].url,
        qualityOptions,
        filename: `mova_youtube_${videoId}`,
      };
    } catch {
      continue;
    }
  }

  throw new Error("Semua Invidious instance gagal diakses.");
}

/* ─── YouTube via Piped API ─── */
async function youTubePiped(videoId: string, audioOnly: boolean) {
  const instances = [
    "https://pipedapi.kavin.rocks",
    "https://pipedapi.adminforge.de",
    "https://api.piped.projectsegfau.lt",
  ];

  for (const instance of instances) {
    try {
      const res = await fetch(`${instance}/streams/${videoId}`, {
        headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" },
        signal: AbortSignal.timeout(8000),
      });
      if (!res.ok) continue;

      const data = await res.json();
      if (!data.title) continue;

      const qualityOptions: { label: string; resolution: string; url: string }[] = [];

      if (audioOnly) {
        // Get audio streams from Piped
        const audioStreams = (data.audioStreams || [])
          .filter((s: Record<string, unknown>) => s.url && typeof s.mimeType === "string" && s.mimeType.includes("audio"))
          .sort((a: Record<string, unknown>, b: Record<string, unknown>) => (b.bitrate as number || 0) - (a.bitrate as number || 0));

        if (audioStreams.length > 0) {
          qualityOptions.push({ label: "Audio", resolution: "MP3", url: audioStreams[0].url as string });
        }
      } else {
        // Video streams from Piped
        const videoStreams = (data.videoStreams || [])
          .filter((s: Record<string, unknown>) => s.url && typeof s.mimeType === "string" && s.mimeType.includes("video"))
          .sort((a: Record<string, unknown>, b: Record<string, unknown>) => {
            const qA = parseInt((a.quality as string || "0").replace("p", ""));
            const qB = parseInt((b.quality as string || "0").replace("p", ""));
            return qB - qA;
          });

        // Deduplicate by quality, prefer mp4
        const seen = new Set<string>();
        for (const s of videoStreams) {
          const q = s.quality as string || "?";
          if (seen.has(q)) continue;
          seen.add(q);
          qualityOptions.push({ label: q, resolution: q, url: s.url as string });
        }

        // Add audio-only option
        const audioStreams = (data.audioStreams || [])
          .filter((s: Record<string, unknown>) => s.url && typeof s.mimeType === "string" && s.mimeType.includes("audio"))
          .sort((a: Record<string, unknown>, b: Record<string, unknown>) => (b.bitrate as number || 0) - (a.bitrate as number || 0));

        if (audioStreams.length > 0) {
          qualityOptions.push({ label: "Audio", resolution: "MP3", url: audioStreams[0].url as string });
        }
      }

      if (qualityOptions.length === 0) continue;

      const duration = data.duration || 0;
      const durationStr = `${String(Math.floor(duration / 60)).padStart(2, "0")}:${String(duration % 60).padStart(2, "0")}`;

      return {
        title: data.title || "Video YouTube",
        thumbnail: data.thumbnailUrl || `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
        duration: durationStr,
        author: data.uploader || "@unknown",
        platform: "YouTube",
        downloadUrl: qualityOptions[0].url,
        qualityOptions,
        filename: `mova_youtube_${videoId}`,
      };
    } catch {
      continue;
    }
  }

  throw new Error("Semua Piped instance gagal diakses.");
}

/* ──────────────── Instagram Downloader (Multiple Strategies) ──────────────── */
async function downloadInstagram(url: string) {
  // Strategy 1: Try saveig API
  try {
    const apiUrl = `https://api.saveig.app/api/v1/download?url=${encodeURIComponent(url)}`;
    const res = await fetch(apiUrl, {
      headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" },
      signal: AbortSignal.timeout(10000),
    });
    if (res.ok) {
      const data = await res.json();
      if (data.url || data.downloadUrl) {
        const downloadUrl = data.url || data.downloadUrl;
        const qualityOptions: { label: string; resolution: string; url: string }[] = [];
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

  // Strategy 2: Try using tikwm for Instagram (it supports some Instagram links)
  try {
    const apiUrl = `https://www.tikwm.com/api/?url=${encodeURIComponent(url)}&hd=1`;
    const res = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      signal: AbortSignal.timeout(10000),
    });
    if (res.ok) {
      const json = await res.json();
      if (json.code === 0 && json.data) {
        const data = json.data;
        const qualityOptions: { label: string; resolution: string; url: string }[] = [];
        if (data.hdplay) qualityOptions.push({ label: "HD", resolution: "1080p", url: data.hdplay });
        if (data.play) qualityOptions.push({ label: "SD", resolution: "720p", url: data.play });
        if (data.music) qualityOptions.push({ label: "Audio", resolution: "MP3", url: data.music });
        if (qualityOptions.length > 0) {
          return {
            title: data.title || "Instagram Video",
            thumbnail: data.cover || "",
            duration: data.duration ? `${String(Math.floor(data.duration / 60)).padStart(2, "0")}:${String(data.duration % 60).padStart(2, "0")}` : "--:--",
            author: data.author?.nickname || "@unknown",
            platform: "Instagram",
            downloadUrl: data.hdplay || data.play || data.music,
            qualityOptions,
            filename: `mova_instagram_${Date.now()}`,
          };
        }
      }
    }
  } catch {}

  // Fallback: Try Cobalt for Instagram
  try {
    const result = await downloadGenericCobalt(url, "Instagram");
    if (result) return result;
  } catch {}

  throw new Error("Download Instagram saat ini sedang tidak tersedia. Coba lagi nanti atau gunakan link TikTok/YouTube.");
}

/* ──────────────── Generic Downloader — Cobalt API (Community Instances) ──────────────── */
async function downloadGenericCobalt(url: string, platform: string, audioOnly = false) {
  // Community Cobalt instances that may not require auth
  const cobaltInstances = [
    "https://api.cobalt.tools/",
    "https://cobalt-api.kwiatekmiki.com/",
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
        signal: AbortSignal.timeout(10000),
      });

      if (!response.ok) continue;

      const data = await response.json();
      // Cobalt v7 may return a redirect or picker
      if (data.error) continue;
      if (!data.url && data.status !== "redirect" && data.status !== "tunnel") continue;

      const downloadUrl = data.url || "";

      const qualityOptions: { label: string; resolution: string; url: string }[] = [];
      if (audioOnly) {
        qualityOptions.push({ label: "Audio", resolution: "MP3", url: downloadUrl });
      } else {
        qualityOptions.push({ label: "Best", resolution: "Auto", url: downloadUrl });
        // Try to get audio-only version too
        try {
          const audioRes = await fetch(cobaltUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json", "Accept": "application/json" },
            body: JSON.stringify({ url, downloadMode: "audio" }),
            signal: AbortSignal.timeout(10000),
          });
          if (audioRes.ok) {
            const audioData = await audioRes.json();
            if (audioData.url) qualityOptions.push({ label: "Audio", resolution: "MP3", url: audioData.url });
          }
        } catch {}
      }

      if (qualityOptions.length === 0) continue;

      return {
        title: `Video ${platform}`,
        thumbnail: "",
        duration: "--:--",
        author: "@unknown",
        platform,
        downloadUrl: downloadUrl || qualityOptions[0].url,
        qualityOptions,
        filename: `mova_${platform.toLowerCase()}_${Date.now()}`,
      };
    } catch {
      continue;
    }
  }

  return null;
}

/* ──────────────── Generic Downloader (All Strategies) ──────────────── */
async function downloadGeneric(url: string, platform: string, audioOnly = false) {
  // Strategy 1: Try tikwm (supports multiple platforms)
  try {
    const apiUrl = `https://www.tikwm.com/api/?url=${encodeURIComponent(url)}&hd=1`;
    const res = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      signal: AbortSignal.timeout(10000),
    });
    if (res.ok) {
      const json = await res.json();
      if (json.code === 0 && json.data) {
        const data = json.data;
        const qualityOptions: { label: string; resolution: string; url: string }[] = [];
        if (data.hdplay) qualityOptions.push({ label: "HD", resolution: "1080p", url: data.hdplay });
        if (data.play) qualityOptions.push({ label: "SD", resolution: "720p", url: data.play });
        if (data.music) qualityOptions.push({ label: "Audio", resolution: "MP3", url: data.music });
        if (qualityOptions.length > 0) {
          return {
            title: data.title || `Video ${platform}`,
            thumbnail: data.cover || "",
            duration: data.duration ? `${String(Math.floor(data.duration / 60)).padStart(2, "0")}:${String(data.duration % 60).padStart(2, "0")}` : "--:--",
            author: data.author?.nickname || "@unknown",
            platform,
            downloadUrl: data.hdplay || data.play || data.music,
            qualityOptions,
            filename: `mova_${platform.toLowerCase()}_${Date.now()}`,
          };
        }
      }
    }
  } catch {}

  // Strategy 2: Try Cobalt
  try {
    const result = await downloadGenericCobalt(url, platform, audioOnly);
    if (result) return result;
  } catch {}

  // Strategy 3: For Reddit, try direct video extraction
  if (platform === "Reddit") {
    try {
      const result = await downloadReddit(url);
      if (result) return result;
    } catch {}
  }

  // Strategy 4: For Twitter/X, try specific API
  if (platform === "Twitter/X") {
    try {
      const result = await downloadTwitter(url);
      if (result) return result;
    } catch {}
  }

  throw new Error(`Download dari ${platform} saat ini sedang tidak tersedia. Coba gunakan link TikTok atau YouTube.`);
}

/* ──────────────── Reddit Downloader ──────────────── */
async function downloadReddit(url: string) {
  // Convert Reddit URL to JSON API
  let jsonUrl = url;
  if (url.includes("reddit.com")) {
    jsonUrl = url.replace(/\/$/, "") + ".json";
  }

  const res = await fetch(jsonUrl, {
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    },
    signal: AbortSignal.timeout(10000),
  });

  if (!res.ok) throw new Error("Reddit API gagal");

  const data = await res.json();
  const post = data?.[0]?.data?.children?.[0]?.data;
  if (!post) throw new Error("Post Reddit tidak ditemukan");

  const media = post.secure_media?.reddit_video || post.media?.reddit_video;
  if (!media?.fallback_url) throw new Error("Video Reddit tidak ditemukan");

  const qualityOptions: { label: string; resolution: string; url: string }[] = [];
  qualityOptions.push({ label: "HD", resolution: "720p", url: media.fallback_url });

  // Try to get lower quality
  if (media.is_gif === false && media.dash_url) {
    qualityOptions.push({ label: "SD", resolution: "480p", url: media.fallback_url.replace("/DASH_720.mp4", "/DASH_480.mp4") });
  }

  // Audio for Reddit videos (usually separate)
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
  // Try using FxTwitter/VxTwitter for direct video links
  const fxTwitterUrl = url.replace("twitter.com", "fxtwitter.com").replace("x.com", "fxtwitter.com");

  const res = await fetch(fxTwitterUrl, {
    headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" },
    signal: AbortSignal.timeout(10000),
  });

  if (!res.ok) throw new Error("FxTwitter gagal");

  // Try to extract video URL from the HTML page (og:video:secure_url)
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
    // Keep original URLs for preview/streaming, use proxy URLs for download
    const encodedSourceUrl = encodeURIComponent(trimmedUrl);
    const proxiedQualityOptions = result.qualityOptions.map((q) => ({
      ...q,
      originalUrl: q.url, // Keep original URL for preview
      url: `/api/proxy?url=${encodeURIComponent(q.url)}&sourceUrl=${encodedSourceUrl}&filename=${encodeURIComponent(result.filename)}&quality=${encodeURIComponent(q.label)}`,
    }));

    return NextResponse.json(
      {
        ...result,
        originalDownloadUrl: result.downloadUrl, // Keep original for preview
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

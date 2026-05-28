// YouTube InnerTube API Proxy + Download Proxy - Cloudflare Worker
// Runs on Cloudflare's edge network with residential-like IPs
// Also serves as download proxy to stream videos through CF (no 4MB limit)

const API_KEYS = [
  "AIzaSyAO_FJ2SlqU8Q4STEHLGCilw_Y9_11qcW8",
  "AIzaSyDZNkyC-AtROwMBpLfevIvqYk-Gfi8ZOeo",
  "AIzaSyA8eiZmM1FaDVjRy-df2KTyQ_vz_yYM39w",
  "AIzaSyB-63vPrdThhKuerbB2N_l7Kwwcxj6yUAc",
];

interface ClientConfig {
  clientName: string;
  clientVersion: string;
  extra?: Record<string, unknown>;
  thirdParty?: Record<string, unknown>;
}

const CLIENTS: ClientConfig[] = [
  {
    clientName: "MWEB",
    clientVersion: "2.20250526.07.00",
  },
  {
    clientName: "ANDROID_VR",
    clientVersion: "1.64.3",
    extra: { androidSdkVersion: 34, osName: "Android", osVersion: "14" },
  },
  {
    clientName: "TVHTML5_SIMPLY_EMBEDDED_PLAYER",
    clientVersion: "2.0",
    thirdParty: { embedUrl: "https://www.google.com" },
  },
  {
    clientName: "IOS",
    clientVersion: "19.45.4",
    extra: { deviceModel: "iPhone16,2" },
  },
  {
    clientName: "WEB_EMBEDDED_PLAYER",
    clientVersion: "2.20250526.00.00",
    thirdParty: { embedUrl: "https://www.google.com" },
  },
  {
    clientName: "WEB_CREATOR",
    clientVersion: "1.20250526.00.00",
  },
  {
    clientName: "WEB_REMIX",
    clientVersion: "1.20250526.00.00",
  },
  {
    clientName: "WEB",
    clientVersion: "2.20250526.00.00",
  },
];

// Generate content playback nonce
function generateCpn(): string {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_";
  let result = "";
  for (let i = 0; i < 16; i++) result += chars[Math.floor(Math.random() * chars.length)];
  return result;
}

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Max-Age": "86400",
};

interface Env {}

export default {
  async fetch(request: Request, _env: Env, _ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    // Handle CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: CORS_HEADERS });
    }

    // Health check
    if (request.method === "GET" && url.pathname === "/health") {
      return Response.json({ status: "ok", timestamp: Date.now() }, {
        headers: { "Access-Control-Allow-Origin": "*" },
      });
    }

    // ===== DOWNLOAD PROXY =====
    // Stream video/audio through Cloudflare Worker (no 4MB limit like Vercel)
    // Usage: GET /download?url=<googlevideo_url>&filename=<name>&quality=<label>
    if (request.method === "GET" && url.pathname === "/download") {
      const videoUrl = url.searchParams.get("url");
      const filename = url.searchParams.get("filename") || "mova_video";
      const quality = url.searchParams.get("quality") || "video";

      if (!videoUrl) {
        return Response.json({ error: "url parameter required" }, { status: 400, headers: { "Access-Control-Allow-Origin": "*" } });
      }

      try {
        // Validate URL
        const parsed = new URL(videoUrl);
        if (!["http:", "https:"].includes(parsed.protocol)) {
          return Response.json({ error: "Invalid URL" }, { status: 400, headers: { "Access-Control-Allow-Origin": "*" } });
        }

        // Set proper headers for fetching from googlevideo
        const headers: Record<string, string> = {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
          "Accept": "*/*",
          "Accept-Encoding": "identity",
        };

        if (parsed.hostname.includes("googlevideo") || parsed.hostname.includes("youtube")) {
          headers["Referer"] = "https://www.youtube.com/";
          headers["Origin"] = "https://www.youtube.com";
        }

        const response = await fetch(videoUrl, {
          headers,
          redirect: "follow",
          signal: AbortSignal.timeout(120000),
        });

        if (!response.ok) {
          return Response.json({ error: `Failed to fetch: ${response.status}` }, { status: response.status, headers: { "Access-Control-Allow-Origin": "*" } });
        }

        const contentType = response.headers.get("content-type") || "";
        const isAudio = quality === "Audio" || quality === "MP3" || quality === "Audio (Low)" || contentType.includes("audio");
        const extension = isAudio ? "mp3" : "mp4";
        const downloadFilename = `${filename}_${quality.replace(/[^a-zA-Z0-9]/g, "_")}.${extension}`;

        // Stream the response with download headers
        return new Response(response.body, {
          status: 200,
          headers: {
            "Content-Type": isAudio ? "audio/mpeg" : (contentType || "video/mp4"),
            "Content-Disposition": `attachment; filename="${downloadFilename}"`,
            "Cache-Control": "no-cache",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Expose-Headers": "Content-Disposition, Content-Length",
            ...(response.headers.get("content-length") ? {
              "Content-Length": response.headers.get("content-length")!,
            } : {}),
          },
        });
      } catch (error) {
        return Response.json({ error: (error as Error).message }, { status: 500, headers: { "Access-Control-Allow-Origin": "*" } });
      }
    }

    // ===== VIDEO INFO API =====
    if (request.method === "GET" && url.pathname !== "/health") {
      return Response.json({ error: "Use POST with { videoId, audioOnly }" }, { status: 400 });
    }

    if (request.method !== "POST") {
      return Response.json({ error: "Method not allowed" }, { status: 405 });
    }

    try {
      const body = await request.json() as { videoId?: string; audioOnly?: boolean };
      const { videoId, audioOnly } = body;

      if (!videoId) {
        return Response.json({ error: "videoId required" }, { status: 400 });
      }

      // Try each client and API key combination
      for (const key of API_KEYS) {
        for (const client of CLIENTS) {
          try {
            const context: Record<string, unknown> = {
              client: {
                clientName: client.clientName,
                clientVersion: client.clientVersion,
                hl: "en",
                gl: "US",
                ...(client.extra || {}),
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
                body: JSON.stringify({ videoId, context, contentCheckOk: true, racyCheckOk: true, cpn: generateCpn() }),
              }
            );

            if (!response.ok) continue;
            const data = await response.json() as Record<string, unknown>;

            const playability = data.playabilityStatus as Record<string, unknown> || {};
            if (playability.status !== "OK") continue;

            const streamingData = data.streamingData as Record<string, unknown> || {};
            const adaptiveFormats = (streamingData.adaptiveFormats || []) as Record<string, unknown>[];
            const formats = (streamingData.formats || []) as Record<string, unknown>[];
            const videoDetails = data.videoDetails as Record<string, unknown> || {};

            const audioFormats = adaptiveFormats
              .filter((f) => typeof f.mimeType === "string" && (f.mimeType as string).includes("audio") && f.url)
              .sort((a, b) => ((b.bitrate as number) || 0) - ((a.bitrate as number) || 0));

            const qualityOptions: Array<{ label: string; resolution: string; url: string }> = [];

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
                .filter((f) => typeof f.mimeType === "string" && (f.mimeType as string).includes("video") && f.url)
                .sort((a, b) => ((b.width as number) || 0) - ((a.width as number) || 0));
              const seen = new Set(qualityOptions.map(q => q.label));
              for (const f of videoFormats) {
                const quality = (f.qualityLabel as string) || (f.quality as string) || "";
                if (quality && !seen.has(quality) && qualityOptions.length < 8) {
                  qualityOptions.push({ label: quality, resolution: quality, url: f.url as string });
                  seen.add(quality);
                }
              }
              if (audioFormats.length > 0) {
                qualityOptions.push({ label: "Audio", resolution: "MP3", url: audioFormats[0].url as string });
              }
            }

            if (qualityOptions.length === 0) continue;

            const lengthSeconds = parseInt((videoDetails.lengthSeconds as string) || "0") || 0;

            return Response.json({
              success: true,
              title: videoDetails.title || "Video YouTube",
              thumbnail: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
              duration: `${String(Math.floor(lengthSeconds / 60)).padStart(2, "0")}:${String(lengthSeconds % 60).padStart(2, "0")}`,
              author: videoDetails.author || "@unknown",
              platform: "YouTube",
              downloadUrl: qualityOptions[0].url,
              qualityOptions,
              filename: `mova_youtube_${videoId}`,
            }, {
              headers: { "Access-Control-Allow-Origin": "*" },
            });
          } catch { continue; }
        }
      }

      return Response.json({ success: false, error: "All clients blocked by YouTube" }, {
        status: 500,
        headers: { "Access-Control-Allow-Origin": "*" },
      });
    } catch (error) {
      return Response.json({ error: (error as Error).message }, {
        status: 500,
        headers: { "Access-Control-Allow-Origin": "*" },
      });
    }
  },
};

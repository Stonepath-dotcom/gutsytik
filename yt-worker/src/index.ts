// YouTube InnerTube API Proxy - Cloudflare Worker
// Runs on Cloudflare's edge network with residential-like IPs

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
    clientName: "ANDROID_VR",
    clientVersion: "1.60.2",
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
    clientVersion: "1.20241217.01.00",
    thirdParty: { embedUrl: "https://www.google.com" },
  },
  {
    clientName: "WEB_CREATOR",
    clientVersion: "1.20241217.01.00",
  },
];

interface Env {}

export default {
  async fetch(request: Request, _env: Env, _ctx: ExecutionContext): Promise<Response> {
    // Handle CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Max-Age": "86400",
        },
      });
    }

    // Health check
    if (request.method === "GET") {
      const url = new URL(request.url);
      if (url.pathname === "/health") {
        return Response.json({ status: "ok", timestamp: Date.now() }, {
          headers: { "Access-Control-Allow-Origin": "*" },
        });
      }
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
                body: JSON.stringify({ videoId, context }),
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

// YouTube InnerTube API Proxy for Deno Deploy
// This runs on Deno Deploy's edge network which has residential-like IPs

const API_KEYS = [
  "AIzaSyAO_FJ2SlqU8Q4STEHLGCilw_Y9_11qcW8",
  "AIzaSyDZNkyC-AtROwMBpLfevIvqYk-Gfi8ZOeo",
  "AIzaSyA8eiZmM1FaDVjRy-df2KTyQ_vz_yYM39w",
  "AIzaSyB-63vPrdThhKuerbB2N_l7Kwwcxj6yUAc",
];

const CLIENTS = [
  {
    clientName: "ANDROID_VR",
    clientVersion: "1.60.2",
    androidSdkVersion: 34,
    osName: "Android",
    osVersion: "14",
  },
  {
    clientName: "TVHTML5_SIMPLY_EMBEDDED_PLAYER",
    clientVersion: "2.0",
  },
  {
    clientName: "ANDROID",
    clientVersion: "19.29.37",
    androidSdkVersion: 30,
    osName: "Android",
    osVersion: "11",
  },
  {
    clientName: "IOS",
    clientVersion: "19.45.4",
    deviceModel: "iPhone16,2",
  },
  {
    clientName: "WEB_EMBEDDED_PLAYER",
    clientVersion: "1.20241217.01.00",
  },
];

Deno.serve(async (req: Request) => {
  // Handle CORS
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }

  if (req.method !== "POST") {
    return Response.json({ error: "Method not allowed" }, { status: 405 });
  }

  try {
    const { videoId, audioOnly } = await req.json();
    
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
              ...(client.androidSdkVersion ? { androidSdkVersion: client.androidSdkVersion, osName: client.osName, osVersion: client.osVersion } : {}),
              ...(client.deviceModel ? { deviceModel: client.deviceModel } : {}),
            },
          };

          if (client.clientName === "TVHTML5_SIMPLY_EMBEDDED_PLAYER" || client.clientName === "WEB_EMBEDDED_PLAYER") {
            context.thirdParty = { embedUrl: "https://www.google.com" };
          }

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
          
          const playability = data.playabilityStatus || {};
          if (playability.status !== "OK") continue;

          const streamingData = data.streamingData || {};
          const adaptiveFormats = streamingData.adaptiveFormats || [];
          const formats = streamingData.formats || [];
          const videoDetails = data.videoDetails || {};

          const audioFormats = adaptiveFormats
            .filter((f: Record<string, unknown>) => typeof f.mimeType === "string" && f.mimeType.includes("audio") && f.url)
            .sort((a: Record<string, unknown>, b: Record<string, unknown>) => ((b.bitrate as number) || 0) - ((a.bitrate as number) || 0));

          const videoFormats = formats.filter((f: Record<string, unknown>) => f.url);

          const qualityOptions: Array<{ label: string; resolution: string; url: string }> = [];

          if (audioOnly) {
            if (audioFormats.length > 0) {
              qualityOptions.push({ label: "Audio", resolution: "MP3", url: audioFormats[0].url as string });
              if (audioFormats.length > 1) {
                qualityOptions.push({ label: "Audio (Low)", resolution: "MP3", url: audioFormats[audioFormats.length - 1].url as string });
              }
            }
          } else {
            for (const f of videoFormats) {
              const quality = (f.qualityLabel as string) || (f.quality as string) || "360p";
              qualityOptions.push({ label: quality, resolution: quality, url: f.url as string });
            }
            if (audioFormats.length > 0) {
              qualityOptions.push({ label: "Audio", resolution: "MP3", url: audioFormats[0].url as string });
            }
          }

          if (qualityOptions.length === 0) continue;

          return Response.json({
            success: true,
            title: videoDetails.title || "Video YouTube",
            thumbnail: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
            duration: `${String(Math.floor(parseInt(videoDetails.lengthSeconds || "0") / 60)).padStart(2, "0")}:${parseInt(videoDetails.lengthSeconds || "0") % 60}`,
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

    return Response.json({ success: false, error: "All clients failed" }, { status: 500 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});

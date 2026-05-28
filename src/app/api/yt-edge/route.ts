import { NextRequest, NextResponse } from "next/server";

// This route uses Edge Runtime which runs on Cloudflare's edge network
// with different (better) IP reputation for YouTube API access
export const runtime = "edge";

const API_KEYS = [
  "AIzaSyAO_FJ2SlqU8Q4STEHLGCilw_Y9_11qcW8",
  "AIzaSyDZNkyC-AtROwMBpLfevIvqYk-Gfi8ZOeo",
  "AIzaSyA8eiZmM1FaDVjRy-df2KTyQ_vz_yYM39w",
  "AIzaSyB-63vPrdThhKuerbB2N_l7Kwwcxj6yUAc",
];

const CLIENTS: Array<{
  clientName: string;
  clientVersion: string;
  extra?: Record<string, string | number>;
  thirdParty?: { embedUrl: string };
}> = [
  {
    clientName: "MWEB",
    clientVersion: "2.20250526.07.00",
  },
  {
    clientName: "TVHTML5_SIMPLY_EMBEDDED_PLAYER",
    clientVersion: "2.0",
    extra: { clientScreen: "EMBED" },
    thirdParty: { embedUrl: "https://www.google.com" },
  },
  {
    clientName: "WEB_EMBEDDED_PLAYER",
    clientVersion: "2.20250526.00.00",
    extra: { clientScreen: "EMBED" },
    thirdParty: { embedUrl: "https://www.google.com" },
  },
  {
    clientName: "ANDROID_VR",
    clientVersion: "1.64.3",
    extra: { androidSdkVersion: 34, osName: "Android", osVersion: "14" },
  },
  {
    clientName: "ANDROID",
    clientVersion: "20.10.38",
    extra: { androidSdkVersion: 34, osName: "Android", osVersion: "14" },
  },
  {
    clientName: "IOS",
    clientVersion: "20.10.4",
    extra: { deviceModel: "iPhone16,2" },
  },
  {
    clientName: "ANDROID_VR",
    clientVersion: "1.62.2",
    extra: { androidSdkVersion: 34, osName: "Android", osVersion: "14" },
  },
  {
    clientName: "ANDROID",
    clientVersion: "20.29.37",
    extra: { androidSdkVersion: 34, osName: "Android", osVersion: "14" },
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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { videoId, audioOnly } = body as { videoId: string; audioOnly: boolean };

    if (!videoId) {
      return NextResponse.json({ error: "videoId required" }, { status: 400 });
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

          // Generate content playback nonce (cpn)
          const cpnChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_";
          let cpn = "";
          for (let i = 0; i < 16; i++) cpn += cpnChars[Math.floor(Math.random() * cpnChars.length)];

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
              body: JSON.stringify({ videoId, context, contentCheckOk: true, racyCheckOk: true, cpn }),
            }
          );

          if (!response.ok) continue;
          const data = await response.json() as Record<string, unknown>;

          const playability = (data.playabilityStatus || {}) as Record<string, unknown>;
          if (playability.status !== "OK") continue;

          const streamingData = (data.streamingData || {}) as Record<string, unknown>;
          const adaptiveFormats = (streamingData.adaptiveFormats || []) as Record<string, unknown>[];
          const formats = (streamingData.formats || []) as Record<string, unknown>[];
          const videoDetails = (data.videoDetails || {}) as Record<string, unknown>;

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
            // Also add adaptive video formats
            const videoAdaptive = adaptiveFormats
              .filter((f) => typeof f.mimeType === "string" && (f.mimeType as string).includes("video") && f.url)
              .sort((a, b) => ((b.width as number) || 0) - ((a.width as number) || 0));
            
            const seen = new Set(qualityOptions.map(q => q.label));
            for (const f of videoAdaptive) {
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

          return NextResponse.json({
            success: true,
            title: videoDetails.title || "Video YouTube",
            thumbnail: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
            duration: `${String(Math.floor(lengthSeconds / 60)).padStart(2, "0")}:${String(lengthSeconds % 60).padStart(2, "0")}`,
            author: videoDetails.author || "@unknown",
            platform: "YouTube",
            downloadUrl: qualityOptions[0].url,
            qualityOptions,
            filename: `mova_youtube_${videoId}`,
          });
        } catch { continue; }
      }
    }

    return NextResponse.json({
      success: false,
      error: "YouTube blocked this video from server access. Try another video.",
    }, { status: 500 });
  } catch (error) {
    return NextResponse.json({
      error: error instanceof Error ? error.message : "Unknown error",
    }, { status: 500 });
  }
}

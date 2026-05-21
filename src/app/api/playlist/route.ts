import { NextRequest, NextResponse } from "next/server";
import { rateLimit } from "@/lib/rate-limit";

/**
 * Playlist endpoint using Invidious API instead of yt-dlp.
 * Extracts YouTube playlist ID and fetches playlist info from Invidious.
 */
export async function POST(request: NextRequest) {
  // Rate limiting: 30 requests per minute for playlist
  const ip = request.headers.get("x-forwarded-for") || "unknown";
  const { success } = rateLimit(ip, 30);
  if (!success) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a moment." },
      { status: 429, headers: { "Retry-After": "60" } }
    );
  }

  try {
    const body = await request.json();
    const { url } = body;

    if (!url || typeof url !== "string") {
      return NextResponse.json(
        { error: "URL playlist tidak boleh kosong." },
        { status: 400 }
      );
    }

    const trimmedUrl = url.trim();

    try {
      new URL(trimmedUrl);
    } catch {
      return NextResponse.json(
        { error: "Format URL tidak valid." },
        { status: 400 }
      );
    }

    // Extract playlist ID from URL using regex
    const playlistMatch = trimmedUrl.match(/list=([a-zA-Z0-9_-]+)/);
    if (!playlistMatch) {
      return NextResponse.json(
        { error: "Tidak ditemukan ID playlist dalam URL. Pastikan URL mengandung parameter ?list=..." },
        { status: 400 }
      );
    }

    const playlistId = playlistMatch[1];

    // Fetch playlist info from Invidious API
    try {
      const invidiousUrl = `https://inv.nadeko.net/api/v1/playlists/${playlistId}`;
      const response = await fetch(invidiousUrl, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        },
      });

      if (!response.ok) {
        if (response.status === 404) {
          return NextResponse.json(
            { error: "Playlist tidak ditemukan. Pastikan URL playlist valid dan bersifat publik." },
            { status: 404 }
          );
        }
        throw new Error(`Invidious API returned ${response.status}`);
      }

      const data = await response.json();

      // Map Invidious response to our expected format
      const videos = (data.videos || []).map(
        (entry: { title?: string; videoId?: string; lengthSeconds?: number; videoThumbnails?: { url: string; quality: string }[] }, index: number) => {
          const duration = entry.lengthSeconds || 0;
          const minutes = Math.floor(duration / 60);
          const seconds = duration % 60;
          const durationStr = duration > 0
            ? `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
            : "--:--";

          // Get best thumbnail
          const thumbnails = entry.videoThumbnails || [];
          const thumbnail = thumbnails[0]?.url || thumbnails[3]?.url || "";

          return {
            id: entry.videoId || String(index),
            title: entry.title || `Video ${index + 1}`,
            thumbnail,
            duration: durationStr,
            url: `https://www.youtube.com/watch?v=${entry.videoId}`,
          };
        }
      );

      if (videos.length === 0) {
        return NextResponse.json(
          { error: "Tidak ada video ditemukan di playlist. Pastikan URL playlist valid." },
          { status: 404 }
        );
      }

      return NextResponse.json(
        { videos, total: videos.length, title: data.title || "Playlist" },
        { status: 200 }
      );
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";

      return NextResponse.json(
        { error: `Gagal mengambil data playlist: ${errorMessage.substring(0, 100)}` },
        { status: 422 }
      );
    }
  } catch (error) {
    console.error("Playlist API error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan internal." },
      { status: 500 }
    );
  }
}

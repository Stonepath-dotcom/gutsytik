import { NextRequest, NextResponse } from "next/server";
import { rateLimit } from "@/lib/rate-limit";

/**
 * Subtitles endpoint using Invidious API and YouTube timedtext API
 * instead of yt-dlp.
 */

/* ──────────────── YouTube Video ID Extraction ──────────────── */
function extractYouTubeVideoId(url: string): string | null {
  try {
    const parsed = new URL(url);
    // Standard youtube.com/watch?v=...
    if (parsed.hostname.includes("youtube.com") && parsed.searchParams.get("v")) {
      return parsed.searchParams.get("v");
    }
    // Short youtu.be/...
    if (parsed.hostname === "youtu.be") {
      return parsed.pathname.slice(1).split("/")[0] || null;
    }
    // Embedded youtube.com/embed/...
    if (parsed.pathname.startsWith("/embed/")) {
      return parsed.pathname.split("/")[2] || null;
    }
  } catch {
    // Invalid URL
  }
  return null;
}

export async function POST(request: NextRequest) {
  // Rate limiting: 30 requests per minute for subtitles
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
    const { url, lang, format } = body;

    if (!url || typeof url !== "string") {
      return NextResponse.json(
        { error: "URL video tidak boleh kosong." },
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

    // Extract video ID
    const videoId = extractYouTubeVideoId(trimmedUrl);
    if (!videoId) {
      return NextResponse.json(
        { error: "Tidak dapat mengekstrak ID video YouTube dari URL." },
        { status: 400 }
      );
    }

    // If lang is provided, download the subtitle in SRT format via YouTube timedtext API
    if (lang && format === "srt") {
      try {
        const srtUrl = `https://www.youtube.com/api/timedtext?v=${videoId}&lang=${lang}&fmt=srt`;
        const response = await fetch(srtUrl, {
          headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          },
        });

        if (!response.ok) {
          throw new Error(`YouTube timedtext API returned ${response.status}`);
        }

        const content = await response.text();

        if (!content || content.trim().length === 0) {
          return NextResponse.json(
            { error: "Subtitle kosong atau tidak tersedia dalam format SRT." },
            { status: 404 }
          );
        }

        return NextResponse.json(
          { content, lang },
          { status: 200 }
        );
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : "Unknown error";
        return NextResponse.json(
          { error: `Gagal mengunduh subtitle: ${errorMessage.substring(0, 100)}` },
          { status: 422 }
        );
      }
    }

    // Otherwise, list available subtitles via Invidious API
    try {
      const invidiousUrl = `https://inv.nadeko.net/api/v1/videos/${videoId}`;
      const response = await fetch(invidiousUrl, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        },
      });

      if (!response.ok) {
        throw new Error(`Invidious API returned ${response.status}`);
      }

      const data = await response.json();
      const captions = data.captions || [];

      // Map Invidious captions to our expected format
      const subtitles: { lang: string; name: string }[] = captions.map(
        (cap: { label?: string; language_code?: string }) => ({
          lang: cap.language_code || "unknown",
          name: cap.label || cap.language_code?.toUpperCase() || "Unknown",
        })
      );

      if (subtitles.length === 0) {
        return NextResponse.json(
          { subtitles: [], message: "Tidak ada subtitle tersedia untuk video ini." },
          { status: 200 }
        );
      }

      return NextResponse.json(
        { subtitles },
        { status: 200 }
      );
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      return NextResponse.json(
        { error: `Gagal mengambil daftar subtitle: ${errorMessage.substring(0, 100)}` },
        { status: 422 }
      );
    }
  } catch (error) {
    console.error("Subtitles API error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan internal." },
      { status: 500 }
    );
  }
}

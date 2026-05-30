import { NextRequest, NextResponse } from "next/server";

/**
 * Lightweight photo preview proxy.
 * Accepts image URL via POST body (avoids URL length limits in query string).
 * Returns image with inline Content-Disposition for browser display.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const imageUrl = body.url as string;

    if (!imageUrl) {
      return NextResponse.json({ error: "URL gambar diperlukan." }, { status: 400 });
    }

    // Validate URL
    try {
      const parsed = new URL(imageUrl);
      if (!["http:", "https:"].includes(parsed.protocol)) throw new Error("Invalid protocol");
    } catch {
      return NextResponse.json({ error: "URL tidak valid." }, { status: 400 });
    }

    const headers: Record<string, string> = {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
      "Accept": "image/*,*/*",
      "Accept-Encoding": "identity",
    };

    // Add Referer for TikTok CDN
    const host = new URL(imageUrl).hostname.toLowerCase();
    if (host.includes("tiktokcdn") || host.includes("tiktok") || host.includes("tikwm")) {
      headers["Referer"] = "https://www.tiktok.com/";
    } else if (host.includes("fbcdn") || host.includes("cdninstagram") || host.includes("instagram")) {
      headers["Referer"] = "https://www.instagram.com/";
    } else if (host.includes("redd.it") || host.includes("reddit")) {
      headers["Referer"] = "https://www.reddit.com/";
    } else if (host.includes("pinimg") || host.includes("pinterest")) {
      headers["Referer"] = "https://www.pinterest.com/";
    }

    const res = await fetch(imageUrl, {
      headers,
      redirect: "follow",
      signal: AbortSignal.timeout(15000),
    });

    if (!res.ok) {
      return NextResponse.json({ error: `Gagal memuat gambar (${res.status})` }, { status: res.status });
    }

    const contentType = res.headers.get("content-type") || "image/jpeg";
    const contentLength = res.headers.get("content-length");

    return new NextResponse(res.body, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": "inline",
        "Cache-Control": "public, max-age=86400, immutable",
        "Access-Control-Allow-Origin": "*",
        ...(contentLength ? { "Content-Length": contentLength } : {}),
      },
    });
  } catch (error) {
    console.error("Photo preview error:", error);
    return NextResponse.json({ error: "Gagal memuat gambar." }, { status: 500 });
  }
}

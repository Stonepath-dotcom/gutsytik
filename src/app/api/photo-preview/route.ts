import { NextRequest, NextResponse } from "next/server";
import { rateLimit } from "@/lib/rate-limit";

export const maxDuration = 30;

/**
 * Photo preview proxy — loads TikTok/Instagram/etc. images server-side
 * and returns them inline for browser display.
 *
 * TikTok CDN images require proper Referer headers that browsers don't send,
 * so we MUST proxy them server-side.
 */
export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for") || "unknown";
  const { success } = rateLimit(ip, 30);
  if (!success) {
    return NextResponse.json({ error: "Terlalu banyak request." }, { status: 429 });
  }

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

    const host = new URL(imageUrl).hostname.toLowerCase();

    const headers: Record<string, string> = {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
      "Accept": "image/webp,image/apng,image/*,*/*;q=0.8",
      "Accept-Encoding": "identity",
    };

    // Add Referer for specific CDNs that require it
    if (host.includes("tiktokcdn") || host.includes("tiktok") || host.includes("tikwm") || host.includes("ibytedtos") || host.includes("byteimg")) {
      headers["Referer"] = "https://www.tiktok.com/";
    } else if (host.includes("fbcdn") || host.includes("cdninstagram") || host.includes("instagram")) {
      headers["Referer"] = "https://www.instagram.com/";
    } else if (host.includes("redd.it") || host.includes("reddit")) {
      headers["Referer"] = "https://www.reddit.com/";
    } else if (host.includes("pinimg") || host.includes("pinterest")) {
      headers["Referer"] = "https://www.pinterest.com/";
    }

    // Fetch the image
    const res = await fetch(imageUrl, {
      headers,
      redirect: "follow",
      signal: AbortSignal.timeout(15000),
    });

    if (!res.ok) {
      console.error(`[photo-preview] Fetch failed: ${res.status} for ${imageUrl.substring(0, 100)}`);
      // If tikwm.com image fails, try with different Referer
      if (host.includes("tikwm") && res.status === 403) {
        headers["Referer"] = "https://tikwm.com/";
        headers["Origin"] = "https://tikwm.com";
        try {
          const retryRes = await fetch(imageUrl, {
            headers,
            redirect: "follow",
            signal: AbortSignal.timeout(15000),
          });
          if (retryRes.ok) {
            const contentType = retryRes.headers.get("content-type") || "image/jpeg";
            const buffer = await retryRes.arrayBuffer();
            return new NextResponse(buffer, {
              status: 200,
              headers: {
                "Content-Type": contentType,
                "Content-Disposition": "inline",
                "Cache-Control": "public, max-age=86400",
                "Access-Control-Allow-Origin": "*",
                "Content-Length": buffer.byteLength.toString(),
              },
            });
          }
        } catch {}
      }
      return NextResponse.json({ error: `Gagal memuat gambar (${res.status})` }, { status: res.status });
    }

    const contentType = res.headers.get("content-type") || "image/jpeg";
    const buffer = await res.arrayBuffer();

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": "inline",
        "Cache-Control": "public, max-age=86400",
        "Access-Control-Allow-Origin": "*",
        "Content-Length": buffer.byteLength.toString(),
      },
    });
  } catch (error) {
    console.error("[photo-preview] Error:", error);
    return NextResponse.json({ error: "Gagal memuat gambar." }, { status: 500 });
  }
}

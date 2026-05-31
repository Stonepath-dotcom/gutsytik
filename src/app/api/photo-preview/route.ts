import { NextRequest, NextResponse } from "next/server";
import { rateLimit } from "@/lib/rate-limit";

export const maxDuration = 30;

/**
 * Photo preview proxy — loads TikTok/Instagram/etc. images server-side
 * and returns them inline for browser display.
 *
 * Supports BOTH GET and POST:
 * - GET:  /api/photo-preview?url=<encoded_url>  — directly usable as <img src>
 * - POST: { url: string } in body                — for long URLs that exceed GET limits
 */

async function fetchAndProxyImage(imageUrl: string): Promise<NextResponse> {
  const host = new URL(imageUrl).hostname.toLowerCase();

  const headers: Record<string, string> = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
    "Accept": "image/webp,image/apng,image/*,*/*;q=0.8",
    "Accept-Encoding": "identity",
  };

  // Add Referer for specific CDNs that require it
  if (host.includes("tiktokcdn") || host.includes("tiktok") || host.includes("tikwm") || host.includes("ibytedtos") || host.includes("byteimg") || host.includes("tiktokv.com")) {
    headers["Referer"] = "https://www.tiktok.com/";
    headers["Origin"] = "https://www.tiktok.com";
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
              "Cache-Control": "public, max-age=86400, s-maxage=86400",
              "Access-Control-Allow-Origin": "*",
              "Content-Length": buffer.byteLength.toString(),
            },
          });
        }
      } catch {}
    }

    // Try with TikTok mobile User-Agent as fallback
    if (host.includes("tiktokcdn") || host.includes("tiktok") || host.includes("ibytedtos")) {
      try {
        const mobileHeaders: Record<string, string> = {
          "User-Agent": "com.ss.android.ugc.trill/310010 (Linux; U; Android 12; en_US; Pixel 6; Build/SD1A.210817.036)",
          "Accept": "image/webp,image/*,*/*;q=0.8",
          "Referer": "https://www.tiktok.com/",
        };
        const retryRes = await fetch(imageUrl, {
          headers: mobileHeaders,
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
              "Cache-Control": "public, max-age=86400, s-maxage=86400",
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
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
      "Access-Control-Allow-Origin": "*",
      "Content-Length": buffer.byteLength.toString(),
    },
  });
}

function validateImageUrl(url: string): NextResponse | null {
  if (!url) {
    return NextResponse.json({ error: "URL gambar diperlukan." }, { status: 400 });
  }
  try {
    const parsed = new URL(url);
    if (!["http:", "https:"].includes(parsed.protocol)) throw new Error("Invalid protocol");
  } catch {
    return NextResponse.json({ error: "URL tidak valid." }, { status: 400 });
  }
  return null;
}

// GET handler — directly usable as <img src="/api/photo-preview?url=...">
export async function GET(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for") || "unknown";
  const { success } = rateLimit(ip, 30);
  if (!success) {
    return NextResponse.json({ error: "Terlalu banyak request." }, { status: 429 });
  }

  const imageUrl = request.nextUrl.searchParams.get("url");
  const validationError = validateImageUrl(imageUrl || "");
  if (validationError) return validationError;

  try {
    return await fetchAndProxyImage(imageUrl!);
  } catch (error) {
    console.error("[photo-preview] GET Error:", error);
    return NextResponse.json({ error: "Gagal memuat gambar." }, { status: 500 });
  }
}

// POST handler — for long URLs that exceed GET limits
export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for") || "unknown";
  const { success } = rateLimit(ip, 30);
  if (!success) {
    return NextResponse.json({ error: "Terlalu banyak request." }, { status: 429 });
  }

  try {
    const body = await request.json();
    const imageUrl = body.url as string;
    const validationError = validateImageUrl(imageUrl);
    if (validationError) return validationError;

    return await fetchAndProxyImage(imageUrl);
  } catch (error) {
    console.error("[photo-preview] POST Error:", error);
    return NextResponse.json({ error: "Gagal memuat gambar." }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";

/**
 * YouTube Download Redirect
 *
 * This route redirects the browser to the CF Worker download endpoint.
 * Why not navigate directly to workers.dev?
 * - Popup blockers block window.open() to external domains
 * - <a download> attribute is ignored for cross-origin URLs
 * - CSP navigate-to restrictions may apply
 *
 * By redirecting through our own domain, the browser follows the redirect
 * naturally (no popup blocker), and CF Worker sets Content-Disposition: attachment
 * so the browser downloads the file.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const videoUrl = searchParams.get("url");
  const filename = searchParams.get("filename") || "mova_video";
  const quality = searchParams.get("quality") || "video";

  if (!videoUrl) {
    return NextResponse.json({ error: "URL parameter required" }, { status: 400 });
  }

  // Validate URL
  try {
    const parsed = new URL(videoUrl);
    if (!["http:", "https:"].includes(parsed.protocol)) throw new Error("Invalid protocol");
  } catch {
    return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
  }

  // Build CF Worker download URL
  const CF_WORKER_URL = process.env.CF_WORKER_URL || "https://mova-yt-proxy.ardiidonovan.workers.dev";
  const cfDownloadUrl = `${CF_WORKER_URL}/download?url=${encodeURIComponent(videoUrl)}&filename=${encodeURIComponent(filename)}&quality=${encodeURIComponent(quality)}`;

  // Redirect to CF Worker — browser will follow naturally
  return NextResponse.redirect(cfDownloadUrl);
}

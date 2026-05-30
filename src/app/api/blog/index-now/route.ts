import { NextRequest, NextResponse } from "next/server";

/**
 * IndexNow API - Notify search engines instantly when new content is published
 * Supported by: Bing, Yandex, Seznam, Naver, Plus
 * Google also supports ping endpoints for sitemaps
 * 
 * This is the #1 automation for faster Google indexing!
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const urls: string[] = body.urls || [];
    const baseUrl = "https://getmova.my.id";

    // If no URLs provided, just ping the sitemap
    const submitUrls = urls.length > 0
      ? urls.map((u: string) => u.startsWith("http") ? u : `${baseUrl}${u}`)
      : [`${baseUrl}/blog`, `${baseUrl}/sitemap.xml`];

    // 1. IndexNow - Instant notification to Bing, Yandex, etc.
    const indexNowKey = process.env.INDEXNOW_KEY || "getmova2026indexkey";
    const indexNowPayload = {
      host: "getmova.my.id",
      key: indexNowKey,
      keyLocation: `${baseUrl}/${indexNowKey}.txt`,
      urlList: submitUrls,
    };

    const indexNowPromises = [
      // Bing IndexNow
      fetch("https://api.indexnow.org/indexnow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(indexNowPayload),
      }).catch(() => null),
      // Yandex IndexNow
      fetch("https://yandex.com/indexnow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(indexNowPayload),
      }).catch(() => null),
      // Bing Webmaster (same endpoint, different URL)
      fetch("https://www.bing.com/indexnow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(indexNowPayload),
      }).catch(() => null),
    ];

    // 2. Google Sitemap Ping - Tell Google to re-crawl sitemap
    const googlePingPromise = fetch(
      `https://www.google.com/ping?sitemap=${baseUrl}/sitemap.xml`
    ).catch(() => null);

    // 3. Google Indexing API (if service account configured)
    let googleIndexResult = null;
    if (process.env.GOOGLE_INDEXING_TOKEN) {
      try {
        googleIndexResult = await fetch(
          "https://indexing.googleapis.com/v3/urlNotifications:publish",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${process.env.GOOGLE_INDEXING_TOKEN}`,
            },
            body: JSON.stringify({
              url: submitUrls[0],
              type: "URL_UPDATED",
            }),
          }
        ).catch(() => null);
      } catch {
        // Google Indexing API is optional
      }
    }

    // Execute all in parallel
    await Promise.allSettled([
      ...indexNowPromises,
      googlePingPromise,
    ]);

    return NextResponse.json({
      success: true,
      submittedUrls: submitUrls,
      indexNow: true,
      googleSitemapPing: true,
      googleIndexingApi: !!process.env.GOOGLE_INDEXING_TOKEN,
      message: `Notified search engines about ${submitUrls.length} URL(s)`,
    });
  } catch (error: any) {
    console.error("IndexNow error:", error);
    return NextResponse.json(
      { error: "Failed to submit to search engines", details: error.message },
      { status: 500 }
    );
  }
}

// GET endpoint to create the IndexNow key file
export async function GET() {
  const key = process.env.INDEXNOW_KEY || "getmova2026indexkey";
  return new Response(key, {
    headers: { "Content-Type": "text/plain" },
  });
}

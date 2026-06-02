import { NextRequest, NextResponse } from "next/server";
import { getAllAutoBlogPosts } from "@/lib/auto-blog";

/**
 * IndexNow API - Notify search engines instantly when new content is published
 * Supported by: Bing, Yandex, Seznam, Naver, Plus
 * Google also supports ping endpoints for sitemaps
 *
 * This is the #1 automation for faster Google indexing!
 *
 * NEW: submitAll parameter to submit ALL blog URLs at once (weekly full submission)
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const urls: string[] = body.urls || [];
    const submitAll = body.submitAll as boolean | undefined;
    const baseUrl = "https://getmova.my.id";

    let submitUrls: string[];

    if (submitAll) {
      // Submit ALL pages on the site for comprehensive indexing
      const autoPosts = getAllAutoBlogPosts();
      const staticBlogSlugs = [
        "cara-download-video-tiktok-tanpa-watermark",
        "cara-download-video-instagram-reels",
        "download-video-tanpa-watermark-gratis",
        "tips-aman-download-video-online",
        "cara-download-video-facebook-hd",
        "download-video-twitter-x-tanpa-watermark",
        "ekstrak-audio-mp3-dari-video",
        "download-video-tanpa-watermark-terbaik",
        "cara-download-video-pinterest",
        "cara-download-reddit-video-dengan-audio",
        "cara-download-video-dari-telegram",
        "download-video-tanpa-aplikasi",
        "perbedaan-download-video-hd-dan-sd",
        "perbandingan-tiktok-downloader",
      ];

      submitUrls = [
        // Homepage
        baseUrl,
        // Platform pages
        `${baseUrl}/tiktok-downloader`,
        `${baseUrl}/instagram-downloader`,
        `${baseUrl}/facebook-downloader`,
        `${baseUrl}/twitter-downloader`,
        `${baseUrl}/pinterest-downloader`,
        `${baseUrl}/reddit-downloader`,
        `${baseUrl}/telegram-downloader`,
        `${baseUrl}/youtube-downloader`,
        `${baseUrl}/youtube-mp3`,
        `${baseUrl}/likee-downloader`,
        `${baseUrl}/snack-video-downloader`,
        // Tools pages
        `${baseUrl}/tools`,
        `${baseUrl}/tools/audio-converter`,
        `${baseUrl}/tools/format-comparison`,
        `${baseUrl}/tools/file-size-calculator`,
        `${baseUrl}/tools/trim-video`,
        `${baseUrl}/tools/convert-gif`,
        `${baseUrl}/tools/resolution-comparator`,
        `${baseUrl}/tools/bitrate-calculator`,
        // Info pages
        `${baseUrl}/about`,
        `${baseUrl}/contact`,
        `${baseUrl}/faq`,
        `${baseUrl}/how-it-works`,
        `${baseUrl}/blog`,
        // Legal pages
        `${baseUrl}/privacy`,
        `${baseUrl}/terms`,
        `${baseUrl}/disclaimer`,
        `${baseUrl}/dmca`,
        `${baseUrl}/cookie-policy`,
        // Static blog posts
        ...staticBlogSlugs.map((s) => `${baseUrl}/blog/${s}`),
        // Auto-generated blog posts
        ...autoPosts.map((p) => `${baseUrl}/blog/${p.slug}`),
      ];
    } else if (urls.length > 0) {
      submitUrls = urls.map((u: string) => u.startsWith("http") ? u : `${baseUrl}${u}`);
    } else {
      submitUrls = [`${baseUrl}/blog`, `${baseUrl}/sitemap.xml`];
    }

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
      totalUrls: submitUrls.length,
      indexNow: true,
      googleSitemapPing: true,
      googleIndexingApi: !!process.env.GOOGLE_INDEXING_TOKEN,
      fullSubmission: !!submitAll,
      message: `Notified search engines about ${submitUrls.length} URL(s)${submitAll ? " (full site submission)" : ""}`,
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

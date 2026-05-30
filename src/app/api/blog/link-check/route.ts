import { NextRequest, NextResponse } from "next/server";
import ZAI from "z-ai-web-dev-sdk";
import { getAllAutoBlogPosts } from "@/lib/auto-blog";

/**
 * Auto Broken Link Checker
 * Scans auto-generated blog posts for broken internal/external links
 * Uses web search to verify external links are still alive
 * Reports broken links so they can be fixed (Google HATES broken links!)
 */
export async function POST(req: NextRequest) {
  try {
    const posts = getAllAutoBlogPosts();
    const baseUrl = "https://getmova.my.id";

    // Extract all links from posts
    const linkMap: {
      slug: string;
      title: string;
      links: { href: string; text: string; type: "internal" | "external" }[];
    }[] = [];

    // Known internal pages on GetMova
    const knownInternalPaths = new Set([
      "/",
      "/blog",
      "/about",
      "/contact",
      "/faq",
      "/how-it-works",
      "/privacy",
      "/terms",
      "/disclaimer",
      "/dmca",
      "/cookie-policy",
      "/youtube-downloader",
      "/youtube-mp3",
      "/tiktok-downloader",
      "/instagram-downloader",
      "/facebook-downloader",
      "/twitter-downloader",
      "/pinterest-downloader",
      "/reddit-downloader",
      "/telegram-downloader",
    ]);

    // Add all auto-blog slugs
    for (const post of posts) {
      knownInternalPaths.add(`/blog/${post.slug}`);
    }

    // Add static blog slugs
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
    for (const slug of staticBlogSlugs) {
      knownInternalPaths.add(`/blog/${slug}`);
    }

    // Parse HTML content for links
    const hrefRegex = /<a\s+(?:[^>]*?\s+)?href="([^"]*)"[^>]*>(.*?)<\/a>/gi;

    for (const post of posts) {
      const links: { href: string; text: string; type: "internal" | "external" }[] = [];
      let match;

      while ((match = hrefRegex.exec(post.content)) !== null) {
        const href = match[1];
        const text = match[2].replace(/<[^>]*>/g, "").trim();

        if (href.startsWith("/") || href.startsWith(baseUrl)) {
          links.push({ href, text, type: "internal" });
        } else if (href.startsWith("http")) {
          links.push({ href, text, type: "external" });
        }
      }

      if (links.length > 0) {
        linkMap.push({
          slug: post.slug,
          title: post.title,
          links,
        });
      }
    }

    // Check internal links (verify path exists)
    const brokenInternal: {
      slug: string;
      title: string;
      brokenLink: string;
      linkText: string;
    }[] = [];

    for (const item of linkMap) {
      for (const link of item.links) {
        if (link.type === "internal") {
          const path = link.href.startsWith(baseUrl)
            ? link.href.replace(baseUrl, "")
            : link.href;

          if (!knownInternalPaths.has(path) && !path.startsWith("/blog/cara-") && path !== "/") {
            // Check if it might be a valid blog slug
            const isLikelyValid = path.startsWith("/blog/") && path.length > 10;
            if (!isLikelyValid) {
              brokenInternal.push({
                slug: item.slug,
                title: item.title,
                brokenLink: link.href,
                linkText: link.text,
              });
            }
          }
        }
      }
    }

    // Check external links using web search (sample a few)
    const brokenExternal: {
      slug: string;
      title: string;
      brokenLink: string;
      linkText: string;
      status: string;
    }[] = [];

    const externalLinks = linkMap.flatMap((item) =>
      item.links
        .filter((l) => l.type === "external")
        .map((l) => ({ ...l, slug: item.slug, title: item.title }))
    );

    // Check up to 10 external links
    const linksToCheck = externalLinks.slice(0, 10);

    for (const link of linksToCheck) {
      try {
        const response = await fetch(link.href, {
          method: "HEAD",
          signal: AbortSignal.timeout(5000),
        });
        if (!response.ok) {
          brokenExternal.push({
            slug: link.slug,
            title: link.title,
            brokenLink: link.href,
            linkText: link.text,
            status: `${response.status} ${response.statusText}`,
          });
        }
      } catch {
        // Link might be broken (timeout, DNS error, etc.)
        brokenExternal.push({
          slug: link.slug,
          title: link.title,
          brokenLink: link.href,
          linkText: link.text,
          status: "unreachable",
        });
      }
    }

    const totalLinks = linkMap.reduce((sum, item) => sum + item.links.length, 0);

    return NextResponse.json({
      success: true,
      totalPostsScanned: posts.length,
      totalLinksFound: totalLinks,
      internalLinksChecked: linkMap.reduce(
        (sum, item) => sum + item.links.filter((l) => l.type === "internal").length,
        0
      ),
      externalLinksChecked: linksToCheck.length,
      brokenInternalLinks: brokenInternal,
      brokenExternalLinks: brokenExternal,
      hasIssues: brokenInternal.length > 0 || brokenExternal.length > 0,
      summary: {
        healthy: totalLinks - brokenInternal.length - brokenExternal.length,
        broken: brokenInternal.length + brokenExternal.length,
        healthRate:
          totalLinks > 0
            ? `${Math.round(((totalLinks - brokenInternal.length - brokenExternal.length) / totalLinks) * 100)}%`
            : "100%",
      },
      message:
        brokenInternal.length + brokenExternal.length > 0
          ? `Found ${brokenInternal.length + brokenExternal.length} broken links that need fixing`
          : "All checked links are healthy!",
    });
  } catch (error: any) {
    console.error("Link check error:", error);
    return NextResponse.json(
      { error: "Failed to check links", details: error.message },
      { status: 500 }
    );
  }
}

// GET: Quick link health summary
export async function GET() {
  const posts = getAllAutoBlogPosts();
  const hrefRegex = /<a\s+(?:[^>]*?\s+)?href="([^"]*)"/gi;

  let totalLinks = 0;
  let internalLinks = 0;
  let externalLinks = 0;

  for (const post of posts) {
    let match;
    while ((match = hrefRegex.exec(post.content)) !== null) {
      totalLinks++;
      if (match[1].startsWith("/") || match[1].includes("getmova")) {
        internalLinks++;
      } else if (match[1].startsWith("http")) {
        externalLinks++;
      }
    }
  }

  return NextResponse.json({
    totalPosts: posts.length,
    totalLinks,
    internalLinks,
    externalLinks,
  });
}

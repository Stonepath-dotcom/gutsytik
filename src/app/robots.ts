import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/tiktok-downloader", "/instagram-downloader", "/facebook-downloader", "/twitter-downloader", "/pinterest-downloader", "/reddit-downloader", "/tiktok-photo-slide", "/blog", "/about", "/contact", "/faq", "/privacy", "/terms", "/disclaimer", "/dmca", "/cookie-policy", "/how-it-works", "/changelog", "/compare", "/tools"],
        disallow: [
          "/api/",
          "/youtube-downloader",
          "/youtube-mp3",
          "/youtube-mp3/",
          "/telegram-downloader",
          "/download-history",
          "/*.json$",
          "/*.xml$",
        ],
      },
      {
        userAgent: "Googlebot",
        allow: ["/", "/tiktok-downloader", "/instagram-downloader", "/facebook-downloader", "/twitter-downloader", "/pinterest-downloader", "/reddit-downloader", "/tiktok-photo-slide", "/blog", "/about", "/contact", "/faq", "/privacy", "/terms", "/disclaimer", "/dmca", "/cookie-policy", "/how-it-works", "/changelog", "/compare", "/tools"],
        disallow: [
          "/api/",
          "/youtube-downloader",
          "/youtube-mp3",
          "/youtube-mp3/",
          "/telegram-downloader",
          "/download-history",
        ],
      },
    ],
    sitemap: "https://getmova.my.id/sitemap.xml",
    host: "https://getmova.my.id",
  };
}

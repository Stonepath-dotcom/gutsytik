import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/youtube-downloader",
          "/youtube-mp3",
          "/youtube-mp3/",
          "/download-history",
        ],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: [
          "/api/",
          "/youtube-downloader",
          "/youtube-mp3",
          "/youtube-mp3/",
          "/download-history",
        ],
      },
    ],
    sitemap: "https://getmova.my.id/sitemap.xml",
    host: "https://getmova.my.id",
  };
}

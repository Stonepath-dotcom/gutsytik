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
        ],
      },
    ],
    sitemap: "https://getmova.my.id/sitemap.xml",
  };
}

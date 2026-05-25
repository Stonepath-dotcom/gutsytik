import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://getmova.my.id";

  // Platform landing pages
  const platforms = [
    "tiktok-downloader",
    "instagram-downloader",
    "youtube-downloader",
    "facebook-downloader",
    "twitter-downloader",
  ];

  // Blog articles
  const blogs = [
    "cara-download-video-tiktok-tanpa-watermark",
    "cara-download-video-instagram-reels",
    "cara-download-video-youtube-mp4",
    "download-video-tanpa-watermark-gratis",
    "cara-download-video-facebook-hd",
    "ekstrak-audio-mp3-dari-video",
    "download-video-twitter-x-tanpa-watermark",
    "tips-aman-download-video-online",
  ];

  // Legal pages
  const legal = [
    "privacy",
    "terms",
    "about",
    "contact",
  ];

  const platformEntries: MetadataRoute.Sitemap = platforms.map((slug) => ({
    url: `${baseUrl}/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const blogEntries: MetadataRoute.Sitemap = blogs.map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const legalEntries: MetadataRoute.Sitemap = legal.map((slug) => ({
    url: `${baseUrl}/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.4,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    ...platformEntries,
    ...blogEntries,
    ...legalEntries,
  ];
}

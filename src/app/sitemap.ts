import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://getmova.my.id";
  const now = new Date();
  const launchDate = new Date("2025-01-15");

  return [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: launchDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: launchDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: launchDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: launchDate,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/disclaimer`,
      lastModified: launchDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    // Blog listing
    {
      url: `${baseUrl}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    // Blog posts - high priority SEO content
    {
      url: `${baseUrl}/blog/download-tiktok-tanpa-watermark`,
      lastModified: new Date("2025-02-10"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog/download-youtube-mp3`,
      lastModified: new Date("2025-02-10"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog/download-instagram-reels`,
      lastModified: new Date("2025-02-10"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog/download-video-facebook-hd`,
      lastModified: new Date("2025-02-10"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog/download-video-twitter-x`,
      lastModified: new Date("2025-02-10"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog/download-video-tanpa-aplikasi`,
      lastModified: new Date("2025-02-10"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog/perbedaan-download-video-dan-audio-mp3`,
      lastModified: new Date("2025-02-10"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog/tips-aman-download-video-online`,
      lastModified: new Date("2025-02-10"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    // Platform downloader pages - highest priority for SEO
    {
      url: `${baseUrl}/tiktok-downloader`,
      lastModified: new Date("2025-03-01"),
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/youtube-downloader`,
      lastModified: new Date("2025-03-01"),
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/instagram-downloader`,
      lastModified: new Date("2025-03-01"),
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/facebook-downloader`,
      lastModified: new Date("2025-03-01"),
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/twitter-downloader`,
      lastModified: new Date("2025-03-01"),
      changeFrequency: "weekly",
      priority: 0.95,
    },
  ];
}

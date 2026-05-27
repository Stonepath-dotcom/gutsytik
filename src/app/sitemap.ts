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
    "pinterest-downloader",
    "reddit-downloader",
    "telegram-downloader",
    "youtube-mp3",
  ];

  // Blog articles with realistic dates
  const blogs: { slug: string; date: string }[] = [
    { slug: "cara-download-video-tiktok-tanpa-watermark", date: "2026-05-10" },
    { slug: "cara-download-video-instagram-reels", date: "2026-05-11" },
    { slug: "cara-download-video-youtube-mp4", date: "2026-05-12" },
    { slug: "download-video-tanpa-watermark-gratis", date: "2026-05-13" },
    { slug: "cara-download-video-facebook-hd", date: "2026-05-14" },
    { slug: "ekstrak-audio-mp3-dari-video", date: "2026-05-15" },
    { slug: "download-video-twitter-x-tanpa-watermark", date: "2026-05-16" },
    { slug: "tips-aman-download-video-online", date: "2026-05-17" },
    { slug: "cara-download-video-dari-story-instagram", date: "2026-05-18" },
    { slug: "download-video-youtube-tanpa-aplikasi", date: "2026-05-19" },
    { slug: "perbedaan-download-video-hd-dan-sd", date: "2026-05-20" },
    { slug: "cara-download-reddit-video-dengan-audio", date: "2026-05-20" },
    { slug: "download-instagram-reels", date: "2026-05-21" },
    { slug: "download-tiktok-tanpa-watermark", date: "2026-05-21" },
    { slug: "download-video-facebook-hd", date: "2026-05-22" },
    { slug: "download-video-tanpa-aplikasi", date: "2026-05-22" },
    { slug: "download-video-twitter-x", date: "2026-05-22" },
    { slug: "download-youtube-mp3", date: "2026-05-23" },
    { slug: "perbedaan-download-video-dan-audio-mp3", date: "2026-05-23" },
    { slug: "cara-download-video-pinterest", date: "2026-05-23" },
    { slug: "download-video-tanpa-watermark-terbaik", date: "2026-05-24" },
    { slug: "cara-download-video-youtube-hd-1080p", date: "2026-05-24" },
    { slug: "download-video-instagram-story-dan-reels", date: "2026-05-24" },
    { slug: "perbandingan-tiktok-downloader", date: "2026-05-25" },
    { slug: "cara-download-video-dari-telegram", date: "2026-05-25" },
    { slug: "cara-download-video-dari-whatsapp", date: "2026-05-25" },
    { slug: "download-video-lengkap-dengan-subtitle", date: "2026-05-26" },
    { slug: "cara-konversi-video-ke-mp3", date: "2026-05-26" },
    { slug: "perbandingan-youtube-downloader-terbaik", date: "2026-05-26" },
    { slug: "cara-download-video-dengan-koneksi-lambat", date: "2026-05-26" },
  ];

  // Legal & info pages
  const legal = [
    "privacy",
    "terms",
    "about",
    "contact",
    "disclaimer",
    "dmca",
    "faq",
    "blog",
    "cookie-policy",
    "how-it-works",
  ];

  const platformEntries: MetadataRoute.Sitemap = platforms.map((slug) => ({
    url: `${baseUrl}/${slug}`,
    lastModified: "2026-05-26",
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const blogEntries: MetadataRoute.Sitemap = blogs.map((b) => ({
    url: `${baseUrl}/blog/${b.slug}`,
    lastModified: b.date,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const legalEntries: MetadataRoute.Sitemap = legal.map((slug) => ({
    url: `${baseUrl}/${slug}`,
    lastModified: "2026-05-26",
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [
    {
      url: baseUrl,
      lastModified: "2026-05-26",
      changeFrequency: "daily",
      priority: 1,
    },
    ...platformEntries,
    ...blogEntries,
    ...legalEntries,
  ];
}

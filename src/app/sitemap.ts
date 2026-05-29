import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://getmova.my.id";
  const now = new Date().toISOString();

  // Platform landing pages (NO YouTube)
  const platforms = [
    { slug: "tiktok-downloader", priority: 0.9, changefreq: "weekly" as const },
    { slug: "instagram-downloader", priority: 0.9, changefreq: "weekly" as const },
    { slug: "facebook-downloader", priority: 0.8, changefreq: "weekly" as const },
    { slug: "twitter-downloader", priority: 0.8, changefreq: "weekly" as const },
    { slug: "pinterest-downloader", priority: 0.7, changefreq: "monthly" as const },
    { slug: "reddit-downloader", priority: 0.7, changefreq: "monthly" as const },
  ];

  // Blog articles (NO YouTube-related articles)
  const blogs: { slug: string; date: string }[] = [
    { slug: "cara-download-video-tiktok-tanpa-watermark", date: "2025-05-10" },
    { slug: "cara-download-video-instagram-reels", date: "2025-05-11" },
    { slug: "download-video-tanpa-watermark-gratis", date: "2025-05-13" },
    { slug: "cara-download-video-facebook-hd", date: "2025-05-14" },
    { slug: "ekstrak-audio-mp3-dari-video", date: "2025-05-15" },
    { slug: "download-video-twitter-x-tanpa-watermark", date: "2025-05-16" },
    { slug: "tips-aman-download-video-online", date: "2025-05-17" },
    { slug: "cara-download-video-dari-story-instagram", date: "2025-05-18" },
    { slug: "perbedaan-download-video-hd-dan-sd", date: "2025-05-20" },
    { slug: "cara-download-reddit-video-dengan-audio", date: "2025-05-20" },
    { slug: "download-instagram-reels", date: "2025-05-21" },
    { slug: "download-tiktok-tanpa-watermark", date: "2025-05-21" },
    { slug: "download-video-facebook-hd", date: "2025-05-22" },
    { slug: "download-video-tanpa-aplikasi", date: "2025-05-22" },
    { slug: "download-video-twitter-x", date: "2025-05-22" },
    { slug: "perbedaan-download-video-dan-audio-mp3", date: "2025-05-23" },
    { slug: "cara-download-video-pinterest", date: "2025-05-23" },
    { slug: "download-video-tanpa-watermark-terbaik", date: "2025-05-24" },
    { slug: "download-video-instagram-story-dan-reels", date: "2025-05-24" },
    { slug: "perbandingan-tiktok-downloader", date: "2025-05-25" },
    { slug: "cara-download-video-dari-telegram", date: "2025-05-25" },
    { slug: "cara-download-video-dari-whatsapp", date: "2025-05-25" },
    { slug: "download-video-lengkap-dengan-subtitle", date: "2025-05-26" },
    { slug: "cara-konversi-video-ke-mp3", date: "2025-05-26" },
    { slug: "cara-download-video-dengan-koneksi-lambat", date: "2025-05-26" },
  ];

  // Legal & info pages
  const legal = [
    { slug: "privacy", priority: 0.3 },
    { slug: "terms", priority: 0.3 },
    { slug: "about", priority: 0.4 },
    { slug: "contact", priority: 0.4 },
    { slug: "disclaimer", priority: 0.3 },
    { slug: "dmca", priority: 0.3 },
    { slug: "faq", priority: 0.5 },
    { slug: "blog", priority: 0.6 },
    { slug: "cookie-policy", priority: 0.3 },
    { slug: "how-it-works", priority: 0.5 },
  ];

  const platformEntries: MetadataRoute.Sitemap = platforms.map((p) => ({
    url: `${baseUrl}/${p.slug}`,
    lastModified: now,
    changeFrequency: p.changefreq,
    priority: p.priority,
    images: [`${baseUrl}/og-image.png`],
  }));

  const blogEntries: MetadataRoute.Sitemap = blogs.map((b) => ({
    url: `${baseUrl}/blog/${b.slug}`,
    lastModified: b.date,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const legalEntries: MetadataRoute.Sitemap = legal.map((l) => ({
    url: `${baseUrl}/${l.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: l.priority,
  }));

  return [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1,
      images: [`${baseUrl}/og-image.png`, `${baseUrl}/hero-people.png`],
    },
    ...platformEntries,
    ...blogEntries,
    ...legalEntries,
  ];
}

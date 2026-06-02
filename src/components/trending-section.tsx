"use client";

import { useState, useEffect } from "react";
import { TrendingUp, Download, Clock, Flame } from "lucide-react";
import Link from "next/link";

interface TrendingItem {
  title: string;
  platform: string;
  platformColor: string;
  platformSlug: string;
  downloads: string;
  timeAgo: string;
}

const PLATFORM_DATA = {
  TikTok: { color: "#010101", slug: "tiktok-downloader" },
  Instagram: { color: "#E1306C", slug: "instagram-downloader" },
  Facebook: { color: "#1877F2", slug: "facebook-downloader" },
  "Twitter/X": { color: "#14171A", slug: "twitter-downloader" },
  Pinterest: { color: "#E60023", slug: "pinterest-downloader" },
  Reddit: { color: "#FF4500", slug: "reddit-downloader" },
  Likee: { color: "#00E5FF", slug: "likee-downloader" },
};

// Trending video titles (simulated)
const TRENDING_TITLES = [
  "Tutorial Edit Video CapCut Viral",
  "Resep Masakan Nusantara",
  "Lagu TikTok Viral Terbaru",
  "Tips Belajar Efektif",
  "Review Gadget Terbaru 2025",
  "Video Komedi Lucu",
  "Tutorial Makeup Natural",
  "Highlight Pertandingan",
  "Video Traveling Indonesia",
  "Resep Minuman Kekinian",
  "Tutorial Dance Viral",
  "Tips Finansial Muda",
  "Video Kucing Lucu",
  "Rekomendasi Film Terbaru",
  "Tutorial Desain Canva",
  "Motivasi Pagi Produktif",
  "Resep Dessert Viral",
  "OOTD Fashion Inspo",
  "Tutorial Coding Pemula",
  "Fakta Menarik Dunia",
];

function getTrendingItems(): TrendingItem[] {
  // Use date-based seed for consistent daily results
  const today = new Date();
  const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();

  const platforms = Object.entries(PLATFORM_DATA);
  const items: TrendingItem[] = [];

  for (let i = 0; i < 8; i++) {
    const titleIdx = (seed + i * 7) % TRENDING_TITLES.length;
    const platformIdx = (seed + i * 3) % platforms.length;
    const [platformName, platformInfo] = platforms[platformIdx];

    // Generate realistic download counts (1.2K - 15.8K)
    const baseDownloads = ((seed * (i + 1)) % 14600) + 1200;
    const downloads = baseDownloads > 1000
      ? `${(baseDownloads / 1000).toFixed(1)}K`
      : baseDownloads.toString();

    // Time ago (5 menit - 3 jam)
    const minutes = ((seed + i * 13) % 175) + 5;
    const timeAgo = minutes >= 60
      ? `${Math.floor(minutes / 60)} jam lalu`
      : `${minutes} menit lalu`;

    items.push({
      title: TRENDING_TITLES[titleIdx],
      platform: platformName,
      platformColor: platformInfo.color,
      platformSlug: platformInfo.slug,
      downloads,
      timeAgo,
    });
  }

  return items;
}

export function TrendingSection() {
  const [items, setItems] = useState<TrendingItem[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setItems(getTrendingItems());
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E52222]/10 text-[#E52222] text-sm font-medium mb-4">
            <Flame className="h-4 w-4" />
            Trending Sekarang
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground" style={{ fontFamily: "var(--font-montserrat)" }}>
            Download Terpopuler Hari Ini
          </h2>
          <p className="text-muted-foreground mt-2 max-w-lg mx-auto">
            Video yang paling banyak didownload oleh pengguna Mova hari ini
          </p>
        </div>

        {/* Trending Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {items.map((item, i) => (
            <Link
              key={i}
              href={`/${item.platformSlug}`}
              className="group flex items-center gap-3 p-3 rounded-xl bg-card border border-border hover:border-[#E52222]/30 hover:shadow-sm transition-all"
            >
              {/* Rank */}
              <div className="flex-shrink-0 w-7 h-7 rounded-full bg-muted flex items-center justify-center text-xs font-bold text-muted-foreground group-hover:bg-[#E52222] group-hover:text-white transition-colors">
                {i + 1}
              </div>
              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate group-hover:text-[#E52222] transition-colors">
                  {item.title}
                </p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span
                    className="text-[10px] font-semibold text-white px-1.5 py-0.5 rounded"
                    style={{ backgroundColor: item.platformColor }}
                  >
                    {item.platform}
                  </span>
                  <span className="text-[10px] text-muted-foreground flex items-center gap-0.5">
                    <Download className="h-2.5 w-2.5" />
                    {item.downloads}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-8">
          <Link
            href="/#hero"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold bg-[#E52222] text-white hover:bg-[#E52222]/90 transition-colors"
          >
            <TrendingUp className="h-4 w-4" />
            Mulai Download Sekarang
          </Link>
        </div>
      </div>
    </section>
  );
}

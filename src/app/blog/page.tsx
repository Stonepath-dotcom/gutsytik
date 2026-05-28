import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calendar, Clock, Home, ChevronRight } from "lucide-react";
import { MovaLogo } from "@/components/mova-logo";
import { SitewideFooter } from "@/components/sitewide-footer";

export const metadata: Metadata = {
  title: "Blog Mova - Tips & Panduan Download Video Tanpa Watermark",
  description:
    "Temukan panduan lengkap cara download video tanpa watermark dari TikTok, Instagram, YouTube, Facebook, Twitter/X, Pinterest, dan Reddit. Tips aman dan tutorial terbaru 2026.",
  alternates: { canonical: "https://getmova.my.id/blog" },
  keywords: [
    "blog mova",
    "tips download video",
    "panduan download video tanpa watermark",
    "tutorial download video",
    "download video gratis",
  ],
  openGraph: {
    title: "Blog Mova - Tips & Panduan Download Video Tanpa Watermark",
    description:
      "Temukan panduan lengkap cara download video tanpa watermark dari TikTok, Instagram, YouTube, Facebook, dan Twitter/X.",
    url: "https://getmova.my.id/blog",
    siteName: "getmova",
    type: "website",
  },
};

const articles = [
  {
    slug: "cara-download-video-dari-telegram",
    title: "Cara Download Video dari Telegram dengan Cepat dan Mudah",
    description:
      "Panduan lengkap cara download video dari Telegram tanpa aplikasi tambahan. Simpan video Telegram ke galeri HP dengan cepat dan gratis.",
    date: "26 Mei 2026",
    readingTime: "6 menit",
    gradient: "from-[#26A5E4]/20 via-[#1B1B2F]/30 to-[#26A5E4]/10",
    icon: "✈️",
  },
  {
    slug: "perbandingan-tiktok-downloader",
    title: "Perbandingan TikTok Downloader: Mana yang Terbaik 2026?",
    description:
      "Perbandingan lengkap situs download video TikTok tanpa watermark. Temukan TikTok downloader terbaik berdasarkan kecepatan, kualitas, dan kemudahan.",
    date: "26 Mei 2026",
    readingTime: "8 menit",
    gradient: "from-[#010101] via-[#25F4EE]/20 to-[#FE2C55]/20",
    icon: "🎵",
  },
  {
    slug: "download-video-instagram-story-dan-reels",
    title: "Download Video Instagram Story dan Reels Tanpa Aplikasi",
    description:
      "Cara download Instagram Story dan Reels tanpa install aplikasi. Simpan Story dan Reels IG langsung dari browser, gratis dan cepat.",
    date: "26 Mei 2026",
    readingTime: "7 menit",
    gradient: "from-[#833AB4]/25 via-[#E1306C]/15 to-[#FCAF45]/15",
    icon: "📸",
  },
  {
    slug: "download-video-tanpa-watermark-terbaik",
    title: "10 Situs Download Video Tanpa Watermark Terbaik 2026",
    description:
      "Daftar 10 situs download video tanpa watermark terbaik tahun 2026. Perbandingan fitur, kecepatan, dan kemudahan setiap situs downloader.",
    date: "26 Mei 2026",
    readingTime: "9 menit",
    gradient: "from-[#10B981]/20 via-[#34D399]/15 to-[#10B981]/10",
    icon: "🏆",
  },
  {
    slug: "cara-download-video-youtube-hd-1080p",
    title: "Cara Download Video YouTube HD 1080p Gratis di HP & PC",
    description:
      "Tutorial download video YouTube dalam kualitas HD 1080p di HP dan PC. Panduan lengkap untuk mendapatkan video YouTube berkualitas tinggi.",
    date: "26 Mei 2026",
    readingTime: "8 menit",
    gradient: "from-[#FF0000]/20 via-[#282828]/30 to-[#FF0000]/10",
    icon: "📺",
  },
  {
    slug: "cara-download-video-pinterest",
    title: "Cara Download Video Pinterest ke Galeri HP dengan Mudah",
    description:
      "Panduan lengkap cara download video Pinterest ke galeri HP. Simpan video Pinterest tanpa watermark dengan cepat dan gratis menggunakan Mova.",
    date: "26 Mei 2026",
    readingTime: "7 menit",
    gradient: "from-[#E60023]/20 via-[#BD081C]/15 to-[#E60023]/10",
    icon: "📌",
  },
  {
    slug: "cara-download-reddit-video-dengan-audio",
    title: "Cara Download Video Reddit Dengan Audio - Mudah & Cepat",
    description:
      "Panduan lengkap cara download video Reddit dengan audio. Atasi masalah video Reddit tanpa suara dengan langkah mudah dan gratis.",
    date: "25 Mei 2026",
    readingTime: "9 menit",
    gradient: "from-[#FF4500]/20 via-[#1A1A2E]/30 to-[#FF4500]/10",
    icon: "🔴",
  },
  {
    slug: "perbedaan-download-video-hd-dan-sd",
    title: "Perbedaan Kualitas Video HD vs SD - Mana yang Harus Kamu Download?",
    description:
      "Panduan lengkap perbedaan kualitas video HD dan SD. Pelajari kapan harus pilih HD atau SD saat download video.",
    date: "25 Mei 2026",
    readingTime: "10 menit",
    gradient: "from-[#10B981]/20 via-[#34D399]/15 to-[#0C0C0E]",
    icon: "📺",
  },
  {
    slug: "download-video-youtube-tanpa-aplikasi",
    title: "Download Video YouTube Tanpa Aplikasi - Langsung dari Browser",
    description:
      "Panduan lengkap cara download video YouTube tanpa install aplikasi. Langsung dari browser, gratis, cepat, dan aman.",
    date: "25 Mei 2026",
    readingTime: "9 menit",
    gradient: "from-[#FF0000]/20 via-[#282828]/30 to-[#10B981]/10",
    icon: "🌐",
  },
  {
    slug: "cara-download-video-dari-story-instagram",
    title: "Cara Download Video dari Story Instagram - Tutorial Lengkap",
    description:
      "Panduan lengkap cara download video dari Story Instagram dengan mudah, gratis, dan cepat. Tanpa aplikasi tambahan.",
    date: "25 Mei 2026",
    readingTime: "9 menit",
    gradient: "from-[#833AB4]/25 via-[#E1306C]/15 to-[#FCAF45]/15",
    icon: "📱",
  },
  {
    slug: "cara-download-video-tiktok-tanpa-watermark",
    title: "Cara Download Video TikTok Tanpa Watermark - Mudah & Gratis",
    description:
      "Panduan lengkap cara download video TikTok tanpa watermark. Simak langkah-langkah mudah dan tips terbaik untuk menyimpan video TikTok bersih tanpa logo.",
    date: "24 Mei 2026",
    readingTime: "7 menit",
    gradient: "from-[#010101] via-[#25F4EE]/20 to-[#FE2C55]/20",
    icon: "🎵",
  },
  {
    slug: "cara-download-video-instagram-reels",
    title: "Cara Download Video Instagram Reels, Story & IGTV - Terbaru",
    description:
      "Pelajari cara download video Instagram Reels, Story, dan IGTV dengan mudah. Panduan lengkap termasuk tips kualitas dan privasi.",
    date: "23 Mei 2026",
    readingTime: "8 menit",
    gradient: "from-[#833AB4]/30 via-[#FD1D1D]/20 to-[#F77737]/20",
    icon: "📸",
  },
  {
    slug: "cara-download-video-youtube-mp4",
    title: "Cara Download Video YouTube MP4 HD - Gratis & Cepat",
    description:
      "Tutorial download video YouTube dalam format MP4 HD. Pelajari cara memilih kualitas, pertimbangan legal, dan tips download tercepat.",
    date: "22 Mei 2026",
    readingTime: "8 menit",
    gradient: "from-[#FF0000]/20 via-[#282828]/30 to-[#FF0000]/10",
    icon: "▶️",
  },
  {
    slug: "download-video-tanpa-watermark-gratis",
    title: "Download Video Tanpa Watermark Gratis - Semua Platform",
    description:
      "Panduan komprehensif download video tanpa watermark dari semua platform. Perbandingan tools dan mengapa Mova adalah pilihan terbaik.",
    date: "21 Mei 2026",
    readingTime: "9 menit",
    gradient: "from-[#10B981]/20 via-[#34D399]/15 to-[#10B981]/10",
    icon: "✨",
  },
  {
    slug: "cara-download-video-facebook-hd",
    title: "Cara Download Video Facebook HD - Mudah & Cepat",
    description:
      "Cara download video Facebook dalam kualitas HD. Panduan lengkap termasuk cara mengatasi video private dan tips kualitas terbaik.",
    date: "20 Mei 2026",
    readingTime: "7 menit",
    gradient: "from-[#1877F2]/20 via-[#1877F2]/10 to-[#0C0C0E]",
    icon: "📘",
  },
  {
    slug: "ekstrak-audio-mp3-dari-video",
    title: "Cara Ekstrak Audio MP3 dari Video Online - Gratis & Cepat",
    description:
      "Pelajari cara mengekstrak audio MP3 dari video online. Cocok untuk podcast, musik, dan konten audio lainnya. Gratis dan cepat!",
    date: "19 Mei 2026",
    readingTime: "7 menit",
    gradient: "from-[#34D399]/20 via-[#EC4899]/15 to-[#34D399]/10",
    icon: "🎧",
  },
  {
    slug: "download-video-twitter-x-tanpa-watermark",
    title: "Cara Download Video Twitter/X Tanpa Watermark - Gratis",
    description:
      "Panduan download video Twitter/X tanpa watermark. Tips memilih kualitas video dan cara tercepat untuk menyimpan video dari X.",
    date: "18 Mei 2026",
    readingTime: "6 menit",
    gradient: "from-[#14171A] via-[#657786]/20 to-[#1DA1F2]/15",
    icon: "🐦",
  },
  {
    slug: "tips-aman-download-video-online",
    title: "Tips Aman Download Video Online - Hindari Virus & Malware",
    description:
      "Panduan keamanan saat download video online. Pelajari cara menghindari virus, malware, dan situs berbahaya. Mova aman 100%!",
    date: "17 Mei 2026",
    readingTime: "8 menit",
    gradient: "from-[#10B981]/20 via-[#059669]/15 to-[#0C0C0E]",
    icon: "🛡️",
  },
  {
    slug: "download-tiktok-tanpa-watermark",
    title: "Download TikTok Tanpa Watermark - Cara Tercepat 2026",
    description:
      "Download video TikTok tanpa watermark dengan cepat dan gratis. Mova menghapus logo TikTok otomatis saat proses download.",
    date: "16 Mei 2026",
    readingTime: "5 menit",
    gradient: "from-[#010101] via-[#25F4EE]/15 to-[#FE2C55]/15",
    icon: "🎵",
  },
  {
    slug: "download-instagram-reels",
    title: "Download Instagram Reels - Simpan Reels IG Tanpa Watermark",
    description:
      "Cara download Instagram Reels tanpa watermark ke galeri HP. Simpan Reels favorit kamu dalam kualitas HD secara gratis.",
    date: "15 Mei 2026",
    readingTime: "5 menit",
    gradient: "from-[#833AB4]/20 via-[#FD1D1D]/15 to-[#F77737]/15",
    icon: "📸",
  },
  {
    slug: "download-video-facebook-hd",
    title: "Download Video Facebook HD Gratis - Cepat & Mudah",
    description:
      "Download video Facebook dalam kualitas HD secara gratis. Panduan lengkap download video FB ke HP dan komputer.",
    date: "14 Mei 2026",
    readingTime: "6 menit",
    gradient: "from-[#1877F2]/15 via-[#1877F2]/10 to-[#0C0C0E]",
    icon: "📘",
  },
  {
    slug: "download-video-tanpa-aplikasi",
    title: "Download Video Tanpa Aplikasi - Langsung dari Browser",
    description:
      "Cara download video tanpa install aplikasi apapun. Langsung dari browser, support semua platform, gratis dan cepat.",
    date: "13 Mei 2026",
    readingTime: "6 menit",
    gradient: "from-[#10B981]/20 via-[#34D399]/15 to-[#10B981]/10",
    icon: "🌐",
  },
  {
    slug: "download-video-twitter-x",
    title: "Download Video Twitter/X - Simpan Video X Gratis",
    description:
      "Cara download video dari Twitter/X dengan mudah. Simpan video, GIF, dan konten media dari X ke perangkat kamu.",
    date: "12 Mei 2026",
    readingTime: "5 menit",
    gradient: "from-[#14171A] via-[#657786]/15 to-[#1DA1F2]/10",
    icon: "🐦",
  },
  {
    slug: "download-youtube-mp3",
    title: "Download YouTube MP3 - Konversi Video ke Audio Gratis",
    description:
      "Konversi video YouTube ke MP3 secara gratis. Download lagu, podcast, dan audio dari YouTube dalam kualitas terbaik.",
    date: "11 Mei 2026",
    readingTime: "5 menit",
    gradient: "from-[#FF0000]/15 via-[#282828]/20 to-[#34D399]/10",
    icon: "🎧",
  },
  {
    slug: "perbedaan-download-video-dan-audio-mp3",
    title: "Perbedaan Download Video dan Audio MP3 - Mana yang Lebih Baik?",
    description:
      "Panduan lengkap perbedaan download video vs audio MP3. Kapan harus pilih video dan kapan lebih baik download audio saja.",
    date: "10 Mei 2026",
    readingTime: "7 menit",
    gradient: "from-[#10B981]/15 via-[#EC4899]/10 to-[#0C0C0E]",
    icon: "📊",
  },
  {
    slug: "cara-download-video-dari-whatsapp",
    title: "Cara Download Video dari WhatsApp — Panduan Lengkap 2026",
    description:
      "Tutorial lengkap download video dari WhatsApp chat, grup, dan status. Simpan video WhatsApp ke galeri dengan mudah dan cepat.",
    date: "9 Mei 2026",
    readingTime: "7 menit",
    gradient: "from-[#25D366]/20 via-[#128C7E]/15 to-[#075E54]/10",
    icon: "💬",
  },
  {
    slug: "download-video-lengkap-dengan-subtitle",
    title: "Cara Download Video Lengkap Dengan Subtitle — Tutorial 2026",
    description:
      "Panduan download video beserta subtitle (SRT, VTT). Cara soft-merge dan hard-merge subtitle ke video untuk nonton offline.",
    date: "8 Mei 2026",
    readingTime: "8 menit",
    gradient: "from-[#EAB308]/20 via-[#A16207]/15 to-[#0C0C0E]",
    icon: "📝",
  },
  {
    slug: "cara-konversi-video-ke-mp3",
    title: "Cara Konversi Video ke MP3 — Panduan Audio Terbaik 2026",
    description:
      "Tutorial konversi video ke MP3 dengan kualitas terbaik. Panduan bitrate, format audio, dan tools terbaik untuk extract audio dari video.",
    date: "7 Mei 2026",
    readingTime: "8 menit",
    gradient: "from-[#34D399]/20 via-[#EC4899]/15 to-[#10B981]/10",
    icon: "🎵",
  },
  {
    slug: "perbandingan-youtube-downloader-terbaik",
    title: "Perbandingan YouTube Downloader Terbaik 2026 — Mana yang Worth It?",
    description:
      "Review dan perbandingan YouTube downloader terbaik tahun 2026. Perbandingan fitur, kecepatan, keamanan, dan kemudahan setiap tool.",
    date: "6 Mei 2026",
    readingTime: "10 menit",
    gradient: "from-[#FF0000]/20 via-[#10B981]/15 to-[#0C0C0E]",
    icon: "⭐",
  },
  {
    slug: "cara-download-video-dengan-koneksi-lambat",
    title: "Cara Download Video Dengan Koneksi Lambat — Tips & Trik 2026",
    description:
      "Tips download video saat koneksi internet lambat. Optimasi download, pilih resolusi tepat, dan trik hemat kuota data.",
    date: "5 Mei 2026",
    readingTime: "9 menit",
    gradient: "from-[#10B981]/15 via-[#10B981]/10 to-[#0C0C0E]",
    icon: "📶",
  },
];

export default function BlogPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Blog Mova - Tips & Panduan Download Video",
    description: "Temukan panduan lengkap cara download video tanpa watermark dari berbagai platform populer.",
    url: "https://getmova.my.id/blog",
    publisher: {
      "@type": "Organization",
      name: "getmova",
      logo: { "@type": "ImageObject", url: "https://getmova.my.id/mova-logo.png" },
    },
    blogPost: articles.map((article) => ({
      "@type": "BlogPosting",
      headline: article.title,
      description: article.description,
      url: `https://getmova.my.id/blog/${article.slug}`,
      datePublished: "2026-05-26",
      author: { "@type": "Organization", name: "getmova" },
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://getmova.my.id" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://getmova.my.id/blog" },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div className="min-h-screen flex flex-col bg-card text-foreground">
        {/* Header */}
        <header className="border-b border-border bg-card">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <a href="/" className="flex items-center gap-2">
                <MovaLogo size={32} showText />
              </a>
              <a
                href="/"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border border-border bg-card text-foreground hover:bg-muted/50 transition-colors"
              >
                <Home className="h-4 w-4" />
                Beranda
              </a>
            </div>
          </div>
        </header>

        <main className="flex-1">
          {/* Breadcrumb */}
          <div className="mx-auto max-w-5xl px-4 pt-6">
            <nav aria-label="Breadcrumb">
              <ol className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <li><a href="/" className="hover:text-[#10B981] transition-colors">Beranda</a></li>
                <li><ChevronRight className="h-3.5 w-3.5" /></li>
                <li className="text-[#10B981] font-medium">Blog</li>
              </ol>
            </nav>
          </div>

          {/* Hero */}
          <section className="relative pt-8 pb-12 px-4 sm:px-6 overflow-hidden">
            <div className="relative mx-auto max-w-4xl text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#10B981]/10 border border-[#10B981]/20 mb-4">
                <span className="text-xs font-semibold text-[#10B981]">
                  Blog & Panduan
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 leading-tight font-[family-name:var(--font-montserrat)]">
                Tips & Panduan{" "}
                <span className="gradient-text">Download Video</span>
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
                Temukan tutorial lengkap cara download video tanpa watermark dari
                berbagai platform sosial media. Ditulis oleh tim Mova untuk kamu.
              </p>
            </div>
          </section>

          {/* Article Grid */}
          <section className="px-4 sm:px-6 pb-16">
            <div className="mx-auto max-w-5xl grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {articles.map((article) => (
                <Link
                  key={article.slug}
                  href={`/blog/${article.slug}`}
                  className="group rounded-2xl overflow-hidden bg-card border border-border hover:border-[#10B981]/30 transition-all duration-200"
                >
                  {/* Thumbnail placeholder */}
                  <div
                    className={`h-32 sm:h-36 bg-gradient-to-br ${article.gradient} flex items-center justify-center relative`}
                  >
                    <span className="text-4xl opacity-80">{article.icon}</span>
                    <div className="absolute inset-0 bg-gradient-to-t from-card/80 dark:from-[#111113]/80 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <div className="flex items-center gap-3 text-[11px] text-muted-foreground mb-2">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3 text-[#10B981]" />
                        {article.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3 text-[#10B981]" />
                        {article.readingTime}
                      </span>
                    </div>

                    <h2 className="font-bold text-foreground text-sm sm:text-base mb-2 group-hover:text-[#10B981] transition-colors line-clamp-2 font-[family-name:var(--font-montserrat)]">
                      {article.title}
                    </h2>

                    <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
                      {article.description}
                    </p>

                    <span className="inline-flex items-center gap-1 text-xs font-medium text-[#10B981] group-hover:gap-2 transition-all">
                      Baca Selengkapnya
                      <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="px-4 sm:px-6 pb-16">
            <div className="mx-auto max-w-3xl">
              <div className="rounded-2xl p-6 sm:p-8 text-center bg-gradient-to-br from-[#10B981]/20 to-[#34D399]/10 border border-[#10B981]/30">
                <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2 font-[family-name:var(--font-montserrat)]">
                  Langsung Coba Mova Sekarang
                </h2>
                <p className="text-muted-foreground mb-5 text-sm sm:text-base max-w-md mx-auto">
                  Download video tanpa watermark dari TikTok, Instagram, YouTube, dan
                  platform lainnya. Gratis dan cepat!
                </p>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 bg-[#10B981] text-white font-semibold rounded-xl hover:bg-[#059669] px-8 h-12 text-base transition-colors"
                >
                  Mulai Download Gratis
                </Link>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <SitewideFooter />
      </div>
    </>
  );
}

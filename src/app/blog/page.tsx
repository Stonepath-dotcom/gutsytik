import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calendar, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog Mova - Tips & Panduan Download Video Tanpa Watermark",
  description:
    "Temukan panduan lengkap cara download video tanpa watermark dari TikTok, Instagram, YouTube, Facebook, dan Twitter/X. Tips aman dan tutorial terbaru 2025.",
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
    siteName: "Mova",
    type: "website",
  },
};

const articles = [
  {
    slug: "cara-download-reddit-video-dengan-audio",
    title: "Cara Download Video Reddit Dengan Audio - Mudah & Cepat 2025",
    description:
      "Panduan lengkap cara download video Reddit dengan audio. Atasi masalah video Reddit tanpa suara dengan langkah mudah dan gratis.",
    date: "26 Mei 2025",
    readingTime: "9 menit",
    gradient: "from-[#FF4500]/20 via-[#1A1A2E]/30 to-[#FF4500]/10",
    icon: "🔴",
  },
  {
    slug: "perbedaan-download-video-hd-dan-sd",
    title: "Perbedaan Kualitas Video HD vs SD - Mana yang Harus Kamu Download?",
    description:
      "Panduan lengkap perbedaan kualitas video HD dan SD. Pelajari kapan harus pilih HD atau SD saat download video.",
    date: "26 Mei 2025",
    readingTime: "10 menit",
    gradient: "from-[#6366F1]/20 via-[#8B5CF6]/15 to-[#0C0C0E]",
    icon: "📺",
  },
  {
    slug: "download-video-youtube-tanpa-aplikasi",
    title: "Download Video YouTube Tanpa Aplikasi - Langsung dari Browser 2025",
    description:
      "Panduan lengkap cara download video YouTube tanpa install aplikasi. Langsung dari browser, gratis, cepat, dan aman.",
    date: "26 Mei 2025",
    readingTime: "9 menit",
    gradient: "from-[#FF0000]/20 via-[#282828]/30 to-[#F97316]/10",
    icon: "🌐",
  },
  {
    slug: "cara-download-video-dari-story-instagram",
    title: "Cara Download Video dari Story Instagram - Tutorial Lengkap 2025",
    description:
      "Panduan lengkap cara download video dari Story Instagram dengan mudah, gratis, dan cepat. Tanpa aplikasi tambahan.",
    date: "26 Mei 2025",
    readingTime: "9 menit",
    gradient: "from-[#833AB4]/25 via-[#E1306C]/15 to-[#FCAF45]/15",
    icon: "📱",
  },
  {
    slug: "cara-download-video-tiktok-tanpa-watermark",
    title: "Cara Download Video TikTok Tanpa Watermark 2025 - Mudah & Gratis",
    description:
      "Panduan lengkap cara download video TikTok tanpa watermark. Simak langkah-langkah mudah dan tips terbaik untuk menyimpan video TikTok bersih tanpa logo.",
    date: "25 Mei 2025",
    readingTime: "7 menit",
    gradient: "from-[#010101] via-[#25F4EE]/20 to-[#FE2C55]/20",
    icon: "🎵",
  },
  {
    slug: "cara-download-video-instagram-reels",
    title: "Cara Download Video Instagram Reels, Story & IGTV - Terbaru 2025",
    description:
      "Pelajari cara download video Instagram Reels, Story, dan IGTV dengan mudah. Panduan lengkap termasuk tips kualitas dan privasi.",
    date: "24 Mei 2025",
    readingTime: "8 menit",
    gradient: "from-[#833AB4]/30 via-[#FD1D1D]/20 to-[#F77737]/20",
    icon: "📸",
  },
  {
    slug: "cara-download-video-youtube-mp4",
    title: "Cara Download Video YouTube MP4 HD - Gratis & Cepat 2025",
    description:
      "Tutorial download video YouTube dalam format MP4 HD. Pelajari cara memilih kualitas, pertimbangan legal, dan tips download tercepat.",
    date: "23 Mei 2025",
    readingTime: "8 menit",
    gradient: "from-[#FF0000]/20 via-[#282828]/30 to-[#FF0000]/10",
    icon: "▶️",
  },
  {
    slug: "download-video-tanpa-watermark-gratis",
    title: "Download Video Tanpa Watermark Gratis - Semua Platform 2025",
    description:
      "Panduan komprehensif download video tanpa watermark dari semua platform. Perbandingan tools dan mengapa Mova adalah pilihan terbaik.",
    date: "22 Mei 2025",
    readingTime: "9 menit",
    gradient: "from-[#F97316]/20 via-[#7C3AED]/15 to-[#F97316]/10",
    icon: "✨",
  },
  {
    slug: "cara-download-video-facebook-hd",
    title: "Cara Download Video Facebook HD - Mudah & Cepat 2025",
    description:
      "Cara download video Facebook dalam kualitas HD. Panduan lengkap termasuk cara mengatasi video private dan tips kualitas terbaik.",
    date: "21 Mei 2025",
    readingTime: "7 menit",
    gradient: "from-[#1877F2]/20 via-[#1877F2]/10 to-[#0C0C0E]",
    icon: "📘",
  },
  {
    slug: "ekstrak-audio-mp3-dari-video",
    title: "Cara Ekstrak Audio MP3 dari Video Online - Gratis & Cepat 2025",
    description:
      "Pelajari cara mengekstrak audio MP3 dari video online. Cocok untuk podcast, musik, dan konten audio lainnya. Gratis dan cepat!",
    date: "20 Mei 2025",
    readingTime: "7 menit",
    gradient: "from-[#7C3AED]/20 via-[#EC4899]/15 to-[#7C3AED]/10",
    icon: "🎧",
  },
  {
    slug: "download-video-twitter-x-tanpa-watermark",
    title: "Cara Download Video Twitter/X Tanpa Watermark - Gratis 2025",
    description:
      "Panduan download video Twitter/X tanpa watermark. Tips memilih kualitas video dan cara tercepat untuk menyimpan video dari X.",
    date: "19 Mei 2025",
    readingTime: "6 menit",
    gradient: "from-[#14171A] via-[#657786]/20 to-[#1DA1F2]/15",
    icon: "🐦",
  },
  {
    slug: "tips-aman-download-video-online",
    title: "Tips Aman Download Video Online - Hindari Virus & Malware 2025",
    description:
      "Panduan keamanan saat download video online. Pelajari cara menghindari virus, malware, dan situs berbahaya. Mova aman 100%!",
    date: "18 Mei 2025",
    readingTime: "8 menit",
    gradient: "from-[#10B981]/20 via-[#059669]/15 to-[#0C0C0E]",
    icon: "🛡️",
  },
];

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative pt-20 pb-12 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0E27] via-[#111340] to-background" />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 30% 50%, rgba(249,115,22,0.15) 0%, transparent 50%), radial-gradient(circle at 70% 30%, rgba(124,58,237,0.1) 0%, transparent 50%)",
          }}
        />

        <div className="relative mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <span className="text-xs font-semibold text-[#F97316]">
              Blog & Panduan
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground mb-4 leading-tight font-[family-name:var(--font-montserrat)]">
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
        <div className="mx-auto max-w-5xl grid gap-5 sm:grid-cols-2">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/blog/${article.slug}`}
              className="group rounded-2xl overflow-hidden bg-card border border-border hover:border-[#F97316]/30 transition-all duration-200"
            >
              {/* Thumbnail placeholder */}
              <div
                className={`h-40 sm:h-48 bg-gradient-to-br ${article.gradient} flex items-center justify-center relative`}
              >
                <span className="text-5xl opacity-80">{article.icon}</span>
                <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5 text-[#F97316]" />
                    {article.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5 text-[#F97316]" />
                    {article.readingTime}
                  </span>
                </div>

                <h2 className="font-bold text-foreground text-base sm:text-lg mb-2 group-hover:text-[#F97316] transition-colors line-clamp-2 font-[family-name:var(--font-montserrat)]">
                  {article.title}
                </h2>

                <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                  {article.description}
                </p>

                <span className="inline-flex items-center gap-1 text-sm font-medium text-[#F97316] group-hover:gap-2 transition-all">
                  Baca Selengkapnya
                  <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 sm:px-6 pb-16">
        <div className="mx-auto max-w-3xl">
          <div
            className="rounded-2xl p-6 sm:p-8 text-center"
            style={{
              background:
                "linear-gradient(135deg, rgba(249,115,22,0.1) 0%, rgba(124,58,237,0.08) 100%)",
              border: "1px solid rgba(249,115,22,0.2)",
            }}
          >
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2 font-[family-name:var(--font-montserrat)]">
              Langsung Coba Mova Sekarang
            </h2>
            <p className="text-muted-foreground mb-5 text-sm sm:text-base max-w-md mx-auto">
              Download video tanpa watermark dari TikTok, Instagram, YouTube, dan
              platform lainnya. Gratis dan cepat!
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-[#F97316] text-white font-semibold rounded-xl hover:bg-[#EA580C] px-8 h-12 text-base transition-colors"
            >
              Mulai Download Gratis
            </Link>
          </div>
        </div>
      </section>
    </main>

  );
}

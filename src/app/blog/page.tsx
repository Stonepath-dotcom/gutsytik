<<<<<<< HEAD
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
=======
import { Home, BookOpen, ArrowRight, Clock, Calendar, User, Search } from "lucide-react";
import { MovaLogo } from "@/components/mova-logo";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog Mova - Tips & Tutorial Download Video",
  description:
    "Tips dan tutorial download video tanpa watermark dari TikTok, YouTube, Instagram, dan platform lainnya. Pelajari cara download video gratis dan cepat dengan Mova.",
  openGraph: {
    title: "Blog Mova - Tips & Tutorial Download Video",
    description:
      "Tips dan tutorial download video tanpa watermark dari TikTok, YouTube, Instagram, dan platform lainnya.",
>>>>>>> d247eb0a36958c7327f154960a1a760af55329ab
    url: "https://getmova.my.id/blog",
    siteName: "Mova",
    type: "website",
  },
};

<<<<<<< HEAD
const articles = [
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
=======
const blogPosts = [
  {
    title: "Cara Download Video TikTok Tanpa Watermark 2026",
    excerpt:
      "Panduan lengkap cara download video TikTok tanpa watermark menggunakan Mova. Simak langkah-langkah mudah, perbandingan dengan tools lain, tips kualitas video, dan pertimbangan hukum yang perlu kamu ketahui.",
    slug: "/blog/download-tiktok-tanpa-watermark",
    date: "25 Mei 2026",
    readTime: "5 menit",
    tag: "TikTok",
    tagDesc: "Tutorial TikTok",
  },
  {
    title: "Cara Download YouTube ke MP3 Gratis dan Cepat",
    excerpt:
      "Tutorial cara mengunduh video YouTube menjadi file MP3 berkualitas tinggi. Bandingkan kualitas audio 128kbps vs 320kbps, pahami format audio yang berbeda, dan pilih yang terbaik untuk kebutuhanmu.",
    slug: "/blog/download-youtube-mp3",
    date: "20 Mei 2026",
    readTime: "6 menit",
    tag: "YouTube",
    tagDesc: "Tutorial YouTube",
  },
  {
    title: "Download Video Instagram Reels Tanpa Watermark",
    excerpt:
      "Langkah mudah untuk download Instagram Reels tanpa watermark. Dapatkan video Reels berkualitas tinggi langsung dari Instagram dengan Mova — termasuk tips untuk Stories dan IGTV.",
    slug: "/blog/download-instagram-reels",
    date: "15 Mei 2026",
    readTime: "5 menit",
    tag: "Instagram",
    tagDesc: "Tutorial Instagram",
  },
  {
    title: "Cara Download Video Facebook HD Gratis 2026",
    excerpt:
      "Panduan lengkap cara download video Facebook HD gratis. Simpan video Facebook berkualitas tinggi dengan Mova — cepat, gratis, dan aman. Termasuk cara download video private dan Reels.",
    slug: "/blog/download-video-facebook-hd",
    date: "10 Mei 2026",
    readTime: "6 menit",
    tag: "Facebook",
    tagDesc: "Tutorial Facebook",
  },
  {
    title: "Cara Download Video Twitter X (Twitter) Gratis 2026",
    excerpt:
      "Panduan cara download video dari Twitter/X gratis dan cepat. Simpan video tweet favorit kamu tanpa watermark menggunakan Mova. Support video GIF, threaded videos, dan live streams.",
    slug: "/blog/download-video-twitter-x",
    date: "8 Mei 2026",
    readTime: "5 menit",
    tag: "Twitter/X",
    tagDesc: "Tutorial Twitter",
  },
  {
    title: "Cara Download Video Tanpa Aplikasi Tambahan 2026",
    excerpt:
      "Download video langsung dari browser tanpa install aplikasi apapun. Lebih aman, hemat storage, dan bebas malware. Panduan lengkap untuk download video via web browser di HP dan komputer.",
    slug: "/blog/download-video-tanpa-aplikasi",
    date: "5 Mei 2026",
    readTime: "7 menit",
    tag: "Tips",
    tagDesc: "Tips & Trik",
  },
  {
    title: "Perbedaan Download Video MP4 dan Audio MP3 — Mana yang Lebih Baik?",
    excerpt:
      "Perbandingan lengkap antara format video MP4 dan audio MP3. Temukan mana yang lebih cocok untuk kebutuhanmu berdasarkan kualitas, ukuran file, kompatibilitas, dan tujuan penggunaan.",
    slug: "/blog/perbedaan-download-video-dan-audio-mp3",
    date: "3 Mei 2026",
    readTime: "8 menit",
    tag: "Perbandingan",
    tagDesc: "Perbandingan Format",
  },
  {
    title: "Tips Aman Download Video Online Tanpa Virus 2026",
    excerpt:
      "Tips dan panduan lengkap untuk download video online dengan aman tanpa virus, malware, dan ancaman keamanan lainnya. Pelajari cara mengenali situs berbahaya dan melindungi perangkatmu.",
    slug: "/blog/tips-aman-download-video-online",
    date: "1 Mei 2026",
    readTime: "7 menit",
    tag: "Keamanan",
    tagDesc: "Keamanan Online",
  },
];

const tagColors: Record<string, string> = {
  TikTok: "bg-[#010101] text-white",
  YouTube: "bg-[#FF0000] text-white",
  Instagram: "bg-gradient-to-r from-[#833AB4] to-[#FD1D1D] text-white",
  Facebook: "bg-[#1877F2] text-white",
  "Twitter/X": "bg-[#14171A] text-white",
  Tips: "bg-[#2563EB] text-white",
  Perbandingan: "bg-[#6D28D9] text-white",
  Keamanan: "bg-[#16A34A] text-white",
};

export default function BlogPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#09090B] text-[#FAFAFA]">
      {/* Header */}
      <header className="border-b border-[#27272A] bg-[#111113]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <a href="/" className="flex items-center gap-2">
              <MovaLogo size={32} showText />
            </a>
            <a
              href="/"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border border-[#27272A] bg-[#111113] text-[#FAFAFA] hover:bg-[#18181B] transition-colors"
            >
              <Home className="h-4 w-4" />
              Beranda
            </a>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          {/* Title section */}
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium tracking-wider uppercase border border-[#27272A] text-[#A1A1AA] mb-6">
              <BookOpen className="h-3 w-3 text-[#2563EB]" />
              Blog
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#FAFAFA] mb-4 mt-4">
              Tips &{" "}
              <span className="text-[#2563EB]">Tutorial</span> Download Video
            </h1>
            <p className="text-[#A1A1AA] text-sm max-w-xl mx-auto leading-relaxed">
              Panduan lengkap cara download video dari berbagai platform sosial media. Artikel ditulis oleh tim Mova untuk membantu kamu mendapatkan konten dengan aman dan bertanggung jawab.
            </p>
          </div>

          {/* Blog Posts - List Layout (better for reading) */}
          <div className="space-y-4">
            {blogPosts.map((post, i) => (
              <a
                key={i}
                href={post.slug}
                className="group flex flex-col sm:flex-row gap-4 sm:gap-6 p-5 rounded-xl border border-[#27272A] bg-[#111113] hover:border-[#2563EB]/40 transition-all duration-200"
              >
                {/* Left: Number + Tag */}
                <div className="flex sm:flex-col items-start gap-3 sm:gap-2 sm:w-32 shrink-0">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${tagColors[post.tag] || "bg-[#27272A] text-[#FAFAFA]"}`}>
                    {post.tag}
                  </span>
                  <div className="flex items-center gap-3 text-[10px] text-[#A1A1AA]/60 sm:mt-1">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {post.readTime}
                    </span>
                  </div>
                </div>

                {/* Right: Title + Excerpt */}
                <div className="flex-1 min-w-0">
                  <h2 className="text-sm sm:text-base font-bold text-[#FAFAFA] mb-1.5 group-hover:text-[#2563EB] transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-2 mt-3">
                    <div className="w-5 h-5 rounded-full bg-[#2563EB] flex items-center justify-center">
                      <User className="h-3 w-3 text-white" />
                    </div>
                    <span className="text-[10px] text-[#A1A1AA]/60">Tim Mova</span>
                    <span className="text-[10px] text-[#A1A1AA]/40">|</span>
                    <span className="text-[10px] text-[#A1A1AA]/60">{post.tagDesc}</span>
                  </div>
                </div>

                {/* Arrow */}
                <div className="hidden sm:flex items-center">
                  <ArrowRight className="h-4 w-4 text-[#A1A1AA] group-hover:text-[#2563EB] transition-colors" />
                </div>
              </a>
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-12 p-6 sm:p-8 rounded-xl bg-[#111113] border border-[#27272A] text-center">
            <h2 className="text-base sm:text-lg font-bold text-[#FAFAFA] mb-2">Siap Mencoba Mova?</h2>
            <p className="text-xs sm:text-sm text-[#A1A1AA] mb-4">Download video tanpa watermark dari platform favorit kamu sekarang!</p>
            <a
              href="/"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold bg-[#2563EB] text-white hover:bg-[#1D4ED8] transition-colors"
            >
              Coba Mova Sekarang
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          {/* Disclaimer */}
          <div className="mt-8 p-4 rounded-lg bg-[#0C0C0E] border border-[#27272A]/50">
            <p className="text-[10px] text-[#A1A1AA]/50 leading-relaxed text-center">
              Konten blog ini bersifat informatif dan edukatif. Mova tidak mendorong pelanggaran hak cipta. Pastikan kamu menggunakan konten yang diunduh secara bertanggung jawab dan sesuai dengan hukum yang berlaku.{" "}
              <a href="/disclaimer" className="text-[#2563EB]/60 hover:text-[#2563EB] underline">Baca disclaimer</a>
            </p>
          </div>

          {/* Footer notice */}
          <div className="mt-6 pt-6 border-t border-[#27272A] text-center">
            <p className="text-xs text-[#A1A1AA]">
              &copy; 2026 Mova. All rights reserved.
            </p>
          </div>
        </div>
      </main>
    </div>
>>>>>>> d247eb0a36958c7327f154960a1a760af55329ab
  );
}

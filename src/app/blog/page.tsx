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
    url: "https://getmova.my.id/blog",
    siteName: "Mova",
    type: "website",
  },
};

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
  Tips: "bg-[#F97316] text-white",
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
              <BookOpen className="h-3 w-3 text-[#F97316]" />
              Blog
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#FAFAFA] mb-4 mt-4">
              Tips &{" "}
              <span className="text-[#F97316]">Tutorial</span> Download Video
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
                className="group flex flex-col sm:flex-row gap-4 sm:gap-6 p-5 rounded-xl border border-[#27272A] bg-[#111113] hover:border-[#F97316]/40 transition-all duration-200"
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
                  <h2 className="text-sm sm:text-base font-bold text-[#FAFAFA] mb-1.5 group-hover:text-[#F97316] transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-2 mt-3">
                    <div className="w-5 h-5 rounded-full bg-[#F97316] flex items-center justify-center">
                      <User className="h-3 w-3 text-white" />
                    </div>
                    <span className="text-[10px] text-[#A1A1AA]/60">Tim Mova</span>
                    <span className="text-[10px] text-[#A1A1AA]/40">|</span>
                    <span className="text-[10px] text-[#A1A1AA]/60">{post.tagDesc}</span>
                  </div>
                </div>

                {/* Arrow */}
                <div className="hidden sm:flex items-center">
                  <ArrowRight className="h-4 w-4 text-[#A1A1AA] group-hover:text-[#F97316] transition-colors" />
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
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold bg-[#F97316] text-white hover:bg-[#EA580C] transition-colors"
            >
              Coba Mova Sekarang
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          {/* Disclaimer */}
          <div className="mt-8 p-4 rounded-lg bg-[#0C0C0E] border border-[#27272A]/50">
            <p className="text-[10px] text-[#A1A1AA]/50 leading-relaxed text-center">
              Konten blog ini bersifat informatif dan edukatif. Mova tidak mendorong pelanggaran hak cipta. Pastikan kamu menggunakan konten yang diunduh secara bertanggung jawab dan sesuai dengan hukum yang berlaku.{" "}
              <a href="/disclaimer" className="text-[#F97316]/60 hover:text-[#F97316] underline">Baca disclaimer</a>
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
  );
}

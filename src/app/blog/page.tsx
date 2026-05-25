import { Home, BookOpen, ArrowRight, Clock, Calendar } from "lucide-react";
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
      "Panduan lengkap cara download video TikTok tanpa watermark menggunakan Mova. Simak langkah-langkah mudah dan tips memilih kualitas video terbaik.",
    slug: "/blog/download-tiktok-tanpa-watermark",
    date: "25 Mei 2026",
    readTime: "5 menit",
    tag: "TikTok",
  },
  {
    title: "Cara Download YouTube ke MP3 Gratis dan Cepat",
    excerpt:
      "Tutorial cara mengunduh video YouTube menjadi file MP3 berkualitas tinggi. Bandingkan kualitas audio 128kbps vs 320kbps dan pilih yang terbaik.",
    slug: "/blog/download-youtube-mp3",
    date: "20 Mei 2026",
    readTime: "6 menit",
    tag: "YouTube",
  },
  {
    title: "Download Video Instagram Reels Tanpa Watermark",
    excerpt:
      "Langkah mudah untuk download Instagram Reels tanpa watermark. Dapatkan video Reels berkualitas tinggi langsung dari Instagram.",
    slug: "/blog/download-instagram-reels",
    date: "15 Mei 2026",
    readTime: "5 menit",
    tag: "Instagram",
  },
];

const tagColors: Record<string, string> = {
  TikTok: "bg-[#010101] text-white",
  YouTube: "bg-[#FF0000] text-white",
  Instagram: "bg-gradient-to-r from-[#833AB4] to-[#FD1D1D] text-white",
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
              Kembali ke Beranda
            </a>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          {/* Title section */}
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium tracking-wider uppercase border border-[#27272A] text-[#A1A1AA] mb-6">
              <BookOpen className="h-3 w-3 text-[#F97316]" />
              Blog
            </span>
            <h1 className="text-4xl sm:text-5xl font-light tracking-tight text-[#FAFAFA] mb-4 mt-4">
              Tips &{" "}
              <span className="font-bold text-[#F97316]">Tutorial</span>
            </h1>
            <p className="text-[#A1A1AA] text-sm max-w-xl mx-auto leading-relaxed">
              Pelajari cara download video tanpa watermark dari berbagai platform dengan panduan lengkap dari Mova.
            </p>
          </div>

          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post, i) => (
              <a
                key={i}
                href={post.slug}
                className="group rounded-xl border border-[#27272A] bg-[#111113] overflow-hidden hover:border-[#F97316]/50 transition-all duration-300 hover:-translate-y-1"
              >
                {/* Card header with gradient */}
                <div className="h-32 flex items-end p-4" style={{ background: "linear-gradient(135deg, #F97316 0%, #EA580C 100%)" }}>
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${tagColors[post.tag] || "bg-[#27272A] text-[#FAFAFA]"}`}>
                    {post.tag}
                  </span>
                </div>
                {/* Card content */}
                <div className="p-5">
                  <h2 className="text-sm font-bold text-[#FAFAFA] mb-2 line-clamp-2 group-hover:text-[#F97316] transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-xs text-[#A1A1AA] leading-relaxed mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-[10px] text-[#A1A1AA]/60">
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
              </a>
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-16 p-8 rounded-xl bg-[#111113] border border-[#27272A] text-center">
            <h2 className="text-lg font-bold text-[#FAFAFA] mb-2">Siap Mencoba Mova?</h2>
            <p className="text-sm text-[#A1A1AA] mb-4">Download video tanpa watermark dari platform favorit kamu sekarang!</p>
            <a
              href="/"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold bg-[#F97316] text-white hover:bg-[#EA580C] transition-colors"
            >
              Coba Mova Sekarang
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          {/* Footer notice */}
          <div className="mt-8 pt-6 border-t border-[#27272A] text-center">
            <p className="text-xs text-[#A1A1AA]">
              &copy; 2026 Mova. All rights reserved.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

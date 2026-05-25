import { Home, ArrowRight, Zap, Shield, Smartphone, Globe, CheckCircle, ChevronRight } from "lucide-react";
import { MovaLogo } from "@/components/mova-logo";
import { DownloadForm } from "@/components/download-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Download Video Instagram Reels Tanpa Watermark - Mova",
  description: "Download video Instagram Reels, Stories, dan IGTV tanpa watermark. Simpan konten Instagram favorit kamu dengan cepat dan gratis.",
  keywords: [
    "instagram downloader",
    "download instagram reels",
    "download instagram story",
    "instagram video downloader",
    "download video instagram",
    "instagram saver",
    "save instagram reels",
  ],
  openGraph: {
    title: "Download Video Instagram Reels Tanpa Watermark - Mova",
    description: "Download video Instagram Reels, Stories, dan IGTV tanpa watermark. Simpan konten Instagram favorit kamu dengan cepat dan gratis.",
    url: "https://getmova.my.id/instagram-downloader",
    siteName: "Mova",
    type: "website",
  },
  alternates: {
    canonical: "https://getmova.my.id/instagram-downloader",
  },
};

const faqItems = [
  {
    q: "Apakah bisa download Instagram Reels tanpa watermark?",
    a: "Ya! Mova bisa mengunduh video Instagram Reels tanpa watermark. Video yang kamu download akan bersih dan berkualitas tinggi, sama seperti video aslinya.",
  },
  {
    q: "Bisakah download Instagram Stories yang sudah expired?",
    a: "Sayangnya tidak. Stories yang sudah expired (lebih dari 24 jam) dan tidak disimpan sebagai Highlight tidak bisa diunduh karena sudah tidak tersedia di server Instagram.",
  },
  {
    q: "Apakah perlu login Instagram untuk download?",
    a: "Tidak perlu! Mova bisa mengunduh video dari akun Instagram publik tanpa perlu login. Cukup salin link video dan tempel di Mova.",
  },
  {
    q: "Format video apa yang didukung dari Instagram?",
    a: "Mova mendukung download berbagai konten Instagram termasuk Reels (video pendek), video post biasa, IGTV, dan Stories. Hasil download dalam format MP4 berkualitas tinggi.",
  },
  {
    q: "Apakah kreator Instagram akan tahu kalau videonya di-download?",
    a: "Tidak. Mova tidak mengirimkan notifikasi apapun ke kreator Instagram. Proses download bersifat anonim dan privat.",
  },
];

export default function InstagramDownloaderPage() {
  const jsonLdWebApp = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Mova Instagram Downloader",
    description: "Download video Instagram Reels, Stories, dan IGTV tanpa watermark",
    url: "https://getmova.my.id/instagram-downloader",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "All",
    offers: { "@type": "Offer", price: "0", priceCurrency: "IDR" },
  };

  const jsonLdHowTo = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "Cara Download Video Instagram Reels Tanpa Watermark",
    description: "Panduan langkah demi langkah untuk download video Instagram menggunakan Mova",
    step: [
      { "@type": "HowToStep", position: 1, name: "Salin Link Instagram", text: "Buka Instagram, temukan Reels atau video yang ingin didownload, ketuk tiga titik dan pilih Salin Tautan." },
      { "@type": "HowToStep", position: 2, name: "Tempel Link di Mova", text: "Buka getmova.my.id/instagram-downloader, tempel link Instagram di kolom input, lalu klik Download." },
      { "@type": "HowToStep", position: 3, name: "Download Video", text: "Setelah video ditemukan, pilih kualitas yang diinginkan dan klik download. Video akan tersimpan di perangkat kamu." },
    ],
  };

  const jsonLdFaq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  const jsonLdBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://getmova.my.id" },
      { "@type": "ListItem", position: 2, name: "Instagram Downloader", item: "https://getmova.my.id/instagram-downloader" },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#09090B] text-[#FAFAFA]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebApp) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdHowTo) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }} />

      {/* Header */}
      <header className="border-b border-[#27272A] bg-[#111113]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <a href="/" className="flex items-center gap-2">
              <MovaLogo size={32} showText />
            </a>
            <a href="/" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border border-[#27272A] bg-[#111113] text-[#FAFAFA] hover:bg-[#18181B] transition-colors">
              <Home className="h-4 w-4" />
              Kembali ke Beranda
            </a>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-6">
          <nav className="flex items-center gap-2 text-xs text-[#A1A1AA]" aria-label="Breadcrumb">
            <a href="/" className="hover:text-[#F97316] transition-colors">Home</a>
            <ChevronRight className="h-3 w-3" />
            <span className="text-[#FAFAFA]">Instagram Downloader</span>
          </nav>
        </div>

        {/* Hero */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F97316]/10 border border-[#F97316]/20 mb-4">
              <Zap className="h-3.5 w-3.5 text-[#F97316]" />
              <span className="text-xs font-semibold text-[#F97316]">Reels • Stories • IGTV</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold mb-3 leading-tight">
              Download Video Instagram{" "}
              <span className="text-[#F97316]">Tanpa Watermark</span>
            </h1>
            <p className="text-sm sm:text-base text-[#A1A1AA] mb-8 max-w-2xl mx-auto">
              Simpan video Instagram Reels, Stories, dan IGTV favorit kamu tanpa watermark. Cepat, gratis, dan mudah digunakan!
            </p>
            <DownloadForm placeholder="Tempel link Instagram Reels/Story/IGTV di sini..." mode="video" />
          </div>
        </section>

        {/* Supported Content Types */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-muted/30">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-xl sm:text-2xl font-bold text-center mb-2">Konten Instagram yang Bisa Didownload</h2>
            <p className="text-sm text-[#A1A1AA] text-center mb-8">Mova mendukung berbagai jenis konten video dari Instagram</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
              {[
                { title: "Instagram Reels", desc: "Download video pendek Reels tanpa watermark. Reels adalah konten paling populer di Instagram saat ini, dan Mova bisa mengunduhnya dengan kualitas terbaik.", color: "#E1306C" },
                { title: "Instagram Stories", desc: "Simpan video Stories sebelum expired. Stories yang berisi video bisa diunduh dengan mudah, selama akun bersifat publik dan Story masih tersedia.", color: "#F77737" },
                { title: "Instagram IGTV", desc: "Download video panjang dari IGTV. Konten video yang lebih panjang dari 60 detik yang diunggah ke IGTV juga bisa diunduh melalui Mova.", color: "#833AB4" },
                { title: "Video Post", desc: "Unduh video dari post reguler Instagram. Video yang diunggah sebagai post biasa di feed Instagram juga bisa didownload dengan Mova.", color: "#FD1D1D" },
              ].map((item, i) => (
                <div key={i} className="p-4 rounded-xl bg-card border border-[#27272A] hover:border-[#F97316]/30 transition-all">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-3" style={{ background: item.color }}>
                    <CheckCircle className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-sm font-semibold text-[#FAFAFA] mb-1">{item.title}</h3>
                  <p className="text-xs text-[#A1A1AA] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Mova */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-xl sm:text-2xl font-bold text-center mb-2">Kenapa Pakai Mova untuk Download Instagram?</h2>
            <p className="text-sm text-[#A1A1AA] text-center mb-8">Keunggulan Mova dibandingkan tools lainnya</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { icon: Zap, title: "Proses Kilat", desc: "Download video Instagram dalam hitungan detik. Tidak perlu menunggu lama, langsung tempel link dan download." },
                { icon: Shield, title: "Aman & Privat", desc: "Tidak ada data yang disimpan. Proses download anonim dan tidak ada notifikasi ke pemilik akun." },
                { icon: Smartphone, title: "Semua Perangkat", desc: "Bisa digunakan di HP Android, iPhone, tablet, dan laptop. Tidak perlu install aplikasi." },
                { icon: Globe, title: "Akun Publik", desc: "Mendukung semua akun Instagram publik. Tidak perlu login atau mengirimkan data akun kamu." },
                { icon: CheckCircle, title: "Kualitas Terbaik", desc: "Video diunduh dalam kualitas tertinggi yang tersedia. Hasil download sama kualitasnya dengan video asli." },
                { icon: Zap, title: "Gratis Tanpa Batas", desc: "100% gratis tanpa biaya tersembunyi. Download sepuasnya kapan saja dan di mana saja." },
              ].map((item, i) => (
                <div key={i} className="p-4 rounded-xl bg-card border border-[#27272A] hover:border-[#F97316]/30 transition-all">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-[#F97316]/10 mb-3">
                    <item.icon className="h-5 w-5 text-[#F97316]" />
                  </div>
                  <h3 className="text-sm font-semibold text-[#FAFAFA] mb-1">{item.title}</h3>
                  <p className="text-xs text-[#A1A1AA] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Step by Step */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-muted/30">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-xl sm:text-2xl font-bold text-center mb-2">Cara Download Video Instagram dengan Mova</h2>
            <p className="text-sm text-[#A1A1AA] text-center mb-8">Tiga langkah sederhana untuk menyimpan konten Instagram</p>
            <div className="space-y-4 max-w-2xl mx-auto">
              {[
                { step: 1, title: "Salin Link dari Instagram", desc: "Buka aplikasi Instagram, temukan Reels, Story, atau video yang ingin kamu download. Ketuk ikon tiga titik di pojok kanan bawah, lalu pilih \"Salin Tautan\" atau \"Copy Link\"." },
                { step: 2, title: "Tempel Link di Mova", desc: "Buka website Mova di getmova.my.id/instagram-downloader, tempel link Instagram yang sudah disalin ke kolom input. Klik tombol \"Tempel\" untuk mempercepat." },
                { step: 3, title: "Download dan Simpan", desc: "Klik tombol Download, dan Mova akan memproses video Instagram secara otomatis. Pilih kualitas yang diinginkan dan video akan tersimpan di perangkat kamu." },
              ].map((item) => (
                <div key={item.step} className="flex gap-4 p-4 rounded-lg border border-[#27272A] bg-[#111113]">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[#F97316] text-white text-sm font-bold shrink-0">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-[#FAFAFA] mb-1">{item.title}</h3>
                    <p className="text-xs text-[#A1A1AA] leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-xl sm:text-2xl font-bold text-center mb-2">Pertanyaan Umum tentang Download Instagram</h2>
            <p className="text-sm text-[#A1A1AA] text-center mb-8">Jawaban untuk pertanyaan yang sering diajukan</p>
            <div className="space-y-3 max-w-2xl mx-auto">
              {faqItems.map((item, i) => (
                <div key={i} className="p-4 rounded-lg border border-[#27272A] bg-[#111113]">
                  <h3 className="text-sm font-semibold text-[#FAFAFA] mb-2">{item.q}</h3>
                  <p className="text-xs text-[#A1A1AA] leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-muted/30">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-xl sm:text-2xl font-bold mb-2">Siap Download Video Instagram?</h2>
            <p className="text-sm text-[#A1A1AA] mb-6">Simpan Reels, Stories, dan video Instagram favorit kamu sekarang!</p>
            <a href="/instagram-downloader" className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold bg-[#F97316] text-white hover:bg-[#EA580C] transition-colors">
              Coba Mova Sekarang
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </section>

        {/* Other Platforms */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-lg font-bold text-center mb-6">Download dari Platform Lain</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                { name: "TikTok", href: "/tiktok-downloader" },
                { name: "YouTube", href: "/youtube-downloader" },
                { name: "Facebook", href: "/facebook-downloader" },
                { name: "Twitter/X", href: "/twitter-downloader" },
              ].map((p) => (
                <a key={p.name} href={p.href} className="px-4 py-2 rounded-lg border border-[#27272A] bg-[#111113] text-sm text-[#A1A1AA] hover:text-[#F97316] hover:border-[#F97316]/30 transition-colors">
                  {p.name} Downloader
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#27272A] bg-[#111113]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-6 text-center">
          <p className="text-xs text-[#A1A1AA]">&copy; 2026 Mova. All rights reserved.</p>
          <div className="flex justify-center gap-4 mt-2">
            <a href="/blog" className="text-xs text-[#A1A1AA] hover:text-[#F97316] transition-colors">Blog</a>
            <a href="/about" className="text-xs text-[#A1A1AA] hover:text-[#F97316] transition-colors">Tentang</a>
            <a href="/privacy" className="text-xs text-[#A1A1AA] hover:text-[#F97316] transition-colors">Privasi</a>
            <a href="/terms" className="text-xs text-[#A1A1AA] hover:text-[#F97316] transition-colors">Ketentuan</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

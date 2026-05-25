import { Home, ArrowRight, Zap, Shield, Smartphone, Globe, CheckCircle, ChevronRight } from "lucide-react";
import { MovaLogo } from "@/components/mova-logo";
import { DownloadForm } from "@/components/download-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Download Video Twitter X Gratis - Mova Twitter Downloader",
  description: "Download video dari Twitter/X (sebelumnya Twitter) gratis dan cepat. Simpan video tweet favorit kamu tanpa watermark.",
  keywords: [
    "twitter video downloader",
    "download video twitter",
    "twitter x downloader",
    "download video x",
    "save twitter video",
    "twitter gif downloader",
    "tweet video downloader",
  ],
  openGraph: {
    title: "Download Video Twitter X Gratis - Mova Twitter Downloader",
    description: "Download video dari Twitter/X (sebelumnya Twitter) gratis dan cepat. Simpan video tweet favorit kamu tanpa watermark.",
    url: "https://getmova.my.id/twitter-downloader",
    siteName: "Mova",
    type: "website",
  },
  alternates: {
    canonical: "https://getmova.my.id/twitter-downloader",
  },
};

const faqItems = [
  {
    q: "Apakah bisa download video dari Twitter/X?",
    a: "Ya! Mova mendukung download video dari Twitter/X (sebelumnya Twitter). Cukup salin link tweet yang berisi video, tempel di Mova, dan download. Prosesnya cepat dan gratis.",
  },
  {
    q: "Bagaimana cara mendapatkan link tweet yang berisi video?",
    a: "Buka Twitter/X, temukan tweet yang berisi video, klik ikon \"Bagikan\" (panah kiri), lalu pilih \"Salin tautan\" atau \"Copy link\". Link tersebut yang kamu tempel di Mova.",
  },
  {
    q: "Apakah bisa download video dari akun privat Twitter/X?",
    a: "Tidak. Mova hanya bisa mengunduh video dari tweet yang bersifat publik. Tweet dari akun privat tidak bisa diakses oleh pihak ketiga termasuk Mova.",
  },
  {
    q: "Bisakah download GIF dari Twitter/X?",
    a: "GIF di Twitter sebenarnya disimpan sebagai video MP4. Mova bisa mengunduhnya dalam format MP4, yang kemudian bisa kamu konversi ke GIF jika diperlukan menggunakan tools online gratis.",
  },
  {
    q: "Kualitas video Twitter/X apa yang bisa didownload?",
    a: "Twitter/X biasanya menyediakan video dalam beberapa kualitas. Mova akan mendownload video dalam kualitas tertinggi yang tersedia dari tweet tersebut.",
  },
];

export default function TwitterDownloaderPage() {
  const jsonLdWebApp = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Mova Twitter Downloader",
    description: "Download video dari Twitter/X gratis dan cepat",
    url: "https://getmova.my.id/twitter-downloader",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "All",
    offers: { "@type": "Offer", price: "0", priceCurrency: "IDR" },
  };

  const jsonLdHowTo = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "Cara Download Video Twitter/X",
    description: "Panduan langkah demi langkah untuk download video dari Twitter/X menggunakan Mova",
    step: [
      { "@type": "HowToStep", position: 1, name: "Salin Link Tweet", text: "Buka Twitter/X, temukan tweet yang berisi video, klik Bagikan lalu pilih Salin Tautan." },
      { "@type": "HowToStep", position: 2, name: "Tempel Link di Mova", text: "Buka getmova.my.id/twitter-downloader, tempel link tweet di kolom input, lalu klik Download." },
      { "@type": "HowToStep", position: 3, name: "Download Video", text: "Setelah video ditemukan, klik download dan video Twitter/X akan tersimpan di perangkat kamu." },
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
      { "@type": "ListItem", position: 2, name: "Twitter Downloader", item: "https://getmova.my.id/twitter-downloader" },
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
            <a href="/" className="hover:text-[#2563EB] transition-colors">Home</a>
            <ChevronRight className="h-3 w-3" />
            <span className="text-[#FAFAFA]">Twitter/X Downloader</span>
          </nav>
        </div>

        {/* Hero */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2563EB]/10 border border-[#2563EB]/20 mb-4">
              <Zap className="h-3.5 w-3.5 text-[#2563EB]" />
              <span className="text-xs font-semibold text-[#2563EB]">Twitter &amp; X Support</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold mb-3 leading-tight">
              Download Video Twitter/X{" "}
              <span className="text-[#2563EB]">Gratis</span>
            </h1>
            <p className="text-sm sm:text-base text-[#A1A1AA] mb-8 max-w-2xl mx-auto">
              Simpan video tweet favorit kamu dari Twitter/X (sebelumnya Twitter) tanpa watermark. Cepat, gratis, dan tanpa batas download!
            </p>
            <DownloadForm placeholder="Tempel link tweet Twitter/X di sini..." mode="video" />
          </div>
        </section>

        {/* Twitter/X Specific Info */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-muted/30">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-xl sm:text-2xl font-bold text-center mb-2">Konten Twitter/X yang Bisa Didownload</h2>
            <p className="text-sm text-[#A1A1AA] text-center mb-8">Mova mendukung berbagai jenis konten video dari Twitter/X</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
              {[
                { title: "Video Tweet", desc: "Video yang diunggah langsung di tweet. Ini adalah jenis konten video paling umum di Twitter/X. Semua video dari tweet publik bisa didownload.", color: "#14171A" },
                { title: "Video dari Thread", desc: "Video yang ada di dalam thread tweet. Mova bisa mendownload video dari tweet manapun dalam thread, selama tweet bersifat publik.", color: "#1DA1F2" },
                { title: "GIF sebagai Video", desc: "GIF di Twitter sebenarnya disimpan sebagai video MP4. Mova bisa mengunduhnya dalam format MP4 yang bisa kamu konversi ke GIF nanti.", color: "#657786" },
                { title: "Video Quote Tweet", desc: "Video yang ada di dalam quote tweet juga bisa diunduh. Cukup salin link quote tweet dan tempel di Mova.", color: "#0D8ECF" },
              ].map((item, i) => (
                <div key={i} className="p-4 rounded-xl bg-card border border-[#27272A] hover:border-[#2563EB]/30 transition-all">
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
            <h2 className="text-xl sm:text-2xl font-bold text-center mb-2">Kenapa Pakai Mova untuk Download Twitter/X?</h2>
            <p className="text-sm text-[#A1A1AA] text-center mb-8">Cara terbaik menyimpan video dari Twitter/X</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { icon: Zap, title: "Super Cepat", desc: "Download video Twitter/X dalam hitungan detik. Proses langsung selesai tanpa antrean atau waktu tunggu." },
                { icon: Shield, title: "Tanpa Watermark", desc: "Video diunduh langsung dari server Twitter/X dalam kualitas asli tanpa tambahan watermark atau logo." },
                { icon: Smartphone, title: "Semua Perangkat", desc: "Bisa diakses dari HP, tablet, dan laptop. Tidak perlu install aplikasi atau extension apapun." },
                { icon: Globe, title: "X.com Support", desc: "Mendukung domain baru X.com maupun twitter.com. Keduanya bisa diproses oleh Mova." },
                { icon: CheckCircle, title: "Gratis Selamanya", desc: "100% gratis tanpa biaya tersembunyi. Download video Twitter/X sepuasnya kapan saja." },
                { icon: Zap, title: "Privasi Terjaga", desc: "Tidak ada data yang disimpan. Proses download anonim dan tidak ada notifikasi ke pemilik tweet." },
              ].map((item, i) => (
                <div key={i} className="p-4 rounded-xl bg-card border border-[#27272A] hover:border-[#2563EB]/30 transition-all">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-[#2563EB]/10 mb-3">
                    <item.icon className="h-5 w-5 text-[#2563EB]" />
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
            <h2 className="text-xl sm:text-2xl font-bold text-center mb-2">Cara Download Video Twitter/X dengan Mova</h2>
            <p className="text-sm text-[#A1A1AA] text-center mb-8">Tiga langkah sederhana untuk menyimpan video dari Twitter/X</p>
            <div className="space-y-4 max-w-2xl mx-auto">
              {[
                { step: 1, title: "Salin Link Tweet yang Berisi Video", desc: "Buka aplikasi Twitter/X atau website, temukan tweet yang berisi video yang ingin kamu download. Klik ikon \"Bagikan\" (panah kiri) dan pilih \"Salin tautan\" atau \"Copy link\"." },
                { step: 2, title: "Tempel Link di Mova", desc: "Buka website Mova di getmova.my.id/twitter-downloader, tempel link tweet yang sudah kamu salin ke kolom input. Klik tombol \"Tempel\" untuk mempercepat proses." },
                { step: 3, title: "Download Video", desc: "Klik tombol Download dan Mova akan memproses video dari tweet tersebut. Setelah selesai, video akan otomatis tersimpan di perangkat kamu dalam format MP4." },
              ].map((item) => (
                <div key={item.step} className="flex gap-4 p-4 rounded-lg border border-[#27272A] bg-[#111113]">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[#2563EB] text-white text-sm font-bold shrink-0">
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
            <h2 className="text-xl sm:text-2xl font-bold text-center mb-2">Pertanyaan Umum tentang Download Twitter/X</h2>
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
            <h2 className="text-xl sm:text-2xl font-bold mb-2">Siap Download Video Twitter/X?</h2>
            <p className="text-sm text-[#A1A1AA] mb-6">Simpan video tweet favorit kamu sekarang dengan Mova!</p>
            <a href="/twitter-downloader" className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold bg-[#2563EB] text-white hover:bg-[#1D4ED8] transition-colors">
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
                { name: "Instagram", href: "/instagram-downloader" },
                { name: "Facebook", href: "/facebook-downloader" },
              ].map((p) => (
                <a key={p.name} href={p.href} className="px-4 py-2 rounded-lg border border-[#27272A] bg-[#111113] text-sm text-[#A1A1AA] hover:text-[#2563EB] hover:border-[#2563EB]/30 transition-colors">
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
            <a href="/blog" className="text-xs text-[#A1A1AA] hover:text-[#2563EB] transition-colors">Blog</a>
            <a href="/about" className="text-xs text-[#A1A1AA] hover:text-[#2563EB] transition-colors">Tentang</a>
            <a href="/privacy" className="text-xs text-[#A1A1AA] hover:text-[#2563EB] transition-colors">Privasi</a>
            <a href="/terms" className="text-xs text-[#A1A1AA] hover:text-[#2563EB] transition-colors">Ketentuan</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

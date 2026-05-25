import { Home, ArrowRight, Zap, Shield, Smartphone, Globe, CheckCircle, ChevronRight } from "lucide-react";
import { MovaLogo } from "@/components/mova-logo";
import { DownloadForm } from "@/components/download-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Download Video Facebook Gratis & Cepat - Mova Facebook Downloader",
  description: "Download video Facebook HD gratis tanpa batas. Simpan video Facebook berkualitas tinggi dengan Mova.",
  keywords: [
    "facebook video downloader",
    "download video facebook",
    "facebook downloader",
    "download facebook hd",
    "facebook reel downloader",
    "download video fb",
    "save facebook video",
  ],
  openGraph: {
    title: "Download Video Facebook Gratis & Cepat - Mova Facebook Downloader",
    description: "Download video Facebook HD gratis tanpa batas. Simpan video Facebook berkualitas tinggi dengan Mova.",
    url: "https://getmova.my.id/facebook-downloader",
    siteName: "Mova",
    type: "website",
  },
  alternates: {
    canonical: "https://getmova.my.id/facebook-downloader",
  },
};

const faqItems = [
  {
    q: "Apakah bisa download video Facebook dalam kualitas HD?",
    a: "Ya! Mova mendukung download video Facebook dalam kualitas HD (720p) dan SD (360p), tergantung kualitas video asli yang diunggah. Jika video tersedia dalam HD, Mova akan otomatis menyediakan opsi HD.",
  },
  {
    q: "Bisakah download video Facebook dari akun privat?",
    a: "Tidak. Mova hanya bisa mengunduh video dari akun Facebook yang bersifat publik. Video dari akun privat tidak bisa diakses karena dibatasi oleh pengaturan privasi Facebook.",
  },
  {
    q: "Format video apa yang dihasilkan dari download Facebook?",
    a: "Video Facebook yang didownload menggunakan Mova akan tersimpan dalam format MP4, yang kompatibel dengan hampir semua perangkat dan pemutar video.",
  },
  {
    q: "Apakah bisa download Facebook Reels dan Stories?",
    a: "Ya, Mova mendukung download Facebook Reels. Untuk Facebook Stories, kamu bisa mencobanya dengan menyalin link Story dan menempelkannya di Mova, selama Story masih tersedia dan akun bersifat publik.",
  },
  {
    q: "Apakah Mova gratis untuk download video Facebook?",
    a: "Ya, Mova 100% gratis tanpa batas. Kamu bisa download video Facebook sebanyak yang kamu mau tanpa perlu membayar atau mendaftar akun.",
  },
];

export default function FacebookDownloaderPage() {
  const jsonLdWebApp = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Mova Facebook Downloader",
    description: "Download video Facebook HD gratis dan cepat",
    url: "https://getmova.my.id/facebook-downloader",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "All",
    offers: { "@type": "Offer", price: "0", priceCurrency: "IDR" },
  };

  const jsonLdHowTo = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "Cara Download Video Facebook HD",
    description: "Panduan langkah demi langkah untuk download video Facebook menggunakan Mova",
    step: [
      { "@type": "HowToStep", position: 1, name: "Salin Link Video Facebook", text: "Buka Facebook, temukan video yang ingin didownload, klik kanan pada video atau gunakan tombol Bagikan untuk menyalin link." },
      { "@type": "HowToStep", position: 2, name: "Tempel Link di Mova", text: "Buka getmova.my.id/facebook-downloader, tempel link video Facebook di kolom input, lalu klik Download." },
      { "@type": "HowToStep", position: 3, name: "Pilih Kualitas dan Download", text: "Pilih kualitas video (HD atau SD), lalu klik download. Video akan tersimpan di perangkat kamu." },
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
      { "@type": "ListItem", position: 2, name: "Facebook Downloader", item: "https://getmova.my.id/facebook-downloader" },
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
            <span className="text-[#FAFAFA]">Facebook Downloader</span>
          </nav>
        </div>

        {/* Hero */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F97316]/10 border border-[#F97316]/20 mb-4">
              <Zap className="h-3.5 w-3.5 text-[#F97316]" />
              <span className="text-xs font-semibold text-[#F97316]">HD Quality • Gratis</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold mb-3 leading-tight">
              Download Video Facebook{" "}
              <span className="text-[#F97316]">Gratis &amp; Cepat</span>
            </h1>
            <p className="text-sm sm:text-base text-[#A1A1AA] mb-8 max-w-2xl mx-auto">
              Simpan video Facebook berkualitas HD tanpa batas. Download dari Reels, Stories, Watch, dan post video — semua gratis!
            </p>
            <DownloadForm placeholder="Tempel link video Facebook di sini..." mode="video" />
          </div>
        </section>

        {/* Facebook Content Types */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-muted/30">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-xl sm:text-2xl font-bold text-center mb-2">Jenis Video Facebook yang Bisa Didownload</h2>
            <p className="text-sm text-[#A1A1AA] text-center mb-8">Mova mendukung berbagai jenis konten video dari Facebook</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
              {[
                { title: "Facebook Reels", desc: "Video pendek yang mirip TikTok di Facebook. Reels sangat populer dan bisa kamu download dengan Mova dalam kualitas tinggi.", color: "#1877F2" },
                { title: "Facebook Stories", desc: "Video yang tayang selama 24 jam di Facebook. Download sebelum expired untuk menyimpan momen penting dari teman atau akun favorit.", color: "#2D88FF" },
                { title: "Facebook Watch", desc: "Video panjang dari Facebook Watch, termasuk konten dari kreator dan publisher. Semua video publik dari Watch bisa diunduh.", color: "#0B5FCC" },
                { title: "Video Post Biasa", desc: "Video yang diunggah langsung di timeline atau halaman Facebook. Post video dari akun publik bisa didownload dengan mudah.", color: "#1A6DE3" },
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
            <h2 className="text-xl sm:text-2xl font-bold text-center mb-2">Kenapa Pakai Mova untuk Download Facebook?</h2>
            <p className="text-sm text-[#A1A1AA] text-center mb-8">Keunggulan Mova sebagai Facebook video downloader</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { icon: Zap, title: "Download Cepat", desc: "Proses download video Facebook sangat cepat. Tidak perlu menunggu lama, cukup tempel link dan langsung download." },
                { icon: Shield, title: "Aman dan Privat", desc: "Mova tidak menyimpan data pribadi kamu. Semua proses download bersifat anonim dan tidak ada tracking." },
                { icon: Smartphone, title: "Tanpa Install", desc: "Gunakan langsung di browser tanpa perlu install aplikasi apapun. Kompatibel dengan semua perangkat." },
                { icon: Globe, title: "Semua Negara", desc: "Mendukung video Facebook dari semua region dan negara. Tidak ada batasan wilayah." },
                { icon: CheckCircle, title: "Kualitas HD", desc: "Download video Facebook dalam kualitas tertinggi yang tersedia. Pilih antara HD (720p) atau SD (360p)." },
                { icon: Zap, title: "Gratis Selamanya", desc: "100% gratis tanpa biaya tersembunyi. Tidak ada batasan jumlah download per hari." },
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
            <h2 className="text-xl sm:text-2xl font-bold text-center mb-2">Cara Download Video Facebook dengan Mova</h2>
            <p className="text-sm text-[#A1A1AA] text-center mb-8">Langkah mudah untuk menyimpan video Facebook ke perangkat kamu</p>
            <div className="space-y-4 max-w-2xl mx-auto">
              {[
                { step: 1, title: "Salin Link Video Facebook", desc: "Buka Facebook di browser atau aplikasi, temukan video yang ingin kamu download. Klik kanan pada video dan pilih \"Copy link address\", atau gunakan tombol Bagikan lalu pilih \"Salin Tautan\"." },
                { step: 2, title: "Tempel Link di Mova", desc: "Buka website Mova di getmova.my.id/facebook-downloader, tempel link video Facebook ke kolom input yang tersedia. Klik tombol \"Tempel\" untuk langsung menempelkan dari clipboard." },
                { step: 3, title: "Pilih Kualitas dan Download", desc: "Setelah video ditemukan, pilih kualitas yang diinginkan (HD atau SD) lalu klik download. Video Facebook akan langsung tersimpan di perangkat kamu dalam format MP4." },
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
            <h2 className="text-xl sm:text-2xl font-bold text-center mb-2">Pertanyaan Umum tentang Download Facebook</h2>
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
            <h2 className="text-xl sm:text-2xl font-bold mb-2">Siap Download Video Facebook HD?</h2>
            <p className="text-sm text-[#A1A1AA] mb-6">Simpan video Facebook favorit kamu dengan kualitas terbaik!</p>
            <a href="/facebook-downloader" className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold bg-[#F97316] text-white hover:bg-[#EA580C] transition-colors">
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

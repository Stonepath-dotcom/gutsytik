import { Home, ArrowRight, Zap, Shield, Smartphone, Globe, CheckCircle, Music, Film, ChevronRight } from "lucide-react";
import { MovaLogo } from "@/components/mova-logo";
import { DownloadForm } from "@/components/download-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Download Video YouTube ke MP3 MP4 Gratis - Mova YouTube Downloader",
  description: "Download video YouTube ke MP3 atau MP4 gratis dan cepat. Konversi YouTube ke audio MP3 berkualitas tinggi tanpa batas.",
  keywords: [
    "youtube downloader",
    "download youtube mp3",
    "download youtube mp4",
    "youtube to mp3",
    "youtube to mp4",
    "convert youtube",
    "download video youtube",
  ],
  openGraph: {
    title: "Download Video YouTube ke MP3 MP4 Gratis - Mova YouTube Downloader",
    description: "Download video YouTube ke MP3 atau MP4 gratis dan cepat. Konversi YouTube ke audio MP3 berkualitas tinggi tanpa batas.",
    url: "https://getmova.my.id/youtube-downloader",
    siteName: "Mova",
    type: "website",
  },
  alternates: {
    canonical: "https://getmova.my.id/youtube-downloader",
  },
};

const faqItems = [
  {
    q: "Apakah legal download video YouTube ke MP3/MP4?",
    a: "Mengunduh video YouTube untuk keperluan pribadi umumnya diperbolehkan di banyak negara. Namun, mendistribusikan ulang konten berhak cipta tanpa izin bisa melanggar hukum. Selalu hormati hak cipta kreator dan gunakan konten secara bertanggung jawab.",
  },
  {
    q: "Kualitas audio MP3 apa yang bisa didapat dari YouTube?",
    a: "Mova mendukung ekstraksi audio dari YouTube dalam berbagai kualitas, mulai dari 128kbps hingga 320kbps. Kualitas tergantung pada audio asli yang diunggah ke YouTube. Untuk hasil terbaik, pilih kualitas tertinggi yang tersedia.",
  },
  {
    q: "Bisakah download video YouTube berdurasi panjang?",
    a: "Ya, Mova bisa memproses video YouTube berdurasi panjang. Namun, video yang sangat panjang (lebih dari 1 jam) mungkin membutuhkan waktu sedikit lebih lama untuk diproses.",
  },
  {
    q: "Apakah perlu install aplikasi untuk download YouTube?",
    a: "Tidak perlu! Mova berbasis web, jadi kamu cukup membuka browser dan mengunjungi getmova.my.id. Tidak perlu menginstall aplikasi atau software tambahan sama sekali.",
  },
  {
    q: "Berapa lama proses download video YouTube?",
    a: "Proses download biasanya memakan waktu beberapa detik hingga 1 menit, tergantung pada durasi video dan kualitas yang dipilih. Video pendek biasanya selesai dalam hitungan detik.",
  },
];

export default function YouTubeDownloaderPage() {
  const jsonLdWebApp = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Mova YouTube Downloader",
    description: "Download video YouTube ke MP3 atau MP4 gratis dan cepat",
    url: "https://getmova.my.id/youtube-downloader",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "All",
    offers: { "@type": "Offer", price: "0", priceCurrency: "IDR" },
  };

  const jsonLdHowTo = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "Cara Download Video YouTube ke MP3 atau MP4",
    description: "Panduan langkah demi langkah untuk download video YouTube menggunakan Mova",
    step: [
      { "@type": "HowToStep", position: 1, name: "Salin Link Video YouTube", text: "Buka YouTube, temukan video yang ingin didownload, salin link dari address bar atau tombol Bagikan." },
      { "@type": "HowToStep", position: 2, name: "Tempel Link di Mova", text: "Buka getmova.my.id/youtube-downloader, tempel link YouTube di kolom input, lalu klik Download." },
      { "@type": "HowToStep", position: 3, name: "Pilih Format dan Kualitas", text: "Pilih format Video (MP4) atau Audio (MP3), lalu pilih kualitas yang diinginkan." },
      { "@type": "HowToStep", position: 4, name: "Download dan Simpan", text: "Klik tombol download dan file akan otomatis tersimpan di perangkat kamu." },
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
      { "@type": "ListItem", position: 2, name: "YouTube Downloader", item: "https://getmova.my.id/youtube-downloader" },
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
            <span className="text-[#FAFAFA]">YouTube Downloader</span>
          </nav>
        </div>

        {/* Hero */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2563EB]/10 border border-[#2563EB]/20 mb-4">
              <Film className="h-3.5 w-3.5 text-[#2563EB]" />
              <span className="text-xs font-semibold text-[#2563EB]">Video & Audio</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold mb-3 leading-tight">
              Download Video YouTube ke{" "}
              <span className="text-[#2563EB]">MP3 &amp; MP4</span>
            </h1>
            <p className="text-sm sm:text-base text-[#A1A1AA] mb-8 max-w-2xl mx-auto">
              Konversi video YouTube ke file MP4 atau ekstrak audio MP3 berkualitas tinggi. Gratis, cepat, dan tanpa batas download!
            </p>
            <DownloadForm placeholder="Tempel link video YouTube di sini..." mode="video" />
          </div>
        </section>

        {/* Why Mova for YouTube */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-muted/30">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-xl sm:text-2xl font-bold text-center mb-2">Kenapa Pakai Mova untuk Download YouTube?</h2>
            <p className="text-sm text-[#A1A1AA] text-center mb-8">Solusi terbaik untuk mengunduh video dan audio dari YouTube</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { icon: Film, title: "Video MP4 HD", desc: "Download video YouTube dalam format MP4 dengan kualitas hingga 1080p. Nikmati video offline dengan kualitas terbaik." },
                { icon: Music, title: "Audio MP3", desc: "Ekstrak audio dari video YouTube jadi file MP3 berkualitas tinggi (hingga 320kbps). Sempurna untuk mendengarkan musik offline." },
                { icon: Zap, title: "Proses Cepat", desc: "Download video YouTube dalam hitungan detik. Server kami memproses request dengan cepat dan efisien." },
                { icon: Shield, title: "Aman & Privat", desc: "Tidak ada data pribadi yang disimpan. Semua proses dilakukan secara aman tanpa tracking atau malware." },
                { icon: Smartphone, title: "Tanpa Install", desc: "Langsung gunakan di browser, tidak perlu install software atau extension apapun. Bisa di HP dan laptop." },
                { icon: CheckCircle, title: "Gratis Tanpa Batas", desc: "Download video YouTube sebanyak yang kamu mau, kapan saja. Tidak ada batasan jumlah atau durasi video." },
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
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-xl sm:text-2xl font-bold text-center mb-2">Cara Download Video YouTube ke MP3/MP4</h2>
            <p className="text-sm text-[#A1A1AA] text-center mb-8">Ikuti langkah mudah berikut untuk mengunduh video atau audio dari YouTube</p>
            <div className="space-y-4 max-w-2xl mx-auto">
              {[
                { step: 1, title: "Salin Link Video YouTube", desc: "Buka YouTube di browser atau aplikasi, cari video yang ingin kamu download, lalu salin link-nya dari address bar atau melalui tombol \"Bagikan\"." },
                { step: 2, title: "Tempel Link di Mova", desc: "Kunjungi getmova.my.id/youtube-downloader dan tempel link YouTube ke kolom input yang tersedia. Klik tombol \"Tempel\" untuk mempercepat proses." },
                { step: 3, title: "Pilih Format Video atau Audio", desc: "Setelah video ditemukan, pilih format yang kamu inginkan — Video (MP4) untuk menyimpan video lengkap, atau Audio (MP3) untuk mengekstrak suara saja." },
                { step: 4, title: "Pilih Kualitas dan Download", desc: "Pilih kualitas file yang diinginkan. Untuk video, tersedia pilihan 360p hingga 1080p. Untuk audio, tersedia 128kbps hingga 320kbps. Lalu klik download!" },
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

        {/* Quality Comparison */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-muted/30">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-xl sm:text-2xl font-bold text-center mb-2">Perbandingan Kualitas Video dan Audio YouTube</h2>
            <p className="text-sm text-[#A1A1AA] text-center mb-8">Pilih kualitas yang sesuai dengan kebutuhanmu</p>

            {/* Video Quality */}
            <h3 className="text-base font-semibold text-[#FAFAFA] mb-3">Kualitas Video (MP4)</h3>
            <div className="overflow-x-auto mb-8 max-w-2xl mx-auto">
              <table className="w-full text-sm mb-6">
                <thead>
                  <tr className="border-b border-[#27272A]">
                    <th className="text-left py-3 px-3 text-[#FAFAFA] font-semibold">Kualitas</th>
                    <th className="text-left py-3 px-3 text-[#FAFAFA] font-semibold">Resolusi</th>
                    <th className="text-left py-3 px-3 text-[#FAFAFA] font-semibold">Ukuran/10menit</th>
                    <th className="text-left py-3 px-3 text-[#FAFAFA] font-semibold">Cocok Untuk</th>
                  </tr>
                </thead>
                <tbody className="text-[#A1A1AA]">
                  <tr className="border-b border-[#27272A]/50">
                    <td className="py-2.5 px-3 font-medium text-[#2563EB]">Full HD</td>
                    <td className="py-2.5 px-3">1080p</td>
                    <td className="py-2.5 px-3">~150-300 MB</td>
                    <td className="py-2.5 px-3">Nonton di TV/laptop</td>
                  </tr>
                  <tr className="border-b border-[#27272A]/50">
                    <td className="py-2.5 px-3 font-medium text-[#2563EB]">HD</td>
                    <td className="py-2.5 px-3">720p</td>
                    <td className="py-2.5 px-3">~80-150 MB</td>
                    <td className="py-2.5 px-3">Penggunaan umum</td>
                  </tr>
                  <tr className="border-b border-[#27272A]/50">
                    <td className="py-2.5 px-3">Medium</td>
                    <td className="py-2.5 px-3">480p</td>
                    <td className="py-2.5 px-3">~40-80 MB</td>
                    <td className="py-2.5 px-3">Hemat data</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3">Low</td>
                    <td className="py-2.5 px-3">360p</td>
                    <td className="py-2.5 px-3">~20-40 MB</td>
                    <td className="py-2.5 px-3">Koneksi lambat</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Audio Quality */}
            <h3 className="text-base font-semibold text-[#FAFAFA] mb-3">Kualitas Audio (MP3)</h3>
            <div className="overflow-x-auto max-w-2xl mx-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#27272A]">
                    <th className="text-left py-3 px-3 text-[#FAFAFA] font-semibold">Kualitas</th>
                    <th className="text-left py-3 px-3 text-[#FAFAFA] font-semibold">Bitrate</th>
                    <th className="text-left py-3 px-3 text-[#FAFAFA] font-semibold">Ukuran/10menit</th>
                    <th className="text-left py-3 px-3 text-[#FAFAFA] font-semibold">Cocok Untuk</th>
                  </tr>
                </thead>
                <tbody className="text-[#A1A1AA]">
                  <tr className="border-b border-[#27272A]/50">
                    <td className="py-2.5 px-3 font-medium text-[#2563EB]">Tinggi</td>
                    <td className="py-2.5 px-3">320kbps</td>
                    <td className="py-2.5 px-3">~24 MB</td>
                    <td className="py-2.5 px-3">Audiophile, musik HQ</td>
                  </tr>
                  <tr className="border-b border-[#27272A]/50">
                    <td className="py-2.5 px-3 font-medium text-[#2563EB]">Standar</td>
                    <td className="py-2.5 px-3">192kbps</td>
                    <td className="py-2.5 px-3">~14 MB</td>
                    <td className="py-2.5 px-3">Dengarkan musik</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3">Rendah</td>
                    <td className="py-2.5 px-3">128kbps</td>
                    <td className="py-2.5 px-3">~10 MB</td>
                    <td className="py-2.5 px-3">Podcast, hemat storage</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Video vs Audio */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-xl sm:text-2xl font-bold text-center mb-2">Video MP4 vs Audio MP3 — Mana yang Harus Dipilih?</h2>
            <p className="text-sm text-[#A1A1AA] text-center mb-8">Bergantung pada kebutuhan kamu, berikut perbandingannya</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
              <div className="p-5 rounded-xl border border-[#27272A] bg-[#111113]">
                <Film className="h-6 w-6 text-[#2563EB] mb-3" />
                <h3 className="text-sm font-bold text-[#FAFAFA] mb-2">Video MP4</h3>
                <ul className="space-y-1.5">
                  <li className="text-xs text-[#A1A1AA] flex items-start gap-2"><span className="text-[#2563EB]">&#10003;</span> Menyimpan video + audio</li>
                  <li className="text-xs text-[#A1A1AA] flex items-start gap-2"><span className="text-[#2563EB]">&#10003;</span> Bisa ditonton offline</li>
                  <li className="text-xs text-[#A1A1AA] flex items-start gap-2"><span className="text-[#2563EB]">&#10003;</span> Ukuran file lebih besar</li>
                  <li className="text-xs text-[#A1A1AA] flex items-start gap-2"><span className="text-[#2563EB]">&#10003;</span> Cocok untuk konten visual</li>
                </ul>
              </div>
              <div className="p-5 rounded-xl border border-[#27272A] bg-[#111113]">
                <Music className="h-6 w-6 text-[#2563EB] mb-3" />
                <h3 className="text-sm font-bold text-[#FAFAFA] mb-2">Audio MP3</h3>
                <ul className="space-y-1.5">
                  <li className="text-xs text-[#A1A1AA] flex items-start gap-2"><span className="text-[#2563EB]">&#10003;</span> Hanya menyimpan suara</li>
                  <li className="text-xs text-[#A1A1AA] flex items-start gap-2"><span className="text-[#2563EB]">&#10003;</span> Ukuran file lebih kecil</li>
                  <li className="text-xs text-[#A1A1AA] flex items-start gap-2"><span className="text-[#2563EB]">&#10003;</span> Cocok untuk musik & podcast</li>
                  <li className="text-xs text-[#A1A1AA] flex items-start gap-2"><span className="text-[#2563EB]">&#10003;</span> Hemat penyimpanan</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-muted/30">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-xl sm:text-2xl font-bold text-center mb-2">Pertanyaan Umum tentang Download YouTube</h2>
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
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-xl sm:text-2xl font-bold mb-2">Siap Download Video YouTube?</h2>
            <p className="text-sm text-[#A1A1AA] mb-6">Konversi YouTube ke MP3 atau MP4 dengan Mova sekarang!</p>
            <a href="/youtube-downloader" className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold bg-[#2563EB] text-white hover:bg-[#1D4ED8] transition-colors">
              Coba Mova Sekarang
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </section>

        {/* Other Platforms */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-muted/30">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-lg font-bold text-center mb-6">Download dari Platform Lain</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                { name: "TikTok", href: "/tiktok-downloader" },
                { name: "Instagram", href: "/instagram-downloader" },
                { name: "Facebook", href: "/facebook-downloader" },
                { name: "Twitter/X", href: "/twitter-downloader" },
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

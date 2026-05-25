import { Home, ArrowRight, Zap, Shield, Smartphone, Globe, CheckCircle, ChevronRight } from "lucide-react";
import { MovaLogo } from "@/components/mova-logo";
import { DownloadForm } from "@/components/download-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Download Video TikTok Tanpa Watermark - Mova TikTok Downloader",
  description: "Download video TikTok tanpa watermark gratis dan cepat dengan Mova. Simpan video TikTok berkualitas HD tanpa logo watermark.",
  keywords: [
    "tiktok downloader",
    "download tiktok tanpa watermark",
    "tiktok no watermark",
    "download video tiktok",
    "tiktok saver",
    "hapus watermark tiktok",
    "snaptik alternative",
  ],
  openGraph: {
    title: "Download Video TikTok Tanpa Watermark - Mova TikTok Downloader",
    description: "Download video TikTok tanpa watermark gratis dan cepat dengan Mova. Simpan video TikTok berkualitas HD tanpa logo watermark.",
    url: "https://getmova.my.id/tiktok-downloader",
    siteName: "Mova",
    type: "website",
  },
  alternates: {
    canonical: "https://getmova.my.id/tiktok-downloader",
  },
};

const faqItems = [
  {
    q: "Apakah download video TikTok tanpa watermark dengan Mova gratis?",
    a: "Ya, Mova 100% gratis dan tanpa batas. Kamu bisa download video TikTok sebanyak yang kamu mau tanpa biaya apapun. Tidak perlu registrasi atau login.",
  },
  {
    q: "Apakah hasil download benar-benar tanpa watermark?",
    a: "Ya, Mova menghapus watermark logo TikTok dan nama pengguna dari video yang diunduh. Video yang kamu dapatkan bersih tanpa tanda apapun.",
  },
  {
    q: "Kualitas video TikTok apa yang bisa didownload?",
    a: "Mova mendukung download video TikTok dalam berbagai kualitas, mulai dari 360p hingga 1080p HD. Kualitas tergantung pada video asli yang diunggah oleh kreator.",
  },
  {
    q: "Apakah Mova bisa download audio MP3 dari TikTok?",
    a: "Ya, Mova juga bisa mengekstrak audio dari video TikTok dan menyimpannya sebagai file MP3. Cocok untuk menyimpan lagu atau sound yang trending di TikTok.",
  },
  {
    q: "Apakah aman menggunakan Mova untuk download TikTok?",
    a: "Tentu saja! Mova tidak menyimpan data pribadi pengguna, tidak menggunakan tracking cookies, dan semua proses dilakukan langsung dari server TikTok. Privasi kamu terjaga.",
  },
];

export default function TikTokDownloaderPage() {
  const jsonLdWebApp = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Mova TikTok Downloader",
    description: "Download video TikTok tanpa watermark gratis dan cepat",
    url: "https://getmova.my.id/tiktok-downloader",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "All",
    offers: { "@type": "Offer", price: "0", priceCurrency: "IDR" },
  };

  const jsonLdHowTo = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "Cara Download Video TikTok Tanpa Watermark",
    description: "Panduan langkah demi langkah untuk download video TikTok tanpa watermark menggunakan Mova",
    step: [
      { "@type": "HowToStep", position: 1, name: "Salin Link Video TikTok", text: "Buka aplikasi TikTok, temukan video yang ingin didownload, ketuk tombol Bagikan dan pilih Salin Tautan." },
      { "@type": "HowToStep", position: 2, name: "Tempel Link di Mova", text: "Buka getmova.my.id/tiktok-downloader, tempel link video TikTok di kolom input, lalu klik tombol Download." },
      { "@type": "HowToStep", position: 3, name: "Pilih Kualitas Video", text: "Pilih kualitas video yang diinginkan (360p, 480p, 720p, atau 1080p) dan klik download." },
      { "@type": "HowToStep", position: 4, name: "Simpan Video", text: "Video tanpa watermark akan otomatis tersimpan di perangkat kamu. Selesai!" },
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
      { "@type": "ListItem", position: 2, name: "TikTok Downloader", item: "https://getmova.my.id/tiktok-downloader" },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#09090B] text-[#FAFAFA]">
      {/* JSON-LD Schemas */}
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
            <span className="text-[#FAFAFA]">TikTok Downloader</span>
          </nav>
        </div>

        {/* Hero */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F97316]/10 border border-[#F97316]/20 mb-4">
              <Zap className="h-3.5 w-3.5 text-[#F97316]" />
              <span className="text-xs font-semibold text-[#F97316]">Gratis & Tanpa Batas</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold mb-3 leading-tight">
              Download Video TikTok{" "}
              <span className="text-[#F97316]">Tanpa Watermark</span>
            </h1>
            <p className="text-sm sm:text-base text-[#A1A1AA] mb-8 max-w-2xl mx-auto">
              Simpan video TikTok berkualitas HD tanpa logo watermark. Cepat, gratis, dan mudah — cukup tempel link dan download!
            </p>
            <DownloadForm placeholder="Tempel link video TikTok di sini..." mode="video" />
          </div>
        </section>

        {/* Why Mova for TikTok */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-muted/30">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-xl sm:text-2xl font-bold text-center mb-2">Kenapa Pakai Mova untuk Download TikTok?</h2>
            <p className="text-sm text-[#A1A1AA] text-center mb-8">Fitur terbaik untuk mengunduh video TikTok tanpa watermark</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { icon: Zap, title: "Super Cepat", desc: "Download video TikTok dalam hitungan detik. Tidak perlu menunggu lama, proses langsung selesai." },
                { icon: Shield, title: "Tanpa Watermark", desc: "Video yang diunduh benar-benar bersih tanpa logo TikTok dan nama pengguna yang mengganggu." },
                { icon: Smartphone, title: "Multi Perangkat", desc: "Bisa digunakan di HP, tablet, dan laptop. Tidak perlu install aplikasi tambahan." },
                { icon: Globe, title: "Semua Region", desc: "Mendukung video TikTok dari semua negara dan region. Tidak ada batasan wilayah." },
                { icon: CheckCircle, title: "Gratis Selamanya", desc: "100% gratis tanpa biaya tersembunyi. Download sepuasnya tanpa batas jumlah." },
                { icon: Zap, title: "Audio MP3", desc: "Ekstrak audio dari video TikTok jadi file MP3. Simpan lagu atau sound favorit kamu." },
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
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-xl sm:text-2xl font-bold text-center mb-2">Cara Download Video TikTok Tanpa Watermark</h2>
            <p className="text-sm text-[#A1A1AA] text-center mb-8">Hanya 4 langkah mudah untuk menyimpan video TikTok tanpa watermark</p>
            <div className="space-y-4 max-w-2xl mx-auto">
              {[
                { step: 1, title: "Salin Link Video TikTok", desc: "Buka aplikasi TikTok di HP kamu, temukan video yang ingin didownload, ketuk tombol \"Bagikan\" (ikon panah), lalu pilih \"Salin Tautan\". Link video akan otomatis tersalin ke clipboard." },
                { step: 2, title: "Tempel Link di Mova", desc: "Buka website Mova di getmova.my.id/tiktok-downloader, tempel link video TikTok yang sudah kamu salin ke kolom input. Kamu juga bisa klik tombol \"Tempel\" untuk langsung menempelkan dari clipboard." },
                { step: 3, title: "Klik Download", desc: "Klik tombol Download dan Mova akan memproses video TikTok secara otomatis. Sistem kami akan menghapus watermark dan menyiapkan link download dalam beberapa detik." },
                { step: 4, title: "Pilih Kualitas dan Simpan", desc: "Pilih kualitas video yang kamu inginkan (360p, 480p, 720p, atau 1080p HD), lalu klik download. Video tanpa watermark akan langsung tersimpan di perangkat kamu." },
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

        {/* Quality Comparison Table */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-muted/30">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-xl sm:text-2xl font-bold text-center mb-2">Perbandingan Kualitas Video TikTok</h2>
            <p className="text-sm text-[#A1A1AA] text-center mb-8">Pilih kualitas yang sesuai dengan kebutuhan kamu</p>
            <div className="overflow-x-auto max-w-2xl mx-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#27272A]">
                    <th className="text-left py-3 px-3 text-[#FAFAFA] font-semibold">Kualitas</th>
                    <th className="text-left py-3 px-3 text-[#FAFAFA] font-semibold">Resolusi</th>
                    <th className="text-left py-3 px-3 text-[#FAFAFA] font-semibold">Ukuran File</th>
                    <th className="text-left py-3 px-3 text-[#FAFAFA] font-semibold">Cocok Untuk</th>
                  </tr>
                </thead>
                <tbody className="text-[#A1A1AA]">
                  <tr className="border-b border-[#27272A]/50">
                    <td className="py-2.5 px-3 font-medium text-[#F97316]">HD</td>
                    <td className="py-2.5 px-3">1080p</td>
                    <td className="py-2.5 px-3">~15-30 MB</td>
                    <td className="py-2.5 px-3">Koleksi pribadi, edit video</td>
                  </tr>
                  <tr className="border-b border-[#27272A]/50">
                    <td className="py-2.5 px-3 font-medium text-[#F97316]">SD</td>
                    <td className="py-2.5 px-3">720p</td>
                    <td className="py-2.5 px-3">~8-15 MB</td>
                    <td className="py-2.5 px-3">Penggunaan umum, sharing</td>
                  </tr>
                  <tr className="border-b border-[#27272A]/50">
                    <td className="py-2.5 px-3 font-medium text-[#A1A1AA]">Medium</td>
                    <td className="py-2.5 px-3">480p</td>
                    <td className="py-2.5 px-3">~4-8 MB</td>
                    <td className="py-2.5 px-3">Hemat data, preview cepat</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-medium text-[#A1A1AA]">Low</td>
                    <td className="py-2.5 px-3">360p</td>
                    <td className="py-2.5 px-3">~2-4 MB</td>
                    <td className="py-2.5 px-3">Koneksi lambat, hemat storage</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-xl sm:text-2xl font-bold text-center mb-2">Pertanyaan Umum tentang Download TikTok</h2>
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
            <h2 className="text-xl sm:text-2xl font-bold mb-2">Siap Download Video TikTok Tanpa Watermark?</h2>
            <p className="text-sm text-[#A1A1AA] mb-6">Coba Mova sekarang dan rasakan kemudahan download video TikTok tanpa watermark!</p>
            <a href="/tiktok-downloader" className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold bg-[#F97316] text-white hover:bg-[#EA580C] transition-colors">
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
                { name: "YouTube", href: "/youtube-downloader" },
                { name: "Instagram", href: "/instagram-downloader" },
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

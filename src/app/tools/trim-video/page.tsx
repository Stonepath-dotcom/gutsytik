import type { Metadata } from "next";
import Link from "next/link";
import { Home, ChevronRight, Scissors, Check, ArrowRight, ArrowRightLeft, HardDrive } from "lucide-react";
import { MovaLogo } from "@/components/mova-logo";
import { SitewideFooter } from "@/components/sitewide-footer";

export const metadata: Metadata = {
  title: "Trim Video Online - Potong Video Gratis Tanpa Install Aplikasi",
  description:
    "Potong video online secara gratis tanpa install aplikasi. Trim bagian video yang kamu butuhkan dengan mudah dan cepat menggunakan Mova.",
  alternates: { canonical: "https://getmova.my.id/tools/trim-video" },
  keywords: [
    "trim video online",
    "potong video gratis",
    "cut video online",
    "video trimmer",
    "potong video tanpa aplikasi",
    "trim video mp4",
  ],
  openGraph: {
    title: "Trim Video Online - Potong Video Gratis Tanpa Install Aplikasi",
    description: "Potong video online secara gratis tanpa install aplikasi. Cepat dan mudah!",
    url: "https://getmova.my.id/tools/trim-video",
    siteName: "getmova",
    type: "website",
  },
};

export default function TrimVideoPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://getmova.my.id" },
      { "@type": "ListItem", position: 2, name: "Tools", item: "https://getmova.my.id/tools" },
      { "@type": "ListItem", position: 3, name: "Trim Video", item: "https://getmova.my.id/tools/trim-video" },
    ],
  };

  const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "Cara Trim Video Online dengan Mova",
    description: "Panduan langkah demi langkah cara memotong video online menggunakan Mova.",
    step: [
      { "@type": "HowToStep", position: 1, name: "Download Video", text: "Download video yang ingin kamu trim menggunakan Mova." },
      { "@type": "HowToStep", position: 2, name: "Tentukan Waktu", text: "Masukkan waktu awal dan akhir bagian video yang ingin dipotong." },
      { "@type": "HowToStep", position: 3, name: "Trim & Download", text: "Klik trim dan download hasil video yang sudah dipotong." },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }} />

      <div className="min-h-screen flex flex-col bg-card text-foreground">
        <header className="border-b border-border bg-card">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <a href="/" className="flex items-center gap-2"><MovaLogo size={32} showText /></a>
              <a href="/" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border border-border bg-card text-foreground hover:bg-muted/50 transition-colors">
                <Home className="h-4 w-4" /> Beranda
              </a>
            </div>
          </div>
        </header>

        <main className="flex-1">
          <div className="mx-auto max-w-5xl px-4 pt-6">
            <nav aria-label="Breadcrumb">
              <ol className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <li><a href="/" className="hover:text-[#E52222]">Beranda</a></li>
                <li><ChevronRight className="h-3.5 w-3.5" /></li>
                <li><a href="/tools/format-comparison" className="hover:text-[#E52222]">Tools</a></li>
                <li><ChevronRight className="h-3.5 w-3.5" /></li>
                <li className="text-[#E52222] font-medium">Trim Video</li>
              </ol>
            </nav>
          </div>

          {/* Hero */}
          <section className="relative pt-8 pb-10 px-4 sm:px-6">
            <div className="absolute inset-0 bg-gradient-to-b from-[#ECFDF5] via-[#D1FAE5] to-background dark:from-[#064E3B] dark:via-[#022C22] opacity-50" />
            <div className="relative mx-auto max-w-4xl text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E52222]/10 border border-[#E52222]/20 mb-4">
                <Scissors className="h-3.5 w-3.5 text-[#E52222]" />
                <span className="text-xs font-semibold text-[#E52222]">Tools Interaktif</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold mb-3 leading-tight font-[family-name:var(--font-montserrat)]">
                Trim <span className="gradient-text">Video Online</span>
              </h1>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Potong bagian video yang kamu butuhkan tanpa install aplikasi. Gratis, cepat, dan kualitas tetap terjaga.
              </p>
            </div>
          </section>

          {/* How it works */}
          <section className="px-4 sm:px-6 pb-10">
            <div className="mx-auto max-w-4xl">
              <h2 className="text-lg font-bold text-foreground mb-6 font-[family-name:var(--font-montserrat)]">
                Cara <span className="gradient-text">Menggunakan</span>
              </h2>
              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  { step: "1", title: "Download Video", desc: "Download video dari TikTok, Instagram, YouTube, atau platform lain menggunakan Mova." },
                  { step: "2", title: "Tentukan Waktu", desc: "Masukkan waktu awal (start) dan waktu akhir (end) bagian video yang ingin kamu potong." },
                  { step: "3", title: "Trim & Simpan", desc: "Klik tombol trim, sistem akan memotong video sesuai waktu yang ditentukan dan siap diunduh." },
                ].map((s) => (
                  <div key={s.step} className="p-5 rounded-2xl bg-card border border-border text-center">
                    <div className="w-10 h-10 rounded-full bg-[#E52222]/10 text-[#E52222] font-bold flex items-center justify-center mx-auto mb-3">
                      {s.step}
                    </div>
                    <h3 className="font-bold text-foreground text-sm mb-1.5">{s.title}</h3>
                    <p className="text-xs text-muted-foreground">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Features */}
          <section className="px-4 sm:px-6 pb-10">
            <div className="mx-auto max-w-4xl">
              <h2 className="text-lg font-bold text-foreground mb-6 font-[family-name:var(--font-montserrat)]">
                Kelebihan <span className="gradient-text">Trim Mova</span>
              </h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  "Gratis tanpa batas — trim video sepuasnya tanpa bayar",
                  "Tanpa install aplikasi — langsung dari browser",
                  "Kualitas terjaga — tidak ada kompresi ulang",
                  "Presisi detik — tentukan waktu awal dan akhir dengan akurat",
                  "Support semua format — MP4, WEBM, AVI",
                  "Privasi terjaga — video tidak disimpan di server",
                ].map((feat, i) => (
                  <div key={i} className="flex items-start gap-2 p-3 rounded-xl bg-card border border-border">
                    <Check className="h-4 w-4 text-[#E52222] shrink-0 mt-0.5" />
                    <p className="text-sm text-muted-foreground">{feat}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="px-4 sm:px-6 pb-10">
            <div className="mx-auto max-w-3xl">
              <div className="rounded-2xl p-6 text-center bg-gradient-to-br from-[#E52222]/20 to-[#FF6B35]/10 border border-[#E52222]/30">
                <h2 className="text-xl font-bold text-foreground mb-2 font-[family-name:var(--font-montserrat)]">
                  Langsung Coba Trim Video
                </h2>
                <p className="text-muted-foreground mb-5 text-sm max-w-md mx-auto">
                  Download video lalu trim bagian yang kamu butuhkan. Gratis dan cepat!
                </p>
                <Link href="/" className="inline-flex items-center gap-2 bg-[#E52222] text-white font-semibold rounded-xl hover:bg-[#C91C1C] px-8 h-12 text-base transition-colors">
                  <Scissors className="h-5 w-5" /> Mulai Download & Trim
                </Link>
              </div>
            </div>
          </section>

          {/* Related Tools */}
          <section className="px-4 sm:px-6 pb-16">
            <div className="mx-auto max-w-4xl">
              <h2 className="text-lg font-bold text-foreground mb-4 font-[family-name:var(--font-montserrat)]">
                Tools <span className="gradient-text">Lainnya</span>
              </h2>
              <div className="grid sm:grid-cols-3 gap-3">
                <Link href="/tools/format-comparison" className="p-4 rounded-xl bg-card border border-border hover:border-[#E52222]/30 transition-all group">
                  <ArrowRightLeft className="h-5 w-5 text-[#E52222] mb-2" />
                  <p className="text-sm font-semibold text-foreground group-hover:text-[#E52222]">Perbandingan Format</p>
                  <p className="text-xs text-muted-foreground">Bandingkan MP4, WEBM, AVI</p>
                </Link>
                <Link href="/tools/file-size-calculator" className="p-4 rounded-xl bg-card border border-border hover:border-[#E52222]/30 transition-all group">
                  <HardDrive className="h-5 w-5 text-[#E52222] mb-2" />
                  <p className="text-sm font-semibold text-foreground group-hover:text-[#E52222]">Kalkulator Ukuran File</p>
                  <p className="text-xs text-muted-foreground">Estimasi ukuran sebelum download</p>
                </Link>
                <Link href="/tools/convert-gif" className="p-4 rounded-xl bg-card border border-border hover:border-[#E52222]/30 transition-all group">
                  <ArrowRight className="h-5 w-5 text-[#E52222] mb-2" />
                  <p className="text-sm font-semibold text-foreground group-hover:text-[#E52222]">Convert ke GIF</p>
                  <p className="text-xs text-muted-foreground">Ubah video jadi animasi GIF</p>
                </Link>
              </div>
            </div>
          </section>
        </main>

        <SitewideFooter />
      </div>
    </>
  );
}

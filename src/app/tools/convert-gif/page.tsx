import type { Metadata } from "next";
import Link from "next/link";
import { Home, ChevronRight, Image, Check, ArrowRight, ArrowRightLeft, HardDrive, Scissors } from "lucide-react";
import { MovaLogo } from "@/components/mova-logo";
import { SitewideFooter } from "@/components/sitewide-footer";

export const metadata: Metadata = {
  title: "Convert Video ke GIF Online - Gratis & Cepat",
  description:
    "Konversi video ke GIF animasi secara online dan gratis. Buat GIF dari TikTok, Instagram, YouTube, dan platform lainnya dengan mudah.",
  alternates: { canonical: "https://getmova.my.id/tools/convert-gif" },
  keywords: [
    "convert video ke gif",
    "video to gif online",
    "buat gif dari video",
    "gif converter gratis",
    "konversi video ke gif",
    "gif maker online",
  ],
  openGraph: {
    title: "Convert Video ke GIF Online - Gratis & Cepat",
    description: "Konversi video ke GIF animasi secara online dan gratis. Cepat dan mudah!",
    url: "https://getmova.my.id/tools/convert-gif",
    siteName: "getmova",
    type: "website",
  },
};

export default function ConvertGifPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://getmova.my.id" },
      { "@type": "ListItem", position: 2, name: "Tools", item: "https://getmova.my.id/tools" },
      { "@type": "ListItem", position: 3, name: "Convert GIF", item: "https://getmova.my.id/tools/convert-gif" },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

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
                <li><a href="/" className="hover:text-[#10B981]">Beranda</a></li>
                <li><ChevronRight className="h-3.5 w-3.5" /></li>
                <li><a href="/tools/format-comparison" className="hover:text-[#10B981]">Tools</a></li>
                <li><ChevronRight className="h-3.5 w-3.5" /></li>
                <li className="text-[#10B981] font-medium">Convert ke GIF</li>
              </ol>
            </nav>
          </div>

          {/* Hero */}
          <section className="relative pt-8 pb-10 px-4 sm:px-6">
            <div className="absolute inset-0 bg-gradient-to-b from-[#ECFDF5] via-[#D1FAE5] to-background dark:from-[#064E3B] dark:via-[#022C22] opacity-50" />
            <div className="relative mx-auto max-w-4xl text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#10B981]/10 border border-[#10B981]/20 mb-4">
                <Image className="h-3.5 w-3.5 text-[#10B981]" />
                <span className="text-xs font-semibold text-[#10B981]">Tools Interaktif</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold mb-3 leading-tight font-[family-name:var(--font-montserrat)]">
                Convert Video ke <span className="gradient-text">GIF Animasi</span>
              </h1>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Ubah video dari TikTok, Instagram, atau YouTube menjadi GIF animasi yang bisa di-share. Gratis dan tanpa batas!
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
                  { step: "1", title: "Download Video", desc: "Download video dari platform apapun menggunakan Mova terlebih dahulu." },
                  { step: "2", title: "Pilih Bagian Video", desc: "Tentukan durasi bagian video yang ingin dijadikan GIF (maks 30 detik)." },
                  { step: "3", title: "Convert & Download", desc: "Klik convert, sistem akan mengubah video menjadi GIF dan siap diunduh." },
                ].map((s) => (
                  <div key={s.step} className="p-5 rounded-2xl bg-card border border-border text-center">
                    <div className="w-10 h-10 rounded-full bg-[#10B981]/10 text-[#10B981] font-bold flex items-center justify-center mx-auto mb-3">{s.step}</div>
                    <h3 className="font-bold text-foreground text-sm mb-1.5">{s.title}</h3>
                    <p className="text-xs text-muted-foreground">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Tips for best GIF */}
          <section className="px-4 sm:px-6 pb-10">
            <div className="mx-auto max-w-4xl">
              <h2 className="text-lg font-bold text-foreground mb-6 font-[family-name:var(--font-montserrat)]">
                Tips GIF <span className="gradient-text">Berkualitas</span>
              </h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { title: "Durasi pendek (3-10 detik)", desc: "GIF yang pendek lebih sering di-share dan ukurannya lebih kecil. Hindari GIF lebih dari 15 detik." },
                  { title: "Resolusi 480p atau 360p", desc: "GIF tidak perlu resolusi tinggi. 480p sudah cukup dan menghasilkan ukuran file yang wajar." },
                  { title: "Hindari terlalu banyak gerakan", desc: "GIF dengan banyak gerakan menghasilkan file besar. Pilih momen yang simple dan impactful." },
                  { title: "Pertimbangkan format MP4 ringan", desc: "Untuk animasi lebih dari 15 detik, format MP4 ringan lebih efisien daripada GIF." },
                ].map((tip, i) => (
                  <div key={i} className="p-4 rounded-xl bg-card border border-border">
                    <p className="text-sm font-semibold text-foreground mb-1">{tip.title}</p>
                    <p className="text-xs text-muted-foreground">{tip.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Features */}
          <section className="px-4 sm:px-6 pb-10">
            <div className="mx-auto max-w-4xl">
              <h2 className="text-lg font-bold text-foreground mb-6 font-[family-name:var(--font-montserrat)]">
                Kenapa Pakai <span className="gradient-text">Mova GIF Converter</span>
              </h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  "Gratis tanpa batas — convert video ke GIF sepuasnya",
                  "Tanpa watermark — GIF bersih tanpa logo",
                  "Tanpa install aplikasi — langsung dari browser",
                  "Support semua platform — TikTok, IG, YouTube, dll",
                  "Kualitas tinggi — pilih resolusi dan FPS",
                  "Privasi terjaga — video tidak disimpan di server",
                ].map((feat, i) => (
                  <div key={i} className="flex items-start gap-2 p-3 rounded-xl bg-card border border-border">
                    <Check className="h-4 w-4 text-[#10B981] shrink-0 mt-0.5" />
                    <p className="text-sm text-muted-foreground">{feat}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="px-4 sm:px-6 pb-10">
            <div className="mx-auto max-w-3xl">
              <div className="rounded-2xl p-6 text-center bg-gradient-to-br from-[#10B981]/20 to-[#34D399]/10 border border-[#10B981]/30">
                <h2 className="text-xl font-bold text-foreground mb-2 font-[family-name:var(--font-montserrat)]">
                  Buat GIF dari Video Sekarang
                </h2>
                <p className="text-muted-foreground mb-5 text-sm max-w-md mx-auto">
                  Download video lalu convert ke GIF animasi. Gratis dan cepat!
                </p>
                <Link href="/" className="inline-flex items-center gap-2 bg-[#10B981] text-white font-semibold rounded-xl hover:bg-[#059669] px-8 h-12 text-base transition-colors">
                  <Image className="h-5 w-5" /> Mulai Download & Convert
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
                <Link href="/tools/format-comparison" className="p-4 rounded-xl bg-card border border-border hover:border-[#10B981]/30 transition-all group">
                  <ArrowRightLeft className="h-5 w-5 text-[#10B981] mb-2" />
                  <p className="text-sm font-semibold text-foreground group-hover:text-[#10B981]">Perbandingan Format</p>
                  <p className="text-xs text-muted-foreground">Bandingkan MP4, WEBM, AVI</p>
                </Link>
                <Link href="/tools/file-size-calculator" className="p-4 rounded-xl bg-card border border-border hover:border-[#10B981]/30 transition-all group">
                  <HardDrive className="h-5 w-5 text-[#10B981] mb-2" />
                  <p className="text-sm font-semibold text-foreground group-hover:text-[#10B981]">Kalkulator Ukuran File</p>
                  <p className="text-xs text-muted-foreground">Estimasi ukuran sebelum download</p>
                </Link>
                <Link href="/tools/trim-video" className="p-4 rounded-xl bg-card border border-border hover:border-[#10B981]/30 transition-all group">
                  <Scissors className="h-5 w-5 text-[#10B981] mb-2" />
                  <p className="text-sm font-semibold text-foreground group-hover:text-[#10B981]">Trim Video</p>
                  <p className="text-xs text-muted-foreground">Potong bagian video</p>
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

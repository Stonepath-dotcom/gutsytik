import type { Metadata } from "next";
import Link from "next/link";
import {
  Home,
  ChevronRight,
  ArrowRightLeft,
  HardDrive,
  FileVideo,
  Image,
  Monitor,
  Wrench,
} from "lucide-react";
import { MovaLogo } from "@/components/mova-logo";
import { SitewideFooter } from "@/components/sitewide-footer";

export const metadata: Metadata = {
  title: "Tools - Alat Video Gratis dari Mova",
  description:
    "Kumpulan tools gratis untuk video: perbandingan format, kalkulator ukuran file, trim video, konversi GIF, dan komparator resolusi. Semua gratis!",
  alternates: { canonical: "https://getmova.my.id/tools" },
  keywords: [
    "video tools gratis",
    "kalkulator ukuran video",
    "perbandingan format video",
    "trim video online",
    "konversi video ke gif",
    "video resolution comparator",
  ],
  openGraph: {
    title: "Tools - Alat Video Gratis dari Mova",
    description:
      "Kumpulan tools gratis untuk video: perbandingan format, kalkulator ukuran file, trim video, dan lainnya.",
    url: "https://getmova.my.id/tools",
    siteName: "getmova",
    type: "website",
  },
};

const TOOLS = [
  {
    title: "Perbandingan Format Video",
    description:
      "Bandingkan format video MP4, WEBM, AVI, MKV, MOV, FLV secara detail. Lihat perbedaan codec, kompresi, kompatibilitas browser, dan rekomendasi penggunaan.",
    href: "/tools/format-comparison",
    icon: ArrowRightLeft,
    color: "from-blue-500/20 to-blue-600/10",
    borderColor: "border-blue-500/20",
    iconColor: "text-blue-500",
    badge: "Populer",
  },
  {
    title: "Kalkulator Ukuran File",
    description:
      "Estimasi ukuran file video berdasarkan format, resolusi, dan durasi. Hitung waktu download berdasarkan kecepatan internet kamu.",
    href: "/tools/file-size-calculator",
    icon: HardDrive,
    color: "from-emerald-500/20 to-emerald-600/10",
    borderColor: "border-emerald-500/20",
    iconColor: "text-emerald-500",
    badge: "Interaktif",
  },
  {
    title: "Komparator Resolusi Video",
    description:
      "Bandingkan resolusi video dari 240p sampai 8K secara visual. Lihat perbedaan pixel, ukuran file, dan rekomendasi resolusi terbaik.",
    href: "/tools/resolution-comparator",
    icon: Monitor,
    color: "from-purple-500/20 to-purple-600/10",
    borderColor: "border-purple-500/20",
    iconColor: "text-purple-500",
    badge: "Baru",
  },
  {
    title: "Trim Video",
    description:
      "Potong bagian video yang kamu butuhkan. Pilih start dan end time, lalu download hasilnya. Tanpa install software!",
    href: "/tools/trim-video",
    icon: FileVideo,
    color: "from-orange-500/20 to-orange-600/10",
    borderColor: "border-orange-500/20",
    iconColor: "text-orange-500",
    badge: null,
  },
  {
    title: "Konversi ke GIF",
    description:
      "Ubah video menjadi GIF animasi. Pilih durasi dan ukuran, lalu convert langsung dari browser.",
    href: "/tools/convert-gif",
    icon: Image,
    color: "from-pink-500/20 to-pink-600/10",
    borderColor: "border-pink-500/20",
    iconColor: "text-pink-500",
    badge: null,
  },
];

export default function ToolsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Tools - Alat Video Gratis dari Mova",
    description: "Kumpulan tools gratis untuk video: perbandingan format, kalkulator ukuran file, trim video, dan lainnya.",
    url: "https://getmova.my.id/tools",
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://getmova.my.id" },
        { "@type": "ListItem", position: 2, name: "Tools", item: "https://getmova.my.id/tools" },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen flex flex-col bg-card text-foreground">
        <header className="border-b border-border bg-card">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center gap-2">
                <MovaLogo size={32} showText />
              </Link>
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border border-border bg-card text-foreground hover:bg-muted/50 transition-colors"
              >
                <Home className="h-4 w-4" />
                Beranda
              </Link>
            </div>
          </div>
        </header>

        <main className="flex-1">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <li>
                  <Link href="/" className="hover:text-[#10B981] transition-colors">Beranda</Link>
                </li>
                <li><ChevronRight className="h-3.5 w-3.5" /></li>
                <li className="text-[#10B981] font-medium">Tools</li>
              </ol>
            </nav>

            <div className="text-center mb-16">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium tracking-wider uppercase border border-border text-muted-foreground mb-6">
                <Wrench className="h-3 w-3 text-[#10B981]" />
                Tools Gratis
              </span>
              <h1
                className="text-4xl sm:text-5xl font-light tracking-tight text-foreground mb-4 mt-4"
                style={{ fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif" }}
              >
                Alat Video <span className="font-bold text-[#10B981]">Gratis</span>
              </h1>
              <p className="text-muted-foreground text-sm max-w-2xl mx-auto leading-relaxed">
                Kumpulan tools interaktif untuk membantu kamu memahami, menghitung, dan mengolah video. Semua gratis, tanpa install, langsung dari browser.
              </p>
            </div>

            {/* Tools Grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {TOOLS.map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className={`group relative rounded-2xl border bg-gradient-to-br ${tool.color} p-6 hover:shadow-lg transition-all duration-300 ${tool.borderColor}`}
                >
                  {tool.badge && (
                    <span className="absolute top-4 right-4 text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#10B981] text-white">
                      {tool.badge}
                    </span>
                  )}
                  <tool.icon className={`h-8 w-8 ${tool.iconColor} mb-4 group-hover:scale-110 transition-transform`} />
                  <h2
                    className="text-lg font-bold text-foreground mb-2 group-hover:text-[#10B981] transition-colors"
                    style={{ fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif" }}
                  >
                    {tool.title}
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">{tool.description}</p>
                </Link>
              ))}
            </div>

            {/* More tools coming */}
            <div className="mt-12 p-6 rounded-2xl border border-dashed border-border text-center">
              <Wrench className="h-8 w-8 text-muted-foreground/30 mx-auto mb-3" />
              <h3
                className="text-base font-bold text-muted-foreground mb-1"
                style={{ fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif" }}
              >
                Tools Lainnya Segera Hadir
              </h3>
              <p className="text-xs text-muted-foreground/70">
                Kami sedang mengembangkan lebih banyak tools video. Nantikan update selanjutnya!
              </p>
            </div>

            {/* CTA */}
            <div className="mt-12 p-6 sm:p-8 rounded-xl bg-gradient-to-br from-[#10B981]/20 to-[#34D399]/10 border border-[#10B981]/30 text-center">
              <h2
                className="text-xl font-bold text-foreground mb-2"
                style={{ fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif" }}
              >
                Siap Download Video?
              </h2>
              <p className="text-muted-foreground mb-5 text-sm max-w-md mx-auto">
                Gunakan Mova untuk download video dari berbagai platform. Gratis dan cepat!
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 bg-[#10B981] text-white font-semibold rounded-xl hover:bg-[#059669] px-8 h-12 text-base transition-colors"
              >
                Mulai Download Gratis
              </Link>
            </div>
          </div>
        </main>

        <SitewideFooter />
      </div>
    </>
  );
}

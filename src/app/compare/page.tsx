import type { Metadata } from "next";
import {
  Home,
  ChevronRight,
  Check,
  X,
  Minus,
  Trophy,
  Shield,
  Zap,
  Download,
  Globe,
} from "lucide-react";
import Link from "next/link";
import { MovaLogo } from "@/components/mova-logo";
import { SitewideFooter } from "@/components/sitewide-footer";

export const metadata: Metadata = {
  title: "Perbandingan Video Downloader - Mova vs Kompetitor 2026",
  description:
    "Bandingkan Mova dengan SnapTik, SaveFrom, y2mate, dan situs downloader lainnya. Lihat mengapa Mova lebih baik: gratis, tanpa watermark, dan aman.",
  alternates: { canonical: "https://getmova.my.id/compare" },
  keywords: [
    "mova vs snaptik",
    "mova vs savefrom",
    "perbandingan video downloader",
    "video downloader terbaik",
    "mova vs y2mate",
  ],
  openGraph: {
    title: "Perbandingan Video Downloader - Mova vs Kompetitor 2026",
    description:
      "Bandingkan Mova dengan kompetitor. Gratis, tanpa watermark, dan aman.",
    url: "https://getmova.my.id/compare",
    siteName: "getmova",
    type: "website",
  },
};

type CellValue = "yes" | "no" | "partial";

interface Feature {
  name: string;
  mova: CellValue;
  snaptik: CellValue;
  savefrom: CellValue;
  y2mate: CellValue;
  note?: string;
}

const FEATURES: Feature[] = [
  { name: "Download video tanpa watermark", mova: "yes", snaptik: "yes", savefrom: "no", y2mate: "no" },
  { name: "100% gratis (tanpa premium)", mova: "yes", snaptik: "yes", savefrom: "partial", y2mate: "partial" },
  { name: "Tanpa iklan pop-up mengganggu", mova: "yes", snaptik: "no", savefrom: "no", y2mate: "no" },
  { name: "Tidak perlu registrasi", mova: "yes", snaptik: "yes", savefrom: "yes", y2mate: "yes" },
  { name: "Support TikTok", mova: "yes", snaptik: "yes", savefrom: "yes", y2mate: "no" },
  { name: "Support Instagram Reels & Story", mova: "yes", snaptik: "partial", savefrom: "yes", y2mate: "no" },
  { name: "Support YouTube", mova: "yes", snaptik: "no", savefrom: "yes", y2mate: "yes" },
  { name: "Support Facebook", mova: "yes", snaptik: "no", savefrom: "yes", y2mate: "no" },
  { name: "Support Twitter/X", mova: "yes", snaptik: "no", savefrom: "yes", y2mate: "no" },
  { name: "Support Pinterest", mova: "yes", snaptik: "no", savefrom: "partial", y2mate: "no" },
  { name: "Support Reddit", mova: "yes", snaptik: "no", savefrom: "partial", y2mate: "no" },
  { name: "Support Telegram", mova: "yes", snaptik: "no", savefrom: "no", y2mate: "no" },
  { name: "Ekstrak audio MP3", mova: "yes", snaptik: "no", savefrom: "partial", y2mate: "yes" },
  { name: "Download 4K / HD", mova: "yes", snaptik: "partial", savefrom: "partial", y2mate: "partial" },
  { name: "Dark mode", mova: "yes", snaptik: "no", savefrom: "no", y2mate: "no" },
  { name: "PWA (install ke home screen)", mova: "yes", snaptik: "no", savefrom: "no", y2mate: "no" },
  { name: "Blog & panduan lengkap", mova: "yes", snaptik: "no", savefrom: "no", y2mate: "no" },
  { name: "Tools interaktif (kalkulator, dll)", mova: "yes", snaptik: "no", savefrom: "no", y2mate: "no" },
  { name: "Cookie consent transparan", mova: "yes", snaptik: "no", savefrom: "no", y2mate: "no" },
  { name: "Keamanan HTTPS penuh", mova: "yes", snaptik: "yes", savefrom: "yes", y2mate: "yes" },
];

function CellIcon({ value }: { value: CellValue }) {
  if (value === "yes") return <Check className="h-4 w-4 text-emerald-500 mx-auto" />;
  if (value === "no") return <X className="h-4 w-4 text-red-400 mx-auto" />;
  return <Minus className="h-4 w-4 text-amber-500 mx-auto" />;
}

const COMPETITORS = [
  { key: "mova", label: "Mova", highlight: true },
  { key: "snaptik", label: "SnapTik", highlight: false },
  { key: "savefrom", label: "SaveFrom", highlight: false },
  { key: "y2mate", label: "y2mate", highlight: false },
] as const;

export default function ComparePage() {
  const movaScore = FEATURES.filter((f) => f.mova === "yes").length;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Perbandingan Video Downloader - Mova vs Kompetitor 2026",
    description: "Bandingkan Mova dengan SnapTik, SaveFrom, y2mate, dan situs downloader lainnya.",
    url: "https://getmova.my.id/compare",
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://getmova.my.id" },
        { "@type": "ListItem", position: 2, name: "Perbandingan", item: "https://getmova.my.id/compare" },
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
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-4">
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
                <li><Link href="/" className="hover:text-[#10B981] transition-colors">Beranda</Link></li>
                <li><ChevronRight className="h-3.5 w-3.5" /></li>
                <li className="text-[#10B981] font-medium">Perbandingan</li>
              </ol>
            </nav>

            <div className="text-center mb-12">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium tracking-wider uppercase border border-border text-muted-foreground mb-6">
                <Trophy className="h-3 w-3 text-[#10B981]" />
                Perbandingan
              </span>
              <h1
                className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground mb-4 mt-4"
                style={{ fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif" }}
              >
                Mova vs <span className="gradient-text">Kompetitor</span>
              </h1>
              <p className="text-muted-foreground text-sm max-w-2xl mx-auto leading-relaxed">
                Perbandingan jujur fitur Mova dengan situs downloader populer. Data berdasarkan pengujian langsung pada Mei 2026.
              </p>
            </div>

            {/* Score summary */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
              {COMPETITORS.map((comp) => {
                const key = comp.key as keyof Feature;
                const score = FEATURES.filter((f) => f[key] === "yes").length;
                const isMova = comp.highlight;
                return (
                  <div
                    key={comp.key}
                    className={`p-4 rounded-xl text-center border ${
                      isMova
                        ? "bg-[#10B981]/10 border-[#10B981]/30 ring-2 ring-[#10B981]/20"
                        : "bg-card border-border"
                    }`}
                  >
                    {isMova && (
                      <span className="inline-block text-[10px] font-bold text-[#10B981] bg-[#10B981]/10 px-2 py-0.5 rounded-md mb-2">
                        TERBAIK
                      </span>
                    )}
                    <p
                      className={`text-lg font-bold ${isMova ? "text-[#10B981]" : "text-foreground"}`}
                      style={{ fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif" }}
                    >
                      {comp.label}
                    </p>
                    <p className="text-3xl font-bold text-foreground mt-1">
                      {score}<span className="text-base text-muted-foreground">/{FEATURES.length}</span>
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Comparison table */}
            <div className="rounded-2xl border border-border overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="text-left py-3 px-4 text-muted-foreground font-semibold text-xs min-w-[180px]">Fitur</th>
                    {COMPETITORS.map((comp) => (
                      <th
                        key={comp.key}
                        className={`text-center py-3 px-3 text-xs font-bold min-w-[90px] ${
                          comp.highlight ? "text-[#10B981]" : "text-muted-foreground"
                        }`}
                      >
                        {comp.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {FEATURES.map((feature, i) => (
                    <tr
                      key={i}
                      className={`border-b border-border/50 ${i % 2 === 0 ? "bg-card" : "bg-muted/10"}`}
                    >
                      <td className="py-2.5 px-4 text-foreground text-xs font-medium">{feature.name}</td>
                      {COMPETITORS.map((comp) => {
                        const key = comp.key as keyof Feature;
                        return (
                          <td key={comp.key} className="text-center py-2.5 px-3">
                            <CellIcon value={feature[key] as CellValue} />
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Legend */}
            <div className="flex items-center justify-center gap-6 mt-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-emerald-500" /> Ya</span>
              <span className="flex items-center gap-1.5"><Minus className="h-3.5 w-3.5 text-amber-500" /> Sebagian</span>
              <span className="flex items-center gap-1.5"><X className="h-3.5 w-3.5 text-red-400" /> Tidak</span>
            </div>

            {/* Why Mova wins */}
            <div className="mt-12">
              <h2
                className="text-xl font-bold text-foreground mb-6"
                style={{ fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif" }}
              >
                Kenapa <span className="gradient-text">Mova Lebih Baik</span>?
              </h2>
              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  {
                    icon: Shield,
                    title: "Lebih Aman",
                    desc: "Tanpa pop-up, tanpa redirect mencurigakan, dan cookie consent transparan. Privasi kamu dijaga.",
                  },
                  {
                    icon: Zap,
                    title: "Lebih Lengkap",
                    desc: "9 platform didukung (TikTok, YouTube, Instagram, Facebook, Twitter/X, Pinterest, Reddit, Telegram), MP3, tools interaktif.",
                  },
                  {
                    icon: Globe,
                    title: "Lebih Modern",
                    desc: "Dark mode, PWA, reading progress, share buttons, blog panduan, dan desain responsif terbaik.",
                  },
                ].map((item, i) => (
                  <div key={i} className="p-5 rounded-xl bg-card border border-border">
                    <item.icon className="h-6 w-6 text-[#10B981] mb-3" />
                    <h3
                      className="text-sm font-bold text-foreground mb-1.5"
                      style={{ fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif" }}
                    >
                      {item.title}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Disclaimer */}
            <div className="mt-8 p-4 rounded-xl bg-muted/30 border border-border">
              <p className="text-xs text-muted-foreground leading-relaxed">
                <strong>Disclaimer:</strong> Perbandingan ini berdasarkan pengujian pada Mei 2026. Fitur kompetitor bisa berubah sewaktu-waktu. Kami berusaha memberikan informasi yang akurat dan jujur. Jika ada data yang perlu diperbarui, hubungi kami melalui halaman kontak.
              </p>
            </div>

            {/* CTA */}
            <div className="mt-10 p-6 sm:p-8 rounded-xl bg-gradient-to-br from-[#10B981]/20 to-[#34D399]/10 border border-[#10B981]/30 text-center">
              <h2
                className="text-xl font-bold text-foreground mb-2"
                style={{ fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif" }}
              >
                Coba Mova Sekarang — Gratis!
              </h2>
              <p className="text-muted-foreground mb-5 text-sm max-w-md mx-auto">
                Rasakan sendiri video downloader terbaik. Tanpa watermark, tanpa pop-up, dan 100% gratis.
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 bg-[#10B981] text-white font-semibold rounded-xl hover:bg-[#059669] px-8 h-12 text-base transition-colors"
              >
                <Download className="h-5 w-5" />
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

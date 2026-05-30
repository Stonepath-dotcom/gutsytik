import type { Metadata } from "next";
import {
  Home,
  ChevronRight,
  Sparkles,
  Wrench,
  Shield,
  Zap,
  Globe,
  Mail,
  Download,
} from "lucide-react";
import { MovaLogo } from "@/components/mova-logo";
import { SitewideFooter } from "@/components/sitewide-footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Changelog - Update Terbaru Mova",
  description:
    "Lihat riwayat update dan fitur baru yang ditambahkan ke Mova. Pantau perkembangan fitur download video tanpa watermark terbaru.",
  alternates: { canonical: "https://getmova.my.id/changelog" },
  keywords: [
    "changelog mova",
    "update mova",
    "fitur baru mova",
    "riwayat update",
    "what's new mova",
  ],
  openGraph: {
    title: "Changelog - Update Terbaru Mova",
    description:
      "Lihat riwayat update dan fitur baru yang ditambahkan ke Mova.",
    url: "https://getmova.my.id/changelog",
    siteName: "getmova",
    type: "website",
  },
};

type ChangeTag = "new" | "improved" | "fixed" | "seo";

interface ChangelogEntry {
  version: string;
  date: string;
  title: string;
  description: string;
  changes: { tag: ChangeTag; text: string }[];
}

const TAG_CONFIG: Record<ChangeTag, { label: string; color: string; bg: string }> = {
  new: { label: "Baru", color: "text-emerald-700 dark:text-emerald-400", bg: "bg-emerald-100 dark:bg-emerald-900/30" },
  improved: { label: "Ditingkatkan", color: "text-blue-700 dark:text-blue-400", bg: "bg-blue-100 dark:bg-blue-900/30" },
  fixed: { label: "Perbaikan", color: "text-amber-700 dark:text-amber-400", bg: "bg-amber-100 dark:bg-amber-900/30" },
  seo: { label: "SEO", color: "text-purple-700 dark:text-purple-400", bg: "bg-purple-100 dark:bg-purple-900/30" },
};

const CHANGELOG: ChangelogEntry[] = [
  {
    version: "2.5",
    date: "30 Mei 2026",
    title: "TikTok Photo Slide Downloader",
    description:
      "Fitur baru download slide foto TikTok! Deteksi otomatis photo carousel, download foto satu per satu atau sekaligus, dan ekstrak audio MP3 dari slide.",
    changes: [
      { tag: "new", text: "Download slide foto TikTok — deteksi otomatis photo carousel dari tikwm API" },
      { tag: "new", text: "Image Grid UI — tampilkan semua foto dari slide dalam grid dengan nomor urut" },
      { tag: "new", text: "Download Semua Foto — satu klik untuk mengunduh seluruh foto sekaligus" },
      { tag: "new", text: "Download foto individual — klik per foto untuk download satu per satu" },
      { tag: "new", text: "Ekstrak audio MP3 dari slide foto TikTok" },
      { tag: "new", text: "Halaman dedicated /tiktok-photo-slide dengan SEO & JSON-LD" },
      { tag: "improved", text: "API download TikTok mendukung images array (photo slide detection)" },
      { tag: "improved", text: "Result card di homepage, platform pages, dan download form mendukung photo slide" },
      { tag: "improved", text: "FAQ TikTok downloader diupdate — slideshow bisa download foto terpisah" },
      { tag: "seo", text: "Sitemap & footer ditambah link TikTok Photo Slide" },
    ],
  },
  {
    version: "2.4",
    date: "30 Mei 2026",
    title: "Changelog Page & Scroll Spy TOC",
    description:
      "Halaman changelog baru untuk transparansi perkembangan, scroll spy pada daftar isi blog, author box di artikel, dan newsletter CTA.",
    changes: [
      { tag: "new", text: "Halaman Changelog dengan timeline design yang informatif" },
      { tag: "new", text: "Scroll Spy pada Table of Contents — heading aktif otomatis di-highlight" },
      { tag: "new", text: "Author Box di bawah setiap artikel blog untuk trust signal" },
      { tag: "new", text: "Newsletter CTA section di dalam artikel blog" },
      { tag: "new", text: "Video Resolution Comparator tool di /tools/resolution-comparator" },
      { tag: "new", text: "Halaman Tools Index di /tools sebagai hub central semua tools" },
      { tag: "improved", text: "Navigasi footer ditambah link Changelog & Tools" },
    ],
  },
  {
    version: "2.3",
    date: "28 Mei 2026",
    title: "Social Share & PWA Improvements",
    description:
      "Fitur share ke WhatsApp/Twitter/Facebook/Telegram, back-to-top button, reading progress bar, tag filter blog, dan keyboard shortcuts.",
    changes: [
      { tag: "new", text: "Social Share Buttons di artikel blog (WhatsApp, Twitter/X, Facebook, Telegram, Copy Link)" },
      { tag: "new", text: "Back to Top Button — muncul setelah scroll 400px" },
      { tag: "new", text: "Reading Progress Bar — progress hijau gradient di artikel blog" },
      { tag: "new", text: "Blog Tag Filter — 14 tag, multi-select, auto-tagging" },
      { tag: "new", text: "Keyboard Shortcuts Modal (Ctrl+K)" },
      { tag: "new", text: "PWA Offline Fallback page dengan auto-reload" },
      { tag: "improved", text: "Service Worker v2 — network-first HTML, cache-first static assets" },
      { tag: "seo", text: "Video Format Comparison tool dengan JSON-LD FAQ schema" },
    ],
  },
  {
    version: "2.2",
    date: "25 Mei 2026",
    title: "AdSense Compliance & Cookie Consent",
    description:
      "Google Consent Mode v2, cookie consent dengan 3 kategori, GA4 ID unifikasi, dan app-ads.txt untuk PWA.",
    changes: [
      { tag: "new", text: "Google Consent Mode v2 — default denied, update on consent" },
      { tag: "new", text: "Cookie Consent dengan 3 kategori (Essential, Analytics, Advertising)" },
      { tag: "fixed", text: "GA4 ID unifikasi ke G-C72K54R633 di semua komponen" },
      { tag: "fixed", text: "AdSense & GA4 hanya load setelah user consent" },
      { tag: "seo", text: "app-ads.txt untuk PWA compliance" },
      { tag: "seo", text: "Schema Organization — hapus fake social URLs" },
    ],
  },
  {
    version: "2.1",
    date: "22 Mei 2026",
    title: "Auto-Blog System & AI Content",
    description:
      "Sistem auto-blog dengan AI generation, 19 automation endpoints, dan image generation otomatis.",
    changes: [
      { tag: "new", text: "Auto-blog system dengan z-ai-web-dev-sdk" },
      { tag: "new", text: "19 automation API endpoints untuk SEO & content" },
      { tag: "new", text: "Auto image generation untuk blog posts via zai.images" },
      { tag: "new", text: "Blog search dengan real-time filtering" },
      { tag: "new", text: "Vercel Cron Job untuk auto-publish blog" },
      { tag: "improved", text: "ISR revalidation setiap 6 jam untuk blog pages" },
      { tag: "seo", text: "JSON-LD structured data (Article, FAQ, HowTo, Breadcrumb)" },
    ],
  },
  {
    version: "2.0",
    date: "18 Mei 2026",
    title: "Dark Mode & UI Overhaul",
    description:
      "Dark/light mode toggle, desktop font fixes, WhatsApp icon, dan redesign UI komprehensif.",
    changes: [
      { tag: "new", text: "Dark/Light mode toggle dengan smooth transition" },
      { tag: "new", text: "Konami Code easter egg" },
      { tag: "new", text: "Cursor trail effect" },
      { tag: "new", text: "Confetti effect saat download berhasil" },
      { tag: "new", text: "Live ticker menampilkan platform support" },
      { tag: "improved", text: "Desktop font rendering fixes (Montserrat + Geist)" },
      { tag: "fixed", text: "Responsive layout fixes untuk semua downloader pages" },
    ],
  },
  {
    version: "1.5",
    date: "12 Mei 2026",
    title: "Tools & Interactive Features",
    description:
      "Video trim tool, GIF converter, file size calculator, dan format comparison.",
    changes: [
      { tag: "new", text: "Video Trim Tool di /tools/trim-video" },
      { tag: "new", text: "Convert to GIF Tool di /tools/convert-gif" },
      { tag: "new", text: "File Size Calculator di /tools/file-size-calculator" },
      { tag: "new", text: "Format Comparison Tool di /tools/format-comparison" },
      { tag: "new", text: "PWA Install Prompt" },
      { tag: "new", text: "Error Boundary component" },
      { tag: "improved", text: "Download Streak counter" },
    ],
  },
  {
    version: "1.0",
    date: "1 Mei 2026",
    title: "Launch — Mova Video Downloader",
    description:
      "Rilis pertama Mova! Download video tanpa watermark dari TikTok, Instagram, YouTube, Facebook, Twitter/X, Pinterest, Reddit, dan Telegram.",
    changes: [
      { tag: "new", text: "Download video TikTok tanpa watermark" },
      { tag: "new", text: "Download video Instagram (Reels, Story, Post)" },
      { tag: "new", text: "Download video YouTube (video & MP3)" },
      { tag: "new", text: "Download video Facebook HD" },
      { tag: "new", text: "Download video Twitter/X tanpa watermark" },
      { tag: "new", text: "Download video Pinterest & Reddit" },
      { tag: "new", text: "Download video dari Telegram" },
      { tag: "new", text: "Blog dengan 25+ artikel panduan" },
      { tag: "new", text: "FAQ, About, Contact, Privacy, Terms, DMCA, Disclaimer" },
      { tag: "seo", text: "Sitemap, RSS Feed, robots.txt, JSON-LD schemas" },
    ],
  },
];

export default function ChangelogPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Changelog - Update Terbaru Mova",
    description: "Riwayat update dan fitur baru yang ditambahkan ke Mova.",
    url: "https://getmova.my.id/changelog",
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://getmova.my.id" },
        { "@type": "ListItem", position: 2, name: "Changelog", item: "https://getmova.my.id/changelog" },
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
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <li>
                  <Link href="/" className="hover:text-[#10B981] transition-colors">Beranda</Link>
                </li>
                <li><ChevronRight className="h-3.5 w-3.5" /></li>
                <li className="text-[#10B981] font-medium">Changelog</li>
              </ol>
            </nav>

            <div className="text-center mb-16">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium tracking-wider uppercase border border-border text-muted-foreground mb-6">
                <Sparkles className="h-3 w-3 text-[#10B981]" />
                Changelog
              </span>
              <h1
                className="text-4xl sm:text-5xl font-light tracking-tight text-foreground mb-4 mt-4"
                style={{ fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif" }}
              >
                Riwayat <span className="font-bold text-[#10B981]">Update</span>
              </h1>
              <p className="text-muted-foreground text-sm max-w-2xl mx-auto leading-relaxed">
                Pantau perkembangan Mova dari waktu ke waktu. Setiap fitur baru, perbaikan, dan peningkatan dicatat di sini.
              </p>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
              {Object.entries(TAG_CONFIG).map(([key, config]) => (
                <span
                  key={key}
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${config.bg} ${config.color}`}
                >
                  {key === "new" && <Sparkles className="h-3 w-3" />}
                  {key === "improved" && <Zap className="h-3 w-3" />}
                  {key === "fixed" && <Shield className="h-3 w-3" />}
                  {key === "seo" && <Globe className="h-3 w-3" />}
                  {config.label}
                </span>
              ))}
            </div>

            {/* Timeline */}
            <div className="relative">
              <div className="absolute left-[19px] top-0 bottom-0 w-px bg-border hidden sm:block" />
              <div className="space-y-10">
                {CHANGELOG.map((entry) => (
                  <section key={entry.version} className="relative">
                    <div className="hidden sm:flex absolute left-0 top-1 w-10 h-10 rounded-full bg-card border-2 border-[#10B981] items-center justify-center z-10">
                      <span className="text-[10px] font-bold text-[#10B981]">{entry.version}</span>
                    </div>
                    <div className="sm:ml-16">
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <h2
                          className="text-xl font-bold text-foreground"
                          style={{ fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif" }}
                        >
                          v{entry.version} — {entry.title}
                        </h2>
                        <span className="text-xs text-muted-foreground bg-muted/50 px-2 py-0.5 rounded-md">{entry.date}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{entry.description}</p>
                      <div className="space-y-2">
                        {entry.changes.map((change, i) => {
                          const tagConfig = TAG_CONFIG[change.tag];
                          return (
                            <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-card border border-border">
                              <span className={`shrink-0 inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold ${tagConfig.bg} ${tagConfig.color}`}>
                                {tagConfig.label}
                              </span>
                              <span className="text-sm text-foreground leading-relaxed">{change.text}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </section>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="mt-16 p-6 sm:p-8 rounded-xl bg-gradient-to-br from-card to-background dark:from-[#111113] dark:to-[#0F0F11] border border-border text-center">
              <Sparkles className="h-8 w-8 text-[#10B981] mx-auto mb-4" />
              <h3
                className="text-lg font-bold text-foreground mb-2"
                style={{ fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif" }}
              >
                Terima Kasih Sudah Menggunakan Mova!
              </h3>
              <p className="text-sm text-muted-foreground max-w-md mx-auto mb-6 leading-relaxed">
                Kami terus mengembangkan Mova untuk memberikan pengalaman download video terbaik. Ada saran fitur? Hubungi kami!
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold bg-[#10B981] text-white hover:bg-[#059669] transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  Kirim Saran
                </Link>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium border border-border bg-card text-muted-foreground hover:text-foreground hover:border-muted-foreground/30 transition-colors"
                >
                  <Download className="h-4 w-4" />
                  Mulai Download
                </Link>
              </div>
            </div>
          </div>
        </main>

        <SitewideFooter />
      </div>
    </>
  );
}

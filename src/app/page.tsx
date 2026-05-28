"use client";

import React, { useState, useCallback, useRef, useEffect, createContext, useContext } from "react";
import { useTheme } from "next-themes";
import {
  Download, Zap, Shield, CheckCircle,
  Menu, X, ChevronDown, Play, Clock, User, Loader2,
  AlertCircle, Film, Sun, Moon,
  Share2, Bookmark, Copy, Eye, EyeOff,
  Link as LinkIcon, Monitor, Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MovaLogo } from "@/components/mova-logo";
import { useToast } from "@/hooks/use-toast";

/* ──────── Types ──────── */
interface QualityOption { label: string; resolution: string; url: string; originalUrl?: string; }
interface DownloadResult {
  title: string; thumbnail: string; duration: string;
  author: string; platform: string; downloadUrl: string; originalDownloadUrl?: string;
  qualityOptions: QualityOption[]; filename: string;
}
interface HistoryItem {
  id: string; title: string; platform: string; author: string;
  thumbnail: string; duration: string; url: string;
  downloadUrl: string; timestamp: number;
}
interface BookmarkItem {
  id: string; title: string; platform: string; author: string;
  thumbnail: string; duration: string; url: string; timestamp: number;
}

/* ──────── Platform SVG Icons ──────── */
function TikTokIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.43V13a8.28 8.28 0 005.58 2.15V11.7a4.83 4.83 0 01-3.77-1.24V6.69h3.77z"/>
    </svg>
  );
}
function InstagramIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
    </svg>
  );
}
function FacebookIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );
}
function TwitterXIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  );
}
function PinterestIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12.017 24c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641 0 12.017 0z"/>
    </svg>
  );
}
function RedditIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
    </svg>
  );
}

/* ──────── Platform Data (NO YouTube) ──────── */
interface PlatformDef {
  name: string;
  color: string;
  gradient?: string;
  Icon: React.ComponentType<{ className?: string }>;
}

const PLATFORMS: PlatformDef[] = [
  { name: "TikTok", color: "#010101", Icon: TikTokIcon },
  { name: "Instagram", gradient: "linear-gradient(135deg, #833AB4, #FD1D1D, #F77737)", Icon: InstagramIcon },
  { name: "Facebook", color: "#1877F2", Icon: FacebookIcon },
  { name: "Twitter/X", color: "#14171A", Icon: TwitterXIcon },
  { name: "Pinterest", color: "#E60023", Icon: PinterestIcon },
  { name: "Reddit", color: "#FF4500", Icon: RedditIcon },
];

function getPlatformDef(name: string): PlatformDef {
  return PLATFORMS.find(p => p.name === name) || { name, color: "#6B7280", Icon: Play };
}

/* ──────── Constants ──────── */
const HISTORY_KEY = "mova_history";
const BOOKMARK_KEY = "mova_bookmarks";
const LANG_KEY = "mova_lang";
const MAX_HISTORY = 20;
const ACCENT = "#E52222";

/* ──────── Translations (ID/EN) — NO YouTube references ──────── */
const translations: Record<string, Record<string, string>> = {
  id: {
    "nav.fitur": "Fitur", "nav.caraPakai": "Cara Pakai", "nav.platform": "Platform", "nav.faq": "FAQ", "nav.download": "Download",
    "hero.badge": "100% Gratis & Tanpa Watermark",
    "hero.titleLine1": "Online Video",
    "hero.titleLine2": "Downloader",
    "hero.subtitle": "Download video dari TikTok, Instagram, Facebook, Twitter/X, Pinterest, Reddit dan banyak platform lainnya tanpa watermark.",
    "input.placeholder": "Insert Video Link Here...",
    "btn.download": "Download", "btn.downloadNoWM": "Download Tanpa Watermark",
    "result.found": "Video berhasil ditemukan!",
    "result.selectQuality": "Pilih kualitas:", "result.preview": "Preview", "result.share": "Bagikan",
    "result.bookmark": "Bookmark", "result.bookmarked": "Tersimpan", "result.downloadThumb": "Thumbnail",
    "result.copyCaption": "Salin Caption", "result.captionCopied": "Caption disalin!",
    "features.title": "Kenapa Harus GetMova?", "features.subtitle": "Download video tanpa watermark dari berbagai platform populer dengan cepat dan mudah.",
    "how.title": "Cara Menggunakan GetMova", "how.subtitle": "Hanya 3 langkah mudah untuk download video tanpa watermark.",
    "how.step1Title": "Find Video", "how.step1Desc": "Temukan video yang ingin didownload dan salin link-nya dari platform.",
    "how.step2Title": "Paste Link", "how.step2Desc": "Tempel link video yang sudah disalin di kolom input di atas.",
    "how.step3Title": "Download", "how.step3Desc": "Klik tombol Download dan pilih kualitas video yang diinginkan.",
    "platforms.title": "Platform yang Didukung", "platforms.subtitle": "Download video dari berbagai platform sosial media populer.",
    "freeVid.badge": "Free", "freeVid.title": "Video Downloader", "freeVid.desc": "GetMova adalah video downloader gratis terbaik untuk download video tanpa watermark dari berbagai platform sosial media. Cepat, mudah, dan 100% gratis.",
    "freeVid.btn": "Learn More",
    "featureCard1.title": "Fast Download", "featureCard1.desc": "Proses download instan dengan server cepat. Tidak perlu menunggu lama untuk mendapatkan video favoritmu.",
    "featureCard2.title": "HD Quality", "featureCard2.desc": "Download video dalam kualitas tinggi hingga 1080p. Kualitas asli video selalu dipertahankan.",
    "featureCard3.title": "No Watermark", "featureCard3.desc": "Semua video didownload tanpa watermark. Hasil download bersih dan siap dibagikan.",
    "whyChoose.title": "Why Choose GetMova",
    "whyCard1.title": "Free", "whyCard1.desc": "100% gratis tanpa biaya tersembunyi. Download sepuasnya tanpa batas.",
    "whyCard2.title": "No Registration", "whyCard2.desc": "Tidak perlu daftar atau login. Langsung paste link dan download.",
    "whyCard3.title": "Multi-Platform", "whyCard3.desc": "Mendukung TikTok, Instagram, Facebook, Twitter/X, Pinterest, Reddit.",
    "whyCard4.title": "Safe & Secure", "whyCard4.desc": "Semua proses dilakukan secara aman dan terenkripsi. Privasi terjaga.",
    "faq.title": "Frequently Asked Questions",
    "faq.subtitle": "Temukan jawaban dari pertanyaan umum tentang GetMova.",
    "footer.desc": "Download video tanpa watermark dari berbagai platform populer. Cepat, gratis, dan mudah.",
    "error.emptyUrl": "Masukkan link video terlebih dahulu!",
    "error.invalidUrl": "URL tidak valid. Pastikan link yang dimasukkan benar.",
    "error.server": "Gagal terhubung ke server. Silakan coba lagi.",
    "error.downloadFail": "Gagal mengunduh video. Coba klik kanan pada tombol download dan pilih 'Save link as...'",
    "toast.videoFound": "Video ditemukan!", "toast.selectQuality": "Pilih kualitas dan download.",
    "toast.downloadStart": "Download dimulai!", "toast.linkCopied": "Link berhasil disalin!",
    "toast.bookmarkAdded": "Video disimpan ke bookmark!", "toast.bookmarkRemoved": "Bookmark dihapus.",
    "Baru saja": "Baru saja", "menit lalu": "menit lalu", "jam lalu": "jam lalu", "hari lalu": "hari lalu",
  },
  en: {
    "nav.fitur": "Features", "nav.caraPakai": "How to Use", "nav.platform": "Platforms", "nav.faq": "FAQ", "nav.download": "Download",
    "hero.badge": "100% Free & No Watermark",
    "hero.titleLine1": "Online Video",
    "hero.titleLine2": "Downloader",
    "hero.subtitle": "Download videos from TikTok, Instagram, Facebook, Twitter/X, Pinterest, Reddit and many other platforms without watermark.",
    "input.placeholder": "Insert Video Link Here...",
    "btn.download": "Download", "btn.downloadNoWM": "Download Without Watermark",
    "result.found": "Video found successfully!",
    "result.selectQuality": "Select quality:", "result.preview": "Preview", "result.share": "Share",
    "result.bookmark": "Bookmark", "result.bookmarked": "Saved", "result.downloadThumb": "Thumbnail",
    "result.copyCaption": "Copy Caption", "result.captionCopied": "Caption copied!",
    "features.title": "Why Choose GetMova?", "features.subtitle": "Download videos without watermark from various popular platforms quickly and easily.",
    "how.title": "How to Use GetMova", "how.subtitle": "Just 3 easy steps to download videos without watermark.",
    "how.step1Title": "Find Video", "how.step1Desc": "Find the video you want to download and copy its link from the platform.",
    "how.step2Title": "Paste Link", "how.step2Desc": "Paste the copied video link into the input field above.",
    "how.step3Title": "Download", "how.step3Desc": "Click the Download button and select your preferred video quality.",
    "platforms.title": "Supported Platforms", "platforms.subtitle": "Download videos from various popular social media platforms.",
    "freeVid.badge": "Free", "freeVid.title": "Video Downloader", "freeVid.desc": "GetMova is the best free video downloader to download videos without watermark from various social media platforms. Fast, easy, and 100% free.",
    "freeVid.btn": "Learn More",
    "featureCard1.title": "Fast Download", "featureCard1.desc": "Instant download process with fast servers. No need to wait long to get your favorite videos.",
    "featureCard2.title": "HD Quality", "featureCard2.desc": "Download videos in high quality up to 1080p. Original video quality is always preserved.",
    "featureCard3.title": "No Watermark", "featureCard3.desc": "All videos are downloaded without watermark. Clean results ready to share.",
    "whyChoose.title": "Why Choose GetMova",
    "whyCard1.title": "Free", "whyCard1.desc": "100% free with no hidden costs. Download as many as you want without limits.",
    "whyCard2.title": "No Registration", "whyCard2.desc": "No need to sign up or login. Just paste the link and download.",
    "whyCard3.title": "Multi-Platform", "whyCard3.desc": "Supports TikTok, Instagram, Facebook, Twitter/X, Pinterest, Reddit.",
    "whyCard4.title": "Safe & Secure", "whyCard4.desc": "All processes are done securely and encrypted. Your privacy is protected.",
    "faq.title": "Frequently Asked Questions",
    "faq.subtitle": "Find answers to common questions about GetMova.",
    "footer.desc": "Download videos without watermark from popular platforms. Fast, free, and easy.",
    "error.emptyUrl": "Please enter a video link first!",
    "error.invalidUrl": "Invalid URL. Make sure the link is correct.",
    "error.server": "Failed to connect to server. Please try again.",
    "error.downloadFail": "Failed to download video. Try right-clicking the download button and select 'Save link as...'",
    "toast.videoFound": "Video found!", "toast.selectQuality": "Select quality and download.",
    "toast.downloadStart": "Download started!", "toast.linkCopied": "Link copied successfully!",
    "toast.bookmarkAdded": "Video saved to bookmarks!", "toast.bookmarkRemoved": "Bookmark removed.",
    "Baru saja": "Just now", "menit lalu": "min ago", "jam lalu": "hr ago", "hari lalu": "days ago",
  },
};

/* ──────── Language Context ──────── */
type Lang = "id" | "en";
const LanguageContext = createContext<{ lang: Lang; setLang: (l: Lang) => void; t: (key: string) => string }>({
  lang: "id", setLang: () => {}, t: (k) => k,
});
function useLanguage() { return useContext(LanguageContext); }

function getInitialLang(): Lang {
  if (typeof window === "undefined") return "id";
  try { const s = localStorage.getItem(LANG_KEY) as Lang | null; if (s === "id" || s === "en") return s; } catch {}
  return "id";
}

function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(getInitialLang);
  const setLang = useCallback((l: Lang) => { setLangState(l); try { localStorage.setItem(LANG_KEY, l); } catch {} }, []);
  const t = useCallback((key: string) => translations[lang]?.[key] || translations.id[key] || key, [lang]);
  return <LanguageContext.Provider value={{ lang, setLang, t }}>{children}</LanguageContext.Provider>;
}

/* ──────── Utility Functions ──────── */
function getHistory(): HistoryItem[] {
  if (typeof window === "undefined") return [];
  try { const d = localStorage.getItem(HISTORY_KEY); return d ? JSON.parse(d) : []; } catch { return []; }
}
function saveToHistory(item: HistoryItem) {
  try {
    const h = getHistory().filter(x => x.url !== item.url);
    h.unshift(item);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(h.slice(0, MAX_HISTORY)));
    window.dispatchEvent(new Event("mova:history-changed"));
  } catch {}
}
function getBookmarks(): BookmarkItem[] {
  if (typeof window === "undefined") return [];
  try { const d = localStorage.getItem(BOOKMARK_KEY); return d ? JSON.parse(d) : []; } catch { return []; }
}
function saveBookmark(item: BookmarkItem) {
  try {
    const b = getBookmarks();
    if (b.some(x => x.url === item.url)) return;
    b.unshift(item);
    localStorage.setItem(BOOKMARK_KEY, JSON.stringify(b));
    window.dispatchEvent(new Event("mova:bookmarks-changed"));
  } catch {}
}
function removeBookmark(url: string) {
  try {
    localStorage.setItem(BOOKMARK_KEY, JSON.stringify(getBookmarks().filter(b => b.url !== url)));
    window.dispatchEvent(new Event("mova:bookmarks-changed"));
  } catch {}
}
function isBookmarked(url: string): boolean { return getBookmarks().some(b => b.url === url); }

function detectPlatform(urlStr: string): string {
  try {
    const h = new URL(urlStr).hostname.toLowerCase();
    if (h.includes("tiktok") || h.includes("vm.tiktok")) return "TikTok";
    if (h.includes("instagram")) return "Instagram";
    if (h.includes("twitter") || h.includes("x.com")) return "Twitter/X";
    if (h.includes("facebook") || h.includes("fb.watch") || h.includes("fb.com")) return "Facebook";
    if (h.includes("pinterest")) return "Pinterest";
    if (h.includes("reddit")) return "Reddit";
  } catch {}
  return "Unknown";
}

/* ══════════════════════════════════════════════════
   NAVBAR — Clean White
   ══════════════════════════════════════════════════ */
function Navbar() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { setTheme, theme } = useTheme();
  const { lang, setLang, t } = useLanguage();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  const navLinks = [
    { label: "Home", href: "#hero" },
    { label: t("nav.caraPakai"), href: "#how" },
    { label: t("nav.fitur"), href: "#features" },
    { label: t("nav.platform"), href: "#platforms" },
    { label: t("nav.faq"), href: "#faq" },
  ];

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);
    return () => { document.removeEventListener("mousedown", handler); document.removeEventListener("touchstart", handler); };
  }, [open]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-[#1A1A1A]/90 backdrop-blur-md border-b border-gray-100 dark:border-white/5">
      <div className="mx-auto max-w-6xl h-14 md:h-16 flex items-center justify-between px-4 md:px-6">
        <a href="/" className="flex items-center gap-1.5 shrink-0" aria-label="GetMova - Home">
          <MovaLogo size={28} showText={true} />
        </a>

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map(l => (
            <a key={l.href} href={l.href} className="px-3 py-2 text-sm font-medium text-gray-600 dark:text-white/60 hover:text-[#E52222] dark:hover:text-white transition-colors rounded-lg hover:bg-gray-50 dark:hover:bg-white/5">{l.label}</a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <button onClick={() => setLang(lang === "id" ? "en" : "id")} className="h-9 w-9 flex items-center justify-center rounded-lg text-gray-600 dark:text-white/60 dark:hover:text-white dark:hover:bg-white/10 hover:text-[#E52222] hover:bg-gray-50 transition-colors text-xs font-bold" aria-label="Toggle language">
            {lang === "id" ? "EN" : "ID"}
          </button>
          <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="h-9 w-9 flex items-center justify-center rounded-lg text-gray-600 dark:text-white/60 dark:hover:text-white dark:hover:bg-white/10 hover:text-[#E52222] hover:bg-gray-50 transition-colors" aria-label="Toggle theme">
            {mounted ? (theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />) : <Moon className="h-4 w-4" />}
          </button>
          <a href="#hero">
            <Button size="sm" className="h-9 px-5 bg-[#E52222] hover:bg-[#CC1C1C] text-white font-semibold rounded-lg text-sm">
              <Download className="mr-1.5 h-3.5 w-3.5" />{t("nav.download")}
            </Button>
          </a>
        </div>

        <div className="flex md:hidden items-center gap-1">
          <button onClick={() => setLang(lang === "id" ? "en" : "id")} className="h-8 w-8 flex items-center justify-center rounded-lg text-gray-600 dark:text-white/60 text-[10px] font-bold">{lang === "id" ? "EN" : "ID"}</button>
          <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="h-8 w-8 flex items-center justify-center rounded-lg text-gray-600 dark:text-white/60">
            {mounted ? (theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />) : <Moon className="h-4 w-4" />}
          </button>
          <button onClick={() => setOpen(!open)} className="h-8 w-8 flex items-center justify-center rounded-lg text-gray-600 dark:text-white/60" aria-label="Menu">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div ref={menuRef} className="md:hidden bg-white dark:bg-[#2D2D2D] border-t border-gray-100 dark:border-white/5">
          <div className="px-4 py-3 space-y-0.5">
            {navLinks.map(l => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="block px-3 py-2.5 text-sm font-medium text-gray-600 dark:text-white/60 dark:hover:text-white dark:hover:bg-white/10 hover:text-[#E52222] hover:bg-gray-50 rounded-lg transition-colors">{l.label}</a>
            ))}
            <a href="#hero" onClick={() => setOpen(false)} className="block pt-1">
              <Button className="w-full bg-[#E52222] hover:bg-[#CC1C1C] text-white font-semibold rounded-lg">
                <Download className="mr-2 h-4 w-4" />{t("nav.download")}
              </Button>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

/* ══════════════════════════════════════════════════
   HERO — Full-width with Background Image
   ══════════════════════════════════════════════════ */
function HeroSection() {
  const { t } = useLanguage();
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DownloadResult | null>(null);
  const [error, setError] = useState("");
  const [selectedQuality, setSelectedQuality] = useState(0);
  const [isBookmarkedState, setIsBookmarkedState] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [previewError, setPreviewError] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState("");
  const resultRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast, dismiss } = useToast();

  const showToast = useCallback((title: string, desc: string, variant: "default" | "destructive" = "default") => {
    const id = toast({ title, description: desc, variant });
    setTimeout(() => dismiss(id), 3000);
  }, [toast, dismiss]);

  useEffect(() => {
    if (result) setIsBookmarkedState(isBookmarked(result.downloadUrl));
  }, [result]);

  const handleAnalyze = useCallback(async () => {
    const trimmed = url.trim();
    if (!trimmed) { setError(t("error.emptyUrl")); return; }
    try { new URL(trimmed.startsWith("www.") ? "https://" + trimmed : trimmed); } catch { setError(t("error.invalidUrl")); return; }

    setLoading(true);
    setError("");
    setResult(null);
    setLoadingMsg("Finding video...");

    const msgs = ["Finding video...", "Getting download link...", "Almost done..."];
    let msgIdx = 0;
    const msgInterval = setInterval(() => {
      msgIdx = Math.min(msgIdx + 1, msgs.length - 1);
      setLoadingMsg(msgs[msgIdx]);
    }, 5000);

    try {
      const res = await fetch("/api/download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: trimmed }),
      });
      const data = await res.json();
      if (res.ok) {
        setResult(data);
        setSelectedQuality(0);
        setShowPreview(false);
        setPreviewError(false);
        showToast(t("toast.videoFound"), t("toast.selectQuality"));
        setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 300);
      } else {
        setError(data.error || t("error.server"));
      }
    } catch {
      setError(t("error.server"));
    } finally {
      clearInterval(msgInterval);
      setLoading(false);
      setLoadingMsg("");
    }
  }, [url, t, showToast]);

  const handleDownload = useCallback(async () => {
    if (!result || downloading) return;
    const q = result.qualityOptions[selectedQuality];
    if (!q) { showToast(t("error.downloadFail"), "", "destructive"); return; }

    const ext = q.resolution === "MP3" ? ".mp3" : ".mp4";
    const downloadName = (result.filename || `getmova_${Date.now()}`) + `_${q.label}${ext}`;
    const downloadUrl = q.url;
    const fallbackUrl = q.originalUrl || q.url;

    setDownloading(true);

    try {
      try {
        const a = document.createElement("a");
        a.href = downloadUrl; a.download = downloadName; a.target = "_blank"; a.rel = "noopener noreferrer"; a.style.display = "none";
        document.body.appendChild(a); a.click(); document.body.removeChild(a);
        saveToHistory({ id: Date.now().toString(), title: result.title, platform: result.platform, author: result.author, thumbnail: result.thumbnail, duration: result.duration, url: url.trim(), downloadUrl: fallbackUrl, timestamp: Date.now() });
        showToast(t("toast.downloadStart"), "");
        setDownloading(false);
        return;
      } catch (e) { console.log("<a> tag approach failed", e); }

      window.open(downloadUrl, "_blank");
      saveToHistory({ id: Date.now().toString(), title: result.title, platform: result.platform, author: result.author, thumbnail: result.thumbnail, duration: result.duration, url: url.trim(), downloadUrl: fallbackUrl, timestamp: Date.now() });
      showToast(t("toast.downloadStart"), "");
    } catch (e) {
      console.error("Download failed:", e);
      try { window.open(fallbackUrl, "_blank"); } catch { showToast(t("error.downloadFail"), "", "destructive"); }
    } finally {
      setDownloading(false);
    }
  }, [result, selectedQuality, url, t, showToast, downloading]);

  const handleShare = useCallback(async () => {
    if (!result) return;
    try { await navigator.share({ title: result.title, url: url }); } catch { try { await navigator.clipboard.writeText(url); showToast(t("toast.linkCopied"), ""); } catch {} }
  }, [result, url, t, showToast]);

  const handleToggleBookmark = useCallback(() => {
    if (!result) return;
    if (isBookmarkedState) {
      removeBookmark(result.downloadUrl);
      setIsBookmarkedState(false);
      showToast(t("toast.bookmarkRemoved"), "");
    } else {
      saveBookmark({ id: Date.now().toString(), title: result.title, platform: result.platform, author: result.author, thumbnail: result.thumbnail, duration: result.duration, url: url.trim(), timestamp: Date.now() });
      setIsBookmarkedState(true);
      showToast(t("toast.bookmarkAdded"), "");
    }
  }, [result, isBookmarkedState, url, t, showToast]);

  const handleCopyCaption = useCallback(async () => {
    if (!result) return;
    try { await navigator.clipboard.writeText(result.title); showToast(t("result.captionCopied"), ""); } catch {}
  }, [result, t, showToast]);

  const handleDownloadThumbnail = useCallback(async () => {
    if (!result?.thumbnail) return;
    try {
      const res = await fetch(result.thumbnail);
      const blob = await res.blob();
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob); a.download = `getmova_thumb_${Date.now()}.jpg`;
      document.body.appendChild(a); a.click(); document.body.removeChild(a);
      URL.revokeObjectURL(a.href);
    } catch {}
  }, [result]);

  return (
    <section id="hero" className="relative min-h-[85vh] md:min-h-screen flex items-center pt-16 md:pt-0 pb-8 md:pb-0">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img src="/hero-bg.png" alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30 dark:from-black/80 dark:via-black/70 dark:to-black/60" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl text-center w-full py-12 md:py-0 px-4 md:px-6">
        {/* Headline */}
        <p className="text-base md:text-lg font-medium text-gray-300 mb-2 tracking-wide uppercase">{t("hero.titleLine1")}</p>
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-4 md:mb-6 font-[family-name:var(--font-montserrat)] leading-[1.1] tracking-tight">
          {t("hero.titleLine2")}
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-white/60 mb-7 md:mb-10 max-w-xl md:max-w-2xl mx-auto leading-relaxed">
          {t("hero.subtitle")}
        </p>

        {/* Input Card */}
        <div className="relative max-w-2xl mx-auto">
          <div className="bg-white dark:bg-[#2D2D2D] rounded-xl shadow-xl p-3 md:p-4">
            <div className="space-y-2.5 md:space-y-0 md:flex md:items-center md:gap-2.5">
              <div className="flex-1 relative">
                <LinkIcon className="absolute left-3.5 md:left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  ref={inputRef}
                  value={url}
                  onChange={e => setUrl(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && handleAnalyze()}
                  placeholder={t("input.placeholder")}
                  className="h-12 md:h-14 bg-gray-50 dark:bg-[#1A1A1A] border-gray-200 dark:border-white/10 rounded-lg text-[15px] md:text-lg pl-10 md:pl-11 pr-4 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-white/30 focus:border-[#E52222]/50 focus:ring-2 focus:ring-[#E52222]/20"
                />
              </div>
              <Button onClick={handleAnalyze} disabled={loading} className="w-full md:w-auto h-12 md:h-14 px-6 md:px-8 bg-[#E52222] hover:bg-[#CC1C1C] text-white font-semibold rounded-lg active:scale-[0.98] shrink-0 text-[15px] md:text-base">
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4 mr-1.5" />}
                <span>{loading ? (loadingMsg || t("btn.download")) : t("btn.download")}</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Platform hints */}
        <div className="flex flex-wrap justify-center gap-1.5 md:gap-3 mt-5 md:mt-6">
          {PLATFORMS.map(p => (
            <span key={p.name} className="inline-flex items-center gap-1 text-[11px] md:text-[13px] text-white/40 hover:text-white/70 transition-colors font-medium px-2 py-1">
              <p.Icon className="h-3 w-3" />{p.name}
            </span>
          ))}
        </div>

        {/* Loading */}
        {loading && !error && (
          <div className="max-w-lg mx-auto mt-5 md:mt-6 p-3 rounded-xl bg-white dark:bg-[#2D2D2D] shadow-lg flex items-center gap-2">
            <Loader2 className="h-4 w-4 text-[#E52222] animate-spin shrink-0" />
            <p className="text-gray-700 dark:text-white text-[13px] md:text-sm text-left font-medium">{loadingMsg || "Processing..."}</p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="max-w-lg mx-auto mt-5 md:mt-6 p-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-500/20 flex items-start gap-2">
            <AlertCircle className="h-4 w-4 text-red-500 mt-0.5 shrink-0" />
            <p className="text-red-600 dark:text-red-400 text-[13px] md:text-sm text-left">{error}</p>
          </div>
        )}

        {/* Result card */}
        {result && (
          <div ref={resultRef} className="max-w-lg mx-auto mt-5 md:mt-6 rounded-xl bg-white dark:bg-[#2D2D2D] shadow-xl overflow-hidden text-left">
            <div className="px-3.5 md:px-4 py-2.5 border-b border-gray-100 dark:border-white/5 flex items-center gap-2 bg-gray-50 dark:bg-[#1A1A1A]">
              <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
              <span className="text-[13px] md:text-sm text-green-600 dark:text-green-400 font-medium">{t("result.found")}</span>
              <div className="ml-auto flex items-center gap-1.5">
                {(() => { const pd = getPlatformDef(result.platform); return (
                  <div className="w-5 h-5 rounded flex items-center justify-center" style={{ background: pd.gradient || pd.color }}>
                    <pd.Icon className="h-3 w-3 text-white" />
                  </div>
                ); })()}
                <span className="text-[11px] md:text-xs text-gray-500 dark:text-white/50 bg-gray-100 dark:bg-white/5 px-2 py-0.5 rounded-full">{result.platform}</span>
              </div>
            </div>

            <div className="p-3.5 md:p-4">
              {showPreview && !previewError ? (
                <div className="w-full rounded-lg overflow-hidden bg-gray-100 dark:bg-white/5 mb-3">
                  <video src={result.qualityOptions[0]?.originalUrl || result.qualityOptions[0]?.url} controls muted className="w-full object-contain" style={{ maxHeight: "200px" }} onError={() => setPreviewError(true)} />
                </div>
              ) : (
                <div className="flex gap-3 mb-3">
                  <div className="w-20 h-14 md:w-24 md:h-16 rounded-lg bg-gray-100 dark:bg-white/5 flex items-center justify-center shrink-0 overflow-hidden relative">
                    {result.thumbnail && <img src={result.thumbnail} alt={`Thumbnail: ${result.title}`} width={80} height={56} className="w-full h-full object-cover" loading="lazy" onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />}
                    <Play className="h-5 w-5 md:h-6 md:w-6 absolute text-[#E52222]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 dark:text-white text-[13px] md:text-sm line-clamp-2">{result.title}</h3>
                    <div className="flex items-center gap-3 mt-1 text-[11px] md:text-xs text-gray-500 dark:text-white/40">
                      {result.duration !== "--:--" && <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{result.duration}</span>}
                      <span className="flex items-center gap-1"><User className="h-3 w-3" />{result.author}</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex flex-wrap gap-0.5 mb-3">
                <Button variant="ghost" size="sm" onClick={() => { setShowPreview(!showPreview); setPreviewError(false); }} className="text-[11px] md:text-xs text-gray-500 dark:text-white/50 hover:text-[#E52222] dark:hover:text-white h-7">
                  {showPreview ? <EyeOff className="h-3 w-3 mr-1" /> : <Eye className="h-3 w-3 mr-1" />}{t("result.preview")}
                </Button>
                <Button variant="ghost" size="sm" onClick={handleShare} className="text-[11px] md:text-xs text-gray-500 dark:text-white/50 hover:text-[#E52222] dark:hover:text-white h-7">
                  <Share2 className="h-3 w-3 mr-1" />{t("result.share")}
                </Button>
                <Button variant="ghost" size="sm" onClick={handleToggleBookmark} className="text-[11px] md:text-xs h-7" style={{ color: isBookmarkedState ? ACCENT : undefined }}>
                  <Bookmark className={`h-3 w-3 mr-1 ${isBookmarkedState ? "fill-current" : ""}`} />{isBookmarkedState ? t("result.bookmarked") : t("result.bookmark")}
                </Button>
                {result.thumbnail && (
                  <Button variant="ghost" size="sm" onClick={handleDownloadThumbnail} className="text-[11px] md:text-xs text-gray-500 dark:text-white/50 hover:text-[#E52222] dark:hover:text-white h-7">
                    <Copy className="h-3 w-3 mr-1" />{t("result.downloadThumb")}
                  </Button>
                )}
                <Button variant="ghost" size="sm" onClick={handleCopyCaption} className="text-[11px] md:text-xs text-gray-500 dark:text-white/50 hover:text-[#E52222] dark:hover:text-white h-7">
                  <Copy className="h-3 w-3 mr-1" />{t("result.copyCaption")}
                </Button>
              </div>

              {result.qualityOptions.length > 0 && (
                <div className="mb-3">
                  <p className="text-[11px] md:text-xs font-medium text-gray-500 dark:text-white/50 mb-2 flex items-center gap-1.5">
                    <Film className="h-3 w-3 text-[#E52222]" />{t("result.selectQuality")}
                  </p>
                  <div className="flex flex-wrap gap-1.5 md:gap-2">
                    {result.qualityOptions.map((q, i) => {
                      const isSelected = selectedQuality === i;
                      return (
                        <button key={i} onClick={() => setSelectedQuality(i)} className={`flex items-center gap-1 text-[11px] md:text-xs px-2.5 md:px-3 py-1.5 rounded-lg border font-medium transition-all ${isSelected ? "text-white bg-[#E52222] border-[#E52222]" : "bg-gray-50 dark:bg-white/5 text-gray-600 dark:text-white/50 border-gray-200 dark:border-white/10 hover:border-[#E52222]/30"}`}>
                          <Film className="h-3 w-3" />
                          <span>{q.label}</span>
                          <span className="opacity-70">{q.resolution}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              <Button onClick={handleDownload} disabled={downloading} className="w-full h-10 md:h-11 bg-[#E52222] hover:bg-[#CC1C1C] text-white font-bold rounded-lg text-[13px] md:text-sm">
                {downloading ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Downloading...</>
                ) : (
                  <><Download className="mr-2 h-4 w-4" />{t("btn.downloadNoWM")}</>
                )}
              </Button>

              {result.qualityOptions[selectedQuality]?.originalUrl && (
                <a href={result.qualityOptions[selectedQuality].originalUrl} target="_blank" rel="noopener noreferrer" className="block mt-2 text-center text-[11px] md:text-xs text-gray-400 dark:text-white/40 hover:text-[#E52222] transition-colors underline underline-offset-2">
                  Open download link directly ↗
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════
   SUPPORTED PLATFORMS BAR — Dark Gray
   ══════════════════════════════════════════════════ */
function PlatformsBar() {
  const { t } = useLanguage();
  return (
    <section className="bg-[#2D2D2D] py-6 md:py-8 px-4 md:px-6">
      <div className="mx-auto max-w-6xl">
        <p className="text-center text-white/50 text-[11px] md:text-xs font-medium uppercase tracking-wider mb-4">{t("platforms.title")}</p>
        <div className="flex items-center justify-center gap-6 md:gap-10">
          {PLATFORMS.map(p => (
            <a key={p.name} href={`#${p.name.toLowerCase().replace('/','').replace(' ','-')}`} className="flex flex-col items-center gap-1.5 group">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 flex items-center justify-center text-white group-hover:bg-white/20 transition-colors">
                <p.Icon className="h-5 w-5 md:h-6 md:w-6" />
              </div>
              <span className="text-[10px] md:text-xs text-white/50 group-hover:text-white/80 transition-colors font-medium">{p.name}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════
   FREE VIDEO DOWNLOADER SECTION
   ══════════════════════════════════════════════════ */
function FreeVideoDownloaderSection() {
  const { t } = useLanguage();
  return (
    <section className="py-14 md:py-24 px-4 md:px-6 bg-white dark:bg-[#1A1A1A]" aria-labelledby="free-vid-heading">
      <div className="mx-auto max-w-4xl">
        <div className="bg-white dark:bg-[#2D2D2D] rounded-2xl shadow-lg p-6 md:p-10 flex flex-col md:flex-row items-center gap-6 md:gap-10">
          <div className="flex-1 text-center md:text-left">
            <span className="inline-block bg-[#E52222] text-white text-[11px] md:text-xs font-bold px-3 py-1 rounded-full mb-3">{t("freeVid.badge")}</span>
            <h2 id="free-vid-heading" className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1A1A1A] dark:text-white mb-3 font-[family-name:var(--font-montserrat)]">{t("freeVid.title")}</h2>
            <p className="text-sm md:text-base text-gray-500 dark:text-white/50 leading-relaxed mb-5">{t("freeVid.desc")}</p>
            <a href="#how">
              <Button className="bg-[#2D2D2D] hover:bg-[#3A3A3A] dark:bg-white dark:hover:bg-gray-200 dark:text-[#1A1A1A] text-white font-semibold rounded-lg h-10 md:h-11 px-6 text-[13px] md:text-sm">
                {t("freeVid.btn")}
              </Button>
            </a>
          </div>
          <div className="w-48 h-48 md:w-56 md:h-56 rounded-2xl bg-gradient-to-br from-[#E52222]/20 to-[#E52222]/5 flex items-center justify-center shrink-0">
            <Download className="h-16 w-16 md:h-20 md:w-20 text-[#E52222]" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════
   HOW TO USE SECTION
   ══════════════════════════════════════════════════ */
function HowToUseSection() {
  const { t } = useLanguage();
  const steps = [
    { num: "01", icon: LinkIcon, title: t("how.step1Title"), desc: t("how.step1Desc") },
    { num: "02", icon: Copy, title: t("how.step2Title"), desc: t("how.step2Desc") },
    { num: "03", icon: Download, title: t("how.step3Title"), desc: t("how.step3Desc") },
  ];
  return (
    <section id="how" className="py-14 md:py-24 px-4 md:px-6 bg-[#F5F5F5] dark:bg-[#1A1A1A]" aria-labelledby="how-heading">
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-10 md:mb-14">
          <h2 id="how-heading" className="text-xl sm:text-3xl md:text-4xl font-extrabold mb-2 md:mb-3 font-[family-name:var(--font-montserrat)] text-[#1A1A1A] dark:text-white">{t("how.title")}</h2>
          <p className="text-[13px] md:text-base text-gray-500 dark:text-white/50 max-w-md md:max-w-lg mx-auto">{t("how.subtitle")}</p>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          {/* Left: Illustration */}
          <div className="w-full md:w-1/2 flex items-center justify-center">
            <div className="w-48 h-48 md:w-72 md:h-72 rounded-2xl bg-gradient-to-br from-[#E52222] to-[#CC1C1C] flex items-center justify-center shadow-xl">
              <Play className="h-16 w-16 md:h-24 md:w-24 text-white" />
            </div>
          </div>

          {/* Right: Steps */}
          <div className="w-full md:w-1/2 space-y-6 md:space-y-8">
            {steps.map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={i} className="flex gap-4 md:gap-5">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#E52222] flex items-center justify-center shrink-0 text-white font-bold text-sm md:text-base">
                    {s.num}
                  </div>
                  <div>
                    <h3 className="text-base md:text-lg font-bold text-[#1A1A1A] dark:text-white mb-1">{s.title}</h3>
                    <p className="text-[13px] md:text-sm text-gray-500 dark:text-white/50 leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════
   FEATURE CARDS (01, 02, 03) — Dark Gray Background
   ══════════════════════════════════════════════════ */
function FeatureCardsSection() {
  const { t } = useLanguage();
  const features = [
    { num: "01", icon: Zap, title: t("featureCard1.title"), desc: t("featureCard1.desc") },
    { num: "02", icon: Film, title: t("featureCard2.title"), desc: t("featureCard2.desc") },
    { num: "03", icon: Sparkles, title: t("featureCard3.title"), desc: t("featureCard3.desc") },
  ];
  return (
    <section id="features" className="py-14 md:py-24 px-4 md:px-6 bg-[#2D2D2D]" aria-labelledby="features-heading">
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-10 md:mb-14">
          <h2 id="features-heading" className="text-xl sm:text-3xl md:text-4xl font-extrabold mb-2 md:mb-3 font-[family-name:var(--font-montserrat)] text-white">{t("features.title")}</h2>
          <p className="text-[13px] md:text-base text-white/50 max-w-md md:max-w-xl mx-auto">{t("features.subtitle")}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 hover:bg-white/10 transition-colors">
                <span className="text-[#E52222] text-3xl md:text-4xl font-extrabold font-[family-name:var(--font-montserrat)]">{f.num}</span>
                <div className="w-12 h-12 rounded-xl bg-[#E52222]/20 flex items-center justify-center my-4">
                  <Icon className="h-6 w-6 text-[#E52222]" />
                </div>
                <h3 className="text-base md:text-lg font-bold text-white mb-2">{f.title}</h3>
                <p className="text-[13px] md:text-sm text-white/50 leading-relaxed">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════
   WHY CHOOSE GETMOVA — White Background, 4 Cards
   ══════════════════════════════════════════════════ */
function WhyChooseSection() {
  const { t } = useLanguage();
  const benefits = [
    { icon: Zap, title: t("whyCard1.title"), desc: t("whyCard1.desc"), color: "bg-[#E52222]/10 text-[#E52222]" },
    { icon: User, title: t("whyCard2.title"), desc: t("whyCard2.desc"), color: "bg-blue-500/10 text-blue-500" },
    { icon: Monitor, title: t("whyCard3.title"), desc: t("whyCard3.desc"), color: "bg-green-500/10 text-green-500" },
    { icon: Shield, title: t("whyCard4.title"), desc: t("whyCard4.desc"), color: "bg-purple-500/10 text-purple-500" },
  ];
  return (
    <section className="py-14 md:py-24 px-4 md:px-6 bg-white dark:bg-[#1A1A1A]" aria-labelledby="why-heading">
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-10 md:mb-14">
          <h2 id="why-heading" className="text-xl sm:text-3xl md:text-4xl font-extrabold mb-2 md:mb-3 font-[family-name:var(--font-montserrat)] text-[#1A1A1A] dark:text-white">{t("whyChoose.title")}</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {benefits.map((b, i) => {
            const Icon = b.icon;
            return (
              <div key={i} className="bg-[#F5F5F5] dark:bg-[#2D2D2D] rounded-2xl p-5 md:p-6 text-center">
                <div className={`w-12 h-12 md:w-14 md:h-14 rounded-xl ${b.color} flex items-center justify-center mx-auto mb-3`}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-sm md:text-base font-bold text-[#1A1A1A] dark:text-white mb-1.5">{b.title}</h3>
                <p className="text-[11px] md:text-sm text-gray-500 dark:text-white/50 leading-relaxed">{b.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════
   PLATFORMS SECTION
   ══════════════════════════════════════════════════ */
function PlatformsSection() {
  const { t } = useLanguage();
  return (
    <section id="platforms" className="py-14 md:py-24 px-4 md:px-6 bg-[#F5F5F5] dark:bg-[#1A1A1A]" aria-labelledby="platforms-heading">
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-10 md:mb-14">
          <h2 id="platforms-heading" className="text-xl sm:text-3xl md:text-4xl font-extrabold mb-2 md:mb-3 font-[family-name:var(--font-montserrat)] text-[#1A1A1A] dark:text-white">{t("platforms.title")}</h2>
          <p className="text-[13px] md:text-base text-gray-500 dark:text-white/50 max-w-md md:max-w-lg mx-auto">{t("platforms.subtitle")}</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
          {PLATFORMS.map((p) => {
            const slug = p.name.toLowerCase().replace('/', '').replace(' ', '-') + '-downloader';
            return (
              <a key={p.name} href={`/${slug}`} className="group bg-white dark:bg-[#2D2D2D] rounded-xl shadow-sm hover:shadow-md p-4 md:p-5 flex flex-col items-center text-center gap-3 transition-all hover:-translate-y-1">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center text-white shrink-0 transition-transform duration-300 group-hover:scale-110" style={{ background: p.gradient || p.color }}>
                  <p.Icon className="h-5 w-5 md:h-6 md:w-6" />
                </div>
                <div>
                  <p className="text-[13px] md:text-sm font-semibold text-[#1A1A1A] dark:text-white group-hover:text-[#E52222] transition-colors">{p.name}</p>
                  <p className="text-[10px] md:text-[11px] text-[#E52222] font-medium mt-0.5">Download →</p>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════
   FAQ — Dark Gray Background, Accordion
   ══════════════════════════════════════════════════ */
const faqData = [
  { qId: "faq1", aId: "ans1" },
  { qId: "faq2", aId: "ans2" },
  { qId: "faq3", aId: "ans3" },
  { qId: "faq4", aId: "ans4" },
  { qId: "faq5", aId: "ans5" },
  { qId: "faq6", aId: "ans6" },
];
const faqContent: Record<string, Record<string, string>> = {
  id: {
    faq1: "Apakah GetMova benar-benar gratis?", ans1: "Ya, GetMova 100% gratis tanpa biaya tersembunyi. Kamu bisa download video sepuasnya tanpa perlu mendaftar atau membayar apapun.",
    faq2: "Apakah ada batasan jumlah download?", ans2: "Tidak ada batasan! Kamu bisa mendownload video sebanyak yang kamu mau tanpa batas harian atau bulanan.",
    faq3: "Apakah kualitas video berkurang?", ans3: "Tidak, kami mempertahankan kualitas asli video. Kamu bisa memilih resolusi yang tersedia dari video aslinya, termasuk HD 1080p jika tersedia.",
    faq4: "Platform apa saja yang didukung?", ans4: "GetMova mendukung TikTok, Instagram, Facebook, Twitter/X, Pinterest, Reddit, dan masih banyak lagi.",
    faq5: "Apakah GetMova aman digunakan?", ans5: "Sangat aman! Kami tidak menyimpan data pribadi atau riwayat download kamu. Semua proses dilakukan secara aman dan terenkripsi.",
    faq6: "Kenapa video saya gagal didownload?", ans6: "Pastikan link video benar dan video tidak bersifat private. Beberapa video dari akun private atau yang dibatasi region mungkin tidak bisa didownload. Coba gunakan link yang valid dan publik.",
  },
  en: {
    faq1: "Is GetMova really free?", ans1: "Yes, GetMova is 100% free with no hidden costs. You can download as many videos as you want without registering or paying anything.",
    faq2: "Is there a download limit?", ans2: "No limits! You can download as many videos as you want without daily or monthly restrictions.",
    faq3: "Does video quality decrease?", ans3: "No, we maintain the original video quality. You can choose from available resolutions, including HD 1080p if available.",
    faq4: "What platforms are supported?", ans4: "GetMova supports TikTok, Instagram, Facebook, Twitter/X, Pinterest, Reddit, and many more.",
    faq5: "Is GetMova safe to use?", ans5: "Very safe! We don't store your personal data or download history. All processes are done securely and encrypted.",
    faq6: "Why did my video download fail?", ans6: "Make sure the video link is correct and the video is not private. Some videos from private accounts or region-restricted content may not be downloadable. Try using a valid public link.",
  },
};

function FAQSection() {
  const { t, lang } = useLanguage();
  return (
    <section id="faq" className="py-14 md:py-24 px-4 md:px-6 bg-[#2D2D2D]" aria-labelledby="faq-heading">
      <div className="mx-auto max-w-3xl">
        <div className="text-center mb-10 md:mb-14">
          <h2 id="faq-heading" className="text-xl sm:text-3xl md:text-4xl font-extrabold mb-2 md:mb-3 font-[family-name:var(--font-montserrat)] text-white">
            {t("faq.title").split("Questions")[0]}<span className="text-[#E52222]">Questions</span>
          </h2>
          <p className="text-[13px] md:text-base text-white/50">{t("faq.subtitle")}</p>
        </div>
        <div className="space-y-3 md:space-y-4">
          {faqData.map((f, i) => (
            <details key={i} className="group bg-white/5 border border-white/10 rounded-xl transition-all duration-300 open:border-[#E52222]/20 open:bg-white/10">
              <summary className="flex items-center justify-between px-5 md:px-6 py-4 md:py-5 cursor-pointer text-[13px] md:text-base font-medium text-white/80 hover:text-white transition-colors list-none">
                <span className="pr-4">{faqContent[lang]?.[f.qId] || faqContent.id[f.qId]}</span>
                <ChevronDown className="h-4 w-4 text-white/30 shrink-0 group-open:rotate-180 transition-transform duration-300" />
              </summary>
              <div className="px-5 md:px-6 pb-4 md:pb-5 text-[12px] md:text-sm text-white/50 leading-relaxed border-t border-white/5 pt-3">
                {faqContent[lang]?.[f.aId] || faqContent.id[f.aId]}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════
   FOOTER — Dark Gray
   ══════════════════════════════════════════════════ */
function Footer() {
  const { t, lang } = useLanguage();
  return (
    <footer className="bg-[#2D2D2D] text-white" role="contentinfo">
      <div className="mx-auto max-w-6xl px-4 md:px-6 py-10 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-1.5 mb-3">
              <svg width="28" height="28" viewBox="0 0 32 32" fill="none" className="shrink-0">
                <rect width="32" height="32" rx="8" fill="#E52222" />
                <path d="M12 8.5V23.5L23 16Z" fill="white" opacity="0.95" />
                <path d="M20 20V24M20 24L17.5 21.5M20 24L22.5 21.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.7" />
              </svg>
              <span className="font-[family-name:var(--font-montserrat)] font-bold text-white text-sm">Get<span className="text-[#E52222]">Mova</span></span>
            </div>
            <p className="text-[11px] md:text-sm text-white/40 max-w-xs leading-relaxed">{t("footer.desc")}</p>
          </div>
          <div>
            <h4 className="text-[11px] md:text-sm font-semibold text-white/80 mb-3 md:mb-4">{lang === 'id' ? 'Navigasi' : 'Navigation'}</h4>
            <ul className="space-y-2 md:space-y-3">
              <li><a href="#features" className="text-[13px] md:text-sm text-white/40 hover:text-white transition-colors py-1 inline-block">{t("nav.fitur")}</a></li>
              <li><a href="#how" className="text-[13px] md:text-sm text-white/40 hover:text-white transition-colors py-1 inline-block">{t("nav.caraPakai")}</a></li>
              <li><a href="#platforms" className="text-[13px] md:text-sm text-white/40 hover:text-white transition-colors py-1 inline-block">{t("nav.platform")}</a></li>
              <li><a href="#faq" className="text-[13px] md:text-sm text-white/40 hover:text-white transition-colors py-1 inline-block">{t("nav.faq")}</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[11px] md:text-sm font-semibold text-white/80 mb-3 md:mb-4">{lang === 'id' ? 'Platform' : 'Platforms'}</h4>
            <ul className="space-y-2 md:space-y-3">
              <li><a href="/tiktok-downloader" className="text-[13px] md:text-sm text-white/40 hover:text-white transition-colors py-1 inline-block">TikTok Downloader</a></li>
              <li><a href="/instagram-downloader" className="text-[13px] md:text-sm text-white/40 hover:text-white transition-colors py-1 inline-block">Instagram Downloader</a></li>
              <li><a href="/facebook-downloader" className="text-[13px] md:text-sm text-white/40 hover:text-white transition-colors py-1 inline-block">Facebook Downloader</a></li>
              <li><a href="/twitter-downloader" className="text-[13px] md:text-sm text-white/40 hover:text-white transition-colors py-1 inline-block">Twitter/X Downloader</a></li>
              <li><a href="/pinterest-downloader" className="text-[13px] md:text-sm text-white/40 hover:text-white transition-colors py-1 inline-block">Pinterest Downloader</a></li>
              <li><a href="/reddit-downloader" className="text-[13px] md:text-sm text-white/40 hover:text-white transition-colors py-1 inline-block">Reddit Downloader</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[11px] md:text-sm font-semibold text-white/80 mb-3 md:mb-4">Legal</h4>
            <ul className="space-y-2 md:space-y-3">
              <li><a href="/privacy" className="text-[13px] md:text-sm text-white/40 hover:text-white transition-colors py-1 inline-block">{lang === 'id' ? 'Kebijakan Privasi' : 'Privacy Policy'}</a></li>
              <li><a href="/terms" className="text-[13px] md:text-sm text-white/40 hover:text-white transition-colors py-1 inline-block">{lang === 'id' ? 'Syarat & Ketentuan' : 'Terms of Service'}</a></li>
              <li><a href="/contact" className="text-[13px] md:text-sm text-white/40 hover:text-white transition-colors py-1 inline-block">{lang === 'id' ? 'Kontak' : 'Contact'}</a></li>
              <li><a href="/dmca" className="text-[13px] md:text-sm text-white/40 hover:text-white transition-colors py-1 inline-block">DMCA</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 md:mt-16 pt-5 md:pt-6 border-t border-white/5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="text-[10px] md:text-xs text-white/25">&copy; 2024-2026 GetMova. All rights reserved.</p>
            <p className="text-[9px] md:text-[11px] text-white/15 text-center sm:text-right">
              {lang === 'id' ? 'GetMova tidak menyimpan konten berhak cipta. Pengguna bertanggung jawab atas penggunaan konten yang diunduh.' : 'GetMova does not store copyrighted content. Users are responsible for downloaded content usage.'}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ══════════════════════════════════════════════════
   MOBILE BOTTOM NAV
   ══════════════════════════════════════════════════ */
function MobileBottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white dark:bg-[#2D2D2D] border-t border-gray-200 dark:border-white/5">
      <div className="flex items-center justify-around px-2 py-2">
        {[
          { icon: Download, label: "Download", href: "#hero", highlight: true },
          { icon: Bookmark, label: "Saved", href: "#hero" },
          { icon: Shield, label: "FAQ", href: "#faq" },
        ].map(item => (
          <a key={item.label} href={item.href} className={`flex flex-col items-center gap-0.5 py-1 px-6 rounded-lg transition-colors ${item.highlight ? "text-[#E52222]" : "text-gray-400 dark:text-white/40"}`}>
            <item.icon className="h-4 w-4" />
            <span className="text-[9px] font-medium">{item.label}</span>
          </a>
        ))}
      </div>
      <div className="h-[env(safe-area-inset-bottom,0px)]" />
    </nav>
  );
}

/* ══════════════════════════════════════════════════
   MAIN PAGE
   ══════════════════════════════════════════════════ */
export default function Home() {
  return (
    <LanguageProvider>
      <div className="min-h-screen flex flex-col bg-[#F5F5F5] dark:bg-[#1A1A1A]">
        <Navbar />
        <main className="flex-1 pb-14 md:pb-0">
          <HeroSection />
          <PlatformsBar />
          <FreeVideoDownloaderSection />
          <HowToUseSection />
          <FeatureCardsSection />
          <WhyChooseSection />
          <PlatformsSection />
          <FAQSection />

          {/* FAQPage Schema */}
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              { "@type": "Question", name: "Bagaimana cara download video tanpa watermark dengan GetMova?", acceptedAnswer: { "@type": "Answer", text: "Salin link video dari platform (TikTok, Instagram, Facebook, dll), tempel di kolom input GetMova, klik Download, pilih kualitas, dan video akan otomatis terunduh tanpa watermark." } },
              { "@type": "Question", name: "Apakah GetMova gratis?", acceptedAnswer: { "@type": "Answer", text: "Ya, GetMova 100% gratis dan tanpa batas. Kamu bisa download video sebanyak yang kamu mau tanpa biaya apapun." } },
              { "@type": "Question", name: "Apakah GetMova aman digunakan?", acceptedAnswer: { "@type": "Answer", text: "Ya, GetMova aman. Kami tidak menyimpan data pribadi pengguna dan semua proses dilakukan langsung dari platform sumber." } },
              { "@type": "Question", name: "Platform apa saja yang didukung GetMova?", acceptedAnswer: { "@type": "Answer", text: "GetMova mendukung download video dari TikTok, Instagram, Facebook, Twitter/X, Pinterest, dan Reddit." } }
            ]
          })}} />
          {/* HowTo Schema */}
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: "Cara Download Video Tanpa Watermark dengan GetMova",
            description: "Panduan langkah demi langkah untuk download video tanpa watermark menggunakan GetMova",
            step: [
              { "@type": "HowToStep", position: 1, name: "Salin Link Video", text: "Buka aplikasi TikTok, Instagram, Facebook, atau platform lain, temukan video yang ingin didownload, dan salin link-nya." },
              { "@type": "HowToStep", position: 2, name: "Tempel Link di GetMova", text: "Buka getmova.my.id, tempel link video yang sudah disalin di kolom input, lalu klik tombol Download." },
              { "@type": "HowToStep", position: 3, name: "Pilih Kualitas", text: "Pilih kualitas video yang diinginkan lalu klik download." }
            ]
          })}} />
          {/* BreadcrumbList Schema */}
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://getmova.my.id" }
            ]
          })}} />
        </main>
        <Footer />
        <MobileBottomNav />
      </div>
    </LanguageProvider>
  );
}

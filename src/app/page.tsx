"use client";

import React, { useState, useCallback, useRef, useEffect, createContext, useContext } from "react";
import { useTheme } from "next-themes";
import {
  Download, Zap, Shield, Smartphone, Globe, CheckCircle,
  Menu, X, ChevronDown, Play, Clock, User, Loader2,
  Heart, AlertCircle, Film, Music, Sun, Moon,
  Share2, Bookmark, Copy, Star, Volume2, VolumeX, Eye, EyeOff,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
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
function YouTubeIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
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

/* ──────── Platform Data ──────── */
interface PlatformDef {
  name: string;
  color: string;
  gradient?: string;
  Icon: React.ComponentType<{ className?: string }>;
}

const PLATFORMS: PlatformDef[] = [
  { name: "TikTok", color: "#010101", Icon: TikTokIcon },
  { name: "YouTube", color: "#FF0000", Icon: YouTubeIcon },
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
const ACCENT = "#2563EB";

/* ──────── Translations (ID/EN) ──────── */
const translations: Record<string, Record<string, string>> = {
  id: {
    "nav.fitur": "Fitur", "nav.caraPakai": "Cara Pakai", "nav.platform": "Platform", "nav.faq": "FAQ", "nav.download": "Download",
    "hero.badge": "Gratis & Tanpa Batas",
    "hero.title": "Download Video", "hero.titleHighlight": "Tanpa Watermark",
    "hero.subtitle": "Mova membantu kamu download video dari platform populer tanpa watermark, cepat dan gratis!",
    "hero.audioTitle": "Ekstrak Audio", "hero.audioTitleHighlight": "MP3 Gratis",
    "hero.audioSubtitle": "Mova bisa mengekstrak audio dari video manapun jadi file MP3, cepat dan berkualitas!",
    "input.placeholder": "Tempel link video di sini (TikTok, IG, YouTube...)",
    "input.audioPlaceholder": "Tempel link video untuk ekstrak audio MP3...",
    "input.paste": "Tempel",
    "btn.download": "Download", "btn.downloadNoWM": "Download Tanpa Watermark", "btn.downloadAudio": "Download Audio MP3",
    "tab.video": "Video", "tab.audio": "Audio",
    "result.found": "Video berhasil ditemukan!", "result.audioFound": "Audio berhasil ditemukan!",
    "result.selectQuality": "Pilih kualitas:", "result.preview": "Preview", "result.share": "Bagikan",
    "result.bookmark": "Bookmark", "result.bookmarked": "Tersimpan", "result.downloadThumb": "Thumbnail",
    "result.copyCaption": "Salin Caption", "result.captionCopied": "Caption disalin!",
    "history.title": "Riwayat Download", "history.clear": "Hapus Semua", "history.empty": "Belum ada riwayat download.",
    "bookmark.title": "Video Tersimpan", "bookmark.clear": "Hapus Semua", "bookmark.empty": "Belum ada video yang disimpan.",
    "features.title": "Fitur Unggulan Mova", "features.subtitle": "Semua yang kamu butuhkan untuk download video tanpa watermark.",
    "how.title": "Cara Menggunakan Mova", "how.subtitle": "Hanya 3 langkah mudah untuk download video tanpa watermark.",
    "platforms.title": "Platform yang Didukung", "platforms.subtitle": "Download video dari berbagai platform sosial media populer.",
    "faq.title": "Pertanyaan yang Sering Diajukan", "faq.subtitle": "Temukan jawaban dari pertanyaan umum tentang Mova.",
    "cta.title": "Siap Download Video Tanpa Watermark?", "cta.subtitle": "Coba Mova sekarang dan rasakan kemudahan download video tanpa watermark!",
    "cta.button": "Mulai Download Sekarang",
    "footer.desc": "Download video tanpa watermark dari berbagai platform populer. Cepat, gratis, dan mudah.",
    "footer.privacy": "Kebijakan Privasi",
    "error.emptyUrl": "Masukkan link video terlebih dahulu!",
    "error.invalidUrl": "URL tidak valid. Pastikan link yang dimasukkan benar.",
    "error.server": "Gagal terhubung ke server. Silakan coba lagi.",
    "error.downloadFail": "Gagal mengunduh video. Coba klik kanan pada tombol download dan pilih 'Save link as...'",
    "toast.videoFound": "Video ditemukan!", "toast.selectQuality": "Pilih kualitas dan download.",
    "toast.downloadStart": "Download dimulai!", "toast.linkCopied": "Link berhasil disalin!",
    "toast.bookmarkAdded": "Video disimpan ke bookmark!", "toast.bookmarkRemoved": "Bookmark dihapus.",
    "toast.historyCleared": "Riwayat download dihapus.",
    "info.duration": "Durasi", "info.resolution": "Resolusi", "info.author": "Pembuat", "info.platform": "Platform",
    "Baru saja": "Baru saja", "menit lalu": "menit lalu", "jam lalu": "jam lalu", "hari lalu": "hari lalu",
  },
  en: {
    "nav.fitur": "Features", "nav.caraPakai": "How to Use", "nav.platform": "Platforms", "nav.faq": "FAQ", "nav.download": "Download",
    "hero.badge": "Free & Unlimited",
    "hero.title": "Download Video", "hero.titleHighlight": "Without Watermark",
    "hero.subtitle": "Mova helps you download videos from popular platforms without watermark, fast and free!",
    "hero.audioTitle": "Extract Audio", "hero.audioTitleHighlight": "Free MP3",
    "hero.audioSubtitle": "Mova can extract audio from any video into MP3 files, fast and high quality!",
    "input.placeholder": "Paste video link here (TikTok, IG, YouTube...)",
    "input.audioPlaceholder": "Paste video link to extract MP3 audio...",
    "input.paste": "Paste",
    "btn.download": "Download", "btn.downloadNoWM": "Download Without Watermark", "btn.downloadAudio": "Download Audio MP3",
    "tab.video": "Video", "tab.audio": "Audio",
    "result.found": "Video found successfully!", "result.audioFound": "Audio found successfully!",
    "result.selectQuality": "Select quality:", "result.preview": "Preview", "result.share": "Share",
    "result.bookmark": "Bookmark", "result.bookmarked": "Saved", "result.downloadThumb": "Thumbnail",
    "result.copyCaption": "Copy Caption", "result.captionCopied": "Caption copied!",
    "history.title": "Download History", "history.clear": "Clear All", "history.empty": "No download history yet.",
    "bookmark.title": "Saved Videos", "bookmark.clear": "Clear All", "bookmark.empty": "No saved videos yet.",
    "features.title": "Mova Key Features", "features.subtitle": "Everything you need to download videos without watermark.",
    "how.title": "How to Use Mova", "how.subtitle": "Just 3 easy steps to download videos without watermark.",
    "platforms.title": "Supported Platforms", "platforms.subtitle": "Download videos from various popular social media platforms.",
    "faq.title": "Frequently Asked Questions", "faq.subtitle": "Find answers to common questions about Mova.",
    "cta.title": "Ready to Download Videos Without Watermark?", "cta.subtitle": "Try Mova now and experience easy watermark-free video downloads!",
    "cta.button": "Start Downloading Now",
    "footer.desc": "Download videos without watermark from popular platforms. Fast, free, and easy.",
    "footer.privacy": "Privacy Policy",
    "error.emptyUrl": "Please enter a video link first!",
    "error.invalidUrl": "Invalid URL. Make sure the link is correct.",
    "error.server": "Failed to connect to server. Please try again.",
    "error.downloadFail": "Failed to download video. Try right-clicking the download button and select 'Save link as...'",
    "toast.videoFound": "Video found!", "toast.selectQuality": "Select quality and download.",
    "toast.downloadStart": "Download started!", "toast.linkCopied": "Link copied successfully!",
    "toast.bookmarkAdded": "Video saved to bookmarks!", "toast.bookmarkRemoved": "Bookmark removed.",
    "toast.historyCleared": "Download history cleared.",
    "info.duration": "Duration", "info.resolution": "Resolution", "info.author": "Author", "info.platform": "Platform",
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
function clearAllHistory() {
  try { localStorage.removeItem(HISTORY_KEY); window.dispatchEvent(new Event("mova:history-changed")); } catch {}
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

function timeAgo(ts: number, t: (k: string) => string): string {
  const s = Math.floor((Date.now() - ts) / 1000);
  if (s < 60) return t("Baru saja");
  const m = Math.floor(s / 60); if (m < 60) return `${m} ${t("menit lalu")}`;
  const h = Math.floor(m / 60); if (h < 24) return `${h} ${t("jam lalu")}`;
  return `${Math.floor(h / 24)} ${t("hari lalu")}`;
}

function detectPlatform(urlStr: string): string {
  try {
    const h = new URL(urlStr).hostname.toLowerCase();
    if (h.includes("tiktok") || h.includes("vm.tiktok")) return "TikTok";
    if (h.includes("youtube") || h.includes("youtu.be")) return "YouTube";
    if (h.includes("instagram")) return "Instagram";
    if (h.includes("twitter") || h.includes("x.com")) return "Twitter/X";
    if (h.includes("facebook") || h.includes("fb.watch") || h.includes("fb.com")) return "Facebook";
    if (h.includes("pinterest")) return "Pinterest";
    if (h.includes("reddit")) return "Reddit";
  } catch {}
  return "Unknown";
}

/* ──────── Navbar ──────── */
function Navbar() {
  const [open, setOpen] = useState(false);
  const { setTheme, theme } = useTheme();
  const { lang, setLang, t } = useLanguage();
  const menuRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { label: t("nav.fitur"), href: "#features" },
    { label: t("nav.caraPakai"), href: "#how" },
    { label: t("nav.platform"), href: "#platforms" },
    { label: t("nav.faq"), href: "#faq" },
    { label: "Blog", href: "/blog" },
  ];

  // Close menu on outside click
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
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/40">
      <div className="mx-auto max-w-6xl h-12 md:h-16 flex items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <a href="/" className="flex items-center gap-1.5 shrink-0" aria-label="Mova - Home">
          <MovaLogo size={28} showText={true} />
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-0.5">
          {navLinks.map(l => (
            <a key={l.href} href={l.href} className="px-3.5 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted/50">{l.label}</a>
          ))}
        </nav>

        {/* Desktop controls */}
        <div className="hidden md:flex items-center gap-1.5">
          <button onClick={() => setLang(lang === "id" ? "en" : "id")} className="h-9 w-9 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors text-xs font-bold" aria-label="Toggle language">
            {lang === "id" ? "EN" : "ID"}
          </button>
          <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="h-9 w-9 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors" aria-label="Toggle theme">
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <a href="#hero">
            <Button size="sm" className="h-9 px-5 bg-[#2563EB] text-white font-semibold rounded-lg hover:bg-[#1D4ED8] transition-all text-sm">
              <Download className="mr-1.5 h-3.5 w-3.5" />{t("nav.download")}
            </Button>
          </a>
        </div>

        {/* Mobile controls */}
        <div className="flex md:hidden items-center gap-1">
          <button onClick={() => setLang(lang === "id" ? "en" : "id")} className="h-8 w-8 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground text-[10px] font-bold">{lang === "id" ? "EN" : "ID"}</button>
          <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="h-8 w-8 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground">
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <button onClick={() => setOpen(!open)} className="h-8 w-8 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground" aria-label="Menu">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div ref={menuRef} className="md:hidden border-t border-border/40 bg-background/95 backdrop-blur-xl">
          <div className="px-4 py-3 space-y-0.5">
            {navLinks.map(l => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="block px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted/50 transition-colors">{l.label}</a>
            ))}
            <a href="#hero" onClick={() => setOpen(false)} className="block pt-1">
              <Button className="w-full bg-[#2563EB] text-white font-semibold rounded-xl hover:bg-[#1D4ED8]">
                <Download className="mr-2 h-4 w-4" />{t("nav.download")}
              </Button>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

/* ──────── Hero / Download Section ──────── */
function HeroSection() {
  const { t } = useLanguage();
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DownloadResult | null>(null);
  const [error, setError] = useState("");
  const [selectedQuality, setSelectedQuality] = useState(0);
  const [audioMode, setAudioMode] = useState(false);
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

  // Check bookmark on result change
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
    setLoadingMsg(audioMode ? "Extracting audio..." : "Finding video...");

    // Show progress messages while waiting
    const msgs = audioMode
      ? ["Extracting audio...", "Converting to MP3...", "Almost done..."]
      : ["Finding video...", "Getting download link...", "Almost done..."];
    let msgIdx = 0;
    const msgInterval = setInterval(() => {
      msgIdx = Math.min(msgIdx + 1, msgs.length - 1);
      setLoadingMsg(msgs[msgIdx]);
    }, 5000);

    try {
      const res = await fetch("/api/download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: trimmed, audioMode }),
      });
      const data = await res.json();
      if (res.ok) {
        setResult(data);
        // Auto-select audio quality in audio mode
        if (audioMode) {
          const audioIdx = data.qualityOptions?.findIndex(
            (q: QualityOption) => q.label === "Audio" || q.resolution === "MP3"
          );
          setSelectedQuality(audioIdx >= 0 ? audioIdx : 0);
        } else {
          setSelectedQuality(0);
        }
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
    if (!q) {
      showToast(t("error.downloadFail"), "", "destructive");
      return;
    }

    const ext = q.resolution === "MP3" ? ".mp3" : ".mp4";
    const downloadName = (result.filename || `mova_${Date.now()}`) + `_${q.label}${ext}`;
    const isAudio = q.resolution === "MP3" || q.label === "Audio";
    // Use proxy URL for download, with original URL as fallback
    const downloadUrl = q.url;
    const fallbackUrl = q.originalUrl || q.url;

    setDownloading(true);

    try {
      // === Strategy 1: For audio files, try fetch+blob for reliable download with filename ===
      if (isAudio) {
        try {
          const res = await fetch(downloadUrl);
          if (res.ok) {
            const blob = await res.blob();
            if (blob.size > 1000) { // At least 1KB (real audio file)
              const blobUrl = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = blobUrl;
              a.download = downloadName;
              a.style.display = "none";
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
              setTimeout(() => URL.revokeObjectURL(blobUrl), 10000);

              saveToHistory({
                id: Date.now().toString(), title: result.title, platform: result.platform,
                author: result.author, thumbnail: result.thumbnail, duration: result.duration,
                url: url.trim(), downloadUrl: fallbackUrl, timestamp: Date.now(),
              });
              showToast(t("toast.downloadStart"), isAudio ? "MP3" : "");
              setDownloading(false);
              return;
            }
          }
        } catch (e) {
          console.log("Proxy fetch+blob failed, trying alternatives", e);
        }

        // === Strategy 1b: Try original URL directly for audio ===
        if (fallbackUrl !== downloadUrl) {
          try {
            const res = await fetch(fallbackUrl);
            if (res.ok) {
              const blob = await res.blob();
              if (blob.size > 1000) {
                const blobUrl = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = blobUrl;
                a.download = downloadName;
                a.style.display = "none";
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                setTimeout(() => URL.revokeObjectURL(blobUrl), 10000);

                saveToHistory({
                  id: Date.now().toString(), title: result.title, platform: result.platform,
                  author: result.author, thumbnail: result.thumbnail, duration: result.duration,
                  url: url.trim(), downloadUrl: fallbackUrl, timestamp: Date.now(),
                });
                showToast(t("toast.downloadStart"), "MP3");
                setDownloading(false);
                return;
              }
            }
          } catch (e) {
            console.log("Original URL fetch+blob also failed", e);
          }
        }
      }

      // === Strategy 2: Use <a> tag with download attribute ===
      try {
        const a = document.createElement("a");
        a.href = downloadUrl;
        a.download = downloadName;
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        a.style.display = "none";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        saveToHistory({
          id: Date.now().toString(), title: result.title, platform: result.platform,
          author: result.author, thumbnail: result.thumbnail, duration: result.duration,
          url: url.trim(), downloadUrl: fallbackUrl, timestamp: Date.now(),
        });
        showToast(t("toast.downloadStart"), "");
        setDownloading(false);
        return;
      } catch (e) {
        console.log("<a> tag approach failed", e);
      }

      // === Strategy 3: Open in new tab as last resort ===
      window.open(downloadUrl, "_blank");
      saveToHistory({
        id: Date.now().toString(), title: result.title, platform: result.platform,
        author: result.author, thumbnail: result.thumbnail, duration: result.duration,
        url: url.trim(), downloadUrl: fallbackUrl, timestamp: Date.now(),
      });
      showToast(t("toast.downloadStart"), "");
    } catch (e) {
      console.error("Download failed:", e);
      // Final fallback: open original URL in new tab
      try {
        window.open(fallbackUrl, "_blank");
      } catch {
        showToast(t("error.downloadFail"), "", "destructive");
      }
    } finally {
      setDownloading(false);
    }
  }, [result, selectedQuality, url, t, showToast, downloading]);

  const handlePaste = useCallback(async () => {
    try { const text = await navigator.clipboard.readText(); setUrl(text); } catch {}
  }, []);

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
      saveBookmark({
        id: Date.now().toString(), title: result.title, platform: result.platform,
        author: result.author, thumbnail: result.thumbnail, duration: result.duration,
        url: url.trim(), timestamp: Date.now(),
      });
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
      a.href = URL.createObjectURL(blob);
      a.download = `mova_thumb_${Date.now()}.jpg`;
      document.body.appendChild(a); a.click(); document.body.removeChild(a);
      URL.revokeObjectURL(a.href);
    } catch {}
  }, [result]);

  const detectedPlatform = result ? detectPlatform(url) : url.trim() ? detectPlatform(url) : null;
  const platformDef = detectedPlatform ? getPlatformDef(detectedPlatform) : null;

  return (
    <section id="hero" className="relative pt-16 md:pt-28 pb-14 md:pb-24 px-4 sm:px-6">
      <div className="mx-auto max-w-4xl text-center">
        {/* Badge */}
        <div className="mb-6">
          <span className="text-xs md:text-sm font-semibold text-[#2563EB] tracking-wide uppercase">{t("hero.badge")}</span>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold mb-4 font-[family-name:var(--font-montserrat)] leading-[1.1] tracking-tight">
          {audioMode ? t("hero.audioTitle") : t("hero.title")}{" "}
          <span className="text-[#2563EB]">{audioMode ? t("hero.audioTitleHighlight") : t("hero.titleHighlight")}</span>
        </h1>
        <p className="text-sm sm:text-base md:text-xl text-muted-foreground mb-9 max-w-2xl mx-auto leading-relaxed">
          {audioMode ? t("hero.audioSubtitle") : t("hero.subtitle")}
        </p>

        {/* Video/Audio tabs */}
        <div className="flex items-center justify-center gap-0 mb-7 border-b border-border w-fit mx-auto">
          <button onClick={() => { setAudioMode(false); setResult(null); setError(""); }} className={`px-5 py-2.5 md:px-7 md:py-3 text-sm md:text-base font-medium transition-colors border-b-2 ${!audioMode ? "border-[#2563EB] text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"}`}>
            <Film className="h-4 w-4 inline mr-1.5" />{t("tab.video")}
          </button>
          <button onClick={() => { setAudioMode(true); setResult(null); setError(""); }} className={`px-5 py-2.5 md:px-7 md:py-3 text-sm md:text-base font-medium transition-colors border-b-2 ${audioMode ? "border-[#2563EB] text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"}`}>
            <Music className="h-4 w-4 inline mr-1.5" />{t("tab.audio")}
          </button>
        </div>

        {/* Input */}
        <div className="relative flex items-center gap-2 max-w-3xl mx-auto">
          <div className="flex-1 relative">
            {platformDef && !result && (
              <div className="absolute left-3 top-1/2 -translate-y-1/2">
                <div className="w-5 h-5 rounded flex items-center justify-center" style={{ background: platformDef.gradient || platformDef.color }}>
                  <platformDef.Icon className="h-3 w-3 text-white" />
                </div>
              </div>
            )}
            <Input
              ref={inputRef}
              value={url}
              onChange={e => setUrl(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleAnalyze()}
              placeholder={audioMode ? t("input.audioPlaceholder") : t("input.placeholder")}
              className={`h-11 md:h-13 bg-card border border-border rounded-xl text-sm md:text-lg ${platformDef && !result ? "pl-10" : "pl-4"} pr-4`}
            />
          </div>
          <button onClick={handlePaste} className="h-11 md:h-13 px-3 rounded-xl border border-border bg-card text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors text-xs md:text-sm font-medium shrink-0">
            <Copy className="h-3.5 w-3.5 sm:mr-1.5" /><span className="hidden sm:inline">{t("input.paste")}</span>
          </button>
          <Button onClick={handleAnalyze} disabled={loading} className="h-11 md:h-13 px-5 md:px-7 bg-[#2563EB] text-white font-semibold rounded-xl hover:bg-[#1D4ED8] shrink-0">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4 sm:mr-1.5" />}
            <span className="hidden sm:inline">{loading ? (loadingMsg || t("btn.download")) : t("btn.download")}</span>
          </Button>
        </div>

        {/* Platform hints */}
        <div className="flex flex-wrap justify-center gap-2.5 md:gap-3 mt-6 mb-8">
          {PLATFORMS.map(p => (
            <a key={p.name} href={`/${p.name.toLowerCase().replace("/","-").replace(" ","-")}-downloader`} className="text-xs md:text-sm text-muted-foreground hover:text-[#2563EB] transition-colors font-medium">
              {p.name}
            </a>
          ))}
        </div>

        {/* Micro trust line under input */}
        <div className="flex items-center justify-center gap-3 md:gap-4 text-[10px] md:text-xs text-muted-foreground/60 mb-2">
          <span className="flex items-center gap-1"><Shield className="h-3 w-3 md:h-3.5 md:w-3.5" />SSL Secure</span>
          <span className="w-1 h-1 rounded-full bg-muted-foreground/20" />
          <span className="flex items-center gap-1">No Signup</span>
          <span className="w-1 h-1 rounded-full bg-muted-foreground/20" />
          <span className="flex items-center gap-1">100% Free</span>
        </div>

        {/* Loading progress indicator */}
        {loading && !error && (
          <div className="max-w-xl mx-auto mb-4 p-3 rounded-lg bg-[#2563EB]/10 border border-[#2563EB]/20 flex items-center gap-2">
            <Loader2 className="h-4 w-4 text-[#2563EB] animate-spin shrink-0" />
            <p className="text-[#2563EB] text-sm text-left font-medium">{loadingMsg || "Processing..."}</p>
            <span className="text-xs text-muted-foreground ml-auto">Please wait</span>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="max-w-xl mx-auto mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 flex items-start gap-2">
            <AlertCircle className="h-4 w-4 text-red-400 mt-0.5 shrink-0" />
            <div className="text-left">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          </div>
        )}

        {/* Result card */}
        {result && (
          <div ref={resultRef} className="max-w-xl mx-auto rounded-xl bg-card border overflow-hidden" style={{ borderColor: `${ACCENT}30` }}>
            {/* Platform badge header */}
            <div className="px-4 py-2 border-b border-border flex items-center gap-2" style={{ background: `linear-gradient(to right, ${ACCENT}15, #7C3AED15)` }}>
              <CheckCircle className="h-4 w-4 text-green-400" />
              <span className="text-sm text-green-400 font-medium">{audioMode ? t("result.audioFound") : t("result.found")}</span>
              <div className="ml-auto flex items-center gap-1.5">
                {(() => { const pd = getPlatformDef(result.platform); return (
                  <div className="w-5 h-5 rounded flex items-center justify-center" style={{ background: pd.gradient || pd.color }}>
                    <pd.Icon className="h-3 w-3 text-white" />
                  </div>
                ); })()}
                <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">{result.platform}</span>
              </div>
            </div>

            <div className="p-4">
              {/* Video info */}
              {showPreview && !previewError ? (
                <div className="w-full rounded-lg overflow-hidden bg-muted mb-3">
                  <video src={result.qualityOptions[0]?.originalUrl || result.qualityOptions[0]?.url} controls muted className="w-full object-contain" style={{ maxHeight: "200px" }} onError={() => setPreviewError(true)} />
                </div>
              ) : (
                <div className="flex gap-3 mb-3">
                  <div className="w-24 h-16 rounded-lg bg-muted flex items-center justify-center shrink-0 overflow-hidden relative">
                    {result.thumbnail && <img src={result.thumbnail} alt="" className="w-full h-full object-cover" onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />}
                    <Play className="h-6 w-6 absolute text-[#2563EB]" />
                  </div>
                  <div className="flex-1 text-left min-w-0">
                    <h3 className="font-semibold text-foreground text-sm line-clamp-2">{result.title}</h3>
                    <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                      {result.duration !== "--:--" && <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{result.duration}</span>}
                      <span className="flex items-center gap-1"><User className="h-3 w-3" />{result.author}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Action buttons */}
              <div className="flex flex-wrap gap-1 mb-3">
                <Button variant="ghost" size="sm" onClick={() => { setShowPreview(!showPreview); setPreviewError(false); }} className="text-xs text-muted-foreground hover:text-foreground h-7">
                  {showPreview ? <EyeOff className="h-3 w-3 mr-1" /> : <Eye className="h-3 w-3 mr-1" />}{t("result.preview")}
                </Button>
                <Button variant="ghost" size="sm" onClick={handleShare} className="text-xs text-muted-foreground hover:text-foreground h-7">
                  <Share2 className="h-3 w-3 mr-1" />{t("result.share")}
                </Button>
                <Button variant="ghost" size="sm" onClick={handleToggleBookmark} className="text-xs h-7" style={{ color: isBookmarkedState ? ACCENT : "var(--muted-foreground)" }}>
                  <Bookmark className={`h-3 w-3 mr-1 ${isBookmarkedState ? "fill-current" : ""}`} />{isBookmarkedState ? t("result.bookmarked") : t("result.bookmark")}
                </Button>
                {result.thumbnail && (
                  <Button variant="ghost" size="sm" onClick={handleDownloadThumbnail} className="text-xs text-muted-foreground hover:text-foreground h-7">
                    <Copy className="h-3 w-3 mr-1" />{t("result.downloadThumb")}
                  </Button>
                )}
                <Button variant="ghost" size="sm" onClick={handleCopyCaption} className="text-xs text-muted-foreground hover:text-foreground h-7">
                  <Copy className="h-3 w-3 mr-1" />{t("result.copyCaption")}
                </Button>
              </div>

              {/* Quality selector */}
              {result.qualityOptions.length > 0 && (
                <div className="mb-3">
                  <p className="text-xs font-medium text-foreground mb-2 text-left flex items-center gap-1.5">
                    <Film className="h-3.5 w-3.5 text-[#2563EB]" />{t("result.selectQuality")}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {result.qualityOptions.map((q, i) => {
                      const isSelected = selectedQuality === i;
                      return (
                        <button
                          key={i}
                          onClick={() => setSelectedQuality(i)}
                          className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border font-medium transition-colors ${
                            isSelected ? "text-white" : "bg-muted text-muted-foreground hover:text-foreground"
                          }`}
                          style={isSelected ? { backgroundColor: ACCENT, borderColor: ACCENT } : { borderColor: "var(--border)" }}
                        >
                          {q.resolution === "MP3" ? <Music className="h-3 w-3" /> : <Film className="h-3 w-3" />}
                          <span>{q.label}</span>
                          <span className="opacity-70">{q.resolution}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Download button */}
              <Button
                onClick={handleDownload}
                disabled={downloading}
                className="w-full h-11 bg-[#2563EB] text-white font-bold rounded-xl hover:bg-[#1D4ED8] text-sm"
              >
                {downloading ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" />{audioMode ? "Downloading MP3..." : "Downloading..."}</>
                ) : (
                  <><Download className="mr-2 h-4 w-4" />{audioMode ? t("btn.downloadAudio") : t("btn.downloadNoWM")}</>
                )}
              </Button>

              {/* Fallback direct download link */}
              {result.qualityOptions[selectedQuality]?.originalUrl && (
                <a
                  href={result.qualityOptions[selectedQuality].originalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block mt-2 text-center text-xs text-muted-foreground hover:text-[#2563EB] transition-colors underline underline-offset-2"
                >
                  {audioMode ? "Open MP3 directly" : "Open download link directly"} ↗
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

/* ──────── Trust / Social Proof Section ──────── */
function TrustSection() {
  const { lang } = useLanguage();
  const stats = [
    { value: "500K+", label: { id: "Video Diunduh", en: "Videos Downloaded" } },
    { value: "7+", label: { id: "Platform Didukung", en: "Platforms Supported" } },
    { value: "100%", label: { id: "Gratis", en: "Free" } },
    { value: "4.8", label: { id: "Rating", en: "Rating" } },
  ];
  return (
    <section className="py-10 md:py-16 px-4 sm:px-6 border-y border-border/40" aria-label="Trust signals">
      <div className="mx-auto max-w-5xl">
        <div className="grid grid-cols-4 gap-4 md:gap-8">
          {stats.map((s, i) => (
            <div key={i} className="text-center">
              <p className="text-lg sm:text-2xl md:text-4xl font-bold text-foreground font-[family-name:var(--font-montserrat)]">{s.value}</p>
              <p className="text-[10px] md:text-sm text-muted-foreground mt-1">{s.label[lang] || s.label.id}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────── Features Section ──────── */
const featuresData = [
  { icon: Download, titleId: "Download Tanpa Watermark", desc: { id: "Download video dari TikTok, Instagram, YouTube tanpa watermark. Kualitas asli dipertahankan.", en: "Download videos from TikTok, Instagram, YouTube without watermark. Original quality preserved." } },
  { icon: Zap, titleId: "Super Cepat", desc: { id: "Proses download instan tanpa perlu menunggu lama. Server cepat untuk pengalaman terbaik.", en: "Instant download process without long waits. Fast servers for the best experience." } },
  { icon: Shield, titleId: "Aman & Privat", desc: { id: "Tidak ada data pribadi yang disimpan. Semua proses dilakukan secara aman dan terenkripsi.", en: "No personal data stored. All processes are done securely and encrypted." } },
  { icon: Smartphone, titleId: "Mobile Friendly", desc: { id: "Optimal untuk HP. Download video langsung dari browser HP tanpa install app.", en: "Optimized for mobile. Download videos directly from your phone browser without installing an app." } },
  { icon: Music, titleId: "Ekstrak Audio MP3", desc: { id: "Konversi video ke MP3 dengan kualitas tinggi. Cocok untuk download lagu dari TikTok.", en: "Convert video to MP3 with high quality. Perfect for downloading songs from TikTok." } },
  { icon: Globe, titleId: "Multi Platform", desc: { id: "Support TikTok, Instagram, YouTube, Facebook, Twitter/X, Pinterest, Reddit, dan lainnya.", en: "Support TikTok, Instagram, YouTube, Facebook, Twitter/X, Pinterest, Reddit, and more." } },
];

function FeaturesSection() {
  const { t, lang } = useLanguage();
  return (
    <section id="features" className="py-14 md:py-28 px-3 sm:px-4" aria-labelledby="features-heading">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 md:mb-14">
          <p className="text-xs md:text-sm font-semibold text-[#2563EB] tracking-wide uppercase mb-3">{t("nav.fitur")}</p>
          <h2 id="features-heading" className="text-2xl sm:text-3xl md:text-5xl font-extrabold mb-3 font-[family-name:var(--font-montserrat)]">
            {t("features.title")}
          </h2>
          <p className="text-sm md:text-lg text-muted-foreground max-w-xl">{t("features.subtitle")}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {featuresData.map((f, i) => {
            const Icon = f.icon;
            return (
              <div key={i} className={`feature-card p-5 md:p-6 ${i === 0 ? 'md:col-span-2 lg:col-span-1' : ''}`}>
                <div className={`w-10 h-10 md:w-11 md:h-11 rounded-lg flex items-center justify-center shrink-0 bg-[#2563EB]/10 mb-3`}>
                  <Icon className="h-5 w-5 text-[#2563EB]" />
                </div>
                <h3 className="text-sm md:text-base font-semibold text-foreground mb-1.5">{f.titleId}</h3>
                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">{f.desc[lang] || f.desc.id}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ──────── How It Works ──────── */
function HowItWorksSection() {
  const { t } = useLanguage();
  const steps = [
    { num: "01", title: { id: "Salin Link Video", en: "Copy Video Link" }, desc: { id: "Salin link video dari TikTok, Instagram, YouTube, atau platform lainnya.", en: "Copy the video link from TikTok, Instagram, YouTube, or other platforms." } },
    { num: "02", title: { id: "Tempel & Download", en: "Paste & Download" }, desc: { id: "Tempel link di kolom input lalu klik tombol Download.", en: "Paste the link in the input field and click the Download button." } },
    { num: "03", title: { id: "Simpan Video", en: "Save Video" }, desc: { id: "Pilih kualitas dan simpan video tanpa watermark ke perangkatmu.", en: "Select quality and save the video without watermark to your device." } },
  ];
  const lang = useLanguage().lang;
  return (
    <section id="how" className="py-14 md:py-28 px-3 sm:px-4 bg-muted/30" aria-labelledby="how-heading">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 md:mb-14">
          <p className="text-xs md:text-sm font-semibold text-[#2563EB] tracking-wide uppercase mb-3">{t("nav.caraPakai")}</p>
          <h2 id="how-heading" className="text-2xl sm:text-3xl md:text-5xl font-extrabold mb-3 font-[family-name:var(--font-montserrat)]">{t("how.title")}</h2>
          <p className="text-sm md:text-lg text-muted-foreground max-w-lg">{t("how.subtitle")}</p>
        </div>
        <div className="space-y-6 md:space-y-8">
          {steps.map((s, i) => (
            <div key={i} className="flex items-start gap-4 md:gap-6">
              <span className="text-3xl md:text-5xl font-extrabold text-muted-foreground/20 font-[family-name:var(--font-montserrat)] shrink-0 leading-none">{s.num}</span>
              <div className="pt-1 md:pt-2">
                <h3 className="text-sm md:text-lg font-semibold text-foreground mb-1">{s.title[lang] || s.title.id}</h3>
                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">{s.desc[lang] || s.desc.id}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────── Platforms Section ──────── */
function PlatformsSection() {
  const { t } = useLanguage();
  return (
    <section id="platforms" className="py-14 md:py-28 overflow-hidden">
      <div className="mx-auto max-w-5xl px-3 sm:px-4">
        <div className="mb-10 md:mb-14">
          <p className="text-xs md:text-sm font-semibold text-[#2563EB] tracking-wide uppercase mb-3">{t("nav.platform")}</p>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold mb-3 font-[family-name:var(--font-montserrat)]">{t("platforms.title")}</h2>
          <p className="text-sm md:text-lg text-muted-foreground max-w-lg">{t("platforms.subtitle")}</p>
        </div>
      </div>
      {/* Marquee row */}
      <div className="relative mb-3">
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        <div className="flex animate-marquee scroll-hide">
          {[...PLATFORMS, ...PLATFORMS].map((p, i) => (
            <div key={`r1-${p.name}-${i}`} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-card border border-border mx-2 shrink-0 hover:border-[#2563EB]/25 transition-colors platform-card">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white" style={{ background: p.gradient || p.color }}>
                <p.Icon className="h-3.5 w-3.5" />
              </div>
              <span className="text-sm font-medium text-foreground whitespace-nowrap">{p.name}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        <div className="flex animate-marquee-reverse scroll-hide">
          {[...PLATFORMS.slice().reverse(), ...PLATFORMS.slice().reverse()].map((p, i) => (
            <div key={`r2-${p.name}-${i}`} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-card border border-border mx-2 shrink-0 hover:border-[#2563EB]/25 transition-colors platform-card">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white" style={{ background: p.gradient || p.color }}>
                <p.Icon className="h-3.5 w-3.5" />
              </div>
              <span className="text-sm font-medium text-foreground whitespace-nowrap">{p.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────── FAQ Section ──────── */
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
    faq1: "Apakah Mova benar-benar gratis?", ans1: "Ya, Mova 100% gratis tanpa biaya tersembunyi. Kamu bisa download video sepuasnya tanpa perlu mendaftar atau membayar apapun.",
    faq2: "Apakah ada batasan jumlah download?", ans2: "Tidak ada batasan! Kamu bisa mendownload video sebanyak yang kamu mau tanpa batas harian atau bulanan.",
    faq3: "Apakah kualitas video berkurang?", ans3: "Tidak, kami mempertahankan kualitas asli video. Kamu bisa memilih resolusi yang tersedia dari video aslinya, termasuk HD 1080p jika tersedia.",
    faq4: "Platform apa saja yang didukung?", ans4: "Mova mendukung TikTok, Instagram, YouTube, Facebook, Twitter/X, Pinterest, Reddit, dan masih banyak lagi.",
    faq5: "Apakah Mova aman digunakan?", ans5: "Sangat aman! Kami tidak menyimpan data pribadi atau riwayat download kamu. Semua proses dilakukan secara aman dan terenkripsi.",
    faq6: "Kenapa video saya gagal didownload?", ans6: "Pastikan link video benar dan video tidak bersifat private. Beberapa video dari akun private atau yang dibatasi region mungkin tidak bisa didownload. Coba gunakan link yang valid dan publik.",
  },
  en: {
    faq1: "Is Mova really free?", ans1: "Yes, Mova is 100% free with no hidden costs. You can download as many videos as you want without registering or paying anything.",
    faq2: "Is there a download limit?", ans2: "No limits! You can download as many videos as you want without daily or monthly restrictions.",
    faq3: "Does video quality decrease?", ans3: "No, we maintain the original video quality. You can choose from available resolutions, including HD 1080p if available.",
    faq4: "What platforms are supported?", ans4: "Mova supports TikTok, Instagram, YouTube, Facebook, Twitter/X, Pinterest, Reddit, and many more.",
    faq5: "Is Mova safe to use?", ans5: "Very safe! We don't store your personal data or download history. All processes are done securely and encrypted.",
    faq6: "Why did my video download fail?", ans6: "Make sure the video link is correct and the video is not private. Some videos from private accounts or region-restricted content may not be downloadable. Try using a valid public link.",
  },
};

function FAQSection() {
  const { t, lang } = useLanguage();
  return (
    <section id="faq" className="py-14 md:py-28 px-3 sm:px-4">
      <div className="mx-auto max-w-3xl">
        <div className="mb-10 md:mb-14">
          <p className="text-xs md:text-sm font-semibold text-[#2563EB] tracking-wide uppercase mb-3">FAQ</p>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold mb-3 font-[family-name:var(--font-montserrat)]">{t("faq.title")}</h2>
          <p className="text-sm md:text-lg text-muted-foreground">{t("faq.subtitle")}</p>
        </div>
        <Accordion type="single" collapsible className="space-y-2">
          {faqData.map((f, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border rounded-xl px-5 md:px-6 bg-card">
              <AccordionTrigger className="text-sm md:text-base font-medium text-left hover:no-underline py-4">{faqContent[lang]?.[f.qId] || faqContent.id[f.qId]}</AccordionTrigger>
              <AccordionContent className="text-xs md:text-sm text-muted-foreground leading-relaxed pb-4">{faqContent[lang]?.[f.aId] || faqContent.id[f.aId]}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

/* ──────── CTA Section ──────── */
function CTASection() {
  const { t } = useLanguage();
  return (
    <section className="py-14 md:py-28 px-3 sm:px-4">
      <div className="mx-auto max-w-3xl text-center cta-card p-8 md:p-14 relative z-10">
        <h2 className="text-xl sm:text-2xl md:text-4xl font-extrabold mb-4 font-[family-name:var(--font-montserrat)]">{t("cta.title")}</h2>
        <p className="text-sm md:text-lg text-muted-foreground mb-8 max-w-md mx-auto">{t("cta.subtitle")}</p>
        <a href="#hero">
          <Button className="h-12 md:h-14 px-8 md:px-10 bg-[#2563EB] text-white font-bold rounded-xl hover:bg-[#1D4ED8] text-sm md:text-base">
            <Download className="mr-2 h-4 w-4 md:h-5 md:w-5" />{t("cta.button")}
          </Button>
        </a>
      </div>
    </section>
  );
}

/* ──────── Footer ──────── */
function Footer() {
  const { t, lang } = useLanguage();
  return (
    <footer className="border-t border-border/50" role="contentinfo">
      <div className="mx-auto max-w-6xl px-3 sm:px-4 py-12 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {/* Column 1: Logo + Description */}
          <div className="col-span-2 md:col-span-1">
            <MovaLogo size={28} showText />
            <p className="text-xs md:text-sm text-muted-foreground max-w-xs mt-4 leading-relaxed">{t("footer.desc")}</p>
          </div>

          {/* Column 2: Navigasi */}
          <div>
            <h4 className="text-xs md:text-sm font-semibold text-foreground mb-4">{lang === 'id' ? 'Navigasi' : 'Navigation'}</h4>
            <ul className="space-y-3">
              <li><a href="#features" className="text-xs md:text-sm text-muted-foreground hover:text-[#2563EB] transition-colors">{t("nav.fitur")}</a></li>
              <li><a href="#how" className="text-xs md:text-sm text-muted-foreground hover:text-[#2563EB] transition-colors">{t("nav.caraPakai")}</a></li>
              <li><a href="#platforms" className="text-xs md:text-sm text-muted-foreground hover:text-[#2563EB] transition-colors">{t("nav.platform")}</a></li>
              <li><a href="#faq" className="text-xs md:text-sm text-muted-foreground hover:text-[#2563EB] transition-colors">{t("nav.faq")}</a></li>
            </ul>
          </div>

          {/* Column 3: Perusahaan */}
          <div>
            <h4 className="text-xs md:text-sm font-semibold text-foreground mb-4">{lang === 'id' ? 'Perusahaan' : 'Company'}</h4>
            <ul className="space-y-3">
              <li><a href="/about" className="text-xs md:text-sm text-muted-foreground hover:text-[#2563EB] transition-colors">{lang === 'id' ? 'Tentang Kami' : 'About Us'}</a></li>
              <li><a href="/contact" className="text-xs md:text-sm text-muted-foreground hover:text-[#2563EB] transition-colors">{lang === 'id' ? 'Kontak' : 'Contact'}</a></li>
              <li><a href="/blog" className="text-xs md:text-sm text-muted-foreground hover:text-[#2563EB] transition-colors">Blog</a></li>
            </ul>
          </div>

          {/* Column 4: Legal */}
          <div>
            <h4 className="text-xs md:text-sm font-semibold text-foreground mb-4">Legal</h4>
            <ul className="space-y-3">
              <li><a href="/privacy" className="text-xs md:text-sm text-muted-foreground hover:text-[#2563EB] transition-colors">{lang === 'id' ? 'Kebijakan Privasi' : 'Privacy Policy'}</a></li>
              <li><a href="/terms" className="text-xs md:text-sm text-muted-foreground hover:text-[#2563EB] transition-colors">{lang === 'id' ? 'Syarat & Ketentuan' : 'Terms of Service'}</a></li>
              <li><a href="/disclaimer" className="text-xs md:text-sm text-muted-foreground hover:text-[#2563EB] transition-colors">Disclaimer / DMCA</a></li>
            </ul>
          </div>
        </div>
        {/* Bottom bar */}
        <div className="mt-12 md:mt-16 pt-6 border-t border-border/40">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-[10px] md:text-xs text-muted-foreground/50">&copy; 2026 Mova. All rights reserved.</p>
            <p className="text-[9px] md:text-[11px] text-muted-foreground/30 text-center sm:text-right">
              {lang === 'id' ? 'Mova tidak menyimpan konten berhak cipta. Pengguna bertanggung jawab atas penggunaan konten yang diunduh.' : 'Mova does not store copyrighted content. Users are responsible for downloaded content usage.'}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ──────── Mobile Bottom Nav ──────── */
function MobileBottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-background/90 backdrop-blur-xl border-t border-border/40 safe-area-bottom">
      <div className="flex items-center justify-around px-2 py-1.5 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
        {[
          { icon: Download, label: "Download", href: "#hero", highlight: true },
          { icon: Bookmark, label: "Saved", href: "#hero" },
          { icon: Shield, label: "FAQ", href: "#faq" },
        ].map(item => (
          <a key={item.label} href={item.href} className={`flex flex-col items-center gap-0.5 py-1 px-5 rounded-xl transition-colors ${item.highlight ? "text-[#2563EB]" : "text-muted-foreground"}`}>
            <item.icon className="h-4.5 w-4.5" />
            <span className="text-[9px] font-medium">{item.label}</span>
          </a>
        ))}
      </div>
    </nav>
  );
}

/* ──────── Main Page ──────── */
export default function Home() {
  return (
    <LanguageProvider>
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-1 pb-16 md:pb-0">
          <HeroSection />
          <TrustSection />
          <FeaturesSection />
          <HowItWorksSection />
          <PlatformsSection />
          <FAQSection />
          {/* FAQPage Schema */}
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              { "@type": "Question", name: "Bagaimana cara download video tanpa watermark dengan Mova?", acceptedAnswer: { "@type": "Answer", text: "Salin link video dari platform (TikTok, YouTube, Instagram, dll), tempel di kolom input Mova, klik Download, pilih kualitas, dan video akan otomatis terunduh tanpa watermark." } },
              { "@type": "Question", name: "Apakah Mova gratis?", acceptedAnswer: { "@type": "Answer", text: "Ya, Mova 100% gratis dan tanpa batas. Kamu bisa download video sebanyak yang kamu mau tanpa biaya apapun." } },
              { "@type": "Question", name: "Apakah Mova bisa download video YouTube ke MP3?", acceptedAnswer: { "@type": "Answer", text: "Ya, Mova mendukung ekstraksi audio MP3 dari video YouTube. Cukup tempel link YouTube, pilih mode Audio, dan download file MP3 berkualitas tinggi." } },
              { "@type": "Question", name: "Apakah Mova aman digunakan?", acceptedAnswer: { "@type": "Answer", text: "Ya, Mova aman. Kami tidak menyimpan data pribadi pengguna, tidak menggunakan tracking cookies, dan semua proses dilakukan langsung dari platform sumber." } },
              { "@type": "Question", name: "Platform apa saja yang didukung Mova?", acceptedAnswer: { "@type": "Answer", text: "Mova mendukung download video dari TikTok, YouTube, Instagram, Facebook, Twitter/X, Pinterest, dan Reddit." } }
            ]
          })}} />
          {/* HowTo Schema */}
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: "Cara Download Video Tanpa Watermark dengan Mova",
            description: "Panduan langkah demi langkah untuk download video tanpa watermark menggunakan Mova",
            step: [
              { "@type": "HowToStep", position: 1, name: "Salin Link Video", text: "Buka aplikasi TikTok, YouTube, Instagram, atau platform lain, temukan video yang ingin didownload, dan salin link-nya." },
              { "@type": "HowToStep", position: 2, name: "Tempel Link di Mova", text: "Buka getmova.my.id, tempel link video yang sudah disalin di kolom input, lalu klik tombol Download." },
              { "@type": "HowToStep", position: 3, name: "Pilih Kualitas", text: "Pilih kualitas video yang diinginkan (360p, 480p, 720p, atau 1080p) lalu klik download." }
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

          {/* Platform Download Pages */}
          <section className="py-14 md:py-20 px-3 sm:px-4 bg-muted/30">
            <div className="mx-auto max-w-5xl">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-2 tracking-tight">Download Video per Platform</h2>
              <p className="text-sm text-muted-foreground text-center mb-8">Pilih platform untuk panduan download lengkap</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                {PLATFORMS.slice(0, 5).map(p => {
                  const slug = p.name.toLowerCase().replace('/', '').replace(' ', '-') + '-downloader';
                  return (
                    <a key={p.name} href={`/${slug}`} className="flex flex-col items-center gap-2 p-4 rounded-xl bg-card border border-border/50 hover:border-[#2563EB]/25 transition-colors">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: p.gradient || p.color }}>
                        <p.Icon className="h-5 w-5 text-white" />
                      </div>
                      <span className="text-xs font-medium text-foreground text-center">{p.name}</span>
                      <span className="text-[10px] text-muted-foreground">Download</span>
                    </a>
                  );
                })}
              </div>
            </div>
          </section>

          <CTASection />
        </main>
        <Footer />
        <MobileBottomNav />
      </div>
    </LanguageProvider>
  );
}

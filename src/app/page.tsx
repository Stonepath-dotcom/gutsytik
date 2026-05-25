"use client";

import React, { useState, useCallback, useRef, useEffect, createContext, useContext } from "react";
import { useTheme } from "next-themes";
import {
  Download, Zap, Shield, Smartphone, CheckCircle,
  Menu, X, ChevronDown, Play, Clock, User, Loader2,
  AlertCircle, Film, Music, Sun, Moon,
  Share2, Bookmark, Copy, Eye, EyeOff,
  Link as LinkIcon,
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
const ACCENT = "#4F46E5";
const INDIRGO_BG = "bg-indigo-50";
const INDIGO_TEXT = "text-indigo-600";

/* ──────── Translations (ID/EN) ──────── */
const translations: Record<string, Record<string, string>> = {
  id: {
    "nav.fitur": "Fitur", "nav.caraPakai": "Cara Pakai", "nav.platform": "Platform", "nav.faq": "FAQ", "nav.download": "Download",
    "hero.badge": "100% Gratis & Tanpa Watermark",
    "hero.title": "Download Video", "hero.titleHighlight": "Tanpa Watermark",
    "hero.subtitle": "Download video dari TikTok, Instagram, Facebook, YouTube dan banyak platform lainnya tanpa watermark.",
    "hero.audioTitle": "Ekstrak Audio", "hero.audioTitleHighlight": "MP3 Gratis",
    "hero.audioSubtitle": "Mova bisa mengekstrak audio dari video manapun jadi file MP3, cepat dan berkualitas!",
    "input.placeholder": "Paste link video di sini...",
    "input.audioPlaceholder": "Paste link video untuk ekstrak audio MP3...",
    "btn.download": "Download", "btn.downloadNoWM": "Download Tanpa Watermark", "btn.downloadAudio": "Download Audio MP3",
    "tab.video": "Video", "tab.audio": "Audio",
    "result.found": "Video berhasil ditemukan!", "result.audioFound": "Audio berhasil ditemukan!",
    "result.selectQuality": "Pilih kualitas:", "result.preview": "Preview", "result.share": "Bagikan",
    "result.bookmark": "Bookmark", "result.bookmarked": "Tersimpan", "result.downloadThumb": "Thumbnail",
    "result.copyCaption": "Salin Caption", "result.captionCopied": "Caption disalin!",
    "features.title": "Kenapa Harus Mova?", "features.subtitle": "Download video tanpa watermark dari berbagai platform populer dengan cepat dan mudah.",
    "how.title": "Cara Menggunakan Mova", "how.subtitle": "Hanya 4 langkah mudah untuk download video tanpa watermark.",
    "platforms.title": "Platform yang Didukung", "platforms.subtitle": "Download video dari berbagai platform sosial media populer.",
    "faq.title": "Pertanyaan yang Sering Diajukan", "faq.subtitle": "Temukan jawaban dari pertanyaan umum tentang Mova.",
    "cta.title": "Gratis, Tanpa Batas, Tanpa Watermark", "cta.subtitle": "Download video sepuasnya tanpa batas dan tanpa watermark dari berbagai platform populer.",
    "cta.button": "Mulai Download",
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
    "hero.title": "Download Video", "hero.titleHighlight": "Without Watermark",
    "hero.subtitle": "Download videos from TikTok, Instagram, Facebook, YouTube and many other platforms without watermark.",
    "hero.audioTitle": "Extract Audio", "hero.audioTitleHighlight": "Free MP3",
    "hero.audioSubtitle": "Mova can extract audio from any video into MP3 files, fast and high quality!",
    "input.placeholder": "Paste video link here...",
    "input.audioPlaceholder": "Paste video link to extract MP3 audio...",
    "btn.download": "Download", "btn.downloadNoWM": "Download Without Watermark", "btn.downloadAudio": "Download Audio MP3",
    "tab.video": "Video", "tab.audio": "Audio",
    "result.found": "Video found successfully!", "result.audioFound": "Audio found successfully!",
    "result.selectQuality": "Select quality:", "result.preview": "Preview", "result.share": "Share",
    "result.bookmark": "Bookmark", "result.bookmarked": "Saved", "result.downloadThumb": "Thumbnail",
    "result.copyCaption": "Copy Caption", "result.captionCopied": "Caption copied!",
    "features.title": "Why Choose Mova?", "features.subtitle": "Download videos without watermark from various popular platforms quickly and easily.",
    "how.title": "How to Use Mova", "how.subtitle": "Just 4 easy steps to download videos without watermark.",
    "platforms.title": "Supported Platforms", "platforms.subtitle": "Download videos from various popular social media platforms.",
    "faq.title": "Frequently Asked Questions", "faq.subtitle": "Find answers to common questions about Mova.",
    "cta.title": "Free, Unlimited, No Watermark", "cta.subtitle": "Download as many videos as you want without limits and without watermark from various popular platforms.",
    "cta.button": "Start Downloading",
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
  const [scrolled, setScrolled] = useState(false);
  const { setTheme, theme } = useTheme();
  const { lang, setLang, t } = useLanguage();
  const menuRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-200 ${scrolled ? "mobile-solid-bg bg-[#0F172A]/95 md:backdrop-blur-md border-b border-white/10 md:shadow-lg" : "bg-transparent border-b border-transparent"}`}>
      <div className="mx-auto max-w-6xl h-14 md:h-16 flex items-center justify-between px-4 md:px-6">
        <a href="/" className="flex items-center gap-1.5 shrink-0" aria-label="Mova - Home">
          <MovaLogo size={28} showText={true} />
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map(l => (
            <a key={l.href} href={l.href} className="px-3 py-2 text-sm font-medium text-white/70 hover:text-white transition-colors rounded-lg">{l.label}</a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <button onClick={() => setLang(lang === "id" ? "en" : "id")} className="h-9 w-9 flex items-center justify-center rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors text-xs font-bold" aria-label="Toggle language">
            {lang === "id" ? "EN" : "ID"}
          </button>
          <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="h-9 w-9 flex items-center justify-center rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors" aria-label="Toggle theme">
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <a href="#hero">
            <Button size="sm" className="h-9 px-5 bg-[#4F46E5] text-white font-semibold rounded-lg hover:bg-[#4338CA] transition-colors text-sm">
              <Download className="mr-1.5 h-3.5 w-3.5" />{t("nav.download")}
            </Button>
          </a>
        </div>

        {/* Mobile buttons */}
        <div className="flex md:hidden items-center gap-1">
          <button onClick={() => setLang(lang === "id" ? "en" : "id")} className="h-8 w-8 flex items-center justify-center rounded-lg text-white/70 text-[10px] font-bold">{lang === "id" ? "EN" : "ID"}</button>
          <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="h-8 w-8 flex items-center justify-center rounded-lg text-white/70">
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <button onClick={() => setOpen(!open)} className="h-8 w-8 flex items-center justify-center rounded-lg text-white/70" aria-label="Menu">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div ref={menuRef} className="md:hidden border-t border-white/10 bg-[#0F172A]/98">
          <div className="px-4 py-3 space-y-0.5">
            {navLinks.map(l => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="block px-3 py-2.5 text-sm font-medium text-white/70 hover:text-white rounded-lg hover:bg-white/10 transition-colors">{l.label}</a>
            ))}
            <a href="#hero" onClick={() => setOpen(false)} className="block pt-1">
              <Button className="w-full bg-[#4F46E5] text-white font-semibold rounded-lg hover:bg-[#4338CA]">
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
    const downloadUrl = q.url;
    const fallbackUrl = q.originalUrl || q.url;

    setDownloading(true);

    try {
      if (isAudio) {
        try {
          const res = await fetch(downloadUrl);
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
              showToast(t("toast.downloadStart"), isAudio ? "MP3" : "");
              setDownloading(false);
              return;
            }
          }
        } catch (e) {
          console.log("Proxy fetch+blob failed", e);
        }

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

      window.open(downloadUrl, "_blank");
      saveToHistory({
        id: Date.now().toString(), title: result.title, platform: result.platform,
        author: result.author, thumbnail: result.thumbnail, duration: result.duration,
        url: url.trim(), downloadUrl: fallbackUrl, timestamp: Date.now(),
      });
      showToast(t("toast.downloadStart"), "");
    } catch (e) {
      console.error("Download failed:", e);
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
    <section id="hero" className="hero-bg relative pt-24 md:pt-36 pb-10 md:pb-28 px-4 md:px-6">
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        {/* Badge */}
        <div className="mb-5 md:mb-6 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/10">
          <Zap className="h-3.5 w-3.5 text-yellow-400" />
          <span className="text-[11px] md:text-sm font-medium text-white/90">{t("hero.badge")}</span>
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 md:mb-5 font-[family-name:var(--font-montserrat)] leading-[1.15] tracking-tight text-white">
          {audioMode ? t("hero.audioTitle") : t("hero.title")}{" "}
          <span className="gradient-text">{audioMode ? t("hero.audioTitleHighlight") : t("hero.titleHighlight")}</span>
        </h1>
        <p className="text-[13px] sm:text-base md:text-lg text-white/60 mb-7 md:mb-9 max-w-xl md:max-w-2xl mx-auto leading-relaxed">
          {audioMode ? t("hero.audioSubtitle") : t("hero.subtitle")}
        </p>

        {/* Video/Audio tabs */}
        <div className="flex items-center justify-center mb-6 md:mb-7">
          <button onClick={() => { setAudioMode(false); setResult(null); setError(""); }} className={`px-4 md:px-5 py-2 text-[13px] md:text-sm font-medium rounded-l-lg border transition-colors ${!audioMode ? "bg-white text-gray-900 border-white" : "bg-white/10 text-white/70 border-white/20 hover:bg-white/15"}`}>
            <Film className="h-3.5 w-3.5 md:h-4 md:w-4 inline mr-1" />{t("tab.video")}
          </button>
          <button onClick={() => { setAudioMode(true); setResult(null); setError(""); }} className={`px-4 md:px-5 py-2 text-[13px] md:text-sm font-medium rounded-r-lg border transition-colors ${audioMode ? "bg-white text-gray-900 border-white" : "bg-white/10 text-white/70 border-white/20 hover:bg-white/15"}`}>
            <Music className="h-3.5 w-3.5 md:h-4 md:w-4 inline mr-1" />{t("tab.audio")}
          </button>
        </div>

        {/* Input - stacked on mobile, inline on desktop */}
        <div className="max-w-2xl mx-auto space-y-2.5 md:space-y-0 md:flex md:items-center md:gap-2.5">
          <div className="flex-1 relative">
            <LinkIcon className="absolute left-3.5 md:left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              ref={inputRef}
              value={url}
              onChange={e => setUrl(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleAnalyze()}
              placeholder={audioMode ? t("input.audioPlaceholder") : t("input.placeholder")}
              className="h-12 md:h-14 bg-white border border-gray-200 rounded-xl text-[15px] md:text-lg pl-10 md:pl-11 pr-10 md:pr-12 text-gray-900 placeholder:text-gray-400 md:shadow-lg focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/20"
            />
          </div>
          <Button onClick={handleAnalyze} disabled={loading} className="w-full md:w-auto h-12 md:h-14 px-5 md:px-8 bg-[#4F46E5] text-white font-semibold rounded-xl hover:bg-[#4338CA] active:scale-[0.98] shrink-0 md:shadow-lg md:shadow-[#4F46E5]/25 text-[15px] md:text-base transition-colors">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4 mr-1.5" />}
            <span>{loading ? (loadingMsg || t("btn.download")) : t("btn.download")}</span>
          </Button>
        </div>

        {/* Trust line */}
        <div className="flex items-center justify-center gap-3 md:gap-5 text-[12px] md:text-sm text-white/50 mt-5 md:mt-6">
          <span className="flex items-center gap-1.5"><Shield className="h-3.5 w-3.5" />SSL Secure</span>
          <span className="text-white/20">|</span>
          <span>No Signup</span>
          <span className="text-white/20">|</span>
          <span>100% Free</span>
        </div>

        {/* Platform hints */}
        <div className="flex flex-wrap justify-center gap-1.5 md:gap-3 mt-4 md:mt-5">
          {PLATFORMS.map(p => {
            const slug = p.name.toLowerCase().replace('/', '').replace(' ', '-') + '-downloader';
            return (
              <a key={p.name} href={`/${slug}`} className="inline-flex items-center gap-1 text-[11px] md:text-[13px] text-white/40 hover:text-white/80 transition-colors font-medium px-2 py-1 rounded-md hover:bg-white/5">
                <p.Icon className="h-3 w-3" />{p.name}
              </a>
            );
          })}
        </div>

        {/* Loading */}
        {loading && !error && (
          <div className="max-w-lg mx-auto mt-5 md:mt-6 p-3 rounded-lg bg-white/10 border border-white/10 flex items-center gap-2">
            <Loader2 className="h-4 w-4 text-white animate-spin shrink-0" />
            <p className="text-white text-[13px] md:text-sm text-left font-medium">{loadingMsg || "Processing..."}</p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="max-w-lg mx-auto mt-5 md:mt-6 p-3 rounded-lg bg-red-500/20 border border-red-500/30 flex items-start gap-2">
            <AlertCircle className="h-4 w-4 text-red-300 mt-0.5 shrink-0" />
            <p className="text-red-300 text-[13px] md:text-sm text-left">{error}</p>
          </div>
        )}

        {/* Result card */}
        {result && (
          <div ref={resultRef} className="max-w-lg mx-auto mt-5 md:mt-6 rounded-xl bg-white border border-gray-200 overflow-hidden text-gray-900 md:shadow-xl text-left">
            <div className="px-3.5 md:px-4 py-2.5 border-b border-gray-100 flex items-center gap-2 bg-gray-50">
              <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
              <span className="text-[13px] md:text-sm text-green-600 font-medium">{audioMode ? t("result.audioFound") : t("result.found")}</span>
              <div className="ml-auto flex items-center gap-1.5">
                {(() => { const pd = getPlatformDef(result.platform); return (
                  <div className="w-5 h-5 rounded flex items-center justify-center" style={{ background: pd.gradient || pd.color }}>
                    <pd.Icon className="h-3 w-3 text-white" />
                  </div>
                ); })()}
                <span className="text-[11px] md:text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">{result.platform}</span>
              </div>
            </div>

            <div className="p-3.5 md:p-4">
              {showPreview && !previewError ? (
                <div className="w-full rounded-lg overflow-hidden bg-gray-100 mb-3">
                  <video src={result.qualityOptions[0]?.originalUrl || result.qualityOptions[0]?.url} controls muted className="w-full object-contain" style={{ maxHeight: "200px" }} onError={() => setPreviewError(true)} />
                </div>
              ) : (
                <div className="flex gap-3 mb-3">
                  <div className="w-20 h-14 md:w-24 md:h-16 rounded-lg bg-gray-100 flex items-center justify-center shrink-0 overflow-hidden relative">
                    {result.thumbnail && <img src={result.thumbnail} alt="" className="w-full h-full object-cover" onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />}
                    <Play className="h-5 w-5 md:h-6 md:w-6 absolute text-[#4F46E5]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 text-[13px] md:text-sm line-clamp-2">{result.title}</h3>
                    <div className="flex items-center gap-3 mt-1 text-[11px] md:text-xs text-gray-500">
                      {result.duration !== "--:--" && <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{result.duration}</span>}
                      <span className="flex items-center gap-1"><User className="h-3 w-3" />{result.author}</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex flex-wrap gap-0.5 mb-3">
                <Button variant="ghost" size="sm" onClick={() => { setShowPreview(!showPreview); setPreviewError(false); }} className="text-[11px] md:text-xs text-gray-500 hover:text-gray-900 h-7">
                  {showPreview ? <EyeOff className="h-3 w-3 mr-1" /> : <Eye className="h-3 w-3 mr-1" />}{t("result.preview")}
                </Button>
                <Button variant="ghost" size="sm" onClick={handleShare} className="text-[11px] md:text-xs text-gray-500 hover:text-gray-900 h-7">
                  <Share2 className="h-3 w-3 mr-1" />{t("result.share")}
                </Button>
                <Button variant="ghost" size="sm" onClick={handleToggleBookmark} className="text-[11px] md:text-xs h-7" style={{ color: isBookmarkedState ? ACCENT : "#6B7280" }}>
                  <Bookmark className={`h-3 w-3 mr-1 ${isBookmarkedState ? "fill-current" : ""}`} />{isBookmarkedState ? t("result.bookmarked") : t("result.bookmark")}
                </Button>
                {result.thumbnail && (
                  <Button variant="ghost" size="sm" onClick={handleDownloadThumbnail} className="text-[11px] md:text-xs text-gray-500 hover:text-gray-900 h-7">
                    <Copy className="h-3 w-3 mr-1" />{t("result.downloadThumb")}
                  </Button>
                )}
                <Button variant="ghost" size="sm" onClick={handleCopyCaption} className="text-[11px] md:text-xs text-gray-500 hover:text-gray-900 h-7">
                  <Copy className="h-3 w-3 mr-1" />{t("result.copyCaption")}
                </Button>
              </div>

              {result.qualityOptions.length > 0 && (
                <div className="mb-3">
                  <p className="text-[11px] md:text-xs font-medium text-gray-700 mb-2 flex items-center gap-1.5">
                    <Film className="h-3 w-3 md:h-3.5 md:w-3.5 text-[#4F46E5]" />{t("result.selectQuality")}
                  </p>
                  <div className="flex flex-wrap gap-1.5 md:gap-2">
                    {result.qualityOptions.map((q, i) => {
                      const isSelected = selectedQuality === i;
                      return (
                        <button
                          key={i}
                          onClick={() => setSelectedQuality(i)}
                          className={`flex items-center gap-1 text-[11px] md:text-xs px-2.5 md:px-3 py-1.5 rounded-lg border font-medium transition-colors ${
                            isSelected ? "text-white bg-[#4F46E5] border-[#4F46E5]" : "bg-gray-50 text-gray-600 border-gray-200 hover:border-gray-300"
                          }`}
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

              <Button
                onClick={handleDownload}
                disabled={downloading}
                className="w-full h-10 md:h-11 bg-[#4F46E5] text-white font-bold rounded-lg hover:bg-[#4338CA] text-[13px] md:text-sm"
              >
                {downloading ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" />{audioMode ? "Downloading MP3..." : "Downloading..."}</>
                ) : (
                  <><Download className="mr-2 h-4 w-4" />{audioMode ? t("btn.downloadAudio") : t("btn.downloadNoWM")}</>
                )}
              </Button>

              {result.qualityOptions[selectedQuality]?.originalUrl && (
                <a
                  href={result.qualityOptions[selectedQuality].originalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block mt-2 text-center text-[11px] md:text-xs text-gray-400 hover:text-[#4F46E5] transition-colors underline underline-offset-2"
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

/* ──────── Features Section ──────── */
const featuresData = [
  { icon: Download, color: "bg-indigo-100 text-indigo-600", titleId: "Tanpa Watermark", desc: { id: "Download video dari TikTok, Instagram, YouTube tanpa watermark. Kualitas asli dipertahankan.", en: "Download videos from TikTok, Instagram, YouTube without watermark. Original quality preserved." } },
  { icon: Zap, color: "bg-indigo-100 text-indigo-600", titleId: "Super Cepat", desc: { id: "Proses download instan tanpa perlu menunggu lama. Server cepat untuk pengalaman terbaik.", en: "Instant download process without long waits. Fast servers for the best experience." } },
  { icon: Shield, color: "bg-indigo-100 text-indigo-600", titleId: "Aman & Privat", desc: { id: "Tidak ada data pribadi yang disimpan. Semua proses dilakukan secara aman dan terenkripsi.", en: "No personal data stored. All processes are done securely and encrypted." } },
  { icon: Smartphone, color: "bg-indigo-100 text-indigo-600", titleId: "Mobile Friendly", desc: { id: "Optimal untuk HP. Download video langsung dari browser HP tanpa install app.", en: "Optimized for mobile. Download videos directly from your phone browser without installing an app." } },
];

function FeaturesSection() {
  const { t, lang } = useLanguage();
  return (
    <section id="features" className="pt-6 pb-10 md:py-20 px-4 md:px-6 bg-white" aria-labelledby="features-heading">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-8 md:mb-12">
          <h2 id="features-heading" className="text-xl sm:text-2xl md:text-4xl font-extrabold mb-2 md:mb-3 font-[family-name:var(--font-montserrat)] text-gray-900">
            {t("features.title")}
          </h2>
          <p className="text-[13px] md:text-base text-gray-500 max-w-md md:max-w-xl mx-auto">{t("features.subtitle")}</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 md:gap-5">
          {featuresData.map((f, i) => {
            const Icon = f.icon;
            return (
              <div key={i} className="bg-white border border-gray-100 rounded-xl p-3.5 md:p-6 md:shadow-sm md:hover:shadow-md md:hover:border-[#4F46E5]/20 md:hover:-translate-y-0.5 transition-colors">
                <div className={`w-9 h-9 md:w-11 md:h-11 rounded-lg flex items-center justify-center shrink-0 mb-2.5 md:mb-3 ${f.color}`}>
                  <Icon className="h-4 w-4 md:h-5 md:w-5" />
                </div>
                <h3 className="text-[13px] md:text-base font-semibold text-gray-900 mb-1">{f.titleId}</h3>
                <p className="text-[11px] md:text-sm text-gray-500 leading-relaxed">{f.desc[lang] || f.desc.id}</p>
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
  const { t, lang } = useLanguage();
  const steps = [
    { num: 1, icon: LinkIcon, title: { id: "Salin Link", en: "Copy Link" }, desc: { id: "Salin link video dari TikTok, Instagram, YouTube, atau platform lainnya.", en: "Copy the video link from TikTok, Instagram, YouTube, or other platforms." } },
    { num: 2, icon: Share2, title: { id: "Tempel Link", en: "Paste Link" }, desc: { id: "Tempel link di kolom input di atas.", en: "Paste the link in the input field above." } },
    { num: 3, icon: Download, title: { id: "Klik Download", en: "Click Download" }, desc: { id: "Klik tombol Download dan pilih kualitas video yang diinginkan.", en: "Click the Download button and select your preferred video quality." } },
    { num: 4, icon: CheckCircle, title: { id: "Simpan Video", en: "Save Video" }, desc: { id: "Video akan otomatis terunduh tanpa watermark ke perangkatmu.", en: "The video will automatically download without watermark to your device." } },
  ];
  return (
    <section id="how" className="py-10 md:py-20 px-4 md:px-6 bg-gray-50" aria-labelledby="how-heading">
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-8 md:mb-12">
          <h2 id="how-heading" className="text-xl sm:text-2xl md:text-4xl font-extrabold mb-2 md:mb-3 font-[family-name:var(--font-montserrat)] text-gray-900">{t("how.title")}</h2>
          <p className="text-[13px] md:text-base text-gray-500 max-w-md md:max-w-lg mx-auto">{t("how.subtitle")}</p>
        </div>
        {/* Mobile: 2x2 grid, Desktop: 4 cols with arrows */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={i} className="flex flex-col items-center text-center">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#4F46E5] flex items-center justify-center mb-2.5 md:mb-3">
                  <span className="text-white font-bold text-sm md:text-base">{s.num}</span>
                </div>
                <h3 className="text-[13px] md:text-base font-semibold text-gray-900 mb-1">{s.title[lang] || s.title.id}</h3>
                <p className="text-[11px] md:text-sm text-gray-500 leading-relaxed">{s.desc[lang] || s.desc.id}</p>
                {i < 3 && (
                  <div className="hidden md:block mt-3">
                    <span className="text-gray-300 text-lg">&#8594;</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ──────── Platforms Section ──────── */
function PlatformsSection() {
  const { t } = useLanguage();
  return (
    <section id="platforms" className="py-10 md:py-20 px-4 md:px-6 bg-white border-t border-gray-100">
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-xl sm:text-2xl md:text-4xl font-extrabold mb-2 md:mb-3 font-[family-name:var(--font-montserrat)] text-gray-900">{t("platforms.title")}</h2>
          <p className="text-[13px] md:text-base text-gray-500 max-w-md md:max-w-lg mx-auto">{t("platforms.subtitle")}</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 md:gap-4">
          {PLATFORMS.map((p) => {
            const slug = p.name.toLowerCase().replace('/', '').replace(' ', '-') + '-downloader';
            return (
              <a key={p.name} href={`/${slug}`} className="flex items-center gap-2.5 md:gap-3 p-2.5 md:p-4 rounded-xl bg-white border border-gray-200 md:hover:border-[#4F46E5]/40 md:hover:shadow-md md:hover:-translate-y-0.5 transition-colors group">
                <div className="w-9 h-9 md:w-10 md:h-10 rounded-lg flex items-center justify-center text-white shrink-0" style={{ background: p.gradient || p.color }}>
                  <p.Icon className="h-4 w-4 md:h-4.5 md:w-4.5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] md:text-sm font-semibold text-gray-900 truncate group-hover:text-[#4F46E5] transition-colors">{p.name}</p>
                  <p className="text-[10px] md:text-[11px] text-[#4F46E5] font-medium">Download →</p>
                </div>
              </a>
            );
          })}
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
    <section id="faq" className="py-10 md:py-20 px-4 md:px-6 bg-gray-50">
      <div className="mx-auto max-w-3xl">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-xl sm:text-2xl md:text-4xl font-extrabold mb-2 md:mb-3 font-[family-name:var(--font-montserrat)] text-gray-900">{t("faq.title")}</h2>
          <p className="text-[13px] md:text-base text-gray-500">{t("faq.subtitle")}</p>
        </div>
        <div className="space-y-2.5 md:space-y-3">
          {faqData.map((f, i) => (
            <details key={i} className="group bg-white border border-gray-200 rounded-xl md:hover:border-[#4F46E5]/30 transition-colors">
              <summary className="flex items-center justify-between px-4 md:px-6 py-3.5 md:py-4 cursor-pointer text-[13px] md:text-base font-medium text-gray-900 hover:text-[#4F46E5] transition-colors list-none">
                <span className="pr-3">{faqContent[lang]?.[f.qId] || faqContent.id[f.qId]}</span>
                <ChevronDown className="h-4 w-4 text-gray-400 shrink-0 group-open:rotate-180 transition-transform duration-200" />
              </summary>
              <div className="px-4 md:px-6 pb-3.5 md:pb-4 text-[12px] md:text-sm text-gray-500 leading-relaxed border-t border-gray-100 pt-3">
                {faqContent[lang]?.[f.aId] || faqContent.id[f.aId]}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────── CTA Section ──────── */
function CTASection() {
  const { t } = useLanguage();
  return (
    <section className="dark-section py-12 md:py-24 px-4 md:px-6 border-t border-white/5">
      <div className="mx-auto max-w-3xl text-center">
        <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-[#4F46E5]/20 flex items-center justify-center mx-auto mb-4 md:mb-6">
          <Shield className="h-6 w-6 md:h-8 md:w-8 text-[#4F46E5]" />
        </div>
        <h2 className="text-lg sm:text-2xl md:text-4xl font-extrabold mb-2.5 md:mb-4 font-[family-name:var(--font-montserrat)] text-white">{t("cta.title")}</h2>
        <p className="text-[13px] md:text-base text-white/60 mb-5 md:mb-8 max-w-md mx-auto">{t("cta.subtitle")}</p>
        <a href="#hero">
          <Button className="h-11 md:h-14 px-7 md:px-10 bg-[#4F46E5] text-white font-bold rounded-lg hover:bg-[#4338CA] text-[13px] md:text-base">
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
    <footer className="dark-section border-t border-white/10" role="contentinfo">
      <div className="mx-auto max-w-6xl px-4 md:px-6 py-10 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12">
          <div className="col-span-2 md:col-span-1">
            <MovaLogo size={24} showText />
            <p className="text-[11px] md:text-sm text-white/50 max-w-xs mt-3 leading-relaxed">{t("footer.desc")}</p>
          </div>
          <div>
            <h4 className="text-[11px] md:text-sm font-semibold text-white mb-3 md:mb-4">{lang === 'id' ? 'Navigasi' : 'Navigation'}</h4>
            <ul className="space-y-2 md:space-y-3">
              <li><a href="#features" className="text-[13px] md:text-sm text-white/50 hover:text-white transition-colors py-1 inline-block">{t("nav.fitur")}</a></li>
              <li><a href="#how" className="text-[13px] md:text-sm text-white/50 hover:text-white transition-colors py-1 inline-block">{t("nav.caraPakai")}</a></li>
              <li><a href="#platforms" className="text-[13px] md:text-sm text-white/50 hover:text-white transition-colors py-1 inline-block">{t("nav.platform")}</a></li>
              <li><a href="#faq" className="text-[13px] md:text-sm text-white/50 hover:text-white transition-colors py-1 inline-block">{t("nav.faq")}</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[11px] md:text-sm font-semibold text-white mb-3 md:mb-4">{lang === 'id' ? 'Perusahaan' : 'Company'}</h4>
            <ul className="space-y-2 md:space-y-3">
              <li><a href="/about" className="text-[13px] md:text-sm text-white/50 hover:text-white transition-colors py-1 inline-block">{lang === 'id' ? 'Tentang Kami' : 'About Us'}</a></li>
              <li><a href="/contact" className="text-[13px] md:text-sm text-white/50 hover:text-white transition-colors py-1 inline-block">{lang === 'id' ? 'Kontak' : 'Contact'}</a></li>
              <li><a href="/blog" className="text-[13px] md:text-sm text-white/50 hover:text-white transition-colors py-1 inline-block">Blog</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[11px] md:text-sm font-semibold text-white mb-3 md:mb-4">Legal</h4>
            <ul className="space-y-2 md:space-y-3">
              <li><a href="/privacy" className="text-[13px] md:text-sm text-white/50 hover:text-white transition-colors py-1 inline-block">{lang === 'id' ? 'Kebijakan Privasi' : 'Privacy Policy'}</a></li>
              <li><a href="/terms" className="text-[13px] md:text-sm text-white/50 hover:text-white transition-colors py-1 inline-block">{lang === 'id' ? 'Syarat & Ketentuan' : 'Terms of Service'}</a></li>
              <li><a href="/disclaimer" className="text-[13px] md:text-sm text-white/50 hover:text-white transition-colors py-1 inline-block">Disclaimer / DMCA</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 md:mt-16 pt-5 md:pt-6 border-t border-white/10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="text-[10px] md:text-xs text-white/30">&copy; 2026 Mova. All rights reserved.</p>
            <p className="text-[9px] md:text-[11px] text-white/20 text-center sm:text-right">
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
    <nav className="fixed bottom-0 left-0 right-0 z-40 md:hidden mobile-solid-bg bg-[#0F172A] border-t border-white/10">
      <div className="flex items-center justify-around px-2 py-2">
        {[
          { icon: Download, label: "Download", href: "#hero", highlight: true },
          { icon: Bookmark, label: "Saved", href: "#hero" },
          { icon: Shield, label: "FAQ", href: "#faq" },
        ].map(item => (
          <a key={item.label} href={item.href} className={`flex flex-col items-center gap-0.5 py-1 px-6 rounded-lg transition-colors ${item.highlight ? "text-[#4F46E5]" : "text-white/50"}`}>
            <item.icon className="h-4 w-4" />
            <span className="text-[9px] font-medium">{item.label}</span>
          </a>
        ))}
      </div>
      <div className="h-[env(safe-area-inset-bottom,0px)]" />
    </nav>
  );
}

/* ──────── Main Page ──────── */
export default function Home() {
  return (
    <LanguageProvider>
      <div className="min-h-screen flex flex-col bg-white">
        <Navbar />
        <main className="flex-1 pb-14 md:pb-0">
          <HeroSection />
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
          <section className="py-10 md:py-16 px-4 md:px-6 bg-gray-50">
            <div className="mx-auto max-w-5xl">
              <h2 className="text-lg sm:text-xl md:text-3xl font-bold text-center mb-1.5 md:mb-2 tracking-tight text-gray-900">Download Video per Platform</h2>
              <p className="text-[13px] md:text-sm text-gray-500 text-center mb-6 md:mb-8">Pilih platform untuk panduan download lengkap</p>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 md:gap-3">
                {PLATFORMS.slice(0, 5).map(p => {
                  const slug = p.name.toLowerCase().replace('/', '').replace(' ', '-') + '-downloader';
                  return (
                    <a key={p.name} href={`/${slug}`} className="flex flex-col items-center gap-1.5 md:gap-2 p-2.5 md:p-4 rounded-xl bg-white border border-gray-200 md:hover:border-[#4F46E5]/30 md:hover:shadow-sm transition-colors">
                      <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center" style={{ background: p.gradient || p.color }}>
                        <p.Icon className="h-4 w-4 md:h-5 md:w-5 text-white" />
                      </div>
                      <span className="text-[11px] md:text-xs font-semibold text-gray-900 text-center">{p.name}</span>
                      <span className="text-[9px] md:text-[10px] text-[#4F46E5] font-medium">Download →</span>
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

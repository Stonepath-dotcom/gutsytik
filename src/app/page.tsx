"use client";

import React, { useState, useCallback, useRef, useEffect, createContext, useContext } from "react";
import { useTheme } from "next-themes";
import {
  Download, Zap, Shield, Smartphone, CheckCircle,
  Menu, X, ChevronDown, Play, Clock, User, Loader2,
  AlertCircle, Film, Sun, Moon,
  Share2, Bookmark, Copy, Eye, EyeOff,
  Link as LinkIcon, Search, ArrowRight, Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MovaLogo } from "@/components/mova-logo";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";

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
function TikTokIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.43V13a8.28 8.28 0 005.58 2.15V11.7a4.83 4.83 0 01-3.77-1.24V6.69h3.77z"/>
    </svg>
  );
}
function InstagramIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
    </svg>
  );
}
function FacebookIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );
}
function TwitterXIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  );
}
function PinterestIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12.017 24c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641 0 12.017 0z"/>
    </svg>
  );
}
function RedditIcon({ className = "h-5 w-5" }: { className?: string }) {
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
  { name: "Instagram", color: "#E1306C", gradient: "linear-gradient(135deg, #833AB4, #FD1D1D, #F77737)", Icon: InstagramIcon },
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
const RED = "#E52222";

/* ──────── Translations (ID/EN) — No YouTube ──────── */
const translations: Record<string, Record<string, string>> = {
  id: {
    "nav.download": "Download",
    "hero.small": "Online Video",
    "hero.big": "Downloader",
    "hero.subtitle": "Jangan Lewatkan! Coba GetMova Video Downloader, Solusi Gratis Untuk Download Video Dari Berbagai Platform Dengan Cepat Dan Mudah!",
    "input.placeholder": "Masukkan Link Video Di Sini...",
    "btn.download": "Download",
    "result.found": "Video berhasil ditemukan!",
    "result.selectQuality": "Pilih kualitas:",
    "result.preview": "Preview", "result.share": "Bagikan",
    "result.bookmark": "Bookmark", "result.bookmarked": "Tersimpan",
    "result.downloadThumb": "Thumbnail",
    "result.copyCaption": "Salin Caption", "result.captionCopied": "Caption disalin!",
    "platforms.label": "Platform Yang Didukung",
    "free.badge": "Gratis",
    "free.title1": "Video",
    "free.titleRed": "Downloader",
    "free.desc": "Dengan Platform Ini, Kamu Bisa Dengan Mudah Download Video Dari Berbagai Platform Sosial Media Secara Gratis Tanpa Watermark!",
    "free.btn": "Pelajari Lebih Lanjut",
    "how.title": "Cara Menggunakan GetMova",
    "how.step1.title": "Cari Video",
    "how.step1.desc": "Temukan video yang kamu inginkan dari platform yang tersedia dan salin link-nya.",
    "how.step2.title": "Tempel Link",
    "how.step2.desc": "Tempel link yang sudah disalin di kolom input di atas lalu tunggu sistem menampilkan link download.",
    "how.step3.title": "Download Video",
    "how.step3.desc": "Pilih kualitas yang diinginkan dan klik tombol download untuk menyimpan video ke perangkatmu.",
    "feat1.title": "Download Cepat",
    "feat1.desc": "Proses download super cepat dengan server yang handal. Tidak perlu menunggu lama untuk mendapatkan video favoritmu.",
    "feat2.title": "Kualitas HD",
    "feat2.desc": "Download video dalam kualitas tinggi hingga Full HD. Nikmati video dengan resolusi terbaik tanpa kompromi.",
    "feat3.title": "Tanpa Watermark",
    "feat3.desc": "Semua video yang didownload bebas watermark. Dapatkan video asli tanpa logo atau tanda air yang mengganggu.",
    "why.title": "Kenapa Harus GetMova?",
    "why.1.title": "100% Gratis",
    "why.1.desc": "Download video sepuasnya tanpa biaya apapun. Tidak ada biaya tersembunyi atau langganan.",
    "why.2.title": "Tanpa Registrasi",
    "why.2.desc": "Tidak perlu daftar atau login. Langsung paste link dan download video secara instan.",
    "why.3.title": "Multi-Platform",
    "why.3.desc": "Support TikTok, Instagram, Facebook, Twitter/X, Pinterest, Reddit dan masih banyak lagi.",
    "why.4.title": "Aman & Privat",
    "why.4.desc": "Tidak ada data pribadi yang disimpan. Semua proses dilakukan secara aman dan terenkripsi.",
    "faq.title": "Pertanyaan Yang Sering",
    "faq.titleRed": "Diajukan",
    "faq.1.q": "Apakah GetMova benar-benar gratis?",
    "faq.1.a": "Ya, GetMova 100% gratis tanpa biaya tersembunyi. Kamu bisa download video sepuasnya tanpa perlu mendaftar atau membayar apapun.",
    "faq.2.q": "Apakah ada batasan jumlah download?",
    "faq.2.a": "Tidak ada batasan! Kamu bisa mendownload video sebanyak yang kamu mau tanpa batas harian atau bulanan.",
    "faq.3.q": "Di mana video yang didownload disimpan?",
    "faq.3.a": "Video akan otomatis tersimpan di folder download perangkatmu, baik di HP maupun komputer.",
    "faq.4.q": "Apakah bisa download tanpa batas?",
    "faq.4.a": "Ya, tidak ada batasan jumlah download. Kamu bisa download video sebanyak yang kamu mau kapan saja.",
    "footer.desc": "Download video tanpa watermark dari berbagai platform populer. Cepat, gratis, dan mudah.",
    "error.emptyUrl": "Masukkan link video terlebih dahulu!",
    "error.invalidUrl": "URL tidak valid. Pastikan link yang dimasukkan benar.",
    "error.server": "Gagal terhubung ke server. Silakan coba lagi.",
    "error.downloadFail": "Gagal mengunduh video. Coba klik kanan pada tombol download dan pilih 'Save link as...'",
    "toast.videoFound": "Video ditemukan!",
    "toast.selectQuality": "Pilih kualitas dan download.",
    "toast.downloadStart": "Download dimulai!",
    "toast.linkCopied": "Link berhasil disalin!",
    "toast.bookmarkAdded": "Video disimpan ke bookmark!",
    "toast.bookmarkRemoved": "Bookmark dihapus.",
  },
  en: {
    "nav.download": "Download",
    "hero.small": "Online Video",
    "hero.big": "Downloader",
    "hero.subtitle": "Do Not Look Below! Explore Our GetMova Video Downloader, A Free Solution To Quickly Download Videos Or Music With Just One Click!",
    "input.placeholder": "Insert Video Link Here...",
    "btn.download": "Download",
    "result.found": "Video found successfully!",
    "result.selectQuality": "Select quality:",
    "result.preview": "Preview", "result.share": "Share",
    "result.bookmark": "Bookmark", "result.bookmarked": "Saved",
    "result.downloadThumb": "Thumbnail",
    "result.copyCaption": "Copy Caption", "result.captionCopied": "Caption copied!",
    "platforms.label": "Supported Platforms",
    "free.badge": "Free",
    "free.title1": "Video",
    "free.titleRed": "Downloader",
    "free.desc": "With This Platform, You Can Easily Download Any Video From Various Social Media Platforms For Free Without Watermark!",
    "free.btn": "Learn More",
    "how.title": "How To Use GetMova",
    "how.step1.title": "Find Video",
    "how.step1.desc": "Find the video you want from the available platforms and copy its link.",
    "how.step2.title": "Paste Link",
    "how.step2.desc": "Paste the copied link in the input field above and wait for the system to display the download links.",
    "how.step3.title": "Download Video",
    "how.step3.desc": "Select the desired quality and click the download button to save the video to your device.",
    "feat1.title": "Fast Download",
    "feat1.desc": "Super fast download process with reliable servers. No need to wait long to get your favorite videos.",
    "feat2.title": "HD Quality",
    "feat2.desc": "Download videos in high quality up to Full HD. Enjoy videos with the best resolution without compromise.",
    "feat3.title": "No Watermark",
    "feat3.desc": "All downloaded videos are watermark-free. Get original videos without annoying logos or watermarks.",
    "why.title": "Why Choose GetMova?",
    "why.1.title": "100% Free",
    "why.1.desc": "Download as many videos as you want without any cost. No hidden fees or subscriptions.",
    "why.2.title": "No Registration",
    "why.2.desc": "No need to sign up or login. Just paste the link and download videos instantly.",
    "why.3.title": "Multi-Platform",
    "why.3.desc": "Support TikTok, Instagram, Facebook, Twitter/X, Pinterest, Reddit and many more.",
    "why.4.title": "Safe & Private",
    "why.4.desc": "No personal data stored. All processes are done securely and encrypted.",
    "faq.title": "Frequently Asked",
    "faq.titleRed": "Questions",
    "faq.1.q": "Is GetMova really free?",
    "faq.1.a": "Yes, GetMova is 100% free with no hidden costs. You can download as many videos as you want without registering or paying anything.",
    "faq.2.q": "Is there a download limit?",
    "faq.2.a": "No limits! You can download as many videos as you want without daily or monthly restrictions.",
    "faq.3.q": "Where are the downloaded videos stored?",
    "faq.3.a": "Videos will automatically be saved to your device's download folder, whether on phone or computer.",
    "faq.4.q": "Can we download unlimited?",
    "faq.4.a": "Yes, there is no download limit. You can download as many videos as you want anytime.",
    "footer.desc": "Download videos without watermark from popular platforms. Fast, free, and easy.",
    "error.emptyUrl": "Please enter a video link first!",
    "error.invalidUrl": "Invalid URL. Make sure the link is correct.",
    "error.server": "Failed to connect to server. Please try again.",
    "error.downloadFail": "Failed to download video. Try right-clicking the download button and select 'Save link as...'",
    "toast.videoFound": "Video found!",
    "toast.selectQuality": "Select quality and download.",
    "toast.downloadStart": "Download started!",
    "toast.linkCopied": "Link copied successfully!",
    "toast.bookmarkAdded": "Video saved to bookmarks!",
    "toast.bookmarkRemoved": "Bookmark removed.",
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
   NAVBAR — VideoMax style: white bg, logo left, lang right
   ══════════════════════════════════════════════════ */
function Navbar() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { setTheme, theme } = useTheme();
  const { lang, setLang, t } = useLanguage();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const handler = (e: Event) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler as EventListener);
    return () => { document.removeEventListener("mousedown", handler); document.removeEventListener("touchstart", handler as EventListener); };
  }, [open]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-[#2D2D2D] border-b border-border">
      <div className="mx-auto max-w-6xl h-14 md:h-16 flex items-center justify-between px-4 md:px-6">
        <a href="/" className="flex items-center gap-1.5 shrink-0" aria-label="GetMova - Home">
          <MovaLogo size={28} showText={true} />
        </a>

        {/* Desktop right side */}
        <div className="hidden md:flex items-center gap-3">
          <button onClick={() => setLang(lang === "id" ? "en" : "id")} className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors" aria-label="Toggle language">
            <Globe className="h-4 w-4" />
            {lang === "id" ? "EN" : "ID"}
          </button>
          <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="h-8 w-8 flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors" aria-label="Toggle theme">
            {mounted ? (theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />) : <Sun className="h-4 w-4" />}
          </button>
          <a href="#hero">
            <Button size="sm" className="h-9 px-5 bg-[#E52222] text-white font-semibold rounded-lg hover:bg-[#C91C1C] transition-colors text-sm">
              <Download className="mr-1.5 h-3.5 w-3.5" />{t("nav.download")}
            </Button>
          </a>
        </div>

        {/* Mobile buttons */}
        <div className="flex md:hidden items-center gap-1">
          <button onClick={() => setLang(lang === "id" ? "en" : "id")} className="flex items-center gap-1 h-8 px-2 text-muted-foreground text-xs font-bold">
            <Globe className="h-3.5 w-3.5" />{lang === "id" ? "EN" : "ID"}
          </button>
          <button onClick={() => setOpen(!open)} className="h-8 w-8 flex items-center justify-center text-muted-foreground" aria-label="Menu">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div ref={menuRef} className="md:hidden border-t border-border bg-white dark:bg-[#2D2D2D]">
          <div className="px-4 py-3 space-y-1">
            <a href="#hero" onClick={() => setOpen(false)} className="block px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg">{lang === "id" ? "Home" : "Home"}</a>
            <a href="#how" onClick={() => setOpen(false)} className="block px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg">{lang === "id" ? "Cara Pakai" : "How to Use"}</a>
            <a href="#features" onClick={() => setOpen(false)} className="block px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg">{lang === "id" ? "Fitur" : "Features"}</a>
            <a href="#faq" onClick={() => setOpen(false)} className="block px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg">FAQ</a>
            <button onClick={() => { setTheme(theme === "dark" ? "light" : "dark"); setOpen(false); }} className="block w-full text-left px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg">
              {mounted && theme === "dark" ? (lang === "id" ? "Mode Terang" : "Light Mode") : (lang === "id" ? "Mode Gelap" : "Dark Mode")}
            </button>
            <a href="#hero" onClick={() => setOpen(false)} className="block pt-1">
              <Button className="w-full bg-[#E52222] text-white font-semibold rounded-lg hover:bg-[#C91C1C]">
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
   HERO — VideoMax style: background image + overlay, two-line headline
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
    const isAudio = q.resolution === "MP3" || q.label === "Audio" || q.label === "Audio (Low)";
    const downloadUrl = q.url;
    const fallbackUrl = q.originalUrl || q.url;

    setDownloading(true);

    const saveHist = () => {
      saveToHistory({
        id: Date.now().toString(), title: result.title, platform: result.platform,
        author: result.author, thumbnail: result.thumbnail, duration: result.duration,
        url: url.trim(), downloadUrl: fallbackUrl, timestamp: Date.now(),
      });
    };

    try {
      if (isAudio || downloadUrl.startsWith("/api/proxy") || downloadUrl.startsWith("/api/yt-download")) {
        try {
          const res = await fetch(downloadUrl);
          if (res.ok) {
            const blob = await res.blob();
            if (blob.size > 1000) {
              const blobUrl = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = blobUrl; a.download = downloadName; a.style.display = "none";
              document.body.appendChild(a); a.click(); document.body.removeChild(a);
              setTimeout(() => URL.revokeObjectURL(blobUrl), 10000);
              saveHist(); showToast(t("toast.downloadStart"), isAudio ? "MP3" : "");
              setDownloading(false); return;
            }
          }
        } catch (e) { console.log("Proxy fetch+blob failed", e); }
      }

      try {
        const a = document.createElement("a");
        a.href = downloadUrl; a.download = downloadName; a.style.display = "none";
        document.body.appendChild(a); a.click(); document.body.removeChild(a);
        saveHist(); showToast(t("toast.downloadStart"), "");
      } catch (e) {
        console.log("<a> tag approach failed", e);
        try { window.open(fallbackUrl, "_blank"); saveHist(); } catch { showToast(t("error.downloadFail"), "", "destructive"); }
      }
    } catch (e) {
      console.error("Download failed:", e);
      try { window.open(fallbackUrl, "_blank"); } catch { showToast(t("error.downloadFail"), "", "destructive"); }
    } finally {
      setDownloading(false);
    }
  }, [result, selectedQuality, url, t, showToast, downloading]);

  const handleShare = useCallback(async () => {
    if (!result) return;
    try { await navigator.share({ title: result.title, url }); } catch { try { await navigator.clipboard.writeText(url); showToast(t("toast.linkCopied"), ""); } catch {} }
  }, [result, url, t, showToast]);

  const handleToggleBookmark = useCallback(() => {
    if (!result) return;
    if (isBookmarkedState) {
      removeBookmark(result.downloadUrl); setIsBookmarkedState(false);
      showToast(t("toast.bookmarkRemoved"), "");
    } else {
      saveBookmark({
        id: Date.now().toString(), title: result.title, platform: result.platform,
        author: result.author, thumbnail: result.thumbnail, duration: result.duration,
        url: url.trim(), timestamp: Date.now(),
      });
      setIsBookmarkedState(true); showToast(t("toast.bookmarkAdded"), "");
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
      document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(a.href);
    } catch {}
  }, [result]);

  const detectedPlatform = result ? detectPlatform(url) : url.trim() ? detectPlatform(url) : null;
  const platformDef = detectedPlatform ? getPlatformDef(detectedPlatform) : null;

  return (
    <section id="hero" className="hero-bg relative pt-28 md:pt-40 pb-16 md:pb-28 px-4 md:px-6">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image src="/hero-bg.png" alt="" fill className="object-cover" priority />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        {/* Two-line headline like VideoMax */}
        <p className="text-white/80 text-sm md:text-base font-medium mb-1 tracking-wide uppercase">{t("hero.small")}</p>
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-4 md:mb-6 font-[family-name:var(--font-montserrat)] leading-[1.05] tracking-tight">
          {t("hero.big")}
        </h1>
        <p className="text-white/70 text-sm md:text-base max-w-xl mx-auto leading-relaxed mb-8 md:mb-10">
          {t("hero.subtitle")}
        </p>

        {/* Input + Button */}
        <div className="max-w-xl mx-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
          <div className="flex-1 relative">
            <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              ref={inputRef}
              value={url}
              onChange={e => setUrl(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleAnalyze()}
              placeholder={t("input.placeholder")}
              className="h-12 md:h-14 bg-white border-0 rounded-lg text-sm md:text-base pl-11 pr-4 text-gray-900 placeholder:text-gray-400 shadow-lg focus:ring-2 focus:ring-[#E52222]/30"
            />
          </div>
          <Button onClick={handleAnalyze} disabled={loading} className="h-12 md:h-14 px-8 bg-[#E52222] text-white font-bold rounded-lg hover:bg-[#C91C1C] shrink-0 text-sm md:text-base transition-colors shadow-lg">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4 mr-2" />}
            <span>{loading ? (loadingMsg || t("btn.download")) : t("btn.download")}</span>
          </Button>
        </div>

        {/* Loading */}
        {loading && !error && (
          <div className="max-w-lg mx-auto mt-5 p-3 rounded-lg bg-white/10 backdrop-blur flex items-center gap-2">
            <Loader2 className="h-4 w-4 text-white animate-spin shrink-0" />
            <p className="text-white text-sm text-left font-medium">{loadingMsg || "Processing..."}</p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="max-w-lg mx-auto mt-5 p-3 rounded-lg bg-red-500/20 backdrop-blur border border-red-400/30 flex items-start gap-2">
            <AlertCircle className="h-4 w-4 text-red-300 mt-0.5 shrink-0" />
            <p className="text-red-200 text-sm text-left">{error}</p>
          </div>
        )}

        {/* Result card */}
        {result && (
          <div ref={resultRef} className="max-w-lg mx-auto mt-5 rounded-lg bg-white overflow-hidden text-left shadow-xl">
            <div className="px-4 py-2.5 border-b border-gray-100 flex items-center gap-2 bg-gray-50">
              <CheckCircle className="h-4 w-4 text-[#E52222] shrink-0" />
              <span className="text-sm text-[#E52222] font-medium">{t("result.found")}</span>
              <div className="ml-auto flex items-center gap-1.5">
                {(() => { const pd = getPlatformDef(result.platform); return (
                  <div className="w-4 h-4 rounded flex items-center justify-center" style={{ background: pd.gradient || pd.color }}>
                    <pd.Icon className="h-2.5 w-2.5 text-white" />
                  </div>
                ); })()}
                <span className="text-xs text-gray-500">{result.platform}</span>
              </div>
            </div>

            <div className="p-4">
              {showPreview && !previewError ? (
                <div className="w-full rounded-md overflow-hidden bg-gray-100 mb-3">
                  <video src={result.qualityOptions[0]?.originalUrl || result.qualityOptions[0]?.url} controls muted className="w-full object-contain" style={{ maxHeight: "200px" }} onError={() => setPreviewError(true)} />
                </div>
              ) : (
                <div className="flex gap-3 mb-3">
                  <div className="w-20 h-14 rounded-md bg-gray-100 flex items-center justify-center shrink-0 overflow-hidden relative">
                    {result.thumbnail && <Image src={result.thumbnail} alt={result.title} width={80} height={56} className="w-full h-full object-cover" unoptimized />}
                    <Play className="h-4 w-4 absolute text-[#E52222]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 text-sm line-clamp-2">{result.title}</h3>
                    <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                      {result.duration !== "--:--" && <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{result.duration}</span>}
                      <span className="flex items-center gap-1"><User className="h-3 w-3" />{result.author}</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex flex-wrap gap-0.5 mb-3">
                <Button variant="ghost" size="sm" onClick={() => { setShowPreview(!showPreview); setPreviewError(false); }} className="text-xs text-gray-500 hover:text-gray-900 h-7">
                  {showPreview ? <EyeOff className="h-3 w-3 mr-1" /> : <Eye className="h-3 w-3 mr-1" />}{t("result.preview")}
                </Button>
                <Button variant="ghost" size="sm" onClick={handleShare} className="text-xs text-gray-500 hover:text-gray-900 h-7">
                  <Share2 className="h-3 w-3 mr-1" />{t("result.share")}
                </Button>
                <Button variant="ghost" size="sm" onClick={handleToggleBookmark} className="text-xs h-7" style={{ color: isBookmarkedState ? RED : "#999" }}>
                  <Bookmark className={`h-3 w-3 mr-1 ${isBookmarkedState ? "fill-current" : ""}`} />{isBookmarkedState ? t("result.bookmarked") : t("result.bookmark")}
                </Button>
                <Button variant="ghost" size="sm" onClick={handleCopyCaption} className="text-xs text-gray-500 hover:text-gray-900 h-7">
                  <Copy className="h-3 w-3 mr-1" />{t("result.copyCaption")}
                </Button>
              </div>

              {result.qualityOptions.length > 0 && (
                <div className="mb-3">
                  <p className="text-xs font-medium text-gray-500 mb-2 flex items-center gap-1.5">
                    <Film className="h-3 w-3 text-[#E52222]" />{t("result.selectQuality")}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {result.qualityOptions.map((q, i) => {
                      const isSelected = selectedQuality === i;
                      return (
                        <button key={i} onClick={() => setSelectedQuality(i)}
                          className={`flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg border font-medium transition-colors ${
                            isSelected ? "text-white bg-[#E52222] border-[#E52222]" : "bg-white text-gray-600 border-gray-200 hover:border-[#E52222]/30"
                          }`}
                        >
                          <span>{q.label}</span>
                          <span className="opacity-70">{q.resolution}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              <Button onClick={handleDownload} disabled={downloading}
                className="w-full h-11 bg-[#E52222] text-white font-bold rounded-lg hover:bg-[#C91C1C] text-sm">
                {downloading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Downloading...</> : <><Download className="mr-2 h-4 w-4" />{t("btn.download")}</>}
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════
   SUPPORTED PLATFORMS BAR — Dark gray, white icons
   ══════════════════════════════════════════════════ */
function PlatformsBar() {
  const { t } = useLanguage();
  return (
    <section className="bg-[#2D2D2D] py-4 md:py-5 px-4">
      <div className="mx-auto max-w-5xl">
        <p className="text-white/60 text-xs text-center mb-3 uppercase tracking-wider font-medium">{t("platforms.label")}</p>
        <div className="flex items-center justify-center gap-6 md:gap-10">
          {PLATFORMS.map(p => (
            <a key={p.name} href={`/${p.name.toLowerCase().replace('/', '').replace(' ', '-')}-downloader`}
              className="text-white/70 hover:text-white transition-colors flex flex-col items-center gap-1">
              <p.Icon className="h-5 w-5 md:h-6 md:w-6" />
              <span className="text-[10px] md:text-xs font-medium">{p.name}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════
   FREE VIDEO DOWNLOADER — White card, red badge
   ══════════════════════════════════════════════════ */
function FreeDownloaderSection() {
  const { t } = useLanguage();
  return (
    <section className="py-12 md:py-20 px-4 md:px-6 bg-white dark:bg-[#1A1A1A]">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          {/* Left: Text content */}
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="bg-[#E52222] text-white text-xs font-bold px-3 py-1 rounded-full">{t("free.badge")}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground mb-3 font-[family-name:var(--font-montserrat)] leading-tight">
              {t("free.title1")} <span className="text-[#E52222]">{t("free.titleRed")}</span>
            </h2>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-5 max-w-md">
              {t("free.desc")}
            </p>
            <a href="#hero">
              <Button className="bg-[#2D2D2D] dark:bg-white dark:text-[#2D2D2D] text-white font-semibold rounded-lg hover:bg-[#3D3D3D] dark:hover:bg-gray-100 px-6 h-11 text-sm">
                {t("free.btn")} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </a>
          </div>
          {/* Right: Decorative visual */}
          <div className="flex-shrink-0">
            <div className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-[#E52222]/10 flex items-center justify-center">
              <div className="w-36 h-36 md:w-48 md:h-48 rounded-full bg-[#E52222]/20 flex items-center justify-center">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-[#E52222] flex items-center justify-center shadow-lg">
                  <Play className="h-10 w-10 md:h-14 md:w-14 text-white ml-1" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════
   HOW TO USE — Steps with red numbered circles
   ══════════════════════════════════════════════════ */
function HowToUseSection() {
  const { t } = useLanguage();
  const steps = [
    { num: "01", icon: Search, title: t("how.step1.title"), desc: t("how.step1.desc") },
    { num: "02", icon: LinkIcon, title: t("how.step2.title"), desc: t("how.step2.desc") },
    { num: "03", icon: Download, title: t("how.step3.title"), desc: t("how.step3.desc") },
  ];

  return (
    <section id="how" className="py-12 md:py-20 px-4 md:px-6 bg-[#F5F5F5] dark:bg-[#1A1A1A]">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
          {/* Left: Illustration */}
          <div className="flex-shrink-0">
            <div className="relative w-56 h-56 md:w-72 md:h-72">
              <div className="absolute inset-0 rounded-3xl bg-[#E52222] rotate-6"></div>
              <div className="absolute inset-0 rounded-3xl bg-[#E52222]/80 flex items-center justify-center">
                <div className="text-center text-white">
                  <Download className="h-12 w-12 md:h-16 md:w-16 mx-auto mb-3" />
                  <p className="text-lg md:text-xl font-bold">GetMova</p>
                  <p className="text-white/70 text-xs md:text-sm">Video Downloader</p>
                </div>
              </div>
            </div>
          </div>
          {/* Right: Steps */}
          <div className="flex-1">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-foreground mb-6 md:mb-8 font-[family-name:var(--font-montserrat)]">{t("how.title")}</h2>
            <div className="space-y-5 md:space-y-6">
              {steps.map((s, i) => {
                const Icon = s.icon;
                return (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#E52222] flex items-center justify-center shrink-0 shadow-md">
                      <span className="text-white font-bold text-sm md:text-base">{s.num}</span>
                    </div>
                    <div>
                      <h3 className="text-sm md:text-base font-bold text-foreground mb-1">{s.title}</h3>
                      <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════
   FEATURE CARDS (01, 02, 03) — Dark gray bg
   ══════════════════════════════════════════════════ */
function FeatureCardsSection() {
  const { t } = useLanguage();
  const features = [
    { num: "01", icon: Zap, title: t("feat1.title"), desc: t("feat1.desc") },
    { num: "02", icon: Film, title: t("feat2.title"), desc: t("feat2.desc") },
    { num: "03", icon: CheckCircle, title: t("feat3.title"), desc: t("feat3.desc") },
  ];

  return (
    <section id="features" className="dark-section-bg py-12 md:py-20 px-4 md:px-6">
      <div className="mx-auto max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div key={i} className="bg-[#3D3D3D] dark:bg-[#333] rounded-xl p-6 md:p-8">
                <span className="text-[#E52222] text-3xl md:text-4xl font-extrabold font-[family-name:var(--font-montserrat)]">{f.num}</span>
                <div className="mt-3 mb-2">
                  <Icon className="h-6 w-6 text-[#E52222]" />
                </div>
                <h3 className="text-white text-base md:text-lg font-bold mb-2">{f.title}</h3>
                <p className="text-white/60 text-xs md:text-sm leading-relaxed">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════
   WHY CHOOSE GETMOVA — 4 benefit cards
   ══════════════════════════════════════════════════ */
function WhyChooseSection() {
  const { t } = useLanguage();
  const benefits = [
    { icon: Zap, title: t("why.1.title"), desc: t("why.1.desc"), color: "#E52222" },
    { icon: Smartphone, title: t("why.2.title"), desc: t("why.2.desc"), color: "#E52222" },
    { icon: Share2, title: t("why.3.title"), desc: t("why.3.desc"), color: "#E52222" },
    { icon: Shield, title: t("why.4.title"), desc: t("why.4.desc"), color: "#E52222" },
  ];

  return (
    <section className="py-12 md:py-20 px-4 md:px-6 bg-white dark:bg-[#1A1A1A]">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-foreground text-center mb-8 md:mb-12 font-[family-name:var(--font-montserrat)]">{t("why.title")}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {benefits.map((b, i) => {
            const Icon = b.icon;
            return (
              <div key={i} className="bg-[#F5F5F5] dark:bg-[#2D2D2D] rounded-xl p-4 md:p-6 text-center">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#E52222]/10 flex items-center justify-center mx-auto mb-3">
                  <Icon className="h-5 w-5 md:h-6 md:w-6 text-[#E52222]" />
                </div>
                <h3 className="text-sm md:text-base font-bold text-foreground mb-1">{b.title}</h3>
                <p className="text-[11px] md:text-xs text-muted-foreground leading-relaxed">{b.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════
   FAQ — Dark gray bg, red "Questions" highlight
   ══════════════════════════════════════════════════ */
function FAQSection() {
  const { t } = useLanguage();
  const faqItems = [
    { q: t("faq.1.q"), a: t("faq.1.a") },
    { q: t("faq.2.q"), a: t("faq.2.a") },
    { q: t("faq.3.q"), a: t("faq.3.a") },
    { q: t("faq.4.q"), a: t("faq.4.a") },
  ];

  return (
    <section id="faq" className="dark-section-bg py-12 md:py-20 px-4 md:px-6">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white text-center mb-8 md:mb-12 font-[family-name:var(--font-montserrat)]">
          {t("faq.title")} <span className="text-[#E52222]">{t("faq.titleRed")}</span>
        </h2>
        <div className="space-y-3">
          {faqItems.map((f, i) => (
            <details key={i} className="group bg-[#3D3D3D] dark:bg-[#333] rounded-lg">
              <summary className="flex items-center justify-between px-5 py-4 cursor-pointer text-sm md:text-base font-medium text-white hover:text-[#E52222] transition-colors list-none">
                <span className="pr-3">{f.q}</span>
                <ChevronDown className="h-4 w-4 text-white/50 shrink-0 group-open:rotate-180 transition-transform duration-200" />
              </summary>
              <div className="px-5 pb-4 text-xs md:text-sm text-white/60 leading-relaxed border-t border-white/10 pt-3">
                {f.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════
   FOOTER — Dark gray, GetMova logo, links
   ══════════════════════════════════════════════════ */
function Footer() {
  const { t, lang } = useLanguage();
  return (
    <footer className="dark-section-bg border-t border-white/10" role="contentinfo">
      <div className="mx-auto max-w-6xl px-4 md:px-6 py-10 md:py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          <div className="col-span-2 md:col-span-1">
            <MovaLogo size={24} showText />
            <p className="text-white/40 text-xs mt-3 leading-relaxed max-w-xs">{t("footer.desc")}</p>
          </div>
          <div>
            <h4 className="text-white font-semibold text-sm mb-3">{lang === "id" ? "Platform" : "Platforms"}</h4>
            <ul className="space-y-2">
              {PLATFORMS.slice(0, 4).map(p => (
                <li key={p.name}><a href={`/${p.name.toLowerCase().replace('/', '').replace(' ', '-')}-downloader`} className="text-white/40 hover:text-white text-xs transition-colors">{p.name} Downloader</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold text-sm mb-3">{lang === "id" ? "Perusahaan" : "Company"}</h4>
            <ul className="space-y-2">
              <li><a href="/about" className="text-white/40 hover:text-white text-xs transition-colors">{lang === "id" ? "Tentang Kami" : "About Us"}</a></li>
              <li><a href="/contact" className="text-white/40 hover:text-white text-xs transition-colors">{lang === "id" ? "Kontak" : "Contact"}</a></li>
              <li><a href="/blog" className="text-white/40 hover:text-white text-xs transition-colors">Blog</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Legal</h4>
            <ul className="space-y-2">
              <li><a href="/privacy" className="text-white/40 hover:text-white text-xs transition-colors">{lang === "id" ? "Kebijakan Privasi" : "Privacy Policy"}</a></li>
              <li><a href="/terms" className="text-white/40 hover:text-white text-xs transition-colors">{lang === "id" ? "Syarat & Ketentuan" : "Terms of Service"}</a></li>
              <li><a href="/dmca" className="text-white/40 hover:text-white text-xs transition-colors">DMCA</a></li>
              <li><a href="/disclaimer" className="text-white/40 hover:text-white text-xs transition-colors">Disclaimer</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 pt-5 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-white/25 text-xs">&copy; 2024-2026 GetMova. All rights reserved.</p>
          <p className="text-white/15 text-[10px] text-center sm:text-right">
            {lang === "id" ? "GetMova tidak menyimpan konten berhak cipta. Pengguna bertanggung jawab atas penggunaan konten yang diunduh." : "GetMova does not store copyrighted content. Users are responsible for downloaded content usage."}
          </p>
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
    <nav className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white dark:bg-[#2D2D2D] border-t border-border">
      <div className="flex items-center justify-around px-2 py-2">
        {[
          { icon: Download, label: "Download", href: "#hero", highlight: true },
          { icon: Bookmark, label: "Saved", href: "#hero" },
          { icon: Shield, label: "FAQ", href: "#faq" },
        ].map(item => (
          <a key={item.label} href={item.href} className={`flex flex-col items-center gap-0.5 py-1 px-6 rounded-lg transition-colors ${item.highlight ? "text-[#E52222]" : "text-gray-400 dark:text-white/50"}`}>
            {item.highlight && <div className="w-1 h-1 rounded-full bg-[#E52222] mb-0.5" />}
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
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-1 pb-14 md:pb-0">
          <HeroSection />
          <PlatformsBar />
          <FreeDownloaderSection />
          <HowToUseSection />
          <FeatureCardsSection />
          <WhyChooseSection />
          <FAQSection />
          {/* JSON-LD */}
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              { "@type": "Question", name: "Apakah GetMova benar-benar gratis?", acceptedAnswer: { "@type": "Answer", text: "Ya, GetMova 100% gratis tanpa biaya tersembunyi. Kamu bisa download video sepuasnya tanpa perlu mendaftar atau membayar apapun." } },
              { "@type": "Question", name: "Apakah ada batasan jumlah download?", acceptedAnswer: { "@type": "Answer", text: "Tidak ada batasan! Kamu bisa mendownload video sebanyak yang kamu mau tanpa batas harian atau bulanan." } },
              { "@type": "Question", name: "Apakah GetMova aman digunakan?", acceptedAnswer: { "@type": "Answer", text: "Sangat aman! Kami tidak menyimpan data pribadi atau riwayat download kamu. Semua proses dilakukan secara aman." } },
            ]
          })}} />
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: "Cara Download Video Tanpa Watermark dengan GetMova",
            step: [
              { "@type": "HowToStep", position: 1, name: "Cari Video", text: "Temukan video yang kamu inginkan dan salin link-nya." },
              { "@type": "HowToStep", position: 2, name: "Tempel Link", text: "Tempel link yang sudah disalin di kolom input GetMova." },
              { "@type": "HowToStep", position: 3, name: "Download", text: "Pilih kualitas dan klik download untuk menyimpan video." }
            ]
          })}} />
        </main>
        <Footer />
        <MobileBottomNav />
      </div>
    </LanguageProvider>
  );
}

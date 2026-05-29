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
    "faq.subtitle": "Temukan jawaban untuk pertanyaan yang sering ditanyakan tentang GetMova",
    "faq.1.q": "Apakah GetMova benar-benar gratis?",
    "faq.1.a": "Ya, GetMova 100% gratis tanpa biaya tersembunyi. Kamu bisa download video sepuasnya tanpa perlu mendaftar atau membayar apapun. Semua fitur bisa kamu gunakan secara penuh tanpa batasan.",
    "faq.2.q": "Apakah ada batasan jumlah download?",
    "faq.2.a": "Tidak ada batasan! Kamu bisa mendownload video sebanyak yang kamu mau tanpa batas harian atau bulanan. Download sepuasnya kapan saja dan di mana saja.",
    "faq.3.q": "Di mana video yang didownload disimpan?",
    "faq.3.a": "Video akan otomatis tersimpan di folder download perangkatmu, baik di HP maupun komputer. Kalau di HP biasanya ada di folder Download, kalau di komputer ada di folder Downloads.",
    "faq.4.q": "Platform apa saja yang didukung?",
    "faq.4.a": "GetMova mendukung berbagai platform populer seperti TikTok, Instagram, Facebook, Twitter/X, Pinterest, dan Reddit. Kami terus menambahkan platform baru secara berkala.",
    "faq.5.q": "Apakah video yang didownload bebas watermark?",
    "faq.5.a": "Ya! Semua video yang didownload melalui GetMova bebas watermark. Kamu akan mendapatkan video asli tanpa logo atau tanda air yang mengganggu.",
    "faq.6.q": "Apakah GetMova aman digunakan?",
    "faq.6.a": "Sangat aman! Kami tidak menyimpan data pribadi atau riwayat download kamu. Semua proses dilakukan secara aman dengan enkripsi. Privasi kamu adalah prioritas kami.",
    "faq.cta.title": "Masih punya pertanyaan?",
    "faq.cta.desc": "Hubungi kami jika kamu punya pertanyaan lain yang belum terjawab",
    "faq.cta.btn": "Hubungi Kami",
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
    "faq.subtitle": "Find answers to the most commonly asked questions about GetMova",
    "faq.1.q": "Is GetMova really free?",
    "faq.1.a": "Yes, GetMova is 100% free with no hidden costs. You can download as many videos as you want without registering or paying anything. All features are fully available without limitations.",
    "faq.2.q": "Is there a download limit?",
    "faq.2.a": "No limits! You can download as many videos as you want without daily or monthly restrictions. Download as much as you want, anytime and anywhere.",
    "faq.3.q": "Where are the downloaded videos stored?",
    "faq.3.a": "Videos will automatically be saved to your device's download folder, whether on phone or computer. On mobile, check the Download folder. On desktop, look in the Downloads folder.",
    "faq.4.q": "What platforms are supported?",
    "faq.4.a": "GetMova supports various popular platforms including TikTok, Instagram, Facebook, Twitter/X, Pinterest, and Reddit. We continue to add new platforms regularly.",
    "faq.5.q": "Are downloaded videos watermark-free?",
    "faq.5.a": "Yes! All videos downloaded through GetMova are watermark-free. You'll get the original video without any annoying logos or watermarks.",
    "faq.6.q": "Is GetMova safe to use?",
    "faq.6.a": "Absolutely safe! We don't store any personal data or download history. All processes are done securely with encryption. Your privacy is our priority.",
    "faq.cta.title": "Still have questions?",
    "faq.cta.desc": "Contact us if you have any other unanswered questions",
    "faq.cta.btn": "Contact Us",
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
   NAVBAR — Solid white bg, logo left, center links, controls right
   ══════════════════════════════════════════════════ */
function Navbar() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { setTheme, theme } = useTheme();
  const { lang, setLang, t } = useLanguage();
  const menuRef = useRef<HTMLDivElement>(null);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!open) return;
    const handler = (e: Event) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler as EventListener);
    return () => { document.removeEventListener("mousedown", handler); document.removeEventListener("touchstart", handler as EventListener); };
  }, [open]);

  const navLinks = [
    { label: "Home", href: "#hero" },
    { label: lang === "id" ? "Cara Pakai" : "How to Use", href: "#how" },
    { label: lang === "id" ? "Fitur" : "Features", href: "#features" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-[#1A1A1A] border-b border-gray-100 dark:border-white/10" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
      <div className="mx-auto max-w-6xl h-16 flex items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <a href="/" className="flex items-center gap-1.5 shrink-0" aria-label="GetMova - Home">
          <MovaLogo size={28} showText={true} />
        </a>

        {/* Center navigation links - desktop */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map(link => (
            <a key={link.href} href={link.href} className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-[#E52222] dark:hover:text-[#E52222] transition-colors">
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop right side */}
        <div className="hidden md:flex items-center gap-3">
          <button onClick={() => setLang(lang === "id" ? "en" : "id")} className="flex items-center gap-1.5 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-foreground transition-colors" aria-label="Toggle language">
            <Globe className="h-4 w-4" />
            {lang === "id" ? "EN" : "ID"}
          </button>
          <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="h-8 w-8 flex items-center justify-center rounded-md text-gray-500 dark:text-gray-400 hover:text-foreground hover:bg-gray-100 dark:hover:bg-white/10 transition-colors" aria-label="Toggle theme">
            {mounted ? (theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />) : <Sun className="h-4 w-4" />}
          </button>
        </div>

        {/* Mobile buttons */}
        <div className="flex md:hidden items-center gap-1">
          <button onClick={() => setLang(lang === "id" ? "en" : "id")} className="flex items-center gap-1 h-8 px-2 text-gray-500 dark:text-gray-400 text-xs font-bold">
            <Globe className="h-3.5 w-3.5" />{lang === "id" ? "EN" : "ID"}
          </button>
          <button onClick={() => setOpen(!open)} className="h-8 w-8 flex items-center justify-center text-gray-500 dark:text-gray-400" aria-label="Menu">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div ref={menuRef} className="md:hidden border-t border-gray-100 dark:border-white/10 bg-white dark:bg-[#1A1A1A]">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map(link => (
              <a key={link.href} href={link.href} onClick={() => setOpen(false)} className="block px-3 py-2.5 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-[#E52222] dark:hover:text-[#E52222] rounded-lg">{link.label}</a>
            ))}
            <button onClick={() => { setTheme(theme === "dark" ? "light" : "dark"); setOpen(false); }} className="block w-full text-left px-3 py-2.5 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-[#E52222] rounded-lg">
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
   HERO — White bg, grayscale people image, centered text
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
    <section id="hero" className="hero-bg relative pt-24 md:pt-32 pb-12 md:pb-20 px-4 md:px-6" style={{ minHeight: "70vh" }}>
      {/* Background image — grayscale people */}
      <div className="absolute inset-0 z-0">
        <Image src="/hero-people.png" alt="" fill className="object-cover object-center grayscale" priority />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl flex flex-col items-center text-center">
        {/* Centered heading */}
        <h1 className="text-[28px] sm:text-[36px] md:text-[48px] font-extrabold text-[#333333] dark:text-white mb-3 md:mb-4 font-[family-name:var(--font-montserrat)] leading-tight tracking-tight">
          {t("hero.small")} <span className="text-[#E52222]">{t("hero.big")}</span>
        </h1>
        <p className="text-[#666666] dark:text-gray-400 text-sm max-w-lg leading-relaxed mb-6 md:mb-8">
          {t("hero.subtitle")}
        </p>

        {/* COMBINED Input + Button */}
        <div className="w-full max-w-xl rounded-lg overflow-hidden shadow-xl flex border border-gray-200 dark:border-white/10">
          <div className="flex-1 relative">
            <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 z-10" />
            <input
              ref={inputRef}
              type="text"
              value={url}
              onChange={e => setUrl(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleAnalyze()}
              placeholder={t("input.placeholder")}
              className="h-14 w-full bg-white dark:bg-[#2D2D2D] text-gray-900 dark:text-white text-sm md:text-base pl-11 pr-4 border-0 outline-none placeholder:text-gray-400"
            />
          </div>
          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="h-14 px-6 md:px-8 bg-[#E52222] text-white font-bold text-sm md:text-base hover:bg-[#C91C1C] shrink-0 transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
            <span>{loading ? (loadingMsg || t("btn.download")) : t("btn.download")}</span>
          </button>
        </div>

        {/* Platform support bar — dark gray with white icons */}
        <div className="w-full max-w-xl mt-4 bg-[#333333] dark:bg-[#444444] rounded-lg px-4 py-2.5 flex items-center justify-center gap-3 md:gap-4">
          <span className="text-white text-xs font-medium shrink-0">{t("platforms.label")}</span>
          <div className="flex items-center gap-3 md:gap-4">
            {PLATFORMS.map(p => (
              <span key={p.name} className="text-white/90 hover:text-white transition-colors">
                <p.Icon className="h-4 w-4 md:h-5 md:w-5" />
              </span>
            ))}
          </div>
        </div>

        {/* Loading */}
        {loading && !error && (
          <div className="max-w-lg mt-5 p-3 rounded-lg bg-white/80 dark:bg-[#2D2D2D]/80 backdrop-blur flex items-center gap-2">
            <Loader2 className="h-4 w-4 text-[#E52222] animate-spin shrink-0" />
            <p className="text-[#333] dark:text-white text-sm text-left font-medium">{loadingMsg || "Processing..."}</p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="max-w-lg mt-5 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/30 flex items-start gap-2">
            <AlertCircle className="h-4 w-4 text-[#E52222] mt-0.5 shrink-0" />
            <p className="text-[#E52222] dark:text-red-300 text-sm text-left">{error}</p>
          </div>
        )}

        {/* Result card */}
        {result && (
          <div ref={resultRef} className="max-w-lg mt-5 rounded-xl bg-white dark:bg-[#2D2D2D] overflow-hidden text-left shadow-xl border border-gray-100 dark:border-white/10">
            <div className="px-4 py-2.5 border-b border-gray-100 dark:border-white/10 flex items-center gap-2 bg-gray-50 dark:bg-[#333]">
              <CheckCircle className="h-4 w-4 text-[#E52222] shrink-0" />
              <span className="text-sm text-[#E52222] font-medium">{t("result.found")}</span>
              <div className="ml-auto flex items-center gap-1.5">
                {(() => { const pd = getPlatformDef(result.platform); return (
                  <div className="w-4 h-4 rounded flex items-center justify-center" style={{ background: pd.gradient || pd.color }}>
                    <pd.Icon className="h-2.5 w-2.5 text-white" />
                  </div>
                ); })()}
                <span className="text-xs text-gray-500 dark:text-gray-400">{result.platform}</span>
              </div>
            </div>

            <div className="p-4">
              {showPreview && !previewError ? (
                <div className="w-full rounded-md overflow-hidden bg-gray-100 dark:bg-[#444] mb-3">
                  <video src={result.qualityOptions[0]?.originalUrl || result.qualityOptions[0]?.url} controls muted className="w-full object-contain" style={{ maxHeight: "200px" }} onError={() => setPreviewError(true)} />
                </div>
              ) : (
                <div className="flex gap-3 mb-3">
                  <div className="w-20 h-14 rounded-md bg-gray-100 dark:bg-[#444] flex items-center justify-center shrink-0 overflow-hidden relative">
                    {result.thumbnail && <Image src={result.thumbnail} alt={result.title} width={80} height={56} className="w-full h-full object-cover" unoptimized />}
                    <Play className="h-4 w-4 absolute text-[#E52222]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 dark:text-white text-sm line-clamp-2">{result.title}</h3>
                    <div className="flex items-center gap-3 mt-1 text-xs text-gray-500 dark:text-gray-400">
                      {result.duration !== "--:--" && <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{result.duration}</span>}
                      <span className="flex items-center gap-1"><User className="h-3 w-3" />{result.author}</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex flex-wrap gap-0.5 mb-3">
                <Button variant="ghost" size="sm" onClick={() => { setShowPreview(!showPreview); setPreviewError(false); }} className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white h-7">
                  {showPreview ? <EyeOff className="h-3 w-3 mr-1" /> : <Eye className="h-3 w-3 mr-1" />}{t("result.preview")}
                </Button>
                <Button variant="ghost" size="sm" onClick={handleShare} className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white h-7">
                  <Share2 className="h-3 w-3 mr-1" />{t("result.share")}
                </Button>
                <Button variant="ghost" size="sm" onClick={handleToggleBookmark} className="text-xs h-7" style={{ color: isBookmarkedState ? RED : "#999" }}>
                  <Bookmark className={`h-3 w-3 mr-1 ${isBookmarkedState ? "fill-current" : ""}`} />{isBookmarkedState ? t("result.bookmarked") : t("result.bookmark")}
                </Button>
                <Button variant="ghost" size="sm" onClick={handleCopyCaption} className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white h-7">
                  <Copy className="h-3 w-3 mr-1" />{t("result.copyCaption")}
                </Button>
              </div>

              {result.qualityOptions.length > 0 && (
                <div className="mb-3">
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2 flex items-center gap-1.5">
                    <Film className="h-3 w-3 text-[#E52222]" />{t("result.selectQuality")}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {result.qualityOptions.map((q, i) => {
                      const isSelected = selectedQuality === i;
                      return (
                        <button key={i} onClick={() => setSelectedQuality(i)}
                          className={`flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg border font-medium transition-colors ${
                            isSelected ? "text-white bg-[#E52222] border-[#E52222]" : "bg-white dark:bg-[#333] text-gray-600 dark:text-gray-300 border-gray-200 dark:border-white/10 hover:border-[#E52222]/30"
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
   FREE VIDEO DOWNLOADER — White bg, two columns, red circle decoration
   ══════════════════════════════════════════════════ */
function FreeDownloaderSection() {
  const { t } = useLanguage();
  return (
    <section className="py-14 md:py-20 px-4 md:px-6 bg-white dark:bg-[#1A1A1A]">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
          {/* Left: Text content */}
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="bg-[#E52222] text-white text-[10px] font-bold px-4 py-1 rounded-full uppercase tracking-wider">{t("free.badge")}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-[32px] font-extrabold text-[#333333] dark:text-white mb-4 font-[family-name:var(--font-montserrat)] leading-tight">
              {t("free.title1")} <span className="text-[#E52222]">{t("free.titleRed")}</span>
            </h2>
            <p className="text-sm text-[#666666] dark:text-gray-400 leading-relaxed mb-6 max-w-md mx-auto md:mx-0">
              {t("free.desc")}
            </p>
            <a href="#hero">
              <Button className="bg-[#333333] dark:bg-white dark:text-[#333333] text-white font-semibold rounded-full hover:bg-[#555] dark:hover:bg-gray-100 px-6 h-11 text-sm">
                {t("free.btn")} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </a>
          </div>
          {/* Right: Decorative visual — concentric red circles */}
          <div className="flex-shrink-0">
            <div className="w-52 h-52 md:w-72 md:h-72 rounded-full bg-[#E52222]/10 flex items-center justify-center">
              <div className="w-40 h-40 md:w-56 md:h-56 rounded-full bg-[#E52222]/20 flex items-center justify-center">
                <div className="w-28 h-28 md:w-40 md:h-40 rounded-full bg-[#E52222] flex items-center justify-center shadow-lg">
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
   HOW TO USE — White bg, left person image + red circle, right 3 steps
   ══════════════════════════════════════════════════ */
function HowToUseSection() {
  const { t } = useLanguage();
  const steps = [
    { num: "01", title: t("how.step1.title"), desc: t("how.step1.desc"), filled: true },
    { num: "02", title: t("how.step2.title"), desc: t("how.step2.desc"), filled: true },
    { num: "03", title: t("how.step3.title"), desc: t("how.step3.desc"), filled: false },
  ];

  return (
    <section id="how" className="py-14 md:py-20 px-4 md:px-6 bg-white dark:bg-[#1A1A1A]">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#333333] dark:text-white text-center mb-10 md:mb-14 font-[family-name:var(--font-montserrat)]">{t("how.title")}</h2>

        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
          {/* Left: Person image with red circle accent */}
          <div className="flex-shrink-0 relative">
            <div className="absolute -top-4 -left-4 w-64 h-64 md:w-80 md:h-80 rounded-full bg-[#E52222]/10 z-0" />
            <div className="relative z-10 w-56 h-56 md:w-72 md:h-72 rounded-2xl overflow-hidden">
              <Image src="/how-person.png" alt="Person using phone" fill className="object-cover object-center" />
            </div>
          </div>

          {/* Right: 3 numbered steps */}
          <div className="flex-1 space-y-6 md:space-y-8">
            {steps.map((s, i) => (
              <div key={i} className="flex items-start gap-4">
                {/* Number circle */}
                {s.filled ? (
                  <div className="w-12 h-12 rounded-full bg-[#E52222] flex items-center justify-center shrink-0">
                    <span className="text-white font-bold text-sm">{s.num}</span>
                  </div>
                ) : (
                  <div className="w-12 h-12 rounded-full border-2 border-[#E52222] flex items-center justify-center shrink-0">
                    <span className="text-[#E52222] font-bold text-sm">{s.num}</span>
                  </div>
                )}
                {/* Text */}
                <div>
                  <h3 className="text-base md:text-lg font-bold text-[#333333] dark:text-white mb-1">{s.title}</h3>
                  <p className="text-sm text-[#666666] dark:text-gray-400 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════
   FEATURE CARDS (01, 02, 03) — Dark gray bg, white text
   ══════════════════════════════════════════════════ */
function FeatureCardsSection() {
  const { t } = useLanguage();
  const features = [
    { num: "01", icon: Zap, title: t("feat1.title"), desc: t("feat1.desc") },
    { num: "02", icon: Film, title: t("feat2.title"), desc: t("feat2.desc") },
    { num: "03", icon: CheckCircle, title: t("feat3.title"), desc: t("feat3.desc") },
  ];

  return (
    <section id="features" className="py-14 md:py-20 px-4 md:px-6 bg-[#333333] dark:bg-[#2D2D2D]">
      <div className="mx-auto max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div key={i} className="bg-[#333333] dark:bg-[#333] rounded-lg p-8 border border-white/10 hover:border-white/20 transition-all duration-200">
                <span className="text-white/20 text-4xl md:text-5xl font-extrabold font-[family-name:var(--font-montserrat)]">{f.num}</span>
                <div className="mt-4 mb-3">
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-white text-lg font-bold mb-2">{f.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════
   WHY CHOOSE GETMOVA — Light gray bg, black icons, clean minimal
   ══════════════════════════════════════════════════ */
function WhyChooseSection() {
  const { t } = useLanguage();
  const benefits = [
    { icon: Zap, title: t("why.1.title"), desc: t("why.1.desc") },
    { icon: Smartphone, title: t("why.2.title"), desc: t("why.2.desc") },
    { icon: Share2, title: t("why.3.title"), desc: t("why.3.desc") },
    { icon: Shield, title: t("why.4.title"), desc: t("why.4.desc") },
  ];

  return (
    <section className="py-14 md:py-20 px-4 md:px-6 bg-[#F5F5F5] dark:bg-[#1A1A1A]">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#333333] dark:text-white text-center mb-10 md:mb-14 font-[family-name:var(--font-montserrat)]">{t("why.title")}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {benefits.map((b, i) => {
            const Icon = b.icon;
            return (
              <div key={i} className="text-center p-4">
                <div className="flex items-center justify-center mb-4">
                  <Icon className="h-8 w-8 text-[#333333] dark:text-white" />
                </div>
                <h3 className="text-sm md:text-base font-bold text-[#333333] dark:text-white mb-2">{b.title}</h3>
                <p className="text-xs md:text-sm text-[#999999] dark:text-gray-500 leading-relaxed">{b.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════
   FAQ — Dark gray bg, white text, red numbers, red pill badge
   ══════════════════════════════════════════════════ */
function FAQSection() {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const faqItems = [
    { num: "01", q: t("faq.1.q"), a: t("faq.1.a") },
    { num: "02", q: t("faq.2.q"), a: t("faq.2.a") },
    { num: "03", q: t("faq.3.q"), a: t("faq.3.a") },
    { num: "04", q: t("faq.4.q"), a: t("faq.4.a") },
    { num: "05", q: t("faq.5.q"), a: t("faq.5.a") },
    { num: "06", q: t("faq.6.q"), a: t("faq.6.a") },
  ];

  return (
    <section id="faq" className="py-16 md:py-24 px-4 md:px-6 bg-[#333333] dark:bg-[#2D2D2D]">
      <div className="mx-auto max-w-3xl">
        {/* Title area */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white font-[family-name:var(--font-montserrat)] leading-tight">
            {t("faq.title")}{" "}
            <span className="inline-block bg-[#E52222] text-white text-lg sm:text-xl md:text-2xl px-4 py-1.5 rounded-lg ml-2 align-middle">
              {t("faq.titleRed")}
            </span>
          </h2>
          <p className="mt-4 text-sm md:text-base text-white/50 max-w-md mx-auto leading-relaxed">
            {t("faq.subtitle")}
          </p>
        </div>

        {/* FAQ accordion */}
        <div className="space-y-3">
          {faqItems.map((f, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className={`rounded-xl overflow-hidden transition-all duration-300 ${
                  isOpen
                    ? "bg-white/10 border border-white/20"
                    : "bg-white/5 border border-white/5 hover:bg-white/8 hover:border-white/10"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="flex items-center justify-between w-full py-4 px-5 cursor-pointer text-left group"
                >
                  <span className="flex items-center gap-4 pr-3">
                    <span className="w-9 h-9 rounded-full bg-[#E52222] flex items-center justify-center shrink-0">
                      <span className="text-white font-bold text-xs">{f.num}</span>
                    </span>
                    <span className="text-sm md:text-base font-medium text-white group-hover:text-[#E52222] transition-colors">
                      {f.q}
                    </span>
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 text-white/50 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-5 pb-5 pl-[3.75rem] text-sm md:text-base text-white/60 leading-relaxed">
                    {f.a}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA area */}
        <div className="mt-12 md:mt-16 text-center">
          <div className="inline-block bg-white/5 border border-white/10 rounded-2xl px-8 py-8 md:px-12 md:py-10">
            <div className="flex items-center justify-center mb-3">
              <div className="w-12 h-12 rounded-full bg-[#E52222]/20 flex items-center justify-center">
                <AlertCircle className="h-5 w-5 text-[#E52222]" />
              </div>
            </div>
            <h3 className="text-white text-lg md:text-xl font-bold mb-2">
              {t("faq.cta.title")}
            </h3>
            <p className="text-white/50 text-sm mb-5 max-w-sm mx-auto">
              {t("faq.cta.desc")}
            </p>
            <a href="/contact">
              <Button className="bg-[#E52222] text-white font-semibold rounded-full hover:bg-[#C91C1C] px-8 h-11 text-sm">
                {t("faq.cta.btn")} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════
   FOOTER — Dark (#222) bg, minimal layout
   ══════════════════════════════════════════════════ */
function Footer() {
  const { t, lang } = useLanguage();
  return (
    <footer className="bg-[#222222] dark:bg-[#1A1A1A]" role="contentinfo">
      <div className="mx-auto max-w-6xl px-4 md:px-6 py-10 md:py-14">
        <div className="flex flex-col items-center text-center gap-4">
          {/* Logo */}
          <div className="flex items-center gap-1.5">
            <svg width="28" height="28" viewBox="0 0 32 32" fill="none" className="shrink-0">
              <rect width="32" height="32" rx="8" fill="#E52222" />
              <path d="M13 9L23 16L13 23V9Z" fill="white" />
            </svg>
            <span className="font-[family-name:var(--font-montserrat)] font-bold text-white text-lg" style={{ letterSpacing: "-0.03em" }}>
              Get<span className="text-[#E52222]">Mova</span>
            </span>
          </div>
          {/* Links */}
          <div className="flex items-center gap-6">
            <a href="/privacy" className="text-white text-xs hover:text-[#E52222] transition-colors">{lang === "id" ? "Kebijakan Privasi" : "Privacy Policy"}</a>
            <a href="/terms" className="text-white text-xs hover:text-[#E52222] transition-colors">{lang === "id" ? "Syarat & Ketentuan" : "Terms of Service"}</a>
            <a href="/contact" className="text-white text-xs hover:text-[#E52222] transition-colors">{lang === "id" ? "Hubungi Kami" : "Contact Us"}</a>
          </div>
          {/* Copyright */}
          <p className="text-[#999999] text-xs">&copy; 2024-2026 GetMova. All rights reserved.</p>
        </div>
      </div>
    </footer>
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
        <main className="flex-1">
          <HeroSection />
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
              { "@type": "Question", name: "Apakah GetMova benar-benar gratis?", acceptedAnswer: { "@type": "Answer", text: "Ya, GetMova 100% gratis tanpa biaya tersembunyi. Kamu bisa download video sepuasnya tanpa perlu mendaftar atau membayar apapun. Semua fitur bisa kamu gunakan secara penuh tanpa batasan." } },
              { "@type": "Question", name: "Apakah ada batasan jumlah download?", acceptedAnswer: { "@type": "Answer", text: "Tidak ada batasan! Kamu bisa mendownload video sebanyak yang kamu mau tanpa batas harian atau bulanan. Download sepuasnya kapan saja dan di mana saja." } },
              { "@type": "Question", name: "Di mana video yang didownload disimpan?", acceptedAnswer: { "@type": "Answer", text: "Video akan otomatis tersimpan di folder download perangkatmu, baik di HP maupun komputer." } },
              { "@type": "Question", name: "Platform apa saja yang didukung?", acceptedAnswer: { "@type": "Answer", text: "GetMova mendukung berbagai platform populer seperti TikTok, Instagram, Facebook, Twitter/X, Pinterest, dan Reddit." } },
              { "@type": "Question", name: "Apakah video yang didownload bebas watermark?", acceptedAnswer: { "@type": "Answer", text: "Ya! Semua video yang didownload melalui GetMova bebas watermark. Kamu akan mendapatkan video asli tanpa logo atau tanda air yang mengganggu." } },
              { "@type": "Question", name: "Apakah GetMova aman digunakan?", acceptedAnswer: { "@type": "Answer", text: "Sangat aman! Kami tidak menyimpan data pribadi atau riwayat download kamu. Semua proses dilakukan secara aman dengan enkripsi." } },
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
      </div>
    </LanguageProvider>
  );
}

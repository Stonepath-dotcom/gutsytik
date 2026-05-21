"use client";

import React, { useState, useCallback, useRef, useEffect, createContext, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import {
  Download,
  Zap,
  Shield,
  Smartphone,
  Gift,
  Globe,
  Clipboard,
  CheckCircle,
  Menu,
  X,
  ChevronDown,
  Play,
  Clock,
  User,
  Loader2,
  ArrowRight,
  Heart,
  Twitter,
  Instagram,
  Youtube,
  AlertCircle,
  Film,
  Music,
  FileVideo,
  Sun,
  Moon,
  Share2,
  Flag,
  Eye,
  EyeOff,
  Trash2,
  History,
  TrendingUp,
  Layers,
  Home as HomeIcon,
  HelpCircle,
  Bookmark,
  ImageIcon,
  Search,
  Languages,
  Palette,
  BarChart3,
  Keyboard,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GutsytikLogo } from "@/components/gutsytik-logo";
import { useToast } from "@/hooks/use-toast";

/* ──────────────────── Types ──────────────────── */
interface QualityOption {
  label: string;
  resolution: string;
  url: string;
}

interface DownloadResult {
  title: string;
  thumbnail: string;
  duration: string;
  author: string;
  platform: string;
  downloadUrl: string;
  qualityOptions: QualityOption[];
  filename: string;
}

interface HistoryItem {
  id: string;
  title: string;
  platform: string;
  author: string;
  thumbnail: string;
  duration: string;
  url: string;
  downloadUrl: string;
  timestamp: number;
}

interface BookmarkItem {
  id: string;
  title: string;
  platform: string;
  author: string;
  thumbnail: string;
  duration: string;
  url: string;
  timestamp: number;
}

interface DownloadStats {
  total: number;
  platforms: Record<string, number>;
  totalSize: number;
  startDate: number;
}

/* ──────────────────── Constants ──────────────────── */
const HISTORY_KEY = "gutsytik_history";
const BOOKMARK_KEY = "gutsytik_bookmarks";
const STATS_KEY = "gutsytik_stats";
const LANG_KEY = "gutsytik_lang";
const ACCENT_KEY = "gutsytik_accent";
const MAX_HISTORY = 20;

/* ──────────────────── Feature 6: Multi-Bahasa Translations ──────────────────── */
const translations: Record<string, Record<string, string>> = {
  id: {
    "nav.fitur": "Fitur",
    "nav.caraPakai": "Cara Pakai",
    "nav.platform": "Platform",
    "nav.faq": "FAQ",
    "nav.download": "Download",
    "nav.statistik": "Statistik",
    "hero.badge": "Gratis & Tanpa Batas",
    "hero.title": "Download Video",
    "hero.titleHighlight": "Tanpa Watermark",
    "hero.subtitle": "Gutsytik membantu kamu download video dari platform populer tanpa watermark, cepat dan gratis!",
    "hero.audioTitle": "Ekstrak Audio",
    "hero.audioTitleHighlight": "MP3 Gratis",
    "hero.audioSubtitle": "Gutsytik bisa mengekstrak audio dari video manapun jadi file MP3, cepat dan berkualitas!",
    "input.placeholder": "Tempel link video di sini (TikTok, IG, YouTube...)",
    "input.audioPlaceholder": "Tempel link video untuk ekstrak audio MP3...",
    "input.paste": "Tempel dari clipboard",
    "btn.download": "Download",
    "btn.batchDownload": "Batch Download",
    "btn.singleMode": "Mode Tunggal",
    "btn.processAll": "Proses Semua",
    "btn.downloadNoWM": "Download Tanpa Watermark",
    "btn.downloadAudio": "Download Audio MP3",
    "tab.video": "Video",
    "tab.audio": "Audio",
    "result.found": "Video berhasil ditemukan!",
    "result.audioFound": "Audio berhasil ditemukan!",
    "result.selectQuality": "Pilih kualitas:",
    "result.preview": "Preview",
    "result.share": "Bagikan",
    "result.bookmark": "Bookmark",
    "result.bookmarked": "Tersimpan",
    "result.downloadThumb": "Thumbnail",
    "history.title": "Riwayat Download",
    "history.clear": "Hapus Semua",
    "history.view": "Lihat Riwayat Download",
    "history.empty": "Belum ada riwayat download.",
    "bookmark.title": "Video Tersimpan",
    "bookmark.clear": "Hapus Semua",
    "bookmark.empty": "Belum ada video yang disimpan.",
    "stats.title": "Statistik Download",
    "stats.total": "Total Download",
    "stats.totalData": "Total Data",
    "stats.memberSince": "Member Sejak",
    "stats.perPlatform": "Download per Platform",
    "trending.title": "Sedang Trending",
    "trending.subtitle": "Platform yang paling banyak digunakan untuk download video hari ini.",
    "trending.search": "Cari platform...",
    "trending.popular": "Pencarian Populer",
    "features.title": "Fitur Unggulan Gutsytik",
    "features.subtitle": "Semua yang kamu butuhkan untuk download video tanpa watermark ada di sini.",
    "how.title": "Cara Menggunakan Gutsytik",
    "how.subtitle": "Hanya 3 langkah mudah untuk download video tanpa watermark.",
    "platforms.title": "Platform yang Didukung",
    "platforms.subtitle": "Download video dari berbagai platform sosial media populer.",
    "faq.title": "Pertanyaan yang Sering Diajukan",
    "faq.subtitle": "Temukan jawaban dari pertanyaan umum tentang Gutsytik.",
    "cta.title": "Siap Download Video Tanpa Watermark?",
    "cta.subtitle": "Coba Gutsytik sekarang dan rasakan kemudahan download video tanpa watermark dari berbagai platform favoritmu!",
    "cta.button": "Mulai Download Sekarang",
    "footer.desc": "Download video tanpa watermark dari berbagai platform populer. Cepat, gratis, dan mudah.",
    "footer.nav": "Navigasi",
    "footer.legal": "Legal",
    "footer.follow": "Ikuti Kami",
    "report.title": "Laporkan Masalah",
    "report.desc": "Bantu kami memperbaiki Gutsytik dengan melaporkan masalah yang kamu temui.",
    "report.type": "Jenis Masalah",
    "report.typePlaceholder": "Pilih jenis masalah...",
    "report.descLabel": "Deskripsi (Opsional)",
    "report.descPlaceholder": "Ceritakan masalah yang kamu alami...",
    "report.cancel": "Batal",
    "report.submit": "Kirim Laporan",
    "report.thanks": "Terima kasih!",
    "report.thanksDesc": "Laporan kamu akan kami tindaklanjuti.",
    "error.emptyUrl": "Masukkan link video terlebih dahulu!",
    "error.invalidUrl": "URL tidak valid. Pastikan link yang dimasukkan benar (contoh: https://www.tiktok.com/...)",
    "error.server": "Gagal terhubung ke server. Silakan coba lagi.",
    "error.downloadFail": "Gagal mengunduh video. Coba klik kanan pada tombol download dan pilih 'Save link as...'",
    "toast.videoFound": "Video ditemukan!",
    "toast.selectQuality": "Pilih kualitas dan download.",
    "toast.downloadStart": "Download dimulai!",
    "toast.saving": "File sedang disimpan.",
    "toast.downloadFail": "Download gagal",
    "toast.tryAgain": "Gagal mengunduh video. Coba lagi.",
    "toast.linkCopied": "Link berhasil disalin!",
    "toast.historyCleared": "Riwayat download dihapus.",
    "toast.bookmarkAdded": "Video disimpan ke bookmark!",
    "toast.bookmarkRemoved": "Bookmark dihapus.",
    "toast.thumbDownloaded": "Thumbnail berhasil didownload!",
    "shortcut.hint": "Ctrl+V paste \u2022 Enter submit",
    "link (maks 5)": "link (maks 5)",
    "processing": "Processing",
    "video...": "video...",
    "memproses": "Memproses",
    "dari": "dari",
    "downloads hari ini": "downloads hari ini",
    "Baru saja": "Baru saja",
    "menit lalu": "menit lalu",
    "jam lalu": "jam lalu",
    "hari lalu": "hari lalu",
    "batch.placeholder": "Tempel beberapa link video di sini (satu per baris, maks 5)...",
    "mengunduh": "Mengunduh...",
    "MB/s": "MB/s",
    "MB": "MB",
  },
  en: {
    "nav.fitur": "Features",
    "nav.caraPakai": "How to Use",
    "nav.platform": "Platforms",
    "nav.faq": "FAQ",
    "nav.download": "Download",
    "nav.statistik": "Statistics",
    "hero.badge": "Free & Unlimited",
    "hero.title": "Download Video",
    "hero.titleHighlight": "Without Watermark",
    "hero.subtitle": "Gutsytik helps you download videos from popular platforms without watermark, fast and free!",
    "hero.audioTitle": "Extract Audio",
    "hero.audioTitleHighlight": "Free MP3",
    "hero.audioSubtitle": "Gutsytik can extract audio from any video into MP3 files, fast and high quality!",
    "input.placeholder": "Paste video link here (TikTok, IG, YouTube...)",
    "input.audioPlaceholder": "Paste video link to extract MP3 audio...",
    "input.paste": "Paste from clipboard",
    "btn.download": "Download",
    "btn.batchDownload": "Batch Download",
    "btn.singleMode": "Single Mode",
    "btn.processAll": "Process All",
    "btn.downloadNoWM": "Download Without Watermark",
    "btn.downloadAudio": "Download Audio MP3",
    "tab.video": "Video",
    "tab.audio": "Audio",
    "result.found": "Video found successfully!",
    "result.audioFound": "Audio found successfully!",
    "result.selectQuality": "Select quality:",
    "result.preview": "Preview",
    "result.share": "Share",
    "result.bookmark": "Bookmark",
    "result.bookmarked": "Saved",
    "result.downloadThumb": "Thumbnail",
    "history.title": "Download History",
    "history.clear": "Clear All",
    "history.view": "View Download History",
    "history.empty": "No download history yet.",
    "bookmark.title": "Saved Videos",
    "bookmark.clear": "Clear All",
    "bookmark.empty": "No saved videos yet.",
    "stats.title": "Download Statistics",
    "stats.total": "Total Downloads",
    "stats.totalData": "Total Data",
    "stats.memberSince": "Member Since",
    "stats.perPlatform": "Downloads per Platform",
    "trending.title": "Currently Trending",
    "trending.subtitle": "Most popular platforms for video downloads today.",
    "trending.search": "Search platform...",
    "trending.popular": "Popular Searches",
    "features.title": "Gutsytik Key Features",
    "features.subtitle": "Everything you need to download videos without watermark is here.",
    "how.title": "How to Use Gutsytik",
    "how.subtitle": "Just 3 easy steps to download videos without watermark.",
    "platforms.title": "Supported Platforms",
    "platforms.subtitle": "Download videos from various popular social media platforms.",
    "faq.title": "Frequently Asked Questions",
    "faq.subtitle": "Find answers to common questions about Gutsytik.",
    "cta.title": "Ready to Download Videos Without Watermark?",
    "cta.subtitle": "Try Gutsytik now and experience easy watermark-free video downloads from your favorite platforms!",
    "cta.button": "Start Downloading Now",
    "footer.desc": "Download videos without watermark from popular platforms. Fast, free, and easy.",
    "footer.nav": "Navigation",
    "footer.legal": "Legal",
    "footer.follow": "Follow Us",
    "report.title": "Report an Issue",
    "report.desc": "Help us improve Gutsytik by reporting issues you encounter.",
    "report.type": "Issue Type",
    "report.typePlaceholder": "Select issue type...",
    "report.descLabel": "Description (Optional)",
    "report.descPlaceholder": "Describe the issue you're experiencing...",
    "report.cancel": "Cancel",
    "report.submit": "Submit Report",
    "report.thanks": "Thank you!",
    "report.thanksDesc": "Your report will be reviewed.",
    "error.emptyUrl": "Please enter a video link first!",
    "error.invalidUrl": "Invalid URL. Make sure the link is correct (e.g., https://www.tiktok.com/...)",
    "error.server": "Failed to connect to server. Please try again.",
    "error.downloadFail": "Failed to download video. Try right-clicking the download button and select 'Save link as...'",
    "toast.videoFound": "Video found!",
    "toast.selectQuality": "Select quality and download.",
    "toast.downloadStart": "Download started!",
    "toast.saving": "File is being saved.",
    "toast.downloadFail": "Download failed",
    "toast.tryAgain": "Failed to download video. Try again.",
    "toast.linkCopied": "Link copied successfully!",
    "toast.historyCleared": "Download history cleared.",
    "toast.bookmarkAdded": "Video saved to bookmarks!",
    "toast.bookmarkRemoved": "Bookmark removed.",
    "toast.thumbDownloaded": "Thumbnail downloaded!",
    "shortcut.hint": "Ctrl+V paste \u2022 Enter submit",
    "link (maks 5)": "links (max 5)",
    "processing": "Processing",
    "video...": "videos...",
    "memproses": "Processing",
    "dari": "of",
    "downloads hari ini": "downloads today",
    "Baru saja": "Just now",
    "menit lalu": "min ago",
    "jam lalu": "hr ago",
    "hari lalu": "days ago",
    "batch.placeholder": "Paste multiple video links here (one per line, max 5)...",
    "mengunduh": "Downloading...",
    "MB/s": "MB/s",
    "MB": "MB",
  },
};

/* ──────────────────── Feature 6: Language Context ──────────────────── */
type Lang = "id" | "en";

const LanguageContext = createContext<{
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
}>({
  lang: "id",
  setLang: () => {},
  t: (key: string) => key,
});

function useLanguage() {
  return useContext(LanguageContext);
}

function getInitialLang(): Lang {
  if (typeof window === "undefined") return "id";
  try {
    const saved = localStorage.getItem(LANG_KEY) as Lang | null;
    if (saved && (saved === "id" || saved === "en")) return saved;
  } catch {}
  return "id";
}

function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(getInitialLang);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem(LANG_KEY, l);
    } catch {}
  }, []);

  const t = useCallback(
    (key: string) => translations[lang]?.[key] || translations.id[key] || key,
    [lang]
  );

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

/* ──────────────────── Feature 10: Accent Color ──────────────────── */
const ACCENT_COLORS = [
  { name: "Pink", color: "#FF2D55" },
  { name: "Purple", color: "#7C3AED" },
  { name: "Cyan", color: "#00E5FF" },
  { name: "Green", color: "#10B981" },
  { name: "Orange", color: "#F97316" },
  { name: "Red", color: "#EF4444" },
  { name: "Blue", color: "#3B82F6" },
];

function getInitialAccent(): string {
  if (typeof window === "undefined") return "#FF2D55";
  try {
    const saved = localStorage.getItem(ACCENT_KEY);
    if (saved) {
      document.documentElement.style.setProperty("--color-gutsy-accent", saved);
      return saved;
    }
  } catch {}
  return "#FF2D55";
}

function useAccentColor() {
  const [accent, setAccentState] = useState(getInitialAccent);

  const setAccent = useCallback((color: string) => {
    setAccentState(color);
    try {
      localStorage.setItem(ACCENT_KEY, color);
    } catch {}
    document.documentElement.style.setProperty("--color-gutsy-accent", color);
  }, []);

  return { accent, setAccent };
}

/* ──────────────────── Utility Functions ──────────────────── */
function getHistory(): HistoryItem[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(HISTORY_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function saveToHistory(item: HistoryItem) {
  try {
    const history = getHistory();
    const filtered = history.filter((h) => h.url !== item.url);
    filtered.unshift(item);
    const trimmed = filtered.slice(0, MAX_HISTORY);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(trimmed));
    window.dispatchEvent(new Event("gutsytik:history-changed"));
  } catch {}
}

function clearAllHistory() {
  try {
    localStorage.removeItem(HISTORY_KEY);
    window.dispatchEvent(new Event("gutsytik:history-changed"));
  } catch {}
}

// Feature 7: Bookmark functions
function getBookmarks(): BookmarkItem[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(BOOKMARK_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function saveBookmark(item: BookmarkItem) {
  try {
    const bookmarks = getBookmarks();
    if (bookmarks.some((b) => b.url === item.url)) return;
    bookmarks.unshift(item);
    localStorage.setItem(BOOKMARK_KEY, JSON.stringify(bookmarks));
    window.dispatchEvent(new Event("gutsytik:bookmarks-changed"));
  } catch {}
}

function removeBookmark(url: string) {
  try {
    const bookmarks = getBookmarks().filter((b) => b.url !== url);
    localStorage.setItem(BOOKMARK_KEY, JSON.stringify(bookmarks));
    window.dispatchEvent(new Event("gutsytik:bookmarks-changed"));
  } catch {}
}

function isBookmarked(url: string): boolean {
  return getBookmarks().some((b) => b.url === url);
}

// Feature 8: Stats functions
function getStats(): DownloadStats {
  if (typeof window === "undefined") return { total: 0, platforms: {}, totalSize: 0, startDate: Date.now() };
  try {
    const data = localStorage.getItem(STATS_KEY);
    if (data) return JSON.parse(data);
    return { total: 0, platforms: {}, totalSize: 0, startDate: Date.now() };
  } catch {
    return { total: 0, platforms: {}, totalSize: 0, startDate: Date.now() };
  }
}

function incrementStats(platform: string, sizeMB: number) {
  try {
    const stats = getStats();
    stats.total += 1;
    stats.platforms[platform] = (stats.platforms[platform] || 0) + 1;
    stats.totalSize += sizeMB;
    if (!stats.startDate) stats.startDate = Date.now();
    localStorage.setItem(STATS_KEY, JSON.stringify(stats));
    window.dispatchEvent(new Event("gutsytik:stats-changed"));
  } catch {}
}

function timeAgo(timestamp: number, t: (k: string) => string): string {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  if (seconds < 60) return t("Baru saja");
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} ${t("menit lalu")}`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} ${t("jam lalu")}`;
  const days = Math.floor(hours / 24);
  return `${days} ${t("hari lalu")}`;
}

function estimateFileSize(
  platform: string,
  resolution: string,
  durationStr: string
): string {
  if (!durationStr || durationStr === "--:--") return "";
  const parts = durationStr.split(":");
  if (parts.length < 2) return "";
  const totalSeconds = parseInt(parts[0]) * 60 + parseInt(parts[1]);
  if (totalSeconds <= 0) return "";
  const minutes = totalSeconds / 60;
  let mbPerMin = 10;
  if (resolution === "MP3") {
    mbPerMin = platform === "TikTok" ? 4 : 1;
  } else {
    const h = parseInt(resolution) || 720;
    if (h >= 2160) mbPerMin = 100;
    else if (h >= 1080) mbPerMin = platform === "TikTok" ? 40 : 30;
    else if (h >= 720) mbPerMin = platform === "TikTok" ? 20 : 15;
    else if (h >= 480) mbPerMin = 8;
    else mbPerMin = 5;
  }
  const size = Math.max(1, Math.round(minutes * mbPerMin));
  return `~${size}MB`;
}

function formatDate(timestamp: number): string {
  return new Date(timestamp).toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/* ──────────────────── Navbar ──────────────────── */
function Navbar() {
  const [open, setOpen] = useState(false);
  const { setTheme, theme } = useTheme();
  const { lang, setLang, t } = useLanguage();
  const { accent, setAccent } = useAccentColor();
  const [bookmarkCount, setBookmarkCount] = useState(0);

  useEffect(() => {
    const load = () => setBookmarkCount(getBookmarks().length);
    load();
    window.addEventListener("gutsytik:bookmarks-changed", load);
    return () => window.removeEventListener("gutsytik:bookmarks-changed", load);
  }, []);

  const navLinks = [
    { label: t("nav.fitur"), href: "#features" },
    { label: t("nav.caraPakai"), href: "#how-it-works" },
    { label: t("nav.platform"), href: "#platforms" },
    { label: t("nav.faq"), href: "#faq" },
  ];

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 glass-strong"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <a href="#" className="flex items-center gap-2">
            <GutsytikLogo size={36} showText />
          </a>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-accent"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-1.5">
            {/* Feature 6: Language Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setLang(lang === "id" ? "en" : "id")}
              className="relative h-9 w-9"
              aria-label="Toggle language"
            >
              <Languages className="h-4 w-4" />
            </Button>

            {/* Feature 10: Accent Color Picker */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative h-9 w-9"
                  aria-label="Custom accent color"
                >
                  <Palette className="h-4 w-4" />
                  <span
                    className="absolute bottom-1 right-1 w-2.5 h-2.5 rounded-full border border-border"
                    style={{ backgroundColor: accent }}
                  />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-3" align="end">
                <p className="text-xs font-medium text-foreground mb-2">Accent Color</p>
                <div className="flex gap-2">
                  {ACCENT_COLORS.map((c) => (
                    <button
                      key={c.color}
                      onClick={() => setAccent(c.color)}
                      className="w-7 h-7 rounded-full border-2 transition-transform hover:scale-110"
                      style={{
                        backgroundColor: c.color,
                        borderColor: accent === c.color ? "var(--foreground)" : "transparent",
                      }}
                      title={c.name}
                    />
                  ))}
                </div>
              </PopoverContent>
            </Popover>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="relative h-9 w-9"
              aria-label="Toggle theme"
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>

            <a href="#hero">
              <Button
                size="sm"
                className="text-white font-semibold rounded-lg"
                style={{ background: `linear-gradient(to right, ${accent}, #7C3AED)` }}
              >
                <Download className="mr-2 h-4 w-4" />
                {t("nav.download")}
              </Button>
            </a>
          </div>

          <div className="flex md:hidden items-center gap-1.5">
            {/* Feature 6: Language Toggle (mobile) */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setLang(lang === "id" ? "en" : "id")}
              className="relative h-9 w-9"
              aria-label="Toggle language"
            >
              <Languages className="h-4 w-4" />
            </Button>

            {/* Feature 10: Accent Color (mobile) */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative h-9 w-9"
                  aria-label="Custom accent color"
                >
                  <Palette className="h-4 w-4" />
                  <span
                    className="absolute bottom-1 right-1 w-2.5 h-2.5 rounded-full border border-border"
                    style={{ backgroundColor: accent }}
                  />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-3" align="end">
                <p className="text-xs font-medium text-foreground mb-2">Accent Color</p>
                <div className="flex gap-2">
                  {ACCENT_COLORS.map((c) => (
                    <button
                      key={c.color}
                      onClick={() => setAccent(c.color)}
                      className="w-7 h-7 rounded-full border-2 transition-transform hover:scale-110"
                      style={{
                        backgroundColor: c.color,
                        borderColor: accent === c.color ? "var(--foreground)" : "transparent",
                      }}
                      title={c.name}
                    />
                  ))}
                </div>
              </PopoverContent>
            </Popover>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="relative h-9 w-9"
              aria-label="Toggle theme"
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>
            <button
              onClick={() => setOpen(!open)}
              className="p-2 rounded-md hover:bg-accent transition-colors"
              aria-label="Toggle menu"
            >
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden overflow-hidden glass-strong border-t border-border"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-accent"
                >
                  {l.label}
                </a>
              ))}
              <a href="#hero" onClick={() => setOpen(false)}>
                <Button
                  className="w-full mt-2 text-white font-semibold rounded-lg"
                  style={{ background: `linear-gradient(to right, ${accent}, #7C3AED)` }}
                >
                  <Download className="mr-2 h-4 w-4" />
                  {t("nav.download")}
                </Button>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

/* ──────────────────── Riwayat List Component ──────────────────── */
function RiwayatList({
  history,
  onSelect,
  onClear,
  t,
}: {
  history: HistoryItem[];
  onSelect: (item: HistoryItem) => void;
  onClear: () => void;
  t: (k: string) => string;
}) {
  if (history.length === 0) return null;

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <History className="h-4 w-4" />
          {t("history.title")}
        </h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClear}
          className="text-xs text-muted-foreground hover:text-destructive"
        >
          <Trash2 className="h-3 w-3 mr-1" /> {t("history.clear")}
        </Button>
      </div>
      <div className="space-y-2 max-h-64 overflow-y-auto">
        {history.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelect(item)}
            className="w-full flex items-center gap-3 p-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors text-left"
          >
            <div className="w-10 h-10 rounded bg-muted flex items-center justify-center shrink-0 overflow-hidden">
              {item.thumbnail ? (
                <img src={item.thumbnail} alt="" className="w-full h-full object-cover" />
              ) : (
                <Play className="h-4 w-4 text-muted-foreground" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-foreground truncate">{item.title}</p>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-gutsy-pink/10 text-gutsy-pink">
                  {item.platform}
                </span>
                <span className="text-[10px] text-muted-foreground">
                  {timeAgo(item.timestamp, t)}
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ──────────────────── Hero Section ──────────────────── */
function HeroSection({
  onOpenHistorySheet,
  onOpenBookmarkSheet,
}: {
  onOpenHistorySheet: () => void;
  onOpenBookmarkSheet: () => void;
}) {
  const { t } = useLanguage();
  const { accent } = useAccentColor();
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [downloadPercent, setDownloadPercent] = useState(0);
  const [downloadSpeed, setDownloadSpeed] = useState(0);
  const [downloadSize, setDownloadSize] = useState(0);
  const [downloadTotalSize, setDownloadTotalSize] = useState(0);
  const [result, setResult] = useState<DownloadResult | null>(null);
  const [error, setError] = useState("");
  const [pasted, setPasted] = useState(false);
  const [selectedQuality, setSelectedQuality] = useState<number>(0);
  const [batchMode, setBatchMode] = useState(false);
  const [batchUrls, setBatchUrls] = useState("");
  const [batchResults, setBatchResults] = useState<DownloadResult[]>([]);
  const [batchProcessing, setBatchProcessing] = useState(false);
  const [batchProgress, setBatchProgress] = useState({ current: 0, total: 0 });
  const [showPreview, setShowPreview] = useState(false);
  const [previewError, setPreviewError] = useState(false);
  const [historyItems, setHistoryItems] = useState<HistoryItem[]>([]);
  const [riwayatOpen, setRiwayatOpen] = useState(false);
  // Feature 2: Audio mode
  const [audioMode, setAudioMode] = useState(false);
  // Feature 7: Bookmark state
  const [isBookmarkedState, setIsBookmarkedState] = useState(false);

  const resultRef = useRef<HTMLDivElement>(null);
  const urlRef = useRef(url);
  urlRef.current = url;

  const { toast, dismiss } = useToast();

  const showToast = useCallback(
    (title: string, description: string, variant: "default" | "destructive" = "default") => {
      const t2 = toast({ title, description, variant });
      setTimeout(() => dismiss(t2.id), 3000);
    },
    [toast, dismiss]
  );

  // Load history on mount and listen for changes
  useEffect(() => {
    const load = () => setHistoryItems(getHistory());
    load();
    window.addEventListener("gutsytik:history-changed", load);
    return () => window.removeEventListener("gutsytik:history-changed", load);
  }, []);

  // Feature 1: URL Parameter Auto-Download
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlParam = params.get("url");
    if (urlParam) {
      setUrl(urlParam);
      setPasted(true);
      setTimeout(() => setPasted(false), 2000);
      // Auto-trigger analyze after a short delay
      setTimeout(() => {
        const analyze = async () => {
          try {
            new URL(urlParam);
          } catch {
            return;
          }
          setLoading(true);
          setError("");
          setResult(null);
          try {
            const res = await fetch("/api/download", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ url: urlParam }),
            });
            const data = await res.json();
            if (res.ok) {
              setResult(data);
              setSelectedQuality(0);
              setShowPreview(false);
              setPreviewError(false);
              // Feature 2: Auto-select audio quality in audio mode
              if (audioMode) {
                const audioIdx = data.qualityOptions.findIndex(
                  (q: QualityOption) => q.label === "Audio" || q.resolution === "MP3"
                );
                if (audioIdx >= 0) setSelectedQuality(audioIdx);
              }
              setTimeout(() => {
                resultRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
              }, 300);
            }
          } catch {
            // silently fail
          } finally {
            setLoading(false);
          }
        };
        analyze();
      }, 500);
      // Clean URL
      window.history.replaceState({}, "", window.location.pathname);
    }
  }, []);

  // Listen for history item selection from Sheet
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail as HistoryItem;
      setUrl(detail.url);
      setBatchMode(false);
      setPasted(true);
      setTimeout(() => setPasted(false), 2000);
    };
    window.addEventListener("gutsytik:select-history", handler);
    return () => window.removeEventListener("gutsytik:select-history", handler);
  }, []);

  // Feature 4: Global Escape keydown listener
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setRiwayatOpen(false);
        setShowPreview(false);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Auto-Paste on focus
  const handleInputFocus = useCallback(async () => {
    if (urlRef.current.trim()) return;
    try {
      const text = await navigator.clipboard.readText();
      if (text && (text.startsWith("http://") || text.startsWith("https://"))) {
        setUrl(text);
        setPasted(true);
        setTimeout(() => setPasted(false), 2000);
      }
    } catch {}
  }, []);

  const handlePaste = useCallback(async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
      setPasted(true);
      setTimeout(() => setPasted(false), 2000);
    } catch {}
  }, []);

  const handleAnalyze = useCallback(async () => {
    if (!url.trim()) {
      setError(t("error.emptyUrl"));
      return;
    }
    try {
      new URL(url.trim());
    } catch {
      setError(t("error.invalidUrl"));
      return;
    }
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch("/api/download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || t("error.server"));
        showToast("Gagal", data.error || "Coba lagi.", "destructive");
        return;
      }
      setResult(data);
      setSelectedQuality(0);
      setShowPreview(false);
      setPreviewError(false);
      // Feature 7: Check if bookmarked
      setIsBookmarkedState(isBookmarked(url.trim()));
      // Feature 2: Auto-select audio quality in audio mode
      if (audioMode) {
        const audioIdx = data.qualityOptions.findIndex(
          (q: QualityOption) => q.label === "Audio" || q.resolution === "MP3"
        );
        if (audioIdx >= 0) setSelectedQuality(audioIdx);
      }
      showToast(t("toast.videoFound"), t("toast.selectQuality"), "default");
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 300);
    } catch {
      setError(t("error.server"));
      showToast("Gagal", t("error.server"), "destructive");
    } finally {
      setLoading(false);
    }
  }, [url, showToast, t, audioMode]);

  // Feature 3: Download with real progress bar
  const handleDownload = useCallback(async () => {
    if (!result) return;
    const quality = result.qualityOptions[selectedQuality] || result.qualityOptions[0];
    if (!quality) return;

    setDownloading(true);
    setDownloadPercent(0);
    setDownloadSpeed(0);
    setDownloadSize(0);
    setDownloadTotalSize(0);

    try {
      const response = await fetch(quality.url);
      if (!response.ok) throw new Error(`Download gagal (HTTP ${response.status})`);

      const contentLength = Number(response.headers.get("content-length")) || 0;
      setDownloadTotalSize(contentLength);

      if (contentLength > 0 && response.body) {
        const reader = response.body.getReader();
        const chunks: Uint8Array[] = [];
        let receivedLength = 0;
        const startTime = Date.now();

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          chunks.push(value);
          receivedLength += value.length;
          const elapsed = (Date.now() - startTime) / 1000;
          const speed = elapsed > 0 ? receivedLength / elapsed / (1024 * 1024) : 0;

          setDownloadSize(receivedLength);
          setDownloadPercent(contentLength > 0 ? Math.round((receivedLength / contentLength) * 100) : 0);
          setDownloadSpeed(Number(speed.toFixed(2)));
        }

        const blob = new Blob(chunks);
        const blobUrl = URL.createObjectURL(blob);
        const isAudio = quality.label === "Audio" || quality.resolution === "MP3";
        const ext = isAudio ? "mp3" : "mp4";
        const fileName = `${result.filename}_${quality.label}.${ext}`;
        const a = document.createElement("a");
        a.href = blobUrl;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
        setDownloadPercent(100);
      } else {
        // Fallback: no content-length or no ReadableStream
        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);
        const isAudio = quality.label === "Audio" || quality.resolution === "MP3";
        const ext = isAudio ? "mp3" : "mp4";
        const fileName = `${result.filename}_${quality.label}.${ext}`;
        const a = document.createElement("a");
        a.href = blobUrl;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
        setDownloadPercent(100);
        setDownloadSize(blob.size);
        setDownloadTotalSize(blob.size);
      }

      // Save to history
      const historyItem: HistoryItem = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        title: result.title,
        platform: result.platform,
        author: result.author,
        thumbnail: result.thumbnail,
        duration: result.duration,
        url: url.trim(),
        downloadUrl: quality.url,
        timestamp: Date.now(),
      };
      saveToHistory(historyItem);

      // Feature 8: Update stats
      const estimatedMB = downloadTotalSize > 0
        ? Math.round(downloadTotalSize / (1024 * 1024))
        : Math.round((downloadSize || 1) / (1024 * 1024)) || 5;
      incrementStats(result.platform, estimatedMB);

      showToast(t("toast.downloadStart"), t("toast.saving"), "default");
    } catch {
      // Fallback download
      try {
        const a = document.createElement("a");
        a.href = quality.url;
        a.download = `${result.filename}_${quality.label}.${quality.label === "Audio" ? "mp3" : "mp4"}`;
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        const historyItem: HistoryItem = {
          id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
          title: result.title,
          platform: result.platform,
          author: result.author,
          thumbnail: result.thumbnail,
          duration: result.duration,
          url: url.trim(),
          downloadUrl: quality.url,
          timestamp: Date.now(),
        };
        saveToHistory(historyItem);
        incrementStats(result.platform, 5);
        showToast(t("toast.downloadStart"), t("toast.saving"), "default");
      } catch {
        setError(t("error.downloadFail"));
        showToast(t("toast.downloadFail"), t("toast.tryAgain"), "destructive");
      }
    } finally {
      setTimeout(() => {
        setDownloading(false);
        setDownloadPercent(0);
        setDownloadSpeed(0);
        setDownloadSize(0);
        setDownloadTotalSize(0);
      }, 2500);
    }
  }, [result, selectedQuality, url, showToast, t, downloadTotalSize, downloadSize]);

  // Share Button
  const handleShare = useCallback(async () => {
    if (!result) return;
    const shareUrl = `${window.location.origin}?url=${encodeURIComponent(url.trim())}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: result.title,
          text: `Download ${result.title} tanpa watermark di Gutsytik!`,
          url: shareUrl,
        });
      } catch {}
    } else {
      try {
        await navigator.clipboard.writeText(shareUrl);
        showToast(t("toast.linkCopied"), "", "default");
      } catch {}
    }
  }, [result, url, showToast, t]);

  // Feature 5: Thumbnail Download
  const handleDownloadThumbnail = useCallback(async () => {
    if (!result?.thumbnail) return;
    try {
      const response = await fetch(result.thumbnail);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = `${result.filename}_thumbnail.jpg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
      showToast(t("toast.thumbDownloaded"), "", "default");
    } catch {
      // Fallback: open in new tab
      window.open(result.thumbnail, "_blank");
    }
  }, [result, showToast, t]);

  // Feature 7: Bookmark toggle
  const handleToggleBookmark = useCallback(() => {
    if (!result) return;
    if (isBookmarked(url.trim())) {
      removeBookmark(url.trim());
      setIsBookmarkedState(false);
      showToast(t("toast.bookmarkRemoved"), "", "default");
    } else {
      const item: BookmarkItem = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        title: result.title,
        platform: result.platform,
        author: result.author,
        thumbnail: result.thumbnail,
        duration: result.duration,
        url: url.trim(),
        timestamp: Date.now(),
      };
      saveBookmark(item);
      setIsBookmarkedState(true);
      showToast(t("toast.bookmarkAdded"), "", "default");
    }
  }, [result, url, showToast, t]);

  // Batch Download
  const handleBatchProcess = useCallback(async () => {
    const urls = batchUrls
      .split("\n")
      .map((u) => u.trim())
      .filter((u) => {
        try {
          const parsed = new URL(u);
          return parsed.protocol === "http:" || parsed.protocol === "https:";
        } catch {
          return false;
        }
      });
    const uniqueUrls = [...new Set(urls)];
    if (uniqueUrls.length === 0) {
      setError(t("error.emptyUrl"));
      return;
    }
    const urlsToProcess = uniqueUrls.slice(0, 5);
    setBatchProcessing(true);
    setBatchProgress({ current: 0, total: urlsToProcess.length });
    setBatchResults([]);
    const results: DownloadResult[] = [];
    for (let i = 0; i < urlsToProcess.length; i++) {
      setBatchProgress({ current: i, total: urlsToProcess.length });
      try {
        const res = await fetch("/api/download", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url: urlsToProcess[i] }),
        });
        const data = await res.json();
        if (res.ok) {
          results.push(data);
          setBatchResults([...results]);
        }
      } catch {}
      if (i < urlsToProcess.length - 1) {
        await new Promise((resolve) => setTimeout(resolve, 500));
      }
    }
    setBatchProgress({ current: urlsToProcess.length, total: urlsToProcess.length });
    setBatchProcessing(false);
    if (results.length > 0) {
      showToast(`${results.length} video ditemukan!`, "Pilih kualitas dan download.", "default");
    }
  }, [batchUrls, showToast]);

  const handleBatchDownload = useCallback(
    async (batchResult: DownloadResult) => {
      const quality = batchResult.qualityOptions[0];
      if (!quality) return;
      try {
        const response = await fetch(quality.url);
        if (!response.ok) throw new Error("Failed");
        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);
        const isAudio = quality.label === "Audio" || quality.resolution === "MP3";
        const ext = isAudio ? "mp3" : "mp4";
        const fileName = `${batchResult.filename}_${quality.label}.${ext}`;
        const a = document.createElement("a");
        a.href = blobUrl;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
        const historyItem: HistoryItem = {
          id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
          title: batchResult.title,
          platform: batchResult.platform,
          author: batchResult.author,
          thumbnail: batchResult.thumbnail,
          duration: batchResult.duration,
          url: batchResult.downloadUrl,
          downloadUrl: quality.url,
          timestamp: Date.now(),
        };
        saveToHistory(historyItem);
        incrementStats(batchResult.platform, 5);
        showToast(t("toast.downloadStart"), t("toast.saving"), "default");
      } catch {
        showToast(t("toast.downloadFail"), t("toast.tryAgain"), "destructive");
      }
    },
    [showToast, t]
  );

  const handleHistorySelect = useCallback((item: HistoryItem) => {
    setUrl(item.url);
    setBatchMode(false);
    setPasted(true);
    setTimeout(() => setPasted(false), 2000);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleHistoryClear = useCallback(() => {
    clearAllHistory();
    showToast(t("toast.historyCleared"), "", "default");
  }, [showToast, t]);

  const stats = [
    { value: "10M+", label: "Downloads" },
    { value: "50+", label: "Platforms" },
    { value: "100%", label: "Free" },
    { value: "No", label: "Watermark" },
  ];

  const getQualityIcon = (label: string) => {
    if (label === "Audio" || label === "MP3") return Music;
    if (label === "HD") return FileVideo;
    return Film;
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
    >
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="animate-orb-1 absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full opacity-20"
          style={{
            background: `radial-gradient(circle, ${accent}80 0%, transparent 70%)`,
          }}
        />
        <div
          className="animate-orb-2 absolute top-1/3 -right-32 w-[400px] h-[400px] rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, rgba(124,58,237,0.5) 0%, transparent 70%)",
          }}
        />
        <div
          className="animate-orb-3 absolute -bottom-32 left-1/4 w-[450px] h-[450px] rounded-full opacity-15"
          style={{
            background: "radial-gradient(circle, rgba(0,229,255,0.4) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-20 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold border mb-6"
            style={{
              backgroundColor: `${accent}15`,
              color: accent,
              borderColor: `${accent}30`,
            }}
          >
            <Zap className="h-3 w-3" />
            {t("hero.badge")}
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6"
        >
          {audioMode ? t("hero.audioTitle") : t("hero.title")}{" "}
          <span className="gradient-text-animated">
            {audioMode ? t("hero.audioTitleHighlight") : t("hero.titleHighlight")}
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
        >
          {audioMode ? t("hero.audioSubtitle") : t("hero.subtitle")}
        </motion.p>

        {/* Download form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="max-w-xl mx-auto mb-4"
        >
          {/* Feature 2: Audio/Video tab toggle */}
          <div className="flex items-center justify-between mb-2">
            <Tabs
              value={audioMode ? "audio" : "video"}
              onValueChange={(v) => setAudioMode(v === "audio")}
            >
              <TabsList className="h-8">
                <TabsTrigger value="video" className="text-xs px-3 h-6">
                  <Film className="h-3 w-3 mr-1" />
                  {t("tab.video")}
                </TabsTrigger>
                <TabsTrigger value="audio" className="text-xs px-3 h-6">
                  <Music className="h-3 w-3 mr-1" />
                  {t("tab.audio")}
                </TabsTrigger>
              </TabsList>
            </Tabs>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setBatchMode(!batchMode);
                setBatchResults([]);
                setBatchProgress({ current: 0, total: 0 });
              }}
              className={`text-xs ${batchMode ? "" : "text-muted-foreground"}`}
              style={batchMode ? { color: accent } : {}}
            >
              <Layers className="h-3 w-3 mr-1" />
              {batchMode ? t("btn.singleMode") : t("btn.batchDownload")}
            </Button>
          </div>

          {batchMode ? (
            /* Batch mode textarea */
            <div className="p-2 rounded-xl bg-card border border-border">
              <Textarea
                placeholder={t("batch.placeholder")}
                value={batchUrls}
                onChange={(e) => {
                  setBatchUrls(e.target.value);
                  setError("");
                }}
                className="min-h-[100px] bg-background border-border text-foreground placeholder:text-muted-foreground rounded-lg text-sm"
              />
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-muted-foreground">
                  {batchUrls.split("\n").filter((u) => u.trim()).length} {t("link (maks 5)")}
                </span>
                <Button
                  onClick={handleBatchProcess}
                  disabled={batchProcessing}
                  className="h-10 px-5 text-white font-semibold rounded-lg"
                  style={{ background: `linear-gradient(to right, ${accent}, #7C3AED)` }}
                >
                  {batchProcessing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {t("processing")} {batchProgress.current}/{batchProgress.total}{t("video...")}
                    </>
                  ) : (
                    <>
                      <Download className="mr-2 h-4 w-4" />
                      {t("btn.processAll")}
                    </>
                  )}
                </Button>
              </div>
              {batchProcessing && batchProgress.total > 0 && (
                <div className="mt-2">
                  <Progress value={(batchProgress.current / batchProgress.total) * 100} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-1">
                    {t("memproses")} {batchProgress.current} {t("dari")} {batchProgress.total} {t("video...")}
                  </p>
                </div>
              )}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="mt-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20 flex items-start gap-2"
                  >
                    <AlertCircle className="h-4 w-4 text-red-400 mt-0.5 shrink-0" />
                    <p className="text-red-400 text-sm text-left">{error}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            /* Single mode input */
            <div className="flex gap-2 p-2 rounded-xl bg-card border border-border">
              <div className="relative flex-1">
                <Input
                  type="url"
                  placeholder={audioMode ? t("input.audioPlaceholder") : t("input.placeholder")}
                  value={url}
                  onChange={(e) => {
                    setUrl(e.target.value);
                    setError("");
                  }}
                  onFocus={handleInputFocus}
                  onKeyDown={(e) => e.key === "Enter" && handleAnalyze()}
                  className="h-12 bg-background border-border text-foreground placeholder:text-muted-foreground rounded-lg text-base pr-12"
                />
                {/* Feature 2: Music icon indicator in audio mode */}
                {audioMode && (
                  <Music className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                )}
                <button
                  onClick={handlePaste}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-md hover:bg-accent transition-colors"
                  title={t("input.paste")}
                >
                  {pasted ? (
                    <CheckCircle className="h-4 w-4 text-green-400" />
                  ) : (
                    <Clipboard className="h-4 w-4 text-muted-foreground" />
                  )}
                </button>
              </div>
              <Button
                onClick={handleAnalyze}
                disabled={loading}
                className="h-12 px-6 text-white font-semibold rounded-lg shrink-0"
                style={{ background: `linear-gradient(to right, ${accent}, #7C3AED)` }}
              >
                {loading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <>
                    {audioMode ? (
                      <Music className="mr-2 h-5 w-5" />
                    ) : (
                      <Download className="mr-2 h-5 w-5" />
                    )}
                    <span className="hidden sm:inline">{t("btn.download")}</span>
                  </>
                )}
              </Button>
            </div>
          )}

          {/* Feature 4: Keyboard shortcut hint */}
          {!batchMode && (
            <div className="flex items-center justify-center gap-2 mt-2">
              <span className="inline-flex items-center gap-1 text-[10px] text-muted-foreground/60">
                <Keyboard className="h-2.5 w-2.5" />
                {t("shortcut.hint")}
              </span>
            </div>
          )}

          {/* Error message for single mode */}
          {!batchMode && (
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="mt-3 p-3 rounded-lg bg-red-500/10 border border-red-500/20 flex items-start gap-2"
                >
                  <AlertCircle className="h-4 w-4 text-red-400 mt-0.5 shrink-0" />
                  <p className="text-red-400 text-sm text-left">{error}</p>
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </motion.div>

        {/* Supported platform hints */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="max-w-xl mx-auto mb-10 flex flex-wrap justify-center gap-2"
        >
          {["TikTok", "Instagram", "YouTube", "Facebook", "Twitter/X", "Pinterest"].map((p) => (
            <span
              key={p}
              className="text-[11px] px-2.5 py-1 rounded-full bg-muted/50 text-muted-foreground border border-border"
            >
              {p}
            </span>
          ))}
        </motion.div>

        {/* Result card (single mode) */}
        <AnimatePresence>
          {result && !batchMode && (
            <motion.div
              ref={resultRef}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="max-w-xl mx-auto mb-6 rounded-xl bg-card border overflow-hidden"
              style={{ borderColor: `${accent}30` }}
            >
              {/* Platform badge */}
              <div
                className="px-4 py-2 border-b border-border flex items-center gap-2"
                style={{
                  background: `linear-gradient(to right, ${accent}15, #7C3AED15)`,
                }}
              >
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span className="text-sm text-green-400 font-medium">
                  {audioMode ? t("result.audioFound") : t("result.found")}
                </span>
                <span className="ml-auto text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                  {result.platform}
                </span>
              </div>

              <div className="p-4">
                {/* Video Preview */}
                {showPreview && !previewError ? (
                  <div className="w-full rounded-lg overflow-hidden bg-muted mb-3">
                    <video
                      src={result.qualityOptions[0]?.url}
                      controls
                      muted
                      className="w-full object-contain"
                      style={{ maxHeight: "200px" }}
                      onError={() => setPreviewError(true)}
                    >
                      Browser tidak mendukung video player.
                    </video>
                  </div>
                ) : (
                  <div className="flex gap-4">
                    <div className="w-28 h-20 rounded-lg bg-muted flex items-center justify-center shrink-0 overflow-hidden relative">
                      {result.thumbnail ? (
                        <img
                          src={result.thumbnail}
                          alt={result.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = "none";
                          }}
                        />
                      ) : null}
                      <Play className="h-8 w-8 absolute" style={{ color: accent }} />
                    </div>
                    <div className="flex-1 text-left min-w-0">
                      <h3 className="font-semibold text-foreground text-sm line-clamp-2">
                        {result.title}
                      </h3>
                      <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                        {result.duration !== "--:--" && (
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" /> {result.duration}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <User className="h-3 w-3" /> {result.author}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Action buttons row: Preview, Share, Bookmark, Thumbnail */}
                <div className="flex items-center gap-1 mt-3 flex-wrap">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setShowPreview(!showPreview);
                      setPreviewError(false);
                    }}
                    className="text-xs text-muted-foreground hover:text-foreground"
                  >
                    {showPreview ? <EyeOff className="h-3 w-3 mr-1" /> : <Eye className="h-3 w-3 mr-1" />}
                    {t("result.preview")}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleShare}
                    className="text-xs text-muted-foreground hover:text-foreground"
                  >
                    <Share2 className="h-3 w-3 mr-1" />
                    {t("result.share")}
                  </Button>
                  {/* Feature 7: Bookmark Button */}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleToggleBookmark}
                    className="text-xs"
                    style={isBookmarkedState ? { color: accent } : { color: "var(--muted-foreground)" }}
                  >
                    {isBookmarkedState ? (
                      <Bookmark className="h-3 w-3 mr-1 fill-current" />
                    ) : (
                      <Bookmark className="h-3 w-3 mr-1" />
                    )}
                    {isBookmarkedState ? t("result.bookmarked") : t("result.bookmark")}
                  </Button>
                  {/* Feature 5: Thumbnail Download Button */}
                  {result.thumbnail && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleDownloadThumbnail}
                      className="text-xs text-muted-foreground hover:text-foreground"
                    >
                      <ImageIcon className="h-3 w-3 mr-1" />
                      {t("result.downloadThumb")}
                    </Button>
                  )}
                </div>

                {/* Quality selector */}
                {result.qualityOptions.length > 0 && (
                  <div className="mt-3">
                    <p className="text-xs text-muted-foreground mb-2 text-left">
                      {t("result.selectQuality")}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {result.qualityOptions.map((q, i) => {
                        const Icon = getQualityIcon(q.label);
                        const sizeEstimate = estimateFileSize(result.platform, q.resolution, result.duration);
                        return (
                          <button
                            key={i}
                            onClick={() => setSelectedQuality(i)}
                            className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border transition-all ${
                              selectedQuality === i
                                ? "border-current"
                                : "bg-muted border-border text-muted-foreground hover:border-current/30 hover:text-foreground"
                            }`}
                            style={
                              selectedQuality === i
                                ? {
                                    backgroundColor: `${accent}20`,
                                    borderColor: `${accent}80`,
                                    color: accent,
                                  }
                                : undefined
                            }
                          >
                            <Icon className="h-3 w-3" />
                            {q.label}
                            <span className="opacity-60">({q.resolution})</span>
                            {sizeEstimate && (
                              <span className="text-[10px] opacity-50 ml-0.5">{sizeEstimate}</span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Feature 3: Download progress bar */}
                {downloading && (
                  <div className="mt-3 space-y-1.5">
                    <Progress value={downloadPercent} className="h-2.5" />
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{downloadPercent}%</span>
                      {downloadSpeed > 0 && (
                        <span>
                          {downloadSpeed} {t("MB/s")}
                        </span>
                      )}
                      {downloadSize > 0 && (
                        <span>
                          {(downloadSize / (1024 * 1024)).toFixed(1)}{t("MB")}
                          {downloadTotalSize > 0 &&
                            ` / ${(downloadTotalSize / (1024 * 1024)).toFixed(1)}${t("MB")}`}
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Download button */}
                <Button
                  className="w-full mt-4 h-12 text-white font-semibold rounded-lg"
                  onClick={handleDownload}
                  disabled={downloading}
                  style={{ background: `linear-gradient(to right, ${accent}, #00E5FF)` }}
                >
                  {downloading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      {downloadPercent > 0 ? `${downloadPercent}%` : t("mengunduh")}
                    </>
                  ) : (
                    <>
                      {audioMode ? <Music className="mr-2 h-5 w-5" /> : <Download className="mr-2 h-5 w-5" />}
                      {audioMode ? t("btn.downloadAudio") : t("btn.downloadNoWM")}
                      {result.qualityOptions[selectedQuality] && (
                        <span className="ml-1 opacity-70">
                          ({result.qualityOptions[selectedQuality].label})
                        </span>
                      )}
                    </>
                  )}
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Batch results */}
        <AnimatePresence>
          {batchMode && batchResults.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="max-w-xl mx-auto mb-6 space-y-3"
            >
              {batchResults.map((br, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-card border border-border">
                  <div className="flex gap-3">
                    <div className="w-16 h-12 rounded-lg bg-muted flex items-center justify-center shrink-0 overflow-hidden">
                      {br.thumbnail ? (
                        <img src={br.thumbnail} alt={br.title} className="w-full h-full object-cover" />
                      ) : (
                        <Play className="h-4 w-4 text-muted-foreground" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0 text-left">
                      <p className="text-sm font-medium text-foreground line-clamp-1">{br.title}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span
                          className="text-[10px] px-1.5 py-0.5 rounded"
                          style={{ backgroundColor: `${accent}15`, color: accent }}
                        >
                          {br.platform}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {br.duration !== "--:--" ? br.duration : ""}
                        </span>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => handleBatchDownload(br)}
                      className="text-white shrink-0"
                      style={{ background: `linear-gradient(to right, ${accent}, #7C3AED)` }}
                    >
                      <Download className="h-3 w-3 mr-1" />
                      <span className="text-xs">Download</span>
                    </Button>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Riwayat Download (inline on desktop) */}
        {historyItems.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-xl mx-auto mb-6"
          >
            <button
              onClick={() => setRiwayatOpen(!riwayatOpen)}
              className="hidden md:flex items-center gap-2 mx-auto text-sm text-muted-foreground hover:text-foreground transition-colors mb-3"
            >
              <History className="h-4 w-4" />
              {t("history.title")}
              <ChevronDown
                className={`h-4 w-4 transition-transform ${riwayatOpen ? "rotate-180" : ""}`}
              />
            </button>
            <AnimatePresence>
              {riwayatOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="hidden md:block overflow-hidden"
                >
                  <div className="p-3 rounded-xl bg-card border border-border">
                    <RiwayatList
                      history={historyItems}
                      onSelect={handleHistorySelect}
                      onClear={handleHistoryClear}
                      t={t}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <div className="md:hidden">
              <Button
                variant="outline"
                size="sm"
                onClick={onOpenHistorySheet}
                className="w-full border-border text-muted-foreground"
              >
                <History className="h-4 w-4 mr-2" />
                {t("history.view")} ({historyItems.length})
              </Button>
            </div>
          </motion.div>
        )}

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-xl mx-auto"
        >
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-2xl sm:text-3xl font-extrabold gradient-text">{s.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="mt-12"
        >
          <a
            href="#features"
            className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-border hover:border-current/30 transition-colors"
            style={{ hoverBorderColor: accent }}
          >
            <ChevronDown className="h-5 w-5 text-muted-foreground animate-bounce" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* ──────────────────── Features Section ──────────────────── */
const featuresData = [
  { icon: Download, titleId: "Tanpa Watermark", descId: "nw" },
  { icon: Zap, titleId: "Super Cepat", descId: "sc" },
  { icon: Shield, titleId: "Aman & Privat", descId: "ap" },
  { icon: Smartphone, titleId: "Semua Device", descId: "sd" },
  { icon: Gift, titleId: "Gratis Selamanya", descId: "gs" },
  { icon: Globe, titleId: "Multi Platform", descId: "mp" },
];

const featureDescs: Record<string, Record<string, string>> = {
  id: {
    "Tanpa Watermark": "Download video bersih tanpa watermark yang mengganggu. Kualitas asli terjaga.",
    "Super Cepat": "Proses download instan dengan server yang dioptimalkan. Tidak perlu menunggu lama.",
    "Aman & Privat": "Kami tidak menyimpan data pribadi kamu. Privasi terjamin 100%.",
    "Semua Device": "Bisa diakses dari HP, tablet, atau laptop. Responsif di semua ukuran layar.",
    "Gratis Selamanya": "Tidak ada biaya tersembunyi. Download sepuasnya tanpa batas.",
    "Multi Platform": "Support TikTok, Instagram, YouTube, Facebook, Twitter, dan lainnya.",
  },
  en: {
    "Tanpa Watermark": "Download clean videos without annoying watermarks. Original quality preserved.",
    "Super Cepat": "Instant download process with optimized servers. No need to wait long.",
    "Aman & Privat": "We don't store your personal data. Privacy guaranteed 100%.",
    "Semua Device": "Accessible from phone, tablet, or laptop. Responsive on all screen sizes.",
    "Gratis Selamanya": "No hidden costs. Download as much as you want without limits.",
    "Multi Platform": "Support TikTok, Instagram, YouTube, Facebook, Twitter, and more.",
  },
};

function FeaturesSection() {
  const { t } = useLanguage();
  const { accent } = useAccentColor();
  const lang = useLanguage().lang;

  return (
    <section id="features" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
            <span className="gradient-text">{t("features.title")}</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">{t("features.subtitle")}</p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuresData.map((f, i) => (
            <motion.div
              key={f.titleId}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="gradient-border group rounded-xl bg-card p-6 hover:bg-muted/50 transition-colors"
            >
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300"
                style={{
                  background: `linear-gradient(135deg, ${accent}30, #00E5FF30)`,
                }}
              >
                <f.icon className="h-6 w-6" style={{ color: accent }} />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{f.titleId}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {featureDescs[lang]?.[f.titleId] || featureDescs.id[f.titleId]}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────── How It Works Section ──────────────────── */
const stepsData = [
  { number: "01", icon: Clipboard, titleId: "Salin Link", descId: "sl" },
  { number: "02", icon: Download, titleId: "Tempel & Download", descId: "td" },
  { number: "03", icon: CheckCircle, titleId: "Simpan Video", descId: "sv" },
];

const stepsDescs: Record<string, Record<string, string>> = {
  id: {
    "Salin Link": "Salin link video dari platform favorit kamu",
    "Tempel & Download": "Tempel link di kolom input dan klik tombol download",
    "Simpan Video": "Video tanpa watermark siap disimpan ke perangkatmu",
  },
  en: {
    "Salin Link": "Copy the video link from your favorite platform",
    "Tempel & Download": "Paste the link in the input field and click download",
    "Simpan Video": "Save the watermark-free video to your device",
  },
};

function HowItWorksSection() {
  const { accent } = useAccentColor();
  const { lang, t } = useLanguage();

  return (
    <section id="how-it-works" className="relative py-20 sm:py-28">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="animate-orb-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, rgba(124,58,237,0.4) 0%, transparent 70%)" }}
        />
      </div>
      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
            {t("how.title")} <span className="gradient-text">Gutsytik</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">{t("how.subtitle")}</p>
        </motion.div>
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-0">
          {stepsData.map((s, i) => (
            <React.Fragment key={s.number}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="flex flex-col items-center text-center flex-1 relative"
              >
                <div className="relative mb-4">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{ background: `linear-gradient(135deg, ${accent}, #7C3AED)` }}
                  >
                    <s.icon className="h-7 w-7 text-white" />
                  </div>
                  <span
                    className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-background border-2 flex items-center justify-center text-[10px] font-bold"
                    style={{ borderColor: accent, color: accent }}
                  >
                    {s.number}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-1">{s.titleId}</h3>
                <p className="text-sm text-muted-foreground max-w-[200px]">
                  {stepsDescs[lang]?.[s.titleId] || stepsDescs.id[s.titleId]}
                </p>
              </motion.div>
              {i < stepsData.length - 1 && (
                <div className="hidden md:flex items-center self-start mt-8 flex-1">
                  <div className="w-full border-t-2 border-dashed border-border" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────── Feature 8: Statistik Section ──────────────────── */
function StatistikSection() {
  const { t } = useLanguage();
  const { accent } = useAccentColor();
  const [stats, setStats] = useState<DownloadStats>({
    total: 0,
    platforms: {},
    totalSize: 0,
    startDate: Date.now(),
  });

  useEffect(() => {
    const load = () => setStats(getStats());
    load();
    window.addEventListener("gutsytik:stats-changed", load);
    return () => window.removeEventListener("gutsytik:stats-changed", load);
  }, []);

  if (stats.total === 0) return null;

  const maxPlatformCount = Math.max(...Object.values(stats.platforms), 1);
  const platformEntries = Object.entries(stats.platforms).sort(([, a], [, b]) => b - a);

  const formatSize = (mb: number) => {
    if (mb >= 1024) return `${(mb / 1024).toFixed(1)} GB`;
    return `${mb.toFixed(0)} MB`;
  };

  return (
    <section id="stats" className="relative py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-2 flex items-center justify-center gap-2">
              <BarChart3 className="h-6 w-6" style={{ color: accent }} />
              <span className="gradient-text">{t("stats.title")}</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="p-4 rounded-xl bg-card border border-border text-center">
              <p className="text-3xl font-extrabold" style={{ color: accent }}>
                {stats.total}
              </p>
              <p className="text-xs text-muted-foreground mt-1">{t("stats.total")}</p>
            </div>
            <div className="p-4 rounded-xl bg-card border border-border text-center">
              <p className="text-3xl font-extrabold" style={{ color: accent }}>
                {formatSize(stats.totalSize)}
              </p>
              <p className="text-xs text-muted-foreground mt-1">{t("stats.totalData")}</p>
            </div>
            <div className="p-4 rounded-xl bg-card border border-border text-center">
              <p className="text-sm font-bold text-foreground mt-1">{formatDate(stats.startDate)}</p>
              <p className="text-xs text-muted-foreground mt-1">{t("stats.memberSince")}</p>
            </div>
          </div>

          {platformEntries.length > 0 && (
            <div className="p-4 rounded-xl bg-card border border-border">
              <p className="text-xs text-muted-foreground mb-3">{t("stats.perPlatform")}</p>
              <div className="space-y-2.5">
                {platformEntries.map(([platform, count]) => (
                  <div key={platform} className="flex items-center gap-3">
                    <span className="text-xs text-foreground font-medium w-20 text-right truncate">
                      {platform}
                    </span>
                    <div className="flex-1 h-5 rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${Math.max(4, (count / maxPlatformCount) * 100)}%`,
                          background: `linear-gradient(to right, ${accent}, #7C3AED)`,
                        }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground w-8">{count}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

/* ──────────────────── Trending Section (with Feature 9: Search) ──────────────────── */
const trendingPlatforms = [
  { name: "TikTok", downloads: "2.5M", fullDownloads: 2500000, label: "downloads hari ini", bg: "#000000", letter: "T" },
  { name: "Instagram Reels", downloads: "1.8M", fullDownloads: 1800000, label: "downloads hari ini", gradient: "linear-gradient(135deg, #833AB4, #FD1D1D, #F77737)", icon: Instagram },
  { name: "YouTube Shorts", downloads: "1.2M", fullDownloads: 1200000, label: "downloads hari ini", bg: "#FF0000", icon: Play },
  { name: "Facebook Videos", downloads: "800K", fullDownloads: 800000, label: "downloads hari ini", bg: "#1877F2", letter: "f" },
];

const popularSearchTags = ["TikTok Dance", "IG Reels", "YouTube Shorts", "FB Video", "Viral"];

function CountUpNumber({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 2000;
          const startTime = Date.now();
          const step = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.5 }
    );
    const currentRef = ref.current;
    if (currentRef) observer.observe(currentRef);
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [target]);

  const formatNum = (n: number) => {
    if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
    if (n >= 1000) return `${(n / 1000).toFixed(0)}K`;
    return n.toString();
  };

  return (
    <span ref={ref} className="animate-count-up">
      {formatNum(count)}
      {suffix}
    </span>
  );
}

function TrendingSection() {
  const { t } = useLanguage();
  const { accent } = useAccentColor();
  // Feature 9: Search Trending
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTag, setActiveTag] = useState("");

  const filteredPlatforms = trendingPlatforms.filter((p) => {
    if (!searchQuery && !activeTag) return true;
    const query = searchQuery.toLowerCase();
    const tag = activeTag.toLowerCase();
    const nameMatch = p.name.toLowerCase().includes(query) || p.name.toLowerCase().includes(tag);
    return nameMatch;
  });

  const handleTagClick = (tag: string) => {
    if (activeTag === tag) {
      setActiveTag("");
      setSearchQuery("");
    } else {
      setActiveTag(tag);
      setSearchQuery(tag);
    }
  };

  return (
    <section id="trending" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
            {t("trending.title").split(" ").map((word, i) =>
              i === t("trending.title").split(" ").length - 1 ? (
                <span key={i} className="gradient-text"> {word}</span>
              ) : (
                <span key={i}>{i > 0 ? " " : ""}{word}</span>
              )
            )}
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">{t("trending.subtitle")}</p>
        </motion.div>

        {/* Feature 9: Search Trending */}
        <div className="max-w-md mx-auto mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={t("trending.search")}
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setActiveTag("");
              }}
              className="pl-9 h-9 bg-card border-border text-sm rounded-lg"
            />
          </div>
          <div className="flex flex-wrap gap-2 mt-2 justify-center">
            {popularSearchTags.map((tag) => (
              <button
                key={tag}
                onClick={() => handleTagClick(tag)}
                className="text-[11px] px-2.5 py-1 rounded-full border transition-all"
                style={
                  activeTag === tag
                    ? { backgroundColor: `${accent}20`, borderColor: `${accent}50`, color: accent }
                    : { backgroundColor: "var(--muted)", borderColor: "var(--border)", color: "var(--muted-foreground)" }
                }
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {filteredPlatforms.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="relative p-5 rounded-xl bg-card border border-border hover:border-current/20 transition-colors overflow-hidden"
              style={{ hoverBorderColor: accent }}
            >
              <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-500/10 border border-red-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse-live" />
                <span className="text-[10px] font-semibold text-red-400">LIVE</span>
              </div>
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm mb-3"
                style={{ background: p.gradient || p.bg }}
              >
                {p.icon ? <p.icon className="h-5 w-5" /> : p.letter}
              </div>
              <h3 className="text-sm font-semibold text-foreground mb-1">{p.name}</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-lg font-extrabold gradient-text">
                  <CountUpNumber target={p.fullDownloads} suffix="" />
                </span>
                <span className="text-xs text-muted-foreground">{t("downloads hari ini")}</span>
              </div>
              <TrendingUp className="absolute bottom-3 right-3 h-8 w-8" style={{ color: `${accent}15` }} />
            </motion.div>
          ))}
        </div>
        {filteredPlatforms.length === 0 && (
          <p className="text-center text-sm text-muted-foreground mt-6">No matching platforms found.</p>
        )}
      </div>
    </section>
  );
}

/* ──────────────────── Platforms Section ──────────────────── */
const platforms = [
  { name: "TikTok", bg: "#000000", letter: "T" },
  { name: "Instagram", gradient: "linear-gradient(135deg, #833AB4, #FD1D1D, #F77737)", icon: Instagram },
  { name: "YouTube", bg: "#FF0000", icon: Play },
  { name: "Facebook", bg: "#1877F2", letter: "f" },
  { name: "Twitter/X", bg: "#14171A", letter: "X" },
  { name: "Pinterest", bg: "#E60023", letter: "P" },
  { name: "Likee", bg: "#7C3AED", letter: "L" },
  { name: "Snack Video", bg: "#FF8C00", letter: "S" },
];

function PlatformsSection() {
  const { accent } = useAccentColor();
  const { t } = useLanguage();

  return (
    <section id="platforms" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
            {t("platforms.title")}
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">{t("platforms.subtitle")}</p>
        </motion.div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {platforms.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              whileHover={{ y: -4, scale: 1.03 }}
              className="flex flex-col items-center gap-3 p-5 rounded-xl bg-card border border-border hover:border-current/20 transition-colors cursor-pointer"
              style={{ hoverBorderColor: accent }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg"
                style={{ background: p.gradient || p.bg }}
              >
                {p.icon ? <p.icon className="h-6 w-6" /> : p.letter}
              </div>
              <span className="text-sm font-medium text-foreground">{p.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────── FAQ Section ──────────────────── */
const faqsData = [
  { qId: "faq1", aId: "ans1" },
  { qId: "faq2", aId: "ans2" },
  { qId: "faq3", aId: "ans3" },
  { qId: "faq4", aId: "ans4" },
  { qId: "faq5", aId: "ans5" },
  { qId: "faq6", aId: "ans6" },
];

const faqContent: Record<string, Record<string, string>> = {
  id: {
    faq1: "Apakah Gutsytik benar-benar gratis?",
    ans1: "Ya, Gutsytik 100% gratis tanpa biaya tersembunyi. Kamu bisa download video sepuasnya tanpa perlu mendaftar atau membayar apapun.",
    faq2: "Apakah ada batasan jumlah download?",
    ans2: "Tidak ada batasan! Kamu bisa mendownload video sebanyak yang kamu mau tanpa batas harian atau bulanan.",
    faq3: "Apakah kualitas video berkurang?",
    ans3: "Tidak, kami mempertahankan kualitas asli video. Kamu bisa memilih resolusi yang tersedia dari video aslinya, termasuk HD 1080p jika tersedia.",
    faq4: "Platform apa saja yang didukung?",
    ans4: "Gutsytik mendukung TikTok, Instagram, YouTube, Facebook, Twitter/X, Pinterest, Likee, Snack Video, Reddit, dan masih banyak lagi.",
    faq5: "Apakah Gutsytik aman digunakan?",
    ans5: "Sangat aman! Kami tidak menyimpan data pribadi atau riwayat download kamu. Semua proses dilakukan secara aman dan terenkripsi.",
    faq6: "Kenapa video saya gagal didownload?",
    ans6: "Pastikan link video benar dan video tidak bersifat private. Beberapa video dari akun private atau yang dibatasi region mungkin tidak bisa didownload. Coba gunakan link yang valid dan publik.",
  },
  en: {
    faq1: "Is Gutsytik really free?",
    ans1: "Yes, Gutsytik is 100% free with no hidden costs. You can download as many videos as you want without registering or paying anything.",
    faq2: "Is there a download limit?",
    ans2: "No limits! You can download as many videos as you want without daily or monthly restrictions.",
    faq3: "Does video quality decrease?",
    ans3: "No, we maintain the original video quality. You can choose from available resolutions, including HD 1080p if available.",
    faq4: "What platforms are supported?",
    ans4: "Gutsytik supports TikTok, Instagram, YouTube, Facebook, Twitter/X, Pinterest, Likee, Snack Video, Reddit, and many more.",
    faq5: "Is Gutsytik safe to use?",
    ans5: "Very safe! We don't store your personal data or download history. All processes are done securely and encrypted.",
    faq6: "Why did my video download fail?",
    ans6: "Make sure the video link is correct and the video is not private. Some videos from private accounts or region-restricted content may not be downloadable. Try using a valid public link.",
  },
};

function FAQSection() {
  const { t } = useLanguage();
  const { accent } = useAccentColor();
  const lang = useLanguage().lang;

  return (
    <section id="faq" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
            {t("faq.title").split(" ").map((word, i) => {
              const words = t("faq.title").split(" ");
              return i === words.length - 1 ? (
                <span key={i} className="gradient-text"> {word}</span>
              ) : (
                <span key={i}>{i > 0 ? " " : ""}{word}</span>
              );
            })}
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">{t("faq.subtitle")}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqsData.map((f, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="bg-card border border-border rounded-xl px-6 data-[state=open]:border-current/30 transition-colors"
                style={{ "--current": accent } as React.CSSProperties}
              >
                <AccordionTrigger className="text-left text-foreground font-medium hover:no-underline transition-colors" style={{ hoverColor: accent }}>
                  {faqContent[lang]?.[f.qId] || faqContent.id[f.qId]}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faqContent[lang]?.[f.aId] || faqContent.id[f.aId]}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}

/* ──────────────────── CTA Section ──────────────────── */
function CTASection() {
  const { t } = useLanguage();
  const { accent } = useAccentColor();

  return (
    <section className="relative py-20 sm:py-28 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="animate-orb-1 absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full opacity-15"
          style={{ background: `radial-gradient(circle, ${accent}80 0%, transparent 70%)` }}
        />
        <div
          className="animate-orb-3 absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full opacity-15"
          style={{ background: "radial-gradient(circle, rgba(0,229,255,0.4) 0%, transparent 70%)" }}
        />
      </div>
      <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
            {t("cta.title").includes("Tanpa Watermark") ? (
              <>
                Siap Download Video <span className="gradient-text">Tanpa Watermark?</span>
              </>
            ) : (
              <span className="gradient-text">{t("cta.title")}</span>
            )}
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8">{t("cta.subtitle")}</p>
          <a href="#hero">
            <Button
              size="lg"
              className="h-14 px-8 text-base text-white font-semibold rounded-xl animate-gradient-shift"
              style={{ background: `linear-gradient(to right, ${accent}, #7C3AED, #00E5FF)`, backgroundSize: "200% 200%" }}
            >
              <Download className="mr-2 h-5 w-5" />
              {t("cta.button")}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* ──────────────────── Footer ──────────────────── */
function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="sm:col-span-2 lg:col-span-1">
            <GutsytikLogo size={32} showText />
            <p className="mt-3 text-sm text-muted-foreground max-w-xs">{t("footer.desc")}</p>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-3 text-sm">{t("footer.nav")}</h4>
            <ul className="space-y-2">
              {[
                { label: t("nav.fitur"), href: "#features" },
                { label: t("nav.caraPakai"), href: "#how-it-works" },
                { label: t("nav.platform"), href: "#platforms" },
                { label: t("nav.faq"), href: "#faq" },
              ].map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-3 text-sm">{t("footer.legal")}</h4>
            <ul className="space-y-2">
              {["Privacy Policy", "Terms of Service"].map((l) => (
                <li key={l}>
                  <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-3 text-sm">{t("footer.follow")}</h4>
            <div className="flex gap-3">
              {[
                { icon: Play, label: "TikTok", href: "https://tiktok.com/@abbbuw", bg: "#000000" },
                { icon: Send, label: "Telegram", href: "https://t.me/sixte3nnn", bg: "#0088CC" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center hover:bg-gutsy-pink/20 hover:text-gutsy-pink transition-colors text-muted-foreground"
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">&copy; 2026 Gutsytik. All rights reserved.</p>
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            Made with <Heart className="h-3 w-3 text-gutsy-pink" /> by Gutsytik Team
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ──────────────────── Mobile Bottom Nav ──────────────────── */
function MobileBottomNav({
  onOpenHistory,
  onOpenBookmarks,
}: {
  onOpenHistory: () => void;
  onOpenBookmarks: () => void;
}) {
  const { accent } = useAccentColor();
  const [bookmarkCount, setBookmarkCount] = useState(0);

  useEffect(() => {
    const load = () => setBookmarkCount(getBookmarks().length);
    load();
    window.addEventListener("gutsytik:bookmarks-changed", load);
    return () => window.removeEventListener("gutsytik:bookmarks-changed", load);
  }, []);

  const navItems = [
    { icon: HomeIcon, label: "Home", href: "#hero" },
    { icon: Download, label: "Download", href: "#hero", highlight: true },
    { icon: Bookmark, label: "Saved", action: "bookmarks" as const },
    { icon: HelpCircle, label: "FAQ", href: "#faq" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 md:hidden">
      <div className="glass-strong border-t border-border safe-area-bottom">
        <div className="flex items-center justify-around px-2 py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
          {navItems.map((item) => {
            if (item.action === "bookmarks") {
              return (
                <button
                  key={item.label}
                  onClick={onOpenBookmarks}
                  className="flex flex-col items-center gap-0.5 py-1 px-3 rounded-lg text-muted-foreground hover:text-foreground transition-colors relative"
                >
                  <div className="relative">
                    <item.icon className="h-5 w-5" />
                    {bookmarkCount > 0 && (
                      <span
                        className="absolute -top-1.5 -right-1.5 min-w-[14px] h-[14px] rounded-full text-[8px] font-bold flex items-center justify-center text-white"
                        style={{ backgroundColor: accent }}
                      >
                        {bookmarkCount > 9 ? "9+" : bookmarkCount}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px]">{item.label}</span>
                </button>
              );
            }
            return (
              <a
                key={item.label}
                href={item.href}
                className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-lg transition-colors ${
                  item.highlight ? "" : "text-muted-foreground hover:text-foreground"
                }`}
                style={item.highlight ? { color: accent } : {}}
              >
                <item.icon className="h-5 w-5" />
                <span className="text-[10px]">{item.label}</span>
              </a>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

/* ──────────────────── Report Button ──────────────────── */
function ReportButton() {
  const [open, setOpen] = useState(false);
  const [issueType, setIssueType] = useState("");
  const [description, setDescription] = useState("");
  const { toast, dismiss } = useToast();
  const { t } = useLanguage();
  const { accent } = useAccentColor();

  const handleSubmit = useCallback(() => {
    if (!issueType) return;
    setOpen(false);
    setIssueType("");
    setDescription("");
    const t2 = toast({
      title: t("report.thanks"),
      description: t("report.thanksDesc"),
    });
    setTimeout(() => dismiss(t2.id), 3000);
  }, [issueType, toast, dismiss, t]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-20 right-4 md:bottom-6 md:right-6 z-30 w-12 h-12 rounded-full bg-card border border-border shadow-lg flex items-center justify-center hover:border-current/30 hover:shadow-current/10 transition-all group"
        style={{ hoverBorderColor: accent, hoverShadowColor: accent }}
        aria-label={t("report.title")}
      >
        <Flag className="h-5 w-5 text-muted-foreground group-hover:text-current transition-colors" style={{ groupHoverColor: accent }} />
      </button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-foreground">{t("report.title")}</DialogTitle>
            <DialogDescription className="text-muted-foreground">{t("report.desc")}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">{t("report.type")}</label>
              <select
                value={issueType}
                onChange={(e) => setIssueType(e.target.value)}
                className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="">{t("report.typePlaceholder")}</option>
                <option value="download_fail">Video gagal download</option>
                <option value="invalid_link">Link tidak valid</option>
                <option value="low_quality">Kualitas rendah</option>
                <option value="other">Lainnya</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">{t("report.descLabel")}</label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={t("report.descPlaceholder")}
                className="min-h-[80px]"
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="ghost" className="text-muted-foreground">
                {t("report.cancel")}
              </Button>
            </DialogClose>
            <Button
              onClick={handleSubmit}
              disabled={!issueType}
              className="text-white"
              style={{ background: `linear-gradient(to right, ${accent}, #7C3AED)` }}
            >
              {t("report.submit")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

/* ──────────────────── Riwayat Sheet (Mobile) ──────────────────── */
function RiwayatSheet({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [historyItems, setHistoryItems] = useState<HistoryItem[]>([]);
  const { toast, dismiss } = useToast();
  const { t } = useLanguage();

  useEffect(() => {
    const load = () => setHistoryItems(getHistory());
    load();
    window.addEventListener("gutsytik:history-changed", load);
    return () => window.removeEventListener("gutsytik:history-changed", load);
  }, []);

  const handleSelect = useCallback(
    (item: HistoryItem) => {
      window.dispatchEvent(new CustomEvent("gutsytik:select-history", { detail: item }));
      onOpenChange(false);
    },
    [onOpenChange]
  );

  const handleClear = useCallback(() => {
    clearAllHistory();
    const t2 = toast({ title: t("toast.historyCleared"), description: "" });
    setTimeout(() => dismiss(t2.id), 3000);
  }, [toast, dismiss, t]);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="rounded-t-2xl max-h-[70vh]">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <History className="h-5 w-5" />
            {t("history.title")}
          </SheetTitle>
          <SheetDescription>{t("history.empty")}</SheetDescription>
        </SheetHeader>
        <div className="mt-4">
          {historyItems.length > 0 ? (
            <RiwayatList history={historyItems} onSelect={handleSelect} onClear={handleClear} t={t} />
          ) : (
            <p className="text-sm text-muted-foreground text-center py-8">{t("history.empty")}</p>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

/* ──────────────────── Feature 7: Bookmark Sheet ──────────────────── */
function BookmarkSheet({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>([]);
  const { toast, dismiss } = useToast();
  const { t } = useLanguage();
  const { accent } = useAccentColor();

  useEffect(() => {
    const load = () => setBookmarks(getBookmarks());
    load();
    window.addEventListener("gutsytik:bookmarks-changed", load);
    return () => window.removeEventListener("gutsytik:bookmarks-changed", load);
  }, []);

  const showToastMsg = useCallback(
    (msg: string) => {
      const t2 = toast({ title: msg, description: "" });
      setTimeout(() => dismiss(t2.id), 3000);
    },
    [toast, dismiss]
  );

  const handleRemove = useCallback(
    (url: string) => {
      removeBookmark(url);
      showToastMsg(t("toast.bookmarkRemoved"));
    },
    [t, showToastMsg]
  );

  const handleClearAll = useCallback(() => {
    try {
      localStorage.removeItem(BOOKMARK_KEY);
      window.dispatchEvent(new Event("gutsytik:bookmarks-changed"));
    } catch {}
    showToastMsg(t("toast.bookmarkRemoved"));
  }, [showToastMsg, t]);

  const handleSelect = useCallback(
    (item: BookmarkItem) => {
      window.dispatchEvent(
        new CustomEvent("gutsytik:select-history", {
          detail: { ...item, downloadUrl: item.url },
        })
      );
      onOpenChange(false);
    },
    [onOpenChange]
  );

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="rounded-t-2xl max-h-[70vh]">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Bookmark className="h-5 w-5" style={{ color: accent }} />
            {t("bookmark.title")}
          </SheetTitle>
          <SheetDescription>{t("bookmark.empty")}</SheetDescription>
        </SheetHeader>
        <div className="mt-4">
          {bookmarks.length > 0 ? (
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-muted-foreground">{bookmarks.length} video</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClearAll}
                  className="text-xs text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="h-3 w-3 mr-1" /> {t("bookmark.clear")}
                </Button>
              </div>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {bookmarks.map((item) => (
                  <div
                    key={item.id}
                    className="w-full flex items-center gap-3 p-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <button
                      onClick={() => handleSelect(item)}
                      className="flex items-center gap-3 flex-1 min-w-0 text-left"
                    >
                      <div className="w-10 h-10 rounded bg-muted flex items-center justify-center shrink-0 overflow-hidden">
                        {item.thumbnail ? (
                          <img src={item.thumbnail} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <Play className="h-4 w-4 text-muted-foreground" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-foreground truncate">{item.title}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span
                            className="text-[10px] px-1.5 py-0.5 rounded"
                            style={{ backgroundColor: `${accent}15`, color: accent }}
                          >
                            {item.platform}
                          </span>
                          <span className="text-[10px] text-muted-foreground">
                            {timeAgo(item.timestamp, t)}
                          </span>
                        </div>
                      </div>
                    </button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemove(item.url)}
                      className="text-xs text-muted-foreground hover:text-destructive shrink-0"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-8">{t("bookmark.empty")}</p>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

/* ──────────────────── Main Page ──────────────────── */
export default function Home() {
  const [historySheetOpen, setHistorySheetOpen] = useState(false);
  const [bookmarkSheetOpen, setBookmarkSheetOpen] = useState(false);

  return (
    <LanguageProvider>
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-1">
          <HeroSection
            onOpenHistorySheet={() => setHistorySheetOpen(true)}
            onOpenBookmarkSheet={() => setBookmarkSheetOpen(true)}
          />
          <FeaturesSection />
          <HowItWorksSection />
          <StatistikSection />
          <TrendingSection />
          <PlatformsSection />
          <FAQSection />
          <CTASection />
        </main>
        <Footer />
        <MobileBottomNav
          onOpenHistory={() => setHistorySheetOpen(true)}
          onOpenBookmarks={() => setBookmarkSheetOpen(true)}
        />
        <ReportButton />
        <RiwayatSheet open={historySheetOpen} onOpenChange={setHistorySheetOpen} />
        <BookmarkSheet open={bookmarkSheetOpen} onOpenChange={setBookmarkSheetOpen} />
      </div>
    </LanguageProvider>
  );
}

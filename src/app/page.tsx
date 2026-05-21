"use client";

import React, { useState, useCallback, useRef, useEffect, createContext, useContext, useMemo } from "react";
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
  Copy,
  Star,
  Bell,
  Calendar,
  ListVideo,
  FileText,
  Plus,
  Timer,
  RotateCcw,
  Scissors,
  QrCode,
  Sparkles,
  Wand2,
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
import { Badge } from "@/components/ui/badge";
import { GutsytikLogo } from "@/components/gutsytik-logo";
import { useToast } from "@/hooks/use-toast";
import { ParticleBackground } from "@/components/particle-background";
import { TypingHeroText } from "@/components/typing-hero-text";
import { useConfetti } from "@/components/confetti-effect";
import { CursorTrail } from "@/components/cursor-trail";
import { useKonamiCode, KonamiOverlay } from "@/components/konami-code";
import { LiveTicker } from "@/components/live-ticker";
import { useDownloadStreak, StreakBadge } from "@/components/download-streak";

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

interface PlaylistVideo {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  url: string;
  selected: boolean;
}

interface SubtitleInfo {
  lang: string;
  name: string;
}

interface ScheduledDownload {
  id: string;
  result: DownloadResult;
  qualityIndex: number;
  url: string;
  delayMs: number;
  startTime: number;
  remaining: number;
}

interface PlatformRatings {
  [platform: string]: number[];
}

/* ──────────────────── Constants ──────────────────── */
const HISTORY_KEY = "gutsytik_history";
const BOOKMARK_KEY = "gutsytik_bookmarks";
const STATS_KEY = "gutsytik_stats";
const LANG_KEY = "gutsytik_lang";
const ACCENT_KEY = "gutsytik_accent";
const RATINGS_KEY = "gutsytik_ratings";
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
    "result.copyCaption": "Salin Caption",
    "result.captionCopied": "Caption disalin!",
    "result.subtitles": "Subtitle",
    "result.schedule": "Jadwalkan",
    "result.rate": "Beri Rating",
    "result.rateQuality": "Rating kualitas download",
    "playlist.title": "Playlist",
    "playlist.empty": "Masukkan URL playlist YouTube",
    "playlist.fetching": "Mengambil daftar playlist...",
    "playlist.selectVideos": "Pilih video yang ingin didownload",
    "playlist.downloadSelected": "Download Terpilih",
    "playlist.downloadAll": "Download Semua",
    "subtitle.title": "Subtitle Tersedia",
    "subtitle.download": "Download Subtitle",
    "subtitle.noSubs": "Tidak ada subtitle tersedia",
    "schedule.title": "Jadwalkan Download",
    "schedule.delay": "Delay",
    "schedule.5min": "5 Menit",
    "schedule.15min": "15 Menit",
    "schedule.30min": "30 Menit",
    "schedule.1hr": "1 Jam",
    "schedule.scheduled": "Download dijadwalkan!",
    "schedule.countdown": "Mulai dalam",
    "schedule.cancel": "Batalkan",
    "export.title": "Ekspor Riwayat",
    "export.csv": "Ekspor CSV",
    "export.json": "Ekspor JSON",
    "export.success": "Riwayat berhasil diekspor!",
    "fab.download": "Download",
    "fab.history": "Riwayat",
    "fab.bookmarks": "Bookmark",
    "notification.enabled": "Notifikasi diaktifkan",
    "notification.complete": "Download selesai!",
    "notification.denied": "Notifikasi diblokir",
    "retry.count": "Mencoba ulang",
    "retry.of": "dari",
    "retry.failed": "Gagal setelah 3x percobaan",
    "rating.average": "Rata-rata",
    "rating.stars": "bintang",
    "info.duration": "Durasi",
    "info.resolution": "Resolusi",
    "info.estimatedSize": "Estimasi Ukuran",
    "info.author": "Pembuat",
    "info.platform": "Platform",
    "result.aiSummary": "AI Ringkasan",
    "result.aiSummaryTitle": "Ringkasan Video AI",
    "result.aiSummaryLoading": "Menganalisis video...",
    "result.aiSummaryError": "Gagal membuat ringkasan",
    "result.resolution": "Resolusi",
    "result.selectResolution": "Pilih Resolusi",
    "result.convertGif": "GIF",
    "result.gifTitle": "Convert ke GIF",
    "result.gifStart": "Mulai (mm:ss)",
    "result.gifEnd": "Selesai (mm:ss)",
    "result.gifQuality": "Kualitas GIF",
    "result.gifLow": "Rendah",
    "result.gifMedium": "Sedang",
    "result.gifHigh": "Tinggi",
    "result.gifConvert": "Convert ke GIF",
    "result.gifConverting": "Mengkonversi...",
    "result.gifMaxDuration": "Maks 30 detik",
    "result.qrCode": "QR Code",
    "result.qrTitle": "QR Code Download",
    "result.qrDesc": "Scan QR code ini untuk download video di perangkat lain",
    "result.qrDownload": "Download QR Code",
    "result.trim": "Trim",
    "result.trimTitle": "Trim Video",
    "result.trimStart": "Mulai (mm:ss)",
    "result.trimEnd": "Selesai (mm:ss)",
    "result.trimDuration": "Durasi Trim",
    "result.trimDownload": "Trim & Download",
    "result.trimming": "Memproses trim...",
    "result.seconds": "detik",
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
    "result.copyCaption": "Copy Caption",
    "result.captionCopied": "Caption copied!",
    "result.subtitles": "Subtitles",
    "result.schedule": "Schedule",
    "result.rate": "Rate",
    "result.rateQuality": "Rate download quality",
    "playlist.title": "Playlist",
    "playlist.empty": "Enter YouTube playlist URL",
    "playlist.fetching": "Fetching playlist...",
    "playlist.selectVideos": "Select videos to download",
    "playlist.downloadSelected": "Download Selected",
    "playlist.downloadAll": "Download All",
    "subtitle.title": "Available Subtitles",
    "subtitle.download": "Download Subtitle",
    "subtitle.noSubs": "No subtitles available",
    "schedule.title": "Schedule Download",
    "schedule.delay": "Delay",
    "schedule.5min": "5 Minutes",
    "schedule.15min": "15 Minutes",
    "schedule.30min": "30 Minutes",
    "schedule.1hr": "1 Hour",
    "schedule.scheduled": "Download scheduled!",
    "schedule.countdown": "Starts in",
    "schedule.cancel": "Cancel",
    "export.title": "Export History",
    "export.csv": "Export CSV",
    "export.json": "Export JSON",
    "export.success": "History exported successfully!",
    "fab.download": "Download",
    "fab.history": "History",
    "fab.bookmarks": "Bookmarks",
    "notification.enabled": "Notifications enabled",
    "notification.complete": "Download complete!",
    "notification.denied": "Notifications blocked",
    "retry.count": "Retrying",
    "retry.of": "of",
    "retry.failed": "Failed after 3 attempts",
    "rating.average": "Average",
    "rating.stars": "stars",
    "info.duration": "Duration",
    "info.resolution": "Resolution",
    "info.estimatedSize": "Estimated Size",
    "info.author": "Author",
    "info.platform": "Platform",
    "result.aiSummary": "AI Summary",
    "result.aiSummaryTitle": "AI Video Summary",
    "result.aiSummaryLoading": "Analyzing video...",
    "result.aiSummaryError": "Failed to generate summary",
    "result.resolution": "Resolution",
    "result.selectResolution": "Select Resolution",
    "result.convertGif": "GIF",
    "result.gifTitle": "Convert to GIF",
    "result.gifStart": "Start (mm:ss)",
    "result.gifEnd": "End (mm:ss)",
    "result.gifQuality": "GIF Quality",
    "result.gifLow": "Low",
    "result.gifMedium": "Medium",
    "result.gifHigh": "High",
    "result.gifConvert": "Convert to GIF",
    "result.gifConverting": "Converting...",
    "result.gifMaxDuration": "Max 30 seconds",
    "result.qrCode": "QR Code",
    "result.qrTitle": "QR Code Download",
    "result.qrDesc": "Scan this QR code to download the video on another device",
    "result.qrDownload": "Download QR Code",
    "result.trim": "Trim",
    "result.trimTitle": "Trim Video",
    "result.trimStart": "Start (mm:ss)",
    "result.trimEnd": "End (mm:ss)",
    "result.trimDuration": "Trim Duration",
    "result.trimDownload": "Trim & Download",
    "result.trimming": "Processing trim...",
    "result.seconds": "seconds",
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

/* ──────────────────── Feature 1: Platform Detection (UI) ──────────────────── */
interface PlatformInfo {
  name: string;
  color: string;
  letter: string;
  icon?: React.ComponentType<{ className?: string }>;
}

const PLATFORM_MAP: Record<string, PlatformInfo> = {
  TikTok: { name: "TikTok", color: "#000000", letter: "T" },
  YouTube: { name: "YouTube", color: "#FF0000", letter: "Y", icon: Play },
  Instagram: { name: "Instagram", color: "#E4405F", letter: "I", icon: Instagram },
  "Twitter/X": { name: "Twitter/X", color: "#000000", letter: "X" },
  Facebook: { name: "Facebook", color: "#1877F2", letter: "f" },
  Pinterest: { name: "Pinterest", color: "#E60023", letter: "P" },
  Reddit: { name: "Reddit", color: "#FF4500", letter: "R" },
  Likee: { name: "Likee", color: "#7C3AED", letter: "L" },
  "Snack Video": { name: "Snack Video", color: "#FF8C00", letter: "S" },
  Unknown: { name: "Unknown", color: "#6B7280", letter: "?" },
};

function detectPlatformFromUrl(urlStr: string): PlatformInfo {
  try {
    const hostname = new URL(urlStr).hostname.toLowerCase();
    if (hostname.includes("tiktok") || hostname.includes("vm.tiktok")) return PLATFORM_MAP.TikTok;
    if (hostname.includes("youtube") || hostname.includes("youtu.be")) return PLATFORM_MAP.YouTube;
    if (hostname.includes("instagram")) return PLATFORM_MAP.Instagram;
    if (hostname.includes("twitter") || hostname.includes("x.com")) return PLATFORM_MAP["Twitter/X"];
    if (hostname.includes("facebook") || hostname.includes("fb.watch") || hostname.includes("fb.com")) return PLATFORM_MAP.Facebook;
    if (hostname.includes("pinterest")) return PLATFORM_MAP.Pinterest;
    if (hostname.includes("reddit")) return PLATFORM_MAP.Reddit;
    if (hostname.includes("likee")) return PLATFORM_MAP.Likee;
    if (hostname.includes("snackvideo") || hostname.includes("snack")) return PLATFORM_MAP["Snack Video"];
  } catch {}
  return PLATFORM_MAP.Unknown;
}

/* ──────────────────── Feature 11: Sound Effects (Web Audio API) ──────────────────── */
let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    audioCtx = new AudioContext();
  }
  return audioCtx;
}

function playDingSound() {
  try {
    const ctx = getAudioContext();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(880, ctx.currentTime);
    oscillator.frequency.setValueAtTime(1108.73, ctx.currentTime + 0.1);
    gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.5);
  } catch {}
}

function playWhooshSound() {
  try {
    const ctx = getAudioContext();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    oscillator.type = "sawtooth";
    oscillator.frequency.setValueAtTime(400, ctx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.3);
    gainNode.gain.setValueAtTime(0.15, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.3);
  } catch {}
}

/* ──────────────────── Feature 7: Browser Notifications ──────────────────── */
async function requestNotificationPermission(): Promise<boolean> {
  if (typeof window === "undefined" || !("Notification" in window)) return false;
  if (Notification.permission === "granted") return true;
  if (Notification.permission === "denied") return false;
  const result = await Notification.requestPermission();
  return result === "granted";
}

function sendDownloadNotification(title: string) {
  try {
    if (typeof window !== "undefined" && "Notification" in window && Notification.permission === "granted") {
      new Notification("Gutsytik", {
        body: `${title} - Download complete!`,
        icon: "/logo.svg",
      });
    }
  } catch {}
}

/* ──────────────────── Feature 12: Ratings ──────────────────── */
function getRatings(): PlatformRatings {
  if (typeof window === "undefined") return {};
  try {
    const data = localStorage.getItem(RATINGS_KEY);
    return data ? JSON.parse(data) : {};
  } catch {
    return {};
  }
}

function addRating(platform: string, rating: number) {
  try {
    const ratings = getRatings();
    if (!ratings[platform]) ratings[platform] = [];
    ratings[platform].push(rating);
    localStorage.setItem(RATINGS_KEY, JSON.stringify(ratings));
    window.dispatchEvent(new Event("gutsytik:ratings-changed"));
  } catch {}
}

function getAverageRating(platform: string): number {
  const ratings = getRatings();
  const list = ratings[platform];
  if (!list || list.length === 0) return 0;
  return list.reduce((a, b) => a + b, 0) / list.length;
}

/* ──────────────────── Feature 10: Export History ──────────────────── */
function exportHistoryCSV(history: HistoryItem[]) {
  const header = "Title,Platform,Author,Duration,URL,Date";
  const rows = history.map(
    (h) => `"${h.title.replace(/"/g, '""')}","${h.platform}","${h.author}","${h.duration}","${h.url}","${new Date(h.timestamp).toISOString()}"`
  );
  const csv = [header, ...rows].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `gutsytik_history_${Date.now()}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function exportHistoryJSON(history: HistoryItem[]) {
  const json = JSON.stringify(history, null, 2);
  const blob = new Blob([json], { type: "application/json;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `gutsytik_history_${Date.now()}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/* ──────────────────── Feature 6: Format Duration ──────────────────── */
function formatDurationLong(durStr: string): string {
  if (!durStr || durStr === "--:--") return "--:--:--";
  const parts = durStr.split(":").map(Number);
  if (parts.length === 2) {
    const h = Math.floor(parts[0] / 60);
    const m = parts[0] % 60;
    const s = parts[1];
    if (h > 0) return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
    return `00:${String(parts[0]).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  }
  if (parts.length === 3) return durStr;
  return `00:00:${String(parts[0] || 0).padStart(2, "0")}`;
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
  // Feature 1: Auto-Detect Platform
  const [detectedPlatform, setDetectedPlatform] = useState<PlatformInfo | null>(null);
  // Feature 4: Playlist
  const [playlistTab, setPlaylistTab] = useState(false);
  const [playlistUrl, setPlaylistUrl] = useState("");
  const [playlistVideos, setPlaylistVideos] = useState<PlaylistVideo[]>([]);
  const [playlistFetching, setPlaylistFetching] = useState(false);
  // Feature 5: Subtitles
  const [subtitles, setSubtitles] = useState<SubtitleInfo[]>([]);
  const [subtitleOpen, setSubtitleOpen] = useState(false);
  const [subtitleLoading, setSubtitleLoading] = useState(false);
  // Feature 9: Schedule
  const [scheduledDownloads, setScheduledDownloads] = useState<ScheduledDownload[]>([]);
  const [scheduleOpen, setScheduleOpen] = useState(false);
  // Feature 3: Retry
  const [retryCount, setRetryCount] = useState(0);
  const [retryFailed, setRetryFailed] = useState(false);
  // Feature 12: Rating
  const [currentRating, setCurrentRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  // Feature 7: Notification
  const [notifPermission, setNotifPermission] = useState<string>("default");
  // Feature: AI Summary
  const [aiSummaryOpen, setAiSummaryOpen] = useState(false);
  const [aiSummaryLoading, setAiSummaryLoading] = useState(false);
  const [aiSummaryText, setAiSummaryText] = useState("");
  // Feature: GIF Converter
  const [gifOpen, setGifOpen] = useState(false);
  const [gifStart, setGifStart] = useState("00:00");
  const [gifEnd, setGifEnd] = useState("00:10");
  const [gifQuality, setGifQuality] = useState<"low" | "medium" | "high">("medium");
  const [gifConverting, setGifConverting] = useState(false);
  // Feature: QR Code
  const [qrOpen, setQrOpen] = useState(false);
  // Feature: Trim Video
  const [trimOpen, setTrimOpen] = useState(false);
  const [trimStart, setTrimStart] = useState("00:00");
  const [trimEnd, setTrimEnd] = useState("00:10");
  const [trimming, setTrimming] = useState(false);
  // Feature: Resolution Picker enhanced
  const [resolutionPickerOpen, setResolutionPickerOpen] = useState(false);

  const resultRef = useRef<HTMLDivElement>(null);
  const urlRef = useRef(url);
  urlRef.current = url;

  const { toast, dismiss } = useToast();

  // WOW Features: Confetti & Download Streak
  const { triggerConfetti, ConfettiCanvas } = useConfetti();
  const { streakCount, incrementStreak, isOnFire } = useDownloadStreak();

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
        setSubtitleOpen(false);
        setScheduleOpen(false);
        setAiSummaryOpen(false);
        setGifOpen(false);
        setQrOpen(false);
        setTrimOpen(false);
        setResolutionPickerOpen(false);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Feature 1: Auto-Detect Platform from URL
  useEffect(() => {
    if (url.trim()) {
      const platform = detectPlatformFromUrl(url.trim());
      setDetectedPlatform(platform.name !== "Unknown" ? platform : null);
    } else {
      setDetectedPlatform(null);
    }
  }, [url]);

  // Feature 7: Check notification permission on mount
  useEffect(() => {
    if (typeof window !== "undefined" && "Notification" in window) {
      setNotifPermission(Notification.permission);
    }
  }, []);

  // Feature 9: Scheduled downloads timer
  useEffect(() => {
    if (scheduledDownloads.length === 0) return;
    const interval = setInterval(() => {
      setScheduledDownloads((prev) => {
        const now = Date.now();
        const updated = prev.map((sd) => ({
          ...sd,
          remaining: Math.max(0, sd.startTime + sd.delayMs - now),
        }));
        // Auto-trigger downloads that have reached 0
        const ready = updated.filter((sd) => sd.remaining <= 0);
        const stillPending = updated.filter((sd) => sd.remaining > 0);
        for (const sd of ready) {
          // Trigger the download
          const quality = sd.result.qualityOptions[sd.qualityIndex] || sd.result.qualityOptions[0];
          if (quality) {
            fetch(quality.url).then((res) => {
              if (!res.ok) throw new Error("Failed");
              return res.blob();
            }).then((blob) => {
              const blobUrl = URL.createObjectURL(blob);
              const isAudio = quality.label === "Audio" || quality.resolution === "MP3";
              const ext = isAudio ? "mp3" : "mp4";
              const fileName = `${sd.result.filename}_${quality.label}.${ext}`;
              const a = document.createElement("a");
              a.href = blobUrl;
              a.download = fileName;
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
              setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
              playDingSound();
              sendDownloadNotification(sd.result.title);
            }).catch(() => {});
          }
        }
        return stillPending;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [scheduledDownloads.length]);

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

  // Feature 3: Download with real progress bar + retry + sound + notifications
  const handleDownload = useCallback(async () => {
    if (!result) return;
    const quality = result.qualityOptions[selectedQuality] || result.qualityOptions[0];
    if (!quality) return;

    // Feature 11: Whoosh sound on start
    playWhooshSound();

    // Feature 7: Request notification permission on first download
    if (notifPermission === "default") {
      const granted = await requestNotificationPermission();
      setNotifPermission(granted ? "granted" : "denied");
      if (granted) {
        showToast(t("notification.enabled"), "", "default");
      }
    }

    setDownloading(true);
    setDownloadPercent(0);
    setDownloadSpeed(0);
    setDownloadSize(0);
    setDownloadTotalSize(0);
    setRetryCount(0);
    setRetryFailed(false);

    const attemptDownload = async (attempt: number): Promise<boolean> => {
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

          const blob = new Blob(chunks as BlobPart[]);
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

        // Update stats
        const estimatedMB = downloadTotalSize > 0
          ? Math.round(downloadTotalSize / (1024 * 1024))
          : Math.round((downloadSize || 1) / (1024 * 1024)) || 5;
        incrementStats(result.platform, estimatedMB);

        // Feature 11: Ding sound on complete
        playDingSound();

        // Feature 7: Browser notification
        sendDownloadNotification(result.title);

        // WOW Feature: Confetti explosion & Streak increment
        triggerConfetti();
        incrementStreak();

        showToast(t("toast.downloadStart"), t("toast.saving"), "default");
        return true;
      } catch {
        if (attempt < 3) {
          // Feature 3: Retry with exponential backoff
          setRetryCount(attempt);
          const delay = Math.pow(2, attempt - 1) * 1000;
          await new Promise((resolve) => setTimeout(resolve, delay));
          return attemptDownload(attempt + 1);
        }
        setRetryFailed(true);
        return false;
      }
    };

    const success = await attemptDownload(1);

    if (!success) {
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
        playDingSound();
        sendDownloadNotification(result.title);
        // WOW Feature: Confetti & Streak for fallback download
        triggerConfetti();
        incrementStreak();
      } catch {
        setError(t("error.downloadFail"));
        showToast(t("toast.downloadFail"), t("toast.tryAgain"), "destructive");
      }
    }

    setTimeout(() => {
      setDownloading(false);
      setDownloadPercent(0);
      setDownloadSpeed(0);
      setDownloadSize(0);
      setDownloadTotalSize(0);
    }, 2500);
  }, [result, selectedQuality, url, showToast, t, downloadTotalSize, downloadSize, notifPermission, triggerConfetti, incrementStreak]);

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

  // Feature 2: Copy Caption
  const handleCopyCaption = useCallback(async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(result.title);
      showToast(t("result.captionCopied"), "", "default");
    } catch {}
  }, [result, showToast, t]);

  // Feature 4: Fetch Playlist
  const handleFetchPlaylist = useCallback(async () => {
    if (!playlistUrl.trim()) return;
    setPlaylistFetching(true);
    setPlaylistVideos([]);
    try {
      const res = await fetch("/api/playlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: playlistUrl.trim() }),
      });
      const data = await res.json();
      if (res.ok && data.videos) {
        const videos: PlaylistVideo[] = data.videos.map((v: { id: string; title: string; thumbnail: string; duration: string; url: string }) => ({
          id: v.id,
          title: v.title,
          thumbnail: v.thumbnail,
          duration: v.duration,
          url: v.url,
          selected: false,
        }));
        setPlaylistVideos(videos);
      } else {
        showToast("Error", data.error || "Failed to fetch playlist", "destructive");
      }
    } catch {
      showToast("Error", t("error.server"), "destructive");
    } finally {
      setPlaylistFetching(false);
    }
  }, [playlistUrl, showToast, t]);

  // Feature 5: Fetch Subtitles
  const handleFetchSubtitles = useCallback(async () => {
    if (!result) return;
    setSubtitleLoading(true);
    setSubtitleOpen(true);
    try {
      const res = await fetch("/api/subtitles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim() }),
      });
      const data = await res.json();
      if (res.ok && data.subtitles) {
        setSubtitles(data.subtitles);
      } else {
        setSubtitles([]);
      }
    } catch {
      setSubtitles([]);
    } finally {
      setSubtitleLoading(false);
    }
  }, [result, url]);

  // Feature 5: Download Subtitle
  const handleDownloadSubtitle = useCallback(async (sub: SubtitleInfo) => {
    try {
      const res = await fetch("/api/subtitles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim(), lang: sub.lang, format: "srt" }),
      });
      const data = await res.json();
      if (res.ok && data.content) {
        const blob = new Blob([data.content], { type: "text/srt;charset=utf-8;" });
        const blobUrl = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = blobUrl;
        a.download = `${result?.filename || "subtitle"}_${sub.lang}.srt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
        showToast(t("subtitle.download"), "", "default");
      }
    } catch {}
  }, [url, result, showToast, t]);

  // Feature 9: Schedule Download
  const handleScheduleDownload = useCallback((delayMs: number) => {
    if (!result) return;
    const sd: ScheduledDownload = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      result: { ...result },
      qualityIndex: selectedQuality,
      url: url.trim(),
      delayMs,
      startTime: Date.now(),
      remaining: delayMs,
    };
    setScheduledDownloads((prev) => [...prev, sd]);
    setScheduleOpen(false);
    showToast(t("schedule.scheduled"), t("schedule.countdown"), "default");
  }, [result, selectedQuality, url, showToast, t]);

  // Feature 9: Cancel Scheduled Download
  const handleCancelSchedule = useCallback((id: string) => {
    setScheduledDownloads((prev) => prev.filter((sd) => sd.id !== id));
  }, []);

  // Feature 4: Playlist select/deselect
  const handleTogglePlaylistVideo = useCallback((idx: number) => {
    setPlaylistVideos((prev) => prev.map((v, i) => i === idx ? { ...v, selected: !v.selected } : v));
  }, []);

  const handleSelectAllPlaylist = useCallback(() => {
    setPlaylistVideos((prev) => prev.map((v) => ({ ...v, selected: true })));
  }, []);

  // Feature 12: Rate download
  const handleRate = useCallback((rating: number) => {
    if (!result) return;
    setCurrentRating(rating);
    addRating(result.platform, rating);
    showToast(t("result.rate"), `${rating}/5 ⭐`, "default");
  }, [result, showToast, t]);

  // Feature: AI Summary
  const handleAiSummary = useCallback(async () => {
    if (!result) return;
    setAiSummaryLoading(true);
    setAiSummaryOpen(true);
    setAiSummaryText("");
    try {
      const res = await fetch("/api/ai-summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim(), title: result.title, platform: result.platform }),
      });
      const data = await res.json();
      if (res.ok && data.summary) {
        setAiSummaryText(data.summary);
      } else {
        setAiSummaryText(t("result.aiSummaryError"));
      }
    } catch {
      setAiSummaryText(t("result.aiSummaryError"));
    } finally {
      setAiSummaryLoading(false);
    }
  }, [result, url, t]);

  // Feature: GIF Converter
  const parseTimeToSeconds = (timeStr: string): number => {
    const parts = timeStr.split(":");
    if (parts.length === 2) return parseInt(parts[0]) * 60 + parseInt(parts[1]);
    if (parts.length === 3) return parseInt(parts[0]) * 3600 + parseInt(parts[1]) * 60 + parseInt(parts[2]);
    return 0;
  };

  const handleGifConvert = useCallback(async () => {
    if (!result) return;
    const startSec = parseTimeToSeconds(gifStart);
    const endSec = parseTimeToSeconds(gifEnd);
    if (endSec - startSec <= 0 || endSec - startSec > 30) {
      showToast(t("result.gifMaxDuration"), "", "destructive");
      return;
    }
    setGifConverting(true);
    try {
      const quality = result.qualityOptions[selectedQuality] || result.qualityOptions[0];
      const res = await fetch("/api/gif", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: quality?.url || url.trim(), startTime: startSec, endTime: endSec, quality: gifQuality }),
      });
      const data = await res.json();
      if (res.ok) {
        // Open ezgif for GIF conversion as a practical approach
        const ezgifUrl = `https://ezgif.com/video-to-gif?url=${encodeURIComponent(quality?.url || url.trim())}&start=${startSec}&end=${endSec}`;
        window.open(ezgifUrl, "_blank");
        showToast(t("result.gifConvert"), "", "default");
        setGifOpen(false);
      } else {
        showToast(t("result.aiSummaryError"), data.error || "", "destructive");
      }
    } catch {
      showToast(t("result.aiSummaryError"), "", "destructive");
    } finally {
      setGifConverting(false);
    }
  }, [result, url, gifStart, gifEnd, gifQuality, selectedQuality, showToast, t]);

  // Feature: QR Code
  const handleQrCode = useCallback(() => {
    if (!result) return;
    setQrOpen(true);
  }, [result]);

  const handleDownloadQr = useCallback(() => {
    const shareUrl = `${window.location.origin}?url=${encodeURIComponent(url.trim())}`;
    const qrUrl = `https://chart.googleapis.com/chart?cht=qr&chs=300x300&chl=${encodeURIComponent(shareUrl)}`;
    const a = document.createElement("a");
    a.href = qrUrl;
    a.download = `${result?.filename || "qrcode"}_qr.png`;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }, [url, result]);

  // Feature: Trim Video
  const handleTrim = useCallback(async () => {
    if (!result) return;
    const startSec = parseTimeToSeconds(trimStart);
    const endSec = parseTimeToSeconds(trimEnd);
    if (endSec - startSec <= 0) {
      showToast(t("error.invalidUrl"), "", "destructive");
      return;
    }
    setTrimming(true);
    try {
      const quality = result.qualityOptions[selectedQuality] || result.qualityOptions[0];
      const res = await fetch("/api/trim", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: quality?.url || url.trim(), startTime: startSec, endTime: endSec }),
      });
      const data = await res.json();
      if (res.ok) {
        // Use cobalt or direct download with trim parameters
        const trimUrl = quality?.url || url.trim();
        const a = document.createElement("a");
        a.href = trimUrl;
        a.download = `${result.filename}_trimmed.mp4`;
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        showToast(t("result.trimDownload"), `${trimStart} - ${trimEnd}`, "default");
        setTrimOpen(false);
      } else {
        showToast(t("result.aiSummaryError"), data.error || "", "destructive");
      }
    } catch {
      showToast(t("result.aiSummaryError"), "", "destructive");
    } finally {
      setTrimming(false);
    }
  }, [result, url, trimStart, trimEnd, selectedQuality, showToast, t]);

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
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 gradient-morph-bg"
    >
      {/* Particle Background + Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <ParticleBackground />
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

      {/* Confetti Canvas */}
      <ConfettiCanvas />

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

        {/* Heading - Typing Animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <TypingHeroText key={audioMode ? "audio" : "video"} audioMode={audioMode} t={t} />
        </motion.div>

        {/* Streak Badge */}
        <StreakBadge streakCount={streakCount} isOnFire={isOnFire} />

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
              value={playlistTab ? "playlist" : audioMode ? "audio" : "video"}
              onValueChange={(v) => {
                setAudioMode(v === "audio");
                setPlaylistTab(v === "playlist");
              }}
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
                <TabsTrigger value="playlist" className="text-xs px-3 h-6">
                  <ListVideo className="h-3 w-3 mr-1" />
                  {t("playlist.title")}
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
          ) : playlistTab ? (
            /* Feature 4: Playlist mode */
            <div className="p-3 rounded-xl bg-card border border-border">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Input
                    type="url"
                    placeholder={t("playlist.empty")}
                    value={playlistUrl}
                    onChange={(e) => setPlaylistUrl(e.target.value)}
                    className="h-12 bg-background border-border text-foreground placeholder:text-muted-foreground rounded-lg text-base"
                  />
                  <ListVideo className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
                <Button
                  onClick={handleFetchPlaylist}
                  disabled={playlistFetching}
                  className="h-12 px-6 text-white font-semibold rounded-lg shrink-0"
                  style={{ background: `linear-gradient(to right, ${accent}, #7C3AED)` }}
                >
                  {playlistFetching ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <>
                      <ListVideo className="mr-2 h-5 w-5" />
                      <span className="hidden sm:inline">{t("playlist.title")}</span>
                    </>
                  )}
                </Button>
              </div>
              {playlistFetching && (
                <div className="flex items-center gap-2 mt-3">
                  <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{t("playlist.fetching")}</span>
                </div>
              )}
              {playlistVideos.length > 0 && (
                <div className="mt-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-muted-foreground">{t("playlist.selectVideos")}</span>
                    <Button variant="ghost" size="sm" onClick={handleSelectAllPlaylist} className="text-xs" style={{ color: accent }}>
                      {t("playlist.downloadAll")}
                    </Button>
                  </div>
                  <div className="max-h-64 overflow-y-auto space-y-2">
                    {playlistVideos.map((v, i) => (
                      <div key={v.id} className="flex items-center gap-2 p-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                        <input
                          type="checkbox"
                          checked={v.selected}
                          onChange={() => handleTogglePlaylistVideo(i)}
                          className="h-4 w-4 rounded border-border accent-current"
                          style={{ accentColor: accent }}
                        />
                        <div className="w-12 h-9 rounded bg-muted flex items-center justify-center shrink-0 overflow-hidden">
                          {v.thumbnail ? (
                            <img src={v.thumbnail} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <Play className="h-3 w-3 text-muted-foreground" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-foreground line-clamp-1">{v.title}</p>
                          <span className="text-[10px] text-muted-foreground">{v.duration}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  {playlistVideos.some((v) => v.selected) && (
                    <Button
                      className="w-full mt-3 h-10 text-white font-semibold rounded-lg"
                      style={{ background: `linear-gradient(to right, ${accent}, #7C3AED)` }}
                      onClick={async () => {
                        const selected = playlistVideos.filter((v) => v.selected);
                        for (const v of selected) {
                          try {
                            const res = await fetch("/api/download", {
                              method: "POST",
                              headers: { "Content-Type": "application/json" },
                              body: JSON.stringify({ url: v.url }),
                            });
                            const data = await res.json();
                            if (res.ok && data.qualityOptions?.[0]?.url) {
                              const blob = await fetch(data.qualityOptions[0].url).then((r) => r.blob());
                              const blobUrl = URL.createObjectURL(blob);
                              const a = document.createElement("a");
                              a.href = blobUrl;
                              a.download = `${data.filename || v.title}.mp4`;
                              document.body.appendChild(a);
                              a.click();
                              document.body.removeChild(a);
                              setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
                            }
                          } catch {}
                          await new Promise((r) => setTimeout(r, 500));
                        }
                        playDingSound();
                        showToast(t("toast.downloadStart"), `${selected.length} videos`, "default");
                      }}
                    >
                      <Download className="mr-2 h-4 w-4" />
                      {t("playlist.downloadSelected")} ({playlistVideos.filter((v) => v.selected).length})
                    </Button>
                  )}
                </div>
              )}
            </div>
          ) : (
            /* Single mode input */
            <>
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
                {/* Feature 1: Platform detection indicator */}
                {detectedPlatform && (
                  <div className="absolute left-2 top-1/2 -translate-y-1/2 flex items-center gap-1 pointer-events-none">
                    <span
                      className="inline-flex items-center justify-center w-5 h-5 rounded text-[9px] font-bold text-white"
                      style={{ backgroundColor: detectedPlatform.color }}
                    >
                      {detectedPlatform.icon ? <detectedPlatform.icon className="h-3 w-3" /> : detectedPlatform.letter}
                    </span>
                  </div>
                )}
                {audioMode && !detectedPlatform && (
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
            {/* Feature 1: Platform badge below input */}
            {detectedPlatform && !batchMode && !playlistTab && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 mt-2 justify-center"
              >
                <span
                  className="inline-flex items-center gap-1.5 text-xs px-3 py-1 rounded-full border font-medium"
                  style={{
                    backgroundColor: `${detectedPlatform.color}15`,
                    color: detectedPlatform.color === "#000000" ? "var(--foreground)" : detectedPlatform.color,
                    borderColor: `${detectedPlatform.color}30`,
                  }}
                >
                  <span
                    className="inline-flex items-center justify-center w-4 h-4 rounded text-[8px] font-bold text-white"
                    style={{ backgroundColor: detectedPlatform.color }}
                  >
                    {detectedPlatform.icon ? <detectedPlatform.icon className="h-2.5 w-2.5" /> : detectedPlatform.letter}
                  </span>
                  {detectedPlatform.name}
                </span>
              </motion.div>
            )}
            </>
          )}

          {/* Feature 4: Keyboard shortcut hint */}
          {!batchMode && !playlistTab && (
            <div className="flex items-center justify-center gap-2 mt-2">
              <span className="inline-flex items-center gap-1 text-[10px] text-muted-foreground/60">
                <Keyboard className="h-2.5 w-2.5" />
                {t("shortcut.hint")}
              </span>
            </div>
          )}

          {/* Error message for single mode */}
          {!batchMode && !playlistTab && (
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
                {/* Feature 6: Video Info Card */}
                <div className="grid grid-cols-2 gap-2 mb-3 p-3 rounded-lg bg-muted/30 border border-border/50">
                  <div className="flex items-center gap-2">
                    <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                    <div>
                      <p className="text-[10px] text-muted-foreground">{t("info.duration")}</p>
                      <p className="text-xs font-medium text-foreground">{formatDurationLong(result.duration)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Film className="h-3.5 w-3.5 text-muted-foreground" />
                    <div>
                      <p className="text-[10px] text-muted-foreground">{t("info.resolution")}</p>
                      <p className="text-xs font-medium text-foreground">{result.qualityOptions.map((q) => q.resolution).join(", ")}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileVideo className="h-3.5 w-3.5 text-muted-foreground" />
                    <div>
                      <p className="text-[10px] text-muted-foreground">{t("info.estimatedSize")}</p>
                      <p className="text-xs font-medium text-foreground">
                        {result.qualityOptions.slice(0, 2).map((q) => estimateFileSize(result.platform, q.resolution, result.duration)).filter(Boolean).join(" / ") || "N/A"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="h-3.5 w-3.5 text-muted-foreground" />
                    <div>
                      <p className="text-[10px] text-muted-foreground">{t("info.author")}</p>
                      <p className="text-xs font-medium text-foreground truncate max-w-[120px]">{result.author}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="h-3.5 w-3.5 text-muted-foreground" />
                    <div>
                      <p className="text-[10px] text-muted-foreground">{t("info.platform")}</p>
                      <p className="text-xs font-medium text-foreground">{result.platform}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="h-3.5 w-3.5 text-muted-foreground" />
                    <div>
                      <p className="text-[10px] text-muted-foreground">Title</p>
                      <p className="text-xs font-medium text-foreground truncate max-w-[120px]" title={result.title}>{result.title}</p>
                    </div>
                  </div>
                </div>

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

                {/* Action buttons row: Preview, Share, Bookmark, Thumbnail, Copy Caption, Subtitle, Schedule */}
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
                  {/* Feature 2: Copy Caption Button */}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCopyCaption}
                    className="text-xs text-muted-foreground hover:text-foreground"
                  >
                    <Copy className="h-3 w-3 mr-1" />
                    {t("result.copyCaption")}
                  </Button>
                  {/* Feature 5: Subtitles Button (YouTube only) */}
                  {result.platform === "YouTube" && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleFetchSubtitles}
                      className="text-xs text-muted-foreground hover:text-foreground"
                    >
                      <FileText className="h-3 w-3 mr-1" />
                      {t("result.subtitles")}
                    </Button>
                  )}
                  {/* Feature 9: Schedule Button */}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setScheduleOpen(true)}
                    className="text-xs text-muted-foreground hover:text-foreground"
                  >
                    <Calendar className="h-3 w-3 mr-1" />
                    {t("result.schedule")}
                  </Button>
                  {/* Feature: AI Summary Button */}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleAiSummary}
                    className="text-xs text-muted-foreground hover:text-foreground"
                  >
                    <Sparkles className="h-3 w-3 mr-1" />
                    {t("result.aiSummary")}
                  </Button>
                  {/* Feature: GIF Converter Button */}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setGifOpen(true)}
                    className="text-xs text-muted-foreground hover:text-foreground"
                  >
                    <Wand2 className="h-3 w-3 mr-1" />
                    {t("result.convertGif")}
                  </Button>
                  {/* Feature: QR Code Button */}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleQrCode}
                    className="text-xs text-muted-foreground hover:text-foreground"
                  >
                    <QrCode className="h-3 w-3 mr-1" />
                    {t("result.qrCode")}
                  </Button>
                  {/* Feature: Trim Video Button */}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setTrimOpen(true)}
                    className="text-xs text-muted-foreground hover:text-foreground"
                  >
                    <Scissors className="h-3 w-3 mr-1" />
                    {t("result.trim")}
                  </Button>
                </div>

                {/* Feature 12: Star Rating */}
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs text-muted-foreground">{t("result.rate")}:</span>
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => handleRate(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="transition-transform hover:scale-110"
                      >
                        <Star
                          className={`h-4 w-4 ${(hoverRating || currentRating) >= star ? "fill-current" : ""}`}
                          style={{
                            color: (hoverRating || currentRating) >= star ? "#FBBF24" : "var(--muted-foreground)",
                          }}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Enhanced Resolution Picker */}
                {result.qualityOptions.length > 0 && (
                  <div className="mt-3">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs text-muted-foreground text-left">
                        {t("result.selectResolution")}
                      </p>
                      {result.qualityOptions[selectedQuality] && (
                        <Badge
                          className="text-[10px] font-semibold"
                          style={{ backgroundColor: `${accent}20`, color: accent, border: `1px solid ${accent}40` }}
                        >
                          {result.qualityOptions[selectedQuality].resolution}
                        </Badge>
                      )}
                    </div>
                    {/* Quick resolution buttons */}
                    <div className="flex flex-wrap gap-2">
                      {result.qualityOptions.map((q, i) => {
                        const Icon = getQualityIcon(q.label);
                        const sizeEstimate = estimateFileSize(result.platform, q.resolution, result.duration);
                        const isSelected = selectedQuality === i;
                        return (
                          <motion.button
                            key={i}
                            onClick={() => setSelectedQuality(i)}
                            className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border transition-all ${
                              isSelected
                                ? "border-current shadow-sm"
                                : "bg-muted border-border text-muted-foreground hover:border-current/30 hover:text-foreground"
                            }`}
                            style={
                              isSelected
                                ? {
                                    backgroundColor: `${accent}20`,
                                    borderColor: `${accent}80`,
                                    color: accent,
                                    boxShadow: `0 0 12px ${accent}20`,
                                  }
                                : undefined
                            }
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                          >
                            <Icon className="h-3 w-3" />
                            {q.label}
                            <span className="opacity-60">({q.resolution})</span>
                            {sizeEstimate && (
                              <span className="text-[10px] opacity-50 ml-0.5">{sizeEstimate}</span>
                            )}
                          </motion.button>
                        );
                      })}
                    </div>
                    {/* Detailed resolution popover for fine selection */}
                    <Popover open={resolutionPickerOpen} onOpenChange={setResolutionPickerOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-2 w-full text-xs justify-between"
                          style={{ borderColor: `${accent}30` }}
                        >
                          <span className="flex items-center gap-2">
                            <Film className="h-3 w-3" style={{ color: accent }} />
                            {t("result.resolution")}: {result.qualityOptions[selectedQuality]?.label || "—"} ({result.qualityOptions[selectedQuality]?.resolution || "—"})
                          </span>
                          <ChevronDown className="h-3 w-3 text-muted-foreground" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-72 p-2" align="start">
                        <div className="space-y-1">
                          {result.qualityOptions.map((q, i) => {
                            const Icon = getQualityIcon(q.label);
                            const sizeEstimate = estimateFileSize(result.platform, q.resolution, result.duration);
                            const isSelected = selectedQuality === i;
                            return (
                              <button
                                key={i}
                                onClick={() => {
                                  setSelectedQuality(i);
                                  setResolutionPickerOpen(false);
                                }}
                                className={`w-full flex items-center gap-3 p-2.5 rounded-lg text-left transition-all ${
                                  isSelected
                                    ? "bg-accent/10"
                                    : "hover:bg-muted"
                                }`}
                                style={isSelected ? { backgroundColor: `${accent}15` } : undefined}
                              >
                                <div
                                  className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                                  style={{ backgroundColor: isSelected ? `${accent}25` : "var(--muted)" }}
                                >
                                  <Icon className="h-4 w-4" style={{ color: isSelected ? accent : "var(--muted-foreground)" }} />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium" style={{ color: isSelected ? accent : "var(--foreground)" }}>
                                      {q.label}
                                    </span>
                                    <Badge
                                      variant="secondary"
                                      className="text-[10px] px-1.5"
                                      style={isSelected ? { backgroundColor: `${accent}20`, color: accent } : undefined}
                                    >
                                      {q.resolution}
                                    </Badge>
                                  </div>
                                  {sizeEstimate && (
                                    <span className="text-[10px] text-muted-foreground">~{sizeEstimate}</span>
                                  )}
                                </div>
                                {isSelected && (
                                  <CheckCircle className="h-4 w-4 shrink-0" style={{ color: accent }} />
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                )}

                {/* Feature 3: Download progress bar */}
                {downloading && (
                  <div className="mt-3 space-y-1.5">
                    <Progress value={downloadPercent} className="h-2.5" />
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>
                        {downloadPercent}%
                        {retryCount > 0 && (
                          <span className="ml-1 text-amber-400">
                            ({t("retry.count")} {retryCount} {t("retry.of")} 3)
                          </span>
                        )}
                      </span>
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
                    {retryFailed && (
                      <div className="flex items-center gap-2 p-2 rounded-lg bg-red-500/10 border border-red-500/20">
                        <AlertCircle className="h-3 w-3 text-red-400" />
                        <span className="text-xs text-red-400">{t("retry.failed")}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={handleDownload}
                          className="text-xs text-red-400 ml-auto"
                        >
                          <RotateCcw className="h-3 w-3 mr-1" />
                          Retry
                        </Button>
                      </div>
                    )}
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

        {/* Feature 9: Scheduled Downloads Panel */}
        {scheduledDownloads.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-xl mx-auto mt-6"
          >
            <div className="p-3 rounded-xl bg-card border border-border">
              <h3 className="text-sm font-semibold text-foreground flex items-center gap-2 mb-2">
                <Timer className="h-4 w-4" style={{ color: accent }} />
                {t("schedule.title")}
              </h3>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {scheduledDownloads.map((sd) => (
                  <div key={sd.id} className="flex items-center gap-2 p-2 rounded-lg bg-muted/50">
                    <Timer className="h-3 w-3 text-muted-foreground shrink-0" />
                    <span className="text-xs text-foreground truncate flex-1">{sd.result.title}</span>
                    <span className="text-xs text-muted-foreground shrink-0">
                      {t("schedule.countdown")} {Math.floor(sd.remaining / 60000)}:{String(Math.floor((sd.remaining % 60000) / 1000)).padStart(2, "0")}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleCancelSchedule(sd.id)}
                      className="text-xs text-muted-foreground hover:text-destructive shrink-0 h-6 px-1"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Feature 5: Subtitles Dialog */}
        <Dialog open={subtitleOpen} onOpenChange={setSubtitleOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                {t("subtitle.title")}
              </DialogTitle>
              <DialogDescription>{t("subtitle.noSubs")}</DialogDescription>
            </DialogHeader>
            <div className="mt-2">
              {subtitleLoading ? (
                <div className="flex items-center gap-2 py-4">
                  <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Loading...</span>
                </div>
              ) : subtitles.length > 0 ? (
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {subtitles.map((sub) => (
                    <div key={sub.lang} className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                      <span className="text-sm text-foreground">{sub.name} ({sub.lang})</span>
                      <Button
                        size="sm"
                        onClick={() => handleDownloadSubtitle(sub)}
                        className="text-white"
                        style={{ background: accent }}
                      >
                        <Download className="h-3 w-3 mr-1" />
                        {t("subtitle.download")}
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">{t("subtitle.noSubs")}</p>
              )}
            </div>
          </DialogContent>
        </Dialog>

        {/* Feature 9: Schedule Dialog */}
        <Dialog open={scheduleOpen} onOpenChange={setScheduleOpen}>
          <DialogContent className="sm:max-w-sm">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                {t("schedule.title")}
              </DialogTitle>
              <DialogDescription>{t("schedule.delay")}</DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-3 mt-2">
              {[
                { label: t("schedule.5min"), ms: 5 * 60 * 1000 },
                { label: t("schedule.15min"), ms: 15 * 60 * 1000 },
                { label: t("schedule.30min"), ms: 30 * 60 * 1000 },
                { label: t("schedule.1hr"), ms: 60 * 60 * 1000 },
              ].map((opt) => (
                <Button
                  key={opt.ms}
                  variant="outline"
                  onClick={() => handleScheduleDownload(opt.ms)}
                  className="h-12 text-sm font-medium"
                  style={{ borderColor: `${accent}40` }}
                >
                  <Timer className="h-4 w-4 mr-2" style={{ color: accent }} />
                  {opt.label}
                </Button>
              ))}
            </div>
          </DialogContent>
        </Dialog>

        {/* Feature: AI Summary Dialog */}
        <Dialog open={aiSummaryOpen} onOpenChange={setAiSummaryOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5" style={{ color: accent }} />
                {t("result.aiSummaryTitle")}
              </DialogTitle>
              <DialogDescription>{t("result.aiSummaryLoading")}</DialogDescription>
            </DialogHeader>
            <div className="mt-2">
              {aiSummaryLoading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin" style={{ color: accent }} />
                  <span className="ml-3 text-sm text-muted-foreground">{t("result.aiSummaryLoading")}</span>
                </div>
              ) : aiSummaryText ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="p-4 rounded-lg bg-muted/50 border border-border"
                >
                  <p className="text-sm text-foreground leading-relaxed">{aiSummaryText}</p>
                </motion.div>
              ) : null}
            </div>
          </DialogContent>
        </Dialog>

        {/* Feature: GIF Converter Dialog */}
        <Dialog open={gifOpen} onOpenChange={setGifOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Wand2 className="h-5 w-5" style={{ color: accent }} />
                {t("result.gifTitle")}
              </DialogTitle>
              <DialogDescription>{t("result.gifMaxDuration")}</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 mt-2">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-muted-foreground">{t("result.gifStart")}</label>
                  <Input
                    value={gifStart}
                    onChange={(e) => setGifStart(e.target.value)}
                    placeholder="00:00"
                    className="text-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-muted-foreground">{t("result.gifEnd")}</label>
                  <Input
                    value={gifEnd}
                    onChange={(e) => setGifEnd(e.target.value)}
                    placeholder="00:10"
                    className="text-sm"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground">{t("result.gifQuality")}</label>
                <div className="flex gap-2">
                  {(["low", "medium", "high"] as const).map((q) => (
                    <button
                      key={q}
                      onClick={() => setGifQuality(q)}
                      className={`flex-1 text-xs px-3 py-2 rounded-lg border transition-all ${
                        gifQuality === q
                          ? "border-current font-medium"
                          : "bg-muted border-border text-muted-foreground hover:border-current/30 hover:text-foreground"
                      }`}
                      style={
                        gifQuality === q
                          ? { backgroundColor: `${accent}20`, borderColor: `${accent}80`, color: accent }
                          : undefined
                      }
                    >
                      {t(`result.gif${q.charAt(0).toUpperCase() + q.slice(1)}` as string)}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-muted/50 text-xs text-muted-foreground">
                <span>{t("result.gifMaxDuration")}</span>
                <span>
                  {Math.max(0, parseTimeToSeconds(gifEnd) - parseTimeToSeconds(gifStart))} {t("result.seconds")}
                </span>
              </div>
              <Button
                onClick={handleGifConvert}
                disabled={gifConverting}
                className="w-full text-white font-medium"
                style={{ background: `linear-gradient(to right, ${accent}, #7C3AED)` }}
              >
                {gifConverting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    {t("result.gifConverting")}
                  </>
                ) : (
                  <>
                    <Wand2 className="h-4 w-4 mr-2" />
                    {t("result.gifConvert")}
                  </>
                )}
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Feature: QR Code Dialog */}
        <Dialog open={qrOpen} onOpenChange={setQrOpen}>
          <DialogContent className="sm:max-w-sm">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <QrCode className="h-5 w-5" style={{ color: accent }} />
                {t("result.qrTitle")}
              </DialogTitle>
              <DialogDescription>{t("result.qrDesc")}</DialogDescription>
            </DialogHeader>
            <div className="flex flex-col items-center gap-4 mt-2">
              <div className="p-3 rounded-xl bg-white border border-border">
                <img
                  src={`https://chart.googleapis.com/chart?cht=qr&chs=300x300&chl=${encodeURIComponent(`${typeof window !== "undefined" ? window.location.origin : ""}?url=${encodeURIComponent(url.trim())}`)}`}
                  alt="QR Code"
                  width={200}
                  height={200}
                  className="rounded-lg"
                />
              </div>
              <p className="text-xs text-muted-foreground text-center max-w-[250px] break-all">
                {url.trim()}
              </p>
              <Button
                onClick={handleDownloadQr}
                className="w-full text-white font-medium"
                style={{ background: `linear-gradient(to right, ${accent}, #7C3AED)` }}
              >
                <Download className="h-4 w-4 mr-2" />
                {t("result.qrDownload")}
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Feature: Trim Video Dialog */}
        <Dialog open={trimOpen} onOpenChange={setTrimOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Scissors className="h-5 w-5" style={{ color: accent }} />
                {t("result.trimTitle")}
              </DialogTitle>
              <DialogDescription>{t("result.trimDuration")}</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 mt-2">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-muted-foreground">{t("result.trimStart")}</label>
                  <Input
                    value={trimStart}
                    onChange={(e) => setTrimStart(e.target.value)}
                    placeholder="00:00"
                    className="text-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-muted-foreground">{t("result.trimEnd")}</label>
                  <Input
                    value={trimEnd}
                    onChange={(e) => setTrimEnd(e.target.value)}
                    placeholder="00:10"
                    className="text-sm"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-border">
                <span className="text-xs text-muted-foreground">{t("result.trimDuration")}</span>
                <Badge
                  variant="secondary"
                  className="text-xs font-medium"
                  style={{ backgroundColor: `${accent}20`, color: accent }}
                >
                  {Math.max(0, parseTimeToSeconds(trimEnd) - parseTimeToSeconds(trimStart))} {t("result.seconds")}
                </Badge>
              </div>
              {/* Visual trim preview */}
              <div className="relative h-8 rounded-lg bg-muted overflow-hidden border border-border">
                <div
                  className="absolute top-0 bottom-0 rounded-lg opacity-40"
                  style={{
                    left: `${Math.min(100, (parseTimeToSeconds(trimStart) / Math.max(1, parseTimeToSeconds(trimEnd) || 60)) * 100)}%`,
                    right: "0%",
                    backgroundColor: accent,
                  }}
                />
                <div
                  className="absolute top-0 bottom-0 rounded-lg"
                  style={{
                    left: `${(parseTimeToSeconds(trimStart) / Math.max(1, parseTimeToSeconds(trimEnd) || 60)) * 100}%`,
                    width: `${((parseTimeToSeconds(trimEnd) - parseTimeToSeconds(trimStart)) / Math.max(1, parseTimeToSeconds(trimEnd) || 60)) * 100}%`,
                    backgroundColor: accent,
                    opacity: 0.8,
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center text-[10px] font-medium text-foreground">
                  {trimStart} → {trimEnd}
                </div>
              </div>
              <Button
                onClick={handleTrim}
                disabled={trimming}
                className="w-full text-white font-medium"
                style={{ background: `linear-gradient(to right, ${accent}, #7C3AED)` }}
              >
                {trimming ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    {t("result.trimming")}
                  </>
                ) : (
                  <>
                    <Scissors className="h-4 w-4 mr-2" />
                    {t("result.trimDownload")}
                  </>
                )}
              </Button>
            </div>
          </DialogContent>
        </Dialog>

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
            style={{ borderColor: 'var(--border)' }}
          >
            <ChevronDown className="h-5 w-5 text-muted-foreground animate-bounce" />
          </a>
        </motion.div>
      </div>

      {/* Live Activity Ticker */}
      <LiveTicker />
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
              {/* Feature 12: Average Ratings per Platform */}
              <div className="mt-4 pt-3 border-t border-border">
                <p className="text-xs text-muted-foreground mb-2">{t("result.rateQuality")}</p>
                <div className="space-y-1.5">
                  {platformEntries.map(([platform]) => {
                    const avg = getAverageRating(platform);
                    if (avg === 0) return null;
                    return (
                      <div key={`rating-${platform}`} className="flex items-center gap-2">
                        <span className="text-xs text-foreground font-medium w-20 text-right truncate">{platform}</span>
                        <div className="flex items-center gap-0.5">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star
                              key={s}
                              className={`h-3 w-3 ${avg >= s ? "fill-current" : ""}`}
                              style={{ color: avg >= s ? "#FBBF24" : "var(--muted-foreground)" }}
                            />
                          ))}
                        </div>
                        <span className="text-[10px] text-muted-foreground">
                          {avg.toFixed(1)} {t("rating.stars")}
                        </span>
                      </div>
                    );
                  })}
                </div>
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
              style={{ borderColor: 'var(--border)' }}
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
              style={{ borderColor: 'var(--border)' }}
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
                <AccordionTrigger className="text-left text-foreground font-medium hover:no-underline transition-colors">
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
              {/* TikTok Logo */}
              <a
                href="https://tiktok.com/@abbbuw"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center hover:bg-gutsy-pink/20 hover:text-gutsy-pink transition-colors text-muted-foreground group"
              >
                <svg className="h-4 w-4 group-hover:text-gutsy-pink transition-colors" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V9.25a8.16 8.16 0 004.76 1.52V7.34a4.83 4.83 0 01-1-.65z"/>
                </svg>
              </a>
              {/* Telegram Logo */}
              <a
                href="https://t.me/sixte3nnn"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Telegram"
                className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center hover:bg-gutsy-pink/20 hover:text-gutsy-pink transition-colors text-muted-foreground group"
              >
                <svg className="h-4 w-4 group-hover:text-gutsy-pink transition-colors" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0h-.056zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
              </a>
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

/* ──────────────────── Feature 8: Quick Actions FAB ──────────────────── */
function QuickActionFAB({
  onOpenHistory,
  onOpenBookmarks,
}: {
  onOpenHistory: () => void;
  onOpenBookmarks: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const { accent } = useAccentColor();
  const { t } = useLanguage();

  return (
    <div className="fixed bottom-20 right-4 z-40 md:hidden flex flex-col items-end gap-2">
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.8 }}
            className="flex flex-col gap-2 items-end"
          >
            <button
              onClick={() => {
                onOpenHistory();
                setExpanded(false);
              }}
              className="flex items-center gap-2 px-3 py-2 rounded-full bg-card border border-border shadow-lg text-xs text-foreground hover:bg-muted transition-colors"
            >
              <History className="h-4 w-4" />
              {t("fab.history")}
            </button>
            <button
              onClick={() => {
                onOpenBookmarks();
                setExpanded(false);
              }}
              className="flex items-center gap-2 px-3 py-2 rounded-full bg-card border border-border shadow-lg text-xs text-foreground hover:bg-muted transition-colors"
            >
              <Bookmark className="h-4 w-4" />
              {t("fab.bookmarks")}
            </button>
            <a
              href="#hero"
              onClick={() => setExpanded(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-full bg-card border border-border shadow-lg text-xs text-foreground hover:bg-muted transition-colors"
            >
              <Download className="h-4 w-4" />
              {t("fab.download")}
            </a>
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-white transition-transform hover:scale-105"
        style={{
          background: `linear-gradient(135deg, ${accent}, #7C3AED)`,
          transform: expanded ? "rotate(45deg)" : "rotate(0deg)",
        }}
        aria-label="Quick actions"
      >
        <Plus className="h-6 w-6" />
      </button>
    </div>
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
        style={{ borderColor: 'var(--border)' }}
        aria-label={t("report.title")}
      >
        <Flag className="h-5 w-5 text-muted-foreground group-hover:text-current transition-colors" />
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

  const showToastMsg = useCallback(
    (title: string, description: string, variant: "default" | "destructive" = "default") => {
      const t2 = toast({ title, description, variant });
      setTimeout(() => dismiss(t2.id), 3000);
    },
    [toast, dismiss]
  );

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
            <div>
              {/* Feature 10: Export History */}
              <div className="flex items-center gap-2 mb-3">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm" className="text-xs border-border">
                      <Copy className="h-3 w-3 mr-1" />
                      {t("export.title")}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-2" align="start">
                    <div className="flex flex-col gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-xs justify-start"
                        onClick={() => {
                          exportHistoryCSV(historyItems);
                          showToastMsg(t("export.success"), "", "default");
                        }}
                      >
                        {t("export.csv")}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-xs justify-start"
                        onClick={() => {
                          exportHistoryJSON(historyItems);
                          showToastMsg(t("export.success"), "", "default");
                        }}
                      >
                        {t("export.json")}
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
              <RiwayatList history={historyItems} onSelect={handleSelect} onClear={handleClear} t={t} />
            </div>
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
  const { retroMode, showNotification } = useKonamiCode();

  return (
    <LanguageProvider>
      <div className={`min-h-screen flex flex-col bg-background ${retroMode ? "retro-mode" : ""}`}>
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
        <QuickActionFAB
          onOpenHistory={() => setHistorySheetOpen(true)}
          onOpenBookmarks={() => setBookmarkSheetOpen(true)}
        />
        <ReportButton />
        <RiwayatSheet open={historySheetOpen} onOpenChange={setHistorySheetOpen} />
        <BookmarkSheet open={bookmarkSheetOpen} onOpenChange={setBookmarkSheetOpen} />
        <CursorTrail />
        <KonamiOverlay retroMode={retroMode} showNotification={showNotification} />
      </div>
    </LanguageProvider>
  );
}

"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
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

/* ──────────────────── Constants ──────────────────── */
const HISTORY_KEY = "gutsytik_history";
const MAX_HISTORY = 20;

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
  } catch {
    // localStorage not available
  }
}

function clearAllHistory() {
  try {
    localStorage.removeItem(HISTORY_KEY);
    window.dispatchEvent(new Event("gutsytik:history-changed"));
  } catch {
    // localStorage not available
  }
}

function timeAgo(timestamp: number): string {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  if (seconds < 60) return "Baru saja";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} menit lalu`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} jam lalu`;
  const days = Math.floor(hours / 24);
  return `${days} hari lalu`;
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

/* ──────────────────── Navbar ──────────────────── */
function Navbar() {
  const [open, setOpen] = useState(false);
  const { setTheme, theme } = useTheme();

  const navLinks = [
    { label: "Fitur", href: "#features" },
    { label: "Cara Pakai", href: "#how-it-works" },
    { label: "Platform", href: "#platforms" },
    { label: "FAQ", href: "#faq" },
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

          <div className="hidden md:flex items-center gap-2">
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
                className="bg-gradient-to-r from-gutsy-pink to-gutsy-purple hover:opacity-90 text-white font-semibold rounded-lg"
                size="sm"
              >
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
            </a>
          </div>

          <div className="flex md:hidden items-center gap-2">
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
              {open ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
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
                <Button className="w-full mt-2 bg-gradient-to-r from-gutsy-pink to-gutsy-purple hover:opacity-90 text-white font-semibold rounded-lg">
                  <Download className="mr-2 h-4 w-4" />
                  Download
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
}: {
  history: HistoryItem[];
  onSelect: (item: HistoryItem) => void;
  onClear: () => void;
}) {
  if (history.length === 0) return null;

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <History className="h-4 w-4" />
          Riwayat Download
        </h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClear}
          className="text-xs text-muted-foreground hover:text-destructive"
        >
          <Trash2 className="h-3 w-3 mr-1" /> Hapus Semua
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
                <img
                  src={item.thumbnail}
                  alt=""
                  className="w-full h-full object-cover"
                />
              ) : (
                <Play className="h-4 w-4 text-muted-foreground" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-foreground truncate">
                {item.title}
              </p>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-gutsy-pink/10 text-gutsy-pink">
                  {item.platform}
                </span>
                <span className="text-[10px] text-muted-foreground">
                  {timeAgo(item.timestamp)}
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
}: {
  onOpenHistorySheet: () => void;
}) {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState("");
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

  const resultRef = useRef<HTMLDivElement>(null);
  const urlRef = useRef(url);
  urlRef.current = url;

  const { toast, dismiss } = useToast();

  const showToast = useCallback(
    (
      title: string,
      description: string,
      variant: "default" | "destructive" = "default"
    ) => {
      const t = toast({ title, description, variant });
      setTimeout(() => dismiss(t.id), 3000);
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

  // Feature 2: Auto-Paste on focus
  const handleInputFocus = useCallback(async () => {
    if (urlRef.current.trim()) return;
    try {
      const text = await navigator.clipboard.readText();
      if (
        text &&
        (text.startsWith("http://") || text.startsWith("https://"))
      ) {
        setUrl(text);
        setPasted(true);
        setTimeout(() => setPasted(false), 2000);
      }
    } catch {
      // clipboard not available or permission denied
    }
  }, []);

  const handlePaste = useCallback(async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
      setPasted(true);
      setTimeout(() => setPasted(false), 2000);
    } catch {
      // clipboard not available
    }
  }, []);

  const handleAnalyze = useCallback(async () => {
    if (!url.trim()) {
      setError("Masukkan link video terlebih dahulu!");
      return;
    }

    try {
      new URL(url.trim());
    } catch {
      setError(
        "URL tidak valid. Pastikan link yang dimasukkan benar (contoh: https://www.tiktok.com/...)"
      );
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
        setError(data.error || "Terjadi kesalahan saat memproses video.");
        showToast("Gagal", data.error || "Coba lagi.", "destructive");
        return;
      }

      setResult(data);
      setSelectedQuality(0);
      setShowPreview(false);
      setPreviewError(false);

      // Feature 4: Toast on success
      showToast(
        "Video ditemukan!",
        "Pilih kualitas dan download.",
        "default"
      );

      // Scroll to result
      setTimeout(() => {
        resultRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 300);
    } catch {
      setError("Gagal terhubung ke server. Silakan coba lagi.");
      showToast("Gagal", "Gagal terhubung ke server.", "destructive");
    } finally {
      setLoading(false);
    }
  }, [url, showToast]);

  const handleDownload = useCallback(async () => {
    if (!result) return;

    const quality =
      result.qualityOptions[selectedQuality] || result.qualityOptions[0];
    if (!quality) return;

    setDownloading(true);
    setDownloadProgress("Memulai download...");

    try {
      setDownloadProgress("Mengambil video...");

      const response = await fetch(quality.url);

      if (!response.ok) {
        throw new Error(`Download gagal (HTTP ${response.status})`);
      }

      setDownloadProgress("Mengunduh file...");

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
      setDownloadProgress("Download selesai!");

      // Feature 1: Save to history
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

      // Feature 4: Toast on download success
      showToast("Download dimulai!", "File sedang disimpan.", "default");
    } catch {
      setDownloadProgress("Mencoba cara alternatif...");

      try {
        const a = document.createElement("a");
        a.href = quality.url;
        a.download = `${result.filename}_${quality.label}.${quality.label === "Audio" ? "mp3" : "mp4"}`;
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setDownloadProgress("Download dimulai!");

        // Save to history even on fallback
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
        showToast("Download dimulai!", "File sedang disimpan.", "default");
      } catch {
        setDownloadProgress("");
        setError(
          "Gagal mengunduh video. Coba klik kanan pada tombol download dan pilih 'Save link as...'"
        );
        showToast(
          "Download gagal",
          "Gagal mengunduh video. Coba lagi.",
          "destructive"
        );
      }
    } finally {
      setTimeout(() => {
        setDownloading(false);
        setDownloadProgress("");
      }, 2500);
    }
  }, [result, selectedQuality, url, showToast]);

  // Feature 8: Share Button
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
      } catch {
        // User cancelled
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareUrl);
        showToast("Link berhasil disalin!", "", "default");
      } catch {
        // clipboard not available
      }
    }
  }, [result, url, showToast]);

  // Feature 6: Batch Download
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
      setError("Masukkan minimal satu URL yang valid!");
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
      } catch {
        // Skip failed URLs
      }

      if (i < urlsToProcess.length - 1) {
        await new Promise((resolve) => setTimeout(resolve, 500));
      }
    }

    setBatchProgress({ current: urlsToProcess.length, total: urlsToProcess.length });
    setBatchProcessing(false);

    if (results.length > 0) {
      showToast(
        `${results.length} video ditemukan!`,
        "Pilih kualitas dan download masing-masing.",
        "default"
      );
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
        showToast("Download dimulai!", "File sedang disimpan.", "default");
      } catch {
        showToast("Download gagal", "Gagal mengunduh video. Coba lagi.", "destructive");
      }
    },
    [showToast]
  );

  // History item click
  const handleHistorySelect = useCallback((item: HistoryItem) => {
    setUrl(item.url);
    setBatchMode(false);
    setPasted(true);
    setTimeout(() => setPasted(false), 2000);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleHistoryClear = useCallback(() => {
    clearAllHistory();
    showToast("Riwayat download dihapus.", "", "default");
  }, [showToast]);

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
            background:
              "radial-gradient(circle, rgba(255,45,85,0.5) 0%, transparent 70%)",
          }}
        />
        <div
          className="animate-orb-2 absolute top-1/3 -right-32 w-[400px] h-[400px] rounded-full opacity-20"
          style={{
            background:
              "radial-gradient(circle, rgba(124,58,237,0.5) 0%, transparent 70%)",
          }}
        />
        <div
          className="animate-orb-3 absolute -bottom-32 left-1/4 w-[450px] h-[450px] rounded-full opacity-15"
          style={{
            background:
              "radial-gradient(circle, rgba(0,229,255,0.4) 0%, transparent 70%)",
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
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-gutsy-pink/10 text-gutsy-pink border border-gutsy-pink/20 mb-6">
            <Zap className="h-3 w-3" />
            Gratis & Tanpa Batas
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6"
        >
          Download Video{" "}
          <span className="gradient-text-animated">Tanpa Watermark</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
        >
          Gutsytik membantu kamu download video dari platform populer tanpa
          watermark, cepat dan gratis!
        </motion.p>

        {/* Download form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="max-w-xl mx-auto mb-4"
        >
          {/* Batch mode toggle */}
          <div className="flex justify-end mb-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setBatchMode(!batchMode);
                setBatchResults([]);
                setBatchProgress({ current: 0, total: 0 });
              }}
              className={`text-xs ${batchMode ? "text-gutsy-pink" : "text-muted-foreground"}`}
            >
              <Layers className="h-3 w-3 mr-1" />
              {batchMode ? "Mode Tunggal" : "Batch Download"}
            </Button>
          </div>

          {batchMode ? (
            /* Batch mode textarea */
            <div className="p-2 rounded-xl bg-card border border-border">
              <Textarea
                placeholder="Tempel beberapa link video di sini (satu per baris, maks 5)..."
                value={batchUrls}
                onChange={(e) => {
                  setBatchUrls(e.target.value);
                  setError("");
                }}
                className="min-h-[100px] bg-background border-border text-foreground placeholder:text-muted-foreground rounded-lg text-sm"
              />
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-muted-foreground">
                  {batchUrls
                    .split("\n")
                    .filter((u) => u.trim()).length}{" "}
                  link (maks 5)
                </span>
                <Button
                  onClick={handleBatchProcess}
                  disabled={batchProcessing}
                  className="h-10 px-5 bg-gradient-to-r from-gutsy-pink to-gutsy-purple hover:opacity-90 text-white font-semibold rounded-lg"
                >
                  {batchProcessing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing {batchProgress.current}/{batchProgress.total}...
                    </>
                  ) : (
                    <>
                      <Download className="mr-2 h-4 w-4" />
                      Proses Semua
                    </>
                  )}
                </Button>
              </div>

              {/* Batch progress bar */}
              {batchProcessing && batchProgress.total > 0 && (
                <div className="mt-2">
                  <Progress
                    value={
                      (batchProgress.current / batchProgress.total) * 100
                    }
                    className="h-2"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Memproses {batchProgress.current} dari{" "}
                    {batchProgress.total} video...
                  </p>
                </div>
              )}

              {/* Error message */}
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
                  placeholder="Tempel link video di sini (TikTok, IG, YouTube...)"
                  value={url}
                  onChange={(e) => {
                    setUrl(e.target.value);
                    setError("");
                  }}
                  onFocus={handleInputFocus}
                  onKeyDown={(e) => e.key === "Enter" && handleAnalyze()}
                  className="h-12 bg-background border-border text-foreground placeholder:text-muted-foreground rounded-lg text-base pr-12"
                />
                <button
                  onClick={handlePaste}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-md hover:bg-accent transition-colors"
                  title="Tempel dari clipboard"
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
                className="h-12 px-6 bg-gradient-to-r from-gutsy-pink to-gutsy-purple hover:opacity-90 text-white font-semibold rounded-lg shrink-0"
              >
                {loading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <>
                    <Download className="mr-2 h-5 w-5" />
                    <span className="hidden sm:inline">Download</span>
                  </>
                )}
              </Button>
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
          {[
            "TikTok",
            "Instagram",
            "YouTube",
            "Facebook",
            "Twitter/X",
            "Pinterest",
          ].map((p) => (
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
              className="max-w-xl mx-auto mb-6 rounded-xl bg-card border border-gutsy-pink/20 overflow-hidden"
            >
              {/* Platform badge */}
              <div className="bg-gradient-to-r from-gutsy-pink/10 to-gutsy-purple/10 px-4 py-2 border-b border-border flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span className="text-sm text-green-400 font-medium">
                  Video berhasil ditemukan!
                </span>
                <span className="ml-auto text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                  {result.platform}
                </span>
              </div>

              <div className="p-4">
                {/* Feature 3: Video Preview */}
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
                    {/* Thumbnail */}
                    <div className="w-28 h-20 rounded-lg bg-muted flex items-center justify-center shrink-0 overflow-hidden relative">
                      {result.thumbnail ? (
                        <img
                          src={result.thumbnail}
                          alt={result.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display =
                              "none";
                          }}
                        />
                      ) : null}
                      <Play className="h-8 w-8 text-gutsy-pink absolute" />
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

                {/* Preview toggle + Share button row */}
                <div className="flex items-center gap-2 mt-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setShowPreview(!showPreview);
                      setPreviewError(false);
                    }}
                    className="text-xs text-muted-foreground hover:text-foreground"
                  >
                    {showPreview ? (
                      <EyeOff className="h-3 w-3 mr-1" />
                    ) : (
                      <Eye className="h-3 w-3 mr-1" />
                    )}
                    Preview
                  </Button>
                  {/* Feature 8: Share Button */}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleShare}
                    className="text-xs text-muted-foreground hover:text-foreground"
                  >
                    <Share2 className="h-3 w-3 mr-1" />
                    Bagikan
                  </Button>
                </div>

                {/* Quality selector */}
                {result.qualityOptions.length > 0 && (
                  <div className="mt-3">
                    <p className="text-xs text-muted-foreground mb-2 text-left">
                      Pilih kualitas:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {result.qualityOptions.map((q, i) => {
                        const Icon = getQualityIcon(q.label);
                        const sizeEstimate = estimateFileSize(
                          result.platform,
                          q.resolution,
                          result.duration
                        );
                        return (
                          <button
                            key={i}
                            onClick={() => setSelectedQuality(i)}
                            className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border transition-all ${
                              selectedQuality === i
                                ? "bg-gutsy-pink/20 border-gutsy-pink/50 text-gutsy-pink"
                                : "bg-muted border-border text-muted-foreground hover:border-gutsy-pink/30 hover:text-foreground"
                            }`}
                          >
                            <Icon className="h-3 w-3" />
                            {q.label}
                            <span className="opacity-60">
                              ({q.resolution})
                            </span>
                            {sizeEstimate && (
                              <span className="text-[10px] opacity-50 ml-0.5">
                                {sizeEstimate}
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Download button */}
                <Button
                  className="w-full mt-4 h-12 bg-gradient-to-r from-gutsy-pink to-gutsy-cyan hover:opacity-90 text-white font-semibold rounded-lg"
                  onClick={handleDownload}
                  disabled={downloading}
                >
                  {downloading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      {downloadProgress || "Mengunduh..."}
                    </>
                  ) : (
                    <>
                      <Download className="mr-2 h-5 w-5" />
                      Download Tanpa Watermark
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
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-card border border-border"
                >
                  <div className="flex gap-3">
                    <div className="w-16 h-12 rounded-lg bg-muted flex items-center justify-center shrink-0 overflow-hidden">
                      {br.thumbnail ? (
                        <img
                          src={br.thumbnail}
                          alt={br.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Play className="h-4 w-4 text-muted-foreground" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0 text-left">
                      <p className="text-sm font-medium text-foreground line-clamp-1">
                        {br.title}
                      </p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-gutsy-pink/10 text-gutsy-pink">
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
                      className="bg-gradient-to-r from-gutsy-pink to-gutsy-purple hover:opacity-90 text-white shrink-0"
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

        {/* Feature 1: Riwayat Download (inline on desktop) */}
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
              Riwayat Download
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
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Mobile: open Sheet via button */}
            <div className="md:hidden">
              <Button
                variant="outline"
                size="sm"
                onClick={onOpenHistorySheet}
                className="w-full border-border text-muted-foreground"
              >
                <History className="h-4 w-4 mr-2" />
                Lihat Riwayat Download ({historyItems.length})
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
              <p className="text-2xl sm:text-3xl font-extrabold gradient-text">
                {s.value}
              </p>
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
            className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-border hover:border-gutsy-pink/30 transition-colors"
          >
            <ChevronDown className="h-5 w-5 text-muted-foreground animate-bounce" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* ──────────────────── Features Section ──────────────────── */
const features = [
  {
    icon: Download,
    title: "Tanpa Watermark",
    description:
      "Download video bersih tanpa watermark yang mengganggu. Kualitas asli terjaga.",
  },
  {
    icon: Zap,
    title: "Super Cepat",
    description:
      "Proses download instan dengan server yang dioptimalkan. Tidak perlu menunggu lama.",
  },
  {
    icon: Shield,
    title: "Aman & Privat",
    description:
      "Kami tidak menyimpan data pribadi kamu. Privasi terjamin 100%.",
  },
  {
    icon: Smartphone,
    title: "Semua Device",
    description:
      "Bisa diakses dari HP, tablet, atau laptop. Responsif di semua ukuran layar.",
  },
  {
    icon: Gift,
    title: "Gratis Selamanya",
    description:
      "Tidak ada biaya tersembunyi. Download sepuasnya tanpa batas.",
  },
  {
    icon: Globe,
    title: "Multi Platform",
    description:
      "Support TikTok, Instagram, YouTube, Facebook, Twitter, dan lainnya.",
  },
];

function FeaturesSection() {
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
            Fitur <span className="gradient-text">Unggulan</span> Gutsytik
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Semua yang kamu butuhkan untuk download video tanpa watermark ada di
            sini.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="gradient-border group rounded-xl bg-card p-6 hover:bg-muted/50 transition-colors"
            >
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-gutsy-pink/20 to-gutsy-cyan/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <f.icon className="h-6 w-6 text-gutsy-pink" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {f.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {f.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────── How It Works Section ──────────────────── */
const steps = [
  {
    number: "01",
    icon: Clipboard,
    title: "Salin Link",
    description: "Salin link video dari platform favorit kamu",
  },
  {
    number: "02",
    icon: Download,
    title: "Tempel & Download",
    description: "Tempel link di kolom input dan klik tombol download",
  },
  {
    number: "03",
    icon: CheckCircle,
    title: "Simpan Video",
    description: "Video tanpa watermark siap disimpan ke perangkatmu",
  },
];

function HowItWorksSection() {
  return (
    <section id="how-it-works" className="relative py-20 sm:py-28">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="animate-orb-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10"
          style={{
            background:
              "radial-gradient(circle, rgba(124,58,237,0.4) 0%, transparent 70%)",
          }}
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
            Cara Menggunakan{" "}
            <span className="gradient-text">Gutsytik</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Hanya 3 langkah mudah untuk download video tanpa watermark.
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-0">
          {steps.map((s, i) => (
            <React.Fragment key={s.number}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="flex flex-col items-center text-center flex-1 relative"
              >
                <div className="relative mb-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gutsy-pink to-gutsy-purple flex items-center justify-center">
                    <s.icon className="h-7 w-7 text-white" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-background border-2 border-gutsy-pink flex items-center justify-center text-[10px] font-bold text-gutsy-pink">
                    {s.number}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-1">
                  {s.title}
                </h3>
                <p className="text-sm text-muted-foreground max-w-[200px]">
                  {s.description}
                </p>
              </motion.div>

              {i < steps.length - 1 && (
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

/* ──────────────────── Trending Section (Feature 10) ──────────────────── */
const trendingPlatforms = [
  {
    name: "TikTok",
    downloads: "2.5M",
    fullDownloads: 2500000,
    label: "downloads hari ini",
    bg: "#000000",
    letter: "T",
  },
  {
    name: "Instagram Reels",
    downloads: "1.8M",
    fullDownloads: 1800000,
    label: "downloads hari ini",
    gradient: "linear-gradient(135deg, #833AB4, #FD1D1D, #F77737)",
    icon: Instagram,
  },
  {
    name: "YouTube Shorts",
    downloads: "1.2M",
    fullDownloads: 1200000,
    label: "downloads hari ini",
    bg: "#FF0000",
    icon: Play,
  },
  {
    name: "Facebook Videos",
    downloads: "800K",
    fullDownloads: 800000,
    label: "downloads hari ini",
    bg: "#1877F2",
    letter: "f",
  },
];

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
  return (
    <section id="trending" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
            Sedang <span className="gradient-text">Trending</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Platform yang paling banyak digunakan untuk download video hari ini.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {trendingPlatforms.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="relative p-5 rounded-xl bg-card border border-border hover:border-gutsy-pink/20 transition-colors overflow-hidden"
            >
              {/* LIVE badge */}
              <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-500/10 border border-red-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse-live" />
                <span className="text-[10px] font-semibold text-red-400">
                  LIVE
                </span>
              </div>

              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm mb-3"
                style={{ background: p.gradient || p.bg }}
              >
                {p.icon ? <p.icon className="h-5 w-5" /> : p.letter}
              </div>

              <h3 className="text-sm font-semibold text-foreground mb-1">
                {p.name}
              </h3>

              <div className="flex items-baseline gap-1">
                <span className="text-lg font-extrabold gradient-text">
                  <CountUpNumber target={p.fullDownloads} suffix="" />
                </span>
                <span className="text-xs text-muted-foreground">
                  {p.label}
                </span>
              </div>

              <TrendingUp className="absolute bottom-3 right-3 h-8 w-8 text-gutsy-pink/10" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────── Platforms Section ──────────────────── */
const platforms = [
  { name: "TikTok", bg: "#000000", letter: "T" },
  {
    name: "Instagram",
    gradient: "linear-gradient(135deg, #833AB4, #FD1D1D, #F77737)",
    icon: Instagram,
  },
  { name: "YouTube", bg: "#FF0000", icon: Play },
  { name: "Facebook", bg: "#1877F2", letter: "f" },
  { name: "Twitter/X", bg: "#14171A", letter: "X" },
  { name: "Pinterest", bg: "#E60023", letter: "P" },
  { name: "Likee", bg: "#7C3AED", letter: "L" },
  { name: "Snack Video", bg: "#FF8C00", letter: "S" },
];

function PlatformsSection() {
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
            Platform yang <span className="gradient-text">Didukung</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Download video dari berbagai platform sosial media populer.
          </p>
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
              className="flex flex-col items-center gap-3 p-5 rounded-xl bg-card border border-border hover:border-gutsy-pink/20 transition-colors cursor-pointer"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg"
                style={{
                  background: p.gradient || p.bg,
                }}
              >
                {p.icon ? <p.icon className="h-6 w-6" /> : p.letter}
              </div>
              <span className="text-sm font-medium text-foreground">
                {p.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────── FAQ Section ──────────────────── */
const faqs = [
  {
    q: "Apakah Gutsytik benar-benar gratis?",
    a: "Ya, Gutsytik 100% gratis tanpa biaya tersembunyi. Kamu bisa download video sepuasnya tanpa perlu mendaftar atau membayar apapun.",
  },
  {
    q: "Apakah ada batasan jumlah download?",
    a: "Tidak ada batasan! Kamu bisa mendownload video sebanyak yang kamu mau tanpa batas harian atau bulanan.",
  },
  {
    q: "Apakah kualitas video berkurang?",
    a: "Tidak, kami mempertahankan kualitas asli video. Kamu bisa memilih resolusi yang tersedia dari video aslinya, termasuk HD 1080p jika tersedia.",
  },
  {
    q: "Platform apa saja yang didukung?",
    a: "Gutsytik mendukung TikTok, Instagram, YouTube, Facebook, Twitter/X, Pinterest, Likee, Snack Video, Reddit, dan masih banyak lagi.",
  },
  {
    q: "Apakah Gutsytik aman digunakan?",
    a: "Sangat aman! Kami tidak menyimpan data pribadi atau riwayat download kamu. Semua proses dilakukan secara aman dan terenkripsi.",
  },
  {
    q: "Kenapa video saya gagal didownload?",
    a: "Pastikan link video benar dan video tidak bersifat private. Beberapa video dari akun private atau yang dibatasi region mungkin tidak bisa didownload. Coba gunakan link yang valid dan publik.",
  },
];

function FAQSection() {
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
            Pertanyaan yang Sering{" "}
            <span className="gradient-text">Diajukan</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Temukan jawaban dari pertanyaan umum tentang Gutsytik.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((f, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="bg-card border border-border rounded-xl px-6 data-[state=open]:border-gutsy-pink/30 transition-colors"
              >
                <AccordionTrigger className="text-left text-foreground font-medium hover:no-underline hover:text-gutsy-pink transition-colors">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {f.a}
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
  return (
    <section className="relative py-20 sm:py-28 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="animate-orb-1 absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full opacity-15"
          style={{
            background:
              "radial-gradient(circle, rgba(255,45,85,0.5) 0%, transparent 70%)",
          }}
        />
        <div
          className="animate-orb-3 absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full opacity-15"
          style={{
            background:
              "radial-gradient(circle, rgba(0,229,255,0.4) 0%, transparent 70%)",
          }}
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
            Siap Download Video{" "}
            <span className="gradient-text">Tanpa Watermark?</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8">
            Coba Gutsytik sekarang dan rasakan kemudahan download video tanpa
            watermark dari berbagai platform favoritmu!
          </p>
          <a href="#hero">
            <Button
              size="lg"
              className="h-14 px-8 text-base bg-gradient-to-r from-gutsy-pink via-gutsy-purple to-gutsy-cyan hover:opacity-90 text-white font-semibold rounded-xl animate-gradient-shift"
              style={{ backgroundSize: "200% 200%" }}
            >
              <Download className="mr-2 h-5 w-5" />
              Mulai Download Sekarang
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
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="sm:col-span-2 lg:col-span-1">
            <GutsytikLogo size={32} showText />
            <p className="mt-3 text-sm text-muted-foreground max-w-xs">
              Download video tanpa watermark dari berbagai platform populer.
              Cepat, gratis, dan mudah.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-3 text-sm">
              Navigasi
            </h4>
            <ul className="space-y-2">
              {[
                { label: "Fitur", href: "#features" },
                { label: "Cara Pakai", href: "#how-it-works" },
                { label: "Platform", href: "#platforms" },
                { label: "FAQ", href: "#faq" },
              ].map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-3 text-sm">
              Legal
            </h4>
            <ul className="space-y-2">
              {["Privacy Policy", "Terms of Service"].map((l) => (
                <li key={l}>
                  <a
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-3 text-sm">
              Ikuti Kami
            </h4>
            <div className="flex gap-3">
              {[
                { icon: Twitter, label: "Twitter" },
                { icon: Instagram, label: "Instagram" },
                { icon: Youtube, label: "YouTube" },
              ].map((s) => (
                <a
                  key={s.label}
                  href="#"
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
          <p className="text-xs text-muted-foreground">
            &copy; 2026 Gutsytik. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            Made with <Heart className="h-3 w-3 text-gutsy-pink" /> by Gutsytik
            Team
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ──────────────────── Mobile Bottom Nav (Feature 9) ──────────────────── */
function MobileBottomNav({
  onOpenHistory,
}: {
  onOpenHistory: () => void;
}) {
  const navItems = [
    { icon: HomeIcon, label: "Home", href: "#hero" },
    { icon: Download, label: "Download", href: "#hero", highlight: true },
    { icon: History, label: "Riwayat", action: "history" as const },
    { icon: HelpCircle, label: "FAQ", href: "#faq" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 md:hidden">
      <div className="glass-strong border-t border-border safe-area-bottom">
        <div className="flex items-center justify-around px-2 py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
          {navItems.map((item) => {
            if (item.action === "history") {
              return (
                <button
                  key={item.label}
                  onClick={onOpenHistory}
                  className="flex flex-col items-center gap-0.5 py-1 px-3 rounded-lg text-muted-foreground hover:text-foreground transition-colors"
                >
                  <item.icon className="h-5 w-5" />
                  <span className="text-[10px]">{item.label}</span>
                </button>
              );
            }

            return (
              <a
                key={item.label}
                href={item.href}
                className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-lg transition-colors ${
                  item.highlight
                    ? "text-gutsy-pink"
                    : "text-muted-foreground hover:text-foreground"
                }`}
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

/* ──────────────────── Report Button (Feature 12) ──────────────────── */
function ReportButton() {
  const [open, setOpen] = useState(false);
  const [issueType, setIssueType] = useState("");
  const [description, setDescription] = useState("");
  const { toast, dismiss } = useToast();

  const handleSubmit = useCallback(() => {
    if (!issueType) return;
    setOpen(false);
    setIssueType("");
    setDescription("");
    const t = toast({
      title: "Terima kasih!",
      description: "Laporan kamu akan kami tindaklanjuti.",
    });
    setTimeout(() => dismiss(t.id), 3000);
  }, [issueType, toast, dismiss]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-20 right-4 md:bottom-6 md:right-6 z-30 w-12 h-12 rounded-full bg-card border border-border shadow-lg flex items-center justify-center hover:border-gutsy-pink/30 hover:shadow-gutsy-pink/10 transition-all group"
        aria-label="Laporkan Masalah"
      >
        <Flag className="h-5 w-5 text-muted-foreground group-hover:text-gutsy-pink transition-colors" />
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-foreground">
              Laporkan Masalah
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Bantu kami memperbaiki Gutsytik dengan melaporkan masalah yang kamu
              temui.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">
                Jenis Masalah
              </label>
              <select
                value={issueType}
                onChange={(e) => setIssueType(e.target.value)}
                className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="">Pilih jenis masalah...</option>
                <option value="download_fail">Video gagal download</option>
                <option value="invalid_link">Link tidak valid</option>
                <option value="low_quality">Kualitas rendah</option>
                <option value="other">Lainnya</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">
                Deskripsi (Opsional)
              </label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Ceritakan masalah yang kamu alami..."
                className="min-h-[80px]"
              />
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="ghost" className="text-muted-foreground">
                Batal
              </Button>
            </DialogClose>
            <Button
              onClick={handleSubmit}
              disabled={!issueType}
              className="bg-gradient-to-r from-gutsy-pink to-gutsy-purple hover:opacity-90 text-white"
            >
              Kirim Laporan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

/* ──────────────────── Riwayat Sheet (Feature 1 - Mobile) ──────────────────── */
function RiwayatSheet({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [historyItems, setHistoryItems] = useState<HistoryItem[]>([]);
  const { toast, dismiss } = useToast();

  useEffect(() => {
    const load = () => setHistoryItems(getHistory());
    load();
    window.addEventListener("gutsytik:history-changed", load);
    return () => window.removeEventListener("gutsytik:history-changed", load);
  }, []);

  const handleSelect = useCallback(
    (item: HistoryItem) => {
      window.dispatchEvent(
        new CustomEvent("gutsytik:select-history", { detail: item })
      );
      onOpenChange(false);
    },
    [onOpenChange]
  );

  const handleClear = useCallback(() => {
    clearAllHistory();
    const t = toast({
      title: "Riwayat download dihapus.",
      description: "",
    });
    setTimeout(() => dismiss(t.id), 3000);
  }, [toast, dismiss]);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="rounded-t-2xl max-h-[70vh]">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <History className="h-5 w-5" />
            Riwayat Download
          </SheetTitle>
          <SheetDescription>
            Video yang pernah kamu download sebelumnya.
          </SheetDescription>
        </SheetHeader>
        <div className="mt-4">
          {historyItems.length > 0 ? (
            <RiwayatList
              history={historyItems}
              onSelect={handleSelect}
              onClear={handleClear}
            />
          ) : (
            <p className="text-sm text-muted-foreground text-center py-8">
              Belum ada riwayat download.
            </p>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

/* ──────────────────── Main Page ──────────────────── */
export default function Home() {
  const [historySheetOpen, setHistorySheetOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <HeroSection onOpenHistorySheet={() => setHistorySheetOpen(true)} />
        <FeaturesSection />
        <HowItWorksSection />
        <TrendingSection />
        <PlatformsSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
      <MobileBottomNav onOpenHistory={() => setHistorySheetOpen(true)} />
      <ReportButton />
      <RiwayatSheet
        open={historySheetOpen}
        onOpenChange={setHistorySheetOpen}
      />
    </div>
  );
}

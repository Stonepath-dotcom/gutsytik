"use client";

import React, { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  ExternalLink,
  ArrowRight,
  Heart,
  Twitter,
  Instagram,
  Youtube,
  AlertCircle,
  Film,
  Music,
  FileVideo,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { GutsytikLogo } from "@/components/gutsytik-logo";

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

/* ──────────────────── Navbar ──────────────────── */
function Navbar() {
  const [open, setOpen] = useState(false);

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
                className="px-3 py-2 text-sm font-medium text-gutsy-text-secondary hover:text-white transition-colors rounded-md hover:bg-white/5"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <a href="#hero" className="hidden md:inline-flex">
            <Button
              className="bg-gradient-to-r from-gutsy-pink to-gutsy-purple hover:opacity-90 text-white font-semibold rounded-lg"
              size="sm"
            >
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
          </a>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-md hover:bg-white/5 transition-colors"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden overflow-hidden glass-strong border-t border-white/5"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block px-3 py-2 text-sm font-medium text-gutsy-text-secondary hover:text-white transition-colors rounded-md hover:bg-white/5"
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

/* ──────────────────── Hero Section ──────────────────── */
function HeroSection() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState("");
  const [result, setResult] = useState<DownloadResult | null>(null);
  const [error, setError] = useState("");
  const [pasted, setPasted] = useState(false);
  const [selectedQuality, setSelectedQuality] = useState<number>(0);
  const resultRef = useRef<HTMLDivElement>(null);

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
      setError("URL tidak valid. Pastikan link yang dimasukkan benar (contoh: https://www.tiktok.com/...)");
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
        return;
      }

      setResult(data);
      setSelectedQuality(0);

      // Scroll to result
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 300);
    } catch {
      setError("Gagal terhubung ke server. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  }, [url]);

  const handleDownload = useCallback(async () => {
    if (!result) return;

    const quality = result.qualityOptions[selectedQuality] || result.qualityOptions[0];
    if (!quality) return;

    setDownloading(true);
    setDownloadProgress("Memulai download...");

    try {
      // Try fetching through the proxy for a proper file download
      setDownloadProgress("Mengambil video...");

      const response = await fetch(quality.url);

      if (!response.ok) {
        throw new Error(`Download gagal (HTTP ${response.status})`);
      }

      const contentLength = response.headers.get("content-length");
      const totalBytes = contentLength ? parseInt(contentLength, 10) : 0;

      setDownloadProgress(totalBytes > 0 ? "Mengunduh file..." : "Mengunduh file...");

      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);

      // Determine file extension
      const isAudio = quality.label === "Audio" || quality.resolution === "MP3";
      const ext = isAudio ? "mp3" : "mp4";
      const fileName = `${result.filename}_${quality.label}.${ext}`;

      // Create a hidden anchor element and trigger download
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      // Clean up blob URL
      setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
      setDownloadProgress("Download selesai!");
    } catch {
      setDownloadProgress("Mencoba cara alternatif...");

      // Fallback: Try opening the proxy URL directly as a download link
      try {
        // Create a temporary link with download attribute
        const a = document.createElement("a");
        a.href = quality.url;
        a.download = `${result.filename}_${quality.label}.${quality.label === "Audio" ? "mp3" : "mp4"}`;
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setDownloadProgress("Download dimulai!");
      } catch {
        setDownloadProgress("");
        setError("Gagal mengunduh video. Coba klik kanan pada tombol download dan pilih 'Save link as...'");
      }
    } finally {
      setTimeout(() => {
        setDownloading(false);
        setDownloadProgress("");
      }, 2500);
    }
  }, [result, selectedQuality]);

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
          className="text-lg sm:text-xl text-gutsy-text-secondary max-w-2xl mx-auto mb-10"
        >
          Gutsytik membantu kamu download video dari platform populer tanpa
          watermark, cepat dan gratis!
        </motion.p>

        {/* Download form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="max-w-xl mx-auto mb-6"
        >
          <div className="flex gap-2 p-2 rounded-xl bg-gutsy-card border border-white/8">
            <div className="relative flex-1">
              <Input
                type="url"
                placeholder="Tempel link video di sini (TikTok, IG, YouTube...)"
                value={url}
                onChange={(e) => {
                  setUrl(e.target.value);
                  setError("");
                }}
                onKeyDown={(e) => e.key === "Enter" && handleAnalyze()}
                className="h-12 bg-gutsy-surface border-white/8 text-white placeholder:text-gutsy-text-secondary rounded-lg text-base pr-12"
              />
              <button
                onClick={handlePaste}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-md hover:bg-white/5 transition-colors"
                title="Tempel dari clipboard"
              >
                {pasted ? (
                  <CheckCircle className="h-4 w-4 text-green-400" />
                ) : (
                  <Clipboard className="h-4 w-4 text-gutsy-text-secondary" />
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

          {/* Error message */}
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
              className="text-[11px] px-2.5 py-1 rounded-full bg-gutsy-surface/50 text-gutsy-text-secondary border border-white/5"
            >
              {p}
            </span>
          ))}
        </motion.div>

        {/* Result card */}
        <AnimatePresence>
          {result && (
            <motion.div
              ref={resultRef}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="max-w-xl mx-auto mb-10 rounded-xl bg-gutsy-card border border-gutsy-pink/20 overflow-hidden"
            >
              {/* Platform badge */}
              <div className="bg-gradient-to-r from-gutsy-pink/10 to-gutsy-purple/10 px-4 py-2 border-b border-white/5 flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span className="text-sm text-green-400 font-medium">Video berhasil ditemukan!</span>
                <span className="ml-auto text-xs text-gutsy-text-secondary bg-gutsy-surface px-2 py-0.5 rounded-full">
                  {result.platform}
                </span>
              </div>

              <div className="p-4">
                <div className="flex gap-4">
                  {/* Thumbnail */}
                  <div className="w-28 h-20 rounded-lg bg-gutsy-surface flex items-center justify-center shrink-0 overflow-hidden relative">
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
                    <Play className="h-8 w-8 text-gutsy-pink absolute" />
                  </div>
                  <div className="flex-1 text-left min-w-0">
                    <h3 className="font-semibold text-white text-sm line-clamp-2">
                      {result.title}
                    </h3>
                    <div className="flex items-center gap-3 mt-1 text-xs text-gutsy-text-secondary">
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

                {/* Quality selector */}
                {result.qualityOptions.length > 0 && (
                  <div className="mt-4">
                    <p className="text-xs text-gutsy-text-secondary mb-2 text-left">Pilih kualitas:</p>
                    <div className="flex flex-wrap gap-2">
                      {result.qualityOptions.map((q, i) => {
                        const Icon = getQualityIcon(q.label);
                        return (
                          <button
                            key={i}
                            onClick={() => setSelectedQuality(i)}
                            className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border transition-all ${
                              selectedQuality === i
                                ? "bg-gutsy-pink/20 border-gutsy-pink/50 text-gutsy-pink"
                                : "bg-gutsy-surface border-white/5 text-gutsy-text-secondary hover:border-white/15 hover:text-white"
                            }`}
                          >
                            <Icon className="h-3 w-3" />
                            {q.label}
                            <span className="opacity-60">({q.resolution})</span>
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
              <p className="text-xs text-gutsy-text-secondary mt-1">
                {s.label}
              </p>
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
            className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-white/10 hover:border-white/20 transition-colors"
          >
            <ChevronDown className="h-5 w-5 text-gutsy-text-secondary animate-bounce" />
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
          <p className="text-gutsy-text-secondary max-w-xl mx-auto">
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
              className="gradient-border group rounded-xl bg-gutsy-card p-6 hover:bg-gutsy-surface/50 transition-colors"
            >
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-gutsy-pink/20 to-gutsy-cyan/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <f.icon className="h-6 w-6 text-gutsy-pink" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {f.title}
              </h3>
              <p className="text-sm text-gutsy-text-secondary leading-relaxed">
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
          <p className="text-gutsy-text-secondary max-w-xl mx-auto">
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
                  <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-gutsy-dark border-2 border-gutsy-pink flex items-center justify-center text-[10px] font-bold text-gutsy-pink">
                    {s.number}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-1">
                  {s.title}
                </h3>
                <p className="text-sm text-gutsy-text-secondary max-w-[200px]">
                  {s.description}
                </p>
              </motion.div>

              {i < steps.length - 1 && (
                <div className="hidden md:flex items-center self-start mt-8 flex-1">
                  <div className="w-full border-t-2 border-dashed border-white/10" />
                </div>
              )}
            </React.Fragment>
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
            Platform yang{" "}
            <span className="gradient-text">Didukung</span>
          </h2>
          <p className="text-gutsy-text-secondary max-w-xl mx-auto">
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
              className="flex flex-col items-center gap-3 p-5 rounded-xl bg-gutsy-card border border-white/5 hover:border-white/15 transition-colors cursor-pointer"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg"
                style={{
                  background: p.gradient || p.bg,
                }}
              >
                {p.icon ? <p.icon className="h-6 w-6" /> : p.letter}
              </div>
              <span className="text-sm font-medium text-white">{p.name}</span>
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
          <p className="text-gutsy-text-secondary max-w-xl mx-auto">
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
                className="bg-gutsy-card border border-white/5 rounded-xl px-6 data-[state=open]:border-gutsy-pink/30 transition-colors"
              >
                <AccordionTrigger className="text-left text-white font-medium hover:no-underline hover:text-gutsy-pink transition-colors">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-gutsy-text-secondary leading-relaxed">
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
          <p className="text-gutsy-text-secondary max-w-xl mx-auto mb-8">
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
    <footer className="border-t border-white/5 bg-gutsy-dark">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="sm:col-span-2 lg:col-span-1">
            <GutsytikLogo size={32} showText />
            <p className="mt-3 text-sm text-gutsy-text-secondary max-w-xs">
              Download video tanpa watermark dari berbagai platform populer.
              Cepat, gratis, dan mudah.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-3 text-sm">
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
                    className="text-sm text-gutsy-text-secondary hover:text-white transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-3 text-sm">Legal</h4>
            <ul className="space-y-2">
              {["Privacy Policy", "Terms of Service"].map((l) => (
                <li key={l}>
                  <a
                    href="#"
                    className="text-sm text-gutsy-text-secondary hover:text-white transition-colors"
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-3 text-sm">
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
                  className="w-10 h-10 rounded-lg bg-gutsy-surface flex items-center justify-center hover:bg-gutsy-pink/20 hover:text-gutsy-pink transition-colors text-gutsy-text-secondary"
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gutsy-text-secondary">
            &copy; 2026 Gutsytik. All rights reserved.
          </p>
          <p className="text-xs text-gutsy-text-secondary flex items-center gap-1">
            Made with <Heart className="h-3 w-3 text-gutsy-pink" /> by Gutsytik
            Team
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ──────────────────── Main Page ──────────────────── */
export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gutsy-dark">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <PlatformsSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}

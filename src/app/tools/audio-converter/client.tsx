"use client";

import React, { useState, useCallback, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Music,
  Download,
  Link as LinkIcon,
  Clipboard,
  Loader2,
  AlertCircle,
  CheckCircle2,
  ChevronRight,
  Home,
  Headphones,
  Zap,
  Shield,
  FileAudio,
  Clock,
  Play,
  ArrowRightLeft,
  HardDrive,
  Scissors,
  Info,
} from "lucide-react";
import { MovaLogo } from "@/components/mova-logo";
import { SitewideFooter } from "@/components/sitewide-footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useToast } from "@/hooks/use-toast";

/* ──────── Types ──────── */
interface QualityOption {
  label: string;
  resolution: string;
  url: string;
  originalUrl?: string;
}

interface DownloadResult {
  title: string;
  thumbnail: string;
  duration: string;
  author: string;
  platform: string;
  downloadUrl: string;
  originalDownloadUrl?: string;
  qualityOptions: QualityOption[];
  filename: string;
  isRedirect?: boolean;
  redirectUrls?: string[];
}

/* ──────── FAQ Data ──────── */
const FAQS = [
  {
    q: "Bagaimana cara mengkonversi video ke MP3 di Mova?",
    a: "Caranya sangat mudah: 1) Salin link video dari TikTok, Instagram, YouTube, atau platform lainnya. 2) Tempel link tersebut ke kolom input di halaman ini. 3) Klik tombol Konversi, lalu pilih kualitas audio yang diinginkan dan klik Download. Seluruh proses hanya membutuhkan beberapa detik.",
  },
  {
    q: "Apakah Audio Converter Mova gratis?",
    a: "Ya, sepenuhnya gratis tanpa batas! Kamu tidak perlu mendaftar, login, atau membayar apapun. Konversi video ke MP3 bisa dilakukan sebanyak apapun tanpa biaya.",
  },
  {
    q: "Format audio apa saja yang didukung?",
    a: "Mova mendukung ekstraksi audio dalam format MP3 dan M4A dengan berbagai kualitas bitrate. Kualitas audio yang tersedia tergantung pada sumber video aslinya — semakin tinggi kualitas audio di video asli, semakin baik hasil konversinya.",
  },
  {
    q: "Bisa konversi video dari platform apa saja?",
    a: "Mova mendukung konversi audio dari berbagai platform populer termasuk TikTok, Instagram, YouTube, Facebook, Twitter/X, Pinterest, Reddit, dan Telegram. Cukup tempel link dari platform manapun dan Mova akan memprosesnya.",
  },
  {
    q: "Apakah kualitas audio hasil konversi bagus?",
    a: "Ya, Mova mengekstrak audio dengan kualitas tertinggi yang tersedia dari video sumber. Untuk video dengan audio berkualitas tinggi, hasil konversi MP3 bisa mencapai bitrate 320kbps yang setara dengan kualitas audio streaming premium.",
  },
  {
    q: "Apakah perlu install aplikasi untuk konversi video ke MP3?",
    a: "Tidak perlu! Mova Audio Converter berjalan langsung di browser, baik di HP maupun komputer. Tidak perlu download atau install software apapun. Cukup buka halaman ini, tempel link, dan konversi.",
  },
  {
    q: "Apa bedanya download MP3 dan download video MP4?",
    a: "File MP3 hanya berisi audio tanpa video, sehingga ukurannya jauh lebih kecil. Cocok untuk menyimpan lagu, podcast, atau audiobook. File MP4 berisi video lengkap beserta audionya. Pilih MP3 jika kamu hanya butuh audionya saja untuk menghemat ruang penyimpanan.",
  },
];

/* ──────── Supported Platforms ──────── */
const PLATFORMS = [
  { name: "TikTok", href: "/tiktok-downloader", desc: "Video & Musik" },
  { name: "Instagram", href: "/instagram-downloader", desc: "Reels & Story" },
  { name: "YouTube", href: "/youtube-downloader", desc: "Video & MP3" },
  { name: "Facebook", href: "/facebook-downloader", desc: "Video HD" },
  { name: "Twitter/X", href: "/twitter-downloader", desc: "Video & Audio" },
  { name: "Pinterest", href: "/pinterest-downloader", desc: "Video & Gambar" },
  { name: "Reddit", href: "/reddit-downloader", desc: "Video HD" },
  { name: "Telegram", href: "/telegram-downloader", desc: "Video Cepat" },
];

/* ──────── Client Component ──────── */
export function AudioConverterClient() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DownloadResult | null>(null);
  const [error, setError] = useState("");
  const [downloading, setDownloading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState("");
  const resultRef = useRef<HTMLDivElement>(null);
  const { toast, dismiss } = useToast();

  const showToast = useCallback(
    (
      title: string,
      desc: string,
      variant: "default" | "destructive" = "default"
    ) => {
      const { id } = toast({ title, description: desc, variant });
      setTimeout(() => dismiss(id), 3000);
    },
    [toast, dismiss]
  );

  const handleAnalyze = useCallback(async () => {
    const trimmed = url.trim();
    if (!trimmed) {
      setError("Masukkan link video terlebih dahulu!");
      return;
    }
    try {
      new URL(trimmed.startsWith("www.") ? "https://" + trimmed : trimmed);
    } catch {
      setError("URL tidak valid. Pastikan link yang dimasukkan benar.");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);
    setLoadingMsg("Mencari audio...");

    const msgs = ["Mencari audio...", "Mengekstrak audio...", "Hampir selesai..."];
    let msgIdx = 0;
    const msgInterval = setInterval(() => {
      msgIdx = Math.min(msgIdx + 1, msgs.length - 1);
      setLoadingMsg(msgs[msgIdx]);
    }, 4000);

    try {
      const res = await fetch("/api/download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: trimmed, audioMode: true }),
      });
      const data = await res.json();
      if (res.ok && data.qualityOptions?.length > 0) {
        setResult(data);
        showToast("Audio ditemukan!", "Pilih kualitas dan download MP3.");
        setTimeout(
          () =>
            resultRef.current?.scrollIntoView({
              behavior: "smooth",
              block: "center",
            }),
          300
        );
      } else {
        setError(
          data.error ||
            "Gagal menemukan audio dari link tersebut. Coba link lain."
        );
      }
    } catch {
      setError("Gagal terhubung ke server. Silakan coba lagi.");
    } finally {
      clearInterval(msgInterval);
      setLoading(false);
      setLoadingMsg("");
    }
  }, [url, showToast]);

  const handleDownload = useCallback(
    async (qualityIndex: number) => {
      if (!result || downloading) return;
      const q = result.qualityOptions[qualityIndex];
      if (!q) {
        showToast("Gagal mengunduh audio.", "", "destructive");
        return;
      }

      // If this is a redirect fallback, open external download service in new tab
      if (result.isRedirect) {
        window.open(q.url || result.downloadUrl, "_blank", "noopener,noreferrer");
        return;
      }

      const isAudio =
        q.resolution === "MP3" ||
        q.resolution === "M4A" ||
        q.label.includes("Audio") ||
        q.label.includes("MP3");
      const ext = q.resolution === "M4A" ? ".m4a" : ".mp3";
      const downloadName =
        (result.filename || `mova_audio_${Date.now()}`) +
        `_${q.label.replace(/[^a-zA-Z0-9]/g, "_")}${ext}`;
      const downloadUrl = q.url;

      setDownloading(true);

      // === YOUTUBE DOWNLOADS (via /api/yt-download) ===
      if (downloadUrl.startsWith("/api/yt-download")) {
        try {
          showToast("Memulai download...", "Mohon tunggu sebentar.");
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
              setTimeout(() => URL.revokeObjectURL(blobUrl), 30000);
              showToast("Download dimulai!", "File audio sedang disimpan.");
              setDownloading(false);
              return;
            }
          }
          // Fallback
          window.location.href = downloadUrl;
          showToast("Download dimulai!", "");
          setDownloading(false);
          return;
        } catch {
          try {
            window.location.href = downloadUrl;
          } catch {
            showToast("Gagal mengunduh audio. Coba lagi.", "", "destructive");
          }
          setDownloading(false);
          return;
        }
      }

      // === NON-YOUTUBE DOWNLOADS ===
      // Strategy 1: fetch + blob for audio/proxy URLs
      if (isAudio || downloadUrl.startsWith("/api/proxy")) {
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
              showToast("Download dimulai!", "File audio sedang disimpan.");
              setDownloading(false);
              return;
            }
          }
        } catch {}
      }

      // Strategy 2: <a> tag with download attribute
      try {
        const a = document.createElement("a");
        a.href = downloadUrl;
        a.download = downloadName;
        a.style.display = "none";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        showToast("Download dimulai!", "");
      } catch {
        const fallbackUrl = q.originalUrl || downloadUrl;
        try {
          window.open(fallbackUrl, "_blank");
        } catch {
          showToast(
            "Gagal mengunduh audio. Coba klik kanan pada tombol download dan pilih 'Save link as...'",
            "",
            "destructive"
          );
        }
      } finally {
        setDownloading(false);
      }
    },
    [result, downloading, showToast]
  );

  const handlePaste = useCallback(async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
    } catch {}
  }, []);

  // Filter quality options to only show audio options
  const audioOptions = result
    ? result.qualityOptions.filter(
        (q) =>
          q.resolution === "MP3" ||
          q.resolution === "M4A" ||
          q.label.includes("Audio") ||
          q.label.includes("MP3") ||
          q.label.toLowerCase().includes("audio")
      )
    : [];

  // If no specific audio options found, show all options with a note
  const hasAudioOptions = audioOptions.length > 0;
  const displayOptions = hasAudioOptions
    ? audioOptions
    : result?.qualityOptions || [];

  return (
    <div className="min-h-screen flex flex-col bg-card text-foreground">
      {/* ───── Header ───── */}
      <header className="border-b border-border bg-card">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-4">
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
        {/* ───── Breadcrumb ───── */}
        <div className="mx-auto max-w-5xl px-4 pt-6">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-[#E52222] transition-colors">
                  Beranda
                </Link>
              </li>
              <li>
                <ChevronRight className="h-3.5 w-3.5" />
              </li>
              <li>
                <Link href="/tools" className="hover:text-[#E52222] transition-colors">
                  Tools
                </Link>
              </li>
              <li>
                <ChevronRight className="h-3.5 w-3.5" />
              </li>
              <li className="text-[#E52222] font-medium">Audio Converter</li>
            </ol>
          </nav>
        </div>

        {/* ───── Hero Section ───── */}
        <section className="relative pt-8 pb-10 px-4 sm:px-6">
          <div className="absolute inset-0 bg-gradient-to-b from-[#ECFDF5] via-[#D1FAE5] to-background dark:from-[#064E3B] dark:via-[#022C22] opacity-50" />
          <div className="relative mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E52222]/10 border border-[#E52222]/20 mb-4">
              <Music className="h-3.5 w-3.5 text-[#E52222]" />
              <span className="text-xs font-semibold text-[#E52222]">
                Audio Converter
              </span>
            </div>
            <h1
              className="text-3xl sm:text-4xl font-extrabold mb-3 leading-tight font-[family-name:var(--font-montserrat)]"
            >
              Konversi Video ke{" "}
              <span className="gradient-text">Audio MP3</span>
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Ekstrak audio MP3 dari video TikTok, Instagram, YouTube, dan
              platform lainnya. Gratis, cepat, tanpa batas!
            </p>
          </div>
        </section>

        {/* ───── URL Input Section ───── */}
        <section className="px-4 sm:px-6 pb-10">
          <div className="mx-auto max-w-4xl">
            <div className="bg-card border border-border rounded-2xl p-5 sm:p-6 shadow-sm">
              <h2
                className="text-base font-bold text-foreground mb-4 font-[family-name:var(--font-montserrat)]"
              >
                <LinkIcon className="h-4 w-4 inline mr-1.5 text-[#E52222]" />
                Tempel Link Video
              </h2>
              <div className="flex items-center gap-2">
                <div className="flex-1 relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2">
                    <Music className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <Input
                    value={url}
                    onChange={(e) => {
                      setUrl(e.target.value);
                      if (error) setError("");
                    }}
                    onKeyDown={(e) => e.key === "Enter" && handleAnalyze()}
                    placeholder="Tempel link video TikTok, Instagram, YouTube, dll..."
                    className="h-11 bg-background border-border rounded-xl text-sm md:text-base pl-10 pr-4"
                    aria-label="URL video untuk dikonversi ke audio"
                    inputMode="url"
                  />
                </div>
                <Button
                  variant="outline"
                  onClick={handlePaste}
                  className="h-11 px-3 rounded-xl shrink-0 text-sm"
                  aria-label="Tempel dari clipboard"
                >
                  <Clipboard className="h-4 w-4 sm:mr-1.5" />
                  <span className="hidden sm:inline">Tempel</span>
                </Button>
                <Button
                  onClick={handleAnalyze}
                  disabled={loading}
                  className="h-11 px-5 bg-[#E52222] text-white font-semibold rounded-xl hover:bg-[#C91C1C] shrink-0 text-sm md:text-base"
                >
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Music className="h-4 w-4 sm:mr-1.5" />
                  )}
                  <span className="hidden sm:inline">
                    {loading ? "Memproses..." : "Konversi"}
                  </span>
                </Button>
              </div>

              {/* Loading indicator */}
              {loading && !error && (
                <div className="mt-4 p-3 rounded-lg bg-[#E52222]/10 border border-[#E52222]/20 flex items-center gap-2">
                  <Loader2 className="h-4 w-4 text-[#E52222] animate-spin shrink-0" />
                  <p className="text-[#E52222] text-sm font-medium">
                    {loadingMsg || "Memproses..."}
                  </p>
                </div>
              )}

              {/* Error */}
              {error && (
                <div className="mt-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 text-red-400 mt-0.5 shrink-0" />
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ───── Result Card ───── */}
        {result && (
          <section className="px-4 sm:px-6 pb-10">
            <div ref={resultRef} className="mx-auto max-w-4xl">
              <div
                className="rounded-2xl bg-card border overflow-hidden"
                style={{ borderColor: "#E5222230" }}
              >
                {/* Result header */}
                <div
                  className="px-4 py-2.5 border-b border-border flex items-center gap-2"
                  style={{
                    background:
                      "linear-gradient(to right, #E5222215, #FF6B3515)",
                  }}
                >
                  <CheckCircle2 className="h-4 w-4 text-green-400" />
                  <span className="text-sm text-green-400 font-medium">
                    Audio ditemukan!
                  </span>
                  <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full ml-auto">
                    {result.platform}
                  </span>
                </div>

                <div className="p-4 sm:p-5">
                  {/* Video info */}
                  <div className="flex gap-3 mb-4">
                    <div className="w-24 h-16 rounded-lg bg-muted flex items-center justify-center shrink-0 overflow-hidden relative">
                      {result.thumbnail && (
                        <Image
                          src={result.thumbnail}
                          alt={`Thumbnail: ${result.title}`}
                          width={96}
                          height={64}
                          className="w-full h-full object-cover"
                          unoptimized
                          loading="lazy"
                        />
                      )}
                      <Music className="h-6 w-6 absolute text-[#E52222]" />
                    </div>
                    <div className="flex-1 text-left min-w-0">
                      <h3 className="font-semibold text-foreground text-sm md:text-base line-clamp-2">
                        {result.title}
                      </h3>
                      <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                        {result.duration !== "--:--" && (
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {result.duration}
                          </span>
                        )}
                        {result.author && <span>{result.author}</span>}
                      </div>
                    </div>
                  </div>

                  {/* No audio options notice */}
                  {!hasAudioOptions && displayOptions.length > 0 && (
                    <div className="mb-4 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-start gap-2">
                      <Info className="h-4 w-4 text-amber-400 mt-0.5 shrink-0" />
                      <p className="text-amber-400 text-xs md:text-sm">
                        Format audio khusus (MP3/M4A) tidak tersedia langsung
                        dari sumber ini. Kamu bisa download video-nya lalu
                        konversi secara manual, atau coba kualitas di bawah ini.
                      </p>
                    </div>
                  )}

                  {/* Redirect notice */}
                  {result.isRedirect && (
                    <div className="mb-4 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-start gap-2">
                      <AlertCircle className="h-4 w-4 text-amber-400 mt-0.5 shrink-0" />
                      <p className="text-amber-400 text-xs md:text-sm">
                        Download langsung sedang tidak tersedia. Klik tombol
                        download untuk mengunduh melalui layanan pihak ketiga.
                      </p>
                    </div>
                  )}

                  {/* Audio quality options */}
                  {displayOptions.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-xs md:text-sm text-muted-foreground font-medium">
                        <Headphones className="h-3.5 w-3.5 inline mr-1 text-[#E52222]" />
                        Pilih Kualitas Audio:
                      </p>
                      <div className="grid gap-2 sm:grid-cols-2">
                        {displayOptions.map((q, i) => {
                          const isAudio =
                            q.resolution === "MP3" ||
                            q.resolution === "M4A" ||
                            q.label.includes("Audio") ||
                            q.label.includes("MP3");
                          return (
                            <div
                              key={i}
                              className="flex items-center gap-3 p-3 rounded-xl border border-border bg-background hover:border-[#E52222]/30 transition-all group"
                            >
                              <div
                                className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                                  isAudio
                                    ? "bg-[#E52222]/10"
                                    : "bg-muted"
                                }`}
                              >
                                {isAudio ? (
                                  <Music className="h-4 w-4 text-[#E52222]" />
                                ) : (
                                  <Play className="h-4 w-4 text-muted-foreground" />
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-foreground">
                                  {q.label}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {q.resolution}
                                </p>
                              </div>
                              <Button
                                size="sm"
                                onClick={() => handleDownload(i)}
                                disabled={downloading}
                                className="h-8 px-3 bg-[#E52222] text-white font-semibold rounded-lg hover:bg-[#C91C1C] text-xs shrink-0"
                              >
                                {downloading ? (
                                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                ) : (
                                  <Download className="h-3.5 w-3.5 mr-1" />
                                )}
                                {downloading ? "..." : "Download"}
                              </Button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ───── How It Works ───── */}
        <section className="px-4 sm:px-6 pb-10">
          <div className="mx-auto max-w-4xl">
            <h2
              className="text-lg font-bold text-foreground mb-6 font-[family-name:var(--font-montserrat)]"
            >
              Cara{" "}
              <span className="gradient-text">Menggunakan</span>
            </h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                {
                  step: "1",
                  title: "Salin Link Video",
                  desc: "Buka video di TikTok, Instagram, YouTube, atau platform lain, lalu salin link-nya.",
                },
                {
                  step: "2",
                  title: "Tempel & Konversi",
                  desc: "Tempel link video ke kolom input di atas, lalu klik tombol Konversi untuk mengekstrak audio.",
                },
                {
                  step: "3",
                  title: "Download MP3",
                  desc: "Pilih kualitas audio yang diinginkan dan klik Download. File MP3 langsung tersimpan!",
                },
              ].map((s) => (
                <div
                  key={s.step}
                  className="p-5 rounded-2xl bg-card border border-border text-center"
                >
                  <div className="w-10 h-10 rounded-full bg-[#E52222]/10 text-[#E52222] font-bold flex items-center justify-center mx-auto mb-3">
                    {s.step}
                  </div>
                  <h3 className="font-bold text-foreground text-sm mb-1.5">
                    {s.title}
                  </h3>
                  <p className="text-xs text-muted-foreground">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ───── Features ───── */}
        <section className="px-4 sm:px-6 pb-10">
          <div className="mx-auto max-w-4xl">
            <h2
              className="text-lg font-bold text-foreground mb-6 font-[family-name:var(--font-montserrat)]"
            >
              Kenapa Pakai{" "}
              <span className="gradient-text">Mova Audio Converter</span>
            </h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                {
                  icon: Zap,
                  title: "Cepat & Gratis",
                  desc: "Ekstrak audio dari video hanya dalam hitungan detik. Sepenuhnya gratis tanpa batas penggunaan.",
                },
                {
                  icon: Headphones,
                  title: "Kualitas Tinggi",
                  desc: "Dapatkan audio MP3 dengan bitrate terbaik dari sumber video asli, hingga 320kbps.",
                },
                {
                  icon: Shield,
                  title: "Aman & Privat",
                  desc: "Tidak ada data yang disimpan di server. Proses konversi berjalan aman tanpa malware.",
                },
                {
                  icon: FileAudio,
                  title: "Multi-Platform",
                  desc: "Support TikTok, Instagram, YouTube, Facebook, Twitter/X, Pinterest, Reddit, dan Telegram.",
                },
              ].map((feat) => {
                const Icon = feat.icon;
                return (
                  <div
                    key={feat.title}
                    className="flex items-start gap-3 p-4 rounded-xl bg-card border border-border hover:border-[#E52222]/30 transition-all"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[#E52222]/10 flex items-center justify-center shrink-0">
                      <Icon className="h-5 w-5 text-[#E52222]" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground mb-1">
                        {feat.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {feat.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ───── Supported Platforms ───── */}
        <section className="px-4 sm:px-6 pb-10">
          <div className="mx-auto max-w-4xl">
            <h2
              className="text-lg font-bold text-foreground mb-6 font-[family-name:var(--font-montserrat)]"
            >
              Platform{" "}
              <span className="gradient-text">yang Didukung</span>
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {PLATFORMS.map((p) => (
                <Link
                  key={p.href}
                  href={p.href}
                  className="p-4 rounded-xl bg-card border border-border hover:border-[#E52222]/30 transition-all group text-center"
                >
                  <p className="text-sm font-semibold text-foreground group-hover:text-[#E52222] transition-colors mb-1">
                    {p.name}
                  </p>
                  <p className="text-xs text-muted-foreground">{p.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ───── FAQ ───── */}
        <section className="px-4 sm:px-6 pb-10">
          <div className="mx-auto max-w-4xl">
            <h2
              className="text-lg font-bold text-foreground mb-6 font-[family-name:var(--font-montserrat)]"
            >
              Pertanyaan{" "}
              <span className="gradient-text">Umum</span>
            </h2>
            <Accordion type="single" collapsible className="w-full space-y-2">
              {FAQS.map((item, i) => (
                <AccordionItem
                  key={i}
                  value={`audio-faq-${i}`}
                  className="bg-card border border-border rounded-lg px-4 data-[state=open]:shadow-sm data-[state=open]:border-[#E52222]/30"
                >
                  <AccordionTrigger className="text-sm text-foreground text-left hover:no-underline py-3">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground pb-3 leading-relaxed">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* ───── CTA ───── */}
        <section className="px-4 sm:px-6 pb-10">
          <div className="mx-auto max-w-3xl">
            <div className="rounded-2xl p-6 text-center bg-gradient-to-br from-[#E52222]/20 to-[#FF6B35]/10 border border-[#E52222]/30">
              <h2
                className="text-xl font-bold text-foreground mb-2 font-[family-name:var(--font-montserrat)]"
              >
                Siap Konversi Video ke MP3?
              </h2>
              <p className="text-muted-foreground mb-5 text-sm max-w-md mx-auto">
                Tempel link video dari platform manapun dan langsung ekstrak
                audionya. Gratis dan cepat!
              </p>
              <button
                onClick={() => {
                  const input = document.querySelector('input[inputmode="url"]');
                  if (input) (input as HTMLElement).focus();
                  else window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 bg-[#E52222] text-white font-semibold rounded-xl hover:bg-[#C91C1C] px-8 h-12 text-base transition-colors"
              >
                <Music className="h-5 w-5" /> Mulai Konversi Audio
              </button>
            </div>
          </div>
        </section>

        {/* ───── Related Tools ───── */}
        <section className="px-4 sm:px-6 pb-16">
          <div className="mx-auto max-w-4xl">
            <h2
              className="text-lg font-bold text-foreground mb-4 font-[family-name:var(--font-montserrat)]"
            >
              Tools{" "}
              <span className="gradient-text">Lainnya</span>
            </h2>
            <div className="grid sm:grid-cols-3 gap-3">
              <Link
                href="/tools/bitrate-calculator"
                className="p-4 rounded-xl bg-card border border-border hover:border-[#E52222]/30 transition-all group"
              >
                <Headphones className="h-5 w-5 text-[#E52222] mb-2" />
                <p className="text-sm font-semibold text-foreground group-hover:text-[#E52222] transition-colors">
                  Kalkulator Bitrate
                </p>
                <p className="text-xs text-muted-foreground">
                  Hitung ukuran file audio
                </p>
              </Link>
              <Link
                href="/tools/format-comparison"
                className="p-4 rounded-xl bg-card border border-border hover:border-[#E52222]/30 transition-all group"
              >
                <ArrowRightLeft className="h-5 w-5 text-[#E52222] mb-2" />
                <p className="text-sm font-semibold text-foreground group-hover:text-[#E52222] transition-colors">
                  Perbandingan Format
                </p>
                <p className="text-xs text-muted-foreground">
                  Bandingkan MP4, WEBM, dll
                </p>
              </Link>
              <Link
                href="/tools/trim-video"
                className="p-4 rounded-xl bg-card border border-border hover:border-[#E52222]/30 transition-all group"
              >
                <Scissors className="h-5 w-5 text-[#E52222] mb-2" />
                <p className="text-sm font-semibold text-foreground group-hover:text-[#E52222] transition-colors">
                  Trim Video
                </p>
                <p className="text-xs text-muted-foreground">
                  Potong bagian video
                </p>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SitewideFooter />
    </div>
  );
}

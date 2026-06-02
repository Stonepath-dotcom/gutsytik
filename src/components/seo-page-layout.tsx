"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import { useTheme } from "next-themes";
import {
  Download, Menu, X, Sun, Moon, Loader2, AlertCircle,
  Link as LinkIcon, Play, Headphones, Check, ArrowUp, ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { SitewideFooter } from "@/components/sitewide-footer";
import Image from "next/image";

function MovaLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none" aria-hidden="true">
      <rect width="32" height="32" rx="8" className="fill-primary" />
      <path d="M8 22V10l4 6 4-6v12" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M22 22V10" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M18 10h8" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="22" cy="18" r="2.5" stroke="white" strokeWidth="1.8" />
    </svg>
  );
}

interface QualityOption { label: string; resolution: string; url: string; originalUrl?: string }
interface DownloadResult {
  title: string; thumbnail: string; duration: string;
  author: string; platform: string; downloadUrl: string;
  qualityOptions: QualityOption[]; filename: string;
  isRedirect?: boolean; redirectUrls?: string[];
}

interface SEOPageLayoutProps {
  title: string;
  description: string;
  platform: string;
  audioMode?: boolean;
  placeholder?: string;
  children: React.ReactNode;
}

export default function SEOPageLayout({ title, description, platform, audioMode: initialAudioMode, placeholder, children }: SEOPageLayoutProps) {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { toast } = useToast();
  const [menuOpen, setMenuOpen] = useState(false);
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DownloadResult | null>(null);
  const [error, setError] = useState("");
  const [selQuality, setSelQuality] = useState(0);
  const [downloading, setDownloading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState("");
  const [resultVisible, setResultVisible] = useState(false);
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [mode, setMode] = useState<"video" | "audio">(initialAudioMode ? "audio" : "video");
  const resultRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const h = () => setShowTopBtn(window.scrollY > 400);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const h = (e: MouseEvent | TouchEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false);
    };
    document.addEventListener("mousedown", h);
    document.addEventListener("touchstart", h);
    return () => { document.removeEventListener("mousedown", h); document.removeEventListener("touchstart", h); };
  }, [menuOpen]);

  useEffect(() => {
    if (result) {
      setResultVisible(false);
      requestAnimationFrame(() => requestAnimationFrame(() => setResultVisible(true)));
    } else setResultVisible(false);
  }, [result]);

  const handleAnalyze = useCallback(async () => {
    const trimmed = url.trim();
    if (!trimmed) { setError("Masukkan link video terlebih dahulu."); return; }
    try { new URL(trimmed.startsWith("www.") ? "https://" + trimmed : trimmed); }
    catch { setError("URL tidak valid. Periksa kembali linknya."); return; }

    setLoading(true); setError(""); setResult(null);
    setLoadingMsg(mode === "audio" ? "Mencari audio..." : "Mencari video...");
    const msgs = mode === "audio"
      ? ["Mencari audio...", "Mengambil link audio...", "Hampir selesai..."]
      : ["Mencari video...", "Mengambil link download...", "Hampir selesai..."];
    let mi = 0;
    const iv = setInterval(() => { mi = Math.min(mi + 1, msgs.length - 1); setLoadingMsg(msgs[mi]); }, 4000);

    try {
      const res = await fetch("/api/download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: trimmed, audioMode: mode === "audio" }),
      });
      const data = await res.json();
      if (res.ok && data.qualityOptions?.length > 0) {
        setResult(data); setSelQuality(0);
        setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 300);
      } else setError(data.error || "Gagal menemukan video. Coba link lain.");
    } catch { setError("Gagal terhubung ke server."); }
    finally { clearInterval(iv); setLoading(false); setLoadingMsg(""); }
  }, [url, mode]);

  const handleDownload = useCallback(async () => {
    if (!result || downloading) return;
    const q = result.qualityOptions[selQuality];
    if (!q) return;

    // If this is a redirect fallback, open external download service in new tab
    if (result.isRedirect) {
      window.open(q.url || result.downloadUrl, "_blank", "noopener,noreferrer");
      return;
    }

    const isAudio = q.resolution === "MP3" || q.label.includes("Audio");
    const ext = isAudio ? ".mp3" : ".mp4";
    const name = (result.filename || `mova_${Date.now()}`) + `_${q.label.replace(/[^a-zA-Z0-9]/g, "_")}${ext}`;
    const downloadUrl = q.url;
    setDownloading(true);

    // === YOUTUBE DOWNLOADS (via /api/yt-download → CF Worker redirect) ===
    if (downloadUrl.startsWith("/api/yt-download")) {
      try {
        const res = await fetch(downloadUrl);
        if (res.ok) {
          const contentLength = parseInt(res.headers.get("content-length") || "0");
          const sizeMB = contentLength / (1024 * 1024);

          // For audio or files under 80MB: use blob download (most reliable on mobile)
          if (isAudio || sizeMB < 80 || contentLength === 0) {
            const blob = await res.blob();
            if (blob.size > 1000) {
              const blobUrl = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = blobUrl;
              a.download = name;
              a.style.display = "none";
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
              setTimeout(() => URL.revokeObjectURL(blobUrl), 30000);
              toast({ title: "Download dimulai!", description: `${isAudio ? "Audio" : "Video"} ${q.label} sedang disimpan.` });
              setDownloading(false);
              return;
            }
          }
          // For large video files (>80MB): use window.location.href
          window.location.href = downloadUrl;
          toast({ title: "Download dimulai!", description: "File besar sedang diunduh." });
          setDownloading(false);
          return;
        } else {
          let errorMsg = "Gagal mengunduh video. Coba lagi nanti.";
          try { const errData = await res.json(); if (errData.error) errorMsg = errData.error; } catch {}
          toast({ title: "Download gagal", description: errorMsg, variant: "destructive" });
          setDownloading(false);
          return;
        }
      } catch {
        // Fallback: navigate directly
        try { window.location.href = downloadUrl; } catch {}
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
          const contentLength = parseInt(res.headers.get("content-length") || "0");
          const sizeMB = contentLength / (1024 * 1024);
          if (isAudio || sizeMB < 50 || contentLength === 0) {
            const blob = await res.blob();
            if (blob.size > 1000) {
              const blobUrl = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = blobUrl; a.download = name;
              a.style.display = "none";
              document.body.appendChild(a); a.click(); document.body.removeChild(a);
              setTimeout(() => URL.revokeObjectURL(blobUrl), 10000);
              toast({ title: "Download dimulai!", description: `${isAudio ? "Audio" : "Video"} ${q.label} sedang diunduh.` });
              setDownloading(false);
              return;
            }
          }
        }
      } catch {}
    }

    // Strategy 2: <a> tag with download attribute
    try {
      const a = document.createElement("a");
      a.href = downloadUrl; a.download = name;
      a.style.display = "none"; document.body.appendChild(a); a.click(); document.body.removeChild(a);
      toast({ title: "Download dimulai!", description: `${isAudio ? "Audio" : "Video"} ${q.label} sedang diunduh.` });
    } catch { window.open(q.originalUrl || downloadUrl, "_blank"); }
    finally { setDownloading(false); }
  }, [result, selQuality, downloading, toast]);

  const handlePaste = useCallback(async () => {
    try { const text = await navigator.clipboard.readText(); setUrl(text); inputRef.current?.focus(); } catch {}
  }, []);

  const navItems = [
    { label: "Beranda", href: "/" },
    { label: "TikTok", href: "/tiktok-downloader" },
    { label: "Instagram", href: "/instagram-downloader" },
    { label: "Facebook", href: "/facebook-downloader" },
    { label: "Twitter/X", href: "/twitter-downloader" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-md" role="banner">
        <div className="mx-auto max-w-3xl h-12 md:h-16 flex items-center justify-between px-4">
          <a href="/" className="flex items-center gap-2" aria-label="getmova Beranda">
            <MovaLogo className="h-7 w-7" />
            <span className="font-bold text-lg text-foreground tracking-tight">getmova</span>
          </a>
          <nav className="hidden md:flex items-center gap-4" aria-label="Navigasi utama">
            {navItems.map(item => (
              <a key={item.href} href={item.href} className={`text-sm md:text-base transition-colors ${item.href === `/${platform.toLowerCase().replace(' ','-')}-downloader` || (item.href === '/youtube-mp3' && platform === 'YouTube MP3') ? 'text-foreground font-medium' : 'text-muted-foreground hover:text-foreground'}`}>{item.label}</a>
            ))}
          </nav>
          <div className="flex items-center gap-1">
            <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="p-2 text-muted-foreground hover:text-foreground transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg hover:bg-muted/50" aria-label="Ganti tema">
              {mounted ? (theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />) : <Sun className="h-4 w-4" />}
            </button>
            <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg hover:bg-muted/50" aria-label="Menu">
              {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <div ref={menuRef} className="md:hidden border-t border-border px-4 py-2 space-y-0.5 bg-background/95 backdrop-blur-md">
            {navItems.map(item => (
              <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)} className="block py-3 text-sm text-muted-foreground hover:text-foreground min-h-[44px] flex items-center rounded-lg px-2 hover:bg-muted/50">{item.label}</a>
            ))}
          </div>
        )}
      </header>

      <main className="flex-1" role="main">
        {/* Hero with Download Tool */}
        <section className="relative px-4 pt-10 md:pt-20 pb-8 md:pb-16 overflow-hidden">
          <div className="absolute inset-0 -z-10 hero-dots" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-primary/5 dark:bg-primary/8 rounded-full blur-3xl -z-10" />
          <div className="mx-auto max-w-md md:max-w-2xl text-center relative">
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-foreground mb-2 tracking-tight leading-tight">{title}</h1>
            <p className="text-sm md:text-lg text-muted-foreground mb-5 leading-relaxed max-w-sm mx-auto">{description}</p>

            <div className="bg-card border border-border rounded-lg p-3 sm:p-4 md:p-6 shadow-sm">
              <div className="flex bg-muted rounded-md p-1 mb-3" role="tablist" aria-label="Pilih mode download">
                <button onClick={() => setMode("video")} role="tab" aria-selected={mode === "video"} className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-sm md:text-base font-medium rounded-md transition-all min-h-[40px] ${mode === "video" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}>
                  <Play className="h-3.5 w-3.5" /> Video
                </button>
                <button onClick={() => setMode("audio")} role="tab" aria-selected={mode === "audio"} className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-sm md:text-base font-medium rounded-md transition-all min-h-[40px] ${mode === "audio" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}>
                  <Headphones className="h-3.5 w-3.5" /> Audio MP3
                </button>
              </div>
              <Input ref={inputRef} value={url} onChange={e => { setUrl(e.target.value); if (error) setError(""); }} onKeyDown={e => e.key === "Enter" && handleAnalyze()} placeholder={placeholder || `Tempel link ${platform} di sini...`} className="h-12 text-sm md:text-base mb-3" aria-label="URL video" inputMode="url" />
              <div className="flex gap-2">
                <Button variant="outline" onClick={handlePaste} className="h-12 px-4 shrink-0 text-sm md:text-base min-w-[48px]" aria-label="Tempel dari clipboard"><LinkIcon className="h-4 w-4 sm:mr-1.5" /><span className="hidden sm:inline">Tempel</span></Button>
                <Button onClick={handleAnalyze} disabled={loading} className="flex-1 h-12 text-sm md:text-base font-medium">{loading ? <Loader2 className="h-4 w-4 animate-spin mr-1.5" /> : <Download className="h-4 w-4 mr-1.5" />}{mode === "audio" ? "Download MP3" : "Download"}</Button>
              </div>
            </div>

            {loading && (<div><div className="mt-4 text-sm md:text-base text-muted-foreground flex items-center justify-center gap-1.5 mb-3"><Loader2 className="h-3.5 w-3.5 animate-spin" /> {loadingMsg}</div><div className="mt-5 text-left bg-card border border-border rounded-lg overflow-hidden"><div className="flex gap-3 p-3 border-b border-border"><div className="w-24 h-14 bg-muted rounded animate-pulse shrink-0" /><div className="flex-1 space-y-2 py-1"><div className="h-3.5 bg-muted rounded animate-pulse w-full" /><div className="h-3 bg-muted rounded animate-pulse w-3/4" /></div></div></div></div>)}
            {error && (<div className="mt-4 text-sm md:text-base text-red-500 dark:text-red-400 flex items-start gap-1.5 text-left bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-lg p-3"><AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />{error}</div>)}

            {result && (
              <div ref={resultRef} className="mt-5 text-left bg-card border border-border rounded-lg overflow-hidden shadow-sm transition-all duration-500 ease-out" style={{ opacity: resultVisible ? 1 : 0, transform: resultVisible ? "translateY(0) scale(1)" : "translateY(12px) scale(0.98)" }}>
                <div className="flex items-center gap-1.5 px-3 py-2 bg-green-50 dark:bg-green-500/10 border-b border-green-200 dark:border-green-500/20">
                  <Check className="h-3.5 w-3.5 text-green-600 dark:text-green-400" />
                  <span className="text-xs md:text-sm font-medium text-green-700 dark:text-green-400">Video ditemukan!</span>
                </div>
                <div className="flex gap-3 p-3 border-b border-border">
                  <div className="w-24 h-14 sm:w-28 sm:h-16 md:w-36 md:h-20 bg-muted rounded overflow-hidden shrink-0">
                    {result.thumbnail && <Image src={result.thumbnail} alt={`Thumbnail: ${result.title}`} width={96} height={56} className="w-full h-full object-cover" unoptimized loading="lazy" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm md:text-base font-medium text-foreground line-clamp-2 leading-snug">{result.title}</p>
                    <p className="text-xs md:text-sm text-muted-foreground mt-1">{result.author}{result.duration !== "--:--" ? ` · ${result.duration}` : ""}</p>
                  </div>
                </div>
                {result.qualityOptions.length > 1 && (
                  <div className="px-3 pt-3 pb-1">
                    <p className="text-xs md:text-sm text-muted-foreground mb-2 font-medium">Pilih Kualitas</p>
                    <div className="flex flex-wrap gap-1.5">
                      {result.qualityOptions.map((q, i) => {
                        const isAudio = q.resolution === "MP3" || q.label.includes("Audio");
                        return (<button key={i} onClick={() => setSelQuality(i)} className={`inline-flex items-center gap-1 px-2.5 py-1.5 text-xs md:text-sm border rounded-md transition-all min-h-[36px] ${i === selQuality ? "bg-primary text-white border-primary shadow-sm" : "bg-background text-foreground border-border hover:border-primary/50 hover:bg-primary/5"}`}>{isAudio ? <Headphones className="h-3 w-3" /> : <Play className="h-3 w-3" />}{q.label}</button>);
                      })}
                    </div>
                  </div>
                )}
                {/* Redirect notice */}
                {result.isRedirect && (
                  <div className="px-3 pt-3 pb-1">
                    <div className="p-2.5 rounded-lg bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 flex items-start gap-2">
                      <AlertCircle className="h-4 w-4 text-amber-500 dark:text-amber-400 mt-0.5 shrink-0" />
                      <p className="text-amber-600 dark:text-amber-400 text-xs md:text-sm">Download langsung sedang tidak tersedia. Klik tombol di bawah untuk mengunduh melalui layanan pihak ketiga.</p>
                    </div>
                  </div>
                )}

                <div className="p-3 flex gap-2">
                  <Button onClick={handleDownload} disabled={downloading} className="flex-1 h-12 text-sm md:text-base font-medium">{downloading ? <Loader2 className="h-4 w-4 animate-spin mr-1.5" /> : <Download className="h-4 w-4 mr-1.5" />}{result.isRedirect ? "Download via Layanan Lain" : `Download ${result.qualityOptions[selQuality]?.label || ""}`}</Button>
                  <Button variant="outline" onClick={() => { setResult(null); setError(""); setUrl(""); }} className="h-12 px-3 text-sm md:text-base shrink-0" aria-label="Download baru"><ChevronDown className="h-4 w-4" /></Button>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* SEO Content */}
        {children}

        {/* Internal Links */}
        <section className="px-4 py-8 md:py-16 border-t border-border bg-muted/30">
          <div className="mx-auto max-w-md md:max-w-lg">
            <h3 className="text-base md:text-lg font-bold text-foreground mb-3">Download Video dari Platform Lain</h3>
            <div className="grid grid-cols-2 gap-2 md:gap-4">
              {[
                { name: "TikTok", href: "/tiktok-downloader", desc: "Tanpa watermark" },
                { name: "YouTube", href: "/youtube-downloader", desc: "Video & MP3" },
                { name: "Instagram", href: "/instagram-downloader", desc: "Reels & Video" },
                { name: "Facebook", href: "/facebook-downloader", desc: "Video HD" },
                { name: "Twitter/X", href: "/twitter-downloader", desc: "Video & GIF" },
                { name: "Pinterest", href: "/pinterest-downloader", desc: "Video & Gambar" },
                { name: "Reddit", href: "/reddit-downloader", desc: "Video HD" },
                { name: "Telegram", href: "/telegram-downloader", desc: "Video cepat" },
                { name: "YouTube MP3", href: "/youtube-mp3", desc: "Konversi audio" },
              ].filter(l => l.href !== `/${platform.toLowerCase().replace(' ', '-')}-downloader` && !(l.href === '/youtube-mp3' && platform === 'YouTube MP3')).map(link => (
                <a key={link.href} href={link.href} className="p-3 md:p-5 bg-card border border-border rounded-lg hover:border-primary/30 hover:shadow-sm transition-all">
                  <p className="text-sm md:text-base font-medium text-foreground">{link.name}</p>
                  <p className="text-[11px] md:text-xs text-muted-foreground">{link.desc}</p>
                </a>
              ))}
            </div>
            {/* Blog links */}
            <div className="mt-6 pt-6 border-t border-border">
              <h4 className="text-sm font-bold text-foreground mb-2">Panduan & Artikel Terkait</h4>
              <div className="space-y-2">
                <a href="/blog" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-[#E52222] transition-colors">Blog & Panduan</a>
                <a href="/faq" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-[#E52222] transition-colors">FAQ</a>
                <a href="/how-it-works" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-[#E52222] transition-colors">Cara Kerja Mova</a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SitewideFooter />

      <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className={`fixed bottom-4 right-4 z-40 w-11 h-11 md:w-12 md:h-12 rounded-full bg-primary text-white shadow-lg flex items-center justify-center transition-all duration-300 ${showTopBtn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`} aria-label="Kembali ke atas"><ArrowUp className="h-4 w-4" /></button>
    </div>
  );
}

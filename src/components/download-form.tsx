"use client";

import React, { useState, useCallback, useRef } from "react";
import { Download, Copy, Loader2, CheckCircle, AlertCircle, Play, Image as ImageIcon, Music } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

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
  isPhotoSlide?: boolean;
  images?: string[];
  originalImages?: string[];
  imageCount?: number;
}

interface DownloadFormProps {
  placeholder?: string;
  mode?: "video" | "audio";
}

export function DownloadForm({ placeholder = "Tempel link video di sini...", mode = "video" }: DownloadFormProps) {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DownloadResult | null>(null);
  const [error, setError] = useState("");
  const [selectedQuality, setSelectedQuality] = useState(0);
  const [downloading, setDownloading] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

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

    try {
      const res = await fetch("/api/download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: trimmed, audioMode: mode === "audio" }),
      });
      const data = await res.json();
      if (res.ok) {
        setResult(data);
        setSelectedQuality(0);
        setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 300);
      } else {
        setError(data.error || "Gagal terhubung ke server. Silakan coba lagi.");
      }
    } catch {
      setError("Gagal terhubung ke server. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  }, [url, mode]);

  const handleDownload = useCallback(async () => {
    if (!result || downloading) return;
    const q = result.qualityOptions[selectedQuality];
    if (!q) return;

    // If this is a redirect fallback, open external download service in new tab
    if (result.isRedirect) {
      window.open(q.url || result.downloadUrl, "_blank", "noopener,noreferrer");
      return;
    }

    const ext = q.resolution === "MP3" ? ".mp3" : ".mp4";
    const downloadName = (result.filename || `mova_${Date.now()}`) + `_${q.label}${ext}`;
    const isAudio = q.resolution === "MP3" || q.label === "Audio";
    const downloadUrl = q.url;
    const fallbackUrl = q.originalUrl || q.url;

    setDownloading(true);

    try {
      // === YOUTUBE DOWNLOADS (via /api/yt-download → CF Worker redirect) ===
      // Use fetch + blob approach — most reliable on mobile, avoids:
      // - Browser playing video inline instead of downloading
      // - Popup blockers blocking window.open
      // - <a download> being ignored for cross-origin redirects
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
                a.download = downloadName;
                a.style.display = "none";
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                setTimeout(() => URL.revokeObjectURL(blobUrl), 30000);
                setDownloading(false);
                return;
              }
            }
            // For large video files (>80MB): use window.location.href
            // CF Worker sets Content-Disposition: attachment, browser will download
            window.location.href = downloadUrl;
            setDownloading(false);
            return;
          } else {
            // Show error from response
            let errorMsg = "Gagal mengunduh video. Coba lagi nanti.";
            try { const errData = await res.json(); if (errData.error) errorMsg = errData.error; } catch {}
            console.log("YouTube download error:", errorMsg);
          }
        } catch (fetchErr) {
          console.log("YouTube fetch+blob failed, trying window.location.href:", fetchErr);
          // Fallback: navigate directly - CF Worker has Content-Disposition: attachment
          try {
            window.location.href = downloadUrl;
          } catch {}
          setDownloading(false);
          return;
        }

        // Final fallback if fetch returned non-ok but no redirect happened
        try {
          window.location.href = downloadUrl;
        } catch {}
        setDownloading(false);
        return;
      }

      // === NON-YOUTUBE DOWNLOADS ===
      // Strategy 1: fetch + blob + createObjectURL (cleanest UX, no new tab)
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
                a.href = blobUrl;
                a.download = downloadName;
                a.style.display = "none";
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                setTimeout(() => URL.revokeObjectURL(blobUrl), 10000);
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
        a.href = downloadUrl;
        a.download = downloadName;
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        a.style.display = "none";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setDownloading(false);
        return;
      } catch {}

      // Strategy 3: window.open fallback
      window.open(downloadUrl, "_blank");
    } catch {
      try { window.open(fallbackUrl, "_blank"); } catch {}
    } finally {
      setDownloading(false);
    }
  }, [result, selectedQuality, downloading]);

  const handlePaste = useCallback(async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
    } catch {}
  }, []);

  return (
    <div className="w-full max-w-xl mx-auto">
      {/* Input */}
      <div className="relative flex items-center gap-2">
        <div className="flex-1">
          <Input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAnalyze()}
            placeholder={placeholder}
            className="h-11 bg-card border-border rounded-xl text-sm pl-4 pr-4"
          />
        </div>
        <button
          onClick={handlePaste}
          className="h-11 px-3 rounded-xl border border-border bg-card text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors text-xs font-medium shrink-0"
        >
          <Copy className="h-3.5 w-3.5 sm:mr-1.5" />
          <span className="hidden sm:inline">Tempel</span>
        </button>
        <Button
          onClick={handleAnalyze}
          disabled={loading}
          className="h-11 px-5 bg-[#10B981] text-white font-semibold rounded-xl hover:bg-[#059669] shrink-0"
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Download className="h-4 w-4 sm:mr-1.5" />
          )}
          <span className="hidden sm:inline">{loading ? "Memproses..." : "Download"}</span>
        </Button>
      </div>

      {/* Loading */}
      {loading && !error && (
        <div className="mt-3 p-3 rounded-lg bg-[#10B981]/10 border border-[#10B981]/20 flex items-center gap-2">
          <Loader2 className="h-4 w-4 text-[#10B981] animate-spin shrink-0" />
          <p className="text-[#10B981] text-sm font-medium">
            {mode === "audio" ? "Mengekstrak audio..." : "Mencari video..."}
          </p>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="mt-3 p-3 rounded-lg bg-red-500/10 border border-red-500/20 flex items-start gap-2">
          <AlertCircle className="h-4 w-4 text-red-400 mt-0.5 shrink-0" />
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      {/* Result */}
      {result && (
        <div
          ref={resultRef}
          className="mt-4 rounded-xl bg-card border overflow-hidden"
          style={{ borderColor: "#10B98130" }}
        >
          {/* Header */}
          <div
            className="px-4 py-2 border-b border-border flex items-center gap-2"
            style={{ background: "linear-gradient(to right, #10B98115, #34D39915)" }}
          >
            <CheckCircle className="h-4 w-4 text-green-400" />
            <span className="text-sm text-green-400 font-medium">
              {result.isPhotoSlide ? "Slide foto ditemukan!" : mode === "audio" ? "Audio berhasil ditemukan!" : "Video berhasil ditemukan!"}
            </span>
            {result.isPhotoSlide && result.imageCount && (
              <span className="text-xs bg-[#10B981]/10 text-[#10B981] px-2 py-0.5 rounded-full font-medium">{result.imageCount} foto</span>
            )}
          </div>

          <div className="p-4">
            {result.isPhotoSlide && result.images && result.images.length > 0 ? (
              <>
                {/* Photo Slide Grid */}
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-1.5 mb-3">
                  {result.images.map((imgUrl, idx) => (
                    <a
                      key={idx}
                      href={imgUrl}
                      download={`mova_tiktok_photo_${idx + 1}.jpg`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative group rounded-lg overflow-hidden bg-muted aspect-square"
                    >
                      <Image src={result.originalImages?.[idx] || imgUrl} alt={`Foto ${idx + 1}`} fill className="object-cover" unoptimized loading="lazy" />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                        <Download className="h-5 w-5 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <span className="absolute top-1 left-1 bg-black/50 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">{idx + 1}</span>
                    </a>
                  ))}
                </div>
                <Button
                  onClick={async () => {
                    if (!result.images) return;
                    for (let i = 0; i < result.images.length; i++) {
                      try {
                        const res = await fetch(result.images[i]);
                        const blob = await res.blob();
                        if (blob.size > 500) {
                          const url = URL.createObjectURL(blob);
                          const a = document.createElement("a");
                          a.href = url;
                          a.download = `${result.filename}_foto_${i + 1}.jpg`;
                          a.style.display = "none";
                          document.body.appendChild(a);
                          a.click();
                          document.body.removeChild(a);
                          setTimeout(() => URL.revokeObjectURL(url), 5000);
                        }
                      } catch {}
                      if (i < result.images.length - 1) await new Promise(r => setTimeout(r, 600));
                    }
                  }}
                  className="w-full bg-[#10B981] text-white font-semibold rounded-xl hover:bg-[#059669] h-10"
                >
                  <ImageIcon className="h-4 w-4 mr-2" />
                  Download Semua Foto ({result.imageCount})
                </Button>
                {result.qualityOptions.length > 0 && (
                  <div className="mt-3">
                    <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1.5"><Music className="h-3 w-3 text-[#10B981]" />Audio dari slide:</p>
                    <div className="flex flex-wrap gap-2">
                      {result.qualityOptions.map((q, i) => (
                        <button key={i} onClick={() => setSelectedQuality(i)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${selectedQuality === i ? "bg-[#10B981] text-white" : "bg-muted text-muted-foreground hover:text-foreground"}`}>
                          {q.label} {q.resolution !== q.label && `(${q.resolution})`}
                        </button>
                      ))}
                      <Button onClick={handleDownload} disabled={downloading} size="sm" className="bg-[#10B981] text-white font-semibold rounded-lg hover:bg-[#059669] text-xs h-8">
                        {downloading ? <Loader2 className="h-3 w-3 animate-spin mr-1" /> : <Download className="h-3 w-3 mr-1" />}
                        Download Audio
                      </Button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <>
                {/* Regular Video Result */}
                <div className="flex gap-3 mb-3">
                  <div className="w-24 h-16 rounded-lg bg-muted flex items-center justify-center shrink-0 overflow-hidden relative">
                    {result.thumbnail ? (
                      <Image
                        src={result.thumbnail}
                        alt={`Thumbnail: ${result.title}`}
                        width={96}
                        height={64}
                        className="w-full h-full object-cover"
                        unoptimized
                      />
                    ) : null}
                    <Play className="h-6 w-6 absolute text-[#10B981]" />
                  </div>
                  <div className="flex-1 text-left min-w-0">
                    <h3 className="font-semibold text-foreground text-sm line-clamp-2">{result.title}</h3>
                    <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                      {result.duration !== "--:--" && <span>{result.duration}</span>}
                      <span>{result.author}</span>
                      <span className="bg-muted px-2 py-0.5 rounded-full">{result.platform}</span>
                    </div>
                  </div>
                </div>

                {/* Quality selector */}
                {result.qualityOptions.length > 1 && (
                  <div className="mb-3">
                    <p className="text-xs text-muted-foreground mb-2">Pilih kualitas:</p>
                    <div className="flex flex-wrap gap-2">
                      {result.qualityOptions.map((q, i) => (
                        <button
                          key={i}
                          onClick={() => setSelectedQuality(i)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                            selectedQuality === i
                              ? "bg-[#10B981] text-white"
                              : "bg-muted text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          {q.label} {q.resolution !== "Auto" && q.resolution !== "MP3" ? `(${q.resolution})` : ""}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Redirect notice */}
                {result.isRedirect && (
                  <div className="mb-3 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 text-amber-400 mt-0.5 shrink-0" />
                    <p className="text-amber-400 text-xs">Download langsung sedang tidak tersedia. Klik tombol di bawah untuk mengunduh melalui layanan pihak ketiga.</p>
                  </div>
                )}

                {/* Download button */}
                <Button
                  onClick={handleDownload}
                  disabled={downloading}
                  className="w-full bg-[#10B981] text-white font-semibold rounded-xl hover:bg-[#059669] h-10"
                >
                  {downloading ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <Download className="h-4 w-4 mr-2" />
                  )}
                  {downloading ? "Mengunduh..." : result.isRedirect ? "Download via Layanan Lain" : `Download ${result.qualityOptions[selectedQuality]?.label || ""}`}
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

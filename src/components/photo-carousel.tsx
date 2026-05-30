"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import {
  ChevronLeft, ChevronRight, Download, Image as ImageIcon,
  Loader2, Music, X, ZoomIn,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface PhotoCarouselProps {
  /** Raw CDN image URLs — used as input for the proxy, NOT loaded directly */
  images: string[];
  /** Proxy URLs for downloading (e.g., /api/proxy?...&quality=photo) */
  originalImages?: string[];
  imageCount?: number;
  filename: string;
  qualityOptions: { label: string; resolution: string; url: string }[];
  selectedQuality: number;
  downloading: boolean;
  onDownloadAudio: () => void;
  onSelectQuality: (idx: number) => void;
  onToast: (title: string, desc: string, variant?: "default" | "destructive") => void;
  /** Accent color - defaults to #10B981 */
  accent?: string;
}

export function PhotoCarousel({
  images,
  originalImages,
  imageCount,
  filename,
  qualityOptions,
  selectedQuality,
  downloading,
  onDownloadAudio,
  onSelectQuality,
  onToast,
  accent = "#10B981",
}: PhotoCarouselProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const [downloadingPhoto, setDownloadingPhoto] = useState(false);
  const [downloadingAll, setDownloadingAll] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const total = images.length;

  // Blob URLs for proxied images — we ALWAYS load through proxy because
  // TikTok CDN requires proper Referer headers that browsers don't send.
  const [blobUrls, setBlobUrls] = useState<(string | null)[]>(() => images.map(() => null));
  const [loadingStates, setLoadingStates] = useState<boolean[]>(() => images.map(() => true));
  const [errorStates, setErrorStates] = useState<boolean[]>(() => images.map(() => false));
  const loadedRef = useRef<Set<number>>(new Set());

  // Load image through proxy and create blob URL
  const loadImage = useCallback(async (idx: number) => {
    if (loadedRef.current.has(idx)) return;
    loadedRef.current.add(idx);

    const cdnUrl = images[idx];
    if (!cdnUrl) return;

    setLoadingStates(prev => { const n = [...prev]; n[idx] = true; return n; });
    setErrorStates(prev => { const n = [...prev]; n[idx] = false; return n; });

    // Strategy 1: Try /api/photo-preview proxy (POST with CDN URL)
    try {
      const res = await fetch("/api/photo-preview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: cdnUrl }),
      });
      if (res.ok) {
        const blob = await res.blob();
        if (blob.size > 500) {
          const url = URL.createObjectURL(blob);
          setBlobUrls(prev => { const n = [...prev]; n[idx] = url; return n; });
          setLoadingStates(prev => { const n = [...prev]; n[idx] = false; return n; });
          return;
        }
      }
    } catch {}

    // Strategy 2: Try /api/proxy with quality=photo (GET)
    if (originalImages?.[idx]) {
      try {
        const res = await fetch(originalImages[idx]);
        if (res.ok) {
          const blob = await res.blob();
          if (blob.size > 500) {
            const url = URL.createObjectURL(blob);
            setBlobUrls(prev => { const n = [...prev]; n[idx] = url; return n; });
            setLoadingStates(prev => { const n = [...prev]; n[idx] = false; return n; });
            return;
          }
        }
      } catch {}
    }

    // Strategy 3: Try direct CDN URL as <img> src (might work if CSP allows and CDN doesn't block)
    // We set the blobUrl to the CDN URL directly — the <img> tag will try to load it
    setBlobUrls(prev => { const n = [...prev]; n[idx] = cdnUrl; return n; });
    setLoadingStates(prev => { const n = [...prev]; n[idx] = false; return n; });
  }, [images, originalImages]);

  // Load current + adjacent images when currentIdx changes
  useEffect(() => {
    const toLoad = [currentIdx];
    if (currentIdx > 0) toLoad.push(currentIdx - 1);
    if (currentIdx < total - 1) toLoad.push(currentIdx + 1);
    toLoad.forEach(idx => {
      if (!loadedRef.current.has(idx) && !errorStates[idx]) {
        loadImage(idx);
      }
    });
  }, [currentIdx, total, loadImage, errorStates]);

  // Cleanup blob URLs on unmount
  useEffect(() => {
    return () => {
      blobUrls.forEach(url => {
        if (url && url.startsWith("blob:")) URL.revokeObjectURL(url);
      });
    };
  }, []);

  const goTo = useCallback(
    (idx: number) => {
      if (idx < 0 || idx >= total) return;
      setCurrentIdx(idx);
    },
    [total]
  );

  const goNext = useCallback(() => goTo(currentIdx + 1), [currentIdx, goTo]);
  const goPrev = useCallback(() => goTo(currentIdx - 1), [currentIdx, goTo]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (fullscreen) {
        if (e.key === "Escape") setFullscreen(false);
        if (e.key === "ArrowRight") goNext();
        if (e.key === "ArrowLeft") goPrev();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [fullscreen, goNext, goPrev]);

  // Touch swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(diff) > 50) {
      if (diff < 0) goNext();
      else goPrev();
    }
    touchStartX.current = null;
  };

  const handleImgError = useCallback((idx: number) => {
    setErrorStates(prev => { const n = [...prev]; n[idx] = true; return n; });
  }, []);

  // Download a single photo
  const handleDownloadPhoto = useCallback(async () => {
    setDownloadingPhoto(true);

    // Strategy 1: Try /api/photo-preview with CDN URL
    try {
      const res = await fetch("/api/photo-preview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: images[currentIdx] }),
      });
      if (res.ok) {
        const blob = await res.blob();
        if (blob.size > 500) {
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `${filename}_foto_${currentIdx + 1}.jpg`;
          a.style.display = "none";
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          setTimeout(() => URL.revokeObjectURL(url), 10000);
          onToast("Foto diunduh!", `Foto ${currentIdx + 1} berhasil diunduh.`);
          setDownloadingPhoto(false);
          return;
        }
      }
    } catch {}

    // Strategy 2: Try proxy URL (originalImages)
    const proxyDownloadUrl = originalImages?.[currentIdx];
    if (proxyDownloadUrl) {
      try {
        const res = await fetch(proxyDownloadUrl);
        if (res.ok) {
          const blob = await res.blob();
          if (blob.size > 500) {
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `${filename}_foto_${currentIdx + 1}.jpg`;
            a.style.display = "none";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            setTimeout(() => URL.revokeObjectURL(url), 10000);
            onToast("Foto diunduh!", `Foto ${currentIdx + 1} berhasil diunduh.`);
            setDownloadingPhoto(false);
            return;
          }
        }
      } catch {}
    }

    // Strategy 3: Use existing blob URL if available
    if (blobUrls[currentIdx] && blobUrls[currentIdx]!.startsWith("blob:")) {
      try {
        const a = document.createElement("a");
        a.href = blobUrls[currentIdx]!;
        a.download = `${filename}_foto_${currentIdx + 1}.jpg`;
        a.style.display = "none";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        onToast("Foto diunduh!", `Foto ${currentIdx + 1} berhasil diunduh.`);
        setDownloadingPhoto(false);
        return;
      } catch {}
    }

    // Last fallback: open CDN URL in new tab
    window.open(images[currentIdx], "_blank");
    onToast("Mengunduh...", "Foto dibuka di tab baru.");
    setDownloadingPhoto(false);
  }, [currentIdx, filename, images, originalImages, blobUrls, onToast]);

  const handleDownloadAll = useCallback(async () => {
    setDownloadingAll(true);
    for (let i = 0; i < images.length; i++) {
      try {
        const res = await fetch("/api/photo-preview", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url: images[i] }),
        });
        if (res.ok) {
          const blob = await res.blob();
          if (blob.size > 500) {
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `${filename}_foto_${i + 1}.jpg`;
            a.style.display = "none";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            setTimeout(() => URL.revokeObjectURL(url), 5000);
          }
        }
      } catch {}
      if (i < images.length - 1) await new Promise((r) => setTimeout(r, 600));
    }
    setDownloadingAll(false);
    onToast("Semua foto diunduh!", `${total} foto berhasil diunduh.`);
  }, [images, filename, total, onToast]);

  // Retry loading an image
  const handleRetry = useCallback((idx: number) => {
    loadedRef.current.delete(idx);
    setErrorStates(prev => { const n = [...prev]; n[idx] = false; return n; });
    setLoadingStates(prev => { const n = [...prev]; n[idx] = true; return n; });
    loadImage(idx);
  }, [loadImage]);

  const currentBlobUrl = blobUrls[currentIdx];
  const currentLoading = loadingStates[currentIdx];
  const currentError = errorStates[currentIdx];

  return (
    <>
      {/* ── Per-Slide View ── */}
      <div className="w-full">
        {/* Photo image area */}
        <div
          className="relative w-full rounded-xl overflow-hidden bg-muted/80"
          style={{ aspectRatio: "4/5", maxHeight: "400px" }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Loading spinner */}
          {currentLoading && !currentError && (
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground opacity-50" />
            </div>
          )}

          {/* Error state */}
          {currentError ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground gap-2">
              <ImageIcon className="h-10 w-10 opacity-40" />
              <p className="text-xs">Gagal memuat gambar</p>
              <button
                onClick={() => handleRetry(currentIdx)}
                className="text-xs underline hover:text-foreground transition-colors"
              >
                Coba lagi
              </button>
            </div>
          ) : currentBlobUrl ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={currentBlobUrl}
              alt={`Foto ${currentIdx + 1}`}
              className="w-full h-full object-contain transition-opacity duration-300"
              style={{ opacity: currentLoading ? 0 : 1 }}
              onLoad={() => setLoadingStates(prev => { const n = [...prev]; n[currentIdx] = false; return n; })}
              onError={() => handleImgError(currentIdx)}
            />
          ) : null}

          {/* Fullscreen button */}
          {currentBlobUrl && !currentError && (
            <button
              onClick={() => setFullscreen(true)}
              className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white/80 hover:text-white hover:bg-black/60 transition-colors z-10"
              title="Perbesar"
            >
              <ZoomIn className="h-4 w-4" />
            </button>
          )}

          {/* Photo number badge */}
          <span className="absolute top-2 left-2 bg-black/50 backdrop-blur-sm text-white text-[11px] font-bold px-2 py-1 rounded-lg z-10">
            {currentIdx + 1} / {total}
          </span>

          {/* Prev button */}
          {currentIdx > 0 && (
            <button
              onClick={goPrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white/80 hover:text-white hover:bg-black/60 transition-colors z-10"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          )}

          {/* Next button */}
          {currentIdx < total - 1 && (
            <button
              onClick={goNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white/80 hover:text-white hover:bg-black/60 transition-colors z-10"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* ── Per-slide action bar ── */}
        <div className="mt-2">
          <Button
            onClick={handleDownloadPhoto}
            disabled={downloadingPhoto}
            className="w-full text-white font-semibold rounded-xl h-11 text-sm"
            style={{ background: accent }}
          >
            {downloadingPhoto ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : (
              <Download className="h-4 w-4 mr-2" />
            )}
            Download Foto {currentIdx + 1}
          </Button>
        </div>

        {/* ── Dot indicators ── */}
        <div className="mt-2 flex items-center justify-center gap-1.5">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goTo(idx)}
              className={`rounded-full transition-all ${
                idx === currentIdx
                  ? "w-5 h-2"
                  : "w-2 h-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
              }`}
              style={idx === currentIdx ? { background: accent } : {}}
            />
          ))}
        </div>

        {/* ── Bottom section: Download All + Audio ── */}
        <div className="mt-3 pt-3 border-t border-border">
          <Button
            onClick={handleDownloadAll}
            disabled={downloadingAll}
            variant="outline"
            className="w-full font-semibold rounded-xl h-10 text-sm mb-2"
          >
            {downloadingAll ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : (
              <ImageIcon className="h-4 w-4 mr-2" />
            )}
            Download Semua Foto ({total})
          </Button>

          {qualityOptions.length > 0 && (
            <div>
              <p className="text-xs text-muted-foreground mb-1.5 flex items-center gap-1.5">
                <Music className="h-3 w-3" style={{ color: accent }} />
                Audio dari slide:
              </p>
              <div className="flex flex-wrap gap-1.5">
                {qualityOptions.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => onSelectQuality(i)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      i === selectedQuality
                        ? "text-white"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                    style={i === selectedQuality ? { background: accent } : {}}
                  >
                    {q.label} {q.resolution !== q.label && `(${q.resolution})`}
                  </button>
                ))}
                <Button
                  onClick={onDownloadAudio}
                  disabled={downloading}
                  size="sm"
                  className="text-white font-semibold rounded-lg text-xs h-8"
                  style={{ background: accent }}
                >
                  {downloading ? (
                    <Loader2 className="h-3 w-3 animate-spin mr-1" />
                  ) : (
                    <Download className="h-3 w-3 mr-1" />
                  )}
                  Download Audio
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Fullscreen Overlay ── */}
      {fullscreen && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex flex-col"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="flex items-center justify-between px-4 py-3 shrink-0">
            <span className="text-white/70 text-sm font-medium">
              {currentIdx + 1} / {total}
            </span>
            <button
              onClick={() => setFullscreen(false)}
              className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div
            className="flex-1 relative flex items-center justify-center px-2"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {currentBlobUrl && !currentError && (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={currentBlobUrl}
                alt={`Foto ${currentIdx + 1}`}
                className="max-w-full max-h-full object-contain"
              />
            )}

            {currentIdx > 0 && (
              <button
                onClick={goPrev}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
            )}
            {currentIdx < total - 1 && (
              <button
                onClick={goNext}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            )}
          </div>

          <div className="shrink-0 px-4 pb-4 pt-2">
            <Button
              onClick={handleDownloadPhoto}
              disabled={downloadingPhoto}
              className="w-full bg-white text-black font-semibold rounded-xl h-11 text-sm hover:bg-white/90"
            >
              <Download className="h-4 w-4 mr-2" />
              Download Foto {currentIdx + 1}
            </Button>

            <div className="mt-3 flex items-center justify-center gap-1.5">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goTo(idx)}
                  className={`rounded-full transition-all ${
                    idx === currentIdx ? "w-5 h-2 bg-white" : "w-2 h-2 bg-white/30 hover:bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

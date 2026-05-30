"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import {
  ChevronLeft, ChevronRight, Download, Image as ImageIcon,
  Loader2, Music, X, ZoomIn,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface PhotoCarouselProps {
  /** Original CDN image URLs — used directly for display */
  images: string[];
  /** Proxy URLs for downloading — not used for display */
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
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [downloadingPhoto, setDownloadingPhoto] = useState(false);
  const [downloadingAll, setDownloadingAll] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const total = images.length;

  // Fallback blob URLs: only created if direct CDN URL fails to load
  const [fallbackUrls, setFallbackUrls] = useState<(string | null)[]>(() => images.map(() => null));
  const triedFallbackRef = useRef<Set<number>>(new Set());

  // Try loading image via /api/photo-preview proxy when direct CDN fails
  const loadFallbackImage = useCallback(async (idx: number) => {
    if (triedFallbackRef.current.has(idx) || fallbackUrls[idx]) return;

    triedFallbackRef.current.add(idx);
    const originalUrl = originalImages?.[idx] || images[idx];

    try {
      const res = await fetch("/api/photo-preview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: originalUrl }),
      });

      if (res.ok) {
        const blob = await res.blob();
        if (blob.size > 500) {
          const url = URL.createObjectURL(blob);
          setFallbackUrls(prev => {
            const next = [...prev];
            next[idx] = url;
            return next;
          });
          return;
        }
      }
    } catch {}
    // If fallback also fails, nothing more we can do
  }, [images, originalImages, fallbackUrls]);

  // Reset loading state when index changes
  useEffect(() => {
    setImageLoading(true);
    setImageError(false);
  }, [currentIdx]);

  // Cleanup blob URLs on unmount
  useEffect(() => {
    return () => {
      fallbackUrls.forEach(url => {
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

  // Download a single photo — use proxy URL (originalImages) for reliable download
  const handleDownloadPhoto = useCallback(async () => {
    setDownloadingPhoto(true);
    // originalImages contains proxy URLs like /api/proxy?...&quality=photo
    // images contains raw CDN URLs
    const proxyDownloadUrl = originalImages?.[currentIdx];

    try {
      // Try the proxy URL directly (already contains /api/proxy?...)
      if (proxyDownloadUrl) {
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
      }
    } catch {}

    // Fallback: try photo-preview endpoint with raw CDN URL
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

    // Last fallback: open CDN URL in new tab
    window.open(images[currentIdx], "_blank");
    onToast("Mengunduh...", "Foto dibuka di tab baru.");
    setDownloadingPhoto(false);
  }, [currentIdx, filename, images, originalImages, onToast]);

  const handleDownloadAll = useCallback(async () => {
    setDownloadingAll(true);
    for (let i = 0; i < images.length; i++) {
      try {
        const proxyDownloadUrl = originalImages?.[i];
        if (proxyDownloadUrl) {
          const res = await fetch(proxyDownloadUrl);
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
        }
      } catch {}
      if (i < images.length - 1) await new Promise((r) => setTimeout(r, 600));
    }
    setDownloadingAll(false);
    onToast("Semua foto diunduh!", `${total} foto berhasil diunduh.`);
  }, [images, originalImages, filename, total, onToast]);

  // Get the best URL for display: fallback blob > original CDN URL
  const getDisplayUrl = (idx: number): string | null => {
    if (fallbackUrls[idx]) return fallbackUrls[idx];
    return images[idx] || null;
  };

  const currentDisplayUrl = getDisplayUrl(currentIdx);

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
          {/* Loading */}
          {imageLoading && !imageError && (
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground opacity-50" />
            </div>
          )}

          {/* Error state */}
          {imageError ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground gap-2">
              <ImageIcon className="h-10 w-10 opacity-40" />
              <p className="text-xs">Gagal memuat gambar</p>
              <button
                onClick={() => {
                  setImageError(false);
                  setImageLoading(true);
                  loadFallbackImage(currentIdx);
                }}
                className="text-xs underline hover:text-foreground transition-colors"
              >
                Coba lagi
              </button>
            </div>
          ) : currentDisplayUrl ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={currentDisplayUrl}
              alt={`Foto ${currentIdx + 1}`}
              className="w-full h-full object-contain transition-opacity duration-300"
              style={{ opacity: imageLoading ? 0 : 1 }}
              onLoad={() => setImageLoading(false)}
              onError={() => {
                // Direct CDN URL failed — try fallback proxy
                if (!triedFallbackRef.current.has(currentIdx)) {
                  setImageLoading(true);
                  loadFallbackImage(currentIdx);
                } else {
                  setImageLoading(false);
                  setImageError(true);
                }
              }}
            />
          ) : null}

          {/* Fullscreen button */}
          {currentDisplayUrl && !imageError && (
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
          {/* Download this photo */}
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
          {/* Download all */}
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

          {/* Audio option */}
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
          {/* Top bar */}
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

          {/* Fullscreen Image */}
          <div
            className="flex-1 relative flex items-center justify-center px-2"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {currentDisplayUrl && (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={currentDisplayUrl}
                alt={`Foto ${currentIdx + 1}`}
                className="max-w-full max-h-full object-contain"
              />
            )}

            {/* Fullscreen Nav */}
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

          {/* Fullscreen bottom: download + dots */}
          <div className="shrink-0 px-4 pb-4 pt-2">
            <Button
              onClick={handleDownloadPhoto}
              disabled={downloadingPhoto}
              className="w-full bg-white text-black font-semibold rounded-xl h-11 text-sm hover:bg-white/90"
            >
              <Download className="h-4 w-4 mr-2" />
              Download Foto {currentIdx + 1}
            </Button>

            {/* Fullscreen dots */}
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

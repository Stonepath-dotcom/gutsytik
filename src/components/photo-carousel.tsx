"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import {
  ChevronLeft, ChevronRight, Download, Image as ImageIcon,
  Loader2, Music, X, ZoomIn,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface PhotoCarouselProps {
  images: string[];
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

  // Blob URLs for image display (avoids long proxy URLs & next/image issues)
  const [blobUrls, setBlobUrls] = useState<(string | null)[]>(() => images.map(() => null));
  const loadedRef = useRef<Set<number>>(new Set());

  // Load an image via /api/photo-preview and create a blob URL
  const loadImage = useCallback(async (idx: number) => {
    if (loadedRef.current.has(idx) || blobUrls[idx]) return;

    const originalUrl = originalImages?.[idx] || images[idx];

    try {
      // Try POST /api/photo-preview first (avoids URL length limits)
      const res = await fetch("/api/photo-preview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: originalUrl }),
      });

      if (res.ok) {
        const blob = await res.blob();
        if (blob.size > 500) {
          const url = URL.createObjectURL(blob);
          setBlobUrls(prev => {
            const next = [...prev];
            next[idx] = url;
            return next;
          });
          loadedRef.current.add(idx);
          return;
        }
      }

      // Fallback: try direct fetch from proxy URL (images[idx] = /api/proxy?...)
      const proxyUrl = images[idx];
      if (proxyUrl.startsWith("/")) {
        const res2 = await fetch(proxyUrl);
        if (res2.ok) {
          const blob2 = await res2.blob();
          if (blob2.size > 500) {
            const url2 = URL.createObjectURL(blob2);
            setBlobUrls(prev => {
              const next = [...prev];
              next[idx] = url2;
              return next;
            });
            loadedRef.current.add(idx);
            return;
          }
        }
      }

      // Last fallback: use original URL directly
      setBlobUrls(prev => {
        const next = [...prev];
        next[idx] = originalUrl;
        return next;
      });
      loadedRef.current.add(idx);
    } catch {
      // Fallback: use original URL directly
      setBlobUrls(prev => {
        const next = [...prev];
        next[idx] = originalUrl;
        return next;
      });
      loadedRef.current.add(idx);
    }
  }, [images, originalImages, blobUrls]);

  // Load current image when index changes
  useEffect(() => {
    setImageLoading(true);
    setImageError(false);
    loadImage(currentIdx);
  }, [currentIdx, loadImage]);

  // Preload next and previous images
  useEffect(() => {
    if (currentIdx + 1 < total) loadImage(currentIdx + 1);
    if (currentIdx - 1 >= 0) loadImage(currentIdx - 1);
  }, [currentIdx, total, loadImage]);

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

  const handleDownloadPhoto = useCallback(async () => {
    const imgUrl = images[currentIdx];
    setDownloadingPhoto(true);
    try {
      const res = await fetch(imgUrl);
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
      } else {
        onToast("Gagal mengunduh", "File terlalu kecil, kemungkinan error.", "destructive");
      }
    } catch {
      window.open(imgUrl, "_blank");
    } finally {
      setDownloadingPhoto(false);
    }
  }, [images, currentIdx, filename, onToast]);

  const handleDownloadAll = useCallback(async () => {
    setDownloadingAll(true);
    for (let i = 0; i < images.length; i++) {
      try {
        const res = await fetch(images[i]);
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
      } catch {}
      if (i < images.length - 1) await new Promise((r) => setTimeout(r, 600));
    }
    setDownloadingAll(false);
    onToast("Semua foto diunduh!", `${total} foto berhasil diunduh.`);
  }, [images, filename, total, onToast]);

  const currentBlobUrl = blobUrls[currentIdx];
  const isLoaded = !!currentBlobUrl;

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
                onClick={() => { setImageError(false); setImageLoading(true); loadImage(currentIdx); }}
                className="text-xs underline hover:text-foreground transition-colors"
              >
                Coba lagi
              </button>
            </div>
          ) : isLoaded ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={currentBlobUrl}
              alt={`Foto ${currentIdx + 1}`}
              className="w-full h-full object-contain transition-opacity duration-300"
              style={{ opacity: imageLoading ? 0 : 1 }}
              onLoad={() => setImageLoading(false)}
              onError={() => { setImageLoading(false); setImageError(true); }}
            />
          ) : null}

          {/* Fullscreen button */}
          {isLoaded && !imageError && (
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
            {currentBlobUrl && (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={currentBlobUrl}
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
              onClick={async () => {
                const imgUrl = images[currentIdx];
                try {
                  const res = await fetch(imgUrl);
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
                  }
                } catch { window.open(imgUrl, "_blank"); }
              }}
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

"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import {
  ChevronLeft, ChevronRight, Download, Image as ImageIcon,
  Loader2, Music, ZoomIn, X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

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

  const goTo = useCallback(
    (idx: number) => {
      if (idx < 0 || idx >= total) return;
      setCurrentIdx(idx);
      setImageLoading(true);
      setImageError(false);
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
      // Fallback: open in new tab
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

  const currentImgUrl = images[currentIdx];
  const currentOriginalUrl = originalImages?.[currentIdx] || currentImgUrl;

  return (
    <>
      {/* ── Main Carousel ── */}
      <div className="w-full">
        {/* Photo Counter */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
            <ImageIcon className="h-3.5 w-3.5" style={{ color: accent }} />
            Foto {currentIdx + 1} dari {total}
          </span>
          <button
            onClick={() => setFullscreen(true)}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
          >
            <ZoomIn className="h-3.5 w-3.5" />
            Perbesar
          </button>
        </div>

        {/* Carousel Viewport */}
        <div
          className="relative w-full rounded-xl overflow-hidden bg-muted"
          style={{ aspectRatio: "1/1", maxHeight: "420px" }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Image */}
          {imageError ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground gap-2">
              <ImageIcon className="h-10 w-10 opacity-40" />
              <p className="text-xs">Gagal memuat gambar</p>
              <button
                onClick={() => {
                  setImageError(false);
                  setImageLoading(true);
                }}
                className="text-xs underline hover:text-foreground transition-colors"
              >
                Coba lagi
              </button>
            </div>
          ) : (
            <Image
              src={currentImgUrl}
              alt={`Foto ${currentIdx + 1}`}
              fill
              className={`object-contain transition-opacity duration-300 ${
                imageLoading ? "opacity-0" : "opacity-100"
              }`}
              unoptimized
              onLoad={() => setImageLoading(false)}
              onError={() => {
                setImageLoading(false);
                setImageError(true);
              }}
            />
          )}

          {/* Loading spinner */}
          {imageLoading && !imageError && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground opacity-50" />
            </div>
          )}

          {/* Previous Button */}
          {currentIdx > 0 && (
            <button
              onClick={goPrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-colors z-10"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          )}

          {/* Next Button */}
          {currentIdx < total - 1 && (
            <button
              onClick={goNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-colors z-10"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Dot indicators / Thumbnail strip */}
        <div className="mt-2 flex gap-1 overflow-x-auto pb-1 scrollbar-hide">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => goTo(idx)}
              className={`shrink-0 w-12 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                idx === currentIdx
                  ? "border-foreground/80 scale-105 opacity-100"
                  : "border-transparent opacity-50 hover:opacity-80"
              }`}
            >
              <Image
                src={img}
                alt={`Thumb ${idx + 1}`}
                width={48}
                height={48}
                className="w-full h-full object-cover"
                unoptimized
                loading="lazy"
              />
            </button>
          ))}
        </div>

        {/* Download Buttons */}
        <div className="mt-3 space-y-2">
          <div className="flex gap-2">
            <Button
              onClick={handleDownloadPhoto}
              disabled={downloadingPhoto}
              className="flex-1 text-white font-semibold rounded-xl h-10 text-sm"
              style={{ background: accent }}
            >
              {downloadingPhoto ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <Download className="h-4 w-4 mr-2" />
              )}
              Download Foto {currentIdx + 1}
            </Button>
            <Button
              onClick={handleDownloadAll}
              disabled={downloadingAll}
              className="flex-1 text-white font-semibold rounded-xl h-10 text-sm"
              style={{ background: accent }}
            >
              {downloadingAll ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <ImageIcon className="h-4 w-4 mr-2" />
              )}
              Semua ({total})
            </Button>
          </div>

          {/* Audio option if available */}
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
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Close button */}
          <button
            onClick={() => setFullscreen(false)}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Photo counter */}
          <span className="absolute top-4 left-4 text-white/70 text-sm font-medium z-10">
            {currentIdx + 1} / {total}
          </span>

          {/* Fullscreen Image */}
          <div className="relative w-full h-full flex items-center justify-center p-4">
            <Image
              src={currentImgUrl}
              alt={`Foto ${currentIdx + 1}`}
              width={1200}
              height={1200}
              className="max-w-full max-h-full object-contain"
              unoptimized
            />
          </div>

          {/* Fullscreen Navigation */}
          {currentIdx > 0 && (
            <button
              onClick={goPrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <ChevronLeft className="h-7 w-7" />
            </button>
          )}
          {currentIdx < total - 1 && (
            <button
              onClick={goNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <ChevronRight className="h-7 w-7" />
            </button>
          )}

          {/* Fullscreen thumbnail strip */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 overflow-x-auto max-w-[90vw] pb-2">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => goTo(idx)}
                className={`shrink-0 w-14 h-14 rounded-lg overflow-hidden border-2 transition-all ${
                  idx === currentIdx
                    ? "border-white scale-110 opacity-100"
                    : "border-transparent opacity-40 hover:opacity-70"
                }`}
              >
                <Image
                  src={img}
                  alt={`Thumb ${idx + 1}`}
                  width={56}
                  height={56}
                  className="w-full h-full object-cover"
                  unoptimized
                  loading="lazy"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

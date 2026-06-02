"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { QrCode, X, Camera, Upload, Link as LinkIcon } from "lucide-react";

interface QRScannerProps {
  onURLDetected: (url: string) => void;
  onClose: () => void;
}

export function QRScanner({ onURLDetected, onClose }: QRScannerProps) {
  const [mode, setMode] = useState<"camera" | "upload" | "manual">("manual");
  const [manualUrl, setManualUrl] = useState("");
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState("");
  const [cameraSupported, setCameraSupported] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scanningRef = useRef(false);

  useEffect(() => {
    // Check if BarcodeDetector is available
    setCameraSupported("BarcodeDetector" in window);
    return () => {
      stopCamera();
    };
  }, []);

  const stopCamera = useCallback(() => {
    scanningRef.current = false;
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
      streamRef.current = null;
    }
    setScanning(false);
  }, []);

  const startCamera = async () => {
    try {
      setError("");
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" }
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        scanningRef.current = true;
        setScanning(true);
        scanFrame();
      }
    } catch {
      setError("Tidak bisa mengakses kamera. Pastikan izin kamera diaktifkan.");
    }
  };

  const scanFrame = async () => {
    if (!scanningRef.current || !videoRef.current) return;
    try {
      // @ts-expect-error BarcodeDetector is not in all TypeScript libs
      const detector = new BarcodeDetector({ formats: ["qr_code"] });
      // @ts-expect-error
      const results = await detector.detect(videoRef.current);
      if (results.length > 0) {
        const url = results[0].rawValue;
        if (url && (url.startsWith("http://") || url.startsWith("https://"))) {
          stopCamera();
          onURLDetected(url);
          return;
        }
      }
    } catch {
      // BarcodeDetector might not be supported, silently continue
    }
    if (scanningRef.current) {
      requestAnimationFrame(scanFrame);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError("");

    try {
      const img = new Image();
      img.onload = async () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        ctx.drawImage(img, 0, 0);

        // Try BarcodeDetector
        if ("BarcodeDetector" in window) {
          try {
            // @ts-expect-error
            const detector = new BarcodeDetector({ formats: ["qr_code"] });
            // @ts-expect-error
            const results = await detector.detect(canvas);
            if (results.length > 0) {
              const rawValue = results[0].rawValue;
              if (rawValue && (rawValue.startsWith("http://") || rawValue.startsWith("https://"))) {
                onURLDetected(rawValue);
                return;
              }
            }
          } catch {
            // Detection failed, fall through
          }
        }

        setError("QR code tidak terdeteksi dari gambar. Coba masukkan URL secara manual.");
        URL.revokeObjectURL(img.src);
      };
      img.onerror = () => {
        setError("Gagal membaca file gambar.");
      };
      img.src = URL.createObjectURL(file);
    } catch {
      setError("Gagal membaca file gambar.");
    }

    // Reset file input so the same file can be re-uploaded
    e.target.value = "";
  };

  const handleManualSubmit = () => {
    if (manualUrl.trim()) {
      onURLDetected(manualUrl.trim());
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={onClose}>
      <div className="w-full max-w-md bg-card rounded-2xl border border-border shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <div className="flex items-center gap-2">
            <QrCode className="h-5 w-5 text-[#10B981]" />
            <h3 className="font-bold text-foreground">Scan QR Code</h3>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-muted transition-colors">
            <X className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>

        {/* Mode tabs */}
        <div className="flex border-b border-border">
          <button
            onClick={() => { setMode("manual"); stopCamera(); }}
            className={`flex-1 py-2.5 text-sm font-medium flex items-center justify-center gap-1.5 transition-colors ${mode === "manual" ? "text-[#10B981] border-b-2 border-[#10B981]" : "text-muted-foreground"}`}
          >
            <LinkIcon className="h-4 w-4" />
            Input URL
          </button>
          {cameraSupported && (
            <button
              onClick={() => { setMode("camera"); startCamera(); }}
              className={`flex-1 py-2.5 text-sm font-medium flex items-center justify-center gap-1.5 transition-colors ${mode === "camera" ? "text-[#10B981] border-b-2 border-[#10B981]" : "text-muted-foreground"}`}
            >
              <Camera className="h-4 w-4" />
              Kamera
            </button>
          )}
          <button
            onClick={() => { setMode("upload"); stopCamera(); }}
            className={`flex-1 py-2.5 text-sm font-medium flex items-center justify-center gap-1.5 transition-colors ${mode === "upload" ? "text-[#10B981] border-b-2 border-[#10B981]" : "text-muted-foreground"}`}
          >
            <Upload className="h-4 w-4" />
            Upload
          </button>
        </div>

        {/* Content */}
        <div className="p-5">
          {mode === "manual" && (
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">Masukkan URL video yang ingin didownload:</p>
              <input
                type="url"
                value={manualUrl}
                onChange={e => setManualUrl(e.target.value)}
                placeholder="https://www.tiktok.com/@user/video/..."
                className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:border-[#10B981] focus:ring-1 focus:ring-[#10B981]/20 transition-colors"
                onKeyDown={e => e.key === "Enter" && handleManualSubmit()}
                autoFocus
              />
              <button
                onClick={handleManualSubmit}
                disabled={!manualUrl.trim()}
                className="w-full py-3 rounded-lg bg-[#10B981] text-white font-semibold text-sm hover:bg-[#059669] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Download Video
              </button>
            </div>
          )}

          {mode === "camera" && (
            <div className="space-y-3">
              <div className="relative rounded-lg overflow-hidden bg-black aspect-video">
                <video ref={videoRef} className="w-full h-full object-cover" playsInline muted />
                {!scanning && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button onClick={startCamera} className="px-4 py-2 bg-white/90 rounded-lg text-sm font-medium hover:bg-white transition-colors">
                      Mulai Scan
                    </button>
                  </div>
                )}
                {scanning && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-48 h-48 border-2 border-[#10B981] rounded-xl animate-pulse" />
                  </div>
                )}
              </div>
              <p className="text-xs text-muted-foreground text-center">Arahkan kamera ke QR code yang berisi URL video</p>
            </div>
          )}

          {mode === "upload" && (
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">Upload gambar QR code:</p>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-8 rounded-lg border-2 border-dashed border-border hover:border-[#10B981]/50 transition-colors flex flex-col items-center gap-2"
              >
                <Upload className="h-8 w-8 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Klik untuk upload gambar QR</span>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              <canvas ref={canvasRef} className="hidden" />
            </div>
          )}

          {error && (
            <div className="mt-3 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-sm text-red-500">
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

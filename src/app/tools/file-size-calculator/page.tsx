"use client";

import React, { useState, useCallback } from "react";
import {
  FileVideo,
  HardDrive,
  Clock,
  Wifi,
  ArrowRightLeft,
  Info,
} from "lucide-react";
import Link from "next/link";
import { MovaLogo } from "@/components/mova-logo";
import { SitewideFooter } from "@/components/sitewide-footer";

const FORMAT_DATA = [
  { id: "mp4-h264", label: "MP4 (H.264)", bitrate: 8, color: "text-blue-500", borderColor: "border-blue-500/20", bgColor: "bg-blue-500/10" },
  { id: "mp4-h265", label: "MP4 (H.265/HEVC)", bitrate: 5, color: "text-blue-600", borderColor: "border-blue-600/20", bgColor: "bg-blue-600/10" },
  { id: "webm-vp9", label: "WEBM (VP9)", bitrate: 6, color: "text-green-500", borderColor: "border-green-500/20", bgColor: "bg-green-500/10" },
  { id: "webm-av1", label: "WEBM (AV1)", bitrate: 4, color: "text-green-600", borderColor: "border-green-600/20", bgColor: "bg-green-600/10" },
  { id: "avi", label: "AVI (MPEG-4)", bitrate: 20, color: "text-amber-500", borderColor: "border-amber-500/20", bgColor: "bg-amber-500/10" },
  { id: "mkv", label: "MKV (H.264)", bitrate: 7, color: "text-purple-500", borderColor: "border-purple-500/20", bgColor: "bg-purple-500/10" },
];

const RESOLUTIONS = [
  { id: "4k", label: "4K (2160p)", multiplier: 4, desc: "3840x2160" },
  { id: "1080p", label: "Full HD (1080p)", multiplier: 1, desc: "1920x1080" },
  { id: "720p", label: "HD (720p)", multiplier: 0.5, desc: "1280x720" },
  { id: "480p", label: "SD (480p)", multiplier: 0.25, desc: "854x480" },
  { id: "360p", label: "Low (360p)", multiplier: 0.15, desc: "640x360" },
];

const SPEEDS = [
  { id: "2g", label: "2G", mbps: 0.05 },
  { id: "3g", label: "3G", mbps: 0.4 },
  { id: "4g", label: "4G LTE", mbps: 15 },
  { id: "wifi5", label: "Wi-Fi 5", mbps: 50 },
  { id: "wifi6", label: "Wi-Fi 6", mbps: 150 },
  { id: "fiber", label: "Fiber", mbps: 300 },
];

function formatSize(mb: number): string {
  if (mb < 1) return `${(mb * 1024).toFixed(0)} KB`;
  if (mb < 1024) return `${mb.toFixed(1)} MB`;
  return `${(mb / 1024).toFixed(2)} GB`;
}

function formatTime(seconds: number): string {
  if (seconds < 60) return `${seconds.toFixed(0)} detik`;
  if (seconds < 3600) return `${(seconds / 60).toFixed(1)} menit`;
  return `${(seconds / 3600).toFixed(1)} jam`;
}

export default function FileSizeCalculatorPage() {
  const [resolution, setResolution] = useState("1080p");
  const [duration, setDuration] = useState(10);
  const [selectedFormat, setSelectedFormat] = useState("mp4-h264");

  const getMultiplier = useCallback(() => {
    return RESOLUTIONS.find((r) => r.id === resolution)?.multiplier || 1;
  }, [resolution]);

  const calculations = FORMAT_DATA.map((format) => {
    const multiplier = getMultiplier();
    // Base bitrate is for 1080p, scale by resolution multiplier
    const adjustedBitrate = format.bitrate * multiplier;
    // File size in MB = bitrate (Mbps) * duration (minutes) * 60 / 8
    const fileSizeMB = (adjustedBitrate * duration * 60) / 8;
    return {
      ...format,
      fileSizeMB,
      adjustedBitrate,
    };
  });

  const selectedCalc = calculations.find((c) => c.id === selectedFormat);

  const downloadTimes = SPEEDS.map((speed) => {
    if (!selectedCalc) return { ...speed, time: 0 };
    const fileSizeMb = selectedCalc.fileSizeMB * 8; // Convert MB to Mbit
    const timeSeconds = fileSizeMb / speed.mbps;
    return { ...speed, time: timeSeconds };
  });

  return (
    <div className="min-h-screen flex flex-col bg-card text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <a href="/" className="flex items-center gap-2">
              <MovaLogo size={32} showText />
            </a>
            <a
              href="/"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border border-border bg-card text-foreground hover:bg-muted/50 transition-colors"
            >
              Beranda
            </a>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="mx-auto max-w-5xl px-4 pt-6">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <li><a href="/" className="hover:text-[#10B981] transition-colors">Beranda</a></li>
              <li>/</li>
              <li><a href="/tools/format-comparison" className="hover:text-[#10B981] transition-colors">Tools</a></li>
              <li>/</li>
              <li className="text-[#10B981] font-medium">Kalkulator Ukuran File</li>
            </ol>
          </nav>
        </div>

        {/* Hero */}
        <section className="relative pt-8 pb-10 px-4 sm:px-6">
          <div className="mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#10B981]/10 border border-[#10B981]/20 mb-4">
              <HardDrive className="h-3.5 w-3.5 text-[#10B981]" />
              <span className="text-xs font-semibold text-[#10B981]">Tools Interaktif</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold mb-3 leading-tight font-[family-name:var(--font-montserrat)]">
              Kalkulator <span className="gradient-text">Ukuran File Video</span>
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Estimasi ukuran file video berdasarkan format, resolusi, dan durasi. Rencanakan download dan hemat kuota data!
            </p>
          </div>
        </section>

        {/* Calculator */}
        <section className="px-4 sm:px-6 pb-10">
          <div className="mx-auto max-w-4xl">
            <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 space-y-6">
              {/* Resolution */}
              <div>
                <label className="text-sm font-bold text-foreground mb-3 block font-[family-name:var(--font-montserrat)]">
                  <FileVideo className="h-4 w-4 inline mr-1.5 text-[#10B981]" />
                  Resolusi Video
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {RESOLUTIONS.map((res) => (
                    <button
                      key={res.id}
                      onClick={() => setResolution(res.id)}
                      className={`p-2.5 rounded-xl border text-left transition-all ${
                        resolution === res.id
                          ? "border-[#10B981] bg-[#10B981]/10"
                          : "border-border hover:border-muted-foreground/30"
                      }`}
                    >
                      <p className={`text-xs font-bold ${resolution === res.id ? "text-[#10B981]" : "text-foreground"}`}>
                        {res.label.split(" (")[0]}
                      </p>
                      <p className="text-[10px] text-muted-foreground">{res.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Duration */}
              <div>
                <label className="text-sm font-bold text-foreground mb-3 block font-[family-name:var(--font-montserrat)]">
                  <Clock className="h-4 w-4 inline mr-1.5 text-[#10B981]" />
                  Durasi Video: {duration} menit
                </label>
                <input
                  type="range"
                  min={1}
                  max={180}
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  className="w-full accent-[#10B981]"
                  aria-label="Durasi video dalam menit"
                />
                <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                  <span>1 menit</span>
                  <span>30 menit</span>
                  <span>60 menit</span>
                  <span>120 menit</span>
                  <span>180 menit</span>
                </div>
              </div>

              {/* Results */}
              <div>
                <h3 className="text-sm font-bold text-foreground mb-3 font-[family-name:var(--font-montserrat)]">
                  <HardDrive className="h-4 w-4 inline mr-1.5 text-[#10B981]" />
                  Estimasi Ukuran File
                </h3>
                <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {calculations.map((calc) => (
                    <button
                      key={calc.id}
                      onClick={() => setSelectedFormat(calc.id)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        selectedFormat === calc.id
                          ? `${calc.borderColor} ${calc.bgColor} ring-1 ring-current ${calc.color}`
                          : "border-border hover:border-muted-foreground/30"
                      }`}
                    >
                      <p className={`text-xs font-bold mb-1 ${selectedFormat === calc.id ? calc.color : "text-foreground"}`}>
                        {calc.label}
                      </p>
                      <p className="text-lg font-bold text-foreground">{formatSize(calc.fileSizeMB)}</p>
                      <p className="text-[10px] text-muted-foreground">
                        ~{calc.adjustedBitrate.toFixed(1)} Mbps bitrate
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Download Time Estimation */}
              {selectedCalc && (
                <div>
                  <h3 className="text-sm font-bold text-foreground mb-3 font-[family-name:var(--font-montserrat)]">
                    <Wifi className="h-4 w-4 inline mr-1.5 text-[#10B981]" />
                    Estimasi Waktu Download ({selectedCalc.label})
                  </h3>
                  <div className="grid gap-2 grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
                    {downloadTimes.map((speed) => (
                      <div
                        key={speed.id}
                        className="p-3 rounded-xl border border-border text-center"
                      >
                        <p className="text-xs font-bold text-foreground mb-1">{speed.label}</p>
                        <p className="text-sm font-bold text-[#10B981]">{formatTime(speed.time)}</p>
                        <p className="text-[10px] text-muted-foreground">{speed.mbps} Mbps</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Info */}
              <div className="p-3 rounded-xl bg-[#10B981]/5 border border-[#10B981]/10 flex items-start gap-2">
                <Info className="h-4 w-4 text-[#10B981] shrink-0 mt-0.5" />
                <p className="text-xs text-muted-foreground">
                  Estimasi berdasarkan rata-rata bitrate. Ukuran file aktual bisa berbeda tergantung konten video (video dengan banyak gerakan = file lebih besar). Kompresi modern seperti H.265 dan AV1 menghasilkan file lebih kecil dengan kualitas serupa.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Tips */}
        <section className="px-4 sm:px-6 pb-12">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-lg font-bold text-foreground mb-4 font-[family-name:var(--font-montserrat)]">
              Tips Hemat <span className="gradient-text">Kuota Data</span>
            </h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { title: "Pilih resolusi sesuai kebutuhan", desc: "Tidak perlu 4K kalau cuma nonton di HP. 720p sudah cukup dan hemat 75% kuota." },
                { title: "Gunakan format modern", desc: "H.265/HEVC dan AV1 menghasilkan file 40-50% lebih kecil dibanding H.264 dengan kualitas sama." },
                { title: "Download via Wi-Fi", desc: "Selalu download video besar via Wi-Fi untuk menghemat kuota data seluler kamu." },
                { title: "Cukup audio? Download MP3", desc: "Kalau hanya butuh audio (musik, podcast), download format MP3 yang ukurannya 10x lebih kecil." },
              ].map((tip, i) => (
                <div key={i} className="p-4 rounded-xl bg-card border border-border">
                  <p className="text-sm font-semibold text-foreground mb-1">{tip.title}</p>
                  <p className="text-xs text-muted-foreground">{tip.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Related Tools */}
        <section className="px-4 sm:px-6 pb-12">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-lg font-bold text-foreground mb-4 font-[family-name:var(--font-montserrat)]">
              Tools <span className="gradient-text">Lainnya</span>
            </h2>
            <div className="grid sm:grid-cols-3 gap-3">
              <Link href="/tools/format-comparison" className="p-4 rounded-xl bg-card border border-border hover:border-[#10B981]/30 transition-all group">
                <ArrowRightLeft className="h-5 w-5 text-[#10B981] mb-2" />
                <p className="text-sm font-semibold text-foreground group-hover:text-[#10B981] transition-colors">Perbandingan Format</p>
                <p className="text-xs text-muted-foreground">Bandingkan MP4, WEBM, AVI, dll</p>
              </Link>
              <Link href="/tools/trim-video" className="p-4 rounded-xl bg-card border border-border hover:border-[#10B981]/30 transition-all group">
                <FileVideo className="h-5 w-5 text-[#10B981] mb-2" />
                <p className="text-sm font-semibold text-foreground group-hover:text-[#10B981] transition-colors">Trim Video</p>
                <p className="text-xs text-muted-foreground">Potong bagian video yang kamu butuh</p>
              </Link>
              <Link href="/tools/convert-gif" className="p-4 rounded-xl bg-card border border-border hover:border-[#10B981]/30 transition-all group">
                <HardDrive className="h-5 w-5 text-[#10B981] mb-2" />
                <p className="text-sm font-semibold text-foreground group-hover:text-[#10B981] transition-colors">Convert ke GIF</p>
                <p className="text-xs text-muted-foreground">Ubah video jadi GIF animasi</p>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-4 sm:px-6 pb-16">
          <div className="mx-auto max-w-3xl">
            <div className="rounded-2xl p-6 text-center bg-gradient-to-br from-[#10B981]/20 to-[#34D399]/10 border border-[#10B981]/30">
              <h2 className="text-xl font-bold text-foreground mb-2 font-[family-name:var(--font-montserrat)]">
                Siap Download Video?
              </h2>
              <p className="text-muted-foreground mb-5 text-sm max-w-md mx-auto">
                Gunakan Mova untuk download video dalam format & resolusi terbaik. Gratis dan cepat!
              </p>
              <Link href="/" className="inline-flex items-center gap-2 bg-[#10B981] text-white font-semibold rounded-xl hover:bg-[#059669] px-8 h-12 text-base transition-colors">
                Mulai Download Gratis
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SitewideFooter />
    </div>
  );
}

"use client";

import React, { useState, useMemo } from "react";
import {
  Headphones,
  Music,
  Sliders,
  Info,
  ArrowRightLeft,
  HardDrive,
} from "lucide-react";
import Link from "next/link";
import { MovaLogo } from "@/components/mova-logo";
import { SitewideFooter } from "@/components/sitewide-footer";

const AUDIO_FORMATS = [
  { id: "mp3-128", label: "MP3 128kbps", bitrate: 128, codec: "MP3", quality: "Standard", color: "text-blue-500", bg: "bg-blue-500/10", border: "border-blue-500/20" },
  { id: "mp3-192", label: "MP3 192kbps", bitrate: 192, codec: "MP3", quality: "Good", color: "text-blue-600", bg: "bg-blue-600/10", border: "border-blue-600/20" },
  { id: "mp3-256", label: "MP3 256kbps", bitrate: 256, codec: "MP3", quality: "High", color: "text-blue-700", bg: "bg-blue-700/10", border: "border-blue-700/20" },
  { id: "mp3-320", label: "MP3 320kbps", bitrate: 320, codec: "MP3", quality: "Excellent", color: "text-indigo-500", bg: "bg-indigo-500/10", border: "border-indigo-500/20" },
  { id: "aac-128", label: "AAC 128kbps", bitrate: 128, codec: "AAC", quality: "Standard", color: "text-green-500", bg: "bg-green-500/10", border: "border-green-500/20" },
  { id: "aac-256", label: "AAC 256kbps", bitrate: 256, codec: "AAC", quality: "High", color: "text-green-600", bg: "bg-green-600/10", border: "border-green-600/20" },
  { id: "ogg-192", label: "OGG Vorbis 192kbps", bitrate: 192, codec: "Vorbis", quality: "Good", color: "text-orange-500", bg: "bg-orange-500/10", border: "border-orange-500/20" },
  { id: "flac", label: "FLAC (Lossless)", bitrate: 1000, codec: "FLAC", quality: "Lossless", color: "text-purple-500", bg: "bg-purple-500/10", border: "border-purple-500/20" },
];

function formatSize(mb: number): string {
  if (mb < 1) return `${(mb * 1024).toFixed(0)} KB`;
  if (mb < 1024) return `${mb.toFixed(1)} MB`;
  return `${(mb / 1024).toFixed(2)} GB`;
}

export default function BitrateCalculatorPage() {
  const [duration, setDuration] = useState(5);
  const [selectedFormat, setSelectedFormat] = useState("mp3-320");

  const calculations = useMemo(() => {
    return AUDIO_FORMATS.map((fmt) => {
      const sizeMB = (fmt.bitrate * duration * 60) / (8 * 1024);
      return { ...fmt, sizeMB };
    });
  }, [duration]);

  const selectedCalc = calculations.find((c) => c.id === selectedFormat);

  return (
    <div className="min-h-screen flex flex-col bg-card text-foreground">
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
              Beranda
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <div className="mx-auto max-w-5xl px-4 pt-6">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <li><Link href="/" className="hover:text-[#E52222] transition-colors">Beranda</Link></li>
              <li>/</li>
              <li><Link href="/tools" className="hover:text-[#E52222] transition-colors">Tools</Link></li>
              <li>/</li>
              <li className="text-[#E52222] font-medium">Kalkulator Bitrate Audio</li>
            </ol>
          </nav>
        </div>

        <section className="relative pt-8 pb-10 px-4 sm:px-6">
          <div className="mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E52222]/10 border border-[#E52222]/20 mb-4">
              <Headphones className="h-3.5 w-3.5 text-[#E52222]" />
              <span className="text-xs font-semibold text-[#E52222]">Tools Interaktif</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold mb-3 leading-tight font-[family-name:var(--font-montserrat)]">
              Kalkulator <span className="gradient-text">Bitrate Audio</span>
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Hitung ukuran file audio berdasarkan bitrate, codec, dan durasi. Bandingkan MP3, AAC, OGG, dan FLAC!
            </p>
          </div>
        </section>

        {/* Duration */}
        <section className="px-4 sm:px-6 pb-6">
          <div className="mx-auto max-w-4xl">
            <label className="text-sm font-bold text-foreground mb-3 block font-[family-name:var(--font-montserrat)]">
              <Music className="h-4 w-4 inline mr-1.5 text-[#E52222]" />
              Durasi Audio: {duration} menit
            </label>
            <input
              type="range"
              min={1}
              max={180}
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              className="w-full accent-[#E52222]"
              aria-label="Durasi audio dalam menit"
            />
            <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
              <span>1 mnt</span>
              <span>30 mnt</span>
              <span>60 mnt</span>
              <span>120 mnt</span>
              <span>180 mnt</span>
            </div>
          </div>
        </section>

        {/* Results */}
        <section className="px-4 sm:px-6 pb-10">
          <div className="mx-auto max-w-4xl">
            <h3 className="text-sm font-bold text-foreground mb-3 font-[family-name:var(--font-montserrat)]">
              <HardDrive className="h-4 w-4 inline mr-1.5 text-[#E52222]" />
              Estimasi Ukuran File Audio ({duration} menit)
            </h3>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
              {calculations.map((calc) => (
                <button
                  key={calc.id}
                  onClick={() => setSelectedFormat(calc.id)}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    selectedFormat === calc.id
                      ? `${calc.border} ${calc.bg} ring-1 ring-current ${calc.color}`
                      : "border-border hover:border-muted-foreground/30"
                  }`}
                >
                  <p className={`text-xs font-bold mb-1 ${selectedFormat === calc.id ? calc.color : "text-foreground"}`}>
                    {calc.codec}
                  </p>
                  <p className="text-lg font-bold text-foreground">{formatSize(calc.sizeMB)}</p>
                  <p className="text-[10px] text-muted-foreground">
                    {calc.bitrate === 1000 ? "Lossless" : `${calc.bitrate}kbps`} • {calc.quality}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Selected detail */}
        {selectedCalc && (
          <section className="px-4 sm:px-6 pb-10">
            <div className="mx-auto max-w-4xl">
              <div className="rounded-2xl border border-border bg-card p-5">
                <h3 className="text-sm font-bold text-foreground mb-3 font-[family-name:var(--font-montserrat)]">
                  Detail: {selectedCalc.label}
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase">Codec</p>
                    <p className="text-sm font-bold text-foreground">{selectedCalc.codec}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase">Bitrate</p>
                    <p className="text-sm font-bold text-foreground">{selectedCalc.bitrate === 1000 ? "~1000" : selectedCalc.bitrate} kbps</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase">Ukuran</p>
                    <p className="text-sm font-bold text-[#E52222]">{formatSize(selectedCalc.sizeMB)}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase">Kualitas</p>
                    <p className="text-sm font-bold text-foreground">{selectedCalc.quality}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Audio Quality Guide */}
        <section className="px-4 sm:px-6 pb-10">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-lg font-bold text-foreground mb-4 font-[family-name:var(--font-montserrat)]">
              Panduan <span className="gradient-text">Kualitas Audio</span>
            </h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { title: "128kbps — Cukup untuk podcast", desc: "Bitrate rendah cocok untuk suara bicara. File kecil, tapi musik terdengar kurang detail." },
                { title: "192-256kbps — Seimbang", desc: "Sweet spot antara ukuran file dan kualitas. Bagus untuk dengarkan musik sehari-hari di HP." },
                { title: "320kbps — Kualitas terbaik (lossy)", desc: "Bitrate tertinggi untuk MP3/AAC. Hampir tidak bisa dibedakan dari CD oleh telinga biasa." },
                { title: "FLAC — Lossless / tanpa kompresi", desc: "Kualitas identik dengan CD asli, tapi file 5-10x lebih besar. Cocok untuk audiophile & arsip." },
              ].map((tip, i) => (
                <div key={i} className="p-4 rounded-xl bg-card border border-border">
                  <p className="text-sm font-semibold text-foreground mb-1">{tip.title}</p>
                  <p className="text-xs text-muted-foreground">{tip.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Info */}
        <section className="px-4 sm:px-6 pb-10">
          <div className="mx-auto max-w-4xl">
            <div className="p-3 rounded-xl bg-[#E52222]/5 border border-[#E52222]/10 flex items-start gap-2">
              <Info className="h-4 w-4 text-[#E52222] shrink-0 mt-0.5" />
              <p className="text-xs text-muted-foreground">
                Estimasi berdasarkan bitrate konstan (CBR). File dengan variable bitrate (VBR) bisa berbeda. FLAC bitrate bervariasi tergantung kompleksitas audio; 1000kbps adalah rata-rata.
              </p>
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
              {[
                { href: "/tools/file-size-calculator", title: "Kalkulator Ukuran Video", desc: "Estimasi ukuran file video", icon: HardDrive },
                { href: "/tools/format-comparison", title: "Perbandingan Format", desc: "Bandingkan MP4, WEBM, dll", icon: ArrowRightLeft },
                { href: "/tools/resolution-comparator", title: "Komparator Resolusi", desc: "Bandingkan 240p sampai 8K", icon: Sliders },
              ].map((tool) => (
                <Link key={tool.href} href={tool.href} className="p-4 rounded-xl bg-card border border-border hover:border-[#E52222]/30 transition-all group">
                  <tool.icon className="h-5 w-5 text-[#E52222] mb-2" />
                  <p className="text-sm font-semibold text-foreground group-hover:text-[#E52222] transition-colors">{tool.title}</p>
                  <p className="text-xs text-muted-foreground">{tool.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-4 sm:px-6 pb-16">
          <div className="mx-auto max-w-3xl">
            <div className="rounded-2xl p-6 text-center bg-gradient-to-br from-[#E52222]/20 to-[#FF6B35]/10 border border-[#E52222]/30">
              <h2 className="text-xl font-bold text-foreground mb-2 font-[family-name:var(--font-montserrat)]">
                Ekstrak Audio dari Video?
              </h2>
              <p className="text-muted-foreground mb-5 text-sm max-w-md mx-auto">
                Gunakan Mova untuk download audio MP3 dari YouTube dan platform lainnya. Gratis dan cepat!
              </p>
              <Link href="/youtube-mp3" className="inline-flex items-center gap-2 bg-[#E52222] text-white font-semibold rounded-xl hover:bg-[#C91C1C] px-8 h-12 text-base transition-colors">
                Download MP3 Gratis
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SitewideFooter />
    </div>
  );
}

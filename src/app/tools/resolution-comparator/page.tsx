"use client";

import React, { useState, useMemo } from "react";
import {
  Monitor,
  Smartphone,
  Tablet,
  Tv,
  Maximize,
  Info,
  ArrowRightLeft,
  HardDrive,
  Clock,
  Wifi,
} from "lucide-react";
import Link from "next/link";
import { MovaLogo } from "@/components/mova-logo";
import { SitewideFooter } from "@/components/sitewide-footer";

const RESOLUTIONS = [
  {
    id: "240p",
    label: "240p",
    name: "QVGA",
    width: 426,
    height: 240,
    pixels: 102240,
    bitrate: 0.8,
    icon: Smartphone,
    useCase: "Chat video, thumbnail preview",
    color: "text-red-500",
    bg: "bg-red-500/10",
    border: "border-red-500/20",
  },
  {
    id: "360p",
    label: "360p",
    name: "SD",
    width: 640,
    height: 360,
    pixels: 230400,
    bitrate: 1.2,
    icon: Smartphone,
    useCase: "Video chat, streaming hemat kuota",
    color: "text-orange-500",
    bg: "bg-orange-500/10",
    border: "border-orange-500/20",
  },
  {
    id: "480p",
    label: "480p",
    name: "SD",
    width: 854,
    height: 480,
    pixels: 409920,
    bitrate: 2.5,
    icon: Smartphone,
    useCase: "Nonton di HP, koneksi lambat",
    color: "text-amber-500",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
  },
  {
    id: "720p",
    label: "720p",
    name: "HD",
    width: 1280,
    height: 720,
    pixels: 921600,
    bitrate: 5,
    icon: Tablet,
    useCase: "Nonton di tablet/laptop, standar YouTube",
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
  },
  {
    id: "1080p",
    label: "1080p",
    name: "Full HD",
    width: 1920,
    height: 1080,
    pixels: 2073600,
    bitrate: 8,
    icon: Monitor,
    useCase: "Nonton di laptop/monitor, kualitas terbaik umum",
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
  },
  {
    id: "1440p",
    label: "1440p",
    name: "2K / QHD",
    width: 2560,
    height: 1440,
    pixels: 3686400,
    bitrate: 16,
    icon: Monitor,
    useCase: "Monitor gaming, editing video",
    color: "text-teal-500",
    bg: "bg-teal-500/10",
    border: "border-teal-500/20",
  },
  {
    id: "4k",
    label: "4K",
    name: "UHD",
    width: 3840,
    height: 2160,
    pixels: 8294400,
    bitrate: 25,
    icon: Tv,
    useCase: "TV 4K, proyektor, konten premium",
    color: "text-purple-500",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
  },
  {
    id: "8k",
    label: "8K",
    name: "FUHD",
    width: 7680,
    height: 4320,
    pixels: 33177600,
    bitrate: 50,
    icon: Maximize,
    useCase: "Production, layar besar premium",
    color: "text-rose-500",
    bg: "bg-rose-500/10",
    border: "border-rose-500/20",
  },
];

const SPEEDS = [
  { label: "3G", mbps: 0.4 },
  { label: "4G", mbps: 15 },
  { label: "Wi-Fi", mbps: 50 },
  { label: "Fiber", mbps: 300 },
];

function formatSize(mb: number): string {
  if (mb < 1) return `${(mb * 1024).toFixed(0)} KB`;
  if (mb < 1024) return `${mb.toFixed(1)} MB`;
  return `${(mb / 1024).toFixed(2)} GB`;
}

function formatTime(seconds: number): string {
  if (seconds < 60) return `${seconds.toFixed(0)} dtk`;
  if (seconds < 3600) return `${(seconds / 60).toFixed(1)} mnt`;
  return `${(seconds / 3600).toFixed(1)} jam`;
}

export default function ResolutionComparatorPage() {
  const [selected, setSelected] = useState<string[]>(["720p", "1080p"]);
  const [duration, setDuration] = useState(10);

  const toggleResolution = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id].slice(-3)
    );
  };

  const selectedRes = useMemo(
    () => RESOLUTIONS.filter((r) => selected.includes(r.id)),
    [selected]
  );

  const maxPixels = Math.max(...RESOLUTIONS.map((r) => r.pixels));

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
              <li><Link href="/" className="hover:text-[#10B981] transition-colors">Beranda</Link></li>
              <li>/</li>
              <li><Link href="/tools" className="hover:text-[#10B981] transition-colors">Tools</Link></li>
              <li>/</li>
              <li className="text-[#10B981] font-medium">Komparator Resolusi</li>
            </ol>
          </nav>
        </div>

        <section className="relative pt-8 pb-10 px-4 sm:px-6">
          <div className="mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#10B981]/10 border border-[#10B981]/20 mb-4">
              <Monitor className="h-3.5 w-3.5 text-[#10B981]" />
              <span className="text-xs font-semibold text-[#10B981]">Tools Interaktif</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold mb-3 leading-tight font-[family-name:var(--font-montserrat)]">
              Komparator <span className="gradient-text">Resolusi Video</span>
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Bandingkan resolusi video dari 240p sampai 8K secara visual. Pilih hingga 3 resolusi untuk dibandingkan ukuran file, pixel, dan waktu download.
            </p>
          </div>
        </section>

        {/* Resolution Selector */}
        <section className="px-4 sm:px-6 pb-6">
          <div className="mx-auto max-w-4xl">
            <h3 className="text-sm font-bold text-foreground mb-3 font-[family-name:var(--font-montserrat)]">
              Pilih Resolusi (maks. 3)
            </h3>
            <div className="flex flex-wrap gap-2">
              {RESOLUTIONS.map((res) => {
                const isSelected = selected.includes(res.id);
                return (
                  <button
                    key={res.id}
                    onClick={() => toggleResolution(res.id)}
                    className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border text-sm font-semibold transition-all ${
                      isSelected
                        ? `${res.border} ${res.bg} ${res.color} ring-1 ring-current`
                        : "border-border text-muted-foreground hover:border-muted-foreground/30"
                    }`}
                  >
                    {res.label}
                    <span className="text-[10px] font-normal opacity-70">({res.name})</span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Duration Slider */}
        <section className="px-4 sm:px-6 pb-8">
          <div className="mx-auto max-w-4xl">
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
              <span>1 mnt</span>
              <span>30 mnt</span>
              <span>60 mnt</span>
              <span>120 mnt</span>
              <span>180 mnt</span>
            </div>
          </div>
        </section>

        {/* Visual Comparison */}
        {selectedRes.length > 0 && (
          <section className="px-4 sm:px-6 pb-10">
            <div className="mx-auto max-w-4xl">
              <h3 className="text-sm font-bold text-foreground mb-4 font-[family-name:var(--font-montserrat)]">
                <Monitor className="h-4 w-4 inline mr-1.5 text-[#10B981]" />
                Perbandingan Visual
              </h3>

              {/* Pixel area comparison */}
              <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 mb-6">
                <p className="text-xs text-muted-foreground mb-4">
                  Area proporsional berdasarkan jumlah pixel (relatif terhadap resolusi terbesar)
                </p>
                <div className="flex items-end justify-center gap-6 sm:gap-8 min-h-[200px]">
                  {selectedRes.map((res) => {
                    const scale = Math.sqrt(res.pixels / maxPixels);
                    const maxH = 180;
                    const h = Math.max(30, maxH * scale);
                    const w = Math.max(40, 160 * scale);
                    return (
                      <div key={res.id} className="flex flex-col items-center gap-2">
                        <div
                          className={`rounded-lg ${res.bg} border ${res.border} flex items-center justify-center transition-all duration-500`}
                          style={{ width: `${w}px`, height: `${h}px` }}
                        >
                          <span className={`text-xs font-bold ${res.color}`}>{res.label}</span>
                        </div>
                        <div className="text-center">
                          <p className="text-sm font-bold text-foreground">{res.label}</p>
                          <p className="text-[10px] text-muted-foreground">{res.width}x{res.height}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Detail comparison table */}
              <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 pr-4 text-muted-foreground font-semibold text-xs">Metrik</th>
                      {selectedRes.map((res) => (
                        <th key={res.id} className={`text-center py-2 px-3 ${res.color} font-bold`}>
                          {res.label} ({res.name})
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border/50">
                      <td className="py-2 pr-4 text-muted-foreground text-xs">Resolusi</td>
                      {selectedRes.map((res) => (
                        <td key={res.id} className="text-center py-2 px-3 text-foreground font-medium">
                          {res.width} x {res.height}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 pr-4 text-muted-foreground text-xs">Total Pixel</td>
                      {selectedRes.map((res) => (
                        <td key={res.id} className="text-center py-2 px-3 text-foreground font-medium">
                          {(res.pixels / 1000000).toFixed(2)} MP
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 pr-4 text-muted-foreground text-xs">Bitrate</td>
                      {selectedRes.map((res) => (
                        <td key={res.id} className="text-center py-2 px-3 text-foreground font-medium">
                          ~{res.bitrate} Mbps
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 pr-4 text-muted-foreground text-xs">
                        <HardDrive className="h-3 w-3 inline mr-1" />
                        Ukuran ({duration} mnt)
                      </td>
                      {selectedRes.map((res) => {
                        const sizeMB = (res.bitrate * duration * 60) / 8;
                        return (
                          <td key={res.id} className="text-center py-2 px-3 text-foreground font-bold">
                            {formatSize(sizeMB)}
                          </td>
                        );
                      })}
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 pr-4 text-muted-foreground text-xs">
                        <Wifi className="h-3 w-3 inline mr-1" />
                        DL (4G)
                      </td>
                      {selectedRes.map((res) => {
                        const sizeMB = (res.bitrate * duration * 60) / 8;
                        const sizeMbit = sizeMB * 8;
                        const time = sizeMbit / 15;
                        return (
                          <td key={res.id} className="text-center py-2 px-3 text-foreground font-medium">
                            {formatTime(time)}
                          </td>
                        );
                      })}
                    </tr>
                    <tr>
                      <td className="py-2 pr-4 text-muted-foreground text-xs">Cocok Untuk</td>
                      {selectedRes.map((res) => (
                        <td key={res.id} className="text-center py-2 px-3 text-foreground text-xs">
                          {res.useCase}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        {/* Quick Recommendations */}
        <section className="px-4 sm:px-6 pb-10">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-lg font-bold text-foreground mb-4 font-[family-name:var(--font-montserrat)]">
              Rekomendasi <span className="gradient-text">Resolusi</span>
            </h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                {
                  device: "HP (layar kecil)",
                  res: "480p - 720p",
                  reason: "Layar HP tidak butuh resolusi tinggi. 720p sudah terlihat tajam dan hemat kuota.",
                  icon: Smartphone,
                },
                {
                  device: "Laptop / Tablet",
                  res: "1080p",
                  reason: "Full HD adalah sweet spot untuk layar 13-15 inch. Kualitas bagus tanpa file terlalu besar.",
                  icon: Tablet,
                },
                {
                  device: "Monitor / TV",
                  res: "1440p - 4K",
                  reason: "Layar besar butuh pixel lebih agar tidak pecah. 4K optimal untuk TV 55 inch ke atas.",
                  icon: Tv,
                },
                {
                  device: "Koneksi Lambat",
                  res: "360p - 480p",
                  reason: "Saat kuota terbatas atau sinyal lemah, resolusi rendah tetap bisa dinikmati tanpa buffering.",
                  icon: Wifi,
                },
              ].map((rec, i) => (
                <div key={i} className="p-4 rounded-xl bg-card border border-border">
                  <rec.icon className="h-5 w-5 text-[#10B981] mb-2" />
                  <p className="text-sm font-semibold text-foreground mb-1">{rec.device}</p>
                  <p className="text-xs text-[#10B981] font-bold mb-1">{rec.res}</p>
                  <p className="text-xs text-muted-foreground">{rec.reason}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="px-4 sm:px-6 pb-10">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-lg font-bold text-foreground mb-4 font-[family-name:var(--font-montserrat)]">
              Pertanyaan <span className="gradient-text">Umum</span>
            </h2>
            <div className="space-y-3">
              {[
                {
                  q: "Apa bedanya HD dan Full HD?",
                  a: "HD (720p) memiliki resolusi 1280x720 pixel (921.600 pixel total). Full HD (1080p) memiliki 1920x1080 pixel (2.073.600 pixel) — lebih dari 2x lipat HD. Full HD terlihat lebih tajam, terutama di layar besar, tapi file-nya juga lebih besar.",
                },
                {
                  q: "Apakah 4K worth it untuk download?",
                  a: "Tergantung perangkatmu. Jika kamu nonton di TV 4K atau monitor besar, ya. Tapi di HP atau laptop biasa, perbedaan 1080p vs 4K hampir tidak terlihat padahal file 4K bisa 3-5x lebih besar.",
                },
                {
                  q: "Kenapa file 1080p saya besar sekali?",
                  a: "Ukuran file tidak hanya ditentukan resolusi, tapi juga bitrate dan codec. Video dengan banyak gerakan (olahraga, game) butuh bitrate lebih tinggi. Codec modern seperti H.265/HEVC bisa menghasilkan file lebih kecil dengan kualitas sama.",
                },
              ].map((faq, i) => (
                <details key={i} className="group rounded-xl bg-card border border-border overflow-hidden">
                  <summary className="flex items-center justify-between p-4 cursor-pointer list-none hover:bg-muted/50 transition-colors">
                    <span className="text-sm font-semibold text-foreground pr-4">{faq.q}</span>
                    <ArrowRightLeft className="h-4 w-4 text-muted-foreground shrink-0 rotate-90 group-open:rotate-270 transition-transform" />
                  </summary>
                  <div className="px-4 pb-4 pt-0">
                    <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                  </div>
                </details>
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
              {[
                { href: "/tools/format-comparison", title: "Perbandingan Format", desc: "Bandingkan MP4, WEBM, AVI", icon: ArrowRightLeft },
                { href: "/tools/file-size-calculator", title: "Kalkulator Ukuran", desc: "Estimasi ukuran file video", icon: HardDrive },
                { href: "/tools/trim-video", title: "Trim Video", desc: "Potong bagian video", icon: Monitor },
              ].map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="p-4 rounded-xl bg-card border border-border hover:border-[#10B981]/30 transition-all group"
                >
                  <tool.icon className="h-5 w-5 text-[#10B981] mb-2" />
                  <p className="text-sm font-semibold text-foreground group-hover:text-[#10B981] transition-colors">
                    {tool.title}
                  </p>
                  <p className="text-xs text-muted-foreground">{tool.desc}</p>
                </Link>
              ))}
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
                Gunakan Mova untuk download video dalam resolusi terbaik. Gratis dan cepat!
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 bg-[#10B981] text-white font-semibold rounded-xl hover:bg-[#059669] px-8 h-12 text-base transition-colors"
              >
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

"use client";

import React, { useState, useEffect } from "react";
import {
  History,
  Trash2,
  Download,
  ExternalLink,
  Clock,
  Monitor,
} from "lucide-react";
import Link from "next/link";
import { MovaLogo } from "@/components/mova-logo";
import { SitewideFooter } from "@/components/sitewide-footer";

interface DownloadEntry {
  id: string;
  title: string;
  platform: string;
  quality: string;
  format: string;
  url: string;
  timestamp: number;
}

const PLATFORM_COLORS: Record<string, string> = {
  TikTok: "#010101",
  YouTube: "#FF0000",
  Instagram: "#E1306C",
  Facebook: "#1877F2",
  Twitter: "#14171A",
  Pinterest: "#E60023",
  Reddit: "#FF4500",
  Telegram: "#26A5E4",
};

function formatDate(ts: number): string {
  const d = new Date(ts);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "Baru saja";
  if (diffMins < 60) return `${diffMins} menit lalu`;
  if (diffHours < 24) return `${diffHours} jam lalu`;
  if (diffDays < 7) return `${diffDays} hari lalu`;
  return d.toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
}

export default function DownloadHistoryPage() {
  const [entries, setEntries] = useState<DownloadEntry[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("mova-download-history");
      if (raw) {
        setEntries(JSON.parse(raw));
      }
    } catch {}
    setLoaded(true);
  }, []);

  const clearHistory = () => {
    localStorage.removeItem("mova-download-history");
    setEntries([]);
  };

  const removeEntry = (id: string) => {
    const updated = entries.filter((e) => e.id !== id);
    setEntries(updated);
    localStorage.setItem("mova-download-history", JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen flex flex-col bg-card text-foreground">
      <header className="border-b border-border bg-card">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-4">
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
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <li><Link href="/" className="hover:text-[#E52222] transition-colors">Beranda</Link></li>
              <li>/</li>
              <li className="text-[#E52222] font-medium">Riwayat Download</li>
            </ol>
          </nav>

          <div className="flex items-center justify-between mb-8">
            <div>
              <h1
                className="text-3xl font-bold text-foreground"
                style={{ fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif" }}
              >
                <History className="h-7 w-7 inline mr-2 text-[#E52222]" />
                Riwayat Download
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Riwayat download kamu tersimpan lokal di browser ini.
              </p>
            </div>
            {entries.length > 0 && (
              <button
                onClick={clearHistory}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-red-500 hover:bg-red-500/10 transition-colors"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Hapus Semua
              </button>
            )}
          </div>

          {!loaded ? (
            <div className="text-center py-16">
              <div className="animate-pulse text-muted-foreground">Memuat...</div>
            </div>
          ) : entries.length === 0 ? (
            <div className="text-center py-16">
              <History className="h-16 w-16 text-muted-foreground/20 mx-auto mb-4" />
              <h2
                className="text-xl font-bold text-foreground mb-2"
                style={{ fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif" }}
              >
                Belum Ada Riwayat
              </h2>
              <p className="text-muted-foreground text-sm max-w-md mx-auto mb-6">
                Riwayat download kamu akan muncul di sini setelah kamu download video. Data hanya disimpan di browser kamu.
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold bg-[#E52222] text-white hover:bg-[#C91C1C] transition-colors"
              >
                <Download className="h-4 w-4" />
                Mulai Download
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {entries.map((entry) => (
                <div
                  key={entry.id}
                  className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:border-[#E52222]/20 transition-colors"
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 text-white text-sm font-bold"
                    style={{ background: PLATFORM_COLORS[entry.platform] || "#777" }}
                  >
                    {entry.platform[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate">
                      {entry.title || entry.url}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                      <span className="flex items-center gap-1">
                        <Monitor className="h-3 w-3" />
                        {entry.platform}
                      </span>
                      <span>{entry.quality}</span>
                      <span>{entry.format}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {formatDate(entry.timestamp)}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {entry.url && (
                      <a
                        href={entry.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg text-muted-foreground hover:text-[#E52222] hover:bg-[#E52222]/10 transition-colors"
                        title="Buka link asli"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                    <button
                      onClick={() => removeEntry(entry.id)}
                      className="p-2 rounded-lg text-muted-foreground hover:text-red-500 hover:bg-red-500/10 transition-colors"
                      title="Hapus"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
              <p className="text-xs text-muted-foreground/50 text-center mt-6">
                Data riwayat disimpan secara lokal di browser dan tidak pernah dikirim ke server kami.
              </p>
            </div>
          )}
        </div>
      </main>

      <SitewideFooter />
    </div>
  );
}

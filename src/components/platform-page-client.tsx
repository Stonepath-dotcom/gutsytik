"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import {
  Download, Zap, Shield, Smartphone, CheckCircle,
  Loader2, AlertCircle, Play, Copy, ChevronRight, ArrowRight,
  Monitor, Music, Video, Eye, Clock, Globe, Sparkles, Link2,
} from "lucide-react";
import { SitewideFooter } from "@/components/sitewide-footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import { MovaLogo } from "@/components/mova-logo";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";

/* ──────── Types ──────── */
interface QualityOption { label: string; resolution: string; url: string; originalUrl?: string; }
interface DownloadResult {
  title: string; thumbnail: string; duration: string;
  author: string; platform: string; downloadUrl: string; originalDownloadUrl?: string;
  qualityOptions: QualityOption[]; filename: string;
  isRedirect?: boolean; redirectUrls?: string[];
}

interface FeatureItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface StepItem {
  title: string;
  description: string;
}

interface FaqItem {
  question: string;
  answer: string;
}

interface OtherPlatform {
  name: string;
  href: string;
  color: string;
  gradient?: string;
}

export interface PlatformPageProps {
  /* Platform identity */
  platformName: string;
  platformColor: string;
  platformGradient?: string;
  platformIcon: React.ReactNode;

  /* Hero */
  heroBadge: string;
  heroTitle: string;
  heroTitleHighlight: string;
  heroSubtitle: string;
  inputPlaceholder: string;

  /* Content */
  features: FeatureItem[];
  steps: StepItem[];
  faqs: FaqItem[];

  /* SEO content sections (HTML strings) */
  seoSections: { heading: string; content: React.ReactNode }[];

  /* CTA */
  ctaTitle: string;
  ctaSubtitle: string;

  /* Navigation */
  otherPlatforms: OtherPlatform[];
  blogLinks: { href: string; title: string }[];

  /* Related blog posts for "Panduan Terkait" section */
  relatedBlogPosts?: { title: string; slug: string }[];

  /* Breadcrumb */
  breadcrumbLabel: string;
}

const ACCENT = "#10B981";

/* ──────── Main Component ──────── */
export function PlatformPageClient(props: PlatformPageProps) {
  const {
    platformName, platformColor, platformGradient, platformIcon,
    heroBadge, heroTitle, heroTitleHighlight, heroSubtitle, inputPlaceholder,
    features, steps, faqs, seoSections,
    ctaTitle, ctaSubtitle,
    otherPlatforms, blogLinks, relatedBlogPosts, breadcrumbLabel,
  } = props;

  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DownloadResult | null>(null);
  const [error, setError] = useState("");
  const [selectedQuality, setSelectedQuality] = useState(0);
  const [downloading, setDownloading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState("");
  const resultRef = useRef<HTMLDivElement>(null);
  const { toast, dismiss } = useToast();

  const showToast = useCallback((title: string, desc: string, variant: "default" | "destructive" = "default") => {
    const id = toast({ title, description: desc, variant });
    setTimeout(() => dismiss(id), 3000);
  }, [toast, dismiss]);

  const handleAnalyze = useCallback(async () => {
    const trimmed = url.trim();
    if (!trimmed) { setError("Masukkan link video terlebih dahulu!"); return; }
    try { new URL(trimmed.startsWith("www.") ? "https://" + trimmed : trimmed); } catch { setError("URL tidak valid. Pastikan link yang dimasukkan benar."); return; }

    setLoading(true);
    setError("");
    setResult(null);
    setLoadingMsg("Mencari video...");

    const msgs = ["Mencari video...", "Mengambil data...", "Hampir selesai..."];
    let msgIdx = 0;
    const msgInterval = setInterval(() => {
      msgIdx = Math.min(msgIdx + 1, msgs.length - 1);
      setLoadingMsg(msgs[msgIdx]);
    }, 5000);

    try {
      const res = await fetch("/api/download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: trimmed, audioMode: false }),
      });
      const data = await res.json();
      if (res.ok) {
        setResult(data);
        setSelectedQuality(0);
        showToast("Video ditemukan!", "Pilih kualitas dan download.");
        setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 300);
      } else {
        setError(data.error || "Gagal terhubung ke server. Silakan coba lagi.");
      }
    } catch {
      setError("Gagal terhubung ke server. Silakan coba lagi.");
    } finally {
      clearInterval(msgInterval);
      setLoading(false);
      setLoadingMsg("");
    }
  }, [url, showToast]);

  const handleDownload = useCallback(async () => {
    if (!result || downloading) return;
    const q = result.qualityOptions[selectedQuality];
    if (!q) { showToast("Gagal mengunduh video.", "", "destructive"); return; }

    // If this is a redirect fallback, open external download service in new tab
    if (result.isRedirect) {
      window.open(q.url || result.downloadUrl, "_blank", "noopener,noreferrer");
      return;
    }

    const ext = q.resolution === "MP3" ? ".mp3" : ".mp4";
    const downloadName = (result.filename || `mova_${Date.now()}`) + `_${q.label}${ext}`;
    const downloadUrl = q.url;
    const fallbackUrl = q.originalUrl || q.url;

    setDownloading(true);
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
      showToast("Download dimulai!", "");
    } catch {
      try { window.open(fallbackUrl, "_blank"); } catch {
        showToast("Gagal mengunduh video. Coba klik kanan pada tombol download dan pilih 'Save link as...'", "", "destructive");
      }
    } finally {
      setDownloading(false);
    }
  }, [result, selectedQuality, downloading, showToast]);

  const handlePaste = useCallback(async () => {
    try { const text = await navigator.clipboard.readText(); setUrl(text); } catch {}
  }, []);

  return (
    <main className="min-h-screen flex flex-col bg-background">
      {/* ───── Navbar ───── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
        <div className="mx-auto max-w-5xl md:max-w-6xl h-12 md:h-16 flex items-center justify-between px-3 sm:px-4">
          <a href="/" className="flex items-center gap-1.5 shrink-0">
            <MovaLogo size={22} showText={false} />
            <span className="font-bold text-sm text-foreground" style={{ fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif" }}>getmova</span>
          </a>
          <nav className="hidden md:flex items-center gap-1">
            <a href="#download" className="px-2.5 py-1.5 text-[13px] font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted/50">Download</a>
            <a href="#features" className="px-2.5 py-1.5 text-[13px] font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted/50">Fitur</a>
            <a href="#cara-pakai" className="px-2.5 py-1.5 text-[13px] font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted/50">Cara Pakai</a>
            <a href="#faq" className="px-2.5 py-1.5 text-[13px] font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted/50">FAQ</a>
          </nav>
          <a href="#download">
            <Button size="sm" className="h-8 px-4 bg-[#10B981] text-white font-semibold rounded-lg hover:bg-[#059669] text-xs">
              <Download className="mr-1.5 h-3.5 w-3.5" />Download
            </Button>
          </a>
        </div>
      </header>

      {/* ───── Breadcrumb ───── */}
      <div className="pt-14 pb-2 px-3 sm:px-4">
        <div className="mx-auto max-w-4xl">
          <nav className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <a href="/" className="hover:text-foreground transition-colors">Home</a>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground font-medium">{breadcrumbLabel}</span>
          </nav>
        </div>
      </div>

      {/* ───── Hero Section ───── */}
      <section id="download" className="relative pt-6 md:pt-10 pb-12 md:pb-20 px-3 sm:px-4">
        {/* Background gradient */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] opacity-[0.07] rounded-full blur-[120px]"
            style={{ background: platformGradient || platformColor }}
          />
        </div>

        <div className="relative mx-auto max-w-2xl text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <Zap className="h-3.5 w-3.5 text-[#10B981]" />
            <span className="text-xs md:text-sm font-semibold text-[#10B981]">{heroBadge}</span>
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-3 font-[family-name:var(--font-montserrat)] leading-tight">
            {heroTitle}{" "}
            <span className="gradient-text">{heroTitleHighlight}</span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground mb-6 max-w-lg mx-auto">
            {heroSubtitle}
          </p>

          {/* Download Form */}
          <div className="relative flex items-center gap-2 max-w-xl mx-auto">
            <div className="flex-1 relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2">
                <div className="w-5 h-5 rounded flex items-center justify-center" style={{ background: platformGradient || platformColor }}>
                  {platformIcon}
                </div>
              </div>
              <Input
                value={url}
                onChange={e => setUrl(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleAnalyze()}
                placeholder={inputPlaceholder}
                className="h-11 bg-card border-border rounded-xl text-sm md:text-base pl-10 pr-4"
              />
            </div>
            <button onClick={handlePaste} className="h-11 px-3 rounded-xl border border-border bg-card text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors text-xs font-medium shrink-0">
              <Copy className="h-3.5 w-3.5 sm:mr-1.5" /><span className="hidden sm:inline">Tempel</span>
            </button>
            <Button onClick={handleAnalyze} disabled={loading} className="h-11 px-5 bg-[#10B981] text-white font-semibold rounded-xl hover:bg-[#059669] shrink-0 text-sm md:text-base">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4 sm:mr-1.5" />}
              <span className="hidden sm:inline">{loading ? (loadingMsg || "Download") : "Download"}</span>
            </Button>
          </div>

          {/* Loading indicator */}
          {loading && !error && (
            <div className="max-w-xl mx-auto mt-4 p-3 rounded-lg bg-[#10B981]/10 border border-[#10B981]/20 flex items-center gap-2">
              <Loader2 className="h-4 w-4 text-[#10B981] animate-spin shrink-0" />
              <p className="text-[#10B981] text-sm md:text-base text-left font-medium">{loadingMsg || "Memproses..."}</p>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="max-w-xl mx-auto mt-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 flex items-start gap-2">
              <AlertCircle className="h-4 w-4 text-red-400 mt-0.5 shrink-0" />
              <p className="text-red-400 text-sm md:text-base text-left">{error}</p>
            </div>
          )}

          {/* Result card */}
          {result && (
            <div ref={resultRef} className="max-w-xl mx-auto mt-4 rounded-xl bg-card border overflow-hidden" style={{ borderColor: `${ACCENT}30` }}>
              <div className="px-4 py-2 border-b border-border flex items-center gap-2" style={{ background: `linear-gradient(to right, ${ACCENT}15, #34D39915)` }}>
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span className="text-sm md:text-base text-green-400 font-medium">Video berhasil ditemukan!</span>
                <span className="text-xs md:text-sm text-muted-foreground bg-muted px-2 py-0.5 rounded-full ml-auto">{result.platform}</span>
              </div>
              <div className="p-4">
                <div className="flex gap-3 mb-3">
                  <div className="w-24 h-16 rounded-lg bg-muted flex items-center justify-center shrink-0 overflow-hidden relative">
                    {result.thumbnail && <Image src={result.thumbnail} alt={`Thumbnail: ${result.title}`} width={96} height={64} className="w-full h-full object-cover" unoptimized onError={() => {}} loading="lazy" />}
                    <Play className="h-6 w-6 absolute text-[#10B981]" />
                  </div>
                  <div className="flex-1 text-left min-w-0">
                    <h3 className="font-semibold text-foreground text-sm md:text-base line-clamp-2">{result.title}</h3>
                    <div className="flex items-center gap-3 mt-1 text-xs md:text-sm text-muted-foreground">
                      {result.duration !== "--:--" && <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{result.duration}</span>}
                      {result.author && <span>{result.author}</span>}
                    </div>
                  </div>
                </div>

                {/* Quality options */}
                {result.qualityOptions.length > 1 && (
                  <div className="mb-3">
                    <p className="text-xs md:text-sm text-muted-foreground mb-2">Pilih kualitas:</p>
                    <div className="flex flex-wrap gap-1.5">
                      {result.qualityOptions.map((q, i) => (
                        <button
                          key={i}
                          onClick={() => setSelectedQuality(i)}
                          className={`px-3 py-1.5 rounded-lg text-xs md:text-sm font-medium transition-colors ${
                            i === selectedQuality
                              ? "bg-[#10B981] text-white"
                              : "bg-muted text-muted-foreground hover:bg-muted/80"
                          }`}
                        >
                          {q.label} {q.resolution !== q.label && `(${q.resolution})`}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Redirect notice */}
                {result.isRedirect && (
                  <div className="mb-3 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 text-amber-400 mt-0.5 shrink-0" />
                    <p className="text-amber-400 text-xs md:text-sm">Download langsung sedang tidak tersedia. Klik tombol di bawah untuk mengunduh melalui layanan pihak ketiga.</p>
                  </div>
                )}

                <Button
                  onClick={handleDownload}
                  disabled={downloading}
                  className="w-full bg-[#10B981] text-white font-semibold rounded-xl hover:bg-[#059669] h-11 text-sm md:text-base"
                >
                  {downloading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Download className="h-4 w-4 mr-2" />}
                  {downloading ? "Mengunduh..." : result.isRedirect ? "Download via Layanan Lain" : "Download Sekarang"}
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ───── Features Section ───── */}
      <section id="features" className="py-12 md:py-20 px-3 sm:px-4">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-8">
            <h2 className="text-xl sm:text-2xl md:text-4xl font-extrabold font-[family-name:var(--font-montserrat)] mb-2">
              Fitur Unggulan <span className="gradient-text">{platformName} Downloader</span>
            </h2>
            <p className="text-sm md:text-base text-muted-foreground max-w-md mx-auto">
              Download video {platformName} dengan fitur terbaik dari Mova.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f, i) => (
              <div key={i} className="bento-card p-5 md:p-7 group hover:border-[#10B981]/30 transition-all">
                <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl flex items-center justify-center mb-3" style={{ background: `${platformColor}15` }}>
                  <div className="text-[#10B981] md:text-lg">{f.icon}</div>
                </div>
                <h3 className="font-semibold text-foreground text-sm md:text-base mb-1.5">{f.title}</h3>
                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── How To Use Section ───── */}
      <section id="cara-pakai" className="py-12 md:py-20 px-3 sm:px-4 bg-muted/30">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-8">
            <h2 className="text-xl sm:text-2xl md:text-4xl font-extrabold font-[family-name:var(--font-montserrat)] mb-2">
              Cara Download Video <span className="gradient-text">{platformName}</span>
            </h2>
            <p className="text-sm md:text-base text-muted-foreground max-w-md mx-auto">
              Hanya {steps.length} langkah mudah untuk download video {platformName}.
            </p>
          </div>

          <div className="space-y-4 max-w-2xl mx-auto">
            {steps.map((s, i) => (
              <div key={i} className="flex gap-4 items-start p-4 md:p-6 rounded-xl bg-card border border-border">
                <div className="w-9 h-9 md:w-12 md:h-12 rounded-full bg-[#10B981] flex items-center justify-center shrink-0">
                  <span className="text-white font-bold text-sm md:text-base">{i + 1}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-sm md:text-base mb-1">{s.title}</h3>
                  <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">{s.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── SEO Content Sections ───── */}
      <section className="py-12 md:py-20 px-3 sm:px-4">
        <div className="mx-auto max-w-3xl prose-blog">
          {seoSections.map((section, i) => (
            <div key={i}>
              <h2>{section.heading}</h2>
              {section.content}
            </div>
          ))}
        </div>
      </section>

      {/* ───── Panduan Terkait (Related Blog Posts) ───── */}
      {relatedBlogPosts && relatedBlogPosts.length > 0 && (
        <section className="py-12 md:py-20 px-3 sm:px-4">
          <div className="mx-auto max-w-4xl">
            <div className="text-center mb-8">
              <h2 className="text-xl sm:text-2xl md:text-4xl font-extrabold font-[family-name:var(--font-montserrat)] mb-2">
                Panduan <span className="gradient-text">Terkait</span>
              </h2>
              <p className="text-sm md:text-base text-muted-foreground max-w-md mx-auto">
                Baca panduan lengkap tentang cara download video dari berbagai platform.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {relatedBlogPosts.map((post) => (
                <a
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group rounded-xl p-5 md:p-7 bg-card border border-border hover:border-[#10B981]/30 transition-all duration-200"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#10B981]/10 flex items-center justify-center mb-3">
                    <Sparkles className="h-4 w-4 text-[#10B981]" />
                  </div>
                  <h3 className="font-semibold text-foreground text-sm md:text-base mb-1 group-hover:text-[#10B981] transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <span className="text-xs md:text-sm text-muted-foreground">Baca selengkapnya →</span>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ───── FAQ Section ───── */}
      <section id="faq" className="py-12 md:py-20 px-3 sm:px-4 bg-muted/30">
        <div className="mx-auto max-w-3xl">
          <div className="text-center mb-8">
            <h2 className="text-xl sm:text-2xl md:text-4xl font-extrabold font-[family-name:var(--font-montserrat)] mb-2">
              Pertanyaan Umum tentang <span className="gradient-text">{platformName} Downloader</span>
            </h2>
            <p className="text-sm md:text-base text-muted-foreground max-w-md mx-auto">
              Temukan jawaban dari pertanyaan yang sering ditanyakan.
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-2">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="bg-card border border-border rounded-xl px-4 data-[state=open]:border-[#10B981]/30">
                <AccordionTrigger className="text-sm md:text-base font-semibold text-foreground text-left hover:no-underline py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm md:text-base text-muted-foreground leading-relaxed pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ───── CTA Section ───── */}
      <section className="py-12 md:py-20 px-3 sm:px-4">
        <div className="mx-auto max-w-2xl">
          <div className="relative rounded-2xl overflow-hidden p-6 sm:p-8 md:p-12 text-center" style={{ background: `linear-gradient(135deg, ${platformColor}20, ${ACCENT}10)` }}>
            <div className="absolute inset-0 border border-[#10B981]/20 rounded-2xl pointer-events-none" />
            <h2 className="text-xl sm:text-2xl md:text-4xl font-extrabold font-[family-name:var(--font-montserrat)] mb-2 relative z-10">
              {ctaTitle}
            </h2>
            <p className="text-sm md:text-base text-muted-foreground mb-4 max-w-md mx-auto relative z-10">
              {ctaSubtitle}
            </p>
            <a href="#download" className="relative z-10 inline-block">
              <Button className="h-11 px-8 bg-[#10B981] text-white font-semibold rounded-xl hover:bg-[#059669] text-sm md:text-base">
                <Download className="h-4 w-4 mr-2" />Mulai Download Sekarang
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* ───── Other Platforms & Blog Links ───── */}
      <section className="py-12 md:py-20 px-3 sm:px-4 bg-muted/30">
        <div className="mx-auto max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Other platforms */}
            <div>
              <h3 className="text-base md:text-lg font-bold font-[family-name:var(--font-montserrat)] mb-3">
                Download dari Platform Lain
              </h3>
              <div className="space-y-2">
                {otherPlatforms.map(p => (
                  <a
                    key={p.name}
                    href={p.href}
                    className="flex items-center gap-3 p-3 md:p-4 rounded-xl bg-card border border-border hover:border-[#10B981]/30 transition-all group"
                  >
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center shrink-0" style={{ background: p.gradient || p.color }}>
                      <span className="text-white text-xs font-bold">{p.name[0]}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm md:text-base font-semibold text-foreground group-hover:text-[#10B981] transition-colors">{p.name} Downloader</p>
                      <p className="text-xs md:text-sm text-muted-foreground">Download video {p.name} tanpa watermark</p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-[#10B981] transition-colors shrink-0" />
                  </a>
                ))}
              </div>
            </div>

            {/* Blog links */}
            <div>
              <h3 className="text-base md:text-lg font-bold font-[family-name:var(--font-montserrat)] mb-3">
                Artikel Terkait
              </h3>
              <div className="space-y-2">
                {blogLinks.map(b => (
                  <a
                    key={b.href}
                    href={b.href}
                    className="flex items-center gap-3 p-3 md:p-4 rounded-xl bg-card border border-border hover:border-[#10B981]/30 transition-all group"
                  >
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-[#10B981]/10 flex items-center justify-center shrink-0">
                      <Sparkles className="h-4 w-4 text-[#10B981]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm md:text-base font-semibold text-foreground group-hover:text-[#10B981] transition-colors line-clamp-2">{b.title}</p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-[#10B981] transition-colors shrink-0" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───── Footer ───── */}
      <SitewideFooter />
    </main>
  );
}

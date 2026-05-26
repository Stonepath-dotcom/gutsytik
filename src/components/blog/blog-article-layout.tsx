"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar, ChevronRight, Download, Zap, List, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface RelatedArticle {
  slug: string;
  title: string;
  description: string;
}

export interface Heading {
  id: string;
  text: string;
}

interface BlogArticleLayoutProps {
  title: string;
  slug: string;
  description: string;
  date: string;
  readingTime: string;
  jsonLd: object;
  children: React.ReactNode;
  relatedArticles: RelatedArticle[];
  headings?: Heading[];
  lastUpdated?: string;
}

export function BlogArticleLayout({
  title,
  slug,
  description,
  date,
  readingTime,
  jsonLd,
  children,
  relatedArticles,
  headings,
  lastUpdated,
}: BlogArticleLayoutProps) {
  const [tocOpen, setTocOpen] = useState(false);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://getmova.my.id" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://getmova.my.id/blog" },
      { "@type": "ListItem", position: 3, name: title, item: `https://getmova.my.id/blog/${slug}` },
    ],
  };

  return (
    <main className="min-h-screen bg-background">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Hero Section */}
      <section className="relative pt-20 pb-12 px-4 sm:px-6 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#EEF2FF] via-[#E0E7FF] to-background dark:from-[#0A0E27] dark:via-[#111340]" />
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: "radial-gradient(circle at 20% 50%, rgba(79,70,229,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(124,58,237,0.1) 0%, transparent 50%)"
        }} />

        <div className="relative mx-auto max-w-3xl">
          {/* Breadcrumb */}
          <nav className="mb-6 flex items-center gap-1.5 text-sm text-muted-foreground" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-[#4F46E5] transition-colors">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/blog" className="hover:text-[#4F46E5] transition-colors">Blog</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground truncate max-w-[200px] sm:max-w-none">{title}</span>
          </nav>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground mb-4 leading-tight font-[family-name:var(--font-montserrat)]">
            {title}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4 text-[#4F46E5]" />
              {date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-[#4F46E5]" />
              {readingTime}
            </span>
            {lastUpdated && lastUpdated !== date && (
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground/70">
                <Calendar className="h-3.5 w-3.5 text-[#4F46E5]/60" />
                Diperbarui: {lastUpdated}
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>
      </section>

      {/* Article Body with ToC */}
      <article className="px-4 sm:px-6 pb-12">
        <div className="mx-auto max-w-4xl">
          <div className="flex gap-8">
            {/* Desktop ToC Sidebar */}
            {headings && headings.length > 0 && (
              <aside className="hidden lg:block w-56 shrink-0">
                <nav
                  className="sticky top-24 rounded-xl p-4 bg-card border border-border"
                  aria-label="Daftar Isi"
                >
                  <h3 className="text-sm font-bold text-[#4F46E5] mb-3 flex items-center gap-2">
                    <List className="h-4 w-4" />
                    Daftar Isi
                  </h3>
                  <ol className="space-y-1.5">
                    {headings.map((h, i) => (
                      <li key={h.id}>
                        <a
                          href={`#${h.id}`}
                          className="text-xs text-muted-foreground hover:text-[#4F46E5] transition-colors leading-relaxed block py-0.5"
                          onClick={(e) => {
                            e.preventDefault();
                            document.getElementById(h.id)?.scrollIntoView({ behavior: "smooth" });
                          }}
                        >
                          <span className="text-[#4F46E5]/40 mr-1.5">{i + 1}.</span>
                          {h.text}
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>
              </aside>
            )}

            {/* Article Content */}
            <div className="flex-1 min-w-0">
              {/* Mobile ToC (collapsible) */}
              {headings && headings.length > 0 && (
                <div className="lg:hidden mb-6">
                  <button
                    onClick={() => setTocOpen(!tocOpen)}
                    className="w-full flex items-center justify-between p-3 rounded-xl bg-card border border-border text-left"
                    aria-expanded={tocOpen}
                    aria-controls="mobile-toc"
                  >
                    <span className="text-sm font-bold text-[#4F46E5] flex items-center gap-2">
                      <List className="h-4 w-4" />
                      Daftar Isi
                    </span>
                    <ChevronDown
                      className={`h-4 w-4 text-muted-foreground transition-transform ${tocOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  {tocOpen && (
                    <nav
                      id="mobile-toc"
                      className="mt-2 p-3 rounded-xl bg-card border border-border"
                      aria-label="Daftar Isi"
                    >
                      <ol className="space-y-2">
                        {headings.map((h, i) => (
                          <li key={h.id}>
                            <a
                              href={`#${h.id}`}
                              className="text-sm text-muted-foreground hover:text-[#4F46E5] transition-colors"
                              onClick={(e) => {
                                e.preventDefault();
                                setTocOpen(false);
                                document.getElementById(h.id)?.scrollIntoView({ behavior: "smooth" });
                              }}
                            >
                              <span className="text-[#4F46E5]/40 mr-1.5">{i + 1}.</span>
                              {h.text}
                            </a>
                          </li>
                        ))}
                      </ol>
                    </nav>
                  )}
                </div>
              )}

              <div className="prose-blog">
                {children}
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* CTA Section */}
      <section className="px-4 sm:px-6 pb-12">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-2xl p-6 sm:p-8 text-center" style={{
            background: "linear-gradient(135deg, rgba(79,70,229,0.1) 0%, rgba(124,58,237,0.08) 100%)",
            border: "1px solid rgba(79,70,229,0.2)"
          }}>
            <Zap className="h-8 w-8 text-[#4F46E5] mx-auto mb-3" />
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2 font-[family-name:var(--font-montserrat)]">
              Siap Download Video Tanpa Watermark?
            </h2>
            <p className="text-muted-foreground mb-5 text-sm sm:text-base max-w-md mx-auto">
              Coba Mova sekarang dan rasakan kemudahan download video tanpa watermark dari berbagai platform!
            </p>
            <Link href="/">
              <Button className="bg-[#4F46E5] text-white font-semibold rounded-xl hover:bg-[#4338CA] px-8 h-12 text-base">
                <Download className="mr-2 h-5 w-5" />
                Mulai Download Gratis
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="px-4 sm:px-6 pb-16">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-xl font-bold text-foreground mb-6 font-[family-name:var(--font-montserrat)]">
              Artikel Terkait
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {relatedArticles.map((article) => (
                <Link
                  key={article.slug}
                  href={`/blog/${article.slug}`}
                  className="group rounded-xl p-5 bg-card border border-border hover:border-[#4F46E5]/30 transition-all duration-200"
                >
                  <h3 className="font-semibold text-foreground text-sm mb-1.5 group-hover:text-[#4F46E5] transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {article.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Back to home */}
      <div className="px-4 sm:px-6 pb-12">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-[#4F46E5] transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Kembali ke Halaman Utama
          </Link>
        </div>
      </div>
    </main>
  );
}

import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Montserrat } from "next/font/google";

import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Providers } from "@/components/providers";
import { CookieConsent } from "@/components/cookie-consent";
import { PwaInstallPrompt } from "@/components/pwa-install-prompt";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://getmova.my.id"),
  alternates: { canonical: "https://getmova.my.id" },
  title: {
    default: "GetMova - Download Video Tanpa Watermark",
    template: "%s | GetMova",
  },
  description:
    "Download video tanpa watermark dari TikTok, Instagram, Facebook, Twitter/X, Pinterest, Reddit dan platform populer lainnya. Gratis, cepat, dan mudah.",
  keywords: [
    "download video tiktok",
    "download video tanpa watermark",
    "tiktok downloader",
    "instagram downloader",
    "download video instagram",
    "download video facebook",
    "video downloader gratis",
    "tanpa watermark",
    "download video",
    "getmova",
    "download video twitter",
    "pinterest downloader",
    "reddit downloader",
    "download video online",
    "video downloader tanpa aplikasi",
    "cara download video tiktok",
    "download video hd",
    "download video mp4",
    "tiktok no watermark",
    "snaptik alternative",
    "savefrom alternative",
    "y2mate alternative",
    "video downloader terbaik",
    "download video gratis 2025",
    "download video pinterest",
    "download video reddit",
    "download video twitter x",
  ],
  authors: [{ name: "GetMova" }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "Multimedia",
  icons: {
    icon: [
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
  other: {
    "google-adsense-account": "ca-pub-8487073388720076",
  },
  openGraph: {
    title: "GetMova - Download Video Tanpa Watermark",
    description:
      "Download video dari TikTok, Instagram, Facebook, Twitter/X, dan platform populer lainnya tanpa watermark. Cepat, gratis, dan mudah!",
    url: "https://getmova.my.id",
    siteName: "GetMova",
    type: "website",
    locale: "id_ID",
    alternateLocale: ["en_US"],
    images: [
      {
        url: "/og-image.png",
        width: 1344,
        height: 768,
        alt: "GetMova - Download Video Tanpa Watermark",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GetMova - Download Video Tanpa Watermark",
    description:
      "Download video dari TikTok, Instagram, Facebook, Twitter/X, dan platform populer lainnya tanpa watermark. Cepat, gratis, dan mudah!",
    images: ["/og-image.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#E52222",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <link rel="alternate" hrefLang="id" href="https://getmova.my.id" />
        <link rel="alternate" hrefLang="en" href="https://getmova.my.id/?lang=en" />
        <link rel="alternate" hrefLang="x-default" href="https://getmova.my.id" />
        <link rel="alternate" type="application/rss+xml" title="GetMova Blog" href="https://getmova.my.id/feed.xml" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />

        {/* Preconnect for Core Web Vitals */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://pagead2.googlesyndication.com" />
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" />
        <link rel="preconnect" href="https://adservice.google.com" />
        <link rel="dns-prefetch" href="https://adservice.google.com" />
        <link rel="preconnect" href="https://i.ytimg.com" />
        <link rel="dns-prefetch" href="https://i.ytimg.com" />

        {/* Google Consent Mode v2 - Default denied, updated by CookieConsent on accept */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('consent', 'default', {
                'analytics_storage': 'denied',
                'ad_storage': 'denied',
                'wait_for_update': 500
              });
            `,
          }}
        />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "GetMova",
              description:
                "Download video tanpa watermark dari TikTok, Instagram, Facebook, Twitter/X, Pinterest, Reddit dan platform populer lainnya. Gratis, cepat, dan mudah.",
              url: "https://getmova.my.id",
              applicationCategory: "MultimediaApplication",
              operatingSystem: "All",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "IDR",
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.7",
                ratingCount: "2450",
                bestRating: "5",
                worstRating: "1",
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "GetMova",
              url: "https://getmova.my.id",
              logo: {
                "@type": "ImageObject",
                url: "https://getmova.my.id/mova-logo-new.png",
                width: 512,
                height: 512,
              },
              image: "https://getmova.my.id/mova-logo-new.png",
              email: "admin@getmova.my.id",
              description: "Download video tanpa watermark dari berbagai platform populer. Cepat, gratis, dan mudah.",
              foundingDate: "2025",
              sameAs: [
                "https://getmova.my.id",
              ],
              contactPoint: {
                "@type": "ContactPoint",
                email: "admin@getmova.my.id",
                contactType: "customer support",
                availableLanguage: ["Indonesian", "English"],
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "GetMova",
              url: "https://getmova.my.id",
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate: "https://getmova.my.id/?q={search_term_string}",
                },
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />

        {/* FAQPage Schema - Google Rich Results */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "Apakah GetMova benar-benar gratis?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Ya, GetMova 100% gratis tanpa biaya tersembunyi. Kamu bisa download video sepuasnya tanpa perlu mendaftar atau membayar apapun. Semua fitur bisa kamu gunakan secara penuh tanpa batasan.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Apakah ada batasan jumlah download?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Tidak ada batasan! Kamu bisa mendownload video sebanyak yang kamu mau tanpa batas harian atau bulanan. Download sepuasnya kapan saja dan di mana saja.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Di mana video yang didownload disimpan?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Video akan otomatis tersimpan di folder download perangkatmu, baik di HP maupun komputer. Kalau di HP biasanya ada di folder Download, kalau di komputer ada di folder Downloads.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Platform apa saja yang didukung?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "GetMova mendukung berbagai platform populer seperti TikTok, Instagram, Facebook, Twitter/X, Pinterest, dan Reddit. Kami terus menambahkan platform baru secara berkala.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Apakah video yang didownload bebas watermark?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Ya! Semua video yang didownload melalui GetMova bebas watermark. Kamu akan mendapatkan video asli tanpa logo atau tanda air yang mengganggu.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Apakah GetMova aman digunakan?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Sangat aman! Kami tidak menyimpan data pribadi atau riwayat download kamu. Semua proses dilakukan secara aman dengan enkripsi. Privasi kamu adalah prioritas kami.",
                  },
                },
              ],
            }),
          }}
        />

        {/* HowTo Schema - Rich Results for "cara download video" */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "HowTo",
              name: "Cara Download Video Tanpa Watermark dengan GetMova",
              description: "Panduan langkah demi langkah cara download video tanpa watermark dari TikTok, Instagram, Facebook, Twitter/X, Pinterest, dan Reddit menggunakan GetMova.",
              totalTime: "PT2M",
              image: {
                "@type": "ImageObject",
                url: "https://getmova.my.id/og-image.png",
                width: 1344,
                height: 768,
              },
              step: [
                {
                  "@type": "HowToStep",
                  position: 1,
                  name: "Cari Video",
                  text: "Temukan video yang kamu inginkan dari platform yang tersedia (TikTok, Instagram, Facebook, Twitter/X, Pinterest, atau Reddit) dan salin link-nya.",
                },
                {
                  "@type": "HowToStep",
                  position: 2,
                  name: "Tempel Link",
                  text: "Tempel link yang sudah disalin di kolom input di halaman GetMova lalu klik tombol Download. Sistem akan otomatis menganalisis video.",
                },
                {
                  "@type": "HowToStep",
                  position: 3,
                  name: "Download Video",
                  text: "Pilih kualitas yang diinginkan (360p, 480p, 720p, 1080p, atau 4K) dan klik tombol download untuk menyimpan video ke perangkatmu.",
                },
              ],
            }),
          }}
        />

        {/* BreadcrumbList Schema - Homepage */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: "https://getmova.my.id",
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Download Video Tanpa Watermark",
                  item: "https://getmova.my.id",
                },
              ],
            }),
          }}
        />

        {/* Speakable Specification - Voice Search Optimization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              name: "GetMova - Download Video Tanpa Watermark",
              description: "Download video tanpa watermark dari TikTok, Instagram, Facebook, Twitter/X, Pinterest, Reddit dan platform populer lainnya. Gratis, cepat, dan mudah.",
              url: "https://getmova.my.id",
              speakable: {
                "@type": "SpeakableSpecification",
                cssSelector: [".hero-title", ".hero-subtitle", ".faq-section"],
              },
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${montserrat.variable} antialiased bg-background text-foreground`}
      >
        <a href="#hero" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[999] focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-lg focus:text-sm focus:font-medium">
          Langsung ke konten utama
        </a>
        <Providers>
          {children}
          <Toaster />
          <CookieConsent />
          <PwaInstallPrompt />
        </Providers>
      </body>
    </html>
  );
}

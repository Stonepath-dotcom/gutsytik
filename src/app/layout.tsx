import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Montserrat } from "next/font/google";

import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Providers } from "@/components/providers";
import { CookieConsent } from "@/components/cookie-consent";

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
  title: "Mova - Download Video Tanpa Watermark",
  description:
    "Mova membantu kamu download video dari platform populer tanpa watermark, cepat dan gratis! Support TikTok, Instagram, YouTube, Facebook, Twitter/X, dan lainnya.",
  keywords: [
    "mova",
    "download video tanpa watermark",
    "tiktok downloader",
    "instagram downloader",
    "youtube downloader",
    "video downloader",
    "tanpa watermark",
    "gratis",
    "download video",
  ],
  authors: [{ name: "Mova" }],
  icons: {
    icon: "/mova-logo.png",
  },
  manifest: "/manifest.json",
  other: {
    "google-adsense-account": "ca-pub-8487073388720076",
  },
  openGraph: {
    title: "Mova - Download Video Tanpa Watermark",
    description:
      "Download video dari TikTok, Instagram, YouTube, dan platform populer lainnya tanpa watermark. Cepat, gratis, dan mudah!",
    url: "https://getmova.my.id",
    siteName: "Mova",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1344,
        height: 768,
        alt: "Mova - Download Video Tanpa Watermark",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mova - Download Video Tanpa Watermark",
    description:
      "Download video dari TikTok, Instagram, YouTube, dan platform populer lainnya tanpa watermark. Cepat, gratis, dan mudah!",
    images: ["/og-image.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#10B981",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning className="dark">
      <head>
        <link rel="alternate" hrefLang="id" href="https://getmova.my.id" />
        <link rel="alternate" hrefLang="x-default" href="https://getmova.my.id" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="manifest" href="/manifest.json" />
        {/* AdSense loads via CookieConsent after user accepts */}
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "Mova",
              description:
                "Download video tanpa watermark dari berbagai platform populer",
              url: "https://getmova.my.id",
              applicationCategory: "MultimediaApplication",
              operatingSystem: "All",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "IDR",
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
              name: "Mova",
              url: "https://getmova.my.id",
              logo: "https://getmova.my.id/mova-logo.png",
              email: "admin@getmova.my.id",
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
              name: "Mova",
              url: "https://getmova.my.id",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://getmova.my.id/?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
        {/* FAQPage Schema for Google Rich Results */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "Apakah Mova benar-benar gratis?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Ya, Mova 100% gratis tanpa biaya tersembunyi. Kamu bisa download video sepuasnya tanpa perlu mendaftar atau membayar apapun."
                  }
                },
                {
                  "@type": "Question",
                  name: "Apakah ada batasan jumlah download?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Tidak ada batasan! Kamu bisa mendownload video sebanyak yang kamu mau tanpa batas harian atau bulanan."
                  }
                },
                {
                  "@type": "Question",
                  name: "Apakah kualitas video berkurang saat download?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Tidak, kami mempertahankan kualitas asli video. Kamu bisa memilih resolusi yang tersedia dari video aslinya, termasuk HD 1080p jika tersedia."
                  }
                },
                {
                  "@type": "Question",
                  name: "Platform apa saja yang didukung Mova?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Mova mendukung TikTok, Instagram, YouTube, Facebook, Twitter/X, Pinterest, Reddit, dan masih banyak lagi."
                  }
                },
                {
                  "@type": "Question",
                  name: "Apakah Mova aman digunakan?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Sangat aman! Kami tidak menyimpan data pribadi atau riwayat download kamu. Semua proses dilakukan secara aman dan terenkripsi."
                  }
                },
                {
                  "@type": "Question",
                  name: "Kenapa video saya gagal didownload?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Pastikan link video benar dan video tidak bersifat private. Beberapa video dari akun private atau yang dibatasi region mungkin tidak bisa didownload."
                  }
                }
              ]
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
        </Providers>
      </body>
    </html>
  );
}

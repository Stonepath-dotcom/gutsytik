import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Geist, Geist_Mono, Montserrat } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Providers } from "@/components/providers";

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
    "tiktok tanpa watermark",
    "download tiktok",
    "download instagram reels",
    "download youtube mp3",
    "download video facebook",
    "download twitter video",
    "video downloader online",
    "unduh video",
  ],
  authors: [{ name: "Mova" }],
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION || "",
  },
  icons: {
    icon: [
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/logo.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
  openGraph: {
    title: "Mova - Download Video Tanpa Watermark",
    description:
      "Download video dari TikTok, Instagram, YouTube, dan platform populer lainnya tanpa watermark. Cepat, gratis, dan mudah!",
    url: "https://getmova.my.id",
    siteName: "Mova",
    type: "website",
    images: [
      {
        url: "https://getmova.my.id/og-image.png",
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
    images: ["https://getmova.my.id/og-image.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#2563EB",
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
    <html lang="id" suppressHydrationWarning className="dark">
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="canonical" href="https://getmova.my.id" />
        <link rel="sitemap" type="application/xml" href="https://getmova.my.id/sitemap.xml" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" />
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
              sameAs: [
                "https://tiktok.com/@abbbuw",
                "https://t.me/sixte3nnn"
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "Mova",
              applicationCategory: "MultimediaApplication",
              operatingSystem: "Web",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "IDR",
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.8",
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
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${montserrat.variable} antialiased bg-background text-foreground`}
      >
        <Providers>
          {children}
          <Toaster />
        </Providers>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8487073388720076"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}

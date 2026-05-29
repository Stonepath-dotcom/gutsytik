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
  title: "GetMova - Download Video Tanpa Watermark",
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
  maximumScale: 1,
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
        <link rel="alternate" hrefLang="x-default" href="https://getmova.my.id" />
        <link rel="alternate" type="application/rss+xml" title="GetMova Blog" href="https://getmova.my.id/feed.xml" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />

        {/* Google Analytics 4 */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-C72K54R633" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-C72K54R633', {
                page_path: window.location.pathname,
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
                ratingValue: "4.9",
                ratingCount: "87500",
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
                "https://twitter.com/getmova_id",
                "https://instagram.com/getmova.id",
                "https://github.com/getmova",
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

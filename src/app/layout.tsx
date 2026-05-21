import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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

export const metadata: Metadata = {
  metadataBase: new URL("https://gutsytik.vercel.app"),
  title: "Gutsytik - Download Video Tanpa Watermark",
  description:
    "Gutsytik membantu kamu download video dari platform populer tanpa watermark, cepat dan gratis! Support TikTok, Instagram, YouTube, Facebook, Twitter/X, dan lainnya.",
  keywords: [
    "gutsytik",
    "download video tanpa watermark",
    "tiktok downloader",
    "instagram downloader",
    "youtube downloader",
    "video downloader",
    "tanpa watermark",
    "gratis",
    "download video",
  ],
  authors: [{ name: "Gutsytik" }],
  icons: {
    icon: "/logo.svg",
  },
  manifest: "/manifest.json",
  openGraph: {
    title: "Gutsytik - Download Video Tanpa Watermark",
    description:
      "Download video dari TikTok, Instagram, YouTube, dan platform populer lainnya tanpa watermark. Cepat, gratis, dan mudah!",
    url: "https://gutsytik.vercel.app",
    siteName: "Gutsytik",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gutsytik - Download Video Tanpa Watermark",
    description:
      "Download video dari TikTok, Instagram, YouTube, dan platform populer lainnya tanpa watermark. Cepat, gratis, dan mudah!",
  },
};

export const viewport: Viewport = {
  themeColor: "#FF2D55",
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
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="manifest" href="/manifest.json" />
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "Gutsytik",
              description:
                "Download video tanpa watermark dari berbagai platform populer",
              url: "https://gutsytik.vercel.app",
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
              name: "Gutsytik",
              url: "https://gutsytik.vercel.app",
              logo: "https://gutsytik.vercel.app/logo.svg",
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Gutsytik",
              url: "https://gutsytik.vercel.app",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://gutsytik.vercel.app/?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}

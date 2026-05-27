import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pinterest Video Downloader - Download Video Pinterest Gratis | getmova",
  description:
    "Download video Pinterest ke galeri HP dengan mudah dan gratis. Simpan video Pinterest tanpa watermark dalam kualitas HD. Pinterest downloader terbaik.",
  keywords: [
    "pinterest downloader",
    "download video pinterest",
    "pinterest video saver",
    "simpan video pinterest",
    "pinterest tanpa watermark",
    "pinterest video download",
    "download pinterest hd",
    "pinterest video downloader gratis",
  ],
  alternates: { canonical: "https://getmova.my.id/pinterest-downloader" },
  openGraph: {
    title: "Pinterest Video Downloader - Download Video Pinterest Gratis | getmova",
    description:
      "Download video Pinterest tanpa watermark dalam kualitas HD. Gratis dan mudah.",
    url: "https://getmova.my.id/pinterest-downloader",
    siteName: "getmova",
    type: "website",
    images: [{ url: "/og-image.png", width: 1344, height: 768, alt: "getmova Pinterest Downloader" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pinterest Video Downloader - Download Video Pinterest Gratis | getmova",
    description: "Download video Pinterest tanpa watermark. Gratis dan mudah.",
    images: ["/og-image.png"],
  },
};

const jsonLdSoftware = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Mova Pinterest Video Downloader",
  applicationCategory: "MultimediaApplication",
  operatingSystem: "Web",
  description: "Download video Pinterest ke galeri HP dengan mudah dan gratis. Simpan video Pinterest tanpa watermark dalam kualitas HD.",
  url: "https://getmova.my.id/pinterest-downloader",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "IDR",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    ratingCount: "12500",
    bestRating: "5",
    worstRating: "1",
  },
};

const jsonLdBreadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://getmova.my.id" },
    { "@type": "ListItem", position: 2, name: "Pinterest Downloader", item: "https://getmova.my.id/pinterest-downloader" },
  ],
};

export default function PinterestDownloaderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSoftware) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />
      {children}
    </>
  );
}

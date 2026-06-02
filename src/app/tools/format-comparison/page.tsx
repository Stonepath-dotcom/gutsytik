import type { Metadata } from "next";
import Link from "next/link";
import {
  Home,
  ChevronRight,
  FileVideo,
  ArrowRightLeft,
  Check,
  X,
  Info,
} from "lucide-react";
import { MovaLogo } from "@/components/mova-logo";
import { SitewideFooter } from "@/components/sitewide-footer";

export const metadata: Metadata = {
  title: "Perbandingan Format Video - MP4, WEBM, AVI, MKV & Lainnya",
  description:
    "Bandingkan format video populer: MP4, WEBM, AVI, MKV, MOV, FLV. Lihat perbedaan kualitas, ukuran file, kompatibilitas, dan rekomendasi format terbaik untuk kebutuhanmu.",
  alternates: { canonical: "https://getmova.my.id/tools/format-comparison" },
  keywords: [
    "perbandingan format video",
    "mp4 vs webm",
    "mp4 vs avi",
    "format video terbaik",
    "kualitas video",
    "kompatibilitas format video",
    "ukuran file video",
  ],
  openGraph: {
    title: "Perbandingan Format Video - MP4, WEBM, AVI, MKV & Lainnya",
    description:
      "Bandingkan format video populer dan temukan format terbaik untuk kebutuhan download kamu.",
    url: "https://getmova.my.id/tools/format-comparison",
    siteName: "getmova",
    type: "website",
  },
};

const formats = [
  {
    name: "MP4",
    fullName: "MPEG-4 Part 14",
    icon: "🎬",
    videoCodec: "H.264 / H.265",
    audioCodec: "AAC",
    quality: "Sangat Baik",
    compression: "Tinggi",
    browserSupport: 99,
    devices: "Hampir semua perangkat",
    pros: [
      "Kompatibilitas terluas di semua perangkat",
      "Ukuran file kecil dengan kualitas tinggi",
      "Support streaming dan progressive download",
      "Bisa menyimpan subtitle dan metadata",
    ],
    cons: [
      "Encoding H.265 butuh proses lebih lama",
      "Tidak seefisien WEBM untuk web",
    ],
    bestFor: "Penggunaan umum, sharing, editing video",
    color: "from-blue-500/20 to-blue-600/10",
    borderColor: "border-blue-500/20",
    accentColor: "text-blue-500",
  },
  {
    name: "WEBM",
    fullName: "WebM Project",
    icon: "🌐",
    videoCodec: "VP8 / VP9 / AV1",
    audioCodec: "Vorbis / Opus",
    quality: "Baik",
    compression: "Sangat Tinggi",
    browserSupport: 92,
    devices: "Browser modern, Android",
    pros: [
      "Paling optimal untuk web dan streaming",
      "Ukuran file lebih kecil dari MP4",
      "Open source dan bebas royalti",
      "Support AV1 codec generasi terbaru",
    ],
    cons: [
      "Tidak support di semua player lama",
      "Tidak kompatibel dengan iPhone/iPad (sebelum iOS 17)",
      "Editing support terbatas",
    ],
    bestFor: "Konten web, streaming, animasi",
    color: "from-green-500/20 to-green-600/10",
    borderColor: "border-green-500/20",
    accentColor: "text-green-500",
  },
  {
    name: "AVI",
    fullName: "Audio Video Interleave",
    icon: "📹",
    videoCodec: "DivX / Xvid / MPEG",
    audioCodec: "MP3 / PCM",
    quality: "Baik",
    compression: "Rendah",
    browserSupport: 45,
    devices: "Windows, player desktop",
    pros: [
      "Format klasik yang dikenal luas",
      "Mudah diedit di software lama",
      "Kualitas video lossless tersedia",
    ],
    cons: [
      "Ukuran file sangat besar",
      "Tidak support streaming",
      "Kompatibilitas browser sangat rendah",
      "Tidak support subtitle modern",
    ],
    bestFor: "Arsip video, editing di software lama",
    color: "from-amber-500/20 to-amber-600/10",
    borderColor: "border-amber-500/20",
    accentColor: "text-amber-500",
  },
  {
    name: "MKV",
    fullName: "Matroska Video",
    icon: "📦",
    videoCodec: "H.264 / H.265 / VP9 / AV1",
    audioCodec: "AAC / FLAC / Opus / DTS",
    quality: "Sangat Baik",
    compression: "Tinggi",
    browserSupport: 55,
    devices: "PC, smart TV, media player",
    pros: [
      "Bisa menyimpan banyak track audio & subtitle",
      "Support codec terbaru",
      "Tidak ada batasan ukuran file",
      "Ideal untuk video berkualitas tinggi",
    ],
    cons: [
      "Tidak support di browser langsung",
      "Tidak bisa diputar di iPhone tanpa app pihak ketiga",
      "Ukuran file bisa sangat besar",
    ],
    bestFor: "Film & series, video multi-subtitle",
    color: "from-purple-500/20 to-purple-600/10",
    borderColor: "border-purple-500/20",
    accentColor: "text-purple-500",
  },
  {
    name: "MOV",
    fullName: "QuickTime Movie",
    icon: "🍎",
    videoCodec: "H.264 / ProRes",
    audioCodec: "AAC / PCM",
    quality: "Sangat Baik",
    compression: "Sedang",
    browserSupport: 70,
    devices: "Apple devices, macOS",
    pros: [
      "Format native Apple, optimal di Mac/iPhone",
      "ProRes untuk editing profesional",
      "Kualitas video sangat tinggi",
    ],
    cons: [
      "Ukuran file besar (ProRes)",
      "Kompatibilitas terbatas di non-Apple",
      "Tidak ideal untuk web streaming",
    ],
    bestFor: "Editing video di Mac, konten Apple",
    color: "from-gray-500/20 to-gray-600/10",
    borderColor: "border-gray-500/20",
    accentColor: "text-gray-500",
  },
  {
    name: "FLV",
    fullName: "Flash Video",
    icon: "⚡",
    videoCodec: "Sorenson Spark / VP6",
    audioCodec: "MP3 / AAC",
    quality: "Rendah-Sedang",
    compression: "Sedang",
    browserSupport: 5,
    devices: "Pemutar lama (deprecated)",
    pros: [
      "Ukuran file kecil",
      "Dulu populer untuk streaming",
    ],
    cons: [
      "Flash sudah discontinued",
      "Tidak support di browser modern",
      "Kualitas rendah",
      "Risiko keamanan",
    ],
    bestFor: "Tidak direkomendasikan (legacy)",
    color: "from-red-500/20 to-red-600/10",
    borderColor: "border-red-500/20",
    accentColor: "text-red-500",
  },
];

const qualityComparison = [
  { resolution: "4K (2160p)", mp4Size: "~3.5 GB/jam", webmSize: "~2.8 GB/jam", aviSize: "~12 GB/jam", mkvSize: "~3.2 GB/jam", bestFor: "Monitor 4K, TV besar" },
  { resolution: "Full HD (1080p)", mp4Size: "~1.5 GB/jam", webmSize: "~1.2 GB/jam", aviSize: "~5 GB/jam", mkvSize: "~1.3 GB/jam", bestFor: "Laptop, TV standar" },
  { resolution: "HD (720p)", mp4Size: "~800 MB/jam", webmSize: "~650 MB/jam", aviSize: "~2.5 GB/jam", mkvSize: "~700 MB/jam", bestFor: "Tablet, koneksi sedang" },
  { resolution: "SD (480p)", mp4Size: "~400 MB/jam", webmSize: "~350 MB/jam", aviSize: "~1.2 GB/jam", mkvSize: "~380 MB/jam", bestFor: "HP, koneksi lambat" },
  { resolution: "Low (360p)", mp4Size: "~200 MB/jam", webmSize: "~180 MB/jam", aviSize: "~600 MB/jam", mkvSize: "~190 MB/jam", bestFor: "Hemat kuota" },
];

export default function FormatComparisonPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Perbandingan Format Video - MP4, WEBM, AVI, MKV & Lainnya",
    description: "Bandingkan format video populer dan temukan format terbaik untuk kebutuhan download kamu.",
    url: "https://getmova.my.id/tools/format-comparison",
    publisher: {
      "@type": "Organization",
      name: "getmova",
      logo: { "@type": "ImageObject", url: "https://getmova.my.id/mova-logo.png" },
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Format video apa yang terbaik untuk download?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "MP4 adalah format terbaik untuk sebagian besar kebutuhan download karena kompatibilitas luas di semua perangkat, ukuran file efisien, dan kualitas tinggi. Untuk kebutuhan web/streaming, WEBM bisa menjadi alternatif yang lebih kecil ukurannya.",
        },
      },
      {
        "@type": "Question",
        name: "Apa perbedaan MP4 dan WEBM?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "MP4 menggunakan codec H.264/H.265 dan kompatibel dengan hampir semua perangkat. WEBM menggunakan codec VP9/AV1 yang lebih efisien untuk web namun kurang kompatibel di perangkat lama dan iPhone. WEBM umumnya menghasilkan ukuran file lebih kecil dengan kualitas serupa.",
        },
      },
      {
        "@type": "Question",
        name: "Kenapa AVI ukuran filenya besar?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "AVI menggunakan kompresi yang kurang efisien dibanding format modern seperti MP4 atau WEBM. AVI juga tidak mendukung codec kompresi modern, sehingga file cenderung 3-5x lebih besar dengan kualitas yang sama.",
        },
      },
    ],
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://getmova.my.id" },
      { "@type": "ListItem", position: 2, name: "Tools", item: "https://getmova.my.id/tools" },
      { "@type": "ListItem", position: 3, name: "Format Comparison", item: "https://getmova.my.id/tools/format-comparison" },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <div className="min-h-screen flex flex-col bg-card text-foreground">
        {/* Header */}
        <header className="border-b border-border bg-card">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <a href="/" className="flex items-center gap-2">
                <MovaLogo size={32} showText />
              </a>
              <a
                href="/"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border border-border bg-card text-foreground hover:bg-muted/50 transition-colors"
              >
                <Home className="h-4 w-4" />
                Beranda
              </a>
            </div>
          </div>
        </header>

        <main className="flex-1">
          {/* Breadcrumb */}
          <div className="mx-auto max-w-5xl px-4 pt-6">
            <nav aria-label="Breadcrumb">
              <ol className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <li><a href="/" className="hover:text-[#E52222] transition-colors">Beranda</a></li>
                <li><ChevronRight className="h-3.5 w-3.5" /></li>
                <li className="text-[#E52222] font-medium">Tools</li>
                <li><ChevronRight className="h-3.5 w-3.5" /></li>
                <li className="text-[#E52222] font-medium">Perbandingan Format</li>
              </ol>
            </nav>
          </div>

          {/* Hero */}
          <section className="relative pt-8 pb-12 px-4 sm:px-6 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-[#ECFDF5] via-[#D1FAE5] to-background dark:from-[#064E3B] dark:via-[#022C22] opacity-50" />
            <div className="relative mx-auto max-w-4xl text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E52222]/10 border border-[#E52222]/20 mb-4">
                <ArrowRightLeft className="h-3.5 w-3.5 text-[#E52222]" />
                <span className="text-xs font-semibold text-[#E52222]">
                  Tools Interaktif
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 leading-tight font-[family-name:var(--font-montserrat)]">
                Perbandingan{" "}
                <span className="gradient-text">Format Video</span>
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
                Bandingkan format video populer: MP4, WEBM, AVI, MKV, MOV, dan FLV.
                Temukan format terbaik berdasarkan kebutuhanmu.
              </p>
            </div>
          </section>

          {/* Format Cards */}
          <section className="px-4 sm:px-6 pb-12">
            <div className="mx-auto max-w-5xl space-y-6">
              {formats.map((format) => (
                <div
                  key={format.name}
                  className={`rounded-2xl border ${format.borderColor} bg-gradient-to-br ${format.color} overflow-hidden`}
                >
                  <div className="p-5 sm:p-6">
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{format.icon}</span>
                        <div>
                          <h2 className={`text-xl font-bold ${format.accentColor} font-[family-name:var(--font-montserrat)]`}>
                            {format.name}
                          </h2>
                          <p className="text-xs text-muted-foreground">{format.fullName}</p>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-xs text-muted-foreground">Kompatibilitas</p>
                        <p className={`text-lg font-bold ${format.accentColor}`}>{format.browserSupport}%</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                      {[
                        { label: "Video Codec", value: format.videoCodec },
                        { label: "Audio Codec", value: format.audioCodec },
                        { label: "Kompresi", value: format.compression },
                        { label: "Perangkat", value: format.devices },
                      ].map((spec) => (
                        <div key={spec.label} className="p-2.5 rounded-xl bg-card/50 border border-border/50">
                          <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-0.5">{spec.label}</p>
                          <p className="text-xs font-medium text-foreground">{spec.value}</p>
                        </div>
                      ))}
                    </div>

                    <div className="grid sm:grid-cols-2 gap-3">
                      <div className="p-3 rounded-xl bg-card/30 border border-border/30">
                        <p className="text-xs font-bold text-[#E52222] mb-2 flex items-center gap-1.5">
                          <Check className="h-3.5 w-3.5" /> Kelebihan
                        </p>
                        <ul className="space-y-1.5">
                          {format.pros.map((pro, i) => (
                            <li key={i} className="text-xs text-muted-foreground flex items-start gap-1.5">
                              <span className="text-[#E52222] mt-0.5">+</span> {pro}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="p-3 rounded-xl bg-card/30 border border-border/30">
                        <p className="text-xs font-bold text-[#E52222] mb-2 flex items-center gap-1.5">
                          <X className="h-3.5 w-3.5" /> Kekurangan
                        </p>
                        <ul className="space-y-1.5">
                          {format.cons.map((con, i) => (
                            <li key={i} className="text-xs text-muted-foreground flex items-start gap-1.5">
                              <span className="text-[#E52222] mt-0.5">-</span> {con}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-3 p-2.5 rounded-xl bg-[#E52222]/5 border border-[#E52222]/10 flex items-center gap-2">
                      <Info className="h-4 w-4 text-[#E52222] shrink-0" />
                      <p className="text-xs text-muted-foreground">
                        <span className="font-semibold text-foreground">Cocok untuk:</span> {format.bestFor}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Quality & Size Comparison Table */}
          <section className="px-4 sm:px-6 pb-12">
            <div className="mx-auto max-w-5xl">
              <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2 font-[family-name:var(--font-montserrat)]">
                Perbandingan <span className="gradient-text">Ukuran File</span>
              </h2>
              <p className="text-sm text-muted-foreground mb-6">
                Estimasi ukuran file per jam video berdasarkan resolusi dan format.
              </p>

              <div className="overflow-x-auto rounded-2xl border border-border">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-muted/30 border-b border-border">
                      <th className="px-4 py-3 text-left text-xs font-bold text-muted-foreground uppercase tracking-wider">
                        Resolusi
                      </th>
                      <th className="px-4 py-3 text-center text-xs font-bold text-blue-500 uppercase tracking-wider">
                        MP4
                      </th>
                      <th className="px-4 py-3 text-center text-xs font-bold text-green-500 uppercase tracking-wider">
                        WEBM
                      </th>
                      <th className="px-4 py-3 text-center text-xs font-bold text-amber-500 uppercase tracking-wider">
                        AVI
                      </th>
                      <th className="px-4 py-3 text-center text-xs font-bold text-purple-500 uppercase tracking-wider">
                        MKV
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-bold text-muted-foreground uppercase tracking-wider">
                        Terbaik Untuk
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {qualityComparison.map((row, i) => (
                      <tr key={row.resolution} className={i % 2 === 0 ? "bg-card" : "bg-muted/10"}>
                        <td className="px-4 py-3 font-semibold text-foreground whitespace-nowrap">
                          {row.resolution}
                        </td>
                        <td className="px-4 py-3 text-center text-muted-foreground whitespace-nowrap">
                          {row.mp4Size}
                        </td>
                        <td className="px-4 py-3 text-center text-muted-foreground whitespace-nowrap">
                          {row.webmSize}
                        </td>
                        <td className="px-4 py-3 text-center text-muted-foreground whitespace-nowrap">
                          {row.aviSize}
                        </td>
                        <td className="px-4 py-3 text-center text-muted-foreground whitespace-nowrap">
                          {row.mkvSize}
                        </td>
                        <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">
                          {row.bestFor}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Quick Recommendation */}
          <section className="px-4 sm:px-6 pb-12">
            <div className="mx-auto max-w-5xl">
              <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-6 font-[family-name:var(--font-montserrat)]">
                Rekomendasi <span className="gradient-text">Cepat</span>
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { scenario: "Download video untuk ditonton di HP", format: "MP4", reason: "Kompatibel di semua HP, ukuran efisien" },
                  { scenario: "Upload video ke website/blog", format: "WEBM", reason: "Ukuran terkecil, optimal untuk web" },
                  { scenario: "Simpan video dengan multi-subtitle", format: "MKV", reason: "Support banyak track audio & subtitle" },
                  { scenario: "Edit video di Mac/iPhone", format: "MOV", reason: "Native Apple, kualitas ProRes" },
                  { scenario: "Arsip video kualitas tinggi", format: "MKV/MP4", reason: "Lossless quality, metadata lengkap" },
                  { scenario: "Hemat kuota data", format: "WEBM 480p", reason: "Ukuran paling kecil dengan kualitas cukup" },
                ].map((rec, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-xl bg-card border border-border hover:border-[#E52222]/30 transition-all"
                  >
                    <p className="text-sm font-semibold text-foreground mb-1">{rec.scenario}</p>
                    <p className="text-xs text-[#E52222] font-medium mb-1">
                      <FileVideo className="h-3 w-3 inline mr-1" />
                      {rec.format}
                    </p>
                    <p className="text-xs text-muted-foreground">{rec.reason}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="px-4 sm:px-6 pb-12">
            <div className="mx-auto max-w-3xl">
              <h2 className="text-xl font-bold text-foreground mb-6 font-[family-name:var(--font-montserrat)]">
                Pertanyaan Umum
              </h2>
              <div className="space-y-3">
                {[
                  {
                    q: "Format video apa yang terbaik untuk download?",
                    a: "MP4 adalah format terbaik untuk sebagian besar kebutuhan download karena kompatibilitas luas di semua perangkat, ukuran file efisien, dan kualitas tinggi. Untuk kebutuhan web/streaming, WEBM bisa menjadi alternatif yang lebih kecil ukurannya. Mova secara default menyediakan format MP4 karena paling universal.",
                  },
                  {
                    q: "Apa perbedaan MP4 dan WEBM?",
                    a: "MP4 menggunakan codec H.264/H.265 dan kompatibel dengan hampir semua perangkat. WEBM menggunakan codec VP9/AV1 yang lebih efisien untuk web namun kurang kompatibel di perangkat lama dan iPhone. WEBM umumnya menghasilkan ukuran file 15-20% lebih kecil dengan kualitas serupa.",
                  },
                  {
                    q: "Kenapa AVI ukuran filenya besar?",
                    a: "AVI menggunakan kompresi yang kurang efisien dibanding format modern seperti MP4 atau WEBM. AVI juga tidak mendukung codec kompresi modern, sehingga file cenderung 3-5x lebih besar dengan kualitas yang sama. Kami tidak merekomendasikan AVI untuk penggunaan sehari-hari.",
                  },
                  {
                    q: "Bisa konversi format video di Mova?",
                    a: "Ya! Mova menyediakan opsi download dalam berbagai format. Saat mendownload video, kamu bisa memilih format MP4 untuk video atau MP3 untuk audio saja. Format lainnya bisa dikonversi menggunakan tools yang kami rekomendasikan di blog kami.",
                  },
                ].map((faq, i) => (
                  <details
                    key={i}
                    className="group rounded-xl bg-card border border-border overflow-hidden"
                  >
                    <summary className="flex items-center gap-3 p-4 cursor-pointer list-none hover:bg-muted/50 transition-colors">
                      <span className="text-sm font-semibold text-foreground flex-1">{faq.q}</span>
                      <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform group-open:rotate-90 shrink-0" />
                    </summary>
                    <div className="px-4 pb-4 pt-0">
                      <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="px-4 sm:px-6 pb-16">
            <div className="mx-auto max-w-3xl">
              <div className="rounded-2xl p-6 sm:p-8 text-center bg-gradient-to-br from-[#E52222]/20 to-[#FF6B35]/10 border border-[#E52222]/30">
                <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2 font-[family-name:var(--font-montserrat)]">
                  Langsung Coba Download Video
                </h2>
                <p className="text-muted-foreground mb-5 text-sm sm:text-base max-w-md mx-auto">
                  Download video dalam format terbaik dengan Mova. Gratis, cepat, dan tanpa watermark!
                </p>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 bg-[#E52222] text-white font-semibold rounded-xl hover:bg-[#C91C1C] px-8 h-12 text-base transition-colors"
                >
                  <FileVideo className="h-5 w-5" />
                  Mulai Download Gratis
                </Link>
              </div>
            </div>
          </section>
        </main>

        <SitewideFooter />
      </div>
    </>
  );
}

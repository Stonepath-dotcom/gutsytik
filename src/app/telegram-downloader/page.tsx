"use client";

import React from "react";
import {
  Shield,
  Zap,
  Infinity,
  Download,
  CheckCircle2,
  CircleHelp,
} from "lucide-react";
import SEOPageLayout from "@/components/seo-page-layout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

/* ── FAQ Data ── */
const FAQS = [
  {
    q: "Bagaimana cara download video Telegram dengan Mova?",
    a: "Download video Telegram dengan Mova sangat mudah dan cepat. Pertama, buka aplikasi Telegram atau Telegram Web di browser, temukan video yang ingin kamu download dari channel, grup, atau chat pribadi, lalu salin link URL-nya dengan cara klik kanan pada pesan video dan pilih Copy Message Link, atau gunakan fitur Share lalu pilih Copy Link. Kedua, buka website Mova di getmova.my.id/telegram-downloader, tempel link Telegram yang sudah disalin ke kolom input download, lalu klik tombol Download. Ketiga, Mova akan memproses link tersebut dan menampilkan opsi kualitas video yang tersedia untuk diunduh. Seluruh proses download video Telegram hanya membutuhkan beberapa detik dan kamu tidak perlu menginstall aplikasi apapun. File video akan langsung tersimpan di galeri HP atau perangkatmu dan bisa ditonton offline kapan saja.",
  },
  {
    q: "Apakah download video Telegram di Mova gratis?",
    a: "Ya, sepenuhnya gratis tanpa biaya apapun. Mova tidak membebankan biaya untuk fitur download video Telegram, baik untuk penggunaan sekali maupun berulang kali. Kamu tidak perlu mendaftar akun, login, atau memasukkan informasi pembayaran untuk menggunakan layanan Telegram video downloader ini. Tidak ada batasan jumlah download per hari, sehingga kamu bisa mengunduh video dari Telegram sebanyak yang kamu butuhkan. Mova juga tidak menyertakan iklan pop-up yang mengganggu atau redirect ke halaman berbahaya. Semua fitur Telegram downloader di Mova bisa langsung digunakan secara gratis tanpa syarat apapun, menjadikannya pilihan terbaik untuk menyimpan video Telegram ke galeri.",
  },
  {
    q: "Bisa download video Telegram di HP Android atau iPhone?",
    a: "Tentu saja bisa. Mova Telegram Video Downloader dirancang agar kompatibel dengan semua perangkat, termasuk smartphone Android, iPhone, tablet, dan komputer desktop. Kamu hanya perlu membuka browser di perangkatmu — seperti Chrome, Safari, Firefox, atau browser lainnya — lalu kunjungi getmova.my.id/telegram-downloader. Tidak perlu menginstall aplikasi tambahan karena seluruh proses download video Telegram berjalan langsung di browser. File video yang dihasilkan kompatibel dengan semua pemutar video di Android dan iOS, sehingga kamu bisa langsung menonton video hasil download tanpa konversi tambahan. Pengalaman download video Telegram di HP sama mudahnya dengan di komputer — cepat, gratis, dan praktis.",
  },
  {
    q: "Bisa download video dari channel dan grup Telegram?",
    a: "Ya, Mova mendukung download video dari berbagai sumber di Telegram, termasuk channel publik, grup, chat pribadi, serta pesan yang di-forward. Selama kamu bisa mendapatkan link pesan video tersebut, Mova bisa memproses dan mengunduh videonya. Untuk channel dan grup publik, kamu bisa langsung menyalin link pesan video dengan mudah. Untuk konten dari chat pribadi atau grup tertutup, pastikan link pesan bisa diakses secara publik agar Mova bisa memprosesnya. Mova mendukung berbagai format video yang digunakan di Telegram, termasuk video biasa, video bulat (round video), dan animasi yang dikirim sebagai video. Hasil download akan selalu dalam format MP4 yang kompatibel dengan semua perangkat.",
  },
];

/* ── Advantage Data ── */
const ADVANTAGES = [
  {
    icon: Shield,
    label: "Aman & Privat",
    desc: "Download video Telegram dengan aman tanpa malware atau virus. Mova tidak menyimpan data pribadi atau riwayat download kamu di server. Seluruh proses download berjalan langsung tanpa perantara yang mencurigakan, sehingga privasi kamu tetap terjaga sepenuhnya.",
  },
  {
    icon: Zap,
    label: "Cepat & Gratis",
    desc: "Proses download video Telegram hanya membutuhkan beberapa detik. Tanpa biaya, tanpa registrasi, dan tanpa batas penggunaan. Cukup tempel link Telegram dan langsung download video secara instan tanpa menunggu lama.",
  },
  {
    icon: Infinity,
    label: "Tanpa Batas Download",
    desc: "Download video dari Telegram sebanyak apapun tanpa batasan jumlah. Mova tidak membatasi berapa kali kamu bisa mengunduh video Telegram per hari. Simpan semua video menarik dari channel dan grup Telegram favorit tanpa khawatir kehabisan kuota download.",
  },
  {
    icon: Download,
    label: "Kualitas HD",
    desc: "Simpan video Telegram dalam kualitas HD terbaik yang tersedia. Mova mengekstrak video pada resolusi tertinggi sehingga hasil download tetap tajam dan jernih. Nikmati video Telegram favoritmu secara offline dengan kualitas gambar yang memuaskan.",
  },
];

/* ── Steps Data ── */
const STEPS = [
  {
    num: "1",
    title: "Salin Link Video Telegram",
    desc: "Buka aplikasi Telegram atau Telegram Web di browser, temukan video yang ingin kamu download dari channel, grup, atau chat, lalu salin link URL-nya. Kamu bisa klik kanan pada pesan video dan pilih Copy Message Link, atau gunakan fitur Share pada aplikasi Telegram lalu pilih Copy Link.",
  },
  {
    num: "2",
    title: "Tempel Link di Mova",
    desc: "Buka website Mova di getmova.my.id/telegram-downloader, tempel link Telegram yang sudah disalin ke kolom input download. Mova akan secara otomatis mendeteksi dan memproses link video Telegram tersebut untuk disiapkan proses download.",
  },
  {
    num: "3",
    title: "Download Video Telegram",
    desc: "Klik tombol Download, lalu Mova akan mengekstrak video dari Telegram dalam kualitas terbaik yang tersedia. File video akan langsung tersimpan di perangkatmu dalam hitungan detik, siap ditonton offline kapan saja dan di mana saja tanpa perlu koneksi internet.",
  },
];

/* ── JSON-LD Schemas ── */
const jsonLdWebPage = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Telegram Video Downloader - Download Video Telegram Gratis",
  description:
    "Download video Telegram ke galeri HP dengan mudah dan gratis. Simpan video dari channel dan grup Telegram dalam kualitas HD.",
  url: "https://getmova.my.id/telegram-downloader",
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Beranda",
        item: "https://getmova.my.id",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Telegram Downloader",
        item: "https://getmova.my.id/telegram-downloader",
      },
    ],
  },
};

const jsonLdFAQ = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a,
    },
  })),
};

const jsonLdSoftware = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Mova Telegram Video Downloader",
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
    ratingCount: "11200",
  },
};

export default function TelegramDownloaderPage() {
  return (
    <SEOPageLayout
      title="Telegram Video Downloader - Download Video Telegram Gratis"
      description="Download video Telegram ke galeri HP dengan mudah dan gratis. Simpan video dari channel dan grup Telegram dalam kualitas HD."
      platform="Telegram"
      placeholder="Tempel link Telegram di sini..."
    >
      {/* JSON-LD Scripts */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebPage) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFAQ) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSoftware) }}
      />

      {/* ── Download Video Telegram dengan Mova ── */}
      <section className="px-4 py-8 border-t border-border bg-muted/30">
        <div className="mx-auto max-w-md">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="h-5 w-5 text-primary shrink-0" />
            <h2 className="text-lg font-bold text-foreground">
              Download Video Telegram dengan Mova
            </h2>
          </div>
          <div className="text-sm text-muted-foreground leading-relaxed space-y-4">
            <p>
              Telegram adalah salah satu platform pesan instan terbesar di dunia
              yang digunakan oleh ratusan juta pengguna untuk berkomunikasi,
              berbagi konten, dan mengikuti channel informasi. Salah satu jenis
              konten yang paling banyak dibagikan di Telegram adalah video,
              mulai dari video berita, tutorial, hiburan, dokumenter, hingga
              konten edukasi dari berbagai channel publik. Namun, Telegram tidak
              menyediakan fitur bawaan untuk menyimpan video langsung ke galeri
              perangkat dengan mudah — terutama untuk video dari channel besar
              yang ukurannya bisa sangat besar. Itulah mengapa banyak pengguna
              Telegram membutuhkan Telegram video downloader untuk menyimpan
              video favorit mereka agar bisa ditonton kembali secara offline.
              Dengan download video Telegram, kamu bisa mengakses konten video
              favoritmu kapan saja tanpa perlu koneksi internet, bahkan ketika
              video tersebut sudah dihapus oleh channel atau pengirimnya.
            </p>
            <p>
              Ada banyak alasan mengapa seseorang membutuhkan download video
              telegram. Pertama, untuk menyimpan tutorial dan konten edukasi
              dari channel Telegram agar bisa diakses kembali saat dibutuhkan
              tanpa harus membuka aplikasi Telegram. Kedua, mengoleksi video
              menarik dari berbagai channel berita, hiburan, dan teknologi
              untuk dijadikan referensi atau ditonton di waktu luang. Ketiga,
              membagikan video Telegram ke platform lain seperti WhatsApp,
              Instagram, atau TikTok yang tidak mendukung share langsung dari
              Telegram. Keempat, menyimpan video sebelum kemungkinan dihapus
              oleh channel atau pengirimnya, terutama untuk konten berita atau
              informasi penting yang bersifat sementara. Mova hadir sebagai
              solusi telegram downloader yang memudahkan semua kebutuhan
              tersebut dengan cara yang simpel, cepat, dan gratis. Kamu juga
              bisa menggunakan{" "}
              <a
                href="/tiktok-downloader"
                className="text-primary hover:underline"
              >
                TikTok downloader
              </a>{" "}
              atau{" "}
              <a
                href="/youtube-downloader"
                className="text-primary hover:underline"
              >
                YouTube downloader
              </a>{" "}
              dari Mova untuk platform lainnya.
            </p>
            <p>
              Mova hadir sebagai Telegram video downloader terbaik yang
              menggabungkan kecepatan, kualitas, dan kemudahan dalam satu
              platform. Dengan Mova, kamu tidak perlu menginstall aplikasi
              tambahan atau mendaftar akun — cukup tempel link video Telegram
              dan langsung download. Mova mengekstrak video dari Telegram dalam
              kualitas terbaik yang tersedia, sehingga gambar dan suara yang
              dihasilkan tetap tajam dan jernih meskipun telah disimpan ke
              perangkatmu. Seluruh proses download video telegram berjalan
              langsung di browser tanpa perlu software atau plugin tambahan,
              menjadikannya solusi paling praktis untuk menyimpan video dari
              Telegram. Baca panduan lengkapnya di{" "}
              <a
                href="/blog/cara-download-video-telegram"
                className="text-primary hover:underline"
              >
                blog cara download video Telegram
              </a>{" "}
              kami.
            </p>
            <p>
              Keunggulan lainnya dari Mova sebagai telegram downloader adalah
              kecepatan proses yang sangat tinggi. Server Mova dioptimalkan
              untuk menangani download video Telegram dalam hitungan detik,
              bukan menit. Bahkan video berukuran besar dari channel Telegram
              bisa diunduh dengan cepat berkat koneksi server yang stabil dan
              cepat. Kamu tidak perlu menunggu lama untuk mendapatkan video
              Telegram favorit — cukup tempel link, klik download, dan file
              video langsung tersimpan di perangkatmu. Mova juga kompatibel
              dengan semua perangkat dan browser, baik di smartphone Android,
              iPhone, tablet, maupun komputer desktop. Dengan semua keunggulan
              ini, Mova menjadi pilihan utama sebagai Telegram video downloader
              gratis yang terpercaya dan selalu bisa diandalkan.
            </p>
          </div>
        </div>
      </section>

      {/* ── Cara Download Video Telegram ── */}
      <section className="px-4 py-8 border-t border-border">
        <div className="mx-auto max-w-md">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="h-5 w-5 text-primary shrink-0" />
            <h2 className="text-lg font-bold text-foreground">
              Cara Download Video Telegram
            </h2>
          </div>
          <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
            Download video dari Telegram menggunakan Mova sangat mudah dan hanya
            membutuhkan tiga langkah sederhana. Ikuti panduan berikut untuk
            menyimpan video Telegram favoritmu ke galeri perangkat:
          </p>
          <div className="space-y-3">
            {STEPS.map((step) => (
              <div
                key={step.num}
                className="flex gap-3 p-4 bg-card border border-border rounded-lg"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <span className="text-sm font-bold text-primary">
                    {step.num}
                  </span>
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground">
                    {step.title}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Keunggulan Mova Telegram Downloader ── */}
      <section className="px-4 py-8 border-t border-border bg-muted/30">
        <div className="mx-auto max-w-md">
          <div className="flex items-center gap-2 mb-4">
            <Download className="h-5 w-5 text-primary shrink-0" />
            <h2 className="text-lg font-bold text-foreground">
              Keunggulan Mova Telegram Downloader
            </h2>
          </div>
          <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
            Mova menyediakan Telegram video downloader terbaik dengan berbagai
            keunggulan yang menjadikannya pilihan utama untuk menyimpan video
            dari Telegram:
          </p>
          <div className="space-y-3">
            {ADVANTAGES.map((adv) => {
              const Icon = adv.icon;
              return (
                <div
                  key={adv.label}
                  className="flex gap-3 p-4 bg-card border border-border rounded-lg"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground">
                      {adv.label}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                      {adv.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="px-4 py-8 border-t border-border">
        <div className="mx-auto max-w-md">
          <div className="flex items-center gap-2 mb-1">
            <CircleHelp className="h-5 w-5 text-primary shrink-0" />
            <h2 className="text-lg font-bold text-foreground">
              Pertanyaan Umum tentang Download Video Telegram
            </h2>
          </div>
          <p className="text-xs text-muted-foreground mb-5 max-w-sm">
            Jawaban lengkap untuk pertanyaan yang sering ditanyakan tentang
            download video Telegram dan cara menyimpan video Telegram ke
            galeri.
          </p>
          <Accordion type="single" collapsible className="w-full space-y-2">
            {FAQS.map((item, i) => (
              <AccordionItem
                key={i}
                value={`telegram-faq-${i}`}
                className="bg-card border border-border rounded-lg px-4 data-[state=open]:shadow-sm"
              >
                <AccordionTrigger className="text-sm text-foreground text-left hover:no-underline py-3">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground pb-3 leading-relaxed">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ── Closing: Mova sebagai Telegram Downloader ── */}
      <section className="px-4 py-8 border-t border-border bg-muted/30">
        <div className="mx-auto max-w-md">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
            <h2 className="text-lg font-bold text-foreground">
              Mova — Telegram Video Downloader Terbaik
            </h2>
          </div>
          <div className="text-sm text-muted-foreground leading-relaxed space-y-4">
            <p>
              Mova adalah Telegram video downloader gratis terbaik yang
              dirancang khusus untuk memudahkan kamu menyimpan video dari
              Telegram ke galeri perangkat dalam kualitas HD. Dengan proses
              download yang cepat dan hasil video yang tajam, Mova memenuhi
              semua kebutuhan download video Telegram dalam satu platform yang
              simpel dan mudah digunakan. Kamu tidak perlu menginstall aplikasi
              apapun — cukup buka getmova.my.id/telegram-downloader di browser,
              tempel link video Telegram, dan langsung download video favoritmu
              dalam hitungan detik. Mova memastikan setiap video yang
              dihasilkan memiliki kualitas terbaik yang tersedia, sehingga kamu
              bisa menikmati konten video dari channel Telegram favorit dengan
              gambar yang jernih dan suara yang jelas.
            </p>
            <p>
              Keamanan dan privasi pengguna adalah prioritas utama Mova sebagai
              telegram video downloader. Kami tidak menyimpan data pribadi,
              riwayat download, atau file video kamu di server. Seluruh proses
              download video Telegram berjalan langsung tanpa perantara yang
              mencurigakan, sehingga aman dan privat. Tidak ada malware, virus,
              atau iklan pop-up berbahaya yang mengganggu pengalaman download
              kamu. Mova juga tidak pernah meminta akses ke akun Telegram —
              kamu hanya perlu menempelkan link video, tanpa login atau
              otorisasi apapun untuk menggunakan telegram downloader ini.
              Privasi dan keamanan datamu adalah jaminan yang kami utamakan.
            </p>
            <p>
              Mova kompatibel dengan semua perangkat dan sistem operasi, mulai
              dari smartphone Android dan iPhone, tablet, hingga komputer
              desktop dengan browser apapun. Selain Telegram downloader, Mova
              juga mendukung{" "}
              <a
                href="/tiktok-downloader"
                className="text-primary hover:underline"
              >
                download video TikTok tanpa watermark
              </a>
              ,{" "}
              <a
                href="/instagram-downloader"
                className="text-primary hover:underline"
              >
                download video Instagram Reels
              </a>
              ,{" "}
              <a
                href="/youtube-downloader"
                className="text-primary hover:underline"
              >
                download video YouTube
              </a>
              ,{" "}
              <a
                href="/facebook-downloader"
                className="text-primary hover:underline"
              >
                download video Facebook
              </a>
              ,{" "}
              <a
                href="/twitter-downloader"
                className="text-primary hover:underline"
              >
                download video Twitter/X
              </a>
              ,{" "}
              <a
                href="/pinterest-downloader"
                className="text-primary hover:underline"
              >
                download video Pinterest
              </a>
              ,{" "}
              <a
                href="/reddit-downloader"
                className="text-primary hover:underline"
              >
                download video Reddit
              </a>
              ,{" "}
              <a
                href="/youtube-mp3"
                className="text-primary hover:underline"
              >
                konversi YouTube ke MP3
              </a>
              , dan masih banyak lagi. Jadikan Mova sebagai satu-satunya alat
              download video yang kamu butuhkan — gratis, cepat, aman, dan
              selalu berkualitas terbaik. Coba sekarang dan rasakan kemudahan
              download video Telegram dengan Mova! Untuk pertanyaan atau
              saran, hubungi kami di{" "}
              <a
                href="mailto:admin@getmova.my.id"
                className="text-primary hover:underline"
              >
                admin@getmova.my.id
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </SEOPageLayout>
  );
}

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
    q: "Bagaimana cara download video Pinterest dengan Mova?",
    a: "Download video Pinterest dengan Mova sangat mudah dan cepat. Pertama, buka aplikasi Pinterest atau website Pinterest di browser, temukan video pin yang ingin kamu download, lalu salin link URL-nya dengan cara klik tombol Bagikan dan pilih Salin Link. Kedua, buka website Mova di getmova.my.id/pinterest-downloader, tempel link Pinterest yang sudah disalin ke kolom input download, lalu klik tombol Download. Ketiga, Mova akan memproses link tersebut dan menampilkan opsi kualitas video yang tersedia untuk diunduh. Seluruh proses download video Pinterest hanya membutuhkan beberapa detik dan kamu tidak perlu menginstall aplikasi apapun. File video akan langsung tersimpan di galeri HP atau perangkatmu dan bisa ditonton offline kapan saja.",
  },
  {
    q: "Apakah download video Pinterest di Mova gratis?",
    a: "Ya, sepenuhnya gratis tanpa biaya apapun. Mova tidak membebankan biaya untuk fitur download video Pinterest, baik untuk penggunaan sekali maupun berulang kali. Kamu tidak perlu mendaftar akun, login, atau memasukkan informasi pembayaran untuk menggunakan layanan Pinterest video downloader ini. Tidak ada batasan jumlah download per hari, sehingga kamu bisa mengunduh video dari Pinterest sebanyak yang kamu butuhkan. Mova juga tidak menyertakan iklan pop-up yang mengganggu atau redirect ke halaman berbahaya. Semua fitur Pinterest downloader di Mova bisa langsung digunakan secara gratis tanpa syarat apapun, menjadikannya pilihan terbaik untuk menyimpan video Pinterest ke galeri.",
  },
  {
    q: "Bisa download video Pinterest di HP Android atau iPhone?",
    a: "Tentu saja bisa. Mova Pinterest Video Downloader dirancang agar kompatibel dengan semua perangkat, termasuk smartphone Android, iPhone, tablet, dan komputer desktop. Kamu hanya perlu membuka browser di perangkatmu — seperti Chrome, Safari, Firefox, atau browser lainnya — lalu kunjungi getmova.my.id/pinterest-downloader. Tidak perlu menginstall aplikasi tambahan karena seluruh proses download video Pinterest berjalan langsung di browser. File video yang dihasilkan kompatibel dengan semua pemutar video di Android dan iOS, sehingga kamu bisa langsung menonton video hasil download tanpa konversi tambahan. Pengalaman download video Pinterest di HP sama saja dengan di komputer — cepat, mudah, dan gratis.",
  },
  {
    q: "Apakah kualitas video Pinterest yang didownload bagus?",
    a: "Ya, Mova mengunduh video Pinterest dalam kualitas terbaik yang tersedia. Mova mengekstrak video dari Pinterest pada resolusi tertinggi yang dimungkinkan, biasanya dalam kualitas HD tergantung kualitas video asli yang diupload oleh pembuat pin. Semakin tinggi resolusi video aslinya, semakin tajam dan jernih video yang akan kamu dapatkan. Kualitas video dari Mova setara dengan menonton video langsung di Pinterest, sehingga kamu bisa menikmati konten video favorit dengan gambar yang jelas dan suara yang bagus. Perlu diingat bahwa kualitas video juga bergantung pada sumber video Pinterest aslinya — video yang diupload dalam resolusi tinggi akan menghasilkan file download yang lebih baik pula.",
  },
];

/* ── Advantage Data ── */
const ADVANTAGES = [
  {
    icon: Shield,
    label: "Aman & Privat",
    desc: "Download video Pinterest dengan aman tanpa malware atau virus. Mova tidak menyimpan data pribadi atau riwayat download kamu di server. Seluruh proses download berjalan langsung tanpa perantara yang mencurigakan, sehingga privasi kamu tetap terjaga.",
  },
  {
    icon: Zap,
    label: "Cepat & Gratis",
    desc: "Proses download video Pinterest hanya membutuhkan beberapa detik. Tanpa biaya, tanpa registrasi, dan tanpa batas penggunaan. Cukup tempel link Pinterest dan langsung download video secara instan tanpa menunggu lama.",
  },
  {
    icon: Infinity,
    label: "Tanpa Batas Download",
    desc: "Download video dari Pinterest sebanyak apapun tanpa batasan jumlah. Mova tidak membatasi berapa kali kamu bisa mengunduh video Pinterest per hari. Simpan semua video inspiratif dan kreatif dari Pinterest tanpa khawatir kehabisan kuota download.",
  },
  {
    icon: Download,
    label: "Kualitas HD",
    desc: "Simpan video Pinterest dalam kualitas HD terbaik yang tersedia. Mova mengekstrak video pada resolusi tertinggi sehingga hasil download tetap tajam dan jernih. Nikmati video Pinterest favoritmu secara offline dengan kualitas gambar yang memuaskan.",
  },
];

/* ── Steps Data ── */
const STEPS = [
  {
    num: "1",
    title: "Salin Link Video Pinterest",
    desc: "Buka aplikasi Pinterest atau website Pinterest di browser, temukan video pin yang ingin kamu download, lalu salin link URL-nya. Kamu bisa klik tombol Bagikan pada pin video tersebut dan pilih Salin Link, atau salin langsung dari address bar browser jika menggunakan Pinterest web.",
  },
  {
    num: "2",
    title: "Tempel Link di Mova",
    desc: "Buka website Mova di getmova.my.id/pinterest-downloader, tempel link Pinterest yang sudah disalin ke kolom input download. Mova akan secara otomatis mendeteksi dan memproses link video Pinterest tersebut untuk disiapkan proses download.",
  },
  {
    num: "3",
    title: "Download Video Pinterest",
    desc: "Klik tombol Download, lalu Mova akan mengekstrak video dari Pinterest dalam kualitas terbaik yang tersedia. File video akan langsung tersimpan di perangkatmu dalam hitungan detik, siap ditonton offline kapan saja dan di mana saja tanpa perlu koneksi internet.",
  },
];

/* ── JSON-LD Schemas ── */
const jsonLdWebPage = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Pinterest Video Downloader - Download Video Pinterest Gratis",
  description:
    "Download video Pinterest ke galeri HP dengan mudah dan gratis. Simpan video Pinterest tanpa watermark dalam kualitas HD.",
  url: "https://getmova.my.id/pinterest-downloader",
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
        name: "Pinterest Downloader",
        item: "https://getmova.my.id/pinterest-downloader",
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
  name: "Mova Pinterest Video Downloader",
  applicationCategory: "MultimediaApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "IDR",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.3",
    ratingCount: "156",
  },
};

export default function PinterestDownloaderPage() {
  return (
    <SEOPageLayout
      title="Pinterest Video Downloader - Download Video Pinterest Gratis"
      description="Download video Pinterest ke galeri HP dengan mudah dan gratis. Simpan video Pinterest tanpa watermark dalam kualitas HD."
      platform="Pinterest"
      placeholder="Tempel link Pinterest di sini..."
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

      {/* ── Download Video Pinterest dengan Mova ── */}
      <section className="px-4 py-8 border-t border-border bg-muted/30">
        <div className="mx-auto max-w-md">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="h-5 w-5 text-primary shrink-0" />
            <h2 className="text-lg font-bold text-foreground">
              Download Video Pinterest dengan Mova
            </h2>
          </div>
          <div className="text-sm text-muted-foreground leading-relaxed space-y-4">
            <p>
              Pinterest adalah salah satu platform inspirasi terbesar di dunia
              yang dipenuhi dengan jutaan video kreatif mulai dari resep masakan,
              tutorial DIY, tips kecantikan, hingga ide dekorasi rumah. Namun,
              Pinterest tidak menyediakan fitur bawaan untuk menyimpan video
              langsung ke galeri perangkat. Itulah mengapa banyak pengguna
              Pinterest membutuhkan Pinterest video downloader untuk menyimpan
              video inspiratif favorit mereka agar bisa ditonton kembali secara
              offline. Dengan download video Pinterest, kamu bisa mengakses
              konten video favoritmu kapan saja tanpa perlu koneksi internet,
              bahkan ketika video tersebut sudah dihapus oleh pembuatnya.
            </p>
            <p>
              Ada banyak alasan mengapa seseorang membutuhkan download video
              pinterest. Pertama, untuk menyimpan tutorial dan resep yang
              berguna agar bisa diakses saat memasak atau beraktivitas tanpa
              harus membuka Pinterest. Kedua, mengoleksi video inspirasi dari
              berbagai kategori seperti fashion, travel, dan seni untuk dijadikan
              referensi di kemudian hari. Ketiga, membagikan video Pinterest ke
              platform lain seperti WhatsApp atau Telegram yang tidak mendukung
              share langsung dari Pinterest. Keempat, menyimpan video sebelum
              kemungkinan dihapus oleh pemiliknya. Mova hadir sebagai solusi
              pinterest downloader yang memudahkan semua kebutuhan tersebut
              dengan cara yang simpel, cepat, dan gratis. Kamu juga bisa
              menggunakan{" "}
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
              Mova hadir sebagai Pinterest video downloader terbaik yang
              menggabungkan kecepatan, kualitas, dan kemudahan dalam satu
              platform. Dengan Mova, kamu tidak perlu menginstall aplikasi
              tambahan atau mendaftar akun — cukup tempel link video Pinterest
              dan langsung download. Mova mengekstrak video dari Pinterest dalam
              kualitas terbaik yang tersedia, sehingga gambar dan suara yang
              dihasilkan tetap tajam dan jernih meskipun telah disimpan ke
              perangkatmu. Seluruh proses download video pinterest berjalan
              langsung di browser tanpa perlu software atau plugin tambahan,
              menjadikannya solusi paling praktis untuk menyimpan video dari
              Pinterest. Baca panduan lengkapnya di{" "}
              <a
                href="/blog/cara-download-video-pinterest"
                className="text-primary hover:underline"
              >
                blog cara download video Pinterest
              </a>{" "}
              kami.
            </p>
            <p>
              Keunggulan lainnya dari Mova sebagai pinterest downloader adalah
              kecepatan proses yang sangat tinggi. Server Mova dioptimalkan
              untuk menangani download video dalam hitungan detik, bukan menit.
              Kamu tidak perlu menunggu lama untuk mendapatkan video Pinterest
              favorit — cukup tempel link, klik download, dan file video langsung
              tersimpan di perangkatmu. Mova juga kompatibel dengan semua
              perangkat dan browser, baik di smartphone Android, iPhone, tablet,
              maupun komputer desktop. Dengan semua keunggulan ini, Mova menjadi
              pilihan utama sebagai Pinterest video downloader gratis yang
              terpercaya dan selalu bisa diandalkan.
            </p>
          </div>
        </div>
      </section>

      {/* ── Cara Download Video Pinterest ── */}
      <section className="px-4 py-8 border-t border-border">
        <div className="mx-auto max-w-md">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="h-5 w-5 text-primary shrink-0" />
            <h2 className="text-lg font-bold text-foreground">
              Cara Download Video Pinterest
            </h2>
          </div>
          <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
            Download video dari Pinterest menggunakan Mova sangat mudah dan hanya
            membutuhkan tiga langkah sederhana. Ikuti panduan berikut untuk
            menyimpan video Pinterest favoritmu ke galeri perangkat:
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

      {/* ── Keunggulan Mova Pinterest Downloader ── */}
      <section className="px-4 py-8 border-t border-border bg-muted/30">
        <div className="mx-auto max-w-md">
          <div className="flex items-center gap-2 mb-4">
            <Download className="h-5 w-5 text-primary shrink-0" />
            <h2 className="text-lg font-bold text-foreground">
              Keunggulan Mova Pinterest Downloader
            </h2>
          </div>
          <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
            Mova menyediakan Pinterest video downloader terbaik dengan berbagai
            keunggulan yang menjadikannya pilihan utama untuk menyimpan video
            dari Pinterest:
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
              Pertanyaan Umum tentang Download Video Pinterest
            </h2>
          </div>
          <p className="text-xs text-muted-foreground mb-5 max-w-sm">
            Jawaban lengkap untuk pertanyaan yang sering ditanyakan tentang
            download video Pinterest dan cara menyimpan video Pinterest ke
            galeri.
          </p>
          <Accordion type="single" collapsible className="w-full space-y-2">
            {FAQS.map((item, i) => (
              <AccordionItem
                key={i}
                value={`pinterest-faq-${i}`}
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

      {/* ── Closing: Mova sebagai Pinterest Downloader ── */}
      <section className="px-4 py-8 border-t border-border bg-muted/30">
        <div className="mx-auto max-w-md">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
            <h2 className="text-lg font-bold text-foreground">
              Mova — Pinterest Video Downloader Terbaik
            </h2>
          </div>
          <div className="text-sm text-muted-foreground leading-relaxed space-y-4">
            <p>
              Mova adalah Pinterest video downloader gratis terbaik yang
              dirancang khusus untuk memudahkan kamu menyimpan video dari
              Pinterest ke galeri perangkat dalam kualitas HD. Dengan proses
              download yang cepat dan hasil video yang tajam, Mova memenuhi semua
              kebutuhan download video Pinterest dalam satu platform yang simpel
              dan mudah digunakan. Kamu tidak perlu menginstall aplikasi apapun —
              cukup buka getmova.my.id/pinterest-downloader di browser, tempel
              link video Pinterest, dan langsung download video favoritmu dalam
              hitungan detik. Mova memastikan setiap video yang dihasilkan
              memiliki kualitas terbaik yang tersedia.
            </p>
            <p>
              Keamanan dan privasi pengguna adalah prioritas utama Mova sebagai
              pinterest video downloader. Kami tidak menyimpan data pribadi,
              riwayat download, atau file video kamu di server. Seluruh proses
              download video Pinterest berjalan langsung tanpa perantara yang
              mencurigakan, sehingga aman dan privat. Tidak ada malware, virus,
              atau iklan pop-up berbahaya yang mengganggu pengalaman download
              kamu. Mova juga tidak pernah meminta akses ke akun Pinterest — kamu
              hanya perlu menempelkan link video, tanpa login atau otorisasi
              apapun untuk menggunakan pinterest downloader ini.
            </p>
            <p>
              Mova kompatibel dengan semua perangkat dan sistem operasi, mulai
              dari smartphone Android dan iPhone, tablet, hingga komputer desktop
              dengan browser apapun. Selain Pinterest downloader, Mova juga
              mendukung{" "}
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
                href="/reddit-downloader"
                className="text-primary hover:underline"
              >
                download video Reddit
              </a>
              ,{" "}
              <a
                href="/telegram-downloader"
                className="text-primary hover:underline"
              >
                download video Telegram
              </a>
              ,{" "}
              <a
                href="/youtube-mp3"
                className="text-primary hover:underline"
              >
                konversi YouTube ke MP3
              </a>
              , dan masih banyak lagi. Jadikan Mova sebagai satu-satunya alat
              download video yang kamu butuhkan — gratis, cepat, aman, dan selalu
              berkualitas terbaik. Coba sekarang dan rasakan kemudahan download
              video Pinterest dengan Mova!
            </p>
          </div>
        </div>
      </section>
    </SEOPageLayout>
  );
}

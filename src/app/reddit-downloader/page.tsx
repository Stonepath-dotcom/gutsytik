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
    q: "Bagaimana cara download video Reddit dengan Mova?",
    a: "Download video Reddit dengan Mova sangat mudah dan cepat. Pertama, buka aplikasi Reddit atau website Reddit di browser, temukan post video yang ingin kamu download dari subreddit favorit, lalu salin link URL-nya dengan cara klik tombol Share dan pilih Copy Link. Kedua, buka website Mova di getmova.my.id/reddit-downloader, tempel link Reddit yang sudah disalin ke kolom input download, lalu klik tombol Download. Ketiga, Mova akan memproses link tersebut dan menggabungkan video serta audio dari Reddit secara otomatis, lalu menampilkan opsi kualitas video yang tersedia. Seluruh proses download video Reddit hanya membutuhkan beberapa detik dan kamu tidak perlu menginstall aplikasi apapun. File video akan langsung tersimpan di perangkatmu lengkap dengan audio dan bisa ditonton offline kapan saja.",
  },
  {
    q: "Mengapa video Reddit yang didownload tidak ada suaranya?",
    a: "Masalah video Reddit tanpa audio adalah hal yang umum terjadi karena Reddit menyimpan video dan audio sebagai file terpisah. Banyak Reddit downloader hanya mengunduh file video tanpa audio, sehingga hasilnya menjadi video bisu. Namun, Mova secara otomatis menggabungkan video dan audio dari Reddit menjadi satu file MP4 yang lengkap, sehingga kamu akan mendapatkan video dengan suara yang sempurna. Mova menggunakan teknologi muxing yang menggabungkan kedua komponen tersebut tanpa mengurangi kualitas audio maupun video. Dengan Mova, kamu tidak perlu lagi menggunakan tool terpisah untuk menambahkan audio ke video Reddit — semuanya sudah ditangani secara otomatis dalam satu proses download.",
  },
  {
    q: "Apakah download video Reddit di Mova gratis?",
    a: "Ya, sepenuhnya gratis tanpa biaya apapun. Mova tidak membebankan biaya untuk fitur download video Reddit, baik untuk penggunaan sekali maupun berulang kali. Kamu tidak perlu mendaftar akun, login, atau memasukkan informasi pembayaran untuk menggunakan layanan Reddit video downloader ini. Tidak ada batasan jumlah download per hari, sehingga kamu bisa mengunduh video dari subreddit favorit sebanyak yang kamu butuhkan. Mova juga tidak menyertakan iklan pop-up yang mengganggu atau redirect ke halaman berbahaya. Semua fitur Reddit downloader di Mova bisa langsung digunakan secara gratis tanpa syarat apapun.",
  },
  {
    q: "Bisa download video Reddit di HP Android atau iPhone?",
    a: "Tentu saja bisa. Mova Reddit Video Downloader dirancang agar kompatibel dengan semua perangkat, termasuk smartphone Android, iPhone, tablet, dan komputer desktop. Kamu hanya perlu membuka browser di perangkatmu — seperti Chrome, Safari, Firefox, atau browser lainnya — lalu kunjungi getmova.my.id/reddit-downloader. Tidak perlu menginstall aplikasi tambahan karena seluruh proses download video Reddit berjalan langsung di browser. File video MP4 yang dihasilkan kompatibel dengan semua pemutar video di Android dan iOS, sehingga kamu bisa langsung menonton video hasil download tanpa konversi tambahan. Pengalaman download video Reddit di HP sama mudahnya dengan di komputer.",
  },
];

/* ── Advantage Data ── */
const ADVANTAGES = [
  {
    icon: Shield,
    label: "Aman & Privat",
    desc: "Download video Reddit dengan aman tanpa malware atau virus. Mova tidak menyimpan data pribadi atau riwayat download kamu di server. Seluruh proses download berjalan langsung tanpa perantara yang mencurigakan, sehingga privasi kamu tetap terjaga sepenuhnya.",
  },
  {
    icon: Zap,
    label: "Cepat & Gratis",
    desc: "Proses download video Reddit hanya membutuhkan beberapa detik. Tanpa biaya, tanpa registrasi, dan tanpa batas penggunaan. Cukup tempel link Reddit dan langsung download video dengan audio lengkap secara instan tanpa menunggu lama.",
  },
  {
    icon: Infinity,
    label: "Tanpa Batas Download",
    desc: "Download video dari Reddit sebanyak apapun tanpa batasan jumlah. Mova tidak membatasi berapa kali kamu bisa mengunduh video Reddit per hari. Simpan semua video menarik dari subreddit favorit tanpa khawatir kehabisan kuota download.",
  },
  {
    icon: Download,
    label: "Audio Lengkap",
    desc: "Mova secara otomatis menggabungkan video dan audio Reddit menjadi satu file MP4 yang sempurna. Tidak ada lagi video bisu — setiap video yang kamu download dari Reddit akan memiliki suara yang jernih dan sinkron dengan gambar.",
  },
];

/* ── Steps Data ── */
const STEPS = [
  {
    num: "1",
    title: "Salin Link Video Reddit",
    desc: "Buka aplikasi Reddit atau website Reddit di browser, temukan post video yang ingin kamu download dari subreddit mana pun, lalu salin link URL-nya. Kamu bisa klik tombol Share pada post video tersebut dan pilih Copy Link, atau salin langsung dari address bar browser.",
  },
  {
    num: "2",
    title: "Tempel Link di Mova",
    desc: "Buka website Mova di getmova.my.id/reddit-downloader, tempel link Reddit yang sudah disalin ke kolom input download. Mova akan secara otomatis mendeteksi dan memproses link video Reddit tersebut, termasuk menggabungkan komponen video dan audio.",
  },
  {
    num: "3",
    title: "Download Video Reddit dengan Audio",
    desc: "Klik tombol Download, lalu Mova akan menggabungkan video dan audio dari Reddit secara otomatis dan menyiapkan file MP4 lengkap untuk diunduh. File video dengan audio akan langsung tersimpan di perangkatmu dalam hitungan detik, siap ditonton offline kapan saja.",
  },
];

/* ── JSON-LD Schemas ── */
const jsonLdWebPage = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Reddit Video Downloader - Download Video Reddit dengan Audio",
  description:
    "Download video Reddit dengan audio lengkap. Simpan video dari subreddit favorit kamu dalam kualitas terbaik, gratis dan cepat.",
  url: "https://getmova.my.id/reddit-downloader",
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
        name: "Reddit Downloader",
        item: "https://getmova.my.id/reddit-downloader",
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
  name: "Mova Reddit Video Downloader",
  applicationCategory: "MultimediaApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "IDR",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.4",
    ratingCount: "178",
  },
};

export default function RedditDownloaderPage() {
  return (
    <SEOPageLayout
      title="Reddit Video Downloader - Download Video Reddit dengan Audio"
      description="Download video Reddit dengan audio lengkap. Simpan video dari subreddit favorit kamu dalam kualitas terbaik, gratis dan cepat."
      platform="Reddit"
      placeholder="Tempel link Reddit di sini..."
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

      {/* ── Download Video Reddit dengan Mova ── */}
      <section className="px-4 py-8 border-t border-border bg-muted/30">
        <div className="mx-auto max-w-md">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="h-5 w-5 text-primary shrink-0" />
            <h2 className="text-lg font-bold text-foreground">
              Download Video Reddit dengan Mova
            </h2>
          </div>
          <div className="text-sm text-muted-foreground leading-relaxed space-y-4">
            <p>
              Reddit adalah salah satu platform diskusi dan komunitas terbesar di
              dunia yang memiliki jutaan video menarik dari berbagai subreddit
              mulai dari r/funny, r/gaming, r/educationalvideos, hingga
              r/documentaries. Namun, Reddit tidak menyediakan tombol download
              bawaan untuk menyimpan video langsung ke perangkat. Selain itu,
              Reddit menyimpan video dan audio sebagai file terpisah, sehingga
              banyak downloader biasa hanya menghasilkan video tanpa suara. Itulah
              mengapa kamu membutuhkan Reddit video downloader yang mampu
              menggabungkan video dan audio secara otomatis. Dengan download video
              Reddit melalui Mova, kamu bisa menyimpan konten video favorit dari
              subreddit mana pun lengkap dengan audio dalam satu file MP4 yang
              sempurna.
            </p>
            <p>
              Ada banyak alasan mengapa seseorang membutuhkan download video
              reddit. Pertama, untuk menyimpan video lucu, menghibur, atau
              informatif dari subreddit favorit agar bisa ditonton kembali secara
              offline tanpa koneksi internet. Kedua, membagikan video Reddit ke
              platform lain seperti WhatsApp, Telegram, atau Instagram yang tidak
              mendukung share langsung dari Reddit. Ketiga, mengarsipkan video
              penting atau langka dari Reddit sebelum kemungkinan dihapus oleh
              poster atau moderator subreddit. Keempat, menonton video Reddit
              tanpa gangguan iklan atau buffering yang sering terjadi saat
              streaming. Mova hadir sebagai solusi reddit downloader yang
              memudahkan semua kebutuhan tersebut dengan cara yang simpel, cepat,
              dan gratis. Jika kamu juga ingin mendownload video dari platform
              lain, coba{" "}
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
              dari Mova.
            </p>
            <p>
              Mova hadir sebagai Reddit video downloader terbaik yang secara
              otomatis menggabungkan video dan audio dari Reddit menjadi satu file
              MP4 yang lengkap. Masalah video Reddit tanpa suara adalah kendala
              utama yang dihadapi pengguna saat menggunakan downloader biasa,
              karena Reddit menyimpan komponen visual dan audio secara terpisah.
              Mova menyelesaikan masalah ini dengan teknologi muxing yang
              menggabungkan kedua komponen tersebut secara otomatis tanpa
              mengurangi kualitas. Dengan Mova, kamu tidak perlu menginstall
              aplikasi tambahan atau menggunakan tool terpisah — cukup tempel link
              video Reddit dan langsung download video dengan audio yang
              sempurna. Seluruh proses download video reddit berjalan langsung di
              browser tanpa perlu software atau plugin tambahan, menjadikannya
              solusi paling praktis untuk menyimpan video dari Reddit.
            </p>
            <p>
              Keunggulan lainnya dari Mova sebagai reddit downloader adalah
              kecepatan proses yang sangat tinggi. Server Mova dioptimalkan
              untuk menangani download dan penggabungan video-audio Reddit dalam
              hitungan detik, bukan menit. Kamu tidak perlu menunggu lama untuk
              mendapatkan video Reddit favorit — cukup tempel link, klik download,
              dan file video lengkap dengan audio langsung tersimpan di
              perangkatmu. Mova juga kompatibel dengan semua perangkat dan
              browser, baik di smartphone Android, iPhone, tablet, maupun
              komputer desktop. Dengan semua keunggulan ini, Mova menjadi pilihan
              utama sebagai Reddit video downloader gratis yang terpercaya dan
              selalu bisa diandalkan.
            </p>
          </div>
        </div>
      </section>

      {/* ── Cara Download Video Reddit ── */}
      <section className="px-4 py-8 border-t border-border">
        <div className="mx-auto max-w-md">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="h-5 w-5 text-primary shrink-0" />
            <h2 className="text-lg font-bold text-foreground">
              Cara Download Video Reddit
            </h2>
          </div>
          <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
            Download video dari Reddit menggunakan Mova sangat mudah dan hanya
            membutuhkan tiga langkah sederhana. Ikuti panduan berikut untuk
            menyimpan video Reddit favoritmu lengkap dengan audio:
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

      {/* ── Keunggulan Mova Reddit Downloader ── */}
      <section className="px-4 py-8 border-t border-border bg-muted/30">
        <div className="mx-auto max-w-md">
          <div className="flex items-center gap-2 mb-4">
            <Download className="h-5 w-5 text-primary shrink-0" />
            <h2 className="text-lg font-bold text-foreground">
              Keunggulan Mova Reddit Downloader
            </h2>
          </div>
          <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
            Mova menyediakan Reddit video downloader terbaik dengan berbagai
            keunggulan yang menjadikannya pilihan utama untuk menyimpan video
            dari Reddit lengkap dengan audio:
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
              Pertanyaan Umum tentang Download Video Reddit
            </h2>
          </div>
          <p className="text-xs text-muted-foreground mb-5 max-w-sm">
            Jawaban lengkap untuk pertanyaan yang sering ditanyakan tentang
            download video Reddit dan masalah audio pada video Reddit.
          </p>
          <Accordion type="single" collapsible className="w-full space-y-2">
            {FAQS.map((item, i) => (
              <AccordionItem
                key={i}
                value={`reddit-faq-${i}`}
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

      {/* ── Closing: Mova sebagai Reddit Downloader ── */}
      <section className="px-4 py-8 border-t border-border bg-muted/30">
        <div className="mx-auto max-w-md">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
            <h2 className="text-lg font-bold text-foreground">
              Mova — Reddit Video Downloader Terbaik
            </h2>
          </div>
          <div className="text-sm text-muted-foreground leading-relaxed space-y-4">
            <p>
              Mova adalah Reddit video downloader gratis terbaik yang dirancang
              khusus untuk memudahkan kamu menyimpan video dari Reddit lengkap
              dengan audio dalam satu file MP4 yang sempurna. Dengan teknologi
              muxing otomatis, Mova menggabungkan komponen video dan audio Reddit
              yang terpisah menjadi satu file yang bisa langsung diputar di semua
              perangkat. Kamu tidak perlu menginstall aplikasi apapun — cukup buka
              getmova.my.id/reddit-downloader di browser, tempel link video
              Reddit, dan langsung download video favoritmu lengkap dengan suara
              dalam hitungan detik. Mova memastikan setiap video yang dihasilkan
              memiliki audio yang jernih dan sinkron sempurna.
            </p>
            <p>
              Keamanan dan privasi pengguna adalah prioritas utama Mova sebagai
              reddit video downloader. Kami tidak menyimpan data pribadi, riwayat
              download, atau file video kamu di server. Seluruh proses download
              video Reddit berjalan langsung tanpa perantara yang mencurigakan,
              sehingga aman dan privat. Tidak ada malware, virus, atau iklan
              pop-up berbahaya yang mengganggu pengalaman download kamu. Mova juga
              tidak pernah meminta akses ke akun Reddit — kamu hanya perlu
              menempelkan link video, tanpa login atau otorisasi apapun untuk
              menggunakan reddit downloader ini.
            </p>
            <p>
              Mova kompatibel dengan semua perangkat dan sistem operasi, mulai
              dari smartphone Android dan iPhone, tablet, hingga komputer desktop
              dengan browser apapun. Selain Reddit downloader, Mova juga
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
                href="/pinterest-downloader"
                className="text-primary hover:underline"
              >
                download video Pinterest
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
              menghasilkan video dengan audio yang sempurna. Coba sekarang dan
              rasakan kemudahan download video Reddit dengan Mova!
            </p>
          </div>
        </div>
      </section>
    </SEOPageLayout>
  );
}

"use client";

import React from "react";
import {
  Headphones,
  Shield,
  Zap,
  Infinity,
  FileAudio,
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
    q: "Bagaimana cara konversi YouTube ke MP3 di Mova?",
    a: "Konversi YouTube ke MP3 di Mova sangat mudah dan cepat. Pertama, salin link video YouTube yang ingin kamu konversi ke MP3 dari address bar browser atau tombol Bagikan di aplikasi YouTube. Kedua, tempel link tersebut ke kolom input di halaman Mova YouTube MP3 converter, lalu klik tombol Download MP3. Ketiga, Mova akan memproses video tersebut dan mengekstrak audionya dalam format MP3 berkualitas tinggi. Seluruh proses konversi youtube ke mp3 hanya membutuhkan beberapa detik dan kamu tidak perlu menginstall aplikasi apapun. Hasil file MP3 bisa langsung diputar di semua perangkat dan aplikasi pemutar musik tanpa masalah kompatibilitas.",
  },
  {
    q: "Apakah kualitas audio MP3 dari YouTube bagus?",
    a: "Ya, Mova mengkonversi video YouTube ke MP3 dengan kualitas audio terbaik yang tersedia. Mova mengekstrak audio dari video YouTube pada bitrate tertinggi yang dimungkinkan, biasanya 128kbps hingga 320kbps tergantung kualitas audio asli dari video tersebut. Semakin tinggi bitrate audio, semakin jernih dan detail suara yang dihasilkan dalam file MP3. Kualitas audio MP3 dari Mova setara dengan mendengarkan musik di platform streaming populer, sehingga kamu bisa menikmati lagu dan podcast dengan suara yang jernih dan nyaman. Perlu diingat bahwa kualitas audio MP3 juga bergantung pada sumber video YouTube aslinya — video dengan audio berkualitas tinggi akan menghasilkan file MP3 yang lebih baik pula.",
  },
  {
    q: "Apakah konversi YouTube ke MP3 di Mova gratis?",
    a: "Ya, sepenuhnya gratis tanpa biaya apapun. Mova tidak membebankan biaya untuk fitur konversi YouTube ke MP3, baik untuk penggunaan sekali maupun berulang kali. Kamu tidak perlu mendaftar akun, login, atau memasukkan informasi pembayaran untuk menggunakan layanan youtube to mp3 converter ini. Tidak ada batasan jumlah konversi per hari, sehingga kamu bisa mengunduh audio dari video YouTube sebanyak yang kamu butuhkan. Mova juga tidak menyertakan iklan pop-up yang mengganggu atau redirect ke halaman berbahaya. Semua fitur YouTube MP3 converter di Mova bisa langsung digunakan secara gratis tanpa syarat apapun, menjadikannya pilihan terbaik untuk download lagu dari YouTube.",
  },
  {
    q: "Bisa download MP3 dari YouTube di HP Android atau iPhone?",
    a: "Tentu saja bisa. Mova YouTube MP3 converter dirancang agar kompatibel dengan semua perangkat, termasuk smartphone Android, iPhone, tablet, dan komputer desktop. Kamu hanya perlu membuka browser di perangkatmu — seperti Chrome, Safari, Firefox, atau browser lainnya — lalu kunjungi getmova.my.id/youtube-mp3. Tidak perlu menginstall aplikasi tambahan karena seluruh proses konversi YouTube ke MP3 berjalan langsung di browser. File MP3 yang dihasilkan juga kompatibel dengan semua aplikasi pemutar musik di Android dan iOS, sehingga kamu bisa langsung memutar lagu hasil download tanpa konversi tambahan. Pengalaman download mp3 youtube di HP sama saja dengan di komputer — cepat, mudah, dan gratis.",
  },
  {
    q: "Apa perbedaan download MP3 dan video MP4 dari YouTube?",
    a: "Perbedaan utama antara download MP3 dan MP4 dari YouTube terletak pada jenis konten yang kamu simpan. Format MP3 hanya berisi audio atau suara dari video YouTube, tanpa gambar atau video sama sekali. Format ini cocok untuk menyimpan lagu, podcast, audiobook, atau konten audio lainnya di mana kamu hanya membutuhkan suaranya saja. Sedangkan format MP4 berisi video lengkap beserta audionya, sehingga kamu bisa menonton dan mendengar konten tersebut sekaligus. File MP3 jauh lebih kecil ukurannya dibandingkan MP4 karena tidak menyimpan data visual, sehingga lebih menghemat ruang penyimpanan perangkat. Jika kamu hanya ingin mendengarkan musik atau podcast dari YouTube, pilihlah format MP3 karena lebih praktis dan hemat penyimpanan.",
  },
];

/* ── Advantage Data ── */
const ADVANTAGES = [
  {
    icon: Headphones,
    label: "Kualitas Tinggi",
    desc: "Konversi YouTube ke MP3 dengan bitrate tinggi hingga 320kbps. Suara yang dihasilkan jernih, detail, dan setara dengan kualitas audio di platform streaming musik populer. Nikmati lagu dan podcast favoritmu dengan kualitas audio terbaik.",
  },
  {
    icon: Zap,
    label: "Cepat & Gratis",
    desc: "Proses konversi YouTube ke MP3 hanya membutuhkan beberapa detik. Tanpa biaya, tanpa registrasi, dan tanpa batas penggunaan. Cukup tempel link YouTube dan langsung download audio MP3 secara instan tanpa menunggu lama.",
  },
  {
    icon: Infinity,
    label: "Tanpa Batas Download",
    desc: "Download MP3 dari YouTube sebanyak apapun tanpa batasan jumlah. Mova tidak membatasi berapa kali kamu bisa mengkonversi video YouTube ke MP3 per hari. Unduh semua lagu dan podcast favoritmu tanpa khawatir kehabisan kuota download.",
  },
  {
    icon: FileAudio,
    label: "Format Universal",
    desc: "File MP3 yang dihasilkan kompatibel dengan semua perangkat dan aplikasi pemutar musik — Android, iPhone, Windows, Mac, dan lainnya. Format MP3 adalah standar audio universal yang bisa diputar di mana saja tanpa masalah kompatibilitas.",
  },
];

/* ── Steps Data ── */
const STEPS = [
  {
    num: "1",
    title: "Salin Link Video YouTube",
    desc: "Buka YouTube di browser atau aplikasi, temukan video yang ingin kamu konversi ke MP3, lalu salin link URL dari address bar atau klik tombol Bagikan dan pilih Salin Link. Link YouTube biasanya berformat youtube.com/watch?v=... atau youtu.be/...",
  },
  {
    num: "2",
    title: "Tempel Link & Pilih Audio MP3",
    desc: "Buka website Mova di getmova.my.id/youtube-mp3, tempel link YouTube yang sudah disalin ke kolom input download. Pastikan mode Audio MP3 sudah aktif — Mova akan secara otomatis mendeteksi dan memproses link YouTube untuk konversi ke MP3.",
  },
  {
    num: "3",
    title: "Download File MP3",
    desc: "Klik tombol Download MP3, lalu Mova akan mengekstrak audio dari video YouTube dan mengkonversinya ke format MP3 berkualitas tinggi. File MP3 akan langsung tersimpan di perangkatmu dalam hitungan detik, siap diputar di aplikasi musik favoritmu.",
  },
];

export default function YouTubeMP3Page() {
  return (
    <SEOPageLayout
      title="YouTube ke MP3 - Download Audio Gratis"
      description="Konversi video YouTube ke MP3 gratis. Download lagu, podcast, dan audio dari YouTube dalam kualitas tinggi."
      platform="YouTube MP3"
      audioMode={true}
      placeholder="Tempel link YouTube untuk konversi MP3..."
    >
      {/* ── Konversi YouTube ke MP3 dengan Mova ── */}
      <section className="px-4 py-8 border-t border-border bg-muted/30">
        <div className="mx-auto max-w-md">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="h-5 w-5 text-primary shrink-0" />
            <h2 className="text-lg font-bold text-foreground">
              Konversi YouTube ke MP3 dengan Mova
            </h2>
          </div>
          <div className="text-sm text-muted-foreground leading-relaxed space-y-4">
            <p>
              Mendengarkan musik dan audio dari YouTube secara online memang
              menyenangkan, namun tidak selalu memungkinkan untuk selalu
              terhubung ke internet. Dengan konversi YouTube ke MP3, kamu bisa
              menyimpan lagu, podcast, dan konten audio lainnya dari YouTube
              langsung ke perangkatmu untuk dinikmati secara offline kapan saja
              dan di mana saja. Proses youtube ke mp3 memungkinkan kamu
              mengekstrak suara dari video YouTube tanpa perlu menyimpan file
              videonya, sehingga jauh lebih hemat ruang penyimpanan. Inilah
              mengapa banyak orang mencari youtube to mp3 converter untuk
              mendengarkan konten audio favorit mereka tanpa gangguan.
            </p>
            <p>
              Ada banyak alasan mengapa seseorang membutuhkan download mp3
              youtube. Pertama, untuk mendengarkan lagu favorit secara offline
              tanpa kuota internet. Kedua, menyimpan podcast atau audiobook dari
              YouTube agar bisa didengarkan saat bepergian, olahraga, atau
              beraktivitas tanpa perlu menatap layar. Ketiga, membuat koleksi
              musik pribadi dari berbagai video YouTube yang tidak tersedia di
              platform streaming musik. Keempat, menghemat baterai perangkat
              karena memutar file MP3 jauh lebih hemat energi dibandingkan
              streaming video YouTube. Semua kebutuhan tersebut bisa terpenuhi
              dengan konverter youtube mp3 yang berkualitas dan mudah digunakan.
            </p>
            <p>
              Mova hadir sebagai youtube to mp3 converter terbaik yang
              menggabungkan kecepatan, kualitas, dan kemudahan dalam satu
              platform. Dengan Mova, kamu tidak perlu menginstall aplikasi
              tambahan atau mendaftar akun — cukup tempel link video YouTube dan
              langsung konversi ke MP3. Mova mengekstrak audio dari video
              YouTube dengan bitrate tertinggi yang tersedia, sehingga kualitas
              suara yang dihasilkan tetap jernih dan detail meskipun telah
              dikonversi ke format MP3. Seluruh proses konversi youtube ke mp3
              berjalan langsung di browser tanpa perlu software atau plugin
              tambahan, menjadikannya solusi paling praktis untuk download lagu
              youtube.
            </p>
            <p>
              Keunggulan lainnya dari Mova sebagai youtube mp3 converter adalah
              kecepatan proses yang sangat tinggi. Server Mova dioptimalkan
              untuk menangani konversi audio dalam hitungan detik, bukan menit.
              Kamu tidak perlu menunggu lama untuk mendapatkan file MP3 dari
              video YouTube favorit — cukup tempel link, klik download, dan file
              audio langsung tersimpan di perangkatmu. Mova juga kompatibel
              dengan semua perangkat dan browser, baik di smartphone Android,
              iPhone, tablet, maupun komputer desktop. Dengan semua keunggulan
              ini, Mova menjadi pilihan utama sebagai YouTube MP3 converter
              gratis yang terpercaya dan selalu bisa diandalkan.
            </p>
          </div>
        </div>
      </section>

      {/* ── Cara Konversi YouTube ke MP3 ── */}
      <section className="px-4 py-8 border-t border-border">
        <div className="mx-auto max-w-md">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="h-5 w-5 text-primary shrink-0" />
            <h2 className="text-lg font-bold text-foreground">
              Cara Konversi YouTube ke MP3
            </h2>
          </div>
          <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
            Konversi video YouTube ke MP3 menggunakan Mova sangat mudah dan hanya
            membutuhkan tiga langkah sederhana. Ikuti panduan berikut untuk
            menyimpan audio YouTube favoritmu dalam format MP3 berkualitas tinggi:
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

      {/* ── Keunggulan Mova YouTube MP3 Converter ── */}
      <section className="px-4 py-8 border-t border-border bg-muted/30">
        <div className="mx-auto max-w-md">
          <div className="flex items-center gap-2 mb-4">
            <Headphones className="h-5 w-5 text-primary shrink-0" />
            <h2 className="text-lg font-bold text-foreground">
              Keunggulan Mova YouTube MP3 Converter
            </h2>
          </div>
          <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
            Mova menyediakan konverter YouTube ke MP3 terbaik dengan berbagai
            keunggulan yang menjadikannya pilihan utama untuk download audio
            dari YouTube:
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
              Pertanyaan Umum tentang YouTube ke MP3
            </h2>
          </div>
          <p className="text-xs text-muted-foreground mb-5 max-w-sm">
            Jawaban lengkap untuk pertanyaan yang sering ditanyakan tentang
            konversi YouTube ke MP3 dan download audio dari YouTube.
          </p>
          <Accordion type="single" collapsible className="w-full space-y-2">
            {FAQS.map((item, i) => (
              <AccordionItem
                key={i}
                value={`mp3-faq-${i}`}
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

      {/* ── Closing: Mova sebagai YouTube MP3 Converter ── */}
      <section className="px-4 py-8 border-t border-border bg-muted/30">
        <div className="mx-auto max-w-md">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
            <h2 className="text-lg font-bold text-foreground">
              Mova — YouTube MP3 Converter Terbaik Indonesia
            </h2>
          </div>
          <div className="text-sm text-muted-foreground leading-relaxed space-y-4">
            <p>
              Mova adalah YouTube MP3 converter gratis terbaik di Indonesia yang
              dirancang khusus untuk memudahkan kamu mengkonversi video YouTube
              ke format audio MP3 berkualitas tinggi. Dengan proses konversi yang
              cepat dan hasil audio yang jernih, Mova memenuhi semua kebutuhan
              download lagu dari YouTube dalam satu platform yang simpel dan
              mudah digunakan. Kamu tidak perlu menginstall aplikasi apapun —
              cukup buka getmova.my.id/youtube-mp3 di browser, tempel link
              YouTube, dan langsung download audio MP3 favoritmu dalam hitungan
              detik. Mova memastikan setiap file MP3 yang dihasilkan memiliki
              kualitas audio terbaik dengan bitrate tinggi.
            </p>
            <p>
              Keamanan dan privasi pengguna adalah prioritas utama Mova sebagai
              konverter youtube mp3. Kami tidak menyimpan data pribadi, riwayat
              download, atau file audio kamu di server. Seluruh proses konversi
              YouTube ke MP3 berjalan langsung tanpa perantara yang mencurigakan,
              sehingga aman dan privat. Tidak ada malware, virus, atau iklan
              pop-up berbahaya yang mengganggu pengalaman konversi audio kamu.
              Mova juga tidak pernah meminta akses ke akun Google atau YouTube —
              kamu hanya perlu menempelkan link video, tanpa login atau
              otorisasi apapun untuk menggunakan youtube to mp3 converter ini.
            </p>
            <p>
              Mova kompatibel dengan semua perangkat dan sistem operasi, mulai
              dari smartphone Android dan iPhone, tablet, hingga komputer desktop
              dengan browser apapun. Selain YouTube MP3 converter, Mova juga
              mendukung{" "}
              <a href="/youtube-downloader" className="text-primary hover:underline">
                download video YouTube dalam format MP4
              </a>
              ,{" "}
              <a href="/tiktok-downloader" className="text-primary hover:underline">
                download video TikTok tanpa watermark
              </a>
              ,{" "}
              <a href="/instagram-downloader" className="text-primary hover:underline">
                download Instagram Reels
              </a>
              ,{" "}
              <a href="/facebook-downloader" className="text-primary hover:underline">
                download video Facebook
              </a>
              ,{" "}
              <a href="/twitter-downloader" className="text-primary hover:underline">
                download video Twitter/X
              </a>
              ,{" "}
              <a href="/pinterest-downloader" className="text-primary hover:underline">
                download video Pinterest
              </a>
              ,{" "}
              <a href="/reddit-downloader" className="text-primary hover:underline">
                download video Reddit
              </a>
              , dan{" "}
              <a href="/telegram-downloader" className="text-primary hover:underline">
                download video Telegram
              </a>
              . Jadikan Mova sebagai
              satu-satunya alat download audio dan video yang kamu butuhkan —
              gratis, cepat, aman, dan selalu berkualitas terbaik. Coba sekarang
              dan rasakan kemudahan konversi YouTube ke MP3 dengan Mova!
            </p>
          </div>
        </div>
      </section>
    </SEOPageLayout>
  );
}

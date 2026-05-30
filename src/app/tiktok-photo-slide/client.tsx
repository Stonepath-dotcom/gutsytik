"use client";

import React from "react";
import { PlatformPageClient } from "@/components/platform-page-client";
import {
  Shield, Zap, Smartphone, Music, Image as ImageIcon, Download,
} from "lucide-react";

function TikTokIcon() {
  return (
    <svg className="h-3 w-3 text-white" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.43V13a8.28 8.28 0 005.58 2.15V11.7a4.83 4.83 0 01-3.77-1.24V6.69h3.77z"/>
    </svg>
  );
}

export function TikTokPhotoSlidePage() {
  return (
    <PlatformPageClient
      platformName="TikTok Photo Slide"
      platformColor="#010101"
      platformGradient="linear-gradient(135deg, #25F4EE, #FE2C55)"
      platformIcon={<TikTokIcon />}
      heroBadge="Fitur Baru!"
      heroTitle="Download Slide Foto TikTok"
      heroTitleHighlight="HD & Gratis"
      heroSubtitle="Simpan semua foto dari slide TikTok dalam kualitas HD. Download satu per satu atau sekaligus, lengkap dengan audio MP3!"
      inputPlaceholder="Tempel link slide foto TikTok di sini..."
      breadcrumbLabel="TikTok Photo Slide"
      features={[
        {
          icon: <ImageIcon className="h-5 w-5" />,
          title: "Download Foto Per Item",
          description: "Pilih dan download foto tertentu dari slide, atau download semua foto sekaligus dalam satu klik.",
        },
        {
          icon: <Download className="h-5 w-5" />,
          title: "Download Semua Sekaligus",
          description: "Satu tombol untuk mengunduh seluruh foto dalam slide TikTok secara otomatis ke perangkatmu.",
        },
        {
          icon: <Music className="h-5 w-5" />,
          title: "Ekstrak Audio MP3",
          description: "Selain foto, kamu juga bisa mengekstrak musik/audio dari slide TikTok jadi file MP3.",
        },
        {
          icon: <Shield className="h-5 w-5" />,
          title: "Kualitas HD Asli",
          description: "Foto di-download dalam resolusi asli tanpa kompresi. Kualitas sama persis dengan di TikTok.",
        },
        {
          icon: <Zap className="h-5 w-5" />,
          title: "Super Cepat",
          description: "Proses download foto dari slide TikTok hanya butuh beberapa detik. Server cepat dan handal.",
        },
        {
          icon: <Smartphone className="h-5 w-5" />,
          title: "Semua Perangkat",
          description: "Bisa diakses dari HP, tablet, dan laptop. Tidak perlu install aplikasi tambahan.",
        },
      ]}
      steps={[
        {
          title: "Salin Link Slide Foto TikTok",
          description: "Buka aplikasi TikTok, temukan konten slide foto yang ingin kamu download. Tap tombol Share (ikon panah) lalu pilih \"Salin tautan\" atau \"Copy Link\".",
        },
        {
          title: "Tempel Link di Mova",
          description: "Buka Mova di browser, tempel link TikTok yang sudah disalin ke kolom input di atas. Mova akan otomatis mendeteksi bahwa konten tersebut adalah slide foto.",
        },
        {
          title: "Download Foto",
          description: "Mova akan menampilkan semua foto dari slide dalam bentuk grid. Klik foto individual untuk download satu per satu, atau tekan tombol \"Download Semua Foto\" untuk mengunduh semuanya sekaligus!",
        },
      ]}
      faqs={[
        {
          question: "Apa itu slide foto TikTok?",
          answer: "Slide foto TikTok (juga disebut photo carousel atau photo slideshow) adalah konten TikTok yang terdiri dari beberapa foto yang ditampilkan secara bergantian dengan musik latar. Format ini sangat populer di TikTok untuk menampilkan portofolio, tips before-after, tutorial langkah demi langkah, dan berbagai konten visual lainnya. Biasanya berisi 2 hingga 35 foto dalam satu post.",
        },
        {
          question: "Bagaimana cara membedakan video biasa dengan slide foto?",
          answer: "Cara termudah adalah dengan melihat konten di TikTok. Slide foto biasanya memiliki ikon kamera atau indikator jumlah foto di bagian atas. Saat di-swipe, foto berpindah satu per satu dengan transisi yang berbeda dari video biasa. Saat kamu mem-paste link-nya di Mova, sistem kami akan otomatis mendeteksi bahwa konten tersebut adalah slide foto dan menampilkan hasilnya dalam bentuk grid foto.",
        },
        {
          question: "Apakah bisa download semua foto sekaligus?",
          answer: "Ya! Mova menyediakan tombol \"Download Semua Foto\" yang akan mengunduh seluruh foto dalam slide secara otomatis satu per satu ke perangkat kamu. Setiap foto akan disimpan dalam kualitas aslinya dengan penamaan yang rapi (foto_1.jpg, foto_2.jpg, dst). Proses download dilakukan secara berurutan agar browser tidak memblokir multiple downloads.",
        },
        {
          question: "Apakah kualitas foto tetap HD saat didownload?",
          answer: "Ya, Mova mendownload foto dalam resolusi aslinya tanpa kompresi atau penurunan kualitas. Kualitas foto yang kamu dapatkan sama persis dengan yang ditampilkan di TikTok. Jika foto diupload dalam resolusi tinggi (misalnya 1080x1920), maka foto yang didownload juga akan dalam resolusi tersebut.",
        },
        {
          question: "Apakah bisa download audio dari slide foto TikTok?",
          answer: "Ya, Mova juga menyediakan opsi untuk mengekstrak audio atau musik dari slide foto TikTok dan menyimpannya sebagai file MP3. Audio ini biasanya berupa lagu atau sound effect yang dipilih oleh pembuat konten untuk mengiringi slide foto mereka.",
        },
        {
          question: "Berapa jumlah maksimal foto yang bisa di-download dari satu slide?",
          answer: "TikTok membatasi jumlah foto dalam satu slide hingga sekitar 35 foto. Mova mendukung download seluruh foto dari slide berapa pun jumlahnya, selama konten tersebut bersifat publik dan bisa diakses.",
        },
      ]}
      seoSections={[
        {
          heading: "Apa Itu Slide Foto TikTok dan Mengapa Perlu Didownload?",
          content: (
            <>
              <p>
                Slide foto TikTok atau yang sering disebut <strong>TikTok photo carousel</strong> adalah salah satu format konten yang paling populer di platform TikTok saat ini. Berbeda dari video biasa, slide foto memungkinkan pengguna untuk mengunggah beberapa foto sekaligus dalam satu post, lengkap dengan musik latar dan efek transisi. Format ini sangat cocok untuk menampilkan konten seperti portofolio desain, tips dan trik langkah demi langkah, before-after transformation, resep masakan, dan masih banyak lagi.
              </p>
              <p>
                Sayangnya, TikTok tidak menyediakan fitur bawaan untuk menyimpan foto-foto dari slide secara individual. Ketika kamu menyimpan konten slide dari TikTok, platform hanya menyimpannya sebagai video — bukan sebagai foto terpisah. Ini artinya kamu tidak bisa mengambil satu foto tertentu dari slide tanpa menggunakan tool pihak ketiga seperti Mova.
              </p>
              <p>
                Itulah mengapa <strong>TikTok photo slide downloader</strong> seperti Mova menjadi sangat berguna. Dengan Mova, kamu bisa mengunduh setiap foto dari slide secara terpisah dalam kualitas asli, tanpa watermark, dan tanpa perlu screenshot satu per satu yang hasilnya pasti kurang bagus.
              </p>
            </>
          ),
        },
        {
          heading: "Keunggulan Download Slide Foto TikTok dengan Mova",
          content: (
            <>
              <p>
                Mova bukan sekadar tool download biasa. Berikut keunggulan Mova untuk download slide foto TikTok:
              </p>
              <ul>
                <li>
                  <strong>Deteksi otomatis</strong> — Mova otomatis mendeteksi apakah konten TikTok berupa video atau slide foto, lalu menampilkan format hasil yang sesuai.
                </li>
                <li>
                  <strong>Grid foto preview</strong> — Semua foto dari slide ditampilkan dalam grid yang rapi, lengkap dengan nomor urut, sehingga kamu bisa melihat seluruh konten sebelum download.
                </li>
                <li>
                  <strong>Download satu per satu atau sekaligus</strong> — Fleksibel! Kamu bisa download hanya foto yang kamu butuhkan, atau tekan satu tombol untuk mengunduh semuanya.
                </li>
                <li>
                  <strong>Kualitas foto asli</strong> — Foto di-download dalam resolusi aslinya tanpa kompresi. Tidak ada penurunan kualitas.
                </li>
                <li>
                  <strong>Gratis tanpa batas</strong> — Tidak ada batasan jumlah download, tidak perlu registrasi, dan 100% gratis.
                </li>
                <li>
                  <strong>Ekstrak audio MP3</strong> — Selain foto, kamu juga bisa menyimpan musik dari slide foto TikTok sebagai file MP3.
                </li>
              </ul>
            </>
          ),
        },
        {
          heading: "Perbedaan Download Slide Foto vs Download Video TikTok",
          content: (
            <>
              <p>
                Mungkin kamu bertanya, apa bedanya download slide foto dengan download video TikTok biasa? Berikut penjelasannya:
              </p>
              <p>
                <strong>Download video TikTok:</strong> Konten berupa video yang bisa langsung disimpan sebagai file MP4. Hasilnya adalah satu file video utuh yang bisa diputar di media player manapun.
              </p>
              <p>
                <strong>Download slide foto TikTok:</strong> Konten berupa kumpulan foto (carousel) yang ditampilkan bergantian. Mova akan mengekstrak setiap foto dari slide dan menampilkannya secara individual. Kamu bisa download foto-foto tersebut satu per satu atau sekaligus. Keuntungannya, setiap foto bisa digunakan secara terpisah untuk keperluan editing, presentasi, atau referensi.
              </p>
              <p>
                Mova secara otomatis mendeteksi tipe konten yang kamu masukkan. Jika link yang kamu paste berupa slide foto, Mova akan menampilkan grid foto. Jika berupa video, Mova akan menampilkan opsi kualitas video seperti biasa. Jadi kamu tidak perlu khawatir salah format — semuanya otomatis!
              </p>
            </>
          ),
        },
      ]}
      ctaTitle="Siap Download Slide Foto TikTok?"
      ctaSubtitle="Coba Mova sekarang dan simpan semua foto dari slide TikTok favoritmu dalam kualitas HD. Gratis dan tanpa batas!"
      otherPlatforms={[
        { name: "TikTok Video", href: "/tiktok-downloader", color: "#010101", gradient: "linear-gradient(135deg, #25F4EE, #FE2C55)" },
        { name: "Instagram", href: "/instagram-downloader", color: "#E4405F", gradient: "linear-gradient(135deg, #833AB4, #FD1D1D, #F77737)" },
        { name: "YouTube", href: "/youtube-downloader", color: "#FF0000" },
        { name: "Facebook", href: "/facebook-downloader", color: "#1877F2" },
        { name: "Twitter/X", href: "/twitter-downloader", color: "#14171A" },
        { name: "Pinterest", href: "/pinterest-downloader", color: "#E60023" },
        { name: "Reddit", href: "/reddit-downloader", color: "#FF4500" },
        { name: "YouTube MP3", href: "/youtube-mp3", color: "#FF0000", gradient: "linear-gradient(135deg, #FF0000, #FF6600)" },
      ]}
      blogLinks={[
        { href: "/blog/cara-download-video-tiktok-tanpa-watermark", title: "Cara Download Video TikTok Tanpa Watermark 2026" },
        { href: "/blog/download-video-tanpa-watermark-gratis", title: "Download Video Tanpa Watermark Gratis - Semua Platform" },
        { href: "/blog/tips-aman-download-video-online", title: "Tips Aman Download Video Online - Hindari Virus & Malware" },
      ]}
      relatedBlogPosts={[
        { title: "Cara Download Video TikTok Tanpa Watermark 2026", slug: "download-tiktok-tanpa-watermark" },
        { title: "Download Video Tanpa Watermark Gratis - Semua Platform", slug: "download-video-tanpa-watermark-gratis" },
      ]}
    />
  );
}

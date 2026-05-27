"use client";

import React from "react";
import { PlatformPageClient } from "@/components/platform-page-client";
import {
  Shield, Zap, Smartphone, Monitor, Eye, Globe,
} from "lucide-react";

function FacebookIcon() {
  return (
    <svg className="h-3 w-3 text-white" viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );
}

export function FacebookDownloaderPage() {
  return (
    <PlatformPageClient
      platformName="Facebook"
      platformColor="#1877F2"
      platformIcon={<FacebookIcon />}
      heroBadge="HD & Gratis"
      heroTitle="Download Video Facebook"
      heroTitleHighlight="HD Gratis"
      heroSubtitle="Simpan video Facebook dalam kualitas HD. Download video publik, Reels, dan Watch dengan mudah dan cepat!"
      inputPlaceholder="Tempel link video Facebook di sini..."
      breadcrumbLabel="Facebook Downloader"
      features={[
        {
          icon: <Monitor className="h-5 w-5" />,
          title: "Kualitas HD",
          description: "Download video Facebook dalam kualitas HD hingga 720p. Video tajam dan jernih, cocok untuk ditonton di layar besar.",
        },
        {
          icon: <Eye className="h-5 w-5" />,
          title: "Tanpa Watermark",
          description: "Video yang didownload melalui Mova tidak memiliki watermark. Tampilan video bersih dan profesional.",
        },
        {
          icon: <Zap className="h-5 w-5" />,
          title: "Proses Instan",
          description: "Tidak perlu menunggu lama. Video Facebook tersedia untuk download dalam hitungan detik setelah link dimasukkan.",
        },
        {
          icon: <Globe className="h-5 w-5" />,
          title: "Video Publik & Watch",
          description: "Support download video publik dari feed, Facebook Watch, dan Reels. Semua jenis video publik bisa didownload.",
        },
        {
          icon: <Shield className="h-5 w-5" />,
          title: "Aman & Privat",
          description: "Tidak perlu login akun Facebook. Kami tidak menyimpan data pribadi atau mengakses akun kamu.",
        },
        {
          icon: <Smartphone className="h-5 w-5" />,
          title: "Semua Perangkat",
          description: "Bisa diakses dari HP, tablet, dan laptop. Berjalan di browser tanpa perlu install aplikasi apapun.",
        },
      ]}
      steps={[
        {
          title: "Salin Link Video Facebook",
          description: "Buka Facebook, temukan video yang ingin didownload. Klik kanan pada video lalu pilih \"Copy link\" atau klik tombol Share dan pilih \"Salin Tautan\". Kamu juga bisa menyalin URL dari address bar browser.",
        },
        {
          title: "Tempel Link di Mova",
          description: "Buka Mova di browser, tempel link Facebook yang sudah disalin ke kolom input di atas. Klik tombol \"Tempel\" untuk paste otomatis dari clipboard.",
        },
        {
          title: "Download Video",
          description: "Klik tombol Download, pilih kualitas video (HD atau SD), dan file video akan langsung tersimpan di perangkat kamu. Semudah itu!",
        },
      ]}
      faqs={[
        {
          question: "Bagaimana cara download video Facebook dengan Mova?",
          answer: "Caranya sangat mudah! Buka Facebook dan temukan video yang ingin kamu download. Klik kanan pada video lalu pilih \"Copy link\" atau klik tombol Share dan pilih \"Salin Tautan\". Setelah itu, buka Mova di browser, tempel link tersebut di kolom input, dan klik Download. Video akan tersedia untuk disimpan dalam hitungan detik.",
        },
        {
          question: "Apakah Mova bisa download video Facebook HD?",
          answer: "Ya, Mova mendukung download video Facebook dalam kualitas HD jika video tersebut tersedia dalam resolusi HD. Opsi SD (360p) juga tersedia jika kamu ingin menghemat ruang penyimpanan. Kualitas yang ditampilkan tergantung pada resolusi asli video yang diupload ke Facebook.",
        },
        {
          question: "Apakah download video Facebook di Mova gratis?",
          answer: "Ya, 100% gratis tanpa batas! Tidak perlu registrasi, tidak ada biaya tersembunyi, dan tidak ada iklan pop-up yang mengganggu. Mova memberikan layanan download video Facebook secara cuma-cuma untuk semua pengguna tanpa batasan jumlah download.",
        },
        {
          question: "Bisakah Mova download video Facebook dari akun private?",
          answer: "Tidak, Mova hanya bisa mendownload video Facebook yang bersifat publik. Video dari akun private atau yang dibatasi privasinya tidak dapat diakses oleh pihak ketiga termasuk Mova. Ini adalah bentuk perlindungan privasi yang wajar bagi pengguna Facebook.",
        },
        {
          question: "Format video apa yang dihasilkan oleh Mova?",
          answer: "Mova mendownload video Facebook dalam format MP4 yang kompatibel dengan semua perangkat dan pemutar video. Format MP4 bisa diputar di HP Android, iPhone, laptop, tablet, dan smart TV tanpa perlu konverter tambahan.",
        },
        {
          question: "Bisakah saya download Facebook Reels dengan Mova?",
          answer: "Ya, Mova mendukung download Facebook Reels. Caranya sama dengan download video Facebook biasa — salin link Reels, tempel di Mova, dan klik Download. Video Reels akan tersimpan dalam format MP4 dengan kualitas terbaik.",
        },
        {
          question: "Kenapa video Facebook yang saya download gagal?",
          answer: "Beberapa kemungkinan penyebab: video berasal dari akun private, link yang dimasukkan tidak valid, video telah dihapus oleh pemiliknya, atau ada masalah koneksi internet. Pastikan video bisa dilihat secara publik dan link yang kamu masukkan benar. Jika masih gagal, coba refresh halaman dan ulangi prosesnya.",
        },
      ]}
      seoSections={[
        {
          heading: "Mengapa Perlu Facebook Video Downloader?",
          content: (
            <>
              <p>
                Facebook tetap menjadi salah satu platform media sosial terbesar di Indonesia dengan jutaan video yang diupload setiap harinya. Mulai dari video viral, konten edukasi, live streaming, hingga video kenangan — ada begitu banyak konten menarik di Facebook yang sayang kalau tidak disimpan.
              </p>
              <p>
                Sayangnya, Facebook tidak menyediakan tombol download bawaan untuk menyimpan video ke perangkat. Satu-satunya cara resmi untuk menyimpan video di Facebook adalah dengan menggunakan fitur \"Save\" yang hanya menyimpan bookmark di akun Facebook, bukan mendownload file videonya. Artinya, kamu tidak bisa menontonnya secara offline atau memindahkannya ke perangkat lain.
              </p>
              <p>
                Itulah mengapa <strong>Facebook video downloader</strong> seperti Mova menjadi sangat berguna. Dengan Mova, kamu bisa langsung mendownload file video Facebook ke perangkat kamu, menontonnya secara offline, dan memindahkannya ke perangkat lain dengan mudah.
              </p>
            </>
          ),
        },
        {
          heading: "Jenis Video Facebook yang Bisa Didownload",
          content: (
            <>
              <p>
                Mova mendukung download berbagai jenis video di Facebook. Berikut penjelasannya:
              </p>
              <ul>
                <li>
                  <strong>Video Feed</strong> — Video biasa yang muncul di beranda Facebook. Bisa berupa video yang diupload langsung atau video yang dibagikan dari sumber lain. Mova bisa mendownload video feed yang bersifat publik.
                </li>
                <li>
                  <strong>Facebook Watch</strong> — Facebook Watch adalah fitur video khusus di Facebook yang berisi konten video dari berbagai kreator dan publisher. Video di Watch biasanya berkualitas tinggi dan bisa didownload dengan Mova.
                </li>
                <li>
                  <strong>Facebook Reels</strong> — Reels adalah format video pendek di Facebook yang mirip dengan TikTok. Video Reels biasanya berdurasi 15-60 detik dan berisi konten kreatif. Mova mendukung download Facebook Reels dengan mudah.
                </li>
                <li>
                  <strong>Facebook Live (replay)</strong> — Rekaman siaran langsung (live) yang telah selesai juga bisa didownload melalui Mova, selama video tersebut bersifat publik.
                </li>
              </ul>
              <p>
                Untuk semua jenis video di atas, syarat utamanya adalah video harus bersifat publik. Video dari akun private atau yang dibatasi penontonnya tidak bisa didownload oleh Mova.
              </p>
            </>
          ),
        },
        {
          heading: "Cara Menyalin Link Video Facebook dengan Benar",
          content: (
            <>
              <p>
                Langkah pertama untuk download video Facebook adalah menyalin link video tersebut. Berikut cara yang benar untuk masing-masing versi Facebook:
              </p>
              <p>
                <strong>Facebook di Browser (Desktop):</strong> Buka video yang ingin didownload. Klik kanan pada video yang sedang diputar, lalu pilih \"Copy link\" atau \"Show video URL\". Salin URL yang muncul. Alternatifnya, kamu juga bisa menyalin URL langsung dari address bar browser saat video sedang terbuka.
              </p>
              <p>
                <strong>Facebook di Aplikasi Mobile:</strong> Buka video yang ingin didownload. Tap tombol Share (ikon panah atau tiga titik) di bawah video. Pilih \"Salin Tautan\" atau \"Copy Link\". Link video akan otomatis tersalin ke clipboard dan siap untuk ditempelkan di Mova.
              </p>
              <p>
                <strong>Facebook Watch:</strong> Untuk video di Facebook Watch, caranya sama. Buka video, klik atau tap tombol Share, lalu salin link-nya. Link video Watch biasanya berformat facebook.com/watch/?v=... dan bisa langsung dikenali oleh Mova.
              </p>
            </>
          ),
        },
        {
          heading: "Perbandingan Kualitas Video Facebook: HD vs SD",
          content: (
            <>
              <p>
                Mova menyediakan opsi kualitas video Facebook dalam dua tingkatan: HD dan SD. Berikut perbandingannya:
              </p>
              <p>
                <strong>HD (720p):</strong> Kualitas video tertinggi yang biasanya tersedia di Facebook. Cocok untuk video yang akan ditonton di layar besar atau digunakan untuk keperluan profesional. Ukuran file lebih besar, tapi kualitas gambar jauh lebih tajam dan jernih.
              </p>
              <p>
                <strong>SD (360p):</strong> Kualitas standar yang menghemat ruang penyimpanan. Cocok untuk video yang hanya akan ditonton di layar HP atau untuk keperluan referensi cepat. Ukuran file lebih kecil, proses download lebih cepat, tapi kualitas gambar tidak sejernih HD.
              </p>
              <p>
                Pilih kualitas sesuai kebutuhanmu. Jika tidak yakin, pilih HD untuk hasil terbaik. Kamu selalu bisa mendownload ulang dengan kualitas berbeda jika diperlukan. Mova menyimpan semua opsi kualitas yang tersedia untuk setiap video Facebook.
              </p>
            </>
          ),
        },
      ]}
      ctaTitle="Siap Download Video Facebook?"
      ctaSubtitle="Simpan video Facebook HD favorit kamu dengan Mova. Gratis, cepat, dan tanpa batas!"
      otherPlatforms={[
        { name: "TikTok", href: "/tiktok-downloader", color: "#010101", gradient: "linear-gradient(135deg, #25F4EE, #FE2C55)" },
        { name: "Instagram", href: "/instagram-downloader", color: "#E4405F", gradient: "linear-gradient(135deg, #833AB4, #FD1D1D, #F77737)" },
        { name: "YouTube", href: "/youtube-downloader", color: "#FF0000" },
        { name: "Twitter/X", href: "/twitter-downloader", color: "#14171A" },
        { name: "Pinterest", href: "/pinterest-downloader", color: "#E60023" },
        { name: "Reddit", href: "/reddit-downloader", color: "#FF4500" },
        { name: "Telegram", href: "/telegram-downloader", color: "#26A5E4" },
        { name: "YouTube MP3", href: "/youtube-mp3", color: "#FF0000", gradient: "linear-gradient(135deg, #FF0000, #FF6600)" },
      ]}
      blogLinks={[
        { href: "/blog/cara-download-video-facebook-hd", title: "Cara Download Video Facebook HD Gratis" },
        { href: "/blog/download-video-tanpa-watermark-gratis", title: "Download Video Tanpa Watermark Gratis - Semua Platform" },
        { href: "/blog/tips-aman-download-video-online", title: "Tips Aman Download Video Online - Hindari Virus & Malware" },
      ]}
    />
  );
}

"use client";

import React from "react";
import { PlatformPageClient } from "@/components/platform-page-client";
import {
  Shield, Zap, Smartphone, Monitor, Music, Settings2,
} from "lucide-react";

function YouTubeIcon() {
  return (
    <svg className="h-3 w-3 text-white" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  );
}

export function YouTubeDownloaderPage() {
  return (
    <PlatformPageClient
      platformName="YouTube"
      platformColor="#FF0000"
      platformIcon={<YouTubeIcon />}
      heroBadge="MP4 & MP3 Gratis"
      heroTitle="Download Video YouTube"
      heroTitleHighlight="MP4 HD & MP3"
      heroSubtitle="Download video YouTube dalam format MP4 HD atau konversi ke MP3. Gratis, cepat, dan banyak pilihan kualitas!"
      inputPlaceholder="Tempel link video YouTube di sini..."
      breadcrumbLabel="YouTube Downloader"
      features={[
        {
          icon: <Monitor className="h-5 w-5" />,
          title: "MP4 HD",
          description: "Download video YouTube dalam format MP4 dengan resolusi hingga 1080p HD. Kualitas tajam dan jernih.",
        },
        {
          icon: <Music className="h-5 w-5" />,
          title: "Ekstrak MP3",
          description: "Konversi video YouTube ke MP3 secara instan. Cocok untuk menyimpan musik, podcast, dan konten audio.",
        },
        {
          icon: <Settings2 className="h-5 w-5" />,
          title: "Banyak Pilihan Kualitas",
          description: "Pilih dari berbagai opsi kualitas — 360p, 480p, 720p, 1080p, atau audio only. Sesuaikan dengan kebutuhanmu.",
        },
        {
          icon: <Zap className="h-5 w-5" />,
          title: "Proses Cepat",
          description: "Server Mova dioptimalkan untuk memproses video YouTube dengan cepat. Tidak perlu menunggu lama.",
        },
        {
          icon: <Shield className="h-5 w-5" />,
          title: "Aman & Tanpa Login",
          description: "Tidak perlu login akun Google atau YouTube. Privasi kamu terjaga sepenuhnya.",
        },
        {
          icon: <Smartphone className="h-5 w-5" />,
          title: "Semua Perangkat",
          description: "Bisa diakses dari HP Android, iPhone, tablet, dan laptop. Berjalan di browser tanpa install aplikasi.",
        },
      ]}
      steps={[
        {
          title: "Salin Link Video YouTube",
          description: "Buka YouTube, temukan video yang ingin kamu download. Klik tombol Share di bawah video lalu pilih \"Copy link\" atau salin URL dari address bar browser.",
        },
        {
          title: "Tempel Link di Mova",
          description: "Buka Mova di browser, tempel link YouTube yang sudah disalin ke kolom input di atas. Gunakan tombol \"Tempel\" untuk paste otomatis dari clipboard.",
        },
        {
          title: "Pilih Format & Kualitas",
          description: "Klik tombol Download, lalu pilih format (MP4 untuk video, MP3 untuk audio) dan kualitas yang kamu inginkan. Klik download dan file akan tersimpan di perangkat!",
        },
      ]}
      faqs={[
        {
          question: "Apakah Mova bisa download video YouTube dalam format MP4?",
          answer: "Ya, Mova mendukung download video YouTube dalam format MP4 dengan berbagai pilihan kualitas, mulai dari 360p hingga 1080p HD. Kamu bisa memilih resolusi yang sesuai dengan kebutuhan dan kapasitas perangkat. Kualitas yang tersedia tergantung pada video aslinya — jika video diupload dalam 1080p, maka opsi 1080p akan tersedia.",
        },
        {
          question: "Bisakah Mova mengkonversi YouTube ke MP3?",
          answer: "Tentu saja! Mova bisa mengekstrak audio dari video YouTube dan menyimpannya dalam format MP3. Fitur ini sangat berguna untuk menyimpan musik, podcast, atau konten audio lainnya dari YouTube. Cukup masukkan link YouTube, klik Download, dan pilih opsi Audio/MP3 yang tersedia.",
        },
        {
          question: "Berapa kualitas video YouTube terbaik yang bisa didownload?",
          answer: "Kualitas tergantung pada video aslinya. Jika video tersedia dalam 1080p, Mova bisa mendownloadnya dalam 1080p. Mova menyediakan semua opsi kualitas yang tersedia untuk setiap video, termasuk 360p, 480p, 720p, dan 1080p. Untuk audio MP3, kualitas bitrate tertinggi yang tersedia akan dipilih secara otomatis.",
        },
        {
          question: "Apakah Mova bisa download video YouTube yang berdurasi panjang?",
          answer: "Ya, Mova mendukung download video YouTube berdurasi panjang. Namun, video yang sangat panjang (lebih dari 1 jam) mungkin membutuhkan waktu lebih lama untuk diproses. Pastikan koneksi internet kamu stabil saat mendownload video berdurasi panjang agar proses tidak terputus di tengah jalan.",
        },
        {
          question: "Apakah download video YouTube di Mova gratis?",
          answer: "Ya, 100% gratis tanpa batas! Tidak perlu registrasi, tidak perlu berlangganan, dan tidak ada biaya tersembunyi. Mova memberikan layanan YouTube downloader secara cuma-cuma untuk semua pengguna. Download sepuas kamu tanpa khawatir batasan.",
        },
        {
          question: "Bisakah saya download YouTube Shorts dengan Mova?",
          answer: "Ya, Mova juga mendukung download YouTube Shorts. Caranya sama — salin link YouTube Shorts, tempel di kolom input Mova, dan klik Download. Video Shorts akan tersedia dalam format MP4 dengan kualitas terbaik.",
        },
        {
          question: "Kenapa video YouTube tertentu gagal didownload?",
          answer: "YouTube memiliki sistem perlindungan yang ketat terhadap beberapa konten, terutama video yang dilindungi hak cipta musik atau video yang dibatasi usia. Mova berusaha sebaik mungkin untuk mendownload video yang diminta, tetapi ada kalanya YouTube memblokir akses dari server pihak ketiga. Jika satu video gagal, coba video lain yang tidak memiliki pembatasan.",
        },
      ]}
      seoSections={[
        {
          heading: "Mengapa Membutuhkan YouTube Downloader?",
          content: (
            <>
              <p>
                YouTube adalah platform video terbesar di dunia dengan miliaran video yang tersedia. Mulai dari video musik, tutorial, vlog, podcast, hingga konten edukasi — semuanya bisa ditemukan di YouTube. Namun, YouTube tidak menyediakan opsi download bawaan untuk menyimpan video ke perangkat, terutama untuk pengguna gratis.
              </p>
              <p>
                Banyak alasan mengapa seseorang membutuhkan <strong>YouTube downloader</strong>. Mungkin kamu ingin menonton video saat tidak ada koneksi internet, menyimpan tutorial penting untuk referensi, mengarsipkan konten favorit, atau mengekstrak audio dari video musik. Apapun alasan kamu, Mova hadir sebagai solusi YouTube downloader yang gratis dan mudah digunakan.
              </p>
              <p>
                Dengan Mova, kamu bisa download video YouTube dalam format MP4 dengan berbagai pilihan kualitas, atau mengekstrak audio-nya ke format MP3. Semua proses dilakukan secara online tanpa perlu menginstall software apapun di perangkat kamu.
              </p>
            </>
          ),
        },
        {
          heading: "Format Download YouTube yang Tersedia di Mova",
          content: (
            <>
              <p>
                Mova menyediakan berbagai opsi format dan kualitas untuk download video YouTube. Berikut penjelasannya:
              </p>
              <p>
                <strong>Format MP4 (Video):</strong> Format MP4 adalah pilihan utama untuk download video YouTube. Mova menyediakan beberapa opsi resolusi — mulai dari 360p untuk ukuran file kecil, 480p untuk kualitas standar, 720p untuk kualitas HD, hingga 1080p untuk kualitas Full HD. Pilihan kualitas tergantung pada video aslinya; tidak semua video tersedia dalam 1080p.
              </p>
              <p>
                <strong>Format MP3 (Audio):</strong> Jika kamu hanya membutuhkan audio dari video YouTube, Mova bisa mengekstraknya ke format MP3. Ini sangat berguna untuk menyimpan musik, podcast, atau konten audio lainnya. Kualitas audio yang didapatkan adalah yang terbaik dari sumber aslinya, biasanya dengan bitrate 128kbps atau lebih tinggi.
              </p>
              <p>
                Cara memilih format sangat mudah: setelah memasukkan link YouTube dan mengklik Download, Mova akan menampilkan semua opsi kualitas yang tersedia. Kamu tinggal memilih format dan kualitas yang diinginkan, lalu mengklik download.
              </p>
            </>
          ),
        },
        {
          heading: "Cara Download YouTube ke MP3 untuk Musik dan Podcast",
          content: (
            <>
              <p>
                Salah satu fitur yang paling banyak dicari dari YouTube downloader adalah kemampuan untuk mengkonversi video YouTube ke MP3. Ini sangat berguna untuk berbagai keperluan:
              </p>
              <ul>
                <li>
                  <strong>Menyimpan musik</strong> — Banyak lagu yang hanya tersedia di YouTube. Dengan Mova, kamu bisa mengekstrak audio-nya dan menyimpannya sebagai file MP3 di perangkat kamu.
                </li>
                <li>
                  <strong>Podcast dan audiobook</strong> — Konten audio panjang seperti podcast dan audiobook di YouTube bisa dikonversi ke MP3 agar lebih mudah didengarkan di perangkat apapun.
                </li>
                <li>
                  <strong>Materi belajar</strong> — Rekaman kuliah, tutorial audio, atau materi belajar lainnya di YouTube bisa disimpan dalam format MP3 untuk didengarkan kapan saja.
                </li>
                <li>
                  <strong>Sound effect dan BGM</strong> — Bagi para content creator, YouTube adalah sumber sound effect dan background music yang melimpah. Dengan Mova, kamu bisa mengekstrak audio yang kamu butuhkan.
                </li>
              </ul>
              <p>
                Proses konversi YouTube ke MP3 di Mova sangat mudah. Cukup masukkan link video, klik Download, dan pilih opsi Audio/MP3. File audio akan tersedia dalam hitungan detik.
              </p>
            </>
          ),
        },
        {
          heading: "Tips Download YouTube agar Hasil Optimal",
          content: (
            <>
              <p>
                Untuk mendapatkan hasil download YouTube yang terbaik, perhatikan beberapa tips berikut:
              </p>
              <ul>
                <li>
                  <strong>Pilih kualitas tertinggi yang tersedia</strong> — Jika perangkat kamu memiliki ruang penyimpanan yang cukup, selalu pilih resolusi 720p atau 1080p untuk kualitas video terbaik.
                </li>
                <li>
                  <strong>Pastikan koneksi internet stabil</strong> — Download video YouTube membutuhkan koneksi yang stabil, terutama untuk video berdurasi panjang atau resolusi tinggi.
                </li>
                <li>
                  <strong>Gunakan WiFi untuk video besar</strong> — Download video HD bisa menghabiskan banyak data. Gunakan WiFi jika memungkinkan untuk menghemat kuota internet.
                </li>
                <li>
                  <strong>Cek file setelah download</strong> — Setelah download selesai, putar video untuk memastikan kualitasnya sesuai. Kadang koneksi yang terputus bisa membuat file tidak lengkap.
                </li>
                <li>
                  <strong>Simpan link video untuk referensi</strong> — Jika kamu ingin mendownload lagi dengan kualitas berbeda, simpan link YouTube-nya agar mudah ditemukan kembali.
                </li>
              </ul>
              <p>
                Dengan tips di atas, kamu bisa memaksimalkan pengalaman download video YouTube menggunakan Mova. Selamat mencoba!
              </p>
            </>
          ),
        },
      ]}
      ctaTitle="Siap Download Video YouTube?"
      ctaSubtitle="Download video YouTube MP4 HD atau konversi ke MP3 dengan Mova. Gratis, cepat, dan tanpa batas!"
      otherPlatforms={[
        { name: "TikTok", href: "/tiktok-downloader", color: "#010101", gradient: "linear-gradient(135deg, #25F4EE, #FE2C55)" },
        { name: "Instagram", href: "/instagram-downloader", color: "#E4405F", gradient: "linear-gradient(135deg, #833AB4, #FD1D1D, #F77737)" },
        { name: "Facebook", href: "/facebook-downloader", color: "#1877F2" },
        { name: "Twitter/X", href: "/twitter-downloader", color: "#14171A" },
        { name: "Pinterest", href: "/pinterest-downloader", color: "#E60023" },
        { name: "Reddit", href: "/reddit-downloader", color: "#FF4500" },
        { name: "Telegram", href: "/telegram-downloader", color: "#26A5E4" },
        { name: "YouTube MP3", href: "/youtube-mp3", color: "#FF0000", gradient: "linear-gradient(135deg, #FF0000, #FF6600)" },
      ]}
      blogLinks={[
        { href: "/blog/cara-download-video-youtube-mp4", title: "Cara Download Video YouTube MP4 HD Gratis" },
        { href: "/blog/ekstrak-audio-mp3-dari-video", title: "Cara Ekstrak Audio MP3 dari Video YouTube" },
        { href: "/blog/download-video-tanpa-watermark-gratis", title: "Download Video Tanpa Watermark Gratis - Semua Platform" },
      ]}
      relatedBlogPosts={[
        { title: "Cara Download YouTube ke MP3 Gratis dan Cepat", slug: "download-youtube-mp3" },
        { title: "Download Video Tanpa Watermark Gratis - Semua Platform", slug: "download-video-tanpa-watermark-gratis" },
        { title: "Tips Aman Download Video Online", slug: "tips-aman-download-video-online" },
      ]}
    />
  );
}

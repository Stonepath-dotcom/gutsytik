"use client";

import React from "react";
import { PlatformPageClient } from "@/components/platform-page-client";
import {
  Shield, Zap, Smartphone, Monitor, Music, Eye,
} from "lucide-react";

function LikeeIcon() {
  return (
    <svg className="h-3 w-3 text-white" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-2h2v2zm0-4h-2V7h2v6zm4 4h-2v-6h2v6zm0-8h-2V7h2v2z"/>
    </svg>
  );
}

export function LikeeDownloaderClient() {
  return (
    <PlatformPageClient
      platformName="Likee"
      platformColor="#00E5FF"
      platformGradient="linear-gradient(135deg, #00E5FF, #00B4D8)"
      platformIcon={<LikeeIcon />}
      heroBadge="Gratis & Tanpa Batas"
      heroTitle="Download Video Likee"
      heroTitleHighlight="Tanpa Watermark"
      heroSubtitle="Simpan video Likee dalam kualitas HD tanpa logo. Gratis, cepat, dan mudah."
      inputPlaceholder="Tempel link video Likee di sini..."
      breadcrumbLabel="Likee Downloader"
      features={[
        {
          icon: <Eye className="h-5 w-5" />,
          title: "Tanpa Watermark",
          description: "Download video Likee bebas watermark. Video bersih tanpa logo yang mengganggu.",
        },
        {
          icon: <Monitor className="h-5 w-5" />,
          title: "Kualitas HD",
          description: "Download video Likee dalam resolusi HD. Kualitas asli terjaga tanpa kompresi.",
        },
        {
          icon: <Zap className="h-5 w-5" />,
          title: "Super Cepat",
          description: "Proses download hanya butuh beberapa detik. Server cepat memastikan video langsung tersedia.",
        },
        {
          icon: <Music className="h-5 w-5" />,
          title: "Ekstrak Audio MP3",
          description: "Tidak hanya video, Mova juga bisa mengekstrak audio dari video Likee jadi file MP3.",
        },
        {
          icon: <Shield className="h-5 w-5" />,
          title: "Aman & Privat",
          description: "Tidak perlu login akun Likee. Data pribadi kamu aman dan tidak disimpan di server kami.",
        },
        {
          icon: <Smartphone className="h-5 w-5" />,
          title: "Semua Perangkat",
          description: "Bisa diakses dari HP, tablet, dan laptop. Tidak perlu install aplikasi tambahan.",
        },
      ]}
      steps={[
        {
          title: "Salin Link Video Likee",
          description: "Buka aplikasi Likee, temukan video yang ingin kamu download. Tap tombol Share lalu pilih \"Copy Link\" untuk menyalin URL video.",
        },
        {
          title: "Tempel Link di Mova",
          description: "Buka Mova di browser, tempel link Likee yang sudah disalin ke kolom input di atas. Kamu juga bisa klik tombol \"Tempel\" untuk otomatis paste dari clipboard.",
        },
        {
          title: "Pilih Kualitas & Download",
          description: "Klik tombol Download, pilih kualitas video yang kamu inginkan, lalu klik download. Video akan tersimpan di perangkat kamu tanpa watermark!",
        },
      ]}
      faqs={[
        {
          question: "Apakah Mova bisa download video Likee tanpa watermark?",
          answer: "Ya, Mova mendownload video Likee tanpa watermark. Video yang kamu dapatkan bersih tanpa logo Likee yang biasanya muncul di sudut video.",
        },
        {
          question: "Apakah download video Likee di Mova gratis?",
          answer: "Ya, 100% gratis tanpa batas. Tidak perlu registrasi dan tidak ada biaya tersembunyi. Mova membiarkan semua pengguna menikmati layanan ini secara gratis.",
        },
        {
          question: "Format video apa yang dihasilkan?",
          answer: "Video disimpan dalam format MP4 yang kompatibel dengan semua perangkat. Kamu bisa langsung memutar video di HP, tablet, atau laptop tanpa konversi tambahan.",
        },
        {
          question: "Apakah Mova bisa download video Likee yang private?",
          answer: "Tidak, Mova hanya bisa mendownload video Likee yang bersifat publik. Video dari akun private tidak bisa diakses oleh pihak ketiga termasuk Mova. Ini untuk melindungi privasi pengguna Likee.",
        },
        {
          question: "Kualitas video apa yang didukung?",
          answer: "Mova mendownload video Likee dalam kualitas terbaik yang tersedia. Jika video tersedia dalam resolusi HD, Mova akan memberikan opsi download HD tersebut tanpa kompresi.",
        },
      ]}
      seoSections={[
        {
          heading: "Mengapa Perlu Download Video Likee Tanpa Watermark?",
          content: (
            <>
              <p>
                Likee menjadi salah satu platform video pendek yang populer di Indonesia dengan beragam konten kreatif mulai dari komedi, tutorial, dance, hingga konten edukasi. Banyak video menarik yang sayang kalau tidak disimpan. Namun, ketika kamu mendownload video langsung dari aplikasi Likee, video tersebut akan selalu memiliki watermark berupa logo Likee.
              </p>
              <p>
                Watermark ini bisa menjadi masalah dalam beberapa situasi. Bagi para content creator yang ingin menggunakan video sebagai referensi atau bahan editing, watermark tentu mengganggu tampilan akhir. Untuk keperluan presentasi, video dengan watermark terlihat kurang profesional. Dan bagi yang sekadar ingin menyimpan koleksi video favorit, tentu lebih enak melihat video bersih tanpa logo.
              </p>
              <p>
                Itulah mengapa <strong>Likee downloader tanpa watermark</strong> seperti Mova menjadi sangat dibutuhkan. Dengan Mova, kamu bisa mendapatkan video Likee dalam kondisi bersih dan berkualitas tinggi.
              </p>
            </>
          ),
        },
        {
          heading: "Keunggulan Mova sebagai Likee Downloader",
          content: (
            <>
              <p>
                Mova bukan sekadar tool download video Likee biasa. Ada beberapa keunggulan yang membuat Mova menjadi pilihan terbaik:
              </p>
              <ul>
                <li>
                  <strong>Tanpa registrasi dan login</strong> — Langsung pakai tanpa perlu membuat akun atau login. Cukup tempel link dan download.
                </li>
                <li>
                  <strong>Kualitas video terjaga</strong> — Mova mendownload video dalam resolusi aslinya tanpa kompresi yang menurunkan kualitas.
                </li>
                <li>
                  <strong>Proses super cepat</strong> — Dengan server yang dioptimalkan, proses download video Likee hanya membutuhkan beberapa detik saja.
                </li>
                <li>
                  <strong>Multi-platform</strong> — Selain Likee, Mova juga mendukung download dari TikTok, Instagram, Facebook, Twitter/X, dan platform lainnya.
                </li>
                <li>
                  <strong>Tanpa iklan mengganggu</strong> — Tidak ada pop-up, redirect, atau iklan yang mengganggu pengalaman download kamu.
                </li>
                <li>
                  <strong>Bisa ekstrak audio MP3</strong> — Ingin menyimpan lagu atau sound dari video Likee? Mova bisa mengekstrak audio-nya jadi file MP3.
                </li>
              </ul>
            </>
          ),
        },
        {
          heading: "Tips Menggunakan Video Likee yang Didownload secara Bertanggung Jawab",
          content: (
            <>
              <p>
                Meskipun Mova memudahkan kamu untuk download video Likee tanpa watermark, penting untuk menggunakan video tersebut secara bertanggung jawab:
              </p>
              <ul>
                <li>
                  <strong>Hormati hak cipta</strong> — Video yang kamu download adalah karya dari kreator Likee. Jika ingin repost, selalu minta izin dan berikan kredit kepada pembuat aslinya.
                </li>
                <li>
                  <strong>Jangan gunakan untuk keuntungan komersial tanpa izin</strong> — Menggunakan video orang lain untuk tujuan komersial tanpa izin bisa melanggar hak cipta.
                </li>
                <li>
                  <strong>Gunakan untuk penggunaan pribadi</strong> — Menyimpan video untuk koleksi pribadi, referensi, atau ditonton offline adalah penggunaan yang paling aman.
                </li>
                <li>
                  <strong>Perhatikan konten sensitif</strong> — Jangan menyebarkan ulang konten yang bersifat sensitif atau bisa merugikan orang lain.
                </li>
              </ul>
            </>
          ),
        },
      ]}
      ctaTitle="Siap Download Video Likee Tanpa Watermark?"
      ctaSubtitle="Coba Mova sekarang dan rasakan kemudahan download video Likee bersih tanpa logo. Gratis dan tanpa batas!"
      otherPlatforms={[
        { name: "TikTok", href: "/tiktok-downloader", color: "#010101" },
        { name: "Instagram", href: "/instagram-downloader", color: "#E4405F", gradient: "linear-gradient(135deg, #833AB4, #FD1D1D, #F77737)" },
        { name: "Facebook", href: "/facebook-downloader", color: "#1877F2" },
        { name: "Twitter/X", href: "/twitter-downloader", color: "#14171A" },
        { name: "Pinterest", href: "/pinterest-downloader", color: "#E60023" },
        { name: "Reddit", href: "/reddit-downloader", color: "#FF4500" },
        { name: "Telegram", href: "/telegram-downloader", color: "#26A5E4" },
        { name: "Snack Video", href: "/snack-video-downloader", color: "#FFE040", gradient: "linear-gradient(135deg, #FFE040, #FFB800)" },
      ]}
      blogLinks={[
        { href: "/blog/download-video-tanpa-watermark-gratis", title: "Download Video Tanpa Watermark Gratis - Semua Platform" },
        { href: "/blog/tips-aman-download-video-online", title: "Tips Aman Download Video Online - Hindari Virus & Malware" },
        { href: "/blog/download-video-tanpa-aplikasi", title: "Download Video Tanpa Aplikasi - Langsung di Browser" },
      ]}
      relatedBlogPosts={[
        { title: "Download Video Tanpa Watermark Gratis - Semua Platform", slug: "download-video-tanpa-watermark-gratis" },
        { title: "Tips Aman Download Video Online", slug: "tips-aman-download-video-online" },
        { title: "Download Video Tanpa Aplikasi", slug: "download-video-tanpa-aplikasi" },
      ]}
    />
  );
}

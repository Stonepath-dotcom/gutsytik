"use client";

import React from "react";
import { PlatformPageClient } from "@/components/platform-page-client";
import {
  Shield, Zap, Smartphone, Monitor, Film, Layers,
} from "lucide-react";

function InstagramIcon() {
  return (
    <svg className="h-3 w-3 text-white" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
    </svg>
  );
}

export function InstagramDownloaderPage() {
  return (
    <PlatformPageClient
      platformName="Instagram"
      platformColor="#E4405F"
      platformGradient="linear-gradient(135deg, #833AB4, #FD1D1D, #F77737)"
      platformIcon={<InstagramIcon />}
      heroBadge="Reels, Story & IGTV"
      heroTitle="Download Video Instagram"
      heroTitleHighlight="Reels & Story"
      heroSubtitle="Simpan video Instagram Reels, Story, dan IGTV dalam kualitas tinggi. Gratis, cepat, dan tanpa registrasi!"
      inputPlaceholder="Tempel link Instagram Reels/Story/IGTV di sini..."
      breadcrumbLabel="Instagram Downloader"
      features={[
        {
          icon: <Film className="h-5 w-5" />,
          title: "Reels Downloader",
          description: "Download video Instagram Reels dengan kualitas terbaik. Simpan konten Reels favoritmu ke perangkat.",
        },
        {
          icon: <Layers className="h-5 w-5" />,
          title: "Story & IGTV",
          description: "Bukan hanya Reels — Mova juga mendukung download Instagram Story dan video IGTV publik.",
        },
        {
          icon: <Monitor className="h-5 w-5" />,
          title: "Kualitas Tinggi",
          description: "Download video Instagram dalam resolusi terbaik yang tersedia. Hasil tajam dan jernih tanpa kompresi.",
        },
        {
          icon: <Zap className="h-5 w-5" />,
          title: "Proses Cepat",
          description: "Video Instagram tersedia dalam hitungan detik. Tidak perlu menunggu lama untuk mendownload.",
        },
        {
          icon: <Shield className="h-5 w-5" />,
          title: "Aman & Tanpa Login",
          description: "Tidak perlu login akun Instagram. Privasi kamu terjaga dan data tidak disimpan.",
        },
        {
          icon: <Smartphone className="h-5 w-5" />,
          title: "Semua Perangkat",
          description: "Bisa diakses dari HP, tablet, dan laptop. Tidak perlu install aplikasi apapun.",
        },
      ]}
      steps={[
        {
          title: "Salin Link Video Instagram",
          description: "Buka Instagram, temukan video Reels, Story, atau IGTV yang ingin kamu download. Tap tombol Share (ikon tiga titik atau panah) lalu pilih \"Salin Tautan\" atau \"Copy Link\".",
        },
        {
          title: "Tempel Link di Mova",
          description: "Buka Mova di browser, tempel link Instagram yang sudah disalin ke kolom input di atas. Gunakan tombol \"Tempel\" untuk paste otomatis.",
        },
        {
          title: "Download Video",
          description: "Klik tombol Download, pilih kualitas yang diinginkan, dan video akan langsung tersimpan di perangkat kamu. Mudah dan cepat!",
        },
      ]}
      faqs={[
        {
          question: "Apakah Mova bisa download Instagram Story?",
          answer: "Ya, Mova bisa mendownload Instagram Story selama story tersebut bersifat publik. Kamu hanya perlu menyalin link story tersebut dan memasukkannya ke kolom input di Mova. Perlu diingat bahwa Story Instagram biasanya hanya tersedia selama 24 jam, jadi pastikan untuk segera mendownloadnya sebelum hilang.",
        },
        {
          question: "Bagaimana cara download Instagram Reels dengan Mova?",
          answer: "Sangat mudah! Buka Instagram, temukan Reels yang ingin kamu download. Tap tombol Share di bagian bawah, lalu pilih \"Copy Link\". Setelah itu, buka Mova di browser, tempel link tersebut di kolom input, dan klik Download. Video Reels akan tersimpan di perangkat kamu dalam hitungan detik.",
        },
        {
          question: "Apakah Mova bisa download video dari akun Instagram private?",
          answer: "Tidak, Mova hanya bisa mendownload video dari akun Instagram yang bersifat publik. Konten dari akun private dilindungi oleh Instagram dan tidak bisa diakses oleh pihak ketiga manapun termasuk Mova. Ini adalah bentuk perlindungan privasi yang wajar.",
        },
        {
          question: "Apakah download video Instagram di Mova gratis?",
          answer: "Ya, 100% gratis tanpa batas! Tidak perlu registrasi, tidak perlu berlangganan, dan tidak ada biaya tersembunyi. Mova memberikan layanan download video Instagram secara cuma-cuma untuk semua pengguna.",
        },
        {
          question: "Format video apa yang didukung untuk download Instagram?",
          answer: "Mova mendukung download video Instagram dalam format MP4 dengan kualitas terbaik yang tersedia. Untuk konten yang hanya berisi audio, Mova juga menyediakan opsi download dalam format MP3. Kualitas video yang didapatkan tergantung dari kualitas asli video yang diupload ke Instagram.",
        },
        {
          question: "Kenapa video Instagram yang saya download gagal?",
          answer: "Beberapa kemungkinan penyebabnya: link yang dimasukkan tidak valid atau sudah kadaluarsa, video berasal dari akun private, video telah dihapus oleh pemiliknya, atau ada masalah koneksi internet. Pastikan video bisa diakses secara publik dan link yang kamu masukkan benar. Jika masih gagal, coba refresh halaman dan ulangi prosesnya.",
        },
        {
          question: "Bisakah saya download foto atau carousel Instagram?",
          answer: "Saat ini Mova berfokus pada download video Instagram (Reels, Story, dan IGTV). Untuk foto atau carousel Instagram, fitur tersebut mungkin tersedia di pembaruan mendatang. Namun, jika carousel Instagram berisi video, Mova bisa mendownload video tersebut.",
        },
      ]}
      seoSections={[
        {
          heading: "Mengapa Butuh Instagram Downloader?",
          content: (
            <>
              <p>
                Instagram telah berkembang dari sekadar platform berbagi foto menjadi salah satu destinasi utama untuk konten video. Dengan fitur seperti Reels, Story, dan IGTV, Instagram menawarkan beragam format video yang menarik. Sayangnya, Instagram tidak menyediakan opsi download bawaan untuk menyimpan video ke perangkat kamu.
              </p>
              <p>
                Banyak pengguna Instagram yang ingin menyimpan video Reels favorit untuk ditonton offline, mengoleksi konten inspiratif dari Story teman, atau mengarsipkan video IGTV yang bermanfaat. Tanpa tool khusus, hal ini sulit dilakukan. Inilah mengapa <strong>Instagram downloader</strong> seperti Mova menjadi solusi yang sangat dibutuhkan.
              </p>
              <p>
                Mova memungkinkan kamu untuk download video Instagram dalam berbagai format — mulai dari Reels yang pendek dan catchy, Story yang sementara, hingga video IGTV yang lebih panjang. Semuanya bisa dilakukan dengan mudah, cepat, dan gratis.
              </p>
            </>
          ),
        },
        {
          heading: "Jenis Konten Instagram yang Bisa Didownload",
          content: (
            <>
              <p>
                Mova mendukung download berbagai jenis konten video di Instagram. Berikut penjelasan masing-masing:
              </p>
              <ul>
                <li>
                  <strong>Instagram Reels</strong> — Format video pendek yang paling populer di Instagram saat ini. Reels biasanya berdurasi 15-90 detik dan berisi konten kreatif mulai dari komedi, dance, tutorial, hingga review produk. Dengan Mova, kamu bisa menyimpan Reels favorit ke perangkat dalam kualitas tinggi.
                </li>
                <li>
                  <strong>Instagram Story</strong> — Story adalah video atau foto yang bersifat sementara dan biasanya hilang setelah 24 jam. Dengan Mova, kamu bisa mendownload Story sebelum ia menghilang, sehingga konten berharga tidak terlewatkan. Pastikan Story tersebut bersifat publik.
                </li>
                <li>
                  <strong>IGTV (Instagram TV)</strong> — IGTV adalah fitur video panjang di Instagram yang bisa berdurasi hingga 60 menit. Cocok untuk vlog, tutorial mendalam, atau konten dokumenter. Mova bisa mendownload video IGTV publik dengan mudah.
                </li>
                <li>
                  <strong>Video Post</strong> — Video reguler yang diposting di feed Instagram juga bisa didownload melalui Mova. Cukup salin link video dan masukkan ke kolom input.
                </li>
              </ul>
            </>
          ),
        },
        {
          heading: "Cara Copy Link Instagram yang Benar",
          content: (
            <>
              <p>
                Salah satu langkah terpenting dalam download video Instagram adalah menyalin link yang benar. Berikut cara copy link untuk masing-masing jenis konten:
              </p>
              <p>
                <strong>Untuk Instagram Reels:</strong> Buka Reels yang ingin kamu download. Tap ikon Share (panah atau tiga titik) di bagian bawah. Pilih \"Copy Link\" atau \"Salin Tautan\". Link akan otomatis tersalin ke clipboard.
              </p>
              <p>
                <strong>Untuk Instagram Story:</strong> Buka Story yang ingin didownload. Tap ikon More (tiga titik) di sudut kanan atas. Pilih \"Copy Link\" atau \"Salin Tautan\". Perlu diingat, link Story hanya tersedia jika akun bersifat publik.
              </p>
              <p>
                <strong>Untuk video di Feed:</strong> Buka video yang ingin didownload. Tap ikon More (tiga titik) di sudut kanan atas post. Pilih \"Copy Link\". Link video akan tersalin dan siap untuk dimasukkan ke Mova.
              </p>
              <p>
                Setelah link tersalin, cukup tempel di kolom input Mova dan klik Download. Prosesnya sangat sederhana dan tidak memerlukan keahlian teknis.
              </p>
            </>
          ),
        },
        {
          heading: "Tips Aman Download Video Instagram",
          content: (
            <>
              <p>
                Saat mendownload video Instagram, ada beberapa hal yang perlu kamu perhatikan agar tetap aman dan bertanggung jawab:
              </p>
              <ul>
                <li>
                  <strong>Gunakan tool yang terpercaya</strong> — Mova adalah Instagram downloader yang aman dan tidak meminta data login. Hindari situs yang meminta username dan password Instagram kamu.
                </li>
                <li>
                  <strong>Hormati hak cipta</strong> — Video Instagram adalah karya dari kreator konten. Jika ingin repost, selalu minta izin dan berikan kredit kepada pemilik aslinya.
                </li>
                <li>
                  <strong>Download hanya konten publik</strong> — Konten dari akun private tidak boleh didownload tanpa izin. Ini adalah bentuk penghormatan terhadap privasi pengguna lain.
                </li>
                <li>
                  <strong>Waspadai malware</strong> — Jangan menggunakan situs download yang mencurigakan atau meminta kamu menginstall aplikasi. Mova berjalan sepenuhnya di browser tanpa perlu install apapun.
                </li>
                <li>
                  <strong>Jangan gunakan untuk keuntungan komersial tanpa izin</strong> — Menggunakan konten orang lain untuk keperluan komersial tanpa izin bisa melanggar hak cipta.
                </li>
              </ul>
              <p>
                Dengan mengikuti tips di atas, kamu bisa menikmati layanan download video Instagram dengan aman dan tetap bertanggung jawab terhadap konten yang didownload.
              </p>
            </>
          ),
        },
      ]}
      ctaTitle="Siap Download Video Instagram?"
      ctaSubtitle="Simpan Reels, Story, dan IGTV favorit kamu dengan Mova. Gratis, cepat, dan tanpa batas!"
      otherPlatforms={[
        { name: "TikTok", href: "/tiktok-downloader", color: "#010101", gradient: "linear-gradient(135deg, #25F4EE, #FE2C55)" },
        { name: "YouTube", href: "/youtube-downloader", color: "#FF0000" },
        { name: "Facebook", href: "/facebook-downloader", color: "#1877F2" },
        { name: "Twitter/X", href: "/twitter-downloader", color: "#14171A" },
      ]}
      blogLinks={[
        { href: "/blog/cara-download-video-instagram-reels", title: "Cara Download Video Instagram Reels, Story & IGTV" },
        { href: "/blog/download-video-tanpa-watermark-gratis", title: "Download Video Tanpa Watermark Gratis - Semua Platform" },
        { href: "/blog/tips-aman-download-video-online", title: "Tips Aman Download Video Online - Hindari Virus & Malware" },
      ]}
    />
  );
}

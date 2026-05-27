"use client";

import React from "react";
import { PlatformPageClient } from "@/components/platform-page-client";
import {
  Shield, Zap, Smartphone, Monitor, Eye, Link2,
} from "lucide-react";

function TwitterXIcon() {
  return (
    <svg className="h-3 w-3 text-white" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  );
}

export function TwitterDownloaderPage() {
  return (
    <PlatformPageClient
      platformName="Twitter/X"
      platformColor="#14171A"
      platformIcon={<TwitterXIcon />}
      heroBadge="Tanpa Watermark"
      heroTitle="Download Video Twitter/X"
      heroTitleHighlight="Tanpa Watermark"
      heroSubtitle="Simpan video dari Twitter dan X tanpa watermark dalam kualitas HD. Cukup copy-paste link, langsung download!"
      inputPlaceholder="Tempel link tweet Twitter/X di sini..."
      breadcrumbLabel="Twitter/X Downloader"
      features={[
        {
          icon: <Eye className="h-5 w-5" />,
          title: "Tanpa Watermark",
          description: "Video Twitter/X yang didownload melalui Mova tidak memiliki watermark apapun. Bersih dan profesional.",
        },
        {
          icon: <Monitor className="h-5 w-5" />,
          title: "Kualitas HD",
          description: "Download video Twitter/X dalam kualitas terbaik yang tersedia. Video tajam dan jernih untuk semua keperluan.",
        },
        {
          icon: <Link2 className="h-5 w-5" />,
          title: "Copy-Paste Mudah",
          description: "Cukup salin link tweet dan tempel di Mova. Prosesnya semudah copy-paste, tanpa langkah rumit.",
        },
        {
          icon: <Zap className="h-5 w-5" />,
          title: "Super Cepat",
          description: "Video tersedia dalam hitungan detik. Server Mova dioptimalkan untuk kecepatan download maksimal.",
        },
        {
          icon: <Shield className="h-5 w-5" />,
          title: "Aman & Tanpa Login",
          description: "Tidak perlu login akun Twitter/X. Privasi kamu terjaga, data tidak disimpan di server kami.",
        },
        {
          icon: <Smartphone className="h-5 w-5" />,
          title: "Support twitter.com & x.com",
          description: "Mova mendukung link dari twitter.com dan x.com. Kedua domain dikenali dan diproses secara otomatis.",
        },
      ]}
      steps={[
        {
          title: "Salin Link Tweet",
          description: "Buka Twitter/X, temukan tweet yang berisi video. Klik atau tap tombol Share (ikon panah atau tiga titik) lalu pilih \"Copy link\" atau \"Salin tautan\".",
        },
        {
          title: "Tempel Link di Mova",
          description: "Buka Mova di browser, tempel link tweet yang sudah disalin ke kolom input di atas. Gunakan tombol \"Tempel\" untuk paste otomatis.",
        },
        {
          title: "Download Video",
          description: "Klik tombol Download dan video akan langsung tersimpan di perangkat kamu. Tanpa watermark, kualitas HD, dan proses yang super cepat!",
        },
      ]}
      faqs={[
        {
          question: "Apakah Mova bisa download video dari Twitter dan X?",
          answer: "Ya, Mova mendukung download video dari twitter.com maupun x.com. Kedua domain tersebut didukung secara penuh. Tidak peduli apakah link kamu berasal dari twitter.com atau x.com, Mova bisa memproses keduanya dengan cara yang sama.",
        },
        {
          question: "Apakah video Twitter yang didownload memiliki watermark?",
          answer: "Tidak, video Twitter/X yang didownload melalui Mova tidak memiliki watermark apapun. Berbeda dengan beberapa platform lain yang menambahkan logo sendiri, Mova memberikan video dalam kondisi bersih sesuai kualitas aslinya. Ini menjadikan video lebih nyaman ditonton dan lebih profesional jika digunakan untuk keperluan presentasi atau editing.",
        },
        {
          question: "Bagaimana cara download video Twitter/X?",
          answer: "Caranya sangat mudah dan cepat! Buka Twitter/X, temukan tweet yang berisi video yang ingin kamu download. Klik tombol Share pada tweet tersebut, lalu pilih \"Copy link\". Setelah itu, buka Mova di browser, tempel link yang sudah disalin di kolom input, dan klik Download. Video akan langsung tersedia untuk disimpan ke perangkat kamu.",
        },
        {
          question: "Apakah download video Twitter/X di Mova gratis?",
          answer: "Ya, 100% gratis tanpa batas! Tidak perlu registrasi, tidak perlu berlangganan, dan tidak ada biaya tersembunyi. Mova memberikan layanan download video Twitter/X secara cuma-cuma untuk semua pengguna. Download sepuas kamu tanpa batasan jumlah.",
        },
        {
          question: "Bisakah saya download video Twitter dari akun private?",
          answer: "Tidak, Mova hanya bisa mendownload video dari tweet yang bersifat publik. Konten dari akun private dilindungi oleh Twitter/X dan tidak bisa diakses oleh pihak ketiga manapun termasuk Mova. Pastikan video yang ingin kamu download bisa dilihat oleh siapapun tanpa perlu login.",
        },
        {
          question: "Bisakah Mova download GIF dari Twitter?",
          answer: "GIF di Twitter sebenarnya disimpan sebagai video MP4 pendek. Mova bisa mendownload file tersebut dalam format MP4. Jika kamu membutuhkan format GIF yang sebenarnya, kamu perlu mengkonversi file MP4 tersebut ke GIF menggunakan tool konverter terpisah.",
        },
        {
          question: "Kenapa video Twitter/X yang saya download gagal?",
          answer: "Beberapa kemungkinan penyebabnya: link tweet tidak valid atau sudah dihapus, tweet bersifat private atau protected, video telah dihapus oleh pemilik tweet, atau ada masalah koneksi internet. Pastikan tweet bisa diakses secara publik dan link yang kamu masukkan benar. Coba refresh halaman dan ulangi prosesnya.",
        },
      ]}
      seoSections={[
        {
          heading: "Mengapa Perlu Twitter/X Video Downloader?",
          content: (
            <>
              <p>
                Twitter (sekarang dikenal sebagai X) adalah platform microblogging yang juga menjadi sumber video viral dan konten informatif. Setiap hari, jutaan video diupload ke Twitter/X — mulai dari klip berita, momen olahraga, video lucu, hingga konten edukasi. Namun, Twitter/X tidak menyediakan opsi download bawaan untuk menyimpan video ke perangkat.
              </p>
              <p>
                Tanpa tool khusus, cara satu-satunya untuk menyimpan video Twitter/X adalah dengan merekam layar (screen recording), yang tentu saja menurunkan kualitas video dan merekam elemen UI yang tidak diinginkan. Inilah mengapa <strong>Twitter video downloader</strong> seperti Mova menjadi solusi yang jauh lebih baik.
              </p>
              <p>
                Dengan Mova, kamu bisa mendownload video Twitter/X langsung dalam format MP4 dengan kualitas aslinya. Prosesnya cepat, mudah, dan tidak memerlukan install aplikasi apapun. Cukup salin link tweet, tempel di Mova, dan download!
              </p>
            </>
          ),
        },
        {
          heading: "Perubahan dari Twitter ke X: Apa yang Berubah untuk Download Video?",
          content: (
            <>
              <p>
                Sejak Elon Musk mengakuisisi Twitter dan mengubah namanya menjadi X, ada beberapa perubahan yang mempengaruhi cara pengguna berinteraksi dengan konten di platform ini. Namun, untuk keperluan download video, tidak banyak yang berubah secara fundamental.
              </p>
              <p>
                <strong>Domain baru:</strong> X menggunakan domain x.com sebagai pengganti twitter.com. Link tweet yang sebelumnya berformat twitter.com/user/status/... sekarang juga bisa berformat x.com/user/status/.... Mova mendukung kedua format ini, sehingga kamu tidak perlu khawatir apakah link berasal dari twitter.com atau x.com.
              </p>
              <p>
                <strong>Format video:</strong> Format video di X tetap sama seperti di Twitter sebelumnya — video MP4 dengan berbagai resolusi. Mova tetap bisa mendownload video dari X dengan kualitas terbaik.
              </p>
              <p>
                <strong>Pembatasan akses:</strong> X semakin membatasi akses terhadap konten bagi pengguna yang tidak login. Namun, video dari tweet publik masih bisa diakses dan didownload oleh Mova tanpa perlu login.
              </p>
            </>
          ),
        },
        {
          heading: "Cara Menyalin Link Video Twitter/X dengan Benar",
          content: (
            <>
              <p>
                Menyalin link video Twitter/X adalah langkah pertama dan terpenting dalam proses download. Berikut cara yang benar:
              </p>
              <p>
                <strong>Di aplikasi Twitter/X (mobile):</strong> Buka tweet yang berisi video. Tap ikon Share (berbentuk panah atau tiga titik) yang biasanya berada di kanan bawah tweet. Pilih \"Copy link\" atau \"Salin tautan\" dari menu yang muncul. Link akan otomatis tersalin ke clipboard.
              </p>
              <p>
                <strong>Di browser (desktop):</strong> Buka tweet yang berisi video. Klik ikon Share di bawah tweet, lalu pilih \"Copy link\". Alternatifnya, kamu juga bisa menyalin URL langsung dari address bar browser saat tweet sedang terbuka. URL tweet biasanya berformat twitter.com/username/status/... atau x.com/username/status/...
              </p>
              <p>
                Setelah link tersalin, buka Mova di browser dan tempel link di kolom input. Proses selanjutnya akan berjalan otomatis — Mova akan mencari video dalam tweet tersebut dan menyediakan opsi download.
              </p>
            </>
          ),
        },
        {
          heading: "Kegunaan Video Twitter/X yang Didownload",
          content: (
            <>
              <p>
                Ada banyak alasan mengapa orang ingin mendownload video dari Twitter/X. Berikut beberapa kegunaan umumnya:
              </p>
              <ul>
                <li>
                  <strong>Arsip konten berharga</strong> — Tweet bisa dihapus kapan saja oleh pemiliknya, dan video viral sering kali menghilang begitu saja. Dengan mendownload video, kamu bisa menyimpan konten berharga sebelum ia menghilang.
                </li>
                <li>
                  <strong>Menonton offline</strong> — Download video Twitter/X memungkinkan kamu menonton konten tanpa koneksi internet. Berguna saat bepergian atau di area dengan sinyal lemah.
                </li>
                <li>
                  <strong>Referensi dan riset</strong> — Video berita, testimoni, atau konten informatif di Twitter/X bisa menjadi referensi berharga untuk penelitian, jurnalisme, atau presentasi.
                </li>
                <li>
                  <strong>Bahan editing</strong> — Content creator sering membutuhkan klip video dari Twitter/X sebagai bahan editing untuk konten mereka sendiri. Dengan Mova, video bisa didownload dalam kualitas HD tanpa watermark.
                </li>
                <li>
                  <strong>Berbagi ke platform lain</strong> — Video yang menarik di Twitter/X mungkin ingin dibagikan ke WhatsApp, Telegram, atau platform lainnya. Mendownload video memudahkan proses berbagi tersebut.
                </li>
              </ul>
              <p>
                Apapun kegunaannya, pastikan kamu selalu menghormati hak cipta kreator konten dan menggunakan video yang didownload secara bertanggung jawab.
              </p>
            </>
          ),
        },
      ]}
      ctaTitle="Siap Download Video Twitter/X?"
      ctaSubtitle="Simpan video Twitter/X tanpa watermark dengan Mova. Gratis, cepat, dan semudah copy-paste!"
      otherPlatforms={[
        { name: "TikTok", href: "/tiktok-downloader", color: "#010101", gradient: "linear-gradient(135deg, #25F4EE, #FE2C55)" },
        { name: "Instagram", href: "/instagram-downloader", color: "#E4405F", gradient: "linear-gradient(135deg, #833AB4, #FD1D1D, #F77737)" },
        { name: "YouTube", href: "/youtube-downloader", color: "#FF0000" },
        { name: "Facebook", href: "/facebook-downloader", color: "#1877F2" },
        { name: "Pinterest", href: "/pinterest-downloader", color: "#E60023" },
        { name: "Reddit", href: "/reddit-downloader", color: "#FF4500" },
        { name: "Telegram", href: "/telegram-downloader", color: "#26A5E4" },
        { name: "YouTube MP3", href: "/youtube-mp3", color: "#FF0000", gradient: "linear-gradient(135deg, #FF0000, #FF6600)" },
      ]}
      blogLinks={[
        { href: "/blog/download-video-twitter-x-tanpa-watermark", title: "Cara Download Video Twitter/X Tanpa Watermark" },
        { href: "/blog/download-video-tanpa-watermark-gratis", title: "Download Video Tanpa Watermark Gratis - Semua Platform" },
        { href: "/blog/tips-aman-download-video-online", title: "Tips Aman Download Video Online - Hindari Virus & Malware" },
      ]}
    />
  );
}

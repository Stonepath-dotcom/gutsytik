"use client";

import React from "react";
import { PlatformPageClient } from "@/components/platform-page-client";
import {
  Shield, Zap, Smartphone, Monitor, Music, Eye,
} from "lucide-react";

function TikTokIcon() {
  return (
    <svg className="h-3 w-3 text-white" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.43V13a8.28 8.28 0 005.58 2.15V11.7a4.83 4.83 0 01-3.77-1.24V6.69h3.77z"/>
    </svg>
  );
}

export function TikTokDownloaderPage() {
  return (
    <PlatformPageClient
      platformName="TikTok"
      platformColor="#010101"
      platformGradient="linear-gradient(135deg, #25F4EE, #FE2C55)"
      platformIcon={<TikTokIcon />}
      heroBadge="Gratis & Tanpa Batas"
      heroTitle="Download Video TikTok"
      heroTitleHighlight="Tanpa Watermark"
      heroSubtitle="Simpan video TikTok favorit kamu tanpa watermark dalam kualitas HD. Cepat, gratis, dan tanpa registrasi!"
      inputPlaceholder="Tempel link video TikTok di sini..."
      breadcrumbLabel="TikTok Downloader"
      features={[
        {
          icon: <Eye className="h-5 w-5" />,
          title: "Tanpa Watermark",
          description: "Hapus watermark TikTok secara otomatis. Video bersih tanpa logo dan username yang mengganggu.",
        },
        {
          icon: <Monitor className="h-5 w-5" />,
          title: "Kualitas HD",
          description: "Download video TikTok dalam resolusi HD hingga 1080p. Kualitas asli terjaga tanpa kompresi.",
        },
        {
          icon: <Zap className="h-5 w-5" />,
          title: "Super Cepat",
          description: "Proses download hanya butuh beberapa detik. Server cepat memastikan video langsung tersedia.",
        },
        {
          icon: <Music className="h-5 w-5" />,
          title: "Ekstrak Audio MP3",
          description: "Tidak hanya video, Mova juga bisa mengekstrak audio dari video TikTok jadi file MP3.",
        },
        {
          icon: <Shield className="h-5 w-5" />,
          title: "Aman & Privat",
          description: "Tidak perlu login akun TikTok. Data pribadi kamu aman dan tidak disimpan di server kami.",
        },
        {
          icon: <Smartphone className="h-5 w-5" />,
          title: "Semua Perangkat",
          description: "Bisa diakses dari HP, tablet, dan laptop. Tidak perlu install aplikasi tambahan.",
        },
      ]}
      steps={[
        {
          title: "Salin Link Video TikTok",
          description: "Buka aplikasi TikTok, temukan video yang ingin kamu download. Tap tombol Share (ikon panah) lalu pilih \"Salin tautan\" atau \"Copy Link\".",
        },
        {
          title: "Tempel Link di Mova",
          description: "Buka Mova di browser, tempel link TikTok yang sudah disalin ke kolom input di atas. Kamu juga bisa klik tombol \"Tempel\" untuk otomatis paste dari clipboard.",
        },
        {
          title: "Pilih Kualitas & Download",
          description: "Klik tombol Download, pilih kualitas video yang kamu inginkan (HD atau SD), lalu klik download. Video akan tersimpan di perangkat kamu tanpa watermark!",
        },
      ]}
      faqs={[
        {
          question: "Apakah Mova benar-benar bisa download TikTok tanpa watermark?",
          answer: "Ya, Mova menggunakan teknologi khusus yang secara otomatis menghapus watermark TikTok saat proses download. Hasilnya adalah video bersih tanpa logo TikTok dan username yang biasanya muncul di sudut video. Kamu bisa langsung membandingkan hasilnya dengan video yang di-download langsung dari aplikasi TikTok.",
        },
        {
          question: "Apakah download TikTok tanpa watermark di Mova gratis?",
          answer: "Ya, 100% gratis. Mova tidak membebankan biaya apapun untuk download video TikTok tanpa watermark. Tidak ada batasan jumlah download per hari, tidak perlu berlangganan, dan tidak ada iklan pop-up yang mengganggu. Kami membiarkan semua pengguna menikmati layanan ini secara gratis.",
        },
        {
          question: "Bagaimana cara download video TikTok yang diprivate?",
          answer: "Mova hanya bisa mendownload video TikTok yang bersifat publik. Video dari akun private tidak bisa diakses oleh pihak ketiga termasuk Mova. Ini adalah pembatasan yang wajar untuk melindungi privasi pengguna TikTok. Pastikan video yang ingin kamu download bisa dilihat oleh siapapun.",
        },
        {
          question: "Apakah kualitas video TikTok yang di-download berkurang?",
          answer: "Tidak, Mova mendownload video TikTok dalam kualitas aslinya. Jika video tersedia dalam resolusi HD (1080p), Mova akan memberikan opsi download HD tersebut. Tidak ada kompresi atau penurunan kualitas yang dilakukan oleh Mova. Video yang kamu dapatkan akan sama kualitasnya dengan yang ditampilkan di TikTok.",
        },
        {
          question: "Apakah Mova aman untuk download video TikTok?",
          answer: "Ya, Mova sepenuhnya aman. Kami tidak menyimpan data pribadi pengguna, tidak meminta akses ke akun TikTok kamu, dan tidak mengandung malware atau virus. Mova berjalan di browser tanpa perlu menginstall aplikasi apapun. Semua proses download dilakukan secara aman melalui koneksi terenkripsi.",
        },
        {
          question: "Bisakah saya download video TikTok slideshow atau foto?",
          answer: "Ya, Mova mendukung download berbagai jenis konten TikTok termasuk video slideshow dan live. Untuk slideshow, Mova akan mengunduhnya sebagai video lengkap sesuai format aslinya di TikTok.",
        },
        {
          question: "Kenapa video TikTok yang saya download gagal?",
          answer: "Beberapa kemungkinan penyebab: link yang dimasukkan tidak valid atau sudah kadaluarsa, video bersifat private atau telah dihapus oleh pembuatnya, atau terdapat masalah koneksi internet. Pastikan link yang kamu masukkan benar dan video masih bisa dilihat secara publik di TikTok.",
        },
      ]}
      seoSections={[
        {
          heading: "Mengapa Perlu Download Video TikTok Tanpa Watermark?",
          content: (
            <>
              <p>
                TikTok telah menjadi salah satu platform media sosial paling populer di Indonesia dengan jutaan pengguna aktif setiap harinya. Dari video komedi, tutorial, hingga konten edukasi — ada begitu banyak konten menarik yang sayang kalau tidak disimpan. Namun, ketika kamu mendownload video langsung dari aplikasi TikTok, video tersebut akan selalu memiliki watermark berupa logo TikTok dan username pembuat yang tertempel di sudut video.
              </p>
              <p>
                Watermark ini bisa menjadi masalah dalam beberapa situasi. Bagi para content creator yang ingin menggunakan video sebagai referensi atau bahan editing, watermark tentu mengganggu tampilan akhir. Untuk keperluan presentasi di kantor atau kampus, video dengan watermark terlihat kurang profesional. Dan bagi yang sekadar ingin menyimpan koleksi video favorit, tentu lebih enak melihat video bersih tanpa logo yang menutupi sebagian tampilan.
              </p>
              <p>
                Itulah mengapa <strong>TikTok downloader tanpa watermark</strong> seperti Mova menjadi sangat dibutuhkan. Dengan Mova, kamu bisa mendapatkan video TikTok dalam kondisi bersih dan berkualitas tinggi tanpa perlu repot-repot menghapus watermark secara manual menggunakan aplikasi editing.
              </p>
            </>
          ),
        },
        {
          heading: "Keunggulan Mova sebagai TikTok Downloader",
          content: (
            <>
              <p>
                Mova bukan sekadar tool download video TikTok biasa. Ada beberapa keunggulan yang membuat Mova menjadi pilihan terbaik untuk download video TikTok tanpa watermark:
              </p>
              <ul>
                <li>
                  <strong>Tanpa registrasi dan login</strong> — Langsung pakai tanpa perlu membuat akun atau login. Cukup tempel link dan download.
                </li>
                <li>
                  <strong>Kualitas video terjaga</strong> — Mova mendownload video dalam resolusi aslinya, termasuk opsi HD 1080p jika tersedia. Tidak ada kompresi yang menurunkan kualitas.
                </li>
                <li>
                  <strong>Proses super cepat</strong> — Dengan server yang dioptimalkan, proses download video TikTok hanya membutuhkan beberapa detik saja.
                </li>
                <li>
                  <strong>Multi-platform</strong> — Selain TikTok, Mova juga mendukung download dari Instagram, YouTube, Facebook, Twitter/X, dan platform lainnya.
                </li>
                <li>
                  <strong>Tanpa iklan mengganggu</strong> — Tidak ada pop-up, redirect, atau iklan yang mengganggu pengalaman download kamu.
                </li>
                <li>
                  <strong>Bisa ekstrak audio MP3</strong> — Ingin menyimpan lagu atau sound dari video TikTok? Mova bisa mengekstrak audio-nya jadi file MP3.
                </li>
              </ul>
            </>
          ),
        },
        {
          heading: "Perbedaan Download TikTok dengan Watermark dan Tanpa Watermark",
          content: (
            <>
              <p>
                Mungkin kamu bertanya-tanya, apa sih bedanya download TikTok biasa dengan yang tanpa watermark? Berikut perbandingannya:
              </p>
              <p>
                <strong>Download langsung dari TikTok:</strong> Video yang di-download dari aplikasi TikTok akan memiliki watermark berupa logo TikTok yang bergerak-gerak di sudut video plus username akun pembuatnya. Watermark ini bisa menutupi bagian penting dari video dan terlihat kurang profesional jika digunakan untuk keperluan lain.
              </p>
              <p>
                <strong>Download dengan Mova (tanpa watermark):</strong> Video yang di-download melalui Mova akan bersih tanpa logo TikTok maupun username. Tampilan video sama persis dengan yang diupload oleh pembuatnya, sehingga lebih nyaman ditonton dan lebih profesional jika digunakan untuk presentasi, referensi, atau konten lanjutan.
              </p>
              <p>
                Dari segi kualitas, keduanya sama — Mova tetap mendownload dalam resolusi asli tanpa kompresi. Yang berbeda hanyalah keberadaan watermark. Jadi, kalau kamu ingin video yang bersih dan rapi, download TikTok tanpa watermark adalah pilihan yang tepat.
              </p>
            </>
          ),
        },
        {
          heading: "Tips Menggunakan Video TikTok yang Didownload secara Bertanggung Jawab",
          content: (
            <>
              <p>
                Meskipun Mova memudahkan kamu untuk download video TikTok tanpa watermark, penting untuk menggunakan video tersebut secara bertanggung jawab. Berikut beberapa tips yang perlu diperhatikan:
              </p>
              <ul>
                <li>
                  <strong>Hormati hak cipta</strong> — Video yang kamu download adalah karya dari kreator TikTok. Jika ingin repost, selalu minta izin dan berikan kredit kepada pembuat aslinya.
                </li>
                <li>
                  <strong>Jangan gunakan untuk keuntungan komersial tanpa izin</strong> — Menggunakan video orang lain untuk tujuan komersial tanpa izin bisa melanggar hak cipta dan berpotensi menimbulkan masalah hukum.
                </li>
                <li>
                  <strong>Gunakan untuk penggunaan pribadi</strong> — Menyimpan video untuk koleksi pribadi, referensi, atau ditonton offline adalah penggunaan yang paling aman dan wajar.
                </li>
                <li>
                  <strong>Perhatikan konten sensitif</strong> — Jangan menyebarkan ulang konten yang bersifat sensitif, privat, atau bisa merugikan orang lain.
                </li>
              </ul>
              <p>
                Dengan menggunakan Mova secara bertanggung jawab, kamu bisa menikmati video TikTok favorit tanpa watermark sambil tetap menghargai karya dan hak cipta para kreator.
              </p>
            </>
          ),
        },
      ]}
      ctaTitle="Siap Download Video TikTok Tanpa Watermark?"
      ctaSubtitle="Coba Mova sekarang dan rasakan kemudahan download video TikTok bersih tanpa logo. Gratis dan tanpa batas!"
      otherPlatforms={[
        { name: "Instagram", href: "/instagram-downloader", color: "#E4405F", gradient: "linear-gradient(135deg, #833AB4, #FD1D1D, #F77737)" },
        { name: "YouTube", href: "/youtube-downloader", color: "#FF0000" },
        { name: "Facebook", href: "/facebook-downloader", color: "#1877F2" },
        { name: "Twitter/X", href: "/twitter-downloader", color: "#14171A" },
      ]}
      blogLinks={[
        { href: "/blog/cara-download-video-tiktok-tanpa-watermark", title: "Cara Download Video TikTok Tanpa Watermark 2026" },
        { href: "/blog/download-video-tanpa-watermark-gratis", title: "Download Video Tanpa Watermark Gratis - Semua Platform" },
        { href: "/blog/tips-aman-download-video-online", title: "Tips Aman Download Video Online - Hindari Virus & Malware" },
      ]}
      relatedBlogPosts={[
        { title: "Cara Download Video TikTok Tanpa Watermark 2026", slug: "download-tiktok-tanpa-watermark" },
        { title: "Download Video Tanpa Watermark Gratis - Semua Platform", slug: "download-video-tanpa-watermark-gratis" },
        { title: "Tips Aman Download Video Online", slug: "tips-aman-download-video-online" },
      ]}
    />
  );
}

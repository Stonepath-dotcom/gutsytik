import type { Metadata } from "next";
import {
  Home, ChevronRight, Clock, User, Calendar, ArrowRight
} from "lucide-react";
import { MovaLogo } from "@/components/mova-logo";

export const metadata: Metadata = {
  title: "Cara Download Video YouTube HD 1080p Gratis di HP & PC | Mova Blog",
  description: "Panduan lengkap cara download video YouTube HD 1080p gratis di HP dan PC. Langkah mudah, pilihan kualitas, dan tips download YouTube terbaik dengan Mova.",
  keywords: ["download youtube hd", "youtube 1080p downloader", "download video youtube hd gratis", "cara download youtube 1080p", "youtube downloader hd gratis"],
  alternates: { canonical: "https://getmova.my.id/blog/cara-download-video-youtube-hd-1080p" },
  openGraph: {
    title: "Cara Download Video YouTube HD 1080p Gratis di HP & PC | Mova Blog",
    description: "Panduan lengkap cara download video YouTube HD 1080p gratis di HP dan PC. Langkah mudah, pilihan kualitas, dan tips download YouTube terbaik.",
    url: "https://getmova.my.id/blog/cara-download-video-youtube-hd-1080p",
    siteName: "Mova",
    type: "article",
    publishedTime: "2026-05-26",
    modifiedTime: "2026-05-26",
    authors: ["Mova"],
  },
};

export default function CaraDownloadVideoYoutubeHd1080p() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Cara Download Video YouTube HD 1080p Gratis di HP & PC",
    description: "Panduan lengkap cara download video YouTube HD 1080p gratis di HP dan PC. Langkah mudah, pilihan kualitas, dan tips download YouTube terbaik dengan Mova.",
    url: "https://getmova.my.id/blog/cara-download-video-youtube-hd-1080p",
    datePublished: "2026-05-26",
    dateModified: "2026-05-26",
    author: { "@type": "Organization", name: "Mova" },
    publisher: {
      "@type": "Organization",
      name: "Mova",
      logo: { "@type": "ImageObject", url: "https://getmova.my.id/mova-logo.png" },
    },
    mainEntityOfPage: "https://getmova.my.id/blog/cara-download-video-youtube-hd-1080p",
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://getmova.my.id" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://getmova.my.id/blog" },
      { "@type": "ListItem", position: 3, name: "Download YouTube HD 1080p", item: "https://getmova.my.id/blog/cara-download-video-youtube-hd-1080p" },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <div className="min-h-screen flex flex-col bg-[#09090B] text-[#FAFAFA]">
        <header className="border-b border-[#27272A] bg-[#111113]">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <a href="/" className="flex items-center gap-2"><MovaLogo size={32} showText /></a>
              <a href="/" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border border-[#27272A] bg-[#111113] text-[#FAFAFA] hover:bg-[#18181B] transition-colors">
                <Home className="h-4 w-4" />Beranda
              </a>
            </div>
          </div>
        </header>
        <main className="flex-1">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex items-center gap-1.5 text-sm text-[#A1A1AA]">
                <li><a href="/" className="hover:text-[#4F46E5] transition-colors">Beranda</a></li>
                <li><ChevronRight className="h-3.5 w-3.5" /></li>
                <li><a href="/blog" className="hover:text-[#4F46E5] transition-colors">Blog</a></li>
                <li><ChevronRight className="h-3.5 w-3.5" /></li>
                <li className="text-[#4F46E5] font-medium">Download YouTube HD 1080p</li>
              </ol>
            </nav>

            {/* Article Header */}
            <div className="mb-12">
              <div className="flex flex-wrap items-center gap-3 mb-4 text-xs text-[#A1A1AA]">
                <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />26 Mei 2026</span>
                <span className="flex items-center gap-1"><Clock className="h-3 w-3" />7 menit baca</span>
                <span className="flex items-center gap-1"><User className="h-3 w-3" />Tim Mova</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-[#FAFAFA] mb-4" style={{ fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif" }}>
                Cara Download Video YouTube HD 1080p Gratis di HP & PC
              </h1>
              <p className="text-[#A1A1AA] text-base leading-relaxed">
                YouTube adalah gudang video terbesar di internet, tapi sayangnya nggak semua video bisa di-download langsung. Apalagi kalau kamu mau kualitas HD 1080p — fitur download YouTube Premium pun terbatas. Di artikel ini, kita bakal bahas cara download video YouTube HD 1080p gratis di HP dan PC menggunakan Mova.
              </p>
            </div>

            {/* Article Content */}
            <article className="max-w-none space-y-8">
              <h2 className="text-xl font-bold text-[#FAFAFA] mt-8 mb-3" style={{ fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif" }}>
                Apa Itu Video YouTube HD 1080p?
              </h2>
              <p className="text-sm text-[#A1A1AA] leading-relaxed">
                Sebelum masuk ke tutorial, mari kita bahas dulu apa itu resolusi 1080p. Angka 1080p merujuk pada jumlah piksel vertikal dalam video — tepatnya 1080 piksel. Dengan rasio aspek 16:9, video 1080p memiliki resolusi 1920x1080 piksel, yang dikenal juga sebagai Full HD. Video dengan resolusi ini terlihat sangat tajam dan jernih, cocok untuk ditonton di layar laptop, monitor, maupun TV.
              </p>
              <p className="text-sm text-[#A1A1AA] leading-relaxed">
                YouTube sendiri menyediakan beberapa pilihan kualitas video, mulai dari 144p (paling rendah) hingga 4K/2160p (paling tinggi). Resolusi 1080p berada di tengah — bukan yang tertinggi, tapi sudah sangat memadai untuk kebanyakan kebutuhan. Ditambah lagi, ukuran file 1080p jauh lebih kecil dibanding 4K, sehingga lebih hemat ruang penyimpanan dan kuota internet.
              </p>

              <h2 className="text-xl font-bold text-[#FAFAFA] mt-8 mb-3" style={{ fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif" }}>
                Perbandingan Resolusi Video YouTube
              </h2>
              <div className="overflow-x-auto mt-3">
                <table className="w-full text-sm text-[#A1A1AA]">
                  <thead>
                    <tr className="border-b border-[#27272A]">
                      <th className="text-left py-2 px-3 text-[#FAFAFA] font-medium">Resolusi</th>
                      <th className="text-left py-2 px-3 text-[#FAFAFA] font-medium">Nama</th>
                      <th className="text-left py-2 px-3 text-[#FAFAFA] font-medium">Kualitas</th>
                      <th className="text-left py-2 px-3 text-[#FAFAFA] font-medium">Est. Ukuran (5 menit)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-[#27272A]/50">
                      <td className="py-2 px-3">360p</td>
                      <td className="py-2 px-3">SD</td>
                      <td className="py-2 px-3">Rendah</td>
                      <td className="py-2 px-3">~20 MB</td>
                    </tr>
                    <tr className="border-b border-[#27272A]/50">
                      <td className="py-2 px-3">480p</td>
                      <td className="py-2 px-3">SD</td>
                      <td className="py-2 px-3">Sedang</td>
                      <td className="py-2 px-3">~35 MB</td>
                    </tr>
                    <tr className="border-b border-[#27272A]/50 bg-[#4F46E5]/5">
                      <td className="py-2 px-3 text-[#4F46E5] font-medium">720p</td>
                      <td className="py-2 px-3">HD</td>
                      <td className="py-2 px-3">Tinggi</td>
                      <td className="py-2 px-3">~60 MB</td>
                    </tr>
                    <tr className="border-b border-[#27272A]/50 bg-[#4F46E5]/10">
                      <td className="py-2 px-3 text-[#4F46E5] font-bold">1080p</td>
                      <td className="py-2 px-3 font-medium">Full HD</td>
                      <td className="py-2 px-3">Sangat Tinggi</td>
                      <td className="py-2 px-3">~100 MB</td>
                    </tr>
                    <tr className="border-b border-[#27272A]/50">
                      <td className="py-2 px-3">1440p</td>
                      <td className="py-2 px-3">2K</td>
                      <td className="py-2 px-3">Super Tinggi</td>
                      <td className="py-2 px-3">~200 MB</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3">2160p</td>
                      <td className="py-2 px-3">4K</td>
                      <td className="py-2 px-3">Maksimal</td>
                      <td className="py-2 px-3">~400 MB</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-[#71717A] mt-2">*Estimasi ukuran file bervariasi tergantung bitrate dan konten video</p>

              <h2 className="text-xl font-bold text-[#FAFAFA] mt-8 mb-3" style={{ fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif" }}>
                Cara Download Video YouTube HD 1080p di HP (Android & iPhone)
              </h2>
              <p className="text-sm text-[#A1A1AA] leading-relaxed">
                Untuk pengguna HP, cara paling mudah adalah menggunakan <a href="/" className="text-[#4F46E5] hover:underline">Mova</a>. Berikut langkah-langkahnya:
              </p>
              <div className="space-y-4 mt-4">
                <div className="flex items-start gap-3 p-4 rounded-lg bg-[#111113] border border-[#27272A]">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[#4F46E5] text-white text-xs font-bold flex items-center justify-center">1</span>
                  <div>
                    <p className="text-sm text-[#FAFAFA] font-medium">Buka aplikasi YouTube</p>
                    <p className="text-sm text-[#A1A1AA] mt-1">Cari video yang ingin kamu download. Tap tombol Share (bagikan) di bawah video, lalu pilih &quot;Salin tautan&quot; atau &quot;Copy Link&quot;.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-lg bg-[#111113] border border-[#27272A]">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[#4F46E5] text-white text-xs font-bold flex items-center justify-center">2</span>
                  <div>
                    <p className="text-sm text-[#FAFAFA] font-medium">Buka Mova di browser HP</p>
                    <p className="text-sm text-[#A1A1AA] mt-1">Buka Chrome, Safari, atau browser apapun, lalu kunjungi <a href="/" className="text-[#4F46E5] hover:underline">getmova.my.id</a>. Mova bisa diakses dari Android maupun iPhone.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-lg bg-[#111113] border border-[#27272A]">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[#4F46E5] text-white text-xs font-bold flex items-center justify-center">3</span>
                  <div>
                    <p className="text-sm text-[#FAFAFA] font-medium">Tempel link YouTube</p>
                    <p className="text-sm text-[#A1A1AA] mt-1">Paste link video YouTube ke kolom input di halaman utama Mova, lalu klik tombol Download.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-lg bg-[#111113] border border-[#27272A]">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[#4F46E5] text-white text-xs font-bold flex items-center justify-center">4</span>
                  <div>
                    <p className="text-sm text-[#FAFAFA] font-medium">Pilih kualitas 1080p dan download</p>
                    <p className="text-sm text-[#A1A1AA] mt-1">Mova akan menampilkan beberapa opsi kualitas. Pilih 1080p (Full HD) untuk kualitas terbaik, lalu klik download. Video akan tersimpan di galeri HP kamu!</p>
                  </div>
                </div>
              </div>

              <h2 className="text-xl font-bold text-[#FAFAFA] mt-8 mb-3" style={{ fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif" }}>
                Cara Download Video YouTube HD 1080p di PC/Laptop
              </h2>
              <p className="text-sm text-[#A1A1AA] leading-relaxed">
                Untuk pengguna PC atau laptop, langkahnya sama persis. Kamu cuma perlu browser — nggak perlu install software apapun. Buka <a href="/" className="text-[#4F46E5] hover:underline">Mova</a> di browser, paste link YouTube, pilih kualitas 1080p, dan download. Video akan tersimpan di folder Downloads komputer kamu. Keuntungan download di PC adalah proses lebih cepat karena koneksi internet biasanya lebih stabil, dan kamu bisa langsung pindahkan video ke flashdisk atau harddisk eksternal.
              </p>

              <h2 className="text-xl font-bold text-[#FAFAFA] mt-8 mb-3" style={{ fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif" }}>
                Tips Download YouTube HD agar Hasilnya Optimal
              </h2>
              <ul className="space-y-2 mt-3">
                <li className="flex items-start gap-2 text-sm text-[#A1A1AA]">
                  <span className="text-[#4F46E5] mt-1">&#8226;</span>
                  <span><strong className="text-[#FAFAFA]">Cek ketersediaan resolusi</strong> — Nggak semua video YouTube tersedia dalam 1080p. Video lama atau yang di-upload dalam resolusi rendah hanya bisa didownload dalam resolusi maksimal yang tersedia.</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-[#A1A1AA]">
                  <span className="text-[#4F46E5] mt-1">&#8226;</span>
                  <span><strong className="text-[#FAFAFA]">Gunakan koneksi stabil</strong> — Video 1080p berukuran cukup besar (sekitar 100 MB per 5 menit). Gunakan WiFi agar proses download nggak terputus di tengah jalan.</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-[#A1A1AA]">
                  <span className="text-[#4F46E5] mt-1">&#8226;</span>
                  <span><strong className="text-[#FAFAFA]">Perhatikan ruang penyimpanan</strong> — Satu video 1080p berdurasi 10 menit bisa mencapai 200 MB. Pastikan memori perangkat kamu cukup sebelum mendownload.</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-[#A1A1AA]">
                  <span className="text-[#4F46E5] mt-1">&#8226;</span>
                  <span><strong className="text-[#FAFAFA]">Download video yang belum dihapus</strong> — Beberapa video YouTube bisa dihapus oleh uploader atau ditarik karena masalah hak cipta. Kalau kamu menemukan video penting, segera download.</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-[#A1A1AA]">
                  <span className="text-[#4F46E5] mt-1">&#8226;</span>
                  <span><strong className="text-[#FAFAFA]">Hormati hak cipta</strong> — Download video YouTube untuk penggunaan pribadi. Jangan meng-unggah ulang video milik orang lain tanpa izin. Baca <a href="/disclaimer" className="text-[#4F46E5] hover:underline">disclaimer</a> kami untuk informasi lebih lanjut.</span>
                </li>
              </ul>

              <h2 className="text-xl font-bold text-[#FAFAFA] mt-8 mb-3" style={{ fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif" }}>
                YouTube Premium vs Download dengan Mova
              </h2>
              <p className="text-sm text-[#A1A1AA] leading-relaxed">
                YouTube Premium memang menyediakan fitur download bawaan, tapi ada beberapa kekurangan yang perlu kamu ketahui:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
                <div className="p-4 rounded-lg bg-[#111113] border border-[#27272A]">
                  <p className="text-sm font-medium text-[#FAFAFA] mb-2">YouTube Premium</p>
                  <ul className="space-y-1">
                    <li className="text-xs text-[#A1A1AA]">• Harga Rp 59.900/bulan</li>
                    <li className="text-xs text-[#A1A1AA]">• Video hanya bisa diputar di app YouTube</li>
                    <li className="text-xs text-[#A1A1AA]">• Video expired setelah 30 hari offline</li>
                    <li className="text-xs text-[#A1A1AA]">• Nggak bisa pindah ke perangkat lain</li>
                    <li className="text-xs text-[#A1A1AA]">• Format file terenkripsi</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-[#4F46E5]/10 border border-[#4F46E5]/30">
                  <p className="text-sm font-medium text-[#4F46E5] mb-2">Mova (Gratis)</p>
                  <ul className="space-y-1">
                    <li className="text-xs text-[#A1A1AA]">• 100% gratis tanpa biaya</li>
                    <li className="text-xs text-[#A1A1AA]">• File MP4 bisa diputar di mana saja</li>
                    <li className="text-xs text-[#A1A1AA]">• Video tersimpan selamanya di galeri</li>
                    <li className="text-xs text-[#A1A1AA]">• Bisa dipindah ke perangkat lain</li>
                    <li className="text-xs text-[#A1A1AA]">• Format standar MP4</li>
                  </ul>
                </div>
              </div>

              <p className="text-sm text-[#A1A1AA] leading-relaxed">
                Jelas kalau kamu cuma butuh download video YouTube sesekali, <a href="/" className="text-[#4F46E5] hover:underline">Mova</a> jauh lebih menguntungkan daripada berlangganan YouTube Premium. Kamu juga bisa menggunakan <a href="/youtube-downloader" className="text-[#4F46E5] hover:underline">YouTube Downloader</a> Mova untuk pengalaman yang lebih optimal, atau membaca panduan <a href="/blog/download-video-tanpa-watermark-terbaik" className="text-[#4F46E5] hover:underline">situs download video terbaik</a> dan <a href="/blog/cara-download-video-pinterest" className="text-[#4F46E5] hover:underline">cara download video Pinterest</a> di blog kami.
              </p>
            </article>

            {/* CTA */}
            <div className="mt-12 p-6 rounded-xl bg-gradient-to-br from-[#4F46E5]/20 to-[#7C3AED]/10 border border-[#4F46E5]/30 text-center">
              <h3 className="text-lg font-bold text-[#FAFAFA] mb-2">Coba Mova Sekarang — Gratis!</h3>
              <p className="text-sm text-[#A1A1AA] mb-4">Download video tanpa watermark dari berbagai platform populer dengan cepat dan mudah.</p>
              <a href="/" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold bg-[#4F46E5] text-white hover:bg-[#4338CA] transition-colors">
                Mulai Download <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            {/* Related articles */}
            <div className="mt-12 p-6 rounded-xl bg-[#111113] border border-[#27272A]">
              <h3 className="text-sm font-bold text-[#FAFAFA] mb-4" style={{ fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif" }}>
                Artikel Terkait
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a href="/blog/download-video-tanpa-watermark-terbaik" className="p-3 rounded-lg border border-[#27272A] hover:border-[#4F46E5]/50 transition-colors">
                  <p className="text-sm font-medium text-[#FAFAFA] hover:text-[#4F46E5]">10 Situs Download Video Tanpa Watermark Terbaik 2026</p>
                  <p className="text-xs text-[#A1A1AA] mt-1">Perbandingan situs downloader terbaik.</p>
                </a>
                <a href="/blog/cara-download-video-pinterest" className="p-3 rounded-lg border border-[#27272A] hover:border-[#4F46E5]/50 transition-colors">
                  <p className="text-sm font-medium text-[#FAFAFA] hover:text-[#4F46E5]">Cara Download Video Pinterest ke Galeri HP</p>
                  <p className="text-xs text-[#A1A1AA] mt-1">Panduan download video Pinterest dengan mudah.</p>
                </a>
                <a href="/blog/perbandingan-tiktok-downloader" className="p-3 rounded-lg border border-[#27272A] hover:border-[#4F46E5]/50 transition-colors">
                  <p className="text-sm font-medium text-[#FAFAFA] hover:text-[#4F46E5]">Perbandingan TikTok Downloader Terbaik 2026</p>
                  <p className="text-xs text-[#A1A1AA] mt-1">Mana TikTok downloader yang paling bagus?</p>
                </a>
                <a href="/blog/download-video-instagram-story-dan-reels" className="p-3 rounded-lg border border-[#27272A] hover:border-[#4F46E5]/50 transition-colors">
                  <p className="text-sm font-medium text-[#FAFAFA] hover:text-[#4F46E5]">Download Video Instagram Story dan Reels</p>
                  <p className="text-xs text-[#A1A1AA] mt-1">Simpan Story dan Reels IG tanpa aplikasi.</p>
                </a>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-[#27272A] text-center">
              <p className="text-xs text-[#A1A1AA]">&copy; 2026 Mova. Dibuat dengan ❤️ di Indonesia.</p>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

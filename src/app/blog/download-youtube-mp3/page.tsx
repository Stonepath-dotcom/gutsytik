import { Home, ArrowLeft, Clock, Calendar, User, ArrowRight } from "lucide-react";
import { MovaLogo } from "@/components/mova-logo";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cara Download YouTube ke MP3 Gratis dan Cepat - Mova",
  description:
    "Tutorial lengkap cara download video YouTube ke MP3 gratis dan cepat di tahun 2026. Perbandingan kualitas audio 128kbps vs 320kbps, langkah-langkah menggunakan Mova, dan pertimbangan hukum.",
  keywords: [
    "download youtube mp3",
    "youtube to mp3",
    "download lagu youtube",
    "youtube mp3 gratis",
    "konverter youtube mp3",
  ],
  openGraph: {
    title: "Cara Download YouTube ke MP3 Gratis dan Cepat - Mova",
    description:
      "Tutorial lengkap cara download video YouTube ke MP3 gratis dan cepat di tahun 2026.",
    url: "https://getmova.my.id/blog/download-youtube-mp3",
    siteName: "Mova",
    type: "article",
  },
};

export default function DownloadYoutubeMp3Page() {
  return (
    <div className="min-h-screen flex flex-col bg-[#09090B] text-[#FAFAFA]">
      {/* JSON-LD Article Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "Cara Download YouTube ke MP3 Gratis dan Cepat",
            description:
              "Tutorial lengkap cara download video YouTube ke MP3 gratis dan cepat. Perbandingan kualitas audio, langkah-langkah menggunakan Mova, dan pertimbangan hukum.",
            author: {
              "@type": "Organization",
              name: "Mova",
            },
            publisher: {
              "@type": "Organization",
              name: "Mova",
              logo: {
                "@type": "ImageObject",
                url: "https://getmova.my.id/mova-logo.png",
              },
            },
            datePublished: "2026-05-20",
            dateModified: "2026-05-20",
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": "https://getmova.my.id/blog/download-youtube-mp3",
            },
          }),
        }}
      />

      {/* Header */}
      <header className="border-b border-[#27272A] bg-[#111113]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <a href="/" className="flex items-center gap-2">
              <MovaLogo size={32} showText />
            </a>
            <a
              href="/blog"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border border-[#27272A] bg-[#111113] text-[#FAFAFA] hover:bg-[#18181B] transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Kembali ke Blog
            </a>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1">
        <article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          {/* Article header */}
          <div className="mb-10">
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-[#FF0000] text-white mb-4">
              YouTube
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#FAFAFA] mb-4 leading-tight">
              Cara Download YouTube ke MP3 Gratis dan Cepat
            </h1>
            <p className="text-[#A1A1AA] text-sm leading-relaxed mb-4">
              Panduan lengkap untuk mengonversi video YouTube menjadi file MP3 berkualitas tinggi menggunakan Mova. Gratis, cepat, dan tanpa batasan.
            </p>
            <div className="flex items-center gap-4 text-xs text-[#A1A1AA]/60">
              <span className="flex items-center gap-1">
                <User className="h-3 w-3" />
                Mova
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                20 Mei 2026
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                6 menit baca
              </span>
            </div>
          </div>

          {/* Article content */}
          <div className="prose-sm space-y-8">
            {/* Introduction */}
            <section>
              <h2 className="text-xl font-bold text-[#FAFAFA] mb-3">Mengapa Download YouTube ke MP3?</h2>
              <p className="text-sm text-[#A1A1AA] leading-relaxed">
                YouTube adalah sumber konten audio terbesar di internet. Dari musik, podcast, audiobook, hingga kuliah online — semuanya tersedia di YouTube. Namun, terkadang kamu hanya membutuhkan audionya tanpa perlu menonton videonya. Di sinilah kebutuhan untuk mengonversi video YouTube ke MP3 muncul.
              </p>
              <p className="text-sm text-[#A1A1AA] leading-relaxed mt-3">
                Ada banyak alasan mengapa orang ingin mengunduh audio dari YouTube: mendengarkan musik offline saat bepergian, menyimpan podcast untuk didengarkan nanti, mengambil audio untuk keperluan belajar, atau mengumpulkan efek suara untuk proyek kreatif. Apapun alasan kamu, Mova menyediakan cara termudah untuk mengekstrak audio dari video YouTube.
              </p>
            </section>

            {/* Step by step */}
            <section>
              <h2 className="text-xl font-bold text-[#FAFAFA] mb-3">Cara Download YouTube ke MP3 dengan Mova</h2>
              <p className="text-sm text-[#A1A1AA] leading-relaxed mb-4">
                Mova menyediakan fitur mode Audio yang memungkinkan kamu mengekstrak audio dari video YouTube dengan sangat mudah. Berikut langkah-langkahnya:
              </p>

              <div className="space-y-4">
                <div className="flex gap-4 p-4 rounded-lg border border-[#27272A] bg-[#111113]">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[#F97316] text-white text-sm font-bold shrink-0">1</div>
                  <div>
                    <h3 className="text-sm font-semibold text-[#FAFAFA] mb-1">Salin Link Video YouTube</h3>
                    <p className="text-xs text-[#A1A1AA] leading-relaxed">Buka YouTube, temukan video yang ingin kamu ekstrak audionya, lalu salin link video dari address bar atau tombol share. Link YouTube bisa dalam format youtube.com/watch?v=... atauyoutu.be/...</p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 rounded-lg border border-[#27272A] bg-[#111113]">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[#F97316] text-white text-sm font-bold shrink-0">2</div>
                  <div>
                    <h3 className="text-sm font-semibold text-[#FAFAFA] mb-1">Buka Mova dan Aktifkan Mode Audio</h3>
                    <p className="text-xs text-[#A1A1AA] leading-relaxed">Buka Mova di getmova.my.id, lalu klik tab &quot;Audio&quot; di bagian atas kolom input. Mode audio akan secara otomatis mengatur Mova untuk mengekstrak audio dari video yang kamu masukkan.</p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 rounded-lg border border-[#27272A] bg-[#111113]">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[#F97316] text-white text-sm font-bold shrink-0">3</div>
                  <div>
                    <h3 className="text-sm font-semibold text-[#FAFAFA] mb-1">Tempel Link dan Download</h3>
                    <p className="text-xs text-[#A1A1AA] leading-relaxed">Tempel link YouTube ke kolom input, lalu klik tombol &quot;Download&quot;. Mova akan memproses video dan menampilkan opsi kualitas audio. Pilih kualitas yang kamu inginkan dan klik download. File MP3 akan otomatis tersimpan di perangkat kamu.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Audio Quality Comparison */}
            <section>
              <h2 className="text-xl font-bold text-[#FAFAFA] mb-3">Perbandingan Kualitas Audio: 128kbps vs 320kbps</h2>
              <p className="text-sm text-[#A1A1AA] leading-relaxed">
                Saat mengunduh audio dari YouTube, kamu mungkin menemukan opsi kualitas yang berbeda. Berikut perbandingan antara bitrate 128kbps dan 320kbps yang umum tersedia:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <div className="p-4 rounded-lg border border-[#27272A] bg-[#111113]">
                  <h3 className="text-sm font-semibold text-[#FAFAFA] mb-2">128kbps</h3>
                  <ul className="space-y-1.5">
                    <li className="text-xs text-[#A1A1AA] flex items-start gap-1.5">
                      <span className="text-[#F97316] shrink-0">&#8226;</span>
                      Ukuran file lebih kecil
                    </li>
                    <li className="text-xs text-[#A1A1AA] flex items-start gap-1.5">
                      <span className="text-[#F97316] shrink-0">&#8226;</span>
                      Cocok untuk mendengarkan di speaker kecil atau earphone biasa
                    </li>
                    <li className="text-xs text-[#A1A1AA] flex items-start gap-1.5">
                      <span className="text-[#F97316] shrink-0">&#8226;</span>
                      Proses download lebih cepat
                    </li>
                    <li className="text-xs text-[#A1A1AA] flex items-start gap-1.5">
                      <span className="text-[#F97316] shrink-0">&#8226;</span>
                      Kualitas cukup untuk kebanyakan keperluan
                    </li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg border border-[#F97316]/30 bg-[#111113]">
                  <h3 className="text-sm font-semibold text-[#F97316] mb-2">320kbps &#9733;</h3>
                  <ul className="space-y-1.5">
                    <li className="text-xs text-[#A1A1AA] flex items-start gap-1.5">
                      <span className="text-[#F97316] shrink-0">&#8226;</span>
                      Kualitas audio terbaik yang tersedia
                    </li>
                    <li className="text-xs text-[#A1A1AA] flex items-start gap-1.5">
                      <span className="text-[#F97316] shrink-0">&#8226;</span>
                      Cocok untuk headphone audiophile dan speaker berkualitas
                    </li>
                    <li className="text-xs text-[#A1A1AA] flex items-start gap-1.5">
                      <span className="text-[#F97316] shrink-0">&#8226;</span>
                      Detail audio lebih jernih dan tajam
                    </li>
                    <li className="text-xs text-[#A1A1AA] flex items-start gap-1.5">
                      <span className="text-[#F97316] shrink-0">&#8226;</span>
                      Ukuran file lebih besar
                    </li>
                  </ul>
                </div>
              </div>

              <p className="text-sm text-[#A1A1AA] leading-relaxed mt-4">
                Perlu diingat bahwa kualitas audio akhir sangat bergantung pada sumber aslinya. Jika video YouTube diunggah dengan audio berkualitas rendah, maka hasil MP3 pun tidak akan lebih baik meskipun kamu memilih bitrate 320kbps. Namun, jika video diunggah dengan audio berkualitas tinggi, memilih 320kbps akan memberikan hasil yang jauh lebih baik.
              </p>
            </section>

            {/* Alternative methods */}
            <section>
              <h2 className="text-xl font-bold text-[#FAFAFA] mb-3">Metode Alternatif Download YouTube MP3</h2>
              <p className="text-sm text-[#A1A1AA] leading-relaxed">
                Selain menggunakan Mova, ada beberapa metode lain yang bisa kamu gunakan untuk mengonversi video YouTube ke MP3. Namun, setiap metode memiliki kelebihan dan kekurangannya masing-masing:
              </p>
              <ul className="space-y-2 mt-3">
                <li className="flex items-start gap-2 text-sm text-[#A1A1AA]">
                  <span className="text-[#F97316] mt-1 shrink-0">&#8226;</span>
                  <span><strong className="text-[#FAFAFA]">YTMP3 dan sejenisnya:</strong> Website konverter YouTube ke MP3 cukup banyak tersedia, namun banyak di antaranya dipenuhi iklan pop-up yang mengganggu dan kadang berisiko malware.</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-[#A1A1AA]">
                  <span className="text-[#F97316] mt-1 shrink-0">&#8226;</span>
                  <span><strong className="text-[#FAFAFA]">Aplikasi desktop:</strong> Software seperti 4K Video Downloader bisa mengekstrak audio dari YouTube, namun memerlukan instalasi dan biasanya memiliki batasan pada versi gratis.</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-[#A1A1AA]">
                  <span className="text-[#F97316] mt-1 shrink-0">&#8226;</span>
                  <span><strong className="text-[#FAFAFA]">YouTube Premium:</strong> Opsi resmi dari YouTube yang memungkinkan download video untuk ditonton offline, namun file tidak bisa diekstrak sebagai MP3 dan memerlukan berlangganan berbayar.</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-[#A1A1AA]">
                  <span className="text-[#F97316] mt-1 shrink-0">&#8226;</span>
                  <span><strong className="text-[#FAFAFA]">Mova:</strong> Solusi terbaik yang gratis, tanpa instalasi, tanpa iklan mengganggu, dan mendukung berbagai platform selain YouTube.</span>
                </li>
              </ul>
            </section>

            {/* Legal considerations */}
            <section>
              <h2 className="text-xl font-bold text-[#FAFAFA] mb-3">Pertimbangan Hukum</h2>
              <p className="text-sm text-[#A1A1AA] leading-relaxed">
                Mengunduh konten dari YouTube memiliki pertimbangan hukum yang perlu diperhatikan. Berikut beberapa poin penting:
              </p>
              <ul className="space-y-2 mt-3">
                <li className="flex items-start gap-2 text-sm text-[#A1A1AA]">
                  <span className="text-[#F97316] mt-1 shrink-0">&#8226;</span>
                  <span><strong className="text-[#FAFAFA]">Ketentuan YouTube:</strong> YouTube Terms of Service secara teknis melarang pengunduhan konten kecuali melalui fitur offline resmi YouTube Premium. Namun, penegakan ketentuan ini bervariasi.</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-[#A1A1AA]">
                  <span className="text-[#F97316] mt-1 shrink-0">&#8226;</span>
                  <span><strong className="text-[#FAFAFA]">Konten berlisensi Creative Commons:</strong> Beberapa kreator mengunggah konten dengan lisensi Creative Commons yang memperbolehkan penggunaan ulang. Cek lisensi sebelum mengunduh.</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-[#A1A1AA]">
                  <span className="text-[#F97316] mt-1 shrink-0">&#8226;</span>
                  <span><strong className="text-[#FAFAFA]">Penggunaan pribadi:</strong> Mengunduh untuk keperluan pribadi seperti mendengarkan musik offline umumnya dianggap penggunaan wajar, meskipun secara teknis bisa melanggar ToS YouTube.</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-[#A1A1AA]">
                  <span className="text-[#F97316] mt-1 shrink-0">&#8226;</span>
                  <span><strong className="text-[#FAFAFA]">Distribusi ulang:</strong> Mendistribusikan file MP3 yang diunduh kepada orang lain tanpa izin merupakan pelanggaran hak cipta yang serius.</span>
                </li>
              </ul>
            </section>

            {/* Conclusion */}
            <section>
              <h2 className="text-xl font-bold text-[#FAFAFA] mb-3">Kesimpulan</h2>
              <p className="text-sm text-[#A1A1AA] leading-relaxed">
                Mengonversi video YouTube ke MP3 menjadi sangat mudah dengan fitur Audio Mode dari Mova. Cukup salin link, tempel di Mova, pilih mode Audio, dan download — semudah itu. Dengan dukungan kualitas audio hingga 320kbps, kamu bisa mendapatkan file MP3 berkualitas tinggi tanpa perlu menginstal aplikasi apapun.
              </p>
              <p className="text-sm text-[#A1A1AA] leading-relaxed mt-3">
                Mova bukan hanya konverter YouTube ke MP3 — kami juga mendukung TikTok, Instagram, Facebook, dan platform lainnya. Semua gratis, cepat, dan tanpa iklan mengganggu. Selalu gunakan konten yang diunduh secara bertanggung jawab dan hargai hak cipta kreator konten.
              </p>

              {/* CTA */}
              <div className="mt-8 p-6 rounded-xl bg-[#111113] border border-[#F97316]/30 text-center">
                <h3 className="text-base font-bold text-[#FAFAFA] mb-2">Coba Download YouTube ke MP3 Sekarang!</h3>
                <p className="text-xs text-[#A1A1AA] mb-4">Gratis, cepat, dan berkualitas tinggi.</p>
                <a
                  href="/"
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold bg-[#F97316] text-white hover:bg-[#EA580C] transition-colors"
                >
                  Coba Mova Sekarang
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </section>
          </div>

          {/* Related posts */}
          <div className="mt-16 pt-8 border-t border-[#27272A]">
            <h3 className="text-sm font-semibold text-[#FAFAFA] mb-4">Artikel Terkait</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a href="/blog/download-tiktok-tanpa-watermark" className="flex items-center justify-between p-4 rounded-lg border border-[#27272A] bg-[#111113] hover:border-[#F97316]/50 transition-colors group">
                <span className="text-sm text-[#A1A1AA] group-hover:text-[#FAFAFA]">Download TikTok Tanpa Watermark</span>
                <ArrowRight className="h-4 w-4 text-[#A1A1AA] group-hover:text-[#F97316] transition-colors" />
              </a>
              <a href="/blog/download-instagram-reels" className="flex items-center justify-between p-4 rounded-lg border border-[#27272A] bg-[#111113] hover:border-[#F97316]/50 transition-colors group">
                <span className="text-sm text-[#A1A1AA] group-hover:text-[#FAFAFA]">Download Instagram Reels</span>
                <ArrowRight className="h-4 w-4 text-[#A1A1AA] group-hover:text-[#F97316] transition-colors" />
              </a>
            </div>
          </div>

          {/* Back to blog */}
          <div className="mt-8 text-center">
            <a href="/blog" className="inline-flex items-center gap-2 text-sm text-[#F97316] hover:underline">
              <ArrowLeft className="h-4 w-4" />
              Kembali ke Blog
            </a>
          </div>

          {/* Footer notice */}
          <div className="mt-8 pt-6 border-t border-[#27272A] text-center">
            <p className="text-xs text-[#A1A1AA]">
              &copy; 2026 Mova. All rights reserved.
            </p>
          </div>
        </article>
      </main>
    </div>
  );
}

import type { Metadata } from "next";
import { BlogArticleLayout } from "@/components/blog/blog-article-layout";

export const metadata: Metadata = {
  title: "Cara Download Video Twitter X (Twitter) Gratis 2026 - Mova",
  description: "Panduan lengkap cara download video dari Twitter/X gratis di tahun 2026. Simpan video tweet favorit kamu dengan Mova.",
  keywords: [
    "download video twitter x",
    "cara download video twitter",
    "twitter video downloader",
    "download video x",
    "simpan video twitter",
  ],
  alternates: { canonical: "https://getmova.my.id/blog/download-video-twitter-x" },
  openGraph: {
    title: "Cara Download Video Twitter X (Twitter) Gratis 2026 - Mova",
    description: "Panduan lengkap cara download video dari Twitter/X gratis di tahun 2026.",
    url: "https://getmova.my.id/blog/download-video-twitter-x",
    siteName: "Mova",
    type: "article",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Cara Download Video Twitter X (Twitter) Gratis 2026",
  description: "Panduan lengkap cara download video dari Twitter/X gratis di tahun 2026. Simpan video tweet favorit kamu dengan Mova.",
  author: { "@type": "Organization", name: "Mova" },
  publisher: { "@type": "Organization", name: "Mova", logo: { "@type": "ImageObject", url: "https://getmova.my.id/mova-logo.png" } },
  datePublished: "2026-05-08",
  dateModified: "2026-05-08",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://getmova.my.id/blog/download-video-twitter-x" },
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "Cara Download Video Twitter/X",
  description: "Panduan lengkap cara mengunduh video dari Twitter/X dengan mudah dan gratis menggunakan Mova.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Temukan Tweet dengan Video",
      text: "Buka Twitter/X dan cari tweet yang berisi video yang ingin kamu download. Video bisa berupa video biasa, GIF animasi, atau video dalam thread.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Salin Link Tweet",
      text: "Klik ikon \"Bagikan\" (panah keluar dari kotak) di bawah tweet, lalu pilih \"Salin tautan\" atau \"Copy link\". Link tweet akan tersalin ke clipboard.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Tempel di Mova dan Download",
      text: "Buka getmova.my.id, tempel link tweet di kolom input, klik Download. Mova akan memproses video dan menyediakan link download.",
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Apakah Mova mendukung domain twitter.com dan x.com?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ya, Mova mendukung kedua domain — twitter.com dan x.com. Kamu bisa memasukkan link dari domain manapun dan Mova akan memproses video-nya."
      }
    },
    {
      "@type": "Question",
      "name": "Apakah bisa download video dari tweet akun privat?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Tidak, hanya video dari tweet publik yang bisa diunduh. Video dari akun privat tidak dapat diakses oleh Mova karena dibatasi oleh pengaturan privasi Twitter/X."
      }
    },
    {
      "@type": "Question",
      "name": "Format video apa yang dihasilkan saat download dari Twitter/X?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Video dari Twitter/X akan tersimpan dalam format MP4 yang kompatibel dengan semua perangkat dan bisa diputar di aplikasi video manapun."
      }
    }
  ]
};

const relatedArticles = [
  {
    slug: "download-video-facebook-hd",
    title: "Download Video Facebook HD",
    description: "Cara download video Facebook dalam kualitas HD secara gratis.",
  },
  {
    slug: "download-video-tanpa-aplikasi",
    title: "Download Video Tanpa Aplikasi",
    description: "Panduan download video tanpa install aplikasi tambahan.",
  },
];

const headings = [
  { id: "section-1", text: "Twitter/X dan Konten Video" },
  { id: "section-2", text: "Perbedaan Twitter dan X" },
  { id: "section-3", text: "Cara Download Video Twitter/X dengan Mova" },
  { id: "section-4", text: "Tips untuk Hasil Download Terbaik" },
  { id: "section-5", text: "Kesimpulan" },
];

export default function DownloadTwitterXPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <BlogArticleLayout
        title="Cara Download Video Twitter X (Twitter) Gratis 2026"
        slug="download-video-twitter-x"
        description="Panduan lengkap untuk mengunduh video dari Twitter/X dengan mudah dan gratis menggunakan Mova."
        date="8 Mei 2026"
        readingTime="5 menit baca"
        jsonLd={jsonLd}
        relatedArticles={relatedArticles}
        headings={headings}
      >
        <h2 id="section-1">Twitter/X dan Konten Video</h2>
        <p>
          Twitter, yang sekarang dikenal sebagai X, telah bertransformasi dari platform microblogging menjadi platform yang kaya akan konten multimedia. Setiap hari, jutaan video dibagikan di Twitter/X — mulai dari cuplikan berita, momen olahraga, hingga konten kreatif dari kreator. Namun, berbeda dengan foto yang bisa disimpan langsung, Twitter/X tidak menyediakan tombol download bawaan untuk video.
        </p>
        <p>
          Inilah mengapa tools seperti Mova menjadi sangat penting. Dengan Mova, kamu bisa mengunduh video dari tweet manapun selama tweet tersebut bersifat publik. Prosesnya sangat sederhana dan tidak memerlukan install aplikasi apapun.
        </p>

        <h2 id="section-2">Perbedaan Twitter dan X</h2>
        <p>
          Sejak diakuisisi oleh Elon Musk pada tahun 2022, Twitter mengalami rebranding besar-besaran dan berganti nama menjadi X. Perubahan ini tidak hanya pada nama dan logo, tetapi juga pada domain. Awalnya twitter.com, kini platform ini juga bisa diakses melalui x.com.
        </p>
        <p>
          Yang penting untuk diketahui, Mova mendukung kedua domain ini. Baik link dari twitter.com maupun x.com bisa diproses dengan lancar. Jadi kamu tidak perlu khawatir tentang kompatibilitas — cukup salin link dari manapun dan tempel di Mova.
        </p>

        <div className="info-box">
          <p>
            💡 <strong>Tips:</strong> Mova mendukung kedua domain twitter.com dan x.com. Cukup salin link dari manapun dan tempel di Mova!
          </p>
        </div>

        <h2 id="section-3">Cara Download Video Twitter/X dengan Mova</h2>

        <div className="step-card">
          <p>
            <span className="step-number">1</span>
            <strong>Temukan Tweet dengan Video</strong> — Buka Twitter/X dan cari tweet yang berisi video yang ingin kamu download. Video bisa berupa video biasa, GIF animasi, atau video dalam thread.
          </p>
        </div>

        <div className="step-card">
          <p>
            <span className="step-number">2</span>
            <strong>Salin Link Tweet</strong> — Klik ikon &quot;Bagikan&quot; (panah keluar dari kotak) di bawah tweet, lalu pilih &quot;Salin tautan&quot; atau &quot;Copy link&quot;. Link tweet akan tersalin ke clipboard.
          </p>
        </div>

        <div className="step-card">
          <p>
            <span className="step-number">3</span>
            <strong>Tempel di Mova dan Download</strong> — Buka getmova.my.id, tempel link tweet di kolom input, klik Download. Mova akan memproses video dan menyediakan link download.
          </p>
        </div>

        <h2 id="section-4">Tips untuk Hasil Download Terbaik</h2>
        <ul>
          <li><strong>Pastikan tweet bersifat publik:</strong> Hanya video dari tweet publik yang bisa diunduh. Tweet dari akun privat tidak bisa diakses oleh Mova.</li>
          <li><strong>Gunakan link tweet yang benar:</strong> Pastikan link yang kamu salin adalah link tweet itu sendiri, bukan link profil atau link ke halaman lain.</li>
          <li><strong>Periksa kualitas video asli:</strong> Kualitas video yang diunduh tergantung pada kualitas video asli yang diunggah. Jika video asli berkualitas rendah, hasil download juga akan rendah.</li>
          <li><strong>Coba download ulang jika gagal:</strong> Jika download gagal di percobaan pertama, coba lagi. Terkadang server Twitter/X sedang sibuk dan perlu beberapa saat untuk memproses.</li>
        </ul>

        <h2 id="section-5">Kesimpulan</h2>
        <p>
          Download video dari Twitter/X kini menjadi sangat mudah berkat Mova. Dengan tiga langkah sederhana — salin link tweet, tempel di Mova, dan download — kamu bisa menyimpan video tweet favorit langsung ke perangkat. Mova mendukung kedua domain (twitter.com dan x.com), gratis, dan tidak memerlukan install aplikasi apapun.
        </p>
      </BlogArticleLayout>
    </>
  );
}

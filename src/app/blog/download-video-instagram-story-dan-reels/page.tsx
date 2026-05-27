import type { Metadata } from "next";
import { BlogArticleLayout } from "@/components/blog/blog-article-layout";

export const metadata: Metadata = {
  title: "Download Video Instagram Story dan Reels Tanpa Aplikasi | Mova Blog",
  description: "Cara download video Instagram Story dan Reels tanpa aplikasi tambahan. Simpan Story dan Reels IG langsung ke galeri HP dengan mudah menggunakan Mova.",
  keywords: ["download instagram story", "instagram reels downloader", "download story ig", "cara download story instagram", "download reels ig tanpa aplikasi"],
  alternates: { canonical: "https://getmova.my.id/blog/download-video-instagram-story-dan-reels" },
  openGraph: {
    title: "Download Video Instagram Story dan Reels Tanpa Aplikasi | Mova Blog",
    description: "Cara download video Instagram Story dan Reels tanpa aplikasi tambahan. Simpan Story dan Reels IG langsung ke galeri HP dengan mudah menggunakan Mova.",
    url: "https://getmova.my.id/blog/download-video-instagram-story-dan-reels",
    siteName: "Mova",
    type: "article",
    publishedTime: "2026-05-26",
    modifiedTime: "2026-05-26",
    authors: ["Mova"],
  },
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Download Video Instagram Story dan Reels Tanpa Aplikasi",
  description: "Cara download video Instagram Story dan Reels tanpa aplikasi tambahan. Simpan Story dan Reels IG langsung ke galeri HP dengan mudah menggunakan Mova.",
  url: "https://getmova.my.id/blog/download-video-instagram-story-dan-reels",
  datePublished: "2026-05-26",
  dateModified: "2026-05-26",
  author: { "@type": "Organization", name: "Mova" },
  publisher: {
    "@type": "Organization",
    name: "Mova",
    logo: { "@type": "ImageObject", url: "https://getmova.my.id/mova-logo.png" },
  },
  mainEntityOfPage: "https://getmova.my.id/blog/download-video-instagram-story-dan-reels",
};

const howToReelsJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "Cara Download Instagram Reels dengan Mova",
  description: "Download Reels jauh lebih mudah karena setiap Reels punya URL yang bisa di-copy. Berikut langkah-langkahnya menggunakan Mova.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Buka Instagram dan cari Reels",
      text: "Buka tab Reels di Instagram, cari video yang ingin kamu download. Tap ikon tiga titik di pojok kanan bawah, lalu pilih \"Link\" atau \"Salin tautan\".",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Buka Mova di browser",
      text: "Kunjungi getmova.my.id dari browser HP atau laptop kamu.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Paste link Reels dan download",
      text: "Tempel link Reels ke kolom input Mova, klik Download, pilih kualitas yang kamu mau, dan video langsung tersimpan di galeri!",
    },
  ],
};

const howToStoryJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "Cara Download Instagram Story dengan Mova",
  description: "Download Story sedikit lebih tricky karena Story nggak punya URL yang bisa langsung di-copy. Tapi ada cara mudahnya menggunakan Mova.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Copy username Instagram",
      text: "Buka profil Instagram orang yang Story-nya ingin kamu download. Copy username mereka (tanpa tanda @).",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Masukkan username ke Mova",
      text: "Buka Mova, masukkan username Instagram ke kolom input, lalu klik Download. Mova akan mendeteksi Story yang sedang aktif dari akun tersebut.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Pilih Story dan download",
      text: "Mova akan menampilkan daftar Story yang sedang aktif. Pilih Story yang ingin kamu simpan, lalu klik download. Selesai!",
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Apakah bisa download Instagram Story tanpa aplikasi?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ya, kamu bisa download Instagram Story tanpa install aplikasi apapun menggunakan Mova. Cukup masukkan username Instagram ke kolom input di getmova.my.id dan Mova akan menampilkan Story yang sedang aktif."
      }
    },
    {
      "@type": "Question",
      "name": "Berapa lama Story Instagram bisa didownload?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Story Instagram hanya bertahan 24 jam setelah diposting. Kamu harus segera download sebelum Story-nya hilang. Setelah 24 jam, Story tidak bisa diakses lagi kecuali disimpan sebagai Highlight."
      }
    },
    {
      "@type": "Question",
      "name": "Apakah Mova bisa download Story dari akun privat?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Tidak, Mova hanya bisa mengakses Story dan Reels dari akun Instagram yang bersifat publik. Akun private tidak bisa di-download karena dibatasi oleh pengaturan privasi Instagram."
      }
    }
  ]
};

const headings = [
  { id: "perbedaan-instagram-story-dan-reels", text: "Perbedaan Instagram Story dan Reels" },
  { id: "cara-download-instagram-reels-dengan-mova", text: "Cara Download Instagram Reels dengan Mova" },
  { id: "cara-download-instagram-story-dengan-mova", text: "Cara Download Instagram Story dengan Mova" },
  { id: "kenapa-nggak-perlu-aplikasi-tambahan", text: "Kenapa Nggak Perlu Aplikasi Tambahan?" },
  { id: "hal-yang-perlu-diperhatikan", text: "Hal yang Perlu Diperhatikan Saat Download Story & Reels" },
  { id: "kenapa-mova-pilihan-terbaik-untuk-download-instagram", text: "Kenapa Mova Pilihan Terbaik untuk Download Instagram?" },
];

const relatedArticles = [
  { slug: "download-video-tanpa-watermark-terbaik", title: "10 Situs Download Video Tanpa Watermark Terbaik 2026", description: "Perbandingan situs downloader terbaik." },
  { slug: "perbandingan-tiktok-downloader", title: "Perbandingan TikTok Downloader Terbaik 2026", description: "Mana TikTok downloader yang paling bagus?" },
  { slug: "cara-download-video-pinterest", title: "Cara Download Video Pinterest ke Galeri HP", description: "Panduan download video Pinterest dengan mudah." },
  { slug: "cara-download-video-dari-telegram", title: "Cara Download Video dari Telegram dengan Cepat", description: "Panduan download video Telegram ke galeri HP." },
];

export default function DownloadVideoInstagramStoryDanReels() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToReelsJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToStoryJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <BlogArticleLayout
        title="Download Video Instagram Story dan Reels Tanpa Aplikasi"
        slug="download-video-instagram-story-dan-reels"
        description="Instagram Story dan Reels sering banget berisi konten menarik yang pengen kita simpan. Tapi Instagram nggak kasih tombol download buat kedua fitur itu. Tenang, di artikel ini kita bakal bahas cara download video Instagram Story dan Reels tanpa install aplikasi apapun — cukup pakai browser dan Mova."
        date="26 Mei 2026"
        readingTime="6 menit baca"
        jsonLd={articleJsonLd}
        headings={headings}
        relatedArticles={relatedArticles}
      >
        <h2 id="perbedaan-instagram-story-dan-reels">Perbedaan Instagram Story dan Reels</h2>
        <p>Sebelum masuk ke tutorial, penting untuk memahami perbedaan antara Story dan Reels, karena cara mendownloadnya sedikit berbeda:</p>
        <ul>
          <li><strong>Instagram Story</strong> — Video pendek maksimal 60 detik yang muncul di bagian atas feed. Story otomatis hilang setelah 24 jam, sehingga makin penting untuk segera disimpan kalau ada yang menarik.</li>
          <li><strong>Instagram Reels</strong> — Video pendek (15–90 detik) yang mirip TikTok, tersedia di tab Reels dan bisa diakses kapan saja. Reels punya URL permanen yang bisa di-copy.</li>
        </ul>

        <h2 id="cara-download-instagram-reels-dengan-mova">Cara Download Instagram Reels dengan Mova</h2>
        <p>Download Reels jauh lebih mudah karena setiap Reels punya URL yang bisa di-copy. Berikut langkah-langkahnya menggunakan <a href="/">Mova</a>:</p>
        <div className="step-card"><p><span className="step-number">1</span><strong>Buka Instagram dan cari Reels</strong> — Buka tab Reels di Instagram, cari video yang ingin kamu download. Tap ikon tiga titik di pojok kanan bawah, lalu pilih &quot;Link&quot; atau &quot;Salin tautan&quot;.</p></div>
        <div className="step-card"><p><span className="step-number">2</span><strong>Buka Mova di browser</strong> — Kunjungi <a href="/">getmova.my.id</a> dari browser HP atau laptop kamu.</p></div>
        <div className="step-card"><p><span className="step-number">3</span><strong>Paste link Reels dan download</strong> — Tempel link Reels ke kolom input Mova, klik Download, pilih kualitas yang kamu mau, dan video langsung tersimpan di galeri!</p></div>

        <h2 id="cara-download-instagram-story-dengan-mova">Cara Download Instagram Story dengan Mova</h2>
        <p>Download Story sedikit lebih tricky karena Story nggak punya URL yang bisa langsung di-copy dari aplikasi Instagram. Tapi jangan khawatir, ada cara mudahnya:</p>
        <div className="step-card"><p><span className="step-number">1</span><strong>Copy username Instagram</strong> — Buka profil Instagram orang yang Story-nya ingin kamu download. Copy username mereka (tanpa tanda @).</p></div>
        <div className="step-card"><p><span className="step-number">2</span><strong>Masukkan username ke Mova</strong> — Buka <a href="/">Mova</a>, masukkan username Instagram ke kolom input, lalu klik Download. Mova akan mendeteksi Story yang sedang aktif dari akun tersebut.</p></div>
        <div className="step-card"><p><span className="step-number">3</span><strong>Pilih Story dan download</strong> — Mova akan menampilkan daftar Story yang sedang aktif. Pilih Story yang ingin kamu simpan, lalu klik download. Selesai!</p></div>

        <div className="info-box">
          <p><strong>Tips Penting:</strong> Story Instagram hanya bertahan 24 jam. Kalau kamu mau download Story seseorang, lakukan sebelum Story-nya hilang. Setelah 24 jam, Story nggak bisa diakses lagi kecuali disimpan sebagai Highlight.</p>
        </div>

        <h2 id="kenapa-nggak-perlu-aplikasi-tambahan">Kenapa Nggak Perlu Aplikasi Tambahan?</h2>
        <p>Banyak orang yang masih mengira harus install aplikasi khusus untuk download Story dan Reels Instagram. Padahal, menggunakan tool online seperti Mova jauh lebih praktis:</p>
        <ul>
          <li><strong>Nggak makan ruang penyimpanan</strong> — Aplikasi downloader bisa berukuran 20–50 MB. Tool online nggak perlu di-install sama sekali.</li>
          <li><strong>Lebih aman</strong> — Aplikasi pihak ketiga sering meminta permission yang nggak perlu dan bisa mengandung malware. Tool online di browser jauh lebih aman.</li>
          <li><strong>Selalu up-to-date</strong> — Tool online otomatis mengikuti perubahan API Instagram. Aplikasi harus di-update manual dan sering nggak kompatibel setelah update Instagram.</li>
          <li><strong>Bisa dipakai di semua perangkat</strong> — Mova bisa diakses dari Android, iPhone, iPad, laptop, dan PC. Nggak terbatas pada satu OS.</li>
        </ul>

        <h2 id="hal-yang-perlu-diperhatikan">Hal yang Perlu Diperhatikan Saat Download Story & Reels</h2>
        <ul>
          <li><strong>Akun harus publik</strong> — Mova hanya bisa mengakses Story dan Reels dari akun Instagram yang bersifat publik. Akun private tidak bisa di-download.</li>
          <li><strong>Story bertahan 24 jam</strong> — Buruan download sebelum Story-nya hilang. Setelah 24 jam, konten sudah nggak bisa diakses.</li>
          <li><strong>Hormati privasi</strong> — Nggak semua orang senang kalau konten Story-nya di-download tanpa izin. Gunakan secara bertanggung jawab.</li>
          <li><strong>Jangan repost tanpa izin</strong> — Download untuk penggunaan pribadi saja. Repost konten orang lain tanpa kredit bisa melanggar hak cipta.</li>
        </ul>

        <h2 id="kenapa-mova-pilihan-terbaik-untuk-download-instagram">Kenapa Mova Pilihan Terbaik untuk Download Instagram?</h2>
        <p>Dari semua tool yang ada, <a href="/">Mova</a> adalah pilihan paling lengkap untuk download konten Instagram. Bukan cuma Story dan Reels, Mova juga bisa download foto, video feed, dan IGTV. Selain itu, Mova juga mendukung <a href="/tiktok-downloader">download TikTok</a>, <a href="/youtube-downloader">YouTube</a>, dan platform lainnya. Semua dalam satu situs, tanpa perlu install apapun, dan 100% gratis.</p>
        <p>Untuk informasi lebih lanjut, kamu juga bisa membaca panduan <a href="/blog/download-video-tanpa-watermark-terbaik">situs download video terbaik</a> dan <a href="/blog/cara-download-video-pinterest">cara download video Pinterest</a> di blog kami. Jangan lupa juga untuk membaca <a href="/privacy">kebijakan privasi</a> kami.</p>
      </BlogArticleLayout>
    </>
  );
}

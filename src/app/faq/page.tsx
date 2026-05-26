import type { Metadata } from "next";
import {
  Home,
  HelpCircle,
  Download,
  Shield,
  Zap,
  Smartphone,
  Globe,
  ChevronRight,
  Lock,
  Film,
  Music,
  CreditCard,
  FileText,
  AlertCircle,
  ExternalLink,
} from "lucide-react";
import { MovaLogo } from "@/components/mova-logo";

export const metadata: Metadata = {
  title: "FAQ - Pertanyaan yang Sering Diajukan | Mova",
  description:
    "Temukan jawaban dari pertanyaan umum tentang Mova - download video tanpa watermark gratis dari TikTok, Instagram, YouTube, Facebook, dan Twitter/X.",
  alternates: { canonical: "https://getmova.my.id/faq" },
  keywords: [
    "FAQ mova",
    "pertanyaan umum mova",
    "cara download video",
    "download video tanpa watermark",
    "tiktok downloader FAQ",
    "instagram downloader FAQ",
  ],
  openGraph: {
    title: "FAQ - Pertanyaan yang Sering Diajukan | Mova",
    description:
      "Temukan jawaban dari pertanyaan umum tentang Mova - download video tanpa watermark gratis.",
    url: "https://getmova.my.id/faq",
    siteName: "Mova",
    type: "website",
  },
};

const faqCategories = [
  {
    title: "Tentang Mova",
    icon: HelpCircle,
    items: [
      {
        question: "Apa itu Mova?",
        answer:
          "Mova adalah layanan download video tanpa watermark yang gratis dan cepat. Mova mendukung berbagai platform populer seperti TikTok, Instagram, YouTube, Facebook, Twitter/X, Pinterest, dan Reddit. Kami membangun Mova agar Anda bisa menyimpan video favorit dengan mudah tanpa watermark yang mengganggu, tanpa perlu mendaftar, dan tanpa biaya apapun.",
      },
      {
        question: "Apakah Mova benar-benar gratis?",
        answer:
          "Ya, Mova 100% gratis tanpa biaya tersembunyi. Kami mendapatkan pendapatan dari iklan yang ditampilkan di website untuk menutupi biaya operasional server. Anda bisa download video sepuasnya tanpa perlu membayar apapun. Tidak ada fitur premium, tidak ada langganan, dan tidak ada batasan jumlah download.",
      },
      {
        question: "Apakah Mova aman digunakan?",
        answer:
          "Sangat aman! Mova diproses melalui koneksi HTTPS yang terenkripsi. Kami tidak menyimpan data pribadi Anda, tidak meminta Anda untuk mendaftar atau login, dan tidak menyimpan riwayat download Anda di server kami. Semua proses download dilakukan langsung dari platform sumber, jadi konten tidak pernah melewati atau disimpan di infrastruktur kami. Kami juga tidak menginstal malware, virus, atau software berbahaya apapun.",
      },
      {
        question: "Siapa yang membuat Mova?",
        answer:
          "Mova dikembangkan oleh tim kecil developer dari Indonesia yang bersemangat tentang teknologi dan privasi digital. Kami percaya bahwa mengunduh video seharusnya sederhana, aman, dan gratis. Untuk informasi lebih lanjut, kunjungi halaman Tentang Kami.",
      },
    ],
  },
  {
    title: "Download Video",
    icon: Download,
    items: [
      {
        question: "Bagaimana cara download video menggunakan Mova?",
        answer:
          "Cara menggunakan Mova sangat mudah, hanya 3 langkah: (1) Salin link URL video dari platform media sosial (TikTok, Instagram, YouTube, dll.), (2) Tempelkan link tersebut di kolom input di halaman utama Mova, (3) Klik tombol Download dan pilih kualitas video yang Anda inginkan. Video akan langsung terdownload ke perangkat Anda.",
      },
      {
        question: "Platform apa saja yang didukung Mova?",
        answer:
          "Mova saat ini mendukung download video dari platform berikut: TikTok (video tanpa watermark), Instagram (Reels, Post, Story), YouTube (video dan audio MP3), Facebook (video publik), Twitter/X (video dan GIF), Pinterest (video dan gambar), dan Reddit (video dengan audio). Kami terus menambahkan dukungan untuk platform baru berdasarkan permintaan pengguna.",
      },
      {
        question: "Apakah ada batasan jumlah download?",
        answer:
          "Tidak ada batasan! Anda bisa mendownload video sebanyak yang Anda mau tanpa batas harian, mingguan, atau bulanan. Mova dirancang untuk memberikan kebebasan penuh kepada pengguna dalam mengunduh konten dari platform yang didukung.",
      },
      {
        question: "Kenapa video saya gagal didownload?",
        answer:
          "Ada beberapa alasan mengapa video mungkin gagal didownload: (1) Link video tidak valid atau rusak — pastikan Anda menyalin link yang lengkap, (2) Video bersifat private atau hanya bisa dilihat oleh followers — Mova hanya bisa memproses video publik, (3) Video dibatasi berdasarkan region — beberapa konten mungkin tidak tersedia di lokasi Anda, (4) Platform melakukan perubahan pada sistem mereka — coba lagi beberapa saat kemudian. Jika masalah berlanjut, hubungi kami melalui halaman kontak.",
      },
      {
        question: "Apakah kualitas video berkurang saat download?",
        answer:
          "Tidak, Mova mempertahankan kualitas asli video. Anda bisa memilih resolusi yang tersedia dari video aslinya, termasuk HD 1080p atau bahkan 4K jika tersedia di platform sumber. Mova tidak melakukan kompresi atau konversi yang menurunkan kualitas video.",
      },
    ],
  },
  {
    title: "Audio & MP3",
    icon: Music,
    items: [
      {
        question: "Apakah Mova bisa ekstrak audio MP3 dari video?",
        answer:
          "Ya! Mova memiliki fitur ekstrak audio MP3 yang memungkinkan Anda mengekstrak audio dari video YouTube, TikTok, Instagram, dan platform lainnya. Cukup ganti ke tab 'Audio' di halaman utama, tempel link video, dan klik Download. Anda akan mendapatkan file MP3 berkualitas tinggi.",
      },
      {
        question: "Berapa kualitas audio MP3 yang dihasilkan?",
        answer:
          "Kualitas audio MP3 yang dihasilkan Mova bervariasi tergantung pada kualitas audio asli dari video. Umumnya, Mova menyediakan audio dengan bitrate 128kbps hingga 320kbps, yang setara dengan kualitas audio streaming terbaik. Semakin tinggi kualitas audio asli, semakin baik hasilnya.",
      },
    ],
  },
  {
    title: "Privasi & Keamanan",
    icon: Shield,
    items: [
      {
        question: "Apakah Mova menyimpan data pribadi saya?",
        answer:
          "Tidak. Mova tidak mengumpulkan, menyimpan, atau memproses data pribadi Anda. Kami tidak mewajibkan registrasi atau login. Data riwayat download dan bookmark disimpan secara lokal di browser Anda (localStorage) dan tidak pernah dikirim ke server kami. Anda bisa menghapus data ini kapan saja melalui pengaturan browser atau fitur 'Hapus Semua' di aplikasi.",
      },
      {
        question: "Apakah Mova menggunakan cookie?",
        answer:
          "Mova menggunakan cookie secara minimal. Cookie esensial digunakan untuk mengingat preferensi Anda (seperti tema dan bahasa). Kami juga menggunakan Google AdSense yang mungkin menggunakan cookie untuk menampilkan iklan yang relevan. Anda dapat mengelola preferensi cookie melalui banner cookie consent yang muncul saat pertama kali mengunjungi website kami. Untuk informasi lengkap, baca Kebijakan Privasi kami.",
      },
      {
        question: "Apakah download saya dilacak?",
        answer:
          "Tidak, Mova tidak melacak riwayat download Anda di server kami. Riwayat download yang Anda lihat di aplikasi disimpan secara lokal di perangkat Anda dan tidak pernah dikirim ke server kami. Google Analytics yang kami gunakan hanya mengumpulkan data agregat dan anonim (seperti jumlah pengunjung dan halaman yang dikunjungi), bukan data individual yang bisa mengidentifikasi Anda.",
      },
    ],
  },
  {
    title: "Hak Cipta & Legal",
    icon: FileText,
    items: [
      {
        question: "Apakah download video dari media sosial legal?",
        answer:
          "Mendownload video untuk keperluan pribadi (seperti tontonan offline) umumnya diperbolehkan di banyak yurisdiksi. Namun, mendistribusikan ulang, menjual, atau menggunakan konten secara komersial tanpa izin dari pemilik hak cipta merupakan pelanggaran hukum. Mova mendukung prinsip penggunaan wajar (fair use) dan mendorong pengguna untuk selalu menghormati hak kekayaan intelektual kreator konten.",
      },
      {
        question: "Apakah Mova menyimpan video yang diunduh?",
        answer:
          "Tidak, Mova tidak menyimpan video apapun di server kami. Semua proses download dilakukan langsung dari server platform sumber (TikTok, Instagram, YouTube, dll.). Mova hanya berfungsi sebagai perantara teknis yang memfasilitasi akses terhadap konten yang sudah tersedia secara publik. Ini berarti konten tidak pernah melewati atau disimpan di infrastruktur kami.",
      },
      {
        question: "Bagaimana cara melaporkan pelanggaran hak cipta?",
        answer:
          "Jika Anda adalah pemilik hak cipta dan meyakini bahwa konten Anda diakses melalui Mova secara melanggar hak Anda, Anda dapat mengirimkan DMCA takedown notice ke admin@getmova.my.id. Untuk detail lengkap tentang prosedur pelaporan, silakan kunjungi halaman DMCA kami.",
      },
    ],
  },
  {
    title: "Teknis & Perangkat",
    icon: Smartphone,
    items: [
      {
        question: "Apakah Mova bisa digunakan di HP?",
        answer:
          "Ya, Mova dirancang untuk bekerja dengan baik di semua perangkat termasuk smartphone (Android dan iPhone), tablet, laptop, dan desktop. Website kami menggunakan desain responsif yang menyesuaikan tampilan dengan ukuran layar perangkat Anda. Tidak perlu menginstal aplikasi apapun — cukup buka browser dan kunjungi getmova.my.id.",
      },
      {
        question: "Browser apa yang didukung Mova?",
        answer:
          "Mova mendukung semua browser modern termasuk Google Chrome, Mozilla Firefox, Safari, Microsoft Edge, Opera, dan Samsung Internet. Untuk pengalaman terbaik, kami merekomendasikan menggunakan versi terbaru dari browser Anda.",
      },
      {
        question: "Kenapa file tidak otomatis terdownload setelah klik tombol?",
        answer:
          "Beberapa browser (terutama di perangkat mobile) mungkin membuka video di tab baru alih-alih langsung mendownloadnya. Jika ini terjadi, coba tahan/tap lama pada tombol download dan pilih 'Download link' atau 'Save link as...'. Alternatifnya, gunakan browser Chrome atau Firefox yang biasanya mendownload file secara otomatis.",
      },
    ],
  },
];

export default function FAQPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqCategories.flatMap((category) =>
      category.items.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      }))
    ),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://getmova.my.id",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "FAQ",
        item: "https://getmova.my.id/faq",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div className="min-h-screen flex flex-col bg-[#09090B] text-[#FAFAFA]">
        {/* Header */}
        <header className="border-b border-[#27272A] bg-[#111113]">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <a href="/" className="flex items-center gap-2">
                <MovaLogo size={32} showText />
              </a>
              <a
                href="/"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border border-[#27272A] bg-[#111113] text-[#FAFAFA] hover:bg-[#18181B] transition-colors"
              >
                <Home className="h-4 w-4" />
                Beranda
              </a>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex items-center gap-1.5 text-sm text-[#A1A1AA]">
                <li>
                  <a href="/" className="hover:text-[#4F46E5] transition-colors">
                    Beranda
                  </a>
                </li>
                <li>
                  <ChevronRight className="h-3.5 w-3.5" />
                </li>
                <li className="text-[#4F46E5] font-medium">FAQ</li>
              </ol>
            </nav>

            {/* Title section */}
            <div className="text-center mb-16">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium tracking-wider uppercase border border-[#27272A] text-[#A1A1AA] mb-6">
                <HelpCircle className="h-3 w-3 text-[#4F46E5]" />
                FAQ
              </span>
              <h1
                className="text-4xl sm:text-5xl font-light tracking-tight text-[#FAFAFA] mb-4 mt-4"
                style={{ fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif" }}
              >
                Pertanyaan yang{" "}
                <span className="font-bold text-[#4F46E5]">Sering Diajukan</span>
              </h1>
              <p className="text-[#A1A1AA] text-sm max-w-2xl mx-auto leading-relaxed">
                Temukan jawaban dari pertanyaan umum tentang Mova. Jika pertanyaan Anda tidak tercantum di sini, silakan hubungi kami melalui halaman kontak.
              </p>
            </div>

            {/* FAQ Categories */}
            <div className="space-y-12">
              {faqCategories.map((category, catIndex) => (
                <section key={catIndex}>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-[#111113] border border-[#27272A]">
                      <category.icon className="h-5 w-5 text-[#4F46E5]" />
                    </div>
                    <h2
                      className="text-xl font-bold text-[#FAFAFA]"
                      style={{ fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif" }}
                    >
                      {category.title}
                    </h2>
                  </div>

                  <div className="space-y-4 ml-0 md:ml-14">
                    {category.items.map((item, itemIndex) => (
                      <details
                        key={itemIndex}
                        className="group rounded-xl bg-[#111113] border border-[#27272A] overflow-hidden"
                      >
                        <summary className="flex items-center gap-3 p-4 cursor-pointer list-none hover:bg-[#18181B] transition-colors">
                          <HelpCircle className="h-4 w-4 text-[#4F46E5] shrink-0" />
                          <span className="text-sm font-semibold text-[#FAFAFA] flex-1">
                            {item.question}
                          </span>
                          <ChevronRight className="h-4 w-4 text-[#A1A1AA] transition-transform group-open:rotate-90 shrink-0" />
                        </summary>
                        <div className="px-4 pb-4 pt-0 ml-7">
                          <p className="text-sm text-[#A1A1AA] leading-relaxed">
                            {item.answer}
                          </p>
                        </div>
                      </details>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            {/* Still have questions */}
            <div className="mt-16 p-6 sm:p-8 rounded-xl bg-gradient-to-br from-[#111113] to-[#0F0F11] border border-[#27272A] text-center">
              <AlertCircle className="h-8 w-8 text-[#4F46E5] mx-auto mb-4" />
              <h3
                className="text-lg font-bold text-[#FAFAFA] mb-2"
                style={{ fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif" }}
              >
                Masih Punya Pertanyaan?
              </h3>
              <p className="text-sm text-[#A1A1AA] max-w-md mx-auto mb-6 leading-relaxed">
                Jika Anda tidak menemukan jawaban yang dicari, jangan ragu untuk menghubungi kami. Tim kami siap membantu Anda.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold bg-[#4F46E5] text-white hover:bg-[#4338CA] transition-colors"
                >
                  Hubungi Kami
                </a>
                <a
                  href="/"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium border border-[#27272A] bg-[#09090B] text-[#A1A1AA] hover:text-[#FAFAFA] hover:border-[#3F3F46] transition-colors"
                >
                  Mulai Download
                </a>
              </div>
            </div>

            {/* Related pages */}
            <div className="mt-12 p-6 rounded-xl bg-[#111113] border border-[#27272A]">
              <h3
                className="text-sm font-bold text-[#FAFAFA] mb-4"
                style={{ fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif" }}
              >
                Halaman Terkait
              </h3>
              <div className="flex flex-wrap gap-3">
                <a
                  href="/about"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm border border-[#27272A] bg-[#09090B] text-[#A1A1AA] hover:text-[#4F46E5] hover:border-[#4F46E5]/30 transition-colors"
                >
                  <Globe className="h-4 w-4" />
                  Tentang Kami
                </a>
                <a
                  href="/privacy"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm border border-[#27272A] bg-[#09090B] text-[#A1A1AA] hover:text-[#4F46E5] hover:border-[#4F46E5]/30 transition-colors"
                >
                  <Shield className="h-4 w-4" />
                  Kebijakan Privasi
                </a>
                <a
                  href="/terms"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm border border-[#27272A] bg-[#09090B] text-[#A1A1AA] hover:text-[#4F46E5] hover:border-[#4F46E5]/30 transition-colors"
                >
                  <Lock className="h-4 w-4" />
                  Syarat & Ketentuan
                </a>
                <a
                  href="/disclaimer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm border border-[#27272A] bg-[#09090B] text-[#A1A1AA] hover:text-[#4F46E5] hover:border-[#4F46E5]/30 transition-colors"
                >
                  <FileText className="h-4 w-4" />
                  Disclaimer
                </a>
                <a
                  href="/dmca"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm border border-[#27272A] bg-[#09090B] text-[#A1A1AA] hover:text-[#4F46E5] hover:border-[#4F46E5]/30 transition-colors"
                >
                  <CreditCard className="h-4 w-4" />
                  DMCA
                </a>
              </div>
            </div>

            {/* Footer notice */}
            <div className="mt-12 pt-8 border-t border-[#27272A] text-center">
              <p className="text-xs text-[#A1A1AA]">
                &copy; 2026 Mova. Dibuat dengan ❤️ di Indonesia. Semua hak dilindungi.
              </p>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

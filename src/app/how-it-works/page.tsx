import type { Metadata } from "next";
import {
  Home,
  Zap,
  Link,
  Download,
  Shield,
  Clock,
  Smartphone,
  ChevronRight,
  Search,
  Server,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import { MovaLogo } from "@/components/mova-logo";
import { SitewideFooter } from "@/components/sitewide-footer";

export const metadata: Metadata = {
  title: "Cara Kerja Mova - Download Video Tanpa Watermark",
  description:
    "Pelajari cara kerja Mova, layanan download video tanpa watermark dari TikTok, YouTube, Instagram, dan platform lainnya. Proses cepat, aman, dan gratis tanpa registrasi.",
  alternates: { canonical: "https://getmova.my.id/how-it-works" },
  keywords: [
    "cara kerja mova",
    "how mova works",
    "cara download video mova",
    "download video tanpa watermark",
    "tutorial mova",
    "langkah download video",
  ],
  openGraph: {
    title: "Cara Kerja Mova - Download Video Tanpa Watermark",
    description:
      "Pelajari cara kerja Mova, layanan download video tanpa watermark dari TikTok, YouTube, Instagram, dan platform lainnya. Proses cepat, aman, dan gratis tanpa registrasi.",
    url: "https://getmova.my.id/how-it-works",
    siteName: "getmova",
    type: "website",
  },
};

const steps = [
  {
    number: 1,
    icon: Link,
    title: "Salin Link Video",
    description:
      "Buka aplikasi media sosial favorit Anda seperti TikTok, YouTube, Instagram, atau platform lainnya. Temukan video yang ingin Anda unduh, lalu salin tautan (URL) video tersebut. Cara menyalin link berbeda-beda di setiap platform — biasanya dengan menekan tombol \"Bagikan\" atau \"Share\" lalu memilih \"Salin Tautan\" atau \"Copy Link\". Pastikan Anda menyalin URL lengkap video agar Mova dapat memprosesnya dengan benar.",
  },
  {
    number: 2,
    icon: Search,
    title: "Tempel di Mova",
    description:
      "Buka website Mova di getmova.my.id melalui browser di perangkat Anda — baik itu smartphone, tablet, atau komputer. Temukan kolom input di halaman utama, lalu tempelkan URL video yang sudah Anda salin sebelumnya. Anda dapat menekan tombol \"Tempel\" atau menggunakan shortcut keyboard (Ctrl+V / Cmd+V). Setelah URL terisi, klik tombol download atau tekan Enter untuk memulai proses.",
  },
  {
    number: 3,
    icon: Server,
    title: "Proses Otomatis",
    description:
      "Setelah Anda menekan tombol download, Mova secara otomatis akan menganalisis URL yang Anda berikan. Sistem kami menghubungi platform sumber melalui API untuk mengambil informasi video, termasuk judul, thumbnail, durasi, dan daftar format serta kualitas yang tersedia. Seluruh proses ini berlangsung dalam hitungan detik berkat infrastruktur server yang cepat dan efisien. Anda tidak perlu melakukan konfigurasi apapun — Mova menangani semuanya secara otomatis di balik layar.",
  },
  {
    number: 4,
    icon: Download,
    title: "Pilih & Download",
    description:
      "Setelah informasi video berhasil diambil, Mova akan menampilkan daftar opsi kualitas dan format yang tersedia untuk video tersebut. Pilih kualitas video atau audio yang sesuai dengan kebutuhan Anda — mulai dari HD 1080p untuk kualitas tertinggi hingga SD untuk ukuran file yang lebih kecil. Klik tombol download pada opsi yang Anda pilih, dan file akan langsung diunduh ke perangkat Anda dari server platform sumber. Tidak ada file perantara yang disimpan di server Mova.",
  },
];

const technologies = [
  {
    icon: Server,
    title: "Tidak Menyimpan Video",
    description:
      "Mova tidak menyimpan, meng-cache, atau meng-host file video apapun di server kami. Ketika Anda mengunduh video, file tersebut dialirkan langsung dari server platform sumber ke perangkat Anda. Ini berarti konten tidak pernah melewati atau disimpan di infrastruktur penyimpanan kami, sehingga proses unduhan lebih cepat dan aman.",
  },
  {
    icon: Zap,
    title: "API untuk Informasi Video",
    description:
      "Mova menggunakan API khusus untuk mengambil informasi video dari platform sumber. API ini mengembalikan metadata video seperti judul, durasi, thumbnail, dan tautan unduhan yang tersedia. Kami tidak mengakses atau mendekripsi konten yang dilindungi — kami hanya memproses informasi yang tersedia secara publik dari platform tersebut.",
  },
  {
    icon: ArrowRight,
    title: "Unduh Langsung dari Sumber",
    description:
      "Saat Anda mengklik tombol download, perangkat Anda terhubung langsung ke server platform sumber untuk mengunduh file. Mova bertindak sebagai perantara yang menyediakan tautan unduhan, bukan sebagai penyimpan file. Proses ini memastikan kecepatan unduhan optimal dan mengurangi beban pada server kami, serta menjamin bahwa Anda selalu mendapatkan file asli dari sumbernya.",
  },
  {
    icon: Shield,
    title: "Enkripsi HTTPS",
    description:
      "Seluruh komunikasi antara browser Anda dan server Mova dilindungi oleh enkripsi HTTPS (TLS). Ini berarti data yang dikirim dan diterima — termasuk URL video yang Anda masukkan — tidak dapat disadap atau dibaca oleh pihak ketiga selama transmisi. Keamanan koneksi adalah prioritas utama kami untuk melindungi privasi pengguna.",
  },
];

const securityPoints = [
  {
    icon: Smartphone,
    title: "Tanpa Registrasi",
    description:
      "Anda tidak perlu membuat akun, mendaftar, atau memberikan informasi pribadi apapun untuk menggunakan Mova. Cukup buka website, tempel URL, dan unduh video. Tidak ada email, nomor telepon, atau identitas lain yang kami minta. Ini membuat Mova menjadi salah satu downloader paling mudah dan aman digunakan.",
  },
  {
    icon: Clock,
    title: "URL Tidak Disimpan",
    description:
      "URL video yang Anda masukkan ke Mova hanya diproses secara real-time untuk mengambil informasi video. Setelah proses selesai, URL tersebut tidak disimpan di database server kami. Kami tidak memiliki catatan tentang video apa saja yang pernah Anda unduh melalui layanan kami. Privasi aktivitas unduhan Anda sepenuhnya terjaga.",
  },
  {
    icon: CheckCircle,
    title: "Tanpa Riwayat Server",
    description:
      "Mova tidak menyimpan riwayat unduhan di server kami. Tidak ada log yang mencatat video mana yang Anda unduh, kapan Anda mengunduhnya, atau berapa kali Anda menggunakan layanan ini. Riwayat unduhan yang Anda lihat di aplikasi Mova hanya tersimpan secara lokal di browser Anda melalui localStorage dan tidak pernah dikirim ke server kami.",
  },
  {
    icon: Shield,
    title: "Cookie Consent untuk AdSense/Analytics",
    description:
      "Mova menampilkan banner persetujuan cookie (cookie consent) saat Anda pertama kali mengunjungi website kami. Hal ini kami lakukan karena kami menggunakan Google AdSense untuk menampilkan iklan dan Google Analytics untuk analitik website. Anda memiliki kendali penuh untuk menerima atau menolak cookie periklanan dan analitik. Kami berkomitmen untuk mematuhi regulasi privasi yang berlaku dan memberikan transparansi penuh tentang penggunaan cookie di platform kami.",
  },
];

const platforms = [
  { name: "TikTok", color: "#010101", href: "/tiktok-downloader" },
  { name: "YouTube", color: "#FF0000", href: "/youtube-downloader" },
  { name: "Instagram", color: "#E4405F", href: "/instagram-downloader" },
  { name: "Facebook", color: "#1877F2", href: "/facebook-downloader" },
  { name: "Twitter/X", color: "#14171A", href: "/twitter-downloader" },
  { name: "Pinterest", color: "#E60023", href: "/pinterest-downloader" },
  { name: "Reddit", color: "#FF4500", href: "/reddit-downloader" },
  { name: "Telegram", color: "#26A5E4", href: "/telegram-downloader" },
];

const formats = [
  {
    category: "Video",
    icon: Download,
    items: [
      { label: "MP4 HD 1080p", desc: "Kualitas tertinggi yang tersedia, cocok untuk menonton di layar besar atau menyimpan koleksi video dengan kualitas terbaik." },
      { label: "MP4 SD (720p/480p)", desc: "Ukuran file lebih kecil dengan kualitas yang masih baik, ideal untuk pengguna dengan koneksi internet terbatas atau penyimpanan perangkat terbatas." },
    ],
  },
  {
    category: "Audio",
    icon: Zap,
    items: [
      { label: "MP3 320kbps", desc: "Kualitas audio tertinggi, cocok untuk mendengarkan musik melalui speaker atau headphone berkualitas tinggi." },
      { label: "MP3 128kbps/64kbps", desc: "Ukuran file lebih kecil dengan kualitas audio yang cukup baik untuk mendengarkan sehari-hari atau saat menggunakan koneksi data terbatas." },
    ],
  },
];

const faqs = [
  {
    question: "Apakah Mova benar-benar gratis?",
    answer:
      "Ya, Mova sepenuhnya gratis tanpa biaya tersembunyi. Kami menampilkan iklan melalui Google AdSense untuk mendukung operasional layanan agar tetap gratis bagi semua pengguna. Tidak ada batasan jumlah unduhan, tidak ada langganan berbayar, dan tidak ada fitur premium yang dikunci di balik paywall.",
  },
  {
    question: "Apakah Mova menyimpan video yang saya unduh?",
    answer:
      "Tidak. Mova tidak menyimpan video apapun di server kami. Seluruh proses unduhan berlangsung langsung dari server platform sumber ke perangkat Anda. Mova hanya bertindak sebagai perantara yang menyediakan tautan unduhan — file tidak pernah melewati atau disimpan di infrastruktur kami.",
  },
  {
    question: "Mengapa unduhan saya gagal?",
    answer:
      "Unduhan dapat gagal karena beberapa alasan: URL video tidak valid atau sudah dihapus dari platform sumber, video bersifat privat atau dilindungi, platform sumber mengalami gangguan, atau koneksi internet Anda tidak stabil. Pastikan URL yang Anda masukkan benar dan coba lagi. Jika masalah berlanjut, coba gunakan browser lain atau hubungi kami melalui halaman kontak.",
  },
  {
    question: "Apakah saya perlu mendaftar untuk menggunakan Mova?",
    answer:
      "Tidak perlu. Mova tidak memerlukan registrasi, login, atau informasi pribadi apapun. Anda dapat langsung menggunakan layanan kami dengan membuka website dan menempelkan URL video. Kami percaya bahwa proses unduhan video seharusnya sederhana dan tanpa hambatan.",
  },
  {
    question: "Format dan kualitas apa saja yang tersedia?",
    answer:
      "Ketersediaan format dan kualitas tergantung pada platform sumber dan video yang Anda unduh. Umumnya, Mova menyediakan opsi video MP4 dalam kualitas HD 1080p dan SD, serta audio MP3 dengan berbagai bitrate. Tidak semua video tersedia dalam semua kualitas — hal ini bergantung pada apa yang disediakan oleh platform asli.",
  },
];

const relatedPages = [
  { href: "/about", label: "Tentang Kami", icon: Smartphone },
  { href: "/faq", label: "FAQ", icon: CheckCircle },
  { href: "/privacy", label: "Kebijakan Privasi", icon: Shield },
  { href: "/contact", label: "Hubungi Kami", icon: Link },
];

export default function HowItWorksPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://getmova.my.id" },
      { "@type": "ListItem", position: 2, name: "Cara Kerja", item: "https://getmova.my.id/how-it-works" },
    ],
  };

  const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "Cara Mengunduh Video dengan Mova",
    description:
      "Pelajari cara mengunduh video tanpa watermark dari berbagai platform media sosial menggunakan Mova. Proses cepat, gratis, dan aman.",
    totalTime: "PT1M",
    step: steps.map((step) => ({
      "@type": "HowToStep",
      position: step.number,
      name: step.title,
      text: step.description,
    })),
  };

  return (
    <>
      {/* JSON-LD BreadcrumbList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {/* JSON-LD HowTo */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
      />

      <div className="min-h-screen flex flex-col bg-card text-foreground">
        {/* Header */}
        <header className="border-b border-border bg-card">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <a href="/" className="flex items-center gap-2">
                <MovaLogo size={32} showText />
              </a>
              <a
                href="/"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border border-border bg-card text-foreground hover:bg-muted/50 transition-colors"
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
              <ol className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <li>
                  <a href="/" className="hover:text-[#10B981] transition-colors">
                    Beranda
                  </a>
                </li>
                <li>
                  <ChevronRight className="h-3.5 w-3.5" />
                </li>
                <li className="text-[#10B981] font-medium">Cara Kerja</li>
              </ol>
            </nav>

            {/* Title section */}
            <div className="text-center mb-16">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium tracking-wider uppercase border border-border text-muted-foreground mb-6">
                <Zap className="h-3 w-3 text-[#10B981]" />
                Cara Kerja
              </span>
              <h1
                className="text-4xl sm:text-5xl font-light tracking-tight text-foreground mb-4 mt-4"
                style={{ fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif" }}
              >
                Bagaimana{" "}
                <span className="font-bold text-[#10B981]">Mova</span> Bekerja?
              </h1>
              <p className="text-muted-foreground text-sm max-w-2xl mx-auto leading-relaxed">
                Mova adalah layanan download video berbasis web yang memungkinkan Anda mengunduh video tanpa watermark dari berbagai platform media sosial. Tanpa instalasi, tanpa registrasi — cukup salin link, tempel, dan unduh.
              </p>
              <p className="text-xs text-muted-foreground/60 mt-3">
                Terakhir diperbarui: 30 Mei 2026
              </p>
            </div>

            {/* Intro highlight */}
            <div className="mb-16 p-6 sm:p-8 rounded-xl bg-gradient-to-br from-card to-background dark:from-[#111113] dark:to-[#0F0F11] border border-border relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#10B981]/5 rounded-full blur-3xl" />
              <div className="relative">
                <div className="flex items-center gap-3 mb-4">
                  <MovaLogo size={40} showText={false} />
                  <h2
                    className="text-xl font-bold text-foreground"
                    style={{ fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif" }}
                  >
                    Transparansi Adalah Prioritas Kami
                  </h2>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  Kami percaya bahwa setiap pengguna berhak tahu bagaimana layanan yang mereka gunakan bekerja di balik layar. Mova bukan sekadar alat download video — kami membangun platform yang transparan tentang proses teknis, keamanan data, dan privasi pengguna.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  Di halaman ini, kami menjelaskan secara detail setiap langkah proses unduhan, teknologi yang kami gunakan, dan bagaimana kami melindungi data Anda. Tidak ada yang tersembunyi — semua bekerja secara terbuka dan dapat diaudit.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Google dan AdSense juga menghargai transparansi, dan halaman ini dirancang untuk memenuhi standar tersebut sekaligus memberikan informasi yang berguna bagi Anda sebagai pengguna.
                </p>
              </div>
            </div>

            {/* Steps section */}
            <div className="mb-16">
              <div className="text-center mb-10">
                <h2
                  className="text-2xl font-bold text-foreground mb-3"
                  style={{ fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif" }}
                >
                  Langkah-Langkah <span className="text-[#10B981]">Mengunduh Video</span>
                </h2>
                <p className="text-sm text-muted-foreground max-w-lg mx-auto">
                  Hanya 4 langkah sederhana untuk mengunduh video tanpa watermark dari platform media sosial favorit Anda.
                </p>
              </div>
              <div className="space-y-6">
                {steps.map((step) => (
                  <div
                    key={step.number}
                    className="p-6 rounded-xl bg-card border border-border hover:border-[#10B981]/20 transition-colors group"
                  >
                    <div className="flex gap-4">
                      <div className="flex flex-col items-center shrink-0">
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-lg font-bold shrink-0"
                          style={{ backgroundColor: "#10B981" }}
                        >
                          {step.number}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <step.icon className="h-5 w-5 text-[#10B981]" />
                          <h3
                            className="text-base font-bold text-foreground"
                            style={{ fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif" }}
                          >
                            {step.title}
                          </h3>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Technology section */}
            <div className="mb-16">
              <div className="text-center mb-10">
                <h2
                  className="text-2xl font-bold text-foreground mb-3"
                  style={{ fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif" }}
                >
                  Teknologi di Balik <span className="text-[#10B981]">Mova</span>
                </h2>
                <p className="text-sm text-muted-foreground max-w-lg mx-auto">
                  Pahami bagaimana Mova bekerja secara teknis — dari pengambilan informasi video hingga proses unduhan yang aman.
                </p>
              </div>
              <div className="grid sm:grid-cols-2 gap-6">
                {technologies.map((tech, index) => (
                  <div
                    key={index}
                    className="p-6 rounded-xl bg-card border border-border hover:border-[#10B981]/20 transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-background border border-border mb-4 group-hover:border-[#10B981]/30 transition-colors">
                      <tech.icon className="h-5 w-5 text-[#10B981]" />
                    </div>
                    <h3
                      className="text-base font-bold text-foreground mb-2"
                      style={{ fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif" }}
                    >
                      {tech.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {tech.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Security & Privacy section */}
            <div className="mb-16">
              <div className="text-center mb-10">
                <h2
                  className="text-2xl font-bold text-foreground mb-3"
                  style={{ fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif" }}
                >
                  Keamanan & <span className="text-[#10B981]">Privasi</span>
                </h2>
                <p className="text-sm text-muted-foreground max-w-lg mx-auto">
                  Kami menjaga privasi Anda dengan serius. Berikut penjelasan tentang bagaimana Mova melindungi data dan aktivitas Anda.
                </p>
              </div>
              <div className="space-y-6">
                {securityPoints.map((point, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex flex-col items-center shrink-0">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-card border border-border">
                        <point.icon className="h-5 w-5 text-[#10B981]" />
                      </div>
                      {index < securityPoints.length - 1 && (
                        <div className="w-px h-full bg-border dark:bg-[#27272A] mt-2" />
                      )}
                    </div>
                    <div className="pb-2">
                      <h3
                        className="text-base font-bold text-foreground mb-2"
                        style={{ fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif" }}
                      >
                        {point.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {point.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Supported platforms */}
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-card border border-border shrink-0">
                  <Download className="h-5 w-5 text-[#10B981]" />
                </div>
                <h2
                  className="text-xl font-bold text-foreground"
                  style={{ fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif" }}
                >
                  Platform yang Didukung
                </h2>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6 ml-14">
                Mova mendukung pengunduhan video dan audio dari berbagai platform media sosial terpopuler di dunia. Setiap platform memiliki halaman khusus yang dioptimalkan untuk pengalaman unduhan terbaik. Kami terus menambahkan dukungan untuk platform baru berdasarkan permintaan komunitas pengguna kami.
              </p>
              <div className="ml-14 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {platforms.map((platform) => (
                  <a
                    key={platform.name}
                    href={platform.href}
                    className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border hover:border-[#10B981]/30 transition-colors group"
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold shrink-0"
                      style={{ backgroundColor: platform.color }}
                    >
                      {platform.name[0]}
                    </div>
                    <span className="text-sm text-muted-foreground group-hover:text-foreground dark:group-hover:text-[#FAFAFA] transition-colors">
                      {platform.name}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Format & Quality section */}
            <div className="mb-16">
              <div className="text-center mb-10">
                <h2
                  className="text-2xl font-bold text-foreground mb-3"
                  style={{ fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif" }}
                >
                  Format & <span className="text-[#10B981]">Kualitas</span>
                </h2>
                <p className="text-sm text-muted-foreground max-w-lg mx-auto">
                  Mova menyediakan berbagai opsi format dan kualitas untuk memenuhi kebutuhan Anda, mulai dari video HD hingga audio MP3.
                </p>
              </div>
              <div className="grid sm:grid-cols-2 gap-6">
                {formats.map((format) => (
                  <div
                    key={format.category}
                    className="p-6 rounded-xl bg-card border border-border"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-background border border-border">
                        <format.icon className="h-5 w-5 text-[#10B981]" />
                      </div>
                      <h3
                        className="text-base font-bold text-foreground"
                        style={{ fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif" }}
                      >
                        {format.category}
                      </h3>
                    </div>
                    <div className="space-y-4">
                      {format.items.map((item, index) => (
                        <div key={index} className="pl-4 border-l-2 border-[#10B981]/30">
                          <p className="text-sm font-semibold text-foreground mb-1">
                            {item.label}
                          </p>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            {item.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ mini section */}
            <div className="mb-16">
              <div className="text-center mb-10">
                <h2
                  className="text-2xl font-bold text-foreground mb-3"
                  style={{ fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif" }}
                >
                  Pertanyaan <span className="text-[#10B981]">Umum</span>
                </h2>
                <p className="text-sm text-muted-foreground max-w-lg mx-auto">
                  Jawaban atas pertanyaan yang sering diajukan tentang cara kerja Mova.
                </p>
              </div>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="p-5 rounded-xl bg-card border border-border"
                  >
                    <h3
                      className="text-sm font-bold text-foreground mb-2"
                      style={{ fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif" }}
                    >
                      {faq.question}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Related pages */}
            <div className="p-6 rounded-xl bg-card border border-border">
              <h3
                className="text-sm font-bold text-foreground mb-4"
                style={{ fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif" }}
              >
                Halaman Terkait
              </h3>
              <div className="flex flex-wrap gap-3">
                {relatedPages.map((page) => (
                  <a
                    key={page.href}
                    href={page.href}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm border border-border bg-card text-muted-foreground hover:text-[#10B981] hover:border-[#10B981]/30 transition-colors"
                  >
                    <page.icon className="h-4 w-4" />
                    {page.label}
                  </a>
                ))}
              </div>
            </div>

          </div>
        </main>

        <SitewideFooter />
      </div>
    </>
  );
}

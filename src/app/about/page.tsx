<<<<<<< HEAD
import type { Metadata } from "next";
import {
  Home,
  Heart,
  Target,
  Smartphone,
  Shield,
  Users,
  Globe,
  Zap,
  Lock,
  ChevronRight,
  Sparkles,
  Code2,
  MessageCircle,
} from "lucide-react";
import { MovaLogo } from "@/components/mova-logo";

export const metadata: Metadata = {
  title: "Tentang Mova - Download Video Tanpa Watermark",
  description:
    "Kenali Mova lebih dekat. Mova adalah layanan download video tanpa watermark dari berbagai platform populer. Gratis, cepat, dan menjaga privasi Anda.",
  keywords: [
    "tentang mova",
    "about mova",
    "mova video downloader",
    "download video tanpa watermark",
    "tentang kami mova",
  ],
  openGraph: {
    title: "Tentang Mova - Download Video Tanpa Watermark",
    description:
      "Kenali Mova lebih dekat. Mova adalah layanan download video tanpa watermark dari berbagai platform populer. Gratis, cepat, dan menjaga privasi Anda.",
=======
import { Home, Users, Target, Cpu, Mail, ArrowRight, Scale, ShieldCheck } from "lucide-react";
import { MovaLogo } from "@/components/mova-logo";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tentang Kami - Mova",
  description:
    "Kenali lebih dekat Mova, layanan download video tanpa watermark gratis. Didirikan pada tahun 2025 dengan misi membuat download video mudah dan cepat untuk semua orang.",
  openGraph: {
    title: "Tentang Kami - Mova",
    description:
      "Kenali lebih dekat Mova, layanan download video tanpa watermark gratis.",
>>>>>>> d247eb0a36958c7327f154960a1a760af55329ab
    url: "https://getmova.my.id/about",
    siteName: "Mova",
    type: "website",
  },
};

<<<<<<< HEAD
const platforms = [
  { name: "TikTok", color: "#010101" },
  { name: "YouTube", color: "#FF0000" },
  { name: "Instagram", color: "#E4405F" },
  { name: "Facebook", color: "#1877F2" },
  { name: "Twitter/X", color: "#14171A" },
  { name: "Pinterest", color: "#E60023" },
  { name: "Reddit", color: "#FF4500" },
];

const values = [
  {
    icon: Shield,
    title: "Privasi Utama",
    description:
      "Kami tidak mengumpulkan data pribadi Anda. Tidak ada akun yang perlu dibuat, tidak ada pelacakan, dan tidak ada data yang dijual ke pihak ketiga. Privasi Anda adalah prioritas kami.",
  },
  {
    icon: Zap,
    title: "Cepat & Gratis",
    description:
      "Mova dirancang untuk memberikan pengalaman download secepat mungkin tanpa biaya apa pun. Tanpa iklan pop-up yang mengganggu, tanpa batasan download, dan tanpa perlu mendaftar.",
  },
  {
    icon: Lock,
    title: "Aman & Terpercaya",
    description:
      "Keamanan pengguna adalah komitmen kami. Mova diproses melalui koneksi HTTPS yang terenkripsi, dan kami tidak menyimpan file apapun di server kami. Setiap sesi download bersih dan aman.",
  },
  {
    icon: Heart,
    title: "Dibuat untuk Pengguna",
    description:
      "Setiap fitur di Mova dibangun berdasarkan kebutuhan nyata pengguna. Kami mendengarkan masukan komunitas dan terus memperbarui layanan untuk pengalaman yang lebih baik.",
  },
];

const milestones = [
  {
    icon: Code2,
    title: "Dibangun oleh Developer, untuk Semua",
    description:
      "Mova lahir dari kebutuhan nyata akan alat download video yang sederhana, cepat, dan menghormati privasi pengguna. Kami adalah tim kecil developer yang percaya bahwa teknologi yang baik tidak harus rumit atau mahal. Proyek ini dimulai dari rasa frustrasi terhadap layanan downloader yang penuh iklan, lambat, dan tidak transparan tentang data pengguna.",
  },
  {
    icon: Target,
    title: "Misi Kami",
    description:
      "Memberikan akses mudah dan gratis untuk mengunduh video dari platform media sosial tanpa watermark, sambil menjaga privasi dan keamanan pengguna. Kami ingin setiap orang bisa menyimpan video favorit mereka dengan mudah — tanpa harus khawatir tentang data pribadi mereka dikumpulkan atau disalahgunakan.",
  },
  {
    icon: Sparkles,
    title: "Apa yang Membuat Mova Berbeda",
    description:
      "Berbeda dengan kebanyakan layanan downloader video, Mova tidak menyimpan file apapun di server kami. Semua proses dilakukan secara langsung dari platform sumber, yang berarti konten tidak pernah melewati atau disimpan di infrastruktur kami. Ini bukan hanya soal efisiensi — ini tentang keamanan dan transparansi.",
  },
  {
    icon: MessageCircle,
    title: "Komunitas & Umpan Balik",
    description:
      "Kami sangat menghargai umpan balik dari pengguna. Mova terus berkembang berkat masukan dari komunitas. Apakah Anda menemukan bug, memiliki saran fitur baru, atau hanya ingin menyapa — kami selalu senang mendengar dari Anda. Hubungi kami melalui halaman kontak atau media sosial kami.",
  },
];

export default function AboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Tentang Mova - Download Video Tanpa Watermark",
    description:
      "Kenali Mova lebih dekat. Mova adalah layanan download video tanpa watermark dari berbagai platform populer. Gratis, cepat, dan menjaga privasi Anda.",
    url: "https://getmova.my.id/about",
    isPartOf: {
      "@type": "WebSite",
      name: "Mova",
      url: "https://getmova.my.id",
    },
    breadcrumb: {
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
          name: "Tentang Kami",
          item: "https://getmova.my.id/about",
        },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
                  <a href="/" className="hover:text-[#F97316] transition-colors">
                    Beranda
                  </a>
                </li>
                <li>
                  <ChevronRight className="h-3.5 w-3.5" />
                </li>
                <li className="text-[#F97316] font-medium">Tentang Kami</li>
              </ol>
            </nav>

            {/* Title section */}
            <div className="text-center mb-16">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium tracking-wider uppercase border border-[#27272A] text-[#A1A1AA] mb-6">
                <Heart className="h-3 w-3 text-[#F97316]" />
                Tentang Kami
              </span>
              <h1
                className="text-4xl sm:text-5xl font-light tracking-tight text-[#FAFAFA] mb-4 mt-4"
                style={{ fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif" }}
              >
                Tentang{" "}
                <span className="font-bold text-[#F97316]">Mova</span>
              </h1>
              <p className="text-[#A1A1AA] text-sm max-w-2xl mx-auto leading-relaxed">
                Mova adalah layanan download video tanpa watermark yang gratis, cepat, dan menghormati privasi Anda. Kenali kami lebih dekat dan temukan mengapa ribuan orang mempercayai Mova.
              </p>
            </div>

            {/* Intro highlight */}
            <div className="mb-16 p-6 sm:p-8 rounded-xl bg-gradient-to-br from-[#111113] to-[#0F0F11] border border-[#27272A] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#F97316]/5 rounded-full blur-3xl" />
              <div className="relative">
                <div className="flex items-center gap-3 mb-4">
                  <MovaLogo size={40} showText={false} />
                  <h2
                    className="text-xl font-bold text-[#FAFAFA]"
                    style={{ fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif" }}
                  >
                    Apa Itu Mova?
                  </h2>
                </div>
                <p className="text-sm text-[#A1A1AA] leading-relaxed mb-4">
                  Mova adalah platform download video tanpa watermark yang mendukung berbagai platform media sosial populer. Kami membangun Mova karena kami percaya bahwa mengunduh video seharusnya tidak rumit — tidak perlu mendaftar, tidak perlu membayar, dan tidak perlu khawatir tentang data pribadi Anda.
                </p>
                <p className="text-sm text-[#A1A1AA] leading-relaxed mb-4">
                  Dibangun dengan teknologi modern, Mova memproses permintaan Anda secara real-time dan menyediakan tautan unduhan langsung dari sumber asli. Kami tidak menyimpan file video atau audio di server kami, yang berarti konten tidak pernah melewati infrastruktur penyimpanan kami. Ini menjadikan Mova salah satu downloader paling aman dan transparan yang tersedia.
                </p>
                <p className="text-sm text-[#A1A1AA] leading-relaxed">
                  Nama &quot;Mova&quot; terinspirasi dari kata &quot;Move&quot; dan &quot;Video&quot; — kami ingin membantu Anda menyimpan dan memindahkan video favorit ke perangkat Anda dengan mudah, kapan saja dan di mana saja.
                </p>
              </div>
            </div>

            {/* Supported platforms */}
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-[#111113] border border-[#27272A] shrink-0">
                  <Globe className="h-5 w-5 text-[#F97316]" />
                </div>
                <h2
                  className="text-xl font-bold text-[#FAFAFA]"
                  style={{ fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif" }}
                >
                  Platform yang Didukung
                </h2>
              </div>
              <p className="text-sm text-[#A1A1AA] leading-relaxed mb-6 ml-14">
                Mova mendukung pengunduhan video dan audio dari berbagai platform media sosial terpopuler di dunia. Kami terus menambahkan dukungan untuk platform baru berdasarkan permintaan pengguna.
              </p>
              <div className="ml-14 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {platforms.map((platform) => (
                  <a
                    key={platform.name}
                    href="/"
                    className="flex items-center gap-3 p-3 rounded-xl bg-[#111113] border border-[#27272A] hover:border-[#F97316]/30 transition-colors group"
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold shrink-0"
                      style={{ backgroundColor: platform.color }}
                    >
                      {platform.name[0]}
                    </div>
                    <span className="text-sm text-[#A1A1AA] group-hover:text-[#FAFAFA] transition-colors">
                      {platform.name}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Our Values */}
            <div className="mb-16">
              <div className="text-center mb-10">
                <h2
                  className="text-2xl font-bold text-[#FAFAFA] mb-3"
                  style={{ fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif" }}
                >
                  Nilai-Nilai <span className="text-[#F97316]">Kami</span>
                </h2>
                <p className="text-sm text-[#A1A1AA] max-w-lg mx-auto">
                  Prinsip-prinsip yang memandu setiap keputusan dan fitur yang kami bangun di Mova.
                </p>
              </div>
              <div className="grid sm:grid-cols-2 gap-6">
                {values.map((value, index) => (
                  <div
                    key={index}
                    className="p-6 rounded-xl bg-[#111113] border border-[#27272A] hover:border-[#F97316]/20 transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-[#09090B] border border-[#27272A] mb-4 group-hover:border-[#F97316]/30 transition-colors">
                      <value.icon className="h-5 w-5 text-[#F97316]" />
                    </div>
                    <h3
                      className="text-base font-bold text-[#FAFAFA] mb-2"
                      style={{ fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif" }}
                    >
                      {value.title}
                    </h3>
                    <p className="text-sm text-[#A1A1AA] leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Milestones / Story */}
            <div className="mb-16">
              <div className="text-center mb-10">
                <h2
                  className="text-2xl font-bold text-[#FAFAFA] mb-3"
                  style={{ fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif" }}
                >
                  Cerita <span className="text-[#F97316]">Kami</span>
                </h2>
                <p className="text-sm text-[#A1A1AA] max-w-lg mx-auto">
                  Perjalanan dan komitmen kami dalam membangun Mova untuk Anda.
                </p>
              </div>
              <div className="space-y-10">
                {milestones.map((milestone, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex flex-col items-center shrink-0">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-[#111113] border border-[#27272A]">
                        <milestone.icon className="h-5 w-5 text-[#F97316]" />
                      </div>
                      {index < milestones.length - 1 && (
                        <div className="w-px h-full bg-[#27272A] mt-2" />
                      )}
                    </div>
                    <div className="pb-2">
                      <h3
                        className="text-base font-bold text-[#FAFAFA] mb-2"
                        style={{ fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif" }}
                      >
                        {milestone.title}
                      </h3>
                      <p className="text-sm text-[#A1A1AA] leading-relaxed">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Team */}
            <div className="mb-16 p-6 sm:p-8 rounded-xl bg-[#111113] border border-[#27272A]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-[#09090B] border border-[#27272A]">
                  <Users className="h-5 w-5 text-[#F97316]" />
                </div>
                <h2
                  className="text-xl font-bold text-[#FAFAFA]"
                  style={{ fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif" }}
                >
                  Tim Kami
                </h2>
              </div>
              <div className="ml-14 space-y-3">
                <p className="text-sm text-[#A1A1AA] leading-relaxed">
                  Mova dikembangkan dan dipelihara oleh tim kecil developer yang bersemangat tentang teknologi dan privasi digital. Kami bekerja dari Indonesia dan berkomitmen untuk memberikan layanan terbaik bagi pengguna kami.
                </p>
                <p className="text-sm text-[#A1A1AA] leading-relaxed">
                  Meskipun tim kami kecil, kami percaya bahwa dedikasi dan perhatian terhadap detail membuat perbedaan besar. Setiap baris kode, setiap fitur, dan setiap keputusan desain dibuat dengan mempertimbangkan pengalaman dan keamanan pengguna.
                </p>
                <p className="text-sm text-[#A1A1AA] leading-relaxed">
                  Kami juga berterima kasih kepada komunitas open-source yang telah menyediakan alat dan library yang memungkinkan Mova beroperasi. Tanpa kontribusi dari komunitas developer global, Mova tidak akan ada.
                </p>
              </div>
            </div>

            {/* Stats highlight */}
            <div className="mb-16 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { value: "7+", label: "Platform" },
                { value: "100%", label: "Gratis" },
                { value: "0", label: "Data Dikumpulkan" },
                { value: "24/7", label: "Tersedia" },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="text-center p-4 rounded-xl bg-[#111113] border border-[#27272A]"
                >
                  <p
                    className="text-2xl sm:text-3xl font-bold text-[#F97316] mb-1"
                    style={{ fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif" }}
                  >
                    {stat.value}
                  </p>
                  <p className="text-xs text-[#A1A1AA]">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Related pages */}
            <div className="p-6 rounded-xl bg-[#111113] border border-[#27272A]">
              <h3
                className="text-sm font-bold text-[#FAFAFA] mb-4"
                style={{ fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif" }}
              >
                Halaman Terkait
              </h3>
              <div className="flex flex-wrap gap-3">
                <a
                  href="/privacy"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm border border-[#27272A] bg-[#09090B] text-[#A1A1AA] hover:text-[#F97316] hover:border-[#F97316]/30 transition-colors"
                >
                  <Shield className="h-4 w-4" />
                  Kebijakan Privasi
                </a>
                <a
                  href="/terms"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm border border-[#27272A] bg-[#09090B] text-[#A1A1AA] hover:text-[#F97316] hover:border-[#F97316]/30 transition-colors"
                >
                  <Smartphone className="h-4 w-4" />
                  Syarat & Ketentuan
                </a>
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm border border-[#27272A] bg-[#09090B] text-[#A1A1AA] hover:text-[#F97316] hover:border-[#F97316]/30 transition-colors"
                >
                  <MessageCircle className="h-4 w-4" />
                  Hubungi Kami
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
=======
export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#09090B] text-[#FAFAFA]">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Mova",
            url: "https://getmova.my.id",
            logo: "https://getmova.my.id/mova-logo.png",
            description:
              "Layanan download video tanpa watermark gratis dari berbagai platform populer.",
            foundingDate: "2025",
            contactPoint: {
              "@type": "ContactPoint",
              email: "support@getmova.my.id",
              contactType: "customer support",
            },
            sameAs: [
              "https://tiktok.com/@abbbuw",
              "https://t.me/sixte3nnn",
            ],
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
              href="/"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border border-[#27272A] bg-[#111113] text-[#FAFAFA] hover:bg-[#18181B] transition-colors"
            >
              <Home className="h-4 w-4" />
              Kembali ke Beranda
            </a>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          {/* Title section */}
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium tracking-wider uppercase border border-[#27272A] text-[#A1A1AA] mb-6">
              <Users className="h-3 w-3 text-[#2563EB]" />
              Tentang Kami
            </span>
            <h1 className="text-4xl sm:text-5xl font-light tracking-tight text-[#FAFAFA] mb-4 mt-4">
              Kenali{" "}
              <span className="font-bold text-[#2563EB]">Mova</span>
            </h1>
            <p className="text-[#A1A1AA] text-sm max-w-xl mx-auto leading-relaxed">
              Layanan download video tanpa watermark yang gratis dan mudah digunakan oleh siapa saja.
            </p>
          </div>

          {/* About Section */}
          <section className="mb-12">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-[#111113] border border-[#27272A]">
                <Users className="h-5 w-5 text-[#2563EB]" />
              </div>
              <h2 className="text-lg font-bold text-[#FAFAFA]">Tentang Mova</h2>
            </div>
            <div className="ml-14 space-y-3">
              <p className="text-sm text-[#A1A1AA] leading-relaxed">
                Mova adalah layanan download video tanpa watermark yang didirikan pada tahun 2025. Kami percaya bahwa setiap orang berhak mengunduh video dari platform sosial media favorit mereka dengan mudah, cepat, dan tanpa batasan.
              </p>
              <p className="text-sm text-[#A1A1AA] leading-relaxed">
                Sejak awal, Mova dirancang dengan prinsip kesederhanaan — cukup tempel link video, dan kami akan menangani sisanya. Tidak perlu registrasi, tidak perlu instalasi, dan yang terpenting — tidak ada watermark yang mengganggu pada video yang kamu unduh.
              </p>
            </div>
          </section>

          {/* Mission Section */}
          <section className="mb-12">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-[#111113] border border-[#27272A]">
                <Target className="h-5 w-5 text-[#2563EB]" />
              </div>
              <h2 className="text-lg font-bold text-[#FAFAFA]">Misi Kami</h2>
            </div>
            <div className="ml-14 space-y-3">
              <p className="text-sm text-[#A1A1AA] leading-relaxed">
                Misi kami sederhana: membuat download video dapat diakses oleh semua orang, tanpa biaya, tanpa watermark, dan dengan kecepatan yang optimal. Kami ingin menghilangkan hambatan yang sering dihadapi pengguna saat ingin menyimpan video dari internet.
              </p>
              <ul className="space-y-2 mt-3">
                {[
                  "Menyediakan layanan download video yang 100% gratis",
                  "Menghapus watermark dari video yang diunduh",
                  "Mendukung berbagai platform populer (TikTok, YouTube, Instagram, dll.)",
                  "Memastikan proses download cepat dan mudah",
                  "Melindungi privasi pengguna — tidak ada data yang disimpan",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-[#A1A1AA]">
                    <span className="text-[#2563EB] mt-1 shrink-0">&#10003;</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Technology Section */}
          <section className="mb-12">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-[#111113] border border-[#27272A]">
                <Cpu className="h-5 w-5 text-[#2563EB]" />
              </div>
              <h2 className="text-lg font-bold text-[#FAFAFA]">Teknologi</h2>
            </div>
            <div className="ml-14 space-y-3">
              <p className="text-sm text-[#A1A1AA] leading-relaxed">
                Mova dibangun menggunakan teknologi modern untuk memastikan performa dan keamanan terbaik. Kami menggunakan Next.js sebagai framework utama, yang memungkinkan kami memberikan pengalaman pengguna yang cepat dan responsif.
              </p>
              <p className="text-sm text-[#A1A1AA] leading-relaxed">
                Privasi pengguna adalah prioritas utama kami. Mova tidak menyimpan data pribadi pengguna, tidak menggunakan cookie pelacakan, dan semua proses download dilakukan langsung dari platform sumber. Data preferensi yang disimpan di browser kamu (seperti riwayat download dan bookmark) hanya tersedia secara lokal dan tidak pernah dikirim ke server kami.
              </p>
            </div>
          </section>

          {/* Fair Use Section */}
          <section className="mb-12">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-[#111113] border border-[#27272A]">
                <Scale className="h-5 w-5 text-[#2563EB]" />
              </div>
              <h2 className="text-lg font-bold text-[#FAFAFA]">Komitmen terhadap Penggunaan Wajar</h2>
            </div>
            <div className="ml-14 space-y-3">
              <p className="text-sm text-[#A1A1AA] leading-relaxed">
                Mova berkomitmen untuk mendukung prinsip penggunaan wajar (fair use) dan menghormati hak kekayaan intelektual setiap kreator konten. Layanan kami dirancang untuk membantu pengguna mengakses konten yang sudah tersedia secara publik untuk keperluan yang sah.
              </p>
              <p className="text-sm text-[#A1A1AA] leading-relaxed">
                Kami mendorong semua pengguna untuk menggunakan konten yang diunduh secara bertanggung jawab: memberikan atribusi kepada kreator asli, tidak mendistribusikan ulang konten tanpa izin, dan mematuhi ketentuan layanan dari platform sumber. Mova tidak menyimpan, meng-host, atau mendistribusikan konten berhak cipta apapun.
              </p>
            </div>
          </section>

          {/* Transparency Section */}
          <section className="mb-12">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-[#111113] border border-[#27272A]">
                <ShieldCheck className="h-5 w-5 text-[#2563EB]" />
              </div>
              <h2 className="text-lg font-bold text-[#FAFAFA]">Transparansi & Keamanan</h2>
            </div>
            <div className="ml-14 space-y-3">
              <p className="text-sm text-[#A1A1AA] leading-relaxed">
                Transparansi adalah salah satu nilai utama kami. Mova tidak menyimpan data pribadi pengguna, tidak menggunakan cookie pelacakan, dan tidak menjual informasi ke pihak ketiga. Semua proses unduhan dilakukan langsung dari platform sumber tanpa melalui server kami.
              </p>
              <p className="text-sm text-[#A1A1AA] leading-relaxed">
                Jika Anda memiliki kekhawatiran tentang hak cipta atau ingin melaporkan pelanggaran, kami memiliki prosedur DMCA yang jelas. Silakan hubungi kami melalui email dan kami akan merespons dengan segera.
              </p>
            </div>
          </section>

          {/* Team Section */}
          <section className="mb-12">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-[#111113] border border-[#27272A]">
                <Users className="h-5 w-5 text-[#2563EB]" />
              </div>
              <h2 className="text-lg font-bold text-[#FAFAFA]">Tim Kami</h2>
            </div>
            <div className="ml-14 space-y-3">
              <p className="text-sm text-[#A1A1AA] leading-relaxed">
                Mova dikembangkan oleh tim kecil dari Indonesia yang passionate tentang membuat alat-alat digital yang gratis dan bermanfaat untuk semua orang. Kami percaya bahwa teknologi harus dapat diakses oleh siapa saja, tanpa harus membayar atau menyerahkan data pribadi.
              </p>
            </div>
          </section>

          {/* Contact Section */}
          <section className="mb-12">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-[#111113] border border-[#27272A]">
                <Mail className="h-5 w-5 text-[#2563EB]" />
              </div>
              <h2 className="text-lg font-bold text-[#FAFAFA]">Kontak</h2>
            </div>
            <div className="ml-14 space-y-3">
              <p className="text-sm text-[#A1A1AA] leading-relaxed">
                Jika kamu memiliki pertanyaan, saran, atau ingin melaporkan masalah, jangan ragu untuk menghubungi kami:
              </p>
              <ul className="space-y-2">
                <li className="text-sm text-[#A1A1AA]">
                  <span className="text-[#FAFAFA] font-medium">Email:</span>{" "}
                  <a href="mailto:support@getmova.my.id" className="text-[#2563EB] hover:underline">
                    support@getmova.my.id
                  </a>
                </li>
                <li className="text-sm text-[#A1A1AA]">
                  <span className="text-[#FAFAFA] font-medium">TikTok:</span>{" "}
                  <a href="https://tiktok.com/@abbbuw" target="_blank" rel="noopener noreferrer" className="text-[#2563EB] hover:underline">
                    @abbbuw
                  </a>
                </li>
                <li className="text-sm text-[#A1A1AA]">
                  <span className="text-[#FAFAFA] font-medium">Telegram:</span>{" "}
                  <a href="https://t.me/sixte3nnn" target="_blank" rel="noopener noreferrer" className="text-[#2563EB] hover:underline">
                    @sixte3nnn
                  </a>
                </li>
              </ul>
            </div>
          </section>

          {/* Internal Links */}
          <div className="mt-16 pt-8 border-t border-[#27272A]">
            <h3 className="text-sm font-semibold text-[#FAFAFA] mb-4">Halaman Terkait</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <a href="/privacy" className="flex items-center justify-between p-4 rounded-lg border border-[#27272A] bg-[#111113] hover:border-[#2563EB]/50 transition-colors group">
                <span className="text-sm text-[#A1A1AA] group-hover:text-[#FAFAFA]">Kebijakan Privasi</span>
                <ArrowRight className="h-4 w-4 text-[#A1A1AA] group-hover:text-[#2563EB] transition-colors" />
              </a>
              <a href="/terms" className="flex items-center justify-between p-4 rounded-lg border border-[#27272A] bg-[#111113] hover:border-[#2563EB]/50 transition-colors group">
                <span className="text-sm text-[#A1A1AA] group-hover:text-[#FAFAFA]">Syarat & Ketentuan</span>
                <ArrowRight className="h-4 w-4 text-[#A1A1AA] group-hover:text-[#2563EB] transition-colors" />
              </a>
              <a href="/disclaimer" className="flex items-center justify-between p-4 rounded-lg border border-[#27272A] bg-[#111113] hover:border-[#2563EB]/50 transition-colors group">
                <span className="text-sm text-[#A1A1AA] group-hover:text-[#FAFAFA]">Disclaimer</span>
                <ArrowRight className="h-4 w-4 text-[#A1A1AA] group-hover:text-[#2563EB] transition-colors" />
              </a>
            </div>
          </div>

          {/* Footer notice */}
          <div className="mt-8 pt-6 border-t border-[#27272A] text-center">
            <p className="text-xs text-[#A1A1AA]">
              &copy; 2026 Mova. All rights reserved.
            </p>
          </div>
        </div>
      </main>
    </div>
>>>>>>> d247eb0a36958c7327f154960a1a760af55329ab
  );
}

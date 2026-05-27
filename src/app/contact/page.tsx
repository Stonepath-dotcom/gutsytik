import type { Metadata } from "next";
import {
  Home,
  Mail,
  Phone,
  Send,
  HelpCircle,
  Bug,
  Shield,
  AlertTriangle,
  ChevronRight,
  MessageCircle,
  Clock,
  Globe,
} from "lucide-react";
import { MovaLogo } from "@/components/mova-logo";
import ContactForm from "./contact-form";

export const metadata: Metadata = {
  title: "Hubungi Kami - getmova",
  description:
    "Hubungi tim Mova untuk pertanyaan, saran, laporan bug, atau masalah lainnya. Kami siap membantu Anda!",
  alternates: { canonical: "https://getmova.my.id/contact" },
  keywords: [
    "kontak mova",
    "hubungi mova",
    "contact mova",
    "bantuan mova",
    "laporan bug mova",
  ],
  openGraph: {
    title: "Hubungi Kami - getmova",
    description:
      "Hubungi tim Mova untuk pertanyaan, saran, laporan bug, atau masalah lainnya. Kami siap membantu Anda!",
    url: "https://getmova.my.id/contact",
    siteName: "getmova",
    type: "website",
  },
};

const contactMethods = [
  {
    icon: Mail,
    title: "Email",
    value: "admin@getmova.my.id",
    description: "Untuk pertanyaan umum, saran, dan masukan. Kami merespons dalam 2×24 jam kerja.",
    href: "mailto:admin@getmova.my.id",
  },
  {
    icon: MessageCircle,
    title: "TikTok",
    value: "@abbbuw",
    description: "Follow kami di TikTok untuk update terbaru dan tips seputar download video.",
    href: "https://tiktok.com/@abbbuw",
  },
  {
    icon: Send,
    title: "Telegram",
    value: "@sixte3nnn",
    description: "Hubungi kami via Telegram untuk respons yang lebih cepat dan komunikasi langsung.",
    href: "https://t.me/sixte3nnn",
  },
];

const faqs = [
  {
    icon: HelpCircle,
    question: "Video tidak bisa diunduh, apa yang harus dilakukan?",
    answer:
      "Pastikan URL yang Anda masukkan valid dan konten tersebut tersedia secara publik. Beberapa konten yang bersifat privat atau dilindungi mungkin tidak dapat diunduh. Jika masalah berlanjut, coba gunakan browser yang berbeda atau hapus cache browser Anda. Anda juga bisa menghubungi kami untuk bantuan lebih lanjut.",
  },
  {
    icon: HelpCircle,
    question: "Apakah Mova benar-benar gratis?",
    answer:
      "Ya, Mova sepenuhnya gratis tanpa biaya tersembunyi. Kami tidak memerlukan pendaftaran akun dan tidak membatasi jumlah download. Layanan ini didukung oleh iklan untuk menutupi biaya operasional server.",
  },
  {
    icon: HelpCircle,
    question: "Platform apa saja yang didukung Mova?",
    answer:
      "Mova saat ini mendukung TikTok, YouTube, Instagram, Facebook, Twitter/X, Pinterest, dan Reddit. Kami terus menambahkan dukungan untuk platform baru berdasarkan permintaan pengguna.",
  },
  {
    icon: HelpCircle,
    question: "Apakah Mova menyimpan data pribadi saya?",
    answer:
      "Tidak. Mova tidak mengumpulkan, menyimpan, atau memproses data pribadi Anda. Kami tidak memerlukan pendaftaran akun dan tidak menggunakan cookie pelacakan. Baca Kebijakan Privasi kami untuk informasi lebih lanjut.",
  },
  {
    icon: HelpCircle,
    question: "Mengapa hasil download memiliki watermark?",
    answer:
      "Mova berusaha untuk menyediakan konten tanpa watermark. Namun, untuk beberapa platform atau jenis konten tertentu, watermark mungkin tidak dapat dihapus karena keterbatasan teknis. Kami terus meningkatkan teknologi kami untuk memberikan hasil terbaik.",
  },
  {
    icon: HelpCircle,
    question: "Bagaimana cara melaporkan pelanggaran hak cipta?",
    answer:
      "Jika Anda adalah pemilik hak cipta dan percaya bahwa konten Anda diakses melalui Mova secara tidak sah, silakan hubungi kami di admin@getmova.my.id dengan menyertakan URL konten dan bukti kepemilikan. Kami akan menindaklanjuti laporan Anda sesuai dengan prosedur DMCA.",
  },
];

const reportTypes = [
  {
    icon: Bug,
    title: "Laporkan Bug",
    description: "Temukan masalah teknis? Laporkan bug agar kami dapat memperbaikinya segera.",
  },
  {
    icon: AlertTriangle,
    title: "Laporkan Penyalahgunaan",
    description:
      "Jika Anda menemukan konten yang melanggar hukum atau penyalahgunaan layanan, beritahu kami.",
  },
  {
    icon: Shield,
    title: "Masalah Hak Cipta",
    description:
      "Pemilik hak cipta dapat menghubungi kami untuk mengajukan penghapusan konten sesuai prosedur DMCA.",
  },
];

export default function ContactPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Hubungi Kami - getmova",
    description:
      "Hubungi tim Mova untuk pertanyaan, saran, laporan bug, atau masalah lainnya. Kami siap membantu Anda!",
    url: "https://getmova.my.id/contact",
    isPartOf: {
      "@type": "WebSite",
      name: "getmova",
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
          name: "Hubungi Kami",
          item: "https://getmova.my.id/contact",
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
      <div className="min-h-screen flex flex-col bg-white dark:bg-[#09090B] text-foreground dark:text-[#FAFAFA]">
        {/* Header */}
        <header className="border-b border-border dark:border-[#27272A] bg-card dark:bg-[#111113]">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <a href="/" className="flex items-center gap-2">
                <MovaLogo size={32} showText />
              </a>
              <a
                href="/"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border border-border dark:border-[#27272A] bg-card dark:bg-[#111113] text-foreground dark:text-[#FAFAFA] hover:bg-muted/50 dark:hover:bg-[#18181B] transition-colors"
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
              <ol className="flex items-center gap-1.5 text-sm text-muted-foreground dark:text-[#A1A1AA]">
                <li>
                  <a href="/" className="hover:text-[#10B981] transition-colors">
                    Beranda
                  </a>
                </li>
                <li>
                  <ChevronRight className="h-3.5 w-3.5" />
                </li>
                <li className="text-[#10B981] font-medium">Hubungi Kami</li>
              </ol>
            </nav>

            {/* Title section */}
            <div className="text-center mb-16">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium tracking-wider uppercase border border-border dark:border-[#27272A] text-muted-foreground dark:text-[#A1A1AA] mb-6">
                <Mail className="h-3 w-3 text-[#10B981]" />
                Kontak
              </span>
              <h1
                className="text-4xl sm:text-5xl font-light tracking-tight text-foreground dark:text-[#FAFAFA] mb-4 mt-4"
                style={{ fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif" }}
              >
                Hubungi{" "}
                <span className="font-bold text-[#10B981]">Kami</span>
              </h1>
              <p className="text-muted-foreground dark:text-[#A1A1AA] text-sm max-w-xl mx-auto leading-relaxed">
                Kami selalu senang mendengar dari Anda. Baik pertanyaan, saran, masukan, atau laporan masalah — tim kami siap membantu.
              </p>
            </div>

            {/* Contact methods */}
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-card dark:bg-[#111113] border border-border dark:border-[#27272A] shrink-0">
                  <Globe className="h-5 w-5 text-[#10B981]" />
                </div>
                <h2
                  className="text-xl font-bold text-foreground dark:text-[#FAFAFA]"
                  style={{ fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif" }}
                >
                  Cara Menghubungi Kami
                </h2>
              </div>
              <div className="ml-14 grid sm:grid-cols-3 gap-4">
                {contactMethods.map((method, index) => (
                  <a
                    key={index}
                    href={method.href}
                    target={method.href.startsWith("http") ? "_blank" : undefined}
                    rel={method.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="p-5 rounded-xl bg-card dark:bg-[#111113] border border-border dark:border-[#27272A] hover:border-[#10B981]/30 transition-colors group block"
                  >
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-background dark:bg-[#09090B] border border-border dark:border-[#27272A] mb-3 group-hover:border-[#10B981]/30 transition-colors">
                      <method.icon className="h-5 w-5 text-[#10B981]" />
                    </div>
                    <h3
                      className="text-base font-bold text-foreground dark:text-[#FAFAFA] mb-1"
                      style={{ fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif" }}
                    >
                      {method.title}
                    </h3>
                    <p className="text-sm text-[#10B981] font-medium mb-2">{method.value}</p>
                    <p className="text-xs text-muted-foreground dark:text-[#A1A1AA] leading-relaxed">{method.description}</p>
                  </a>
                ))}
              </div>
            </div>

            {/* Response time notice */}
            <div className="mb-12 p-5 rounded-xl bg-card dark:bg-[#111113] border-l-4 border-[#10B981]">
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-[#10B981] mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm text-foreground dark:text-[#FAFAFA] font-medium mb-1">Waktu Respons</p>
                  <p className="text-sm text-muted-foreground dark:text-[#A1A1AA] leading-relaxed">
                    Kami berusaha merespons semua pesan dalam waktu 2×24 jam kerja. Untuk pertanyaan mendesak, hubungi kami melalui Telegram untuk respons yang lebih cepat. Untuk laporan hak cipta (DMCA), kirim email ke admin@getmova.my.id dengan menyertakan URL konten dan bukti kepemilikan.
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="mb-16">
              <ContactForm />
            </div>

            {/* Report types */}
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-card dark:bg-[#111113] border border-border dark:border-[#27272A] shrink-0">
                  <AlertTriangle className="h-5 w-5 text-[#10B981]" />
                </div>
                <h2
                  className="text-xl font-bold text-foreground dark:text-[#FAFAFA]"
                  style={{ fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif" }}
                >
                  Jenis Laporan
                </h2>
              </div>
              <div className="ml-14 grid sm:grid-cols-3 gap-4">
                {reportTypes.map((type, index) => (
                  <div
                    key={index}
                    className="p-5 rounded-xl bg-card dark:bg-[#111113] border border-border dark:border-[#27272A]"
                  >
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-background dark:bg-[#09090B] border border-border dark:border-[#27272A] mb-3">
                      <type.icon className="h-5 w-5 text-[#10B981]" />
                    </div>
                    <h3
                      className="text-base font-bold text-foreground dark:text-[#FAFAFA] mb-2"
                      style={{ fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif" }}
                    >
                      {type.title}
                    </h3>
                    <p className="text-sm text-muted-foreground dark:text-[#A1A1AA] leading-relaxed">{type.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ */}
            <div className="mb-16">
              <div className="text-center mb-10">
                <h2
                  className="text-2xl font-bold text-foreground dark:text-[#FAFAFA] mb-3"
                  style={{ fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif" }}
                >
                  Pertanyaan <span className="text-[#10B981]">Umum</span>
                </h2>
                <p className="text-sm text-muted-foreground dark:text-[#A1A1AA] max-w-lg mx-auto">
                  Temukan jawaban untuk pertanyaan yang sering diajukan tentang Mova.
                </p>
              </div>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="p-5 rounded-xl bg-card dark:bg-[#111113] border border-border dark:border-[#27272A]"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-background dark:bg-[#09090B] border border-border dark:border-[#27272A] shrink-0 mt-0.5">
                        <faq.icon className="h-4 w-4 text-[#10B981]" />
                      </div>
                      <div>
                        <h3
                          className="text-sm font-bold text-foreground dark:text-[#FAFAFA] mb-2"
                          style={{ fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif" }}
                        >
                          {faq.question}
                        </h3>
                        <p className="text-sm text-muted-foreground dark:text-[#A1A1AA] leading-relaxed">{faq.answer}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Related pages */}
            <div className="p-6 rounded-xl bg-card dark:bg-[#111113] border border-border dark:border-[#27272A]">
              <h3
                className="text-sm font-bold text-foreground dark:text-[#FAFAFA] mb-4"
                style={{ fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif" }}
              >
                Halaman Terkait
              </h3>
              <div className="flex flex-wrap gap-3">
                <a
                  href="/privacy"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm border border-border dark:border-[#27272A] bg-white dark:bg-[#09090B] text-muted-foreground dark:text-[#A1A1AA] hover:text-[#10B981] hover:border-[#10B981]/30 transition-colors"
                >
                  <Shield className="h-4 w-4" />
                  Kebijakan Privasi
                </a>
                <a
                  href="/terms"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm border border-border dark:border-[#27272A] bg-white dark:bg-[#09090B] text-muted-foreground dark:text-[#A1A1AA] hover:text-[#10B981] hover:border-[#10B981]/30 transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  Syarat & Ketentuan
                </a>
                <a
                  href="/about"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm border border-border dark:border-[#27272A] bg-white dark:bg-[#09090B] text-muted-foreground dark:text-[#A1A1AA] hover:text-[#10B981] hover:border-[#10B981]/30 transition-colors"
                >
                  <Globe className="h-4 w-4" />
                  Tentang Kami
                </a>
              </div>
            </div>

            {/* Footer notice */}
            <div className="mt-12 pt-8 border-t border-border dark:border-[#27272A] text-center">
              <p className="text-xs text-muted-foreground dark:text-[#A1A1AA]">
                &copy; 2026 Mova. Semua hak dilindungi. Kami siap membantu Anda kapan saja.
              </p>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

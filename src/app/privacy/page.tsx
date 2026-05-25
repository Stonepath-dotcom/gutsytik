"use client";

import { Home, Shield, Lock, Eye, Globe, FileText, AlertTriangle, Mail, Scale, Server, UserX } from "lucide-react";
import { MovaLogo } from "@/components/mova-logo";

const sections = [
  {
    icon: Eye,
    title: "Pengumpulan Data",
    content: [
      "Mova tidak mengumpulkan, menyimpan, atau memproses data pribadi dari pengguna kami. Kami tidak mewajibkan registrasi, login, atau bentuk identifikasi pribadi apapun.",
      "Saat Anda menggunakan layanan kami, kami hanya memproses URL video yang Anda berikan untuk tujuan mengambil informasi video. URL ini tidak disimpan di server kami setelah proses unduhan selesai.",
      "Kami tidak menyimpan video yang diunduh di server kami. Semua proses unduhan dilakukan langsung dari platform sumber.",
    ],
  },
  {
    icon: Globe,
    title: "Penggunaan Data",
    content: [
      "Karena kami tidak mengumpulkan data pribadi, tidak ada penggunaan data yang perlu dijelaskan. Aktivitas browsing dan unduhan Anda di Mova tetap privat dan tidak dilacak, dianalisis, atau dijual kepada pihak ketiga.",
      "Statistik unduhan yang disimpan secara lokal di browser Anda (melalui localStorage) hanya digunakan untuk memberikan pengalaman yang dipersonalisasi, seperti menampilkan riwayat unduhan dan jumlah streak. Data ini tidak pernah meninggalkan perangkat Anda.",
    ],
  },
  {
    icon: Server,
    title: "Layanan Pihak Ketiga",
    content: [
      "Mova dapat menggunakan API pihak ketiga untuk mengambil informasi video dari platform yang didukung (TikTok, Instagram, YouTube, dll.). Layanan ini memiliki kebijakan privasi sendiri yang mengatur data yang mereka kumpulkan.",
      "Kami menggunakan API Invidious untuk fitur terkait YouTube. Invidious adalah front-end berbasis privasi untuk YouTube yang tidak melacak pengguna.",
      "Website kami di-hosting di Vercel, yang mungkin mengumpulkan data analitik web standar seperti yang dijelaskan dalam kebijakan privasi Vercel.",
    ],
  },
  {
    icon: Lock,
    title: "Cookie & Penyimpanan Lokal",
    content: [
      "Mova menggunakan penyimpanan lokal browser (localStorage) untuk menyimpan preferensi Anda, termasuk: preferensi bahasa, riwayat unduhan, video yang disimpan (bookmark), statistik unduhan, dan pengaturan suara.",
      "Kami tidak menggunakan cookie pelacakan. Semua data yang disimpan secara lokal di browser Anda dapat dihapus kapan saja melalui pengaturan browser atau dengan menggunakan fitur 'Hapus Semua' di dalam aplikasi.",
    ],
  },
  {
    icon: UserX,
    title: "Hak Pengguna",
    content: [
      "Anda memiliki kendali penuh atas data Anda. Karena semua data disimpan secara lokal di browser Anda, Anda dapat:",
      "Melihat data Anda kapan saja melalui antarmuka aplikasi (riwayat, bookmark, statistik).",
      "Menghapus data Anda dengan membersihkan localStorage browser atau menggunakan fitur 'Hapus Semua' di dalam aplikasi.",
    ],
  },
  {
    icon: FileText,
    title: "DMCA & Hak Cipta",
    content: [
      "Mova adalah alat bantu yang memfasilitasi pengunduhan konten yang tersedia secara publik. Kami tidak menyimpan, mendistribusikan, atau menjadi tuan rumah atas materi berhak cipta apapun.",
      "Pengguna bertanggung jawab sepenuhnya untuk memastikan bahwa mereka memiliki hak untuk mengunduh dan menggunakan konten apapun yang diakses melalui layanan kami.",
      "Jika Anda meyakini bahwa konten berhak cipta Anda diakses secara melanggar hak Anda, silakan hubungi kami di support@getmova.my.id dengan menyertakan URL yang bersangkutan dan bukti kepemilikan.",
    ],
  },
  {
    icon: Scale,
    title: "Disclaimer",
    content: [
      "Mova adalah alat gratis yang disediakan 'sebagaimana adanya' tanpa jaminan apapun, baik tersurat maupun tersirat. Kami tidak menjamin ketersediaan, akurasi, atau keandalan layanan ini.",
      "Kami tidak bertanggung jawab atas penyalahgunaan konten yang diunduh. Pengguna harus mematuhi ketentuan layanan dari platform asli dan hukum hak cipta yang berlaku.",
      "Mova tidak menyimpan video yang diunduh. Semua proses unduhan dilakukan langsung dari platform sumber.",
      "Kami berhak memodifikasi atau menghentikan layanan ini kapan saja tanpa pemberitahuan sebelumnya.",
    ],
  },
  {
    icon: Mail,
    title: "Hubungi Kami",
    content: [
      "Jika Anda memiliki pertanyaan tentang Kebijakan Privasi atau Syarat & Ketentuan ini, silakan hubungi kami di:",
      "Email: support@getmova.my.id",
      "TikTok: @abbbuw",
      "Telegram: @sixte3nnn",
    ],
  },
];

export default function PrivacyPage() {
  const lastUpdated = "25 Mei 2026";

  return (
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
          {/* Title section */}
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium tracking-wider uppercase border border-[#27272A] text-[#A1A1AA] mb-6">
              <Shield className="h-3 w-3 text-[#2563EB]" />
              Legal
            </span>
            <h1 className="text-4xl sm:text-5xl font-light tracking-tight text-[#FAFAFA] mb-4 mt-4">
              Kebijakan Privasi &{" "}
              <span className="font-bold text-[#2563EB]">Syarat Ketentuan</span>
            </h1>
            <p className="text-[#A1A1AA] text-sm max-w-xl mx-auto leading-relaxed">
              Privasi Anda penting bagi kami. Mova dirancang sebagai alat yang mengutamakan privasi dan tidak mengumpulkan data pribadi Anda.
            </p>
            <p className="text-xs text-[#A1A1AA]/60 mt-3">
              Terakhir diperbarui: {lastUpdated}
            </p>
          </div>

          {/* Important notice */}
          <div className="mb-12 p-6 rounded-xl bg-[#111113] border-l-4 border-[#2563EB]">
            <p className="text-sm text-[#FAFAFA] font-medium">
              Mova adalah alat gratis. Kami tidak menyimpan video yang diunduh. Semua proses unduhan dilakukan langsung dari platform sumber.
            </p>
          </div>

          {/* Sections */}
          <div className="space-y-12">
            {sections.map((section, index) => (
              <section key={index} className="scroll-mt-20">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-[#111113] border border-[#27272A]">
                    <section.icon className="h-5 w-5 text-[#2563EB]" />
                  </div>
                  <h2 className="text-lg font-bold text-[#FAFAFA]">{section.title}</h2>
                </div>
                <div className="ml-14 space-y-3">
                  {section.content.map((paragraph, pIndex) => (
                    <p key={pIndex} className="text-sm text-[#A1A1AA] leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          {/* Internal Links */}
          <div className="mt-16 pt-8 border-t border-[#27272A]">
            <h3 className="text-sm font-semibold text-[#FAFAFA] mb-4">Halaman Terkait</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <a href="/terms" className="flex items-center justify-between p-4 rounded-lg border border-[#27272A] bg-[#111113] hover:border-[#2563EB]/50 transition-colors group">
                <span className="text-sm text-[#A1A1AA] group-hover:text-[#FAFAFA]">Syarat & Ketentuan</span>
                <span className="text-[#A1A1AA] group-hover:text-[#2563EB] transition-colors">&rarr;</span>
              </a>
              <a href="/about" className="flex items-center justify-between p-4 rounded-lg border border-[#27272A] bg-[#111113] hover:border-[#2563EB]/50 transition-colors group">
                <span className="text-sm text-[#A1A1AA] group-hover:text-[#FAFAFA]">Tentang Kami</span>
                <span className="text-[#A1A1AA] group-hover:text-[#2563EB] transition-colors">&rarr;</span>
              </a>
              <a href="/disclaimer" className="flex items-center justify-between p-4 rounded-lg border border-[#27272A] bg-[#111113] hover:border-[#2563EB]/50 transition-colors group">
                <span className="text-sm text-[#A1A1AA] group-hover:text-[#FAFAFA]">Disclaimer</span>
                <span className="text-[#A1A1AA] group-hover:text-[#2563EB] transition-colors">&rarr;</span>
              </a>
            </div>
          </div>

          {/* Footer notice */}
          <div className="mt-8 pt-6 border-t border-[#27272A] text-center">
            <p className="text-xs text-[#A1A1AA]">
              &copy; 2026 Mova. All rights reserved. Kebijakan ini dapat diperbarui dari waktu ke waktu.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

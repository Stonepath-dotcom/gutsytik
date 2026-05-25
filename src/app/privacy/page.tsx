"use client";

import { Home, Shield, Lock, Eye, Globe, FileText, AlertTriangle, Mail } from "lucide-react";
import { MovaLogo } from "@/components/mova-logo";

const sections = [
  {
    icon: Eye,
    title: "Data Collection",
    content: [
      "Mova does not collect, store, or process any personal data from our users. We do not require user registration, login, or any form of personal identification.",
      "When you use our service, we temporarily process the video URL you provide solely for the purpose of fetching the video information. This URL is not stored on our servers after the download is complete.",
      "We do not store any downloaded videos on our servers. All downloads are processed directly from the source platform.",
    ],
  },
  {
    icon: Globe,
    title: "How We Use Data",
    content: [
      "Since we do not collect personal data, there is no data usage to describe. Your browsing and downloading activity on Mova remains private and is not tracked, analyzed, or sold to third parties.",
      "Download statistics stored locally in your browser (via localStorage) are used solely to provide you with a personalized experience, such as showing your download history and streak count. This data never leaves your device.",
    ],
  },
  {
    icon: Shield,
    title: "Third-Party Services",
    content: [
      "Mova may use third-party APIs to fetch video information from supported platforms (TikTok, Instagram, YouTube, etc.). These services have their own privacy policies governing the data they collect.",
      "We use Invidious API for YouTube-related features. Invidious is a privacy-focused front-end for YouTube that does not track users.",
      "Our website is hosted on Vercel, which may collect standard web analytics data as described in Vercel's privacy policy.",
    ],
  },
  {
    icon: Lock,
    title: "Cookies & Local Storage",
    content: [
      "Mova uses browser localStorage to save your preferences, including: language preference, download history, bookmarked videos, download statistics, and sound settings.",
      "We do not use tracking cookies. All data stored locally in your browser can be cleared at any time through your browser settings or by using the 'Clear All' feature within the app.",
    ],
  },
  {
    icon: FileText,
    title: "User Rights",
    content: [
      "You have complete control over your data. Since all data is stored locally in your browser, you can:",
      "View your data at any time through the app's interface (history, bookmarks, statistics).",
      "Delete your data by clearing your browser's localStorage or using the in-app 'Clear All' features.",
      "Export your download history in CSV or JSON format for your records.",
    ],
  },
  {
    icon: AlertTriangle,
    title: "DMCA & Copyright",
    content: [
      "Mova is a tool that facilitates downloading publicly available content. We do not host, store, or distribute any copyrighted material.",
      "Users are solely responsible for ensuring they have the right to download and use any content accessed through our service.",
      "If you believe your copyrighted content is being accessed in violation of your rights, please contact us at support@getmova.my.id with the URL in question and proof of ownership.",
    ],
  },
  {
    icon: Shield,
    title: "Disclaimer",
    content: [
      "Mova is a free tool provided 'as is' without any warranties, express or implied. We do not guarantee the availability, accuracy, or reliability of the service.",
      "We are not responsible for any misuse of downloaded content. Users must comply with the terms of service of the original platforms and applicable copyright laws.",
      "Mova does not store any downloaded videos. All downloads are processed directly from the source platform.",
      "We reserve the right to modify or discontinue the service at any time without prior notice.",
    ],
  },
  {
    icon: Mail,
    title: "Contact Us",
    content: [
      "If you have any questions about this Privacy Policy or Terms of Service, please contact us at:",
      "Email: support@getmova.my.id",
      "TikTok: @abbbuw",
      "Telegram: @sixte3nnn",
    ],
  },
];

export default function PrivacyPage() {
  const lastUpdated = "March 4, 2026";

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
              Homepage
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
              <Shield className="h-3 w-3 text-[#F97316]" />
              Legal
            </span>
            <h1 className="text-4xl sm:text-5xl font-light tracking-tight text-[#FAFAFA] mb-4 mt-4">
              Privacy Policy &{" "}
              <span className="font-bold text-[#F97316]">Terms of Service</span>
            </h1>
            <p className="text-[#A1A1AA] text-sm max-w-xl mx-auto leading-relaxed">
              Your privacy matters to us. Mova is designed to be a privacy-first tool that doesn&apos;t collect your personal data.
            </p>
            <p className="text-xs text-[#A1A1AA]/60 mt-3">
              Last updated: {lastUpdated}
            </p>
          </div>

          {/* Important notice */}
          <div className="mb-12 p-6 rounded-xl bg-[#111113] border-l-4 border-[#F97316]">
            <p className="text-sm text-[#FAFAFA] font-medium">
              Mova is a free tool. We do not store any downloaded videos. All downloads are processed directly from the source platform.
            </p>
          </div>

          {/* Sections */}
          <div className="space-y-12">
            {sections.map((section, index) => (
              <section key={index} className="scroll-mt-20">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-[#111113] border border-[#27272A]">
                    <section.icon className="h-5 w-5 text-[#F97316]" />
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
              <a href="/terms" className="flex items-center justify-between p-4 rounded-lg border border-[#27272A] bg-[#111113] hover:border-[#F97316]/50 transition-colors group">
                <span className="text-sm text-[#A1A1AA] group-hover:text-[#FAFAFA]">Syarat & Ketentuan</span>
                <span className="text-[#A1A1AA] group-hover:text-[#F97316] transition-colors">→</span>
              </a>
              <a href="/about" className="flex items-center justify-between p-4 rounded-lg border border-[#27272A] bg-[#111113] hover:border-[#F97316]/50 transition-colors group">
                <span className="text-sm text-[#A1A1AA] group-hover:text-[#FAFAFA]">Tentang Kami</span>
                <span className="text-[#A1A1AA] group-hover:text-[#F97316] transition-colors">→</span>
              </a>
              <a href="/contact" className="flex items-center justify-between p-4 rounded-lg border border-[#27272A] bg-[#111113] hover:border-[#F97316]/50 transition-colors group">
                <span className="text-sm text-[#A1A1AA] group-hover:text-[#FAFAFA]">Hubungi Kami</span>
                <span className="text-[#A1A1AA] group-hover:text-[#F97316] transition-colors">→</span>
              </a>
            </div>
          </div>

          {/* Footer notice */}
          <div className="mt-8 pt-6 border-t border-[#27272A] text-center">
            <p className="text-xs text-[#A1A1AA]">
              &copy; 2026 Mova. All rights reserved. This policy may be updated from time to time.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

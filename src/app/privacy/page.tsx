"use client";

import { Home, Shield, Lock, Eye, Globe, FileText, AlertTriangle, Mail } from "lucide-react";
import { GutsytikLogo } from "@/components/gutsytik-logo";

const sections = [
  {
    icon: Eye,
    title: "Data Collection",
    content: [
      "Gutsytik does not collect, store, or process any personal data from our users. We do not require user registration, login, or any form of personal identification.",
      "When you use our service, we temporarily process the video URL you provide solely for the purpose of fetching the video information. This URL is not stored on our servers after the download is complete.",
      "We do not store any downloaded videos on our servers. All downloads are processed directly from the source platform.",
    ],
  },
  {
    icon: Globe,
    title: "How We Use Data",
    content: [
      "Since we do not collect personal data, there is no data usage to describe. Your browsing and downloading activity on Gutsytik remains private and is not tracked, analyzed, or sold to third parties.",
      "Download statistics stored locally in your browser (via localStorage) are used solely to provide you with a personalized experience, such as showing your download history and streak count. This data never leaves your device.",
    ],
  },
  {
    icon: Shield,
    title: "Third-Party Services",
    content: [
      "Gutsytik may use third-party APIs to fetch video information from supported platforms (TikTok, Instagram, YouTube, etc.). These services have their own privacy policies governing the data they collect.",
      "We use Invidious API for YouTube-related features. Invidious is a privacy-focused front-end for YouTube that does not track users.",
      "Our website is hosted on Vercel, which may collect standard web analytics data as described in Vercel's privacy policy.",
    ],
  },
  {
    icon: Lock,
    title: "Cookies & Local Storage",
    content: [
      "Gutsytik uses browser localStorage to save your preferences, including: language preference, accent color choice, download history, bookmarked videos, download statistics, and sound settings.",
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
      "Gutsytik is a tool that facilitates downloading publicly available content. We do not host, store, or distribute any copyrighted material.",
      "Users are solely responsible for ensuring they have the right to download and use any content accessed through our service.",
      "If you believe your copyrighted content is being accessed in violation of your rights, please contact us at support@gutsytik.vercel.app with the URL in question and proof of ownership.",
    ],
  },
  {
    icon: Shield,
    title: "Disclaimer",
    content: [
      "Gutsytik is a free tool provided 'as is' without any warranties, express or implied. We do not guarantee the availability, accuracy, or reliability of the service.",
      "We are not responsible for any misuse of downloaded content. Users must comply with the terms of service of the original platforms and applicable copyright laws.",
      "Gutsytik does not store any downloaded videos. All downloads are processed directly from the source platform.",
      "We reserve the right to modify or discontinue the service at any time without prior notice.",
    ],
  },
  {
    icon: Mail,
    title: "Contact Us",
    content: [
      "If you have any questions about this Privacy Policy or Terms of Service, please contact us at:",
      "Email: support@gutsytik.vercel.app",
      "TikTok: @abbbuw",
      "Telegram: @sixte3nnn",
    ],
  },
];

export default function PrivacyPage() {
  const lastUpdated = "March 4, 2026";

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-md">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <a href="/" className="flex items-center gap-2">
              <GutsytikLogo size={32} showText />
            </a>
            <a
              href="/"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border border-border bg-card text-foreground hover:bg-muted transition-colors"
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
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass mb-4">
              <Shield className="h-4 w-4 text-gutsy-pink" />
              <span className="text-sm font-medium text-foreground">Legal</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
              Privacy Policy &{" "}
              <span className="gradient-text">Terms of Service</span>
            </h1>
            <p className="text-muted-foreground text-base max-w-xl mx-auto">
              Your privacy matters to us. Gutsytik is designed to be a privacy-first tool that doesn&apos;t collect your personal data.
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              Last updated: {lastUpdated}
            </p>
          </div>

          {/* Important notice */}
          <div className="mb-10 p-4 rounded-xl glass border-l-4 border-gutsy-pink">
            <p className="text-sm text-foreground font-medium">
              Gutsytik is a free tool. We do not store any downloaded videos. All downloads are processed directly from the source platform.
            </p>
          </div>

          {/* Sections */}
          <div className="space-y-8">
            {sections.map((section, index) => (
              <section key={index} className="scroll-mt-20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, rgba(255,45,85,0.15), rgba(124,58,237,0.15))" }}>
                    <section.icon className="h-5 w-5 text-gutsy-pink" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">{section.title}</h2>
                </div>
                <div className="ml-[52px] space-y-2">
                  {section.content.map((paragraph, pIndex) => (
                    <p key={pIndex} className="text-sm text-muted-foreground leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          {/* Footer notice */}
          <div className="mt-16 pt-8 border-t border-border text-center">
            <p className="text-xs text-muted-foreground">
              &copy; 2026 Gutsytik. All rights reserved. This policy may be updated from time to time.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

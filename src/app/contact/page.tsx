"use client";

import React, { useState } from "react";
import { Home, Mail, MessageSquare, Send, ChevronDown, ChevronUp, ArrowRight } from "lucide-react";
import { MovaLogo } from "@/components/mova-logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const contactMethods = [
  {
    icon: Mail,
    title: "Email",
    description: "Kirim email untuk pertanyaan atau laporan masalah",
    value: "support@getmova.my.id",
    href: "mailto:support@getmova.my.id",
  },
  {
    icon: () => (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.43V13a8.28 8.28 0 005.58 2.15V11.7a4.83 4.83 0 01-3.77-1.24V6.69h3.77z"/>
      </svg>
    ),
    title: "TikTok",
    description: "Follow dan hubungi kami di TikTok",
    value: "@abbbuw",
    href: "https://tiktok.com/@abbbuw",
  },
  {
    icon: () => (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
      </svg>
    ),
    title: "Telegram",
    description: "Chat langsung dengan tim kami di Telegram",
    value: "@sixte3nnn",
    href: "https://t.me/sixte3nnn",
  },
];

const faqItems = [
  {
    question: "Bagaimana cara menghubungi tim Mova?",
    answer: "Kamu bisa menghubungi kami melalui email di support@getmova.my.id, TikTok @abbbuw, atau Telegram @sixte3nnn. Kami akan berusaha membalas pesan kamu secepat mungkin.",
  },
  {
    question: "Berapa lama waktu respons dari tim Mova?",
    answer: "Kami biasanya membalas pesan dalam waktu 1-3 hari kerja. Untuk pertanyaan yang mendesak, kami sarankan menghubungi kami melalui Telegram untuk respons yang lebih cepat.",
  },
  {
    question: "Bagaimana cara melaporkan bug atau masalah?",
    answer: "Kamu bisa melaporkan bug atau masalah melalui formulir kontak di halaman ini, atau langsung email ke support@getmova.my.id dengan menyertakan deskripsi masalah dan langkah-langkah untuk mereproduksinya.",
  },
  {
    question: "Apakah Mova menerima saran fitur baru?",
    answer: "Tentu saja! Kami sangat menghargai saran dari pengguna. Silakan kirim saran kamu melalui formulir kontak atau media sosial kami.",
  },
  {
    question: "Bagaimana cara mengajukan penghapusan konten berdasarkan DMCA?",
    answer: "Jika kamu adalah pemilik hak cipta dan ingin mengajukan penghapusan konten, silakan kirim email ke support@getmova.my.id dengan menyertakan URL konten yang bersangkutan dan bukti kepemilikan hak cipta.",
  },
];

export default function ContactPage() {
  const { toast, dismiss } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      const id = toast({ title: "Error", description: "Harap isi semua field.", variant: "destructive" });
      setTimeout(() => dismiss(id), 3000);
      return;
    }
    setSubmitting(true);
    // Simulate submission
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSubmitting(false);
    setName("");
    setEmail("");
    setMessage("");
    const id = toast({ title: "Pesan Terkirim!", description: "Terima kasih telah menghubungi kami. Kami akan segera membalas pesan Anda." });
    setTimeout(() => dismiss(id), 4000);
  };

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
              <MessageSquare className="h-3 w-3 text-[#F97316]" />
              Kontak
            </span>
            <h1 className="text-4xl sm:text-5xl font-light tracking-tight text-[#FAFAFA] mb-4 mt-4">
              Hubungi{" "}
              <span className="font-bold text-[#F97316]">Kami</span>
            </h1>
            <p className="text-[#A1A1AA] text-sm max-w-xl mx-auto leading-relaxed">
              Punya pertanyaan, saran, atau ingin melaporkan masalah? Kami siap membantu kamu.
            </p>
          </div>

          {/* Contact Methods */}
          <section className="mb-16">
            <h2 className="text-lg font-bold text-[#FAFAFA] mb-6">Cara Menghubungi Kami</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {contactMethods.map((method, i) => (
                <a
                  key={i}
                  href={method.href}
                  target={method.href.startsWith("mailto") ? undefined : "_blank"}
                  rel={method.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                  className="p-6 rounded-xl border border-[#27272A] bg-[#111113] hover:border-[#F97316]/50 transition-colors group block"
                >
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-[#09090B] border border-[#27272A] mb-4 group-hover:border-[#F97316]/50 transition-colors">
                    <method.icon className="h-5 w-5 text-[#F97316]" />
                  </div>
                  <h3 className="text-sm font-semibold text-[#FAFAFA] mb-1">{method.title}</h3>
                  <p className="text-xs text-[#A1A1AA] mb-2">{method.description}</p>
                  <p className="text-sm text-[#F97316] font-medium">{method.value}</p>
                </a>
              ))}
            </div>
          </section>

          {/* Contact Form */}
          <section className="mb-16">
            <h2 className="text-lg font-bold text-[#FAFAFA] mb-6">Kirim Pesan</h2>
            <form onSubmit={handleSubmit} className="p-6 rounded-xl border border-[#27272A] bg-[#111113] space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-[#A1A1AA] mb-1.5 block font-medium">Nama</label>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nama kamu"
                    className="h-10 bg-[#09090B] border-[#27272A] text-[#FAFAFA] text-sm placeholder:text-[#A1A1AA]/50 focus:border-[#F97316]/50"
                  />
                </div>
                <div>
                  <label className="text-xs text-[#A1A1AA] mb-1.5 block font-medium">Email</label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@contoh.com"
                    className="h-10 bg-[#09090B] border-[#27272A] text-[#FAFAFA] text-sm placeholder:text-[#A1A1AA]/50 focus:border-[#F97316]/50"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs text-[#A1A1AA] mb-1.5 block font-medium">Pesan</label>
                <Textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tulis pesan kamu di sini..."
                  rows={5}
                  className="bg-[#09090B] border-[#27272A] text-[#FAFAFA] text-sm placeholder:text-[#A1A1AA]/50 focus:border-[#F97316]/50 resize-none"
                />
              </div>
              <Button
                type="submit"
                disabled={submitting}
                className="bg-[#F97316] text-white font-semibold hover:bg-[#EA580C] rounded-lg"
              >
                {submitting ? (
                  <span className="flex items-center gap-2">
                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Mengirim...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Send className="h-4 w-4" />
                    Kirim Pesan
                  </span>
                )}
              </Button>
            </form>
          </section>

          {/* FAQ Section */}
          <section className="mb-16">
            <h2 className="text-lg font-bold text-[#FAFAFA] mb-6">Pertanyaan Umum</h2>
            <div className="space-y-3">
              {faqItems.map((faq, i) => (
                <div
                  key={i}
                  className="border border-[#27272A] rounded-lg bg-[#111113] overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-[#18181B] transition-colors"
                  >
                    <span className="text-sm font-medium text-[#FAFAFA]">{faq.question}</span>
                    {openFaq === i ? (
                      <ChevronUp className="h-4 w-4 text-[#F97316] shrink-0" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-[#A1A1AA] shrink-0" />
                    )}
                  </button>
                  {openFaq === i && (
                    <div className="px-4 pb-4">
                      <p className="text-sm text-[#A1A1AA] leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Internal Links */}
          <div className="mt-16 pt-8 border-t border-[#27272A]">
            <h3 className="text-sm font-semibold text-[#FAFAFA] mb-4">Halaman Terkait</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <a href="/privacy" className="flex items-center justify-between p-4 rounded-lg border border-[#27272A] bg-[#111113] hover:border-[#F97316]/50 transition-colors group">
                <span className="text-sm text-[#A1A1AA] group-hover:text-[#FAFAFA]">Kebijakan Privasi</span>
                <ArrowRight className="h-4 w-4 text-[#A1A1AA] group-hover:text-[#F97316] transition-colors" />
              </a>
              <a href="/terms" className="flex items-center justify-between p-4 rounded-lg border border-[#27272A] bg-[#111113] hover:border-[#F97316]/50 transition-colors group">
                <span className="text-sm text-[#A1A1AA] group-hover:text-[#FAFAFA]">Syarat & Ketentuan</span>
                <ArrowRight className="h-4 w-4 text-[#A1A1AA] group-hover:text-[#F97316] transition-colors" />
              </a>
              <a href="/about" className="flex items-center justify-between p-4 rounded-lg border border-[#27272A] bg-[#111113] hover:border-[#F97316]/50 transition-colors group">
                <span className="text-sm text-[#A1A1AA] group-hover:text-[#FAFAFA]">Tentang Kami</span>
                <ArrowRight className="h-4 w-4 text-[#A1A1AA] group-hover:text-[#F97316] transition-colors" />
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
  );
}

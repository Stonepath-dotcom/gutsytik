"use client";

import { useState } from "react";
import { Mail, MessageCircle, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Home } from "lucide-react";
import { MovaLogo } from "@/components/mova-logo";

export default function ContactForm() {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSubmitting(true);
    // Simulate submission
    setTimeout(() => {
      setSubmitting(false);
      setForm({ name: "", email: "", subject: "", message: "" });
      toast({
        title: "Pesan terkirim!",
        description: "Terima kasih telah menghubungi kami. Kami akan membalas pesan Anda sesegera mungkin.",
      });
    }, 800);
  };

  return (
    <div className="rounded-xl bg-[#111113] border border-[#27272A] p-6 sm:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-[#09090B] border border-[#27272A]">
          <MessageCircle className="h-5 w-5 text-[#F97316]" />
        </div>
        <h2
          className="text-xl font-bold text-[#FAFAFA]"
          style={{ fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif" }}
        >
          Kirim Pesan
        </h2>
      </div>
      <p className="text-sm text-[#A1A1AA] mb-6 leading-relaxed">
        Punya pertanyaan, saran, atau ingin melaporkan masalah? Isi formulir di bawah ini dan kami akan merespons secepat mungkin.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-[#FAFAFA] mb-1.5"
            >
              Nama <span className="text-[#F97316]">*</span>
            </label>
            <Input
              id="name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Nama lengkap Anda"
              required
              className="h-10 bg-[#09090B] border-[#27272A] text-[#FAFAFA] placeholder:text-[#52525B] rounded-lg text-sm focus:border-[#F97316]/50 focus:ring-[#F97316]/20"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-[#FAFAFA] mb-1.5"
            >
              Email <span className="text-[#F97316]">*</span>
            </label>
            <Input
              id="email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="contoh@email.com"
              required
              className="h-10 bg-[#09090B] border-[#27272A] text-[#FAFAFA] placeholder:text-[#52525B] rounded-lg text-sm focus:border-[#F97316]/50 focus:ring-[#F97316]/20"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="subject"
            className="block text-sm font-medium text-[#FAFAFA] mb-1.5"
          >
            Subjek
          </label>
          <Input
            id="subject"
            value={form.subject}
            onChange={(e) => setForm({ ...form, subject: e.target.value })}
            placeholder="Perihal pesan Anda"
            className="h-10 bg-[#09090B] border-[#27272A] text-[#FAFAFA] placeholder:text-[#52525B] rounded-lg text-sm focus:border-[#F97316]/50 focus:ring-[#F97316]/20"
          />
        </div>

        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-[#FAFAFA] mb-1.5"
          >
            Pesan <span className="text-[#F97316]">*</span>
          </label>
          <Textarea
            id="message"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            placeholder="Tulis pesan Anda di sini..."
            required
            rows={5}
            className="bg-[#09090B] border-[#27272A] text-[#FAFAFA] placeholder:text-[#52525B] rounded-lg text-sm focus:border-[#F97316]/50 focus:ring-[#F97316]/20 resize-none"
          />
        </div>

        <Button
          type="submit"
          disabled={submitting || !form.name || !form.email || !form.message}
          className="w-full sm:w-auto h-11 px-8 bg-[#F97316] text-white font-semibold rounded-lg hover:bg-[#EA580C] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {submitting ? (
            <>
              <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white mr-2" />
              Mengirim...
            </>
          ) : (
            <>
              <Mail className="h-4 w-4 mr-2" />
              Kirim Pesan
            </>
          )}
        </Button>
      </form>
    </div>
  );
}

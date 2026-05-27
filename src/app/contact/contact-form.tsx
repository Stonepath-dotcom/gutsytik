"use client";

import { useState } from "react";
import { Mail, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

export default function ContactForm() {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setForm({ name: "", email: "", subject: "", message: "" });
        toast({
          title: "Pesan terkirim!",
          description: "Terima kasih telah menghubungi kami. Kami akan membalas pesan Anda sesegera mungkin.",
        });
      } else {
        toast({
          title: "Gagal mengirim",
          description: data.error || "Terjadi kesalahan. Silakan coba lagi.",
          variant: "destructive",
        });
      }
    } catch {
      toast({
        title: "Gagal mengirim",
        description: "Tidak dapat terhubung ke server. Silakan coba lagi nanti.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="rounded-xl bg-card border border-border p-6 sm:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-muted border border-border">
          <MessageCircle className="h-5 w-5 text-[#4F46E5]" />
        </div>
        <h2 className="text-xl font-bold text-foreground font-[family-name:var(--font-montserrat)]">
          Kirim Pesan
        </h2>
      </div>
      <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
        Punya pertanyaan, saran, atau ingin melaporkan masalah? Isi formulir di bawah ini dan kami akan merespons secepat mungkin.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1.5">
              Nama <span className="text-[#4F46E5]">*</span>
            </label>
            <Input
              id="name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Nama lengkap Anda"
              required
              className="h-10 bg-background border-border text-foreground placeholder:text-muted-foreground rounded-lg text-sm focus:border-[#4F46E5]/50 focus:ring-[#4F46E5]/20"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1.5">
              Email <span className="text-[#4F46E5]">*</span>
            </label>
            <Input
              id="email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="contoh@email.com"
              required
              className="h-10 bg-background border-border text-foreground placeholder:text-muted-foreground rounded-lg text-sm focus:border-[#4F46E5]/50 focus:ring-[#4F46E5]/20"
            />
          </div>
        </div>

        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-1.5">
            Subjek
          </label>
          <Input
            id="subject"
            value={form.subject}
            onChange={(e) => setForm({ ...form, subject: e.target.value })}
            placeholder="Perihal pesan Anda"
            className="h-10 bg-background border-border text-foreground placeholder:text-muted-foreground rounded-lg text-sm focus:border-[#4F46E5]/50 focus:ring-[#4F46E5]/20"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1.5">
            Pesan <span className="text-[#4F46E5]">*</span>
          </label>
          <Textarea
            id="message"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            placeholder="Tulis pesan Anda di sini..."
            required
            rows={5}
            className="bg-background border-border text-foreground placeholder:text-muted-foreground rounded-lg text-sm focus:border-[#4F46E5]/50 focus:ring-[#4F46E5]/20 resize-none"
          />
        </div>

        <Button
          type="submit"
          disabled={submitting || !form.name || !form.email || !form.message}
          className="w-full sm:w-auto h-11 px-8 bg-[#4F46E5] text-white font-semibold rounded-lg hover:bg-[#4338CA] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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

"use client";

import React, { useState } from "react";
import { Mail, Check, Loader2, Bell } from "lucide-react";

export function NewsletterCTA() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="mt-8 rounded-xl border border-[#10B981]/20 bg-gradient-to-br from-[#10B981]/5 to-[#34D399]/5 p-5">
      <div className="flex items-start gap-3 mb-3">
        <div className="w-9 h-9 rounded-lg bg-[#10B981]/10 flex items-center justify-center shrink-0">
          <Bell className="h-4.5 w-4.5 text-[#10B981]" />
        </div>
        <div>
          <h3
            className="text-sm font-bold text-foreground"
            style={{ fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif" }}
          >
            Dapatkan Tips Download Video Terbaru
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Berlangganan newsletter Mova untuk mendapatkan panduan terbaru langsung di inbox kamu. Gratis, tanpa spam!
          </p>
        </div>
      </div>

      {status === "success" ? (
        <div className="flex items-center gap-2 p-3 rounded-lg bg-[#10B981]/10 text-sm text-[#10B981] font-medium">
          <Check className="h-4 w-4" />
          Berhasil berlangganan! Cek inbox kamu ya.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex gap-2">
          <div className="flex-1 relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status === "error") setStatus("idle");
              }}
              placeholder="email@kamu.com"
              required
              className="w-full h-10 pl-9 pr-3 rounded-lg bg-card border border-border text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-[#10B981]/30 focus:border-[#10B981]"
            />
          </div>
          <button
            type="submit"
            disabled={status === "loading"}
            className="h-10 px-4 rounded-lg bg-[#10B981] text-white text-sm font-semibold hover:bg-[#059669] transition-colors disabled:opacity-50 flex items-center gap-1.5 shrink-0"
          >
            {status === "loading" ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Langganan"
            )}
          </button>
        </form>
      )}

      {status === "error" && (
        <p className="text-xs text-red-500 mt-2">
          Gagal berlangganan. Coba lagi nanti.
        </p>
      )}

      <p className="text-[10px] text-muted-foreground/50 mt-2">
        Kami menghormati privasi kamu. Berhenti berlangganan kapan saja.
      </p>
    </div>
  );
}

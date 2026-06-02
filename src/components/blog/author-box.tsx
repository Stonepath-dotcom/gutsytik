"use client";

import React from "react";
import { User, Shield, Mail } from "lucide-react";

export function AuthorBox() {
  return (
    <div className="flex items-start gap-4 p-5 rounded-xl bg-card border border-border mt-8">
      <div className="w-12 h-12 rounded-full bg-[#E52222]/20 border-2 border-[#E52222] flex items-center justify-center shrink-0">
        <User className="h-6 w-6 text-[#E52222]" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h4
            className="text-sm font-bold text-foreground"
            style={{ fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif" }}
          >
            Tim Mova
          </h4>
          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-[#E52222]/10 text-[10px] font-bold text-[#E52222]">
            <Shield className="h-2.5 w-2.5" />
            Verified
          </span>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed mb-2">
          Tim Mova terdiri dari developer Indonesia yang bersemangat tentang teknologi dan privasi digital. Kami menulis panduan berdasarkan pengalaman nyata dan riset mendalam untuk membantu kamu download video dengan aman.
        </p>
        <a
          href="mailto:admin@getmova.my.id"
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-[#E52222] transition-colors"
        >
          <Mail className="h-3 w-3" />
          admin@getmova.my.id
        </a>
      </div>
    </div>
  );
}

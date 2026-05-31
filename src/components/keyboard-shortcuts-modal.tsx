"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Keyboard, X } from "lucide-react";

const SHORTCUTS = [
  { keys: ["Ctrl", "V"], description: "Paste link video otomatis" },
  { keys: ["Enter"], description: "Mulai download" },
  { keys: ["Esc"], description: "Tutup dialog / reset form" },
  { keys: ["/"], description: "Fokus ke kolom input" },
  { keys: ["Ctrl", "K"], description: "Buka panduan shortcut" },
  { keys: ["D"], description: "Tema gelap/terang" },
  { keys: ["H"], description: "Kembali ke homepage" },
];

export function KeyboardShortcutsModal() {
  const [isOpen, setIsOpen] = useState(false);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    // Ctrl+K or Cmd+K to open shortcuts
    if ((e.ctrlKey || e.metaKey) && e.key === "k") {
      e.preventDefault();
      setIsOpen((prev) => !prev);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-40 w-11 h-11 rounded-full bg-card border border-border text-muted-foreground shadow-lg flex items-center justify-center transition-all duration-300 hover:text-foreground hover:border-muted-foreground/30 hover:scale-110 active:scale-95"
        aria-label="Pintasan keyboard"
      >
        <Keyboard className="h-5 w-5" />
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-card border border-border rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-2">
            <Keyboard className="h-5 w-5 text-[#10B981]" />
            <h3 className="font-bold text-foreground font-[family-name:var(--font-montserrat)]">
              Pintasan Keyboard
            </h3>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1.5 rounded-lg hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Tutup"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Shortcuts list */}
        <div className="p-4 space-y-3 max-h-[60vh] overflow-y-auto">
          {SHORTCUTS.map((shortcut, i) => (
            <div
              key={i}
              className="flex items-center justify-between gap-4 py-2"
            >
              <span className="text-sm text-muted-foreground">
                {shortcut.description}
              </span>
              <div className="flex items-center gap-1 shrink-0">
                {shortcut.keys.map((key, j) => (
                  <React.Fragment key={j}>
                    <kbd className="inline-flex items-center justify-center min-w-[28px] h-7 px-2 rounded-md bg-muted border border-border text-xs font-mono font-medium text-foreground">
                      {key}
                    </kbd>
                    {j < shortcut.keys.length - 1 && (
                      <span className="text-muted-foreground text-xs">+</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border bg-muted/20">
          <p className="text-xs text-muted-foreground text-center">
            Tekan <kbd className="px-1.5 py-0.5 rounded bg-muted border border-border text-[10px] font-mono">Ctrl+K</kbd> untuk membuka/menutup panduan ini
          </p>
        </div>
      </div>
    </div>
  );
}

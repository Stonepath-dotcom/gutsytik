"use client";

import { useState, useCallback, useEffect } from "react";

const SOUND_KEY = "gutsytik_sound";

function getInitialSound(): boolean {
  if (typeof window === "undefined") return true;
  try {
    const saved = localStorage.getItem(SOUND_KEY);
    if (saved !== null) return saved === "true";
  } catch {}
  return true;
}

export function useSoundToggle() {
  const [soundEnabled, setSoundEnabled] = useState(getInitialSound);

  const toggleSound = useCallback(() => {
    setSoundEnabled((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(SOUND_KEY, String(next));
      } catch {}
      return next;
    });
  }, []);

  // Sync across tabs
  useEffect(() => {
    const handler = (e: StorageEvent) => {
      if (e.key === SOUND_KEY && e.newValue !== null) {
        setSoundEnabled(e.newValue === "true");
      }
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  return { soundEnabled, toggleSound };
}

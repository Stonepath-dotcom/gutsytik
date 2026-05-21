"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const KONAMI_CODE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

function useKonamiCode() {
  const [retroMode, setRetroMode] = useState(false);
  const [sequence, setSequence] = useState<string[]>([]);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle off with Escape
      if (e.key === "Escape" && retroMode) {
        setRetroMode(false);
        setShowNotification(false);
        setSequence([]);
        return;
      }

      const newSequence = [...sequence, e.key].slice(-KONAMI_CODE.length);
      setSequence(newSequence);

      // Check if the sequence matches
      if (
        newSequence.length === KONAMI_CODE.length &&
        newSequence.every((key, idx) => key === KONAMI_CODE[idx])
      ) {
        setRetroMode((prev) => !prev);
        setShowNotification(true);
        setSequence([]);
        setTimeout(() => setShowNotification(false), 3000);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [sequence, retroMode]);

  return { retroMode, showNotification };
}

function KonamiOverlay({
  retroMode,
  showNotification,
}: {
  retroMode: boolean;
  showNotification: boolean;
}) {
  return (
    <>
      {/* Notification Banner */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-4 left-1/2 -translate-x-1/2 z-[10000] px-6 py-3 rounded-lg border-2 border-green-400 shadow-lg shadow-green-400/30"
            style={{
              background: "linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 100%)",
              fontFamily: "monospace",
            }}
          >
            <p className="text-green-400 font-bold text-sm whitespace-nowrap">
              🎮 KONAMI CODE ACTIVATED! Retro Mode{" "}
              {retroMode ? "ON" : "OFF"}!
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CRT Scanlines overlay */}
      {retroMode && (
        <div
          className="fixed inset-0 pointer-events-none scanlines"
          style={{ zIndex: 9990 }}
          aria-hidden="true"
        />
      )}

      {/* CRT Curve overlay */}
      {retroMode && (
        <div
          className="fixed inset-0 pointer-events-none crt-curve"
          style={{ zIndex: 9989 }}
          aria-hidden="true"
        />
      )}
    </>
  );
}

export { useKonamiCode, KonamiOverlay };

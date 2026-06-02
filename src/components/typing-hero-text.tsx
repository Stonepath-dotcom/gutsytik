"use client";

import React, { useState, useEffect, useRef } from "react";

interface TypingHeroTextProps {
  audioMode: boolean;
  t: (key: string) => string;
}

export function TypingHeroText({ audioMode, t }: TypingHeroTextProps) {
  const mainText = audioMode ? t("hero.audioTitle") : t("hero.title");
  const highlightText = audioMode
    ? t("hero.audioTitleHighlight")
    : t("hero.titleHighlight");

  const [phase, setPhase] = useState(0); // 0=typing main, 1=typing highlight, 2=done
  const [displayedMain, setDisplayedMain] = useState("");
  const [displayedHighlight, setDisplayedHighlight] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const animFrameRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);
  const phaseStartRef = useRef<number>(0);

  // Animate typing using requestAnimationFrame
  useEffect(() => {
    let currentPhase = 0;
    let mainIdx = 0;
    let highlightIdx = 0;
    startTimeRef.current = 0;
    phaseStartRef.current = 0;

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;

      if (currentPhase === 0) {
        const elapsed = timestamp - startTimeRef.current;
        const targetChars = Math.min(Math.floor(elapsed / 60), mainText.length);
        if (targetChars > mainIdx) {
          mainIdx = targetChars;
          setDisplayedMain(mainText.slice(0, targetChars));
        }
        if (mainIdx >= mainText.length) {
          currentPhase = 1;
          phaseStartRef.current = timestamp;
          setPhase(1);
        }
      } else if (currentPhase === 1) {
        const elapsed = timestamp - phaseStartRef.current;
        const targetChars = Math.min(
          Math.floor(elapsed / 70),
          highlightText.length
        );
        if (targetChars > highlightIdx) {
          highlightIdx = targetChars;
          setDisplayedHighlight(highlightText.slice(0, targetChars));
        }
        if (highlightIdx >= highlightText.length) {
          currentPhase = 2;
          setPhase(2);
        }
      }

      if (currentPhase < 2) {
        animFrameRef.current = requestAnimationFrame(animate);
      }
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animFrameRef.current);
  }, [mainText, highlightText]);

  // Blink cursor after typing is done
  useEffect(() => {
    if (phase !== 2) return;
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, [phase]);

  const isTyping = phase < 2;

  return (
    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
      {displayedMain}{" "}
      <span className="gradient-text-animated">
        {displayedHighlight}
        <span
          className="inline-block w-[3px] h-[0.85em] ml-1 align-middle"
          style={{
            backgroundColor: phase === 1 ? "#FF2D55" : "#FF6B35",
            opacity: isTyping ? 1 : showCursor ? 1 : 0,
            transition: "opacity 0.1s",
          }}
        />
      </span>
    </h1>
  );
}

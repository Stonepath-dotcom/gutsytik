"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";

interface ConfettiPiece {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  width: number;
  height: number;
  rotation: number;
  rotationSpeed: number;
  alpha: number;
}

const CONFETTI_COLORS = [
  "#FF2D55",
  "#EA580C",
  "#00E5FF",
  "#FF6B8A",
  "#FBBF24",
  "#FBBF24",
  "#10B981",
  "#F97316",
];

function useConfetti() {
  const [active, setActive] = useState(false);
  const piecesRef = useRef<ConfettiPiece[]>([]);
  const animFrameRef = useRef<number>(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const startTimeRef = useRef<number>(0);
  const DURATION = 3000;

  const triggerConfetti = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Generate confetti pieces
    const pieces: ConfettiPiece[] = [];
    for (let i = 0; i < 150; i++) {
      pieces.push({
        x: Math.random() * canvas.width,
        y: -Math.random() * canvas.height * 0.5 - 20,
        vx: (Math.random() - 0.5) * 8,
        vy: Math.random() * 3 + 2,
        color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
        width: Math.random() * 10 + 5,
        height: Math.random() * 6 + 3,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10,
        alpha: 1,
      });
    }
    piecesRef.current = pieces;
    startTimeRef.current = Date.now();
    setActive(true);
  }, []);

  useEffect(() => {
    if (!active) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const animate = () => {
      const elapsed = Date.now() - startTimeRef.current;
      if (elapsed > DURATION) {
        setActive(false);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const fadeStart = DURATION * 0.6;
      const globalAlpha =
        elapsed > fadeStart ? 1 - (elapsed - fadeStart) / (DURATION - fadeStart) : 1;

      const pieces = piecesRef.current;
      for (const p of pieces) {
        p.x += p.vx;
        p.vy += 0.1; // gravity
        p.y += p.vy;
        p.vx *= 0.99;
        p.rotation += p.rotationSpeed;
        p.alpha = globalAlpha;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.width / 2, -p.height / 2, p.width, p.height);
        ctx.restore();
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [active]);

  const ConfettiCanvas = useCallback(() => {
    return (
      <canvas
        ref={(el) => {
          canvasRef.current = el;
        }}
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 9999 }}
        aria-hidden="true"
      />
    );
  }, []);

  return { triggerConfetti, ConfettiCanvas };
}

export { useConfetti };

"use client";

import React, { useRef, useEffect } from "react";

interface TrailDot {
  x: number;
  y: number;
  createdAt: number;
  color: string;
  size: number;
}

const TRAIL_COLORS = ["#FF2D55", "#EA580C", "#FF6B8A", "#FBBF24"];
const DOT_LIFETIME = 500; // ms
const DOT_MAX_SIZE = 6;
const THROTTLE_MS = 16; // ~60fps

export function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotsRef = useRef<TrailDot[]>([]);
  const animFrameRef = useRef<number>(0);
  const lastMoveRef = useRef<number>(0);

  useEffect(() => {
    // Skip on touch devices
    if (typeof window !== "undefined" && "ontouchstart" in window) return;

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

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastMoveRef.current < THROTTLE_MS) return;
      lastMoveRef.current = now;

      dotsRef.current.push({
        x: e.clientX,
        y: e.clientY,
        createdAt: now,
        color: TRAIL_COLORS[Math.floor(Math.random() * TRAIL_COLORS.length)],
        size: DOT_MAX_SIZE * (0.5 + Math.random() * 0.5),
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const now = Date.now();
      const dots = dotsRef.current;

      // Remove expired dots
      dotsRef.current = dots.filter((d) => now - d.createdAt < DOT_LIFETIME);

      for (const dot of dotsRef.current) {
        const age = now - dot.createdAt;
        const progress = age / DOT_LIFETIME;
        const alpha = 1 - progress;
        const size = dot.size * (1 - progress * 0.7);

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, size, 0, Math.PI * 2);
        ctx.fillStyle = dot.color;
        ctx.globalAlpha = alpha * 0.6;
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  // Don't render on touch devices
  if (typeof window !== "undefined" && "ontouchstart" in window) {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 9998 }}
      aria-hidden="true"
    />
  );
}

import React from "react";

interface MovaLogoProps {
  size?: number;
  className?: string;
  showText?: boolean;
}

export function MovaLogo({ size = 40, className = "", showText = true }: MovaLogoProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 512 512"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        <defs>
          <linearGradient id="mova-bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="50%" stopColor="#2563EB" />
            <stop offset="100%" stopColor="#1D4ED8" />
          </linearGradient>
          <linearGradient id="mova-icon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#DBEAFE" />
          </linearGradient>
        </defs>
        <rect width="512" height="512" rx="112" fill="url(#mova-bg)" />
        <rect x="12" y="12" width="488" height="488" rx="100" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="2" />
        {/* Play triangle */}
        <path d="M175 140 L175 340 L345 240 Z" fill="url(#mova-icon)" opacity="0.95" />
        {/* Download arrow - shaft */}
        <g opacity="0.9">
          <rect x="328" y="265" width="30" height="62" rx="5" fill="url(#mova-icon)" />
          {/* Download arrow - head */}
          <path d="M343 362 L385 312 L362 312 L362 305 L324 305 L324 312 L301 312 Z" fill="url(#mova-icon)" />
        </g>
        {/* Decorative accents */}
        <circle cx="120" cy="420" r="10" fill="rgba(255,255,255,0.12)" />
        <circle cx="96" cy="396" r="6" fill="rgba(255,255,255,0.08)" />
        <circle cx="420" cy="112" r="8" fill="rgba(255,255,255,0.1)" />
      </svg>
      {showText && (
        <span
          className="font-[family-name:var(--font-montserrat)] font-extrabold tracking-tight text-foreground"
          style={{ letterSpacing: "-0.03em", fontSize: size * 0.5 }}
        >
          <span className="gradient-text">Mo</span>va
        </span>
      )}
    </div>
  );
}

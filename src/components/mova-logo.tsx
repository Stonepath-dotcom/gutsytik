import React from "react";

interface MovaLogoProps {
  size?: number;
  className?: string;
  showText?: boolean;
}

export function MovaLogo({ size = 40, className = "", showText = true }: MovaLogoProps) {
  return (
    <div className={`flex items-center gap-1.5 md:gap-2 ${className}`}>
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
            <stop offset="50%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
          <linearGradient id="mova-icon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#DBEAFE" />
          </linearGradient>
          <linearGradient id="mova-arrow" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#93C5FD" />
            <stop offset="100%" stopColor="#DBEAFE" />
          </linearGradient>
        </defs>
        {/* Background rounded square */}
        <rect width="512" height="512" rx="112" fill="url(#mova-bg)" />
        {/* Inner border accent */}
        <rect x="14" y="14" width="484" height="484" rx="98" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="2" />
        {/* Play button circle */}
        <circle cx="230" cy="256" r="130" fill="rgba(255,255,255,0.08)" />
        <circle cx="230" cy="256" r="100" fill="rgba(255,255,255,0.06)" />
        {/* Play triangle */}
        <path d="M200 180 L200 332 L320 256 Z" fill="url(#mova-icon)" opacity="0.95" />
        {/* Download arrow overlay (bottom-right) */}
        <g opacity="0.92">
          {/* Arrow shaft */}
          <rect x="338" y="270" width="36" height="72" rx="8" fill="url(#mova-arrow)" />
          {/* Arrow head */}
          <path d="M356 375 L410 310 L382 310 L382 300 L330 300 L330 310 L302 310 Z" fill="url(#mova-arrow)" />
        </g>
        {/* Subtle decorative dots */}
        <circle cx="100" cy="420" r="12" fill="rgba(255,255,255,0.1)" />
        <circle cx="76" cy="396" r="7" fill="rgba(255,255,255,0.06)" />
        <circle cx="420" cy="100" r="9" fill="rgba(255,255,255,0.08)" />
        <circle cx="440" cy="130" r="5" fill="rgba(255,255,255,0.05)" />
      </svg>
      {showText && (
        <span
          className="font-[family-name:var(--font-montserrat)] font-extrabold tracking-tight text-foreground"
          style={{ letterSpacing: "-0.03em", fontSize: size * 0.52 }}
        >
          <span className="gradient-text">Mo</span>va
        </span>
      )}
    </div>
  );
}

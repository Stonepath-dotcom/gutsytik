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
      >
        <defs>
          <linearGradient id="movaBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E63946" />
            <stop offset="100%" stopColor="#C5303C" />
          </linearGradient>
        </defs>
        <rect x="16" y="16" width="480" height="480" rx="108" fill="url(#movaBgGrad)" />
        <rect
          x="28"
          y="28"
          width="456"
          height="456"
          rx="96"
          fill="none"
          stroke="rgba(255,255,255,0.15)"
          strokeWidth="2"
        />
        <path d="M190 155 L190 310 L320 232.5 Z" fill="white" opacity="0.95" />
        <g opacity="0.95">
          <rect x="310" y="250" width="42" height="100" rx="8" fill="white" />
          <path
            d="M256 330 L331 410 L406 330 L370 330 L370 322 L292 322 L292 330 Z"
            fill="white"
          />
        </g>
      </svg>
      {showText && (
        <span className="font-bold text-xl tracking-tight text-foreground">
          Mova
        </span>
      )}
    </div>
  );
}

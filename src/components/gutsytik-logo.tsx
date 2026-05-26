import React from "react";

interface GutsytikLogoProps {
  size?: number;
  className?: string;
  showText?: boolean;
}

export function GutsytikLogo({ size = 40, className = "", showText = true }: GutsytikLogoProps) {
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
          <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF2D55" />
            <stop offset="50%" stopColor="#EA580C" />
            <stop offset="100%" stopColor="#00E5FF" />
          </linearGradient>
          <linearGradient id="iconGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#E0E0FF" />
          </linearGradient>
        </defs>
        <rect x="16" y="16" width="480" height="480" rx="108" fill="url(#bgGrad)" />
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
        <path d="M190 155 L190 310 L320 232.5 Z" fill="url(#iconGrad)" opacity="0.95" />
        <g opacity="0.95">
          <rect x="310" y="250" width="42" height="100" rx="8" fill="url(#iconGrad)" />
          <path
            d="M256 330 L331 410 L406 330 L370 330 L370 322 L292 322 L292 330 Z"
            fill="url(#iconGrad)"
          />
        </g>
        <circle cx="140" cy="400" r="12" fill="rgba(255,255,255,0.2)" />
        <circle cx="110" cy="370" r="8" fill="rgba(255,255,255,0.15)" />
        <circle cx="400" cy="130" r="10" fill="rgba(255,255,255,0.18)" />
      </svg>
      {showText && (
        <span
          className="font-bold text-xl tracking-tight"
          style={{
            background: "linear-gradient(135deg, #FF2D55, #EA580C, #00E5FF)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Gutsytik
        </span>
      )}
    </div>
  );
}

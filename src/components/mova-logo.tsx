import React from "react";

interface MovaLogoProps {
  size?: number;
  className?: string;
  showText?: boolean;
}

export function MovaLogo({ size = 40, className = "", showText = true }: MovaLogoProps) {
  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      {/* Clean minimalist logo: play + download arrow */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        {/* Rounded square background */}
        <rect width="32" height="32" rx="8" fill="#E52222" />
        {/* Play triangle */}
        <path d="M12 8.5V23.5L23 16Z" fill="white" opacity="0.95" />
        {/* Download arrow */}
        <path d="M20 20V24M20 24L17.5 21.5M20 24L22.5 21.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.7" />
      </svg>
      {showText && (
        <span
          className="font-[family-name:var(--font-montserrat)] font-bold tracking-tight text-foreground"
          style={{ letterSpacing: "-0.03em", fontSize: size * 0.5 }}
        >
          Get<span className="text-[#E52222]">Mova</span>
        </span>
      )}
    </div>
  );
}

import React from "react";

interface MovaLogoProps {
  size?: number;
  className?: string;
  showText?: boolean;
}

export function MovaLogo({ size = 40, className = "", showText = true }: MovaLogoProps) {
  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      {/* Red play button logo - matching VideoMax style */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        <rect width="32" height="32" rx="8" fill="#E52222" />
        <path d="M13 9L23 16L13 23V9Z" fill="white" />
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

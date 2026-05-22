import React from "react";
import Image from "next/image";

interface MovaLogoProps {
  size?: number;
  className?: string;
  showText?: boolean;
}

export function MovaLogo({ size = 40, className = "", showText = true }: MovaLogoProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Image
        src="/mova-logo.png"
        alt="Mova Logo"
        width={size}
        height={size}
        className="rounded-md"
        priority
      />
      {showText && (
        <span
          className="font-[family-name:var(--font-montserrat)] font-extrabold text-xl tracking-tight text-foreground"
          style={{ letterSpacing: "-0.02em" }}
        >
          Mova
        </span>
      )}
    </div>
  );
}

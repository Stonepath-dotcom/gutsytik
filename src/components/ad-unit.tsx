"use client";

import React from "react";

/* ─── Ad Unit Component — Strategic placement between sections ─── */
interface AdUnitProps {
  slot?: "top" | "middle" | "bottom" | "sidebar";
  className?: string;
}

export function AdUnit({ slot = "middle", className = "" }: AdUnitProps) {
  // Only render in production
  if (process.env.NODE_ENV !== "production") {
    return (
      <div className={`flex items-center justify-center py-3 ${className}`}>
        <div className="text-[10px] text-white/10 border border-white/5 rounded px-2 py-0.5">
          Ad Space ({slot})
        </div>
      </div>
    );
  }

  const adStyle = slot === "top"
    ? "min-h-[90px]"
    : slot === "middle"
    ? "min-h-[250px]"
    : slot === "bottom"
    ? "min-h-[90px]"
    : "min-h-[600px]";

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className={`${adStyle} w-full max-w-[728px]`}>
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client="ca-pub-8487073388720076"
          data-ad-slot={slot === "top" ? "auto" : "auto"}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    </div>
  );
}

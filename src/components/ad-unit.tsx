"use client";

import { useEffect } from "react";

interface AdUnitProps {
  slot: string;
  format?: "auto" | "horizontal" | "vertical" | "rectangle";
  style?: React.CSSProperties;
  className?: string;
}

export function AdUnit({ slot, format = "auto", style, className = "" }: AdUnitProps) {
  useEffect(() => {
    try {
      // @ts-expect-error adsbygoogle is injected by Google
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {}
  }, []);

  return (
    <div className={`ad-container ${className}`}>
      <ins
        className="adsbygoogle"
        style={style || { display: "block" }}
        data-ad-client="ca-pub-8487073388720076"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}

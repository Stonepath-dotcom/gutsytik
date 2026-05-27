"use client";

import { useEffect } from "react";

interface AdUnitProps {
  slot?: string;
  format?: "auto" | "horizontal" | "vertical" | "rectangle";
  style?: React.CSSProperties;
  className?: string;
}

/**
 * AdUnit component for Google AdSense.
 *
 * When a `slot` prop is provided, it renders a specific ad unit.
 * When no `slot` is given, it renders an Auto Ads placeholder —
 * Google will automatically place ads in optimal positions.
 *
 * IMPORTANT: This component only renders if the user has accepted
 * cookie consent (the AdSense script is loaded by CookieConsent).
 */
export function AdUnit({ slot, format = "auto", style, className = "" }: AdUnitProps) {
  useEffect(() => {
    try {
      // @ts-expect-error adsbygoogle is injected by Google
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {}
  }, []);

  // If no slot ID, render auto-ad placeholder
  if (!slot) {
    return (
      <div className={`ad-container ${className}`}>
        <ins
          className="adsbygoogle"
          style={style || { display: "block" }}
          data-ad-client="ca-pub-8487073388720076"
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    );
  }

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

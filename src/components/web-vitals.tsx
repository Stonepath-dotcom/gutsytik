"use client";

import { Suspense, useEffect } from "react";
import { usePathname } from "next/navigation";

function VitalsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;

    async function measureVitals() {
      try {
        const { onCLS, onINP, onLCP, onTTFB, onFCP } = await import("web-vitals");

        function sendToGA({ name, delta, id }: { name: string; value: number; delta: number; id: string }) {
          // @ts-expect-error gtag injected by script tag
          if (typeof window.gtag !== "function") return;

          // @ts-expect-error gtag injected by script tag
          window.gtag("event", name, {
            event_category: "Web Vitals",
            event_label: id,
            value: Math.round(name === "CLS" ? delta * 1000 : delta),
            non_interaction: true,
            page_path: pathname,
          });
        }

        onCLS(sendToGA);
        onINP(sendToGA);
        onLCP(sendToGA);
        onTTFB(sendToGA);
        onFCP(sendToGA);
      } catch {
        // web-vitals not available, skip silently
      }
    }

    measureVitals();
  }, [pathname]);

  return null;
}

export function WebVitals() {
  return (
    <Suspense fallback={null}>
      <VitalsTracker />
    </Suspense>
  );
}

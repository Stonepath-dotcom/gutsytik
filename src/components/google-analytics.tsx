"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

const GA_MEASUREMENT_ID = "G-C72K54R633";

export function GoogleAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window === "undefined" || !GA_MEASUREMENT_ID) return;

    const url = pathname + searchParams.toString();

    // @ts-expect-error gtag is injected by the script tag
    if (typeof window.gtag === "function") {
      // @ts-expect-error gtag is injected by the script tag
      window.gtag("config", GA_MEASUREMENT_ID, {
        page_path: url,
      });
    }
  }, [pathname, searchParams]);

  return null;
}

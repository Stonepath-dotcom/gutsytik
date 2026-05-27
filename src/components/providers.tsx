"use client";

import React, { useEffect } from "react";
import { ThemeProvider } from "next-themes";
import { GoogleAnalytics } from "@/components/google-analytics";

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }
  }, []);

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <GoogleAnalytics />
      {children}
    </ThemeProvider>
  );
}

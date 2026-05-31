"use client";

import { useState, useEffect } from "react";

interface UseScrollSpyOptions {
  ids: string[];
  offset?: number;
}

export function useScrollSpy({ ids, offset = 100 }: UseScrollSpyOptions) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (ids.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);
        if (visibleEntries.length > 0) {
          // Pick the one closest to the top
          const sorted = visibleEntries.sort((a, b) => {
            const aDiff = Math.abs(a.boundingClientRect.top - offset);
            const bDiff = Math.abs(b.boundingClientRect.top - offset);
            return aDiff - bDiff;
          });
          setActiveId(sorted[0].target.id);
        }
      },
      {
        rootMargin: `-${offset}px 0px -50% 0px`,
        threshold: 0,
      }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [ids, offset]);

  return activeId;
}

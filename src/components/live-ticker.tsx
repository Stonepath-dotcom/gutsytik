"use client";

import React, { useState, useEffect, useRef } from "react";

interface Activity {
  id: number;
  flag: string;
  city: string;
  action: string;
  platform: string;
}

const COUNTRIES = [
  { flag: "🇮🇩", city: "Jakarta" },
  { flag: "🇮🇩", city: "Surabaya" },
  { flag: "🇮🇩", city: "Bandung" },
  { flag: "🇮🇩", city: "Medan" },
  { flag: "🇮🇩", city: "Semarang" },
  { flag: "🇺🇸", city: "New York" },
  { flag: "🇺🇸", city: "Los Angeles" },
  { flag: "🇬🇧", city: "London" },
  { flag: "🇯🇵", city: "Tokyo" },
  { flag: "🇰🇷", city: "Seoul" },
  { flag: "🇧🇷", city: "São Paulo" },
  { flag: "🇩🇪", city: "Berlin" },
  { flag: "🇫🇷", city: "Paris" },
  { flag: "🇮🇳", city: "Mumbai" },
  { flag: "🇵🇭", city: "Manila" },
  { flag: "🇲🇾", city: "Kuala Lumpur" },
  { flag: "🇹🇭", city: "Bangkok" },
  { flag: "🇻🇳", city: "Ho Chi Minh" },
  { flag: "🇸🇬", city: "Singapore" },
  { flag: "🇦🇺", city: "Sydney" },
];

const ACTIONS_ID = [
  "baru download video",
  "baru download",
  "sedang download",
  "berhasil download",
  "mendownload",
];

const ACTIONS_EN = [
  "just downloaded video",
  "downloaded",
  "downloading",
  "successfully downloaded",
  "is downloading",
];

const PLATFORMS = [
  "TikTok",
  "YouTube",
  "Instagram",
  "Facebook",
  "Twitter",
  "Pinterest",
  "Vimeo",
  "Reddit",
];

let activityId = 0;

function generateActivity(): Activity {
  const country = COUNTRIES[Math.floor(Math.random() * COUNTRIES.length)];
  const action = ACTIONS_ID[Math.floor(Math.random() * ACTIONS_ID.length)];
  const platform = PLATFORMS[Math.floor(Math.random() * PLATFORMS.length)];
  return {
    id: activityId++,
    flag: country.flag,
    city: country.city,
    action,
    platform,
  };
}

export function LiveTicker() {
  const [activities, setActivities] = useState<Activity[]>(() =>
    Array.from({ length: 8 }, () => generateActivity())
  );
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Add new activity every 3-5 seconds
  useEffect(() => {
    const interval = setInterval(
      () => {
        if (!isPaused) {
          setActivities((prev) => {
            const newActivities = [...prev, generateActivity()];
            // Keep max 20 items
            if (newActivities.length > 20) {
              return newActivities.slice(-20);
            }
            return newActivities;
          });
        }
      },
      3000 + Math.random() * 2000
    );
    return () => clearInterval(interval);
  }, [isPaused]);

  // Auto-scroll animation
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let animationId: number;
    let scrollPos = 0;
    const speed = 0.5; // pixels per frame

    const animate = () => {
      if (!isPaused) {
        scrollPos += speed;
        if (scrollPos >= container.scrollWidth - container.clientWidth) {
          scrollPos = 0;
        }
        container.scrollLeft = scrollPos;
      }
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [isPaused]);

  return (
    <div
      className="w-full overflow-hidden border-t border-b border-border/50 py-2.5"
      style={{
        background: "linear-gradient(90deg, rgba(255,45,85,0.03), rgba(124,58,237,0.03), rgba(0,229,255,0.03))",
      }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="flex items-center gap-3 px-4">
        {/* Live indicator */}
        <div className="flex items-center gap-1.5 shrink-0">
          <span
            className="inline-block w-2 h-2 rounded-full bg-red-500 animate-pulse-live"
          />
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            LIVE
          </span>
        </div>

        {/* Scrolling ticker */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-hidden whitespace-nowrap"
        >
          <div className="inline-flex gap-6">
            {activities.map((activity, idx) => (
              <span
                key={`${activity.id}-${idx}`}
                className="inline-flex items-center gap-1.5 text-xs text-muted-foreground"
              >
                <span>{activity.flag}</span>
                <span className="font-medium text-foreground/70">
                  {activity.city}
                </span>
                <span>{activity.action}</span>
                <span className="font-semibold" style={{ color: "#FF2D55" }}>
                  {activity.platform}
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

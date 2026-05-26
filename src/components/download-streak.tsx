"use client";

import React, { useState, useCallback } from "react";

const STREAK_KEY = "gutsytik_streak";
const STREAK_DATE_KEY = "gutsytik_streak_date";

interface StreakData {
  count: number;
  date: string;
}

function getTodayStr(): string {
  return new Date().toISOString().split("T")[0];
}

function loadStreak(): StreakData {
  if (typeof window === "undefined") return { count: 0, date: "" };
  try {
    const date = localStorage.getItem(STREAK_DATE_KEY) || "";
    const count = parseInt(localStorage.getItem(STREAK_KEY) || "0", 10);
    const today = getTodayStr();
    if (date !== today) {
      // Reset streak for new day
      localStorage.setItem(STREAK_KEY, "0");
      localStorage.setItem(STREAK_DATE_KEY, today);
      return { count: 0, date: today };
    }
    return { count, date };
  } catch {
    return { count: 0, date: getTodayStr() };
  }
}

function useDownloadStreak() {
  const [streakCount, setStreakCount] = useState(() => {
    if (typeof window === "undefined") return 0;
    return loadStreak().count;
  });

  const incrementStreak = useCallback(() => {
    const data = loadStreak();
    const newCount = data.count + 1;
    try {
      localStorage.setItem(STREAK_KEY, String(newCount));
      localStorage.setItem(STREAK_DATE_KEY, getTodayStr());
    } catch {}
    setStreakCount(newCount);
  }, []);

  const isOnFire = streakCount >= 5;

  return { streakCount, incrementStreak, isOnFire };
}

function StreakBadge({
  streakCount,
  isOnFire,
}: {
  streakCount: number;
  isOnFire: boolean;
}) {
  if (streakCount === 0) return null;

  return (
    <div
      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mt-3"
      style={{
        background: isOnFire
          ? "linear-gradient(135deg, rgba(255,45,85,0.15), rgba(249,115,22,0.15))"
          : "rgba(249,115,22,0.1)",
        color: isOnFire ? "#FF2D55" : "#F97316",
        border: `1px solid ${isOnFire ? "rgba(255,45,85,0.3)" : "rgba(249,115,22,0.2)"}`,
      }}
    >
      <span className={isOnFire ? "streak-on-fire" : ""}>🔥</span>
      <span>
        Streak: {streakCount} download{streakCount !== 1 ? "s" : ""} today!
      </span>
      {isOnFire && <span className="streak-on-fire">🔥</span>}
    </div>
  );
}

export { useDownloadStreak, StreakBadge };

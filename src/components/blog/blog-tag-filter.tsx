"use client";

import React, { useState } from "react";
import { Tag, X } from "lucide-react";

const ALL_TAGS = [
  { id: "tiktok", label: "TikTok", color: "bg-[#010101]/10 text-[#010101] dark:bg-[#25F4EE]/10 dark:text-[#25F4EE] border-[#010101]/20 dark:border-[#25F4EE]/20" },
  { id: "instagram", label: "Instagram", color: "bg-[#E1306C]/10 text-[#E1306C] border-[#E1306C]/20" },
  { id: "youtube", label: "YouTube", color: "bg-[#FF0000]/10 text-[#FF0000] border-[#FF0000]/20" },
  { id: "facebook", label: "Facebook", color: "bg-[#1877F2]/10 text-[#1877F2] border-[#1877F2]/20" },
  { id: "twitter", label: "Twitter/X", color: "bg-[#1DA1F2]/10 text-[#1DA1F2] border-[#1DA1F2]/20" },
  { id: "pinterest", label: "Pinterest", color: "bg-[#E60023]/10 text-[#E60023] border-[#E60023]/20" },
  { id: "reddit", label: "Reddit", color: "bg-[#FF4500]/10 text-[#FF4500] border-[#FF4500]/20" },
  { id: "telegram", label: "Telegram", color: "bg-[#26A5E4]/10 text-[#26A5E4] border-[#26A5E4]/20" },
  { id: "mp3", label: "MP3/Audio", color: "bg-[#34D399]/10 text-[#10B981] border-[#10B981]/20" },
  { id: "tutorial", label: "Tutorial", color: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20" },
  { id: "tips", label: "Tips & Trik", color: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20" },
  { id: "perbandingan", label: "Perbandingan", color: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20" },
  { id: "keamanan", label: "Keamanan", color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20" },
  { id: "whatsapp", label: "WhatsApp", color: "bg-[#25D366]/10 text-[#25D366] border-[#25D366]/20" },
];

interface TagFilterProps {
  onFilterChange: (activeTags: string[]) => void;
}

export function BlogTagFilter({ onFilterChange }: TagFilterProps) {
  const [activeTags, setActiveTags] = useState<string[]>([]);

  const toggleTag = (tagId: string) => {
    const newTags = activeTags.includes(tagId)
      ? activeTags.filter((t) => t !== tagId)
      : [...activeTags, tagId];
    setActiveTags(newTags);
    onFilterChange(newTags);
  };

  const clearAll = () => {
    setActiveTags([]);
    onFilterChange([]);
  };

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <Tag className="h-4 w-4 text-muted-foreground shrink-0" />
      {ALL_TAGS.map((tag) => (
        <button
          key={tag.id}
          onClick={() => toggleTag(tag.id)}
          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border transition-all duration-200 ${
            activeTags.includes(tag.id)
              ? tag.color
              : "bg-card text-muted-foreground border-border hover:border-muted-foreground/30"
          }`}
        >
          {tag.label}
        </button>
      ))}
      {activeTags.length > 0 && (
        <button
          onClick={clearAll}
          className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="h-3 w-3" />
          Hapus filter
        </button>
      )}
    </div>
  );
}

// Tag-to-keyword mapping for filtering articles
export function getArticleTags(title: string, description: string): string[] {
  const text = `${title} ${description}`.toLowerCase();
  const tags: string[] = [];

  if (text.includes("tiktok")) tags.push("tiktok");
  if (text.includes("instagram") || text.includes("reels") || text.includes("story ig") || text.includes("igtv")) tags.push("instagram");
  if (text.includes("youtube")) tags.push("youtube");
  if (text.includes("facebook") || text.includes("fb")) tags.push("facebook");
  if (text.includes("twitter") || text.includes("/x")) tags.push("twitter");
  if (text.includes("pinterest")) tags.push("pinterest");
  if (text.includes("reddit")) tags.push("reddit");
  if (text.includes("telegram")) tags.push("telegram");
  if (text.includes("mp3") || text.includes("audio") || text.includes("konversi") || text.includes("ekstrak")) tags.push("mp3");
  if (text.includes("tutorial") || text.includes("cara")) tags.push("tutorial");
  if (text.includes("tips") || text.includes("trik") || text.includes("aman") || text.includes("koneksi lambat")) tags.push("tips");
  if (text.includes("perbandingan") || text.includes("vs") || text.includes("terbaik") || text.includes("mana yang")) tags.push("perbandingan");
  if (text.includes("keamanan") || text.includes("virus") || text.includes("malware") || text.includes("aman")) tags.push("keamanan");
  if (text.includes("whatsapp") || text.includes("wa")) tags.push("whatsapp");

  return tags.length > 0 ? tags : ["tutorial"];
}

export { ALL_TAGS };

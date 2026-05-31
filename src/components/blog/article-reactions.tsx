"use client";

import React, { useState, useEffect } from "react";
import {
  ThumbsUp,
  Heart,
  Lightbulb,
  CheckCircle2,
} from "lucide-react";

interface Reaction {
  id: string;
  icon: React.ElementType;
  label: string;
  color: string;
  activeColor: string;
  bg: string;
  activeBg: string;
}

const REACTIONS: Reaction[] = [
  {
    id: "helpful",
    icon: ThumbsUp,
    label: "Membantu",
    color: "text-blue-500",
    activeColor: "text-blue-600",
    bg: "bg-blue-500/10",
    activeBg: "bg-blue-500/20",
  },
  {
    id: "love",
    icon: Heart,
    label: "Bagus",
    color: "text-rose-500",
    activeColor: "text-rose-600",
    bg: "bg-rose-500/10",
    activeBg: "bg-rose-500/20",
  },
  {
    id: "informative",
    icon: Lightbulb,
    label: "Informatif",
    color: "text-amber-500",
    activeColor: "text-amber-600",
    bg: "bg-amber-500/10",
    activeBg: "bg-amber-500/20",
  },
];

interface ArticleReactionsProps {
  slug: string;
}

export function ArticleReactions({ slug }: ArticleReactionsProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [showThanks, setShowThanks] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(`mova-reaction-${slug}`);
    if (stored) {
      setSelected(stored);
    }
  }, [slug]);

  const handleReact = (reactionId: string) => {
    if (selected) return; // Already reacted

    setSelected(reactionId);
    localStorage.setItem(`mova-reaction-${slug}`, reactionId);
    setShowThanks(true);

    setTimeout(() => setShowThanks(false), 3000);
  };

  return (
    <div className="mt-8 rounded-xl border border-border bg-card p-5">
      <h3
        className="text-sm font-bold text-foreground mb-3"
        style={{ fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif" }}
      >
        Apakah artikel ini membantu?
      </h3>

      <div className="flex flex-wrap gap-2">
        {REACTIONS.map((reaction) => {
          const isActive = selected === reaction.id;
          const Icon = reaction.icon;
          return (
            <button
              key={reaction.id}
              onClick={() => handleReact(reaction.id)}
              disabled={!!selected}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? `${reaction.activeBg} ${reaction.activeColor} ring-1 ring-current`
                  : selected
                  ? "bg-muted/30 text-muted-foreground/40 cursor-not-allowed"
                  : `${reaction.bg} ${reaction.color} hover:opacity-80`
              }`}
            >
              <Icon className={`h-4 w-4 ${isActive ? "fill-current" : ""}`} />
              {reaction.label}
              {isActive && <CheckCircle2 className="h-3.5 w-3.5 ml-0.5" />}
            </button>
          );
        })}
      </div>

      {showThanks && (
        <p className="text-xs text-[#10B981] mt-2 font-medium">
          Terima kasih atas feedback-nya! 🙌
        </p>
      )}
    </div>
  );
}

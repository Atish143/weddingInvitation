"use client";

import type { WeddingEventTheme } from "@/lib/wedding";

type Props = { theme: WeddingEventTheme };

/** Subtle South Indian decorative accents — one motif per event */
export function EventImageDecor({ theme }: Props) {
  if (theme === "green") {
    return (
      <>
        <span aria-hidden className="absolute left-2 top-2 text-sm opacity-70">🌿</span>
        <span aria-hidden className="absolute right-2 top-2 text-xs opacity-60">✿</span>
        <span
          aria-hidden
          className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-[#536B4F]/20 to-transparent"
        />
      </>
    );
  }
  if (theme === "haldi") {
    return (
      <>
        <span aria-hidden className="absolute left-2 top-2 text-sm opacity-75">🌼</span>
        <span
          aria-hidden
          className="absolute inset-x-4 bottom-3 h-px bg-gradient-to-r from-transparent via-[#B8944A]/60 to-transparent"
        />
      </>
    );
  }
  if (theme === "engagement") {
    return (
      <>
        <span aria-hidden className="absolute left-2 top-2 text-xs text-gold opacity-80">✦</span>
        <span aria-hidden className="absolute right-2 top-2 text-xs text-gold opacity-80">✦</span>
        <span aria-hidden className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] text-gold/70">♡</span>
      </>
    );
  }
  if (theme === "sangeet") {
    return (
      <>
        <span aria-hidden className="absolute right-3 top-3 text-sm opacity-60">♪</span>
        <span
          aria-hidden
          className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gold/15 blur-2xl"
        />
      </>
    );
  }
  return (
    <>
      <span aria-hidden className="absolute left-2 top-2 text-xs text-gold-soft opacity-80">🛕</span>
      <span aria-hidden className="absolute right-2 top-2 text-sm opacity-70">✿</span>
      <span
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-[#5A1828]/25 to-transparent"
      />
    </>
  );
}

export function EventCardFrame({ theme }: Props) {
  const border =
    theme === "green"
      ? "border-[#536B4F]/35"
      : theme === "haldi"
        ? "border-[#B8944A]/40"
        : theme === "engagement"
          ? "border-[#B8944A]/45"
          : theme === "sangeet"
            ? "border-[#B8944A]/35"
            : "border-[#B8944A]/50";

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 rounded-t-[1.15rem] border-2 ${border}`}
      style={{
        boxShadow: "inset 0 0 0 3px rgba(247,241,231,0.35)",
      }}
    />
  );
}

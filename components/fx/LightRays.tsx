"use client";

import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

type Props = { className?: string; tone?: "gold" | "warm" | "cool" };

export function LightRays({ className = "", tone = "gold" }: Props) {
  const reduced = usePrefersReducedMotion();
  const color =
    tone === "cool"
      ? "rgba(180,210,255,0.18)"
      : tone === "warm"
        ? "rgba(255,200,120,0.22)"
        : "rgba(240,217,160,0.28)";

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <div
        className={`absolute left-1/2 top-[-20%] h-[140%] w-[140%] -translate-x-1/2 ${reduced ? "" : "light-ray"}`}
        style={{
          background: `conic-gradient(from 200deg at 50% 0%, transparent 0deg, ${color} 25deg, transparent 50deg, ${color} 80deg, transparent 110deg, ${color} 145deg, transparent 180deg)`,
        }}
      />
    </div>
  );
}

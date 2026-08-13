"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

type Props = {
  count?: number;
  className?: string;
  color?: string;
};

export function Sparkles({
  count = 24,
  className = "",
  color = "#F0D9A0",
}: Props) {
  const reduced = usePrefersReducedMotion();
  const dots = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: `${(i * 37 + 11) % 100}%`,
        top: `${(i * 53 + 7) % 100}%`,
        delay: (i % 10) * 0.25,
        size: 1.5 + (i % 4),
      })),
    [count],
  );

  if (reduced) return null;

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {dots.map((d) => (
        <motion.span
          key={d.id}
          className="absolute rounded-full"
          style={{
            left: d.left,
            top: d.top,
            width: d.size,
            height: d.size,
            backgroundColor: color,
            boxShadow: `0 0 ${d.size * 3}px ${color}`,
          }}
          animate={{ opacity: [0.15, 1, 0.15], scale: [0.6, 1.4, 0.6] }}
          transition={{
            duration: 2.2 + (d.id % 4) * 0.4,
            delay: d.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

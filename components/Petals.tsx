"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

const DEFAULT_COLORS = ["#F3D6D8", "#E8D5B7", "#D4A5A5", "#E6D4A8", "#B8C9B8"];

type Props = {
  count?: number;
  colors?: string[];
  className?: string;
};

export function Petals({
  count = 14,
  colors = DEFAULT_COLORS,
  className = "",
}: Props) {
  const reduced = usePrefersReducedMotion();
  const petals = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: `${(i * 17 + 7) % 100}%`,
        delay: (i % 8) * 0.7,
        duration: 12 + (i % 5) * 2.5,
        size: 8 + (i % 4) * 3,
        color: colors[i % colors.length],
        rotate: (i * 47) % 360,
      })),
    [count, colors],
  );

  if (reduced) return null;

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 z-[1] overflow-hidden ${className}`}
    >
      {petals.map((p) => (
        <motion.span
          key={p.id}
          className="absolute top-[-10%] block rounded-[40%_60%_55%_45%/50%_40%_60%_50%] opacity-50"
          style={{
            left: p.left,
            width: p.size,
            height: p.size * 1.35,
            backgroundColor: p.color,
          }}
          initial={{ y: "-10%", rotate: p.rotate, opacity: 0.2 }}
          animate={{
            y: "110vh",
            rotate: p.rotate + 180,
            opacity: [0.2, 0.55, 0.2],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}

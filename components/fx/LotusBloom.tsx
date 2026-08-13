"use client";

import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

type Props = { className?: string; size?: number };

export function LotusBloom({ className = "", size = 72 }: Props) {
  const reduced = usePrefersReducedMotion();

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      className={`text-maroon ${className}`}
      aria-hidden
      animate={reduced ? undefined : { rotate: [0, 2, -2, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
    >
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
        <ellipse
          key={deg}
          cx="40"
          cy="28"
          rx="8"
          ry="18"
          fill="currentColor"
          opacity="0.35"
          transform={`rotate(${deg} 40 42)`}
        />
      ))}
      <circle cx="40" cy="42" r="8" fill="#C9A227" opacity="0.85" />
      <circle cx="40" cy="42" r="3.5" fill="#FFF9EF" opacity="0.9" />
    </motion.svg>
  );
}

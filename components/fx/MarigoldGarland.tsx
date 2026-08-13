"use client";

import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

type Props = { className?: string };

export function MarigoldGarland({ className = "" }: Props) {
  const reduced = usePrefersReducedMotion();
  const blooms = Array.from({ length: 15 }, (_, i) => i);

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-x-0 top-0 z-[6] overflow-hidden ${className}`}
    >
      <svg viewBox="0 0 400 48" className="h-10 w-full sm:h-12">
        <path
          d="M0 10 Q100 28 200 10 T400 10"
          fill="none"
          stroke="#A9762F"
          strokeWidth="1.5"
          opacity="0.7"
        />
        {blooms.map((i) => {
          const x = 14 + i * 26;
          const y = 10 + Math.sin(i * 0.9) * 8;
          return (
            <motion.g
              key={i}
              style={{ transformOrigin: `${x}px ${y}px` }}
              animate={
                reduced
                  ? undefined
                  : { rotate: [i % 2 ? -8 : 8, i % 2 ? 8 : -8, i % 2 ? -8 : 8] }
              }
              transition={{
                duration: 2.8,
                delay: i * 0.07,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <circle cx={x} cy={y} r="7" fill="#F4C430" opacity="0.9" />
              <circle cx={x} cy={y} r="3" fill="#C8960A" />
              <circle cx={x - 1} cy={y + 12} r="2.5" fill="#E85D04" opacity="0.85" />
            </motion.g>
          );
        })}
      </svg>
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

type Props = { className?: string };

const LEAF_COUNT = 18;

export function CoconutLeafBorder({ className = "" }: Props) {
  const reduced = usePrefersReducedMotion();

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-x-0 top-0 z-[5] flex justify-center overflow-hidden pt-1 ${className}`}
    >
      <svg viewBox="0 0 400 36" className="h-9 w-full max-w-3xl text-banana">
        {Array.from({ length: LEAF_COUNT }, (_, i) => {
          const x = 12 + i * 22;
          const flip = i % 2 === 0 ? 1 : -1;
          return (
            <motion.g
              key={i}
              style={{ transformOrigin: `${x}px 6px` }}
              animate={
                reduced
                  ? undefined
                  : {
                      rotate: [flip * -4, flip * 5, flip * -4],
                      skewX: [flip * -2, flip * 2, flip * -2],
                    }
              }
              transition={{
                duration: 3.2,
                delay: i * 0.08,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <path
                d={`M${x} 6 Q${x + flip * 8} 18 ${x + flip * 2} 32`}
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                opacity={0.75}
              />
              <ellipse
                cx={x + flip * 3}
                cy={18}
                rx={5}
                ry={10}
                fill="currentColor"
                opacity={0.35}
                transform={`rotate(${flip * 18} ${x + flip * 3} 18)`}
              />
            </motion.g>
          );
        })}
        <path
          d="M8 6 H392"
          stroke="#A9762F"
          strokeWidth="1"
          opacity="0.5"
        />
      </svg>
    </div>
  );
}

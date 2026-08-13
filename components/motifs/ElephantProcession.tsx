"use client";

import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

type Props = { className?: string; count?: number };

function Elephant({ x }: { x: number }) {
  const reduced = usePrefersReducedMotion();
  return (
    <motion.g
      animate={
        reduced
          ? undefined
          : {
              y: [0, -1.5, 0, -1, 0],
            }
      }
      transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
    >
      <ellipse cx={x} cy={18} rx={10} ry={7} fill="none" stroke="currentColor" strokeWidth="1.2" />
      <circle cx={x + 8} cy={12} r={5} fill="none" stroke="currentColor" strokeWidth="1.2" />
      <path
        d={`M${x + 12} 12 Q${x + 18} 16 ${x + 14} 22`}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d={`M${x + 6} 8 Q${x + 8} 4 ${x + 10} 8`}
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      />
      <motion.path
        d={`M${x - 6} 24 L${x - 6} 28 M${x - 2} 24 L${x - 2} 28 M${x + 2} 24 L${x + 2} 28 M${x + 6} 24 L${x + 6} 28`}
        stroke="currentColor"
        strokeWidth="1.1"
        animate={reduced ? undefined : { y: [0, 1, 0, -0.5, 0] }}
        transition={{ duration: 0.7, repeat: Infinity }}
      />
    </motion.g>
  );
}

export function ElephantProcession({ className = "", count = 5 }: Props) {
  const reduced = usePrefersReducedMotion();
  const width = count * 48 + 40;

  return (
    <div
      aria-hidden
      className={`pointer-events-none overflow-hidden text-gold-deep/50 ${className}`}
    >
      <motion.div
        className="flex"
        animate={reduced ? undefined : { x: ["0%", "-50%"] }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      >
        {[0, 1].map((copy) => (
          <svg
            key={copy}
            viewBox={`0 0 ${width} 36`}
            className="h-8 w-auto min-w-[50%]"
            style={{ width: width }}
          >
            {Array.from({ length: count }, (_, i) => (
              <Elephant key={i} x={24 + i * 48} />
            ))}
          </svg>
        ))}
      </motion.div>
    </div>
  );
}

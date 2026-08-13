"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useScrollRoot } from "@/lib/ScrollContext";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

type Props = { className?: string };

export function MandapArch({ className = "" }: Props) {
  const { scrollRef } = useScrollRoot();
  const ref = useRef<SVGSVGElement | null>(null);
  const inView = useInView(ref, { root: scrollRef, once: true, amount: 0.3 });
  const reduced = usePrefersReducedMotion();

  return (
    <svg
      ref={ref}
      viewBox="0 0 360 160"
      className={`mx-auto h-auto w-full max-w-lg text-gold ${className}`}
      fill="none"
      aria-hidden
    >
      <motion.path
        d="M30 150 V70 Q30 20 180 20 Q330 20 330 70 V150"
        stroke="currentColor"
        strokeWidth="1.6"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={
          inView || reduced
            ? { pathLength: 1, opacity: 0.9 }
            : { pathLength: 0, opacity: 0 }
        }
        transition={{ duration: 1.5 }}
      />
      <motion.path
        d="M60 150 V80 Q60 45 180 45 Q300 45 300 80 V150"
        stroke="currentColor"
        strokeWidth="1.2"
        initial={{ pathLength: 0 }}
        animate={inView || reduced ? { pathLength: 1 } : { pathLength: 0 }}
        transition={{ duration: 1.4, delay: 0.2 }}
      />
      {/* hanging bells */}
      {[100, 180, 260].map((x, i) => (
        <motion.g
          key={x}
          style={{ transformOrigin: `${x}px 55px` }}
          animate={
            reduced
              ? undefined
              : { rotate: [i % 2 ? -6 : 6, i % 2 ? 6 : -6, i % 2 ? -6 : 6] }
          }
          transition={{ duration: 2.2, delay: i * 0.2, repeat: Infinity }}
        >
          <line x1={x} y1="50" x2={x} y2="72" stroke="currentColor" strokeWidth="1" />
          <path
            d={`M${x - 8} 72 Q${x} 88 ${x + 8} 72 Z`}
            fill="currentColor"
            opacity="0.75"
          />
        </motion.g>
      ))}
      {/* floral peaks */}
      <circle cx="180" cy="20" r="5" fill="currentColor" opacity="0.7" />
      <circle cx="30" cy="70" r="3" fill="currentColor" opacity="0.5" />
      <circle cx="330" cy="70" r="3" fill="currentColor" opacity="0.5" />
    </svg>
  );
}

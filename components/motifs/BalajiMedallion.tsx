"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useScrollRoot } from "@/lib/ScrollContext";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

type Props = { className?: string; size?: number; glow?: boolean };

export function BalajiMedallion({
  className = "",
  size = 64,
  glow = true,
}: Props) {
  const { scrollRef } = useScrollRoot();
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { root: scrollRef, once: true, amount: 0.4 });
  const reduced = usePrefersReducedMotion();

  return (
    <div ref={ref} className={`flex justify-center ${className}`}>
      <motion.div
        initial={{ scale: reduced ? 1 : 0.7, opacity: 0 }}
        animate={
          inView || reduced
            ? { scale: 1, opacity: 1 }
            : { scale: 0.7, opacity: 0 }
        }
        transition={{ type: "spring", stiffness: 180, damping: 16 }}
      >
        <motion.svg
          width={size}
          height={size}
          viewBox="0 0 80 80"
          className="text-gold"
          animate={
            glow && !reduced
              ? {
                  filter: [
                    "drop-shadow(0 0 2px rgba(201,162,39,0.3))",
                    "drop-shadow(0 0 8px rgba(201,162,39,0.65))",
                    "drop-shadow(0 0 2px rgba(201,162,39,0.3))",
                  ],
                }
              : undefined
          }
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden
        >
          <circle
            cx="40"
            cy="40"
            r="36"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            opacity="0.7"
          />
          <path
            d="M22 52 V34 L40 18 L58 34 V52"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinejoin="round"
          />
          <path
            d="M30 52 V38 L40 28 L50 38 V52"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.1"
          />
          {/* Abstract iconic silhouette — not a detailed deity depiction */}
          <ellipse
            cx="40"
            cy="42"
            rx="7"
            ry="10"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.1"
          />
          <circle cx="40" cy="32" r="4.5" fill="none" stroke="currentColor" strokeWidth="1.1" />
          <path
            d="M34 28 H46 M40 24 V28"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
          />
          <path
            d="M28 48 H52"
            stroke="currentColor"
            strokeWidth="1"
            opacity="0.6"
          />
        </motion.svg>
      </motion.div>
    </div>
  );
}

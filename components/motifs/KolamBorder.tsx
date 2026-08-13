"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useScrollRoot } from "@/lib/ScrollContext";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

type Props = {
  className?: string;
  variant?: "frame" | "mandala";
};

export function KolamBorder({ className = "", variant = "frame" }: Props) {
  const { scrollRef } = useScrollRoot();
  const ref = useRef<SVGSVGElement | null>(null);
  const inView = useInView(ref, { root: scrollRef, once: true, amount: 0.2 });
  const reduced = usePrefersReducedMotion();

  if (variant === "mandala") {
    return (
      <svg
        ref={ref}
        viewBox="0 0 200 200"
        className={`mx-auto text-gold ${className}`}
        fill="none"
        aria-hidden
      >
        <motion.circle
          cx="100"
          cy="100"
          r="70"
          stroke="currentColor"
          strokeWidth="1.2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={
            inView || reduced
              ? { pathLength: 1, opacity: 0.8 }
              : { pathLength: 0, opacity: 0 }
          }
          transition={{ duration: 1.4 }}
        />
        <motion.path
          d="M100 30 L115 70 L155 70 L122 95 L135 135 L100 112 L65 135 L78 95 L45 70 L85 70 Z"
          stroke="currentColor"
          strokeWidth="1.1"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={
            inView || reduced
              ? { pathLength: 1, opacity: 0.75 }
              : { pathLength: 0, opacity: 0 }
          }
          transition={{ duration: 1.8, delay: 0.2 }}
        />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
          const rad = (deg * Math.PI) / 180;
          const x = 100 + Math.cos(rad) * 55;
          const y = 100 + Math.sin(rad) * 55;
          return (
            <motion.circle
              key={deg}
              cx={x}
              cy={y}
              r="2.5"
              fill="currentColor"
              initial={{ opacity: 0, scale: 0 }}
              animate={
                inView || reduced
                  ? { opacity: 0.7, scale: 1 }
                  : { opacity: 0, scale: 0 }
              }
              transition={{ delay: 0.4 + deg / 400 }}
            />
          );
        })}
      </svg>
    );
  }

  return (
    <svg
      ref={ref}
      viewBox="0 0 280 28"
      className={`mx-auto h-6 w-full max-w-sm text-gold ${className}`}
      fill="none"
      aria-hidden
    >
      <motion.path
        d="M10 14 H270 M20 14 L30 6 L40 14 L30 22 Z M60 14 L70 6 L80 14 L70 22 Z M100 14 L110 6 L120 14 L110 22 Z M140 14 L150 6 L160 14 L150 22 Z M180 14 L190 6 L200 14 L190 22 Z M220 14 L230 6 L240 14 L230 22 Z M250 14 L260 6 L270 14 L260 22 Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={
          inView || reduced
            ? { pathLength: 1, opacity: 0.8 }
            : { pathLength: 0, opacity: 0 }
        }
        transition={{ duration: 1.4, ease: "easeInOut" }}
      />
      {[20, 60, 100, 140, 180, 220, 260].map((cx) => (
        <circle key={cx} cx={cx} cy={14} r="1.5" fill="currentColor" opacity="0.6" />
      ))}
    </svg>
  );
}

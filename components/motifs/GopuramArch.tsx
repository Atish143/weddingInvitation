"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useScrollRoot } from "@/lib/ScrollContext";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

type Props = { className?: string };

export function GopuramArch({ className = "" }: Props) {
  const { scrollRef } = useScrollRoot();
  const ref = useRef<SVGSVGElement | null>(null);
  const inView = useInView(ref, {
    root: scrollRef,
    once: true,
    amount: 0.3,
  });
  const reduced = usePrefersReducedMotion();

  return (
    <svg
      ref={ref}
      viewBox="0 0 320 90"
      className={`mx-auto h-auto w-full max-w-md text-gold ${className}`}
      fill="none"
      aria-hidden
    >
      <motion.path
        d="M20 85 H300 M40 85 V55 L160 12 L280 55 V85 M70 85 V62 L160 28 L250 62 V85 M100 85 V68 L160 42 L220 68 V85 M130 85 V74 L160 56 L190 74 V85"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: reduced ? 1 : 0, opacity: reduced ? 0.7 : 0 }}
        animate={
          inView || reduced
            ? { pathLength: 1, opacity: 0.85 }
            : { pathLength: 0, opacity: 0 }
        }
        transition={{ duration: reduced ? 0 : 1.6, ease: "easeInOut" }}
      />
      <motion.circle
        cx="160"
        cy="22"
        r="3"
        fill="currentColor"
        initial={{ opacity: 0 }}
        animate={inView || reduced ? { opacity: 0.8 } : { opacity: 0 }}
        transition={{ delay: 1 }}
      />
    </svg>
  );
}

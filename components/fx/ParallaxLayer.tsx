"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import type { ReactNode } from "react";
import { useRef } from "react";
import { useScrollRoot } from "@/lib/ScrollContext";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

type Props = {
  children: ReactNode;
  speed?: number;
  className?: string;
};

/** Parallax within the wedding scroll root (not the document). */
export function ParallaxLayer({
  children,
  speed = 0.25,
  className = "",
}: Props) {
  const { scrollRef } = useScrollRoot();
  const ref = useRef<HTMLDivElement | null>(null);
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    container: scrollRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [speed * 60, speed * -60]);

  return (
    <motion.div
      ref={ref}
      style={reduced ? undefined : { y }}
      className={`will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
}

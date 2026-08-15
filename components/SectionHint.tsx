"use client";

import { motion } from "framer-motion";
import { useScrollRoot } from "@/lib/ScrollContext";
import type { SceneId } from "@/lib/wedding";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import { useI18n } from "@/lib/i18n";

type NavItem = { id: SceneId; label: string } | null;

type Props = {
  prev: NavItem;
  next: NavItem;
};

export function SectionHint({ prev, next }: Props) {
  const { goToScene } = useScrollRoot();
  const { t } = useI18n();
  const reduced = usePrefersReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-3 z-30 flex items-center justify-between px-3 sm:bottom-4 sm:px-5">
      {prev ? (
        <motion.button
          type="button"
          aria-label={`${t(`nav.${prev.id}`)}`}
          onClick={() => goToScene(prev.id)}
className="pointer-events-auto glass flex min-h-14 items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold tracking-wide text-ink shadow-sm bg-white/10 sm:text-base"
          whileTap={reduced ? undefined : { scale: 0.94 }}
        >
          ↑
        </motion.button>
      ) : (
        <span className="w-10" />
      )}
      {next ? (
        <motion.button
          type="button"
          aria-label={t(`nav.${next.id}`)}
          onClick={() => goToScene(next.id)}
         className="pointer-events-auto glass flex min-h-14 items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold tracking-wide text-ink shadow-sm bg-white/10 sm:text-base"
          animate={reduced ? undefined : { y: [0, 3, 0] }}
          transition={
            reduced
              ? undefined
              : { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }
        >
          <span className="font-body">{t(`nav.${next.id}`)}</span>
          <span aria-hidden>↓</span>
        </motion.button>
      ) : (
        <span className="w-10" />
      )}
    </div>
  );
}

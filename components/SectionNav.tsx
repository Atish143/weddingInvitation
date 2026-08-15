"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SCENES, type SceneId } from "@/lib/wedding";
import { useScrollRoot } from "@/lib/ScrollContext";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import { useI18n } from "@/lib/i18n";
// j x,mc
export function SectionNav() {
  const { goToScene, scrollRef } = useScrollRoot();
  const { t } = useI18n();
  const [active, setActive] = useState<SceneId>("welcome");
  const [open, setOpen] = useState(false);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const root = scrollRef.current;
    if (!root) return;

    const sections = SCENES.map((s) =>
      document.getElementById(`scene-${s.id}`),
    ).filter(Boolean) as HTMLElement[];
// hh
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        const id = visible?.target.getAttribute("data-scene") as SceneId | null;
        if (id) setActive(id);
      },
      { root, threshold: [0.35, 0.55, 0.7] },
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [scrollRef]);

  const labelFor = (id: SceneId) => t(`nav.${id}`);

  return (
    <>
      <nav
        aria-label={t("nav.sections")}
        className="pointer-events-none fixed right-3 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-2 md:flex"
      >
        {SCENES.map((s) => (
          <button
            key={s.id}
            type="button"
            aria-label={labelFor(s.id)}
            aria-current={active === s.id}
            onClick={() => goToScene(s.id)}
            className="pointer-events-auto group relative flex min-h-6 min-w-6 items-center justify-end"
          >
            <span className="mr-2 hidden rounded-full bg-ivory/95 px-2 py-0.5 font-body text-[10px] font-medium text-ink opacity-0 shadow-sm transition group-hover:opacity-100">
              {labelFor(s.id)}
            </span>
            <span
              className={`block h-2.5 w-2.5 rounded-full border transition ${
                active === s.id
                  ? "scale-125 border-burgundy bg-burgundy"
                  : "border-gold/50 bg-ivory/80"
              }`}
            />
          </button>
        ))}
      </nav>

      <div className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] left-3 z-40 md:hidden">
        <button
          type="button"
          aria-expanded={open}
          aria-label={t("nav.menu")}
          onClick={() => setOpen((v) => !v)}
          className="glass flex h-11 w-11 items-center justify-center rounded-full text-sm font-medium text-ink shadow-md"
        >
          ≡
        </button>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.96 }}
              className="absolute bottom-14 left-0 max-h-[55vh] w-48 overflow-y-auto rounded-2xl border border-gold/30 bg-ivory/98 p-2 shadow-xl backdrop-blur-md"
            >
              {SCENES.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => {
                    goToScene(s.id);
                    setOpen(false);
                  }}
                  className={`block w-full rounded-xl px-3 py-2.5 text-left font-body text-xs font-medium ${
                    active === s.id
                      ? "bg-burgundy/10 text-burgundy"
                      : "text-ink hover:bg-cream"
                  }`}
                >
                  {labelFor(s.id)}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Scene } from "@/components/Scene";
import { LotusBloom } from "@/components/fx/LotusBloom";
import { Sparkles } from "@/components/fx/Sparkles";
import { useScrollRoot } from "@/lib/ScrollContext";
import { useI18n } from "@/lib/i18n";

const ICONS = ["✨", "💗", "💍", "🕊️"] as const;

export function StoryScene() {
  const { t } = useI18n();
  const { scrollRef } = useScrollRoot();
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { root: scrollRef, once: true, amount: 0.15 });

  const moments = [
    { title: t("story.m1Title"), line: t("story.m1Line"), icon: ICONS[0] },
    { title: t("story.m2Title"), line: t("story.m2Line"), icon: ICONS[1] },
    { title: t("story.m3Title"), line: t("story.m3Line"), icon: ICONS[2] },
    { title: t("story.m4Title"), line: t("story.m4Line"), icon: ICONS[3] },
  ];

  return (
    <Scene
      id="story"
      className="bg-[linear-gradient(180deg,#F3EBE0_0%,#F7F1E8_40%,#E8C9B4_100%)]"
      petals
      petalColors={["#E8C9B4", "#E8C4C8", "#E4D2B0"]}
      petalCount={8}
    >
      <Sparkles count={10} color="#B87A82" />

      <div
        ref={ref}
        className="relative z-10 mx-auto flex w-full max-w-md flex-1 flex-col justify-center"
      >
        <div className="mb-4 text-center">
          <LotusBloom size={32} className="mx-auto mb-1 text-rose-deep" />
          <p className="text-eyebrow text-burgundy">{t("story.eyebrow")}</p>
          <h2 className="text-section mt-1 font-display font-semibold text-charcoal">
            {t("story.title")}
          </h2>
        </div>

        <div className="relative">
          <motion.div
            className="absolute bottom-3 left-[1.35rem] top-3 w-[2px] origin-top bg-gradient-to-b from-gold via-gold-deep to-gold/30"
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          />

          <ul className="space-y-3">
            {moments.map((m, i) => (
              <motion.li
                key={m.title}
                className="relative flex gap-3"
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.12 * i + 0.15, duration: 0.5 }}
              >
                <span className="relative z-10 flex h-11 w-11 shrink-0 flex-col items-center justify-center rounded-full border border-gold/50 bg-ivory text-charcoal shadow-md">
                  <span className="font-body text-[9px] font-semibold text-gold-deep">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[11px]" aria-hidden>
                    {m.icon}
                  </span>
                </span>
                <div
                  className={`premium-card flex-1 px-3.5 py-3 ${
                    i % 2 === 0
                      ? "bg-gradient-to-br from-ivory to-blush/35"
                      : "bg-gradient-to-br from-ivory to-champagne/45"
                  }`}
                >
                  <p className="font-display text-base font-semibold text-charcoal sm:text-lg">
                    {m.title}
                  </p>
                  <p className="mt-1 text-body-readable text-ink-muted">
                    {m.line}
                  </p>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>

        <motion.p
          className="mt-5 text-center font-display text-sm font-medium leading-relaxed text-burgundy sm:text-base"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
        >
          {t("story.invite")}
        </motion.p>
      </div>
    </Scene>
  );
}

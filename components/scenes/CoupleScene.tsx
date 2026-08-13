"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Scene } from "@/components/Scene";
import { CouplePortrait } from "@/components/CouplePortrait";
import { PeacockFeather } from "@/components/fx/PeacockFeather";
import { Sparkles } from "@/components/fx/Sparkles";
import { OrnateCorners } from "@/components/fx/OrnateCorners";
import { LotusBloom } from "@/components/fx/LotusBloom";
import { COUPLE } from "@/lib/wedding";
import { useScrollRoot } from "@/lib/ScrollContext";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import { useI18n } from "@/lib/i18n";

export function CoupleScene() {
  const { t } = useI18n();
  const { scrollRef } = useScrollRoot();
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { root: scrollRef, once: true, amount: 0.2 });
  const reduced = usePrefersReducedMotion();

  return (
    <Scene
      id="couple"
      className="bg-[radial-gradient(ellipse_at_top,#E8C4C8_0%,#F7F1E8_42%,#E4D2B0_100%)]"
      petals
      petalColors={["#E8C4C8", "#E4D2B0", "#B8923E", "#C8BFD9"]}
      petalCount={10}
    >
      <Sparkles count={14} color="#B87A82" />
      <OrnateCorners className="text-gold/35" />

      <div className="pointer-events-none absolute left-0 top-[18%] opacity-35 sm:left-1">
        <PeacockFeather />
      </div>
      <div className="pointer-events-none absolute right-0 top-[18%] opacity-35 sm:right-1">
        <PeacockFeather flip />
      </div>

      <div
        ref={ref}
        className="relative z-10 mx-auto flex w-full max-w-lg flex-1 flex-col items-center justify-center py-2"
      >
        <LotusBloom size={34} className="mb-1 text-rose-deep" />
        <motion.p
          className="text-eyebrow text-burgundy"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
        >
          {t("couple.eyebrow")}
        </motion.p>
        <motion.h2
          className="text-names mt-1 mb-4 text-center font-display font-semibold text-charcoal"
          initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
          animate={
            inView
              ? { opacity: 1, y: 0, filter: "blur(0px)" }
              : { opacity: 0, y: 14 }
          }
          transition={{ duration: 0.7 }}
        >
          {COUPLE.partner1}{" "}
          <span className="font-normal text-rose-deep">&</span>{" "}
          {COUPLE.partner2}
        </motion.h2>

        <div
          aria-hidden
          className="mb-4 h-px w-24 bg-gradient-to-r from-transparent via-gold to-transparent"
        />

        <div className="grid w-full grid-cols-2 gap-2.5 sm:gap-4">
          <motion.figure
            initial={{ opacity: 0, x: reduced ? 0 : -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.12, duration: 0.65 }}
            className="relative"
          >
            <div className="premium-card relative overflow-hidden bg-gradient-to-b from-champagne/40 to-cream p-1.5">
              <div className="pointer-events-none absolute inset-x-2 top-2 z-10 flex justify-between text-[10px] text-gold-deep/70">
                <span>✦</span>
                <span>✦</span>
              </div>
              <CouplePortrait
                who="groom"
                alt={`${COUPLE.partner1} — groom portrait placeholder`}
                className="aspect-[3/4] w-full rounded-xl"
                priority
              />
            </div>
            <figcaption className="mt-2 text-center">
              <p className="font-body text-[10px] font-semibold tracking-[0.22em] text-gold-deep uppercase">
                {t("common.groom")}
              </p>
              <p className="font-display text-lg font-medium text-charcoal sm:text-xl">
                {COUPLE.partner1}
              </p>
            </figcaption>
          </motion.figure>

          <motion.figure
            initial={{ opacity: 0, x: reduced ? 0 : 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.22, duration: 0.65 }}
            className="relative"
          >
            <div className="premium-card relative overflow-hidden bg-gradient-to-b from-blush/50 to-cream p-1.5">
              <div className="pointer-events-none absolute inset-x-2 top-2 z-10 flex justify-between text-[10px] text-rose-deep/70">
                <span>✦</span>
                <span>✦</span>
              </div>
              <CouplePortrait
                who="bride"
                alt={`${COUPLE.partner2} — bride portrait placeholder`}
                className="aspect-[3/4] w-full rounded-xl"
                priority
              />
            </div>
            <figcaption className="mt-2 text-center">
              <p className="font-body text-[10px] font-semibold tracking-[0.22em] text-rose-deep uppercase">
                {t("common.bride")}
              </p>
              <p className="font-display text-lg font-medium text-charcoal sm:text-xl">
                {COUPLE.partner2}
              </p>
            </figcaption>
          </motion.figure>
        </div>

        <motion.p
          className="mt-5 max-w-sm text-center font-display text-base font-medium text-burgundy italic sm:text-lg"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.45 }}
        >
          {t("couple.forever")}
        </motion.p>
      </div>
    </Scene>
  );
}

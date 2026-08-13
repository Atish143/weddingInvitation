"use client";

import { motion } from "framer-motion";
import { Scene } from "@/components/Scene";
import { CouplePortrait } from "@/components/CouplePortrait";
import { Sparkles } from "@/components/fx/Sparkles";
import { LightRays } from "@/components/fx/LightRays";
import { LotusBloom } from "@/components/fx/LotusBloom";
import { OrnateCorners } from "@/components/fx/OrnateCorners";
import { COUPLE } from "@/lib/wedding";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import { useI18n } from "@/lib/i18n";

export function FinaleScene() {
  const { t } = useI18n();
  const reduced = usePrefersReducedMotion();

  return (
    <Scene
      id="finale"
      className="bg-[radial-gradient(ellipse_at_center,#5c1a2a_0%,#3d101c_55%,#2a0c14_100%)]"
      showHints={false}
      petals
      petalColors={["#E2D0A4", "#E8C4C8", "#B8923E", "#F7F1E8"]}
      petalCount={16}
    >
      <LightRays tone="gold" />
      <Sparkles count={22} color="#E2D0A4" />
      <OrnateCorners className="text-gold-soft/40" />

      <div className="relative z-10 mx-auto flex w-full max-w-md flex-1 flex-col items-center justify-center text-center">
        <LotusBloom size={40} className="mb-2 text-gold-soft" />

        <motion.p
          className="text-eyebrow text-gold-soft"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {t("finale.eyebrow")}
        </motion.p>

        <motion.h2
          className="text-names mt-2 font-display font-semibold text-on-dark"
          initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.85 }}
        >
          {COUPLE.partner1}{" "}
          <span className="text-gold-soft">&</span> {COUPLE.partner2}
        </motion.h2>

        <motion.div
          className="my-5 w-36 overflow-hidden rounded-full border-2 border-gold/45 shadow-[0_0_40px_rgba(226,208,164,0.25)] sm:w-44"
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
        >
          <div className="relative aspect-square w-full">
            <CouplePortrait
              who="together"
              alt={`${COUPLE.partner1} and ${COUPLE.partner2}`}
              className="absolute inset-0 h-full w-full rounded-none"
            />
          </div>
        </motion.div>

        <motion.p
          className="max-w-sm font-display text-xl font-medium text-gold-soft italic sm:text-2xl"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          {t("finale.closing")}
        </motion.p>

        <motion.span
          className="mt-3 inline-block text-3xl"
          animate={reduced ? undefined : { scale: [1, 1.18, 1] }}
          transition={{ duration: 1.7, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden
        >
          ❤️
        </motion.span>

        <motion.p
          className="mt-5 font-body text-sm font-medium tracking-wide text-on-dark/90"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.45 }}
        >
          {t("finale.signOff")}
        </motion.p>
      </div>
    </Scene>
  );
}

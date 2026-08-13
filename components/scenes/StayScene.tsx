"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Scene } from "@/components/Scene";
import { Sparkles } from "@/components/fx/Sparkles";
import { LotusBloom } from "@/components/fx/LotusBloom";
import { STAY } from "@/lib/wedding";
import { useScrollRoot } from "@/lib/ScrollContext";
import { useI18n } from "@/lib/i18n";

export function StayScene() {
  const { t } = useI18n();
  const { scrollRef } = useScrollRoot();
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { root: scrollRef, once: true, amount: 0.2 });

  return (
    <Scene
      id="stay"
      className="bg-[radial-gradient(ellipse_at_top,#E5D9C8_0%,#F7F1E8_42%,#C8BFD9_100%)]"
      petals
      petalColors={["#E5D9C8", "#C8BFD9", "#E4D2B0"]}
      petalCount={6}
    >
      <Sparkles count={8} color="#B8923E" />

      <div
        ref={ref}
        className="relative z-10 mx-auto flex w-full max-w-md flex-1 flex-col items-center justify-center"
      >
        <LotusBloom size={36} className="mb-1 text-burgundy" />
        <p className="text-eyebrow text-burgundy">{t("stay.eyebrow")}</p>
        <h2 className="text-section mt-1 font-display font-semibold text-charcoal">
          {STAY.name}
        </h2>
        <p className="mt-1 font-body text-sm font-medium text-ink-muted">{STAY.city}</p>

        <motion.div
          className="mt-4 w-full"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.55 }}
        >
          <div className="premium-card overflow-hidden bg-gradient-to-br from-ivory via-cream to-lavender/35">
            <div className="relative flex aspect-[16/9] items-end justify-center overflow-hidden bg-gradient-to-b from-lavender/45 to-beige/70">
              <div
                aria-hidden
                className="absolute inset-x-8 bottom-0 top-10 rounded-t-3xl border border-gold/30 bg-ivory/75 shadow-inner"
              />
              <div className="absolute left-1/2 top-5 z-10 -translate-x-1/2 text-2xl pin-bounce">
                🏨
              </div>
              <p className="relative z-10 mb-3 font-body text-xs font-medium text-ink-muted">
                {t("stay.photoPlaceholder")}
              </p>
            </div>
            <div className="p-4 text-center">
              <p className="font-display text-xl font-semibold text-charcoal">{STAY.name}</p>
              <p className="mt-1 text-body-readable text-ink">{t("stay.address")}</p>
              <div className="mt-3 aspect-[16/10] overflow-hidden rounded-2xl border border-gold/25">
                <iframe
                  title={STAY.title}
                  src={`https://www.google.com/maps?q=${encodeURIComponent(STAY.query)}&output=embed`}
                  className="h-full w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <a
                href={STAY.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary mt-3"
              >
                {t("common.getDirections")}
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </Scene>
  );
}

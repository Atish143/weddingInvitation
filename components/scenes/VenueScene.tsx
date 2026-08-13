"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Scene } from "@/components/Scene";
import { PalaceSilhouette } from "@/components/fx/PalaceSilhouette";
import { ParallaxLayer } from "@/components/fx/ParallaxLayer";
import { Sparkles } from "@/components/fx/Sparkles";
import { OrnateCorners } from "@/components/fx/OrnateCorners";
import { VENUE } from "@/lib/wedding";
import { useScrollRoot } from "@/lib/ScrollContext";
import { useI18n } from "@/lib/i18n";

export function VenueScene() {
  const { t } = useI18n();
  const { scrollRef } = useScrollRoot();
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { root: scrollRef, once: true, amount: 0.2 });

  const mapsOpen = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(VENUE.query)}`;

  return (
    <Scene
      id="venue"
      className="bg-[linear-gradient(180deg,#D5E3EE_0%,#F7F1E8_48%,#E4D2B0_100%)]"
      petals
      petalColors={["#D5E3EE", "#E4D2B0", "#B8923E"]}
      petalCount={6}
    >
      <OrnateCorners className="text-powder-deep/25" />
      <Sparkles count={10} color="#5F7D94" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 opacity-25">
        <ParallaxLayer speed={0.15}>
          <PalaceSilhouette className="text-powder-deep" />
        </ParallaxLayer>
      </div>

      <div
        ref={ref}
        className="relative z-10 mx-auto flex w-full max-w-md flex-1 flex-col items-center justify-center"
      >
        <motion.div
          className="mb-1 text-2xl pin-bounce"
          aria-hidden
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
        >
          📍
        </motion.div>
        <p className="text-eyebrow text-powder-deep">{t("venue.eyebrow")}</p>
        <h2 className="text-section mt-1 text-center font-display font-semibold text-charcoal">
          {VENUE.name}
        </h2>
        <p className="mt-1 font-body text-sm font-medium text-ink-muted">
          {VENUE.city}
        </p>

        <motion.div
          className="premium-card mt-4 w-full overflow-hidden bg-ivory/90"
          initial={{ opacity: 0, y: 22 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.12 }}
        >
          <div className="relative aspect-[16/10] w-full border-b border-gold/25 bg-powder-soft">
            <iframe
              title={VENUE.title}
              src={`https://www.google.com/maps?q=${encodeURIComponent(VENUE.query)}&output=embed`}
              className="relative z-10 h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="p-4 text-center">
            <p className="text-body-readable text-ink">{t("venue.address")}</p>
            <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:justify-center">
              <a
                href={mapsOpen}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                {t("common.openInMaps")}
              </a>
              <a
                href={VENUE.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
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

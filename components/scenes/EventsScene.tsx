"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Scene } from "@/components/Scene";
import { Sparkles } from "@/components/fx/Sparkles";
import { MandapArch } from "@/components/fx/MandapArch";
import { WEDDING_EVENTS } from "@/lib/wedding";
import { useScrollRoot } from "@/lib/ScrollContext";
import { useI18n } from "@/lib/i18n";
import { EventCard } from "@/components/events/EventCard";

export function EventsScene() {
  const { t } = useI18n();
  const { scrollRef } = useScrollRoot();
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { root: scrollRef, once: true, amount: 0.08 });

  return (
    <Scene
      id="events"
      className="bg-[linear-gradient(180deg,#F7F1E7_0%,#EADBC8_55%,#F7F1E7_100%)]"
      petals
      petalColors={["#EADBC8", "#536B4F", "#B8944A", "#E8C4C8"]}
      petalCount={8}
    >
      <Sparkles count={10} color="#B8944A" />

      {/* Subtle kolam-inspired corner lines */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #B8944A 0, #B8944A 1px, transparent 1px, transparent 12px)",
        }}
      />

      <div ref={ref} className="relative z-10 mx-auto flex w-full max-w-lg flex-1 flex-col py-2">
        <motion.header
          className="mb-4 text-center"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-eyebrow text-terracotta">{t("events.eyebrow")}</p>
          <h2 className="text-section mt-1.5 font-display font-semibold text-deep-brown">
            {t("events.title")}
          </h2>
          <p className="mx-auto mt-2 max-w-sm text-body-readable">
            {t("events.subtitle")}
          </p>
          <div className="mx-auto mt-3 max-w-[14rem] opacity-50">
            <MandapArch className="text-antique-gold" />
          </div>
        </motion.header>

        <div className="flex flex-col gap-5 pb-2">
          {WEDDING_EVENTS.map((event, i) => (
            <EventCard key={event.id} event={event} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </Scene>
  );
}

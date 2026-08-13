"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Scene } from "@/components/Scene";
import { Sparkles } from "@/components/fx/Sparkles";
import { WEDDING_EVENTS } from "@/lib/wedding";
import { useScrollRoot } from "@/lib/ScrollContext";
import { useI18n } from "@/lib/i18n";

const CARD_STYLES: Record<
  (typeof WEDDING_EVENTS)[number]["theme"],
  { card: string; title: string; meta: string; body: string }
> = {
  green: {
    card: "bg-gradient-to-br from-[#EEF3EC] to-[#C5D4C5] border-leaf-green/40",
    title: "text-leaf-green",
    meta: "text-leaf-green",
    body: "text-deep-brown",
  },
  haldi: {
    card: "bg-gradient-to-br from-[#FFF6D9] to-[#F0D78C] border-antique-gold/35",
    title: "text-haldi-deep",
    meta: "text-haldi-deep",
    body: "text-deep-brown",
  },
  engagement: {
    card: "bg-gradient-to-br from-[#FBF6F0] to-[#EADBC8] border-antique-gold/40",
    title: "text-maroon",
    meta: "text-terracotta",
    body: "text-deep-brown",
  },
  sangeet: {
    card: "bg-gradient-to-br from-[#2E3D2C] to-[#3A4A38] border-antique-gold/35",
    title: "text-gold-soft",
    meta: "text-gold-soft/85",
    body: "text-on-dark",
  },
  wedding: {
    card: "bg-gradient-to-br from-[#F7F1E7] to-[#EADBC8] border-maroon/30",
    title: "text-maroon",
    meta: "text-antique-gold",
    body: "text-deep-brown",
  },
};

export function DressCodeScene() {
  const { t } = useI18n();
  const { scrollRef } = useScrollRoot();
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { root: scrollRef, once: true, amount: 0.12 });

  return (
    <Scene
      id="dresscode"
      className="bg-[radial-gradient(ellipse_at_center,#EADBC8_0%,#F7F1E7_50%,#EEF3EC_100%)]"
      petals
      petalColors={["#EADBC8", "#536B4F", "#B8944A", "#E8C4C8"]}
      petalCount={6}
    >
      <Sparkles count={8} color="#B8944A" />

      <div ref={ref} className="relative z-10 mx-auto flex w-full max-w-lg flex-1 flex-col justify-center">
        <div className="mb-3 text-center">
          <p className="text-eyebrow text-terracotta">{t("dresscode.eyebrow")}</p>
          <h2 className="text-section mt-1 font-display font-semibold text-deep-brown">
            {t("dresscode.title")}
          </h2>
          <p className="mx-auto mt-1 max-w-xs text-body-readable">
            {t("dresscode.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
          {WEDDING_EVENTS.map((event, i) => {
            const style = CARD_STYLES[event.theme];
            const fullWidth = i === WEDDING_EVENTS.length - 1;
            return (
              <motion.article
                key={event.id}
                className={`premium-card p-3 ${style.card} ${
                  fullWidth ? "col-span-2 sm:mx-auto sm:w-[calc(50%-0.35rem)]" : ""
                }`}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.06 * i }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="mb-2 flex items-center gap-2">
                  <span
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/40 text-lg"
                    aria-hidden
                  >
                    {event.dressIcon}
                  </span>
                  <div className="min-w-0">
                    <p className={`font-body text-[10px] font-semibold tracking-wide uppercase ${style.meta}`}>
                      {t(event.dayKey)}
                    </p>
                    <h3 className={`font-display text-base font-semibold leading-tight sm:text-lg ${style.title}`}>
                      {t(event.titleKey)}
                    </h3>
                  </div>
                </div>
                <p className={`font-body text-xs font-medium leading-snug sm:text-sm ${style.body}`}>
                  {t(event.dressCodeKey)}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </Scene>
  );
}

"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Scene } from "@/components/Scene";
import { ScratchCard } from "@/components/scenes/ScratchCard";
import { CelebrationCanvas } from "@/components/scenes/CelebrationCanvas";
import { Sparkles } from "@/components/fx/Sparkles";
import { LightRays } from "@/components/fx/LightRays";
import { LotusBloom } from "@/components/fx/LotusBloom";
import { COUPLE, WEDDING } from "@/lib/wedding";
import { useI18n } from "@/lib/i18n";

type Parts = { days: number; hours: number; minutes: number; seconds: number };

const EMPTY: Parts = { days: 0, hours: 0, minutes: 0, seconds: 0 };

function getParts(target: number): Parts {
  const diff = Math.max(0, target - Date.now());
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  };
}

export function CountdownScene() {
  const { t } = useI18n();
  const target = new Date(WEDDING.targetDateIso).getTime();
  const [parts, setParts] = useState<Parts>(EMPTY);
  const [ready, setReady] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [celebrate, setCelebrate] = useState(false);

  useEffect(() => {
    setParts(getParts(target));
    setReady(true);
    const id = window.setInterval(() => setParts(getParts(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  const units = [
    { label: t("countdown.days"), value: parts.days },
    { label: t("countdown.hours"), value: parts.hours },
    { label: t("countdown.mins"), value: parts.minutes },
    { label: t("countdown.secs"), value: parts.seconds },
  ];

  return (
    <Scene
      id="countdown"
      className="bg-[radial-gradient(ellipse_at_top,#E4D2B0_0%,#F7F1E8_48%,#E8C4C8_100%)]"
      petals
      petalColors={["#E2D0A4", "#B8923E", "#E8C4C8", "#B87A82"]}
      petalCount={12}
    >
      <CelebrationCanvas active={celebrate} />
      <LightRays tone="gold" />
      <Sparkles count={22} color="#B8923E" />

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center text-center">
        <LotusBloom size={42} className="mb-2 text-gold-deep" />
        <p className="mb-1 text-eyebrow text-burgundy">{t("countdown.surprise")}</p>
        <h2 className="text-section mb-2 font-display font-semibold text-charcoal">
          {revealed ? t("countdown.specialDay") : t("countdown.scratchTitle")}
        </h2>
        <p className="mb-5 max-w-sm text-body-readable">
          {revealed ? t("countdown.near") : t("countdown.hint")}
        </p>

        <ScratchCard
          revealed={revealed}
          overlayLabel={"Scratch to reveal\nour special day"}
          heightClass="h-48 sm:h-56"
          onReveal={() => {
            setRevealed(true);
            setCelebrate(true);
          }}
        >
          <div className="w-full">
            <p className="mb-1 font-display text-xl font-semibold text-charcoal sm:text-2xl">
              {COUPLE.partner1} & {COUPLE.partner2}
            </p>
            <p className="mb-3 font-body text-[10px] font-semibold tracking-[0.2em] text-gold-deep uppercase">
              {t("countdown.until")}
            </p>
            <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
              {units.map((u) => (
                <div
                  key={u.label}
                  className="rounded-xl border border-gold/40 bg-ivory px-1 py-2.5 shadow-sm sm:px-2 sm:py-3"
                >
                  <p
                    className="font-display text-xl font-semibold text-charcoal tabular-nums sm:text-3xl"
                    suppressHydrationWarning
                  >
                    {ready ? String(u.value).padStart(2, "0") : "--"}
                  </p>
                  <p className="font-body text-[9px] font-medium tracking-wider text-ink-muted uppercase sm:text-[10px]">
                    {u.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </ScratchCard>

        {revealed && (
          <motion.p
            className="mt-5 font-display text-lg font-medium text-burgundy italic sm:text-xl"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {t("countdown.closing")} ❤️
          </motion.p>
        )}
      </div>
    </Scene>
  );
}

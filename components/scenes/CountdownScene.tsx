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

type Parts = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const EMPTY: Parts = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
};

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

    const id = window.setInterval(() => {
      setParts(getParts(target));
    }, 1000);

    return () => clearInterval(id);
  }, [target]);

  const units = [
    {
      label: t("countdown.days"),
      value: parts.days,
    },
    {
      label: t("countdown.hours"),
      value: parts.hours,
    },
    {
      label: t("countdown.mins"),
      value: parts.minutes,
    },
    {
      label: t("countdown.secs"),
      value: parts.seconds,
    },
  ];

  return (
    <Scene
      id="countdown"
      className="relative overflow-hidden bg-[#f5e4ce]"
      petals
      petalColors={[
        "#EBC9AD",
        "#E8C4C8",
        "#D8C48A",
        "#C7A16A",
      ]}
      petalCount={10}
    >
      {/* =====================================================
          BACKGROUND IMAGE
          public/images/events/countdownscreenbg.png
         ===================================================== */}

      <div
        className="pointer-events-none absolute inset-0 z-0"
        aria-hidden="true"
      >
        <img
          src="/images/events/countdownscreenbg.png"
          alt=""
          className="h-full w-full object-cover object-center"
        />
      </div>

      {/* Very subtle warm overlay */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          z-[1]
          bg-[#fff5e8]/10
        "
        aria-hidden="true"
      />

      {/* Existing effects */}
      <CelebrationCanvas active={celebrate} />

      <div className="relative z-[2]">
        <LightRays tone="gold" />
      </div>

      <div className="relative z-[2]">
        <Sparkles count={16} color="#B8923E" />
      </div>

      {/* =====================================================
          CONTENT
         ===================================================== */}

      <div
        className="
          relative
          z-10
          flex
          flex-1
          flex-col
          items-center
          justify-center
          px-4
          py-5
          text-center
        "
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="
            mb-4
            flex
            flex-col
            items-center
          "
        >
          <LotusBloom
            size={40}
            className="mb-2 text-gold-deep"
          />

          <p className="mb-1 text-eyebrow text-burgundy">
            {t("countdown.surprise")}
          </p>

          <h2
            className="
              text-section
              font-display
              font-semibold
              text-[#34211f]
            "
          >
            {revealed
              ? t("countdown.specialDay")
              : t("countdown.scratchTitle")}
          </h2>

          <p
            className="
              mt-1
              max-w-sm
              text-body-readable
              text-[#514541]
            "
          >
            {revealed
              ? t("countdown.near")
              : t("countdown.hint")}
          </p>
        </motion.div>

        {/* Scratch card */}
        <motion.div
          initial={{
            opacity: 0,
            y: 18,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.7,
            delay: 0.15,
          }}
          className="w-full"
        >
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
              <p
                className="
                  mb-1
                  font-display
                  text-xl
                  font-semibold
                  text-[#30201e]
                  sm:text-2xl
                "
              >
                {COUPLE.partner1} & {COUPLE.partner2}
              </p>

              <p
                className="
                  mb-3
                  font-body
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.2em]
                  text-[#96702d]
                "
              >
                {t("countdown.until")}
              </p>

              <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
                {units.map((u) => (
                  <div
                    key={u.label}
                    className="
                      rounded-xl
                      border
                      border-[#b8923e]/35
                      bg-[#fffaf1]
                      px-1
                      py-2.5
                      shadow-[0_3px_10px_rgba(110,70,30,0.10)]
                      sm:px-2
                      sm:py-3
                    "
                  >
                    <p
                      className="
                        font-display
                        text-xl
                        font-semibold
                        tabular-nums
                        text-[#30201e]
                        sm:text-3xl
                      "
                      suppressHydrationWarning
                    >
                      {ready
                        ? String(u.value).padStart(2, "0")
                        : "--"}
                    </p>

                    <p
                      className="
                        font-body
                        text-[9px]
                        font-medium
                        uppercase
                        tracking-wider
                        text-[#665b56]
                        sm:text-[10px]
                      "
                    >
                      {u.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </ScratchCard>
        </motion.div>

        {/* Closing message */}
        {revealed && (
          <motion.p
            className="
              mt-5
              font-display
              text-lg
              font-medium
              italic
              text-[#713845]
              sm:text-xl
            "
            initial={{
              opacity: 0,
              y: 12,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
          >
            {t("countdown.closing")} ❤️
          </motion.p>
        )}
      </div>
    </Scene>
  );
}
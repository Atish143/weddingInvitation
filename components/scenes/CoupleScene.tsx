"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Scene } from "@/components/Scene";
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

  const inView = useInView(ref, {
    root: scrollRef,
    once: true,
    amount: 0.2,
  });

  const reduced = usePrefersReducedMotion();

  return (
    <Scene
      id="couple"
      className="relative overflow-hidden bg-[#f8eee3]"
      petals
      petalColors={[
        "#E8C4C8",
        "#E4D2B0",
        "#B8923E",
        "#E9B8B8",
      ]}
      petalCount={8}
    >
      {/* =====================================================
          BACKGROUND IMAGE
          File:
          public/images/events/couplescenebg.png
         ===================================================== */}

      <div
        className="pointer-events-none absolute inset-0 z-0"
        aria-hidden="true"
        style={{
          backgroundImage:
            "url('/images/events/couplescenebg.png')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
          backgroundSize: "cover",
        }}
      />

      {/* Soft overlay so text remains readable */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-[#fff8ed]/10"
        aria-hidden="true"
      />

      {/* Subtle center glow */}
      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-[38%]
          z-[2]
          h-[45%]
          w-[90%]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-[#fff8ed]/25
          blur-3xl
        "
        aria-hidden="true"
      />

      {/* Existing decorative effects */}
      <Sparkles count={10} color="#B87A82" />

      <OrnateCorners className="z-[4] text-gold/35" />

      {/* =====================================================
          CONTENT
         ===================================================== */}

      <div
        ref={ref}
        className="
          relative
          z-10
          mx-auto
          flex
          w-full
          max-w-xl
          flex-1
          flex-col
          items-center
          px-5
          pt-[16%]
          sm:px-8
          sm:pt-[12%]
        "
      >
        {/* Main wedding content */}
        <motion.div
          initial={{
            opacity: 0,
            y: reduced ? 0 : 20,
          }}
          animate={
            inView
              ? {
                  opacity: 1,
                  y: 0,
                }
              : {}
          }
          transition={{
            duration: 0.8,
            ease: "easeOut",
          }}
          className="
            flex
            w-full
            flex-col
            items-center
            text-center
          "
        >
          {/* Lotus */}
          <motion.div
            initial={{
              opacity: 0,
              scale: reduced ? 1 : 0.7,
            }}
            animate={
              inView
                ? {
                    opacity: 1,
                    scale: 1,
                  }
                : {}
            }
            transition={{
              duration: 0.7,
              delay: 0.1,
            }}
          >
            <LotusBloom
              size={36}
              className="mb-3 text-rose-deep"
            />
          </motion.div>

          {/* THE COUPLE */}
          <motion.p
            className="
              font-body
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.35em]
              text-[#7b3040]
              sm:text-xs
            "
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{
              duration: 0.7,
              delay: 0.2,
            }}
          >
            {t("couple.eyebrow")}
          </motion.p>

          {/* Names */}
          <motion.h2
            className="
              mt-2
              px-2
              font-display
              text-[2.1rem]
              font-semibold
              leading-tight
              tracking-tight
              text-[#34211f]
              sm:text-5xl
            "
            initial={{
              opacity: 0,
              y: reduced ? 0 : 15,
              filter: "blur(5px)",
            }}
            animate={
              inView
                ? {
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                  }
                : {
                    opacity: 0,
                    y: 15,
                  }
            }
            transition={{
              duration: 0.8,
              delay: 0.25,
            }}
          >
            {COUPLE.partner1}

            <span className="mx-2 font-normal italic text-[#a75b67]">
              &
            </span>

            {COUPLE.partner2}
          </motion.h2>

          {/* Gold divider */}
          <motion.div
            className="mt-4 flex items-center gap-3"
            initial={{
              opacity: 0,
              scaleX: 0,
            }}
            animate={
              inView
                ? {
                    opacity: 1,
                    scaleX: 1,
                  }
                : {}
            }
            transition={{
              duration: 0.7,
              delay: 0.45,
            }}
          >
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-[#b8923e]" />

            <span className="text-xs text-[#b8923e]">
              ✦
            </span>

            <span className="h-px w-12 bg-gradient-to-l from-transparent to-[#b8923e]" />
          </motion.div>

          {/* Bride / Groom */}
          <motion.div
            className="
              mt-5
              flex
              items-center
              justify-center
              gap-5
              rounded-full
              border
              border-[#b8923e]/20
              bg-[#fffaf2]/35
              px-5
              py-2.5
              backdrop-blur-[2px]
            "
            initial={{
              opacity: 0,
              y: reduced ? 0 : 10,
            }}
            animate={
              inView
                ? {
                    opacity: 1,
                    y: 0,
                  }
                : {}
            }
            transition={{
              duration: 0.6,
              delay: 0.55,
            }}
          >
            <div>
              <p className="font-body text-[8px] font-semibold uppercase tracking-[0.22em] text-[#a1782f]">
                {t("common.groom")}
              </p>

              <p className="mt-0.5 font-display text-sm text-[#3b2926] sm:text-base">
                {COUPLE.partner1}
              </p>
            </div>

            <span className="text-[#b8923e]/60">✦</span>

            <div>
              <p className="font-body text-[8px] font-semibold uppercase tracking-[0.22em] text-[#a75b67]">
                {t("common.bride")}
              </p>

              <p className="mt-0.5 font-display text-sm text-[#3b2926] sm:text-base">
                {COUPLE.partner2}
              </p>
            </div>
          </motion.div>

          {/* Forever text */}
          <motion.p
            className="
              mt-5
              max-w-xs
              font-display
              text-sm
              font-medium
              italic
              text-[#713845]
              sm:text-lg
            "
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{
              delay: 0.7,
              duration: 0.7,
            }}
          >
            {t("couple.forever")}
          </motion.p>
        </motion.div>
      </div>
    </Scene>
  );
}
"use client";

import { motion } from "framer-motion";
import { Scene } from "@/components/Scene";
import { Sparkles } from "@/components/fx/Sparkles";
import { COUPLE } from "@/lib/wedding";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import { useI18n } from "@/lib/i18n";

export function FinaleScene() {
  const { t } = useI18n();
  const reduced = usePrefersReducedMotion();

  return (
    <Scene
      id="finale"
      className="relative overflow-hidden bg-[#310B17]"
      showHints={false}
      petals={false}
    >
      {/* =====================================================
          BACKGROUND
          The artwork itself contains:
          - Gold border
          - Rays
          - Petals
          - Sparkles
          - Hands
          - Heart
          - Lotus
          - Bottom flowers
         ===================================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
      >
        <img
          src="/images/events/thankyoubg.png"
          alt=""
          className="h-full w-full object-cover object-center"
        />
      </div>

      {/* =====================================================
          VERY SUBTLE CENTER GLOW
         ===================================================== */}

      <motion.div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          z-[1]
          h-[360px]
          w-[360px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-[#E8A65A]/10
          blur-[90px]
        "
        animate={
          reduced
            ? undefined
            : {
                opacity: [0.25, 0.5, 0.25],
                scale: [0.96, 1.04, 0.96],
              }
        }
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Only a few extra sparkles */}
      <Sparkles count={5} color="#E2D0A4" />

      {/* =====================================================
          CONTENT

          IMPORTANT:
          inset-0 makes this container exactly cover the Scene.
          Therefore percentage positioning works correctly.
         ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          z-10
          mx-auto
          w-full
          max-w-md
          text-center
        "
      >
        {/* =================================================
            WITH LOVE
            Just above the artwork
           ================================================= */}

        <motion.p
          className="
            absolute
            left-1/2
            top-[25%]
            -translate-x-1/2
            whitespace-nowrap
            font-body
            text-[14px]
            font-semibold
            uppercase
            tracking-[0.38em]
            text-[#E7D5A7]
            drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)]
            sm:text-[10px]
          "
          initial={{
            opacity: 0,
            y: 12,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: true }}
          transition={{
            duration: 0.7,
          }}
        >
          {t("finale.eyebrow")}
        </motion.p>

        {/* =================================================
            NAMES
            Positioned immediately above the hands circle
           ================================================= */}

        <motion.h2
          className="
            absolute
            left-1/2
            top-[28%]
            w-full
            -translate-x-1/2
            px-4
            font-display
            text-[2rem]
            font-semibold
            leading-tight
            text-[#FFF3E0]
            drop-shadow-[0_3px_12px_rgba(0,0,0,0.55)]
            sm:text-[2.6rem]
          "
          initial={{
            opacity: 0,
            y: 18,
            filter: "blur(8px)",
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
          }}
          viewport={{ once: true }}
          transition={{
            duration: 0.9,
            delay: 0.12,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {COUPLE.partner1}{" "}
          <span className="font-normal italic text-[#E2D0A4]">
            &
          </span>{" "}
          {COUPLE.partner2}
        </motion.h2>

        {/* =================================================
            GOLD DIVIDER
           ================================================= */}

        <motion.div
          className="
            absolute
            left-1/2
            top-[43%]
            flex
            -translate-x-1/2
            items-center
            gap-3
          "
          initial={{
            opacity: 0,
            scaleX: 0,
          }}
          whileInView={{
            opacity: 1,
            scaleX: 1,
          }}
          viewport={{ once: true }}
          transition={{
            delay: 0.3,
            duration: 0.7,
          }}
        >
          <span
            className="
              h-px
              w-9
              bg-gradient-to-r
              from-transparent
              to-[#CDAE63]
            "
          />

          <span className="text-[9px] text-[#E2D0A4]">
            ✦
          </span>

          <span
            className="
              h-px
              w-9
              bg-gradient-to-l
              from-transparent
              to-[#CDAE63]
            "
          />
        </motion.div>

        {/* =================================================
            CLOSING MESSAGE

            Below the lotus artwork
           ================================================= */}

        <motion.p
          className="
            absolute
            left-1/2
            top-[64%]
            w-[88%]
            -translate-x-1/2
            font-display
            text-lg
            font-medium
            italic
            leading-relaxed
            text-[#E8D4A4]
            drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)]
            sm:text-xl
          "
          initial={{
            opacity: 0,
            y: 14,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: true }}
          transition={{
            delay: 0.45,
            duration: 0.8,
          }}
        >
          {t("finale.closing")}
        </motion.p>

        {/* =================================================
            SIGN OFF
           ================================================= */}

        <motion.div
          className="
            absolute
            left-1/2
            top-[68%]
            w-full
            -translate-x-1/2
          "
          initial={{
            opacity: 0,
            y: 10,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: true }}
          transition={{
            delay: 0.65,
            duration: 0.7,
          }}
        >
          <p
            className="
              font-body
              text-[9px]
              font-medium
              uppercase
              tracking-[0.32em]
              text-[#CFAE68]
            "
          >
            WITH LOVE
          </p>

          <p
            className="
              mt-1.5
              font-body
              text-sm
              font-medium
              tracking-wide
              text-[#FFF1DE]
              drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]
            "
          >
            {t("finale.signOff")}
          </p>
        </motion.div>

        {/* =================================================
            SMALL ANIMATED LIGHT AROUND THE ARTWORK
           ================================================= */}

        <motion.div
          aria-hidden="true"
          className="
            absolute
            left-1/2
            top-[51%]
            h-2
            w-2
            -translate-x-1/2
            rounded-full
            bg-[#FFE5A8]
            blur-[3px]
          "
          animate={
            reduced
              ? undefined
              : {
                  opacity: [0.2, 0.9, 0.2],
                  scale: [0.7, 1.5, 0.7],
                }
          }
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
    </Scene>
  );
}
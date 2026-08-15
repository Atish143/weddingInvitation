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

  const inView = useInView(ref, {
    root: scrollRef,
    once: true,
    amount: 0.2,
  });

  return (
    <Scene
      id="stay"
      className="relative overflow-hidden bg-[#eadff0]"
      petals
      petalColors={[
        "#E7D2DD",
        "#D7C5E2",
        "#C9A66B",
        "#E5D1C8",
      ]}
      petalCount={6}
    >
      {/* =====================================================
          BACKGROUND
          public/images/events/stayb.png
         ===================================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
      >
        <img
          src="/images/events/stayb.png"
          alt=""
          className="h-full w-full object-cover object-center"
        />
      </div>

      {/* Soft readability overlay */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          z-[1]
          bg-[#fffaf5]/10
        "
      />

      <Sparkles count={8} color="#B8924A" />

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
          max-w-md
          flex-1
          flex-col
          items-center
          justify-center
          px-4
          py-6
          sm:px-6
        "
      >
        {/* Heading */}
        <motion.div
          className="mb-4 text-center"
          initial={{
            opacity: 0,
            y: 15,
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
            duration: 0.7,
          }}
        >
          <LotusBloom
            size={32}
            className="mx-auto mb-1 text-[#714356]"
          />

          <p
            className="
              font-body
              text-[14px]
              font-semibold
              uppercase
               tracking-[0.20em]
              text-[#714356]
              margin-top-[12px]
            "
          >
            {t("stay.eyebrow")}
          </p>

          <h2
            className="
              mt-1
              font-display
              text-[2rem]
              font-semibold
              leading-tight
              text-[#342828]
              sm:text-4xl
            "
          >
            {STAY.name}
          </h2>

          <p
            className="
              mt-1
              font-body
              text-sm
              font-medium
              text-[#5f5757]
            "
          >
            {STAY.city}
          </p>

          <div className="mt-2 flex items-center justify-center gap-2">
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-[#B8924A]" />

            <span className="text-[9px] text-[#B8924A]">
              ✦
            </span>

            <span className="h-px w-8 bg-gradient-to-l from-transparent to-[#B8924A]" />
          </div>
        </motion.div>

        {/* =====================================================
            STAY CARD
           ===================================================== */}

        <motion.div
          className="
            w-full
            overflow-hidden
            rounded-[24px]
            border
            border-[#B8924A]/30
            bg-[#FFF9F3]/88
            shadow-[0_18px_50px_rgba(85,65,80,0.15)]
            backdrop-blur-[3px]
          "
          initial={{
            opacity: 0,
            y: 20,
            scale: 0.97,
          }}
          animate={
            inView
              ? {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }
              : {}
          }
          transition={{
            duration: 0.6,
            delay: 0.12,
          }}
        >
          {/* Hotel information */}
        

          {/* Map */}
          <div className="px-3 pb-3 pt-3">
            <div
              className="
                overflow-hidden
                rounded-[18px]
                border
                border-[#B8924A]/25
                bg-[#E8E1E8]
                shadow-inner
              "
            >
              <div className="aspect-[16/10]">
                <iframe
                  title={STAY.title}
                  src={`https://www.google.com/maps?q=${encodeURIComponent(
                    STAY.query,
                  )}&output=embed`}
                  className="h-full w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="px-4 pb-4">
            <a
              href={STAY.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="
                flex
                min-h-11
                w-full
                items-center
                justify-center
                rounded-full
                bg-[#714356]
                px-5
                py-2.5
                font-body
                text-sm
                font-semibold
                text-white
                shadow-[0_8px_22px_rgba(113,67,86,0.22)]
                transition
                hover:bg-[#64394b]
                active:scale-[0.98]
              "
            >
              {t("common.getDirections")}
            </a>
          </div>
        </motion.div>

        {/* Bottom ornament */}
        <motion.div
          className="mt-4 flex items-center gap-2"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{
            delay: 0.65,
            duration: 0.6,
          }}
        >
          <span className="h-px w-8 bg-gradient-to-r from-transparent to-[#B8924A]/60" />

          <span className="text-[9px] text-[#B8924A]">
            ✦
          </span>

          <span className="h-px w-8 bg-gradient-to-l from-transparent to-[#B8924A]/60" />
        </motion.div>
      </div>
    </Scene>
  );
}
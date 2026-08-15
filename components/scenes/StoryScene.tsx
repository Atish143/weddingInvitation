"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Scene } from "@/components/Scene";
import { LotusBloom } from "@/components/fx/LotusBloom";
import { Sparkles } from "@/components/fx/Sparkles";
import { useScrollRoot } from "@/lib/ScrollContext";
import { useI18n } from "@/lib/i18n";

const ICONS = ["✨", "💗", "💍", "🕊️"] as const;

export function StoryScene() {
  const { t } = useI18n();
  const { scrollRef } = useScrollRoot();

  const ref = useRef<HTMLDivElement | null>(null);

  const inView = useInView(ref, {
    root: scrollRef,
    once: true,
    amount: 0.15,
  });

  const moments = [
    {
      title: t("story.m1Title"),
      line: t("story.m1Line"),
      icon: ICONS[0],
    },
    {
      title: t("story.m2Title"),
      line: t("story.m2Line"),
      icon: ICONS[1],
    },
    {
      title: t("story.m3Title"),
      line: t("story.m3Line"),
      icon: ICONS[2],
    },
    {
      title: t("story.m4Title"),
      line: t("story.m4Line"),
      icon: ICONS[3],
    },
  ];

  return (
    <Scene
      id="story"
      className="relative overflow-hidden bg-[#f8eee3]"
      petals
      petalColors={["#E8C9B4", "#E8C4C8", "#E4D2B0"]}
      petalCount={6}
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <img
          src="/images/events/storyscenebg.png"
          alt=""
          className="h-full w-full object-cover object-center"
        />
      </div>

      {/* Very light overlay */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[#fff8ed]/10" />

      {/* Existing sparkle effect */}
      <Sparkles count={10} color="#B87A82" />

      {/* Main content */}
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
          justify-center
          px-4
          py-5
        "
      >
        {/* Header */}
        <motion.div
          className="mb-5 text-center"
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <LotusBloom
            size={32}
            className="mx-auto mb-1 text-rose-deep"
          />

          <p className="text-eyebrow text-burgundy">
            {t("story.eyebrow")}
          </p>

          <h2 className="text-section mt-1 font-display font-semibold text-[#30201e]">
            {t("story.title")}
          </h2>

          <div className="mx-auto mt-2 flex items-center justify-center gap-2">
            <span className="h-px w-10 bg-gradient-to-r from-transparent to-[#b8923e]" />

            <span className="text-[10px] text-[#b8923e]">
              ✦
            </span>

            <span className="h-px w-10 bg-gradient-to-l from-transparent to-[#b8923e]" />
          </div>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <motion.div
            className="
              absolute
              bottom-4
              left-[20px]
              top-4
              z-0
              w-[2px]
              origin-top
              bg-gradient-to-b
              from-[#a1782f]
              via-[#b8923e]
              to-[#b8923e]/30
            "
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{
              duration: 1.1,
              ease: [0.22, 1, 0.36, 1],
            }}
          />

          <ul className="relative space-y-3">
            {moments.map((m, i) => (
              <motion.li
                key={m.title}
                className="relative flex gap-2.5"
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{
                  delay: 0.12 * i + 0.15,
                  duration: 0.5,
                }}
              >
                {/* Timeline number */}
                <span
                  className="
                    relative
                    z-10
                    flex
                    h-10
                    w-10
                    shrink-0
                    flex-col
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-[#b8923e]/60
                    bg-[#fffaf2]
                    shadow-md
                  "
                >
                  <span className="font-body text-[9px] font-semibold text-[#8d6624]">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <span
                    className="text-[11px]"
                    aria-hidden
                  >
                    {m.icon}
                  </span>
                </span>

                {/* Story card */}
                <div
                  className="
                    min-w-0
                    flex-1
                    rounded-2xl
                    border
                    border-[#b8923e]/25
                    bg-[#fffaf2]/95
                    px-3.5
                    py-3
                    shadow-[0_6px_20px_rgba(80,50,30,0.12)]
                    backdrop-blur-sm
                  "
                >
                  <p className="font-display text-base font-semibold leading-tight text-[#30201e] sm:text-lg">
                    {m.title}
                  </p>

                  <p className="mt-1 text-body-readable text-[#5d504c]">
                    {m.line}
                  </p>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Invitation */}
        <motion.div
          className="
            mx-auto
            mt-5
            rounded-full
            border
            border-[#b8923e]/25
            bg-[#fffaf2]/95
            px-4
            py-2
            shadow-[0_5px_18px_rgba(80,50,30,0.10)]
          "
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
        >
          <p className="text-center font-display text-sm font-medium leading-relaxed text-burgundy">
            {t("story.invite")}
          </p>
        </motion.div>
      </div>
    </Scene>
  );
}
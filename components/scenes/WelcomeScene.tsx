"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { Scene } from "@/components/Scene";
import { Sparkles } from "@/components/fx/Sparkles";
import { LightRays } from "@/components/fx/LightRays";
import { COUPLE } from "@/lib/wedding";
import { useScrollRoot } from "@/lib/ScrollContext";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import { useI18n } from "@/lib/i18n";
import { useMusic } from "@/lib/MusicContext";

const OPENED_KEY = "wedding-envelope-opened";

type Phase = "closed" | "opening" | "opened";

function SoftParticles({ denser = false }: { denser?: boolean }) {
  const dots = useMemo(
    () =>
      Array.from({ length: denser ? 28 : 16 }, (_, i) => ({
        id: i,
        left: `${(i * 17 + 4) % 96}%`,
        top: `${(i * 23 + 6) % 88}%`,
        size: 3 + (i % 5) * 2,
        delay: (i % 7) * 0.35,
      })),
    [denser],
  );

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-[2] overflow-hidden"
    >
      {dots.map((d) => (
        <span
          key={d.id}
          className="absolute rounded-full bg-[#B8923E]/60 blur-[1px] glow-breathe"
          style={{
            left: d.left,
            top: d.top,
            width: d.size,
            height: d.size,
            animationDelay: `${d.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

export function WelcomeScene() {
  const { t } = useI18n();
  const { goToScene } = useScrollRoot();
  const { playFromUserGesture } = useMusic();
  const reduced = usePrefersReducedMotion();

  const [phase, setPhase] = useState<Phase>("closed");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(OPENED_KEY) === "1") {
        setPhase("opened");
      }
    } catch {
      /* ignore */
    }

    setHydrated(true);
  }, []);

  const open = () => {
    if (phase !== "closed") return;

    void playFromUserGesture();

    setPhase("opening");

    try {
      sessionStorage.setItem(OPENED_KEY, "1");
    } catch {
      /* ignore */
    }

    // Just reveal the invitation and stay on this scene.
    // No auto-scroll — the user scrolls down themselves whenever ready.
    window.setTimeout(
      () => {
        setPhase("opened");
      },
      reduced ? 400 : 2200,
    );
  };

  /* ============================================================
     LOADING STATE
     ============================================================ */

  if (!hydrated) {
    return (
      <Scene
        id="welcome"
        className="relative overflow-hidden bg-[#F7E8C5]"
        showHints={false}
      >
        {/* Background image */}
        <div
          aria-hidden
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/images/events/firstscreenbg.png')",
          }}
        />

        <div className="relative z-10 flex flex-1 items-center justify-center" />
      </Scene>
    );
  }

  return (
    <Scene
      id="welcome"
      className="relative overflow-hidden bg-[#F7E8C5]"
      petals={phase !== "closed"}
      petalColors={["#E2D0A4", "#E8C4C8", "#B8923E", "#F7F1E8"]}
      petalCount={phase === "opened" ? 10 : 16}
      showHints={phase === "opened"}
    >
      {/* ============================================================
          WEDDING BACKGROUND

          MOBILE:
          Shows the COMPLETE image instead of cropping it.

          DESKTOP:
          Uses cover so the image fills the screen.
         ============================================================ */}

      <div
        aria-hidden
        className="
          absolute inset-0 z-0
          bg-no-repeat
          bg-center
          bg-[length:100%_100%]
          sm:bg-cover
        "
        style={{
          backgroundImage: "url('/images/events/firstscreenbg.png')",
        }}
      />

      {/* Very subtle overlay for text readability */}
      <div
        aria-hidden
        className="
          pointer-events-none
          absolute inset-0 z-[1]
          bg-[radial-gradient(
            ellipse_at_center,
            rgba(255,248,225,0.02)_0%,
            rgba(255,248,225,0.04)_55%,
            rgba(90,45,15,0.08)_100%
          )]
        "
      />

      {/* ============================================================
          EFFECTS
         ============================================================ */}

      <LightRays tone="gold" />

      <SoftParticles denser={phase !== "closed"} />

      <Sparkles
        count={phase === "closed" ? 14 : 26}
        color="#B8923E"
      />

      {/* ============================================================
          CONTENT
         ============================================================ */}

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 text-center">
        <AnimatePresence mode="wait">
          {phase === "opened" ? (
            <motion.div
              key="opened"
              className="px-4"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              {/* Invitation text */}

              <p className="text-eyebrow text-[#8A5A20]">
                {t("welcome.youreInvited")}
              </p>

              <h1 className="text-names mt-3 font-display text-[#54251E] drop-shadow-[0_2px_3px_rgba(255,245,210,0.8)]">
                {COUPLE.partner1}{" "}
                <span className="text-[#A87524]">&</span>{" "}
                {COUPLE.partner2}
              </h1>

              <p className="mx-auto mt-4 max-w-sm font-display text-lg italic text-[#70402A] drop-shadow-[0_1px_2px_rgba(255,248,225,0.8)] sm:text-xl">
                {t("welcome.tagline")}
              </p>

              <p className="mt-8 font-body text-xs font-medium tracking-wide text-[#5E3828]">
                {t("common.scrollHint")} ↓
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="envelope"
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <p className="mb-5 text-eyebrow text-[#8A5A20]">
                {t("welcome.youreInvited")}
              </p>

              {/* ======================================================
                  ENVELOPE (sized down)
                 ====================================================== */}

              <button
                type="button"
                onClick={open}
                disabled={phase !== "closed"}
                aria-label={t("welcome.tapToOpen")}
                className={`relative ${
                  phase === "closed" && !reduced ? "envelope-float" : ""
                }`}
                style={{ perspective: 1200 }}
              >
                <motion.div
                  className="relative h-[10.5rem] w-[min(13.5rem,72vw)] sm:h-48 sm:w-64"
                  animate={
                    phase === "opening" && !reduced
                      ? { scale: 1.05, y: -8 }
                      : { scale: 1, y: 0 }
                  }
                  transition={{
                    type: "spring",
                    stiffness: 120,
                    damping: 18,
                  }}
                >
                  {/* Envelope body */}

                  <div
                    className="absolute inset-0 overflow-hidden rounded-md border border-[#B8923E]/50 shadow-[0_24px_60px_rgba(80,45,10,0.3)]"
                    style={{
                      background:
                        "linear-gradient(145deg, #F5E2B5 0%, #D8B56A 48%, #A87524 100%)",
                    }}
                  >
                    <div
                      className="absolute inset-0 opacity-30"
                      style={{
                        backgroundImage:
                          "radial-gradient(circle at 20% 30%, #FFF8E7 1.2px, transparent 1.3px), radial-gradient(circle at 70% 60%, #8A5A20 1px, transparent 1.1px)",
                        backgroundSize: "26px 26px, 20px 20px",
                      }}
                    />
                  </div>

                  {/* Invitation card */}

                  <motion.div
                    className="absolute left-1/2 top-4 z-[5] w-[72%] -translate-x-1/2 overflow-hidden rounded-sm bg-[#FFF8E7] shadow-lg sm:top-5"
                    initial={{
                      y: 46,
                      opacity: 0,
                      rotate: -2,
                    }}
                    animate={
                      phase === "opening"
                        ? {
                            y: -28,
                            opacity: 1,
                            rotate: 1.5,
                          }
                        : {
                            y: 46,
                            opacity: 0,
                            rotate: -2,
                          }
                    }
                    transition={{
                      delay: 0.55,
                      duration: 0.85,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <div className="px-2.5 py-4 sm:py-5">
                      <p className="font-display text-sm text-[#54251E] sm:text-base">
                        {COUPLE.partner1} & {COUPLE.partner2}
                      </p>

                      <p className="mt-1 font-body text-[8px] font-medium uppercase tracking-[0.24em] text-[#A87524]">
                        {t("welcome.invitation")}
                      </p>
                    </div>
                  </motion.div>

                  {/* Envelope flap */}

                  <motion.div
                    className="absolute left-0 right-0 top-0 z-10 origin-top"
                    style={{
                      transformStyle: "preserve-3d",
                      height: "52%",
                    }}
                    initial={{ rotateX: 0 }}
                    animate={
                      phase === "opening"
                        ? { rotateX: -158 }
                        : { rotateX: 0 }
                    }
                    transition={{
                      delay: 0.2,
                      duration: 1.05,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <div
                      className="h-full w-full shadow-md"
                      style={{
                        clipPath:
                          "polygon(0 0, 100% 0, 50% 100%)",
                        background:
                          "linear-gradient(180deg, #F1D99F 0%, #B9822C 100%)",
                      }}
                    />
                  </motion.div>

                  {/* Wax seal */}

                  <div className="absolute left-1/2 top-[46%] z-30 -translate-x-1/2 -translate-y-1/2">
                    <motion.div
                      className="relative flex h-14 w-14 items-center justify-center sm:h-16 sm:w-16"
                      animate={
                        phase === "opening"
                          ? {
                              scale: 1.35,
                              opacity: 0,
                              rotate: 18,
                            }
                          : {
                              scale: 1,
                              opacity: 1,
                              rotate: 0,
                            }
                      }
                      transition={{ duration: 0.55 }}
                    >
                      {phase === "closed" && !reduced && (
                        <span className="pulse-ring absolute inset-[-6px] rounded-full border border-[#B8923E]/70" />
                      )}

                      <span
                        className="flex h-full w-full items-center justify-center rounded-full shadow-xl"
                        style={{
                          background:
                            "radial-gradient(circle at 35% 30%, #FFF8E7 0%, #E2D0A4 42%, #A87524 100%)",
                          clipPath:
                            "polygon(50% 0%, 63% 8%, 75% 5%, 82% 16%, 94% 20%, 90% 35%, 100% 50%, 90% 65%, 94% 80%, 82% 84%, 75% 95%, 63% 92%, 50% 100%, 37% 92%, 25% 95%, 18% 84%, 6% 80%, 10% 65%, 0% 50%, 10% 35%, 6% 20%, 18% 16%, 25% 5%, 37% 8%)",
                        }}
                      >
                        <span className="font-display text-[11px] font-semibold text-[#54251E] sm:text-xs">
                          {COUPLE.monogram}
                        </span>
                      </span>
                    </motion.div>
                  </div>
                </motion.div>
              </button>

              <motion.p
                className="mt-6 font-body text-sm font-medium tracking-wide text-[#54251E] drop-shadow-[0_1px_2px_rgba(255,248,225,0.9)]"
                animate={
                  phase === "closed" && !reduced
                    ? { opacity: [0.65, 1, 0.65] }
                    : { opacity: 0.85 }
                }
                transition={{
                  duration: 2.4,
                  repeat: Infinity,
                }}
              >
                ✦ {t("welcome.tapToOpen")} ✦
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Scene>
  );
}
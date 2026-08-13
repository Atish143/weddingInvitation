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
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {dots.map((d) => (
        <span
          key={d.id}
          className="absolute rounded-full bg-gold-soft/70 blur-[1px] glow-breathe"
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
    window.setTimeout(
      () => {
        setPhase("opened");
        goToScene("couple");
      },
      reduced ? 400 : 2200,
    );
  };

  if (!hydrated) {
    return (
      <Scene
        id="welcome"
        className="bg-[radial-gradient(ellipse_at_center,#5c1a2a_0%,#3d101c_55%,#2a0c14_100%)]"
        showHints={false}
      >
        <div className="flex flex-1 items-center justify-center" />
      </Scene>
    );
  }

  return (
    <Scene
      id="welcome"
      className="bg-[radial-gradient(ellipse_at_30%_15%,#7a2a3c_0%,#5c1a2a_40%,#2a0c14_100%)]"
      petals={phase !== "closed"}
      petalColors={["#E2D0A4", "#E8C4C8", "#B8923E", "#F7F1E8"]}
      petalCount={phase === "opened" ? 10 : 16}
      showHints={phase === "opened"}
    >
      <LightRays tone="gold" />
      <SoftParticles denser={phase !== "closed"} />
      <Sparkles count={phase === "closed" ? 14 : 26} color="#E2D0A4" />

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center text-center">
        <AnimatePresence mode="wait">
          {phase === "opened" ? (
            <motion.div
              key="opened"
              className="px-4"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <p className="text-eyebrow text-gold-soft">{t("welcome.youreInvited")}</p>
              <h1 className="text-names mt-3 font-display text-on-dark">
                {COUPLE.partner1}{" "}
                <span className="text-gold-soft">&</span> {COUPLE.partner2}
              </h1>
              <p className="mx-auto mt-4 max-w-sm font-display text-lg text-gold-soft/95 italic sm:text-xl">
                {t("welcome.tagline")}
              </p>
              <p className="mt-8 font-body text-xs font-medium tracking-wide text-on-dark/75">
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
              <p className="mb-5 text-eyebrow text-gold-soft">
                {t("welcome.youreInvited")}
              </p>

              <button
                type="button"
                onClick={open}
                disabled={phase !== "closed"}
                aria-label={t("welcome.tapToOpen")}
                className={`relative ${phase === "closed" && !reduced ? "envelope-float" : ""}`}
                style={{ perspective: 1200 }}
              >
                <motion.div
                  className="relative h-[13.5rem] w-[min(17.5rem,86vw)] sm:h-60 sm:w-80"
                  animate={
                    phase === "opening" && !reduced
                      ? { scale: 1.05, y: -8 }
                      : { scale: 1, y: 0 }
                  }
                  transition={{ type: "spring", stiffness: 120, damping: 18 }}
                >
                  {/* Envelope body */}
                  <div
                    className="absolute inset-0 overflow-hidden rounded-md shadow-[0_24px_60px_rgba(0,0,0,0.45)]"
                    style={{
                      background:
                        "linear-gradient(145deg, #8a3040 0%, #5c1a2a 45%, #3d101c 100%)",
                    }}
                  >
                    <div
                      className="absolute inset-0 opacity-30"
                      style={{
                        backgroundImage:
                          "radial-gradient(circle at 20% 30%, #E2D0A4 1.2px, transparent 1.3px), radial-gradient(circle at 70% 60%, #E2D0A4 1px, transparent 1.1px)",
                        backgroundSize: "26px 26px, 20px 20px",
                      }}
                    />
                  </div>

                  {/* Invitation card rising */}
                  <motion.div
                    className="absolute left-1/2 top-5 z-[5] w-[72%] -translate-x-1/2 overflow-hidden rounded-sm bg-ivory shadow-lg sm:top-7"
                    initial={{ y: 56, opacity: 0, rotate: -2 }}
                    animate={
                      phase === "opening"
                        ? { y: -36, opacity: 1, rotate: 1.5 }
                        : { y: 56, opacity: 0, rotate: -2 }
                    }
                    transition={{ delay: 0.55, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="px-3 py-5 sm:py-7">
                      <p className="font-display text-base text-burgundy sm:text-lg">
                        {COUPLE.partner1} & {COUPLE.partner2}
                      </p>
                      <p className="mt-1 font-body text-[9px] font-medium tracking-[0.28em] text-gold-deep uppercase">
                        {t("welcome.invitation")}
                      </p>
                    </div>
                  </motion.div>

                  {/* Flap */}
                  <motion.div
                    className="absolute left-0 right-0 top-0 z-10 origin-top"
                    style={{ transformStyle: "preserve-3d", height: "52%" }}
                    initial={{ rotateX: 0 }}
                    animate={
                      phase === "opening" ? { rotateX: -158 } : { rotateX: 0 }
                    }
                    transition={{ delay: 0.2, duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div
                      className="h-full w-full shadow-md"
                      style={{
                        clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                        background:
                          "linear-gradient(180deg, #9a3a4c 0%, #5c1a2a 100%)",
                      }}
                    />
                  </motion.div>

                  {/* Wax seal */}
                  <div className="absolute left-1/2 top-[46%] z-30 -translate-x-1/2 -translate-y-1/2">
                    <motion.div
                      className="relative flex h-[4.25rem] w-[4.25rem] items-center justify-center sm:h-20 sm:w-20"
                      animate={
                        phase === "opening"
                          ? { scale: 1.35, opacity: 0, rotate: 18 }
                          : { scale: 1, opacity: 1, rotate: 0 }
                      }
                      transition={{ duration: 0.55 }}
                    >
                      {phase === "closed" && !reduced && (
                        <span className="pulse-ring absolute inset-[-6px] rounded-full border border-gold-soft/70" />
                      )}
                      <span
                        className="flex h-full w-full items-center justify-center rounded-full shadow-xl"
                        style={{
                          background:
                            "radial-gradient(circle at 35% 30%, #F7F1E8 0%, #E2D0A4 42%, #B8923E 100%)",
                          clipPath:
                            "polygon(50% 0%, 63% 8%, 75% 5%, 82% 16%, 94% 20%, 90% 35%, 100% 50%, 90% 65%, 94% 80%, 82% 84%, 75% 95%, 63% 92%, 50% 100%, 37% 92%, 25% 95%, 18% 84%, 6% 80%, 10% 65%, 0% 50%, 10% 35%, 6% 20%, 18% 16%, 25% 5%, 37% 8%)",
                        }}
                      >
                        <span className="font-display text-xs font-semibold text-burgundy sm:text-sm">
                          {COUPLE.monogram}
                        </span>
                      </span>
                    </motion.div>
                  </div>
                </motion.div>
              </button>

              <motion.p
                className="mt-6 font-body text-sm font-medium tracking-wide text-on-dark/90"
                animate={
                  phase === "closed" && !reduced
                    ? { opacity: [0.65, 1, 0.65] }
                    : { opacity: 0.85 }
                }
                transition={{ duration: 2.4, repeat: Infinity }}
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

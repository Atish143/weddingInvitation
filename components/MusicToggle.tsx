"use client";

import { motion } from "framer-motion";
import { useMusic } from "@/lib/MusicContext";
import { useI18n } from "@/lib/i18n";

export function MusicToggle() {
  const { muted, available, toggle } = useMusic();
  const { t } = useI18n();

  return (
    <button
      type="button"
      onClick={() => void toggle()}
      aria-label={muted ? t("common.playMusic") : t("common.pauseMusic")}
      title={
        available
          ? muted
            ? t("common.playMusic")
            : t("common.pauseMusic")
          : "Add /public/audio/wedding-music.mp3"
      }
      className="glass relative flex h-11 w-11 items-center justify-center rounded-full text-ink shadow-md"
    >
      {!muted && (
        <span
          className="pulse-ring absolute inset-0 rounded-full border border-gold/50"
          aria-hidden
        />
      )}
      {!muted ? (
        <span className="flex h-4 items-end gap-0.5" aria-hidden>
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="music-bar w-0.5 rounded-full bg-gold-deep"
              style={{ height: 12, animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </span>
      ) : (
        <span className="font-body text-sm text-ink" aria-hidden>
          ♪
        </span>
      )}
    </button>
  );
}

"use client";

import { motion } from "framer-motion";

type WeatherKind = "clear" | "partlyCloudy" | "foggy" | "rainPossible" | "showers" | "stormy";

type Props = {
  kind: WeatherKind;
  className?: string;
};

/** Elegant illustrated weather icons — not emoji */
export function WeatherIllustration({ kind, className = "h-14 w-14" }: Props) {
  if (kind === "clear") {
    return (
      <motion.svg
        className={className}
        viewBox="0 0 64 64"
        fill="none"
        aria-hidden
        animate={{ opacity: [0.85, 1, 0.85] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <circle cx="32" cy="32" r="14" fill="#F0C060" opacity="0.35" />
        <circle cx="32" cy="32" r="10" fill="#E8A830" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
          <line
            key={deg}
            x1="32"
            y1="32"
            x2={32 + 18 * Math.cos((deg * Math.PI) / 180)}
            y2={32 + 18 * Math.sin((deg * Math.PI) / 180)}
            stroke="#B8944A"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.5"
          />
        ))}
      </motion.svg>
    );
  }

  if (kind === "rainPossible" || kind === "showers" || kind === "stormy") {
    return (
      <motion.svg className={className} viewBox="0 0 64 64" fill="none" aria-hidden>
        <ellipse cx="28" cy="28" rx="14" ry="9" fill="#C8D8E8" />
        <ellipse cx="38" cy="30" rx="12" ry="8" fill="#A8C0D8" />
        {[22, 32, 42].map((x, i) => (
          <motion.line
            key={x}
            x1={x}
            y1="42"
            x2={x - 3}
            y2="52"
            stroke="#5F7D94"
            strokeWidth="1.5"
            strokeLinecap="round"
            animate={{ y: [0, 4, 0], opacity: [0.4, 0.9, 0.4] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
      </motion.svg>
    );
  }

  if (kind === "foggy") {
    return (
      <svg className={className} viewBox="0 0 64 64" fill="none" aria-hidden>
        {[20, 28, 36].map((y) => (
          <line key={y} x1="12" y1={y} x2="52" y2={y} stroke="#9EB6C8" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
        ))}
      </svg>
    );
  }

  // partlyCloudy default
  return (
    <motion.svg className={className} viewBox="0 0 64 64" fill="none" aria-hidden>
      <motion.circle
        cx="22"
        cy="22"
        r="8"
        fill="#E8A830"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 3.5, repeat: Infinity }}
      />
      <motion.ellipse
        cx="38"
        cy="34"
        rx="16"
        ry="10"
        fill="#D5E3EE"
        animate={{ x: [0, 2, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
      />
      <ellipse cx="28" cy="36" rx="12" ry="8" fill="#C8D8E8" />
    </motion.svg>
  );
}

export function conditionToKind(code?: number): WeatherKind {
  if (code === undefined) return "partlyCloudy";
  if (code === 0) return "clear";
  if (code <= 3) return "partlyCloudy";
  if (code <= 48) return "foggy";
  if (code <= 67) return "rainPossible";
  if (code <= 82) return "showers";
  return "stormy";
}

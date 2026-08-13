"use client";

type Props = { className?: string; opacity?: number };

export function PalaceSilhouette({ className = "", opacity = 0.35 }: Props) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 800 220"
      className={`pointer-events-none w-full text-ink ${className}`}
      style={{ opacity }}
      fill="currentColor"
    >
      <path d="M0 220 L0 160 L40 160 L40 120 L70 90 L100 120 L100 160 L140 160 L140 100 L180 60 L220 100 L220 160 L280 160 L280 80 L320 40 L360 80 L360 160 L420 160 L420 110 L460 70 L500 110 L500 160 L560 160 L560 95 L600 55 L640 95 L640 160 L700 160 L700 120 L730 90 L760 120 L760 160 L800 160 L800 220 Z" />
      <rect x="310" y="100" width="20" height="30" rx="2" fill="#FFF9EF" opacity="0.35" />
      <rect x="350" y="100" width="20" height="30" rx="2" fill="#FFF9EF" opacity="0.35" />
      <rect x="470" y="120" width="14" height="22" rx="2" fill="#FFF9EF" opacity="0.3" />
      <circle cx="320" cy="32" r="6" />
      <circle cx="600" cy="48" r="5" />
    </svg>
  );
}

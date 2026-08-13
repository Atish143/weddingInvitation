"use client";

type Props = { className?: string; flip?: boolean };

export function PeacockFeather({ className = "", flip = false }: Props) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 60 140"
      className={`h-28 w-auto text-emerald sm:h-36 ${flip ? "scale-x-[-1]" : ""} ${className}`}
      fill="none"
    >
      <path
        d="M30 130 C28 90 10 70 18 40 C24 18 36 18 42 40 C50 70 32 90 30 130"
        stroke="currentColor"
        strokeWidth="1.4"
        fill="currentColor"
        fillOpacity="0.12"
      />
      <ellipse cx="30" cy="38" rx="12" ry="16" fill="#1F5C45" opacity="0.55" />
      <ellipse cx="30" cy="38" rx="7" ry="10" fill="#C9A227" opacity="0.7" />
      <circle cx="30" cy="38" r="3.5" fill="#0B1220" />
      <circle cx="30" cy="38" r="1.5" fill="#F0D9A0" />
    </svg>
  );
}

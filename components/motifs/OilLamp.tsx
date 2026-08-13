"use client";

type Props = { className?: string; size?: number };

export function OilLamp({ className = "", size = 36 }: Props) {
  return (
    <svg
      width={size}
      height={size * 1.35}
      viewBox="0 0 40 54"
      className={`text-brass ${className}`}
      aria-hidden
    >
      <ellipse cx="20" cy="48" rx="12" ry="3" fill="currentColor" opacity="0.35" />
      <path
        d="M10 36 C10 28 30 28 30 36 L28 46 C28 48 12 48 12 46 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <rect
        x="17"
        y="30"
        width="6"
        height="8"
        rx="1"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path
        d="M14 30 H26"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <g className="flame-flicker" style={{ transformOrigin: "20px 22px" }}>
        <path
          d="M20 28 C16 20 18 12 20 8 C22 12 24 20 20 28 Z"
          fill="#F0D9A0"
          stroke="#C9A227"
          strokeWidth="0.8"
        />
        <path
          d="M20 26 C18.5 21 19.5 16 20 14 C20.5 16 21.5 21 20 26 Z"
          fill="#C9A227"
          opacity="0.7"
        />
      </g>
    </svg>
  );
}

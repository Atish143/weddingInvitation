"use client";

type Props = { className?: string };

/** Elegant gold-line decorative frame corners */
export function OrnateCorners({ className = "" }: Props) {
  const corner = (
    <path
      d="M4 40 V12 Q4 4 12 4 H40 M12 16 H28 M16 12 V28"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
    />
  );

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-2 text-gold/60 sm:inset-4 ${className}`}
    >
      <svg className="absolute left-0 top-0 h-10 w-10" viewBox="0 0 44 44">
        {corner}
      </svg>
      <svg
        className="absolute right-0 top-0 h-10 w-10 scale-x-[-1]"
        viewBox="0 0 44 44"
      >
        {corner}
      </svg>
      <svg
        className="absolute bottom-0 left-0 h-10 w-10 scale-y-[-1]"
        viewBox="0 0 44 44"
      >
        {corner}
      </svg>
      <svg
        className="absolute bottom-0 right-0 h-10 w-10 scale-x-[-1] scale-y-[-1]"
        viewBox="0 0 44 44"
      >
        {corner}
      </svg>
    </div>
  );
}

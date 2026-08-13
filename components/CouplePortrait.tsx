"use client";

import { COUPLE_IMAGES } from "@/lib/wedding";

type Props = {
  who: "groom" | "bride" | "together";
  alt: string;
  className?: string;
  priority?: boolean;
};

/**
 * Modular couple imagery.
 * Replace files in /public/couple/ (groom.svg, bride.svg, together.svg)
 * with your real photos — keep the same filenames, or update COUPLE_IMAGES in lib/wedding.ts.
 */
export function CouplePortrait({
  who,
  alt,
  className = "",
  priority = false,
}: Props) {
  const src = COUPLE_IMAGES[who];

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className="h-full w-full object-cover object-top"
      />
    </div>
  );
}

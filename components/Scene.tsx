"use client";

import type { ReactNode } from "react";
import { SectionHint } from "@/components/SectionHint";
import { Petals } from "@/components/Petals";
import type { SceneId } from "@/lib/wedding";
import { getNextScene, getPrevScene } from "@/lib/wedding";

type SceneProps = {
  id: SceneId;
  children: ReactNode;
  className?: string;
  petals?: boolean;
  petalColors?: string[];
  petalCount?: number;
  /** Subtle prev/next hints — never required to progress */
  showHints?: boolean;
};

export function Scene({
  id,
  children,
  className = "",
  petals = false,
  petalColors,
  petalCount,
  showHints = true,
}: SceneProps) {
  const next = getNextScene(id);
  const prev = getPrevScene(id);

  return (
    <section
      id={`scene-${id}`}
      data-scene={id}
      className={`relative w-full snap-start snap-always shrink-0 overflow-x-hidden ${className}`}
      style={{ minHeight: "100dvh" }}
    >
      {petals && <Petals colors={petalColors} count={petalCount} />}
      <div className="relative z-10 flex w-full flex-col" style={{ minHeight: "100dvh" }}>
        <div className="scene-pad flex w-full flex-1 flex-col">{children}</div>
      </div>
      {showHints && (prev || next) && (
        <SectionHint prev={prev} next={next} />
      )}
    </section>
  );
}

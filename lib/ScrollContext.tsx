"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  type ReactNode,
  type RefObject,
} from "react";
import type { SceneId } from "@/lib/wedding";

type ScrollContextValue = {
  scrollRef: RefObject<HTMLDivElement | null>;
  goToScene: (id: SceneId) => void;
};

const ScrollContext = createContext<ScrollContextValue | null>(null);

export function ScrollProvider({ children }: { children: ReactNode }) {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const goToScene = useCallback((id: SceneId) => {
    const el = document.getElementById(`scene-${id}`);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const value = useMemo(
    () => ({ scrollRef, goToScene }),
    [goToScene],
  );

  return (
    <ScrollContext.Provider value={value}>{children}</ScrollContext.Provider>
  );
}

export function useScrollRoot() {
  const ctx = useContext(ScrollContext);
  if (!ctx) {
    throw new Error("useScrollRoot must be used within ScrollProvider");
  }
  return ctx;
}

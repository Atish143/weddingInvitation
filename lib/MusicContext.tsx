"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

type MusicValue = {
  muted: boolean;
  available: boolean;
  toggle: () => Promise<void>;
  playFromUserGesture: () => Promise<void>;
};

const MusicContext = createContext<MusicValue | null>(null);

export function MusicProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [muted, setMuted] = useState(true);
  const [available, setAvailable] = useState(false);

  useEffect(() => {
    const audio = new Audio("/audio/wedding-music.mp3");
    audio.loop = true;
    audio.volume = 0;
    audioRef.current = audio;

    const onCanPlay = () => setAvailable(true);
    const onError = () => setAvailable(false);
    audio.addEventListener("canplaythrough", onCanPlay);
    audio.addEventListener("error", onError);
    audio.load();

    return () => {
      audio.pause();
      audio.removeEventListener("canplaythrough", onCanPlay);
      audio.removeEventListener("error", onError);
      audioRef.current = null;
    };
  }, []);

  const fadeTo = useCallback((target: number, thenPause = false) => {
    const audio = audioRef.current;
    if (!audio) return;
    const step = target > audio.volume ? 0.04 : -0.04;
    const tick = () => {
      if (!audioRef.current) return;
      const next = Math.max(0, Math.min(0.35, audioRef.current.volume + step));
      audioRef.current.volume = next;
      if ((step > 0 && next < target) || (step < 0 && next > target)) {
        requestAnimationFrame(tick);
      } else if (thenPause) {
        audioRef.current.pause();
      }
    };
    requestAnimationFrame(tick);
  }, []);

  const playFromUserGesture = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio || !available || !muted) return;
    try {
      audio.volume = 0;
      await audio.play();
      fadeTo(0.35);
      setMuted(false);
    } catch {
      /* blocked */
    }
  }, [available, muted, fadeTo]);

  const toggle = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio || !available) return;
    if (muted) {
      try {
        audio.volume = 0;
        await audio.play();
        fadeTo(0.35);
        setMuted(false);
      } catch {
        /* blocked */
      }
    } else {
      fadeTo(0, true);
      setMuted(true);
    }
  }, [available, muted, fadeTo]);

  const value = useMemo(
    () => ({ muted, available, toggle, playFromUserGesture }),
    [muted, available, toggle, playFromUserGesture],
  );

  return (
    <MusicContext.Provider value={value}>{children}</MusicContext.Provider>
  );
}

export function useMusic() {
  const ctx = useContext(MusicContext);
  if (!ctx) throw new Error("useMusic must be used within MusicProvider");
  return ctx;
}

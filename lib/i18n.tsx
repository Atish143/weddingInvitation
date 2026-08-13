"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import en from "@/locales/en.json";
import te from "@/locales/te.json";

export type Locale = "en" | "te";

type Dict = typeof en;

const DICTS: Record<Locale, Dict> = { en, te };

type I18nValue = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (path: string) => string;
  dict: Dict;
};

const I18nContext = createContext<I18nValue | null>(null);

function getByPath(obj: unknown, path: string): string {
  const parts = path.split(".");
  let cur: unknown = obj;
  for (const p of parts) {
    if (cur && typeof cur === "object" && p in (cur as object)) {
      cur = (cur as Record<string, unknown>)[p];
    } else {
      return path;
    }
  }
  return typeof cur === "string" ? cur : path;
}

const STORAGE_KEY = "wedding-locale";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as Locale | null;
      if (saved === "en" || saved === "te") setLocaleState(saved);
    } catch {
      /* ignore */
    }
  }, []);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* ignore */
    }
    if (typeof document !== "undefined") {
      document.documentElement.lang = l;
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const dict = DICTS[locale];

  const t = useCallback((path: string) => getByPath(dict, path), [dict]);

  const value = useMemo(
    () => ({ locale, setLocale, t, dict }),
    [locale, setLocale, t, dict],
  );

  return (
    <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within LanguageProvider");
  return ctx;
}

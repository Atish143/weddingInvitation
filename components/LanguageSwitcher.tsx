"use client";

import { useI18n, type Locale } from "@/lib/i18n";

export function LanguageSwitcher() {
  const { locale, setLocale } = useI18n();

  const btn = (code: Locale, label: string) => (
    <button
      type="button"
      aria-pressed={locale === code}
      onClick={() => setLocale(code)}
      className={`rounded-full px-2.5 py-1 font-body text-[11px] font-medium transition sm:text-xs ${
        locale === code
          ? "bg-burgundy text-on-dark shadow-sm"
          : "text-ink-soft hover:text-ink"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div
      role="group"
      aria-label="Language"
      className="glass flex items-center gap-0.5 rounded-full p-1 shadow-md"
    >
      {btn("en", "EN")}
      <span className="text-gold/50" aria-hidden>
        |
      </span>
      {btn("te", "తెలుగు")}
    </div>
  );
}

"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Scene } from "@/components/Scene";
import { Sparkles } from "@/components/fx/Sparkles";
import { WEATHER } from "@/lib/wedding";
import { useScrollRoot } from "@/lib/ScrollContext";
import { useI18n } from "@/lib/i18n";
import {
  WeatherIllustration,
  conditionToKind,
} from "@/components/weather/WeatherIllustration";

type DayForecast = {
  date: string;
  label: string;
  dayLabelKey: string;
  tempMax?: number;
  feelsLike?: number;
  humidity?: number;
  wind?: number;
  precipProb?: number;
  code?: number;
};

function formatDayLabel(iso: string) {
  const d = new Date(`${iso}T12:00:00`);
  return d
    .toLocaleDateString("en-GB", { day: "2-digit", month: "short" })
    .toUpperCase();
}

export function WeatherScene() {
  const { t } = useI18n();
  const { scrollRef } = useScrollRoot();
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { root: scrollRef, once: true, amount: 0.12 });
  const [days, setDays] = useState<DayForecast[]>(
    WEATHER.dates.map((date, i) => ({
      date,
      label: formatDayLabel(date),
      dayLabelKey: WEATHER.dayLabels[i],
    })),
  );
  const [status, setStatus] = useState<"loading" | "ok" | "error">("loading");

  useEffect(() => {
    const start = WEATHER.dates[0];
    const end = WEATHER.dates[WEATHER.dates.length - 1];
    const url =
      `https://api.open-meteo.com/v1/forecast?latitude=${WEATHER.latitude}` +
      `&longitude=${WEATHER.longitude}` +
      `&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,relative_humidity_2m_mean,precipitation_probability_max,wind_speed_10m_max` +
      `&timezone=${encodeURIComponent(WEATHER.timezone)}` +
      `&start_date=${start}&end_date=${end}`;

    let cancelled = false;
    fetch(url)
      .then((r) => {
        if (!r.ok) throw new Error("weather failed");
        return r.json();
      })
      .then((json) => {
        if (cancelled) return;
        const times: string[] = json?.daily?.time ?? [];
        if (!times.length) {
          setStatus("error");
          return;
        }
        setDays(
          WEATHER.dates.map((date, i) => {
            const idx = times.indexOf(date);
            if (idx < 0)
              return {
                date,
                label: formatDayLabel(date),
                dayLabelKey: WEATHER.dayLabels[i],
              };
            return {
              date,
              label: formatDayLabel(date),
              dayLabelKey: WEATHER.dayLabels[i],
              tempMax: json.daily.temperature_2m_max?.[idx],
              feelsLike: json.daily.apparent_temperature_max?.[idx],
              humidity: json.daily.relative_humidity_2m_mean?.[idx],
              wind: json.daily.wind_speed_10m_max?.[idx],
              precipProb: json.daily.precipitation_probability_max?.[idx],
              code: json.daily.weather_code?.[idx],
            };
          }),
        );
        setStatus("ok");
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <Scene
      id="weather"
      className="bg-[linear-gradient(165deg,#D5E3EE_0%,#F7F1E7_42%,#F0E0D8_100%)]"
      petals
      petalColors={["#D5E3EE", "#F0E0D8", "#B8944A"]}
      petalCount={6}
    >
      <Sparkles count={8} color="#B8944A" />

      {/* Subtle cloud atmosphere */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden opacity-30">
        <div className="absolute -left-10 top-16 h-24 w-40 rounded-full bg-white blur-2xl" />
        <div className="absolute -right-8 top-32 h-20 w-36 rounded-full bg-white blur-2xl" />
      </div>

      {/* Temple silhouette at bottom */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 opacity-[0.12]"
        style={{
          background:
            "linear-gradient(to top, #5A1828 0%, transparent 100%), url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 60'%3E%3Cpath d='M0 60 L0 40 L20 35 L40 25 L60 30 L80 18 L100 28 L120 15 L140 25 L160 12 L180 22 L200 8 L220 20 L240 10 L260 22 L280 14 L300 24 L320 16 L340 26 L360 18 L380 28 L400 22 L400 60 Z' fill='%235A1828'/%3E%3C/svg%3E\") center bottom / cover no-repeat",
        }}
      />

      <div
        ref={ref}
        className="relative z-10 mx-auto flex w-full max-w-md flex-1 flex-col justify-center py-2"
      >
        <header className="mb-5 text-center">
          <p className="text-eyebrow text-powder-deep">{t("weather.eyebrow")}</p>
          <h2 className="text-section mt-1 font-display font-semibold text-deep-brown">
            {t("weather.title")}
          </h2>
          <p className="mx-auto mt-2 max-w-xs text-body-readable">
            {t("weather.subtitle")}
          </p>
        </header>

        {status === "loading" && (
          <p className="text-center font-body text-sm font-medium text-deep-brown">
            {t("weather.loading")}
          </p>
        )}
        {status === "error" && (
          <p className="mx-auto max-w-sm text-center font-body text-sm font-medium text-deep-brown">
            {t("weather.error")}
          </p>
        )}

        {/* Vertical timeline */}
        <div className="relative mx-auto w-full max-w-sm pl-6">
          <motion.div
            className="absolute bottom-4 left-[0.65rem] top-4 w-[2px] origin-top bg-gradient-to-b from-antique-gold via-terracotta/60 to-antique-gold/30"
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          />

          <ul className="space-y-6">
            {days.map((d, i) => {
              const has = d.tempMax != null && status === "ok";
              const kind = conditionToKind(d.code);
              const conditionKey = `weather.${kind === "rainPossible" ? "rainPossible" : kind}`;

              return (
                <motion.li
                  key={d.date}
                  className="relative"
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.15 * i + 0.2 }}
                >
                  {/* Timeline node */}
                  <span className="absolute -left-6 top-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-antique-gold bg-ivory shadow-sm">
                    <span className="h-2 w-2 rounded-full bg-terracotta" />
                  </span>

                  <div className="rounded-2xl border border-antique-gold/30 bg-ivory/80 p-4 shadow-[0_8px_28px_rgba(48,35,31,0.06)] backdrop-blur-sm">
                    <p className="font-body text-[11px] font-bold tracking-[0.2em] text-terracotta">
                      {d.label}
                    </p>
                    <p className="mt-0.5 font-display text-sm font-semibold text-deep-brown">
                      {t(d.dayLabelKey)}
                    </p>

                    {has ? (
                      <>
                        <div className="mt-3 flex items-center gap-3">
                          <WeatherIllustration kind={kind} className="h-12 w-12 shrink-0" />
                          <div>
                            <p className="font-display text-3xl font-semibold tabular-nums text-deep-brown">
                              {Math.round(d.tempMax!)}°
                            </p>
                            <p className="font-body text-xs font-medium text-deep-brown/80">
                              {t(conditionKey)}
                            </p>
                          </div>
                        </div>
                        <div className="mt-3 grid grid-cols-2 gap-1.5">
                          <Stat label={t("weather.feelsLike")} value={`${Math.round(d.feelsLike ?? d.tempMax!)}°`} />
                          <Stat label={t("weather.humidity")} value={`${Math.round(d.humidity ?? 0)}%`} />
                          <Stat label={t("weather.wind")} value={`${Math.round(d.wind ?? 0)} km/h`} />
                          <Stat
                            label={t("weather.rain")}
                            value={d.precipProb != null ? `${d.precipProb}%` : "—"}
                          />
                        </div>
                      </>
                    ) : (
                      <p className="mt-3 font-body text-xs font-medium text-deep-brown/70">
                        {status === "loading" ? t("common.loading") : t("weather.unavailable")}
                      </p>
                    )}
                  </div>
                </motion.li>
              );
            })}
          </ul>
        </div>
      </div>
    </Scene>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-soft-sand/60 px-2 py-1.5">
      <p className="font-body text-[9px] font-medium uppercase tracking-wide text-deep-brown/70">
        {label}
      </p>
      <p className="font-body text-xs font-semibold text-deep-brown">{value}</p>
    </div>
  );
}

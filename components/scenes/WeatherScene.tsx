
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
    .toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
    })
    .toUpperCase();
}

export function WeatherScene() {
  const { t } = useI18n();
  const { scrollRef } = useScrollRoot();

  const ref = useRef<HTMLDivElement | null>(null);

  const inView = useInView(ref, {
    root: scrollRef,
    once: true,
    amount: 0.1,
  });

  const [days, setDays] = useState<DayForecast[]>(
    WEATHER.dates.map((date, i) => ({
      date,
      label: formatDayLabel(date),
      dayLabelKey: WEATHER.dayLabels[i],
    })),
  );

  const [status, setStatus] = useState<
    "loading" | "ok" | "error"
  >("loading");

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
        if (!r.ok) {
          throw new Error("weather failed");
        }

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

            if (idx < 0) {
              return {
                date,
                label: formatDayLabel(date),
                dayLabelKey: WEATHER.dayLabels[i],
              };
            }

            return {
              date,
              label: formatDayLabel(date),
              dayLabelKey: WEATHER.dayLabels[i],
              tempMax:
                json.daily.temperature_2m_max?.[idx],
              feelsLike:
                json.daily.apparent_temperature_max?.[idx],
              humidity:
                json.daily.relative_humidity_2m_mean?.[idx],
              wind:
                json.daily.wind_speed_10m_max?.[idx],
              precipProb:
                json.daily.precipitation_probability_max?.[idx],
              code:
                json.daily.weather_code?.[idx],
            };
          }),
        );

        setStatus("ok");
      })
      .catch(() => {
        if (!cancelled) {
          setStatus("error");
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <Scene
      id="weather"
      className="relative overflow-hidden bg-[#e7edf1]"
      petals
      petalColors={[
        "#D7E3EA",
        "#EBCFC5",
        "#C9A96B",
        "#D8C9C5",
      ]}
      petalCount={4}
    >
      {/* Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
      >
        <img
          src="/images/events/weatherbg.png"
          alt=""
          className="h-full w-full object-cover object-center"
        />
      </div>

      <Sparkles
        count={6}
        color="#B8944A"
      />

      <div
        ref={ref}
        className="
          relative
          z-10
          mx-auto
          flex
          w-full
          max-w-md
          flex-1
          flex-col
          justify-center
          px-4
          py-4
        "
      >
        {/* =================================================
            HEADER
           ================================================= */}

        <motion.header
          className="mb-4 text-center"
          initial={{
            opacity: 0,
            y: 16,
          }}
          animate={
            inView
              ? {
                  opacity: 1,
                  y: 0,
                }
              : {}
          }
          transition={{
            duration: 0.65,
          }}
        >
          <div className="mx-auto mb-2 flex items-center justify-center gap-2">
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-[#B8944A]" />

            <span className="text-[9px] text-[#B8944A]">
              ✦
            </span>

            <span className="h-px w-8 bg-gradient-to-l from-transparent to-[#B8944A]" />
          </div>

          <p
            className="
              font-body
              text-[9px]
              font-semibold
              uppercase
              tracking-[0.3em]
              text-[#587991]
            "
          >
            {t("weather.eyebrow")}
          </p>

          <h2
            className="
              mt-1
              font-display
              text-[1.8rem]
              font-semibold
              leading-tight
              text-[#302523]
              sm:text-3xl
            "
          >
            {t("weather.title")}
          </h2>

          <p
            className="
              mx-auto
              mt-1
              max-w-xs
              font-body
              text-xs
              leading-relaxed
              text-[#5d5653]
            "
          >
            {t("weather.subtitle")}
          </p>
        </motion.header>

        {/* =================================================
            LOADING / ERROR
           ================================================= */}

        {status === "loading" && (
          <div className="mb-2 text-center">
            <p className="font-body text-xs font-medium text-[#514845]">
              {t("weather.loading")}
            </p>
          </div>
        )}

        {status === "error" && (
          <div className="mb-2 text-center">
            <p className="font-body text-xs font-medium text-[#514845]">
              {t("weather.error")}
            </p>
          </div>
        )}

        {/* =================================================
            WEATHER CARDS
           ================================================= */}

        <div className="space-y-2.5">
          {days.map((day, index) => {
            const hasData =
              day.tempMax != null &&
              status === "ok";

            const kind = conditionToKind(day.code);

            const conditionKey = `weather.${
              kind === "rainPossible"
                ? "rainPossible"
                : kind
            }`;

            return (
              <motion.article
                key={day.date}
                initial={{
                  opacity: 0,
                  y: 25,
                  scale: 0.97,
                }}
                animate={
                  inView
                    ? {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                      }
                    : {}
                }
                transition={{
                  delay: 0.12 * index,
                  duration: 0.5,
                  ease: "easeOut",
                }}
                whileHover={{
                  y: -3,
                  scale: 1.01,
                }}
                whileTap={{
                  scale: 0.985,
                }}
                className="
                  group
                  rounded-[18px]
                  border
                  border-[#B8944A]/30
                  bg-[#FFF9F1]/90
                  p-3
                  shadow-[0_7px_24px_rgba(60,60,65,0.10)]
                  backdrop-blur-[3px]
                "
              >
                {/* Top */}
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p
                      className="
                        font-body
                        text-[9px]
                        font-bold
                        tracking-[0.2em]
                        text-[#BC6247]
                      "
                    >
                      {day.label}
                    </p>

                    <p
                      className="
                        mt-0.5
                        truncate
                        font-display
                        text-[15px]
                        font-semibold
                        text-[#362A27]
                      "
                    >
                      {t(day.dayLabelKey)}
                    </p>
                  </div>

                  {hasData && (
                    <motion.div
                      animate={{
                        y: [0, -2, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <WeatherIllustration
                        kind={kind}
                        className="h-10 w-10"
                      />
                    </motion.div>
                  )}
                </div>

                {hasData ? (
                  <>
                    {/* Temperature row */}
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-start">
                        <span
                          className="
                            font-display
                            text-[2rem]
                            font-semibold
                            leading-none
                            tabular-nums
                            text-[#312725]
                          "
                        >
                          {Math.round(day.tempMax!)}
                        </span>

                        <span className="ml-0.5 mt-0.5 font-display text-sm text-[#6B7173]">
                          °
                        </span>
                      </div>

                      <p
                        className="
                          max-w-[150px]
                          text-right
                          font-body
                          text-[10px]
                          font-medium
                          leading-tight
                          text-[#5B5552]
                        "
                      >
                        {t(conditionKey)}
                      </p>
                    </div>

                    {/* Compact stats row */}
                    <div
                      className="
                        mt-2
                        grid
                        grid-cols-4
                        divide-x
                        divide-[#B8944A]/15
                        rounded-xl
                        bg-[#EEF3F5]/65
                        px-1
                        py-1.5
                      "
                    >
                      <CompactStat
                        label={t("weather.feelsLike")}
                        value={`${Math.round(
                          day.feelsLike ??
                            day.tempMax!,
                        )}°`}
                      />

                      <CompactStat
                        label={t("weather.humidity")}
                        value={`${Math.round(
                          day.humidity ?? 0,
                        )}%`}
                      />

                      <CompactStat
                        label={t("weather.wind")}
                        value={`${Math.round(
                          day.wind ?? 0,
                        )}`}
                      />

                      <CompactStat
                        label={t("weather.rain")}
                        value={
                          day.precipProb != null
                            ? `${day.precipProb}%`
                            : "—"
                        }
                      />
                    </div>
                  </>
                ) : (
                  <p className="mt-2 font-body text-[11px] text-[#655C58]">
                    {status === "loading"
                      ? t("common.loading")
                      : t("weather.unavailable")}
                  </p>
                )}
              </motion.article>
            );
          })}
        </div>

        {/* Bottom hint */}
        <motion.div
          className="mt-3 flex items-center justify-center gap-2"
          initial={{ opacity: 0 }}
          animate={
            inView
              ? {
                  opacity: 1,
                }
              : {}
          }
          transition={{
            delay: 0.65,
          }}
        >
          <span className="h-px w-8 bg-gradient-to-r from-transparent to-[#B8944A]/60" />

          <span className="text-[8px] text-[#B8944A]">
            ✦
          </span>

          <span className="h-px w-8 bg-gradient-to-l from-transparent to-[#B8944A]/60" />
        </motion.div>
      </div>
    </Scene>
  );
}

function CompactStat({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="px-1 text-center">
      <p
        className="
          font-body
          text-[7px]
          font-medium
          uppercase
          tracking-wide
          text-[#746D68]
        "
      >
        {label}
      </p>

      <p
        className="
          mt-0.5
          font-body
          text-[10px]
          font-semibold
          leading-none
          text-[#403633]
        "
      >
        {value}
      </p>
    </div>
  );
}

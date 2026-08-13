"use client";

import { motion } from "framer-motion";
import type { WeddingEvent } from "@/lib/wedding";
import { addEventToCalendar } from "@/lib/calendar";
import { useI18n } from "@/lib/i18n";
import { EventImageDecor, EventCardFrame } from "@/components/events/EventImageDecor";
import { CalendarIcon, MapPinIcon, ClockIcon } from "@/components/icons/WeddingIcons";

const CARD_BG: Record<WeddingEvent["theme"], string> = {
  green: "bg-gradient-to-b from-[#F7F1E7] via-[#EEF3EC] to-[#F7F1E7]",
  haldi: "bg-gradient-to-b from-[#FFF8E8] via-[#FDF0C8] to-[#F7F1E7]",
  engagement: "bg-gradient-to-b from-[#FBF6F0] via-[#F5EBE4] to-[#F7F1E7]",
  sangeet: "bg-gradient-to-b from-[#2E3D2C] via-[#3A4A38] to-[#2E3D2C]",
  wedding: "bg-gradient-to-b from-[#F7F1E7] via-[#F5EBE8] to-[#EADBC8]",
};

type Props = {
  event: WeddingEvent;
  index: number;
  inView: boolean;
};

export function EventCard({ event, index, inView }: Props) {
  const { t } = useI18n();
  const isDark = event.theme === "sangeet";
  const title = t(event.titleKey);
  const description = t(event.descriptionKey);

  const dateLine = `${t(event.dayKey).toUpperCase()} · ${event.date
    .replace(" August ", " ")
    .toUpperCase()}`;

  return (
    <motion.article
      className={`overflow-hidden rounded-[1.25rem] shadow-[0_16px_48px_rgba(48,35,31,0.1)] ${CARD_BG[event.theme]}`}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.1 * index, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Image — ~50% visual weight */}
      <div className="relative aspect-[4/3] w-full overflow-hidden sm:aspect-[16/10]">
        <EventCardFrame theme={event.theme} />
        <EventImageDecor theme={event.theme} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={event.image}
          alt={`${title} — Kunal & Pravalika`}
          loading={index < 2 ? "eager" : "lazy"}
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out hover:scale-[1.02]"
          style={{ objectPosition: event.imagePosition }}
        />
        <span
          className={`absolute left-3 top-3 rounded-full px-2.5 py-1 font-body text-[9px] font-semibold tracking-[0.14em] shadow-sm sm:text-[10px] ${
            isDark
              ? "bg-ivory/95 text-charcoal"
              : "bg-ivory/95 text-deep-brown"
          }`}
        >
          {t(event.badgeKey)}
        </span>
        <span className="absolute bottom-3 left-3 rounded-full bg-[#5A1828]/85 px-2 py-0.5 font-body text-[10px] font-bold text-ivory">
          {String(event.order).padStart(2, "0")}
        </span>
      </div>

      {/* Content */}
      <div className={`px-4 py-4 sm:px-5 sm:py-5 ${isDark ? "text-on-dark" : "text-deep-brown"}`}>
        <p
          className={`font-body text-[10px] font-semibold tracking-[0.18em] sm:text-[11px] ${
            isDark ? "text-gold-soft/90" : "text-terracotta"
          }`}
        >
          {dateLine}
        </p>

        <h3
          className={`mt-1.5 font-display text-[clamp(1.35rem,4.5vw,1.75rem)] font-semibold leading-tight ${
            isDark ? "text-ivory" : "text-deep-brown"
          }`}
        >
          {title}
        </h3>

        <p
          className={`mt-1 font-display text-[clamp(0.9rem,2.8vw,1.05rem)] italic ${
            isDark ? "text-gold-soft/95" : "text-maroon"
          }`}
        >
          {t(event.subtitleKey)}
        </p>

        <p
          className={`mt-2.5 text-body-readable leading-relaxed ${
            isDark ? "text-ivory/85" : ""
          }`}
        >
          {description}
        </p>

        <p
          className={`mt-2 font-body text-xs font-semibold ${
            isDark ? "text-gold-soft" : "text-leaf-green"
          }`}
        >
          {t("events.dressCodeLabel")}: {t(event.dressCodeKey)}
        </p>

        <div className="mt-3 space-y-1.5">
          <div
            className={`flex items-center gap-2 font-body text-xs font-medium ${
              isDark ? "text-ivory/90" : "text-deep-brown"
            }`}
          >
            <ClockIcon className="h-3.5 w-3.5 shrink-0 text-terracotta" />
            <span>{event.time}</span>
          </div>
          <div
            className={`flex items-start gap-2 font-body text-xs font-medium ${
              isDark ? "text-ivory/90" : "text-deep-brown"
            }`}
          >
            <MapPinIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-terracotta" />
            <span className="break-words leading-snug">
              {event.venue}, {event.address}
            </span>
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-2 sm:flex-row">
          <button
            type="button"
            onClick={() => addEventToCalendar(event, title, description)}
            className="btn-terracotta flex flex-1 items-center justify-center gap-2"
          >
            <CalendarIcon />
            {t("events.addToCalendar")}
          </button>
          <a
            href={event.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline flex flex-1 items-center justify-center gap-2"
          >
            <MapPinIcon />
            {t("events.navigateToVenue")}
          </a>
        </div>
      </div>
    </motion.article>
  );
}

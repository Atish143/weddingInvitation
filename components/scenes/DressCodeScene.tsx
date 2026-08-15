'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Scene } from '@/components/Scene';
import { Sparkles } from '@/components/fx/Sparkles';
import { WEDDING_EVENTS } from '@/lib/wedding';
import { useScrollRoot } from '@/lib/ScrollContext';
import { useI18n } from '@/lib/i18n';
const CARD_STYLES: Record<
  (typeof WEDDING_EVENTS)[number]['theme'],
  { card: string; title: string; meta: string; body: string; accent: string }
> = {
  green: {
    card: 'bg-[#EDF3EA]/90 border-[#849B7A]/40',
    title: 'text-[#38543A]',
    meta: 'text-[#5C7655]',
    body: 'text-[#463B35]',
    accent: '#607B58',
  },
  haldi: {
    card: 'bg-[#FFF5D8]/92 border-[#D5B45B]/50',
    title: 'text-[#8D671F]',
    meta: 'text-[#A77B24]',
    body: 'text-[#4E4035]',
    accent: '#B9923F',
  },
  engagement: {
    card: 'bg-[#F8EFE7]/94 border-[#C99A79]/40',
    title: 'text-[#733B3F]',
    meta: 'text-[#B46145]',
    body: 'text-[#4B3D38]',
    accent: '#A85C4D',
  },
  sangeet: {
    card: 'bg-[#9DB285]/96 border-[#9DB285]/40',
    title: 'text-[#2E3328]',
    meta: 'text-[#D8C386]',
    body: 'text-[#2E3328]',
    accent: '#2E3328',
  },
  wedding: {
    card: 'bg-[#F7EFE4]/95 border-[#9D6265]/30',
    title: 'text-[#70373E]',
    meta: 'text-[#A67A35]',
    body: 'text-[#463A35]',
    accent: '#8E565A',
  },
};
export function DressCodeScene() {
  const { t } = useI18n();
  const { scrollRef } = useScrollRoot();
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { root: scrollRef, once: true, amount: 0.12 });
  return (
    <Scene
      id="dresscode"
      className=" relative overflow-hidden bg-[#f6ecdf] "
      petals
      petalColors={['#E8C4C8', '#D8C7A0', '#B8944A', '#C9D2C2']}
      petalCount={6}
    >
      {' '}
      {/* ===================================================== BACKGROUND IMAGE public/images/events/dresscodebg.png ===================================================== */}{' '}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
      >
        {' '}
        <img
          src="/images/events/dresscodebg.png"
          alt=""
          className="h-full w-full object-cover object-center"
        />{' '}
      </div>{' '}
      {/* Very subtle overlay */}{' '}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1] bg-[#fffaf0]/10"
      />{' '}
      {/* Existing sparkle effect */}{' '}
      <div className="relative z-[2]">
        {' '}
        <Sparkles count={7} color="#B8944A" />{' '}
      </div>{' '}
      {/* ===================================================== CONTENT ===================================================== */}{' '}
      <div
        ref={ref}
        className=" relative z-10 mx-auto flex w-full max-w-lg flex-1 flex-col justify-center px-4 py-6 sm:px-6 "
      >
        {' '}
        {/* Header */}{' '}
        <motion.div
          className="mb-6 text-center"
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          {' '}
          <div className="mx-auto mb-3 flex items-center justify-center gap-3">
            {' '}
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-[#B8944A]" />{' '}
            <span className="text-[11px] text-[#B8944A]"> ✦ </span>{' '}
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-[#B8944A]" />{' '}
          </div>{' '}
          <p className=" font-body text-[10px] font-semibold uppercase tracking-[0.35em] text-[#A45D47] ">
            {' '}
            {t('dresscode.eyebrow')}{' '}
          </p>{' '}
          <h2 className=" mt-1 font-display text-[2rem] font-semibold leading-tight text-[#3C2C28] sm:text-4xl ">
            {' '}
            {t('dresscode.title')}{' '}
          </h2>{' '}
          <p className=" mx-auto mt-2 max-w-sm font-body text-sm leading-relaxed text-[#645650] ">
            {' '}
            {t('dresscode.subtitle')}{' '}
          </p>{' '}
        </motion.div>{' '}
        {/* Timeline */}{' '}
        <div className="relative">
          {' '}
          {/* Vertical gold line */}{' '}
          <motion.div
            className=" absolute bottom-6 left-[21px] top-6 w-px origin-top bg-gradient-to-b from-[#B8944A]/20 via-[#B8944A] to-[#B8944A]/20 "
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          />{' '}
          <div className="space-y-3">
            {' '}
            {WEDDING_EVENTS.map((event, i) => {
              const style = CARD_STYLES[event.theme];
              return (
                <motion.article
                  key={event.id}
                  className="relative flex gap-3"
                  initial={{ opacity: 0, x: 22 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{
                    delay: 0.08 * i,
                    duration: 0.55,
                    ease: 'easeOut',
                  }}
                >
                  {' '}
                  {/* Timeline marker */}{' '}
                  <div className=" relative z-10 flex h-[43px] w-[43px] shrink-0 items-center justify-center rounded-full border border-[#B8944A]/50 bg-[#FFF9F1] shadow-[0_5px_18px_rgba(100,70,30,0.12)] ">
                    {' '}
                    <span
                      className=" flex h-8 w-8 items-center justify-center rounded-full text-base "
                      style={{ backgroundColor: `${style.accent}15` }}
                    >
                      {' '}
                      {event.dressIcon}{' '}
                    </span>{' '}
                  </div>{' '}
                  {/* Event card */}{' '}
                  <div
                    className={` min-w-0 flex-1 rounded-[20px] border p-3.5 shadow-[0_8px_30px_rgba(75,55,40,0.08)] backdrop-blur-sm ${style.card} `}
                  >
                    {' '}
                    <div className="flex items-start justify-between gap-3">
                      {' '}
                      <div className="min-w-0">
                        {' '}
                        <p
                          className={` font-body text-[9px] font-bold uppercase tracking-[0.22em] ${style.meta} `}
                        >
                          {' '}
                          {t(event.dayKey)}{' '}
                        </p>{' '}
                        <h3
                          className={` mt-1 font-display text-[17px] font-semibold leading-tight ${style.title} `}
                        >
                          {' '}
                          {t(event.titleKey)}{' '}
                        </h3>{' '}
                      </div>{' '}
                      <span
                        className=" shrink-0 rounded-full bg-white/35 px-2.5 py-1 font-body text-[8px] font-semibold uppercase tracking-wide "
                        style={{ color: style.accent }}
                      >
                        {' '}
                        Dress Code{' '}
                      </span>{' '}
                    </div>{' '}
                    <div className=" mt-3 flex items-center gap-2 border-t border-black/5 pt-2.5 ">
                      {' '}
                      <span
                        className="h-1.5 w-1.5 shrink-0 rounded-full"
                        style={{ backgroundColor: style.accent }}
                      />{' '}
                      <p
                        className={` font-body text-xs font-medium leading-snug sm:text-sm ${style.body} `}
                      >
                        {' '}
                        {t(event.dressCodeKey)}{' '}
                      </p>{' '}
                    </div>{' '}
                  </div>{' '}
                </motion.article>
              );
            })}{' '}
          </div>{' '}
        </div>{' '}
        {/* Bottom ornament */}{' '}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7, duration: 0.7 }}
          className="mt-5 flex items-center justify-center gap-2"
        >
          {' '}
          <span className="h-px w-10 bg-gradient-to-r from-transparent to-[#B8944A]/60" />{' '}
          <span className="text-[9px] text-[#B8944A]"> ✦ </span>{' '}
          <span className="h-px w-10 bg-gradient-to-l from-transparent to-[#B8944A]/60" />{' '}
        </motion.div>{' '}
      </div>{' '}
    </Scene>
  );
}

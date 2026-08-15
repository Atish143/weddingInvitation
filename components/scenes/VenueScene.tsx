'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Scene } from '@/components/Scene';
import { Sparkles } from '@/components/fx/Sparkles';
import { OrnateCorners } from '@/components/fx/OrnateCorners';
import { VENUE } from '@/lib/wedding';
import { useScrollRoot } from '@/lib/ScrollContext';
import { useI18n } from '@/lib/i18n';
export function VenueScene() {
  const { t } = useI18n();
  const { scrollRef } = useScrollRoot();
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { root: scrollRef, once: true, amount: 0.2 });
  const mapsOpen = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(VENUE.query)}`;
  return (
    <Scene
      id="venue"
      className=" relative overflow-hidden bg-[#e6edf3] "
      petals
      petalColors={['#D5E3EE', '#E4D2B0', '#B8923E', '#D8C7B5']}
      petalCount={6}
    >
      {' '}
      {/* ===================================================== BACKGROUND IMAGE public/images/events/weddesbg.png ===================================================== */}{' '}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
      >
        {' '}
        <img
          src="/images/events/weddesbg.png"
          alt=""
          className="h-full w-full object-cover object-center"
        />{' '}
      </div>{' '}
      {/* Very subtle overlay */}{' '}
      <div
        aria-hidden="true"
        className=" pointer-events-none absolute inset-0 z-[1] bg-[#fffaf0]/10 "
      />{' '}
      {/* Existing decorative effects */}{' '}
      <OrnateCorners className="z-[2] text-[#8B9EAD]/25" />{' '}
      <Sparkles count={8} color="#B8923E" />{' '}
      {/* ===================================================== CONTENT ===================================================== */}{' '}
      <div
        ref={ref}
        className=" relative z-10 mx-auto flex w-full max-w-md flex-1 flex-col items-center justify-center px-4 py-6 sm:px-6 "
      >
        {' '}
        {/* Location heading */}{' '}
        <motion.div
          className=" mb-4 flex flex-col items-center text-center "
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          {' '}
          {/* Pin */}{' '}
          <motion.div
            className=" mb-2 flex h-11 w-11 items-center justify-center rounded-full border border-[#B8923E]/40 bg-[#FFF9F1]/80 text-xl shadow-[0_5px_18px_rgba(70,70,70,0.10)] backdrop-blur-sm "
            aria-hidden="true"
            animate={inView ? { y: [0, -4, 0] } : {}}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            {' '}
            📍{' '}
          </motion.div>{' '}
          <p className=" font-body text-[10px] font-semibold uppercase tracking-[0.32em] text-[#607D95] ">
            {' '}
            {t('venue.eyebrow')}{' '}
          </p>{' '}
          <h2 className=" mt-1 font-display text-[2rem] font-semibold leading-tight text-[#302725] sm:text-4xl ">
            {' '}
            {VENUE.name}{' '}
          </h2>{' '}
          <p className=" mt-1 font-body text-sm font-medium text-[#5C5550] ">
            {' '}
            {VENUE.city}{' '}
          </p>{' '}
          {/* Small ornament */}{' '}
          <div className="mt-2 flex items-center gap-2">
            {' '}
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-[#B8923E]" />{' '}
            <span className="text-[9px] text-[#B8923E]"> ✦ </span>{' '}
            <span className="h-px w-8 bg-gradient-to-l from-transparent to-[#B8923E]" />{' '}
          </div>{' '}
        </motion.div>{' '}
        {/* ===================================================== VENUE CARD ===================================================== */}{' '}
        <motion.div
          className=" w-full overflow-hidden rounded-[24px] border border-[#B8923E]/35 bg-[#FFF9F1]/90 shadow-[0_18px_50px_rgba(75,65,55,0.15)] backdrop-blur-sm "
          initial={{ opacity: 0, y: 22 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.12, duration: 0.7 }}
        >
          {' '}
          {/* Map */}{' '}
          <div className=" relative aspect-[16/10] w-full overflow-hidden border-b border-[#B8923E]/25 bg-[#DCE7EF] ">
            {' '}
            <iframe
              title={VENUE.title}
              src={`https://www.google.com/maps?q=${encodeURIComponent(VENUE.query)}&output=embed`}
              className="relative z-10 h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />{' '}
          </div>{' '}
          {/* Card content */}{' '}
          <div className="px-4 py-4 text-center sm:px-5">
            {' '}
            <div className=" mx-auto max-w-sm rounded-2xl border border-[#B8923E]/20 bg-[#F7F0E6]/75 px-3 py-2.5 ">
              {' '}
              <p className=" font-body text-sm font-medium leading-relaxed text-[#514742] ">
                {' '}
                {t('venue.address')}{' '}
              </p>{' '}
            </div>{' '}
            {/* Buttons */}{' '}
            <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:justify-center">
              {' '}
              <a
                href={mapsOpen}
                target="_blank"
                rel="noopener noreferrer"
                className=" flex min-h-11 flex-1 items-center justify-center rounded-full border border-[#B8923E]/45 bg-[#FFF9F1] px-5 py-2.5 font-body text-sm font-semibold text-[#514742] shadow-sm transition hover:bg-[#F5EBDD] active:scale-[0.98] "
              >
                {' '}
                {t('common.openInMaps')}{' '}
              </a>{' '}
              <a
                href={VENUE.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className=" flex min-h-11 flex-1 items-center justify-center rounded-full bg-[#6E3540] px-5 py-2.5 font-body text-sm font-semibold text-white shadow-[0_8px_20px_rgba(110,53,64,0.20)] transition hover:bg-[#602D37] active:scale-[0.98] "
              >
                {' '}
                {t('common.getDirections')}{' '}
              </a>{' '}
            </div>{' '}
          </div>{' '}
        </motion.div>{' '}
        {/* Small bottom ornament */}{' '}
        <motion.div
          className="mt-4 flex items-center gap-2"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.7 }}
        >
          {' '}
          <span className="h-px w-8 bg-gradient-to-r from-transparent to-[#B8923E]/60" />{' '}
          <span className="text-[9px] text-[#B8923E]"> ✦ </span>{' '}
          <span className="h-px w-8 bg-gradient-to-l from-transparent to-[#B8923E]/60" />{' '}
        </motion.div>{' '}
      </div>{' '}
    </Scene>
  );
}

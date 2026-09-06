import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';

/* ─── Data ──────────────────────────────────────────────── */
const founders = [
  {
    id: 1,
    name: 'Mohammed Basheer K',
    role: 'Chairman & Founder',
    image: '/founder-1.jpg',
    message:
      '"Irikkur has always been a place of heart. When we built Mall of Irikkur, we built it for every family making a memory together. This is our gift to our community."',
  },
  {
    id: 2,
    name: 'Abdul Rahiman P',
    role: 'Managing Director',
    image: '/founder-2.jpg',
    message:
      '"Our vision was bold but our roots were humble. Mall of Irikkur is proof that when a community believes in itself, extraordinary things are built."',
  },
  {
    id: 3,
    name: 'Shafeeq Ibrahim T',
    role: 'Director & Co-Founder',
    image: '/founder-3.jpg',
    message:
      '"Every brick of Mall of Irikkur carries the dreams of Irikkur\'s people. We created a landmark — a proud symbol of what North Malabar can achieve."',
  },
  {
    id: 4,
    name: 'Musthafa Kamal K',
    role: 'Director & Co-Founder',
    image: '/founder-4.jpg',
    message:
      '"Our collective aspiration was to create more than spaces; it was to build a home of pride, connection, and prosperity for every generation of Irikkur."',
  },
];

/* ─── Desktop / Tablet Card ─────────────────────────────── */
function FounderCard({ founder, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 35, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.65, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      className="group flex flex-col h-full"
    >
      <div className="relative mb-4">
        <div className="absolute inset-0 rounded-2xl bg-brand-burgundy/8 scale-[1.04] -z-10 group-hover:scale-[1.07] transition-transform duration-500" />
        <div className="relative rounded-2xl overflow-hidden aspect-square shadow-[0_16px_48px_-12px_rgba(128,20,43,0.22)] group-hover:shadow-[0_24px_56px_-10px_rgba(128,20,43,0.32)] transition-shadow duration-500">
          <img
            src={founder.image}
            alt={`${founder.name} – ${founder.role}`}
            className="w-full h-full object-cover object-top group-hover:scale-[1.05] transition-transform duration-700 ease-out"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-burgundy-deep/40 via-transparent to-transparent" />
        </div>
      </div>
      <div className="mb-3">
        <h3 className="font-heading text-lg lg:text-[20px] font-extrabold text-brand-burgundy leading-tight">
          {founder.name}
        </h3>
        <span className="text-[11px] lg:text-[12px] font-semibold text-brand-muted uppercase tracking-wider block mt-1">
          {founder.role}
        </span>
      </div>
      <div className="relative flex-1 px-4 py-3 rounded-xl bg-brand-cream border border-brand-burgundy/10 group-hover:border-brand-burgundy/22 transition-colors duration-300 flex flex-col justify-start">
        <Quote className="absolute top-2 right-3 w-5 h-5 text-brand-burgundy/10 rotate-180" />
        <p className="text-[13px] lg:text-[13.5px] text-brand-charcoal/75 leading-[1.65] italic font-normal">
          {founder.message}
        </p>
      </div>
    </motion.div>
  );
}

/* ─── Mobile Carousel ───────────────────────────────────── */
const slideVariants = {
  enter: (dir) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir) => ({ x: dir > 0 ? '-100%' : '100%', opacity: 0 }),
};

function MobileCarousel() {
  const [[activeIdx, dir], setPage] = useState([0, 0]);
  const timerRef = useRef(null);

  // ── Auto-slide every 3.5 s ──
  const startTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setPage(([idx]) => {
        const next = (idx + 1) % founders.length;
        return [next, 1];
      });
    }, 3500);
  };

  useEffect(() => {
    startTimer();
    return () => clearInterval(timerRef.current);
  }, []);

  const go = (newIdx) => {
    const direction = newIdx > activeIdx ? 1 : -1;
    setPage([newIdx, direction]);
    startTimer(); // reset timer on manual interaction
  };

  const prev = () => go(Math.max(0, activeIdx - 1));
  const next = () => go(Math.min(founders.length - 1, activeIdx + 1));

  const founder = founders[activeIdx];

  return (
    <div className="px-4">
      {/* ── Card ── */}
      <div className="relative overflow-hidden rounded-3xl shadow-[0_24px_60px_-12px_rgba(128,20,43,0.28)] bg-white border border-brand-burgundy/10">

        {/* Photo — full width with overlay content */}
        <div className="relative h-[52vw] min-h-[200px] max-h-[260px] overflow-hidden">
          <AnimatePresence initial={false} custom={dir} mode="popLayout">
            <motion.img
              key={founder.id + '-img'}
              src={founder.image}
              alt={founder.name}
              custom={dir}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.42, ease: [0.32, 0, 0.67, 0] }}
              className="absolute inset-0 w-full h-full object-cover object-top"
              loading="lazy"
            />
          </AnimatePresence>
          {/* Bottom gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />

          {/* Counter pill – top right */}

        </div>

        {/* Content block */}
        <div className="px-5 pt-4 pb-5">
          <AnimatePresence initial={false} custom={dir} mode="popLayout">
            <motion.div
              key={founder.id + '-content'}
              custom={dir}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: [0.32, 0, 0.67, 0] }}
            >
              {/* Name & Role */}
              <div className="mb-3">
                <h3 className="font-heading text-xl font-extrabold text-brand-burgundy leading-tight tracking-tight">
                  {founder.name}
                </h3>
                <span className="text-[11px] font-bold text-brand-muted uppercase tracking-[0.16em]">
                  {founder.role}
                </span>
              </div>

              {/* Quote */}
              <div className="relative pl-4 border-l-2 border-brand-burgundy/30">
                <Quote className="absolute -top-1 right-0 w-5 h-5 text-brand-burgundy/10 rotate-180" />
                <p className="text-[13.5px] text-brand-charcoal/70 leading-[1.75] italic font-normal">
                  {founder.message}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Navigation bar at bottom of card ── */}
        <div className="flex items-center justify-between px-5 py-3 border-t border-brand-burgundy/8 bg-brand-cream/60">
          {/* Prev */}
          <button
            onClick={prev}
            disabled={activeIdx === 0}
            className="w-8 h-8 rounded-full border border-brand-burgundy/20 bg-white flex items-center justify-center text-brand-burgundy disabled:opacity-25 active:scale-95 transition-all shadow-sm"
            aria-label="Previous"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Progress dots */}
          <div className="flex items-center gap-2">
            {founders.map((_, i) => (
              <button
                key={i}
                onClick={() => go(i)}
                aria-label={`Go to founder ${i + 1}`}
                className={`rounded-full transition-all duration-350 ${i === activeIdx
                  ? 'w-7 h-2 bg-brand-burgundy'
                  : 'w-2 h-2 bg-brand-burgundy/25 hover:bg-brand-burgundy/50'
                  }`}
              />
            ))}
          </div>

          {/* Next */}
          <button
            onClick={next}
            disabled={activeIdx === founders.length - 1}
            className="w-8 h-8 rounded-full border border-brand-burgundy/20 bg-white flex items-center justify-center text-brand-burgundy disabled:opacity-25 active:scale-95 transition-all shadow-sm"
            aria-label="Next"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Thumbnail strip */}
      <div className="flex justify-center gap-3 mt-5">
        {founders.map((f, i) => (
          <button
            key={i}
            onClick={() => go(i)}
            aria-label={f.name}
            className={`relative rounded-xl overflow-hidden transition-all duration-300 ${i === activeIdx
              ? 'w-16 h-16 ring-2 ring-brand-burgundy ring-offset-2 shadow-md'
              : 'w-12 h-12 opacity-50 grayscale hover:opacity-75 hover:grayscale-0'
              }`}
          >
            <img src={f.image} alt={f.name} className="w-full h-full object-cover object-top" />
          </button>
        ))}
      </div>
    </div>
  );
}

/* ─── Section ───────────────────────────────────────────── */
export default function Founder() {
  return (
    <section
      id="founder"
      className="relative overflow-hidden py-14 sm:py-20 lg:py-28 text-brand-charcoal"
      style={{
        backgroundColor: '#FAF5F6',
        backgroundImage: `
          radial-gradient(ellipse at 50% 0%, rgba(233, 196, 106, 0.08) 0%, transparent 60%),
          radial-gradient(ellipse at 85% 65%, rgba(128, 20, 43, 0.035) 0%, transparent 50%),
          radial-gradient(ellipse at 15% 45%, rgba(128, 20, 43, 0.035) 0%, transparent 50%),
          linear-gradient(180deg, #FAF4F5 0%, #FFFFFF 50%, #FAF4F5 100%)
        `
      }}
    >
      {/* ── Top and bottom transition hairlines ── */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-burgundy/15 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-burgundy/15 to-transparent pointer-events-none" />

      {/* Background ambient accents */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-brand-burgundy/[0.03] rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-brand-gold/[0.06] rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto 2xl:max-w-[1400px]">

        {/* ── Header ── */}
        <div className="text-center px-4 sm:px-6 lg:px-8 mb-10 sm:mb-14 lg:mb-16">
          <motion.span
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-brand-burgundy/20 bg-brand-cream text-brand-burgundy text-xs sm:text-sm font-bold uppercase tracking-[0.18em] mb-4 shadow-sm"
          >
            <Quote className="w-3.5 h-3.5" />
            The Founders
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-brand-burgundy tracking-tight leading-[1.1] mb-4"
          >
            <span className="text-brand-charcoal">The Vision</span> Behind Mall of Irikkur
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-brand-muted text-sm sm:text-base lg:text-lg max-w-lg mx-auto leading-relaxed"
          >
            Four visionary leaders. One shared dream. Rooted in Irikkur, built for the future.
          </motion.p>
        </div>

        {/* ── MOBILE only: animated carousel ── */}
        <div className="sm:hidden">
          <MobileCarousel />
        </div>

        {/* ── TABLET + DESKTOP: Grid ── */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-6 xl:gap-8 px-4 sm:px-6 lg:px-8">
          {founders.map((founder, i) => (
            <FounderCard key={founder.id} founder={founder} index={i} />
          ))}
        </div>

        {/* ── Collective quote bar ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mx-4 sm:mx-6 lg:mx-8 mt-12 sm:mt-16 relative overflow-hidden rounded-2xl sm:rounded-3xl bg-brand-burgundy px-5 sm:px-10 lg:px-14 py-8 sm:py-10 text-center shadow-[0_20px_60px_-15px_rgba(128,20,43,0.35)]"
        >
          <div className="absolute -top-10 -left-10 w-32 h-32 bg-white/5 rounded-full" />
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/5 rounded-full" />

          <Quote className="w-8 h-8 sm:w-10 sm:h-10 text-white/15 mx-auto mb-3 rotate-180" />
          <p className="relative text-white/90 text-[15px] sm:text-lg lg:text-xl font-medium italic leading-[1.75] max-w-2xl mx-auto font-heading">
            "Building Mall of Irikkur was never about a business — it was about believing in our people, our town, and our shared future."
          </p>
          <div className="mt-5 flex items-center justify-center gap-2.5">
            <div className="flex -space-x-2">
              {founders.map((f) => (
                <div
                  key={f.id}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-brand-burgundy overflow-hidden shadow-md"
                >
                  <img src={f.image} alt={f.name} className="w-full h-full object-cover object-top" />
                </div>
              ))}
            </div>
            <span className="text-white/55 text-[11px] sm:text-xs font-semibold uppercase tracking-wider">
              — The Founders, Mall of Irikkur
            </span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

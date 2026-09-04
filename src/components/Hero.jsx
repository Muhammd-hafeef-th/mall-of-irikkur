import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';

const slides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?q=80&w=2000&auto=format&fit=crop',
    tag: 'Shopping & Lifestyle',
    headline: 'Where Irikkur',
    highlight: 'Comes Together.',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2000&auto=format&fit=crop',
    tag: 'World-Class Retail',
    headline: 'Discover Brands',
    highlight: "You'll Love.",
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1567521464027-f127ff144326?q=80&w=2000&auto=format&fit=crop',
    tag: 'Food & Flavours',
    headline: 'A Feast for',
    highlight: 'Every Taste.',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2000&auto=format&fit=crop',
    tag: 'Events & Entertainment',
    headline: 'Memories',
    highlight: 'Made Here.',
  },
];

const SLIDE_DURATION = 5000;
const SWIPE_THRESHOLD = 40; // px needed to count as a swipe

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  const timerRef   = useRef(null);
  const touchStart = useRef(null); // {x, y, time}
  const sectionRef = useRef(null);

  /* ── Navigation ── */
  const goTo = useCallback((index, dir = 1) => {
    setDirection(dir);
    setCurrent((index + slides.length) % slides.length);
  }, []);

  const next = useCallback(() => goTo(current + 1,  1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1, -1), [current, goTo]);

  /* ── Auto-advance ── */
  useEffect(() => {
    if (isPaused) return;
    timerRef.current = setTimeout(next, SLIDE_DURATION);
    return () => clearTimeout(timerRef.current);
  }, [current, isPaused, next]);

  const buttonTouch = useRef(null);

  /* ── Touch / Swipe (WhatsApp-stories style) ── */
  const onTouchStart = (e) => {
    // If the touch originated from a button or link, ignore it for slide switching
    if (e.target.closest('a, button, [role="button"]')) {
      touchStart.current = null;
      return;
    }
    const t = e.touches[0];
    touchStart.current = { x: t.clientX, y: t.clientY, time: Date.now() };
  };

  const onTouchEnd = (e) => {
    if (e.target.closest('a, button, [role="button"]')) {
      touchStart.current = null;
      return;
    }
    if (!touchStart.current) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - touchStart.current.x;
    const dy = t.clientY - touchStart.current.y;
    const dt = Date.now() - touchStart.current.time;

    // If mostly horizontal and quick enough
    if (Math.abs(dx) > Math.abs(dy) && dt < 400) {
      if (dx < -SWIPE_THRESHOLD) next();       // swipe left  → next
      else if (dx > SWIPE_THRESHOLD) prev();   // swipe right → prev
    } else if (Math.abs(dx) < 12 && Math.abs(dy) < 12) {
      // Pure tap — left 35% = prev, right 35% = next (middle = nothing)
      const w = sectionRef.current?.offsetWidth ?? window.innerWidth;
      if (t.clientX < w * 0.35) prev();
      else if (t.clientX > w * 0.65) next();
    }

    touchStart.current = null;
  };

  /* ── Dedicated Mobile Button Touch Handlers ── */
  const onBtnTouchStart = (e) => {
    e.stopPropagation();
    const t = e.touches[0];
    buttonTouch.current = { x: t.clientX, y: t.clientY };
  };

  const onBtnTouchEnd = (e, targetId) => {
    e.stopPropagation();
    if (!buttonTouch.current) return;
    const t = e.changedTouches[0];
    const dx = Math.abs(t.clientX - buttonTouch.current.x);
    const dy = Math.abs(t.clientY - buttonTouch.current.y);
    buttonTouch.current = null;

    // Small movement confirms intentional tap on mobile
    if (dx < 15 && dy < 15) {
      e.preventDefault();
      scrollTo(e, targetId);
    }
  };

  /* ── Scroll helper ── */
  const scrollTo = (e, id) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  /* ── Slide variants ── */
  const slideVariants = {
    enter: (dir) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
    center: { x: 0, opacity: 1, transition: { duration: 0.88, ease: [0.25, 0.46, 0.45, 0.94] } },
    exit: (dir) => ({
      x: dir > 0 ? '-55%' : '55%',
      opacity: 0,
      transition: { duration: 0.72, ease: [0.25, 0.46, 0.45, 0.94] },
    }),
  };

  const slide = slides[current];

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative w-full h-screen flex flex-col overflow-hidden bg-black select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* ── Sliding Images ── */}
      <AnimatePresence custom={direction} initial={false}>
        <motion.div
          key={slide.id}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0 z-0"
        >
          <img
            src={slide.image}
            alt={slide.tag}
            className="w-full h-full object-cover object-center"
            draggable={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/92 via-black/48 to-black/25" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-transparent to-black/28" />
        </motion.div>
      </AnimatePresence>

      {/* ── Progress Bars ── */}
      <div className="absolute top-0 left-0 right-0 z-30 flex gap-[3px] px-4 sm:px-8 pt-[70px] sm:pt-[76px]">
        {slides.map((s, i) => (
          <button
            key={s.id}
            onClick={() => goTo(i, i > current ? 1 : -1)}
            aria-label={`Slide ${i + 1}`}
            className="relative h-[2.5px] flex-1 rounded-full overflow-hidden bg-white/20"
          >
            {i === current && !isPaused && (
              <motion.div
                key={`p-${current}`}
                className="absolute inset-y-0 left-0 bg-white rounded-full"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: SLIDE_DURATION / 1000, ease: 'linear' }}
              />
            )}
            {i < current && <div className="absolute inset-0 bg-white/70 rounded-full" />}
          </button>
        ))}
      </div>

      {/* ── Mobile tap zones (invisible, z-10, only on mobile) ── */}
      <div className="sm:hidden absolute inset-0 z-10 flex pointer-events-none">
        <div
          className="w-[38%] h-full pointer-events-auto"
          onTouchEnd={(e) => { e.stopPropagation(); prev(); }}
        />
        <div className="flex-1 h-full" />
        <div
          className="w-[38%] h-full pointer-events-auto"
          onTouchEnd={(e) => { e.stopPropagation(); next(); }}
        />
      </div>

      {/* ── Main Content ── */}
      <div className="relative z-20 flex-1 flex flex-col items-center justify-center text-center text-white
                      px-6 sm:px-14 lg:px-20 xl:px-28
                      pt-20 pb-4">

        {/* Category tag — tiny all-caps, letter-spaced */}
        <AnimatePresence mode="wait">
          <motion.span
            key={`tag-${current}`}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.32 }}
            className="inline-block mb-3 sm:mb-4
                       font-sans text-[9px] sm:text-[10px] lg:text-[11px]
                       font-semibold tracking-[0.28em] uppercase text-white/80"
          >
            {slide.tag}
          </motion.span>
        </AnimatePresence>

        {/* Headline — Cormorant Garamond display serif */}
        <AnimatePresence mode="wait">
          <motion.h1
            key={`h1-${current}`}
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.52, delay: 0.07, ease: 'easeOut' } }}
            exit={{ opacity: 0, y: -10, transition: { duration: 0.22 } }}
            className="font-display font-semibold italic leading-[1.05]
                       text-[clamp(2.6rem,8.5vw,7rem)]
                       text-white mb-5 sm:mb-7
                       max-w-2xl sm:max-w-3xl lg:max-w-4xl xl:max-w-5xl"
          >
            {slide.headline}{' '}
            <span
              className="not-italic font-bold text-transparent bg-clip-text"
              style={{ backgroundImage: 'linear-gradient(130deg,#ffffff 0%,#e0f2fe 50%,#bae6fd 100%)' }}
            >
              {slide.highlight}
            </span>
          </motion.h1>
        </AnimatePresence>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.18 }}
          className="relative z-30 flex items-center justify-center gap-3 sm:gap-4 pointer-events-auto"
          onTouchStart={(e) => e.stopPropagation()}
          onTouchEnd={(e) => e.stopPropagation()}
        >
          {/* Primary */}
          <a
            href="#about"
            onClick={(e) => scrollTo(e, '#about')}
            onTouchStart={onBtnTouchStart}
            onTouchEnd={(e) => onBtnTouchEnd(e, '#about')}
            className="group relative overflow-hidden
                       inline-flex items-center justify-center
                       px-6 sm:px-8 lg:px-10 xl:px-12
                       py-2.5 sm:py-3 lg:py-3.5
                       rounded-full
                       bg-white text-gray-900
                       font-sans font-bold
                       text-[11px] sm:text-sm lg:text-[15px]
                       tracking-wide
                       shadow-[0_2px_20px_rgba(255,255,255,0.15)]
                       hover:shadow-[0_4px_30px_rgba(255,255,255,0.25)]
                       hover:scale-[1.04] active:scale-[0.97]
                       transition-all duration-300 pointer-events-auto cursor-pointer"
          >
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full
                             bg-gradient-to-r from-transparent via-white/30 to-transparent
                             transition-transform duration-600 ease-in-out pointer-events-none" />
            <span className="relative pointer-events-none">Explore Mall</span>
          </a>

          {/* Secondary ghost */}
          <a
            href="#businesses"
            onClick={(e) => scrollTo(e, '#businesses')}
            onTouchStart={onBtnTouchStart}
            onTouchEnd={(e) => onBtnTouchEnd(e, '#businesses')}
            className="inline-flex items-center justify-center
                       px-6 sm:px-8 lg:px-10 xl:px-12
                       py-2.5 sm:py-3 lg:py-3.5
                       rounded-full
                       bg-transparent text-white
                       font-sans font-semibold
                       text-[11px] sm:text-sm lg:text-[15px]
                       tracking-wide
                       border border-white/35
                       backdrop-blur-sm
                       hover:bg-white/12 hover:border-white/60
                       hover:scale-[1.04] active:scale-[0.97]
                       transition-all duration-300 pointer-events-auto cursor-pointer"
          >
            <span className="pointer-events-none">Our Businesses</span>
          </a>
        </motion.div>
      </div>

      {/* ── Editorial Side Arrows (sm+ only) ── */}
      <motion.button
        onClick={prev}
        aria-label="Previous slide"
        initial={{ opacity: 0, x: -14 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="hidden sm:flex group absolute left-0 top-1/2 -translate-y-1/2 z-20
                   items-center cursor-pointer select-none pl-0 pr-4 py-8"
      >
        <div className="h-px bg-gradient-to-r from-white/0 to-white/65
                        w-5 group-hover:w-11
                        transition-all duration-500 ease-out" />
        <div className="w-9 h-9 flex items-center justify-center
                        text-white/70 group-hover:text-white
                        group-hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.8)]
                        transition-all duration-300">
          <ArrowLeft className="w-[17px] h-[17px] group-hover:-translate-x-px transition-transform duration-300" />
        </div>
      </motion.button>

      <motion.button
        onClick={next}
        aria-label="Next slide"
        initial={{ opacity: 0, x: 14 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="hidden sm:flex group absolute right-0 top-1/2 -translate-y-1/2 z-20
                   items-center cursor-pointer select-none pr-0 pl-4 py-8"
      >
        <div className="w-9 h-9 flex items-center justify-center
                        text-white/70 group-hover:text-white
                        group-hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.8)]
                        transition-all duration-300">
          <ArrowRight className="w-[17px] h-[17px] group-hover:translate-x-px transition-transform duration-300" />
        </div>
        <div className="h-px bg-gradient-to-l from-white/0 to-white/65
                        w-5 group-hover:w-11
                        transition-all duration-500 ease-out" />
      </motion.button>

      {/* ── Bottom Bar ── */}
      <div className="relative z-20 flex items-center justify-between
                      px-5 sm:px-10 lg:px-14 xl:px-20
                      pb-5 sm:pb-6 lg:pb-7">

        {/* Dots */}
        <div className="flex items-center gap-[6px]">
          {slides.map((s, i) => (
            <button
              key={s.id}
              onClick={() => goTo(i, i > current ? 1 : -1)}
              aria-label={`Slide ${i + 1}`}
              className={`rounded-full transition-all duration-300 ${
                i === current
                  ? 'w-6 sm:w-8 h-[4px] bg-white shadow-[0_0_7px_rgba(255,255,255,0.5)]'
                  : 'w-[4px] h-[4px] bg-white/28 hover:bg-white/50'
              }`}
            />
          ))}
        </div>

        {/* Scroll cue */}
        <motion.a
          href="#about"
          onClick={(e) => scrollTo(e, '#about')}
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.9, repeat: Infinity, ease: 'easeInOut' }}
          className="flex items-center gap-2 text-white/65 hover:text-white/90
                     transition-colors cursor-pointer group"
        >
          <span className="font-sans text-[9px] sm:text-[10px] font-semibold
                           tracking-[0.2em] uppercase hidden sm:block">
            Scroll
          </span>
          <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full border border-white/40
                          flex items-center justify-center
                          group-hover:border-white/70 transition-colors">
            <ArrowDown className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          </div>
        </motion.a>
      </div>
    </section>
  );
}

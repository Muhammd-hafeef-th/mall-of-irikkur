import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useAnimationFrame } from 'framer-motion';
import { Store, X, Phone, Clock, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import { categories, businessesData } from '../data/businesses';

/* ─── Infinite Marquee Row ─────────────────────────────────────── */
function MarqueeRow({ items, speed = 35, reverse = false }) {
  const trackRef = useRef(null);
  const x = useRef(0);
  const lastTime = useRef(null);

  const doubled = [...items, ...items, ...items];

  useAnimationFrame((time) => {
    if (!trackRef.current) return;
    const delta = lastTime.current ? time - lastTime.current : 0;
    lastTime.current = time;
    const dir = reverse ? 1 : -1;
    x.current += dir * (speed * delta) / 1000;

    const trackW = trackRef.current.scrollWidth / 3;
    if (!reverse && x.current <= -trackW) x.current += trackW;
    if (reverse && x.current >= 0) x.current -= trackW;

    trackRef.current.style.transform = `translateX(${x.current}px)`;
  });

  return (
    <div className="overflow-hidden w-full">
      <div ref={trackRef} className="flex gap-4 will-change-transform" style={{ width: 'max-content' }}>
        {doubled.map((biz, i) => (
          <div
            key={`${biz.id}-${i}`}
            className="group relative w-64 h-36 rounded-2xl overflow-hidden shrink-0 border border-white/10"
          >
            <img
              src={biz.image}
              alt={biz.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              draggable="false"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-end p-3">
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest">{biz.category}</span>
              <p className="text-sm font-bold text-white leading-tight">{biz.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Category Carousel ─────────────────────────────────────────── */
function CategoryCarousel({ businesses, onSelect }) {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  const scroll = (dir) => {
    scrollRef.current?.scrollBy({ left: dir * 320, behavior: 'smooth' });
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    el?.addEventListener('scroll', checkScroll, { passive: true });
    return () => el?.removeEventListener('scroll', checkScroll);
  }, [businesses]);

  return (
    <div className="relative">
      <AnimatePresence>
        {canScrollLeft && (
          <motion.button
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            onClick={() => scroll(-1)}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 w-10 h-10 rounded-full bg-white shadow-xl flex items-center justify-center text-brand-burgundy hover:bg-brand-burgundy hover:text-white transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {canScrollRight && (
          <motion.button
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            onClick={() => scroll(1)}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 w-10 h-10 rounded-full bg-white shadow-xl flex items-center justify-center text-brand-burgundy hover:bg-brand-burgundy hover:text-white transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-brand-burgundy to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-brand-burgundy to-transparent z-10 pointer-events-none" />

      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto no-scrollbar px-8 py-4"
        onScroll={checkScroll}
      >
        {businesses.map((biz, idx) => (
          <motion.div
            key={biz.id}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.05 }}
            onClick={() => onSelect(biz)}
            className="group relative shrink-0 w-72 rounded-2xl overflow-hidden cursor-pointer border border-white/10 hover:border-white/40 transition-all duration-300"
            style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.4)' }}
          >
            <div className="relative h-44 overflow-hidden">
              <img
                src={biz.image}
                alt={biz.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-white/15 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest border border-white/20">
                {biz.category}
              </span>
              {biz.badge && (
                <span className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-amber-400 text-brand-burgundy text-[10px] font-extrabold uppercase tracking-wide">
                  {biz.badge}
                </span>
              )}
              <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-lg bg-white/15 backdrop-blur-md border border-white/20">
                <span className="text-white font-black text-xs tracking-widest">{biz.logoText}</span>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm p-4">
              <h3 className="text-base font-bold text-white mb-0.5 group-hover:text-amber-300 transition-colors">
                {biz.name}
              </h3>
              <p className="text-[11px] font-semibold text-white/50 uppercase tracking-wider mb-2">{biz.tagline}</p>
              <p className="text-xs text-white/70 leading-relaxed line-clamp-2">{biz.description}</p>

              <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-white/60 font-medium">
                  <MapPin className="w-3 h-3 text-amber-400 shrink-0" />
                  <span className="truncate max-w-[140px]">{biz.floor}</span>
                </div>
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1 group-hover:gap-2 transition-all">
                  View <ChevronRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ─── Business Detail Modal ─────────────────────────────────────── */
function BusinessModal({ business, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.88, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.88, opacity: 0, y: 20 }}
        transition={{ type: 'spring', damping: 22, stiffness: 280 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md rounded-3xl overflow-hidden shadow-2xl"
        style={{ background: 'linear-gradient(135deg, #1a0810 0%, #2d0f1c 100%)' }}
      >
        <div className="relative h-52 overflow-hidden">
          <img src={business.image} alt={business.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a0810] via-transparent to-transparent" />
          <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-brand-burgundy text-white text-xs font-bold">
            {business.category}
          </span>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-brand-burgundy transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="absolute bottom-4 left-4 px-3 py-1.5 rounded-xl bg-white/15 backdrop-blur-md border border-white/20">
            <span className="text-white font-black text-sm tracking-widest">{business.logoText}</span>
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-2xl font-bold font-heading text-white mb-1">{business.name}</h3>
          <p className="text-xs font-bold text-amber-400 uppercase tracking-widest mb-4">{business.tagline}</p>
          <p className="text-sm text-white/70 leading-relaxed mb-6">{business.description}</p>

          <div className="space-y-2.5 mb-6">
            {[
              { icon: MapPin, label: business.floor },
              { icon: Clock, label: business.timing },
              { icon: Phone, label: business.phone },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-3 text-sm">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 text-amber-400" />
                </div>
                <span className="text-white/80 font-medium">{label}</span>
              </div>
            ))}
          </div>

          <button
            onClick={onClose}
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-brand-burgundy to-rose-700 text-white font-bold text-sm hover:opacity-90 transition-opacity"
          >
            Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}


/* ─── Main Section ──────────────────────────────────────────────── */
export default function Businesses() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeModal, setActiveModal] = useState(null);

  const filteredBusinesses = selectedCategory === 'All'
    ? businessesData
    : businessesData.filter(b => b.category === selectedCategory);

  return (
    <section id="businesses" className="py-24 bg-brand-burgundy text-white relative overflow-hidden">

      {/* Ambient blobs */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-rose-900/30 blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-black/40 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-bold uppercase tracking-widest mb-5"
          >
            <Store className="w-3.5 h-3.5 text-amber-400" />
            <span>Commercial Directory</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl font-extrabold text-white font-heading tracking-tight mb-5"
          >
            Our Stores
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-white/70 font-normal"
          >
            Explore the curated brands and businesses that make Mall of Irikkur a world-class destination.
          </motion.p>
        </div>
      </div>

      {/* Marquee Band */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="mb-6 space-y-4 py-2"
      >
        <MarqueeRow items={businessesData} speed={30} />
        <MarqueeRow items={[...businessesData].reverse()} speed={25} reverse />
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Stats Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-0 py-10 sm:border-y sm:border-white/10 mb-12">
          {[
            { num: '25+', label: 'Businesses' },
            { num: '8',   label: 'Categories' },
            { num: '3',   label: 'Floors' },
            { num: '1',   label: 'Destination' },
          ].map(({ num, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flex flex-col items-center justify-center py-5 px-4 rounded-2xl sm:rounded-none bg-white/5 sm:bg-transparent border border-white/10 sm:border-0 sm:border-y sm:border-white/10 text-center sm:flex-1"
            >
              <p className="text-3xl sm:text-3xl font-extrabold text-amber-400 leading-none">{num}</p>
              <p className="text-[11px] font-bold text-white/50 uppercase tracking-widest mt-1.5">{label}</p>
            </motion.div>
          ))}
        </div>

        {/* Category Filter Pills */}
        <div className="relative mb-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-4 pr-14 sm:pr-0"
          >
            {categories.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-300 border ${active
                      ? 'bg-amber-400 text-brand-burgundy border-amber-400 shadow-lg scale-105'
                      : 'bg-white/8 text-white/80 border-white/15 hover:bg-white/15 hover:text-white hover:border-white/30'
                    }`}
                >
                  {cat}
                </button>
              );
            })}
          </motion.div>

          {/* Mobile swipe hint — right edge */}
          <div className="sm:hidden absolute right-0 top-0 bottom-4 flex items-center pointer-events-none">
            <div className="flex items-center gap-1 pl-2 pr-1 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md">
              <motion.svg
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.6 }}
                className="w-4 h-4 text-amber-400"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M9 5a1 1 0 012 0v6.5a.5.5 0 001 0V9a1 1 0 012 0v2.5a.5.5 0 001 0V10a1 1 0 012 0v5c0 3.314-2.686 6-6 6a6 6 0 01-6-6V9.5a1.5 1.5 0 013 0V5z" />
              </motion.svg>
              <svg className="w-3 h-3 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Horizontal Carousel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <CategoryCarousel businesses={filteredBusinesses} onSelect={setActiveModal} />
          </motion.div>
        </AnimatePresence>

        <div className="text-center mt-4">
          <p className="text-xs text-white/30 font-medium">← Swipe or drag to explore more brands →</p>
        </div>

      </div>

      {/* Modal */}
      <AnimatePresence>
        {activeModal && (
          <BusinessModal business={activeModal} onClose={() => setActiveModal(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}

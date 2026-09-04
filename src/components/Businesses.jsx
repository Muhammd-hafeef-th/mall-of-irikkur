import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Store, MapPin, Phone, Clock, Search, X, ArrowUpRight, ChevronLeft, ChevronRight, LayoutGrid, SlidersHorizontal } from 'lucide-react';
import { categories, businessesData } from '../data/businesses';

export default function Businesses() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeShop, setActiveShop] = useState(null);
  const [viewMode, setViewMode] = useState('carousel'); // 'carousel' or 'grid'

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef(null);
  const [maxIndex, setMaxIndex] = useState(0);

  const CARD_WIDTH = 240; // Uniform larger card width in px
  const CARD_GAP = 16;    // Gap between cards in px
  const STEP = CARD_WIDTH + CARD_GAP;

  // Filter stores by category & search query
  const filteredShops = useMemo(() => {
    return businessesData.filter((biz) => {
      const matchesCategory =
        selectedCategory === 'All' || biz.category === selectedCategory;
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        biz.name.toLowerCase().includes(query) ||
        biz.tagline.toLowerCase().includes(query) ||
        biz.category.toLowerCase().includes(query) ||
        biz.floor.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Compute maximum scroll index so laptop NEVER has blank space at the end
  const calculateBounds = () => {
    if (!containerRef.current) return;
    const containerW = containerRef.current.clientWidth;
    const visibleCards = Math.max(1, Math.floor((containerW + CARD_GAP) / STEP));
    const calculatedMax = Math.max(0, filteredShops.length - visibleCards);
    setMaxIndex(calculatedMax);
    setCurrentIndex((prev) => Math.min(prev, calculatedMax));
  };

  useEffect(() => {
    calculateBounds();
    window.addEventListener('resize', calculateBounds);
    return () => window.removeEventListener('resize', calculateBounds);
  }, [filteredShops.length]);

  // Reset slide index when category or search changes
  useEffect(() => {
    setCurrentIndex(0);
    calculateBounds();
  }, [selectedCategory, searchQuery]);

  // Continuous auto-sliding: seamlessly loops when reaching maxIndex
  useEffect(() => {
    if (viewMode !== 'carousel' || isPaused || activeShop || maxIndex <= 0) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 3000);

    return () => clearInterval(timer);
  }, [viewMode, isPaused, activeShop, maxIndex]);

  const nextSlide = () => {
    if (maxIndex <= 0) return;
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    if (maxIndex <= 0) return;
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  return (
    <section
      id="businesses"
      className="relative py-20 sm:py-24 text-white overflow-hidden"
      style={{
        backgroundColor: '#20050b',
        backgroundImage: `
          /* Top and bottom ambient luxury glows */
          radial-gradient(ellipse at 50% 0%, rgba(217, 119, 6, 0.16) 0%, transparent 55%),
          radial-gradient(ellipse at 85% 60%, rgba(190, 18, 60, 0.2) 0%, transparent 50%),
          radial-gradient(ellipse at 15% 40%, rgba(159, 18, 57, 0.22) 0%, transparent 50%),
          /* Fine luxury pinstripe overlay (32px intervals) */
          repeating-linear-gradient(
            90deg,
            rgba(255, 255, 255, 0.02) 0px,
            rgba(255, 255, 255, 0.02) 1px,
            transparent 1px,
            transparent 32px
          ),
          /* Alternating rich burgundy architectural striped wall panels (56px intervals) */
          repeating-linear-gradient(
            90deg,
            #190308 0px,
            #190308 56px,
            #26070f 56px,
            #26070f 112px
          )
        `
      }}
    >
      {/* Sleek top and bottom edge dark gradients */}
      <div className="absolute top-0 left-0 right-0 h-10 bg-gradient-to-b from-black/40 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header — Concise & Elegant */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-white text-[11px] font-bold uppercase tracking-widest mb-3"
            >
              <Store className="w-3.5 h-3.5 text-amber-400" />
              <span>Store Directory</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="text-2xl sm:text-4xl font-extrabold text-white font-heading tracking-tight"
            >
              Our Stores & Brands
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.12 }}
              className="text-xs sm:text-sm text-white/65 mt-1"
            >
              Discover all 15 authentic retail shops, culinary spots, and services at Mall of Irikkur.
            </motion.p>
          </div>

          {/* Controls: Carousel Arrows & View Mode Toggle */}
          <div className="flex items-center gap-3 self-end md:self-auto">
            {/* View Mode Switcher */}
            <div className="flex items-center bg-white/5 p-1 rounded-xl border border-white/10 text-xs">
              <button
                onClick={() => setViewMode('carousel')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${viewMode === 'carousel'
                    ? 'bg-amber-400 text-brand-burgundy font-bold shadow-sm'
                    : 'text-white/60 hover:text-white'
                  }`}
                title="Slider View"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Slider</span>
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${viewMode === 'grid'
                    ? 'bg-amber-400 text-brand-burgundy font-bold shadow-sm'
                    : 'text-white/60 hover:text-white'
                  }`}
                title="Grid View"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Grid</span>
              </button>
            </div>

            {/* Slider Next/Prev Arrows (only in carousel mode) */}
            {viewMode === 'carousel' && (
              <div className="flex items-center gap-1.5">
                <button
                  onClick={prevSlide}
                  className="w-9 h-9 rounded-full flex items-center justify-center border transition-all bg-white/10 hover:bg-amber-400 hover:text-brand-burgundy border-white/20 text-white active:scale-95"
                  aria-label="Previous store"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={nextSlide}
                  className="w-9 h-9 rounded-full flex items-center justify-center border transition-all bg-white/10 hover:bg-amber-400 hover:text-brand-burgundy border-white/20 text-white active:scale-95"
                  aria-label="Next store"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Filter Pills & Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 mb-6">

          {/* Category Tabs */}
          <div className="w-full md:w-auto flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
            {categories.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 border ${active
                      ? 'bg-amber-400 text-brand-burgundy border-amber-400 font-bold shadow'
                      : 'bg-white/5 text-white/70 border-white/10 hover:bg-white/10 hover:text-white'
                    }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Quick Search */}
          <div className="w-full md:w-64 flex items-center gap-2">
            <div className="relative w-full">
              <Search className="w-3.5 h-3.5 text-white/40 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search shop..."
                className="w-full pl-8 pr-7 py-1.5 text-xs rounded-full bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-amber-400/60 focus:bg-white/10 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
                  aria-label="Clear search"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
            <span className="shrink-0 text-[11px] font-medium text-white/40 whitespace-nowrap">
              {filteredShops.length} {filteredShops.length === 1 ? 'store' : 'stores'}
            </span>
          </div>
        </div>

        {/* Store Cards Showcase */}
        {filteredShops.length === 0 ? (
          <div className="text-center py-12 px-4 rounded-2xl bg-white/[0.02] border border-white/10">
            <p className="text-white/60 text-xs mb-3">No stores found matching your criteria.</p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-amber-400 text-brand-burgundy hover:bg-amber-300 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : viewMode === 'carousel' ? (
          /* ── CONTINUOUS ANIMATED SLIDER WITH TOUCH/MOUSE SWIPING ── */
          <div className="relative">
            <div
              ref={containerRef}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              className="overflow-hidden py-3 -my-3 px-1 cursor-grab active:cursor-grabbing select-none"
            >
              <motion.div
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.25}
                onDragStart={() => setIsPaused(true)}
                onDragEnd={(_, info) => {
                  setIsPaused(false);
                  if (info.offset.x < -40) {
                    nextSlide();
                  } else if (info.offset.x > 40) {
                    prevSlide();
                  }
                }}
                className="flex gap-4 will-change-transform"
                animate={{ x: -currentIndex * STEP }}
                transition={{ duration: 0.55, ease: [0.25, 1, 0.5, 1] }}
              >
                {filteredShops.map((shop) => (
                  <div
                    key={shop.id}
                    onClick={() => setActiveShop(shop)}
                    style={{ width: CARD_WIDTH }}
                    className="w-[240px] h-[245px] shrink-0 bg-white/[0.04] hover:bg-white/[0.09] border border-white/10 hover:border-amber-400/50 rounded-2xl p-3.5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(0,0,0,0.5),0_0_18px_rgba(245,158,11,0.1)] cursor-pointer flex flex-col justify-between group select-none"
                  >
                    <div>
                      {/* Logo Box Plaque — larger h-28 */}
                      <div
                        className="h-28 w-full rounded-xl flex items-center justify-center p-2.5 relative overflow-hidden mb-2.5 border border-black/15 shadow-inner"
                        style={{ backgroundColor: shop.logoBg || '#ffffff' }}
                      >
                        <img
                          src={shop.logo}
                          alt={shop.name}
                          className="max-h-full max-w-full object-contain filter group-hover:scale-105 transition-transform duration-500 select-none pointer-events-none"
                          loading="lazy"
                          draggable="false"
                        />
                      </div>

                      {/* Category & Floor */}
                      <div className="flex items-center justify-between gap-1 text-[10.5px] mb-1">
                        <span className="font-bold text-amber-400 uppercase tracking-wider truncate">
                          {shop.category}
                        </span>
                        <span className="text-white/40 flex items-center gap-0.5 shrink-0">
                          <MapPin className="w-2.5 h-2.5 text-white/50" />
                          <span className="truncate max-w-[85px]">{shop.floor.split('-')[0].trim()}</span>
                        </span>
                      </div>

                      {/* Shop Name */}
                      <h3 className="text-[15px] font-bold text-white group-hover:text-amber-300 transition-colors leading-snug line-clamp-1">
                        {shop.name}
                      </h3>

                      {/* Tagline */}
                      <p className="text-xs text-white/50 line-clamp-1 mt-0.5">
                        {shop.tagline}
                      </p>
                    </div>

                    {/* Details Hint */}
                    <div className="mt-2.5 pt-2 border-t border-white/5 flex items-center justify-between text-[11px] font-medium text-white/40 group-hover:text-amber-400 transition-colors">
                      <span className="uppercase tracking-wider font-semibold">View Details</span>
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Old Progress Bar Indicator (without numbers) */}
            <div className="mt-4 flex items-center justify-between gap-4">
              <div className="flex-1 max-w-xs h-1 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-400/80 rounded-full transition-all duration-300"
                  style={{
                    width: `${maxIndex > 0 ? Math.max(15, (currentIndex / maxIndex) * 100) : 100}%`
                  }}
                />
              </div>
            </div>
          </div>
        ) : (
          /* ── COMPACT GRID VIEW (Same uniform larger size) ── */
          <motion.div
            layout
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 justify-items-center"
          >
            {filteredShops.map((shop) => (
              <div
                key={shop.id}
                onClick={() => setActiveShop(shop)}
                className="w-full max-w-[240px] h-[245px] bg-white/[0.04] hover:bg-white/[0.09] border border-white/10 hover:border-amber-400/50 rounded-2xl p-3.5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(0,0,0,0.5),0_0_18px_rgba(245,158,11,0.1)] cursor-pointer flex flex-col justify-between group select-none"
              >
                <div>
                  <div
                    className="h-28 w-full rounded-xl flex items-center justify-center p-2.5 relative overflow-hidden mb-2.5 border border-black/15 shadow-inner"
                    style={{ backgroundColor: shop.logoBg || '#ffffff' }}
                  >
                    <img
                      src={shop.logo}
                      alt={shop.name}
                      className="max-h-full max-w-full object-contain filter group-hover:scale-105 transition-transform duration-500 select-none pointer-events-none"
                      loading="lazy"
                      draggable="false"
                    />
                  </div>

                  <div className="flex items-center justify-between gap-1 text-[10.5px] mb-1">
                    <span className="font-bold text-amber-400 uppercase tracking-wider truncate">
                      {shop.category}
                    </span>
                    <span className="text-white/40 flex items-center gap-0.5 shrink-0">
                      <MapPin className="w-2.5 h-2.5 text-white/50" />
                      <span className="truncate max-w-[85px]">{shop.floor.split('-')[0].trim()}</span>
                    </span>
                  </div>

                  <h3 className="text-[15px] font-bold text-white group-hover:text-amber-300 transition-colors leading-snug line-clamp-1">
                    {shop.name}
                  </h3>

                  <p className="text-xs text-white/50 line-clamp-1 mt-0.5">
                    {shop.tagline}
                  </p>
                </div>

                <div className="mt-2.5 pt-2 border-t border-white/5 flex items-center justify-between text-[11px] font-medium text-white/40 group-hover:text-amber-400 transition-colors">
                  <span className="uppercase tracking-wider font-semibold">View Details</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            ))}
          </motion.div>
        )}

      </div>

      {/* Clean, Elegant Shop Details Modal */}
      <AnimatePresence>
        {activeShop && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveShop(null)}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 320 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md rounded-3xl overflow-hidden shadow-2xl border border-white/15"
              style={{
                background: 'linear-gradient(145deg, #1c060d 0%, #2e0915 100%)'
              }}
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveShop(null)}
                className="absolute top-3.5 right-3.5 z-10 w-8 h-8 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white/80 hover:text-white hover:bg-white/20 transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Logo Header */}
              <div
                className="h-40 w-full flex items-center justify-center p-5 relative border-b border-white/10"
                style={{ backgroundColor: activeShop.logoBg || '#ffffff' }}
              >
                <img
                  src={activeShop.logo}
                  alt={activeShop.name}
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              {/* Shop Details */}
              <div className="p-5 sm:p-6">
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-400/20 border border-amber-400/30 text-amber-300 text-[10px] font-bold uppercase tracking-wider">
                    {activeShop.category}
                  </span>
                  {activeShop.badge && (
                    <span className="text-[10px] font-semibold text-white/50 uppercase tracking-wider">
                      {activeShop.badge}
                    </span>
                  )}
                </div>

                <h3 className="text-xl sm:text-2xl font-bold font-heading text-white mb-0.5">
                  {activeShop.name}
                </h3>
                <p className="text-xs font-semibold text-amber-400 mb-3">
                  {activeShop.tagline}
                </p>

                <p className="text-xs sm:text-sm text-white/70 leading-relaxed mb-5">
                  {activeShop.description}
                </p>

                {/* Meta Rows */}
                <div className="space-y-2 mb-5 text-xs text-white/80">
                  <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white/5 border border-white/10">
                    <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span className="font-medium">{activeShop.floor}</span>
                  </div>
                  <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white/5 border border-white/10">
                    <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span className="font-medium">{activeShop.timing}</span>
                  </div>
                </div>

                {/* Call & Close CTA Buttons */}
                <div className="grid grid-cols-2 gap-2.5">
                  <a
                    href={`tel:${activeShop.phone}`}
                    className="py-2.5 px-4 rounded-xl bg-amber-400 text-brand-burgundy font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-amber-300 transition-colors text-center"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call Store</span>
                  </a>
                  <button
                    onClick={() => setActiveShop(null)}
                    className="py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

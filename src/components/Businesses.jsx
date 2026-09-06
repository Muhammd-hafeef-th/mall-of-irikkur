import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Store,
  MapPin,
  Phone,
  Clock,
  Search,
  X,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  SlidersHorizontal,
  Sparkles,
  Shirt,
  UtensilsCrossed,
  Smartphone,
  HeartPulse,
  Briefcase,
  Gamepad2,
  ShoppingCart,
  Landmark,
  Gem,
  Scissors,
  RotateCcw
} from 'lucide-react';
import { categories, businessesData } from '../data/businesses';

const CATEGORY_ICONS = {
  All: Sparkles,
  Fashion: Shirt,
  'Food & Dining': UtensilsCrossed,
  Electronics: Smartphone,
  Healthcare: HeartPulse,
  Services: Briefcase,
  Entertainment: Gamepad2,
  'Hyper Market': ShoppingCart,
  Banking: Landmark,
  Jewellery: Gem,
  Salon: Scissors,
};

export default function Businesses() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeShop, setActiveShop] = useState(null);
  const [viewMode, setViewMode] = useState('carousel'); // 'carousel' or 'grid'

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef(null);
  const [maxIndex, setMaxIndex] = useState(0);

  // Category horizontal scroll refs and state
  const categoryScrollRef = useRef(null);
  const categoryItemRefs = useRef({});
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Store counts per category
  const categoryCounts = useMemo(() => {
    const counts = { All: businessesData.length };
    businessesData.forEach((biz) => {
      counts[biz.category] = (counts[biz.category] || 0) + 1;
    });
    return counts;
  }, []);

  const checkCategoryScroll = useCallback(() => {
    if (!categoryScrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = categoryScrollRef.current;
    setCanScrollLeft(scrollLeft > 6);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 6);
  }, []);

  useEffect(() => {
    checkCategoryScroll();
    const el = categoryScrollRef.current;
    if (el) {
      el.addEventListener('scroll', checkCategoryScroll, { passive: true });
      window.addEventListener('resize', checkCategoryScroll);
      return () => {
        el.removeEventListener('scroll', checkCategoryScroll);
        window.removeEventListener('resize', checkCategoryScroll);
      };
    }
  }, [checkCategoryScroll]);

  const scrollCategories = (direction) => {
    if (!categoryScrollRef.current) return;
    const amount = 260;
    categoryScrollRef.current.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth'
    });
  };

  const handleCategoryWheel = (e) => {
    if (!categoryScrollRef.current) return;
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      categoryScrollRef.current.scrollLeft += e.deltaY * 0.8;
    }
  };

  const handleSelectCategory = (cat) => {
    setSelectedCategory(cat);
    const itemEl = categoryItemRefs.current[cat];
    if (itemEl && categoryScrollRef.current) {
      itemEl.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      });
    }
  };

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
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="flex items-center gap-3 self-end md:self-auto"
          >
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
          </motion.div>
        </div>

        {/* Category Navigation Showcase & Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.55, delay: 0.18 }}
          className="mb-7 space-y-3.5"
        >
          {/* Luxury Category Dock */}
          <div className="relative group/category">
            {/* Left fade gradient + navigation arrow */}
            <div
              className={`pointer-events-none absolute left-0 top-0 bottom-0 w-12 sm:w-16 bg-gradient-to-r from-[#20050b] via-[#20050b]/90 to-transparent z-10 rounded-l-2xl transition-opacity duration-300 ${
                canScrollLeft ? 'opacity-100' : 'opacity-0'
              }`}
            />
            <button
              onClick={() => scrollCategories('left')}
              aria-label="Scroll categories left"
              className={`absolute left-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/80 hover:bg-amber-400 hover:text-[#38050e] text-white/90 border border-white/20 shadow-lg items-center justify-center transition-all duration-200 hidden sm:flex ${
                canScrollLeft ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Scrollable Track */}
            <div
              ref={categoryScrollRef}
              onWheel={handleCategoryWheel}
              className="flex items-center gap-2 sm:gap-2.5 overflow-x-auto no-scrollbar scroll-smooth p-1.5 sm:p-2 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.36),inset_0_1px_0_rgba(255,255,255,0.06)]"
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
              }}
            >
              {categories.map((cat) => {
                const active = selectedCategory === cat;
                const Icon = CATEGORY_ICONS[cat] || Sparkles;
                const count = categoryCounts[cat] || 0;

                return (
                  <button
                    key={cat}
                    ref={(el) => (categoryItemRefs.current[cat] = el)}
                    onClick={() => handleSelectCategory(cat)}
                    className={`group relative flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-300 shrink-0 border select-none ${
                      active
                        ? 'bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-[#38050e] border-amber-300 font-bold shadow-[0_0_22px_rgba(245,158,11,0.4)] scale-[1.02]'
                        : 'bg-white/[0.04] text-white/75 hover:text-white border-white/10 hover:border-amber-400/40 hover:bg-white/[0.09] active:scale-95'
                    }`}
                  >
                    <Icon
                      className={`w-3.5 h-3.5 transition-colors shrink-0 ${
                        active
                          ? 'text-[#38050e] stroke-[2.5]'
                          : 'text-amber-400/80 group-hover:text-amber-300 stroke-[2]'
                      }`}
                    />
                    <span className="tracking-wide">{cat}</span>
                    <span
                      className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold transition-all ${
                        active
                          ? 'bg-[#38050e]/15 text-[#38050e]'
                          : 'bg-white/10 group-hover:bg-white/15 text-white/50 group-hover:text-white/80'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Right fade gradient + navigation arrow */}
            <div
              className={`pointer-events-none absolute right-0 top-0 bottom-0 w-12 sm:w-16 bg-gradient-to-l from-[#20050b] via-[#20050b]/90 to-transparent z-10 rounded-r-2xl transition-opacity duration-300 ${
                canScrollRight ? 'opacity-100' : 'opacity-0'
              }`}
            />
            <button
              onClick={() => scrollCategories('right')}
              aria-label="Scroll categories right"
              className={`absolute right-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/80 hover:bg-amber-400 hover:text-[#38050e] text-white/90 border border-white/20 shadow-lg items-center justify-center transition-all duration-200 hidden sm:flex ${
                canScrollRight ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'
              }`}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Sub-toolbar: Active Status Indicator & Quick Search */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-1">
            {/* Status / Active Filter Badge */}
            <div className="flex items-center gap-2 text-xs text-white/60">
              <span className="flex items-center gap-1.5">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b]" />
                <span>Showing</span>
                <span className="font-bold text-white">{filteredShops.length}</span>
                <span>{filteredShops.length === 1 ? 'store' : 'stores'}</span>
              </span>

              {(selectedCategory !== 'All' || searchQuery) && (
                <div className="flex items-center gap-1.5 pl-2 border-l border-white/15">
                  <span className="text-[11px] text-amber-300/90 font-medium">
                    {selectedCategory !== 'All' ? selectedCategory : 'Filtered'}
                  </span>
                  <button
                    onClick={() => {
                      setSelectedCategory('All');
                      setSearchQuery('');
                    }}
                    className="inline-flex items-center gap-1 text-[11px] text-white/45 hover:text-amber-300 underline underline-offset-2 transition-colors ml-1"
                  >
                    <RotateCcw className="w-2.5 h-2.5" />
                    <span>Reset</span>
                  </button>
                </div>
              )}
            </div>

            {/* Quick Search */}
            <div className="relative w-full sm:w-72">
              <Search className="w-3.5 h-3.5 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by store name, keyword..."
                className="w-full pl-9 pr-8 py-2 text-xs rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-amber-400/70 focus:bg-white/[0.08] focus:ring-2 focus:ring-amber-400/20 transition-all shadow-inner"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-white/10 hover:bg-white/20 text-white/60 hover:text-white flex items-center justify-center transition-colors"
                  aria-label="Clear search"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>
        </motion.div>

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
                {filteredShops.map((shop, idx) => (
                  <motion.div
                    key={shop.id}
                    initial={{ opacity: 0, y: 26, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: '-30px' }}
                    transition={{ duration: 0.45, delay: Math.min(idx * 0.05, 0.35), ease: [0.22, 1, 0.36, 1] }}
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
                  </motion.div>
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
            {filteredShops.map((shop, idx) => (
              <motion.div
                key={shop.id}
                initial={{ opacity: 0, y: 26, scale: 0.94 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.45, delay: (idx % 5) * 0.06, ease: [0.22, 1, 0.36, 1] }}
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
              </motion.div>
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

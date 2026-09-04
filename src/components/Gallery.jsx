import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  Play,
  Pause,
  Sparkles,
  Camera
} from 'lucide-react';
import { galleryData } from '../data/gallery';

export default function Gallery() {
  const [lightboxIdx, setLightboxIdx] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [mounted, setMounted] = useState(false);
  const sliderRef = useRef(null);
  const images = galleryData;

  useEffect(() => {
    setMounted(true);
  }, []);

  // Scroll to a specific card index
  const scrollToIndex = useCallback((index) => {
    if (!sliderRef.current) return;
    const clampedIndex = Math.max(0, Math.min(index, images.length - 1));
    const container = sliderRef.current;
    const card = container.children[clampedIndex];
    if (card) {
      const targetLeft = card.offsetLeft - container.offsetLeft - 16;
      container.scrollTo({
        left: Math.max(0, targetLeft),
        behavior: 'smooth'
      });
      setCurrentIndex(clampedIndex);
    }
  }, [images.length]);

  const handleNext = useCallback(() => {
    const nextIdx = (currentIndex + 1) % images.length;
    scrollToIndex(nextIdx);
  }, [currentIndex, images.length, scrollToIndex]);

  const handlePrev = useCallback(() => {
    const prevIdx = (currentIndex - 1 + images.length) % images.length;
    scrollToIndex(prevIdx);
  }, [currentIndex, images.length, scrollToIndex]);

  // Update current active index on scroll
  const handleScroll = () => {
    if (!sliderRef.current) return;
    const container = sliderRef.current;
    const scrollLeft = container.scrollLeft;
    const cardWidth = container.children[0]?.offsetWidth || 300;
    const gap = 16;
    const newIdx = Math.round(scrollLeft / (cardWidth + gap));
    if (newIdx !== currentIndex && newIdx >= 0 && newIdx < images.length) {
      setCurrentIndex(newIdx);
    }
  };

  // Autoplay functionality
  useEffect(() => {
    if (!isPlaying || isHovered) return;
    const interval = setInterval(() => {
      handleNext();
    }, 4500);
    return () => clearInterval(interval);
  }, [isPlaying, isHovered, handleNext]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (lightboxIdx === null) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setLightboxIdx(null);
      if (e.key === 'ArrowLeft') setLightboxIdx((p) => (p === 0 ? images.length - 1 : p - 1));
      if (e.key === 'ArrowRight') setLightboxIdx((p) => (p === images.length - 1 ? 0 : p + 1));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightboxIdx, images.length]);

  // Prevent background scrolling when lightbox is open
  useEffect(() => {
    if (lightboxIdx !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [lightboxIdx]);

  return (
    <div className="w-full relative">
      {/* ─── Top Control Bar: Counter + Autoplay Toggle + Arrows ─── */}
      <div className="flex items-center justify-between gap-4 mb-6 sm:mb-8">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-cream border border-brand-burgundy/15 text-brand-burgundy text-xs font-bold tracking-wider shadow-sm">
            <Camera className="w-3.5 h-3.5 text-brand-burgundy" />
            <span>
              {String(currentIndex + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
            </span>
          </div>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white border border-brand-burgundy/15 text-brand-charcoal hover:text-brand-burgundy hover:border-brand-burgundy/30 transition-all shadow-sm active:scale-95"
          >
            {isPlaying ? (
              <>
                <Pause className="w-3 h-3 text-brand-burgundy" />
                <span className="hidden sm:inline">Pause</span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3 text-brand-burgundy fill-brand-burgundy" />
                <span className="hidden sm:inline">Autoplay</span>
              </>
            )}
          </button>
        </div>

        {/* Navigation Arrows */}
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrev}
            aria-label="Previous memory"
            className="p-2.5 sm:p-3 rounded-full bg-white border border-brand-burgundy/15 text-brand-charcoal hover:bg-brand-burgundy hover:text-white hover:border-brand-burgundy transition-all duration-300 shadow-sm hover:shadow-md active:scale-95"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <button
            onClick={handleNext}
            aria-label="Next memory"
            className="p-2.5 sm:p-3 rounded-full bg-white border border-brand-burgundy/15 text-brand-charcoal hover:bg-brand-burgundy hover:text-white hover:border-brand-burgundy transition-all duration-300 shadow-sm hover:shadow-md active:scale-95"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>

      {/* ─── Horizontal Premium Memory Reel ─── */}
      <div
        ref={sliderRef}
        onScroll={handleScroll}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="flex gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-4 pt-1 px-1 cursor-grab active:cursor-grabbing"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {images.map((item, idx) => {
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: Math.min(idx * 0.05, 0.2) }}
              onClick={() => setLightboxIdx(idx)}
              className={`
                snap-start flex-shrink-0 relative group rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer
                w-[85vw] sm:w-[360px] lg:w-[400px] h-[400px] sm:h-[450px] lg:h-[480px]
                border border-brand-burgundy/10 bg-white
                shadow-[0_10px_30px_-10px_rgba(128,20,43,0.12)]
                hover:shadow-[0_20px_45px_-12px_rgba(128,20,43,0.25)]
                transition-all duration-500 hover:-translate-y-1.5
              `}
            >
              {/* Image with smooth zoom */}
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Sophisticated Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent transition-opacity duration-300" />

              {/* Top Tag: Number Indicator & Expand Icon */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                <div className="p-2 rounded-full bg-white/20 backdrop-blur-md text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 shadow-lg">
                  <Maximize2 className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Bottom Content: Title + Simple Description */}
              <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 z-10 flex flex-col justify-end text-left">
                <div className="w-8 h-[2px] bg-brand-gold rounded-full mb-2.5 transform origin-left group-hover:w-12 transition-all duration-300" />

                <h3 className="text-white text-lg sm:text-xl font-bold font-heading leading-tight mb-2 group-hover:text-brand-gold transition-colors duration-300">
                  {item.title}
                </h3>

                <p className="text-white/80 text-xs sm:text-sm font-normal leading-relaxed line-clamp-2">
                  {item.caption}
                </p>
              </div>

              {/* Elegant Border Accent */}
              <div className="absolute inset-0 rounded-2xl sm:rounded-3xl ring-1 ring-inset ring-white/10 group-hover:ring-brand-gold/40 transition-all duration-300 pointer-events-none" />
            </motion.div>
          );
        })}
      </div>

      {/* ─── Bottom Navigation Progress Bar & Dots ─── */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 pt-2">
        <div className="flex items-center gap-1.5">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${i === currentIndex
                ? 'w-8 bg-brand-burgundy shadow-sm'
                : 'w-2 bg-brand-burgundy/20 hover:bg-brand-burgundy/40'
                }`}
            />
          ))}
        </div>

        <p className="text-xs text-brand-muted font-medium flex items-center gap-1.5">
          <span>Swipe or click any memory to view high-resolution photo</span>
        </p>
      </div>

      {/* ─── Fullscreen Lightbox Modal (Portaled to Body for true overlay) ─── */}
      {mounted && createPortal(
        <AnimatePresence>
          {lightboxIdx !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-[99999] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-8"
              onClick={() => setLightboxIdx(null)}
              role="dialog"
              aria-modal="true"
              aria-label="Full screen photo view"
            >
              <div
                className="relative max-w-5xl w-full flex flex-col items-center gap-4 sm:gap-6 max-h-[92vh]"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={() => setLightboxIdx(null)}
                  className="absolute -top-2 sm:-top-12 right-0 sm:right-0 z-50 p-2.5 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors focus:outline-none"
                  aria-label="Close photo"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Main Lightbox Image */}
                <motion.div
                  key={lightboxIdx}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.28 }}
                  className="w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl bg-zinc-950 flex items-center justify-center max-h-[68vh] border border-white/10"
                >
                  <img
                    src={images[lightboxIdx]?.image}
                    alt={images[lightboxIdx]?.title}
                    className="max-h-[68vh] w-auto max-w-full object-contain"
                  />
                </motion.div>

                {/* Lightbox Caption & Info */}
                <div className="text-center text-white px-4 max-w-2xl">
                  <span className="text-[11px] font-bold text-brand-gold uppercase tracking-widest block mb-1">
                    Photo {lightboxIdx + 1} of {images.length}
                  </span>
                  <h3 className="text-lg sm:text-2xl font-bold font-heading text-white mb-1.5">
                    {images[lightboxIdx]?.title}
                  </h3>
                  <p className="text-white/70 text-xs sm:text-sm leading-relaxed font-light">
                    {images[lightboxIdx]?.caption}
                  </p>
                </div>

                {/* Prev / Next Controls */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIdx((p) => (p === 0 ? images.length - 1 : p - 1));
                  }}
                  className="absolute left-1 sm:-left-14 top-[40%] -translate-y-1/2 p-3 rounded-full bg-white/15 hover:bg-white text-white hover:text-brand-burgundy transition-all duration-200 backdrop-blur-md shadow-xl"
                  aria-label="Previous photo"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIdx((p) => (p === images.length - 1 ? 0 : p + 1));
                  }}
                  className="absolute right-1 sm:-right-14 top-[40%] -translate-y-1/2 p-3 rounded-full bg-white/15 hover:bg-white text-white hover:text-brand-burgundy transition-all duration-200 backdrop-blur-md shadow-xl"
                  aria-label="Next photo"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
}

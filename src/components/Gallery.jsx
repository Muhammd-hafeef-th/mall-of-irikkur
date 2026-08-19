import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn, Camera } from 'lucide-react';
import { galleryCategories, galleryData } from '../data/gallery';

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState(null);

  const filteredImages = selectedCategory === 'All'
    ? galleryData
    : galleryData.filter(img => img.category === selectedCategory);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (activeLightboxIndex === null) return;
      if (e.key === 'Escape') setActiveLightboxIndex(null);
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeLightboxIndex, filteredImages]);

  const handlePrev = () => {
    if (activeLightboxIndex === null) return;
    setActiveLightboxIndex((prevIndex) => 
      prevIndex === 0 ? filteredImages.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    if (activeLightboxIndex === null) return;
    setActiveLightboxIndex((prevIndex) => 
      prevIndex === filteredImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="w-full">
      
      {/* Category Filter Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar"
      >
        {galleryCategories.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-300 ${
                isActive
                  ? 'bg-brand-burgundy text-white shadow-md font-bold scale-105'
                  : 'bg-brand-cream text-brand-burgundy hover:bg-brand-burgundy/10 border border-brand-burgundy/10'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </motion.div>

      {/* Masonry Image Layout Grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
        {filteredImages.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.05 }}
            onClick={() => setActiveLightboxIndex(idx)}
            className="relative break-inside-avoid rounded-3xl overflow-hidden bg-brand-cream group cursor-pointer shadow-md hover:shadow-2xl border border-brand-burgundy/10 transition-all duration-300 transform hover:-translate-y-1"
          >
            <img
              src={item.image}
              alt={item.title}
              loading="lazy"
              className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
            />
            
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-brand-burgundy-deep/90 via-brand-burgundy/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6 text-white">
              <div className="self-end p-2.5 rounded-full bg-white/20 backdrop-blur-md text-white">
                <ZoomIn className="w-5 h-5" />
              </div>
              <div>
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-white/20 text-white text-[11px] font-semibold uppercase tracking-wider mb-2 backdrop-blur-sm">
                  {item.category}
                </span>
                <h4 className="text-lg font-bold font-heading leading-tight">{item.title}</h4>
                <p className="text-xs text-white/80 line-clamp-2 mt-1">{item.caption}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {activeLightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-brand-burgundy-deep/95 backdrop-blur-lg flex items-center justify-center p-4 sm:p-8"
            onClick={() => setActiveLightboxIndex(null)}
          >
            {/* Lightbox Container */}
            <div 
              className="relative max-w-5xl w-full flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveLightboxIndex(null)}
                className="absolute -top-12 right-0 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-50 focus:outline-none"
                aria-label="Close Lightbox"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Main Lightbox Image Display */}
              <motion.div
                key={activeLightboxIndex}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="relative rounded-3xl overflow-hidden shadow-2xl bg-black border border-white/20 max-h-[75vh] w-full flex items-center justify-center"
              >
                <img
                  src={filteredImages[activeLightboxIndex]?.image}
                  alt={filteredImages[activeLightboxIndex]?.title}
                  className="max-h-[75vh] w-auto max-w-full object-contain"
                />
              </motion.div>

              {/* Lightbox Caption */}
              <div className="mt-4 text-center text-white max-w-2xl px-4">
                <span className="text-xs font-bold text-amber-300 uppercase tracking-widest block mb-1">
                  {filteredImages[activeLightboxIndex]?.category} • {activeLightboxIndex + 1} of {filteredImages.length}
                </span>
                <h3 className="text-xl font-bold font-heading">{filteredImages[activeLightboxIndex]?.title}</h3>
                <p className="text-sm text-white/80 mt-1 font-light">{filteredImages[activeLightboxIndex]?.caption}</p>
              </div>

              {/* Previous & Next Navigation Arrows */}
              <button
                onClick={handlePrev}
                className="absolute left-2 sm:-left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white text-white hover:text-brand-burgundy transition-all duration-200 z-50 backdrop-blur-md shadow-lg"
                aria-label="Previous Image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={handleNext}
                className="absolute right-2 sm:-right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white text-white hover:text-brand-burgundy transition-all duration-200 z-50 backdrop-blur-md shadow-lg"
                aria-label="Next Image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

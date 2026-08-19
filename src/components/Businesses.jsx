import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Store, X, Phone, Clock, MapPin, Tag } from 'lucide-react';
import { categories, businessesData } from '../data/businesses';
import BusinessCard from './BusinessCard';
import FeaturedBusiness from './FeaturedBusiness';

export default function Businesses() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeModalBusiness, setActiveModalBusiness] = useState(null);

  const filteredBusinesses = selectedCategory === 'All'
    ? businessesData
    : businessesData.filter(b => b.category === selectedCategory);

  return (
    <section id="businesses" className="py-24 bg-brand-burgundy text-white relative overflow-hidden">
      
      {/* Background Subtle Gradient Blobs */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-brand-burgundy-light/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-black/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-bold uppercase tracking-wider mb-4"
          >
            <Store className="w-3.5 h-3.5 text-white" />
            <span>COMMERCIAL DIRECTORY</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold text-white font-heading tracking-tight mb-4"
          >
            Discover Our Businesses
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-white/80 font-normal text-balance"
          >
            Explore the brands and businesses that make Mall of Irikkur a destination for everyone.
          </motion.p>
        </div>

        {/* Category Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex items-center justify-start md:justify-center gap-2 overflow-x-auto pb-6 mb-12 no-scrollbar"
        >
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-300 ${
                  isActive
                    ? 'bg-white text-brand-burgundy shadow-lg font-bold scale-105'
                    : 'bg-white/10 text-white/90 hover:bg-white/20 hover:text-white border border-white/10'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </motion.div>

        {/* Business Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {filteredBusinesses.map((business) => (
            <BusinessCard
              key={business.id}
              business={business}
              onSelect={(b) => setActiveModalBusiness(b)}
            />
          ))}
        </div>

        {/* Featured Anchor Store Showcase */}
        <FeaturedBusiness onOpenDetails={(b) => setActiveModalBusiness(b)} />

      </div>

      {/* Business Details Modal */}
      <AnimatePresence>
        {activeModalBusiness && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm p-4 flex items-center justify-center"
            onClick={() => setActiveModalBusiness(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white text-brand-charcoal rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative border border-white/40 overflow-hidden"
            >
              <button
                onClick={() => setActiveModalBusiness(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-brand-cream text-brand-burgundy hover:bg-brand-burgundy hover:text-white transition-colors"
                aria-label="Close details"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="h-44 rounded-2xl overflow-hidden mb-6 relative">
                <img
                  src={activeModalBusiness.image}
                  alt={activeModalBusiness.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-brand-burgundy text-white text-xs font-bold">
                  {activeModalBusiness.category}
                </span>
              </div>

              <h3 className="text-2xl font-bold font-heading text-brand-burgundy mb-1">
                {activeModalBusiness.name}
              </h3>
              <p className="text-xs font-semibold text-brand-muted uppercase tracking-wider mb-4">
                {activeModalBusiness.tagline}
              </p>

              <p className="text-sm text-brand-charcoal/90 leading-relaxed mb-6 font-normal">
                {activeModalBusiness.description}
              </p>

              <div className="space-y-3 pt-4 border-t border-brand-burgundy/10 text-xs font-semibold text-brand-charcoal">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-brand-burgundy" />
                  <span>Location: {activeModalBusiness.floor}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-brand-burgundy" />
                  <span>Timings: {activeModalBusiness.timing}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-brand-burgundy" />
                  <span>Contact: {activeModalBusiness.phone}</span>
                </div>
              </div>

              <div className="mt-6 pt-4 flex justify-end">
                <button
                  onClick={() => setActiveModalBusiness(null)}
                  className="px-6 py-2.5 rounded-xl bg-brand-burgundy text-white text-sm font-bold hover:bg-brand-burgundy-dark transition-colors"
                >
                  Close Window
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

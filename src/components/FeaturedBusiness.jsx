import React from 'react';
import { motion } from 'framer-motion';
import { Crown, Sparkles, CheckCircle2, MapPin, Phone, Clock, ArrowRight } from 'lucide-react';
import { featuredBusinessData } from '../data/businesses';

export default function FeaturedBusiness({ onOpenDetails }) {
  return (
    <div className="mt-16 pt-12 border-t border-white/20">
      <div className="text-center mb-8">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400 text-brand-burgundy font-extrabold text-xs uppercase tracking-wider shadow-md">
          <Crown className="w-3.5 h-3.5" /> Anchor Brand Spotlight
        </span>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-white/30 grid grid-cols-1 lg:grid-cols-12 text-brand-charcoal"
      >
        {/* Left Column: Big Brand Image */}
        <div className="lg:col-span-6 relative min-h-[350px] lg:min-h-[480px]">
          <img
            src={featuredBusinessData.image}
            alt={featuredBusinessData.name}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent opacity-80" />
          
          <div className="absolute top-6 left-6 p-3 rounded-2xl bg-white/95 backdrop-blur-md shadow-xl flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-brand-burgundy text-white flex items-center justify-center font-black text-sm font-heading">
              {featuredBusinessData.logoText}
            </div>
            <div>
              <span className="text-xs font-bold text-brand-burgundy uppercase tracking-wider block">FEATURED STORE</span>
              <span className="text-sm font-extrabold text-brand-charcoal">{featuredBusinessData.name}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Editorial Showcase Text */}
        <div className="lg:col-span-6 p-8 lg:p-12 flex flex-col justify-between">
          <div>
            <div className="inline-block px-3 py-1 rounded-full bg-brand-cream text-brand-burgundy text-xs font-bold uppercase tracking-wider mb-4 border border-brand-burgundy/10">
              {featuredBusinessData.category}
            </div>

            <h3 className="text-3xl sm:text-4xl font-extrabold text-brand-burgundy font-heading tracking-tight mb-2">
              {featuredBusinessData.name}
            </h3>

            <p className="text-sm font-semibold text-brand-muted uppercase tracking-wider mb-4">
              {featuredBusinessData.tagline}
            </p>

            <p className="text-base text-brand-charcoal/90 leading-relaxed mb-6 font-normal">
              {featuredBusinessData.description}
            </p>

            {/* Key Feature Bullets */}
            <div className="space-y-2.5 mb-8">
              {featuredBusinessData.highlights.map((highlight, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-sm font-semibold text-brand-burgundy">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{highlight}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Bar: Location & Action */}
          <div className="pt-6 border-t border-brand-burgundy/10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-bold text-brand-charcoal">
              <MapPin className="w-4 h-4 text-brand-burgundy" />
              <span>{featuredBusinessData.floor}</span>
            </div>

            <button
              onClick={() => onOpenDetails && onOpenDetails(featuredBusinessData)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm bg-brand-burgundy text-white hover:bg-brand-burgundy-dark transition-all duration-300 shadow-md group"
            >
              <span>Explore Collection</span>
              <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

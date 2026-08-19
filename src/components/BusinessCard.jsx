import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, MapPin, Clock, Phone } from 'lucide-react';

export default function BusinessCard({ business, onSelect }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -8 }}
      className="group relative bg-white rounded-3xl p-6 shadow-xl border border-white/20 transition-all duration-300 flex flex-col justify-between h-full"
    >
      {/* Top Banner & Badge */}
      <div>
        <div className="relative h-48 rounded-2xl overflow-hidden mb-6 bg-brand-cream">
          <img
            src={business.image}
            alt={business.name}
            className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
          
          {/* Category Tag */}
          <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-brand-burgundy/90 text-white text-xs font-semibold backdrop-blur-md shadow-md">
            {business.category}
          </div>

          {/* Optional Badge */}
          {business.badge && (
            <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-amber-400 text-brand-burgundy text-[11px] font-extrabold uppercase tracking-wide shadow-md">
              {business.badge}
            </div>
          )}

          {/* Logo Placeholder / Brand Badge */}
          <div className="absolute bottom-3 left-3 w-12 h-12 rounded-xl bg-white p-1.5 shadow-lg flex items-center justify-center font-black font-heading text-brand-burgundy text-xs border border-brand-burgundy/10 group-hover:scale-105 transition-transform">
            {business.logoText}
          </div>
        </div>

        {/* Business Title & Tagline */}
        <h3 className="text-xl font-bold font-heading text-brand-burgundy group-hover:text-brand-burgundy-light transition-colors mb-1 flex items-center justify-between">
          <span>{business.name}</span>
          <ArrowUpRight className="w-5 h-5 text-brand-burgundy opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
        </h3>

        <p className="text-xs font-semibold text-brand-muted uppercase tracking-wider mb-3">
          {business.tagline}
        </p>

        <p className="text-sm text-brand-charcoal/80 leading-relaxed mb-6 font-normal line-clamp-3">
          {business.description}
        </p>
      </div>

      {/* Footer Info: Floor & Action */}
      <div className="pt-4 border-t border-brand-burgundy/10 flex items-center justify-between text-xs text-brand-muted">
        <div className="flex items-center gap-1.5 font-medium text-brand-charcoal">
          <MapPin className="w-3.5 h-3.5 text-brand-burgundy shrink-0" />
          <span className="truncate max-w-[170px]">{business.floor}</span>
        </div>

        <button 
          onClick={() => onSelect && onSelect(business)}
          className="inline-flex items-center gap-1 text-xs font-bold text-brand-burgundy hover:text-brand-burgundy-dark transition-colors"
        >
          <span>Details</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </motion.div>
  );
}

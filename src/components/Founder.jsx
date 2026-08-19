import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Award, Heart, Compass } from 'lucide-react';

export default function Founder() {
  return (
    <section id="founder" className="py-24 bg-brand-cream-light text-brand-charcoal relative overflow-hidden border-y border-brand-burgundy/10">
      
      {/* Background Decorative Pattern */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-burgundy/5 rounded-full blur-3xl -z-0 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-burgundy/5 rounded-full blur-2xl -z-0 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-brand-burgundy/15 text-brand-burgundy text-xs font-bold uppercase tracking-wider mb-4 shadow-sm"
          >
            <Compass className="w-3.5 h-3.5 text-brand-burgundy" />
            <span>LEADERSHIP & VISION</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold text-brand-burgundy font-heading tracking-tight mb-4"
          >
            The Vision Behind Mall of Irikkur
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-brand-muted font-normal text-balance"
          >
            Pioneering a modern commercial landmark while remaining deeply rooted in the culture of Irikkur.
          </motion.p>
        </div>

        {/* Two-Column Founder Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Founder Photo Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-white p-3 border border-brand-burgundy/15 group">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/5]">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop"
                  alt="Founder of Mall of Irikkur"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 filter brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-burgundy-deep/80 via-transparent to-transparent opacity-90" />

                {/* Name & Title Overlay */}
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <h3 className="text-2xl font-bold font-heading">
                    [Founder Name]
                  </h3>
                  <p className="text-sm text-brand-cream/90 font-medium">
                    Founder & Managing Director, Mall of Irikkur
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Founder Biography & Story */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-7 flex flex-col justify-center"
          >
            {/* Elegant Quote Callout Box */}
            <div className="p-8 rounded-3xl bg-brand-burgundy text-white shadow-xl mb-8 relative overflow-hidden">
              <Quote className="w-16 h-16 text-white/10 absolute -top-2 -left-2 rotate-180" />
              <p className="relative z-10 text-xl sm:text-2xl font-semibold italic leading-relaxed text-white font-heading">
                “Building more than a mall — creating a place where people, businesses and memories come together.”
              </p>
              <div className="mt-4 pt-4 border-t border-white/20 flex items-center justify-between text-xs text-white/80">
                <span className="font-semibold uppercase tracking-wider">Founder's Message</span>
                <span className="font-light">Irikkur, Kannur</span>
              </div>
            </div>

            {/* Narrative Paragraphs */}
            <div className="space-y-4 text-base sm:text-lg text-brand-charcoal/90 leading-relaxed font-normal">
              <p>
                "When we envisioned <strong>Mall of Irikkur</strong>, our goal was simple yet ambitious: to give our hometown a modern, world-class destination that honors local values while welcoming global retail experiences."
              </p>
              <p className="text-base text-brand-muted">
                "For generations, Irikkur has been a close-knit community with a rich commercial history along the river banks. By creating a unified multi-storey shopping destination, we empower local business owners to thrive alongside regional and national brands, giving families in Irikkur and surrounding towns a place to shop, dine, and celebrate."
              </p>
            </div>

            {/* Core Values Bullets */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-4 rounded-xl bg-white border border-brand-burgundy/10 shadow-sm">
                <Award className="w-5 h-5 text-brand-burgundy shrink-0" />
                <span className="text-sm font-bold text-brand-burgundy">Excellence in Infrastructure</span>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-xl bg-white border border-brand-burgundy/10 shadow-sm">
                <Heart className="w-5 h-5 text-brand-burgundy shrink-0" />
                <span className="text-sm font-bold text-brand-burgundy">Community-First Commitment</span>
              </div>
            </div>

          </motion.div>
        </div>

      </div>
    </section>
  );
}

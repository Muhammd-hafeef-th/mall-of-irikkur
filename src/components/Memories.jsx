import React from 'react';
import { motion } from 'framer-motion';
import { Camera } from 'lucide-react';
import Gallery from './Gallery';

export default function Memories() {
  return (
    <section
      id="memories"
      className="py-16 sm:py-24 scroll-mt-20 md:scroll-mt-24 bg-gradient-to-b from-[#FAF4F5] via-white to-[#FAF4F5] text-brand-charcoal relative overflow-hidden"
    >
      {/* ── Subtle Background Ambience ── */}
      <div
        aria-hidden="true"
        className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full bg-brand-burgundy/[0.03] blur-[140px] pointer-events-none -translate-y-1/2"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-1/4 w-[450px] h-[450px] rounded-full bg-brand-burgundy/[0.04] blur-[120px] pointer-events-none translate-y-1/2"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ─── Centered Section Header (Matching "Our Stores" Style) ─── */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          {/* Branded Eyebrow Pill */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-burgundy/10 border border-brand-burgundy/15 text-brand-burgundy text-xs font-bold uppercase tracking-widest mb-4 shadow-sm"
          >
            <Camera className="w-3.5 h-3.5 text-brand-burgundy" />
            <span>Memories &amp; Moments</span>
          </motion.div>

          {/* Heading without any underline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-brand-charcoal font-heading tracking-tight mb-4"
          >
            Moments at <span className="text-brand-burgundy">Mall of Irikkur</span>
          </motion.h2>

          {/* Subtitle description */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-base sm:text-lg text-brand-muted font-normal max-w-2xl mx-auto leading-relaxed"
          >
            Every celebration, gathering, and shopping day creates timeless memories. Explore the vibrant moments captured across our mall.
          </motion.p>
        </div>

        {/* ─── Gallery Carousel Component ─── */}
        <Gallery />
      </div>
    </section>
  );
}

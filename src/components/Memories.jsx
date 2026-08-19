import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Sparkles } from 'lucide-react';
import Gallery from './Gallery';

export default function Memories() {
  return (
    <section id="memories" className="py-24 bg-white text-brand-charcoal relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-cream border border-brand-burgundy/10 text-brand-burgundy text-xs font-bold uppercase tracking-wider mb-4"
          >
            <Camera className="w-3.5 h-3.5 text-brand-burgundy" />
            <span>PHOTOGRAPHY & MOMENTS</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold text-brand-burgundy font-heading tracking-tight mb-4"
          >
            Memories at Mall of Irikkur
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-brand-muted font-normal text-balance"
          >
            Every visit becomes a memory.
          </motion.p>
        </div>

        {/* Gallery Grid */}
        <Gallery />

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 text-center"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-sm bg-brand-burgundy text-white hover:bg-brand-burgundy-dark hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
          >
            <Sparkles className="w-4 h-4 text-white" />
            <span>Share Your Moments With Us</span>
          </a>
        </motion.div>

      </div>
    </section>
  );
}

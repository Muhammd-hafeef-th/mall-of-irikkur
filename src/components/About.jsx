import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Utensils, HeartHandshake, Film, Sparkles, Building2 } from 'lucide-react';

const offerings = [
  { icon: ShoppingBag, title: 'Retail & Fashion', desc: 'Curated apparel, footwear and lifestyle brands.' },
  { icon: Utensils, title: 'Food & Dining', desc: 'Delicious Malabar treats & international coffee cafes.' },
  { icon: HeartHandshake, title: 'Essential Services', desc: 'Banking, wellness salons, and modern offices.' },
  { icon: Film, title: 'Entertainment & Fun', desc: 'Arcade gaming and family celebration spaces.' },
];

const stats = [
  { value: '01', label: 'Prime Location', detail: 'Heart of Irikkur Town' },
  { value: 'Multiple', label: 'Businesses & Brands', detail: 'Diverse Retail Offerings' },
  { value: '1000+', label: 'Memorable Experiences', detail: 'Daily Happy Visitors' },
  { value: 'Irikkur', label: 'Our Home', detail: 'Rooted in Community' },
];

export default function About() {
  return (
    <section id="about" className="py-24 bg-white text-brand-charcoal relative overflow-hidden">
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
            <Building2 className="w-3.5 h-3.5 text-brand-burgundy" />
            <span>OUR VISION & DESTINATION</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold text-brand-burgundy font-heading tracking-tight mb-4"
          >
            About Mall of Irikkur
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-brand-muted font-normal text-balance"
          >
            A destination built for Irikkur, its people and its future.
          </motion.p>
        </div>

        {/* Two-Column Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Image Stack */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-brand-burgundy/10 group">
              <img
                src="https://images.unsplash.com/photo-1567449303078-57ad995bd301?q=80&w=1000&auto=format&fit=crop"
                alt="Mall of Irikkur Atrium Interior Architecture"
                className="w-full h-[450px] sm:h-[550px] object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-burgundy-deep/70 via-transparent to-transparent opacity-80" />
              
              {/* Floating Quote Badge */}
              <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl bg-white/95 backdrop-blur-md border border-white/40 shadow-xl">
                <div className="flex items-start gap-3">
                  <Sparkles className="w-6 h-6 text-brand-burgundy shrink-0 mt-1" />
                  <div>
                    <p className="text-sm font-semibold text-brand-burgundy leading-snug">
                      "More than a commercial building — a vibrant hub where people meet, businesses grow and memories are created."
                    </p>
                    <span className="text-xs text-brand-muted block mt-1 font-medium">Heart of Kannur, Kerala</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Corner Element */}
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-brand-cream rounded-2xl -z-10 hidden sm:block" />
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-brand-burgundy/5 rounded-full -z-10 hidden sm:block" />
          </motion.div>

          {/* Right Column: Narrative Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-6 flex flex-col justify-center"
          >
            <h3 className="text-2xl sm:text-3xl font-bold text-brand-burgundy mb-6 leading-tight">
              Redefining Commerce & Lifestyle in North Malabar
            </h3>

            <p className="text-base sm:text-lg text-brand-charcoal/90 leading-relaxed mb-6 font-normal">
              Designed as Irikkur’s premier shopping, dining, and social destination, <strong>Mall of Irikkur</strong> unites world-class retail spaces with local entrepreneurship. We provide a modern, comfortable, and family-friendly environment for visitors of all generations.
            </p>

            <p className="text-base text-brand-muted leading-relaxed mb-8">
              Whether you are shopping for traditional bridal wear, catching up with friends over a fresh Malabar coffee, exploring top electronics, or attending vibrant community events, Mall of Irikkur brings everything under one roof.
            </p>

            {/* Offering Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {offerings.map((item, idx) => {
                const IconComp = item.icon;
                return (
                  <div key={idx} className="p-4 rounded-xl bg-brand-cream-light border border-brand-burgundy/10 flex items-start gap-3 hover:border-brand-burgundy/30 transition-colors">
                    <div className="p-2.5 rounded-lg bg-brand-burgundy text-white shrink-0">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-brand-burgundy text-sm">{item.title}</h4>
                      <p className="text-xs text-brand-muted mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Statistics Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-20 pt-12 border-t border-brand-burgundy/10 grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
        >
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-brand-cream/60 border border-brand-burgundy/10 text-center hover:bg-brand-cream transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="text-3xl sm:text-5xl font-extrabold text-brand-burgundy font-heading mb-2">
                {stat.value}
              </div>
              <div className="text-base font-bold text-brand-charcoal">
                {stat.label}
              </div>
              <div className="text-xs text-brand-muted mt-1 font-medium">
                {stat.detail}
              </div>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}

import React from 'react';
import { motion } from 'framer-motion';
import {
  ShoppingBag,
  Utensils,
  HeartHandshake,
  Gamepad2,
  MapPin,
  Star,
  ArrowRight,
  Sparkles,
  Clock,
  ShieldCheck,
  Building2,
  Users,
} from 'lucide-react';

/* ─── Modern Luxury Offering Pillars ─── */
const pillars = [
  {
    icon: ShoppingBag,
    title: 'Retail & Fashion',
    desc: 'Curated boutique apparel, bridal wear, footwear & everyday lifestyle essentials.',
    gradient: 'from-brand-burgundy to-rose-700',
    lightBg: 'group-hover:bg-rose-50/50',
    tag: 'Fashion & Style',
  },
  {
    icon: Utensils,
    title: 'Food & Dining',
    desc: 'Artisan bakeries, specialty coffee culture & authentic Malabar food favorites.',
    gradient: 'from-amber-600 to-amber-700',
    lightBg: 'group-hover:bg-amber-50/50',
    tag: 'Taste & Cafes',
  },
  {
    icon: HeartHandshake,
    title: 'Essential Services',
    desc: 'Travel & Hajj agencies, physical rehab, opticians & modern creative hubs.',
    gradient: 'from-emerald-700 to-teal-800',
    lightBg: 'group-hover:bg-emerald-50/50',
    tag: 'Daily Comfort',
  },
  {
    icon: Gamepad2,
    title: 'Entertainment',
    desc: 'Next-gen gaming lounge, social spaces & vibrant celebration zones for families.',
    gradient: 'from-purple-700 to-indigo-800',
    lightBg: 'group-hover:bg-purple-50/50',
    tag: 'Fun & Leisure',
  },
];

const highlights = [
  { value: '3', label: 'Spacious Floors', desc: 'Modern retail & dining zones' },
  { value: '15+', label: 'Verified Outlets', desc: 'Top local & regional brands' },
  { value: '100%', label: 'Family Friendly', desc: 'Accessible & climate controlled' },
  { value: '2024', label: 'Established', desc: 'North Malabar landmark' },
];

export default function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden py-16 sm:py-20 lg:py-24 text-brand-charcoal"
      style={{
        backgroundColor: '#FAF5F6',
        backgroundImage: `
          radial-gradient(ellipse at 50% 0%, rgba(233, 196, 106, 0.08) 0%, transparent 60%),
          radial-gradient(ellipse at 85% 65%, rgba(128, 20, 43, 0.035) 0%, transparent 50%),
          radial-gradient(ellipse at 15% 45%, rgba(128, 20, 43, 0.035) 0%, transparent 50%),
          linear-gradient(180deg, #FAF4F5 0%, #FFFFFF 50%, #FAF4F5 100%)
        `
      }}
    >
      {/* ── Top and bottom transition hairlines ── */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-burgundy/15 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-burgundy/15 to-transparent pointer-events-none" />

      {/* Ambient Glows */}
      <div className="absolute top-10 -left-20 w-80 h-80 bg-brand-burgundy/[0.03] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-20 w-96 h-96 bg-brand-gold/[0.06] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ── Section Header ── */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-cream border border-brand-burgundy/15 text-brand-burgundy text-xs font-bold uppercase tracking-[0.16em] mb-4 shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-brand-burgundy" />
            <span>Discover Mall of Irikkur</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-burgundy font-heading tracking-tight leading-[1.15]"
          >
            Where Irikkur{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-burgundy via-brand-burgundy-light to-amber-600">
              Comes Together
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.14 }}
            className="text-sm sm:text-base text-brand-muted mt-3 leading-relaxed max-w-2xl mx-auto"
          >
            A premier shopping, culinary, and social landmark designed for North Malabar. Experience world-class commerce and warm local hospitality under one roof.
          </motion.p>
        </div>

        {/* ── Main Two-Column Showcase ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch mb-14 sm:mb-16">

          {/* ─ Left: Grand Architecture Card with Live Highlights (5 Cols) ─ */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex flex-col"
          >
            <div className="relative rounded-[2rem] overflow-hidden border border-brand-burgundy/15 shadow-[0_20px_50px_rgba(128,20,43,0.12)] group h-full flex flex-col justify-end min-h-[420px] sm:min-h-[480px] lg:min-h-[520px]">
              {/* Grand Interior Image */}
              <img
                src="/about-mall-interior.jpg"
                alt="Mall of Irikkur Grand Interior Atrium"
                className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-1000 ease-out select-none"
                loading="lazy"
              />

              {/* Sophisticated gradient scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/20 pointer-events-none" />

              {/* Top Floating Glass Badges */}
              <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-white/80 text-xs font-semibold text-brand-charcoal shadow-md">
                <MapPin className="w-3.5 h-3.5 text-brand-burgundy" />
                <span>Irikkur, Kannur</span>
              </div>

              <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-white/80 text-xs text-brand-charcoal shadow-md">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 text-amber-500 fill-amber-500" />
                  ))}
                </div>
                <span className="font-extrabold text-xs text-brand-charcoal ml-0.5">4.9</span>
                <span className="text-[11px] text-brand-muted hidden sm:inline">(2.4k+)</span>
              </div>

              {/* Bottom Branded Overlay Card with Inset Stats */}
              <div className="relative z-10 p-5 sm:p-6 bg-gradient-to-t from-brand-burgundy-deep/95 via-brand-burgundy-deep/85 to-transparent backdrop-blur-sm text-white">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-bold font-heading text-white tracking-wide">
                      Mall of Irikkur
                    </h3>
                    <p className="text-xs text-white/70 font-medium mt-0.5">
                      North Malabar's Premier Lifestyle Landmark
                    </p>
                  </div>
                  <div className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[11px] font-semibold text-amber-300">
                    Est. 2024
                  </div>
                </div>

                {/* Inline 3-Column Highlights */}
                <div className="pt-3 border-t border-white/15 grid grid-cols-3 gap-2 text-center">
                  <div className="py-1">
                    <span className="block text-xl font-extrabold text-amber-300 leading-tight">3</span>
                    <span className="text-[10px] text-white/60 uppercase tracking-wider font-semibold">Floors</span>
                  </div>
                  <div className="py-1 border-x border-white/10">
                    <span className="block text-xl font-extrabold text-amber-300 leading-tight">15+</span>
                    <span className="text-[10px] text-white/60 uppercase tracking-wider font-semibold">Brands</span>
                  </div>
                  <div className="py-1">
                    <span className="block text-xl font-extrabold text-amber-300 leading-tight">100%</span>
                    <span className="text-[10px] text-white/60 uppercase tracking-wider font-semibold">Family Fun</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ─ Right: Narrative & Redesigned "What We Offer" Pillars (7 Cols) ─ */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-7 flex flex-col justify-between"
          >
            {/* Story Intro */}
            <div className="mb-6">
              <span className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-brand-burgundy inline-block mb-1.5">
                Redefining the Shopping Experience
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-brand-charcoal font-heading leading-snug mb-3">
                Modern Amenities, Handpicked Stores &amp; Community Spirit
              </h3>
              <p className="text-sm text-brand-muted leading-relaxed">
                Thoughtfully crafted across multiple expansive floors, <strong className="text-brand-burgundy font-semibold">Mall of Irikkur</strong> unites verified retail outlets, gourmet confectioneries, and essential family conveniences. Whether shopping for celebrations or meeting friends over coffee, experience the best of modern North Malabar.
              </p>
            </div>

            {/* ── Redesigned "What We Offer" Section ── */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-3.5">
                <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-brand-charcoal">
                  What We Offer
                </span>
                <div className="flex-1 h-px bg-gradient-to-r from-brand-burgundy/25 via-brand-burgundy/10 to-transparent" />
              </div>

              {/* 4 Premium Branded Offering Cards with Staggered Scroll Entrance */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {pillars.map((pillar, idx) => {
                  const Icon = pillar.icon;
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 28, scale: 0.96 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      viewport={{ once: true, margin: '-40px' }}
                      transition={{ duration: 0.55, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                      whileHover={{ y: -4, transition: { duration: 0.2 } }}
                      className={`group relative p-4 rounded-2xl bg-white border border-brand-burgundy/10 hover:border-brand-burgundy/30 shadow-[0_4px_20px_rgba(128,20,43,0.04)] hover:shadow-[0_14px_35px_rgba(128,20,43,0.1)] transition-all duration-300 flex items-start gap-3.5 overflow-hidden ${pillar.lightBg}`}
                    >
                      {/* Top subtle highlight line */}
                      <div className="absolute top-0 left-4 right-4 h-[2px] bg-gradient-to-r from-transparent via-brand-burgundy/20 to-transparent group-hover:via-brand-burgundy transition-all duration-500" />

                      {/* Icon Container with Rich Gradient */}
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${pillar.gradient} text-white flex items-center justify-center shrink-0 shadow-md shadow-brand-burgundy/15 group-hover:scale-105 transition-transform duration-300`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>

                      {/* Card Content */}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-1 mb-0.5">
                          <h4 className="text-sm font-bold text-brand-charcoal group-hover:text-brand-burgundy transition-colors leading-tight">
                            {pillar.title}
                          </h4>
                        </div>
                        <p className="text-xs text-brand-muted leading-relaxed">
                          {pillar.desc}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* ── Action Buttons with Scroll Reveal ── */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-wrap items-center gap-3 pt-2"
            >
              <a
                href="#businesses"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-burgundy text-white font-bold text-xs uppercase tracking-wider hover:bg-brand-burgundy-hover transition-all duration-300 shadow-[0_8px_20px_rgba(128,20,43,0.25)] hover:shadow-[0_12px_28px_rgba(128,20,43,0.35)] active:scale-95"
              >
                <span>Explore All Stores</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#location"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-brand-cream hover:bg-white border border-brand-burgundy/20 text-brand-burgundy font-semibold text-xs transition-all duration-300 shadow-sm hover:shadow"
              >
                <Clock className="w-3.5 h-3.5 text-brand-burgundy" />
                <span>Hours &amp; Location</span>
              </a>
            </motion.div>

          </motion.div>

        </div>

        {/* ── Bottom Stat Badges Strip with Staggered Pop-In ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-3xl bg-gradient-to-r from-brand-burgundy via-brand-burgundy-dark to-brand-burgundy p-6 sm:p-8 text-white shadow-[0_20px_50px_rgba(128,20,43,0.2)]"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 divide-y lg:divide-y-0 lg:divide-x divide-white/15">
            {highlights.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.88, y: 15 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className={`flex flex-col items-center text-center ${idx > 0 ? 'pt-6 lg:pt-0' : ''}`}
              >
                <span className="font-heading text-3xl sm:text-4xl font-black text-amber-300 tracking-tight leading-none mb-1.5">
                  {item.value}
                </span>
                <span className="text-white font-bold text-sm tracking-wide">
                  {item.label}
                </span>
                <span className="text-white/60 text-xs font-normal mt-0.5">
                  {item.desc}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}

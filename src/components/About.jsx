import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  ShoppingBag,
  Utensils,
  HeartHandshake,
  Gamepad2,
  MapPin,
  Star,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

/* ─── Data ─────────────────────────────────────────────── */
const pillars = [
  {
    icon: ShoppingBag,
    title: 'Retail & Fashion',
    desc: 'Curated apparel, footwear, and lifestyle brands under one roof.',
    color: 'from-rose-500/10 to-brand-burgundy/5',
    border: 'border-brand-burgundy/20',
    iconBg: 'bg-brand-burgundy',
  },
  {
    icon: Utensils,
    title: 'Food & Dining',
    desc: 'Delicious Malabar treats & international coffee café culture.',
    color: 'from-amber-500/10 to-orange-400/5',
    border: 'border-amber-500/20',
    iconBg: 'bg-amber-600',
  },
  {
    icon: HeartHandshake,
    title: 'Essential Services',
    desc: 'Banking, wellness salons, modern offices & everyday conveniences.',
    color: 'from-emerald-500/10 to-teal-400/5',
    border: 'border-emerald-500/20',
    iconBg: 'bg-emerald-600',
  },
  {
    icon: Gamepad2,
    title: 'Entertainment',
    desc: 'Arcade gaming, family celebration spaces & live event venues.',
    color: 'from-violet-500/10 to-purple-400/5',
    border: 'border-violet-500/20',
    iconBg: 'bg-violet-700',
  },
];

const highlights = [
  'Irikkur\'s premier social destination',
  'Family-friendly for all generations',
  'Supporting local entrepreneurs',
  'Modern & accessible design',
];

const stats = [
  { value: '50+', label: 'Businesses', sub: 'Curated tenants' },
  { value: '1K+', label: 'Daily Visitors', sub: 'Happy customers' },
  { value: '#1', label: 'Destination', sub: 'North Malabar' },
  { value: '∞', label: 'Memories', sub: 'Created daily' },
];

/* ─── Component ─────────────────────────────────────────── */
export default function About() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '-8%']);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative bg-white overflow-hidden py-14 sm:py-18 lg:py-24"
    >
      {/* ── Decorative Background Blobs ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-brand-burgundy/[0.04] rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-[600px] h-[600px] bg-brand-burgundy/[0.03] rounded-full blur-3xl" />
        {/* Subtle grid lines */}
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.025]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="about-grid"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 60 0 L 0 0 0 60"
                fill="none"
                stroke="#80142B"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#about-grid)" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section Label ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-6"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-burgundy/20 bg-brand-cream text-brand-burgundy text-[11px] font-bold uppercase tracking-[0.18em]">
            <MapPin className="w-3 h-3" />
            About Us
          </span>
        </motion.div>

        {/* ── Section Headline ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center max-w-2xl mx-auto mb-10 sm:mb-12"
        >
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-burgundy leading-[1.1] tracking-tight mb-5">
            Where Irikkur{' '}
            <span>Comes Together</span>
          </h2>
          <p className="text-brand-muted text-base sm:text-lg leading-relaxed font-normal">
            A destination built for Irikkur's people and its future — where
            commerce, culture, and community share the same beautiful space.
          </p>
        </motion.div>

        {/* ── Two-Column Layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-12 items-center">

          {/* ─ Left: Image Column ─ */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            {/* Main image card */}
            <div className="relative rounded-[2rem] overflow-hidden shadow-[0_32px_80px_-20px_rgba(128,20,43,0.28)] group">
              <img
                src="/about-mall-interior.jpg"
                alt="Grand interior of Mall of Irikkur – soaring atrium with chandeliers and luxury retail"
                className="w-full h-[320px] sm:h-[400px] object-cover object-center group-hover:scale-[1.04] transition-transform duration-[900ms] ease-out"
                loading="lazy"
              />

              {/* Gradient scrim — stronger at bottom for legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none" />

              {/* ── Top-right: Star rating badge ── */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="absolute top-4 right-4 flex items-center gap-2 px-3.5 py-2.5 rounded-2xl bg-white/95 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.12)] border border-white/80"
              >
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <div className="h-4 w-px bg-gray-200" />
                <span className="text-sm font-extrabold text-brand-charcoal">4.9</span>
                <span className="text-[11px] text-brand-muted font-medium">(2.4k)</span>
              </motion.div>

              {/* ── Top-left: Open Now pill ── */}


              {/* ── Bottom: Branded identity overlay ── */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.65, duration: 0.5 }}
                className="absolute bottom-0 left-0 right-0 px-5 py-4 bg-gradient-to-r from-brand-burgundy-deep/95 to-brand-burgundy/90 backdrop-blur-md"
              >
                <div className="flex items-center justify-between">
                  {/* Left: Brand name + tagline */}
                  <div>
                    <p className="font-display text-lg font-bold text-white leading-tight tracking-wide">
                      Mall of Irikkur
                    </p>
                    <p className="text-white/55 text-[11px] font-medium tracking-[0.12em] mt-0.5 uppercase">
                      North Malabar's Premier Destination
                    </p>
                  </div>
                  {/* Right: Decorative emblem */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    <div className="w-px h-8 bg-white/20" />
                    <div className="flex flex-col items-center px-3">
                      <span className="text-[10px] text-white/40 font-semibold uppercase tracking-widest">Est.</span>
                      <span className="text-white font-extrabold font-heading text-lg leading-none">2024</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Decorative corner accents */}
            <div className="absolute -top-4 -left-4 w-16 h-16 rounded-2xl border-2 border-brand-burgundy/20 bg-brand-cream -z-10 hidden lg:block" />
            <div className="absolute -bottom-5 -right-5 w-24 h-24 rounded-full bg-brand-burgundy/6 -z-10 hidden lg:block" />
          </motion.div>


          {/* ─ Right: Content Column ─ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="w-full flex flex-col justify-center"
          >
            <h3 className="font-heading text-[18px] sm:text-xl lg:text-2xl font-bold text-brand-charcoal leading-snug mb-3">
              Redefining Commerce{' '}
              <span className="text-brand-burgundy">&amp; Lifestyle</span>{' '}
              in North Malabar
            </h3>

            <p className="text-brand-charcoal/85 text-sm sm:text-base leading-[1.75] mb-3 font-normal">
              Designed as Irikkur's premier shopping, dining, and social
              destination,{' '}
              <strong className="text-brand-burgundy font-semibold">
                Mall of Irikkur
              </strong>{' '}
              unites world-class retail spaces with local entrepreneurship. We
              provide a modern, comfortable, and family-friendly environment for
              visitors of all generations.
            </p>

            <p className="text-brand-muted text-[13px] leading-[1.7] mb-5 font-normal">
              Whether you're shopping for traditional bridal wear, catching up
              over a fresh Malabar coffee, or attending vibrant community
              events — Mall of Irikkur brings everything under one beautiful
              roof.
            </p>

            {/* Highlights checklist */}
            <ul className="space-y-2 mb-6">
              {highlights.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.08, duration: 0.4 }}
                  className="flex items-center gap-2.5 text-sm text-brand-charcoal font-medium"
                >
                  <CheckCircle2 className="w-5 h-5 text-brand-burgundy shrink-0" />
                  {item}
                </motion.li>
              ))}
            </ul>

            {/* CTA Link */}
            <motion.a
              href="#businesses"
              whileHover={{ x: 4 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="inline-flex items-center gap-2 text-brand-burgundy font-bold text-sm uppercase tracking-wider group"
            >
              <span>Explore Our Businesses</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.a>
          </motion.div>
        </div>

        {/* ── Offering Pillars Grid ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-10 sm:mt-14"
        >
          {/* Divider with label */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-brand-burgundy/20" />
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-muted whitespace-nowrap">
              What We Offer
            </span>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-brand-burgundy/20" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + idx * 0.1, duration: 0.5 }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className={`group relative p-4 rounded-2xl bg-gradient-to-br ${pillar.color} border ${pillar.border} hover:shadow-[0_12px_40px_rgba(128,20,43,0.1)] transition-all duration-300 cursor-default`}
                >
                  {/* Icon */}
                  <div
                    className={`w-9 h-9 rounded-xl ${pillar.iconBg} flex items-center justify-center mb-3 shadow-md group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  {/* Text */}
                  <h4 className="font-bold text-brand-charcoal text-[15px] mb-1.5 leading-tight">
                    {pillar.title}
                  </h4>
                  <p className="text-brand-muted text-[13px] leading-relaxed">
                    {pillar.desc}
                  </p>
                  {/* Subtle corner glow on hover */}
                  <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-brand-burgundy/0 group-hover:ring-brand-burgundy/15 transition-all duration-300 pointer-events-none" />
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* ── Stats Bar ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-8 sm:mt-10 rounded-2xl bg-brand-burgundy overflow-hidden"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/10 divide-y lg:divide-y-0">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + idx * 0.1, duration: 0.5 }}
                className="flex flex-col items-center justify-center py-7 px-4 group hover:bg-white/5 transition-colors duration-300"
              >
                <span className="font-heading text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-none mb-1">
                  {stat.value}
                </span>
                <span className="text-white/90 font-semibold text-sm mt-1">
                  {stat.label}
                </span>
                <span className="text-white/45 text-xs font-medium mt-0.5 tracking-wide">
                  {stat.sub}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}

import React from 'react';
import { motion } from 'framer-motion';
import { Camera } from 'lucide-react';
import Gallery from './Gallery';

export default function Memories() {
  return (
    <section
      id="memories"
      className="py-16 sm:py-24 scroll-mt-20 md:scroll-mt-24 text-brand-charcoal relative overflow-hidden"
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

      {/* ── Unique Sweeping Contour Wave Lines (Same type of curved stripe on old background) ── */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-80 sm:opacity-90"
        viewBox="0 0 1440 900"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <g strokeLinecap="round">
          {/* Sweeping primary contour stream */}
          <path d="M-100 120 C 300 40, 750 320, 1540 140" stroke="url(#mem-gold-grad)" strokeWidth="1.5" />
          <path d="M-100 180 C 320 100, 770 370, 1540 200" stroke="url(#mem-burgundy-grad)" strokeWidth="1.3" />
          <path d="M-100 240 C 340 160, 790 420, 1540 260" stroke="#80142B" strokeWidth="1" strokeOpacity="0.14" />
          <path d="M-100 300 C 360 220, 810 470, 1540 320" stroke="url(#mem-burgundy-grad)" strokeWidth="1.3" />
          <path d="M-100 360 C 380 280, 830 520, 1540 380" stroke="url(#mem-gold-grad)" strokeWidth="1.6" />
          <path d="M-100 420 C 400 340, 850 570, 1540 440" stroke="#80142B" strokeWidth="1" strokeOpacity="0.12" />
          <path d="M-100 480 C 420 400, 870 620, 1540 500" stroke="url(#mem-burgundy-grad)" strokeWidth="1.4" />
          <path d="M-100 540 C 440 460, 890 670, 1540 560" stroke="url(#mem-gold-grad)" strokeWidth="1.5" />
          <path d="M-100 600 C 460 520, 910 720, 1540 620" stroke="#80142B" strokeWidth="1" strokeOpacity="0.14" />
          <path d="M-100 660 C 480 580, 930 770, 1540 680" stroke="url(#mem-burgundy-grad)" strokeWidth="1.3" />
          <path d="M-100 720 C 500 640, 950 820, 1540 740" stroke="url(#mem-gold-grad)" strokeWidth="1.5" />
          <path d="M-100 780 C 520 700, 970 870, 1540 800" stroke="#80142B" strokeWidth="1" strokeOpacity="0.12" />
          <path d="M-100 840 C 540 760, 990 920, 1540 860" stroke="url(#mem-burgundy-grad)" strokeWidth="1.3" />

          {/* Counter-flowing harmonic resonance curves */}
          <path d="M-100 70 C 420 230, 980 40, 1540 260" stroke="url(#mem-gold-grad)" strokeWidth="1.3" strokeDasharray="6 8" />
          <path d="M-100 340 C 520 540, 1080 230, 1540 500" stroke="url(#mem-burgundy-grad)" strokeWidth="1.3" />
          <path d="M-100 590 C 570 790, 1120 430, 1540 730" stroke="url(#mem-gold-grad)" strokeWidth="1.3" strokeDasharray="4 6" />
        </g>
        <defs>
          <linearGradient id="mem-gold-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#b45309" stopOpacity="0.08" />
            <stop offset="30%" stopColor="#d97706" stopOpacity="0.3" />
            <stop offset="70%" stopColor="#b45309" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#92400e" stopOpacity="0.08" />
          </linearGradient>
          <linearGradient id="mem-burgundy-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#5E0D1E" stopOpacity="0.08" />
            <stop offset="40%" stopColor="#80142B" stopOpacity="0.26" />
            <stop offset="80%" stopColor="#9E1B38" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#5E0D1E" stopOpacity="0.08" />
          </linearGradient>
        </defs>
      </svg>

      {/* ── Ambient Glows ── */}
      <div
        aria-hidden="true"
        className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full bg-brand-burgundy/[0.03] blur-[140px] pointer-events-none -translate-y-1/2"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-1/4 w-[450px] h-[450px] rounded-full bg-brand-gold/[0.06] blur-[120px] pointer-events-none translate-y-1/2"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ─── Centered Section Header ─── */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          {/* Branded Eyebrow Pill */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-brand-burgundy/10 border border-brand-burgundy/15 text-brand-burgundy text-xs sm:text-sm font-bold uppercase tracking-widest mb-4 shadow-sm"
          >
            <Camera className="w-4 h-4 text-brand-burgundy" />
            <span>Memories &amp; Moments</span>
          </motion.div>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-brand-charcoal font-heading tracking-tight mb-4"
          >
            <span className="text-brand-burgundy">Moments</span> at Mall of Irikkur
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

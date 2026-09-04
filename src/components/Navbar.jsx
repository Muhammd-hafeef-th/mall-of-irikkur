import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, X } from 'lucide-react';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Founder', href: '#founder' },
  { name: 'Businesses', href: '#businesses' },
  { name: 'Memories', href: '#memories' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('#home');

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const goto = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    setActive(href);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      {/* ════════════════════════════════
          HEADER
      ════════════════════════════════ */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.06)] border-b border-gray-100 py-3'
            : 'bg-gradient-to-b from-black/70 to-transparent backdrop-blur-sm py-4'
          }`}
      >
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 flex items-center justify-between gap-6">

          {/* ── Brand / Logo ── */}
          <a
            href="#home"
            onClick={(e) => goto(e, '#home')}
            className="flex items-center gap-3 flex-shrink-0 group focus:outline-none"
          >
            {/* Logo image */}
            <img
              src="/logo.jpg"
              alt="Mall of Irikkur logo"
              className={`h-9 sm:h-10 w-auto object-contain rounded-lg transition-all duration-300 ${scrolled ? 'ring-1 ring-gray-200' : 'ring-1 ring-white/10 group-hover:ring-white/25'
                }`}
            />
            {/* Brand name */}
            <div className="flex flex-col leading-none">
              <span className={`font-sans text-[15px] sm:text-[16px] leading-none tracking-tight transition-colors duration-300 ${scrolled ? 'text-gray-900' : 'text-white'
                }`}>
                <span className="font-extrabold">Mall </span>
                <span className={`font-light ${scrolled ? 'text-gray-600' : 'opacity-80'}`}>Of </span>
                <span className="font-extrabold">Irikkur</span>
              </span>
              <span className={`font-sans text-[9px] tracking-[0.22em] uppercase mt-[3px] transition-colors duration-300 ${scrolled ? 'text-gray-500' : 'text-white/40'
                }`}>
                Kannur · Kerala
              </span>
            </div>
          </a>

          {/* ── Desktop Nav Links ── */}
          <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1 flex-1 justify-center">
            {navLinks.map((link) => {
              const isActive = active === link.href;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => goto(e, link.href)}
                  className={`relative px-3.5 xl:px-4 py-2 text-[12.5px] xl:text-[13px]
                              font-medium tracking-wide rounded-lg
                              transition-colors duration-200 whitespace-nowrap
                              ${scrolled
                      ? (isActive ? 'text-brand-burgundy font-bold' : 'text-gray-600 hover:text-brand-burgundy')
                      : (isActive ? 'text-white' : 'text-white/60 hover:text-white/95')
                    }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.span
                      layoutId="underline"
                      className={`absolute bottom-1 left-3.5 right-3.5 h-[1.5px] rounded-full ${scrolled ? 'bg-brand-burgundy' : 'bg-white/80'
                        }`}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* ── Desktop CTA ── */}
          <div className="hidden lg:block flex-shrink-0">
            <a
              href="#location"
              onClick={(e) => goto(e, '#location')}
              className={`inline-flex items-center gap-2
                         px-5 py-2.5 rounded-full
                         text-[13px] font-bold tracking-wide
                         transition-all duration-300
                         ${scrolled
                  ? 'bg-brand-burgundy text-white hover:bg-brand-burgundy-light shadow-sm'
                  : 'bg-white text-gray-900 hover:bg-white/90 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:scale-[1.03] active:scale-[0.97]'
                }`}
            >
              <MapPin className="w-3.5 h-3.5" />
              Visit Us
            </a>
          </div>

          {/* ── Bare hamburger icon — adapts to scroll ── */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            className="lg:hidden flex flex-col justify-center items-center
                       w-10 h-10 gap-[5.5px] cursor-pointer
                       focus:outline-none group"
          >
            <span className={`block h-[1.5px] rounded-full origin-center transition-all duration-300 ${scrolled ? 'bg-gray-900' : 'bg-white'
              } ${menuOpen ? 'w-[22px] rotate-45 translate-y-[7px]' : 'w-[22px]'}`} />
            <span className={`block h-[1.5px] rounded-full transition-all duration-300 ${scrolled ? 'bg-gray-500' : 'bg-white/70'
              } ${menuOpen ? 'w-0 opacity-0' : 'w-[16px]'}`} />
            <span className={`block h-[1.5px] rounded-full origin-center transition-all duration-300 ${scrolled ? 'bg-gray-900' : 'bg-white'
              } ${menuOpen ? 'w-[22px] -rotate-45 -translate-y-[7px]' : 'w-[22px]'}`} />
          </button>
        </div>
      </header>

      {/* ════════════════════════════════
          MOBILE FULL-SCREEN MENU
      ════════════════════════════════ */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
              onClick={() => setMenuOpen(false)}
            />

            {/* Slide-in Panel from right */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 260 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-[min(340px,90vw)]
                         bg-brand-burgundy border-l border-brand-burgundy-light/30
                         flex flex-col lg:hidden overflow-hidden"
            >
              {/* Panel top bar */}
              <div className="flex items-center justify-between px-6 pt-5 pb-5
                              border-b border-white/15">
                {/* Logo in panel */}
                <div className="flex items-center gap-3">
                  <img
                    src="/logo.jpg"
                    alt="Mall of Irikkur"
                    className="h-9 w-auto object-contain rounded-lg ring-1 ring-white/20"
                  />
                  <div className="flex flex-col leading-none">
                    <span className="font-sans text-white text-[15px] leading-none tracking-tight">
                      <span className="font-extrabold">Mall </span>
                      <span className="font-light opacity-75">Of </span>
                      <span className="font-extrabold">Irikkur</span>
                    </span>
                    <span className="text-white/50 text-[9px] tracking-[0.2em] uppercase mt-[3px]">
                      Kannur · Kerala
                    </span>
                  </div>
                </div>

                {/* Close button */}
                <button
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close menu"
                  className="w-9 h-9 rounded-full border border-white/20
                             flex items-center justify-center
                             text-white/70 hover:text-white hover:border-white/45
                             transition-all duration-200"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Nav Links */}
              <nav className="flex-1 overflow-y-auto py-4 px-4">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => goto(e, link.href)}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 + i * 0.055, duration: 0.32, ease: 'easeOut' }}
                    className={`group flex items-center gap-3.5
                                px-4 py-3.5 rounded-xl mb-1
                                transition-all duration-200
                                ${active === link.href
                        ? 'bg-white/15 text-white'
                        : 'text-white/65 hover:text-white hover:bg-white/10'
                      }`}
                  >
                    {/* Active dot */}
                    <span
                      className={`w-1.5 h-1.5 rounded-full flex-shrink-0 transition-all duration-200
                                  ${active === link.href ? 'bg-white' : 'bg-white/35'}`}
                    />
                    <span className="font-sans font-medium text-[15px] tracking-wide">
                      {link.name}
                    </span>
                  </motion.a>
                ))}
              </nav>

              {/* Panel Footer CTA */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.3 }}
                className="px-6 pb-8 pt-4 border-t border-white/15"
              >
                <a
                  href="#location"
                  onClick={(e) => goto(e, '#location')}
                  className="w-full flex items-center justify-center gap-2.5
                             py-3.5 rounded-2xl
                             bg-white text-brand-burgundy
                             font-sans font-bold text-sm tracking-wide
                             hover:bg-white/95 active:scale-[0.98]
                             transition-all duration-300
                             shadow-[0_4px_20px_rgba(0,0,0,0.2)]"
                >
                  <MapPin className="w-4 h-4" />
                  Get Directions
                </a>

                <p className="text-center text-white/35 text-[10px] tracking-widest
                              uppercase mt-4">
                  Irikkur · Kannur · Kerala
                </p>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

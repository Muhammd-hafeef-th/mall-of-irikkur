import React from 'react';
import { Instagram, Facebook, Youtube, MessageCircle, MapPin, Phone, Mail, Clock } from 'lucide-react';
import Logo from './Logo';

export default function Footer() {
  const handleScrollTo = (e, targetId) => {
    e.preventDefault();
    const elem = document.querySelector(targetId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gradient-to-b from-brand-burgundy-deep to-[#22040a] text-white relative overflow-hidden border-t border-white/10">
      {/* Subtle Ambient Light Glow */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        {/* ─── Row 1: Brand Logo + Horizontal Nav + Socials ─── */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 pb-8 border-b border-white/10">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Logo variant="light" size="medium" showTagline={true} />
          </div>

          {/* Quick Nav Links */}
          <nav className="flex flex-wrap items-center justify-center gap-x-6 sm:gap-x-8 gap-y-2 text-xs sm:text-sm font-medium text-white/80">
            {[
              { name: 'Home', href: '#home' },
              { name: 'About', href: '#about' },
              { name: 'Founder', href: '#founder' },
              { name: 'Stores', href: '#businesses' },
              { name: 'Memories', href: '#memories' },
              { name: 'Contact', href: '#contact' },
            ].map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleScrollTo(e, link.href)}
                className="hover:text-white hover:text-brand-gold transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Social Icons */}
          <div className="flex items-center gap-2.5">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-white/5 hover:bg-brand-burgundy border border-white/10 text-white/80 hover:text-white transition-all duration-300 shadow-sm hover:scale-105"
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-white/5 hover:bg-brand-burgundy border border-white/10 text-white/80 hover:text-white transition-all duration-300 shadow-sm hover:scale-105"
              aria-label="Facebook"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-white/5 hover:bg-brand-burgundy border border-white/10 text-white/80 hover:text-white transition-all duration-300 shadow-sm hover:scale-105"
              aria-label="YouTube"
            >
              <Youtube className="w-4 h-4" />
            </a>
            <a
              href="https://wa.me/919847012345"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-white/5 hover:bg-emerald-600 border border-white/10 text-white/80 hover:text-white transition-all duration-300 shadow-sm hover:scale-105"
              aria-label="WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* ─── Row 2: Essential Wanted Info Pill Row ─── */}
        <div className="py-6 flex flex-wrap items-center justify-center lg:justify-between gap-y-3 gap-x-8 text-xs text-white/70">
          {/* Timing */}
          <div className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-brand-gold shrink-0" />
            <span>Mon - Sun: 9:00 AM - 10:00 PM</span>
          </div>

          {/* Location */}
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-brand-gold shrink-0" />
            <span>Main Commercial Road, Irikkur, Kannur, Kerala - 670593</span>
          </div>

          {/* Phone */}
          <div className="flex items-center gap-2">
            <Phone className="w-3.5 h-3.5 text-brand-gold shrink-0" />
            <a href="tel:+919847012345" className="hover:text-white hover:underline transition-colors">
              +91 98470 12345
            </a>
          </div>

          {/* Email */}
          <div className="flex items-center gap-2">
            <Mail className="w-3.5 h-3.5 text-brand-gold shrink-0" />
            <a href="mailto:info@mallofirikkur.com" className="hover:text-white hover:underline transition-colors">
              info@mallofirikkur.com
            </a>
          </div>
        </div>

        {/* ─── Row 3: Minimal Copyright & Pride line ─── */}
        <div className="pt-5 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-white/50">
          <p>© {new Date().getFullYear()} Mall of Irikkur. All Rights Reserved.</p>
          <p>
            Kannur's Premier Shopping &amp; Lifestyle Destination
          </p>
        </div>
      </div>
    </footer>
  );
}

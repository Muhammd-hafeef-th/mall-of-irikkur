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
    <footer className="bg-brand-burgundy-deep text-white pt-20 pb-10 border-t border-brand-burgundy-light/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-16 border-b border-white/10">
          
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-4 space-y-5">
            <Logo variant="light" size="large" showTagline={true} />
            
            <p className="text-sm text-white/80 leading-relaxed font-normal max-w-sm pt-2">
              Mall of Irikkur is the premier shopping, dining, commercial, and lifestyle destination located in Irikkur, Kannur, Kerala. Bringing businesses, experiences, and community together.
            </p>

            {/* Social Icons */}
            <div className="pt-2">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-300 block mb-3">
                Connect With Us
              </span>
              <div className="flex items-center gap-3">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-white/10 hover:bg-brand-burgundy-light text-white transition-all duration-300 transform hover:-translate-y-1 shadow-md"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>

                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-white/10 hover:bg-brand-burgundy-light text-white transition-all duration-300 transform hover:-translate-y-1 shadow-md"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>

                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-white/10 hover:bg-brand-burgundy-light text-white transition-all duration-300 transform hover:-translate-y-1 shadow-md"
                  aria-label="YouTube"
                >
                  <Youtube className="w-5 h-5" />
                </a>

                <a
                  href="https://wa.me/919847012345"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-white/10 hover:bg-emerald-600 text-white transition-all duration-300 transform hover:-translate-y-1 shadow-md"
                  aria-label="WhatsApp"
                >
                  <MessageCircle className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-base font-bold font-heading text-white tracking-wider uppercase border-b border-white/15 pb-2">
              Mall Navigation
            </h4>
            <ul className="space-y-2.5 text-sm text-white/80 font-medium">
              <li>
                <a href="#home" onClick={(e) => handleScrollTo(e, '#home')} className="hover:text-white hover:underline transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" onClick={(e) => handleScrollTo(e, '#about')} className="hover:text-white hover:underline transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#founder" onClick={(e) => handleScrollTo(e, '#founder')} className="hover:text-white hover:underline transition-colors">
                  Founder Vision
                </a>
              </li>
              <li>
                <a href="#businesses" onClick={(e) => handleScrollTo(e, '#businesses')} className="hover:text-white hover:underline transition-colors">
                  Businesses & Brands
                </a>
              </li>
              <li>
                <a href="#memories" onClick={(e) => handleScrollTo(e, '#memories')} className="hover:text-white hover:underline transition-colors">
                  Memories & Gallery
                </a>
              </li>
              <li>
                <a href="#events" onClick={(e) => handleScrollTo(e, '#events')} className="hover:text-white hover:underline transition-colors">
                  Events & Programs
                </a>
              </li>
              <li>
                <a href="#contact" onClick={(e) => handleScrollTo(e, '#contact')} className="hover:text-white hover:underline transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Visitor Information */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-base font-bold font-heading text-white tracking-wider uppercase border-b border-white/15 pb-2">
              Visitor Information
            </h4>
            <ul className="space-y-3 text-sm text-white/80 font-normal">
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block">Opening Hours</span>
                  <span>Mon - Sun: 9:00 AM - 10:00 PM</span>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block">Location</span>
                  <span>Irikkur, Kannur, Kerala - 670593</span>
                </div>
              </li>
              <li className="pt-2">
                <span className="font-bold text-white block mb-1">Facilities</span>
                <p className="text-xs text-white/70 leading-relaxed">
                  Ample Underground Parking • Central Air Conditioning • Food Court • Elevator Access • Wheelchair Friendly • Prayer Room
                </p>
              </li>
            </ul>
          </div>

          {/* Col 4: Direct Contact */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-base font-bold font-heading text-white tracking-wider uppercase border-b border-white/15 pb-2">
              Direct Contact
            </h4>
            <div className="space-y-3 text-sm text-white/80 font-normal">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
                <span>Mall of Irikkur, Main Commercial Road, Irikkur, Kannur, Kerala, India</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-300 shrink-0" />
                <a href="tel:+919847012345" className="hover:text-white hover:underline">
                  +91 98470 12345
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-300 shrink-0" />
                <a href="mailto:info@mallofirikkur.com" className="hover:text-white hover:underline">
                  info@mallofirikkur.com
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <p>© 2026 Mall of Irikkur. All Rights Reserved.</p>
          <p className="font-semibold text-white/80">
            Made with pride in <span className="text-amber-300 font-bold">Irikkur, Kerala</span>.
          </p>
        </div>

      </div>
    </footer>
  );
}

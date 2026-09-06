import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, MessageSquare, ArrowRight } from 'lucide-react';

export default function ContactCTA() {
  const handleScrollTo = (e, targetId) => {
    e.preventDefault();
    const elem = document.querySelector(targetId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-brand-burgundy via-brand-burgundy-dark to-brand-burgundy-deep text-white relative overflow-hidden">
      
      {/* Background Decorative Ripples */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-white/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold uppercase tracking-widest text-white/90 mb-6 shadow-sm"
        >
          <MessageSquare className="w-3.5 h-3.5 text-amber-300" />
          <span>VISITOR EXPERIENCE</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl sm:text-6xl font-extrabold text-white font-heading tracking-tight mb-4"
        >
          Planning a Visit?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-xl sm:text-2xl text-white/90 font-light max-w-2xl mx-auto mb-10 text-balance"
        >
          We look forward to welcoming you to Mall of Irikkur.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto"
        >
          <a
            href="https://maps.google.com/?q=Irikkur+Kannur+Kerala"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl font-bold text-base bg-white text-brand-burgundy hover:bg-brand-cream hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-0.5 shadow-xl active:scale-95"
          >
            <MapPin className="w-5 h-5 text-brand-burgundy" />
            <span>Get Directions</span>
          </a>

          <a
            href="tel:+919847012345"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl font-bold text-base bg-transparent text-white border-2 border-white/80 hover:bg-white/10 hover:border-white transition-all duration-300 active:scale-95"
          >
            <Phone className="w-5 h-5 text-white" />
            <span>Contact Us</span>
          </a>
        </motion.div>

      </div>
    </section>
  );
}

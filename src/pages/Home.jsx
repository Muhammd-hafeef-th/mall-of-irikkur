import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Founder from '../components/Founder';
import Businesses from '../components/Businesses';
import Memories from '../components/Memories';
import Location from '../components/Location';
import ContactCTA from '../components/ContactCTA';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-brand-charcoal overflow-x-hidden font-sans selection:bg-brand-burgundy selection:text-white">
      {/* 1. Sticky Navigation Bar */}
      <Navbar />

      {/* 2. Hero Section (BURGUNDY) */}
      <Hero />

      {/* 3. About Mall of Irikkur Section (WHITE) */}
      <About />

      {/* 4. Founder Section (LIGHT) */}


      {/* 5 & 6. Businesses & Featured Brand Section (BURGUNDY) */}
      <Businesses />


      {/* 7. Memories / Gallery Section (WHITE) */}
      <Memories />

      <Founder />

      {/* 10. Location + Interactive Google Map Section (WHITE) */}
      <Location />

      {/* 11. Contact CTA Section (BURGUNDY) */}
      <ContactCTA />

      {/* 12. Footer Section (DEEP BURGUNDY) */}
      <Footer />
    </div>
  );
}

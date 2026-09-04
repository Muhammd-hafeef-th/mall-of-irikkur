import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Navigation, ExternalLink, ShieldCheck } from 'lucide-react';

export default function Location() {
  const mapEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3903.0185984407865!2d75.56230587484643!3d11.968603688265057!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba439162fa9c669%3A0x6b63d0c9fbb24141!2sIrikkur%2C%20Kerala!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin";
  const googleMapsDirectionsUrl = "https://maps.google.com/?q=Irikkur+Kannur+Kerala";

  return (
    <section
      id="location"
      className="py-24 text-brand-charcoal relative overflow-hidden"
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

      {/* Background ambient accents */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-brand-gold/[0.06] rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-brand-burgundy/[0.03] rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-brand-cream border border-brand-burgundy/15 text-brand-burgundy text-xs sm:text-sm font-bold uppercase tracking-wider mb-4 shadow-sm"
          >
            <MapPin className="w-4 h-4 text-brand-burgundy" />
            <span>LOCATION &amp; VISITOR GUIDE</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-brand-burgundy font-heading tracking-tight mb-4"
          >
            <span className="text-brand-charcoal">Find Us</span> in Irikkur
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg lg:text-xl text-brand-muted font-normal text-balance leading-relaxed"
          >
            Visit Mall of Irikkur and experience the destination for yourself.
          </motion.p>
        </div>

        {/* Two-Column Location Details & Interactive Google Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left Column: Contact Cards & Address */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="p-8 rounded-3xl bg-brand-cream-light border border-brand-burgundy/15 shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-2xl bg-brand-burgundy text-white">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold font-heading text-brand-burgundy">
                    Mall of Irikkur
                  </h3>
                  <p className="text-sm font-semibold text-brand-muted">
                    Irikkur, Kannur, Kerala, India
                  </p>
                </div>
              </div>

              {/* Info Rows */}
              <div className="space-y-4 text-sm text-brand-charcoal">

                {/* Physical Address */}
                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-brand-burgundy/10">
                  <MapPin className="w-5 h-5 text-brand-burgundy shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-brand-burgundy block text-xs uppercase tracking-wider">Address</span>
                    <span className="font-medium">Main Commercial Road, Irikkur Town, Kannur District, Kerala - 670593</span>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-brand-burgundy/10">
                  <Phone className="w-5 h-5 text-brand-burgundy shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-brand-burgundy block text-xs uppercase tracking-wider">Phone Enquiries</span>
                    <a href="tel:+919847012345" className="font-semibold text-brand-burgundy hover:underline">
                      +91 98470 12345 / +91 490 2400123
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-brand-burgundy/10">
                  <Mail className="w-5 h-5 text-brand-burgundy shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-brand-burgundy block text-xs uppercase tracking-wider">Email Address</span>
                    <a href="mailto:info@mallofirikkur.com" className="font-semibold text-brand-burgundy hover:underline">
                      info@mallofirikkur.com
                    </a>
                  </div>
                </div>

                {/* Opening Hours */}
                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-brand-burgundy/10">
                  <Clock className="w-5 h-5 text-brand-burgundy shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-brand-burgundy block text-xs uppercase tracking-wider">Opening Hours</span>
                    <span className="font-medium block">Supermarket: 8:30 AM - 10:00 PM</span>
                    <span className="font-medium block">Retail & Mall: 10:00 AM - 9:30 PM</span>
                    <span className="font-medium block">Food Court: 11:00 AM - 10:30 PM</span>
                  </div>
                </div>

              </div>

              {/* Get Directions Button */}
              <div className="mt-8 pt-4">
                <a
                  href={googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold text-base bg-brand-burgundy text-white hover:bg-brand-burgundy-dark hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  <Navigation className="w-5 h-5" />
                  <span>Get Directions on Google Maps</span>
                  <ExternalLink className="w-4 h-4 ml-1 opacity-80" />
                </a>
              </div>

            </div>
          </motion.div>

          {/* Right Column: Embedded Interactive Google Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-7"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-brand-cream bg-brand-cream h-[450px] sm:h-[540px]">
              <iframe
                title="Mall of Irikkur Google Maps Location"
                src={mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full filter saturate-[1.1]"
              />

              {/* Map Floating Header Badge */}
              <div className="absolute top-4 left-4 p-3 rounded-2xl bg-white/90 backdrop-blur-md shadow-lg border border-brand-burgundy/10 hidden sm:flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <span className="text-xs font-bold text-brand-burgundy">Official Destination Pin • Irikkur, Kannur</span>
              </div>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}

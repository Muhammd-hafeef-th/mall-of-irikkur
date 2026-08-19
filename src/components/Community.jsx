import React from 'react';
import { motion } from 'framer-motion';
import { Users, Compass, PartyPopper, Heart } from 'lucide-react';

const featureBlocks = [
  {
    icon: Users,
    title: 'Connect',
    description: 'Bringing people, families, and regional communities together in a welcoming social sanctuary.'
  },
  {
    icon: Compass,
    title: 'Discover',
    description: 'Creating vibrant opportunities to explore new businesses, artisanal brands, and local flavors.'
  },
  {
    icon: PartyPopper,
    title: 'Celebrate',
    description: 'Honoring festivals, cultural celebrations, and special personal moments with joy and pride.'
  }
];

export default function Community() {
  return (
    <section id="community" className="py-24 bg-brand-burgundy text-white relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-burgundy-light/20 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-bold uppercase tracking-wider mb-4"
          >
            <Heart className="w-3.5 h-3.5 text-pink-300" />
            <span>COMMUNITY HEARTBEAT</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold text-white font-heading tracking-tight mb-4"
          >
            More Than a Mall
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-white/90 font-normal text-balance"
          >
            A place where people meet, businesses grow and memories are made.
          </motion.p>
        </div>

        {/* Feature Image Banner + 3 Pillars Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          
          {/* Left Column: Community Showcase Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/20 group">
              <img
                src="https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1000&auto=format&fit=crop"
                alt="Community Gathering at Mall of Irikkur"
                className="w-full h-[400px] sm:h-[480px] object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-burgundy-deep/80 via-transparent to-transparent opacity-80" />
              
              <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl bg-brand-burgundy-deep/90 backdrop-blur-md border border-white/20 shadow-xl">
                <span className="text-xs font-bold uppercase tracking-widest text-amber-300 block mb-1">
                  Rooted in Irikkur
                </span>
                <h4 className="text-xl font-bold text-white font-heading leading-snug">
                  Proudly serving the people of Kannur & Malabar with warmth and hospitality.
                </h4>
              </div>
            </div>
          </motion.div>

          {/* Right Column: 3 Pillar Feature Cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-6 space-y-6"
          >
            {featureBlocks.map((block, idx) => {
              const IconComponent = block.icon;
              return (
                <div
                  key={block.title}
                  className="p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 hover:bg-white/15 transition-all duration-300 flex items-start gap-5 shadow-lg group"
                >
                  <div className="p-3.5 rounded-2xl bg-white text-brand-burgundy shrink-0 group-hover:scale-110 transition-transform shadow-md">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold font-heading text-white mb-1">
                      {block.title}
                    </h3>
                    <p className="text-sm text-white/80 leading-relaxed font-normal">
                      {block.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </motion.div>

        </div>

      </div>
    </section>
  );
}

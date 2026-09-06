import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 28,
    restDelta: 0.001
  });

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-[3.5px] bg-black/10 pointer-events-none">
      <motion.div
        style={{ scaleX, transformOrigin: '0%' }}
        className="h-full w-full bg-gradient-to-r from-amber-400 via-brand-burgundy-light to-amber-500 shadow-[0_0_12px_rgba(245,158,11,0.6)]"
      />
    </div>
  );
}

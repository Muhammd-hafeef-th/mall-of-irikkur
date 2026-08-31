import React from 'react';

/**
 * Mall of Irikkur Logo Component
 * Reproduces the visual identity from the official brand logo:
 * - Deep burgundy option / light mode / dark mode adaptability
 * - Wavy 3-tier ribbon symbol (Pink/Coral, Teal, Gold)
 * - Clean sans-serif typography "Mall Of Irikkur"
 */
export default function Logo({
  variant = 'light', // 'light' (white text for burgundy bg), 'dark' (burgundy text for light bg), 'full' (with burgundy background box)
  size = 'medium',   // 'small', 'medium', 'large'
  showTagline = false
}) {
  const sizeClasses = {
    small: 'h-8 text-lg',
    medium: 'h-10 text-xl md:text-2xl',
    large: 'h-14 text-2xl md:text-3xl'
  };

  const isDarkText = variant === 'dark';

  return (
    <div className="flex items-center gap-3 select-none group cursor-pointer">
      {/* Icon Mark (3 Ribbon Waves) */}
      <div className={`relative flex items-center justify-center transition-transform duration-300 group-hover:scale-105 ${variant === 'full' ? 'p-2 rounded-xl bg-brand-burgundy shadow-md' : ''}`}>
        <a
          href="#home"
          onClick={(e) => goto(e, '#home')}
          className="flex items-center gap-3 flex-shrink-0 group focus:outline-none"
        />
        {/* Logo image */}
        <img
          src="/logo.jpg"
          alt="Mall of Irikkur logo"
          className="h-9 sm:h-10 w-auto object-contain rounded-lg
                         ring-1 ring-white/10 group-hover:ring-white/25
                         transition-all duration-300"
        />
      </div>

      {/* Typography */}
      <div className="flex flex-col leading-none">
        <span className={`font-extrabold tracking-tight font-heading ${sizeClasses[size]} ${isDarkText ? 'text-brand-burgundy' : 'text-white'}`}>
          Mall <span className="font-light opacity-90">Of</span> Irikkur
        </span>
        {showTagline && (
          <span className={`text-[10px] tracking-widest uppercase font-semibold mt-0.5 ${isDarkText ? 'text-brand-muted' : 'text-white/70'}`}>
            Kannur • Kerala
          </span>
        )}
      </div>
    </div>
  );
}

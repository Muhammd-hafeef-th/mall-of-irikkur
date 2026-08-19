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
        <svg 
          className={size === 'small' ? 'w-8 h-8' : size === 'large' ? 'w-12 h-12' : 'w-10 h-10'} 
          viewBox="0 0 100 90" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Top Ribbon (Pink/Coral) */}
          <path 
            d="M 5,20 C 20,8 38,32 55,20 C 72,8 88,32 95,20 L 95,36 C 88,48 72,24 55,36 C 38,48 20,24 5,36 Z" 
            fill="#FF4B6E" 
          />
          {/* Middle Ribbon (Teal) */}
          <path 
            d="M 5,42 C 20,30 38,54 55,42 C 72,30 88,54 95,42 L 95,58 C 88,70 72,46 55,58 C 38,70 20,46 5,58 Z" 
            fill="#2EC4B6" 
          />
          {/* Bottom Ribbon (Golden Yellow) */}
          <path 
            d="M 5,64 C 20,52 38,76 55,64 C 72,52 88,76 95,64 L 95,80 C 88,92 72,68 55,80 C 38,92 20,68 5,80 Z" 
            fill="#FFB703" 
          />
        </svg>
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

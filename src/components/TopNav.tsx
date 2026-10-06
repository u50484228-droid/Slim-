import React from 'react';
import { ArrowRight } from 'lucide-react';

interface TopNavProps {
  onScrollTo: (id: string) => void;
}

export const TopNav: React.FC<TopNavProps> = ({ onScrollTo }) => {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 text-slate-900 select-none shadow-xs">
      <div className="max-w-6xl mx-auto px-3 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-2">
        
        {/* Brand Logo (Matching Image 1: SODASLIM®) */}
        <div 
          onClick={() => onScrollTo('top')}
          className="flex items-center gap-0.5 sm:gap-1 cursor-pointer group shrink-0"
        >
          <span className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-[#0f2440] font-sans">
            SODA<span className="text-[#e59819]">SLIM</span>
          </span>
          <span className="text-[9px] sm:text-[10px] font-black text-[#0f2440] self-start mt-0.5 sm:mt-1">®</span>
        </div>

        {/* Desktop Links (Matching Image 1) */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-xs lg:text-sm font-semibold text-slate-700">
          <button
            type="button"
            onClick={() => onScrollTo('ingredients')}
            className="hover:text-[#e59819] transition cursor-pointer"
          >
            Ingredients
          </button>
          <button
            type="button"
            onClick={() => onScrollTo('pricing')}
            className="hover:text-[#e59819] transition cursor-pointer"
          >
            Pricing
          </button>
          <button
            type="button"
            onClick={() => onScrollTo('faq')}
            className="hover:text-[#e59819] transition cursor-pointer"
          >
            FAQ
          </button>
          <button
            type="button"
            onClick={() => onScrollTo('references')}
            className="hover:text-[#e59819] transition cursor-pointer"
          >
            References
          </button>
        </nav>

        {/* CTA Button (Matching Image 1: Order Now pill) */}
        <div className="shrink-0">
          <button
            type="button"
            onClick={() => onScrollTo('pricing')}
            className="h-9 px-3.5 sm:h-11 sm:px-6 rounded-full font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-[#193b68] via-[#204975] to-[#e59819] hover:opacity-95 shadow-md shadow-blue-900/20 active:scale-95 transition cursor-pointer flex items-center gap-1.5"
          >
            <span>Order Now</span>
          </button>
        </div>

      </div>
    </header>
  );
};

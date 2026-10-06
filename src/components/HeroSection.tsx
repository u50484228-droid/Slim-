import React from 'react';
import { Check, Star } from 'lucide-react';
import { BOTTLE_IMAGES } from './BottleSvgDefs';
import { recordClick } from '../utils/analytics';

interface HeroSectionProps {
  onScrollToPricing: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onScrollToPricing }) => {
  return (
    <section className="bg-white text-slate-900 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column (Matching Image 1) */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-7">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-[#0d223c] leading-[1.2] tracking-tight">
              A Breakthrough Five-Ingredient Solution That Supports Healthy Metabolism, Craving Control &amp; Steady Energy
            </h1>

            {/* Circular Badges Row (Matching Image 1) */}
            <div className="grid grid-cols-5 gap-1.5 sm:flex sm:flex-wrap items-center sm:gap-3 md:gap-4 py-1">
              <div className="w-full aspect-square max-w-[70px] sm:w-[68px] sm:h-[68px] md:w-[74px] md:h-[74px] rounded-full border border-slate-300 bg-white shadow-xs flex flex-col items-center justify-center p-1 text-center mx-auto">
                <span className="text-[8.5px] sm:text-[10px] font-black text-slate-800 leading-tight">GMP</span>
                <span className="text-[6.5px] sm:text-[7.5px] font-bold text-slate-500 uppercase leading-tight">CERTIFIED<br/>PRACTICE</span>
              </div>

              <div className="w-full aspect-square max-w-[70px] sm:w-[68px] sm:h-[68px] md:w-[74px] md:h-[74px] rounded-full border border-slate-300 bg-white shadow-xs flex flex-col items-center justify-center p-1 text-center mx-auto">
                <span className="text-[8.5px] sm:text-[10px] font-black text-slate-800 leading-tight">100%</span>
                <span className="text-[6.5px] sm:text-[7.5px] font-bold text-slate-500 uppercase leading-tight">NATURAL<br/>BOTANICALS</span>
              </div>

              <div className="w-full aspect-square max-w-[70px] sm:w-[68px] sm:h-[68px] md:w-[74px] md:h-[74px] rounded-full border border-slate-300 bg-white shadow-xs flex flex-col items-center justify-center p-1 text-center mx-auto">
                <span className="text-[7.5px] sm:text-[8.5px] font-black text-slate-800 leading-tight">MADE IN USA</span>
                <span className="text-[6.5px] sm:text-[7.5px] font-bold text-slate-500 uppercase leading-tight">cGMP<br/>FACILITY</span>
              </div>

              <div className="w-full aspect-square max-w-[70px] sm:w-[68px] sm:h-[68px] md:w-[74px] md:h-[74px] rounded-full border border-slate-300 bg-white shadow-xs flex flex-col items-center justify-center p-1 text-center mx-auto">
                <span className="text-[7.5px] sm:text-[8px] font-black text-slate-800 leading-tight">ZERO</span>
                <span className="text-[6.5px] sm:text-[7.5px] font-bold text-slate-500 uppercase leading-tight">PROPRIETARY<br/>BLENDS</span>
              </div>

              <div className="w-full aspect-square max-w-[70px] sm:w-[68px] sm:h-[68px] md:w-[74px] md:h-[74px] rounded-full border border-slate-300 bg-white shadow-xs flex flex-col items-center justify-center p-1 text-center mx-auto">
                <span className="text-[8.5px] sm:text-[10px] font-black text-slate-800 leading-tight">NON</span>
                <span className="text-[7px] sm:text-[8px] font-bold text-slate-500 uppercase leading-tight">GMO</span>
              </div>
            </div>

            {/* CTA Button (Matching Image 1 Pill Button with Product Colors) */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  recordClick('Hero CTA: Claim Your Discounted Bottles', 'cta');
                  onScrollToPricing();
                }}
                className="w-full sm:w-auto max-w-full sm:min-w-[300px] h-[52px] sm:h-[58px] px-6 sm:px-8 rounded-full font-black text-sm sm:text-base md:text-lg text-white bg-gradient-to-r from-[#193b68] via-[#204975] to-[#e59819] hover:opacity-95 active:scale-[0.99] transition shadow-lg shadow-blue-900/25 cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Claim Your Discounted Bottles</span>
              </button>
            </div>
          </div>

          {/* Right Column (Matching Image 1 Podium & Monstera Plant with SodaSlim Bottle) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[430px] bg-white rounded-3xl p-4 sm:p-6 md:p-8 border border-slate-200/80 shadow-lg flex flex-col items-center justify-center min-h-[300px] sm:min-h-[380px] md:min-h-[420px] overflow-hidden">
              
              {/* Top Floating Badge */}
              <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 bg-white border border-amber-300/80 rounded-full px-2.5 py-0.5 sm:px-3 sm:py-1 flex items-center gap-1 shadow-xs text-[11px] sm:text-xs font-bold text-slate-800">
                <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-500 fill-amber-500" />
                <span>100% Disclosed Formula</span>
              </div>

              {/* Decorative Monstera Plant SVG on Left */}
              <div className="absolute -left-4 bottom-6 pointer-events-none opacity-90 hidden sm:block z-0">
                <svg width="120" height="160" viewBox="0 0 100 140" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 130 C 25 100, 30 70, 50 30" stroke="#2d6a4f" strokeWidth="4" strokeLinecap="round" />
                  <path d="M50 30 C 70 10, 95 35, 80 65 C 65 95, 35 110, 20 120" fill="#40916c" opacity="0.85" />
                  <circle cx="70" cy="45" r="5" fill="#ffffff" />
                  <circle cx="60" cy="65" r="7" fill="#ffffff" />
                </svg>
              </div>

              {/* Product Bottle */}
              <div className="relative z-10 flex flex-col items-center">
                <img
                  src={BOTTLE_IMAGES.single}
                  alt="Official SodaSlim Dietary Supplement Bottle"
                  className="max-h-[250px] sm:max-h-[320px] md:max-h-[380px] w-auto object-contain mix-blend-multiply drop-shadow-[0_15px_25px_rgba(0,0,0,0.18)] hover:scale-105 transition-transform duration-300"
                />

                {/* Round Stone Base Shadow */}
                <div className="w-40 sm:w-52 h-4 sm:h-5 bg-slate-300/30 rounded-[100%] blur-sm -mt-2" />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Full-Width Dark Banner Bar (Matching Bottom of Image 1 / Top of Image 2) */}
      <div className="bg-[#102035] text-white py-4 px-4 sm:px-6 border-y border-amber-500/20">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-around gap-3 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-slate-100">
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-amber-400/20 border border-amber-400 flex items-center justify-center text-amber-300">
              <Check className="w-3.5 h-3.5 stroke-[3]" />
            </span>
            <span>HEALTHY DIGESTIVE &amp; METABOLIC SUPPORT</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-amber-400/20 border border-amber-400 flex items-center justify-center text-amber-300">
              <Check className="w-3.5 h-3.5 stroke-[3]" />
            </span>
            <span>APPETITE &amp; CRAVING CONTROL</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-amber-400/20 border border-amber-400 flex items-center justify-center text-amber-300">
              <Check className="w-3.5 h-3.5 stroke-[3]" />
            </span>
            <span>SUSTAINED METABOLIC ENERGY</span>
          </div>
        </div>
      </div>
    </section>
  );
};

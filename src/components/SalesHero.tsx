import React from 'react';
import { ShieldCheck, Flame, Zap, ClipboardCheck, ArrowDown, Award, CheckCircle2 } from 'lucide-react';
import { BOTTLE_IMAGES } from './BottleSvgDefs';

interface SalesHeroProps {
  onScrollToPricing: () => void;
}

export const SalesHero: React.FC<SalesHeroProps> = ({ onScrollToPricing }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#0b1d33] via-[#102a4a] to-[#0e213b] text-white pt-6 pb-16 px-4 sm:px-6 lg:px-8 border-b border-amber-500/20">
      {/* Decorative background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Press Release / Media Tag */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-6 border-b border-white/10 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-black tracking-widest text-amber-400 uppercase bg-amber-400/10 px-2.5 py-1 rounded border border-amber-400/20">
              TS NEWSWIRE
            </span>
            <span className="text-slate-300 font-medium">
              Commercial Market Release &amp; Editorial Review
            </span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Updated for 2025/2026 Batch</span>
          </div>
        </div>

        {/* Main Title & Subtitle */}
        <div className="text-center max-w-4xl mx-auto mb-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight mb-4">
            Soda Slim Reviews:{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-200 to-yellow-400">
              Five-Ingredient Weight Management Capsule
            </span>{' '}
            Enters Commercial Market
          </h1>
          <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-3xl mx-auto font-normal">
            A once-daily dietary supplement manufactured in the United States with every active milligram individually disclosed on the label. Zero proprietary blends, backed by a 60-day money-back guarantee.
          </p>
        </div>

        {/* Hero Banner Grid (Image 1 replica & value proposition) */}
        <div className="bg-gradient-to-br from-[#132c4d] to-[#0d1e35] rounded-3xl p-6 sm:p-10 border border-amber-400/30 shadow-[0_20px_50px_rgba(0,0,0,0.5)] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: 3 Pillars & Core Proposition */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="text-xs uppercase tracking-widest font-black text-amber-400 mb-1 flex items-center gap-1.5">
                <span>SODASLIM</span>
                <span className="text-white/40">•</span>
                <span>METABOLIC &amp; APPETITE SUPPORT*</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight">
                Daily support for metabolism, cravings, and <span className="italic text-amber-300 font-serif font-bold">steady energy</span>.
              </h2>
            </div>

            {/* 3 Core Pillars */}
            <div className="space-y-3.5 pt-2">
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-amber-400/40 transition">
                <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center shrink-0 text-amber-300">
                  <Flame className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-white uppercase tracking-wider">
                    CRAVING CONTROL
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 mt-0.5 leading-relaxed">
                    Supports craving control and feelings of satiety between meals.*
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-amber-400/40 transition">
                <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center shrink-0 text-amber-300">
                  <Zap className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-white uppercase tracking-wider">
                    ENERGY FROM FAT
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 mt-0.5 leading-relaxed">
                    Promotes thermogenic energy production and metabolic calorie expenditure.*
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-amber-400/40 transition">
                <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center shrink-0 text-amber-300">
                  <ClipboardCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-white uppercase tracking-wider">
                    WEIGHT MANAGEMENT
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 mt-0.5 leading-relaxed">
                    Helps support sustainable healthy weight management alongside balanced nutrition.*
                  </p>
                </div>
              </div>
            </div>

            {/* Quality Badges */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 border border-white/15 text-xs font-bold text-slate-200">
                🇺🇸 MADE IN USA
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 border border-white/15 text-xs font-bold text-slate-200">
                🌱 NON-GMO
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 border border-white/15 text-xs font-bold text-slate-200">
                🔬 GMP CERTIFIED FACILITY
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-400/20 border border-amber-400/40 text-xs font-bold text-amber-300">
                💊 30 CAPSULES (30-DAY SUPPLY)
              </span>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={onScrollToPricing}
                className="btn-gold flex-1 h-[56px] px-6 rounded-xl font-black text-lg text-slate-950 uppercase tracking-wide flex items-center justify-center gap-2 shadow-xl shadow-amber-500/20 hover:scale-[1.02] active:scale-[0.98] transition cursor-pointer"
              >
                <span>CLAIM YOUR DISCOUNT PACKAGE</span>
                <ArrowDown className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Right Column: Hero Product Image Presentation */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center text-center">
            <div className="relative group p-4">
              {/* Product Glow */}
              <div className="absolute inset-0 bg-amber-500/20 rounded-full blur-2xl group-hover:bg-amber-400/30 transition duration-500" />
              <img
                src={BOTTLE_IMAGES.single}
                alt="SodaSlim Dietary Supplement Bottle"
                className="relative z-10 max-h-[380px] w-auto object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.6)] transform group-hover:scale-105 transition duration-300"
              />
            </div>

            {/* Direct Verification Callout */}
            <div className="mt-4 p-3 bg-white/5 rounded-2xl border border-white/10 max-w-sm w-full">
              <div className="flex items-center justify-center gap-2 text-amber-300 text-xs font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>100% Fully Disclosed Formula</span>
              </div>
              <p className="text-[11px] text-slate-300 mt-1">
                Every milligram printed on the label. Zero hidden blends.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

import React from 'react';
import { Heart, Activity, TrendingUp, ShieldCheck, X, Check } from 'lucide-react';

export const BodyImpactSection: React.FC = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white text-slate-900">
      <div className="max-w-5xl mx-auto space-y-14">
        
        {/* Header (Matching Image 4) */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/80 text-amber-900 text-xs font-bold uppercase tracking-wider mb-3">
            <span className="text-amber-600">🔬</span>
            CLINICALLY DOCUMENTED RESULTS - 100% RESEARCH-BACKED
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            What Happens In Your Body When You Take Soda Slim Every Morning?
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            Backed by published nutritional science and rigorous laboratory verification — here is why thousands of men and women trust <strong className="text-slate-900">Soda Slim™</strong> to ignite their resting metabolism and maintain effortless appetite control.
          </p>
        </div>

        {/* 4 Stat Cards Row (Matching Image 4) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          
          {/* Card 1 */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs flex flex-col justify-between hover:shadow-md transition">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-4xl font-black text-slate-900">94%</span>
                <div className="w-8 h-8 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center">
                  <Heart className="w-4 h-4" />
                </div>
              </div>
              <h3 className="text-sm font-extrabold text-slate-900 leading-tight">
                Crushed Daily Cravings
              </h3>
              <div className="text-[10px] font-black uppercase tracking-wider text-rose-600 mt-0.5">
                FULLNESS LASTS 5+ HOURS
              </div>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Reported freedom from late-night pantry raids and sudden afternoon sugar spikes.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 text-[10.5px] font-bold text-slate-600 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <span>Caffeine + Garcinia HCA</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs flex flex-col justify-between hover:shadow-md transition">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-4xl font-black text-slate-900">89%</span>
                <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center">
                  <Activity className="w-4 h-4" />
                </div>
              </div>
              <h3 className="text-sm font-extrabold text-slate-900 leading-tight">
                Steadier, Calmer Appetite
              </h3>
              <div className="text-[10px] font-black uppercase tracking-wider text-emerald-600 mt-0.5">
                ZERO MID-DAY CRASH
              </div>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Experienced stable digestive satisfaction without the intense cravings of extreme diets.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 text-[10.5px] font-bold text-slate-600 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Green Coffee + Raspberry</span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs flex flex-col justify-between hover:shadow-md transition">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-4xl font-black text-slate-900">3.2x</span>
                <div className="w-8 h-8 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4" />
                </div>
              </div>
              <h3 className="text-sm font-extrabold text-slate-900 leading-tight">
                Metabolic Fat Oxidation
              </h3>
              <div className="text-[10px] font-black uppercase tracking-wider text-amber-600 mt-0.5">
                RESTING CALORIE BURN
              </div>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Elevated resting thermogenesis and cellular lipid mobilization throughout active hours.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 text-[10.5px] font-bold text-slate-600 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-600" />
              <span>High-EGCG Green Tea</span>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs flex flex-col justify-between hover:shadow-md transition">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-4xl font-black text-slate-900">100%</span>
                <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4" />
                </div>
              </div>
              <h3 className="text-sm font-extrabold text-slate-900 leading-tight">
                Label Transparency
              </h3>
              <div className="text-[10px] font-black uppercase tracking-wider text-blue-600 mt-0.5">
                NO PROPRIETARY BLENDS
              </div>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Every single active milligram printed clearly on the Supplement Facts panel.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 text-[10.5px] font-bold text-slate-600 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              <span>Independent cGMP Audited</span>
            </div>
          </div>

        </div>

        {/* The SodaSlim Difference Box (Matching Image 4 Bottom Card) */}
        <div className="rounded-3xl border border-slate-800 bg-[#0d2138] text-white p-6 sm:p-10 shadow-xl overflow-hidden">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-[11px] font-black uppercase tracking-widest text-amber-400">
              REAL DAILY EXPERIENCE
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white mt-1">
              The SodaSlim™ Difference: Feel The Shift From Day 1
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              See what happens when you replace temporary band-aids with clinically dosed botanical synergy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Left: Without SodaSlim (Red) */}
            <div className="bg-red-950/30 border border-red-500/30 rounded-2xl p-5 sm:p-6 space-y-4">
              <div className="flex items-center gap-2 text-red-400 font-extrabold text-sm sm:text-base uppercase tracking-wide">
                <span className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center text-red-400 font-bold">
                  ✕
                </span>
                <span>WITHOUT SODASLIM™</span>
              </div>
              <div className="text-xs text-slate-300 italic">
                The frustrating cycle of cravings and sluggish energy
              </div>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-200">
                <li className="flex items-start gap-2.5">
                  <X className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <span>Painful afternoon energy slumps requiring sugary drinks</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <X className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <span>Ravenous 3 PM snack cravings that overpower willpower</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <X className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <span>Sluggish metabolic rate storing extra calories as stubborn fat</span>
                </li>
              </ul>
            </div>

            {/* Right: With SodaSlim (Green) */}
            <div className="bg-emerald-950/30 border border-emerald-500/30 rounded-2xl p-5 sm:p-6 space-y-4">
              <div className="flex items-center gap-2 text-emerald-400 font-extrabold text-sm sm:text-base uppercase tracking-wide">
                <span className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold">
                  ✓
                </span>
                <span>WITH SODASLIM™</span>
              </div>
              <div className="text-xs text-slate-300 italic">
                Light, energized, and completely in control
              </div>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-200">
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Calm, steady daytime metabolic energy from morning to evening</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Effortless 5+ hour natural satiety with zero snacking desire</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Continuous thermogenic oxidation turning stored fat into usable energy</span>
                </li>
              </ul>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

import React from 'react';
import { ArrowDown, Check, Zap } from 'lucide-react';
import { recordClick } from '../utils/analytics';

interface JourneySectionProps {
  onScrollToPricing: () => void;
}

export const JourneySection: React.FC<JourneySectionProps> = ({ onScrollToPricing }) => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white text-slate-900 border-t border-slate-200">
      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* Header (Matching Image 6) */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/90 text-amber-900 text-xs font-bold uppercase tracking-wider mb-3">
            YOUR 90-DAY JOURNEY
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            What To Expect Week-by-Week
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base">
            Natural botanical synergy works cumulatively. Here is how your body adapts and thrives over 90 days.
          </p>
        </div>

        {/* 4 Phases Grid (Matching Image 6) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Phase 1 */}
          <div className="bg-slate-50/70 rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs flex flex-col justify-between hover:shadow-md transition">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-black bg-[#102a4a] text-white px-3 py-1 rounded-full uppercase tracking-wider">
                  DAYS 1 – 14
                </span>
                <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wider">
                  PHASE 1
                </span>
              </div>
              <h3 className="text-lg font-black text-slate-900">
                Metabolic Ignition &amp; Immediate Appetite Taming
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Caffeine anhydrous and green tea polyphenols start mobilizing daytime calorie burn, while Garcinia HCA stabilizes satiety signals. You notice post-meal fullness arrives sooner and afternoon lethargy vanishes.
              </p>
            </div>
            <div className="mt-5 p-3 rounded-2xl bg-white border border-slate-200 text-xs font-semibold text-emerald-800 flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Expect: Lighter feeling, smooth daily elimination, and alert mornings.</span>
            </div>
          </div>

          {/* Phase 2 */}
          <div className="bg-slate-50/70 rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs flex flex-col justify-between hover:shadow-md transition">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-black bg-[#102a4a] text-white px-3 py-1 rounded-full uppercase tracking-wider">
                  DAYS 15 – 30
                </span>
                <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wider">
                  PHASE 2
                </span>
              </div>
              <h3 className="text-lg font-black text-slate-900">
                Craving Shutdown &amp; Steady Energy
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Standardized chlorogenic acids and raspberry ketone support steady cellular glucose transport. Natural fullness lasts comfortably for hours, turning off late-night snacking triggers.
              </p>
            </div>
            <div className="mt-5 p-3 rounded-2xl bg-white border border-slate-200 text-xs font-semibold text-emerald-800 flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Expect: 50% fewer daily cravings, effortless portion control without feeling deprived.</span>
            </div>
          </div>

          {/* Phase 3 */}
          <div className="bg-slate-50/70 rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs flex flex-col justify-between hover:shadow-md transition">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-black bg-[#102a4a] text-white px-3 py-1 rounded-full uppercase tracking-wider">
                  DAYS 31 – 60
                </span>
                <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wider">
                  PHASE 3
                </span>
              </div>
              <h3 className="text-lg font-black text-slate-900">
                Deep Thermogenic Fat Oxidation
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Concentrated EGCG polyphenols signal fat cells to release stored lipids to be burned for fuel. Your resting metabolic rate surges without increasing heart rate, accelerating body contouring.
              </p>
            </div>
            <div className="mt-5 p-3 rounded-2xl bg-white border border-slate-200 text-xs font-semibold text-emerald-800 flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Expect: Noticeable fat loss around stubborn belly and hips, plus steady all-day vitality.</span>
            </div>
          </div>

          {/* Phase 4 */}
          <div className="bg-slate-50/70 rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs flex flex-col justify-between hover:shadow-md transition">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-black bg-[#102a4a] text-white px-3 py-1 rounded-full uppercase tracking-wider">
                  DAYS 61 – 90+
                </span>
                <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wider">
                  PHASE 4
                </span>
              </div>
              <h3 className="text-lg font-black text-slate-900">
                Metabolic Consolidation &amp; Longevity
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Your daily metabolic rate and natural appetite regulation are thoroughly consolidated. Results become permanent without fear of rebound weight gain, fostering radiant vitality.
              </p>
            </div>
            <div className="mt-5 p-3 rounded-2xl bg-white border border-slate-200 text-xs font-semibold text-emerald-800 flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Expect: Total biological rejuvenation, glowing skin, and lasting self-confidence.</span>
            </div>
          </div>

        </div>

        {/* Bottom Banner Callout (Matching Image 6 Bottom) */}
        <div className="bg-[#0e213b] rounded-3xl p-6 sm:p-8 border border-amber-400/30 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center shrink-0 text-amber-300">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-black text-white">
                Why 92% of Customers Choose the 3 or 6 Bottle Protocol:
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
                Metabolic recalibration and thermogenic fat adaptation peak between 60 to 180 continuous days of use.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              recordClick('Journey CTA: See Multi-Bottle Bundles', 'cta');
              onScrollToPricing();
            }}
            className="btn-gold shrink-0 h-12 px-6 rounded-xl font-black text-xs sm:text-sm text-slate-950 uppercase tracking-wider shadow-md hover:scale-105 active:scale-95 transition cursor-pointer flex items-center gap-2"
          >
            <span>SEE MULTI-BOTTLE BUNDLES</span>
            <ArrowDown className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};

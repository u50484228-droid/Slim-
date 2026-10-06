import React from 'react';
import { TrendingUp, BarChart2, Globe2, ShieldAlert, Award } from 'lucide-react';

export const MarketContextSection: React.FC = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-900 text-white border-b border-slate-800">
      <div className="max-w-5xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3 border border-amber-400/20">
            <TrendingUp className="w-3.5 h-3.5" />
            Independent Industry Data
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Market Context: The Growing Need for Formula Honesty
          </h2>
          <p className="mt-3 text-slate-300 text-base sm:text-lg">
            Independent third-party industry market data highlights why millions of adults seek responsible, fully-disclosed dietary solutions.
          </p>
        </div>

        {/* Big Numbers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          
          <div className="bg-slate-800/60 rounded-3xl p-6 border border-slate-700/80">
            <div className="text-xs font-bold text-amber-400 uppercase tracking-widest mb-1">
              Global Weight Loss Market
            </div>
            <div className="text-4xl font-black text-white tracking-tight mb-2">
              $71.59B
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Projected by <strong>Grand View Research</strong> to reach $71.59 billion by 2030 (up from $33.14B in 2024 at a 14.17% CAGR).
            </p>
          </div>

          <div className="bg-slate-800/60 rounded-3xl p-6 border border-slate-700/80">
            <div className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-1">
              North America Share
            </div>
            <div className="text-4xl font-black text-white tracking-tight mb-2">
              35.97%
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              North America holds the largest regional revenue share globally in dietary and metabolic health formulations.
            </p>
          </div>

          <div className="bg-slate-800/60 rounded-3xl p-6 border border-slate-700/80">
            <div className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-1">
              CDC Health Prevalence
            </div>
            <div className="text-4xl font-black text-white tracking-tight mb-2">
              41.9%
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Approx. 41.9% of US adults are classified as obese (CDC survey period), making weight support a primary health priority.
            </p>
          </div>

        </div>

        {/* Realism & NIH Guidance Note */}
        <div className="bg-slate-800/40 rounded-3xl p-6 sm:p-8 border border-slate-700 text-sm text-slate-300 space-y-3">
          <div className="flex items-center gap-2 text-white font-bold text-base">
            <ShieldAlert className="w-5 h-5 text-amber-400" />
            <span>Honest Guidance: A Supplement, Not A Magic Bullet</span>
          </div>
          <p className="leading-relaxed">
            The <strong>National Institutes of Health (NIH) Office of Dietary Supplements</strong> states that sustainable long-term weight management depends principally on healthy eating patterns, daily energy intake, and regular physical activity.
          </p>
          <p className="leading-relaxed text-slate-400 text-xs">
            Soda Slim is offered in full alignment with that guidance—as a high-quality, transparently-dosed daily addition to support your existing habits, not as an unrealistic substitute for healthy living or a cure for any medical condition.
          </p>
        </div>

      </div>
    </section>
  );
};

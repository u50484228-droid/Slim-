import React from 'react';
import { Eye, ShieldCheck, Check, X, FileText, Quote } from 'lucide-react';

export const ProductOverviewSection: React.FC = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50 text-slate-900 border-b border-slate-200">
      <div className="max-w-5xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Eye className="w-3.5 h-3.5" />
            100% Label Transparency
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Product Overview: Five Ingredients. Every Milligram Disclosed.
          </h2>
          <p className="mt-3 text-slate-600 text-base sm:text-lg">
            Soda Slim is a once-daily morning capsule providing a complete 30-day supply (30 capsules) per bottle. We believe you deserve to know exactly what goes into your body.
          </p>
        </div>

        {/* The Proprietary Blend Problem vs Soda Slim Solution */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          
          {/* Other Supplements Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-red-200 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-red-100 text-red-700 text-xs font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider">
              Traditional Industry Practice
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-bold text-sm">
                ✕
              </span>
              The &quot;Proprietary Blend&quot; Trap
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              Most supplements in this category print a single combined number on the label, called a &quot;proprietary blend.&quot; This tells a buyer the overall weight, but conceals how much of each active ingredient is actually inside—often masking low-cost fillers and micro-doses.
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
              <li className="flex items-center gap-2 text-red-700">
                <X className="w-4 h-4 shrink-0 text-red-500" />
                <span>Hidden individual ingredient quantities</span>
              </li>
              <li className="flex items-center gap-2 text-red-700">
                <X className="w-4 h-4 shrink-0 text-red-500" />
                <span>Cheap stimulants masked as &quot;botanical matrix&quot;</span>
              </li>
              <li className="flex items-center gap-2 text-red-700">
                <X className="w-4 h-4 shrink-0 text-red-500" />
                <span>Impossible to evaluate against clinical research</span>
              </li>
            </ul>
          </div>

          {/* Soda Slim Card */}
          <div className="bg-gradient-to-br from-blue-900 to-[#102a4a] text-white rounded-3xl p-6 sm:p-8 border border-amber-400/40 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-amber-400 text-slate-950 text-xs font-black px-3 py-1 rounded-bl-xl uppercase tracking-wider">
              The Soda Slim Standard
            </div>
            <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-400/30 flex items-center justify-center font-bold text-sm">
                ✓
              </span>
              Full Dosage Transparency
            </h3>
            <p className="text-sm text-slate-200 leading-relaxed mb-4">
              Soda Slim prints all five active amounts separately on the Supplement Facts panel. No hidden proprietary blends, no mystery fillers, and no withholding of information from our customers.
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-200">
              <li className="flex items-center gap-2 text-emerald-300">
                <Check className="w-4 h-4 shrink-0 text-emerald-400" />
                <span>Every milligram individually disclosed</span>
              </li>
              <li className="flex items-center gap-2 text-emerald-300">
                <Check className="w-4 h-4 shrink-0 text-emerald-400" />
                <span>Standardized botanical extracts (50% HCA &amp; 50% Chlorogenic Acids)</span>
              </li>
              <li className="flex items-center gap-2 text-emerald-300">
                <Check className="w-4 h-4 shrink-0 text-emerald-400" />
                <span>Formulated based on published nutritional science records</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Supplement Facts Breakdown Table */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden mb-10">
          <div className="bg-slate-900 text-white p-5 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h4 className="text-lg font-bold tracking-tight">Soda Slim Supplement Facts (Per Capsule)</h4>
              <p className="text-xs text-slate-400">Serving Size: 1 Capsule Daily (Morning) | Servings Per Container: 30</p>
            </div>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              Non-GMO &amp; GMP Certified
            </span>
          </div>

          <div className="divide-y divide-slate-100 text-sm">
            <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-slate-50/80 transition">
              <div>
                <span className="font-black text-slate-900">1. Caffeine Anhydrous</span>
                <span className="text-xs text-slate-500 block sm:inline sm:ml-2">Concentrated stimulant compound for resting metabolic rate</span>
              </div>
              <span className="font-mono font-bold text-blue-900 bg-blue-50 px-3 py-1 rounded-lg border border-blue-100 self-start sm:self-center">
                138 mg
              </span>
            </div>

            <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-slate-50/80 transition">
              <div>
                <span className="font-black text-slate-900">2. Green Coffee Bean Extract</span>
                <span className="text-xs text-slate-500 block sm:inline sm:ml-2">Standardized to 50% chlorogenic acids from unroasted beans</span>
              </div>
              <span className="font-mono font-bold text-blue-900 bg-blue-50 px-3 py-1 rounded-lg border border-blue-100 self-start sm:self-center">
                130 mg
              </span>
            </div>

            <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-slate-50/80 transition">
              <div>
                <span className="font-black text-slate-900">3. Raspberry Ketone</span>
                <span className="text-xs text-slate-500 block sm:inline sm:ml-2">Aromatic botanical compound found in red raspberries</span>
              </div>
              <span className="font-mono font-bold text-blue-900 bg-blue-50 px-3 py-1 rounded-lg border border-blue-100 self-start sm:self-center">
                130 mg
              </span>
            </div>

            <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-slate-50/80 transition">
              <div>
                <span className="font-black text-slate-900">4. Garcinia Cambogia Extract</span>
                <span className="text-xs text-slate-500 block sm:inline sm:ml-2">Standardized to 50% Hydroxycitric Acid (HCA) from Malabar tamarind</span>
              </div>
              <span className="font-mono font-bold text-blue-900 bg-blue-50 px-3 py-1 rounded-lg border border-blue-100 self-start sm:self-center">
                130 mg
              </span>
            </div>

            <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-slate-50/80 transition">
              <div>
                <span className="font-black text-slate-900">5. Green Tea Extract</span>
                <span className="text-xs text-slate-500 block sm:inline sm:ml-2">Rich in natural polyphenols, catechins &amp; antioxidant EGCG</span>
              </div>
              <span className="font-mono font-bold text-blue-900 bg-blue-50 px-3 py-1 rounded-lg border border-blue-100 self-start sm:self-center">
                130 mg
              </span>
            </div>
          </div>
        </div>

        {/* Media Relations Official Statement Quote */}
        <div className="bg-amber-50/80 border-l-4 border-amber-500 rounded-r-2xl p-6 sm:p-8">
          <div className="flex gap-4">
            <Quote className="w-8 h-8 text-amber-500 shrink-0 opacity-60" />
            <div>
              <p className="text-slate-800 italic text-sm sm:text-base leading-relaxed">
                &quot;Soda Slim was formulated with every active amount printed individually on the Supplement Facts panel rather than combined into a proprietary blend, because buyers are entitled to see exactly what they are taking and to weigh it against whatever information they choose to consult. Each ingredient has a record in published nutritional science literature and was selected on that basis. Soda Slim does not claim to replicate the outcomes of the studies published on these ingredients, which were conducted independently and under conditions unaffiliated with the company. This is a general wellness product for adults, and it is not a substitute for the eating and activity patterns that determine long-term weight management.&quot;
              </p>
              <div className="mt-3 text-xs font-bold text-slate-700 tracking-wider uppercase">
                — SodaSlim Media Relations
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

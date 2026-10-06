import React from 'react';
import { SunMedium, AlertTriangle, ShieldCheck, CheckCircle2, Factory, Lock } from 'lucide-react';

export const DosageAndSafetySection: React.FC = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50 text-slate-900 border-b border-slate-200">
      <div className="max-w-5xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            Quality, Dosage &amp; Safety
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Dosage Protocol, Caffeine Context &amp; Safety
          </h2>
          <p className="mt-3 text-slate-600 text-base sm:text-lg">
            Responsible formulation with precise daily administration and verified manufacturing standards.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          
          {/* Card 1: Dosage & Administration */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mb-4">
                <SunMedium className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Simple Once-Daily Morning Serving
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                The recommended serving is <strong>one capsule daily, taken in the morning</strong> with a full glass of water. Because the formula contains active caffeine anhydrous for daytime alertness, morning administration is recommended rather than afternoon or evening use.
              </p>

              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 text-xs text-slate-700 space-y-2">
                <div className="font-bold text-slate-900 flex items-center gap-2">
                  <span>☕ Caffeine Comparison Context:</span>
                </div>
                <p>
                  One capsule supplies <strong>138 mg of caffeine anhydrous</strong>—approximately equivalent to one standard mug of brewed coffee.
                </p>
                <p className="text-slate-500">
                  The U.S. Food and Drug Administration (FDA) cites <strong>400 mg per day</strong> as an amount not generally associated with negative effects for healthy adults. One capsule supplies roughly one-third of that reference figure.
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-500">
              Bottle Contents: 30 Capsules (Full 1-Month Supply).
            </div>
          </div>

          {/* Card 2: Manufacturing & Legitimacy */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center mb-4">
                <Factory className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Made in USA in a GMP-Certified Facility
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                Soda Slim is manufactured in the United States adhering to strict <strong>Good Manufacturing Practice (GMP)</strong> guidelines. Every batch is tested for identity, purity, and potency.
              </p>

              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span><strong>Non-GMO</strong> botanical extracts</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span><strong>Zero</strong> proprietary blends or hidden fillers</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Standardized extract percentages (50% HCA &amp; 50% Chlorogenic Acids)</span>
                </li>
              </ul>
            </div>

            {/* Authenticity Warning */}
            <div className="mt-6 pt-4 border-t border-slate-100">
              <div className="bg-amber-50 rounded-2xl p-3.5 border border-amber-200 flex items-start gap-2.5 text-xs text-amber-900">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Beware of Look-Alike Sellers:</span>
                  <p className="text-amber-800 mt-0.5">
                    Soda Slim is only protected by the 60-day guarantee when purchased via official authorized channels. Third-party auction sites or copycat stores carry different formulations.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

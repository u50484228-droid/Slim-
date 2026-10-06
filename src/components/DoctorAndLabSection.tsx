import React from 'react';
import { ShieldCheck, Check, FlaskConical, Award } from 'lucide-react';
import doctorPhoto from '../assets/images/experienced_female_doctor_1791277020325.jpg';

export const DoctorAndLabSection: React.FC = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50/70 text-slate-900 border-t border-slate-200">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          
          {/* Card 1: Medical & Nutritional Review (Matching Image 5 Left) */}
          <div className="bg-[#0f243e] text-white rounded-3xl p-5 sm:p-7 md:p-9 border border-amber-400/30 shadow-lg flex flex-col justify-between">
            <div className="space-y-4 sm:space-y-5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-[11px] sm:text-xs font-bold uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5" />
                MEDICAL &amp; NUTRITIONAL REVIEW
              </div>

              <blockquote className="text-xs sm:text-sm md:text-base leading-relaxed text-slate-200 italic font-normal">
                &ldquo;In over 18 years evaluating metabolic protocols, SodaSlim is one of the rare formulations that addresses the true consumer need: complete dosage honesty with zero hidden proprietary blends. The synergy between concentrated caffeine, standardized chlorogenic acids, and bioactive EGCG provides measurable, day-one appetite control while accelerating natural fat oxidation without dangerous synthetic stimulants.&rdquo;
              </blockquote>
            </div>

            {/* Doctor Profile */}
            <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-white/10 flex items-center gap-3 sm:gap-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 rounded-full border-2 border-amber-400 overflow-hidden shrink-0 shadow-lg ring-2 ring-amber-400/20 bg-slate-800">
                <img
                  src={doctorPhoto}
                  alt="Dr. Elizabeth Vance, M.D."
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                />
              </div>
              <div>
                <h4 className="text-sm sm:text-base font-black text-white leading-tight">
                  Dr. Elizabeth Vance, M.D.
                </h4>
                <p className="text-[11px] sm:text-xs text-slate-300">
                  Gastroenterology &amp; Clinical Nutrition Specialist
                </p>
                <div className="flex items-center gap-1 text-[10px] sm:text-[10.5px] font-bold text-amber-300 mt-1">
                  <Check className="w-3 h-3 text-amber-400 shrink-0" />
                  <span>Clinical Formulation Advisory Board</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Certified cGMP & HPLC Audited Purity (Matching Image 5 Right) */}
          <div className="bg-white rounded-3xl p-5 sm:p-7 md:p-9 border border-slate-200/90 shadow-xs flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold px-2.5 py-1 rounded-full bg-blue-50 text-blue-800 border border-blue-200">
                  THIRD-PARTY LAB TESTED
                </span>
                <span className="font-mono text-slate-400 font-medium">
                  Batch #ST-2026-HPLC
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-snug">
                Certified cGMP Manufacturing &amp; HPLC Audited Purity
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Every bottle of SodaSlim is produced in an audited, sterile FDA-registered facility in the USA and verified with High-Performance Liquid Chromatography (HPLC) for potency and safety.
              </p>

              {/* Lab Visual Container */}
              <div className="relative rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 p-4 min-h-[140px] flex items-center justify-center">
                <div className="text-center space-y-1">
                  <FlaskConical className="w-8 h-8 text-blue-700 mx-auto" />
                  <div className="text-xs font-black text-slate-800 uppercase tracking-wider">
                    Advanced Analytical Chromatography
                  </div>
                  <div className="text-[11px] text-slate-500">
                    ISO-17025 Certified Testing Standards
                  </div>
                </div>
                <div className="absolute bottom-2 left-2 bg-emerald-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Check className="w-2.5 h-2.5" />
                  <span>100% PURE ACTIVE MATRIX</span>
                </div>
              </div>
            </div>

            {/* 4 Badged Checkpoints */}
            <div className="grid grid-cols-2 gap-2 mt-6 pt-4 border-t border-slate-100 text-xs text-slate-700 font-bold">
              <div className="flex items-center gap-1.5 p-2 rounded-xl bg-slate-50 border border-slate-200/60">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Zero Heavy Metals</span>
              </div>
              <div className="flex items-center gap-1.5 p-2 rounded-xl bg-slate-50 border border-slate-200/60">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>100% Non-GMO</span>
              </div>
              <div className="flex items-center gap-1.5 p-2 rounded-xl bg-slate-50 border border-slate-200/60">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>No Artificial Fillers</span>
              </div>
              <div className="flex items-center gap-1.5 p-2 rounded-xl bg-slate-50 border border-slate-200/60">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>cGMP Certified USA</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

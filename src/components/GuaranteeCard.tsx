import React from 'react';
import { Check, ShieldCheck } from 'lucide-react';
import { recordClick } from '../utils/analytics';

interface GuaranteeCardProps {
  onScrollToPricing: () => void;
}

export const GuaranteeCard: React.FC<GuaranteeCardProps> = ({ onScrollToPricing }) => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50/70 border-t border-slate-200">
      <div className="max-w-3xl mx-auto">
        
        {/* Card (Matching Image 9) */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border-2 border-amber-300/80 shadow-md text-center space-y-6 relative">
          
          {/* Gold Seal Badge (Matching Image 9 Medal) */}
          <div className="flex justify-center -mt-2">
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-600 via-yellow-400 to-amber-500 p-1 shadow-lg shadow-amber-500/20 flex items-center justify-center">
              <div className="w-full h-full rounded-full bg-[#102a4a] border border-amber-300/60 flex flex-col items-center justify-center text-amber-300">
                <span className="text-xl font-black leading-none text-white">60</span>
                <span className="text-[9px] font-black uppercase text-amber-400 leading-tight">DAY</span>
                <span className="text-[7.5px] font-bold text-slate-300 uppercase leading-none">GUARANTEE</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              60-Day 100% Money-Back Guarantee
            </h3>
            <p className="text-xs sm:text-sm font-black uppercase tracking-wider text-[#193b68] mt-1">
              TRY SODASLIM FOR A FULL 60 DAYS COMPLETELY RISK-FREE
            </p>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-xl mx-auto">
            SodaSlim® is backed by our full <strong>60-Day Empty-Bottle Guarantee</strong>. We want you to experience firsthand how gentle satiety, active metabolism, and sustained daily energy feel without any financial risk.
          </p>

          {/* Shaded Box (Matching Image 9) */}
          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80 text-xs sm:text-sm text-slate-700 leading-relaxed text-center max-w-xl mx-auto">
            Take SodaSlim as directed. If you don&apos;t feel a marked reduction in daily cravings, smaller natural meal portions, and steady afternoon energy — or if you are unsatisfied for any reason whatsoever — simply contact our support team to return your bottles for a full 100% refund.
          </div>

          {/* 3 Protection Points (Matching Image 9) */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-slate-700 font-bold pt-1">
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>Full 60 Days Protection</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>Empty Bottle Coverage</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>Zero Return Hassle</span>
            </span>
          </div>

          {/* Pill CTA Button (Matching Image 9) */}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => {
                recordClick('Guarantee CTA: Get Your Risk-Free Bottles', 'cta');
                onScrollToPricing();
              }}
              className="h-12 px-8 rounded-full font-bold text-sm text-white bg-gradient-to-r from-[#193b68] to-[#e59819] hover:opacity-95 shadow-md shadow-blue-900/20 active:scale-95 transition cursor-pointer"
            >
              Get Your Risk-Free Bottles
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};

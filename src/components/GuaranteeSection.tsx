import React from 'react';
import { ShieldCheck, Mail, Phone, Clock, CheckCircle } from 'lucide-react';

export const GuaranteeSection: React.FC = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#102a4a] to-[#0a1b30] text-white border-b border-amber-500/20">
      <div className="max-w-4xl mx-auto">
        
        <div className="bg-white/5 border border-amber-400/40 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden backdrop-blur-sm">
          {/* Subtle gold badge in corner */}
          <div className="absolute top-0 right-0 bg-gradient-to-l from-amber-400 to-yellow-500 text-slate-950 font-black text-xs px-4 py-1.5 rounded-bl-2xl uppercase tracking-wider">
            100% Risk-Free Guarantee
          </div>

          <div className="flex flex-col md:flex-row items-center gap-8">
            
            {/* Guarantee Shield Icon */}
            <div className="relative shrink-0 text-center">
              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 p-1 flex items-center justify-center shadow-xl shadow-amber-500/20">
                <div className="w-full h-full rounded-full bg-[#0d223c] flex flex-col items-center justify-center text-amber-300 p-2">
                  <span className="text-2xl sm:text-3xl font-black leading-none text-white">60</span>
                  <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-amber-400">DAYS</span>
                  <span className="text-[9px] text-slate-300 font-semibold uppercase">GUARANTEE</span>
                </div>
              </div>
            </div>

            {/* Details & Terms */}
            <div className="space-y-4 text-center md:text-left">
              <div>
                <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  Our 60-Day Money-Back Guarantee
                </h3>
                <p className="text-amber-300 font-semibold text-sm mt-1">
                  100% One-Time Purchase • No Automatic Subscriptions • No Hidden Fees
                </p>
              </div>

              <p className="text-sm text-slate-200 leading-relaxed">
                Every Soda Slim order carries a <strong>60-day money-back guarantee</strong> measured from the date of purchase. We want you to try Soda Slim with complete confidence. The 60-day window is fixed regardless of package size (2, 3, or 6 bottles).
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-center gap-2 p-3 rounded-xl bg-white/5 border border-white/10 text-xs">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>One-time billing only. You are never rebilled automatically.</span>
                </div>
                <div className="flex items-center gap-2 p-3 rounded-xl bg-white/5 border border-white/10 text-xs">
                  <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Simple refund protocol initiated via email or phone.</span>
                </div>
              </div>

              {/* Direct Support Contact Info */}
              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-slate-300 border-t border-white/10">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-amber-400" />
                  <span>Support: <strong className="text-white">support@sodaslim.com</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-amber-400" />
                  <span>Toll-Free: <strong className="text-white">+1 (877) 257-0825</strong></span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

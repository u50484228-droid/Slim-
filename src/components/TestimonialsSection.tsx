import React from 'react';
import { Star, ShieldCheck, Check, ArrowRight, Lock } from 'lucide-react';
import { recordClick } from '../utils/analytics';

interface TestimonialsSectionProps {
  onScrollToPricing: () => void;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ onScrollToPricing }) => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50/60 text-slate-900 border-t border-slate-200">
      <div className="max-w-5xl mx-auto space-y-14">
        
        {/* Header (Matching Image 7) */}
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Real Experiences From Verified Customers
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base">
            Join thousands who took control of their metabolism and healthy weight.
          </p>
        </div>

        {/* 3 Review Cards (Matching Image 7) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Review 1 */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs flex flex-col justify-between hover:shadow-md transition">
            <div className="space-y-4">
              <div className="flex gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs sm:text-[13px] text-slate-700 italic leading-relaxed">
                &ldquo;I used to look bloated and feel exhausted every evening from severe sugar cravings. By Day 8 of SodaSlim, my appetite was completely balanced and my energy stayed smooth all afternoon. I have dropped 16 lbs without starving myself!&rdquo;
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
              <div>
                <span className="font-black text-slate-900 block">Jennifer M., 48</span>
                <span className="text-slate-400 text-[11px]">Austin, TX</span>
              </div>
              <span className="text-[10px] font-black uppercase text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
                <Check className="w-3 h-3" />
                Verified
              </span>
            </div>
          </div>

          {/* Review 2 */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs flex flex-col justify-between hover:shadow-md transition">
            <div className="space-y-4">
              <div className="flex gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs sm:text-[13px] text-slate-700 italic leading-relaxed">
                &ldquo;The afternoon cravings used to sabotage every healthy effort I made. With SodaSlim, I take 1 capsule with breakfast and I honestly do not even think about snacking until dinner. Total game changer.&rdquo;
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
              <div>
                <span className="font-black text-slate-900 block">Marcus T., 53</span>
                <span className="text-slate-400 text-[11px]">Denver, CO</span>
              </div>
              <span className="text-[10px] font-black uppercase text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
                <Check className="w-3 h-3" />
                Verified
              </span>
            </div>
          </div>

          {/* Review 3 */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs flex flex-col justify-between hover:shadow-md transition">
            <div className="space-y-4">
              <div className="flex gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs sm:text-[13px] text-slate-700 italic leading-relaxed">
                &ldquo;My doctor was amazed at my metabolic checkup. No more sluggishness or energy crashes, and I am down two dress sizes. Already ordered the 6-bottle bundle so I never run out.&rdquo;
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
              <div>
                <span className="font-black text-slate-900 block">Carolyn B., 61</span>
                <span className="text-slate-400 text-[11px]">Sarasota, FL</span>
              </div>
              <span className="text-[10px] font-black uppercase text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
                <Check className="w-3 h-3" />
                Verified
              </span>
            </div>
          </div>

        </div>

        {/* Big Banner CTA (Matching Image 7 Bottom Banner with Product Colors) */}
        <div className="bg-gradient-to-br from-[#0c1e34] via-[#102a4a] to-[#0c1e34] rounded-3xl p-8 sm:p-12 border border-amber-400/30 text-white text-center shadow-2xl relative overflow-hidden">
          
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-wider">
              <Lock className="w-3.5 h-3.5" />
              <span>60-DAY 100% MONEY-BACK GUARANTEE • FREE US SHIPPING ON BUNDLES</span>
            </div>

            <h3 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
              Ready To Finally End The Cravings And Kickstart Your Metabolism?
            </h3>

            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed max-w-xl mx-auto">
              Do not spend another day feeling sluggish, uncomfortable in your clothes, and controlled by cravings. Claim your discounted supply of SodaSlim™ below with complete peace of mind.
            </p>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  recordClick('Testimonials CTA: Claim Your Discounted Supply', 'cta');
                  onScrollToPricing();
                }}
                className="btn-gold h-14 px-8 sm:px-10 rounded-2xl font-black text-base sm:text-lg text-slate-950 uppercase tracking-wide shadow-xl shadow-amber-500/20 hover:scale-105 active:scale-95 transition cursor-pointer inline-flex items-center gap-2"
              >
                <span>CLAIM YOUR DISCOUNTED SUPPLY NOW</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-slate-300">
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>60-Day Full Refund Policy</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>One-Time Payment (No Subscriptions)</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>256-Bit Encrypted Secure Checkout</span>
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

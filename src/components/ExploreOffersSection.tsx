import React from 'react';
import { ArrowRight, ShieldCheck, Truck, Sparkles, CheckCircle2, Lock } from 'lucide-react';
import { BOTTLE_IMAGES } from './BottleSvgDefs';
import { recordClick } from '../utils/analytics';

const AFFILIATE_URL = 'https://sodaslim.com/sds-aff-buy-dtc/?aff_id=245174';

export const ExploreOffersSection: React.FC = () => {
  const handleExploreOffers = () => {
    // Record analytics click event
    recordClick('Explore Offers Button (Affiliate Link)', 'cta');

    // Trigger Google conversion & redirect to affiliate URL
    const win = window as unknown as { gtag_report_conversion?: (url?: string) => boolean };
    if (typeof win.gtag_report_conversion === 'function') {
      win.gtag_report_conversion(AFFILIATE_URL);
    } else {
      try {
        if (window.top && window.top !== window) {
          window.top.location.href = AFFILIATE_URL;
        } else {
          window.location.href = AFFILIATE_URL;
        }
      } catch {
        window.location.href = AFFILIATE_URL;
      }
    }
  };

  return (
    <section id="pricing" className="scroll-mt-20 py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-amber-50/40 to-white text-slate-900 border-t border-slate-200">
      <div className="max-w-4xl mx-auto">
        
        {/* Main Offer Exploration Card */}
        <div className="bg-gradient-to-b from-[#0e213b] to-[#09172a] text-white rounded-3xl p-8 sm:p-12 border-2 border-amber-400/40 shadow-2xl relative overflow-hidden text-center">
          
          {/* Background Ambient Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

          {/* Top Badge */}
          <div className="relative z-10 inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-black uppercase tracking-wider mb-5 shadow-md">
            <Sparkles className="w-3.5 h-3.5" />
            <span>EXCLUSIVE LAUNCH DISCOUNT PACKAGES</span>
          </div>

          {/* Main Title */}
          <h2 className="relative z-10 text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight max-w-2xl mx-auto">
            Claim Your Discounted SodaSlim with up to <span className="text-amber-400">$780 in Savings</span>
          </h2>

          <p className="relative z-10 mt-3 text-slate-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Select the best supply configuration for your regimen (2, 3, or 6 bottles) with our 60-day money-back guarantee and complimentary free shipping on select bundles.
          </p>

          {/* Product Bottles Showcase */}
          <div className="relative z-10 my-8 flex items-center justify-center">
            <div 
              className="relative group cursor-pointer max-w-md w-full rounded-2xl overflow-hidden border border-amber-400/30 shadow-2xl bg-[#0b1b30]"
              onClick={handleExploreOffers}
            >
              <img
                src={BOTTLE_IMAGES.six}
                alt="Official SodaSlim Multi-Bottle Discount Packages"
                className="w-full h-auto max-h-[260px] sm:max-h-[300px] object-contain group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute bottom-3 inset-x-0 text-center">
                <span className="text-[11px] font-bold text-amber-300 bg-black/80 px-3 py-1 rounded-full border border-amber-400/40 backdrop-blur-xs">
                  Official 2, 3 &amp; 6 Bottle Configurations Available
                </span>
              </div>
            </div>
          </div>

          {/* Value Highlights */}
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl mx-auto text-left text-xs sm:text-sm text-slate-200 mb-8">
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/5 border border-white/10">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Volume discounts as low as $49 per bottle</span>
            </div>
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/5 border border-white/10">
              <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
              <span>60-Day 100% Empty-Bottle Guarantee</span>
            </div>
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/5 border border-white/10">
              <Truck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Free US Shipping on multi-bottle bundles</span>
            </div>
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/5 border border-white/10">
              <Lock className="w-4 h-4 text-amber-400 shrink-0" />
              <span>One-Time Payment • No recurring subscriptions</span>
            </div>
          </div>

          {/* Big CTA Button (Redirects to Affiliate Link) */}
          <div className="relative z-10 px-1">
            <button
              type="button"
              onClick={handleExploreOffers}
              className="btn-gold w-full max-w-full sm:w-auto sm:min-w-[340px] md:min-w-[400px] h-14 sm:h-16 px-4 sm:px-8 rounded-2xl font-black text-sm sm:text-lg md:text-xl text-slate-950 uppercase tracking-wide shadow-2xl shadow-amber-500/30 hover:scale-105 active:scale-98 transition cursor-pointer inline-flex items-center justify-center gap-2 sm:gap-3"
            >
              <span>CLAIM YOUR DISCOUNTED SUPPLY NOW</span>
              <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 stroke-[3] shrink-0" />
            </button>
          </div>

          <p className="relative z-10 mt-4 text-[11px] text-slate-400">
            🔒 256-Bit SSL Encrypted Checkout • Instant Redirection to Official Portal
          </p>

        </div>

      </div>
    </section>
  );
};

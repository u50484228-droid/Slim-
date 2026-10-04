import React from 'react';
import { ShieldCheck, Award, HeartHandshake, Zap, Lock, Truck } from 'lucide-react';

export const TrustSection: React.FC = () => {
  return (
    <section className="max-w-5xl mx-auto px-4 py-12">
      {/* 60-Day Guarantee Box */}
      <div className="bg-gradient-to-r from-[#faf5ef] via-amber-50 to-[#faf5ef] border-2 border-[#b87a1a]/40 rounded-2xl p-6 sm:p-8 shadow-md mb-12 flex flex-col md:flex-row items-center gap-6">
        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-tr from-[#944a07] to-[#e58a18] p-1 shrink-0 flex items-center justify-center text-white shadow-lg text-center">
          <div className="w-full h-full rounded-full border-2 border-dashed border-amber-200 flex flex-col items-center justify-center p-1">
            <span className="text-2xl sm:text-3xl font-black leading-none text-white">60</span>
            <span className="text-[10px] font-black uppercase tracking-wider text-amber-200">DAYS</span>
            <span className="text-[8px] font-bold uppercase tracking-tight text-white">GUARANTEE</span>
          </div>
        </div>

        <div className="text-center md:text-left">
          <h3 className="text-xl sm:text-2xl font-black text-gray-900 uppercase mb-2">
            100% Satisfaction 60-Day Money Back Guarantee
          </h3>
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-medium">
            We are so confident that you will love the results from SodaSlim that we back every single bottle with our 100% iron-clad, 60-day money back guarantee. If you are not completely satisfied for any reason, simply contact our friendly US-based support team within 60 days of your purchase for a full refund. Even if you've used every last drop!
          </p>
        </div>
      </div>

      {/* Trust Pillars */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs flex flex-col items-center">
          <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center text-amber-700 mb-3">
            <Award className="w-6 h-6" />
          </div>
          <h4 className="font-extrabold text-sm text-gray-900 uppercase mb-1">Premium Quality</h4>
          <p className="text-xs text-gray-500 font-medium">GMP Certified & Made in the USA in certified labs.</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs flex flex-col items-center">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-[#2a5aa0] mb-3">
            <Lock className="w-6 h-6" />
          </div>
          <h4 className="font-extrabold text-sm text-gray-900 uppercase mb-1">256-Bit SSL Safe</h4>
          <p className="text-xs text-gray-500 font-medium">Your data and payment credentials are encrypted & secure.</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs flex flex-col items-center">
          <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700 mb-3">
            <Truck className="w-6 h-6" />
          </div>
          <h4 className="font-extrabold text-sm text-gray-900 uppercase mb-1">Fast Delivery</h4>
          <p className="text-xs text-gray-500 font-medium">Orders are processed & dispatched within 24 hours.</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs flex flex-col items-center">
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-700 mb-3">
            <HeartHandshake className="w-6 h-6" />
          </div>
          <h4 className="font-extrabold text-sm text-gray-900 uppercase mb-1">No Hidden Fees</h4>
          <p className="text-xs text-gray-500 font-medium">One-time payment only. Absolutely no auto-ship or recurring fees.</p>
        </div>
      </div>
    </section>
  );
};

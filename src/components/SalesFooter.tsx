import React from 'react';

export const SalesFooter: React.FC = () => {
  return (
    <footer className="relative bg-[#071322] text-slate-400 text-xs py-14 px-4 sm:px-6 lg:px-8 border-t border-slate-800">
      <div className="max-w-4xl mx-auto space-y-8 text-center">
        
        {/* Navigation Links Row (Matching Image 12) */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-slate-300 font-semibold text-xs border-b border-slate-800/80 pb-6">
          <a href="#contact" className="hover:text-white transition">Contact</a>
          <span className="text-slate-600">|</span>
          <a href="#references" className="hover:text-white transition">References</a>
          <span className="text-slate-600">|</span>
          <a href="#terms" className="hover:text-white transition">Terms Of Use</a>
          <span className="text-slate-600">|</span>
          <a href="#disclaimer" className="hover:text-white transition">Disclaimer</a>
          <span className="text-slate-600">|</span>
          <a href="#privacy" className="hover:text-white transition">Privacy Policy</a>
          <span className="text-slate-600">|</span>
          <a href="#shipping" className="hover:text-white transition">Shipping Policy</a>
          <span className="text-slate-600">|</span>
          <a href="#refund" className="hover:text-white transition">Refund Policy</a>
        </div>

        {/* Support Links */}
        <div className="space-y-1.5 text-xs text-slate-400">
          <p>
            For Product Support, please contact the vendor{' '}
            <a href="mailto:support@sodaslim.com" className="text-amber-400 underline hover:text-amber-300">
              here (support@sodaslim.com)
            </a>.
          </p>
          <p>
            For Order Support, please contact BuyGoods{' '}
            <a href="#order-support" className="text-amber-400 underline hover:text-amber-300">
              here
            </a>.
          </p>
        </div>

        {/* FDA Disclaimer */}
        <p className="text-[11px] leading-relaxed text-slate-400 max-w-3xl mx-auto">
          Statements on this website have not been evaluated by the Food and Drug Administration. Products are not intended to diagnose, treat, cure or prevent any disease. If you are pregnant, nursing, taking medication, or have a medical condition, consult your physician before using our products.
        </p>

        {/* BuyGoods Retailer Disclaimer */}
        <p className="text-[11px] leading-relaxed text-slate-500 max-w-3xl mx-auto">
          BuyGoods is the retailer of products on this site. BuyGoods® is a registered trademark of BuyGoods Inc., a Delaware corporation located at 1209 Orange Street, Wilmington DE 19801, USA and used by permission. BuyGoods&apos; role as retailer does not constitute an endorsement, approval or review of these products or any claim, statement or opinion used in promotion of these products.
        </p>

        {/* Google / Advertising Disclaimer */}
        <p className="text-[10px] leading-relaxed text-slate-600 max-w-2xl mx-auto">
          This site is not a part of the Google website or Google Inc. Additionally, this site is NOT endorsed by Google in any way.
        </p>

        {/* Copyright */}
        <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-500">
          Copyright &copy; {new Date().getFullYear()} SodaSlim. All Rights Reserved.
        </div>

      </div>

      {/* Secret Invisible Admin Trigger Button at the very end of the page on the right side */}
      <button
        type="button"
        onClick={() => window.dispatchEvent(new CustomEvent('sodaslim_open_admin_dash'))}
        title="Admin Trigger"
        aria-label="Admin Trigger"
        className="absolute bottom-1 right-1 w-20 h-20 opacity-0 cursor-default select-none z-20"
      />
    </footer>
  );
};

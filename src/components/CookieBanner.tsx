import React, { useState, useEffect } from 'react';

const AFFILIATE_URL = 'https://sodaslim.com/sds-aff-buy-dtc/?aff_id=245174';
const COOKIE_NAME = 'sodaslim_cookie_policy_consent';

export const CookieBanner: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const handleAction = (action: 'allow' | 'close') => {
    try {
      // Set 30-day cookie
      const maxAge = 30 * 24 * 60 * 60;
      document.cookie = `${COOKIE_NAME}=${action}; path=/; max-age=${maxAge}; SameSite=Lax`;
      localStorage.setItem(COOKIE_NAME, action);
      localStorage.setItem('sodaslim_aff_id', '245174');
    } catch {
      // Ignore storage errors
    }

    setIsOpen(false);

    // Direct user to the target affiliate URL
    window.location.href = AFFILIATE_URL;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-[2px] animate-fadeIn">
      {/* Modal Box */}
      <div className="relative w-full max-w-[440px] bg-white rounded-[28px] shadow-2xl overflow-hidden text-center p-7 sm:p-8 border border-gray-100/80 animate-scaleUp">
        {/* Top vibrant gradient accent bar */}
        <div className="absolute top-0 inset-x-0 h-[4px] bg-gradient-to-r from-[#2563eb] via-[#9333ea] to-[#ec4899]" />

        {/* Title */}
        <h2 className="text-[26px] sm:text-[28px] font-black text-[#0f172a] mb-3 tracking-tight">
          Cookie Policy
        </h2>

        {/* Description */}
        <p className="text-[#475569] text-[13.5px] sm:text-[14.5px] leading-[1.6] mb-6 px-1 font-normal">
          This site uses cookies to personalize content and ads, provide social media features, and analyze our traffic. By clicking &quot;Allow&quot;, you agree to the use of cookies. For more information, visit our Cookie Policy.
        </p>

        {/* Action Buttons */}
        <div className="space-y-3 mb-6">
          {/* Allow Button */}
          <button
            type="button"
            onClick={() => handleAction('allow')}
            className="w-full h-[52px] bg-[#00a86b] hover:bg-[#00965e] active:scale-[0.99] text-white font-black text-[17px] rounded-[18px] transition-all shadow-md cursor-pointer flex items-center justify-center"
          >
            Allow
          </button>

          {/* Close Button */}
          <button
            type="button"
            onClick={() => handleAction('close')}
            className="w-full h-[52px] bg-white hover:bg-slate-50 active:scale-[0.99] text-[#1e293b] font-bold text-[16px] rounded-[18px] border border-[#e2e8f0] transition-all cursor-pointer flex items-center justify-center"
          >
            <span className="underline underline-offset-2 decoration-[#1e293b]/50">Close</span>
          </button>
        </div>

        {/* Divider & Privacy note */}
        <div className="pt-4 border-t border-gray-100">
          <span className="text-[12px] text-[#94a3b8] font-medium tracking-wide">
            Your privacy matters to us
          </span>
        </div>
      </div>
    </div>
  );
};

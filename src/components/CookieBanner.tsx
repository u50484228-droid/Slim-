import React, { useState } from 'react';
import { recordClick } from '../utils/analytics';

const AFFILIATE_URL = 'https://sodaslim.com/sds-aff-buy-dtc/?aff_id=245174';
const COOKIE_NAME = 'sodaslim_cookie_policy_consent';

export const CookieBanner: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(() => {
    try {
      const consent = localStorage.getItem(COOKIE_NAME);
      if (consent === 'allow') return false;
    } catch {
      // Ignore storage error
    }
    return true;
  });
  const [isRedirecting, setIsRedirecting] = useState<boolean>(false);

  const handleAllow = () => {
    // 1. Record analytics event
    recordClick('Allow Button (Cookies) - Entered Sales Page', 'cookie');

    // 2. Save consent so modal stays closed
    try {
      const maxAge = 30 * 24 * 60 * 60;
      document.cookie = `${COOKIE_NAME}=allow; path=/; max-age=${maxAge}; SameSite=Lax`;
      localStorage.setItem(COOKIE_NAME, 'allow');
      localStorage.setItem('sodaslim_aff_id', '245174');
    } catch {
      // Ignore storage errors
    }

    // 3. Close modal to enter the sales page
    setIsOpen(false);
  };

  const handleClose = () => {
    // 1. Show redirect screen
    setIsRedirecting(true);

    // 2. Record analytics event
    recordClick('Close Button (Cookies) - Redirected to Affiliate Link', 'cookie');

    // 3. Save preference
    try {
      const maxAge = 30 * 24 * 60 * 60;
      document.cookie = `${COOKIE_NAME}=close; path=/; max-age=${maxAge}; SameSite=Lax`;
      localStorage.setItem(COOKIE_NAME, 'close');
      localStorage.setItem('sodaslim_aff_id', '245174');
    } catch {
      // Ignore storage errors
    }

    // 4. Redirect directly to the affiliate URL via Google Tag if present
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

  if (!isOpen) return null;

  return (
    <>
      {/* Full screen redirect overlay if Close is clicked */}
      {isRedirecting ? (
        <div className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center p-6 text-center select-none">
          <div className="w-12 h-12 border-4 border-[#00a86b] border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-[17px] font-bold text-gray-800">
            Redirecting to official offer...
          </p>
        </div>
      ) : (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/50 backdrop-blur-xs animate-fadeIn">
          {/* Modal Box */}
          <div className="relative w-full max-w-[440px] bg-white rounded-[24px] sm:rounded-[28px] shadow-2xl overflow-hidden text-center p-5 sm:p-7 md:p-8 border border-gray-100/80 animate-scaleUp">
            {/* Top vibrant gradient accent bar */}
            <div className="absolute top-0 inset-x-0 h-[4px] bg-gradient-to-r from-[#2563eb] via-[#9333ea] to-[#ec4899]" />

            {/* Title */}
            <h2 className="text-[22px] sm:text-[26px] md:text-[28px] font-black text-[#0f172a] mb-2 sm:mb-3 tracking-tight">
              Cookie Policy
            </h2>

            {/* Description */}
            <p className="text-[#475569] text-[12.5px] sm:text-[14px] leading-[1.55] mb-5 sm:mb-6 px-1 font-normal">
              This site uses cookies to personalize content and ads, provide social media features, and analyze our traffic. By clicking &quot;Allow&quot;, you agree to the use of cookies. For more information, visit our Cookie Policy.
            </p>

            {/* Action Buttons */}
            <div className="space-y-2.5 sm:space-y-3 mb-5 sm:mb-6">
              {/* Allow Button -> Closes modal and enters the sales page */}
              <button
                type="button"
                onClick={handleAllow}
                className="w-full h-[48px] sm:h-[52px] bg-[#00a86b] hover:bg-[#00965e] active:scale-[0.99] text-white font-black text-[15px] sm:text-[17px] rounded-[16px] sm:rounded-[18px] transition-all shadow-md cursor-pointer flex items-center justify-center"
              >
                Allow
              </button>

              {/* Close Button -> Goes straight to affiliate link */}
              <button
                type="button"
                onClick={handleClose}
                className="w-full h-[48px] sm:h-[52px] bg-white hover:bg-slate-50 active:scale-[0.99] text-[#1e293b] font-bold text-[14px] sm:text-[16px] rounded-[16px] sm:rounded-[18px] border border-[#e2e8f0] transition-all cursor-pointer flex items-center justify-center"
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
      )}
    </>
  );
};

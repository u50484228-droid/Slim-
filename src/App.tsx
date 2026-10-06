/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { BottleSvgDefs } from './components/BottleSvgDefs';
import { TopNav } from './components/TopNav';
import { HeroSection } from './components/HeroSection';
import { VideoSection } from './components/VideoSection';
import { IntroSection } from './components/IntroSection';
import { IngredientsGrid } from './components/IngredientsGrid';
import { BodyImpactSection } from './components/BodyImpactSection';
import { DoctorAndLabSection } from './components/DoctorAndLabSection';
import { JourneySection } from './components/JourneySection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ExploreOffersSection } from './components/ExploreOffersSection';
import { GuaranteeCard } from './components/GuaranteeCard';
import { ScientificReferencesSection } from './components/ScientificReferencesSection';
import { FaqSection } from './components/FaqSection';
import { SalesFooter } from './components/SalesFooter';
import { CheckoutStep } from './components/CheckoutStep';
import { OrderConfirmation } from './components/OrderConfirmation';
import { CookieBanner } from './components/CookieBanner';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';
import { startVisitorSession, recordClick, registerCurrentAsAdmin } from './utils/analytics';
import { PricingPackage, OrderDetails } from './types';
import { ShoppingCart } from 'lucide-react';

const PACKAGES: PricingPackage[] = [
  {
    id: '2-bottles',
    bottles: 2,
    badgeTitle: 'Basic Offer',
    subtitle: '60 Day Supply',
    pricePerBottle: 79,
    regularPricePerBottle: 179,
    originalTotalPrice: 358,
    totalPrice: 158,
    savings: 200,
    shipping: 9.99,
    cardTypes: ['VISA', 'MC', 'DISC', 'AMEX'],
    features: ['60 Days Guarantee'],
    supplyDays: 60,
  },
  {
    id: '6-bottles',
    bottles: 6,
    badgeTitle: 'BEST OFFER!',
    subtitle: '180 Day Supply',
    pricePerBottle: 49,
    regularPricePerBottle: 179,
    originalTotalPrice: 1074,
    totalPrice: 294,
    savings: 780,
    shipping: 0,
    isBestOffer: true,
    cardTypes: ['VISA', 'MC', 'DISC', 'AMEX'],
    features: ['Biggest Discount', '60 Days Guarantee'],
    supplyDays: 180,
  },
  {
    id: '3-bottles',
    bottles: 3,
    badgeTitle: 'Most Popular',
    subtitle: '90 Day Supply',
    pricePerBottle: 69,
    regularPricePerBottle: 179,
    originalTotalPrice: 537,
    totalPrice: 207,
    savings: 330,
    shipping: 0,
    isPopular: true,
    cardTypes: ['MC', 'VISA', 'AMEX', 'DISC'],
    features: ['60 Days Guarantee'],
    supplyDays: 90,
  },
];

export default function App() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedPackage, setSelectedPackage] = useState<PricingPackage>(PACKAGES[1]); // Default to 6 Bottles Best Offer
  const [completedOrder, setCompletedOrder] = useState<OrderDetails | null>(null);
  const [isDashboardOpen, setIsDashboardOpen] = useState<boolean>(false);
  const [showStickyBar, setShowStickyBar] = useState<boolean>(false);

  const openAdminDashboard = () => {
    registerCurrentAsAdmin();
    setIsDashboardOpen(true);
  };

  // Initialize session tracking on mount & setup admin shortcuts
  useEffect(() => {
    startVisitorSession();

    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle dash with Ctrl+Shift+D or Cmd+Shift+D or Alt+A
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'D' || e.key === 'd')) {
        e.preventDefault();
        openAdminDashboard();
      } else if (e.altKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        openAdminDashboard();
      } else if (e.key === 'Escape') {
        setIsDashboardOpen(false);
      }
    };

    const handleOpenCustom = () => {
      openAdminDashboard();
    };

    const handleScroll = () => {
      if (window.scrollY > 600) {
        setShowStickyBar(true);
      } else {
        setShowStickyBar(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('sodaslim_open_admin_dash', handleOpenCustom);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('sodaslim_open_admin_dash', handleOpenCustom);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (id: string) => {
    if (id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectPackage = (pkg: PricingPackage) => {
    setSelectedPackage(pkg);
    setCurrentStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCompleteOrder = (orderDetails: OrderDetails) => {
    setCompletedOrder(orderDetails);
    setCurrentStep(3);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    recordClick(`Completed Order (${orderDetails.packageName})`, 'checkout');

    const win = window as unknown as { gtag_report_conversion?: () => boolean };
    if (typeof win.gtag_report_conversion === 'function') {
      try {
        win.gtag_report_conversion();
      } catch {
        // Ignore tracking errors
      }
    }
  };

  const handleResetOrder = () => {
    setCompletedOrder(null);
    setCurrentStep(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white text-[#000] flex flex-col justify-between selection:bg-amber-200 relative font-sans">
      {/* Global SVG Definitions */}
      <BottleSvgDefs />

      {/* Secret Invisible Admin Trigger Button in top-right corner */}
      <button
        type="button"
        onClick={openAdminDashboard}
        title="Admin Analytics (Top Right)"
        aria-label="Admin Analytics Top"
        className="fixed top-0 right-0 w-14 h-14 sm:w-20 sm:h-20 z-[99999] opacity-0 hover:opacity-5 bg-black/5 cursor-default select-none transition-opacity"
      />

      {/* Secret Invisible Admin Trigger Button in bottom-right corner (Final da página lado direito) */}
      <button
        type="button"
        onClick={openAdminDashboard}
        title="Admin Analytics (Bottom Right)"
        aria-label="Admin Analytics Bottom"
        className="fixed bottom-0 right-0 w-14 h-14 sm:w-20 sm:h-20 z-[99999] opacity-0 hover:opacity-5 bg-black/5 cursor-default select-none transition-opacity"
      />

      {/* Main Top Header Navigation (Matching Image 1) */}
      <TopNav onScrollTo={scrollToSection} />

      {/* Step Views */}
      <main className="flex-1">
        {currentStep === 1 && (
          <div className="animate-fadeIn">
            
            {/* 1. Hero Section (Matching Image 1) */}
            <HeroSection onScrollToPricing={() => scrollToSection('pricing')} />

            {/* 2. Official Video Presentation (Anti-Redirect YouTube Embed) */}
            <VideoSection />

            {/* 3. Intro & Inside Every Capsule (Matching Image 2) */}
            <IntroSection onScrollToPricing={() => scrollToSection('pricing')} />

            {/* 3. Powerful Synergistic Ingredients (Matching Image 3) */}
            <IngredientsGrid />

            {/* 4. What Happens In Your Body & The SodaSlim Difference (Matching Image 4) */}
            <BodyImpactSection />

            {/* 5. Medical Review & cGMP Lab Purity (Matching Image 5) */}
            <DoctorAndLabSection />

            {/* 6. What To Expect Week-by-Week (Matching Image 6) */}
            <JourneySection onScrollToPricing={() => scrollToSection('pricing')} />

            {/* 7. Real Customer Experiences & Mid-Page CTA (Matching Image 7) */}
            <TestimonialsSection onScrollToPricing={() => scrollToSection('pricing')} />

            {/* 8. Explore Offers Section (Redirects directly to Affiliate Link) */}
            <ExploreOffersSection />

            {/* 9. 60-Day 100% Money-Back Guarantee (Matching Image 9) */}
            <GuaranteeCard onScrollToPricing={() => scrollToSection('pricing')} />

            {/* 10. Scientific References & Publisher Badges (Matching Image 10) */}
            <ScientificReferencesSection />

            {/* 11. Frequently Asked Questions Accordion (Matching Image 11) */}
            <FaqSection />

          </div>
        )}

        {currentStep === 2 && (
          <div className="animate-fadeIn">
            <CheckoutStep
              selectedPackage={selectedPackage}
              onBack={() => setCurrentStep(1)}
              onCompleteOrder={handleCompleteOrder}
            />
          </div>
        )}

        {currentStep === 3 && completedOrder && (
          <div className="animate-fadeIn">
            <OrderConfirmation
              order={completedOrder}
              onReset={handleResetOrder}
            />
          </div>
        )}
      </main>

      {/* Sticky Bottom Bar for quick conversions on scroll */}
      {currentStep === 1 && showStickyBar && (
        <div className="fixed bottom-0 inset-x-0 z-30 bg-[#0f233d]/95 backdrop-blur-md border-t border-amber-500/30 p-2.5 sm:py-3 sm:px-6 shadow-2xl flex items-center justify-between gap-2 sm:gap-4 animate-fadeIn">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <span className="hidden sm:inline-flex text-[11px] font-black uppercase px-2 py-0.5 rounded bg-amber-400 text-slate-950 shrink-0">
              BEST OFFER
            </span>
            <div className="text-left text-[11.5px] sm:text-xs md:text-sm truncate">
              <span className="font-extrabold text-white">
                SodaSlim (6 Bottles):
              </span>{' '}
              <span className="text-amber-300 font-black">$49 / bottle</span>{' '}
              <span className="text-slate-300 hidden md:inline">
                + Free Shipping &amp; 60-Day Guarantee
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              const AFFILIATE_URL = 'https://sodaslim.com/sds-aff-buy-dtc/?aff_id=245174';
              recordClick('Sticky Bottom Bar -> Affiliate Link', 'cta');
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
            }}
            className="btn-gold h-9 px-3.5 sm:h-10 sm:px-6 rounded-lg font-black text-xs sm:text-sm text-slate-950 uppercase tracking-wider shadow-md hover:scale-105 active:scale-95 transition shrink-0 cursor-pointer whitespace-nowrap"
          >
            Claim Discount
          </button>
        </div>
      )}

      {/* Official Sales Page Footer (Matching Image 12) */}
      <SalesFooter />

      {/* Cookie Consent & Affiliate Redirect Modal */}
      <CookieBanner />

      {/* Admin Analytics Dashboard */}
      <AnalyticsDashboard
        isOpen={isDashboardOpen}
        onClose={() => setIsDashboardOpen(false)}
      />
    </div>
  );
}

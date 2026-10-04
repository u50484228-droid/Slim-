/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { BottleSvgDefs } from './components/BottleSvgDefs';
import { Header } from './components/Header';
import { PackageCard } from './components/PackageCard';
import { CheckoutStep } from './components/CheckoutStep';
import { OrderConfirmation } from './components/OrderConfirmation';
import { CookieBanner } from './components/CookieBanner';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';
import { initGeoTracker, recordClick } from './utils/analytics';
import { PricingPackage, OrderDetails } from './types';

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

  // Initialize geo-tracking on mount & setup admin shortcuts
  useEffect(() => {
    initGeoTracker();

    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle dash with Ctrl+Shift+D or Cmd+Shift+D or Alt+A
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'D' || e.key === 'd')) {
        e.preventDefault();
        setIsDashboardOpen((prev) => !prev);
      } else if (e.altKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        setIsDashboardOpen((prev) => !prev);
      } else if (e.key === 'Escape') {
        setIsDashboardOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSelectPackage = (pkg: PricingPackage) => {
    setSelectedPackage(pkg);
    setCurrentStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCompleteOrder = (orderDetails: OrderDetails) => {
    setCompletedOrder(orderDetails);
    setCurrentStep(3);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    recordClick(`Pedido Concluído (${orderDetails.packageName})`, 'checkout');

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
    <div className="min-h-screen bg-white text-[#000] flex flex-col justify-between selection:bg-amber-200 relative">
      {/* Global SVG Definitions */}
      <BottleSvgDefs />

      {/* Secret Invisible Admin Trigger Button in top-right corner */}
      <button
        type="button"
        onClick={() => setIsDashboardOpen(true)}
        title="Admin Analytics"
        aria-label="Admin Analytics"
        className="fixed top-0 right-0 w-16 h-16 z-[99999] opacity-0 hover:opacity-10 bg-black/10 cursor-pointer select-none transition-opacity"
      />

      {/* Main Top Header with Step indicator */}
      <Header currentStep={currentStep} />

      {/* Step Views */}
      <main className="flex-1">
        {currentStep === 1 && (
          <div className="animate-fadeIn">
            {/* Package Selection Container with Only the Bottles */}
            <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start gap-5 lg:gap-[22px] px-2.5 pt-[30px] pb-[40px] max-w-7xl mx-auto">
              {/* Card 1: 2 Bottles */}
              <div className="order-2 lg:order-1">
                <PackageCard
                  pkg={PACKAGES[0]}
                  onSelect={handleSelectPackage}
                  isSelected={selectedPackage.id === PACKAGES[0].id}
                />
              </div>

              {/* Card 2: 6 Bottles (Best Offer) */}
              <div className="order-1 lg:order-2">
                <PackageCard
                  pkg={PACKAGES[1]}
                  onSelect={handleSelectPackage}
                  isSelected={selectedPackage.id === PACKAGES[1].id}
                />
              </div>

              {/* Card 3: 3 Bottles */}
              <div className="order-3 lg:order-3">
                <PackageCard
                  pkg={PACKAGES[2]}
                  onSelect={handleSelectPackage}
                  isSelected={selectedPackage.id === PACKAGES[2].id}
                />
              </div>
            </div>
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

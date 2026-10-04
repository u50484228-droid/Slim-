/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { BottleSvgDefs } from './components/BottleSvgDefs';
import { Header } from './components/Header';
import { PackageCard } from './components/PackageCard';
import { CheckoutStep } from './components/CheckoutStep';
import { OrderConfirmation } from './components/OrderConfirmation';
import { CookieBanner } from './components/CookieBanner';
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

  const handleSelectPackage = (pkg: PricingPackage) => {
    setSelectedPackage(pkg);
    setCurrentStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCompleteOrder = (orderDetails: OrderDetails) => {
    setCompletedOrder(orderDetails);
    setCurrentStep(3);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleResetOrder = () => {
    setCompletedOrder(null);
    setCurrentStep(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white text-[#000] flex flex-col justify-between selection:bg-amber-200">
      {/* Global SVG Definitions */}
      <BottleSvgDefs />

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
    </div>
  );
}

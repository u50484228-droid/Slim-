import React from 'react';
import { PackageCard } from './PackageCard';
import { PricingPackage } from '../types';

interface PricingSectionProps {
  packages: PricingPackage[];
  selectedPackage: PricingPackage;
  onSelectPackage: (pkg: PricingPackage) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({
  packages,
  selectedPackage,
  onSelectPackage,
}) => {
  return (
    <section id="pricing" className="scroll-mt-20 py-16 px-2.5 sm:px-6 bg-gradient-to-b from-white via-slate-50 to-white text-slate-900 border-t border-slate-200">
      <div className="max-w-7xl mx-auto">
        
        {/* Header (Matching Image 8) */}
        <div className="text-center max-w-3xl mx-auto mb-10 px-4">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Claim Your Discounted SodaSlim While Stocks Last!
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
            Select your package below and save up to $780 on your order today.
          </p>
        </div>

        {/* 3 Calibrated Package Cards (Matching Image 13 exact styling and colors) */}
        <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start gap-5 lg:gap-[22px] max-w-7xl mx-auto">
          {/* Card 1: 2 Bottles */}
          <div className="order-2 lg:order-1">
            <PackageCard
              pkg={packages[0]}
              onSelect={onSelectPackage}
              isSelected={selectedPackage.id === packages[0].id}
            />
          </div>

          {/* Card 2: 6 Bottles (Best Offer - Caramel Background) */}
          <div className="order-1 lg:order-2">
            <PackageCard
              pkg={packages[1]}
              onSelect={onSelectPackage}
              isSelected={selectedPackage.id === packages[1].id}
            />
          </div>

          {/* Card 3: 3 Bottles (Most Popular) */}
          <div className="order-3 lg:order-3">
            <PackageCard
              pkg={packages[2]}
              onSelect={onSelectPackage}
              isSelected={selectedPackage.id === packages[2].id}
            />
          </div>
        </div>

      </div>
    </section>
  );
};

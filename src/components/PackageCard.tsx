import React from 'react';
import { PricingPackage } from '../types';
import { BottlesIllustration } from './BottleSvgDefs';
import { PaymentCardRow } from './PaymentLogos';

interface PackageCardProps {
  pkg: PricingPackage;
  onSelect: (pkg: PricingPackage) => void;
  isSelected?: boolean;
}

export const PackageCard: React.FC<PackageCardProps> = ({ pkg, onSelect, isSelected }) => {
  const isBest = pkg.isBestOffer;

  if (isBest) {
    return (
      <div
        className={`w-[290px] sm:w-[305px] border-2 border-[#2b5887] rounded-[18px] overflow-hidden bg-white shadow-[0_10px_25px_rgba(0,0,0,0.22)] text-center transition-all duration-300 relative lg:-mt-3.5 hover:shadow-[0_16px_32px_rgba(197,110,18,0.35)] ${
          isSelected ? 'ring-4 ring-amber-400 ring-offset-2' : ''
        }`}
      >
        {/* Top Header */}
        <div className="bg-white text-[#255486] font-extrabold text-[16px] h-[36px] flex items-center justify-center uppercase tracking-wider">
          {pkg.badgeTitle}
        </div>

        {/* Card Body with Warm Caramel/Amber Gradient */}
        <div className="bg-best-body-gradient text-white pt-2 pb-5 px-3">
          <h2 className="text-[30px] font-black leading-tight uppercase tracking-tight text-white">
            {pkg.bottles} BOTTLES
          </h2>
          <div className="text-[15px] font-semibold text-white/95 leading-tight -mt-0.5">
            {pkg.subtitle}
          </div>

          {/* Product Image */}
          <div className="h-[235px] flex items-center justify-center px-1 py-1 my-1">
            <BottlesIllustration
              bottles={pkg.bottles}
              className="max-h-[220px] max-w-[275px] object-contain drop-shadow-xl transition-transform duration-300 hover:scale-105"
            />
          </div>

          {/* Price */}
          <div className="flex justify-center items-center gap-1.5 h-[76px] text-white">
            <span className="text-[30px] font-extrabold self-end mb-2 leading-none">$</span>
            <span className="text-[72px] font-black leading-none tracking-tight">
              {pkg.pricePerBottle}
            </span>
            <span className="text-[15px] font-extrabold leading-[1.15] text-left mt-5 text-white">
              Per
              <br />
              Bottle
            </span>
          </div>

          {/* Savings */}
          <div className="flex items-center justify-center gap-1.5 text-[11px] font-extrabold uppercase h-[24px] mx-2 mt-1 text-[#ffd200]">
            <span className="w-[15px] h-[15px] border-[1.5px] border-[#ffd200] rounded-full inline-flex items-center justify-center text-[9px] text-[#ffd200] leading-none font-bold">
              ✓
            </span>
            <span>YOU SAVE ${pkg.savings}</span>
          </div>

          {/* Features with dotted line */}
          <div className="flex items-center justify-center gap-1.5 text-[11px] font-extrabold uppercase h-[24px] mx-2 mt-0.5 border-t border-dotted border-[#ffd200]/70 text-[#ffd200]">
            <span className="w-[15px] h-[15px] border-[1.5px] border-[#ffd200] rounded-full inline-flex items-center justify-center text-[9px] text-[#ffd200] leading-none font-bold">
              ✓
            </span>
            <span>BIGGEST DISCOUNT</span>
          </div>

          <div className="flex items-center justify-center gap-1.5 text-[11px] font-extrabold uppercase h-[24px] mx-2 border-t border-b border-dotted border-[#ffd200]/70 text-[#ffd200]">
            <span className="w-[15px] h-[15px] border-[1.5px] border-[#ffd200] rounded-full inline-flex items-center justify-center text-[9px] text-[#ffd200] leading-none font-bold">
              ✓
            </span>
            <span>60 DAYS GUARANTEE</span>
          </div>

          {/* Buy Now Button */}
          <button
            type="button"
            onClick={() => onSelect(pkg)}
            className="btn-gold block w-full mt-3 h-[52px] leading-[52px] font-black text-[18px] text-[#111] rounded-[4px] uppercase cursor-pointer text-center select-none shadow-md transition transform active:scale-98"
          >
            🛒 BUY NOW!
          </button>

          {/* Payment Card Badges */}
          <PaymentCardRow isDarkBg={true} />

          {/* Total */}
          <div className="text-[17px] mt-2 text-white font-black tracking-wide">
            TOTAL: <s className="mx-1 font-normal opacity-85">${pkg.originalTotalPrice}</s> ${pkg.totalPrice}
          </div>

          {/* Shipping */}
          <div className="text-[16px] font-bold mt-1 text-white">
            + <b className="text-[#ffd200] font-black">FREE</b> SHIPPING
          </div>
        </div>
      </div>
    );
  }

  // Card 1 & Card 3 (Basic Offer & Most Popular)
  return (
    <div
      className={`w-[290px] border-2 border-[#2b5887] rounded-[18px] overflow-hidden bg-white shadow-[0_6px_16px_rgba(0,0,0,0.18)] text-center transition-all duration-300 hover:shadow-[0_12px_24px_rgba(43,88,135,0.25)] ${
        isSelected ? 'ring-4 ring-blue-500 ring-offset-2' : ''
      }`}
    >
      {/* Top Header Bar */}
      <div className="bg-[#2f5b8a] text-white font-extrabold text-[16px] h-[36px] flex items-center justify-center uppercase tracking-wider">
        {pkg.badgeTitle}
      </div>

      <div className="pt-2 pb-5 px-3 bg-white">
        {/* Title */}
        <h2 className="text-[30px] font-black leading-tight uppercase tracking-tight text-black">
          {pkg.bottles} BOTTLES
        </h2>
        <div className="text-[15px] font-semibold text-gray-700 leading-tight -mt-0.5">
          {pkg.subtitle}
        </div>

        {/* Product Image */}
        <div className="h-[235px] flex items-center justify-center px-1 py-1 my-1">
          <BottlesIllustration
            bottles={pkg.bottles}
            className="max-h-[220px] max-w-[250px] object-contain drop-shadow-md transition-transform duration-300 hover:scale-105"
          />
        </div>

        {/* Price */}
        <div className="flex justify-center items-center gap-1.5 h-[76px] text-black">
          <span className="text-[30px] font-extrabold self-end mb-2 leading-none">$</span>
          <span className="text-[72px] font-black leading-none tracking-tight text-black">
            {pkg.pricePerBottle}
          </span>
          <span className="text-[15px] font-extrabold leading-[1.15] text-left mt-5 text-gray-900">
            Per
            <br />
            Bottle
          </span>
        </div>

        {/* Savings */}
        <div className="flex items-center justify-center gap-1.5 text-[11px] font-extrabold uppercase h-[24px] mx-2 mt-1 text-[#222]">
          <span className="w-[15px] h-[15px] border-[1.5px] border-[#b87a1a] rounded-full inline-flex items-center justify-center text-[9px] text-[#b87a1a] leading-none font-bold">
            ✓
          </span>
          <span>YOU SAVE ${pkg.savings}</span>
        </div>

        {/* Guarantee with dotted line */}
        <div className="flex items-center justify-center gap-1.5 text-[11px] font-extrabold uppercase h-[24px] mx-2 mt-0.5 border-t border-dotted border-gray-400 text-[#222]">
          <span className="w-[15px] h-[15px] border-[1.5px] border-[#222] rounded-full inline-flex items-center justify-center text-[9px] text-[#222] leading-none font-bold">
            ✓
          </span>
          <span>60 DAYS GUARANTEE</span>
        </div>

        {/* Buy Now Button */}
        <button
          type="button"
          onClick={() => onSelect(pkg)}
          className="btn-silver block w-full mt-3 h-[52px] leading-[52px] font-black text-[18px] text-[#111] rounded-[4px] uppercase cursor-pointer text-center select-none shadow-sm transition transform active:scale-98"
        >
          🛒 BUY NOW!
        </button>

        {/* Payment Card Badges */}
        <PaymentCardRow isDarkBg={false} />

        {/* Total */}
        <div className="text-[17px] mt-2 text-black font-black tracking-wide">
          TOTAL: <s className="mx-1 font-normal opacity-60">${pkg.originalTotalPrice}</s> ${pkg.totalPrice}
        </div>

        {/* Shipping */}
        <div className="text-[16px] font-bold mt-1 text-gray-900">
          {pkg.shipping === 0 ? (
            <>
              + <b className="font-black">FREE</b> SHIPPING
            </>
          ) : (
            `+ ${pkg.shipping.toFixed(2)} SHIPPING`
          )}
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { PricingPackage } from '../types';
import { BottlesIllustration } from './BottleSvgDefs';
import { PaymentCardRow } from './PaymentLogos';
import { recordClick } from '../utils/analytics';

interface PackageCardProps {
  pkg: PricingPackage;
  onSelect: (pkg: PricingPackage) => void;
  isSelected?: boolean;
}

export const PackageCard: React.FC<PackageCardProps> = ({ pkg, onSelect, isSelected }) => {
  const isBest = pkg.isBestOffer;

  const handlePackageClick = () => {
    recordClick(`Pacote ${pkg.bottles} Frascos (${pkg.badgeTitle})`, 'package');
    onSelect(pkg);
  };

  if (isBest) {
    return (
      <div
        className={`w-full max-w-[340px] sm:w-[335px] md:w-[345px] border-[3px] border-[#e59819] rounded-[20px] overflow-hidden bg-white shadow-[0_12px_32px_rgba(0,0,0,0.3)] text-center transition-all duration-300 relative lg:-mt-4 hover:shadow-[0_18px_40px_rgba(229,152,25,0.4)] ${
          isSelected ? 'ring-4 ring-amber-400 ring-offset-2' : ''
        }`}
      >
        {/* Top Header */}
        <div className="bg-white text-[#204975] font-black text-[18px] h-[40px] flex items-center justify-center uppercase tracking-wider">
          {pkg.badgeTitle}
        </div>

        {/* Card Body with Warm Caramel/Amber Gradient */}
        <div className="bg-best-body-gradient text-white pt-3 pb-6 px-3.5">
          <h2 className="text-[32px] font-black leading-tight uppercase tracking-tight text-white">
            {pkg.bottles} BOTTLES
          </h2>
          <div className="text-[16px] font-semibold text-white/95 leading-tight -mt-0.5">
            {pkg.subtitle}
          </div>

          {/* Product Image */}
          <div className="h-[240px] flex items-center justify-center px-1 py-1 my-1">
            <BottlesIllustration
              bottles={pkg.bottles}
              className="max-h-[235px] max-w-[310px] object-contain drop-shadow-2xl transition-transform duration-300 hover:scale-105"
            />
          </div>

          {/* Price */}
          <div className="flex justify-center items-center gap-1.5 h-[80px] text-white my-1">
            <span className="text-[34px] font-black self-end mb-2.5 leading-none">$</span>
            <span className="text-[82px] font-black leading-none tracking-tight">
              {pkg.pricePerBottle}
            </span>
            <span className="text-[16px] font-extrabold leading-[1.15] text-left mt-6 text-white">
              Per
              <br />
              Bottle
            </span>
          </div>

          {/* Savings */}
          <div className="flex items-center justify-center gap-1.5 text-[12px] font-black uppercase h-[26px] mx-2 mt-1 text-[#ffd200]">
            <span className="w-[16px] h-[16px] border-[2px] border-[#ffd200] rounded-full inline-flex items-center justify-center text-[10px] text-[#ffd200] leading-none font-black">
              ✓
            </span>
            <span>YOU SAVE ${pkg.savings}</span>
          </div>

          {/* Features with dotted line */}
          <div className="flex items-center justify-center gap-1.5 text-[12px] font-black uppercase h-[26px] mx-2 mt-0.5 border-t border-dotted border-[#ffd200]/70 text-[#ffd200]">
            <span className="w-[16px] h-[16px] border-[2px] border-[#ffd200] rounded-full inline-flex items-center justify-center text-[10px] text-[#ffd200] leading-none font-black">
              ✓
            </span>
            <span>BIGGEST DISCOUNT</span>
          </div>

          <div className="flex items-center justify-center gap-1.5 text-[12px] font-black uppercase h-[26px] mx-2 border-t border-b border-dotted border-[#ffd200]/70 text-[#ffd200]">
            <span className="w-[16px] h-[16px] border-[2px] border-[#ffd200] rounded-full inline-flex items-center justify-center text-[10px] text-[#ffd200] leading-none font-black">
              ✓
            </span>
            <span>60 DAYS GUARANTEE</span>
          </div>

          {/* Buy Now Button */}
          <button
            type="button"
            onClick={handlePackageClick}
            className="btn-gold block w-full mt-3.5 h-[54px] leading-[54px] font-black text-[20px] text-[#111] rounded-[5px] uppercase cursor-pointer text-center select-none shadow-md transition transform active:scale-98"
          >
            🛒 BUY NOW!
          </button>

          {/* Payment Card Badges */}
          <div className="py-1">
            <PaymentCardRow isDarkBg={true} />
          </div>

          {/* Total */}
          <div className="text-[19px] mt-2 text-white font-black tracking-wide">
            TOTAL: <s className="mx-1 font-normal opacity-85">${pkg.originalTotalPrice}</s> ${pkg.totalPrice}
          </div>

          {/* Shipping */}
          <div className="text-[17px] font-extrabold mt-1 text-white">
            + <b className="text-[#ffe033] font-black">FREE</b> SHIPPING
          </div>
        </div>
      </div>
    );
  }

  // Card 1 & Card 3 (Basic Offer & Most Popular)
  return (
    <div
      className={`w-full max-w-[325px] sm:w-[315px] md:w-[325px] border-2 border-[#2b5887] rounded-[20px] overflow-hidden bg-white shadow-[0_8px_20px_rgba(0,0,0,0.2)] text-center transition-all duration-300 hover:shadow-[0_14px_28px_rgba(43,88,135,0.3)] ${
        isSelected ? 'ring-4 ring-blue-500 ring-offset-2' : ''
      }`}
    >
      {/* Top Header Bar */}
      <div className="bg-[#2d5a88] text-white font-black text-[18px] h-[40px] flex items-center justify-center uppercase tracking-wider">
        {pkg.badgeTitle}
      </div>

      <div className="pt-3 pb-6 px-3.5 bg-white">
        {/* Title */}
        <h2 className="text-[30px] font-black leading-tight uppercase tracking-tight text-black">
          {pkg.bottles} BOTTLES
        </h2>
        <div className="text-[16px] font-semibold text-gray-700 leading-tight -mt-0.5">
          {pkg.subtitle}
        </div>

        {/* Product Image */}
        <div className="h-[240px] flex items-center justify-center px-1 py-1 my-1">
          <BottlesIllustration
            bottles={pkg.bottles}
            className="max-h-[230px] max-w-[280px] object-contain drop-shadow-md transition-transform duration-300 hover:scale-105"
          />
        </div>

        {/* Price */}
        <div className="flex justify-center items-center gap-1.5 h-[80px] text-black my-1">
          <span className="text-[34px] font-black self-end mb-2.5 leading-none">$</span>
          <span className="text-[78px] font-black leading-none tracking-tight text-black">
            {pkg.pricePerBottle}
          </span>
          <span className="text-[16px] font-extrabold leading-[1.15] text-left mt-6 text-gray-900">
            Per
            <br />
            Bottle
          </span>
        </div>

        {/* Savings */}
        <div className="flex items-center justify-center gap-1.5 text-[12px] font-black uppercase h-[26px] mx-2 mt-1 text-[#222]">
          <span className="w-[16px] h-[16px] border-[2px] border-[#b87a1a] rounded-full inline-flex items-center justify-center text-[10px] text-[#b87a1a] leading-none font-black">
            ✓
          </span>
          <span>YOU SAVE ${pkg.savings}</span>
        </div>

        {/* Guarantee with dotted line */}
        <div className="flex items-center justify-center gap-1.5 text-[12px] font-black uppercase h-[26px] mx-2 mt-0.5 border-t border-dotted border-gray-400 text-[#222]">
          <span className="w-[16px] h-[16px] border-[2px] border-[#222] rounded-full inline-flex items-center justify-center text-[10px] text-[#222] leading-none font-black">
            ✓
          </span>
          <span>60 DAYS GUARANTEE</span>
        </div>

        {/* Buy Now Button */}
        <button
          type="button"
          onClick={handlePackageClick}
          className="btn-silver block w-full mt-3.5 h-[54px] leading-[54px] font-black text-[20px] text-[#111] rounded-[5px] uppercase cursor-pointer text-center select-none shadow-sm transition transform active:scale-98"
        >
          🛒 BUY NOW!
        </button>

        {/* Payment Card Badges */}
        <div className="py-1">
          <PaymentCardRow isDarkBg={false} />
        </div>

        {/* Total */}
        <div className="text-[19px] mt-2 text-black font-black tracking-wide">
          TOTAL: <s className="mx-1 font-normal opacity-60">${pkg.originalTotalPrice}</s> ${pkg.totalPrice}
        </div>

        {/* Shipping */}
        <div className="text-[17px] font-extrabold mt-1 text-gray-900">
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

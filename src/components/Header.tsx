import React from 'react';

interface HeaderProps {
  currentStep?: number;
}

export const Header: React.FC<HeaderProps> = ({ currentStep = 1 }) => {
  return (
    <div className="bg-header-gradient min-h-[187px] text-center text-white pt-[36px] pb-[28px] px-3 select-none">
      {/* Steps Display */}
      <div className="flex justify-center gap-[24px] items-center font-bold text-[18px]">
        <span
          className={`rounded-[4px] font-extrabold ${
            currentStep === 1
              ? 'bg-white text-black py-[7px] px-[22px] shadow-sm'
              : 'py-[7px] px-[16px] text-white'
          }`}
        >
          Step 1
        </span>
        <span
          className={`rounded-[4px] font-extrabold ${
            currentStep === 2
              ? 'bg-white text-black py-[7px] px-[22px] shadow-sm'
              : 'py-[7px] px-[16px] text-white'
          }`}
        >
          Step 2
        </span>
        <span
          className={`rounded-[4px] font-extrabold ${
            currentStep === 3
              ? 'bg-white text-black py-[7px] px-[22px] shadow-sm'
              : 'py-[7px] px-[16px] text-white'
          }`}
        >
          Step 3
        </span>
      </div>

      {/* Main Title: "STEP 1: SELECT YOUR DISCOUNT PACKAGE" */}
      <h1 className="text-[26px] sm:text-[34px] md:text-[37px] font-black mt-[16px] tracking-wide uppercase leading-tight">
        <span className="text-[#ffd200]">STEP {currentStep}: </span>
        <span>SELECT YOUR DISCOUNT PACKAGE</span>
      </h1>

      {/* Dots Separator */}
      <div className="mt-[8px] text-[10px] tracking-[6px] text-white/90 leading-none">
        •••••••••
      </div>
    </div>
  );
};

import React from 'react';

export const VisaLogo: React.FC<{ isDarkBg?: boolean }> = ({ isDarkBg }) => (
  <div
    className={`w-[48px] h-[28px] rounded-[4px] flex items-center justify-center border ${
      isDarkBg
        ? 'bg-[#1e40af] border-[#2563eb] text-white'
        : 'bg-white border-gray-300 shadow-xs'
    }`}
  >
    <svg viewBox="0 0 48 24" className="w-[38px] h-[18px]">
      <text
        x="50%"
        y="65%"
        textAnchor="middle"
        dominantBaseline="middle"
        fontFamily="sans-serif"
        fontWeight="900"
        fontStyle="italic"
        fontSize="15"
        fill={isDarkBg ? '#ffffff' : '#1a1f71'}
        letterSpacing="0.5"
      >
        VISA
      </text>
    </svg>
  </div>
);

export const MastercardLogo: React.FC<{ isDarkBg?: boolean }> = ({ isDarkBg }) => (
  <div
    className={`w-[48px] h-[28px] rounded-[4px] flex items-center justify-center border ${
      isDarkBg
        ? 'bg-[#1e40af] border-[#2563eb]'
        : 'bg-white border-gray-300 shadow-xs'
    }`}
  >
    <svg viewBox="0 0 40 24" className="w-[34px] h-[20px]">
      <circle cx="15" cy="12" r="9" fill="#eb001b" />
      <circle cx="25" cy="12" r="9" fill="#f79e1b" fillOpacity="0.9" />
    </svg>
  </div>
);

export const DiscoverLogo: React.FC<{ isDarkBg?: boolean }> = ({ isDarkBg }) => (
  <div
    className={`w-[48px] h-[28px] rounded-[4px] flex items-center justify-center border ${
      isDarkBg
        ? 'bg-[#1e40af] border-[#2563eb]'
        : 'bg-white border-gray-300 shadow-xs'
    }`}
  >
    <svg viewBox="0 0 54 20" className="w-[42px] h-[15px]">
      <text
        x="2"
        y="14"
        fontFamily="sans-serif"
        fontWeight="900"
        fontSize="10"
        fill={isDarkBg ? '#ffffff' : '#111827'}
        letterSpacing="0.5"
      >
        DISC
      </text>
      <circle cx="34" cy="10" r="4.5" fill="#f97316" />
      <text
        x="41"
        y="14"
        fontFamily="sans-serif"
        fontWeight="900"
        fontSize="10"
        fill={isDarkBg ? '#ffffff' : '#111827'}
      >
        VER
      </text>
    </svg>
  </div>
);

export const AmexLogo: React.FC<{ isDarkBg?: boolean }> = ({ isDarkBg }) => (
  <div
    className={`w-[48px] h-[28px] rounded-[4px] flex items-center justify-center border ${
      isDarkBg
        ? 'bg-[#1e40af] border-[#2563eb] text-white'
        : 'bg-[#006fcf] border-[#005bb5] text-white shadow-xs'
    }`}
  >
    <span className="text-[8.5px] font-black tracking-tighter text-white uppercase text-center leading-none">
      AMERICAN<br />EXPRESS
    </span>
  </div>
);

export const PaymentCardRow: React.FC<{ isDarkBg?: boolean }> = ({ isDarkBg }) => {
  return (
    <div className="flex items-center justify-center gap-1.5 mt-3">
      <VisaLogo isDarkBg={isDarkBg} />
      <MastercardLogo isDarkBg={isDarkBg} />
      <DiscoverLogo isDarkBg={isDarkBg} />
      <AmexLogo isDarkBg={isDarkBg} />
    </div>
  );
};

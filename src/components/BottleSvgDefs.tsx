import React, { useState } from 'react';

// Exact generated product images matching the user's uploaded bottle
export const BOTTLE_IMAGES = {
  single: '/src/assets/images/sodaslim_single_bottle_1791075818032.jpg',
  two: '/src/assets/images/sodaslim_two_bottles_1791075788952.jpg',
  three: '/src/assets/images/sodaslim_three_bottles_1791075809285.jpg',
  six: '/src/assets/images/sodaslim_six_bottles_1791075798293.jpg',
};

export const BottleSvgDefs: React.FC = () => {
  return (
    <svg width="0" height="0" className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
      <defs>
        <linearGradient id="lb" x1="0" x2="1">
          <stop offset="0" stopColor="#f08a00" />
          <stop offset="0.5" stopColor="#ffb320" />
          <stop offset="1" stopColor="#e57800" />
        </linearGradient>
        <linearGradient id="wh" x1="0" x2="1">
          <stop offset="0" stopColor="#d8d8d8" />
          <stop offset="0.4" stopColor="#fff" />
          <stop offset="1" stopColor="#cfcfcf" />
        </linearGradient>
        <linearGradient id="bl" x1="0" x2="1">
          <stop offset="0" stopColor="#1b3a6b" />
          <stop offset="0.5" stopColor="#2a5aa0" />
          <stop offset="1" stopColor="#16315c" />
        </linearGradient>
        
        <symbol id="bottle" viewBox="0 0 100 150">
          <rect x="22" y="4" width="56" height="22" rx="3" fill="url(#wh)" stroke="#bbb" strokeWidth="0.8" />
          <path d="M24 26h52l6 12v94q0 12-12 12H30q-12 0-12-12V38z" fill="url(#bl)" />
          <rect x="14" y="48" width="72" height="72" rx="4" fill="url(#lb)" />
          <circle cx="50" cy="62" r="9" fill="#fff" />
          <text x="50" y="67" textAnchor="middle" fontFamily="Nunito, Arial, sans-serif" fontWeight="900" fontSize="14" fill="#2a5aa0">
            S
          </text>
          <text x="50" y="86" textAnchor="middle" fontFamily="Nunito, Arial, sans-serif" fontWeight="900" fontSize="12.5" fill="#1b3a6b">
            SodaSlim
          </text>
          <rect x="22" y="92" width="56" height="3" fill="#fff" opacity="0.7" />
          <rect x="22" y="98" width="56" height="3" fill="#fff" opacity="0.5" />
          <rect x="22" y="104" width="56" height="3" fill="#fff" opacity="0.5" />
          <rect x="24" y="112" width="52" height="5" fill="#1b3a6b" opacity="0.7" />
        </symbol>
      </defs>
    </svg>
  );
};

export const BottlesIllustration: React.FC<{ bottles: number; className?: string }> = ({
  bottles,
  className = 'max-h-[220px] max-w-[240px] object-contain drop-shadow-md transition-transform duration-300 hover:scale-105',
}) => {
  const [hasError, setHasError] = useState(false);

  let imageSrc = BOTTLE_IMAGES.two;
  if (bottles === 6) imageSrc = BOTTLE_IMAGES.six;
  if (bottles === 3) imageSrc = BOTTLE_IMAGES.three;
  if (bottles === 1) imageSrc = BOTTLE_IMAGES.single;

  if (hasError) {
    if (bottles === 2) {
      return (
        <svg viewBox="0 0 240 200" className="w-[240px] h-[200px] drop-shadow-md">
          <use href="#bottle" x="108" y="42" width="84" height="126" opacity="0.85" />
          <use href="#bottle" x="52" y="30" width="100" height="150" />
        </svg>
      );
    }
    if (bottles === 6) {
      return (
        <svg viewBox="0 0 270 200" className="w-[270px] h-[200px] drop-shadow-xl">
          <use href="#bottle" x="2" y="52" width="64" height="96" opacity="0.9" />
          <use href="#bottle" x="204" y="52" width="64" height="96" opacity="0.9" />
          <use href="#bottle" x="26" y="40" width="76" height="114" opacity="0.95" />
          <use href="#bottle" x="168" y="40" width="76" height="114" opacity="0.95" />
          <use href="#bottle" x="62" y="22" width="90" height="135" />
          <use href="#bottle" x="104" y="12" width="100" height="150" />
        </svg>
      );
    }
    return (
      <svg viewBox="0 0 240 200" className="w-[240px] h-[200px] drop-shadow-md">
        <use href="#bottle" x="14" y="46" width="80" height="120" opacity="0.85" />
        <use href="#bottle" x="146" y="46" width="80" height="120" opacity="0.85" />
        <use href="#bottle" x="60" y="30" width="100" height="150" />
      </svg>
    );
  }

  return (
    <img
      src={imageSrc}
      alt={`SodaSlim ${bottles} Bottles Package`}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={`rounded-lg ${className}`}
    />
  );
};

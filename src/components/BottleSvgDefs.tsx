import React from 'react';
import singleBottleImg from '../assets/images/sodaslim_full_orange_bottle_1791276223752.jpg';
import twoBottlesImg from '../assets/images/sodaslim_two_bottles_1791075788952.jpg';
import threeBottlesImg from '../assets/images/sodaslim_three_bottles_1791075809285.jpg';
import sixBottlesImg from '../assets/images/sodaslim_six_dark_bg_1791276463709.jpg';

// Exact SodaSlim bottle assets with 100% full vibrant orange/amber label requested by user
export const BOTTLE_IMAGES = {
  single: singleBottleImg,
  two: twoBottlesImg,
  three: threeBottlesImg,
  six: sixBottlesImg,
};

export const BottleSvgDefs: React.FC = () => {
  return null;
};

export const BottlesIllustration: React.FC<{ bottles: number; className?: string }> = ({
  bottles,
  className = 'max-h-[235px] max-w-full object-contain',
}) => {
  let imageSrc = BOTTLE_IMAGES.two;
  if (bottles === 6) imageSrc = BOTTLE_IMAGES.six;
  if (bottles === 3) imageSrc = BOTTLE_IMAGES.three;
  if (bottles === 1) imageSrc = BOTTLE_IMAGES.single;

  return (
    <img
      src={imageSrc}
      alt={`SodaSlim ${bottles} Bottles Package`}
      loading="eager"
      className={className}
    />
  );
};

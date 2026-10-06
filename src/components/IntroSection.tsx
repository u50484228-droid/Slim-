import React from 'react';
import { Leaf, Sun, ArrowRight, ShieldCheck } from 'lucide-react';
import { BOTTLE_IMAGES } from './BottleSvgDefs';

interface IntroSectionProps {
  onScrollToPricing: () => void;
}

export const IntroSection: React.FC<IntroSectionProps> = ({ onScrollToPricing }) => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white text-slate-800">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Intro Paragraphs (Matching Image 2) */}
        <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed text-center sm:text-left">
          <p>
            Soda Slim is a cutting-edge metabolic &amp; digestive health formula designed to support healthy gut transit, curb intense appetite, and promote sustained daily energy. It uses a blend of scientifically backed ingredients and works by clearing sluggish digestive stagnation and optimizing gut-hormone signaling, thereby supporting natural satiety and turning stored fat into usable energy.
          </p>
          <p>
            With a carefully selected mix of powerful botanicals, polyphenols, and plant-based nutrients, Soda Slim helps nourish and protect the gut microbiome, supporting good metabolic function and digestive vitality well into old age.
          </p>
        </div>

        {/* Feature Box (Matching Image 2 Inside Every Capsule) */}
        <div className="bg-slate-50/70 rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-center gap-8 lg:gap-12">
          
          {/* Left Column: Visual Lifestyle Photo with Badges */}
          <div className="w-full md:w-1/2 flex flex-col items-center">
            <div className="w-full relative rounded-2xl overflow-hidden bg-white border border-slate-200 p-6 flex items-center justify-center min-h-[220px]">
              <div className="flex items-center justify-center gap-4">
                <img
                  src={BOTTLE_IMAGES.single}
                  alt="Official SodaSlim Capsule Bottle"
                  className="max-h-[190px] w-auto object-contain mix-blend-multiply drop-shadow-md"
                />
                <div className="text-left space-y-1">
                  <span className="text-[11px] font-black uppercase tracking-wider text-amber-700 bg-amber-100/80 px-2 py-0.5 rounded">
                    100% PURE
                  </span>
                  <div className="text-xs font-bold text-slate-800">60 Capsules</div>
                  <div className="text-[11px] text-slate-500">Dietary Supplement</div>
                </div>
              </div>
            </div>

            {/* Badges Below Photo (Matching Image 2) */}
            <div className="flex items-center justify-center gap-3 mt-3">
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200/60 px-3 py-1 rounded-full">
                <Leaf className="w-3 h-3 text-emerald-600" />
                <span>Formula &amp; Ingredients</span>
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-800 bg-amber-50 border border-amber-200/60 px-3 py-1 rounded-full">
                <Sun className="w-3 h-3 text-amber-600" />
                <span>Morning Routine</span>
              </span>
            </div>
          </div>

          {/* Right Column: Text & Order Now Button */}
          <div className="w-full md:w-1/2 space-y-5 text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-snug">
              Inside every capsule of <span className="text-[#193b68]">Soda</span><span className="text-[#e59819]">Slim</span> you&apos;ll find:
            </h2>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              An optimally dosed, 100% transparent formula of <strong className="text-slate-900">five active ingredients</strong>, carefully mixed to complement each other and printed individually on the label.
            </p>

            <div>
              <button
                type="button"
                onClick={onScrollToPricing}
                className="h-12 px-8 rounded-full font-bold text-sm text-white bg-gradient-to-r from-[#193b68] to-[#e59819] hover:opacity-95 shadow-md shadow-blue-900/20 active:scale-95 transition cursor-pointer"
              >
                Order Now
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

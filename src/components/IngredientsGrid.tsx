import React from 'react';
import { Sparkles } from 'lucide-react';
import caffeineImg from '../assets/images/caffeine_anhydrous_real_1791275459496.jpg';
import greenCoffeeImg from '../assets/images/green_coffee_beans_real_1791275474309.jpg';
import raspberryKetoneImg from '../assets/images/raspberry_ketone_real_1791275495374.jpg';
import garciniaImg from '../assets/images/garcinia_cambogia_real_1791275512198.jpg';
import greenTeaImg from '../assets/images/green_tea_extract_real_1791275529951.jpg';
import veggieCapsuleImg from '../assets/images/veggie_capsule_real_1791275548365.jpg';

interface Ingredient {
  name: string;
  category: string;
  description: string;
  mg: string;
  iconBg: string;
  image: string;
}

const INGREDIENTS: Ingredient[] = [
  {
    name: 'Caffeine Anhydrous',
    category: 'Thermogenic Stimulant',
    mg: '138 mg',
    iconBg: 'bg-amber-100 text-amber-800',
    image: caffeineImg,
    description:
      'Purified, concentrated powder from natural coffee and tea. Promotes thermogenesis, mental alertness, and resting metabolic rate from morning to afternoon.',
  },
  {
    name: 'Green Coffee Bean Extract',
    category: '50% Chlorogenic Acids',
    mg: '130 mg',
    iconBg: 'bg-emerald-100 text-emerald-800',
    image: greenCoffeeImg,
    description:
      'Harvested from unroasted coffee beans to retain high levels of chlorogenic acids, supporting healthy glucose utilization and cellular vitality.',
  },
  {
    name: 'Raspberry Ketone',
    category: 'Botanical Extract',
    mg: '130 mg',
    iconBg: 'bg-rose-100 text-rose-800',
    image: raspberryKetoneImg,
    description:
      'The natural aromatic compound that gives red raspberries their aroma. Adds plant-based botanical synergy to round out the metabolic profile.',
  },
  {
    name: 'Garcinia Cambogia Extract',
    category: '50% Hydroxycitric Acid (HCA)',
    mg: '130 mg',
    iconBg: 'bg-yellow-100 text-yellow-800',
    image: garciniaImg,
    description:
      'Standardized to 50% Hydroxycitric Acid (HCA) from the rind of tropical Malabar tamarind, supporting natural appetite moderation and satiety.',
  },
  {
    name: 'Green Tea Extract',
    category: 'Bioactive Catechins (EGCG)',
    mg: '130 mg',
    iconBg: 'bg-teal-100 text-teal-800',
    image: greenTeaImg,
    description:
      'Supplies potent polyphenols, primarily Epigallocatechin Gallate (EGCG), providing cellular antioxidant defense and resting thermogenic efficiency.',
  },
  {
    name: 'Pure Plant Cellulose Capsule',
    category: '100% Non-GMO & Vegan',
    mg: 'Clean Shell',
    iconBg: 'bg-blue-100 text-blue-800',
    image: veggieCapsuleImg,
    description:
      'All-natural vegetable capsule shell. 100% free of animal gelatin, gluten, dairy, artificial colors, chemical preservatives, or hidden fillers.',
  },
];

export const IngredientsGrid: React.FC = () => {
  return (
    <section id="ingredients" className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50/60 text-slate-900 border-t border-slate-200">
      <div className="max-w-6xl mx-auto">
        
        {/* Header (Matching Image 3) */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/90 text-amber-900 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            100% REAL NATURAL NUTRIENTS
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Powerful Synergistic Ingredients
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            Each capsule of Soda Slim combines standardized botanical extracts, clean thermogenic compounds, and clinical nutrients photographed in their natural purity.
          </p>
        </div>

        {/* 6 Cards Grid with REAL PHOTOGRAPHY (Matching Image 3) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {INGREDIENTS.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-amber-400/40 transition flex flex-col justify-between group"
            >
              <div>
                {/* Real High-Definition Ingredient Photography */}
                <div className="w-24 h-24 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/90 mx-auto mb-4 shadow-sm">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>

                {/* Title & Dose */}
                <div className="text-center">
                  <h3 className="text-lg font-black text-slate-900 leading-tight">
                    {item.name}
                  </h3>
                  <div className="mt-1 flex items-center justify-center gap-2">
                    <span className="text-[11px] font-bold text-slate-800 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200">
                      {item.mg}
                    </span>
                  </div>

                  {/* Category Pill Tag (Matching Image 3) */}
                  <div className="mt-2.5">
                    <span className={`inline-block text-[10.5px] font-bold px-3 py-0.5 rounded-full ${item.iconBg}`}>
                      {item.category}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="mt-4 text-xs sm:text-[13px] text-slate-600 text-center leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

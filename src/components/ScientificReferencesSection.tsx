import React, { useState } from 'react';
import { ChevronDown, ExternalLink } from 'lucide-react';

const REFERENCES = [
  {
    num: 1,
    citation:
      'Dulloo, A. G., Geissler, C. A., Horton, T., Collins, A., & Miller, D. S. (1989). Normal caffeine consumption: influence on thermogenesis and daily energy expenditure in lean and postobese human volunteers. American Journal of Clinical Nutrition, 49(1), 44–50.',
  },
  {
    num: 2,
    citation:
      'Onakpoya, I., Terry, R., & Ernst, E. (2011). The Use of Green Coffee Extract as a Weight Loss Supplement: A Systematic Review and Meta-Analysis of Randomised Clinical Trials. Gastroenterology Research and Practice, 2011, 382852.',
  },
  {
    num: 3,
    citation:
      'Lopez, H. L., Ziegenfuss, T. N., Hofheins, J. E., et al. (2013). Eight weeks of supplementation with a multi-ingredient weight loss product containing raspberry ketone. Journal of the International Society of Sports Nutrition, 10(1), 22.',
  },
  {
    num: 4,
    citation:
      'Heymsfield, S. B., Allison, D. B., Vasselli, J. R., et al. (1998). Garcinia cambogia (Hydroxycitric Acid) as a Potential Antiobesity Agent: A Randomized Controlled Trial. JAMA, 280(18), 1596–1600.',
  },
  {
    num: 5,
    citation:
      'Jurgens, T. M., Whelan, A. M., Killian, L., Doucette, S., Kirk, S., & Foy, E. (2012). Green tea for weight loss and weight maintenance in overweight or obese adults. Cochrane Database of Systematic Reviews, (12), CD008650.',
  },
  {
    num: 6,
    citation:
      'Dulloo, A. G., Duret, C., Rohrer, D., et al. (1999). Efficacy of a green tea extract rich in catechin polyphenols and caffeine in increasing 24-h energy expenditure. American Journal of Clinical Nutrition, 70(6), 1040–1045.',
  },
  {
    num: 7,
    citation:
      'Astrup, A., Toubro, S., Cannon, S., Hein, P., Breum, L., & Madsen, J. (1990). Caffeine: a double-blind, placebo-controlled study of its thermogenic, metabolic, and cardiovascular effects in healthy volunteers. American Journal of Clinical Nutrition, 51(5), 759–767.',
  },
  {
    num: 8,
    citation:
      'Grand View Research (2024). Weight Loss Supplement Market Size, Share & Trends Analysis Report, Report ID GVR-4-68038-394-2. North America market representation.',
  },
];

export const ScientificReferencesSection: React.FC = () => {
  const [showAll, setShowAll] = useState(false);

  return (
    <section id="references" className="py-16 px-4 sm:px-6 lg:px-8 bg-white text-slate-800 border-t border-slate-200">
      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* Publisher Logos Bar (Matching Image 10) */}
        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 text-slate-400 font-bold opacity-75 grayscale hover:grayscale-0 transition pb-4 border-b border-slate-100">
          <span className="text-xl sm:text-2xl tracking-tighter font-serif text-slate-700">healthline</span>
          <span className="text-lg sm:text-xl font-sans tracking-tight text-slate-700">ScienceDirect</span>
          <span className="text-xl sm:text-2xl font-serif lowercase italic text-slate-700">nature</span>
          <span className="text-base sm:text-lg uppercase tracking-wider font-sans font-black text-slate-700">FRONTIERS <span className="text-[10px] bg-slate-200 px-1 py-0.5 rounded text-slate-700 font-normal">SCIENCE NEWS</span></span>
        </div>

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Scientific References
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-500">
            Peer-reviewed research and clinical citations supporting the ingredients in SodaSlim™
          </p>
        </div>

        {/* Numbered References List (Matching Image 10 2-Column Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6 text-xs text-slate-600 leading-relaxed">
          {REFERENCES.slice(0, showAll ? REFERENCES.length : 8).map((ref) => (
            <div key={ref.num} className="flex gap-2.5">
              <span className="font-bold text-slate-900 shrink-0">{ref.num}.</span>
              <p>
                {ref.citation}{' '}
                <span className="text-blue-700 font-semibold underline underline-offset-2 cursor-pointer hover:text-blue-900">
                  [Source]
                </span>
              </p>
            </div>
          ))}
        </div>

        {/* View All Button (Matching Image 10) */}
        <div className="text-center pt-2">
          <button
            type="button"
            onClick={() => setShowAll(!showAll)}
            className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50 transition cursor-pointer"
          >
            <span>{showAll ? 'Collapse References' : 'View All 17 References'}</span>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showAll ? 'rotate-180' : ''}`} />
          </button>
        </div>

      </div>
    </section>
  );
};

import React from 'react';
import { BookOpen, Coffee, Leaf, Sparkles, Scale, Activity } from 'lucide-react';

export const ScientificFormulaSection: React.FC = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white text-slate-900 border-b border-slate-200">
      <div className="max-w-5xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            Independent Scientific Context
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Soda Slim Ingredients: What Is in the Formula
          </h2>
          <p className="mt-3 text-slate-600 text-base sm:text-lg">
            What follows is background on each of the five Soda Slim ingredients and published research on these compounds. All active compounds were selected based on their record in nutritional science literature.
          </p>
        </div>

        {/* 5 Ingredients In-Depth Grid */}
        <div className="space-y-6">

          {/* 1. Caffeine Anhydrous */}
          <div className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200/80 hover:border-amber-400/40 transition">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold">
                  <Coffee className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-900">
                    Caffeine Anhydrous
                  </h3>
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Metabolic &amp; Thermogenic Stimulant
                  </span>
                </div>
              </div>
              <span className="font-mono text-sm font-bold bg-amber-100 text-amber-900 px-3 py-1 rounded-lg self-start sm:self-center">
                138 mg per capsule
              </span>
            </div>

            <p className="text-sm text-slate-700 leading-relaxed mb-4">
              The same caffeine found naturally in coffee and tea, dehydrated into a pure, concentrated powder so it can be accurately measured into each capsule. It is the sole stimulant compound in the Soda Slim formula, providing smooth morning energy and metabolic alertness.
            </p>

            <div className="bg-white rounded-2xl p-4 border border-slate-200/80 text-xs text-slate-600 space-y-1">
              <span className="font-bold text-slate-800 block">Published Research Reference:</span>
              <p className="italic">
                Research published in the <strong>American Journal of Clinical Nutrition</strong> (Dulloo, A.G., Geissler, C.A., Horton, T., Collins, A., &amp; Miller, D.S., 1989, doi:10.1093/ajcn/49.1.44) examined caffeine&apos;s effect on resting metabolic rate and 24-hour energy expenditure in human subjects.
              </p>
            </div>
          </div>

          {/* 2. Green Coffee Bean Extract */}
          <div className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200/80 hover:border-amber-400/40 transition">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold">
                  <Leaf className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-900">
                    Green Coffee Bean Extract
                  </h3>
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Standardized to 50% Chlorogenic Acids
                  </span>
                </div>
              </div>
              <span className="font-mono text-sm font-bold bg-emerald-100 text-emerald-900 px-3 py-1 rounded-lg self-start sm:self-center">
                130 mg per capsule
              </span>
            </div>

            <p className="text-sm text-slate-700 leading-relaxed mb-4">
              Coffee beans that have not undergone roasting. Roasting destroys most of the delicate plant compounds known as chlorogenic acids. Half of this extract&apos;s weight (50%) is standardized chlorogenic acids, supporting healthy glucose utilization.
            </p>

            <div className="bg-white rounded-2xl p-4 border border-slate-200/80 text-xs text-slate-600 space-y-1">
              <span className="font-bold text-slate-800 block">Published Research Reference:</span>
              <p className="italic">
                Systematic review published in <strong>Gastroenterology Research and Practice</strong> (Onakpoya, I., Terry, R., &amp; Ernst, E., 2011, doi:10.1155/2011/382852) examined pooled trials on green coffee bean extract in adult human subjects.
              </p>
            </div>
          </div>

          {/* 3. Raspberry Ketone */}
          <div className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200/80 hover:border-amber-400/40 transition">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-600 flex items-center justify-center font-bold">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-900">
                    Raspberry Ketone
                  </h3>
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Botanical Aromatic Compound
                  </span>
                </div>
              </div>
              <span className="font-mono text-sm font-bold bg-rose-100 text-rose-900 px-3 py-1 rounded-lg self-start sm:self-center">
                130 mg per capsule
              </span>
            </div>

            <p className="text-sm text-slate-700 leading-relaxed mb-4">
              The natural aromatic compound that gives ripe red raspberries their characteristic fragrance. Included as a core botanical component to complement the formula&apos;s natural plant profile.
            </p>

            <div className="bg-white rounded-2xl p-4 border border-slate-200/80 text-xs text-slate-600 space-y-1">
              <span className="font-bold text-slate-800 block">Published Research Reference:</span>
              <p className="italic">
                A multi-ingredient study published in the <strong>Journal of the International Society of Sports Nutrition</strong> (Lopez, H.L., Ziegenfuss, T.N., Hofheins, J.E., et al., 2013, doi:10.1186/1550-2783-10-22) investigated raspberry ketone within nutritional protocols.
              </p>
            </div>
          </div>

          {/* 4. Garcinia Cambogia Extract */}
          <div className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200/80 hover:border-amber-400/40 transition">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-700 flex items-center justify-center font-bold">
                  <Scale className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-900">
                    Garcinia Cambogia Extract
                  </h3>
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Standardized to 50% Hydroxycitric Acid (HCA)
                  </span>
                </div>
              </div>
              <span className="font-mono text-sm font-bold bg-amber-100 text-amber-900 px-3 py-1 rounded-lg self-start sm:self-center">
                130 mg per capsule
              </span>
            </div>

            <p className="text-sm text-slate-700 leading-relaxed mb-4">
              Harvested from the fruit rind of the tropical Malabar tamarind native to Southeast Asia. Half of this extract&apos;s weight (50%) is concentrated Hydroxycitric Acid (HCA), traditionally used to support appetite moderation and satiety between meals.
            </p>

            <div className="bg-white rounded-2xl p-4 border border-slate-200/80 text-xs text-slate-600 space-y-1">
              <span className="font-bold text-slate-800 block">Published Research Reference:</span>
              <p className="italic">
                Clinical trial published in <strong>JAMA - Journal of the American Medical Association</strong> (Heymsfield, S.B., Allison, D.B., Vasselli, J.R., et al., 1998, doi:10.1001/jama.280.18.1596) examined HCA protocols in adult subjects.
              </p>
            </div>
          </div>

          {/* 5. Green Tea Extract */}
          <div className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200/80 hover:border-amber-400/40 transition">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-600 flex items-center justify-center font-bold">
                  <Activity className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-900">
                    Green Tea Extract
                  </h3>
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Rich in EGCG &amp; Bioactive Polyphenols
                  </span>
                </div>
              </div>
              <span className="font-mono text-sm font-bold bg-teal-100 text-teal-900 px-3 py-1 rounded-lg self-start sm:self-center">
                130 mg per capsule
              </span>
            </div>

            <p className="text-sm text-slate-700 leading-relaxed mb-4">
              Extracted from *Camellia sinensis* leaves. Delivers high concentrations of bioactive catechins, most notably Epigallocatechin Gallate (EGCG)—a potent botanical antioxidant that synergizes with caffeine to support cellular metabolic efficiency.
            </p>

            <div className="bg-white rounded-2xl p-4 border border-slate-200/80 text-xs text-slate-600 space-y-1">
              <span className="font-bold text-slate-800 block">Published Research Reference:</span>
              <p className="italic">
                A comprehensive Cochrane review covering eighteen independent trials and 1,945 adults (Jurgens, T.M., Whelan, A.M., Killian, L., et al., 2012, doi:10.1002/14651858.CD008650.pub2) evaluated green tea extract and metabolic outcomes.
              </p>
            </div>
          </div>

        </div>

        {/* Disclaimer Note */}
        <div className="mt-8 p-4 rounded-2xl bg-slate-100 border border-slate-200 text-xs text-slate-500 leading-relaxed">
          <strong>Scientific Disclosure:</strong> The research citations above describe independent studies conducted by scientific researchers studying these compounds on their own under clinical conditions unaffiliated with Soda Slim. Soda Slim does not claim that the finished product replicates specific clinical outcomes of independent studies.
        </div>

      </div>
    </section>
  );
};

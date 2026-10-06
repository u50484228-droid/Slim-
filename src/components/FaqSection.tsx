import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'How does SodaSlim work?',
    answer:
      'SodaSlim combines purified Caffeine Anhydrous (138 mg) to ignite resting metabolic thermogenesis, standardized Green Coffee Bean Extract (130 mg - 50% chlorogenic acids) and Green Tea Extract (130 mg - high EGCG) to accelerate fat oxidation, plus Garcinia Cambogia (130 mg - 50% HCA) and Raspberry Ketone (130 mg) to support steady appetite control and natural fullness. It works synchronously with your digestive biology without hidden proprietary blends.',
  },
  {
    question: 'How long until I see results?',
    answer:
      'Most users notice an immediate difference from Day 1 in afternoon energy stability and freedom from 3 PM sweet cravings. Noticeable changes in clothing fit and body contouring typically become pronounced within 14 to 30 days of consistent morning use. Maximum metabolic recalibration is achieved over 60 to 180 continuous days.',
  },
  {
    question: 'Is SodaSlim safe? Does it interact with medications?',
    answer:
      'SodaSlim is manufactured in an audited, sterile FDA-registered cGMP facility in the United States using 100% non-GMO ingredients. Each capsule supplies 138 mg of caffeine (about one cup of brewed coffee), well within the FDA 400 mg daily reference. If you take prescription medications, have a pre-existing medical condition, or are sensitive to stimulants, consult your physician before use.',
  },
  {
    question: 'How do I take SodaSlim?',
    answer:
      'Take one (1) capsule once daily, in the morning with a full 8 oz glass of water. Because the formula supplies daytime metabolic energy, morning administration is recommended over late afternoon or evening use to ensure peaceful sleep.',
  },
  {
    question: 'What is the 60-Day 100% Money-Back Guarantee?',
    answer:
      'Every order is protected by our 60-day money-back guarantee measured from the date of purchase. If you are not completely satisfied for any reason, simply contact our dedicated customer support team at support@sodaslim.com or +1 (877) 257-0825 to receive a full refund. The 60-day window is fixed regardless of package size.',
  },
  {
    question: 'How many bottles should I order?',
    answer:
      'Because metabolic and hormonal recalibration work cumulatively over time, 92% of our customers select the 3-Bottle (90-day supply) or 6-Bottle (180-day supply) bundles. Choosing a multi-bottle bundle also locks in our lowest price per bottle ($49/bottle on the 6-pack) and includes complimentary domestic shipping.',
  },
  {
    question: 'How fast will my order ship?',
    answer:
      'Orders are processed and dispatched within 24–48 hours from our US distribution center. Domestic delivery typically arrives at your doorstep within 3 to 5 business days with direct tracking updates sent to your email.',
  },
];

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50/70 text-slate-900 border-t border-slate-200">
      <div className="max-w-3xl mx-auto space-y-10">
        
        {/* Header (Matching Image 11) */}
        <div className="text-center max-w-xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-100/90 text-amber-900 text-xs font-bold uppercase tracking-wider mb-3">
            ANSWERS TO COMMON QUESTIONS
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-600">
            Everything you need to know about SodaSlim, daily usage, and our 60-day guarantee.
          </p>
        </div>

        {/* Clean Accordion List (Matching Image 11) */}
        <div className="space-y-3">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden transition"
              >
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-slate-900 hover:text-blue-900 transition cursor-pointer"
                >
                  <span>{item.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-blue-700' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

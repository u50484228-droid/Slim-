import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: 'How many bottles should I order?',
    a: 'Most of our customers choose the 6-Bottle package (180 Day Supply) because it offers the highest discount, saving you $780 plus free shipping. It allows enough time to experience maximum long-term benefits and share with family.',
  },
  {
    q: 'Is this a one-time payment or a subscription?',
    a: 'This is strictly a one-time payment. You will never be billed again or enrolled in an automatic subscription. If you want more bottles in the future, you can place a new order.',
  },
  {
    q: 'How does the 60-day money back guarantee work?',
    a: 'You have a full 60 days to test SodaSlim. If you are not completely satisfied with your experience, contact our customer support team and return the bottles (even empty ones) for a full 100% refund of your purchase price.',
  },
  {
    q: 'When will I receive my order?',
    a: 'Orders are shipped out via USPS, FedEx or UPS within 24 hours on business days. Domestic US deliveries typically arrive within 2 to 4 business days.',
  },
];

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="max-w-4xl mx-auto px-4 pb-16">
      <div className="text-center mb-8">
        <h3 className="text-2xl sm:text-3xl font-black text-gray-900 uppercase">
          Frequently Asked Questions
        </h3>
        <p className="text-sm text-gray-500 font-semibold mt-1">
          Everything you need to know about your order
        </p>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="border border-gray-200 rounded-xl bg-white overflow-hidden shadow-xs transition"
            >
              <button
                type="button"
                onClick={() => toggle(idx)}
                className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 font-extrabold text-base text-gray-800 hover:text-[#2e5a8a] cursor-pointer"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-500 shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-[#2e5a8a]' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-5 pb-4 text-sm text-gray-600 font-medium leading-relaxed border-t border-gray-100 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

import { useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

export function FaqSection() {
  const [openId, setOpenId] = useState<string | null>(siteConfig.faqs[0].id);

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="bg-white py-20 sm:py-28 border-b border-neutral-200">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left column */}
          <div className="lg:col-span-5">
            <p className="font-mono text-xs tracking-[0.16em] uppercase text-neutral-500">
              A FEW THINGS YOU MIGHT BE WONDERING
            </p>
            <h2 className="mt-3 font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-[#111215] leading-[1.04] text-balance">
              GOOD QUESTIONS.
              <br />
              STRAIGHT ANSWERS.
            </h2>
            <span aria-hidden="true" className="block w-12 h-[3px] bg-[#D49B38] mt-5" />
          </div>

          {/* Right column accordion */}
          <div className="lg:col-span-7 border-t border-neutral-200">
            {siteConfig.faqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div key={faq.id} className="border-b border-neutral-200">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${faq.id}`}
                    id={`faq-trigger-${faq.id}`}
                    onClick={() => toggleItem(faq.id)}
                    className="w-full py-5 flex items-center justify-between gap-6 text-left group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111215] rounded-[2px]"
                  >
                    <span className="text-sm sm:text-base font-semibold text-[#111215] group-hover:text-neutral-600 transition-colors">
                      {faq.question}
                    </span>
                    <span
                      className={`shrink-0 w-7 h-7 rounded-[4px] border flex items-center justify-center transition-colors ${
                        isOpen
                          ? 'bg-[#111215] border-[#111215] text-[#D49B38]'
                          : 'border-neutral-300 text-neutral-600 group-hover:border-[#111215] group-hover:text-[#111215]'
                      }`}
                    >
                      {isOpen ? (
                        <Minus className="w-3.5 h-3.5" aria-hidden="true" />
                      ) : (
                        <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                      )}
                    </span>
                  </button>

                  {isOpen && (
                    <div
                      id={`faq-panel-${faq.id}`}
                      role="region"
                      aria-labelledby={`faq-trigger-${faq.id}`}
                      className="pb-6 pr-10 text-sm text-neutral-600 leading-relaxed"
                    >
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

import { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { siteConfig } from '../config/siteConfig';
import { ImageWithFallback } from './ImageWithFallback';

type ComparisonMode = 'split' | 'before' | 'after';

export function TransformationsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [comparisonMode, setComparisonMode] = useState<ComparisonMode>('split');

  const cases = siteConfig.transformations;
  const activeCase = cases[activeIndex];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + cases.length) % cases.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % cases.length);
  };

  return (
    <section
      id="transformations"
      className="bg-[#2D5580] text-white py-20 sm:py-28 border-b border-white/10"
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
        {/* Header Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-white/15">
          <div>
            <p className="font-mono text-xs tracking-[0.16em] uppercase text-white/75">
              03 · THE TRANSFORMATION
            </p>
            <h2 className="mt-3 font-display text-3xl sm:text-5xl font-extrabold tracking-tight leading-[1.05] text-balance">
              BEYOND THE
              <br />
              BEFORE &amp; AFTER.
            </h2>
            <span aria-hidden="true" className="block w-12 h-[3px] bg-[#E59A1A] mt-5" />
          </div>

          <div className="max-w-sm">
            <p className="text-sm sm:text-base text-white/90 leading-relaxed">
              More confidence. Measurable strength. Sustainable habits that carry over outside the gym.
            </p>
            <p className="mt-2 text-xs text-white/65">
              Illustrative sample client journeys for demonstration. Individual results vary.
            </p>
          </div>
        </div>

        {/* Transformation Carousel Body */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCase.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start"
          >
            {/* Left: Before & After Image Gallery */}
            <div className="lg:col-span-6">
              {/* Interactive Before / After View Switcher */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div
                  role="group"
                  aria-label="Comparison view mode"
                  className="inline-flex bg-[#1F3E60] p-1 border border-white/15"
                >
                  {(
                    [
                      { key: 'split', label: 'Before & After' },
                      { key: 'before', label: 'Before' },
                      { key: 'after', label: 'After' },
                    ] as const
                  ).map((tab) => (
                    <button
                      key={tab.key}
                      type="button"
                      onClick={() => setComparisonMode(tab.key)}
                      className={`px-3 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                        comparisonMode === tab.key
                          ? 'bg-white text-[#141517]'
                          : 'text-white/80 hover:text-white'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                <span className="font-mono text-[11px] tracking-[0.12em] uppercase text-white/75">
                  {activeCase.timeframe}
                </span>
              </div>

              {comparisonMode === 'split' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <figure className="relative overflow-hidden bg-[#1D3957] border border-white/15">
                    <ImageWithFallback
                      src={activeCase.beforeImage}
                      alt={`${activeCase.clientName} before training`}
                      className="w-full aspect-[4/5] object-cover grayscale contrast-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                    <figcaption className="absolute bottom-0 inset-x-0 p-4">
                      <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-[#E59A1A]">
                        BEFORE
                      </span>
                      <p className="mt-1 text-xs text-white/90 leading-snug">
                        {activeCase.beforeCaption}
                      </p>
                    </figcaption>
                  </figure>

                  <figure className="relative overflow-hidden bg-[#1D3957] border border-white/15">
                    <ImageWithFallback
                      src={activeCase.afterImage}
                      alt={`${activeCase.clientName} after training`}
                      className="w-full aspect-[4/5] object-cover contrast-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                    <figcaption className="absolute bottom-0 inset-x-0 p-4">
                      <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-[#E59A1A]">
                        AFTER
                      </span>
                      <p className="mt-1 text-xs text-white/90 leading-snug">
                        {activeCase.afterCaption}
                      </p>
                    </figcaption>
                  </figure>
                </div>
              ) : (
                <figure className="relative overflow-hidden bg-[#1D3957] border border-white/15">
                  <ImageWithFallback
                    src={
                      comparisonMode === 'before'
                        ? activeCase.beforeImage
                        : activeCase.afterImage
                    }
                    alt={`${activeCase.clientName} ${comparisonMode} progress`}
                    className={`w-full aspect-[4/3] object-cover ${
                      comparisonMode === 'before' ? 'grayscale contrast-110' : 'contrast-110'
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                  <figcaption className="absolute bottom-0 inset-x-0 p-5">
                    <span className="font-mono text-[11px] tracking-[0.14em] uppercase text-[#E59A1A]">
                      {comparisonMode.toUpperCase()}
                    </span>
                    <p className="mt-1 text-sm font-medium text-white">
                      {comparisonMode === 'before'
                        ? activeCase.beforeCaption
                        : activeCase.afterCaption}
                    </p>
                  </figcaption>
                </figure>
              )}
            </div>

            {/* Right: Story, Metrics, Quote & Carousel Navigation */}
            <div className="lg:col-span-6 flex flex-col justify-between">
              <div>
                <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-white/75">
                  {activeCase.category}
                </p>

                <h3 className="mt-3 font-display text-2xl sm:text-4xl font-bold tracking-tight leading-tight text-balance">
                  {activeCase.headline}
                </h3>

                <div className="mt-7 divide-y divide-white/15 border-y border-white/15">
                  <div className="py-4 grid grid-cols-1 sm:grid-cols-12 gap-2">
                    <span className="sm:col-span-3 font-mono text-[11px] tracking-[0.14em] uppercase text-white/70">
                      THE START
                    </span>
                    <p className="sm:col-span-9 text-sm text-white/90 leading-relaxed">
                      {activeCase.beforeSummary}
                    </p>
                  </div>
                  <div className="py-4 grid grid-cols-1 sm:grid-cols-12 gap-2">
                    <span className="sm:col-span-3 font-mono text-[11px] tracking-[0.14em] uppercase text-white/70">
                      THE SHIFT
                    </span>
                    <p className="sm:col-span-9 text-sm text-white/90 leading-relaxed">
                      {activeCase.afterSummary}
                    </p>
                  </div>
                </div>

                {/* Achievement Metrics */}
                <div className="mt-6 grid grid-cols-3 gap-4 bg-[#24466B] border border-white/15 p-4">
                  {activeCase.metrics.map((m) => (
                    <div key={m.label}>
                      <p className="font-display text-lg sm:text-xl font-bold text-white tabular-nums">
                        {m.value}
                      </p>
                      <p className="mt-0.5 text-[11px] text-white/75">{m.label}</p>
                    </div>
                  ))}
                </div>

                {/* Testimonial Quote */}
                <blockquote className="mt-7">
                  <p className="text-lg sm:text-xl font-medium italic text-white leading-relaxed">
                    &ldquo;{activeCase.quote}&rdquo;
                  </p>
                  <footer className="mt-3 text-xs font-mono text-white/75">
                    — {activeCase.clientName}
                  </footer>
                </blockquote>
              </div>

              {/* Prev / Next Navigation */}
              <div className="mt-8 pt-6 border-t border-white/15 flex items-center justify-between">
                <span className="font-mono text-xs tracking-widest tabular-nums text-white/85">
                  {activeCase.indexLabel} / {String(cases.length).padStart(2, '0')}
                </span>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    aria-label="Previous transformation story"
                    onClick={handlePrev}
                    className="w-10 h-10 border border-white/30 hover:bg-white hover:text-[#141517] flex items-center justify-center transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E59A1A]"
                  >
                    <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    aria-label="Next transformation story"
                    onClick={handleNext}
                    className="w-10 h-10 border border-white/30 hover:bg-white hover:text-[#141517] flex items-center justify-center transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E59A1A]"
                  >
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

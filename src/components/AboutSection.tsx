import { ArrowUpRight, Award, ShieldCheck, UserCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { siteConfig } from '../config/siteConfig';
import { ImageWithFallback } from './ImageWithFallback';

interface AboutSectionProps {
  onBookClick: () => void;
}

const CREDENTIAL_ICONS = [Award, ShieldCheck, UserCheck] as const;

export function AboutSection({ onBookClick }: AboutSectionProps) {
  return (
    <section id="about" className="bg-[#F7F6F3] py-20 sm:py-28 border-b border-neutral-200">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
          {/* Left: Large Professional Trainer Photograph */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col"
          >
            <p className="font-mono text-xs tracking-[0.16em] uppercase text-neutral-500 mb-5">
              02 · YOUR COACH & STUDIO
            </p>

            <div className="relative flex-1 overflow-hidden bg-neutral-200 aspect-[4/5] lg:aspect-auto lg:min-h-[540px]">
              <ImageWithFallback
                src="/assets/images/trainer-portrait.jpg"
                alt={`${siteConfig.trainerName}, ${siteConfig.trainerRole}`}
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute bottom-5 left-0 bg-[#2D5580] text-white px-5 py-2.5 shadow-md">
                <p className="font-mono text-[11px] font-medium tracking-[0.14em] uppercase">
                  {siteConfig.trainerName} · {siteConfig.brandLocation.split('·')[1]?.trim() || 'STUDIO'}
                </p>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between text-xs text-neutral-500 font-mono">
              <span>{siteConfig.trainerRole.toUpperCase()}</span>
              <ArrowUpRight className="w-4 h-4 text-[#141517]" aria-hidden="true" />
            </div>
          </motion.div>

          {/* Right: Intro, Philosophy, Credentials & Statistics */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col justify-between"
          >
            <div>
              <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight leading-[1.04] text-[#141517] text-balance">
                {siteConfig.trainerHeadlinePrimary}
                <br />
                <span className="text-[#2D5580]">{siteConfig.trainerHeadlineAccent}</span>
              </h2>
              <span aria-hidden="true" className="block w-12 h-[3px] bg-[#E59A1A] mt-5" />

              <p className="mt-7 text-lg sm:text-xl font-medium text-[#141517] leading-relaxed max-w-2xl">
                {siteConfig.trainerIntro}
              </p>

              <div className="mt-5 space-y-4 text-sm sm:text-base text-neutral-600 leading-relaxed max-w-2xl">
                {siteConfig.trainerBio.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>

              {/* Statistics strip */}
              <div className="mt-9 grid grid-cols-3 gap-6 py-6 border-y border-neutral-300/80">
                {siteConfig.trainerStats.map((stat) => (
                  <div key={stat.label}>
                    <p className="font-display text-2xl sm:text-3xl font-extrabold text-[#141517] tabular-nums">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-xs text-neutral-600">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Credentials list */}
              <div className="mt-7 divide-y divide-neutral-200 border-b border-neutral-200">
                {siteConfig.trainerCredentials.map((cred, index) => {
                  const Icon = CREDENTIAL_ICONS[index % CREDENTIAL_ICONS.length];
                  return (
                    <div key={cred.title} className="py-4 flex items-start gap-4">
                      <Icon
                        className="w-5 h-5 text-[#2D5580] shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      <div>
                        <h3 className="text-xs sm:text-sm font-bold tracking-wide uppercase text-[#141517]">
                          {cred.title}
                        </h3>
                        <p className="mt-0.5 text-xs sm:text-sm text-neutral-600">
                          {cred.subtitle}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
              <button
                type="button"
                onClick={onBookClick}
                className="inline-flex items-center gap-2 text-sm font-bold text-[#141517] hover:text-[#2D5580] transition-colors border-b-2 border-[#141517] hover:border-[#2D5580] pb-1 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E59A1A]"
              >
                <span>Let&apos;s talk about your goals</span>
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </button>
              <span className="text-xs text-neutral-500">
                Editable trainer profile · Placeholder credentials
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

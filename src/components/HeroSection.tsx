import { ArrowDown, ArrowUpRight, MessageCircle } from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';
import { siteConfig } from '../config/siteConfig';
import { buildWhatsAppUrl } from '../utils/whatsapp';
import { ImageWithFallback } from './ImageWithFallback';

interface HeroSectionProps {
  onExploreClick: () => void;
  onBookClick: () => void;
}

export function HeroSection({ onExploreClick, onBookClick }: HeroSectionProps) {
  const { scrollY } = useScroll();
  const backdropY = useTransform(scrollY, [0, 700], [0, 70]);
  const framesY = useTransform(scrollY, [0, 700], [0, -35]);

  const whatsappUrl = buildWhatsAppUrl(
    siteConfig.contact.whatsappNumber,
    siteConfig.contact.whatsappDefaultMessage
  );

  const [frameTopLeft, frameTopRight, frameBottomLeft, frameBottomRight] =
    siteConfig.hero.floatingFrames;

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[#121316] text-white pt-24 pb-16 sm:pt-28 sm:pb-20"
    >
      {/* Full-width cinematic dark fitness backdrop with parallax & measured scrim */}
      <motion.div
        style={{ y: backdropY }}
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none select-none"
      >
        <ImageWithFallback
          src={siteConfig.hero.backdropImage}
          alt=""
          loading="eager"
          className="w-full h-full object-cover object-center opacity-25 grayscale contrast-125 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#121316]/90 via-[#121316]/75 to-[#121316]" />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at 50% 45%, rgba(45, 85, 128, 0.14) 0%, rgba(18, 19, 22, 0.85) 68%)',
          }}
        />
      </motion.div>

      {/* Editorial tilted photo accents on desktop inspired by the reference composition */}
      <motion.div
        style={{ y: framesY }}
        aria-hidden="true"
        className="hidden xl:block max-w-[1380px] mx-auto inset-0 absolute pointer-events-none"
      >
        {/* Top-left frame */}
        <div className="absolute top-28 left-8 w-52 -rotate-3 opacity-80">
          <div className="overflow-hidden border border-white/15 bg-[#1B1D21] shadow-2xl">
            <ImageWithFallback
              src={frameTopLeft.image}
              alt=""
              loading="eager"
              className="w-full aspect-[4/5] object-cover grayscale contrast-110"
            />
          </div>
          <p className="mt-2 font-mono text-[10px] tracking-[0.14em] text-neutral-400">
            {frameTopLeft.caption}
          </p>
        </div>

        {/* Top-right frame */}
        <div className="absolute top-24 right-8 w-56 rotate-3 opacity-80">
          <div className="overflow-hidden border border-white/15 bg-[#1B1D21] shadow-2xl">
            <ImageWithFallback
              src={frameTopRight.image}
              alt=""
              loading="eager"
              className="w-full aspect-[4/3] object-cover contrast-110"
            />
          </div>
          <p className="mt-2 font-mono text-[10px] tracking-[0.14em] text-neutral-400 text-right">
            {frameTopRight.caption}
          </p>
        </div>

        {/* Bottom-left frame */}
        <div className="absolute bottom-20 left-16 w-52 rotate-2 opacity-80">
          <div className="overflow-hidden border border-white/15 bg-[#1B1D21] shadow-2xl">
            <ImageWithFallback
              src={frameBottomLeft.image}
              alt=""
              loading="eager"
              className="w-full aspect-[4/3] object-cover contrast-115"
            />
          </div>
        </div>

        {/* Bottom-right frame */}
        <div className="absolute bottom-16 right-12 w-56 -rotate-2 opacity-85">
          <div className="relative overflow-hidden border border-white/15 bg-[#1B1D21] shadow-2xl">
            <ImageWithFallback
              src={frameBottomRight.image}
              alt=""
              loading="eager"
              className="w-full aspect-[4/5] object-cover contrast-115"
            />
            <div className="absolute bottom-3 left-3 bg-[#E59A1A] text-[#121316] px-2.5 py-1 text-[10px] font-bold tracking-[0.12em]">
              {frameBottomRight.caption}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Centered Editorial Composition */}
      <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-8 text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="font-mono text-[11px] sm:text-xs tracking-[0.2em] uppercase text-neutral-300 mb-6"
        >
          {siteConfig.hero.kicker}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-extrabold tracking-[-0.03em] leading-[1.02] text-[clamp(2.05rem,5.4vw,4.75rem)] text-white text-balance"
        >
          <span className="block">{siteConfig.hero.headlineLines[0]}</span>
          <span className="block">{siteConfig.hero.headlineLines[1]}</span>
          <span className="inline-block relative mt-1">
            <span>{siteConfig.hero.headlineLines[2]}</span>
            <span
              aria-hidden="true"
              className="block h-[4px] w-full bg-[#3A6EA5] mt-2"
            />
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 max-w-xl mx-auto text-base sm:text-lg text-neutral-300 leading-relaxed"
        >
          {siteConfig.hero.supportingText}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            type="button"
            onClick={onBookClick}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 bg-[#E59A1A] hover:bg-[#F0A72B] text-[#121316] text-xs sm:text-sm font-bold tracking-[0.06em] uppercase rounded-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <span>{siteConfig.hero.secondaryCta}</span>
            <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={onExploreClick}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 border border-white/25 hover:border-white/60 bg-white/5 hover:bg-white/10 text-white text-xs sm:text-sm font-semibold tracking-[0.06em] uppercase rounded-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E59A1A]"
          >
            <span>{siteConfig.hero.primaryCta}</span>
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.55, delay: 0.3 }}
          className="mt-7 flex flex-col sm:flex-row flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-neutral-400"
        >
          <span>With {siteConfig.trainerName}</span>
          <span aria-hidden="true" className="hidden sm:inline">·</span>
          <span>{siteConfig.brandLocation}</span>
          <span aria-hidden="true" className="hidden sm:inline">·</span>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-neutral-200 hover:text-[#E59A1A] transition-colors font-medium underline underline-offset-4 decoration-white/25"
          >
            <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{siteConfig.hero.whatsappCta}</span>
          </a>
        </motion.div>
      </div>

      {/* Subtle scroll cue */}
      <div className="relative z-10 mt-14 flex justify-center">
        <a
          href="#programs"
          onClick={(e) => {
            e.preventDefault();
            onExploreClick();
          }}
          className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.18em] uppercase text-neutral-400 hover:text-white transition-colors"
        >
          <span>FIND YOUR PROGRAM</span>
          <ArrowDown className="w-3.5 h-3.5" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}

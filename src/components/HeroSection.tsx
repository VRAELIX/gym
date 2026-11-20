import { ArrowDown, ArrowUpRight, MessageCircle } from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';
import { siteConfig } from '../config/siteConfig';
import { buildWhatsAppUrl } from '../utils/whatsapp';
import { ImageWithFallback } from './ImageWithFallback';
import { ActionButton } from './ui/ActionButton';

interface HeroSectionProps {
  onExploreClick: () => void;
  onBookClick: () => void;
}

export function HeroSection({ onExploreClick, onBookClick }: HeroSectionProps) {
  const { scrollY } = useScroll();
  const backdropY = useTransform(scrollY, [0, 700], [0, 64]);
  const framesY = useTransform(scrollY, [0, 700], [0, -32]);

  const whatsappUrl = buildWhatsAppUrl(
    siteConfig.contact.whatsappNumber,
    siteConfig.contact.whatsappDefaultMessage
  );

  const [frameTopLeft, frameTopRight, frameBottomLeft, frameBottomRight] =
    siteConfig.hero.floatingFrames;

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[#0B0C0E] text-white pt-28 pb-16 sm:pt-32 sm:pb-20"
    >
      {/* Full-width cinematic dark fitness backdrop with layered vignette scrim */}
      <motion.div
        style={{ y: backdropY }}
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none select-none"
      >
        <ImageWithFallback
          src={siteConfig.hero.backdropImage}
          alt=""
          loading="eager"
          className="w-full h-full object-cover object-center opacity-28 grayscale contrast-125 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0C0E]/92 via-[#0B0C0E]/68 to-[#0B0C0E]" />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 68% 58% at 50% 42%, rgba(212, 155, 56, 0.08) 0%, rgba(11, 12, 14, 0.88) 70%)',
          }}
        />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0B0C0E] to-transparent" />
      </motion.div>

      {/* Subtle architectural frame lines */}
      <div
        aria-hidden="true"
        className="hidden lg:block absolute inset-x-8 top-24 bottom-8 border border-white/[0.05] pointer-events-none"
      />

      {/* Editorial tilted photo accents on desktop */}
      <motion.div
        style={{ y: framesY }}
        aria-hidden="true"
        className="hidden xl:block max-w-[1380px] mx-auto inset-0 absolute pointer-events-none"
      >
        {/* Top-left frame */}
        <div className="absolute top-28 left-10 w-52 -rotate-3 opacity-85">
          <div className="overflow-hidden border border-white/12 bg-[#16181C] rounded-[4px] shadow-[0_24px_50px_-14px_rgba(0,0,0,0.85)]">
            <ImageWithFallback
              src={frameTopLeft.image}
              alt=""
              loading="eager"
              className="w-full aspect-[4/5] object-cover grayscale contrast-115"
            />
          </div>
          <p className="mt-2.5 font-mono text-[10px] tracking-[0.16em] text-neutral-400">
            {frameTopLeft.caption}
          </p>
        </div>

        {/* Top-right frame */}
        <div className="absolute top-24 right-10 w-56 rotate-3 opacity-85">
          <div className="overflow-hidden border border-white/12 bg-[#16181C] rounded-[4px] shadow-[0_24px_50px_-14px_rgba(0,0,0,0.85)]">
            <ImageWithFallback
              src={frameTopRight.image}
              alt=""
              loading="eager"
              className="w-full aspect-[4/3] object-cover grayscale-[20%] contrast-115"
            />
          </div>
          <p className="mt-2.5 font-mono text-[10px] tracking-[0.16em] text-neutral-400 text-right">
            {frameTopRight.caption}
          </p>
        </div>

        {/* Bottom-left frame */}
        <div className="absolute bottom-20 left-16 w-52 rotate-2 opacity-85">
          <div className="overflow-hidden border border-white/12 bg-[#16181C] rounded-[4px] shadow-[0_24px_50px_-14px_rgba(0,0,0,0.85)]">
            <ImageWithFallback
              src={frameBottomLeft.image}
              alt=""
              loading="eager"
              className="w-full aspect-[4/3] object-cover grayscale-[20%] contrast-120"
            />
          </div>
        </div>

        {/* Bottom-right frame */}
        <div className="absolute bottom-16 right-12 w-56 -rotate-2 opacity-90">
          <div className="relative overflow-hidden border border-white/15 bg-[#16181C] rounded-[4px] shadow-[0_24px_50px_-14px_rgba(0,0,0,0.85)]">
            <ImageWithFallback
              src={frameBottomRight.image}
              alt=""
              loading="eager"
              className="w-full aspect-[4/5] object-cover contrast-115"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-3 bg-[#D49B38] text-[#0B0C0E] px-2.5 py-1 rounded-[2px] text-[10px] font-bold tracking-[0.14em]">
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
          className="font-mono text-[11px] sm:text-xs tracking-[0.22em] uppercase text-neutral-300 mb-6"
        >
          {siteConfig.hero.kicker}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-extrabold tracking-[-0.03em] leading-[1.01] text-[clamp(2.15rem,5.4vw,4.75rem)] text-white text-balance"
        >
          <span className="block">{siteConfig.hero.headlineLines[0]}</span>
          <span className="block">{siteConfig.hero.headlineLines[1]}</span>
          <span className="inline-block relative mt-1">
            <span>{siteConfig.hero.headlineLines[2]}</span>
            <span
              aria-hidden="true"
              className="block h-[3px] w-full bg-[#D49B38] mt-3"
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
          <ActionButton
            variant="accent"
            size="lg"
            onClick={onBookClick}
            className="w-full sm:w-auto"
          >
            <span>{siteConfig.hero.secondaryCta}</span>
            <ArrowUpRight
              className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </ActionButton>

          <ActionButton
            variant="ghostDark"
            size="lg"
            onClick={onExploreClick}
            className="w-full sm:w-auto"
          >
            <span>{siteConfig.hero.primaryCta}</span>
            <ArrowDown
              className="w-4 h-4 text-neutral-400 group-hover:text-white transition-transform duration-200 group-hover:translate-y-0.5"
              aria-hidden="true"
            />
          </ActionButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.55, delay: 0.3 }}
          className="mt-8 flex flex-col sm:flex-row flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-neutral-400"
        >
          <span>With {siteConfig.trainerName}</span>
          <span aria-hidden="true" className="hidden sm:inline">·</span>
          <span>{siteConfig.brandLocation}</span>
          <span aria-hidden="true" className="hidden sm:inline">·</span>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-neutral-200 hover:text-[#D49B38] transition-colors font-medium underline underline-offset-4 decoration-white/25"
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
          className="group inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.2em] uppercase text-neutral-400 hover:text-white transition-colors"
        >
          <span>FIND YOUR PROGRAM</span>
          <ArrowDown
            className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-y-0.5"
            aria-hidden="true"
          />
        </a>
      </div>
    </section>
  );
}

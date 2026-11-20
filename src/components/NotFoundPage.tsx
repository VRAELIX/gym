import { ArrowLeft, ArrowUpRight, MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { siteConfig } from '../config/siteConfig';
import { buildWhatsAppUrl } from '../utils/whatsapp';
import { ImageWithFallback } from './ImageWithFallback';
import { ActionButton } from './ui/ActionButton';

interface NotFoundPageProps {
  missingPath: string;
  onReturnHome: (sectionHash?: string) => void;
}

export function NotFoundPage({ missingPath, onReturnHome }: NotFoundPageProps) {
  const whatsappUrl = buildWhatsAppUrl(
    siteConfig.contact.whatsappNumber,
    siteConfig.contact.whatsappDefaultMessage
  );

  return (
    <section
      aria-labelledby="not-found-title"
      className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-[#0B0C0E] text-white pt-28 pb-10"
    >
      {/* Cinematic monochrome gym backdrop + layered dark scrim */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none select-none">
        <ImageWithFallback
          src={siteConfig.hero.backdropImage}
          alt=""
          loading="eager"
          className="w-full h-full object-cover object-center opacity-20 grayscale contrast-125 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0C0E]/95 via-[#0B0C0E]/80 to-[#0B0C0E]" />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at 50% 42%, rgba(212, 155, 56, 0.08) 0%, rgba(11, 12, 14, 0.92) 65%)',
          }}
        />
      </div>

      {/* Subtle architectural frame lines */}
      <div
        aria-hidden="true"
        className="hidden md:block absolute inset-x-8 top-24 bottom-24 border border-white/[0.06] pointer-events-none"
      />

      <div className="relative z-10 flex-1 flex items-center justify-center px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl w-full text-center"
        >
          <p className="font-mono text-[11px] sm:text-xs tracking-[0.22em] uppercase text-neutral-400">
            ERROR 404 · OFF THE TRAINING FLOOR
          </p>

          <p className="mt-4 font-display font-extrabold text-[clamp(4.5rem,14vw,9rem)] leading-[0.88] tracking-[-0.04em] text-white tabular-nums">
            404
          </p>

          <h1
            id="not-found-title"
            className="mt-4 font-display text-2xl sm:text-4xl font-extrabold tracking-[-0.02em] text-white text-balance"
          >
            PAGE NOT FOUND.
          </h1>
          <span
            aria-hidden="true"
            className="block w-14 h-[3px] bg-[#D49B38] mx-auto mt-5"
          />

          <p className="mt-6 text-sm sm:text-base text-neutral-300 leading-relaxed max-w-lg mx-auto">
            The route{' '}
            <span className="font-mono text-xs text-white bg-white/[0.06] border border-white/10 px-2 py-0.5 rounded-[3px]">
              {missingPath}
            </span>{' '}
            isn&apos;t on today&apos;s training block. Return to the main studio page to explore coaching programs or schedule a consultation.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <ActionButton
              variant="accent"
              size="lg"
              onClick={() => onReturnHome()}
              className="w-full sm:w-auto"
            >
              <ArrowLeft
                className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-0.5"
                aria-hidden="true"
              />
              <span>RETURN TO HOME</span>
            </ActionButton>

            <ActionButton
              variant="ghostDark"
              size="lg"
              onClick={() => onReturnHome('#booking')}
              className="w-full sm:w-auto"
            >
              <span>BOOK CONSULTATION</span>
              <ArrowUpRight
                className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </ActionButton>
          </div>

          <div className="mt-8 flex items-center justify-center gap-4 text-xs text-neutral-400">
            <button
              type="button"
              onClick={() => onReturnHome('#programs')}
              className="hover:text-white transition-colors underline underline-offset-4 decoration-white/25 cursor-pointer"
            >
              View Programs
            </button>
            <span aria-hidden="true">·</span>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-[#D49B38] transition-colors underline underline-offset-4 decoration-white/25"
            >
              <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" />
              <span>WhatsApp Studio</span>
            </a>
          </div>
        </motion.div>
      </div>

      <div className="relative z-10 max-w-[1280px] w-full mx-auto px-5 sm:px-8 sm:pr-44 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] font-mono tracking-[0.12em] uppercase text-neutral-500">
        <span>{siteConfig.businessName}</span>
        <span>{siteConfig.tagline}</span>
      </div>
    </section>
  );
}

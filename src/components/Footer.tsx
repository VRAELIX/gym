import { ArrowUp, ArrowUpRight, Facebook, Instagram, MessageCircle } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import { buildWhatsAppUrl } from '../utils/whatsapp';
import { ActionButton } from './ui/ActionButton';

interface FooterProps {
  onBookNowClick: () => void;
  onSelectProgramToBook: (programTitle: string) => void;
}

export function Footer({ onBookNowClick, onSelectProgramToBook }: FooterProps) {
  const whatsappUrl = buildWhatsAppUrl(
    siteConfig.contact.whatsappNumber,
    siteConfig.contact.whatsappDefaultMessage
  );

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0B0C0E] text-white pt-16 pb-10 border-t border-white/10">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-14 border-b border-white/10">
          {/* Brand Summary */}
          <div className="md:col-span-5">
            <a
              href="#home"
              className="font-display text-xl font-extrabold tracking-tight text-white"
            >
              {siteConfig.businessName}
              <span className="text-[#D49B38]">.</span>
            </a>
            <p className="mt-4 max-w-sm text-sm text-neutral-400 leading-relaxed">
              {siteConfig.footerDescription}
            </p>
            <p className="mt-5 font-mono text-[11px] tracking-[0.14em] uppercase text-neutral-500">
              {siteConfig.brandLocation}
            </p>

            <div className="mt-6 flex items-center gap-2.5">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-10 h-10 rounded-[4px] bg-white/[0.04] border border-white/15 hover:border-[#D49B38] hover:text-[#D49B38] flex items-center justify-center text-neutral-200 transition-colors"
              >
                <MessageCircle className="w-4 h-4" aria-hidden="true" />
              </a>
              <a
                href={siteConfig.contact.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-[4px] bg-white/[0.04] border border-white/15 hover:border-[#D49B38] hover:text-[#D49B38] flex items-center justify-center text-neutral-200 transition-colors"
              >
                <Instagram className="w-4 h-4" aria-hidden="true" />
              </a>
              <a
                href={siteConfig.contact.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-10 h-10 rounded-[4px] bg-white/[0.04] border border-white/15 hover:border-[#D49B38] hover:text-[#D49B38] flex items-center justify-center text-neutral-200 transition-colors"
              >
                <Facebook className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="md:col-span-2">
            <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-neutral-500">
              EXPLORE
            </p>
            <ul className="mt-4 space-y-2.5 text-sm text-neutral-300">
              <li>
                <a href="#home" className="hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#programs" className="hover:text-white transition-colors">
                  Programs
                </a>
              </li>
              <li>
                <a href="#transformations" className="hover:text-white transition-colors">
                  Transformations
                </a>
              </li>
              <li>
                <a href="#blog" className="hover:text-white transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="md:col-span-2">
            <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-neutral-500">
              PROGRAMS
            </p>
            <ul className="mt-4 space-y-2.5 text-sm text-neutral-300">
              {siteConfig.services.map((service) => (
                <li key={service.id}>
                  <button
                    type="button"
                    onClick={() => onSelectProgramToBook(service.title)}
                    className="text-left hover:text-white transition-colors cursor-pointer"
                  >
                    {service.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & First Step */}
          <div className="md:col-span-3">
            <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-neutral-500">
              TAKE THE FIRST STEP
            </p>
            <div className="mt-4 space-y-3.5 text-sm text-neutral-300">
              <ActionButton
                variant="accent"
                size="sm"
                onClick={onBookNowClick}
                className="w-full sm:w-auto"
              >
                <span>Book Consultation</span>
                <ArrowUpRight
                  className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </ActionButton>
              <p className="text-xs text-neutral-400 tabular-nums pt-1">
                {siteConfig.contact.phoneDisplay}
              </p>
              <p className="text-xs text-neutral-400 break-all">
                {siteConfig.contact.email}
              </p>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#D49B38] hover:underline"
              >
                <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" />
                <span>WhatsApp Direct Inquiry</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-500">
          <p>
            &copy; {new Date().getFullYear()} {siteConfig.businessName}. ALL RIGHTS RESERVED.
          </p>
          <p>{siteConfig.tagline.toUpperCase()}</p>
          <ActionButton
            variant="ghostDark"
            size="sm"
            onClick={scrollToTop}
          >
            <span>BACK TO TOP</span>
            <ArrowUp
              className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </ActionButton>
        </div>
      </div>
    </footer>
  );
}

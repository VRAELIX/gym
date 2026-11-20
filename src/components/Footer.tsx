import { ArrowUp, ArrowUpRight, Facebook, Instagram, MessageCircle } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import { buildWhatsAppUrl } from '../utils/whatsapp';

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
    <footer className="bg-white text-[#141517] pt-16 pb-10">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-14 border-b border-neutral-200">
          {/* Brand Summary */}
          <div className="md:col-span-5">
            <a
              href="#home"
              className="font-display text-xl font-extrabold tracking-tight text-[#141517]"
            >
              {siteConfig.businessName}
              <span className="text-[#2D5580]">.</span>
            </a>
            <p className="mt-4 max-w-sm text-sm text-neutral-600 leading-relaxed">
              {siteConfig.footerDescription}
            </p>
            <p className="mt-5 font-mono text-[11px] tracking-[0.14em] uppercase text-neutral-500">
              {siteConfig.brandLocation}
            </p>

            <div className="mt-6 flex items-center gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-9 h-9 border border-neutral-300 hover:border-[#141517] flex items-center justify-center text-[#141517] transition-colors"
              >
                <MessageCircle className="w-4 h-4" aria-hidden="true" />
              </a>
              <a
                href={siteConfig.contact.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 border border-neutral-300 hover:border-[#141517] flex items-center justify-center text-[#141517] transition-colors"
              >
                <Instagram className="w-4 h-4" aria-hidden="true" />
              </a>
              <a
                href={siteConfig.contact.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 border border-neutral-300 hover:border-[#141517] flex items-center justify-center text-[#141517] transition-colors"
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
            <ul className="mt-4 space-y-2.5 text-sm text-neutral-700">
              <li>
                <a href="#home" className="hover:text-[#141517] transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-[#141517] transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#programs" className="hover:text-[#141517] transition-colors">
                  Programs
                </a>
              </li>
              <li>
                <a href="#transformations" className="hover:text-[#141517] transition-colors">
                  Transformations
                </a>
              </li>
              <li>
                <a href="#blog" className="hover:text-[#141517] transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#141517] transition-colors">
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
            <ul className="mt-4 space-y-2.5 text-sm text-neutral-700">
              {siteConfig.services.map((service) => (
                <li key={service.id}>
                  <button
                    type="button"
                    onClick={() => onSelectProgramToBook(service.title)}
                    className="text-left hover:text-[#141517] transition-colors cursor-pointer"
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
            <div className="mt-4 space-y-3 text-sm text-neutral-700">
              <button
                type="button"
                onClick={onBookNowClick}
                className="inline-flex items-center gap-1.5 font-semibold text-[#141517] hover:text-[#2D5580] transition-colors cursor-pointer"
              >
                <span>Book a free consultation</span>
                <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
              <p className="text-xs text-neutral-600 tabular-nums">
                {siteConfig.contact.phoneDisplay}
              </p>
              <p className="text-xs text-neutral-600 break-all">
                {siteConfig.contact.email}
              </p>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2D5580] hover:underline"
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
          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 text-[#141517] hover:text-[#2D5580] font-semibold tracking-wider uppercase transition-colors cursor-pointer"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  );
}

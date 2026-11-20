import { MessageCircle } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import { buildWhatsAppUrl } from '../utils/whatsapp';

export function FloatingWhatsApp() {
  const url = buildWhatsAppUrl(
    siteConfig.contact.whatsappNumber,
    siteConfig.contact.whatsappDefaultMessage
  );

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="group fixed bottom-5 right-5 z-40 inline-flex items-center gap-2.5 bg-[#111215]/95 backdrop-blur-md hover:bg-[#1C1E24] text-white border border-white/15 hover:border-[#D49B38]/65 rounded-[4px] px-4 py-3 shadow-[0_14px_32px_-8px_rgba(0,0,0,0.55)] transition-all duration-200 active:scale-[0.985] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D49B38]"
    >
      <MessageCircle
        className="w-4 h-4 text-[#D49B38] shrink-0 transition-transform duration-200 group-hover:scale-105"
        aria-hidden="true"
      />
      <span className="hidden sm:inline font-display text-[11px] font-semibold tracking-[0.08em] uppercase whitespace-nowrap">
        WhatsApp
      </span>
    </a>
  );
}

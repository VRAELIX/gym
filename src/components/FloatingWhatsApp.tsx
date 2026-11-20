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
      className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2.5 bg-[#121316] hover:bg-[#2D5580] text-white border border-white/20 px-4 py-3 shadow-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E59A1A]"
    >
      <MessageCircle className="w-4 h-4 text-[#E59A1A] shrink-0" aria-hidden="true" />
      <span className="hidden sm:inline text-xs font-semibold tracking-wide uppercase whitespace-nowrap">
        WhatsApp
      </span>
    </a>
  );
}

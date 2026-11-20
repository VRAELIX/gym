import { useEffect } from 'react';
import { ArrowUpRight, Check, MessageCircle, X } from 'lucide-react';
import { siteConfig, type ServiceProgram } from '../config/siteConfig';
import { buildWhatsAppUrl, getServiceWhatsAppMessage } from '../utils/whatsapp';
import { ImageWithFallback } from './ImageWithFallback';

interface ProgramModalProps {
  service: ServiceProgram | null;
  onClose: () => void;
  onBookProgram: (programTitle: string) => void;
}

export function ProgramModal({ service, onClose, onBookProgram }: ProgramModalProps) {
  useEffect(() => {
    if (!service) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [service, onClose]);

  if (!service) return null;

  const whatsappUrl = buildWhatsAppUrl(
    siteConfig.contact.whatsappNumber,
    getServiceWhatsAppMessage(service.title, siteConfig.businessName)
  );

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="program-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white text-[#141517] border border-neutral-200 shadow-2xl">
        <button
          type="button"
          aria-label="Close program details"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-white border border-neutral-200 hover:border-[#141517] flex items-center justify-center text-[#141517] cursor-pointer"
        >
          <X className="w-4 h-4" aria-hidden="true" />
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-12">
          <div className="sm:col-span-5 bg-neutral-100">
            <ImageWithFallback
              src={service.image}
              alt={service.imageAlt}
              className="w-full h-56 sm:h-full object-cover object-top"
            />
          </div>

          <div className="sm:col-span-7 p-6 sm:p-8">
            <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-neutral-500">
              {service.index} · {service.kicker}
            </p>
            <h3
              id="program-modal-title"
              className="mt-2 font-display text-2xl sm:text-3xl font-extrabold tracking-tight"
            >
              {service.title}
            </h3>

            <div className="mt-3 flex items-baseline gap-2">
              <span className="font-display text-2xl font-bold tabular-nums">
                {service.price}
              </span>
              <span className="text-xs text-neutral-500">{service.unit}</span>
            </div>

            <p className="mt-4 text-sm text-neutral-600 leading-relaxed">
              {service.description}
            </p>

            <div className="mt-5 pt-4 border-t border-neutral-200 space-y-2 text-xs">
              <p>
                <span className="font-semibold text-[#141517]">Format:</span>{' '}
                <span className="text-neutral-600">{service.duration}</span>
              </p>
              <p>
                <span className="font-semibold text-[#141517]">Ideal for:</span>{' '}
                <span className="text-neutral-600">{service.idealFor}</span>
              </p>
            </div>

            <div className="mt-5 pt-4 border-t border-neutral-200">
              <p className="font-mono text-[11px] tracking-[0.12em] uppercase text-neutral-500 mb-3">
                WHAT&apos;S INCLUDED
              </p>
              <ul className="space-y-2">
                {service.deliverables.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-xs text-neutral-700">
                    <Check
                      className="w-3.5 h-3.5 text-[#2D5580] shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onBookProgram(service.title);
                }}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 bg-[#E59A1A] hover:bg-[#F0A72B] text-[#141517] text-xs font-bold uppercase tracking-wide transition-colors cursor-pointer"
              >
                <span>{service.ctaLabel}</span>
                <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-3 border border-neutral-300 hover:border-[#141517] text-xs font-semibold uppercase tracking-wide text-[#141517] transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Inquire</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

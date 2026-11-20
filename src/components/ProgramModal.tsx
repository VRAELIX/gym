import { useEffect } from 'react';
import { ArrowUpRight, Check, MessageCircle, X } from 'lucide-react';
import { siteConfig, type ServiceProgram } from '../config/siteConfig';
import { buildWhatsAppUrl, getServiceWhatsAppMessage } from '../utils/whatsapp';
import { ImageWithFallback } from './ImageWithFallback';
import { ActionButton, ActionLink } from './ui/ActionButton';

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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white text-[#111215] border border-neutral-200 rounded-[4px] shadow-2xl">
        <button
          type="button"
          aria-label="Close program details"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/95 backdrop-blur-sm border border-neutral-200 hover:border-[#111215] hover:bg-[#111215] hover:text-white rounded-[4px] flex items-center justify-center text-[#111215] transition-colors cursor-pointer"
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
                <span className="font-semibold text-[#111215]">Format:</span>{' '}
                <span className="text-neutral-600">{service.duration}</span>
              </p>
              <p>
                <span className="font-semibold text-[#111215]">Ideal for:</span>{' '}
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
                      className="w-3.5 h-3.5 text-[#A8751E] shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              <ActionButton
                variant="accent"
                size="md"
                onClick={() => {
                  onClose();
                  onBookProgram(service.title);
                }}
                className="flex-1"
              >
                <span>{service.ctaLabel}</span>
                <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
              </ActionButton>

              <ActionLink
                variant="outlineLight"
                size="md"
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Inquire</span>
              </ActionLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

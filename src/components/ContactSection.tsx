import {
  Clock,
  ExternalLink,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import { buildWhatsAppUrl } from '../utils/whatsapp';
import { ActionLink } from './ui/ActionButton';

export function ContactSection() {
  const { contact } = siteConfig;
  const whatsappUrl = buildWhatsAppUrl(
    contact.whatsappNumber,
    contact.whatsappDefaultMessage
  );

  return (
    <section id="contact" className="bg-[#F5F5F3] py-20 sm:py-24 border-b border-neutral-200">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-neutral-300/70">
          <div>
            <p className="font-mono text-xs tracking-[0.16em] uppercase text-neutral-500">
              07 · STUDIO &amp; CONTACT
            </p>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-[#111215] leading-[1.08] text-balance">
              VISIT THE STUDIO OR REACH OUT DIRECTLY.
            </h2>
            <span aria-hidden="true" className="block w-12 h-[3px] bg-[#D49B38] mt-5" />
          </div>
          <p className="text-xs text-neutral-500 max-w-xs">
            {contact.placeholderNotice}
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Contact Details Grid */}
          <div className="lg:col-span-7 bg-white border border-neutral-200 rounded-[4px] p-6 sm:p-8 flex flex-col justify-between">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div>
                <p className="font-mono text-[11px] tracking-[0.12em] uppercase text-neutral-500">
                  BUSINESS &amp; COACH
                </p>
                <p className="mt-2 font-display text-lg font-bold text-[#111215]">
                  {siteConfig.businessName}
                </p>
                <p className="mt-0.5 text-sm text-neutral-600">
                  Lead Coach: {siteConfig.trainerName}
                </p>
              </div>

              <div>
                <p className="font-mono text-[11px] tracking-[0.12em] uppercase text-neutral-500">
                  PHONE &amp; WHATSAPP
                </p>
                <p className="mt-2 text-sm font-semibold text-[#111215] tabular-nums">
                  {contact.phoneDisplay}
                </p>
                <p className="mt-0.5 text-xs text-neutral-500 tabular-nums">
                  WhatsApp: +{contact.whatsappNumber}
                </p>
              </div>

              <div>
                <p className="font-mono text-[11px] tracking-[0.12em] uppercase text-neutral-500">
                  BUSINESS EMAIL
                </p>
                <p className="mt-2 text-sm font-medium text-[#111215] break-all">
                  {contact.email}
                </p>
              </div>

              <div>
                <p className="font-mono text-[11px] tracking-[0.12em] uppercase text-neutral-500">
                  STUDIO ADDRESS
                </p>
                <address className="mt-2 not-italic text-sm text-neutral-700 leading-relaxed">
                  <span className="block">{contact.addressLine1}</span>
                  <span className="block">
                    {contact.addressLine2}, {contact.cityPostal}
                  </span>
                </address>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 pt-6 border-t border-neutral-200 flex flex-wrap gap-3">
              <ActionLink variant="dark" size="sm" href={contact.phoneHref}>
                <Phone className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Call Now</span>
              </ActionLink>

              <ActionLink
                variant="accent"
                size="sm"
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" />
                <span>WhatsApp</span>
              </ActionLink>

              <ActionLink
                variant="outlineLight"
                size="sm"
                href={`mailto:${contact.email}?subject=${encodeURIComponent(`Coaching Inquiry — ${siteConfig.businessName}`)}`}
              >
                <Mail className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Email</span>
              </ActionLink>

              <ActionLink
                variant="outlineLight"
                size="sm"
                href={contact.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>Instagram</span>
                <ExternalLink className="w-3 h-3" aria-hidden="true" />
              </ActionLink>

              <ActionLink
                variant="outlineLight"
                size="sm"
                href={contact.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>Facebook</span>
                <ExternalLink className="w-3 h-3" aria-hidden="true" />
              </ActionLink>
            </div>
          </div>

          {/* Opening Hours & Google Maps Location Card */}
          <div className="lg:col-span-5 bg-white border border-neutral-200 rounded-[4px] p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 font-mono text-[11px] tracking-[0.12em] uppercase text-neutral-500">
                <Clock className="w-3.5 h-3.5 text-[#111215]" aria-hidden="true" />
                <span>OPENING HOURS</span>
              </div>

              <dl className="mt-4 divide-y divide-neutral-100 border-b border-neutral-200">
                {contact.openingHours.map((row) => (
                  <div
                    key={row.days}
                    className="py-3 flex items-center justify-between text-sm gap-4"
                  >
                    <dt className="text-neutral-600">{row.days}</dt>
                    <dd className="font-medium text-[#111215] tabular-nums">{row.hours}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="mt-6 bg-[#F5F5F3] border border-neutral-200 rounded-[4px] p-5">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#111215] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <p className="text-sm font-bold text-[#111215]">
                    Studio Location (Placeholder)
                  </p>
                  <p className="mt-1 text-xs text-neutral-600 leading-relaxed">
                    {contact.addressLine1}, {contact.cityPostal}
                  </p>
                </div>
              </div>

              <ActionLink
                variant="outlineLight"
                size="sm"
                href={contact.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 w-full"
              >
                <span>Get Directions</span>
                <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
              </ActionLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

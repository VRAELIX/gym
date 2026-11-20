import { ArrowUpRight, Check, MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { siteConfig, type ServiceProgram } from '../config/siteConfig';
import { buildWhatsAppUrl, getServiceWhatsAppMessage } from '../utils/whatsapp';
import { ImageWithFallback } from './ImageWithFallback';
import { ActionButton, ActionLink } from './ui/ActionButton';

interface ServicesSectionProps {
  onSelectProgramToBook: (programTitle: string) => void;
  onLearnMore: (service: ServiceProgram) => void;
}

export function ServicesSection({
  onSelectProgramToBook,
  onLearnMore,
}: ServicesSectionProps) {
  return (
    <section id="programs" className="bg-white py-20 sm:py-28 border-b border-neutral-200">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-neutral-200">
          <div>
            <p className="font-mono text-xs tracking-[0.16em] uppercase text-neutral-500">
              01 · THE COACHING PROGRAMS
            </p>
            <h2 className="mt-3 font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-[#111215] leading-[1.04] text-balance">
              ONE GOAL.
              <br />
              YOUR WAY THERE.
            </h2>
            <span aria-hidden="true" className="block w-12 h-[3px] bg-[#D49B38] mt-5" />
          </div>
          <p className="max-w-sm text-sm sm:text-base text-neutral-600 leading-relaxed">
            More than a workout. Structured programming, a coach in your corner, and a studio built for measurable progression.
          </p>
        </div>

        {/* 4-Column Service Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          {siteConfig.services.map((service, idx) => {
            const whatsappUrl = buildWhatsAppUrl(
              siteConfig.contact.whatsappNumber,
              getServiceWhatsAppMessage(service.title, siteConfig.businessName)
            );

            return (
              <motion.article
                key={service.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.45, delay: idx * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className="group flex flex-col justify-between bg-white border border-neutral-200/90 hover:border-[#111215]/40 hover:shadow-[0_22px_48px_-24px_rgba(11,12,14,0.22)] rounded-[4px] overflow-hidden transition-all duration-300"
              >
                <div>
                  {/* Image container */}
                  <div className="relative overflow-hidden bg-neutral-100 aspect-[4/5]">
                    <ImageWithFallback
                      src={service.image}
                      alt={service.imageAlt}
                      className="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-500"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity"
                    />
                    <span className="absolute top-3 left-3 font-mono text-[11px] font-medium bg-[#111215]/90 text-white px-2.5 py-1 rounded-[2px] tracking-[0.08em] tabular-nums">
                      {service.index}
                    </span>
                    <button
                      type="button"
                      aria-label={`Learn more about ${service.title}`}
                      onClick={() => onLearnMore(service)}
                      className="absolute bottom-3 right-3 w-10 h-10 bg-white/95 backdrop-blur-sm text-[#111215] hover:bg-[#D49B38] hover:text-[#0B0C0E] hover:border-[#D49B38] rounded-[4px] flex items-center justify-center border border-neutral-200 transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D49B38]"
                    >
                      <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Card body */}
                  <div className="p-6">
                    <p className="font-mono text-[11px] tracking-[0.12em] uppercase text-neutral-500">
                      {service.kicker}
                    </p>
                    <h3 className="mt-2 font-display text-xl font-bold text-[#111215] tracking-tight">
                      {service.title}
                    </h3>

                    <div className="mt-3 flex items-baseline gap-1.5">
                      <span className="font-display text-2xl font-extrabold text-[#111215] tabular-nums">
                        {service.price}
                      </span>
                      <span className="text-xs text-neutral-500">{service.unit}</span>
                    </div>

                    <p className="mt-3 text-sm text-neutral-600 leading-relaxed">
                      {service.description}
                    </p>

                    <ul className="mt-5 space-y-2 border-t border-neutral-100 pt-4">
                      {service.features.map((feat) => (
                        <li
                          key={feat}
                          className="flex items-start gap-2 text-xs text-neutral-700 leading-snug"
                        >
                          <Check
                            className="w-3.5 h-3.5 text-[#A8751E] shrink-0 mt-0.5"
                            aria-hidden="true"
                          />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card actions */}
                <div className="px-6 pb-6 pt-2 flex flex-col gap-2.5">
                  <ActionButton
                    variant="dark"
                    size="md"
                    onClick={() => onSelectProgramToBook(service.title)}
                    className="w-full"
                  >
                    <span>Book Now</span>
                    <ArrowUpRight
                      className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </ActionButton>

                  <div className="grid grid-cols-2 gap-2">
                    <ActionButton
                      variant="subtleLight"
                      size="sm"
                      onClick={() => onLearnMore(service)}
                    >
                      Learn More
                    </ActionButton>
                    <ActionLink
                      variant="outlineLight"
                      size="sm"
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>WhatsApp</span>
                    </ActionLink>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        <p className="mt-8 text-xs text-neutral-500">
          Indicative starting prices shown. Exact coaching frequency and package plans are tailored during your free consultation.
        </p>
      </div>
    </section>
  );
}

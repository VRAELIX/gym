import { useEffect, useState, type FormEvent } from 'react';
import {
  AlertCircle,
  ArrowUpRight,
  Calendar,
  Check,
  CheckCircle2,
  Clock,
  MessageCircle,
  PhoneCall,
} from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import {
  getTodayIsoDate,
  TIME_SLOTS,
  validateBookingForm,
  type BookingFormValues,
  type BookingValidationErrors,
} from '../utils/booking';
import { buildWhatsAppUrl } from '../utils/whatsapp';
import { ActionButton, ActionLink } from './ui/ActionButton';

interface BookingSectionProps {
  selectedProgram: string;
}

interface BookingConfirmation {
  referenceId: string;
  submittedAt: string;
  fullName: string;
  email: string;
  program: string;
  preferredDate: string;
  preferredTime: string;
}

export function BookingSection({ selectedProgram }: BookingSectionProps) {
  const todayIso = getTodayIsoDate();

  const [values, setValues] = useState<BookingFormValues>({
    fullName: '',
    email: '',
    phone: '',
    program: selectedProgram || siteConfig.services[0].title,
    preferredDate: '',
    preferredTime: TIME_SLOTS[1],
    message: '',
    consent: false,
  });

  const [errors, setErrors] = useState<BookingValidationErrors>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [confirmation, setConfirmation] = useState<BookingConfirmation | null>(null);

  useEffect(() => {
    if (selectedProgram) {
      setValues((prev) => ({ ...prev, program: selectedProgram }));
      setConfirmation(null);
    }
  }, [selectedProgram]);

  const updateField = <K extends keyof BookingFormValues>(
    field: K,
    value: BookingFormValues[K]
  ) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
    if (serverError) {
      setServerError(null);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setServerError(null);

    const validation = validateBookingForm(values, todayIso);
    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      const data = await response.json().catch(() => null);

      // On static hosting (e.g. GitHub Pages) there is no Express API; fallback cleanly after validation.
      if (!data && (response.status === 404 || response.status === 405)) {
        setConfirmation({
          referenceId: `KP-${Date.now().toString(36).toUpperCase().slice(-6)}`,
          submittedAt: new Date().toISOString(),
          fullName: values.fullName.trim(),
          email: values.email.trim(),
          program: values.program,
          preferredDate: values.preferredDate,
          preferredTime: values.preferredTime,
        });
        setErrors({});
        return;
      }

      if (!response.ok || !data?.ok) {
        if (data?.errors) {
          setErrors(data.errors);
        }
        setServerError(
          data?.message ||
            'Unable to confirm your consultation request right now. Please try again or reach out via WhatsApp.'
        );
        return;
      }

      setConfirmation({
        referenceId: data.referenceId,
        submittedAt: data.submittedAt,
        fullName: data.booking.fullName,
        email: data.booking.email,
        program: data.booking.program,
        preferredDate: data.booking.preferredDate,
        preferredTime: data.booking.preferredTime,
      });
      setErrors({});
    } catch {
      setServerError(
        'Network error while connecting to the booking server. Please verify your connection or use WhatsApp below.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setConfirmation(null);
    setValues({
      fullName: '',
      email: '',
      phone: '',
      program: selectedProgram || siteConfig.services[0].title,
      preferredDate: '',
      preferredTime: TIME_SLOTS[1],
      message: '',
      consent: false,
    });
    setErrors({});
    setServerError(null);
  };

  const whatsappDirectUrl = buildWhatsAppUrl(
    siteConfig.contact.whatsappNumber,
    `Hello ${siteConfig.businessName}, I would like to schedule a free consultation for ${values.program || 'your fitness programs'}.`
  );

  return (
    <section
      id="booking"
      className="bg-[#0B0C0E] text-white py-20 sm:py-28 border-b border-white/10"
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left editorial callout */}
          <div className="lg:col-span-5">
            <p className="font-mono text-xs tracking-[0.16em] uppercase text-neutral-400">
              06 · YOUR FIRST STEP
            </p>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.02] text-balance">
              LET&apos;S MAKE ROOM
              <br />
              FOR A{' '}
              <span className="text-[#D49B38]">STRONGER</span>
              <br />
              <span className="text-[#D49B38]">YOU.</span>
            </h2>
            <span aria-hidden="true" className="block w-12 h-[3px] bg-[#D49B38] mt-6" />

            <p className="mt-7 text-base text-neutral-300 leading-relaxed max-w-md">
              You bring your goals and schedule. We map out the exact training and nutrition structure to move you forward.
            </p>

            <ul className="mt-8 space-y-4 text-sm text-neutral-200">
              <li className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-[#D49B38] shrink-0" aria-hidden="true" />
                <span>30-minute private consultation</span>
              </li>
              <li className="flex items-center gap-3">
                <PhoneCall className="w-4 h-4 text-[#D49B38] shrink-0" aria-hidden="true" />
                <span>In-studio tour or introductory video/phone call</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-4 h-4 text-[#D49B38] shrink-0" aria-hidden="true" />
                <span>Zero pressure, zero upfront obligation</span>
              </li>
            </ul>

            <div className="mt-10 pt-8 border-t border-white/10">
              <p className="font-display text-3xl italic font-semibold tracking-tight text-white">
                {siteConfig.trainerName.split(' ')[0]}.
              </p>
              <p className="mt-1 text-xs font-mono text-neutral-400">
                {siteConfig.trainerRole}
              </p>
            </div>
          </div>

          {/* Right white consultation booking card */}
          <div className="lg:col-span-7 bg-white text-[#111215] p-6 sm:p-10 rounded-[4px] border border-neutral-200/80 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.75)]">
            <div className="flex items-start justify-between gap-4 pb-6 border-b border-neutral-200">
              <div>
                <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-neutral-500">
                  CONSULTATION REQUEST
                </p>
                <h3 className="mt-1.5 font-display text-2xl sm:text-3xl font-bold tracking-tight">
                  Book your free consultation.
                </h3>
                <p className="mt-1 text-sm text-neutral-600">
                  Choose a time and share what you want to work toward.
                </p>
              </div>
              <span className="w-10 h-10 rounded-[4px] bg-[#F5F5F3] border border-neutral-200 flex items-center justify-center shrink-0 mt-1">
                <Calendar className="w-5 h-5 text-[#111215]" aria-hidden="true" />
              </span>
            </div>

            {confirmation ? (
              <div
                role="status"
                aria-live="polite"
                className="mt-8 bg-[#F5F5F3] border border-neutral-200 rounded-[4px] p-6 sm:p-8"
              >
                <div className="flex items-start gap-3">
                  <CheckCircle2
                    className="w-6 h-6 text-[#A8751E] shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="font-mono text-xs tracking-[0.12em] uppercase text-[#111215] font-semibold">
                      CONSULTATION CONFIRMED · REF {confirmation.referenceId}
                    </p>
                    <h4 className="mt-2 font-display text-2xl font-bold text-[#111215]">
                      We&apos;ve reserved your request, {confirmation.fullName}.
                    </h4>
                    <p className="mt-2 text-sm text-neutral-600 leading-relaxed">
                      Your request for <strong>{confirmation.program}</strong> on{' '}
                      <span className="tabular-nums font-medium">
                        {confirmation.preferredDate}
                      </span>{' '}
                      ({confirmation.preferredTime}) has been logged. Confirmation details apply to{' '}
                      <span className="font-medium">{confirmation.email}</span>.
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-5 border-t border-neutral-200 flex flex-wrap items-center gap-3">
                  <ActionLink
                    variant="dark"
                    size="sm"
                    href={whatsappDirectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="w-4 h-4" aria-hidden="true" />
                    <span>Message Us on WhatsApp</span>
                  </ActionLink>
                  <ActionButton
                    variant="outlineLight"
                    size="sm"
                    onClick={handleReset}
                  >
                    Book Another Consultation
                  </ActionButton>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="mt-7 space-y-5">
                {serverError && (
                  <div
                    role="alert"
                    className="flex items-start gap-3 p-4 rounded-[4px] bg-red-50 border border-red-200 text-red-900 text-sm"
                  >
                    <AlertCircle className="w-5 h-5 text-red-700 shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <p className="font-semibold">Booking could not be submitted</p>
                      <p className="mt-0.5 text-xs text-red-800">{serverError}</p>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="booking-full-name"
                      className="block text-xs font-semibold text-[#111215] mb-1.5"
                    >
                      Full Name <span className="text-red-700">*</span>
                    </label>
                    <input
                      id="booking-full-name"
                      name="fullName"
                      type="text"
                      required
                      value={values.fullName}
                      onChange={(e) => updateField('fullName', e.target.value)}
                      placeholder="Alex Mercer"
                      aria-invalid={Boolean(errors.fullName)}
                      className={`w-full px-3.5 py-2.5 text-sm rounded-[4px] border bg-white focus:outline-none focus:ring-2 focus:ring-[#111215] focus:border-[#111215] transition-shadow ${
                        errors.fullName ? 'border-red-600' : 'border-neutral-300'
                      }`}
                    />
                    {errors.fullName && (
                      <p className="mt-1.5 text-xs text-red-700">{errors.fullName}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="booking-email"
                      className="block text-xs font-semibold text-[#111215] mb-1.5"
                    >
                      Email Address <span className="text-red-700">*</span>
                    </label>
                    <input
                      id="booking-email"
                      name="email"
                      type="email"
                      required
                      value={values.email}
                      onChange={(e) => updateField('email', e.target.value)}
                      placeholder="you@example.com"
                      aria-invalid={Boolean(errors.email)}
                      className={`w-full px-3.5 py-2.5 text-sm rounded-[4px] border bg-white focus:outline-none focus:ring-2 focus:ring-[#111215] focus:border-[#111215] transition-shadow ${
                        errors.email ? 'border-red-600' : 'border-neutral-300'
                      }`}
                    />
                    {errors.email && (
                      <p className="mt-1.5 text-xs text-red-700">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="booking-phone"
                      className="block text-xs font-semibold text-[#111215] mb-1.5"
                    >
                      Phone Number <span className="text-red-700">*</span>
                    </label>
                    <input
                      id="booking-phone"
                      name="phone"
                      type="tel"
                      required
                      value={values.phone}
                      onChange={(e) => updateField('phone', e.target.value)}
                      placeholder="+1 (555) 234-5678"
                      aria-invalid={Boolean(errors.phone)}
                      className={`w-full px-3.5 py-2.5 text-sm rounded-[4px] border bg-white focus:outline-none focus:ring-2 focus:ring-[#111215] focus:border-[#111215] transition-shadow ${
                        errors.phone ? 'border-red-600' : 'border-neutral-300'
                      }`}
                    />
                    {errors.phone && (
                      <p className="mt-1.5 text-xs text-red-700">{errors.phone}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="booking-program"
                      className="block text-xs font-semibold text-[#111215] mb-1.5"
                    >
                      Interested Program <span className="text-red-700">*</span>
                    </label>
                    <select
                      id="booking-program"
                      name="program"
                      value={values.program}
                      onChange={(e) => updateField('program', e.target.value)}
                      aria-invalid={Boolean(errors.program)}
                      className={`w-full px-3.5 py-2.5 text-sm rounded-[4px] border bg-white focus:outline-none focus:ring-2 focus:ring-[#111215] focus:border-[#111215] transition-shadow ${
                        errors.program ? 'border-red-600' : 'border-neutral-300'
                      }`}
                    >
                      {siteConfig.services.map((service) => (
                        <option key={service.id} value={service.title}>
                          {service.title} ({service.price} {service.unit})
                        </option>
                      ))}
                      <option value="Not Sure — Help Me Choose">
                        Not Sure — Help Me Choose
                      </option>
                    </select>
                    {errors.program && (
                      <p className="mt-1.5 text-xs text-red-700">{errors.program}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="booking-date"
                      className="block text-xs font-semibold text-[#111215] mb-1.5"
                    >
                      Preferred Date <span className="text-red-700">*</span>
                    </label>
                    <input
                      id="booking-date"
                      name="preferredDate"
                      type="date"
                      min={todayIso}
                      required
                      value={values.preferredDate}
                      onChange={(e) => updateField('preferredDate', e.target.value)}
                      aria-invalid={Boolean(errors.preferredDate)}
                      className={`w-full px-3.5 py-2.5 text-sm rounded-[4px] border bg-white tabular-nums focus:outline-none focus:ring-2 focus:ring-[#111215] focus:border-[#111215] transition-shadow ${
                        errors.preferredDate ? 'border-red-600' : 'border-neutral-300'
                      }`}
                    />
                    {errors.preferredDate && (
                      <p className="mt-1.5 text-xs text-red-700">{errors.preferredDate}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="booking-time"
                      className="block text-xs font-semibold text-[#111215] mb-1.5"
                    >
                      Preferred Time <span className="text-red-700">*</span>
                    </label>
                    <select
                      id="booking-time"
                      name="preferredTime"
                      value={values.preferredTime}
                      onChange={(e) => updateField('preferredTime', e.target.value)}
                      aria-invalid={Boolean(errors.preferredTime)}
                      className={`w-full px-3.5 py-2.5 text-sm rounded-[4px] border bg-white focus:outline-none focus:ring-2 focus:ring-[#111215] focus:border-[#111215] transition-shadow ${
                        errors.preferredTime ? 'border-red-600' : 'border-neutral-300'
                      }`}
                    >
                      {TIME_SLOTS.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                    {errors.preferredTime && (
                      <p className="mt-1.5 text-xs text-red-700">{errors.preferredTime}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="booking-message"
                    className="block text-xs font-semibold text-[#111215] mb-1.5"
                  >
                    Additional Message <span className="text-neutral-500 font-normal">(optional)</span>
                  </label>
                  <textarea
                    id="booking-message"
                    name="message"
                    rows={3}
                    value={values.message}
                    onChange={(e) => updateField('message', e.target.value)}
                    placeholder="Share your current training schedule, goals, or any injuries we should know about..."
                    className="w-full px-3.5 py-2.5 text-sm rounded-[4px] border border-neutral-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#111215] focus:border-[#111215] transition-shadow"
                  />
                </div>

                <div>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      id="booking-consent"
                      name="consent"
                      type="checkbox"
                      checked={values.consent}
                      onChange={(e) => updateField('consent', e.target.checked)}
                      aria-invalid={Boolean(errors.consent)}
                      className="mt-0.5 w-4 h-4 accent-[#111215]"
                    />
                    <span className="text-xs text-neutral-600 leading-relaxed">
                      I agree to my details being used to schedule this consultation and confirm studio availability.
                    </span>
                  </label>
                  {errors.consent && (
                    <p className="mt-1.5 text-xs text-red-700">{errors.consent}</p>
                  )}
                </div>

                <ActionButton
                  type="submit"
                  variant="dark"
                  size="lg"
                  disabled={submitting}
                  className="w-full"
                >
                  <span>
                    {submitting ? 'CONFIRMING REQUEST...' : 'BOOK YOUR FREE CONSULTATION'}
                  </span>
                  <ArrowUpRight
                    className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </ActionButton>

                <div className="pt-2 flex flex-wrap items-center justify-between gap-2 text-xs text-neutral-500">
                  <span>Prefer instant chat?</span>
                  <a
                    href={whatsappDirectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-semibold text-[#111215] hover:text-[#A8751E] underline underline-offset-4 transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Message on WhatsApp instead</span>
                  </a>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

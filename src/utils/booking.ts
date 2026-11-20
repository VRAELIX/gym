export interface BookingFormValues {
  fullName: string;
  email: string;
  phone: string;
  program: string;
  preferredDate: string;
  preferredTime: string;
  message: string;
  consent: boolean;
}

export type BookingFieldName = keyof BookingFormValues;
export type BookingValidationErrors = Partial<Record<BookingFieldName, string>>;

export const TIME_SLOTS = [
  '07:00 AM — Morning',
  '09:30 AM — Mid-Morning',
  '12:30 PM — Lunchtime',
  '04:00 PM — Afternoon',
  '06:30 PM — Evening',
] as const;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function getTodayIsoDate(now: Date = new Date()): string {
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function validateBookingForm(
  values: BookingFormValues,
  todayIso: string = getTodayIsoDate()
): { valid: boolean; errors: BookingValidationErrors } {
  const errors: BookingValidationErrors = {};

  if (!values.fullName || values.fullName.trim().length < 2) {
    errors.fullName = 'Please enter your full name (at least 2 characters).';
  }

  if (!values.email || !EMAIL_REGEX.test(values.email.trim())) {
    errors.email = 'Please enter a valid email address.';
  }

  const phoneDigits = (values.phone || '').replace(/\D/g, '');
  if (phoneDigits.length < 7 || phoneDigits.length > 15) {
    errors.phone = 'Please enter a valid phone number (7 to 15 digits).';
  }

  if (!values.program || values.program.trim().length === 0) {
    errors.program = 'Please choose the program you are interested in.';
  }

  if (!values.preferredDate || !/^\d{4}-\d{2}-\d{2}$/.test(values.preferredDate)) {
    errors.preferredDate = 'Please select a preferred consultation date.';
  } else if (values.preferredDate < todayIso) {
    errors.preferredDate = 'Preferred date cannot be in the past.';
  }

  if (!values.preferredTime || values.preferredTime.trim().length === 0) {
    errors.preferredTime = 'Please choose a preferred consultation time slot.';
  }

  if (!values.consent) {
    errors.consent = 'Please confirm consent so we can contact you about your consultation.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

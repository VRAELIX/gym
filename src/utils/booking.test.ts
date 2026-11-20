import test from 'node:test';
import assert from 'node:assert/strict';
import { validateBookingForm, type BookingFormValues } from './booking.ts';
import { buildWhatsAppUrl, getServiceWhatsAppMessage, sanitizePhoneNumber } from './whatsapp.ts';

const validPayload: BookingFormValues = {
  fullName: 'Elena Rostova',
  email: 'elena@example.com',
  phone: '+1 (555) 234-5678',
  program: 'Personal Training',
  preferredDate: '2026-12-01',
  preferredTime: '09:30 AM — Mid-Morning',
  message: 'Looking to build strength 3 days per week.',
  consent: true,
};

test('validateBookingForm accepts complete valid payload', () => {
  const result = validateBookingForm(validPayload, '2026-11-20');
  assert.equal(result.valid, true);
  assert.deepEqual(result.errors, {});
});

test('validateBookingForm rejects empty required fields and unchecked consent', () => {
  const result = validateBookingForm(
    {
      fullName: '',
      email: 'not-an-email',
      phone: '123',
      program: '',
      preferredDate: '',
      preferredTime: '',
      message: '',
      consent: false,
    },
    '2026-11-20'
  );

  assert.equal(result.valid, false);
  assert.ok(result.errors.fullName);
  assert.ok(result.errors.email);
  assert.ok(result.errors.phone);
  assert.ok(result.errors.program);
  assert.ok(result.errors.preferredDate);
  assert.ok(result.errors.preferredTime);
  assert.ok(result.errors.consent);
});

test('validateBookingForm rejects dates in the past', () => {
  const result = validateBookingForm(
    { ...validPayload, preferredDate: '2026-11-10' },
    '2026-11-20'
  );
  assert.equal(result.valid, false);
  assert.equal(result.errors.preferredDate, 'Preferred date cannot be in the past.');
});

test('sanitizePhoneNumber and buildWhatsAppUrl encode correctly', () => {
  assert.equal(sanitizePhoneNumber('+1 (555) 014-8920'), '15550148920');
  const url = buildWhatsAppUrl('+1 (555) 014-8920', 'Hello, I am interested in your fitness programs.');
  assert.equal(
    url,
    'https://wa.me/15550148920?text=Hello%2C%20I%20am%20interested%20in%20your%20fitness%20programs.'
  );
  const msg = getServiceWhatsAppMessage('Personal Training', 'KORS PERFORMANCE');
  assert.ok(msg.includes('Personal Training'));
  assert.ok(msg.includes('KORS PERFORMANCE'));
});

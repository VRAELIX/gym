export function sanitizePhoneNumber(rawNumber: string): string {
  return rawNumber.replace(/\D/g, '');
}

export function buildWhatsAppUrl(phoneNumber: string, message: string): string {
  const digits = sanitizePhoneNumber(phoneNumber);
  const encoded = encodeURIComponent(message.trim());
  return `https://wa.me/${digits}?text=${encoded}`;
}

export function getServiceWhatsAppMessage(serviceTitle: string, businessName: string): string {
  return `Hello ${businessName}, I am interested in your ${serviceTitle} program. Please share availability and next steps.`;
}

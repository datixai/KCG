/**
 * Values saved in the admin panel end up in links. These helpers make sure a link can only
 * ever be a normal web address, email or phone number, never `javascript:` or similar.
 */

/** http(s) link, or '' if it's anything else. */
export function safeUrl(value?: string): string {
  const v = (value ?? '').trim();
  return /^https?:\/\/[^\s<>"']+$/i.test(v) ? v : '';
}

/** Digits only, for wa.me links and tel: numbers. */
export const digits = (value?: string) => (value ?? '').replace(/\D/g, '');

/** A plain email address, or '' if it doesn't look like one. */
export function safeEmail(value?: string): string {
  const v = (value ?? '').trim();
  return /^[^\s@<>"'()\\,;:]+@[^\s@<>"'()\\,;:]+\.[a-z]{2,}$/i.test(v) ? v : '';
}

/** Image/video source: our own files, https links or inline image data, nothing else. */
export function safeSrc(value?: string): string {
  const v = (value ?? '').trim();
  return /^(\/(?!\/)|https:\/\/|data:image\/(jpeg|png|webp|gif|avif);)/i.test(v) ? v : '';
}

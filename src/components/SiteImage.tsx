import Image, { type ImageProps } from 'next/image';
import { safeSrc } from '@/lib/safe';

/**
 * next/image for sources that may come from the admin panel. Our own files go through the
 * optimizer; links to other sites are shown unoptimized, so the optimizer never fetches
 * outside URLs. Anything that isn't a valid image source renders nothing.
 */
export default function SiteImage({ src, ...props }: ImageProps) {
  if (typeof src !== 'string') return <Image src={src} {...props} />;
  const clean = safeSrc(src);
  if (!clean) return null;
  return <Image src={clean} {...props} unoptimized={props.unoptimized || !clean.startsWith('/')} />;
}

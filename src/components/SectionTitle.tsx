import { lines as toLines } from '@/lib/home';

/**
 * Optional eyebrow + serif uppercase heading whose last line is gold, revealed line by line on scroll.
 * `title` holds one heading line per line of text.
 */
export default function SectionTitle({
  eyebrow, title, dark = false, center = false, className = '',
}: { eyebrow?: string; title: string; dark?: boolean; center?: boolean; className?: string }) {
  const lines = toLines(title);
  return (
    <div className={`${center ? 'text-center' : ''} ${className}`}>
      {eyebrow && <p className={`mb-4 text-xs font-semibold uppercase tracking-[0.3em] ${dark ? 'text-gold' : 'text-gold-deep'}`}>{eyebrow}</p>}
      <h2 data-lines className={`font-display text-4xl font-bold uppercase leading-[1.02] sm:text-5xl lg:text-6xl ${dark ? 'text-white' : 'text-forest-deep'}`}>
        {lines.map((l, i) => (
          <span key={`${l}-${i}`} className="line">
            <span className={i === lines.length - 1 ? 'text-gold' : ''}>{l}</span>
          </span>
        ))}
      </h2>
    </div>
  );
}

/**
 * Eyebrow + serif uppercase heading whose last line is gold, revealed line by line on scroll.
 * `lines` are the heading lines; the final one is highlighted.
 */
export default function SectionTitle({
  eyebrow, lines, dark = false, center = false,
}: { eyebrow: string; lines: string[]; dark?: boolean; center?: boolean }) {
  return (
    <div className={center ? 'text-center' : ''}>
      <p data-reveal className={`mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] ${center ? 'justify-center' : ''} ${dark ? 'text-gold' : 'text-gold-dark'}`}>
        <span className="h-px w-8 bg-current" /> {eyebrow}
      </p>
      <h2 data-lines className={`font-display text-4xl font-bold uppercase leading-[1.02] sm:text-5xl lg:text-6xl ${dark ? 'text-white' : 'text-forest-deep'}`}>
        {lines.map((l, i) => (
          <span key={l} className="line">
            <span className={i === lines.length - 1 ? 'text-gold' : ''}>{l}</span>
          </span>
        ))}
      </h2>
    </div>
  );
}

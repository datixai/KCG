import { list } from '@/lib/home';

function Row({ words, reverse = false }: { words: string[]; reverse?: boolean }) {
  const items = [...words, ...words];
  return (
    <div className={`flex w-max ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`}>
      {[0, 1].map((copy) => (
        <div key={copy} className="flex shrink-0 items-center" aria-hidden={copy === 1}>
          {items.map((w, i) => (
            <span key={i} className="flex items-center gap-8 px-8 font-display text-3xl font-bold uppercase sm:text-5xl">
              {w} <span className="text-2xl sm:text-3xl">✱</span>
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

/** Two crossing bands of scrolling text. */
export default function Marquee({ text }: { text: string }) {
  const words = list(text);
  return (
    <section aria-label={words.join(', ')} className="relative overflow-hidden bg-forest-deep py-16 sm:py-20">
      <div className="-rotate-2 bg-gold py-4 text-forest-deep shadow-xl sm:py-5">
        <Row words={words} />
      </div>
      <div className="relative -mt-3 rotate-1 border-y border-gold/30 bg-forest py-4 text-transparent [-webkit-text-stroke:1px_rgba(224,166,59,0.7)] sm:py-5">
        <Row words={words} reverse />
      </div>
    </section>
  );
}

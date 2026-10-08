const words = ['Residential', 'Commercial', 'Infrastructure', 'Renovations', 'Project Management', 'Design & Planning'];

function Row({ reverse = false, className = '' }: { reverse?: boolean; className?: string }) {
  const list = [...words, ...words];
  return (
    <div className={`flex w-max ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'} ${className}`}>
      {[0, 1].map((copy) => (
        <div key={copy} className="flex shrink-0 items-center" aria-hidden={copy === 1}>
          {list.map((w, i) => (
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
export default function Marquee() {
  return (
    <section aria-label="Our services" className="relative overflow-hidden bg-forest-deep py-16 sm:py-20">
      <div className="-rotate-2 bg-gold py-4 text-forest-deep shadow-xl sm:py-5">
        <Row />
      </div>
      <div className="relative -mt-3 rotate-1 border-y border-gold/30 bg-forest py-4 text-transparent [-webkit-text-stroke:1px_rgba(224,166,59,0.7)] sm:py-5">
        <Row reverse />
      </div>
    </section>
  );
}

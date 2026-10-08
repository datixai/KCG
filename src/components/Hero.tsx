import { preload } from 'react-dom';
import { ArrowRight } from 'lucide-react';
import { safeSrc } from '@/lib/safe';
import { lines as toLines, type HomeContent } from '@/lib/home';
import BgVideo from './BgVideo';

export default function Hero({ content }: { content: HomeContent['hero'] }) {
  const lines = toLines(content.title);
  // The poster is the first big thing painted, so fetch it at top priority
  const poster = safeSrc(content.poster);
  if (poster) preload(poster, { as: 'image', fetchPriority: 'high' });

  return (
    <section id="top" className="relative flex min-h-[88svh] items-center overflow-hidden bg-forest-deep">
      {/* Drone footage of the KCG site (poster shows instantly, video starts once the page has loaded) */}
      <BgVideo eager src={content.video} mobileSrc={content.videoMobile} poster={content.poster} className="absolute inset-0 size-full object-cover" />
      <div className="absolute inset-0 bg-forest-deep/65" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(10,42,31,0.6)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-forest-deep/80 to-transparent" />


      {/* Top padding keeps the content clear of the fixed nav bar */}
      <div className="relative mx-auto w-full max-w-7xl px-4 pb-20 pt-32 sm:px-6 lg:pb-24 lg:pt-36">
        <div className="mx-auto max-w-4xl text-center">
          <p className="animate-fade-up mb-5 text-xs font-semibold uppercase tracking-[0.3em] text-gold sm:text-sm">{content.eyebrow}</p>
          <h1 className="font-display text-[2.5rem] font-bold uppercase leading-[0.95] text-white sm:text-6xl lg:text-[clamp(3rem,9vh,5rem)]">
            {lines.map((l, i) => (
              <span key={`${l}-${i}`} className="line hero-line" style={{ '--i': i } as React.CSSProperties}>
                <span className={i === lines.length - 1 ? 'text-gold' : ''}>{l}</span>
              </span>
            ))}
          </h1>
          <p className="animate-fade-up mx-auto mt-6 max-w-xl text-base text-white/85 sm:text-lg" style={{ animationDelay: '700ms' }}>{content.text}</p>
          <div className="animate-fade-up mt-8 flex flex-col justify-center gap-4 sm:flex-row" style={{ animationDelay: '850ms' }}>
            <a href="#contact" className="btn-gold">{content.primaryCta} <ArrowRight className="size-4" /></a>
            <a href="#projects" className="btn-outline">{content.secondaryCta}</a>
          </div>
        </div>
      </div>


      {/* Scroll cue */}
      <a href="#about" aria-label="Scroll down" className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-white/60 md:flex">
        Scroll
        <span className="relative h-10 w-px overflow-hidden bg-white/20"><span className="absolute inset-x-0 top-0 h-1/2 animate-[scrollcue_1.8s_ease-in-out_infinite] bg-gold" /></span>
      </a>
      <style>{`@keyframes scrollcue { 0% { transform: translateY(-100%) } 100% { transform: translateY(200%) } }`}</style>
    </section>
  );
}

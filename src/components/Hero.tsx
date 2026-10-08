import { ArrowRight, MapPin } from 'lucide-react';
import { lines as toLines, type HomeContent } from '@/lib/home';
import BgVideo from './BgVideo';

export default function Hero({ content }: { content: HomeContent['hero'] }) {
  const lines = toLines(content.title);
  const [town, region] = content.location.split(',').map((s) => s.trim());

  return (
    <section id="top" className="relative flex min-h-[88svh] items-center overflow-hidden bg-forest-deep">
      {/* Drone footage of the KCG site */}
      <BgVideo src={content.video} mobileSrc={content.videoMobile} poster={content.poster} className="absolute inset-0 size-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-forest-deep/95 via-forest-deep/65 to-forest-deep/10" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-forest-deep/80 to-transparent" />

      {/* Signature gold diagonals */}
      <div className="stripe -top-20 left-[64%] hidden h-[140%] w-3 rotate-[24deg] opacity-90 lg:block" />
      <div className="stripe -top-20 left-[67%] hidden h-[140%] w-1 rotate-[24deg] opacity-50 lg:block" />

      {/* Top padding keeps the content clear of the fixed nav bar */}
      <div className="relative mx-auto w-full max-w-7xl px-4 pb-20 pt-32 sm:px-6 lg:pb-24 lg:pt-36">
        <div className="max-w-3xl">
          <p className="animate-fade-up mb-5 text-xs font-semibold uppercase tracking-[0.3em] text-gold sm:text-sm">{content.eyebrow}</p>
          <h1 className="font-display text-[2.5rem] font-bold uppercase leading-[0.95] text-white sm:text-6xl lg:text-[clamp(3rem,9vh,5rem)]">
            {lines.map((l, i) => (
              <span key={`${l}-${i}`} className="line hero-line" style={{ '--i': i } as React.CSSProperties}>
                <span className={i === lines.length - 1 ? 'text-gold' : ''}>{l}</span>
              </span>
            ))}
          </h1>
          <p className="animate-fade-up mt-6 max-w-lg text-base text-white/85 sm:text-lg" style={{ animationDelay: '700ms' }}>{content.text}</p>
          <div className="animate-fade-up mt-8 flex flex-col gap-4 sm:flex-row" style={{ animationDelay: '850ms' }}>
            <a href="#contact" className="btn-gold">{content.primaryCta} <ArrowRight className="size-4" /></a>
            <a href="#projects" className="btn-outline">{content.secondaryCta}</a>
          </div>
        </div>
      </div>

      {/* Location tag */}
      <div className="animate-fade-up absolute bottom-8 right-4 hidden items-center gap-3 rounded-md border border-white/15 bg-forest-deep/50 px-4 py-3 text-sm text-white backdrop-blur-md sm:flex md:right-8" style={{ animationDelay: '1s' }}>
        <MapPin className="size-5 text-gold" />
        <span className="leading-tight">{town}{region && <span className="block text-xs text-white/60">{region}</span>}</span>
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

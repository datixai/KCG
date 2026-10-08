'use client';
import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { ArrowRight, ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import { site } from '@/config/site';

const slides = [
  { image: '/images/projects/modern-villa.webp', alt: 'Modern villa built by KCG' },
  { image: '/images/kashmir-village.webp', alt: 'Homes in the mountains of Kashmir' },
  { image: '/images/projects/hero-site.webp', alt: 'Construction site with cranes' },
];
const SLIDE_MS = 6500;

export default function Hero() {
  const [index, setIndex] = useState(0);
  const go = useCallback((n: number) => setIndex((n + slides.length) % slides.length), []);

  useEffect(() => {
    const t = setTimeout(() => go(index + 1), SLIDE_MS);
    return () => clearTimeout(t);
  }, [index, go]);

  const lines = ['The', 'Foundation', 'of Modern'];

  return (
    <section id="top" className="relative flex min-h-svh items-center overflow-hidden bg-forest-deep">
      {/* Slides: crossfade + slow zoom */}
      {slides.map((s, i) => (
        <div key={s.image} className={`absolute inset-0 transition-opacity duration-[1400ms] ${i === index ? 'opacity-100' : 'opacity-0'}`}>
          <Image src={s.image} alt={s.alt} fill priority={i === 0} sizes="100vw" className={`object-cover ${i === index ? 'animate-ken-burns' : ''}`} />
        </div>
      ))}
      <div className="absolute inset-0 bg-gradient-to-r from-forest-deep via-forest-deep/70 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-forest-deep to-transparent" />

      {/* Signature gold diagonals */}
      <div className="stripe -top-20 left-[64%] hidden h-[140%] w-3 rotate-[24deg] opacity-90 lg:block" />
      <div className="stripe -top-20 left-[67%] hidden h-[140%] w-1 rotate-[24deg] opacity-50 lg:block" />

      <div className="relative mx-auto w-full max-w-7xl px-4 pb-24 pt-32 sm:px-6">
        <div className="max-w-3xl">
          <p className="animate-fade-up mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-gold sm:text-sm">
            <span className="h-px w-10 bg-gold" /> Kashmir Construction Group
          </p>
          <h1 className="font-display text-[2.6rem] font-bold uppercase leading-[0.95] text-white sm:text-6xl lg:text-[5.4rem]">
            {lines.map((l, i) => (
              <span key={l} className="line hero-line" style={{ '--i': i } as React.CSSProperties}><span>{l}</span></span>
            ))}
            <span className="line hero-line" style={{ '--i': 3 } as React.CSSProperties}><span className="text-gold">Kashmir</span></span>
          </h1>
          <p className="animate-fade-up mt-8 max-w-lg text-base text-white/80 sm:text-lg" style={{ animationDelay: '700ms' }}>{site.description}</p>
          <div className="animate-fade-up mt-10 flex flex-col gap-4 sm:flex-row" style={{ animationDelay: '850ms' }}>
            <a href="#contact" className="btn-gold">Get a Quote <ArrowRight className="size-4" /></a>
            <a href="#projects" className="btn-outline">Our Projects</a>
          </div>
        </div>
      </div>

      {/* Location tag */}
      <div className="animate-fade-up absolute right-4 top-28 hidden items-center gap-3 rounded-md border border-white/15 bg-forest-deep/50 px-4 py-3 text-sm text-white backdrop-blur-md sm:flex md:right-8 md:top-32" style={{ animationDelay: '1s' }}>
        <MapPin className="size-5 text-gold" />
        <span className="leading-tight">{site.location.split(',')[0]}<span className="block text-xs text-white/60">{site.location.split(',')[1]}</span></span>
      </div>

      {/* Slide controls */}
      <div className="absolute bottom-8 left-4 flex items-center gap-5 text-white sm:left-auto sm:right-8">
        <div className="flex items-center gap-3 font-display text-sm">
          {slides.map((_, i) => (
            <button key={i} onClick={() => go(i)} className={`flex items-center gap-2 transition ${i === index ? 'text-gold' : 'text-white/50 hover:text-white'}`} aria-label={`Slide ${i + 1}`}>
              {String(i + 1).padStart(2, '0')}
              {i === index && (
                <span className="relative h-0.5 w-10 overflow-hidden bg-white/20">
                  <span key={index} className="absolute inset-y-0 left-0 bg-gold" style={{ animation: `progress ${SLIDE_MS}ms linear both` }} />
                </span>
              )}
            </button>
          ))}
        </div>
        <div className="hidden gap-2 sm:flex">
          <button onClick={() => go(index - 1)} className="grid size-10 place-items-center rounded-full border border-white/30 transition hover:border-gold hover:text-gold" aria-label="Previous slide"><ChevronLeft className="size-5" /></button>
          <button onClick={() => go(index + 1)} className="grid size-10 place-items-center rounded-full border border-white/30 transition hover:border-gold hover:text-gold" aria-label="Next slide"><ChevronRight className="size-5" /></button>
        </div>
      </div>
      <style>{`@keyframes progress { from { width: 0 } to { width: 100% } }`}</style>
    </section>
  );
}

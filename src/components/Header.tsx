'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { site } from '@/config/site';

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all ${
        scrolled || open ? 'bg-ink/90 shadow-lg backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-20 sm:px-6">
        <a href="#" className="flex items-center gap-3">
          <Image src="/brand/logo.jpg" alt={site.name} width={48} height={48} className="size-10 rounded-full sm:size-12" priority />
          <span className="font-display text-lg font-semibold tracking-wider text-white sm:text-xl">{site.short}</span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {site.nav.map((n) => (
            <li key={n.href}>
              <a href={n.href} className="text-sm font-medium text-neutral-300 transition hover:text-brand-orange">{n.label}</a>
            </li>
          ))}
          <li>
            <a href="#contact" className="rounded-full bg-brand-green px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-green-dark">
              Get a Quote
            </a>
          </li>
        </ul>

        <button onClick={() => setOpen(!open)} className="p-2 text-white md:hidden" aria-label="Toggle menu" aria-expanded={open}>
          {open ? <X /> : <Menu />}
        </button>
      </nav>

      {open && (
        <ul className="space-y-1 border-t border-white/10 px-4 pb-6 pt-2 md:hidden">
          {site.nav.map((n) => (
            <li key={n.href}>
              <a href={n.href} onClick={() => setOpen(false)} className="block rounded-lg px-3 py-3 text-neutral-200 hover:bg-white/5">{n.label}</a>
            </li>
          ))}
          <li>
            <a href="#contact" onClick={() => setOpen(false)} className="mt-2 block rounded-full bg-brand-green px-5 py-3 text-center font-semibold text-white">Get a Quote</a>
          </li>
        </ul>
      )}
    </header>
  );
}

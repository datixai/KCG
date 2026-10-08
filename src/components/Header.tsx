'use client';
import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Menu, X } from 'lucide-react';
import { site } from '@/config/site';
import Logo from './Logo';

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  // Solid background once scrolled; hide while scrolling down, reappear when scrolling up
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 30);
      setHidden(y > 400 && y > lastY.current);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { document.body.style.overflow = open ? 'hidden' : ''; }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${hidden && !open ? '-translate-y-full' : ''} ${
          scrolled || open ? 'bg-forest-deep/95 shadow-2xl shadow-black/30 backdrop-blur-md' : 'bg-gradient-to-b from-forest-deep/80 to-transparent'
        }`}
      >
        <nav className={`mx-auto flex max-w-7xl items-center justify-between px-4 transition-all sm:px-6 ${scrolled ? 'h-18' : 'h-20 sm:h-24'}`}>
          <a href="#top" aria-label={site.name}><Logo /></a>

          <ul className="hidden items-center gap-7 lg:flex">
            {site.nav.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="group relative py-2 text-sm font-medium text-white/85 transition hover:text-gold">
                  {n.label}
                  <span className="absolute inset-x-0 -bottom-0.5 h-0.5 origin-left scale-x-0 bg-gold transition-transform duration-300 group-hover:scale-x-100" />
                </a>
              </li>
            ))}
          </ul>

          <a href="#contact" className="btn-gold hidden !px-5 !py-3 lg:inline-flex">
            Get a Quote <ArrowRight className="size-4" />
          </a>

          <button onClick={() => setOpen(!open)} className="relative z-[60] p-2 text-white lg:hidden" aria-label="Toggle menu" aria-expanded={open}>
            {open ? <X className="size-7" /> : <Menu className="size-7" />}
          </button>
        </nav>
      </header>

      {/* Mobile full-screen menu */}
      <div className={`fixed inset-0 z-[45] flex flex-col bg-forest-deep transition-all duration-500 lg:hidden ${open ? 'visible opacity-100' : 'invisible opacity-0'}`}>
        <div className="stripe -right-10 top-0 h-full w-24 -skew-x-12 opacity-80" />
        <ul className="mt-28 space-y-2 px-8">
          {site.nav.map((n, i) => (
            <li key={n.href} className={`transition-all duration-500 ${open ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'}`} style={{ transitionDelay: open ? `${100 + i * 60}ms` : '0ms' }}>
              <a href={n.href} onClick={() => setOpen(false)} className="block py-2 font-display text-3xl font-bold text-white hover:text-gold">{n.label}</a>
            </li>
          ))}
        </ul>
        <div className="mt-auto p-8">
          <a href="#contact" onClick={() => setOpen(false)} className="btn-gold w-full">Get a Quote <ArrowRight className="size-4" /></a>
        </div>
      </div>
    </>
  );
}

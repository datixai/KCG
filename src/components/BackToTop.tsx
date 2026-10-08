'use client';
import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

const R = 22;
const C = 2 * Math.PI * R;

/** Back-to-top button whose gold ring fills as you scroll down the page. */
export default function BackToTop() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toTop = () => {
    const lenis = (window as unknown as { __lenis?: { scrollTo: (t: number) => void } }).__lenis;
    if (lenis) lenis.scrollTo(0);
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={toTop}
      aria-label="Back to top"
      className={`fixed bottom-24 right-5 z-40 grid size-12 place-items-center rounded-full bg-forest-deep text-gold shadow-lg transition-all duration-500 hover:bg-gold hover:text-forest-deep ${progress > 0.06 ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'}`}
    >
      <svg className="absolute inset-0 -rotate-90" viewBox="0 0 48 48" aria-hidden="true">
        <circle cx="24" cy="24" r={R} fill="none" stroke="currentColor" strokeOpacity="0.2" strokeWidth="2" />
        <circle cx="24" cy="24" r={R} fill="none" stroke="#e0a63b" strokeWidth="2" strokeDasharray={C} strokeDashoffset={C * (1 - progress)} strokeLinecap="round" />
      </svg>
      <ArrowUp className="relative size-5" />
    </button>
  );
}

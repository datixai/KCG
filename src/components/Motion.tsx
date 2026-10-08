'use client';
import { useEffect } from 'react';

/**
 * Scroll motion for the public site, driven by data attributes so section
 * components can stay server-rendered:
 *   data-lines     heading whose `.line > span` children slide up one by one
 *   data-reveal    fade + rise (optional data-delay in seconds)
 *   data-stagger   children fade + rise one after another
 *   data-curtain   image wipes open from left to right
 *   data-parallax  moves slower than the page (data-speed, default 12)
 *   data-count     number counts up to its value (data-suffix e.g. "+")
 *   data-stripe    gold stripe grows in
 * GSAP + Lenis load after the page is interactive, and nothing runs for
 * visitors who prefer reduced motion.
 */
export default function Motion() {
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let cleanup = () => {};
    let cancelled = false;

    (async () => {
      const [{ gsap }, { ScrollTrigger }, { default: Lenis }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
        import('lenis'),
      ]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      const lenis = new Lenis({ lerp: 0.09, anchors: { offset: -72 } });
      (window as unknown as { __lenis?: unknown }).__lenis = lenis;
      lenis.on('scroll', ScrollTrigger.update);
      const tick = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);

      const all = <T extends HTMLElement>(sel: string) => gsap.utils.toArray<T>(sel);
      // Fade + rise in. CSS transitions are paused while GSAP animates and its inline
      // styles are removed afterwards, so Tailwind hover effects keep working.
      const rise = (targets: gsap.TweenTarget, trigger: Element, vars: gsap.TweenVars = {}) => {
        gsap.set(targets, { transition: 'none' });
        gsap.from(targets, {
          y: 50, autoAlpha: 0, duration: 0.95, ease: 'power3.out', ...vars,
          clearProps: 'transition,transform,opacity,visibility',
          scrollTrigger: { trigger, start: 'top 88%' },
        });
      };
      const ctx = gsap.context(() => {
        all('[data-lines]').forEach((el) =>
          gsap.from(el.querySelectorAll('.line > span'), {
            yPercent: 110, duration: 1.1, ease: 'power4.out', stagger: 0.09,
            scrollTrigger: { trigger: el, start: 'top 88%' },
          }));

        all('[data-reveal]').forEach((el) => rise(el, el, { delay: Number(el.dataset.delay || 0) }));

        all('[data-stagger]').forEach((el) => rise(el.children, el, { stagger: 0.12 }));

        all('[data-curtain]').forEach((el) =>
          gsap.fromTo(el, { clipPath: 'inset(0 100% 0 0)' }, {
            clipPath: 'inset(0 0% 0 0)', duration: 1.4, ease: 'power4.inOut',
            scrollTrigger: { trigger: el, start: 'top 82%' },
          }));

        all('[data-parallax]').forEach((el) => {
          const speed = Number(el.dataset.speed || 12);
          gsap.fromTo(el, { yPercent: -speed }, {
            yPercent: speed, ease: 'none',
            scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
          });
        });

        all('[data-count]').forEach((el) => {
          const counter = { v: 0 };
          gsap.to(counter, {
            v: Number(el.dataset.count), duration: 2.2, ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 90%' },
            onUpdate: () => { el.textContent = Math.round(counter.v) + (el.dataset.suffix || ''); },
          });
        });

        all('[data-stripe]').forEach((el) =>
          gsap.from(el, {
            scaleY: 0, transformOrigin: 'top center', duration: 1.5, ease: 'power4.inOut',
            scrollTrigger: { trigger: el, start: 'top 90%' },
          }));

      });

      // Images load after layout; re-measure trigger positions
      window.addEventListener('load', () => ScrollTrigger.refresh(), { once: true });

      cleanup = () => {
        ctx.revert();
        gsap.ticker.remove(tick);
        lenis.destroy();
      };
    })();

    return () => { cancelled = true; cleanup(); };
  }, []);

  return null;
}

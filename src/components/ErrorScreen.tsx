'use client';
import { useEffect } from 'react';

// After the site is updated, a tab left open can ask for code files the new version no longer has.
// Reloading once fixes it, so do that automatically instead of showing an error.
const isStaleVersion = (e: Error) => /ChunkLoadError|Loading chunk|Failed to fetch dynamically imported module|Failed to load chunk|Server Action/i.test(`${e.name} ${e.message}`);

export default function ErrorScreen({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    const key = 'kcg-reloaded-at';
    let last = 0;
    try { last = Number(sessionStorage.getItem(key) ?? 0); } catch {}
    // Reload at most once a minute so a real fault can't cause a reload loop
    if (isStaleVersion(error) && Date.now() - last > 60_000) {
      try { sessionStorage.setItem(key, String(Date.now())); } catch {}
      window.location.reload();
    }
  }, [error]);

  return (
    <div className="grid min-h-[60svh] place-items-center bg-forest-deep px-4 py-24 text-center text-white">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">Something went wrong</p>
        <h1 className="mt-4 font-display text-3xl font-bold uppercase sm:text-4xl">Please reload the page</h1>
        <p className="mx-auto mt-4 max-w-md text-white/70">The website may have just been updated. Reloading usually fixes this.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button onClick={() => window.location.reload()} className="btn-gold">Reload</button>
          <button onClick={reset} className="btn-outline">Try Again</button>
        </div>
      </div>
    </div>
  );
}

import Image from 'next/image';

/** Circular text spinning around the KCG mark, spaced to wrap the circle once. */
export default function RotatingBadge({ text, className = '' }: { text: string; className?: string }) {
  // Circle is ~239 units round; ~6.3 units per uppercase letter at size 10, the rest goes into letter spacing
  const spacing = Math.max(0, (236 - text.length * 6.3) / Math.max(text.length, 1));
  return (
    <div className={`relative grid size-32 place-items-center rounded-full bg-forest-deep shadow-2xl shadow-black/40 sm:size-36 ${className}`}>
      <svg viewBox="0 0 100 100" className="absolute inset-0 animate-spin-slow" aria-hidden="true">
        <defs><path id="badge-circle" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" /></defs>
        <text className="fill-gold font-semibold uppercase" style={{ fontSize: 10, letterSpacing: `${spacing}px` }}>
          <textPath href="#badge-circle">{text}</textPath>
        </text>
      </svg>
      <Image src="/brand/logo-mark-light.png" alt="" width={213} height={255} className="h-12 w-auto sm:h-14" />
    </div>
  );
}

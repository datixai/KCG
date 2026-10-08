import Image from 'next/image';

/** Circular "KASHMIR CONSTRUCTION GROUP • BUILDING KASHMIR •" text spinning around the KCG mark. */
export default function RotatingBadge({ className = '' }: { className?: string }) {
  return (
    <div className={`relative grid size-32 place-items-center rounded-full bg-forest-deep shadow-2xl shadow-black/40 sm:size-36 ${className}`}>
      <svg viewBox="0 0 100 100" className="absolute inset-0 animate-spin-slow" aria-hidden="true">
        <defs><path id="badge-circle" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" /></defs>
        <text className="fill-gold text-[8.6px] font-semibold uppercase tracking-[0.18em]">
          <textPath href="#badge-circle">Kashmir Construction Group • Building Kashmir •</textPath>
        </text>
      </svg>
      <Image src="/brand/logo-mark-light.png" alt="" width={213} height={255} className="h-12 w-auto sm:h-14" />
    </div>
  );
}

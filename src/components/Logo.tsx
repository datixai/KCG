import Image from 'next/image';

/** White + gold KCG mark with the company name, for dark green backgrounds. */
export default function Logo({ tagline = true, className = '' }: { tagline?: boolean; className?: string }) {
  return (
    <span className={`flex items-center gap-3 ${className}`}>
      <Image src="/brand/logo-mark-light.png" alt="" width={213} height={255} className="h-11 w-auto sm:h-13" priority />
      <span className="leading-none">
        <span className="block font-display text-lg font-bold tracking-[0.18em] text-white sm:text-xl">KASHMIR</span>
        <span className="mt-1 flex items-center gap-1.5 text-[8.5px] font-semibold tracking-[0.22em] text-gold sm:text-[9.5px]">
          <span className="h-px w-3 bg-white/60" />CONSTRUCTION GROUP<span className="h-px w-3 bg-white/60" />
        </span>
        {tagline && <span className="mt-1 hidden text-[7.5px] tracking-[0.2em] text-white/60 sm:block">THE FOUNDATION OF MODERN KASHMIR</span>}
      </span>
    </span>
  );
}

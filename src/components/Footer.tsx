import Image from 'next/image';
import { Mail } from 'lucide-react';
import { site } from '@/config/site';
import type { SiteSettings } from '@/types';
import { TikTokIcon, WhatsAppIcon } from './BrandIcons';

export default function Footer({ settings }: { settings: SiteSettings }) {
  const socials = [
    { label: 'Email', href: `mailto:${settings.email}`, icon: <Mail className="size-4" />, hover: 'hover:bg-brand-orange' },
    { label: 'WhatsApp', href: `https://wa.me/${settings.whatsapp}`, icon: <WhatsAppIcon className="size-4" />, hover: 'hover:bg-[#25D366]' },
    { label: 'TikTok', href: site.social.tiktok, icon: <TikTokIcon className="size-4" />, hover: 'hover:bg-white hover:text-black' },
  ];
  return (
    <footer className="border-t border-white/10 bg-black py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 text-center sm:flex-row sm:justify-between sm:px-6 sm:text-left">
        <div className="flex items-center gap-3">
          <Image src="/brand/logo-mark.png" alt="" width={36} height={43} className="h-10 w-auto" />
          <span className="font-display tracking-wider text-white">{site.name}</span>
        </div>
        <div className="flex gap-3">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              title={s.label}
              className={`grid size-9 place-items-center rounded-full border border-white/15 text-neutral-300 transition hover:border-transparent hover:text-white ${s.hover}`}
            >
              {s.icon}
            </a>
          ))}
        </div>
        <p className="text-xs text-neutral-500">© {new Date().getFullYear()} {site.short}. All rights reserved.</p>
      </div>
      <div className="mx-auto mt-8 max-w-7xl border-t border-white/5 px-4 pt-6 text-center text-xs text-neutral-500 sm:px-6">
        Designed &amp; Developed by{' '}
        <a href="https://datixai.com" target="_blank" rel="noopener" className="font-semibold text-brand-orange transition hover:text-brand-green">
          Datix AI
        </a>
      </div>
    </footer>
  );
}

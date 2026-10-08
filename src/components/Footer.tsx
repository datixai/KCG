import Image from 'next/image';
import { site } from '@/config/site';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 text-center sm:flex-row sm:justify-between sm:px-6 sm:text-left">
        <div className="flex items-center gap-3">
          <Image src="/brand/logo.jpg" alt="" width={40} height={40} className="rounded-full" />
          <span className="font-display tracking-wider text-white">{site.name}</span>
        </div>
        <div className="flex gap-6 text-sm text-neutral-400">
          <a href={site.social.tiktok} target="_blank" rel="noopener noreferrer" className="hover:text-brand-orange">TikTok</a>
          <a href="#contact" className="hover:text-brand-orange">Contact</a>
        </div>
        <p className="text-xs text-neutral-500">© {new Date().getFullYear()} {site.short}. All rights reserved.</p>
      </div>
    </footer>
  );
}

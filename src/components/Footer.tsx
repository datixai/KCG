import { ArrowRight, Mail, MapPin, Phone } from 'lucide-react';
import { site } from '@/config/site';
import type { Service, SiteSettings } from '@/types';
import { FacebookIcon, InstagramIcon, LinkedInIcon, TikTokIcon, WhatsAppIcon, YouTubeIcon } from './BrandIcons';
import Logo from './Logo';
import { digits, safeEmail, safeUrl } from '@/lib/safe';
import { AjkFlag, UkFlag } from './Flags';

export default function Footer({ settings, services, blurb }: { settings: SiteSettings; services: Service[]; blurb: string }) {
  // Links from admin Settings are checked so they can only be real web/email/WhatsApp links
  const email = safeEmail(settings.email);
  const wa = digits(settings.whatsapp);
  const socials = [
    { label: 'Facebook', href: safeUrl(settings.facebook), Icon: FacebookIcon },
    { label: 'Instagram', href: safeUrl(settings.instagram), Icon: InstagramIcon },
    { label: 'TikTok', href: safeUrl(settings.tiktok), Icon: TikTokIcon },
    { label: 'YouTube', href: safeUrl(settings.youtube), Icon: YouTubeIcon },
    { label: 'LinkedIn', href: safeUrl(settings.linkedin), Icon: LinkedInIcon },
    { label: 'WhatsApp', href: wa ? `https://wa.me/${wa}` : '', Icon: WhatsAppIcon },
    { label: 'Email', href: email ? `mailto:${email}` : '', Icon: Mail },
  ].filter((s) => s.href);

  const heading = 'mb-5 text-sm font-bold uppercase tracking-wider text-white';
  const link = 'text-sm text-white/65 transition hover:translate-x-1 hover:text-gold inline-block';

  return (
    <footer className="relative overflow-hidden bg-forest-deep pt-20 text-white">
      <div className="stripe -right-16 top-0 h-full w-6 rotate-[18deg] opacity-20" />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-[1.4fr_1fr_1.2fr_1.4fr]">
        <div>
          <Logo />
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-white/65">{blurb}</p>
          <div className="mt-6 flex flex-wrap gap-2.5">
            {socials.map(({ label, href, Icon }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} title={label}
                className="grid size-10 place-items-center rounded-full border border-white/15 text-white/80 transition hover:-translate-y-1 hover:border-gold hover:bg-gold hover:text-forest-deep">
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className={heading}>Quick Links</h3>
          <ul className="space-y-3">{site.nav.map((n) => <li key={n.href}><a href={n.href} className={link}>{n.label}</a></li>)}</ul>
        </div>

        <div>
          <h3 className={heading}>Our Services</h3>
          <ul className="space-y-3">{services.map((s) => <li key={s.id}><a href="#services" className={link}>{s.title}</a></li>)}</ul>
        </div>

        <div>
          <h3 className={heading}>Contact Us</h3>
          <ul className="space-y-3.5 text-sm text-white/70">
            {settings.owner && <li className="text-xs uppercase tracking-[0.2em] text-gold">Prop: {settings.owner}</li>}
            {[settings.phoneDisplay, settings.phone2Display].filter(Boolean).map((p) => (
              <li key={p}><a href={`tel:${p.replace(/[^\d+]/g, '')}`} className="flex items-center gap-3 hover:text-gold"><Phone className="size-4 text-gold" /> {p}</a></li>
            ))}
            {email && <li><a href={`mailto:${email}`} className="flex items-center gap-3 break-all hover:text-gold"><Mail className="size-4 shrink-0 text-gold" /> {email}</a></li>}
            <li className="flex items-start gap-3"><MapPin className="mt-0.5 size-4 shrink-0 text-gold" /> {settings.address}</li>
          </ul>
          <a href="#contact" className="btn-gold mt-7">Get a Quote <ArrowRight className="size-4" /></a>
        </div>
      </div>

      <div className="relative mt-16 border-t border-white/10">
        <div className="mx-auto grid max-w-7xl items-center justify-items-center gap-3 px-4 py-6 text-xs text-white/50 sm:grid-cols-3 sm:px-6 sm:[&>*:first-child]:justify-self-start sm:[&>*:last-child]:justify-self-end">
          <p>
            Designed &amp; Developed by{' '}
            <a href="https://datixai.com" target="_blank" rel="noopener" className="font-semibold text-gold transition hover:text-gold-light">Datix AI</a>
          </p>
          <div className="flex items-center gap-2" aria-label="Azad Kashmir and United Kingdom">
            <AjkFlag className="h-3.5 w-auto rounded-[2px] shadow-sm" />
            <UkFlag className="h-3.5 w-auto rounded-[2px] shadow-sm" />
          </div>
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

import { Mail, MapPin, Phone } from 'lucide-react';
import { site } from '@/config/site';
import { SectionTitle } from './Services';

export default function Contact() {
  const items = [
    { icon: Phone, label: 'Call Us', value: site.phoneDisplay, href: `tel:${site.phoneDisplay.replace(/\s/g, '')}` },
    { icon: Mail, label: 'Email', value: site.email, href: `mailto:${site.email}` },
    { icon: MapPin, label: 'Location', value: site.address },
  ];
  return (
    <section id="contact" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionTitle eyebrow="Get In Touch" title="Start Your Project" />
        <div className="mt-12 grid gap-8 lg:grid-cols-5">
          <div className="space-y-4 lg:col-span-2">
            {items.map(({ icon: Icon, label, value, href }) => (
              <a key={label} href={href} className="reveal flex items-start gap-4 rounded-2xl border border-white/10 p-5 transition hover:border-brand-green/50">
                <Icon className="mt-0.5 size-5 shrink-0 text-brand-orange" />
                <div className="min-w-0">
                  <div className="text-sm text-neutral-500">{label}</div>
                  <div className="break-words font-medium text-white">{value}</div>
                </div>
              </a>
            ))}
          </div>
          {/* Opens WhatsApp with the message — no backend needed yet */}
          <form action={`https://wa.me/${site.whatsapp}`} method="get" target="_blank" className="reveal grid gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8 lg:col-span-3">
            <textarea
              required
              name="text"
              rows={6}
              placeholder="Hi KCG, my name is ... I'd like a quote for ..."
              className="rounded-xl border border-white/10 bg-ink px-4 py-3 text-white outline-none placeholder:text-neutral-500 focus:border-brand-green"
            />
            <button className="rounded-full bg-brand-green px-7 py-3.5 font-semibold text-white transition hover:bg-brand-green-dark">Send via WhatsApp</button>
          </form>
        </div>
      </div>
    </section>
  );
}

'use client';
import { useRef, useState } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

const input =
  'w-full rounded-sm border border-forest/15 bg-cream/60 px-4 py-3.5 text-forest-deep outline-none transition placeholder:text-charcoal/40 focus:border-gold focus:bg-white';

export default function ContactForm({ title, text }: { title: string; text: string }) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const startedAt = useRef(Date.now());

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    // Simple bot filter: a hidden field people never see, and forms filled in under 3 seconds.
    // Bots get the normal thank-you screen but nothing is saved.
    if (data.get('website') || Date.now() - startedAt.current < 3000) {
      form.reset();
      setStatus('sent');
      return;
    }
    setStatus('sending');
    try {
      // Firebase is loaded only when someone actually sends a message, keeping the page light
      const [{ addDoc, collection, serverTimestamp }, { db }] = await Promise.all([import('firebase/firestore'), import('@/lib/firebase')]);
      await addDoc(collection(db, 'messages'), {
        name: String(data.get('name')).trim(),
        phone: String(data.get('phone')).trim(),
        message: String(data.get('message')).trim(),
        read: false,
        createdAt: serverTimestamp(),
      });
      form.reset();
      setStatus('sent');
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  }

  if (status === 'sent')
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4 rounded-sm bg-forest p-12 text-center shadow-2xl shadow-forest-deep/20">
        <CheckCircle2 className="size-14 text-gold" />
        <p className="font-display text-2xl font-bold text-white">Thank You!</p>
        <p className="text-white/70">We&apos;ve received your message and will contact you shortly.</p>
        <button onClick={() => setStatus('idle')} className="mt-2 text-sm font-semibold text-gold hover:underline">Send another message</button>
      </div>
    );

  return (
    <form onSubmit={onSubmit} className="relative grid gap-4 overflow-hidden rounded-sm bg-white p-6 shadow-2xl shadow-forest-deep/10 sm:grid-cols-2 sm:p-10">
      <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-gold-dark via-gold to-gold-light" />
      <h3 className="font-display text-2xl font-bold uppercase text-forest-deep sm:col-span-2">{title}</h3>
      <p className="-mt-2 mb-2 text-sm text-charcoal/75 sm:col-span-2">{text}</p>
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 opacity-0" />
      <input required name="name" maxLength={150} placeholder="Your Name" className={input} />
      <input required name="phone" type="tel" maxLength={30} placeholder="Phone / WhatsApp" className={input} />
      <textarea required name="message" rows={5} maxLength={4000} placeholder="Tell us about your project: location, type, size..." className={`${input} sm:col-span-2`} />
      {status === 'error' && <p className="text-sm text-red-600 sm:col-span-2">Could not send your message. Please try WhatsApp or call us.</p>}
      <button disabled={status === 'sending'} className="btn-gold disabled:opacity-60 sm:col-span-2">
        {status === 'sending' ? 'Sending…' : <>Send Message <ArrowRight className="size-4" /></>}
      </button>
    </form>
  );
}

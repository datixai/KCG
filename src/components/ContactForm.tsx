'use client';
import { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';

const input =
  'rounded-xl border border-white/10 bg-ink px-4 py-3 text-white outline-none placeholder:text-neutral-500 focus:border-brand-green';

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
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
      <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-brand-green/40 bg-brand-green/10 p-10 text-center lg:col-span-3">
        <CheckCircle2 className="size-10 text-brand-green" />
        <p className="text-lg font-semibold text-white">Thank you! We&apos;ll contact you shortly.</p>
        <button onClick={() => setStatus('idle')} className="text-sm text-brand-orange hover:underline">Send another message</button>
      </div>
    );

  return (
    <form onSubmit={onSubmit} className="reveal grid gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:grid-cols-2 sm:p-8 lg:col-span-3">
      <input required name="name" maxLength={150} placeholder="Your Name" className={input} />
      <input required name="phone" type="tel" maxLength={30} placeholder="Phone Number" className={input} />
      <textarea required name="message" rows={5} maxLength={4000} placeholder="Tell us about your project..." className={`${input} sm:col-span-2`} />
      {status === 'error' && <p className="text-sm text-red-400 sm:col-span-2">Could not send your message. Please try WhatsApp or call us.</p>}
      <button disabled={status === 'sending'} className="rounded-full bg-brand-green px-7 py-3.5 font-semibold text-white transition hover:bg-brand-green-dark disabled:opacity-60 sm:col-span-2">
        {status === 'sending' ? 'Sending…' : 'Send Message'}
      </button>
    </form>
  );
}

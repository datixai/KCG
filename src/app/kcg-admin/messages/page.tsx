'use client';
import { useEffect, useState } from 'react';
import { collection, deleteDoc, doc, getDocs, orderBy, query, updateDoc } from 'firebase/firestore';
import toast from 'react-hot-toast';
import { MessageCircle, Phone, Trash2 } from 'lucide-react';
import { db } from '@/lib/firebase';
import type { Message } from '@/types';
import { friendlyError } from '@/lib/errors';

export default function MessagesAdmin() {
  const [messages, setMessages] = useState<Message[] | null>(null);

  const load = async () => {
    const snap = await getDocs(query(collection(db, 'messages'), orderBy('createdAt', 'desc')));
    setMessages(snap.docs.map((d) => ({ id: d.id, ...d.data() }) as Message));
  };

  useEffect(() => { load().catch((e) => { toast.error(friendlyError(e), { duration: 8000 }); setMessages([]); }); }, []);

  const markRead = async (m: Message) => {
    if (m.read) return;
    await updateDoc(doc(db, 'messages', m.id), { read: true });
    setMessages((list) => list?.map((x) => (x.id === m.id ? { ...x, read: true } : x)) ?? null);
  };

  const remove = async (m: Message) => {
    if (!confirm(`Delete message from ${m.name}?`)) return;
    await deleteDoc(doc(db, 'messages', m.id));
    setMessages((list) => list?.filter((x) => x.id !== m.id) ?? null);
  };

  const wa = (phone: string) => phone.replace(/\D/g, '').replace(/^0/, '92');

  return (
    <div>
      <h1 className="mb-6 font-display text-2xl font-bold text-white">Messages</h1>
      {messages === null ? (
        <p className="text-neutral-500">Loading…</p>
      ) : messages.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-white/10 p-8 text-center text-neutral-500">No messages yet. Contact form submissions will appear here.</p>
      ) : (
        <ul className="space-y-3">
          {messages.map((m) => (
            <li key={m.id} onClick={() => markRead(m)} className={`rounded-2xl border p-4 sm:p-5 ${m.read ? 'border-white/10 bg-white/[0.02]' : 'border-gold/40 bg-gold/5'}`}>
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <div className="font-semibold text-white">{m.name} {!m.read && <span className="ml-2 rounded-full bg-gold px-2 py-0.5 text-[10px] font-bold text-forest-deep">NEW</span>}</div>
                  <div className="text-xs text-neutral-500">{m.createdAt ? new Date(m.createdAt.seconds * 1000).toLocaleString() : ''}</div>
                </div>
                <div className="flex gap-1">
                  <a href={`tel:${m.phone}`} className="p-2 text-neutral-400 hover:text-gold" aria-label="Call"><Phone className="size-4" /></a>
                  <a href={`https://wa.me/${wa(m.phone)}`} target="_blank" rel="noopener noreferrer" className="p-2 text-neutral-400 hover:text-[#25D366]" aria-label="WhatsApp"><MessageCircle className="size-4" /></a>
                  <button onClick={(e) => { e.stopPropagation(); remove(m); }} className="p-2 text-neutral-400 hover:text-red-400" aria-label="Delete"><Trash2 className="size-4" /></button>
                </div>
              </div>
              <div className="mt-1 text-sm text-gold">{m.phone}</div>
              <p className="mt-2 whitespace-pre-wrap text-sm text-neutral-300">{m.message}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

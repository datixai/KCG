'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { collection, getCountFromServer, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { ADMIN } from './AdminShell';

export default function Dashboard() {
  const [counts, setCounts] = useState<Record<string, number | null>>({ projects: null, services: null, unread: null });

  useEffect(() => {
    const count = (q: Parameters<typeof getCountFromServer>[0]) => getCountFromServer(q).then((s) => s.data().count).catch(() => null);
    Promise.all([
      count(collection(db, 'projects')),
      count(collection(db, 'services')),
      count(query(collection(db, 'messages'), where('read', '==', false))),
    ]).then(([projects, services, unread]) => setCounts({ projects, services, unread }));
  }, []);

  const cards = [
    { label: 'Projects', value: counts.projects, href: `${ADMIN}/projects` },
    { label: 'Services', value: counts.services, href: `${ADMIN}/services` },
    { label: 'Unread Messages', value: counts.unread, href: `${ADMIN}/messages` },
  ];

  return (
    <div>
      <h1 className="mb-6 font-display text-2xl font-bold text-white">Dashboard</h1>
      <div className="grid gap-4 sm:grid-cols-3">
        {cards.map((c) => (
          <Link key={c.label} href={c.href} className="rounded-2xl border border-white/10 bg-gradient-to-br from-gold/10 to-transparent p-6 transition hover:border-gold/50">
            <div className="font-display text-4xl font-bold text-gold">{c.value ?? '...'}</div>
            <div className="mt-1 text-sm text-neutral-400">{c.label}</div>
          </Link>
        ))}
      </div>
      <p className="mt-8 text-sm text-neutral-500">Changes you make here appear on the live website within about a minute.</p>
    </div>
  );
}

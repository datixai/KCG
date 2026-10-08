'use client';
import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { collection, doc, getCountFromServer, query, serverTimestamp, where, writeBatch } from 'firebase/firestore';
import toast from 'react-hot-toast';
import { db } from '@/lib/firebase';
import { friendlyError } from '@/lib/errors';
import { defaultProjects, defaultServices } from '@/lib/defaults';
import { ADMIN } from './AdminShell';

export default function Dashboard() {
  const [counts, setCounts] = useState<Record<string, number | null>>({ projects: null, services: null, unread: null });

  const [seeding, setSeeding] = useState(false);

  const loadCounts = useCallback(() => {
    const count = (q: Parameters<typeof getCountFromServer>[0]) => getCountFromServer(q).then((s) => s.data().count).catch(() => null);
    Promise.all([
      count(collection(db, 'projects')),
      count(collection(db, 'services')),
      count(query(collection(db, 'messages'), where('read', '==', false))),
    ]).then(([projects, services, unread]) => setCounts({ projects, services, unread }));
  }, []);

  useEffect(loadCounts, [loadCounts]);

  /** Copies the built-in sample services/projects into Firestore so they can be edited. Skips non-empty collections. */
  const seedDemo = async () => {
    setSeeding(true);
    try {
      const batch = writeBatch(db);
      let added = 0;
      const seed = async (name: string, items: { id: string }[]) => {
        if ((await getCountFromServer(collection(db, name))).data().count > 0) return;
        items.forEach(({ id: _id, ...item }, i) => {
          batch.set(doc(collection(db, name)), { ...item, order: i + 1, createdAt: serverTimestamp() });
          added++;
        });
      };
      await seed('services', defaultServices.map((s) => ({ ...s, active: true })));
      await seed('projects', defaultProjects.map((p) => ({ ...p, description: '' })));
      if (!added) return toast('Projects and services already have content — nothing added.');
      await batch.commit();
      toast.success(`Added ${added} demo items`);
      loadCounts();
    } catch (err) {
      toast.error(friendlyError(err), { duration: 8000 });
    } finally {
      setSeeding(false);
    }
  };

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
          <Link key={c.label} href={c.href} className="rounded-2xl border border-white/10 bg-gradient-to-br from-brand-green/10 to-transparent p-6 transition hover:border-brand-green/50">
            <div className="font-display text-4xl font-bold text-brand-orange">{c.value ?? '–'}</div>
            <div className="mt-1 text-sm text-neutral-400">{c.label}</div>
          </Link>
        ))}
      </div>
      <p className="mt-8 text-sm text-neutral-500">
        Until you add projects or services here, the website shows built-in sample content. Changes appear on the live site within about a minute.
      </p>
      {(counts.projects === 0 || counts.services === 0) && (
        <button onClick={seedDemo} disabled={seeding} className="admin-btn mt-4">
          {seeding ? 'Loading…' : 'Load demo projects & services'}
        </button>
      )}
    </div>
  );
}

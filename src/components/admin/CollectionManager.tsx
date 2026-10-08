'use client';
import { useCallback, useEffect, useState } from 'react';
import { addDoc, collection, deleteDoc, doc, getDocs, serverTimestamp, updateDoc } from 'firebase/firestore';
import toast from 'react-hot-toast';
import { Pencil, Plus, Trash2, X } from 'lucide-react';
import { db } from '@/lib/firebase';
import ImageUpload from './ImageUpload';

export type Field =
  | { name: string; label: string; type: 'text' | 'textarea' | 'number' | 'image' | 'checkbox' }
  | { name: string; label: string; type: 'select'; options: string[] };

type Row = { id: string } & Record<string, unknown>;

/** Generic list + add/edit/delete screen for one Firestore collection. */
export default function CollectionManager({
  collectionName, title, fields, display, defaults, emptyHint,
}: {
  collectionName: string;
  title: string;
  fields: Field[];
  display: (row: Row) => { primary: string; secondary?: string; image?: string };
  defaults: Record<string, unknown>;
  emptyHint: string;
}) {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Record<string, unknown> | null>(null);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    const snap = await getDocs(collection(db, collectionName));
    const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }) as Row);
    setRows(list.sort((a, b) => Number(a.order ?? 0) - Number(b.order ?? 0)));
    setLoading(false);
  }, [collectionName]);

  useEffect(() => { load().catch((e) => { toast.error(e.message); setLoading(false); }); }, [load]);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    setSaving(true);
    const { id, ...data } = editing;
    try {
      if (id) await updateDoc(doc(db, collectionName, String(id)), { ...data, updatedAt: serverTimestamp() });
      else await addDoc(collection(db, collectionName), { ...data, createdAt: serverTimestamp() });
      toast.success('Saved — live on the website within a minute');
      setEditing(null);
      await load();
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setSaving(false);
    }
  };

  const remove = async (row: Row) => {
    if (!confirm(`Delete "${display(row).primary}"?`)) return;
    await deleteDoc(doc(db, collectionName, row.id));
    toast.success('Deleted');
    await load();
  };

  const set = (name: string, value: unknown) => setEditing((prev) => ({ ...prev, [name]: value }));

  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-4">
        <h1 className="font-display text-2xl font-bold text-white">{title}</h1>
        <button onClick={() => setEditing({ ...defaults, order: rows.length + 1 })} className="admin-btn">
          <Plus className="size-4" /> Add
        </button>
      </div>

      {loading ? (
        <p className="text-neutral-500">Loading…</p>
      ) : rows.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-white/10 p-8 text-center text-neutral-500">{emptyHint}</p>
      ) : (
        <ul className="space-y-3">
          {rows.map((row) => {
            const d = display(row);
            return (
              <li key={row.id} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-3 sm:p-4">
                {d.image !== undefined && (
                  <div className="size-14 shrink-0 overflow-hidden rounded-lg bg-ink">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    {d.image && <img src={d.image} alt="" className="size-full object-cover" />}
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <div className="truncate font-medium text-white">{d.primary}</div>
                  {d.secondary && <div className="truncate text-sm text-neutral-500">{d.secondary}</div>}
                </div>
                <button onClick={() => setEditing(row)} className="p-2 text-neutral-400 hover:text-brand-orange" aria-label="Edit"><Pencil className="size-4" /></button>
                <button onClick={() => remove(row)} className="p-2 text-neutral-400 hover:text-red-400" aria-label="Delete"><Trash2 className="size-4" /></button>
              </li>
            );
          })}
        </ul>
      )}

      {editing && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-0 backdrop-blur-sm sm:items-center sm:p-4">
          <form onSubmit={save} className="max-h-[92svh] w-full max-w-lg space-y-4 overflow-y-auto rounded-t-2xl border border-white/10 bg-ink-soft p-6 sm:rounded-2xl">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">{editing.id ? 'Edit' : 'Add'} {title.replace(/s$/, '')}</h2>
              <button type="button" onClick={() => setEditing(null)} className="p-1 text-neutral-400 hover:text-white"><X className="size-5" /></button>
            </div>
            {fields.map((f) => (
              <label key={f.name} className={f.type === 'checkbox' ? 'flex items-center gap-2' : 'block space-y-1.5'}>
                <span className="text-sm text-neutral-400">{f.label}</span>
                {f.type === 'textarea' ? (
                  <textarea rows={4} value={String(editing[f.name] ?? '')} onChange={(e) => set(f.name, e.target.value)} className="admin-input" />
                ) : f.type === 'image' ? (
                  <ImageUpload value={String(editing[f.name] ?? '')} onChange={(v) => set(f.name, v)} />
                ) : f.type === 'select' ? (
                  <select value={String(editing[f.name] ?? '')} onChange={(e) => set(f.name, e.target.value)} className="admin-input">
                    {f.options.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                ) : f.type === 'checkbox' ? (
                  <input type="checkbox" checked={editing[f.name] !== false} onChange={(e) => set(f.name, e.target.checked)} className="size-4 accent-brand-green" />
                ) : (
                  <input
                    type={f.type}
                    required={f.type === 'text'}
                    value={String(editing[f.name] ?? '')}
                    onChange={(e) => set(f.name, f.type === 'number' ? Number(e.target.value) : e.target.value)}
                    className="admin-input"
                  />
                )}
              </label>
            ))}
            <div className="flex justify-end gap-2 pt-2">
              <button type="button" onClick={() => setEditing(null)} className="rounded-full px-5 py-2.5 text-sm text-neutral-400 hover:text-white">Cancel</button>
              <button disabled={saving} className="admin-btn">{saving ? 'Saving…' : 'Save'}</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

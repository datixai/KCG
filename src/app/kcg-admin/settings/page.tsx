'use client';
import { useEffect, useState } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import toast from 'react-hot-toast';
import { db } from '@/lib/firebase';
import { friendlyError } from '@/lib/errors';
import { defaultSettings } from '@/lib/defaults';
import type { SiteSettings } from '@/types';

const fields: { name: keyof SiteSettings; label: string; optional?: boolean }[] = [
  { name: 'owner', label: 'Proprietor name (leave empty to hide)', optional: true },
  { name: 'phoneDisplay', label: 'Pakistan phone (as shown on site)' },
  { name: 'phone2Display', label: 'UK phone (leave empty to hide)', optional: true },
  { name: 'whatsapp', label: 'WhatsApp number (digits only, e.g. 923001234567)' },
  { name: 'email', label: 'Email' },
  { name: 'address', label: 'Address' },
  { name: 'facebook', label: 'Facebook page link (optional)', optional: true },
  { name: 'instagram', label: 'Instagram link (optional)', optional: true },
  { name: 'tiktok', label: 'TikTok link (optional)', optional: true },
  { name: 'youtube', label: 'YouTube link (optional)', optional: true },
  { name: 'linkedin', label: 'LinkedIn link (optional)', optional: true },
];

export default function SettingsAdmin() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getDoc(doc(db, 'settings', 'site'))
      .then((s) => setSettings({ ...defaultSettings, ...(s.data() as Partial<SiteSettings>) }))
      .catch((e) => { toast.error(e.message); setSettings(defaultSettings); });
  }, []);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;
    setSaving(true);
    try {
      await setDoc(doc(db, 'settings', 'site'), settings);
      toast.success('Saved — live on the website within a minute');
    } catch (err) {
      toast.error(friendlyError(err), { duration: 8000 });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-xl">
      <h1 className="mb-6 font-display text-2xl font-bold text-white">Contact Settings</h1>
      {!settings ? (
        <p className="text-neutral-500">Loading…</p>
      ) : (
        <form onSubmit={save} className="space-y-4 rounded-2xl border border-white/10 bg-white/[0.02] p-6">
          {fields.map((f) => (
            <label key={f.name} className="block space-y-1.5">
              <span className="text-sm text-neutral-400">{f.label}</span>
              <input required={!f.optional} value={settings[f.name] ?? ""} onChange={(e) => setSettings({ ...settings, [f.name]: e.target.value })} className="admin-input" />
            </label>
          ))}
          <button disabled={saving} className="admin-btn">{saving ? 'Saving…' : 'Save'}</button>
        </form>
      )}
    </div>
  );
}

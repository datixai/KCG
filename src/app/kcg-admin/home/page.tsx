'use client';
import { useEffect, useState } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import toast from 'react-hot-toast';
import { ChevronDown, Plus, Trash2 } from 'lucide-react';
import { db } from '@/lib/firebase';
import { friendlyError } from '@/lib/errors';
import { defaultHome, mergeHome, type HomeContent } from '@/lib/home';
import ImageUpload from '@/components/admin/ImageUpload';

type Kind = 'text' | 'textarea' | 'title' | 'image' | 'video' | 'number' | 'list' | 'images';
type Field = { path: string; label: string; kind?: Kind };

const TITLE_HINT = 'One heading line per line — the last line shows in gold.';
const VIDEO_HINT = 'Path of a video in the project (e.g. /videos/hero-site.mp4). Videos are too large to upload here — send new ones to your developer.';

// Repeated items (promises, stats, reasons) get one field set per item
const repeat = (base: string, count: number, make: (p: string, n: number) => Field[]) =>
  Array.from({ length: count }, (_, i) => make(`${base}.${i}`, i + 1)).flat();

const groups: { title: string; fields: Field[] }[] = [
  { title: 'Hero (top of page)', fields: [
    { path: 'hero.eyebrow', label: 'Small text above the title' },
    { path: 'hero.title', label: 'Title', kind: 'title' },
    { path: 'hero.text', label: 'Description', kind: 'textarea' },
    { path: 'hero.primaryCta', label: 'Gold button text' },
    { path: 'hero.secondaryCta', label: 'Outline button text' },
    { path: 'hero.video', label: 'Background video (desktop)', kind: 'video' },
    { path: 'hero.videoMobile', label: 'Background video (phones, smaller file)', kind: 'video' },
    { path: 'hero.poster', label: 'Image shown while the video loads', kind: 'image' },
  ] },
  { title: 'Promises strip', fields: repeat('promises', 4, (p, n) => [
    { path: `${p}.title`, label: `Promise ${n} — title` },
    { path: `${p}.text`, label: `Promise ${n} — text` },
  ]) },
  { title: 'About', fields: [
    { path: 'about.eyebrow', label: 'Small heading' },
    { path: 'about.title', label: 'Title', kind: 'title' },
    { path: 'about.text', label: 'Text (leave an empty line between paragraphs)', kind: 'textarea' },
    { path: 'about.badge', label: 'Rotating badge text' },
    { path: 'about.cardTitle', label: 'Green card — first line' },
    { path: 'about.cardHighlight', label: 'Green card — gold line' },
    { path: 'about.video', label: 'Main video', kind: 'video' },
    { path: 'about.poster', label: 'Image shown while the video loads (also the stats background)', kind: 'image' },
    { path: 'about.image', label: 'Small overlapping photo', kind: 'image' },
  ] },
  { title: 'Stats counters', fields: repeat('stats', 4, (p, n) => [
    { path: `${p}.value`, label: `Stat ${n} — number`, kind: 'number' },
    { path: `${p}.suffix`, label: `Stat ${n} — sign after number (+, %)` },
    { path: `${p}.label`, label: `Stat ${n} — label` },
  ]) },
  { title: 'Services heading', fields: [
    { path: 'services.title', label: 'Title', kind: 'title' },
    { path: 'services.text', label: 'Text', kind: 'textarea' },
  ] },
  { title: 'Projects heading', fields: [
    { path: 'projects.eyebrow', label: 'Small heading' },
    { path: 'projects.title', label: 'Title', kind: 'title' },
  ] },
  { title: 'Areas we serve', fields: [
    { path: 'areas.eyebrow', label: 'Small heading' },
    { path: 'areas.title', label: 'Title', kind: 'title' },
    { path: 'areas.text', label: 'Text', kind: 'textarea' },
    { path: 'areas.list', label: 'Towns (separate with commas)', kind: 'list' },
    { path: 'areas.headOffice', label: 'Head office town (highlighted)' },
    { path: 'areas.image', label: 'Photo', kind: 'image' },
  ] },
  { title: 'Why choose KCG', fields: [
    { path: 'why.eyebrow', label: 'Small heading' },
    { path: 'why.title', label: 'Title', kind: 'title' },
    { path: 'why.image', label: 'Background photo', kind: 'image' },
    ...repeat('why.reasons', 4, (p, n) => [
      { path: `${p}.title`, label: `Reason ${n} — title` },
      { path: `${p}.text`, label: `Reason ${n} — text` },
    ]),
  ] },
  { title: 'On-site gallery', fields: [
    { path: 'gallery.title', label: 'Title', kind: 'title' },
    { path: 'gallery.images', label: 'Photos (8 look best)', kind: 'images' },
  ] },
  { title: 'Call to action', fields: [
    { path: 'cta.eyebrow', label: 'Small heading' },
    { path: 'cta.title', label: 'Title', kind: 'title' },
    { path: 'cta.text', label: 'Text', kind: 'textarea' },
    { path: 'cta.button', label: 'Button text' },
    { path: 'cta.perks', label: 'Three perks (separate with commas)', kind: 'list' },
    { path: 'cta.video', label: 'Background video', kind: 'video' },
    { path: 'cta.poster', label: 'Image shown while the video loads', kind: 'image' },
  ] },
  { title: 'Contact & footer', fields: [
    { path: 'contact.title', label: 'Title', kind: 'title' },
    { path: 'contact.formTitle', label: 'Form title' },
    { path: 'contact.formText', label: 'Form text' },
    { path: 'footer.blurb', label: 'Footer text under the logo', kind: 'textarea' },
  ] },
];

/* eslint-disable @typescript-eslint/no-explicit-any */
const getAt = (obj: any, path: string) => path.split('.').reduce((o, k) => o?.[k], obj);
function setAt<T>(obj: T, path: string, value: unknown): T {
  const copy = structuredClone(obj) as any;
  const keys = path.split('.');
  let cur = copy;
  keys.slice(0, -1).forEach((k) => { cur = cur[k]; });
  cur[keys.at(-1)!] = value;
  return copy;
}
/* eslint-enable @typescript-eslint/no-explicit-any */

export default function HomeAdmin() {
  const [content, setContent] = useState<HomeContent | null>(null);
  const [open, setOpen] = useState(0);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getDoc(doc(db, 'settings', 'home'))
      .then((s) => setContent(mergeHome(s.data())))
      .catch((e) => { toast.error(friendlyError(e), { duration: 8000 }); setContent(defaultHome); });
  }, []);

  const save = async () => {
    if (!content) return;
    setSaving(true);
    try {
      await setDoc(doc(db, 'settings', 'home'), content);
      toast.success('Saved — live on the website within a minute');
    } catch (err) {
      toast.error(friendlyError(err), { duration: 8000 });
    } finally {
      setSaving(false);
    }
  };

  if (!content) return <p className="text-neutral-500">Loading…</p>;
  const set = (path: string, value: unknown) => setContent((c) => (c ? setAt(c, path, value) : c));

  const renderField = (f: Field) => {
    const value = getAt(content, f.path);
    const kind = f.kind ?? 'text';
    if (kind === 'image') return <ImageUpload value={String(value ?? '')} onChange={(v) => set(f.path, v)} />;
    if (kind === 'images') {
      const images = (value as string[]) ?? [];
      return (
        <div className="space-y-3">
          {images.map((src, i) => (
            <div key={i} className="flex items-start gap-2">
              <div className="flex-1"><ImageUpload value={src} onChange={(v) => set(f.path, images.map((x, j) => (j === i ? v : x)))} /></div>
              <button type="button" onClick={() => set(f.path, images.filter((_, j) => j !== i))} className="p-2 text-neutral-500 hover:text-red-400" aria-label="Remove photo"><Trash2 className="size-4" /></button>
            </div>
          ))}
          <button type="button" onClick={() => set(f.path, [...images, ''])} className="flex items-center gap-1 text-sm text-gold hover:underline"><Plus className="size-4" /> Add photo</button>
        </div>
      );
    }
    if (kind === 'textarea' || kind === 'title')
      return <textarea rows={kind === 'title' ? 4 : 4} value={String(value ?? '')} onChange={(e) => set(f.path, e.target.value)} className="admin-input" />;
    return (
      <input
        type={kind === 'number' ? 'number' : 'text'}
        value={String(value ?? '')}
        onChange={(e) => set(f.path, kind === 'number' ? Number(e.target.value) : e.target.value)}
        className="admin-input"
      />
    );
  };

  return (
    <div className="max-w-3xl pb-24">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">Home Page</h1>
          <p className="mt-1 text-sm text-neutral-500">Edit the text, photos and videos on the home page. Projects, services and contact details have their own pages.</p>
        </div>
      </div>

      <div className="space-y-3">
        {groups.map((g, gi) => (
          <section key={g.title} className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
            <button type="button" onClick={() => setOpen(open === gi ? -1 : gi)} className="flex w-full items-center justify-between px-5 py-4 text-left font-semibold text-white hover:bg-white/[0.03]">
              {g.title}
              <ChevronDown className={`size-5 text-gold transition ${open === gi ? 'rotate-180' : ''}`} />
            </button>
            {open === gi && (
              <div className="space-y-5 border-t border-white/10 p-5">
                {g.fields.map((f) => (
                  <label key={f.path} className="block space-y-1.5">
                    <span className="text-sm text-neutral-400">{f.label}</span>
                    {renderField(f)}
                    {f.kind === 'title' && <span className="block text-xs text-neutral-600">{TITLE_HINT}</span>}
                    {f.kind === 'video' && <span className="block text-xs text-neutral-600">{VIDEO_HINT}</span>}
                  </label>
                ))}
              </div>
            )}
          </section>
        ))}
      </div>

      {/* Sticky save bar */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-white/10 bg-forest-deep/95 p-4 backdrop-blur lg:left-60">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4">
          <span className="text-xs text-neutral-500">Changes appear on the website within about a minute of saving.</span>
          <button onClick={save} disabled={saving} className="admin-btn">{saving ? 'Saving…' : 'Save Home Page'}</button>
        </div>
      </div>
    </div>
  );
}

'use client';
import { useEffect, useState } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import toast from 'react-hot-toast';
import { ArrowDown, ArrowUp, Plus, Trash2 } from 'lucide-react';
import { db } from '@/lib/firebase';
import { refreshSite } from '@/lib/refresh-site';
import { friendlyError } from '@/lib/errors';
import { defaultSiteWork, mergeSiteWork, type SiteWork, type SiteWorkVideo } from '@/lib/sitework';
import ImageUpload from '@/components/admin/ImageUpload';

const VIDEO_HINT = 'Paste a YouTube link (easiest: upload the video to YouTube as Unlisted), or a link to an .mp4 file. Videos are too large to upload here directly.';
const empty: SiteWorkVideo = { title: '', location: '', video: '', image: '', description: '' };

export default function SiteWorkAdmin() {
  const [work, setWork] = useState<SiteWork | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getDoc(doc(db, 'settings', 'site-work'))
      .then((s) => setWork(mergeSiteWork(s.data())))
      .catch((e) => { toast.error(friendlyError(e), { duration: 8000 }); setWork(defaultSiteWork); });
  }, []);

  if (!work) return <p className="text-neutral-500">Loading…</p>;
  const videos = work.videos;
  const setVideos = (list: SiteWorkVideo[]) => setWork({ ...work, videos: list });
  const patch = (i: number, key: keyof SiteWorkVideo, v: string) => setVideos(videos.map((x, j) => (j === i ? { ...x, [key]: v } : x)));
  const move = (i: number, to: number) => { const list = [...videos]; [list[i], list[to]] = [list[to], list[i]]; setVideos(list); };

  const save = async () => {
    setSaving(true);
    try {
      await setDoc(doc(db, 'settings', 'site-work'), { ...work, videos: videos.filter((v) => v.video || v.image) });
      await refreshSite();
      toast.success('Saved. Live on the website now.');
    } catch (err) {
      toast.error(friendlyError(err), { duration: 8000 });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-3xl pb-24">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold text-white">Site Work</h1>
        <p className="mt-1 text-sm text-neutral-500">Videos on the Site Work page (opened from the menu). Add, remove or reorder them here.</p>
      </div>

      <section className="space-y-5 rounded-2xl border border-white/10 bg-white/[0.02] p-5">
        <label className="block space-y-1.5"><span className="text-sm text-neutral-400">Small heading</span>
          <input value={work.eyebrow} onChange={(e) => setWork({ ...work, eyebrow: e.target.value })} className="admin-input" /></label>
        <label className="block space-y-1.5"><span className="text-sm text-neutral-400">Page title</span>
          <input value={work.title} onChange={(e) => setWork({ ...work, title: e.target.value })} className="admin-input" /></label>
        <label className="block space-y-1.5"><span className="text-sm text-neutral-400">Text under the title</span>
          <textarea rows={3} value={work.text} onChange={(e) => setWork({ ...work, text: e.target.value })} className="admin-input" /></label>
      </section>

      <h2 className="mb-3 mt-8 text-lg font-semibold text-white">Videos</h2>
      <div className="space-y-4">
        {videos.map((v, i) => (
          <div key={i} className="space-y-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm font-semibold text-white">{v.title || `Video ${i + 1}`}</span>
              <div className="flex items-center gap-1">
                <button type="button" disabled={i === 0} onClick={() => move(i, i - 1)} className="p-2 text-neutral-500 hover:text-gold disabled:opacity-30" aria-label="Move up"><ArrowUp className="size-4" /></button>
                <button type="button" disabled={i === videos.length - 1} onClick={() => move(i, i + 1)} className="p-2 text-neutral-500 hover:text-gold disabled:opacity-30" aria-label="Move down"><ArrowDown className="size-4" /></button>
                <button type="button" onClick={() => { if (confirm(`Remove ${v.title || 'this video'}?`)) setVideos(videos.filter((_, j) => j !== i)); }} className="p-2 text-neutral-500 hover:text-red-400" aria-label="Remove video"><Trash2 className="size-4" /></button>
              </div>
            </div>
            <input placeholder="Title (e.g. Concrete pour at Dadyal plant)" value={v.title} onChange={(e) => patch(i, 'title', e.target.value)} className="admin-input" />
            <input placeholder="Location (e.g. Dadyal, AJK)" value={v.location} onChange={(e) => patch(i, 'location', e.target.value)} className="admin-input" />
            <div>
              <input placeholder="Video link" value={v.video} onChange={(e) => patch(i, 'video', e.target.value.trim())} className="admin-input" />
              <span className="mt-1 block text-xs text-neutral-600">{VIDEO_HINT}</span>
            </div>
            <div>
              <span className="mb-1.5 block text-xs text-neutral-500">Cover photo (shown while the video loads)</span>
              <ImageUpload value={v.image} onChange={(x) => patch(i, 'image', x)} />
            </div>
            <textarea rows={2} placeholder="Short description (optional)" value={v.description} onChange={(e) => patch(i, 'description', e.target.value)} className="admin-input" />
          </div>
        ))}
        <button type="button" onClick={() => setVideos([...videos, { ...empty }])} className="flex items-center gap-1 text-sm text-gold hover:underline"><Plus className="size-4" /> Add video</button>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-white/10 bg-forest-deep/95 p-4 backdrop-blur lg:left-60">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4">
          <span className="text-xs text-neutral-500">Changes appear on the website as soon as you save.</span>
          <button onClick={save} disabled={saving} className="admin-btn">{saving ? 'Saving…' : 'Save Site Work'}</button>
        </div>
      </div>
    </div>
  );
}

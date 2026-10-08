'use client';
import { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { uploadImage } from '@/lib/images';

/** Photo field for admin forms: upload a file (stored in Firestore) or paste a link. */
export default function ImageUpload({ value, onChange }: { value: string; onChange: (url: string) => void }) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const handleFile = async (file?: File) => {
    if (!file) return;
    setUploading(true);
    try {
      onChange(await uploadImage(file));
      toast.success('Photo uploaded. Click Save to keep it.');
    } catch (err) {
      const e = err as { code?: string; message?: string };
      toast.error(e.code === 'permission-denied' ? 'Upload blocked: publish firestore.rules with your admin UID.' : e.message || 'Upload failed');
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  };

  return (
    <div className="flex items-start gap-4">
      <div className="grid size-20 shrink-0 place-items-center overflow-hidden rounded-xl border border-white/10 bg-forest-deep">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {value ? <img src={value} alt="" className="size-full object-cover" /> : <span className="text-[10px] text-neutral-600">No photo</span>}
      </div>
      <div className="min-w-0 flex-1 space-y-2">
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={() => fileRef.current?.click()} disabled={uploading} className="rounded-lg border border-gold/40 bg-gold/10 px-3 py-1.5 text-xs text-gold hover:bg-gold/20 disabled:opacity-50">
            {uploading ? 'Uploading…' : value ? 'Change photo' : 'Upload photo'}
          </button>
          {value && (
            <button type="button" onClick={() => onChange('')} className="rounded-lg border border-white/10 px-3 py-1.5 text-xs text-neutral-400 hover:text-red-400">Remove</button>
          )}
        </div>
        <input value={value} onChange={(e) => onChange(e.target.value)} placeholder="or paste an image link (/img/... or https://...)" className="admin-input text-xs" />
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleFile(e.target.files?.[0])} />
      </div>
    </div>
  );
}

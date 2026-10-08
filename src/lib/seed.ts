import { collection, doc, getDoc, getDocs, serverTimestamp, writeBatch } from 'firebase/firestore';
import { db } from './firebase';
import { defaultProjects, defaultServices } from './defaults';

// Bump when the built-in content changes; unedited earlier imports get replaced
const SEED_VERSION = 3;

/**
 * The public site shows built-in projects/services while Firestore is empty.
 * When the admin panel opens, copy them into Firestore so the admin can edit
 * exactly what visitors see. A marker (settings/content-seeded) records the
 * version, so this runs once per version. A collection is only replaced if
 * it is empty or still holds the untouched previous import (no `updatedAt`),
 * so admin edits are never overwritten. Returns the number of items added.
 */
export async function seedDefaultContentOnce(): Promise<number> {
  const marker = doc(db, 'settings', 'content-seeded');
  const markerSnap = await getDoc(marker);
  const version = markerSnap.exists() ? Number(markerSnap.data().version ?? 1) : 0;
  if (version >= SEED_VERSION) return 0;

  const batch = writeBatch(db);
  let added = 0;
  const seed = async (name: string, items: { id: string }[]) => {
    const existing = await getDocs(collection(db, name));
    const untouched = existing.docs.every((d) => !d.data().updatedAt);
    if (existing.size > 0 && (version === 0 || !untouched)) return;
    existing.docs.forEach((d) => batch.delete(d.ref));
    items.forEach(({ id: _id, ...item }, i) => {
      batch.set(doc(collection(db, name)), { ...item, order: i + 1, createdAt: serverTimestamp() });
      added++;
    });
  };
  await seed('services', defaultServices.map((s) => ({ ...s, active: true })));
  await seed('projects', defaultProjects.map((p) => ({ ...p, description: '' })));
  batch.set(marker, { version: SEED_VERSION, at: serverTimestamp() });
  await batch.commit();
  return added;
}

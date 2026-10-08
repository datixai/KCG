import { collection, doc, getCountFromServer, getDoc, serverTimestamp, writeBatch } from 'firebase/firestore';
import { db } from './firebase';
import { defaultProjects, defaultServices } from './defaults';

/**
 * The public site shows built-in projects/services while Firestore is empty.
 * The first time the admin panel opens, copy them into Firestore so the admin
 * can edit exactly what visitors see. A marker (settings/content-seeded) makes
 * this run only once, so deleting everything later doesn't bring them back.
 * Returns the number of items added.
 */
export async function seedDefaultContentOnce(): Promise<number> {
  const marker = doc(db, 'settings', 'content-seeded');
  if ((await getDoc(marker)).exists()) return 0;

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
  batch.set(marker, { at: serverTimestamp() });
  await batch.commit();
  return added;
}

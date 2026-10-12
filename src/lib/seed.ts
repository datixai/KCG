import { collection, doc, getDoc, getDocs, serverTimestamp, writeBatch, type WriteBatch } from 'firebase/firestore';
import { db } from './firebase';
import { refreshSite } from './refresh-site';
import { defaultProjects, defaultServices } from './defaults';

/**
 * Content in Firestore is what the website shows, so the admin panel is always the one
 * source of truth. When the developer adds or changes content, it goes in as a numbered
 * update below. Updates run once, the next time anyone opens the admin panel, and only
 * touch the exact items they name, so the client's own edits are never overwritten.
 * A marker (settings/content-seeded) records the last update applied.
 */
const LATEST = 6;

type Update = (batch: WriteBatch, previousVersion: number) => Promise<number>;

// 1–3: copy the built-in projects/services into Firestore (only while still unedited)
const initialImport: Update = async (batch, version) => {
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
  // Video projects are added by update 4, so a fresh database doesn't get them twice
  await seed('projects', defaultProjects.filter((p) => !p.video).map((p) => ({ ...p, description: p.description ?? '' })));
  return added;
};

// 4: the marquee and bungalow projects (with videos), and Akeeb's new team photo
const addVideoProjects: Update = async (batch) => {
  let changed = 0;
  const existing = await getDocs(collection(db, 'projects'));
  const titles = new Set(existing.docs.map((d) => String(d.data().title ?? '').toLowerCase()));
  for (const [i, { id: _id, ...p }] of defaultProjects.filter((x) => x.video).entries()) {
    if (titles.has(p.title.toLowerCase())) continue;
    batch.set(doc(collection(db, 'projects')), { ...p, gallery: [], showOnHome: true, order: i - 2, createdAt: serverTimestamp() });
    changed++;
  }

  const homeRef = doc(db, 'settings', 'home');
  const home = await getDoc(homeRef);
  const members = home.data()?.team?.members as { name?: string; image?: string }[] | undefined;
  // Only replace the photo if it is still the older one uploaded before the new photo arrived
  const OLD_AKEEB = ['/img/IiF3LZgFzZLTXQ95GKpl', '/images/team/akeeb-yakoob.webp', '/images/team/akeeb.webp'];
  if (members?.some((m) => /akeeb/i.test(m.name ?? '') && OLD_AKEEB.includes(m.image ?? ''))) {
    const updated = members.map((m) => (/akeeb/i.test(m.name ?? '') && OLD_AKEEB.includes(m.image ?? '') ? { ...m, image: '/images/team/akeeb-yakoob-founder.webp' } : m));
    batch.set(homeRef, { team: { ...home.data()!.team, members: updated } }, { merge: true });
    changed++;
  }
  return changed;
};

// 5: the bungalow's landscape, slowed-down drone video (only if it still has the original vertical one)
const landscapeBungalow: Update = async (batch) => {
  const OLD = '/videos/projects/hillside-bungalow-mirpur.mp4';
  const snap = await getDocs(collection(db, 'projects'));
  let changed = 0;
  snap.docs.filter((d) => d.data().video === OLD).forEach((d) => {
    const keepPhoto = d.data().image && d.data().image !== '/images/projects/hillside-bungalow-mirpur.webp';
    batch.update(d.ref, {
      video: '/videos/projects/hillside-bungalow-mirpur-landscape.mp4',
      ...(keepPhoto ? {} : { image: '/images/projects/hillside-bungalow-mirpur-landscape.webp' }),
    });
    changed++;
  });
  return changed;
};

// 6: the bungalow's 3D evening visualisation (only where the video/photo/text are still the developer's)
const bungalow3d: Update = async (batch) => {
  const OUR_VIDEOS = ['/videos/projects/hillside-bungalow-mirpur.mp4', '/videos/projects/hillside-bungalow-mirpur-landscape.mp4'];
  const OUR_PHOTOS = ['/images/projects/hillside-bungalow-mirpur.webp', '/images/projects/hillside-bungalow-mirpur-landscape.webp', ''];
  const OLD_TEXT = 'A two-storey family bungalow on a hillside plot in Mirpur District, with a wide terrace, strong boundary walls and a landscaped driveway that makes the most of the views. Drone footage of the home.';
  const snap = await getDocs(collection(db, 'projects'));
  let changed = 0;
  snap.docs.filter((d) => OUR_VIDEOS.includes(d.data().video)).forEach((d) => {
    const data = d.data();
    batch.update(d.ref, {
      video: '/videos/projects/hillside-bungalow-3d.mp4',
      ...(OUR_PHOTOS.includes(data.image ?? '') ? { image: '/images/projects/hillside-bungalow-3d.webp' } : {}),
      ...(data.description === OLD_TEXT ? { description: 'A two-storey family bungalow on a hillside plot in Mirpur District, with a wide terrace, strong boundary walls and a landscaped driveway that makes the most of the views. The video is a 3D visualisation of the home.' } : {}),
    });
    changed++;
  });
  return changed;
};

const updates: [version: number, run: Update][] = [
  [3, initialImport],
  [4, addVideoProjects],
  [5, landscapeBungalow],
  [6, bungalow3d],
];

/** Applies any updates not yet run. Returns the number of items added or changed. */
export async function seedDefaultContentOnce(): Promise<number> {
  const marker = doc(db, 'settings', 'content-seeded');
  const markerSnap = await getDoc(marker);
  const version = markerSnap.exists() ? Number(markerSnap.data().version ?? 1) : 0;
  if (version >= LATEST) return 0;

  const batch = writeBatch(db);
  let changed = 0;
  for (const [v, run] of updates) if (version < v) changed += await run(batch, version);
  batch.set(marker, { version: LATEST, at: serverTimestamp() });
  await batch.commit();
  if (changed) await refreshSite();
  return changed;
}

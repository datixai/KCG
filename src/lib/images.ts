/**
 * Photos uploaded from the admin panel are stored in Firestore (collection
 * `images`), not Firebase Storage, so no paid plan is needed. Each image is
 * resized and compressed in the browser, saved as a data URL and served at
 * /img/<id> (see src/app/img/[id]/route.ts).
 */
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';

// Firestore documents are limited to 1 MB
const MAX_DATA_URL_LENGTH = 900_000;

function loadImage(blob: Blob): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(blob);
    const img = new Image();
    img.onload = () => { URL.revokeObjectURL(url); resolve(img); };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('This file is not an image the browser can read.')); };
    img.src = url;
  });
}

/** Resize so the longest side is at most maxSide px and encode as WebP (JPEG fallback). */
async function compressImage(blob: Blob, maxSide: number): Promise<string> {
  const img = await loadImage(blob);
  let side = maxSide;
  for (let attempt = 0; attempt < 6; attempt++) {
    const scale = Math.min(1, side / Math.max(img.naturalWidth, img.naturalHeight));
    const canvas = document.createElement('canvas');
    canvas.width = Math.round(img.naturalWidth * scale);
    canvas.height = Math.round(img.naturalHeight * scale);
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Could not process the image.');
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    let dataUrl = canvas.toDataURL('image/webp', attempt < 3 ? 0.82 : 0.7);
    if (!dataUrl.startsWith('data:image/webp')) dataUrl = canvas.toDataURL('image/jpeg', 0.8);
    if (dataUrl.length <= MAX_DATA_URL_LENGTH) return dataUrl;
    side = Math.round(side * 0.75);
  }
  throw new Error('The image is too large even after compressing. Please use a smaller image.');
}

/** Compress and store an image in Firestore. Returns the site path to use as the image URL. */
export async function uploadImage(blob: Blob, maxSide = 1600): Promise<string> {
  const data = await compressImage(blob, maxSide);
  const ref = await addDoc(collection(db, 'images'), { data, createdAt: serverTimestamp() });
  return `/img/${ref.id}`;
}

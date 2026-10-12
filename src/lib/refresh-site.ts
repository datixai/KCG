import { auth } from './firebase';

/** Ask the website to show the latest admin changes right away. Never throws. */
export async function refreshSite() {
  try {
    const token = await auth.currentUser?.getIdToken();
    if (token) await fetch('/api/revalidate', { method: 'POST', headers: { authorization: `Bearer ${token}` } });
  } catch {
    // The site still updates on its own within about a minute
  }
}

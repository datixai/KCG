/**
 * Server-side Firestore reads over the REST API (plain HTTPS fetch, works in
 * serverless). Responses are cached and refreshed every REVALIDATE_SECONDS, so
 * pages are served static-fast and admin edits appear within a minute.
 * Use only in server components / route handlers; the admin panel uses the SDK.
 */
import type { Project, Service, SiteSettings } from '@/types';
import { defaultProjects, defaultServices, defaultSettings } from './defaults';

const PROJECT_ID = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
const API_KEY = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
const BASE = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents`;

export const REVALIDATE_SECONDS = 60;

/* eslint-disable @typescript-eslint/no-explicit-any */
function decodeValue(v: any): any {
  if (v == null) return null;
  if ('stringValue' in v) return v.stringValue;
  if ('booleanValue' in v) return v.booleanValue;
  if ('integerValue' in v) return Number(v.integerValue);
  if ('doubleValue' in v) return v.doubleValue;
  if ('timestampValue' in v) return { seconds: Math.floor(new Date(v.timestampValue).getTime() / 1000) };
  if ('arrayValue' in v) return (v.arrayValue.values || []).map(decodeValue);
  if ('mapValue' in v) return decodeFields(v.mapValue.fields || {});
  return null;
}

function decodeFields(fields: Record<string, any>) {
  const out: Record<string, any> = {};
  for (const [k, v] of Object.entries(fields)) out[k] = decodeValue(v);
  return out;
}

function decodeDoc<T>(doc: any): T {
  return { id: String(doc.name).split('/').pop(), ...decodeFields(doc.fields || {}) } as T;
}
/* eslint-enable @typescript-eslint/no-explicit-any */

async function listDocs<T>(collection: string): Promise<T[]> {
  const res = await fetch(`${BASE}/${collection}?pageSize=300&key=${API_KEY}`, { next: { revalidate: REVALIDATE_SECONDS } });
  if (!res.ok) throw new Error(`Firestore REST ${res.status} for ${collection}`);
  const json = await res.json();
  return (json.documents || []).map(decodeDoc<T>);
}

async function getDocument<T>(collection: string, id: string): Promise<T | null> {
  const res = await fetch(`${BASE}/${collection}/${id}?key=${API_KEY}`, { next: { revalidate: REVALIDATE_SECONDS } });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Firestore REST ${res.status} for ${collection}/${id}`);
  return decodeDoc<T>(await res.json());
}

const byOrder = (a: { order?: number }, b: { order?: number }) => (a.order ?? 0) - (b.order ?? 0);

/** Runs a Firestore read, falling back to built-in content if Firebase isn't set up, empty or unreachable. */
async function withFallback<T>(load: () => Promise<T | null>, fallback: T, isEmpty: (v: T) => boolean): Promise<T> {
  if (!PROJECT_ID || !API_KEY) return fallback;
  try {
    const value = await load();
    return value && !isEmpty(value) ? value : fallback;
  } catch (err) {
    console.error('[KCG] Firestore read failed, using defaults:', err);
    return fallback;
  }
}

export const getProjectsServer = () =>
  withFallback(async () => (await listDocs<Project>('projects')).sort(byOrder), defaultProjects, (v) => !v.length);

export const getServicesServer = () =>
  withFallback(
    async () => (await listDocs<Service>('services')).filter((s) => s.active !== false).sort(byOrder),
    defaultServices,
    (v) => !v.length,
  );

export const getSettingsServer = () =>
  withFallback(
    async () => ({ ...defaultSettings, ...(await getDocument<Partial<SiteSettings>>('settings', 'site')) }),
    defaultSettings,
    () => false,
  );

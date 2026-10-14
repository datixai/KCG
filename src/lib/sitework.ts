/**
 * The "Site Work" page: videos from KCG's sites, edited in Admin > Site Work.
 * Stored in Firestore at settings/site-work (the settings area the admin can already write to).
 */
export interface SiteWorkVideo {
  title: string;
  location: string;
  /** An .mp4 in the project (/videos/...), an https link to an .mp4, or a YouTube link. */
  video: string;
  /** Cover photo, shown while the video loads. */
  image: string;
  description: string;
}

export interface SiteWork {
  eyebrow: string;
  title: string;
  text: string;
  videos: SiteWorkVideo[];
}

export const defaultSiteWork: SiteWork = {
  eyebrow: 'Behind the Scenes',
  title: 'Site Work',
  text: 'Real footage from our sites: our batching plant, crews and machinery at work as we build across Azad Kashmir.',
  videos: [
    {
      title: 'Batching Plant Installation',
      location: 'Dadyal, AJK',
      video: '/videos/site-work/batching-plant-site.mp4',
      image: '/images/site-work/batching-plant-site.webp',
      description: 'Our crane and crew putting up the concrete batching plant on the Dadyal site.',
    },
    {
      title: 'Lifting the Bins into Place',
      location: 'Dadyal, AJK',
      video: '/videos/site-work/crane-lift.mp4',
      image: '/images/site-work/crane-lift.webp',
      description: 'A crane lift of the plant bins onto the steel frame, guided by our team on the ground.',
    },
    {
      title: 'Conveyor Belt Installation',
      location: 'Dadyal, AJK',
      video: '/videos/site-work/conveyor-installation.mp4',
      image: '/images/site-work/conveyor-installation.webp',
      description: 'The aggregate conveyor fitted and ready to feed the plant.',
    },
  ],
};

const str = (v: unknown) => (typeof v === 'string' ? v : '');

/** Saved values over defaults. The video list is used exactly as saved, so an empty list shows no videos. */
export function mergeSiteWork(saved: unknown): SiteWork {
  const s = (saved && typeof saved === 'object' ? saved : {}) as Record<string, unknown>;
  const list = Array.isArray(s.videos) ? s.videos : defaultSiteWork.videos;
  return {
    eyebrow: str(s.eyebrow) || defaultSiteWork.eyebrow,
    title: str(s.title) || defaultSiteWork.title,
    text: str(s.text) || defaultSiteWork.text,
    videos: list
      .filter((v): v is Record<string, unknown> => !!v && typeof v === 'object')
      .map((v) => ({ title: str(v.title), location: str(v.location), video: str(v.video), image: str(v.image), description: str(v.description) }))
      .filter((v) => v.video || v.image),
  };
}

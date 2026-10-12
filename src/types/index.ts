export interface Project {
  id: string;
  title: string;
  location: string;
  category: string;
  image?: string;
  description?: string;
  order?: number;
  /** An .mp4 in the project (/videos/...), an https link to an .mp4, or a YouTube link. */
  video?: string;
  /** Extra photos shown on the Projects page. */
  gallery?: string[];
  /** Shown in the moving row on the home page unless set to false. */
  showOnHome?: boolean;
}

export interface Service {
  id: string;
  title: string;
  text: string;
  icon: string;
  image?: string;
  order?: number;
  active?: boolean;
}

export interface Message {
  id: string;
  name: string;
  phone: string;
  message: string;
  read: boolean;
  createdAt?: { seconds: number };
}

export interface SiteSettings {
  owner: string;
  phoneDisplay: string;
  phone2Display: string;
  whatsapp: string;
  email: string;
  address: string;
  facebook: string;
  instagram: string;
  tiktok: string;
  youtube: string;
  linkedin: string;
}

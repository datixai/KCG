export interface Project {
  id: string;
  title: string;
  location: string;
  category: string;
  image?: string;
  description?: string;
  order?: number;
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
  phoneDisplay: string;
  whatsapp: string;
  email: string;
  address: string;
}

export type BrandTone = "green" | "yellow" | "red" | "ink" | "sand" | "sage";

export interface NavLink {
  label: string;
  href: string;
  active?: boolean;
}

export interface FooterColumnItem {
  label: string;
  href: string;
}

export interface FooterColumn {
  title: string;
  items: FooterColumnItem[];
}

export type AlbumCategory = "benin" | "bretagne";

export interface AlbumPhoto {
  file: string;
  title: string;
  description: string;
  category: AlbumCategory;
  /** Intrinsic pixel dimensions, required by next/image for non-fill usage. */
  width: number;
  height: number;
}

export interface BureauMember {
  name: string;
  role: string;
  tone: Extract<BrandTone, "green" | "yellow" | "red">;
}

/* ---- Contenu géré depuis l'admin (base de données) ---------------------- */

/** Photo de la photothèque, servie par /uploads/<filename>. */
export interface PhotoRef {
  filename: string;
  alt: string;
  width: number;
  height: number;
}

export type ProjectStatus = "a_venir" | "en_cours" | "realise";

export interface ProjectItem {
  id: number;
  label: string;
  photo: PhotoRef | null;
}

export interface Project {
  id: number;
  slug: string;
  title: string;
  location: string;
  status: ProjectStatus;
  summary: string;
  cover: PhotoRef | null;
  articleUrl: string | null;
  articleSource: string | null;
  items: ProjectItem[];
}

export type ActionZone = "benin" | "bretagne";

export interface ActionEntry {
  id: number;
  zone: ActionZone;
  title: string;
  description: string;
  photo: PhotoRef | null;
  articleUrl: string | null;
  articleSource: string | null;
}

export interface Sponsorship {
  initials: string[];
  photos: Array<PhotoRef & { caption: string }>;
}

export interface Photo {
  id: number;
  filename: string;
  alt: string;
  width: number;
  height: number;
  created_at: Date;
}

export type ProjectStatus = "a_venir" | "en_cours" | "realise";

export const PROJECT_STATUS_LABELS: Record<ProjectStatus, string> = {
  en_cours: "En cours",
  realise: "Réalisé",
  a_venir: "À venir",
};

export interface Project {
  id: number;
  slug: string;
  title: string;
  location: string;
  status: ProjectStatus;
  summary: string;
  cover_photo_id: number | null;
  cover_filename: string | null;
  article_url: string | null;
  article_source: string | null;
  position: number;
}

export interface ProjectItem {
  id: number;
  project_id: number;
  label: string;
  photo_id: number | null;
  photo_filename: string | null;
  position: number;
}

export type ActionZone = "benin" | "bretagne";

export const ACTION_ZONE_LABELS: Record<ActionZone, string> = {
  benin: "Au Bénin",
  bretagne: "En Bretagne",
};

export interface ActionRow {
  id: number;
  zone: ActionZone;
  title: string;
  description: string;
  photo_id: number | null;
  photo_filename: string | null;
  article_url: string | null;
  article_source: string | null;
  position: number;
}

export interface SponsorInitial {
  id: number;
  label: string;
  position: number;
}

export interface SponsorshipPhoto {
  id: number;
  photo_id: number;
  filename: string;
  alt: string;
  caption: string;
  position: number;
}

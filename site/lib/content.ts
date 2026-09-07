import { safeQuery } from "./db";
import type {
  ActionEntry,
  ActionZone,
  PhotoRef,
  Project,
  ProjectItem,
  ProjectStatus,
  Sponsorship,
} from "@/types";

/* Lignes SQL brutes → objets du site. Les photos sont jointes à plat
   (filename/alt/width/height préfixés) puis repliées en PhotoRef | null. */

type PhotoCols<P extends string> = {
  [K in `${P}_filename` | `${P}_alt`]: string | null;
} & { [K in `${P}_width` | `${P}_height`]: number | null };

function photoFrom<P extends string>(row: PhotoCols<P>, prefix: P): PhotoRef | null {
  // Les clés sont des template literals : on lit via un index générique et on
  // vérifie les types à l'exécution plutôt que de tordre le typage statique.
  const r = row as unknown as Record<string, string | number | null | undefined>;
  const filename = r[`${prefix}_filename`];
  if (typeof filename !== "string" || filename === "") return null;
  const alt = r[`${prefix}_alt`];
  const width = r[`${prefix}_width`];
  const height = r[`${prefix}_height`];
  return {
    filename,
    alt: typeof alt === "string" ? alt : "",
    width: typeof width === "number" && width > 0 ? width : 4,
    height: typeof height === "number" && height > 0 ? height : 3,
  };
}

const PHOTO_JOIN = (alias: string, col: string, prefix: string) =>
  `LEFT JOIN photos ${prefix} ON ${prefix}.id = ${alias}.${col}`;
const PHOTO_COLS = (prefix: string) =>
  `${prefix}.filename AS ${prefix}_filename, ${prefix}.alt AS ${prefix}_alt,
   ${prefix}.width AS ${prefix}_width, ${prefix}.height AS ${prefix}_height`;

// ---------------------------------------------------------------------------
// Projets
// ---------------------------------------------------------------------------

type ProjectRow = {
  id: number;
  slug: string;
  title: string;
  location: string;
  status: ProjectStatus;
  summary: string;
  article_url: string | null;
  article_source: string | null;
} & PhotoCols<"cover">;

type ItemRow = { id: number; project_id: number; label: string } & PhotoCols<"ph">;

export async function getProjects(): Promise<Project[]> {
  const [rows, itemRows] = await Promise.all([
    safeQuery<ProjectRow>(
      `SELECT pr.id, pr.slug, pr.title, pr.location, pr.status, pr.summary,
              pr.article_url, pr.article_source, ${PHOTO_COLS("cover")}
       FROM projects pr ${PHOTO_JOIN("pr", "cover_photo_id", "cover")}
       ORDER BY pr.position, pr.id`,
    ),
    safeQuery<ItemRow>(
      `SELECT it.id, it.project_id, it.label, ${PHOTO_COLS("ph")}
       FROM project_items it ${PHOTO_JOIN("it", "photo_id", "ph")}
       ORDER BY it.position, it.id`,
    ),
  ]);

  const itemsByProject = new Map<number, ProjectItem[]>();
  for (const r of itemRows) {
    const list = itemsByProject.get(r.project_id) ?? [];
    list.push({ id: r.id, label: r.label, photo: photoFrom(r, "ph") });
    itemsByProject.set(r.project_id, list);
  }

  return rows.map((r) => ({
    id: r.id,
    slug: r.slug,
    title: r.title,
    location: r.location,
    status: r.status,
    summary: r.summary,
    cover: photoFrom(r, "cover"),
    articleUrl: r.article_url,
    articleSource: r.article_source,
    items: itemsByProject.get(r.id) ?? [],
  }));
}

/** Le projet mis en avant sur l'accueil : le premier « en cours » de la liste. */
export function pickFeatured(projects: Project[]): Project | null {
  return projects.find((p) => p.status === "en_cours") ?? null;
}

// ---------------------------------------------------------------------------
// Actions
// ---------------------------------------------------------------------------

type ActionRowDb = {
  id: number;
  zone: ActionZone;
  title: string;
  description: string;
  article_url: string | null;
  article_source: string | null;
} & PhotoCols<"ph">;

export async function getActions(): Promise<ActionEntry[]> {
  const rows = await safeQuery<ActionRowDb>(
    `SELECT a.id, a.zone, a.title, a.description, a.article_url, a.article_source, ${PHOTO_COLS("ph")}
     FROM actions a ${PHOTO_JOIN("a", "photo_id", "ph")}
     ORDER BY a.zone, a.position, a.id`,
  );
  return rows.map((r) => ({
    id: r.id,
    zone: r.zone,
    title: r.title,
    description: r.description,
    photo: photoFrom(r, "ph"),
    articleUrl: r.article_url,
    articleSource: r.article_source,
  }));
}

// ---------------------------------------------------------------------------
// Parrainages
// ---------------------------------------------------------------------------

type GalleryRow = { caption: string } & PhotoCols<"ph">;

export async function getSponsorship(): Promise<Sponsorship> {
  const [initials, gallery] = await Promise.all([
    safeQuery<{ label: string }>("SELECT label FROM sponsor_initials ORDER BY position, id"),
    safeQuery<GalleryRow>(
      `SELECT sp.caption, ${PHOTO_COLS("ph")}
       FROM sponsorship_photos sp JOIN photos ph ON ph.id = sp.photo_id
       ORDER BY sp.position, sp.id`,
    ),
  ]);
  return {
    initials: initials.map((r) => r.label),
    photos: gallery.flatMap((r) => {
      const photo = photoFrom(r, "ph");
      return photo ? [{ ...photo, caption: r.caption }] : [];
    }),
  };
}

// ---------------------------------------------------------------------------
// Compteurs pour les points d'entrée de l'accueil
// ---------------------------------------------------------------------------

export interface ContentCounts {
  projects: Record<ProjectStatus, number>;
  actions: Record<ActionZone, number>;
  sponsors: number;
}

export async function getCounts(): Promise<ContentCounts> {
  const [projects, actions, sponsors] = await Promise.all([
    safeQuery<{ status: ProjectStatus; n: number }>(
      "SELECT status, COUNT(*)::int AS n FROM projects GROUP BY status",
    ),
    safeQuery<{ zone: ActionZone; n: number }>(
      "SELECT zone, COUNT(*)::int AS n FROM actions GROUP BY zone",
    ),
    safeQuery<{ n: number }>("SELECT COUNT(*)::int AS n FROM sponsor_initials"),
  ]);
  const counts: ContentCounts = {
    projects: { a_venir: 0, en_cours: 0, realise: 0 },
    actions: { benin: 0, bretagne: 0 },
    sponsors: sponsors[0]?.n ?? 0,
  };
  for (const r of projects) counts.projects[r.status] = r.n;
  for (const r of actions) counts.actions[r.zone] = r.n;
  return counts;
}

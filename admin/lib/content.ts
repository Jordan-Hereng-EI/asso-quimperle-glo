import { getPool, query, queryOne } from "./db";
import type {
  ActionRow,
  ActionZone,
  Photo,
  Project,
  ProjectItem,
  ProjectStatus,
  SponsorInitial,
  SponsorshipPhoto,
} from "./types";

// ---------------------------------------------------------------------------
// Utilitaires
// ---------------------------------------------------------------------------

/**
 * Échange la position d'une ligne avec sa voisine (au-dessus ou en dessous)
 * à l'intérieur d'un périmètre optionnel (ex. les items d'un même projet).
 * Les positions sont renumérotées avant l'échange pour rester contiguës.
 */
async function moveRow(
  table: "projects" | "project_items" | "actions" | "sponsorship_photos",
  id: number,
  direction: "up" | "down",
  scope?: { column: "project_id" | "zone"; value: number | string },
): Promise<void> {
  const client = await getPool().connect();
  try {
    await client.query("BEGIN");
    const where = scope ? `WHERE ${scope.column} = $1` : "";
    const params = scope ? [scope.value] : [];

    // Renumérotation contiguë 1..n dans le périmètre.
    await client.query(
      `UPDATE ${table} t SET position = r.rn
       FROM (SELECT id, ROW_NUMBER() OVER (ORDER BY position, id) AS rn FROM ${table} ${where}) r
       WHERE t.id = r.id`,
      params,
    );

    const { rows } = await client.query(`SELECT position FROM ${table} WHERE id = $1`, [id]);
    if (rows.length === 0) {
      await client.query("ROLLBACK");
      return;
    }
    const current = Number(rows[0].position);
    const target = direction === "up" ? current - 1 : current + 1;

    const neighbour = await client.query(
      `SELECT id FROM ${table} ${where ? where + " AND" : "WHERE"} position = $${params.length + 1}`,
      [...params, target],
    );
    if (neighbour.rows.length > 0) {
      await client.query(`UPDATE ${table} SET position = $1 WHERE id = $2`, [
        current,
        neighbour.rows[0].id,
      ]);
      await client.query(`UPDATE ${table} SET position = $1 WHERE id = $2`, [target, id]);
    }
    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

async function nextPosition(table: string, scopeSql = "", params: unknown[] = []): Promise<number> {
  const row = await queryOne<{ max: number | null }>(
    `SELECT MAX(position)::int AS max FROM ${table} ${scopeSql}`,
    params,
  );
  return (row?.max ?? 0) + 1;
}

export function slugify(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

async function uniqueSlug(base: string, excludeId?: number): Promise<string> {
  const root = base || "projet";
  let candidate = root;
  for (let i = 2; ; i++) {
    const taken = await queryOne<{ id: number }>(
      "SELECT id FROM projects WHERE slug = $1 AND ($2::int IS NULL OR id <> $2)",
      [candidate, excludeId ?? null],
    );
    if (!taken) return candidate;
    candidate = `${root}-${i}`;
  }
}

// ---------------------------------------------------------------------------
// Photos
// ---------------------------------------------------------------------------

export function listPhotos(): Promise<Photo[]> {
  return query<Photo>("SELECT * FROM photos ORDER BY created_at DESC, id DESC");
}

export function getPhoto(id: number): Promise<Photo | null> {
  return queryOne<Photo>("SELECT * FROM photos WHERE id = $1", [id]);
}

export async function insertPhoto(data: {
  filename: string;
  alt: string;
  width: number;
  height: number;
}): Promise<Photo> {
  const row = await queryOne<Photo>(
    `INSERT INTO photos (filename, alt, width, height) VALUES ($1, $2, $3, $4) RETURNING *`,
    [data.filename, data.alt, data.width, data.height],
  );
  return row!;
}

export async function updatePhotoAlt(id: number, alt: string): Promise<void> {
  await query("UPDATE photos SET alt = $1 WHERE id = $2", [alt, id]);
}

/** Supprime la ligne et renvoie le nom de fichier à effacer du disque. */
export async function deletePhoto(id: number): Promise<string | null> {
  const row = await queryOne<{ filename: string }>(
    "DELETE FROM photos WHERE id = $1 RETURNING filename",
    [id],
  );
  return row?.filename ?? null;
}

/** Nombre d'usages d'une photo (pour prévenir avant suppression). */
export async function countPhotoUsages(id: number): Promise<number> {
  const row = await queryOne<{ total: number }>(
    `SELECT (
       (SELECT COUNT(*) FROM projects WHERE cover_photo_id = $1) +
       (SELECT COUNT(*) FROM project_items WHERE photo_id = $1) +
       (SELECT COUNT(*) FROM actions WHERE photo_id = $1) +
       (SELECT COUNT(*) FROM sponsorship_photos WHERE photo_id = $1)
     )::int AS total`,
    [id],
  );
  return row?.total ?? 0;
}

// ---------------------------------------------------------------------------
// Parrainages
// ---------------------------------------------------------------------------

export function listInitials(): Promise<SponsorInitial[]> {
  return query<SponsorInitial>("SELECT * FROM sponsor_initials ORDER BY position, id");
}

/** Remplace toute la liste (l'ordre des labels devient l'ordre d'affichage). */
export async function replaceInitials(labels: string[]): Promise<void> {
  const client = await getPool().connect();
  try {
    await client.query("BEGIN");
    await client.query("DELETE FROM sponsor_initials");
    for (const [i, label] of labels.entries()) {
      await client.query("INSERT INTO sponsor_initials (label, position) VALUES ($1, $2)", [
        label,
        i + 1,
      ]);
    }
    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

export function listSponsorshipPhotos(): Promise<SponsorshipPhoto[]> {
  return query<SponsorshipPhoto>(
    `SELECT sp.id, sp.photo_id, p.filename, p.alt, sp.caption, sp.position
     FROM sponsorship_photos sp JOIN photos p ON p.id = sp.photo_id
     ORDER BY sp.position, sp.id`,
  );
}

export async function addSponsorshipPhoto(photoId: number, caption: string): Promise<void> {
  const position = await nextPosition("sponsorship_photos");
  await query("INSERT INTO sponsorship_photos (photo_id, caption, position) VALUES ($1, $2, $3)", [
    photoId,
    caption,
    position,
  ]);
}

export async function updateSponsorshipPhoto(id: number, caption: string): Promise<void> {
  await query("UPDATE sponsorship_photos SET caption = $1 WHERE id = $2", [caption, id]);
}

export async function removeSponsorshipPhoto(id: number): Promise<void> {
  await query("DELETE FROM sponsorship_photos WHERE id = $1", [id]);
}

export function moveSponsorshipPhoto(id: number, direction: "up" | "down"): Promise<void> {
  return moveRow("sponsorship_photos", id, direction);
}

// ---------------------------------------------------------------------------
// Projets
// ---------------------------------------------------------------------------

const PROJECT_SELECT = `
  SELECT pr.id, pr.slug, pr.title, pr.location, pr.status, pr.summary,
         pr.cover_photo_id, ph.filename AS cover_filename,
         pr.article_url, pr.article_source, pr.position
  FROM projects pr LEFT JOIN photos ph ON ph.id = pr.cover_photo_id`;

export function listProjects(): Promise<Project[]> {
  return query<Project>(`${PROJECT_SELECT} ORDER BY pr.position, pr.id`);
}

export function getProject(id: number): Promise<Project | null> {
  return queryOne<Project>(`${PROJECT_SELECT} WHERE pr.id = $1`, [id]);
}

export function listProjectItems(projectId: number): Promise<ProjectItem[]> {
  return query<ProjectItem>(
    `SELECT it.id, it.project_id, it.label, it.photo_id, ph.filename AS photo_filename, it.position
     FROM project_items it LEFT JOIN photos ph ON ph.id = it.photo_id
     WHERE it.project_id = $1 ORDER BY it.position, it.id`,
    [projectId],
  );
}

export interface ProjectInput {
  title: string;
  location: string;
  status: ProjectStatus;
  summary: string;
  cover_photo_id: number | null;
  article_url: string | null;
  article_source: string | null;
}

export async function createProject(data: ProjectInput): Promise<number> {
  const slug = await uniqueSlug(slugify(data.title));
  const position = await nextPosition("projects");
  const row = await queryOne<{ id: number }>(
    `INSERT INTO projects (slug, title, location, status, summary, cover_photo_id, article_url, article_source, position)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id`,
    [
      slug,
      data.title,
      data.location,
      data.status,
      data.summary,
      data.cover_photo_id,
      data.article_url,
      data.article_source,
      position,
    ],
  );
  return row!.id;
}

export async function updateProject(id: number, data: ProjectInput): Promise<void> {
  const slug = await uniqueSlug(slugify(data.title), id);
  await query(
    `UPDATE projects SET slug = $1, title = $2, location = $3, status = $4, summary = $5,
       cover_photo_id = $6, article_url = $7, article_source = $8, updated_at = now()
     WHERE id = $9`,
    [
      slug,
      data.title,
      data.location,
      data.status,
      data.summary,
      data.cover_photo_id,
      data.article_url,
      data.article_source,
      id,
    ],
  );
}

export async function deleteProject(id: number): Promise<void> {
  await query("DELETE FROM projects WHERE id = $1", [id]);
}

export function moveProject(id: number, direction: "up" | "down"): Promise<void> {
  return moveRow("projects", id, direction);
}

export async function addProjectItem(
  projectId: number,
  label: string,
  photoId: number | null,
): Promise<void> {
  const position = await nextPosition("project_items", "WHERE project_id = $1", [projectId]);
  await query(
    "INSERT INTO project_items (project_id, label, photo_id, position) VALUES ($1, $2, $3, $4)",
    [projectId, label, photoId, position],
  );
}

export async function updateProjectItem(
  id: number,
  label: string,
  photoId: number | null,
): Promise<void> {
  await query("UPDATE project_items SET label = $1, photo_id = $2 WHERE id = $3", [
    label,
    photoId,
    id,
  ]);
}

export async function deleteProjectItem(id: number): Promise<void> {
  await query("DELETE FROM project_items WHERE id = $1", [id]);
}

export async function moveProjectItem(id: number, direction: "up" | "down"): Promise<void> {
  const row = await queryOne<{ project_id: number }>(
    "SELECT project_id FROM project_items WHERE id = $1",
    [id],
  );
  if (!row) return;
  await moveRow("project_items", id, direction, { column: "project_id", value: row.project_id });
}

// ---------------------------------------------------------------------------
// Actions
// ---------------------------------------------------------------------------

const ACTION_SELECT = `
  SELECT a.id, a.zone, a.title, a.description, a.photo_id, ph.filename AS photo_filename,
         a.article_url, a.article_source, a.position
  FROM actions a LEFT JOIN photos ph ON ph.id = a.photo_id`;

export function listActions(): Promise<ActionRow[]> {
  return query<ActionRow>(`${ACTION_SELECT} ORDER BY a.zone, a.position, a.id`);
}

export function getAction(id: number): Promise<ActionRow | null> {
  return queryOne<ActionRow>(`${ACTION_SELECT} WHERE a.id = $1`, [id]);
}

export interface ActionInput {
  zone: ActionZone;
  title: string;
  description: string;
  photo_id: number | null;
  article_url: string | null;
  article_source: string | null;
}

export async function createAction(data: ActionInput): Promise<number> {
  const position = await nextPosition("actions", "WHERE zone = $1", [data.zone]);
  const row = await queryOne<{ id: number }>(
    `INSERT INTO actions (zone, title, description, photo_id, article_url, article_source, position)
     VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`,
    [
      data.zone,
      data.title,
      data.description,
      data.photo_id,
      data.article_url,
      data.article_source,
      position,
    ],
  );
  return row!.id;
}

export async function updateAction(id: number, data: ActionInput): Promise<void> {
  const before = await queryOne<{ zone: ActionZone }>("SELECT zone FROM actions WHERE id = $1", [
    id,
  ]);
  // Un changement de zone place l'action en fin de sa nouvelle zone.
  const position =
    before && before.zone !== data.zone
      ? await nextPosition("actions", "WHERE zone = $1", [data.zone])
      : null;
  await query(
    `UPDATE actions SET zone = $1, title = $2, description = $3, photo_id = $4,
       article_url = $5, article_source = $6, position = COALESCE($7, position), updated_at = now()
     WHERE id = $8`,
    [
      data.zone,
      data.title,
      data.description,
      data.photo_id,
      data.article_url,
      data.article_source,
      position,
      id,
    ],
  );
}

export async function deleteAction(id: number): Promise<void> {
  await query("DELETE FROM actions WHERE id = $1", [id]);
}

export async function moveAction(id: number, direction: "up" | "down"): Promise<void> {
  const row = await queryOne<{ zone: ActionZone }>("SELECT zone FROM actions WHERE id = $1", [id]);
  if (!row) return;
  await moveRow("actions", id, direction, { column: "zone", value: row.zone });
}

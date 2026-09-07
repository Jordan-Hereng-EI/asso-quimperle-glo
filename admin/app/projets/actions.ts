"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  addProjectItem,
  createProject,
  deleteProject,
  deleteProjectItem,
  moveProject,
  moveProjectItem,
  updateProject,
  updateProjectItem,
  type ProjectInput,
} from "@/lib/content";
import { intOrNull, oneOf, optionalText, optionalUrl, text } from "@/lib/forms";

export interface ProjectFormState {
  error: string | null;
}

function revalidate() {
  revalidatePath("/projets");
  revalidatePath("/");
}

function parseProject(
  formData: FormData,
): { ok: true; data: ProjectInput } | { ok: false; error: string } {
  const title = text(formData, "title");
  if (!title) return { ok: false, error: "Le titre est obligatoire." };
  if (title.length > 160)
    return { ok: false, error: "Le titre est trop long (160 caractères max)." };

  const status = oneOf(formData, "status", ["a_venir", "en_cours", "realise"] as const);
  if (!status) return { ok: false, error: "État invalide." };

  const article = optionalUrl(formData, "article_url");
  if (!article.ok)
    return { ok: false, error: "Le lien de l'article doit être une adresse http(s) valide." };

  return {
    ok: true,
    data: {
      title,
      location: text(formData, "location"),
      status,
      summary: text(formData, "summary"),
      cover_photo_id: intOrNull(formData, "cover_photo_id"),
      article_url: article.value,
      article_source: optionalText(formData, "article_source"),
    },
  };
}

export async function createProjectAction(
  _prev: ProjectFormState,
  formData: FormData,
): Promise<ProjectFormState> {
  const parsed = parseProject(formData);
  if (!parsed.ok) return { error: parsed.error };
  const id = await createProject(parsed.data);
  revalidate();
  redirect(`/projets/${id}`);
}

export async function updateProjectAction(
  id: number,
  _prev: ProjectFormState,
  formData: FormData,
): Promise<ProjectFormState> {
  const parsed = parseProject(formData);
  if (!parsed.ok) return { error: parsed.error };
  await updateProject(id, parsed.data);
  revalidate();
  revalidatePath(`/projets/${id}`);
  return { error: null };
}

export async function deleteProjectAction(id: number): Promise<void> {
  await deleteProject(id);
  revalidate();
  redirect("/projets");
}

export async function moveProjectAction(id: number, direction: "up" | "down"): Promise<void> {
  await moveProject(id, direction);
  revalidate();
}

export async function addItemAction(projectId: number, formData: FormData): Promise<void> {
  const label = text(formData, "label");
  if (!label) return;
  await addProjectItem(projectId, label, intOrNull(formData, "photo_id"));
  revalidate();
  revalidatePath(`/projets/${projectId}`);
}

export async function saveItemAction(
  projectId: number,
  itemId: number,
  formData: FormData,
): Promise<void> {
  const label = text(formData, "label");
  if (!label) return;
  await updateProjectItem(itemId, label, intOrNull(formData, "photo_id"));
  revalidate();
  revalidatePath(`/projets/${projectId}`);
}

export async function deleteItemAction(projectId: number, itemId: number): Promise<void> {
  await deleteProjectItem(itemId);
  revalidate();
  revalidatePath(`/projets/${projectId}`);
}

export async function moveItemAction(
  projectId: number,
  itemId: number,
  direction: "up" | "down",
): Promise<void> {
  await moveProjectItem(itemId, direction);
  revalidate();
  revalidatePath(`/projets/${projectId}`);
}

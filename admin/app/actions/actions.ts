"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  createAction,
  deleteAction,
  moveAction,
  updateAction,
  type ActionInput,
} from "@/lib/content";
import { intOrNull, oneOf, optionalText, optionalUrl, text } from "@/lib/forms";

export interface ActionFormState {
  error: string | null;
}

function revalidate() {
  revalidatePath("/actions");
  revalidatePath("/");
}

function parseAction(
  formData: FormData,
): { ok: true; data: ActionInput } | { ok: false; error: string } {
  const title = text(formData, "title");
  if (!title) return { ok: false, error: "Le titre est obligatoire." };
  if (title.length > 160)
    return { ok: false, error: "Le titre est trop long (160 caractères max)." };

  const zone = oneOf(formData, "zone", ["benin", "bretagne"] as const);
  if (!zone) return { ok: false, error: "Zone invalide." };

  const article = optionalUrl(formData, "article_url");
  if (!article.ok)
    return { ok: false, error: "Le lien de l'article doit être une adresse http(s) valide." };

  return {
    ok: true,
    data: {
      zone,
      title,
      description: text(formData, "description"),
      photo_id: intOrNull(formData, "photo_id"),
      article_url: article.value,
      article_source: optionalText(formData, "article_source"),
    },
  };
}

export async function createActionAction(
  _prev: ActionFormState,
  formData: FormData,
): Promise<ActionFormState> {
  const parsed = parseAction(formData);
  if (!parsed.ok) return { error: parsed.error };
  await createAction(parsed.data);
  revalidate();
  redirect("/actions");
}

export async function updateActionAction(
  id: number,
  _prev: ActionFormState,
  formData: FormData,
): Promise<ActionFormState> {
  const parsed = parseAction(formData);
  if (!parsed.ok) return { error: parsed.error };
  await updateAction(id, parsed.data);
  revalidate();
  revalidatePath(`/actions/${id}`);
  return { error: null };
}

export async function deleteActionAction(id: number): Promise<void> {
  await deleteAction(id);
  revalidate();
  redirect("/actions");
}

export async function moveActionAction(id: number, direction: "up" | "down"): Promise<void> {
  await moveAction(id, direction);
  revalidate();
}

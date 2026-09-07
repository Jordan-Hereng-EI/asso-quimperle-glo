"use server";

import { revalidatePath } from "next/cache";
import {
  addSponsorshipPhoto,
  moveSponsorshipPhoto,
  removeSponsorshipPhoto,
  replaceInitials,
  updateSponsorshipPhoto,
} from "@/lib/content";
import { intOrNull, text } from "@/lib/forms";

export interface InitialsState {
  error: string | null;
  success: string | null;
}

function revalidate() {
  revalidatePath("/parrainages");
  revalidatePath("/");
}

export async function saveInitials(
  _prev: InitialsState,
  formData: FormData,
): Promise<InitialsState> {
  const labels = text(formData, "initials")
    .split(/\r?\n|,/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  if (labels.some((l) => l.length > 40)) {
    return { error: "Chaque entrée doit faire moins de 40 caractères.", success: null };
  }

  await replaceInitials(labels);
  revalidate();
  return {
    error: null,
    success: `${labels.length} entrée${labels.length > 1 ? "s" : ""} enregistrée${labels.length > 1 ? "s" : ""}.`,
  };
}

export async function addGalleryPhoto(formData: FormData): Promise<void> {
  const photoId = intOrNull(formData, "photo_id");
  if (photoId === null) return;
  await addSponsorshipPhoto(photoId, text(formData, "caption"));
  revalidate();
}

export async function saveGalleryCaption(id: number, formData: FormData): Promise<void> {
  await updateSponsorshipPhoto(id, text(formData, "caption"));
  revalidate();
}

export async function removeGalleryPhoto(id: number): Promise<void> {
  await removeSponsorshipPhoto(id);
  revalidate();
}

export async function moveGalleryPhoto(id: number, direction: "up" | "down"): Promise<void> {
  await moveSponsorshipPhoto(id, direction);
  revalidate();
}

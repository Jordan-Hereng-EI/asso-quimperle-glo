"use server";

import { revalidatePath } from "next/cache";
import { countPhotoUsages, deletePhoto, insertPhoto, updatePhotoAlt } from "@/lib/content";
import { text } from "@/lib/forms";
import { ACCEPTED_MIME_TYPES, MAX_UPLOAD_BYTES, deleteImageFile, storeImage } from "@/lib/uploads";

export interface UploadState {
  error: string | null;
  success: string | null;
}

function revalidateAll() {
  for (const p of ["/", "/photos", "/projets", "/actions", "/parrainages"]) revalidatePath(p);
}

export async function uploadPhotos(_prev: UploadState, formData: FormData): Promise<UploadState> {
  const files = formData.getAll("files").filter((f): f is File => f instanceof File && f.size > 0);
  const alt = text(formData, "alt");

  if (files.length === 0) {
    return { error: "Sélectionnez au moins une image.", success: null };
  }

  const rejected: string[] = [];
  let stored = 0;

  for (const file of files) {
    if (!ACCEPTED_MIME_TYPES.has(file.type)) {
      rejected.push(`${file.name} (format non pris en charge)`);
      continue;
    }
    if (file.size > MAX_UPLOAD_BYTES) {
      rejected.push(`${file.name} (plus de ${Math.round(MAX_UPLOAD_BYTES / 1024 / 1024)} Mo)`);
      continue;
    }
    try {
      const image = await storeImage(Buffer.from(await file.arrayBuffer()));
      await insertPhoto({
        filename: image.filename,
        // Sans description, on garde le nom du fichier d'origine (sans extension)
        // pour que la cliente s'y retrouve dans les listes.
        alt: alt || file.name.replace(/\.[^.]+$/, ""),
        width: image.width,
        height: image.height,
      });
      stored++;
    } catch (error) {
      console.error("[admin] upload :", file.name, error);
      rejected.push(`${file.name} (image illisible)`);
    }
  }

  revalidateAll();
  const success =
    stored > 0 ? `${stored} photo${stored > 1 ? "s" : ""} ajoutée${stored > 1 ? "s" : ""}.` : null;
  const error = rejected.length > 0 ? `Non importé : ${rejected.join(", ")}.` : null;
  return { error, success };
}

export async function savePhotoAlt(id: number, formData: FormData): Promise<void> {
  await updatePhotoAlt(id, text(formData, "alt"));
  revalidateAll();
}

export async function removePhoto(id: number): Promise<void> {
  const filename = await deletePhoto(id);
  if (filename) await deleteImageFile(filename);
  revalidateAll();
}

export async function getUsages(id: number): Promise<number> {
  return countPhotoUsages(id);
}

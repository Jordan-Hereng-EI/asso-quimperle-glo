import { randomBytes } from "node:crypto";
import { mkdir, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

/** Bord le plus long après redimensionnement — suffisant pour un affichage
 *  plein écran sur le site, et 5 à 10 fois plus léger qu'une photo de téléphone. */
const MAX_EDGE = 1600;
const WEBP_QUALITY = 80;
export const MAX_UPLOAD_BYTES = 20 * 1024 * 1024;

export const ACCEPTED_MIME_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
  "image/gif",
  "image/tiff",
]);

/** Seuls les fichiers produits par storeImage() ont ce format de nom. */
export const UPLOAD_FILENAME_PATTERN = /^[0-9]{13}-[a-f0-9]{16}\.webp$/;

export function getUploadsDir(): string {
  return path.resolve(process.env.UPLOADS_DIR ?? "./uploads");
}

export interface StoredImage {
  filename: string;
  width: number;
  height: number;
}

/**
 * Convertit une image quelconque en WebP redimensionnée et l'écrit dans
 * UPLOADS_DIR. L'orientation EXIF est appliquée (photos de téléphone), les
 * métadonnées sont supprimées.
 */
export async function storeImage(input: Buffer): Promise<StoredImage> {
  const dir = getUploadsDir();
  await mkdir(dir, { recursive: true });

  const filename = `${Date.now()}-${randomBytes(8).toString("hex")}.webp`;
  const { data, info } = await sharp(input)
    .rotate()
    .resize({ width: MAX_EDGE, height: MAX_EDGE, fit: "inside", withoutEnlargement: true })
    .webp({ quality: WEBP_QUALITY })
    .toBuffer({ resolveWithObject: true });

  await writeFile(path.join(dir, filename), data);
  return { filename, width: info.width, height: info.height };
}

export async function deleteImageFile(filename: string): Promise<void> {
  if (!UPLOAD_FILENAME_PATTERN.test(filename)) return;
  try {
    await unlink(path.join(getUploadsDir(), filename));
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
  }
}

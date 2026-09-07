import { readFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";

/** Même convention de nommage que l'admin (qui produit les fichiers). */
const UPLOAD_FILENAME_PATTERN = /^[0-9]{13}-[a-f0-9]{16}\.webp$/;

/**
 * Sert les photos uploadées depuis l'admin, lues sur le volume partagé
 * (UPLOADS_DIR, monté en lecture seule). Noms uniques → cache immuable.
 */
export async function GET(_request: Request, { params }: { params: Promise<{ file: string }> }) {
  const { file } = await params;
  if (!UPLOAD_FILENAME_PATTERN.test(file)) {
    return new NextResponse("Not found", { status: 404 });
  }

  const dir = path.resolve(process.env.UPLOADS_DIR ?? "./uploads");
  try {
    const data = await readFile(path.join(dir, file));
    return new NextResponse(new Uint8Array(data), {
      headers: {
        "Content-Type": "image/webp",
        "Content-Length": String(data.byteLength),
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return new NextResponse("Not found", { status: 404 });
    }
    throw error;
  }
}

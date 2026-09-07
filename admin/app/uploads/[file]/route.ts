import { readFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { UPLOAD_FILENAME_PATTERN, getUploadsDir } from "@/lib/uploads";

/**
 * Sert les photos uploadées depuis le volume partagé. Les noms de fichiers
 * sont uniques et jamais réécrits, d'où le cache immuable.
 */
export async function GET(_request: Request, { params }: { params: Promise<{ file: string }> }) {
  const { file } = await params;
  if (!UPLOAD_FILENAME_PATTERN.test(file)) {
    return new NextResponse("Not found", { status: 404 });
  }

  try {
    const data = await readFile(path.join(getUploadsDir(), file));
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

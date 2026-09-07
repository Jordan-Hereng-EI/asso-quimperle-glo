import type { Metadata } from "next";
import { AdminShell } from "@/components/AdminShell";
import { ConfirmButton } from "@/components/ConfirmButton";
import { requireSession } from "@/lib/auth-guard";
import { countPhotoUsages, listPhotos } from "@/lib/content";
import { removePhoto, savePhotoAlt } from "./actions";
import { UploadForm } from "./UploadForm";

export const metadata: Metadata = { title: "Photos" };
export const dynamic = "force-dynamic";

export default async function PhotosPage() {
  const session = await requireSession();
  const photos = await listPhotos();
  const usages = await Promise.all(photos.map((p) => countPhotoUsages(p.id)));

  return (
    <AdminShell active="photos" email={session.email} title="Photothèque">
      <UploadForm />

      {photos.length === 0 ? (
        <div className="placeholder">Aucune photo pour l&apos;instant.</div>
      ) : (
        <div className="photo-grid">
          {photos.map((photo, i) => (
            <div key={photo.id} className="photo-card">
              <div className="photo-card-img">
                {/* eslint-disable-next-line @next/next/no-img-element -- fichiers locaux déjà optimisés */}
                <img src={`/uploads/${photo.filename}`} alt={photo.alt} loading="lazy" />
              </div>
              <div className="photo-card-body">
                <div className="photo-card-meta">
                  <span>#{photo.id}</span>
                  <span>
                    {photo.width}×{photo.height}
                  </span>
                  <span>{usages[i] === 0 ? "non utilisée" : `utilisée ${usages[i]} fois`}</span>
                </div>
                <form action={savePhotoAlt.bind(null, photo.id)} className="photo-card-actions">
                  <input
                    className="inline-input"
                    name="alt"
                    defaultValue={photo.alt}
                    placeholder="Description"
                    maxLength={200}
                    aria-label="Description de la photo"
                  />
                  <button type="submit" className="btn btn-ghost btn-sm">
                    OK
                  </button>
                </form>
                <form action={removePhoto.bind(null, photo.id)}>
                  <ConfirmButton
                    className="btn btn-danger btn-sm btn-block"
                    confirm={
                      usages[i] > 0
                        ? `Cette photo est utilisée ${usages[i]} fois sur le site. La supprimer quand même ? Les emplacements afficheront « Photo à venir ».`
                        : "Supprimer définitivement cette photo ?"
                    }
                  >
                    Supprimer
                  </ConfirmButton>
                </form>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminShell>
  );
}

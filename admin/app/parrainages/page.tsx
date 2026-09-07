import type { Metadata } from "next";
import { AdminShell } from "@/components/AdminShell";
import { ConfirmButton } from "@/components/ConfirmButton";
import { PhotoPicker } from "@/components/PhotoPicker";
import { requireSession } from "@/lib/auth-guard";
import { listInitials, listPhotos, listSponsorshipPhotos } from "@/lib/content";
import {
  addGalleryPhoto,
  moveGalleryPhoto,
  removeGalleryPhoto,
  saveGalleryCaption,
} from "./actions";
import { InitialsForm } from "./InitialsForm";

export const metadata: Metadata = { title: "Parrainages" };
export const dynamic = "force-dynamic";

export default async function ParrainagesPage() {
  const session = await requireSession();
  const [initials, gallery, photos] = await Promise.all([
    listInitials(),
    listSponsorshipPhotos(),
    listPhotos(),
  ]);

  return (
    <AdminShell active="parrainages" email={session.email} title="Page Parrainages">
      <InitialsForm initials={initials.map((i) => i.label)} />

      <div className="panel">
        <h2>Photos de la page</h2>
        <p className="panel-desc">
          Enfants parrainés, moments de parrainage… affichées en galerie sur la page Parrainages du
          site, dans cet ordre.
        </p>

        {gallery.length === 0 ? (
          <div className="placeholder" style={{ marginBottom: 16 }}>
            Aucune photo dans la galerie.
          </div>
        ) : (
          <div className="list" style={{ marginBottom: 20 }}>
            {gallery.map((g, i) => (
              <div key={g.id} className="row">
                <div className="thumb">
                  {/* eslint-disable-next-line @next/next/no-img-element -- fichiers locaux déjà optimisés */}
                  <img src={`/uploads/${g.filename}`} alt={g.alt} />
                </div>
                <form
                  action={saveGalleryCaption.bind(null, g.id)}
                  className="row-body"
                  style={{ display: "flex", gap: 8 }}
                >
                  <input
                    className="inline-input"
                    name="caption"
                    defaultValue={g.caption}
                    placeholder="Légende (optionnelle)"
                    maxLength={200}
                    aria-label="Légende"
                  />
                  <button type="submit" className="btn btn-ghost btn-sm">
                    OK
                  </button>
                </form>
                <div className="row-actions">
                  <form action={moveGalleryPhoto.bind(null, g.id, "up")}>
                    <button
                      type="submit"
                      className="btn btn-ghost btn-icon"
                      disabled={i === 0}
                      aria-label="Monter"
                    >
                      ↑
                    </button>
                  </form>
                  <form action={moveGalleryPhoto.bind(null, g.id, "down")}>
                    <button
                      type="submit"
                      className="btn btn-ghost btn-icon"
                      disabled={i === gallery.length - 1}
                      aria-label="Descendre"
                    >
                      ↓
                    </button>
                  </form>
                  <form action={removeGalleryPhoto.bind(null, g.id)}>
                    <ConfirmButton
                      className="btn btn-danger btn-sm"
                      confirm="Retirer cette photo de la page Parrainages ? (Elle reste dans la photothèque.)"
                    >
                      Retirer
                    </ConfirmButton>
                  </form>
                </div>
              </div>
            ))}
          </div>
        )}

        <form action={addGalleryPhoto} className="row-edit">
          <PhotoPicker name="photo_id" photos={photos} value={null} compact />
          <input
            className="inline-input"
            name="caption"
            placeholder="Légende (optionnelle)"
            maxLength={200}
            aria-label="Légende"
          />
          <button type="submit" className="btn btn-primary btn-sm">
            Ajouter à la galerie
          </button>
        </form>
      </div>
    </AdminShell>
  );
}

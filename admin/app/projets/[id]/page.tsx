import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AdminShell } from "@/components/AdminShell";
import { ConfirmButton } from "@/components/ConfirmButton";
import { PhotoPicker } from "@/components/PhotoPicker";
import { requireSession } from "@/lib/auth-guard";
import { getProject, listPhotos, listProjectItems } from "@/lib/content";
import { ProjectForm } from "../ProjectForm";
import {
  addItemAction,
  deleteItemAction,
  deleteProjectAction,
  moveItemAction,
  saveItemAction,
} from "../actions";

export const metadata: Metadata = { title: "Projet" };
export const dynamic = "force-dynamic";

export default async function ProjetPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await requireSession();
  const id = Number.parseInt((await params).id, 10);
  if (!Number.isFinite(id)) notFound();

  const project = await getProject(id);
  if (!project) notFound();

  const [items, photos] = await Promise.all([listProjectItems(id), listPhotos()]);

  return (
    <AdminShell active="projets" email={session.email} title={project.title}>
      <ProjectForm project={project} photos={photos} />

      <div className="panel">
        <h2>Réalisations</h2>
        <p className="panel-desc">
          La liste numérotée du projet, chaque ligne avec sa photo. Affichée dans cet ordre sur le
          site.
        </p>

        {items.length === 0 ? (
          <div className="placeholder" style={{ marginBottom: 16 }}>
            Aucune réalisation pour l&apos;instant.
          </div>
        ) : (
          <div className="list" style={{ marginBottom: 20 }}>
            {items.map((item, i) => (
              <div key={item.id} className="row">
                <span className="row-meta" style={{ width: 24, textAlign: "right" }}>
                  {i + 1}.
                </span>
                <form action={saveItemAction.bind(null, id, item.id)} className="row-body row-edit">
                  <PhotoPicker name="photo_id" photos={photos} value={item.photo_id} compact />
                  <input
                    className="inline-input"
                    name="label"
                    defaultValue={item.label}
                    required
                    maxLength={300}
                    aria-label="Intitulé"
                  />
                  <button type="submit" className="btn btn-ghost btn-sm">
                    OK
                  </button>
                </form>
                <div className="row-actions">
                  <form action={moveItemAction.bind(null, id, item.id, "up")}>
                    <button
                      type="submit"
                      className="btn btn-ghost btn-icon"
                      disabled={i === 0}
                      aria-label="Monter"
                    >
                      ↑
                    </button>
                  </form>
                  <form action={moveItemAction.bind(null, id, item.id, "down")}>
                    <button
                      type="submit"
                      className="btn btn-ghost btn-icon"
                      disabled={i === items.length - 1}
                      aria-label="Descendre"
                    >
                      ↓
                    </button>
                  </form>
                  <form action={deleteItemAction.bind(null, id, item.id)}>
                    <ConfirmButton
                      className="btn btn-danger btn-sm"
                      confirm="Supprimer cette réalisation ?"
                    >
                      ×
                    </ConfirmButton>
                  </form>
                </div>
              </div>
            ))}
          </div>
        )}

        <form action={addItemAction.bind(null, id)} className="row-edit">
          <PhotoPicker name="photo_id" photos={photos} value={null} compact />
          <input
            className="inline-input"
            name="label"
            required
            maxLength={300}
            placeholder="Nouvelle réalisation, ex. : Latrines à 4 cabines"
            aria-label="Intitulé"
          />
          <button type="submit" className="btn btn-primary btn-sm">
            Ajouter
          </button>
        </form>
      </div>

      <div className="panel">
        <h2>Zone dangereuse</h2>
        <form action={deleteProjectAction.bind(null, id)}>
          <ConfirmButton
            className="btn btn-danger"
            confirm={`Supprimer définitivement le projet « ${project.title} » et ses ${items.length} réalisation(s) ?`}
          >
            Supprimer ce projet
          </ConfirmButton>
        </form>
      </div>
    </AdminShell>
  );
}

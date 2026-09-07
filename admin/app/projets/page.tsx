import type { Metadata } from "next";
import Link from "next/link";
import { AdminShell } from "@/components/AdminShell";
import { requireSession } from "@/lib/auth-guard";
import { listProjects } from "@/lib/content";
import { PROJECT_STATUS_LABELS } from "@/lib/types";
import { moveProjectAction } from "./actions";

export const metadata: Metadata = { title: "Projets" };
export const dynamic = "force-dynamic";

export default async function ProjetsPage() {
  const session = await requireSession();
  const projects = await listProjects();

  return (
    <AdminShell
      active="projets"
      email={session.email}
      title="Projets"
      headAction={
        <Link href="/projets/nouveau" className="btn btn-primary btn-sm">
          + Nouveau projet
        </Link>
      }
    >
      <p className="panel-desc">
        L&apos;ordre ci-dessous est celui de la page Projets du site. Le premier projet « En cours »
        est mis en avant sur l&apos;accueil.
      </p>

      {projects.length === 0 ? (
        <div className="placeholder">Aucun projet. Créez le premier !</div>
      ) : (
        <div className="list">
          {projects.map((p, i) => (
            <div key={p.id} className="row">
              <div className="thumb">
                {p.cover_filename ? (
                  // eslint-disable-next-line @next/next/no-img-element -- fichiers locaux déjà optimisés
                  <img src={`/uploads/${p.cover_filename}`} alt="" />
                ) : (
                  <span className="thumb-empty">Photo à venir</span>
                )}
              </div>
              <div className="row-body">
                <div className="row-title">
                  <span className={`badge badge-${p.status}`}>
                    {PROJECT_STATUS_LABELS[p.status]}
                  </span>
                  <Link href={`/projets/${p.id}`}>{p.title}</Link>
                </div>
                <div className="row-meta">{p.location || "Lieu non renseigné"}</div>
              </div>
              <div className="row-actions">
                <form action={moveProjectAction.bind(null, p.id, "up")}>
                  <button
                    type="submit"
                    className="btn btn-ghost btn-icon"
                    disabled={i === 0}
                    aria-label="Monter"
                  >
                    ↑
                  </button>
                </form>
                <form action={moveProjectAction.bind(null, p.id, "down")}>
                  <button
                    type="submit"
                    className="btn btn-ghost btn-icon"
                    disabled={i === projects.length - 1}
                    aria-label="Descendre"
                  >
                    ↓
                  </button>
                </form>
                <Link href={`/projets/${p.id}`} className="btn btn-ghost btn-sm">
                  Modifier
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminShell>
  );
}

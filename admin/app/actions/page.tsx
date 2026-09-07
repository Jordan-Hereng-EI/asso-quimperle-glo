import type { Metadata } from "next";
import Link from "next/link";
import { AdminShell } from "@/components/AdminShell";
import { requireSession } from "@/lib/auth-guard";
import { listActions } from "@/lib/content";
import { ACTION_ZONE_LABELS, type ActionRow, type ActionZone } from "@/lib/types";
import { moveActionAction } from "./actions";

export const metadata: Metadata = { title: "Actions" };
export const dynamic = "force-dynamic";

const ZONES: ActionZone[] = ["benin", "bretagne"];

function ZoneList({ zone, actions }: { zone: ActionZone; actions: ActionRow[] }) {
  return (
    <div className="panel">
      <h2>
        <span className={`badge badge-${zone}`}>{ACTION_ZONE_LABELS[zone]}</span>
        {actions.length} action{actions.length > 1 ? "s" : ""}
      </h2>
      {actions.length === 0 ? (
        <div className="placeholder">Aucune action dans cette zone.</div>
      ) : (
        <div className="list">
          {actions.map((a, i) => (
            <div key={a.id} className="row">
              <div className="thumb thumb-sm">
                {a.photo_filename ? (
                  // eslint-disable-next-line @next/next/no-img-element -- fichiers locaux déjà optimisés
                  <img src={`/uploads/${a.photo_filename}`} alt="" />
                ) : (
                  <span className="thumb-empty">À venir</span>
                )}
              </div>
              <div className="row-body">
                <div className="row-title">
                  <Link href={`/actions/${a.id}`}>{a.title}</Link>
                </div>
                <div className="row-meta">
                  {a.description
                    ? a.description.slice(0, 110) + (a.description.length > 110 ? "…" : "")
                    : "Sans description"}
                </div>
              </div>
              <div className="row-actions">
                <form action={moveActionAction.bind(null, a.id, "up")}>
                  <button
                    type="submit"
                    className="btn btn-ghost btn-icon"
                    disabled={i === 0}
                    aria-label="Monter"
                  >
                    ↑
                  </button>
                </form>
                <form action={moveActionAction.bind(null, a.id, "down")}>
                  <button
                    type="submit"
                    className="btn btn-ghost btn-icon"
                    disabled={i === actions.length - 1}
                    aria-label="Descendre"
                  >
                    ↓
                  </button>
                </form>
                <Link href={`/actions/${a.id}`} className="btn btn-ghost btn-sm">
                  Modifier
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default async function ActionsPage() {
  const session = await requireSession();
  const all = await listActions();

  return (
    <AdminShell
      active="actions"
      email={session.email}
      title="Actions"
      headAction={
        <Link href="/actions/nouveau" className="btn btn-primary btn-sm">
          + Nouvelle action
        </Link>
      }
    >
      {ZONES.map((zone) => (
        <ZoneList key={zone} zone={zone} actions={all.filter((a) => a.zone === zone)} />
      ))}
    </AdminShell>
  );
}

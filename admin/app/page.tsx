import Link from "next/link";
import { AdminShell } from "@/components/AdminShell";
import { requireSession } from "@/lib/auth-guard";
import { queryOne } from "@/lib/db";

export const dynamic = "force-dynamic";

interface Counts {
  photos: number;
  projects_en_cours: number;
  projects_realise: number;
  projects_a_venir: number;
  actions_benin: number;
  actions_bretagne: number;
  initials: number;
  sponsorship_photos: number;
}

async function loadCounts(): Promise<Counts | null> {
  try {
    return await queryOne<Counts>(`
      SELECT
        (SELECT COUNT(*) FROM photos)::int AS photos,
        (SELECT COUNT(*) FROM projects WHERE status = 'en_cours')::int AS projects_en_cours,
        (SELECT COUNT(*) FROM projects WHERE status = 'realise')::int AS projects_realise,
        (SELECT COUNT(*) FROM projects WHERE status = 'a_venir')::int AS projects_a_venir,
        (SELECT COUNT(*) FROM actions WHERE zone = 'benin')::int AS actions_benin,
        (SELECT COUNT(*) FROM actions WHERE zone = 'bretagne')::int AS actions_bretagne,
        (SELECT COUNT(*) FROM sponsor_initials)::int AS initials,
        (SELECT COUNT(*) FROM sponsorship_photos)::int AS sponsorship_photos
    `);
  } catch (error) {
    console.error("[admin] tableau de bord :", error);
    return null;
  }
}

export default async function DashboardPage() {
  const session = await requireSession();
  const counts = await loadCounts();

  return (
    <AdminShell active="dashboard" email={session.email} title="Tableau de bord">
      {counts ? (
        <div className="stats">
          <Link href="/photos" className="stat">
            <div className="value">{counts.photos}</div>
            <div className="label">photos dans la photothèque</div>
          </Link>
          <Link href="/projets" className="stat">
            <div className="value">{counts.projects_en_cours}</div>
            <div className="label">
              projet{counts.projects_en_cours > 1 ? "s" : ""} en cours · {counts.projects_realise}{" "}
              réalisé{counts.projects_realise > 1 ? "s" : ""} · {counts.projects_a_venir} à venir
            </div>
          </Link>
          <Link href="/actions" className="stat">
            <div className="value">{counts.actions_benin + counts.actions_bretagne}</div>
            <div className="label">
              actions · {counts.actions_benin} au Bénin, {counts.actions_bretagne} en Bretagne
            </div>
          </Link>
          <Link href="/parrainages" className="stat">
            <div className="value">{counts.initials}</div>
            <div className="label">
              parrains &amp; marraines · {counts.sponsorship_photos} photo
              {counts.sponsorship_photos > 1 ? "s" : ""}
            </div>
          </Link>
        </div>
      ) : (
        <p className="error">
          Impossible de lire la base de données. Vérifiez que le conteneur <code>db</code> tourne et
          que <code>DATABASE_URL</code> est définie.
        </p>
      )}

      <div className="panel">
        <h2>Comment ça marche</h2>
        <p className="panel-desc">
          Les modifications faites ici sont visibles immédiatement sur le site public.
        </p>
        <ol style={{ margin: 0, paddingLeft: 20, lineHeight: 1.8 }}>
          <li>
            Déposez d&apos;abord vos images dans <Link href="/photos">Photos</Link> : elles sont
            converties et allégées automatiquement.
          </li>
          <li>
            Associez-les ensuite aux <Link href="/projets">projets</Link>, aux{" "}
            <Link href="/actions">actions</Link> ou à la page{" "}
            <Link href="/parrainages">Parrainages</Link>.
          </li>
          <li>Tant qu&apos;aucune photo n&apos;est associée, le site affiche « Photo à venir ».</li>
        </ol>
      </div>
    </AdminShell>
  );
}

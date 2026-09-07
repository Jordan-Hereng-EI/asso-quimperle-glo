import type { Metadata } from "next";
import { AdminShell } from "@/components/AdminShell";
import { requireSession } from "@/lib/auth-guard";
import { listPhotos } from "@/lib/content";
import { ProjectForm } from "../ProjectForm";

export const metadata: Metadata = { title: "Nouveau projet" };
export const dynamic = "force-dynamic";

export default async function NouveauProjetPage() {
  const session = await requireSession();
  const photos = await listPhotos();

  return (
    <AdminShell active="projets" email={session.email} title="Nouveau projet">
      <ProjectForm project={null} photos={photos} />
      <p className="panel-desc">
        Vous pourrez ajouter les réalisations (liste numérotée avec photos) une fois le projet créé.
      </p>
    </AdminShell>
  );
}

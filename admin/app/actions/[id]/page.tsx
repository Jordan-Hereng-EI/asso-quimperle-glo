import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AdminShell } from "@/components/AdminShell";
import { ConfirmButton } from "@/components/ConfirmButton";
import { requireSession } from "@/lib/auth-guard";
import { getAction, listPhotos } from "@/lib/content";
import { ActionForm } from "../ActionForm";
import { deleteActionAction } from "../actions";

export const metadata: Metadata = { title: "Action" };
export const dynamic = "force-dynamic";

export default async function ActionPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await requireSession();
  const id = Number.parseInt((await params).id, 10);
  if (!Number.isFinite(id)) notFound();

  const [action, photos] = await Promise.all([getAction(id), listPhotos()]);
  if (!action) notFound();

  return (
    <AdminShell active="actions" email={session.email} title={action.title}>
      <ActionForm action={action} photos={photos} />

      <div className="panel">
        <h2>Zone dangereuse</h2>
        <form action={deleteActionAction.bind(null, id)}>
          <ConfirmButton
            className="btn btn-danger"
            confirm={`Supprimer définitivement l'action « ${action.title} » ?`}
          >
            Supprimer cette action
          </ConfirmButton>
        </form>
      </div>
    </AdminShell>
  );
}

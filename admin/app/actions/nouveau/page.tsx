import type { Metadata } from "next";
import { AdminShell } from "@/components/AdminShell";
import { requireSession } from "@/lib/auth-guard";
import { listPhotos } from "@/lib/content";
import type { ActionZone } from "@/lib/types";
import { ActionForm } from "../ActionForm";

export const metadata: Metadata = { title: "Nouvelle action" };
export const dynamic = "force-dynamic";

export default async function NouvelleActionPage({
  searchParams,
}: {
  searchParams: Promise<{ zone?: string }>;
}) {
  const session = await requireSession();
  const photos = await listPhotos();
  const { zone } = await searchParams;
  const defaultZone: ActionZone = zone === "bretagne" ? "bretagne" : "benin";

  return (
    <AdminShell active="actions" email={session.email} title="Nouvelle action">
      <ActionForm action={null} photos={photos} defaultZone={defaultZone} />
    </AdminShell>
  );
}

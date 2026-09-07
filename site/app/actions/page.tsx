import type { Metadata } from "next";
import { getActions } from "@/lib/content";
import { ActionsPage } from "./ActionsPage";

export const metadata: Metadata = {
  title: "Nos actions",
  description:
    "Ce que fait l'Association Quimperlé-Glo au quotidien : interventions dans les écoles bretonnes, forum des associations, ateliers cuisine, missions au Bénin.",
};

export const dynamic = "force-dynamic";

export default async function Page() {
  const actions = await getActions();
  return <ActionsPage actions={actions} />;
}

import type { Metadata } from "next";
import { getProjects } from "@/lib/content";
import { ProjetsPage } from "./ProjetsPage";

export const metadata: Metadata = {
  title: "Nos projets",
  description:
    "Collège, école primaire, cantine scolaire, santé : les projets réalisés, en cours et à venir de l'Association Quimperlé-Glo au Bénin.",
};

export const dynamic = "force-dynamic";

export default async function Page() {
  const projects = await getProjects();
  return <ProjetsPage projects={projects} />;
}

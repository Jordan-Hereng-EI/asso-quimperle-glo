import type { Metadata } from "next";
import { getSponsorship } from "@/lib/content";
import { ParrainagesPage } from "./ParrainagesPage";

export const metadata: Metadata = {
  title: "Parrainages",
  description:
    "Une vingtaine d'enfants et de personnes parrainés à Glo Yokpo, Glo Alladacomè et Agla Cotonou. Rejoignez l'équipe des parrains et marraines de l'Association Quimperlé-Glo.",
};

export const dynamic = "force-dynamic";

export default async function Page() {
  const sponsorship = await getSponsorship();
  return <ParrainagesPage sponsorship={sponsorship} />;
}

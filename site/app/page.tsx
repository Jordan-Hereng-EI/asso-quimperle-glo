import { getCounts, getProjects, pickFeatured } from "@/lib/content";
import { HomePage } from "./HomePage";

// Le projet mis en avant et les compteurs viennent de la base : rendu à la
// demande pour refléter immédiatement les modifications faites dans l'admin.
export const dynamic = "force-dynamic";

export default async function Page() {
  const [projects, counts] = await Promise.all([getProjects(), getCounts()]);
  return <HomePage featured={pickFeatured(projects)} counts={counts} />;
}

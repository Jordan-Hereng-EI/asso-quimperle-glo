import { redirect } from "next/navigation";
import { getSession } from "./session";

/**
 * Le middleware protège déjà toutes les routes ; cette vérification côté
 * page est la ceinture avec les bretelles (accès direct au serveur Node
 * derrière le proxy, par exemple).
 */
export async function requireSession(): Promise<{ email: string }> {
  const session = await getSession();
  if (!session) redirect("/login");
  return session;
}

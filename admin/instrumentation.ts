/**
 * Exécuté une fois au démarrage du serveur Next (pas pendant `next build`).
 * Joue les migrations SQL en attente pour que la base soit toujours au bon
 * schéma après un déploiement.
 */
export async function register() {
  if (process.env.NEXT_RUNTIME !== "nodejs") return;

  const { migrate } = await import("@/lib/db");
  try {
    await migrate();
  } catch (error) {
    // On ne fait pas tomber le serveur : la page de connexion reste
    // accessible et l'erreur apparaîtra clairement dans les logs du conteneur.
    console.error("[admin] échec des migrations :", error);
  }
}

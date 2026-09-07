import { Pool } from "pg";

declare global {
  // Cache du pool entre rechargements du serveur de développement.
  var __qgSitePool: Pool | undefined;
}

function getPool(): Pool | null {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) return null;
  if (!global.__qgSitePool) {
    global.__qgSitePool = new Pool({
      connectionString,
      max: 5,
      idleTimeoutMillis: 30_000,
      connectionTimeoutMillis: 5_000,
    });
  }
  return global.__qgSitePool;
}

/**
 * Lecture seule. Le site ne doit jamais tomber à cause de la base : sans
 * DATABASE_URL ou en cas d'erreur, on journalise et on renvoie une liste vide,
 * les pages affichent alors leurs états « à venir ».
 */
export async function safeQuery<T extends object>(
  text: string,
  params: unknown[] = [],
): Promise<T[]> {
  const pool = getPool();
  if (!pool) return [];
  try {
    const result = await pool.query(text, params);
    return result.rows as T[];
  } catch (error) {
    console.error("[site] requête impossible :", error);
    return [];
  }
}

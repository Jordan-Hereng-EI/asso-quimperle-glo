import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { Pool } from "pg";

declare global {
  // Le hot-reload de Next réévalue les modules : sans ce cache global on
  // ouvrirait un nouveau pool à chaque rechargement en développement.
  var __qgAdminPool: Pool | undefined;
}

export function getPool(): Pool {
  if (!global.__qgAdminPool) {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
      throw new Error("DATABASE_URL doit être définie.");
    }
    global.__qgAdminPool = new Pool({
      connectionString,
      max: 5,
      idleTimeoutMillis: 30_000,
      connectionTimeoutMillis: 5_000,
    });
  }
  return global.__qgAdminPool;
}

export async function query<T extends object>(text: string, params: unknown[] = []): Promise<T[]> {
  const result = await getPool().query(text, params);
  return result.rows as T[];
}

export async function queryOne<T extends object>(
  text: string,
  params: unknown[] = [],
): Promise<T | null> {
  const rows = await query<T>(text, params);
  return rows[0] ?? null;
}

/**
 * Applique les fichiers de migrations/ non encore joués, dans l'ordre
 * alphabétique, chacun dans une transaction. Appelée au démarrage du serveur
 * (instrumentation.ts) : le schéma et le contenu initial sont créés tout
 * seuls au premier déploiement, sans commande manuelle sur le VPS.
 */
export async function migrate(): Promise<void> {
  const pool = getPool();
  await pool.query(`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      name       TEXT PRIMARY KEY,
      applied_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `);

  const dir = path.join(process.cwd(), "migrations");
  const files = (await readdir(dir)).filter((f) => f.endsWith(".sql")).sort();

  for (const file of files) {
    const { rows } = await pool.query("SELECT 1 FROM schema_migrations WHERE name = $1", [file]);
    if (rows.length > 0) continue;

    const sql = await readFile(path.join(dir, file), "utf8");
    const client = await pool.connect();
    try {
      await client.query("BEGIN");
      await client.query(sql);
      await client.query("INSERT INTO schema_migrations (name) VALUES ($1)", [file]);
      await client.query("COMMIT");
      console.log(`[admin] migration appliquée : ${file}`);
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  }
}

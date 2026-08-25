import { scrypt, timingSafeEqual } from "node:crypto";

/**
 * Vérifie un couple e-mail / mot de passe contre les identifiants configurés
 * en variables d'environnement :
 *
 *   ADMIN_EMAIL          e-mail autorisé
 *   ADMIN_PASSWORD_HASH  "selHex:hashHex" produit par `npm run hash-password`
 *
 * Il n'y a pas encore de table utilisateurs en base — un seul compte suffit
 * pour l'instant, et il vit dans l'environnement (secrets GitHub → .env VPS).
 */
export async function verifyCredentials(email: string, password: string): Promise<boolean> {
  const expectedEmail = process.env.ADMIN_EMAIL;
  const storedHash = process.env.ADMIN_PASSWORD_HASH;
  if (!expectedEmail || !storedHash) {
    throw new Error("ADMIN_EMAIL et ADMIN_PASSWORD_HASH doivent être définies.");
  }

  const [saltHex, hashHex] = storedHash.split(":");
  if (!saltHex || !hashHex) {
    throw new Error('ADMIN_PASSWORD_HASH doit être au format "sel:hash" (npm run hash-password).');
  }

  const expected = Buffer.from(hashHex, "hex");
  const actual = await new Promise<Buffer>((resolve, reject) => {
    scrypt(password, Buffer.from(saltHex, "hex"), expected.length, (err, derived) =>
      err ? reject(err) : resolve(derived),
    );
  });

  // Comparaisons en temps constant, et on évalue toujours le hash même si
  // l'e-mail ne correspond pas, pour ne pas révéler lequel des deux est faux.
  const emailOk =
    email.length === expectedEmail.length &&
    timingSafeEqual(Buffer.from(email), Buffer.from(expectedEmail));
  const passwordOk = actual.length === expected.length && timingSafeEqual(actual, expected);
  return emailOk && passwordOk;
}

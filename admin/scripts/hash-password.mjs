#!/usr/bin/env node
/**
 * Génère la valeur ADMIN_PASSWORD_HASH attendue par l'admin.
 *
 *   npm run hash-password -- "MonMotDePasse"
 *
 * Sortie : "selHex:hashHex" à copier dans le secret GitHub ADMIN_PASSWORD_HASH.
 */
import { randomBytes, scryptSync } from "node:crypto";

const password = process.argv[2];
if (!password) {
  console.error('Usage : npm run hash-password -- "MonMotDePasse"');
  process.exit(1);
}

const salt = randomBytes(16);
const hash = scryptSync(password, salt, 64);
console.log(`${salt.toString("hex")}:${hash.toString("hex")}`);

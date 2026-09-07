#!/usr/bin/env node
/**
 * `npm run dev` : lance `next dev` sur le port 3001 par défaut (le site
 * occupe 3000), ou sur PORT si la variable est définie — ce qui permet aux
 * outils qui attribuent un port libre de fonctionner. Multiplateforme.
 */
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

const nextBin = fileURLToPath(new URL("../node_modules/next/dist/bin/next", import.meta.url));
const port = process.env.PORT ?? "3001";

const child = spawn(process.execPath, [nextBin, "dev", "-p", port], { stdio: "inherit" });
child.on("exit", (code) => process.exit(code ?? 0));

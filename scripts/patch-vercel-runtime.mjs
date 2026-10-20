/**
 * Vercel removed the Node 18/20 serverless runtimes, but @astrojs/vercel 7.x
 * (the last line compatible with Astro 4) still writes "nodejs18.x" into the
 * generated .vc-config.json files. Rewrite them to the current LTS runtime
 * after `astro build`. Remove this script when Astro and the adapter are
 * upgraded to a version that emits a supported runtime itself.
 */
import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const functionsDir = ".vercel/output/functions";
const runtime = "nodejs22.x";

async function patch(dir) {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return 0;
  }
  let patched = 0;
  for (const entry of entries) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      patched += await patch(path);
      continue;
    }
    if (entry.name !== ".vc-config.json") continue;
    const source = await readFile(path, "utf8");
    if (!source.includes('"runtime"')) continue;
    const next = source.replace(/"runtime"\s*:\s*"[^"]+"/u, `"runtime": "${runtime}"`);
    if (next === source) continue;
    await writeFile(path, next);
    patched += 1;
  }
  return patched;
}

const patched = await patch(functionsDir);
if (patched === 0) {
  console.warn(`[patch-vercel-runtime] no function configs found in ${functionsDir}`);
} else {
  console.log(`[patch-vercel-runtime] ${patched} function config(s) set to ${runtime}`);
}

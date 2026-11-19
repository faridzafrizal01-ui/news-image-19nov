// news-image-19nov — "The World Today: Thursday 19 November 2026"
// Copies the pre-rendered front-page image (entry.png, a JPEG kept under
// the .png name) into the output directory for the make.fun harness.
// The image is a JPEG under the .png name by design: the bounty harness
// expects entry.png, and a quality-88 JPEG keeps the 1024x1024 front page
// well under the size limit while staying crisp.
import { copyFileSync, existsSync, mkdirSync, statSync } from "node:fs";
import { join } from "node:path";

const MAX_BYTES = 1024 * 1024; // 1 MiB — the bounty image size limit

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "./out";
const src = new URL("./entry.png", import.meta.url);

if (!existsSync(src)) {
  throw new Error("entry.png is missing from the repo root");
}

const size = statSync(src).size;
if (size > MAX_BYTES) {
  throw new Error(`entry.png is ${size} bytes, over the 1 MiB limit`);
}

mkdirSync(outDir, { recursive: true });
copyFileSync(src, join(outDir, "entry.png"));
console.log(`entry.png (${size} bytes) -> ${join(outDir, "entry.png")}`);

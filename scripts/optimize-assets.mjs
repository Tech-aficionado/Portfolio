// One-off asset optimisation pass.
// Project cards are rendered at most 640px wide (see Projects.tsx `sizes`),
// so 1440px source is already generous for 2x displays.
import sharp from "sharp";
import { readFile, writeFile, stat } from "node:fs/promises";
import path from "node:path";

const ASSETS = path.join(process.cwd(), "public", "assets");

const jobs = [
  { from: "ziplink.png", to: "ziplink.webp", width: 1440 },
  { from: "ghostrelay.png", to: "ghostrelay.webp", width: 1440 },
  { from: "image 3.png", to: "fittrack.webp", width: 1440 },
  { from: "image 2.png", to: "quizify.webp", width: 1440 },
  { from: "darestake.png", to: "darestake.webp", width: 1440 },
];

const kb = (n) => (n / 1024).toFixed(1);
let before = 0;
let after = 0;

for (const job of jobs) {
  const src = path.join(ASSETS, job.from);
  const dest = path.join(ASSETS, job.to);

  const input = await readFile(src);
  const meta = await sharp(input).metadata();

  const output = await sharp(input)
    .resize({ width: Math.min(job.width, meta.width), withoutEnlargement: true })
    .webp({ quality: 82, effort: 6 })
    .toBuffer();

  await writeFile(dest, output);

  const srcSize = (await stat(src)).size;
  before += srcSize;
  after += output.length;

  const pct = (100 - (output.length / srcSize) * 100).toFixed(0);
  console.log(
    `${job.from.padEnd(18)} ${meta.width}x${meta.height}  ${kb(srcSize).padStart(7)}kb  ->  ${job.to.padEnd(16)} ${kb(output.length).padStart(7)}kb  (-${pct}%)`
  );
}

// The hero portrait is a JPEG and small, but WebP still helps on mobile.
const portraitSrc = path.join(process.cwd(), "public", "Self-Image.jpeg");
const portraitBuf = await readFile(portraitSrc);
const portraitMeta = await sharp(portraitBuf).metadata();
const portraitOut = await sharp(portraitBuf)
  .resize({ width: Math.min(1000, portraitMeta.width), withoutEnlargement: true })
  .webp({ quality: 84, effort: 6 })
  .toBuffer();
await writeFile(path.join(process.cwd(), "public", "self-image.webp"), portraitOut);
const portraitSize = (await stat(portraitSrc)).size;
before += portraitSize;
after += portraitOut.length;
console.log(
  `Self-Image.jpeg    ${portraitMeta.width}x${portraitMeta.height}  ${kb(portraitSize).padStart(7)}kb  ->  self-image.webp  ${kb(portraitOut.length).padStart(7)}kb`
);

console.log(
  `\nTOTAL  ${kb(before)}kb -> ${kb(after)}kb  (saved ${kb(before - after)}kb, -${(100 - (after / before) * 100).toFixed(0)}%)`
);

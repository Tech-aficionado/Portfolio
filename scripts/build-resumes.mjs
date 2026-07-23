// Build résumé PDFs from resumes/*.tex into public/resumes/.
// LaTeX can't run on the deploy target, so run this locally (or in CI) and
// commit the PDFs. Tries tectonic, then latexmk, then pdflatex.
// Usage: npm run resumes

import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readdirSync, copyFileSync, rmSync } from "node:fs";
import { dirname, join, resolve, basename } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SRC_DIR = join(ROOT, "resumes");
const OUT_DIR = join(ROOT, "public", "resumes");
const TMP_DIR = join(ROOT, ".resumes-build");

function has(cmd) {
  const probe = process.platform === "win32" ? "where" : "which";
  return spawnSync(probe, [cmd], { stdio: "ignore" }).status === 0;
}

function pickEngine() {
  if (has("tectonic")) return "tectonic";
  if (has("latexmk")) return "latexmk";
  if (has("pdflatex")) return "pdflatex";
  return null;
}

function compile(engine, texFile) {
  const name = basename(texFile, ".tex");
  if (engine === "tectonic") {
    // tectonic drops just the .pdf in the outdir
    return spawnSync("tectonic", [texFile, "--outdir", OUT_DIR], {
      stdio: "inherit",
    });
  }
  if (engine === "latexmk") {
    const result = spawnSync(
      "latexmk",
      ["-pdf", "-interaction=nonstopmode", `-outdir=${TMP_DIR}`, texFile],
      { stdio: "inherit" }
    );
    if (result.status === 0) copyFileSync(join(TMP_DIR, `${name}.pdf`), join(OUT_DIR, `${name}.pdf`));
    return result;
  }
  // two passes so refs/layout settle
  let result;
  for (let pass = 0; pass < 2; pass += 1) {
    result = spawnSync(
      "pdflatex",
      ["-interaction=nonstopmode", `-output-directory=${TMP_DIR}`, texFile],
      { stdio: "inherit" }
    );
    if (result.status !== 0) break;
  }
  if (result.status === 0) copyFileSync(join(TMP_DIR, `${name}.pdf`), join(OUT_DIR, `${name}.pdf`));
  return result;
}

function main() {
  if (!existsSync(SRC_DIR)) {
    console.error(`No résumé sources found. Create a "resumes" folder with .tex files.`);
    process.exit(1);
  }

  const texFiles = readdirSync(SRC_DIR).filter((file) => file.endsWith(".tex"));
  if (texFiles.length === 0) {
    console.error(`No .tex files found in ${SRC_DIR}.`);
    process.exit(1);
  }

  const engine = pickEngine();
  if (!engine) {
    console.error(
      [
        "No LaTeX engine found (tried: tectonic, latexmk, pdflatex).",
        "Install one to compile résumés:",
        "  • Tectonic (recommended): https://tectonic-typesetting.github.io/en-US/install.html",
        "  • Or a TeX distribution (TeX Live / MiKTeX) that provides latexmk/pdflatex.",
      ].join("\n")
    );
    process.exit(1);
  }

  mkdirSync(OUT_DIR, { recursive: true });
  mkdirSync(TMP_DIR, { recursive: true });
  console.log(`Compiling ${texFiles.length} résumé(s) with ${engine}...`);

  let failures = 0;
  for (const file of texFiles) {
    const texPath = join(SRC_DIR, file);
    console.log(`\n→ ${file}`);
    const result = compile(engine, texPath);
    if (result.status !== 0) {
      failures += 1;
      console.error(`✗ Failed to compile ${file}`);
    } else {
      console.log(`✓ ${basename(file, ".tex")}.pdf`);
    }
  }

  rmSync(TMP_DIR, { recursive: true, force: true });

  if (failures > 0) {
    console.error(`\n${failures} résumé(s) failed to compile.`);
    process.exit(1);
  }
  console.log(`\nDone. PDFs written to public/resumes/.`);
}

main();

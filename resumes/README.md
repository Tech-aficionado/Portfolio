# Résumé sources (LaTeX)

Put the role-tailored LaTeX résumés here. Use these **exact** base names so the
generated PDFs match the paths referenced by the site
(`app/portfolio-data.ts` → `ROLES[].resumeUrl`):

| Role                 | Source file                         |
| -------------------- | ----------------------------------- |
| Full Stack Developer | `resume_ShivanshGoel_FullStack.tex` |
| AI Product Engineer  | `resume_ShivanshGoel_AI_ML.tex`     |

### Why only two

There is one body of work behind these résumés: a 17-month internship and four
shipped products. Splitting it across more tracks than this produces variants
that are visibly the same evidence relabeled, which reads as keyword targeting.
Keep it at two.

`archive/` holds the retired Backend and Frontend variants. Files in
`archive/` are **not** compiled — the build script only reads `.tex` at the top
level of this folder. To bring one back, move it up a level, add it to `ROLES`,
and run `npm run resumes`.

## Compile

```bash
npm run resumes
```

This compiles every `*.tex` here into `public/resumes/<same-name>.pdf`, which the
site serves and previews. Requires a LaTeX engine locally — Tectonic is
recommended (single binary, auto-fetches packages):
https://tectonic-typesetting.github.io/en-US/install.html

Falls back to `latexmk` or `pdflatex` if Tectonic is not installed.

## Automation

`.github/workflows/resumes.yml` recompiles and commits the PDFs automatically
whenever a `.tex` file here changes on the default branch, so the published
résumés stay in sync with the sources.

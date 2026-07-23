# Résumé sources (LaTeX)

Put the role-tailored LaTeX résumés here. Use these **exact** base names so the
generated PDFs match the paths referenced by the site
(`app/portfolio-data.ts` → `ROLES[].resumeUrl`):

| Role                 | Source file                          |
| -------------------- | ------------------------------------ |
| AI / ML Engineer     | `resume_ShivanshGoel_AI_ML.tex`      |
| Full Stack Developer | `resume_ShivanshGoel_FullStack.tex`  |
| Backend Developer    | `resume_ShivanshGoel_Backend.tex`    |
| Frontend Developer   | `resume_ShivanshGoel_Frontend.tex`   |

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

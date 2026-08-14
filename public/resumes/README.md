# Résumés (generated)

**Do not edit PDFs here by hand.** They are compiled from LaTeX sources in
`/resumes/*.tex` by `npm run resumes` (and by the `Build résumés` GitHub Action)
and committed so the deployed site can serve them.

Expected generated files (referenced in `app/portfolio-data.ts`):

- `resume_ShivanshGoel_FullStack.pdf` — also the canonical `PROFILE.resumeUrl`
- `resume_ShivanshGoel_AI_ML.pdf`

The Backend and Frontend variants were retired; their sources sit unused in
`/resumes/archive/`.

Served at `https://0xshiv.dev/resumes/<file>` and surfaced by the Role
Explorer (preview + download), `/api/profile`, and `/llms.txt`.

To regenerate: add/edit the LaTeX in `/resumes/`, then run `npm run resumes`.

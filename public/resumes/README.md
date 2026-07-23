# Résumés (generated)

**Do not edit PDFs here by hand.** They are compiled from LaTeX sources in
`/resumes/*.tex` by `npm run resumes` (and by the `Build résumés` GitHub Action)
and committed so the deployed site can serve them.

Expected generated files (referenced in `app/portfolio-data.ts`):

- `resume_ShivanshGoel_AI_ML.pdf`
- `resume_ShivanshGoel_FullStack.pdf`
- `resume_ShivanshGoel_Backend.pdf`
- `resume_ShivanshGoel_Frontend.pdf`

Served at `https://ash-labs.tech/resumes/<file>` and surfaced by the Role
Explorer (preview + download), `/api/profile`, and `/llms.txt`.

To regenerate: add/edit the LaTeX in `/resumes/`, then run `npm run resumes`.

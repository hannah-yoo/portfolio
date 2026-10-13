# A personal portfolio website of Hannah Yoo
I'm a freelance graphic designer and visual artist.

# ./tailwind-plus folder:

The tailwind-plus folder contained Tailwind components and themes used as inspiration; it has been removed because the app does not depend on it.

## Airtable content

Keep portfolio content in the existing `Artworks_eng` table. Use `fine-arts` for fine art, `design` for design work, and `broadcasts` for broadcast appearances. The sync accepts `Title`, `Subtitle`, `Year`, `Description`, `Role`, `Team`, `Timeline`, `Hero Image`, `Images`, and `Category`; add optional comma-separated `Tags` to filter design work and an optional `URL` field for broadcast links.

Keep CV entries in the `cv_eng` table, with one record per CV entry:

| Airtable field | Purpose |
| --- | --- |
| `Order` | Optional numeric display order; defaults to Airtable record order |
| `Year` | Date range or year shown with the entry |
| `Title` | Role, activity, degree, or entry title |
| `Organization` | Company, school, client, or institution |
| `Description` | Optional entry details |
| `Intro` | Optional profile introduction; set on one record |
| `Postscript` | Optional paragraph shown after the profile introduction; set on one record |

The intro and postscript are **not fetched live by the browser**. `npm run sync` reads those fields and CV entries from `cv_eng` and writes `src/data/airtable-cv.json`; the site displays that build-time snapshot. Add a `Postscript` field to `cv_eng` and fill it on one record to edit the paragraph. Set the server-only `PORTFOLIO_TOKEN` in `.env` or the deployment secret, run `npm run sync`, then rebuild and deploy to publish changes. Do not use a `VITE_` prefix for this token.

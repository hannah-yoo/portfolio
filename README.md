# A personal portfolio website of Hannah Yoo
I'm a freelance graphic designer and visual artist.

# ./tailwind-plus folder:

The tailwind-plus folder contains tailwind components and themes to be used as inspiration for the project. I SHOULDN'T REMOVE THE FOLDER UNLESS SPECIFICALLY TOLD TO DO SO

## Airtable content

Keep portfolio content in the existing `Artworks_eng` table. Use `fine-arts` for fine art, `design` for design work, and `broadcasts` for broadcast appearances. The sync accepts `Title`, `Subtitle`, `Year`, `Description`, `Role`, `Team`, `Timeline`, `Hero Image`, `Images`, and `Category`; use an optional `URL` field for broadcast links.

Keep CV entries in `cv_eng`. The sync accepts `Intro`, `Order`, `Year`, `Title`, `Organization`, and `Description`. Set the server-only `PORTFOLIO_TOKEN` in `.env` or the deployment secret, then run `npm run sync` to refresh the local Airtable snapshot before deploying. Do not use a `VITE_` prefix for this token.

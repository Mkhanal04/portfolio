# Pilot Suite

Source for [milankhanal.com](https://milankhanal.com) — Milan Khanal's portfolio and applied-AI work.

## What's Here

- **Portfolio** (`index.html`, `content/`) — React 18 SPA. Positioning, timeline, and pointers to the prototypes below.
- **NewsLens** (`newslens/`) — One story, side by side, across the newsrooms that covered it, with every claim traced back to the sentence it came from. No bias labels, no accuracy verdicts. Research prototype for HCAI 4304 at Texas Tech. [Live](https://milankhanal.com/newslens/) and [documented](./newslens/README.md).
- **TradePilot** (`tradepilot/`) — Decision intelligence for supply chain. Six views, five AI agents, guided tour.
- **TalentPilot** (`talentpilot/`) — Decision intelligence for recruiting. Seven views, four AI agents, guided tour.
- **Writing** (`writing/`) — Long-form pieces on AI delivery and the cost of running AI in production.
- **API** (`api/`) — Vercel serverless functions. Gemini calls stay server-side; the browser never sees the key.

## Stack

- React 18 via Babel Standalone (runtime JSX, no bundler)
- Vanilla HTML/CSS/JS for the prototypes
- Vercel serverless functions for AI-backed endpoints
- No build step. No `node_modules` at the root. CDN-only dependencies.

## Deployment

Push to `main` deploys to [milankhanal.com](https://milankhanal.com) via Vercel. Feature branches get preview URLs automatically.

## License

MIT. See [LICENSE](./LICENSE).

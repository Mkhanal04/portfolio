# NewsLens

One story, side by side, across the newsrooms that covered it. Every claim traced
back to the sentence it came from.

No bias labels. No accuracy verdicts. No AI-generated explanations. The site counts
what a panel of newsrooms did with the same facts and leaves the judgment to the
reader.

A research prototype built for HCAI 4304 at Texas Tech University.

## Run it

It is a static site with no build step and no dependencies.

```bash
# open directly
open public/index.html

# or serve it
python3 -m http.server 8000 --directory public
```

The pages make zero external requests and work offline from a `file://` double-click.

## Deploy

NewsLens ships inside the `Mkhanal04/pilot-suite` repo as a top-level `newslens/` folder,
serving at **milankhanal.com/newslens/** alongside `/tradepilot/` and `/talentpilot/`.
pilot-suite is a flat static site where the repo root is the web root, so the folder
becomes the path. No separate Vercel project, no build step, no DNS work.

The contents of `public/` here are the drop-in: copy them to `pilot-suite/newslens/`.

## Layout

| Path | What it is |
|---|---|
| `public/index.html` | Story index, panel rationale, and an explicit list of what is not built |
| `public/stories/` | One self-contained HTML file per story |
| `public/data/corpus/*.json` | Verified corpus. **The source of truth.** HTML is generated from this, and it ships publicly on purpose: a tool about provenance publishes its own. |
| `docs/BUILD-FLAGS.md` | Open defects and unresolved ambiguities |
| `docs/specs/` | Build specs |
| `scripts/verify.js` | Data-integrity and functional harness |

## Verify before pushing

```bash
node scripts/verify.js
```

Checks that every corroboration count matches its dot pattern, its corpus entry,
and the number of provenance sentences displayed; that every corpus sentence appears
verbatim on the page; that the reading-mode toggle never reveals third-party outlet
ratings; and that the contest form binds to the selected claim.

## The corpus

`public/data/corpus/jobs-report-2026-06.json` holds 10 claims across 6 outlets, 43 sentences,
each copied verbatim from the live article on the capture date. It also records the
panel rationale, each outlet's article type, and which articles were edited after
publication.

Three of the six were. Fox Business changed its headline the same morning while
leaving the page title unchanged. CNBC carries a published correction. That is why
every sentence on the site carries a capture date.

## Constraints worth knowing

Read `CLAUDE.md` before changing anything. The short version:

- Never invent a quote, URL, byline or date. A missing fact is recorded as missing.
- Edit the corpus JSON, not the HTML.
- The outlet panel is chosen per story. Nothing may assume a fixed panel of six.
- Some links are broken on purpose, because the capstone paper reports them as broken.

## Not built yet

- Five of the six stories have no extracted claim set.
- Methods page, model card, and independence statement are referenced but unwritten.
- Reader flags do not persist or transmit anywhere.
- Readers cannot add or remove an outlet from a panel, which is the most significant
  missing feature, since panel composition determines every count on the page.
- No user study has been run.

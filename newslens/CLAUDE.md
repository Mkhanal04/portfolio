# Instructions for Claude Code working in this repo

Read this before changing anything. These are hard rules, not preferences.

## What this is

NewsLens is a coverage-comparison prototype. It takes one news story, shows how a
panel of newsrooms covered it, breaks each article into factual claims, and links
every claim back to the exact sentence it came from. It issues no bias labels, no
accuracy verdicts, and no AI-generated explanations.

It is a static site. No build step, no framework, no dependencies at runtime.

## Rule 1: never invent evidence

This is the one that matters. The entire product argument is that a reader can
check the work.

- **Every sentence shown to a reader must be copied verbatim from the real
  article.** Not paraphrased, not summarised, not reconstructed from memory.
- **Never write a plausible-sounding quote to fill a gap.** If a fact is not in an
  article, the correct value is "not mentioned". A gap is a finding, not a failure.
- **Never invent a URL, byline, date, or headline.** Fetch it or leave it out.
- If you cannot retrieve a source, say so and stop. Do not substitute a different
  outlet and do not quote from a search-engine summary.

Quotes keep their original punctuation, including em dashes. The no-em-dash rule
in Milan's writing does **not** apply to quoted source material. Editing a quote to
satisfy a style rule corrupts the evidence.

## Rule 2: `data/corpus/*.json` is the single source of truth

The HTML is generated from the corpus, not hand-edited.

- Change a claim, count, sentence or outlet **in the JSON first**, then regenerate.
- Never hand-edit a claim row, a dot pattern, or a corroboration count in the HTML.
  They will drift from the data and the verifier will catch it.
- `scripts/verify.js` checks that every count matches its dots, its corpus entry,
  and the number of provenance sentences shown. Run it after any change.

## Rule 3: the outlet panel is chosen per story

Panel composition is the most consequential editorial judgment this tool makes,
and it is not made by the AI.

- Panels differ by story. A jobs report draws business desks. A sports story draws
  sports desks. Do not build anything that assumes a fixed global panel.
- Do not hard-code the number six anywhere in product-level copy or logic. Six is
  the panel size of one story, not a property of the product.
- Corroboration counts are always relative to that story's panel. Copy must never
  imply they represent the press as a whole.
- Every story page states who is in its panel and why.

## Rule 4: claim counts are not a quality score

An outlet that did not carry a claim is not being accused of anything. A three
minute radio transcript carries fewer claims than a 900 word business report
because it is a different assignment. Always show the article type next to any
omission count.

## Rule 5: things that are deliberately broken

Some links in the story page point at `href="#"` on purpose: Methods, Model card,
How it works, Independence, Accessibility, and the outlet panel link inside the
glass box.

The submitted capstone paper reports, in present tense, that these are broken, and
names it as the most damaging gap found in a self-audit. **Do not silently fix
them.** If Milan asks for the Methods page to be built, that is a deliberate
decision to supersede the paper's finding, and the change should be called out.

## Layout

```
public/                 web root, exactly what Vercel serves
  index.html            story index, panel rationale, what is not built
  stories/*.html        one file per story
data/corpus/*.json      verified corpus, one file per story. Source of truth.
docs/
  BUILD-FLAGS.md        open defects. Log ambiguities here, do not resolve silently.
  BUILD-LOG.md          what happened in each build session
  specs/                build specs
scripts/
  verify.js             functional + data-integrity harness. Run before every push.
```

## Before you push

1. `node scripts/verify.js` and confirm it passes.
2. Confirm zero external requests: the page must work offline from a `file://`
   double-click. No CDN links, no web fonts, no analytics.
3. Confirm no PDF, .docx, or draft has crept into the tree. `.gitignore` blocks
   them but check anyway.

## What lives outside this repo, and stays outside

`../Capstone/` holds the research archive: paywalled journal PDFs, book chapters,
report drafts, and the submitted paper. **None of it may be copied into this
repo.** Publishing those PDFs would be redistributing paywalled material.

# Build spec v1

Executable spec for Code mode. Reconciles the product intent from Milan's NotebookLM
session with what already exists in this repo and with the verified corpus.

**Read `CLAUDE.md` first. Read Section 0 of `HANDOFF-TO-CODE.md` first.** This spec
does not override either.

---

## 0. The single most important instruction

**This is an EXTEND job, not a rebuild.** A working prototype already exists and passes
a 16-check integrity harness. Roughly 80 percent of what is specified below is already
built. Do not start from a blank file. Do not introduce React, Next.js, Vue, Tailwind, a
bundler, or any runtime dependency. The site is static HTML, CSS and vanilla JS, it makes
zero external requests, and it must stay that way.

Before you touch anything: `node scripts/verify.js`. It must print 16/16.
After every change: run it again. It must still print 16/16.

---

## 1. Numbers that are already settled. Do not change them.

An earlier draft of the requirements carried stale numbers from before the corpus was
verified. These are the correct ones. `data/corpus/jobs-report-2026-06.json` is the
source of truth and overrides any prose anywhere.

| Thing | Correct value | Stale value to ignore |
|---|---|---|
| Claims in the jobs-report story | **10** | 14 |
| Outlets in this story's panel | **6** | 3 |
| Verbatim source sentences | **43** | n/a |
| Outlets named on the page | Fox Business, ABC News, CAP, CNN, CNBC, NPR | Fox, ABC, CAP only |

**If a requirement asks for 14 claims, building it means inventing four.** That breaks the
first rule in `CLAUDE.md`. Build 10. Same for outlets: CNN, CNBC and NPR are verified and
carry real quotes. Do not drop them.

---

## 2. What to build

### 2.1 Homepage: category navigation

**Status: partially built.** `public/index.html` exists with six story cards.

Add a category nav bar so it reads as a real aggregator. Categories should be derived
from the stories that exist, not invented: **Economy, Disaster, Policy, Health,
Technology, Sport**. Only Economy has a published story. The rest are placeholders.

Non-negotiable: placeholder story cards must remain **non-clickable** and keep their
"Not built yet" label and their real reason for existing. Do not create fake story pages
with invented content to make the grid feel fuller.

### 2.2 Dynamic source counts

**Status: not built. This is the biggest real change in this spec.**

The claim table currently assumes a fixed six-dot row. It must instead render **N dots
where N is the number of outlets in that story's panel**, read from the corpus. Panels
differ per story: a jobs report draws business desks, a sport story draws sport desks.

- Read the panel from `corpus.outlets`. Never hardcode a count anywhere.
- Render one dot per outlet in panel order, with the existing full / half / empty states.
- The corroboration label is `"{full count}/{panel size}"`, computed, never typed.
- Keep the accessible name on every dot: `"{Outlet}: reported it"` and so on.
- Keep the dot-order legend above the claim list, generated from the panel.
- A panel of two must look deliberate, not broken. A panel of eight must not overflow.
- No fixed-width columns. Use `flex-basis: 0; flex-grow: 1` so the row fills the viewport
  cleanly whatever N is.

Do not cap the implementation at six. Six is this story's panel size, not a product limit.

### 2.3 Reading mode toggle: make it sticky

**Status: built but poorly placed.** The persona walkthrough logged this as finding F12:
the toggle sits near the footer, so a reader scrolls the whole page before discovering
that a second mode exists.

Fix: make it a sticky control. Keep the existing `setMode()` behaviour exactly as is.

Behaviour that must not change:
- Staged is the default. Provenance panels closed, explanation panel closed.
- Expanded opens all provenance panels and the explanation panel.
- **Expanded must never open the third-party outlet rating panels.** This is the
  central finding of Milan's submitted capstone paper. A bias label next to an omission
  count reads as a verdict. `verify.js` tests for this. Do not regress it.

Also worth fixing while you are in there:

- **Preserve position across a mode switch.** Track the claim the reader is currently on
  and re-centre on it after the toggle fires, and cache and restore scroll offset inside
  the claim container. A reader must not lose their place.
- Drop the `aria-label="Reading modes, for the study"` wording, which exposes research
  framing to screen reader users.
- Persisting the mode choice across reloads is optional and low priority. If added, it
  must degrade silently when storage is unavailable.

**What Staged and Expanded are NOT.** They control **disclosure depth**, meaning whether
provenance and explanation panels are open. They are not a layout control and they do not
change how many outlets are visible. Every outlet in the panel is visible in both modes.
An external requirements draft redefined these as pagination versus grid; that is wrong
and would destroy the finding the capstone paper is built on.

### 2.4 Contest form binding

**Status: already fixed and covered by the harness.** The form resolves its target from
the dropdown selection at submit time, not from the button that opened it. Leave it alone.
Do not "fix" it again.

### 2.5 Reading level and tone

Plain language, roughly a 10th grade reading level, neutral typography, generous
whitespace, no partisan colour. The current palette is already neutral teal and slate,
and its contrast passes WCAG AA. Do not introduce a new palette.

Quoted source sentences are exempt from every style rule. They are evidence. Never
simplify, shorten, or re-punctuate a quote, including its em dashes.

---

## 3. The one open decision. Do not resolve it yourself.

**The methodology links inside the explanation panel currently point at `href="#"`.**

The product argument for fixing them is obvious: dead links look unfinished, and the
guidance Milan received says to make them work.

The reason they are still dead: **Milan's submitted capstone paper reports them as broken,
in present tense, and names it as the most damaging gap found in his self-audit.** Building
them makes the submitted paper describe an artifact that no longer exists.

**Default: leave them exactly as they are.** They are already disclosed on the homepage
under "What is not built."

If Milan explicitly says to build them, build a Methods page and model card, and add a
dated line on the site noting they were unreachable at the time of the capstone audit and
were built afterwards. That keeps both the paper and the product honest. Do not make this
call on your own.

---

## 4. Deployment

**NewsLens ships inside the `pilot-suite` repo, not as its own Vercel project.**

It lives at `pilot-suite/newslens/` and serves at **`milankhanal.com/newslens/`**, exactly
like `/tradepilot/` and `/talentpilot/`. pilot-suite is a flat static site whose repo root
is the web root, so a top-level folder becomes a path. Milan confirmed NewsLens must live
on that domain rather than a subdomain.

There is no separate Vercel project and no DNS work. `milankhanal.com` already points at
pilot-suite. Nothing about the domain changes.

The standalone `Mkhanal04/newslens` GitHub repo was created before this was known and is
redundant. Do not push to it.

The local `newslens/vercel.json` and `package.json` are artifacts of that earlier plan and
are **not** copied into pilot-suite, which has its own at root.

---

## 5. Out of scope

Recorded so they do not creep in:

- Any framework, bundler, CSS library, linter, or CI workflow
- Accounts, personalisation, recommendations, engagement metrics
- Any ranking, scoring, or rating of outlets
- Real-time ingestion. The corpus is precomputed on purpose.
- Extracting a new story. Corpus work is done by the research agent, not Code.
- Editing `data/corpus/*.json`. Read it, never write it, in this phase.

---

## 6. Definition of done

1. `node scripts/verify.js` prints 16/16.
2. The claim table renders correctly for a panel of 2, 4, 6 and 8 outlets. Test by
   temporarily trimming a copy of the corpus, not the real one.
3. No hardcoded outlet count survives anywhere in the code or copy.
4. The site opens from a `file://` double-click with zero console errors and zero
   network requests.
5. It is usable at 375px wide. The story page has never been checked on mobile.
6. Nothing in `git status` is a PDF, a .docx, or a draft.

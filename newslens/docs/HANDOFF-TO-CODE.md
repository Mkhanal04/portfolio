# Handoff to Code mode

Everything Code needs to ship NewsLens without asking Milan a single question.
Milan is not a developer. Do not ask him to run terminal commands, read error output, or
debug git. Do it, verify it, and report the outcome in plain language.

---

## 0. SCOPE OF THIS SESSION: ship it. Do not build features.

This session has exactly two jobs:

1. Move NewsLens into the `pilot-suite` repo so it serves at `milankhanal.com/newslens/`
2. Add a NewsLens card to the pilot-suite homepage, then commit and push

**Neither job writes new product code.** Job 1 copies files. Job 2 adds one card that
matches the two already there.

Do **not**, in this session:

- add, remove or restyle any NewsLens feature
- refactor, reformat, or "tidy" any existing file
- build the Methods page, the model card, or any page referenced but unbuilt
- fix any link that points at `href="#"` (section 5, this is deliberate)
- edit `data/corpus/*.json` or extract a new story
- change claim counts, outlet panels, or any copy
- add a framework, bundler, linter, or CI workflow
- touch `talentpilot/`, `tradepilot/`, or anything else in pilot-suite

If you spot something you think is a bug, **write it into `newslens/docs/BUILD-FLAGS.md`
and leave it alone.** Flag, do not fix.

When both jobs are done, stop and report the live URL. Feature work is specified in
`docs/BUILD-SPEC-v1.md` and belongs to a later session.

---

## 1. Where this is going, and why

NewsLens must live at **`milankhanal.com/newslens/`**, alongside
`milankhanal.com/tradepilot/` and `milankhanal.com/talentpilot/`.

`Mkhanal04/pilot-suite` is a **flat static site**: repo root is the web root, `index.html`
sits at root, and each product is a top-level sibling folder. Languages are 93% HTML. Our
site is static HTML with zero runtime dependencies, so it drops straight in.

**Target:**

```
pilot-suite/
├── index.html            portfolio home. Add a NewsLens card here.
├── talentpilot/          → milankhanal.com/talentpilot/
├── tradepilot/           → milankhanal.com/tradepilot/
└── newslens/             ← NEW. → milankhanal.com/newslens/
```

**A standalone `Mkhanal04/newslens` repo exists and is empty. It was created before this
requirement was known and is now redundant.** Do not push to it. Milan can delete it.

---

## 2. Folder Code must be opened against

Milan should open Code against the **workspace root**, because this job needs both the
NewsLens source and a place to put the pilot-suite clone:

```
/Users/milankhanal/Desktop/ClaudeProject_ReStart_June_2026/Claude_ReStart_June_2026
```

Inside it, the two folders that matter:

- `HCAI-4304/newslens/` — the NewsLens source (this is where these docs live)
- `Pilot-Suite/` — where the pilot-suite clone goes, if one is not already on the machine

**Everything else in that workspace is off limits.** `HCAI-4304/Capstone/` holds paywalled
research PDFs and Milan's submitted paper. Never copy any of it into a repo, and never
commit a `.pdf` or `.docx`.

The NewsLens source folder:

```
.../Claude_ReStart_June_2026/HCAI-4304/newslens
```

Contents:

```
newslens/
├── public/                             ← EVERYTHING IN HERE SHIPS
│   ├── index.html                      NewsLens home
│   ├── stories/jobs-report-2026-06.html
│   └── data/corpus/jobs-report-2026-06.json   verified corpus, source of truth
├── docs/                               specs, build flags, PRD notes
│   ├── BUILD-SPEC-v1.md                feature work for a LATER session
│   ├── BUILD-FLAGS.md                  open defects. Log here, do not fix.
│   ├── PRD.md                          record of two rejected NotebookLM PRDs
│   └── specs/
├── scripts/verify.js                   16-check integrity harness
├── CLAUDE.md                           THE RULES. Read before changing anything.
└── README.md
```

`public/` is a complete, self-contained drop-in. Relative links inside it already resolve
correctly, so moving it does not break anything.

---

## 3. Job 1: move NewsLens into pilot-suite

### 3a. Find or create the pilot-suite clone

Milan does not know whether a `pilot-suite` clone exists on this Mac. Handle both cases
yourself. Do not ask him.

```bash
WS="/Users/milankhanal/Desktop/ClaudeProject_ReStart_June_2026/Claude_ReStart_June_2026"

# look for an existing clone inside the workspace
find "$WS" -maxdepth 4 -type d -name ".git" 2>/dev/null
```

**If a pilot-suite clone is found**, use it. Run `git pull` first, and check
`git status` is clean before touching anything. If it has uncommitted changes, stop and
report rather than committing someone else's work-in-progress.

**If no clone is found**, create one. This is safe: the GitHub repo's last commit and last
deployment are both about three months old, so nothing local is unpushed.

```bash
cd "$WS/Pilot-Suite"
git clone https://github.com/Mkhanal04/pilot-suite.git
cd pilot-suite
```

That gives you `.../Claude_ReStart_June_2026/Pilot-Suite/pilot-suite/`. The two markdown
files already sitting in `Pilot-Suite/` are Milan's design notes. Leave them alone.

### 3b. Copy NewsLens in

```bash
SRC="/Users/milankhanal/Desktop/ClaudeProject_ReStart_June_2026/Claude_ReStart_June_2026/HCAI-4304/newslens"
# from inside the pilot-suite clone:

mkdir -p newslens
cp -R "$SRC/public/." newslens/          # the site: index.html, stories/, data/
cp -R "$SRC/docs"      newslens/docs
cp -R "$SRC/scripts"   newslens/scripts
cp    "$SRC/CLAUDE.md" newslens/CLAUDE.md
cp    "$SRC/README.md" newslens/README.md
```

**Do not copy** `package.json`, `package-lock.json`, `vercel.json`, `.gitignore` or
`node_modules` from the source folder. pilot-suite already has its own at root, and a
nested `package.json` can confuse Vercel's build detection.

The verifier needs `jsdom`. Add it to **pilot-suite's root** `package.json` under
`devDependencies` as `"jsdom": "^24.0.0"`, run `npm install`, then check:

```bash
node newslens/scripts/verify.js     # must print 16/16
```

Node resolves `node_modules` upward, so the harness finds jsdom at the repo root. If it
does not, report it and stop rather than rewriting the harness.

## 4. Job 2: add the card and ship

Open `pilot-suite/index.html`. Find the **"BUCKET 2 · PROTOTYPE LAB / Applied AI & HCAI"**
section containing the TradePilot and TalentPilot cards.

**Add a third card in that section, reusing the existing markup, classes and design
tokens exactly.** Milan has confirmed reusing the same colouring and values. Do not
restyle the page, do not alter the other two cards, do not introduce new CSS.

Fill the existing card slots as follows:

| Slot | TradePilot | TalentPilot | **NewsLens** |
|---|---|---|---|
| Monogram | `TR` blue | `TA` amber | **`NL`**, teal `#0f766e` to match the product |
| Label | LIVE PROTOTYPE | LIVE PROTOTYPE | **LIVE PROTOTYPE** |
| Domain | SUPPLY CHAIN | RECRUITING | **JOURNALISM** |
| Pills | Product · ● Live | Product · ● Live | **Product · ● Live** |
| Title | TradePilot | TalentPilot | **NewsLens** |
| Feature tags | Decision Queue · Glass Box · 10-80-10 Workflow | Decision Queue · Glass Box · Bias Monitoring | **Glass Box · Staged Disclosure · 10-80-10 Workflow** |
| Date | Jan 2026 | Feb 2026 | **Jul 2026** |
| Left metric | 5 agents | 4 agents | **6 newsrooms · 10 claims** |

One-line description:

> One story, side by side, across the newsrooms that covered it. Every claim traced back
> to the sentence it came from. No bias labels, no verdicts.

**Three things to get right, because the template invites mistakes:**

1. **Do NOT add a validation quote box.** TradePilot has a "VALIDATED BY TEXAS TECH HCAI
   FACULTY" panel quoting Dr. Melanie Schmitt. NewsLens has no faculty quote. The capstone
   has not been graded. Inventing or borrowing one would be fabrication of exactly the kind
   this project exists to argue against. Omit the block entirely, as TalentPilot does.

2. **The left metric is not "agents".** NewsLens has no agent architecture. Use
   "6 newsrooms · 10 claims", which are both verifiable from the corpus.

3. **`View details →` only if a detail page exists.** TradePilot and TalentPilot each link
   to one. NewsLens has none. Ship **only** the `Try it →` link, pointing at `/newslens/`.
   Do not create a stub detail page.

Then:

```bash
git add newslens pilot-suite-index-if-changed package.json package-lock.json
git status                      # confirm no node_modules, no PDFs, no .docx
git commit -m "feat(newslens): add NewsLens coverage-comparison prototype

Static prototype comparing how six newsrooms covered the June 2026 BLS jobs
report. 10 claims, 43 sentences, each copied verbatim from the live article and
linked to its source. Corpus JSON ships alongside the pages as the source of
truth. Includes a 16-check integrity harness.

Serves at /newslens/. Adds a card to the portfolio home."

git push
```

Vercel auto-deploys pilot-suite. Confirm **`https://milankhanal.com/newslens/`** loads,
that the story page opens from it, and that the card on the homepage works. Report the
URL to Milan.

**Do not configure any domain or DNS.** `milankhanal.com` already points at pilot-suite,
which is exactly why this approach works. Nothing about the domain changes.

---

## 5. Rules you must not break

Full detail in `newslens/CLAUDE.md`. The three that matter most:

**Never invent evidence.** Every reader-facing sentence is copied verbatim from a real
article. If a fact is not in an article, the value is "not mentioned". A gap is a finding.
Never write a plausible-sounding quote to fill one. Never invent a URL, byline, headline,
or date.

**Edit the corpus JSON, never the generated HTML.** Claim rows, dot patterns and
corroboration counts derive from the corpus. Hand-editing HTML makes them drift and
`verify.js` will fail.

**Some links are broken on purpose.** Methods, Model card, How it works, Independence,
Accessibility and the outlet-panel link all point at `href="#"`. Milan's submitted capstone
paper reports these as broken in present tense and names it as the most damaging gap found
in his self-audit. **Do not helpfully fix them.** Doing so makes the submitted paper
describe an artifact that no longer exists.

Quotes keep their original punctuation, including em dashes. The no-em-dash rule applies
to Milan's own writing, not to quoted source material.

---

## 6. Where the work comes from

Milan runs three agents and does not want to repeat himself:

- **NotebookLM** drafts product thinking. Two PRDs it generated were rejected for
  hallucinated content; see `docs/PRD.md` for the record and the root cause.
- **Cowork** handles research, corpus verification, structure and specs. It wrote this file.
- **Code (you)** executes: file moves, git, deploys, and features from the build spec.

---

## 7. Known open items

- Milan has still never opened the site in a browser. The live URL settles that.
- Five of the six stories have no corpus and show as "Not built yet" on the index.
- Reader flags render a chip but do not persist or transmit.
- Readers cannot change the outlet panel, which is the most significant unbuilt feature,
  since panel composition determines every count on every page.
- The story page has never been checked below tablet width.

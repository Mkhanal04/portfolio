# BUILD SPEC 02: Home page + Methods page

_Written Jul 19, 2026 (Fable), per Capstone-Execution-Plan.md Section 9. Executor: cheaper-model session. Run only AFTER SPEC-01 passes acceptance (the story page's palette, type scale, and components are the base for both pages). Same rules: ambiguity → STOP → `BUILD-FLAGS.md`._

## 1. Scope

**Create:**
- `Build/site/index.html` (home)
- `Build/site/methods.html` (methods page; doubles as the Tier 2 home)
Both self-contained (inline CSS/JS, zero external requests, renders from double-click). Copy the CSS foundation from `story-jobs-report.html` for visual consistency; self-contained beats DRY.

**Modify:** `story-jobs-report.html` ONLY to add nav links (Home / Methods) to its header/footer. Nothing else in it.

**DO-NOT-TOUCH:** identical list to SPEC-01 Section 1.

## 2. Design authority

v3 comp + wireframes define the design language (palette, type, spacing, component styles). The home and methods pages have no dedicated comp: build them from the wireframes' structure and v3's visual language, using ONLY components that already exist on the story page (cards, section headers, chips, panels). No new visual inventions. Layout ambiguity → flag, pick nothing.

## 3. Content authority

Every sentence on both pages comes from Section 5 below, verbatim, or from the v3 comp (story-card headline text). You write NO copy. Empty content slot without spec'd text = flag.

## 4. Build items

### 4.1 Home page
1. Masthead: "NewsLens" + tagline, exact copy: "One story. Six outlets. You be the judge."
2. One active story card (jobs report): three-headline strip (verbatim from v3 hero), story label verbatim from v3, link to the story page.
3. Honest pipeline state - NO fake story cards. One quiet section, exact copy: "Five more stories are in the pipeline. Each one is decomposed, human-reviewed, and published only when every claim links to its source sentence."
4. Footer: links to Methods; one line, exact copy: "NewsLens is a research prototype built for an HCAI capstone. It compares coverage; it does not rate outlets or verify truth."

### 4.2 Methods page (Tier 2 home)
Sections in order, headers and body copy exact:

1. **"What NewsLens does"** - "NewsLens takes one news story, reads how six outlets covered it, breaks the coverage into individual claims, and shows you who reported what, in their exact words. It adds no verdicts. You judge."
2. **"What NewsLens does not do"** - "No truth ratings. No outlet bias scores. No red team, blue team. No engagement feeds. If a claim looks contested, we show you it's contested and let you read the sources."
3. **"How a story gets here"** - four numbered steps, exact copy: "1. We pick a story with meaningful coverage differences and capture each outlet's article on a stated date. 2. AI decomposes each article into factual claims. 3. A human reviews every extraction against a published checklist - fidelity fixes only: the reviewer may fix a wrong split or a wrong match, never add, remove, or reword a claim by preference. 4. Claims that say the same thing are grouped, counted, and linked to their exact source sentences."
4. **"The model card"** - reproduce the story page's glass-box performance/limitations copy (verbatim from SPEC-01 4.7, including the honest review-log and filtered-out lines and the model-version placeholder). Add the reviewer-error taxonomy line, exact copy: "The review checklist checks each claim for four failure types documented in the fact-checking literature: missing context, ambiguity, over-splitting, and altered meaning."
5. **"The corpus datasheet"** - table skeleton with rows: Story; Outlets (six, listed verbatim from v3); Capture dates (per-outlet; placeholder from SPEC-01 registry if absent); How outlets were chosen - exact copy: "Six national outlets spanning the mainstream range, chosen before decomposition began. Counts like 'reported by 6 of 6' always mean these six, not the press as a whole."; What's excluded - exact copy: "Paywalled updates after capture, broadcast-only segments, and sentences that failed extraction (recorded prospectively from story 2)."
6. **"Story selection"** - exact copy: "Stories are currently selected by a single reviewer, which is itself an editorial act. We disclose it rather than hide it. The production design calls for balanced review pods and a published self-audit of what gets covered."
7. **"Contest a claim"** - exact copy: "Every claim can be flagged from the story page. Flags must point at a specific sentence and say what's wrong. A human reviews every flag before anything changes publicly; flagged claims wear a visible 'contested' mark while under review."
8. **"Accessibility statement"** - exact copy: "NewsLens targets WCAG 2.1 AA: full keyboard operation, visible focus, AA contrast, no color-only meaning, plain language. Found a barrier? Flag it through the contest flow - accessibility reports are reviewed the same way."
9. **"About this prototype"** - exact copy: "NewsLens is a research prototype built as an HCAI capstone (Texas Tech University, 2026). The build was AI-assisted and human-directed; the report accompanying it discloses the full division of labor."

### 4.3 Accessibility
Same AA bar as SPEC-01 4.8, both pages.

## 5. Acceptance criteria

1. Both pages render from double-click, offline, zero console errors, zero network requests.
2. Nav works in all directions (home ↔ story ↔ methods) as relative file links.
3. Home shows exactly ONE story card; no placeholder/fake story cards; pipeline copy present verbatim.
4. Methods page contains all nine sections in order; body copy diff-matches Section 4.2 verbatim.
5. No number, date, or name appears that is not in v3, SPEC-01's registry, or this spec.
6. Contrast + keyboard walk pass as in SPEC-01.
7. `grep -i "3 changes"` across `Build/site/` returns nothing.

## 6. Flag-don't-decide + end-of-session routine

Identical to SPEC-01 Sections 7-8. Next session after this one: Fable review batch (Fable spot-checks acceptance criteria + resolves flags), then stories 2-6 spec.

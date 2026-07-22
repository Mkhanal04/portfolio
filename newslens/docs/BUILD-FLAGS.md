# BUILD-FLAGS

_Cheaper-model sessions log ambiguities here and do NOT resolve them. Format: `[SPEC][date] - item - what's ambiguous - what you did instead`. Fable resolves at review; resolutions get recorded above the flag they resolve._

## RESOLUTIONS [Opus, 2026-07-19, Session 11] of P0 flags 1-4

All four P0 defects are fixed in `newslens/public/stories/jobs-report-2026-06.html`. Verified by a Node/jsdom harness that executes the real page JS (`verify-p0.js`, 19 of 20 checks pass; the one non-pass is an informational em-dash check described below, not a defect). A pre-fix backup sits at `story-jobs-report.html.bak`.

- **Flag 1 (false provenance claim) FIXED by correcting the copy, not by faking links.** Act 2's note now reads: "A ✓ means the claim appears in that outlet's article. In the full claim list below, each claim opens to the sentence it came from. Agreement here is counted, not judged." Both sentences are true of the build as it stands: the claim rows in Act 5 do open to a quoted source sentence. Implementing per-tick deep links was rejected because two of the three named agreement claims have no entry in the claim table yet, so the links would have been the same false promise in a different form.
- **Flag 2 (expanded mode revealed AllSides labels) FIXED.** `.ctx` panels are now excluded from `setMode` entirely, with an in-code comment stating why. Third-party outlet ratings open only when a reader clicks them. Regression-checked: expanded mode still opens all claim provenance panels, the paired-quote details, and the glass box, and a reader can still open a ratings panel by hand.
- **Flag 3 (count disagreed with provenance) FIXED conservatively, in the direction that asserts less.** "Prior two months revised down by 74,000" showed 2/6 with two full dots but named one outlet. Rather than invent a second outlet's agreement, the display was aligned down to the evidence actually on file: 1/6, one full dot, one provenance entry (ABC News), matched in the `CLAIMS` matrix. The mid-range corroboration case is still demonstrated in Act 3, where the guided example has real evidence behind it. The data pass may restore a higher count once a second source sentence is verified.
- **Flag 4 (contest modal marked the wrong claim) FIXED.** `contestTarget` now resolves from the dropdown selection at submit time via a shared `resolveClaimEl()` helper. The modal header also follows the dropdown, so the claim named at the top always matches the claim being contested. Harness test: open the modal from claim A's flag button, switch the dropdown to claim B, submit, and exactly one claim is marked contested, and it is B. On the dropdown exposing 4 of 14 claims, a disclosure line was added under it stating that the demo carries source sentences for 4 of the 14 and the rest arrive with the corpus data pass.

**New flag raised by the fix pass, NOT resolved (design copy, not a defect):** the page contains 17 em dashes, all inherited from the v3 comp as typographic separators (title, pill labels, "same 57,000", step headers). Milan's no-em-dash rule governs his prose, and the report itself has zero. Whether the rule extends to frozen design copy that will appear inside the report's figures is a call for Milan, not the builder. Flagged, not changed, because Section 2 forbids altering v3 copy without authorization.

## Session 14b (Opus, 2026-07-21) — added Figure 1 Sections 2 and 3 (Agreements + Splits)

_A second NotebookLM pass confirmed the omissions work but correctly flagged that Figure 1's Sections 2 ("What did everyone agree on?") and 3 ("Where did they split?") were still missing. Milan chose to build them rather than explain the drift in the email._

Added to the story template + vals, in Figure 1 order (agree → split → omissions → claims):

- **Section 2 "What did everyone agree on?"** — lists the claims every outlet carried (`by.length === total`), each with a "6 of 6" badge. For the jobs story that's c1, c2, c3. Derived, not hard-coded.
- **Section 3 "Where did they split?"** — features one cleanly-split claim as a dot-notation teaching key. Selection prefers a claim with no partial states so filled/empty reads unambiguously; for the jobs story that resolves to c6 (Labor force participation, 3 of 6: Fox/CNN/CNBC reported, ABC/CAP/NPR did not). Shows the pips + a filled/empty legend.

The live story page now matches Figure 1's full seven-section structure. render-check 15/15; verified render + counts + mobile at 375. NotebookLM's suggested "consolidated to reduce cognitive overload" email line was NOT used — it claimed an intent that wasn't reasoned through; building the sections made it moot.

## Session 14 (Opus, 2026-07-21) — reconciled the mock with the submitted paper (real corpus + omissions section)

_Prompted by a NotebookLM review that (correctly) flagged the mock diverged from the submitted paper's Figure 1. Verified every claim against the paper text, its Figure 1 image, and the verified corpus before acting._

**What changed, hand-edited directly in `index.html` (no Claude Design round-trip, at Milan's request):**

1. **Jobs/Economy story swapped to the verified 10-claim corpus.** Replaced the 7 illustrative sample claims (Reuters/AP/WSJ, 147,000 jobs) with the 10 real claims from `HCAI-4304/newslens/public/data/corpus/jobs-report-2026-06.json`: real outlets (Fox Business, ABC News, CAP, CNN, CNBC, NPR), real corroboration counts (6/6/6/4/4/3/4/3/1/1), and verbatim per-outlet source sentences. Verified: all 38 full-state sentences are byte-identical to the corpus.
2. **Added the "Who left what out?" omissions section** (the paper's Findings centerpiece). Per-outlet omission counts derived from the claim data (ABC 6, Fox 3, CAP/CNN/CNBC/NPR 2 of 10), each shown with article type (paper Rule 4). Includes the inline note that third-party AllSides bias ratings were placed here in an earlier version and removed after the persona walkthrough.
3. **Added an About-page disclosure line** framing the live build as a post-July-19-paper iteration under the research-through-design method.
4. Corrected the jobs story's self-description (it had called its own data "illustrative sample data," now inaccurate since it's the verified corpus).

**Modeling decision (documented for defensibility):** `by` = full-state outlets only (matches the corpus corroboration counts exactly). `partial` = partial-state outlets (used only to exclude them from omission counts). Omission = neither full nor partial = corpus state "none." Partial-state sentences are not shown in sources, so count = sources = `by` stay aligned.

**Rejected:** NotebookLM's earlier suggestion to "generate 7 fabricated claim rows to hit 14." Violates Rule 1 and the paper's own ethics. Not done.

**Known accepted drifts from the paper (pre-existing, not introduced here):**
- Paper Figure 1 says "14 claims"; the verified corpus has 10; the mock now shows 10 (closest honest number). The paper is on Canvas and unchangeable.
- Paper prose singles out the labor-force claim (c4) as reported by "only two of the six" outlets; the corpus records it at 4/6, so the mock shows 4/6. Covered by the About disclosure.

**Divergence flag:** `index.html` is now hand-maintained and ahead of the Claude Design source. See CLAUDE.md "SOURCE OF TRUTH" — do not blind-re-sync.

## Session 13 (Opus, 2026-07-21) — replaced corpus-driven build with the finalized design mock

_Requested by Milan: professor needs to click through the prototype from milankhanal.com/newslens/ before evaluation. Design was approved and finalized in claude.ai/design; only pending was hosting._

**What changed on disk.** The Session 11-12 corpus-driven story page was replaced with the finalized Claude Design Composer artifact. Deleted: `stories/jobs-report-2026-06.html`, `data/corpus/jobs-report-2026-06.json`, `scripts/verify.cjs`. Added: `index.html` (NewsLens.dc.html re-synced from claude.ai/design with React 18 + ReactDOM 18 CDN scripts injected before support.js), `support.js` (dc-runtime, ships verbatim), `scripts/render-check.cjs` (static smoke test, 10 checks). Kept unchanged: `docs/` (history), `README.md`, portfolio card on pilot-suite homepage.

**The Rule 1 shift, made deliberately and disclosed here.** The Session 11-12 build was a real corpus-verified prototype. The Session 13 build is an illustrative design mock. Milan confirmed on 2026-07-21: real outlet excerpts (Fox Business, ABC News, Center for American Progress on the June 2026 BLS jobs report) are genuine quotes; the corroboration counts, matching structure, and extraction pipeline are pre-computed for UX demo. The mock states this explicitly in three places (footer disclaimer "illustrative sample data · not a live extraction", Model Card limitations panel, and the About-page copy). CLAUDE.md Rule 1 was rewritten to "don't quietly make it look like a live extraction" to reflect the new honesty contract. All three disclaimers must stay visible.

**Rule 2 no longer applies.** There is no `data/corpus/*.json`. Story data lives inline in `index.html`'s `data-dc-script` block, authored in claude.ai/design. To change what the mock shows: edit in Design Composer, re-sync via `DesignSync.get_file`, re-inject the two React CDN script tags, write to `newslens/index.html`. Hand-editing the inline data-dc-script is out of scope.

**verify.cjs is gone; render-check.cjs is a shipping check, not a rendering check.** The 16 Session-11 checks bound to specific DOM structure (`.claim[data-claimtext]`, `#glassDetails`, `window.setMode`) that no longer exists. Its replacement, `render-check.cjs`, is 10 static checks confirming the shipped bundle has: React CDN scripts, `<x-dc>` template, `<script src="./support.js">`, `data-dc-script` block, and the "illustrative sample data" disclaimer. Actually running the design end-to-end requires a real browser. Every push must include a manual browser spot-check (documented in CLAUDE.md "Before you push").

**Broken links, still on purpose.** The design has a Glass Box panel with Methods / Corroboration matching / Human review checklist links that do not go anywhere. Clicking them surfaces an inline warning ("These method pages are not published yet, so the links do not go anywhere. This is a known gap in the current build, not a broken feature we are hiding.") — this is part of the design's honesty layer and must not be "fixed" by wiring the links to real pages.

**External dependencies (new).** React 18 and ReactDOM 18 load from cdnjs.cloudflare.com. Google Fonts loads Source Serif 4, IBM Plex Sans, and IBM Plex Mono. The old Session 11-12 build worked offline from a `file://` double-click; the Session 13 build does not, because it needs the CDN scripts. This is the Design Composer's requirement, not a choice.

## Plumbing notes — Session 12 (Opus, 2026-07-20, pilot-suite integration)

_Not defects in NewsLens. Facts about pilot-suite that shaped how NewsLens was dropped in. Flagged so a future session doesn't re-litigate them or "fix" them silently. All numbered items were left alone._

**Verify.js layout / module fixes (mechanical, made this session, not defects):**

- `scripts/verify.js` → renamed to `scripts/verify.cjs`. Pilot-suite root `package.json` sets `"type": "module"`, which makes `.js` files ESM by default, breaking verify's CommonJS `require`s. `.cjs` opts back into CJS without adding a nested `newslens/package.json` (handoff Section 3b forbids the nested one: it confuses Vercel build detection).
- Two path constants in verify updated: `public/stories/…` → `stories/…` and `public/data/corpus/…` → `data/corpus/…`. In the source repo the site's web root was `public/`; the pilot-suite move flattens `public/*` up one level (handoff Section 3b: `cp -R "$SRC/public/." newslens/`), so the harness had to follow. Zero behavioural change beyond that.
- Post-fix run: `node newslens/scripts/verify.cjs` prints 16/16. Same 16 checks as before, same corpus, same story.

**Handoff-vs-pilot-suite mismatches (informational, not fixed here):**

11. **Handoff calls pilot-suite a "flat static site"; it is a client-rendered React SPA.** `index.html` loads React 18 + Babel-standalone from CDN and fetches `content/work.json` at page load. Cards are rendered by a `WorkCard` React component from that JSON. The handoff's Section 4 language ("open pilot-suite/index.html, find the section, add a third card, reusing the existing markup") was written from a mental model where markup and data are the same file. In this codebase, the "card" is one object in `content/work.json`, and any shape that JSON can't express requires editing the template. NewsLens needed shape the template didn't have (see #12).

12. **WorkCard template did not accommodate the handoff's NewsLens card spec.** Three surgical edits made in `pilot-suite/index.html` inside the `WorkCard` component, all backwards-compatible for TradePilot and TalentPilot (fields absent → old behaviour):
    - `handleClick`: routing to `/detail/<slug>` now gated on `item.detail` being present. Without this, clicking the NewsLens card body would crash the SPA (`Cannot read properties of undefined (reading 'heroStatement')` in the detail-page renderer, line ~767). TradePilot/TalentPilot both carry `detail` so their behaviour is unchanged.
    - Left-metric renderer: now reads `item.stats?.metricLabel` when present, else falls back to the old `` `${stats?.agents || 0} agents` ``. Handoff wanted "6 newsrooms · 10 claims", template only supported "N agents". "0 agents" would have violated NewsLens Rule 1 (never invent evidence) on the card that introduces the product, which is a self-inflicted own-goal we chose not to ship.
    - View-details link: now hidden when `item.hideDetails === true`. Handoff explicitly said "ship only Try it →". Combined with the detail-object omission, NewsLens ships with a working `Try it →` and no dead-end link.
    - Milan approved template edits over the alternatives (stub detail page; ship "0 agents" and a broken click) in the pre-execution plan question.

13. **Timezone bug in pilot-suite date rendering (pre-existing, not a NewsLens issue).** `content/work.json` stores dates as `YYYY-MM` strings. `new Date("2026-07")` is parsed as UTC midnight July 1; `.toLocaleDateString("en-US", {year:"numeric", month:"short"})` on any client west of UTC then renders it as **June**. Empirically on America/Chicago: TradePilot JSON `"2026-02"` renders "Jan 2026", TalentPilot `"2026-03"` renders "Feb 2026" — the handoff table matches this shifted-back convention, so it's clearly the established pattern for this repo. NewsLens follows the same convention: JSON date is `"2026-08"` so the card displays "Jul 2026" as the handoff specifies. Not fixed here because the fix (parse as local, e.g. append `-01T00:00`) would shift TradePilot/TalentPilot forward one month too, and the handoff bans touching those.

14. **`newslens/CLAUDE.md` Layout section is stale in its new location.** The copied CLAUDE.md still describes `public/` as the web root and `scripts/verify.js`. Both are now inaccurate (`public/` was flattened; verify was renamed to `.cjs`). Left as-is because updating it would be scope creep outside "plumbing only"; a future session that touches NewsLens should refresh the Layout block.

## Open flags

_Raised Jul 19 (Session 10) by the three evaluation audits (Amershi G1-G18, Liao question bank, persona walkthroughs). Artifacts in `../Evaluation/`. These are prototype defects, not spec ambiguities. Items 1-4 must be fixed BEFORE screenshots are captured for the report figures, because each one is visible in a screenshot or contradicts a claim the paper makes._

1. **[P0][HONESTY] The page states a verification affordance that does not exist.** Act 2 copy reads "Every ✓ links to the exact sentence in each article." The ticks are inert `<span>` elements with no links. For a product whose entire argument is provenance, a false provenance claim is the most damaging possible defect. Fix: either implement the links or change the copy to describe what the ticks actually are.

2. **[P0][THESIS-CONTRADICTING] Expanded mode auto-reveals third-party bias ratings.** `setMode('expanded')` opens all `.ctx` panels, which surfaces the AllSides "Lean Right" / "Left" labels that are explicitly marked "off by default" and sit directly under outlet omission counts. The footer and glass-box panel both promise "No bias labels." The paper's central ethical claim is that the tool issues no verdicts and shows no outlet ratings by default. Fix: exclude `.ctx` panels from the expanded-mode toggle.

3. **[P0][DATA-INTEGRITY] Corroboration counts disagree with their own provenance.** "Prior two months revised down by 74,000" displays 2/6 but the provenance panel names only one outlet. Either the count or the evidence is wrong. Fix during the corpus data pass; no screenshot should show a count the evidence cannot support.

4. **[P0][FUNCTIONAL] Contest modal marks the wrong claim.** `contestTarget` binds to the flag button that opened the modal, not to the current value of `claimSelect`. Changing the claim in the dropdown then submitting marks the original claim contested. The dropdown also exposes only 4 of the 14 claims. Fix: bind `contestTarget` to the selected claim at submit time.

5. **[P1] The toggle does not do what its label says.** `setMode` never expands the Act 2 agreement section, so "Everything expanded" is not fully expanded. Since the toggle is the study's manipulation and the paper's central instrument, the condition must match its description. Fix before the toggle is presented as an experimental manipulation.

6. **[P1] Expanded mode reveals placeholder copy.** Because unfinished demo content sits inside collapsed panels, expanded mode currently displays more placeholder text than staged mode. As written, the toggle partly measures build completeness rather than disclosure strategy. Fix with the corpus data pass, or disclose the confound in the report.

7. **[P1] Every escalation link is `href="#"`.** Methods (twice), How it works, Model card, Independence, Accessibility, the outlet panel, the BLS primary-source chip, "see all 6 outlets we compared", all three "see which", and "what this means" all go nowhere. The glass-box panel cites documents the build does not produce, which is what pushed several Liao categories down from Answered to Partially answered. Minimum fix for the capstone: build the Methods page (SPEC-02) or remove references to documents that do not exist.

8. **[P2] Corroboration dots have no attribution or accessible names.** Six unlabeled dots with no legend, no column headers, and no `aria-label`. The walkthrough task "which outlets reported this?" cannot be answered from the page's signature visualization. This is also a WCAG concern beyond the contrast fix already applied.

9. **[P2] Template placeholders render in the production surface.** "Captured: [date pending data pass]" appears three times. Deliberate pending-state disclosure is defensible; an unfilled bracketed variable reads as an unfinished build. Fix the wording even if the dates are not yet known.

10. **[NOTE] Zero guideline violations in the Amershi audit is a self-audit bias signal**, not a positive result. The report must present the audit as a single-auditor designer self-audit and say so plainly.

## Bugs found and fixed during this session's own build/verify pass (not spec ambiguities, logged for visibility)

- The contest modal's evidence-bound flow initially failed for the ACT 3 guided example's "flag an error" link: its container (`.guide`) had no `data-claimtext` attribute the way `.claim` rows did, so `openContestFor()` couldn't resolve a target. Fixed by adding `data-claimtext` to the `.guide` div, matching the `.claim` pattern. Caught via a Node/jsdom functional test that actually clicked through the flow end-to-end, not just visual inspection.
- The glass-box panel's summary text says "Five steps" (verbatim from v3); an early draft of this build added two more numbered steps (6, 7) for the B4/B5 disclosure lines, which would have made the visible step count contradict its own label. Fixed by keeping v3's five numbered steps untouched and moving the B4 (syndication)/B5 (filtered-out) disclosure lines into the existing `.mcgrid` card pattern (the same pattern v3 already uses for "Model card" and "What we never do"), rather than inventing a new numbered-step visual language. This stays inside Section 2's "no improvisation" rule by reusing a component v3 already has, instead of extending v3's step list.

## Known data-pass items (pre-logged by Fable, Jul 19 - not builder errors)

1. **[SPEC-01] Capture dates** - real per-outlet capture dates for the jobs-report corpus not on file; placeholder text specified. Needs: Milan/Fable data pass.
2. **[SPEC-01] Model version** - exact Claude model version used for the design-phase decomposition needs confirmation before the model card states it.
3. **[SPEC-01] Syndication annotation (B4)** - wire-copy overlap audit of the six articles not yet done; `SYNDICATION_ANNOTATIONS` ships empty with honest disclosure line.
4. **[SPEC-01] Review log (B5/B6)** - corrections were not contemporaneously logged in the design-phase pass; honest pending copy specified; reconstruction pass is a Fable+Milan item.
5. **[Eval B4] Expectation-violation claim ID** - to be selected from real corpus data during build QA and recorded in Eval-Instrument.md.

## Resolved

**RESOLUTION [Fable, 2026-07-19] of flag 1 (AC8 contrast):** `--faint` changed from #8b95a5 to **#677284** in `newslens/public/stories/jobs-report-2026-06.html` only (v3 comp untouched, frozen as design artifact). #677284 keeps v3's exact hue and saturation (hue 0.603, sat 0.126) and darkens lightness only until AA passes with margin: 4.86:1 on card, 4.70:1 on bg, 4.74:1 on the provenance-panel bg. Full palette re-check after the fix: all text pairs now >= 4.5:1. Rationale for not deferring: the MVP locked WCAG AA as the bar and the report's ethical-design section will claim it; shipping a known 2.9:1 failure would be indefensible to Shin. v4 design pass should adopt #677284 (or darker) as the canonical quiet-text value. Milan can veto on visual review; the change is one CSS variable.

1. **[SPEC-01][2026-07-19] AC8 contrast failure, inherited from v3 palette** - `--faint` (#8b95a5) on `--bg` (#fafbfc) measures ~2.92:1 and on `--card` (#ffffff) ~3.03:1. This fails WCAG AA even at the relaxed large-text threshold (3:1) because every use of `--faint` in v3 is small text (.66rem-.92rem, all well under the 18.66px/14pt-bold large-text cutoff), so the normal-text 4.5:1 bar applies and it fails that by a wide margin. `--faint` is used pervasively: hero kicker, outlet labels, q-sub subheads, capture-date lines, footer, tier bar, "flag an error"/"flag this extraction" links, framing-lens tags. This is v3's own palette choice (Section 2 says reproduce v3's palette exactly, no improvisation), so the builder did not alter any color value. Recorded as an AC8 FAIL in BUILD-LOG rather than silently darkening the color.

**RESOLUTION [Fable, 2026-07-19] of flag 2 (AC1/AC2 verification method):** Accepted the jsdom + static-analysis evidence as sufficient for the build gate; the sandbox constraint is real and the harness executed the actual page JS end to end. Chrome-extension check attempted from this session but the extension was not connected. Remaining action, NON-BLOCKING, assigned to Milan: double-click `newslens/public/stories/jobs-report-2026-06.html`, confirm it renders, click the toggle and one flag flow (~30 seconds). Must happen before any Vercel deploy or showing the page to anyone.

2. **[SPEC-01][2026-07-19] AC1/AC2 verification method** - this sandbox has no working headless browser (Playwright's chromium-headless-shell downloaded but lacks system libs, and `sudo` is blocked, so `playwright install-deps` can't run; the MCP Playwright browser also blocks `file://` protocol navigation and can't reach a local HTTP server in this bash sandbox either). AC1 (double-click render) and AC2 (zero console errors/network requests via DevTools) were verified instead via: (a) static analysis confirming zero external resource references anywhere in the file, (b) a Node/jsdom harness that parses and executes the actual page HTML+JS, confirming the DOM builds correctly and zero script errors occur (after polyfilling `IntersectionObserver`, which jsdom doesn't implement but real browsers do). This is strong evidence but not identical to an actual double-click-in-Chrome test.

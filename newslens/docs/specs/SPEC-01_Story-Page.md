# BUILD SPEC 01: Story Page (jobs report) - v3 implementation + ratified B items + punch list

_Written Jul 19, 2026 (Fable), per Capstone-Execution-Plan.md Section 9. Executor: cheaper-model session (Sonnet/Opus). This spec is the only authority for this batch. If anything is ambiguous, missing, or seems wrong: STOP, log it in `BUILD-FLAGS.md`, and move to the next item. Do not resolve ambiguities in-session._

## 1. Scope

**Create:**
- `newslens/public/stories/jobs-report-2026-06.html` - the production story page. Self-contained: ALL CSS and JS inline, no external requests of any kind (no CDN, no web fonts, no analytics). Must render fully from a double-click on the file.

**Modify:** nothing else.

**DO-NOT-TOUCH (read-only for you):**
- `../Literature/` (source list, briefs, 02-DESIGN-IMPLICATIONS, everything)
- `../Report/Evidence-Pack.md`, `../Evaluation/Eval-Instrument.md`
- `../Capstone-Execution-Plan.md`, `../Capstone-MVP-and-Flow.md`, `../Capstone-Discovery_Problem-Landscape-Stories.md`, `../Production-Architecture-and-Risks.md`
- `../Design/` (v1, v2, v3 comps - copy FROM them, never edit them)
- `../Wireframes/`
- The coursework handoff, except appending your own session-log entry at end of session

## 2. Design authority

`../Design/Story-Page_Visual-Concept_v3.html` and `../Wireframes/Capstone-Wireframes_v1.html` are the ONLY design sources. Reproduce v3's layout, palette, type scale, and section order except where Section 4 below explicitly amends it. No improvisation, no "improvements," no added features. If v3 and the wireframes conflict, v3 wins; note the conflict in BUILD-FLAGS.

## 3. Content authority

All story content - the 14 claims, their outlet counts, headline texts, outlet names, provenance sentences, framing-lens observations - comes VERBATIM from the v3 comp. You never write, reword, summarize, or paraphrase any claim, headline, or story text. If a content slot in this spec has no verbatim source in v3 (e.g., a provenance URL, a capture date), insert the exact placeholder text given in Section 5 and log a flag. Fabricating a number, date, count, or quote is the one unforgivable failure in this build.

## 4. Build items (in order)

### 4.1 Base page: v3 faithful port
Implement the v3 story page as a clean production file: hero, "What did everyone agree on?", "Where did they split?", "Who left what out?", framing lens ("Same facts. Different words."), claim matrix ("Dig into all 14 claims"), glass-box panel ("How was this comparison made?"), and the contest flow. Keep v3's scrollytelling structure and section IDs.

### 4.2 View toggle (research instrument - must work)
Two modes, switchable from the quiet tier bar (v3's placement; labeled "Reading modes, for the study"):
- **Staged (default):** v3's progressive disclosure exactly.
- **Everything expanded:** all Tier 2 content inline and expanded, all provenance panels open, glass-box panel expanded, framing lens expanded. Same content, no extra content.
Toggle state via a JS class switch; no reload; keyboard operable; state announced via `aria-pressed`.

### 4.3 Punch list: quiet the hero
The oversized "57,000" numeral treatment is REMOVED. The hero leads with the three real headlines side by side plus the "Which one did you read?" line (all verbatim from v3). The 57,000 figure appears once, in body-scale text (max 1.5rem), inside the lede sentence beneath the headline wall, wording verbatim from v3's own context sentence. Do not restyle it as a callout, stat chip, or animation.

### 4.4 Punch list + B3: contest modal (evidence-bound, contextual Tier 2)
Rebuild the contest modal to this exact structure:
1. **Step 1 - point at evidence:** user selects the specific claim (pre-filled if opened from a claim row) and the specific outlet sentence they dispute. No free-floating "this feels wrong" option. No sentiment voting anywhere, ever.
2. **Step 2 - say what's wrong:** radio options, exact copy: "This sentence doesn't support this claim" / "These grouped sentences say different things" / "A claim is missing from this outlet" / "Something else about this specific claim (describe)".
3. **Contextual "how this was made" slice (B3):** inside the modal, above the submit button, a compact panel showing FOR THIS CLAIM: its provenance sentence(s) with outlet names, its corroboration count, and its review status line. Use only data already in the claim matrix. Do NOT invent per-claim extraction rules; if v3 has no per-claim pipeline detail, the panel shows the claim's own data plus one line, exact copy: "Every extraction was human-reviewed against a published checklist before appearing here."
4. **Submit state copy, exact:** "Thanks - flags are reviewed by a human before anything changes publicly. This claim now shows a 'contested' mark while it's reviewed."
5. On submit: the claim row gains a visible "contested" badge (v3's contested styling). State is in-memory only (no backend); a page reload resetting it is fine.
Modal: focus-trapped, Esc closes, returns focus to the opener.

### 4.5 B7 + punch list: snapshot dates + "updated since capture" badge
- Every provenance panel shows a capture-date line. If v3 contains real capture dates, use them verbatim. If not: exact placeholder "Captured: [date pending data pass]" and ONE flag covering all instances.
- Implement the "Article updated since our capture" badge as a styled component rendered on ONE outlet demonstration slot ONLY IF v3 already designates one; otherwise build the component CSS/JS but render zero instances, and flag: "updated-since-capture badge built, no instance data; needs data pass." Display only; no re-evaluation logic.

### 4.6 B4: wire-service / shared-source annotation (data-gated)
Build the annotation UI: a small annotation on claim rows reading (when data exists) "Note: N of these outlets used shared wire copy for this claim." Render it from a single JS constant `SYNDICATION_ANNOTATIONS = []` at the top of the script. The constant ships EMPTY (the syndication audit hasn't been done). With an empty constant, the glass-box panel shows one line, exact copy: "Syndication overlap between outlets has not yet been annotated for this story." Flag it.

### 4.7 B5 + B6: glass-box panel honesty pass (CRITICAL)
The v3 comp contains INVENTED placeholder data that must not survive into the build:
- **Remove "Review log for this story: 3 changes" and the "review log: 3 changes" footer line entirely.** Replace with exact copy: "Review log: pending. Extractions were human-reviewed before publication; corrections were not logged during the first pass. A reconstructed log will be published, and logging is built into every story from here on."
- **Replace "[model + version]" with exact copy:** "Extraction: Claude (Anthropic) - exact model version being confirmed for the model card". Flag it for Fable/Milan confirmation.
- **B6 wording:** the panel must contain NO raw confidence percentages and NO invented accuracy numbers. Its performance section leads with limitations, exact copy: "What this pipeline tends to get wrong: merging claims that say almost the same thing, missing claims phrased as implication rather than statement, and over-splitting compound sentences. Every extraction was human-reviewed; this story's corpus is small, so we publish patterns, not percentages."
- **B5 slot:** add a "What was filtered out" line, exact copy: "Some sentences failed extraction or matching and never reached this page. They were not recorded for this story's first pass; they are recorded for every story after it."

### 4.8 Accessibility (WCAG AA)
Text contrast ≥ 4.5:1 (large text ≥ 3:1); all interactive elements keyboard-reachable in a logical order; visible focus states; the toggle, modal, provenance panels, and matrix operable by keyboard alone; `alt`/`aria-label` on all non-text affordances; no information conveyed by color alone (contested state = badge text + color; corroboration = number + dots).

## 5. Placeholder registry (the ONLY permitted placeholders)

| Slot | Exact text |
|---|---|
| Capture dates (if absent in v3) | "Captured: [date pending data pass]" |
| Model version | "Claude (Anthropic) - exact model version being confirmed for the model card" |
| Review log | (exact copy in 4.7) |
| Syndication | (exact copy in 4.6) |

Any OTHER missing content: stop and flag. Do not invent a fifth placeholder.

## 6. Acceptance criteria (check each; record pass/fail in BUILD-LOG)

1. Page renders fully from double-click (file://), offline, in a clean browser profile.
2. Zero console errors or warnings; zero network requests (verify in devtools Network tab).
3. Toggle switches staged ↔ expanded without reload; keyboard operable; `aria-pressed` updates.
4. Every claim row opens its provenance panel; every panel names outlet + sentence verbatim from v3.
5. Contest flow completes end-to-end: open → select evidence → reason → submit → visible contested badge on that claim.
6. `grep -i "3 changes"` on the built file returns nothing; `grep "\[model + version\]"` returns nothing.
7. All numbers on the page (counts, claims, figures) are diff-checkable against v3's content; no number appears that is not in v3 or in this spec's exact copy.
8. Contrast spot-check of body text, badges, and tier bar passes AA (use a contrast checker on the computed hex pairs; record the pairs checked).
9. Tab order walk: hero → sections → matrix → tier bar → glass-box → contest; Esc closes modal and restores focus.
10. Hero: no numeral rendered above 1.5rem font-size.

## 7. Flag-don't-decide

Ambiguities, conflicts, missing content, or anything this spec doesn't cover go to `BUILD-FLAGS.md` as: `[SPEC-01][date] - item - what's ambiguous - what you did instead (nothing, or the spec'd placeholder)`. Fable resolves flags at review; you never do.

## 8. End-of-session routine (mandatory)

1. Update `BUILD-LOG.md`: date, model, spec executed, acceptance-criteria pass/fail table, files created/modified.
2. Append a session-log entry to `../../00-START-HERE/HCAI-4304_Coursework_Handoff.md` (your entry only; touch nothing else in that file): scope executed, guardrails followed, flags raised.
3. Paste the kickoff prompt for the next session (SPEC-02 if this spec fully passed; otherwise a fix-list session for the failed criteria) into the chat before ending.

# BUILD-LOG

_One entry per build session: date, model, spec executed, acceptance pass/fail table, files created/modified. Newest first._

## 2026-07-19 — Session 9 (Fable) — SPEC-01 review batch: both flags resolved, AC8 fixed

**Files modified:** `newslens/public/stories/jobs-report-2026-06.html` (one CSS variable), `BUILD-FLAGS.md` (both open flags moved to Resolved)

- **AC8 FAIL → PASS.** `--faint` #8b95a5 → **#677284** (same hue/sat as v3, darkened to AA). Post-fix contrast sweep: faint on card 4.86:1, on bg 4.70:1, on provenance panel 4.74:1; all other text pairs unchanged and passing (4.78:1 to 16:1). jsdom functional regression re-run after the edit: clean, no behavior change. v3 comp untouched; #677284 recommended as the canonical quiet-text value for the v4 design pass.
- **Flag 2 closed as accepted-with-condition.** Real-browser check attempted via Chrome extension (not connected). Remaining 30-second Milan action, non-blocking for SPEC-02 but required before deploy/demo: double-click the file, confirm render + toggle + one flag flow.
- **SPEC-01 now 10/10.** Gate cleared; next build session is SPEC-02 per the standard flow.

## 2026-07-19 — Session 8 (Sonnet 5) — SPEC-01 executed

**Spec:** `newslens/docs/specs/SPEC-01_Story-Page.md`
**Files created:** `newslens/public/stories/jobs-report-2026-06.html`
**Files modified:** none (per spec's DO-NOT-TOUCH list)

### Acceptance criteria

| # | Criterion | Result | Notes |
|---|---|---|---|
| 1 | Renders fully from double-click (file://), offline, clean browser profile | **PASS (verified by proxy)** | No working headless browser available in this sandbox (see BUILD-FLAGS open flag 2). Verified instead via Node/jsdom executing the real file: DOM builds fully, all sections present, zero parse errors. Recommend a real-browser spot-check before external use. |
| 2 | Zero console errors/warnings; zero network requests | **PASS** | Static scan confirms zero external URLs, no `<link>`/`<script src>`/`fetch`/`XMLHttpRequest` anywhere in the file. jsdom execution produced zero script errors (after polyfilling `IntersectionObserver`, a jsdom gap, not a page bug — real browsers implement it natively). |
| 3 | Toggle switches staged ↔ expanded without reload; keyboard operable; `aria-pressed` updates | **PASS** | jsdom test: clicking "Everything expanded" flips `aria-pressed` on both buttons, opens all 3 real claim rows + glass-box `<details>` + framing-lens `<details>`; clicking "Staged" reverts all. Buttons are native `<button>` elements (keyboard-operable by default via Enter/Space). |
| 4 | Every claim row opens its provenance panel; every panel names outlet + sentence verbatim from v3 | **PASS** | jsdom test: all 3 real claim rows (button elements) toggle `.open` and reveal `.prov` panels. Outlet names and sentence text diff-checked verbatim against v3 (Fox Business, ABC News, CAP quotes match exactly). |
| 5 | Contest flow completes end-to-end: open → select evidence → reason → submit → visible contested badge | **PASS** | jsdom test ran the full flow twice: once from the ACT 3 guided example, once from an ACT 5 claim row. Both produced a `.contested` badge on submit, modal closed, no duplicate badge on repeat submit. |
| 6 | `grep -i "3 changes"` returns nothing; `grep "[model + version]"` returns nothing | **PASS** | Both greps confirmed empty. |
| 7 | All numbers on the page are diff-checkable against v3 or this spec's exact copy; no invented number | **PASS** | Programmatic number-extraction diff against v3 run twice (before and after fixes). Remaining deltas traced to tag-stripping artifacts (fraction counts like "6/6" split across spans) and confirmed identical to v3's own markup, not new data. |
| 8 | Contrast spot-check of body text, badges, tier bar passes AA | **FAIL** | Computed WCAG contrast ratios for all `:root` color pairs. `--body` and `--ink` pass comfortably (8.6-16:1). `--faint` (#8b95a5), used pervasively at small sizes throughout v3's own palette (hero kicker, outlet labels, capture dates, footer, tier bar, flag links), measures only ~2.9-3.0:1 against both `--bg` and `--card` — fails the 4.5:1 normal-text AA bar by a wide margin, and doesn't qualify for the relaxed 3:1 large-text bar since none of its uses are large text. This is v3's own color choice; Section 2 forbids palette changes without authorization, so it was not altered. Logged as BUILD-FLAGS open flag 1 for a Fable/Milan design call. |
| 9 | Tab order walk: hero → sections → matrix → tier bar → glass-box → contest; Esc closes modal, restores focus | **PASS** | Structural check confirms zero explicit `tabindex` overrides in the DOM (natural order preserved) and document-order position check confirms all major landmarks appear in the exact sequence the spec requires. jsdom test confirms Esc closes the modal and returns focus to the button that opened it. |
| 10 | Hero: no numeral rendered above 1.5rem font-size | **PASS** | The oversized `.hero .big` treatment (previously `clamp(64px,14vw,120px)`) was removed entirely. "57,000" now renders via `.figure` at 1.5rem, inline in the lede sentence, matching spec 4.3 exactly. |

**Overall: 9 of 10 PASS, 1 FAIL (AC8, inherited palette issue, not a builder error).**

### Guardrails followed
- Design source: v3 comp + wireframes only. No layout/section/order improvisation beyond spec 4.1-4.8.
- All claim/headline/outlet/quote content is verbatim from v3; diff-checked programmatically.
- Only the four registered placeholders used (capture dates, model version, review log, syndication). No fifth placeholder invented.
- DO-NOT-TOUCH list respected: nothing modified outside `newslens/public/stories/jobs-report-2026-06.html`.

### Bugs caught and fixed during this session (see BUILD-FLAGS.md for detail)
- Contest modal's evidence-bound flow initially couldn't resolve the ACT 3 guided example as a target (missing `data-claimtext`); fixed.
- Glass-box "Five steps" label would have contradicted an accidental 7-step render; reverted to v3's exact 5 steps, moved new disclosure lines into the existing `.mcgrid` card pattern instead.

### Not done / needs Fable or Milan
- AC8 contrast fix decision (see BUILD-FLAGS open flag 1).
- A true real-browser (not jsdom-proxy) spot-check of AC1/AC2 before external use (see BUILD-FLAGS open flag 2).

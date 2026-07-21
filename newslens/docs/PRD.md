# NewsLens PRD

> **Status: superseded for build purposes by `BUILD-SPEC-v1.md`.**
>
> **Two NotebookLM PRDs have been generated and both were rejected.**
>
> **v1.0 (Jul 20 2026):** specified a dashboard for the "Muse Spark Safety & Preparedness
> Report", a Meta AI model safety evaluation. Deep Navy and Alert Amber palette, GPT-5.4
> vs Claude Opus 4.6 vs Gemini 3.1 Pro benchmark tables. Nothing about news.
>
> **v2 (Jul 20 2026, "corrected"):** adopted the right NUMBERS (10 claims, 6 sources,
> dynamic 2-6, sticky toggle, links broken by design) and applied them to the SAME wrong
> content. Its "Integrated News Outlets (6)" are GPT-5.4, Claude Opus 4.6, Gemini 3.1 Pro,
> DeepSeek-R1, Kimi K2.5 and Llama 4 Maverick, which are language models. Its ten
> "verified claims" are AI safety benchmarks (BioTIER, CyberGym, WMDP-Bio, DeceptionBench,
> Cybench, AgentHarm, SimpleQA, IHEval, Sycophancy, Insecure Code Generation). It also
> redefined Staged vs Expanded as a pagination-versus-grid layout control, which would
> destroy the disclosure-depth thesis the capstone paper is built on.
>
> **Root cause, confirmed by NotebookLM itself.** The notebook holds **144 sources**,
> heavily weighted toward AI safety, DeepSeek, Grok and Meta's Muse Spark. The capstone
> paper IS among them, but it is outvoted. NotebookLM grounds ARTIFACTS in the source
> shelf and grounds CHAT in the conversation. So the chat prompt absorbed every correction
> and came out right, while the artifact generator took the structural numbers we supplied
> and filled the content from the loudest data in the room.
>
> **Adding more sources will NOT fix this.** In a 144-source notebook, one more NewsLens
> document is still outvoted. The fix is a **separate notebook** containing only NewsLens
> material: the submitted capstone PDF (`Khanal_NewsLens_Final_APA`), `README.md`,
> `CLAUDE.md`, `docs/BUILD-SPEC-v1.md`, and `data/corpus/jobs-report-2026-06.json`.
>
> **Acceptance test for any future PRD:** search it for the string "Fox Business". If it
> is absent, the document is not about NewsLens. Both rejected versions failed this in
> under a second.
>
> **Code builds from `BUILD-SPEC-v1.md`. Do not build from a NotebookLM PRD until one
> lands here that names Fox Business, ABC News, CAP, CNN, CNBC and NPR.**

---

> **Status: placeholder.** Milan is drafting this in NotebookLM. Drop it in here when
> ready. This file is the brief Claude Code builds from, so it should be specific
> enough to execute without a conversation.

---

## Constraints any PRD for this repo has to respect

These come from the built prototype and the submitted capstone paper. A requirement
that breaks one of them is a decision to change the product, not a detail, and should
be called out as such.

**1. No fabricated evidence, ever.**
Every sentence shown to a reader is copied verbatim from the real article. If a fact
is absent from an article, the value is "not mentioned". A gap is a finding. Any
feature that would require generating, paraphrasing, or reconstructing a quote is out.

**2. The corpus JSON is the source of truth.**
Pages are generated from `data/corpus/*.json`. Any feature that needs new information
on screen needs a new field in the corpus schema first.

**3. The outlet panel is per story, and its composition is disclosed.**
Nothing may assume a fixed panel or hard-code a panel size. Corroboration counts are
always relative to one story's panel.

**4. Three standing refusals.**
No bias labels. No accuracy verdicts. No AI-generated explanations. These are written
into the model card as out-of-scope uses and are the product's ethical spine.

**5. Claim counts are not quality scores.**
Any surface showing an omission count must show the outlet's article type beside it.

**6. Static, self-contained, offline-capable.**
Zero external requests. The page works from a `file://` double-click. No CDN, no web
fonts, no analytics, no tracking.

---

## Open questions the PRD should answer

Ranked by how much they block building.

1. **Does the reader get to change the panel?** Adding or removing an outlet and
   watching every count move is the single most significant unbuilt feature, because
   panel composition determines every number on the page. It is also the hardest to
   design without turning the tool into a toy. Decide in or out.

2. **What generates a story page?** Right now a Python script patches HTML from the
   corpus. For six stories that does not scale. Options: a real static generator, a
   template engine, or accept hand-generation per story.

3. **How does a new story enter the corpus?** Today it is manual retrieval plus manual
   verification. Define how much of that is automated and where the human review gate
   sits, since the paper commits to human review of every extraction.

4. **Do the Methods page, model card, and independence statement get built?** They are
   referenced from the story page and deliberately unbuilt, because the submitted paper
   reports them as broken. Building them supersedes a published finding, which is fine,
   but it should be a decision rather than a side effect.

5. **Do reader flags persist?** Currently a flag renders a chip and dies on refresh.
   Persisting them means a backend, which breaks the static-site constraint.

6. **What happens on mobile?** The story page has never been checked below tablet width.

---

## Not in scope

Recorded so they do not creep back in.

- Accounts, personalisation, recommendation, engagement metrics.
- Any ranking, scoring, or ordering of outlets.
- Real-time or breaking-news ingestion. The corpus is precomputed on purpose.
- Comment threads or social features.

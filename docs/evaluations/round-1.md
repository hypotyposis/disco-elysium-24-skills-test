## Design Evaluation — Disco Skills Test — Round 1

### Scores

| Criterion | Score | Threshold | Status |
| Criterion | Score | Threshold | Status |
| Design Quality | 3.4/10 | 7.0/10 | FAIL |
| Originality | 2.6/10 | 7.0/10 | FAIL |
| Craft | 4.5/10 | 7.0/10 | FAIL |
| Functionality | 6.7/10 | 7.0/10 | FAIL |

**Weighted Average:** 4.3/10

### AI Slop Found

- “Dark moody premium app” skin pasted over a generic SaaS/dashboard skeleton: centered container, oversized headline, CTA, stat chip, explanatory side cards.
- One universal rounded-card system for almost everything. Landing, quiz, result, thought cabinet, skill groups, and answers all share the same polite rectangle.
- Stock AI aesthetic moves: radial glows, soft grain, blur-smoke, 1px borders, pill buttons, gradient meters, tracked uppercase micro-labels.
- Result page is fundamentally an analytics UI: chips, Top 3 cards, diamond chart, bars, grouped score tables.
- Decorative English labels are used as faux-premium garnish rather than real typographic art direction.
- No page has a singular visual metaphor or memorable silhouette; the whole app reduces to stacked dark panels.

### Detailed Critique

- The core failure is structural, not cosmetic. The app knows Disco Elysium’s nouns and palette, but not its visual logic. It applies “wine + brass + grain + smoke” as a theme overlay on top of a safe product UI. That is exactly why it feels “太丑了没有艺术感”: the mood is only in tokens and copy, not in composition.
- The landing page is a textbook startup hero. Left: headline, summary, CTA. Right: two informational cards. Then a four-column skill ledger. That is a SaaS template wearing a burgundy coat. Disco Elysium should feel like a damaged dossier, hallucinated case board, or self-interrogation chamber. This feels like a polished microsite for a quiz product.
- The landing hero is especially weak because it takes up a huge stage with no focal object. There is no central emblem, no expressive lockup, no symbolic artifact, no visual rupture. Just text blocks in a large dark box. That creates expensive emptiness, not atmosphere.
- The “24 个声音，按 4 大属性分卷” section is functionally clear but aesthetically dead. It reads like documentation or a feature list. It removes intrigue instead of building it.
- The quiz page is competent but bloodless. It is another dark panel with a header, a progress bar, a question block, and equal-sized answer cards. The interface never creates tension, ritual, or the sensation that a voice is intruding on the user. It just asks a question in a nice box.
- The likert answers are a very generic pattern. Equal cards in a two-column grid make a psychological scale feel like card shopping. The scenario answers in three equal columns read like pricing tiers. Both are common AI-generated defaults and completely miss the unstable, inward, accusatory tone the copy is aiming for.
- There is also a functionality/design mismatch: the app stores answers, but when revisiting a question the UI does not visibly mark the previous selection. That makes the interaction feel less authored and less trustworthy than it should.
- The result page is the biggest aesthetic miss. Instead of a dramatic reveal, it turns personality into a dashboard. Hero + chips + Top 3 cards + attribute diamond + bars + grouped meters = analytics report. Disco skills are supposed to feel like voices, compulsions, delusions, grim clarity. Here they become KPI widgets.
- Raw numbers everywhere make this worse. Score badges, bar fills, and repeated meter tracks flatten mood into quantitative display. The app over-explains itself like a report instead of staging a memorable personality encounter.
- The “Thought Cabinet Tendency” block should be one of the strangest, most atmospheric parts of the experience. Instead it is just another card with the same radius, same border, same background, same visual grammar. Nothing bends, leaks, or destabilizes.
- Typography is underpowered. The app uses safe system font stacks and familiar hierarchy rules: giant serif H1, tiny uppercase eyebrow, muted paragraph, pill CTA. This is orderly, but not authored. The Chinese-first typography does not feel designed; it feels defaulted. The English garnish (“Revachol / Internal Affairs of the Self”, “Voices Inventory”, “Case Closed / Internal Monologue”) reads like mood-sticker copy rather than integrated composition.
- The shapes are wrong for the theme. Disco Elysium is chipped, stained, angular, bureaucratic, painterly, psychologically unstable. This UI is rounded, smooth, centered, evenly padded, and polite. The 999px pills are especially damaging; they read fintech/wellness, not detective wreckage.
- The palette is correct in variable names and weak in effect. Yes, there is wine, brass, ash, ink. But they are used as tasteful gradients and accents, not as material. The grain and smoke mostly sit in the background like wallpaper. They do not infect edges, type, separators, or component surfaces. So the page is dark, but not atmospheric.
- Everything shares the same visual temperature because almost everything is driven by the same panel treatment. There is no rhythm between landing, quiz, and result. No escalation. No sense that the result page deserves a different state.
- The strongest part of the project is actually the writing and data tone. The question monologues and result copy are much closer to the brief than the interface is. Right now the words are carrying the mood alone while the UI keeps sabotaging them with generic component-library energy.
- Mobile is likely worse because the responsive rules collapse the already-dashboard-like layout into one long vertical stack of nearly identical cards. That makes the experience monotonous and scroll-heavy rather than intense or theatrical.

### Top 3 Improvements (priority order)

1. Replace the entire “premium dark dashboard” layout system with one strong visual metaphor and rebuild every page from that. Think damaged dossier, interrogation record, stained mural, bureaucratic case file, or haunted inner noticeboard. Do not iterate the current card-and-meter skeleton; it is the wrong skeleton.
2. Redesign typography and composition from scratch. Make it Chinese-first, reduce decorative English garnish, introduce asymmetry, stronger scale contrast, layered metadata, imperfect separators, and at least one unforgettable focal lockup per page. The current hierarchy is clean but anonymous.
3. Stop translating personality into generic chips, pills, radar diamonds, and progress bars. Make answer states, result reveal, attribute grouping, and Thought Cabinet feel like artifacts of the world rather than analytics components. Preserve the copy and scoring logic; rebuild the presentation.

### Recommendation: PIVOT

PIVOT — keep the content, scoring, and overall product structure, but throw away the current visual system. This is not a “tune the colors and shadows” problem. The app is fundamentally shaped like an AI-generated dark SaaS dashboard, which is why it feels unartistic. The next round should start from a new art direction and new page compositions, not a refinement pass on the existing panels.

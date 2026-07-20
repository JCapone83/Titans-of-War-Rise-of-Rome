# Act IX Visual Production Report

## Approved batch

The first stable Act IX visual batch adds one exact approved transparent PNG for each `CIVIL_SETTLEMENT_PROJECTS` entry:

- `caesarianForum` — Forum of Caesar and Temple of Venus Genetrix — `public/images/projects/forum-of-caesar-v1.png` — Evidence-led reconstruction
- `curiaJulia` — `public/images/projects/curia-julia-v1.png` — Evidence-led reconstruction
- `basilicaJulia` — `public/images/projects/basilica-julia-v1.png` — Evidence-led reconstruction
- `veteranLandRoadRegistry` — `public/images/projects/veteran-land-road-registry-v1.png` — Game abstraction

The mapping is maintained in `src/game/projectArt.js`. Each record supplies the approved asset path, concise accessible alt text, and the evidence-status label.

## Design constraints

`CivilSettlementWorksPanel` remains presentation-only. Existing summaries, unlock dates, availability logic, completion text, and Commit crews behavior are preserved. Project art is displayed in an uncropped, transparent, stable 3:2 frame with `object-fit: contain`. Desktop uses a two-column project grid; narrow screens use one column. No nested cards, animation, dependency, or simulation change is introduced.

Construction labels are deterministic: Reserved site, Foundations and service, Structural shell, and Operating form. Three-stage and four-stage projects use explicit boundaries in `civilSettlementProjectStage`; completed projects always report Operating form.

## Provenance and evidence status

The four assets were produced with the built-in OpenAI image-generation tool under project-authored art direction on July 19, 2026. “Evidence-led reconstruction” identifies a historically informed visual treatment based on project research and does not claim that generated imagery is archaeological evidence. “Game abstraction” identifies a deliberately schematic treatment for the veteran registry and road system.

## Verification expectations

`project_check.py` verifies the complete mapping, exact approved filenames, alpha-capable PNG headers, and construction-stage markers. Deterministic Node tests verify stage boundaries for three- and four-stage projects, mapping completeness, and the unchanged civil-settlement work behavior. The four approved PNG files must remain byte-for-byte unchanged.

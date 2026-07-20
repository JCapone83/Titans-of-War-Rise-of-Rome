# Act XI Visual Production Report

## Complete approved set

Act XI now has approved art for all eight Imperial Capital projects:

- `public/images/projects/castra-praetoria-v1.png` — Castra Praetoria
- `public/images/projects/aqua-claudia-v1.png` — Aqua Claudia and Anio Novus
- `public/images/projects/claudian-portus-v1.png` — Claudian Portus and Imperial Horrea
- `public/images/projects/domus-aurea-v1.png` — Domus Aurea Emergency Palace
- `public/images/projects/flavian-amphitheatre-v1.png` — Flavian Amphitheatre
- `public/images/projects/temple-peace-v1.png` — Temple of Peace Complex
- `public/images/projects/arch-titus-v1.png` — Arch of Titus
- `public/images/projects/domitianic-palace-v1.png` — Domitianic Palace Administration

Each asset is 1536×1024, uses complete uncropped transparent RGBA presentation, and has an accessible alt description and evidence-status label in `src/game/projectArt.js`. These are historically informed game reconstructions, not archaeological evidence.

## Historical design constraints

Castra Praetoria is the low-walled AD 23 guard compound rather than the later Aurelian fortress. Aqua Claudia retains two enclosed conduits. Claudian Portus excludes Trajan’s later hexagonal basin. The Domus Aurea is a connected palace-park with lake, pavilions, gardens, service routes, and displaced urban fabric rather than one golden castle. The Flavian Amphitheatre is intact and operating in AD 80–96. The Temple of Peace is a rectangular portico-and-garden public precinct rather than one temple or a domed complex. The Arch of Titus has exactly one principal passage. Domitianic Palace Administration remains a linked administrative complex rather than a fantasy castle.

## Generation decisions and provenance

The accepted images were generated with the built-in OpenAI image-generation tool on July 20, 2026 from project-authored art direction and historical constraints. Existing project-generated Roman art was used only as a style reference; no third-party historical image was used as a visual source. The aqueduct required two rejected passes before its two enclosed conduits were correct. A rejected Temple of Peace pass introduced an unsupported domed rotunda and was replaced with the accepted rectilinear portico-and-garden precinct. Portus excluded Trajan’s hexagon, the amphitheatre excluded ruins, Castra excluded late walls, the Domus Aurea excluded a fantasy castle, and the Arch excluded three-bay forms.

## Validation and completed gate

All approved files retain their original bytes and pass nonblank RGBA, 1536×1024 dimensions, transparent-corner, subject-coverage, and edge-spill checks. Deterministic tests verify the exact eight-entry mapping, exact paths, alt and evidence fields, and null fallback only for unknown project ids. Desktop and 390-pixel mobile QA verify image loading, one-column narrow-rail presentation, containment, and an empty browser error console.

The Act XI project-art visual-production gate is complete. Any replacement or variant remains separately gated and cannot silently overwrite the approved evidence and provenance record.

## Verification expectations

Run `python3 /Users/titansforge/Vault/Vault/Sovereign_Mesh/acceptance_checks/birth_of_rome_act_xi_visual_batch_two.py`. The acceptance command verifies all eight assets, mapping semantics, project checks, deterministic tests, balance behavior, and production build.

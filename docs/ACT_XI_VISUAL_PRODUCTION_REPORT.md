# Act XI Visual Production Report

## Approved batch

The first approved Act XI project-art batch contains exactly these existing transparent RGBA PNG files:

- `public/images/projects/aqua-claudia-v1.png` — Aqua Claudia and Anio Novus
- `public/images/projects/claudian-portus-v1.png` — Claudian Portus and Imperial Horrea
- `public/images/projects/flavian-amphitheatre-v1.png` — Flavian Amphitheatre
- `public/images/projects/domitianic-palace-v1.png` — Domitianic Palace Administration

Each asset is 1536×1024, uses complete uncropped transparent presentation, and is paired with an accessible alt description and an evidence-status label in `src/game/projectArt.js`. They are historically informed game reconstructions, not archaeological evidence.

## Historical design constraints

The Flavian Amphitheatre remains an intact operating AD 80–96 structure, with the public conversion and continuing substructure work represented by the existing project chronology. Aqua Claudia and Anio Novus retain two enclosed conduits. Claudian Portus is bounded to the Claudian harbor and Imperial Horrea context and excludes Trajan’s later hexagonal basin. Domitianic Palace Administration is an administrative complex of halls, offices, courts, terraces, and service routes rather than a fantasy castle.

## Generation decisions and provenance

The accepted images were generated with the built-in OpenAI image-generation tool on July 20, 2026 from project-authored art direction and historical constraints. The accepted aqueduct followed two rejected passes: one generic multi-tier structure and one treatment that left its conduits open rather than enclosed. The Portus brief explicitly excluded Trajan’s hexagonal basin; the amphitheatre brief excluded ruins; and the palace brief excluded fantasy-castle treatment. No third-party historical image was used as a visual source; existing project-generated Roman art was used only as a style reference.

## Validation and remaining gate

The approved files retain their original bytes and were validated as nonblank RGBA PNGs with transparent corners and plausible subject coverage. Deterministic checks verify the exact four-entry mapping, exact image paths, alt and evidence fields, and null fallback for Castra Praetoria, Domus Aurea, Temple of Peace, Arch of Titus, and unknown project ids.

Final illustrated reconstructions for those four remaining Act XI projects remain separately gated. Until that visual-production gate passes, they deliberately use the existing compact text-only stage treatment and receive no project-art mapping.

## Verification expectations

Run `python3 /Users/titansforge/Vault/Vault/Sovereign_Mesh/acceptance_checks/birth_of_rome_act_xi_visual_batch.py`. The acceptance command verifies the approved assets, project-art semantics, project checks, deterministic tests, balance behavior, and production build.

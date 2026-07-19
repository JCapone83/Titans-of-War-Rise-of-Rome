# Birth of Rome Building Art Manifest

**Purpose:** Track every player-facing building form, its campaign era, production status, and render priority. Final art is generated only after a structure brief defines its evidence status, silhouette, materials, required game-scale read, and rejection criteria.

**Current coverage:** 16 of 25 building forms have integrated final art.

## Priority Rules

1. Finish an era's frequently encountered core structures before later specialist upgrades.
2. Render unique major works before ordinary variants when they carry an act's historical identity.
3. Preserve clear family progression at 96 pixels; an upgrade must not be only a more detailed version of the same silhouette.
4. Treat disputed reconstructions conservatively and record uncertainty in the structure brief.
5. Require full-resolution alpha inspection plus desktop and mobile map checks before marking an asset complete.

## Completed Opening Settlement Art

| Era | Family | Building ID | Display name | Status |
| --- | --- | --- | --- | --- |
| Hill Settlements | Housing | `round-huts` | Palatine Huts | Final and integrated |
| Hill Settlements | Sacred | `timber-shrine` | Timber Shrine | Final and integrated |
| Hill Settlements | Water | `shallow-well` | Shallow Well | Final and integrated |
| Hill Settlements | Drainage | `drainage-ditch` | Drainage Ditch | Final and integrated |
| Hill Settlements | Exchange | `cattle-market` | Cattle Market | Final and integrated |
| Hill Settlements | Food storage | `grain-pits` | Grain Pits | Final and integrated |
| Hill Settlements | Craft | `kiln-smithy` | Kiln and Smithy | Final and integrated |
| Hill Settlements | Defense | `timber-palisade` | Timber Palisade | Final and integrated |

## Completed City of Kings Upgrades

| Era | Family | Building ID | Display name | Status |
| --- | --- | --- | --- | --- |
| City of Kings | Housing | `courtyard-housing` | Courtyard Housing | Final and integrated |
| City of Kings | Water | `lined-cistern` | Lined Cistern | Final and integrated |
| City of Kings | Food storage | `raised-granary` | Raised Granary | Final and integrated |
| City of Kings | Defense | `stone-gate` | Stone Gate | Final and integrated |

## Completed Batch 4: Regal Civic Core

This is the next render batch. These structures complete the City of Kings visual language and appear often enough in reference campaigns to justify production before later-era variants.

| Priority | Family | Building ID | Display name | Production reason |
| --- | --- | --- | --- | --- |
| 1 | Drainage | `cloaca-works` | Cloaca Works | Final and integrated |
| 2 | Sacred | `podium-temple` | Temple of Jupiter | Final and integrated |
| 3 | Exchange | `forum-market` | Forum Market | Final and integrated |
| 4 | Craft | `workshop-quarter` | Workshop Quarter | Final and integrated |

**Acceptance passed:** Detailed briefs and the approved silhouette sheet are recorded in `FIRST_STRUCTURE_CONCEPT_BIBLE.md`. Final alpha assets passed full-resolution inspection, exact ID mapping, project checks, the test and balance suites, production build, and desktop and mobile map verification.

## Batch 5: Early Republic Institutions and Services

| Priority | Family | Building ID | Display name | Status |
| --- | --- | --- | --- | --- |
| 1 | Civic | `comitium` | Comitium | Brief required |
| 2 | Treasury | `saturn-treasury` | Temple of Saturn and Aerarium | Brief required |
| 3 | Defense | `circuit-fortification` | Circuit Fortification | Brief required |
| 4 | Housing | `street-courtyards` | Ordered Street Courts | Brief required |
| 5 | Water | `public-cisterns` | Public Cistern Network | Brief required |
| 6 | Food storage | `public-granary` | Public Granary | Brief required |
| 7 | Craft | `contracted-craft-yards` | Contracted Craft Yards | Brief required |

## Batch 6: Post-Crisis Reconstruction

| Priority | Family | Building ID | Display name | Status |
| --- | --- | --- | --- | --- |
| 1 | Defense | `reconstruction-wall` | Reconstruction Stone Circuit | Brief required |
| 2 | Civic | `reconstruction-records` | Reconstruction Records Office | Brief required |
| 3 | Housing | `reconstructed-blocks` | Reconstructed Street Blocks | Brief required |
| 4 | Exchange | `reconstructed-forum` | Reconstructed Forum Exchange | Brief required |

## Acceptance Record

Each completed entry must record:

- concept brief and evidence status;
- retained chroma master and game-ready alpha path;
- internal building ID mapping in `src/game/buildingArt.js`;
- media provenance in `MEDIA_RIGHTS.md`;
- full-resolution edge and anachronism review;
- desktop and mobile district-scale verification;
- passing project check, tests, production build, and balance report.

# Birth of Rome Art Direction and Asset Specification

## Visual Goal

The city should look like a settlement becoming an organized republic over centuries, not like a finished imperial capital. Early works are timber, thatch, packed earth, rough stone, terracotta, and open yards. Later works become larger, regular, and civic, but they should not acquire marble facades, imperial domes, or late Roman density.

The current code-native models remain the fallback. New renderings should replace them only as a consistent set. A mixture of unrelated camera angles, lighting, and rendering styles will look worse than the provisional system.

## Master Rendering Standard

- **Projection:** orthographic or a very long lens with no visible perspective distortion.
- **Camera:** three-quarter isometric view, 35 degrees clockwise from the facade and 28 degrees above ground.
- **Lighting:** warm neutral daylight from upper left; soft contact shadow directly beneath the work.
- **Background:** transparent alpha, no scenery, labels, border, people cut off at the edge, or baked UI.
- **Composition:** entire structure visible with 8-10 percent clear space on every side.
- **Material fidelity:** timber, wattle, thatch, terracotta, tufa, packed earth, and bronze appropriate to the selected era.
- **Master size:** 2048 x 2048 PNG. Delivery size: 768 x 768 WebP plus the archived master.
- **Color:** restrained natural materials; avoid a uniformly brown, orange, or dark palette.
- **Continuity:** identical camera, sun direction, ground plane, scale convention, and shadow softness for every asset.

## First Production Batch

These assets produce the greatest visible improvement because they cover the opening turns and the most common map states:

1. Palatine Huts
2. Timber Shrine
3. Shallow Well
4. Drainage Ditch
5. Cattle Market
6. Grain Pits
7. Kiln and Smithy
8. Timber Palisade
9. Courtyard Housing
10. Lined Cistern
11. Raised Granary
12. Stone Gate

The first eight should read as one modest settlement kit. The four upgrades must preserve the silhouette or function of their earlier form while visibly improving capacity, durability, and organization.

Detailed pre-render descriptions, evidence labels, silhouettes, materials, and rejection criteria are in [FIRST_STRUCTURE_CONCEPT_BIBLE.md](FIRST_STRUCTURE_CONCEPT_BIBLE.md). No first-batch asset should be rendered before its concept entry is approved.

## Second Production Batch

- Cloaca Works
- Temple of Jupiter
- Forum Market
- Workshop Quarter
- Public Cistern Network
- Public Granary
- Comitium
- Temple of Saturn and Aerarium
- Circuit Fortification
- Reconstructed Street Blocks
- Reconstructed Forum Exchange
- Reconstruction Records Office
- Reconstruction Stone Circuit

Major projects need both an **under-construction** rendering and a completed rendering. Construction art should show committed materials, scaffolding, trenches, and crews without implying that the finished benefit already exists.

## Backdrops

Create three wide environmental plates at 2560 x 1440 with no text:

1. **Hill Settlements:** Tiber at left, separated occupied hills, Forum valley still wet, scattered huts and paths, ample clear central terrain for UI nodes.
2. **City of Kings / Early Republic:** drained civic low ground, denser timber and stone construction, guarded routes, Capitoline temple visible but not oversized.
3. **Post-Sack Reconstruction:** recognizably the same topography with uneven district damage, salvage, new masonry, wider access lanes in some quarters, and surviving civic anchors.

These are map surfaces, not splash art. Keep contrast behind labels low and avoid placing important architecture where district controls sit.

## Historical Exclusions

Reject an asset if it includes imperial marble Rome, concrete domes, triumphal arches of later form, legionary segmentata, medieval walls, modern paving, fantasy towers, or a generic Mediterranean palace unrelated to the named work.

## Acceptance Gate

Every asset must pass all five checks before integration:

1. Full silhouette remains legible at 96 x 96 pixels.
2. Camera and shadow match the approved reference asset.
3. Transparent edges are clean on both the olive map and the dark UI.
4. Structure remains historically plausible for its era and named function.
5. Desktop and 390-pixel mobile screenshots show no label or building overlap.

Approve one Palatine Huts master first. That image becomes the locked camera, lighting, material, and scale reference for all later renderings.

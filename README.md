# Titans of War: Birth of Rome

Build Rome before Rome is inevitable.

**Birth of Rome** is a local-first historical city-building strategy game. The playable campaign follows the transformation from separate hill settlements through the organized **City of Kings**, the **Early Republic**, the **Sack and Reconstruction**, and a first **Regional Compact** through 304 BC. The player must place works according to terrain, divide households among farming, construction, and levy service, sustain Veii, survive proportional Gallic destruction, rebuild damaged districts, and turn Rome's differentiated Latin settlement into roads, obligations, and colonies without exhausting the city.

No AI model, account, remote service, or internet connection is required after installation.

## Current Campaign

This `0.1.0` vertical slice contains:

- **Hill Settlements, 753-650 BC**
- **City of Kings, 650-509 BC**
- **Early Republic, 509-390 BC**
- **Sack and Reconstruction, 390-338 BC**
- **Regional Planning, 338-304 BC**
- 23 deterministic turns and eighteen political councils
- Six districts with terrain rules and limited plots
- A household population model with district occupancy, births, arrivals, departures, illness, and crisis losses
- Visible population composition: households, workers, levy-eligible people, craftsmen, and dependents
- Seasonal workforce allocation: farming, public works, levy readiness, festivals, shrines, and temple rites compete for the same people
- Ten building families, selected Tier III forms, the Comitium, and the Temple of Saturn treasury
- Population-derived public-works capacity: construction, rebuilding, repair, and major projects compete for crews
- Pausable multi-season projects for the Cloaca Works, Temple of Jupiter, and stone gates
- Direct upgrades that replace early structures with later forms on the same plot
- District specialties and service networks: markets need storage and improved roads, while dense housing needs water, drainage, and road access
- Switchable terrain, road, water, drainage, and defense overlays on the city map
- District-level fire, disease, and flood exposure driven by density, terrain, water, drainage, and fire-using craft
- Resource production, upkeep, overbuilding, underbuilding, damage, repair, and salvage pressures
- A Tiber flood and military emergency
- Forum drainage and the Temple of Jupiter as major works
- Annual magistrate modes that visibly constrain public-works capacity
- Senate standing, assembly consent, debt strain, levy burden, and the first-secession settlement
- A multi-turn Veii pressure model linking soldier pay, campaign duration, household debt, veteran cohesion, land expectations, and three settlements after victory
- A Gallic crisis readiness judgment shaped by the city, levy, reserves, fortification, veterans, and republican institutions rather than a scripted outcome
- Proportional sack damage to districts, works, population, stores, records, and political confidence
- Rapid, planned, and militarized reconstruction doctrines with persistent fire, housing, wall, debt, and labor consequences
- Selected Tier IV housing, market, civic-record, and defensive works
- Reciprocal, commanding, and differentiated Latin settlements at the 338 BC endpoint
- Separate city and regional planning views, with the city retained as the primary construction surface
- Citizens, partial citizens, Latin allies, and treaty allies with independent military, autonomy, trade, and revolt values
- Multi-season roads that improve supply, trade, and response while also opening hostile access
- Colonies that consume real settlers, stores, treasury, garrisons, and shared public capacity
- Visible regional overextension and three balanced doctrines: security, commerce, and reciprocal alliance
- Local save/restore, a guided walkthrough, historical context, chronicle export, five city grades, and a Regional Compact grade

The Samnite struggle, Caudine Forks, Pyrrhus, and the full conquest-of-Italy campaign remain planned rather than represented as finished content.

## Play Locally

Requires Node.js 20 or newer.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. For a production build:

```bash
npm run build
npm run preview
```

## Strategy

Construction is not a collection exercise. Labor is not a stored token: it comes from the people living in the city. Moving households to public works raises construction capacity but reduces farming or levy readiness. Every build, upgrade, repair, clearance, or project season consumes that capacity. Major works take several seasons, can be paused, and confer no finished-building benefit until completion. More housing without wells and drains creates crowding. Trade without order creates theft and volatility. Later buildings are unlocked by era, prerequisite, public credit, and institutional capacity rather than merely by waiting.

After 509 BC, office structure matters directly. Paired annual magistrates cap the size of one season's works program; Senate-led continuity can sustain somewhat more when public credit is strong; emergency command can move faster at a political cost. Levy service above the ordinary rotation raises household debt pressure, while grain reserves, declared service terms, the Comitium, and public treasury create different forms of resilience.

The **Season Forecast** exposes known production, upkeep, structural penalties, and population change before the player ends a turn. It explains expected births, arrivals, departures, and illness without revealing floods or enemy action in advance. The district inspector records condition and permits damaged works to be repaired, upgraded in place, or cleared for limited salvage.

Run `npm run balance` to execute the published Acts I-II strategies, the opening recovery campaign, three strategies each for Acts III and IV, and three regional doctrines. Their design claims are recorded in [docs/ACTS_I_II_BALANCE_REPORT.md](docs/ACTS_I_II_BALANCE_REPORT.md), [docs/ACT_III_BALANCE_REPORT.md](docs/ACT_III_BALANCE_REPORT.md), [docs/ACT_IV_BALANCE_REPORT.md](docs/ACT_IV_BALANCE_REPORT.md), and [docs/REGIONAL_SPINE_BALANCE_REPORT.md](docs/REGIONAL_SPINE_BALANCE_REPORT.md).

The campaign ends with five city grades and a separate Regional Compact grade:

- Urban Design
- Civic Balance
- Logistics
- Military Readiness
- Historical Continuity
- Regional Compact

Historical continuity measures how closely the city reproduces major developments associated with early Rome. It is not a moral grade, and alternate development remains valid play.

## Historical Method

The historical panel labels claims as **Roman tradition**, **archaeology**, **historical inference**, or **complexity**. Later Roman narratives are not treated as modern eyewitness reports, and archaeological uncertainty is not hidden. Strategic choices model plausible incentives where exact events cannot be recovered.

See [docs/GAME_DESIGN.md](docs/GAME_DESIGN.md) for the campaign architecture.
The rendering pipeline and first asset batch are defined in [docs/ART_DIRECTION_AND_ASSET_SPEC.md](docs/ART_DIRECTION_AND_ASSET_SPEC.md); one approved Palatine Huts master should lock the camera and lighting before the rest are produced.

## License

Code and original documentation are released under the MIT License. See [MEDIA_RIGHTS.md](MEDIA_RIGHTS.md) for the visual system and any future media additions.

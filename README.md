# Titans of War: Birth of Rome

Build Rome before Rome is inevitable.

**Birth of Rome** is a local-first historical city-building strategy game. Its deterministic campaign follows Rome from separate hill settlements in 753 BC through kingship, republic, Italian and Mediterranean expansion, metropolitan strain, civil war, and the operating settlement of 27 BC. The player must place works according to terrain, divide households among farming, construction, and levy service, preserve public records and political channels, and convert victory into institutions without exhausting the city or its allies.

No AI model, account, remote service, or internet connection is required after installation.

## Current Campaign

This `0.1.0` campaign contains 54 deterministic turns and 49 political councils. The 264 BC core judgment and every later act are explicit opt-in continuations, so a completed earlier campaign is never silently rewritten.

- **Hill Settlements, 753-650 BC**
- **City of Kings, 650-509 BC**
- **Early Republic, 509-390 BC**
- **Sack and Reconstruction, 390-338 BC**
- **Regional Planning, 338-304 BC**
- **Italian Strategy, 304-264 BC**
- **Mediterranean Republic, 261-201 BC**
- **Conquest and Metropolis, 197-133 BC**
- **Republic Under Strain, 121-49 BC**
- **Civil War and Settlement, 49-27 BC**
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
- Multi-stage Appian works, Mediterranean war finance, allied burdens, and veteran settlement
- Metropolitan and late-Republic ledgers separating public provision, legal capacity, command limits, citizenship, records, violence, and fire response
- Civil-war settlement mechanics separating command, demobilization, property, finance, succession, civic operation, and monumental credit
- Four staged settlement works: the Forum of Caesar, Curia Julia, Basilica Julia, and a veteran land-and-road registry
- Three viable 27 BC operating forms: an Augustan-style principate, a negotiated republican restoration, and a collegial military oligarchy
- Local save/restore through schema version 13, a guided walkthrough, historical context, chronicle export, five city grades, and act-specific grades

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

Run `npm run balance` to execute the published reference strategies from the hill settlements through 27 BC. Design claims and measured results are recorded in the balance reports under `docs/`, including [Act VIII](docs/ACT_VIII_BALANCE_REPORT.md) and [Act IX](docs/ACT_IX_BALANCE_REPORT.md).

The campaign retains five city grades and adds separate grades for each later operating system:

- Urban Design
- Civic Balance
- Logistics
- Military Readiness
- Historical Continuity
- Regional Compact
- Italian System
- Mediterranean Republic
- Conquest and Metropolis
- Republic Under Strain
- Civil War and Settlement

Historical continuity measures how closely the city reproduces major developments associated with early Rome. It is not a moral grade, and alternate development remains valid play.

## Historical Method

The historical panel labels claims as **Roman tradition**, **archaeology**, **historical inference**, or **complexity**. Later Roman narratives are not treated as modern eyewitness reports, and archaeological uncertainty is not hidden. Strategic choices model plausible incentives where exact events cannot be recovered.

See [docs/GAME_DESIGN.md](docs/GAME_DESIGN.md) for the campaign architecture.
The rendering pipeline and first asset batch are defined in [docs/ART_DIRECTION_AND_ASSET_SPEC.md](docs/ART_DIRECTION_AND_ASSET_SPEC.md); one approved Palatine Huts master should lock the camera and lighting before the rest are produced.

## License

Code and original documentation are released under the MIT License. See [MEDIA_RIGHTS.md](MEDIA_RIGHTS.md) for the visual system and any future media additions.

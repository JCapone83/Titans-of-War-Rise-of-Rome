# Titans of War: Birth of Rome

Build Rome before Rome is inevitable.

**Birth of Rome** is a local-first historical city-building strategy game. Its deterministic campaign follows Rome from separate hill settlements in 753 BC through kingship, republic, Italian and Mediterranean expansion, civil war, the Augustan settlement, and the Trajanic capital in AD 117. The player must place works according to terrain, divide households among farming, construction, and levy service, preserve public records and political channels, and convert victory into institutions without exhausting the city, Italy, or the provinces.

No AI model, account, remote service, or internet connection is required after installation.

## Current Campaign

This `0.1.0` campaign contains 76 deterministic turns and 71 political councils. The 264 BC core judgment and every later act are explicit opt-in continuations, so a completed earlier campaign is never silently rewritten.

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
- **The Augustan City, 27 BC-AD 14**
- **Imperial Capital, AD 14-96**
- **Trajanic Capital, AD 96-117**
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
- Seven Augustan councils, twelve operating measures, and eight staged works spanning the revised settlement of 23 BC through the succession of AD 14
- Evidence-labeled project art that distinguishes reconstruction, synthesis, hypothesis, and game abstraction, including an explicitly pre-Hadrianic Agrippan Pantheon
- An Augustan Capital View that places unlocked landmarks schematically on the city surface and distinguishes reserved sites, foundations, structural shells, and operating works
- Four derived capital systems—civic government, public provision, urban safety, and succession and memory—with an AD 14 capital legacy summary
- Three viable Augustan operating forms: an administrative principate, a civic compact, and a household-centered principate
- Nine imperial councils from the Augustan transfer through the AD 64 fire, the Four Emperors, the AD 80 opening of the Flavian Amphitheatre, and the AD 96 succession judgment
- Eight staged imperial projects, including the Aqua Claudia, Claudian harbor works, Domus Aurea, Flavian Amphitheatre, Temple of Peace, Arch of Titus, and Domitianic palace
- Four imperial operating systems separating authority transfer, capital provision, urban safety, and the public city from palace concentration
- Three viable imperial-capital strategies: public Flavian conversion, provision-first capital, and palace-administrative concentration
- Six Trajanic councils, six staged capital projects, and separate judgments for frontier reach, provincial trust, conquest finance, supply, maintenance, administration, succession, and constitutional continuity
- A completed AD 117 endpoint that treats the standing Hadrianic Pantheon as later than the represented campaign
- Local save/restore through schema version 15, a guided walkthrough, historical context, chronicle export, five city grades, and act-specific grades

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

To create a browser-ready zip with `index.html` at its root:

```bash
npm run release:web
```

The command writes the zip and a checksum manifest under `release/`. The zip contains only the production browser build and can be uploaded directly as an itch.io HTML5 project. See [docs/RELEASE_CHECKLIST.md](docs/RELEASE_CHECKLIST.md) for the full release gate.

## Campaign Home

The game opens on a full campaign home rather than dropping the player into an active turn. **Begin Campaign** starts a fresh settlement. After play has begun, **Continue Campaign** returns to the current in-memory position and shows its era, date, and turn; a browser save remains available through the campaign toolbar. **New Campaign** requires confirmation before it replaces a saved or active position.

Use the Home control in the campaign toolbar to return to the home screen without changing or silently saving the current simulation. Historical Method, Credits and Rights, and the opt-in Music control are available before entering play.

## Playable Terrain

The city map opens on the **Hill terrain** view for the Palatine and Capitoline, with a second **Tiber crossing** sector for the Tiber Bank and Aventine. Buildings constructed in those districts occupy stable clearings in their realistic terrain scenes; selecting an open or occupied plot selects that district for the existing construction workflow. The complete **Strategic overview** remains one click away and retains access to all six districts and every infrastructure overlay.

Paths in both playable terrain scenes connect occupied plots to their district approach. They appear as compacted earth until existing district road service is improved through the same market and defensive works already used by the simulation. These terrain layers do not create a second currency, construction action, or save format.

## Soundtrack

Birth of Rome includes an opt-in, self-hosted six-track classical soundtrack. Open the music control in the campaign header to see the recording recommended for the current era, select another recording, adjust volume, or mute playback. No music plays until the player presses Play, and every recording includes a direct source-and-rights link. All audio is served from the installed game; playback requires no account, model, API, or internet connection.

The program moves from Bach and Handel through Holst, Respighi's *Pines of the Appian Way*, and Sousa's *The Gladiator* as Rome develops from hill settlements to the Trajanic capital. See [MEDIA_RIGHTS.md](MEDIA_RIGHTS.md) for performers, sources, rights status, and frozen file hashes.

## Strategy

Construction is not a collection exercise. Labor is not a stored token: it comes from the people living in the city. Moving households to public works raises construction capacity but reduces farming or levy readiness. Every build, upgrade, repair, clearance, or project season consumes that capacity. Major works take several seasons, can be paused, and confer no finished-building benefit until completion. More housing without wells and drains creates crowding. Trade without order creates theft and volatility. Later buildings are unlocked by era, prerequisite, public credit, and institutional capacity rather than merely by waiting.

After 509 BC, office structure matters directly. Paired annual magistrates cap the size of one season's works program; Senate-led continuity can sustain somewhat more when public credit is strong; emergency command can move faster at a political cost. Levy service above the ordinary rotation raises household debt pressure, while grain reserves, declared service terms, the Comitium, and public treasury create different forms of resilience.

The **Season Forecast** exposes known production, upkeep, structural penalties, and population change before the player ends a turn. It explains expected births, arrivals, departures, and illness without revealing floods or enemy action in advance. The district inspector records condition and permits damaged works to be repaired, upgraded in place, or cleared for limited salvage.

Run `npm run balance` to execute the published reference strategies from the hill settlements through AD 117. Design claims and measured results are recorded in the balance reports under `docs/`, including [Act IX](docs/ACT_IX_BALANCE_REPORT.md), [Act X](docs/ACT_X_BALANCE_REPORT.md), the [Augustan capital integration](docs/ACT_X_CAPITAL_INTEGRATION_REPORT.md), [Act XI](docs/ACT_XI_BALANCE_REPORT.md), and the [Act XII implementation report](docs/ACT_XII_IMPLEMENTATION_REPORT.md).

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
- The Augustan City
- Imperial Capital
- Trajanic Capital

Historical continuity measures how closely the city reproduces major developments associated with early Rome. It is not a moral grade, and alternate development remains valid play.

## Historical Method

The historical panel labels claims as **Roman tradition**, **archaeology**, **historical inference**, or **complexity**. Later Roman narratives are not treated as modern eyewitness reports, and archaeological uncertainty is not hidden. Strategic choices model plausible incentives where exact events cannot be recovered.

See [docs/GAME_DESIGN.md](docs/GAME_DESIGN.md) for the campaign architecture.
Act XII reaches AD 117 with the Trajanic capital and the empire at maximum territorial extent. The familiar domed Pantheon belongs to Hadrian's rebuilding after AD 117 and is therefore not represented as a completed Trajanic work.
The rendering pipeline, evidence labels, and asset review rules are defined in [docs/ART_DIRECTION_AND_ASSET_SPEC.md](docs/ART_DIRECTION_AND_ASSET_SPEC.md) and the act-specific visual production reports.

## License

Code and original documentation are released under the MIT License. See [MEDIA_RIGHTS.md](MEDIA_RIGHTS.md) for the visual system and any future media additions.

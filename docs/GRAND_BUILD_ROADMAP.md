# Titans of War: Birth of Rome - Grand Build Roadmap

**Purpose:** This is the canonical execution plan for taking *Birth of Rome* from its current two-act vertical slice to a complete historical city-building strategy game covering 753-264 BC.

**Rule:** Work from the top of the Immediate Queue. Do not begin a later milestone because it is visually attractive while an earlier completion gate is still open.

**Last updated:** 2026-07-19

## Status Key

- `[x]` Verified and complete
- `[ ]` Not yet complete
- `BLOCKED:` Cannot proceed until the named dependency is complete
- `GATE:` Required evidence before advancing to the next milestone

## Immediate Queue

These are the next five executable steps, in order.

- [x] Add a household and population model tied to food, water, shelter, health, and district capacity.
- [x] Separate available labor from seasonal public-works capacity so military service, farming, and construction compete for people.
- [x] Add multi-season major projects for the Cloaca Works, Temple of Jupiter, and stone gates; later roads and aqueducts remain act-specific work.
- [x] Add a district-network overlay showing roads, water, drainage, and defended approaches.
- [x] Run a full Acts I-II balance pass with at least three viable city plans and record the results below.
- [x] Make fire, disease, and flood exposure depend on district density and network coverage.
- [x] Make market output depend on connected storage and improved roads.
- [x] Make dense housing performance depend on water, drainage, and road access.
- [x] Make ritual obligations compete visibly for workforce during major festivals and temple projects.
- [x] Show workforce burden by district and political interest.
- [x] Add and verify a recoverable reference campaign containing one deliberate major mistake.
- [ ] Extend the Early Republic from 494 to the Gallic threat with three additional tested turns.
- [ ] Model Veii as a multi-turn pressure with soldier pay, siege persistence, and three resolutions.
- [ ] Connect campaign success to land expectations, debt, and household labor.
- [ ] Add the Gallic threat as an Act III readiness test rather than a scripted defeat.
- [ ] Add three distinct Act III reference strategies and a new balance report.

### Immediate Completion Gate

- [x] A player can explain why population rose, stalled, or fell from information visible before ending the season.
- [x] Large projects cannot be completed instantly by stockpiling resources.
- [x] Labor committed to armies or monuments is unavailable elsewhere.
- [x] At least three distinct Acts I-II strategies can finish with an overall grade of C or better.
- [x] Desktop and mobile browser checks pass with no inaccessible controls or horizontal overflow.

## Product North Star

The completed game should make this claim through play:

> Rome became powerful by repeatedly converting crisis into institutions, infrastructure, military obligations, and negotiated forms of incorporation. Concentrating every resource in one system makes the city brittle; balancing every interest without committing to major works leaves it weak.

The player should feel three scales operating at once:

1. **Households and districts:** food, water, housing, fire, sanitation, labor, and local identity.
2. **The Roman state:** councils, kings or magistrates, priestly authority, assemblies, treasury, levies, and public works.
3. **The Italian system:** roads, alliances, colonies, trade routes, military obligations, and rival powers.

## Locked Design Decisions

- [x] Campaign scope begins with the foundation tradition in 753 BC.
- [x] Campaign scope ends in 264 BC, before the First Punic War becomes the game's central subject.
- [x] The first two acts are **Hill Settlements** and **City of Kings**.
- [x] Later acts are **The Early Republic**, **Sack and Reconstruction**, and **Roads to Italy**.
- [x] The game remains fully playable without AI, an account, or a remote service.
- [x] Roman tradition, archaeology, historical inference, and uncertainty remain visibly distinct.
- [x] Alternate development is permitted, but the game records historical continuity separately from good strategy.
- [x] Mechanics are stabilized before final art production.
- [x] City and regional strategy use two connected views rather than forcing all information onto one map.

## Verified Baseline

### Campaign and Simulation

- [x] Ten deterministic turns cover Hill Settlements and City of Kings.
- [x] Six terrain-sensitive districts have limited plots and specialties.
- [x] Eight building families have two functional tiers.
- [x] Construction, upgrades, repair, clearance, and salvage consume seasonal capacity.
- [x] Adjacency bonuses connect housing, water, sacred precincts, storage, markets, craft, and defense.
- [x] Flood and military events damage actual infrastructure.
- [x] Known production, upkeep, and structural pressures are forecast before turn resolution.
- [x] Five councils alter resources, civic measures, factions, and historical direction.
- [x] Five independent campaign grades measure urban design, civic balance, logistics, military readiness, and historical continuity.

### Product Quality

- [x] Local save and version-one migration exist.
- [x] Historical context distinguishes evidence categories.
- [x] Campaign chronicle export exists.
- [x] Walkthrough and keyboard-accessible controls exist.
- [x] Deterministic test suite and production build pass.
- [x] Desktop and mobile layouts have been browser-checked.

## Milestone 1 - The Living City

**Goal:** Make Rome behave like a settlement of households rather than a dashboard of independent meters.

### Population and Households

- [x] Add household population as a visible city total.
- [x] Divide population into dependents, available workers, levy-eligible households, and specialized craftsmen.
- [x] Calculate seasonal births, arrivals, departures, illness, and losses from visible causes.
- [x] Make housing capacity district-specific rather than purely citywide.
- [x] Make food and water shortages reduce growth before they cause collapse.
- [x] Make fire, disease, and flood exposure depend on density and infrastructure.
- [x] Add a compact population ledger explaining every seasonal change.

### Labor and Construction

- [x] Split stored resources from available labor obligations.
- [x] Make farming, construction, repair, ritual, and levy service compete for workers.
- [x] Add one-season works, multi-season works, and monumental projects.
- [x] Permit pausing a project while preserving completed progress.
- [x] Apply political penalties to repeatedly abandoned projects.
- [x] Allow councils to alter project speed or faction burden.
- [x] Show labor burden by district and political interest.

### Networks and Land Use

- [x] Add road links between districts.
- [x] Add water and drainage coverage networks.
- [x] Add defended approaches and gate coverage.
- [x] Make market output depend on connected storage and roads.
- [x] Make dense housing depend on water, drainage, and road access.
- [ ] Make workshops produce fire and waste pressure unless properly sited.
- [x] Add a map overlay control for terrain, roads, water, drainage, and defense.

### Balance and Explanation

- [x] Define at least three viable Acts I-II development strategies.
- [x] Add a deterministic balance runner for those strategies.
- [ ] Add visible explanations for every structural bonus and penalty.
- [ ] Ensure no single building family dominates every successful strategy.
- [x] Ensure a player can recover from one major mistake without making failure meaningless.

### Milestone 1 Gate

- [x] Three tested strategies earn C or better without identical build orders.
- [x] Population, labor allocation, and project progress survive save and restore.
- [x] The flood creates materially different outcomes for prepared and unprepared cities.
- [x] The city remains understandable at 390 px mobile width.
- [x] No test or production-build regressions remain.

## Milestone 2 - Act III: The Early Republic, 509-390 BC

**Dependency:** Milestone 1 complete.

**Goal:** Replace royal command with competing offices and obligations without pretending the new Republic was politically settled from its beginning.

### Political Transition

- [x] Create the expulsion-of-the-kings transition from the final City of Kings state.
- [x] Replace royal authority with annually constrained magistrates.
- [x] Model the Senate as continuity, counsel, finance, and elite coordination rather than a modern legislature.
- [x] Add assemblies and citizen-body consent without importing modern party categories.
- [x] Add debt, military obligation, and the secession traditions as linked pressures.
- [x] Add tribunes and plebeian institutions only at the appropriate stage.
- [x] Permit alternate constitutional settlements with explicit costs.

### City and Buildings

- [x] Add the Comitium and early civic meeting space.
- [x] Add the Temple of Saturn and treasury function.
- [x] Add improved granaries, workshops, streets, and defensive works.
- [x] Add a third visual and mechanical tier for selected building families.
- [x] Allow royal monuments to be repurposed, neglected, or claimed by republican institutions.

### War and Finance

- [x] Model levy duration, campaign season, and household disruption across the complete Veii sequence.
- [x] Add Veii as a multi-turn strategic pressure rather than a single choice.
- [x] Add soldier pay and siege persistence as political-financial decisions.
- [x] Connect military success to land, debt, labor, and faction expectations.
- [x] End the act with a credible Gallic threat shaped by the player's prior readiness.

### Historical Councils and Events

- [x] Draft 6-8 period-grounded councils for the act.
- [x] Add source notes and uncertainty labels to every major historical claim.
- [x] Include at least two councils where every option has a defensible period logic.
- [x] Include at least one alternate path that strengthens Rome tactically while weakening its institutions.

### Milestone 2 Gate

- [x] The monarchy-to-Republic transition changes mechanics, not just labels.
- [x] Political offices constrain player action in ways visible to the player.
- [x] Veii has at least three strategically distinct resolutions.
- [x] Act III adds 6-8 tested turns without breaking Acts I-II saves.
- [x] Historical review separates ancient tradition from reconstructable institutions.

## Milestone 3 - Act IV: Sack and Reconstruction, 390-338 BC

**Dependency:** Milestone 2 complete.

**Goal:** Make catastrophe a test of institutions, reserves, and urban design rather than a scripted reset.

### The Gallic Crisis

- [x] Resolve the Allia and defense of the city from accumulated readiness.
- [x] Damage districts, population, stores, records, and political confidence proportionally.
- [x] Preserve partial successes so every campaign does not produce the same destruction.
- [x] Distinguish Roman literary memory of the sack from archaeological uncertainty.

### Reconstruction

- [x] Add emergency shelter, food distribution, fire clearance, and wall projects.
- [x] Make rapid rebuilding cheaper now but more dangerous later.
- [x] Allow deliberate street and drainage reform at a higher immediate cost.
- [x] Add debt relief, labor burden, and land disputes to reconstruction politics.
- [x] Add a fourth tier for core civic, housing, defense, and market buildings.
- [x] Make old district identity persist through destruction and rebuilding.

### Latin Relations

- [x] Model Rome's recovery relative to Latin neighbors rather than in isolation.
- [x] Add alliance bargaining, military obligations, and revolt risk.
- [x] Build toward the Latin War and the settlement of 338 BC.
- [x] Make incorporation arrangements a foundation for the final act.

### Milestone 3 Gate

- [x] Prepared cities suffer less but never ignore the sack entirely.
- [x] Reconstruction supports at least a rapid, planned, and militarized strategy.
- [x] Rebuilding choices remain visible in later district performance.
- [x] The 338 BC settlement creates a valid regional state for Act V.
- [x] Disaster and recovery are covered by deterministic regression tests.

## Milestone 4 - The Regional Strategy Spine

**Dependency:** Milestone 3's Latin settlement design agreed; implementation may begin before all Act IV writing is final.

**Goal:** Connect the city builder to Italy without turning the game into a conventional territory painter.

### Regional Map

- [x] Add a separate schematic map of Latium and central Italy.
- [x] Represent roads, colonies, allied communities, hostile powers, and trade routes.
- [x] Keep the city map as the primary construction surface.
- [x] Let regional commitments consume city labor, treasury, grain, and military readiness.
- [x] Let city infrastructure improve regional supply and response time.

### Incorporation and Obligation

- [x] Model several historically grounded relationship types: citizens, partial citizens, Latin allies, and treaty allies.
- [x] Track military contribution, local autonomy, trade access, and revolt risk separately.
- [x] Avoid a single assimilation meter.
- [x] Make generous arrangements costly in the short term and useful in specific long-term conditions.
- [x] Make coercive arrangements effective in some situations but cumulatively brittle.

### Roads and Colonies

- [x] Add multi-season road construction.
- [x] Add colony placement as a population, treasury, and political decision.
- [x] Make roads improve supply, trade, communication, and hostile access simultaneously.
- [x] Require garrisons and settlers rather than treating colonies as free map ownership.

### Milestone 4 Gate

- [x] City and regional decisions exchange resources in both directions.
- [x] The regional map remains legible on desktop and usable on mobile.
- [x] Expansion can overextend a strong city.
- [x] A player can pursue security, trade, or alliance depth without identical map play.

## Milestone 5 - Act V: Roads to Italy, 338-264 BC

**Dependency:** Regional Strategy Spine complete.

**Goal:** Show how Rome built a durable Italian system through roads, colonies, military persistence, and varied political arrangements.

### Campaign Arcs

- [ ] Add the aftermath of the Latin War settlement.
- [ ] Add the Samnite struggle as terrain, alliance, and logistics pressure.
- [ ] Add the Caudine Forks crisis with military and political consequences.
- [ ] Add the Via Appia and Aqua Appia as competing major projects.
- [ ] Add Pyrrhus as a test of reserves, alliances, and strategic endurance.
- [ ] End in 264 BC with an Italian system ready, or unready, for a larger Mediterranean war.

### Mature City

- [ ] Add aqueduct coverage and expanded water-dependent density.
- [ ] Add mature roads, markets, workshops, temples, walls, and public spaces.
- [ ] Add maintenance debt so mature infrastructure is powerful but not free.
- [ ] Add final building tiers only where they create new strategic behavior.
- [ ] Preserve visible traces of the player's earlier city rather than replacing the map wholesale.

### End States

- [ ] Add a historically strong federation ending.
- [ ] Add a militarily dominant but politically brittle ending.
- [ ] Add a wealthy but strategically exposed ending.
- [ ] Add a balanced alternate Italian system ending.
- [ ] Add decline or fragmentation outcomes caused by accumulated structural weakness.
- [ ] Grade the complete campaign across city design, institutions, logistics, war, incorporation, and historical continuity.

### Milestone 5 Gate

- [ ] The complete campaign reaches 264 BC without forced historical outcomes.
- [ ] Earlier acts materially alter final strategy and ending text.
- [ ] At least four coherent full-campaign strategies are viable.
- [ ] No winning strategy can ignore city maintenance, politics, or regional obligations entirely.
- [ ] Full campaign saves, exports, and deterministic replays pass.

## Milestone 6 - Historical and Educational Depth

**Runs alongside content milestones, but never substitutes for working mechanics.**

- [ ] Create a source ledger for every council, event, building, and institutional claim.
- [ ] Mark each entry as primary source, near-contemporary account, archaeology, modern synthesis, or designer inference.
- [ ] Add short context notes that clarify incentives without revealing optimal choices.
- [ ] Add a chronological archive unlocked by play.
- [ ] Add map notes explaining uncertainty in early topography and dating.
- [ ] Apply the Titans Forge Social Science Rubric to every act.
- [ ] Run a dedicated presentism and language-fidelity review.
- [ ] Flag disputed or uncertain material for human review instead of smoothing it into certainty.
- [ ] Export consulted historical context with the final campaign chronicle.

### Historical Gate

- [ ] Every major claim has a source category and locator.
- [ ] Ancient literary traditions are not presented as modern eyewitness reporting.
- [ ] Archaeological disagreement is stated where it materially changes the design.
- [ ] No context panel contains modern political slogans or academic filler.
- [ ] Human review has resolved every high-importance uncertainty flag.

## Milestone 7 - Final Visual Production

**Dependency:** Corresponding mechanics and map geometry are stable.

### Visual Direction

- [ ] Approve one historically grounded art direction for all eras.
- [ ] Produce a high-quality early Rome backdrop with clear district readability.
- [ ] Produce separate backdrop states for royal Rome, early Republic, post-sack rebuilding, and mature Republican Rome.
- [ ] Ensure the Tiber, hills, Forum valley, roads, walls, and district positions remain mechanically legible.
- [ ] Avoid decorative artwork that hides plots, condition, networks, or event damage.

### Building Asset Matrix

- [x] Create an asset manifest for every building family and tier.
- [ ] Produce consistent isometric housing assets across all eras.
- [ ] Produce sacred, water, drainage, market, grain, craft, defense, road, wall, colony, and aqueduct assets.
- [ ] Create damaged and under-construction states for major assets.
- [ ] Create monumental construction stages for the Cloaca, Capitoline temple, walls, roads, and aqueduct.
- [ ] Verify scale, camera angle, light direction, and ground contact across every asset.
- [ ] Replace placeholder CSS models only after the final asset passes in-game QA.

### Art Rights and Provenance

- [ ] Record whether each asset is original, commissioned, generated, public domain, or separately licensed.
- [ ] Record the creator, model or source, date, prompt or locator, license, and required attribution.
- [ ] Exclude any asset with unresolved public-release rights.
- [ ] Update `MEDIA_RIGHTS.md` before every public build.

### Visual Gate

- [ ] Buildings remain distinguishable at normal play size without reading labels.
- [ ] Construction, upgrade, and damage states are visible.
- [ ] Desktop and mobile maps remain readable without overlap.
- [ ] No final image is accepted solely because it looks impressive outside the game.

## Milestone 8 - Audio and Atmosphere

- [ ] Define a restrained music palette appropriate to the setting without claiming reconstructed Roman authenticity where none exists.
- [ ] Use only public-domain, original, or clearly compatible recordings.
- [ ] Add ambient city layers for river, market, construction, ritual, fire, and military alarm.
- [ ] Keep music optional, locally hosted, and separately controllable from effects.
- [ ] Add clear source and license records for every track.
- [ ] Test autoplay restrictions and mobile playback.
- [ ] Ensure the game remains complete and intelligible while muted.

## Milestone 9 - Product Quality and Release

### Usability and Accessibility

- [ ] Add complete keyboard navigation for map, districts, buildings, councils, and overlays.
- [ ] Add visible focus, reduced-motion support, and sufficient contrast.
- [ ] Verify screen-reader names for meters, buildings, grades, and map controls.
- [ ] Test at 390x844, 768x1024, 1440x900, and a wide desktop viewport.
- [ ] Add explicit save incompatibility messages for any future migration failure.

### Testing and Balance

- [ ] Unit-test every resource transformation and prerequisite.
- [ ] Add deterministic act-transition tests.
- [x] Add full-campaign reference strategies and balance reports for completed acts.
- [ ] Add browser tests for build, upgrade, repair, council, save, restore, and export.
- [ ] Add a React error boundary recovery test.
- [ ] Run at least two outside playtest rounds before release candidate status.

### Packaging and Public Release

- [ ] Keep GitHub source, README, license, media rights, and campaign documentation current.
- [ ] Produce an itch.io browser build with no repository tooling or internal planning files.
- [ ] Keep the downloadable package below the agreed size budget.
- [ ] Verify the complete campaign offline after initial download.
- [ ] Create a 60-90 second trailer showing city growth, political choice, catastrophe, and regional expansion.
- [ ] Create an accurate launch thread that distinguishes current features from roadmap features.

### Release Gate

- [ ] All deterministic tests and production builds pass from a clean install.
- [ ] No unresolved critical or major gameplay defect remains.
- [ ] All shipped media has verified public-release rights.
- [ ] Save, restore, export, audio, mobile play, and itch.io embedding are verified.
- [ ] A complete campaign has been played from 753 to 264 BC in the release build.

## Deferred Until After the Complete Core Game

- [ ] Optional local-agent commentary or advisor mode
- [ ] Scenario editor for community-authored campaigns
- [ ] Additional factions or non-Roman campaigns
- [ ] Multiplayer or shared campaign comparison
- [ ] Voice narration
- [ ] Procedural art generation inside the game

These features must not delay population, labor, campaign acts, historical review, final art, or release quality.

## Checkoff Procedure

When completing an item:

1. Change `[ ]` to `[x]` only after implementation and verification.
2. Add the completion date and evidence under the relevant milestone's Work Log.
3. Record tests, browser checks, and any known limitation.
4. Do not mark a milestone gate complete because most of its feature checklist is complete.
5. Update the Immediate Queue with the next five executable items.

## Work Log

### 2026-07-19 - Regional Strategy Spine, 338-304 BC

- Added a three-turn continuation after the Latin settlement with security, commerce, and reciprocal-alliance doctrines.
- Added a separate Latium map while retaining the city as the default construction surface.
- Added differentiated citizen, partial-citizen, Latin-ally, and treaty-ally compacts with independent military contribution, autonomy, trade access, and revolt risk.
- Added multi-season roads, settlers and garrisons for colonies, hostile access, city-supported logistics, and explicit overextension.
- Added save-schema version seven migration, regional chronicle export, two historical notes, and a dedicated Regional Compact grade.
- Verified 61 deterministic tests, three regional reference strategies with scores of 82, 92, and 90, the production build, project checks, and regional-map captures at 1440x1000 and 390x844.
- Corrected mobile community placement after the first capture exposed overlap around Rome, Tusculum, and Praeneste.
- Added the locked camera, lighting, material, backdrop, and acceptance specification for the first two art-production batches.
- Produced and integrated the first Palatine Huts master with a transparent alpha edge and code-native fallback for unfinished asset families.
- Verified the Palatine Huts master at district scale on desktop and mobile with clean edges, readable form, and no label collisions.
- Produced and approved grayscale silhouette sheets for seven early civic works and four City of Kings upgrades.
- Rendered and integrated the Timber Shrine, then verified its district-scale silhouette and edge treatment on desktop and mobile.
- Rendered and integrated the Shallow Well, Grain Pits, and Timber Palisade, including historical corrections to the well bucket and defensive profile.
- Verified the complete first production family together on desktop and mobile with distinct silhouettes, stable labels, and unchanged district geometry.
- Rendered and integrated Cattle Market, Drainage Ditch, and Kiln and Smithy, including removal of anachronistic workshop cues.
- Verified the second production family together on desktop and mobile with distinct silhouettes, stable labels, and unchanged district geometry.
- Rendered and integrated Courtyard Housing, Lined Cistern, Raised Granary, and Stone Gate with chronological corrections to water storage, floor elevation, and gate construction.
- Verified the complete City of Kings upgrade family on desktop and mobile with distinct silhouettes, stable labels, and unchanged district geometry.
- Audited all 25 building forms and added a production manifest covering the 12 completed assets and 13 remaining forms.
- Completed historically bounded render briefs for the Regal Civic Core: Cloaca Works, Temple of Jupiter, Forum Market, and Workshop Quarter.
- Approved the shared Regal Civic Core silhouette sheet after correcting the first Temple of Jupiter from a Greek peripteral form to a frontal Tuscanic mass.
- Rendered, extracted, integrated, and verified the four Regal Civic Core assets on desktop and mobile; final building-art coverage is now 16 of 25 forms.
- Ranked Cloaca Works, Temple of Jupiter, Forum Market, and Workshop Quarter as the next batch because they complete the regal civic core and dominate the remaining early-campaign visual gaps.
- Next item: write detailed evidence, silhouette, material, and rejection briefs for the four regal civic works before rendering them.

### 2026-07-19 - Early Republic Opening, 509-494 BC

- Added a resumable transition after the turn-ten Acts I-II judgment; completed version-four campaigns migrate into the same continuation point.
- Added turns 11-13 for the expulsion settlement, debt and levy dispute, and traditional first secession.
- Added visible magistrate authority, Senate standing, assembly consent, debt strain, and levy burden, with office modes constraining public-works capacity.
- Linked levy allocation to debt and household burden; grain reserves, declared campaign limits, and republican institutions provide visible relief.
- Added the Comitium, Temple of Saturn and Aerarium, and Tier III housing, water, grain, craft, and defense works.
- Added four historical notes distinguishing Roman tradition, institutional inference, and chronological uncertainty.
- Migrated saves to version five, preserved republican office caps across restore, expanded the campaign export, and verified 44 deterministic tests without changing the four Acts I-II balance scores.
- Completed clean 13-turn browser runs at 1440x900 and 390x844; the republican panel, councils, tier labels, tribune settlement, and final judgment render without console errors or horizontal overflow.
- Next item: add turns 14-16 around Veii, soldier pay, land expectations, and the Gallic approach.

### 2026-07-19 - Service Networks, Ritual Labor, and Recovery

- Made market treasury output depend on connected storage and improved roads; each missing service removes one quarter of full output.
- Made Tier II housing capacity depend on water, drainage, and improved roads, with visible service status and structural-pressure explanations.
- Reserved shrine, festival, and temple-rite labor before seasonal allocation and exposed each obligation by district and political interest.
- Added the Crowded Hills Recovery reference campaign, which overbuilds housing and river exchange before correcting its service networks.
- Verified that the recovery campaign completes at 77 overall while maximum disease exposure falls from 47 to 22 and fire exposure falls from 60 to 53.
- Expanded the deterministic suite from 32 to 36 tests covering network output, dense-housing capacity, ritual reservations, and recoverability.
- Verified the production build and clean interface behavior at 1440x900 and 390x844 with no horizontal overflow or browser console errors.
- Confirmed in the live interface that a common festival reserves 24 people and identifies its Palatine district and hill-community interest.
- Next item: begin the Early Republic act-transition design and define its institutions, building tier, and first recoverable crisis.

### 2026-07-19 - Acts I-II Balance and District Risk

- Added one district-risk model for fire, disease, and flood exposure using occupancy, terrain, housing, markets, workshops, water, and drainage.
- Made district disease risk affect projected illness, severe fire exposure wear vulnerable works, and the Tiber flood resolve from visible Forum and riverbank exposure.
- Added compact selected-district risk explanations, a citywide hazard watch, and resolved flood exposure in season reports.
- Added Household League, River Exchange, and Royal Works reference strategies using only public simulation actions.
- Added `npm run balance` and recorded scores of 81, 84, and 92 without changing grade thresholds or permitting skipped actions.
- Verified 32 deterministic tests, all three balance runs, the production build, and clean browser checks at 1440x900 and 390x844.
- Confirmed water coverage reduced Palatine fire exposure from 39 to 19 and disease exposure from 44 to 26 in the live interface.
- Fixed a 1440 px build-dock breakpoint that had allowed the action panel to be clipped by the decision rail; the corrected dock stays inside the game-center boundary.
- Next item: make market and dense-housing performance depend on completed district networks, then add a recoverable mistake campaign.

### 2026-07-19 - Workforce, Major Projects, and City Networks

- Removed stockpiled labor from resources and building costs; the eligible population is now allocated among fields, public works, and levy service.
- Derived seasonal construction capacity, grain yield, and readiness pressure from that allocation with visible controls and forecasts.
- Added pausable multi-season construction for the Cloaca Works, Temple of Jupiter, and stone gates. Materials are committed once and finished effects apply only at completion.
- Added active-project tracking, repeated-pause order pressure, final-grade penalties for unfinished monuments, and version-four migration from saves dating back to version one.
- Added terrain, roads, water, drainage, and defense overlays, including Tier II service into neighboring districts.
- Verified 28 deterministic tests, the production build, a complete Cloaca start/resume/completion browser path, and layouts at 1440x900 and 390x844 with no horizontal overflow.
- Next item: run the three-strategy Acts I-II balance pass, then connect density and network coverage to fire, disease, and flood exposure.

### 2026-07-19 - Household and Population Model

- Added a version-three population state with total people, households, dependents, workers, levy-eligible people, craftsmen, and district occupancy.
- Tied births, arrivals, departures, illness, and crowding to visible food, water, shelter, sanitation, order, and district housing capacity.
- Added undisclosed crisis losses for exposed districts when floods and raids resolve.
- Added pre-season explanations, district occupancy bars, season-report causes, chronicle export, and version-one/version-two save migration.
- Verified 20 deterministic tests, production build, season-resolution browser flow, and 390 px mobile layout with no overflow or console errors.
- Next item: separate available labor from seasonal public-works capacity.

### 2026-07-19 - Roadmap Baseline

- Completed the two-act deterministic vertical slice.
- Added seasonal capacity, upgrades, adjacency, damage, repairs, clearance, forecasts, and save migration.
- Verified 16 deterministic tests, production build, and desktop/mobile layouts.
- Established population, labor allocation, major projects, network overlays, and Acts I-II balance as the next execution sequence.

### Future Entry Template

**Date:** YYYY-MM-DD
**Milestone:**
**Items completed:**
**Verification:**
**Known limitations:**
**Next item:**

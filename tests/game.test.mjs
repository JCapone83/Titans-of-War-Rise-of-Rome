import test from 'node:test'
import assert from 'node:assert/strict'
import { createInitialState, createItalianState, createReconstructionState, createRegionalState, createRepublicState, createWarState, migrateState } from '../src/game/initialState.js'
import { BUILDING_FAMILIES, TURN_YEARS, getCouncil } from '../src/game/data.js'
import { __test, advanceTurn, allocateWorkforce, buildingAvailability, continueProject, continueRegionalRoad, districtNetworkReport, districtRiskReport, enterCityOfKings, enterEarlyRepublic, enterItalianStrategy, enterReconstruction, forecastSeason, foundRegionalColony, gallicCrisis, gallicReadiness, italianForecast, italianProjectAvailability, mediterraneanForecast, networkCoverage, placeBuilding, populationCapacity, projectPopulation, reconstructionForecast, regionalForecast, removeBuilding, repairBuilding, republicForecast, resolveCouncil, reviseRegionalCompact, ritualWorkforceBurden, siteAnalysis, startRegionalRoad, upgradeBuilding, warForecast, workforceSummary, workItalianProject } from '../src/game/simulation.js'
import { calculateItalianScore, calculateOutcome, calculateRegionalScore } from '../src/game/outcomes.js'
import { campaignMarkdown } from '../src/game/campaignExport.js'
import { runAllActFiveStrategies, runAllActFourStrategies, runAllActThreeStrategies, runAllMediterraneanStrategies, runAllReferenceStrategies, runAllRegionalStrategies, runRecoveryStrategy } from '../src/game/referenceStrategies.js'
import { continueToMediterranean, enterHannibalicEmergency, enterMediterranean } from '../src/game/continuation.js'
import { HISTORICAL_NOTES } from '../src/game/historicalContext.js'
import { BUILDING_ART, artForBuilding } from '../src/game/buildingArt.js'
import { existsSync } from 'node:fs'
import { resolve } from 'node:path'

test('initial campaign begins at the Palatine council', () => {
  const state = createInitialState()
  assert.equal(state.turn, 1)
  assert.equal(state.era, 0)
  assert.equal(state.council.id, 'league-of-hills')
  assert.equal(state.councilResolved, false)
  assert.equal(state.population.total, 1030)
  assert.equal(populationCapacity(state).total, 1220)
})

test('housing adds capacity to its specific district', () => {
  const state = createInitialState()
  const built = placeBuilding(state, 'housing', 'palatine').state
  const before = populationCapacity(state)
  const after = populationCapacity(built)
  assert.equal(after.districts.palatine - before.districts.palatine, 220)
  assert.equal(after.districts.aventine, before.districts.aventine)
})

test('stable well-housed conditions produce visible population growth', () => {
  const stores = { grain: 50, timber: 50, stone: 50, bronze: 50, treasury: 50 }
  let state = { ...createInitialState(), resources: stores, metrics: { food: 70, water: 70, shelter: 70, sanitation: 70, order: 70, auspices: 60, readiness: 50, trade: 50 } }
  state = placeBuilding(state, 'housing', 'palatine').state
  const projection = projectPopulation(state)
  assert.ok(projection.change.births > 0)
  assert.ok(projection.change.arrivals > 0)
  assert.ok(projection.projectedTotal > state.population.total)
  assert.ok(projection.reasons.every((reason) => reason.detail.length > 20))
})

test('food water shelter and sanitation deficits reduce population', () => {
  const state = {
    ...createInitialState(),
    metrics: { food: 24, water: 28, shelter: 32, sanitation: 30, order: 50, auspices: 50, readiness: 50, trade: 40 },
  }
  const projection = projectPopulation(state)
  assert.ok(projection.change.departures > 0)
  assert.ok(projection.change.illness > 0)
  assert.ok(projection.projectedTotal < state.population.total)
})

test('a council decision is required before advancing', () => {
  const state = createInitialState()
  const result = advanceTurn(state)
  assert.match(result.error, /council/i)
  assert.equal(result.state.turn, 1)
})

test('building placement spends stores and changes the city', () => {
  const state = createInitialState()
  const result = placeBuilding(state, 'housing', 'palatine')
  assert.equal(result.state.buildings.length, 1)
  assert.equal(result.state.resources.timber, 10)
  assert.ok(result.state.metrics.shelter > state.metrics.shelter)
  assert.equal(result.state.actionsUsed, 1)
  assert.equal(result.state.buildings[0].condition, 100)
})

test('seasonal public-works capacity prevents unlimited construction', () => {
  let state = { ...createInitialState(), resources: { grain: 50, timber: 50, stone: 50, bronze: 50, treasury: 50 } }
  state = placeBuilding(state, 'housing', 'palatine').state
  state = placeBuilding(state, 'water', 'capitoline').state
  const blocked = buildingAvailability(state, 'grain', 'aventine')
  assert.equal(blocked.ok, false)
  assert.match(blocked.reason, /capacity/i)
})

test('terrain blocks shallow wells in the wet Forum valley', () => {
  const state = createInitialState()
  const availability = buildingAvailability(state, 'water', 'forum')
  assert.equal(availability.ok, false)
  assert.match(availability.reason, /ground/i)
})

test('tier two buildings remain gated before the era transition', () => {
  const state = { ...createInitialState(), era: 1 }
  const availability = buildingAvailability(state, 'shrine', 'capitoline')
  assert.equal(availability.ok, false)
  assert.match(availability.reason, /drainage/i)
})

test('an early work can be upgraded in place after prerequisites are met', () => {
  const stores = { grain: 50, timber: 50, stone: 50, bronze: 50, treasury: 50 }
  let state = { ...createInitialState(), resources: stores }
  state = placeBuilding(state, 'drainage', 'forum').state
  state = placeBuilding(state, 'housing', 'palatine').state
  const housingId = state.buildings.find((building) => building.familyId === 'housing').instanceId
  state = { ...state, era: 1, actionsMax: 3, actionsUsed: 0, resources: stores }
  const upgraded = upgradeBuilding(state, housingId)
  assert.equal(upgraded.error, undefined)
  assert.equal(upgraded.state.buildings.find((building) => building.instanceId === housingId).buildingId, 'courtyard-housing')
  assert.equal(upgraded.state.buildings.length, 2)
})

test('linked districts produce an explicit adjacency bonus', () => {
  const stores = { grain: 50, timber: 50, stone: 50, bronze: 50, treasury: 50 }
  let state = { ...createInitialState(), resources: stores }
  state = placeBuilding(state, 'water', 'capitoline').state
  const analysis = siteAnalysis(state, 'housing', 'palatine')
  assert.ok(analysis.bonuses.some((bonus) => bonus.includes('water')))
  assert.ok(analysis.effects.sanitation > 0)
})

test('damaged works can be repaired or cleared deterministically', () => {
  let state = placeBuilding(createInitialState(), 'housing', 'palatine').state
  const id = state.buildings[0].instanceId
  state = { ...state, actionsUsed: 0, buildings: [{ ...state.buildings[0], condition: 50 }] }
  const repaired = repairBuilding(state, id)
  assert.equal(repaired.state.buildings[0].condition, 90)
  const cleared = removeBuilding(repaired.state, id)
  assert.equal(cleared.state.buildings.length, 0)
  assert.equal(cleared.state.actionLog.at(-1).type, 'remove')
})

test('the Tiber flood damages exposed works in affected districts', () => {
  const stores = { grain: 50, timber: 50, stone: 50, bronze: 50, treasury: 50 }
  let state = { ...createInitialState(), resources: stores }
  state = placeBuilding(state, 'market', 'tiber').state
  state = placeBuilding(state, 'drainage', 'forum').state
  state = { ...state, turn: 4, council: null, councilResolved: true }
  const result = advanceTurn(state)
  assert.ok(result.state.buildings.every((building) => building.condition < 100))
  assert.ok(result.report.notes.some((note) => note.includes('damaged works')))
  assert.ok(result.report.populationChange.eventLosses > 0)
})

test('season forecast reports structural pressure without revealing timed events', () => {
  const state = createInitialState()
  const forecast = forecastSeason(state)
  assert.equal(forecast.actionsRemaining, 2)
  assert.equal('labor' in forecast.resourceDelta, false)
  assert.equal(forecast.workforce.constructionCapacity, 2)
  assert.equal('event' in forecast, false)
  assert.equal(forecast.population.change.eventLosses, 0)
})

test('labor is an allocation of people rather than a stockpiled resource', () => {
  const state = createInitialState()
  assert.equal('labor' in state.resources, false)
  assert.ok(BUILDING_FAMILIES.flatMap((family) => family.tiers).every((building) => !('labor' in building.cost)))
  const summary = workforceSummary(state)
  assert.equal(Object.values(summary.allocation).reduce((sum, value) => sum + value, 0), 100)
  assert.equal(Object.values(summary.counts).reduce((sum, value) => sum + value, 0), summary.allocatable)
})

test('ritual obligations reserve people before seasonal allocation', () => {
  const shrine = { instanceId: 's', buildingId: 'timber-shrine', familyId: 'shrine', name: 'Timber Shrine', districtId: 'palatine', tier: 1, condition: 100 }
  const project = { projectId: 'p', buildingId: 'podium-temple', familyId: 'shrine', name: 'Temple of Jupiter', districtId: 'capitoline' }
  const state = { ...createInitialState(), buildings: [shrine], projects: [project] }
  const burden = ritualWorkforceBurden(state)
  const summary = workforceSummary(state)
  assert.equal(burden.count, 44)
  assert.equal(burden.obligations.length, 2)
  assert.equal(summary.allocatable, summary.eligible - 44)
  assert.ok(summary.counts.works < workforceSummary(createInitialState()).counts.works)
})

test('moving households between fields works and levy changes real capacity', () => {
  const initial = createInitialState()
  const moreWorks = allocateWorkforce(allocateWorkforce(initial, 'works', 10), 'works', 10)
  assert.equal(moreWorks.workforceAllocation.works, 50)
  assert.equal(workforceSummary(moreWorks).constructionCapacity, 3)
  assert.ok(forecastSeason(moreWorks).resourceDelta.grain < forecastSeason(initial).resourceDelta.grain)
  const moreLevy = allocateWorkforce(initial, 'levy', 10)
  assert.ok(workforceSummary(moreLevy).readinessDelta > workforceSummary(initial).readinessDelta)
})

test('major works consume materials once and complete across seasons', () => {
  const stores = { grain: 50, timber: 50, stone: 50, bronze: 50, treasury: 50 }
  let state = { ...createInitialState(), resources: stores }
  state = placeBuilding(state, 'drainage', 'forum').state
  const ditchId = state.buildings[0].instanceId
  state = { ...state, era: 1, turn: 6, actionsUsed: 0, actionsMax: 4, council: null, councilResolved: true }
  const started = upgradeBuilding(state, ditchId)
  assert.equal(started.error, undefined)
  assert.equal(started.state.projects[0].progress, 1)
  assert.equal(started.state.buildings[0].buildingId, 'drainage-ditch')
  assert.equal(started.state.metrics.sanitation, state.metrics.sanitation)
  assert.equal(started.state.resources.stone, stores.stone - 4)
  const sameSeason = continueProject(started.state, started.state.projects[0].projectId)
  assert.match(sameSeason.error, /already received/i)
  const nextSeason = { ...started.state, turn: 7, actionsUsed: 0, actionsMax: 4 }
  const completed = continueProject(nextSeason, nextSeason.projects[0].projectId)
  assert.equal(completed.state.projects.length, 0)
  assert.equal(completed.state.buildings[0].buildingId, 'cloaca-works')
  assert.ok(completed.state.metrics.sanitation > state.metrics.sanitation)
})

test('paused projects preserve progress and eventually create an order burden', () => {
  const project = { projectId: 'test', buildingId: 'podium-temple', familyId: 'shrine', name: 'Temple of Jupiter', districtId: 'capitoline', requiredSeasons: 3, progress: 1, startedTurn: 4, lastWorkedTurn: 4, pausedSeasons: 1 }
  const state = { ...createInitialState(), turn: 6, council: null, councilResolved: true, projects: [project] }
  const result = advanceTurn(state)
  assert.equal(result.state.projects[0].progress, 1)
  assert.equal(result.state.projects[0].pausedSeasons, 2)
  assert.ok(forecastSeason(result.state).pressures.notes.some((note) => note.includes('paused major work')))
})

test('a unique major work cannot be started twice while construction is active', () => {
  const stores = { grain: 50, timber: 50, stone: 50, bronze: 50, treasury: 50 }
  let state = { ...createInitialState(), resources: stores }
  state = placeBuilding(state, 'drainage', 'forum').state
  const ditchId = state.buildings[0].instanceId
  state = { ...state, era: 1, turn: 6, actionsUsed: 0, actionsMax: 4 }
  state = upgradeBuilding(state, ditchId).state
  const duplicate = upgradeBuilding({ ...state, actionsUsed: 0 }, ditchId)
  assert.match(duplicate.error, /already underway|only one/i)
})

test('network overlays extend tier two water drainage and defense to linked districts', () => {
  const state = {
    ...createInitialState(),
    buildings: [
      { instanceId: 'w', familyId: 'water', districtId: 'palatine', tier: 2, condition: 100 },
      { instanceId: 'd', familyId: 'drainage', districtId: 'forum', tier: 2, condition: 100 },
      { instanceId: 'f', familyId: 'defense', districtId: 'quirinal', tier: 2, condition: 100 },
    ],
  }
  const coverage = networkCoverage(state)
  assert.ok(coverage.water.includes('aventine'))
  assert.ok(coverage.drainage.includes('tiber'))
  assert.ok(coverage.defense.includes('capitoline'))
  assert.equal(coverage.roads.length, 9)
})

test('storage and improved roads restore full market output', () => {
  const market = { instanceId: 'm', buildingId: 'cattle-market', familyId: 'market', districtId: 'tiber', tier: 1, condition: 100 }
  const disconnected = { ...createInitialState(), buildings: [market] }
  const connected = {
    ...disconnected,
    buildings: [
      market,
      { instanceId: 'g', buildingId: 'grain-pits', familyId: 'grain', districtId: 'aventine', tier: 1, condition: 100 },
      { instanceId: 'f', buildingId: 'timber-palisade', familyId: 'defense', districtId: 'tiber', tier: 1, condition: 100 },
    ],
  }
  assert.equal(districtNetworkReport(disconnected).tiber.marketOutputFactor, 0.5)
  assert.equal(districtNetworkReport(connected).tiber.marketOutputFactor, 1)
  assert.ok(forecastSeason(connected).resourceDelta.treasury > forecastSeason(disconnected).resourceDelta.treasury)
})

test('water drainage and an improved road support dense housing capacity', () => {
  const housing = { instanceId: 'h', buildingId: 'courtyard-housing', familyId: 'housing', districtId: 'palatine', tier: 2, condition: 100 }
  const unsupported = { ...createInitialState(), era: 1, buildings: [housing] }
  const supported = {
    ...unsupported,
    buildings: [
      housing,
      { instanceId: 'w', buildingId: 'lined-cistern', familyId: 'water', districtId: 'palatine', tier: 2, condition: 100 },
      { instanceId: 'd', buildingId: 'cloaca-works', familyId: 'drainage', districtId: 'forum', tier: 2, condition: 100 },
      { instanceId: 'f', buildingId: 'timber-palisade', familyId: 'defense', districtId: 'palatine', tier: 1, condition: 100 },
    ],
  }
  assert.equal(districtNetworkReport(unsupported).palatine.housingCapacityFactor, 0.55)
  assert.equal(districtNetworkReport(supported).palatine.housingCapacityFactor, 1)
  assert.equal(populationCapacity(supported).districts.palatine - populationCapacity(unsupported).districts.palatine, 189)
  assert.ok(forecastSeason(unsupported).pressures.notes.some((note) => note.includes('courtyard housing lacks')))
})

test('water and drainage materially lower dense-district disease and fire risk', () => {
  const population = { ...createInitialState().population, total: 1080, districts: { ...createInitialState().population.districts, palatine: 500 } }
  const exposed = {
    ...createInitialState(),
    population,
    buildings: [
      { instanceId: 'h', buildingId: 'round-huts', familyId: 'housing', districtId: 'palatine', tier: 1, condition: 100 },
      { instanceId: 'c', buildingId: 'kiln-smithy', familyId: 'workshop', districtId: 'palatine', tier: 1, condition: 100 },
    ],
  }
  const served = {
    ...exposed,
    buildings: [
      ...exposed.buildings,
      { instanceId: 'w', buildingId: 'lined-cistern', familyId: 'water', districtId: 'palatine', tier: 2, condition: 100 },
      { instanceId: 'd', buildingId: 'cloaca-works', familyId: 'drainage', districtId: 'forum', tier: 2, condition: 100 },
    ],
  }
  const exposedRisk = districtRiskReport(exposed).palatine
  const servedRisk = districtRiskReport(served).palatine
  assert.ok(servedRisk.disease <= exposedRisk.disease - 30)
  assert.ok(servedRisk.fire <= exposedRisk.fire - 20)
  assert.ok(projectPopulation(served).change.illness < projectPopulation(exposed).change.illness)
})

test('flood exposure responds to drainage coverage and floodplain occupation', () => {
  const exposed = { ...createInitialState(), turn: 4 }
  const prepared = {
    ...exposed,
    buildings: [{ instanceId: 'd', buildingId: 'cloaca-works', familyId: 'drainage', districtId: 'forum', tier: 2, condition: 100 }],
  }
  const exposedEvent = __test.timedEvent(exposed)
  const preparedEvent = __test.timedEvent(prepared)
  assert.ok(preparedEvent.resolvedRisk < exposedEvent.resolvedRisk)
  assert.ok(preparedEvent.damage < exposedEvent.damage)
  assert.ok(preparedEvent.populationLossRate < exposedEvent.populationLossRate)
})

test('severe fire exposure wears vulnerable district works', () => {
  const risks = { palatine: { fire: 90 } }
  const buildings = [
    { instanceId: 'h', familyId: 'housing', districtId: 'palatine', condition: 100 },
    { instanceId: 's', familyId: 'shrine', districtId: 'palatine', condition: 100 },
  ]
  const result = __test.applyFireExposure(buildings, risks)
  assert.equal(result.buildings[0].condition, 92)
  assert.equal(result.buildings[1].condition, 100)
  assert.equal(result.damaged.length, 1)
})

test('three distinct reference strategies complete Acts I-II at C or better', () => {
  const results = runAllReferenceStrategies()
  assert.equal(results.length, 3)
  assert.ok(results.every((result) => result.state.outcome === 'acts-complete'))
  assert.ok(results.every((result) => result.outcome.overall >= 70))
  assert.ok(results.every((result) => result.skipped.length === 0))
  const signatures = new Set(results.map((result) => result.state.actionLog.map((entry) => `${entry.turn}:${entry.type}:${entry.building}`).join('|')))
  assert.equal(signatures.size, 3)
})

test('a crowded opening can recover through completed service networks', () => {
  const result = runRecoveryStrategy()
  const early = result.snapshots[1]
  const final = result.snapshots.at(-1)
  assert.equal(result.state.outcome, 'acts-complete')
  assert.equal(result.skipped.length, 0)
  assert.ok(result.outcome.overall >= 70)
  assert.ok(final.maxDisease <= early.maxDisease - 20)
  assert.ok(final.maxFire < early.maxFire)
})

test('version three saves remove legacy labor and gain workforce and projects', () => {
  const old = { ...createInitialState(), version: 3, resources: { ...createInitialState().resources, labor: 99 } }
  delete old.workforceAllocation
  delete old.projects
  const migrated = migrateState(old)
  assert.equal(migrated.version, 10)
  assert.equal('labor' in migrated.resources, false)
  assert.equal(Object.values(migrated.workforceAllocation).reduce((sum, value) => sum + value, 0), 100)
  assert.deepEqual(migrated.projects, [])
})

test('version one saves migrate to the current population state', () => {
  const old = { ...createInitialState(), version: 1 }
  delete old.actionsUsed
  delete old.actionsMax
  delete old.actionLog
  const migrated = migrateState(old)
  assert.equal(migrated.version, 10)
  assert.equal(migrated.actionsMax, 2)
  assert.deepEqual(migrated.actionLog, [])
  assert.equal(migrated.population.total, 1030)
})

test('version two saves retain mechanics while gaining population', () => {
  const old = { ...createInitialState(), version: 2, actionsUsed: 1, actionLog: [{ type: 'build' }] }
  delete old.population
  const migrated = migrateState(old)
  assert.equal(migrated.version, 10)
  assert.equal(migrated.actionsUsed, 1)
  assert.equal(migrated.actionLog.length, 1)
  assert.equal(migrated.population.districts.palatine, 450)
})

test('the fifth season pauses for the City of Kings transition', () => {
  const state = {
    ...createInitialState(),
    turn: 5,
    council: { ...createInitialState().council, id: 'test-council' },
    councilResolved: true,
  }
  const result = advanceTurn(state)
  assert.equal(result.state.turn, 5)
  assert.equal(result.state.eraTransition, true)
  const transitioned = enterCityOfKings(result.state)
  assert.equal(transitioned.turn, 6)
  assert.equal(transitioned.era, 1)
})

test('the tenth season preserves its judgment and opens the republican transition', () => {
  const state = { ...createInitialState(), turn: 10, era: 1, council: null, councilResolved: true }
  const result = advanceTurn(state)
  assert.equal(result.state.outcome, 'acts-complete')
  assert.equal(result.state.republicTransition, true)
  const republic = enterEarlyRepublic(result.state)
  assert.equal(republic.turn, 11)
  assert.equal(republic.era, 2)
  assert.equal(republic.outcome, null)
  assert.equal(republic.council.id, 'expulsion-settlement')
  assert.deepEqual(republic.republic, createRepublicState())
})

test('annual office modes visibly constrain public works capacity', () => {
  const population = { ...createInitialState().population, workers: 700, craftsmen: 100, levyEligible: 200 }
  const base = { ...createInitialState(), era: 2, turn: 11, population, republic: createRepublicState(), workforceAllocation: { farming: 10, works: 80, levy: 10 } }
  const paired = { ...base, flags: { magistrateMode: 'paired' } }
  const senate = { ...base, flags: { magistrateMode: 'senate' } }
  const emergency = { ...base, flags: { magistrateMode: 'emergency' } }
  assert.equal(workforceSummary(paired).constructionCapacity, 2)
  assert.equal(workforceSummary(senate).constructionCapacity, 3)
  assert.equal(workforceSummary(emergency).constructionCapacity, 4)
})

test('heavy levy allocation raises visible household debt pressure', () => {
  const base = { ...createInitialState(), era: 2, turn: 12, republic: createRepublicState(), metrics: { ...createInitialState().metrics, food: 60 } }
  const ordinary = republicForecast({ ...base, workforceAllocation: { farming: 50, works: 30, levy: 20 } })
  const heavy = republicForecast({ ...base, workforceAllocation: { farming: 30, works: 30, levy: 40 } })
  assert.ok(heavy.changes.debtStrain >= ordinary.changes.debtStrain + 8)
  assert.ok(heavy.notes.some((note) => note.includes('field time')))
  assert.ok(heavy.projected.levyBurden > ordinary.projected.levyBurden)
})

test('the Saturn treasury requires republican works and Senate credit', () => {
  const comitium = { instanceId: 'c', buildingId: 'comitium', familyId: 'civic', name: 'Comitium', districtId: 'forum', tier: 3, condition: 100 }
  const stores = { grain: 50, timber: 50, stone: 50, bronze: 50, treasury: 50 }
  const weak = { ...createInitialState(), era: 2, turn: 12, republic: { ...createRepublicState(), senateStanding: 30 }, buildings: [comitium], resources: stores, actionsMax: 3 }
  const blocked = buildingAvailability(weak, 'treasury', 'forum')
  assert.equal(blocked.ok, false)
  assert.match(blocked.reason, /Senate standing/i)
  const supported = buildingAvailability({ ...weak, republic: { ...weak.republic, senateStanding: 55 } }, 'treasury', 'forum')
  assert.equal(supported.ok, true)
})

test('tribunes enter only through the 494 BC secession settlement', () => {
  assert.ok(getCouncil(11).options.every((option) => !option.impacts.flags?.tribunesEstablished))
  assert.ok(getCouncil(12).options.every((option) => !option.impacts.flags?.tribunesEstablished))
  const option = getCouncil(13).options.find((item) => item.id === 'recognize-tribunes')
  assert.equal(option.impacts.flags.tribunesEstablished, true)
})

test('council effects and records are deterministic', () => {
  const state = createInitialState()
  const a = resolveCouncil(state, 'oath')
  const b = resolveCouncil(state, 'oath')
  assert.deepEqual(a, b)
  assert.equal(a.choiceLog.length, 1)
  assert.equal(a.factions.allies, 58)
})

test('the royal works council grants one immediately usable capacity slot', () => {
  const council = getCouncil(5)
  const state = { ...createInitialState(), turn: 5, council, councilResolved: false, actionsUsed: 2 }
  const resolved = resolveCouncil(state, 'royal')
  assert.equal(resolved.actionsMax, 3)
  assert.equal(resolved.actionsMax - resolved.actionsUsed, 1)
})

test('final grades expose five independent measures', () => {
  const state = { ...createInitialState(), outcome: 'complete' }
  const result = calculateOutcome(state)
  assert.equal(Object.keys(result.grades).length, 5)
  assert.ok(result.grades['Urban Design'].grade)
  assert.ok(result.grades['Historical Continuity'].score >= 0)
})

test('a deterministic campaign can reach the Acts I-II judgment without a dead end', () => {
  let state = createInitialState()
  while (!state.outcome) {
    if (state.council && !state.councilResolved) state = resolveCouncil(state, state.council.options[0].id)
    const result = advanceTurn(state)
    assert.equal(result.error, undefined)
    state = result.state
    if (state.eraTransition) state = enterCityOfKings(state)
  }
  assert.equal(state.turn, 10)
  assert.equal(state.choiceLog.length, 5)
  assert.ok(state.population.total >= 100)
  assert.equal(calculateOutcome(state).grades['Civic Balance'].grade.length, 1)
})

test('a completed royal campaign can continue through the complete Early Republic act', () => {
  let state = createInitialState()
  while (!state.outcome) {
    if (state.council && !state.councilResolved) state = resolveCouncil(state, state.council.options[0].id)
    const result = advanceTurn(state)
    state = result.state
    if (state.eraTransition) state = enterCityOfKings(state)
  }
  state = enterEarlyRepublic(state)
  while (!state.outcome) {
    if (state.council && !state.councilResolved) state = resolveCouncil(state, state.council.options[0].id)
    state = advanceTurn(state).state
  }
  assert.equal(state.turn, 16)
  assert.equal(state.choiceLog.length, 11)
  assert.equal(state.flags.tribunesEstablished, true)
  assert.ok(state.republic.debtStrain >= 0)
  assert.ok(state.war.veiiPressure >= 0)
})

test('version five republican saves gain the deterministic war state', () => {
  const saved = { ...createInitialState(), version: 5, era: 2, turn: 14, republic: createRepublicState(), war: undefined }
  assert.deepEqual(migrateState(saved).war, createWarState())
})

test('a version five save completed at the old turn thirteen endpoint resumes Act III', () => {
  const saved = { ...createInitialState(), version: 5, era: 2, turn: 13, republic: createRepublicState(), council: getCouncil(13), councilResolved: true, outcome: 'complete' }
  const migrated = migrateState(saved)
  assert.equal(migrated.outcome, null)
  assert.deepEqual(migrated.war, createWarState())
  assert.equal(advanceTurn(migrated).state.turn, 14)
})

test('soldier pay trades treasury for siege persistence and household relief', () => {
  const base = { ...createInitialState(), era: 2, turn: 14, republic: createRepublicState(), war: createWarState(), workforceAllocation: { farming: 40, works: 25, levy: 35 } }
  const unpaid = warForecast(base)
  const paid = warForecast({ ...base, war: { ...base.war, soldierPay: 35 } })
  assert.equal(paid.resourceDelta.treasury, -2)
  assert.ok(paid.changes.siegePersistence > unpaid.changes.siegePersistence)
  assert.ok(paid.republicChanges.debtStrain < unpaid.republicChanges.debtStrain)
})

test('Veii supports three materially distinct settlements', () => {
  const base = { ...createInitialState(), era: 2, turn: 15, republic: createRepublicState(), war: createWarState(), council: getCouncil(15), councilResolved: false }
  const land = resolveCouncil(base, 'distribute-land')
  const tribute = resolveCouncil(base, 'tribute-settlement')
  const ritual = resolveCouncil(base, 'dedicate-and-break')
  assert.deepEqual([land.flags.veiiResolution, tribute.flags.veiiResolution, ritual.flags.veiiResolution], ['land-distribution', 'tribute-incorporation', 'ritual-destruction'])
  assert.ok(land.war.landExpectations > tribute.war.landExpectations)
  assert.ok(tribute.resources.treasury > land.resources.treasury)
  assert.ok(ritual.metrics.auspices > tribute.metrics.auspices)
})

test('the Gallic approach resolves from accumulated preparation', () => {
  const base = { ...createInitialState(), era: 2, turn: 16, republic: createRepublicState(), war: createWarState(), council: null, councilResolved: true }
  const prepared = { ...base, metrics: { ...base.metrics, readiness: 90, food: 80 }, war: { ...base.war, veteranCohesion: 85, gallicThreat: 10 }, flags: { gallicPlan: 'defense-in-depth' } }
  const exposed = { ...base, metrics: { ...base.metrics, readiness: 25, food: 30 }, republic: { ...base.republic, debtStrain: 80, levyBurden: 75 }, war: { ...base.war, veteranCohesion: 20, gallicThreat: 75 }, flags: { gallicPlan: 'field-battle' } }
  assert.ok(gallicReadiness(prepared).score >= gallicReadiness(exposed).score + 35)
  const preparedResult = advanceTurn(prepared)
  const exposedResult = advanceTurn(exposed)
  assert.equal(preparedResult.state.outcome, 'act-three-complete')
  assert.equal(exposedResult.state.outcome, 'act-three-complete')
  assert.equal(preparedResult.state.reconstructionTransition, true)
  assert.equal(preparedResult.state.flags.actThreeReadinessScore, preparedResult.report.resolvedRisk)
  assert.equal(preparedResult.state.flags.actThreeCrisisPosture, preparedResult.report.crisisPosture)
  assert.ok(preparedResult.report.metricDelta.order > exposedResult.report.metricDelta.order)
})

test('three Act III reference strategies complete cleanly at C or better', () => {
  const results = runAllActThreeStrategies()
  assert.equal(results.length, 3)
  assert.ok(results.every((result) => result.state.turn === 16 && result.state.outcome === 'act-three-complete'))
  assert.ok(results.every((result) => result.outcome.overall >= 70))
  assert.ok(results.every((result) => result.skipped.length === 0))
  assert.equal(new Set(results.map((result) => result.state.flags.veiiResolution)).size, 3)
})

test('a completed version four campaign migrates to a resumable republic transition', () => {
  const migrated = migrateState({ ...createInitialState(), version: 4, turn: 10, era: 1, outcome: 'complete' })
  assert.equal(migrated.version, 10)
  assert.equal(migrated.outcome, 'acts-complete')
  assert.equal(migrated.republicTransition, true)
  assert.equal(enterEarlyRepublic(migrated).turn, 11)
})

test('restoring a republican save preserves its annual office capacity cap', () => {
  const population = { ...createInitialState().population, workers: 700, craftsmen: 100, levyEligible: 200 }
  const saved = { ...createInitialState(), version: 5, era: 2, turn: 12, population, republic: createRepublicState(), flags: { magistrateMode: 'paired' }, workforceAllocation: { farming: 10, works: 80, levy: 10 }, actionsMax: 4 }
  assert.equal(migrateState(saved).actionsMax, 2)
})

test('prepared cities suffer less Gallic damage but never escape it entirely', () => {
  const building = (districtId) => ({ instanceId: districtId, buildingId: 'round-huts', familyId: 'housing', name: 'Round Huts', districtId, tier: 1, condition: 100 })
  const base = { ...createInitialState(), era: 2, turn: 16, republic: createRepublicState(), war: createWarState(), buildings: ['forum', 'tiber', 'palatine', 'aventine', 'quirinal', 'capitoline'].map(building), council: null, councilResolved: true }
  const prepared = { ...base, metrics: { ...base.metrics, readiness: 90, food: 80 }, war: { ...base.war, veteranCohesion: 85, gallicThreat: 10 }, flags: { gallicPlan: 'defense-in-depth' } }
  const exposed = { ...base, metrics: { ...base.metrics, readiness: 25, food: 30 }, republic: { ...base.republic, debtStrain: 80, levyBurden: 75 }, war: { ...base.war, veteranCohesion: 20, gallicThreat: 75 }, flags: { gallicPlan: 'field-battle' } }
  const preparedCrisis = gallicCrisis(prepared)
  const exposedCrisis = gallicCrisis(exposed)
  assert.ok(preparedCrisis.devastation > 0)
  assert.ok(exposedCrisis.devastation >= preparedCrisis.devastation + 25)
  const preparedAct = enterReconstruction(advanceTurn(prepared).state)
  const exposedAct = enterReconstruction(advanceTurn(exposed).state)
  assert.ok(preparedAct.buildings.find((item) => item.districtId === 'forum').condition < 100)
  assert.ok(exposedAct.buildings.find((item) => item.districtId === 'forum').condition < preparedAct.buildings.find((item) => item.districtId === 'forum').condition)
  assert.ok(exposedAct.buildings.find((item) => item.districtId === 'capitoline').condition >= 80)
  assert.ok(exposedAct.population.total < preparedAct.population.total)
})

test('rapid planned and militarized reconstruction retain distinct structural costs', () => {
  const base = { ...createInitialState(), era: 3, turn: 18, republic: createRepublicState(), war: createWarState(), reconstruction: createReconstructionState({ devastation: 60, displaced: 40, fireExposure: 45, wallUrgency: 60 }) }
  const rapid = reconstructionForecast({ ...base, flags: { reconstructionPolicy: 'rapid' } })
  const planned = reconstructionForecast({ ...base, flags: { reconstructionPolicy: 'planned' } })
  const militarized = reconstructionForecast({ ...base, flags: { reconstructionPolicy: 'militarized' } })
  assert.ok(rapid.changes.devastation < planned.changes.devastation)
  assert.ok(rapid.changes.fireExposure > planned.changes.fireExposure)
  assert.ok(militarized.changes.wallUrgency < rapid.changes.wallUrgency)
})

test('Tier IV works remain locked until reconstruction', () => {
  const stores = { grain: 50, timber: 50, stone: 50, bronze: 50, treasury: 50 }
  const base = { ...createInitialState(), resources: stores, actionsMax: 4, buildings: [{ instanceId: 'd', buildingId: 'cloaca-works', familyId: 'drainage', name: 'Cloaca Works', districtId: 'forum', tier: 2, condition: 100 }] }
  assert.notEqual(buildingAvailability({ ...base, era: 2 }, 'housing', 'palatine').building?.id, 'reconstructed-blocks')
  assert.equal(buildingAvailability({ ...base, era: 3, reconstruction: createReconstructionState() }, 'housing', 'palatine').building.id, 'reconstructed-blocks')
})

test('a version five save completed at turn sixteen opens reconstruction', () => {
  const saved = { ...createInitialState(), version: 5, era: 2, turn: 16, republic: createRepublicState(), war: createWarState(), outcome: 'complete' }
  const migrated = migrateState(saved)
  assert.equal(migrated.version, 10)
  assert.equal(migrated.outcome, 'act-three-complete')
  assert.equal(migrated.reconstructionTransition, true)
})

test('three Act IV recovery doctrines complete cleanly at C or better', () => {
  const results = runAllActFourStrategies()
  assert.equal(results.length, 3)
  assert.ok(results.every((result) => result.state.turn === 20 && result.state.outcome === 'act-four-complete' && result.state.regionalTransition))
  assert.ok(results.every((result) => result.outcome.overall >= 70))
  assert.ok(results.every((result) => result.skipped.length === 0))
  assert.equal(new Set(results.map((result) => result.state.flags.reconstructionPolicy)).size, 3)
  assert.equal(new Set(results.map((result) => result.state.flags.latinSettlement)).size, 3)
})

function regionalTestState() {
  return {
    ...createInitialState(),
    era: 4,
    turn: 21,
    council: null,
    councilResolved: true,
    outcome: null,
    regional: createRegionalState('differentiated-compacts'),
    resources: { grain: 50, timber: 50, stone: 50, bronze: 50, treasury: 50 },
    actionsMax: 3,
    actionsUsed: 0,
  }
}

test('regional roads consume shared capacity and require multiple seasons', () => {
  const state = regionalTestState()
  const started = startRegionalRoad(state, 'via-ostiensis')
  assert.equal(started.error, undefined)
  assert.equal(started.state.actionsUsed, 1)
  assert.equal(started.state.regional.roadProjects[0].progress, 1)
  assert.ok(started.state.resources.stone < state.resources.stone)
  const nextSeason = { ...started.state, turn: 22, actionsUsed: 0 }
  const completed = continueRegionalRoad(nextSeason, 'via-ostiensis')
  assert.ok(completed.state.regional.roads.includes('via-ostiensis'))
  assert.equal(completed.state.regional.roadProjects.length, 0)
})

test('roads improve supply and trade while also opening hostile access', () => {
  let state = regionalTestState()
  state = startRegionalRoad(state, 'via-ostiensis').state
  state = continueRegionalRoad({ ...state, turn: 22, actionsUsed: 0 }, 'via-ostiensis').state
  const forecast = regionalForecast(state)
  assert.ok(forecast.roadSupply > 0)
  assert.ok(forecast.roadTrade > 0)
  assert.ok(forecast.hostileAccess > 0)
})

test('a colony consumes city population and stores and adds a garrison obligation', () => {
  const state = regionalTestState()
  const result = foundRegionalColony(state, 'antium')
  assert.equal(result.error, undefined)
  assert.ok(result.state.population.total < state.population.total)
  assert.ok(result.state.resources.grain < state.resources.grain)
  assert.equal(result.state.regional.colonies[0].communityId, 'antium')
  assert.ok(result.state.regional.colonies[0].garrison > 0)
})

test('regional political status tracks autonomy and military duty independently', () => {
  const state = regionalTestState()
  const before = state.regional.communities.tibur
  const result = reviseRegionalCompact(state, 'tibur', 'partialCitizens')
  const after = result.state.regional.communities.tibur
  assert.ok(after.militaryContribution > before.militaryContribution)
  assert.ok(after.autonomy < before.autonomy)
  assert.notEqual(after.tradeAccess, after.militaryContribution)
})

test('unsupported regional commitments produce overextension', () => {
  const state = regionalTestState()
  const colonies = Array.from({ length: 9 }, (_, index) => ({ communityId: `test-${index}`, settlers: 60, garrison: 20 }))
  const strained = { ...state, resources: { grain: 0, timber: 0, stone: 0, bronze: 0, treasury: 0 }, regional: { ...state.regional, colonies, administrationBurden: 30, garrisonDemand: 20 } }
  assert.ok(regionalForecast(strained).overextension >= 45)
})

test('three regional doctrines finish with viable but distinct compacts', () => {
  const results = runAllRegionalStrategies()
  assert.equal(results.length, 3)
  assert.ok(results.every((result) => result.state.turn === 23 && result.state.outcome === 'regional-complete' && result.state.italianTransition))
  assert.ok(results.every((result) => result.regionalScore.score >= 70 && result.skipped.length === 0))
  assert.equal(new Set(results.map((result) => result.state.flags.regionalDoctrine)).size, 3)
  assert.ok(results.every((result) => calculateRegionalScore(result.state).forecast.overextension < 45))
})

test('Act V chronology runs from the Samnite opening through the 264 BC threshold', () => {
  assert.deepEqual(TURN_YEARS.slice(20, 29), [338, 326, 321, 312, 304, 295, 280, 275, 264])
  assert.equal(getCouncil(23).id, 'regional-obligations')
  assert.match(getCouncil(23).title, /Caudine/i)
  assert.equal(getCouncil(29).id, 'mediterranean-threshold')
})

test('version seven regional completion migrates to the Italian transition', () => {
  const saved = {
    ...createInitialState(),
    version: 7,
    era: 4,
    turn: 23,
    outcome: 'complete',
    regional: createRegionalState('differentiated-compacts'),
    italianTransition: undefined,
  }
  const migrated = migrateState(saved)
  assert.equal(migrated.version, 10)
  assert.equal(migrated.outcome, 'regional-complete')
  assert.equal(migrated.italianTransition, true)
  assert.equal(migrated.turn, 23)
  assert.ok(migrated.regional)
})

function italianTestState() {
  const regional = createRegionalState('differentiated-compacts')
  return {
    ...createInitialState(),
    era: 5,
    turn: 24,
    council: getCouncil(24),
    councilResolved: false,
    outcome: null,
    regional,
    italian: createItalianState(regional, 'preserve-army'),
    resources: { grain: 50, timber: 50, stone: 50, bronze: 50, treasury: 50 },
    actionsMax: 2,
    actionsUsed: 0,
  }
}

test('Appian works compete for shared capacity and require three distinct seasons', () => {
  let state = resolveCouncil(italianTestState(), 'road-first')
  state = workItalianProject(state, 'viaAppia').state
  assert.equal(state.italian.projects.viaAppia.progress, 1)
  assert.equal(state.actionsUsed, 1)
  const blocked = workItalianProject(state, 'viaAppia')
  assert.match(blocked.error, /already received/i)
  state = workItalianProject(state, 'aquaAppia').state
  assert.equal(state.actionsUsed, 2)
  assert.equal(italianProjectAvailability(state, 'aquaAppia').ok, false)
  state = { ...state, turn: 25, actionsUsed: 0 }
  state = workItalianProject(state, 'viaAppia').state
  state = { ...state, turn: 26, actionsUsed: 0 }
  state = workItalianProject(state, 'viaAppia').state
  assert.equal(state.italian.projects.viaAppia.completed, true)
  assert.ok(state.regional.roads.includes('appian-corridor'))
  assert.ok(state.italian.hostileAccess > 0)
})

test('Aqua Appia increases water capacity and creates maintenance debt', () => {
  let state = resolveCouncil(italianTestState(), 'water-first')
  for (const turn of [24, 25, 26]) {
    state = { ...state, turn, actionsUsed: 0 }
    state = workItalianProject(state, 'aquaAppia').state
  }
  assert.equal(state.italian.projects.aquaAppia.completed, true)
  assert.ok(state.italian.waterCapacity >= 18)
  assert.ok(state.italian.maintenanceDebt >= 6)
  assert.ok(state.metrics.water > italianTestState().metrics.water)
  assert.ok(italianForecast(state).resourceDelta.treasury < 0)
})

test('the deterministic Act V engine reaches a complete 264 BC endpoint', () => {
  const regional = createRegionalState('differentiated-compacts')
  let state = enterItalianStrategy({
    ...createInitialState(),
    era: 4,
    turn: 23,
    council: getCouncil(23),
    councilResolved: true,
    outcome: 'regional-complete',
    italianTransition: true,
    regional,
    flags: { caudineResponse: 'preserve-army' },
    resources: { grain: 60, timber: 50, stone: 60, bronze: 50, treasury: 60 },
  })
  const choices = ['road-first', 'bounded-peace', 'divide-coalition', 'learn-and-reform', 'refuse-terms', 'italian-consolidation']
  const projects = ['viaAppia', 'aquaAppia', 'viaAppia', 'aquaAppia', 'viaAppia', 'aquaAppia']
  for (let index = 0; index < choices.length; index += 1) {
    state = resolveCouncil(state, choices[index])
    state = workItalianProject(state, projects[index]).state
    const advanced = advanceTurn(state)
    assert.equal(advanced.error, undefined)
    state = advanced.state
  }
  assert.equal(state.turn, 29)
  assert.equal(state.outcome, 'complete')
  assert.equal(state.italian.projects.viaAppia.completed, true)
  assert.equal(state.italian.projects.aquaAppia.completed, true)
})

test('Italian System grading appears only after the Act V state exists', () => {
  assert.equal(calculateOutcome(createInitialState()).grades['Italian System'], undefined)
  const regional = createRegionalState('differentiated-compacts')
  const italian = {
    ...createItalianState(regional, 'preserve-army'),
    samnitePressure: 18,
    allianceDepth: 78,
    campaignPersistence: 82,
    reserveDepth: 76,
    coalitionRisk: 20,
    pyrrhicPressure: 12,
    maintenanceDebt: 14,
    waterCapacity: 24,
    projects: {
      viaAppia: { id: 'viaAppia', progress: 3, requiredSeasons: 3, completed: true, lastWorkedTurn: 28 },
      aquaAppia: { id: 'aquaAppia', progress: 3, requiredSeasons: 3, completed: true, lastWorkedTurn: 29 },
    },
  }
  const state = { ...createInitialState(), era: 5, turn: 29, regional, italian, outcome: 'complete' }
  assert.ok(calculateItalianScore(state).score >= 70)
  assert.equal(calculateOutcome(state).grades['Italian System'].score, calculateItalianScore(state).score)
})

test('campaign export records Appian works and the 264 BC doctrine', () => {
  const regional = createRegionalState('differentiated-compacts')
  const italian = createItalianState(regional, 'preserve-army')
  italian.projects.viaAppia = { ...italian.projects.viaAppia, progress: 3, completed: true }
  const state = {
    ...createInitialState(),
    era: 5,
    turn: 29,
    regional,
    italian,
    flags: { caudineResponse: 'preserve-army', appianPriority: 'road', mediterraneanDoctrine: 'consolidate' },
  }
  const markdown = campaignMarkdown(state)
  assert.match(markdown, /## Roads to Italy/)
  assert.match(markdown, /Via Appia: complete/)
  assert.match(markdown, /Aqua Appia: 0\/3 seasons/)
  assert.match(markdown, /Mediterranean doctrine: consolidate/)
  assert.match(markdown, /Italian System score:/)
})

test('four Act V strategies finish both Appian works across every available doctrine', () => {
  const results = runAllActFiveStrategies()
  assert.equal(results.length, 4)
  assert.ok(results.every((result) => result.state.turn === 29 && result.state.outcome === 'complete'))
  assert.ok(results.every((result) => result.skipped.length === 0))
  assert.ok(results.every((result) => result.italianScore.score >= 70))
  assert.ok(results.every((result) => Object.values(result.state.italian.projects).every((project) => project.completed)))
  assert.equal(new Set(results.map((result) => result.state.flags.appianPriority)).size, 3)
  assert.equal(new Set(results.map((result) => result.state.flags.mediterraneanDoctrine)).size, 3)
})

test('Batch 5 building art uses exact mappings for every rendered Early Republic asset', () => {
  assert.equal(artForBuilding('comitium'), '/images/buildings/comitium-v1.png')
  assert.equal(artForBuilding('saturn-treasury'), '/images/buildings/saturn-treasury-v1.png')
  assert.equal(artForBuilding('circuit-fortification'), '/images/buildings/circuit-fortification-v1.png')
  assert.equal(artForBuilding('street-courtyards'), '/images/buildings/ordered-street-courts-v1.png')
  assert.equal(artForBuilding('public-cisterns'), '/images/buildings/public-cisterns-v1.png')
  assert.equal(artForBuilding('public-granary'), '/images/buildings/public-granary-v1.png')
  assert.equal(artForBuilding('contracted-craft-yards'), '/images/buildings/contracted-craft-yards-v1.png')
})

test('all mapped building art paths are unique and exist under public', () => {
  const paths = Object.values(BUILDING_ART)
  assert.equal(new Set(paths).size, paths.length)
  for (const assetPath of paths) {
    assert.ok(assetPath.startsWith('/images/buildings/'))
    assert.ok(existsSync(resolve(process.cwd(), 'public', assetPath.slice(1))), assetPath)
  }
})

test('version-eight endpoint migration remains opt-in', () => {
  const endpoint = runAllActFiveStrategies()[0].state
  const migrated = migrateState({ ...endpoint, version: 8 })
  assert.equal(migrated.turn, 29)
  assert.equal(migrated.outcome, 'complete')
  assert.equal(migrated.mediterraneanTransition, false)
})

test('core ending is complete until explicit opt-in', () => {
  const endpoint = runAllActFiveStrategies()[0].state
  assert.equal(continueToMediterranean(endpoint).mediterraneanTransition, true)
})

test('frozen core judgment is immutable', () => {
  const endpoint = runAllActFiveStrategies()[0].state
  const continued = enterMediterranean(continueToMediterranean(endpoint))
  assert.equal(continued.coreJudgment.turn, 29)
  assert.equal(continued.coreJudgment.year, 264)
  assert.equal(continued.coreJudgment.choiceLogLength, endpoint.choiceLog.length)
})

function mediterraneanOpeningEndpoint() {
  let state = enterMediterranean(continueToMediterranean(runAllActFiveStrategies()[0].state))
  for (const [turn, optionId] of [[30, 'allied-hulls'], [31, 'pilotage-exchange'], [32, 'local-compact']]) {
    assert.equal(state.turn, turn)
    state = resolveCouncil(state, optionId)
    state = advanceTurn(state).state
  }
  return state
}

test('turn thirty-two opens a visible bridge without exposing the final outcome', () => {
  const state = mediterraneanOpeningEndpoint()
  assert.equal(state.turn, 32)
  assert.equal(state.outcome, 'mediterranean-opening-complete')
  assert.equal(state.hannibalicTransition, true)
  assert.ok(calculateOutcome(state).grades['Mediterranean Opening'])
})

test('version nine Mediterranean endpoint migrates to the Hannibalic bridge', () => {
  const old = { ...mediterraneanOpeningEndpoint(), version: 9, outcome: 'mediterranean-complete', hannibalicTransition: undefined }
  const migrated = migrateState(old)
  assert.equal(migrated.version, 10)
  assert.equal(migrated.turn, 32)
  assert.equal(migrated.outcome, 'mediterranean-opening-complete')
  assert.equal(migrated.hannibalicTransition, true)
  assert.equal(migrated.chronologyBridges.length, 0)
})

test('interwar bridge is idempotent and preserves the frozen core judgment', () => {
  const endpoint = mediterraneanOpeningEndpoint()
  const frozen = structuredClone(endpoint.coreJudgment)
  const bridged = enterHannibalicEmergency(endpoint)
  assert.equal(bridged.turn, 33)
  assert.equal(bridged.chronologyBridges.length, 1)
  assert.deepEqual(bridged.coreJudgment, frozen)
  assert.strictEqual(enterHannibalicEmergency(bridged), bridged)
  assert.deepEqual(bridged.choiceLog.slice(0, endpoint.choiceLog.length), endpoint.choiceLog)
})

test('an early decisive battle exposes more reserve and allies than containment', () => {
  const base = enterHannibalicEmergency(mediterraneanOpeningEndpoint())
  const decision = mediterraneanForecast({ ...base, flags: { ...base.flags, hannibalPosture: 'decision' } })
  const contain = mediterraneanForecast({ ...base, flags: { ...base.flags, hannibalPosture: 'contain' } })
  const compacts = mediterraneanForecast({ ...base, flags: { ...base.flags, hannibalPosture: 'compacts' } })
  assert.ok(decision.changes.emergencyReserve < contain.changes.emergencyReserve)
  assert.ok(contain.changes.emergencyReserve < compacts.changes.emergencyReserve)
  assert.ok(decision.changes.alliedExhaustion > contain.changes.alliedExhaustion)
})

test('all Hannibalic councils expose three bounded courses', () => {
  const expected = new Map([[33, 'hannibal-enters-italy'], [34, 'after-cannae'], [35, 'allied-endurance'], [36, 'victory-and-return']])
  for (const [turn, id] of expected) {
    assert.equal(getCouncil(turn).id, id)
    assert.equal(getCouncil(turn).options.length, 3)
  }
})

test('Act VI completes at 201 BC with a separated chronicle', () => {
  const result = runAllMediterraneanStrategies()[0]
  assert.equal(result.state.turn, 36)
  assert.equal(result.state.outcome, 'mediterranean-complete')
  assert.match(result.outcome.title, /Mediterranean/i)
  assert.ok(result.outcome.grades['Mediterranean Republic'])
  const chronicle = campaignMarkdown(result.state)
  assert.match(chronicle, /Frozen 264 BC Core Judgment/)
  assert.match(chronicle, /Interwar Bridge: 241-218 BC/)
  assert.match(chronicle, /## Mediterranean Republic/)
})

test('historical context covers every Mediterranean turn', () => {
  for (const turn of [30, 31, 32, 33, 34, 35, 36]) assert.ok(HISTORICAL_NOTES.some((note) => note.turns.includes(turn)))
})

test('three continuation strategies finish without skips and expose distinct ledgers', () => {
  const results = runAllMediterraneanStrategies()
  assert.equal(results.length, 3)
  assert.ok(results.every((result) => result.state.turn === 36 && result.state.outcome === 'mediterranean-complete' && result.skipped.length === 0))
  assert.ok(results.every((result) => result.outcome.overall >= 60))
  assert.ok(results.every((result) => result.state.choiceLog.filter((entry) => entry.turn >= 30).length === 7))
  assert.equal(new Set(results.map((result) => JSON.stringify(result.ledger))).size, 3)
  assert.equal(new Set(results.map((result) => JSON.stringify(result.state.choiceLog.filter((entry) => entry.turn >= 33).map((entry) => entry.optionId)))).size, 3)
})

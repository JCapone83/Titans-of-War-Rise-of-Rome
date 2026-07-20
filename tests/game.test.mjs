import test from 'node:test'
import assert from 'node:assert/strict'
import { createAugustanProjects, createAugustanState, createCivilSettlementState, createImperialCapitalProjects, createImperialCapitalState, createInitialState, createTrajanicCapitalProjects, createTrajanicCapitalState, createItalianState, createMediterraneanState, createMetropolitanProjects, createMetropolitanState, createReconstructionState, createRegionalState, createRepublicState, createRepublicStrainState, createWarState, migrateState } from '../src/game/initialState.js'
import { AUGUSTAN_PROJECTS, BUILDING_FAMILIES, CIVIL_SETTLEMENT_PROJECTS, ERAS, IMPERIAL_CAPITAL_PROJECTS, MEDITERRANEAN_PROJECTS, METROPOLITAN_PROJECTS, REPUBLIC_STRAIN_PROJECTS, TRAJANIC_CAPITAL_PROJECTS, TURN_YEARS, formatYear, getCouncil, getObjective } from '../src/game/data.js'
import { __test, advanceTurn, allocateWorkforce, augustanCapitalSystems, augustanCityForecast, augustanProjectAvailability, buildingAvailability, civilSettlementForecast, civilSettlementProjectAvailability, continueProject, continueRegionalRoad, districtNetworkReport, districtRiskReport, enterCityOfKings, enterEarlyRepublic, enterItalianStrategy, enterReconstruction, forecastSeason, foundRegionalColony, gallicCrisis, gallicReadiness, imperialCapitalForecast, imperialCapitalSystems, imperialProjectAvailability, italianForecast, italianProjectAvailability, mediterraneanForecast, mediterraneanProjectAvailability, metropolitanForecast, metropolitanProjectAvailability, networkCoverage, placeBuilding, populationCapacity, projectPopulation, reconstructionForecast, regionalForecast, removeBuilding, repairBuilding, republicForecast, republicStrainForecast, republicStrainProjectAvailability, resolveCouncil, reviseRegionalCompact, ritualWorkforceBurden, siteAnalysis, startRegionalRoad, trajanicCapitalForecast, trajanicCapitalSystems, trajanicProjectAvailability, upgradeBuilding, warForecast, workforceSummary, workAugustanProject, workCivilSettlementProject, workImperialProject, workItalianProject, workMediterraneanProject, workMetropolitanProject, workRepublicStrainProject, workTrajanicProject } from '../src/game/simulation.js'
import { calculateAugustanCityScore, calculateCivilSettlementScore, calculateImperialCapitalScore, calculateItalianScore, calculateMetropolitanScore, calculateOutcome, calculateRegionalScore, calculateRepublicStrainScore, calculateTrajanicCapitalScore } from '../src/game/outcomes.js'
import { campaignMarkdown } from '../src/game/campaignExport.js'
import { TRAJANIC_CAPITAL_STRATEGIES, runAllActFiveStrategies, runAllActFourStrategies, runAllActThreeStrategies, runAllAugustanCityStrategies, runAllCivilSettlementStrategies, runAllImperialCapitalStrategies, runAllMediterraneanStrategies, runAllMetropolitanOpeningStrategies, runAllMetropolitanStrategies, runAllReferenceStrategies, runAllRegionalStrategies, runAllRepublicStrainStrategies, runAllTrajanicCapitalStrategies, runRecoveryStrategy } from '../src/game/referenceStrategies.js'
import { continueToAugustanCity, continueToCivilSettlement, continueToImperialCapital, continueToTrajanicCapital, enterTrajanicCapital, continueToMediterranean, continueToMetropolis, continueToRepublicUnderStrain, enterAugustanCity, enterCivilSettlement, enterHannibalicEmergency, enterImperialCapital, enterMediterranean, enterMetropolis, enterRepublicUnderStrain } from '../src/game/continuation.js'
import { HISTORICAL_NOTES, notesForTurn } from '../src/game/historicalContext.js'
import { BUILDING_ART, artForBuilding } from '../src/game/buildingArt.js'
import { AUGUSTAN_PROJECT_ART, AUGUSTAN_PROJECT_SITES, CIVIL_SETTLEMENT_PROJECT_ART, IMPERIAL_PROJECT_ART, TRAJANIC_PROJECT_ART, artForAugustanProject, artForCivilSettlementProject, artForImperialProject, artForTrajanicProject, augustanCapitalLandmarks, augustanProjectStage, civilSettlementProjectStage } from '../src/game/projectArt.js'
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
  assert.equal(migrated.version, 16)
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
  assert.equal(migrated.version, 16)
  assert.equal(migrated.actionsMax, 2)
  assert.deepEqual(migrated.actionLog, [])
  assert.equal(migrated.population.total, 1030)
})

test('version two saves retain mechanics while gaining population', () => {
  const old = { ...createInitialState(), version: 2, actionsUsed: 1, actionLog: [{ type: 'build' }] }
  delete old.population
  const migrated = migrateState(old)
  assert.equal(migrated.version, 16)
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
  assert.equal(migrated.version, 16)
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
  assert.equal(migrated.version, 16)
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
  assert.equal(migrated.version, 16)
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
  assert.equal(migrated.version, 16)
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

test('Act VI public works share capacity and enforce their prerequisites', () => {
  const endpoint = runAllActFiveStrategies()[0].state
  let state = enterMediterranean(continueToMediterranean(endpoint))
  state = { ...state, actionsMax: 4, actionsUsed: 0, resources: { grain: 50, timber: 50, stone: 50, bronze: 50, treasury: 50 } }
  assert.deepEqual(Object.keys(MEDITERRANEAN_PROJECTS).sort(), ['appianApproach', 'republicanCircus', 'republicanHorrea', 'tiberEmporium'])
  assert.equal(mediterraneanProjectAvailability(state, 'republicanHorrea').available, false)
  const worked = workMediterraneanProject(state, 'tiberEmporium').state
  assert.equal(worked.actionsUsed, 1)
  assert.equal(worked.mediterranean.projects.tiberEmporium.progress, 1)
  assert.equal(mediterraneanProjectAvailability(worked, 'tiberEmporium').available, false)
})

test('Mediterranean projects migrate and survive councils and the interwar bridge', () => {
  const legacy = { ...createInitialState(), version: 10, era: 6, turn: 30, mediterranean: { fleetCapacity: 20 } }
  const migrated = migrateState(legacy)
  assert.deepEqual(migrated.mediterranean.projects, createMediterraneanState().projects)
  let state = enterMediterranean(continueToMediterranean(runAllActFiveStrategies()[0].state))
  state = { ...state, resources: { grain: 50, timber: 50, stone: 50, bronze: 50, treasury: 50 } }
  state = workMediterraneanProject(state, 'tiberEmporium').state
  state = resolveCouncil(state, 'allied-hulls')
  assert.equal(state.mediterranean.projects.tiberEmporium.progress, 1)
  state = advanceTurn(state).state
  for (const optionId of ['pilotage-exchange', 'local-compact']) {
    state = resolveCouncil(state, optionId)
    state = advanceTurn(state).state
  }
  state = enterHannibalicEmergency(state)
  assert.equal(state.mediterranean.projects.tiberEmporium.progress, 1)
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

test('Act VII starts only through the explicit 201-200 BC bridge', () => {
  const actSix = runAllMediterraneanStrategies()[0].state
  assert.equal(actSix.outcome, 'mediterranean-complete')
  const pending = continueToMetropolis(actSix)
  assert.equal(pending.metropolitanTransition, true)
  const entered = enterMetropolis(pending)
  assert.equal(entered.turn, 37)
  assert.equal(entered.era, 7)
  assert.deepEqual(entered.metropolitan, createMetropolitanState())
  assert.deepEqual(entered.mediterranean.projects, actSix.mediterranean.projects)
  assert.deepEqual(entered.coreJudgment, actSix.coreJudgment)
  assert.equal(entered.chronologyBridges.at(-1).fromYear, 201)
  assert.equal(entered.chronologyBridges.at(-1).toYear, 200)
})

test('Act VII opening councils preserve twelve bounded metropolitan measures and project state', () => {
  let state = enterMetropolis(continueToMetropolis(runAllMediterraneanStrategies()[0].state))
  for (const [turn, optionId] of [[37, 'retire-debt-and-water'], [38, 'public-records-and-hearings'], [39, 'audited-commands']]) {
    assert.equal(state.turn, turn)
    state = resolveCouncil(state, optionId)
    state = advanceTurn(state).state
  }
  assert.equal(state.turn, 40)
  assert.equal(state.outcome, null)
  assert.equal(Object.keys(state.metropolitan).filter((key) => key !== 'projects').length, 12)
  assert.ok(Object.entries(state.metropolitan).filter(([key]) => key !== 'projects').every(([, value]) => value >= 0 && value <= 100))
  assert.deepEqual(Object.keys(state.metropolitan.projects).sort(), Object.keys(METROPOLITAN_PROJECTS).sort())
  assert.match(campaignMarkdown(state), /## Conquest and Metropolis/)
})

test('three Act VII opening doctrines reach the 146 BC council without skipped decisions', () => {
  const results = runAllMetropolitanOpeningStrategies()
  assert.equal(results.length, 3)
  assert.ok(results.every((result) => result.state.turn === 40 && result.state.outcome === null))
  assert.ok(results.every((result) => result.skipped.length === 0))
  assert.equal(new Set(results.map((result) => result.state.choiceLog.filter((entry) => entry.turn >= 37).map((entry) => entry.optionId).join(','))).size, 3)
})

test('metropolitan works share capacity, preserve prerequisites, and expose upkeep', () => {
  let state = enterMetropolis(continueToMetropolis(runAllMediterraneanStrategies()[0].state))
  state = { ...state, actionsMax: 4, actionsUsed: 0, resources: { grain: 100, timber: 100, stone: 100, bronze: 100, treasury: 100 } }
  state.mediterranean.projects.tiberEmporium.completed = false
  state.italian.projects.aquaAppia.completed = false
  assert.equal(metropolitanProjectAvailability(state, 'regulatedMacellum').available, false)
  assert.equal(metropolitanProjectAvailability(state, 'aquaMarcia').available, false)
  assert.equal(metropolitanProjectAvailability(state, 'civicPorticoes').available, false)
  state = workMetropolitanProject(state, 'republicanBasilica').state
  assert.equal(state.actionsUsed, 1)
  assert.equal(state.metropolitan.projects.republicanBasilica.progress, 1)
  assert.equal(metropolitanProjectAvailability(state, 'republicanBasilica').available, false)
  for (let turn = 38; turn <= 40; turn += 1) {
    state = { ...state, turn, actionsUsed: 0 }
    state = workMetropolitanProject(state, 'republicanBasilica').state
  }
  assert.equal(state.metropolitan.projects.republicanBasilica.completed, true)
  assert.equal(metropolitanProjectAvailability(state, 'civicPorticoes').available, true)
  assert.deepEqual(metropolitanForecast(state).publicWorks.completed, ['republicanBasilica'])
})

test('version 11 metropolitan saves migrate missing project ledgers', () => {
  const saved = { ...createInitialState(), version: 11, era: 7, turn: 39, metropolitan: { urbanMigration: 31 } }
  const migrated = migrateState(saved)
  assert.equal(migrated.metropolitan.urbanMigration, 31)
  assert.deepEqual(migrated.metropolitan.projects, createMetropolitanProjects())
})

test('three Act VII strategies reach 133 BC with distinct viable public works portfolios', () => {
  const results = runAllMetropolitanStrategies()
  assert.equal(results.length, 3)
  assert.ok(results.every((result) => result.state.turn === 41 && result.state.outcome === 'metropolitan-complete'))
  assert.ok(results.every((result) => result.skipped.length === 0 && result.outcome.overall >= 60 && calculateMetropolitanScore(result.state).score >= 60))
  assert.ok(results.every((result) => result.state.choiceLog.filter((entry) => entry.turn >= 37).length === 5))
  assert.equal(new Set(results.map((result) => Object.entries(result.state.metropolitan.projects).filter(([, project]) => project.progress > 0).map(([id]) => id).sort().join(','))).size, 3)
  assert.match(campaignMarkdown(results[0].state), /### Metropolitan Public Works/)
})

test('historical context covers the complete metropolitan act', () => {
  for (const turn of [37, 38, 39, 40, 41]) assert.ok(HISTORICAL_NOTES.some((note) => note.turns.includes(turn)))
})

test('Act VIII starts only through the explicit 133-121 BC bridge', () => {
  const completed = runAllMetropolitanStrategies()[0].state
  assert.equal(completed.turn, 41)
  assert.equal(completed.outcome, 'metropolitan-complete')
  assert.equal(enterRepublicUnderStrain(completed), completed)
  const pending = continueToRepublicUnderStrain(completed)
  assert.equal(pending.strainTransition, true)
  assert.equal(pending.outcome, 'metropolitan-complete')
  const entered = enterRepublicUnderStrain(pending)
  assert.equal(entered.turn, 42)
  assert.equal(entered.era, 8)
  assert.equal(entered.outcome, null)
  assert.equal(entered.council.id, 'land-commission-and-grain')
  assert.ok(entered.chronologyBridges.some((bridge) => bridge.id === 'gracchan-conflicts' && bridge.fromYear === 133 && bridge.toYear === 121))
})

test('late-Republic civic works enforce dates and inherited prerequisites', () => {
  const completed = runAllMetropolitanStrategies()[0].state
  let state = enterRepublicUnderStrain(continueToRepublicUnderStrain(completed))
  state = { ...state, resources: { grain: 50, timber: 50, stone: 50, bronze: 20, treasury: 50 }, actionsMax: 4 }
  assert.equal(republicStrainProjectAvailability(state, 'tabularium').available, false)
  assert.match(republicStrainProjectAvailability(state, 'tabularium').reason, /82 BC/)
  assert.equal(republicStrainProjectAvailability(state, 'landCensusRegistry').available, true)
  const worked = workRepublicStrainProject(state, 'landCensusRegistry').state
  assert.equal(worked.republicStrain.projects.landCensusRegistry.progress, 1)
  assert.equal(worked.actionsUsed, 1)
  assert.ok(worked.resources.timber < state.resources.timber)
})

test('completed late-Republic works add visible recurring burdens', () => {
  const projects = Object.fromEntries(Object.keys(REPUBLIC_STRAIN_PROJECTS).map((id) => [id, { id, progress: 0, requiredSeasons: REPUBLIC_STRAIN_PROJECTS[id].seasons, completed: id === 'watchStations', lastWorkedTurn: null }]))
  const state = { ...createInitialState(), era: 8, turn: 47, republicStrain: { ...createRepublicStrainState(), projects } }
  const forecast = republicStrainForecast(state)
  assert.deepEqual(forecast.publicWorks.completed, ['watchStations'])
  assert.equal(forecast.resourceDelta.treasury, -1)
  assert.ok(forecast.projected.urbanFireResponse > state.republicStrain.urbanFireResponse)
})

test('version 11 late-Republic saves migrate missing ledgers and projects', () => {
  const saved = { ...createInitialState(), version: 11, era: 8, turn: 45, republicStrain: { archiveIntegrity: 63 } }
  const migrated = migrateState(saved)
  assert.equal(migrated.version, 16)
  assert.equal(migrated.republicStrain.archiveIntegrity, 63)
  assert.deepEqual(Object.keys(migrated.republicStrain.projects), Object.keys(REPUBLIC_STRAIN_PROJECTS))
})

test('three Act VIII strategies reach 49 BC with distinct viable settlements', () => {
  const results = runAllRepublicStrainStrategies()
  assert.equal(results.length, 3)
  assert.equal(new Set(results.map((result) => result.state.flags.italianSettlement)).size >= 2, true)
  for (const result of results) {
    assert.equal(result.state.turn, 48)
    assert.equal(result.state.outcome, 'republic-strain-complete')
    assert.equal(result.state.choiceLog.length, 43)
    assert.equal(result.skipped.length, 0, JSON.stringify(result.skipped))
    assert.ok(result.strainScore.score >= 60, `${result.strategy.name}: ${result.strainScore.score}`)
    assert.ok(result.outcome.overall >= 60, `${result.strategy.name}: ${result.outcome.overall}`)
    assert.ok(Object.values(result.state.republicStrain.projects).some((project) => project.completed))
    assert.match(campaignMarkdown(result.state), /Republic Under Strain/)
    assert.ok(calculateRepublicStrainScore(result.state).score >= 60)
  }
})

test('historical context covers the complete Republic Under Strain act', () => {
  for (const turn of [42, 43, 44, 45, 46, 47, 48]) assert.ok(HISTORICAL_NOTES.some((note) => note.turns.includes(turn)), `missing historical context for turn ${turn}`)
})

test('Act IX starts only through the explicit same-year 49 BC bridge', () => {
  const completed = runAllRepublicStrainStrategies()[0].state
  assert.equal(completed.turn, 48)
  assert.equal(completed.outcome, 'republic-strain-complete')
  assert.equal(enterCivilSettlement(completed), completed)
  const pending = continueToCivilSettlement(completed)
  assert.equal(pending.settlementTransition, true)
  assert.equal(pending.outcome, 'republic-strain-complete')
  const entered = enterCivilSettlement(pending)
  assert.equal(entered.version, 13)
  assert.equal(entered.turn, 49)
  assert.equal(entered.era, 9)
  assert.equal(entered.outcome, null)
  assert.equal(entered.council.id, 'caesars-emergency')
  assert.equal(entered.choiceLog.length, completed.choiceLog.length)
  assert.ok(entered.chronologyBridges.some((bridge) => bridge.id === 'rubicon-to-civil-war' && bridge.fromYear === 49 && bridge.toYear === 49))
})

test('civil-settlement works enforce prerequisites and shared seasonal crews', () => {
  const completed = runAllRepublicStrainStrategies()[0].state
  let state = enterCivilSettlement(continueToCivilSettlement(completed))
  state = { ...state, resources: { grain: 100, timber: 100, stone: 100, bronze: 100, treasury: 100 }, actionsMax: 4 }
  assert.equal(civilSettlementProjectAvailability(state, 'curiaJulia').available, false)
  assert.match(civilSettlementProjectAvailability({ ...state, turn: 51 }, 'curiaJulia').reason, /Forum of Caesar precinct/)
  const worked = workCivilSettlementProject(state, 'caesarianForum')
  assert.equal(worked.state.civilSettlement.projects.caesarianForum.progress, 1)
  assert.equal(worked.state.actionsUsed, 1)
  assert.equal(civilSettlementProjectAvailability(worked.state, 'caesarianForum').available, false)
  assert.match(civilSettlementProjectAvailability(worked.state, 'caesarianForum').reason, /shared crews/)
  const completedForum = {
    ...worked.state,
    turn: 51,
    actionsUsed: 0,
    civilSettlement: {
      ...worked.state.civilSettlement,
      projects: {
        ...worked.state.civilSettlement.projects,
        caesarianForum: { ...worked.state.civilSettlement.projects.caesarianForum, progress: 3, completed: true, lastWorkedTurn: 50 },
      },
    },
  }
  assert.equal(civilSettlementProjectAvailability(completedForum, 'curiaJulia').available, true)
})

test('completed civil-settlement works expose visible recurring burdens', () => {
  const projects = Object.fromEntries(Object.keys(CIVIL_SETTLEMENT_PROJECTS).map((id) => [id, { id, progress: 0, requiredSeasons: CIVIL_SETTLEMENT_PROJECTS[id].seasons, completed: id === 'caesarianForum', lastWorkedTurn: null }]))
  const state = { ...createInitialState(), era: 9, turn: 53, civilSettlement: { ...createCivilSettlementState(), projects } }
  const forecast = civilSettlementForecast(state)
  assert.deepEqual(forecast.publicWorks.completed, ['caesarianForum'])
  assert.equal(forecast.resourceDelta.treasury, -3)
  assert.equal(forecast.changes.personalMonumentalCredit, 1)
})

test('version 12 civil-settlement saves migrate missing ledgers and projects', () => {
  const saved = { ...createInitialState(), version: 12, era: 9, turn: 51, civilSettlement: { archiveContinuity: 63 } }
  const migrated = migrateState(saved)
  assert.equal(migrated.version, 16)
  assert.equal(migrated.civilSettlement.archiveContinuity, 63)
  assert.deepEqual(Object.keys(migrated.civilSettlement.projects), Object.keys(CIVIL_SETTLEMENT_PROJECTS))
})

test('every Act IX turn offers three materially distinct council choices', () => {
  for (const turn of [49, 50, 51, 52, 53, 54]) {
    const council = getCouncil(turn)
    assert.ok(council, `missing council for turn ${turn}`)
    assert.equal(council.options.length, 3, `turn ${turn} must offer three choices`)
    assert.equal(new Set(council.options.map((option) => option.id)).size, 3)
  }
})

test('three Act IX strategies reach 27 BC with distinct viable operating settlements', () => {
  const results = runAllCivilSettlementStrategies()
  const expectedForms = new Set(['Augustan-Style Principate', 'Negotiated Republican Restoration', 'Collegial Military Oligarchy'])
  assert.equal(results.length, 3)
  assert.deepEqual(new Set(results.map((result) => result.civilScore.operatingForm)), expectedForms)
  assert.equal(new Set(results.map((result) => Object.entries(result.state.civilSettlement.projects).filter(([, project]) => project.progress > 0).map(([id]) => id).sort().join(','))).size, 3)
  for (const result of results) {
    assert.equal(result.state.turn, 54)
    assert.equal(result.state.outcome, 'civil-settlement-complete')
    assert.equal(result.state.choiceLog.length, 49)
    assert.equal(result.skipped.length, 0, JSON.stringify(result.skipped))
    assert.ok(result.civilScore.score >= 60, `${result.strategy.name}: ${result.civilScore.score}`)
    assert.ok(result.outcome.overall >= 60, `${result.strategy.name}: ${result.outcome.overall}`)
    assert.doesNotMatch(result.outcome.summary, /as a augustan/i)
    assert.match(campaignMarkdown(result.state), /Civil War and Settlement/)
    assert.match(campaignMarkdown(result.state), /Operating form/)
  }
})

test('historical context covers the complete Civil War and Settlement act', () => {
  for (const turn of [49, 50, 51, 52, 53, 54]) assert.ok(HISTORICAL_NOTES.some((note) => note.turns.includes(turn)), `missing historical context for turn ${turn}`)
})

test('Ides context exposes the approved Theatre of Pompey visual', () => {
  const idesNote = notesForTurn(51).find((note) => note.id === 'ides-succession')
  assert.deepEqual(idesNote.image, {
    src: '/images/projects/theatre-of-pompey-v1.png',
    alt: 'Isometric reconstruction of the Theatre of Pompey, its Temple of Venus Victrix, portico garden, and attached curia precinct.',
    evidence: 'Text-and-evidence synthesis',
  })
  assert.equal(notesForTurn(50).some((note) => note.image?.src === idesNote.image.src), false)
})

test('every Civil Settlement work has project art', () => {
  assert.deepEqual(Object.keys(CIVIL_SETTLEMENT_PROJECT_ART).sort(), Object.keys(CIVIL_SETTLEMENT_PROJECTS).sort())
  for (const [id, definition] of Object.entries(CIVIL_SETTLEMENT_PROJECTS)) {
    const art = artForCivilSettlementProject(id)
    assert.match(art.src, /^\/images\/projects\/.+-v1\.png$/)
    assert.ok(art.alt.length >= 30)
    assert.ok(['Evidence-led reconstruction', 'Game abstraction'].includes(art.evidence))
    assert.equal(civilSettlementProjectStage({ progress: 0, completed: false }, definition).key, 'reserved')
    assert.equal(civilSettlementProjectStage({ progress: definition.seasons, completed: true }, definition).key, 'operating')
  }
})

test('Civil Settlement construction stages use explicit three- and four-stage boundaries', () => {
  assert.equal(civilSettlementProjectStage({ progress: 1 }, CIVIL_SETTLEMENT_PROJECTS.caesarianForum).key, 'foundations')
  assert.equal(civilSettlementProjectStage({ progress: 2 }, CIVIL_SETTLEMENT_PROJECTS.caesarianForum).key, 'structure')
  assert.equal(civilSettlementProjectStage({ progress: 2 }, CIVIL_SETTLEMENT_PROJECTS.basilicaJulia).key, 'foundations')
  assert.equal(civilSettlementProjectStage({ progress: 3 }, CIVIL_SETTLEMENT_PROJECTS.basilicaJulia).key, 'structure')
  assert.equal(civilSettlementProjectStage({ progress: 4, completed: true }, CIVIL_SETTLEMENT_PROJECTS.basilicaJulia).key, 'operating')
})

test('Act X starts only through the explicit Civil Settlement continuation', () => {
  const incomplete = { ...createInitialState(), turn: 54, era: 9, outcome: null, civilSettlement: createCivilSettlementState() }
  assert.equal(continueToAugustanCity(incomplete), incomplete)
  const completed = { ...incomplete, outcome: 'civil-settlement-complete' }
  const pending = continueToAugustanCity(completed)
  assert.equal(pending.augustanTransition, true)
  const entered = enterAugustanCity(pending)
  assert.equal(entered.turn, 55)
  assert.equal(entered.era, 10)
  assert.equal(entered.version, 14)
  assert.equal(entered.council.id, getCouncil(55).id)
  assert.deepEqual(Object.keys(entered.augustanCity.projects), Object.keys(AUGUSTAN_PROJECTS))
})

test('Act X chronology crosses from BC to AD without double suffixes', () => {
  assert.equal(TURN_YEARS.length, 76)
  assert.deepEqual(TURN_YEARS.slice(54, 61), [23, 19, 13, 9, 2, -6, -14])
  assert.equal(formatYear(23), '23 BC')
  assert.equal(formatYear(-6), 'AD 6')
  assert.equal(formatYear(-14), 'AD 14')
  for (const turn of [55, 56, 57, 58, 59, 60, 61]) {
    assert.equal(getCouncil(turn).options.length, 3)
    assert.ok(notesForTurn(turn).length)
  }
})

test('Augustan works carry complete evidence labels and staged art', () => {
  assert.deepEqual(Object.keys(AUGUSTAN_PROJECT_ART).sort(), Object.keys(AUGUSTAN_PROJECTS).sort())
  for (const [id, definition] of Object.entries(AUGUSTAN_PROJECTS)) {
    const art = artForAugustanProject(id)
    assert.ok(art.alt.length >= 35)
    assert.equal(augustanProjectStage({ progress: 0 }, definition).key, 'reserved')
    assert.equal(augustanProjectStage({ progress: definition.seasons, completed: true }, definition).key, 'operating')
  }
  assert.match(AUGUSTAN_PROJECTS.agrippanPantheon.summary, /Hadrian|dome|rotunda/i)
  assert.doesNotMatch(AUGUSTAN_PROJECT_ART.agrippanPantheon.alt, /coffered|oculus/i)
})

test('Augustan work consumes shared capacity and enters the forecast', () => {
  const state = {
    ...createInitialState(), era: 10, turn: 55, resources: { grain: 20, timber: 20, stone: 20, bronze: 5, treasury: 20 },
    augustanCity: createAugustanState(), actionsUsed: 0, actionsMax: 2,
  }
  assert.equal(augustanProjectAvailability(state, 'palatineOfficialPrecinct').available, true)
  const worked = workAugustanProject(state, 'palatineOfficialPrecinct')
  assert.equal(worked.state.augustanCity.projects.palatineOfficialPrecinct.progress, 1)
  assert.equal(augustanProjectAvailability(worked.state, 'palatineOfficialPrecinct').available, false)
  assert.ok(augustanCityForecast(worked.state).projected)
})

test('v13 Augustan saves migrate to v16 without losing succession state', () => {
  const saved = { ...createInitialState(), version: 13, era: 10, turn: 57, augustanCity: { successionConfidence: 63 } }
  const migrated = migrateState(saved)
  assert.equal(migrated.version, 16)
  assert.equal(migrated.augustanCity.successionConfidence, 63)
  assert.deepEqual(Object.keys(migrated.augustanCity.projects), Object.keys(createAugustanProjects()))
})

test('three Act X strategies reach distinct viable settlements at AD 14', () => {
  const results = runAllAugustanCityStrategies()
  assert.equal(results.length, 3)
  assert.equal(new Set(results.map((result) => result.augustanScore.operatingForm)).size, 3)
  assert.equal(new Set(results.map((result) => Object.entries(result.state.augustanCity.projects).filter(([, project]) => project.progress > 0).map(([id]) => id).sort().join(','))).size, 3)
  for (const result of results) {
    assert.equal(result.state.turn, 61)
    assert.equal(result.state.outcome, 'augustan-city-complete')
    assert.equal(result.skipped.length, 0)
    assert.ok(result.augustanScore.score >= 58)
    assert.ok(result.outcome.overall >= 58)
    assert.ok(calculateAugustanCityScore(result.state))
    assert.match(campaignMarkdown(result.state), /The Augustan City[\s\S]+succession/i)
  }
})

test('Augustan capital sites are unique, bounded, and chronology gated', () => {
  assert.deepEqual(Object.keys(AUGUSTAN_PROJECT_SITES).sort(), Object.keys(AUGUSTAN_PROJECTS).sort())
  const positions = new Set()
  for (const site of Object.values(AUGUSTAN_PROJECT_SITES)) {
    assert.ok(site.x >= 0 && site.x <= 100)
    assert.ok(site.y >= 0 && site.y <= 100)
    positions.add(`${site.x}:${site.y}`)
  }
  assert.equal(positions.size, 8)
  const beforeAct = { ...createInitialState(), augustanCity: createAugustanState() }
  assert.deepEqual(augustanCapitalLandmarks(beforeAct), [])
  const opening = { ...beforeAct, era: 10, turn: 55 }
  const landmarks = augustanCapitalLandmarks(opening)
  assert.deepEqual(landmarks.map((landmark) => landmark.id).sort(), ['agrippanPantheon', 'mausoleumAugustus', 'palatineOfficialPrecinct'])
  assert.ok(landmarks.every((landmark) => landmark.stage.key === 'reserved'))
  const worked = workAugustanProject({ ...opening, resources: { grain: 20, timber: 20, stone: 20, bronze: 5, treasury: 20 }, actionsUsed: 0, actionsMax: 2 }, 'palatineOfficialPrecinct').state
  assert.equal(augustanCapitalLandmarks(worked).find((landmark) => landmark.id === 'palatineOfficialPrecinct').stage.key, 'foundations')
})

test('Augustan capital systems are bounded and respond to their operating measures', () => {
  const state = { ...createInitialState(), era: 10, turn: 60, augustanCity: createAugustanState() }
  const systems = augustanCapitalSystems(state)
  assert.equal(systems.length, 4)
  assert.deepEqual(systems.map((system) => system.name), ['Civic government', 'Public provision', 'Urban safety', 'Succession and memory'])
  assert.ok(systems.every((system) => system.score >= 0 && system.score <= 100 && system.drivers.length >= 3 && system.works.length >= 2))
  const improved = augustanCapitalSystems({ ...state, augustanCity: { ...state.augustanCity, fireCoverage: 100 } })
  assert.ok(improved.find((system) => system.id === 'urban-safety').score > systems.find((system) => system.id === 'urban-safety').score)
  assert.equal(improved.find((system) => system.id === 'civic-government').score, systems.find((system) => system.id === 'civic-government').score)
})

test('AD 14 capital legacy remains complete before entering Act XI', () => {
  const result = runAllAugustanCityStrategies()[0]
  const outcome = calculateOutcome(result.state)
  assert.equal(result.state.turn, 61)
  assert.equal(outcome.capitalLegacy.systems.length, 4)
  assert.equal(outcome.capitalLegacy.operatingForm, result.augustanScore.operatingForm)
  assert.equal(outcome.capitalLegacy.completed, result.augustanScore.completed)
  assert.match(campaignMarkdown(result.state), /Capital Operating Systems[\s\S]+Urban safety[\s\S]+Landmark works:/)
  assert.equal(TURN_YEARS.length, 76)
})

test('Augustan capital keeps the pre-Hadrianic Pantheon guardrail', () => {
  const pantheon = AUGUSTAN_PROJECT_ART.agrippanPantheon
  assert.match(pantheon.alt, /disputed Augustan temple precinct/)
  assert.doesNotMatch(`${pantheon.alt} ${AUGUSTAN_PROJECT_SITES.agrippanPantheon.name}`, /coffer|oculus|domed rotunda/i)
})

test('Act XI starts only through the explicit AD 14 continuation', () => {
  const base = runAllAugustanCityStrategies()[0].state
  const blocked = enterImperialCapital(base)
  assert.equal(blocked, base)
  const pending = continueToImperialCapital(base)
  assert.equal(pending.imperialCapitalTransition, true)
  const entered = enterImperialCapital(pending)
  assert.equal(entered.version, 15)
  assert.equal(entered.turn, 62)
  assert.equal(entered.era, 11)
  assert.equal(entered.council.id, getCouncil(62).id)
  assert.deepEqual(Object.keys(entered.imperialCapital.projects).sort(), Object.keys(IMPERIAL_CAPITAL_PROJECTS).sort())
})

test('Act XI chronology covers nine councils from AD 14 through AD 96', () => {
  assert.equal(TURN_YEARS.length, 76)
  assert.deepEqual(TURN_YEARS.slice(61, 70), [-14, -23, -41, -54, -64, -69, -75, -80, -96])
  for (let turn = 62; turn <= 70; turn += 1) {
    assert.equal(getCouncil(turn).options.length, 3)
    assert.ok(getObjective(turn).length > 20)
    assert.ok(notesForTurn(turn).length)
    assert.match(formatYear(TURN_YEARS[turn - 1]), /^AD /)
  }
})

test('v14 Augustan saves migrate to v16 before the Imperial Capital transition', () => {
  const saved = { ...createInitialState(), version: 14, turn: 61, era: 10, outcome: 'augustan-city-complete', augustanCity: createAugustanState() }
  const migrated = migrateState(saved)
  assert.equal(migrated.version, 16)
  assert.equal(migrated.imperialCapital, null)
  assert.equal(migrated.augustanCity.projects.agrippanPantheon.id, 'agrippanPantheon')
})

test('Act XI projects carry dates, evidence, stages, and recurring burdens', () => {
  assert.equal(Object.keys(IMPERIAL_CAPITAL_PROJECTS).length, 8)
  for (const definition of Object.values(IMPERIAL_CAPITAL_PROJECTS)) {
    assert.ok(definition.unlockTurn >= 62 && definition.unlockTurn <= 70)
    assert.ok(definition.seasons >= 2 && definition.seasons <= 5)
    assert.ok(definition.evidence.length >= 20)
    assert.ok(definition.burdenLabel.length >= 40)
  }
  assert.equal(IMPERIAL_CAPITAL_PROJECTS.flavianAmphitheatre.openingTurn, 69)
  assert.equal(IMPERIAL_CAPITAL_PROJECTS.flavianAmphitheatre.operatingTurn, 70)
})

test('complete Imperial Capital visual set maps all eight project artworks', () => {
  const expected = {
    castraPraetoria: '/images/projects/castra-praetoria-v1.png',
    aquaClaudia: '/images/projects/aqua-claudia-v1.png',
    claudianPortus: '/images/projects/claudian-portus-v1.png',
    domusAurea: '/images/projects/domus-aurea-v1.png',
    flavianAmphitheatre: '/images/projects/flavian-amphitheatre-v1.png',
    templePeace: '/images/projects/temple-peace-v1.png',
    archTitus: '/images/projects/arch-titus-v1.png',
    domitianicPalace: '/images/projects/domitianic-palace-v1.png',
  }
  assert.deepEqual(Object.keys(IMPERIAL_PROJECT_ART).sort(), Object.keys(expected).sort())
  for (const [id, src] of Object.entries(expected)) {
    const art = IMPERIAL_PROJECT_ART[id]
    assert.equal(art.src, src)
    assert.ok(art.alt.length >= 40)
    assert.ok(art.evidence.length >= 25)
    assert.equal(artForImperialProject(id), art)
  }
  assert.equal(artForImperialProject('unknown'), null)
})

test('Flavian Amphitheatre requires public conversion, opens in AD 80, and gains the Domitianic layer by AD 96', () => {
  let state = {
    ...createInitialState(), era: 11, turn: 67, resources: { grain: 30, timber: 30, stone: 30, bronze: 5, treasury: 30 },
    imperialCapital: createImperialCapitalState(), council: getCouncil(67), councilResolved: false, actionsUsed: 0, actionsMax: 2,
  }
  assert.equal(imperialProjectAvailability(state, 'flavianAmphitheatre').available, false)
  state = resolveCouncil(state, 'flavian-public-conversion')
  for (const turn of [67, 68, 69, 70]) {
    state = { ...state, turn, actionsUsed: 0, actionsMax: 2, council: getCouncil(turn), councilResolved: true }
    const result = workImperialProject(state, 'flavianAmphitheatre')
    assert.equal(result.error, undefined)
    state = result.state
    if (turn === 69) assert.equal(state.imperialCapital.projects.flavianAmphitheatre.opened, true)
  }
  const amphitheatre = state.imperialCapital.projects.flavianAmphitheatre
  assert.equal(amphitheatre.completed, true)
  assert.equal(amphitheatre.domitianicLayer, true)
})

test('Imperial operating systems are bounded and penalize guard and palace concentration', () => {
  const strong = { ...createInitialState(), era: 11, turn: 70, imperialCapital: { ...createImperialCapitalState(), senateCompact: 80, successionConfidence: 80, armyRecognition: 75, guardInfluence: 20, publicAccess: 78, palaceConcentration: 20, publicProvision: 76, harborSupply: 74, fireResilience: 72, maintenanceCapacity: 75, provincialTrust: 70 } }
  const brittle = { ...strong, imperialCapital: { ...strong.imperialCapital, guardInfluence: 85, palaceConcentration: 88, senateCompact: 35, publicAccess: 30 } }
  const strongSystems = imperialCapitalSystems(strong)
  const brittleSystems = imperialCapitalSystems(brittle)
  assert.equal(strongSystems.length, 4)
  assert.ok(strongSystems.every((system) => system.score >= 0 && system.score <= 100))
  assert.ok(strongSystems.find((system) => system.id === 'authority-transfer').score > brittleSystems.find((system) => system.id === 'authority-transfer').score)
  assert.ok(strongSystems.find((system) => system.id === 'public-city-palace').score > brittleSystems.find((system) => system.id === 'public-city-palace').score)
  assert.ok(imperialCapitalForecast(brittle).palaceGap > imperialCapitalForecast(strong).palaceGap)
})

test('The AD 64 fire imposes material damage without ending the campaign', () => {
  const state = {
    ...createInitialState(), era: 11, turn: 66, imperialCapital: { ...createImperialCapitalState(), fireResilience: 30 },
    council: getCouncil(66), councilResolved: true, outcome: null,
  }
  const result = advanceTurn(state)
  assert.equal(result.error, undefined)
  assert.equal(result.report.riskLabel, 'AD 64 fire resilience')
  assert.ok(result.report.metricDelta.shelter < 0)
  assert.equal(result.state.turn, 67)
  assert.equal(result.state.outcome, null)
})

test('three Act XI strategies reach AD 96 with distinct viable capital settlements', () => {
  const results = runAllImperialCapitalStrategies()
  assert.equal(results.length, 3)
  assert.ok(results.every((result) => result.state.turn === 70 && result.state.outcome === 'imperial-capital-complete'))
  assert.ok(results.every((result) => result.imperialScore.score >= 60 && result.skipped.length === 0))
  assert.equal(new Set(results.map((result) => result.imperialScore.operatingForm)).size, 3)
})

test('Act XII chronology covers AD 96 through AD 117', () => {
  assert.equal(TURN_YEARS.length, 76)
  assert.deepEqual(TURN_YEARS.slice(69), [-96, -97, -102, -106, -109, -112, -117])
  for (let turn = 71; turn <= 76; turn += 1) {
    assert.equal(getCouncil(turn).options.length, 3)
    assert.ok(getCouncil(turn).context.length >= 120)
    assert.ok(getObjective(turn).length > 20)
  }
})

test('Act XII starts only through the explicit AD 96 continuation', () => {
  const endpoint = { ...createInitialState(), version: 15, turn: 70, era: 11, outcome: 'imperial-capital-complete', imperialCapital: createImperialCapitalState() }
  assert.equal(enterTrajanicCapital(endpoint), endpoint)
  const pending = continueToTrajanicCapital(endpoint)
  assert.equal(pending.trajanicCapitalTransition, true)
  const entered = enterTrajanicCapital(pending)
  assert.equal(entered.version, 16)
  assert.equal(entered.turn, 71)
  assert.equal(entered.era, 12)
  assert.equal(entered.outcome, null)
  assert.deepEqual(Object.keys(entered.trajanicCapital.projects).sort(), Object.keys(createTrajanicCapitalProjects()).sort())
})

test('version 15 AD 96 saves migrate to a resumable boundary', () => {
  const migrated = migrateState({ ...createInitialState(), version: 15, turn: 70, era: 11, outcome: 'imperial-capital-complete' })
  assert.equal(migrated.version, 16)
  assert.equal(migrated.outcome, 'imperial-capital-complete')
  assert.equal(migrated.trajanicCapital, null)
})

test('Act XII projects carry evidence, stages, costs, and recurring burdens', () => {
  assert.equal(ERAS[12].id, 'trajanic-capital')
  assert.deepEqual(ERAS[12].turns, [71, 76])
  assert.deepEqual(Object.keys(TRAJANIC_CAPITAL_PROJECTS).sort(), ['aquaTraiana', 'bathsTrajan', 'forumTrajan', 'trajanAdministrativeComplex', 'trajanicCircus', 'trajanicPortus'].sort())
  for (const definition of Object.values(TRAJANIC_CAPITAL_PROJECTS)) {
    assert.ok(definition.summary.length >= 80)
    assert.ok(definition.evidence.length >= 20)
    assert.ok(definition.seasons >= 3)
    assert.ok(Object.keys(definition.cost).length >= 2)
    assert.ok(Object.keys(definition.upkeepResources ?? {}).length + Object.keys(definition.upkeepTrajanic ?? {}).length >= 1)
  }
})

test('complete Trajanic Capital visual set maps all six project artworks', () => {
  const expected = {
    forumTrajan: '/images/projects/forum-trajan-v1.png',
    trajanAdministrativeComplex: '/images/projects/trajan-administrative-complex-v1.png',
    bathsTrajan: '/images/projects/baths-trajan-v1.png',
    aquaTraiana: '/images/projects/aqua-traiana-v1.png',
    trajanicPortus: '/images/projects/trajanic-portus-v1.png',
    trajanicCircus: '/images/projects/trajanic-circus-v1.png',
  }
  assert.deepEqual(Object.keys(TRAJANIC_PROJECT_ART).sort(), Object.keys(expected).sort())
  for (const [id, src] of Object.entries(expected)) {
    const art = TRAJANIC_PROJECT_ART[id]
    assert.equal(art.src, src)
    assert.ok(art.alt.length >= 40)
    assert.ok(art.evidence.length >= 25)
    assert.equal(artForTrajanicProject(id), art)
  }
  assert.equal(artForTrajanicProject('unknown'), null)
})

test('AD 96 outcome and chronicle expose Imperial Operating Systems without a Hadrianic Pantheon', () => {
  const result = runAllImperialCapitalStrategies()[0]
  const outcome = calculateOutcome(result.state)
  const markdown = campaignMarkdown(result.state)
  assert.equal(outcome.imperialCapitalLegacy.systems.length, 4)
  assert.match(outcome.summary, /AD 96/)
  assert.match(markdown, /## Imperial Capital/)
  assert.match(markdown, /### Imperial Operating Systems/)
  assert.doesNotMatch(IMPERIAL_CAPITAL_PROJECTS.flavianAmphitheatre.summary, /ruin|medieval/i)
  assert.doesNotMatch(JSON.stringify(IMPERIAL_CAPITAL_PROJECTS), /coffered dome|oculus/i)
})

test('Act XII council impacts update the Trajanic ledger', () => {
  const state = {
    ...createInitialState(), version: 16, era: 12, turn: 71,
    imperialCapital: createImperialCapitalState(), trajanicCapital: createTrajanicCapitalState(createImperialCapitalState()),
    council: getCouncil(71), councilResolved: false, actionsUsed: 0, actionsMax: 3,
  }
  const before = state.trajanicCapital.successionSettlement
  const resolved = resolveCouncil(state, 'recorded-adoption')
  assert.ok(resolved.trajanicCapital.successionSettlement > before)
  assert.equal(resolved.flags.trajanicSuccession, 'recorded-adoption')
})

test('Act XII project gates and recurring burdens are explicit', () => {
  let state = {
    ...createInitialState(), version: 16, era: 12, turn: 73,
    resources: { grain: 100, timber: 100, stone: 100, bronze: 100, treasury: 100 },
    imperialCapital: createImperialCapitalState(), trajanicCapital: createTrajanicCapitalState(createImperialCapitalState()),
    council: getCouncil(73), councilResolved: false, actionsUsed: 0, actionsMax: 3,
  }
  assert.equal(trajanicProjectAvailability(state, 'forumTrajan').available, false)
  state = resolveCouncil(state, 'integrated-forum-program')
  for (let step = 0; step < TRAJANIC_CAPITAL_PROJECTS.forumTrajan.seasons; step += 1) {
    state = { ...state, turn: 73 + step, council: null, councilResolved: true, actionsUsed: 0 }
    const result = workTrajanicProject(state, 'forumTrajan')
    assert.equal(result.error, undefined)
    state = result.state
  }
  assert.equal(state.trajanicCapital.projects.forumTrajan.completed, true)
  const forecast = trajanicCapitalForecast(state)
  assert.ok(forecast.publicWorks.completed.includes('forumTrajan'))
  assert.ok(forecast.resourceDelta.treasury < 12)
})

test('Act XII operating pressure penalizes debt and conquest dependence', () => {
  const base = { ...createInitialState(), version: 16, era: 12, turn: 76, trajanicCapital: createTrajanicCapitalState(createImperialCapitalState()) }
  const strong = { ...base, trajanicCapital: { ...base.trajanicCapital, maintenanceCapacity: 80, maintenanceDebt: 5, conquestDependence: 5, treasuryResilience: 80, capitalSupply: 80, publicProvision: 80 } }
  const brittle = { ...base, trajanicCapital: { ...base.trajanicCapital, maintenanceCapacity: 25, maintenanceDebt: 85, conquestDependence: 85, treasuryResilience: 25, capitalSupply: 30, publicProvision: 30 } }
  assert.ok(trajanicCapitalForecast(strong).resourceDelta.treasury > trajanicCapitalForecast(brittle).resourceDelta.treasury)
  assert.ok(trajanicCapitalSystems(strong).reduce((sum, system) => sum + system.score, 0) > trajanicCapitalSystems(brittle).reduce((sum, system) => sum + system.score, 0))
})

test('Act XII project prerequisites follow the enacted council programs', () => {
  const actState = (turn) => {
    const imperialCapital = createImperialCapitalState()
    imperialCapital.projects.claudianPortus.completed = true
    const state = {
      ...createInitialState(), version: 16, era: 12, turn,
      resources: { grain: 100, timber: 100, stone: 100, bronze: 100, treasury: 100 },
      imperialCapital, trajanicCapital: createTrajanicCapitalState(imperialCapital),
      mediterranean: createMediterraneanState(),
      council: getCouncil(turn), councilResolved: false, actionsUsed: 0, actionsMax: 3,
    }
    state.mediterranean.projects.republicanCircus.completed = true
    return state
  }

  const forum = resolveCouncil(actState(73), 'integrated-forum-program')
  assert.equal(trajanicProjectAvailability(forum, 'forumTrajan').available, true)
  assert.equal(trajanicProjectAvailability(forum, 'trajanAdministrativeComplex').available, true)

  const baths = resolveCouncil(actState(74), 'public-conversion')
  assert.equal(trajanicProjectAvailability(baths, 'bathsTrajan').available, true)

  const joined = resolveCouncil(actState(75), 'distributed-supply-and-basin')
  assert.equal(trajanicProjectAvailability(joined, 'aquaTraiana').available, true)
  assert.equal(trajanicProjectAvailability(joined, 'trajanicPortus').available, true)

  const grain = resolveCouncil(actState(75), 'grain-first-portus')
  assert.equal(trajanicProjectAvailability(grain, 'trajanicPortus').available, true)
  assert.equal(trajanicProjectAvailability(grain, 'aquaTraiana').available, false)

  const water = resolveCouncil(actState(75), 'water-first-resilience')
  assert.equal(trajanicProjectAvailability(water, 'aquaTraiana').available, true)
  assert.equal(trajanicProjectAvailability(water, 'trajanicPortus').available, false)

  const circus = resolveCouncil(actState(76), 'provincial-trust-and-maintenance')
  assert.equal(trajanicProjectAvailability(circus, 'trajanicCircus').available, true)
  const noInheritance = structuredClone(circus)
  noInheritance.mediterranean.projects.republicanCircus.completed = false
  assert.equal(trajanicProjectAvailability(noInheritance, 'trajanicCircus').available, false)
})

test('Trajanic Capital scoring rewards durable systems over brittle expansion', () => {
  const imperialCapital = createImperialCapitalState()
  const base = { ...createInitialState(), version: 16, era: 12, turn: 76, outcome: 'trajanic-capital-complete', imperialCapital, trajanicCapital: createTrajanicCapitalState(imperialCapital) }
  const strong = { ...base, trajanicCapital: { ...base.trajanicCapital, successionSettlement: 82, constitutionalContinuity: 84, frontierCommand: 74, provincialTrust: 80, treasuryResilience: 78, conquestDependence: 12, capitalSupply: 82, publicProvision: 80, maintenanceCapacity: 78, maintenanceDebt: 8, administrativeCapacity: 80 } }
  const brittle = { ...base, trajanicCapital: { ...base.trajanicCapital, successionSettlement: 40, constitutionalContinuity: 35, frontierCommand: 72, provincialTrust: 28, treasuryResilience: 24, conquestDependence: 88, capitalSupply: 35, publicProvision: 32, maintenanceCapacity: 25, maintenanceDebt: 86, administrativeCapacity: 42 } }
  assert.ok(calculateTrajanicCapitalScore(strong).score > calculateTrajanicCapitalScore(brittle).score)
  assert.ok(calculateTrajanicCapitalScore(brittle).risks.length >= 3)
})

test('four Act XII strategies reach AD 117 with distinct viable settlements', () => {
  const results = runAllTrajanicCapitalStrategies()
  assert.equal(TRAJANIC_CAPITAL_STRATEGIES.length, 4)
  assert.equal(results.length, 4)
  assert.ok(results.every((result) => result.state.turn === 76 && result.state.outcome === 'trajanic-capital-complete'))
  assert.ok(results.every((result) => result.trajanicScore.score >= 55 && result.skipped.length === 0))
  assert.ok(results.every((result) => Object.values(result.state.trajanicCapital.projects).some((project) => project.completed || project.progress > 0)))
  assert.equal(new Set(results.map((result) => result.trajanicScore.operatingForm)).size, 4)
})

test('AD 117 outcome exposes the Trajanic settlement', () => {
  const result = runAllTrajanicCapitalStrategies()[0]
  const outcome = calculateOutcome(result.state)
  assert.equal(outcome.grades['Trajanic Capital'].score, result.trajanicScore.score)
  assert.equal(outcome.trajanicCapitalLegacy.systems.length, 5)
  assert.equal(outcome.trajanicCapitalLegacy.operatingForm, result.trajanicScore.operatingForm)
  assert.match(outcome.summary, /AD 117/)
})

test('Act XII historical knowledge covers every Trajanic turn', () => {
  const ids = new Set()
  for (let turn = 71; turn <= 76; turn += 1) {
    const notes = notesForTurn(turn)
    assert.equal(notes.length, 1)
    const [note] = notes
    ids.add(note.id)
    assert.ok(note.text.length >= 180)
    assert.ok(note.evidence.length >= 100)
    assert.doesNotMatch(`${note.title} ${note.text}`, /systemic racism|equity|marginalized|whiteness/i)
  }
  assert.equal(ids.size, 6)
})

test('Act XII chronicle records the Trajanic settlement and consulted knowledge', () => {
  const result = runAllTrajanicCapitalStrategies()[0]
  const withoutResearch = campaignMarkdown({ ...result.state, consultedNotes: [] })
  assert.match(withoutResearch, /## Trajanic Capital[\s\S]+AD 117/)
  assert.match(withoutResearch, /### Trajanic Operating Systems/)
  assert.doesNotMatch(withoutResearch, /## Historical Knowledge Consulted/)

  const withResearch = campaignMarkdown({ ...result.state, consultedNotes: ['nerva-adoption', 'aqua-traiana-portus', 'unknown-note', 'nerva-adoption'] })
  assert.match(withResearch, /## Historical Knowledge Consulted/)
  assert.match(withResearch, /Adoption Made Succession Publicly Legible/)
  assert.match(withResearch, /Aqua Traiana and Portus Were Linked Supply Obligations/)
  assert.doesNotMatch(withResearch, /unknown-note/)
  assert.equal((withResearch.match(/Adoption Made Succession Publicly Legible/g) ?? []).length, 1)
})

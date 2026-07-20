import { AUGUSTAN_PROJECTS, BUILDING_FAMILIES, CIVIL_SETTLEMENT_PROJECTS, DISTRICTS, DISTRICT_LINKS, ITALIAN_PROJECTS, MEDITERRANEAN_PROJECTS, METROPOLITAN_PROJECTS, REPUBLIC_STRAIN_PROJECTS, REGIONAL_COMMUNITIES, REGIONAL_ROUTES, RELATIONSHIP_TYPES, TURN_YEARS, formatYear, getCouncil, getDistrict, getFamily, getTier } from './data.js'
import { createAugustanState, createCivilSettlementState, createItalianState, createMediterraneanState, createMetropolitanState, createReconstructionState, createRegionalState, createRepublicState, createRepublicStrainState, createWarState } from './initialState.js'

const BUILDINGS = BUILDING_FAMILIES.flatMap((family) => family.tiers)
const clamp = (value, min = 0, max = 100) => Math.max(min, Math.min(max, value))
const addMap = (base, changes = {}, min = 0, max = 100) => Object.fromEntries(
  Object.entries(base).map(([key, value]) => [key, clamp(value + (changes[key] ?? 0), min, max)]),
)
const addResources = (base, changes = {}) => Object.fromEntries(
  Object.entries(base).map(([key, value]) => [key, Math.max(0, value + (changes[key] ?? 0))]),
)
const mergeChanges = (...maps) => maps.reduce((result, changes = {}) => {
  for (const [key, value] of Object.entries(changes)) result[key] = (result[key] ?? 0) + value
  return result
}, {})
const reverseChanges = (changes = {}) => Object.fromEntries(Object.entries(changes).map(([key, value]) => [key, -value]))
const definitionFor = (buildingId) => BUILDINGS.find((item) => item.id === buildingId)
export const actionRemaining = (state) => Math.max(0, (state.actionsMax ?? workforceSummary(state).constructionCapacity) - (state.actionsUsed ?? 0))

export const countFamily = (state, familyId) => state.buildings.filter((building) => building.familyId === familyId).length
export const hasBuilding = (state, buildingId) => state.buildings.some((building) => building.buildingId === buildingId)

function republicanCapacity(state, baseCapacity) {
  if (state.era < 2 || !state.republic) return baseCapacity
  const mode = state.flags?.magistrateMode ?? 'paired'
  if (mode === 'emergency') return Math.min(4, baseCapacity)
  if (mode === 'senate') return Math.min(state.republic.senateStanding >= 50 ? 3 : 2, baseCapacity)
  return Math.min(2, baseCapacity)
}

export function ritualWorkforceBurden(state) {
  const obligations = []
  let count = 0
  for (const shrine of state.buildings.filter((building) => building.familyId === 'shrine' && (building.condition ?? 100) >= 40)) {
    const people = shrine.tier >= 2 ? 20 : 8
    count += people
    obligations.push({ type: 'ritual', districtId: shrine.districtId, people, label: shrine.name, interest: 'Priestly college' })
  }
  for (const project of (state.projects ?? []).filter((item) => item.familyId === 'shrine')) {
    count += 36
    obligations.push({ type: 'ritual', districtId: project.districtId, people: 36, label: `${project.name} rites`, interest: 'Priests and project patrons' })
  }
  const currentChoice = state.choiceLog?.find((entry) => entry.turn === state.turn)
  if (currentChoice?.optionId === 'festival') {
    count += 24
    obligations.push({ type: 'festival', districtId: 'palatine', people: 24, label: 'League festival', interest: 'Hill communities' })
  }
  if (state.turn === 9 && ['complete', 'royal-glory'].includes(currentChoice?.optionId)) {
    count += 18
    obligations.push({ type: 'festival', districtId: 'capitoline', people: 18, label: 'Capitoline dedication', interest: 'Priests and civic patrons' })
  }
  return { count, obligations }
}

export function workforceSummary(state) {
  const population = state.population ?? { workers: 433, craftsmen: 41, levyEligible: 144 }
  const allocation = state.workforceAllocation ?? { farming: 50, works: 30, levy: 20 }
  const eligible = population.workers + population.craftsmen + population.levyEligible
  const ritual = ritualWorkforceBurden(state)
  const allocatable = Math.max(0, eligible - ritual.count)
  const counts = {
    farming: Math.round(allocatable * allocation.farming / 100),
    works: Math.round(allocatable * allocation.works / 100),
    levy: Math.round(allocatable * allocation.levy / 100),
  }
  const baseConstructionCapacity = Math.max(1, Math.min(4, 1 + Math.floor(counts.works / 130) + (state.nextWorksBonus ?? 0)))
  const constructionCapacity = republicanCapacity(state, baseConstructionCapacity)
  const grainYield = clamp(Math.round((allocation.farming - 30) / 10), -2, 4)
  const readinessDelta = clamp(Math.round((allocation.levy - 20) / 5), -4, 4)
  return { eligible, allocatable, ritual, allocation, counts, constructionCapacity, baseConstructionCapacity, grainYield, readinessDelta }
}

const updateRepublic = (republic, changes = {}) => {
  if (!republic) return republic
  return Object.fromEntries(Object.entries(republic).map(([key, value]) => [key, typeof value === 'number' ? clamp(value + (changes[key] ?? 0)) : value]))
}

const updateWar = (war, changes = {}) => {
  if (!war) return war
  return Object.fromEntries(Object.entries(war).map(([key, value]) => [key, typeof value === 'number' ? clamp(value + (changes[key] ?? 0)) : value]))
}

const updateReconstruction = (reconstruction, changes = {}) => {
  if (!reconstruction) return reconstruction
  return Object.fromEntries(Object.entries(reconstruction).map(([key, value]) => [key, typeof value === 'number' ? clamp(value + (changes[key] ?? 0)) : value]))
}

const updateRegional = (regional, changes = {}) => {
  if (!regional) return regional
  return Object.fromEntries(Object.entries(regional).map(([key, value]) => [key, typeof value === 'number' ? Math.max(0, value + (changes[key] ?? 0)) : value]))
}

const updateItalian = (italian, changes = {}) => {
  if (!italian) return italian
  return Object.fromEntries(Object.entries(italian).map(([key, value]) => [key, typeof value === 'number' ? clamp(value + (changes[key] ?? 0)) : value]))
}

const updateMediterranean = (mediterranean, changes = {}) => {
  if (!mediterranean) return mediterranean
  return Object.fromEntries(Object.entries(mediterranean).map(([key, value]) => [
    key,
    typeof value === 'number' ? clamp(value + (changes[key] ?? 0)) : value,
  ]))
}

export const updateMetropolitan = (metropolitan, changes = {}) => {
  if (!metropolitan) return metropolitan
  return Object.fromEntries(Object.entries(metropolitan).map(([key, value]) => [
    key,
    typeof value === 'number' ? clamp(value + (changes[key] ?? 0)) : value,
  ]))
}

export const updateRepublicStrain = (strain, changes = {}) => {
  if (!strain) return strain
  return Object.fromEntries(Object.entries(strain).map(([key, value]) => [
    key,
    typeof value === 'number' ? clamp(value + (changes[key] ?? 0)) : value,
  ]))
}

export const updateCivilSettlement = (settlement, changes = {}) => {
  if (!settlement) return settlement
  return Object.fromEntries(Object.entries(settlement).map(([key, value]) => [
    key,
    typeof value === 'number' ? clamp(value + (changes[key] ?? 0)) : value,
  ]))
}

export const updateAugustanCity = (augustan, changes = {}) => {
  if (!augustan) return augustan
  return Object.fromEntries(Object.entries(augustan).map(([key, value]) => [
    key,
    typeof value === 'number' ? clamp(value + (changes[key] ?? 0)) : value,
  ]))
}

export function republicForecast(state) {
  if (state.era < 2 || !state.republic) return null
  const workforce = workforceSummary(state)
  const levyPressure = Math.round((workforce.allocation.levy - 20) / 5)
  const foodRelief = workforce.allocation.farming >= 45 ? 2 : 0
  const storageRelief = hasBuilding(state, 'public-granary') ? 3 : countFamily(state, 'grain') >= 2 ? 1 : 0
  const debtDelta = Math.max(0, levyPressure * 2) + (state.metrics.food < 50 ? 3 : 0) - foodRelief - storageRelief
  const levyBurdenDelta = levyPressure
  const assemblyConsentDelta = (state.republic.debtStrain >= 50 ? -4 : state.republic.debtStrain >= 35 ? -2 : 0)
    + (state.flags?.tribunesEstablished ? 2 : 0)
    + (hasBuilding(state, 'comitium') ? 1 : 0)
  const senateStandingDelta = (state.resources.treasury === 0 ? -3 : 0) + (hasBuilding(state, 'saturn-treasury') ? 2 : 0)
  return {
    changes: { debtStrain: debtDelta, levyBurden: levyBurdenDelta, assemblyConsent: assemblyConsentDelta, senateStanding: senateStandingDelta },
    projected: updateRepublic(state.republic, { debtStrain: debtDelta, levyBurden: levyBurdenDelta, assemblyConsent: assemblyConsentDelta, senateStanding: senateStandingDelta }),
    notes: [
      levyPressure > 0 ? `Levy service above 20% adds ${levyPressure * 2} debt strain as households lose field time.` : 'The levy rotation does not add extraordinary household debt this season.',
      storageRelief ? `Grain reserves reduce debt strain by ${storageRelief}.` : 'No broad grain reserve cushions households from campaign absence.',
      state.flags?.magistrateMode === 'emergency' ? 'Emergency command permits a larger works program but carries concentrated authority forward.' : 'Annual office constraints limit how much public work can be commanded at once.',
    ],
  }
}

export function warForecast(state) {
  if (state.era < 2 || !state.war) return null
  const activeVeiiSeason = state.turn === 14 || state.turn === 15
  const levyShare = state.workforceAllocation?.levy ?? 20
  const levyEffort = activeVeiiSeason ? Math.round((levyShare - 20) / 5) : 0
  const paid = state.war.soldierPay > 0
  const changes = activeVeiiSeason ? {
    siegePersistence: Math.max(-4, levyEffort * 2) + (paid ? 3 : 0),
    veiiPressure: Math.max(-3, levyEffort) + (state.war.siegePersistence >= 45 ? 3 : 0),
    veteranCohesion: paid ? 2 : levyShare >= 35 ? -2 : 0,
    landExpectations: state.turn === 15 && state.war.siegePersistence >= 45 ? 3 : 0,
  } : {}
  const resourceDelta = activeVeiiSeason && paid ? { treasury: -2 } : {}
  const republicChanges = activeVeiiSeason ? {
    debtStrain: paid ? -2 : Math.max(0, levyEffort),
    levyBurden: paid ? Math.max(-2, levyEffort - 2) : levyEffort,
  } : {}
  return {
    changes,
    projected: updateWar(state.war, changes),
    resourceDelta,
    republicChanges,
    notes: activeVeiiSeason ? [
      paid ? 'Soldier pay supports a levy that remains beyond the ordinary campaign season, at a continuing treasury cost.' : 'Unpaid extended service transfers the cost of siege persistence to citizen households.',
      levyShare > 20 ? `${levyShare}% levy allocation increases pressure on Veii and on the households sustaining it.` : 'A limited levy protects household production but slows continuous pressure on Veii.',
    ] : ['The Veientine settlement now shapes veteran cohesion, land claims, and the reserves available against a new threat.'],
  }
}

export function gallicReadiness(state) {
  if (!state.war) return null
  const defense = countFamily(state, 'defense')
  const reserve = hasBuilding(state, 'public-granary') ? 10 : countFamily(state, 'grain') >= 2 ? 5 : 0
  const plan = state.flags?.gallicPlan
  const planAdjustment = plan === 'defense-in-depth' ? 7 : plan === 'delay' ? 4 : plan === 'field-battle' && state.war.veteranCohesion < 55 ? -6 : 0
  const score = Math.round(
    state.metrics.readiness * 0.34
    + state.war.veteranCohesion * 0.22
    + defense * 6
    + reserve
    + state.metrics.food * 0.08
    + (state.republic?.assemblyConsent ?? 45) * 0.07
    + (state.republic?.senateStanding ?? 45) * 0.04
    - (state.republic?.debtStrain ?? 0) * 0.07
    - (state.republic?.levyBurden ?? 0) * 0.06
    - state.war.gallicThreat * 0.12
    + planAdjustment
  )
  return {
    score: clamp(score),
    posture: score >= 65 ? 'prepared' : score >= 50 ? 'strained' : 'exposed',
    factors: { defense, reserve, planAdjustment },
  }
}

export function reconstructionForecast(state) {
  if (state.era < 3 || !state.reconstruction) return null
  const policy = state.flags?.reconstructionPolicy
  const changes = {
    devastation: policy === 'rapid' ? -4 : policy === 'planned' ? -3 : policy === 'militarized' ? -2 : -1,
    displaced: state.metrics.shelter >= 55 ? -3 : -1,
    fireExposure: policy === 'rapid' ? 4 : policy === 'planned' ? -4 : policy === 'militarized' ? -1 : 0,
    wallUrgency: (policy === 'militarized' ? -5 : policy === 'planned' ? -2 : 1) + (countFamily(state, 'defense') >= 2 ? -3 : 0),
    latinTrust: state.factions.allies >= 55 ? 2 : state.factions.allies < 35 ? -2 : 0,
  }
  return {
    changes,
    projected: updateReconstruction(state.reconstruction, changes),
    notes: [
      policy === 'rapid' ? 'Rapid return reduces devastation quickly but compounds fire and access exposure.' : policy === 'planned' ? 'Surveyed rebuilding reduces recurring exposure but returns households more slowly.' : policy === 'militarized' ? 'Fortified recovery lowers wall urgency while housing and household burdens recover more slowly.' : 'Emergency works are stabilizing the city before a reconstruction doctrine is chosen.',
      state.reconstruction.recordsIntegrity < 50 ? 'Damaged records make claims, debts, and public obligations harder to settle consistently.' : 'Surviving records keep property and public obligations legible.',
    ],
  }
}

export function regionalForecast(state) {
  if (state.era < 4 || !state.regional) return null
  const communities = Object.entries(state.regional.communities).filter(([id]) => id !== 'rome').map(([, value]) => value)
  const average = (key) => communities.reduce((sum, community) => sum + community[key], 0) / Math.max(1, communities.length)
  const routes = state.regional.roads.map((roadId) => REGIONAL_ROUTES.find((route) => route.id === roadId)).filter(Boolean)
  const roadSupply = routes.reduce((sum, route) => sum + route.supply, 0)
  const roadTrade = routes.reduce((sum, route) => sum + route.trade, 0)
  const roadResponse = routes.reduce((sum, route) => sum + route.response, 0)
  const hostileAccess = state.regional.hostileAccess + routes.reduce((sum, route) => sum + route.hostileAccess, 0)
  const cityLogistics = countFamily(state, 'grain') * 5 + countFamily(state, 'market') * 4 + countFamily(state, 'defense') * 4
  const commitments = state.regional.colonies.length * 14 + state.regional.roads.length * 5 + state.regional.administrationBurden + state.regional.garrisonDemand
  const support = state.resources.grain * 0.6 + state.resources.treasury * 0.8 + cityLogistics + roadSupply * 0.4
  const overextension = clamp(Math.round(commitments - support), 0, 100)
  const contribution = average('militaryContribution') + state.regional.militaryCoordination + state.regional.securityDoctrine
  const tradeAccess = average('tradeAccess') + roadTrade * 0.5 + state.regional.commerceDoctrine
  const revoltRisk = average('revoltRisk') + state.regional.revoltPressure + overextension * 0.25 - state.regional.allianceDoctrine * 0.4
  const resourceDelta = {
    treasury: Math.floor(tradeAccess / 35) - state.regional.colonies.length - Math.ceil((state.regional.roadProjects.length + state.regional.roads.length) / 3),
    grain: Math.floor((roadSupply + cityLogistics) / 20) - state.regional.colonies.length,
  }
  const metricDelta = {
    readiness: Math.round((contribution + roadResponse - hostileAccess - overextension) / 30),
    trade: Math.round((tradeAccess - 55) / 20),
    order: revoltRisk >= 55 ? -4 : revoltRisk <= 25 ? 2 : 0,
  }
  const projectedCommunities = Object.fromEntries(Object.entries(state.regional.communities).map(([id, community]) => [id, {
    ...community,
    revoltRisk: clamp(community.revoltRisk + (overextension >= 45 ? 3 : overextension <= 15 ? -1 : 0) + (community.autonomy < 40 ? 1 : 0)),
  }]))
  return {
    contribution: Math.round(contribution), tradeAccess: Math.round(tradeAccess), autonomy: Math.round(average('autonomy')), revoltRisk: Math.round(revoltRisk),
    roadSupply, roadTrade, roadResponse, hostileAccess, overextension, resourceDelta, metricDelta,
    projected: { ...state.regional, communities: projectedCommunities },
    notes: [
      overextension >= 45 ? 'Regional commitments exceed the city\'s current stores, treasury, roads, and defended response capacity.' : 'City infrastructure and reserves can presently support the regional obligations.',
      routes.length ? `Completed roads add ${roadSupply} supply and ${roadResponse} response, but also ${hostileAccess} total hostile access.` : 'No completed regional road yet carries supply, trade, or hostile movement.',
    ],
  }
}

export function italianForecast(state) {
  if (state.era < 5 || !state.italian) return null
  const roadComplete = state.italian.projects.viaAppia.completed
  const waterComplete = state.italian.projects.aquaAppia.completed
  const allianceSupport = Math.round((state.regional?.allianceDoctrine ?? 0) / 4)
  const reserveSupport = Math.round((state.resources.grain + state.resources.treasury) / 18)
  const changes = {
    samnitePressure: state.turn <= 26 ? -Math.max(1, Math.round((state.italian.campaignPersistence + allianceSupport - 45) / 18)) : 0,
    allianceDepth: state.factions.allies >= 55 ? 1 : state.factions.allies < 35 ? -2 : 0,
    campaignPersistence: state.metrics.readiness >= 55 ? 1 : -1,
    reserveDepth: reserveSupport - (state.workforceAllocation?.levy >= 35 ? 3 : 1),
    coalitionRisk: state.turn === 26 ? Math.max(-5, 4 - allianceSupport) : state.turn > 26 ? -1 : 1,
    pyrrhicPressure: state.turn >= 27 ? -Math.max(1, Math.round((state.italian.campaignPersistence + state.italian.allianceDepth - 80) / 20)) : 0,
    maintenanceDebt: roadComplete || waterComplete ? 1 : 0,
  }
  const treasuryUpkeep = -Math.ceil(state.italian.maintenanceDebt / 20)
  const resourceDelta = { treasury: treasuryUpkeep, grain: state.italian.reserveDepth >= 60 ? 1 : state.italian.reserveDepth < 30 ? -2 : 0 }
  const metricDelta = {
    readiness: Math.round((state.italian.campaignPersistence + state.italian.reserveDepth - state.italian.samnitePressure - state.italian.pyrrhicPressure) / 40),
    order: state.italian.maintenanceDebt >= 55 ? -3 : state.italian.coalitionRisk >= 65 ? -2 : 0,
    water: waterComplete ? 1 : 0,
    trade: roadComplete ? 1 : 0,
  }
  return {
    changes,
    resourceDelta,
    metricDelta,
    projected: updateItalian(state.italian, changes),
    notes: [
      roadComplete ? 'The Via Appia strengthens southern supply and response while leaving the same corridor open to hostile movement.' : 'The southern road remains incomplete, limiting sustained response beyond Latium.',
      waterComplete ? 'The Aqua Appia supports denser urban life, but inspection and repair now make permanent claims on public accounts.' : 'Urban water still depends on the older network while crews debate the Appian program.',
    ],
  }
}

export function allocateWorkforce(state, lane, delta) {
  if (!['farming', 'works', 'levy'].includes(lane) || !Number.isFinite(delta) || delta === 0) return state
  const allocation = { ...(state.workforceAllocation ?? { farming: 50, works: 30, levy: 20 }) }
  const amount = Math.min(10, Math.abs(Math.round(delta / 5) * 5))
  if (!amount) return state
  if (delta > 0) {
    const donors = Object.keys(allocation).filter((key) => key !== lane).sort((a, b) => allocation[b] - allocation[a])
    let remaining = Math.min(amount, 80 - allocation[lane])
    const moved = remaining
    for (const donor of donors) {
      const transfer = Math.min(remaining, Math.max(0, allocation[donor] - 10))
      allocation[donor] -= transfer
      remaining -= transfer
    }
    allocation[lane] += moved - remaining
  } else {
    const receiver = lane === 'farming' ? 'works' : 'farming'
    const moved = Math.min(amount, Math.max(0, allocation[lane] - 10), 80 - allocation[receiver])
    allocation[lane] -= moved
    allocation[receiver] += moved
  }
  const next = { ...state, workforceAllocation: allocation }
  return { ...next, actionsMax: Math.max(state.actionsUsed ?? 0, workforceSummary(next).constructionCapacity) }
}

export function selectRegionalCommunity(state, communityId) {
  return state.regional?.communities?.[communityId] ? { ...state, regional: { ...state.regional, selectedCommunity: communityId } } : state
}

export function selectRegionalRoute(state, routeId) {
  return REGIONAL_ROUTES.some((route) => route.id === routeId) && state.regional ? { ...state, regional: { ...state.regional, selectedRoute: routeId } } : state
}

export function regionalCompactAvailability(state, communityId, relationship) {
  if (!state.regional) return { ok: false, reason: 'Regional planning is not yet available.' }
  if (communityId === 'rome') return { ok: false, reason: 'Rome is the center of the compact, not a dependent community.' }
  if (!RELATIONSHIP_TYPES[relationship]) return { ok: false, reason: 'Choose a valid political relationship.' }
  const community = state.regional.communities[communityId]
  if (!community) return { ok: false, reason: 'Choose a regional community.' }
  if (community.compactRevised) return { ok: false, reason: 'This community\'s compact has already been revised in the current regional plan.' }
  if (actionRemaining(state) < 1) return { ok: false, reason: 'No shared public capacity remains this season.' }
  const treasuryCost = relationship === 'citizens' ? 4 : relationship === 'treatyAlly' ? 3 : 2
  if (state.resources.treasury < treasuryCost) return { ok: false, reason: `Need ${treasuryCost} treasury to settle rights and obligations.` }
  return { ok: true, community, definition: RELATIONSHIP_TYPES[relationship], treasuryCost }
}

export function reviseRegionalCompact(state, communityId, relationship) {
  const availability = regionalCompactAvailability(state, communityId, relationship)
  if (!availability.ok) return { state, error: availability.reason }
  const { community, definition, treasuryCost } = availability
  const coerciveShift = definition.autonomy + 20 < community.autonomy
  const revised = {
    ...community,
    relationship,
    militaryContribution: definition.militaryContribution,
    autonomy: definition.autonomy,
    tradeAccess: definition.tradeAccess,
    revoltRisk: clamp(definition.revoltRisk + (coerciveShift ? 10 : 0)),
    compactRevised: true,
  }
  return {
    state: {
      ...state,
      resources: addResources(state.resources, { treasury: -treasuryCost }),
      regional: { ...state.regional, communities: { ...state.regional.communities, [communityId]: revised } },
      actionsUsed: (state.actionsUsed ?? 0) + 1,
      actionLog: appendAction(state, { type: 'regional-compact', community: communityId, relationship }),
    },
    message: `${REGIONAL_COMMUNITIES.find((item) => item.id === communityId)?.name} now holds a ${definition.label.toLowerCase()} compact.`,
  }
}

export function regionalRoadAvailability(state, routeId) {
  if (!state.regional) return { ok: false, reason: 'Regional planning is not yet available.' }
  const route = REGIONAL_ROUTES.find((item) => item.id === routeId)
  if (!route) return { ok: false, reason: 'Choose a regional route.' }
  if (state.regional.roads.includes(routeId) || state.regional.roadProjects.some((project) => project.routeId === routeId)) return { ok: false, reason: 'This route is already complete or under construction.' }
  if (actionRemaining(state) < 1) return { ok: false, reason: 'No shared public capacity remains this season.' }
  const relief = state.regional.roadCostRelief ?? 0
  const cost = { stone: Math.max(1, 3 - relief), treasury: Math.max(2, 5 - relief), grain: 1 }
  const affordability = affordabilityFailure(state, cost)
  if (affordability) return { ok: false, reason: affordability }
  return { ok: true, route, cost }
}

export function startRegionalRoad(state, routeId) {
  const availability = regionalRoadAvailability(state, routeId)
  if (!availability.ok) return { state, error: availability.reason }
  const { route, cost } = availability
  const progress = Math.min(route.requiredSeasons, 1 + (state.regional.roadCrewBonus ?? 0))
  const completed = progress >= route.requiredSeasons
  return {
    state: {
      ...state,
      resources: addResources(state.resources, reverseChanges(cost)),
      metrics: completed ? addMap(state.metrics, { trade: Math.round(route.trade / 2), readiness: Math.round(route.response / 3) }) : state.metrics,
      regional: {
        ...state.regional,
        roads: completed ? [...state.regional.roads, route.id] : state.regional.roads,
        roadProjects: completed ? state.regional.roadProjects : [...state.regional.roadProjects, { routeId: route.id, progress, requiredSeasons: route.requiredSeasons, lastWorkedTurn: state.turn }],
        hostileAccess: state.regional.hostileAccess,
      },
      actionsUsed: (state.actionsUsed ?? 0) + 1,
      actionLog: appendAction(state, { type: 'regional-road-start', route: route.name }),
    },
    message: completed ? `${route.name} completed through the public road charter.` : `${route.name} begun; ${progress} of ${route.requiredSeasons} seasons complete.`,
  }
}

export function continueRegionalRoad(state, routeId) {
  const project = state.regional?.roadProjects.find((item) => item.routeId === routeId)
  if (!project) return { state, error: 'Choose an active regional road.' }
  if (project.lastWorkedTurn === state.turn) return { state, error: 'This road has already received crews this season.' }
  if (actionRemaining(state) < 1) return { state, error: 'No shared public capacity remains this season.' }
  const route = REGIONAL_ROUTES.find((item) => item.id === routeId)
  const progress = project.progress + 1
  const completed = progress >= project.requiredSeasons
  return {
    state: {
      ...state,
      metrics: completed ? addMap(state.metrics, { trade: Math.round(route.trade / 2), readiness: Math.round(route.response / 3) }) : state.metrics,
      regional: {
        ...state.regional,
        roads: completed ? [...state.regional.roads, route.id] : state.regional.roads,
        roadProjects: completed ? state.regional.roadProjects.filter((item) => item.routeId !== routeId) : state.regional.roadProjects.map((item) => item.routeId === routeId ? { ...item, progress, lastWorkedTurn: state.turn } : item),
        hostileAccess: state.regional.hostileAccess,
      },
      actionsUsed: (state.actionsUsed ?? 0) + 1,
      actionLog: appendAction(state, { type: 'regional-road-work', route: route.name }),
    },
    message: completed ? `${route.name} completed; supply and response improve, and the same corridor is now open to hostile movement.` : `${route.name} advanced to ${progress} of ${project.requiredSeasons} seasons.`,
  }
}

export function italianProjectAvailability(state, projectId) {
  if (!state.italian || state.era < 5) return { ok: false, reason: 'The Appian works are not yet available.' }
  const definition = ITALIAN_PROJECTS[projectId]
  const project = state.italian.projects?.[projectId]
  if (!definition || !project) return { ok: false, reason: 'Choose a valid Italian public work.' }
  if (project.completed) return { ok: false, reason: `${definition.name} is complete.` }
  if (project.lastWorkedTurn === state.turn) return { ok: false, reason: `${definition.name} has already received the shared crews this season.` }
  if (actionRemaining(state) < 1) return { ok: false, reason: 'No shared public capacity remains this season.' }
  const favored = state.flags?.appianPriority === (projectId === 'viaAppia' ? 'road' : 'water')
  const cost = { ...definition.cost, treasury: Math.max(1, definition.cost.treasury - (favored && project.progress === 0 ? 1 : 0)) }
  const affordability = affordabilityFailure(state, cost)
  if (affordability) return { ok: false, reason: affordability }
  return { ok: true, definition, project, cost }
}

export function workItalianProject(state, projectId) {
  const availability = italianProjectAvailability(state, projectId)
  if (!availability.ok) return { state, error: availability.reason }
  const { definition, project, cost } = availability
  const progress = project.progress + 1
  const completed = progress >= project.requiredSeasons
  const nextProject = { ...project, progress, completed, lastWorkedTurn: state.turn }
  let metrics = state.metrics
  let regional = state.regional
  let italian = { ...state.italian, projects: { ...state.italian.projects, [projectId]: nextProject } }
  if (completed && projectId === 'viaAppia') {
    const route = REGIONAL_ROUTES.find((item) => item.id === 'appian-corridor')
    const roads = regional?.roads.includes(route.id) ? regional.roads : [...(regional?.roads ?? []), route.id]
    regional = regional ? { ...regional, roads } : regional
    italian = updateItalian(italian, { campaignPersistence: 8, hostileAccess: route.hostileAccess })
    metrics = addMap(metrics, { trade: 6, readiness: 4 })
  }
  if (completed && projectId === 'aquaAppia') {
    italian = updateItalian(italian, { waterCapacity: 18, maintenanceDebt: 6 })
    metrics = addMap(metrics, { water: 12, sanitation: 4 })
  }
  return {
    state: {
      ...state,
      resources: addResources(state.resources, reverseChanges(cost)),
      metrics,
      regional,
      italian,
      actionsUsed: (state.actionsUsed ?? 0) + 1,
      actionLog: appendAction(state, { type: 'italian-project', project: definition.name, progress, requiredSeasons: project.requiredSeasons }),
    },
    message: completed ? `${definition.name} completed after ${project.requiredSeasons} seasons of shared crews and materials.` : `${definition.name} advanced to ${progress} of ${project.requiredSeasons} seasons.`,
  }
}

export function mediterraneanProjectAvailability(state, projectId) {
  const blocked = (reason) => ({ available: false, ok: false, reason })
  if (!state.mediterranean || state.era < 6) return blocked('Republican public works are not yet available.')
  const definition = MEDITERRANEAN_PROJECTS[projectId]
  const project = state.mediterranean.projects?.[projectId]
  if (!definition || !project) return blocked('Choose a valid Republican public work.')
  if (project.completed) return blocked(`${definition.name} is complete.`)
  if (project.lastWorkedTurn === state.turn) return blocked(`${definition.name} has already received the shared crews this season.`)
  if (actionRemaining(state) < 1) return blocked('No shared public capacity remains this season.')
  if (definition.prerequisite === 'viaAppia' && !state.italian?.projects?.viaAppia?.completed) return blocked('The inherited Via Appia must be complete first.')
  if (definition.prerequisite === 'tiberEmporium' && !state.mediterranean.projects.tiberEmporium?.completed) return blocked('The Tiber Emporium must be complete first.')
  const affordability = affordabilityFailure(state, definition.cost)
  if (affordability) return blocked(affordability)
  return { available: true, ok: true, definition, project }
}

export function workMediterraneanProject(state, projectId) {
  const availability = mediterraneanProjectAvailability(state, projectId)
  if (!availability.ok) return { state, error: availability.reason }
  const { definition, project } = availability
  const progress = project.progress + 1
  const completed = progress >= project.requiredSeasons
  const nextProject = { ...project, progress, completed, lastWorkedTurn: state.turn }
  const projects = { ...state.mediterranean.projects, [projectId]: nextProject }
  let mediterranean = { ...state.mediterranean, projects }
  let metrics = state.metrics
  let italian = state.italian
  if (completed) {
    metrics = addMap(metrics, definition.completionMetrics)
    mediterranean = updateMediterranean(mediterranean, definition.completionMediterranean)
    italian = updateItalian(italian, definition.completionItalian)
  }
  return {
    state: { ...state, resources: addResources(state.resources, reverseChanges(definition.cost)), metrics, italian, mediterranean, actionsUsed: (state.actionsUsed ?? 0) + 1, actionLog: appendAction(state, { type: 'republican-public-work', project: definition.name, progress, requiredSeasons: project.requiredSeasons }) },
    message: completed ? `${definition.name} completed; its access, service, and upkeep obligations now enter the city ledger.` : `${definition.name} advanced to ${progress} of ${project.requiredSeasons} seasons.`,
  }
}

export function metropolitanProjectAvailability(state, projectId) {
  const blocked = (reason) => ({ available: false, ok: false, reason })
  if (!state.metropolitan || state.era < 7) return blocked('Metropolitan public works are not yet available.')
  const definition = METROPOLITAN_PROJECTS[projectId]
  const project = state.metropolitan.projects?.[projectId]
  if (!definition || !project) return blocked('Choose a valid metropolitan public work.')
  if (project.completed) return blocked(`${definition.name} is complete.`)
  if (project.lastWorkedTurn === state.turn) return blocked(`${definition.name} has already received the shared crews this season.`)
  if (actionRemaining(state) < 1) return blocked('No shared public capacity remains this season.')
  if (definition.prerequisite === 'tiberEmporium' && !state.mediterranean?.projects?.tiberEmporium?.completed) return blocked('The inherited Tiber Emporium must be complete first.')
  if (definition.prerequisite === 'aquaAppia' && !state.italian?.projects?.aquaAppia?.completed) return blocked('The inherited Aqua Appia must be complete first.')
  if (definition.prerequisite === 'republicanBasilica' && !state.metropolitan.projects.republicanBasilica?.completed) return blocked('The Republican Basilica must be complete first.')
  const affordability = affordabilityFailure(state, definition.cost)
  if (affordability) return blocked(affordability)
  return { available: true, ok: true, definition, project }
}

export function workMetropolitanProject(state, projectId) {
  const availability = metropolitanProjectAvailability(state, projectId)
  if (!availability.ok) return { state, error: availability.reason }
  const { definition, project } = availability
  const progress = project.progress + 1
  const completed = progress >= project.requiredSeasons
  const nextProject = { ...project, progress, completed, lastWorkedTurn: state.turn }
  let metropolitan = { ...state.metropolitan, projects: { ...state.metropolitan.projects, [projectId]: nextProject } }
  let metrics = state.metrics
  if (completed) {
    metrics = addMap(metrics, definition.completionMetrics)
    metropolitan = updateMetropolitan(metropolitan, definition.completionMetropolitan)
  }
  return {
    state: {
      ...state,
      resources: addResources(state.resources, reverseChanges(definition.cost)),
      metrics,
      metropolitan,
      actionsUsed: (state.actionsUsed ?? 0) + 1,
      actionLog: appendAction(state, { type: 'metropolitan-public-work', project: definition.name, progress, requiredSeasons: project.requiredSeasons }),
    },
    message: completed ? `${definition.name} completed; its civic capacity and permanent service burden now enter the metropolitan ledger.` : `${definition.name} advanced to ${progress} of ${project.requiredSeasons} seasons.`,
  }
}

export function republicStrainProjectAvailability(state, projectId) {
  const blocked = (reason) => ({ available: false, ok: false, reason })
  if (!state.republicStrain || state.era < 8) return blocked('Republic Under Strain public works are not yet available.')
  const definition = REPUBLIC_STRAIN_PROJECTS[projectId]
  const project = state.republicStrain.projects?.[projectId]
  if (!definition || !project) return blocked('Choose a valid late-Republic civic work.')
  if (state.turn < definition.unlockTurn) return blocked(`Available in ${formatYear(TURN_YEARS[definition.unlockTurn - 1])}.`)
  if (project.completed) return blocked(`${definition.name} is complete.`)
  if (project.lastWorkedTurn === state.turn) return blocked(`${definition.name} has already received the shared crews this season.`)
  if (actionRemaining(state) < 1) return blocked('No shared public capacity remains this season.')
  if (definition.prerequisite === 'republicanBasilica' && !state.metropolitan?.projects?.republicanBasilica?.completed) return blocked('A completed Republican Basilica is required first.')
  if (definition.prerequisite === 'landCensusRegistry' && !state.republicStrain.projects.landCensusRegistry?.completed) return blocked('The Land and Census Registry must be complete first.')
  const affordability = affordabilityFailure(state, definition.cost)
  if (affordability) return blocked(affordability)
  return { available: true, ok: true, definition, project }
}

export function workRepublicStrainProject(state, projectId) {
  const availability = republicStrainProjectAvailability(state, projectId)
  if (!availability.ok) return { state, error: availability.reason }
  const { definition, project } = availability
  const progress = project.progress + 1
  const completed = progress >= project.requiredSeasons
  const nextProject = { ...project, progress, completed, lastWorkedTurn: state.turn }
  let republicStrain = { ...state.republicStrain, projects: { ...state.republicStrain.projects, [projectId]: nextProject } }
  let metrics = state.metrics
  if (completed) {
    metrics = addMap(metrics, definition.completionMetrics)
    republicStrain = updateRepublicStrain(republicStrain, definition.completionStrain)
  }
  return {
    state: {
      ...state,
      resources: addResources(state.resources, reverseChanges(definition.cost)),
      metrics,
      republicStrain,
      actionsUsed: (state.actionsUsed ?? 0) + 1,
      actionLog: appendAction(state, { type: 'late-republic-civic-work', project: definition.name, progress, requiredSeasons: project.requiredSeasons }),
    },
    message: completed ? `${definition.name} completed; its capacity and operating burden now enter the late-Republic ledger.` : `${definition.name} advanced to ${progress} of ${project.requiredSeasons} seasons.`,
  }
}

export function civilSettlementProjectAvailability(state, projectId) {
  const blocked = (reason) => ({ available: false, ok: false, reason })
  if (!state.civilSettlement || state.era < 9) return blocked('Civil War and Settlement public works are not yet available.')
  const definition = CIVIL_SETTLEMENT_PROJECTS[projectId]
  const project = state.civilSettlement.projects?.[projectId]
  if (!definition || !project) return blocked('Choose a valid civil-settlement work.')
  if (state.turn < definition.unlockTurn) return blocked(`Available in ${formatYear(TURN_YEARS[definition.unlockTurn - 1])}.`)
  if (project.completed) return blocked(`${definition.name} is complete.`)
  if (project.lastWorkedTurn === state.turn) return blocked(`${definition.name} has already received the shared crews this season.`)
  if (actionRemaining(state) < 1) return blocked('No shared public capacity remains this season.')
  if (definition.prerequisite === 'caesarianForum' && !state.civilSettlement.projects.caesarianForum?.completed) return blocked('The Forum of Caesar precinct must be operating first.')
  const affordability = affordabilityFailure(state, definition.cost)
  if (affordability) return blocked(affordability)
  return { available: true, ok: true, definition, project }
}

export function workCivilSettlementProject(state, projectId) {
  const availability = civilSettlementProjectAvailability(state, projectId)
  if (!availability.ok) return { state, error: availability.reason }
  const { definition, project } = availability
  const progress = project.progress + 1
  const completed = progress >= project.requiredSeasons
  const nextProject = { ...project, progress, completed, lastWorkedTurn: state.turn }
  let civilSettlement = { ...state.civilSettlement, projects: { ...state.civilSettlement.projects, [projectId]: nextProject } }
  let metrics = state.metrics
  if (completed) {
    metrics = addMap(metrics, definition.completionMetrics)
    civilSettlement = updateCivilSettlement(civilSettlement, definition.completionSettlement)
  }
  return {
    state: {
      ...state,
      resources: addResources(state.resources, reverseChanges(definition.cost)),
      metrics,
      civilSettlement,
      actionsUsed: (state.actionsUsed ?? 0) + 1,
      actionLog: appendAction(state, { type: 'civil-settlement-public-work', project: definition.name, progress, requiredSeasons: project.requiredSeasons }),
    },
    message: completed ? `${definition.name} completed; its civic capacity and permanent operating burden enter the settlement ledger.` : `${definition.name} advanced to ${progress} of ${project.requiredSeasons} stages.`,
  }
}

export function augustanProjectAvailability(state, projectId) {
  const blocked = (reason) => ({ available: false, ok: false, reason })
  if (!state.augustanCity || state.era < 10) return blocked('The Augustan City public works are not yet available.')
  const definition = AUGUSTAN_PROJECTS[projectId]
  const project = state.augustanCity.projects?.[projectId]
  if (!definition || !project) return blocked('Choose a valid Augustan work.')
  if (state.turn < definition.unlockTurn) return blocked(`Available in ${formatYear(TURN_YEARS[definition.unlockTurn - 1])}.`)
  if (project.completed) return blocked(`${definition.name} is operating.`)
  if (project.lastWorkedTurn === state.turn) return blocked(`${definition.name} has already received the shared crews this turn.`)
  if (actionRemaining(state) < 1) return blocked('No shared public capacity remains this turn.')
  const affordability = affordabilityFailure(state, definition.cost)
  if (affordability) return blocked(affordability)
  return { available: true, ok: true, definition, project }
}

export function workAugustanProject(state, projectId) {
  const availability = augustanProjectAvailability(state, projectId)
  if (!availability.ok) return { state, error: availability.reason }
  const { definition, project } = availability
  const progress = project.progress + 1
  const completed = progress >= project.requiredSeasons
  const nextProject = { ...project, progress, completed, lastWorkedTurn: state.turn }
  let augustanCity = { ...state.augustanCity, projects: { ...state.augustanCity.projects, [projectId]: nextProject } }
  let metrics = state.metrics
  if (completed) {
    metrics = addMap(metrics, definition.completionMetrics)
    augustanCity = updateAugustanCity(augustanCity, definition.completionAugustan)
  }
  return {
    state: {
      ...state,
      resources: addResources(state.resources, reverseChanges(definition.cost)),
      metrics,
      augustanCity,
      actionsUsed: (state.actionsUsed ?? 0) + 1,
      actionLog: appendAction(state, { type: 'augustan-public-work', project: definition.name, progress, requiredSeasons: project.requiredSeasons }),
    },
    message: completed ? `${definition.name} is operating; its service and upkeep enter the Augustan ledger.` : `${definition.name} advanced to ${progress} of ${project.requiredSeasons} stages.`,
  }
}

function reducePopulation(population, amount) {
  const total = Math.max(100, population.total - amount)
  const factor = total / population.total
  const districts = Object.fromEntries(Object.entries(population.districts).map(([id, value]) => [id, Math.round(value * factor)]))
  const composition = Object.fromEntries(['households', 'dependents', 'workers', 'levyEligible', 'craftsmen'].map((key) => [key, Math.round(population[key] * factor)]))
  return { ...population, ...composition, total, districts, lastChange: { ...population.lastChange, departures: (population.lastChange?.departures ?? 0) + amount, net: -amount } }
}

export function regionalColonyAvailability(state, communityId) {
  if (!state.regional) return { ok: false, reason: 'Regional planning is not yet available.' }
  if (!state.regional.communities[communityId] || communityId === 'rome') return { ok: false, reason: 'Choose a community outside Rome.' }
  if (state.regional.colonies.some((colony) => colony.communityId === communityId)) return { ok: false, reason: 'A colony is already committed here.' }
  if (actionRemaining(state) < 1) return { ok: false, reason: 'No shared public capacity remains this season.' }
  const settlers = Math.max(35, 60 - (state.regional.colonySettlerRelief ?? 0))
  const garrison = 20 + (state.regional.garrisonDemand ?? 0)
  const cost = { grain: 4, treasury: 5, bronze: 1 }
  if (state.population.total - settlers < 500) return { ok: false, reason: `The city cannot spare ${settlers} settlers and sustain its present households.` }
  const affordability = affordabilityFailure(state, cost)
  if (affordability) return { ok: false, reason: affordability }
  return { ok: true, settlers, garrison, cost }
}

export function foundRegionalColony(state, communityId) {
  const availability = regionalColonyAvailability(state, communityId)
  if (!availability.ok) return { state, error: availability.reason }
  const { settlers, garrison, cost } = availability
  const community = state.regional.communities[communityId]
  const nextCommunity = { ...community, militaryContribution: clamp(community.militaryContribution + 12), autonomy: clamp(community.autonomy - 10), tradeAccess: clamp(community.tradeAccess + 5), revoltRisk: clamp(community.revoltRisk + 8) }
  return {
    state: {
      ...state,
      resources: addResources(state.resources, reverseChanges(cost)),
      population: reducePopulation(state.population, settlers),
      republic: updateRepublic(state.republic, { levyBurden: 3, assemblyConsent: -2 }),
      regional: { ...state.regional, communities: { ...state.regional.communities, [communityId]: nextCommunity }, colonies: [...state.regional.colonies, { communityId, settlers, garrison, foundedTurn: state.turn }] },
      actionsUsed: (state.actionsUsed ?? 0) + 1,
      actionLog: appendAction(state, { type: 'regional-colony', community: communityId, settlers, garrison }),
    },
    message: `${settlers} settlers and a garrison of ${garrison} committed to ${REGIONAL_COMMUNITIES.find((item) => item.id === communityId)?.name}.`,
  }
}

const adjacencyRules = [
  { family: 'housing', partner: 'water', effects: { sanitation: 3, shelter: 1 }, label: 'Nearby water supports denser households.' },
  { family: 'housing', partner: 'shrine', effects: { order: 2, auspices: 1 }, label: 'Households gather around a common sacred precinct.' },
  { family: 'market', partner: 'grain', effects: { food: 2, trade: 3 }, label: 'Stored grain gives the market depth and regularity.' },
  { family: 'market', partner: 'defense', effects: { order: 2, trade: 1 }, label: 'A guarded route stabilizes exchange.' },
  { family: 'workshop', partner: 'water', effects: { sanitation: 3 }, label: 'Water access contains workshop fire and waste.' },
  { family: 'defense', partner: 'workshop', effects: { readiness: 3 }, label: 'Nearby craft keeps arms and gates serviceable.' },
  { family: 'drainage', partner: 'market', effects: { trade: 2, sanitation: 2 }, label: 'Drainage makes crowded exchange sustainable.' },
]

function linkedFamilyCount(state, districtId, familyId) {
  const district = getDistrict(districtId)
  const linked = new Set([districtId, ...(district?.neighbors ?? [])])
  return state.buildings.filter((building) => linked.has(building.districtId) && building.familyId === familyId && (building.condition ?? 100) >= 40).length
}

export function siteAnalysis(state, familyId, districtId, definition = getTier(familyId, state.era)) {
  const district = getDistrict(districtId)
  if (!district || !definition) return { effects: {}, bonuses: [], warnings: [] }
  const bonuses = []
  const warnings = []
  let effects = {}
  const terrainFit = district.favored.includes(familyId) || definition.preferredTerrain?.some((terrain) => district.terrain.includes(terrain))
  if (terrainFit) {
    const terrainEffects = Object.fromEntries(Object.entries(definition.effects).filter(([, value]) => value > 0).map(([key]) => [key, 2]))
    effects = mergeChanges(effects, terrainEffects)
    bonuses.push(`${district.name} specialty: positive effects gain +2.`)
  } else {
    warnings.push(`This work does not match ${district.name}'s primary specialties.`)
  }
  for (const rule of adjacencyRules) {
    const appliesForward = rule.family === familyId && linkedFamilyCount(state, districtId, rule.partner) > 0
    const appliesReverse = rule.partner === familyId && linkedFamilyCount(state, districtId, rule.family) > 0
    if (appliesForward || appliesReverse) {
      effects = mergeChanges(effects, rule.effects)
      bonuses.push(rule.label)
    }
  }
  if (definition.effects.sanitation < 0 && linkedFamilyCount(state, districtId, 'water') === 0) warnings.push('Fire and waste risk lacks nearby water support.')
  if (district.terrain.includes('floodplain') && familyId !== 'drainage') warnings.push('Floodplain works may be damaged when the Tiber rises.')
  return { effects, bonuses, warnings, terrainFit }
}

function prerequisiteFailure(state, building, districtId, ignoreInstanceId = null) {
  if (building.unique && (
    state.buildings.some((item) => item.buildingId === building.id && item.instanceId !== ignoreInstanceId)
    || (state.projects ?? []).some((project) => project.buildingId === building.id)
  )) return 'Only one may be built.'
  if (building.district && building.district !== districtId) return `Must be built in ${getDistrict(building.district).name}.`
  if (building.requiresFamily && countFamily(state, building.requiresFamily) === 0) return `Requires ${getFamily(building.requiresFamily).name.toLowerCase()} first.`
  if (building.requiresBuilding && !hasBuilding(state, building.requiresBuilding)) return `Requires ${definitionFor(building.requiresBuilding)?.name}.`
  if (building.requiresSenate && (state.republic?.senateStanding ?? 0) < building.requiresSenate) return `Requires Senate standing of ${building.requiresSenate} to sustain public credit.`
  if (building.requiresReconstruction && state.era < 3) return 'This work belongs to the reconstruction of the damaged city.'
  const district = getDistrict(districtId)
  if (building.forbiddenTerrain?.some((terrain) => district.terrain.includes(terrain))) return 'The ground is unsuitable for this work.'
  return null
}

function affordabilityFailure(state, cost) {
  const missing = Object.entries(cost).filter(([resource, amount]) => (state.resources[resource] ?? 0) < amount)
  return missing.length ? `Need ${missing.map(([key, amount]) => `${amount} ${key}`).join(', ')}.` : null
}

export function buildingAvailability(state, familyId, districtId) {
  const family = getFamily(familyId)
  const district = getDistrict(districtId)
  const building = getTier(familyId, state.era)
  if (!family || !district || !building) return { ok: false, reason: 'Select a district and building.' }
  if (state.outcome) return { ok: false, reason: 'The campaign is complete.' }
  if (state.era < building.era) return { ok: false, reason: 'This form belongs to a later era.' }
  const prerequisite = prerequisiteFailure(state, building, districtId)
  if (prerequisite) return { ok: false, reason: prerequisite }
  const occupied = state.buildings.filter((item) => item.districtId === districtId).length + (state.projects ?? []).filter((project) => project.districtId === districtId && !project.replaceInstanceId).length
  if (occupied >= district.capacity) return { ok: false, reason: 'This district has no open plots.' }
  const capacityCost = building.projectTurns ? 1 : building.actionCost
  if (actionRemaining(state) < capacityCost) return { ok: false, reason: `Requires ${capacityCost} public-works capacity; ${actionRemaining(state)} remains.` }
  const affordability = affordabilityFailure(state, building.cost)
  if (affordability) return { ok: false, reason: affordability }
  return { ok: true, building, district, family, site: siteAnalysis(state, familyId, districtId, building) }
}

function appliedEffectsFor(state, familyId, districtId, building) {
  return mergeChanges(building.effects, siteAnalysis(state, familyId, districtId, building).effects)
}

function appendAction(state, entry) {
  return [...(state.actionLog ?? []), { turn: state.turn, ...entry }]
}

function createBuildingInstance(state, familyId, districtId, building, instanceId = null) {
  const family = getFamily(familyId)
  return {
    instanceId: instanceId ?? `${building.id}-${state.turn}-${state.buildings.length + 1}`,
    familyId,
    buildingId: building.id,
    name: building.name,
    tier: building.era + 1,
    districtId,
    builtTurn: state.turn,
    color: family.color,
    condition: 100,
    appliedEffects: appliedEffectsFor(state, familyId, districtId, building),
  }
}

function startProject(state, building, familyId, districtId, cost, replaceInstanceId = null) {
  const project = {
    projectId: `${building.id}-project-${state.turn}-${(state.projects ?? []).length + 1}`,
    buildingId: building.id,
    familyId,
    name: building.name,
    districtId,
    requiredSeasons: building.projectTurns,
    progress: 1,
    startedTurn: state.turn,
    lastWorkedTurn: state.turn,
    pausedSeasons: 0,
    replaceInstanceId,
  }
  return {
    ...state,
    resources: addResources(state.resources, reverseChanges(cost)),
    projects: [...(state.projects ?? []), project],
    actionsUsed: (state.actionsUsed ?? 0) + 1,
    selectedBuildingId: replaceInstanceId,
    actionLog: appendAction(state, { type: 'project-start', building: building.name, district: getDistrict(districtId).name }),
  }
}

export function placeBuilding(state, familyId, districtId) {
  const availability = buildingAvailability(state, familyId, districtId)
  if (!availability.ok) return { state, error: availability.reason }
  const { building, district, site } = availability
  const cost = reverseChanges(building.cost)
  if (building.projectTurns) {
    return {
      state: startProject(state, building, familyId, districtId, building.cost),
      message: `${building.name} begun on the ${district.name}. Work stands at 1 of ${building.projectTurns} seasons and may be resumed later.`,
    }
  }
  const instance = createBuildingInstance(state, familyId, districtId, building)
  return {
    state: {
      ...state,
      resources: addResources(state.resources, cost),
      metrics: addMap(state.metrics, instance.appliedEffects),
      buildings: [...state.buildings, instance],
      selectedBuildingId: instance.instanceId,
      actionsUsed: (state.actionsUsed ?? 0) + building.actionCost,
      actionLog: appendAction(state, { type: 'build', building: building.name, district: district.name }),
    },
    message: `${building.name} established on the ${district.name}${site.bonuses.length ? `; ${site.bonuses.length} site bonus${site.bonuses.length === 1 ? '' : 'es'} applied` : ''}.`,
  }
}

function upgradeCost(building) {
  return Object.fromEntries(Object.entries(building.cost).map(([resource, amount]) => [resource, Math.max(1, Math.ceil(amount * 0.65))]))
}

export function upgradeAvailability(state, instanceId) {
  const placed = state.buildings.find((building) => building.instanceId === instanceId)
  if (!placed) return { ok: false, reason: 'Select an existing work.' }
  const family = getFamily(placed.familyId)
  const next = family?.tiers[placed.tier]
  if (!next) return { ok: false, reason: 'This work is already at its highest current form.' }
  if (state.era < next.era) return { ok: false, reason: 'The next form belongs to a later era.' }
  const prerequisite = prerequisiteFailure(state, next, placed.districtId, placed.instanceId)
  if (prerequisite) return { ok: false, reason: prerequisite }
  if ((state.projects ?? []).some((project) => project.replaceInstanceId === instanceId)) return { ok: false, reason: 'An upgrade project is already underway here.' }
  const capacityCost = next.projectTurns ? 1 : next.actionCost
  if (actionRemaining(state) < capacityCost) return { ok: false, reason: `Requires ${capacityCost} public-works capacity; ${actionRemaining(state)} remains.` }
  const cost = upgradeCost(next)
  const affordability = affordabilityFailure(state, cost)
  if (affordability) return { ok: false, reason: affordability }
  return { ok: true, placed, next, family, cost, site: siteAnalysis(state, placed.familyId, placed.districtId, next) }
}

export function upgradeBuilding(state, instanceId) {
  const availability = upgradeAvailability(state, instanceId)
  if (!availability.ok) return { state, error: availability.reason }
  const { placed, next, cost, site } = availability
  if (next.projectTurns) {
    return {
      state: startProject(state, next, placed.familyId, placed.districtId, cost, placed.instanceId),
      message: `${next.name} begun around the existing ${placed.name}. Work stands at 1 of ${next.projectTurns} seasons.`,
    }
  }
  const oldDefinition = definitionFor(placed.buildingId)
  const oldEffects = placed.appliedEffects ?? oldDefinition?.effects ?? {}
  const nextEffects = appliedEffectsFor(state, placed.familyId, placed.districtId, next)
  const upgraded = { ...placed, buildingId: next.id, name: next.name, tier: next.era + 1, condition: 100, appliedEffects: nextEffects, upgradedTurn: state.turn }
  return {
    state: {
      ...state,
      resources: addResources(state.resources, reverseChanges(cost)),
      metrics: addMap(addMap(state.metrics, reverseChanges(oldEffects)), nextEffects),
      buildings: state.buildings.map((building) => building.instanceId === instanceId ? upgraded : building),
      actionsUsed: (state.actionsUsed ?? 0) + next.actionCost,
      actionLog: appendAction(state, { type: 'upgrade', building: `${placed.name} to ${next.name}`, district: getDistrict(placed.districtId).name }),
    },
    message: `${placed.name} rebuilt as ${next.name}${site.bonuses.length ? ' with its linked-district bonuses intact' : ''}.`,
  }
}

export function projectAvailability(state, projectId) {
  const project = (state.projects ?? []).find((item) => item.projectId === projectId)
  if (!project) return { ok: false, reason: 'Select an active project.' }
  if (project.lastWorkedTurn === state.turn) return { ok: false, reason: 'This project has already received its work crew this season.' }
  if (actionRemaining(state) < 1) return { ok: false, reason: 'No public-works capacity remains this season.' }
  return { ok: true, project }
}

export function continueProject(state, projectId) {
  const availability = projectAvailability(state, projectId)
  if (!availability.ok) return { state, error: availability.reason }
  const { project } = availability
  const progress = project.progress + 1
  const worked = { ...project, progress, lastWorkedTurn: state.turn, pausedSeasons: 0 }
  const baseState = {
    ...state,
    actionsUsed: (state.actionsUsed ?? 0) + 1,
    projects: state.projects.map((item) => item.projectId === projectId ? worked : item),
    actionLog: appendAction(state, { type: 'project-work', building: project.name, district: getDistrict(project.districtId).name }),
  }
  if (progress < project.requiredSeasons) {
    return { state: baseState, message: `${project.name} advanced to ${progress} of ${project.requiredSeasons} work seasons.` }
  }
  const definition = definitionFor(project.buildingId)
  const old = project.replaceInstanceId ? state.buildings.find((building) => building.instanceId === project.replaceInstanceId) : null
  const instance = createBuildingInstance(state, project.familyId, project.districtId, definition, old?.instanceId)
  const withoutOld = old ? state.buildings.filter((building) => building.instanceId !== old.instanceId) : state.buildings
  const metricsWithoutOld = old ? addMap(state.metrics, reverseChanges(old.appliedEffects ?? definitionFor(old.buildingId)?.effects ?? {})) : state.metrics
  return {
    state: {
      ...baseState,
      metrics: addMap(metricsWithoutOld, instance.appliedEffects),
      buildings: [...withoutOld, instance],
      projects: baseState.projects.filter((item) => item.projectId !== projectId),
      selectedBuildingId: instance.instanceId,
      actionLog: appendAction(baseState, { type: 'project-complete', building: project.name, district: getDistrict(project.districtId).name }),
    },
    message: `${project.name} completed after ${project.requiredSeasons} seasons of organized work.`,
  }
}

export function repairAvailability(state, instanceId) {
  const placed = state.buildings.find((building) => building.instanceId === instanceId)
  if (!placed) return { ok: false, reason: 'Select an existing work.' }
  if ((placed.condition ?? 100) >= 100) return { ok: false, reason: 'This work is already in full repair.' }
  if (actionRemaining(state) < 1) return { ok: false, reason: 'No public-works capacity remains this season.' }
  const cost = placed.tier === 1 ? { timber: 1 } : { stone: 1 }
  const affordability = affordabilityFailure(state, cost)
  if (affordability) return { ok: false, reason: affordability }
  return { ok: true, placed, cost }
}

export function repairBuilding(state, instanceId) {
  const availability = repairAvailability(state, instanceId)
  if (!availability.ok) return { state, error: availability.reason }
  const { placed, cost } = availability
  const repaired = { ...placed, condition: Math.min(100, (placed.condition ?? 100) + 40) }
  return {
    state: {
      ...state,
      resources: addResources(state.resources, reverseChanges(cost)),
      buildings: state.buildings.map((building) => building.instanceId === instanceId ? repaired : building),
      actionsUsed: (state.actionsUsed ?? 0) + 1,
      actionLog: appendAction(state, { type: 'repair', building: placed.name, district: getDistrict(placed.districtId).name }),
    },
    message: `${placed.name} repaired to ${repaired.condition}% condition.`,
  }
}

export function removeAvailability(state, instanceId) {
  const placed = state.buildings.find((building) => building.instanceId === instanceId)
  if (!placed) return { ok: false, reason: 'Select an existing work.' }
  if (actionRemaining(state) < 1) return { ok: false, reason: 'No public-works capacity remains this season.' }
  return { ok: true, placed }
}

export function removeBuilding(state, instanceId) {
  const availability = removeAvailability(state, instanceId)
  if (!availability.ok) return { state, error: availability.reason }
  const { placed } = availability
  const definition = definitionFor(placed.buildingId)
  const appliedEffects = placed.appliedEffects ?? definition?.effects ?? {}
  const refund = Object.fromEntries(Object.entries(definition?.cost ?? {}).map(([resource, amount]) => [resource, Math.floor(amount * 0.25)]).filter(([, amount]) => amount > 0))
  return {
    state: {
      ...state,
      resources: addResources(state.resources, refund),
      metrics: addMap(state.metrics, reverseChanges(appliedEffects)),
      buildings: state.buildings.filter((building) => building.instanceId !== instanceId),
      selectedBuildingId: null,
      actionsUsed: (state.actionsUsed ?? 0) + 1,
      actionLog: appendAction(state, { type: 'remove', building: placed.name, district: getDistrict(placed.districtId).name }),
    },
    message: `${placed.name} cleared; salvage returned to the stores.`,
  }
}

const mergeFlagChanges = (flags, changes = {}) => ({ ...flags, ...changes })

export function resolveCouncil(state, optionId) {
  if (!state.council || state.councilResolved) return state
  const option = state.council.options.find((item) => item.id === optionId)
  if (!option) return state
  const impacts = option.impacts ?? {}
  const nextWorksBonus = (state.nextWorksBonus ?? 0) + (impacts.worksBonus ?? 0)
  const nextRepublic = updateRepublic(state.republic, impacts.republic)
  const nextWar = updateWar(state.war, impacts.war)
  const nextReconstruction = updateReconstruction(state.reconstruction, impacts.reconstruction)
  const nextRegional = updateRegional(state.regional, impacts.regional)
  const nextItalian = updateItalian(state.italian, impacts.italian)
  const nextMediterranean = state.mediterranean
    ? updateMediterranean({ ...createMediterraneanState(), ...state.mediterranean }, impacts.mediterranean)
    : state.mediterranean
  const nextMetropolitan = state.metropolitan
    ? updateMetropolitan({ ...createMetropolitanState(), ...state.metropolitan }, impacts.metropolitan)
    : state.metropolitan
  const nextRepublicStrain = state.republicStrain
    ? updateRepublicStrain({ ...createRepublicStrainState(), ...state.republicStrain }, impacts.strain)
    : state.republicStrain
  const nextCivilSettlement = state.civilSettlement
    ? updateCivilSettlement({ ...createCivilSettlementState(), ...state.civilSettlement }, impacts.settlement)
    : state.civilSettlement
  const nextAugustanCity = state.augustanCity
    ? updateAugustanCity({ ...createAugustanState(state.civilSettlement), ...state.augustanCity }, impacts.augustan)
    : state.augustanCity
  const nextFlags = mergeFlagChanges(state.flags, impacts.flags)
  const capacityState = { ...state, nextWorksBonus, republic: nextRepublic, war: nextWar, reconstruction: nextReconstruction, regional: nextRegional, italian: nextItalian, mediterranean: nextMediterranean, metropolitan: nextMetropolitan, republicStrain: nextRepublicStrain, civilSettlement: nextCivilSettlement, augustanCity: nextAugustanCity, flags: nextFlags }
  return {
    ...state,
    resources: addResources(state.resources, impacts.resources),
    metrics: addMap(state.metrics, impacts.metrics),
    factions: addMap(state.factions, impacts.factions),
    flags: nextFlags,
    republic: nextRepublic,
    war: nextWar,
    reconstruction: nextReconstruction,
    regional: nextRegional,
    italian: nextItalian,
    mediterranean: nextMediterranean,
    metropolitan: nextMetropolitan,
    republicStrain: nextRepublicStrain,
    civilSettlement: nextCivilSettlement,
    augustanCity: nextAugustanCity,
    nextWorksBonus,
    actionsMax: Math.max(state.actionsUsed ?? 0, workforceSummary(capacityState).constructionCapacity),
    councilResolved: true,
    choiceLog: [...state.choiceLog, { turn: state.turn, councilId: state.council.id, council: state.council.title, optionId, option: option.label }],
  }
}

function conditionFactor(condition = 100) {
  if (condition < 40) return 0
  if (condition < 70) return 0.5
  return 1
}

export function populationCapacity(state) {
  const districts = Object.fromEntries(DISTRICTS.map((district) => [district.id, district.baseHousing ?? 0]))
  const networks = districtNetworkReport(state)
  for (const placed of state.buildings) {
    let capacity = definitionFor(placed.buildingId)?.housingCapacity ?? 0
    if (capacity && placed.tier >= 2) capacity = Math.round(capacity * networks[placed.districtId].housingCapacityFactor)
    districts[placed.districtId] += Math.round(capacity * conditionFactor(placed.condition))
  }
  return { districts, total: Object.values(districts).reduce((sum, value) => sum + value, 0) }
}

function populationComposition(total, state) {
  const craftShare = Math.min(0.1, 0.04 + countFamily(state, 'workshop') * 0.01)
  const craftsmen = Math.round(total * craftShare)
  const dependents = Math.round(total * 0.4)
  const levyEligible = Math.round(total * 0.14)
  const workers = Math.max(0, total - dependents - levyEligible - craftsmen)
  return { total, households: Math.ceil(total / 5), dependents, workers, levyEligible, craftsmen }
}

function currentDistrictPopulation(state) {
  if (state.population?.districts) return state.population.districts
  return Object.fromEntries(DISTRICTS.map((district) => [district.id, district.startingPopulation ?? 0]))
}

function allocatePopulation(total, state, capacities) {
  const current = currentDistrictPopulation(state)
  const currentTotal = Object.values(current).reduce((sum, value) => sum + value, 0)
  const allocated = Object.fromEntries(DISTRICTS.map((district) => [district.id, 0]))
  if (total <= currentTotal) {
    let assigned = 0
    for (const district of DISTRICTS) {
      const share = currentTotal ? current[district.id] / currentTotal : 0
      const value = Math.min(capacities[district.id], Math.floor(total * share))
      allocated[district.id] = value
      assigned += value
    }
    let remainder = total - assigned
    for (const district of [...DISTRICTS].sort((a, b) => current[b.id] - current[a.id])) {
      const room = capacities[district.id] - allocated[district.id]
      const addition = Math.min(room, remainder)
      allocated[district.id] += addition
      remainder -= addition
      if (!remainder) break
    }
    return allocated
  }

  for (const district of DISTRICTS) allocated[district.id] = Math.min(current[district.id] ?? 0, capacities[district.id])
  let remainder = total - Object.values(allocated).reduce((sum, value) => sum + value, 0)
  const byRoom = [...DISTRICTS].sort((a, b) => (capacities[b.id] - allocated[b.id]) - (capacities[a.id] - allocated[a.id]))
  for (const district of byRoom) {
    const room = capacities[district.id] - allocated[district.id]
    const addition = Math.min(room, remainder)
    allocated[district.id] += addition
    remainder -= addition
    if (!remainder) break
  }
  return allocated
}

export function projectPopulation(state, event = null) {
  const population = state.population ?? { ...populationComposition(1030, state), districts: currentDistrictPopulation(state) }
  const total = population.total
  const capacity = populationCapacity(state)
  const { food, water, shelter, sanitation, order } = state.metrics
  const healthFactor = (food + water + sanitation) / 300
  const births = Math.max(1, Math.round(total * 0.012 * healthFactor))
  const favorable = Math.min(food, water, shelter, sanitation, order) >= 45
  const openHousing = Math.max(0, capacity.total - total)
  const arrivals = favorable ? Math.min(openHousing, Math.round(total * 0.015 * ((food + water + order) / 300))) : 0
  const basicDeficit = Math.max(0, 45 - food) + Math.max(0, 45 - water) + Math.max(0, 45 - shelter)
  const departuresFromStrain = Math.round(total * basicDeficit / 900)
  const risks = districtRiskReport(state)
  const weightedDisease = Object.values(risks).reduce((sum, risk) => sum + risk.disease * risk.population, 0) / Math.max(1, total)
  const sanitationIllness = sanitation < 45 ? Math.round(total * (45 - sanitation) / 700) : 0
  const exposureIllness = Math.round(total * Math.max(0, weightedDisease - 38) / 2600)
  const illness = sanitationIllness + exposureIllness
  const beforeCrowding = total + births + arrivals - departuresFromStrain - illness
  const crowdingDepartures = Math.max(0, beforeCrowding - capacity.total)
  const affectedPopulation = event?.damageDistricts?.reduce((sum, districtId) => sum + (population.districts?.[districtId] ?? 0), 0) ?? 0
  const eventLosses = event?.districtLossRates
    ? Math.round(Object.entries(event.districtLossRates).reduce((sum, [districtId, rate]) => sum + (population.districts?.[districtId] ?? 0) * rate, 0))
    : event?.populationLossRate ? Math.round(affectedPopulation * event.populationLossRate) : 0
  const departures = departuresFromStrain + crowdingDepartures
  const net = births + arrivals - departures - illness - eventLosses
  const nextTotal = Math.max(100, Math.min(capacity.total, total + net))
  const reasons = [
    { key: 'births', label: 'Births', value: births, detail: 'Food, water, and health support household growth.' },
    { key: 'arrivals', label: 'Arrivals', value: arrivals, detail: favorable ? 'Spare housing and stable conditions attract new households.' : 'Conditions are not yet strong enough to attract households.' },
    { key: 'departures', label: 'Departures', value: departures, detail: crowdingDepartures ? 'Crowding and basic shortages force households out.' : basicDeficit ? 'Food, water, or shelter strain drives households away.' : 'No departures are expected from known conditions.' },
    { key: 'illness', label: 'Illness', value: illness, detail: illness ? `City sanitation and district exposure project ${illness} preventable losses; water and drainage reduce dense-district risk.` : 'Sanitation, water, drainage, and district density avoid projected illness losses.' },
  ]
  if (eventLosses) reasons.push({ key: 'eventLosses', label: 'Crisis losses', value: eventLosses, detail: `${event.title} caused losses in exposed districts.` })
  const nextPopulation = {
    ...populationComposition(nextTotal, state),
    districts: allocatePopulation(nextTotal, state, capacity.districts),
    lastChange: { births, arrivals, departures, illness, eventLosses, net: nextTotal - total },
  }
  return { current: total, capacity, change: nextPopulation.lastChange, nextPopulation, reasons, projectedTotal: nextTotal }
}

function sumBuildingMaps(state, field) {
  const total = {}
  const networks = field === 'production' ? districtNetworkReport(state) : null
  for (const placed of state.buildings) {
    const definition = definitionFor(placed.buildingId)
    const factor = conditionFactor(placed.condition)
    const networkFactor = placed.familyId === 'market' && networks ? networks[placed.districtId].marketOutputFactor : 1
    for (const [key, value] of Object.entries(definition?.[field] ?? {})) total[key] = (total[key] ?? 0) + Math.round(value * factor * networkFactor)
  }
  return total
}

export function civicPressures(state) {
  const effects = {}
  const notes = []
  const families = Object.fromEntries(BUILDING_FAMILIES.map((family) => [family.id, countFamily(state, family.id)]))
  const networks = districtNetworkReport(state)
  if (families.housing > families.water + families.drainage + 1) {
    effects.sanitation = -8
    effects.order = -3
    notes.push('Crowded households outran wells and drainage.')
  }
  if (families.shrine === 0 && state.turn > 2) {
    effects.auspices = (effects.auspices ?? 0) - 7
    notes.push('Common rites lacked a settled precinct.')
  }
  if (families.shrine > families.grain + 1) {
    effects.food = (effects.food ?? 0) - 5
    notes.push('Ceremonial works consumed more than the stores could support.')
  }
  if (families.defense > families.grain + 1) {
    effects.food = (effects.food ?? 0) - 4
    effects.order = (effects.order ?? 0) - 3
    notes.push('Guard duty pulled too many hands from household production.')
  }
  const workforce = workforceSummary(state)
  if (workforce.allocation.farming < 35) {
    effects.food = (effects.food ?? 0) - Math.ceil((35 - workforce.allocation.farming) / 5) * 2
    effects.order = (effects.order ?? 0) - 2
    notes.push('Too few households remained on the fields to sustain the city comfortably.')
  }
  if (workforce.allocation.levy < 15) {
    effects.readiness = (effects.readiness ?? 0) - 3
    notes.push('A thin levy rotation left the approaches under-watched.')
  }
  const abandoned = (state.projects ?? []).filter((project) => (project.pausedSeasons ?? 0) >= 2)
  if (abandoned.length) {
    effects.order = (effects.order ?? 0) - Math.min(6, abandoned.length * 2)
    notes.push(`${abandoned.length} repeatedly paused major work${abandoned.length === 1 ? '' : 's'} weaken confidence in public obligations.`)
  }
  const risks = Object.values(districtRiskReport(state))
  const severeFire = risks.filter((risk) => risk.fire >= 65)
  if (severeFire.length) {
    effects.sanitation = (effects.sanitation ?? 0) - Math.min(6, severeFire.length * 2)
    effects.order = (effects.order ?? 0) - Math.min(3, severeFire.length)
    notes.push(`${severeFire.map((risk) => risk.name).join(' and ')} face high fire exposure from density, craft, or inadequate water.`)
  }
  if (families.market > families.defense + families.drainage + 1) {
    effects.trade = (effects.trade ?? 0) - 5
    effects.order = (effects.order ?? 0) - 5
    notes.push('Exchange expanded faster than roads, oversight, and security.')
  }
  for (const district of DISTRICTS) {
    const network = networks[district.id]
    const denseHousing = state.buildings.filter((building) => building.districtId === district.id && building.familyId === 'housing' && building.tier >= 2).length
    if (denseHousing && network.missingHousingServices.length) {
      effects.shelter = (effects.shelter ?? 0) - network.missingHousingServices.length * 2
      effects.sanitation = (effects.sanitation ?? 0) - network.missingHousingServices.filter((item) => item !== 'improved road').length * 2
      effects.order = (effects.order ?? 0) - (network.improvedRoad ? 0 : 1)
      notes.push(`${district.name} courtyard housing lacks ${network.missingHousingServices.join(', ')}, reducing safe capacity.`)
    }
    const markets = state.buildings.filter((building) => building.districtId === district.id && building.familyId === 'market').length
    if (markets && network.missingMarketServices.length) {
      effects.trade = (effects.trade ?? 0) - network.missingMarketServices.length * 2
      notes.push(`${district.name} exchange lacks ${network.missingMarketServices.join(' and ')}, limiting treasury output.`)
    }
  }
  const damaged = state.buildings.filter((building) => (building.condition ?? 100) < 70).length
  if (damaged) {
    effects.order = (effects.order ?? 0) - Math.min(6, damaged * 2)
    notes.push(`${damaged} neglected work${damaged === 1 ? '' : 's'} weaken confidence and output.`)
  }
  if (state.republic?.debtStrain >= 45) {
    effects.order = (effects.order ?? 0) - Math.ceil((state.republic.debtStrain - 35) / 10) * 2
    effects.food = (effects.food ?? 0) - 2
    notes.push('Debt arrears are separating military obligation from household capacity to pay.')
  }
  if (state.republic?.levyBurden >= 40) {
    effects.food = (effects.food ?? 0) - 4
    effects.order = (effects.order ?? 0) - 3
    notes.push('Extended levy service is pulling too many household heads from fields and claims.')
  }
  if (state.republic?.assemblyConsent < 30) {
    effects.order = (effects.order ?? 0) - 5
    notes.push('Public commands lack sufficient consent among the assembled citizen body.')
  }
  if (state.reconstruction) {
    if (state.reconstruction.displaced >= 35) {
      effects.shelter = (effects.shelter ?? 0) - 5
      effects.order = (effects.order ?? 0) - 3
      notes.push('Large numbers of displaced households remain outside stable district housing.')
    }
    if (state.reconstruction.fireExposure >= 55) {
      effects.sanitation = (effects.sanitation ?? 0) - 5
      effects.order = (effects.order ?? 0) - 2
      notes.push('Reconstruction is restoring density faster than fire lanes, water access, and masonry protection.')
    }
  }
  return { effects, notes }
}

export function mediterraneanForecast(state) {
  if (!state.mediterranean) return null
  const m = { ...createMediterraneanState(), ...state.mediterranean }
  const works = m.projects ?? {}
  const completedWorks = Object.values(works).filter((project) => project.completed)
  const worksBurden = completedWorks.reduce((result, project) => {
    const definition = MEDITERRANEAN_PROJECTS[project.id]
    return {
      resourceDelta: mergeChanges(result.resourceDelta, definition?.upkeepResources),
      metricDelta: mergeChanges(result.metricDelta, definition?.upkeepMetrics),
      mediterraneanChanges: mergeChanges(result.mediterraneanChanges, definition?.upkeepMediterranean),
    }
  }, { resourceDelta: {}, metricDelta: {}, mediterraneanChanges: {} })
  if (state.era >= 7) {
    const projected = {
      ...Object.fromEntries(Object.entries(m)
        .filter(([key]) => key !== 'projects')
        .map(([key, value]) => [key, clamp(value + (worksBurden.mediterraneanChanges[key] ?? 0))])),
      projects: structuredClone(works),
    }
    return {
      ...projected,
      changes: worksBurden.mediterraneanChanges,
      projected,
      resourceDelta: worksBurden.resourceDelta,
      metricDelta: worksBurden.metricDelta,
      publicWorks: {
        completed: completedWorks.map((project) => project.id),
        resourceDelta: worksBurden.resourceDelta,
        metricDelta: worksBurden.metricDelta,
        mediterraneanChanges: worksBurden.mediterraneanChanges,
      },
      notes: [completedWorks.length
        ? `Inherited Republican public works remain operating obligations: ${completedWorks.map((project) => MEDITERRANEAN_PROJECTS[project.id]?.name).join(', ')}.`
        : 'No inherited Republican public work adds an operating burden to the metropolitan account.'],
    }
  }
  const changes = {
    fleetCapacity: m.fleetCapacity > 0 ? -1 : 0,
    maritimeLosses: state.turn === 30 ? 3 : state.turn === 31 ? 4 : state.turn === 32 ? 2 : 1,
    warCredit: m.fleetCapacity >= 20 ? -3 : -1,
    contractorExposure: m.fleetCapacity >= 20 ? 2 : 0,
    provincialTrust: m.contractorExposure >= 40 ? -2 : 0,
    importedGrainShare: 0,
    alliedExhaustion: m.fleetCapacity >= 20 ? 3 : 1,
    overseasCommandDuration: 1,
    emergencyReserve: 0,
    veteranSettlementPressure: state.turn >= 33 ? 1 : 0,
    ...worksBurden.mediterraneanChanges,
  }
  const pressureNotes = []
  if (state.turn === 33) {
    const pressure = state.flags?.hannibalPosture === 'decision'
      ? { emergencyReserve: -14, alliedExhaustion: 10, veteranSettlementPressure: 6, order: -3, readiness: -4, note: 'The early decision exposes the largest share of trained reserves and allied contingents to one campaign.' }
      : state.flags?.hannibalPosture === 'compacts'
        ? { emergencyReserve: -3, alliedExhaustion: 2, veteranSettlementPressure: 2, order: 1, readiness: 0, note: 'Distributed strongpoints absorb the opening shock while slowing concentration.' }
        : { emergencyReserve: -6, alliedExhaustion: 4, veteranSettlementPressure: 3, order: -1, readiness: -1, note: 'Containment preserves more of the field system but concedes movement and immediate prestige.' }
    changes.emergencyReserve += pressure.emergencyReserve
    changes.alliedExhaustion += pressure.alliedExhaustion
    changes.veteranSettlementPressure += pressure.veteranSettlementPressure
    pressureNotes.push(pressure.note)
  }
  if (state.turn === 34) {
    const inherited = state.flags?.hannibalPosture === 'decision'
      ? { emergencyReserve: -12, alliedExhaustion: 8, veteranSettlementPressure: 8, note: 'The earlier concentration makes the post-Cannae replacement burden exceptionally severe.' }
      : state.flags?.hannibalPosture === 'compacts'
        ? { emergencyReserve: -5, alliedExhaustion: 3, veteranSettlementPressure: 4, note: 'The defended compact loses men but retains more local depth after Cannae.' }
        : { emergencyReserve: -8, alliedExhaustion: 5, veteranSettlementPressure: 5, note: 'The contained campaign still demands replacement armies after Cannae, though fewer reserves were exposed at once.' }
    changes.emergencyReserve += inherited.emergencyReserve
    changes.alliedExhaustion += inherited.alliedExhaustion
    changes.veteranSettlementPressure += inherited.veteranSettlementPressure
    pressureNotes.push(inherited.note)
  }
  if (state.turn === 35) pressureNotes.push('Holding recovered communities now depends on whether punishment, records, and repair distinguish different conduct.')
  if (state.turn === 36) {
    changes.veteranSettlementPressure += 5
    pressureNotes.push('Demobilization converts military endurance into land, pay, and household claims that victory cannot cancel.')
  }
  const projected = { ...Object.fromEntries(Object.entries(m).filter(([key]) => key !== 'projects').map(([key, value]) => [key, clamp(value + (changes[key] ?? 0))])), projects: structuredClone(works) }
  return {
    ...projected,
    changes,
    projected,
    resourceDelta: mergeChanges({ treasury: state.turn >= 33 ? -2 : m.fleetCapacity >= 20 ? -2 : -1, grain: m.importedGrainShare >= 10 ? 1 : 0 }, worksBurden.resourceDelta),
    metricDelta: {
      readiness: (m.fleetCapacity >= 18 ? 1 : m.fleetCapacity < 8 ? -1 : 0) + (state.turn === 33 && state.flags?.hannibalPosture === 'decision' ? -4 : 0),
      trade: m.importedGrainShare >= 10 ? 1 : 0,
      order: (m.contractorExposure >= 45 || m.alliedExhaustion >= 55 ? -2 : 0) + (state.turn === 33 && state.flags?.hannibalPosture === 'decision' ? -3 : 0),
      ...worksBurden.metricDelta,
    },
    publicWorks: {
      completed: completedWorks.map((project) => project.id),
      resourceDelta: worksBurden.resourceDelta,
      metricDelta: worksBurden.metricDelta,
      mediterraneanChanges: worksBurden.mediterraneanChanges,
    },
    notes: [
      m.fleetCapacity < 10 ? 'Maritime capacity remains dependent on borrowed hulls and crews.' : 'The opening fleet is usable but institutionally young.',
      completedWorks.length ? `Republican public works upkeep: ${completedWorks.map((project) => MEDITERRANEAN_PROJECTS[project.id]?.name).join(', ')} require recurring crews, guards, records, fire watch, flood response, or service.` : 'No Republican public work is yet complete; the city has not converted a bounded project into a permanent free bonus.',
      m.contractorExposure >= 40 ? 'Contracting now limits senatorial control over replacement and accounts.' : 'Maritime contracts remain bounded enough for public inspection.',
      ...pressureNotes,
    ],
  }
}

export function metropolitanForecast(state) {
  if (!state.metropolitan) return null
  const m = { ...createMetropolitanState(), ...state.metropolitan }
  const works = m.projects ?? {}
  const completedWorks = Object.values(works).filter((project) => project.completed)
  const burdens = completedWorks.reduce((result, project) => {
    const definition = METROPOLITAN_PROJECTS[project.id]
    return {
      resourceDelta: mergeChanges(result.resourceDelta, definition?.upkeepResources),
      metricDelta: mergeChanges(result.metricDelta, definition?.upkeepMetrics),
      metropolitanChanges: mergeChanges(result.metropolitanChanges, definition?.upkeepMetropolitan),
    }
  }, { resourceDelta: {}, metricDelta: {}, metropolitanChanges: {} })
  if (state.era >= 8) {
    const projected = {
      ...Object.fromEntries(Object.entries(m)
        .filter(([key]) => key !== 'projects')
        .map(([key, value]) => [key, clamp(value + (burdens.metropolitanChanges[key] ?? 0))])),
      projects: structuredClone(works),
    }
    return {
      ...projected,
      changes: burdens.metropolitanChanges,
      projected,
      resourceDelta: burdens.resourceDelta,
      metricDelta: burdens.metricDelta,
      publicWorks: {
        completed: completedWorks.map((project) => project.id),
        resourceDelta: burdens.resourceDelta,
        metricDelta: burdens.metricDelta,
        metropolitanChanges: burdens.metropolitanChanges,
      },
      notes: [completedWorks.length
        ? `Inherited metropolitan works remain operating obligations: ${completedWorks.map((project) => METROPOLITAN_PROJECTS[project.id]?.name).join(', ')}.`
        : 'No inherited metropolitan work adds an operating burden to the late-Republic account.'],
    }
  }
  const changes = {
    urbanMigration: 2,
    rentPressure: m.publicProvision >= 60 ? 0 : m.urbanMigration >= 30 ? 2 : 1,
    legalCaseLoad: m.contractingCapacity >= 50 ? 1 : 2,
    patronageConcentration: m.contractingCapacity >= 50 ? 1 : 0,
    contractingCapacity: m.corruptionExposure >= 45 ? -1 : 1,
    corruptionExposure: m.contractingCapacity >= 55 ? 1 : 0,
    enslavedLaborInflow: state.turn === 40 ? 2 : 1,
    freedHouseholdIntegration: m.publicProvision >= 55 ? 2 : 1,
    citizenAbsence: state.turn <= 40 ? 1 : 0,
    provincialPetitionBacklog: m.legalCaseLoad >= 45 ? 2 : 1,
    importedGrainDependence: m.urbanMigration >= 28 ? 1 : 0,
    publicProvision: m.urbanMigration >= 30 ? -1 : 0,
    ...burdens.metropolitanChanges,
  }
  const projected = {
    ...Object.fromEntries(Object.entries(m)
      .filter(([key]) => key !== 'projects')
      .map(([key, value]) => [key, clamp(value + (changes[key] ?? 0))])),
    projects: structuredClone(works),
  }
  return {
    ...projected,
    changes,
    projected,
    resourceDelta: burdens.resourceDelta,
    metricDelta: {
      order: (m.legalCaseLoad >= 50 || m.corruptionExposure >= 50 ? -2 : 0),
      food: m.importedGrainDependence >= 45 && state.resources.grain < 8 ? -2 : 0,
      ...burdens.metricDelta,
    },
    publicWorks: {
      completed: completedWorks.map((project) => project.id),
      resourceDelta: burdens.resourceDelta,
      metricDelta: burdens.metricDelta,
      metropolitanChanges: burdens.metropolitanChanges,
    },
    notes: [
      m.urbanMigration >= 40 ? 'Migration is increasing rent, circulation, provision, and hearing burdens faster than one institution can absorb them.' : 'Urban growth remains visible without yet overwhelming every metropolitan service.',
      completedWorks.length ? `Metropolitan upkeep: ${completedWorks.map((project) => METROPOLITAN_PROJECTS[project.id]?.name).join(', ')} require recurring clerks, inspection, water, repairs, policing, or records.` : 'No metropolitan public work is complete; planned capacity has not yet become an operating institution.',
      m.corruptionExposure >= 45 ? 'Contracting exposure is outrunning inspection and public records.' : 'Contracting remains open to public supervision, though patronage claims continue to accumulate.',
    ],
  }
}

export function republicStrainForecast(state) {
  if (!state.republicStrain) return null
  const s = { ...createRepublicStrainState(), ...state.republicStrain }
  const works = s.projects ?? {}
  const completedWorks = Object.values(works).filter((project) => project.completed)
  const burdens = completedWorks.reduce((result, project) => {
    const definition = REPUBLIC_STRAIN_PROJECTS[project.id]
    return {
      resourceDelta: mergeChanges(result.resourceDelta, definition?.upkeepResources),
      metricDelta: mergeChanges(result.metricDelta, definition?.upkeepMetrics),
      strainChanges: mergeChanges(result.strainChanges, definition?.upkeepStrain),
    }
  }, { resourceDelta: {}, metricDelta: {}, strainChanges: {} })
  if (state.era >= 9) {
    const projected = {
      ...Object.fromEntries(Object.entries(s)
        .filter(([key]) => key !== 'projects')
        .map(([key, value]) => [key, clamp(value + (burdens.strainChanges[key] ?? 0))])),
      projects: structuredClone(works),
    }
    return {
      ...projected,
      changes: burdens.strainChanges,
      projected,
      resourceDelta: burdens.resourceDelta,
      metricDelta: burdens.metricDelta,
      publicWorks: {
        completed: completedWorks.map((project) => project.id),
        resourceDelta: burdens.resourceDelta,
        metricDelta: burdens.metricDelta,
        strainChanges: burdens.strainChanges,
      },
      notes: [completedWorks.length
        ? `Inherited late-Republic works remain operating obligations: ${completedWorks.map((project) => REPUBLIC_STRAIN_PROJECTS[project.id]?.name).join(', ')}.`
        : 'No inherited late-Republic civic work adds an operating burden to the civil-war settlement.'],
    }
  }
  const changes = {
    citizenshipIntegration: s.italianClaimsPressure >= 55 ? -1 : 0,
    italianClaimsPressure: s.citizenshipIntegration >= 55 ? -2 : 2,
    commanderPersonalLoyalty: [44, 45, 48].includes(state.turn) ? 2 : 1,
    senateCommandControl: s.commanderPersonalLoyalty >= 55 ? -2 : 0,
    emergencyPowersPrecedent: [44, 45, 47, 48].includes(state.turn) ? 1 : 0,
    landTitleDisputes: works.landCensusRegistry?.completed ? 0 : 2,
    streetViolence: s.popularConsentChannels < 40 || s.emergencyPowersPrecedent >= 55 ? 2 : 0,
    courtCapacity: s.landTitleDisputes >= 55 || s.streetViolence >= 45 ? -1 : 0,
    archiveIntegrity: works.tabularium?.completed ? 0 : -1,
    demobilizationCapacity: s.commanderPersonalLoyalty >= 55 ? -1 : 0,
    popularConsentChannels: s.streetViolence >= 50 ? -2 : 0,
    urbanFireResponse: s.urbanFireResponse < 35 && state.turn >= 46 ? -1 : 0,
    ...burdens.strainChanges,
  }
  const projected = {
    ...Object.fromEntries(Object.entries(s)
      .filter(([key]) => key !== 'projects')
      .map(([key, value]) => [key, clamp(value + (changes[key] ?? 0))])),
    projects: structuredClone(works),
  }
  const commandRisk = Math.max(0, s.commanderPersonalLoyalty + s.emergencyPowersPrecedent - s.senateCommandControl - s.demobilizationCapacity)
  const civicRisk = Math.max(0, s.streetViolence + s.landTitleDisputes - s.courtCapacity - s.popularConsentChannels)
  return {
    ...projected,
    changes,
    projected,
    resourceDelta: burdens.resourceDelta,
    metricDelta: {
      order: (commandRisk >= 35 ? -3 : commandRisk >= 20 ? -1 : 0) + (civicRisk >= 35 ? -3 : civicRisk >= 20 ? -1 : 0),
      sanitation: s.urbanFireResponse < 25 && state.turn >= 46 ? -1 : 0,
      ...burdens.metricDelta,
    },
    publicWorks: {
      completed: completedWorks.map((project) => project.id),
      resourceDelta: burdens.resourceDelta,
      metricDelta: burdens.metricDelta,
      strainChanges: burdens.strainChanges,
    },
    commandRisk,
    civicRisk,
    notes: [
      commandRisk >= 35 ? 'Personal military loyalty and emergency precedent now exceed the institutions available to close commands.' : 'Command remains contestable through civic institutions, though every extension adds precedent.',
      civicRisk >= 35 ? 'Title disputes and street force are outrunning courts and lawful channels of attendance.' : 'Courts and public channels still absorb a meaningful share of land and assembly conflict.',
      completedWorks.length ? `Late-Republic upkeep: ${completedWorks.map((project) => REPUBLIC_STRAIN_PROJECTS[project.id]?.name).join(', ')} require recurring records, guards, enrollment, repairs, or patrols.` : 'No late-Republic civic work is complete; institutional promises have not yet become physical operating capacity.',
    ],
  }
}

export function civilSettlementForecast(state) {
  if (!state.civilSettlement) return null
  const s = { ...createCivilSettlementState(), ...state.civilSettlement }
  const works = s.projects ?? {}
  const completedWorks = Object.values(works).filter((project) => project.completed)
  const burdens = completedWorks.reduce((result, project) => {
    const definition = CIVIL_SETTLEMENT_PROJECTS[project.id]
    return {
      resourceDelta: mergeChanges(result.resourceDelta, definition?.upkeepResources),
      metricDelta: mergeChanges(result.metricDelta, definition?.upkeepMetrics),
      settlementChanges: mergeChanges(result.settlementChanges, definition?.upkeepSettlement),
    }
  }, { resourceDelta: {}, metricDelta: {}, settlementChanges: {} })
  const civilWarTurn = state.turn <= 53
  const changes = {
    unifiedCommand: 0,
    senateOperatingCapacity: s.emergencyAuthority >= 55 ? -2 : 0,
    magistrateContinuity: s.emergencyAuthority >= 55 ? -2 : 0,
    armyDemobilization: civilWarTurn && s.unifiedCommand < 35 ? -2 : 0,
    veteranSettlementPressure: civilWarTurn ? 3 : 1,
    warFinanceBurden: civilWarTurn ? 3 : 0,
    confiscationPressure: s.warFinanceBurden >= 55 ? 2 : 0,
    italianLandSecurity: s.confiscationPressure >= 45 ? -3 : 0,
    provincialCommandSettlement: state.turn >= 53 ? 1 : 0,
    courtContinuity: s.confiscationPressure >= 45 ? -2 : 0,
    archiveContinuity: s.confiscationPressure >= 45 ? -2 : 0,
    publicProvision: s.warFinanceBurden >= 55 ? -2 : 0,
    successionClarity: state.turn >= 51 ? -1 : 0,
    emergencyAuthority: civilWarTurn ? 1 : 0,
    civicOperatingCapacity: s.urbanDisplacement >= 45 ? -2 : 0,
    urbanDisplacement: completedWorks.length ? 0 : 1,
    personalMonumentalCredit: 0,
    ...burdens.settlementChanges,
  }
  const projected = {
    ...Object.fromEntries(Object.entries(s)
      .filter(([key]) => key !== 'projects')
      .map(([key, value]) => [key, clamp(value + (changes[key] ?? 0))])),
    projects: structuredClone(works),
  }
  const commandGap = Math.max(0, s.unifiedCommand + s.emergencyAuthority - s.senateOperatingCapacity - s.magistrateContinuity)
  const settlementGap = Math.max(0, s.veteranSettlementPressure + s.confiscationPressure + s.warFinanceBurden - s.armyDemobilization - s.italianLandSecurity)
  return {
    ...projected,
    changes,
    projected,
    resourceDelta: mergeChanges(civilWarTurn ? { treasury: -2, grain: -1 } : {}, burdens.resourceDelta),
    metricDelta: {
      order: (commandGap >= 35 ? -3 : commandGap >= 20 ? -1 : 0) + (settlementGap >= 45 ? -3 : settlementGap >= 25 ? -1 : 0),
      trade: s.warFinanceBurden >= 55 ? -2 : 0,
      ...burdens.metricDelta,
    },
    publicWorks: {
      completed: completedWorks.map((project) => project.id),
      resourceDelta: burdens.resourceDelta,
      metricDelta: burdens.metricDelta,
      settlementChanges: burdens.settlementChanges,
    },
    commandGap,
    settlementGap,
    notes: [
      commandGap >= 35 ? 'Emergency and personal command now exceed the Senate and magistracies available to regularize them.' : 'Command remains capable of legal settlement, though military unity and civilian operation are not the same measure.',
      settlementGap >= 45 ? 'Veteran promises, confiscations, and war finance are outrunning demobilization and Italian title security.' : 'Demobilization and title review still absorb a meaningful share of military and fiscal claims.',
      completedWorks.length ? `Civil-settlement upkeep: ${completedWorks.map((project) => CIVIL_SETTLEMENT_PROJECTS[project.id]?.name).join(', ')} require recurring courts, records, repairs, security, appeals, or access.` : 'No Caesarian civic work is complete; plans and dedications have not yet become durable operating capacity.',
    ],
  }
}

export function augustanCityForecast(state) {
  if (!state.augustanCity) return null
  const a = { ...createAugustanState(state.civilSettlement ?? {}), ...state.augustanCity }
  const works = a.projects ?? {}
  const completedWorks = Object.values(works).filter((project) => project.completed)
  const burdens = completedWorks.reduce((result, project) => {
    const definition = AUGUSTAN_PROJECTS[project.id]
    return {
      resourceDelta: mergeChanges(result.resourceDelta, definition?.upkeepResources),
      metricDelta: mergeChanges(result.metricDelta, definition?.upkeepMetrics),
      augustanChanges: mergeChanges(result.augustanChanges, definition?.upkeepAugustan),
    }
  }, { resourceDelta: {}, metricDelta: {}, augustanChanges: {} })
  const authorityGap = Math.max(0, a.princepsAuthority + a.householdStanding - a.senateMagistrateCapacity - a.provincialCommandBalance)
  const serviceGap = Math.max(0, 120 - a.urbanAdministration - a.maintenanceCapacity + a.patronageConcentration * 0.35)
  const successionGap = Math.max(0, 70 - a.successionConfidence + Math.max(0, a.householdStanding - a.senateMagistrateCapacity) * 0.25)
  const changes = {
    princepsAuthority: 0,
    senateMagistrateCapacity: authorityGap >= 45 ? -2 : 0,
    householdStanding: 0,
    successionConfidence: state.turn >= 57 ? (successionGap >= 35 ? -2 : -1) : 0,
    urbanAdministration: serviceGap >= 45 ? -1 : 0,
    fireCoverage: state.turn === 60 && a.fireCoverage < 45 ? -4 : 0,
    annonaReliability: a.urbanAdministration >= 55 ? 1 : -1,
    monumentMemory: completedWorks.length ? 1 : 0,
    patronageConcentration: a.publicAccess < 40 ? 1 : 0,
    provincialCommandBalance: authorityGap >= 50 ? -1 : 0,
    publicAccess: a.patronageConcentration >= 65 ? -2 : 0,
    maintenanceCapacity: completedWorks.length >= 3 ? -1 : 0,
    ...burdens.augustanChanges,
  }
  const projected = {
    ...Object.fromEntries(Object.entries(a)
      .filter(([key]) => key !== 'projects')
      .map(([key, value]) => [key, clamp(value + (changes[key] ?? 0))])),
    projects: structuredClone(works),
  }
  return {
    ...projected,
    changes,
    projected,
    resourceDelta: mergeChanges({ treasury: -1 }, a.annonaReliability < 45 ? { grain: -1 } : {}, burdens.resourceDelta),
    metricDelta: {
      order: (authorityGap >= 55 ? -2 : 0) + (serviceGap >= 55 ? -2 : 0),
      food: a.annonaReliability < 40 ? -2 : 0,
      sanitation: state.turn === 60 && a.fireCoverage < 45 ? -3 : 0,
      ...burdens.metricDelta,
    },
    publicWorks: {
      completed: completedWorks.map((project) => project.id),
      resourceDelta: burdens.resourceDelta,
      metricDelta: burdens.metricDelta,
      augustanChanges: burdens.augustanChanges,
    },
    authorityGap,
    serviceGap,
    successionGap,
    notes: [
      authorityGap >= 45 ? 'Household and princeps authority are outrunning magistrates and provincial review.' : 'Central command remains counterweighted by operating magistracies and reviewed provincial authority.',
      serviceGap >= 45 ? 'New monuments and services are outrunning maintenance and urban administration.' : 'Urban administration and maintenance still support the public city behind its dedications.',
      successionGap >= 35 ? 'The first transfer remains dangerously dependent on personal recognition.' : 'Succession is becoming legible across household, Senate, offices, and commands.',
    ],
  }
}

export function forecastSeason(state) {
  const production = sumBuildingMaps(state, 'production')
  const upkeep = reverseChanges(sumBuildingMaps(state, 'upkeep'))
  const workforce = workforceSummary(state)
  const baseYield = { grain: workforce.grainYield, timber: 2, treasury: 1 }
  const war = warForecast(state)
  const reconstruction = reconstructionForecast(state)
  const regional = regionalForecast(state)
  const italian = italianForecast(state)
  const mediterranean = mediterraneanForecast(state)
  const metropolitan = metropolitanForecast(state)
  const republicStrain = republicStrainForecast(state)
  const civilSettlement = civilSettlementForecast(state)
  const augustanCity = augustanCityForecast(state)
  return {
    resourceDelta: mergeChanges(baseYield, production, upkeep, war?.resourceDelta, regional?.resourceDelta, italian?.resourceDelta, mediterranean?.resourceDelta, metropolitan?.resourceDelta, republicStrain?.resourceDelta, civilSettlement?.resourceDelta, augustanCity?.resourceDelta),
    pressures: civicPressures(state),
    actionsRemaining: actionRemaining(state),
    population: projectPopulation(state),
    workforce,
    risks: districtRiskReport(state),
    republic: republicForecast(state),
    war,
    reconstruction,
    regional,
    italian,
    mediterranean,
    metropolitan,
    republicStrain,
    civilSettlement,
    augustanCity,
  }
}

export function networkCoverage(state) {
  const coverage = { terrain: DISTRICTS.map((district) => district.id), roads: [], water: [], drainage: [], defense: [] }
  const addCoverage = (mode, districtId, extend = false) => {
    const district = getDistrict(districtId)
    coverage[mode].push(districtId)
    if (extend) coverage[mode].push(...(district?.neighbors ?? []))
  }
  for (const building of state.buildings) {
    if ((building.condition ?? 100) < 40) continue
    if (building.familyId === 'water') addCoverage('water', building.districtId, building.tier >= 2)
    if (building.familyId === 'drainage') addCoverage('drainage', building.districtId, building.tier >= 2)
    if (building.familyId === 'defense') addCoverage('defense', building.districtId, building.tier >= 2)
  }
  for (const project of state.projects ?? []) {
    if (['water', 'drainage', 'defense'].includes(project.familyId)) coverage[project.familyId].push(project.districtId)
  }
  coverage.water = [...new Set(coverage.water)]
  coverage.drainage = [...new Set(coverage.drainage)]
  coverage.defense = [...new Set(coverage.defense)]
  coverage.roads = DISTRICT_LINKS.map(([from, to]) => ({
    from,
    to,
    improved: state.buildings.some((building) => [from, to].includes(building.districtId) && (building.familyId === 'defense' || (building.familyId === 'market' && building.tier >= 2))),
  }))
  return coverage
}

export function districtNetworkReport(state) {
  const coverage = networkCoverage(state)
  const water = new Set(coverage.water)
  const drainage = new Set(coverage.drainage)
  return Object.fromEntries(DISTRICTS.map((district) => {
    const incidentRoads = coverage.roads.filter((road) => road.from === district.id || road.to === district.id)
    const improvedRoad = incidentRoads.some((road) => road.improved)
    const connectedStorage = linkedFamilyCount(state, district.id, 'grain') > 0
    const hasWater = water.has(district.id)
    const hasDrainage = drainage.has(district.id)
    const serviceCount = [hasWater, hasDrainage, improvedRoad].filter(Boolean).length
    const housingCapacityFactor = 0.55 + serviceCount * 0.15
    const marketOutputFactor = 0.5 + (connectedStorage ? 0.25 : 0) + (improvedRoad ? 0.25 : 0)
    return [district.id, {
      districtId: district.id,
      name: district.name,
      water: hasWater,
      drainage: hasDrainage,
      improvedRoad,
      connectedStorage,
      housingCapacityFactor,
      marketOutputFactor,
      missingHousingServices: [!hasWater && 'water', !hasDrainage && 'drainage', !improvedRoad && 'improved road'].filter(Boolean),
      missingMarketServices: [!connectedStorage && 'connected storage', !improvedRoad && 'improved road'].filter(Boolean),
    }]
  }))
}

export function districtRiskReport(state) {
  const capacity = populationCapacity(state).districts
  const population = currentDistrictPopulation(state)
  const coverage = networkCoverage(state)
  const served = {
    water: new Set(coverage.water),
    drainage: new Set(coverage.drainage),
    defense: new Set(coverage.defense),
  }
  return Object.fromEntries(DISTRICTS.map((district) => {
    const residents = population[district.id] ?? 0
    const districtCapacity = capacity[district.id] ?? 0
    const density = districtCapacity ? clamp(residents / districtCapacity, 0, 1.25) : 0
    const buildings = state.buildings.filter((building) => building.districtId === district.id && (building.condition ?? 100) >= 40)
    const housing = buildings.filter((building) => building.familyId === 'housing').length
    const workshops = buildings.filter((building) => building.familyId === 'workshop').length
    const markets = buildings.filter((building) => building.familyId === 'market').length
    const water = served.water.has(district.id)
    const drainage = served.drainage.has(district.id)
    const floodTerrain = district.terrain.includes('floodplain') ? 35 : district.terrain.includes('wet') ? 22 : district.terrain.includes('river') ? 18 : 2
    const fire = clamp(Math.round(8 + density * 34 + housing * 7 + workshops * 22 + markets * 4 - (water ? 20 : 0) - (drainage ? 6 : 0)))
    const disease = clamp(Math.round(10 + density * 38 + housing * 5 + workshops * 3 + markets * 5 - (water ? 18 : 0) - (drainage ? 24 : 0)))
    const flood = clamp(Math.round(floodTerrain + density * 11 + buildings.length * 2 - (drainage ? 30 : 0)))
    const drivers = []
    if (density >= 0.8) drivers.push('dense occupancy')
    if (workshops) drivers.push(`${workshops} fire-using craft work${workshops === 1 ? '' : 's'}`)
    if (!water && residents) drivers.push('no water coverage')
    if (!drainage && (residents || floodTerrain > 10)) drivers.push('no drainage coverage')
    if (water) drivers.push('water coverage')
    if (drainage) drivers.push('drainage coverage')
    return [district.id, { districtId: district.id, name: district.name, population: residents, capacity: districtCapacity, density, fire, disease, flood, drivers }]
  }))
}

function timedEvent(state) {
  if (state.turn === 4) {
    const risks = districtRiskReport(state)
    const floodRisk = Math.round((risks.tiber.flood + risks.forum.flood) / 2)
    const severity = clamp(Math.round(floodRisk / 3), 3, 18)
    const prepared = floodRisk <= 20
    return {
      title: 'The Tiber Leaves Its Banks',
      text: prepared ? 'Channels, drainage coverage, and restrained floodplain density keep the inundation disruptive rather than ruinous.' : 'Water enters exposed low ground, spoiling stores and revealing the cost of density without drainage.',
      metrics: { food: -Math.ceil(severity / 2), sanitation: -severity, trade: -5 },
      resources: { grain: -Math.ceil(severity / 4), timber: -1 },
      damageDistricts: ['tiber', 'forum'],
      damage: clamp(Math.round(12 + floodRisk / 2), 12, 36),
      populationLossRate: clamp(floodRisk / 3500, 0.002, 0.014),
      resolvedRisk: floodRisk,
    }
  }
  if (state.turn === 8) {
    const workforce = workforceSummary(state)
    const ready = state.metrics.readiness + countFamily(state, 'defense') * 5 + workforce.readinessDelta * 3
    const held = ready >= 65
    return {
      title: 'Raiders Test the Northern Road',
      text: held ? 'A prepared levy holds the approaches without abandoning the fields.' : 'The levy gathers late; livestock and confidence are lost before the raiders withdraw.',
      metrics: held ? { readiness: 4, order: 3 } : { readiness: -8, order: -9, food: -5 },
      resources: held ? { bronze: 1 } : { grain: -3, treasury: -2 },
      damageDistricts: held ? [] : ['quirinal', 'aventine'],
      damage: held ? 0 : 28,
      populationLossRate: held ? 0 : 0.008,
    }
  }
  if (state.turn === 16) {
    const readiness = gallicReadiness(state)
    const prepared = readiness.posture === 'prepared'
    const strained = readiness.posture === 'strained'
    return {
      title: prepared ? 'The Northern Road Is Watched' : strained ? 'The Muster Forms Under Pressure' : 'The Allia Exposes a Brittle Levy',
      text: prepared
        ? 'Veterans, guarded approaches, and reserves give Rome choices when the Gallic host appears. The danger remains for the next act, but the city will not meet it unprepared.'
        : strained
          ? 'Rome gathers enough force to contest the advance, though exhausted households and incomplete preparation leave little margin for a reverse.'
          : 'A hurried field concentration rests on thin reserves and divided obligations. The northern threat now reaches a city whose institutions have not converted warning into depth.',
      metrics: prepared ? { readiness: 5, order: 3 } : strained ? { readiness: -2, order: -3 } : { readiness: -9, order: -8, food: -3 },
      resources: prepared ? { bronze: 1 } : strained ? { treasury: -2 } : { grain: -3, treasury: -3 },
      damageDistricts: [],
      damage: 0,
      populationLossRate: 0,
      resolvedRisk: readiness.score,
      riskLabel: 'Gallic crisis readiness',
      crisisPosture: readiness.posture,
    }
  }
  if (state.turn === 18 && state.reconstruction) {
    const policy = state.flags?.reconstructionPolicy
    if (policy === 'rapid') return {
      title: 'Fire Runs Through the New Timber Lanes',
      text: 'Roofs and stalls returned quickly, but narrow access and concentrated timber let a new fire cross rebuilt plots before crews contain it.',
      metrics: { sanitation: -7, order: -5, shelter: -3 },
      resources: { timber: -2, treasury: -2 },
      damageDistricts: ['forum', 'palatine'],
      districtDamage: { forum: 12, palatine: 9 },
      districtLossRates: { forum: 0.004, palatine: 0.002 },
    }
    if (policy === 'planned') return {
      title: 'Surveyed Lanes Contain a Rebuilding Fire',
      text: 'A workshop fire tests the new access lanes. Crews reach it before the flames cross into adjoining household blocks.',
      metrics: { sanitation: 3, order: 3 },
      resources: { timber: -1 },
      damageDistricts: ['forum'],
      districtDamage: { forum: 4 },
      districtLossRates: { forum: 0.001 },
    }
    return {
      title: 'Wall Crews Outpace the Returning Households',
      text: 'The approaches harden, but families still waiting on shelter question how long military works should command the recovery.',
      metrics: { readiness: 5, shelter: -5, order: -2 },
      resources: { grain: -2, stone: -1 },
      damageDistricts: [],
      districtDamage: {},
      districtLossRates: {},
    }
  }
  return null
}

function applyEventDamage(buildings, event) {
  if (!event?.damage && !event?.districtDamage) return { buildings, damaged: [] }
  const damaged = []
  const next = buildings.map((building) => {
    if (!event.damageDistricts.includes(building.districtId)) return building
    const damage = event.districtDamage?.[building.districtId] ?? event.damage ?? 0
    const condition = Math.max(15, (building.condition ?? 100) - damage)
    damaged.push(`${building.name} (${condition}%)`)
    return { ...building, condition }
  })
  return { buildings: next, damaged }
}

export function gallicCrisis(state) {
  const readiness = gallicReadiness(state)
  if (!readiness) return null
  const posture = state.flags?.actThreeCrisisPosture ?? readiness.posture
  if (posture === 'prepared') return {
    title: 'Rome Bends but Its Defenses Hold Together',
    text: 'The field reverse opens exposed quarters, yet guarded approaches, reserves, and veteran cohesion prevent the crisis from becoming a uniform destruction of the city.',
    posture: 'prepared', devastation: 28, displacedRate: 0.05, recordsLoss: 10,
    metrics: { order: -8, trade: -6, readiness: -4, shelter: -4 }, resources: { grain: -2, treasury: -2 },
    damageDistricts: ['forum', 'tiber', 'palatine'], districtDamage: { forum: 14, tiber: 18, palatine: 8 },
    districtLossRates: { forum: 0.006, tiber: 0.008, palatine: 0.003 },
  }
  if (posture === 'strained') return {
    title: 'The City Survives a Costly Sack',
    text: 'The levy cannot prevent entry into several quarters, but surviving institutions, defended heights, and organized withdrawal preserve the means to rebuild.',
    posture: 'strained', devastation: 55, displacedRate: 0.11, recordsLoss: 25,
    metrics: { order: -16, trade: -12, readiness: -8, shelter: -10, sanitation: -8 }, resources: { grain: -5, treasury: -4, timber: -2 },
    damageDistricts: ['forum', 'tiber', 'palatine', 'aventine', 'quirinal'], districtDamage: { forum: 28, tiber: 30, palatine: 22, aventine: 18, quirinal: 15 },
    districtLossRates: { forum: 0.014, tiber: 0.016, palatine: 0.01, aventine: 0.008, quirinal: 0.006 },
  }
  return {
    title: 'Defeat at the Allia Reaches the City',
    text: 'A brittle field concentration collapses into a broad emergency. The citadel and fragments of district life endure, but stores, records, housing, and confidence suffer heavily.',
    posture: 'exposed', devastation: 82, displacedRate: 0.19, recordsLoss: 45,
    metrics: { order: -25, trade: -20, readiness: -14, shelter: -18, sanitation: -15, food: -10 }, resources: { grain: -8, treasury: -7, timber: -4 },
    damageDistricts: ['forum', 'tiber', 'palatine', 'aventine', 'quirinal', 'capitoline'], districtDamage: { forum: 46, tiber: 48, palatine: 38, aventine: 35, quirinal: 32, capitoline: 18 },
    districtLossRates: { forum: 0.026, tiber: 0.03, palatine: 0.02, aventine: 0.018, quirinal: 0.016, capitoline: 0.006 },
  }
}

function applyFireExposure(buildings, risks) {
  const damaged = []
  const next = buildings.map((building) => {
    const risk = risks[building.districtId]
    if (!risk || risk.fire < 70 || !['housing', 'workshop', 'market'].includes(building.familyId)) return building
    const condition = Math.max(20, (building.condition ?? 100) - 8)
    damaged.push(`${building.name} (${condition}%)`)
    return { ...building, condition }
  })
  return { buildings: next, damaged }
}

export function advanceTurn(state) {
  if (state.outcome) return { state, error: 'The campaign is complete.' }
  if (state.council && !state.councilResolved) return { state, error: 'The council must reach a decision before the season ends.' }

  const forecast = forecastSeason(state)
  const pressures = forecast.pressures
  const event = timedEvent(state)
  const resourceDelta = mergeChanges(forecast.resourceDelta, event?.resources)
  const metricDelta = mergeChanges(pressures.effects, { readiness: forecast.workforce.readinessDelta }, event?.metrics, forecast.regional?.metricDelta, forecast.italian?.metricDelta, forecast.mediterranean?.metricDelta, forecast.metropolitan?.metricDelta, forecast.republicStrain?.metricDelta, forecast.civilSettlement?.metricDelta, forecast.augustanCity?.metricDelta)
  const nextResources = addResources(state.resources, resourceDelta)
  let nextMetrics = addMap(state.metrics, metricDelta)
  const shortages = Object.entries(nextResources).filter(([key, value]) => value === 0 && ['grain', 'timber', 'treasury'].includes(key))
  if (shortages.length) nextMetrics = addMap(nextMetrics, { order: -4, food: shortages.some(([key]) => key === 'grain') ? -7 : 0 })
  const eventDamage = applyEventDamage(state.buildings, event)
  const fireDamage = applyFireExposure(eventDamage.buildings, forecast.risks)
  const population = projectPopulation(state, event)
  const projects = (state.projects ?? []).map((project) => project.lastWorkedTurn === state.turn
    ? project
    : { ...project, pausedSeasons: (project.pausedSeasons ?? 0) + 1 })
  const eventDamageNote = eventDamage.damaged.length ? [`Crisis-damaged works: ${eventDamage.damaged.join(', ')}.`] : []
  const fireDamageNote = fireDamage.damaged.length ? [`Fire exposure wore down: ${fireDamage.damaged.join(', ')}.`] : []

  const report = {
    turn: state.turn,
    year: TURN_YEARS[state.turn - 1],
    title: event?.title ?? 'The Settlement Endures Another Season',
    text: event?.text ?? (pressures.notes[0] || 'Households work, trade, and answer the common summons.'),
    notes: [...pressures.notes, ...eventDamageNote, ...fireDamageNote],
    resourceDelta,
    metricDelta,
    populationChange: population.change,
    populationTotal: population.projectedTotal,
    workforce: forecast.workforce,
    resolvedRisk: event?.resolvedRisk ?? null,
    crisisPosture: event?.crisisPosture ?? null,
  }

  const warRepublicChanges = forecast.war?.republicChanges ?? {}
  const nextRepublic = forecast.republic ? updateRepublic(forecast.republic.projected, warRepublicChanges) : state.republic
  const nextWar = forecast.war ? forecast.war.projected : state.war
  const nextReconstruction = forecast.reconstruction ? forecast.reconstruction.projected : state.reconstruction
  const nextRegional = forecast.regional ? forecast.regional.projected : state.regional
  const nextItalian = forecast.italian ? forecast.italian.projected : state.italian
  const nextMediterranean = forecast.mediterranean ? forecast.mediterranean.projected : state.mediterranean
  const nextMetropolitan = forecast.metropolitan ? forecast.metropolitan.projected : state.metropolitan
  const nextRepublicStrain = forecast.republicStrain ? forecast.republicStrain.projected : state.republicStrain
  const nextCivilSettlement = forecast.civilSettlement ? forecast.civilSettlement.projected : state.civilSettlement
  const nextAugustanCity = forecast.augustanCity ? forecast.augustanCity.projected : state.augustanCity
  report.republicChanges = mergeChanges(forecast.republic?.changes, warRepublicChanges)
  report.warChanges = forecast.war?.changes ?? null
  report.reconstructionChanges = forecast.reconstruction?.changes ?? null
  report.regionalChanges = forecast.regional ? {
    overextension: forecast.regional.overextension,
    militaryContribution: forecast.regional.contribution,
    tradeAccess: forecast.regional.tradeAccess,
    revoltRisk: forecast.regional.revoltRisk,
  } : null
  if (forecast.regional) report.notes.push(...forecast.regional.notes)
  report.italianChanges = forecast.italian?.changes ?? null
  if (forecast.italian) report.notes.push(...forecast.italian.notes)
  report.mediterraneanChanges = forecast.mediterranean?.changes ?? null
  if (forecast.mediterranean) report.notes.push(...forecast.mediterranean.notes)
  report.metropolitanChanges = forecast.metropolitan?.changes ?? null
  if (forecast.metropolitan) report.notes.push(...forecast.metropolitan.notes)
  report.republicStrainChanges = forecast.republicStrain?.changes ?? null
  if (forecast.republicStrain) report.notes.push(...forecast.republicStrain.notes)
  report.civilSettlementChanges = forecast.civilSettlement?.changes ?? null
  if (forecast.civilSettlement) report.notes.push(...forecast.civilSettlement.notes)
  report.augustanCityChanges = forecast.augustanCity?.changes ?? null
  if (forecast.augustanCity) report.notes.push(...forecast.augustanCity.notes)
  report.riskLabel = event?.riskLabel ?? (event?.resolvedRisk !== undefined && event?.resolvedRisk !== null ? 'Resolved flood exposure' : null)
  const shared = { resources: nextResources, metrics: nextMetrics, buildings: fireDamage.buildings, projects, population: population.nextPopulation, republic: nextRepublic, war: nextWar, reconstruction: nextReconstruction, regional: nextRegional, italian: nextItalian, mediterranean: nextMediterranean, metropolitan: nextMetropolitan, republicStrain: nextRepublicStrain, civilSettlement: nextCivilSettlement, augustanCity: nextAugustanCity, reports: [...state.reports, report] }
  if (forecast.mediterranean?.publicWorks) {
    shared.mediterranean = { ...nextMediterranean, projects: structuredClone(state.mediterranean.projects) }
    report.publicWorks = forecast.mediterranean.publicWorks
  }
  if (forecast.metropolitan?.publicWorks) report.metropolitanPublicWorks = forecast.metropolitan.publicWorks
  if (forecast.republicStrain?.publicWorks) report.republicStrainPublicWorks = forecast.republicStrain.publicWorks
  if (forecast.civilSettlement?.publicWorks) report.civilSettlementPublicWorks = forecast.civilSettlement.publicWorks
  if (forecast.augustanCity?.publicWorks) report.augustanCityPublicWorks = forecast.augustanCity.publicWorks
  if (state.turn === 29) return { state: { ...state, ...shared, outcome: 'complete' }, report }
  if (state.turn === 36) return { state: { ...state, ...shared, outcome: 'mediterranean-complete' }, report }
  if (state.turn === 41) return { state: { ...state, ...shared, outcome: 'metropolitan-complete' }, report }
  if (state.turn === 48) return { state: { ...state, ...shared, outcome: 'republic-strain-complete' }, report }
  if (state.turn === 54) return { state: { ...state, ...shared, outcome: 'civil-settlement-complete' }, report }
  if (state.turn === 61) return { state: { ...state, ...shared, outcome: 'augustan-city-complete' }, report }
  if (state.turn === 32) return { state: { ...state, ...shared, outcome: 'mediterranean-opening-complete', hannibalicTransition: true }, report }
  if (state.turn === 23) return { state: { ...state, ...shared, outcome: 'regional-complete', italianTransition: true }, report }
  if (state.turn === 20) return { state: { ...state, ...shared, outcome: 'act-four-complete', regionalTransition: true }, report }
  if (state.turn === 16) return {
    state: {
      ...state,
      ...shared,
      flags: { ...state.flags, actThreeReadinessScore: report.resolvedRisk, actThreeCrisisPosture: report.crisisPosture },
      outcome: 'act-three-complete',
      reconstructionTransition: true,
    },
    report,
  }
  if (state.turn === 10) return { state: { ...state, ...shared, outcome: 'acts-complete', republicTransition: true }, report }
  if (state.turn === 5) return { state: { ...state, ...shared, eraTransition: true }, report }

  const nextTurn = state.turn + 1
  const nextCapacity = workforceSummary({ ...state, ...shared, nextWorksBonus: 0 }).constructionCapacity
  return {
    state: {
      ...state,
      ...shared,
      turn: nextTurn,
      selectedBuildingId: null,
      actionsUsed: 0,
      actionsMax: nextCapacity,
      nextWorksBonus: 0,
      council: getCouncil(nextTurn),
      councilResolved: !getCouncil(nextTurn),
    },
    report,
  }
}

export function enterCityOfKings(state) {
  if (!state.eraTransition) return state
  const nextTurn = 6
  const transitioned = {
    ...state,
    turn: nextTurn,
    era: 1,
    eraTransition: false,
    actionsUsed: 0,
    nextWorksBonus: 0,
    selectedBuildingId: null,
    council: getCouncil(nextTurn),
    councilResolved: !getCouncil(nextTurn),
    resources: addResources(state.resources, { stone: 4, timber: 2, treasury: 2 }),
    metrics: addMap(state.metrics, { order: 3, trade: 3 }),
  }
  return { ...transitioned, actionsMax: workforceSummary(transitioned).constructionCapacity }
}

export function enterEarlyRepublic(state) {
  if (!state.republicTransition) return state
  const nextTurn = 11
  const transitioned = {
    ...state,
    turn: nextTurn,
    era: 2,
    outcome: null,
    republicTransition: false,
    republic: createRepublicState(),
    war: createWarState(),
    actionsUsed: 0,
    nextWorksBonus: 0,
    selectedBuildingId: null,
    selectedFamily: 'civic',
    council: getCouncil(nextTurn),
    councilResolved: false,
    resources: addResources(state.resources, { stone: 4, bronze: 1, treasury: 3 }),
    metrics: addMap(state.metrics, { order: -2, readiness: 3 }),
  }
  return { ...transitioned, actionsMax: workforceSummary(transitioned).constructionCapacity }
}

export function enterReconstruction(state) {
  if (!state.reconstructionTransition) return state
  const crisis = gallicCrisis(state)
  const damaged = applyEventDamage(state.buildings, crisis)
  const population = projectPopulation(state, crisis)
  const resourceDelta = crisis.resources ?? {}
  const metricDelta = crisis.metrics ?? {}
  const reconstruction = createReconstructionState({
    devastation: crisis.devastation,
    displaced: Math.round(crisis.displacedRate * 100),
    recordsIntegrity: 100 - crisis.recordsLoss,
    fireExposure: crisis.posture === 'prepared' ? 28 : crisis.posture === 'strained' ? 52 : 76,
    wallUrgency: crisis.posture === 'prepared' ? 36 : crisis.posture === 'strained' ? 61 : 84,
    latinTrust: clamp(48 + Math.round((state.factions.allies - 50) / 3)),
    alliedObligations: 25,
    crisisPosture: crisis.posture,
  })
  const crisisReport = {
    turn: 17,
    year: 390,
    title: crisis.title,
    text: crisis.text,
    notes: damaged.damaged.length ? [`Damaged works: ${damaged.damaged.join(', ')}.`] : [],
    resourceDelta,
    metricDelta,
    populationChange: population.change,
    populationTotal: population.projectedTotal,
    workforce: workforceSummary(state),
    resolvedRisk: state.flags?.actThreeReadinessScore ?? gallicReadiness(state)?.score ?? null,
    riskLabel: 'Readiness carried into the sack',
    crisisPosture: crisis.posture,
  }
  const nextTurn = 17
  const transitioned = {
    ...state,
    turn: nextTurn,
    era: 3,
    outcome: null,
    reconstructionTransition: false,
    reconstruction,
    buildings: damaged.buildings,
    population: population.nextPopulation,
    resources: addResources(state.resources, resourceDelta),
    metrics: addMap(state.metrics, metricDelta),
    reports: [...state.reports, crisisReport],
    actionsUsed: 0,
    nextWorksBonus: 0,
    selectedBuildingId: null,
    selectedFamily: 'housing',
    council: getCouncil(nextTurn),
    councilResolved: false,
    flags: { ...state.flags, crisisResolved: true, crisisPosture: crisis.posture },
  }
  return { ...transitioned, actionsMax: workforceSummary(transitioned).constructionCapacity }
}

export function enterRegionalStrategy(state) {
  if (!state.regionalTransition) return state
  const nextTurn = 21
  const transitioned = {
    ...state,
    turn: nextTurn,
    era: 4,
    outcome: null,
    regionalTransition: false,
    regional: createRegionalState(state.flags?.latinSettlement),
    actionsUsed: 0,
    nextWorksBonus: 0,
    selectedBuildingId: null,
    council: getCouncil(nextTurn),
    councilResolved: false,
    resources: addResources(state.resources, { stone: 3, treasury: 3, grain: 2 }),
    metrics: addMap(state.metrics, { trade: 2, readiness: 2 }),
  }
  return { ...transitioned, actionsMax: workforceSummary(transitioned).constructionCapacity }
}

export function enterItalianStrategy(state) {
  if (!state.italianTransition) return state
  const nextTurn = 24
  const transitioned = {
    ...state,
    turn: nextTurn,
    era: 5,
    outcome: null,
    italianTransition: false,
    italian: createItalianState(state.regional, state.flags?.caudineResponse),
    actionsUsed: 0,
    nextWorksBonus: 0,
    selectedBuildingId: null,
    council: getCouncil(nextTurn),
    councilResolved: false,
    resources: addResources(state.resources, { stone: 5, treasury: 6, grain: 3 }),
    metrics: addMap(state.metrics, { order: 2, readiness: 2 }),
  }
  return { ...transitioned, actionsMax: workforceSummary(transitioned).constructionCapacity }
}

export function selectDistrict(state, districtId) {
  return DISTRICTS.some((district) => district.id === districtId) ? { ...state, selectedDistrict: districtId, selectedBuildingId: null } : state
}

export function selectFamily(state, familyId) {
  return BUILDING_FAMILIES.some((family) => family.id === familyId) ? { ...state, selectedFamily: familyId } : state
}

export function selectBuilding(state, instanceId) {
  const building = state.buildings.find((item) => item.instanceId === instanceId)
  return building ? { ...state, selectedBuildingId: instanceId, selectedDistrict: building.districtId } : state
}

export const __test = { clamp, addMap, addResources, civicPressures, timedEvent, applyEventDamage, applyFireExposure, conditionFactor, actionRemaining, allocatePopulation, populationComposition }

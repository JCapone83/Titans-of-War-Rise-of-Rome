import { createInitialState } from './initialState.js'
import { continueToAugustanCity, continueToCivilSettlement, continueToImperialCapital, continueToMediterranean, continueToMetropolis, continueToRepublicUnderStrain, continueToTrajanicCapital, enterAugustanCity, enterCivilSettlement, enterHannibalicEmergency, enterImperialCapital, enterMediterranean, enterMetropolis, enterRepublicUnderStrain, enterTrajanicCapital } from './continuation.js'
import { calculateAugustanCityScore, calculateCivilSettlementScore, calculateImperialCapitalScore, calculateItalianScore, calculateMetropolitanScore, calculateOutcome, calculateRegionalScore, calculateRepublicStrainScore, calculateTrajanicCapitalScore } from './outcomes.js'
import { actionRemaining, advanceTurn, allocateWorkforce, continueProject, continueRegionalRoad, districtRiskReport, enterCityOfKings, enterEarlyRepublic, enterItalianStrategy, enterReconstruction, enterRegionalStrategy, foundRegionalColony, gallicReadiness, placeBuilding, resolveCouncil, reviseRegionalCompact, startRegionalRoad, upgradeBuilding, workAugustanProject, workCivilSettlementProject, workImperialProject, workItalianProject, workMediterraneanProject, workMetropolitanProject, workRepublicStrainProject, workTrajanicProject } from './simulation.js'

export const REFERENCE_STRATEGIES = [
  {
    id: 'household-league',
    name: 'Household League',
    thesis: 'Protect growth through dispersed shelter, water, grain, and reciprocal political obligations.',
    allocation: { farming: 55, works: 25, levy: 20 },
    councils: { 1: 'oath', 3: 'open', 5: 'rotation', 7: 'adopt', 9: 'defer' },
    turns: {
      1: [['build', 'housing', 'palatine'], ['build', 'water', 'capitoline']],
      2: [['build', 'grain', 'aventine'], ['build', 'shrine', 'palatine']],
      3: [['build', 'market', 'tiber'], ['build', 'defense', 'aventine']],
      4: [['build', 'drainage', 'forum'], ['build', 'water', 'quirinal']],
      5: [['build', 'housing', 'aventine'], ['build', 'grain', 'tiber']],
      6: [['upgrade', 'housing', 'palatine'], ['upgrade', 'water', 'capitoline']],
      7: [['upgrade', 'grain', 'aventine']],
      8: [],
      9: [['upgrade', 'housing', 'aventine'], ['upgrade', 'water', 'quirinal']],
      10: [],
    },
  },
  {
    id: 'river-exchange',
    name: 'River Exchange',
    thesis: 'Build guarded commerce around the Tiber route, storage, roads, and practical sanitation.',
    allocation: { farming: 45, works: 30, levy: 25 },
    councils: { 1: 'festival', 3: 'open', 5: 'contract', 7: 'adopt', 9: 'complete' },
    turns: {
      1: [['build', 'market', 'tiber'], ['build', 'grain', 'aventine']],
      2: [['build', 'water', 'capitoline'], ['build', 'housing', 'palatine']],
      3: [['build', 'defense', 'quirinal'], ['build', 'shrine', 'capitoline']],
      4: [['build', 'drainage', 'forum'], ['build', 'workshop', 'aventine']],
      5: [['build', 'grain', 'tiber'], ['build', 'water', 'palatine']],
      6: [['upgrade', 'grain', 'aventine']],
      7: [['upgrade', 'water', 'capitoline'], ['upgrade', 'housing', 'palatine']],
      8: [['upgrade', 'defense', 'quirinal']],
      9: [['upgrade', 'shrine', 'capitoline'], ['build', 'market', 'forum']],
      10: [['upgrade', 'grain', 'tiber'], ['upgrade', 'water', 'palatine']],
    },
  },
  {
    id: 'royal-works',
    name: 'Royal Works',
    thesis: 'Concentrate crews on drainage, specialized craft, defense, and civic monuments without starving the fields.',
    allocation: { farming: 35, works: 45, levy: 20 },
    councils: { 1: 'palatine-rule', 3: 'guarded', 5: 'royal', 7: 'court', 9: 'complete' },
    turns: {
      1: [['build', 'drainage', 'forum'], ['build', 'grain', 'aventine']],
      2: [['build', 'housing', 'palatine'], ['build', 'water', 'capitoline']],
      3: [['build', 'workshop', 'quirinal'], ['build', 'shrine', 'capitoline']],
      4: [['build', 'defense', 'aventine'], ['build', 'grain', 'tiber']],
      5: [['build', 'market', 'tiber'], ['build', 'water', 'palatine']],
      6: [['upgrade', 'drainage', 'forum'], ['upgrade', 'workshop', 'quirinal']],
      7: [['upgrade', 'water', 'capitoline']],
      8: [['upgrade', 'defense', 'aventine'], ['upgrade', 'grain', 'aventine']],
      9: [],
      10: [['upgrade', 'grain', 'tiber'], ['upgrade', 'water', 'palatine']],
    },
  },
]

export const RECOVERY_STRATEGY = {
  id: 'crowded-hills-recovery',
  name: 'Crowded Hills Recovery',
  thesis: 'Overbuild shelter and exposed exchange, then recover through water, drainage, storage, and guarded approaches.',
  allocation: { farming: 35, works: 45, levy: 20 },
  allocationsByTurn: {
    3: { farming: 50, works: 30, levy: 20 },
    7: { farming: 40, works: 35, levy: 25 },
  },
  councils: { 1: 'oath', 3: 'open', 5: 'rotation', 7: 'adopt', 9: 'defer' },
  turns: {
    1: [['build', 'housing', 'palatine'], ['build', 'housing', 'aventine']],
    2: [['build', 'market', 'tiber'], ['build', 'workshop', 'quirinal']],
    3: [['build', 'grain', 'aventine'], ['build', 'water', 'palatine']],
    4: [['build', 'drainage', 'forum'], ['build', 'defense', 'quirinal']],
    5: [['build', 'water', 'capitoline'], ['build', 'grain', 'tiber']],
    6: [['upgrade', 'housing', 'palatine'], ['upgrade', 'drainage', 'forum']],
    7: [['upgrade', 'water', 'palatine']],
    8: [['upgrade', 'defense', 'quirinal']],
    9: [['upgrade', 'housing', 'aventine']],
    10: [['upgrade', 'grain', 'aventine']],
  },
}

export const ACT_THREE_STRATEGIES = [
  {
    id: 'paid-siege-land-settlement',
    name: 'Paid Siege and Citizen Settlement',
    thesis: 'Use public accounts and soldier pay to maintain the siege, then answer service with land and defend Rome in depth.',
    baseStrategyId: 'household-league',
    allocation: { farming: 45, works: 25, levy: 30 },
    councils: { 11: 'paired-magistrates', 12: 'declared-season', 13: 'recognize-tribunes', 14: 'public-pay', 15: 'distribute-land', 16: 'screen-and-fortify' },
    turns: {},
  },
  {
    id: 'rotating-levy-tribute',
    name: 'Rotating Levy and Tributary Veii',
    thesis: 'Protect household seasons, preserve production at Veii, and buy time for an allied muster when the north moves.',
    baseStrategyId: 'river-exchange',
    allocation: { farming: 50, works: 25, levy: 25 },
    councils: { 11: 'senate-continuity', 12: 'temporary-stay', 13: 'negotiated-board', 14: 'seasonal-rotation', 15: 'tribute-settlement', 16: 'delay-and-muster' },
    turns: {},
  },
  {
    id: 'command-and-field-army',
    name: 'Command and Field Army',
    thesis: 'Concentrate command to break Veii and seek a field decision, accepting weaker consent and heavier household burdens.',
    baseStrategyId: 'royal-works',
    allocation: { farming: 35, works: 25, levy: 40 },
    councils: { 11: 'emergency-command', 12: 'enforce-contracts', 13: 'compel-return', 14: 'emergency-command-veii', 15: 'dedicate-and-break', 16: 'allia-concentration' },
    turns: {},
  },
]

export const ACT_FOUR_STRATEGIES = [
  {
    id: 'rapid-household-return',
    name: 'Rapid Household Return',
    thesis: 'Stabilize families, restore familiar plots quickly, remit crisis arrears, and rebuild Latin trust through reciprocity.',
    baseStrategyId: 'paid-siege-land-settlement',
    allocation: { farming: 50, works: 30, levy: 20 },
    councils: { 17: 'shelter-and-grain', 18: 'rapid-rebuilding', 19: 'debt-remission', 20: 'reciprocal-league' },
    turns: {},
  },
  {
    id: 'surveyed-civic-recovery',
    name: 'Surveyed Civic Recovery',
    thesis: 'Clear hazards, survey streets and claims, credit public labor, and use differentiated compacts to restore regional depth.',
    baseStrategyId: 'rotating-levy-tribute',
    allocation: { farming: 40, works: 40, levy: 20 },
    councils: { 17: 'clear-and-salvage', 18: 'planned-rebuilding', 19: 'labor-credits', 20: 'differentiated-compacts' },
    turns: {},
  },
  {
    id: 'fortified-roman-recovery',
    name: 'Fortified Roman Recovery',
    thesis: 'Secure the heights and approaches, rebuild around military roads, enforce credit, and impose Roman command.',
    baseStrategyId: 'command-and-field-army',
    baseCouncilOverrides: { 16: 'screen-and-fortify' },
    allocation: { farming: 35, works: 30, levy: 35 },
    councils: { 17: 'citadel-and-walls', 18: 'militarized-rebuilding', 19: 'enforce-and-contract', 20: 'roman-command' },
    turns: {},
  },
]

export const REGIONAL_STRATEGIES = [
  {
    id: 'strategic-depth', name: 'Strategic Depth', baseStrategyId: 'fortified-roman-recovery',
    thesis: 'Use defended corridors, legible quotas, and one coastal colony while preserving enough city supply to avoid overextension.',
    allocation: { farming: 40, works: 30, levy: 30 },
    councils: { 21: 'security-depth', 22: 'public-road-crews', 23: 'fixed-quotas' },
    turns: { 21: [['road', 'via-veientana']], 22: [['road', 'via-veientana'], ['road', 'antium-road']], 23: [['compact', 'praeneste', 'partialCitizens'], ['colony', 'antium']] },
  },
  {
    id: 'commercial-corridors', name: 'Commercial Corridors', baseStrategyId: 'surveyed-civic-recovery',
    thesis: 'Use port and Latin roads to convert city markets and stores into regional revenue while tracking hostile access.',
    allocation: { farming: 45, works: 35, levy: 20 },
    councils: { 21: 'commercial-corridors', 22: 'allied-road-bargain', 23: 'access-for-service' },
    turns: { 21: [['road', 'via-ostiensis']], 22: [['road', 'via-ostiensis']], 23: [['compact', 'tibur', 'latinAlly']] },
  },
  {
    id: 'reciprocal-alliance', name: 'Reciprocal Alliance', baseStrategyId: 'rapid-household-return',
    thesis: 'Use negotiated compacts and a limited inland road to obtain contingents without converting every partner into a dependency.',
    allocation: { farming: 45, works: 25, levy: 30 },
    councils: { 21: 'alliance-depth', 22: 'veteran-colonial-draft', 23: 'autonomy-compacts' },
    turns: { 21: [['compact', 'tibur', 'latinAlly'], ['road', 'latin-road']], 22: [['road', 'latin-road'], ['compact', 'praeneste', 'treatyAlly']], 23: [['colony', 'tusculum']] },
  },
]

export const ACT_FIVE_STRATEGIES = [
  {
    id: 'appian-persistence', name: 'Appian Persistence', baseStrategyId: 'strategic-depth',
    thesis: 'Complete the southern road first, preserve armies after reverses, divide coalitions, and turn replacement depth into a consolidated Italian system.',
    baseCouncilOverrides: { 21: 'commercial-corridors', 22: 'veteran-colonial-draft', 23: 'access-for-service' },
    allocation: { farming: 40, works: 35, levy: 25 },
    councils: { 24: 'road-first', 25: 'bounded-peace', 26: 'divide-coalition', 27: 'learn-and-reform', 28: 'refuse-terms', 29: 'italian-consolidation' },
    turns: { 24: ['viaAppia'], 25: ['aquaAppia'], 26: ['viaAppia'], 27: ['aquaAppia'], 28: ['viaAppia'], 29: ['aquaAppia'] },
  },
  {
    id: 'water-and-reserves', name: 'Water and Reserves', baseStrategyId: 'strategic-depth',
    thesis: 'Give urban water first claim, protect household reserves, defend the network at Sentinum, and offer bounded terms only from a position of endurance.',
    baseCouncilOverrides: { 21: 'commercial-corridors', 22: 'veteran-colonial-draft', 23: 'access-for-service' },
    allocation: { farming: 50, works: 35, levy: 15 },
    councils: { 24: 'water-first', 25: 'bounded-peace', 26: 'defend-network', 27: 'learn-and-reform', 28: 'limited-terms', 29: 'limited-hegemony' },
    turns: { 24: ['aquaAppia'], 25: ['viaAppia'], 26: ['aquaAppia'], 27: ['viaAppia'], 28: ['aquaAppia'], 29: ['viaAppia'] },
  },
  {
    id: 'federated-endurance', name: 'Federated Endurance', baseStrategyId: 'reciprocal-alliance',
    thesis: 'Phase both works, renew allied compacts, keep coalition armies apart, and isolate Pyrrhus through local obligations rather than one decisive gamble.',
    baseCouncilOverrides: { 21: 'commercial-corridors', 22: 'public-road-crews', 23: 'access-for-service' },
    allocation: { farming: 45, works: 30, levy: 25 },
    councils: { 24: 'phased-program', 25: 'allied-renewal', 26: 'divide-coalition', 27: 'bind-allies', 28: 'southern-pressure', 29: 'limited-hegemony' },
    turns: { 24: ['viaAppia'], 25: ['aquaAppia'], 26: ['aquaAppia'], 27: ['viaAppia'], 28: ['aquaAppia'], 29: ['viaAppia'] },
  },
  {
    id: 'command-and-decision', name: 'Command and Decision', baseStrategyId: 'strategic-depth',
    thesis: 'Use direct guarantees, concentration at Sentinum, and an early battle against Pyrrhus while relying on completed infrastructure to contain the resulting strain.',
    baseCouncilOverrides: { 21: 'commercial-corridors', 22: 'public-road-crews', 23: 'access-for-service' },
    allocation: { farming: 35, works: 30, levy: 35 },
    councils: { 24: 'road-first', 25: 'hard-terms', 26: 'concentrate', 27: 'seek-decision', 28: 'southern-pressure', 29: 'maritime-readiness' },
    turns: { 24: ['viaAppia'], 25: ['aquaAppia'], 26: ['viaAppia'], 27: ['aquaAppia'], 28: ['aquaAppia'], 29: ['viaAppia'] },
  },
]

function setAllocation(state, target) {
  let next = state
  for (const lane of ['works', 'levy', 'farming']) {
    let guard = 0
    while (next.workforceAllocation[lane] !== target[lane] && guard < 20) {
      const delta = target[lane] > next.workforceAllocation[lane] ? 5 : -5
      next = allocateWorkforce(next, lane, delta)
      guard += 1
    }
  }
  return next
}

function executeAction(state, action) {
  const [type, familyId, districtId] = action
  if (type === 'build') return placeBuilding(state, familyId, districtId)
  if (type === 'upgrade') {
    const placed = state.buildings.find((building) => building.familyId === familyId && building.districtId === districtId)
    return placed ? upgradeBuilding(state, placed.instanceId) : { state, error: `No ${familyId} work exists in ${districtId}.` }
  }
  return { state, error: `Unknown reference action: ${type}.` }
}

function executeRegionalAction(state, action) {
  const [type, first, second] = action
  if (type === 'compact') return reviseRegionalCompact(state, first, second)
  if (type === 'road') return state.regional.roadProjects.some((project) => project.routeId === first) ? continueRegionalRoad(state, first) : startRegionalRoad(state, first)
  if (type === 'colony') return foundRegionalColony(state, first)
  return { state, error: `Unknown regional reference action: ${type}.` }
}

export function runReferenceStrategy(strategy) {
  let state = setAllocation(createInitialState(), strategy.allocation)
  const skipped = []
  const snapshots = []
  while (!state.outcome) {
    const turnAllocation = strategy.allocationsByTurn?.[state.turn]
    if (turnAllocation) state = setAllocation(state, turnAllocation)
    if (state.council && !state.councilResolved) state = resolveCouncil(state, strategy.councils[state.turn] ?? state.council.options[0].id)
    for (const project of [...(state.projects ?? [])]) {
      if (!actionRemaining(state)) break
      const result = continueProject(state, project.projectId)
      if (!result.error) state = result.state
    }
    for (const action of strategy.turns[state.turn] ?? []) {
      if (!actionRemaining(state)) break
      const result = executeAction(state, action)
      if (result.error) skipped.push({ turn: state.turn, action, reason: result.error })
      else state = result.state
    }
    const risks = Object.values(districtRiskReport(state))
    snapshots.push({
      turn: state.turn,
      population: state.population.total,
      maxFire: Math.max(...risks.map((risk) => risk.fire)),
      maxDisease: Math.max(...risks.map((risk) => risk.disease)),
      maxFlood: Math.max(...risks.map((risk) => risk.flood)),
      metrics: { ...state.metrics },
    })
    const result = advanceTurn(state)
    if (result.error) throw new Error(`${strategy.name} stalled on turn ${state.turn}: ${result.error}`)
    state = result.state
    if (state.eraTransition) state = enterCityOfKings(state)
  }
  return { strategy, state, outcome: calculateOutcome(state), skipped, snapshots }
}

export function runAllReferenceStrategies() {
  return REFERENCE_STRATEGIES.map(runReferenceStrategy)
}

export function runRecoveryStrategy() {
  return runReferenceStrategy(RECOVERY_STRATEGY)
}

export function runActThreeStrategy(strategy) {
  const base = REFERENCE_STRATEGIES.find((item) => item.id === strategy.baseStrategyId)
  if (!base) throw new Error(`Unknown Act III base strategy: ${strategy.baseStrategyId}`)
  const inherited = runReferenceStrategy(base)
  let state = setAllocation(enterEarlyRepublic(inherited.state), strategy.allocation)
  const skipped = []
  const snapshots = []
  while (!state.outcome) {
    const turnAllocation = strategy.allocationsByTurn?.[state.turn]
    if (turnAllocation) state = setAllocation(state, turnAllocation)
    if (state.council && !state.councilResolved) state = resolveCouncil(state, strategy.councils[state.turn] ?? state.council.options[0].id)
    for (const project of [...(state.projects ?? [])]) {
      if (!actionRemaining(state)) break
      const result = continueProject(state, project.projectId)
      if (!result.error) state = result.state
    }
    for (const action of strategy.turns[state.turn] ?? []) {
      if (!actionRemaining(state)) break
      const result = executeAction(state, action)
      if (result.error) skipped.push({ turn: state.turn, action, reason: result.error })
      else state = result.state
    }
    snapshots.push({ turn: state.turn, war: state.war ? { ...state.war } : null, republic: { ...state.republic }, gallic: state.turn === 16 ? gallicReadiness(state) : null })
    const result = advanceTurn(state)
    if (result.error) throw new Error(`${strategy.name} stalled on turn ${state.turn}: ${result.error}`)
    state = result.state
  }
  return { strategy, state, outcome: calculateOutcome(state), skipped, snapshots }
}

export function runAllActThreeStrategies() {
  return ACT_THREE_STRATEGIES.map(runActThreeStrategy)
}

export function runActFourStrategy(strategy) {
  const base = ACT_THREE_STRATEGIES.find((item) => item.id === strategy.baseStrategyId)
  if (!base) throw new Error(`Unknown Act IV base strategy: ${strategy.baseStrategyId}`)
  const inheritedStrategy = strategy.baseCouncilOverrides ? { ...base, councils: { ...base.councils, ...strategy.baseCouncilOverrides } } : base
  const inherited = runActThreeStrategy(inheritedStrategy)
  let state = setAllocation(enterReconstruction(inherited.state), strategy.allocation)
  const skipped = []
  const snapshots = []
  while (!state.outcome) {
    const turnAllocation = strategy.allocationsByTurn?.[state.turn]
    if (turnAllocation) state = setAllocation(state, turnAllocation)
    if (state.council && !state.councilResolved) state = resolveCouncil(state, strategy.councils[state.turn] ?? state.council.options[0].id)
    for (const project of [...(state.projects ?? [])]) {
      if (!actionRemaining(state)) break
      const result = continueProject(state, project.projectId)
      if (!result.error) state = result.state
    }
    for (const action of strategy.turns[state.turn] ?? []) {
      if (!actionRemaining(state)) break
      const result = executeAction(state, action)
      if (result.error) skipped.push({ turn: state.turn, action, reason: result.error })
      else state = result.state
    }
    snapshots.push({ turn: state.turn, reconstruction: { ...state.reconstruction }, republic: { ...state.republic } })
    const result = advanceTurn(state)
    if (result.error) throw new Error(`${strategy.name} stalled on turn ${state.turn}: ${result.error}`)
    state = result.state
  }
  return { strategy, state, outcome: calculateOutcome(state), skipped, snapshots }
}

export function runAllActFourStrategies() {
  return ACT_FOUR_STRATEGIES.map(runActFourStrategy)
}

export function runRegionalStrategy(strategy) {
  const base = ACT_FOUR_STRATEGIES.find((item) => item.id === strategy.baseStrategyId)
  if (!base) throw new Error(`Unknown regional base strategy: ${strategy.baseStrategyId}`)
  const inherited = runActFourStrategy(base)
  let state = setAllocation(enterRegionalStrategy(inherited.state), strategy.allocation)
  const skipped = []
  const snapshots = []
  while (!state.outcome) {
    if (state.council && !state.councilResolved) state = resolveCouncil(state, strategy.councils[state.turn] ?? state.council.options[0].id)
    for (const action of strategy.turns[state.turn] ?? []) {
      if (!actionRemaining(state)) break
      const result = executeRegionalAction(state, action)
      if (result.error) skipped.push({ turn: state.turn, action, reason: result.error })
      else state = result.state
    }
    snapshots.push({ turn: state.turn, regional: calculateRegionalScore(state), resources: { ...state.resources } })
    const result = advanceTurn(state)
    if (result.error) throw new Error(`${strategy.name} stalled on turn ${state.turn}: ${result.error}`)
    state = result.state
  }
  return { strategy, state, outcome: calculateOutcome(state), regionalScore: calculateRegionalScore(state), skipped, snapshots }
}

export function runAllRegionalStrategies() {
  return REGIONAL_STRATEGIES.map(runRegionalStrategy)
}

export function runActFiveStrategy(strategy) {
  const base = REGIONAL_STRATEGIES.find((item) => item.id === strategy.baseStrategyId)
  if (!base) throw new Error(`Unknown Act V base strategy: ${strategy.baseStrategyId}`)
  const inherited = runRegionalStrategy({
    ...base,
    councils: { ...base.councils, ...(strategy.baseCouncilOverrides ?? {}) },
  })
  let state = setAllocation(enterItalianStrategy(inherited.state), strategy.allocation)
  const skipped = []
  const snapshots = []
  while (!state.outcome) {
    if (state.council && !state.councilResolved) state = resolveCouncil(state, strategy.councils[state.turn] ?? state.council.options[0].id)
    for (const projectId of strategy.turns[state.turn] ?? []) {
      if (!actionRemaining(state)) break
      const result = workItalianProject(state, projectId)
      if (result.error) skipped.push({ turn: state.turn, projectId, reason: result.error })
      else state = result.state
    }
    snapshots.push({ turn: state.turn, italian: { ...state.italian, projects: structuredClone(state.italian.projects) }, resources: { ...state.resources } })
    const result = advanceTurn(state)
    if (result.error) throw new Error(`${strategy.name} stalled on turn ${state.turn}: ${result.error}`)
    state = result.state
  }
  return { strategy, state, outcome: calculateOutcome(state), italianScore: calculateItalianScore(state), skipped, snapshots }
}

export function runAllActFiveStrategies() {
  return ACT_FIVE_STRATEGIES.map(runActFiveStrategy)
}

export const MEDITERRANEAN_STRATEGIES = [
  { id: 'distributed-endurance', name: 'Distributed Endurance', projectPriorities: { 30: 'tiberEmporium', 31: 'tiberEmporium', 32: 'tiberEmporium', 33: 'republicanHorrea', 34: 'republicanHorrea', 35: 'republicanHorrea' }, councils: { 30: 'allied-hulls', 31: 'pilotage-exchange', 32: 'war-credit', 33: 'shadow-and-contain', 34: 'protect-allied-cities', 35: 'differentiated-settlement', 36: 'restore-public-credit' } },
  { id: 'state-mobilization', name: 'State Mobilization', projectPriorities: { 30: 'appianApproach', 31: 'appianApproach', 32: 'tiberEmporium', 33: 'tiberEmporium', 34: 'tiberEmporium' }, councils: { 30: 'roman-keels', 31: 'drill-boarding', 32: 'local-compact', 33: 'seek-decision', 34: 'rebuild-the-legions', 35: 'exemplary-punishment', 36: 'veteran-land-settlement' } },
  { id: 'bounded-command', name: 'Bounded Command', projectPriorities: { 30: 'republicanCircus', 31: 'republicanCircus', 32: 'republicanCircus', 33: 'appianApproach', 34: 'appianApproach', 35: 'tiberEmporium' }, councils: { 30: 'limited-convoy', 31: 'safe-harbors', 32: 'short-command', 33: 'defend-the-compacts', 34: 'ransom-and-reconstitute', 35: 'shared-recovery', 36: 'victory-and-provision' } },
]

export function runAllMediterraneanStrategies() {
  const bases = runAllActFiveStrategies().slice(0, 3)
  return MEDITERRANEAN_STRATEGIES.map((strategy, index) => {
    let state = enterMediterranean(continueToMediterranean(bases[index].state))
    const skipped = []
    const ledger = []
    while (state.outcome !== 'mediterranean-complete') {
      if (state.hannibalicTransition) state = enterHannibalicEmergency(state)
      if (state.council && !state.councilResolved) state = resolveCouncil(state, strategy.councils[state.turn])
      const portfolioProject = strategy.projectPriorities?.[state.turn]
      if (portfolioProject && actionRemaining(state)) {
        const work = workMediterraneanProject(state, portfolioProject)
        if (work.error) skipped.push({ turn: state.turn, projectId: portfolioProject, reason: work.error })
        else state = work.state
      }
      ledger.push({ turn: state.turn, mediterranean: { ...state.mediterranean }, projects: structuredClone(state.mediterranean.projects ?? {}), bridges: structuredClone(state.chronologyBridges ?? []) })
      const result = advanceTurn(state)
      if (result.error) throw new Error(`${strategy.name} stalled on turn ${state.turn}: ${result.error}`)
      state = result.state
    }
    return { strategy, state, outcome: calculateOutcome(state), skipped, ledger }
  })
}

export const METROPOLITAN_OPENING_STRATEGIES = [
  { id: 'distributed-public-capacity', name: 'Distributed Public Capacity', councils: { 37: 'retire-debt-and-water', 38: 'public-records-and-hearings', 39: 'audited-commands' } },
  { id: 'patronal-metropolitan-growth', name: 'Patronal Metropolitan Growth', councils: { 37: 'bounded-triumphal-program', 38: 'licensed-patronal-halls', 39: 'contracted-settlement' } },
  { id: 'provision-first-restraint', name: 'Provision-first Restraint', councils: { 37: 'distribute-gains-and-grain', 38: 'disperse-market-and-petitions', 39: 'commander-discretion' } },
]

export function runAllMetropolitanOpeningStrategies() {
  const bases = runAllMediterraneanStrategies()
  return METROPOLITAN_OPENING_STRATEGIES.map((strategy, index) => {
    let state = enterMetropolis(continueToMetropolis(bases[index].state))
    const skipped = []
    const ledger = []
    while (state.turn <= 39) {
      const optionId = strategy.councils[state.turn]
      if (state.council && !state.councilResolved) {
        if (!optionId) skipped.push({ turn: state.turn, reason: 'No metropolitan council choice declared.' })
        else state = resolveCouncil(state, optionId)
      }
      ledger.push({ turn: state.turn, metropolitan: { ...state.metropolitan }, bridges: structuredClone(state.chronologyBridges ?? []) })
      const result = advanceTurn(state)
      if (result.error) throw new Error(`${strategy.name} stalled on turn ${state.turn}: ${result.error}`)
      state = result.state
    }
    return { strategy, state, outcome: calculateOutcome(state), skipped, ledger }
  })
}

export const METROPOLITAN_STRATEGIES = [
  {
    id: 'audited-civic-capacity', name: 'Audited Civic Capacity',
    councils: { 37: 'retire-debt-and-water', 38: 'public-records-and-hearings', 39: 'audited-commands', 40: 'audited-provision-settlement', 41: 'recorded-land-service' },
    projectPriorities: { 37: 'republicanBasilica', 38: 'republicanBasilica', 39: 'republicanBasilica', 40: 'republicanBasilica', 41: 'civicPorticoes' },
  },
  {
    id: 'market-and-water-metropolis', name: 'Market and Water Metropolis',
    councils: { 37: 'bounded-triumphal-program', 38: 'licensed-patronal-halls', 39: 'contracted-settlement', 40: 'punitive-extraction', 41: 'grain-storage-provision' },
    projectPriorities: { 37: 'regulatedMacellum', 38: 'regulatedMacellum', 39: 'regulatedMacellum', 40: 'aquaMarcia', 41: 'aquaMarcia' },
  },
  {
    id: 'provision-and-bounded-command', name: 'Provision and Bounded Command',
    councils: { 37: 'distribute-gains-and-grain', 38: 'disperse-market-and-petitions', 39: 'commander-discretion', 40: 'bounded-command-acquisition', 41: 'colonial-service-outlets' },
    projectPriorities: { 37: 'aquaMarcia', 38: 'aquaMarcia', 39: 'aquaMarcia', 40: 'aquaMarcia', 41: 'republicanBasilica' },
  },
]

export function runAllMetropolitanStrategies() {
  const bases = runAllMediterraneanStrategies()
  return METROPOLITAN_STRATEGIES.map((strategy, index) => {
    let state = enterMetropolis(continueToMetropolis(bases[index].state))
    const skipped = []
    const ledger = []
    while (state.outcome !== 'metropolitan-complete') {
      const optionId = strategy.councils[state.turn]
      if (state.council && !state.councilResolved) {
        if (!optionId) skipped.push({ turn: state.turn, reason: 'No metropolitan council choice declared.' })
        else state = resolveCouncil(state, optionId)
      }
      const projectId = strategy.projectPriorities[state.turn]
      if (projectId && actionRemaining(state)) {
        const work = workMetropolitanProject(state, projectId)
        if (work.error) skipped.push({ turn: state.turn, projectId, reason: work.error })
        else state = work.state
      }
      ledger.push({ turn: state.turn, metropolitan: { ...state.metropolitan, projects: structuredClone(state.metropolitan.projects ?? {}) }, resources: { ...state.resources }, bridges: structuredClone(state.chronologyBridges ?? []) })
      const result = advanceTurn(state)
      if (result.error) throw new Error(`${strategy.name} stalled on turn ${state.turn}: ${result.error}`)
      state = result.state
    }
    return { strategy, state, outcome: calculateOutcome(state), metropolitanScore: calculateMetropolitanScore(state), skipped, ledger }
  })
}

export const REPUBLIC_STRAIN_STRATEGIES = [
  {
    id: 'recorded-republic', name: 'Recorded Republic',
    councils: { 42: 'recorded-commission', 43: 'staged-citizenship', 44: 'ordinary-command-review', 45: 'recorded-demobilization', 46: 'public-archive-system', 47: 'open-routes-and-trials', 48: 'mutual-disarmament' },
    projectPriorities: { 42: 'landCensusRegistry', 43: 'landCensusRegistry', 44: 'landCensusRegistry', 45: 'tabularium', 46: 'tabularium', 47: 'forumCourts', 48: 'forumCourts' },
  },
  {
    id: 'integrated-italy', name: 'Integrated Italy',
    councils: { 42: 'colonial-outlets', 43: 'staged-citizenship', 44: 'single-command-with-audit', 45: 'temporary-dictatorship', 46: 'public-archive-system', 47: 'open-routes-and-trials', 48: 'mutual-disarmament' },
    projectPriorities: { 42: 'landCensusRegistry', 43: 'citizenshipRegisters', 44: 'citizenshipRegisters', 45: 'citizenshipRegisters', 46: 'watchStations', 47: 'watchStations', 48: 'watchStations' },
  },
  {
    id: 'bounded-command-settlement', name: 'Bounded Command Settlement',
    councils: { 42: 'colonial-outlets', 43: 'negotiated-compacts', 44: 'single-command-with-audit', 45: 'temporary-dictatorship', 46: 'public-archive-system', 47: 'open-routes-and-trials', 48: 'mutual-disarmament' },
    projectPriorities: { 42: 'landCensusRegistry', 43: 'landCensusRegistry', 44: 'landCensusRegistry', 45: 'watchStations', 46: 'watchStations', 47: 'watchStations' },
  },
]

export function runAllRepublicStrainStrategies() {
  const bases = runAllMetropolitanStrategies()
  return REPUBLIC_STRAIN_STRATEGIES.map((strategy, index) => {
    let state = enterRepublicUnderStrain(continueToRepublicUnderStrain(bases[index].state))
    const skipped = []
    const ledger = []
    while (state.outcome !== 'republic-strain-complete') {
      const optionId = strategy.councils[state.turn]
      if (state.council && !state.councilResolved) {
        if (!optionId) skipped.push({ turn: state.turn, reason: 'No Republic Under Strain council choice declared.' })
        else state = resolveCouncil(state, optionId)
      }
      const projectId = strategy.projectPriorities[state.turn]
      if (projectId && actionRemaining(state)) {
        const work = workRepublicStrainProject(state, projectId)
        if (work.error) skipped.push({ turn: state.turn, projectId, reason: work.error })
        else state = work.state
      }
      ledger.push({ turn: state.turn, republicStrain: { ...state.republicStrain, projects: structuredClone(state.republicStrain.projects ?? {}) }, resources: { ...state.resources }, bridges: structuredClone(state.chronologyBridges ?? []) })
      const result = advanceTurn(state)
      if (result.error) throw new Error(`${strategy.name} stalled on turn ${state.turn}: ${result.error}`)
      state = result.state
    }
    return { strategy, state, outcome: calculateOutcome(state), strainScore: calculateRepublicStrainScore(state), skipped, ledger }
  })
}

export const CIVIL_SETTLEMENT_STRATEGIES = [
  {
    id: 'augustan-operating-settlement', name: 'Augustan Operating Settlement',
    councils: { 49: 'caesarian-concentration', 50: 'public-board-and-compensation', 51: 'amnesty-and-ratified-acts', 52: 'assessed-tax-and-bonds', 53: 'victory-with-recorded-demobilization', 54: 'augustan-principate' },
    projectPriorities: { 50: 'caesarianForum', 51: 'caesarianForum', 52: 'caesarianForum', 53: 'curiaJulia', 54: 'curiaJulia' },
  },
  {
    id: 'negotiated-republican-restoration', name: 'Negotiated Republican Restoration',
    councils: { 49: 'mediated-mutual-standdown', 50: 'repair-existing-forum', 51: 'amnesty-and-ratified-acts', 52: 'assessed-tax-and-bonds', 53: 'negotiated-dual-withdrawal', 54: 'negotiated-republican-restoration' },
    projectPriorities: { 50: 'veteranLandRoadRegistry', 51: 'veteranLandRoadRegistry', 52: 'veteranLandRoadRegistry', 53: 'basilicaJulia', 54: 'basilicaJulia' },
  },
  {
    id: 'collegial-military-compact', name: 'Collegial Military Compact',
    councils: { 49: 'mediated-mutual-standdown', 50: 'victor-funded-precinct', 51: 'amnesty-and-ratified-acts', 52: 'assessed-tax-and-bonds', 53: 'victory-with-recorded-demobilization', 54: 'collegial-military-settlement' },
    projectPriorities: { 50: 'caesarianForum', 51: 'caesarianForum', 52: 'caesarianForum', 53: 'basilicaJulia', 54: 'basilicaJulia' },
  },
]

export function runAllCivilSettlementStrategies() {
  const bases = runAllRepublicStrainStrategies()
  return CIVIL_SETTLEMENT_STRATEGIES.map((strategy, index) => {
    let state = enterCivilSettlement(continueToCivilSettlement(bases[index].state))
    const skipped = []
    const ledger = []
    while (state.outcome !== 'civil-settlement-complete') {
      const optionId = strategy.councils[state.turn]
      if (state.council && !state.councilResolved) {
        if (!optionId) skipped.push({ turn: state.turn, reason: 'No civil-settlement council choice declared.' })
        else state = resolveCouncil(state, optionId)
      }
      const projectId = strategy.projectPriorities[state.turn]
      if (projectId && actionRemaining(state)) {
        const work = workCivilSettlementProject(state, projectId)
        if (work.error) skipped.push({ turn: state.turn, projectId, reason: work.error })
        else state = work.state
      }
      ledger.push({ turn: state.turn, civilSettlement: { ...state.civilSettlement, projects: structuredClone(state.civilSettlement.projects ?? {}) }, resources: { ...state.resources }, bridges: structuredClone(state.chronologyBridges ?? []) })
      const result = advanceTurn(state)
      if (result.error) throw new Error(`${strategy.name} stalled on turn ${state.turn}: ${result.error}`)
      state = result.state
    }
    return { strategy, state, outcome: calculateOutcome(state), civilScore: calculateCivilSettlementScore(state), skipped, ledger }
  })
}

export const AUGUSTAN_CITY_STRATEGIES = [
  {
    id: 'administrative-principate', name: 'Administrative Principate',
    councils: { 55: 'administrative-princeps', 56: 'municipal-service-board', 57: 'staged-public-apprenticeship', 58: 'senatorial-peace-account', 59: 'courts-first-forum', 60: 'central-vigiles', 61: 'recorded-transfer' },
    projectPriorities: { 55: 'palatineOfficialPrecinct', 56: 'palatineOfficialPrecinct', 57: 'palatineOfficialPrecinct', 58: 'agrippanPantheon', 59: 'forumAugustus', 60: 'vigilesWardNetwork', 61: 'vigilesWardNetwork' },
  },
  {
    id: 'civic-augustan-compact', name: 'Civic Augustan Compact',
    councils: { 55: 'civic-compact', 56: 'district-service-compacts', 57: 'senatorial-contingency', 58: 'provincial-renewal-calendar', 59: 'mixed-civic-calendar', 60: 'magistrate-ward-service', 61: 'senatorial-interregnum' },
    projectPriorities: { 55: 'agrippanPantheon', 56: 'agrippanPantheon', 57: 'agrippanPantheon', 58: 'bathsAgrippa', 59: 'bathsAgrippa', 60: 'bathsAgrippa', 61: 'araPacis' },
  },
  {
    id: 'household-centered-principate', name: 'Household-Centered Principate',
    councils: { 55: 'household-command', 56: 'agrippan-benefaction', 57: 'dynastic-honors', 58: 'victory-peace-program', 59: 'martial-dynastic-forum', 60: 'contracted-night-watch', 61: 'household-acclamation' },
    projectPriorities: { 55: 'mausoleumAugustus', 56: 'mausoleumAugustus', 57: 'mausoleumAugustus', 58: 'mausoleumAugustus', 59: 'theatreMarcellus', 60: 'theatreMarcellus', 61: 'theatreMarcellus' },
  },
]

export function runAllAugustanCityStrategies() {
  const bases = runAllCivilSettlementStrategies()
  return AUGUSTAN_CITY_STRATEGIES.map((strategy, index) => {
    let state = enterAugustanCity(continueToAugustanCity(bases[index].state))
    const skipped = []
    const ledger = []
    while (state.outcome !== 'augustan-city-complete') {
      const optionId = strategy.councils[state.turn]
      if (state.council && !state.councilResolved) {
        if (!optionId) skipped.push({ turn: state.turn, reason: 'No Augustan City council choice declared.' })
        else state = resolveCouncil(state, optionId)
      }
      const projectId = strategy.projectPriorities[state.turn]
      if (projectId && actionRemaining(state)) {
        const work = workAugustanProject(state, projectId)
        if (work.error) skipped.push({ turn: state.turn, projectId, reason: work.error })
        else state = work.state
      }
      ledger.push({ turn: state.turn, augustanCity: { ...state.augustanCity, projects: structuredClone(state.augustanCity.projects ?? {}) }, resources: { ...state.resources }, bridges: structuredClone(state.chronologyBridges ?? []) })
      const result = advanceTurn(state)
      if (result.error) throw new Error(`${strategy.name} stalled on turn ${state.turn}: ${result.error}`)
      state = result.state
    }
    return { strategy, state, outcome: calculateOutcome(state), augustanScore: calculateAugustanCityScore(state), skipped, ledger }
  })
}

export const IMPERIAL_CAPITAL_STRATEGIES = [
  {
    id: 'public-flavian-capital', name: 'Public Flavian Capital', thesis: 'Use recorded transfer, public rebuilding, and the former Neronian lake to create an operating public amphitheater.',
    councils: { 62: 'recorded-renewal', 63: 'mixed-offices', 64: 'integrated-provision-board', 65: 'published-court-budget', 66: 'public-rebuild-code', 67: 'flavian-public-conversion', 68: 'service-and-conversion', 69: 'funded-public-operation', 70: 'recorded-adoption' },
    projectPriorities: { 67: 'flavianAmphitheatre', 68: 'flavianAmphitheatre', 69: 'flavianAmphitheatre', 70: 'flavianAmphitheatre' },
  },
  {
    id: 'provision-first-capital', name: 'Provision-First Capital', thesis: 'Make water, harbor, grain, maintenance, and provincial trust the foundation of first-century scale.',
    councils: { 62: 'recorded-renewal', 63: 'prefectural-center', 64: 'integrated-provision-board', 65: 'published-court-budget', 66: 'mixed-clearance', 67: 'flavian-fiscal-first', 68: 'treasury-and-provinces', 69: 'limited-calendar', 70: 'recorded-adoption' },
    projectPriorities: { 64: 'aquaClaudia', 65: 'aquaClaudia', 66: 'aquaClaudia', 67: 'aquaClaudia', 68: 'claudianPortus', 69: 'claudianPortus', 70: 'claudianPortus' },
  },
  {
    id: 'palace-administrative-capital', name: 'Palace-Administrative Capital', thesis: 'Concentrate guard, court, and palace administration while using records, provision, and fire rules to keep the settlement operable.',
    councils: { 62: 'recorded-renewal', 63: 'mixed-offices', 64: 'integrated-provision-board', 65: 'published-court-budget', 66: 'public-rebuild-code', 67: 'military-acclamation', 68: 'treasury-and-provinces', 69: 'limited-calendar', 70: 'palace-continuity' },
    projectPriorities: { 62: 'castraPraetoria', 63: 'castraPraetoria', 64: 'castraPraetoria', 66: 'domusAurea', 67: 'domusAurea', 68: 'domusAurea', 69: 'domitianicPalace', 70: 'domitianicPalace' },
  },
]

export function simulateImperialCapitalStrategy(strategy, baseState) {
  let state = enterImperialCapital(continueToImperialCapital(baseState))
  const skipped = []
  const ledger = []
  while (state.outcome !== 'imperial-capital-complete') {
    const optionId = strategy.councils[state.turn]
    if (state.council && !state.councilResolved) {
      if (!optionId) skipped.push({ turn: state.turn, reason: 'No Imperial Capital council choice declared.' })
      else state = resolveCouncil(state, optionId)
    }
    const projectId = strategy.projectPriorities[state.turn]
    if (projectId && actionRemaining(state)) {
      const work = workImperialProject(state, projectId)
      if (work.error) skipped.push({ turn: state.turn, projectId, reason: work.error })
      else state = work.state
    }
    ledger.push({ turn: state.turn, imperialCapital: { ...state.imperialCapital, projects: structuredClone(state.imperialCapital.projects ?? {}) }, resources: { ...state.resources } })
    const result = advanceTurn(state)
    if (result.error) throw new Error(`${strategy.name} stalled on turn ${state.turn}: ${result.error}`)
    state = result.state
  }
  return { strategy, state, outcome: calculateOutcome(state), imperialScore: calculateImperialCapitalScore(state), skipped, ledger }
}

export function runAllImperialCapitalStrategies() {
  const bases = runAllAugustanCityStrategies()
  return IMPERIAL_CAPITAL_STRATEGIES.map((strategy, index) => simulateImperialCapitalStrategy(strategy, bases[index].state))
}

export const TRAJANIC_CAPITAL_STRATEGIES = [
  {
    id: 'integrated-administrative-capital', name: 'Integrated Administrative Capital', thesis: 'Bind recorded succession, provincial disposition, the Quirinal precinct, and joined supply to an operating administrative center.',
    councils: { 71: 'recorded-adoption', 72: 'provincial-disposition', 73: 'integrated-forum-program', 74: 'service-before-splendor', 75: 'distributed-supply-and-basin', 76: 'constitutional-settlement' },
    projectPriorities: { 73: 'trajanAdministrativeComplex', 74: 'trajanAdministrativeComplex', 75: 'trajanAdministrativeComplex', 76: 'trajanAdministrativeComplex' },
    baseIndex: 1,
  },
  {
    id: 'frontier-forum-capital', name: 'Frontier and Forum Capital', thesis: 'Use veteran rolls and the integrated Forum while leaving AD 117 under an explicit frontier and treasury settlement.',
    councils: { 71: 'recorded-adoption', 72: 'frontier-and-veteran-rolls', 73: 'integrated-forum-program', 74: 'restricted-operation', 75: 'water-first-resilience', 76: 'frontier-and-treasury' },
    projectPriorities: { 73: 'forumTrajan', 74: 'forumTrajan', 75: 'forumTrajan', 76: 'forumTrajan' },
    baseIndex: 1,
  },
  {
    id: 'public-baths-compact', name: 'Public Baths and Provincial Compact', thesis: 'Convert palace ground to public service and make provincial trust and maintenance the final settlement rather than an afterthought.',
    councils: { 71: 'senate-guarded-transfer', 72: 'provincial-disposition', 73: 'administrative-first', 74: 'public-conversion', 75: 'distributed-supply-and-basin', 76: 'provincial-trust-and-maintenance' },
    projectPriorities: { 74: 'bathsTrajan', 75: 'bathsTrajan', 76: 'bathsTrajan' },
    baseIndex: 1,
  },
  {
    id: 'water-resilient-capital', name: 'Water-Resilient Capital', thesis: 'Limit conquest dependence, secure sources and flood defenses, and carry a constitutional settlement through distributed water capacity.',
    councils: { 71: 'recorded-adoption', 72: 'provincial-disposition', 73: 'administrative-first', 74: 'service-before-splendor', 75: 'water-first-resilience', 76: 'constitutional-settlement' },
    projectPriorities: { 75: 'aquaTraiana', 76: 'aquaTraiana' },
    baseIndex: 1,
  },
]

export function simulateTrajanicCapitalStrategy(strategy, baseState) {
  let state = enterTrajanicCapital(continueToTrajanicCapital(baseState))
  const skipped = []
  const ledger = []
  while (state.outcome !== 'trajanic-capital-complete') {
    const optionId = strategy.councils[state.turn]
    if (state.council && !state.councilResolved) {
      if (!optionId) skipped.push({ turn: state.turn, reason: 'No Trajanic Capital council choice declared.' })
      else state = resolveCouncil(state, optionId)
    }
    const projectId = strategy.projectPriorities[state.turn]
    if (projectId && actionRemaining(state)) {
      const work = workTrajanicProject(state, projectId)
      if (work.error) skipped.push({ turn: state.turn, projectId, reason: work.error })
      else state = work.state
    }
    ledger.push({ turn: state.turn, trajanicCapital: { ...state.trajanicCapital, projects: structuredClone(state.trajanicCapital.projects ?? {}) }, resources: { ...state.resources } })
    const result = advanceTurn(state)
    if (result.error) throw new Error(`${strategy.name} stalled on turn ${state.turn}: ${result.error}`)
    state = result.state
  }
  return { strategy, state, outcome: calculateOutcome(state), trajanicScore: calculateTrajanicCapitalScore(state), skipped, ledger }
}

export function runAllTrajanicCapitalStrategies() {
  const bases = runAllImperialCapitalStrategies()
  return TRAJANIC_CAPITAL_STRATEGIES.map((strategy) => simulateTrajanicCapitalStrategy(strategy, bases[strategy.baseIndex].state))
}

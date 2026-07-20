import { createInitialState } from './initialState.js'
import { continueToMediterranean, enterHannibalicEmergency, enterMediterranean } from './continuation.js'
import { calculateItalianScore, calculateOutcome, calculateRegionalScore } from './outcomes.js'
import { actionRemaining, advanceTurn, allocateWorkforce, continueProject, continueRegionalRoad, districtRiskReport, enterCityOfKings, enterEarlyRepublic, enterItalianStrategy, enterReconstruction, enterRegionalStrategy, foundRegionalColony, gallicReadiness, placeBuilding, resolveCouncil, reviseRegionalCompact, startRegionalRoad, upgradeBuilding, workItalianProject } from './simulation.js'

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
  { id: 'distributed-endurance', name: 'Distributed Endurance', councils: { 30: 'allied-hulls', 31: 'pilotage-exchange', 32: 'war-credit', 33: 'shadow-and-contain', 34: 'protect-allied-cities', 35: 'differentiated-settlement', 36: 'restore-public-credit' } },
  { id: 'state-mobilization', name: 'State Mobilization', councils: { 30: 'roman-keels', 31: 'drill-boarding', 32: 'local-compact', 33: 'seek-decision', 34: 'rebuild-the-legions', 35: 'exemplary-punishment', 36: 'veteran-land-settlement' } },
  { id: 'bounded-command', name: 'Bounded Command', councils: { 30: 'limited-convoy', 31: 'safe-harbors', 32: 'short-command', 33: 'defend-the-compacts', 34: 'ransom-and-reconstitute', 35: 'shared-recovery', 36: 'victory-and-provision' } },
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
      ledger.push({ turn: state.turn, mediterranean: { ...state.mediterranean }, bridges: structuredClone(state.chronologyBridges ?? []) })
      const result = advanceTurn(state)
      if (result.error) throw new Error(`${strategy.name} stalled on turn ${state.turn}: ${result.error}`)
      state = result.state
    }
    return { strategy, state, outcome: calculateOutcome(state), skipped, ledger }
  })
}

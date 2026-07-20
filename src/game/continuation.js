import { getCouncil } from './data.js'
import { createCivilSettlementState, createMediterraneanState, createMetropolitanState, createRepublicStrainState } from './initialState.js'
import { calculateOutcome } from './outcomes.js'

export function freezeCoreJudgment(state) {
  const judgment = calculateOutcome(state)
  return {
    title: judgment.title,
    summary: judgment.summary,
    overall: judgment.overall,
    grades: structuredClone(judgment.grades),
    turn: 29,
    year: 264,
    choiceLogLength: state.choiceLog.length,
  }
}

export function continueToMediterranean(state) {
  if (state.turn !== 29 || state.outcome !== 'complete' || state.mediterraneanTransition) return state
  return { ...state, coreJudgment: freezeCoreJudgment(state), mediterraneanTransition: true }
}

export function enterMediterranean(state) {
  if (!state.mediterraneanTransition || !state.coreJudgment) return state
  const next = {
    ...state,
    version: 10,
    turn: 30,
    era: 6,
    outcome: null,
    mediterraneanTransition: false,
    mediterranean: state.mediterranean ?? createMediterraneanState(),
    actionsUsed: 0,
    nextWorksBonus: 0,
    selectedBuildingId: null,
    council: getCouncil(30),
    councilResolved: false,
  }
  return next
}

const bounded = (value) => Math.max(0, Math.min(100, Math.round(value)))

function interwarChanges(state) {
  const changes = {
    fleetCapacity: -3,
    maritimeLosses: 0,
    warCredit: 3,
    contractorExposure: -2,
    provincialTrust: 0,
    importedGrainShare: state.mediterranean.importedGrainShare >= 10 ? 2 : 0,
    alliedExhaustion: -8,
    overseasCommandDuration: -1,
    emergencyReserve: Math.round(((state.italian?.reserveDepth ?? 50) - 50) * 0.2),
    veteranSettlementPressure: 4,
  }
  const notes = ['Peace recovers part of the Italian levy burden, but fleet maintenance and veteran claims remain visible.']
  if (state.flags.fleetDoctrine === 'allied-hulls') {
    changes.fleetCapacity -= 2
    changes.contractorExposure += 4
    notes.push('Allied hulls preserve maritime knowledge while renewing dependence on negotiated contracts and crews.')
  } else if (state.flags.fleetDoctrine === 'roman-keels') {
    changes.fleetCapacity += 1
    changes.contractorExposure -= 2
    notes.push('Publicly supervised keels retain more capacity, with maintenance charged to Roman accounts.')
  } else {
    changes.fleetCapacity -= 1
    changes.alliedExhaustion -= 2
    notes.push('The limited convoy doctrine leaves less fleet to maintain and fewer allied crews continuously committed.')
  }
  if (state.flags.sicilianSettlement === 'local-compact') {
    changes.provincialTrust += 6
    changes.importedGrainShare += 3
    changes.alliedExhaustion -= 2
    notes.push('Negotiated Sicilian dues deepen grain access and trust during the interwar years.')
  } else if (state.flags.sicilianSettlement === 'war-credit') {
    changes.warCredit -= 3
    changes.contractorExposure += 4
    changes.provincialTrust -= 3
    notes.push('The war-credit settlement leaves useful capacity alongside contracts and repayment claims.')
  } else {
    changes.overseasCommandDuration -= 2
    changes.contractorExposure -= 2
    changes.alliedExhaustion -= 3
    notes.push('The short command reduces continuing exposure but leaves less standing direction overseas.')
  }
  return { changes, notes }
}

export function enterHannibalicEmergency(state) {
  if (state.turn !== 32 || state.outcome !== 'mediterranean-opening-complete' || !state.hannibalicTransition) return state
  if ((state.chronologyBridges ?? []).some((bridge) => bridge.id === 'first-punic-interwar')) return state
  const before = { ...createMediterraneanState(), ...state.mediterranean }
  const { changes, notes } = interwarChanges({ ...state, mediterranean: before })
  const mediterranean = Object.fromEntries(Object.entries(before).map(([key, value]) => [
    key,
    typeof value === 'number' ? bounded(value + (changes[key] ?? 0)) : structuredClone(value),
  ]))
  const resourceDelta = {
    treasury: state.flags.sicilianSettlement === 'war-credit' ? 0 : 2,
    grain: before.importedGrainShare >= 10 ? 2 : 0,
  }
  const resources = Object.fromEntries(Object.entries(state.resources).map(([key, value]) => [key, Math.max(0, value + (resourceDelta[key] ?? 0))]))
  const bridge = {
    id: 'first-punic-interwar',
    fromYear: 241,
    toYear: 218,
    mediterraneanChanges: Object.fromEntries(Object.keys(mediterranean)
      .filter((key) => typeof mediterranean[key] === 'number')
      .map((key) => [key, mediterranean[key] - before[key]])),
    resourceDelta,
    notes,
  }
  return {
    ...state,
    version: 10,
    turn: 33,
    outcome: null,
    hannibalicTransition: false,
    mediterranean,
    resources,
    chronologyBridges: [...(state.chronologyBridges ?? []), bridge],
    actionsUsed: 0,
    nextWorksBonus: 0,
    selectedBuildingId: null,
    council: getCouncil(33),
    councilResolved: false,
  }
}

export function continueToMetropolis(state) {
  if (state.turn !== 36 || state.outcome !== 'mediterranean-complete' || state.metropolitanTransition) return state
  return { ...state, metropolitanTransition: true }
}

export function enterMetropolis(state) {
  if (!state.metropolitanTransition || state.turn !== 36 || state.outcome !== 'mediterranean-complete') return state
  const bridgeExists = (state.chronologyBridges ?? []).some((bridge) => bridge.id === 'mediterranean-to-metropolis')
  const bridge = {
    id: 'mediterranean-to-metropolis',
    fromYear: 201,
    toYear: 200,
    mediterraneanChanges: {},
    notes: [
      'The peace settlement becomes the opening account for eastern commands, urban migration, public contracts, and the growing load on the Forum.',
      'No inherited work, obligation, judgment, or campaign record is removed at the transition.',
    ],
  }
  return {
    ...state,
    version: 11,
    turn: 37,
    era: 7,
    outcome: null,
    metropolitanTransition: false,
    metropolitan: state.metropolitan ?? createMetropolitanState(),
    chronologyBridges: bridgeExists ? state.chronologyBridges : [...(state.chronologyBridges ?? []), bridge],
    actionsUsed: 0,
    nextWorksBonus: 0,
    selectedBuildingId: null,
    council: getCouncil(37),
    councilResolved: false,
  }
}

export function continueToRepublicUnderStrain(state) {
  if (state.turn !== 41 || state.outcome !== 'metropolitan-complete' || state.strainTransition) return state
  return { ...state, strainTransition: true }
}

export function enterRepublicUnderStrain(state) {
  if (!state.strainTransition || state.turn !== 41 || state.outcome !== 'metropolitan-complete') return state
  const bridgeExists = (state.chronologyBridges ?? []).some((bridge) => bridge.id === 'gracchan-conflicts')
  const bridge = {
    id: 'gracchan-conflicts',
    fromYear: 133,
    toYear: 121,
    mediterraneanChanges: {},
    notes: [
      'The deaths of Tiberius and Gaius Gracchus do not settle the land, grain, military-service, citizenship, and constitutional disputes they made unavoidable.',
      'The continuation begins in 121 BC with every inherited work, account, compact, and metropolitan burden preserved.',
    ],
  }
  return {
    ...state,
    version: 12,
    turn: 42,
    era: 8,
    outcome: null,
    strainTransition: false,
    republicStrain: state.republicStrain ?? createRepublicStrainState(),
    chronologyBridges: bridgeExists ? state.chronologyBridges : [...(state.chronologyBridges ?? []), bridge],
    actionsUsed: 0,
    nextWorksBonus: 0,
    selectedBuildingId: null,
    council: getCouncil(42),
    councilResolved: false,
  }
}

export function continueToCivilSettlement(state) {
  if (state.turn !== 48 || state.outcome !== 'republic-strain-complete' || state.settlementTransition) return state
  return { ...state, settlementTransition: true }
}

export function enterCivilSettlement(state) {
  if (!state.settlementTransition || state.turn !== 48 || state.outcome !== 'republic-strain-complete') return state
  const bridgeExists = (state.chronologyBridges ?? []).some((bridge) => bridge.id === 'rubicon-to-civil-war')
  const bridge = {
    id: 'rubicon-to-civil-war',
    fromYear: 49,
    toYear: 49,
    mediterraneanChanges: {},
    notes: [
      'The constitutional threshold and the opening civil-war decision occur in the same year; the bridge records an explicit player choice to continue rather than an elapsed interval.',
      'Every inherited city, compact, account, public work, burden, judgment, and decision remains part of the settlement problem.',
    ],
  }
  return {
    ...state,
    version: 13,
    turn: 49,
    era: 9,
    outcome: null,
    settlementTransition: false,
    civilSettlement: state.civilSettlement ?? createCivilSettlementState(),
    chronologyBridges: bridgeExists ? state.chronologyBridges : [...(state.chronologyBridges ?? []), bridge],
    actionsUsed: 0,
    nextWorksBonus: 0,
    selectedBuildingId: null,
    council: getCouncil(49),
    councilResolved: false,
  }
}

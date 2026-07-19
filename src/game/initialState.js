import { FACTIONS, REGIONAL_COMMUNITIES, RELATIONSHIP_TYPES, getCouncil } from './data.js'

export const createInitialPopulation = () => ({
  total: 1030,
  households: 206,
  dependents: 412,
  workers: 433,
  levyEligible: 144,
  craftsmen: 41,
  districts: { palatine: 450, capitoline: 120, forum: 0, aventine: 210, tiber: 90, quirinal: 160 },
  lastChange: { births: 0, arrivals: 0, departures: 0, illness: 0, eventLosses: 0, net: 0 },
})

export const createInitialWorkforceAllocation = () => ({ farming: 50, works: 30, levy: 20 })

export const createRepublicState = () => ({
  magistrateAuthority: 48,
  senateStanding: 55,
  assemblyConsent: 46,
  debtStrain: 24,
  levyBurden: 18,
})

export const createWarState = () => ({
  veiiPressure: 30,
  siegePersistence: 18,
  soldierPay: 0,
  landExpectations: 12,
  veteranCohesion: 42,
  gallicThreat: 24,
})

export const createReconstructionState = (crisis = {}) => ({
  devastation: crisis.devastation ?? 0,
  displaced: crisis.displaced ?? 0,
  recordsIntegrity: crisis.recordsIntegrity ?? 100,
  fireExposure: crisis.fireExposure ?? 10,
  wallUrgency: crisis.wallUrgency ?? 20,
  latinTrust: crisis.latinTrust ?? 48,
  alliedObligations: crisis.alliedObligations ?? 25,
  crisisPosture: crisis.crisisPosture ?? 'unresolved',
})

const regionalRelationship = (settlement, community) => {
  if (['rome', 'veii', 'ostia'].includes(community.id)) return 'citizens'
  if (settlement === 'roman-command' && ['tusculum', 'praeneste', 'antium'].includes(community.id)) return 'partialCitizens'
  if (settlement === 'reciprocal-league' && ['tibur', 'praeneste', 'satricum'].includes(community.id)) return 'latinAlly'
  return community.defaultType
}

export const createRegionalState = (latinSettlement = 'differentiated-compacts') => ({
  communities: Object.fromEntries(REGIONAL_COMMUNITIES.map((community) => {
    const relationship = regionalRelationship(latinSettlement, community)
    const base = RELATIONSHIP_TYPES[relationship]
    const commandRisk = latinSettlement === 'roman-command' && relationship === 'partialCitizens' ? 12 : 0
    return [community.id, { relationship, militaryContribution: base.militaryContribution, autonomy: base.autonomy, tradeAccess: base.tradeAccess, revoltRisk: base.revoltRisk + commandRisk, compactRevised: false }]
  })),
  roads: [],
  roadProjects: [],
  colonies: [],
  selectedCommunity: 'rome',
  selectedRoute: 'via-ostiensis',
  securityDoctrine: 0,
  commerceDoctrine: 0,
  allianceDoctrine: 0,
  militaryCoordination: 0,
  hostileAccess: 0,
  revoltPressure: 0,
  administrationBurden: 0,
  roadCrewBonus: 0,
  roadCostRelief: 0,
  colonySettlerRelief: 0,
  garrisonDemand: 0,
})

export const createItalianState = (regional = null, caudineResponse = 'preserve-army') => {
  const allianceBase = regional ? Math.min(80, 40 + Math.round((regional.allianceDoctrine ?? 0) * 1.5)) : 45
  const pressureAdjustment = caudineResponse === 'allied-ratification' ? -4 : caudineResponse === 'ransom-and-rebuild' ? -2 : 0
  return {
    samnitePressure: 62 + pressureAdjustment,
    allianceDepth: allianceBase,
    campaignPersistence: caudineResponse === 'preserve-army' ? 56 : 50,
    reserveDepth: 48,
    coalitionRisk: 42,
    pyrrhicPressure: 0,
    maintenanceDebt: 0,
    waterCapacity: 0,
    hostileAccess: regional?.hostileAccess ?? 0,
    projects: {
      viaAppia: { id: 'viaAppia', progress: 0, requiredSeasons: 3, completed: false, lastWorkedTurn: null },
      aquaAppia: { id: 'aquaAppia', progress: 0, requiredSeasons: 3, completed: false, lastWorkedTurn: null },
    },
  }
}

const withoutLegacyLabor = (resources = {}) => Object.fromEntries(
  Object.entries(resources).filter(([key]) => key !== 'labor'),
)

const migratedWorksCapacity = (population, allocation, bonus = 0, republic = null, magistrateMode = null) => {
  const eligible = (population?.workers ?? 433) + (population?.craftsmen ?? 41) + (population?.levyEligible ?? 144)
  const works = Math.round(eligible * allocation.works / 100)
  const base = Math.max(1, Math.min(4, 1 + Math.floor(works / 130) + bonus))
  if (!republic) return base
  if (magistrateMode === 'emergency') return base
  if (magistrateMode === 'senate') return Math.min(republic.senateStanding >= 50 ? 3 : 2, base)
  return Math.min(2, base)
}

export const createMediterraneanState = () => ({
  fleetCapacity: 0,
  maritimeLosses: 0,
  warCredit: 0,
  contractorExposure: 0,
  provincialTrust: 50,
  importedGrainShare: 0,
  alliedExhaustion: 0,
  overseasCommandDuration: 0,
})

export const createInitialState = () => ({
  version: 9,
  turn: 1,
  era: 0,
  resources: { grain: 12, timber: 12, stone: 4, bronze: 2, treasury: 7 },
  metrics: { food: 52, water: 45, shelter: 38, sanitation: 42, order: 50, auspices: 56, readiness: 44, trade: 32 },
  factions: Object.fromEntries(Object.keys(FACTIONS).map((id) => [id, 50])),
  buildings: [],
  selectedDistrict: 'palatine',
  selectedFamily: 'housing',
  selectedBuildingId: null,
  actionsUsed: 0,
  actionsMax: 2,
  actionLog: [],
  population: createInitialPopulation(),
  workforceAllocation: createInitialWorkforceAllocation(),
  projects: [],
  nextWorksBonus: 0,
  council: getCouncil(1),
  councilResolved: false,
  choiceLog: [],
  reports: [],
  flags: {},
  eraTransition: false,
  republicTransition: false,
  reconstructionTransition: false,
  regionalTransition: false,
  italianTransition: false,
  mediterraneanTransition: false,
  republic: null,
  war: null,
  reconstruction: null,
  regional: null,
  italian: null,
  mediterranean: null,
  coreJudgment: null,
  outcome: null,
  consultedNotes: [],
  walkthroughSeen: false,
})

export function migrateState(saved) {
  if (!saved || saved.turn < 1 || saved.turn > 32) return null
  if (![1, 2, 3, 4, 5, 6, 7, 8, 9].includes(saved.version)) return null
  const population = saved.population ?? createInitialPopulation()
  const workforceAllocation = saved.workforceAllocation ?? createInitialWorkforceAllocation()
  if ([5, 6, 7, 8, 9].includes(saved.version)) {
    const completedOldRepublic = saved.era >= 2 && saved.turn === 13 && saved.outcome === 'complete'
    const completedOldActThree = saved.era === 2 && saved.turn === 16 && saved.outcome === 'complete'
    const completedOldActFour = saved.era === 3 && saved.turn === 20 && saved.outcome === 'complete'
    const completedOldRegional = saved.version === 7 && saved.era === 4 && saved.turn === 23 && saved.outcome === 'complete'
    return {
      ...saved,
      version: 9,
      outcome: completedOldRepublic ? null : completedOldActThree ? 'act-three-complete' : completedOldActFour ? 'act-four-complete' : completedOldRegional ? 'regional-complete' : saved.outcome,
      resources: withoutLegacyLabor(saved.resources),
      population,
      workforceAllocation,
      projects: saved.projects ?? [],
      nextWorksBonus: saved.nextWorksBonus ?? 0,
      republicTransition: saved.republicTransition ?? false,
      reconstructionTransition: completedOldActThree ? true : saved.reconstructionTransition ?? false,
      regionalTransition: completedOldActFour ? true : saved.regionalTransition ?? false,
      italianTransition: completedOldRegional ? true : saved.italianTransition ?? false,
      republic: saved.republic ?? (saved.era >= 2 ? createRepublicState() : null),
      war: saved.war ?? (saved.era >= 2 ? createWarState() : null),
      reconstruction: saved.reconstruction ?? (saved.era >= 3 ? createReconstructionState() : null),
      regional: saved.regional ?? (saved.era >= 4 ? createRegionalState(saved.flags?.latinSettlement) : null),
      italian: saved.italian ?? (saved.era >= 5 ? createItalianState(saved.regional, saved.flags?.caudineResponse) : null),
      mediterranean: saved.mediterranean ?? (saved.era >= 6 ? createMediterraneanState() : null),
      mediterraneanTransition: saved.mediterraneanTransition ?? false,
      coreJudgment: saved.coreJudgment ?? null,
      actionsMax: Math.max(saved.actionsUsed ?? 0, migratedWorksCapacity(population, workforceAllocation, saved.nextWorksBonus ?? 0, saved.republic, saved.flags?.magistrateMode)),
    }
  }
  const completedRoyalCampaign = saved.version === 4 && saved.turn === 10 && saved.outcome
  return {
    ...saved,
    version: 9,
    resources: withoutLegacyLabor(saved.resources),
    selectedBuildingId: saved.selectedBuildingId ?? null,
    actionsUsed: saved.actionsUsed ?? 0,
    actionsMax: Math.max(saved.actionsUsed ?? 0, migratedWorksCapacity(population, workforceAllocation)),
    actionLog: saved.actionLog ?? [],
    population,
    workforceAllocation,
    projects: saved.projects ?? [],
    nextWorksBonus: saved.nextWorksBonus ?? 0,
    republicTransition: Boolean(completedRoyalCampaign),
    reconstructionTransition: false,
    regionalTransition: false,
    italianTransition: false,
    mediterraneanTransition: false,
    republic: null,
    war: null,
    reconstruction: null,
    regional: null,
    italian: null,
    mediterranean: null,
    coreJudgment: null,
    outcome: completedRoyalCampaign ? 'acts-complete' : saved.outcome ?? null,
    buildings: saved.version === 4
      ? (saved.buildings ?? [])
      : (saved.buildings ?? []).map((building) => ({
          ...building,
          condition: 100,
          appliedEffects: null,
        })),
  }
}

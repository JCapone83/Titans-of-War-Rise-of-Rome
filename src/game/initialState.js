import { DISTRICTS, FACTIONS, REGIONAL_COMMUNITIES, RELATIONSHIP_TYPES, getCouncil } from './data.js'

export const createInitialPopulation = () => ({
  total: 1030,
  households: 206,
  dependents: 412,
  workers: 433,
  levyEligible: 144,
  craftsmen: 41,
  districts: Object.fromEntries(DISTRICTS.map((district) => [district.id, district.startingPopulation ?? 0])),
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

const withCurrentDistricts = (population = createInitialPopulation()) => ({
  ...population,
  districts: Object.fromEntries(DISTRICTS.map((district) => [
    district.id,
    population.districts?.[district.id] ?? 0,
  ])),
})

const migratedWorksCapacity = (population, allocation, bonus = 0, republic = null, magistrateMode = null) => {
  const eligible = (population?.workers ?? 433) + (population?.craftsmen ?? 41) + (population?.levyEligible ?? 144)
  const works = Math.round(eligible * allocation.works / 100)
  const base = Math.max(1, Math.min(4, 1 + Math.floor(works / 130) + bonus))
  if (!republic) return base
  if (magistrateMode === 'emergency') return base
  if (magistrateMode === 'senate') return Math.min(republic.senateStanding >= 50 ? 3 : 2, base)
  return Math.min(2, base)
}

export const createMediterraneanProjects = () => ({
  appianApproach: { id: 'appianApproach', progress: 0, requiredSeasons: 2, completed: false, lastWorkedTurn: null },
  tiberEmporium: { id: 'tiberEmporium', progress: 0, requiredSeasons: 3, completed: false, lastWorkedTurn: null },
  republicanHorrea: { id: 'republicanHorrea', progress: 0, requiredSeasons: 3, completed: false, lastWorkedTurn: null },
  republicanCircus: { id: 'republicanCircus', progress: 0, requiredSeasons: 3, completed: false, lastWorkedTurn: null },
})

export const createMediterraneanState = () => ({
  fleetCapacity: 0,
  maritimeLosses: 0,
  warCredit: 0,
  contractorExposure: 0,
  provincialTrust: 50,
  importedGrainShare: 0,
  alliedExhaustion: 0,
  overseasCommandDuration: 0,
  emergencyReserve: 50,
  veteranSettlementPressure: 0,
  projects: createMediterraneanProjects(),
})

export const createMetropolitanProjects = () => ({
  republicanBasilica: { id: 'republicanBasilica', progress: 0, requiredSeasons: 4, completed: false, lastWorkedTurn: null },
  regulatedMacellum: { id: 'regulatedMacellum', progress: 0, requiredSeasons: 3, completed: false, lastWorkedTurn: null },
  aquaMarcia: { id: 'aquaMarcia', progress: 0, requiredSeasons: 4, completed: false, lastWorkedTurn: null },
  civicPorticoes: { id: 'civicPorticoes', progress: 0, requiredSeasons: 3, completed: false, lastWorkedTurn: null },
})

export const createMetropolitanState = () => ({
  urbanMigration: 18,
  rentPressure: 20,
  legalCaseLoad: 24,
  patronageConcentration: 22,
  contractingCapacity: 32,
  corruptionExposure: 18,
  enslavedLaborInflow: 8,
  freedHouseholdIntegration: 12,
  citizenAbsence: 16,
  provincialPetitionBacklog: 14,
  importedGrainDependence: 18,
  publicProvision: 42,
  projects: createMetropolitanProjects(),
})

export const createRepublicStrainProjects = () => ({
  landCensusRegistry: { id: 'landCensusRegistry', progress: 0, requiredSeasons: 3, completed: false, lastWorkedTurn: null },
  citizenshipRegisters: { id: 'citizenshipRegisters', progress: 0, requiredSeasons: 3, completed: false, lastWorkedTurn: null },
  forumCourts: { id: 'forumCourts', progress: 0, requiredSeasons: 3, completed: false, lastWorkedTurn: null },
  tabularium: { id: 'tabularium', progress: 0, requiredSeasons: 2, completed: false, lastWorkedTurn: null },
  watchStations: { id: 'watchStations', progress: 0, requiredSeasons: 3, completed: false, lastWorkedTurn: null },
})

export const createRepublicStrainState = () => ({
  citizenshipIntegration: 24,
  italianClaimsPressure: 52,
  commanderPersonalLoyalty: 24,
  senateCommandControl: 48,
  emergencyPowersPrecedent: 20,
  landTitleDisputes: 42,
  streetViolence: 18,
  courtCapacity: 40,
  archiveIntegrity: 50,
  demobilizationCapacity: 32,
  popularConsentChannels: 44,
  urbanFireResponse: 24,
  projects: createRepublicStrainProjects(),
})

export const createCivilSettlementProjects = () => ({
  caesarianForum: { id: 'caesarianForum', progress: 0, requiredSeasons: 3, completed: false, lastWorkedTurn: null },
  curiaJulia: { id: 'curiaJulia', progress: 0, requiredSeasons: 3, completed: false, lastWorkedTurn: null },
  basilicaJulia: { id: 'basilicaJulia', progress: 0, requiredSeasons: 4, completed: false, lastWorkedTurn: null },
  veteranLandRoadRegistry: { id: 'veteranLandRoadRegistry', progress: 0, requiredSeasons: 3, completed: false, lastWorkedTurn: null },
})

export const createCivilSettlementState = () => ({
  unifiedCommand: 28,
  senateOperatingCapacity: 44,
  magistrateContinuity: 42,
  armyDemobilization: 30,
  veteranSettlementPressure: 48,
  warFinanceBurden: 24,
  confiscationPressure: 12,
  italianLandSecurity: 46,
  provincialCommandSettlement: 30,
  courtContinuity: 42,
  archiveContinuity: 48,
  publicProvision: 44,
  successionClarity: 18,
  emergencyAuthority: 28,
  civicOperatingCapacity: 40,
  urbanDisplacement: 12,
  personalMonumentalCredit: 10,
  projects: createCivilSettlementProjects(),
})

export const createAugustanProjects = () => ({
  palatineOfficialPrecinct: { id: 'palatineOfficialPrecinct', progress: 0, requiredSeasons: 3, completed: false, lastWorkedTurn: null },
  mausoleumAugustus: { id: 'mausoleumAugustus', progress: 0, requiredSeasons: 4, completed: false, lastWorkedTurn: null },
  agrippanPantheon: { id: 'agrippanPantheon', progress: 0, requiredSeasons: 4, completed: false, lastWorkedTurn: null },
  bathsAgrippa: { id: 'bathsAgrippa', progress: 0, requiredSeasons: 4, completed: false, lastWorkedTurn: null },
  theatreMarcellus: { id: 'theatreMarcellus', progress: 0, requiredSeasons: 4, completed: false, lastWorkedTurn: null },
  araPacis: { id: 'araPacis', progress: 0, requiredSeasons: 3, completed: false, lastWorkedTurn: null },
  forumAugustus: { id: 'forumAugustus', progress: 0, requiredSeasons: 5, completed: false, lastWorkedTurn: null },
  vigilesWardNetwork: { id: 'vigilesWardNetwork', progress: 0, requiredSeasons: 3, completed: false, lastWorkedTurn: null },
})

export const createAugustanState = (settlement = {}) => ({
  princepsAuthority: Math.max(35, settlement.unifiedCommand ?? 48),
  senateMagistrateCapacity: Math.max(35, Math.round(((settlement.senateOperatingCapacity ?? 50) + (settlement.magistrateContinuity ?? 48)) / 2)),
  householdStanding: Math.max(32, settlement.personalMonumentalCredit ?? 38),
  successionConfidence: Math.max(22, settlement.successionClarity ?? 28),
  urbanAdministration: Math.max(38, settlement.civicOperatingCapacity ?? 45),
  fireCoverage: 26,
  annonaReliability: Math.max(38, settlement.publicProvision ?? 46),
  monumentMemory: Math.max(25, settlement.personalMonumentalCredit ?? 32),
  patronageConcentration: Math.max(20, Math.round(((settlement.personalMonumentalCredit ?? 30) + (settlement.emergencyAuthority ?? 28)) / 2)),
  provincialCommandBalance: Math.max(34, settlement.provincialCommandSettlement ?? 42),
  publicAccess: Math.max(38, settlement.publicProvision ?? 46),
  maintenanceCapacity: Math.max(36, settlement.archiveContinuity ?? 44),
  projects: createAugustanProjects(),
})

export const createImperialCapitalProjects = () => ({
  castraPraetoria: { id: 'castraPraetoria', progress: 0, requiredSeasons: 3, completed: false, lastWorkedTurn: null },
  aquaClaudia: { id: 'aquaClaudia', progress: 0, requiredSeasons: 4, completed: false, lastWorkedTurn: null },
  claudianPortus: { id: 'claudianPortus', progress: 0, requiredSeasons: 4, completed: false, lastWorkedTurn: null },
  domusAurea: { id: 'domusAurea', progress: 0, requiredSeasons: 3, completed: false, lastWorkedTurn: null },
  flavianAmphitheatre: { id: 'flavianAmphitheatre', progress: 0, requiredSeasons: 4, completed: false, lastWorkedTurn: null },
  templePeace: { id: 'templePeace', progress: 0, requiredSeasons: 3, completed: false, lastWorkedTurn: null },
  archTitus: { id: 'archTitus', progress: 0, requiredSeasons: 2, completed: false, lastWorkedTurn: null },
  domitianicPalace: { id: 'domitianicPalace', progress: 0, requiredSeasons: 4, completed: false, lastWorkedTurn: null },
})

export const createImperialCapitalState = (augustan = {}) => ({
  imperialAuthority: Math.max(38, augustan?.princepsAuthority ?? 50),
  senateCompact: Math.max(34, augustan?.senateMagistrateCapacity ?? 48),
  guardInfluence: 24,
  armyRecognition: Math.max(38, augustan?.provincialCommandBalance ?? 46),
  successionConfidence: Math.max(30, augustan?.successionConfidence ?? 40),
  publicProvision: Math.max(38, Math.round(((augustan?.annonaReliability ?? 46) + (augustan?.publicAccess ?? 46)) / 2)),
  fireResilience: Math.max(28, augustan?.fireCoverage ?? 35),
  harborSupply: Math.max(32, augustan?.annonaReliability ?? 42),
  palaceConcentration: Math.max(22, augustan?.patronageConcentration ?? 30),
  provincialTrust: Math.max(35, augustan?.provincialCommandBalance ?? 44),
  maintenanceCapacity: Math.max(36, augustan?.maintenanceCapacity ?? 44),
  publicAccess: Math.max(36, augustan?.publicAccess ?? 45),
  projects: createImperialCapitalProjects(),
})

export const createTrajanicCapitalProjects = () => ({
  forumTrajan: { id: 'forumTrajan', progress: 0, requiredSeasons: 5, completed: false, lastWorkedTurn: null },
  trajanAdministrativeComplex: { id: 'trajanAdministrativeComplex', progress: 0, requiredSeasons: 4, completed: false, lastWorkedTurn: null },
  bathsTrajan: { id: 'bathsTrajan', progress: 0, requiredSeasons: 4, completed: false, lastWorkedTurn: null },
  aquaTraiana: { id: 'aquaTraiana', progress: 0, requiredSeasons: 4, completed: false, lastWorkedTurn: null },
  trajanicPortus: { id: 'trajanicPortus', progress: 0, requiredSeasons: 5, completed: false, lastWorkedTurn: null },
  trajanicCircus: { id: 'trajanicCircus', progress: 0, requiredSeasons: 3, completed: false, lastWorkedTurn: null },
})

export const createTrajanicCapitalState = (imperial = {}) => ({
  successionSettlement: Math.max(35, imperial?.successionConfidence ?? 48),
  frontierCommand: Math.max(38, imperial?.armyRecognition ?? 50),
  conquestDependence: 18,
  treasuryResilience: Math.max(35, imperial?.imperialAuthority ?? 48),
  publicProvision: Math.max(38, imperial?.publicProvision ?? 50),
  provincialTrust: Math.max(35, imperial?.provincialTrust ?? 45),
  administrativeCapacity: Math.max(38, imperial?.senateCompact ?? 48),
  capitalSupply: Math.max(35, imperial?.harborSupply ?? 45),
  maintenanceCapacity: Math.max(36, imperial?.maintenanceCapacity ?? 45),
  maintenanceDebt: 0,
  constitutionalContinuity: Math.max(35, imperial?.senateCompact ?? 48),
  projects: createTrajanicCapitalProjects(),
})

export const createInitialState = () => ({
  version: 16,
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
  hannibalicTransition: false,
  metropolitanTransition: false,
  strainTransition: false,
  settlementTransition: false,
  augustanTransition: false,
  imperialCapitalTransition: false,
  trajanicCapitalTransition: false,
  republic: null,
  war: null,
  reconstruction: null,
  regional: null,
  italian: null,
  mediterranean: null,
  metropolitan: null,
  republicStrain: null,
  civilSettlement: null,
  augustanCity: null,
  imperialCapital: null,
  trajanicCapital: null,
  coreJudgment: null,
  chronologyBridges: [],
  outcome: null,
  consultedNotes: [],
  walkthroughSeen: false,
})

export function migrateState(saved) {
  if (!saved || saved.turn < 1 || saved.turn > 76) return null
  if (![1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].includes(saved.version)) return null
  const population = withCurrentDistricts(saved.population)
  const workforceAllocation = saved.workforceAllocation ?? createInitialWorkforceAllocation()
  if ([5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].includes(saved.version)) {
    const completedOldRepublic = saved.era >= 2 && saved.turn === 13 && saved.outcome === 'complete'
    const completedOldActThree = saved.era === 2 && saved.turn === 16 && saved.outcome === 'complete'
    const completedOldActFour = saved.era === 3 && saved.turn === 20 && saved.outcome === 'complete'
    const completedOldRegional = saved.version === 7 && saved.era === 4 && saved.turn === 23 && saved.outcome === 'complete'
    const completedMediterraneanOpening = saved.version === 9 && saved.turn === 32 && saved.outcome === 'mediterranean-complete'
    return {
      ...saved,
      version: 16,
      outcome: completedOldRepublic ? null : completedOldActThree ? 'act-three-complete' : completedOldActFour ? 'act-four-complete' : completedOldRegional ? 'regional-complete' : completedMediterraneanOpening ? 'mediterranean-opening-complete' : saved.outcome,
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
      mediterranean: saved.era >= 6 ? { ...createMediterraneanState(), ...(saved.mediterranean ?? {}), projects: { ...createMediterraneanProjects(), ...(saved.mediterranean?.projects ?? {}) } } : null,
      mediterraneanTransition: saved.mediterraneanTransition ?? false,
      hannibalicTransition: completedMediterraneanOpening ? true : saved.hannibalicTransition ?? false,
      metropolitanTransition: saved.metropolitanTransition ?? false,
      strainTransition: saved.strainTransition ?? false,
      settlementTransition: saved.settlementTransition ?? false,
      augustanTransition: saved.augustanTransition ?? false,
      imperialCapitalTransition: saved.imperialCapitalTransition ?? false,
      trajanicCapitalTransition: saved.trajanicCapitalTransition ?? false,
      coreJudgment: saved.coreJudgment ?? null,
      chronologyBridges: saved.chronologyBridges ?? [],
      metropolitan: saved.era >= 7 ? { ...createMetropolitanState(), ...(saved.metropolitan ?? {}), projects: { ...createMetropolitanProjects(), ...(saved.metropolitan?.projects ?? {}) } } : null,
      republicStrain: saved.era >= 8 ? { ...createRepublicStrainState(), ...(saved.republicStrain ?? {}), projects: { ...createRepublicStrainProjects(), ...(saved.republicStrain?.projects ?? {}) } } : null,
      civilSettlement: saved.era >= 9 ? { ...createCivilSettlementState(), ...(saved.civilSettlement ?? {}), projects: { ...createCivilSettlementProjects(), ...(saved.civilSettlement?.projects ?? {}) } } : null,
      augustanCity: saved.era >= 10 ? { ...createAugustanState(saved.civilSettlement ?? {}), ...(saved.augustanCity ?? {}), projects: { ...createAugustanProjects(), ...(saved.augustanCity?.projects ?? {}) } } : null,
      imperialCapital: saved.era >= 11 ? { ...createImperialCapitalState(saved.augustanCity ?? {}), ...(saved.imperialCapital ?? {}), projects: { ...createImperialCapitalProjects(), ...(saved.imperialCapital?.projects ?? {}) } } : null,
      trajanicCapital: saved.era >= 12 ? { ...createTrajanicCapitalState(saved.imperialCapital ?? {}), ...(saved.trajanicCapital ?? {}), projects: { ...createTrajanicCapitalProjects(), ...(saved.trajanicCapital?.projects ?? {}) } } : null,
      actionsMax: Math.max(saved.actionsUsed ?? 0, migratedWorksCapacity(population, workforceAllocation, saved.nextWorksBonus ?? 0, saved.republic, saved.flags?.magistrateMode)),
    }
  }
  const completedRoyalCampaign = saved.version === 4 && saved.turn === 10 && saved.outcome
  return {
    ...saved,
    version: 16,
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
    hannibalicTransition: false,
    metropolitanTransition: false,
    strainTransition: false,
    settlementTransition: false,
    augustanTransition: false,
    imperialCapitalTransition: false,
    trajanicCapitalTransition: false,
    republic: null,
    war: null,
    reconstruction: null,
    republicStrain: null,
    civilSettlement: null,
    augustanCity: null,
    imperialCapital: null,
    trajanicCapital: null,
    regional: null,
    italian: null,
    mediterranean: null,
    metropolitan: null,
    coreJudgment: null,
    chronologyBridges: [],
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

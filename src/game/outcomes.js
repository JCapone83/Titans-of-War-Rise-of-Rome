import { augustanCapitalSystems, countFamily, hasBuilding, imperialCapitalSystems, regionalForecast, trajanicCapitalSystems } from './simulation.js'

const grade = (score) => score >= 90 ? 'A' : score >= 80 ? 'B' : score >= 70 ? 'C' : score >= 60 ? 'D' : 'F'

export function calculateRegionalScore(state) {
  const forecast = regionalForecast(state)
  if (!forecast) return null
  const completed = state.regional.roads.length
  const colonies = state.regional.colonies.length
  const revised = Object.values(state.regional.communities).filter((community) => community.compactRevised).length
  const balance = Math.max(0, 100 - Math.abs(forecast.contribution - 72) - Math.abs(forecast.autonomy - 58) - Math.max(0, forecast.revoltRisk - 28) * 1.5)
  const capacity = Math.max(0, 100 - forecast.overextension * 1.4)
  const infrastructure = Math.min(100, 52 + completed * 16 + colonies * 10 + revised * 5 - state.regional.roadProjects.length * 5)
  const score = Math.round(balance * 0.35 + capacity * 0.3 + infrastructure * 0.2 + Math.min(100, forecast.tradeAccess) * 0.15)
  return { score: Math.max(0, Math.min(100, score)), grade: grade(score), balance: Math.round(balance), capacity: Math.round(capacity), infrastructure: Math.round(infrastructure), forecast }
}

export function calculateItalianScore(state) {
  if (!state.italian) return null
  const projects = Object.values(state.italian.projects ?? {})
  const completed = projects.filter((project) => project.completed).length
  const infrastructure = Math.min(100, 42 + completed * 24 + Math.round(state.italian.waterCapacity * 0.3) - state.italian.maintenanceDebt * 0.2)
  const endurance = (state.italian.campaignPersistence + state.italian.reserveDepth) / 2
  const compact = state.italian.allianceDepth
  const pressure = Math.max(0, 100 - state.italian.samnitePressure * 0.35 - state.italian.coalitionRisk * 0.35 - state.italian.pyrrhicPressure * 0.3)
  const stewardship = Math.max(0, 100 - state.italian.maintenanceDebt + Math.min(18, state.italian.waterCapacity * 0.3))
  const score = Math.round(endurance * 0.27 + compact * 0.23 + pressure * 0.22 + infrastructure * 0.18 + stewardship * 0.1)
  const bounded = Math.max(0, Math.min(100, score))
  return { score: bounded, grade: grade(bounded), endurance: Math.round(endurance), compact: Math.round(compact), pressure: Math.round(pressure), infrastructure: Math.round(infrastructure), stewardship: Math.round(stewardship) }
}

export function calculatePublicWorksScore(state) {
  if (!state.mediterranean) return null
  const projects = Object.values(state.mediterranean.projects ?? {})
  const completed = projects.filter((project) => project.completed).length
  const active = projects.filter((project) => !project.completed && project.progress > 0).length
  const burden = Object.values(state.mediterranean.publicWorksBurden ?? {}).reduce((sum, value) => sum + Math.abs(value), 0)
  const score = Math.max(0, Math.min(100, Math.round(45 + completed * 12 + active * 3 - burden * 0.5)))
  return { score, grade: grade(score), completed, active, burden }
}

export function calculateMediterraneanScore(state) {
  if (!state.mediterranean) return null
  const m = state.mediterranean
  const maritime = Math.max(0, Math.min(100, 50 + m.fleetCapacity * 0.7 - m.maritimeLosses * 0.55))
  const finance = Math.max(0, Math.min(100, 58 + m.warCredit * 0.45 - m.contractorExposure * 0.5 - Math.max(0, m.overseasCommandDuration - 20) * 0.4))
  const compact = Math.max(0, Math.min(100, (m.provincialTrust + (100 - m.alliedExhaustion) + m.emergencyReserve) / 3))
  const settlement = Math.max(0, Math.min(100, ((100 - m.veteranSettlementPressure) + m.provincialTrust + Math.min(100, 45 + m.importedGrainShare)) / 3))
  const score = Math.round(maritime * 0.18 + finance * 0.2 + compact * 0.36 + settlement * 0.26)
  const bounded = Math.max(0, Math.min(100, score))
  return { score: bounded, grade: grade(bounded), maritime: Math.round(maritime), finance: Math.round(finance), compact: Math.round(compact), settlement: Math.round(settlement) }
}

export function calculateMetropolitanScore(state) {
  if (!state.metropolitan) return null
  const m = state.metropolitan
  const projects = Object.values(m.projects ?? {})
  const completed = projects.filter((project) => project.completed).length
  const active = projects.filter((project) => !project.completed && project.progress > 0).length
  const capacity = Math.max(0, Math.min(100, m.publicProvision * 0.45 + m.contractingCapacity * 0.3 + (100 - m.provincialPetitionBacklog) * 0.25))
  const boundedPower = Math.max(0, Math.min(100, 100 - (m.patronageConcentration + m.corruptionExposure + m.legalCaseLoad) / 3))
  const household = Math.max(0, Math.min(100, ((100 - m.rentPressure) + (100 - m.citizenAbsence) + (100 - m.importedGrainDependence)) / 3))
  const statusLegibility = Math.max(0, Math.min(100, 55 + m.freedHouseholdIntegration * 0.45 - m.enslavedLaborInflow * 0.2))
  const physical = Math.max(0, Math.min(100, 48 + completed * 13 + active * 4))
  const score = Math.round(capacity * 0.25 + boundedPower * 0.25 + household * 0.2 + statusLegibility * 0.1 + physical * 0.2)
  const bounded = Math.max(0, Math.min(100, score))
  return { score: bounded, grade: grade(bounded), capacity: Math.round(capacity), boundedPower: Math.round(boundedPower), household: Math.round(household), statusLegibility: Math.round(statusLegibility), physical: Math.round(physical), completed, active }
}

export function calculateRepublicStrainScore(state) {
  if (!state.republicStrain) return null
  const s = state.republicStrain
  const projects = Object.values(s.projects ?? {})
  const completed = projects.filter((project) => project.completed).length
  const active = projects.filter((project) => !project.completed && project.progress > 0).length
  const civicChannels = Math.max(0, Math.min(100, (s.courtCapacity + s.archiveIntegrity + s.popularConsentChannels) / 3))
  const commandLimits = Math.max(0, Math.min(100, (s.senateCommandControl + s.demobilizationCapacity + (100 - s.commanderPersonalLoyalty) + (100 - s.emergencyPowersPrecedent)) / 4))
  const italianSettlement = Math.max(0, Math.min(100, (s.citizenshipIntegration + (100 - s.italianClaimsPressure)) / 2))
  const civilOrder = Math.max(0, Math.min(100, ((100 - s.landTitleDisputes) + (100 - s.streetViolence) + s.urbanFireResponse) / 3))
  const physical = Math.max(0, Math.min(100, 45 + completed * 11 + active * 4))
  const score = Math.round(civicChannels * 0.23 + commandLimits * 0.27 + italianSettlement * 0.2 + civilOrder * 0.15 + physical * 0.15)
  const bounded = Math.max(0, Math.min(100, score))
  return { score: bounded, grade: grade(bounded), civicChannels: Math.round(civicChannels), commandLimits: Math.round(commandLimits), italianSettlement: Math.round(italianSettlement), civilOrder: Math.round(civilOrder), physical: Math.round(physical), completed, active }
}

export function calculateCivilSettlementScore(state) {
  if (!state.civilSettlement) return null
  const s = state.civilSettlement
  const projects = Object.values(s.projects ?? {})
  const completed = projects.filter((project) => project.completed).length
  const active = projects.filter((project) => !project.completed && project.progress > 0).length
  const institutions = Math.max(0, Math.min(100, (s.senateOperatingCapacity + s.magistrateContinuity + s.courtContinuity + s.archiveContinuity) / 4))
  const demobilization = Math.max(0, Math.min(100, (s.armyDemobilization + s.italianLandSecurity + (100 - s.veteranSettlementPressure) + (100 - s.confiscationPressure)) / 4))
  const commandSettlement = Math.max(0, Math.min(100, (Math.max(s.unifiedCommand, s.senateOperatingCapacity) + s.provincialCommandSettlement + s.armyDemobilization) / 3))
  const civicLife = Math.max(0, Math.min(100, (s.publicProvision + s.civicOperatingCapacity + (100 - s.urbanDisplacement) + (100 - s.warFinanceBurden)) / 4))
  const succession = Math.max(0, Math.min(100, s.successionClarity * 0.7 + (100 - s.emergencyAuthority) * 0.3))
  const physical = Math.max(0, Math.min(100, 56 + completed * 12 + active * 4))
  const score = Math.round(institutions * 0.21 + demobilization * 0.22 + commandSettlement * 0.19 + civicLife * 0.16 + succession * 0.12 + physical * 0.1)
  const bounded = Math.max(0, Math.min(100, score))
  const commandGap = Math.max(0, s.unifiedCommand + s.emergencyAuthority - s.senateOperatingCapacity - s.magistrateContinuity)
  const settlementGap = Math.max(0, s.veteranSettlementPressure + s.confiscationPressure + s.warFinanceBurden - s.armyDemobilization - s.italianLandSecurity)
  let operatingForm = 'Unstable Succession of Emergency Commands'
  if (settlementGap >= 70 || (commandGap >= 55 && s.successionClarity < 25)) operatingForm = 'Fragmented Settlement'
  else if (state.flags?.constitutionalSettlement === 'republican-restoration' && institutions >= 55) operatingForm = 'Negotiated Republican Restoration'
  else if (state.flags?.constitutionalSettlement === 'augustan-principate' && commandSettlement >= 50) operatingForm = 'Augustan-Style Principate'
  else if (state.flags?.constitutionalSettlement === 'military-oligarchy') operatingForm = 'Collegial Military Oligarchy'
  return { score: bounded, grade: grade(bounded), institutions: Math.round(institutions), demobilization: Math.round(demobilization), commandSettlement: Math.round(commandSettlement), civicLife: Math.round(civicLife), succession: Math.round(succession), physical: Math.round(physical), completed, active, commandGap, settlementGap, operatingForm }
}

export function calculateAugustanCityScore(state) {
  if (!state.augustanCity) return null
  const a = state.augustanCity
  const projects = Object.values(a.projects ?? {})
  const completed = projects.filter((project) => project.completed).length
  const active = projects.filter((project) => !project.completed && project.progress > 0).length
  const stages = projects.reduce((sum, project) => sum + (project.progress ?? 0), 0)
  const civicCapacity = Math.max(0, Math.min(100, (a.senateMagistrateCapacity + a.urbanAdministration + a.publicAccess + a.maintenanceCapacity) / 4))
  const commandBalance = Math.max(0, Math.min(100, 70 + a.provincialCommandBalance * 0.35 + a.princepsAuthority * 0.2 - Math.abs(a.princepsAuthority - a.senateMagistrateCapacity) * 0.35 - a.patronageConcentration * 0.18))
  const services = Math.max(0, Math.min(100, (a.fireCoverage + a.annonaReliability + a.urbanAdministration + a.maintenanceCapacity + a.publicAccess) / 5 + 15))
  const succession = Math.max(0, Math.min(100, a.successionConfidence * 0.72 + Math.min(a.householdStanding, a.senateMagistrateCapacity) * 0.28))
  const memory = Math.max(0, Math.min(100, a.monumentMemory * 0.58 + a.publicAccess * 0.27 + a.maintenanceCapacity * 0.15))
  const physical = Math.max(0, Math.min(100, 48 + stages * 3 + completed * 8 + active * 2))
  const score = Math.round(civicCapacity * 0.2 + commandBalance * 0.2 + services * 0.18 + succession * 0.2 + memory * 0.1 + physical * 0.12)
  const bounded = Math.max(0, Math.min(100, score))
  let operatingForm = 'Administrative Principate'
  if (state.flags?.augustanOperatingRule === 'civic-compact') operatingForm = 'Civic Augustan Compact'
  else if (state.flags?.augustanOperatingRule === 'household-principate') operatingForm = 'Household-Centered Principate'
  const strengths = [
    civicCapacity >= 55 ? 'Operating civic institutions' : null,
    services >= 55 ? 'Urban service capacity' : null,
    succession >= 55 ? 'Legible first succession' : null,
    commandBalance >= 55 ? 'Bounded command settlement' : null,
  ].filter(Boolean)
  const risks = [
    a.patronageConcentration >= 60 ? 'Patronage is crowding out public channels' : null,
    a.fireCoverage < 45 ? 'Fire coverage remains thin' : null,
    succession < 50 ? 'Succession depends too heavily on persons' : null,
    a.maintenanceCapacity < 45 ? 'Maintenance trails the monumental program' : null,
  ].filter(Boolean)
  return { score: bounded, grade: grade(bounded), operatingForm, civicCapacity: Math.round(civicCapacity), commandBalance: Math.round(commandBalance), services: Math.round(services), succession: Math.round(succession), memory: Math.round(memory), physical: Math.round(physical), completed, active, stages, strengths, risks }
}

export function calculateImperialCapitalScore(state) {
  if (!state.imperialCapital) return null
  const i = state.imperialCapital
  const projects = Object.values(i.projects ?? {})
  const completed = projects.filter((project) => project.completed).length
  const active = projects.filter((project) => !project.completed && project.progress > 0).length
  const stages = projects.reduce((sum, project) => sum + (project.progress ?? 0), 0)
  const transfer = Math.max(0, Math.min(100, i.successionConfidence * 0.35 + i.armyRecognition * 0.25 + i.senateCompact * 0.25 + (100 - i.guardInfluence) * 0.15))
  const provision = Math.max(0, Math.min(100, i.publicProvision * 0.35 + i.harborSupply * 0.3 + i.maintenanceCapacity * 0.2 + i.provincialTrust * 0.15))
  const safety = Math.max(0, Math.min(100, i.fireResilience * 0.45 + i.publicProvision * 0.2 + i.maintenanceCapacity * 0.2 + i.publicAccess * 0.15))
  const publicCity = Math.max(0, Math.min(100, i.publicAccess * 0.35 + i.senateCompact * 0.25 + (100 - i.palaceConcentration) * 0.25 + i.publicProvision * 0.15))
  const provincial = Math.max(0, Math.min(100, i.provincialTrust * 0.55 + i.armyRecognition * 0.2 + i.senateCompact * 0.15 + i.maintenanceCapacity * 0.1))
  const physical = Math.max(0, Math.min(100, 42 + stages * 2.4 + completed * 7 + active * 2))
  const score = Math.round(transfer * 0.22 + provision * 0.2 + safety * 0.17 + publicCity * 0.18 + provincial * 0.11 + physical * 0.12)
  let operatingForm = 'Imperial Capital in Balance'
  if (i.projects?.aquaClaudia?.completed && (i.projects?.claudianPortus?.progress ?? 0) >= 2) operatingForm = 'Provision-First Capital'
  else if (i.publicAccess >= 60 && i.palaceConcentration < 55) operatingForm = 'Public Flavian Capital'
  else if (i.palaceConcentration >= 65) operatingForm = 'Palace-Administrative Capital'
  else if (i.guardInfluence >= 60 || i.armyRecognition >= 75) operatingForm = 'Military-Recognized Principate'
  const strengths = [transfer >= 60 ? 'Legible authority transfer' : null, provision >= 60 ? 'Capital provision' : null, safety >= 60 ? 'Urban fire and service resilience' : null, publicCity >= 60 ? 'Public city preserved beside the palace' : null].filter(Boolean)
  const risks = [i.guardInfluence >= 55 ? 'Guard brokerage shapes succession' : null, i.palaceConcentration >= 60 ? 'Palace land and access crowd the public city' : null, i.maintenanceCapacity < 45 ? 'Maintenance trails the monumental program' : null, i.provincialTrust < 45 ? 'Provincial trust is carrying extraction pressure' : null].filter(Boolean)
  return { score, grade: grade(score), operatingForm, transfer: Math.round(transfer), provision: Math.round(provision), safety: Math.round(safety), publicCity: Math.round(publicCity), provincial: Math.round(provincial), physical: Math.round(physical), completed, active, stages, strengths, risks }
}

export function calculateTrajanicCapitalScore(state) {
  if (!state.trajanicCapital) return null
  const t = state.trajanicCapital
  const projects = Object.values(t.projects ?? {})
  const completed = projects.filter((project) => project.completed).length
  const active = projects.filter((project) => !project.completed && project.progress > 0).length
  const stages = projects.reduce((sum, project) => sum + (project.progress ?? 0), 0)
  const bounded = (value) => Math.max(0, Math.min(100, value))
  const succession = bounded(t.successionSettlement * 0.45 + t.constitutionalContinuity * 0.55)
  const frontier = bounded(t.frontierCommand * 0.45 + t.provincialTrust * 0.55)
  const treasury = bounded(t.treasuryResilience * 0.5 + (100 - t.conquestDependence) * 0.3 + (100 - t.maintenanceDebt) * 0.2)
  const provision = bounded(t.capitalSupply * 0.45 + t.publicProvision * 0.35 + t.maintenanceCapacity * 0.2)
  const maintenance = bounded(t.maintenanceCapacity * 0.6 + (100 - t.maintenanceDebt) * 0.4)
  const physical = bounded(44 + stages * 2.5 + completed * 7 + active * 2)
  const administration = bounded(t.administrativeCapacity * 0.75 + physical * 0.25)
  const score = Math.round(succession * 0.2 + frontier * 0.16 + treasury * 0.18 + provision * 0.18 + maintenance * 0.16 + administration * 0.12)
  let operatingForm = 'Constitutional Trajanic Settlement'
  if (state.flags?.ad117Settlement === 'frontier-treasury') operatingForm = 'Frontier-Treasury Principate'
  else if (state.flags?.ad117Settlement === 'provincial-maintenance') operatingForm = 'Provincial Maintenance Compact'
  else if (state.flags?.quirinalProgram === 'integrated-precinct' && state.flags?.waterPortusProgram === 'joined-supply') operatingForm = 'Integrated Administrative Capital'
  else if (state.flags?.waterPortusProgram === 'water-first') operatingForm = 'Water-Resilient Capital'
  const strengths = [
    succession >= 60 ? 'Recorded succession and constitutional continuity' : null,
    frontier >= 60 ? 'Frontier command retains provincial trust' : null,
    treasury >= 60 ? 'Treasury can operate without continuous conquest' : null,
    provision >= 60 ? 'Capital supply and public provision remain connected' : null,
    maintenance >= 60 ? 'Maintenance capacity contains inherited debt' : null,
  ].filter(Boolean)
  const risks = [
    t.conquestDependence >= 55 ? 'Ordinary government depends too heavily on new conquest' : null,
    t.maintenanceDebt >= 45 ? 'Maintenance debt is overtaking new construction' : null,
    t.provincialTrust < 45 ? 'Provincial trust is carrying frontier extraction' : null,
    t.publicProvision < 45 || t.capitalSupply < 45 ? 'The monumental capital outruns supply and provision' : null,
    succession < 50 ? 'The AD 117 transfer remains personally rather than constitutionally secured' : null,
  ].filter(Boolean)
  return { score, grade: grade(score), operatingForm, succession: Math.round(succession), frontier: Math.round(frontier), treasury: Math.round(treasury), provision: Math.round(provision), maintenance: Math.round(maintenance), administration: Math.round(administration), physical: Math.round(physical), completed, active, stages, strengths, risks }
}

export function calculateOutcome(state) {
  const average = (keys) => keys.reduce((sum, key) => sum + state.metrics[key], 0) / keys.length
  const drainage = hasBuilding(state, 'cloaca-works') ? 12 : hasBuilding(state, 'drainage-ditch') ? 5 : -10
  const damagedWorks = state.buildings.filter((building) => (building.condition ?? 100) < 70).length
  const tierTwoWorks = state.buildings.filter((building) => building.tier === 2).length
  const unfinishedProjects = (state.projects ?? []).length
  const populationGrowth = Math.max(-8, Math.min(8, ((state.population?.total ?? 1030) - 1030) / 35))
  const reconstruction = state.reconstruction
  const recoveryBonus = reconstruction ? (100 - reconstruction.devastation) * 0.1 + (100 - reconstruction.fireExposure) * 0.04 : 0
  const urban = Math.round(average(['shelter', 'water', 'sanitation', 'trade']) + drainage + populationGrowth + Math.min(8, tierTwoWorks * 2) + recoveryBonus - damagedWorks * 4 - unfinishedProjects * 3 - Math.max(0, countFamily(state, 'housing') - countFamily(state, 'water') - countFamily(state, 'drainage')) * 4)
  const factionValues = Object.values(state.factions)
  const factionSpread = Math.max(...factionValues) - Math.min(...factionValues)
  const republic = state.republic
  const republicanConsent = republic ? (republic.senateStanding + republic.assemblyConsent) / 2 - republic.debtStrain * 0.2 : 0
  const civic = Math.round(average(['order', 'auspices']) + 8 - factionSpread * 0.35 + (republic ? (republicanConsent - 40) * 0.25 : 0) + (reconstruction ? (reconstruction.recordsIntegrity - 50) * 0.08 + (reconstruction.latinTrust - 50) * 0.06 : 0))
  const logistics = Math.round(average(['food', 'water', 'trade']) + Math.min(10, state.resources.grain + state.resources.treasury) / 2 - damagedWorks * 2 - (republic ? republic.debtStrain * 0.08 : 0) - (reconstruction ? reconstruction.displaced * 0.08 : 0))
  const military = Math.round(state.metrics.readiness + countFamily(state, 'defense') * 5 - Math.max(0, 45 - state.metrics.food) * 0.25 - (republic ? Math.max(0, republic.levyBurden - 35) * 0.15 : 0) - (reconstruction ? reconstruction.wallUrgency * 0.05 : 0))
  const expectedCouncils = state.turn >= 30 ? 24 + Math.min(41, state.turn - 29) : state.turn >= 29 ? 24 : state.turn >= 23 ? 18 : state.turn >= 20 ? 15 : state.turn >= 16 ? 11 : state.turn >= 13 ? 8 : 5
  const actThreeContinuity = state.turn >= 16 ? (state.flags?.veiiResolution ? 3 : -3) + (state.flags?.gallicPlan ? 3 : -3) : 0
  const actFourContinuity = state.turn >= 20 ? (state.flags?.reconstructionPolicy ? 4 : -4) + (state.flags?.latinSettlement ? 4 : -4) : 0
  const regionalContinuity = state.turn >= 23 ? (state.flags?.regionalDoctrine ? 3 : -3) + (state.flags?.regionalCharter ? 3 : -3) + (state.flags?.regionalSettlement ? 3 : -3) : 0
  const italianContinuity = state.turn >= 29 ? ['caudineResponse', 'appianPriority', 'samniteSettlement', 'sentinumPlan', 'pyrrhicPosture', 'pyrrhicEndgame', 'mediterraneanDoctrine'].reduce((sum, key) => sum + (state.flags?.[key] ? 1 : -1), 0) : 0
  const strainContinuity = state.turn >= 48 ? ['landGrainSettlement', 'italianSettlement', 'emergencyCommand', 'sullanSettlement', 'archiveSettlement', 'assemblySettlement', 'rubiconSettlement'].reduce((sum, key) => sum + (state.flags?.[key] ? 1 : -1), 0) : 0
  const continuity = Math.round(56 + (hasBuilding(state, 'cloaca-works') ? 10 : 0) + (hasBuilding(state, 'podium-temple') ? 10 : 0) + (state.choiceLog.length === expectedCouncils ? 8 : 0) + Math.min(8, tierTwoWorks * 2) - unfinishedProjects * 4 - Math.abs(state.buildings.length - 10) * 2 + (state.flags?.tribunesEstablished ? 4 : 0) + actThreeContinuity + actFourContinuity + regionalContinuity + italianContinuity + strainContinuity)
  const scores = {
    'Urban Design': Math.max(0, Math.min(100, urban)),
    'Civic Balance': Math.max(0, Math.min(100, civic)),
    Logistics: Math.max(0, Math.min(100, logistics)),
    'Military Readiness': Math.max(0, Math.min(100, military)),
    'Historical Continuity': Math.max(0, Math.min(100, continuity)),
  }
  const regionalScore = calculateRegionalScore(state)
  if (regionalScore) scores['Regional Compact'] = regionalScore.score
  const italianScore = calculateItalianScore(state)
  if (italianScore) scores['Italian System'] = italianScore.score
  if (state.mediterranean && state.turn >= 30) {
    const m = state.mediterranean
    if (state.turn <= 32) scores['Mediterranean Opening'] = Math.max(0, Math.min(100, Math.round(40 + m.fleetCapacity * 0.25 + m.warCredit * 0.2 + m.provincialTrust * 0.2 + m.importedGrainShare * 0.15 - m.maritimeLosses * 0.2 - m.contractorExposure * 0.15 - m.alliedExhaustion * 0.12)))
    else {
      scores['Mediterranean Republic'] = calculateMediterraneanScore(state).score
      scores['Physical Systems'] = calculatePublicWorksScore(state).score
    }
  }
  const metropolitanScore = calculateMetropolitanScore(state)
  if (metropolitanScore && state.turn >= 37) scores['Conquest and Metropolis'] = metropolitanScore.score
  const strainScore = calculateRepublicStrainScore(state)
  if (strainScore && state.turn >= 42) scores['Republic Under Strain'] = strainScore.score
  const civilSettlementScore = calculateCivilSettlementScore(state)
  if (civilSettlementScore && state.turn >= 49) scores['Civil War and Settlement'] = civilSettlementScore.score
  const augustanCityScore = calculateAugustanCityScore(state)
  if (augustanCityScore && state.turn >= 55) scores['The Augustan City'] = augustanCityScore.score
  const imperialCapitalScore = calculateImperialCapitalScore(state)
  if (imperialCapitalScore && state.turn >= 62) scores['Imperial Capital'] = imperialCapitalScore.score
  const trajanicCapitalScore = calculateTrajanicCapitalScore(state)
  if (trajanicCapitalScore && state.turn >= 71) scores['Trajanic Capital'] = trajanicCapitalScore.score
  const overall = Math.round(Object.values(scores).reduce((sum, value) => sum + value, 0) / Object.keys(scores).length)
  const operatingFormName = civilSettlementScore?.operatingForm.toLowerCase()
  const operatingFormArticle = operatingFormName?.startsWith('augustan') ? 'an' : 'a'
  let title = 'A City Still Becoming'
  if (state.turn >= 76) title = trajanicCapitalScore.operatingForm
  else if (state.turn >= 70) title = imperialCapitalScore.operatingForm
  else if (state.turn >= 61) title = augustanCityScore.operatingForm
  else if (state.turn >= 54) title = civilSettlementScore.operatingForm
  else if (state.turn >= 48) title = scores['Republic Under Strain'] >= 70 ? 'A Republic Still Capable of Settlement' : 'Command Outruns the Republic'
  else if (state.turn >= 41) title = scores['Conquest and Metropolis'] >= 70 ? 'A Metropolitan Republic With Working Limits' : 'Conquest Outruns the Republican City'
  else if (state.turn >= 36) title = scores['Mediterranean Republic'] >= 70 ? 'The Mediterranean Republic Endures' : 'Mediterranean Victory With Unpaid Obligations'
  else if (state.turn >= 32) title = 'The Mediterranean Opening'
  else if (state.turn >= 29 && overall >= 72) title = 'Rome Reaches the Mediterranean Threshold'
  else if (state.turn >= 23 && overall >= 72) title = 'The City Becomes a Regional Power'
  else if (overall >= 85) title = 'The Seven Hills Become Rome'
  else if (overall >= 72) title = 'A Durable City of Kings'
  else if (overall < 55) title = 'A Confederation Under Strain'
  const capitalLegacy = state.turn >= 61 && augustanCityScore ? {
    operatingForm: augustanCityScore.operatingForm,
    systems: augustanCapitalSystems(state),
    completed: augustanCityScore.completed,
    active: augustanCityScore.active,
  } : null
  const imperialCapitalLegacy = state.turn >= 70 && imperialCapitalScore ? {
    operatingForm: imperialCapitalScore.operatingForm,
    systems: imperialCapitalSystems(state),
    completed: imperialCapitalScore.completed,
    active: imperialCapitalScore.active,
  } : null
  const trajanicCapitalLegacy = state.turn >= 76 && trajanicCapitalScore ? {
    operatingForm: trajanicCapitalScore.operatingForm,
    systems: trajanicCapitalSystems(state),
    completed: trajanicCapitalScore.completed,
    active: trajanicCapitalScore.active,
  } : null
  return {
    title,
    overall,
    summary: overall >= 72
      ? state.turn >= 76 ? `Rome reaches AD 117 as a ${trajanicCapitalScore.operatingForm.toLowerCase()}. Frontier reach, provincial trust, treasury resilience, conquest dependence, capital provision, maintenance, administration, succession, and constitutional continuity are judged as separate operating obligations.` : state.turn >= 70 ? `Rome reaches AD 96 as a ${imperialCapitalScore.operatingForm.toLowerCase()}. The Colosseum and palace stand within separate judgments of succession, military recognition, public provision, fire resilience, maintenance, provincial trust, and access to the city.` : state.turn >= 61 ? `Rome reaches AD 14 as a ${augustanCityScore.operatingForm.toLowerCase()}. Authority, Senate and magistrates, public access, provincial command, maintenance, fire response, memory, and succession are judged as separate operating systems.` : state.turn >= 54 ? `Rome reaches 27 BC as ${operatingFormArticle} ${operatingFormName}, with constitutional language judged separately from command, demobilization, courts, finance, Italian titles, public provision, and succession.` : state.turn >= 48 ? 'Rome reaches 49 BC with citizenship, land titles, courts, archives, assemblies, demobilization, emergency precedent, and military loyalty judged separately. The campaign stops at the civil-war threshold rather than deciding Caesar\'s crossing or the constitutional settlement in advance.' : state.turn >= 41 ? 'Rome reaches 133 BC with conquest, migration, law, contracts, grain, service, patronage, legal status, and metropolitan works judged as connected but separate obligations. The campaign stops at the Gracchan threshold rather than resolving the next constitutional struggle in advance.' : state.turn >= 36 ? 'Rome reaches 201 BC after maritime war and invasion with its fleet, credit, Italian compact, emergency reserves, provincial obligations, grain supply, and veteran settlement judged separately.' : state.turn >= 32 ? 'Rome opens a Mediterranean command in 241 BC with bounded fleet capacity, maritime losses, war credit, contractor exposure, provincial trust, grain dependence, allied exhaustion, and overseas command duration visible in the ledger.' : state.turn >= 29 ? 'Rome reaches 264 BC with an Italian system measured by roads, water, allied depth, reserves, repeated armies, and the maintenance burdens that victory cannot erase.' : state.turn >= 23 ? 'Rome links city capacity to differentiated allies, roads, and obligations without allowing expansion to become costless.' : 'Rome enters its next age with institutions, works, and obligations strong enough to outlive a single ruler.'
      : state.turn >= 76 ? `Rome reaches AD 117, but the ${trajanicCapitalScore.operatingForm.toLowerCase()} leaves unresolved burdens in conquest finance, provincial trust, supply, maintenance, succession, or constitutional continuity.` : 'The settlement survives, but later generations inherit debts in water, trust, defense, or food that stone alone cannot solve.',
    grades: Object.fromEntries(Object.entries(scores).map(([key, value]) => [key, { score: value, grade: grade(value) }])),
    capitalLegacy,
    imperialCapitalLegacy,
    trajanicCapitalLegacy,
  }
}

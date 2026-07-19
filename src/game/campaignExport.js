import { TURN_YEARS } from './data.js'
import { calculateItalianScore, calculateOutcome, calculateRegionalScore } from './outcomes.js'
import { regionalForecast, workforceSummary } from './simulation.js'

export function campaignMarkdown(state) {
  const outcome = calculateOutcome(state)
  const choices = state.choiceLog.map((entry) => `- Turn ${entry.turn} (${TURN_YEARS[entry.turn - 1]} BC): **${entry.council}** - ${entry.option}`).join('\n')
  const buildings = state.buildings.map((building) => `- ${building.name}, ${building.districtId} (turn ${building.builtTurn})`).join('\n')
  const grades = Object.entries(outcome.grades).map(([name, value]) => `- ${name}: **${value.grade}** (${value.score})`).join('\n')
  const population = state.population
    ? `- Total population: **${state.population.total.toLocaleString()}**\n- Households: ${state.population.households}\n- Available workers: ${state.population.workers}\n- Levy eligible: ${state.population.levyEligible}\n- Craftsmen: ${state.population.craftsmen}`
    : '- Population record unavailable for this legacy campaign.'
  const workforce = workforceSummary(state)
  const projects = (state.projects ?? []).map((project) => `- ${project.name}, ${project.districtId}: ${project.progress}/${project.requiredSeasons} work seasons`).join('\n')
  const republic = state.republic
    ? `\n## Republican Institutions\n- Magistrate authority: ${state.republic.magistrateAuthority}\n- Senate standing and public credit: ${state.republic.senateStanding}\n- Assembly consent: ${state.republic.assemblyConsent}\n- Debt strain: ${state.republic.debtStrain}\n- Levy burden: ${state.republic.levyBurden}\n- Tribunes established: ${state.flags?.tribunesEstablished ? 'yes' : 'no'}\n`
    : ''
  const war = state.war
    ? `\n## War Commitments\n- Pressure maintained against Veii: ${state.war.veiiPressure}\n- Siege persistence: ${state.war.siegePersistence}\n- Soldier pay: ${state.flags?.soldierPayEstablished ? 'established' : 'not established'}\n- Veteran cohesion: ${state.war.veteranCohesion}\n- Land expectations: ${state.war.landExpectations}\n- Veii settlement: ${state.flags?.veiiResolution ?? 'unresolved'}\n- Gallic posture: ${state.flags?.gallicPlan ?? 'unresolved'}\n`
    : ''
  const reconstruction = state.reconstruction
    ? `\n## Sack and Reconstruction\n- Crisis posture inherited: ${state.reconstruction.crisisPosture}\n- Devastation remaining: ${state.reconstruction.devastation}\n- Displaced households: ${state.reconstruction.displaced}\n- Records integrity: ${state.reconstruction.recordsIntegrity}\n- Fire exposure: ${state.reconstruction.fireExposure}\n- Wall urgency: ${state.reconstruction.wallUrgency}\n- Reconstruction doctrine: ${state.flags?.reconstructionPolicy ?? 'unsettled'}\n- Latin trust: ${state.reconstruction.latinTrust}\n- Allied obligations: ${state.reconstruction.alliedObligations}\n- Latin settlement: ${state.flags?.latinSettlement ?? 'unsettled'}\n`
    : ''
  const regionalScore = calculateRegionalScore(state)
  const regionalForecastData = regionalForecast(state)
  const regional = state.regional ? `\n## Regional Compact\n- Doctrine: ${state.flags?.regionalDoctrine ?? 'unsettled'}\n- Completed roads: ${state.regional.roads.length}\n- Active road projects: ${state.regional.roadProjects.length}\n- Colonies founded: ${state.regional.colonies.length}\n- Military contribution: ${regionalForecastData.contribution}\n- Average autonomy: ${regionalForecastData.autonomy}\n- Trade access: ${regionalForecastData.tradeAccess}\n- Revolt risk: ${regionalForecastData.revoltRisk}\n- Overextension: ${regionalForecastData.overextension}\n- Regional score: ${regionalScore.grade} (${regionalScore.score})\n` : ''
  const italianScore = calculateItalianScore(state)
  const italian = state.italian ? `\n## Roads to Italy\n- Caudine response: ${state.flags?.caudineResponse ?? 'unsettled'}\n- Appian priority: ${state.flags?.appianPriority ?? 'unsettled'}\n- Samnite settlement: ${state.flags?.samniteSettlement ?? 'unsettled'}\n- Sentinum plan: ${state.flags?.sentinumPlan ?? 'unsettled'}\n- Pyrrhic posture: ${state.flags?.pyrrhicPosture ?? 'unsettled'}\n- Pyrrhic endgame: ${state.flags?.pyrrhicEndgame ?? 'unsettled'}\n- Mediterranean doctrine: ${state.flags?.mediterraneanDoctrine ?? 'unsettled'}\n- Alliance depth: ${state.italian.allianceDepth}\n- Campaign persistence: ${state.italian.campaignPersistence}\n- Reserve depth: ${state.italian.reserveDepth}\n- Coalition risk: ${state.italian.coalitionRisk}\n- Pyrrhic pressure: ${state.italian.pyrrhicPressure}\n- Water capacity: ${state.italian.waterCapacity}\n- Maintenance debt: ${state.italian.maintenanceDebt}\n- Via Appia: ${state.italian.projects.viaAppia.completed ? 'complete' : `${state.italian.projects.viaAppia.progress}/${state.italian.projects.viaAppia.requiredSeasons} seasons`}\n- Aqua Appia: ${state.italian.projects.aquaAppia.completed ? 'complete' : `${state.italian.projects.aquaAppia.progress}/${state.italian.projects.aquaAppia.requiredSeasons} seasons`}\n- Italian System score: ${italianScore.grade} (${italianScore.score})\n` : ''
  return `# Titans of War: Birth of Rome\n\n## ${outcome.title}\n\n${outcome.summary}\n\n## Final Grades\n${grades}\n\n## Population\n${population}\n\n## Workforce Obligations\n- Farming: ${workforce.allocation.farming}% (${workforce.counts.farming} people)\n- Public works: ${workforce.allocation.works}% (${workforce.counts.works} people)\n- Levy: ${workforce.allocation.levy}% (${workforce.counts.levy} people)\n${republic}${war}${reconstruction}${regional}${italian}\n## Council Record\n${choices || '- No councils recorded.'}\n\n## Works Established\n${buildings || '- No works established.'}\n\n## Unfinished Major Projects\n${projects || '- No unfinished major projects.'}\n`
}

export function downloadText(filename, text, type = 'text/plain') {
  const blob = new Blob([text], { type })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = filename
  anchor.click()
  URL.revokeObjectURL(url)
}

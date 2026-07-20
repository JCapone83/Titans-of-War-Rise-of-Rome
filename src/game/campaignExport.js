import { TURN_YEARS, formatYear } from './data.js'
import { calculateAugustanCityScore, calculateCivilSettlementScore, calculateItalianScore, calculateMetropolitanScore, calculateOutcome, calculateRegionalScore, calculateRepublicStrainScore } from './outcomes.js'
import { augustanCapitalSystems, regionalForecast, workforceSummary } from './simulation.js'

const section = (title, lines) => [`## ${title}`, ...lines, ''].join('\n')
const projectLines = (projects, unit = 'seasons', complete = 'complete') => Object.values(projects ?? {}).map((project) => `- ${project.id}: ${project.completed ? complete : `${project.progress}/${project.requiredSeasons} ${unit}`}`)
const ledgerLines = (ledger) => Object.entries(ledger ?? {}).filter(([key]) => key !== 'projects').map(([key, value]) => `- ${key}: ${value}`)

export function campaignMarkdown(state) {
  const outcome = calculateOutcome(state)
  const workforce = workforceSummary(state)
  const regionalScore = calculateRegionalScore(state)
  const regionalData = regionalForecast(state)
  const italianScore = calculateItalianScore(state)
  const metropolitanScore = calculateMetropolitanScore(state)
  const strainScore = calculateRepublicStrainScore(state)
  const civilScore = calculateCivilSettlementScore(state)
  const augustanScore = calculateAugustanCityScore(state)
  const capitalSystems = augustanCapitalSystems(state)
  const output = [
    '# Titans of War: Birth of Rome',
    '',
    `## ${outcome.title}`,
    '',
    outcome.summary,
    '',
    section('Final Grades', Object.entries(outcome.grades).map(([name, value]) => `- ${name}: **${value.grade}** (${value.score})`)),
    section('Population', state.population ? [
      `- Total population: **${state.population.total.toLocaleString()}**`,
      `- Households: ${state.population.households}`,
      `- Available workers: ${state.population.workers}`,
      `- Levy eligible: ${state.population.levyEligible}`,
      `- Craftsmen: ${state.population.craftsmen}`,
    ] : ['- Population record unavailable for this legacy campaign.']),
    section('Workforce Obligations', [
      `- Farming: ${workforce.allocation.farming}% (${workforce.counts.farming} people)`,
      `- Public works: ${workforce.allocation.works}% (${workforce.counts.works} people)`,
      `- Levy: ${workforce.allocation.levy}% (${workforce.counts.levy} people)`,
    ]),
  ]

  if (state.republic) output.push(section('Republican Institutions', [
    `- Magistrate authority: ${state.republic.magistrateAuthority}`,
    `- Senate standing and public credit: ${state.republic.senateStanding}`,
    `- Assembly consent: ${state.republic.assemblyConsent}`,
    `- Debt strain: ${state.republic.debtStrain}`,
    `- Levy burden: ${state.republic.levyBurden}`,
    `- Tribunes established: ${state.flags?.tribunesEstablished ? 'yes' : 'no'}`,
  ]))
  if (state.war) output.push(section('War Commitments', [
    `- Pressure maintained against Veii: ${state.war.veiiPressure}`,
    `- Siege persistence: ${state.war.siegePersistence}`,
    `- Soldier pay: ${state.flags?.soldierPayEstablished ? 'established' : 'not established'}`,
    `- Veteran cohesion: ${state.war.veteranCohesion}`,
    `- Land expectations: ${state.war.landExpectations}`,
    `- Veii settlement: ${state.flags?.veiiResolution ?? 'unresolved'}`,
    `- Gallic posture: ${state.flags?.gallicPlan ?? 'unresolved'}`,
  ]))
  if (state.reconstruction) output.push(section('Sack and Reconstruction', [
    `- Crisis posture inherited: ${state.reconstruction.crisisPosture}`,
    `- Devastation remaining: ${state.reconstruction.devastation}`,
    `- Displaced households: ${state.reconstruction.displaced}`,
    `- Records integrity: ${state.reconstruction.recordsIntegrity}`,
    `- Fire exposure: ${state.reconstruction.fireExposure}`,
    `- Wall urgency: ${state.reconstruction.wallUrgency}`,
    `- Reconstruction doctrine: ${state.flags?.reconstructionPolicy ?? 'unsettled'}`,
    `- Latin trust: ${state.reconstruction.latinTrust}`,
    `- Allied obligations: ${state.reconstruction.alliedObligations}`,
    `- Latin settlement: ${state.flags?.latinSettlement ?? 'unsettled'}`,
  ]))
  if (state.regional) output.push(section('Regional Compact', [
    `- Doctrine: ${state.flags?.regionalDoctrine ?? 'unsettled'}`,
    `- Completed roads: ${state.regional.roads.length}`,
    `- Active road projects: ${state.regional.roadProjects.length}`,
    `- Colonies founded: ${state.regional.colonies.length}`,
    `- Military contribution: ${regionalData.contribution}`,
    `- Average autonomy: ${regionalData.autonomy}`,
    `- Trade access: ${regionalData.tradeAccess}`,
    `- Revolt risk: ${regionalData.revoltRisk}`,
    `- Overextension: ${regionalData.overextension}`,
    `- Regional score: ${regionalScore.grade} (${regionalScore.score})`,
  ]))
  if (state.italian) output.push(section('Roads to Italy', [
    `- Caudine response: ${state.flags?.caudineResponse ?? 'unsettled'}`,
    `- Appian priority: ${state.flags?.appianPriority ?? 'unsettled'}`,
    `- Samnite settlement: ${state.flags?.samniteSettlement ?? 'unsettled'}`,
    `- Sentinum plan: ${state.flags?.sentinumPlan ?? 'unsettled'}`,
    `- Pyrrhic posture: ${state.flags?.pyrrhicPosture ?? 'unsettled'}`,
    `- Pyrrhic endgame: ${state.flags?.pyrrhicEndgame ?? 'unsettled'}`,
    `- Mediterranean doctrine: ${state.flags?.mediterraneanDoctrine ?? 'unsettled'}`,
    `- Alliance depth: ${state.italian.allianceDepth}`,
    `- Campaign persistence: ${state.italian.campaignPersistence}`,
    `- Reserve depth: ${state.italian.reserveDepth}`,
    `- Coalition risk: ${state.italian.coalitionRisk}`,
    `- Pyrrhic pressure: ${state.italian.pyrrhicPressure}`,
    `- Water capacity: ${state.italian.waterCapacity}`,
    `- Maintenance debt: ${state.italian.maintenanceDebt}`,
    `- Via Appia: ${state.italian.projects.viaAppia.completed ? 'complete' : `${state.italian.projects.viaAppia.progress}/${state.italian.projects.viaAppia.requiredSeasons} seasons`}`,
    `- Aqua Appia: ${state.italian.projects.aquaAppia.completed ? 'complete' : `${state.italian.projects.aquaAppia.progress}/${state.italian.projects.aquaAppia.requiredSeasons} seasons`}`,
    `- Italian System score: ${italianScore.grade} (${italianScore.score})`,
  ]))
  if (state.coreJudgment) output.push(section('Frozen 264 BC Core Judgment', [
    `- Title: **${state.coreJudgment.title}**`,
    `- Summary: ${state.coreJudgment.summary}`,
    `- Overall: ${state.coreJudgment.overall}`,
    `- Turn/year: ${state.coreJudgment.turn} / ${state.coreJudgment.year} BC`,
    `- Choice log length: ${state.coreJudgment.choiceLogLength}`,
  ]))
  for (const bridge of state.chronologyBridges ?? []) output.push(section(`Interwar Bridge: ${bridge.fromYear}-${bridge.toYear} BC`, [
    ...Object.entries(bridge.mediterraneanChanges ?? {}).filter(([, value]) => value !== 0).map(([key, value]) => `- ${key}: ${value > 0 ? '+' : ''}${value}`),
    ...(bridge.notes ?? []).map((note) => `- ${note}`),
  ]))
  if (state.mediterranean) output.push(section(state.turn >= 33 ? 'Mediterranean Republic' : 'Mediterranean Opening', [
    `- Fleet doctrine: ${state.flags?.fleetDoctrine ?? 'unsettled'}`,
    `- Sicilian settlement: ${state.flags?.sicilianSettlement ?? 'unsettled'}`,
    `- Hannibalic posture: ${state.flags?.hannibalPosture ?? 'not yet reached'}`,
    `- Cannae response: ${state.flags?.cannaeResponse ?? 'not yet reached'}`,
    `- Allied settlement: ${state.flags?.alliedSettlement ?? 'not yet reached'}`,
    `- Victory settlement: ${state.flags?.victorySettlement ?? 'not yet reached'}`,
    ...ledgerLines(state.mediterranean),
    '### Republican Public Works',
    ...projectLines(state.mediterranean.projects),
  ]))
  if (state.metropolitan) output.push(section('Conquest and Metropolis', [
    `- Triumph policy: ${state.flags?.triumphPolicy ?? 'unsettled'}`,
    `- Forum policy: ${state.flags?.forumPolicy ?? 'unsettled'}`,
    `- Pydna settlement: ${state.flags?.pydnaSettlement ?? 'unsettled'}`,
    `- 146 BC conquest settlement: ${state.flags?.conquestSettlement ?? 'not yet reached'}`,
    `- 133 BC land, grain, and service settlement: ${state.flags?.gracchanThreshold ?? 'not yet reached'}`,
    ...ledgerLines(state.metropolitan),
    `- Conquest and Metropolis score: ${metropolitanScore.grade} (${metropolitanScore.score})`,
    '### Metropolitan Public Works',
    ...projectLines(state.metropolitan.projects),
  ]))
  if (state.republicStrain) output.push(section('Republic Under Strain', [
    `- Land and grain settlement: ${state.flags?.landGrainSettlement ?? 'unsettled'}`,
    `- Italian citizenship settlement: ${state.flags?.italianSettlement ?? 'unsettled'}`,
    `- Emergency command rule: ${state.flags?.emergencyCommand ?? 'unsettled'}`,
    `- Sullan settlement: ${state.flags?.sullanSettlement ?? 'not yet reached'}`,
    `- Archive settlement: ${state.flags?.archiveSettlement ?? 'not yet reached'}`,
    `- Assembly settlement: ${state.flags?.assemblySettlement ?? 'not yet reached'}`,
    `- 49 BC command settlement: ${state.flags?.rubiconSettlement ?? 'not yet reached'}`,
    ...ledgerLines(state.republicStrain),
    `- Republic Under Strain score: ${strainScore.grade} (${strainScore.score})`,
    '### Late-Republic Civic Works',
    ...projectLines(state.republicStrain.projects),
  ]))
  if (state.civilSettlement) output.push(section('Civil War and Settlement', [
    `- Caesar's emergency: ${state.flags?.caesarianEmergency ?? 'unsettled'}`,
    `- Civic-core settlement: ${state.flags?.civicCoreSettlement ?? 'unsettled'}`,
    `- After the Ides: ${state.flags?.idesSettlement ?? 'unsettled'}`,
    `- Triumviral finance: ${state.flags?.triumviralFinance ?? 'unsettled'}`,
    `- Actium and demobilization: ${state.flags?.actiumSettlement ?? 'unsettled'}`,
    `- Constitutional settlement: ${state.flags?.constitutionalSettlement ?? 'unsettled'}`,
    `- Operating form: **${civilScore.operatingForm}**`,
    ...ledgerLines(state.civilSettlement),
    `- Civil War and Settlement score: ${civilScore.grade} (${civilScore.score})`,
    '### Settlement Public Works',
    ...projectLines(state.civilSettlement.projects, 'stages', 'operating'),
  ]))
  if (state.augustanCity) output.push(section('The Augustan City', [
    `- Operating rule: ${state.flags?.augustanOperatingRule ?? 'unsettled'}`,
    `- Agrippan program: ${state.flags?.agrippanProgram ?? 'unsettled'}`,
    `- Succession method: ${state.flags?.successionMethod ?? 'unsettled'}`,
    `- Provincial peace settlement: ${state.flags?.peaceSettlement ?? 'unsettled'}`,
    `- Forum operating rule: ${state.flags?.forumAugustusRule ?? 'unsettled'}`,
    `- Vigiles command: ${state.flags?.vigilesCommand ?? 'unsettled'}`,
    `- AD 14 succession: ${state.flags?.augustanSuccession ?? 'unsettled'}`,
    `- Operating form: **${augustanScore.operatingForm}**`,
    `- Succession capacity: ${augustanScore.succession}`,
    ...ledgerLines(state.augustanCity),
    `- The Augustan City score: ${augustanScore.grade} (${augustanScore.score})`,
    '### Capital Operating Systems',
    ...capitalSystems.map((system) => `- ${system.name}: ${system.score}/100 (${system.status})`),
    `- Landmark works: ${augustanScore.completed} operating; ${augustanScore.active} active`,
    '### Augustan Public Works',
    ...projectLines(state.augustanCity.projects, 'stages', 'operating'),
  ]))

  output.push(section('Council Record', state.choiceLog.length ? state.choiceLog.map((entry) => `- Turn ${entry.turn} (${formatYear(TURN_YEARS[entry.turn - 1])}): **${entry.council}** - ${entry.option}`) : ['- No councils recorded.']))
  output.push(section('Works Established', state.buildings.length ? state.buildings.map((building) => `- ${building.name}, ${building.districtId} (turn ${building.builtTurn})`) : ['- No works established.']))
  output.push(section('Unfinished Major Projects', state.projects?.length ? state.projects.map((project) => `- ${project.name}, ${project.districtId}: ${project.progress}/${project.requiredSeasons} work seasons`) : ['- No unfinished major projects.']))
  return `${output.join('\n')}\n`
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

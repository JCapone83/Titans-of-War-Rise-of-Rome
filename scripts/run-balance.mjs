import { runAllActFiveStrategies, runAllActFourStrategies, runAllActThreeStrategies, runAllCivilSettlementStrategies, runAllMediterraneanStrategies, runAllMetropolitanStrategies, runAllReferenceStrategies, runAllRegionalStrategies, runAllRepublicStrainStrategies, runRecoveryStrategy } from '../src/game/referenceStrategies.js'

const results = runAllReferenceStrategies()
for (const result of results) {
  const grades = Object.entries(result.outcome.grades).map(([name, value]) => `${name} ${value.grade} (${value.score})`).join(' | ')
  console.log(`${result.strategy.name}: ${result.outcome.overall} overall | ${grades}`)
  console.log(`  Works: ${result.state.buildings.map((building) => building.name).join(', ') || 'none'}`)
  if (result.skipped.length) console.log(`  Skipped: ${result.skipped.map((item) => `T${item.turn} ${item.action.join('/')} - ${item.reason}`).join('; ')}`)
}

if (results.some((result) => result.outcome.overall < 70)) process.exitCode = 1

const recovery = runRecoveryStrategy()
const recoveryGrades = Object.entries(recovery.outcome.grades).map(([name, value]) => `${name} ${value.grade} (${value.score})`).join(' | ')
console.log(`${recovery.strategy.name}: ${recovery.outcome.overall} overall | ${recoveryGrades}`)
console.log(`  Works: ${recovery.state.buildings.map((building) => building.name).join(', ') || 'none'}`)
console.log(`  Risk: early fire ${recovery.snapshots[1].maxFire}, disease ${recovery.snapshots[1].maxDisease}; final fire ${recovery.snapshots.at(-1).maxFire}, disease ${recovery.snapshots.at(-1).maxDisease}`)
if (recovery.skipped.length) console.log(`  Skipped: ${recovery.skipped.map((item) => `T${item.turn} ${item.action.join('/')} - ${item.reason}`).join('; ')}`)
if (recovery.outcome.overall < 70 || recovery.skipped.length) process.exitCode = 1

console.log('\nAct III reference strategies')
const actThree = runAllActThreeStrategies()
for (const result of actThree) {
  const grades = Object.entries(result.outcome.grades).map(([name, value]) => `${name} ${value.grade} (${value.score})`).join(' | ')
  const finalGallic = result.snapshots.find((snapshot) => snapshot.turn === 16)?.gallic
  console.log(`${result.strategy.name}: ${result.outcome.overall} overall | ${grades}`)
  console.log(`  Veii: ${result.state.flags.veiiResolution} | Gallic posture: ${finalGallic?.posture} (${finalGallic?.score})`)
  if (result.skipped.length) console.log(`  Skipped: ${result.skipped.map((item) => `T${item.turn} ${item.action.join('/')} - ${item.reason}`).join('; ')}`)
}
if (actThree.some((result) => result.outcome.overall < 70 || result.skipped.length)) process.exitCode = 1

console.log('\nAct IV reference strategies')
const actFour = runAllActFourStrategies()
for (const result of actFour) {
  const grades = Object.entries(result.outcome.grades).map(([name, value]) => `${name} ${value.grade} (${value.score})`).join(' | ')
  console.log(`${result.strategy.name}: ${result.outcome.overall} overall | ${grades}`)
  console.log(`  Crisis: ${result.state.reconstruction.crisisPosture} | Rebuilding: ${result.state.flags.reconstructionPolicy} | Latin settlement: ${result.state.flags.latinSettlement}`)
  if (result.skipped.length) console.log(`  Skipped: ${result.skipped.map((item) => `T${item.turn} ${item.action.join('/')} - ${item.reason}`).join('; ')}`)
}
if (actFour.some((result) => result.outcome.overall < 70 || result.skipped.length)) process.exitCode = 1

console.log('\nRegional reference strategies')
const regional = runAllRegionalStrategies()
for (const result of regional) {
  const forecast = result.regionalScore.forecast
  console.log(`${result.strategy.name}: ${result.outcome.overall} overall | regional ${result.regionalScore.grade} (${result.regionalScore.score})`)
  console.log(`  Roads: ${result.state.regional.roads.length} | Colonies: ${result.state.regional.colonies.length} | Autonomy: ${forecast.autonomy} | Overextension: ${forecast.overextension}`)
  if (result.skipped.length) console.log(`  Skipped: ${result.skipped.map((item) => `T${item.turn} ${item.action.join('/')} - ${item.reason}`).join('; ')}`)
}
if (regional.some((result) => result.outcome.overall < 70 || result.regionalScore.score < 70 || result.skipped.length)) process.exitCode = 1

console.log('\nAct V reference strategies')
const actFive = runAllActFiveStrategies()
for (const result of actFive) {
  const score = result.italianScore
  const projects = result.state.italian.projects
  console.log(`${result.strategy.name}: ${result.outcome.overall} overall | Italian System ${score.grade} (${score.score})`)
  console.log(`  Endurance: ${score.endurance} | Compact: ${score.compact} | Pressure: ${score.pressure} | Infrastructure: ${score.infrastructure} | Stewardship: ${score.stewardship}`)
  console.log(`  Via Appia: ${projects.viaAppia.progress}/${projects.viaAppia.requiredSeasons} | Aqua Appia: ${projects.aquaAppia.progress}/${projects.aquaAppia.requiredSeasons} | Doctrine: ${result.state.flags.mediterraneanDoctrine}`)
  if (result.skipped.length) console.log(`  Skipped: ${result.skipped.map((item) => `T${item.turn} ${item.projectId} - ${item.reason}`).join('; ')}`)
}
if (actFive.some((result) => result.outcome.overall < 70 || result.italianScore.score < 70 || result.skipped.length || Object.values(result.state.italian.projects).some((project) => !project.completed))) process.exitCode = 1

console.log('\nAct VI Mediterranean Republic strategies')
const mediterranean = runAllMediterraneanStrategies()
for (const result of mediterranean) {
  const grade = result.outcome.grades['Mediterranean Republic']
  const m = result.state.mediterranean
  console.log(`${result.strategy.name}: ${result.outcome.overall} overall | Mediterranean Republic ${grade.grade} (${grade.score}) | 201 BC`)
  console.log(`  Fleet ${m.fleetCapacity} | Reserve ${m.emergencyReserve} | Trust ${m.provincialTrust} | Allied exhaustion ${m.alliedExhaustion} | Veteran pressure ${m.veteranSettlementPressure}`)
  console.log(`  Republican public works: ${Object.values(m.projects ?? {}).filter((project) => project.completed).map((project) => project.id).join(', ') || 'none'} | recurring burdens visible in mediterraneanForecast`)
}
if (mediterranean.some((result) => result.state.turn !== 36 || result.state.outcome !== 'mediterranean-complete' || result.outcome.overall < 60 || result.skipped.length)) process.exitCode = 1

console.log('\nAct VII Conquest and Metropolis strategies')
const metropolitan = runAllMetropolitanStrategies()
for (const result of metropolitan) {
  const score = result.metropolitanScore
  const projects = Object.values(result.state.metropolitan.projects)
  console.log(`${result.strategy.name}: ${result.outcome.overall} overall | Conquest and Metropolis ${score.grade} (${score.score}) | 133 BC`)
  console.log(`  Capacity ${score.capacity} | Bounded power ${score.boundedPower} | Household ${score.household} | Status legibility ${score.statusLegibility} | Physical systems ${score.physical}`)
  console.log(`  Metropolitan public works: ${projects.filter((project) => project.completed).map((project) => project.id).join(', ') || 'none'} complete; ${projects.filter((project) => !project.completed && project.progress > 0).map((project) => `${project.id} ${project.progress}/${project.requiredSeasons}`).join(', ') || 'none active'}`)
  if (result.skipped.length) console.log(`  Skipped: ${result.skipped.map((item) => `T${item.turn} ${item.projectId ?? 'council'} - ${item.reason}`).join('; ')}`)
}
if (metropolitan.some((result) => result.state.turn !== 41 || result.state.outcome !== 'metropolitan-complete' || result.outcome.overall < 60 || result.metropolitanScore.score < 60 || result.skipped.length)) process.exitCode = 1

console.log('\nAct VIII Republic Under Strain strategies')
const republicStrain = runAllRepublicStrainStrategies()
for (const result of republicStrain) {
  const score = result.strainScore
  const projects = Object.values(result.state.republicStrain.projects)
  console.log(`${result.strategy.name}: ${result.outcome.overall} overall | Republic Under Strain ${score.grade} (${score.score}) | 49 BC`)
  console.log(`  Civic channels ${score.civicChannels} | Command limits ${score.commandLimits} | Italian settlement ${score.italianSettlement} | Civil order ${score.civilOrder} | Physical systems ${score.physical}`)
  console.log(`  Late-Republic works: ${projects.filter((project) => project.completed).map((project) => project.id).join(', ') || 'none'} complete; ${projects.filter((project) => !project.completed && project.progress > 0).map((project) => `${project.id} ${project.progress}/${project.requiredSeasons}`).join(', ') || 'none active'}`)
  if (result.skipped.length) console.log(`  Skipped: ${result.skipped.map((item) => `T${item.turn} ${item.projectId ?? 'council'} - ${item.reason}`).join('; ')}`)
}
if (republicStrain.some((result) => result.state.turn !== 48 || result.state.outcome !== 'republic-strain-complete' || result.outcome.overall < 60 || result.strainScore.score < 60 || result.skipped.length)) process.exitCode = 1

console.log('\nAct IX Civil War and Settlement strategies')
const civilSettlement = runAllCivilSettlementStrategies()
for (const result of civilSettlement) {
  const score = result.civilScore
  const projects = Object.values(result.state.civilSettlement.projects)
  console.log(`${result.strategy.name}: ${result.outcome.overall} overall | Civil War and Settlement ${score.grade} (${score.score}) | ${score.operatingForm} | 27 BC`)
  console.log(`  Institutions ${score.institutions} | Demobilization ${score.demobilization} | Command settlement ${score.commandSettlement} | Civic life ${score.civicLife} | Succession ${score.succession} | Physical ${score.physical}`)
  console.log(`  Settlement works: ${projects.filter((project) => project.completed).map((project) => project.id).join(', ') || 'none'} operating; ${projects.filter((project) => !project.completed && project.progress > 0).map((project) => `${project.id} ${project.progress}/${project.requiredSeasons}`).join(', ') || 'none active'}`)
  if (result.skipped.length) console.log(`  Skipped: ${result.skipped.map((item) => `T${item.turn} ${item.projectId ?? 'council'} - ${item.reason}`).join('; ')}`)
}
if (civilSettlement.some((result) => result.state.turn !== 54 || result.state.outcome !== 'civil-settlement-complete' || result.outcome.overall < 60 || result.civilScore.score < 60 || result.skipped.length)) process.exitCode = 1

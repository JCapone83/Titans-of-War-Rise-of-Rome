import { countFamily, hasBuilding, regionalForecast } from './simulation.js'

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
  const expectedCouncils = state.turn >= 23 ? 18 : state.turn >= 20 ? 15 : state.turn >= 16 ? 11 : state.turn >= 13 ? 8 : 5
  const actThreeContinuity = state.turn >= 16 ? (state.flags?.veiiResolution ? 3 : -3) + (state.flags?.gallicPlan ? 3 : -3) : 0
  const actFourContinuity = state.turn >= 20 ? (state.flags?.reconstructionPolicy ? 4 : -4) + (state.flags?.latinSettlement ? 4 : -4) : 0
  const regionalContinuity = state.turn >= 23 ? (state.flags?.regionalDoctrine ? 3 : -3) + (state.flags?.regionalCharter ? 3 : -3) + (state.flags?.regionalSettlement ? 3 : -3) : 0
  const continuity = Math.round(56 + (hasBuilding(state, 'cloaca-works') ? 10 : 0) + (hasBuilding(state, 'podium-temple') ? 10 : 0) + (state.choiceLog.length === expectedCouncils ? 8 : 0) + Math.min(8, tierTwoWorks * 2) - unfinishedProjects * 4 - Math.abs(state.buildings.length - 10) * 2 + (state.flags?.tribunesEstablished ? 4 : 0) + actThreeContinuity + actFourContinuity + regionalContinuity)
  const scores = {
    'Urban Design': Math.max(0, Math.min(100, urban)),
    'Civic Balance': Math.max(0, Math.min(100, civic)),
    Logistics: Math.max(0, Math.min(100, logistics)),
    'Military Readiness': Math.max(0, Math.min(100, military)),
    'Historical Continuity': Math.max(0, Math.min(100, continuity)),
  }
  const regionalScore = calculateRegionalScore(state)
  if (regionalScore) scores['Regional Compact'] = regionalScore.score
  const overall = Math.round(Object.values(scores).reduce((sum, value) => sum + value, 0) / Object.keys(scores).length)
  let title = 'A City Still Becoming'
  if (state.turn >= 23 && overall >= 72) title = 'The City Becomes a Regional Power'
  else if (overall >= 85) title = 'The Seven Hills Become Rome'
  else if (overall >= 72) title = 'A Durable City of Kings'
  else if (overall < 55) title = 'A Confederation Under Strain'
  return {
    title,
    overall,
    summary: overall >= 72
      ? state.turn >= 23 ? 'Rome links city capacity to differentiated allies, roads, and obligations without allowing expansion to become costless.' : 'Rome enters its next age with institutions, works, and obligations strong enough to outlive a single ruler.'
      : 'The settlement survives, but later generations inherit debts in water, trust, defense, or food that stone alone cannot solve.',
    grades: Object.fromEntries(Object.entries(scores).map(([key, value]) => [key, { score: value, grade: grade(value) }])),
  }
}

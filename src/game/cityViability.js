const CAPITAL_PROJECT_KEYS = ['italian', 'mediterranean', 'metropolitan', 'republicStrain', 'civilSettlement', 'augustanCity', 'imperialCapital', 'trajanicCapital']

const grade = (score) => score >= 90 ? 'A' : score >= 80 ? 'B' : score >= 70 ? 'C' : score >= 60 ? 'D' : 'F'
const clampScore = (value) => Math.max(0, Math.min(100, Math.round(value)))

function projectPortfolio(state) {
  const ordinaryProjects = Array.isArray(state.projects) ? state.projects : []
  const eraProjects = CAPITAL_PROJECT_KEYS.flatMap((key) => Object.values(state[key]?.projects ?? {}))
  return [...ordinaryProjects, ...eraProjects]
}

function physicalExpectation(turn) {
  if (turn <= 10) return 4
  if (turn <= 20) return 6
  if (turn <= 29) return 8
  if (turn <= 36) return 10
  if (turn <= 48) return 12
  if (turn <= 61) return 15
  if (turn <= 70) return 18
  return 22
}

export function calculateCityViability(state) {
  const metrics = state.metrics ?? {}
  const populationTotal = Math.max(0, state.population?.total ?? 0)
  const populationStability = clampScore(populationTotal / 1030 * 100)
  const services = Object.fromEntries(['food', 'water', 'shelter', 'sanitation'].map((key) => [key, clampScore(metrics[key] ?? 0)]))
  const serviceValues = Object.values(services)
  const serviceAverage = serviceValues.reduce((sum, value) => sum + value, 0) / serviceValues.length
  const weakestService = Math.min(...serviceValues)
  const essentialServices = clampScore(serviceAverage * 0.85 + weakestService * 0.15)
  const projects = projectPortfolio(state)
  const buildingCredit = (state.buildings ?? []).reduce((sum, building) => sum + 1 + Math.max(0, (building.tier ?? 1) - 1) * 0.5, 0)
  const projectCredit = projects.reduce((sum, project) => {
    if (project.completed) return sum + 2.5
    const required = Math.max(1, project.requiredSeasons ?? 1)
    return sum + Math.min(1.5, Math.max(0, project.progress ?? 0) / required * 1.5)
  }, 0)
  const physicalFoundation = clampScore((buildingCredit + projectCredit) / physicalExpectation(state.turn ?? 1) * 100)
  const score = clampScore(populationStability * 0.4 + essentialServices * 0.35 + physicalFoundation * 0.25)
  const status = score >= 70 ? 'Flourishing' : score >= 50 ? 'Viable' : score >= 30 ? 'Fragile' : 'Hollowed'
  const weakestKey = Object.entries(services).sort((left, right) => left[1] - right[1])[0]?.[0] ?? 'services'
  const recoveryCue = populationStability < 50
    ? 'Stabilize essential services and housing so households can return.'
    : essentialServices < 50
      ? `Restore ${weakestKey} before adding another prestige work.`
      : physicalFoundation < 50
        ? 'Complete a modest public work or advance an era project.'
        : 'Maintain population, services, and the works already operating.'
  const explanation = `${status} city: population ${populationStability}, essential services ${essentialServices}, physical foundation ${physicalFoundation}.`
  return {
    score,
    grade: grade(score),
    status,
    explanation,
    recoveryCue,
    populationStability,
    essentialServices,
    physicalFoundation,
    services,
    weakestService,
    completedWorks: projects.filter((project) => project.completed).length,
    activeWorks: projects.filter((project) => !project.completed && (project.progress ?? 0) > 0).length,
  }
}

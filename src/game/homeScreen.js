import { ERAS, TURN_YEARS, formatYear } from './data.js'
import { migrateState } from './initialState.js'

export function parseCampaignSnapshot(value) {
  if (typeof value !== 'string' || value.trim() === '') return null
  try {
    return migrateState(JSON.parse(value))
  } catch {
    return null
  }
}

export function hasCampaignProgress(state) {
  if (!state || typeof state !== 'object') return false
  return state.turn > 1
    || state.buildings?.length > 0
    || state.projects?.length > 0
    || state.choiceLog?.length > 0
    || state.actionLog?.length > 0
    || state.reports?.length > 0
    || Boolean(state.outcome)
}

export function describeCampaign(state) {
  const turn = Math.max(1, Math.min(TURN_YEARS.length, Number(state?.turn) || 1))
  const era = ERAS[state?.era] ?? ERAS[0]
  const year = formatYear(TURN_YEARS[turn - 1])
  return {
    era: era.name,
    year,
    turn,
    totalTurns: TURN_YEARS.length,
    summary: `${era.name} · ${year} · Turn ${turn} of ${TURN_YEARS.length}`,
  }
}

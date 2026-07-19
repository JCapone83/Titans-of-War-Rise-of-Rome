import { getCouncil } from './data.js'
import { createMediterraneanState } from './initialState.js'
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
    version: 9,
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

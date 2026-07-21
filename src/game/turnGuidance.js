const establishedThisTurn = (state, familyId) => (
  (state.buildings ?? []).some((building) => building.familyId === familyId && building.builtTurn === state.turn)
  || (state.projects ?? []).some((project) => project.familyId === familyId && project.startedTurn === state.turn)
)

export function turnGuideState(state, guided = false) {
  const capacityUsed = Math.max(0, Number(state.actionsUsed) || 0)
  const capacityTotal = Math.max(0, Number(state.actionsMax) || 0)
  const councilRequired = Boolean(state.council)
  const councilComplete = !councilRequired || Boolean(state.councilResolved)

  if (guided && state.turn === 1) {
    const housingComplete = establishedThisTurn(state, 'housing')
    const waterComplete = establishedThisTurn(state, 'water')
    const current = !housingComplete ? 'housing' : !waterComplete ? 'water' : !councilComplete ? 'council' : 'advance'
    return {
      guided: true,
      current,
      housing: { complete: housingComplete, label: housingComplete ? 'Established' : 'Optional housing work' },
      water: { complete: waterComplete, label: waterComplete ? 'Established' : 'Optional water work' },
      council: { complete: councilComplete, label: councilRequired ? (councilComplete ? 'Resolved' : 'Decision needed') : 'No council' },
      advance: { complete: false, ready: councilComplete, label: councilComplete ? 'Ready' : 'Blocked' },
    }
  }

  const buildComplete = capacityUsed > 0 || capacityTotal === 0
  const current = !buildComplete ? 'build' : !councilComplete ? 'council' : 'advance'
  return {
    guided: false,
    current,
    build: { complete: buildComplete, label: capacityTotal ? `${capacityUsed}/${capacityTotal} capacity` : 'No capacity' },
    council: { complete: councilComplete, label: councilRequired ? (councilComplete ? 'Resolved' : 'Decision needed') : 'No council' },
    advance: { complete: false, ready: councilComplete, label: councilComplete ? 'Ready' : 'Blocked' },
  }
}

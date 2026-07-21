export function turnGuideState(state) {
  const capacityUsed = Math.max(0, Number(state.actionsUsed) || 0)
  const capacityTotal = Math.max(0, Number(state.actionsMax) || 0)
  const buildComplete = capacityUsed > 0 || capacityTotal === 0
  const councilRequired = Boolean(state.council)
  const councilComplete = !councilRequired || Boolean(state.councilResolved)
  const current = !buildComplete ? 'build' : !councilComplete ? 'council' : 'advance'

  return {
    current,
    build: {
      complete: buildComplete,
      label: capacityTotal ? `${capacityUsed}/${capacityTotal} capacity` : 'No capacity',
    },
    council: {
      complete: councilComplete,
      label: councilRequired ? (councilComplete ? 'Resolved' : 'Decision needed') : 'No council',
    },
    advance: {
      complete: false,
      ready: councilComplete,
      label: councilComplete ? 'Ready' : 'Blocked',
    },
  }
}

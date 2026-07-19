const MEASURES = [
  ['fleetCapacity', 'Fleet capacity'], ['maritimeLosses', 'Maritime losses'], ['warCredit', 'War credit'], ['contractorExposure', 'Contractor exposure'],
  ['provincialTrust', 'Provincial trust'], ['importedGrainShare', 'Imported grain share'], ['alliedExhaustion', 'Allied exhaustion'], ['overseasCommandDuration', 'Overseas command duration'],
]

export function MediterraneanPanel({ state }) {
  if (!state.mediterranean) return null
  return <section className="mediterranean-panel" aria-labelledby="mediterranean-panel-title">
    <div className="italian-heading"><div><p className="eyebrow">Mediterranean Republic</p><h2 id="mediterranean-panel-title">Opening ledger</h2></div></div>
    <div className="italian-measures">{MEASURES.map(([key, label]) => <div key={key}><span>{label}</span><strong>{state.mediterranean[key]}</strong></div>)}</div>
  </section>
}

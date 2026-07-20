const MEASURES = [
  ['fleetCapacity', 'Fleet capacity'], ['maritimeLosses', 'Maritime losses'], ['warCredit', 'War credit'], ['contractorExposure', 'Contractor exposure'],
  ['provincialTrust', 'Provincial trust'], ['importedGrainShare', 'Imported grain share'], ['alliedExhaustion', 'Allied exhaustion'], ['overseasCommandDuration', 'Overseas command duration'],
  ['emergencyReserve', 'Emergency reserve'], ['veteranSettlementPressure', 'Veteran settlement pressure'],
]

export function MediterraneanPanel({ state }) {
  if (!state.mediterranean) return null
  const bridge = state.chronologyBridges?.at(-1)
  return <section className="mediterranean-panel" aria-labelledby="mediterranean-panel-title">
    <div className="italian-heading"><div><p className="eyebrow">Mediterranean Republic</p><h2 id="mediterranean-panel-title">{state.turn > 32 ? 'War and settlement ledger' : 'Opening ledger'}</h2></div></div>
    <div className="italian-measures">{MEASURES.map(([key, label]) => <div key={key}><span>{label}</span><strong>{state.mediterranean[key]}</strong></div>)}</div>
    {bridge && <details className="compact-ledger"><summary>{bridge.fromYear}-{bridge.toYear} BC bridge ledger</summary>
      <div className="italian-measures">{Object.entries(bridge.mediterraneanChanges).filter(([, value]) => value !== 0).map(([key, value]) => <div key={key}><span>{MEASURES.find(([measure]) => measure === key)?.[1] ?? key}</span><strong>{value > 0 ? '+' : ''}{value}</strong></div>)}</div>
      {bridge.notes.map((note) => <p key={note}>{note}</p>)}
    </details>}
  </section>
}

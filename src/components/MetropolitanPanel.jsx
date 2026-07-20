const MEASURES = [
  ['urbanMigration', 'Urban migration'],
  ['rentPressure', 'Rent pressure'],
  ['legalCaseLoad', 'Legal case load'],
  ['patronageConcentration', 'Patronage concentration'],
  ['contractingCapacity', 'Contracting capacity'],
  ['corruptionExposure', 'Corruption exposure'],
  ['enslavedLaborInflow', 'Enslaved labor inflow'],
  ['freedHouseholdIntegration', 'Freed household integration'],
  ['citizenAbsence', 'Citizen absence'],
  ['provincialPetitionBacklog', 'Provincial petition backlog'],
  ['importedGrainDependence', 'Imported grain dependence'],
  ['publicProvision', 'Public provision'],
]

export function MetropolitanPanel({ state }) {
  if (!state.metropolitan) return null
  return (
    <section className="mediterranean-panel" aria-labelledby="metropolitan-panel-title">
      <div className="italian-heading">
        <div><p className="eyebrow">Conquest and Metropolis</p><h2 id="metropolitan-panel-title">Metropolitan ledger</h2></div>
      </div>
      <div className="italian-measures">
        {MEASURES.map(([key, label]) => <div key={key}><span>{label}</span><strong>{state.metropolitan[key]}</strong></div>)}
      </div>
      <p className="panel-note">Legal status, service, contracts, patronage, migration, and provision remain separate obligations.</p>
    </section>
  )
}

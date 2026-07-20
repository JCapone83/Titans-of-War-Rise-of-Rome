import { trajanicCapitalForecast, trajanicCapitalSystems } from '../game/simulation.js'

const MEASURES = [
  ['successionSettlement', 'Succession settlement'],
  ['constitutionalContinuity', 'Constitutional continuity'],
  ['frontierCommand', 'Frontier command'],
  ['provincialTrust', 'Provincial trust'],
  ['treasuryResilience', 'Treasury resilience'],
  ['conquestDependence', 'Conquest dependence'],
  ['capitalSupply', 'Capital supply'],
  ['publicProvision', 'Public provision'],
  ['administrativeCapacity', 'Administrative capacity'],
  ['maintenanceCapacity', 'Maintenance capacity'],
  ['maintenanceDebt', 'Maintenance debt'],
]

export function TrajanicCapitalPanel({ state }) {
  if (!state.trajanicCapital) return null
  const forecast = trajanicCapitalForecast(state)
  const systems = trajanicCapitalSystems(state)
  return <section className="mediterranean-panel trajanic-capital-panel" aria-labelledby="trajanic-capital-title">
    <div className="italian-heading"><div><p className="eyebrow">AD 97-117</p><h2 id="trajanic-capital-title">Trajanic Capital</h2></div></div>
    <div className="italian-measures imperial-measures">
      {MEASURES.map(([key, label]) => <div key={key} className={['conquestDependence', 'maintenanceDebt'].includes(key) ? 'risk-measure' : ''}><span>{label}</span><strong>{state.trajanicCapital[key]}</strong></div>)}
    </div>
    <div className="augustan-risks" aria-label="Trajanic operating forecast">
      <span>Treasury flow <strong>{forecast.resourceDelta.treasury >= 0 ? '+' : ''}{forecast.resourceDelta.treasury}</strong></span>
      <span>Grain flow <strong>{forecast.resourceDelta.grain >= 0 ? '+' : ''}{forecast.resourceDelta.grain}</strong></span>
      <span>Operating works <strong>{forecast.publicWorks.completed.length}</strong></span>
    </div>
    <div className="capital-system-heading"><p className="eyebrow">Trajanic operating systems</p><small>Conquest dependence and maintenance debt reduce capacity</small></div>
    <div className="capital-system-grid imperial-system-grid">
      {systems.map((system) => <div key={system.id} className={`capital-system status-${system.status.toLowerCase()}`}>
        <span>{system.name}</span><strong>{system.score}</strong><small>{system.status}</small>
        <i><b style={{ width: `${system.score}%` }} /></i>
        <p>{system.drivers.join(' · ')}</p>
      </div>)}
    </div>
    <p className="panel-note">Rome can reach its greatest territorial extent while ordinary government becomes dependent on conquest receipts, frontier command, provincial trust, capital supply, and the maintenance of inherited works.</p>
  </section>
}

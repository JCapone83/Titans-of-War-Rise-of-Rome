import { augustanCityForecast } from '../game/simulation.js'

const MEASURES = [
  ['princepsAuthority', 'Princeps authority'],
  ['senateMagistrateCapacity', 'Senate and magistrates'],
  ['householdStanding', 'Household standing'],
  ['successionConfidence', 'Succession confidence'],
  ['urbanAdministration', 'Urban administration'],
  ['fireCoverage', 'Fire coverage'],
  ['annonaReliability', 'Annona reliability'],
  ['monumentMemory', 'Monumental memory'],
  ['patronageConcentration', 'Patronage concentration'],
  ['provincialCommandBalance', 'Provincial command balance'],
  ['publicAccess', 'Public access'],
  ['maintenanceCapacity', 'Maintenance capacity'],
]

export function AugustanCityPanel({ state }) {
  if (!state.augustanCity) return null
  const forecast = augustanCityForecast(state)
  return <section className="mediterranean-panel augustan-city-panel" aria-labelledby="augustan-city-title">
    <div className="italian-heading"><div><p className="eyebrow">27 BC-AD 14</p><h2 id="augustan-city-title">The Augustan City</h2></div></div>
    <div className="italian-measures augustan-measures">
      {MEASURES.map(([key, label]) => <div key={key}><span>{label}</span><strong>{state.augustanCity[key]}</strong></div>)}
    </div>
    <div className="augustan-risks" aria-label="Augustan operating forecast">
      <span>Authority gap <strong>{Math.round(forecast.authorityGap)}</strong></span>
      <span>Service gap <strong>{Math.round(forecast.serviceGap)}</strong></span>
      <span>Succession gap <strong>{Math.round(forecast.successionGap)}</strong></span>
    </div>
    <p className="panel-note">Titles and marble do not substitute for magistrates, maintenance, fire response, provincial review, or a transfer that can survive the founder.</p>
  </section>
}

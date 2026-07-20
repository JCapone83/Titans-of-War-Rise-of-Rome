import { imperialCapitalForecast, imperialCapitalSystems } from '../game/simulation.js'

const MEASURES = [
  ['imperialAuthority', 'Imperial authority'],
  ['senateCompact', 'Senate compact'],
  ['guardInfluence', 'Guard influence'],
  ['armyRecognition', 'Army recognition'],
  ['successionConfidence', 'Succession confidence'],
  ['publicProvision', 'Public provision'],
  ['fireResilience', 'Fire resilience'],
  ['harborSupply', 'Harbor supply'],
  ['palaceConcentration', 'Palace concentration'],
  ['provincialTrust', 'Provincial trust'],
  ['maintenanceCapacity', 'Maintenance capacity'],
  ['publicAccess', 'Public access'],
]

export function ImperialCapitalPanel({ state }) {
  if (!state.imperialCapital) return null
  const forecast = imperialCapitalForecast(state)
  const systems = imperialCapitalSystems(state)
  return <section className="mediterranean-panel imperial-capital-panel" aria-labelledby="imperial-capital-title">
    <div className="italian-heading"><div><p className="eyebrow">AD 14-96</p><h2 id="imperial-capital-title">Imperial Capital</h2></div></div>
    <div className="italian-measures imperial-measures">
      {MEASURES.map(([key, label]) => <div key={key} className={['guardInfluence', 'palaceConcentration'].includes(key) ? 'risk-measure' : ''}><span>{label}</span><strong>{state.imperialCapital[key]}</strong></div>)}
    </div>
    <div className="augustan-risks" aria-label="Imperial operating forecast">
      <span>Recognition gap <strong>{Math.round(forecast.recognitionGap)}</strong></span>
      <span>Provision gap <strong>{Math.round(forecast.provisionGap)}</strong></span>
      <span>Palace gap <strong>{Math.round(forecast.palaceGap)}</strong></span>
    </div>
    <div className="capital-system-heading"><p className="eyebrow">Imperial operating systems</p><small>Risk measures reduce rather than inflate capacity</small></div>
    <div className="capital-system-grid imperial-system-grid">
      {systems.map((system) => <div key={system.id} className={`capital-system status-${system.status.toLowerCase()}`}>
        <span>{system.name}</span><strong>{system.score}</strong><small>{system.status}</small>
        <i><b style={{ width: `${system.score}%` }} /></i>
        <p>{system.drivers.join(' · ')}</p>
      </div>)}
    </div>
    <p className="panel-note">The capital can become more brilliant while guard brokerage, military recognition, palace land, maintenance debt, and uncertain succession make its operating settlement more brittle.</p>
  </section>
}

import { DISTRICTS, FACTIONS, METRIC_META, RESOURCE_META } from '../game/data.js'
import { forecastSeason } from '../game/simulation.js'
import { calculateCityViability } from '../game/outcomes.js'
import { LaborAllocationPanel } from './LaborAllocationPanel.jsx'

export function CivicRail({ state, onAllocate }) {
  const forecast = forecastSeason(state)
  const cityViability = calculateCityViability(state)
  const highestRisks = Object.values(forecast.risks).sort((a, b) => Math.max(b.fire, b.disease, b.flood) - Math.max(a.fire, a.disease, a.flood)).slice(0, 2)
  return (
    <aside className="civic-rail" aria-label="City condition">
      <section className="resource-section">
        <div className="section-heading"><p className="eyebrow">Stores and obligations</p><h2>Resources</h2></div>
        <div className="resource-grid">
          {Object.entries(state.resources).map(([key, value]) => (
            <div className="resource-cell" key={key} style={{ '--meter-color': RESOURCE_META[key].color }}>
              <span>{RESOURCE_META[key].label}</span><strong>{value}</strong>
            </div>
          ))}
        </div>
      </section>
      <section className="population-section">
        <div className="section-heading"><p className="eyebrow">Households on the hills</p><h2>Population</h2></div>
        <div className="population-total">
          <div><strong>{state.population.total.toLocaleString()}</strong><span>people</span></div>
          <div><strong>{forecast.population.capacity.total.toLocaleString()}</strong><span>housing</span></div>
          <i className={forecast.population.change.net < 0 ? 'negative' : 'positive'}>{forecast.population.change.net >= 0 ? '+' : ''}{forecast.population.change.net} next season</i>
        </div>
        <div className="population-groups">
          <span><strong>{state.population.households}</strong> households</span>
          <span><strong>{state.population.workers}</strong> workers</span>
          <span><strong>{state.population.levyEligible}</strong> levy</span>
          <span><strong>{state.population.craftsmen}</strong> craftsmen</span>
          <span><strong>{state.population.dependents}</strong> dependents</span>
        </div>
        <div className="district-occupancy" aria-label="District population and housing">
          {DISTRICTS.map((district) => {
            const occupied = state.population.districts[district.id] ?? 0
            const capacity = forecast.population.capacity.districts[district.id]
            return (
              <div key={district.id}>
                <span>{district.name}</span><strong>{occupied}/{capacity}</strong>
                <i><b style={{ width: `${capacity ? Math.min(100, occupied / capacity * 100) : 0}%` }} /></i>
              </div>
            )
          })}
        </div>
      </section>
      <section className="viability-section" aria-label="City viability">
        <div className="section-heading"><p className="eyebrow">Population, services, and works</p><h2>City viability</h2></div>
        <div className="viability-score"><strong>{cityViability.score}</strong><span>{cityViability.status}</span></div>
        <div className="viability-components">
          <span><b>{cityViability.populationStability}</b> Population</span>
          <span><b>{cityViability.essentialServices}</b> Services</span>
          <span><b>{cityViability.physicalFoundation}</b> Foundation</span>
        </div>
        <p>{cityViability.recoveryCue}</p>
      </section>
      <LaborAllocationPanel state={state} onAllocate={onAllocate} />
      <section className="forecast-section">
        <div className="section-heading"><p className="eyebrow">Before events</p><h2>Season forecast</h2></div>
        <div className="capacity-line"><span>Public works</span><strong>{forecast.actionsRemaining}/{state.actionsMax} capacity</strong></div>
        <div className="forecast-deltas">
          {Object.entries(forecast.resourceDelta).filter(([, value]) => value !== 0).map(([key, value]) => (
            <span key={key} className={value < 0 ? 'negative' : 'positive'}>{key} {value > 0 ? '+' : ''}{value}</span>
          ))}
        </div>
        <div className="pressure-notes">
          {forecast.pressures.notes.length
            ? forecast.pressures.notes.map((note) => <p key={note}>{note}</p>)
            : <p>No structural penalty is forecast.</p>}
        </div>
        <div className="risk-watch" aria-label="Highest district hazards">
          {highestRisks.map((risk) => <div key={risk.districtId}><span>{risk.name}</span><strong>F {risk.fire} · D {risk.disease} · W {risk.flood}</strong></div>)}
        </div>
        <div className="population-forecast">
          {forecast.population.reasons.map((reason) => (
            <div key={reason.key} title={reason.detail}>
              <span>{reason.label}</span><strong className={reason.key === 'births' || reason.key === 'arrivals' ? 'positive' : reason.value ? 'negative' : ''}>{reason.key === 'births' || reason.key === 'arrivals' ? '+' : reason.value ? '-' : ''}{reason.value}</strong>
            </div>
          ))}
        </div>
      </section>
      <section className="metric-section">
        <div className="section-heading"><p className="eyebrow">City condition</p><h2>Civic balance</h2></div>
        <div className="metric-list">
          {Object.entries(state.metrics).map(([key, value]) => (
            <div className="metric-row" key={key}>
              <div><span>{METRIC_META[key].short}</span><strong>{Math.round(value)}</strong></div>
              <div className="meter" aria-label={`${METRIC_META[key].label}: ${Math.round(value)} out of 100`}><i style={{ width: `${value}%` }} /></div>
            </div>
          ))}
        </div>
      </section>
      <section className="faction-section">
        <div className="section-heading"><p className="eyebrow">Consent and resistance</p><h2>Interests</h2></div>
        <div className="faction-list">
          {Object.entries(state.factions).map(([key, value]) => (
            <div className="faction-row" key={key} title={FACTIONS[key].motive}>
              <span>{FACTIONS[key].name}</span><strong className={value < 35 ? 'low' : value > 65 ? 'high' : ''}>{Math.round(value)}</strong>
            </div>
          ))}
        </div>
      </section>
    </aside>
  )
}

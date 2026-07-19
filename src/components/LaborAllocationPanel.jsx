import { Landmark, Minus, Plus } from 'lucide-react'
import { getDistrict } from '../game/data.js'
import { workforceSummary } from '../game/simulation.js'

const LANES = {
  farming: { label: 'Fields', detail: 'Grain and household subsistence' },
  works: { label: 'Public works', detail: 'Construction, repair, and projects' },
  levy: { label: 'Levy', detail: 'Watch duty and campaign readiness' },
}

export function LaborAllocationPanel({ state, onAllocate }) {
  const summary = workforceSummary(state)
  const projectCrews = (state.projects ?? []).map((project) => `${project.name} - ${getDistrict(project.districtId).name} - public works crews`)
  return (
    <section className="labor-section" aria-labelledby="labor-title">
      <div className="section-heading"><p className="eyebrow">Seasonal obligations</p><h2 id="labor-title">Workforce</h2></div>
      <p className="labor-total">
        {summary.eligible.toLocaleString()} eligible · {summary.allocatable.toLocaleString()} allocatable after {summary.ritual.count} in ritual service
      </p>
      <div className="labor-lanes">
        {Object.entries(LANES).map(([key, lane]) => (
          <div className="labor-lane" key={key}>
            <div><strong>{lane.label}</strong><span>{summary.counts[key]} people</span></div>
            <small>{lane.detail}</small>
            <div className="labor-stepper">
              <button type="button" onClick={() => onAllocate(key, -5)} disabled={summary.allocation[key] <= 10} aria-label={`Reduce ${lane.label} allocation`}><Minus /></button>
              <b>{summary.allocation[key]}%</b>
              <button type="button" onClick={() => onAllocate(key, 5)} disabled={summary.allocation[key] >= 80} aria-label={`Increase ${lane.label} allocation`}><Plus /></button>
            </div>
          </div>
        ))}
        <div className="labor-lane ritual-lane">
          <div><strong><Landmark /> Ritual service</strong><span>{summary.ritual.count} people</span></div>
          <small>Reserved before seasonal percentages for shrines, festivals, and temple obligations</small>
          {summary.ritual.obligations.length > 0 && (
            <div className="labor-obligations">
              {summary.ritual.obligations.map((obligation) => <span key={`${obligation.label}-${obligation.districtId}`}>{obligation.label} · {getDistrict(obligation.districtId).name} · {obligation.interest}</span>)}
            </div>
          )}
        </div>
      </div>
      {projectCrews.length > 0 && <p className="project-crews"><strong>Project crews:</strong> {projectCrews.join(' · ')}</p>}
      <div className="labor-consequences">
        <span>Works capacity <strong>{summary.constructionCapacity}</strong></span>
        <span>Grain <strong className={summary.grainYield < 0 ? 'negative' : 'positive'}>{summary.grainYield >= 0 ? '+' : ''}{summary.grainYield}</strong></span>
        <span>Readiness <strong className={summary.readinessDelta < 0 ? 'negative' : summary.readinessDelta > 0 ? 'positive' : ''}>{summary.readinessDelta >= 0 ? '+' : ''}{summary.readinessDelta}</strong></span>
      </div>
    </section>
  )
}

import { Droplets, Route, Shield, Swords, Users, Warehouse, Wrench } from 'lucide-react'
import { ITALIAN_PROJECTS } from '../game/data.js'
import { italianForecast, italianProjectAvailability } from '../game/simulation.js'

const MEASURES = [
  ['samnitePressure', 'Samnite pressure', Swords, true],
  ['allianceDepth', 'Alliance depth', Users, false],
  ['campaignPersistence', 'Persistence', Shield, false],
  ['reserveDepth', 'Reserve depth', Warehouse, false],
  ['coalitionRisk', 'Coalition risk', Swords, true],
  ['pyrrhicPressure', 'Pyrrhic pressure', Shield, true],
  ['waterCapacity', 'Water capacity', Droplets, false],
  ['maintenanceDebt', 'Maintenance', Wrench, true],
]

export function RoadsToItalyPanel({ state, onWork }) {
  if (!state.italian) return null
  const forecast = italianForecast(state)
  return (
    <section className="italian-panel" aria-labelledby="italian-panel-title">
      <div className="italian-heading">
        <div>
          <p className="eyebrow">Italian system</p>
          <h2 id="italian-panel-title">Roads to Italy</h2>
        </div>
        <Route aria-hidden="true" />
      </div>
      <div className="italian-measures">
        {MEASURES.map(([key, label, Icon, adverse]) => (
          <div key={key} className={adverse && state.italian[key] >= 55 ? 'adverse' : ''}>
            <span><Icon aria-hidden="true" /> {label}</span>
            <strong>{state.italian[key]}</strong>
          </div>
        ))}
      </div>
      <div className="appian-projects" aria-label="Appian public works">
        {Object.values(ITALIAN_PROJECTS).map((definition) => {
          const project = state.italian.projects[definition.id]
          const availability = italianProjectAvailability(state, definition.id)
          const percent = Math.round(project.progress / project.requiredSeasons * 100)
          return (
            <div className="appian-project" key={definition.id}>
              <div><strong>{definition.name}</strong><span>{project.progress} / {project.requiredSeasons} seasons</span></div>
              <div className="appian-progress" aria-label={`${definition.name}: ${percent}% complete`}><i style={{ width: `${percent}%` }} /></div>
              <button type="button" onClick={() => onWork(definition.id)} disabled={!availability.ok} title={availability.ok ? `Commit one season to ${definition.name}` : availability.reason}>
                {project.completed ? 'Complete' : 'Commit crews'}
              </button>
            </div>
          )
        })}
      </div>
      <p className="italian-forecast">{forecast?.notes[0]}</p>
    </section>
  )
}

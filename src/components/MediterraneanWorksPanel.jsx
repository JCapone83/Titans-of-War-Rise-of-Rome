import { MEDITERRANEAN_PROJECTS } from '../game/data.js'
import { mediterraneanProjectAvailability } from '../game/simulation.js'

export function MediterraneanWorksPanel({ state, onWork }) {
  if (!state.mediterranean) return null
  const projects = Object.values(MEDITERRANEAN_PROJECTS)
  return <section className="mediterranean-works-panel" aria-labelledby="public-works-title">
    <div className="italian-heading"><div><p className="eyebrow">City systems</p><h2 id="public-works-title">Republican public works</h2></div></div>
    <p className="works-intro">Bounded multi-season works share the ordinary seasonal crews, stores, and treasury. Each completed work leaves a service burden in the Mediterranean forecast.</p>
    <div className="public-works-list">{projects.map((definition) => {
      const project = state.mediterranean.projects?.[definition.id]
      const availability = mediterraneanProjectAvailability(state, definition.id)
      return <article key={definition.id} className={project?.completed ? 'public-work complete' : 'public-work'}>
        <div><strong>{definition.name}</strong><span>{project?.completed ? 'Complete' : `${project?.progress ?? 0}/${definition.seasons} seasons`}</span></div>
        <p>{definition.summary}</p>
        {!project?.completed && <button type="button" onClick={() => onWork(definition.id)} disabled={!availability.available}>{availability.available ? 'Commit crews' : availability.reason}</button>}
      </article>
    })}</div>
  </section>
}

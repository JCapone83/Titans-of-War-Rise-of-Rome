import { METROPOLITAN_PROJECTS } from '../game/data.js'
import { metropolitanProjectAvailability } from '../game/simulation.js'

export function MetropolitanWorksPanel({ state, onWork }) {
  if (!state.metropolitan) return null
  const projects = Object.values(METROPOLITAN_PROJECTS)
  return <section className="mediterranean-works-panel" aria-labelledby="metropolitan-works-title">
    <div className="italian-heading"><div><p className="eyebrow">Metropolitan systems</p><h2 id="metropolitan-works-title">Metropolitan public works</h2></div></div>
    <p className="works-intro">Each work consumes ordinary seasonal crews and materials. Completion creates civic capacity and a permanent operating obligation.</p>
    <div className="public-works-list">{projects.map((definition) => {
      const project = state.metropolitan.projects?.[definition.id]
      const availability = metropolitanProjectAvailability(state, definition.id)
      return <article key={definition.id} className={project?.completed ? 'public-work complete' : 'public-work'}>
        <div><strong>{definition.name}</strong><span>{project?.completed ? 'Complete' : `${project?.progress ?? 0}/${definition.seasons} seasons`}</span></div>
        <p>{definition.summary}</p>
        {!project?.completed && <button type="button" onClick={() => onWork(definition.id)} disabled={!availability.available}>{availability.available ? 'Commit crews' : availability.reason}</button>}
      </article>
    })}</div>
  </section>
}

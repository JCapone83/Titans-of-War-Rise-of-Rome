import { REPUBLIC_STRAIN_PROJECTS, TURN_YEARS } from '../game/data.js'
import { republicStrainProjectAvailability } from '../game/simulation.js'

export function RepublicStrainWorksPanel({ state, onWork }) {
  if (!state.republicStrain) return null
  const projects = Object.values(REPUBLIC_STRAIN_PROJECTS)
  return <section className="mediterranean-works-panel" aria-labelledby="republic-strain-works-title">
    <div className="italian-heading"><div><p className="eyebrow">Civic capacity</p><h2 id="republic-strain-works-title">Late-Republic works</h2></div></div>
    <p className="works-intro">Dated projects turn legal settlements into physical capacity. Every completion creates a continuing operating charge.</p>
    <div className="public-works-list">{projects.map((definition) => {
      const project = state.republicStrain.projects?.[definition.id]
      const availability = republicStrainProjectAvailability(state, definition.id)
      return <article key={definition.id} className={project?.completed ? 'public-work complete' : 'public-work'}>
        <div><strong>{definition.name}</strong><span>{project?.completed ? 'Complete' : `${project?.progress ?? 0}/${definition.seasons} seasons`}</span></div>
        <small>Available {TURN_YEARS[definition.unlockTurn - 1]} BC</small>
        <p>{definition.summary}</p>
        {!project?.completed && <button type="button" onClick={() => onWork(definition.id)} disabled={!availability.available}>{availability.available ? 'Commit crews' : availability.reason}</button>}
      </article>
    })}</div>
  </section>
}

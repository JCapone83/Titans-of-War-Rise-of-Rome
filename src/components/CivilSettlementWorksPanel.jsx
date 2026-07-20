import { CIVIL_SETTLEMENT_PROJECTS, TURN_YEARS } from '../game/data.js'
import { civilSettlementProjectAvailability } from '../game/simulation.js'

export function CivilSettlementWorksPanel({ state, onWork }) {
  if (!state.civilSettlement) return null
  return <section className="mediterranean-works-panel" aria-labelledby="civil-settlement-works-title">
    <div className="italian-heading"><div><p className="eyebrow">Civic core and demobilization</p><h2 id="civil-settlement-works-title">Settlement works</h2></div></div>
    <p className="works-intro">Playable stages span irregular historical intervals. Completion means operating capacity, not an instantly finished or permanently pristine monument.</p>
    <div className="public-works-list">{Object.values(CIVIL_SETTLEMENT_PROJECTS).map((definition) => {
      const project = state.civilSettlement.projects?.[definition.id]
      const availability = civilSettlementProjectAvailability(state, definition.id)
      return <article key={definition.id} className={project?.completed ? 'public-work complete' : 'public-work'}>
        <div><strong>{definition.name}</strong><span>{project?.completed ? 'Operating' : `${project?.progress ?? 0}/${definition.seasons} stages`}</span></div>
        <small>Available {TURN_YEARS[definition.unlockTurn - 1]} BC</small>
        <p>{definition.summary}</p>
        {!project?.completed && <button type="button" onClick={() => onWork(definition.id)} disabled={!availability.available}>{availability.available ? 'Commit crews' : availability.reason}</button>}
      </article>
    })}</div>
  </section>
}

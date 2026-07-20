import { CIVIL_SETTLEMENT_PROJECTS, TURN_YEARS } from '../game/data.js'
import { artForCivilSettlementProject, civilSettlementProjectStage } from '../game/projectArt.js'
import { civilSettlementProjectAvailability } from '../game/simulation.js'

export function CivilSettlementWorksPanel({ state, onWork }) {
  if (!state.civilSettlement) return null
  return <section className="mediterranean-works-panel civil-settlement-works" aria-labelledby="civil-settlement-works-title">
    <div className="italian-heading"><div><p className="eyebrow">Civic core and demobilization</p><h2 id="civil-settlement-works-title">Settlement works</h2></div></div>
    <p className="works-intro">Playable stages span irregular historical intervals. Completion means operating capacity, not an instantly finished or permanently pristine monument.</p>
    <div className="public-works-list">{Object.values(CIVIL_SETTLEMENT_PROJECTS).map((definition) => {
      const project = state.civilSettlement.projects?.[definition.id]
      const availability = civilSettlementProjectAvailability(state, definition.id)
      const art = artForCivilSettlementProject(definition.id)
      const progress = Math.min(definition.seasons, Math.max(0, project?.progress ?? 0))
      const stage = civilSettlementProjectStage(project, definition)
      const percent = Math.round(progress / definition.seasons * 100)
      return <article key={definition.id} className={project?.completed ? 'public-work complete' : 'public-work'}>
        <figure className="civil-project-art" data-stage={stage.key}>
          <img src={art.src} alt={art.alt} loading="lazy" />
          <figcaption><span>{art.evidence}</span><strong>{stage.label}</strong></figcaption>
        </figure>
        <div className="public-work-heading"><strong>{definition.name}</strong><span>{project?.completed ? 'Operating' : `${progress}/${definition.seasons} stages`}</span></div>
        <small>Available {TURN_YEARS[definition.unlockTurn - 1]} BC</small>
        <p>{definition.summary}</p>
        <div className="project-stage-meter" role="progressbar" aria-label={`${definition.name}: ${stage.label}, ${progress} of ${definition.seasons} stages`} aria-valuemin="0" aria-valuemax={definition.seasons} aria-valuenow={progress}><i style={{ width: `${percent}%` }} /></div>
        {!project?.completed && <button type="button" onClick={() => onWork(definition.id)} disabled={!availability.available}>{availability.available ? 'Commit crews' : availability.reason}</button>}
      </article>
    })}</div>
  </section>
}


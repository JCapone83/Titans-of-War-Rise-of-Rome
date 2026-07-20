import { TRAJANIC_CAPITAL_PROJECTS, TURN_YEARS, formatYear } from '../game/data.js'
import { civilSettlementProjectStage } from '../game/projectArt.js'
import { trajanicProjectAvailability } from '../game/simulation.js'

export function TrajanicWorksPanel({ state, onWork }) {
  if (!state.trajanicCapital) return null
  return <section className="mediterranean-works-panel trajanic-works" aria-labelledby="trajanic-works-title">
    <div className="italian-heading"><div><p className="eyebrow">Expansion creates a permanent account</p><h2 id="trajanic-works-title">Trajanic works</h2></div></div>
    <p className="works-intro">Each work joins material construction to staff, supply, access, inspection, and repair. Evidence labels distinguish the secure form of a complex from uncertain internal arrangements and phasing.</p>
    <div className="public-works-list">{Object.values(TRAJANIC_CAPITAL_PROJECTS).map((definition) => {
      const project = state.trajanicCapital.projects?.[definition.id]
      const availability = trajanicProjectAvailability(state, definition.id)
      const progress = Math.min(definition.seasons, Math.max(0, project?.progress ?? 0))
      const stage = civilSettlementProjectStage(project, definition)
      const percent = Math.round(progress / definition.seasons * 100)
      return <article key={definition.id} className={project?.completed ? 'public-work complete' : 'public-work'}>
        <div className="imperial-project-stage" data-stage={stage.key}><span>{definition.evidence}</span><strong>{stage.label}</strong></div>
        <div className="public-work-heading"><strong>{definition.name}</strong><span>{project?.completed ? 'Operating' : `${progress}/${definition.seasons} stages`}</span></div>
        <small>Available {formatYear(TURN_YEARS[definition.unlockTurn - 1])}</small>
        <p>{definition.summary}</p>
        <div className="project-stage-meter" role="progressbar" aria-label={`${definition.name}: ${stage.label}, ${progress} of ${definition.seasons} stages`} aria-valuemin="0" aria-valuemax={definition.seasons} aria-valuenow={progress}><i style={{ width: `${percent}%` }} /></div>
        <small className="project-burden">Recurring burden: {definition.burdenLabel}</small>
        {!project?.completed && <button type="button" onClick={() => onWork(definition.id)} disabled={!availability.available}>{availability.available ? 'Commit crews' : availability.reason}</button>}
      </article>
    })}</div>
  </section>
}

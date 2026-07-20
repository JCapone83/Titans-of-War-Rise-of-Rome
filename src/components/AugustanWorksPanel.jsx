import { AUGUSTAN_PROJECTS, TURN_YEARS, formatYear } from '../game/data.js'
import { artForAugustanProject, augustanProjectStage } from '../game/projectArt.js'
import { augustanProjectAvailability } from '../game/simulation.js'

export function AugustanWorksPanel({ state, onWork }) {
  if (!state.augustanCity) return null
  return <section className="mediterranean-works-panel augustan-works" aria-labelledby="augustan-works-title">
    <div className="italian-heading"><div><p className="eyebrow">Memory must operate</p><h2 id="augustan-works-title">Augustan works</h2></div></div>
    <p className="works-intro">Each image is labeled by evidence status. Progress means reserved site, foundations and service, structural form, then an operating institution with recurring costs.</p>
    <div className="public-works-list">{Object.values(AUGUSTAN_PROJECTS).map((definition) => {
      const project = state.augustanCity.projects?.[definition.id]
      const availability = augustanProjectAvailability(state, definition.id)
      const art = artForAugustanProject(definition.id)
      const progress = Math.min(definition.seasons, Math.max(0, project?.progress ?? 0))
      const stage = augustanProjectStage(project, definition)
      const percent = Math.round(progress / definition.seasons * 100)
      return <article key={definition.id} className={project?.completed ? 'public-work complete' : 'public-work'}>
        <figure className="civil-project-art" data-stage={stage.key}>
          <img src={art.src} alt={art.alt} loading="lazy" />
          <figcaption><span>{art.evidence}</span><strong>{stage.label}</strong></figcaption>
        </figure>
        <div className="public-work-heading"><strong>{definition.name}</strong><span>{project?.completed ? 'Operating' : `${progress}/${definition.seasons} stages`}</span></div>
        <small>Available {formatYear(TURN_YEARS[definition.unlockTurn - 1])}</small>
        <p>{definition.summary}</p>
        <div className="project-stage-meter" role="progressbar" aria-label={`${definition.name}: ${stage.label}, ${progress} of ${definition.seasons} stages`} aria-valuemin="0" aria-valuemax={definition.seasons} aria-valuenow={progress}><i style={{ width: `${percent}%` }} /></div>
        {!project?.completed && <button type="button" onClick={() => onWork(definition.id)} disabled={!availability.available}>{availability.available ? 'Commit crews' : availability.reason}</button>}
      </article>
    })}</div>
  </section>
}

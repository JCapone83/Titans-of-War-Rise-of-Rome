import { IMPERIAL_CAPITAL_PROJECTS, TURN_YEARS, formatYear } from '../game/data.js'
import { artForImperialProject, civilSettlementProjectStage } from '../game/projectArt.js'
import { imperialProjectAvailability } from '../game/simulation.js'

export function ImperialWorksPanel({ state, onWork }) {
  if (!state.imperialCapital) return null
  return <section className="mediterranean-works-panel imperial-works" aria-labelledby="imperial-works-title">
    <div className="italian-heading"><div><p className="eyebrow">Glory creates obligations</p><h2 id="imperial-works-title">Imperial works</h2></div></div>
    <p className="works-intro">The Flavian Amphitheatre is this act's central public conversion: a monumental arena opened to the city while its permanent substructures were still developing. Approved project art carries evidence status and construction stages; final illustrated reconstructions remain a separate visual-production gate.</p>
    <div className="public-works-list">{Object.values(IMPERIAL_CAPITAL_PROJECTS).map((definition) => {
      const project = state.imperialCapital.projects?.[definition.id]
      const availability = imperialProjectAvailability(state, definition.id)
      const progress = Math.min(definition.seasons, Math.max(0, project?.progress ?? 0))
      const stage = civilSettlementProjectStage(project, definition)
      const percent = Math.round(progress / definition.seasons * 100)
      const art = artForImperialProject(definition.id)
      return <article key={definition.id} className={project?.completed ? 'public-work complete' : 'public-work'}>
        {art ? <figure className="civil-project-art" data-stage={stage.key}>
          <img src={art.src} alt={art.alt} />
          <figcaption><span>{art.evidence}</span><strong>{stage.label}</strong></figcaption>
        </figure> : <div className="imperial-project-stage" data-stage={stage.key}><span>{definition.evidence}</span><strong>{stage.label}</strong></div>}
        <div className="public-work-heading"><strong>{definition.name}</strong><span>{project?.completed ? 'Operating' : project?.opened ? 'Open · substructure work continues' : `${progress}/${definition.seasons} stages`}</span></div>
        <small>Available {formatYear(TURN_YEARS[definition.unlockTurn - 1])}</small>
        <p>{definition.summary}</p>
        <div className="project-stage-meter" role="progressbar" aria-label={`${definition.name}: ${stage.label}, ${progress} of ${definition.seasons} stages`} aria-valuemin="0" aria-valuemax={definition.seasons} aria-valuenow={progress}><i style={{ width: `${percent}%` }} /></div>
        <small className="project-burden">Recurring burden: {definition.burdenLabel}</small>
        {!project?.completed && <button type="button" onClick={() => onWork(definition.id)} disabled={!availability.available}>{availability.available ? 'Commit crews' : availability.reason}</button>}
      </article>
    })}</div>
  </section>
}

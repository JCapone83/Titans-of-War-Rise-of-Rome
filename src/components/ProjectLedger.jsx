import { Hammer, Pause, Play } from 'lucide-react'
import { getDistrict } from '../game/data.js'
import { projectAvailability } from '../game/simulation.js'

export function ProjectLedger({ state, onContinue }) {
  if (!(state.projects ?? []).length) return null
  return (
    <section className="project-ledger" aria-labelledby="project-ledger-title">
      <div className="project-ledger-heading">
        <div><p className="eyebrow">Works in progress</p><h2 id="project-ledger-title">Major Projects</h2></div>
        <span><Hammer /> {(state.projects ?? []).length} active</span>
      </div>
      <div className="project-list">
        {state.projects.map((project) => {
          const availability = projectAvailability(state, project.projectId)
          const percent = project.progress / project.requiredSeasons * 100
          return (
            <article key={project.projectId}>
              <div className="project-title"><strong>{project.name}</strong><span>{getDistrict(project.districtId).name}</span></div>
              <div className="project-progress" aria-label={`${project.name}: ${project.progress} of ${project.requiredSeasons} work seasons`}><i style={{ width: `${percent}%` }} /></div>
              <div className="project-status">
                <span>{project.progress}/{project.requiredSeasons} seasons</span>
                <span>{project.lastWorkedTurn === state.turn ? <><Pause /> Crew assigned</> : <><Play /> Ready to resume</>}</span>
              </div>
              <button type="button" className="secondary-button" onClick={() => onContinue(project.projectId)} disabled={!availability.ok} title={availability.reason ?? 'Assign one seasonal works capacity'}><Play /> Continue</button>
            </article>
          )
        })}
      </div>
    </section>
  )
}

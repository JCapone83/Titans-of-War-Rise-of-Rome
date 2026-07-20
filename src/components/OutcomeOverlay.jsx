import { Download, RotateCcw } from 'lucide-react'

export function OutcomeOverlay({ outcome, onExport, onRestart, onContinue, continueLabel = 'Continue to the Mediterranean' }) {
  if (!outcome) return null
  return (
    <div className="overlay outcome-overlay">
      <section className="outcome-modal" role="dialog" aria-modal="true" aria-labelledby="outcome-title">
        <p className="eyebrow">Campaign complete</p>
        <h2 id="outcome-title">{outcome.title}</h2>
        <p className="outcome-summary">{outcome.summary}</p>
        <div className="overall-score"><span>Overall</span><strong>{outcome.overall}</strong></div>
        <div className="grade-grid">
          {Object.entries(outcome.grades).map(([name, value]) => (
            <div key={name}><strong>{value.grade}</strong><span>{name}</span><small>{value.score}/100</small></div>
          ))}
        </div>
        {outcome.capitalLegacy && <section className="capital-legacy" aria-labelledby="capital-legacy-title">
          <div><p className="eyebrow">Capital legacy</p><h3 id="capital-legacy-title">{outcome.capitalLegacy.operatingForm}</h3></div>
          <p>{outcome.capitalLegacy.completed} landmark works operating · {outcome.capitalLegacy.active} still under construction</p>
          <div className="capital-legacy-systems">
            {outcome.capitalLegacy.systems.map((system) => <span key={system.id}><strong>{system.score}</strong><small>{system.name}</small><i>{system.status}</i></span>)}
          </div>
        </section>}
        <div className="outcome-actions">
          <button className="primary-button" onClick={onExport}><Download /> Export chronicle</button>
          {onContinue && <button className="secondary-button" onClick={onContinue}><RotateCcw /> {continueLabel}</button>}
          <button className="secondary-button" onClick={onRestart}><RotateCcw /> Begin again</button>
        </div>
      </section>
    </div>
  )
}

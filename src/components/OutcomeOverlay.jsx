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
        <div className="outcome-actions">
          <button className="primary-button" onClick={onExport}><Download /> Export chronicle</button>
          {onContinue && <button className="secondary-button" onClick={onContinue}><RotateCcw /> {continueLabel}</button>}
          <button className="secondary-button" onClick={onRestart}><RotateCcw /> Begin again</button>
        </div>
      </section>
    </div>
  )
}

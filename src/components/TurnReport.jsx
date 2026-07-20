import { ArrowRight, X } from 'lucide-react'
import { formatYear } from '../game/data.js'

export function TurnReport({ report, onClose }) {
  if (!report) return null
  const deltas = Object.entries(report.resourceDelta).filter(([, value]) => value !== 0)
  return (
    <div className="overlay" role="presentation">
      <section className="report-modal" role="dialog" aria-modal="true" aria-labelledby="report-title">
        <button className="close-button" onClick={onClose} aria-label="Close season report"><X /></button>
        <p className="eyebrow">Season report · {formatYear(report.year)}</p>
        <h2 id="report-title">{report.title}</h2>
        <p className="report-lead">{report.text}</p>
        {report.resolvedRisk !== null && <p className="resolved-risk">{report.riskLabel ?? 'Resolved risk'}: <strong>{report.resolvedRisk}/100</strong></p>}
        {report.notes.length > 1 && <ul>{report.notes.slice(1).map((note) => <li key={note}>{note}</li>)}</ul>}
        <div className="report-deltas">
          {deltas.map(([key, value]) => <span key={key} className={value < 0 ? 'negative' : 'positive'}>{key} {value > 0 ? '+' : ''}{value}</span>)}
        </div>
        {report.workforce && <p className="report-workforce">Seasonal obligations: {report.workforce.counts.farming} on the fields, {report.workforce.counts.works} on public works, and {report.workforce.counts.levy} in levy rotation.</p>}
        {report.populationChange && (
          <div className="report-population">
            <div><span>Population</span><strong>{report.populationTotal.toLocaleString()}</strong></div>
            <div className="report-population-causes">
              <span className="positive">births +{report.populationChange.births}</span>
              <span className="positive">arrivals +{report.populationChange.arrivals}</span>
              <span className={report.populationChange.departures ? 'negative' : ''}>departures -{report.populationChange.departures}</span>
              <span className={report.populationChange.illness ? 'negative' : ''}>illness -{report.populationChange.illness}</span>
              {report.populationChange.eventLosses > 0 && <span className="negative">crisis -{report.populationChange.eventLosses}</span>}
            </div>
          </div>
        )}
        <button className="primary-button" onClick={onClose}>Continue <ArrowRight /></button>
      </section>
    </div>
  )
}

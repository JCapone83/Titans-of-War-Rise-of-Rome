import { Flag, Landmark, Scale, ShieldCheck, Users } from 'lucide-react'
import { gallicReadiness, republicForecast, warForecast } from '../game/simulation.js'

const MEASURES = [
  { key: 'magistrateAuthority', label: 'Magistrates', icon: ShieldCheck, inverse: false },
  { key: 'senateStanding', label: 'Senate credit', icon: Landmark, inverse: false },
  { key: 'assemblyConsent', label: 'Assembly consent', icon: Users, inverse: false },
  { key: 'debtStrain', label: 'Debt strain', icon: Scale, inverse: true },
  { key: 'levyBurden', label: 'Levy burden', icon: ShieldCheck, inverse: true },
]

export function RepublicPanel({ state }) {
  if (!state.republic) return null
  const forecast = republicForecast(state)
  const war = warForecast(state)
  const gallic = gallicReadiness(state)
  const mode = state.flags?.magistrateMode ?? 'unsettled'
  return (
    <section className="republic-panel" aria-labelledby="republic-title">
      <div className="section-heading"><p className="eyebrow">Government after kings</p><h2 id="republic-title">Republican balance</h2></div>
      <p className="office-mode">Annual command: <strong>{mode}</strong></p>
      <div className="republic-measures">
        {MEASURES.map(({ key, label, icon: Icon, inverse }) => {
          const value = state.republic[key]
          const delta = forecast?.changes[key] ?? 0
          const adverse = inverse ? value >= 55 : value < 35
          return (
            <div className={adverse ? 'republic-measure adverse' : 'republic-measure'} key={key}>
              <div><span><Icon />{label}</span><strong>{Math.round(value)}{delta ? ` ${delta > 0 ? '+' : ''}${delta}` : ''}</strong></div>
              <i><b style={{ width: `${value}%` }} /></i>
            </div>
          )
        })}
      </div>
      <div className="republic-notes">
        {forecast?.notes.map((note) => <p key={note}>{note}</p>)}
      </div>
      {state.flags?.tribunesEstablished && <p className="institution-tag">Tribunes established</p>}
      {state.war && state.era < 3 && (
        <div className="war-commitments" aria-label="War commitments">
          <div className="war-heading"><Flag /><strong>War commitments</strong>{state.turn === 16 && <span>{gallic?.posture}</span>}</div>
          <div className="war-grid">
            <span>Veii pressure <strong>{Math.round(state.war.veiiPressure)}</strong></span>
            <span>Siege persistence <strong>{Math.round(state.war.siegePersistence)}</strong></span>
            <span>Veteran cohesion <strong>{Math.round(state.war.veteranCohesion)}</strong></span>
            <span>Land expectations <strong>{Math.round(state.war.landExpectations)}</strong></span>
          </div>
          <p>{war?.notes[0]}</p>
          {state.turn === 16 && <p>Gallic readiness: <strong>{gallic?.score}/100</strong>. This records preparation; Act IV will resolve the crisis.</p>}
        </div>
      )}
    </section>
  )
}

import { FileWarning, Flame, Hammer, House, Shield, Users } from 'lucide-react'
import { reconstructionForecast } from '../game/simulation.js'

const MEASURES = [
  { key: 'devastation', label: 'Devastation', icon: Hammer, inverse: true },
  { key: 'displaced', label: 'Displaced', icon: House, inverse: true },
  { key: 'recordsIntegrity', label: 'Records', icon: FileWarning, inverse: false },
  { key: 'fireExposure', label: 'Fire exposure', icon: Flame, inverse: true },
  { key: 'wallUrgency', label: 'Wall urgency', icon: Shield, inverse: true },
  { key: 'latinTrust', label: 'Latin trust', icon: Users, inverse: false },
]

export function ReconstructionPanel({ state }) {
  if (!state.reconstruction) return null
  const forecast = reconstructionForecast(state)
  return (
    <section className="reconstruction-panel" aria-labelledby="reconstruction-title">
      <div className="section-heading"><p className="eyebrow">After the Gallic crisis</p><h2 id="reconstruction-title">Reconstruction ledger</h2></div>
      <p className="crisis-posture">Crisis inherited: <strong>{state.reconstruction.crisisPosture}</strong></p>
      <div className="reconstruction-grid">
        {MEASURES.map(({ key, label, icon: Icon, inverse }) => {
          const value = state.reconstruction[key]
          const delta = forecast?.changes[key] ?? 0
          const adverse = inverse ? value >= 55 : value < 40
          return (
            <div className={adverse ? 'reconstruction-measure adverse' : 'reconstruction-measure'} key={key}>
              <span><Icon />{label}</span>
              <strong>{Math.round(value)}{delta ? ` ${delta > 0 ? '+' : ''}${delta}` : ''}</strong>
            </div>
          )
        })}
      </div>
      <div className="reconstruction-notes">{forecast?.notes.map((note) => <p key={note}>{note}</p>)}</div>
      {state.flags?.reconstructionPolicy && <p className="institution-tag">{state.flags.reconstructionPolicy} reconstruction</p>}
    </section>
  )
}

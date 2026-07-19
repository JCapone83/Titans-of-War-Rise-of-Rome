import { ArrowRight, X } from 'lucide-react'
import { useState } from 'react'

const STEPS = [
  ['Choose a district', 'The map is the city. Select a hill or river district before placing a work. Terrain changes what fits and what performs well.'],
  ['Balance before building', 'Resources are spent immediately. Civic measures improve with construction, but mismatched growth creates pressure at season end.'],
  ['Hear the council', 'Odd-numbered turns present a political decision. A season cannot end until the council reaches a decision.'],
  ['Advance the era', 'Drainage, craft, and public authority unlock more durable Tier II forms after turn five.'],
  ['Read the record', 'Historical context marks Roman tradition, archaeology, and inference separately. Final grades reward several kinds of judgment.'],
]

export function WalkthroughOverlay({ open, onClose }) {
  const [step, setStep] = useState(0)
  if (!open) return null
  const [title, text] = STEPS[step]
  return (
    <div className="overlay walkthrough-overlay">
      <section className="walkthrough-modal" role="dialog" aria-modal="true" aria-labelledby="walkthrough-title">
        <button className="close-button" onClick={onClose} aria-label="Close walkthrough"><X /></button>
        <p className="eyebrow">Field guide · {step + 1} of {STEPS.length}</p>
        <h2 id="walkthrough-title">{title}</h2>
        <p>{text}</p>
        <div className="walkthrough-dots">{STEPS.map((_, index) => <i key={index} className={index === step ? 'active' : ''} />)}</div>
        {step < STEPS.length - 1
          ? <button className="primary-button" onClick={() => setStep(step + 1)}>Next <ArrowRight /></button>
          : <button className="primary-button" onClick={onClose}>Enter the settlement <ArrowRight /></button>}
      </section>
    </div>
  )
}

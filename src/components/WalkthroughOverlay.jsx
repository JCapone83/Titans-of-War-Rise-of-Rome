import { ArrowRight, BookOpen, Hammer, Landmark, SkipForward, X } from 'lucide-react'

const STEPS = [
  { icon: Hammer, title: 'Build', text: 'Choose a district and establish a work that answers the current charge.' },
  { icon: Landmark, title: 'Decide', text: 'When a council meets, choose one political course before the season can end.' },
  { icon: SkipForward, title: 'Advance', text: 'Review the forecast, end the season, and read the report before continuing.' },
]

export function WalkthroughOverlay({ open, onClose, onStartGuide }) {
  if (!open) return null
  return (
    <div className="overlay walkthrough-overlay">
      <section className="walkthrough-modal" role="dialog" aria-modal="true" aria-labelledby="walkthrough-title">
        <button className="close-button" onClick={onClose} aria-label="Close walkthrough"><X /></button>
        <p className="eyebrow">Field guide</p>
        <h2 id="walkthrough-title">Your first turn</h2>
        <p>Rome grows through one repeatable loop. The guide will point to the real controls while you play.</p>
        <ol className="walkthrough-loop">
          {STEPS.map(({ icon: Icon, title, text }, index) => (
            <li key={title}><span>{index + 1}</span><Icon /><div><strong>{title}</strong><p>{text}</p></div></li>
          ))}
        </ol>
        <p className="walkthrough-history"><BookOpen /> Historical knowledge is optional and separates tradition, archaeology, and inference.</p>
        <div className="walkthrough-actions">
          <button className="primary-button" onClick={onStartGuide}>Guide my first turn <ArrowRight /></button>
          <button className="secondary-button" onClick={onClose}>Explore on my own</button>
        </div>
      </section>
    </div>
  )
}

import { X } from 'lucide-react'
import { notesForTurn } from '../game/historicalContext.js'

export function HistoricalContextPanel({ open, turn, consulted, onConsult, onClose }) {
  if (!open) return null
  const notes = notesForTurn(turn)
  return (
    <div className="drawer-overlay" onMouseDown={onClose}>
      <aside className="history-drawer" role="dialog" aria-modal="true" aria-labelledby="history-title" onMouseDown={(event) => event.stopPropagation()}>
        <button className="close-button" onClick={onClose} aria-label="Close historical context"><X /></button>
        <p className="eyebrow">Evidence before certainty</p>
        <h2 id="history-title">Historical Context</h2>
        <p className="drawer-intro">Early Rome is reconstructed from later authors, archaeology, topography, and comparison. Each note names the kind of claim it makes.</p>
        <div className="history-notes">
          {notes.map((note) => (
            <article key={note.id} className={consulted.includes(note.id) ? 'consulted' : ''} onMouseEnter={() => onConsult(note.id)}>
              <span>{note.category}</span>
              <h3>{note.title}</h3>
              <p>{note.text}</p>
              <small>{note.evidence}</small>
            </article>
          ))}
        </div>
      </aside>
    </div>
  )
}

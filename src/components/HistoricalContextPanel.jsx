import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import { notesForTurn } from '../game/historicalContext.js'

export function HistoricalContextPanel({ open, turn, consulted, onConsult, onClose }) {
  const drawerRef = useRef(null)
  const closeButtonRef = useRef(null)
  const previousFocusRef = useRef(null)
  const closeRef = useRef(onClose)
  closeRef.current = onClose

  useEffect(() => {
    if (!open) return undefined
    previousFocusRef.current = document.activeElement
    closeButtonRef.current?.focus()
    const handleKey = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        closeRef.current()
        return
      }
      if (event.key !== 'Tab') return
      const focusable = drawerRef.current?.querySelectorAll('button, [href], [tabindex]:not([tabindex="-1"])') ?? []
      if (!focusable.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', handleKey)
    return () => {
      document.removeEventListener('keydown', handleKey)
      previousFocusRef.current?.focus?.()
    }
  }, [open])

  if (!open) return null
  const notes = notesForTurn(turn)
  return (
    <div className="drawer-overlay" onMouseDown={onClose}>
      <aside ref={drawerRef} className="history-drawer" role="dialog" aria-modal="true" aria-labelledby="history-title" onMouseDown={(event) => event.stopPropagation()}>
        <button ref={closeButtonRef} className="close-button" onClick={onClose} aria-label="Close historical knowledge"><X /></button>
        <p className="eyebrow">Evidence before certainty</p>
        <h2 id="history-title">Historical Knowledge</h2>
        <p className="drawer-intro">Roman history is reconstructed from contemporary testimony, later narratives, inscriptions, coins, archaeology, and topography. Each note identifies its evidence and uncertainty.</p>
        <div className="history-notes">
          {notes.map((note) => (
            <article key={note.id} tabIndex="0" className={consulted.includes(note.id) ? 'consulted' : ''} onMouseEnter={() => onConsult(note.id)} onFocus={() => onConsult(note.id)}>
              <span>{note.category}</span>
              <h3>{note.title}</h3>
              <p>{note.text}</p>
              {note.image && (
                <figure className="history-note-art">
                  <img src={note.image.src} alt={note.image.alt} loading="lazy" />
                  <figcaption>{note.image.evidence}</figcaption>
                </figure>
              )}
              <small>{note.evidence}</small>
            </article>
          ))}
        </div>
      </aside>
    </div>
  )
}

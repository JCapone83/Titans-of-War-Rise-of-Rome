import { X } from 'lucide-react'

export function HomeCreditsPanel({ open, onClose }) {
  if (!open) return null
  return (
    <div className="drawer-overlay home-credits-overlay" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
      <aside className="home-credits-panel" role="dialog" aria-modal="true" aria-labelledby="home-credits-title">
        <button className="close-button" type="button" onClick={onClose} aria-label="Close credits and rights"><X /></button>
        <p className="eyebrow">Project record</p>
        <h2 id="home-credits-title">Credits and Rights</h2>
        <p>Birth of Rome is a Titans Forge historical strategy game. The code and original documentation are released under the MIT License.</p>
        <p>Original, AI-assisted, public-domain, and separately licensed media are tracked file by file in <strong>MEDIA_RIGHTS.md</strong>. The historical interface distinguishes reconstruction, inference, tradition, and game abstraction.</p>
        <p className="home-credits-note">No model, account, API, or network connection is required to play after installation.</p>
      </aside>
    </div>
  )
}

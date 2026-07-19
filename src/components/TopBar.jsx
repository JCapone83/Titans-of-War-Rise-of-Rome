import { BookOpen, Download, HelpCircle, RotateCcw, Save } from 'lucide-react'
import { TURN_YEARS } from '../game/data.js'

export function TopBar({ era, turn, year, onOpenHistory, onOpenWalkthrough, onSave, onExport, onRestart }) {
  return (
    <header className="topbar">
      <div className="brand-block">
        <div className="brand-mark" aria-hidden="true">SPQR</div>
        <div>
          <p className="series-name">Titans of War</p>
          <h1>Birth of Rome</h1>
        </div>
      </div>
      <div className="date-block" aria-label={`Turn ${turn}, ${year} BC, ${era.name}`}>
        <span>{era.name}</span>
        <strong>{year} BC</strong>
        <small>Turn {turn} of {TURN_YEARS.length}</small>
      </div>
      <nav className="top-actions" aria-label="Campaign tools">
        <button className="icon-button" onClick={onOpenHistory} title="Historical context" aria-label="Open historical context"><BookOpen /></button>
        <button className="icon-button" onClick={onOpenWalkthrough} title="Walkthrough" aria-label="Open walkthrough"><HelpCircle /></button>
        <button className="icon-button" onClick={onSave} title="Save campaign" aria-label="Save campaign"><Save /></button>
        <button className="icon-button" onClick={onExport} title="Export chronicle" aria-label="Export chronicle"><Download /></button>
        <button className="icon-button" onClick={onRestart} title="Restart" aria-label="Restart campaign"><RotateCcw /></button>
      </nav>
    </header>
  )
}

import { BookOpen, Download, HelpCircle, Music2, RotateCcw, Save } from 'lucide-react'
import { TURN_YEARS, formatYear } from '../game/data.js'

export function TopBar({ era, turn, year, historyOpen, musicOpen, onOpenHistory, onToggleMusic, onOpenWalkthrough, onSave, onExport, onRestart }) {
  return (
    <header className="topbar">
      <div className="brand-block">
        <div className="brand-mark" aria-hidden="true">SPQR</div>
        <div>
          <p className="series-name">Titans of War</p>
          <h1>Birth of Rome</h1>
        </div>
      </div>
      <div className="date-block" aria-label={`Turn ${turn}, ${formatYear(year)}, ${era.name}`}>
        <span>{era.name}</span>
        <strong>{formatYear(year)}</strong>
        <small>Turn {turn} of {TURN_YEARS.length}</small>
      </div>
      <nav className="top-actions" aria-label="Campaign tools">
        <button className="icon-button" onClick={onOpenHistory} title="Historical knowledge" aria-label="Open historical knowledge" aria-haspopup="dialog" aria-expanded={historyOpen}><BookOpen /></button>
        <button className="icon-button" onClick={onToggleMusic} title={musicOpen ? 'Close soundtrack' : 'Open soundtrack'} aria-label={musicOpen ? 'Close soundtrack' : 'Open soundtrack'} aria-expanded={musicOpen}><Music2 /></button>
        <button className="icon-button" onClick={onOpenWalkthrough} title="Walkthrough" aria-label="Open walkthrough"><HelpCircle /></button>
        <button className="icon-button desktop-action" onClick={onSave} title="Save campaign" aria-label="Save campaign"><Save /></button>
        <button className="icon-button desktop-action" onClick={onExport} title="Export chronicle" aria-label="Export chronicle"><Download /></button>
        <button className="icon-button" onClick={onRestart} title="Restart" aria-label="Restart campaign"><RotateCcw /></button>
      </nav>
    </header>
  )
}

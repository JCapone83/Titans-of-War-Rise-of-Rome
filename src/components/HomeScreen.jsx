import { ArrowRight, BookOpen, Crown, FileText, House, Landmark, Music2, Scale, Ship } from 'lucide-react'

const CHRONOLOGY = [
  { label: 'Hill Settlements', span: '753–509 BC', Icon: House },
  { label: 'Republic', span: '509–146 BC', Icon: Scale },
  { label: 'Mediterranean Power', span: '146–30 BC', Icon: Ship },
  { label: 'Augustan City', span: '30 BC–AD 14', Icon: Landmark },
  { label: 'Imperial Capital', span: 'AD 14–117', Icon: Crown },
]

export function HomeScreen({ canContinue, campaignSummary, historyOpen, creditsOpen, musicOpen, onPrimary, onNewCampaign, onOpenHistory, onOpenCredits, onToggleMusic }) {
  return (
    <main className="home-screen">
      <img className="home-background" src="/images/home/early-rome-tiber-dawn.png" alt="Early settlements rising beside the Tiber at dawn" />
      <header className="home-header">
        <div className="home-brand" aria-label="Titans of War: Birth of Rome">
          <span className="home-brand-mark" aria-hidden="true">SPQR</span>
          <span><strong>TITANS OF WAR</strong><b>BIRTH OF ROME</b></span>
        </div>
        <nav className="home-utility" aria-label="Game information and audio">
          <button type="button" onClick={onOpenHistory} aria-haspopup="dialog" aria-expanded={historyOpen}><BookOpen /><span>Historical Method</span></button>
          <button type="button" onClick={onOpenCredits} aria-haspopup="dialog" aria-expanded={creditsOpen}><FileText /><span>Credits and Rights</span></button>
          <button type="button" onClick={onToggleMusic} aria-expanded={musicOpen}><Music2 /><span>Music</span></button>
        </nav>
      </header>

      <section className="home-copy" aria-labelledby="home-title">
        <p className="home-date">753 BC – AD 117</p>
        <h1 id="home-title">BIRTH<br />OF ROME</h1>
        <p className="home-premise">Build institutions strong enough to outlast victories, disasters, and rulers.</p>
        <div className="home-command">
          <button className="home-primary-action" type="button" onClick={onPrimary}>
            {canContinue ? 'Continue Campaign' : 'Begin Campaign'} <ArrowRight />
          </button>
          {canContinue ? <p className="home-save-summary">{campaignSummary}</p> : <p className="home-save-summary">Begin among the hill settlements in 753 BC.</p>}
          {canContinue ? <button className="home-secondary-action" type="button" onClick={onNewCampaign}>New Campaign</button> : null}
        </div>
      </section>

      <ol className="home-chronology" aria-label="Campaign chronology">
        {CHRONOLOGY.map(({ label, span, Icon }, index) => (
          <li className={index === 0 ? 'current' : ''} key={label}>
            <Icon aria-hidden="true" />
            <strong>{label}</strong>
            <small>{span}</small>
          </li>
        ))}
      </ol>
    </main>
  )
}

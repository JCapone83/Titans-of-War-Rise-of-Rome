import { ArrowDown, Check, Hammer, Landmark, Save, SkipForward, X } from 'lucide-react'
import { turnGuideState } from '../game/turnGuidance.js'

const GUIDED_COPY = {
  build: 'Start with one practical work. Palatine Huts improve shelter; a Shallow Well improves water.',
  council: 'The city has used some seasonal capacity. Now choose one council course on the right.',
  advance: 'The council is settled. Review the forecast, then advance when you are ready.',
}

function GuideStep({ icon: Icon, title, detail, state, onClick }) {
  return (
    <button type="button" className={`turn-guide-step ${state}`} onClick={onClick}>
      <Icon />
      <span><strong>{title}</strong><small>{detail}</small></span>
      {state === 'complete' ? <Check className="step-state" /> : <ArrowDown className="step-state" />}
    </button>
  )
}

export function TurnGuide({ state, guided, saveStatus, onGoToBuild, onGoToCouncil, onGoToAdvance, onDismissGuide }) {
  const guide = turnGuideState(state)
  const stepState = (id, complete) => complete ? 'complete' : guide.current === id ? 'current' : 'pending'
  const goToCurrent = guide.current === 'build' ? onGoToBuild : guide.current === 'council' ? onGoToCouncil : onGoToAdvance

  return (
    <section className={`turn-guide${guided ? ' guided' : ''}`} aria-label="Turn guide">
      <div className="turn-guide-heading">
        <span>Turn guide</span>
        <small className={`local-save-status ${saveStatus}`}><Save />{saveStatus === 'error' ? 'Save unavailable' : 'Saved locally'}</small>
      </div>
      <div className="turn-guide-steps">
        <GuideStep icon={Hammer} title="Build" detail={guide.build.label} state={stepState('build', guide.build.complete)} onClick={onGoToBuild} />
        <GuideStep icon={Landmark} title="Council" detail={guide.council.label} state={stepState('council', guide.council.complete)} onClick={onGoToCouncil} />
        <GuideStep icon={SkipForward} title="End season" detail={guide.advance.label} state={stepState('advance', false)} onClick={onGoToAdvance} />
      </div>
      {guided && state.turn === 1 && (
        <div className="guided-next" role="status">
          <span><strong>Guided first turn</strong>{GUIDED_COPY[guide.current]}</span>
          <button type="button" className="secondary-button" onClick={goToCurrent}>Show me <ArrowDown /></button>
          <button type="button" className="icon-button" onClick={onDismissGuide} aria-label="Dismiss guided turn"><X /></button>
        </div>
      )}
    </section>
  )
}

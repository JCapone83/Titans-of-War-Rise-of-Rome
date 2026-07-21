import { ArrowDown, Check, Droplets, Hammer, Landmark, Save, SkipForward, X } from 'lucide-react'
import { turnGuideState } from '../game/turnGuidance.js'

const GUIDED_COPY = {
  housing: 'Start by reviewing a housing work. The guide selects it, but you decide whether to build.',
  water: 'Now review a water work. Nothing is constructed until you confirm it.',
  council: 'The essential works are visible. Choose a council course on the right.',
  advance: 'Review the forecast, then end the season when you are ready.',
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

export function TurnGuide({ state, guided, saveStatus, recommendation, onGoToBuild, onGoToGuidedBuild, onGoToCouncil, onGoToAdvance, onUseRecommendation, onDismissGuide }) {
  const guide = turnGuideState(state, guided)
  const stepState = (id, complete) => complete ? 'complete' : guide.current === id ? 'current' : 'pending'
  const goToCurrent = guide.current === 'housing' || guide.current === 'water'
    ? () => onGoToGuidedBuild(guide.current)
    : guide.current === 'build'
      ? onGoToBuild
      : guide.current === 'council' ? onGoToCouncil : onGoToAdvance

  return (
    <section className={`turn-guide${guided ? ' guided' : ''}`} aria-label="Turn guide">
      <div className="turn-guide-heading">
        <span>Turn guide</span>
        <small className={`local-save-status ${saveStatus}`}><Save />{saveStatus === 'error' ? 'Save unavailable' : 'Saved locally'}</small>
      </div>
      <div className={`turn-guide-steps${guide.guided ? ' guided-opening' : ''}`}>
        {guide.guided ? <>
          <GuideStep icon={Hammer} title="Housing" detail={guide.housing.label} state={stepState('housing', guide.housing.complete)} onClick={() => onGoToGuidedBuild('housing')} />
          <GuideStep icon={Droplets} title="Water" detail={guide.water.label} state={stepState('water', guide.water.complete)} onClick={() => onGoToGuidedBuild('water')} />
        </> : <GuideStep icon={Hammer} title="Build" detail={guide.build.label} state={stepState('build', guide.build.complete)} onClick={onGoToBuild} />}
        <GuideStep icon={Landmark} title="Council" detail={guide.council.label} state={stepState('council', guide.council.complete)} onClick={onGoToCouncil} />
        <GuideStep icon={SkipForward} title="End season" detail={guide.advance.label} state={stepState('advance', false)} onClick={onGoToAdvance} />
      </div>
      {recommendation?.familyId && (
        <div className="recommended-next-work">
          <span><strong>Recommended next work</strong>{recommendation.building} in {recommendation.district}: {recommendation.deficitLabel}</span>
          <button type="button" className="secondary-button" onClick={onUseRecommendation}>Review work <ArrowDown /></button>
        </div>
      )}
      {guide.guided && (
        <div className="guided-next" role="status">
          <span><strong>Guided first turn</strong>{GUIDED_COPY[guide.current]}</span>
          <button type="button" className="secondary-button" onClick={goToCurrent}>Show me <ArrowDown /></button>
          <button type="button" className="icon-button" onClick={onDismissGuide} aria-label="Dismiss guided turn"><X /></button>
        </div>
      )}
    </section>
  )
}

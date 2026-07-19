import { ArrowRight, Columns3 } from 'lucide-react'

const CONTENT = {
  kings: {
    eyebrow: 'The valley joins the hills',
    title: 'The City of Kings',
    text: 'Seasonal cooperation has become organized public work. Stone forms, lined water, supervised markets, and larger monuments are now possible, but every advance asks who commands the labor.',
    unlocks: ['Tier II buildings', 'Cloaca Works', 'Temple of Jupiter'],
    action: 'Enter the new era',
  },
  republic: {
    eyebrow: '509 BC - command without a king',
    title: 'The Early Republic',
    text: 'Royal command has ended, but its army, cults, debts, and public works remain. Annual magistrates must now act through Senate credit and citizen consent while campaign service presses the households that sustain both.',
    unlocks: ['Annual offices', 'Debt and levy pressure', 'Republican civic works'],
    action: 'Found the Republic',
  },
  reconstruction: {
    eyebrow: '390 BC - the city after defeat',
    title: 'Sack and Reconstruction',
    text: 'Readiness determined how much survived, not whether catastrophe vanished. Damaged districts, displaced households, broken records, and exposed approaches now become the material of a political reconstruction.',
    unlocks: ['Proportional crisis damage', 'Tier IV rebuilding', 'Latin settlement'],
    action: 'Enter the damaged city',
  },
  regional: {
    eyebrow: '338 BC - beyond the city walls',
    title: 'The Regional Compact',
    text: 'Rome now governs through unequal relationships rather than one uniform annexation. Roads, colonies, military obligations, and local autonomy must be balanced against the grain, people, treasury, and institutions of the city itself.',
    unlocks: ['Regional map', 'Road and colony commitments', 'Independent political statuses'],
    action: 'Plan the region',
  },
  italian: {
    eyebrow: '312 BC - recovery becomes a system',
    title: 'Roads to Italy',
    text: 'Rome survived the Caudine disaster because defeat did not exhaust its armies, allies, or institutions. The next test is harder: roads, water, reserves, and negotiated obligations must sustain repeated wars without consuming the city behind them.',
    unlocks: ['Via Appia and Aqua Appia', 'Samnite and coalition pressure', 'Pyrrhic war of replacements'],
    action: 'Build the Italian system',
  },
}

export function EraTransition({ open, kind = 'kings', onContinue }) {
  if (!open) return null
  const content = CONTENT[kind]
  return (
    <div className="overlay era-overlay">
      <section className="era-modal" role="dialog" aria-modal="true" aria-labelledby="era-title">
        <Columns3 />
        <p className="eyebrow">{content.eyebrow}</p>
        <h2 id="era-title">{content.title}</h2>
        <p>{content.text}</p>
        <div className="era-unlocks">
          {content.unlocks.map((unlock) => <span key={unlock}>{unlock}</span>)}
        </div>
        <button className="primary-button" onClick={onContinue}>{content.action} <ArrowRight /></button>
      </section>
    </div>
  )
}

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
    art: './images/transitions/early-republic-v1.webp',
    artAlt: 'Early Republican Rome gathering around the drained Forum valley and Capitoline temple.',
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
  mediterranean: {
    eyebrow: '264 BC - a republic crosses the sea',
    title: 'The Mediterranean Republic',
    text: 'Italy has supplied depth; the sea now demands a different ledger. Fleet capacity, maritime losses, credit, local trust, grain, allies, and command duration become visible obligations.',
    unlocks: ['Fleet acquisition', 'Maritime learning', 'Sicilian settlement'],
    action: 'Enter the Mediterranean',
    art: './images/transitions/mediterranean-republic-v1.webp',
    artAlt: 'Republican Rome building warships and organizing Mediterranean supply at the Tiber port.',
  },
  hannibalic: {
    eyebrow: '241-218 BC - the interwar ledger',
    title: 'The Hannibalic Emergency',
    text: 'The First Punic War left fleets, Sicilian obligations, contracts, grain routes, and tired allies. Twenty-three years recover some burdens and preserve others. A new invasion will test the Italian system behind the maritime victory.',
    unlocks: ['Visible interwar changes', 'Emergency reserves', 'Veteran settlement pressure'],
    action: 'Advance to 218 BC',
  },
  metropolitan: {
    eyebrow: '201-200 BC - victory enters the city',
    title: 'Conquest and Metropolis',
    text: 'War settlements now send treasure, captives, contracts, commands, petitioners, and new households toward a city built for a smaller republic. Public capacity and patronal power will not grow at the same rate.',
    unlocks: ['Metropolitan ledger', 'Forum capacity', 'Provincial command pressure'],
    action: 'Enter the metropolis',
  },
  strain: {
    eyebrow: '133-121 BC - reform outlives its authors',
    title: 'Republic Under Strain',
    text: 'The Gracchan conflicts leave land, grain, service, citizenship, courts, and political procedure unsettled. Rome must govern Italy and the provinces while military commands acquire constituencies of their own.',
    unlocks: ['Constitutional ledger', 'Dated civic works', 'Command and demobilization risk'],
    action: 'Enter the late Republic',
  },
  settlement: {
    eyebrow: '49 BC - the threshold becomes civil war',
    title: 'Civil War and Settlement',
    text: 'Competing commands now carry armies, provinces, debts, veterans, and political guarantees into war. Victory can unify force; it cannot by itself restore courts, titles, public provision, or a lawful succession.',
    unlocks: ['Operating settlement ledger', 'Caesarian civic works', 'Multiple constitutional outcomes'],
    action: 'Enter the civil war',
  },
  augustan: {
    eyebrow: '27-23 BC - settlement becomes administration',
    title: 'The Augustan City',
    text: 'Civil war has ended, but the first settlement is already changing. Command, Senate and magistrates, household succession, provincial review, water, fire, grain, public access, and monumental memory must now operate together through AD 14.',
    unlocks: ['Augustan operating ledger', 'Eight evidence-labeled projects', 'The first succession test'],
    action: 'Enter the Augustan City',
    art: './images/transitions/augustan-city-v1.webp',
    artAlt: 'Augustan Rome combining older neighborhoods with new temples, paved streets, and public water.',
  },
  imperial: {
    eyebrow: 'AD 14 - the founder is gone',
    title: 'Imperial Capital',
    text: 'The principate has survived one transfer, but succession now joins guards, provincial armies, Senate recognition, palace access, grain, harbor, water, fire, and public land. Rome will become visually magnificent while those operating relationships grow harder to govern.',
    unlocks: ['Imperial operating ledger', 'Eight staged capital projects', 'Fire, army, palace, and succession crises'],
    action: 'Enter the Imperial Capital',
    art: './images/transitions/imperial-capital-v1.webp',
    artAlt: 'Flavian Rome operating around the new amphitheatre, aqueducts, dense housing, and public works.',
  },
  trajanic: {
    eyebrow: 'AD 96-117 - adoption, conquest, and inherited obligations',
    title: 'Trajanic Capital',
    text: 'Nerva and Trajan must make succession legible while frontier command, Dacian revenue, provincial trust, treasury resilience, grain, water, administration, and maintenance carry Rome toward AD 117. Territorial reach does not settle who pays for the capital or how its authority transfers.',
    unlocks: ['Trajanic operating ledger', 'Six evidence-qualified capital works', 'AD 117 settlement'],
    action: 'Enter the Trajanic Capital',
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
    <div className={`overlay era-overlay${content.art ? ' era-overlay-art' : ''}`}>
      {content.art && <img className="era-transition-art" src={content.art} alt={content.artAlt} />}
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

import { Check, LockKeyhole } from 'lucide-react'

export function DecisionCouncil({ council, resolved, chosenId, onChoose }) {
  if (!council) {
    return (
      <section id="council-decision" className="council empty-council">
        <p className="eyebrow">Council</p>
        <h2>No formal council this turn</h2>
        <p>Build, inspect the city, and end the season when the balance is acceptable.</p>
      </section>
    )
  }
  return (
    <section id="council-decision" className="council" aria-labelledby="council-title">
      <div className="section-heading">
        <p className="eyebrow">{council.speaker}</p>
        <h2 id="council-title">{council.title}</h2>
      </div>
      <p className="council-prompt">{council.prompt}</p>
      <p className="council-context">{council.context}</p>
      <div className="council-options">
        {council.options.map((option, index) => {
          const chosen = chosenId === option.id
          return (
            <button type="button" key={option.id} onClick={() => onChoose(option.id)} disabled={resolved} className={chosen ? 'chosen' : ''}>
              <span className="choice-letter">{String.fromCharCode(65 + index)}</span>
              <span><strong>{option.label}</strong><small>{option.detail}</small></span>
              {chosen ? <Check /> : resolved ? <LockKeyhole /> : null}
            </button>
          )
        })}
      </div>
    </section>
  )
}

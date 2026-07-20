const MEASURES = [
  ['citizenshipIntegration', 'Citizenship integration'],
  ['italianClaimsPressure', 'Italian claims pressure'],
  ['commanderPersonalLoyalty', 'Personal army risk'],
  ['senateCommandControl', 'Senate command control'],
  ['emergencyPowersPrecedent', 'Emergency precedent'],
  ['landTitleDisputes', 'Land title disputes'],
  ['streetViolence', 'Street violence'],
  ['courtCapacity', 'Court capacity'],
  ['archiveIntegrity', 'Archive integrity'],
  ['demobilizationCapacity', 'Demobilization capacity'],
  ['popularConsentChannels', 'Lawful public channels'],
  ['urbanFireResponse', 'Urban fire response'],
]

export function RepublicStrainPanel({ state }) {
  if (!state.republicStrain) return null
  return (
    <section className="mediterranean-panel" aria-labelledby="republic-strain-panel-title">
      <div className="italian-heading">
        <div><p className="eyebrow">Republic Under Strain</p><h2 id="republic-strain-panel-title">Constitutional ledger</h2></div>
      </div>
      <div className="italian-measures">
        {MEASURES.map(([key, label]) => <div key={key}><span>{label}</span><strong>{state.republicStrain[key]}</strong></div>)}
      </div>
      <p className="panel-note">Citizenship, public consent, courts, archives, emergency power, and military loyalty remain separate tests.</p>
    </section>
  )
}

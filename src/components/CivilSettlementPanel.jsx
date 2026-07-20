import { civilSettlementForecast } from '../game/simulation.js'

const MEASURES = [
  ['unifiedCommand', 'Unified command'],
  ['senateOperatingCapacity', 'Senate operation'],
  ['magistrateContinuity', 'Magistrate continuity'],
  ['armyDemobilization', 'Army demobilization'],
  ['veteranSettlementPressure', 'Veteran pressure'],
  ['warFinanceBurden', 'War finance burden'],
  ['confiscationPressure', 'Confiscation pressure'],
  ['italianLandSecurity', 'Italian title security'],
  ['provincialCommandSettlement', 'Provincial settlement'],
  ['courtContinuity', 'Court continuity'],
  ['archiveContinuity', 'Archive continuity'],
  ['publicProvision', 'Public provision'],
  ['successionClarity', 'Succession clarity'],
  ['emergencyAuthority', 'Emergency authority'],
  ['civicOperatingCapacity', 'Civic capacity'],
  ['urbanDisplacement', 'Urban displacement'],
  ['personalMonumentalCredit', 'Personal monument credit'],
]

export function CivilSettlementPanel({ state }) {
  if (!state.civilSettlement) return null
  const forecast = civilSettlementForecast(state)
  return (
    <section className="mediterranean-panel" aria-labelledby="civil-settlement-panel-title">
      <div className="italian-heading">
        <div><p className="eyebrow">Civil War and Settlement</p><h2 id="civil-settlement-panel-title">Operating settlement</h2></div>
      </div>
      <div className="italian-measures">
        {MEASURES.map(([key, label]) => <div key={key}><span>{label}</span><strong>{state.civilSettlement[key]}</strong></div>)}
      </div>
      <p className="panel-note">Command gap {forecast.commandGap}. Military-fiscal settlement gap {forecast.settlementGap}. Official titles do not override these operating measures.</p>
    </section>
  )
}

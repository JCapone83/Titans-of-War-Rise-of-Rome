import { Building2, Columns3, Droplets, Hammer, House, Landmark, Scale, Shield, Waves, Wheat } from 'lucide-react'
import { BUILDING_FAMILIES, getDistrict, getTier } from '../game/data.js'
import { buildingAvailability, districtNetworkReport, districtRiskReport, siteAnalysis } from '../game/simulation.js'

function Cost({ cost }) {
  return (
    <span className="cost-list">
      {Object.entries(cost).map(([resource, amount]) => <span key={resource}>{amount} {resource}</span>)}
    </span>
  )
}

export function BuildDock({ state, onSelectFamily, onBuild, message }) {
  const district = getDistrict(state.selectedDistrict)
  const selected = getTier(state.selectedFamily, state.era)
  const availability = buildingAvailability(state, state.selectedFamily, state.selectedDistrict)
  const site = siteAnalysis(state, state.selectedFamily, state.selectedDistrict, selected)
  const risk = districtRiskReport(state)[district.id]
  const network = districtNetworkReport(state)[district.id]
  const occupied = state.buildings.filter((building) => building.districtId === district.id).length
    + (state.projects ?? []).filter((project) => project.districtId === district.id && !project.replaceInstanceId).length
  return (
    <section id="building-construction" className="build-dock" aria-labelledby="build-title">
      <div className="selected-work">
        <p className="eyebrow">Selected district</p>
        <h2 id="build-title">{district.name}</h2>
        <p className="district-land-status"><strong>{occupied}/{district.capacity} plots used.</strong> Upgrade keeps a plot; Clear reopens it.</p>
        <p>{district.note}</p>
        <p className="district-specialty">{district.specialty}</p>
        <div className="terrain-tags">{district.terrain.map((tag) => <span key={tag}>{tag}</span>)}</div>
        <div className="district-risk" aria-label={`${district.name} structural risk`}>
          <span className={risk.fire >= 65 ? 'high' : ''}>Fire <strong>{risk.fire}</strong></span>
          <span className={risk.disease >= 55 ? 'high' : ''}>Disease <strong>{risk.disease}</strong></span>
          <span className={risk.flood >= 45 ? 'high' : ''}>Flood <strong>{risk.flood}</strong></span>
        </div>
        <p className="risk-drivers">{risk.drivers.length ? risk.drivers.join(' · ') : 'Low occupancy and terrain exposure.'}</p>
        <div className="network-status" aria-label={`${district.name} network services`}>
          <span className={network.water ? 'connected' : ''}>Water <strong>{network.water ? 'Served' : 'Open'}</strong></span>
          <span className={network.drainage ? 'connected' : ''}>Drainage <strong>{network.drainage ? 'Served' : 'Open'}</strong></span>
          <span className={network.improvedRoad ? 'connected' : ''}>Access <strong>{network.improvedRoad ? 'Improved' : 'Basic'}</strong></span>
          <span className={network.connectedStorage ? 'connected' : ''}>Storage <strong>{network.connectedStorage ? 'Linked' : 'Unlinked'}</strong></span>
        </div>
        {state.selectedFamily === 'market' && <p className="network-effect">Market network output: {Math.round(network.marketOutputFactor * 100)}%</p>}
        {state.selectedFamily === 'housing' && state.era >= 1 && <p className="network-effect">Dense housing support: {Math.round(network.housingCapacityFactor * 100)}%</p>}
      </div>
      <div className="building-catalog" role="list" aria-label="Available building families">
        {BUILDING_FAMILIES.filter((family) => getTier(family.id, state.era)).map((family) => {
          const building = getTier(family.id, state.era)
          const iconMap = { House, Landmark, Columns3, Droplets, Waves, Scale, Wheat, Hammer, Shield }
          const Icon = iconMap[family.icon] ?? Building2
          const active = family.id === state.selectedFamily
          return (
            <button
              key={family.id}
              type="button"
              className={`building-choice${active ? ' active' : ''}`}
              onClick={() => onSelectFamily(family.id)}
              aria-pressed={active}
            >
              <Icon style={{ color: family.color }} />
              <span><strong>{building.name}</strong><small>{family.name} · Tier {building.era + 1}</small></span>
            </button>
          )
        })}
      </div>
      <div className="build-action">
        <div>
          <strong>{selected.name}</strong>
          <p>{selected.caption}</p>
          <Cost cost={selected.cost} />
          <span className="action-cost">{selected.projectTurns ? `${selected.projectTurns}-season project · uses 1 capacity when worked` : `Uses ${selected.actionCost} of ${state.actionsMax} seasonal capacity`}</span>
        </div>
        <button type="button" className="primary-button" onClick={onBuild} disabled={!availability.ok}>{selected.projectTurns ? 'Begin project' : 'Establish work'}</button>
        <p className={`build-message${availability.ok ? '' : ' warning'}`} aria-live="polite">{message || (availability.ok ? 'Ground and stores are ready.' : availability.reason)}</p>
        <div className="site-forecast" aria-label="Site forecast">
          {site.bonuses.map((bonus) => <span className="site-bonus" key={bonus}>+ {bonus}</span>)}
          {site.warnings.map((warning) => <span className="site-warning" key={warning}>! {warning}</span>)}
        </div>
      </div>
    </section>
  )
}

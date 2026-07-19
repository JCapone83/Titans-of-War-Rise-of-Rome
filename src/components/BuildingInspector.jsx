import { ArrowUp, Hammer, Trash2, Wrench } from 'lucide-react'
import { getDistrict } from '../game/data.js'
import { repairAvailability, removeAvailability, upgradeAvailability } from '../game/simulation.js'

function Effects({ effects = {} }) {
  return (
    <div className="effect-tags">
      {Object.entries(effects).map(([metric, value]) => (
        <span key={metric} className={value < 0 ? 'negative' : 'positive'}>{metric} {value > 0 ? '+' : ''}{value}</span>
      ))}
    </div>
  )
}

export function BuildingInspector({ state, onSelect, onUpgrade, onRepair, onRemove }) {
  const district = getDistrict(state.selectedDistrict)
  const works = state.buildings.filter((building) => building.districtId === district.id)
  const selected = works.find((building) => building.instanceId === state.selectedBuildingId) ?? null
  const upgrade = selected ? upgradeAvailability(state, selected.instanceId) : { ok: false, reason: 'Select a work.' }
  const repair = selected ? repairAvailability(state, selected.instanceId) : { ok: false, reason: 'Select a work.' }
  const removal = selected ? removeAvailability(state, selected.instanceId) : { ok: false, reason: 'Select a work.' }

  return (
    <section className="building-inspector" aria-labelledby="inspector-title">
      <div className="inspector-list">
        <div className="inspector-heading">
          <div><p className="eyebrow">District works</p><h2 id="inspector-title">{district.name}</h2></div>
          <span>{works.length}/{district.capacity}</span>
        </div>
        {works.length === 0
          ? <p className="empty-works">No established works. Use the building families below to shape this district.</p>
          : <div className="work-list">{works.map((building) => (
            <button
              type="button"
              key={building.instanceId}
              className={building.instanceId === selected?.instanceId ? 'active' : ''}
              onClick={() => onSelect(building.instanceId)}
              aria-pressed={building.instanceId === selected?.instanceId}
            >
              <Hammer />
              <span><strong>{building.name}</strong><small>Tier {building.tier} · turn {building.builtTurn}</small></span>
              <i className={(building.condition ?? 100) < 70 ? 'damaged' : ''}>{building.condition ?? 100}%</i>
            </button>
          ))}</div>}
      </div>
      <div className="inspector-detail">
        {selected ? (
          <>
            <div className="condition-line">
              <div><p className="eyebrow">Selected work</p><h3>{selected.name}</h3></div>
              <strong className={(selected.condition ?? 100) < 70 ? 'damaged' : ''}>{selected.condition ?? 100}% condition</strong>
            </div>
            <Effects effects={selected.appliedEffects} />
            <div className="inspector-actions">
              <button type="button" onClick={() => onUpgrade(selected.instanceId)} disabled={!upgrade.ok} title={upgrade.reason ?? 'Rebuild in its later form'}><ArrowUp /> Upgrade</button>
              <button type="button" onClick={() => onRepair(selected.instanceId)} disabled={!repair.ok} title={repair.reason ?? 'Restore damaged output'}><Wrench /> Repair</button>
              <button type="button" className="danger-button" onClick={() => onRemove(selected.instanceId)} disabled={!removal.ok} title={removal.reason ?? 'Clear the plot and recover limited material'}><Trash2 /> Clear</button>
            </div>
            <p className="inspector-reason">{!upgrade.ok ? upgrade.reason : `Upgrade cost: ${Object.entries(upgrade.cost).map(([key, value]) => `${value} ${key}`).join(', ')}.`}</p>
          </>
        ) : (
          <div className="inspector-prompt"><Hammer /><p>Select an established work to upgrade, repair, or clear it.</p></div>
        )}
      </div>
    </section>
  )
}

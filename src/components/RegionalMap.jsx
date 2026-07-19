import { MapPinned, Route } from 'lucide-react'
import { REGIONAL_COMMUNITIES, REGIONAL_ROUTES, RELATIONSHIP_TYPES } from '../game/data.js'

function RouteLine({ route, state, onSelect }) {
  const from = REGIONAL_COMMUNITIES.find((item) => item.id === route.from)
  const to = REGIONAL_COMMUNITIES.find((item) => item.id === route.to)
  const dx = to.x - from.x
  const dy = to.y - from.y
  const completed = state.regional.roads.includes(route.id)
  const project = state.regional.roadProjects.find((item) => item.routeId === route.id)
  return (
    <button
      type="button"
      className={`regional-route${completed ? ' complete' : ''}${project ? ' underway' : ''}${state.regional.selectedRoute === route.id ? ' selected' : ''}`}
      style={{ left: `${from.x}%`, top: `${from.y}%`, width: `${Math.hypot(dx, dy)}%`, transform: `rotate(${Math.atan2(dy, dx) * 180 / Math.PI}deg)` }}
      onClick={() => onSelect(route.id)}
      title={`${route.name}${project ? `, ${project.progress}/${project.requiredSeasons} seasons` : completed ? ', complete' : ', unbuilt'}`}
      aria-label={`Select ${route.name}`}
    />
  )
}

export function RegionalMap({ state, onSelectCommunity, onSelectRoute }) {
  return (
    <section className="regional-map-section" aria-labelledby="regional-map-title">
      <div className="map-heading">
        <div><p className="eyebrow">Latium and the southern approaches</p><h2 id="regional-map-title">The Regional Compact</h2></div>
        <p><Route /> Roads move stores and armies in both directions.</p>
      </div>
      <div className="regional-map" role="group" aria-label="Regional communities and road commitments">
        <div className="regional-coast" aria-hidden="true" /><div className="regional-tiber" aria-hidden="true" />
        {REGIONAL_ROUTES.map((route) => <RouteLine key={route.id} route={route} state={state} onSelect={onSelectRoute} />)}
        {REGIONAL_COMMUNITIES.map((community) => {
          const status = state.regional.communities[community.id]
          const selected = state.regional.selectedCommunity === community.id
          const colony = state.regional.colonies.some((item) => item.communityId === community.id)
          return (
            <button
              type="button"
              key={community.id}
              className={`regional-node node-${community.id} relationship-${status.relationship}${selected ? ' selected' : ''}${colony ? ' colony' : ''}`}
              style={{ left: `${community.x}%`, top: `${Math.min(95, community.y)}%` }}
              onClick={() => onSelectCommunity(community.id)}
              aria-pressed={selected}
            >
              <MapPinned aria-hidden="true" /><strong>{community.name}</strong><small>{RELATIONSHIP_TYPES[status.relationship].label}</small>
            </button>
          )
        })}
        <div className="regional-legend"><span>Complete road</span><span>Work underway</span><span>Unbuilt corridor</span></div>
      </div>
    </section>
  )
}

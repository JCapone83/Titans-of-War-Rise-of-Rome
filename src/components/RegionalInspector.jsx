import { Flag, Hammer, Route, Shield, Store, Users } from 'lucide-react'
import { REGIONAL_COMMUNITIES, REGIONAL_ROUTES, RELATIONSHIP_TYPES } from '../game/data.js'
import { actionRemaining, regionalColonyAvailability, regionalCompactAvailability, regionalForecast, regionalRoadAvailability } from '../game/simulation.js'

const measures = [
  ['militaryContribution', 'Military', Shield], ['autonomy', 'Autonomy', Flag], ['tradeAccess', 'Trade access', Store], ['revoltRisk', 'Revolt risk', Users],
]

export function RegionalInspector({ state, onCompact, onStartRoad, onContinueRoad, onFoundColony }) {
  const regional = state.regional
  if (!regional) return null
  const communityMeta = REGIONAL_COMMUNITIES.find((item) => item.id === regional.selectedCommunity)
  const community = regional.communities[regional.selectedCommunity]
  const route = REGIONAL_ROUTES.find((item) => item.id === regional.selectedRoute)
  const project = regional.roadProjects.find((item) => item.routeId === route?.id)
  const roadAvailability = route ? regionalRoadAvailability(state, route.id) : { ok: false, reason: 'Choose a route.' }
  const colonyAvailability = communityMeta ? regionalColonyAvailability(state, communityMeta.id) : { ok: false, reason: 'Choose a community.' }
  const forecast = regionalForecast(state)
  return (
    <section className="regional-inspector" aria-labelledby="regional-inspector-title">
      <div className="regional-summary">
        <p className="eyebrow">Regional capacity · {actionRemaining(state)} actions remain</p>
        <h2 id="regional-inspector-title">{communityMeta.name}</h2>
        <p>{communityMeta.note}</p>
        <div className="regional-measures">
          {measures.map(([key, label, Icon]) => <div key={key}><span><Icon />{label}</span><strong>{community[key]}</strong></div>)}
        </div>
        {communityMeta.id !== 'rome' && <div className="compact-controls" role="group" aria-label={`Compact for ${communityMeta.name}`}>
          {Object.entries(RELATIONSHIP_TYPES).filter(([id]) => id !== 'hostile').map(([id, definition]) => {
            const availability = regionalCompactAvailability(state, communityMeta.id, id)
            return <button type="button" key={id} className={community.relationship === id ? 'active' : ''} onClick={() => onCompact(communityMeta.id, id)} disabled={!availability.ok} title={availability.ok ? definition.label : availability.reason}>{definition.label}</button>
          })}
        </div>}
        <button className="secondary-button colony-button" onClick={() => onFoundColony(communityMeta.id)} disabled={!colonyAvailability.ok} title={colonyAvailability.ok ? 'Commit settlers and a garrison' : colonyAvailability.reason}><Flag /> Found colony</button>
      </div>
      <div className="route-commitment">
        <p className="eyebrow">Selected corridor</p><h3>{route?.name}</h3>
        {route && <p>Supply +{route.supply} · trade +{route.trade} · response +{route.response} · hostile access +{route.hostileAccess}</p>}
        {project && <div className="route-progress"><i style={{ width: `${project.progress / project.requiredSeasons * 100}%` }} /><span>{project.progress}/{project.requiredSeasons} seasons</span></div>}
        <button className="primary-button" onClick={() => project ? onContinueRoad(route.id) : onStartRoad(route.id)} disabled={project ? project.lastWorkedTurn === state.turn || !actionRemaining(state) : !roadAvailability.ok} title={project ? 'Assign another season of crews' : roadAvailability.reason}><Hammer /> {project ? 'Continue road' : regional.roads.includes(route?.id) ? 'Road complete' : 'Begin road'}</button>
      </div>
      <div className="regional-forecast">
        <p className="eyebrow">Regional forecast</p>
        <div><span>Military contribution</span><strong>{forecast.contribution}</strong></div><div><span>Trade access</span><strong>{forecast.tradeAccess}</strong></div><div><span>Autonomy</span><strong>{forecast.autonomy}</strong></div><div><span>Revolt risk</span><strong>{forecast.revoltRisk}</strong></div><div className={forecast.overextension >= 45 ? 'adverse' : ''}><span>Overextension</span><strong>{forecast.overextension}</strong></div>
        <p><Route /> {forecast.notes[0]}</p>
      </div>
    </section>
  )
}

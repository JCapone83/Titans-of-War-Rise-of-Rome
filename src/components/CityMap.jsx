import { useState } from 'react'
import { Droplets, Landmark, Map as MapIcon, Mountain, Route, Shield, Waves } from 'lucide-react'
import { artForBuilding } from '../game/buildingArt.js'
import { augustanCapitalLandmarks } from '../game/projectArt.js'
import { DISTRICTS, DISTRICT_LINKS } from '../game/data.js'
import { networkCoverage } from '../game/simulation.js'
import { assignBuildingsToScene, districtGate, roadLinksForScene, sceneForId } from '../game/romeScenes.js'

const MODES = [
  { id: 'terrain', label: 'Terrain', icon: MapIcon },
  { id: 'roads', label: 'Roads', icon: Route },
  { id: 'water', label: 'Water', icon: Droplets },
  { id: 'drainage', label: 'Drainage', icon: Waves },
  { id: 'defense', label: 'Defense', icon: Shield },
]

const CAPITAL_MODE = { id: 'capital', label: 'Augustan capital', icon: Landmark }

function NetworkLine({ from, to, mode, improved = false }) {
  const start = DISTRICTS.find((district) => district.id === from)
  const end = DISTRICTS.find((district) => district.id === to)
  const dx = end.x - start.x
  const dy = end.y - start.y
  return <i className={`network-line network-${mode}${improved ? ' improved' : ''}`} style={{ left: `${start.x}%`, top: `${start.y}%`, width: `${Math.hypot(dx, dy)}%`, transform: `rotate(${Math.atan2(dy, dx) * 180 / Math.PI}deg)` }} />
}

function BuildingModel({ building, index }) {
  const variation = index % 4
  const art = artForBuilding(building.buildingId)
  if (art) return (
    <span
      className={`building-model rendered-building model-${variation}${(building.condition ?? 100) < 70 ? ' damaged' : ''}`}
      title={`${building.name}, ${building.condition ?? 100}% condition`}
      aria-label={`${building.name}, ${building.condition ?? 100}% condition`}
    >
      <img src={art} alt="" draggable="false" />
    </span>
  )
  return (
    <span
      className={`building-model tier-${building.tier} model-${variation} family-${building.familyId}${(building.condition ?? 100) < 70 ? ' damaged' : ''}`}
      style={{ '--building-color': building.color }}
      title={`${building.name}, ${building.condition ?? 100}% condition`}
      aria-label={`${building.name}, ${building.condition ?? 100}% condition`}
    >
      <i className="building-roof" />
      <i className="building-front" />
      <i className="building-side" />
    </span>
  )
}

function SceneRoad({ link, emphasized }) {
  const dx = link.to.x - link.from.x
  const dy = link.to.y - link.from.y
  return (
    <i
      className={`scene-road${link.improved ? ' improved' : ''}${emphasized ? ' emphasized' : ''}`}
      style={{ left: `${link.from.x}%`, top: `${link.from.y}%`, width: `${Math.hypot(dx, dy)}%`, transform: `rotate(${Math.atan2(dy, dx) * 180 / Math.PI}deg)` }}
    />
  )
}

function TerrainScene({ state, mode, onSelectDistrict }) {
  const scene = sceneForId('palatine-capitoline')
  const assignments = assignBuildingsToScene(state, scene.id)
  const assignmentByPlot = new Map(assignments.map((assignment) => [assignment.plot.id, assignment]))
  const roads = roadLinksForScene(state, scene.id)

  return (
    <div className={`terrain-scene map-mode-${mode}`} role="group" aria-label={`${scene.label}, ${mode} overlay`}>
      <img className="terrain-scene-background" src={scene.background} alt="Natural hill terraces above the Tiber prepared for settlement" draggable="false" />
      <div className="scene-road-layer" aria-hidden="true">
        {roads.map((link) => <SceneRoad key={link.id} link={link} emphasized={mode === 'roads'} />)}
      </div>
      {scene.gates.map((gate) => (
        <span
          key={gate.id}
          className={`scene-gate${mode === 'roads' ? ' visible' : ''}`}
          style={{ left: `${gate.x}%`, top: `${gate.y}%` }}
          aria-hidden="true"
        >{gate.label}</span>
      ))}
      {scene.plots.map((plot) => {
        const assignment = assignmentByPlot.get(plot.id)
        const district = DISTRICTS.find((item) => item.id === plot.districtId)
        const art = assignment ? artForBuilding(assignment.building.buildingId) : null
        const selected = state.selectedDistrict === plot.districtId
        const gate = districtGate(scene, plot.districtId)
        const buildingLabel = assignment ? `${assignment.building.name}, ${assignment.building.condition ?? 100}% condition` : 'empty construction plot'
        return (
          <button
            type="button"
            key={plot.id}
            className={`scene-plot${assignment ? ' occupied' : ' empty'}${selected ? ' selected' : ''}`}
            style={{ left: `${plot.x}%`, top: `${plot.y}%`, zIndex: 10 + plot.depth, '--scene-scale': plot.scale }}
            onClick={() => onSelectDistrict(plot.districtId)}
            aria-label={`Select ${district.name} plot, ${buildingLabel}. Road approach: ${gate?.label ?? 'district path'}.`}
            aria-pressed={selected}
          >
            {art ? <img className="scene-building" src={art} alt="" draggable="false" /> : <span className="scene-plot-marker" aria-hidden="true" />}
            <span className="scene-plot-label"><strong>{district.name}</strong><small>{assignment ? assignment.building.name : 'Open plot'}</small></span>
          </button>
        )
      })}
      <div className="terrain-scene-legend" aria-hidden="true">
        {mode === 'roads'
          ? <><span><i className="scene-road-key" /> Paths follow occupied plots</span><span><i className="scene-road-key improved" /> Improved by district works</span></>
          : <><span>Select a clearing to work in that district</span><span>Buildings occupy stable plots as Rome grows</span></>}
      </div>
    </div>
  )
}

export function CityMap({ state, onSelectDistrict }) {
  const [mode, setMode] = useState('terrain')
  const [view, setView] = useState('overview')
  const modes = view === 'overview' && state.era >= 10 ? [...MODES, CAPITAL_MODE] : MODES
  const landmarks = augustanCapitalLandmarks(state)
  const coverage = networkCoverage(state)
  const covered = new Set(coverage[mode] ?? [])
  const links = mode === 'roads'
    ? coverage.roads
    : ['water', 'drainage', 'defense'].includes(mode)
      ? DISTRICT_LINKS.filter(([from, to]) => covered.has(from) && covered.has(to)).map(([from, to]) => ({ from, to }))
      : []
  const selectView = (nextView) => {
    setView(nextView)
    if (nextView === 'hills' && mode === 'capital') setMode('terrain')
  }

  return (
    <section className="city-map-section" aria-labelledby="city-map-title">
      <div className="map-heading">
        <div>
          <p className="eyebrow">{view === 'hills' ? 'Build the hill communities plot by plot' : state.era >= 10 ? 'From the seven hills to an Imperial capital' : 'The seven hills and the river road'}</p>
          <h2 id="city-map-title">{view === 'hills' ? 'Palatine and Capitoline' : mode === 'capital' ? 'The Augustan Capital' : state.era >= 7 ? 'Rome' : 'The Settlement'}</h2>
        </div>
        <div className="map-control-stack">
          <div className="map-view-tools" role="group" aria-label="City map view">
            <button type="button" className={view === 'overview' ? 'active' : ''} onClick={() => selectView('overview')} aria-pressed={view === 'overview'} title="Strategic overview"><MapIcon /><span>Strategic overview</span></button>
            <button type="button" className={view === 'hills' ? 'active' : ''} onClick={() => selectView('hills')} aria-pressed={view === 'hills'} title="Hill terrain"><Mountain /><span>Hill terrain</span></button>
          </div>
          <div className="map-tools" role="group" aria-label="Map overlay">
            {modes.map((item) => {
              const Icon = item.icon
              return <button type="button" key={item.id} className={mode === item.id ? 'active' : ''} onClick={() => setMode(item.id)} aria-pressed={mode === item.id} title={`${item.label} overlay`}><Icon /><span>{item.label}</span></button>
            })}
          </div>
        </div>
      </div>
      {view === 'hills' ? <TerrainScene state={state} mode={mode} onSelectDistrict={onSelectDistrict} /> : <div className={`city-map map-mode-${mode}`} role="group" aria-label={`District map showing ${mode}`}>
        <div className="tiber-river" aria-hidden="true"><span>Tiber</span></div>
        <div className="forum-basin" aria-hidden="true" />
        <div className="salt-road road-a" aria-hidden="true" />
        <div className="salt-road road-b" aria-hidden="true" />
        <div className="network-overlay" aria-hidden="true">
          {links.map((link) => <NetworkLine key={`${mode}-${link.from}-${link.to}`} {...link} mode={mode} />)}
        </div>
        {mode === 'capital' && <div className="augustan-capital-layer" aria-label="Schematic Augustan capital projects">
          <p className="capital-map-note">Schematic positions for strategy play, not an archaeological survey.</p>
          <span className="capital-zone campus-martius" aria-hidden="true">Campus Martius</span>
          {landmarks.map((landmark) => (
            <span
              key={landmark.id}
              className={`capital-landmark stage-${landmark.stage.key}`}
              style={{ left: `${landmark.x}%`, top: `${landmark.y}%` }}
              tabIndex="0"
              title={`${landmark.name} — ${landmark.zone} — ${landmark.stage.label}`}
              aria-label={`${landmark.name}, ${landmark.zone}, ${landmark.stage.label}, ${landmark.progress} of ${landmark.requiredSeasons} stages`}
            >
              <img src={landmark.art.src} alt="" draggable="false" />
              <i>{landmark.progress}/{landmark.requiredSeasons}</i>
              <strong>{landmark.name}</strong>
              <small>{landmark.zone} · {landmark.stage.label}</small>
            </span>
          ))}
        </div>}
        {DISTRICTS.map((district) => {
          const buildings = state.buildings.filter((building) => building.districtId === district.id)
          const projects = (state.projects ?? []).filter((project) => project.districtId === district.id && !project.replaceInstanceId)
          const selected = state.selectedDistrict === district.id
          const isCovered = mode === 'terrain' || covered.has(district.id)
          return (
            <button
              type="button"
              key={district.id}
              className={`district district-${district.id}${selected ? ' selected' : ''}${isCovered ? ' network-covered' : ' network-dimmed'}${projects.length ? ' has-project' : ''}`}
              style={{ left: `${district.x}%`, top: `${district.y}%` }}
              onClick={() => onSelectDistrict(district.id)}
              aria-pressed={selected}
              aria-label={`${district.name}, ${buildings.length + projects.length} of ${district.capacity} plots used${isCovered && mode !== 'terrain' ? `, covered by ${mode}` : ''}`}
            >
              <span className="hill-mass" aria-hidden="true" />
              <span className="district-buildings" aria-hidden="true">
                {buildings.map((building, index) => <BuildingModel key={building.instanceId} building={building} index={index} />)}
              </span>
              <span className="district-label">
                <strong>{district.name}</strong>
                <small>{buildings.length + projects.length}/{district.capacity} plots{projects.length ? ' · work underway' : ''}</small>
              </span>
            </button>
          )
        })}
        <div className="map-legend" aria-hidden="true">
          {mode === 'terrain' ? <><span><i className="legend-hill" /> Hill</span><span><i className="legend-valley" /> Low ground</span><span><i className="legend-river" /> River</span></> : mode === 'capital' ? <><span>Dim: reserved site</span><span>Bright: operating work</span></> : <><span><i className={`legend-network legend-${mode}`} /> {MODES.find((item) => item.id === mode).label} link</span><span>Bright districts are served</span></>}
        </div>
      </div>}
    </section>
  )
}

import { districtNetworkReport } from './simulation.js'

const PALATINE_CAPITOLINE = {
  id: 'palatine-capitoline',
  label: 'Hill terrain',
  shortLabel: 'Hills',
  background: '/images/scenes/palatine-capitoline-terrain-v1.webp',
  districts: ['palatine', 'capitoline'],
  gates: [
    { id: 'palatine-gate', districtId: 'palatine', x: 48, y: 91, label: 'Palatine approach' },
    { id: 'capitoline-gate', districtId: 'capitoline', x: 9, y: 12, label: 'Capitoline approach' },
  ],
  plots: [
    { id: 'palatine-1', districtId: 'palatine', x: 22, y: 63, scale: 0.74, depth: 63, roadParent: 'palatine-2' },
    { id: 'palatine-2', districtId: 'palatine', x: 46, y: 61, scale: 0.79, depth: 61, roadParent: 'palatine-gate' },
    { id: 'palatine-3', districtId: 'palatine', x: 72, y: 62, scale: 0.76, depth: 62, roadParent: 'palatine-2' },
    { id: 'palatine-4', districtId: 'palatine', x: 60, y: 39, scale: 0.66, depth: 39, roadParent: 'palatine-2' },
    { id: 'palatine-5', districtId: 'palatine', x: 35, y: 41, scale: 0.65, depth: 41, roadParent: 'palatine-4' },
    { id: 'capitoline-1', districtId: 'capitoline', x: 42, y: 19, scale: 0.55, depth: 19, roadParent: 'capitoline-2' },
    { id: 'capitoline-2', districtId: 'capitoline', x: 69, y: 21, scale: 0.56, depth: 21, roadParent: 'capitoline-gate' },
    { id: 'capitoline-3', districtId: 'capitoline', x: 17, y: 39, scale: 0.62, depth: 39, roadParent: 'capitoline-1' },
  ],
}

export const ROME_SCENES = [PALATINE_CAPITOLINE]

export function sceneForId(sceneId) {
  return ROME_SCENES.find((scene) => scene.id === sceneId) ?? PALATINE_CAPITOLINE
}

export function districtGate(scene, districtId) {
  return scene.gates.find((gate) => gate.districtId === districtId) ?? null
}

export function assignBuildingsToScene(state, sceneId) {
  const scene = sceneForId(sceneId)
  return scene.districts.flatMap((districtId) => {
    const plots = scene.plots.filter((plot) => plot.districtId === districtId)
    const buildings = (state?.buildings ?? []).filter((building) => building.districtId === districtId)
    return buildings.slice(0, plots.length).map((building, index) => ({
      building,
      plot: plots[index],
    }))
  })
}

export function roadLinksForScene(state, sceneId) {
  const scene = sceneForId(sceneId)
  const nodes = new Map([...scene.plots, ...scene.gates].map((node) => [node.id, node]))
  const network = districtNetworkReport(state)
  const links = new Map()

  for (const { plot } of assignBuildingsToScene(state, sceneId)) {
    let current = plot
    const visited = new Set()
    while (current?.roadParent && !visited.has(current.id)) {
      visited.add(current.id)
      const parent = nodes.get(current.roadParent)
      if (!parent) break
      const key = [current.id, parent.id].sort().join(':')
      if (!links.has(key)) {
        links.set(key, {
          id: key,
          districtId: plot.districtId,
          from: current,
          to: parent,
          improved: Boolean(network[plot.districtId]?.improvedRoad),
        })
      }
      current = parent
    }
  }

  return [...links.values()]
}

import { EASTERN_HILLS_TERRAIN } from './easternHillsTerrain.js'

const PALATINE_CAPITOLINE = {
  id: 'palatine-capitoline',
  label: 'Hill terrain',
  shortLabel: 'Hills',
  title: 'Palatine and Capitoline',
  eyebrow: 'Build the hill communities plot by plot',
  alt: 'Natural hill terraces above the Tiber prepared for settlement',
  background: '/images/scenes/palatine-capitoline-terrain-v1.webp',
  districts: ['palatine', 'capitoline'],
  plots: [
    { id: 'palatine-1', districtId: 'palatine', x: 22, y: 63, scale: 0.74, depth: 63 },
    { id: 'palatine-2', districtId: 'palatine', x: 46, y: 61, scale: 0.79, depth: 61 },
    { id: 'palatine-3', districtId: 'palatine', x: 72, y: 62, scale: 0.76, depth: 62 },
    { id: 'palatine-4', districtId: 'palatine', x: 60, y: 39, scale: 0.66, depth: 39 },
    { id: 'palatine-5', districtId: 'palatine', x: 35, y: 41, scale: 0.65, depth: 41 },
    { id: 'capitoline-1', districtId: 'capitoline', x: 42, y: 19, scale: 0.55, depth: 19 },
    { id: 'capitoline-2', districtId: 'capitoline', x: 69, y: 21, scale: 0.56, depth: 21 },
    { id: 'capitoline-3', districtId: 'capitoline', x: 17, y: 39, scale: 0.62, depth: 39 },
  ],
}

const TIBER_AVENTINE = {
  id: 'tiber-aventine',
  label: 'Tiber crossing',
  shortLabel: 'Tiber',
  title: 'Tiber Bank and Aventine',
  eyebrow: 'Bind the river landing to the southern hill',
  alt: 'The Tiber ford, riverbank clearings, and lower Aventine terraces prepared for settlement',
  background: '/images/scenes/tiber-aventine-terrain-v1.webp',
  districts: ['tiber', 'aventine'],
  plots: [
    { id: 'tiber-1', districtId: 'tiber', x: 34, y: 82, scale: 0.75, depth: 82 },
    { id: 'tiber-2', districtId: 'tiber', x: 51, y: 63, scale: 0.69, depth: 63 },
    { id: 'tiber-3', districtId: 'tiber', x: 56, y: 42, scale: 0.61, depth: 42 },
    { id: 'aventine-1', districtId: 'aventine', x: 73, y: 71, scale: 0.72, depth: 71 },
    { id: 'aventine-2', districtId: 'aventine', x: 83, y: 49, scale: 0.65, depth: 49 },
    { id: 'aventine-3', districtId: 'aventine', x: 72, y: 30, scale: 0.57, depth: 30 },
    { id: 'aventine-4', districtId: 'aventine', x: 88, y: 17, scale: 0.53, depth: 17 },
  ],
}

const FORUM_QUIRINAL = {
  id: 'forum-quirinal',
  label: 'Forum valley',
  shortLabel: 'Forum',
  title: 'Forum Valley and Quirinal',
  eyebrow: 'Drain the low ground and bind it to the northern height',
  alt: 'Seasonally wet Forum lowland and dry Quirinal terraces prepared for settlement',
  background: '/images/scenes/forum-quirinal-terrain-v1.webp',
  districts: ['forum', 'quirinal'],
  plots: [
    { id: 'forum-1', districtId: 'forum', x: 21, y: 82, scale: 0.74, depth: 82 },
    { id: 'forum-2', districtId: 'forum', x: 38, y: 56, scale: 0.68, depth: 56 },
    { id: 'forum-3', districtId: 'forum', x: 50, y: 72, scale: 0.72, depth: 72 },
    { id: 'forum-4', districtId: 'forum', x: 78, y: 73, scale: 0.71, depth: 73 },
    { id: 'quirinal-1', districtId: 'quirinal', x: 74, y: 43, scale: 0.61, depth: 43 },
    { id: 'quirinal-2', districtId: 'quirinal', x: 67, y: 25, scale: 0.56, depth: 25 },
    { id: 'quirinal-3', districtId: 'quirinal', x: 84, y: 11, scale: 0.52, depth: 11 },
  ],
}

const EASTERN_HILLS = {
  id: 'eastern-hills',
  label: 'Eastern hills',
  shortLabel: 'East',
  title: 'Caelian, Esquiline, and Viminal',
  eyebrow: 'Open new districts without abandoning the old city',
  alt: 'Undeveloped eastern ridges and broad clearings prepared for the expanding city',
  background: EASTERN_HILLS_TERRAIN,
  districts: ['caelian', 'esquiline', 'viminal'],
  plots: [
    { id: 'caelian-1', districtId: 'caelian', x: 18, y: 86, scale: 0.78, depth: 86 },
    { id: 'caelian-2', districtId: 'caelian', x: 37, y: 79, scale: 0.74, depth: 79 },
    { id: 'caelian-3', districtId: 'caelian', x: 27, y: 63, scale: 0.69, depth: 63 },
    { id: 'caelian-4', districtId: 'caelian', x: 45, y: 61, scale: 0.67, depth: 61 },
    { id: 'esquiline-1', districtId: 'esquiline', x: 56, y: 55, scale: 0.66, depth: 55 },
    { id: 'esquiline-2', districtId: 'esquiline', x: 74, y: 57, scale: 0.64, depth: 57 },
    { id: 'esquiline-3', districtId: 'esquiline', x: 62, y: 39, scale: 0.59, depth: 39 },
    { id: 'esquiline-4', districtId: 'esquiline', x: 80, y: 38, scale: 0.57, depth: 38 },
    { id: 'viminal-1', districtId: 'viminal', x: 50, y: 24, scale: 0.54, depth: 24 },
    { id: 'viminal-2', districtId: 'viminal', x: 68, y: 22, scale: 0.52, depth: 22 },
    { id: 'viminal-3', districtId: 'viminal', x: 83, y: 20, scale: 0.49, depth: 20 },
    { id: 'viminal-4', districtId: 'viminal', x: 90, y: 10, scale: 0.45, depth: 10 },
  ],
}

export const DEFAULT_SCENE_ID = PALATINE_CAPITOLINE.id

export const ROME_SCENES = [PALATINE_CAPITOLINE, TIBER_AVENTINE, FORUM_QUIRINAL, EASTERN_HILLS]

export function sceneForId(sceneId) {
  return ROME_SCENES.find((scene) => scene.id === sceneId) ?? PALATINE_CAPITOLINE
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

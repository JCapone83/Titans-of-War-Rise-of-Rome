export const soundtrackTracks = [
  {
    id: 'bach-aria',
    title: 'Goldberg Variations: Aria',
    composer: 'Johann Sebastian Bach',
    performer: 'Kimiko Ishizaka',
    license: 'CC0 1.0 Universal',
    provider: 'Free Music Archive',
    src: './audio/bach-goldberg-aria.mp3',
    source: 'https://freemusicarchive.org/music/Kimiko_Ishizaka/The_Open_Goldberg_Variations/KIMIKO_ISHIZAKA_-_Goldberg_Variations_BWV_988_-_01_-_Aria__44k-24b/',
  },
  {
    id: 'handel-sarabande',
    title: 'Water Music: Sarabande',
    composer: 'George Frideric Handel',
    performer: 'United States Marine Band, Marine Chamber Orchestra',
    license: 'Public domain - U.S. federal work',
    provider: 'Wikimedia Commons',
    src: './audio/handel-water-music-sarabande.mp3',
    source: "https://commons.wikimedia.org/wiki/File:Handel's_Water_Music_-_16._Sarabande_-_Chamber_Orchestra_-_United_States_Marine_Band.opus",
  },
  {
    id: 'holst-venus',
    title: 'Venus, the Bringer of Peace',
    composer: 'Gustav Holst',
    performer: 'United States Air Force Heritage of America Band',
    license: 'Public domain - U.S. federal work',
    provider: 'Wikimedia Commons',
    src: './audio/holst-venus.mp3',
    source: 'https://commons.wikimedia.org/wiki/File:Holst-_venus.ogg',
  },
  {
    id: 'respighi-appian-way',
    title: 'Pines of the Appian Way',
    composer: 'Ottorino Respighi',
    performer: 'United States Marine Band',
    license: 'Public domain - U.S. federal work',
    provider: 'Wikimedia Commons',
    src: './audio/respighi-pines-appian-way.mp3',
    source: 'https://commons.wikimedia.org/wiki/File:Respighi_Pines_of_the_Appian_way.oga',
  },
  {
    id: 'holst-mars',
    title: 'Mars, the Bringer of War',
    composer: 'Gustav Holst',
    performer: 'United States Air Force Heritage of America Band',
    license: 'Public domain - U.S. federal work',
    provider: 'Wikimedia Commons',
    src: './audio/holst-mars.mp3',
    source: 'https://commons.wikimedia.org/wiki/File:Holst-_mars.ogg',
  },
  {
    id: 'sousa-gladiator',
    title: 'The Gladiator',
    composer: 'John Philip Sousa',
    performer: 'United States Marine Band',
    license: 'Public domain - U.S. federal work',
    provider: 'Wikimedia Commons',
    src: './audio/sousa-gladiator.mp3',
    source: "https://commons.wikimedia.org/wiki/File:Sousa%27s_%22The_Gladiator%22_-_United_States_Marine_Band_(2016).ogg",
  },
]

const TURN_TRACKS = [
  [10, 'bach-aria'],
  [16, 'handel-sarabande'],
  [23, 'holst-venus'],
  [29, 'respighi-appian-way'],
  [36, 'holst-mars'],
  [41, 'sousa-gladiator'],
  [54, 'holst-mars'],
  [61, 'holst-venus'],
  [70, 'sousa-gladiator'],
  [76, 'respighi-appian-way'],
]

export function parseStoredVolume(value) {
  if (value === null || value === '') return 0.24
  const parsed = Number(value)
  return Number.isFinite(parsed) && parsed >= 0 && parsed <= 1 ? parsed : 0.24
}

export function parseStoredMuted(value) {
  return value === 'true'
}

export function soundtrackTrackIdForTurn(turn) {
  const normalizedTurn = Number.isFinite(Number(turn)) ? Math.max(1, Math.min(76, Math.trunc(Number(turn)))) : 1
  return TURN_TRACKS.find(([lastTurn]) => normalizedTurn <= lastTurn)?.[1] ?? 'respighi-appian-way'
}

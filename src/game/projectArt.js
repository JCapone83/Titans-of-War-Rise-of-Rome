export const CIVIL_SETTLEMENT_PROJECT_ART = {
  caesarianForum: {
    src: '/images/projects/forum-of-caesar-v1.png',
    alt: 'Isometric reconstruction of the Forum of Caesar and the Temple of Venus Genetrix.',
    evidence: 'Evidence-led reconstruction',
  },
  curiaJulia: {
    src: '/images/projects/curia-julia-v1.png',
    alt: 'Isometric reconstruction of the Curia Julia Senate hall with its stepped interior seating.',
    evidence: 'Evidence-led reconstruction',
  },
  basilicaJulia: {
    src: '/images/projects/basilica-julia-v1.png',
    alt: 'Isometric reconstruction of the long multi-aisled Basilica Julia civic and legal hall.',
    evidence: 'Evidence-led reconstruction',
  },
  veteranLandRoadRegistry: {
    src: '/images/projects/veteran-land-road-registry-v1.png',
    alt: 'Isometric game abstraction of a veteran land, survey, appeals, and road registry compound.',
    evidence: 'Game abstraction',
  },
}

export const AUGUSTAN_PROJECT_ART = {
  palatineOfficialPrecinct: {
    src: '/images/projects/house-of-augustus-v1.png',
    alt: 'Isometric reconstruction of a restrained Augustan residence and official temple precinct on the Palatine.',
    evidence: 'Evidence-led reconstruction',
  },
  mausoleumAugustus: {
    src: '/images/projects/mausoleum-of-augustus-v1.png',
    alt: 'Isometric synthesis of the Mausoleum of Augustus, its planted mound, drum, approaches, and public grounds.',
    evidence: 'Text-and-evidence synthesis',
  },
  agrippanPantheon: {
    src: '/images/projects/agrippan-pantheon-v1.png',
    alt: 'Hypothetical isometric reconstruction of Agrippa’s disputed Augustan temple precinct in the Campus Martius.',
    evidence: 'Uncertainty-labeled reconstruction hypothesis',
  },
  bathsAgrippa: {
    src: '/images/projects/baths-of-agrippa-v1.png',
    alt: 'Isometric synthesis of Agrippa’s public bathing complex with service courts, water, and landscaped access.',
    evidence: 'Text-and-evidence synthesis',
  },
  theatreMarcellus: {
    src: '/images/projects/theatre-of-marcellus-v1.png',
    alt: 'Isometric reconstruction of the Theatre of Marcellus with arcaded exterior, stage, and crowd approaches.',
    evidence: 'Evidence-led reconstruction',
  },
  araPacis: {
    src: '/images/projects/ara-pacis-v1.png',
    alt: 'Isometric reconstruction of the Ara Pacis precinct with its carved enclosure, altar, stairs, and processional approach.',
    evidence: 'Evidence-led reconstruction',
  },
  forumAugustus: {
    src: '/images/projects/forum-of-augustus-v1.png',
    alt: 'Isometric reconstruction of the Forum of Augustus and Temple of Mars Ultor with courts and porticoes.',
    evidence: 'Evidence-led reconstruction',
  },
  vigilesWardNetwork: {
    src: '/images/projects/vigiles-ward-station-v1.png',
    alt: 'Isometric game abstraction of a vigiles ward station with patrol equipment, water access, and night-watch quarters.',
    evidence: 'Game abstraction',
  },
}

const STAGES = {
  reserved: { key: 'reserved', label: 'Reserved site' },
  foundations: { key: 'foundations', label: 'Foundations and service' },
  structure: { key: 'structure', label: 'Structural shell' },
  operating: { key: 'operating', label: 'Operating form' },
}

export const artForCivilSettlementProject = (projectId) => CIVIL_SETTLEMENT_PROJECT_ART[projectId] ?? null
export const artForAugustanProject = (projectId) => AUGUSTAN_PROJECT_ART[projectId] ?? null

export function civilSettlementProjectStage(project, definition) {
  const progress = Math.max(0, Number(project?.progress) || 0)
  const seasons = Math.max(1, Number(definition?.seasons) || Number(project?.requiredSeasons) || 1)
  if (project?.completed || progress >= seasons) return STAGES.operating
  if (progress === 0) return STAGES.reserved
  if (seasons === 3) return progress === 1 ? STAGES.foundations : STAGES.structure
  if (seasons === 4) return progress <= 2 ? STAGES.foundations : STAGES.structure
  return progress / seasons <= 0.5 ? STAGES.foundations : STAGES.structure
}

export function augustanProjectStage(project, definition) {
  return civilSettlementProjectStage(project, definition)
}

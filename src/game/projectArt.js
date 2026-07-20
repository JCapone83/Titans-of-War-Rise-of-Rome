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

export const IMPERIAL_PROJECT_ART = {
  castraPraetoria: {
    src: '/images/projects/castra-praetoria-v1.png',
    alt: 'Isometric reconstruction of the early Castra Praetoria with low perimeter, barrack grid, headquarters, stores, and training ground.',
    evidence: 'Evidence-led plan with generalized service interiors',
  },
  aquaClaudia: {
    src: '/images/projects/aqua-claudia-v1.png',
    alt: 'Isometric reconstruction of Aqua Claudia and Anio Novus with two enclosed conduits and monumental arcades.',
    evidence: 'Evidence-led infrastructure synthesis',
  },
  claudianPortus: {
    src: '/images/projects/claudian-portus-v1.png',
    alt: 'Isometric reconstruction of Claudian Portus and Imperial Horrea with harbor works, canals, and guarded stores.',
    evidence: 'Evidence-led harbor system with bounded warehouse abstraction',
  },
  domusAurea: {
    src: '/images/projects/domus-aurea-v1.png',
    alt: 'Isometric reconstruction of the Domus Aurea as a connected palace-park with pavilions, gardens, waterworks, lake, and displaced streets.',
    evidence: 'Evidence-led precinct with reconstruction uncertainty above surviving fabric',
  },
  flavianAmphitheatre: {
    src: '/images/projects/flavian-amphitheatre-v1.png',
    alt: 'Isometric reconstruction of the intact Flavian Amphitheatre with arcades, arena, seating, and crowd routes.',
    evidence: 'Evidence-led intact Flavian reconstruction',
  },
  templePeace: {
    src: '/images/projects/temple-peace-v1.png',
    alt: 'Isometric reconstruction of the Temple of Peace as a rectangular porticoed complex with planted courts, pools, displays, and sacred hall.',
    evidence: 'Evidence-led forum-like precinct with cautious functional interpretation',
  },
  archTitus: {
    src: '/images/projects/arch-titus-v1.png',
    alt: 'Isometric reconstruction of the intact single-bay Arch of Titus with composite columns, attic, inner reliefs, and triumphal route.',
    evidence: 'Evidence-led single-bay honorific arch',
  },
  domitianicPalace: {
    src: '/images/projects/domitianic-palace-v1.png',
    alt: 'Isometric reconstruction of Domitianic Palace Administration with public halls, offices, courts, and service routes.',
    evidence: 'Evidence-led plan with reconstructed upper architecture',
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

export const AUGUSTAN_PROJECT_SITES = {
  palatineOfficialPrecinct: { name: 'Palatine Official Precinct', zone: 'Palatine', x: 54, y: 39, unlockTurn: 55 },
  mausoleumAugustus: { name: 'Mausoleum of Augustus', zone: 'Campus Martius', x: 18, y: 17, unlockTurn: 55 },
  agrippanPantheon: { name: "Agrippa's Pantheon Precinct", zone: 'Campus Martius', x: 29, y: 34, unlockTurn: 55 },
  bathsAgrippa: { name: 'Baths of Agrippa', zone: 'Campus Martius', x: 20, y: 47, unlockTurn: 56 },
  theatreMarcellus: { name: 'Theatre of Marcellus', zone: 'Circus Flaminius', x: 30, y: 72, unlockTurn: 57 },
  araPacis: { name: 'Ara Pacis Augustae', zone: 'Campus Martius', x: 10, y: 31, unlockTurn: 57 },
  forumAugustus: { name: 'Forum of Augustus', zone: 'Roman Forum / Subura', x: 45, y: 57, unlockTurn: 59 },
  vigilesWardNetwork: { name: 'Vigiles Ward Network', zone: 'Urban wards', x: 72, y: 52, unlockTurn: 60 },
}

const STAGES = {
  reserved: { key: 'reserved', label: 'Reserved site' },
  foundations: { key: 'foundations', label: 'Foundations and service' },
  structure: { key: 'structure', label: 'Structural shell' },
  operating: { key: 'operating', label: 'Operating form' },
}

export const artForCivilSettlementProject = (projectId) => CIVIL_SETTLEMENT_PROJECT_ART[projectId] ?? null
export const artForAugustanProject = (projectId) => AUGUSTAN_PROJECT_ART[projectId] ?? null
export const artForImperialProject = (projectId) => IMPERIAL_PROJECT_ART[projectId] ?? null

export function augustanCapitalLandmarks(state) {
  if (!state?.augustanCity || state.era < 10) return []
  return Object.entries(AUGUSTAN_PROJECT_SITES).flatMap(([id, site]) => {
    if (state.turn < site.unlockTurn) return []
    const project = state.augustanCity.projects?.[id]
    const art = artForAugustanProject(id)
    if (!project || !art) return []
    const stage = augustanProjectStage(project, { seasons: project.requiredSeasons })
    return [{
      id,
      ...site,
      art,
      stage,
      progress: Math.max(0, project.progress ?? 0),
      requiredSeasons: Math.max(1, project.requiredSeasons ?? 1),
      completed: Boolean(project.completed),
    }]
  })
}

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

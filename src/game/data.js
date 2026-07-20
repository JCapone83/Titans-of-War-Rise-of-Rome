export const ERAS = [
  {
    id: 'hill-settlements',
    name: 'Hill Settlements',
    span: '753-650 BC',
    turns: [1, 5],
    summary: 'Bind scattered communities without exhausting the households that sustain them.',
  },
  {
    id: 'city-of-kings',
    name: 'City of Kings',
    span: '650-509 BC',
    turns: [6, 10],
    summary: 'Turn ritual authority, drainage, trade, and organized labor into a durable city.',
  },
  {
    id: 'early-republic',
    name: 'Early Republic',
    span: '509-390 BC',
    turns: [11, 16],
    summary: 'Replace royal command with annual offices, then sustain a long war without exhausting the households behind the levy.',
  },
  {
    id: 'sack-reconstruction',
    name: 'Sack and Reconstruction',
    span: '390-338 BC',
    turns: [17, 20],
    summary: 'Survive catastrophe, rebuild without reproducing every weakness, and restore Rome\'s place among the Latin communities.',
  },
  {
    id: 'regional-planning',
    name: 'Regional Planning',
    span: '338-321 BC',
    turns: [21, 23],
    summary: 'Turn the Latin settlement into obligations and strategic depth, then survive the Samnite test at the Caudine Forks.',
  },
  {
    id: 'roads-to-italy',
    name: 'Roads to Italy',
    span: '312-264 BC',
    turns: [24, 29],
    summary: 'Bind roads, water, allies, reserves, and repeated armies into an Italian system capable of outlasting coalitions and kings.',
  },
  {
    id: 'mediterranean-republic',
    name: 'Mediterranean Republic',
    span: '264-201 BC',
    turns: [30, 36],
    summary: 'Build maritime capacity, survive the Hannibalic emergency, and settle victory without exhausting the city or Italian compact.',
  },
  {
    id: 'conquest-metropolis',
    name: 'Conquest and Metropolis',
    span: '200-133 BC',
    turns: [37, 41],
    summary: 'Convert conquest into public capacity without allowing crowding, contracts, commands, or patrons to consume the republican city.',
  },
]

export const TURN_YEARS = [753, 735, 715, 690, 660, 640, 620, 600, 575, 535, 509, 503, 494, 406, 396, 390, 390, 389, 385, 338, 338, 326, 321, 312, 304, 295, 280, 275, 264, 261, 256, 241, 218, 216, 211, 201, 197, 184, 167, 146, 133]

export const ITALIAN_PROJECTS = {
  viaAppia: {
    id: 'viaAppia', name: 'Via Appia', requiredSeasons: 3,
    cost: { stone: 2, treasury: 2, grain: 1 },
    summary: 'A durable military and commercial road toward Capua. It accelerates Roman response and the movement of an enemy using the same corridor.',
  },
  aquaAppia: {
    id: 'aquaAppia', name: 'Aqua Appia', requiredSeasons: 3,
    cost: { stone: 2, treasury: 3 },
    summary: 'A mostly underground water work whose urban capacity carries a permanent treasury and maintenance obligation.',
  },
}

export const MEDITERRANEAN_PROJECTS = {
  appianApproach: {
    id: 'appianApproach', name: 'Via Appia and Porta Capena Approach', seasons: 2,
    cost: { timber: 1, grain: 1 },
    prerequisite: 'viaAppia',
    summary: 'A controlled gate and transport corridor at the Porta Capena approach. It improves access while exposing the route to hostile movement and gate security burdens.',
    completionMetrics: { trade: 5, readiness: 3 },
    completionMediterranean: { emergencyReserve: 4 },
    completionItalian: { hostileAccess: 5 },
    upkeepResources: { treasury: -1 },
    upkeepMetrics: { readiness: -1 },
    burdenLabel: 'Gate guards, road crews, and hostile access require permanent attention.',
  },
  tiberEmporium: {
    id: 'tiberEmporium', name: 'Tiber Landings and Emporium', seasons: 3,
    cost: { timber: 1, grain: 1 },
    summary: 'A bulk river transshipment zone exposed to flood, fire, theft, sanitation, and labor strain.',
    completionMetrics: { trade: 8, food: 3 },
    completionMediterranean: { importedGrainShare: 6, contractorExposure: 2 },
    upkeepResources: { treasury: -1 },
    upkeepMetrics: { sanitation: -1 },
    upkeepMediterranean: { contractorExposure: 1 },
    burdenLabel: 'Flood watch, fire patrols, labor control, and contract inspection recur each season.',
  },
  republicanHorrea: {
    id: 'republicanHorrea', name: 'Republican Horrea', seasons: 3,
    cost: { stone: 1, timber: 1, grain: 1 },
    prerequisite: 'tiberEmporium',
    summary: 'Guarded, ventilated courtyard storage tied to records, weights, and river transport.',
    completionMetrics: { food: 6, order: 2 },
    completionMediterranean: { importedGrainShare: 5, provincialTrust: 2 },
    upkeepResources: { treasury: -1 },
    upkeepMediterranean: { contractorExposure: 1 },
    burdenLabel: 'Guards, ventilation, records, and measured release of stores require continuing expense.',
  },
  republicanCircus: {
    id: 'republicanCircus', name: 'Republican Circus Grounds and Timber Seating', seasons: 3,
    cost: { timber: 2, grain: 1 },
    summary: 'A progressively formalized valley with timber seating, crowd routes, fire watch, and service burdens—not a later stone stadium.',
    completionMetrics: { order: 6, auspices: 4, trade: 2 },
    completionMediterranean: { provincialTrust: 2 },
    upkeepResources: { treasury: -1, grain: -1 },
    upkeepMetrics: { sanitation: -1 },
    burdenLabel: 'Timber inspection, fire watch, crowd routes, and festival service consume stores and crews.',
  },
}

export const METROPOLITAN_PROJECTS = {
  republicanBasilica: {
    id: 'republicanBasilica', name: 'Republican Basilica', seasons: 4,
    cost: { stone: 1, timber: 1 },
    summary: 'A long roofed civic hall for hearings, arbitration, exchange, and records: a Republican working building rather than a church or later imperial marble monument.',
    completionMetrics: { order: 5, trade: 4 },
    completionMetropolitan: { legalCaseLoad: -11, provincialPetitionBacklog: -6, contractingCapacity: 8, publicProvision: 5 },
    upkeepResources: { treasury: -1 },
    upkeepMetropolitan: { patronageConcentration: 1, corruptionExposure: 1 },
    burdenLabel: 'Clerks, hearings, roof repair, crowd control, and public access require recurring supervision.',
  },
  regulatedMacellum: {
    id: 'regulatedMacellum', name: 'Regulated Macellum', seasons: 3,
    cost: { timber: 1, grain: 1 },
    prerequisite: 'tiberEmporium',
    summary: 'An inspected food market tied to the Tiber landings, with measured stalls, water, drains, waste removal, and enforceable market rules.',
    completionMetrics: { food: 7, sanitation: 4, trade: 3 },
    completionMetropolitan: { importedGrainDependence: -6, rentPressure: -3, publicProvision: 10, contractingCapacity: 4 },
    upkeepResources: { treasury: -1 },
    upkeepMetrics: { sanitation: -1 },
    upkeepMetropolitan: { corruptionExposure: 1 },
    burdenLabel: 'Inspectors, water, drains, refuse removal, and stall records must be maintained every season.',
  },
  aquaMarcia: {
    id: 'aquaMarcia', name: 'Aqua Marcia', seasons: 4,
    cost: { stone: 1, grain: 1 },
    prerequisite: 'aquaAppia',
    summary: 'A new high-quality water supply whose source, conduit, distribution points, inspection shafts, and maintenance organization matter more than a later arcade silhouette.',
    completionMetrics: { water: 10, sanitation: 5 },
    completionMetropolitan: { publicProvision: 13, rentPressure: -4, urbanMigration: 3 },
    upkeepResources: { treasury: -2 },
    upkeepMetropolitan: { contractingCapacity: 1, corruptionExposure: 1 },
    burdenLabel: 'Source protection, conduit inspection, distribution, and repairs create a permanent public charge.',
  },
  civicPorticoes: {
    id: 'civicPorticoes', name: 'Civic Porticoes', seasons: 3,
    cost: { stone: 1, timber: 1 },
    prerequisite: 'republicanBasilica',
    summary: 'Connected shaded circulation with backing rooms and drainage that spreads public business beyond one overloaded square, not a row of decorative columns.',
    completionMetrics: { order: 4, sanitation: 2, trade: 3 },
    completionMetropolitan: { legalCaseLoad: -5, rentPressure: -3, provincialPetitionBacklog: -5, publicProvision: 6 },
    upkeepResources: { treasury: -1 },
    upkeepMetropolitan: { patronageConcentration: 1 },
    burdenLabel: 'Roofing, paving, drains, policing, and access to the backing rooms remain recurring obligations.',
  },
}

export const RESOURCE_META = {
  grain: { label: 'Grain', color: '#d8aa42' },
  timber: { label: 'Timber', color: '#8c613d' },
  stone: { label: 'Stone', color: '#a9aca4' },
  bronze: { label: 'Bronze', color: '#bf7348' },
  treasury: { label: 'Treasury', color: '#d7c172' },
}

export const METRIC_META = {
  food: { label: 'Food security', short: 'Food' },
  water: { label: 'Water supply', short: 'Water' },
  shelter: { label: 'Shelter', short: 'Shelter' },
  sanitation: { label: 'Sanitation & fire', short: 'Health' },
  order: { label: 'Civic order', short: 'Order' },
  auspices: { label: 'Sacred confidence', short: 'Auspices' },
  readiness: { label: 'Levy readiness', short: 'Levy' },
  trade: { label: 'Trade capacity', short: 'Trade' },
}

export const FACTIONS = {
  clans: { name: 'Leading clans', motive: 'Household authority and land' },
  commons: { name: 'Working households', motive: 'Food, protection, and fair burdens' },
  priests: { name: 'Priestly colleges', motive: 'Ritual order and proper auspices' },
  levy: { name: 'Citizen levy', motive: 'Defensible ground and limited campaigning' },
  traders: { name: 'Tiber traders', motive: 'Secure crossings, weights, and markets' },
  allies: { name: 'Latin neighbors', motive: 'Reciprocity without Roman domination' },
}

export const DISTRICTS = [
  { id: 'palatine', name: 'Palatine', x: 49, y: 43, terrain: ['hill', 'central'], capacity: 4, baseHousing: 500, startingPopulation: 450, favored: ['housing', 'shrine'], neighbors: ['capitoline', 'forum', 'aventine'], specialty: 'Households and common rites reinforce one another here.', note: 'Defensible ground associated by Roman tradition with the earliest settlement.' },
  { id: 'capitoline', name: 'Capitoline', x: 35, y: 28, terrain: ['high', 'rock'], capacity: 3, baseHousing: 180, startingPopulation: 120, favored: ['shrine', 'defense'], neighbors: ['palatine', 'forum', 'quirinal'], specialty: 'Height strengthens sacred and defensive works.', note: 'A commanding height suited to citadel and cult.' },
  { id: 'forum', name: 'Forum Valley', x: 43, y: 58, terrain: ['low', 'wet'], capacity: 4, baseHousing: 0, startingPopulation: 0, favored: ['drainage', 'market'], neighbors: ['palatine', 'capitoline', 'aventine', 'tiber', 'quirinal'], specialty: 'Drainage converts divided low ground into civic capacity.', note: 'Low ground between hills; useful only after sustained drainage.' },
  { id: 'aventine', name: 'Aventine', x: 63, y: 65, terrain: ['hill', 'outer'], capacity: 4, baseHousing: 240, startingPopulation: 210, favored: ['grain', 'housing'], neighbors: ['palatine', 'forum', 'tiber'], specialty: 'Storage and housing protect the southern food road.', note: 'An outer hill watching the river road and food routes.' },
  { id: 'tiber', name: 'Tiber Bank', x: 20, y: 60, terrain: ['river', 'floodplain'], capacity: 3, baseHousing: 120, startingPopulation: 90, favored: ['market', 'grain'], neighbors: ['forum', 'aventine'], specialty: 'Exchange and storage prosper together, but both face flood risk.', note: 'Trade and salt routes meet flood danger here.' },
  { id: 'quirinal', name: 'Quirinal', x: 63, y: 25, terrain: ['high', 'outer'], capacity: 3, baseHousing: 180, startingPopulation: 160, favored: ['workshop', 'defense'], neighbors: ['capitoline', 'forum'], specialty: 'Craft and fortified approaches support the northern road.', note: 'A northern height tied to neighboring communities and approaches.' },
]

export const DISTRICT_LINKS = [
  ['palatine', 'capitoline'], ['palatine', 'forum'], ['palatine', 'aventine'],
  ['capitoline', 'forum'], ['capitoline', 'quirinal'], ['forum', 'aventine'],
  ['forum', 'tiber'], ['forum', 'quirinal'], ['aventine', 'tiber'],
]

export const RELATIONSHIP_TYPES = {
  citizens: { label: 'Citizens', militaryContribution: 82, autonomy: 20, tradeAccess: 90, revoltRisk: 10 },
  partialCitizens: { label: 'Partial citizens', militaryContribution: 70, autonomy: 45, tradeAccess: 76, revoltRisk: 20 },
  latinAlly: { label: 'Latin ally', militaryContribution: 62, autonomy: 70, tradeAccess: 66, revoltRisk: 18 },
  treatyAlly: { label: 'Treaty ally', militaryContribution: 52, autonomy: 86, tradeAccess: 56, revoltRisk: 25 },
  hostile: { label: 'Hostile power', militaryContribution: 0, autonomy: 100, tradeAccess: 10, revoltRisk: 72 },
}

export const REGIONAL_COMMUNITIES = [
  { id: 'rome', name: 'Rome', x: 46, y: 48, defaultType: 'citizens', terrain: 'Tiber crossing', note: 'The city remains the administrative, population, and supply center.' },
  { id: 'veii', name: 'Veii', x: 36, y: 17, defaultType: 'citizens', terrain: 'Southern Etruria', note: 'Conquered territory with land, roads, and enduring local interests.' },
  { id: 'tibur', name: 'Tibur', x: 73, y: 38, defaultType: 'treatyAlly', terrain: 'Anio heights', note: 'A strong community controlling an eastern approach.' },
  { id: 'praeneste', name: 'Praeneste', x: 79, y: 55, defaultType: 'latinAlly', terrain: 'Mountain stronghold', note: 'A powerful Latin center whose autonomy and military value both matter.' },
  { id: 'tusculum', name: 'Tusculum', x: 61, y: 52, defaultType: 'partialCitizens', terrain: 'Alban hills', note: 'An early example of incorporation without simple municipal erasure.' },
  { id: 'ostia', name: 'Ostia', x: 17, y: 66, defaultType: 'citizens', terrain: 'Tiber mouth', note: 'The river outlet links salt, grain, shipping, and coastal warning.' },
  { id: 'antium', name: 'Antium', x: 49, y: 84, defaultType: 'partialCitizens', terrain: 'Coastal stronghold', note: 'Fleet access and coastal security make political status strategically consequential.' },
  { id: 'satricum', name: 'Satricum', x: 65, y: 75, defaultType: 'latinAlly', terrain: 'Pomptine route', note: 'A road and settlement hinge between Latium and the southern approaches.' },
  { id: 'capua', name: 'Capua', x: 56, y: 96, defaultType: 'treatyAlly', terrain: 'Campanian plain', note: 'A wealthy southern partner beyond the compact scale of Latium.' },
]

export const REGIONAL_ROUTES = [
  { id: 'via-ostiensis', name: 'Ostian Road', from: 'rome', to: 'ostia', requiredSeasons: 2, supply: 7, trade: 10, response: 5, hostileAccess: 4 },
  { id: 'via-veientana', name: 'Veientine Road', from: 'rome', to: 'veii', requiredSeasons: 2, supply: 6, trade: 6, response: 8, hostileAccess: 6 },
  { id: 'latin-road', name: 'Latin Road', from: 'rome', to: 'tusculum', requiredSeasons: 2, supply: 6, trade: 7, response: 7, hostileAccess: 5 },
  { id: 'praenestine-road', name: 'Praenestine Road', from: 'rome', to: 'praeneste', requiredSeasons: 3, supply: 8, trade: 7, response: 9, hostileAccess: 8 },
  { id: 'antium-road', name: 'Antium Road', from: 'rome', to: 'antium', requiredSeasons: 3, supply: 8, trade: 8, response: 9, hostileAccess: 8 },
  { id: 'appian-corridor', name: 'Appian Corridor', from: 'rome', to: 'capua', via: 'satricum', requiredSeasons: 3, supply: 12, trade: 12, response: 12, hostileAccess: 11 },
]

const tier = (id, name, era, cost, effects, extra = {}) => ({ id, name, era, cost, effects, actionCost: 1, ...extra })

export const BUILDING_FAMILIES = [
  {
    id: 'housing', name: 'Housing', icon: 'House', color: '#bd6f4c',
    tiers: [
      tier('round-huts', 'Palatine Huts', 0, { timber: 2 }, { shelter: 9, order: 1 }, { housingCapacity: 220, upkeep: { grain: 1 }, caption: 'Wattle, daub, timber posts, and straw-roofed households on the early hills.' }),
      tier('courtyard-housing', 'Courtyard Housing', 1, { timber: 2, stone: 2 }, { shelter: 14, sanitation: 2, order: 2 }, { housingCapacity: 420, requiresFamily: 'drainage', caption: 'Denser blocks require managed streets and runoff.' }),
      tier('street-courtyards', 'Ordered Street Courts', 2, { timber: 3, stone: 4, treasury: 2 }, { shelter: 18, sanitation: 5, order: 5 }, { housingCapacity: 560, requiresBuilding: 'cloaca-works', upkeep: { grain: 1, treasury: 1 }, caption: 'Courts aligned to managed streets support denser households but require durable public services.' }),
      tier('reconstructed-blocks', 'Reconstructed Street Blocks', 3, { timber: 4, stone: 5, treasury: 3 }, { shelter: 24, sanitation: 7, order: 6 }, { housingCapacity: 720, requiresBuilding: 'cloaca-works', requiresReconstruction: true, upkeep: { grain: 2, treasury: 1 }, caption: 'Rebuilt blocks preserve district households while wider access and masonry reduce recurring exposure.' }),
    ],
  },
  {
    id: 'shrine', name: 'Sacred precinct', icon: 'Landmark', color: '#d7c172',
    tiers: [
      tier('timber-shrine', 'Timber Shrine', 0, { timber: 2 }, { auspices: 10, order: 2 }, { caption: 'A marked place for vows, calendars, and communal rites.' }),
      tier('podium-temple', 'Temple of Jupiter', 1, { stone: 5, timber: 2, bronze: 2, treasury: 3 }, { auspices: 20, order: 6, readiness: 4 }, { unique: true, district: 'capitoline', requiresFamily: 'drainage', upkeep: { treasury: 1 }, projectTurns: 3, caption: 'A civic monument binding cult, kingship, and the city.' }),
    ],
  },
  {
    id: 'water', name: 'Water', icon: 'Droplets', color: '#5f91a5',
    tiers: [
      tier('shallow-well', 'Shallow Well', 0, { timber: 1 }, { water: 10, sanitation: 2 }, { forbiddenTerrain: ['wet', 'floodplain'], caption: 'Local supply, vulnerable to crowding and contamination.' }),
      tier('lined-cistern', 'Lined Cistern', 1, { stone: 3 }, { water: 17, sanitation: 5 }, { requiresFamily: 'drainage', caption: 'Stone lining stores cleaner water through dry seasons.' }),
      tier('public-cisterns', 'Public Cistern Network', 2, { stone: 5, treasury: 2 }, { water: 22, sanitation: 8, order: 2 }, { requiresBuilding: 'cloaca-works', projectTurns: 2, caption: 'Supervised cisterns turn local provision into a continuing civic obligation.' }),
    ],
  },
  {
    id: 'drainage', name: 'Drainage', icon: 'Waves', color: '#6f9b87',
    tiers: [
      tier('drainage-ditch', 'Drainage Ditch', 0, { timber: 1 }, { sanitation: 9, order: 1 }, { district: 'forum', floodShield: 5, caption: 'Open cuts begin to make the low valley usable.' }),
      tier('cloaca-works', 'Cloaca Works', 1, { stone: 5, timber: 1, treasury: 2 }, { sanitation: 20, order: 8, trade: 5 }, { district: 'forum', requiresBuilding: 'drainage-ditch', unique: true, floodShield: 22, projectTurns: 2, caption: 'A major drain turns divided ground into a civic center.' }),
    ],
  },
  {
    id: 'market', name: 'Exchange', icon: 'Scale', color: '#cf8b3e',
    tiers: [
      tier('cattle-market', 'Cattle Market', 0, { timber: 2 }, { trade: 10, food: 3, order: -2 }, { preferredTerrain: ['river', 'central'], production: { treasury: 2 }, caption: 'Livestock, salt, and exchange draw strangers together.' }),
      tier('forum-market', 'Forum Market', 1, { stone: 3, timber: 2, treasury: 2 }, { trade: 16, order: 4, food: 3 }, { district: 'forum', requiresFamily: 'drainage', production: { treasury: 4 }, caption: 'Measured stalls and public oversight stabilize exchange.' }),
      tier('reconstructed-forum', 'Reconstructed Forum Exchange', 3, { stone: 5, timber: 3, treasury: 4 }, { trade: 22, order: 7, food: 4 }, { district: 'forum', requiresBuilding: 'comitium', requiresReconstruction: true, production: { treasury: 6 }, upkeep: { treasury: 1 }, projectTurns: 2, caption: 'Restored accounts, routes, and supervised stalls reconnect damaged districts to regional exchange.' }),
    ],
  },
  {
    id: 'grain', name: 'Food storage', icon: 'Wheat', color: '#b89445',
    tiers: [
      tier('grain-pits', 'Grain Pits', 0, { timber: 1 }, { food: 11 }, { production: { grain: 3 }, caption: 'Distributed stores protect seed and winter supply.' }),
      tier('raised-granary', 'Raised Granary', 1, { timber: 3, stone: 2 }, { food: 18, order: 2 }, { production: { grain: 5 }, upkeep: { treasury: 1 }, caption: 'Raised floors and supervision reduce spoilage and theft.' }),
      tier('public-granary', 'Public Granary', 2, { timber: 3, stone: 4, treasury: 3 }, { food: 22, order: 5 }, { production: { grain: 7 }, upkeep: { treasury: 2 }, caption: 'Publicly supervised reserves support campaigns and debt relief, while making distribution a political question.' }),
    ],
  },
  {
    id: 'workshop', name: 'Craft', icon: 'Hammer', color: '#a75d3c',
    tiers: [
      tier('kiln-smithy', 'Kiln & Smithy', 0, { timber: 2 }, { readiness: 4, trade: 4, sanitation: -3 }, { forbiddenTerrain: ['central'], production: { bronze: 1, stone: 1 }, caption: 'Fire, pottery, and metalwork reward careful siting.' }),
      tier('workshop-quarter', 'Workshop Quarter', 1, { timber: 2, stone: 2, bronze: 1 }, { readiness: 8, trade: 10, sanitation: -4 }, { requiresFamily: 'water', production: { bronze: 2, stone: 2 }, upkeep: { grain: 1 }, caption: 'Concentrated craft expands output and fire danger.' }),
      tier('contracted-craft-yards', 'Contracted Craft Yards', 2, { timber: 3, stone: 3, bronze: 2, treasury: 2 }, { readiness: 12, trade: 14, sanitation: -4 }, { requiresBuilding: 'public-cisterns', production: { bronze: 3, stone: 3 }, upkeep: { grain: 1, treasury: 1 }, caption: 'Magistrates contract supervised production without turning every workshop into permanent state property.' }),
    ],
  },
  {
    id: 'defense', name: 'Defense', icon: 'Shield', color: '#817c6d',
    tiers: [
      tier('timber-palisade', 'Timber Palisade', 0, { timber: 4 }, { readiness: 12, order: 2 }, { preferredTerrain: ['outer', 'high'], upkeep: { timber: 1 }, caption: 'A visible boundary buys warning and confidence.' }),
      tier('stone-gate', 'Stone Gate', 1, { stone: 5, bronze: 1 }, { readiness: 18, order: 5, trade: 3 }, { preferredTerrain: ['outer'], requiresFamily: 'workshop', upkeep: { treasury: 1 }, projectTurns: 2, caption: 'Controlled approaches serve defense, tolls, and ceremony.' }),
      tier('circuit-fortification', 'Circuit Fortification', 2, { stone: 7, bronze: 2, treasury: 3 }, { readiness: 24, order: 7, trade: 4 }, { preferredTerrain: ['outer', 'high'], requiresBuilding: 'workshop-quarter', upkeep: { treasury: 2 }, projectTurns: 3, caption: 'A coordinated defensive circuit demands several seasons and sustained agreement over command and cost.' }),
      tier('reconstruction-wall', 'Reconstruction Stone Circuit', 3, { stone: 9, bronze: 2, treasury: 4 }, { readiness: 30, order: 8, trade: 4 }, { preferredTerrain: ['outer', 'high'], requiresBuilding: 'workshop-quarter', requiresReconstruction: true, upkeep: { treasury: 2 }, projectTurns: 3, caption: 'A post-crisis stone circuit joins district defenses into a durable civic obligation; its exact relation to the traditional Servian Wall remains disputed.' }),
    ],
  },
  {
    id: 'civic', name: 'Civic institutions', icon: 'Columns3', color: '#b58c52', unlockEra: 2,
    tiers: [
      tier('comitium', 'Comitium', 2, { stone: 4, timber: 2, treasury: 2 }, { order: 8, trade: 3 }, { unique: true, district: 'forum', requiresBuilding: 'cloaca-works', caption: 'A bounded meeting place makes public consent and proclamation part of government rather than court ceremony.' }),
      tier('reconstruction-records', 'Reconstruction Records Office', 3, { stone: 4, timber: 2, treasury: 4 }, { order: 11, trade: 5 }, { unique: true, district: 'forum', requiresBuilding: 'cloaca-works', requiresReconstruction: true, projectTurns: 2, caption: 'Restored rolls, claims, and public accounts make reconstruction answerable to institutions rather than memory alone.' }),
    ],
  },
  {
    id: 'treasury', name: 'Public treasury', icon: 'Landmark', color: '#c6a85a', unlockEra: 2,
    tiers: [
      tier('saturn-treasury', 'Temple of Saturn and Aerarium', 2, { stone: 6, bronze: 2, treasury: 4 }, { order: 6, trade: 7, auspices: 4 }, { unique: true, district: 'forum', requiresBuilding: 'comitium', requiresSenate: 45, production: { treasury: 4 }, upkeep: { treasury: 1 }, projectTurns: 2, caption: 'Tradition placed the treasury beneath Saturn; public reserves outlast a single annual magistrate.' }),
    ],
  },
]

export const COUNCILS = [
  {
    turn: 1, id: 'league-of-hills', title: 'A League of Hills', speaker: 'Council of household elders',
    prompt: 'The Palatine settlement cannot command every neighboring height. What form should common action take?',
    context: 'Archaeology shows several early communities; later Roman accounts compress their union into foundation stories.',
    options: [
      { id: 'oath', label: 'Bind the hills by reciprocal oath', detail: 'Share watch duty and pasture rights while each community keeps its rites.', impacts: { metrics: { order: 7, readiness: 3 }, factions: { allies: 8, clans: -2 } } },
      { id: 'palatine-rule', label: 'Assert Palatine primacy', detail: 'Concentrate command now and accept resentment from neighboring households.', impacts: { metrics: { order: 3, readiness: 8 }, factions: { clans: 7, allies: -10 } } },
      { id: 'festival', label: 'Begin with a common festival', detail: 'Use shared ritual to build confidence before asking for permanent obligations.', impacts: { metrics: { auspices: 8, order: 3 }, factions: { priests: 7, commons: 3 } } },
    ],
  },
  {
    turn: 3, id: 'tiber-crossing', title: 'The Tiber Crossing', speaker: 'Salt traders and river wardens',
    prompt: 'A ford enriches the hills but also brings toll disputes, strangers, and flood exposure.',
    context: 'Rome grew beside routes linking inland communities, the coast, and a practical river crossing.',
    options: [
      { id: 'open', label: 'Keep the crossing open under fixed weights', detail: 'Publish tolls and protect foreign traders.', impacts: { metrics: { trade: 9, order: 2 }, factions: { traders: 9, clans: -2 }, resources: { treasury: 2 } } },
      { id: 'clan-tolls', label: 'Grant toll rights to leading clans', detail: 'Gain immediate collection at the cost of fragmented authority.', impacts: { metrics: { trade: 4, order: -4 }, factions: { clans: 9, traders: -5 }, resources: { treasury: 3 } } },
      { id: 'guarded', label: 'Fortify the ford first', detail: 'Slow exchange while the levy secures the approach.', impacts: { metrics: { trade: -2, readiness: 9 }, factions: { levy: 8, traders: -5 }, resources: { timber: -1 } } },
    ],
  },
  {
    turn: 5, id: 'forum-labor', title: 'The Valley Must Drain', speaker: 'Royal works council',
    prompt: 'Water and refuse divide the hills. The valley can become common ground only through years of organized labor.',
    context: 'The chronology and builders of Rome\'s earliest drains remain debated; the transformation of the Forum valley is archaeologically visible.',
    options: [
      { id: 'rotation', label: 'Rotate labor obligations among the hills', detail: 'Slower work, but burdens remain legible and shared.', impacts: { metrics: { order: 7, sanitation: 5 }, factions: { commons: 5, clans: -3 }, flags: { drainageMandate: 'rotation' } } },
      { id: 'royal', label: 'Impose a concentrated royal levy', detail: 'Finish faster by testing the limits of central command.', impacts: { metrics: { sanitation: 9, order: -3 }, factions: { commons: -9, clans: 4 }, worksBonus: 1, flags: { drainageMandate: 'royal' } } },
      { id: 'contract', label: 'Pay craftsmen and captives', detail: 'Preserve household labor by spending scarce treasure.', impacts: { metrics: { sanitation: 7, trade: 3 }, factions: { traders: 5 }, resources: { treasury: -4 }, worksBonus: 1, flags: { drainageMandate: 'contract' } } },
    ],
  },
  {
    turn: 7, id: 'etruscan-methods', title: 'Foreign Methods, Roman Authority', speaker: 'Builders, priests, and clan heads',
    prompt: 'Specialists from Etruscan cities offer stonework, drainage knowledge, and ceremonial forms. Their skill may strengthen the city or its king.',
    context: 'Material culture shows strong exchange with Etruria. Ancient narratives place several kings of Etruscan origin at Rome.',
    options: [
      { id: 'adopt', label: 'Hire specialists and train Roman crews', detail: 'Import methods while spreading knowledge among local workshops.', impacts: { metrics: { sanitation: 6, trade: 5 }, factions: { traders: 6, clans: -3 }, resources: { stone: 3, treasury: -2 }, flags: { trainedMasons: true } } },
      { id: 'court', label: 'Keep specialists under royal patronage', detail: 'The court controls expertise and construction priorities.', impacts: { metrics: { order: 6, auspices: 4 }, factions: { clans: 4, commons: -4 }, resources: { stone: 2 }, flags: { royalWorks: true } } },
      { id: 'local', label: 'Rely on local household craft', detail: 'Protect independence but accept slower monumental work.', impacts: { metrics: { order: 2, trade: -2 }, factions: { clans: 5, allies: 4 }, resources: { timber: 2 } } },
    ],
  },
  {
    turn: 9, id: 'capitoline-vow', title: 'A Temple Above the City', speaker: 'College of priests',
    prompt: 'A great Capitoline temple could bind victory, kingship, and public cult. It could also consume resources needed below.',
    context: 'Roman tradition associated the Temple of Jupiter Optimus Maximus with the last kings and the opening of the Republic.',
    options: [
      { id: 'complete', label: 'Complete the temple with public accounts', detail: 'Make the monument civic property and disclose its burden.', impacts: { metrics: { auspices: 8, order: 6 }, factions: { priests: 6, commons: 2 }, flags: { templePolicy: 'civic' } } },
      { id: 'royal-glory', label: 'Dedicate it as a work of royal glory', detail: 'Magnify command while deepening fear of dynastic power.', impacts: { metrics: { auspices: 9, order: -4 }, factions: { clans: -7, priests: 7 }, flags: { templePolicy: 'royal' } } },
      { id: 'defer', label: 'Defer grandeur until granaries are secure', detail: 'Risk ritual disappointment to protect household reserves.', impacts: { metrics: { food: 7, auspices: -7 }, factions: { commons: 7, priests: -8 }, resources: { grain: 3 }, flags: { templePolicy: 'deferred' } } },
    ],
  },
  {
    turn: 11, id: 'expulsion-settlement', title: 'Command After the Kings', speaker: 'Senior households and the citizen levy',
    prompt: 'Royal command has ended, but war, finance, and judgment cannot wait. What should restrain the men who inherit the king\'s powers?',
    context: 'Roman tradition dated the expulsion of Tarquinius Superbus and the first consuls to 509 BC. The early chronology and exact development of the offices remain disputed.',
    options: [
      { id: 'paired-magistrates', label: 'Divide command between annual colleagues', detail: 'Mutual restraint limits personal rule, though divided authority slows large works.', impacts: { metrics: { order: 5, readiness: 2 }, factions: { clans: 3, levy: 3 }, republic: { magistrateAuthority: 4, senateStanding: 2, assemblyConsent: 4 }, flags: { magistrateMode: 'paired' } } },
      { id: 'senate-continuity', label: 'Let the Senate preserve finance and precedent', detail: 'Annual magistrates command, while experienced household heads coordinate credit, cult, and long policy.', impacts: { metrics: { order: 5, trade: 3 }, factions: { clans: 7, commons: -4 }, republic: { senateStanding: 10, assemblyConsent: -4 }, flags: { magistrateMode: 'senate' } } },
      { id: 'emergency-command', label: 'Retain a single emergency command', detail: 'Concentrated authority moves quickly against danger but carries royal habits into the Republic.', impacts: { metrics: { readiness: 9, order: -4 }, factions: { levy: 5, commons: -7, clans: 3 }, republic: { magistrateAuthority: 12, assemblyConsent: -10, levyBurden: 5 }, worksBonus: 1, flags: { magistrateMode: 'emergency' } } },
    ],
  },
  {
    turn: 12, id: 'debt-and-levy', title: 'Debt Follows the Levy Home', speaker: 'Debtors, creditors, and returning soldiers',
    prompt: 'Campaign service has kept households from their fields while obligations continue to accrue. Which burden should the new Republic recognize first?',
    context: 'Livy tied debt conflict to military service and later social struggle. The individual speeches are literary constructions, but the linked pressures of debt and levy duty are credible.',
    options: [
      { id: 'temporary-stay', label: 'Stay collections until the levy returns', detail: 'Protect serving households without cancelling every obligation.', impacts: { metrics: { food: 4, order: 4 }, resources: { treasury: -2 }, factions: { commons: 8, clans: -5, levy: 4 }, republic: { debtStrain: -12, assemblyConsent: 6, senateStanding: -3 } } },
      { id: 'declared-season', label: 'Limit service to a declared campaign season', detail: 'Keep the levy credible by making its duration legible to households and creditors.', impacts: { metrics: { readiness: 5, order: 3 }, factions: { levy: 7, commons: 3 }, republic: { levyBurden: -7, debtStrain: -5, assemblyConsent: 4 } } },
      { id: 'enforce-contracts', label: 'Enforce contracts and replenish public credit', detail: 'Defend creditor confidence and military finance while accepting sharper household resistance.', impacts: { metrics: { trade: 6, order: -6 }, resources: { treasury: 3 }, factions: { clans: 8, traders: 5, commons: -10 }, republic: { senateStanding: 7, debtStrain: 10, assemblyConsent: -8 } } },
    ],
  },
  {
    turn: 13, id: 'first-secession', title: 'The Plebeian Withdrawal', speaker: 'Citizen households outside the civic boundary',
    prompt: 'Men who answer the levy refuse ordinary civic obligations until debt and protection from magistrates are settled. What institution can restore consent?',
    context: 'Roman tradition placed the first secession and creation of plebeian tribunes in 494 BC. Later accounts preserve institutional memory but cannot establish every detail of the confrontation.',
    options: [
      { id: 'recognize-tribunes', label: 'Recognize protected tribunes after the withdrawal', detail: 'Create officers able to defend plebeian households against magistrates and make renewed service conditional on protection.', impacts: { metrics: { order: 7, readiness: 2 }, factions: { commons: 10, levy: 5, clans: -7 }, republic: { assemblyConsent: 12, debtStrain: -8, levyBurden: -5 }, flags: { tribunesEstablished: true } } },
      { id: 'negotiated-board', label: 'Create a temporary debt commission', detail: 'Settle claims case by case without establishing a permanent counter-office.', impacts: { metrics: { order: 5, trade: 2 }, resources: { treasury: -3 }, factions: { commons: 5, clans: 2 }, republic: { debtStrain: -12, senateStanding: 5, assemblyConsent: 4 } } },
      { id: 'compel-return', label: 'Compel a return under emergency command', detail: 'Restore immediate military obedience while making coercion part of the Republic\'s constitutional inheritance.', impacts: { metrics: { readiness: 10, order: -10 }, factions: { levy: 2, commons: -12, clans: 6 }, republic: { magistrateAuthority: 10, levyBurden: 10, assemblyConsent: -14, debtStrain: 6 }, flags: { coerciveSettlement: true } } },
    ],
  },
  {
    turn: 14, id: 'kings-works-veii', title: 'The King\'s Works and the Long War', speaker: 'Magistrates, paymasters, and wardens of public works',
    prompt: 'Veii cannot be contained by a brief summer levy. Who should control the old royal works, and how will citizen soldiers remain in the field?',
    context: 'Livy placed regular soldier pay near the opening of the long war with Veii. The chronology is traditional and compressed here; the fiscal and household problem is the firmer historical structure.',
    options: [
      { id: 'public-pay', label: 'Claim the works for public accounts and pay the levy', detail: 'Place inherited monuments and drains under republican accounts, then use the treasury to sustain men beyond the ordinary season.', impacts: { resources: { treasury: -4 }, metrics: { order: 4, readiness: 5 }, factions: { levy: 8, commons: 5, clans: -3 }, republic: { senateStanding: 4, assemblyConsent: 4, debtStrain: -5, levyBurden: -7 }, war: { soldierPay: 35, siegePersistence: 18, veteranCohesion: 7, veiiPressure: 8 }, flags: { royalWorksPolicy: 'public-accounts', soldierPayEstablished: true } } },
      { id: 'seasonal-rotation', label: 'Leave the works with their colleges and rotate the levy', detail: 'Preserve household seasons and distributed stewardship, accepting a slower and less continuous siege.', impacts: { metrics: { food: 5, auspices: 3, readiness: -2 }, factions: { priests: 6, commons: 6, levy: 3 }, republic: { debtStrain: -7, levyBurden: -8, assemblyConsent: 4 }, war: { siegePersistence: 5, veteranCohesion: 3, veiiPressure: -4 }, flags: { royalWorksPolicy: 'collegial', levyRotation: true } } },
      { id: 'emergency-command-veii', label: 'Put works and war under emergency command', detail: 'Concentrate crews, stores, and command for a decisive effort while annual restraints and assembly consent recede.', impacts: { metrics: { readiness: 10, order: -5 }, factions: { levy: 5, clans: 5, commons: -8 }, republic: { magistrateAuthority: 10, assemblyConsent: -10, levyBurden: 8 }, war: { siegePersistence: 24, veteranCohesion: 4, veiiPressure: 12 }, flags: { royalWorksPolicy: 'command', veiiEmergencyCommand: true } } },
    ],
  },
  {
    turn: 15, id: 'veii-settlement', title: 'Veii Falls: What Follows?', speaker: 'Victorious commanders, creditors, allies, and land-seeking citizens',
    prompt: 'The rival city has fallen after years of pressure. Its land, people, cults, and spoils can settle old burdens or create new claims.',
    context: 'Roman tradition dated the fall of Veii to 396 BC and credited Camillus with its capture. The ten-year siege and dramatic details are literary; Rome\'s expansion into Veientine territory is not in doubt.',
    options: [
      { id: 'distribute-land', label: 'Annex the territory and distribute allotments', detail: 'Reward serving households with land and reduce immediate debt, while turning future soldiers into claimants on conquest.', impacts: { resources: { grain: 5, treasury: 2 }, metrics: { food: 6, order: 3 }, factions: { commons: 9, levy: 8, clans: -6, allies: -3 }, republic: { debtStrain: -10, levyBurden: -4, assemblyConsent: 7 }, war: { landExpectations: 24, veteranCohesion: 10, veiiPressure: 28 }, flags: { veiiResolution: 'land-distribution' } } },
      { id: 'tribute-settlement', label: 'Incorporate communities under tribute and obligation', detail: 'Preserve production and extract regular support, gaining revenue while leaving land rewards and local loyalty unsettled.', impacts: { resources: { treasury: 7, grain: 2 }, metrics: { trade: 7, order: 1 }, factions: { traders: 7, allies: 4, levy: -4 }, republic: { senateStanding: 6, debtStrain: -4 }, war: { landExpectations: 9, veteranCohesion: -3, veiiPressure: 24 }, flags: { veiiResolution: 'tribute-incorporation' } } },
      { id: 'dedicate-and-break', label: 'Dedicate the spoils and break Veii as a rival', detail: 'Remove the immediate strategic center and fulfill public vows, but spend the victory on cult and security rather than household settlement.', impacts: { resources: { treasury: 3, bronze: 2 }, metrics: { auspices: 8, readiness: 8, trade: -3 }, factions: { priests: 8, levy: 3, commons: -5 }, republic: { magistrateAuthority: 6, assemblyConsent: -5 }, war: { landExpectations: 15, veteranCohesion: 5, veiiPressure: 32 }, flags: { veiiResolution: 'ritual-destruction' } } },
    ],
  },
  {
    turn: 16, id: 'gallic-approach', title: 'The Gallic Approach', speaker: 'Levy officers, city wardens, and envoys from the northern road',
    prompt: 'A northern host is moving through Etruria. Rome must decide whether to seek a field decision, guard the approaches, or buy time for a fuller muster.',
    context: 'Livy and Polybius preserve different emphases for the Gallic advance and the defeat at the Allia. The date, scale, and sack remain debated; the strategic warning is modeled without predetermining Act IV.',
    options: [
      { id: 'allia-concentration', label: 'Concentrate the field army at the Allia', detail: 'Trust veteran cohesion and a rapid levy to stop the advance away from the city. Strong preparation can work; weak preparation exposes everything at once.', impacts: { metrics: { readiness: 7 }, factions: { levy: 6, clans: 3 }, republic: { magistrateAuthority: 4, levyBurden: 5 }, war: { veteranCohesion: 7, gallicThreat: -4 }, flags: { gallicPlan: 'field-battle' } } },
      { id: 'screen-and-fortify', label: 'Screen the roads and secure city reserves', detail: 'Trade immediate initiative for guarded approaches, stored grain, and a force that can survive a reverse.', impacts: { resources: { grain: -2, timber: -2 }, metrics: { readiness: 5, order: 4 }, factions: { commons: 4, levy: 3 }, republic: { assemblyConsent: 3 }, war: { veteranCohesion: 4, gallicThreat: -8 }, flags: { gallicPlan: 'defense-in-depth' } } },
      { id: 'delay-and-muster', label: 'Spend treasure to delay and complete the muster', detail: 'Use envoys, gifts, and allied calls to gain time, preserving options at the cost of money and standing.', impacts: { resources: { treasury: -6 }, metrics: { trade: -2, readiness: 4 }, factions: { allies: 5, clans: -3 }, republic: { senateStanding: -3, assemblyConsent: 2 }, war: { veteranCohesion: 5, gallicThreat: -6 }, flags: { gallicPlan: 'delay' } } },
    ],
  },
  {
    turn: 17, id: 'after-the-sack', title: 'The City After the Sack', speaker: 'Surviving magistrates, household heads, and wardens',
    prompt: 'Families are displaced, stores are scattered, and damaged quarters still burn. Which need receives the first organized crews?',
    context: 'Roman tradition emphasized flight, ransom, the Capitoline defense, and immediate resolve. Archaeology does not support a simple citywide destruction layer, so damage in the game follows prior preparation and district exposure.',
    options: [
      { id: 'shelter-and-grain', label: 'Open stores and raise emergency shelter', detail: 'Stabilize displaced households first, spending reserves before ambitious reconstruction begins.', impacts: { resources: { grain: -5, treasury: -3 }, metrics: { food: 8, shelter: 9, order: 4 }, factions: { commons: 10, clans: -3 }, republic: { debtStrain: -5, assemblyConsent: 6 }, reconstruction: { devastation: -7, displaced: -22, fireExposure: 4 } } },
      { id: 'clear-and-salvage', label: 'Clear fire lanes and organize salvage', detail: 'Recover stone and timber while containing fire, though many households remain in temporary quarters.', impacts: { resources: { timber: 3, stone: 2 }, metrics: { sanitation: 9, order: 3 }, factions: { traders: 4, commons: 3 }, reconstruction: { devastation: -13, displaced: -8, fireExposure: -15, recordsIntegrity: -3 } } },
      { id: 'citadel-and-walls', label: 'Secure the citadel and broken approaches', detail: 'Restore command and warning first, accepting continued displacement and a heavier levy burden.', impacts: { resources: { stone: -3, bronze: -1 }, metrics: { readiness: 10, order: 2, food: -3 }, factions: { levy: 8, commons: -5 }, republic: { magistrateAuthority: 5, levyBurden: 6 }, reconstruction: { devastation: -6, displaced: -4, wallUrgency: -20, fireExposure: -4 } } },
    ],
  },
  {
    turn: 18, id: 'reconstruction-doctrine', title: 'How Rome Rebuilds', speaker: 'Surveyors, creditors, veterans, and district households',
    prompt: 'Speed will return roofs and rents; survey will improve streets and drains; fortification will place security before density. Which doctrine governs the work?',
    context: 'Livy contrasted hurried rebuilding with later disorderly streets. That explanation is literary and schematic, but rebuilding speed, property claims, circulation, and defense are genuine competing pressures.',
    options: [
      { id: 'rapid-rebuilding', label: 'Restore old plots as rapidly as claims allow', detail: 'Return households and exchange quickly with cheaper timber work, preserving district claims but carrying fire and access weaknesses forward.', impacts: { resources: { timber: 3, treasury: -2 }, metrics: { shelter: 11, trade: 5, sanitation: -4 }, factions: { commons: 7, traders: 5 }, reconstruction: { devastation: -20, displaced: -18, fireExposure: 18, recordsIntegrity: -5 }, flags: { reconstructionPolicy: 'rapid' } } },
      { id: 'planned-rebuilding', label: 'Survey streets, drains, and claims before rebuilding', detail: 'Spend more now and return households more slowly in exchange for lower recurring exposure and clearer public records.', impacts: { resources: { stone: -4, treasury: -5 }, metrics: { sanitation: 10, order: 7, shelter: 3 }, factions: { commons: 3, traders: -2, clans: -3 }, republic: { senateStanding: 3, assemblyConsent: 3 }, reconstruction: { devastation: -12, displaced: -10, fireExposure: -20, recordsIntegrity: 12 }, flags: { reconstructionPolicy: 'planned' } } },
      { id: 'militarized-rebuilding', label: 'Rebuild around walls, gates, and mustering roads', detail: 'Create strategic depth and protected approaches while housing and debt relief wait behind military works.', impacts: { resources: { stone: -5, bronze: -2, treasury: -3 }, metrics: { readiness: 12, order: 4, shelter: -2 }, factions: { levy: 8, commons: -6 }, republic: { magistrateAuthority: 5, levyBurden: 6 }, reconstruction: { devastation: -10, displaced: -6, fireExposure: -8, wallUrgency: -28 }, flags: { reconstructionPolicy: 'militarized' } } },
    ],
  },
  {
    turn: 19, id: 'reconstruction-burdens', title: 'Debt, Land, and the Returning Household', speaker: 'Creditors, veterans, labor crews, and displaced claimants',
    prompt: 'Reconstruction has restored value unevenly. Debt, public labor, veteran claims, and disputed plots now threaten the settlement.',
    context: 'Later Roman narratives repeatedly connect military service, debt, land, and political conflict. Exact measures after the Gallic crisis are uncertain; the council models the durable interests rather than a claimed statute.',
    options: [
      { id: 'debt-remission', label: 'Remit crisis arrears from public funds', detail: 'Protect returning households and disputed plots, reducing public reserves and creditor confidence.', impacts: { resources: { treasury: -6 }, metrics: { order: 7, trade: -3 }, factions: { commons: 9, clans: -7 }, republic: { debtStrain: -18, assemblyConsent: 7, senateStanding: -4 }, reconstruction: { displaced: -10, latinTrust: 2 } } },
      { id: 'labor-credits', label: 'Credit public labor toward land and obligations', detail: 'Tie rebuilding crews to recognized claims, sharing cost between treasury and household service.', impacts: { resources: { treasury: -3 }, metrics: { order: 5, readiness: 3 }, factions: { commons: 6, levy: 6, clans: -3 }, republic: { debtStrain: -10, levyBurden: -5, assemblyConsent: 4 }, reconstruction: { devastation: -8, displaced: -8, alliedObligations: 4 } } },
      { id: 'enforce-and-contract', label: 'Enforce claims and contract the remaining work', detail: 'Restore credit and finish works quickly while leaving indebted households and veterans with fewer concessions.', impacts: { resources: { treasury: 5, stone: 2 }, metrics: { trade: 8, order: -4 }, factions: { clans: 8, traders: 6, commons: -9 }, republic: { senateStanding: 7, debtStrain: 10, assemblyConsent: -7 }, reconstruction: { devastation: -12, displaced: -3, latinTrust: -3 } } },
    ],
  },
  {
    turn: 20, id: 'latin-settlement', title: 'Rome and the Latin Communities', speaker: 'Roman magistrates and envoys from the Latin towns',
    prompt: 'Recovery has restored Roman weight, but neighboring communities supplied refuge, trade, men, or resistance. What arrangement will carry the region beyond crisis?',
    context: 'The settlement of 338 BC ended the Latin War through varied bilateral arrangements rather than one uniform treaty. This council compresses the road from recovery to that institutional turning point.',
    options: [
      { id: 'reciprocal-league', label: 'Renew a reciprocal Latin compact', detail: 'Trade some Roman freedom of command for trust, shared defense, and legible mutual obligations.', impacts: { metrics: { trade: 5, readiness: 4, order: 3 }, factions: { allies: 10, clans: -3 }, republic: { assemblyConsent: 4 }, reconstruction: { latinTrust: 20, alliedObligations: 12 }, flags: { latinSettlement: 'reciprocal-league' } } },
      { id: 'roman-command', label: 'Impose Roman command and military quotas', detail: 'Gain direct forces and strategic control while making recovery among the Latin towns more brittle.', impacts: { metrics: { readiness: 12, trade: -2 }, factions: { levy: 6, allies: -10, clans: 4 }, republic: { magistrateAuthority: 6, assemblyConsent: -4 }, reconstruction: { latinTrust: -15, alliedObligations: 24 }, flags: { latinSettlement: 'roman-command' } } },
      { id: 'differentiated-compacts', label: 'Negotiate different compacts town by town', detail: 'Match rights and obligations to each community, gaining flexibility at the cost of administrative complexity.', impacts: { resources: { treasury: -3 }, metrics: { trade: 8, order: 4 }, factions: { traders: 6, allies: 5 }, republic: { senateStanding: 6 }, reconstruction: { latinTrust: 10, alliedObligations: 17, recordsIntegrity: 5 }, flags: { latinSettlement: 'differentiated-compacts' } } },
    ],
  },
  {
    turn: 21, id: 'regional-doctrine', title: 'What Holds the Region Together?', speaker: 'Magistrates, allied envoys, merchants, and levy officers',
    prompt: 'The Latin settlement created different obligations. Which principle should guide Rome\'s first regional commitments?',
    context: 'Roman expansion relied on varied statuses, roads, colonies, bilateral obligations, and local institutions. It was not a uniform annexation system.',
    options: [
      { id: 'security-depth', label: 'Build strategic depth and rapid response', detail: 'Prioritize defended routes, military contributions, and garrison points, accepting higher upkeep and allied suspicion.', impacts: { metrics: { readiness: 7, trade: -2 }, resources: { treasury: -2 }, factions: { levy: 6, allies: -4 }, regional: { securityDoctrine: 12, allianceDoctrine: -4 }, flags: { regionalDoctrine: 'security' } } },
      { id: 'commercial-corridors', label: 'Open commercial and supply corridors', detail: 'Prioritize ports, markets, and predictable passage, accepting that roads also accelerate hostile movement.', impacts: { metrics: { trade: 8, readiness: -2 }, resources: { treasury: 2 }, factions: { traders: 7, levy: -2 }, regional: { commerceDoctrine: 12, hostileAccess: 4 }, flags: { regionalDoctrine: 'commerce' } } },
      { id: 'alliance-depth', label: 'Invest in reciprocal allied depth', detail: 'Preserve local command and bargain for dependable contingents, paying in autonomy and negotiation time.', impacts: { metrics: { order: 4, readiness: 3 }, resources: { treasury: -3 }, factions: { allies: 8, clans: -3 }, regional: { allianceDoctrine: 12, securityDoctrine: -2 }, flags: { regionalDoctrine: 'alliance' } } },
    ],
  },
  {
    turn: 22, id: 'roads-and-colonies', title: 'The Samnite War Opens', speaker: 'Commanders, colonial delegates, Campanian envoys, and household assessors',
    prompt: 'War in the central Apennines cannot be carried by one field decision. Which burden should prepare Rome for difficult roads, fortified communities, and repeated levies?',
    context: 'The Second Samnite War began in 326 BC. Livy supplies a continuous narrative, but its speeches and exact operations are literary constructions; terrain, allied obligations, and sustained campaigning are the durable strategic facts.',
    options: [
      { id: 'public-road-crews', label: 'Survey military roads and supply depots', detail: 'Spend public accounts on reliable movement and stores before seeking a decisive battle.', impacts: { resources: { stone: 2, treasury: -4 }, republic: { senateStanding: 3, debtStrain: 2 }, regional: { roadCrewBonus: 1 }, flags: { regionalCharter: 'public-roads', samniteOpening: 'logistics' } } },
      { id: 'veteran-colonial-draft', label: 'Anchor exposed ground with veteran settlements', detail: 'Offer allotments and garrison duties, creating depth while increasing expectations for land and relief.', impacts: { resources: { grain: -3 }, factions: { levy: 7, commons: -2 }, regional: { colonySettlerRelief: 18, garrisonDemand: 5 }, flags: { regionalCharter: 'veteran-colonies', samniteOpening: 'colonies' } } },
      { id: 'allied-road-bargain', label: 'Bargain for allied contingents and local guides', detail: 'Preserve local knowledge and reduce Roman cost in exchange for autonomy and negotiated command.', impacts: { resources: { treasury: -2 }, factions: { allies: 6, traders: 3 }, regional: { allianceDoctrine: 6, roadCostRelief: 1 }, flags: { regionalCharter: 'allied-roads', samniteOpening: 'allies' } } },
    ],
  },
  {
    turn: 23, id: 'regional-obligations', title: 'The Caudine Forks', speaker: 'Consuls, surviving officers, senators, and allied delegates',
    prompt: 'A Roman army is trapped in the mountain passes. Pride, lives, allied confidence, and the terms of peace now pull in different directions. How should Rome recover?',
    context: 'Livy places the disaster in 321 BC and dramatizes the yoke and the later rejection of the consuls\' agreement. The precise treaty sequence is disputed. The game treats encirclement and political shock as credible while leaving the response open.',
    options: [
      { id: 'fixed-quotas', label: 'Accept terms, save the army, and rebuild command', detail: 'Bear immediate humiliation to preserve trained citizens and allied contingents for a longer war.', impacts: { metrics: { readiness: 9, order: -2 }, factions: { levy: 5, allies: -5 }, regional: { militaryCoordination: 14, revoltPressure: 7 }, flags: { regionalSettlement: 'fixed-quotas', caudineResponse: 'preserve-army' } } },
      { id: 'autonomy-compacts', label: 'Let allied councils witness and ratify the settlement', detail: 'Share responsibility for peace and recovery, preserving trust while slowing Roman freedom of action.', impacts: { metrics: { order: 6, readiness: 2 }, factions: { allies: 8 }, regional: { allianceDoctrine: 8, revoltPressure: -10, militaryCoordination: -3 }, flags: { regionalSettlement: 'autonomy-compacts', caudineResponse: 'allied-ratification' } } },
      { id: 'access-for-service', label: 'Ransom the force and finance a new logistical system', detail: 'Use treasure and commercial obligations to save the army, then answer the defeat with roads, depots, and renewed levies.', impacts: { metrics: { trade: 8, readiness: 4 }, resources: { treasury: 3 }, factions: { traders: 6 }, regional: { commerceDoctrine: 8, militaryCoordination: 5, administrationBurden: 6 }, flags: { regionalSettlement: 'access-for-service', caudineResponse: 'ransom-and-rebuild' } } },
    ],
  },
  {
    turn: 24, id: 'appian-censorship', title: 'The Appian Censorship', speaker: 'Censors, treasury officers, contractors, and household delegates',
    prompt: 'Rome can begin a durable road toward Capua, a new water work for the growing city, or phase both. Crews, stone, and accounts cannot finish both at once.',
    context: 'Ancient tradition assigns the Via Appia and Aqua Appia to the censorship of Appius Claudius Caecus in 312 BC. Frontinus says the aqueduct ran mostly underground; later monumental aqueducts should not be projected backward onto it.',
    options: [
      { id: 'road-first', label: 'Give first crews to the Via Appia', detail: 'Prioritize military response and southern supply, accepting that the same corridor can speed hostile movement.', impacts: { resources: { treasury: -2, stone: -1 }, metrics: { readiness: 4, trade: 2 }, italian: { campaignPersistence: 5, coalitionRisk: 2 }, flags: { appianPriority: 'road' } } },
      { id: 'water-first', label: 'Give first crews to the Aqua Appia', detail: 'Strengthen urban water and density before the road is complete, accepting long maintenance claims.', impacts: { resources: { treasury: -3, stone: -1 }, metrics: { water: 5, sanitation: 2 }, italian: { waterCapacity: 6, maintenanceDebt: 2 }, flags: { appianPriority: 'water' } } },
      { id: 'phased-program', label: 'Authorize a phased road-and-water program', detail: 'Keep both designs alive with slower progress and clearer annual accounting.', impacts: { resources: { treasury: -4 }, metrics: { order: 3 }, italian: { allianceDepth: 2, maintenanceDebt: 1 }, flags: { appianPriority: 'phased' } } },
    ],
  },
  {
    turn: 25, id: 'samnite-settlement', title: 'The Samnite Settlement', speaker: 'Consuls, senators, allied envoys, and veteran representatives',
    prompt: 'After years of reverses and recovery, Rome can seek a bounded peace, press obligations harder, or use settlement to restore reserves.',
    context: 'The Second Samnite War ended in 304 BC. Livy preserves the main Roman narrative; exact treaty clauses are less secure than the fact that Rome endured repeated campaigns and emerged with a stronger network of obligations.',
    options: [
      { id: 'bounded-peace', label: 'Take a bounded peace and restore the levy', detail: 'Lower immediate pressure and let households rebuild reserves without claiming an impossible final settlement.', impacts: { metrics: { order: 5, readiness: -2 }, factions: { levy: 7, allies: 4 }, italian: { samnitePressure: -18, reserveDepth: 10, campaignPersistence: 3 }, flags: { samniteSettlement: 'bounded-peace' } } },
      { id: 'hard-terms', label: 'Demand stronger military guarantees', detail: 'Increase deterrence and coordination while leaving more reason for another coalition to form.', impacts: { metrics: { readiness: 7, order: -2 }, factions: { clans: 5, allies: -5 }, italian: { samnitePressure: -10, coalitionRisk: 12, campaignPersistence: 6 }, flags: { samniteSettlement: 'hard-terms' } } },
      { id: 'allied-renewal', label: 'Renew allied compacts before disbanding armies', detail: 'Trade speed and Roman freedom of command for deeper contingents in the next emergency.', impacts: { resources: { treasury: -3 }, factions: { allies: 8 }, italian: { samnitePressure: -14, allianceDepth: 12, reserveDepth: 4 }, flags: { samniteSettlement: 'allied-renewal' } } },
    ],
  },
  {
    turn: 26, id: 'sentinum-coalition', title: 'The Coalition at Sentinum', speaker: 'Consuls, allied commanders, reserve officers, and road wardens',
    prompt: 'Samnites, Gauls, Etruscans, and Umbrians threaten to combine. Rome must decide whether to concentrate, divide the coalition, or defend the roads and reserves.',
    context: 'Livy presents Sentinum in 295 BC as a great coalition battle and attaches the devotio of Decius Mus to it. The scale and narrative details are shaped, but the strategic problem of preventing several enemies from combining is sound.',
    options: [
      { id: 'concentrate', label: 'Concentrate for a decisive field battle', detail: 'Use roads and reserves to mass quickly, risking severe losses if alliance depth is weak.', impacts: { metrics: { readiness: 8 }, italian: { coalitionRisk: -12, reserveDepth: -8, campaignPersistence: 8 }, flags: { sentinumPlan: 'concentrate' } } },
      { id: 'divide-coalition', label: 'Detach forces and divide the coalition', detail: 'Rely on allied commands and maneuver to keep enemy armies from joining.', impacts: { resources: { treasury: -3 }, factions: { allies: 5 }, italian: { coalitionRisk: -16, allianceDepth: 6, campaignPersistence: 4 }, flags: { sentinumPlan: 'divide' } } },
      { id: 'defend-network', label: 'Hold roads, colonies, and reserve depots', detail: 'Refuse the most dramatic decision and make the coalition spend time against a defended system.', impacts: { metrics: { order: 3, readiness: 3 }, italian: { coalitionRisk: -8, reserveDepth: 5, campaignPersistence: 7 }, flags: { sentinumPlan: 'network' } } },
    ],
  },
  {
    turn: 27, id: 'pyrrhus-arrives', title: 'Pyrrhus Comes to Italy', speaker: 'Senators, allied envoys, quartermasters, and commanders returned from the south',
    prompt: 'A Hellenistic king has crossed with a professional army and elephants. Rome must learn without allowing one defeat to dissolve the Italian compact.',
    context: 'Pyrrhus entered Italy in 280 BC at Tarentum\'s invitation. Plutarch and Dionysius preserve vivid later narratives; the game emphasizes the contrast between battlefield skill and Rome\'s capacity to raise replacement armies.',
    options: [
      { id: 'learn-and-reform', label: 'Study the new army and rotate fresh legions', detail: 'Accept tactical reverses while preserving the system that can replace losses.', impacts: { resources: { bronze: -2, treasury: -2 }, metrics: { readiness: 3 }, italian: { pyrrhicPressure: -8, reserveDepth: -5, campaignPersistence: 12 }, flags: { pyrrhicPosture: 'adapt' } } },
      { id: 'seek-decision', label: 'Seek an immediate decisive battle', detail: 'Risk reserves for a chance to break the expedition before it gains more allies.', impacts: { metrics: { readiness: 7, order: -3 }, italian: { pyrrhicPressure: -4, reserveDepth: -12, coalitionRisk: 5 }, flags: { pyrrhicPosture: 'decision' } } },
      { id: 'bind-allies', label: 'Reaffirm allied obligations and deny recruits', detail: 'Use compacts and local defense to isolate the king even if the field campaign lasts longer.', impacts: { resources: { treasury: -4 }, factions: { allies: 8 }, italian: { pyrrhicPressure: -6, allianceDepth: 10, campaignPersistence: 6 }, flags: { pyrrhicPosture: 'isolate' } } },
    ],
  },
  {
    turn: 28, id: 'pyrrhic-endurance', title: 'A War of Replacements', speaker: 'Censors, levy officers, allied delegates, and envoys from the Greek cities',
    prompt: 'The invading king still wins costly actions, but every replacement is harder for him to obtain. How should Rome force the war toward exhaustion?',
    context: 'Plutarch gives the famous judgment that another such victory would ruin Pyrrhus. The phrase is literary, but the underlying asymmetry in replacement capacity and allied depth explains why tactical success did not secure his strategic aim.',
    options: [
      { id: 'refuse-terms', label: 'Refuse terms while reserves remain', detail: 'Make persistence itself the argument, provided households and allies can still carry it.', impacts: { metrics: { order: -2, readiness: 5 }, italian: { pyrrhicPressure: -14, campaignPersistence: 10, reserveDepth: -7 }, flags: { pyrrhicEndgame: 'endure' } } },
      { id: 'limited-terms', label: 'Offer limited terms without surrendering the compact', detail: 'Test whether the expedition will leave while preserving the network that sustained the war.', impacts: { resources: { treasury: -3 }, metrics: { order: 4 }, italian: { pyrrhicPressure: -10, coalitionRisk: -3, campaignPersistence: 3 }, flags: { pyrrhicEndgame: 'limited-terms' } } },
      { id: 'southern-pressure', label: 'Press roads, ports, and allied strongpoints', detail: 'Turn logistical superiority into a campaign against the expedition\'s bases rather than its prestige.', impacts: { metrics: { trade: 3, readiness: 4 }, italian: { pyrrhicPressure: -12, reserveDepth: -4, allianceDepth: 4 }, flags: { pyrrhicEndgame: 'southern-pressure' } } },
    ],
  },
  {
    turn: 29, id: 'mediterranean-threshold', title: 'The Mediterranean Threshold', speaker: 'Senators, censors, allied envoys, merchants, and veteran households',
    prompt: 'By 264 BC Rome commands extraordinary depth in Italy. Which principle should govern the system before commitments cross the sea?',
    context: 'The traditional opening of the First Punic War in 264 BC marks a useful endpoint. Rome had become the leading Italian power, but command in Italy did not automatically supply a settled policy for fleets, overseas war, or provincial rule.',
    options: [
      { id: 'italian-consolidation', label: 'Consolidate roads, water, reserves, and compacts', detail: 'Judge strength by whether obligations can be maintained before adding new theaters.', impacts: { metrics: { order: 6, trade: 4 }, italian: { reserveDepth: 8, allianceDepth: 5, maintenanceDebt: -5 }, flags: { mediterraneanDoctrine: 'consolidate' } } },
      { id: 'maritime-readiness', label: 'Prepare accounts and allies for maritime commitments', detail: 'Begin the institutional preparation for a different scale of war without pretending the fleet already exists.', impacts: { resources: { treasury: -5, timber: -3 }, metrics: { trade: 6, readiness: 4 }, italian: { reserveDepth: -4, campaignPersistence: 5 }, flags: { mediterraneanDoctrine: 'prepare' } } },
      { id: 'limited-hegemony', label: 'Keep obligations bounded to the Italian compact', detail: 'Preserve autonomy and reserves, accepting that events beyond the straits may escape Roman direction.', impacts: { metrics: { order: 4 }, factions: { allies: 6, traders: -3 }, italian: { allianceDepth: 7, coalitionRisk: -5 }, flags: { mediterraneanDoctrine: 'bounded' } } },
    ],
  },
]

COUNCILS.push(
  {
    turn: 30, id: 'fleet-acquisition', title: 'A Fleet Without a Naval State', speaker: 'Senators, shipwrights, allied captains, and treasury officers',
    prompt: 'Rome has Italian depth but no settled naval institution. How should a republic acquire maritime capacity?',
    context: 'The opening of the First Punic War required improvisation, allied expertise, and public finance rather than a long-established Roman navy.',
    options: [
      { id: 'allied-hulls', label: 'Contract allied hulls and crews', detail: 'Gain capacity quickly through communities with maritime experience, while exposing Rome to contractor dependence.', impacts: { mediterranean: { fleetCapacity: 24, maritimeLosses: 2, contractorExposure: 12, alliedExhaustion: 6, overseasCommandDuration: 1 }, resources: { treasury: -4, timber: -2 }, flags: { fleetDoctrine: 'allied-hulls' } } },
      { id: 'roman-keels', label: 'Build a Roman squadron in Italian yards', detail: 'Create a more legible public asset, accepting slower readiness and heavy first costs.', impacts: { mediterranean: { fleetCapacity: 16, maritimeLosses: 1, warCredit: -4, contractorExposure: -5, overseasCommandDuration: 2 }, resources: { treasury: -6, timber: -5 }, flags: { fleetDoctrine: 'roman-keels' } } },
      { id: 'limited-convoy', label: 'Fund only a limited convoy force', detail: 'Keep losses and exposure bounded, but accept that Rome cannot yet dictate events beyond the straits.', impacts: { mediterranean: { fleetCapacity: 9, maritimeLosses: -2, warCredit: 2, alliedExhaustion: -3, overseasCommandDuration: 1 }, resources: { treasury: -2 }, flags: { fleetDoctrine: 'limited-convoy' } } },
    ],
  },
  {
    turn: 31, id: 'maritime-learning', title: 'Maritime Learning', speaker: 'Captains, interpreters, allied pilots, and citizen crews',
    prompt: 'A land power must learn seamanship, signals, and the limits of command before seeking decisive action.',
    context: 'Roman maritime practice developed through contact with Greek and Italian communities; learning was an institutional cost, not a free technology.',
    options: [
      { id: 'pilotage-exchange', label: 'Exchange pilots and methods', detail: 'Improve command by sharing authority with experienced sailors and paying the political price of dependence.', impacts: { mediterranean: { fleetCapacity: 8, maritimeLosses: -5, contractorExposure: 7, provincialTrust: 3, overseasCommandDuration: 2 }, resources: { treasury: -3 }, flags: { maritimeLearning: 'pilotage' } } },
      { id: 'drill-boarding', label: 'Drill crews for controlled boarding', detail: 'Translate Roman infantry habits into a naval method, increasing losses when commanders overreach.', impacts: { mediterranean: { fleetCapacity: 5, maritimeLosses: 4, warCredit: 6, alliedExhaustion: 3, overseasCommandDuration: 3 }, resources: { bronze: -2, treasury: -2 }, flags: { maritimeLearning: 'boarding' } } },
      { id: 'safe-harbors', label: 'Secure harbors and grain before battle', detail: 'Trade tempo for a durable supply chain and greater trust among communities that must provision the fleet.', impacts: { mediterranean: { fleetCapacity: 3, maritimeLosses: -3, provincialTrust: 8, importedGrainShare: 7, overseasCommandDuration: 2 }, resources: { grain: -3, treasury: -3 }, flags: { maritimeLearning: 'harbors' } } },
    ],
  },
  {
    turn: 32, id: 'sicilian-settlement', title: 'First Punic War Finance and Sicilian Settlement', speaker: 'Senators, tax farmers, Sicilian envoys, grain merchants, and returning crews',
    prompt: 'A war credit can sustain an overseas command only if settlement, grain, and local trust remain visible in the accounts.',
    context: 'The opening war belongs to the third century BC. This endpoint concerns finance and settlement, not later Punic wars or imperial administration.',
    options: [
      { id: 'war-credit', label: 'Issue a bounded war credit', detail: 'Keep the fleet at sea with transparent public borrowing, accepting contractor exposure and future repayment pressure.', impacts: { mediterranean: { warCredit: 18, contractorExposure: 8, fleetCapacity: 7, importedGrainShare: 4, alliedExhaustion: 5, overseasCommandDuration: 3 }, resources: { treasury: -5 }, flags: { sicilianSettlement: 'war-credit' } } },
      { id: 'local-compact', label: 'Settle Sicilian communities through negotiated dues', detail: 'Build trust and provisioning rights through differentiated terms, but accept slower extraction and less immediate credit.', impacts: { mediterranean: { provincialTrust: 18, importedGrainShare: 10, contractorExposure: -3, warCredit: 6, alliedExhaustion: -4, overseasCommandDuration: 2 }, resources: { treasury: -3, grain: -2 }, flags: { sicilianSettlement: 'local-compact' } } },
      { id: 'short-command', label: 'Limit the overseas command', detail: 'Return command to a short, bounded mandate before costs compound, preserving trust at the expense of momentum.', impacts: { mediterranean: { overseasCommandDuration: -2, contractorExposure: -5, alliedExhaustion: -6, warCredit: 3, provincialTrust: 5, importedGrainShare: 3 }, resources: { treasury: 2 }, flags: { sicilianSettlement: 'short-command' } } },
    ],
  },
  {
    turn: 33, id: 'hannibal-enters-italy', title: 'Hannibal Enters Italy', speaker: 'Consuls, allied envoys, quartermasters, and survivors from the northern roads',
    prompt: 'A Carthaginian army has crossed into Italy. Rome must decide whether to preserve its system, seek a quick decision, or make allied strongpoints carry the first shock.',
    context: 'Polybius presents the invasion as a test of Roman alliances and replacement capacity as well as battlefield command. The exact numbers and speeches remain literary evidence, not a complete staff record.',
    options: [
      { id: 'shadow-and-contain', label: 'Shadow the march and preserve the field armies', detail: 'Trade immediate prestige for intelligence, guarded roads, and reserves that can survive an early reverse without exposing the whole compact.', impacts: { resources: { treasury: -4, grain: -2 }, metrics: { readiness: 3 }, mediterranean: { emergencyReserve: 10, alliedExhaustion: 4, veteranSettlementPressure: 3 }, italian: { campaignPersistence: 7, reserveDepth: 4 }, flags: { hannibalPosture: 'contain' } } },
      { id: 'seek-decision', label: 'Concentrate for an early decisive battle', detail: 'Commit heavily before defections spread, gaining operational weight while exposing trained reserves and allied confidence to one field decision.', impacts: { resources: { grain: -4, treasury: -3 }, metrics: { readiness: 8, order: -2 }, mediterranean: { emergencyReserve: -5, alliedExhaustion: 9, veteranSettlementPressure: 8 }, italian: { reserveDepth: -9, campaignPersistence: 3 }, flags: { hannibalPosture: 'decision' } } },
      { id: 'defend-the-compacts', label: 'Fortify allied roads, depots, and strongpoints', detail: 'Disperse money and command among loyal communities so the invasion meets a network rather than a single army, accepting slower concentration.', impacts: { resources: { treasury: -5, timber: -2 }, metrics: { trade: -2, order: 3 }, factions: { allies: 6 }, mediterranean: { emergencyReserve: 6, alliedExhaustion: 2, provincialTrust: 4 }, italian: { allianceDepth: 9, campaignPersistence: 5 }, flags: { hannibalPosture: 'compacts' } } },
    ],
  },
  {
    turn: 34, id: 'after-cannae', title: 'After Cannae', speaker: 'Senators, levy officers, bereaved households, allied delegates, and surviving commanders',
    prompt: 'A field army has been shattered. The Republic must replace men and command without treating endurance as proof that the losses were affordable.',
    context: 'The scale and detail of Cannae are transmitted chiefly through Polybius and Livy. The strategic consequence is firmer: Rome refused settlement, raised new forces, and struggled to hold its allied system together.',
    options: [
      { id: 'rebuild-the-legions', label: 'Raise replacement legions and refuse negotiation', detail: 'Restore field capacity at once, drawing deeply on households, treasury, and future veteran claims while keeping the central command in the war.', impacts: { resources: { grain: -5, treasury: -5, bronze: -2 }, metrics: { readiness: 6, order: -3 }, mediterranean: { emergencyReserve: 20, alliedExhaustion: 6, veteranSettlementPressure: 12, warCredit: -4 }, italian: { reserveDepth: -7, campaignPersistence: 10 }, flags: { cannaeResponse: 'rebuild' } } },
      { id: 'protect-allied-cities', label: 'Rebuild around loyal allied cities', detail: 'Share garrisons, supply, and operational discretion with communities still holding, accepting less concentrated Roman control in return for endurance.', impacts: { resources: { treasury: -4, grain: -3 }, metrics: { order: 2, readiness: 3 }, factions: { allies: 7 }, mediterranean: { emergencyReserve: 8, alliedExhaustion: -5, provincialTrust: 4, veteranSettlementPressure: 6 }, italian: { allianceDepth: 8, campaignPersistence: 7 }, flags: { cannaeResponse: 'allied-defense' } } },
      { id: 'ransom-and-reconstitute', label: 'Ransom captives and reconstitute bounded commands', detail: 'Recover experienced men and shorten commands, spending heavily and conceding political ground to avoid replacing every loss with inexperienced levies.', impacts: { resources: { treasury: -7 }, metrics: { order: 4, readiness: 2 }, mediterranean: { emergencyReserve: 6, overseasCommandDuration: -3, warCredit: -5, alliedExhaustion: 2, veteranSettlementPressure: 5 }, flags: { cannaeResponse: 'ransom' } } },
    ],
  },
  {
    turn: 35, id: 'allied-endurance', title: 'Capua and Allied Endurance', speaker: 'Senators, Italian envoys, censors, grain officers, and commanders in Campania',
    prompt: 'Some communities have defected, many have not, and recovered ground must be governed. How should punishment, clemency, and shared burdens be distinguished?',
    context: 'The war did not divide Italy into two uniform camps. Capua became the leading example of defection and punishment, while other communities retained different statuses and records of service.',
    options: [
      { id: 'differentiated-settlement', label: 'Judge communities by conduct and compact', detail: 'Punish organized defection, preserve local arrangements where service held, and keep records clear enough that loyalty is not treated as mere submission.', impacts: { resources: { treasury: -3 }, metrics: { order: 4, trade: 2 }, factions: { allies: 6 }, mediterranean: { provincialTrust: 13, alliedExhaustion: -8, contractorExposure: -2, emergencyReserve: 4 }, italian: { allianceDepth: 7, coalitionRisk: -5 }, flags: { alliedSettlement: 'differentiated' } } },
      { id: 'exemplary-punishment', label: 'Make Capua an exemplary settlement', detail: 'Convert confiscation and direct control into immediate security and revenue, accepting that loyal communities may read the precedent as a warning.', impacts: { resources: { treasury: 6, grain: 3 }, metrics: { order: 6, trade: 2 }, mediterranean: { provincialTrust: -10, importedGrainShare: 8, warCredit: 10, alliedExhaustion: 4, veteranSettlementPressure: 3 }, italian: { allianceDepth: -6, coalitionRisk: -3 }, flags: { alliedSettlement: 'punitive' } } },
      { id: 'shared-recovery', label: 'Fund a shared Italian recovery', detail: 'Repair roads, stores, and local obligations with Rome carrying more of the immediate cost, reducing exhaustion without pretending defection never occurred.', impacts: { resources: { treasury: -7, stone: -2 }, metrics: { food: 3, trade: 4 }, factions: { allies: 8 }, mediterranean: { provincialTrust: 8, alliedExhaustion: -11, emergencyReserve: 5, veteranSettlementPressure: 4 }, italian: { allianceDepth: 9, maintenanceDebt: 3 }, flags: { alliedSettlement: 'shared-recovery' } } },
    ],
  },
  {
    turn: 36, id: 'victory-and-return', title: 'Victory, Credit, and the Returning Army', speaker: 'Censors, treasury officers, allied delegates, veterans, contractors, and grain merchants',
    prompt: 'The war is won, but victory returns armies, claims, debts, and damaged communities to Italy. Which obligations should the settlement discharge first?',
    context: 'The settlement after 201 BC brought indemnity, overseas commitments, veterans, and a changed balance of power. It did not erase the costs carried by Roman and allied households during the war.',
    options: [
      { id: 'restore-public-credit', label: 'Retire obligations and restore public credit', detail: 'Use victory receipts to close exposed contracts, restore reserves, and reduce accumulated burdens before authorizing a new program of expansion.', impacts: { resources: { treasury: 4 }, metrics: { order: 5, trade: 3 }, mediterranean: { warCredit: 13, contractorExposure: -11, alliedExhaustion: -8, veteranSettlementPressure: -6, emergencyReserve: 5 }, flags: { victorySettlement: 'public-credit' } } },
      { id: 'veteran-land-settlement', label: 'Settle veterans through recorded land grants', detail: 'Meet military claims through surveyed assignments and enforceable records, accepting local land disputes and a smaller immediate treasury recovery.', impacts: { resources: { treasury: -4, grain: -2 }, metrics: { order: 3, readiness: 4 }, mediterranean: { veteranSettlementPressure: -19, alliedExhaustion: 1, provincialTrust: -3, emergencyReserve: 12 }, italian: { reserveDepth: 6, allianceDepth: -2 }, flags: { victorySettlement: 'veteran-land' } } },
      { id: 'victory-and-provision', label: 'Pair victory works with grain and allied repair', detail: 'Use a bounded share of indemnity for public display while funding stores and allied reconstruction, leaving some contracts and veteran claims open.', impacts: { resources: { treasury: 1, stone: 3, grain: 4 }, metrics: { food: 5, trade: 5, order: 3 }, mediterranean: { importedGrainShare: 7, provincialTrust: 6, contractorExposure: 4, alliedExhaustion: -5, veteranSettlementPressure: 5 }, flags: { victorySettlement: 'provision' } } },
    ],
  },
)

COUNCILS.push(
  {
    turn: 37, id: 'triumph-or-capacity', title: 'Triumph or Capacity', speaker: 'Censors, senators, treasury officers, allied delegates, and returning commanders',
    prompt: 'Eastern victory enlarges the treasury and the claims upon it. Which obligation should receive first call on the windfall?',
    context: 'The wars of the early second century BC brought indemnities, booty, captives, artworks, commands, and public expectations into Rome. Ancient narratives describe triumphs and settlements more readily than the full accounts behind them.',
    options: [
      { id: 'retire-debt-and-water', label: 'Retire war obligations and survey water capacity', detail: 'Strengthen public credit and provision before authorizing display, accepting fewer immediate honors for commanders and patrons.', impacts: { resources: { treasury: 4, stone: 1 }, metrics: { water: 4, order: 2 }, metropolitan: { publicProvision: 12, contractingCapacity: 5, corruptionExposure: -5, patronageConcentration: -3, legalCaseLoad: 2 }, flags: { triumphPolicy: 'capacity-first' } } },
      { id: 'bounded-triumphal-program', label: 'Authorize a bounded triumphal program', detail: 'Recognize victory and employ captured wealth under public accounts, while adding crowds, sponsorship claims, and future operating costs.', impacts: { resources: { treasury: 2, stone: 3 }, metrics: { auspices: 5, order: 2 }, metropolitan: { urbanMigration: 5, rentPressure: 4, patronageConcentration: 7, contractingCapacity: 4, corruptionExposure: 3 }, flags: { triumphPolicy: 'bounded-display' } } },
      { id: 'distribute-gains-and-grain', label: 'Distribute gains and reinforce grain reserves', detail: 'Relieve households and market pressure now, accepting less capital for records, water, and permanent civic works.', impacts: { resources: { grain: 6, treasury: -1 }, metrics: { food: 6, trade: 2 }, metropolitan: { publicProvision: 8, rentPressure: -3, importedGrainDependence: 5, legalCaseLoad: 3, contractingCapacity: -2 }, flags: { triumphPolicy: 'distribution' } } },
    ],
  },
  {
    turn: 38, id: 'crowded-forum', title: 'The Crowded Forum', speaker: 'Censors, praetors, money handlers, advocates, merchants, and household representatives',
    prompt: 'Legal business, contracts, petitions, exchange, and political attendance now press upon the same open center. How should public business be made legible?',
    context: 'Second-century Rome added basilicas and other covered civic spaces around a Forum carrying legal, commercial, religious, and political functions. Exact sequences and plans remain unevenly preserved.',
    options: [
      { id: 'public-records-and-hearings', label: 'Expand public records and scheduled hearings', detail: 'Use magistrates and clerks to spread business across time and supervised places, reducing confusion at a recurring treasury cost.', impacts: { resources: { treasury: -5 }, metrics: { order: 5, trade: 2 }, metropolitan: { legalCaseLoad: -11, provincialPetitionBacklog: -7, contractingCapacity: 6, corruptionExposure: -5, publicProvision: 4 }, flags: { forumPolicy: 'public-capacity' } } },
      { id: 'licensed-patronal-halls', label: 'License patronal halls under public rules', detail: 'Acquire covered capacity quickly from leading houses, while allowing names, clients, and access to accumulate around sponsors.', impacts: { resources: { treasury: -2, stone: -2 }, metrics: { trade: 5 }, metropolitan: { legalCaseLoad: -7, patronageConcentration: 12, contractingCapacity: 8, corruptionExposure: 5, rentPressure: 3 }, flags: { forumPolicy: 'patronal-capacity' } } },
      { id: 'disperse-market-and-petitions', label: 'Disperse markets and petitions beyond the Forum', detail: 'Protect the central square from overload by assigning functions elsewhere, accepting slower coordination and resistance from established interests.', impacts: { resources: { treasury: -3 }, metrics: { sanitation: 3, trade: 1 }, metropolitan: { rentPressure: -5, legalCaseLoad: -5, provincialPetitionBacklog: 3, patronageConcentration: -5, publicProvision: 5 }, flags: { forumPolicy: 'dispersed-business' } } },
    ],
  },
  {
    turn: 39, id: 'pydna-spoils-command', title: 'Pydna, Spoils, and Provincial Command', speaker: 'Senators, censors, commanders, contractors, Italian delegates, and petitioners from overseas communities',
    prompt: 'Victory in Macedon expands treasure, captives, commands, and petitions faster than the Republic expands its capacity to inspect them. What rule should govern the settlement?',
    context: 'Polybius witnessed the political world around the Macedonian settlement; Livy and Plutarch preserve later narratives of commanders and triumph. They illuminate incentives and memory, but do not supply a complete administrative archive.',
    options: [
      { id: 'audited-commands', label: 'Close commands under audited public accounts', detail: 'Require inventories, hearings, and bounded mandates before men and money are reassigned, accepting slower distribution of gains.', impacts: { resources: { treasury: 4 }, metrics: { order: 4 }, metropolitan: { provincialPetitionBacklog: -10, corruptionExposure: -10, legalCaseLoad: 7, contractingCapacity: 5, patronageConcentration: -5, citizenAbsence: -4 }, flags: { pydnaSettlement: 'audited-commands' } } },
      { id: 'contracted-settlement', label: 'Contract collection under fixed schedules', detail: 'Use public contractors to turn the settlement into predictable receipts, while creating inspection burdens and concentrated commercial influence.', impacts: { resources: { treasury: 9 }, metrics: { trade: 5 }, metropolitan: { contractingCapacity: 12, corruptionExposure: 9, provincialPetitionBacklog: 5, patronageConcentration: 6, importedGrainDependence: 4 }, flags: { pydnaSettlement: 'contracted-receipts' } } },
      { id: 'commander-discretion', label: 'Leave distribution to the victorious command', detail: 'Reward soldiers and settle claims rapidly through military authority, reducing immediate absence while strengthening personal obligations.', impacts: { resources: { treasury: 5, grain: 3 }, metrics: { readiness: 5, order: -2 }, metropolitan: { citizenAbsence: -9, patronageConcentration: 13, corruptionExposure: 6, enslavedLaborInflow: 9, freedHouseholdIntegration: 2, rentPressure: 5 }, flags: { pydnaSettlement: 'commander-discretion' } } },
    ],
  },
  {
    turn: 40, id: 'carthage-corinth-settlement', title: 'Carthage, Corinth, and the Uses of Victory', speaker: 'Senators, censors, commanders, contractors, allied delegates, merchants, and returning soldiers',
    prompt: 'Two great wars end in the same year. Destruction, indemnities, land, captives, artworks, and new commands now enter Roman accounts. Which use of victory should set the governing rule?',
    context: 'Roman forces destroyed Carthage and Corinth in 146 BC, but the two settlements arose from different wars and local conditions. Ancient accounts preserve strong moral and dramatic frames more readily than complete inventories or administrative records.',
    options: [
      { id: 'audited-provision-settlement', label: 'Inventory gains and fund public provision', detail: 'Close commands under recorded accounts, reserve a bounded share for water, markets, and petition hearings, and accept slower private distribution.', impacts: { resources: { treasury: 5, stone: 2, grain: 2 }, metrics: { order: 4, water: 2 }, metropolitan: { publicProvision: 10, provincialPetitionBacklog: -8, corruptionExposure: -8, contractingCapacity: 5, patronageConcentration: -4 }, flags: { conquestSettlement: 'audited-provision' } } },
      { id: 'punitive-extraction', label: 'Turn exemplary punishment into receipts', detail: 'Sell assets, lease collection, and make the settlements warnings, gaining immediate funds while enlarging contractors, claims, and resentments.', impacts: { resources: { treasury: 12, grain: 3 }, metrics: { trade: 5, order: -3 }, metropolitan: { contractingCapacity: 10, corruptionExposure: 11, provincialPetitionBacklog: 8, patronageConcentration: 7, enslavedLaborInflow: 10, rentPressure: 4 }, flags: { conquestSettlement: 'punitive-extraction' } } },
      { id: 'bounded-command-acquisition', label: 'Bound commands and receive selected civic spoils', detail: 'Limit continued military discretion while assigning selected works and learned specialists to public places, accepting disputes over ownership and prestige.', impacts: { resources: { treasury: 6, stone: 3 }, metrics: { auspices: 5, trade: 2 }, metropolitan: { legalCaseLoad: 4, contractingCapacity: 5, corruptionExposure: -3, patronageConcentration: 4, publicProvision: 4, freedHouseholdIntegration: 4 }, flags: { conquestSettlement: 'bounded-command' } } },
    ],
  },
  {
    turn: 41, id: 'land-grain-service', title: 'Land, Grain, and Service', speaker: 'Censors, senators, tribunes, allied delegates, veterans, grain officers, tenants, and public contractors',
    prompt: 'By 133 BC, prolonged service, concentrated holdings, imported grain, migration, and public contracting press on one another. What settlement should the Republic authorize before a larger constitutional struggle begins?',
    context: 'The pressures later associated with Tiberius Gracchus did not begin in one year or reduce to one cause. Ancient accounts disagree about land, manpower, poverty, military service, and political motive; the game ends at the threshold rather than resolving the Gracchan contest in advance.',
    options: [
      { id: 'recorded-land-service', label: 'Review public land and record service claims', detail: 'Use commissions and bounded allotments to connect military obligation with enforceable tenure, accepting litigation, delay, and resistance from established possessors.', impacts: { resources: { treasury: -5, grain: -2 }, metrics: { readiness: 4, order: 2 }, metropolitan: { citizenAbsence: -10, legalCaseLoad: 8, rentPressure: -5, patronageConcentration: -7, publicProvision: 6 }, flags: { gracchanThreshold: 'recorded-land-service' } } },
      { id: 'grain-storage-provision', label: 'Strengthen grain storage and measured provision', detail: 'Reduce immediate urban pressure through inspected supply and reserves without claiming that food distribution alone repairs land or service obligations.', impacts: { resources: { grain: 7, treasury: -3 }, metrics: { food: 7, order: 4 }, metropolitan: { importedGrainDependence: 5, publicProvision: 12, rentPressure: -4, citizenAbsence: 2, contractingCapacity: 3 }, flags: { gracchanThreshold: 'grain-provision' } } },
      { id: 'colonial-service-outlets', label: 'Use colonies and bounded commands as outlets', detail: 'Offer recorded settlements beyond Rome and rotate commands more firmly, preserving military pathways while shifting cost and petition burdens outward.', impacts: { resources: { treasury: -2, grain: -3 }, metrics: { readiness: 6, trade: 3 }, metropolitan: { citizenAbsence: -5, rentPressure: -5, provincialPetitionBacklog: 7, patronageConcentration: 4, publicProvision: 2 }, italian: { allianceDepth: -2, reserveDepth: 4 }, flags: { gracchanThreshold: 'colonial-service' } } },
    ],
  },
)

export const OBJECTIVES = [
  { from: 1, to: 2, text: 'Shelter the first households and secure water.' },
  { from: 3, to: 4, text: 'Open exchange without leaving the river undefended.' },
  { from: 5, to: 6, text: 'Drain the Forum valley and unlock the civic city.' },
  { from: 7, to: 8, text: 'Turn specialized craft into durable public works.' },
  { from: 9, to: 10, text: 'Balance the Capitoline monument against the city below.' },
  { from: 11, to: 11, text: 'Replace royal command with offices the city can restrain.' },
  { from: 12, to: 12, text: 'Keep military service from consuming household independence.' },
  { from: 13, to: 13, text: 'Settle the first secession without making consent or command meaningless.' },
  { from: 14, to: 14, text: 'Sustain the war with Veii without severing the levy from its households.' },
  { from: 15, to: 15, text: 'Convert victory over Veii into a settlement the Republic can carry.' },
  { from: 16, to: 16, text: 'Meet the Gallic approach with the readiness your city and institutions have earned.' },
  { from: 17, to: 17, text: 'Stabilize the damaged city without hiding what was lost.' },
  { from: 18, to: 18, text: 'Choose a reconstruction doctrine whose costs will persist.' },
  { from: 19, to: 19, text: 'Settle debt, labor, and land claims before recovery hardens into faction.' },
  { from: 20, to: 20, text: 'Translate Roman recovery into a durable settlement with the Latin communities.' },
  { from: 21, to: 21, text: 'Choose whether roads and compacts serve security, commerce, or allied depth first.' },
  { from: 22, to: 22, text: 'Prepare roads, settlements, and allied contingents for a war the mountains will prolong.' },
  { from: 23, to: 23, text: 'Preserve an army and political system capable of recovering from the Caudine disaster.' },
  { from: 24, to: 24, text: 'Choose how road and water works will compete for crews, stone, and accounts.' },
  { from: 25, to: 25, text: 'Turn survival in the Samnite war into reserves, obligations, and a durable peace.' },
  { from: 26, to: 26, text: 'Prevent a many-sided coalition from breaking the Italian compact.' },
  { from: 27, to: 27, text: 'Meet a professional Hellenistic army without staking the whole system on one field day.' },
  { from: 28, to: 28, text: 'Convert replacement depth and allied endurance into strategic victory.' },
  { from: 29, to: 29, text: 'Judge whether Rome can maintain Italy before accepting Mediterranean commitments.' },
  { from: 30, to: 30, text: 'Acquire maritime capacity without pretending Rome already possesses a naval state.' },
  { from: 31, to: 31, text: 'Learn the practices that make a fleet more than a collection of hulls.' },
  { from: 32, to: 32, text: 'Finance the First Punic War opening and settle the first Sicilian obligations.' },
  { from: 33, to: 33, text: 'Meet invasion without staking the entire Italian system on one early decision.' },
  { from: 34, to: 34, text: 'Rebuild command after catastrophe while recording what replacement armies cost.' },
  { from: 35, to: 35, text: 'Distinguish loyal service, defection, punishment, and recovery across the Italian compact.' },
  { from: 36, to: 36, text: 'Settle war credit, allied exhaustion, and returning veterans before victory becomes a new burden.' },
  { from: 37, to: 37, text: 'Decide whether conquest first serves public capacity, display, or immediate distribution.' },
  { from: 38, to: 38, text: 'Keep law, exchange, petitions, and political attendance legible in a crowded Forum.' },
  { from: 39, to: 39, text: 'Settle commands and spoils without allowing victory to outrun public accounts.' },
  { from: 40, to: 40, text: 'Decide whether the victories of 146 BC enlarge public capacity, extraction, or bounded command.' },
  { from: 41, to: 41, text: 'Meet the land, grain, and service crisis without pretending one measure resolves every obligation.' },
]

export const getCouncil = (turn) => COUNCILS.find((item) => item.turn === turn) ?? null
export const getDistrict = (id) => DISTRICTS.find((item) => item.id === id)
export const getFamily = (id) => BUILDING_FAMILIES.find((item) => item.id === id)
export const getTier = (familyId, era) => getFamily(familyId)?.tiers.filter((item) => item.era <= era).at(-1)
export const getObjective = (turn) => OBJECTIVES.find((item) => turn >= item.from && turn <= item.to)?.text ?? ''

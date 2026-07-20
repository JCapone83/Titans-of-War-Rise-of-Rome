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
  {
    id: 'republic-under-strain',
    name: 'Republic Under Strain',
    span: '133-49 BC',
    turns: [42, 48],
    summary: 'Test whether land, citizenship, courts, assemblies, and military command can be revised without making emergency power permanent.',
  },
  {
    id: 'civil-war-settlement',
    name: 'Civil War and Settlement',
    span: '49-27 BC',
    turns: [49, 54],
    summary: 'End competing commands, settle armies and debts, and determine which institutions can operate after victory without disguising personal rule as ordinary office.',
  },
  {
    id: 'augustan-city',
    name: 'The Augustan City',
    span: '27 BC-AD 14',
    turns: [55, 61],
    summary: 'Test whether one household can concentrate command while leaving magistrates, public access, urban services, and succession strong enough to outlive the founder.',
  },
  {
    id: 'imperial-capital',
    name: 'Imperial Capital',
    span: 'AD 14-96',
    turns: [62, 70],
    summary: 'Build the capital at its greatest first-century scale while guard brokerage, military recognition, palace land, fire, provision, and succession test the public city beneath the monuments.',
  },
  {
    id: 'trajanic-capital',
    name: 'Trajanic Capital',
    span: 'AD 96-117',
    turns: [71, 76],
    summary: 'Join expansion, administration, water, harbor supply, public provision, maintenance, constitutional continuity, and succession at the empire\'s greatest territorial extent.',
  },
]

export const TURN_YEARS = [753, 735, 715, 690, 660, 640, 620, 600, 575, 535, 509, 503, 494, 406, 396, 390, 390, 389, 385, 338, 338, 326, 321, 312, 304, 295, 280, 275, 264, 261, 256, 241, 218, 216, 211, 201, 197, 184, 167, 146, 133, 121, 91, 88, 82, 78, 63, 49, 49, 46, 44, 42, 31, 27, 23, 19, 13, 9, 2, -6, -14, -14, -23, -41, -54, -64, -69, -75, -80, -96, -97, -102, -106, -109, -112, -117]

export const formatYear = (year) => year < 0 ? `AD ${Math.abs(year)}` : `${year} BC`

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

export const REPUBLIC_STRAIN_PROJECTS = {
  landCensusRegistry: {
    id: 'landCensusRegistry', name: 'Land and Census Registry', seasons: 3, unlockTurn: 42,
    cost: { timber: 1 },
    summary: 'Survey rooms, duplicate tablets, census rolls, and hearing space make land claims reviewable without pretending that records alone settle disputed possession.',
    completionMetrics: { order: 4, trade: 2 },
    completionStrain: { landTitleDisputes: -13, courtCapacity: 7, archiveIntegrity: 7, citizenshipIntegration: 4 },
    upkeepResources: { treasury: -1 },
    upkeepStrain: { courtCapacity: 1 },
    burdenLabel: 'Surveyors, copyists, hearings, and duplicate records require continuing appropriations.',
  },
  citizenshipRegisters: {
    id: 'citizenshipRegisters', name: 'Italian Citizenship Registers', seasons: 3, unlockTurn: 43,
    cost: { timber: 1, grain: 1 },
    summary: 'Distributed enrollment, census verification, voting assignments, and municipal copies turn a legal concession into an administrable Italian citizenship.',
    completionMetrics: { order: 5, trade: 2 },
    completionStrain: { citizenshipIntegration: 19, italianClaimsPressure: -18, courtCapacity: 5, archiveIntegrity: 5 },
    upkeepResources: { treasury: -1 },
    upkeepStrain: { citizenshipIntegration: 1 },
    burdenLabel: 'Enrollment, appeals, municipal copies, and revised levy rolls remain active work.',
  },
  forumCourts: {
    id: 'forumCourts', name: 'Forum Courts and Assembly Routes', seasons: 3, unlockTurn: 42,
    cost: { stone: 1, timber: 1 }, prerequisite: 'republicanBasilica',
    summary: 'Defined hearing spaces, posted routes, barriers, and stewarded approaches preserve lawful assembly and court business in a crowded civic core.',
    completionMetrics: { order: 6, trade: 3 },
    completionStrain: { courtCapacity: 14, popularConsentChannels: 12, streetViolence: -8 },
    upkeepResources: { treasury: -1 },
    upkeepStrain: { streetViolence: -1 },
    burdenLabel: 'Clerks, route control, repairs, and equal access must be funded beyond the dedication.',
  },
  tabularium: {
    id: 'tabularium', name: 'Tabularium State Archive', seasons: 2, unlockTurn: 45,
    cost: { stone: 1 }, prerequisite: 'landCensusRegistry',
    summary: 'A massive archive and retaining complex at the Capitoline slope gives accounts, laws, treaties, and titles guarded continuity without inventing its disputed upper form.',
    completionMetrics: { order: 5, trade: 2 },
    completionStrain: { archiveIntegrity: 24, courtCapacity: 9, landTitleDisputes: -8, emergencyPowersPrecedent: -3 },
    upkeepResources: { treasury: -1 },
    upkeepStrain: { archiveIntegrity: 1 },
    burdenLabel: 'Guards, copyists, fire protection, indexing, and record transfer remain permanent charges.',
  },
  watchStations: {
    id: 'watchStations', name: 'Watch and Service Stations', seasons: 3, unlockTurn: 45,
    cost: { timber: 1 },
    summary: 'Small junction compounds store buckets, hooks, ladders, lamps, route tablets, and hand carts: a bounded republican precursor, not the later imperial vigiles.',
    completionMetrics: { order: 5, sanitation: 3 },
    completionStrain: { urbanFireResponse: 19, streetViolence: -10, popularConsentChannels: 3 },
    upkeepResources: { treasury: -1 },
    upkeepStrain: { urbanFireResponse: 1 },
    burdenLabel: 'Night patrols, equipment, water access, and accountable local command require recurring service.',
  },
}

export const CIVIL_SETTLEMENT_PROJECTS = {
  caesarianForum: {
    id: 'caesarianForum', name: 'Forum of Caesar and Temple of Venus Genetrix', seasons: 3, unlockTurn: 49,
    cost: { stone: 1 },
    summary: 'Property, drainage, porticoes, service rooms, and an axial temple create new court capacity while making one commander\'s lineage and patronage permanent in the civic core.',
    completionMetrics: { order: 4, trade: 5 },
    completionSettlement: { civicOperatingCapacity: 11, urbanDisplacement: 7, personalMonumentalCredit: 13, senateOperatingCapacity: 3 },
    upkeepResources: { treasury: -1 },
    upkeepSettlement: { personalMonumentalCredit: 1 },
    burdenLabel: 'Courts, shops, drainage, security, ceremonies, and displaced circulation remain continuing charges.',
  },
  curiaJulia: {
    id: 'curiaJulia', name: 'Curia Julia', seasons: 3, unlockTurn: 51, prerequisite: 'caesarianForum',
    cost: { stone: 1, timber: 1 },
    summary: 'A severe enclosed Senate hall begun after the old curial site was displaced. Three playable stages represent work continuing through the triumviral years toward Augustan completion near 29 BC.',
    completionMetrics: { order: 5 },
    completionSettlement: { senateOperatingCapacity: 17, archiveContinuity: 8, civicOperatingCapacity: 6, personalMonumentalCredit: 5 },
    upkeepResources: { treasury: -1 },
    upkeepSettlement: { senateOperatingCapacity: 1 },
    burdenLabel: 'Clerks, security, records transfer, roof repair, and access to deliberation require permanent provision.',
  },
  basilicaJulia: {
    id: 'basilicaJulia', name: 'Basilica Julia', seasons: 4, unlockTurn: 50,
    cost: { stone: 1, timber: 1 },
    summary: 'A long flexible legal and business hall whose construction, dedication, fire, and later completion test whether civic capacity survives changes of regime.',
    completionMetrics: { order: 5, trade: 6 },
    completionSettlement: { civicOperatingCapacity: 15, courtContinuity: 17, warFinanceBurden: -4, urbanDisplacement: 5 },
    upkeepResources: { treasury: -1 },
    upkeepSettlement: { courtContinuity: 1 },
    burdenLabel: 'Tribunals, shops, roofing, fire repair, records, and crowd circulation remain expensive operating commitments.',
  },
  veteranLandRoadRegistry: {
    id: 'veteranLandRoadRegistry', name: 'Veteran Land and Road Registry', seasons: 3, unlockTurn: 50,
    cost: { timber: 1, grain: 1 },
    summary: 'Surveyed allotments, municipal copies, road access, appeals, and demobilization rolls turn promises to soldiers into reviewable obligations without erasing prior title claims.',
    completionMetrics: { order: 4, readiness: 2 },
    completionSettlement: { armyDemobilization: 17, veteranSettlementPressure: -16, italianLandSecurity: 12, confiscationPressure: -8, archiveContinuity: 5 },
    upkeepResources: { treasury: -1 },
    upkeepSettlement: { italianLandSecurity: 1 },
    burdenLabel: 'Surveyors, appeals, municipal duplicates, road maintenance, and unresolved title cases continue after allotment.',
  },
}

export const AUGUSTAN_PROJECTS = {
  palatineOfficialPrecinct: {
    id: 'palatineOfficialPrecinct', name: 'Palatine Official Precinct', seasons: 3, unlockTurn: 55,
    cost: { stone: 1 },
    summary: 'A deliberately restrained official residence and temple precinct joins household, cult, petition, and command on the Palatine without turning the whole hill into a later imperial palace.',
    completionMetrics: { order: 3, auspices: 3 },
    completionAugustan: { princepsAuthority: 8, householdStanding: 10, urbanAdministration: 4, publicAccess: -2, patronageConcentration: 5 },
    upkeepResources: { treasury: -1 }, upkeepAugustan: { householdStanding: 1, patronageConcentration: 1 },
    burdenLabel: 'Household officials, petition routes, temple service, and guarded access require continuing supervision.',
  },
  mausoleumAugustus: {
    id: 'mausoleumAugustus', name: 'Mausoleum of Augustus', seasons: 4, unlockTurn: 55,
    cost: { stone: 1 },
    summary: 'A great dynastic tomb in the Campus Martius makes the ruling household part of Rome\'s public memory while raising the cost of an uncertain succession.',
    completionMetrics: { auspices: 4 },
    completionAugustan: { householdStanding: 9, successionConfidence: 5, monumentMemory: 13, patronageConcentration: 4 },
    upkeepResources: { treasury: -1 }, upkeepAugustan: { monumentMemory: 1 },
    burdenLabel: 'Grounds, ritual service, access, and dynastic commemorations continue after construction.',
  },
  agrippanPantheon: {
    id: 'agrippanPantheon', name: 'Agrippa\'s Pantheon Precinct', seasons: 4, unlockTurn: 55,
    cost: { timber: 1 },
    summary: 'An uncertainty-labeled reconstruction of Agrippa\'s Augustan temple precinct. Its form is disputed and it must not be mistaken for Hadrian\'s later domed rotunda.',
    completionMetrics: { auspices: 4, order: 2 },
    completionAugustan: { senateMagistrateCapacity: 3, monumentMemory: 8, publicAccess: 8, householdStanding: 4 },
    upkeepResources: { treasury: -1 }, upkeepAugustan: { publicAccess: 1, maintenanceCapacity: -1 },
    burdenLabel: 'Cult service, precinct repair, drainage, and public approach remain operating obligations.',
  },
  bathsAgrippa: {
    id: 'bathsAgrippa', name: 'Baths of Agrippa', seasons: 4, unlockTurn: 56,
    cost: { stone: 1 },
    summary: 'A public bathing complex tied to water, maintenance, crowd access, and Agrippa\'s patronage turns conquest wealth into a recurring urban service.',
    completionMetrics: { water: 5, sanitation: 5 },
    completionAugustan: { urbanAdministration: 5, publicAccess: 13, maintenanceCapacity: -2, householdStanding: 3 },
    upkeepResources: { treasury: -1 }, upkeepAugustan: { publicAccess: 1, maintenanceCapacity: -1 },
    burdenLabel: 'Water, heating, fuel, cleaning, attendants, and repairs make bathing a permanent service rather than a dedication alone.',
  },
  theatreMarcellus: {
    id: 'theatreMarcellus', name: 'Theatre of Marcellus', seasons: 4, unlockTurn: 57,
    cost: { stone: 1 },
    summary: 'A monumental theatre joins public entertainment, circulation, dynastic memory, and elite seating in one visible civic institution.',
    completionMetrics: { order: 4, trade: 3 },
    completionAugustan: { householdStanding: 6, monumentMemory: 8, publicAccess: 9, patronageConcentration: 3 },
    upkeepResources: { treasury: -1 }, upkeepAugustan: { publicAccess: 1, maintenanceCapacity: -1 },
    burdenLabel: 'Performances, seating order, crowd routes, substructures, and repairs remain annual charges.',
  },
  araPacis: {
    id: 'araPacis', name: 'Ara Pacis Augustae', seasons: 3, unlockTurn: 57,
    cost: { stone: 1 },
    summary: 'An altar voted after Augustus returned from the western provinces links peace, Senate ritual, family imagery, and provincial command without erasing the force behind the settlement.',
    completionMetrics: { auspices: 5, order: 2 },
    completionAugustan: { senateMagistrateCapacity: 6, householdStanding: 5, monumentMemory: 10, provincialCommandBalance: 5 },
    upkeepResources: { treasury: -1 }, upkeepAugustan: { senateMagistrateCapacity: 1 },
    burdenLabel: 'Sacrifice, processions, precinct care, and senatorial commemoration keep the monument politically active.',
  },
  forumAugustus: {
    id: 'forumAugustus', name: 'Forum of Augustus and Temple of Mars Ultor', seasons: 5, unlockTurn: 59,
    cost: { stone: 1 },
    summary: 'A new forum adds courts, ceremony, military departure, and a curated gallery of Roman memory while concentrating credit in the princeps\' household.',
    completionMetrics: { order: 5, trade: 4, auspices: 3 },
    completionAugustan: { princepsAuthority: 8, senateMagistrateCapacity: 6, urbanAdministration: 6, monumentMemory: 13, patronageConcentration: 5, publicAccess: 4 },
    upkeepResources: { treasury: -1 }, upkeepAugustan: { urbanAdministration: 1, maintenanceCapacity: -1 },
    burdenLabel: 'Courts, ceremonies, records, security, porticoes, and the temple require a permanent civic staff.',
  },
  vigilesWardNetwork: {
    id: 'vigilesWardNetwork', name: 'Vigiles Ward Network', seasons: 3, unlockTurn: 60,
    cost: { timber: 1 },
    summary: 'A game-scale ward network represents the AD 6 fire brigade, night watch, equipment stores, routes, and accountable command rather than one monumental building.',
    completionMetrics: { sanitation: 6, order: 4 },
    completionAugustan: { urbanAdministration: 10, fireCoverage: 22, publicAccess: 4, maintenanceCapacity: -2 },
    upkeepResources: { treasury: -1 }, upkeepAugustan: { fireCoverage: 2, maintenanceCapacity: -1 },
    burdenLabel: 'Pay, patrols, buckets, hooks, ladders, stations, water access, and command review recur every year.',
  },
}

export const IMPERIAL_CAPITAL_PROJECTS = {
  castraPraetoria: {
    id: 'castraPraetoria', name: 'Castra Praetoria', seasons: 3, unlockTurn: 62,
    cost: { stone: 1, timber: 1 }, evidence: 'Evidence-led plan with generalized service interiors',
    summary: 'A concentrated guard camp improves rapid response and succession security while giving one armed corps a permanent position beside the capital.',
    completionMetrics: { readiness: 4, order: 2 },
    completionImperial: { guardInfluence: 12, armyRecognition: 5, imperialAuthority: 5, publicAccess: -3 },
    upkeepResources: { treasury: -1, grain: -1 }, upkeepImperial: { guardInfluence: 1, maintenanceCapacity: -1 },
    burdenLabel: 'Pay, grain, discipline, command appointments, and political access make guard concentration a continuing risk.',
  },
  aquaClaudia: {
    id: 'aquaClaudia', name: 'Aqua Claudia and Anio Novus', seasons: 4, unlockTurn: 64,
    cost: { stone: 1, treasury: 1 }, evidence: 'Evidence-led infrastructure synthesis',
    summary: 'High-capacity water lines and their iconic arcades increase supply only when sources, channels, distribution, inspections, and repairs remain funded.',
    completionMetrics: { water: 10, sanitation: 5 },
    completionImperial: { publicProvision: 13, fireResilience: 8, maintenanceCapacity: 4, publicAccess: 4 },
    upkeepResources: { treasury: -2 }, upkeepImperial: { maintenanceCapacity: -1 },
    burdenLabel: 'Long conduits, source rights, arcade repair, and district distribution require permanent crews and accounts.',
  },
  claudianPortus: {
    id: 'claudianPortus', name: 'Claudian Portus and Imperial Horrea', seasons: 4, unlockTurn: 64,
    cost: { stone: 1, timber: 1, treasury: 1 }, evidence: 'Evidence-led harbor system with bounded warehouse abstraction',
    summary: 'The outer harbor, lighthouse, canals, transfer craft, and guarded stores improve grain reliability without erasing storms, silting, contracts, or Tiber bottlenecks.',
    completionMetrics: { food: 8, trade: 7 },
    completionImperial: { harborSupply: 17, publicProvision: 10, provincialTrust: 3, maintenanceCapacity: -2 },
    upkeepResources: { treasury: -2 }, upkeepImperial: { harborSupply: 1, maintenanceCapacity: -1 },
    burdenLabel: 'Dredging, warehouses, contracts, transfer craft, roads, and grain inspection consume recurring funds.',
  },
  domusAurea: {
    id: 'domusAurea', name: 'Domus Aurea Emergency Palace', seasons: 3, unlockTurn: 66,
    cost: { stone: 1, timber: 1 }, evidence: 'Evidence-led precinct with reconstruction uncertainty above surviving fabric',
    summary: 'A palace-park across fire-cleared land can coordinate the household and court, but it displaces streets, dwellings, public access, and future rebuilding choices.',
    completionMetrics: { auspices: 3, order: -2 },
    completionImperial: { imperialAuthority: 9, palaceConcentration: 18, successionConfidence: 3, publicAccess: -13, senateCompact: -5 },
    upkeepResources: { treasury: -2 }, upkeepImperial: { palaceConcentration: 2, maintenanceCapacity: -1 },
    burdenLabel: 'Water, gardens, guards, service corridors, finishes, and occupied urban land remain a visible charge.',
  },
  flavianAmphitheatre: {
    id: 'flavianAmphitheatre', name: 'Flavian Amphitheatre', seasons: 4, unlockTurn: 67, openingTurn: 69, operatingTurn: 70,
    cost: { stone: 1, timber: 1, treasury: 1 }, prerequisite: 'flavian-public-conversion', evidence: 'Evidence-led intact Flavian reconstruction',
    summary: 'An intact elliptical amphitheater reclaims Nero\'s former lake for public spectacle through foundations, arcades, seating, arena service, crowd routes, water, and continuing operation.',
    completionMetrics: { order: 7, trade: 4 },
    completionImperial: { publicAccess: 15, publicProvision: 4, palaceConcentration: -10, imperialAuthority: 6, maintenanceCapacity: -4 },
    upkeepResources: { treasury: -2, grain: -1 }, upkeepImperial: { publicAccess: 1, maintenanceCapacity: -2 },
    burdenLabel: 'Crowd routes, seating, awnings, arena crews, animals, sanitation, fountains, and substructures require a permanent operating establishment.',
  },
  templePeace: {
    id: 'templePeace', name: 'Temple of Peace Complex', seasons: 3, unlockTurn: 68,
    cost: { stone: 1 }, evidence: 'Evidence-led forum-like precinct with cautious functional interpretation',
    summary: 'Porticoes, gardens, water, display, records, and sacred space turn victory into an accessible claim of restored order rather than one isolated temple.',
    completionMetrics: { auspices: 4, order: 4 },
    completionImperial: { publicAccess: 8, senateCompact: 4, provincialTrust: 3, maintenanceCapacity: -2 },
    upkeepResources: { treasury: -1 }, upkeepImperial: { maintenanceCapacity: -1 },
    burdenLabel: 'Gardens, water, collections, records, ritual, and public access continue after dedication.',
  },
  archTitus: {
    id: 'archTitus', name: 'Arch of Titus', seasons: 2, unlockTurn: 69,
    cost: { stone: 1 }, evidence: 'Evidence-led single-bay honorific arch',
    summary: 'A compact single-bay arch fixes victory and dynastic succession on the ceremonial route but contributes memory rather than water, grain, or housing.',
    completionMetrics: { auspices: 4 },
    completionImperial: { successionConfidence: 6, imperialAuthority: 4, palaceConcentration: 3 },
    upkeepResources: { treasury: -1 }, upkeepImperial: {},
    burdenLabel: 'Reliefs, route clearance, ceremony, and dynastic commemoration create costs without direct provision.',
  },
  domitianicPalace: {
    id: 'domitianicPalace', name: 'Domitianic Palace Administration', seasons: 4, unlockTurn: 69,
    cost: { stone: 1, treasury: 1 }, evidence: 'Evidence-led plan with reconstructed upper architecture',
    summary: 'Linked public halls, offices, courts, terraces, service routes, and private quarters make the Palatine an administrative machine while separating authority from the city below.',
    completionMetrics: { order: 4, trade: 2 },
    completionImperial: { imperialAuthority: 10, successionConfidence: 4, palaceConcentration: 14, senateCompact: -5, maintenanceCapacity: -3 },
    upkeepResources: { treasury: -2 }, upkeepImperial: { palaceConcentration: 1, maintenanceCapacity: -1 },
    burdenLabel: 'Audiences, archives, guards, kitchens, water, heating, staff, ceremony, and repairs enlarge the permanent court.',
  },
}

export const TRAJANIC_CAPITAL_PROJECTS = {
  forumTrajan: {
    id: 'forumTrajan', name: 'Forum of Trajan, Basilica Ulpia, Libraries, and Column', seasons: 5, unlockTurn: 73,
    cost: { stone: 7, timber: 3, bronze: 2, treasury: 8 }, evidence: 'Evidence-led integrated complex; exact phasing and excavation limits remain uncertain',
    summary: 'Excavate the Quirinal shoulder and join forum, Basilica Ulpia, libraries, and the Column in one administrative and commemorative precinct whose surviving remains establish the broad program more securely than every working sequence.',
    completionMetrics: { order: 8, trade: 5, auspices: 4 }, completionTrajanic: { administrativeCapacity: 14, capitalSupply: 8, constitutionalContinuity: 5, provincialTrust: 3 },
    upkeepResources: { treasury: -2 }, upkeepTrajanic: { maintenanceCapacity: -1, maintenanceDebt: 1 }, burdenLabel: 'Courts, records, libraries, ceremonies, stairs, retaining walls, and public movement require permanent staff, inspection, and repair.', prerequisite: 'quirinal-excavation'
  },
  trajanAdministrativeComplex: {
    id: 'trajanAdministrativeComplex', name: 'Trajanic Administrative Complex', seasons: 4, unlockTurn: 73,
    cost: { stone: 5, timber: 2, bronze: 1, treasury: 6 }, evidence: 'Evidence-led office and archive synthesis with uncertain internal arrangements',
    summary: 'Provide linked offices, archives, courts, service rooms, and controlled routes around the new forum so imperial business can be recorded and carried without naming the complex as a market or erasing its administrative purpose.',
    completionMetrics: { order: 6, trade: 4 }, completionTrajanic: { administrativeCapacity: 16, provincialTrust: 5, constitutionalContinuity: 4, successionSettlement: 3 },
    upkeepResources: { treasury: -2 }, upkeepTrajanic: { administrativeCapacity: 1, maintenanceCapacity: -1 }, burdenLabel: 'Clerks, archives, messengers, legal rooms, guards, water, and account review enlarge the permanent civil establishment.', prerequisite: 'quirinal-excavation'
  },
  bathsTrajan: {
    id: 'bathsTrajan', name: 'Baths of Trajan and Sette Sale Support', seasons: 4, unlockTurn: 74,
    cost: { stone: 6, timber: 3, treasury: 6, bronze: 2 }, evidence: 'Evidence-led conversion of Domus Aurea ground; service connections and phases remain partly uncertain',
    summary: 'Convert and bury portions of the Domus Aurea beneath a public bathing establishment, carrying water, cisterns, fuel, staff, and the Sette Sale support into an operating burden rather than treating dedication as completion.',
    completionMetrics: { water: 7, sanitation: 9, order: 4 }, completionTrajanic: { publicProvision: 14, capitalSupply: 4, maintenanceCapacity: -2, constitutionalContinuity: 2 },
    upkeepResources: { treasury: -2, grain: -1 }, upkeepTrajanic: { maintenanceCapacity: -2, maintenanceDebt: 2 }, burdenLabel: 'Water lifting, cisterns, fuel, attendants, cleaning, storage, heating, and repairs make the baths a lasting charge.', prerequisite: 'domus-aurea-ground'
  },
  aquaTraiana: {
    id: 'aquaTraiana', name: 'Aqua Traiana Capture and Conduit System', seasons: 4, unlockTurn: 75,
    cost: { stone: 5, timber: 2, bronze: 1, treasury: 7 }, evidence: 'Evidence-led distributed water system; source routes and later repairs are not wholly recoverable',
    summary: 'Capture, convey, inspect, and distribute water through a network of sources, conduits, reservoirs, and district branches, treating Aqua Traiana as a distributed system rather than another Aqua Claudia arcade.',
    completionMetrics: { water: 12, sanitation: 6 }, completionTrajanic: { publicProvision: 12, capitalSupply: 8, maintenanceCapacity: -1, provincialTrust: 2 },
    upkeepResources: { treasury: -2 }, upkeepTrajanic: { maintenanceCapacity: -2, maintenanceDebt: 1 }, burdenLabel: 'Source rights, channels, reservoirs, leaks, crews, and district distribution require continuing inspection and treasury.', prerequisite: 'aqua-capacity'
  },
  trajanicPortus: {
    id: 'trajanicPortus', name: 'Trajanic Portus and Hexagonal Inner Basin', seasons: 5, unlockTurn: 75,
    cost: { stone: 7, timber: 4, bronze: 2, treasury: 8 }, evidence: 'Evidence-led harbor expansion; exact transfer channels and flood works remain partly uncertain',
    summary: 'Retain the Claudian harbor while adding the hexagonal inner basin, Tiber transfer, grain handling, and flood resilience so the port enlarges supply without pretending that weather, silt, craft, and storage have disappeared.',
    completionMetrics: { food: 10, trade: 9, water: 3 }, completionTrajanic: { capitalSupply: 16, publicProvision: 12, provincialTrust: 6, maintenanceCapacity: -2 },
    upkeepResources: { treasury: -3, grain: -1 }, upkeepTrajanic: { maintenanceCapacity: -2, maintenanceDebt: 2 }, burdenLabel: 'Dredging, quays, transfer craft, warehouses, flood banks, roads, and grain inspection consume recurring funds.', prerequisite: 'claudian-portus-retained'
  },
  trajanicCircus: {
    id: 'trajanicCircus', name: 'Trajanic Circus and Inherited Valley Completion', seasons: 3, unlockTurn: 76,
    cost: { stone: 4, timber: 2, bronze: 1, treasury: 5 }, evidence: 'Evidence-led final stage of the inherited valley; exact dedication sequence remains uncertain',
    summary: 'Complete the inherited valley as a circus precinct with circulation, seating, water, service routes, and ceremonial order, making the final stage a continuation of accumulated urban work rather than an isolated new foundation.',
    completionMetrics: { order: 7, trade: 5, sanitation: 3 }, completionTrajanic: { constitutionalContinuity: 8, publicProvision: 7, capitalSupply: 5, maintenanceCapacity: -1 },
    upkeepResources: { treasury: -2, grain: -1 }, upkeepTrajanic: { maintenanceCapacity: -2, maintenanceDebt: 1 }, burdenLabel: 'Crowd routes, seating, water, spectacle service, sanitation, ceremonies, and repairs remain annual obligations.', prerequisite: 'inherited-valley'
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
    turn: 62, id: 'tiberian-transfer', title: 'The Augustan Transfer', speaker: 'Tiberius, consuls, senators, praetorian officers, provincial commanders, and the imperial household',
    prompt: 'Augustus is dead. Oaths, commands, tribunician power, household authority, and senatorial procedure must move without opening a military contest.',
    context: 'Tacitus, Suetonius, Velleius Paterculus, and Cassius Dio describe the transfer with different purposes and distances from events. The game treats hesitation, acclamation, and legal renewal as overlapping instruments rather than one constitutional ceremony.',
    options: [
      { id: 'recorded-renewal', label: 'Renew each power through recorded institutions', detail: 'Use Senate decrees, army oaths, provincial instructions, and public accounts to make the exceptional package legible.', impacts: { resources: { treasury: -2 }, metrics: { order: 4 }, imperial: { successionConfidence: 12, senateCompact: 9, armyRecognition: 7, guardInfluence: -2, imperialAuthority: 3 }, flags: { imperialTransfer: 'recorded-renewal' } } },
      { id: 'guarded-acclamation', label: 'Secure household and guard acclamation first', detail: 'Prevent a vacuum through the heir, guards, and commanders, accepting a precedent in which armed recognition comes before civic renewal.', impacts: { resources: { treasury: 2, grain: 1 }, metrics: { order: 5, readiness: 4 }, imperial: { successionConfidence: 10, imperialAuthority: 9, guardInfluence: 10, armyRecognition: 8, senateCompact: -3 }, flags: { imperialTransfer: 'guarded-acclamation' } } },
      { id: 'consular-interim', label: 'Let consuls conduct a bounded interim', detail: 'Keep ordinary offices visibly active while powers are assigned, risking delay among guards and provincial armies.', impacts: { resources: { treasury: -3 }, metrics: { order: 1, readiness: -2 }, imperial: { senateCompact: 12, successionConfidence: 6, imperialAuthority: -4, guardInfluence: 3, armyRecognition: -2, publicAccess: 3 }, flags: { imperialTransfer: 'consular-interim' } } },
    ],
  },
  {
    turn: 63, id: 'guard-and-administration', title: 'Guard, Senate, and Administration', speaker: 'Tiberius, consuls, senators, praetorian prefects, urban officers, petitioners, and provincial governors',
    prompt: 'A permanent imperial administration can be restrained, centralized, or routed through the guard and household. Which offices carry routine government?',
    context: 'The concentration of the Praetorian cohorts and Sejanus\' rise belong to a longer problem: an armed corps near Rome, access to the princeps, and administrative delegation could reinforce one another without replacing every senatorial office.',
    options: [
      { id: 'mixed-offices', label: 'Divide routine business among recorded offices', detail: 'Preserve senatorial, equestrian, and urban jurisdictions with audits and dated delegations.', impacts: { resources: { treasury: -3 }, metrics: { order: 3, trade: 2 }, imperial: { senateCompact: 10, maintenanceCapacity: 6, imperialAuthority: 3, guardInfluence: -4, publicAccess: 5 }, flags: { tiberianAdministration: 'mixed-offices' } } },
      { id: 'prefectural-center', label: 'Build a disciplined prefectural center', detail: 'Use specialized prefects for security, grain, and the city while publishing their jurisdictions and accounts.', impacts: { resources: { treasury: -2 }, metrics: { order: 5, readiness: 2 }, imperial: { imperialAuthority: 7, publicProvision: 5, fireResilience: 3, guardInfluence: 4, senateCompact: 2 }, flags: { tiberianAdministration: 'prefectural-center' } } },
      { id: 'household-gatekeeping', label: 'Let household and guard control access', detail: 'Move petitions and appointments quickly through trusted intermediaries, at the cost of Senate compact and succession safety.', impacts: { resources: { treasury: 3 }, metrics: { order: 2 }, imperial: { imperialAuthority: 10, guardInfluence: 12, palaceConcentration: 8, senateCompact: -7, successionConfidence: -3 }, flags: { tiberianAdministration: 'household-gatekeeping' } } },
    ],
  },
  {
    turn: 64, id: 'claudian-provision', title: 'Claudian Water and Harbor Provision', speaker: 'Claudius, senators, water commissioners, harbor engineers, grain officers, contractors, and provincial shippers',
    prompt: 'The capital has outgrown its old water and maritime supply. How should aqueducts, harbor, warehouses, and contracts be governed?',
    context: 'Aqua Claudia and Anio Novus entered service in AD 52. Claudius\' harbor at Portus addressed sea access and grain transfer, but construction did not remove weather, silting, contracting, storage, and Tiber transport from the problem.',
    options: [
      { id: 'integrated-provision-board', label: 'Join water, harbor, and grain under audited boards', detail: 'Fund sources, quays, warehouses, distribution, and inspection as linked public systems.', impacts: { resources: { treasury: -6, stone: 3, timber: 2 }, metrics: { water: 5, food: 4, trade: 3 }, imperial: { publicProvision: 12, harborSupply: 10, maintenanceCapacity: 8, senateCompact: 4, imperialAuthority: 3 }, flags: { claudianProvision: 'integrated-board' } } },
      { id: 'imperial-contracts', label: 'Drive the works through imperial contracts', detail: 'Accelerate construction under palace credit and specialist contractors while accepting concentration and future claims.', impacts: { resources: { treasury: -2, stone: 4, timber: 3 }, metrics: { water: 6, trade: 5 }, imperial: { publicProvision: 9, harborSupply: 8, imperialAuthority: 7, palaceConcentration: 6, maintenanceCapacity: 1 }, flags: { claudianProvision: 'imperial-contracts' } } },
      { id: 'water-first', label: 'Finish urban water before the outer harbor', detail: 'Protect fire and household supply now while leaving the grain fleet dependent on older transfer routes.', impacts: { resources: { treasury: -4, stone: 4 }, metrics: { water: 8, sanitation: 4 }, imperial: { fireResilience: 9, publicProvision: 7, harborSupply: -4, maintenanceCapacity: 5 }, flags: { claudianProvision: 'water-first' } } },
    ],
  },
  {
    turn: 65, id: 'neronian-court', title: 'Nero, Court, and Public Credit', speaker: 'Nero, senators, household advisers, guard officers, grain officials, performers, creditors, and provincial envoys',
    prompt: 'A young succession joins court favor, public display, military recognition, and ordinary provision. What limits the palace before crisis decides the question?',
    context: 'Ancient accounts of Nero are hostile, theatrical, and indispensable. The game separates court expenditure and palace access from grain, water, fire, Senate cooperation, and provincial government rather than treating personality as a complete explanation.',
    options: [
      { id: 'published-court-budget', label: 'Publish court accounts and preserve civic jurisdictions', detail: 'Fund ceremony but keep grain, water, justice, and appointments under reviewable offices.', impacts: { resources: { treasury: -3 }, metrics: { order: 3 }, imperial: { senateCompact: 8, publicProvision: 6, palaceConcentration: -5, provincialTrust: 4, imperialAuthority: 2 }, flags: { neronianCourt: 'published-budget' } } },
      { id: 'popular-spectacle', label: 'Trade court credit for public spectacle', detail: 'Use games and distributions to build direct public standing while deferring maintenance and senatorial bargaining.', impacts: { resources: { treasury: -4, grain: -2 }, metrics: { order: 5, auspices: 3 }, imperial: { publicAccess: 8, imperialAuthority: 5, palaceConcentration: 4, maintenanceCapacity: -5, senateCompact: -2 }, flags: { neronianCourt: 'popular-spectacle' } } },
      { id: 'palace-command', label: 'Concentrate appointments and credit in the palace', detail: 'Strengthen immediate coordination and household loyalty while narrowing access and widening succession risk.', impacts: { resources: { treasury: 4 }, metrics: { order: 1 }, imperial: { imperialAuthority: 10, palaceConcentration: 12, guardInfluence: 5, senateCompact: -8, publicAccess: -6, successionConfidence: -4 }, flags: { neronianCourt: 'palace-command' } } },
    ],
  },
  {
    turn: 66, id: 'fire-ad64', title: 'The Fire of AD 64', speaker: 'Nero, consuls, vigiles, water officers, displaced households, property holders, builders, and grain officials',
    prompt: 'Fire has destroyed dense quarters and opened contested land. Who receives shelter, who controls clearance, and what rules govern rebuilding?',
    context: 'Tacitus supplies the most influential narrative of the fire and relief. The scale, cause, rumors, and imperial response remain disputed; destruction, displacement, emergency shelter, new building rules, and land pressure are the secure operating problem.',
    options: [
      { id: 'public-rebuild-code', label: 'Shelter first and rebuild under public street rules', detail: 'Fund relief, wider routes, firebreaks, water access, height controls, and appeal before permanent clearance.', impacts: { resources: { treasury: -7, grain: -4, timber: -2 }, metrics: { shelter: 7, sanitation: 4, order: 3 }, imperial: { fireResilience: 17, publicAccess: 10, publicProvision: 8, palaceConcentration: -5, maintenanceCapacity: 5 }, flags: { fireSettlement: 'public-rebuild', flavianConversionSite: true } } },
      { id: 'mixed-clearance', label: 'Divide clearance among public routes and bounded palace ground', detail: 'Reserve strategic corridors and limited official space while compensating claims through recorded hearings.', impacts: { resources: { treasury: -4, grain: -2 }, metrics: { shelter: 3, order: 2 }, imperial: { fireResilience: 10, publicAccess: 3, palaceConcentration: 6, senateCompact: 4, maintenanceCapacity: 2 }, flags: { fireSettlement: 'mixed-clearance', flavianConversionSite: true } } },
      { id: 'domus-aurea-land', label: 'Use the cleared center for the Domus Aurea', detail: 'Create a controlled palace landscape and emergency command center, displacing public routes and attaching reconstruction to the ruler.', impacts: { resources: { treasury: -2, stone: 3, timber: 2 }, metrics: { shelter: -5, order: -3 }, imperial: { imperialAuthority: 9, palaceConcentration: 18, publicAccess: -14, fireResilience: 3, senateCompact: -5 }, flags: { fireSettlement: 'palace-land', flavianConversionSite: true } } },
    ],
  },
  {
    turn: 67, id: 'four-emperors', title: 'The Four Emperors', speaker: 'Senators, praetorians, urban officers, treasury officials, and envoys from the Rhine, Danube, East, and Italian armies',
    prompt: 'The Four Emperors have shown that armies can nominate rulers and march on Rome. What settlement can join military recognition, Senate action, treasury repair, and public land?',
    context: 'AD 69 demonstrated that succession was imperial and military, not merely Roman and dynastic. Tacitus, Suetonius, Josephus, inscriptions, and coinage preserve different parts of the struggle and Flavian settlement.',
    options: [
      { id: 'flavian-public-conversion', label: 'Recognize Vespasian and return Neronian land to public use', detail: 'Join army recognition to Senate decree, fiscal repair, and conversion of the lake precinct into a public amphitheater.', impacts: { resources: { treasury: 5, stone: 3, timber: 2 }, metrics: { order: 6, readiness: 4 }, imperial: { armyRecognition: 13, successionConfidence: 9, senateCompact: 6, palaceConcentration: -10, publicAccess: 8, maintenanceCapacity: 3 }, flags: { flavianSettlement: 'public-conversion' } } },
      { id: 'flavian-fiscal-first', label: 'Repair treasury and armies before monumental conversion', detail: 'Secure pay, taxes, and provincial command first, preserving the lake site for later public decision.', impacts: { resources: { treasury: 9, grain: 3 }, metrics: { readiness: 6, order: 3 }, imperial: { armyRecognition: 15, provincialTrust: 5, maintenanceCapacity: 8, publicAccess: 2, palaceConcentration: -4 }, flags: { flavianSettlement: 'fiscal-first' } } },
      { id: 'military-acclamation', label: 'Let victorious armies define the settlement', detail: 'Reward commanders and secure force quickly, accepting guard and army brokerage as the practical constitution.', impacts: { resources: { treasury: 5, grain: -2 }, metrics: { readiness: 9, order: 1 }, imperial: { armyRecognition: 18, imperialAuthority: 8, guardInfluence: 8, senateCompact: -8, successionConfidence: 3, provincialTrust: -4 }, flags: { flavianSettlement: 'military-acclamation' } } },
    ],
  },
  {
    turn: 68, id: 'flavian-peace', title: 'Flavian Peace and Public Credit', speaker: 'Vespasian, Titus, senators, treasury officers, builders, provincial envoys, and neighborhood delegates',
    prompt: 'War receipts and restored credit can support provision, debt retirement, public conversion, or a broad monumental claim. Which burden comes first?',
    context: 'Vespasian\'s settlement combined fiscal repair, dynastic presentation, public construction, provincial administration, and victory commemoration. The Temple of Peace was dedicated in AD 75; its operating complex exceeded one temple cella.',
    options: [
      { id: 'service-and-conversion', label: 'Fund provision and the public conversion together', detail: 'Pair grain, water, and fire accounts with the amphitheater and Temple of Peace, limiting the number of simultaneous projects.', impacts: { resources: { treasury: -3, stone: 3, timber: 2 }, metrics: { food: 4, water: 3, order: 4 }, imperial: { publicProvision: 10, publicAccess: 9, maintenanceCapacity: 5, palaceConcentration: -5 }, flags: { flavianProgram: 'service-conversion' } } },
      { id: 'monuments-from-victory', label: 'Drive a victory-funded monumental program', detail: 'Turn spoils and dynastic credit into rapid construction while accepting maintenance and provincial suspicion.', impacts: { resources: { treasury: 3, stone: 5 }, metrics: { auspices: 6, order: 3 }, imperial: { imperialAuthority: 8, publicAccess: 6, maintenanceCapacity: -7, provincialTrust: -4, palaceConcentration: 3 }, flags: { flavianProgram: 'victory-monuments' } } },
      { id: 'treasury-and-provinces', label: 'Retire claims and stabilize provincial obligations', detail: 'Restore credit and predictable dues before finishing spectacle, gaining resilience with less immediate display.', impacts: { resources: { treasury: 8 }, metrics: { trade: 4 }, imperial: { provincialTrust: 10, maintenanceCapacity: 9, publicProvision: 5, publicAccess: -2, imperialAuthority: 2 }, flags: { flavianProgram: 'fiscal-provinces' } } },
    ],
  },
  {
    turn: 69, id: 'amphitheatre-opens', title: 'The Flavian Amphitheatre Opens', speaker: 'Titus, senators, arena officials, engineers, vigiles, neighborhood delegates, performers, and grain officers',
    prompt: 'The amphitheater can open in AD 80 as a public conversion of the former lake. What operating rule keeps the dedication from becoming an unfunded shell?',
    context: 'The Flavian Amphitheatre opened under Titus in AD 80. Its crowd circulation, arena surface, awnings, fountains, latrines, staffing, and wooden underground machinery were operating systems; Domitian later added durable masonry substructures.',
    options: [
      { id: 'funded-public-operation', label: 'Open with funded crowd and service systems', detail: 'Pay for routes, water, sanitation, staffing, awnings, arena machinery, and inspection before expanding the calendar.', impacts: { resources: { treasury: -6, grain: -3 }, metrics: { order: 6, sanitation: 5, trade: 3 }, imperial: { publicAccess: 13, fireResilience: 5, maintenanceCapacity: 8, publicProvision: 4, palaceConcentration: -4 }, flags: { amphitheatreRule: 'funded-operation' } } },
      { id: 'hundred-days', label: 'Use an exceptional opening festival', detail: 'Maximize public and dynastic credit now while deferring part of the permanent service account.', impacts: { resources: { treasury: -5, grain: -5 }, metrics: { order: 8, auspices: 6 }, imperial: { publicAccess: 12, imperialAuthority: 8, successionConfidence: 5, maintenanceCapacity: -6 }, flags: { amphitheatreRule: 'festival-opening' } } },
      { id: 'limited-calendar', label: 'Open on a limited inspected calendar', detail: 'Protect maintenance and neighborhood access through fewer events, accepting less immediate acclaim.', impacts: { resources: { treasury: -3, grain: -1 }, metrics: { order: 3, sanitation: 4 }, imperial: { publicAccess: 7, maintenanceCapacity: 11, fireResilience: 4, imperialAuthority: 2 }, flags: { amphitheatreRule: 'limited-calendar' } } },
    ],
  },
  {
    turn: 70, id: 'domitianic-judgment', title: 'The Palace and Succession at AD 96', speaker: 'Domitian\'s household, senators, praetorians, urban officers, provincial commanders, palace staff, and prospective successors',
    prompt: 'Rome is visually magnificent and administratively immense, but palace concentration and an unresolved succession can turn capacity into crisis. What must survive the ruler?',
    context: 'Domitian\'s assassination in AD 96 ended the Flavian dynasty. The palace, administration, army, Senate, treasury, and public works endured in unequal condition; the game judges their operating relationship rather than treating grandeur or murder as a complete verdict.',
    options: [
      { id: 'recorded-adoption', label: 'Bind adoption to Senate and army recognition', detail: 'Name a successor through recorded adoption, secure commands, preserve staff, and publish the transfer of powers.', impacts: { resources: { treasury: -3 }, metrics: { order: 6, readiness: 3 }, imperial: { successionConfidence: 16, senateCompact: 9, armyRecognition: 8, guardInfluence: -3, imperialAuthority: 2 }, flags: { imperialSuccession96: 'recorded-adoption' } } },
      { id: 'palace-continuity', label: 'Let palace administration carry the transfer', detail: 'Preserve specialists and central routines through the household and prefects, accepting narrow political access.', impacts: { resources: { treasury: 2 }, metrics: { order: 4 }, imperial: { successionConfidence: 10, imperialAuthority: 9, palaceConcentration: 10, maintenanceCapacity: 5, senateCompact: -5 }, flags: { imperialSuccession96: 'palace-continuity' } } },
      { id: 'senatorial-restoration-96', label: 'Reassert Senate choice under guarded terms', detail: 'Choose a respected senator and negotiate army oaths, restoring civic standing while risking delay and guard bargaining.', impacts: { resources: { treasury: -4, grain: -1 }, metrics: { order: 2, readiness: -2 }, imperial: { successionConfidence: 9, senateCompact: 14, imperialAuthority: -5, armyRecognition: 2, guardInfluence: 4, publicAccess: 4 }, flags: { imperialSuccession96: 'senatorial-choice' } } },
    ],
  },
)

COUNCILS.push(
  {
    turn: 55, id: 'principate-operating-rule', title: 'The Principate in Practice', speaker: 'Augustus, Agrippa, consuls, senators, equestrian administrators, provincial envoys, and grain officers',
    prompt: 'The settlement has names and honors; now it needs an operating rule. Where should command, petitions, finance, and ordinary magistracy meet?',
    context: 'The arrangements associated with 27 and 23 BC were successive adjustments, not one finished constitution. Augustus accumulated powers while consuls, Senate, courts, cities, and provincial commands continued to operate.',
    options: [
      { id: 'administrative-princeps', label: 'Build a supervised administrative center', detail: 'Join the princeps\' command to auditable equestrian and senatorial offices, gaining coordination at the cost of making routine business depend upon the center.', impacts: { resources: { treasury: 5, stone: 2 }, metrics: { order: 4, trade: 2 }, augustan: { princepsAuthority: 9, urbanAdministration: 10, senateMagistrateCapacity: 3, patronageConcentration: 4, provincialCommandBalance: 5 }, flags: { augustanOperatingRule: 'administrative-principate' } } },
      { id: 'civic-compact', label: 'Route business through Senate and magistrates', detail: 'Reserve more petitions, accounts, and appointments for ordinary offices, accepting slower coordination and harder bargaining over provincial command.', impacts: { resources: { treasury: 3, stone: 1 }, metrics: { order: 3 }, augustan: { senateMagistrateCapacity: 12, publicAccess: 6, princepsAuthority: 3, urbanAdministration: 4, provincialCommandBalance: 3 }, flags: { augustanOperatingRule: 'civic-compact' } } },
      { id: 'household-command', label: 'Make the household the clearing house', detail: 'Use trusted family, freedmen, friends, and commanders to move decisions quickly, accepting patronal concentration and a more personal succession problem.', impacts: { resources: { treasury: 6, grain: 2 }, metrics: { readiness: 4, order: 2 }, augustan: { princepsAuthority: 12, householdStanding: 11, urbanAdministration: 5, patronageConcentration: 11, senateMagistrateCapacity: -3 }, flags: { augustanOperatingRule: 'household-principate' } } },
    ],
  },
  {
    turn: 56, id: 'agrippas-civic-program', title: 'Agrippa and the Public City', speaker: 'Agrippa, aediles, water officials, contractors, senators, neighborhood delegates, and bath attendants',
    prompt: 'Water, baths, temples, roads, and spectacles can widen civic access or consolidate one partnership. How should Agrippa\'s program operate?',
    context: 'Agrippa combined commands, offices, wealth, technical direction, and public benefaction. The surviving evidence is stronger for major works and dedications than for every administrative arrangement behind them.',
    options: [
      { id: 'municipal-service-board', label: 'Put services under recorded public boards', detail: 'Fund water and maintenance through accountable offices, sacrificing speed and some personal credit for operating continuity.', impacts: { resources: { treasury: -3, stone: 2 }, metrics: { water: 5, sanitation: 4 }, augustan: { urbanAdministration: 9, maintenanceCapacity: 10, publicAccess: 8, senateMagistrateCapacity: 5, householdStanding: -2 }, flags: { agrippanProgram: 'public-boards' } } },
      { id: 'agrippan-benefaction', label: 'Accept Agrippa\'s integrated benefaction', detail: 'Let one trusted partner coordinate works and access rapidly, while tying services and memory to the ruling partnership.', impacts: { resources: { treasury: 4, stone: 3 }, metrics: { water: 6, trade: 3 }, augustan: { publicAccess: 9, householdStanding: 7, monumentMemory: 6, urbanAdministration: 5, patronageConcentration: 6 }, flags: { agrippanProgram: 'integrated-benefaction' } } },
      { id: 'district-service-compacts', label: 'Disperse service through district compacts', detail: 'Give neighborhoods defined maintenance duties and access guarantees, gaining local resilience while accepting uneven capacity.', impacts: { resources: { timber: 3, grain: 2 }, metrics: { sanitation: 5, order: 2 }, augustan: { publicAccess: 11, maintenanceCapacity: 6, fireCoverage: 5, urbanAdministration: 2, princepsAuthority: -2 }, flags: { agrippanProgram: 'district-compacts' } } },
    ],
  },
  {
    turn: 57, id: 'household-senate-succession', title: 'Household, Senate, and Succession', speaker: 'Augustus, Livia, Agrippa, consuls, senators, jurists, priests, and representatives of the younger household',
    prompt: 'The regime depends on persons as well as offices. How should honors, commands, and public expectations prepare for succession without declaring a monarchy?',
    context: 'Augustan succession was repeatedly revised through marriages, adoptions, offices, honors, deaths, and command grants. No early arrangement proved permanent.',
    options: [
      { id: 'staged-public-apprenticeship', label: 'Stage office and command under public review', detail: 'Prepare possible successors through visible magistracies and bounded commands, improving legibility but exposing rivalry and delay.', impacts: { resources: { treasury: -2 }, metrics: { order: 3 }, augustan: { successionConfidence: 11, senateMagistrateCapacity: 7, provincialCommandBalance: 6, householdStanding: 3, princepsAuthority: -1 }, flags: { successionMethod: 'public-apprenticeship' } } },
      { id: 'dynastic-honors', label: 'Center honors in the ruling household', detail: 'Make continuity visible through marriage, adoption, youth honors, and dynastic monuments, gaining recognition while narrowing the field.', impacts: { resources: { treasury: 2, stone: 2 }, metrics: { auspices: 4 }, augustan: { successionConfidence: 8, householdStanding: 12, monumentMemory: 7, patronageConcentration: 8, senateMagistrateCapacity: -2 }, flags: { successionMethod: 'dynastic-honors' } } },
      { id: 'senatorial-contingency', label: 'Keep several senatorial contingencies viable', detail: 'Avoid naming one inevitable heir and preserve multiple officeholders, reducing dynastic concentration but leaving a less decisive transfer.', impacts: { resources: { treasury: -1 }, metrics: { order: 1 }, augustan: { senateMagistrateCapacity: 10, successionConfidence: 5, householdStanding: -3, patronageConcentration: -4, provincialCommandBalance: 3 }, flags: { successionMethod: 'senatorial-contingency' } } },
    ],
  },
  {
    turn: 58, id: 'peace-and-provincial-command', title: 'Peace, Ritual, and Provincial Command', speaker: 'Consuls, priests, provincial governors, allied delegations, veterans, and the Augustan household',
    prompt: 'The language of peace now rests on armies and provincial settlements. How should commemoration relate to actual command?',
    context: 'The Senate voted the Ara Pacis after Augustus returned from Spain and Gaul. Its imagery and ritual belonged to a political settlement sustained by provincial command and military force.',
    options: [
      { id: 'senatorial-peace-account', label: 'Join commemoration to senatorial accounts', detail: 'Require command reports, ritual votes, and provincial petitions beside celebration, making peace a reviewed settlement.', impacts: { resources: { treasury: -2, stone: 2 }, metrics: { auspices: 4, order: 3 }, augustan: { senateMagistrateCapacity: 8, provincialCommandBalance: 10, monumentMemory: 6, princepsAuthority: 2 }, flags: { peaceSettlement: 'reviewed-command' } } },
      { id: 'victory-peace-program', label: 'Present peace as the princeps\' victory', detail: 'Unify public memory around restored order and the ruling household, strengthening authority while obscuring bargaining and command costs.', impacts: { resources: { treasury: 3, stone: 3 }, metrics: { auspices: 6, readiness: 3 }, augustan: { princepsAuthority: 10, householdStanding: 8, monumentMemory: 10, provincialCommandBalance: 2, patronageConcentration: 5 }, flags: { peaceSettlement: 'victory-program' } } },
      { id: 'provincial-renewal-calendar', label: 'Publish command renewals and provincial petitions', detail: 'Make terms, revenues, and appeals more legible, limiting spectacle in favor of enforceable provincial review.', impacts: { resources: { treasury: -3 }, metrics: { trade: 4, order: 2 }, augustan: { provincialCommandBalance: 13, senateMagistrateCapacity: 5, urbanAdministration: 4, monumentMemory: -2, publicAccess: 4 }, flags: { peaceSettlement: 'published-renewals' } } },
    ],
  },
  {
    turn: 59, id: 'forum-memory-justice', title: 'The Forum of Augustus', speaker: 'Augustus, praetors, senators, advocates, architects, priests, veterans, and property holders',
    prompt: 'The new forum can relieve courts and organize military ceremony, but it also edits Roman memory around one victor. Which operating rule should govern it?',
    context: 'The Forum of Augustus and Temple of Mars Ultor combined legal business, military and religious ceremony, ancestry, exempla, and dynastic representation. Construction and land constraints stretched across decades.',
    options: [
      { id: 'courts-first-forum', label: 'Give courts and public access first claim', detail: 'Staff hearings, routes, and records before expanding ceremony, limiting exclusive household control at a recurring cost.', impacts: { resources: { treasury: -4, stone: 3 }, metrics: { order: 5, trade: 3 }, augustan: { senateMagistrateCapacity: 8, urbanAdministration: 7, publicAccess: 9, maintenanceCapacity: 4, monumentMemory: 3 }, flags: { forumAugustusRule: 'courts-first' } } },
      { id: 'martial-dynastic-forum', label: 'Center Mars Ultor and dynastic memory', detail: 'Make military departure, vengeance, ancestry, and household authority the precinct\'s organizing language.', impacts: { resources: { treasury: 3, stone: 4 }, metrics: { readiness: 5, auspices: 4 }, augustan: { princepsAuthority: 9, householdStanding: 9, monumentMemory: 12, patronageConcentration: 6, publicAccess: 1 }, flags: { forumAugustusRule: 'martial-dynastic' } } },
      { id: 'mixed-civic-calendar', label: 'Divide the calendar among civic functions', detail: 'Reserve dated periods for courts, Senate ceremony, military business, and public festivals, gaining balance at the cost of slower throughput.', impacts: { resources: { treasury: -2, stone: 2 }, metrics: { order: 4, trade: 2 }, augustan: { senateMagistrateCapacity: 6, publicAccess: 7, monumentMemory: 7, provincialCommandBalance: 4, princepsAuthority: 4 }, flags: { forumAugustusRule: 'mixed-calendar' } } },
    ],
  },
  {
    turn: 60, id: 'fire-and-vigiles', title: 'The Fire of AD 6', speaker: 'Augustus, magistrates, equestrian officers, neighborhood leaders, water officials, property holders, and night watchmen',
    prompt: 'Fire exposes the limits of improvised response. Who should command a permanent night watch and fire service?',
    context: 'After serious fires, Augustus established the vigiles in AD 6 under an equestrian prefect, organized across the city. The playable network is a scale abstraction of stations, men, equipment, routes, water, and command.',
    options: [
      { id: 'central-vigiles', label: 'Create a centrally commanded vigiles', detail: 'Fund a permanent citywide service under one accountable prefect, gaining reach while enlarging central administration and coercive capacity.', impacts: { resources: { treasury: -5, timber: 3 }, metrics: { sanitation: 6, order: 4 }, augustan: { fireCoverage: 18, urbanAdministration: 10, princepsAuthority: 5, maintenanceCapacity: 5, patronageConcentration: 3 }, flags: { vigilesCommand: 'central-prefect' } } },
      { id: 'magistrate-ward-service', label: 'Coordinate ward crews through magistrates', detail: 'Keep local knowledge and civic offices in command, accepting uneven readiness and slower reinforcement.', impacts: { resources: { treasury: -3, timber: 2 }, metrics: { sanitation: 5, order: 3 }, augustan: { fireCoverage: 13, senateMagistrateCapacity: 8, publicAccess: 5, maintenanceCapacity: 6, urbanAdministration: 4 }, flags: { vigilesCommand: 'magistrate-wards' } } },
      { id: 'contracted-night-watch', label: 'Contract equipment and neighborhood watches', detail: 'Mobilize property holders and contractors quickly, reducing public payroll while weakening uniform standards and inspection.', impacts: { resources: { treasury: 2, timber: 3 }, metrics: { sanitation: 3, trade: 2 }, augustan: { fireCoverage: 9, urbanAdministration: 2, maintenanceCapacity: 2, patronageConcentration: 9, publicAccess: -2 }, flags: { vigilesCommand: 'contracted-watch' } } },
    ],
  },
  {
    turn: 61, id: 'succession-ad14', title: 'The Settlement Outlives Augustus', speaker: 'Augustus\' household, Tiberius, consuls, senators, praetorians, provincial commanders, magistrates, and the Roman people',
    prompt: 'The founder is dying. Which institutions carry command, grain, public order, provinces, and legitimacy through the first transfer?',
    context: 'Augustus died in AD 14 and Tiberius succeeded through accumulated powers, family position, military standing, and senatorial action. The transition was neither an ordinary election nor a simple published law of hereditary monarchy.',
    options: [
      { id: 'recorded-transfer', label: 'Record powers and renew them through Senate and armies', detail: 'Make each command, tribunal power, oath, and provincial instruction explicit, reducing ambiguity while revealing how exceptional the package has become.', impacts: { resources: { treasury: -2 }, metrics: { order: 5, readiness: 2 }, augustan: { successionConfidence: 14, senateMagistrateCapacity: 7, provincialCommandBalance: 8, urbanAdministration: 5, princepsAuthority: 3 }, flags: { augustanSuccession: 'recorded-transfer' } } },
      { id: 'household-acclamation', label: 'Secure household and military acclamation first', detail: 'Use the established heir, guards, armies, and household network to prevent a vacuum, accepting a more openly personal transfer.', impacts: { resources: { treasury: 2, grain: 2 }, metrics: { order: 5, readiness: 6 }, augustan: { successionConfidence: 12, householdStanding: 10, princepsAuthority: 8, patronageConcentration: 8, senateMagistrateCapacity: -2 }, flags: { augustanSuccession: 'household-acclamation' } } },
      { id: 'senatorial-interregnum', label: 'Let consuls and Senate conduct an interregnum', detail: 'Reassert ordinary offices before assigning exceptional powers, preserving civic capacity while risking delay among armies and provinces.', impacts: { resources: { treasury: -3, grain: -1 }, metrics: { order: 2, readiness: -3 }, augustan: { successionConfidence: 8, senateMagistrateCapacity: 12, princepsAuthority: -5, provincialCommandBalance: 4, publicAccess: 4 }, flags: { augustanSuccession: 'senatorial-interregnum' } } },
    ],
  },
)

COUNCILS.push(
  {
    turn: 42, id: 'land-commission-and-grain', title: 'Land Commission and Grain', speaker: 'Tribunes, senators, commissioners, possessors, veterans, tenants, grain officers, and Italian delegates',
    prompt: 'The Gracchan conflicts have made land, grain, military service, and constitutional procedure inseparable in public debate. What rule should survive the men who first pressed it?',
    context: 'Appian and Plutarch provide the fullest connected narratives, but both wrote long afterward and shaped events around character and constitutional decline. Surviving agrarian-law evidence confirms complex claims and procedures without supplying a complete transcript of the conflicts.',
    options: [
      { id: 'recorded-commission', label: 'Continue a bounded commission under recorded appeal', detail: 'Survey public claims, preserve hearings, and pair limited allotments with measured grain contracts, accepting delay and a large judicial burden.', impacts: { resources: { treasury: -5, grain: -2 }, metrics: { order: 3, food: 3 }, strain: { landTitleDisputes: -9, courtCapacity: 7, popularConsentChannels: 7, emergencyPowersPrecedent: -3, streetViolence: -2 }, flags: { landGrainSettlement: 'recorded-commission' } } },
      { id: 'colonial-outlets', label: 'Use colonial outlets and bounded grain relief', detail: 'Move part of the land demand to surveyed settlements and relieve the city market, while shifting title disputes and obligations into Italian and provincial communities.', impacts: { resources: { treasury: -3, grain: 4 }, metrics: { food: 5, readiness: 3 }, strain: { landTitleDisputes: -4, italianClaimsPressure: 4, demobilizationCapacity: 8, courtCapacity: 2, popularConsentChannels: 2 }, flags: { landGrainSettlement: 'colonial-outlets' } } },
      { id: 'senatorial-restoration', label: 'End the commission and restore senatorial disposal', detail: 'Close the extraordinary machinery and reduce immediate administrative conflict, leaving possession and military-service claims to ordinary influence and future bargaining.', impacts: { resources: { treasury: 4 }, metrics: { order: -2, trade: 3 }, strain: { landTitleDisputes: 10, courtCapacity: -4, popularConsentChannels: -10, streetViolence: 8, emergencyPowersPrecedent: 4 }, flags: { landGrainSettlement: 'senatorial-restoration' } } },
    ],
  },
  {
    turn: 43, id: 'italian-claims', title: 'Italian Claims and Roman Citizenship', speaker: 'Senators, tribunes, censors, allied delegates, municipal magistrates, commanders, and treasury officers',
    prompt: 'Italian communities have carried war, tax, and military obligations without equal access to Roman decisions. How should citizenship and administration be joined?',
    context: 'The Social War followed decades of varied claims and proposals, not one uniform Italian program. Citizenship grants during and after the war required enrollment, census, voting assignments, municipal adjustment, and military settlement before legal language became operating reality.',
    options: [
      { id: 'staged-citizenship', label: 'Grant staged citizenship with distributed enrollment', detail: 'Authorize citizenship while funding municipal copies, census review, and voting assignments so inclusion can operate beyond a single declaration.', impacts: { resources: { treasury: -6, timber: -2 }, metrics: { order: 5, readiness: 2 }, strain: { citizenshipIntegration: 17, italianClaimsPressure: -16, courtCapacity: 5, archiveIntegrity: 5, senateCommandControl: -2 }, flags: { italianSettlement: 'staged-citizenship' } } },
      { id: 'negotiated-compacts', label: 'Negotiate status by community and service record', detail: 'Preserve differentiated compacts and offer wider rights in stages, reducing immediate registry cost while leaving unequal standing and future bargaining.', impacts: { resources: { treasury: -3 }, metrics: { trade: 4, order: 2 }, strain: { citizenshipIntegration: 8, italianClaimsPressure: -7, courtCapacity: 2, landTitleDisputes: 3, popularConsentChannels: 2 }, flags: { italianSettlement: 'negotiated-compacts' } } },
      { id: 'delay-and-mobilize', label: 'Delay inclusion and mobilize against coercion', detail: 'Treat armed pressure as a threat to lawful authority, preserving immediate senatorial discretion while risking a wider war and a harsher later settlement.', impacts: { resources: { treasury: -5, grain: -3 }, metrics: { readiness: 7, order: -7 }, strain: { citizenshipIntegration: -7, italianClaimsPressure: 18, commanderPersonalLoyalty: 7, emergencyPowersPrecedent: 8, streetViolence: 5 }, flags: { italianSettlement: 'military-delay' } } },
    ],
  },
  {
    turn: 44, id: 'emergency-command', title: 'Emergency Command and the Eastern War', speaker: 'Consuls, senators, tribunes, veteran officers, creditors, Italian delegates, and envoys from the East',
    prompt: 'An eastern command, recent Italian war, and rival claims to military authority collide. What rule governs command when ordinary competition threatens armed reversal?',
    context: 'The transfer of the Mithridatic command and Sulla\'s march on Rome established precedents whose exact motives are filtered through later narratives. The decisive institutional fact is that military command and domestic political settlement became directly entangled.',
    options: [
      { id: 'ordinary-command-review', label: 'Keep the command within ordinary office and review', detail: 'Require a dated mandate, public accounts, and a successor named through the established sequence, accepting slower concentration and intense political bargaining.', impacts: { resources: { treasury: -3 }, metrics: { readiness: 2, order: 4 }, strain: { senateCommandControl: 9, commanderPersonalLoyalty: -8, emergencyPowersPrecedent: -6, courtCapacity: 4, popularConsentChannels: 3 }, flags: { emergencyCommand: 'ordinary-review' } } },
      { id: 'single-command-with-audit', label: 'Grant one extended command with an audit and return date', detail: 'Concentrate the eastern war under one experienced commander while binding finance, recruitment, and succession to a published review.', impacts: { resources: { treasury: -4, grain: -2 }, metrics: { readiness: 7, order: 1 }, strain: { senateCommandControl: 3, commanderPersonalLoyalty: 4, emergencyPowersPrecedent: 4, demobilizationCapacity: 3, archiveIntegrity: 2 }, flags: { emergencyCommand: 'extended-audited' } } },
      { id: 'competing-commands', label: 'Balance factions with competing commands', detail: 'Divide men, provinces, and promises among rival leaders so no one monopolizes force, accepting confused orders and personal recruitment.', impacts: { resources: { treasury: -6, grain: -3 }, metrics: { readiness: 3, order: -8 }, strain: { senateCommandControl: -12, commanderPersonalLoyalty: 15, emergencyPowersPrecedent: 11, streetViolence: 8, demobilizationCapacity: -5 }, flags: { emergencyCommand: 'competing-commands' } } },
    ],
  },
  {
    turn: 45, id: 'sullan-settlement', title: 'The Sullan Settlement', speaker: 'Senators, magistrates, veterans, dispossessed households, jurists, municipal delegates, and treasury officers',
    prompt: 'Victory has returned an army to Rome. Courts, titles, offices, and veteran claims must be settled under the shadow of confiscation. Which institutions survive the settlement?',
    context: 'The dictatorship, proscriptions, confiscations, colonies, Senate enlargement, and limits on the tribunate are broadly attested, but surviving totals and individual motives vary. The game separates military victory from the administrative durability of the settlement.',
    options: [
      { id: 'recorded-demobilization', label: 'Demobilize through recorded grants and ordinary trials', detail: 'Survey veteran grants, hear title claims, and prosecute named offenses in ordinary forms, accepting cost, delay, and continued political opposition.', impacts: { resources: { treasury: -7, grain: -3 }, metrics: { order: 4, readiness: -2 }, strain: { demobilizationCapacity: 15, landTitleDisputes: -8, courtCapacity: 9, archiveIntegrity: 7, emergencyPowersPrecedent: -5, commanderPersonalLoyalty: -5 }, flags: { sullanSettlement: 'recorded-demobilization' } } },
      { id: 'proscription-and-colonies', label: 'Use proscription, confiscation, and veteran colonies', detail: 'Finance victory and settle soldiers through seizure under concentrated authority, gaining immediate compliance while multiplying title disputes and personal military obligation.', impacts: { resources: { treasury: 10, grain: 3 }, metrics: { order: -4, readiness: 7 }, strain: { demobilizationCapacity: 10, landTitleDisputes: 19, courtCapacity: -9, archiveIntegrity: -6, emergencyPowersPrecedent: 17, commanderPersonalLoyalty: 15, streetViolence: 10 }, flags: { sullanSettlement: 'proscription-colonies' } } },
      { id: 'temporary-dictatorship', label: 'Authorize a temporary dictatorship with mixed courts', detail: 'Permit concentrated reconstruction for a fixed term while preserving tribunes, municipal appeals, and mixed juries as checks on confiscation.', impacts: { resources: { treasury: -2 }, metrics: { order: 6, readiness: 4 }, strain: { senateCommandControl: 5, emergencyPowersPrecedent: 7, courtCapacity: 7, archiveIntegrity: 5, streetViolence: -3, demobilizationCapacity: 7 }, flags: { sullanSettlement: 'bounded-dictatorship' } } },
    ],
  },
  {
    turn: 46, id: 'archives-and-courts', title: 'Archives, Courts, and the Post-Sullan City', speaker: 'Censors, quaestors, praetors, scribes, jurists, contractors, and municipal petitioners',
    prompt: 'Confiscations, new citizens, provincial accounts, and revised courts have outgrown scattered records. What should anchor legal continuity?',
    context: 'The structure commonly called the Tabularium is traditionally dated to 78 BC, though the ancient name and use of every part remain debated. Its monumental substructure securely represents the growing physical demands of records, accounts, and the Capitoline-Forum connection.',
    options: [
      { id: 'public-archive-system', label: 'Build a guarded public archive and copying system', detail: 'Unify accounts, laws, treaties, and title copies under controlled access while preserving municipal and magistrate duplicates.', impacts: { resources: { treasury: -6, stone: -3 }, metrics: { order: 5, trade: 2 }, strain: { archiveIntegrity: 16, courtCapacity: 10, landTitleDisputes: -7, emergencyPowersPrecedent: -3 }, flags: { archiveSettlement: 'public-system' } } },
      { id: 'patronal-legal-halls', label: 'License patronal halls to carry hearings and copies', detail: 'Expand capacity quickly through leading houses and advocates, leaving access and preservation dependent on private networks.', impacts: { resources: { treasury: -2, stone: -1 }, metrics: { trade: 5 }, strain: { courtCapacity: 9, archiveIntegrity: 3, popularConsentChannels: -5, commanderPersonalLoyalty: 3, streetViolence: 2 }, metropolitan: { patronageConcentration: 7 }, flags: { archiveSettlement: 'patronal-halls' } } },
      { id: 'magistrate-custody', label: 'Keep separate records under annual magistrates', detail: 'Avoid a costly central project and preserve office autonomy, accepting uneven copying, transfer loss, and weaker title verification.', impacts: { resources: { treasury: 3 }, metrics: { order: -2 }, strain: { archiveIntegrity: -9, courtCapacity: -4, landTitleDisputes: 7, senateCommandControl: 2 }, flags: { archiveSettlement: 'magistrate-custody' } } },
    ],
  },
  {
    turn: 47, id: 'city-of-assemblies', title: 'The City of Assemblies', speaker: 'Consuls, tribunes, senators, jurists, neighborhood leaders, merchants, and watch officers',
    prompt: 'Elections, trials, debt, grain, and allegations of conspiracy draw crowds into narrow routes. How should the city preserve public business without surrendering it to armed clients?',
    context: 'Late republican political violence involved officeholders, associations, patrons, crowds, courts, and armed followers in changing combinations. Later speeches and histories are indispensable but partisan; no faction possessed a neutral transcript of the city.',
    options: [
      { id: 'open-routes-and-trials', label: 'Protect open routes, posted meetings, and ordinary trials', detail: 'Fund watch stations and crowd routes while keeping arrests and prosecutions within reviewable forms.', impacts: { resources: { treasury: -5, timber: -2 }, metrics: { order: 6, trade: 2 }, strain: { streetViolence: -12, popularConsentChannels: 10, courtCapacity: 7, urbanFireResponse: 7, emergencyPowersPrecedent: -3 }, flags: { assemblySettlement: 'open-routes' } } },
      { id: 'licensed-associations', label: 'License associations under named patrons', detail: 'Use organized neighborhood and occupational groups to manage crowds and provision, accepting stronger patronal command over attendance.', impacts: { resources: { treasury: -2, grain: 2 }, metrics: { order: 2, food: 3 }, strain: { streetViolence: -3, popularConsentChannels: 4, commanderPersonalLoyalty: 6, emergencyPowersPrecedent: 3, urbanFireResponse: 2 }, metropolitan: { patronageConcentration: 6 }, flags: { assemblySettlement: 'licensed-associations' } } },
      { id: 'emergency-curfew', label: 'Impose emergency curfew and magistrate detention', detail: 'Clear the civic core quickly under extraordinary authority, reducing immediate crowds while weakening ordinary consent and legal review.', impacts: { resources: { treasury: -3 }, metrics: { order: 5, trade: -4 }, strain: { streetViolence: -5, popularConsentChannels: -13, courtCapacity: -7, emergencyPowersPrecedent: 13, senateCommandControl: 3 }, flags: { assemblySettlement: 'emergency-curfew' } } },
    ],
  },
  {
    turn: 48, id: 'command-at-the-rubicon', title: 'Command at the Italian Boundary', speaker: 'Consuls, senators, tribunes, Caesarian and Pompeian envoys, veteran officers, treasury officials, and Italian municipal delegates',
    prompt: 'A provincial command approaches its legal end while rival forces and ultimatums narrow the room for settlement. What rule should govern the return of armies to civic authority?',
    context: 'Caesar\'s crossing in 49 BC followed years of competition over commands, prosecution risk, elections, provincial settlements, and the standing of Pompey. Caesar, Cicero, Appian, Plutarch, and Cassius Dio preserve incompatible perspectives; the campaign stops before resolving the civil war.',
    options: [
      { id: 'mutual-disarmament', label: 'Require mutual disarmament and a mediated return', detail: 'Set dates for relinquishing commands, guarantee lawful candidacy and trial, and place demobilization under mixed senatorial, tribunician, and municipal witnesses.', impacts: { resources: { treasury: -6, grain: -2 }, metrics: { order: 7, readiness: -3 }, strain: { commanderPersonalLoyalty: -13, senateCommandControl: 11, emergencyPowersPrecedent: -8, demobilizationCapacity: 12, popularConsentChannels: 6, streetViolence: -5 }, flags: { rubiconSettlement: 'mutual-disarmament' } } },
      { id: 'senatorial-ultimatum', label: 'Issue the senatorial ultimatum and prepare Italy', detail: 'Demand immediate surrender of the disputed command and mobilize under the Senate, defending formal authority while risking that soldiers follow their commander across the boundary.', impacts: { resources: { treasury: -5, grain: -4 }, metrics: { readiness: 8, order: -5 }, strain: { senateCommandControl: 5, commanderPersonalLoyalty: 10, emergencyPowersPrecedent: 9, demobilizationCapacity: -6, streetViolence: 7 }, flags: { rubiconSettlement: 'senatorial-ultimatum' } } },
      { id: 'single-restoring-command', label: 'Authorize one restoring command over Italy', detail: 'Concentrate force in the leader judged most capable of preventing wider war, accepting that constitutional settlement now depends on personal obedience.', impacts: { resources: { treasury: -3, grain: -3 }, metrics: { readiness: 10, order: 1 }, strain: { senateCommandControl: -11, commanderPersonalLoyalty: 17, emergencyPowersPrecedent: 15, demobilizationCapacity: -8, popularConsentChannels: -5 }, flags: { rubiconSettlement: 'restoring-command' } } },
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

COUNCILS.push(
  {
    turn: 49, id: 'caesars-emergency', title: 'Caesar\'s Emergency', speaker: 'Consuls, senators, tribunes, Caesarian and Pompeian officers, municipal delegates, creditors, and grain officers',
    prompt: 'The disputed command has crossed into Italy. Which authority can end competing mobilizations without making victory itself the only law?',
    context: 'Caesar\'s own account is an argument by a participant; Cicero\'s correspondence exposes uncertainty and divided loyalties; later narratives impose clearer designs than contemporaries possessed. The game treats civil war as a failure of demobilization, command, credit, and enforceable guarantees rather than one dramatic gesture alone.',
    options: [
      { id: 'mediated-mutual-standdown', label: 'Offer a mediated mutual stand-down', detail: 'Guarantee candidacy and trial, appoint mixed witnesses, and demobilize both Italian concentrations under dated terms, accepting delay and the risk that neither commander trusts the process.', impacts: { resources: { treasury: -5, grain: -2 }, metrics: { order: 4, readiness: -3 }, settlement: { unifiedCommand: 4, senateOperatingCapacity: 8, magistrateContinuity: 9, armyDemobilization: 12, emergencyAuthority: -7, successionClarity: 4 }, flags: { caesarianEmergency: 'mediated-standdown' } } },
      { id: 'senatorial-war-command', label: 'Mobilize Italy under senatorial command', detail: 'Defend the ultimatum through consular and Pompeian forces, preserving the formal claim of the Senate while accepting divided command, rapid expenditure, and uncertain municipal obedience.', impacts: { resources: { treasury: -7, grain: -4 }, metrics: { readiness: 8, order: -6 }, settlement: { unifiedCommand: -5, senateOperatingCapacity: 5, magistrateContinuity: 2, armyDemobilization: -7, warFinanceBurden: 9, veteranSettlementPressure: 6, emergencyAuthority: 7 }, flags: { caesarianEmergency: 'senatorial-war' } } },
      { id: 'caesarian-concentration', label: 'Recognize Caesar\'s restoring command', detail: 'Concentrate military, fiscal, and appointment power long enough to break rival armies, gaining decision at the cost of making institutional recovery depend on one victorious commander.', impacts: { resources: { treasury: -4, grain: -3 }, metrics: { readiness: 10, order: 1 }, settlement: { unifiedCommand: 18, senateOperatingCapacity: -9, magistrateContinuity: -7, armyDemobilization: 2, emergencyAuthority: 16, personalMonumentalCredit: 5, successionClarity: -4 }, flags: { caesarianEmergency: 'caesarian-command' } } },
    ],
  },
  {
    turn: 50, id: 'clearing-civic-core', title: 'Clearing the Civic Core', speaker: 'Praetors, senators, property holders, jurists, contractors, architects, merchants, and displaced households',
    prompt: 'Victory and new courts press against an overloaded Forum. How should the Caesarian civic program acquire land, credit, and operating authority?',
    context: 'The Forum of Caesar and Basilica Julia increased legal and commercial capacity while tying urban change to Caesar\'s wealth, office, lineage, and victory. Archaeology establishes major footprints and phases more securely than it recovers every acquisition or displaced household.',
    options: [
      { id: 'public-board-and-compensation', label: 'Use a public board, recorded purchase, and compensation', detail: 'Acquire a bounded precinct through published accounts and appeals, preserving more title security while slowing clearance and limiting the sponsor\'s control over the finished space.', impacts: { resources: { treasury: -7, stone: -2 }, metrics: { order: 5, trade: 3 }, settlement: { civicOperatingCapacity: 10, courtContinuity: 7, urbanDisplacement: 2, personalMonumentalCredit: 3, italianLandSecurity: 6, warFinanceBurden: 3 }, flags: { civicCoreSettlement: 'public-board' } } },
      { id: 'victor-funded-precinct', label: 'Let the victor fund and direct the precinct', detail: 'Clear quickly with private and war-derived funds, expanding courts and business while placing circulation, dedication, and patronage under one household\'s name.', impacts: { resources: { stone: 4, treasury: 3 }, metrics: { trade: 7, order: 2 }, settlement: { civicOperatingCapacity: 13, courtContinuity: 5, urbanDisplacement: 13, personalMonumentalCredit: 17, warFinanceBurden: -3, senateOperatingCapacity: -3 }, flags: { civicCoreSettlement: 'victor-precinct' } } },
      { id: 'repair-existing-forum', label: 'Repair and disperse existing public business', detail: 'Avoid a grand clearance by strengthening older basilicas, records rooms, and district hearing spaces, preserving continuity but leaving congestion and fragmented administration.', impacts: { resources: { treasury: -4, timber: -2 }, metrics: { order: 4, trade: 2 }, settlement: { civicOperatingCapacity: 5, courtContinuity: 9, urbanDisplacement: -3, personalMonumentalCredit: -5, archiveContinuity: 5 }, flags: { civicCoreSettlement: 'distributed-repair' } } },
    ],
  },
  {
    turn: 51, id: 'after-the-ides', title: 'After the Ides', speaker: 'Consuls, senators, Caesarian officers, veterans, municipal delegates, jurists, creditors, and the urban plebs',
    prompt: 'The dictator is dead, but his appointments, laws, soldiers, debts, and promised settlements remain. What carries lawful continuity through the succession crisis?',
    context: 'Cicero\'s speeches and letters are partisan interventions within the crisis; Nicolaus, Appian, Plutarch, Suetonius, and Dio wrote with different distances and purposes. The assassination removed Caesar without supplying an agreed authority able to settle his army and enactments.',
    options: [
      { id: 'amnesty-and-ratified-acts', label: 'Pair amnesty with review and ratification of acts', detail: 'Recognize existing offices and veteran obligations under a dated senatorial review, seeking continuity without declaring either assassination or dictatorship the permanent rule.', impacts: { resources: { treasury: -4 }, metrics: { order: 6, readiness: -2 }, settlement: { senateOperatingCapacity: 10, magistrateContinuity: 11, successionClarity: 8, courtContinuity: 7, veteranSettlementPressure: -4, emergencyAuthority: -3 }, flags: { idesSettlement: 'amnesty-ratification' } } },
      { id: 'prosecute-assassins', label: 'Prosecute the assassins under a single avenging command', detail: 'Use Caesar\'s appointments, heir, and veteran network to recover unity, gaining military direction while making succession and justice depend upon personal inheritance.', impacts: { resources: { treasury: -5, grain: -2 }, metrics: { readiness: 8, order: -3 }, settlement: { unifiedCommand: 12, senateOperatingCapacity: -6, magistrateContinuity: -5, successionClarity: 3, emergencyAuthority: 10, personalMonumentalCredit: 8, veteranSettlementPressure: 3 }, flags: { idesSettlement: 'avenging-command' } } },
      { id: 'restore-before-caesar', label: 'Void the dictatorship and restore the pre-Caesarian offices', detail: 'Reject the dictator\'s appointments and grants in defense of republican forms, accepting immediate conflict over veterans, provinces, debts, and who lawfully holds office.', impacts: { resources: { treasury: -3 }, metrics: { order: -8, readiness: -4 }, settlement: { senateOperatingCapacity: 8, magistrateContinuity: 4, successionClarity: -10, veteranSettlementPressure: 15, italianLandSecurity: -8, courtContinuity: -4, unifiedCommand: -7 }, flags: { idesSettlement: 'pre-caesarian-restoration' } } },
    ],
  },
  {
    turn: 52, id: 'triumviral-extraction', title: 'Triumviral Extraction', speaker: 'Triumvirs, senators, equestrian creditors, municipal magistrates, veterans, tax assessors, and dispossessed households',
    prompt: 'Three commanders claim emergency authority while armies require pay and land. How should the wars against their enemies be financed and settled?',
    context: 'The triumviral settlement, proscriptions, extraordinary taxes, confiscations, and veteran colonies are broadly attested, while totals and local sequences remain uneven. Immediate military finance and long-term title security moved in opposite directions.',
    options: [
      { id: 'assessed-tax-and-bonds', label: 'Use assessed taxation, bonds, and recorded veteran claims', detail: 'Spread the emergency charge through published assessments and defer part of the settlement under enforceable rolls, accepting slower mobilization and heavy public debt.', impacts: { resources: { treasury: 4, grain: -2 }, metrics: { order: 2, trade: -2 }, settlement: { warFinanceBurden: 8, confiscationPressure: -6, italianLandSecurity: 7, archiveContinuity: 8, veteranSettlementPressure: 4, courtContinuity: 4 }, flags: { triumviralFinance: 'assessed-finance' } } },
      { id: 'proscription-and-confiscation', label: 'Finance war through proscription and confiscation', detail: 'Seize wealth and Italian land to pay armies quickly, gaining command capacity while multiplying title disputes, fear, private denunciation, and dependence on the triumvirs.', impacts: { resources: { treasury: 13, grain: 4 }, metrics: { readiness: 8, order: -10 }, settlement: { unifiedCommand: 7, warFinanceBurden: -7, confiscationPressure: 21, italianLandSecurity: -17, courtContinuity: -12, archiveContinuity: -7, veteranSettlementPressure: -7, emergencyAuthority: 13 }, flags: { triumviralFinance: 'proscription-confiscation' } } },
      { id: 'separate-command-zones', label: 'Divide provinces and finance among separate commands', detail: 'Let each commander raise revenue and settle his own forces, reducing one central proscription machinery while institutionalizing rival armies and incompatible accounts.', impacts: { resources: { treasury: 7 }, metrics: { readiness: 5, order: -6 }, settlement: { unifiedCommand: -13, warFinanceBurden: 5, confiscationPressure: 8, archiveContinuity: -5, successionClarity: -8, provincialCommandSettlement: -9, veteranSettlementPressure: 7 }, flags: { triumviralFinance: 'separate-zones' } } },
    ],
  },
  {
    turn: 53, id: 'actium-and-demobilization', title: 'Actium and Demobilization', speaker: 'Octavian and Antonian envoys, senators, naval officers, veterans, provincial delegates, treasury officers, and Italian municipal magistrates',
    prompt: 'The last rival commands meet with fleets, provinces, client rulers, debts, and promised land behind them. What settlement should follow military decision?',
    context: 'Actium in 31 BC was both a naval campaign and the terminal struggle between command systems assembled over years. Augustan representation later made the victory appear more inevitable and foreign than the preceding Roman civil conflict had been.',
    options: [
      { id: 'victory-with-recorded-demobilization', label: 'Win, then demobilize through recorded grants and cash', detail: 'Concentrate the final campaign but bind discharge, land, cash, and provincial transfers to published rolls and staged settlement.', impacts: { resources: { treasury: -8, grain: -3 }, metrics: { readiness: 6, order: 6 }, settlement: { unifiedCommand: 10, armyDemobilization: 18, veteranSettlementPressure: -15, italianLandSecurity: 12, warFinanceBurden: 7, provincialCommandSettlement: 10, archiveContinuity: 6 }, flags: { actiumSettlement: 'recorded-demobilization' } } },
      { id: 'negotiated-dual-withdrawal', label: 'Negotiate dual withdrawal and provincial arbitration', detail: 'Trade recognition and retirement for synchronized demobilization, preserving more shared authority while risking that unresolved fleets and client networks revive the war.', impacts: { resources: { treasury: -5 }, metrics: { order: 5, readiness: -5 }, settlement: { unifiedCommand: -2, senateOperatingCapacity: 8, magistrateContinuity: 7, armyDemobilization: 11, veteranSettlementPressure: -7, successionClarity: 3, provincialCommandSettlement: 7, emergencyAuthority: -5 }, flags: { actiumSettlement: 'dual-withdrawal' } } },
      { id: 'victor-keeps-armies', label: 'Keep the victorious armies under one permanent command', detail: 'Use disciplined force to secure provinces and Italy after Actium, suppressing renewed war while leaving civil order and succession dependent on the commander\'s military household.', impacts: { resources: { treasury: -3, grain: -4 }, metrics: { readiness: 10, order: 3 }, settlement: { unifiedCommand: 18, armyDemobilization: -9, veteranSettlementPressure: 8, senateOperatingCapacity: -7, magistrateContinuity: -5, emergencyAuthority: 15, successionClarity: -5, provincialCommandSettlement: 12 }, flags: { actiumSettlement: 'permanent-command' } } },
    ],
  },
  {
    turn: 54, id: 'settlement-of-27', title: 'The Settlement of 27 BC', speaker: 'The victorious commander, consuls, senators, magistrates, provincial delegates, veterans, jurists, treasury officers, and grain administrators',
    prompt: 'Civil war has ended. Which arrangement can assign provinces, armies, offices, provision, courts, and succession without relying upon constitutional names alone?',
    context: 'The arrangements of 27 and 23 BC developed over time. Augustus\'s later account emphasizes restoration; Cassius Dio supplies a much later constitutional narrative; inscriptions, coins, offices, commands, and administrative practice reveal how authority actually operated.',
    options: [
      { id: 'augustan-principate', label: 'Create a princeps settlement with divided provinces', detail: 'Restore annual offices and senatorial business while granting the victor a large provincial command, military loyalty, fiscal capacity, and public obligations under republican forms.', impacts: { resources: { treasury: -5, grain: 3 }, metrics: { order: 8, readiness: 6, food: 3 }, settlement: { unifiedCommand: 11, senateOperatingCapacity: 8, magistrateContinuity: 9, armyDemobilization: 8, emergencyAuthority: 2, provincialCommandSettlement: 14, publicProvision: 10, successionClarity: 12, personalMonumentalCredit: 8 }, flags: { constitutionalSettlement: 'augustan-principate' } } },
      { id: 'negotiated-republican-restoration', label: 'Restore commands to elected offices under enforceable limits', detail: 'Return armies and provinces to dated magistracies, preserve the victor\'s honors and security, and strengthen Senate, courts, and public accounts, accepting weaker immediate unity and difficult succession bargains.', impacts: { resources: { treasury: -7 }, metrics: { order: 6, readiness: -2 }, settlement: { unifiedCommand: -5, senateOperatingCapacity: 16, magistrateContinuity: 16, armyDemobilization: 13, emergencyAuthority: -13, provincialCommandSettlement: 7, courtContinuity: 9, successionClarity: 7, personalMonumentalCredit: -5 }, flags: { constitutionalSettlement: 'republican-restoration' } } },
      { id: 'collegial-military-settlement', label: 'Formalize a collegial military settlement', detail: 'Distribute provinces and army groups among several senior commanders under a common council, avoiding one princeps while accepting continuing military bargaining and uncertain civilian control.', impacts: { resources: { treasury: -3, stone: 2 }, metrics: { readiness: 8, order: -2 }, settlement: { unifiedCommand: 4, senateOperatingCapacity: 2, magistrateContinuity: 1, armyDemobilization: 4, emergencyAuthority: 4, provincialCommandSettlement: 8, successionClarity: 6, veteranSettlementPressure: -2 }, flags: { constitutionalSettlement: 'military-oligarchy' } } },
    ],
  },
)

COUNCILS.push(
  { turn: 71, id: 'nerva-army-adoption', title: 'Nerva, the Army, and Recorded Adoption', speaker: 'Senators, legionary envoys, Praetorian officers, jurists, and household witnesses', prompt: 'How shall the new princeps bind army recognition, Senate record, and succession?', context: 'Nerva was made princeps after Domitian, and the adoption of Trajan is securely associated with the settlement of the succession, though the private negotiations, timing, and weight of each constituency are not fully recoverable. The decision concerns commands, oaths, records, and the dignity of offices.', options: [
    { id: 'recorded-adoption', label: 'Record adoption before Senate and army', detail: 'Publish the adoption, renew commands, and place the transfer before witnesses whose records can be cited after the princeps is gone.', impacts: { resources: { treasury: -3 }, metrics: { order: 5, readiness: 3 }, trajanic: { successionSettlement: 16, frontierCommand: 6, constitutionalContinuity: 8, provincialTrust: 4 }, flags: { trajanicSuccession: 'recorded-adoption' } } },
    { id: 'army-first-recognition', label: 'Secure the armies before the record', detail: 'Carry recognition through commanders and oaths first, accepting that the Senate and provincial communities will read the settlement after force has spoken.', impacts: { resources: { treasury: -1, grain: -1 }, metrics: { readiness: 8, order: -2 }, trajanic: { successionSettlement: 9, frontierCommand: 12, constitutionalContinuity: -5, provincialTrust: -2 }, flags: { trajanicSuccession: 'army-first-recognition' } } },
    { id: 'senate-guarded-transfer', label: 'Make Senate consent the hinge', detail: 'Require senatorial forms, dated appointments, and guarded oaths before accepting the adopted heir, trading speed for constitutional visibility.', impacts: { resources: { treasury: -4 }, metrics: { order: 7, readiness: -2 }, trajanic: { successionSettlement: 12, frontierCommand: 2, constitutionalContinuity: 14, provincialTrust: 3 }, flags: { trajanicSuccession: 'senate-guarded-transfer' } } },
  ] },
  { turn: 72, id: 'dacian-war-revenue', title: 'Dacian War, Frontier Commitments, and Veterans', speaker: 'Commanders, veterans, treasury officers, senators, provincial envoys, and grain contractors', prompt: 'How shall conquest, frontier service, veterans, and revenue be ordered?', context: 'Trajan’s Dacian wars are attested by coinage, literary accounts, monuments, and the Column, but the complete financial sequence and every veteran settlement are not preserved. Frontier commitments require pay, roads, supply, and commands while conquered revenue and spoils invite competing dispositions.', options: [
    { id: 'frontier-and-veteran-rolls', label: 'Fund frontier rolls and veteran settlements', detail: 'Keep the new command supplied and enter veterans on dated rolls, reserving revenue for discharge, roads, and garrisons.', impacts: { resources: { treasury: -5, grain: -2 }, metrics: { readiness: 7, order: 4 }, trajanic: { frontierCommand: 14, successionSettlement: 3, treasuryResilience: -3, provincialTrust: 7, conquestDependence: -5 }, flags: { dacianRevenue: 'frontier-veteran-rolls' } } },
    { id: 'conquest-treasury', label: 'Send conquest revenue to the treasury', detail: 'Make receipts and spoils replenish the central account before enlarging settlements, accepting delayed claims and continued dependence upon victory.', impacts: { resources: { treasury: 10, grain: 2 }, metrics: { readiness: 3, order: -2 }, trajanic: { frontierCommand: 7, treasuryResilience: 15, conquestDependence: 12, provincialTrust: -4, maintenanceDebt: 3 }, flags: { dacianRevenue: 'central-treasury' } } },
    { id: 'provincial-disposition', label: 'Settle revenue through provincial offices', detail: 'Leave a measured share with roads, communities, and veteran boards under inspection, slowing central receipts while strengthening local obligations.', impacts: { resources: { treasury: 3, stone: 2 }, metrics: { trade: 4, order: 3 }, trajanic: { frontierCommand: 8, treasuryResilience: 6, provincialTrust: 14, conquestDependence: -7, administrativeCapacity: 5 }, flags: { dacianRevenue: 'provincial-disposition' } } },
  ] },
  { turn: 73, id: 'quirinal-forum-program', title: 'Quirinal Excavation and the New Forum', speaker: 'Architects, senators, clerks, landholders, veterans, builders, and petitioners', prompt: 'What order shall govern the excavation and integrated forum program?', context: 'The Forum of Trajan, Basilica Ulpia, libraries, and Column are securely associated with the imperial capital, while the precise acquisition, excavation, and construction sequence is less certain. The Quirinal ground, administrative business, commemorative language, and public circulation must be made to answer together.', options: [
    { id: 'integrated-forum-program', label: 'Excavate and build the integrated precinct', detail: 'Join the forum, basilica, libraries, and Column under one surveyed program, recording land, retaining work, offices, and ceremonial access.', impacts: { resources: { treasury: -7, stone: -4 }, metrics: { order: 6, trade: 4 }, trajanic: { administrativeCapacity: 14, capitalSupply: 7, constitutionalContinuity: 6, maintenanceDebt: 3 }, flags: { quirinalProgram: 'integrated-precinct' } } },
    { id: 'administrative-first', label: 'Raise offices and archives first', detail: 'Secure courts, records, and controlled routes before the commemorative works, preserving capacity while postponing the fullest visual claim.', impacts: { resources: { treasury: -4, stone: -2 }, metrics: { order: 8 }, trajanic: { administrativeCapacity: 16, provincialTrust: 4, constitutionalContinuity: 8, capitalSupply: 3 }, flags: { quirinalProgram: 'administrative-first' } } },
    { id: 'monumental-dedication', label: 'Make the Column and memory the hinge', detail: 'Let victory, relief, and dynastic memory organize the excavation, accepting that offices and public routes will remain dependent on the finished precinct.', impacts: { resources: { treasury: -6, stone: -5 }, metrics: { auspices: 8, order: 2 }, trajanic: { administrativeCapacity: 5, capitalSupply: 5, constitutionalContinuity: 10, maintenanceDebt: 5 }, flags: { quirinalProgram: 'monumental-dedication' } } },
  ] },
  { turn: 74, id: 'baths-domus-aurea-conversion', title: 'Baths of Trajan and the Buried Palace', speaker: 'Water officers, furnace keepers, builders, household agents, senators, and neighborhood delegates', prompt: 'How shall the Domus Aurea ground be converted while bearing water, fuel, staff, and repair?', context: 'The Baths of Trajan occupied ground associated with Nero’s Domus Aurea, and the surviving remains support a major public bathing establishment; the precise treatment of buried rooms, water arrangements, and Sette Sale service is not completely preserved. Conversion therefore creates operating burdens as well as public provision.', options: [
    { id: 'public-conversion', label: 'Convert and bury the palace fabric', detail: 'Lay the baths over the former palace ground, retain useful cistern and storage arrangements, and charge fuel, attendants, water, and maintenance to public accounts.', impacts: { resources: { treasury: -6, stone: -4 }, metrics: { water: 6, sanitation: 8 }, trajanic: { publicProvision: 14, capitalSupply: 4, maintenanceCapacity: -4, maintenanceDebt: 3 }, flags: { domusAureaConversion: 'public-baths' } } },
    { id: 'service-before-splendor', label: 'Secure cisterns and Sette Sale first', detail: 'Build the water, storage, furnace, and staff foundation before opening grand halls, accepting a slower dedication and clearer recurring burden.', impacts: { resources: { treasury: -5, stone: -3, timber: -1 }, metrics: { water: 9, sanitation: 5 }, trajanic: { publicProvision: 10, capitalSupply: 7, maintenanceCapacity: -2, maintenanceDebt: 1 }, flags: { domusAureaConversion: 'service-first' } } },
    { id: 'restricted-operation', label: 'Open a smaller supervised bath', detail: 'Limit the first operating establishment to manageable water, fuel, staff, and cleaning accounts while leaving parts of the palace ground buried and unused.', impacts: { resources: { treasury: -3, stone: -2 }, metrics: { sanitation: 4, order: 3 }, trajanic: { publicProvision: 7, capitalSupply: 2, maintenanceCapacity: 2, maintenanceDebt: -2 }, flags: { domusAureaConversion: 'restricted-operation' } } },
  ] },
  { turn: 75, id: 'aqua-portus-grain', title: 'Aqua Traiana, Portus, and the Tiber Transfer', speaker: 'Aquarii, harbor prefects, grain officers, boatmen, engineers, and provincial merchants', prompt: 'How shall water, the inner basin, grain, and flood resilience be joined?', context: 'Trajanic works at the water supply and Portus are known through remains, inscriptions, literary evidence, and later changes, but exact routes and operating arrangements are not wholly recoverable. The hexagonal inner basin was added to the retained Claudian harbor, while Tiber transfer and flood risk remained practical burdens.', options: [
    { id: 'distributed-supply-and-basin', label: 'Join distributed water to the inner basin', detail: 'Fund capture, conduits, reservoirs, quays, transfer craft, grain stores, and flood banks as one inspected supply chain.', impacts: { resources: { treasury: -8, stone: -5, timber: -2 }, metrics: { water: 8, food: 8, trade: 6 }, trajanic: { capitalSupply: 16, publicProvision: 13, provincialTrust: 7, maintenanceCapacity: -4, maintenanceDebt: 4 }, flags: { waterPortusProgram: 'joined-supply' } } },
    { id: 'grain-first-portus', label: 'Put grain transfer before new water', detail: 'Add the hexagonal basin, warehouses, and Tiber handling to the Claudian harbor first, accepting that district water will wait.', impacts: { resources: { treasury: -7, stone: -5, timber: -3 }, metrics: { food: 10, trade: 8 }, trajanic: { capitalSupply: 15, publicProvision: 12, provincialTrust: 5, maintenanceCapacity: -3, maintenanceDebt: 3 }, flags: { waterPortusProgram: 'grain-first' } } },
    { id: 'water-first-resilience', label: 'Secure sources and flood defenses first', detail: 'Lay the distributed capture and conduit system and strengthen banks before enlarging transfer, preserving resilience at the cost of slower grain throughput.', impacts: { resources: { treasury: -6, stone: -4 }, metrics: { water: 12, sanitation: 5 }, trajanic: { capitalSupply: 9, publicProvision: 9, provincialTrust: 6, maintenanceCapacity: -2, maintenanceDebt: 1 }, flags: { waterPortusProgram: 'water-first' } } },
  ] },
  { turn: 76, id: 'ad-117-settlement', title: 'The Frontier and the Settlement of AD 117', speaker: 'The princeps, Senate, commanders, treasury officers, provincial envoys, maintenance crews, and city delegates', prompt: 'What settlement shall carry the frontier, treasury, succession, provinces, and works beyond AD 117?', context: 'Trajan died in AD 117 after a reign marked by frontier expansion and extensive building. The exact succession arrangements and financial condition are debated in ancient and modern records; the game records uncertainty while asking how commands, treasury, provincial trust, maintenance, and constitutional continuity should be left.', options: [
    { id: 'constitutional-settlement', label: 'Record a constitutional and succession settlement', detail: 'Publish commands, succession terms, provincial obligations, maintenance accounts, and Senate forms before the frontier consumes the transfer.', impacts: { resources: { treasury: -5 }, metrics: { order: 7, readiness: 2 }, trajanic: { successionSettlement: 15, frontierCommand: 5, treasuryResilience: 5, provincialTrust: 9, maintenanceCapacity: 4, constitutionalContinuity: 16 }, flags: { ad117Settlement: 'constitutional-record' } } },
    { id: 'frontier-and-treasury', label: 'Hold the frontier and treasury first', detail: 'Preserve commands, reserves, and supply routes under the existing authority, accepting that succession and constitutional form will follow the immediate necessity.', impacts: { resources: { treasury: 5, grain: -2 }, metrics: { readiness: 8, order: -2 }, trajanic: { successionSettlement: 6, frontierCommand: 14, treasuryResilience: 12, provincialTrust: 2, maintenanceCapacity: -3, conquestDependence: 8, constitutionalContinuity: -4 }, flags: { ad117Settlement: 'frontier-treasury' } } },
    { id: 'provincial-trust-and-maintenance', label: 'Bind provinces and works to the settlement', detail: 'Leave inspectable shares for provincial communities and maintenance crews, reducing immediate central receipts while making the inherited capital more carryable.', impacts: { resources: { treasury: -3, stone: 1 }, metrics: { trade: 4, order: 4 }, trajanic: { successionSettlement: 10, frontierCommand: 5, treasuryResilience: 4, provincialTrust: 16, maintenanceCapacity: 10, maintenanceDebt: -6, constitutionalContinuity: 9 }, flags: { ad117Settlement: 'provincial-maintenance' } } },
  ] },
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
  { from: 42, to: 42, text: 'Decide which land, grain, and appeal machinery should survive the Gracchan conflicts.' },
  { from: 43, to: 43, text: 'Turn Italian citizenship claims into an administrable settlement before war decides them.' },
  { from: 44, to: 44, text: 'Keep military command from becoming the final court of domestic politics.' },
  { from: 45, to: 45, text: 'Settle victory, veterans, courts, and land titles without making confiscation the constitution.' },
  { from: 46, to: 46, text: 'Give laws, accounts, and titles physical continuity in the post-Sullan city.' },
  { from: 47, to: 47, text: 'Preserve assemblies and trials amid crowding, patronage, and armed political competition.' },
  { from: 48, to: 48, text: 'Judge whether armies can return to civic authority before civil war becomes the settlement.' },
  { from: 49, to: 49, text: 'End competing mobilizations without making military victory the only source of law.' },
  { from: 50, to: 50, text: 'Expand civic capacity without hiding displacement, patronage, or the source of construction credit.' },
  { from: 51, to: 51, text: 'Carry offices, laws, veterans, and debts through the succession crisis after Caesar.' },
  { from: 52, to: 52, text: 'Finance the triumviral wars without allowing confiscation to consume Italian title security.' },
  { from: 53, to: 53, text: 'Turn final military victory into demobilization, provincial settlement, and enforceable accounts.' },
  { from: 54, to: 54, text: 'Judge operating authority in 27 BC separately from the constitutional language used to describe it.' },
  { from: 55, to: 55, text: 'Turn the settlement into an operating system without allowing command to consume every civic channel.' },
  { from: 56, to: 56, text: 'Decide whether Agrippa\'s public services become institutions, benefactions, or district compacts.' },
  { from: 57, to: 57, text: 'Make succession legible without pretending the ruling household and ordinary office are the same thing.' },
  { from: 58, to: 58, text: 'Connect the language of peace to reviewed provincial command and enforceable obligations.' },
  { from: 59, to: 59, text: 'Make monumental memory serve courts and civic access as well as the ruling household.' },
  { from: 60, to: 60, text: 'Build fire response as an operating service with command, equipment, routes, and recurring cost.' },
  { from: 61, to: 61, text: 'Test whether authority, services, provinces, and succession can survive the founder.' },
  { from: 62, to: 62, text: 'Transfer authority without allowing guard recognition to become the whole constitution.' },
  { from: 63, to: 63, text: 'Place guard, Senate, household, and urban administration within one legible operating order.' },
  { from: 64, to: 64, text: 'Expand water and harbor capacity without hiding contracts, maintenance, or provincial supply.' },
  { from: 65, to: 65, text: 'Make court spending and public credit visible before popularity becomes a substitute for accounts.' },
  { from: 66, to: 66, text: 'Rebuild after the fire without surrendering the city to either private claims or palace land.' },
  { from: 67, to: 67, text: 'Restore recognized rule after civil war and decide what becomes public again.' },
  { from: 68, to: 68, text: 'Turn victory into provision, public access, and maintainable works rather than display alone.' },
  { from: 69, to: 69, text: 'Open the Flavian Amphitheatre while funding crowd routes, safety, service, and future substructures.' },
  { from: 70, to: 70, text: 'Judge what survives the palace and ruler at the succession of AD 96.' },
  { from: 71, to: 71, text: 'Bind succession, Senate record, and army recognition without making any one constituency the whole settlement.' },
  { from: 72, to: 72, text: 'Disposition Dacian revenue among frontier command, veterans, treasury resilience, and provincial obligations.' },
  { from: 73, to: 73, text: 'Excavate and govern the integrated Forum of Trajan program without allowing commemoration to displace administration.' },
  { from: 74, to: 74, text: 'Convert imperial ground into public baths while accounting for water, fuel, staff, cisterns, and buried fabric.' },
  { from: 75, to: 75, text: 'Join Aqua Traiana, the added Portus basin, Tiber transfer, grain stores, and flood defense into one supply system.' },
  { from: 76, to: 76, text: 'Leave AD 117 with frontier, succession, treasury, provinces, maintenance, and constitutional practice still operable.' },
]

export const getCouncil = (turn) => COUNCILS.find((item) => item.turn === turn) ?? null
export const getDistrict = (id) => DISTRICTS.find((item) => item.id === id)
export const getFamily = (id) => BUILDING_FAMILIES.find((item) => item.id === id)
export const getTier = (familyId, era) => getFamily(familyId)?.tiers.filter((item) => item.era <= era).at(-1)
export const getObjective = (turn) => OBJECTIVES.find((item) => turn >= item.from && turn <= item.to)?.text ?? ''

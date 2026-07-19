export const HISTORICAL_NOTES = [
  {
    id: 'foundation', title: '753 BC and the Foundation Tradition', category: 'Roman tradition', turns: [1, 2],
    text: 'Roman authors fixed the city\'s foundation in 753 BC and told stories of Romulus, Remus, asylum, and union with the Sabines. These accounts reveal how later Romans explained authority and civic incorporation; they are not a modern eyewitness chronology.',
    evidence: 'Livy, Ab Urbe Condita 1; Dionysius of Halicarnassus, Roman Antiquities 1-2.',
  },
  {
    id: 'hills', title: 'Settlements on the Hills', category: 'Archaeology', turns: [1, 2, 3],
    text: 'Material remains support occupation on several hills before a unified monumental center emerged. The game therefore begins with communities that can cooperate without behaving like a finished state.',
    evidence: 'Hut remains, burials, ceramics, and settlement sequences from the Palatine and surrounding hills.',
  },
  {
    id: 'tiber', title: 'The River, Ford, and Salt Routes', category: 'Historical inference', turns: [3, 4],
    text: 'Rome\'s position linked a practical Tiber crossing with inland and coastal exchange. The exact administration of the earliest crossing is unknown, so the toll choices are a model of plausible incentives rather than a claimed event.',
    evidence: 'Topography, regional exchange patterns, and later traditions concerning the Pons Sublicius and salt road.',
  },
  {
    id: 'forum', title: 'Making the Forum Valley', category: 'Archaeology', turns: [4, 5, 6],
    text: 'Drainage and filling changed low, wet ground between the hills into common civic space. Ancient tradition credited kings with major works; modern dating of individual phases remains contested.',
    evidence: 'Stratigraphy and drainage works in the Forum valley; Livy 1.38 and 1.56 for the royal tradition.',
  },
  {
    id: 'etruria', title: 'Rome and Etruria', category: 'Complexity', turns: [6, 7, 8],
    text: 'Rome did not develop in isolation. Techniques, objects, symbols, and people moved among Latin, Sabine, Etruscan, and Greek communities. Borrowing could increase royal power while also creating local skill.',
    evidence: 'Archaeological exchange and ancient accounts of the Tarquins; specific ethnic labels in early Rome remain difficult to reconstruct.',
  },
  {
    id: 'army', title: 'Households and the Levy', category: 'Historical inference', turns: [8],
    text: 'Early defense depended on households able to equip and sustain men. Fortification without food or labor therefore weakens readiness in the simulation instead of functioning as a free military bonus.',
    evidence: 'Later Roman institutions and comparative evidence illuminate obligations, but details before the Republic are uncertain.',
  },
  {
    id: 'jupiter', title: 'Jupiter Above the City', category: 'Roman tradition + archaeology', turns: [9, 10],
    text: 'The Capitoline temple expressed a city larger than any one hill. Tradition placed its planning under the Tarquin kings and its dedication at the Republic\'s beginning, making it both a royal project and a republican inheritance.',
    evidence: 'Livy 1.55-56 and 2.8; Capitoline foundations and architectural evidence.',
  },
  {
    id: 'republic-foundation', title: '509 BC and the First Magistrates', category: 'Roman tradition + institutional inference', turns: [11],
    text: 'Roman memory fixed the fall of the Tarquins and first consuls in 509 BC. Annual colleagues, appeal, and aversion to kingship became central republican principles, but the earliest offices likely developed less neatly than later lists imply.',
    evidence: 'Livy 1.58-60 and 2.1-2; Dionysius of Halicarnassus 4-5. The consular fasti preserve tradition but do not remove chronological uncertainty.',
  },
  {
    id: 'senate-republic', title: 'What the Early Senate Did', category: 'Historical inference', turns: [11, 12],
    text: 'The Senate was not a modern representative legislature. It gathered experienced household leaders, preserved counsel and precedent, coordinated finance and cult, received envoys, and gave continuity while annual magistrates changed.',
    evidence: 'Polybius 6 describes a later Republic; Livy and Dionysius preserve earlier traditions. Institutional reconstruction must work backward cautiously.',
  },
  {
    id: 'debt-secession', title: 'Debt, Service, and the First Secession', category: 'Roman tradition + complexity', turns: [12, 13],
    text: 'Ancient narratives linked debt arrears, creditor remedies, and repeated military service. The first secession and tribunes were traditionally dated to 494 BC. The game treats the linkage as a political structure without claiming every speech or episode as literal reportage.',
    evidence: 'Livy 2.23-33; Dionysius of Halicarnassus 6. The later legal vocabulary and dramatic narratives require caution.',
  },
  {
    id: 'saturn-aerarium', title: 'Saturn and the Public Treasury', category: 'Roman tradition', turns: [12, 13],
    text: 'Roman tradition connected the Temple of Saturn with the aerarium, the public treasury. Its game function is continuity: reserves and accounts belong to the res publica rather than to one annual officeholder.',
    evidence: 'Livy 2.21 for the traditional temple chronology; later evidence for the aerarium beneath the Temple of Saturn.',
  },
  {
    id: 'veii-pay', title: 'Veii, Soldier Pay, and the Long Campaign', category: 'Roman tradition + structural inference', turns: [14],
    text: 'Livy connected the introduction of regular pay with service against Veii. His ten-year siege echoes Greek epic and cannot be read as a campaign diary. The underlying problem is credible: operations extending beyond the agricultural season required the community to carry more of the soldier\'s maintenance.',
    evidence: 'Livy 4.59-60 and books 4-5; archaeological evidence for Roman expansion into Veientine territory. Exact dates and institutional sequence remain disputed.',
  },
  {
    id: 'veii-fall', title: 'The Fall and Settlement of Veii', category: 'Roman tradition + archaeology', turns: [15],
    text: 'The capture of Veii enlarged Rome\'s territory and made victory a question of land, people, cult, and public spoil. The game offers several settlements because the later literary drama does not recover one complete administrative decree.',
    evidence: 'Livy 5.1-23; material and territorial evidence from Veii and southern Etruria. Camillus, the tunnel, and the ten-year duration belong to a strongly shaped narrative tradition.',
  },
  {
    id: 'gallic-crisis', title: 'The Allia and the Gallic Crisis', category: 'Conflicting literary traditions', turns: [16],
    text: 'Ancient accounts agree that a Gallic force defeated Rome and entered much of the city, but chronology, scale, ransom, and the extent of destruction are uncertain. This act ends with preparedness rather than a fixed sack so the next act can resolve damage from the city the player actually built.',
    evidence: 'Livy 5.35-55; Polybius 2.18; archaeological arguments about destruction horizons. The traditional date is 390 BC, with 387/386 also proposed.',
  },
  {
    id: 'sack-damage', title: 'What Did the Sack Destroy?', category: 'Literary tradition + archaeological uncertainty', turns: [17],
    text: 'Livy described broad occupation and burning while preserving the Capitoline defense as the center of Roman endurance. Archaeology has not produced a single destruction horizon proving every district burned alike. The game therefore preserves partial successes and distributes damage from preparedness and district exposure.',
    evidence: 'Livy 5.39-55; Diodorus Siculus 14.113-117; archaeological debate over fourth-century destruction and rebuilding at Rome.',
  },
  {
    id: 'rebuilding-form', title: 'Speed, Streets, and the Rebuilt City', category: 'Roman tradition + structural inference', turns: [18],
    text: 'Livy attributed Rome\'s irregular later streets to haste after the sack. That neat explanation cannot bear the full weight of urban history, but hurried return, old property claims, fire access, drainage, and wall construction would have competed for labor and authority.',
    evidence: 'Livy 5.55; topography and later street patterns. The game treats the contrast between rapid and surveyed rebuilding as a strategic model, not a recovered master plan.',
  },
  {
    id: 'reconstruction-claims', title: 'Debt, Land, and Public Labor', category: 'Historical inference', turns: [19],
    text: 'A damaged city does not erase claims. Creditors, veterans, displaced households, and public crews all had reasons to contest who paid for recovery and who retained land. Sources do not preserve a complete post-sack settlement, so the game models these interests through recurring republican pressures.',
    evidence: 'Livy books 5-6 for the narrative setting; later republican debt and land conflicts used cautiously as evidence for durable institutions and incentives.',
  },
  {
    id: 'latin-settlement-338', title: 'The Latin Settlement of 338 BC', category: 'Institutional history', turns: [20],
    text: 'Rome did not impose one identical status after the Latin War. Communities received different combinations of citizenship, treaty obligation, local autonomy, intermarriage, trade, and military duty. Differentiation became a source of Roman flexibility as well as control.',
    evidence: 'Livy 8.11-14; later institutional evidence for Latin, citizen, partial-citizen, and allied relationships. The game compresses the road from sack to settlement.',
  },
  {
    id: 'roads-status-and-service', title: 'Roads, Status, and Military Service', category: 'Institutional history', turns: [21, 22],
    text: 'Roman expansion joined physical routes to differentiated political relationships. Citizenship, partial rights, Latin status, and treaties did not produce identical burdens. Roads could speed supply, trade, and response while also creating avenues an enemy might use.',
    evidence: 'Livy 8.11-14 and 9.29 for the settlement tradition and Via Appia; Polybius 6.21-26 for later military obligation, used cautiously for institutional development.',
  },
  {
    id: 'colonies-and-compacts', title: 'Colonies Were Commitments, Not Free Territory', category: 'Structural inference', turns: [22, 23],
    text: 'A colony required settlers, land settlement, defense, roads, supplies, and continued political attention. It could anchor control and reward service while reducing a community\'s autonomy and exposing Rome to new garrison and maintenance demands.',
    evidence: 'Livy books 8-10 for fourth-century colonies and settlements; later colonial records clarify the institution but should not be projected backward without caution.',
  },
]

export const notesForTurn = (turn) => HISTORICAL_NOTES.filter((note) => note.turns.includes(turn))

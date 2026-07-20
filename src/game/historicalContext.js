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
    id: 'roads-status-and-service', title: 'Roads, Status, and Military Service', category: 'Institutional history', turns: [21, 22, 24],
    text: 'Roman expansion joined physical routes to differentiated political relationships. Citizenship, partial rights, Latin status, and treaties did not produce identical burdens. Roads could speed supply, trade, and response while also creating avenues an enemy might use.',
    evidence: 'Livy 8.11-14 and 9.29 for the settlement tradition and Via Appia; Polybius 6.21-26 for later military obligation, used cautiously for institutional development.',
  },
  {
    id: 'colonies-and-compacts', title: 'Colonies Were Commitments, Not Free Territory', category: 'Structural inference', turns: [22, 23],
    text: 'A colony required settlers, land settlement, defense, roads, supplies, and continued political attention. It could anchor control and reward service while reducing a community\'s autonomy and exposing Rome to new garrison and maintenance demands.',
    evidence: 'Livy books 8-10 for fourth-century colonies and settlements; later colonial records clarify the institution but should not be projected backward without caution.',
  },
  {
    id: 'caudine-forks', title: 'Caudine Forks: Defeat and Recovery', category: 'Literary tradition + strategic inference', turns: [23],
    text: 'Livy describes a Roman army trapped in 321 BC, compelled to pass under the yoke, and released under terms later disputed at Rome. The exact diplomatic sequence and speeches are uncertain. Encirclement, humiliation, preservation of trained manpower, and the political cost of repudiating terms remain valid strategic pressures.',
    evidence: 'Livy 9.1-12; Appian, Samnite Wars fragments. Both accounts are later than the event, so the game does not treat the dramatic details as a verbatim record.',
  },
  {
    id: 'appian-works', title: 'Via Appia and Aqua Appia', category: 'Institutional history + material evidence', turns: [24],
    text: 'The censorship of Appius Claudius Caecus in 312 BC was remembered for both a road toward Capua and Rome\'s first aqueduct. These were not decorative monuments: each required surveys, labor, material, accounts, and continuing maintenance. The early Aqua Appia was mostly underground, unlike the towering arcades of later centuries.',
    evidence: 'Livy 9.29; Frontinus, De aquaeductu 1.5; surviving route and engineering evidence. Later rebuilding complicates any claim that the visible remains preserve the original works unchanged.',
  },
  {
    id: 'samnite-endurance', title: 'The Samnite Wars and Repeated Armies', category: 'Narrative history + structural inference', turns: [22, 23, 25, 26],
    text: 'The wars in central and southern Italy were not a single march of uninterrupted Roman success. Mountain terrain, fortified communities, allied contingents, colonies, and the ability to raise new forces after defeat mattered more than one perfect commander or battle.',
    evidence: 'Livy books 8-10 provide the main continuous narrative. Treaty details, numbers, and speeches require caution; the broad expansion of Roman alliances, settlements, and military reach is better secured.',
  },
  {
    id: 'sentinum', title: 'Sentinum and the Italian Coalition', category: 'Roman narrative + strategic inference', turns: [26],
    text: 'Roman tradition cast Sentinum in 295 BC as a great decision against a coalition of Samnites, Gauls, Etruscans, and Umbrians. The literary scale and the devotio story are shaped by later memory. The strategic problem is firmer: Rome sought to keep several enemies from joining their full strength.',
    evidence: 'Livy 10.16-31; later summaries. The game models coalition timing, roads, reserves, and allied depth rather than reproducing the battle narrative as certain.',
  },
  {
    id: 'pyrrhic-war', title: 'Pyrrhus and the Price of Victory', category: 'Later literary tradition + strategic structure', turns: [27, 28],
    text: 'Pyrrhus brought a practiced Hellenistic army and elephants to Italy. Ancient writers remembered costly Roman defeats and his inability to turn battlefield success into a durable political settlement. Rome\'s advantage was not immunity from defeat, but deeper access to replacement armies and an allied system that did not immediately dissolve.',
    evidence: 'Plutarch, Life of Pyrrhus 13-25; Dionysius of Halicarnassus, Roman Antiquities fragments; Polybius 1.6 for the later strategic retrospective. The famous sayings are literary and should not be treated as transcripts.',
  },
  {
    id: 'threshold-264', title: 'Why the Core Ends in 264 BC', category: 'Historical threshold', turns: [29],
    text: 'The opening of the First Punic War marks a change in scale. Rome had become the leading power in Italy, but an Italian alliance-and-road system did not automatically provide fleets, overseas commands, or provincial institutions. Ending here lets the player judge the system before a different Mediterranean game begins.',
    evidence: 'Polybius 1.5-12; Diodorus Siculus fragments for the opening crisis. The causes and immediate decisions remain disputed, but 264 BC is a defensible institutional boundary.',
  },
  {
    id: 'first-punic-institutions', title: 'Fleet, Credit, and the First Overseas Settlement', category: 'Primary narrative + institutional inference', turns: [30, 31, 32],
    text: 'The First Punic War forced Rome to sustain fleets, credit, allied crews, and commands beyond Italy. Polybius explains the war through maritime learning and repeated loss, but his set-piece account of a captured Punic model should not be mistaken for the whole institutional history of Roman shipbuilding.',
    evidence: 'Polybius 1.20-63 is the main surviving continuous account. Inscriptions and later provincial evidence clarify institutions only imperfectly; exact fleet totals and dramatic episodes remain debated.',
  },
  {
    id: 'hannibalic-invasion', title: 'Hannibal and the Italian System', category: 'Primary narrative + strategic structure', turns: [33],
    text: 'Hannibal sought more than battlefield victories. His invasion tested whether Roman and allied armies could be separated from the differentiated compacts, colonies, roads, and local interests that sustained them. Those relationships did not respond uniformly.',
    evidence: 'Polybius 3.33-118; Livy books 21-22. Routes, numbers, speeches, and motives in both narratives require comparison, while the invasion and its pressure on Roman alliances are secure.',
  },
  {
    id: 'cannae-recovery', title: 'Cannae and Replacement Capacity', category: 'Primary narrative + strategic inference', turns: [34],
    text: 'Cannae destroyed a major Roman field force but did not compel immediate settlement. Refusing negotiations, recruiting new armies, guarding the city, and retaining enough allied cooperation mattered more to survival than pretending the defeat was inexpensive.',
    evidence: 'Polybius 3.107-118; Livy 22.43-61 and 23. The broad defeat and Roman continuation are firm; casualty totals, speeches, and some later exemplary stories are not exact transcripts.',
  },
  {
    id: 'capua-and-allies', title: 'Capua, Loyalty, and Differentiated Settlement', category: 'Narrative history + institutional complexity', turns: [35],
    text: 'Capua became the most prominent Italian community to join Hannibal and later received a severe settlement. Other communities remained loyal, defected under different conditions, or returned on different terms. The game therefore separates punishment, compact, and reconstruction.',
    evidence: 'Livy books 23-26; Polybius fragments and strategic narrative. Livy supplies much of the detail and writes with Roman moral and political purposes, so legal sequences and speeches require caution.',
  },
  {
    id: 'peace-201', title: 'Victory Did Not Cancel Obligations', category: 'Primary narrative + structural inference', turns: [36],
    text: 'The peace of 201 BC confirmed Roman predominance in the western Mediterranean, but soldiers, allied communities, creditors, contractors, and damaged households still carried claims. Indemnity and victory enlarged future choices without settling how Rome should use them.',
    evidence: 'Polybius 15.18-19; Livy 30.37-45. The treaty framework is better secured than later stories about every negotiation or the precise distribution of returning veterans.',
  },
  {
    id: 'metropolitan-expansion', title: 'Conquest Enters the City', category: 'Ancient narrative + institutional inference', turns: [37, 38],
    text: 'War indemnities, booty, captives, contractors, commanders, litigants, and petitioners enlarged Rome at different rates. The second-century city answered with covered civic halls, records, markets, water, and patronage, but no single measure turned a citizen Forum into a finished imperial capital.',
    evidence: 'Polybius 18 and 21 for settlements and political observation; Livy books 33-39 for triumphs, commands, censorship, and urban measures. Surviving narratives describe exemplary decisions more fully than ordinary accounts, rents, or administrative routines.',
  },
  {
    id: 'pydna-and-spoils', title: 'Pydna, Command, and the Uses of Spoils', category: 'Near-contemporary narrative + later biography', turns: [39],
    text: 'The Macedonian settlement brought treasure, captives, claims, and prestige to Rome while extending the reach of commanders and public contractors. Enslaved captives, freed households, citizen soldiers, Italian allies, and provincial petitioners held different legal positions and cannot be treated as one interchangeable labor body.',
    evidence: 'Polybius 29-30 and fragments; Livy books 44-45; Plutarch, Aemilius Paulus. Polybius is closest to the political world described, while triumphal detail, speeches, totals, and later character judgments require comparison rather than literal transcription.',
  },
  {
    id: 'carthage-corinth-146', title: 'Two Victories, Different Settlements', category: 'Ancient narrative + archaeology + institutional inference', turns: [40],
    text: 'Carthage and Corinth were destroyed in 146 BC after different wars, decisions, and local circumstances. Their defeat brought land, captives, artworks, commercial openings, and long commands into Roman politics, but a shared date does not make the settlements identical or every later provincial arrangement immediate.',
    evidence: 'Polybius 38-39 and surviving fragments; Appian, Punic Wars 118-135; Livy, Periochae 51-52; archaeological evidence from Carthage and Corinth. Polybius was close to the Carthaginian settlement, while Appian and the epitomes preserve later narrative frames; exact inventories, motives, and administrative sequences remain incomplete.',
  },
  {
    id: 'gracchan-threshold', title: 'The Republic at the Gracchan Threshold', category: 'Ancient interpretation + legal and agrarian evidence', turns: [41],
    text: 'By 133 BC, public land, long military service, tenancy, wealth, imported grain, Italian obligations, urban migration, and competition for command pressed on one another. Ancient writers selected different causes and moral lessons. The evidence supports a linked crisis, not a single self-explaining statistic or an inevitable reform program.',
    evidence: 'Appian, Civil Wars 1.7-27; Plutarch, Tiberius Gracchus 5-21; Polybius 6.19-26 for the levy system; agrarian law evidence including the later lex agraria of 111 BC. Appian and Plutarch are much later than the events and should be compared with legal, demographic, military, and archaeological evidence rather than treated as transcripts.',
  },
  {
    id: 'gracchan-aftermath', title: 'Reform After the Gracchi', category: 'Later narrative + agrarian law evidence', turns: [42],
    text: 'The deaths of Tiberius and Gaius Gracchus did not remove the land, grain, service, and procedural questions attached to their programs. Commissions, colonies, market provision, possession, and appeal remained practical disputes even when later writers organized them around personalities and constitutional decline.',
    evidence: 'Appian, Civil Wars 1.7-27; Plutarch, Tiberius Gracchus and Gaius Gracchus; fragments and inscriptions associated with the lex agraria of 111 BC. The narratives are late and rhetorically shaped; the legal evidence is partial and technically disputed.',
  },
  {
    id: 'social-war-citizenship', title: 'The Social War and Citizenship in Practice', category: 'Ancient narrative + law + municipal evidence', turns: [43],
    text: 'Italian communities entered the conflict with different histories, demands, and calculations. Rome answered war with successive grants whose implementation required census work, municipal records, voting assignments, levy revision, and adjudication. Citizenship was a legal settlement and an administrative project.',
    evidence: 'Appian, Civil Wars 1.34-53; Velleius Paterculus 2.15-17; Cicero, Pro Balbo and Pro Archia for citizenship administration; the lex Plautia Papiria and related measures as preserved through later legal and literary testimony. Exact enrollment and voting arrangements remain debated.',
  },
  {
    id: 'marius-sulla-command', title: 'Command Becomes Domestic Power', category: 'Ancient narrative under partisan conditions', turns: [44, 45],
    text: 'The Social War and Mithridatic command gave rival leaders armies, officers, creditors, veterans, and political claims that ordinary annual competition could no longer contain. Sulla\'s marches demonstrated that a Roman army might become an instrument for settling Roman offices and laws.',
    evidence: 'Appian, Civil Wars 1.55-106; Plutarch, Marius and Sulla; fragments of Sisenna and Sallust; Cicero\'s later references. The sequence is broadly recoverable, but speeches, motives, totals, and moral portraits reflect later political argument.',
  },
  {
    id: 'tabularium-records', title: 'The Tabularium and the Burden of Records', category: 'Archaeology + inscription + cautious identification', turns: [46],
    text: 'The great Capitoline substructure traditionally called the Tabularium belongs to the post-Sullan rebuilding and is securely monumental, but the ancient name and use of every room are not. The game uses it as evidence that accounts, laws, treaties, and title records required guarded space, copying, access, and fire protection.',
    evidence: 'Inscription CIL 6.1314 naming Q. Lutatius Catulus and the substruction; archaeological study of the Capitoline-Forum complex; ancient references to public tabulae and archives. The common identification should be presented with its architectural and functional uncertainties.',
  },
  {
    id: 'late-republic-streets', title: 'Assemblies, Courts, and Street Force', category: 'Contemporary speeches + later histories', turns: [47],
    text: 'Late republican public action took place through assemblies, courts, elections, processions, associations, patronal followings, and sometimes organized force. Crowds were not one permanent faction, and emergency policing could protect public business or become another weapon in officeholding competition.',
    evidence: 'Cicero, In Catilinam, Pro Sestio, and Pro Milone; Sallust, Bellum Catilinae; Asconius\' commentaries; Appian, Civil Wars 2. Contemporary speeches are partisan forensic and political evidence, not neutral crowd reports.',
  },
  {
    id: 'rubicon-threshold', title: 'The 49 BC Command Crisis', category: 'Participant accounts + correspondence + later narrative', turns: [48],
    text: 'The final crisis joined command duration, prosecution risk, candidacy, Senate procedure, Pompey\'s position, Caesar\'s army, and fear of renewed disorder. No single slogan explains the crossing. The game stops at the boundary so a civil-war outcome is not smuggled into the choice itself.',
    evidence: 'Caesar, Civil War 1.1-32; Cicero, Letters to Atticus 7 and Letters to Friends 16; Appian, Civil Wars 2.25-40; Plutarch, Caesar and Pompey; Cassius Dio 41. Caesar is a participant defending his conduct, Cicero writes amid uncertainty, and the connected narratives are later.',
  },
  {
    id: 'civil-war-opening', title: 'Civil War Was a Command and Guarantee Crisis', category: 'Participant advocacy + contemporary correspondence', turns: [49],
    text: 'The crossing into Italy did not erase the preceding dispute over commands, candidacy, prosecution, provincial authority, and Pompey\'s position. Municipal choices, army loyalty, treasury access, grain, and credible guarantees determined whether either side could convert a constitutional claim into operating authority.',
    evidence: 'Caesar, Civil War 1; Cicero, Letters to Atticus 7-9 and Letters to Friends 16; Caesar\'s account defends his own case, while Cicero records changing information, fear, and divided judgment. Appian, Plutarch, and Cassius Dio provide later connected narratives that should not overwrite the contemporary uncertainty.',
  },
  {
    id: 'caesarian-civic-core', title: 'Caesar\'s Forum and the Price of Civic Capacity', category: 'Archaeology + literary and inscriptional context', turns: [50],
    text: 'The Forum of Caesar and Basilica Julia expanded courts, business, circulation, and public display. They also tied land acquisition, dedication, and urban reorganization to Caesar\'s command, wealth, and lineage. New capacity and personal power were not opposing descriptions of the same project.',
    evidence: 'Cicero, Letters to Atticus 4.16 for expensive forum acquisition; Caesar-era and Augustan building evidence in the Forum Romanum and Forum of Caesar; Vitruvius 5 for basilica form used cautiously. Surviving fabric includes later repair, and acquisition details remain incomplete.',
  },
  {
    id: 'ides-succession', title: 'The Ides Removed a Dictator, Not His Obligations', category: 'Contemporary intervention + later narrative', turns: [51],
    text: 'Caesar\'s death left laws, offices, provincial assignments, debts, veterans, promised lands, and armed followers in place. Amnesty and ratification could preserve continuity, but no accepted succession rule determined who controlled the Caesarian coalition or enforced the settlement.',
    evidence: 'Cicero, Philippics and Letters to Atticus 14-16; Nicolaus of Damascus, Life of Augustus; Appian, Civil Wars 2-3; Plutarch, Caesar, Brutus, and Antony; Suetonius, Julius Caesar. Cicero is an active partisan, and the fuller narratives are later and shaped by known outcomes.',
    image: {
      src: '/images/projects/theatre-of-pompey-v1.png',
      alt: 'Isometric reconstruction of the Theatre of Pompey, its Temple of Venus Victrix, portico garden, and attached curia precinct.',
      evidence: 'Text-and-evidence synthesis',
    },
  },
  {
    id: 'triumviral-extraction', title: 'War Finance, Proscription, and Italian Land', category: 'Ancient narrative + local and material evidence', turns: [52],
    text: 'The triumvirs needed money, soldiers, and land faster than ordinary processes could supply them. Proscriptions and confiscations financed command and settled veterans while damaging title security, municipal order, and the independence of courts and records. The burden varied by community and claimant.',
    evidence: 'Appian, Civil Wars 4-5; Cassius Dio 47-48; Plutarch, Antony, Brutus, and Cicero; inscriptions, colonial evidence, and Augustan land-survey traditions. Lists, totals, and individual stories vary, but the fiscal and territorial structure is secure.',
  },
  {
    id: 'actium-demobilization', title: 'Actium Ended Rival Command, Not the Settlement Work', category: 'Augustan representation + later histories', turns: [53],
    text: 'Actium decided the final struggle between command coalitions, fleets, provinces, and client rulers. The victor still had to discharge or retain armies, settle veterans, assign provinces, restore credit, and present a Roman civil victory as a durable peace.',
    evidence: 'Augustus, Res Gestae 1-3 and 25; Virgil and Horace as contemporary public representation rather than operational records; Plutarch, Antony; Cassius Dio 50-51; archaeological and naval evidence. Augustan memory sharpened the foreign character of a conflict rooted in Roman civil war.',
  },
  {
    id: 'settlement-27', title: 'Restored Forms and Operating Power in 27 BC', category: 'Inscriptional self-account + institutional reconstruction', turns: [54],
    text: 'The settlement called a restoration preserved consuls, magistrates, Senate business, courts, and assemblies while concentrating provinces, armies, honors, fiscal means, and public obligations around Augustus. The arrangement developed further after 27 BC; one date did not produce the finished principate.',
    evidence: 'Augustus, Res Gestae 34; the Fasti, coin legends, honors, provincial assignments, and later legal evidence; Cassius Dio 53 supplies a much later constitutional narrative. Modern labels such as principate summarize an operating pattern and should not be mistaken for an ancient founding statute.',
  },
  {
    id: 'settlement-23', title: 'The Principate Was Revised in Practice', category: 'Contemporary offices + later constitutional narrative', turns: [55],
    text: 'Augustus did not operate from one final charter. The adjustments around 23 BC changed the relation between consulship, tribunician power, provincial command, Senate business, and the public standing of the princeps.',
    evidence: 'Augustus, Res Gestae 4 and 34; fasti, coinage, and command evidence; Cassius Dio 53-54. Dio offers a connected later account, while contemporary evidence better establishes individual powers than a single constitutional theory.',
  },
  {
    id: 'agrippa-public-city', title: 'Agrippa Joined Benefaction to Administration', category: 'Material evidence + contemporary commemoration', turns: [56],
    text: 'Agrippa\'s works widened water, bathing, ritual, circulation, and spectacle. His offices, wealth, command, friendship with Augustus, and technical direction made public benefit and ruling partnership parts of the same system.',
    evidence: 'Frontinus, Aqueducts 9-10 and 98 for Agrippa\'s water administration; Cassius Dio 53-54; inscriptions and archaeology of the Campus Martius. Individual plans and administrative details remain uneven.',
  },
  {
    id: 'augustan-succession-plans', title: 'Succession Was a Sequence of Failed Plans', category: 'Contemporary honors + later biography and history', turns: [57],
    text: 'Marriage, adoption, youth honors, offices, command, and public visibility prepared several possible successors. Death repeatedly broke these arrangements, showing that household recognition alone did not transfer the full operating package.',
    evidence: 'Res Gestae 14; fasti, coinage, inscriptions, and monuments associated with Marcellus, Agrippa, Gaius, Lucius, Tiberius, and Germanicus; Velleius 2, Suetonius, Augustus and Tiberius, and Cassius Dio 54-56.',
  },
  {
    id: 'ara-pacis-command', title: 'The Ara Pacis Joined Peace to Command', category: 'Monument + senatorial decree context', turns: [58],
    text: 'The Senate voted the altar after Augustus returned from Spain and Gaul. Procession, sacrifice, family, fertility, Senate, and Roman exempla framed peace as an operating order supported by provincial command.',
    evidence: 'Res Gestae 12; Ovid, Fasti 1.709-724; the surviving altar and relief program. Reconstruction of the original precinct and interpretation of individual figures remain debated.',
  },
  {
    id: 'forum-augustus-memory', title: 'The Forum of Augustus Organized Justice and Memory', category: 'Archaeology + inscriptions + later description', turns: [59],
    text: 'The forum relieved some legal and ceremonial pressure while arranging military departure, vengeance, ancestry, exempla, and dynastic standing around Mars Ultor. Its public use did not make its political authorship disappear.',
    evidence: 'Res Gestae 21; Ovid, Fasti 5; Suetonius, Augustus 29; inscriptions and archaeology of the forum and Temple of Mars Ultor. The precinct opened in 2 BC after a long and constrained building history.',
  },
  {
    id: 'vigiles-ad6', title: 'The Vigiles Made Fire Response a Permanent Service', category: 'Later administrative history + inscriptions', turns: [60],
    text: 'After major fires Augustus organized the vigiles in AD 6 under an equestrian prefect. Men, equipment, stations, ward routes, water, night patrol, pay, and command turned improvised response into recurring administration.',
    evidence: 'Cassius Dio 55.26; Suetonius, Augustus 30; inscriptions and later legal evidence for vigiles organization. The game network is explicitly a city-scale abstraction, not a reconstruction of one station in AD 6.',
  },
  {
    id: 'succession-ad14', title: 'AD 14 Tested the First Transfer', category: 'Contemporary and near-contemporary evidence + later narrative', turns: [61],
    text: 'Tiberius succeeded through family position, accumulated powers, military standing, provincial command, oaths, and senatorial action. The transfer worked, but it exposed how much of the principate existed in a package attached to a person.',
    evidence: 'Res Gestae 14; Velleius Paterculus 2.123-124; Tacitus, Annals 1; Suetonius, Augustus and Tiberius; Cassius Dio 56-57; fasti, oaths, and command evidence. Tacitus and Dio organize the transition through later political judgments.',
  },
  {
    id: 'imperial-transfer-ad14', title: 'Transfer Required More Than Inheritance', category: 'Near-contemporary and later narrative', turns: [62],
    text: 'Tiberius received no single crown. Household position, powers already held, Senate action, provincial command, army oaths, and control of the capital all contributed to an effective transfer.',
    evidence: 'Velleius Paterculus 2.123-124; Tacitus, Annals 1; Suetonius, Tiberius; Cassius Dio 57; fasti and oath evidence.',
  },
  {
    id: 'praetorian-concentration', title: 'The Guard Became a Capital Institution', category: 'Later narrative + administrative evidence', turns: [63],
    text: 'Concentrating Praetorian cohorts near Rome improved command and security while making access, pay, appointments, and succession matters of permanent political consequence.',
    evidence: 'Tacitus, Annals 4; Suetonius, Tiberius; Cassius Dio 57-58; inscriptions and archaeological evidence for Castra Praetoria.',
  },
  {
    id: 'claudian-provision-systems', title: 'Water and Harbor Were Operating Systems', category: 'Material and administrative evidence', turns: [64],
    text: 'Aqua Claudia, Anio Novus, Portus, warehouses, and grain administration enlarged capacity through sources, channels, quays, contracts, transfer routes, and maintenance rather than one act of dedication.',
    evidence: 'Frontinus, Aqueducts 13-15; Suetonius, Claudius 20; Cassius Dio 60; surviving aqueduct and Portus fabric.',
  },
  {
    id: 'neronian-court-credit', title: 'Court Credit and Public Provision Were Distinct', category: 'Partisan narratives + material evidence', turns: [65],
    text: 'Ancient authors made Nero a moral and theatrical subject. The simulation therefore keeps court display, palace access, grain, water, military recognition, provincial command, and Senate cooperation as separate measures.',
    evidence: 'Tacitus, Annals 13-16; Suetonius, Nero; Cassius Dio 61-63; inscriptions, coinage, and building evidence.',
  },
  {
    id: 'great-fire-ad64', title: 'The Fire of AD 64 Was Also a Land-Use Crisis', category: 'Near-contemporary narrative + archaeology', turns: [66],
    text: 'The Fire of AD 64 destroyed dense districts, displaced residents, required relief and clearance, and enabled new building rules and disputed control of central land. Cause and blame remain less secure than those operating consequences.',
    evidence: 'Tacitus, Annals 15.38-44; Suetonius, Nero 38; Cassius Dio 62; archaeology and the surviving Domus Aurea complex.',
  },
  {
    id: 'civil-war-ad69', title: 'AD 69 Made Army Recognition Explicit', category: 'Near-contemporary history + inscriptions and coinage', turns: [67],
    text: 'The Four Emperors showed that provincial armies could nominate rulers and carry the decision toward Rome. Senate recognition, guard action, treasury, pay, and public order still determined whether victory became government.',
    evidence: 'Tacitus, Histories 1-4; Suetonius, Galba through Vespasian; Josephus, Jewish War 4; coins and inscriptions.',
  },
  {
    id: 'flavian-public-conversion', title: 'Flavian Building Converted Imperial Space', category: 'Archaeology + literary evidence', turns: [68],
    text: 'The Temple of Peace and amphitheater program joined victory, dynasty, public access, display, service, and fiscal repair. Returning Neronian land to public use was a political claim as well as a construction decision.',
    evidence: 'Josephus, Jewish War 7; Pliny, Natural History 36; Suetonius, Vespasian and Titus; archaeology of the Temple of Peace and amphitheater valley.',
  },
  {
    id: 'flavian-amphitheatre-ad80', title: 'The Flavian Amphitheatre Opened in AD 80', category: 'Eyewitness poetry + archaeology', turns: [69],
    text: 'Titus opened the Flavian Amphitheatre in AD 80. Crowd routes, awnings, water, sanitation, arena machinery, staffing, and an event calendar made the intact structure operate; Domitian later replaced and enlarged underground elements in masonry.',
    evidence: 'Martial, On the Spectacles; Suetonius, Titus 7; Cassius Dio 66; archaeology of the Flavian Amphitheatre and its later hypogeum.',
  },
  {
    id: 'domitian-ad96', title: 'AD 96 Tested Palace Administration Without Its Ruler', category: 'Narrative + palace and administrative evidence', turns: [70],
    text: 'Domitian\'s death ended the Flavian dynasty, but the Palatine palace, public works, offices, armies, and provincial system did not disappear. Their unequal ability to transfer authority forms the act judgment.',
    evidence: 'Suetonius, Domitian; Cassius Dio 67-68; Pliny, Panegyricus; palace archaeology, inscriptions, and administrative evidence.',
  },
]

export const notesForTurn = (turn) => HISTORICAL_NOTES.filter((note) => note.turns.includes(turn))

import { useEffect, useMemo, useState } from 'react'
import { ArrowRight, BookOpen, Building2, Map } from 'lucide-react'
import { BuildDock } from './components/BuildDock.jsx'
import { BuildingInspector } from './components/BuildingInspector.jsx'
import { CityMap } from './components/CityMap.jsx'
import { CivicRail } from './components/CivicRail.jsx'
import { DecisionCouncil } from './components/DecisionCouncil.jsx'
import { EraTransition } from './components/EraTransition.jsx'
import { HistoricalContextPanel } from './components/HistoricalContextPanel.jsx'
import { HomeCreditsPanel } from './components/HomeCreditsPanel.jsx'
import { HomeScreen } from './components/HomeScreen.jsx'
import { ProjectLedger } from './components/ProjectLedger.jsx'
import { RepublicPanel } from './components/RepublicPanel.jsx'
import { ReconstructionPanel } from './components/ReconstructionPanel.jsx'
import { RegionalInspector } from './components/RegionalInspector.jsx'
import { RegionalMap } from './components/RegionalMap.jsx'
import { RoadsToItalyPanel } from './components/RoadsToItalyPanel.jsx'
import { SoundtrackControl } from './components/SoundtrackControl.jsx'
import { OutcomeOverlay } from './components/OutcomeOverlay.jsx'
import { MediterraneanPanel } from './components/MediterraneanPanel.jsx'
import { MediterraneanWorksPanel } from './components/MediterraneanWorksPanel.jsx'
import { MetropolitanPanel } from './components/MetropolitanPanel.jsx'
import { MetropolitanWorksPanel } from './components/MetropolitanWorksPanel.jsx'
import { RepublicStrainPanel } from './components/RepublicStrainPanel.jsx'
import { RepublicStrainWorksPanel } from './components/RepublicStrainWorksPanel.jsx'
import { CivilSettlementPanel } from './components/CivilSettlementPanel.jsx'
import { CivilSettlementWorksPanel } from './components/CivilSettlementWorksPanel.jsx'
import { AugustanCityPanel } from './components/AugustanCityPanel.jsx'
import { AugustanWorksPanel } from './components/AugustanWorksPanel.jsx'
import { ImperialCapitalPanel } from './components/ImperialCapitalPanel.jsx'
import { ImperialWorksPanel } from './components/ImperialWorksPanel.jsx'
import { TrajanicCapitalPanel } from './components/TrajanicCapitalPanel.jsx'
import { TrajanicWorksPanel } from './components/TrajanicWorksPanel.jsx'
import { TopBar } from './components/TopBar.jsx'
import { TurnReport } from './components/TurnReport.jsx'
import { WalkthroughOverlay } from './components/WalkthroughOverlay.jsx'
import { ERAS, TURN_YEARS, getObjective } from './game/data.js'
import { campaignMarkdown, downloadText } from './game/campaignExport.js'
import { createInitialState } from './game/initialState.js'
import { describeCampaign, hasCampaignProgress, parseCampaignSnapshot } from './game/homeScreen.js'
import { continueToAugustanCity, continueToCivilSettlement, continueToImperialCapital, continueToMediterranean, continueToMetropolis, continueToRepublicUnderStrain, continueToTrajanicCapital, enterAugustanCity, enterCivilSettlement, enterHannibalicEmergency, enterImperialCapital, enterMediterranean, enterMetropolis, enterRepublicUnderStrain, enterTrajanicCapital } from './game/continuation.js'
import { calculateOutcome } from './game/outcomes.js'
import { advanceTurn, allocateWorkforce, continueProject, continueRegionalRoad, enterCityOfKings, enterEarlyRepublic, enterItalianStrategy, enterReconstruction, enterRegionalStrategy, foundRegionalColony, placeBuilding, removeBuilding, repairBuilding, resolveCouncil, reviseRegionalCompact, selectBuilding, selectDistrict, selectFamily, selectRegionalCommunity, selectRegionalRoute, startRegionalRoad, upgradeBuilding, workAugustanProject, workCivilSettlementProject, workImperialProject, workItalianProject, workMediterraneanProject, workMetropolitanProject, workRepublicStrainProject, workTrajanicProject } from './game/simulation.js'

const STORAGE_KEY = 'titans-of-war-birth-of-rome-v1'

function storedCampaign() {
  return parseCampaignSnapshot(localStorage.getItem(STORAGE_KEY))
}

function restoreState() {
  return storedCampaign() ?? createInitialState()
}

export default function App() {
  const [state, setState] = useState(restoreState)
  const [screen, setScreen] = useState('home')
  const [hasSavedCampaign, setHasSavedCampaign] = useState(() => Boolean(storedCampaign()))
  const [campaignStarted, setCampaignStarted] = useState(() => Boolean(storedCampaign()))
  const [historyOpen, setHistoryOpen] = useState(false)
  const [creditsOpen, setCreditsOpen] = useState(false)
  const [soundtrackOpen, setSoundtrackOpen] = useState(false)
  const [walkthroughOpen, setWalkthroughOpen] = useState(false)
  const [report, setReport] = useState(null)
  const [message, setMessage] = useState('')
  const [toast, setToast] = useState('')
  const [surface, setSurface] = useState('city')
  const era = ERAS[state.era]
  const homeCampaign = useMemo(() => describeCampaign(state), [state])
  const canContinue = hasSavedCampaign || campaignStarted || hasCampaignProgress(state)
  const chosenId = state.choiceLog.find((entry) => entry.turn === state.turn)?.optionId
  const outcome = useMemo(() => state.outcome && !state.republicTransition && !state.reconstructionTransition && !state.regionalTransition && !state.italianTransition && !state.mediterraneanTransition && !state.hannibalicTransition && !state.metropolitanTransition && !state.strainTransition && !state.settlementTransition && !state.augustanTransition && !state.imperialCapitalTransition && !state.trajanicCapitalTransition ? calculateOutcome(state) : null, [state])

  useEffect(() => {
    const handleKey = (event) => {
      if (event.key === 'Escape') {
        setHistoryOpen(false)
        setCreditsOpen(false)
        setSoundtrackOpen(false)
        setWalkthroughOpen(false)
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  useEffect(() => {
    if (!toast) return undefined
    const timer = window.setTimeout(() => setToast(''), 2200)
    return () => window.clearTimeout(timer)
  }, [toast])

  const build = () => {
    const result = placeBuilding(state, state.selectedFamily, state.selectedDistrict)
    setState(result.state)
    setMessage(result.error ?? result.message)
  }

  const applyWorkAction = (action, instanceId) => {
    const result = action(state, instanceId)
    setState(result.state)
    setMessage(result.error ?? result.message)
  }

  const applyRegionalAction = (action, ...args) => {
    const result = action(state, ...args)
    setState(result.state)
    setMessage(result.error ?? result.message)
    if (result.error) setToast(result.error)
  }

  const clearWork = (instanceId) => {
    const building = state.buildings.find((item) => item.instanceId === instanceId)
    if (!building || !window.confirm(`Clear ${building.name}? Only a small part of its material will be recovered.`)) return
    applyWorkAction(removeBuilding, instanceId)
  }

  const endSeason = () => {
    const result = advanceTurn(state)
    if (result.error) {
      setToast(result.error)
      return
    }
    setState(result.state)
    setReport(result.report)
    setMessage('')
  }

  const save = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    setHasSavedCampaign(true)
    setCampaignStarted(true)
    setToast('Campaign saved in this browser.')
  }

  const exportCampaign = () => downloadText('birth-of-rome-chronicle.md', campaignMarkdown(state), 'text/markdown')

  const restart = () => {
    if (!window.confirm('Begin a new campaign? The current unsaved position will be replaced.')) return
    const fresh = createInitialState()
    localStorage.removeItem(STORAGE_KEY)
    setState(fresh)
    setHasSavedCampaign(false)
    setCampaignStarted(true)
    setReport(null)
    setMessage('')
  }

  const openCampaign = () => {
    setCampaignStarted(true)
    setScreen('game')
    setCreditsOpen(false)
    if (!localStorage.getItem('birth-of-rome-walkthrough-seen')) setWalkthroughOpen(true)
  }

  const beginNewCampaign = () => {
    if (canContinue && !window.confirm('Begin a new campaign? The current saved or in-memory position will be replaced.')) return
    localStorage.removeItem(STORAGE_KEY)
    setState(createInitialState())
    setHasSavedCampaign(false)
    setCampaignStarted(true)
    setReport(null)
    setMessage('')
    setHistoryOpen(false)
    setCreditsOpen(false)
    setSoundtrackOpen(false)
    setScreen('game')
    if (!localStorage.getItem('birth-of-rome-walkthrough-seen')) setWalkthroughOpen(true)
  }

  const openHome = () => {
    setScreen('home')
    setHistoryOpen(false)
    setCreditsOpen(false)
    setSoundtrackOpen(false)
    setWalkthroughOpen(false)
    setReport(null)
  }

  const closeWalkthrough = () => {
    localStorage.setItem('birth-of-rome-walkthrough-seen', 'true')
    setWalkthroughOpen(false)
  }

  const consult = (noteId) => {
    if (!state.consultedNotes.includes(noteId)) setState({ ...state, consultedNotes: [...state.consultedNotes, noteId] })
  }

  if (screen === 'home') {
    return (
      <div className="app-shell home-shell">
        <HomeScreen
          canContinue={canContinue}
          campaignSummary={homeCampaign.summary}
          historyOpen={historyOpen}
          creditsOpen={creditsOpen}
          musicOpen={soundtrackOpen}
          onPrimary={openCampaign}
          onNewCampaign={beginNewCampaign}
          onOpenHistory={() => setHistoryOpen(true)}
          onOpenCredits={() => setCreditsOpen(true)}
          onToggleMusic={() => setSoundtrackOpen((current) => !current)}
        />
        <SoundtrackControl open={soundtrackOpen} turn={state.turn} onClose={() => setSoundtrackOpen(false)} />
        <HistoricalContextPanel open={historyOpen} turn={state.turn} consulted={state.consultedNotes} onConsult={consult} onClose={() => setHistoryOpen(false)} />
        <HomeCreditsPanel open={creditsOpen} onClose={() => setCreditsOpen(false)} />
      </div>
    )
  }

  return (
    <div className="app-shell">
      <TopBar
        era={era}
        turn={state.turn}
        year={TURN_YEARS[state.turn - 1]}
        historyOpen={historyOpen}
        musicOpen={soundtrackOpen}
        onOpenHistory={() => setHistoryOpen(true)}
        onToggleMusic={() => setSoundtrackOpen((current) => !current)}
        onOpenWalkthrough={() => setWalkthroughOpen(true)}
        onOpenHome={openHome}
        onSave={save}
        onExport={exportCampaign}
        onRestart={restart}
      />
      <SoundtrackControl open={soundtrackOpen} turn={state.turn} onClose={() => setSoundtrackOpen(false)} />
      <main className="game-layout">
        <CivicRail state={state} onAllocate={(lane, delta) => setState(allocateWorkforce(state, lane, delta))} />
        <div className="game-center">
          <section className="campaign-strip">
            <div>
              <p className="eyebrow">Current charge</p>
              <strong>{getObjective(state.turn)}</strong>
            </div>
            <div className="progress-track" aria-label={`Campaign progress: turn ${state.turn} of ${TURN_YEARS.length}`}><i style={{ width: `${state.turn / TURN_YEARS.length * 100}%` }} /></div>
            <button className="context-button" onClick={() => setHistoryOpen(true)} aria-haspopup="dialog" aria-expanded={historyOpen}><BookOpen /> Historical knowledge <span>{state.consultedNotes.length}</span></button>
          </section>
          {state.regional && <div className="surface-switch" role="group" aria-label="Planning view">
            <button type="button" className={surface === 'city' ? 'active' : ''} onClick={() => setSurface('city')} aria-pressed={surface === 'city'}><Building2 /> City</button>
            <button type="button" className={surface === 'region' ? 'active' : ''} onClick={() => setSurface('region')} aria-pressed={surface === 'region'}><Map /> Region</button>
          </div>}
          {surface === 'region' && state.regional ? <>
            <RegionalMap state={state} onSelectCommunity={(id) => setState(selectRegionalCommunity(state, id))} onSelectRoute={(id) => setState(selectRegionalRoute(state, id))} />
            <RegionalInspector state={state} onCompact={(community, relationship) => applyRegionalAction(reviseRegionalCompact, community, relationship)} onStartRoad={(id) => applyRegionalAction(startRegionalRoad, id)} onContinueRoad={(id) => applyRegionalAction(continueRegionalRoad, id)} onFoundColony={(id) => applyRegionalAction(foundRegionalColony, id)} />
          </> : <>
            <CityMap state={state} onSelectDistrict={(id) => { setState(selectDistrict(state, id)); setMessage('') }} />
            <ProjectLedger state={state} onContinue={(id) => applyWorkAction(continueProject, id)} />
            <BuildingInspector state={state} onSelect={(id) => setState(selectBuilding(state, id))} onUpgrade={(id) => applyWorkAction(upgradeBuilding, id)} onRepair={(id) => applyWorkAction(repairBuilding, id)} onRemove={clearWork} />
            <BuildDock state={state} onSelectFamily={(id) => { setState(selectFamily(state, id)); setMessage('') }} onBuild={build} message={message} />
          </>}
        </div>
        <aside className="decision-rail">
          <DecisionCouncil
            council={state.council}
            resolved={state.councilResolved}
            chosenId={chosenId}
            onChoose={(optionId) => setState(resolveCouncil(state, optionId))}
          />
          {state.era === 2 && <RepublicPanel state={state} />}
          {state.era === 3 && <ReconstructionPanel state={state} />}
          {state.era === 5 && <RoadsToItalyPanel state={state} onWork={(id) => applyRegionalAction(workItalianProject, id)} />}
          {state.era === 6 && <MediterraneanPanel state={state} />}
          {state.era === 7 && <MetropolitanPanel state={state} />}
          {state.era === 8 && <RepublicStrainPanel state={state} />}
          {state.era === 9 && <CivilSettlementPanel state={state} />}
          {state.era === 10 && <AugustanCityPanel state={state} />}
          {state.era === 11 && <ImperialCapitalPanel state={state} />}
          {state.era === 12 && <TrajanicCapitalPanel state={state} />}
          {state.era === 6 && <MediterraneanWorksPanel state={state} onWork={(id) => applyRegionalAction(workMediterraneanProject, id)} />}
          {state.era === 7 && <MetropolitanWorksPanel state={state} onWork={(id) => applyRegionalAction(workMetropolitanProject, id)} />}
          {state.era === 8 && <RepublicStrainWorksPanel state={state} onWork={(id) => applyRegionalAction(workRepublicStrainProject, id)} />}
          {state.era === 9 && <CivilSettlementWorksPanel state={state} onWork={(id) => applyRegionalAction(workCivilSettlementProject, id)} />}
          {state.era === 10 && <AugustanWorksPanel state={state} onWork={(id) => applyRegionalAction(workAugustanProject, id)} />}
          {state.era === 11 && <ImperialWorksPanel state={state} onWork={(id) => applyRegionalAction(workImperialProject, id)} />}
          {state.era === 12 && <TrajanicWorksPanel state={state} onWork={(id) => applyRegionalAction(workTrajanicProject, id)} />}
          <section className="advance-section">
            <div>
              <p className="eyebrow">Next</p>
              <strong>{state.turn === 76 ? 'Judge the Trajanic capital at AD 117' : state.turn === 70 ? 'Judge the imperial capital at AD 96' : state.turn === 61 ? 'Judge whether the Augustan system survives its founder' : state.turn === 54 ? 'Judge the operating settlement of 27 BC' : state.turn === 48 ? 'Judge the Republic at the civil-war threshold' : state.turn === 41 ? 'Judge the metropolitan Republic' : state.turn === 29 ? 'Judge the Italian system' : state.turn === 23 ? 'Recover from the Caudine Forks' : state.turn === 20 ? 'Enter regional planning' : state.turn === 16 ? 'Face the Gallic crisis' : state.turn === 10 ? 'Enter the Early Republic' : state.turn === 5 ? 'Enter the City of Kings' : 'Resolve the season'}</strong>
            </div>
            <button className="advance-button" onClick={endSeason} disabled={Boolean(state.council && !state.councilResolved)}>
              End season <ArrowRight />
            </button>
            {state.council && !state.councilResolved && <small>Choose a council course first.</small>}
          </section>
        </aside>
      </main>
      {toast && <div className="toast" role="status">{toast}</div>}
      <HistoricalContextPanel open={historyOpen} turn={state.turn} consulted={state.consultedNotes} onConsult={consult} onClose={() => setHistoryOpen(false)} />
      <WalkthroughOverlay open={walkthroughOpen} onClose={closeWalkthrough} />
      <TurnReport report={report} onClose={() => setReport(null)} />
      <EraTransition
        open={(state.eraTransition || state.republicTransition || state.reconstructionTransition || state.regionalTransition || state.italianTransition || state.mediterraneanTransition || state.hannibalicTransition || state.metropolitanTransition || state.strainTransition || state.settlementTransition || state.augustanTransition || state.imperialCapitalTransition || state.trajanicCapitalTransition) && !report}
        kind={state.trajanicCapitalTransition ? 'trajanic' : state.imperialCapitalTransition ? 'imperial' : state.augustanTransition ? 'augustan' : state.settlementTransition ? 'settlement' : state.strainTransition ? 'strain' : state.metropolitanTransition ? 'metropolitan' : state.hannibalicTransition ? 'hannibalic' : state.mediterraneanTransition ? 'mediterranean' : state.italianTransition ? 'italian' : state.regionalTransition ? 'regional' : state.reconstructionTransition ? 'reconstruction' : state.republicTransition ? 'republic' : 'kings'}
        onContinue={() => { setSurface(state.italianTransition ? 'region' : 'city'); setState(state.trajanicCapitalTransition ? enterTrajanicCapital(state) : state.imperialCapitalTransition ? enterImperialCapital(state) : state.augustanTransition ? enterAugustanCity(state) : state.settlementTransition ? enterCivilSettlement(state) : state.strainTransition ? enterRepublicUnderStrain(state) : state.metropolitanTransition ? enterMetropolis(state) : state.hannibalicTransition ? enterHannibalicEmergency(state) : state.mediterraneanTransition ? enterMediterranean(state) : state.italianTransition ? enterItalianStrategy(state) : state.regionalTransition ? enterRegionalStrategy(state) : state.reconstructionTransition ? enterReconstruction(state) : state.republicTransition ? enterEarlyRepublic(state) : enterCityOfKings(state)) }}
      />
      <OutcomeOverlay outcome={report ? null : outcome} onExport={exportCampaign} onRestart={restart} continueLabel={state.turn === 70 ? 'Continue to Trajanic Capital' : state.turn === 61 ? 'Continue to Imperial Capital' : state.turn === 54 ? 'Continue to The Augustan City' : state.turn === 48 ? 'Continue to Civil War and Settlement' : state.turn === 41 ? 'Continue to Republic Under Strain' : state.turn === 36 ? 'Continue to Conquest and Metropolis' : 'Continue to the Mediterranean'} onContinue={state.turn === 29 && state.outcome === 'complete' ? () => setState(continueToMediterranean(state)) : state.turn === 36 && state.outcome === 'mediterranean-complete' ? () => setState(continueToMetropolis(state)) : state.turn === 41 && state.outcome === 'metropolitan-complete' ? () => setState(continueToRepublicUnderStrain(state)) : state.turn === 48 && state.outcome === 'republic-strain-complete' ? () => setState(continueToCivilSettlement(state)) : state.turn === 54 && state.outcome === 'civil-settlement-complete' ? () => setState(continueToAugustanCity(state)) : state.turn === 61 && state.outcome === 'augustan-city-complete' ? () => setState(continueToImperialCapital(state)) : state.turn === 70 && state.outcome === 'imperial-capital-complete' ? () => setState(continueToTrajanicCapital(state)) : null} />
    </div>
  )
}

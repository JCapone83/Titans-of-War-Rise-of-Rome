import { useEffect, useMemo, useState } from 'react'
import { ArrowRight, BookOpen, Building2, Map } from 'lucide-react'
import { BuildDock } from './components/BuildDock.jsx'
import { BuildingInspector } from './components/BuildingInspector.jsx'
import { CityMap } from './components/CityMap.jsx'
import { CivicRail } from './components/CivicRail.jsx'
import { DecisionCouncil } from './components/DecisionCouncil.jsx'
import { EraTransition } from './components/EraTransition.jsx'
import { HistoricalContextPanel } from './components/HistoricalContextPanel.jsx'
import { ProjectLedger } from './components/ProjectLedger.jsx'
import { RepublicPanel } from './components/RepublicPanel.jsx'
import { ReconstructionPanel } from './components/ReconstructionPanel.jsx'
import { RegionalInspector } from './components/RegionalInspector.jsx'
import { RegionalMap } from './components/RegionalMap.jsx'
import { RoadsToItalyPanel } from './components/RoadsToItalyPanel.jsx'
import { OutcomeOverlay } from './components/OutcomeOverlay.jsx'
import { MediterraneanPanel } from './components/MediterraneanPanel.jsx'
import { MediterraneanWorksPanel } from './components/MediterraneanWorksPanel.jsx'
import { MetropolitanPanel } from './components/MetropolitanPanel.jsx'
import { MetropolitanWorksPanel } from './components/MetropolitanWorksPanel.jsx'
import { RepublicStrainPanel } from './components/RepublicStrainPanel.jsx'
import { RepublicStrainWorksPanel } from './components/RepublicStrainWorksPanel.jsx'
import { TopBar } from './components/TopBar.jsx'
import { TurnReport } from './components/TurnReport.jsx'
import { WalkthroughOverlay } from './components/WalkthroughOverlay.jsx'
import { ERAS, TURN_YEARS, getObjective } from './game/data.js'
import { campaignMarkdown, downloadText } from './game/campaignExport.js'
import { createInitialState, migrateState } from './game/initialState.js'
import { continueToMediterranean, continueToMetropolis, continueToRepublicUnderStrain, enterHannibalicEmergency, enterMediterranean, enterMetropolis, enterRepublicUnderStrain } from './game/continuation.js'
import { calculateOutcome } from './game/outcomes.js'
import { advanceTurn, allocateWorkforce, continueProject, continueRegionalRoad, enterCityOfKings, enterEarlyRepublic, enterItalianStrategy, enterReconstruction, enterRegionalStrategy, foundRegionalColony, placeBuilding, removeBuilding, repairBuilding, resolveCouncil, reviseRegionalCompact, selectBuilding, selectDistrict, selectFamily, selectRegionalCommunity, selectRegionalRoute, startRegionalRoad, upgradeBuilding, workItalianProject, workMediterraneanProject, workMetropolitanProject, workRepublicStrainProject } from './game/simulation.js'

const STORAGE_KEY = 'titans-of-war-birth-of-rome-v1'

function restoreState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY))
    const migrated = migrateState(saved)
    if (migrated) return migrated
  } catch {
    // A corrupt local save should never prevent a new campaign.
  }
  return createInitialState()
}

export default function App() {
  const [state, setState] = useState(restoreState)
  const [historyOpen, setHistoryOpen] = useState(false)
  const [walkthroughOpen, setWalkthroughOpen] = useState(() => !localStorage.getItem('birth-of-rome-walkthrough-seen'))
  const [report, setReport] = useState(null)
  const [message, setMessage] = useState('')
  const [toast, setToast] = useState('')
  const [surface, setSurface] = useState('city')
  const era = ERAS[state.era]
  const chosenId = state.choiceLog.find((entry) => entry.turn === state.turn)?.optionId
  const outcome = useMemo(() => state.outcome && !state.republicTransition && !state.reconstructionTransition && !state.regionalTransition && !state.italianTransition && !state.mediterraneanTransition && !state.hannibalicTransition && !state.metropolitanTransition && !state.strainTransition ? calculateOutcome(state) : null, [state])

  useEffect(() => {
    const handleKey = (event) => {
      if (event.key === 'Escape') {
        setHistoryOpen(false)
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
    setToast('Campaign saved in this browser.')
  }

  const exportCampaign = () => downloadText('birth-of-rome-chronicle.md', campaignMarkdown(state), 'text/markdown')

  const restart = () => {
    if (!window.confirm('Begin a new campaign? The current unsaved position will be replaced.')) return
    const fresh = createInitialState()
    localStorage.removeItem(STORAGE_KEY)
    setState(fresh)
    setReport(null)
    setMessage('')
  }

  const closeWalkthrough = () => {
    localStorage.setItem('birth-of-rome-walkthrough-seen', 'true')
    setWalkthroughOpen(false)
  }

  const consult = (noteId) => {
    if (!state.consultedNotes.includes(noteId)) setState({ ...state, consultedNotes: [...state.consultedNotes, noteId] })
  }

  return (
    <div className="app-shell">
      <TopBar
        era={era}
        turn={state.turn}
        year={TURN_YEARS[state.turn - 1]}
        onOpenHistory={() => setHistoryOpen(true)}
        onOpenWalkthrough={() => setWalkthroughOpen(true)}
        onSave={save}
        onExport={exportCampaign}
        onRestart={restart}
      />
      <main className="game-layout">
        <CivicRail state={state} onAllocate={(lane, delta) => setState(allocateWorkforce(state, lane, delta))} />
        <div className="game-center">
          <section className="campaign-strip">
            <div>
              <p className="eyebrow">Current charge</p>
              <strong>{getObjective(state.turn)}</strong>
            </div>
            <div className="progress-track" aria-label={`Campaign progress: turn ${state.turn} of ${TURN_YEARS.length}`}><i style={{ width: `${state.turn / TURN_YEARS.length * 100}%` }} /></div>
            <button className="context-button" onClick={() => setHistoryOpen(true)}><BookOpen /> Context <span>{state.consultedNotes.length}</span></button>
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
          <RepublicPanel state={state} />
          <ReconstructionPanel state={state} />
          <RoadsToItalyPanel state={state} onWork={(id) => applyRegionalAction(workItalianProject, id)} />
          <MediterraneanPanel state={state} />
          <MediterraneanWorksPanel state={state} onWork={(id) => applyRegionalAction(workMediterraneanProject, id)} />
          <MetropolitanPanel state={state} />
          <MetropolitanWorksPanel state={state} onWork={(id) => applyRegionalAction(workMetropolitanProject, id)} />
          <RepublicStrainPanel state={state} />
          <RepublicStrainWorksPanel state={state} onWork={(id) => applyRegionalAction(workRepublicStrainProject, id)} />
          <DecisionCouncil
            council={state.council}
            resolved={state.councilResolved}
            chosenId={chosenId}
            onChoose={(optionId) => setState(resolveCouncil(state, optionId))}
          />
          <section className="advance-section">
            <div>
              <p className="eyebrow">Next</p>
              <strong>{state.turn === 48 ? 'Judge the Republic at the civil-war threshold' : state.turn === 41 ? 'Judge the metropolitan Republic' : state.turn === 29 ? 'Judge the Italian system' : state.turn === 23 ? 'Recover from the Caudine Forks' : state.turn === 20 ? 'Enter regional planning' : state.turn === 16 ? 'Face the Gallic crisis' : state.turn === 10 ? 'Enter the Early Republic' : state.turn === 5 ? 'Enter the City of Kings' : 'Resolve the season'}</strong>
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
        open={(state.eraTransition || state.republicTransition || state.reconstructionTransition || state.regionalTransition || state.italianTransition || state.mediterraneanTransition || state.hannibalicTransition || state.metropolitanTransition || state.strainTransition) && !report}
        kind={state.strainTransition ? 'strain' : state.metropolitanTransition ? 'metropolitan' : state.hannibalicTransition ? 'hannibalic' : state.mediterraneanTransition ? 'mediterranean' : state.italianTransition ? 'italian' : state.regionalTransition ? 'regional' : state.reconstructionTransition ? 'reconstruction' : state.republicTransition ? 'republic' : 'kings'}
        onContinue={() => { setSurface(state.italianTransition ? 'region' : 'city'); setState(state.strainTransition ? enterRepublicUnderStrain(state) : state.metropolitanTransition ? enterMetropolis(state) : state.hannibalicTransition ? enterHannibalicEmergency(state) : state.mediterraneanTransition ? enterMediterranean(state) : state.italianTransition ? enterItalianStrategy(state) : state.regionalTransition ? enterRegionalStrategy(state) : state.reconstructionTransition ? enterReconstruction(state) : state.republicTransition ? enterEarlyRepublic(state) : enterCityOfKings(state)) }}
      />
      <OutcomeOverlay outcome={report ? null : outcome} onExport={exportCampaign} onRestart={restart} continueLabel={state.turn === 41 ? 'Continue to Republic Under Strain' : state.turn === 36 ? 'Continue to Conquest and Metropolis' : 'Continue to the Mediterranean'} onContinue={state.turn === 29 && state.outcome === 'complete' ? () => setState(continueToMediterranean(state)) : state.turn === 36 && state.outcome === 'mediterranean-complete' ? () => setState(continueToMetropolis(state)) : state.turn === 41 && state.outcome === 'metropolitan-complete' ? () => setState(continueToRepublicUnderStrain(state)) : null} />
    </div>
  )
}

import { BUILDING_FAMILIES, DISTRICTS } from './data.js'
import { buildingAvailability, districtRiskReport } from './simulation.js'

const ESSENTIALS = [
  { key: 'shelter', label: 'shelter', families: ['housing'] },
  { key: 'water', label: 'water', families: ['water'] },
  { key: 'sanitation', label: 'sanitation and disease', families: ['drainage', 'water'] },
  { key: 'food', label: 'food and storage', families: ['grain', 'market'] },
  { key: 'fire', label: 'fire exposure', families: ['water', 'drainage', 'housing'] },
]

const familyName = (id) => BUILDING_FAMILIES.find((family) => family.id === id)?.name ?? id

export function nextWorkRecommendation(state) {
  const metrics = state.metrics ?? {}
  const maximumFire = Math.max(0, ...Object.values(districtRiskReport(state)).map((risk) => risk.fire ?? 0))
  const deficits = ESSENTIALS.map((essential, order) => ({
    ...essential,
    deficit: essential.key === 'fire'
      ? Math.max(0, maximumFire - 45)
      : Math.max(0, 65 - Number(metrics[essential.key] ?? 0)),
    order,
  })).sort((left, right) => right.deficit - left.deficit || left.order - right.order)
  const districtOrder = [state.selectedDistrict, ...DISTRICTS.map((district) => district.id)].filter((id, index, ids) => id && ids.indexOf(id) === index)

  for (const deficit of deficits) {
    for (const familyId of deficit.families) {
      for (const districtId of districtOrder) {
        const availability = buildingAvailability(state, familyId, districtId)
        if (!availability.ok) continue
        const district = DISTRICTS.find((item) => item.id === districtId)
        return {
          deficit: deficit.key,
          deficitLabel: deficit.label,
          deficitValue: deficit.deficit,
          familyId,
          family: familyName(familyId),
          buildingId: availability.building.id,
          building: availability.building.name,
          districtId,
          district: district?.name ?? districtId,
          reason: `Largest essential deficit: ${deficit.label}.`,
        }
      }
    }
  }

  return {
    deficit: deficits[0]?.key ?? 'shelter',
    deficitLabel: deficits[0]?.label ?? 'shelter',
    deficitValue: deficits[0]?.deficit ?? 0,
    familyId: null,
    districtId: null,
    reason: 'No unlocked essential work is legal and affordable this season.',
  }
}

const LOSS_KEYS = new Set(['departures', 'illness', 'eventLosses'])

export function populationWarning(state, forecast) {
  const population = Number(state.population?.total ?? 0)
  if (population >= 750) return null
  const causes = (forecast?.population?.reasons ?? [])
    .filter((reason) => LOSS_KEYS.has(reason.key) && Number(reason.value) > 0)
    .sort((left, right) => Number(right.value) - Number(left.value))
    .slice(0, 2)
  const band = population < 250 ? 'administrative' : population < 500 ? 'viability' : 'household'
  return {
    band,
    title: band === 'administrative' ? 'Administrative shell forming' : band === 'viability' ? 'City viability at risk' : 'Household decline',
    detail: band === 'administrative'
      ? 'Fewer than 250 people remain. Institutions may survive while the lived city disappears.'
      : band === 'viability'
        ? 'Fewer than 500 people remain. Essential services and housing now decide whether households return.'
        : 'Fewer than 750 people remain. The settlement is losing household depth.',
    causes,
  }
}

export const RECOVERY_FAMILIES = ['housing', 'water', 'drainage', 'grain']
export const recoveryFamilyLabel = (family) => family === 'grain' ? 'food storage' : family

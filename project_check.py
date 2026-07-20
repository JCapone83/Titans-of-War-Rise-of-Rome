from __future__ import annotations

import json
import struct
from pathlib import Path


ROOT = Path(__file__).resolve().parent


def require(path: str, needle: str | None = None) -> None:
    target = ROOT / path
    if not target.is_file():
        raise SystemExit(f"missing required file: {path}")
    if needle and needle not in target.read_text(encoding="utf-8"):
        raise SystemExit(f"{path} is missing required marker: {needle}")


def require_rgba_png(path: str, minimum_side: int = 512) -> None:
    target = ROOT / path
    require(path)
    header = target.read_bytes()[:26]
    if len(header) < 26 or header[:8] != b"\x89PNG\r\n\x1a\n" or header[12:16] != b"IHDR":
        raise SystemExit(f"building art must be a valid PNG: {path}")
    width, height = struct.unpack(">II", header[16:24])
    if min(width, height) < minimum_side:
        raise SystemExit(f"building art is below {minimum_side}px on its shortest side: {path}")
    if header[25] not in {4, 6}:
        raise SystemExit(f"building art must retain an alpha channel: {path}")


def main() -> None:
    package = json.loads((ROOT / "package.json").read_text(encoding="utf-8"))
    if package.get("private") is not False:
        raise SystemExit("package.json must deliberately mark the project public")
    if package.get("scripts", {}).get("build") != "vite build":
        raise SystemExit("package.json must retain the Vite build command")
    if package.get("scripts", {}).get("balance") != "node scripts/run-balance.mjs":
        raise SystemExit("package.json must retain the deterministic balance command")

    checks = {
        "src/game/data.js": "BUILDING_FAMILIES",
        "src/game/buildingArt.js": "palatine-huts-v1.png",
        "src/game/initialState.js": "createRepublicState",
        "src/game/simulation.js": "enterEarlyRepublic",
        "src/game/referenceStrategies.js": "ACT_FIVE_STRATEGIES",
        "src/game/outcomes.js": "Historical Continuity",
        "src/components/CityMap.jsx": "district-buildings",
        "src/components/LaborAllocationPanel.jsx": "Seasonal obligations",
        "src/components/RepublicPanel.jsx": "Republican balance",
        "src/components/ReconstructionPanel.jsx": "Reconstruction ledger",
        "src/components/MetropolitanWorksPanel.jsx": "Metropolitan public works",
        "src/components/RegionalMap.jsx": "The Regional Compact",
        "src/components/RegionalInspector.jsx": "Regional forecast",
        "src/components/ProjectLedger.jsx": "Major Projects",
        "src/components/BuildingInspector.jsx": "Upgrade",
        "src/components/DecisionCouncil.jsx": "council-options",
        "src/components/HistoricalContextPanel.jsx": "Evidence before certainty",
        "tests/game.test.mjs": "major works consume materials once",
        "scripts/run-balance.mjs": "runAllActFiveStrategies",
        "README.md": "Hill Settlements",
        "docs/ACTS_I_II_BALANCE_REPORT.md": "Household League",
        "docs/ACT_III_BALANCE_REPORT.md": "Paid Siege and Citizen Settlement",
        "docs/ACT_IV_BALANCE_REPORT.md": "Rapid Household Return",
        "docs/REGIONAL_SPINE_BALANCE_REPORT.md": "Strategic Depth",
        "docs/ACT_V_BALANCE_REPORT.md": "Appian Persistence",
        "docs/ACT_VII_OPENING_BALANCE_REPORT.md": "200-133 BC",
        "docs/ACT_VIII_BALANCE_REPORT.md": "133-49 BC",
        "docs/ACT_IX_BALANCE_REPORT.md": "49-27 BC",
        "docs/ART_DIRECTION_AND_ASSET_SPEC.md": "Approve one Palatine Huts master first",
        "docs/FIRST_STRUCTURE_CONCEPT_BIBLE.md": "Palatine Huts",
        "docs/BATCH_5_STRUCTURE_CONCEPT_BIBLE.md": "Comitium",
        "docs/BUILDING_ART_MANIFEST.md": "Regal Civic Core",
        "MEDIA_RIGHTS.md": "Code-native visual system",
    }
    for path, marker in checks.items():
        require(path, marker)
    require("public/images/buildings/palatine-huts-v1.png")
    require("public/images/buildings/timber-shrine-v1.png")
    require("public/images/buildings/shallow-well-v1.png")
    require("public/images/buildings/grain-pits-v1.png")
    require("public/images/buildings/timber-palisade-v1.png")
    require("public/images/buildings/cattle-market-v1.png")
    require("public/images/buildings/drainage-ditch-v1.png")
    require("public/images/buildings/kiln-smithy-v1.png")
    require("public/images/buildings/courtyard-housing-v1.png")
    require("public/images/buildings/lined-cistern-v1.png")
    require("public/images/buildings/raised-granary-v1.png")
    require("public/images/buildings/stone-gate-v1.png")
    require("public/images/buildings/cloaca-works-v1.png")
    require("public/images/buildings/temple-of-jupiter-v1.png")
    require("public/images/buildings/forum-market-v1.png")
    require("public/images/buildings/workshop-quarter-v1.png")
    require("src/game/buildingArt.js", "'comitium': '/images/buildings/comitium-v1.png'")
    require("src/game/buildingArt.js", "'saturn-treasury': '/images/buildings/saturn-treasury-v1.png'")
    require("src/game/buildingArt.js", "'circuit-fortification': '/images/buildings/circuit-fortification-v1.png'")
    require("src/game/buildingArt.js", "'street-courtyards': '/images/buildings/ordered-street-courts-v1.png'")
    require("src/game/buildingArt.js", "'public-cisterns': '/images/buildings/public-cisterns-v1.png'")
    require("src/game/buildingArt.js", "'public-granary': '/images/buildings/public-granary-v1.png'")
    require("src/game/buildingArt.js", "'contracted-craft-yards': '/images/buildings/contracted-craft-yards-v1.png'")
    require("public/images/buildings/comitium-v1.png")
    require("public/images/buildings/saturn-treasury-v1.png")
    require("public/images/buildings/circuit-fortification-v1.png")
    require_rgba_png("public/images/buildings/ordered-street-courts-v1.png")
    require_rgba_png("public/images/buildings/public-cisterns-v1.png")
    require_rgba_png("public/images/buildings/public-granary-v1.png")
    require_rgba_png("public/images/buildings/contracted-craft-yards-v1.png")
    require("src/game/simulation.js", "buildingAvailability")
    require("src/game/simulation.js", "networkCoverage")
    require("src/game/simulation.js", "districtRiskReport")
    require("src/game/simulation.js", "districtNetworkReport")
    require("src/game/simulation.js", "ritualWorkforceBurden")
    require("src/game/simulation.js", "republicForecast")
    require("src/game/simulation.js", "warForecast")
    require("src/game/simulation.js", "gallicReadiness")
    require("src/game/simulation.js", "gallicCrisis")
    require("src/game/simulation.js", "enterReconstruction")
    require("src/game/simulation.js", "enterRegionalStrategy")
    require("src/game/simulation.js", "regionalForecast")
    require("src/game/simulation.js", "mediterraneanForecast")
    require("src/game/simulation.js", "metropolitanForecast")
    require("src/game/continuation.js", "continueToMediterranean")
    require("src/game/continuation.js", "enterMediterranean")
    require("src/game/continuation.js", "enterHannibalicEmergency")
    require("src/components/MediterraneanPanel.jsx", "Fleet capacity")
    require("src/components/MediterraneanWorksPanel.jsx", "Republican public works")
    require("src/game/data.js", "appianApproach")
    require("src/game/data.js", "tiberEmporium")
    require("src/game/data.js", "republicanHorrea")
    require("src/game/data.js", "republicanCircus")
    require("src/game/simulation.js", "workMediterraneanProject")
    require("src/game/simulation.js", "mediterraneanProjectAvailability")
    require("src/game/simulation.js", "publicWorks")
    require("src/game/data.js", "A Fleet Without a Naval State")
    require("src/game/data.js", "First Punic War Finance and Sicilian Settlement")
    require("src/game/data.js", "Hannibal Enters Italy")
    require("src/game/data.js", "After Cannae")
    require("src/game/data.js", "Victory, Credit, and the Returning Army")
    require("src/game/historicalContext.js", "Polybius 3.107-118")
    require("src/game/referenceStrategies.js", "runAllMediterraneanStrategies")
    require("src/game/referenceStrategies.js", "runAllMetropolitanStrategies")
    require("scripts/run-balance.mjs", "Act VI Mediterranean Republic strategies")
    require("scripts/run-balance.mjs", "Act VII Conquest and Metropolis strategies")
    require("src/game/data.js", "METROPOLITAN_PROJECTS")
    require("src/game/data.js", "Republican Basilica")
    require("src/game/data.js", "Aqua Marcia")
    require("src/game/data.js", "Land, Grain, and Service")
    require("src/game/initialState.js", "createMetropolitanProjects")
    require("src/game/outcomes.js", "calculateMetropolitanScore")
    require("src/game/campaignExport.js", "Metropolitan Public Works")
    require("src/game/historicalContext.js", "gracchan-threshold")
    require("src/game/data.js", "REPUBLIC_STRAIN_PROJECTS")
    require("src/game/data.js", "The Sullan Settlement")
    require("src/game/data.js", "Command at the Italian Boundary")
    require("src/game/initialState.js", "createRepublicStrainState")
    require("src/game/continuation.js", "continueToRepublicUnderStrain")
    require("src/game/simulation.js", "republicStrainForecast")
    require("src/game/simulation.js", "workRepublicStrainProject")
    require("src/game/outcomes.js", "calculateRepublicStrainScore")
    require("src/components/RepublicStrainPanel.jsx", "Constitutional ledger")
    require("src/components/RepublicStrainWorksPanel.jsx", "Late-Republic works")
    require("src/game/referenceStrategies.js", "runAllRepublicStrainStrategies")
    require("scripts/run-balance.mjs", "Act VIII Republic Under Strain strategies")
    require("src/game/historicalContext.js", "rubicon-threshold")
    require("src/game/data.js", "CIVIL_SETTLEMENT_PROJECTS")
    require("src/game/projectArt.js", "CIVIL_SETTLEMENT_PROJECT_ART")
    require("src/game/projectArt.js", "civilSettlementProjectStage")
    require("src/game/projectArt.js", "Reserved site")
    require("src/game/projectArt.js", "Foundations and service")
    require("src/game/projectArt.js", "Structural shell")
    require("src/game/projectArt.js", "Operating form")
    require("src/game/projectArt.js", "forum-of-caesar-v1.png")
    require("src/game/projectArt.js", "curia-julia-v1.png")
    require("src/game/projectArt.js", "basilica-julia-v1.png")
    require("src/game/projectArt.js", "veteran-land-road-registry-v1.png")
    for project_id, asset in {
        "caesarianForum": "public/images/projects/forum-of-caesar-v1.png",
        "curiaJulia": "public/images/projects/curia-julia-v1.png",
        "basilicaJulia": "public/images/projects/basilica-julia-v1.png",
        "veteranLandRoadRegistry": "public/images/projects/veteran-land-road-registry-v1.png",
    }.items():
        require_rgba_png(asset)
    require("src/game/data.js", "Settlement of 27 BC")
    require("src/game/initialState.js", "createCivilSettlementState")
    require("src/game/continuation.js", "continueToCivilSettlement")
    require("src/game/continuation.js", "enterCivilSettlement")
    require("src/game/simulation.js", "civilSettlementForecast")
    require("src/game/simulation.js", "workCivilSettlementProject")
    require("src/game/outcomes.js", "calculateCivilSettlementScore")
    require("src/components/CivilSettlementPanel.jsx", "Operating settlement")
    require("src/components/CivilSettlementWorksPanel.jsx", "Settlement works")
    require("src/game/referenceStrategies.js", "runAllCivilSettlementStrategies")
    require("scripts/run-balance.mjs", "Act IX Civil War and Settlement strategies")
    require("src/game/historicalContext.js", "settlement-27")
    require("src/game/data.js", "AUGUSTAN_PROJECTS")
    require("src/game/data.js", "formatYear")
    require("src/game/data.js", "The Settlement Outlives Augustus")
    require("src/game/initialState.js", "createAugustanState")
    require("src/game/continuation.js", "continueToAugustanCity")
    require("src/game/continuation.js", "enterAugustanCity")
    require("src/game/simulation.js", "augustanCityForecast")
    require("src/game/simulation.js", "workAugustanProject")
    require("src/game/outcomes.js", "calculateAugustanCityScore")
    require("src/game/projectArt.js", "AUGUSTAN_PROJECT_ART")
    require("src/game/projectArt.js", "agrippan-pantheon-v1.png")
    require("src/components/AugustanCityPanel.jsx", "Augustan City")
    require("src/components/AugustanWorksPanel.jsx", "Augustan works")
    require("src/game/referenceStrategies.js", "runAllAugustanCityStrategies")
    require("scripts/run-balance.mjs", "Act X The Augustan City strategies")
    require("src/game/historicalContext.js", "succession-ad14")
    require("src/game/projectArt.js", "AUGUSTAN_PROJECT_SITES")
    require("src/game/projectArt.js", "augustanCapitalLandmarks")
    require("src/game/simulation.js", "augustanCapitalSystems")
    require("src/components/CityMap.jsx", "Augustan capital")
    require("src/components/OutcomeOverlay.jsx", "Capital legacy")
    require("src/game/campaignExport.js", "Capital Operating Systems")
    require("docs/ACT_X_CAPITAL_INTEGRATION_REPORT.md", "No Act XI")
    require("src/game/data.js", "IMPERIAL_CAPITAL_PROJECTS")
    require("src/game/data.js", "The Flavian Amphitheatre Opens")
    require("src/game/initialState.js", "createImperialCapitalState")
    require("src/game/continuation.js", "continueToImperialCapital")
    require("src/game/simulation.js", "imperialCapitalForecast")
    require("src/game/simulation.js", "imperialCapitalSystems")
    require("src/game/simulation.js", "workImperialProject")
    require("src/game/outcomes.js", "calculateImperialCapitalScore")
    require("src/components/ImperialCapitalPanel.jsx", "Imperial Capital")
    require("src/components/ImperialWorksPanel.jsx", "Flavian Amphitheatre")
    require("src/game/referenceStrategies.js", "IMPERIAL_CAPITAL_STRATEGIES")
    require("scripts/run-balance.mjs", "Act XI Imperial Capital strategies")
    require("docs/ACT_XI_IMPLEMENTATION_REPORT.md", "AD 14-96")
    require("docs/ACT_XI_BALANCE_REPORT.md", "Flavian Amphitheatre")
    for asset in [
        "house-of-augustus-v1.png", "mausoleum-of-augustus-v1.png", "agrippan-pantheon-v1.png",
        "baths-of-agrippa-v1.png", "theatre-of-marcellus-v1.png", "ara-pacis-v1.png",
        "forum-of-augustus-v1.png", "vigiles-ward-station-v1.png",
    ]:
        require_rgba_png(f"public/images/projects/{asset}")
    require("src/game/data.js", "first-secession")
    require("src/game/data.js", "veii-settlement")
    require("src/game/data.js", "gallic-approach")
    require("src/game/data.js", "latin-settlement")
    require("src/game/data.js", "regional-doctrine")

    data = (ROOT / "src/game/data.js").read_text(encoding="utf-8")
    if data.count("id: '") < 30:
        raise SystemExit("campaign data appears incomplete")
    if "labor: { label:" in data or "labor:" in "".join(line for line in data.splitlines() if "tier(" in line):
        raise SystemExit("labor must be allocated from population, not stored or charged as a material")
    print("Birth of Rome project check passed")


if __name__ == "__main__":
    main()

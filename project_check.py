from __future__ import annotations

import json
from pathlib import Path


ROOT = Path(__file__).resolve().parent


def require(path: str, needle: str | None = None) -> None:
    target = ROOT / path
    if not target.is_file():
        raise SystemExit(f"missing required file: {path}")
    if needle and needle not in target.read_text(encoding="utf-8"):
        raise SystemExit(f"{path} is missing required marker: {needle}")


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
        "docs/ART_DIRECTION_AND_ASSET_SPEC.md": "Approve one Palatine Huts master first",
        "docs/FIRST_STRUCTURE_CONCEPT_BIBLE.md": "Palatine Huts",
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

# Act VII Balance Report: Conquest and Metropolis

## Scope

Act VII now runs from the 200-133 BC metropolitan transition through five playable councils at 197, 184, 167, 146, and 133 BC. It ends at the Gracchan threshold. It does not prescribe or simulate the later Gracchan program.

The act keeps twelve obligations separate: urban migration, rent pressure, legal cases, patronage, contracting capacity, corruption exposure, enslaved inflow, freed-household integration, citizen absence, provincial petitions, imported-grain dependence, and public provision.

## Metropolitan public works

- **Republican Basilica**: four seasons. A roofed hall for law, arbitration, records, and exchange rather than a church or later imperial marble monument.
- **Regulated Macellum**: three seasons. An inspected food market dependent on the inherited Tiber Emporium, water, drains, waste removal, and enforceable measures.
- **Aqua Marcia**: four seasons. A source, conduit, distribution, and maintenance system dependent on the inherited Aqua Appia, not merely an arcade.
- **Civic Porticoes**: three seasons. Connected shaded circulation, backing rooms, and drainage dependent on a completed Republican Basilica.

Completion grants capacity but also adds recurring treasury, inspection, maintenance, sanitation, record, or patronage burdens. Projects consume the same seasonal action pool as the existing city systems and cannot receive crews twice in one turn.

## Deterministic reference campaigns

| Strategy | Overall | Conquest and Metropolis | Completed work | Active work |
| --- | ---: | ---: | --- | --- |
| Audited Civic Capacity | 75 | 78 | Republican Basilica | Civic Porticoes 1/3 |
| Market and Water Metropolis | 73 | 65 | Regulated Macellum | Aqua Marcia 2/4 |
| Provision and Bounded Command | 78 | 69 | Aqua Marcia | Republican Basilica 1/4 |

All three campaigns reach turn 41 at 133 BC with `metropolitan-complete`, make five declared council decisions, execute five declared project actions, and record no skipped actions. Their project portfolios and political settlements are distinct.

## Historical boundary

The 146 BC council distinguishes the settlements of Carthage and Corinth while exposing inventory, command, extraction, captivity, and public provision as separate choices. The 133 BC council treats land, grain, and service as connected pressures without reducing them to one cause. Context notes prioritize Polybius where available and explicitly qualify the later narratives of Appian and Plutarch.

## Verification

- `python3 project_check.py`
- `npm test`
- `npm run build -- --configLoader runner`
- `npm run balance`
- Independent Act VII semantic acceptance

The deterministic suite records three viable outcomes rather than one solved route. A high score requires public capacity, bounded patronage and corruption, household viability, legible status distinctions, and maintained physical systems together.

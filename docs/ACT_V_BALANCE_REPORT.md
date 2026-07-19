# Act V Balance Report

## Scope

This deterministic sweep covers the six Roads to Italy turns from the Appian censorship in 312 BC through the Mediterranean threshold in 264 BC. Each reference strategy inherits a complete regional campaign, resolves every council through ordinary player choices, spends normal resources, and advances one Appian work per turn. No resources, actions, or completed projects are injected by the runner.

The release gate requires every strategy to:

- reach turn 29 and the complete campaign outcome;
- record no skipped project action;
- complete all three seasons of both the Via Appia and Aqua Appia;
- score at least 70 on the Italian System measure; and
- preserve distinct priorities across the three Appian programs and all three final doctrines available in the game.

## Results

| Strategy | Overall | Italian System | Endurance | Compact | Pressure | Infrastructure | Stewardship | Appian priority | Final doctrine |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| Appian Persistence | 76 | 81 (B) | 99 | 47 | 76 | 94 | 98 | Road | Consolidate |
| Water and Reserves | 76 | 78 (C) | 95 | 37 | 76 | 95 | 97 | Water | Bounded |
| Federated Endurance | 85 | 87 (B) | 87 | 87 | 77 | 93 | 96 | Phased | Bounded |
| Command and Decision | 75 | 70 (C) | 80 | 32 | 65 | 93 | 97 | Road | Prepare |

All four strategies completed the Via Appia at 3/3 seasons and the Aqua Appia at 3/3 seasons. The deterministic runner reported no skipped actions.

## Interpretation

**Appian Persistence** converts road-first logistics, divided enemy coalitions, tactical adaptation, and refusal of premature terms into the strongest endurance result. Its weaker allied compact prevents infrastructure alone from dominating the score.

**Water and Reserves** produces the strongest water-and-maintenance profile and protects household endurance, but its narrower allied base limits the final compact score. It remains viable without becoming a disguised copy of the road-first strategy.

**Federated Endurance** earns the strongest total result through allied depth, coalition division, and a bounded Mediterranean doctrine. Its higher council and project costs leave fewer reserves, preserving a real price for federation.

**Command and Decision** is the narrowest successful route. Concentration, early battle, southern pressure, and maritime preparation create readiness at the expense of compact depth and strategic pressure. A score of 70 makes it viable but correctly less forgiving.

## Reproduction

Run:

```bash
npm test
npm run balance
```

The test suite enforces completion, score, action, project, priority, and doctrine invariants. The balance command fails the process when any Act V strategy falls below the release gate.

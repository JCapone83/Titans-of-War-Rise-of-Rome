# Regional Strategy Spine Balance Report

## Scope

This report covers the three-turn regional-planning continuation from the Latin settlement of 338 BC through 304 BC. It tests the shared city-regional economy, differentiated political statuses, multi-season roads, colonies, hostile access, and overextension. It does not claim to implement the later Samnite and Pyrrhic campaigns.

## Reference Results

| Doctrine | Overall | Regional score | Completed roads | Colonies | Final overextension |
| --- | ---: | ---: | ---: | ---: | ---: |
| Strategic Depth | 75 | 82 | 1 | 1 | 0 |
| Commercial Corridors | 88 | 92 | 1 | 0 | 0 |
| Reciprocal Alliance | 81 | 90 | 1 | 1 | 0 |

All three routes finish without skipped actions and score at least 70 in both the existing campaign judgment and the dedicated Regional Compact judgment.

## Design Findings

- Roads are not free bonuses. They consume stone, treasury, grain, and shared public capacity, take multiple seasons, and add hostile access when complete.
- Colonies remove settlers from Rome and require grain, treasury, bronze, and garrison manpower.
- Political arrangements do not collapse into one progression track. A compact can increase military contribution while reducing autonomy and raising revolt pressure.
- Existing city markets, granaries, defenses, stores, and treasury support the regional system. Commitments above that support create an explicit overextension penalty.
- Security, commerce, and alliance strategies use different councils and map actions. None requires conquest of every community.

## Verification

Run:

```bash
npm test
npm run balance
```

The regression suite includes road duration and hostile-access checks, colony population and resource costs, independent relationship metrics, overextension, save migration, and all three reference doctrines.

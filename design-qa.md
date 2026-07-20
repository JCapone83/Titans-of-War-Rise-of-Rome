# Campaign Home Design QA

## Visual Target

- Approved reference: `tiber-dawn-selected-mockup.png`
- Runtime artwork: `public/images/home/early-rome-tiber-dawn.png`
- Reference and live prototype were compared together at 1440 x 1024.
- The live composition preserves the approved full-bleed river settlement, quiet left-side copy field, upper brand and utility controls, campaign actions, and five-era chronology.

## Responsive Review

| Viewport | Result |
| --- | --- |
| 1440 x 1024 | Passed after correcting the title to the approved two-line treatment. |
| 1024 x 768 | Passed after moving the compact breakpoint so the full chronology remains visible. |
| 768 x 1024 | Passed with compact icon utilities and readable chronology labels. |
| 390 x 844 | Passed with the human, settlement, and river focal points retained. |
| 320 x 844 | Passed without clipped controls, overlapping text, or horizontal scrolling. |

## Interaction Review

- Continue Campaign restores the valid saved campaign and enters play.
- The in-game Home control returns to the campaign home without changing state.
- Historical Method, Credits and Rights, and Music open and close from the home screen.
- Music remains opt-in; opening the soundtrack does not begin playback.
- Buttons expose accessible names and modal state through the DOM.
- The browser console contained no application errors during the tested path.

## Residual Notes

- The generated opening artwork is an interpretive reconstruction, not a claim that this exact settlement is archaeologically documented.
- Native confirmation protects New Campaign when progress exists; automated destructive confirmation was intentionally not accepted during save-preservation QA.

final result: passed

# YouTube Playables certification preflight

## Proposed YouTube listing (not yet submitted)
**Title:** Quick Rummy
**Genre:** Card
**Description:** Play a fast solo Rummy variant against the computer. Draw, sort your hand by suit or rank, make runs and sets, and knock to score points. Includes optional sound and saved progress.

**Developer / publisher:** Jack Of Spades Marketing Games (enter this in the dedicated publisher/developer fields, not the title or description).

YouTube's design requirements prohibit developer branding or logos **in the listing title, description and thumbnails**. The standalone GitHub Pages game may use its full brand. YouTube listing images should show genuine gameplay or platform-compliant unbranded artwork; the existing branded promo artwork is NOT acceptable as a YouTube submission thumbnail without revision.

## Compliance and testing checklist

- [ ] Obtain approved developer-portal access. Playables access is currently early access.
- [ ] Download the successful ZIP artifact from the main-branch `YouTube Playables submission package` workflow.
- [ ] Verify ZIP root contains `index.html` and relative assets, not web-only share buttons or GitHub navigation.
- [ ] In the official Playables SDK Test Suite, check `firstFrameReady`, `gameReady`, SDK loading, cloud load/save, mute, pause/resume and errors.
- [ ] Test the Dev Link on YouTube desktop web, mobile web, Android app and iOS app.
- [ ] Verify a full match including knock scoring, restarting, backgrounding the app and resuming saved games.
- [ ] Test accessibility including small displays, touch controls and keyboard navigation where applicable.
- [ ] Create unbranded, truthful thumbnail images in every aspect ratio the portal requests; capture actual game imagery and check against design rules.
- [ ] Verify rights to all graphics, text, and sounds. The synthesized optional tones do not require licensed audio recordings.
- [ ] Submit through the portal *only after* the SDK Test Suite and manual checks pass. Submit for certification and await approval.

## Important limitations
GitHub Actions tests are local preflight only. They do not execute in an authenticated YouTube Playables host, confirm developer eligibility, validate portal thumbnails or authorize certification. No YouTube approval or release has occurred.

## References
- https://developers.google.com/youtube/gaming/playables/certification/requirements_design
- https://developers.google.com/youtube/gaming/playables/reference/test_suite_guide
- https://developers.google.com/youtube/gaming/playables/developer_portal
- https://developers.google.com/youtube/gaming/playables/certification/requirements_integration

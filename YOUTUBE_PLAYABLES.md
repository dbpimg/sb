# YouTube Playables Integration — Sprint 5

## Architecture
- Standalone web game remains at repository root `index.html` and GitHub Pages at https://dbpimg.github.io/sb/
- Platform-specific game at `youtube/index.html`; it loads the official YouTube SDK first and only uses the `ytgame` API inside the Playables environment.
- SDK signals `firstFrameReady()`, then loads cloud data via `loadData()`, restores game state, renders playable cards, and calls `gameReady()`.
- In the YouTube environment, game state is saved exclusively via YouTube `saveData()` (not localStorage). Saves are serialized in order and not attempted before initial cloud load succeeds. If cloud loading fails, game runs as a temporary session without cloud writes.
- Pause/resume callbacks stop and restart delayed AI turns; audio respects platform mute state.

## How to prepare a submission
1. Read Google's official integration and certification requirements. Ensure developer access to the YouTube Playables portal is approved (early access).
2. Package **only the files needed for the game**, with `youtube/index.html` copied to the ZIP root as `index.html`. Do not package the repository's GitHub Pages root index accidentally.
3. Confirm all game-asset paths are relative, bundle size meets limits, and the sole externally loaded script is the official SDK.
4. Run official Playables local/portal test suite (not yet done here), inspect cloud saving, paused input, audio, and frame readiness.
5. Upload the ZIP, title, genre, description and appropriate actual-game thumbnails in the authorized YouTube Playables Developer Portal.
6. Wait for YouTube certification, then verify the accepted release before claiming publication.

## Current validation
Local GitHub Actions tests check SDK placement, JavaScript syntax, lifecycle hooks and existing Rummy game rules. **These are not substitutes for official Playables SDK testing.** YouTube approval, certification and publishing have not occurred.

## References
- https://developers.google.com/youtube/gaming/playables/reference/getting_started
- https://developers.google.com/youtube/gaming/playables/certification/requirements_integration
- https://developers.google.com/youtube/gaming/playables/certification/requirements_stability
- https://developers.google.com/youtube/gaming/playables/developer_portal

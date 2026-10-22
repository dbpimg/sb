# Quick Rummy public beta checklist

## Hosting
Repository: dbpimg/sb. Intended public URL, **only after Pages is enabled and a deployment succeeds**: https://dbpimg.github.io/sb/

In GitHub open **Settings → Pages → Build and deployment**, select **Source: GitHub Actions**. Then use **Actions → Publish Quick Rummy beta → Run workflow** if no deployment happened automatically. Check the workflow and its deployed URL; do not claim the site is published until confirmed live.

## Manual acceptance checklist
- [ ] Desktop Chrome: stock draw, selection, discard, continue and AI move
- [ ] Mobile Safari and Chrome: cards fit, touch targets work, no horizontal scrolling
- [ ] Select the discard pile's only card; empty placeholder renders until discarding
- [ ] Cannot discard the exact card just drawn from the discard pile
- [ ] Knock available only with <=10 deadwood; check Gin and undercut scoring
- [ ] Continue after an AI turn; play at least one full match to 100 points
- [ ] Reload in draw, drop, knock, AI, and completed-round states
- [ ] New match resets scores; browser storage removal resets saved progress
- [ ] Browser console shows no uncaught errors
- [ ] Verify accessible keyboard focus, readable contrast, and on-screen status changes

## Platform notes
GitHub Pages is for the independent browser beta; it is **not** a YouTube Playables submission. YouTube integration requires platform SDK, lifecycle compliance, and review. No real-money play or gambling.

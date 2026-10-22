# Jack of Spades — Quick Rummy

An original, free-to-play **seven-card Quick Rummy** browser game. Single-player versus a computer opponent. No build tools, accounts, external assets, paid APIs, or backend required.

## Play locally
Download or clone this repository and open `index.html` in a modern browser. For a local HTTP server: `python3 -m http.server 8000` then visit `http://localhost:8000`.

## Rules
Each player starts with seven cards. Draw from the stock or discard pile, then discard. Form three-plus-card same-rank sets or consecutive same-suit runs (aces low). Remaining unmatched card values are deadwood (aces 1, face cards 10). You can knock at 10 or fewer deadwood. Gin at zero deadwood earns a 15-point bonus; an opponent undercut earns 10. First player to 100 points wins.

This is a custom **Quick Rummy** ruleset, not a claim of official tournament Gin Rummy rules.

## Current implementation
- Seven-card deals and animated-by-state mobile-responsive card buttons
- Stock and discard piles, restriction on immediately re-discarding a drawn discard-pile card
- Meld/deadwood evaluation, computer decisions, round scoring and first-to-100 match flow
- Local browser progress save with `localStorage`
- Self-contained HTML/CSS/JavaScript; all code runs in the browser

## Known limitations and release gates
- Needs automated unit tests and cross-browser hands-on testing, especially endgame edge cases.
- Computer AI is a simple heuristic; no difficulty selector yet.
- No game analytics, accessibility audit, sound effects, or privacy policy.
- Game state currently saves locally only; clearing browser storage erases progress.
- **Not yet YouTube Playables certified or submitted.** YouTube Playables requires the appropriate SDK integration, lifecycle/audio/persistence checks, review, and platform approval. Do not claim the independent HTML game is already a YouTube-ready package.
- Ad monetization should be integrated only after confirming each host platform's specific rules.

## Deployment
For a simple standalone hosting deployment, serve `index.html` as the website root. GitHub Pages, suitable static hosting, or a compliant commercial web host can work. GitHub Pages must be explicitly enabled by repository maintainers; adding this file does not create a live website automatically.

## Roadmap
1. Automated testing and gameplay bug fixes.
2. Better computer strategy and daily challenge.
3. Optional sound, motion, accessibility and responsive UI refinements.
4. A separate YouTube Playables SDK adapter/build (do not introduce dependency on YouTube into the regular web version).
5. Public beta and compliant monetization integrations.

Brand: **Jack of Spades Games**. No gambling or real-money wagering.
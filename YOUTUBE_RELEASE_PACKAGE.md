# YouTube Playables — Submission Packaging

Run `python3 scripts/package_youtube.py` at the repository root. It builds `dist/quick-rummy-youtube.zip`. **Do not upload a ZIP containing the GitHub Pages root game.** This build uses the separate YouTube-adapted `youtube/index.html` as the ZIP-root `index.html` and includes only its locally referenced icon.

The GitHub Actions workflow **YouTube Playables submission package** runs game validation and publishes the ZIP as a downloadable workflow artifact. Use the artifact built on the intended release commit.

## Size & path gates
The packaging script checks initial and total raw bundle sizes, individual file sizes, filenames, presence of the official SDK, no off-platform app links, and ZIP readability. Google's published Playables limits include an initial bundle under 30 MiB, total under 250 MiB, every file under 30 MiB, saved game under 3 MiB, and relative references for bundled game files. These checks are an initial screening, **not official platform certification**.

## Before submitting
- Download the ZIP from the successful GitHub Actions run and inspect that it contains `index.html` at the archive root.
- Run the official YouTube Playables SDK Test Suite with the ZIP contents served locally or with a portal test build.
- Validate cloud saves, resume/pause, platform audio, mobile iOS/Android, and first-frame/game-ready integration in the YouTube host environment.
- Confirm approval to use the Playables Developer Portal and provide accurate title, description, developer/publisher details and genuine current-game thumbnails.
- Obtain YouTube approval before claiming the game is available as a YouTube Playable.

See https://developers.google.com/youtube/gaming/playables/certification/requirements_stability and https://developers.google.com/youtube/gaming/playables/developer_portal.

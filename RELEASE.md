# Release process — Quick Rummy

## Current track
Public browser game at **https://dbpimg.github.io/sb/**, hosted by GitHub Pages. Production source: `main`. This is a web release; **it is not a YouTube Playables approval or submission**.

## Publication gates
1. GitHub Actions smoke + gameplay checks pass on the proposed commit.
2. Publishing workflow passes on **main** at the same commit.
3. Manually open the live website after the workflow and verify visible title, stock draw, discard, turn progression, sort modes, sound toggle, knock, scoring, and refresh/resume.
4. Check at least one desktop browser and one real mobile browser.
5. Verify navigation, keyboard focus, reduced-motion mode, and no uncaught browser-console errors.
6. Verify policy and sharing metadata; review the privacy disclosure for any newly added SDK.
7. Only then label the release verified publicly.

## Update and rollback
For a bad release, revert the release commit on `main` using a PR, wait for both CI and Pages workflow success, then reload the site and verify the previous version is restored. Preserve the existing save key and storage schema across hotfixes unless migration is intentionally tested.

## Before outreach
Create an original social preview image and screenshots from the **actual game**; do not market concept art as screenshots. Prepare a short gameplay video, mobile screenshots, release announcement, and testing feedback path. Review game branding and rights to graphics/sounds before distribution.

## Known risks
- The browser's local storage may be cleared by the user or browser.
- Current GitHub Actions tests cover rules and initialization, not full end-to-end browser match simulations.
- Automated GitHub Pages success is not proof that every browser can play an entire match.
- The short knock window may require accessibility/usability improvements.
- No YouTube SDK, advertising, analytics, backend, or account services are enabled.

# Landing Page Handoff — 2026-04-08

## What this repo is

Static marketing site at `sonorus-labs.com`. Pure HTML + CSS + ~15-line inline IntersectionObserver script. No framework, no build step.

- **Hosted on Netlify** (repo is named `sonorus-labs.github.io` but GitHub Pages is disabled — Netlify is connected to this Git repo)
- **Netlify Forms** work (`data-netlify="true"` on the waitlist form)
- **Product app** lives separately at `demo.sonorus-labs.com` on Railway
- Two files own everything: `index.html` and `styles.css`

---

## What just happened

Full V2 landing page rewrite. Three commits, not yet pushed:

| Commit | What |
|--------|------|
| `6662a67` | V2 rewrite — new copy, prompt marquee, 5 pillars, scroll reveals, deleted request-demo/ |
| `46b1109` | Added prompt showcase, "Why Sonorus" section, FAQ accordion |
| `116344d` | Fixed key name casing (`text-transform: uppercase` was mangling "Em" to "EM") |

**Run `git push` to deploy** — Netlify auto-deploys on push to main.

---

## Outstanding tasks

1. **Push** — 3 commits ahead of origin, not live yet
2. **Hero screenshot** — `assets/hero-v2.png` is missing. The `<img>` has `onerror` fallback to `assets/mvp_v1.png`. Drop in a V2 canvas screenshot when ready.
3. **Google search result** — still shows the old Lovable title "Your AI-Powered Creative Conductor". The `<title>` tag is already updated to "Sonorus — AI Songwriting Studio". Request a recrawl in Google Search Console, or wait for natural reindex.
4. **Em dashes** — user wants a pass replacing ` — ` with plain ` - ` or restructured sentences.

---

## Current page structure

1. Nav — logo + "Start Writing" → demo.sonorus-labs.com
2. Hero — "Your AI songwriting studio." + dot-separated feature labels + hero screenshot
3. Prompt Marquee — CSS-only scroll strip of real prompt examples
4. Feature Pillars — 5 cards, flex grid (3+2 centered on desktop)
5. How It Works — 4 numbered steps
6. Prompt Showcase — 6 cards: prompt → key/section/BPM → chord chips
7. Why Sonorus — 3 differentiators ("Not another AI gimmick")
8. FAQ — 5 questions, native `<details>` accordion (no JS)
9. Final CTA — dark card, "Start Writing"
10. Waitlist — Netlify form, "Get notified when we officially launch"
11. Footer

---

## Behaviour rules

**Content:**
- No vanity metrics — don't put "115+ templates", "12 genres", "4 modes" anywhere. Internal engine details, not selling points.
- Waitlist = launch notification. "Get notified when we officially launch." Not "early access" or "beta" — the product is already live and free.
- Musician-first language — "chord progression", "verse and chorus", "DAW". Not "audio content", "segments", "music software".
- No em dashes (` — `). Plain hyphens or restructured sentences.

**CSS:**
- Never `text-transform: uppercase` on content containing chord/key names — case is semantically meaningful (Em ≠ EM, Bb ≠ BB).
- The `.reveal` class applies `transform`, which creates a CSS stacking context. If a `.reveal` element needs to layer above a parent pseudo-element via `z-index`, set `z-index` on the `.reveal` element itself. See `.step-item { z-index: 2 }` — fixes the How It Works connecting line painting over the numbered circles.
- Design system is in `:root` custom properties — don't change them. Instrument Serif (headings), Work Sans (body), cream/sage palette.

---

## File map

```
index.html          — entire page
styles.css          — all styles
assets/logo.svg     — wordmark
assets/mvp_v1.png   — V1 screenshot (hero fallback)
assets/hero-v2.png  — MISSING, needs V2 canvas screenshot
LANDING_PAGE_CONTENT_SPEC.md  — copy options and content guidance
docs/superpowers/plans/2026-04-02-landing-page-v2.md  — implementation plan
```

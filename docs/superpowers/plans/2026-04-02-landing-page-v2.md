# Landing Page V2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Update the static landing page at sonorus-labs.com to reflect the V2 product — a structured songwriting canvas (not just a single-shot chord generator). All content, design, and section structure update. Remains pure static HTML/CSS with minimal JS for scroll animations.

**Architecture:** Single-page static site. Two primary files: `index.html` (structure + content) and `styles.css` (design system + component styles). Tiny inline `<script>` for IntersectionObserver scroll reveals. No build step, no framework. Hosted on Netlify (connected to this Git repo).

**Tech Stack:** HTML5, CSS3 (custom properties, flex/grid, keyframe animations), vanilla JS (~15 lines for scroll reveals), Google Fonts (Instrument Serif + Work Sans — kept from V1).

**Content Spec:** All copy selections drawn from `LANDING_PAGE_CONTENT_SPEC.md`. Each section below notes which option was chosen.

**Asset:** `assets/hero-v2.png` will be provided — a screenshot of the V2 canvas in Studio Warm design.

---

## Page Structure (V1 → V2)

```
V1                          V2
─────────────────           ─────────────────
1. Nav                      1. Nav (updated CTA text)
2. Hero                     2. Hero (new copy, feature badges, new screenshot)
                            3. Prompt Examples Marquee (NEW)
3. Feature Pillars (4)      4. Feature Pillars (5, new content)
4. How It Works (4 steps)   5. How It Works (4 steps, updated content)
5. Final CTA                6. Final CTA (updated copy)
6. Waitlist                 7. Waitlist (launch notification copy)
7. Footer                   8. Footer (unchanged)
```

## Design Direction: "Warm Editorial" Evolution

Keep the existing DNA — cream/sage palette, Instrument Serif + Work Sans, generous whitespace. Evolve it to feel more confident and substantial for a mature product:

- **Hero gradient**: Subtle radial sage glow behind the hero for depth
- **Feature badges**: Small pills between CTAs and hero image showing key capabilities
- **Prompt marquee**: CSS-only auto-scrolling strip of real example prompts — the signature "show don't tell" element
- **Scroll reveals**: Elements fade-up on viewport entry (IntersectionObserver + CSS transitions)
- **5-pillar grid**: Flex layout with 3+2 centered on desktop, 2-col on tablet, 1-col on mobile
- **New SVG icons**: One per pillar — sparkle, wand, grid, play circle, layers

No new fonts, no new colors, no new dependencies. Pure evolution.

---

### Task 1: CSS Foundation Update

**Files:**
- Modify: `styles.css` (lines 1-70, custom properties and base styles)

- [ ] **Step 1: Add new CSS keyframes and reveal utility**

Add the marquee keyframe and reveal utility at the end of the file (before the media queries section, around line 807):

```css
/* --- Marquee Animation --- */

@keyframes marquee-scroll {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

/* --- Scroll Reveal --- */

.reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.7s ease, transform 0.7s ease;
}

.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}
```

- [ ] **Step 2: Verify CSS is valid**

Open `styles.css` in browser via the page — no visual changes yet, just confirming no syntax errors break existing styles.

- [ ] **Step 3: Commit**

```bash
git add styles.css
git commit -m "feat: add marquee keyframe and scroll reveal utilities to CSS"
```

---

### Task 2: HTML Head + Nav Update

**Files:**
- Modify: `index.html` (lines 1-25)

- [ ] **Step 1: Update `<head>` with new title and meta tags**

Replace the existing `<head>` (lines 3-9) with:

```html
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sonorus — AI Songwriting Studio</title>
    <meta name="description" content="From prompt to full song in minutes. Sonorus generates chord progressions with real music theory, then gives you a canvas to shape your song with AI editing, chord diagrams, and instant playback.">
    <meta property="og:title" content="Sonorus — AI Songwriting Studio">
    <meta property="og:description" content="Generate, edit, and arrange chord progressions with AI that understands harmony. Full-song MIDI export ready for your DAW.">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://sonorus-labs.com">
    <link rel="stylesheet" href="styles.css">
    <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Work+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
</head>
```

- [ ] **Step 2: Update nav CTA text**

Change the nav button text from "Try Now" to "Start Writing" (line 19 area):

```html
<a href="https://demo.sonorus-labs.com" class="btn-primary btn-nav">
    Start Writing
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" class="button-arrow">
        <path d="M6 12L10 8L6 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
</a>
```

- [ ] **Step 3: Verify in browser**

Open index.html — tab title should say "Sonorus — AI Songwriting Studio", nav should say "Start Writing".

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "feat: update head meta tags and nav CTA for V2"
```

---

### Task 3: Hero Section Rewrite

**Files:**
- Modify: `index.html` (hero section, lines 28-47)
- Modify: `styles.css` (hero styles + new badge styles)

Content choices from spec:
- Headline: "Your AI songwriting studio." (option 3)
- Subtitle: "Describe your vibe..." (option 2)
- Primary CTA: "Start Writing" → demo.sonorus-labs.com
- Secondary CTA: "Join Waitlist" → #waitlist

- [ ] **Step 1: Replace hero HTML**

Replace the entire `<!-- Hero Section -->` (lines 28-47) with:

```html
<!-- Hero Section -->
<section class="hero-section" aria-labelledby="hero-heading">
    <div class="hero-container">
        <h1 id="hero-heading" class="reveal">Your <span class="text-accent">AI songwriting</span> studio.</h1>
        <p class="hero-subtitle reveal">Describe your vibe. Sonorus builds the chord progression, section by section. Edit with AI, pick chords by ear, transpose keys, and export MIDI — all in one workspace.</p>

        <div class="hero-cta-group reveal">
            <a href="https://demo.sonorus-labs.com" class="btn-primary">
                Start Writing
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" class="button-arrow">
                    <path d="M6 12L10 8L6 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </a>
            <a href="#waitlist" class="btn-secondary">Join Waitlist</a>
        </div>

        <div class="hero-badges reveal">
            <span class="hero-badge">AI Editing</span>
            <span class="hero-badge">MIDI Export</span>
            <span class="hero-badge">Chord Diagrams</span>
            <span class="hero-badge">Instant Playback</span>
        </div>

        <div class="hero-image-wrapper reveal">
            <img src="assets/hero-v2.png" alt="Sonorus V2 songwriting canvas — multiple song sections with chord grids, playback controls, and harmonic-function colors" class="hero-image"
                 onerror="this.src='assets/mvp_v1.png'" />
        </div>
    </div>
</section>
```

Note: The `onerror` fallback shows the V1 screenshot as a temporary safety net until `assets/hero-v2.png` is confirmed present.

- [ ] **Step 2: Add hero CSS enhancements**

Update the existing `.hero-section` rule (around line 440) to add the gradient:

```css
.hero-section {
  padding: 8rem 0 4rem;
  text-align: center;
  background: radial-gradient(ellipse at 50% 0%, rgba(195, 218, 217, 0.25) 0%, transparent 60%);
}
```

Add these new rules after the `.hero-image` rule (around line 490):

```css
/* --- Hero Badges --- */

.hero-badges {
  display: flex;
  gap: 0.625rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 2.5rem;
}

.hero-badge {
  display: inline-block;
  padding: 0.375rem 1rem;
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border-light);
  border-radius: 9999px;
  font-family: var(--font-sans);
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--color-text-secondary);
  letter-spacing: 0.02em;
}
```

- [ ] **Step 3: Verify in browser**

Open index.html — hero should show new headline "Your AI songwriting studio.", subtitle about vibes, two CTAs, four badge pills, and the screenshot.

- [ ] **Step 4: Commit**

```bash
git add index.html styles.css
git commit -m "feat: rewrite hero section with V2 content and feature badges"
```

---

### Task 4: Prompt Examples Marquee (New Section)

**Files:**
- Modify: `index.html` (add new section after hero, before pillars)
- Modify: `styles.css` (add marquee styles)

- [ ] **Step 1: Add marquee HTML**

Insert this new section between the closing `</section>` of the hero and the opening `<!-- Product Pillars Section -->`:

```html
<!-- Prompt Examples Marquee -->
<section class="marquee-section" aria-hidden="true">
    <div class="marquee-track">
        <span class="marquee-pill">"dreamy verse in Em"</span>
        <span class="marquee-pill">"upbeat funk chorus"</span>
        <span class="marquee-pill">"melancholy piano ballad"</span>
        <span class="marquee-pill">"jazz bridge in Bb"</span>
        <span class="marquee-pill">"anthemic rock chorus"</span>
        <span class="marquee-pill">"lo-fi hip hop intro"</span>
        <span class="marquee-pill">"dark minor bridge"</span>
        <span class="marquee-pill">"bright Mixolydian verse"</span>
        <span class="marquee-pill">"bossa nova outro"</span>
        <span class="marquee-pill">"indie folk pre-chorus"</span>
        <!-- Duplicate for seamless loop -->
        <span class="marquee-pill">"dreamy verse in Em"</span>
        <span class="marquee-pill">"upbeat funk chorus"</span>
        <span class="marquee-pill">"melancholy piano ballad"</span>
        <span class="marquee-pill">"jazz bridge in Bb"</span>
        <span class="marquee-pill">"anthemic rock chorus"</span>
        <span class="marquee-pill">"lo-fi hip hop intro"</span>
        <span class="marquee-pill">"dark minor bridge"</span>
        <span class="marquee-pill">"bright Mixolydian verse"</span>
        <span class="marquee-pill">"bossa nova outro"</span>
        <span class="marquee-pill">"indie folk pre-chorus"</span>
    </div>
</section>
```

- [ ] **Step 2: Add marquee CSS**

Add after the hero badge styles in `styles.css`:

```css
/* --- Prompt Marquee --- */

.marquee-section {
  overflow: hidden;
  padding: 1.75rem 0;
  background: var(--color-bg-secondary);
  border-top: 1px solid var(--color-border-light);
  border-bottom: 1px solid var(--color-border-light);
}

.marquee-track {
  display: flex;
  gap: 1rem;
  width: max-content;
  animation: marquee-scroll 45s linear infinite;
}

.marquee-track:hover {
  animation-play-state: paused;
}

.marquee-pill {
  display: inline-block;
  padding: 0.5rem 1.25rem;
  background: var(--color-bg-primary);
  border: 1px solid var(--color-border-light);
  border-radius: 9999px;
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 0.95rem;
  color: var(--color-text-secondary);
  white-space: nowrap;
}
```

- [ ] **Step 3: Verify in browser**

The marquee should auto-scroll left continuously with prompt pills in italic serif. Hovering pauses the scroll. The content should loop seamlessly.

- [ ] **Step 4: Commit**

```bash
git add index.html styles.css
git commit -m "feat: add prompt examples marquee strip"
```

---

### Task 5: Feature Pillars Rewrite (5 Cards)

**Files:**
- Modify: `index.html` (pillars section, around lines 49-105)
- Modify: `styles.css` (update pillar grid from `grid` to `flex`)

Content choices from spec:
- Section headline: "Everything you need to write your next song." (option 1)
- Section subtitle: "From first idea to finished MIDI export..." (option 1)
- 5 pillars with specific copy (see below)

- [ ] **Step 1: Replace pillars HTML**

Replace the entire `<!-- Product Pillars Section -->` with:

```html
<!-- Feature Pillars Section -->
<section class="pillars-section" aria-labelledby="pillars-heading">
    <div class="pillars-container">
        <header class="section-header reveal">
            <h2 id="pillars-heading">Everything you need to write your <span class="text-accent">next song</span>.</h2>
            <p class="section-subtitle">From first idea to finished MIDI export — Sonorus handles the music theory so you can focus on the music.</p>
        </header>

        <div class="pillars-grid">
            <article class="pillar-card reveal">
                <div class="pillar-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 3L13.5 8.5L19 10L13.5 11.5L12 17L10.5 11.5L5 10L10.5 8.5L12 3Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
                        <path d="M19 3L19.75 5.25L22 6L19.75 6.75L19 9L18.25 6.75L16 6L18.25 5.25L19 3Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
                    </svg>
                </div>
                <h3>Describe it, hear it</h3>
                <p>Type a mood, genre, or vibe. Sonorus generates a musically coherent chord progression grounded in real harmony and voice-leading rules.</p>
            </article>

            <article class="pillar-card reveal">
                <div class="pillar-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 21L13 11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                        <path d="M15 3L16.5 6.5L20 8L16.5 9.5L15 13L13.5 9.5L10 8L13.5 6.5L15 3Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
                    </svg>
                </div>
                <h3>Refine with words, not menus</h3>
                <p>Natural-language editing powered by AI. Describe the change you want and Sonorus modifies your chords while keeping the rest of your progression intact.</p>
            </article>

            <article class="pillar-card reveal">
                <div class="pillar-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="3" y="3" width="7.5" height="7.5" rx="1.5" stroke="currentColor" stroke-width="1.5"/>
                        <rect x="13.5" y="3" width="7.5" height="7.5" rx="1.5" stroke="currentColor" stroke-width="1.5"/>
                        <rect x="3" y="13.5" width="7.5" height="7.5" rx="1.5" stroke="currentColor" stroke-width="1.5"/>
                        <rect x="13.5" y="13.5" width="7.5" height="7.5" rx="1.5" stroke="currentColor" stroke-width="1.5"/>
                    </svg>
                </div>
                <h3>Pick chords by ear and eye</h3>
                <p>A chord palette that knows music theory — chords are grouped by harmonic function and colored by tension. Switch between guitar tabs and piano diagrams instantly.</p>
            </article>

            <article class="pillar-card reveal">
                <div class="pillar-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.5"/>
                        <path d="M10 8.5L16 12L10 15.5V8.5Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
                    </svg>
                </div>
                <h3>Hear it. Export it. Finish it.</h3>
                <p>Play back any section or your entire song arrangement with live chord highlighting. Export the full song as MIDI — sections, repeats, and all — ready for your DAW.</p>
            </article>

            <article class="pillar-card reveal">
                <div class="pillar-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
                        <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
                <h3>Build real song structures</h3>
                <p>Add Verses, Choruses, Bridges, Intros, Outros — each with their own chords, key, and repeat count. Arrange them into a full song, not just a single loop.</p>
            </article>
        </div>
    </div>
</section>
```

- [ ] **Step 2: Update pillar grid CSS**

Replace the existing `.pillars-grid` rule (around line 504) with flex layout for 5-card support:

```css
.pillars-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  justify-content: center;
}

.pillar-card {
  flex: 0 0 calc(33.333% - 1rem);
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border-light);
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(23, 23, 23, 0.06);
  transition: all 0.3s ease;
}
```

Also update the responsive rules (around line 811):

At `@media (max-width: 1024px)`:
```css
.pillar-card {
  flex: 0 0 calc(50% - 0.75rem);
}
```

At `@media (max-width: 640px)`:
```css
.pillar-card {
  flex: 0 0 100%;
}
```

- [ ] **Step 3: Verify in browser**

Desktop: 5 cards, 3 on top row + 2 centered on bottom. Tablet: 2-col. Mobile: single column. Each card has a new icon and V2 copy.

- [ ] **Step 4: Commit**

```bash
git add index.html styles.css
git commit -m "feat: rewrite feature pillars with 5 V2 capabilities"
```

---

### Task 6: How It Works Update

**Files:**
- Modify: `index.html` (steps section, around lines 108-141)

Content choices from spec:
- Headline: "From idea to MIDI in four steps"
- Subtitle: "No theory degree required."
- Steps: Alt/short versions for punchy delivery

- [ ] **Step 1: Replace steps HTML**

Replace the entire `<!-- How It Works Section -->` with:

```html
<!-- How It Works Section -->
<section class="steps-section" aria-labelledby="steps-heading">
    <div class="steps-container">
        <header class="section-header reveal">
            <h2 id="steps-heading">From idea to MIDI in <span class="text-accent">four steps</span></h2>
            <p class="section-subtitle">No theory degree required.</p>
        </header>

        <div class="steps-grid">
            <article class="step-item reveal">
                <div class="step-number">01</div>
                <h3>Start a song</h3>
                <p>Name it, set the vibe, and describe your first section. Sonorus handles the rest.</p>
            </article>

            <article class="step-item reveal">
                <div class="step-number">02</div>
                <h3>Generate harmony</h3>
                <p>One click generates a full chord progression matched to your mood, genre, and section type.</p>
            </article>

            <article class="step-item reveal">
                <div class="step-number">03</div>
                <h3>Shape your sound</h3>
                <p>Swap chords from the color-coded picker, ask the AI to "make it darker", duplicate sections, transpose keys — all in one canvas.</p>
            </article>

            <article class="step-item reveal">
                <div class="step-number">04</div>
                <h3>Export and produce</h3>
                <p>When it sounds right, export. Your full multi-section arrangement becomes a single MIDI file ready for any DAW.</p>
            </article>
        </div>
    </div>
</section>
```

- [ ] **Step 2: Verify in browser**

Four steps with updated copy. Layout unchanged from V1 (horizontal with connecting line on desktop, stacked on mobile).

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: update How It Works steps with V2 content"
```

---

### Task 7: Final CTA + Waitlist + Footer Update

**Files:**
- Modify: `index.html` (CTA, waitlist, and footer sections)

Content choices from spec:
- CTA headline: "Your next chorus is one prompt away." (option 2)
- CTA subtitle: "Free to use. No account required to try it." (option 1)
- CTA button: "Start Writing"
- Waitlist: Positioned as launch notification

- [ ] **Step 1: Replace Final CTA HTML**

Replace the `<!-- Final CTA Section -->` with:

```html
<!-- Final CTA Section -->
<section class="final-cta-section" aria-labelledby="cta-heading">
    <div class="cta-card reveal">
        <h2 id="cta-heading">Your next chorus is one prompt away.</h2>
        <p>Free to use. No account required to try it.</p>

        <div class="cta-actions">
            <a href="https://demo.sonorus-labs.com" class="btn-cta-primary">
                Start Writing
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" class="button-arrow">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </a>
        </div>
    </div>
</section>
```

- [ ] **Step 2: Update waitlist copy**

Replace the waitlist label and privacy note:

```html
<p class="waitlist-label">Get notified when we officially launch</p>
```

```html
<p class="form-privacy">We'll only email you once — when we launch.</p>
```

- [ ] **Step 3: Verify in browser**

CTA card shows "Your next chorus is one prompt away." with "Start Writing" button. Waitlist says "Get notified when we officially launch".

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "feat: update CTA and waitlist copy for V2 launch positioning"
```

---

### Task 8: Scroll Reveal Animations

**Files:**
- Modify: `index.html` (add inline script before `</body>`)

- [ ] **Step 1: Add IntersectionObserver script**

Add this just before the closing `</body>` tag:

```html
<!-- Scroll Reveal -->
<script>
  document.addEventListener('DOMContentLoaded', function() {
    var reveals = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
      reveals.forEach(function(el) { el.classList.add('visible'); });
      return;
    }
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    reveals.forEach(function(el) { observer.observe(el); });
  });
</script>
```

Note: Uses `function` syntax (not arrow functions) for maximum browser compatibility. Includes fallback — if IntersectionObserver isn't available, all elements become visible immediately.

- [ ] **Step 2: Verify in browser**

Scroll down the page. Each section should fade up as it enters the viewport. The hero should be visible on load (it's above the fold). Elements below the fold should animate in as you scroll.

- [ ] **Step 3: Verify reduced motion preference**

The existing `prefers-reduced-motion` media query in styles.css (line 947) already sets all `transition-duration` to 0.01ms, which disables the reveal animation for users who prefer reduced motion. Confirm this works.

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "feat: add scroll reveal animations with IntersectionObserver"
```

---

### Task 9: Responsive Polish + Cleanup

**Files:**
- Modify: `styles.css` (responsive media queries)
- Delete: `request-demo/` directory (obsolete — product is live and free)

- [ ] **Step 1: Update responsive rules for new sections**

Ensure the media queries section in `styles.css` includes rules for all new components. The key additions needed:

At `@media (max-width: 1024px)`:
```css
.pillar-card {
  flex: 0 0 calc(50% - 0.75rem);
}
```

At `@media (max-width: 640px)`:
```css
.pillar-card {
  flex: 0 0 100%;
}

.hero-badges {
  gap: 0.5rem;
}

.hero-badge {
  font-size: 0.75rem;
  padding: 0.3rem 0.75rem;
}
```

- [ ] **Step 2: Remove V1-specific CSS that's no longer needed**

The old `.pillars-grid` used `grid-template-columns: repeat(4, 1fr)` — this was replaced with flex in Task 5. Verify the old grid rule is gone.

- [ ] **Step 3: Delete request-demo/ directory**

```bash
rm -rf request-demo/
```

This page is obsolete — the product is live at demo.sonorus-labs.com and free to use.

- [ ] **Step 4: Test at all breakpoints**

Open browser dev tools. Check at: 1440px (desktop), 1024px (tablet landscape), 768px (tablet), 640px (phone landscape), 480px (phone), 375px (small phone).

Key things to verify:
- Hero headline wraps cleanly on mobile
- Feature badges wrap on small screens
- 5 pillar cards: 3+2 → 2+2+1 → 1 column
- Marquee scrolls without overflow issues
- CTA card padding reduces on mobile
- All text remains readable

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore: responsive polish, remove obsolete request-demo page"
```

---

## Post-Implementation Notes

### Asset
- `assets/hero-v2.png` — V2 canvas screenshot in Studio Warm design (cream background, white section cards with teal accents, chord grid with harmonic-function gradients). Recommended size: 2200x1400 for retina.
- Once confirmed, the `onerror` fallback on the hero img and `assets/mvp_v1.png` can both be removed.

### Future Enhancements (Not in This Plan)
These are content types suggested in the spec that could be added in a future iteration:
- Before/after comparison (V1 single generation vs V2 full canvas)
- Micro-demo GIF/video (10-second screen recording)
- Genre showcase cards (example prompts with output)
- FAQ accordion
- Inline annotated product screenshots
- Testimonial placeholder cards

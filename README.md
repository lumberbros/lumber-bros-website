# Lumber Bros. — Design Handoff

**Developer handoff package for the Lumber Bros. marketing website.**
Read this document end-to-end before opening any code files. Then read `BUILD_BRIEF.md` for scope, stack, SEO, accessibility, and performance requirements.

---

## Important: what these files are

The HTML files in this package are **design references built with React + in-browser Babel** — they show intended look, layout, copy, and interactions precisely. They are **not** meant to be deployed as-is.

Your job is to **recreate these designs in a production codebase** using your preferred stack (see `BUILD_BRIEF.md` §3 — Astro is the top recommendation). Port the component structure, CSS classes, and design tokens faithfully; discard the Babel/CDN React scaffolding.

---

## How to preview the designs

Open `index.html` or `tree-removal.html` in a browser. They load React + Babel from CDN and self-render. If fonts look wrong, serve with a local server instead of `file://`:

```
npx serve .
```

---

## File structure

```
lb_handoff/
│
├── README.md                      ← This file
├── BUILD_BRIEF.md                 ← Full scope, stack, SEO, a11y, perf brief
│
├── index.html                     ← Homepage design reference
├── tree-removal.html              ← Tree Removal LP design reference
├── site.css                       ← Layout primitives + component classes
├── colors_and_type.css            ← ALL design tokens (color, type, spacing, motion)
│
├── components/
│   ├── Shared.jsx                 ← Button, Chip, TrustSignals, Photo, Logo, Icon,
│   │                                  SiteHeader, SiteFooter, QuoteForm, ReviewCard, MarqueeStrip
│   ├── Homepage.jsx               ← HomeHero, HomeServices (ServiceLine, SecondaryService,
│   │                                  PhotoCarousel), HomeFinalCTA
│   └── TreeRemoval.jsx            ← TRHero, TRTrustBar, TRReviews, TRHowItWorks,
│                                      TRSaveCallout, TRRecentWork, TRDifferent,
│                                      TRServiceAreas, TRFaq, TRFinalCTA, FAQRow
│
├── fonts/
│   ├── BooksellerCp-RegularBold.otf      ← Display face (H1, H2, hero)
│   ├── EncodeSansSemiExpanded-*.ttf      ← Body/UI face, 9 weights (100–900)
│   ├── InstrumentSerif-*.ttf             ← Serif alt (italic value props)
│   └── LobsterTwo-*.ttf                  ← Script (decorative, use sparingly)
│
├── assets/
│   ├── logo.svg                          ← Master wordmark, navy on transparent
│   ├── Leaf.svg                          ← Marquee leaf icon
│   ├── isa_logo.png                      ← ISA credential badge
│   ├── nc_forestry_association_logo.png  ← NCFA credential badge
│   ├── lumber_bros_loop.webm             ← Brand video loop (Tree Removal LP hero)
│   ├── lumber_bros_loop.mp4              ← Brand video loop (Safari fallback)
│   ├── pine-tree-removal-before-after.webp ← Recent work carousel, slide 1
│   └── photos/                           ← 93 reference photos (webp)
│
└── source/
    ├── Homepage Copy.md           ← Original client copy — do not paraphrase
    └── Tree Removal LP Copy.md    ← Original client copy — do not paraphrase
```

---

## Pages

### 1. Homepage — `index.html`

**Purpose:** Brand statement + three service lines. Routes high-intent visitors toward a quote.

**Page composition (top → bottom):**

| Section | Component | Notes |
|---|---|---|
| Sticky header | `SiteHeader` | Shrinks on scroll; hamburger drawer on mobile |
| Hero | `HomeHero` | Large display headline + deck copy |
| Services | `HomeServices` | 2 full `ServiceLine` + 2 compact `SecondaryService` |
| Final CTA | `HomeFinalCTA` | Navy full-bleed, centered, rust CTA button |
| Footer | `SiteFooter` | Black bg, 4-column grid |

**Hero layout:**
- Full-width `--lb-paper` background
- H1: Bookseller CP `clamp(56px, 8.2vw, 124px)`, navy, max-width `14ch`
- "urban wood" span: `--lb-rust`
- Sub-copy: Encode Sans SemiExpanded 19px, `--fg-soft`, max-width 720px

**Services section (`HomeServices`):**

Background: `--lb-paper-deep`. Two full service lines alternate photo side (left/right):

| # | Title | Photos | Layout class |
|---|---|---|---|
| 01 | Precision tree service | 4 photos (arborist, storm, rigging, rope) | `row-2-split` |
| 02 | Milling | 4 photos (bandsaw mill, lumber stacks, trailer, deck) | `row-2-split-rev` |

Below the service lines, two compact `SecondaryService` blocks (no photos, 2-col auto-fit grid):
- 03 Timber frame builds
- 04 Wood products

Each full `ServiceLine` contains:
- Number label: Encode Sans 14px, `0.14em` tracking, rust, uppercase
- Title: Bookseller CP `clamp(28px, 5.4vw, 56px)`, navy
- Body copy: Encode Sans 18px, `--fg-soft`
- Trust signals: `TrustSignals` component (check marker for tree service; dot for milling)
- `PhotoCarousel` — swipeable, arrow-key navigable, dot+nav buttons

---

### 2. Tree Removal LP — `tree-removal.html`

**Purpose:** High-intent SEO/PPC landing page for tight-space tree removal.

**Page composition (top → bottom):**

| Section | Component | Notes |
|---|---|---|
| Sticky header | `SiteHeader active="tree"` | "Tree Service" nav item highlighted rust |
| Hero | `TRHero` | 2-col split: copy left, full-height brand video right |
| Trust bar | `TRTrustBar` | 4-cell credential strip on `--lb-paper-deep` |
| Reviews | `TRReviews` | Swipeable carousel, 3 Google reviews |
| How it works | `TRHowItWorks` | 3-up card grid: quote → schedule → pay |
| Help & Save | `TRSaveCallout` | Navy callout, up to 30% off program |
| Recent work | `TRRecentWork` | Horizontal scroll-snap photo carousel, 6 photos |
| Different | `TRDifferent` | Why Lumber Bros is different — 4 numbered cards |
| Service areas | `TRServiceAreas` | 3 county cards + call CTA |
| FAQ | `TRFaq` | 7-item accordion, `container-narrow` |
| Final CTA | `TRFinalCTA` | Navy, centered, rust button |
| Footer | `SiteFooter` | Black bg |

**Hero layout (`tr-hero-v2-grid`):**
- 2-column: `1.22fr` text / `0.78fr` video; `min-height: clamp(520px, 70vh, 720px)`
- SEO H1 (eyebrow): Encode Sans 14px, uppercase, `0.14em` tracking, ink — "Tree Service in Washington, Beaufort, and Pitt County NC"
- Visual H2: Bookseller CP `clamp(48px, 6.4vw, 104px)`, navy — "Tight-space tree removal"
- Sub-copy: Encode Sans 19px, `--fg-soft`
- Trust signals: 2-column grid, 4 specialty bullets
- CTAs: primary "Get a free quote" + cream phone button
- Right: `<video autoplay loop muted playsinline>` — webm/mp4, `object-fit: cover`, `border-radius: 12px`, `scale(1.05)` to hide edge flicker
- Collapses to 1-col at 900px; video becomes `aspect-ratio: 3/4` on mobile

**Trust bar:**
- 4 cells on `--lb-paper-deep`; collapses 4→3 col at 1100px, 1-col at 720px
- ISA and NCFA cells use `<img>` logos (`assets/isa_logo.png`, `assets/nc_forestry_association_logo.png`)
- Other cells use Lucide icons in `--lb-rust`

**Recent work carousel (`TRRecentWork`):**
- 6 photos: `assets/pine-tree-removal-before-after.webp` + 5 from `assets/photos/`
- Native `overflow-x: scroll` + `scroll-snap-type: x mandatory`
- 3 cards visible desktop, 2 tablet, ~82% mobile (next card peeks)
- Click any photo → fullscreen `PhotoModal` lightbox (Escape or backdrop tap to close)

**FAQ accordion (`TRFaq`):**
- `container-narrow` (880px max)
- Open item: bone card bg; closed: transparent
- `+` rotates 45° to × when open; Bookseller 28px rust
- One item open at a time; first item open by default

---

## Shared components

### `SiteHeader`
- Sticky, `z-index: 50`
- Scrolled state (>80px): semi-transparent paper + `backdrop-filter: blur(10px)`, border-bottom, subtle shadow — 120ms transition
- Desktop: logo + nav + phone pill + "Get a free quote" CTA
- Mobile (<900px): logo + phone icon + hamburger; drawer slides in from right (`min(86vw, 360px)`, 260ms transition)
- Drawer closes on Escape or backdrop tap; body scroll locked while open

### `SiteFooter`
- Background: `#000000` (`--lb-black`) — only element to use true black
- 4-column grid: brand blurb / services list / service areas / contact
- Logo: inverted (CSS `brightness(0) invert(1)`)
- Phone: Bookseller 28px bone, `<a href="tel:2524950720">`

### `Button`
Variants: `primary` (navy) / `rust` / `sage` / `cream` / `ghost-light` / `text`
Sizes: default (14px, `padding: 16px 26px`) / `lg` (15px, `padding: 20px 32px`)
No shadows. Active: `translateY(1px)`. Focus: `2px solid var(--lb-rust)`, 3px offset.

### `TrustSignals`
Credential / value prop list. Props:
- `marker="dot"` (default) — small rust dot
- `marker="check"` — inline SVG checkmark in rust
- `columns` — switches to 2-up CSS grid

### `QuoteForm`
The quote form is an **external link only** — no on-site form handling. All CTAs point to `https://forms.example.com/lumberbros-quote`. Replace with real URL before launch.

### `Photo` (placeholder)
Tinted gradient block (`photo-forest`, `photo-dusk`, `photo-amber`, `photo-shop`). Replace with real `<img>` before launch. Accepts optional `src` prop to show a real image over the tinted background.

---

## Design tokens (key values)

All tokens live in `colors_and_type.css` — import on every page. Never redefine.

### Colors
| Token | Hex | Role |
|---|---|---|
| `--lb-navy` | `#1E2B7C` | Primary brand, CTAs, headings |
| `--lb-navy-700` | `#182463` | Button hover |
| `--lb-paper` | `#EFEDE6` | Default page background |
| `--lb-paper-deep` | `#E1DFD7` | Section alternation, secondary surfaces |
| `--lb-bone` | `#F9F8F3` | Elevated cards, form backgrounds |
| `--lb-sage` | `#5E7048` | Supporting brand green |
| `--lb-ink` | `#15171A` | Body text |
| `--lb-rust` | `#C24D1C` | Accent, hot CTAs, link hover |
| `--lb-sawdust` | `#D9A24A` | Stars, warm gold callouts |
| `--lb-forest` | `#2E4A2B` | Help & Save section background |
| `--lb-black` | `#000000` | Footer only |

### Typography
| Token | Value | Use |
|---|---|---|
| `--font-display` | `"Bookseller CP"` | H1, H2, hero, large numerals only |
| `--font-sans` | `"Encode Sans SemiExpanded"` | Everything else — **not** regular Encode Sans |
| `--font-serif-alt` | `"Instrument Serif"` | Italic value prop lists only |
| `--fs-display-2xl` | `clamp(64px, 9vw, 132px)` | Largest hero |
| `--fs-h1` | `clamp(36px, 4.5vw, 60px)` | — |
| `--fs-body-lg` | `19px` | Lead / intro copy |
| `--fs-body` | `16px` | Default body |

### Spacing
4px base scale: `--sp-1` (4px) → `--sp-32` (128px).
Section padding: `clamp(72px, 10vw, 144px)` (`.section`) / `clamp(56px, 7vw, 96px)` (`.section-tight`).

### Radii
- Cards: `8–10px`
- Buttons: `6px`
- Chips / pills: `999px`
- Full-bleed section blocks: `0px` (hard corners)

### Motion
- `--t-fast: 120ms` — hover, header state
- `--t-med: 220ms` — state changes, drawer
- `--ease-out: cubic-bezier(0.22, 0.61, 0.36, 1)`
- Always honor `prefers-reduced-motion` — the marquee animation and hover transforms must be gated on `@media (prefers-reduced-motion: no-preference)`

### Breakpoints
| Breakpoint | Change |
|---|---|
| `1100px` | Trust bar 4→3 col |
| `1024px` | `row-4` → 2-col; `row-2-aside` → 1-col |
| `900px` | Header → hamburger; TR hero stacks |
| `768px` | Most 2-col grids → 1-col |
| `720px` | Trust bar → 1-col; carousel slides → 82% |
| `480px` | `row-4` → 1-col; header CTAs hide |

---

## Layout classes (site.css)

| Class | Grid |
|---|---|
| `row-2` | `1fr 1fr`, gap 56px |
| `row-2-split` | `1.1fr 1fr`, gap 64px |
| `row-2-split-rev` | Same columns, photo renders left (order swap) |
| `row-2-split-wide` | `1fr 1.2fr`, gap 80px |
| `row-3` | `repeat(3, 1fr)`, gap 20px |
| `row-4` | `repeat(4, 1fr)`, gap 40px |
| `container` | max-width 1240px, `clamp(20px, 4vw, 56px)` gutter |
| `container-narrow` | max-width 880px |
| `section` | `padding: clamp(72px, 10vw, 144px) 0` |
| `section-tight` | `padding: clamp(56px, 7vw, 96px) 0` |
| `bg-navy` | `--lb-navy` bg, bone fg |
| `bg-paper-deep` | `--lb-paper-deep` bg |
| `bg-black` | `#000` bg (footer only) |

---

## Interactions & behavior

| Interaction | Spec |
|---|---|
| Header scroll shrink | Triggers at `scrollY > 80px`. Logo scales to `0.88`, padding tightens, bg semi-transparent + blur. `120ms ease`. |
| Mobile drawer | Slides from right, `transform: translateX()`, `260ms cubic-bezier(.2,.7,.2,1)`. Body scroll locked. Closes on Escape or backdrop tap. |
| `PhotoCarousel` (homepage) | Pointer swipe (threshold 40px) + arrow keys + dot/prev/next buttons. `380ms cubic-bezier(.2,.7,.2,1)` slide. Dot width animates 10px→28px on active. |
| `TRReviews` carousel | Same mechanics as PhotoCarousel. Max-width 880px centered. |
| `TRRecentWork` carousel | Native `overflow-x: scroll` + `scroll-snap-type: x mandatory`. Prev/next disabled+faded at edges. Counter "01 / 06". Click → `PhotoModal` lightbox. |
| `PhotoModal` | Full-viewport overlay, `backdrop-filter: blur(6px)`. Close on Escape or backdrop tap. Entrance: `opacity + scale(0.96) → 1`. |
| FAQ accordion | One item open at a time. `+` rotates 45° on open. Simple show/hide, no height animation needed. |
| Button hover | Background darkens. `120ms ease-out`. |
| Button active | `translateY(1px)`. |
| Link hover | Color → `--lb-rust`. |
| Focus | `2px solid var(--lb-rust)`, `3px offset`, all interactive elements. |
| Brand video | `autoplay muted loop playsinline`. `object-fit: cover`. `scale(1.05)` to hide edge flicker. |

---

## Photography

### Assets in this package
All photo paths in the JSX resolve relative to the HTML root (`assets/photos/...`).

| File | Used in |
|---|---|
| `assets/pine-tree-removal-before-after.webp` | TR Recent Work, slide 1 |
| `assets/photos/arborist-climbing-tall-pine-tree-1.webp` | Homepage Tree Service carousel |
| `assets/photos/chainsaw-operator-storm-debris-cleanup.webp` | Homepage Tree Service carousel |
| `assets/photos/person-climbing-trees-zip-line.webp` | Homepage Tree Service carousel |
| `assets/photos/man-pulling-red-rope-trees.webp` | Homepage Tree Service carousel |
| `assets/photos/kohler-bandsaw-mill-lumber-slab.webp` | Homepage Milling carousel |
| `assets/photos/lumber-stacks-farm-shed.webp` | Homepage Milling carousel |
| `assets/photos/fresh-sawn-lumber-flatbed-trailer.webp` | Homepage Milling carousel |
| `assets/photos/stacked-lumber-boards-deck-night-1.webp` | Homepage Milling carousel |
| `assets/photos/timber-frame-deck-construction-joists.webp` | Homepage Timber Builds carousel |
| `assets/photos/timber-frame-pergola-construction-site-1.webp` | Homepage Timber Builds carousel |
| `assets/photos/handmade-wooden-block-sets-granite.webp` | Homepage Wood Products carousel |
| `assets/photos/stacked-oak-lumber-boards-granite.webp` | Homepage Wood Products carousel |
| `assets/photos/arborist-climbing-tall-pine-tree-7.webp` | TR Recent Work carousel |
| `assets/photos/woman-chainsaw-cutting-log.webp` | TR Recent Work carousel |
| `assets/photos/cut-logs-farmhouse-yard.webp` | TR Recent Work carousel |
| `assets/photos/fallen-tree-logs-brick-house.webp` | TR Recent Work carousel |
| `assets/photos/woman-chainsawing-log-outdoors.webp` | TR Recent Work carousel |

The remaining 75+ photos in `assets/photos/` are included as reference for photo direction and dev testing. They are not final production images — the client will supply a real photo set (shot list in `BUILD_BRIEF.md` §7).

### Replacing placeholders
Every `<Photo tone="…" desc="…" />` in the JSX is a tinted gradient placeholder. In production, replace with:
```html
<img src="/photos/hero.webp" alt="[real alt text]" width="…" height="…">
```
Use `<picture>` with AVIF + JPEG fallback. See `BUILD_BRIEF.md` §10 for performance budget.

---

## Placeholders to replace before launch

| Placeholder | Location | Action |
|---|---|---|
| `https://forms.example.com/lumberbros-quote` | All CTAs | Replace with real quote form URL |
| `NC Lic. #00000` | Footer | Replace with real NC license number |
| `hello@lumberbros.co` | Header, footer, QuoteForm | Confirm inbox is live |
| `© 2025` | Footer | Update to current year (make dynamic) |
| `https://share.google/csb9JwBUlxPuIa7q1` | TRReviews | Confirm Google reviews link |
| All `<Photo>` gradient blocks | Both pages | Replace with real photography |

---

## Lucide icons

Loaded via CDN. **Pin to a specific version before launch** — do not ship `@latest`:
```html
<script src="https://unpkg.com/lucide@0.451.0"></script>
```
Icons used: `phone`, `mail`, `map-pin`, `arrow-up-right`, `arrow-right`, `arrow-left`, `shield-check`, `check`, `clock`, `menu`, `x`, `star`, `cloud-lightning`, `alert-triangle`, `home`, `zap`, `sun`, `construction`, `expand`.

At build time, consider inlining as SVGs (Lucide has an Astro plugin) to eliminate the CDN request.

---

## Copy rules (non-negotiable)

- **Sentence case** for all headings — never title case
- **No `!`** anywhere in copy
- **No marketing-speak** ("solutions", "best-in-class" etc. are banned)
- **Do not paraphrase** `source/` copy — use verbatim
- Phone `(252) 495-0720` → always `<a href="tel:2524950720">`
- Email → always `<a href="mailto:hello@lumberbros.co">`
- Em-dashes (`—`) in copy, not hyphens

---

## Further reading

- **`BUILD_BRIEF.md`** — full scope, recommended stack (Astro), hosting, SEO schema, a11y requirements, performance budget, and the complete pre-launch checklist
- **`source/Homepage Copy.md`** — full homepage copy from the client
- **`source/Tree Removal LP Copy.md`** — full tree removal LP copy from the client

# Lumber Bros. — Design Handoff

**Developer handoff package for the Lumber Bros. marketing website.**
Read this document end-to-end before opening any code files. Then read `BUILD_BRIEF.md` for scope, stack, SEO, accessibility, and performance requirements.

---

## Important: what these files are

The HTML files in this package are **design references built with React + in-browser Babel** — they exist to show the intended look, layout, copy, and interactions precisely, not to be deployed as-is.

Your job is to **recreate these designs in a production-grade codebase** using your preferred stack (see `BUILD_BRIEF.md` §3 for recommendations — Astro is the top pick). Port the component structure, CSS classes, and design tokens faithfully; discard the Babel/CDN React scaffolding.

---

## How to preview the designs

Open `index.html` or `tree-removal.html` directly in a browser — no build step needed. They load React + Babel from CDN and self-render. If fonts look wrong, make sure you're serving from a local server (e.g. `npx serve .`) rather than the `file://` protocol.

---

## File structure

```
design_handoff_lumber_bros_website/
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
│   ├── Shared.jsx                 ← Button, Chip, Photo, Logo, SiteHeader, SiteFooter, QuoteForm, ReviewCard, MarqueeStrip
│   ├── Homepage.jsx               ← HomeHero, HomeStatStrip, HomeServices (ServiceLine, PhotoCarousel), HomeQuoteCTA, HomeFinalCTA
│   └── TreeRemoval.jsx            ← TRHero, TRTrustBar, TRReviews, TRHowItWorks, TRSaveCallout, TRRecentWork, TRDifferent, TRServiceAreas, TRFaq, TRFinalCTA
│
├── fonts/
│   ├── BooksellerCp-RegularBold.otf      ← Display face (H1, H2, hero)
│   ├── EncodeSansSemiExpanded-*.ttf      ← Body/UI face, 9 weights (100–900)
│   ├── InstrumentSerif-*.ttf             ← Serif alt (italic value props)
│   └── LobsterTwo-*.ttf                  ← Script (decorative, use sparingly)
│
├── assets/
│   ├── logo.svg                   ← Master wordmark, navy on transparent
│   ├── Leaf.svg                   ← Marquee strip leaf icon
│   ├── isa_logo.png               ← ISA credential badge
│   ├── nc_forestry_association_logo.png  ← NCFA credential badge
│   ├── lumber_bros_loop.webm      ← Brand video loop (Tree Removal LP hero)
│   ├── lumber_bros_loop.mp4       ← Brand video loop (Safari fallback)
│   └── photos/                    ← 100+ reference photos (webp)
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
| Sticky header | `SiteHeader` | Shrinks on scroll, hamburger drawer on mobile |
| Hero | `HomeHero` | Large display headline, deck copy, no photo |
| Stat strip | `HomeStatStrip` | 4-up navy band: $2M / 3 counties / 100% fixed / 0 trees wasted |
| Marquee | `MarqueeStrip` | "No tree wasted" scrolling strip, navy bg |
| Services | `HomeServices` | 4× `ServiceLine` blocks with `PhotoCarousel` |
| Quote CTA | `HomeQuoteCTA` | Contact info left + `QuoteForm` right |
| Final CTA | `HomeFinalCTA` | Navy full-bleed, centered, rust CTA button |
| Footer | `SiteFooter` | Black bg, 4-column grid |

**Hero layout:**
- Full-width, off-white (`--lb-paper`) background
- H1: Bookseller CP, `clamp(56px, 8.2vw, 124px)`, navy, max-width `14ch`
- "urban wood" span: rust (`--lb-rust`)
- Sub-copy: Encode Sans SemiExpanded 19px, `--fg-soft`

**Stat strip:**
- Background: `--lb-navy`
- 4-column grid at desktop, 2-col at 1024px, 1-col at 480px
- Numbers: Bookseller CP `clamp(56px, 6vw, 80px)`, `--lb-paper`
- Labels: Encode Sans 14px, `rgba(251,247,238,0.75)`

**Service lines (4 total):**
Each `ServiceLine` is a 2-column split (`row-2-split` or `row-2-split-rev` for alternating photo side). Contains:
- Service number label: Encode Sans 14px, 0.14em tracking, rust, uppercase
- Title: Bookseller CP `clamp(28px, 5.4vw, 56px)`, navy
- Body copy: Encode Sans 18px, `--fg-soft`
- Value props (italic serif list): Instrument Serif italic `clamp(22px, 2.2vw, 28px)`, navy, rust em-dash prefix
- Trust signals: `TrustSignals` with `marker="check"` or dot
- Photo: `PhotoCarousel` — swipeable, arrow-key navigable, dot indicators

Services: 01 Precision tree service / 02 Milling / 03 Timber frame builds / 04 Wood products

**Quote CTA section:**
- 2-column: left = headline + 3 contact info cards (icon + primary text + sub), right = `QuoteForm`
- Contact cards: `--lb-paper-deep` bg, 8px radius, rust icon, 17px bold label
- `QuoteForm`: bone card, 2×2 mini stat grid (clock/shield/check/map-pin), primary CTA button, contact line below

---

### 2. Tree Removal LP — `tree-removal.html`

**Purpose:** High-intent SEO/PPC landing page. Converts visitors searching "tree removal Beaufort NC" etc.

**Page composition (top → bottom):**

| Section | Component | Notes |
|---|---|---|
| Sticky header | `SiteHeader active="tree"` | Same header, "Tree Service" nav item highlighted rust |
| Hero | `TRHero` | 2-col split: copy left, full-height brand video right |
| Trust bar | `TRTrustBar` | 5-cell credential strip on `--lb-paper-deep` |
| Reviews | `TRReviews` | Swipeable carousel, 3 Google reviews |
| How it works | `TRHowItWorks` | 3-up card grid: quote → schedule → pay |
| Help & Save | `TRSaveCallout` | Forest green callout, 30% off program |
| Recent work | `TRRecentWork` | Horizontal scroll-snap photo carousel |
| Different | `TRDifferent` | Why Lumber Bros is different — 4 numbered cards |
| Service areas | `TRServiceAreas` | 3 county cards + call CTA |
| FAQ | `TRFaq` | 7-item accordion, `container-narrow` |
| Final CTA | `TRFinalCTA` | Navy, centered, rust button |
| Footer | `SiteFooter` | Black bg |

**Hero layout (`tr-hero-v2-grid`):**
- 2-column: `1.22fr` text / `0.78fr` photo, `min-height: clamp(520px, 70vh, 720px)`
- SEO H1 (eyebrow): Encode Sans 14px, 0.14em tracking, ink, uppercase — "Tree Service in Washington, Beaufort, and Pitt County NC"
- Visual H2 (display title): Bookseller CP `clamp(48px, 6.4vw, 104px)`, navy — "Tight-space tree experts"
- Sub-copy: Encode Sans 19px, `--fg-soft`
- Trust signals: 2-column grid of 4 location specialty bullets
- CTAs: primary "Get a free quote" + cream phone button
- Right column: `<video autoplay loop muted playsinline>` with webm/mp4 sources, `object-fit: cover`, `border-radius: 12px`
- Collapses to single column at 900px; video becomes portrait `aspect-ratio: 3/4` on mobile

**Trust bar (`tr-trust-bar`):**
- 5-column grid on `--lb-paper-deep`, collapses to 3-col at 1100px, 1-col at 720px
- Cells: icon/image + label + optional sublabel
- ISA and NCFA cells use `<img>` logos; others use Lucide icons in rust

**Reviews carousel:**
- Single-card viewport with slide track, pointer swipe + arrow key nav
- `ReviewCard`: bone bg, sawdust stars (`★★★★★`), Instrument Serif italic blockquote 24px, attribution 14px
- Dot indicators + prev/next 48×48 pill buttons

**How it works:**
- 3-column `row-3` grid (stacks on mobile), bone cards
- Large rust number (Bookseller 56px), display H3, Encode body

**Help & Save callout:**
- Background: `--lb-forest` (`#2E4A2B`)
- Left: sawdust "Get up to 30%" in Bookseller `clamp(56px, 11vw, 110px)` + headline
- Right: 2-row split panel (we handle / you handle), `rgba(251,247,238,0.06)` bg

**Recent work carousel:**
- Native `overflow-x: scroll` + `scroll-snap-type: x mandatory`
- 3 cards visible on desktop, 2 on tablet, ~82% width on mobile (next card peeks)
- `Photo` placeholders — replace with real `<img>` tags

**FAQ accordion:**
- Container: `container-narrow` (880px max)
- Open item: bone card bg; closed: transparent
- Toggle: `+` symbol rotates 45° to `×` on open, Bookseller 28px rust
- Question: Encode Sans 18px 700 ink; Answer: Encode 16px `--fg-soft`

---

## Shared components

### `SiteHeader`
- Sticky, `z-index: 50`
- Scrolled state (>80px): semi-transparent paper with `backdrop-filter: blur(10px)`, border-bottom, subtle shadow
- Desktop: logo + nav links + phone pill button + "Get a free quote" CTA
- Mobile (<900px): logo + phone icon + hamburger; drawer slides in from right
- Drawer: `min(86vw, 360px)` wide, large display nav links, phone + quote CTAs at bottom

### `SiteFooter`
- Background: `--lb-black` (`#000000`)
- 4-column grid: brand blurb / services list / service areas / contact
- Logo: inverted (white filter)
- Phone: Bookseller 28px bone, click-to-call
- Bottom bar: copyright + ISA member ID

### `Button`
Variants: `primary` (navy) / `rust` / `sage` / `cream` / `ghost-light` / `text`
Sizes: default (`padding: 16px 26px`, 14px) / `lg` (`padding: 20px 32px`, 15px)
No shadows. Hover darkens background. Active: `translateY(1px)`.

### `QuoteForm`
- **The quote form is an external link** — no on-site form handling
- All CTAs link to `https://forms.example.com/lumberbros-quote` (replace with real URL before launch)
- Contains 2×2 mini-stat grid: 24hr reply / $2M insured / Fixed quote / 3 counties

### `Photo` (placeholder)
- Tinted gradient blocks (`photo-forest`, `photo-dusk`, `photo-amber`, `photo-shop`)
- Replace every `<Photo>` with a real `<img>` or framework image component before launch
- Keep `border-radius: 8–12px` on the container

### `MarqueeStrip`
- Navy band, "No tree wasted" + Leaf.svg repeating at `animation: lb-marquee 40s linear infinite`
- `@media (prefers-reduced-motion: reduce)` disables the animation

---

## Design tokens (key values)

All tokens live in `colors_and_type.css` — import it on every page. Do not redefine.

### Colors
| Token | Hex | Role |
|---|---|---|
| `--lb-navy` | `#1E2B7C` | Primary brand, CTAs, headings |
| `--lb-paper` | `#EFEDE6` | Default page background |
| `--lb-paper-deep` | `#E1DFD7` | Section alternation, cards |
| `--lb-bone` | `#F9F8F3` | Elevated surfaces, inner cards |
| `--lb-sage` | `#5E7048` | Supporting green |
| `--lb-ink` | `#15171A` | Body text |
| `--lb-rust` | `#C24D1C` | Accent, hot CTAs, link hover |
| `--lb-sawdust` | `#D9A24A` | Stars, warm gold callouts |
| `--lb-forest` | `#2E4A2B` | Help & Save section bg |
| `--lb-black` | `#000000` | Footer only |

### Typography
| Token | Value | Use |
|---|---|---|
| `--font-display` | `"Bookseller CP"` | H1, H2, hero, large numerals |
| `--font-sans` | `"Encode Sans SemiExpanded"` | Everything else |
| `--font-serif-alt` | `"Instrument Serif"` | Italic value prop lists |
| `--fs-display-2xl` | `clamp(64px, 9vw, 132px)` | Largest hero use |
| `--fs-h1` | `clamp(36px, 4.5vw, 60px)` | — |
| `--fs-body` | `16px` | Default body |
| `--fs-body-lg` | `19px` | Lead copy |

### Spacing
4px base scale: `--sp-1` (4px) through `--sp-32` (128px). Section padding: `clamp(72px, 10vw, 144px)`.

### Radii
- Cards: `8–10px`
- Buttons: `6px`
- Chips/pills: `999px`
- **Hard corners (0px) for full-bleed section blocks**

### Motion
- `--t-fast: 120ms` — hover states
- `--t-med: 220ms` — state changes
- `--ease-out: cubic-bezier(0.22, 0.61, 0.36, 1)`
- Respect `prefers-reduced-motion` — disable marquee + hover transforms

### Breakpoints
| Breakpoint | Layout change |
|---|---|
| `1100px` | Trust bar collapses 5→3 columns |
| `1024px` | `row-4` → 2-col; `row-2-aside` → 1-col |
| `900px` | Header switches to hamburger; TR hero stacks |
| `768px` | Most 2-col grids stack; `row-3` stacks |
| `720px` | Trust bar goes 1-col; carousel slides go 82% width |
| `480px` | `row-4` → 1-col; header CTAs hide |

---

## Layout classes (from `site.css`)

| Class | Grid |
|---|---|
| `row-2` | `1fr 1fr`, gap 56px |
| `row-2-split` | `1.1fr 1fr`, gap 64px |
| `row-2-split-rev` | Same, photo left (reverses order on desktop) |
| `row-3` | `repeat(3, 1fr)`, gap 20px |
| `row-4` | `repeat(4, 1fr)`, gap 40px |
| `container` | max-width 1240px, auto margins, `clamp(20px, 4vw, 56px)` gutter |
| `container-narrow` | max-width 880px |
| `section` | `padding: clamp(72px, 10vw, 144px) 0` |
| `section-tight` | `padding: clamp(56px, 7vw, 96px) 0` |
| `bg-navy` | `--lb-navy` bg, `--lb-bone` fg |
| `bg-paper-deep` | `--lb-paper-deep` bg |
| `bg-black` | `#000` bg (footer only) |

---

## Interactions & behavior

| Interaction | Spec |
|---|---|
| Header scroll shrink | Triggers at `scrollY > 80px`. Logo scales to `0.88`, padding tightens, bg goes semi-transparent + blur. Transition: `120ms ease`. |
| Mobile drawer | Slides in from right, `transform: translateX()`, `260ms cubic-bezier(.2,.7,.2,1)`. Body scroll locked while open. Closes on Escape or backdrop tap. |
| Photo carousel (homepage) | Pointer swipe (threshold 40px), arrow keys, dot + prev/next buttons. `380ms cubic-bezier(.2,.7,.2,1)` slide transition. Dots animate width (10px → 28px) on active. |
| Review carousel | Same as photo carousel. Max-width 880px centered slide. |
| Recent work carousel | Native `overflow-x: scroll` + `scroll-snap-type: x mandatory`. Prev/next buttons disabled + faded at edges. Counter shows `01 / 05`. |
| FAQ accordion | One open at a time. `+` rotates 45° on open. No height animation needed — simple show/hide. |
| Button hover | Background darkens (`--lb-navy-700` for primary). `120ms ease-out`. |
| Button active | `translateY(1px)`. |
| Link hover | `color` shifts to `--lb-rust`. |
| Focus rings | `2px solid var(--lb-rust)`, `3px offset`, on all interactive elements. |
| Brand video (TR hero) | `autoplay muted loop playsinline`. `object-fit: cover`. Scale `1.05` to avoid edge flicker. |

---

## Assets & photography

### Ready to use (in `assets/`)
- `logo.svg` — wordmark, navy on transparent. Alt: `"Lumber Bros."`
- `Leaf.svg` — marquee leaf icon (invert to white on navy bg)
- `isa_logo.png` — ISA credential
- `nc_forestry_association_logo.png` — NCFA credential
- `lumber_bros_loop.webm` / `.mp4` — brand video for TR hero

### Reference photos (in `assets/photos/`)
100+ webp photos are included as reference for photo direction and to populate the carousel photo slots. **These are not final production images** — the client will supply final photography per the shot list in `BUILD_BRIEF.md` §7. Use these for layout/mood reference and to fill carousels during development.

### Photography placeholders
Every `<Photo tone="…" desc="…" />` in the JSX is a tinted gradient placeholder. In production, replace with:
```html
<img src="/photos/hero.webp" alt="[real alt text]" width="…" height="…">
```
Use AVIF + JPEG fallback via `<picture>`. See `BUILD_BRIEF.md` §10 for performance budget.

---

## Placeholders to replace before launch

| Placeholder | Location | Action |
|---|---|---|
| `https://forms.example.com/lumberbros-quote` | All CTAs | Replace with real quote form URL |
| `NC Lic. #00000` | Footer | Replace with real NC license number |
| `hello@lumberbros.co` | Header, footer, QuoteForm | Confirm email inbox is live |
| `© 2025` | Footer | Update to current year (make dynamic) |
| `https://share.google/csb9JwBUlxPuIa7q1` | TRReviews | Confirm Google reviews link |
| All `<Photo>` placeholders | Both pages | Replace with real photography |

---

## Lucide icons

Loaded via CDN. **Pin to a specific version before launching** — do not ship `@latest`.

```html
<script src="https://unpkg.com/lucide@0.451.0"></script>
```

Icons used on this site: `phone`, `mail`, `map-pin`, `arrow-up-right`, `arrow-right`, `arrow-left`, `arrow-down`, `shield-check`, `check`, `clock`, `menu`, `x`, `star`, `cloud-lightning`, `alert-triangle`, `home`, `zap`, `sun`, `construction`.

At build time, consider inlining icons as SVGs (Lucide has an Astro integration) to eliminate the CDN request and remove the `lucide.createIcons()` call requirement.

---

## Copy rules (non-negotiable)

From `README.md` and the source copy files:

- **Sentence case** for all headings — never title case
- **No `!`** anywhere in copy
- **No marketing speak** — "solutions", "best-in-class", etc. are banned
- **Do not paraphrase** the copy in `source/` — use it verbatim
- Phone `(252) 495-0720` → always `<a href="tel:2524950720">`
- Email `hello@lumberbros.co` → always `<a href="mailto:hello@lumberbros.co">`
- Em-dashes (`—`) in copy, not hyphens

---

## Further reading

- **`BUILD_BRIEF.md`** — full scope, recommended stack, hosting, SEO schema, accessibility requirements, performance budget, and the complete pre-launch checklist
- **`source/Homepage Copy.md`** — full homepage copy from the client
- **`source/Tree Removal LP Copy.md`** — full tree removal LP copy from the client

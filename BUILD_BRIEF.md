# Lumber Bros. — Website Build Brief

A handoff doc for the developer (or Claude) building the production website from this design system. Read this once end-to-end before you start; everything else is reference material under `/`.

---

## 1. What's being built

A small marketing website for **Lumber Bros.**, a family-operated tree service, sawmill, and custom-build shop in Eastern North Carolina. Two pages are spec'd and mocked in this design system; the site will likely grow modestly from there.

The site is a marketing site, not a product. It is **content-led** — its job is to make the brand feel premium-craft, build trust, and route high-intent customers to a quote.

---

## 2. Scope

### Pages in v1 (mocked, ready to lift)
- **Homepage** — `/`
- **Tree Removal LP** — `/tree-removal/`

### Pages in v1 (not mocked — design system covers, build from patterns)
- **Milling LP** — `/milling/` (mirror Tree Removal LP structure with milling content)
- **Custom Builds LP** — `/builds/` (same)
- **About** — `/about/` (brand thesis from "Fundamentally different" section)
- **Contact** — `/contact/` (phone, email, service area map, hours)
- **404** — keep on-brand (Bookseller display headline, link home)

### Out of scope for v1 (don't build)
- Blog / CMS
- Gallery / portfolio
- Online booking
- E-commerce for milled lumber / wood products

---

## 3. Tech stack — recommended

The reference UI kit is React + in-browser Babel for prototyping speed. **Do not ship it as-is.** Convert to one of:

| Stack | Why |
|---|---|
| **Astro** (recommended) | Static-first, component model maps 1:1 to the JSX in `ui_kits/website/components/`, no client-side JS by default → fast, accessible, SEO-friendly. |
| **11ty + Nunjucks/Liquid** | If the dev prefers zero-JS templating. Components become partials. |
| **Next.js static export** | If the dev is already in the React ecosystem. Overkill for two-to-six pages, but viable. |

Plain HTML + CSS is also fine for a site this size — but you'll repeat header/footer markup across pages, so pick a system with includes/partials.

### Required regardless of stack

- **Real fonts loaded via `@font-face`**, not Google Fonts. Files live in `fonts/` of this design system; copy them in. Bookseller CP is `.otf`, Encode Sans is 9 `.ttf` files.
- **`colors_and_type.css`** is the source of truth for tokens. Import it on every page. Do not redefine tokens in component CSS.
- **Lucide icons** loaded from CDN — but **pin a specific version** (e.g. `lucide@0.451.0`), not `@latest`.
- **No client-side React on production pages** unless absolutely required. The mocks use React for prototyping speed; the real site doesn't need it.

---

## 4. Hosting & operations

- **Static host.** Netlify, Vercel, Cloudflare Pages — any of them. The site is fully static.
- **No backend.** The quote form is an **external link** (see §6). No server, no database, no auth, no API routes.
- **Custom domain** — TBD. The client owns the brand name; presumed `lumberbros.co` or similar.
- **Analytics** — TBD. Plausible or Fathom recommended (lightweight, privacy-respecting, matches brand vibe). Don't add Google Analytics without confirming.
- **CMS** — none for v1. Copy lives in the source files. Hand-edit for now.

---

## 5. Brand & design system

Everything you need is in this folder. The key files:

| Path | What |
|---|---|
| `README.md` | Brand context, content fundamentals, visual foundations, iconography. **Read this.** |
| `SKILL.md` | If you're using Claude, this is the skill manifest. |
| `colors_and_type.css` | All design tokens (color, type, spacing, radii, shadow, motion). |
| `fonts/` | Bookseller CP + Encode Sans SemiExpanded (9 weights). Self-host these. |
| `assets/logo.svg` | Master wordmark, navy on transparent. |
| `ui_kits/website/` | React/JSX recreations of homepage + tree-removal LP. **Port these to your chosen stack.** |
| `preview/` | Atomic card previews (type, colors, components). Useful for ad-hoc reference. |
| `source/` | Original client copy markdown. Do not paraphrase. |

### Non-negotiable design rules

- **Bookseller CP for display only** (hero, H1, H2). Never body-set.
- **Encode Sans SemiExpanded** for everything else. Don't substitute regular Encode Sans.
- **Canvas is off-white (`#EFEDE6`)**, never pure white.
- **Hard corners (2–6px) by default.** Pills for chips only.
- **No gradients** on UI. Tinted gradients OK only for placeholder photography.
- **Two shadow types**: 1px letterpress press-down on buttons/chips; soft lift on floating UI. No blurred shadows on inline elements.
- **Lucide icons at 1.5px stroke.** No emoji except `★★★★★` review rows.
- **Sentence case** for headings. No `!` ever.

---

## 6. The quote form (external)

Per client direction, **the quote form is hosted externally** — no on-site capture, no form handler needed.

- Replace every `Start my quote` / `Get a free quote` / `Request a fixed quote` CTA with an `<a>` linking to the external form URL (TBD by client — currently a placeholder `https://forms.example.com/lumberbros-quote`).
- Open in same tab (the form is part of the brand's experience, not a third-party tool).
- Keep the trust strip ($2M insured, 24-hour reply, fixed quote, 3 counties) visible on the page near the CTA — that's where the conversion lives.
- Phone number `(252) 495-0720` should be `<a href="tel:...">`-wired on every page (top nav, footer, CTAs).
- Email `hello@lumberbros.co` should be `<a href="mailto:...">`-wired everywhere.

---

## 7. Photography

**The single biggest gap right now.** The mocks use tinted gradient placeholders with photo briefs in italic text. The real site cannot ship with these.

### Minimum shot list

| Where | Spec |
|---|---|
| Homepage hero | Wide landscape — a climber rigging down a tree section, golden-hour, slight grain. Replace `.photo-forest` block. |
| Service line 01 (Tree Service) | Climber 40ft up, ropes loaded, ground crew below. Portrait or 4:5. |
| Service line 02 (Milling) | Bandsaw mill mid-cut on a large oak butt log. Sawdust in the light. 4:5. |
| Service line 03 (Custom Builds) | Timber-frame pavilion mid-raising. Crew at the post line. 4:5. |
| Tree Removal LP hero | Tight-yard removal in progress. Rigging visible. Landscape. |
| About / general | 4–6 environmental shots of the crew, trucks, shop interior. Use sparingly. |

**Direction:** warm light, slightly desaturated, golden-hour preferred. Trees and the *work* are the subject — people are present but rarely the focus. Avoid stock photography. Avoid blue-cool cinematic crops.

### Where photos go

- Save to `/public/photos/` (or your stack's static asset folder) at 2x retina, web-optimized (AVIF + JPEG fallback).
- Replace each `<Photo tone="..." tag="..." desc="..." />` instance with a real `<img>` (or your stack's image component).
- Keep the 1px ink border treatment — that's a brand element, not just a placeholder convention.

---

## 8. Responsive / breakpoints

The mocks layout cleanly at desktop. **Mobile passes are needed.** Notes:

- **Header**: mobile nav should be a hamburger drawer. The phone number stays visible (tap-to-call is critical). The primary CTA stays visible.
- **Hero**: stack columns, reduce display headline to clamp(40px, 9vw, 64px).
- **Service rows** (Homepage): stack photo + copy. Photo first on mobile.
- **Two-column "Fundamentally different"**: stack.
- **Tree Removal LP hero**: form/CTA card stacks below the hero copy.
- **How it works** (3-column): stack on mobile, keep the 1px ink dividers but rotate them horizontal.
- **FAQ**: works as-is; just check tap targets are 44px+.
- **Footer**: 2-column or 1-column on mobile.

Suggested breakpoints: `1024px`, `768px`, `480px`. Use container queries where they make sense.

---

## 9. Accessibility

Non-negotiable basics:

- All interactive elements keyboard-navigable. Focus ring is `2px solid var(--lb-rust)` with `3px` offset (defined in `colors_and_type.css`).
- Color contrast: navy on off-white passes AAA. Sage on off-white passes AA. Rust on off-white passes AA only at 14pt+ — use rust for accents and large-text CTAs, not body copy.
- Wordmark `<img>` needs `alt="Lumber Bros."` everywhere.
- Photographs need real alt text once chosen (the brief in the placeholder is a starting point, not the alt).
- Phone number, email, all CTAs need clear focus states.
- `prefers-reduced-motion` honored — disable the hover transforms on buttons.
- Headings in semantic order. Don't skip H levels for visual reasons.

---

## 10. Performance budget

- LCP < 2.5s on a 4G mobile connection.
- No render-blocking JS on first paint. Babel/React are prototype-only.
- Fonts: `font-display: swap`, preload Bookseller CP and Encode Sans 400 + 700.
- Inline critical CSS for the above-the-fold hero.
- Images: AVIF with JPEG fallback. Hero is the only image worth preloading.
- No third-party scripts except (optional) analytics. Lucide can be inlined as SVGs at build time instead of CDN if you want to remove the request.

---

## 11. SEO

The site is a local-business site. Standard SEO + local schema:

- `<title>` and `<meta description>` per page. Tree-removal LP should target *"tree removal Beaufort NC"*, *"tree removal Pitt County"*, *"tight-space tree removal Eastern NC"*.
- `LocalBusiness` JSON-LD on every page with name, address, phone, service area (Beaufort, Pitt, Washington counties), hours.
- Open Graph + Twitter card images for social sharing. Use a hero photo with the wordmark overlay.
- Sitemap.xml + robots.txt at root.
- Canonical tags on every page.

---

## 12. Legal / operational placeholders to replace

These appear in the mocks as placeholders. Replace before launch:

- **NC license number**: footer shows `NC Lic. #00000` — replace with real number.
- **Email**: `hello@lumberbros.co` — confirm domain and inbox.
- **External form URL**: `https://forms.example.com/lumberbros-quote` — replace with real.
- **Service-area copy in footer**: confirm "surrounding areas — call" is accurate.
- **Hours**: "Mon–Sat, 7a–6p, Emergency line 24/7" — confirm with client.
- **Copyright year**: `© 2025` — set to current year, ideally dynamic.

A privacy policy and terms page are recommended but not in the mocks. If running ads, both are required by most ad platforms.

---

## 13. Deliverables checklist

The dev should be able to tick these off before calling it done:

- [ ] Two pages live with real content (Homepage, Tree Removal LP)
- [ ] Three more pages built from system patterns (Milling LP, Custom Builds LP, About) — *unless client deprioritizes*
- [ ] Contact page
- [ ] 404 page
- [ ] Real photography (per §7)
- [ ] All external links point to the real quote form URL
- [ ] All phone / email links are click-to-call / mailto
- [ ] Mobile breakpoints refined (per §8)
- [ ] LocalBusiness schema + SEO meta tags per page
- [ ] Open Graph images
- [ ] Analytics installed (if chosen)
- [ ] Performance budget hit (per §10)
- [ ] Domain pointed, HTTPS live
- [ ] Favicon + apple-touch-icon (use the wordmark "L" lockup or full mark, navy on off-white)

---

## 14. Ongoing

Once live:

- Hand the client edit access to the copy if they want it (markdown files + a deploy hook is sufficient — no CMS needed for the foreseeable future).
- Lock font CDN versions, image optimization pipeline, and Lucide version. Document upgrade procedure.
- Set up uptime monitoring (Better Uptime or similar) — the site is a lead-generation channel, downtime costs money.

---

*Anything ambiguous, ask before guessing. The visual system is opinionated — when in doubt, look at how the mocks handle a similar problem before inventing something new.*

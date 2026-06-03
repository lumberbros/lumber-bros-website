/* ============================================================
   Shared atoms used across both pages.
   Exposes: Button, Chip, ChipRow, Kicker, Photo, Logo, Icon,
            SiteHeader, SiteFooter, QuoteForm, ReviewCard
   ============================================================ */

const Icon = ({ name, size = 20, className = "", style = {} }) =>
<i data-lucide={name}
className={className}
style={{ width: size, height: size, display: "inline-flex", flex: "0 0 auto", ...style }} />;


const Button = ({ children, variant = "primary", size, href, onClick, type = "button", iconRight, iconLeft, className = "" }) => {
  const cls = `btn ${variant === "primary" ? "btn-primary" :
  variant === "rust" ? "btn-rust" :
  variant === "sage" ? "btn-sage" :
  variant === "cream" ? "btn-cream" :
  variant === "ghost-light" ? "btn-ghost-light" :
  variant === "text" ? "btn-text" :
  ""} ${size === "lg" ? "btn-lg" : ""} ${className}`;
  const inner =
  <>
      {iconLeft && <Icon name={iconLeft} size={16} />}
      {children}
      {iconRight && <Icon name={iconRight} size={16} />}
    </>;

  if (href) return <a href={href} className={cls} onClick={onClick}>{inner}</a>;
  return <button type={type} className={cls} onClick={onClick}>{inner}</button>;
};

const Chip = ({ children, icon, tone = "paper" }) =>
<span className={`chip ${tone === "sage" ? "chip-sage" : tone === "bone" ? "chip-bone" : ""}`}>
    {icon && <Icon name={icon} size={13} />}
    {children}
  </span>;


const ChipRow = ({ items, icon, tone }) =>
<div className="chip-row">
    {items.map((t, i) => <Chip key={i} icon={icon} tone={tone}>{t}</Chip>)}
  </div>;


/* TrustSignals — design-system primitive for value props / credential lists.
   Rust dot + bold label by default. Use `columns` to switch from inline-wrap
   row to a 2-up grid (e.g. inside a hero where the items are short and want
   to align). Use `marker=\"check\"` for credentials where a checkmark reads
   stronger than a bullet. */
const TrustSignals = ({ items, columns = 0, marker = "dot" }) =>
<ul className={[
"trust-signals",
columns ? "trust-signals-cols" : "",
marker === "check" ? "trust-signals-check" : ""].
filter(Boolean).join(" ")}>
    {items.map((it, i) => {
    const label = typeof it === "string" ? it : it.label;
    return (
      <li className="trust-signal" key={i}>
          {marker === "check" ?
        <span className="trust-signal-marker trust-signal-check" aria-hidden="true">
              <svg viewBox="0 0 16 16" width="14" height="14" fill="none"
          stroke="currentColor" strokeWidth="2.5"
          strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 8.5 6.5 12 13 4.5" />
              </svg>
            </span> :

        <span className="trust-signal-marker trust-signal-dot" aria-hidden="true" />
        }
          <span className="trust-signal-label">{label}</span>
        </li>);

  })}
  </ul>;


/* Kicker removed — sentence-case rust eyebrow no longer used on this site. */

const Photo = ({ tone = "forest", tag, desc, height, aspect, children, style = {}, className = "", src }) => {
  const sty = { ...style };
  if (height) sty.height = height;
  if (aspect) sty.aspectRatio = aspect;
  if (src) {
    sty.backgroundImage = `url(${src})`;
    sty.backgroundSize = "cover";
    sty.backgroundPosition = "center";
  }
  return (
    <div className={`photo photo-${tone} ${className}`} style={sty}>
      {tag && <span className="tag">{tag}</span>}
      {desc && !src && <div className="desc">{desc}</div>}
      {children}
    </div>);

};

const Logo = ({ width = 180, inverse = false, style = {} }) =>
<img src="../assets/logo.svg" alt="Lumber Bros."
width={width}
style={{
  height: "auto",
  display: "block",
  filter: inverse ? "brightness(0) invert(1)" : "none",
  ...style
}} />;


/* ============================================================
   Site Header
   ============================================================ */
const SiteHeader = ({ active = "home" }) => {
  const nav = [
  { id: "tree", label: "Tree Service", href: "tree-removal.html" }];


  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  // Shrink the header once the user has scrolled past the fold.
  // rAF-throttled so we never thrash setState during scroll.
  React.useEffect(() => {
    let raf = 0;
    const read = () => {
      raf = 0;
      const next = window.scrollY > 80;
      setScrolled((s) => s === next ? s : next);
    };
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(read);
    };
    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // Lock body scroll while drawer is open, and close on Escape.
  React.useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => {if (e.key === "Escape") setOpen(false);};
    window.addEventListener("keydown", onKey);
    // re-render lucide icons inside the drawer
    requestAnimationFrame(() => window.lucide && lucide.createIcons());
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const EASE = "cubic-bezier(.2, 0.8, 0.2, 1)";
  const DUR = "140ms";

  return (
    <header style={{
      position: "sticky", top: 0, zIndex: 50,
      background: scrolled ? "rgba(246, 244, 239, 0.92)" : "var(--lb-paper)",
      backdropFilter: scrolled ? "saturate(140%) blur(10px)" : "none",
      WebkitBackdropFilter: scrolled ? "saturate(140%) blur(10px)" : "none",
      borderBottom: scrolled ?
      "1px solid var(--lb-paper-deep, rgba(0,0,0,0.10))" :
      "1px solid transparent",
      boxShadow: scrolled ? "0 6px 18px -16px rgba(20,18,14,0.35)" : "none",
      willChange: "background-color, box-shadow",
      transition: `background ${DUR} ${EASE}, border-color ${DUR} ${EASE}, box-shadow ${DUR} ${EASE}`
    }}>
      <div className="container" style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: `${scrolled ? 6 : 10}px var(--gutter)`,
        gap: 24,
        transition: `padding ${DUR} ${EASE}`
      }}>
        <a href="index.html" style={{
          display: "inline-flex",
          transformOrigin: "left center",
          transform: scrolled ? "scale(0.88)" : "scale(1)",
          transition: `transform ${DUR} ${EASE}`,
          willChange: "transform"
        }}>
          <Logo width={120} />
        </a>

        {/* Desktop nav */}
        <nav className="nav-desktop" style={{ gap: 30 }}>
          {nav.map((n) =>
          <a key={n.id} href={n.href}
          style={{
            fontFamily: "var(--font-sans)", fontSize: 15, fontWeight: 600,
            color: active === n.id ? "var(--lb-rust)" : "var(--lb-ink)",
            textDecoration: "none"
          }}>{n.label}</a>
          )}
        </nav>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {/* Phone CTA — full pill on desktop, icon-only on mobile */}
          <Button variant="cream" href="tel:2524950720" iconLeft="phone" className="header-phone-desktop">(252) 495-0720</Button>
          <a
            href="tel:2524950720"
            aria-label="Call (252) 495-0720"
            className="header-phone-mobile"
            style={{
              width: 44, height: 44,
              alignItems: "center", justifyContent: "center",
              background: "var(--lb-bone)",
              border: "1px solid var(--lb-paper-deep, rgba(0,0,0,0.08))",
              borderRadius: 999,
              color: "var(--lb-ink)",
              textDecoration: "none"
            }}>
            <Icon name="phone" size={18} />
          </a>
          {/* Primary CTA — stays visible on every screen size */}
          <Button variant="primary" href="https://forms.example.com/lumberbros-quote" iconRight="arrow-up-right" className="header-cta-primary">Get a free quote</Button>

          {/* Hamburger — mobile only */}
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="site-mobile-drawer"
            onClick={() => setOpen((v) => !v)}
            className="nav-mobile-toggle"
            style={{
              width: 44, height: 44,
              alignItems: "center", justifyContent: "center",
              background: "transparent",
              border: "1px solid var(--lb-paper-deep, rgba(0,0,0,0.12))",
              borderRadius: 8,
              color: "var(--lb-ink)",
              cursor: "pointer",
              padding: 0
            }}>
            <Icon name={open ? "x" : "menu"} size={22} />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        id="site-mobile-drawer"
        aria-hidden={!open}
        onClick={() => setOpen(false)}
        style={{
          position: "fixed", inset: 0, top: 0,
          background: "rgba(20, 18, 14, 0.45)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "opacity 220ms ease",
          zIndex: 60
        }}>
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          onClick={(e) => e.stopPropagation()}
          style={{
            position: "absolute", top: 0, right: 0, bottom: 0,
            width: "min(86vw, 360px)",
            background: "var(--lb-paper)",
            boxShadow: "-20px 0 60px rgba(0,0,0,0.18)",
            transform: open ? "translateX(0)" : "translateX(100%)",
            transition: "transform 260ms cubic-bezier(.2,.7,.2,1)",
            display: "flex", flexDirection: "column",
            padding: "22px 24px 28px",
            gap: 8
          }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Logo width={130} />
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              style={{
                width: 40, height: 40,
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                background: "transparent", border: "none", color: "var(--lb-ink)",
                cursor: "pointer", padding: 0
              }}>
              <Icon name="x" size={22} />
            </button>
          </div>

          <nav style={{
            display: "flex", flexDirection: "column",
            marginTop: 18, borderTop: "1px solid var(--lb-paper-deep, rgba(0,0,0,0.08))"
          }}>
            {nav.map((n) =>
            <a
              key={n.id}
              href={n.href}
              onClick={() => setOpen(false)}
              style={{
                fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 700,
                letterSpacing: "-0.01em",
                color: active === n.id ? "var(--lb-rust)" : "var(--lb-ink)",
                textDecoration: "none",
                padding: "18px 0",
                borderBottom: "1px solid var(--lb-paper-deep, rgba(0,0,0,0.08))",
                display: "flex", alignItems: "center", justifyContent: "space-between"
              }}>
                {n.label}
                <Icon name="arrow-up-right" size={18} />
              </a>
            )}
          </nav>

          <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: 12 }}>
            <Button variant="cream" href="tel:2524950720" iconLeft="phone">(252) 495-0720</Button>
            <Button variant="primary" href="https://forms.example.com/lumberbros-quote" iconRight="arrow-up-right">Get a free quote</Button>
            <div style={{
              marginTop: 6,
              fontFamily: "var(--font-sans)", fontSize: 13,
              color: "var(--fg-muted)", lineHeight: 1.5
            }}>
              Mon–Sat, 7:00a–6:00p
            </div>
          </div>
        </div>
      </div>
    </header>);

};

/* ============================================================
   Site Footer
   ============================================================ */
const SiteFooter = () =>
<footer className="bg-black" style={{ color: "var(--lb-bone)", paddingTop: 96, paddingBottom: 48 }}>
    <div className="container row-4" style={{ gap: 48 }}>
      <div>
        <Logo width={220} inverse style={{ maxWidth: "min(220px, 70vw)" }} />
        <p style={{ fontFamily: "var(--font-sans)", fontSize: 15, color: "rgba(251,247,238,0.7)", marginTop: 28, maxWidth: 340, lineHeight: 1.55 }}>
          Family-run tree service, sawmill, and custom-build shop. Serving Eastern North Carolina since 2024.
        </p>
      </div>
      <div>
        <div style={{ fontFamily: "var(--font-sans)", fontSize: 15, fontWeight: 700, color: "var(--lb-sawdust)" }}>Services</div>
        <ul style={{ listStyle: "none", padding: 0, margin: "18px 0 0", display: "flex", flexDirection: "column", gap: 10 }}>
          {["Precision Tree Removal", "Milling", "Custom Builds", "Wood Products"].map((s) =>
        <li key={s}><a href="#" style={{ color: "rgba(251,247,238,0.85)", fontFamily: "var(--font-sans)", fontSize: 15, textDecoration: "none" }}>{s}</a></li>
        )}
        </ul>
      </div>
      <div>
        <div style={{ fontFamily: "var(--font-sans)", fontSize: 15, fontWeight: 700, color: "var(--lb-sawdust)" }}>Service areas</div>
        <ul style={{ listStyle: "disc", padding: 0, margin: "18px 0 0", paddingLeft: 20, display: "flex", flexDirection: "column", gap: 10 }}>
          {["Beaufort County", "Pitt County", "Washington County"].map((s) =>
        <li key={s} style={{ color: "rgba(251,247,238,0.85)", fontFamily: "var(--font-sans)", fontSize: 15 }}>{s}</li>
        )}
        </ul>
        <div style={{ marginTop: 14, color: "rgba(251,247,238,0.6)", fontFamily: "var(--font-sans)", fontSize: 13, lineHeight: 1.5 }}>
          Surrounding areas on a case-by-case basis.
        </div>
      </div>
      <div>
        <div style={{ fontFamily: "var(--font-sans)", fontSize: 15, fontWeight: 700, color: "var(--lb-sawdust)" }}>Contact us</div>
        <div style={{ marginTop: 18, display: "flex", flexDirection: "column", gap: 14 }}>
          <a href="tel:2524950720" style={{ fontFamily: "var(--font-display)", fontSize: 28, color: "var(--lb-bone)", fontWeight: 700, letterSpacing: "-0.01em", textDecoration: "none", lineHeight: 1.1 }}>
            (252) 495-0720
          </a>
          <a href="mailto:hello@lumberbros.co" style={{ color: "rgba(251,247,238,0.85)", fontFamily: "var(--font-sans)", fontSize: 15, textDecoration: "none" }}>
            hello@lumberbros.co
          </a>
          <div style={{ color: "rgba(251,247,238,0.7)", fontFamily: "var(--font-sans)", fontSize: 14, lineHeight: 1.5 }}>
            Mon–Sat, 7:00a–6:00p
          </div>
        </div>
      </div>
    </div>
    <div className="container" style={{
    marginTop: 80,
    display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12,
    fontFamily: "var(--font-sans)", fontSize: 13, color: "rgba(251,247,238,0.5)"
  }}>
      <span>© 2025 Lumber Bros. LLC · Washington, NC</span>
      <span>ISA Professional Member CSID: 374451</span>
    </div>
  </footer>;


/* ============================================================
   Quote CTA — external form link (no on-site capture)
   ============================================================ */
const QuoteForm = ({ compact = false, externalUrl = "https://forms.example.com/lumberbros-quote" }) =>
<div className="card" style={{
  background: "var(--lb-bone)",
  padding: compact ? 32 : 40,
  borderRadius: 10,
  display: "flex", flexDirection: "column", gap: 24
}}>
    <div>
      <div className="display" style={{ fontSize: compact ? 34 : 42, color: "var(--lb-navy)", lineHeight: 1.0, letterSpacing: "-0.01em" }}>
        Tell us about the job
      </div>
    </div>
    <p style={{ fontFamily: "var(--font-sans)", fontSize: 16, color: "var(--fg-soft)", margin: 0, lineHeight: 1.55, maxWidth: "40ch" }}>
      Short form. Photos welcome — in many cases we can quote without coming out.
    </p>

    <div style={{
    display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12
  }}>
      {[
    ["clock", "24 hr", "Reply time"],
    ["shield-check", "$2M", "Insured"],
    ["check", "Fixed", "Locked-in quote"],
    ["map-pin", "3 cos.", "Beaufort · Pitt · Washington"]].
    map(([icon, big, small], i) =>
    <div key={i} className="card-paper" style={{
      background: "var(--lb-paper-deep)", borderRadius: 8,
      padding: "16px 18px",
      display: "flex", flexDirection: "column", gap: 6
    }}>
          <Icon name={icon} size={16} style={{ color: "var(--lb-sage)" }} />
          <div style={{ fontFamily: "var(--font-display)", fontSize: 24, color: "var(--lb-navy)", lineHeight: 1, letterSpacing: "-0.005em", fontWeight: 700 }}>{big}</div>
          <div style={{ fontFamily: "var(--font-sans)", fontSize: 12, color: "var(--fg-muted)", lineHeight: 1.3 }}>{small}</div>
        </div>
    )}
    </div>

    <Button variant="primary" size="lg" href={externalUrl} iconRight="arrow-up-right">Start my quote</Button>

    <div style={{ fontFamily: "var(--font-sans)", fontSize: 14, color: "var(--fg-muted)" }}>
      Or call <a href="tel:2524950720" style={{ color: "var(--lb-navy)", fontWeight: 700 }}>(252) 495-0720</a> · text the same number · email <a href="mailto:hello@lumberbros.co" style={{ color: "var(--lb-navy)" }}>hello@lumberbros.co</a>
    </div>
  </div>;


/* ============================================================
   Review card — bone fill, no border
   ============================================================ */
const ReviewCard = ({ stars = 5, text, author, sub }) =>
<div className="card" style={{
  background: "var(--lb-bone)",
  padding: "32px 34px",
  borderRadius: 10,
  display: "flex", flexDirection: "column", gap: 18,
  height: "100%"
}}>
    <div style={{ color: "var(--lb-sawdust)", fontSize: 16, letterSpacing: "3px" }}>
      {"★".repeat(stars)}
    </div>
    <blockquote className="italic-display" style={{
    fontSize: 24, lineHeight: 1.35, margin: 0, color: "var(--lb-ink)"
  }}>
      "{text}"
    </blockquote>
    <div style={{ marginTop: "auto",
    fontFamily: "var(--font-sans)", fontSize: 14, fontWeight: 600,
    color: "var(--fg-muted)" }}>
      — {author}{sub ? <span style={{ marginLeft: 8, opacity: 0.7 }}>· {sub}</span> : null}
    </div>
  </div>;


/* ============================================================
   Marquee strip — used across landing pages
   ============================================================ */
const MarqueeStrip = () => {
  // Repeat enough times to make the strip feel continuous regardless of viewport width.
  const items = Array.from({ length: 12 });
  return (
    <section
      aria-label="Making the most of every tree"
      className="marquee"
      style={{
        background: "var(--lb-navy)",
        color: "var(--lb-bone)",
        overflow: "hidden",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        borderBottom: "1px solid rgba(255,255,255,0.06)"
      }}>
      <div className="marquee-track" style={{
        display: "flex",
        gap: 56,
        padding: "18px 0",
        whiteSpace: "nowrap",
        width: "max-content"
      }}>
        {items.map((_, i) =>
        <span key={i} style={{
          display: "inline-flex", alignItems: "center", gap: 56,


          fontSize: "clamp(22px, 2.4vw, 30px)",
          letterSpacing: "0.02em",
          lineHeight: 1,
          color: "var(--lb-bone)",
          textTransform: "uppercase", fontFamily: "\"Encode Sans SemiExpanded\"", fontWeight: "700"
        }}>
            No tree wasted
            <img
            src="../assets/Leaf.svg"
            alt=""
            aria-hidden="true"
            style={{
              width: "clamp(30px, 3.2vw, 40px)",
              height: "clamp(30px, 3.2vw, 40px)",
              display: "block",
              filter: "brightness(0) invert(1)",
              flex: "0 0 auto"
            }} />
          </span>
        )}
      </div>
    </section>);

};

Object.assign(window, {
  Icon, Button, Chip, ChipRow, TrustSignals, Photo, Logo,
  SiteHeader, SiteFooter, QuoteForm, ReviewCard, MarqueeStrip
});
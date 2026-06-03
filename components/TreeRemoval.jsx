/* ============================================================
   Tree Removal Landing Page sections
   ============================================================ */

const TRHero = () => {
  const locations = [
    "Small yards & narrow gates",
    "Trees over or against structures",
    "Historic homes with immaculate landscaping",
    "Anywhere heavy equipment can't reach",
  ];

  return (
    <section className="tr-hero-v2" style={{ paddingBottom: 28 }}>
      <div className="container">
        <div className="tr-hero-v2-grid">
          {/* Text column */}
          <div className="tr-hero-v2-text">
            <div className="tr-hero-v2-headline" style={{ gap: 28 }}>
              <h1 className="tr-hero-v2-eyebrow" style={{ color: "var(--lb-ink)" }}>
                Tree Service in Washington, Beaufort, and Pitt County NC
              </h1>
              <h2 className="display tr-hero-v2-title" style={{
                color: "var(--lb-navy)",
                margin: 0,
              }}>
                <em style={{ fontStyle: "normal", color: "var(--lb-navy)", whiteSpace: "nowrap" }}>Tight-space</em> <span style={{ whiteSpace: "nowrap" }}>tree removal</span>
              </h2>
            </div>

            <p className="tr-hero-v2-sub">
              We use time-tested rigging techniques and minimal equipment to remove trees and limbs from hazardous or limited-access locations:
            </p>

            <TrustSignals items={locations} columns={2} />

            <div className="tr-hero-v2-cta">
              <Button variant="primary" size="lg" href="https://forms.example.com/lumberbros-quote" iconRight="arrow-up-right">Get a free quote</Button>
              <Button variant="cream" size="lg" href="tel:2524950720" iconLeft="phone">(252) 495-0720</Button>
            </div>
          </div>

          {/* Video column — brand loop, webm for Chrome/Firefox/Edge, mp4 for Safari.
               Container is a single-cell CSS grid so the video child stretches to
               fill 100% width and height at every viewport size without needing
               position:absolute or any fixed dimensions. */}
          <div className="tr-hero-v2-photo-wrap tr-hero-v2-photo" style={{ overflow: "hidden" }}>
            <video
              autoPlay
              loop
              muted
              playsInline
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transform: "scale(1.05)",
              }}>
              <source src="assets/lumber_bros_loop.webm" type="video/webm" />
              <source src="assets/lumber_bros_loop.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
    </section>
  );
};

const TRTrustBar = () => {
  const items = [
    { icon: "shield-check", label: "Fully Insured" },
    { icon: "check",        label: "Locally Owned & Operated" },
    { image: "assets/isa_logo.png", imgAlt: "International Society of Arboriculture member badge", label: "ISA Professional Member", sub: "CSID: 374451" },
    { image: "assets/nc_forestry_association_logo.png", imgAlt: "North Carolina Forestry Association logo", label: "NCFA Member" },
  ];
  return (
    <section className="tr-trust-bar" aria-label="Credentials">
      <div className="container">
        <div className="tr-trust-bar-row">
          {items.map((v, i) => (
            <div key={i} className="tr-trust-bar-cell">
              {v.image ? (
                <img
                  src={v.image}
                  alt={v.imgAlt || ""}
                  className="tr-trust-bar-img"
                  style={{ flex: "0 0 auto" }}
                />
              ) : (
                <Icon name={v.icon} size={32} style={{ color: "var(--lb-rust)", flex: "0 0 auto" }} />
              )}
              <div className="tr-trust-bar-label">
                {v.label}
                {v.sub ? (
                  <div className="tr-trust-bar-sublabel">{v.sub}</div>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const TR_REVIEWS = [
  {
    text: "Alex responded to our voicemail super fast and came right out for a quote. Our neighbors were super impressed with how tidy their backyard was after the work was complete.",
    author: "M. Cordes",
    sub: "Washington Co.",
  },
  {
    text: "Very nice and professional. Would recommend to anyone.",
    author: "J. Cobb",
    sub: "Pitt Co.",
  },
  {
    text: "These guys were patient and precise...two qualities I'll take all day long when someone is bringing a tree down 10 feet from my house!",
    author: "S. Bircher",
    sub: "Craven Co.",
  },
];

const TRReviews = () => {
  const [idx, setIdx] = React.useState(0);
  const total = TR_REVIEWS.length;
  const trackRef = React.useRef(null);

  const go = (next) => setIdx(((next % total) + total) % total);
  const prev = () => go(idx - 1);
  const next = () => go(idx + 1);

  // Keyboard support when carousel is focused
  const onKey = (e) => {
    if (e.key === "ArrowLeft")  { e.preventDefault(); prev(); }
    if (e.key === "ArrowRight") { e.preventDefault(); next(); }
  };

  // Swipe support — pointer events, threshold = 40px
  const pointer = React.useRef({ x: 0, active: false });
  const onPointerDown = (e) => {
    pointer.current = { x: e.clientX, active: true };
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };
  const onPointerUp = (e) => {
    if (!pointer.current.active) return;
    const dx = e.clientX - pointer.current.x;
    pointer.current.active = false;
    if (Math.abs(dx) > 40) (dx < 0 ? next : prev)();
  };

  return (
    <section className="section-tight">
      <div className="container">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 40, gap: 24, flexWrap: "wrap" }}>
          <h2 className="display" style={{ fontSize: "clamp(40px, 4.6vw, 60px)", color: "var(--lb-navy)", margin: 0, maxWidth: "14ch" }}>
            Proof's in the puddin'
          </h2>
          <a
            href="https://share.google/csb9JwBUlxPuIa7q1"
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              e.preventDefault();
              const url = "https://share.google/csb9JwBUlxPuIa7q1";
              try {
                window.open(url, "_blank", "noopener,noreferrer");
              } catch {
                window.top.location.href = url;
              }
            }}
            style={{ fontFamily: "var(--font-sans)", fontSize: 15, fontWeight: 600, color: "var(--lb-navy)", cursor: "pointer" }}>
            Read our Google reviews →
          </a>
        </div>

        <div
          role="region"
          aria-roledescription="carousel"
          aria-label="Customer reviews"
          tabIndex={0}
          onKeyDown={onKey}
          style={{ outline: "none", position: "relative" }}>

          {/* Viewport */}
          <div
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
            onPointerCancel={() => (pointer.current.active = false)}
            style={{
              overflow: "hidden",
              borderRadius: 10,
              touchAction: "pan-y",
              cursor: "grab",
              userSelect: "none",
            }}>
            <div
              ref={trackRef}
              style={{
                display: "flex",
                width: `${total * 100}%`,
                transform: `translateX(-${idx * (100 / total)}%)`,
                transition: "transform 380ms cubic-bezier(.2,.7,.2,1)",
              }}>
              {TR_REVIEWS.map((r, i) => (
                <div
                  key={i}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${i + 1} of ${total}`}
                  aria-hidden={i !== idx}
                  style={{ width: `${100 / total}%`, flex: "0 0 auto", padding: "0 2px" }}>
                  <div style={{ maxWidth: 880, margin: "0 auto" }}>
                    <ReviewCard text={r.text} author={r.author} sub={r.sub} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Controls row */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            marginTop: 24, gap: 16, flexWrap: "wrap",
          }}>
            <div style={{ display: "flex", gap: 10 }}>
              {TR_REVIEWS.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Go to review ${i + 1}`}
                  aria-current={i === idx}
                  onClick={() => go(i)}
                  style={{
                    width: i === idx ? 28 : 10,
                    height: 10,
                    borderRadius: 999,
                    border: "none",
                    cursor: "pointer",
                    background: i === idx ? "var(--lb-navy)" : "var(--lb-paper-deep, rgba(0,0,0,0.18))",
                    padding: 0,
                    transition: "width 240ms ease, background 240ms ease",
                  }}
                />
              ))}
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button
                type="button"
                aria-label="Previous review"
                onClick={prev}
                style={{
                  width: 48, height: 48, borderRadius: 999,
                  border: "1px solid var(--lb-paper-deep, rgba(0,0,0,0.12))",
                  background: "var(--lb-bone)", color: "var(--lb-ink-soft)",
                  display: "inline-flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer",
                }}>
                <Icon name="arrow-left" size={20} />
              </button>
              <button
                type="button"
                aria-label="Next review"
                onClick={next}
                style={{
                  width: 48, height: 48, borderRadius: 999,
                  border: "1px solid var(--lb-paper-deep, rgba(0,0,0,0.12))",
                  background: "var(--lb-bone)", color: "var(--lb-ink-soft)",
                  display: "inline-flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer",
                }}>
                <Icon name="arrow-right" size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const TRProblems = () => (
  <section className="section bg-paper-deep">
    <div className="container">
      <div className="row-2-split-wide">
        <div>
          <h2 className="display" style={{ fontSize: "clamp(40px, 4.8vw, 64px)", color: "var(--lb-navy)", margin: 0, marginBottom: 24, lineHeight: 1.0 }}>
            Tree problems don't fix themselves
          </h2>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 17, color: "var(--fg-soft)", lineHeight: 1.6, margin: 0, maxWidth: "42ch" }}>
            Whether it's a pine leaning toward your roof or an old pecan that's finally given up, the longer you wait, the riskier and more expensive it gets.
          </p>
        </div>
        <ul className="row-2-tight" style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {[
            ["cloud-lightning",    "Storm- or wind-damaged trees"],
            ["alert-triangle",     "Dead, diseased, or compromised"],
            ["home",               "Too close to home, barn, or fence"],
            ["zap",                "Over or near power lines"],
            ["sun",                "Blocking light or killing landscaping"],
            ["construction",       "Clearing for a new build or carport"],
          ].map(([icon, t]) => (
            <li key={t} style={{
              padding: "20px 22px",
              background: "var(--lb-bone)",
              borderRadius: 8,
              display: "flex", gap: 14, alignItems: "center",
            }}>
              <Icon name={icon} size={22} style={{ color: "var(--lb-rust)", flex: "0 0 auto" }} />
              <span style={{ fontFamily: "var(--font-sans)", fontSize: 16, fontWeight: 600, color: "var(--lb-ink)" }}>{t}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>
);

const TR_RECENT_WORK = [
  { tone: "forest", tag: "Removing two large pines • Washington, NC",   src: "assets/pine-tree-removal-before-after.webp" },
  { tone: "forest", tag: "Alex rigging a limb • Washington, NC",        src: "assets/photos/arborist-climbing-tall-pine-tree-7.webp" },
  { tone: "forest", tag: "Making cookies • Williamston, NC",            src: "assets/photos/woman-chainsaw-cutting-log.webp" },
  { tone: "amber",  tag: "Old growth Pecan removal • Williamston, NC",  src: "assets/photos/cut-logs-farmhouse-yard.webp" },
  { tone: "forest", tag: "Storm cleanup • Greenville, NC",              src: "assets/photos/fallen-tree-logs-brick-house.webp" },
  { tone: "forest", tag: "Alex chunking a huge spar • Washington, NC",  src: "assets/photos/woman-chainsawing-log-outdoors.webp" },
];

/* Photo lightbox modal — full-viewport overlay, image shown at its natural
   aspect ratio. Tap the backdrop or the X button to dismiss. */
const PhotoModal = ({ src, tag, onClose }) => {
  // Lock body scroll and wire up Escape key while open
  React.useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    // Re-render any lucide icons inside the modal
    requestAnimationFrame(() => window.lucide && lucide.createIcons());
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Photo expanded view"
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 200,
        background: "rgba(14, 12, 8, 0.88)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "24px 16px",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        animation: "photoModalIn 180ms cubic-bezier(.2,.7,.2,1) both",
      }}>
      {/* Close button — top right of the viewport, always visible */}
      <button
        type="button"
        aria-label="Close photo"
        onClick={onClose}
        style={{
          position: "fixed", top: 16, right: 16, zIndex: 201,
          width: 44, height: 44, borderRadius: 999,
          background: "rgba(14,12,8,0.72)",
          border: "1px solid rgba(255,255,255,0.18)",
          color: "#fff",
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", padding: 0,
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          transition: "background 160ms ease",
        }}
        onMouseEnter={e => e.currentTarget.style.background = "rgba(40,35,25,0.92)"}
        onMouseLeave={e => e.currentTarget.style.background = "rgba(14,12,8,0.72)"}>
        <Icon name="x" size={20} />
      </button>

      {/* Image container — stops the close-on-click from firing on the image itself */}
      <div
        onClick={e => e.stopPropagation()}
        style={{
          position: "relative",
          maxWidth: "min(92vw, 1200px)",
          maxHeight: "calc(100dvh - 80px)",
          display: "flex", flexDirection: "column",
          animation: "photoModalImgIn 220ms cubic-bezier(.2,.7,.2,1) both",
        }}>
        <img
          src={src}
          alt={tag || "Job photo"}
          style={{
            display: "block",
            maxWidth: "100%",
            maxHeight: "calc(100dvh - 112px)",
            width: "auto",
            height: "auto",
            objectFit: "contain",
            borderRadius: 8,
            boxShadow: "0 32px 80px rgba(0,0,0,0.6)",
          }} />
        {tag && (
          <div style={{
            marginTop: 12,
            fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 600,
            color: "rgba(255,255,255,0.65)",
            letterSpacing: "0.02em",
            textAlign: "center",
          }}>
            {tag}
          </div>
        )}
      </div>

      <style>{`
        @keyframes photoModalIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes photoModalImgIn {
          from { opacity: 0; transform: scale(0.96) translateY(8px); }
          to   { opacity: 1; transform: scale(1)    translateY(0);   }
        }
      `}</style>
    </div>
  );
};

/* Recent work — native horizontal scroll w/ scroll-snap. Multiple photos
   visible at once on desktop (grid feel); on mobile each card is ~80% width
   so the next card peeks past the edge, signalling the swipe affordance. */
const TRRecentWork = () => {
  const total = TR_RECENT_WORK.length;
  const trackRef = React.useRef(null);
  const [idx, setIdx] = React.useState(0);
  const [edges, setEdges] = React.useState({ atStart: true, atEnd: false });
  const [modal, setModal] = React.useState(null); // { src, tag } | null

  // Width of one card (incl. gap) — measured from the live track so the math
  // matches whatever the CSS produced at the current viewport.
  const cardStep = () => {
    const track = trackRef.current;
    if (!track) return 0;
    const first  = track.children[0];
    const second = track.children[1];
    if (!first) return 0;
    if (second) return second.getBoundingClientRect().left - first.getBoundingClientRect().left;
    return first.getBoundingClientRect().width;
  };

  const scrollToIdx = (i) => {
    const track = trackRef.current;
    if (!track) return;
    const step = cardStep();
    track.scrollTo({ left: Math.max(0, i * step), behavior: "smooth" });
  };

  const prev = () => scrollToIdx(Math.max(0, idx - 1));
  const next = () => scrollToIdx(Math.min(total - 1, idx + 1));

  // Sync idx + edge state from scroll position. rAF-throttled.
  React.useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let raf = 0;
    const read = () => {
      raf = 0;
      const step = cardStep() || 1;
      const i = Math.round(track.scrollLeft / step);
      setIdx(prev => (prev === i ? prev : i));
      const maxScroll = track.scrollWidth - track.clientWidth;
      setEdges({
        atStart: track.scrollLeft <= 2,
        atEnd:   track.scrollLeft >= maxScroll - 2,
      });
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(read); };
    read();
    track.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", read);
    return () => {
      track.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", read);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const onKey = (e) => {
    if (e.key === "ArrowLeft")  { e.preventDefault(); prev(); }
    if (e.key === "ArrowRight") { e.preventDefault(); next(); }
  };

  return (
    <>
    <section className="section-tight" id="recent-work">
      <div className="container">
        <div style={{
          display: "flex", alignItems: "flex-end", justifyContent: "space-between",
          marginBottom: 40, gap: 24, flexWrap: "wrap",
        }}>
          <h2 className="display" style={{
            fontSize: "clamp(40px, 4.8vw, 64px)",
            color: "var(--lb-navy)", margin: 0, lineHeight: 1.0, maxWidth: "14ch",
          }}>
            On the job
          </h2>
          <span style={{
            fontFamily: "var(--font-sans)", fontSize: 14, fontWeight: 600,
            color: "var(--fg-muted)",
          }}>
            {String(Math.min(idx + 1, total)).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
        </div>

        <div
          role="region"
          aria-roledescription="carousel"
          aria-label="Recent work photos"
          tabIndex={0}
          onKeyDown={onKey}
          style={{ outline: "none" }}>

          {/* Scroll track — native momentum + scroll-snap. Negative margin lets
              cards bleed to the container edge on mobile so the peek is real. */}
          <div ref={trackRef} className="tr-recent-track">
            {TR_RECENT_WORK.map((p, i) => (
              <div
                key={i}
                className="tr-recent-slide"
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${total}`}>
                <button
                  type="button"
                  aria-label={`Expand photo: ${p.tag}`}
                  onClick={() => setModal({ src: p.src, tag: p.tag })}
                  style={{
                    all: "unset",
                    display: "block",
                    width: "100%",
                    cursor: "zoom-in",
                    position: "relative",
                    borderRadius: 8,
                    overflow: "hidden",
                  }}
                  className="tr-recent-photo-btn">
                  <Photo
                    tone={p.tone}
                    tag={p.tag}
                    desc={p.desc}
                    src={p.src}
                    className="tr-recent-photo" />
                  {/* Expand hint icon — visible on hover/focus, always on touch */}
                  <span aria-hidden="true" style={{
                    position: "absolute", bottom: 12, right: 12,
                    width: 34, height: 34, borderRadius: 999,
                    background: "rgba(14,12,8,0.55)",
                    backdropFilter: "blur(6px)",
                    WebkitBackdropFilter: "blur(6px)",
                    border: "1px solid rgba(255,255,255,0.18)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#fff",
                    pointerEvents: "none",
                    transition: "opacity 160ms ease",
                  }} className="tr-recent-expand-hint">
                    <Icon name="expand" size={15} />
                  </span>
                </button>
              </div>
            ))}
          </div>

          {/* Controls row */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            marginTop: 24, gap: 16, flexWrap: "wrap",
          }}>
            <div style={{ display: "flex", gap: 10 }}>
              {TR_RECENT_WORK.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Go to photo ${i + 1}`}
                  aria-current={i === idx}
                  onClick={() => scrollToIdx(i)}
                  style={{
                    width: i === idx ? 28 : 10,
                    height: 10,
                    borderRadius: 999,
                    border: "none",
                    cursor: "pointer",
                    background: i === idx ? "var(--lb-navy)" : "var(--lb-paper-deep, rgba(0,0,0,0.18))",
                    padding: 0,
                    transition: "width 240ms ease, background 240ms ease",
                  }}
                />
              ))}
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button
                type="button"
                aria-label="Previous photo"
                onClick={prev}
                disabled={edges.atStart}
                style={{
                  width: 48, height: 48, borderRadius: 999,
                  border: "1px solid var(--lb-paper-deep, rgba(0,0,0,0.12))",
                  background: "var(--lb-bone)", color: "var(--lb-ink-soft)",
                  display: "inline-flex", alignItems: "center", justifyContent: "center",
                  cursor: edges.atStart ? "default" : "pointer",
                  opacity: edges.atStart ? 0.4 : 1,
                  transition: "opacity 180ms ease",
                }}>
                <Icon name="arrow-left" size={20} />
              </button>
              <button
                type="button"
                aria-label="Next photo"
                onClick={next}
                disabled={edges.atEnd}
                style={{
                  width: 48, height: 48, borderRadius: 999,
                  border: "1px solid var(--lb-paper-deep, rgba(0,0,0,0.12))",
                  background: "var(--lb-bone)", color: "var(--lb-ink-soft)",
                  display: "inline-flex", alignItems: "center", justifyContent: "center",
                  cursor: edges.atEnd ? "default" : "pointer",
                  opacity: edges.atEnd ? 0.4 : 1,
                  transition: "opacity 180ms ease",
                }}>
                <Icon name="arrow-right" size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Lightbox modal */}
    {modal && (
      <PhotoModal
        src={modal.src}
        tag={modal.tag}
        onClose={() => setModal(null)}
      />
    )}

    <style>{`
      /* On pointer-fine devices (mouse), hide the expand hint until hover */
      @media (hover: hover) and (pointer: fine) {
        .tr-recent-expand-hint { opacity: 0; }
        .tr-recent-photo-btn:hover .tr-recent-expand-hint,
        .tr-recent-photo-btn:focus-visible .tr-recent-expand-hint { opacity: 1; }
      }
      /* On touch devices always show the hint so it's discoverable */
      @media (hover: none) {
        .tr-recent-expand-hint { opacity: 1; }
      }
    `}</style>
    </>
  );
};

const TRHowItWorks = () => (
  <section className="section bg-paper-deep">
    <div className="container">
      <div style={{ marginBottom: 64 }}>
        <h2 className="display" style={{ fontSize: "clamp(44px, 5vw, 68px)", color: "var(--lb-navy)", margin: 0, maxWidth: "14ch" }}>
          How it works
        </h2>
      </div>
      <div className="row-3">
        {[
          { n: "01", t: "Receive a fixed quote",
            b: "We evaluate the job and give you an itemized quote that will never change. In many cases we can quote from photos, no visit required." },
          { n: "02", t: "Schedule at your convenience",
            b: "Call us, text us, or book online. Our calendar is always current and we'll confirm a time that works for you." },
          { n: "03", t: "Flexible payment options",
            b: "We accept cash, card, and check. Financing is also available." },
        ].map((s) => (
          <div key={s.n} className="card" style={{
            background: "var(--lb-bone)",
            padding: "40px 36px",
            display: "flex", flexDirection: "column", gap: 18,
          }}>
            <div className="display" style={{ fontSize: 56, lineHeight: 1, color: "var(--lb-rust)" }}>{s.n}</div>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: 28, color: "var(--lb-navy)", margin: 0, lineHeight: 1.1, letterSpacing: "-0.01em" }}>{s.t}</h3>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: 15, color: "var(--fg-soft)", margin: 0, lineHeight: 1.55 }}>{s.b}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const TRSaveCallout = () => (
  <section className="section-tight bg-navy" style={{ color: "var(--lb-bone)" }}>
    <div className="container row-2-split">
      <div style={{ textAlign: "left" }}>
        <div className="display" style={{
          fontSize: "clamp(56px, 11vw, 110px)",
          lineHeight: 0.9,
          color: "var(--lb-sawdust)",
          margin: 0,
          letterSpacing: "-0.02em",
          textAlign: "left",
        }}>
          <span>Get up to 30% off</span>
        </div>
        <h2 className="display" style={{
          fontSize: "clamp(32px, 3.6vw, 44px)",
          color: "var(--lb-bone)",
          margin: "16px 0",
          lineHeight: 1.0,
          letterSpacing: "-0.01em",
        }}>
          <span>with <em style={{ fontStyle: "italic" }}>Help and Save</em></span>
        </h2>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: 17, color: "rgba(251,247,238,0.8)", lineHeight: 1.55, maxWidth: "50ch", margin: 0 }}>
          We handle the dangerous stuff. Then, you help us clean up. Real savings for folks who don't mind getting their hands dirty.
        </p>
        {/* CTA removed — "Learn more" → "#help-and-save" goes here once the Help & Save page is live */}
      </div>

      {/* Simpler visual: clean two-row split, no icons */}
      <div style={{
        background: "rgba(251,247,238,0.06)",
        borderRadius: 10,
        padding: 0,
        display: "grid",
        gridTemplateColumns: "1fr",
      }}>
        <div style={{ padding: "28px 32px" }}>
          <div style={{ fontFamily: "var(--font-sans)", fontSize: 14, fontWeight: 700, color: "var(--lb-bone)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Our job</div>
          <div style={{
            marginTop: 10,
            fontFamily: "var(--font-display)",
            fontSize: "clamp(22px, 2.2vw, 28px)",
            fontWeight: 700,
            color: "var(--lb-bone)",
            lineHeight: 1.2,
            letterSpacing: "-0.005em",
          }}>
            Climbing, rigging, felling, and heavy logs
          </div>
        </div>
        <div style={{ height: 1, background: "rgba(251,247,238,0.12)" }} />
        <div style={{ padding: "28px 32px" }}>
          <div style={{ fontFamily: "var(--font-sans)", fontSize: 14, fontWeight: 700, color: "var(--lb-sawdust)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Your job</div>
          <div style={{
            marginTop: 10,
            fontFamily: "var(--font-display)",
            fontSize: "clamp(22px, 2.2vw, 28px)",
            fontWeight: 700,
            color: "var(--lb-sawdust)",
            lineHeight: 1.2,
            letterSpacing: "-0.005em",
          }}>
            Limbs, leaves, and firewood
          </div>
        </div>
      </div>
    </div>
  </section>
);

const TRPrinciples = () => (
  <section className="section">
    <div className="container">
      <div style={{ marginBottom: 64, maxWidth: 880 }}>
        <h2 className="display" style={{ fontSize: "clamp(44px, 5vw, 68px)", color: "var(--lb-navy)", margin: 0, lineHeight: 1.0 }}>
          Old-school technique, modern ingenuity
        </h2>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: 17, color: "var(--fg-soft)", lineHeight: 1.6, margin: "24px 0 0", maxWidth: "60ch" }}>
          We match the solution to the job, not the other way around. Four things we won't compromise on.
        </p>
      </div>

      <div className="row-2-tight" style={{ gap: 16 }}>
        {[
          { n: "01", t: "We match the solution to the job, not the other way around.",
            b: "Small backyards, narrow side yards, trees wedged against structures — no problem. We combine legacy arborist techniques with modern equipment to keep our footprint small and your property protected." },
          { n: "02", t: "You only pay for what the job requires.",
            b: "No market rates. No inflated fees. We measure literally everything and price your job based on what it actually takes. Nothing more." },
          { n: "03", t: "The trees don't go to waste.",
            b: "We use the wood we take. What comes down from your yard often ends up in someone's home. That's local, sustainable forestry." },
          { n: "04", t: "You're covered if anything goes wrong.",
            b: "We carry $2 million in liability coverage and follow ISA best practices on every job." },
        ].map((p) => (
          <div key={p.n} className="card" style={{
            background: "var(--lb-bone)",
            padding: "32px 36px",
            display: "flex", flexDirection: "column", gap: 16,
          }}>
            <div className="display" style={{ fontSize: 30, color: "var(--lb-rust)" }}>{p.n}</div>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: 26, color: "var(--lb-navy)", margin: 0, lineHeight: 1.15, letterSpacing: "-0.01em", maxWidth: "22ch" }}>{p.t}</h3>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: 15, color: "var(--fg-soft)", margin: 0, lineHeight: 1.6 }}>{p.b}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const TRServiceAreas = () => (
  <section className="section-tight bg-paper">
    <div className="container">
      <div className="row-2-aside">
        <div>
          <h2 className="display" style={{ fontSize: "clamp(36px, 4.2vw, 56px)", color: "var(--lb-ink)", margin: 0, lineHeight: 1.0, marginBottom: 16 }}>
            Service areas
          </h2>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 14, color: "var(--fg-muted)", margin: 0, lineHeight: 1.55 }}>
            Surrounding areas considered case by case. Give us a call.
          </p>
          <div style={{ marginTop: 24 }}>
            <Button variant="cream" href="tel:2524950720" iconLeft="phone">(252) 495-0720</Button>
          </div>
        </div>
        <div className="row-3">
          {[
            { name: "Beaufort County" },
            { name: "Pitt County" },
            { name: "Washington County" },
          ].map(c => (
            <div key={c.name} className="card" style={{
              background: "var(--lb-bone)",
              padding: "20px 24px",
              display: "flex", flexDirection: "row", alignItems: "center", gap: 14,
            }}>
              <Icon name="map-pin" size={22} style={{ color: "var(--lb-rust)", flex: "0 0 auto" }} />
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: 24, color: "var(--lb-navy)", margin: 0, letterSpacing: "-0.005em", lineHeight: 1.2 }}>
                {c.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const TRDifferent = () => (
  <section className="section bg-paper-deep">
    <div className="container">
      <div className="row-2-split-wide">
        <div>
          <h2 className="display" style={{
            fontSize: "clamp(44px, 5.2vw, 72px)", color: "var(--lb-navy)",
            margin: 0, marginBottom: 24, lineHeight: 1.0
          }}>
            A different kind of tree service
          </h2>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 17, color: "var(--fg-soft)", lineHeight: 1.6, maxWidth: "42ch", margin: 0 }}>
            We'd rather build something with timber than see it mulched, burned, or buried. So we designed Lumber Bros differently. <strong style={{ color: "var(--lb-ink)", fontWeight: 700 }}>The result is pricing that's fair and affordable.</strong>
          </p>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 17, color: "var(--fg-soft)", lineHeight: 1.6, maxWidth: "42ch", marginTop: 18 }}>
            Not because we cut corners. Because we built an operation with a ridiculously low overhead.
          </p>
        </div>

        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 14 }}>
          {[
            "We buy and maintain used equipment (with cash) instead of financing new toys.",
            "We climb and rig whenever possible to minimize heavy machinery and fuel.",
            "We mill the timber we remove, and pass the savings to our customers.",
            "We run lean, using technology to cut the overhead that bloats most small businesses.",
          ].map((line, i) => (
            <li key={i} className="card" style={{
              background: "var(--lb-bone)",
              padding: "24px 28px",
              display: "grid",
              gridTemplateColumns: "36px 1fr",
              gap: 18,
              alignItems: "baseline",
            }}>
              <div className="display" style={{ fontSize: 24, color: "var(--lb-rust)" }}>0{i + 1}</div>
              <p style={{
                fontFamily: "var(--font-sans)", fontSize: 17, fontWeight: 500,
                color: "var(--lb-ink)", margin: 0, lineHeight: 1.5,
              }}>
                {line}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>
);

const FAQRow = ({ q, a, open, onToggle }) => {
  return (
    <div className="card" style={{
      background: open ? "var(--lb-bone)" : "transparent",
      padding: "4px 24px",
      transition: "background 200ms ease",
      borderRadius: 8,
    }}>
      <button onClick={onToggle} style={{
        all: "unset", width: "100%", cursor: "pointer",
        padding: "22px 0",
        display: "flex", justifyContent: "space-between", alignItems: "center", gap: 24,
      }}>
        <span style={{ fontFamily: "var(--font-sans)", fontSize: 18, fontWeight: 700, color: "var(--lb-ink)" }}>{q}</span>
        <span style={{ fontFamily: "var(--font-display)", fontSize: 28, color: "var(--lb-rust)", lineHeight: 1, transition: "transform 220ms ease", transform: open ? "rotate(45deg)" : "rotate(0)" }}>+</span>
      </button>
      {open && (
        <div style={{
          padding: "0 0 24px",
          fontFamily: "var(--font-sans)", fontSize: 16, color: "var(--fg-soft)", lineHeight: 1.6,
          maxWidth: "70ch",
        }}>{a}</div>
      )}
    </div>
  );
};

const TR_FAQS = [
  { q: "How do I get a quote?",
    a: <>Fill out our short form online or call us at <a href="tel:2524950720">(252) 495-0720</a>. We'll get back to you within 24 hours. In many cases we can quote from photos — no visit required.</> },
  { q: "Will the price change after you start the job?",
    a: "No. We provide fixed, itemized quotes before we touch anything. What we quote is what you pay." },
  { q: "Will you damage my lawn or landscaping?",
    a: "We climb and rig most jobs specifically to avoid this. No heavy equipment means no ruts, no crushed beds, no tracked-up yard." },
  { q: "Are you insured?",
    a: "Yes. We carry $2 million in general liability coverage on every job. You can request our certificate of insurance before we start." },
  { q: "Do you offer emergency service?",
    a: <>Yes. If a storm has created an immediate hazard, call us directly at <a href="tel:2524950720">(252) 495-0720</a>.</> },
  { q: "What happens to the wood and debris?",
    a: <>
        <p style={{ margin: 0 }}>We haul all debris and timber away to be repurposed into lumber, slabs, or other products through our woodworks operation — nothing goes to waste.</p>
        <p style={{ margin: "14px 0 0" }}>Alternatively, you can choose our Help &amp; Save option if you don't mind handling some of the smaller debris yourself.</p>
        <p style={{ margin: "14px 0 0" }}>You may also request firewood cut to size. Just ask us!</p>
      </> },
  { q: "Do I need a permit to remove a tree in Beaufort, Pitt, or Washington County?",
    a: "It depends on your municipality and the species of tree. Some towns have local ordinances governing removal of certain protected species. We'll help you understand what applies to your property when we come out." },
];

const TRFaq = () => {
  const [openIdx, setOpenIdx] = React.useState(0); // first item open by default
  return (
    <section className="section bg-paper-deep">
      <div className="container-narrow">
        <h2 className="display" style={{ fontSize: "clamp(40px, 4.8vw, 60px)", color: "var(--lb-navy)", margin: 0, marginBottom: 40, lineHeight: 1.0 }}>
          Frequently asked questions
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {TR_FAQS.map((item, i) => (
            <FAQRow
              key={i}
              q={item.q}
              a={item.a}
              open={openIdx === i}
              onToggle={() => setOpenIdx(openIdx === i ? -1 : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const TRFinalCTA = () => (
  <section className="section bg-navy" style={{ color: "var(--lb-bone)" }}>
    <div className="container" style={{ textAlign: "center" }}>
      <h2 className="display" style={{
        fontSize: "clamp(48px, 6.4vw, 104px)", color: "var(--lb-bone)",
        margin: "0 auto 24px", lineHeight: 0.95, maxWidth: "14ch", letterSpacing: "-0.015em"
      }}>
        Let's get that tree down
      </h2>
      <p style={{ fontFamily: "var(--font-sans)", fontSize: 19, color: "rgba(251,247,238,0.8)", margin: "0 auto", maxWidth: "44ch", lineHeight: 1.5 }}>
        We respond within 24 hours, guaranteed.
      </p>
      <div style={{ marginTop: 40, display: "flex", justifyContent: "center", gap: 14, flexWrap: "wrap" }}>
        <Button variant="rust" size="lg" href="https://forms.example.com/lumberbros-quote" iconRight="arrow-up-right">Get a free quote</Button>
        <Button variant="ghost-light" size="lg" href="tel:2524950720" iconLeft="phone">(252) 495-0720</Button>
      </div>
    </div>
  </section>
);

Object.assign(window, {
  TRHero, TRTrustBar, TRReviews, TRRecentWork, TRProblems, TRHowItWorks, TRSaveCallout,
  TRPrinciples, TRServiceAreas, TRDifferent, TRFaq, TRFinalCTA, FAQRow,
});

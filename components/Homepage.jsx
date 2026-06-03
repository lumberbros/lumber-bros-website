/* ============================================================
   Homepage sections
   ============================================================ */

const HomeHero = () => (
  <section style={{ paddingTop: 40, paddingBottom: 16 }}>
    <div className="container">
      <h1 className="display" style={{
        fontSize: "clamp(56px, 8.2vw, 124px)",
        lineHeight: 1.1,
        color: "var(--lb-navy)",
        margin: "0 0 40px",
        maxWidth: "14ch",
      }}>
        Closing the loop on <em style={{ fontStyle: "normal", color: "var(--lb-rust)" }}>urban wood</em>
      </h1>

      <div style={{ paddingBottom: 56, maxWidth: 720 }}>
        <p style={{
          fontFamily: "var(--font-sans)", fontSize: 19, lineHeight: 1.55,
          color: "var(--fg-soft)", margin: 0,
        }}>
          36 million urban trees come down every year. Over 80% get wasted in the chipper or landfill.
          <strong style={{ color: "var(--lb-ink)", fontWeight: 700 }}> We're changing that — starting in Washington, North Carolina.</strong>
        </p>


      </div>
    </div>
  </section>
);

const HomeStatStrip = () => (
  <section className="bg-navy" style={{ color: "var(--lb-bone)" }}>
    <div className="container row-4" style={{ padding: "56px var(--gutter)" }}>
      {[
        { k: "$2M",  v: "General liability coverage on every job" },
        { k: "3",    v: "Counties served across Eastern NC" },
        { k: "100%", v: "Fixed quotes. What we quote is what you pay." },
        { k: "0",    v: "Trees we send to the chipper if we can mill them" },
      ].map((s, i) => (
        <div key={i} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div className="display" style={{
            fontSize: "clamp(56px, 6vw, 80px)", lineHeight: 1, color: "var(--lb-paper)", letterSpacing: "-0.02em"
          }}>{s.k}</div>
          <div style={{
            fontFamily: "var(--font-sans)", fontSize: 14, color: "rgba(251,247,238,0.75)",
            lineHeight: 1.45, maxWidth: "26ch"
          }}>{s.v}</div>
        </div>
      ))}
    </div>
  </section>
);

/* ============================================================
   Photo carousel — used by ServiceLine
   Conventions match TRReviews: dots + prev/next buttons below the
   viewport, pointer swipe + arrow-key navigation.
   ============================================================ */
const PhotoCarousel = ({ photos, defaultTone = "forest" }) => {
  const [idx, setIdx] = React.useState(0);
  const total = photos.length;

  const go = (next) => setIdx(((next % total) + total) % total);
  const prev = () => go(idx - 1);
  const next = () => go(idx + 1);

  const onKey = (e) => {
    if (e.key === "ArrowLeft")  { e.preventDefault(); prev(); }
    if (e.key === "ArrowRight") { e.preventDefault(); next(); }
  };

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
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Service photos"
      tabIndex={0}
      onKeyDown={onKey}
      style={{ outline: "none" }}>

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
          style={{
            display: "flex",
            width: `${total * 100}%`,
            transform: `translateX(-${idx * (100 / total)}%)`,
            transition: "transform 380ms cubic-bezier(.2,.7,.2,1)",
          }}>
          {photos.map((p, i) => (
            <div
              key={i}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${total}`}
              aria-hidden={i !== idx}
              style={{ width: `${100 / total}%`, flex: "0 0 auto" }}>
              <Photo
                tone={p.tone || defaultTone}
                className="photo-service"
                src={p.src}
                tag={p.caption || `Photo ${String(i + 1).padStart(2, "0")} of ${String(total).padStart(2, "0")}`}
                desc={p.desc} />
            </div>
          ))}
        </div>
      </div>

      {/* Controls row */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        marginTop: 20, gap: 16, flexWrap: "wrap",
      }}>
        <div style={{ display: "flex", gap: 10 }}>
          {photos.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to photo ${i + 1}`}
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
            aria-label="Previous photo"
            onClick={prev}
            style={{
              width: 44, height: 44, borderRadius: 999,
              border: "1px solid var(--lb-paper-deep, rgba(0,0,0,0.12))",
              background: "var(--lb-bone)", color: "var(--lb-ink-soft)",
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer",
            }}>
            <Icon name="arrow-left" size={18} />
          </button>
          <button
            type="button"
            aria-label="Next photo"
            onClick={next}
            style={{
              width: 44, height: 44, borderRadius: 999,
              border: "1px solid var(--lb-paper-deep, rgba(0,0,0,0.12))",
              background: "var(--lb-bone)", color: "var(--lb-ink-soft)",
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer",
            }}>
            <Icon name="arrow-right" size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

const ServiceLine = ({ num, title, body, valueProps, points, marker, tone, photos, reverse, showCta }) => (
  <article className={reverse ? "row-2-split-rev" : "row-2-split"} style={{ paddingBottom: 96 }}>
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 18, flexWrap: "wrap" }}>
        {num && (
          <span style={{
            fontFamily: "var(--font-sans)",
            fontSize: 14,
            fontWeight: 700,
            letterSpacing: "0.14em",
            color: "var(--lb-rust)",
            textTransform: "uppercase",
            lineHeight: 1,
            paddingTop: 4,
          }}>{num}</span>
        )}
        <h3 className="display" style={{
          fontSize: "clamp(28px, 5.4vw, 56px)",
          color: "var(--lb-navy)",
          margin: 0,
          lineHeight: 1.0,
        }}>
          {title}
        </h3>
      </div>
      <p style={{ fontFamily: "var(--font-sans)", fontSize: 18, color: "var(--fg-soft)", lineHeight: 1.55, margin: 0, maxWidth: "44ch" }}>
        {body}
      </p>
      {valueProps && valueProps.length > 0 && (
        <ul style={{
          listStyle: "none",
          padding: 0,
          margin: "-4px 0 0",
          display: "flex",
          flexDirection: "column",
          gap: 2,
          maxWidth: "44ch",
        }}>
          {valueProps.map((v, i) => (
            <li key={i} style={{
              fontFamily: "var(--font-serif-alt)",
              fontStyle: "italic",
              fontSize: "clamp(22px, 2.2vw, 28px)",
              lineHeight: 1.2,
              color: "var(--lb-navy)",
              letterSpacing: "-0.005em",
            }}>
              <span aria-hidden="true" style={{ color: "var(--lb-rust)", marginRight: 10, fontStyle: "normal" }}>—</span>
              {v}
            </li>
          ))}
        </ul>
      )}
      <TrustSignals items={points} marker={marker} />
      {showCta && (
        <div style={{ marginTop: 6 }}>
          <Button variant="text" iconRight="arrow-right" href="tree-removal.html">Learn more</Button>
        </div>
      )}
    </div>
    <div>
      <PhotoCarousel photos={photos} defaultTone={tone} />
    </div>
  </article>
);

const SecondaryService = ({ num, title, body, points }) => (
  <article style={{ display: "flex", flexDirection: "column", gap: 16 }}>
    <div style={{ display: "flex", alignItems: "baseline", gap: 14 }}>
      <span style={{
        fontFamily: "var(--font-sans)",
        fontSize: 12,
        fontWeight: 700,
        letterSpacing: "0.14em",
        color: "var(--lb-rust)",
        textTransform: "uppercase",
        lineHeight: 1,
        paddingTop: 3,
        opacity: 0.75,
      }}>{num}</span>
      <h3 className="display" style={{
        fontSize: "clamp(22px, 2.8vw, 32px)",
        color: "var(--lb-navy)",
        margin: 0,
        lineHeight: 1.05,
      }}>
        {title}
      </h3>
    </div>
    <p style={{
      fontFamily: "var(--font-sans)",
      fontSize: 15,
      color: "var(--fg-soft)",
      lineHeight: 1.55,
      margin: 0,
    }}>
      {body}
    </p>
    <ul style={{
      listStyle: "none",
      padding: 0,
      margin: 0,
      display: "flex",
      flexDirection: "column",
      gap: 4,
    }}>
      {points.map((p, i) => (
        <li key={i} style={{
          fontFamily: "var(--font-sans)",
          fontSize: 14,
          color: "var(--lb-ink-soft)",
          lineHeight: 1.4,
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}>
          <span style={{
            width: 4, height: 4,
            borderRadius: "50%",
            background: "var(--lb-rust)",
            opacity: 0.6,
            flexShrink: 0,
            display: "inline-block",
          }}></span>
          {p}
        </li>
      ))}
    </ul>
  </article>
);

const HomeServices = () => (
  <section className="section bg-paper-deep" id="services">
    <div className="container">
      <div style={{
        marginBottom: 72,
        display: "flex", alignItems: "baseline", justifyContent: "space-between",
        gap: 24, flexWrap: "wrap",
        paddingBottom: 24,
        borderBottom: "1px solid rgba(20,18,14,0.14)",
      }}>
        <h2 className="section-eyebrow">
          Our Capabilities
        </h2>
      </div>

      <ServiceLine
        num="01"
        title="Precision tree service"
        body="Tree and limb removal across Beaufort, Pitt, and Washington counties. We specialize in tight-space removals using time-tested rigging techniques and modern ingenuity."
        points={[
          "Fully Insured",
          "Locally Owned & Operated",
          "Fixed Quotes",
          "ISA Professional Member",
        ]}
        marker="check"
        tone="forest"
        photos={[
          { src: "assets/photos/arborist-climbing-tall-pine-tree-1.webp",   caption: "Alex making a climb • Washington, NC" },
          { src: "assets/photos/chainsaw-operator-storm-debris-cleanup.webp", caption: "Storm cleanup • Greenville, NC" },
          { src: "assets/photos/person-climbing-trees-zip-line.webp",        caption: "Alex rigging a limb • Greenville, NC" },
          { src: "assets/photos/man-pulling-red-rope-trees.webp",            caption: "Setting up a 4:1 • Washington, NC" },
        ]}
        showCta
      />

      <ServiceLine
        num="02"
        title="Milling"
        body="We mill to order, not for inventory. Bring us your log, your spec, or your project, and we'll cut what you actually need."
        points={["Rough Cut Lumber", "Trailer Decking", "Structural Beams", "Slabs", "Off-Cut Fencing", "Posts"]}
        tone="amber"
        photos={[
          { src: "assets/photos/kohler-bandsaw-mill-lumber-slab.webp" },
          { src: "assets/photos/lumber-stacks-farm-shed.webp" },
          { src: "assets/photos/fresh-sawn-lumber-flatbed-trailer.webp" },
          { src: "assets/photos/stacked-lumber-boards-deck-night-1.webp" },
        ]}
        reverse
      />

      {/* Secondary services — no photos, compact */}
      <div style={{
        borderTop: "1px solid rgba(20,18,14,0.10)",
        paddingTop: 48,
        paddingBottom: 24,
        marginTop: 8,
      }}>
        <p style={{
          fontFamily: "var(--font-sans)",
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: "var(--fg-muted)",
          margin: "0 0 36px",
        }}>Also available</p>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "40px 64px",
        }}>
          <SecondaryService
            num="03"
            title="Timber frame builds"
            body="We design and build custom structures to spec using timber-framing techniques and our own locally sourced lumber."
            points={["Pavilions", "Barns", "Outbuildings", "Decks", "Ramps"]}
          />
          <SecondaryService
            num="04"
            title="Wood products"
            body="When the saw stops running, nothing hits the ground wasted. We craft small-batch wood goods from everything that's left over."
            points={["Mushroom Grow Bags", "Compost Sawdust", "Turning Blanks"]}
          />
        </div>
      </div>

    </div>
  </section>
);

const HomeQuoteCTA = () => (
  <section className="section" id="quote">
    <div className="container">
      <div className="row-2" style={{ gap: 64 }}>
        <div>
          <h2 className="display" style={{ fontSize: "clamp(44px, 5.4vw, 80px)", color: "var(--lb-navy)", margin: 0, marginBottom: 24, lineHeight: 1, maxWidth: "12ch" }}>
            Get a free quote
          </h2>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 19, color: "var(--fg-soft)", lineHeight: 1.55, maxWidth: "40ch", margin: 0 }}>
            We're transparent with pricing. We show up on time. We treat your property like our own.
          </p>

          <div style={{ marginTop: 40, display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              ["phone",     "(252) 495-0720",                  "Call or text — same number"],
              ["mail",      "hello@lumberbros.co",             "Photos welcome — quotes often issued without a visit"],
              ["map-pin",   "Beaufort · Pitt · Washington",    "Surrounding counties on a case-by-case basis"],
            ].map(([icon, primary, sub]) => (
              <div key={primary} style={{
                display: "flex", gap: 16, alignItems: "center",
                padding: "16px 20px",
                background: "var(--lb-paper-deep)",
                borderRadius: 8,
              }}>
                <Icon name={icon} size={20} style={{ color: "var(--lb-rust)" }} />
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div style={{ fontFamily: "var(--font-sans)", fontSize: 17, fontWeight: 700, color: "var(--lb-ink)", lineHeight: 1.2 }}>{primary}</div>
                  <div style={{ fontFamily: "var(--font-sans)", fontSize: 13, color: "var(--fg-muted)", marginTop: 2 }}>{sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <QuoteForm />
      </div>
    </div>
  </section>
);

const HomeFinalCTA = () => (
  <section className="section bg-navy" style={{ color: "var(--lb-bone)" }}>
    <div className="container" style={{ textAlign: "center" }}>
      <h2 className="display" style={{
        fontSize: "clamp(48px, 6.4vw, 104px)", color: "var(--lb-bone)",
        margin: "0 auto 24px", lineHeight: 0.95, maxWidth: "14ch", letterSpacing: "-0.015em"
      }}>
        Need a tree or limb gone?
      </h2>
      <p style={{ fontFamily: "var(--font-sans)", fontSize: 19, color: "rgba(251,247,238,0.8)", margin: "0 auto", maxWidth: "44ch", lineHeight: 1.5 }}>
        Don't let that wood go to waste. Complete a short form and we'll get back to you within 24 hours, guaranteed.
      </p>
      <div style={{ marginTop: 40, display: "flex", justifyContent: "center", gap: 14, flexWrap: "wrap" }}>
        <Button variant="rust" size="lg" href="https://forms.example.com/lumberbros-quote" iconRight="arrow-up-right">Get started</Button>
        <Button variant="ghost-light" size="lg" href="tel:2524950720" iconLeft="phone">(252) 495-0720</Button>
      </div>
    </div>
  </section>
);

Object.assign(window, { HomeHero, HomeStatStrip, HomeServices, HomeQuoteCTA, HomeFinalCTA });

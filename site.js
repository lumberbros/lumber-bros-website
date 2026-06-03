/* ============================================================
   Lumber Bros. — vanilla JS interactions
   No framework. Replaces React/Babel/ReactDOM (~1.2 MB).
   Handles: sticky header · mobile drawer · transform carousels
            · native-scroll gallery · photo lightbox · FAQ accordion
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {

  /* ── Lucide icons ───────────────────────────────────────── */
  if (window.lucide) lucide.createIcons();

  /* ── Sticky header ──────────────────────────────────────── */
  const header = document.getElementById("site-header");
  if (header) {
    let raf = 0;
    const read = () => { raf = 0; header.classList.toggle("scrolled", window.scrollY > 80); };
    window.addEventListener("scroll", () => { if (!raf) raf = requestAnimationFrame(read); }, { passive: true });
    read();
  }

  /* ── Mobile drawer ──────────────────────────────────────── */
  const overlay  = document.getElementById("mobile-overlay");
  const panel    = document.getElementById("mobile-panel");
  const menuBtn  = document.querySelector(".nav-mobile-toggle");
  const closeBtn = document.getElementById("mobile-close");

  if (overlay && menuBtn) {
    let open = false;
    const swap = icon => {
      const el = menuBtn.querySelector("[data-lucide]");
      if (el) { el.setAttribute("data-lucide", icon); lucide.createIcons(); }
    };
    const openDrawer  = () => { open = true;  overlay.classList.add("open");    overlay.setAttribute("aria-hidden","false"); menuBtn.setAttribute("aria-expanded","true");  document.body.style.overflow = "hidden"; swap("x"); };
    const closeDrawer = () => { open = false; overlay.classList.remove("open"); overlay.setAttribute("aria-hidden","true");  menuBtn.setAttribute("aria-expanded","false"); document.body.style.overflow = "";       swap("menu"); };
    menuBtn.addEventListener("click", () => open ? closeDrawer() : openDrawer());
    overlay.addEventListener("click", closeDrawer);
    if (panel)    panel.addEventListener("click",    e => e.stopPropagation());
    if (closeBtn) closeBtn.addEventListener("click", closeDrawer);
    window.addEventListener("keydown", e => { if (e.key === "Escape" && open) closeDrawer(); });
  }

  /* ── Transform carousels ────────────────────────────────── */
  /* Wire any [data-carousel] container. Inner structure expected:
       [data-carousel-track]    flex strip
       [data-slide]             individual slides
       [data-carousel-viewport] overflow:hidden wrapper
       [data-carousel-dots]     dot button container
       [data-carousel-prev/next] arrow buttons               */
  document.querySelectorAll("[data-carousel]").forEach(root => {
    const track  = root.querySelector("[data-carousel-track]");
    const slides = [...root.querySelectorAll("[data-slide]")];
    const dotsEl = root.querySelector("[data-carousel-dots]");
    const prevEl = root.querySelector("[data-carousel-prev]");
    const nextEl = root.querySelector("[data-carousel-next]");
    if (!track || !slides.length) return;
    const total = slides.length;
    let idx = 0;

    const go = n => {
      idx = ((n % total) + total) % total;
      track.style.transform = `translateX(-${idx * (100 / total)}%)`;
      slides.forEach((s, i) => s.setAttribute("aria-hidden", i !== idx ? "true" : "false"));
      if (dotsEl) {
        [...dotsEl.querySelectorAll("[data-dot]")].forEach((d, i) => {
          d.style.width      = i === idx ? "28px" : "10px";
          d.style.background = i === idx ? "var(--lb-navy)" : "rgba(0,0,0,0.18)";
          d.setAttribute("aria-current", i === idx ? "true" : "false");
        });
      }
    };

    if (prevEl) prevEl.addEventListener("click", () => go(idx - 1));
    if (nextEl) nextEl.addEventListener("click", () => go(idx + 1));
    if (dotsEl) [...dotsEl.querySelectorAll("[data-dot]")].forEach((d, i) => d.addEventListener("click", () => go(i)));

    root.addEventListener("keydown", e => {
      if (e.key === "ArrowLeft")  { e.preventDefault(); go(idx - 1); }
      if (e.key === "ArrowRight") { e.preventDefault(); go(idx + 1); }
    });

    /* Pointer / touch swipe */
    const vp = root.querySelector("[data-carousel-viewport]") || track.parentElement;
    let px = 0, pa = false;
    vp.addEventListener("pointerdown",  e => { px = e.clientX; pa = true; vp.setPointerCapture && vp.setPointerCapture(e.pointerId); });
    vp.addEventListener("pointerup",    e => { if (!pa) return; pa = false; const dx = e.clientX - px; if (Math.abs(dx) > 40) go(idx + (dx < 0 ? 1 : -1)); });
    vp.addEventListener("pointercancel",() => { pa = false; });

    go(0);
  });

  /* ── Native scroll gallery (TRRecentWork) ───────────────── */
  const track2 = document.querySelector(".tr-recent-track");
  if (track2) {
    const slides  = [...track2.querySelectorAll(".tr-recent-slide")];
    const total   = slides.length;
    const dotsEl  = document.querySelector("[data-recent-dots]");
    const counter = document.querySelector("[data-recent-counter]");
    const prevBtn = document.querySelector("[data-recent-prev]");
    const nextBtn = document.querySelector("[data-recent-next]");
    let cur = 0;

    const cardW = () => {
      const a = track2.children[0], b = track2.children[1];
      if (!a) return 0;
      return b ? b.getBoundingClientRect().left - a.getBoundingClientRect().left
               : a.getBoundingClientRect().width;
    };
    const goTo = i => track2.scrollTo({ left: Math.max(0, i * cardW()), behavior: "smooth" });

    if (prevBtn) prevBtn.addEventListener("click", () => goTo(Math.max(0, cur - 1)));
    if (nextBtn) nextBtn.addEventListener("click", () => goTo(Math.min(total - 1, cur + 1)));
    if (dotsEl)  [...dotsEl.querySelectorAll("[data-dot]")].forEach((d, i) => d.addEventListener("click", () => goTo(i)));

    let raf2 = 0;
    const sync = () => {
      raf2 = 0;
      const w = cardW() || 1;
      cur = Math.round(track2.scrollLeft / w);
      if (counter) counter.textContent = `${String(cur + 1).padStart(2,"0")} / ${String(total).padStart(2,"0")}`;
      if (dotsEl) [...dotsEl.querySelectorAll("[data-dot]")].forEach((d, i) => {
        d.style.width      = i === cur ? "28px" : "10px";
        d.style.background = i === cur ? "var(--lb-navy)" : "rgba(0,0,0,0.18)";
      });
      const maxL = track2.scrollWidth - track2.clientWidth;
      const atS  = track2.scrollLeft <= 2;
      const atE  = track2.scrollLeft >= maxL - 2;
      if (prevBtn) { prevBtn.style.opacity = atS ? "0.4" : "1"; prevBtn.disabled = atS; }
      if (nextBtn) { nextBtn.style.opacity = atE ? "0.4" : "1"; nextBtn.disabled = atE; }
    };
    track2.addEventListener("scroll", () => { if (!raf2) raf2 = requestAnimationFrame(sync); }, { passive: true });
    window.addEventListener("resize", sync);
    sync();
  }

  /* ── Photo lightbox ─────────────────────────────────────── */
  const lb      = document.getElementById("photo-lightbox");
  const lbImg   = document.getElementById("lightbox-img");
  const lbCap   = document.getElementById("lightbox-caption");
  const lbClose = document.getElementById("lightbox-close");

  if (lb) {
    const openLB  = (src, tag) => { lbImg.src = src; lbImg.alt = tag || ""; if (lbCap) lbCap.textContent = tag || ""; lb.classList.add("open"); document.body.style.overflow = "hidden"; if (window.lucide) lucide.createIcons(); };
    const closeLB = () => { lb.classList.remove("open"); document.body.style.overflow = ""; };
    lb.addEventListener("click", closeLB);
    lbClose && lbClose.addEventListener("click", e => { e.stopPropagation(); closeLB(); });
    lb.querySelector(".lightbox-inner") && lb.querySelector(".lightbox-inner").addEventListener("click", e => e.stopPropagation());
    window.addEventListener("keydown", e => { if (e.key === "Escape" && lb.classList.contains("open")) closeLB(); });
    document.querySelectorAll("[data-lightbox-src]").forEach(btn =>
      btn.addEventListener("click", () => openLB(btn.dataset.lightboxSrc, btn.dataset.lightboxTag)));
  }

  /* ── FAQ accordion ──────────────────────────────────────── */
  const faqs = [...document.querySelectorAll(".faq-item")];
  if (faqs.length) {
    faqs[0].classList.add("open");
    faqs.forEach(item => {
      item.querySelector(".faq-btn")?.addEventListener("click", () => {
        const was = item.classList.contains("open");
        faqs.forEach(f => f.classList.remove("open"));
        if (!was) item.classList.add("open");
      });
    });
  }

});

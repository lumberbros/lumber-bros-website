/* ============================================================
   Lumber Bros. — shared.js
   Header scroll shrink, mobile drawer, transform carousel.
   ============================================================ */

/* ── HEADER SCROLL SHRINK ──────────────────────────────────── */
(function () {
  const header = document.getElementById('site-header');
  if (!header) return;

  let ticking = false;

  function checkScroll() {
    ticking = false;
    if (window.scrollY > 80) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', function () {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(checkScroll);
    }
  }, { passive: true });

  checkScroll();
})();


/* ── MOBILE DRAWER ─────────────────────────────────────────── */
(function () {
  const menuBtn    = document.getElementById('menu-btn');
  const drawer     = document.getElementById('mobile-drawer');
  const closeBtn   = document.getElementById('drawer-close-btn');
  const aboutLink  = document.getElementById('drawer-about-link');

  if (!menuBtn || !drawer) return;

  let overlay = null;

  function openDrawer() {
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.45);z-index:149;';
      overlay.addEventListener('click', closeDrawer);
      document.body.appendChild(overlay);
    }
    drawer.classList.add('open');
    menuBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';

    const firstLink = drawer.querySelector('a, button');
    if (firstLink) firstLink.focus();
  }

  function closeDrawer() {
    drawer.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';

    if (overlay) {
      overlay.remove();
      overlay = null;
    }

    menuBtn.focus();
  }

  menuBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if (aboutLink) aboutLink.addEventListener('click', closeDrawer);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      closeDrawer();
    }
  });
})();


/* ── TRANSFORM CAROUSEL ────────────────────────────────────── */
function initCarousel(el) {
  if (!el) return;

  const track   = el.querySelector('.carousel-track');
  const slides  = el.querySelectorAll('.carousel-slide');
  const dots    = el.querySelectorAll('.carousel-dot');
  const total   = slides.length;

  if (!track || total === 0) return;

  /* Prev/next: photo carousels use .carousel-prev / .carousel-next;
     review carousel uses .review-carousel-prev / .review-carousel-next. */
  const prevBtn = el.querySelector('.carousel-prev, .review-carousel-prev');
  const nextBtn = el.querySelector('.carousel-next, .review-carousel-next');

  let idx = 0;
  let startX = 0;
  let isDragging = false;

  function goTo(i) {
    const next = Math.max(0, Math.min(total - 1, i));
    if (next === idx) return;

    slides[idx].setAttribute('aria-hidden', 'true');
    dots[idx]?.classList.remove('active');
    dots[idx]?.setAttribute('aria-current', 'false');

    idx = next;

    track.style.transform = 'translateX(-' + (idx * 100) + '%)';

    slides[idx].removeAttribute('aria-hidden');
    dots[idx]?.classList.add('active');
    dots[idx]?.setAttribute('aria-current', 'true');

    if (prevBtn) prevBtn.disabled = idx === 0;
    if (nextBtn) nextBtn.disabled = idx === total - 1;
  }

  /* Initialise button states */
  if (prevBtn) prevBtn.disabled = true;
  if (nextBtn) nextBtn.disabled = total <= 1;

  if (prevBtn) prevBtn.addEventListener('click', () => goTo(idx - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => goTo(idx + 1));

  dots.forEach((dot, i) => dot.addEventListener('click', () => goTo(i)));

  /* Keyboard navigation */
  el.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft')  { e.preventDefault(); goTo(idx - 1); }
    if (e.key === 'ArrowRight') { e.preventDefault(); goTo(idx + 1); }
  });

  /* Pointer swipe */
  el.addEventListener('pointerdown', function (e) {
    startX = e.clientX;
    isDragging = true;
  }, { passive: true });

  el.addEventListener('pointerup', function (e) {
    if (!isDragging) return;
    isDragging = false;
    const delta = e.clientX - startX;
    if (Math.abs(delta) > 40) {
      goTo(delta < 0 ? idx + 1 : idx - 1);
    }
  });

  el.addEventListener('pointercancel', function () { isDragging = false; });
}


/* ── AUTO-INIT PHOTO CAROUSELS ─────────────────────────────── */
document.querySelectorAll('.photo-carousel').forEach(initCarousel);

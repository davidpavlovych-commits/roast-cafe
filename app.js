/* ═══════════════════════════════════════════════════════════
   ROAST – CAFÉ | Application Logic
   ═══════════════════════════════════════════════════════════ */

/* ─── PRODUKTDATENBANK ──────────────────────────────────────
   Quelle: copy_assets.md, Kapitel 2
   roast: Röstgrad als Zahl 1–5
   price: Basispreis (Zahl) für die Standardgröße
   weight: Standard-Packungsgröße in Gramm
   popularity: für Sortierung "Beliebtheit" (höher = beliebter)
   limited: Limited-Edition-Flag
*/
const products = [
  {
    id: 'p1',
    name: 'Aero-Roast Espresso',
    category: 'espresso',
    origin: 'Kolumbien (Huila)',
    process: 'Gewaschen (Washed)',
    roast: 4,
    roastLabel: 'Medium-Dark',
    flavor: 'Dunkle Schokolade, gebrannte Mandel, brauner Zucker',
    price: 14.90,
    weight: 250,
    description: 'Ein kräftiger, samtiger Espresso mit einer ausgeprägten Süße und sehr geringer Säure. Perfekt für den Siebträger, die Espressokanne oder als kräftige Basis für Flat White und Cappuccino.',
    image: 'assets/product_espresso.png',
    popularity: 90,
    limited: false,
  },
  {
    id: 'p2',
    name: 'V60 Light Roast',
    category: 'filterkaffee',
    origin: 'Äthiopien (Yirgacheffe)',
    process: 'Trocken (Natural)',
    roast: 2,
    roastLabel: 'Light',
    flavor: 'Jasminblüte, reifer Pfirsich, rote Johannisbeere',
    price: 16.80,
    weight: 250,
    description: 'Dieser helle Filterkaffee besticht durch seine floralen Noten und eine spritzige, tee-ähnliche Textur. Ideal zubereitet im Hario V60 Filter, der Chemex oder der AeroPress.',
    image: 'assets/product_filter.png',
    popularity: 80,
    limited: false,
  },
  {
    id: 'p3',
    name: 'Decaf Velvet',
    category: 'decaf',
    origin: 'Peru (Cajamarca)',
    process: 'Swiss Water Process (CO2-frei entkoffeiniert)',
    roast: 3,
    roastLabel: 'Medium',
    flavor: 'Karamellsüße, reifer Apfel, Haselnuss',
    price: 15.20,
    weight: 250,
    description: 'Voller Geschmack, ganz ohne Koffein. Der Decaf Velvet behält durch das schonende Swiss-Water-Verfahren sein reiches Aroma von weichem Karamell und nussigen Nuancen. Ein Genuss zu jeder Tageszeit.',
    image: 'assets/product_decaf.png',
    popularity: 60,
    limited: false,
  },
  {
    id: 'p4',
    name: 'Geisha Limited',
    category: 'decaf',
    origin: 'Panama (Boquete)',
    process: 'Anaerobe Fermentation (Anaerobic)',
    roast: 1,
    roastLabel: 'Ultra Light',
    flavor: 'Bergamotte, Jasmin, Blaubeer-Kompott',
    price: 28.50,
    weight: 150,
    description: 'Eine absolute Rarität. Die berühmte Geisha-Varietät, anaerob fermentiert für ein unvergleichlich komplexes und fruchtiges Geschmackserlebnis. Limitiert auf wenige Kilogramm pro Röstung.',
    image: 'assets/product_limited.png',
    popularity: 100,
    limited: true,
  },
];

/* ─── KONSTANTEN ────────────────────────────────────────────── */
/* Preisfaktoren je Packungsgröße */
const SIZE_FACTORS = {
  250: 1.0,
  500: 1.95,
  1000: 2.80,
};

/* Versand */
const SHIPPING_COST = 4.90;
const FREE_SHIPPING_THRESHOLD = 45.00;
const CART_STORAGE_KEY = 'roast-cafe-cart';

/* ─── STATE ─────────────────────────────────────────────────── */
const state = {
  filter: 'all',
  sort: 'default',
};

/* Aktueller Zustand des Produkt-Detail-Modals */
const modalState = {
  product: null,
  size: 250,
  grind: 'ganze-bohne',
  quantity: 1,
};

/* Warenkorb (Array von Positionen) */
let cart = [];

/* ─── HELPERS ───────────────────────────────────────────────── */
const formatPrice = (value) =>
  '€' + value.toFixed(2).replace('.', currentLang === 'en' ? '.' : ',');

/* Mahlgrad-Bezeichnung in der aktuellen Sprache */
const grindLabel = (grind) => t(`grind.${grind}`);

/* Erzeugt die 5 Röstgrad-Punkte als HTML */
function renderRoastDots(roast) {
  let dots = '';
  for (let i = 1; i <= 5; i++) {
    const active = i <= roast ? ' roast-dot--active' : '';
    dots += `<span class="roast-dot${active}"></span>`;
  }
  return dots;
}

/* ─── KATALOG-RENDERING ─────────────────────────────────────── */
function renderProducts(productsList) {
  const grid = document.getElementById('product-grid');
  if (!grid) return;

  if (!productsList.length) {
    grid.innerHTML = `<p class="product-grid-empty">${t('grid.empty')}</p>`;
    return;
  }

  grid.innerHTML = productsList
    .map((p, index) => {
      const origin = pt(p, 'origin');
      const limitedTag = p.limited
        ? `<span class="product-card-tag">${t('card.limited')}</span>`
        : '';
      return `
        <article
          class="product-card"
          role="listitem"
          data-id="${p.id}"
          data-category="${p.category}"
          tabindex="0"
          aria-label="${t('card.details', { name: p.name })}"
          style="--d: ${index * 70}ms"
        >
          <div class="product-card-image-wrap">
            <img
              class="product-card-image"
              src="${p.image}"
              alt="${t('card.alt', { name: p.name, origin })}"
              loading="lazy"
            />
            ${limitedTag}
            <div class="product-card-quickview">${t('card.quickview')}</div>
          </div>
          <div class="product-card-body">
            <p class="product-card-origin">${origin}</p>
            <div class="product-card-roast" aria-label="${t('card.roast', { n: p.roast })}">
              ${renderRoastDots(p.roast)}
            </div>
            <h3 class="product-card-title">${p.name}</h3>
            <p class="product-card-flavor">${pt(p, 'flavor')}</p>
            <div class="product-card-footer">
              <span class="product-card-price">${formatPrice(p.price)}<span class="product-card-weight"> / ${p.weight}g</span></span>
            </div>
          </div>
        </article>
      `;
    })
    .join('');
}

/* ─── FILTER + SORT PIPELINE ────────────────────────────────── */
function getVisibleProducts() {
  let list = products.slice();

  /* Filter */
  if (state.filter !== 'all') {
    list = list.filter((p) => p.category === state.filter);
  }

  /* Sort */
  switch (state.sort) {
    case 'price-asc':
      list.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      list.sort((a, b) => b.price - a.price);
      break;
    case 'popularity':
      list.sort((a, b) => b.popularity - a.popularity);
      break;
    default:
      /* Standard: Originalreihenfolge */
      break;
  }

  return list;
}

function updateCatalog() {
  renderProducts(getVisibleProducts());
}

/* ═══════════════════════════════════════════════════════════
   PRODUKT-DETAIL-MODAL
   ═══════════════════════════════════════════════════════════ */

/* Liefert den aktuell berechneten Stückpreis (Größe berücksichtigt) */
function getModalUnitPrice() {
  if (!modalState.product) return 0;
  return modalState.product.price * (SIZE_FACTORS[modalState.size] || 1);
}

/* Aktualisiert die Preisanzeige im Modal anhand des aktuellen Zustands */
function updateModalPrice() {
  const priceEl = document.getElementById('product-modal-price');
  if (!priceEl) return;
  priceEl.textContent = `${formatPrice(getModalUnitPrice())} / ${modalState.size}g`;
}

/* Aktualisiert die Mengenanzeige */
function updateModalQuantity() {
  const qtyEl = document.getElementById('product-modal-qty-display');
  if (qtyEl) qtyEl.textContent = String(modalState.quantity);
}

/* Sprachabhängige Texte des Modals (auch beim Sprachwechsel) */
function fillProductModalTexts(product) {
  const img = document.getElementById('product-modal-image');
  img.src = product.image;
  img.alt = t('card.alt', { name: product.name, origin: pt(product, 'origin') });

  document.getElementById('product-modal-origin').textContent =
    `${pt(product, 'origin')} · ${pt(product, 'process')}`;
  document.getElementById('product-modal-title').textContent = product.name;
  document.getElementById('product-modal-flavor').textContent = pt(product, 'flavor');
  document.getElementById('product-modal-description').textContent =
    pt(product, 'description');
}

/* Befüllt das Modal mit den Daten eines Produkts und öffnet es */
function openProductModal(productId) {
  const product = products.find((p) => p.id === productId);
  if (!product) return;

  /* Modal-Zustand zurücksetzen */
  modalState.product = product;
  modalState.size = 250;
  modalState.grind = 'ganze-bohne';
  modalState.quantity = 1;

  fillProductModalTexts(product);

  /* Steuerelemente zurücksetzen */
  const sizeSelect = document.getElementById('product-modal-size');
  if (sizeSelect) sizeSelect.value = '250';

  const grindDefault = document.getElementById('grind-ganze-bohne');
  if (grindDefault) grindDefault.checked = true;

  /* Erfolgsmeldung ausblenden */
  const success = document.getElementById('product-modal-success');
  if (success) success.hidden = true;

  updateModalPrice();
  updateModalQuantity();

  openOverlay('product-modal');
}

/* ─── GENERISCHE OVERLAY-STEUERUNG ──────────────────────────── */
function openOverlay(id) {
  const el = document.getElementById(id);
  const backdrop = document.getElementById('overlay-backdrop');
  if (!el) return;
  el.classList.add('is-open');
  el.setAttribute('aria-hidden', 'false');
  if (backdrop) backdrop.classList.add('is-visible');
  document.body.style.overflow = 'hidden';
  document.dispatchEvent(new CustomEvent('overlay:change'));
}

function closeOverlay(id) {
  const el = document.getElementById(id);
  if (el) {
    el.classList.remove('is-open');
    el.setAttribute('aria-hidden', 'true');
  }
  /* Backdrop nur ausblenden, wenn kein anderes Overlay mehr offen ist */
  const anyOpen = document.querySelector(
    '.modal.is-open, .cart-drawer.is-open'
  );
  const backdrop = document.getElementById('overlay-backdrop');
  if (!anyOpen) {
    if (backdrop) backdrop.classList.remove('is-visible');
    document.body.style.overflow = '';
  }
  document.dispatchEvent(new CustomEvent('overlay:change'));
}

/* Schließt alle offenen Overlays (z. B. bei Escape / Backdrop-Klick) */
function closeAllOverlays() {
  document
    .querySelectorAll('.modal.is-open, .cart-drawer.is-open')
    .forEach((el) => {
      el.classList.remove('is-open');
      el.setAttribute('aria-hidden', 'true');
    });
  const backdrop = document.getElementById('overlay-backdrop');
  if (backdrop) backdrop.classList.remove('is-visible');
  document.body.style.overflow = '';
  document.dispatchEvent(new CustomEvent('overlay:change'));
}

/* ─── MODAL-EVENT-BINDINGS ──────────────────────────────────── */
function initProductModal() {
  /* Karten-Klick öffnet Modal (Delegation auf dem Grid) */
  const grid = document.getElementById('product-grid');
  if (grid) {
    grid.addEventListener('click', (e) => {
      const card = e.target.closest('.product-card');
      if (card) openProductModal(card.dataset.id);
    });
    /* Tastaturzugänglichkeit: Enter/Space auf fokussierter Karte */
    grid.addEventListener('keydown', (e) => {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      const card = e.target.closest('.product-card');
      if (card) {
        e.preventDefault();
        openProductModal(card.dataset.id);
      }
    });
  }

  /* Packungsgröße */
  const sizeSelect = document.getElementById('product-modal-size');
  if (sizeSelect) {
    sizeSelect.addEventListener('change', () => {
      modalState.size = parseInt(sizeSelect.value, 10);
      updateModalPrice();
    });
  }

  /* Mahlgrad */
  document.querySelectorAll('input[name="grind"]').forEach((radio) => {
    radio.addEventListener('change', () => {
      if (radio.checked) modalState.grind = radio.value;
    });
  });

  /* Mengenregler */
  const minusBtn = document.getElementById('product-modal-qty-minus');
  const plusBtn = document.getElementById('product-modal-qty-plus');
  if (minusBtn) {
    minusBtn.addEventListener('click', () => {
      if (modalState.quantity > 1) {
        modalState.quantity--;
        updateModalQuantity();
      }
    });
  }
  if (plusBtn) {
    plusBtn.addEventListener('click', () => {
      modalState.quantity++;
      updateModalQuantity();
    });
  }

  /* In den Warenkorb legen */
  const addBtn = document.getElementById('product-modal-add-btn');
  if (addBtn) {
    addBtn.addEventListener('click', handleAddToCart);
  }

  /* Schließen: X-Button */
  const closeBtn = document.getElementById('product-modal-close-btn');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => closeOverlay('product-modal'));
  }
}

/* ─── MOBILE-NAVIGATION ─────────────────────────────────────── */
function initMobileNav() {
  const btn = document.getElementById('mobile-menu-btn');
  const nav = document.getElementById('main-nav');
  if (!btn || !nav) return;

  const setOpen = (open) => {
    nav.classList.toggle('is-open', open);
    btn.setAttribute('aria-expanded', String(open));
    btn.setAttribute('aria-label', t(open ? 'nav.menuClose' : 'nav.menuOpen'));
  };

  btn.addEventListener('click', () => {
    setOpen(!nav.classList.contains('is-open'));
  });

  setOpen(false);
  document.addEventListener('lang:change', () => setOpen(nav.classList.contains('is-open')));

  /* Nach Klick auf einen Link schließen */
  nav.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', () => setOpen(false));
  });
}

/* ═══════════════════════════════════════════════════════════
   MOTION & INTERAKTION
   ═══════════════════════════════════════════════════════════ */

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const hasFinePointer = () =>
  window.matchMedia('(hover: hover) and (pointer: fine)').matches;

const isOverlayOpen = () =>
  Boolean(document.querySelector('.modal.is-open, .cart-drawer.is-open'));

const clamp = (v, min, max) => Math.min(max, Math.max(min, v));

/* Ruft fn höchstens einmal pro Frame auf */
function onScrollFrame(fn) {
  let ticking = false;
  window.addEventListener(
    'scroll',
    () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        fn();
        ticking = false;
      });
    },
    { passive: true }
  );
  fn();
}

/* ─── WORT-REVEAL: jedes Wort in eine Maske packen ──────────── */
function splitWords(el) {
  if (el.querySelector('.split-word')) return; /* schon aufgeteilt */
  let index = 0;
  const walk = (node) => {
    Array.from(node.childNodes).forEach((child) => {
      if (child.nodeType === Node.ELEMENT_NODE) {
        walk(child);
        return;
      }
      if (child.nodeType !== Node.TEXT_NODE) return;

      const frag = document.createDocumentFragment();
      child.textContent.split(/(\s+)/).forEach((part) => {
        if (!part) return;
        if (/^\s+$/.test(part)) {
          frag.appendChild(document.createTextNode(' '));
          return;
        }
        const outer = document.createElement('span');
        outer.className = 'split-word';
        const inner = document.createElement('span');
        inner.className = 'split-word-inner';
        inner.style.setProperty('--wi', index++);
        inner.textContent = part;
        outer.appendChild(inner);
        frag.appendChild(outer);
      });
      child.replaceWith(frag);
    });
  };
  walk(el);
}

/* ─── ZÄHLER (z. B. 0 → 2.100) ──────────────────────────────── */
function animateCount(el) {
  const target = Number(el.dataset.count) || 0;
  const fmt = new Intl.NumberFormat(getLocale());
  el.dataset.counted = 'true';
  if (prefersReducedMotion()) {
    el.textContent = fmt.format(target);
    return;
  }
  const duration = 1800;
  const start = performance.now();
  const tick = (now) => {
    const t = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - t, 4);
    el.textContent = fmt.format(Math.round(target * eased));
    if (t < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

/* ─── SCROLL-REVEAL (IntersectionObserver) ──────────────────── */
function initScrollReveal() {
  document.querySelectorAll('[data-split]').forEach(splitWords);

  const els = document.querySelectorAll('[data-reveal], [data-split]');
  const counters = document.querySelectorAll('[data-count]');
  const grid = document.getElementById('product-grid');

  const reveal = (target) => {
    if (target === grid) target.classList.add('in-view');
    else if (target.hasAttribute('data-count')) animateCount(target);
    else target.classList.add('is-revealed');
  };

  if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
    els.forEach(reveal);
    counters.forEach(reveal);
    if (grid) reveal(grid);
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        reveal(entry.target);
        io.unobserve(entry.target);
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
  );

  els.forEach((el) => io.observe(el));
  counters.forEach((el) => io.observe(el));
  if (grid) io.observe(grid);
}

/* ─── HERO-PARALLAX beim Scrollen ───────────────────────────── */
function initHeroParallax() {
  const hero = document.getElementById('hero');
  const content = document.querySelector('.hero-content');
  const backdrop = document.querySelector('.hero-backdrop');
  if (!hero || !content || prefersReducedMotion()) return;

  onScrollFrame(() => {
    const y = window.scrollY;
    const h = hero.offsetHeight;
    if (y > h) return;
    content.style.transform = `translateY(${y * 0.18}px)`;
    content.style.opacity = String(Math.max(0, 1 - y / (h * 0.75)));
    if (backdrop) backdrop.style.transform = `scale(1.05) translateY(${y * 0.3}px)`;
  });
}

/* Bereits gezählte Werte im neuen Zahlenformat anzeigen (2.100 ↔ 2,100) */
function reformatCounters() {
  const fmt = new Intl.NumberFormat(getLocale());
  document.querySelectorAll('[data-count][data-counted]').forEach((el) => {
    el.textContent = fmt.format(Number(el.dataset.count) || 0);
  });
}

/* ─── HERO: ORBIT-KARUSSELL ─────────────────────────────────── */
const ORBIT_ACTIVE_ANGLE = 315; /* aktive Sorte sitzt oben links */
const HERO_AUTOPLAY_MS = 6500;

function initHeroCarousel() {
  const hero = document.getElementById('hero');
  const stage = document.getElementById('hero-stage');
  const disc = document.getElementById('hero-disc');
  const discWrap = document.querySelector('.hero-disc-wrap');
  const labelsWrap = document.getElementById('orbit-labels');
  const arc = document.getElementById('orbit-arc');
  const info = document.getElementById('hero-info');
  const infoCat = document.getElementById('hero-info-cat');
  const infoText = document.getElementById('hero-info-text');
  const infoPrice = document.getElementById('hero-info-price');
  const infoLink = document.getElementById('hero-info-link');
  const countCurrent = document.getElementById('hero-count-current');
  const countTotal = document.getElementById('hero-count-total');
  const progress = document.getElementById('hero-progress-bar');
  if (!hero || !stage || !disc || !labelsWrap) return;

  const items = products;
  const n = items.length;
  const step = 360 / n;
  const mod = (a, b) => ((a % b) + b) % b;
  const pad = (v) => String(v).padStart(2, '0');

  let turn = 0;
  let active = 0;
  let swapTimer = null;

  disc.innerHTML = items
    .map((p, i) => `<img class="hero-disc-img" src="${p.image}" alt="" ${i ? 'loading="lazy"' : ''} />`)
    .join('');
  labelsWrap.innerHTML = items
    .map((p, i) => `
        <button type="button" class="orbit-label" data-index="${i}">
          <span class="orbit-dot"></span><span class="orbit-text"></span>
        </button>`)
    .join('');

  const imgs = Array.from(disc.children);
  const labels = Array.from(labelsWrap.children);
  if (countTotal) countTotal.textContent = pad(n);

  const setInfo = (p) => {
    infoCat.textContent = p.name;
    infoText.textContent = pt(p, 'flavor');
    infoPrice.textContent = `${formatPrice(p.price)} / ${p.weight}g`;
    infoLink.dataset.id = p.id;
    infoLink.setAttribute('aria-label', t('hero.moreAbout', { name: p.name }));
  };

  /* Orbit-Beschriftungen in der aktuellen Sprache */
  const setLabelTexts = () => {
    labels.forEach((el, i) => {
      const p = items[i];
      el.querySelector('.orbit-text').textContent = t(`hero.label.${p.id}`);
      el.setAttribute('aria-label', t('hero.show', { name: p.name }));
    });
  };
  setLabelTexts();

  document.addEventListener('lang:change', () => {
    setLabelTexts();
    setInfo(items[active]);
  });

  const redrawArc = () => {
    if (!arc) return;
    arc.classList.remove('is-drawing');
    arc.getBoundingClientRect();
    arc.classList.add('is-drawing');
  };

  /* ── Autoplay: der Fortschrittsbalken ist die Uhr ── */
  const canAutoplay = !prefersReducedMotion() && progress;
  const pauseReasons = new Set();
  const syncPause = () => {
    if (!canAutoplay) return;
    if (isOverlayOpen()) pauseReasons.add('overlay');
    else pauseReasons.delete('overlay');
    progress.classList.toggle('is-paused', pauseReasons.size > 0);
  };
  const pause = (reason) => { pauseReasons.add(reason); syncPause(); };
  const resume = (reason) => { pauseReasons.delete(reason); syncPause(); };

  const restartProgress = () => {
    if (!canAutoplay) return;
    progress.style.setProperty('--autoplay', `${HERO_AUTOPLAY_MS}ms`);
    progress.classList.remove('is-running');
    progress.getBoundingClientRect();
    progress.classList.add('is-running');
    syncPause();
  };

  function render(initial) {
    const prev = active;
    active = mod(turn, n);

    labels.forEach((el, i) => {
      el.style.setProperty('--a', `${ORBIT_ACTIVE_ANGLE + step * (i - turn)}deg`);
      el.classList.toggle('is-active', i === active);
      el.setAttribute('aria-pressed', String(i === active));
    });

    imgs.forEach((img, i) => {
      img.classList.toggle('is-active', i === active);
      if (!initial && i === prev && i !== active) {
        img.classList.add('is-leaving');
        setTimeout(() => img.classList.remove('is-leaving'), 950);
      }
    });

    if (initial) {
      setInfo(items[active]);
    } else {
      clearTimeout(swapTimer);
      info.classList.add('is-swapping');
      swapTimer = setTimeout(() => {
        setInfo(items[active]);
        info.classList.remove('is-swapping');
      }, 280);
    }

    if (countCurrent) countCurrent.textContent = pad(active + 1);
    redrawArc();
    restartProgress();
  }

  const go = (delta) => {
    if (!delta) return;
    turn += delta;
    render(false);
  };

  /* Kürzester Weg zur gewählten Sorte */
  const goTo = (index) => {
    let d = mod(index - active, n);
    if (d > n / 2) d -= n;
    go(d);
  };

  render(true);

  /* ── Pfeile auf Höhe der Kreismitte ausrichten ── */
  const prevBtn = document.getElementById('hero-prev');
  const nextBtn = document.getElementById('hero-next');
  const content = stage.offsetParent;
  const placeArrows = () => {
    if (!prevBtn || !nextBtn || !content) return;
    const mid = content.offsetTop + stage.offsetTop + stage.offsetWidth / 2;
    const top = `${Math.round(mid - prevBtn.offsetHeight / 2)}px`;
    prevBtn.style.top = top;
    nextBtn.style.top = top;
  };
  placeArrows();
  if ('ResizeObserver' in window) new ResizeObserver(placeArrows).observe(hero);
  document.fonts?.ready.then(placeArrows);
  document.addEventListener('lang:change', placeArrows);

  /* ── Steuerung ── */
  prevBtn?.addEventListener('click', () => go(-1));
  nextBtn?.addEventListener('click', () => go(1));

  labelsWrap.addEventListener('click', (e) => {
    const btn = e.target.closest('.orbit-label');
    if (btn) goTo(Number(btn.dataset.index));
  });

  infoLink.addEventListener('click', () => openProductModal(infoLink.dataset.id));

  /* Klick auf die Scheibe öffnet ebenfalls das Produkt */
  disc.addEventListener('click', () => openProductModal(items[active].id));
  disc.style.cursor = 'pointer';

  /* Pfeiltasten, solange der Hero sichtbar ist */
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
    if (pauseReasons.has('offscreen') || isOverlayOpen()) return;
    const el = document.activeElement;
    if (el && el !== document.body && !hero.contains(el)) return;
    e.preventDefault();
    go(e.key === 'ArrowRight' ? 1 : -1);
  });

  /* Wischen auf Touch-Geräten */
  let startX = null;
  stage.addEventListener('pointerdown', (e) => {
    if (e.pointerType !== 'mouse') startX = e.clientX;
  });
  stage.addEventListener('pointerup', (e) => {
    if (startX === null) return;
    const dx = e.clientX - startX;
    startX = null;
    if (Math.abs(dx) > 45) go(dx < 0 ? 1 : -1);
  });

  /* ── Autoplay-Pausen ── */
  if (canAutoplay) {
    progress.addEventListener('animationend', () => go(1));
    stage.addEventListener('pointerenter', () => pause('hover'));
    stage.addEventListener('pointerleave', () => resume('hover'));
    hero.addEventListener('focusin', () => pause('focus'));
    hero.addEventListener('focusout', (e) => {
      if (!hero.contains(e.relatedTarget)) resume('focus');
    });
    document.addEventListener('visibilitychange', () =>
      document.hidden ? pause('hidden') : resume('hidden')
    );
    document.addEventListener('overlay:change', syncPause);
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(([entry]) =>
        entry.isIntersecting ? resume('offscreen') : pause('offscreen')
      ).observe(hero);
    }
  }

  /* ── 3D-Neigung + Glanzlicht + Nebel-Parallaxe (nur Maus) ── */
  if (hasFinePointer() && !prefersReducedMotion() && discWrap) {
    const fogs = hero.querySelectorAll('.hero-fog');
    hero.addEventListener('pointermove', (e) => {
      const r = stage.getBoundingClientRect();
      const nx = clamp((e.clientX - (r.left + r.width / 2)) / (r.width / 2), -1.5, 1.5);
      const ny = clamp((e.clientY - (r.top + r.height / 2)) / (r.height / 2), -1.5, 1.5);
      discWrap.style.setProperty('--rx', `${(-ny * 7).toFixed(2)}deg`);
      discWrap.style.setProperty('--ry', `${(nx * 9).toFixed(2)}deg`);
      disc.style.setProperty('--gx', `${50 + nx * 25}%`);
      disc.style.setProperty('--gy', `${50 + ny * 25}%`);
      fogs.forEach((fog, i) => {
        const k = i ? 18 : 10;
        fog.style.translate = `${(-nx * k).toFixed(1)}px ${(-ny * k * 0.6).toFixed(1)}px`;
      });
    });
    hero.addEventListener('pointerleave', () => {
      discWrap.style.setProperty('--rx', '0deg');
      discWrap.style.setProperty('--ry', '0deg');
      fogs.forEach((fog) => { fog.style.translate = ''; });
    });
  }
}

/* ─── HERO: GOLDENER STAUB (Canvas) ─────────────────────────── */
function initHeroDust() {
  const canvas = document.getElementById('hero-dust');
  const hero = document.getElementById('hero');
  if (!canvas || !hero || prefersReducedMotion()) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const COUNT = window.innerWidth < 700 ? 26 : 48;
  let w = 0;
  let h = 0;
  let running = false;
  let raf = null;
  const mouse = { x: -9999, y: -9999 };

  const spawn = (p, anywhere) => {
    p.x = Math.random() * w;
    p.y = anywhere ? Math.random() * h : h + 10;
    p.r = 0.4 + Math.random() * 1.4;
    p.vx = (Math.random() - 0.5) * 0.12;
    p.vy = -(0.08 + Math.random() * 0.3);
    p.phase = Math.random() * Math.PI * 2;
    p.tw = 0.008 + Math.random() * 0.02;
    return p;
  };

  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = hero.clientWidth;
    h = hero.clientHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  resize();
  const particles = Array.from({ length: COUNT }, () => spawn({}, true));

  const frame = () => {
    ctx.clearRect(0, 0, w, h);
    particles.forEach((p) => {
      /* sanft vom Cursor wegdriften */
      const dx = p.x - mouse.x;
      const dy = p.y - mouse.y;
      const d2 = dx * dx + dy * dy;
      if (d2 < 14000) {
        const f = (1 - d2 / 14000) * 0.6;
        p.x += (dx / Math.sqrt(d2 || 1)) * f;
        p.y += (dy / Math.sqrt(d2 || 1)) * f;
      }
      p.x += p.vx;
      p.y += p.vy;
      p.phase += p.tw;
      if (p.y < -10 || p.x < -10 || p.x > w + 10) spawn(p, false);

      const alpha = 0.15 + (Math.sin(p.phase) + 1) * 0.25;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(223, 195, 132, ${alpha.toFixed(3)})`;
      ctx.fill();
    });
    raf = requestAnimationFrame(frame);
  };

  const start = () => {
    if (running) return;
    running = true;
    raf = requestAnimationFrame(frame);
  };
  const stop = () => {
    running = false;
    cancelAnimationFrame(raf);
  };

  hero.addEventListener('pointermove', (e) => {
    const r = hero.getBoundingClientRect();
    mouse.x = e.clientX - r.left;
    mouse.y = e.clientY - r.top;
  });
  hero.addEventListener('pointerleave', () => {
    mouse.x = -9999;
    mouse.y = -9999;
  });

  if ('ResizeObserver' in window) new ResizeObserver(resize).observe(hero);
  else window.addEventListener('resize', resize);

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop())).observe(hero);
  } else {
    start();
  }
  document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()));
}

/* ─── CURSOR-RING ───────────────────────────────────────────── */
const CURSOR_HOVER_SELECTOR =
  'a, button, select, label, input, textarea, [role="tab"], .product-card, .story-pillar, .brew-panel, .proc-step, .process-steps li, .hero-disc';

function initCursor() {
  const ring = document.getElementById('cursor-ring');
  if (!ring || !hasFinePointer() || prefersReducedMotion()) return;

  let x = -100;
  let y = -100;
  let tx = -100;
  let ty = -100;

  document.addEventListener('pointermove', (e) => {
    if (e.pointerType !== 'mouse') return;
    tx = e.clientX;
    ty = e.clientY;
    ring.classList.add('is-visible');
  });
  document.documentElement.addEventListener('pointerleave', () =>
    ring.classList.remove('is-visible')
  );
  document.addEventListener('pointerover', (e) => {
    ring.classList.toggle('is-hover', Boolean(e.target.closest?.(CURSOR_HOVER_SELECTOR)));
  });
  document.addEventListener('pointerdown', () => ring.classList.add('is-down'));
  document.addEventListener('pointerup', () => ring.classList.remove('is-down'));

  const loop = () => {
    x += (tx - x) * 0.2;
    y += (ty - y) * 0.2;
    ring.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
    requestAnimationFrame(loop);
  };
  requestAnimationFrame(loop);
}

/* ─── MAGNETISCHE BUTTONS ───────────────────────────────────── */
function initMagnetic() {
  if (!hasFinePointer() || prefersReducedMotion()) return;
  document.querySelectorAll('[data-magnetic]').forEach((el) => {
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      el.style.setProperty('--mx', `${(dx * 0.22).toFixed(1)}px`);
      el.style.setProperty('--my', `${(dy * 0.3).toFixed(1)}px`);
    });
    el.addEventListener('pointerleave', () => {
      el.style.setProperty('--mx', '0px');
      el.style.setProperty('--my', '0px');
    });
  });
}

/* ─── PRODUKTKARTEN: 3D-TILT + GLANZ ────────────────────────── */
function initCardTilt() {
  const grid = document.getElementById('product-grid');
  if (!grid || !hasFinePointer() || prefersReducedMotion()) return;

  grid.addEventListener('pointermove', (e) => {
    const card = e.target.closest('.product-card');
    if (!card) return;
    const r = card.getBoundingClientRect();
    const nx = (e.clientX - r.left) / r.width;
    const ny = (e.clientY - r.top) / r.height;
    card.style.setProperty('--rx', `${((0.5 - ny) * 8).toFixed(2)}deg`);
    card.style.setProperty('--ry', `${((nx - 0.5) * 10).toFixed(2)}deg`);
    card.style.setProperty('--gx', `${(nx * 100).toFixed(1)}%`);
    card.style.setProperty('--gy', `${(ny * 100).toFixed(1)}%`);
  });

  grid.addEventListener('pointerout', (e) => {
    const card = e.target.closest('.product-card');
    if (!card || card.contains(e.relatedTarget)) return;
    card.style.removeProperty('--rx');
    card.style.removeProperty('--ry');
  });
}

/* ─── FILTER: GLEITENDER INDIKATOR ──────────────────────────── */
function moveFilterIndicator() {
  const indicator = document.getElementById('filter-indicator');
  const activeTab = document.querySelector('#filter-tabs .filter-tab--active');
  if (!indicator || !activeTab) return;
  indicator.style.setProperty('--x', `${activeTab.offsetLeft}px`);
  indicator.style.setProperty('--y', `${activeTab.offsetTop + activeTab.offsetHeight - 1}px`);
  indicator.style.setProperty('--w', `${activeTab.offsetWidth}px`);
}

/* ─── PROZESS: STATIONEN LEUCHTEN NACHEINANDER ──────────────── */
function initProcessSteps() {
  const section = document.getElementById('prozess');
  const svg = document.getElementById('process-svg');
  const list = document.getElementById('process-steps');
  if (!section || !svg || !list) return;

  const groups = Array.from(svg.querySelectorAll('.proc-step'));
  const items = Array.from(list.querySelectorAll('li'));
  const total = groups.length;
  let current = 0;
  let hovering = false;
  let timer = null;

  const set = (i) => {
    current = i;
    groups.forEach((g) => g.classList.toggle('is-active', Number(g.dataset.step) === i));
    items.forEach((li) => li.classList.toggle('is-active', Number(li.dataset.step) === i));
  };
  set(0);

  [...groups, ...items].forEach((el) => {
    el.addEventListener('pointerenter', () => {
      hovering = true;
      set(Number(el.dataset.step));
    });
    el.addEventListener('pointerleave', () => { hovering = false; });
  });

  if (prefersReducedMotion() || !('IntersectionObserver' in window)) return;

  new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting && !timer) {
      timer = setInterval(() => {
        if (!hovering) set((current + 1) % total);
      }, 2400);
    } else if (!entry.isIntersecting && timer) {
      clearInterval(timer);
      timer = null;
    }
  }, { threshold: 0.3 }).observe(section);
}

/* ─── NAVIGATION: AKTIVE SEKTION MARKIEREN ──────────────────── */
function initNavSpy() {
  const links = Array.from(document.querySelectorAll('.nav-link'));
  if (!links.length || !('IntersectionObserver' in window)) return;

  const byId = new Map(links.map((l) => [l.getAttribute('href').slice(1), l]));
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((l) => l.classList.remove('is-current'));
        byId.get(entry.target.id)?.classList.add('is-current');
      });
    },
    { rootMargin: '-45% 0px -50% 0px' }
  );
  byId.forEach((_, id) => {
    const section = document.getElementById(id);
    if (section) io.observe(section);
  });
}

/* ─── SCROLL-FORTSCHRITT ────────────────────────────────────── */
function initScrollProgress() {
  const bar = document.getElementById('scroll-progress-bar');
  if (!bar) return;
  onScrollFrame(() => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.transform = `scaleX(${max > 0 ? (window.scrollY / max).toFixed(4) : 0})`;
  });
}

/* ─── NEWSLETTER ────────────────────────────────────────────── */
function initNewsletter() {
  const form = document.getElementById('newsletter-form');
  const input = document.getElementById('newsletter-email');
  const success = document.getElementById('newsletter-success');
  if (!form || !input) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!isValidEmail(input.value)) {
      input.classList.remove('is-invalid');
      input.getBoundingClientRect();
      input.classList.add('is-invalid');
      input.focus();
      return;
    }
    input.classList.remove('is-invalid');
    form.reset();
    if (success) success.hidden = false;
  });
}


/* ─── SCROLL-TRIGGER: HEADER ────────────────────────────────── */
function initHeaderScroll() {
  const header = document.getElementById('site-header');
  if (!header) return;
  const onScroll = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 20);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); /* Initialzustand setzen */
}

/* Globale Schließ-Mechanismen: Backdrop-Klick + Escape */
function initOverlayDismiss() {
  const backdrop = document.getElementById('overlay-backdrop');
  if (backdrop) {
    backdrop.addEventListener('click', closeAllOverlays);
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAllOverlays();
  });
}

/* ═══════════════════════════════════════════════════════════
   WARENKORB (CART)
   ═══════════════════════════════════════════════════════════ */

/* Eindeutiger Schlüssel je Variante (Produkt + Größe + Mahlgrad) */
function cartLineKey(productId, size, grind) {
  return `${productId}__${size}__${grind}`;
}

/* ─── PERSISTENZ (localStorage) ─────────────────────────────── */
function saveCart() {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch (e) {
    /* localStorage nicht verfügbar – stiller Fallback */
  }
}

function loadCart() {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    cart = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(cart)) cart = [];
  } catch (e) {
    cart = [];
  }
}

/* ─── HINZUFÜGEN ────────────────────────────────────────────── */
function handleAddToCart() {
  const product = modalState.product;
  if (!product) return;

  const size = modalState.size;
  const grind = modalState.grind;
  const quantity = modalState.quantity;
  const unitPrice = getModalUnitPrice();
  const key = cartLineKey(product.id, size, grind);

  /* Existierende identische Variante? → Menge erhöhen */
  const existing = cart.find((line) => line.key === key);
  if (existing) {
    existing.quantity += quantity;
    existing.totalPrice = existing.unitPrice * existing.quantity;
  } else {
    cart.push({
      key,
      id: product.id,
      name: product.name,
      size,
      grind,
      grindLabel: grindLabel(grind),
      quantity,
      unitPrice,
      totalPrice: unitPrice * quantity,
      image: product.image,
    });
  }

  saveCart();
  updateCartUI();

  /* Erfolgsmeldung + Modal nach 1 s schließen */
  const success = document.getElementById('product-modal-success');
  if (success) {
    success.hidden = false;
    setTimeout(() => {
      closeOverlay('product-modal');
      success.hidden = true;
    }, 1000);
  }
}

/* ─── MENGE ÄNDERN / LÖSCHEN ────────────────────────────────── */
function changeCartQuantity(key, delta) {
  const line = cart.find((l) => l.key === key);
  if (!line) return;
  line.quantity += delta;
  if (line.quantity < 1) {
    removeCartLine(key);
    return;
  }
  line.totalPrice = line.unitPrice * line.quantity;
  saveCart();
  updateCartUI();
}

function removeCartLine(key) {
  cart = cart.filter((l) => l.key !== key);
  saveCart();
  updateCartUI();
}

/* ─── BERECHNUNGEN ──────────────────────────────────────────── */
function getCartCount() {
  return cart.reduce((sum, l) => sum + l.quantity, 0);
}

function getCartSubtotal() {
  return cart.reduce((sum, l) => sum + l.totalPrice, 0);
}

function getShippingCost(subtotal) {
  if (subtotal <= 0) return 0;
  return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
}

/* ─── RENDERING ─────────────────────────────────────────────── */
function updateCartBadge() {
  const badge = document.getElementById('cart-badge');
  if (!badge) return;
  const next = `[ ${getCartCount()} ]`;
  if (badge.textContent === next) return;
  badge.textContent = next;
  /* Pop-Animation neu triggern */
  badge.classList.remove('badge-pop');
  void badge.offsetWidth;
  badge.classList.add('badge-pop');
}

function renderCartItems() {
  const list = document.getElementById('cart-items-list');
  const emptyState = document.getElementById('cart-empty-state');
  const summary = document.getElementById('cart-summary');
  if (!list) return;

  if (!cart.length) {
    list.innerHTML = '';
    if (emptyState) emptyState.hidden = false;
    if (summary) summary.hidden = true;
    return;
  }

  if (emptyState) emptyState.hidden = true;
  if (summary) summary.hidden = false;

  list.innerHTML = cart
    .map(
      (l) => `
      <li class="cart-item" data-key="${l.key}">
        <img class="cart-item-img" src="${l.image}" alt="${l.name}" />
        <div class="cart-item-info">
          <p class="cart-item-name">${l.name}</p>
          <p class="cart-item-meta">${l.size}g · ${grindLabel(l.grind)}</p>
          <div class="cart-item-qty">
            <button class="cart-item-qty-btn" data-action="dec" data-key="${l.key}" aria-label="${t('cart.dec')}">−</button>
            <span class="cart-item-qty-value">${l.quantity}</span>
            <button class="cart-item-qty-btn" data-action="inc" data-key="${l.key}" aria-label="${t('cart.inc')}">+</button>
          </div>
        </div>
        <div class="cart-item-side">
          <button class="cart-item-remove" data-action="remove" data-key="${l.key}" aria-label="${t('cart.remove')}">✕</button>
          <span class="cart-item-price">${formatPrice(l.totalPrice)}</span>
        </div>
      </li>
    `
    )
    .join('');
}

function renderCartSummary() {
  const subtotal = getCartSubtotal();
  const shipping = getShippingCost(subtotal);
  const total = subtotal + shipping;

  const subtotalEl = document.getElementById('cart-subtotal');
  const shippingEl = document.getElementById('cart-shipping-cost');
  const totalEl = document.getElementById('cart-total');
  const infoEl = document.getElementById('cart-shipping-info');

  if (subtotalEl) subtotalEl.textContent = formatPrice(subtotal);
  if (shippingEl) {
    shippingEl.textContent = shipping === 0 ? t('cart.free') : formatPrice(SHIPPING_COST);
  }
  if (totalEl) totalEl.textContent = formatPrice(total);

  /* Dynamische Versand-Info */
  if (infoEl) {
    if (subtotal <= 0) {
      infoEl.textContent = t('cart.freeFrom', { amount: formatPrice(FREE_SHIPPING_THRESHOLD) });
    } else if (subtotal >= FREE_SHIPPING_THRESHOLD) {
      infoEl.textContent = t('cart.freeReached');
    } else {
      const rest = FREE_SHIPPING_THRESHOLD - subtotal;
      infoEl.textContent = t('cart.remaining', { amount: formatPrice(rest) });
    }
  }
}

/* Zentrale UI-Aktualisierung für alle Warenkorb-Ansichten */
function updateCartUI() {
  updateCartBadge();
  renderCartItems();
  renderCartSummary();
}

/* ─── DRAWER-STEUERUNG ──────────────────────────────────────── */
function openCartDrawer() {
  updateCartUI();
  openOverlay('cart-drawer');
  const toggle = document.getElementById('cart-toggle-btn');
  if (toggle) toggle.setAttribute('aria-expanded', 'true');
}

function closeCartDrawer() {
  closeOverlay('cart-drawer');
  const toggle = document.getElementById('cart-toggle-btn');
  if (toggle) toggle.setAttribute('aria-expanded', 'false');
}

/* ─── EVENT-BINDINGS (CART) ─────────────────────────────────── */
function initCart() {
  /* Header-Button öffnet Drawer */
  const toggle = document.getElementById('cart-toggle-btn');
  if (toggle) toggle.addEventListener('click', openCartDrawer);

  /* X-Button schließt Drawer */
  const closeBtn = document.getElementById('cart-close-btn');
  if (closeBtn) closeBtn.addEventListener('click', closeCartDrawer);

  /* Mengen-/Löschen-Aktionen (Delegation) */
  const list = document.getElementById('cart-items-list');
  if (list) {
    list.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-action]');
      if (!btn) return;
      const key = btn.dataset.key;
      switch (btn.dataset.action) {
        case 'inc':
          changeCartQuantity(key, 1);
          break;
        case 'dec':
          changeCartQuantity(key, -1);
          break;
        case 'remove':
          removeCartLine(key);
          break;
      }
    });
  }
}

/* ═══════════════════════════════════════════════════════════
   SCHNELL-CHECKOUT
   ═══════════════════════════════════════════════════════════ */

/* ─── ÖFFNEN / BESTELLÜBERSICHT ─────────────────────────────── */
function openCheckout() {
  if (!cart.length) return;
  closeCartDrawer();
  renderCheckoutSummary();
  /* Formular sichtbar, Bestätigung versteckt (relevant nach Prompt 7) */
  const formSection = document.getElementById('checkout-form-section');
  const confirmation = document.getElementById('order-confirmation');
  if (formSection) formSection.hidden = false;
  if (confirmation) confirmation.hidden = true;
  openOverlay('checkout-modal');
}

function renderCheckoutSummary() {
  const list = document.getElementById('checkout-order-list');
  const subtotal = getCartSubtotal();
  const shipping = getShippingCost(subtotal);
  const total = subtotal + shipping;

  if (list) {
    list.innerHTML = cart
      .map(
        (l) => `
        <li class="checkout-order-item">
          <img class="checkout-order-item-img" src="${l.image}" alt="${l.name}" />
          <span class="checkout-order-item-name">
            ${l.quantity}× ${l.name}<br />
            <span class="checkout-order-item-opt">${l.size}g · ${grindLabel(l.grind)}</span>
          </span>
          <span class="checkout-order-item-price">${formatPrice(l.totalPrice)}</span>
        </li>
      `
      )
      .join('');
  }

  const shippingEl = document.getElementById('checkout-shipping-display');
  const grandEl = document.getElementById('checkout-grand-total-display');
  const btnTotalEl = document.getElementById('checkout-total-display');

  if (shippingEl) shippingEl.textContent = shipping === 0 ? t('cart.free') : formatPrice(SHIPPING_COST);
  if (grandEl) grandEl.textContent = formatPrice(total);
  if (btnTotalEl) btnTotalEl.textContent = formatPrice(total);
}

/* ─── ZAHLUNGSMETHODEN ──────────────────────────────────────── */
function updatePaymentFields() {
  const selected = document.querySelector('input[name="payment"]:checked');
  const ccFields = document.getElementById('creditcard-fields');
  if (!ccFields) return;
  const isCard = selected && selected.value === 'creditcard';
  ccFields.classList.toggle('is-hidden', !isCard);
}

/* ─── VALIDIERUNG ───────────────────────────────────────────── */
function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function setFieldError(input, hasError) {
  if (input) input.classList.toggle('is-invalid', hasError);
}

function showError(id, message) {
  const el = document.getElementById(id);
  if (!el) return;
  el.textContent = message;
  el.hidden = !message;
}

function validateCheckout() {
  let valid = true;
  let generalMessage = '';

  /* Pflichtfelder (Text) */
  const requiredFields = [
    'checkout-email',
    'checkout-firstname',
    'checkout-lastname',
    'checkout-street',
    'checkout-zip',
    'checkout-city',
  ];

  requiredFields.forEach((id) => {
    const input = document.getElementById(id);
    if (input && !input.value.trim()) {
      setFieldError(input, true);
      valid = false;
    } else {
      setFieldError(input, false);
    }
  });

  if (!valid) generalMessage = t('err.required');

  /* E-Mail-Format */
  const emailInput = document.getElementById('checkout-email');
  if (emailInput && emailInput.value.trim() && !isValidEmail(emailInput.value)) {
    setFieldError(emailInput, true);
    showError('checkout-email-error', t('err.email'));
    valid = false;
  } else {
    showError('checkout-email-error', '');
  }

  /* Kreditkarten-Validierung nur bei Auswahl */
  const payment = document.querySelector('input[name="payment"]:checked');
  if (payment && payment.value === 'creditcard') {
    const cardInput = document.getElementById('checkout-card-number');
    const expiryInput = document.getElementById('checkout-card-expiry');
    const cvcInput = document.getElementById('checkout-card-cvc');

    const cardDigits = cardInput ? cardInput.value.replace(/\s/g, '') : '';
    const cardOk = /^\d{16}$/.test(cardDigits);
    const expiryOk = expiryInput ? /^\d{2}\/\d{2}$/.test(expiryInput.value.trim()) : false;
    const cvcOk = cvcInput ? /^\d{3,4}$/.test(cvcInput.value.trim()) : false;

    setFieldError(cardInput, !cardOk);
    setFieldError(expiryInput, !expiryOk);
    setFieldError(cvcInput, !cvcOk);

    if (!cardOk) {
      showError('checkout-card-error', t('err.card'));
      valid = false;
    } else {
      showError('checkout-card-error', '');
    }
    if (!expiryOk || !cvcOk) {
      valid = false;
      if (!generalMessage) generalMessage = t('err.required');
    }
  }

  showError('checkout-general-error', valid ? '' : generalMessage);
  return valid;
}

/* ─── EVENT-BINDINGS (CHECKOUT) ─────────────────────────────── */
function initCheckout() {
  /* "Zur Kasse gehen" im Drawer */
  const openBtn = document.getElementById('checkout-open-btn');
  if (openBtn) openBtn.addEventListener('click', openCheckout);

  /* X-Button schließt Checkout */
  const closeBtn = document.getElementById('checkout-modal-close-btn');
  if (closeBtn) closeBtn.addEventListener('click', () => closeOverlay('checkout-modal'));

  /* "Zurück zum Shop" schließt Checkout nach Bestellbestätigung */
  const confirmCloseBtn = document.getElementById('confirmation-close-btn');
  if (confirmCloseBtn) {
    confirmCloseBtn.addEventListener('click', () => closeOverlay('checkout-modal'));
  }

  /* Zahlungsmethoden-Umschaltung */
  document.querySelectorAll('input[name="payment"]').forEach((radio) => {
    radio.addEventListener('change', updatePaymentFields);
  });
  updatePaymentFields();

  /* Formular-Absenden → Validierung */
  const form = document.getElementById('checkout-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (validateCheckout()) {
        /* Erfolgreiche Validierung → Bestellabschluss (Prompt 7) */
        handleOrderSubmit();
      }
    });

    /* Fehler-Markierung beim Tippen entfernen */
    form.addEventListener('input', (e) => {
      if (e.target.classList.contains('is-invalid')) {
        e.target.classList.remove('is-invalid');
      }
    });
  }
}

/* ─── ZAHLUNGSSIMULATION & BESTÄTIGUNG ──────────────────────── */

/* Erzeugt eine zufällige Bestellnummer im Format RC-XXXXX */
function generateOrderNumber() {
  const num = Math.floor(10000 + Math.random() * 90000);
  return `#RC-${num}`;
}

function handleOrderSubmit() {
  const submitBtn = document.getElementById('checkout-submit-btn');
  if (!submitBtn || submitBtn.disabled) return;

  /* 1) Button deaktivieren + Lade-Animation */
  submitBtn.disabled = true;
  submitBtn.classList.add('btn--loading');
  submitBtn.dataset.originalHtml = submitBtn.innerHTML;
  submitBtn.textContent = t('co.processing');

  /* 2) Simulierte Verzögerung (2 s) */
  setTimeout(() => {
    /* 3) Formular ausblenden, Erfolgs-Layout zeigen */
    const formSection = document.getElementById('checkout-form-section');
    const confirmation = document.getElementById('order-confirmation');
    if (formSection) formSection.hidden = true;
    if (confirmation) confirmation.hidden = false;

    /* 4) Bestellnummer generieren + anzeigen */
    const orderNumberEl = document.getElementById('confirmation-order-number');
    if (orderNumberEl) orderNumberEl.textContent = generateOrderNumber();

    /* 5) Warenkorb komplett leeren + Persistenz löschen + Badge zurücksetzen */
    cart = [];
    try {
      localStorage.removeItem(CART_STORAGE_KEY);
    } catch (e) {
      /* stiller Fallback */
    }
    updateCartUI();

    /* Button für nächste Bestellung zurücksetzen */
    submitBtn.disabled = false;
    submitBtn.classList.remove('btn--loading');
    if (submitBtn.dataset.originalHtml) {
      submitBtn.innerHTML = submitBtn.dataset.originalHtml;
      applyTranslations(submitBtn); /* falls inzwischen die Sprache gewechselt wurde */
    }
  }, 2000);
}

/* ─── EVENT-BINDINGS ────────────────────────────────────────── */
function initFilterTabs() {
  const tabs = document.querySelectorAll('#filter-tabs .filter-tab');
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      state.filter = tab.dataset.filter;

      tabs.forEach((t) => {
        const isActive = t === tab;
        t.classList.toggle('active', isActive);
        t.classList.toggle('filter-tab--active', isActive);
        t.setAttribute('aria-selected', String(isActive));
      });

      moveFilterIndicator();
      updateCatalog();
    });
  });

  moveFilterIndicator();
  window.addEventListener('resize', moveFilterIndicator);
  /* Nach dem Laden der Webfonts ändern sich die Tab-Breiten */
  document.fonts?.ready.then(moveFilterIndicator);
}

function initSortSelect() {
  const select = document.getElementById('sort-select');
  if (!select) return;
  select.addEventListener('change', () => {
    state.sort = select.value;
    updateCatalog();
  });
}

/* ─── INIT ──────────────────────────────────────────────────── */
/* ─── SPRACHUMSCHALTER ──────────────────────────────────────── */
function initLanguage() {
  applyTranslations();

  document.querySelectorAll('.lang-btn').forEach((btn) => {
    btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
  });

  /* Dynamische Bereiche nach einem Sprachwechsel neu aufbauen */
  document.addEventListener('lang:change', () => {
    updateCatalog();
    updateCartUI();
    moveFilterIndicator();
    reformatCounters();
    if (modalState.product) {
      fillProductModalTexts(modalState.product);
      updateModalPrice();
    }
    if (document.getElementById('checkout-modal')?.classList.contains('is-open')) {
      renderCheckoutSummary();
    }
    /* Fehlermeldungen des Checkouts verschwinden; beim nächsten Absenden neu */
    ['checkout-email-error', 'checkout-card-error', 'checkout-general-error'].forEach((id) =>
      showError(id, '')
    );

    if (!prefersReducedMotion()) {
      document.getElementById('main-content')?.animate(
        [{ opacity: 0.35 }, { opacity: 1 }],
        { duration: 450, easing: 'ease-out' }
      );
    }
  });
}

function init() {
  initLanguage();
  loadCart();
  updateCatalog();
  initFilterTabs();
  initSortSelect();
  initProductModal();
  initCart();
  initCheckout();
  initOverlayDismiss();
  initHeaderScroll();
  initMobileNav();
  initNewsletter();
  initScrollReveal();
  initHeroCarousel();
  initHeroDust();
  initHeroParallax();
  initCursor();
  initMagnetic();
  initCardTilt();
  initProcessSteps();
  initNavSpy();
  initScrollProgress();
  updateCartUI();
}

document.addEventListener('DOMContentLoaded', init);

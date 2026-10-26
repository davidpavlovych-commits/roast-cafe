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

const GRIND_LABELS = {
  'ganze-bohne': 'Ganze Bohne',
  'filter': 'Gemahlen (Filter)',
  'espresso': 'Gemahlen (Espresso Siebträger)',
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
  '€' + value.toFixed(2).replace('.', ',');

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
    grid.innerHTML =
      '<p class="product-grid-empty">Keine Kaffees in dieser Kategorie gefunden.</p>';
    return;
  }

  grid.innerHTML = productsList
    .map((p, index) => {
      const limitedTag = p.limited
        ? '<span class="product-card-tag">Limited</span>'
        : '';
      return `
        <article
          class="product-card"
          role="listitem"
          data-id="${p.id}"
          data-category="${p.category}"
          tabindex="0"
          aria-label="${p.name} – Details anzeigen"
          style="--d: ${index * 70}ms"
        >
          <div class="product-card-image-wrap">
            <img
              class="product-card-image"
              src="${p.image}"
              alt="Verpackung ${p.name} – ${p.origin}"
              loading="lazy"
            />
            ${limitedTag}
            <div class="product-card-quickview">Schnellansicht</div>
          </div>
          <div class="product-card-body">
            <p class="product-card-origin">${p.origin}</p>
            <div class="product-card-roast" aria-label="Röstgrad ${p.roast} von 5">
              ${renderRoastDots(p.roast)}
            </div>
            <h3 class="product-card-title">${p.name}</h3>
            <p class="product-card-flavor">${p.flavor}</p>
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

/* Befüllt das Modal mit den Daten eines Produkts und öffnet es */
function openProductModal(productId) {
  const product = products.find((p) => p.id === productId);
  if (!product) return;

  /* Modal-Zustand zurücksetzen */
  modalState.product = product;
  modalState.size = 250;
  modalState.grind = 'ganze-bohne';
  modalState.quantity = 1;

  /* Inhalte befüllen */
  const img = document.getElementById('product-modal-image');
  img.src = product.image;
  img.alt = `Verpackung ${product.name} – ${product.origin}`;

  document.getElementById('product-modal-origin').textContent =
    `${product.origin} · ${product.process}`;
  document.getElementById('product-modal-title').textContent = product.name;
  document.getElementById('product-modal-flavor').textContent = product.flavor;
  document.getElementById('product-modal-description').textContent =
    product.description;

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
    btn.setAttribute('aria-label', open ? 'Menü schließen' : 'Menü öffnen');
  };

  btn.addEventListener('click', () => {
    setOpen(!nav.classList.contains('is-open'));
  });

  /* Nach Klick auf einen Link schließen */
  nav.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', () => setOpen(false));
  });
}

/* ─── SCROLL-REVEAL (IntersectionObserver) ──────────────────── */
function initScrollReveal() {
  const els = document.querySelectorAll('[data-reveal]');
  const grid = document.getElementById('product-grid');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Fallback: alles sofort sichtbar */
  if (reduceMotion || !('IntersectionObserver' in window)) {
    els.forEach((el) => el.classList.add('is-revealed'));
    if (grid) grid.classList.add('in-view');
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add(
          entry.target === grid ? 'in-view' : 'is-revealed'
        );
        io.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -48px 0px' }
  );

  els.forEach((el) => io.observe(el));
  if (grid) io.observe(grid);
}

/* ─── HERO-PARALLAX ─────────────────────────────────────────── */
function initHeroParallax() {
  const hero = document.getElementById('hero');
  const inner = document.querySelector('.hero-inner');
  if (!hero || !inner) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  /* Nur auf breiten Viewports (zweispaltiges Hero-Layout) */
  const wide = window.matchMedia('(min-width: 1021px)');

  let ticking = false;
  window.addEventListener(
    'scroll',
    () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        if (!wide.matches) {
          inner.style.transform = '';
          inner.style.opacity = '';
        } else {
          const y = window.scrollY;
          const limit = hero.offsetHeight;
          if (y <= limit) {
            inner.style.transform = `translateY(${y * 0.12}px)`;
            inner.style.opacity = String(
              Math.max(0, 1 - y / (limit * 0.9))
            );
          }
        }
        ticking = false;
      });
    },
    { passive: true }
  );
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
      grindLabel: GRIND_LABELS[grind],
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
          <p class="cart-item-meta">${l.size}g · ${l.grindLabel}</p>
          <div class="cart-item-qty">
            <button class="cart-item-qty-btn" data-action="dec" data-key="${l.key}" aria-label="Menge verringern">−</button>
            <span class="cart-item-qty-value">${l.quantity}</span>
            <button class="cart-item-qty-btn" data-action="inc" data-key="${l.key}" aria-label="Menge erhöhen">+</button>
          </div>
        </div>
        <div class="cart-item-side">
          <button class="cart-item-remove" data-action="remove" data-key="${l.key}" aria-label="Artikel entfernen">✕</button>
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
    shippingEl.textContent = shipping === 0 ? 'Kostenlos' : '4,90 €';
  }
  if (totalEl) totalEl.textContent = formatPrice(total);

  /* Dynamische Versand-Info */
  if (infoEl) {
    if (subtotal <= 0) {
      infoEl.textContent = 'Kostenloser Versand ab 45,00 €!';
    } else if (subtotal >= FREE_SHIPPING_THRESHOLD) {
      infoEl.textContent = 'Deine Bestellung wird kostenlos versendet!';
    } else {
      const rest = FREE_SHIPPING_THRESHOLD - subtotal;
      infoEl.textContent = `Noch ${formatPrice(rest)} bis zum kostenlosen Versand.`;
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
            <span class="checkout-order-item-opt">${l.size}g · ${l.grindLabel}</span>
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

  if (shippingEl) shippingEl.textContent = shipping === 0 ? 'Kostenlos' : '4,90 €';
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

  if (!valid) generalMessage = 'Bitte fülle alle Pflichtfelder aus.';

  /* E-Mail-Format */
  const emailInput = document.getElementById('checkout-email');
  if (emailInput && emailInput.value.trim() && !isValidEmail(emailInput.value)) {
    setFieldError(emailInput, true);
    showError('checkout-email-error', 'Bitte gib eine gültige E-Mail-Adresse ein.');
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
      showError('checkout-card-error', 'Kartennummer ungültig.');
      valid = false;
    } else {
      showError('checkout-card-error', '');
    }
    if (!expiryOk || !cvcOk) {
      valid = false;
      if (!generalMessage) generalMessage = 'Bitte fülle alle Pflichtfelder aus.';
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
  submitBtn.textContent = 'Zahlung wird verarbeitet …';

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

      updateCatalog();
    });
  });
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
function init() {
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
  initScrollReveal();
  initHeroParallax();
  updateCartUI();
}

document.addEventListener('DOMContentLoaded', init);

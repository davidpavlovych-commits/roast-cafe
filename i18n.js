/* ═══════════════════════════════════════════════════════════
   ROAST – CAFÉ | Übersetzungen (DE / EN)
   ─ Statische Texte: Elemente mit data-i18n="key"
     (Attribute via data-i18n-attr="placeholder:key; aria-label:key")
   ─ Dynamische Texte: t('key', { platzhalter })
   ═══════════════════════════════════════════════════════════ */

const I18N = {
  de: {
    'meta.title': 'Roast - Café | Premium Specialty Coffee Online-Shop',
    'meta.description': 'ROAST – CAFÉ: Schonend geröstete Spezialitätenkaffees aus nachhaltigem Anbau. Direkt gehandelt, handwerklich veredelt in unserer Rösterei in Düsseldorf. Jetzt online bestellen.',

    'lang.aria': 'Sprache wählen',
    'nav.aria': 'Hauptnavigation',
    'nav.menuOpen': 'Menü öffnen',
    'nav.menuClose': 'Menü schließen',
    'nav.collection': 'Kollektion',
    'nav.story': 'Unsere Story',
    'nav.process': 'Prozess',
    'nav.brewing': 'Zubereitung',
    'logo.aria': 'ROAST – CAFÉ Startseite',
    'cart.open': 'Warenkorb öffnen',
    'cart.label': 'Warenkorb',

    'hero.line1': 'Selten im Anbau, vollendet im Geschmack,',
    'hero.line2': 'Intensives Aroma <em>&amp;</em> ausgewogener Charakter',
    'hero.choose': 'Kaffeesorte wählen',
    'hero.more': 'Mehr erfahren',
    'hero.scroll': 'Weiter zu Unsere Story',
    'hero.prev': 'Vorherige Sorte',
    'hero.next': 'Nächste Sorte',
    'hero.show': '{name} anzeigen',
    'hero.moreAbout': 'Mehr über {name} erfahren',
    'hero.label.p1': 'Espresso',
    'hero.label.p2': 'Filterkaffee',
    'hero.label.p3': 'Decaf',
    'hero.label.p4': 'Limited',

    'story.imgAlt': 'Kaffeebauern sortieren Rohkaffeebohnen von Hand',
    'story.title': '<span class="gold">Mehr als Standard</span> – Kaffee, den wir selbst trinken wollen',
    'story.intro': 'Kaffee ist für uns kein schnelles Konsumgut, sondern ein Ritual. Jede Bohne erzählt die Geschichte des Bodens, auf dem sie gewachsen ist, und des Farmers, der sie gepflegt hat. Wir kaufen direkt, rösten in kleinen Chargen und versenden nur, was wir selbst trinken würden.',
    'story.altitude': 'Anbauhöhe',
    'story.batch': 'Chargengröße',
    'story.fresh': 'Röstfrisch in',
    'pillar1.title': 'Direkt &amp; Fair',
    'pillar1.text': 'Rohkaffee ohne Zwischenhändler – zu Preisen weit über dem Fairtrade-Niveau, direkt an die Farmer.',
    'pillar2.title': 'Probat-Röstung',
    'pillar2.text': 'Kleine Chargen auf einem restaurierten Probat-Trommelröster – temperaturgeführt für feine Säuren und süße Aromen.',
    'pillar3.title': 'Das Ritual',
    'pillar3.text': 'Vom Mahlen bis zum letzten Schluck: ein bewusster Moment der Entschleunigung.',
    'story.cta': 'Zum Prozess',

    'quote.aria': 'Unser Anspruch',
    'quote.text': 'ROAST – CAFÉ setzt den Maßstab dort an, wo andere aufhören: <strong>bei der einzelnen Bohne.</strong>',
    'quote.cta': 'Kollektion entdecken',

    'collection.eyebrow': 'Kollektion',
    'collection.title': 'Unsere Röstungen',
    'filter.aria': 'Kaffee-Kategorien filtern',
    'filter.all': 'Alle Kaffees',
    'filter.espresso': 'Espresso',
    'filter.filter': 'Filterkaffee',
    'filter.decaf': 'Decaf / Limited',
    'sort.label': 'Sortieren nach',
    'sort.aria': 'Produkte sortieren',
    'sort.default': 'Standard',
    'sort.priceAsc': 'Preis aufsteigend',
    'sort.priceDesc': 'Preis absteigend',
    'sort.popularity': 'Beliebtheit',
    'grid.aria': 'Produktkatalog',
    'grid.empty': 'Keine Kaffees in dieser Kategorie gefunden.',
    'card.details': '{name} – Details anzeigen',
    'card.alt': 'Verpackung {name} – {origin}',
    'card.roast': 'Röstgrad {n} von 5',
    'card.quickview': 'Schnellansicht',
    'card.limited': 'Limited',

    'process.eyebrow': 'Der Weg der Bohne',
    'process.title': 'Vom Strauch <span class="gold">in die Tasse</span>',
    'process.intro': 'Vier Stationen, ein Anspruch: Jede Bohne wird von Hand geerntet, in der Sonne getrocknet, in Düsseldorf geröstet und frisch zu dir geschickt. Fahre über eine Station, um sie hervorzuheben.',
    'process.step0': '<span>01</span> Ernte',
    'process.step1': '<span>02</span> Aufbereitung',
    'process.step2': '<span>03</span> Röstung',
    'process.step3': '<span>04</span> Versand',
    'process.aria': 'Produktionsprozess der Kaffeebohnen: Ernte, Trocknung, Röstung, Versand',
    'process.head': 'Produktions-Prozess',
    'process.live': 'Live',
    'proc1.phase': 'PHASE 01 · ERNTE',
    'proc1.title': 'Handernte der Kirschen',
    'proc1.d1': 'Nur vollreife Kaffeekirschen,',
    'proc1.d2': 'gepflückt auf 1.400–2.100 m.',
    'proc2.phase': 'PHASE 02 · AUFBEREITUNG',
    'proc2.title': 'Sonnentrocknung',
    'proc2.d1': 'Bis zu 28 Tage auf African Beds,',
    'proc2.d2': 'täglich von Hand gewendet.',
    'proc3.phase': 'PHASE 03 · RÖSTUNG',
    'proc3.title': 'Trommelröstung bei 212 °C',
    'proc3.d1': 'Kleine 12-kg-Chargen, schonend',
    'proc3.d2': 'und temperaturgeführt geröstet.',
    'proc4.phase': 'PHASE 04 · VERSAND',
    'proc4.title': 'Frisch versiegelt',
    'proc4.d1': 'Mit Aromaventil verpackt und',
    'proc4.d2': 'innerhalb von 48 h geliefert.',

    'brew.eyebrow': 'Brew Guide',
    'brew.title': 'Zubereitung',
    'brew.status': '3 Profile · fahre über ein Profil',
    'brew.type.espresso': 'ESPRESSO',
    'brew.type.filter': 'FILTERKAFFEE',
    'brew.type.immersion': 'IMMERSION',
    'brew.method.portafilter': 'Siebträger',
    'brew.coffee': 'KAFFEE',
    'brew.water': 'WASSER',
    'brew.temp': 'TEMP',
    'brew.time': 'ZEIT',
    'brew.spec1a': 'EXTRAKTIONSDRUCK: 9 BAR',
    'brew.spec1b': 'MAHLGRAD: EXTRA FEIN',
    'brew.spec2a': 'BLOOMING: 40 SEKUNDEN',
    'brew.spec2b': 'MAHLGRAD: MEDIUM-FEIN',
    'brew.spec3a': 'IMMERSION: 90 SEKUNDEN',
    'brew.spec3b': 'MAHLGRAD: MEDIUM',
    'brew.ratio1': 'Verhältnis Kaffee zu Wasser 1:2',
    'brew.ratio2': 'Verhältnis Kaffee zu Wasser 1:16',
    'brew.ratio3': 'Verhältnis Kaffee zu Wasser 1:12',
    'brew.profile': 'EXTRAKTIONS-PROFIL',
    'brew.brewTime': 'BRÜHZEIT',

    'newsletter.title': 'Frische Röstungen in deinem Postfach',
    'newsletter.sub': 'Melde dich an, um exklusive Angebote und Benachrichtigungen über limitierte Chargen zu erhalten.',
    'newsletter.aria': 'Newsletter anmelden',
    'newsletter.email': 'Deine E-Mail-Adresse',
    'newsletter.submit': 'Abonnieren',
    'newsletter.success': '✓ Danke für deine Anmeldung!',
    'footer.legal': 'Rechtliche Links',
    'footer.imprint': 'Impressum',
    'footer.privacy': 'Datenschutz',
    'footer.terms': 'AGB &amp; Widerruf',

    'cart.aria': 'Warenkorb',
    'cart.title': 'Dein Einkaufswagen',
    'cart.close': 'Warenkorb schließen',
    'cart.empty': 'Dein Warenkorb ist aktuell leer. Füge Kaffees aus unserer Kollektion hinzu.',
    'cart.items': 'Warenkorb-Artikel',
    'cart.subtotal': 'Zwischensumme:',
    'cart.shipping': 'Versand:',
    'cart.total': 'Gesamtsumme:',
    'cart.checkout': 'Zur Kasse gehen',
    'cart.free': 'Kostenlos',
    'cart.freeFrom': 'Kostenloser Versand ab {amount}!',
    'cart.freeReached': 'Deine Bestellung wird kostenlos versendet!',
    'cart.remaining': 'Noch {amount} bis zum kostenlosen Versand.',
    'cart.dec': 'Menge verringern',
    'cart.inc': 'Menge erhöhen',
    'cart.remove': 'Artikel entfernen',

    'modal.close': 'Produktdetails schließen',
    'modal.size': 'Packungsgröße wählen:',
    'size.250': '250g (Standard)',
    'size.500': '500g (+ 95% Preis)',
    'size.1000': '1000g (+ 180% Preis)',
    'modal.grind': 'Mahlgrad wählen:',
    'grind.ganze-bohne': 'Ganze Bohne',
    'grind.filter': 'Gemahlen (Filter)',
    'grind.espresso': 'Gemahlen (Espresso Siebträger)',
    'modal.qty': 'Menge:',
    'modal.qtyAria': 'Menge anpassen',
    'modal.add': 'In den Warenkorb legen',
    'modal.added': '✓ Erfolgreich hinzugefügt!',

    'co.close': 'Checkout schließen',
    'co.formAria': 'Bestellformular',
    'co.title': 'Schnell-Checkout',
    'co.s1': '1. Kontakt &amp; Versandadresse',
    'co.email': 'Email-Adresse<span aria-hidden="true">*</span>',
    'co.firstname': 'Vorname<span aria-hidden="true">*</span>',
    'co.lastname': 'Nachname<span aria-hidden="true">*</span>',
    'co.street': 'Straße und Hausnummer<span aria-hidden="true">*</span>',
    'co.zip': 'Postleitzahl<span aria-hidden="true">*</span>',
    'co.city': 'Stadt<span aria-hidden="true">*</span>',
    'co.ph.email': 'name@beispiel.de',
    'co.ph.firstname': 'Max',
    'co.ph.lastname': 'Mustermann',
    'co.ph.street': 'Kaffeestraße 12',
    'co.ph.expiry': 'MM/JJ',
    'co.s2': '2. Zahlungsart',
    'co.payAria': 'Zahlungsart auswählen',
    'pay.card': 'Kreditkarte',
    'pay.paypal': 'PayPal',
    'pay.sofort': 'Sofortüberweisung',
    'co.cardNumber': 'Kartennummer',
    'co.expiry': 'Gültig bis',
    'co.cvc': 'CVC',
    'co.submit': 'Jetzt zahlungspflichtig bestellen',
    'co.security': '🔒 Deine Verbindung ist SSL-verschlüsselt. Wir speichern keine Zahlungsdaten.',
    'co.summaryAria': 'Bestellübersicht',
    'co.s3': '3. Bestellübersicht',
    'co.processing': 'Zahlung wird verarbeitet …',
    'err.required': 'Bitte fülle alle Pflichtfelder aus.',
    'err.email': 'Bitte gib eine gültige E-Mail-Adresse ein.',
    'err.card': 'Kartennummer ungültig.',

    'conf.aria': 'Bestellbestätigung',
    'conf.status': 'Bestellung erfolgreich',
    'conf.title': 'Vielen Dank für deine Bestellung bei ROAST – CAFÉ!',
    'conf.label': 'Deine Bestellnummer lautet:',
    'conf.text': 'Wir bereiten deine Kaffees frisch für den Versand vor. Du erhältst in Kürze eine E-Mail mit deiner Sendungsverfolgungsnummer.',
    'conf.back': 'Zurück zum Shop',
  },

  en: {
    'meta.title': 'Roast - Café | Premium Specialty Coffee Online Shop',
    'meta.description': 'ROAST – CAFÉ: Gently roasted specialty coffees from sustainable farms. Traded directly and carefully roasted in our Düsseldorf roastery. Order online now.',

    'lang.aria': 'Choose language',
    'nav.aria': 'Main navigation',
    'nav.menuOpen': 'Open menu',
    'nav.menuClose': 'Close menu',
    'nav.collection': 'Collection',
    'nav.story': 'Our Story',
    'nav.process': 'Process',
    'nav.brewing': 'Brewing',
    'logo.aria': 'ROAST – CAFÉ home',
    'cart.open': 'Open cart',
    'cart.label': 'Cart',

    'hero.line1': 'Rare in origin, perfect in flavour,',
    'hero.line2': 'Intense aroma <em>&amp;</em> balanced character',
    'hero.choose': 'Choose a coffee',
    'hero.more': 'Learn more',
    'hero.scroll': 'Continue to Our Story',
    'hero.prev': 'Previous coffee',
    'hero.next': 'Next coffee',
    'hero.show': 'Show {name}',
    'hero.moreAbout': 'Learn more about {name}',
    'hero.label.p1': 'Espresso',
    'hero.label.p2': 'Filter',
    'hero.label.p3': 'Decaf',
    'hero.label.p4': 'Limited',

    'story.imgAlt': 'Coffee farmers sorting green coffee beans by hand',
    'story.title': '<span class="gold">Beyond the standard</span> – coffee we want to drink ourselves',
    'story.intro': 'To us, coffee is not a quick commodity but a ritual. Every bean tells the story of the soil it grew in and of the farmer who tended it. We buy direct, roast in small batches and only ship what we would drink ourselves.',
    'story.altitude': 'Altitude',
    'story.batch': 'Batch size',
    'story.fresh': 'Roasted fresh in',
    'pillar1.title': 'Direct &amp; Fair',
    'pillar1.text': 'Green coffee without middlemen – at prices well above Fairtrade level, paid directly to the farmers.',
    'pillar2.title': 'Probat Roasting',
    'pillar2.text': 'Small batches on a restored Probat drum roaster – temperature-controlled for delicate acidity and sweet aromas.',
    'pillar3.title': 'The Ritual',
    'pillar3.text': 'From grinding to the last sip: a conscious moment of slowing down.',
    'story.cta': 'See the process',

    'quote.aria': 'Our standard',
    'quote.text': 'ROAST – CAFÉ sets the standard where others stop: <strong>at the single bean.</strong>',
    'quote.cta': 'Discover the collection',

    'collection.eyebrow': 'Collection',
    'collection.title': 'Our Roasts',
    'filter.aria': 'Filter coffee categories',
    'filter.all': 'All coffees',
    'filter.espresso': 'Espresso',
    'filter.filter': 'Filter coffee',
    'filter.decaf': 'Decaf / Limited',
    'sort.label': 'Sort by',
    'sort.aria': 'Sort products',
    'sort.default': 'Featured',
    'sort.priceAsc': 'Price: low to high',
    'sort.priceDesc': 'Price: high to low',
    'sort.popularity': 'Popularity',
    'grid.aria': 'Product catalogue',
    'grid.empty': 'No coffees found in this category.',
    'card.details': '{name} – view details',
    'card.alt': '{name} packaging – {origin}',
    'card.roast': 'Roast level {n} of 5',
    'card.quickview': 'Quick view',
    'card.limited': 'Limited',

    'process.eyebrow': 'The journey of the bean',
    'process.title': 'From shrub <span class="gold">to cup</span>',
    'process.intro': 'Four stations, one standard: every bean is picked by hand, dried in the sun, roasted in Düsseldorf and sent to you fresh. Hover over a station to highlight it.',
    'process.step0': '<span>01</span> Harvest',
    'process.step1': '<span>02</span> Processing',
    'process.step2': '<span>03</span> Roasting',
    'process.step3': '<span>04</span> Shipping',
    'process.aria': 'Coffee bean production process: harvest, drying, roasting, shipping',
    'process.head': 'Production process',
    'process.live': 'Live',
    'proc1.phase': 'PHASE 01 · HARVEST',
    'proc1.title': 'Hand-picked cherries',
    'proc1.d1': 'Only fully ripe coffee cherries,',
    'proc1.d2': 'picked at 1,400–2,100 m.',
    'proc2.phase': 'PHASE 02 · PROCESSING',
    'proc2.title': 'Sun drying',
    'proc2.d1': 'Up to 28 days on African beds,',
    'proc2.d2': 'turned by hand every day.',
    'proc3.phase': 'PHASE 03 · ROASTING',
    'proc3.title': 'Drum roasting at 212 °C',
    'proc3.d1': 'Small 12 kg batches, roasted',
    'proc3.d2': 'gently with precise temperature.',
    'proc4.phase': 'PHASE 04 · SHIPPING',
    'proc4.title': 'Freshly sealed',
    'proc4.d1': 'Packed with an aroma valve and',
    'proc4.d2': 'delivered within 48 hours.',

    'brew.eyebrow': 'Brew Guide',
    'brew.title': 'Brewing',
    'brew.status': '3 profiles · hover over a profile',
    'brew.type.espresso': 'ESPRESSO',
    'brew.type.filter': 'FILTER COFFEE',
    'brew.type.immersion': 'IMMERSION',
    'brew.method.portafilter': 'Portafilter',
    'brew.coffee': 'COFFEE',
    'brew.water': 'WATER',
    'brew.temp': 'TEMP',
    'brew.time': 'TIME',
    'brew.spec1a': 'EXTRACTION PRESSURE: 9 BAR',
    'brew.spec1b': 'GRIND: EXTRA FINE',
    'brew.spec2a': 'BLOOMING: 40 SECONDS',
    'brew.spec2b': 'GRIND: MEDIUM-FINE',
    'brew.spec3a': 'IMMERSION: 90 SECONDS',
    'brew.spec3b': 'GRIND: MEDIUM',
    'brew.ratio1': 'Coffee to water ratio 1:2',
    'brew.ratio2': 'Coffee to water ratio 1:16',
    'brew.ratio3': 'Coffee to water ratio 1:12',
    'brew.profile': 'EXTRACTION PROFILE',
    'brew.brewTime': 'BREW TIME',

    'newsletter.title': 'Fresh roasts in your inbox',
    'newsletter.sub': 'Sign up for exclusive offers and alerts about limited batches.',
    'newsletter.aria': 'Newsletter sign-up',
    'newsletter.email': 'Your email address',
    'newsletter.submit': 'Subscribe',
    'newsletter.success': '✓ Thanks for subscribing!',
    'footer.legal': 'Legal links',
    'footer.imprint': 'Imprint',
    'footer.privacy': 'Privacy',
    'footer.terms': 'Terms &amp; Returns',

    'cart.aria': 'Cart',
    'cart.title': 'Your cart',
    'cart.close': 'Close cart',
    'cart.empty': 'Your cart is currently empty. Add coffees from our collection.',
    'cart.items': 'Cart items',
    'cart.subtotal': 'Subtotal:',
    'cart.shipping': 'Shipping:',
    'cart.total': 'Total:',
    'cart.checkout': 'Proceed to checkout',
    'cart.free': 'Free',
    'cart.freeFrom': 'Free shipping from {amount}!',
    'cart.freeReached': 'Your order ships for free!',
    'cart.remaining': '{amount} more for free shipping.',
    'cart.dec': 'Decrease quantity',
    'cart.inc': 'Increase quantity',
    'cart.remove': 'Remove item',

    'modal.close': 'Close product details',
    'modal.size': 'Choose bag size:',
    'size.250': '250g (standard)',
    'size.500': '500g (+95% price)',
    'size.1000': '1000g (+180% price)',
    'modal.grind': 'Choose grind:',
    'grind.ganze-bohne': 'Whole bean',
    'grind.filter': 'Ground (filter)',
    'grind.espresso': 'Ground (espresso portafilter)',
    'modal.qty': 'Quantity:',
    'modal.qtyAria': 'Adjust quantity',
    'modal.add': 'Add to cart',
    'modal.added': '✓ Added to your cart!',

    'co.close': 'Close checkout',
    'co.formAria': 'Order form',
    'co.title': 'Express checkout',
    'co.s1': '1. Contact &amp; shipping address',
    'co.email': 'Email address<span aria-hidden="true">*</span>',
    'co.firstname': 'First name<span aria-hidden="true">*</span>',
    'co.lastname': 'Last name<span aria-hidden="true">*</span>',
    'co.street': 'Street and house number<span aria-hidden="true">*</span>',
    'co.zip': 'Postcode<span aria-hidden="true">*</span>',
    'co.city': 'City<span aria-hidden="true">*</span>',
    'co.ph.email': 'name@example.com',
    'co.ph.firstname': 'John',
    'co.ph.lastname': 'Doe',
    'co.ph.street': '12 Coffee Street',
    'co.ph.expiry': 'MM/YY',
    'co.s2': '2. Payment method',
    'co.payAria': 'Choose payment method',
    'pay.card': 'Credit card',
    'pay.paypal': 'PayPal',
    'pay.sofort': 'Instant bank transfer',
    'co.cardNumber': 'Card number',
    'co.expiry': 'Expiry date',
    'co.cvc': 'CVC',
    'co.submit': 'Place order with obligation to pay',
    'co.security': '🔒 Your connection is SSL-encrypted. We do not store any payment data.',
    'co.summaryAria': 'Order summary',
    'co.s3': '3. Order summary',
    'co.processing': 'Processing payment …',
    'err.required': 'Please fill in all required fields.',
    'err.email': 'Please enter a valid email address.',
    'err.card': 'Invalid card number.',

    'conf.aria': 'Order confirmation',
    'conf.status': 'Order successful',
    'conf.title': 'Thank you for your order at ROAST – CAFÉ!',
    'conf.label': 'Your order number is:',
    'conf.text': 'We are preparing your coffees fresh for shipping. You will shortly receive an email with your tracking number.',
    'conf.back': 'Back to the shop',
  },
};

/* Produkttexte auf Englisch (Deutsch steht direkt in `products`) */
const PRODUCT_I18N = {
  en: {
    p1: {
      origin: 'Colombia (Huila)',
      process: 'Washed',
      flavor: 'Dark chocolate, roasted almond, brown sugar',
      description: 'A bold, velvety espresso with pronounced sweetness and very low acidity. Perfect for the portafilter, the moka pot or as a strong base for flat whites and cappuccinos.',
    },
    p2: {
      origin: 'Ethiopia (Yirgacheffe)',
      process: 'Natural',
      flavor: 'Jasmine blossom, ripe peach, redcurrant',
      description: 'This light filter coffee shines with floral notes and a lively, tea-like texture. Best brewed in a Hario V60, a Chemex or an AeroPress.',
    },
    p3: {
      origin: 'Peru (Cajamarca)',
      process: 'Swiss Water Process (CO2-free decaffeination)',
      flavor: 'Caramel sweetness, ripe apple, hazelnut',
      description: 'Full flavour without the caffeine. Thanks to the gentle Swiss Water process, Decaf Velvet keeps its rich aroma of soft caramel and nutty notes. A treat at any time of day.',
    },
    p4: {
      origin: 'Panama (Boquete)',
      process: 'Anaerobic fermentation',
      flavor: 'Bergamot, jasmine, blueberry compote',
      description: 'A true rarity. The famous Geisha variety, anaerobically fermented for an incomparably complex and fruity experience. Limited to just a few kilograms per roast.',
    },
  },
};

/* ─── SPRACHZUSTAND ─────────────────────────────────────────── */
const SUPPORTED_LANGS = ['de', 'en'];
const LANG_STORAGE_KEY = 'roast-cafe-lang';

function detectLanguage() {
  try {
    const saved = localStorage.getItem(LANG_STORAGE_KEY);
    if (SUPPORTED_LANGS.includes(saved)) return saved;
  } catch (e) {
    /* localStorage nicht verfügbar */
  }
  const browser = (navigator.language || 'de').slice(0, 2).toLowerCase();
  return browser === 'de' ? 'de' : 'en';
}

let currentLang = detectLanguage();

/* Übersetzt einen Schlüssel; {platzhalter} werden ersetzt */
function t(key, vars) {
  let text = I18N[currentLang]?.[key] ?? I18N.de[key] ?? key;
  if (vars) text = text.replace(/\{(\w+)\}/g, (_, k) => (k in vars ? vars[k] : ''));
  return text;
}

/* Liefert ein Produktfeld in der aktuellen Sprache */
function pt(product, field) {
  return PRODUCT_I18N[currentLang]?.[product.id]?.[field] ?? product[field];
}

const getLocale = () => (currentLang === 'en' ? 'en-GB' : 'de-DE');

/* ─── STATISCHE TEXTE ANWENDEN ──────────────────────────────── */
function applyTranslations(root = document) {
  if (root === document) {
    document.documentElement.lang = currentLang;
    document.title = t('meta.title');
    document.querySelector('meta[name="description"]')?.setAttribute('content', t('meta.description'));
  }

  root.querySelectorAll('[data-i18n]').forEach((el) => {
    const text = t(el.dataset.i18n);
    if (text.includes('<') || text.includes('&')) el.innerHTML = text;
    else el.textContent = text;

    /* Wort-Reveal-Überschriften neu aufteilen und Animation erneut abspielen */
    if (el.hasAttribute('data-split') && typeof splitWords === 'function') {
      splitWords(el);
      if (el.classList.contains('is-revealed')) {
        el.classList.remove('is-revealed');
        el.getBoundingClientRect();
        el.classList.add('is-revealed');
      }
    }
  });

  root.querySelectorAll('[data-i18n-attr]').forEach((el) => {
    el.dataset.i18nAttr.split(';').forEach((pair) => {
      const [attr, key] = pair.split(':').map((s) => s.trim());
      if (attr && key) el.setAttribute(attr, t(key));
    });
  });

  document.querySelectorAll('.lang-btn').forEach((btn) => {
    btn.setAttribute('aria-pressed', String(btn.dataset.lang === currentLang));
  });
}

/* Sprache wechseln: statische Texte + Event für dynamische Bereiche */
function setLanguage(lang) {
  if (!SUPPORTED_LANGS.includes(lang) || lang === currentLang) return;
  currentLang = lang;
  try {
    localStorage.setItem(LANG_STORAGE_KEY, lang);
  } catch (e) {
    /* stiller Fallback */
  }
  applyTranslations();
  document.dispatchEvent(new CustomEvent('lang:change', { detail: { lang } }));
}

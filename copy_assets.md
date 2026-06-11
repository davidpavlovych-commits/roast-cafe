# Kopier-Ressourcen (German Copy Assets) – Roast - Café

Dieses Dokument enthält alle Texte für die Website in deutscher Sprache. Claude Code sollte diese Texte direkt kopieren und in das HTML-Grundgerüst bzw. in die JavaScript-Produktdatenbank einpflegen.

---

## 1. Marken- & Sektionstexte (Brand Copy)

### Header & Navigation
- **Logo-Text:** `ROAST – CAFÉ`
- **Nav-Link 1:** `Kollektion`
- **Nav-Link 2:** `Unsere Story`
- **Nav-Link 3:** `Zubereitung`
- **Warenkorb-Label:** `Warenkorb`
- **Warenkorb-Badge:** `[ 0 ]` (dynamisch)

### Hero-Sektion
- **Kategorie-Label:** `ORIGIN & CRAFT`
- **Hauptüberschrift (Headline):** `KAFFEE NEU DEFINIERT.`
- **Unterüberschrift (Subheadline):** `Schonend geröstete Spezialitätenkaffees aus nachhaltigem Anbau. Direkt gehandelt, handwerklich veredelt in unserer Rösterei in Düsseldorf. Erlebe Kaffeekultur in ihrer reinsten Form.`
- **Call-to-Action (CTA) Button:** `Kollektion entdecken`
- **Dekoratives Monospace-Element:** `LAT: 51.2277° N | LON: 6.7735° E | ROAST-LEVEL: OPTIMAL`

### Sektion "Unsere Story" (About Us)
- **Überschrift:** `VOM BECHER ZUR BOHNE.`
- **Textabsatz 1:** `Bei ROAST glauben wir, dass Kaffee kein schnelles Konsumgut ist, sondern ein Ritual. Jede Bohne erzählt die Geschichte des Bodens, auf dem sie gewachsen ist, und des Farmers, der sie gepflegt hat. Wir importieren unsere Rohkaffees ohne Zwischenhändler und zahlen Preise weit über dem Fairtrade-Niveau.`
- **Textabsatz 2:** `In Düsseldorf rösten wir in kleinen Chargen auf einem restaurierten Probat-Trommelröster. Durch ein besonders schonendes, temperaturgeführtes Röstverfahren entfalten wir die feinen Fruchtsäuren und süßen Aromen, ohne dass Bitterstoffe dominieren.`

---

## 2. Produktdatenbank (Product Database)

Claude Code soll diese Daten in einem JavaScript-Array konfigurieren, um den Katalog dynamisch zu rendern.

### Produkt 1: Aero-Roast Espresso (Espresso)
- **ID:** `p1`
- **Name:** `Aero-Roast Espresso`
- **Kategorie:** `espresso`
- **Herkunft:** `Kolumbien (Huila)`
- **Aufbereitung:** `Gewaschen (Washed)`
- **Röstgrad:** `4 / 5 (Medium-Dark)`
- **Geschmacksprofil:** `Dunkle Schokolade, gebrannte Mandel, brauner Zucker`
- **Preis:** `14.90` (für 250g)
- **Beschreibung:** `Ein kräftiger, samtiger Espresso mit einer ausgeprägten Süße und sehr geringer Säure. Perfekt für den Siebträger, die Espressokanne oder als kräftige Basis für Flat White und Cappuccino.`
- **Verpackungs-Bild:** `assets/product_espresso.jpg`

### Produkt 2: V60 Light Roast (Filterkaffee)
- **ID:** `p2`
- **Name:** `V60 Light Roast`
- **Kategorie:** `filterkaffee`
- **Herkunft:** `Äthiopien (Yirgacheffe)`
- **Aufbereitung:** `Trocken (Natural)`
- **Röstgrad:** `2 / 5 (Light)`
- **Geschmacksprofil:** `Jasminblüte, reifer Pfirsich, rote Johannisbeere`
- **Preis:** `16.80` (für 250g)
- **Beschreibung:** `Dieser helle Filterkaffee besticht durch seine floralen Noten und eine spritzige, tee-ähnliche Textur. Ideal zubereitet im Hario V60 Filter, der Chemex oder der AeroPress.`
- **Verpackungs-Bild:** `assets/product_filter.jpg`

### Produkt 3: Decaf Velvet (Entkoffeiniert)
- **ID:** `p3`
- **Name:** `Decaf Velvet`
- **Kategorie:** `decaf`
- **Herkunft:** `Peru (Cajamarca)`
- **Aufbereitung:** `Swiss Water Process (CO2-frei entkoffeiniert)`
- **Röstgrad:** `3 / 5 (Medium)`
- **Geschmacksprofil:** `Karamellsüße, reifer Apfel, Haselnuss`
- **Preis:** `15.20` (für 250g)
- **Beschreibung:** `Voller Geschmack, ganz ohne Koffein. Der Decaf Velvet behält durch das schonende Swiss-Water-Verfahren sein reiches Aroma von weichem Karamell und nussigen Nuancen. Ein Genuss zu jeder Tageszeit.`
- **Verpackungs-Bild:** `assets/product_decaf.jpg`

### Produkt 4: Geisha Limited (Limited Edition)
- **ID:** `p4`
- **Name:** `Geisha Limited`
- **Kategorie:** `decaf` (bzw. Limited Tag)
- **Herkunft:** `Panama (Boquete)`
- **Aufbereitung:** `Anaerobe Fermentation (Anaerobic)`
- **Röstgrad:** `1 / 5 (Ultra Light)`
- **Geschmacksprofil:** `Bergamotte, Jasmin, Blaubeer-Kompott`
- **Preis:** `28.50` (Achtung: Sondergröße 150g)
- **Beschreibung:** `Eine absolute Rarität. Die berühmte Geisha-Varietät, anaerob fermentiert für ein unvergleichlich komplexes und fruchtiges Geschmackserlebnis. Limitiert auf wenige Kilogramm pro Röstung.`
- **Verpackungs-Bild:** `assets/product_limited.jpg`

---

## 3. Interaktive Elemente & Status-Texte

### Produkt-Detail-Modal
- **Auswahl Packungsgröße:** `Packungsgröße wählen:`
- **Option 250g:** `250g (Standard)`
- **Option 500g:** `500g (+ 95% Preis)`
- **Option 1000g:** `1000g (+ 180% Preis)`
- **Mahlgrad-Label:** `Mahlgrad wählen:`
- **Mahlgrad 1:** `Ganze Bohne`
- **Mahlgrad 2:** `Gemahlen (Filter)`
- **Mahlgrad 3:** `Gemahlen (Espresso Siebträger)`
- **Button:** `In den Warenkorb legen`
- **Erfolgsmeldung:** `✓ Erfolgreich hinzugefügt!`

### Sliding-Warenkorb (Cart Drawer)
- **Überschrift:** `DEIN EINKAUFSWAGEN`
- **Leerzustand:** `Dein Warenkorb ist aktuell leer. Füge Kaffees aus unserer Kollektion hinzu.`
- **Menge:** `Menge: `
- **Versandkosten-Info (Freigrenze ab 45€):**
    *   `Kostenloser Versand ab 45,00 €!`
    *   `Noch {rest} € bis zum kostenlosen Versand.`
    *   `Deine Bestellung wird kostenlos versendet!`
- **Zwischensumme:** `Zwischensumme:`
- **Versandkosten:** `Versand:`
- **Versandkostenfrei-Text:** `Kostenlos`
- **Versandkosten-Standard:** `4,90 €`
- **Gesamtsumme:** `Gesamtsumme:`
- **Button zur Kasse:** `Zur Kasse gehen`

### Schnell-Checkout (Schnell-Kasse)
- **Überschrift:** `SCHNELL-CHECKOUT`
- **Sektions-Titel 1:** `1. Kontakt & Versandadresse`
- **Sektions-Titel 2:** `2. Zahlungsart`
- **Sektions-Titel 3:** `3. Bestellübersicht`
- **Eingabefelder:**
    *   `Email-Adresse` (Placeholder: `name@beispiel.de`)
    *   `Vorname` (Placeholder: `Max`)
    *   `Nachname` (Placeholder: `Mustermann`)
    *   `Straße und Hausnummer` (Placeholder: `Kaffeestraße 12`)
    *   `Postleitzahl` (Placeholder: `40210`)
    *   `Stadt` (Placeholder: `Düsseldorf`)
- **Zahlungsarten:**
    *   `Kreditkarte`
    *   `PayPal`
    *   `Sofortüberweisung`
- **Kreditkarten-Felder (erscheint bei Auswahl):**
    *   `Kartennummer` (Placeholder: `4111 2222 3333 4444`)
    *   `Gültig bis` (Placeholder: `MM/JJ`)
    *   `CVC` (Placeholder: `123`)
- **Validierungsfehler:**
    *   `Bitte fülle alle Pflichtfelder aus.`
    *   `Bitte gib eine gültige E-Mail-Adresse ein.`
    *   `Kartennummer ungültig.`
- **Button:** `Jetzt zahlungspflichtig bestellen ({total} €)`
- **Sicherheitshinweis:** `Deine Verbindung ist SSL-verschlüsselt. Wir speichern keine Zahlungsdaten.`

### Bestellbestätigung (Success Modal)
- **Status:** `BESTELLUNG ERFOLGREICH`
- **Dankeschön:** `Vielen Dank für deine Bestellung bei ROAST – CAFÉ!`
- **Bestellnummer-Label:** `Deine Bestellnummer lautet:`
- **Zusatztext:** `Wir bereiten deine Kaffees frisch für den Versand vor. Du erhältst in Kürze eine E-Mail mit deiner Sendungsverfolgungsnummer.`
- **Schließen-Button:** `Zurück zum Shop`

---

## 4. Footer & Rechtliches
- **Newsletter-Titel:** `FRISCHE RÖSTUNGEN IN DEINEM POSTFACH`
- **Newsletter-Sub:** `Melde dich an, um exklusive Angebote und Benachrichtigungen über limitierte Chargen zu erhalten.`
- **Newsletter-Placeholder:** `Deine E-Mail-Adresse`
- **Newsletter-Button:** `Abonnieren`
- **Newsletter-Success:** `✓ Danke für deine Anmeldung!`
- **Rechtliches:**
    *   `© 2026 ROAST - CAFÉ. Alle Rechte vorbehalten.`
    *   `Impressum`
    *   `Datenschutz`
    *   `AGB & Widerruf`

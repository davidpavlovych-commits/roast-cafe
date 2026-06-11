# Technische Spezifikation (ТЗ) – Roast - Café

Dieses Dokument enthält die vollständigen Anforderungen für die Entwicklung der E-Commerce-Website **Roast - Café**. Die Website ist als moderner, performanter und optisch ansprechender Single-Page-Onlineshop für eine Premium-Kaffeerösterei konzipiert.

---

## 1. Übersicht & Brand-Konzept
*   **Name:** Roast - Café
*   **Zielgruppe:** Liebhaber von Spezialitätenkaffee (Specialty Coffee), die Wert auf Ästhetik, Qualität und Herkunft legen.
*   **Design-Stil:** 
    *   Premium Dark Mode mit einem feinen, geometrischen Raster-Hintergrund (Grid-Design).
    *   Minimalistisches Layout mit viel Weißraum (bzw. Dunkelraum), präziser Typografie und subtilen Neon-/Glow-Akzenten.
    *   Glassmorphismus-Effekte (Backdrop-Filter) für Overlays, Modals und den Warenkorb.
    *   Fließende Übergänge (Transitions) und Micro-Animations, die die Interaktivität lebendig gestalten.
*   **Sprache:** Deutsch (Premium, informativ und einladend).

---

## 2. Technischer Stack
Um maximale Ladegeschwindigkeit, SEO-Freundlichkeit und eine einfache Implementierung zu gewährleisten, wird die Website als native Webanwendung entwickelt:
1.  **Struktur:** HTML5 (semantisch, barrierefrei).
2.  **Design & Layout:** Vanilla CSS3 (Custom Properties für das Design-System, CSS Grid/Flexbox, responsive Layouts).
3.  **Logik:** Modernes Vanilla JavaScript (ES6+, modularer Aufbau, lokales State-Management, LocalStorage zur Persistierung des Warenkorbs).
4.  **Ressourcen:** Lokale Bilder im `assets/`-Ordner (generiert), Google Fonts für die Typografie.

---

## 3. Design-System & Design-Tokens (CSS Custom Properties)

Für ein konsistentes Design muss Claude Code folgende Farb- und Layoutwerte verwenden:

```css
:root {
  /* Farben */
  --bg-primary: #0A0A0C;       /* Tiefes, sattes Schwarz-Anthrazit */
  --bg-secondary: #121216;     /* Etwas helleres Anthrazit für Karten/Komponenten */
  --accent-color: #FF5A00;     /* Edles, intensives Kaffeeröst-Orange (Leuchten) */
  --accent-glow: rgba(255, 90, 0, 0.15);
  --border-color: #24242B;     /* Subtile Rahmenlinien */
  --border-glow: rgba(255, 255, 255, 0.05);
  
  /* Text */
  --text-primary: #FFFFFF;     /* Reinweiß für Titel */
  --text-secondary: #90909A;   /* Muted Grey für Fließtext und Details */
  --text-muted: #55555F;       /* Dunkles Grau für Fußnoten/Metadaten */
  
  /* Schriftarten */
  --font-headings: 'Space Grotesk', sans-serif;
  --font-body: 'Inter', sans-serif;
  --font-mono: 'Space Mono', monospace; /* Für technische Details/Preise */
  
  /* Effekte */
  --backdrop-blur: blur(12px);
  --glass-bg: rgba(18, 18, 22, 0.7);
  --transition-smooth: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  --grid-line-color: rgba(255, 255, 255, 0.02);
}
```

---

## 4. Funktionale Anforderungen (Features)

### 4.1 Header (Navigation)
*   **Logo:** Minimalistischer Schriftzug "ROAST – CAFÉ" auf der linken Seite.
*   **Menü:** Links zu `Kollektion`, `Über Uns`, `Kontakt` (weiche Scroll-Effekte zu den Sektionen).
*   **Warenkorb-Button:** Auf der rechten Seite mit einem animierten Badge, das die Anzahl der Artikel anzeigt (z. B. `[ 2 ]`).
*   **Interaktives Verhalten:** Der Header wird beim Herunterscrollen teiltransparent (Glassmorphismus) und fixiert sich oben (`position: sticky`).

### 4.2 Hero-Sektion
*   **Hintergrund:** Ein großflächiges, stimmungsvolles Bild einer Kaffeeröstung oder edlen Verpackung mit einem drübergelegten Raster (Grid-Overlay).
*   **Inhalt:**
    *   Große, fette Headline in `Space Grotesk` (z. B. "KAFFEE NEU DEFINIERT.").
    *   Kurzer, emotionaler Subtext über die Qualität und Röstung.
    *   Ein primärer Call-to-Action (CTA) Button "Jetzt Entdecken", der den Nutzer sanft zum Shop-Bereich scrollt.
*   **Zusatzelement:** Dezente Anzeige von Längengraden/Röstzeit als Monospace-Element am Rand (Ästhetik-Gimmick).

### 4.3 Produktkatalog & Filterung
*   **Kategorie-Filter (Tabs):**
    *   `Alle Kaffees`
    *   `Espresso` (Kräftige Röstungen)
    *   `Filterkaffee` (Fruchtige, helle Röstungen)
    *   `Decaf / Limited` (Spezialitäten & Entkoffeiniert)
*   **Sortierung:** Dropdown-Menü für "Sortieren nach" (Preis aufsteigend, Preis absteigend, Beliebtheit).
*   **Produkt-Karten (Grid):**
    *   Hochwertiges Produktbild (Mattschwarze Verpackung).
    *   Herkunftsland und Röstgrad (visuell durch 1-5 Bohnen/Punkte dargestellt).
    *   Titel des Kaffees und Geschmacksprofil (z. B. "Schokolade, Beeren, Karamell").
    *   Preis (z. B. "€14,90 / 250g").
    *   Hover-Effekt: Bild zoomt leicht heran, ein dezenter Rahmen leuchtet in `--accent-color` auf, und ein "Schnellansicht"-Button erscheint.

### 4.4 Produkt-Detail-Modal (Pop-up)
*   Öffnet sich beim Klick auf eine Produktkarte mit einer flüssigen Fade-In-Animation.
*   **Inhalt:**
    *   Großes Produktbild auf der linken Seite.
    *   Rechts: Name, Preis, detaillierte Beschreibung (Herkunft, Aufbereitungsmethode, Röstdatum).
    *   Möglichkeit zur Auswahl der Packungsgröße (z. B. 250g, 500g, 1000g) mit automatischer Preisanpassung.
    *   Mahlgrad-Auswahl (Ganze Bohne, Espresso, Filter).
    *   Mengenregler (+ / - Tasten).
    *   Aktionsbutton: "In den Warenkorb" (löst eine dezente Erfolgs-Micro-Animation aus).

### 4.5 Sliding-Warenkorb (Cart Drawer)
*   Ein seitlich hereingleitendes Panel (`right: -400px` standardmäßig, rutscht auf `right: 0` bei Aktivierung).
*   **Inhalt:**
    *   Liste der hinzugefügten Produkte mit Bild, Name, ausgewählter Option (z.B. Mahlgrad), Menge und Zwischensumme.
    *   Möglichkeit, Mengen direkt im Warenkorb zu ändern oder Artikel zu löschen.
    *   Berechnung der Gesamtsumme und Anzeige der kostenlosen Versandgrenze (z. B. "Noch €15,00 bis zum kostenlosen Versand").
    *   Prominenter Button "Zur Kasse".
*   **Persistence:** Speicherung der Warenkorb-Daten im `localStorage`, damit der Korb beim Neuladen der Seite erhalten bleibt.

### 4.6 Schnell-Checkout Modal (Kasse)
*   Ein elegantes, ablenkungsfreies Overlay.
*   **Schritt-für-Schritt-Aufbau (oder ein übersichtliches 2-Spalten-Layout):**
    *   *Spalte 1:* Kontaktdaten (E-Mail, Name, Lieferadresse) und Zahlungsmethode (Kreditkarte, PayPal, Sofortüberweisung).
    *   *Spalte 2:* Bestellübersicht (Produkte, Versandkosten, Gesamtsumme).
*   **Formular-Validierung:** Sofortige visuelle Rückmeldung bei fehlenden oder fehlerhaften Eingaben (rote Rahmen, sanfte Fehlermeldungen).
*   **Bestell-Abschluss:** Button "Zahlungspflichtig bestellen". Nach Klick erscheint eine Lade-Animation (Simulierter Zahlungsvorgang) gefolgt von der Bestätigungs-Sektion.

### 4.7 Bestellbestätigung (Success View)
*   Ersetzt das Checkout-Formular im Modal oder öffnet sich als neues Overlay.
*   **Inhalt:**
    *   Grünes/Orangefarbenes Erfolgs-Icon oder eine elegante minimalistische "Order Complete" Grafik.
    *   Dankestext: "Vielen Dank für deine Bestellung!".
    *   Generierte Bestellnummer (z. B. `#RC-84920`).
    *   Hinweis: "Eine Bestätigungs-E-Mail ist auf dem Weg zu dir."

### 4.8 Footer
*   Minimalistische Links zu Impressum, Datenschutz und AGB (als modale Overlays oder einfache Info-Sektionen gelöst, um die Single-Page-Struktur nicht zu brechen).
*   Social-Media-Icons (Instagram, Pinterest, Vimeo).
*   Newsletter-Anmeldung (E-Mail-Eingabefeld mit schicker Micro-Interaktion).

---

## 5. Nicht-funktionale Anforderungen

### 5.1 Design & Responsive Layout
*   **Mobile-First:** Das Layout muss auf Smartphones (ab 375px Breite) perfekt aussehen (einspaltiger Shop, vereinfachtes Menü).
*   **Desktop:** Großzügiges Grid-Layout auf Bildschirmen bis zu 1920px. Max-Width Container bei 1440px zentriert.
*   **Touch-Optimierung:** Große Klickflächen für mobile Geräte (mindestens 44x44px).

### 5.2 Performance & SEO
*   **Ladezeiten:** Minimale Nutzung von externen Bibliotheken. CSS und JS müssen kompakt geschrieben sein.
*   **SEO-Tags:**
    *   Einzigartiges `<title>`: "Roast - Café | Premium Specialty Coffee Online-Shop"
    *   Aussagekräftige `<meta name="description">` in deutscher Sprache.
    *   Strukturierte Überschriftenhierarchie (nur eine `<h1>` auf der Seite).
    *   `alt`-Attribute für alle Bilder.
*   **Interaktive Elemente:** Jedes Eingabe- und Interaktionselement benötigt eine eindeutige `id` oder Klasse für Testbarkeit und Barrierefreiheit.

---

## 6. Animations- und Interaktionsrichtlinien
Claude Code soll folgende Animationen via CSS implementieren:
1.  **Grid Background Fade-in:** Der Rasterhintergrund blendet sich beim Laden der Seite über 1.5 Sekunden sanft ein.
2.  **Card Hover:** Produktkarten heben sich um 4px an, die Schattenstärke nimmt leicht zu, und die Akzentlinie unten leuchtet auf.
3.  **Drawer Slide:** Der Warenkorb gleitet mit `transform: translateX(100%)` zu `translateX(0)` mit einem sauberen `cubic-bezier` Effekt herein.
4.  **Button Press:** Buttons schrumpfen beim aktiven Klick kurz auf `scale(0.97)`.

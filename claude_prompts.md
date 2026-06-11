# Claude Code Prompts – Roast - Café

Dieses Dokument enthält eine Reihe aufeinanderfolgender Prompts für **Claude Code**. Du kannst diese Prompts nacheinander kopieren und in Claude Code eingeben, um das Projekt vollautomatisch und fehlerfrei Schritt für Schritt erstellen zu lassen.

Bevor du beginnst, stelle sicher, dass Claude Code Zugriff auf die Dateien `requirements.md` und `copy_assets.md` im Projektordner hat.

---

### Prompt 1: Projekt-Setup & HTML-Struktur
```text
Erstelle das HTML-Grundgerüst für das Webprojekt "Roast - Café".
Erstelle dafür die Datei `index.html` und verknüpfe sie mit einer leeren `styles.css` und `app.js`.

Die HTML-Struktur muss den Vorgaben aus Kapitel 4 und 5 der Datei `requirements.md` entsprechen. Verwende ausschließlich deutschen Text aus `copy_assets.md` (kein Lorem Ipsum).

Das HTML muss folgende Abschnitte enthalten:
1. Einen stickigen `<header>` mit dem Logo "ROAST – CAFÉ", Navigationslinks ("Kollektion", "Unsere Story", "Zubereitung") und einem Warenkorb-Button samt Mengen-Badge [ 0 ].
2. Eine `<main>` Sektion bestehend aus:
   - Einer Hero-Sektion (#hero) mit Branding-Details, Slogan und einem CTA-Button.
   - Einer Kollektion-Sektion (#kollektion) mit Filter-Tabs ("Alle Kaffees", "Espresso", "Filterkaffee", "Decaf / Limited"), einem Sortier-Dropdown und einem leeren Produkt-Grid-Container.
   - Einer Story-Sektion (#story) mit dem Vorstellungstext.
3. Einen `<footer>` mit Newsletter-Eingabefeld und rechtlichen Links (Impressum, Datenschutz, AGB).
4. Versteckte Overlays für:
   - Den Warenkorb-Drawer (#cart-drawer) auf der rechten Seite.
   - Das Produkt-Detail-Modal (#product-modal).
   - Das Checkout-Modal (#checkout-modal) inklusive Bestellbestätigungs-Sektion.

Achte auf semantisches HTML5 und füge eindeutige IDs für alle interaktiven Elemente hinzu.
```

---

### Prompt 2: Design-System & CSS-Stylesheets
```text
Lies die Datei `requirements.md` und implementiere das vollständige Design-System in der Datei `styles.css`.

Folgende Anforderungen müssen umgesetzt werden:
1. Definiere alle CSS-Variablen (:root) wie Farbwerte (Dunkelmodus), Schriftarten (Space Grotesk, Inter, Space Mono) und Glassmorphismus-Effekte aus Kapitel 3.
2. Erstelle einen modernen Raster-Hintergrund (Grid Background) für den Body mittels feiner, kaum sichtbarer CSS-Rasterlinien.
3. Richte ein responsives Layout ein (Mobile-First, max-width für Desktop 1200px).
4. Style den Header als sticky Element mit einem Weichzeichnungs-Hintergrund (Backdrop-Filter blur).
5. Style das Produkt-Grid und die Platzhalter-Strukturen für die Sektionen.
6. Style die Modals (Produkt-Detail, Checkout) und den Warenkorb-Drawer so, dass sie standardmäßig ausgeblendet sind (mittels Klassen wie `.hidden` oder `transform: translateX(100%)`) und bei Aktivierung flüssig eingeblendet bzw. eingefahren werden.
7. Implementiere geschmeidige Übergänge (Transitions) für Hover-Effekte auf Buttons und Links.
```

---

### Prompt 3: JS-Katalog & Filter/Sortierung
```text
Erstelle die Datei `app.js` und implementiere die Produktdatenbank und die Katalog-Rendierung.

Details:
1. Definiere ein Array `products` in JavaScript mit den 4 Produkten aus Kapitel 2 der Datei `copy_assets.md`. Jedes Produkt benötigt eine ID, Name, Kategorie, Herkunft, Aufbereitung, Röstgrad (als Zahl 1-5), Geschmacksprofil, Preis (Zahl) und den Bildpfad.
2. Schreibe eine Funktion `renderProducts(productsList)`, die das Produkt-Grid in HTML dynamisch generiert. Jede Karte soll die Kaffeedaten, das Bild, das Geschmacksprofil und die visuelle Darstellung des Röstgrads (z. B. Punkte) anzeigen.
3. Implementiere die Filter-Tabs. Bei Klick auf einen Tab (z.B. "Filterkaffee") sollen nur die entsprechenden Produkte gerendert werden. Setze eine Klasse `.active` auf den ausgewählten Tab.
4. Implementiere das Sortier-Dropdown. Der Nutzer soll nach Preis (aufsteigend / absteigend) sortieren können. Die Sortierung soll mit der aktuellen Filterung kombiniert werden.
```

---

### Prompt 4: Produkt-Detail-Modal
```text
Implementiere das Produkt-Detail-Modal in `app.js` und passe das CSS in `styles.css` an.

Anforderungen:
1. Wenn der Nutzer auf eine Produktkarte oder deren "Schnellansicht"-Button klickt, muss sich das `#product-modal` mit einer Fade-In-Animation öffnen.
2. Das Modal muss mit den spezifischen Daten des ausgewählten Kaffees befüllt werden (vollständige Beschreibung, Herkunft, Aufbereitung).
3. Baue die Auswahl für die Packungsgröße (250g, 500g, 1000g) ein. Bei Auswahl von 500g steigt der Preis um 95% (Faktor 1.95), bei 1000g um 180% (Faktor 2.80). Der angezeigte Preis im Modal muss sich sofort anpassen.
4. Baue die Mahlgrad-Auswahl ("Ganze Bohne", "Filter", "Espresso") ein.
5. Implementiere einen Mengenregler (Plus/Minus Tasten), der nicht unter 1 sinken kann.
6. Ermögliche das Schließen des Modals durch das "X"-Icon, Klick auf den abgedunkelten Hintergrund oder die Escape-Taste.
```

---

### Prompt 5: Warenkorb-Drawer & State-Management
```text
Implementiere die komplette Warenkorb-Logik in `app.js` und das dazugehörige Styling in `styles.css`.

Anforderungen:
1. Erstelle einen globalen State `cart` (Array) für die hinzugefügten Artikel. Jedes Element im Warenkorb speichert ID, Name, gewählte Optionen (Größe, Mahlgrad), Menge, berechneten Einzelpreis, Gesamtpreis und das Bild.
2. Verknüpfe den "In den Warenkorb"-Button im Produkt-Modal mit diesem State. Zeige nach dem Klicken eine kurze Erfolgsmeldung im Modal an und schließe es nach 1 Sekunde.
3. Aktualisiere das Warenkorb-Badge im Header mit der Gesamtanzahl der Artikel im Korb.
4. Programmiere den Warenkorb-Drawer so, dass er von rechts hereingleitet, wenn der Nutzer auf das Warenkorb-Icon im Header klickt.
5. Rendere die Warenkorb-Artikel im Drawer mit Mengenregler (+/-) und Löschen-Button.
6. Berechne die Zwischensumme, die Versandkosten (4,90 €; versandkostenfrei ab 45,00 €) und die Gesamtsumme. Zeige eine dynamische Info-Leiste an, wie viel Euro noch bis zum kostenlosen Versand fehlen.
7. Speichere den Warenkorb-State im `localStorage`, sodass er beim Neuladen der Seite erhalten bleibt. Lade ihn beim Seitenstart.
```

---

### Prompt 6: Schnell-Checkout-Formular
```text
Implementiere das Schnell-Checkout-Modal in `styles.css` und `app.js`.

Anforderungen:
1. Der Klick auf den "Zur Kasse gehen"-Button im Warenkorb-Drawer schließt den Drawer und öffnet das Checkout-Modal (#checkout-modal) mit einer flüssigen Animation.
2. Gestalte das Checkout-Layout zweispaltig auf Desktop: Links die Eingabemasken (Kontaktdaten, Lieferadresse, Zahlungsmittel), rechts eine übersichtliche Bestellzusammenfassung (Produkte, Versandkosten, Gesamtsumme).
3. Binde die Zahlungsmethoden ein: Kreditkarte, PayPal, Sofortüberweisung. Wenn "Kreditkarte" ausgewählt ist, blende per JS/CSS die Eingabefelder für Kartennummer, Gültigkeitsdatum und CVC ein. Bei anderen Zahlungsarten blende sie aus.
4. Implementiere eine clientseitige Formularvalidierung. Beim Klick auf den Absende-Button müssen alle Pflichtfelder auf korrekten Inhalt geprüft werden (z. B. gültiges E-Mail-Format, ausgefüllte Adressdaten, Kreditkartendetails falls ausgewählt). Zeige Fehlermeldungen und hebe fehlerhafte Felder rot hervor.
```

---

### Prompt 7: Zahlungssimulation & Bestellbestätigung
```text
Implementiere den Zahlungsprozess und die Bestellbestätigung in `app.js` und das Styling in `styles.css`.

Anforderungen:
1. Wenn der Checkout-Button "Jetzt zahlungspflichtig bestellen" geklickt wird und das Formular valide ist, deaktiviere den Button und zeige eine Lade-Animation (z. B. einen Spinner und den Text "Zahlung wird verarbeitet...") an.
2. Simuliere eine Verzögerung von 2 Sekunden (mittels `setTimeout`).
3. Blende nach Ablauf der Zeit das Checkout-Formular aus und zeige stattdessen ein schickes Erfolgs-Layout an ("BESTELLUNG ERFOLGREICH").
4. Generiere eine zufällige Bestellnummer (z. B. `RC-73921`) und zeige sie an. Verwende die deutschen Texte aus `copy_assets.md`.
5. Leere nach erfolgreichem Kauf den Warenkorb-State komplett, lösche ihn aus dem `localStorage` und setze das Header-Badge zurück.
6. Biete einen Button "Zurück zum Shop", der das Checkout-Modal schließt.
```

---

### Prompt 8: Responsivität, Animationen & Finaler Schliff
```text
Führe einen finalen Review des gesamten Projekts durch und füge CSS-Verfeinerungen hinzu.

Anforderungen:
1. Stelle sicher, dass die Website voll responsiv ist (getestet für Mobilgeräte ab 375px Breite bis hin zu Desktop 1920px Breite). Passe Abstände und Schriftgrößen via Media Queries an.
2. Füge Micro-Animations hinzu: Knöpfe sollen beim aktiven Klicken minimal schrumpfen (`active { transform: scale(0.97) }`), der Warenkorb-Drawer soll mit einem weichen `cubic-bezier(0.25, 0.8, 0.25, 1)` einfahren.
3. Überprüfe die Barrierefreiheit (Kontrastverhältnisse, `:focus`-Styles für Tastaturnavigation) und die SEO-Kriterien (eindeutiger deutscher `<title>`, Meta-Beschreibung, korrekte Heading-Hierarchie mit nur einer `<h1>`).
4. Füge einen dezenten Scroll-Trigger hinzu, der den Header-Hintergrund leicht abdunkelt und verschwommen macht, sobald der Nutzer nach unten scrollt.
```

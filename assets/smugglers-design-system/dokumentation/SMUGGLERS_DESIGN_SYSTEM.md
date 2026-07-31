# SMUGGLERS DESIGN SYSTEM (SDS)

## 1. Status

**SDS-Version:** 1.0 – Pilotserie  \n**Projektversion:** 4.4.8  \n**Freigabestatus:** Vollständige technische Vereinsbibliothek und Assetregister erstellt; öffentliche Integration weiterhin offen.

Dieses Dokument definiert das verbindliche Gestaltungssystem für eigene visuelle Kennzeichen des Projekts **The Old Smugglers Club**.

## 2. Zweck

Das SDS schafft eine einheitliche, langfristig wartbare visuelle Sprache für:

- Schmugglersiegel für Vereine
- Wettbewerbssiegel
- Hall-of-Fame-Siegel
- Pokale und Medaillen
- Rang- und Erfolgsauszeichnungen

Offizielle Vereinswappen oder nachgebaute Vereinslogos sind nicht Bestandteil des Systems.

## 3. Begriff

Die eigenen Vereinskennzeichen heißen verbindlich **Schmugglersiegel**.

Sie repräsentieren einen Verein innerhalb der Website ausschließlich durch:

- Vereinsfarben
- ein neutrales Kürzel
- das einheitliche SDS-Masterdesign

## 4. Master-Schmugglersiegel v1.0

### 4.1 Grundform

- kreisförmig
- Seitenverhältnis 1:1
- transparenter Außenbereich
- keine Schild-, Banner- oder Wappenform

### 4.2 Außenring

- massiver Messingring
- acht gleichmäßig angeordnete Nieten
- dezente Alterung und Patina
- keine glänzende Chrom- oder Goldfolienoptik
- Geometrie für alle Schmugglersiegel identisch

### 4.3 Innenfläche

- vertikale Holzbohlen
- identische Holzstruktur für alle Siegel
- maximal zwei Vereinsfarben
- keine Übernahme offizieller Muster oder Logos

### 4.4 Initialen

- zentral ausgerichtet
- erhabene Messingoptik
- einheitliche Serifenschrift
- zwei bis vier Zeichen
- Kürzel müssen neutral und eindeutig sein
- keine vereinseigene Markenschrift

### 4.5 Neutrale Symbole

- oben: einheitliche Kompassrose
- unten: einheitlicher Anker
- Symbole variieren nicht zwischen Vereinen

### 4.6 Nicht zulässig

- offizielle Vereinswappen
- nachgezeichnete oder verfremdete Vereinslogos
- Vereinsmaskottchen
- Vereinsschriftzüge im Originalstil
- Banner mit Vereinsnamen
- Cliparts, Emojis oder Comicstil
- individuelle Sonderformen pro Verein

## 5. Farbregeln

- maximal zwei Hauptfarben je Verein
- Messing, Patina und Schatten bleiben serienweit identisch
- Farben werden gedämpft und an das dunkle Piratendesign angepasst
- gute Kontraste zu den Messinginitialen sind Pflicht
- bei sehr ähnlichen Vereinsfarben erfolgt die Unterscheidung zusätzlich über das Kürzel

## 6. Größenstandard

### Master

- 256 × 256 Pixel als verbindliche Entwurfsgröße

### Ableitungen

- 128 × 128 Pixel
- 96 × 96 Pixel
- 64 × 64 Pixel
- 48 × 48 Pixel
- 32 × 32 Pixel
- 24 × 24 Pixel
- 16 × 16 Pixel

Die kleineren Größen werden aus dem freigegebenen Master abgeleitet und müssen separat auf Lesbarkeit geprüft werden.

## 7. Dateistandard

### Format

- bevorzugt SVG für den editierbaren Master
- WebP oder PNG nur für geprüfte Rasterexporte
- transparenter Hintergrund

### Dateinamen

- ausschließlich Kleinbuchstaben
- Wörter mit Bindestrichen trennen
- keine Leerzeichen und keine Umlaute

Beispiele:

```text
sg-dynamo-dresden.svg
borussia-dortmund.svg
fc-bayern-muenchen.svg
```

## 8. Ordnerstruktur

```text
assets/
└── smugglers-design-system/
    ├── master/
    ├── schmugglersiegel/
    ├── wettbewerbssiegel/
    ├── pokale/
    ├── medaillen/
    ├── auszeichnungen/
    ├── texturen/
    │   ├── messing/
    │   └── holz/
    └── dokumentation/
        └── SMUGGLERS_DESIGN_SYSTEM.md
```

## 9. Einsatzbereiche

Nach gesonderter Freigabe dürfen Schmugglersiegel eingesetzt werden in:

- Aktueller Spieltag
- Wettbewerbs- und Saisonseiten
- Tabellen und Spielplänen
- Hall of Fame
- Highscore
- Adminbereich
- Saisonarchiv

Die Integration erfolgt schrittweise. Bereits freigegebene Kachelgrößen, Grid, Navigation und Grundlayout bleiben unverändert.

## 10. Entwicklungsphasen

### Phase 1 – Master

- [x] Begriff und Designprinzip festgelegt
- [x] technische Spezifikation dokumentiert
- [x] Ordnerstruktur angelegt
- [x] editierbare Masterdatei entwickeln
- [x] isolierte Darstellung in 256, 64 und 32 Pixel technisch bereitstellen
- [x] Master durch den Projektleiter für die Pilotserie freigegeben

### Phase 2 – Pilotserie

- [x] vier bewusst unterschiedliche Vereine ableiten
- [x] Farb- und Kürzelregeln technisch umsetzen
- [x] isolierte responsive Vergleichsansicht bereitstellen
- [ ] Serie freigeben oder Master korrigieren

### Phase 3 – Vereinsbibliothek

- [x] vollständige Liste aller im Tippspiel vorkommenden Vereine ermitteln
- [x] eindeutige Kürzel und Farbpaare festlegen
- [x] alle Schmugglersiegel erzeugen
- [x] Assetregister erstellen

### Phase 4 – Integration

- [ ] zuerst eine nichtkritische Testansicht integrieren
- [ ] Desktop und Mobil prüfen
- [ ] weitere Seiten einzeln freigeben
- [ ] Adminbereich zuletzt anbinden

## 11. Rückbau

Die Siegelintegration muss jederzeit vollständig rückbaubar bleiben.

Deshalb gilt:

- keine Vereinsnamen aus bestehenden Daten entfernen
- Siegel nur ergänzend anzeigen
- bei fehlendem Asset automatisch auf den Vereinsnamen zurückfallen
- keine bestehende Funktion von einem Siegel abhängig machen

## 12. Masterdateien Version 4.4.6

Erstellt wurden:

- `master/master-schmugglersiegel-v1.svg` – editierbare, vollständig vektorbasierte Masterdatei
- `master/master-vorschau.html` – isolierte Prüfung bei 256, 64 und 32 Pixel

Der SVG-Master enthält keine externen Bilder, Schriften oder Bibliotheken. Messing, Holzstruktur, Nieten, Kompassrose, Initialen und Anker sind direkt im SVG definiert.

## 13. Offener nächster Schritt

Der Projektleiter prüft den Master in der isolierten Vorschau. Vor einer Pilotserie müssen insbesondere Rahmenwirkung, Holzstruktur, Initialen, Kompassrose, Anker und Lesbarkeit bei 64 und 32 Pixel ausdrücklich freigegeben oder korrigiert werden. Eine Integration in öffentliche Seiten erfolgt weiterhin nicht.


## 14. Pilotserie Version 4.4.7

Aus dem Master wurden vier vollständig vektorbasierte Schmugglersiegel abgeleitet:

- `schmugglersiegel/pilot/sg-dynamo-dresden.svg` – DD, Gelb/Schwarz
- `schmugglersiegel/pilot/fc-bayern-muenchen.svg` – FCB, Rot/Elfenbein
- `schmugglersiegel/pilot/borussia-dortmund.svg` – BVB, Schwarz/Gelb
- `schmugglersiegel/pilot/fc-schalke-04.svg` – S04, Blau/Elfenbein

Die Datei `pilot-vorschau.html` zeigt alle vier Siegel in einer isolierten responsiven Vergleichsansicht sowie zusätzlich in 64 und 32 Pixel.

Die Pilotserie verändert ausschließlich Vereinsfarben, Initialen und die dafür notwendige Schriftgröße. Geometrie, Messing, Nieten, Holzmaserung, Kompassrose und Anker bleiben identisch.

## 15. Nächster Freigabepunkt

Vor Erstellung der vollständigen Vereinsbibliothek muss der Projektleiter die Pilotserie prüfen. Korrekturen am Master werden zuerst zentral vorgenommen und anschließend auf alle vier Pilotsiegel übertragen. Eine Integration in öffentliche Seiten erfolgt weiterhin nicht.


## 15. Vereinsbibliothek Version 4.4.8

Für alle 52 aktuell aktiven Einträge aus `teams.json` wurden eigenständige SVG-Schmugglersiegel erzeugt.

Zentrale Dateien:

- `schmugglersiegel/schmugglersiegel-register.json`
- `schmugglersiegel/bibliothek-vorschau.html`
- `schmugglersiegel/bibliothek/*.svg`

Die Vereinsnamen bleiben unverändert in `teams.json`. Das Register ergänzt ausschließlich neutrale Assetpfade, Kürzel und gedämpfte Farbpaare. Die öffentliche Website verwendet die Siegel noch nicht.

## 16. Nächster Schritt

Phase 4 beginnt mit einer nichtkritischen, isolierten Integrationsprobe. Vor einer flächendeckenden Einbindung müssen Fallback-Verhalten, Ladefehler, Desktopdarstellung und Mobilansicht geprüft werden.

## Integrationsregel ab Projektversion 4.4.9

Schmugglersiegel werden ausschließlich über die `teamId` aus `teams.json` und das zentrale `schmugglersiegel-register.json` zugeordnet.

Falls kein Registereintrag vorhanden ist oder eine SVG-Datei nicht geladen werden kann, muss die Oberfläche ein neutrales Kürzel-Fallback darstellen. Defekte Bildsymbole oder leere Flächen sind nicht zulässig.

Die erste technische Prüfung erfolgt isoliert über `assets/smugglers-design-system/integrationsprobe.html`. Öffentliche Seiten werden erst nach visueller Freigabe angepasst.

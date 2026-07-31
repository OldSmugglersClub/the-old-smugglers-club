# The Old Smugglers Club – Version 4.4.8

Öffentliche GitHub-Pages-Website der Tipprunde **The Old Smugglers Club**.

## Veröffentlichung

Der vollständige Inhalt dieses Verzeichnisses gehört direkt in das Hauptverzeichnis des GitHub-Repositories. Die Datei `index.html` darf nicht in einem zusätzlichen Unterordner liegen.

## Aktueller Stand

- öffentliche Website mit freigegebenem Desktop- und Mobildesign
- Bundesliga, DFB-Pokal, Champions League, Europa League und Sonderwettbewerbe
- Smuggleraufträge für reale Spiele der SG Dynamo Dresden
- Highscore, Hall of Fame, Piratenkodex, Bonuswettbewerb und Saisonübersicht
- zentrale Datenbausteine über JSON und `datenregister.json`
- vollständige technische Bestandsaufnahme in `ARCHITEKTUR.md`

## Version 4.4.8

Version 4.4.8 startet das **Smugglers Design System (SDS)** als dokumentiertes und versioniertes Teilmodul.

Neu sind die zentrale Assetstruktur und die verbindliche Spezifikation eigener **Schmugglersiegel**. Offizielle Vereinswappen werden nicht verwendet. In dieser Version wurden keine Bilddateien erstellt und keine öffentlichen Seiten verändert.

## Aktualisierung über die GitHub-Webseite

Für Version 4.4.8 gilt die Datei `GITHUB-UPDATE-4.4.6.md`.

## Wichtige Dateien

- `index.html` – Startseite
- `datenregister.json` – Register gemeinsam genutzter Datenquellen
- `spieldaten.json` – zentrale Spielliste
- `wettbewerbe.json` – Wettbewerbsdefinitionen
- `ARCHITEKTUR.md` – technische Bestandsaufnahme und Zielarchitektur
- `ADMIN-SYSTEMANALYSE.md` – geprüfter Aufbau des lokalen Adminbereichs v4.0.5
- `ROADMAP.md` – verbindlicher Entwicklungsplan bis Version 5.0 LTS
- `PromptManual/PROJECT_MANUAL.md` – verbindliche Projektanweisungen
- `assets/smugglers-design-system/dokumentation/SMUGGLERS_DESIGN_SYSTEM.md` – verbindliche SDS-Spezifikation
- `VERSION.txt` – aktuelle Versionsnummer
- `CHANGELOG.md` – Versionshistorie
- `RELEASE_NOTES_v4.4.6.md` – Änderungen dieses Releases
- `GITHUB-UPDATE-4.4.6.md` – konkrete Upload-Liste

## Projektregeln

- freigegebenes Grundlayout, Raster, Kachelgrößen und Navigation beibehalten
- nur innerhalb bestehender Komponenten arbeiten
- keine Bildgenerierung für HTML-, CSS-, JavaScript- oder Dateianpassungen
- keine Emojis, Cliparts, Comicgrafiken oder generischen Symbole
- Änderungen erst nach Analyse, Auswirkungsbewertung, Vorschlag und Freigabe umsetzen


## Rechtliche Seiten

Die öffentlichen Seiten verlinken im Footer auf `impressum.html` und `datenschutz.html`. Die Rechtstexte beschreiben den in Version 4.4.3 geprüften technischen Stand und müssen bei neuen externen Diensten oder Formularen erneut geprüft werden.


## SDS-Master 4.4.6

Der erste neutrale Schmugglersiegel-Master liegt als editierbares SVG unter `assets/smugglers-design-system/master/master-schmugglersiegel-v1.svg`. Die isolierte Größenprüfung erfolgt über `master-vorschau.html`. Eine öffentliche Integration ist noch nicht freigegeben.


## Smugglers Design System – Pilotserie 4.4.7

Vier vektorbasierte Pilotsiegel und eine isolierte responsive Vergleichsansicht wurden ergänzt. Öffentliche Seiten bleiben unverändert.


## Schmugglers Design System – Version 4.4.8

Die vollständige technische Schmugglersiegel-Bibliothek umfasst aktuell 52 SVG-Dateien. Sie ist noch nicht in öffentliche Seiten integriert. Zentrale Zuordnung: `assets/smugglers-design-system/schmugglersiegel/schmugglersiegel-register.json`.

## SDS-Integrationsprobe

Die nichtöffentliche Testseite `assets/smugglers-design-system/integrationsprobe.html` prüft die Zuordnung der Schmugglersiegel über Team-IDs und den technischen Fallback. Sie ist nicht in der öffentlichen Navigation verlinkt.

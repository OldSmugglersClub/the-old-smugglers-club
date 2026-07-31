# The Old Smugglers Club – Version 4.4.6

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

## Version 4.4.6

Version 4.4.6 integriert erstmals zwei farbige, eigenständige **Schmugglersiegel** in die hervorgehobene Paarung der Kachel „Aktueller Spieltag“. Die SVG-Dateien verwenden keine offiziellen Vereinswappen und bleiben über einen Kürzel-Fallback vollständig rückbaubar.

## Aktualisierung über die GitHub-Webseite

Für Version 4.4.5 gilt die Datei `GITHUB-UPDATE-4.4.6.md`.

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

### Version 4.4.7

Die zwei Pilot-Schmugglersiegel wurden auf bessere Wiedererkennbarkeit überarbeitet. Im Zentrum stehen nun die klar lesbaren Kürzel `FCN` und `SGD`; Vereinsfarben sind kräftiger, nautische Details dezenter. Das bestehende Website-Layout wurde nicht verändert.

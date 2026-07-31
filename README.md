# The Old Smugglers Club – Version 4.4.2

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

## Version 4.4.2

Version 4.4.2 ist ein reines Analyse- und Dokumentationsrelease. Die öffentliche Website und ihre Datenlogik wurden nicht verändert.

Neu ist `ADMIN-SYSTEMANALYSE.md`. Das Dokument beschreibt den tatsächlich vorliegenden lokalen Adminbereich v4.0.5, seine Module, Datenflüsse, Exportketten, Risiken und die empfohlene weitere Vorgehensweise. `ARCHITEKTUR.md` und `ROADMAP.md` wurden entsprechend ergänzt.

## Aktualisierung über die GitHub-Webseite

Für Version 4.4.2 gilt die Datei `GITHUB-UPDATE-4.4.2.md`.

## Wichtige Dateien

- `index.html` – Startseite
- `datenregister.json` – Register gemeinsam genutzter Datenquellen
- `spieldaten.json` – zentrale Spielliste
- `wettbewerbe.json` – Wettbewerbsdefinitionen
- `ARCHITEKTUR.md` – technische Bestandsaufnahme und Zielarchitektur
- `ADMIN-SYSTEMANALYSE.md` – geprüfter Aufbau des lokalen Adminbereichs v4.0.5
- `ROADMAP.md` – verbindlicher Entwicklungsplan bis Version 5.0 LTS
- `PromptManual/PROJECT_MANUAL.md` – verbindliche Projektanweisungen
- `VERSION.txt` – aktuelle Versionsnummer
- `CHANGELOG.md` – Versionshistorie
- `RELEASE_NOTES_v4.4.2.md` – Änderungen dieses Releases
- `GITHUB-UPDATE-4.4.2.md` – konkrete Upload-Liste

## Projektregeln

- freigegebenes Grundlayout, Raster, Kachelgrößen und Navigation beibehalten
- nur innerhalb bestehender Komponenten arbeiten
- keine Bildgenerierung für HTML-, CSS-, JavaScript- oder Dateianpassungen
- keine Emojis, Cliparts, Comicgrafiken oder generischen Symbole
- Änderungen erst nach Analyse, Auswirkungsbewertung, Vorschlag und Freigabe umsetzen

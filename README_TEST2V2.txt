TOSMC TEST2v2 – Ehrenlogbuch / Ehrenchampions – direkte Highscore-Anbindung
30.10.2026

Einspielung: Diese ZIP enthaelt zwei VOLLSTAENDIGE fertige Javascript-Dateien fuer das Stammverzeichnis des TEST2v2-Repositories:
  hall-of-fame-runtime.js
  ehrenlogbuch-runtime.js

Beide Dateien direkt ersetzen, GitHub Desktop pruefen (NUR DIESE 2 DATEIEN), Commit und Push origin.
KEIN Workflow, KEINE CMD-/Patch-Datei, KEINE Aenderung an Admin oder vNext, KEINE LIVE-Freigabe.

Verhalten:
- Eindeutig feststehender Rang-1-Sieger aus website-view.json -> highscore.wettbewerbe.[id].overall
- Zusatzschutz: website-view.json -> hallOfFame.aktuelleSaison.wettbewerbe.[id]
  benoetigt status=abgeschlossen UND abschluss.completed=true.
- Platz 1 muss EINDEUTIG sein (genau ein Datensatz mit rank=1, Teilnehmer-ID und Name).
- Bei widerspruechlichen oder explizit unbestaetigten HOF-Siegern: keine Anzeige.
- Alle abgeschlossenen Wettbewerbe der vorhandenen Wettbewerbsliste werden in der Titelchronik und den Wettbewerbssiegern der Saison 2026/2027 eingeblendet.
- Nur Weihnachtsregatta, Piratenkodex und Smugglerauftraege bekommen eine ZUSÄTZLICHE Ehrenchampion-Karte, neuere Karten vor der historischen WM-Karte auf der Startseite und im Ehrenlogbuch.
- Die historische WM-Karte und historische Archivdatei bleiben unveraendert.
- Laufende Wettbewerbe / ein geteilter 1. Platz werden nicht zu Siegern erklaert.

WICHTIGE OFFENE GRENZE (kein Verschweigen):
Die neuen Eintraege werden browserseitig bei jedem Laden aus den AKTUELLEN Daten eingeblendet. Ein Browser kann NICHT die ehrenlogbuch-archiv.json im GitHub-Repository dauerhaft aendern. Sobald die laufende Saison nicht mehr in website-view.json enthalten ist, koennen die Titel verschwinden, falls sie bis dahin nicht in die historische Archivdatei uebernommen wurden. Dauerhafte Archivierung ist beim Saisonwechsel separat sicherzustellen. Kein zusaetzlicher Workflow in diesem Paket.

INTERNE PRUEFUNG:
- node --check fuer beide Dateien bestanden
- 16 isolierte Logikchecks fuer Status, eindeutigen Rang 1, ungueltige Staende, historische Eintraege und Sonderwettbewerb-Whitelist bestanden.
- Ein echter vollstaendiger Browser-Test mit originalen spaeteren Gewinnerdaten ist weiterhin erforderlich.

TEST2v2 Sichtpruefung: Momentan darf keine neue Siegerkarte auftauchen; 2025/2026 und WM 2026 bleiben sichtbar. Bei spaeterem bestaetigtem Abschluss: Saison 2026/2027, Wettbewerb und Sieger in den zwei Ehrenlogbuch-Ansichten sowie Sonder-Champion auf der Startseite. Danach gesonderte LIVE-Freigabe erforderlich.

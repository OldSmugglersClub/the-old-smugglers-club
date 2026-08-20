# The Old Smugglers Club – Website 4.9.1

Finale Releaseversion auf Basis der bestätigten LIVE-Version 4.9.0.

## Inhalt
Website 4.9.1 enthält die abgenommene Besucherfunktion **„Spieltag in 30 Sekunden“**. Die Funktion ist in die bestehende Startseiten-Logbuch-Komponente integriert und verdichtet den neuesten abgeschlossenen Spieltag auf maximal drei bereits fachlich freigegebene Logbuch-Highlights.

Zusätzlich ist der abgenommene Darstellungsfix für die Crewduell-Durchschnittswerte enthalten, damit Dezimalwerte nicht innerhalb der Zahl umbrechen.

## Daten-/Architekturregel
- Website = Präsentation.
- Die Funktion liest die bestehende `spieltag-logbuch.json`.
- Nur Einträge mit `anzeigen: true` werden berücksichtigt.
- Keine parallele neue Wertungs- oder Interpretationslogik.
- Admin 6.4.0 ist nicht Bestandteil dieses Website-Releases und bleibt unverändert.

## Deployment
Für ein bestehendes Website-4.9.0-Repository das LIVE-UPDATE verwenden und die unter **ERSETZEN** genannten Dateien ersetzen. Danach Deployment abwarten und Startseite sowie `logbuch.html` auf Desktop und Mobil prüfen.

Das LIVE-FULL-Paket ist der vollständige archivierungsfähige Referenzstand für weitere Website-Entwicklung.

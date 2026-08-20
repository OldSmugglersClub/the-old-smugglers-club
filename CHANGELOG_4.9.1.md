# CHANGELOG – Website 4.9.1

**Datum:** 20.08.2026
**Status:** Final / für LIVE freigegeben
**Basis:** Website 4.9.0
**Abgenommener Entwicklungsstand:** 4.9.1-S30-2-HF1

## Neu
- „Spieltag in 30 Sekunden“ auf der Startseite innerhalb der bestehenden Spieltags-Logbuch-Komponente.
- Es werden maximal drei vom bestehenden Logbuch fachlich freigegebene Highlights des neuesten abgeschlossenen Spieltags angezeigt.
- Berücksichtigt werden ausschließlich Highlights mit `anzeigen: true`; die Reihenfolge folgt der vorhandenen `prioritaet`.
- Die bisherige redundante Startseiten-Kurzansicht des Logbuchs wurde innerhalb derselben Komponente durch die kompakte 30-Sekunden-Ansicht ersetzt.

## Korrektur
- Durchschnittswerte im Crewduell auf `logbuch.html` brechen nicht mehr innerhalb der Zahl um (z. B. `1,22`, `1,04`).

## Unverändert
- Keine Änderung an Grid, Kachelgrößen, Navigation oder Grundlayout.
- Keine neue Fachlogik auf der Website; die vorhandene Logbuch-Freigabelogik bleibt führend.
- `spieltag-logbuch.json` bleibt unverändert.
- Admin 6.4.0 bleibt unverändert.

## Abnahme
- Entwicklungsstand 4.9.1-S30-2-HF1 wurde am 20.08.2026 visuell und funktional abgenommen.
- Finalisierung zu 4.9.1 enthält keine zusätzliche Fachänderung.

## Typografie-Feinschliff vor Live-Einspielung
- Wettbewerbs-/Spieltagsbezeichnung innerhalb „Spieltag in 30 Sekunden“ besser lesbar dargestellt.
- Beispiel: „Smuggleraufträge 2. Spieltag“ erhält eine moderat größere Schrift.
- Keine Änderung an Fachlogik, Grid, Kachelgrößen, Navigation oder Grundlayout.

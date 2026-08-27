# CHANGELOG – TOSMC-WEBSITE-4.9.2-HF12-HF15

Basis: bestätigter Live-Stand HF14 inklusive Workflow-Scheduler-Reaktivierung.

## Änderung
- Bundesliga-Spieltagsbezeichnung zentral dynamisiert.
- Hoher Schmugglerrat / „Nächste Mission“: `Bundesliga N. Spieltag`.
- Counter / Feld unter dem Countdown: `Bundesliga N. Spieltag`.
- Spieltagskachel: ebenfalls `Bundesliga N. Spieltag`.
- Nicht zeitgenau terminierte Bundesliga-Anzeigen verwenden dieselbe zentrale Formatierung.
- Die laufende Nummer stammt weiterhin aus `matchdayName`; es gibt keine fest verdrahtete Spieltagszahl.

## Unverändert
- Grid
- Kachelgrößen
- Navigation
- Grundlayout
- Wappenpositionen
- Admin
- spieldaten.json
- Workflow-Fachlogik
- CSS

## Mobilprüfung
- Keine zusätzliche CSS-Regel erforderlich.
- Bestehende flexible/mehrzeilige Container bleiben unverändert.

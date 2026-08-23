# CHANGELOG – Test2 Stalk-O-Meter Logbuch

Stand: 23.08.2026
Basis: Live-Referenz Website 4.9.2-HF4 / Übernahme ausschließlich nach Test in Test2

## Änderung
- `stalk-o-meter.js`: `Logbuch` mit GoatCounter-Pfad `/logbuch.html` in die bestehende feste Seitenliste aufgenommen.
- `STALK-O-METER-HANDBUCH.md`: gezählte Bereiche von 12 auf 13 aktualisiert und `Logbuch` dokumentiert.

## Unverändert
- Kein Tracking-Code in `logbuch.html` geändert.
- Keine produktiven JSON-Daten geändert.
- Keine Navigation, kein Grid, keine Kachelgrößen und kein Grundlayout geändert.
- Keine GoatCounter-Konfiguration geändert.
- Keine OpenLigaDB-/GitHub-Automatik geändert.

## Erwartetes Verhalten
Nach Einspielung in Test2 fragt das bestehende Stalk-O-Meter zusätzlich den öffentlichen GoatCounter-Zähler für `/logbuch.html` ab. Der Wert wird automatisch nach Aufrufzahl einsortiert und in die angezeigte Gesamtsumme einbezogen.

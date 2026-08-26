# CHANGELOG – Website 4.9.2-HF12-HF10

- Basis: 4.9.2-HF12-HF9.
- Korrigiert die unvollständige Crewduell-Live-Übernahme.
- `logbuch.js` wird jetzt ausdrücklich mit ausgeliefert.
- Abgenommene Crewduell-Darstellung TEST4 übernommen:
  - bereinigtes Schiffsmotiv
  - dynamische Teamnamen und Durchschnittswerte
  - `vs.` statt `GEGEN`
  - kompakte Desktop- und Mobile-Darstellung
- `Form der Crew` wird ebenfalls übernommen.
- `Form der Crew` berechnet sich ausschließlich aus bereits vorhandener `spieltagpunkte.json`:
  - vorhandener `gesamtspieltagssiege` / Kicktipp-S-Wert
  - Delta zum unmittelbar vorherigen abgeschlossenen Wertungsblock
  - Top 5 nach größtem Delta
  - bei gleichem Delta bleibt die vorhandene Kicktipp-Reihenfolge maßgeblich
- Keine Admin-Änderung.
- Keine neue Persistenz oder Datendatei.
- Grid, Navigation und Kachelgrößen unverändert.

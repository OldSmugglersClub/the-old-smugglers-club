# TESTPROTOKOLL 4.9.2-HF12-HF49

## Ziel
Korrektur des Verteilungsproblems im mittleren Fenster der DFB-Pokal-Kachel.

## Umsetzung
1. Render-Pfad für Gewinnerliste mit eigener Kartenklasse `info-card--recent-winners` ergänzt.
2. CSS so erweitert, dass die fünf Pokalsiegerzeilen per `grid-template-rows: repeat(5, minmax(0, 1fr))` gleichmäßig über die Kartenhöhe verteilt werden.
3. `dfb-pokal.html` mit neuem Cache-Buster auf `4.9.2-HF12-HF49` gesetzt.

## Erwartetes Ergebnis
- Keine optische Stauchung mehr im mittleren Fenster.
- Die fünf Zeilen stehen wieder gleichmäßig und sauber über die gesamte Kartenhöhe verteilt.
- Linkes und rechtes Fenster bleiben unverändert.

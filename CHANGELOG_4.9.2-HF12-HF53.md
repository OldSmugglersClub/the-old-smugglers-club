# CHANGELOG 4.9.2-HF12-HF53

## Grundlage
- Übernahme des in Test2v2 ausdrücklich abgenommenen Teststands `4.9.2-HF12-HF52-TEST65`.

## Inhalt
- Saisonübersicht verwendet aktuelle Istwerte statt statischer Sollsummen.
- Champions-League-Spielplan wird wie die CL-Kachel direkt aus OpenLigaDB geladen.
- DFB-Pokal und Europa League berücksichtigen ausschließlich die für die Clubwertung relevanten Runden ab Achtelfinale.
- Bei nicht erreichbarer OpenLigaDB bleibt der lokale Datenbestand als Rückfallweg erhalten.
- Tippspieltage, reale Spiele, terminierte Spiele, Zeiträume und Status werden dynamisch berechnet.
- Der Datenstand zeigt den tatsächlichen Prüfzeitpunkt und meldet teilweise ausgefallene Live-Daten.
- Automatische Aktualisierung alle 15 Minuten bei sichtbarer Saisonübersicht.
- Die Logik sämtlicher einzelner Wettbewerbskacheln bleibt unverändert.
- Cache-Buster und `VERSION.txt` auf `4.9.2-HF12-HF53` angehoben.

## Geänderte Dateien
- `saison-2026-2027.html`
- `saisonuebersicht.js`
- `VERSION.txt`

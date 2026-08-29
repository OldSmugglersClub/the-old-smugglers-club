# 4.9.2-HF12-HF33

Finale Live-Version nach erfolgreicher Abnahme von TEST26 in Test2-v2.

## Basis
`4.9.2-HF12-HF32` plus bestätigter Bundesliga-Zwischenstand 1/9.

## Datenweg
OpenLigaDB `getgoalgetters/bl1/2026`
→ `scripts/bundesliga-torjaeger-auto.mjs`
→ `bundesliga-torjaeger.json`
→ `wettbewerb.js`
→ bestehende Bundesliga-Informationskacheln.

Die Website selbst ruft OpenLigaDB nicht direkt auf.

## Live-Einspielung
1. Aktuellen Live-Branch `main` verwenden.
2. UPDATE-Paket manuell anwenden.
3. Ersetzte Dateien prüfen.
4. Neue Dateien hinzufügen.
5. Keine Dateien löschen.
6. Commit/Push durchführen.
7. Deployment abwarten.
8. Workflow `Bundesliga Ergebnisse – automatisch` einmal manuell starten.
9. Live-Seite mit Cache-Neuladung prüfen.

## Live-Sichtprüfung
- Kachel 1 zeigt `Torjäger`.
- Kachel 2 zeigt `Torjägerfeld`.
- Kachel 3 `Datenzentrale` bleibt unverändert.
- Bundesliga-Tabelle, Bayern–Stuttgart 5:1, Tippverteilung 91/3/1 und 1/9-Teilstand bleiben korrekt.
- Keine finale Spieltags-/Siegeranzeige.

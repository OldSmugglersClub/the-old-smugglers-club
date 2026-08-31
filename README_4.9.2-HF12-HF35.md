# Live HF35 – Besucherfehler im Spieltags-Logbuch

## Basis und Freigabe

- Live-Basis: `4.9.2-HF12-HF34`
- Testfreigabe: `4.9.2-HF12-HF30-TEST30` wurde in Test2-v2 geprüft und abgenommen.
- Die Live-Ausgangsdateien `logbuch.js` und `logbuch.css` waren vor der Übernahme identisch mit der getesteten Ausgangsbasis.

## Änderungen

- `logbuch.js`
  - zeigt bei „Kursbewegung“ Gewinner und Verlierer
  - zeigt bei unverändertem Wert in „Form der Crew“ `± 0,00`
- `logbuch.css`
  - begrenzt mobile Wertungs-Badges auf ihre Tabellenzelle
  - verhindert die Worttrennung von „WERTUNG“
  - unterscheidet positive und negative Kursbewegung in den bestehenden Namens-Badges
- `VERSION.txt`
  - Version auf `4.9.2-HF12-HF35` erhöht

## Live-Prüfung nach Einspielung

1. Mobil: „Wer hat’s gerochen?“ auf schmalem und normalem Bildschirm prüfen.
2. Prüfen, dass „WERTUNG“ lesbar bleibt und kein Tendenz-Badge aus der Tabelle ragt.
3. „Form der Crew“ auf `▲ +1,00` und `± 0,00` prüfen.
4. „Kursbewegung“ auf `PochzerJung ▲ +57` und `Yauguru ▼ −86` prüfen.
5. Desktopansicht und ältere Logbucheinträge auf Regressionen prüfen.
6. Bundesliga-Abschluss 9/9 stichprobenartig auf unveränderte Daten prüfen.

## Nicht geändert

- keine Admin-Datei
- keine JSON-Datendatei
- keine Wertungslogik
- kein Grid, keine Kachelgröße, keine Navigation und kein Grundlayout


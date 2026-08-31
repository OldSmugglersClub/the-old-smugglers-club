# Live HF36 – Mobile Kurzbezeichnungen der Wertungs-Badges

## Basis und Freigabe

- Live-Basis: `4.9.2-HF12-HF35`
- Testfreigabe: `4.9.2-HF12-HF30-TEST31` wurde in Test2-v2 geprüft und abgenommen.
- Die Live-Ausgangsdateien enthielten HF35 vollständig und unterschieden sich vom Teststand ausschließlich durch den freigegebenen TEST31-Fix.

## Änderung

Bis einschließlich 760 px werden angezeigt:

- `Tendenz`
- `Exakt`

Oberhalb von 760 px bleiben angezeigt:

- `Tendenz richtig`
- `Sensation exakt`

## Live-Prüfung nach Einspielung

1. Mobil prüfen, dass `Tendenz` vollständig innerhalb des Badges bleibt.
2. Einen exakten Sensationstipp mobil auf die Anzeige `Exakt` prüfen.
3. Desktop prüfen, dass weiterhin `Tendenz richtig` und `Sensation exakt` erscheinen.
4. Tippernamen und Tipp-Spalte auf unveränderte Darstellung prüfen.

## Nicht geändert

- keine Spaltenbreite
- keine JSON- oder Admin-Datei
- keine Wertungslogik
- kein Grid, keine Kachelgröße, keine Navigation und kein Grundlayout


TOSMC – PRODUKTIVVORBEREITUNG 4.9.2-HF12-HF119
Basis: 4.9.2-HF12-HF118 aus Live main ZIP 22.10.2026 17:42:45.

STOPP VOR EINSPILUNG: Diese Datei ist ein vorbereiteter Release-Kandidat. Freigabe nur, wenn die aktuelle Live-Basis weiterhin den BEFORE-SHA256-Hashes in SHA256_MANIFEST.json entspricht.

Ausschließlich diese 5 Dateien im ROOT des Live-Repositories ersetzen:
- index.html (neue Cache-Parameter für Logbuch)
- logbuch.html (neue Cache-Parameter für Logbuch)
- logbuch.js (TEST13, fachlich geprüft)
- logbuch.css (TEST13, Layout bestätigt)
- VERSION.txt (4.9.2-HF12-HF119)

NIEMALS Tests, Manifest oder README in die Website einspielen.

Keine JSON-Wertungsdaten, Archive, HOF oder Admin-Dateien geändert.

Prüfen:
1. Vorher-Hashes aller fünf Live-Dateien mit SHA256_MANIFEST.json vergleichen.
2. Commit-Diff: exakt die fünf gelisteten Dateien; kein anderer Wettbewerb betroffen.
3. Nachher-SHA256 mit Manifest kontrollieren.
4. GitHub-Schutzprüfung, Pages Deployment und Browserfunktion kontrollieren.
5. Startseite (Logbuch-Teaser) sowie Logbuch: aktueller CL-Abschluss, historische Gleichstände, Flop-LuCipher, Form-Fenster, Kursbewegung und Bilanz; Mobil prüfen.
6. Bei Live-Abweichungen oder Fehlern STOPP und Basis neu einlesen.

# TOSMC LIVE – Startseiten-Logbuch WEEKDAY HF1 (05.11.2026)

**Status:** Zur manuellen LIVE-Einspielung nach bestätigtem TEST2v2-HF3 vorbereitet; LIVE-Sichtprüfung ausstehend.

- Ausgang: LIVE/main `logbuch.js`, Git-Blob `73aafd92abf939c7d87624e9624a069176e36455`.
- Zielkennung: `LIVE-STARTLOGBUCH-WEEKDAY-HF1` (separate Kennung von TEST2v2 HF3).
- Betroffene Website-Datei: ausschließlich `logbuch.js`.
- Änderungsgrund: Wochentagsabschlüsse erscheinen im Startseiten-Rückblick, passende dynamische Überschrift, zentrierte Einzelkarte.
- Funktionale Codeänderungen: exakt identisch mit dem vom Nutzer auf TEST2v2 bestätigten HF3; nur Kommentar zur LIVE-Versionskennung geändert.
- Keine Änderung an `spieltag-logbuch.json`, Highscores, Admin, anderen Wettbewerben, LIVE-Daten oder vNext.
- JavaScript-Syntax (`node --check`): bestanden.
- ZIP-Integrität: geprüft.
- Browser-/LIVE-Sichtprüfung: **ausstehend**.
- Keine GitHub-Schreibzugriffe durch KI.

SHA-256 Ausgang: `42c848b7f79f6d14288b966c3c80c13cbec755607a9f8d0da7ea329dc1b05585`
SHA-256 Ziel: `dbdc113d51cbc4f696173c62dae183a19b86a797f8285c82a3159b756b8e12dc`

## Schutz/Einspielung
1. GitHub Desktop: **LIVE-Repository** wählen, `Repository → Show in Explorer`. Nicht TEST2v2.
2. Vor Austausch sicherstellen, dass `logbuch.js` unverändert ist und die Datei dem geprüften LIVE-Ausgangsstand entspricht; bei lokalen/Remote-Paralleländerungen **STOP**.
3. Nur `logbuch.js` aus dem Paket ersetzen, Commit/Push via GitHub Desktop, LIVE-Seite neu laden und Darstellung kontrollieren.
4. Dieser Website-Fix ist **keine Freigabe für den CL-ST4-PRODUKTIVDATENABSCHLUSS**. Der separate Admin-PRODUKTIVLAUF bleibt erforderlich.

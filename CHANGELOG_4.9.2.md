# CHANGELOG – Website 4.9.2

Produktivübernahme ausschließlich der im Test-Repository abgenommenen Website-Funktionen.

## Übernommen
- Laufender Wertungsblock: keine veraltete abgeschlossene Spieltagsauswertung anzeigen; stattdessen Hinweis „Die Beute wird noch gezählt“.
- Logbuch-Historie bleibt während laufender Wertungsblöcke erreichbar.
- Frühere Logbucheinträge eindeutig als fortlaufender Tippspieltag plus Wettbewerb gekennzeichnet.
- Singular-/Plural-Ausgabe für Kapitän und Volltreffer korrigiert.
- Spieltagskachel: eindeutige Bezeichnung `Bundesliga · <n>. Spieltag`.
- Zugeordnete Smuggleraufträge zeigen ihren individuellen Namen.
- Spielzeile eines Smugglerauftrags zeigt `Smugglerauftrag <Name>` statt der zugrunde liegenden Ligabezeichnung.

## Sicherheitsgrenze
- Keine produktiven JSON-Wertungs-, Statistik-, Highscore-, Logbuch- oder Spielbetriebsdaten aus dem Test-Repository übernommen.
- Alle produktiven JSON-Dateien stammen unverändert aus dem aktuellen Live-Repository.
- Keine OpenLigaDB-/GitHub-Workflow-/Termin-/Ergebnis-/Tabellenautomatik verändert.
- Kein Grid, keine Kachelgröße und keine Navigation verändert.

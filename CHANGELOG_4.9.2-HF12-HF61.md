# 4.9.2-HF12-HF61

- Übernimmt unverändert die in TEST66 freigegebene Piratenkodex-Kachel.
- Übernimmt unverändert die in TEST68 geprüfte Originalwappen-Korrektur.
- Ergänzt 23 bislang fehlende Originalwappen aktueller Champions-League-Mannschaften als lokale Website-Assets.
- Entfernt die automatische Erzeugung erfundener Schmugglersiegel aus der zentralen Wappenkomponente.
- Alle Ansichten verwenden verbindlich denselben lokalen Originalwappen-Bestand.
- Ein automatischer Release-Blocker prüft alle in `spieldaten.json` verwendeten Team-IDs gegen Register, Datei und Originalstatus.
- Produktive Spiel-, Ergebnis-, Tipp-, Highscore- und Spielbetriebsdaten wurden nicht verändert.

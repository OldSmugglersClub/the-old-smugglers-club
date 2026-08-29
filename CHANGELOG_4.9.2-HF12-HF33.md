# CHANGELOG – 4.9.2-HF12-HF33

## Grundlage
Aktuelle Live-Website `4.9.2-HF12-HF32` inklusive bestätigtem Bundesliga-Teilstand 1/9.

## Übernommen aus TEST26
- Dynamische Bundesliga-Torjägerdaten aus OpenLigaDB `getgoalgetters/bl1/2026`.
- Neue lokale Datei `bundesliga-torjaeger.json`.
- Kachel `Wertung` wird durch `Torjäger` ersetzt.
- Kachel `Saisonstart` wird durch `Torjägerfeld` ersetzt.
- Kachel `Datenzentrale` bleibt unverändert.
- Gleichstände werden ohne künstliche Rangfolge dargestellt.
- Der bestehende Bundesliga-Ergebnisworkflow aktualisiert zusätzlich die lokale Torjägerdatei.

## Schutz
- Kein direkter OpenLigaDB-Aufruf im Browser.
- Bei ungültigen oder fehlenden Torjägerdaten bleiben neutrale Fallbacktexte sichtbar.
- Bestehende Torjägerdaten werden bei leerer/ungültiger Antwort nicht überschrieben.
- Nur geänderte Sportdaten erhöhen die Datenversion.

## Unverändert
- Grid
- Kachelgrößen
- Navigation
- Grundlayout
- Bundesliga-Teilstand 1/9
- Ergebnis-, Tabellen- und Wertungslogik
- Kicktipp, Coco, Highscore
- TestAdmin und LiveAdmin
- Cron-Zeit, Permissions und Concurrency des Bundesliga-Ergebnisworkflows

## Abnahme
TEST26 wurde in Test2-v2 erfolgreich geprüft und vom Nutzer abgenommen.

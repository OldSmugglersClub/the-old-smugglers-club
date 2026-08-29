# 4.9.2-HF12-HF34

Finale Live-Version nach erfolgreicher Abnahme von TEST29 in Test2-v2.

## Basis
`4.9.2-HF12-HF33` plus bestätigter Bundesliga-Zwischenstand 1/9.

## Anzeige
### Torjäger
- lokales Kanonenbild
- Platz 1
- Name
- Torzahl
- Platz 1 ist zwingend der erste OpenLigaDB-Eintrag

### Verfolgerfeld
- ausschließlich Plätze 2 bis 5
- jeweils eigene Zeile
- zentrierte Darstellung
- keine Wiederholung von Platz 1
- keine Anzeige ab Platz 6

## Live-Einspielung
1. Aktuellen Live-Branch `main` verwenden.
2. UPDATE-Paket manuell anwenden.
3. Ersetzte Dateien prüfen.
4. Neue Bilddatei hinzufügen.
5. Keine Dateien löschen.
6. Commit/Push durchführen.
7. Deployment abwarten.
8. Bundesliga-Seite mit Cache-Neuladung prüfen.

## Live-Sichtprüfung
- Torjäger-Kachel: Bild + erster OpenLigaDB-Eintrag + Torzahl.
- Verfolgerfeld: Plätze 2–5 untereinander und zentriert.
- Platz 1 darf im Verfolgerfeld nicht erneut erscheinen.
- Bundesliga-Tabelle, Bayern–Stuttgart 5:1, Tippverteilung 91/3/1 und Teilstand 1/9 bleiben unverändert.

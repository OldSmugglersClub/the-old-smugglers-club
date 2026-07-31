# The Old Smugglers Club

Offizielle Website der Tipprunde **The Old Smugglers Club**.

## Version

Aktueller Stand: **3.25 – Abgabezuverlässigkeit und Teilnehmerstatus**

## Veröffentlichung auf GitHub Pages

Der gesamte Inhalt dieses Verzeichnisses gehört direkt in das Hauptverzeichnis des GitHub-Repositories. `index.html` darf nicht in einem zusätzlichen Unterordner liegen.

Für Updates muss nicht zwingend das komplette Paket erneut hochgeladen werden. Die Datei `GITHUB-UPDATE-3.3.md` nennt exakt, welche Dateien ersetzt, neu hinzugefügt oder gelöscht werden müssen.

## Zentrale Dokumentation

- `CHANGELOG.md` – Versionshistorie
- `INSTALLATION.md` – Installation und Veröffentlichung
- `ADMIN-HANDBUCH.md` – Pflegehinweise
- `DATENSTRUKTUR.md` – Datenquellen und Struktur
- `BACKUP_RESTORE.md` – Sicherung und Wiederherstellung
- `RELEASE_NOTES_v3.3.md` – Hinweise zu diesem Release

## Administrationszentrum
Die Seite `admin.html` prüft die zentral registrierten Datenquellen, zeigt Versions- und Ladeinformationen und kann einen Systembericht als JSON exportieren. Sie verändert keine Daten.

## Version 3.5
Das Administrationszentrum prüft exportierte Datensicherungen lokal, meldet fehlende oder unbekannte Quellen und erzeugt einen manuellen Importplan. Eine automatische Änderung des GitHub-Repositories findet nicht statt.


## Daten-Cockpit
Die Seite `daten-cockpit.html` zeigt alle Wettbewerbe, Spielstände und den zentralen Integritätsstatus in einer lesenden Übersicht.

## Zentrale Spielpflege
Über `spielpflege.html` kann die zentrale `spieldaten.json` lokal geprüft, bearbeitet und für den manuellen GitHub-Upload exportiert werden.

## Version 3.12

Die lokale Wettbewerbsverwaltung erzeugt nach Prüfung eine vollständige `wettbewerbe.json`. GitHub-Dateien werden nicht automatisch verändert.


## Zentrale Tippdaten (3.11)

`tipppflege.html` verwaltet Tipps lokal und exportiert eine vollständige `tipps.json`. Teilnehmer und Spiele werden ausschließlich über stabile IDs referenziert.


## Version 3.12

Die zentrale Punkteberechnung steht unter `punkteberechnung.html` bereit. Sie wertet `tipps.json` gegen abgeschlossene Spiele in `spieldaten.json` aus und verwendet die Regeln aus `wertungsregeln.json`.

## Version 3.14

`bonuspflege.html` verwaltet Bonusfragen, Lösungen und Teilnehmerantworten. Gewertete richtige Antworten fließen über `punkteberechnung.html` in den automatischen Highscore ein.


## Version 3.17

`smugglerpflege.html` verwaltet die 34 Dynamo-Sondermissionen und ihre Zuordnung zu Spiel-IDs und Kicktipp-Spieltagen.


## Version 3.17

Die Seite `smugglerwertung.html` berechnet eine eigenständige Rangliste für alle Dynamo-Smuggleraufträge. Grundlage sind `smugglerauftraege.json`, `spieldaten.json`, `tipps.json`, `teilnehmer.json` und `wertungsregeln.json`.


## Teamwertung (3.17)

`teamwertung.html` fasst die in `punkte.json` berechnete Einzelwertung anhand der Teamzuordnung in `teilnehmer.json` zusammen. Der Export `teampunkte.json` kann anschließend manuell im Repository ersetzt werden.


## Wettbewerbs-Einzelwertungen (3.18)

`wettbewerbswertung.html` erzeugt aus `punkte.json` getrennte Einzelranglisten für jeden Wettbewerb. Die Exportdatei `wettbewerbspunkte.json` kann anschließend manuell im Repository ersetzt werden.


## Spieltag-Einzelwertungen (3.19)

`spieltagwertung.html` erstellt für jeden in `spieldaten.json` erfassten Spieltag eine getrennte Rangliste. Der Export `spieltagpunkte.json` kann anschließend manuell im Repository ersetzt werden.


## Version 3.20

Der neue Ranglistenverlauf stellt Punkte, Platzierungen und die Form der letzten fünf Wertungsabschnitte datengetrieben dar.


## Saisonarchiv und Hall of Fame (3.21)

`saisonarchiv.html` bündelt abgeschlossene Spielzeiten, Titelträger und Rekorde. Die zentrale Datei `saisonarchiv.json` kann als JSON oder CSV exportiert werden.


## Version 3.22

Die Tippfristen-Kontrolle befindet sich in `tippfristen.html` und prüft bestätigte Anstoßzeiten sowie fehlende Abgaben.


## Version 3.23

`abgabe-erinnerungen.html` erzeugt aus fehlenden Tippabgaben vorbereitete, kopierbare Erinnerungstexte. Ein automatischer Versand findet nicht statt.

## Version 3.24

`erinnerungsprotokoll.html` dokumentiert manuell versendete Abgabe-Erinnerungen. Einträge können importiert, ergänzt, entfernt und als `erinnerungsprotokoll.json` oder CSV exportiert werden. Ein automatischer Versand oder eine automatische Änderung des Repositories findet nicht statt.


## Version 3.25

`abgabezuverlaessigkeit.html` führt bestätigte, abgelaufene Tippfristen mit den vorhandenen Tipps und dem Erinnerungsprotokoll zusammen. Die Auswertung ist rein lesend und kann als JSON oder CSV exportiert werden.


## Version 3.26

`datenqualitaet.html` prüft die zentralen JSON-Daten lesend auf fehlende Pflichtfelder, doppelte IDs, ungültige Referenzen, unvollständige Ergebnisse, unplausible Tippwerte und inkonsistente Termine. Der Prüfbericht kann als `datenqualitaet.json` oder CSV exportiert werden.


## Version 4.0

Version 4.0 ist die produktionsbereite Basis. Die zentrale `teilnehmer.json` enthält den Kicktipp-Mitgliederstand vom 31.07.2026 mit 100 aktiven Teilnehmern. Bestehende IDs bleiben stabil. E-Mail-Adressen wurden nicht übernommen. Details stehen in `teilnehmer-importbericht.json` und `DATENSCHUTZ-HINWEIS.md`.

## Version 4.0.3

Die Highscore-Rückfallquelle ist mit der zentralen Teilnehmerliste synchronisiert. Gesamt- und Spieltagswertung enthalten nun alle 100 aktiven Mitglieder.

# TOSMC LIVE – 11 Sondertermine DYN1

## Anlass
Original-Artefakt vom 04.11.2026: `GEPRUEFT`, 10 verifizierte Paarungen, die abgeschlossene Madonnina fehlt. Vorherige starre Bedingung 11/11 verursacht einen Abbruch.

## Änderung
Nur `scripts/tosmc-live-11-terminuebernahme.mjs`. Die Zielkonfiguration bleibt auf exakt elf IDs begrenzt. Als erledigt gelten **ausschließlich** Zielspiele mit `status === 'beendet'` in der aktuellen LIVE-spieldaten.json. Nur aktive IDs werden an den offiziellen Browser-Prüfer übergeben. Die Vollständigkeitsbedingung lautet nun `aktive Befunde === aktive IDs` und `verifiziert === aktive IDs`. Nach dem letzten Abschluss (0 aktiv) keine Quellenabfrage und keine Änderung. Quellenfehler aktiver Spiele bleiben sperrend. Der Prüfbericht wird vor der Vollständigkeitskontrolle und auch bei Fehlern geschrieben.

## Unverändert
Keine Änderung an Daten, Ergebnissen, Rankings, Tipps, Historie, GitHub-Workflows oder Freigabetext. Der bisherige Workflow nutzt dieselbe Skriptdatei. Bestehende harte Dateigrenze im Workflow bleibt bestehen. Kein GitHub-Schreibzugriff durch die KI.

## Prüfstatus
- `node --check`: bestanden.
- Rechenregel: 11 konfiguriert, 1 beendet, 10 aktiv; danach 9 usw. bis 0.
- Die Browser-/Quellenprüfung und der echte GitHub-Actions-Lauf sind **nicht** lokal reproduziert. Vor LIVE-Aktivierung zuerst manuelle `VORSCHAU` und Prüfung des erzeugten Audit-Berichts.

## Einspielung und Nachprüfung
1. GitHub Desktop LIVE-Repository öffnen, vor dem Ersetzen lokale Änderungen und aktuellen HEAD prüfen.
2. Ausschließlich die Skriptdatei im Paket unter `scripts/` übernehmen; Commit/Push.
3. GitHub Actions `TOSMC LIVE – 11 Sondertermine automatisch uebernehmen` manuell im Modus `VORSCHAU` ausführen.
4. Audit-Artefakt prüfen: `Konfiguriert=11`, `Abgeschlossen=1`, `Aktiv=10`, `Gepruefte aktive Paarungen=10/10`, `Uebernommen=Nein`.
5. Bei Abweichung STOP; keine manuelle `UEBERNEHMEN`-Ausführung.

## Vorbehalt
Wenn eine offizielle Quelle ausfällt oder ein noch aktives Spiel nicht erkannt wird, bleibt der Workflow rot. Das ist beabsichtigter Fail-Closed-Schutz und kein Anlass, die Quellenprüfung zu umgehen.

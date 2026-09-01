# HF39 – Robuste offizielle Terminprüfung

## Basis

- Live-Website `4.9.2-HF12-HF38`
- Die hochgeladene Live-`main.zip` wurde vor der Änderung über `VERSION.txt` als HF38 bestätigt.
- Fachliche Testbasis: Test2-v2 `4.9.2-HF12-HF30-TEST35`, vom Nutzer abgenommen.

## Änderung

Der Bundesliga-Terminimport ermittelt aus `spieldaten.json` den ersten noch nicht abgeschlossenen Bundesliga-Spieltag und beginnt die offizielle Prüfung dort. Abgeschlossene Spieltage werden nicht erneut von wechselnden HTML-Antworten der externen Quelle abhängig gemacht.

Unplausible oder fehlgeschlagene Abrufe werden maximal dreimal mit 1,5 Sekunden Abstand versucht. Bei endgültigem Fehlschlag bleibt der Import gesperrt und verändert keine Daten. Das Fehlerprotokoll nennt HTTP-Status, Inhaltstyp, Antwortlänge und Quelle.

## Live-Pflichtprüfung

1. Bundesliga-Terminworkflow manuell starten.
2. Im Log prüfen, dass die offizielle Prüfung bei Spieltag 2 beziehungsweise dem ersten offenen Spieltag beginnt.
3. Prüfen, dass Spieltag 1 nicht abgerufen wird.
4. Ohne neue Termine darf kein Commit entstehen.
5. Dynamo-Terminworkflow einmal kontrolliert starten.
6. `spieldaten.json` bei einem Lauf ohne neue Termine unverändert prüfen.

## Nicht geändert

- Workflow-YAML und Cron-Zeiten
- OpenLigaDB-URLs und Zuordnungslogik
- fachliche Regeln für Konkretisierung und Verlegung
- JSON-Datenformate
- Website-Layout und Navigation

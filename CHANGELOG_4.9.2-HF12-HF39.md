# CHANGELOG – Website 4.9.2-HF12-HF39

- Basis: abgenommene Live-Website `4.9.2-HF12-HF38`.
- Übernahme des in Test2-v2 `4.9.2-HF12-HF30-TEST35` geprüften und abgenommenen Workflow-Fixes.
- Die offizielle Bundesliga-Terminprüfung beginnt beim ersten lokal noch nicht abgeschlossenen Bundesliga-Spieltag statt immer bei Spieltag 1.
- Unplausible oder technisch fehlgeschlagene Abrufe werden maximal dreimal kontrolliert wiederholt.
- Bleibt die Quelle unbrauchbar, bricht der Import weiterhin fail-safe ohne Datenänderung ab.
- Diagnoseprotokolle enthalten HTTP-Status, Inhaltstyp, Antwortlänge und Quelladresse.
- Die zentrale Abrufhärtung gilt ebenfalls für den Dynamo-/2.-Bundesliga-Terminimport.
- Keine Änderung an Cron-Zeiten, Datenformaten, Terminübernahmeregeln, Grid, Layout oder Navigation.

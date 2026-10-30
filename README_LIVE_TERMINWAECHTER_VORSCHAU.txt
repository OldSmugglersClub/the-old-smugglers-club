TOSMC LIVE – 11 Sondertermine – geschuetzte Read-Only-Vorschau (30.10.2026)

Bereits per GitHub verglichen: alle 11 Zielspiele aus Piratenkodex / Weihnachtsregatta in LIVE vorhanden, pro Spiel keine Feldabweichung gegen TEST2v2. Nicht freigegebenes, bereits beendetes El Clasico wird NICHT ueberwacht.

AUSSCHLIESSLICH neue Dateien einspielen, keine Datei ueberschreiben, keine Spieldaten mitkopieren.

Github Desktop: ZIP in lokales LIVE-Repo entpacken, neue Dateien pruefen, committen, Push origin.
Actions: TOSMC LIVE – 11 Sondertermine – NUR VORSCHAU starten. Artefakt TOSMC-LIVE-11-TERMINVORSCHAU hier hochladen.

Schutz: Workflow ist ausschliesslich workflow_dispatch, contents:read, checkout persist-credentials:false. Runner hat keinerlei Dateischreibzweig und prueft Ziel-IDs sowie bestehende Core-Feldschutzregeln. Die bisherigen Bundesliga-/Dynamo-Workflows und OpenLigaDB bleiben unveraendert.
Keine Cron-Automatik, keine LIVE-Commit-/Push-Funktion. Eine Aktivierung ist erst nach separater Freigabe und LIVE-Auswertung zu entscheiden.

Quellenkonfiguration: 4 bestehende offizielle Quellen fuer exakt 11 IDs, mit aktuellen Aliasnamen, Runden 19 (Frankreich) und 16 (Portugal); das vNext-Zielrepository wurde bewusst entfernt. JSON-Quelldatei ist kein produktives Spielwertungsfile.

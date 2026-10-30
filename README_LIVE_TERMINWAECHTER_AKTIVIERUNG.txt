TOSMC LIVE TERMINWAECHTER – FREIGEGEBENE AKTIVIERUNG

Nur OldSmugglersClub/the-old-smugglers-club.
Voraussetzung: zuvor eingespieltes LIVE-Vorschaupaket ist vorhanden.
ZIP komplett in das lokale LIVE-Repository entpacken; Dateien unter scripts/ und .github/workflows/ hinzufuegen.
Enthaelt KEINE spieldaten.json, KEINE schedule-terminstand.json und KEINE Aenderung vorhandener OpenLigaDB-Workflows.
Neue Dateien: scripts/tosmc-live-11-terminuebernahme.mjs und .github/workflows/tosmc-live-11-terminuebernahme.yml.
Alle anderen Module/Fixtures/Tests bleiben exakt auf dem zuvor bestaetigten LIVE-Vorschaustand.

GitHub Desktop Commit + Push. Anschliessend manuellen Workflow TOSMC LIVE – 11 Sondertermine automatisch uebernehmen im Modus VORSCHAU starten.
WICHTIG: Dieser Workflow hat zusaetzlich einen taeglichen Zeitplan, der UEBERNEHMEN ausfuehrt. Erst nach Einspielung und erfolgreicher Vorschau ist die Aktivierung akzeptiert.
Die Automatik schreibt ausschliesslich 5 Terminfelder von exakt 11 vorab freigegebenen Spielen. Vollstaendiger Quellenstatus GEPRUEFT mit allen 11 Paarungen ist erforderlich. Offen bedeutet niemals Termin bestaetigt.
Die Shared-Concurrency-Gruppe osc-bundesliga-ergebnisimport verhindert parallele Schreiblaeufe zu Bundesliga/Dynamo.
LIVE und TEST2v2 behalten ihre jeweilige eigene Datenbasis. LIVE-Quellmodule wurden nicht gegen andere Wettbewerbe erweitert.
Keine durchgehende reale amtliche Terminaenderung wurde bisher beobachtet; Schreibweg auf TEST2v2-Testbranch bestaetigt.

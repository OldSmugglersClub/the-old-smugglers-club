# TESTPROTOKOLL – 4.9.2-HF12-HF39

## Erfolgreich

- Live-Basis über `VERSION.txt` als HF38 bestätigt
- betroffene HF38-Skripte vor Übertragung bytegenau identisch mit der TEST35-Ausgangsbasis
- Syntaxprüfung beider geänderten Skripte
- Wiederholung nach unplausibler HTTP-200-Antwort
- Erfolg nach erneutem verwertbarem Abruf
- endgültiger Fail-safe-Abbruch nach drei unbrauchbaren Abrufen
- Diagnose mit HTTP-Status, Inhaltstyp, Antwortlänge und Quelle
- Datenprüfung: 306 Bundesliga-Spiele
- Datenprüfung: erster offener Bundesliga-Spieltag ist Spieltag 2
- `spieldaten.json` unverändert

## Noch durch Nutzer zu prüfen

- manueller Bundesliga-Terminworkflow in Live
- Logbeginn beim ersten offenen Spieltag
- kein Abruf von Spieltag 1
- kein Commit ohne neue bestätigte Termine
- kontrollierter Dynamo-Terminworkflow

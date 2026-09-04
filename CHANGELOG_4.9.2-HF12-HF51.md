# CHANGELOG 4.9.2-HF12-HF51

## Grundlage
- Übernahme des in Test2v2 ausdrücklich abgenommenen Teststands `4.9.2-HF12-HF50-TEST63`.
- TEST62 wurde verworfen und ist nicht Bestandteil der Freigabekette.

## Inhalt
- Europa-League-Kachel mit drei kompakten, symmetrischen Fenstern.
- Linkes Fenster: aktuelle OpenLigaDB-Torjägerdaten mit Europa-League-Kanone; vor dem ersten verwertbaren Treffer erscheint „Noch offen“.
- Mittleres Fenster: letzte fünf Europa-League-Sieger mit Teamwappen und gleichmäßiger Höhenverteilung.
- Rechtes Fenster: das bereitgestellte UEFA-Europa-League-Logo im Format 2048×1152.
- Alle drei Fenster besitzen eine einheitliche Höhe von 290 px.
- Überschriften, Vereinsnamen, Saisonangaben und Torjägertexte bleiben einzeilig; schmale Mobilansichten sind gesondert berücksichtigt.
- Bestehende Europa-League-Datenwege und andere Wettbewerbsseiten bleiben unverändert.
- Cache-Buster und `VERSION.txt` auf `4.9.2-HF12-HF51` angehoben.

## Geänderte oder neue Dateien
- `europa-league.html`
- `europa-league.json`
- `wettbewerb.js`
- `wettbewerb.css`
- `assets/europa-league-logo.jpg`
- `assets/europa-league-torjaegerkanone.jpg`
- `assets/team-logos/original-team-logos.json`
- `assets/team-logos/original/atalanta.png`
- `assets/team-logos/original/sevilla.png`
- `VERSION.txt`

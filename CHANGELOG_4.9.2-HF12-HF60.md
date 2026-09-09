# HF60 – Coco-Direktwahl und CL-Tippverteilung

Live-Release auf Basis des neu vom Nutzer bereitgestellten und als HF59 bestätigten Live-Repositories.

- Übernimmt den vom Nutzer vollständig geprüften und mit „passt“ freigegebenen TEST62-Code.
- „Coco fragen“ öffnet Coco mit der konkreten Partie vorausgewählt.
- Die separate Champions-League-Ligaphasenansicht verknüpft OpenLigaDB-Partien über die Match-ID mit `spieldaten.json` und zeigt dadurch die gespeicherte Kicktipp-Tippverteilung.
- Alle acht Wettbewerbsseiten verwenden einheitlich HF60 als Cache-Kennung für `wettbewerb.css` und `wettbewerb.js`.
- Produktive Ergebnis-, Tipp-, Highscore- und Spielbetriebsdaten bleiben unverändert.

# CHANGELOG – 4.9.2-HF12-HF27

## Live-Freigabe

- Die in TEST20 bis TEST20-HF7 geprüfte und freigegebene Kicktipp-Integration wird in Live übernommen.
- Neue eigenständige Seite `kicktipp.html` mit der offiziellen Kicktipp-JavaScript-Integration.
- „Kicktipp Live Action“ ist auf der Startseite, der Highscore-Seite, der Saisonübersicht und den vorhandenen Wettbewerbs-/Spieltagsdaten verlinkt.
- Der getestete Startaufruf verwendet `path=tippuebersicht` und den von Kicktipp erzeugten Routing-Parameter `br_p`.
- Der direkte Zugang zu Kicktipp bleibt innerhalb der Integration als unabhängiger Fallback erhalten.
- Das Kicktipp-Script wird ausschließlich in `kicktipp.html` geladen.
- TOSMC und Kicktipp bleiben technisch voneinander unabhängig.
- `update_data.py` erzeugt dauerhaft denselben vollständigen `br_p`-Link wie die erfolgreich getesteten Anzeigestellen.

## Nicht geändert

- Grid, Kachelgrößen, Hauptnavigation und Grundlayout.
- LiveAdmin und sämtliche Admin-Dateien.
- Bestehende Live-Dateien außerhalb der dokumentierten Ersetzungsliste.
- Keine Dateien aus zurückgerollten oder nicht freigegebenen Tests wurden übernommen.

Freigabegrundlage: `4.9.2-HF12-HF26-TEST20-HF7`.

Vorgänger Live: `4.9.2-HF12-HF26`.

# CHANGELOG – 4.9.2-HF12-HF29

## Live-Freigabe

- Die in TEST22 und TEST22-HF1 geprüfte mobile Kicktipp-Aktionsleiste wird in Live übernommen.
- Auf Ansichten bis 430 CSS-Pixel stehen „Zur Clubseite“, „Frage Coco“ und „Kicktipp direkt“ in einer gemeinsamen Zeile.
- Das kleine Clublogo der Aktionsleiste wird auf dieser Breite ausgeblendet; das vollständige Banner bleibt erhalten.
- Für Ansichten bis 340 CSS-Pixel greift eine zusätzliche geprüfte Feinabstimmung.
- Die sichtbare Bezeichnung „Testmodul“ wurde durch „Kicktipp-Integration“ ersetzt.
- Nicht benötigte Einleitungs-, Status- und technische Hinweistexte wurden entfernt.

## Beibehalten

- Echte Fehler- und Ausfallmeldungen bleiben im bestehenden Fallback-Bereich erhalten.
- Kicktipp-Einbettung, Routing, `br_p`, direkter Kicktipp-Fallback und Coco-Verbindung bleiben unverändert.
- Desktop-Darstellung, Grid, Kachelgrößen, Hauptnavigation und Grundlayout bleiben unverändert.
- LiveAdmin und sämtliche Admin-Dateien bleiben unverändert.

Freigabegrundlage: `4.9.2-HF12-HF28-TEST22-HF1`.

Vorgänger Live: `4.9.2-HF12-HF28`.

# CHANGELOG – TOSMC-WEBSITE-4.9.2-HF12-HF17

Basis: bestätigter Stand HF16.

## Änderung
- Goldene horizontale Linie oberhalb der Kicktipp-Aktionszeile entfernt.
- Ursache: globale `footer`-Regel setzte `border-top` auch auf den internen Footer der Spieltagskachel.
- Nur `.sm-schedule__actions` erhält `border-top: 0`.

## Unverändert
- echter Seitenfooter
- Button
- Abstände
- Grid
- Kachelgrößen
- Navigation
- Desktop-/Mobile-Struktur

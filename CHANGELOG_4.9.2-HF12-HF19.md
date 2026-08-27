# CHANGELOG – TOSMC-WEBSITE-4.9.2-HF12-HF19

Basis: HF17. HF18 wurde wegen der sichtbaren Überlagerung vollständig zurückgenommen.

## Ursache HF18
- Durch zusätzliches vertikales Padding wurde der interne Footer höher.
- Die Spieltagskachel besitzt feste Höhenbegrenzungen.
- Dadurch verlor die scrollbare Terminliste sichtbare Höhe und die Bereiche wirkten überlagert.

## Korrektur
- Footer-Geometrie wieder exakt auf HF17.
- Goldene obere Linie bleibt entfernt.
- Nur der sichtbare Kicktipp-Button wird um 3 px nach unten verschoben.
- Keine Änderung an Footer-Höhe, Scrollbereich oder Kachelgröße.

## Unverändert
- Grid
- Navigation
- Kachelgrößen
- Spieltagslogik
- Button-Größe
- Mobile-Struktur

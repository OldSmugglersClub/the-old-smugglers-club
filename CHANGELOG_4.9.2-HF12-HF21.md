# CHANGELOG – TOSMC-WEBSITE-4.9.2-HF12-HF21

Basis: bestätigter Live-Stand HF20.

## Ursache
Die goldene Desktop-Linie kam nicht von den Buttons.
Sie wurde in `highscore.css` durch das Pseudo-Element
`#highscore.highscore-teaser::after` erzeugt.

## Änderung
- Dieses reine Desktop-Zierelement deaktiviert.
- Mobile-Abstand aus HF20 bleibt unverändert.
- Buttons, Highscore-Inhalte, Grid und Kachelgrößen unverändert.

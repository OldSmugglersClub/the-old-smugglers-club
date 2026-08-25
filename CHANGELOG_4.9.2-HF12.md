# CHANGELOG – Website 4.9.2-HF12

## Coco – Phase 2 „Coco fragen“
- Produktive Integration ausschließlich über den bestehenden Live-Pfad `/coco/`.
- `Coco fragen` erscheint nur bei bestätigten, noch nicht begonnenen Partien innerhalb des 7-Tage-Fensters.
- Der Aufruf öffnet Coco mit exakt dieser Partie vorausgewählt.
- Beim Kontextaufruf führt `Zurück zum Spiel` direkt zur ursprünglichen Spielzeile.
- Beim normalen Aufruf bleibt `Zurück an Deck` mit Ziel Startseite.
- Beendete, spätere und nicht zeitgenau terminierte Partien erhalten keinen Coco-Link.

## Statusdarstellung
- Der bereits in 4.9.2-HF11-HF3 abgenommene Fix bleibt erhalten:
  kein zusätzlicher Statustext neben dem Status-Badge.

## Bestandsschutz
- Keine Testmodule oder Testpfade in Live.
- Keine Änderungen an Grid, Kachelgrößen, Admin oder Datenformat.

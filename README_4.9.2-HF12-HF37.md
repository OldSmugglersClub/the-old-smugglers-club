# HF37 – Highscore-Punktezeile Desktop

## Basis

- Live-Website `4.9.2-HF12-HF36`
- Die hochgeladene Live-`main.zip` wurde vor der Änderung über `VERSION.txt` als HF36 bestätigt.
- Fachliche Testbasis: Test2-v2 `4.9.2-HF12-HF30-TEST32`, vom Nutzer am 01.09.2026 abgenommen.

## Änderung

Innerhalb der bestehenden Highscore-Kartenstruktur verwendet `.highscore-card-copy` auf Desktop ein gemeinsames dreizeiliges Grid. Die dynamische Punktezeile aller drei Kacheln wird am unteren Rand derselben Grid-Zeile ausgerichtet. Eine schwarze Trennlinie mit festem Innenabstand trennt Namen beziehungsweise Team vom Zahlenwert.

Die Lösung arbeitet ohne Absolutpositionierung und bleibt unabhängig von den dynamisch geladenen Namen und Zahlenwerten.

## Live-Pflichtprüfung

1. Desktop mit mindestens 701 px Breite öffnen.
2. Prüfen, dass alle drei Punktewerte vollständig unterhalb der schwarzen Trennlinie stehen.
3. Prüfen, dass alle drei Zahlenwerte exakt auf gleicher Höhe sitzen.
4. Bei 700 px und darunter prüfen, dass die bisherige mobile Darstellung unverändert bleibt.
5. Grid, Kachelgrößen, Navigation und Datenwerte gegen HF36 gegenprüfen.

## Nicht geändert

- HTML-Struktur
- JavaScript und Datenlogik
- Grid und Kachelgrößen
- Navigation und Grundlayout
- Tablet/Mobile bis einschließlich 700 px

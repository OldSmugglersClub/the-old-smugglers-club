# HF38 – Geordnete Highscore-Kacheln Desktop

## Basis

- Live-Website `4.9.2-HF12-HF36`
- Die neu hochgeladene Live-`main.zip` wurde vor der Änderung über `VERSION.txt` als HF36 bestätigt.
- Fachliche Testbasis: Test2-v2 `4.9.2-HF12-HF30-TEST33`, vom Nutzer abgenommen.

HF37 und TEST34 sind verworfene Zwischenstände. Sie wurden nicht als technische oder gestalterische Basis für HF38 verwendet.

## Änderung

Die bisherige wiederholte Hintergrundgrafik erzeugte schwarze Querstreifen, die abhängig vom Inhalt durch Namen liefen. HF38 ersetzt dieses Muster ausschließlich auf Desktop durch eine ruhige, durchgängige Leder-/Holzfläche.

Die drei vorhandenen Inhaltsbereiche werden als gemeinsames Grid geordnet:

1. Überschrift
2. Name beziehungsweise Teamname
3. Punktewert

Dezente messingfarbene Linien trennen die Bereiche. Namen und Punkte bleiben in allen drei Kacheln auf gleicher Höhe. Die Namen bleiben entsprechend der abgenommenen TEST33-Fassung linksbündig.

## Live-Pflichtprüfung

1. Desktop mit mindestens 701 px Breite öffnen.
2. Prüfen, dass keine schwarzen Querstreifen durch Überschriften, Namen oder Punkte laufen.
3. Prüfen, dass alle drei Überschriftsbereiche auf derselben Unterkante enden.
4. Prüfen, dass Namen und Punktewerte jeweils auf gleicher Höhe sitzen.
5. Prüfen, dass die Namen linksbündig bleiben.
6. Bei 700 px und darunter prüfen, dass die mobile Darstellung unverändert bleibt.
7. Grid, Kachelgrößen, Navigation und Datenwerte gegen HF36 gegenprüfen.

## Nicht geändert

- HTML-Struktur
- JavaScript und Datenlogik
- Grid und Kachelgrößen
- Navigation und Grundlayout
- Tablet/Mobile bis einschließlich 700 px

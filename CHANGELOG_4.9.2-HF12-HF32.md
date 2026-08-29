# CHANGELOG – 4.9.2-HF12-HF32

## Grundlage

Live-Website `4.9.2-HF12-HF31` inklusive bestätigtem Bundesliga-Teilstand 1/9.

## Änderung

- Der in Test2-v2 als TEST25 abgenommene Footer-Fix wurde unverändert auf Live übertragen.
- Die untere goldene Rahmenlinie der drei rechtlichen Footer-Kacheln wird jetzt im gesamten bereits vorhandenen mobilen Navigationsbereich bis 720 CSS-Pixel dargestellt.
- Die bisherige HF22-Korrektur galt nur bis 620 CSS-Pixel.

## Ursache

Die bestehende mobile Navigationsregel arbeitet bis 720 CSS-Pixel.
Die HF22-Korrektur stellte die untere Rahmenfarbe der rechtlichen Footer-Kacheln jedoch nur bis 620 CSS-Pixel wieder her.
Dadurch fehlte bei Viewports zwischen 621 und 720 CSS-Pixel ausschließlich die untere goldene Rahmenlinie.

## Abnahme

- TEST25 wurde in Test2-v2 erfolgreich geprüft und vom Nutzer abgenommen.
- Der bestätigte Teclast-P30-Darstellungsfehler ist damit behoben.

## Unverändert

- Grid
- Kachelgrößen
- Navigation und Navigationslogik
- Grundlayout
- Footer-Struktur und Linkziele
- Bundesliga-Teilstand 1/9 und sämtliche Website-Daten
- Kicktipp-, Coco-, Highscore- und Spieltagslogik
- TestAdmin und LiveAdmin

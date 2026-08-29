# 4.9.2-HF12-HF32

Finale Live-Version nach erfolgreicher Abnahme von TEST25 in Test2-v2.

## Basis

`4.9.2-HF12-HF31` plus bestätigter Bundesliga-Zwischenstand 1/9.

## Änderung

In `legal.css` wird ausschließlich der bestehende Breakpoint der HF22-Korrektur für die untere Rahmenfarbe von `max-width: 620px` auf `max-width: 720px` erweitert.

Damit entspricht die Korrektur exakt dem bereits vorhandenen Bereich der mobilen Navigation.

## Einspielen ins Live-Repository

1. Aktuellen Live-Branch `main` verwenden.
2. UPDATE-Paket manuell anwenden.
3. `legal.css` und `VERSION.txt` ersetzen.
4. Die HF32-Dokumentationsdateien neu hinzufügen.
5. Keine Dateien löschen.
6. Änderungen prüfen, committen und pushen.
7. Deployment abwarten und Live-Seite mit Cache-Neuladung prüfen.

## Live-Sichtprüfung

- Teclast P30: untere goldene Linie bei Impressum, Datenschutz und Nutzungsrechte sichtbar.
- Android-Smartphone: bestehende korrekte Darstellung unverändert.
- iPhone: bestehende korrekte Darstellung unverändert.
- Desktop: unverändert.
- Bundesliga-Teilstand 1/9 unverändert.
- Keine finale Spieltags-/Siegeranzeige.

## Schutz

Keine Änderungen an Grid, Kachelgrößen, Navigation, Grundlayout oder Datenlogik.

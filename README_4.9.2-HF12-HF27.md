# 4.9.2-HF12-HF27

Finale Live-Version auf Grundlage von `4.9.2-HF12-HF26` plus der vollständig getesteten und freigegebenen Kicktipp-Integration aus `TEST20-HF7`.

## Inhalt

Kicktipp steht innerhalb der bestehenden TOSMC-Seite als zusätzliche Bedienoberfläche zur Verfügung. Der Button „Kicktipp Live Action“ öffnet `kicktipp.html` und startet die offizielle Einbettung mit dem getesteten Ziel Tippübersicht.

Der direkte Kicktipp-Zugang bleibt erhalten. Das externe Kicktipp-Script wird ausschließlich auf `kicktipp.html` geladen. Ein Ausfall oder eine Blockierung von Kicktipp beeinträchtigt die übrigen TOSMC-Seiten nicht.

Die Linkvorlage in `update_data.py` verwendet ebenfalls den vollständigen getesteten `br_p`-Parameter und kann die funktionierende Startnavigation deshalb bei einer späteren Datenerzeugung nicht zurücksetzen.

## Installation

1. Das UPDATE-Paket in das Live-Repository `OldSmugglersClub/the-old-smugglers-club` auf Branch `main` übernehmen.
2. Vorhandene Dateien ersetzen und die neuen Dateien hinzufügen.
3. Keine Dateien löschen.
4. Nach der Veröffentlichung die Website hart neu laden.
5. `kicktipp.html`, den direkten Kicktipp-Fallback und die ausgewiesenen „Kicktipp Live Action“-Anzeigestellen kurz kontrollieren.

`LiveAdmin` wird durch dieses Update nicht verändert.

Vorgänger Live: `4.9.2-HF12-HF26`.

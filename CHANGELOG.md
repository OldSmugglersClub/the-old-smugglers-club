# Version 2.32 – Highscore Datenkompass & Spielerprofile

## Geändert
- Datenkompass für Quelle, Aktualität, Registerumfang und strukturelle Datenprüfung ergänzt.
- Exportalter wird automatisch bewertet; veraltete Datenstände werden sichtbar gekennzeichnet.
- Gesamt- und Spieltagslisten werden auf Dubletten, Namensabweichungen und ungültige Rangwerte geprüft.
- Spielernamen in Podium und Rangliste öffnen nun ein barrierearmes Detailprofil.
- Spielerprofile vergleichen bestätigte Gesamt-, Bonus- und Spieltagswerte, ohne fehlende Daten zu schätzen.
- Dialogdarstellung für Desktop, Tablet und Mobilgeräte im bestehenden Holz-, Leder- und Messingstil ergänzt.
- Grundlayout, Raster, Kachelgrößen und übrige Websitebereiche bleiben unverändert.

# Changelog

## Version 2.31 – Highscore Registerausgabe & Zustandsübernahme

- CSV-Export für die aktuell gewählte Gesamt- oder Spieltagswertung ergänzt.
- Export berücksichtigt aktive Suche und Sortierung, exportiert aber unabhängig von der sichtbaren Seitengröße alle Treffer.
- Druckansicht für eine reduzierte, klar lesbare Ranglistenausgabe ergänzt.
- Gewählte Ranglistenansicht, Sortierung und Seitengröße werden lokal im Browser gespeichert und beim nächsten Besuch wiederhergestellt.
- Exportdateien enthalten Saison, Ansicht und Datenstand aus der zentralen Highscore-Datendatei.
- Neue Bedienelemente vollständig im bestehenden Holz-, Leder- und Messingstil umgesetzt.
- Mobile Darstellung der Registerausgabe angepasst.
- Grundlayout, Raster, Kachelgrößen und alle übrigen Websitebereiche unverändert gelassen.

## Version 2.30 – Highscore Robustheit & Barrierefreiheit

- Sichtbaren Lade-, Erfolgs- und Fehlerstatus für die zentrale Highscore-Datendatei ergänzt.
- Direkte Wiederholungsfunktion eingebaut, falls `highscore.json` nicht geladen werden kann.
- Strukturprüfung für Gesamtwertung, Spieltagswertung, Teamwertung und Metadaten ergänzt.
- Fehlerzustände liefern jetzt eine verständliche Meldung statt einer leeren oder beschädigten Ansicht.
- Sprunglink zum Highscore-Inhalt und deutlichere Tastatur-Fokusmarkierungen ergänzt.
- Reiternavigation um Home-/Ende-Tasten erweitert.
- Sortierschalter mit präziseren zugänglichen Beschriftungen versehen.
- Unterstützung für reduzierte Bewegungen ergänzt.
- Mobile Darstellung der Systemmeldungen angepasst.
- Grundlayout, Raster, Kachelgrößen und alle übrigen Websitebereiche unverändert gelassen.

## Version 2.29 – Highscore Statistikregister & Detailhierarchie

- Kopfregister für Saison, Berechnungsgrundlage, Exportstand und aktive Statistikmodule ergänzt.
- Rekordkarten in einheitliche gravierte Registertafeln mit eindeutigen Zuständen „Aktiv“ und „Noch offen“ überführt.
- Piratenorden gestalterisch vereinheitlicht und ihre Zustände klarer in die Kartenhierarchie integriert.
- Lesbarkeit, Abstände und visuelle Gewichtung innerhalb der Rekord- und Ordenmodule verbessert.
- Historienzeilen um dezente, nicht aufdringliche Interaktionsrückmeldung ergänzt.
- Responsive Darstellung des neuen Statistikregisters für Tablet und Mobilgeräte ergänzt.
- Keine Bildassets, Cliparts, Emojis oder Standardicons hinzugefügt.
- Grundlayout, Raster, Kachelgrößen und alle übrigen Websitebereiche unverändert gelassen.

# Version 2.28 – Highscore Ranglisten-Kompass

- Kompakte Statusleiste für aktive Ansicht, Sortierung und Trefferzahl ergänzt.
- Zentrale Rücksetzfunktion für Suche, Sortierung, Seitengröße und Pagination eingebaut.
- Leerer Suchzustand als klar gestalteter Schiffsregister-Hinweis mit direkter Rücksetzung umgesetzt.
- Deaktivierte Seitennavigation visuell und funktional eindeutiger dargestellt.
- Fehlerhafte Statuslogik beim Orden „Aufholjäger“ korrigiert: Vorhandene Archivstände allein vergeben keinen Orden.
- Responsive Darstellung der neuen Bedienelemente für Tablet und Mobilgeräte ergänzt.
- Grundlayout, Raster, Kachelgrößen und alle übrigen Websitebereiche unverändert gelassen.

# Changelog

## Version 2.24 – Highscore-Podium im Piratendesign

- Highscore-Podium vollständig innerhalb der bestehenden Seitenstruktur überarbeitet.
- Freien Podiumsbereich mit einem dunklen Rangdeck aus Holz, Messingkanten, Seil-/Takelage-Details und gravierten Rangplaketten ausgestaltet.
- Keine neuen Bilddateien, Cliparts, Emojis oder Standardicons verwendet; alle Gestaltungselemente entstehen aus HTML und CSS.
- Karten der Plätze 1 bis 3 kontrastreicher und klarer hierarchisiert.
- Textbereich oberhalb der Sockel vergrößert; Platz 3 ist nun vollständig lesbar und wird nicht mehr vom Sockel überdeckt.
- Mobile Darstellung des Podiums auf eine einspaltige, vollständig lesbare Variante angepasst.
- Grundlayout, Raster, Seitenaufbau und übrige freigegebene Bereiche unverändert gelassen.

# Änderungsprotokoll

## Version 2.23 – Highscore 3.0

### Neu gestaltet
- Highscore-Seite vollständig an den bestehenden dunklen Piratenstil angeglichen.
- Top-3-Bereich als dreistufiges Holzpodium mit Messingkanten umgesetzt.
- Siegerpodest in der Mitte höher; Platz 2 links und Platz 3 rechts.
- Rekorde und Piratenorden als reine Messing-/Holztafeln gestaltet.

### Entfernt
- Sämtliche Clipart-, Emoji-, Medaillen- und generischen Symbol-Elemente auf der Highscore-Seite.
- Symbolmarken in den Hauptreitern.
- Bildhafte Orden-Icons.

### Unverändert
- Highscore-Datenstruktur und Kicktipp-Import.
- Einzelwertung, Spieltagswertung, Gruppierungen und Rekordlogik.
- Spielersuche sowie Seitennavigation mit 25, 50 oder 100 Einträgen.
- Bestehende Wettbewerbsseiten und das 3×3-Kachelraster.

### Geänderte Dateien
- `highscore.html`
- `highscore.css`
- `highscore.js`
- `VERSION.txt`
- `CHANGELOG.md`

## Version 2.25 – Highscore Professional

- Highscore-Navigation in dunkler Holz- und Messingoptik vereinheitlicht.
- Statistikfelder als eingelassene Schiffstafeln gestaltet.
- Rangliste optisch zu einem historischen Schiffsregister weiterentwickelt.
- Tabellenkopf, Tabellenzeilen, Rangdarstellung und Suchbereich hochwertiger gestaltet.
- Rekord-, Team- und Ordenkarten an die freigegebene Piratendesign-Sprache angepasst.
- Historienbereich und Seitennavigation gestalterisch vereinheitlicht.
- Vorhandenes Podium aus Version 2.24 vollständig beibehalten und in das Gesamtbild eingebunden.
- Keine Bildassets, Cliparts, Emojis oder Standardicons ergänzt.
- Grundlayout, Raster, Kachelgrößen und Seitenaufbau unverändert gelassen.
- Mobile Darstellung berücksichtigt.

## Version 2.26 – Highscore Datenlogik & Bedienung

- Vorläufige Saisonstände mit 0 Punkten werden nicht mehr irreführend als echte Plätze 1 bis 3 ausgegeben.
- Das Podium kennzeichnet eine noch unbesetzte Rangliste transparent als vorläufige alphabetische Reihenfolge.
- Geteilte Führungen werden im Podiumsbereich ausdrücklich ausgewiesen.
- Tabellenführer- und Rekordanzeigen zeigen vor Saisonbeginn korrekt „Noch offen“ statt eines zufälligen Spielernamens.
- Sortierbare Spalten für Rang, Spieler, Punkte, Bonuspunkte und Spieltagssiege ergänzt.
- Mobile Rangliste von einer horizontal scrollenden Tabelle auf vollständig lesbare Registerkarten umgestellt.
- Tastaturbedienung, Fokusdarstellung und ARIA-Zustände der Highscore-Reiter verbessert.
- Der gewählte Highscore-Bereich wird in der URL gespeichert und kann direkt verlinkt werden.
- Grundlayout, Kachelgrößen, Raster und alle übrigen Websitebereiche unverändert gelassen.

## Version 2.27 – Highscore Statistikmodule

- Teamseiten um ein datenbasiertes Mannschaftsduell mit Vorsprung/Rückstand und Vergleichsbalken ergänzt.
- Teamkennzahlen um klare Erläuterungen und belastbare Nullstand-Anzeigen erweitert.
- Neuer Statistikstatus zeigt transparent die Datenreife aller Highscore-Module.
- Rekordkarten unterscheiden nun sichtbar zwischen verfügbaren und noch offenen Bestwerten.
- Piratenorden besitzen eindeutige Zustände „Vergeben“ oder „Gesperrt“; fehlende Daten werden nicht geschätzt.
- Historie als Logbuch-Zeitleiste überarbeitet und um einen sachlichen Leerzustand ergänzt.
- Desktop- und Mobile-Darstellung der neuen Module angepasst.
- Grundlayout, Kachelraster und übrige Websitebereiche unverändert belassen.
